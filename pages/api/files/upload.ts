import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files, File as FormidableFile } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../lib/prisma';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getOrCreateUploaderId(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existingUser) return existingUser.id;

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const newUser = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: passwordHash,
      role: 'admin',
    },
  });

  return newUser.id;
}

async function moveFile(source: string, destination: string) {
  try {
    await fs.rename(source, destination);
  } catch (error: any) {
    if (error?.code === 'EXDEV') {
      await fs.copyFile(source, destination);
      await fs.unlink(source);
      return;
    }
    throw error;
  }
}

const parseForm = (req: NextApiRequest) => {
  const form = new IncomingForm({
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024,
  });

  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
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
    const uploadFile = files.file as FormidableFile | FormidableFile[] | undefined;
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

    await moveFile(file.filepath, filePath);

    const uploaderEmail = typeof fields.uploaderEmail === 'string'
      ? fields.uploaderEmail
      : Array.isArray(fields.uploaderEmail)
      ? fields.uploaderEmail[0]
      : ADMIN_EMAIL;

    const uploaderId = await getOrCreateUploaderId(uploaderEmail);

    const createdFile = await prisma.fileUpload.create({
      data: {
        slug,
        filename: savedFilename,
        originalName: file.originalFilename,
        uploadedBy: uploaderId,
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
