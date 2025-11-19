
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ 
    message: 'Please use NextAuth signin endpoint at /api/auth/signin',
    redirect: '/api/auth/signin'
  });
}

export async function GET(request: Request) {
  return NextResponse.json({ 
    message: 'Please use NextAuth signin endpoint at /api/auth/signin',
    redirect: '/api/auth/signin'
  });
}
