import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const uploads = await prisma.fileUpload.findMany({
    orderBy: { uploadedAt: 'desc' },
    include: { uploader: true, downloads: true },
  });

  const downloadsFile = path.join(process.cwd(), 'data', 'downloads.json');
  let downloaders: any[] = [];

  try {
    const data = await fs.readFile(downloadsFile, 'utf8');
    downloaders = JSON.parse(data);
  } catch {
    downloaders = [];
  }

  return res.status(200).json({ uploads, downloaders });
}
