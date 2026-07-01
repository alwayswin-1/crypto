import type { NextApiRequest, NextApiResponse } from 'next';
import { readData } from '../../../lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const data = await readData();
  const uploads = data.uploads.map((upload) => ({
    ...upload,
    downloads: data.downloads.filter((download) => download.slug === upload.slug),
  }));

  return res.status(200).json({ uploads, downloaders: data.downloads });
}
