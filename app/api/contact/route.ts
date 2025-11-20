
import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/lib/types';
import { Resend } from 'resend';
import { addContactSubmission } from '@/lib/storage';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    const { name, email, phone, projectType, budget, message, language } = body;

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
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

    // Persist locally (file-based storage) - Always save even if email fails
    const submission = await addContactSubmission({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      projectType: projectType.trim(),
      budget: budget?.trim(),
      message: message.trim(),
      language: language || 'en'
    });

    // Send email notification to artist
    let emailSent = false;
    let emailId: string | undefined;
    let emailError: string | undefined;
    
    if (!resend || !process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('XXX')) {
      console.warn('⚠️ Resend API key not configured properly - email not sent');
      emailError = 'Email service not configured';
    } else {
      try {
        const result = await resend.emails.send({
          from: 'Art by Fio <onboarding@resend.dev>',
          to: ['artbyfio@gmail.com'],
          replyTo: email,
          subject: `New Contact Form - ${projectType}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2dd4bf;">New Contact Form Submission</h2>
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                <p><strong>Project Type:</strong> ${projectType}</p>
                ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
                <p><strong>Language:</strong> ${language === 'es' ? 'Spanish' : 'English'}</p>
              </div>
              <div style="margin: 20px 0;">
                <h3>Message:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <hr style="border: 1px solid #e5e5e5; margin: 30px 0;">
              <p style="font-size: 12px; color: #888;">
                Submission ID: ${submission.id}<br>
                Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
              </p>
            </div>
          `,
          text: `New Contact Submission\n\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\nProject Type: ${projectType}${budget ? `\nBudget: ${budget}` : ''}\nLanguage: ${language}\n\nMessage:\n${message}\n\nSubmission ID: ${submission.id}`
        });
        
        if (result.data?.id) {
          emailSent = true;
          emailId = result.data.id;
          console.log('✅ Email sent successfully:', emailId);
        } else if (result.error) {
          emailError = JSON.stringify(result.error);
          console.error('❌ Resend API error:', result.error);
        }
      } catch (emailException: any) {
        emailError = emailException.message || 'Unknown error';
        console.error('❌ Email sending exception:', emailException);
      }
    }

    // Return success even if email fails (submission is saved locally)
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: { 
        id: submission.id, 
        emailSent, 
        emailId,
        warning: !emailSent ? 'Submission saved but email notification failed' : undefined
      }
    });

  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}
