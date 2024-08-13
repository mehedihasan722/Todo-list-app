"use client";
import { SignUp } from "@/actions/auth";
import Loading from "@/components/icon/Loading";
// import { SignUp } from "@/actions/auth";
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
import { signUpFormSchema } from "@/lib/validation";
// import { SignInWIthFacebook, SignInWIthGoogle } from "@/lib/oauth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { register } from "module";
import Image from "next/image";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, startTransitaion] = useTransition();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      phoneNumber: undefined,
    },
  });
  console.log(form.formState.errors);
  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    startTransitaion(() => {
      SignUp(values).then((res) => {
        console.log("🚀 ~ SignUp ~ res:", res);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Sign Up Successfully");
        }
      });
    });
    console.log(values);
  };
  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  {...form.register("phoneNumber", {
                    valueAsNumber: true,
                  })}
                  placeholder="+88 01638124722"
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

        <Button className="w-full space-x-2" type="submit" disabled={isPending}>
          <span>Sign Up </span> {isPending ? <Loading /> : null}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
