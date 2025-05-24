/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { FormTitle } from '@/components/ui/FormTitle';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import Link from 'next/link';
import TaskiLogo from '@/components/ui/TaskiLogo';

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password); // Call login function
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center py-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-[80px] bg-white  dark:bg-zinc-900  max-w-[380px] w-full  p-6  rounded-3xl border border-sky-500 dark:border-zinc-700 "
      >
        <div className="flex items-center justify-center">
          <TaskiLogo />
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className='flex w-full items-center justify-center '>
            <FormTitle title="Login" className='text-center text-[28px] font-semibold leading-7' />
          </div>
          <div className='flex flex-col gap-[15px] w-full mt-[30px] mb-5'>
            <TextInput
              label="Username"
              placeholder="imittous"
              {...register('username', { required: 'Username is required' })}
              error={errors.username?.message}
            />
            <TextInput
              label="Password"
              placeholder="••••••••••••"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />
          </div>

          <div className="flex flex-col w-full  gap-[15px] ">
            <Button type="submit" disabled={isSubmitting} className='w-full text-center text-sm hover:bg-blue-700 transition-colors'>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-full h-px bg-gray-300 dark:bg-gray-700" />
              <span className="bg-white dark:bg-zinc-900 px-2 text-sm text-gray-500 dark:text-gray-400 z-10">
                or
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
}
