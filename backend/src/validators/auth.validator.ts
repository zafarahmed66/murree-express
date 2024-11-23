import { ROLE } from "@prisma/client";
import { z } from "zod";




export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  
  role: z.nativeEnum(ROLE),
  studentName: z.string(),
  graduationYear: z.number().int().min(2000).max(2100).optional(),
  highSchool: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be at least 6 characters"),
});
