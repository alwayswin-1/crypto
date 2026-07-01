import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { signToken } from '../../../lib/auth';
import { readData, saveData } from '../../../lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const data = await readData();
    const normalizedEmail = email.toString().trim().toLowerCase();
    const existing = data.users.find((user) => user.email === normalizedEmail);
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const user = {
      id: uuidv4(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    data.users.push(user);
    await saveData(data);

    const token = signToken({ id: user.id, role: user.role });
    res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err: any) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Signup failed. Please try again.' });
  }
}
