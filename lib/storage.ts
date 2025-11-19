import { promises as fs } from 'fs';
import path from 'path';
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

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACT_FILE = path.join(DATA_DIR, 'contact_submissions.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
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
