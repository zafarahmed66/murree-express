import { Request, Response } from "express";
import prisma from "../prisma/client";

/**
 * Get student list
 */
export const profileDetails = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const currentUser = req.user;

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id!,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { password, ...others } = user;

    res.status(200).json(others);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user details", error });
  }
};
