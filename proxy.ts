import { HEADERS } from "@/app/urls";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    // Allow images from map tile servers
    "img-src 'self' data: https: blob:; " +
    // Allow connections to map tile servers and APIs
    "connect-src 'self' https://apps.woorifinance.co.id https://www.woorifinance.co.id https://tile.openstreetmap.org https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org https://basemaps.cartocdn.com https://*.cartocdn.com https://demotiles.maplibre.org; " +
    // Allow web workers for MapLibre GL
    "worker-src 'self' blob:; " +
    // Allow child contexts for compatibility
    "child-src 'self' blob:; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "upgrade-insecure-requests",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-XSS-Protection": "1; mode=block",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=()",
  // Changed from require-corp to unsafe-none for map tiles
  "Cross-Origin-Embedder-Policy": "unsafe-none",
  "Cross-Origin-Opener-Policy": "same-origin",
  // Changed from same-origin to cross-origin for map tiles
  "Cross-Origin-Resource-Policy": "cross-origin",
  "X-RateLimit-Limit": "100",
  "X-RateLimit-Remaining": "99",
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // First, run the next-intl middleware
  const response = intlMiddleware(req);

  // Add your custom headers
  const path = req.nextUrl.pathname;
  response.headers.set(HEADERS.path, path);

  // Add security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|favicon.ico|.*\\..*).*)"],
};
