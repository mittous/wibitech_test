"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type RegisterFormInputs = {
  fullName: string;
  username: string;
  password: string;
  role: "admin" | "user";
};

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data);
      router.push("/tasks");
    } catch (err) {
        console.log(err);
      alert("Failed to register");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mt-10">
      <div>
        <input
          {...register("fullName", { required: "Full name is required" })}
          placeholder="Full Name"
          className="border p-2 w-full"
        />
        {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
      </div>

      <div>
        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
          className="border p-2 w-full"
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      </div>

      <div>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum length is 6 characters" },
          })}
          placeholder="Password"
          className="border p-2 w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <select {...register("role")} className="border p-2 w-full">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
