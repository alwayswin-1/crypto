import { sign, verify, type SignOptions } from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export function signToken(payload: object, expiresIn: string | number = '7d') {
  return sign(payload as string | object, JWT_SECRET, { expiresIn: expiresIn as any });
}

export function verifyToken(token: string) {
  return verify(token, JWT_SECRET);
}

export function getTokenFromRequest(req: NextApiRequest) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const parts = auth.split(' ');
  if (parts.length !== 2) return null;
  return parts[1];
}
