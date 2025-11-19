# Email Setup Instructions for Contact Form

The contact form is now configured to send emails to **artbyfio@gmail.com** when users submit the form.

## Setup Steps

### 1. Install Resend Package

Run this command in your terminal:

```powershell
npm install resend
```

### 2. Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free tier)
3. Go to "API Keys" in the dashboard
4. Create a new API key
5. Copy the API key

### 3. Add API Key to Environment Variables

Add this line to your `.env` file:

```
RESEND_API_KEY=re_your_actual_api_key_here
```

### 4. Test the Contact Form

1. Start your development server: `npm run dev`
2. Go to the contact page
3. Fill out and submit the form
4. Check artbyfio@gmail.com for the notification email

## What Happens When Form is Submitted

1. ✅ Form data is saved to the database
2. ✅ Email is sent to artbyfio@gmail.com with all contact details
3. ✅ Reply-to is set to the submitter's email for easy responses
4. ✅ User sees success message on the website

## Email Template Includes

- Submitter's name, email, and phone
- Project type and budget range
- Full message/project description
- Language preference (English/Spanish)
- Submission timestamp and ID

## Important Notes

### For Production (Custom Domain)

The current setup uses Resend's default sender (`onboarding@resend.dev`). For production:

1. Verify your domain in Resend dashboard
2. Update the `from` field in `/app/api/contact/route.ts`:
   ```typescript
   from: 'Contact Form <noreply@yourdomain.com>'
   ```

### Alternative Email Services

If you prefer a different email service:

**Option 1: Nodemailer with Gmail**
- Requires Gmail app password
- Free but has daily limits

**Option 2: SendGrid**
- 100 emails/day free tier
- Similar setup to Resend

**Option 3: AWS SES**
- Very cheap (free tier: 3000/month)
- More complex setup

## Troubleshooting

**Emails not sending?**
1. Check `.env` file has `RESEND_API_KEY` set correctly
2. Restart your dev server after adding the API key
3. Check browser console for errors
4. Check Resend dashboard logs

**Form submits but no email?**
- Form still saves to database (check admin panel)
- Email error is logged to console
- Verify API key is valid in Resend dashboard

## Cost

- **Free tier**: 100 emails/day, 3,000/month
- **Paid tier**: $20/month for 50,000 emails if needed

For a contact form, free tier should be more than sufficient.
