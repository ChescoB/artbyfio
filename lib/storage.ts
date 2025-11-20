import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { nanoid } from 'nanoid';

export interface LocalContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
  language: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Choose a writable base directory:
// - On Vercel/Serverless, the repository filesystem is read-only; use OS temp dir
// - Locally, prefer the project's data directory for persistence
const isServerless = !!process.env.VERCEL || process.env.NOW_BUILDER === '1';
const BASE_DIR = isServerless
  ? path.join(os.tmpdir(), 'artbyfio')
  : path.join(process.cwd(), 'data');

const CONTACT_FILE = path.join(BASE_DIR, 'contact_submissions.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(BASE_DIR, { recursive: true });
  } catch {}
  try {
    await fs.access(CONTACT_FILE);
  } catch {
    await fs.writeFile(CONTACT_FILE, JSON.stringify([]));
  }
}

export async function addContactSubmission(partial: Omit<LocalContactSubmission, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<LocalContactSubmission> {
  await ensureDataDir();
  const raw = await fs.readFile(CONTACT_FILE, 'utf8');
  let list: LocalContactSubmission[] = [];
  try { list = JSON.parse(raw); } catch { list = []; }
  const now = new Date().toISOString();
  const submission: LocalContactSubmission = {
    id: nanoid(),
    status: 'new',
    createdAt: now,
    updatedAt: now,
    ...partial
  };
  list.push(submission);
  // Atomic write: write to temp then rename
  const tmp = CONTACT_FILE + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(list, null, 2));
  await fs.rename(tmp, CONTACT_FILE);
  return submission;
}

export async function listContactSubmissions(): Promise<LocalContactSubmission[]> {
  await ensureDataDir();
  const raw = await fs.readFile(CONTACT_FILE, 'utf8');
  try { return JSON.parse(raw); } catch { return []; }
}
