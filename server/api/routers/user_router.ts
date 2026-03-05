import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env.mjs";
import {
  generateOTP,
  generateSHA256Hash,
  getCurrentTimestamp,
} from "@/lib/utils";
import { userOtp } from "@/drizzle/migrations/schema";
import { and, count, eq, gt, gte, lt } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import {
  ERROR_BAD_REQUEST,
  ERROR_CREATE_DATA,
  ERROR_DATA_NOT_FOUND,
  ERROR_UPDATE_DATA,
  USER_OTP,
} from "@/lib/constants";

export const userRouter = createTRPCRouter({
  sendOTP: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { phone } = input;

      const url = env.SANDEZA;
      const currentTime = getCurrentTimestamp();
      const timeId = getCurrentTimestamp();
      const refId = `OTP-${phone}${timeId}`;
      const signature = generateSHA256Hash(
        `${env.SANDEZA_USERNAME}${env.SANDEZA_PASSWORD}${currentTime}`,
      );

      const otp = generateOTP();

      const payload = {
        signature,
        time: currentTime,
        type: "2",
        username: env.SANDEZA_USERNAME,
        ref_id: refId,
        subject: `OTP-${getCurrentTimestamp()}`,
        sender_id: "WooriFinanceIndonesia",
        budget_code: "",
        channel: {
          whatsapp: {
            msisdn: phone,
            template_id: "otp_mobile_001",
            message: `text:=:${otp}`,
            button: `button:=:url:=:${otp}`,
            attachment: "",
            backup_on: "",
            backup_exp: "",
          },
        },
      };

      await ctx.redis.set(USER_OTP, otp);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw new TRPCError({
          message: "Failed to sent OTP",
          code: "BAD_REQUEST",
        });

      return await response.json();
    }),

  verifyOTP: publicProcedure
    .input(z.object({ otp: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const redisOTP = await ctx.redis.get(USER_OTP);
      if (!redisOTP)
        throw new TRPCError({ message: "Redis empty", code: "BAD_REQUEST" });

      if (redisOTP !== input.otp)
        throw new TRPCError({ message: "Invalid OTP", code: "BAD_REQUEST" });

      return { message: "OTP Valid" };
    }),

  findUser: publicProcedure
    .input(z.object({ phone: z.string() }))
    .query(async ({ ctx, input }) => {
      const { phone } = input;

      const [user] = await ctx.db
        .select()
        .from(userOtp)
        .where(eq(userOtp.phoneNumber, phone));
      // if (!user) throw new TRPCError({ message: ERROR_FETCH, code: "NOT_FOUND" });

      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      );

      const [counter] = await ctx.db
        .select({ counter: userOtp.counter })
        .from(userOtp)
        .where(
          and(
            eq(userOtp.phoneNumber, phone),
            and(
              gte(userOtp.createdTime, startOfDay.toISOString()),
              lt(userOtp.createdTime, endOfDay.toISOString()),
            ),
          ),
        );
      // if (!user) throw new TRPCError({ message: ERROR_FETCH, code: "NOT_FOUND" });

      return { data: { ...user, counter: counter?.counter } };
    }),

  findUserByPhone: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { phone } = input;

      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      );

      const [user] = await ctx.db
        .select({ counter: userOtp.counter })
        .from(userOtp)
        .where(
          and(
            eq(userOtp.phoneNumber, phone),
            and(
              gte(userOtp.createdTime, startOfDay.toISOString()),
              lt(userOtp.createdTime, endOfDay.toISOString()),
            ),
          ),
        );
      if (!user) return { message: "User not have otp counter yet" };

      return { data: user };
    }),

  createCounterOTP: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { phone } = input;

      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      );

      // check if the user already banned or not
      const data = await ctx.db
        .select()
        .from(userOtp)
        .where(
          and(
            gte(userOtp.counter, 4),
            eq(userOtp.phoneNumber, phone),
            gte(userOtp.createdTime, startOfDay.toISOString()),
            lt(userOtp.createdTime, endOfDay.toISOString()),
          ),
        );

      if (data.length !== 0)
        throw new TRPCError({
          message: ERROR_BAD_REQUEST,
          code: "BAD_REQUEST",
        });

      const newData = await ctx.db.insert(userOtp).values({
        phoneNumber: phone,
        counter: 1,
      });

      if (!newData)
        throw new TRPCError({
          message: ERROR_CREATE_DATA,
          code: "BAD_REQUEST",
        });

      return { data: newData };
    }),

  counterOTP: publicProcedure
    .input(z.object({ phone: z.string() }))
    .query(async ({ ctx, input }) => {
      const { phone } = input;

      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      );

      const [data] = await ctx.db
        .select({ counter: userOtp.counter })
        .from(userOtp)
        .where(
          and(
            eq(userOtp.phoneNumber, phone),
            gte(userOtp.createdTime, startOfDay.toISOString()),
            lt(userOtp.createdTime, endOfDay.toISOString()),
          ),
        );
      // if (!data)
      //   throw new TRPCError({
      //     message: ERROR_DATA_NOT_FOUND,
      //     code: "NOT_FOUND",
      //   });

      return data;
    }),

  counterUpdate: publicProcedure
    .input(z.object({ phone: z.string(), counter: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { phone, counter } = input;

      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      );

      const data = await ctx.db
        .select()
        .from(userOtp)
        .where(eq(userOtp.phoneNumber, phone));
      if (!data)
        throw new TRPCError({
          message: ERROR_DATA_NOT_FOUND,
          code: "NOT_FOUND",
        });

      const newData = await ctx.db
        .update(userOtp)
        .set({ counter: counter })
        .where(
          and(
            eq(userOtp.phoneNumber, phone),
            gte(userOtp.createdTime, startOfDay.toISOString()),
            lt(userOtp.createdTime, endOfDay.toISOString()),
          ),
        );

      if (!newData)
        throw new TRPCError({
          message: ERROR_UPDATE_DATA,
          code: "BAD_REQUEST",
        });

      return { data: newData };
    }),

  verifikasiUserMobile: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      const { token } = input;

      const data = await fetch(
        `${env.MOBILE_SERVER_URL}/mobile/api/users/updateEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        },
      );
      const result = await data.json();

      if (!result)
        throw new TRPCError({
          message: ERROR_BAD_REQUEST,
          code: "BAD_REQUEST",
        });

      return result;
    }),
});
