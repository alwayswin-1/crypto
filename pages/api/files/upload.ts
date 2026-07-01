import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { readData, saveData } from '../../../lib/data';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    fs.mkdir(uploadDir, { recursive: true })
      .then(() => cb(null, uploadDir))
      .catch(cb);
  },
  filename(_req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage }).single('file');

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve();
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest & { file?: any }, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await runMiddleware(req, res, upload);
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }

  const slug = req.body.slug?.toString().trim();
  const uploaderEmail = req.body.uploaderEmail?.toString().trim() || 'admin@example.com';

  if (!slug || !req.file) {
    return res.status(400).json({ error: 'Missing slug or file' });
  }

  const data = await readData();

  if (data.uploads.some((item) => item.slug === slug)) {
    return res.status(409).json({ error: 'Slug already used' });
  }

  let user = data.users.find((item) => item.email.toLowerCase() === uploaderEmail.toLowerCase());
  if (!user) {
    user = {
      id: uuidv4(),
      email: uploaderEmail.toLowerCase(),
      password: '',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    data.users.push(user);
  }

  const uploadEntry = {
    id: uuidv4(),
    slug,
    filename: req.file.filename,
    originalName: req.file.originalname,
    uploadedAt: new Date().toISOString(),
    uploadedBy: user.id,
  };

  data.uploads.unshift(uploadEntry);
  await saveData(data);

  return res.status(200).json({
    file: uploadEntry,
    downloadUrl: `/download/${slug}`,
  });
}
