import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  return res.status(503).json({ error: 'Sign-up is temporarily disabled while CryptoShield dashboard is perfected.' });
}
