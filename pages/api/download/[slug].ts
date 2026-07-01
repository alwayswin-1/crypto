import type { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream, promises as fs } from 'fs';
import path from 'path';
import geoip from 'geoip-lite';
import { readData, saveData } from '../../../lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;
  if (!slug) return res.status(400).json({ error: 'Invalid slug' });

  const data = await readData();
  const file = data.uploads.find((item) => item.slug === slug);
  if (!file) return res.status(404).json({ error: 'File not found' });

  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket.remoteAddress || 'unknown';

  const geo = geoip.lookup(ip);
  const country = geo?.country ?? 'unknown';

  const downloadEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    slug,
    file: file.originalName,
    ip,
    country,
    userAgent: req.headers['user-agent']?.toString() ?? null,
    createdAt: new Date().toISOString(),
  };

  data.downloads.unshift(downloadEntry);
  await saveData(data);

  const filePath = path.join(process.cwd(), 'public', 'uploads', file.filename);

  try {
    const stats = await fs.stat(filePath);
    const safeName = file.originalName.replace(/"/g, '\"');
    const encodedName = encodeURIComponent(file.originalName);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', stats.size.toString());
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}"; filename*=UTF-8''${encodedName}`);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const stream = createReadStream(filePath);
    stream.on('error', (error) => {
      console.error('Download stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to deliver file' });
      } else {
        res.destroy(error);
      }
    });

    stream.pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to deliver file' });
  }
}
