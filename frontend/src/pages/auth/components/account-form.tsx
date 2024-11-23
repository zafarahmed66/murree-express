import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1FormData } from "./create-user-form";
import { apiClient } from "../../../services/apiClient";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const step2Schema = z.object({
  studentFirstName: z.string().min(1, "First name is required"),
  studentLastName: z.string().min(1, "Last name is required"),
  graduationYear: z.enum(["2022", "2023", "2024", "2025"], {
    errorMap: () => ({ message: "Please select a graduation year" }),
  }),
  highSchool: z.string().min(3, "High school name is required"),
});

export type Step2FormData = z.infer<typeof step2Schema>;

interface AccountFormProps {
  initialFormData: Step1FormData;
}

export function AccountForm({ initialFormData }: AccountFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: Step2FormData) => {
    const { studentFirstName, studentLastName, graduationYear, highSchool } =
      data;
    const endPoint = "/api/v1/auth/register";
    const finalData = {
      ...initialFormData,
      studentName: `${studentFirstName} ${studentLastName}`,
      graduationYear: Number(graduationYear),
      highSchool,
    };
    setLoading(true);
    try {
      const res = await apiClient.post(endPoint, finalData);
      toast.success(res.data.message, {
        duration: 2000,
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data.message, {
          duration: 2000,
        });
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
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Tell me about the student
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
                {...register("studentFirstName")}
                id="first-name"
                placeholder="Student first name"
              />
              {errors.studentFirstName && (
                <p className="text-sm text-red-500">
                  {errors.studentFirstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="last-name" className="block mb-2 dark:text-white">
                Last Name
              </Label>
              <TextInput
                {...register("studentLastName")}
                id="last-name"
                placeholder="Student last name"
              />
              {errors.studentLastName && (
                <p className="text-sm text-red-500">
                  {errors.studentLastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Graduation Year */}
          <div>
            <div className="block mb-2 dark:text-white">
              When will student graduate?
            </div>
            <ul className="grid w-full gap-6 md:grid-cols-4">
              <li>
                <input
                  {...register("graduationYear")}
                  type="radio"
                  id="year-2022"
                  value="2022"
                  className="hidden peer"
                />
                <label
                  htmlFor="year-2022"
                  className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="mx-auto">2022</div>
                </label>
              </li>
              <li>
                <input
                  {...register("graduationYear")}
                  type="radio"
                  id="year-2023"
                  value="2023"
                  className="hidden peer"
                />
                <label
                  htmlFor="year-2023"
                  className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="mx-auto">2023</div>
                </label>
              </li>
              <li>
                <input
                  {...register("graduationYear")}
                  type="radio"
                  id="year-2024"
                  value="2024"
                  className="hidden peer"
                />
                <label
                  htmlFor="year-2024"
                  className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="mx-auto">2024</div>
                </label>
              </li>
              <li>
                <input
                  {...register("graduationYear")}
                  type="radio"
                  id="year-2025"
                  value="2025"
                  className="hidden peer"
                />
                <label
                  htmlFor="year-2025"
                  className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="mx-auto">2025</div>
                </label>
              </li>
            </ul>
            {errors.graduationYear && (
              <p className="text-sm text-red-500">
                {errors.graduationYear.message}
              </p>
            )}
          </div>

          {/* High School Name */}
          <div>
            <Label htmlFor="highSchool" className="block mb-2 dark:text-white">
              Where does the child goes to school?
            </Label>
            <TextInput
              {...register("highSchool")}
              id="highSchool"
              type="highSchool"
              placeholder="High school name"
            />
            {errors.highSchool && (
              <p className="text-sm text-red-500">
                {errors.highSchool.message}
              </p>
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
      </div>
    </section>
  );
}
