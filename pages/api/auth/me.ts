import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromRequest, verifyToken } from '../../../lib/auth';
import { readData } from '../../../lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const payload: any = verifyToken(token);
    const data = await readData();
    const user = data.users.find((item) => item.id === payload.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
