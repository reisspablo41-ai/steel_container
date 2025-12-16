import { Resend } from 'resend';

const WEBSITE_EMAIL = 'contact@steelcontainerstore.com';

// Get the "from" email address - use verified domain
// You can override with RESEND_FROM_EMAIL in your .env if needed
// Default uses the verified contact@steelcontainerstore.com domain
function getFromEmail() {
    const customFrom = process.env.RESEND_FROM_EMAIL || process.env.resend_from_email;
    if (customFrom) {
        return customFrom;
    }
    // Use verified domain - contact@steelcontainerstore.com
    return `Steel Container Store <${WEBSITE_EMAIL}>`;
}

// Lazy initialization of Resend client
function getResendClient() {
    // Check for both uppercase and lowercase env variable names
    const apiKey = process.env.RESEND_KEY || process.env.resend_key;
    if (!apiKey) {
        console.error('Resend API key not found. Checked for RESEND_KEY and resend_key environment variables.');
        throw new Error('Resend API key is not configured. Please set RESEND_KEY or resend_key in your environment variables.');
    }
    return new Resend(apiKey);
}

export interface EmailTemplateProps {
    title: string;
    content: string;
    footerText?: string;
}

export function getEmailTemplate({ title, content, footerText }: EmailTemplateProps): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 1px;">
                                STEEL CONTAINER STORE
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px; font-weight: bold;">
                                ${title}
                            </h2>
                            <div style="color: #475569; font-size: 16px; line-height: 1.6;">
                                ${content}
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f1f5f9; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
                            ${footerText ? `<p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px;">${footerText}</p>` : ''}
                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                © ${new Date().getFullYear()} Steel Container Store. All rights reserved.
                            </p>
                            <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 12px;">
                                <a href="mailto:${WEBSITE_EMAIL}" style="color: #f97316; text-decoration: none;">${WEBSITE_EMAIL}</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

export async function sendEmail({
    to,
    subject,
    html,
    from,
}: {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
}) {
    try {
        const resend = getResendClient();
        // Use provided from address, or get the default verified one
        const fromAddress = from || getFromEmail();
        
        const { data, error } = await resend.emails.send({
            from: fromAddress,
            to: Array.isArray(to) ? to : [to],
            subject,
            html,
        });

        if (error) {
            console.error('Resend error:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Email send error:', error);
        throw error;
    }
}

export { WEBSITE_EMAIL };

