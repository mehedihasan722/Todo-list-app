"use server";

import { db } from "@/lib/db";
import { string, z } from "zod";
import bcrypt from "bcryptjs";
import { lucia, validateRequest } from "@/auth/lucia";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/components";
import { generateCodeVerifier, generateState } from "arctic";
import { facebook, google } from "@/auth/oauth";
import { signInFormSchema, signUpFormSchema } from "@/lib/validation";
import VerifyTemplate from "@/components/Email/VerifyTemplate";

export const SignUp = async (values: z.infer<typeof signUpFormSchema>) => {
  const validate = signUpFormSchema.safeParse(values);
  if (!validate.success) {
    return { erorr: "Zod validation failed" };
  }

  const { email, name, password } = validate.data;

  const findUserByEmail = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (findUserByEmail) {
    return { error: "Email already exists" };
  }

  /**
   * hashdPassword is the hashed password
   *  10 is the number of rounds to hash the password
   */

  const hashdPassword = await bcrypt.hash(password, 10);

  /**
   * verificationCode is a random 6 digit code
   */

  const verificationCode = String(Math.floor(100000 + Math.random() * 900000));

  /**
   * expiresAt is the time when the verification code will expire after 10 minutes
   */
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);
  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashdPassword,
        verification: {
          create: {
            code: verificationCode,
            expiresAt,
          },
        },
      },
    });

    await sendEmail({
      html: render(
        VerifyTemplate({
          code: verificationCode,
          email: user.email as string,
          name: user.name,
        })
      ),
      subject: "Verify your email",
      to: user.email as string,
    });
    return { message: "User created successfully" };
  } catch (error) {
    return { error: "Error creating user" };
  }
};

export const SignIn = async (values: z.infer<typeof signInFormSchema>) => {
  const validate = signInFormSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Zod validation failed" };
  }

  const { email, password } = validate.data;
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !user.password) {
      return { error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      return { error: "Password is incorrect" };
    }
    const session = await lucia.createSession(user.id as string, {
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { message: "Logged in successfully" };
  } catch (error) {
    console.log("🚀 ~ SignIn ~ error:", error);
    return { error: "Error signing in" };
  }
};

export const SignOut = async () => {
  try {
    const { session } = await validateRequest();
    if (!session) {
      return { error: "Unauthorized" };
    }
    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return { error: "Error signing out" };
  }
};

export const createGoogleAuthorizationURL = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
    });

    cookies().set("state", state, {
      httpOnly: true,
    });

    const authorizationURL = await google.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      }
    );

    return {
      success: true,
      data: authorizationURL,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const createFacebookAuthorizationURL = async () => {
  try {
    const state = generateState();

    const authorizationURL = await facebook.createAuthorizationURL(state, {
      scopes: ["email", "public_profile"],
    });

    return {
      success: true,
      data: authorizationURL,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
