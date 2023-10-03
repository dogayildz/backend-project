import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'cat') as { userId: number };
    //req.adminId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Use this middleware in routes that require authentication
