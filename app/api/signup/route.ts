
import { NextResponse } from 'next/server';

// Signup disabled: database removed. Returns 501.
export async function POST() {
  return NextResponse.json(
    { error: 'Signup disabled in this deployment' },
    { status: 501 }
  );
}
