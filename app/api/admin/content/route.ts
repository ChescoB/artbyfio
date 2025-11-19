
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

// Admin content management disabled (no database in this deployment).
// Each method returns 501 so build can succeed without Prisma.

// GET all content sections
export async function GET() {
  return NextResponse.json({ error: 'Admin content API disabled.' }, { status: 501 });
}

// POST - Create new content section
export async function POST() {
  return NextResponse.json({ error: 'Admin content API disabled.' }, { status: 501 });
}

// PUT - Update content section
export async function PUT() {
  return NextResponse.json({ error: 'Admin content API disabled.' }, { status: 501 });
}

// DELETE - Delete content section
export async function DELETE() {
  return NextResponse.json({ error: 'Admin content API disabled.' }, { status: 501 });
}
