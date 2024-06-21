"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Input } from "@/app/components/ui/navbar/input";
import { Label } from "@/app/components/ui/navbar/label";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";

export function SignInForm() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });

    if (res?.error) {
      setError(res.error);
    }
  });

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        LOGIN
      </h2>

      <form className="my-8" onSubmit={onSubmit}>
        <div className="my-8">
          {error && (
            <p className="text-white bg-red-600 text-center">{error}</p>
          )}
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-600">
              {errors.email.message as string}
            </span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            autoComplete="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-600">
              {errors.password.message as string}
            </span>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirm Your Password</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            autoComplete="password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={() => signIn("github")}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={() => signIn("google")}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={() => signIn("onlyfans")}
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-4">
        Forgot your password?{" "}
        <Link
          href="/auth/forgot-password"
          className="text-blue-600 hover:underline"
        >
          Click here
        </Link>
      </p>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -top-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: any) => {
  return (
    <div
      className={cn("relative flex flex-col bg-white dark:bg-black", className)}
    >
      {children}
      <span className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent -bottom-px left-0 absolute w-full h-px" />
    </div>
  );
};
