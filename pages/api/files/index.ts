import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromRequest, verifyToken } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload: any = verifyToken(token);
    if (payload.role !== 'admin') return res.status(403).json({ error: 'Admin only' });

    const uploads = await prisma.fileUpload.findMany({
      orderBy: { uploadedAt: 'desc' },
      include: { uploader: true, downloads: true },
    });

    const downloaders = await prisma.download.findMany({
      orderBy: { createdAt: 'desc' },
      include: { file: true },
    });

    return res.status(200).json({ uploads, downloaders });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
