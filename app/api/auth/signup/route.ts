
import { NextResponse } from 'next/server';

// Signup disabled: database removed. Returns 501 for both GET and POST.
export async function POST() {
  return NextResponse.json(
    { error: 'Signup disabled in this deployment' },
    { status: 501 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: 'Signup disabled in this deployment' },
    { status: 501 }
  );
}
