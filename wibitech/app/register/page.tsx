/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { TextInput } from "@/components/ui/TextInput";
import { Button } from "@/components/ui/Button";
import { FormTitle } from "@/components/ui/FormTitle";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";
import TaskiLogo from "@/components/ui/TaskiLogo";

type RegisterFormInputs = {
  fullName: string;
  username: string;
  password: string;
  role: "admin" | "user";
};

export default function RegisterPage() {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to register");
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center py-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[80px] bg-white dark:bg-zinc-900 max-w-[380px] w-full p-6 rounded-3xl border border-sky-500 dark:border-zinc-700"
      >
       <div className="flex items-center justify-center">
          <TaskiLogo />
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className='flex w-full items-center justify-center'>
            <FormTitle title="Register" className='text-center text-[28px] font-semibold leading-7' />
          </div>
          <div className='flex flex-col gap-[15px] w-full mt-[30px] mb-5'>
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              {...register("fullName", { required: "Full name is required" })}
              error={errors.fullName?.message}
            />
            <TextInput
              label="Username"
              placeholder="johndoe"
              {...register("username", { required: "Username is required" })}
              error={errors.username?.message}
            />
            <TextInput
              label="Password"
              placeholder="••••••••••••"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum length is 6 characters" },
              })}
              error={errors.password?.message}
            />
            <select
              {...register("role")}
              className="bg-neutral-100 dark:bg-zinc-800 rounded-2xl p-4 pr-10 w-full max-w-sm truncate focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex flex-col w-full gap-[15px]">
            <Button type="submit" disabled={isSubmitting} className='w-full text-center text-sm hover:bg-blue-700 transition-colors'>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-full h-px bg-gray-300 dark:bg-gray-700" />
              <span className="bg-white dark:bg-zinc-900 px-2 text-sm text-gray-500 dark:text-gray-400 z-10">
                or
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
