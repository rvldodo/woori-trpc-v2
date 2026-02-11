import { env } from "@/env.mjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Allowlist of permitted domains
const ALLOWED_DOMAINS = [
  "apps.woorifinance.co.id",
  "www.woorifinance.co.id",
  "172.16.10.45",
  "172.16.80.40",
  "localhost",
  "127.0.0.1",
];

// IP validation regex patterns for blocking internal networks
const INTERNAL_IP_PATTERNS = [
  /^10\./, // 10.0.0.0/8
  // /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12
  /^192\.168\./, // 192.168.0.0/16
  /^127\./, // 127.0.0.0/8 (localhost)
  /^169\.254\./, // 169.254.0.0/16 (AWS metadata)
  /^0\./, // 0.0.0.0/8
  /^fc00:/i, // IPv6 Unique Local
  /^fe80:/i, // IPv6 Link Local
  /^::1$/, // IPv6 localhost
  /^::ffff:127\./i, // IPv4-mapped IPv6 localhost
  /^::ffff:10\./i, // IPv4-mapped IPv6 private
  /^::ffff:192\.168\./i, // IPv4-mapped IPv6 private
];

function isInternalIP(hostname: string): boolean {
  return INTERNAL_IP_PATTERNS.some((pattern) => pattern.test(hostname));
}

function isAllowedDomain(hostname: string): boolean {
  return ALLOWED_DOMAINS.includes(hostname.toLowerCase());
}

async function validateURL(
  urlString: string,
): Promise<{ valid: boolean; error?: string }> {
  try {
    const url = new URL(urlString);

    // Only allow HTTP and HTTPS protocols
    if (!["http:", "https:"].includes(url.protocol)) {
      return {
        valid: false,
        error: "Invalid protocol. Only HTTP and HTTPS are allowed.",
      };
    }

    // Check if domain is in allowlist
    if (!isAllowedDomain(url.hostname)) {
      return {
        valid: false,
        error: `Domain '${url.hostname}' is not in allowlist.`,
      };
    }

    // Block internal IPs
    if (isInternalIP(url.hostname)) {
      return { valid: false, error: "Access to internal IPs is forbidden." };
    }

    // NOTE: Uncomment for Production
    // Block localhost variations
    // if (["localhost", "0.0.0.0", "[::]"].includes(url.hostname.toLowerCase())) {
    //   return { valid: false, error: "Access to localhost is forbidden." };
    // }

    // NOTE: Uncomment for Production
    // Additional DNS resolution check (Node.js environment only)
    // if (typeof window === "undefined") {
    //   try {
    //     const dns = await import("dns").then((m) => m.promises);
    //     const addresses = await dns.resolve4(url.hostname).catch(() => []);
    //
    //     // Check if resolved IP is internal
    //     for (const address of addresses) {
    //       if (isInternalIP(address)) {
    //         return { valid: false, error: "Resolved IP is internal." };
    //       }
    //       // Block AWS metadata IP explicitly
    //       if (address === "169.254.169.254") {
    //         return {
    //           valid: false,
    //           error: "Access to AWS metadata is forbidden.",
    //         };
    //       }
    //     }
    //   } catch (dnsError) {
    //     // DNS resolution failed - log but allow (fail open for external services)
    //     console.warn("DNS resolution warning:", dnsError);
    //   }
    // }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: "Invalid URL format." };
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ file: string[] }> },
) {
  try {
    // 1. Construct the URL for A-api
    const filePath = (await params).file.join("/");

    // Prevent path traversal attacks
    if (filePath.includes("..") || filePath.includes("//")) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
    }

    const aApiUrl = `${env.NEXT_PUBLIC_API_URL}/${filePath}`;

    // 2. Validate URL before making request
    const validation = await validateURL(aApiUrl);
    if (!validation.valid) {
      console.error(
        "URL validation failed:",
        validation.error,
        "URL:",
        aApiUrl,
      );
      return NextResponse.json(
        { error: "Invalid or unauthorized URL", details: validation.error },
        { status: 403 },
      );
    }

    // 3. Forward the request with timeout and security controls
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(aApiUrl, {
      signal: controller.signal,
      headers: {
        // Only forward authorization header, not all headers
        ...(request.headers.get("authorization") && {
          authorization: request.headers.get("authorization")!,
        }),
        // Add a custom user agent to identify proxy requests
        "User-Agent": "WooriFinance-Proxy/1.0",
      },
      // Prevent following redirects automatically
      redirect: "manual",
    });

    clearTimeout(timeoutId);

    // 4. Check if response is a redirect and validate redirect target
    if (response.status >= 300 && response.status < 400) {
      const redirectUrl = response.headers.get("Location");
      if (redirectUrl) {
        // Validate redirect URL to prevent SSRF via redirect
        const redirectValidation = await validateURL(redirectUrl);
        if (!redirectValidation.valid) {
          console.error(
            "Redirect validation failed:",
            redirectValidation.error,
          );
          return NextResponse.json(
            { error: "Redirect to unauthorized location" },
            { status: 403 },
          );
        }
      }
    }

    // 5. Handle A-api errors
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: error.message || "Failed to fetch file from A-api" },
        { status: response.status },
      );
    }

    // 6. Get the file data and content type from A-api
    const fileData = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const cacheControl =
      response.headers.get("cache-control") ||
      "public, max-age=31536000, immutable";

    // 7. Return the file with proper headers
    return new NextResponse(Buffer.from(fileData), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
        // Security headers
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        // CORS headers if needed (be specific about origins in production)
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("Error fetching file:", error);

    // Handle timeout specifically
    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "File access error" },
      { status: 500 },
    );
  }
}
