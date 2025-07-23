import { NextFunction, Request, Response } from 'express';
import User from '@entities/User';

export async function ensureAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
  try {
    const tokenId = req.userId;

    const user = await User.findOneOrFail(tokenId);

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: `You are notw authorized, You're: ${user.role}` });
    } else {
      if (next) return next();
    }
  } catch (error) {
    return res.status(404).json({ message: 'Bad request' });
  }
}

