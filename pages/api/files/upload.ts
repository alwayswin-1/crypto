import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { prisma } from '../../../lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: NextApiRequest) => {
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024,
  });

  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { fields, files } = await parseForm(req);
    const slug = typeof fields.slug === 'string' ? fields.slug : Array.isArray(fields.slug) ? fields.slug[0] : '';
    const uploadFile = files.file as formidable.File | formidable.File[] | undefined;
    const file = Array.isArray(uploadFile) ? uploadFile[0] : uploadFile;

    if (!slug || !file || !file.filepath || !file.originalFilename) {
      return res.status(400).json({ error: 'Missing upload fields' });
    }

    const existing = await prisma.fileUpload.findUnique({ where: { slug } });
    if (existing) return res.status(409).json({ error: 'Slug already used' });

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const safeName = file.originalFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const savedFilename = `${slug}-${Date.now()}-${safeName}`;
    const filePath = path.join(uploadDir, savedFilename);

    await fs.rename(file.filepath, filePath);

    const createdFile = await prisma.fileUpload.create({
      data: {
        slug,
        filename: savedFilename,
        originalName: file.originalFilename,
        uploadedBy: 1,
      },
    });

    return res.status(200).json({
      file: createdFile,
      downloadUrl: `/download/${slug}`,
    });
  } catch (error) {
    console.error('Upload failed:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Upload failed' });
  }
}
