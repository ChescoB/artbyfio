
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { NewsletterFormData } from '@/lib/types';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterFormData = await request.json();
    
    const { email, name, language } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return NextResponse.json(
          { success: false, error: 'Email already subscribed' },
          { status: 409 }
        );
      } else {
        // Reactivate existing subscription
        await prisma.newsletterSubscriber.update({
          where: { email: email.toLowerCase().trim() },
          data: {
            active: true,
            name: name?.trim() ?? null,
            language: language || 'en',
            updatedAt: new Date()
          }
        });

        return NextResponse.json({
          success: true,
          message: 'Newsletter subscription reactivated successfully'
        });
      }
    }

    // Create new subscription
    const subscription = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name?.trim() ?? null,
        language: language || 'en',
        active: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Newsletter subscription successful',
      data: { id: subscription.id }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Deactivate subscription instead of deleting
    const updated = await prisma.newsletterSubscriber.update({
      where: { email: email.toLowerCase().trim() },
      data: { active: false, updatedAt: new Date() }
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
