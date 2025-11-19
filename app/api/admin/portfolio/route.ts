
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

// Admin portfolio management disabled (no database in this deployment).
// All methods return 501 to avoid Prisma initialization during build.

// GET all portfolio projects
export async function GET() {
  return NextResponse.json({ error: 'Admin portfolio API disabled.' }, { status: 501 });
}

// POST - Create new project
export async function POST() {
  return NextResponse.json({ error: 'Admin portfolio API disabled.' }, { status: 501 });
}

// PUT - Update project
export async function PUT() {
  return NextResponse.json({ error: 'Admin portfolio API disabled.' }, { status: 501 });
}

// DELETE - Delete project
export async function DELETE() {
  return NextResponse.json({ error: 'Admin portfolio API disabled.' }, { status: 501 });
}
