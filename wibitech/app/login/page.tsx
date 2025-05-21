'use client';

import { useForm } from 'react-hook-form';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { FormTitle } from '@/components/ui/FormTitle';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { login } = useAuth(); // Access login from context

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password); // Call login function
      // Redirect after successful login
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen  '>
      {/* <button
        onClick={() => {
          if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
          } else {
            document.documentElement.classList.add('dark');
          }
        }}
      >
        Toggle Dark Mode
      </button> */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  dark:bg-zinc-900  max-w-[380px] w-full  p-6  rounded-3xl border border-sky-500 dark:border-zinc-700 "
      >
        <FormTitle title="Login" />

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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>

  );
}
