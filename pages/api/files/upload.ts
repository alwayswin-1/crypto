import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { prisma } from '../../../lib/prisma';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, filename, content } = req.body;
  if (!slug || !filename || !content) return res.status(400).json({ error: 'Missing upload fields' });

  const existing = await prisma.fileUpload.findUnique({ where: { slug } });
  if (existing) return res.status(409).json({ error: 'Slug already used' });

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const savedFilename = `${slug}-${Date.now()}-${safeName}`;
  const filePath = path.join(uploadDir, savedFilename);

  try {
    const fileBuffer = Buffer.from(content, 'base64');
    await fs.writeFile(filePath, fileBuffer);
    const file = await prisma.fileUpload.create({
      data: {
        slug,
        filename: savedFilename,
        originalName: filename,
        uploadedBy: 1,
      },
    });
    return res.status(200).json({
      file,
      downloadUrl: `/download/${slug}`,
    });
  } catch (error) {
    console.error('Upload failed:', error);
    return res.status(500).json({ error: typeof error === 'string' ? error : 'Upload failed' });
  }
}
