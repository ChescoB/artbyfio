
import { NextResponse } from 'next/server';

// Admin upload endpoint temporarily disabled (Prisma/S3 removed)
// Returns 501 to avoid build-time Prisma initialization errors.
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Upload endpoint disabled in this deployment.' },
    { status: 501 }
  );
}
