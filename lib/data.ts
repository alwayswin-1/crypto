import { promises as fs } from 'fs';
import path from 'path';

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

export interface Upload {
  id: string;
  slug: string;
  filename: string;
  originalName: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Download {
  id: string;
  slug: string;
  file: string;
  ip: string;
  country: string;
  userAgent: string | null;
  createdAt: string;
}

export interface AppData {
  users: User[];
  uploads: Upload[];
  downloads: Download[];
}

const dataFile = path.join(process.cwd(), 'DATA.JSON');

const defaultData: AppData = {
  users: [],
  uploads: [],
  downloads: [],
};

async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await saveData(defaultData);
  }
}

export async function readData(): Promise<AppData> {
  await ensureDataFile();

  try {
    const content = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(content) as AppData;
  } catch {
    await saveData(defaultData);
    return defaultData;
  }
}

export async function saveData(data: AppData): Promise<void> {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8');
}
