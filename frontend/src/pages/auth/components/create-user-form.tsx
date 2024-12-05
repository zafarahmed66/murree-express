import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "../../../services/apiClient";
import { toast } from "sonner";
import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(["STUDENT", "PARENT"], {
    errorMap: () => ({ message: "Please select a role" }),
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type Step1FormData = z.infer<typeof step1Schema>;

interface CreateUserFormProps {
  setCurrentIndex: (value: number) => void;
  setInitialFormData: (data: Step1FormData) => void;
}

export function CreateUserForm({ setCurrentIndex, setInitialFormData }: CreateUserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: Step1FormData) => {
    const { role, email, firstName, lastName, password } = data;
    if (role === "STUDENT") {
      const endPoint = "/api/v1/auth/register";
      const data = {
        email,
        role,
        firstName,
        lastName,
        password,
        studentName: `${firstName} ${lastName}`,
      }
      setLoading(true);
      try {
        const res = await apiClient.post(endPoint, data);
        toast.success(res.data.message, {
          duration: 2000
        });
        navigate("/login")
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
    } else {
      setCurrentIndex(1);
      setInitialFormData(data);
    }
  };

  return (
    <section className="">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Let's start with the basics
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* First Name */}
            <div>
              <Label
                htmlFor="first-name"
                className="block mb-2 dark:text-white"
              >
                First Name
              </Label>
              <TextInput
                {...register("firstName")}
                id="first-name"
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="last-name" className="block mb-2 dark:text-white">
                Last Name
              </Label>
              <TextInput
                {...register("lastName")}
                id="last-name"
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Role */}
          <div>
            <div className="block mb-2 dark:text-white">I am a</div>
            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input
                  {...register("role")}
                  type="radio"
                  id="role-student"
                  value="STUDENT"
                  className="hidden peer"
                />
                <label
                  htmlFor="role-student"
                  className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="mx-auto">STUDENT</div>
                </label>
              </li>
              <li>
                <input
                  {...register("role")}
                  type="radio"
                  id="role-parent"
                  value="PARENT"
                  className="hidden peer"
                />
                <label
                  htmlFor="role-parent"
                  className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="mx-auto">PARENT</div>
                </label>
              </li>
            </ul>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Email */}
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
              className={`px-6 py-3 text-white bg-blue-500 border rounded-lg hover:bg-blue-600 ${loading && "opacity-50"}`}
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
