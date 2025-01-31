import { Request, Response } from "express";
const { verifyToken } = require("@clerk/backend");

export type CustomRequest = Request & {
  userId?: string;
  role?: string;
};

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: () => void,
) => {
  const token = req.get("authentication");
  try {
    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const userId = verified.sub;
    const role = verified.metadata.role;

    req.userId = userId;
    req.role = role;

    next();
  } catch {
    res.sendStatus(401);
  }
};

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: () => void,
) => {
  if (req.role !== "admin") {
    res.sendStatus(403);
    return;
  }
  next();
};
