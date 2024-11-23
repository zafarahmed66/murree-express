import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Register controller
 */
export const register = async (req: Request, res: Response) => {
  try {
    // Validating the request body
    const parsedData = registerSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "All fields are required",
        errors: parsedData.error.errors,
      });

      return;
    }

    // Extracting the validated data
    const {
      email,
      password,
      firstName,
      lastName,
      role,
      studentName,
      graduationYear,
      highSchool,
    } = parsedData.data;

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const user =  await prisma.user.create({
      data: { email, password: hashedPassword, firstName, lastName, role },
    });

    const account = await prisma.account.create({
      data: {
        studentName:
          role === "STUDENT" ? `${firstName} ${lastName}` : studentName,
        graduationYear,
        highSchool,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        accounts: {
          connect: { id: account.id }, // Link the account to the user
        },
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({ message: "The provided email already exists." });
      }
    } else {
      res.status(500).json({ message: "Registration failed", error });
    }
  }
};

/**
 * Login controller
 */
export const login = async (req: Request, res: Response) => {
  try {
    // Validating the request body
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "All fields are required",
        errors: parsedData.error.errors,
      });
      return;
    }

    // Extracting the validated data
    const { email, password } = parsedData.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      },
      process.env.JWT_SECRET!
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

