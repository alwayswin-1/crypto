import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../lib/prisma';
import { signToken } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ error: 'Admin signup is not configured' });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(403).json({ error: 'Invalid admin credentials' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      const valid = await bcrypt.compare(password, existing.password);
      if (!valid) return res.status(403).json({ error: 'Invalid admin credentials' });
      const token = signToken({ id: existing.id, role: existing.role });
      return res.status(200).json({ token, user: { id: existing.id, email: existing.email, role: existing.role } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });

    const token = signToken({ id: user.id, role: user.role });
    res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
