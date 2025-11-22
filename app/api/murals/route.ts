import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const muralsDir = path.join(process.cwd(), 'public', 'images', 'PORTAFOLIO', 'MURALS');
    const entries = await fs.readdir(muralsDir);
    const files = entries.filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
    return NextResponse.json({ files });
  } catch (e) {
    return NextResponse.json({ files: [], error: 'READ_ERROR' }, { status: 500 });
  }
}