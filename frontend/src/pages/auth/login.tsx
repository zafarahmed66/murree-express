import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "../../services/apiClient";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type loginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: loginFormData) => {
    const endPoint = "/api/v1/auth/login";

    setLoading(true);
    try {
      const res = await apiClient.post(endPoint, data);
      toast.success(res.data.message, {
        duration: 2000,
      });
      login(res.data.token);

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === "ERR_NETWORK") {
          toast.error(error.message, {
            duration: 2000,
          });
        } else {
          toast.error(error.response?.data.message, {
            duration: 2000,
          });
        }
      } else {
        toast.error("Something went wrong!", {
          duration: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full md:w-[60%] px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="block mb-2 dark:text-white">
              Email
            </Label>
            <TextInput
              {...register("email")}
              id="email"
              type="email"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="block mb-2 dark:text-white">
              Password
            </Label>
            <TextInput
              {...register("password")}
              id="password"
              type="password"
              placeholder="•••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}

          <div className="flex justify-end">
            <button
              disabled={loading}
              className="px-6 py-3 text-white bg-blue-500 border rounded-lg hover:bg-blue-600"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-4 space-x-2">
          <p className="text-gray-500">Don't have an account?</p>
          <Link to="/register" className="italic text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
