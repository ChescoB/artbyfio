import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const freeMindDir = join(process.cwd(), 'public', 'images', 'PORTAFOLIO', 'FREE MIND SERIES');
    const files = await readdir(freeMindDir);
    
    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = join(freeMindDir, file);
        const stats = await stat(filePath);
        return {
          name: file,
          size: stats.size,
          webPath: `/images/PORTAFOLIO/FREE MIND SERIES/${file}`,
          encodedPath: `/images/PORTAFOLIO/FREE MIND SERIES/${encodeURIComponent(file)}`,
        };
      })
    );

    return NextResponse.json({
      success: true,
      directory: freeMindDir,
      count: files.length,
      files: fileDetails,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
