"use server";

import VerifyTemplate from "@/components/Email/VerifyTemplate";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/components";

export const resendVerificationEmail = async (email: string) => {
  try {
    const existingUser = await db.user.findFirst({
      where: {
        email: email,
      },
      include: {
        verification: true,
      },
    });

    if (!existingUser) {
      return {
        error: "User not found",
      };
    }

    if (existingUser.emailVerified === true) {
      return {
        error: "Email already verified",
      };
    }

    // const sentAt = new Date(
    //   existingUser?.verification?.createdAt || new Date()
    // );
    // const isOneMinuteHasPassed =
    //   new Date().getTime() - sentAt.getTime() > 60000; // 1 minute

    // if (!isOneMinuteHasPassed) {
    //   return {
    //     error:
    //       "Email already sent next email in " +
    //       (60 - Math.floor((new Date().getTime() - sentAt.getTime()) / 1000)) +
    //       " seconds",
    //   };
    // }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10);
    if (
      existingUser.verification?.code &&
      existingUser.verification.expiresAt < new Date()
    ) {
      await db.userVerification.update({
        where: {
          userId: existingUser.id,
        },
        data: {
          code,
          expiresAt,
          createdAt: new Date(),
        },
      });
      await sendEmail({
        html: render(
          VerifyTemplate({ code, email: email, name: existingUser.name })
        ),
        subject: "Verify your email",
        to: email,
      });
    }

    await db.userVerification.create({
      data: {
        code,
        expiresAt,
        createdAt: new Date(),
        userId: existingUser.id,
      },
    });

    await sendEmail({
      html: render(
        VerifyTemplate({ code, email: email, name: existingUser.name })
      ),
      subject: "Verify your email",
      to: email,
    });

    return {
      success: "Email sent",
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const verifyEmail = async (email: string, code: string) => {
  if (!code) {
    return {
      error: "Code is required",
    };
  }

  const findUser = await db.user.findFirst({
    where: {
      email: email,
    },
    include: {
      verification: true,
    },
  });
  if (!findUser) {
    return {
      error: "User not found",
    };
  }
  if (findUser.emailVerified === true) {
    return {
      error: "Email already verified",
    };
  }
  if (!findUser.verification?.code) {
    return {
      error: "Code not found",
    };
  }

  if (code === findUser.verification.code) {
    if (findUser.verification.expiresAt < new Date()) {
      return {
        error: "Code is expired",
      };
    }
    await db.user.update({
      where: {
        email: email,
      },
      data: {
        emailVerified: true,
      },
    });
    return {
      success: "Email verified",
    };
  } else {
    return {
      error: "Code is incorrect",
    };
  }
};
