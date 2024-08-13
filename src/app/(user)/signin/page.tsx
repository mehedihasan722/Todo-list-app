import Link from "next/link";
import { validateRequest } from "@/auth/lucia";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "@/components/Form/SignIn/SignInForm";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const { user } = await validateRequest();

  if (user) {
    return redirect("/");
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignIn;
