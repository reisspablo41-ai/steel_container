import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utils/email';
import {
    getOrderConfirmationTemplate,
    getOrderNotificationTemplate,
    getContactFormTemplate,
    getContactFormConfirmationTemplate,
    getRentInquiryTemplate,
    getRentInquiryConfirmationTemplate,
    getCreditApplicationTemplate,
} from '@/utils/email-templates';
import { WEBSITE_EMAIL } from '@/utils/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, data } = body;

        switch (type) {
            case 'order-confirmation': {
                // Send confirmation to customer
                const customerEmail = getOrderConfirmationTemplate(data);
                await sendEmail({
                    to: data.customerEmail,
                    subject: `Order Confirmation #${data.orderNumber} - Steel Container Store`,
                    html: customerEmail,
                });

                // Send notification to website
                const adminEmail = getOrderNotificationTemplate(data);
                await sendEmail({
                    to: WEBSITE_EMAIL,
                    subject: `New Order #${data.orderNumber} - Steel Container Store`,
                    html: adminEmail,
                });

                return NextResponse.json({ success: true });
            }

            case 'contact-form': {
                // Send notification to website
                const adminEmail = getContactFormTemplate(data);
                await sendEmail({
                    to: WEBSITE_EMAIL,
                    subject: `New Contact Form: ${data.subject} - Steel Container Store`,
                    html: adminEmail,
                });

                // Send confirmation to customer
                const customerEmail = getContactFormConfirmationTemplate(data);
                await sendEmail({
                    to: data.email,
                    subject: 'We Received Your Message - Steel Container Store',
                    html: customerEmail,
                });

                return NextResponse.json({ success: true });
            }

            case 'rent-inquiry': {
                // Send notification to website
                const adminEmail = getRentInquiryTemplate(data);
                await sendEmail({
                    to: WEBSITE_EMAIL,
                    subject: `New Rental Inquiry - ${data.size} Container - Steel Container Store`,
                    html: adminEmail,
                });

                // Send confirmation to customer
                const customerEmail = getRentInquiryConfirmationTemplate(data);
                await sendEmail({
                    to: data.email,
                    subject: 'Rental Inquiry Received - Steel Container Store',
                    html: customerEmail,
                });

                return NextResponse.json({ success: true });
            }

            case 'credit-application': {
                // Send notification to website
                const adminEmail = getCreditApplicationTemplate(data);
                await sendEmail({
                    to: WEBSITE_EMAIL,
                    subject: `New Credit Application - ${data.companyName} - Steel Container Store`,
                    html: adminEmail,
                });

                return NextResponse.json({ success: true });
            }

            default:
                return NextResponse.json(
                    { error: 'Invalid email type' },
                    { status: 400 }
                );
        }
    } catch (error: any) {
        console.error('Email API error:', error);
        console.error('Error stack:', error.stack);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            type: typeof error,
        });
        return NextResponse.json(
            { 
                error: 'Failed to send email', 
                details: error.message || 'Unknown error occurred',
                // Only include stack in development
                ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
            },
            { status: 500 }
        );
    }
}

