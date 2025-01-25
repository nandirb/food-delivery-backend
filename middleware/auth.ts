import { Request, Response } from 'express';
const { verifyToken } = require('@clerk/backend');

export type CustomRequest = Request & {
  userId?: string;
};

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: () => void
) => {
  const token = req.get('authentication');

  console.log(req.body, '-----');
  try {
    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    const userId = verified.sub;
    req.userId = userId;

    next();
  } catch {
    res.json({ status: 'Forbidden' });
  }
};
