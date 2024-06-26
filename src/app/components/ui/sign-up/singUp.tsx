"use client";
import { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/utils/cn";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import Image from "next/image";
import asd from "/public/a.jpg";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJson = await res.json();
    setLoggedInUser(resJson.email);
    console.log(resJson.email);

    if (res.ok && resJson) {
      setRegistered(true);
      setLoading(true);
    } else {
      setError(resJson.message);
    }
  });

  const handleResendConfirmation = async () => {
    console.log(
      "Logged in user email in handleResendConfirmation:",
      loggedInUser
    );

    const res2 = await fetch("/api/auth/resend-email", {
      method: "POST",
      body: JSON.stringify({
        email: loggedInUser,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res2);
    const resJson2 = await res2.json();
    console.log(resJson2);

    if (res2.ok) {
      alert("Email confirmation resent successfully");
    } else {
      console.log("error");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-blue-300 dark:bg-black shadow-xl">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to APPOBO
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        SIGNUP
      </p>
      {registered ? (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline mr-2">
            Check your email and confirm your account! If you haven't received
            the email, you can{" "}
            <button
              className="underline text-blue-500"
              onClick={handleResendConfirmation}
            >
              resend confirmation
            </button>
            .
          </span>
        </div>
      ) : (
        ""
      )}
      {error && (
        <>
          <p>{error}</p>
          <Image src={asd} alt="pija" width={100} height={100} />
        </>
      )}
      <form className="my-8" onSubmit={onSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="username">First name</Label>
            <Input
              id="username"
              placeholder="Usuario"
              type="text"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            {errors.username && (
              <span className="text-red-600">
                {errors.username.message as string}
              </span>
            )}
          </LabelInputContainer>
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
            autoComplete=""
            type="password"
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
            autoComplete=""
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
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => signIn("github")}
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            GitHub
          </span>
          <BottomGradient />
        </button>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
          onClick={() => signIn("google")}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
          <BottomGradient />
        </button>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            OnlyFans
          </span>
          <BottomGradient />
        </button>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
