
import { NextRequest, NextResponse } from 'next/server';

// Newsletter disabled: database removed. Returns 501 for all methods.
export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Newsletter signup disabled in this deployment' },
    { status: 501 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Newsletter unsubscribe disabled in this deployment' },
    { status: 501 }
  );
}
