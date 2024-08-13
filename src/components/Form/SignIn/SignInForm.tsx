"use client";
import { SignIn } from "@/actions/auth";
import Loading from "@/components/icon/Loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignInForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });
  console.log(form.formState.errors);
  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    startTransition(() => {
      SignIn(values).then((res) => {
        console.log("🚀 ~ SignIn ~ res:", res);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Sign In Successfully");
        }
      });
    });
    router.push("/");
    console.log(values);
  };
  return (
    <Form {...form}>
      <form className="space-y-2">
        <div className="grid  grid-cols-2 gap-4 py-3">
          <Button type="button" variant={"outline"}>
            <Image
              src={"/google.png"}
              width={16}
              height={16}
              alt="sign-in-with-google"
            />
          </Button>
          <Button type="button" variant={"outline"}>
            <Image
              src={"/github.png"}
              width={16}
              height={16}
              alt="sign-in-with-github"
            />
          </Button>
          <Button type="button" variant={"outline"}>
            <Image
              src={"/facebook.png"}
              width={16}
              height={16}
              alt="sign-in-with-facebook"
            />
          </Button>
          <Button type="button" variant={"outline"}>
            <Image
              src={"/discord.png"}
              width={16}
              height={16}
              alt="sign-in-with-discord"
            />
          </Button>
        </div>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  {" "}
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password!123"
                    disabled={isPending}
                  />
                  <Button
                    variant="ghost"
                    size={"icon"}
                    type="button"
                    className="absolute right-2 top-0 bg-transparent hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <EyeNoneIcon className="w-4 h-4" />
                    ) : (
                      <EyeOpenIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="min-w-full flex flex-col gap-3">
          <Link
            href="/forgot-password"
            className="text-sm underline  text-right"
          >
            Forgot Password?
          </Link>
          <Button
            className="w-full space-x-2"
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            disabled={isPending}
          >
            <span>Sign In </span> {isPending ? <Loading /> : null}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
