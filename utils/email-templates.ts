import { getEmailTemplate, WEBSITE_EMAIL } from './email';

export function getOrderConfirmationTemplate(orderData: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
        size?: string;
    }>;
    subtotal: number;
    deliveryAddress: string;
    deliveryCity: string;
    deliveryState: string;
    deliveryZip: string;
    phone: string;
    specialInstructions?: string;
    timeline?: string;
}) {
    const itemsHtml = orderData.items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
                <strong style="color: #1e293b;">${item.name}</strong>
                ${item.size ? `<br><span style="color: #64748b; font-size: 14px;">Size: ${item.size}</span>` : ''}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #475569;">
                ${item.quantity}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #1e293b; font-weight: bold;">
                $${item.price.toLocaleString()}
            </td>
        </tr>
    `).join('');

    const content = `
        <p style="margin: 0 0 20px 0; color: #475569;">
            Thank you for your order, ${orderData.customerName}! We've received your quote request and our team is already working on it.
        </p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #f97316; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; color: #1e293b; font-weight: bold; font-size: 18px;">
                Order #${orderData.orderNumber}
            </p>
            <p style="margin: 0; color: #64748b; font-size: 14px;">
                We'll review your configuration and contact you within 24 hours with a formal quote including delivery.
            </p>
        </div>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Order Details</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
            <thead>
                <tr style="background-color: #f1f5f9;">
                    <th style="padding: 12px; text-align: left; color: #1e293b; font-weight: bold; border-bottom: 2px solid #e2e8f0;">Item</th>
                    <th style="padding: 12px; text-align: center; color: #1e293b; font-weight: bold; border-bottom: 2px solid #e2e8f0;">Quantity</th>
                    <th style="padding: 12px; text-align: right; color: #1e293b; font-weight: bold; border-bottom: 2px solid #e2e8f0;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
                <tr>
                    <td colspan="2" style="padding: 15px; text-align: right; font-weight: bold; color: #1e293b; border-top: 2px solid #e2e8f0;">
                        Estimated Total:
                    </td>
                    <td style="padding: 15px; text-align: right; font-weight: bold; color: #f97316; font-size: 18px; border-top: 2px solid #e2e8f0;">
                        $${orderData.subtotal.toLocaleString()}
                    </td>
                </tr>
            </tbody>
        </table>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Delivery Information</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Address:</strong> ${orderData.deliveryAddress}
            </p>
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">City:</strong> ${orderData.deliveryCity}
            </p>
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">State:</strong> ${orderData.deliveryState}
            </p>
            <p style="margin: 0; color: #475569;">
                <strong style="color: #1e293b;">ZIP:</strong> ${orderData.deliveryZip}
            </p>
        </div>

        ${orderData.timeline ? `
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-weight: bold;">
                    Timeline: ${orderData.timeline}
                </p>
            </div>
        ` : ''}

        ${orderData.specialInstructions ? `
            <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Special Instructions</h3>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
                <p style="margin: 0; color: #475569; white-space: pre-wrap;">${orderData.specialInstructions}</p>
            </div>
        ` : ''}

        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; color: #065f46; font-weight: bold;">Next Steps:</p>
            <ul style="margin: 0; padding-left: 20px; color: #047857;">
                <li>We verify inventory availability</li>
                <li>We calculate exact delivery costs based on your address</li>
                <li>You'll receive a detailed PDF quote via email</li>
            </ul>
        </div>

        <p style="margin: 30px 0 0 0; color: #475569;">
            If you have any questions, please don't hesitate to contact us at 
            <a href="mailto:${WEBSITE_EMAIL}" style="color: #f97316; text-decoration: none; font-weight: bold;">${WEBSITE_EMAIL}</a>
        </p>
    `;

    return getEmailTemplate({
        title: 'Order Confirmation',
        content,
        footerText: 'We appreciate your business!',
    });
}

export function getOrderNotificationTemplate(orderData: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
        size?: string;
    }>;
    subtotal: number;
    deliveryAddress: string;
    deliveryCity: string;
    deliveryState: string;
    deliveryZip: string;
    specialInstructions?: string;
    timeline?: string;
}) {
    const itemsHtml = orderData.items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
                <strong style="color: #1e293b;">${item.name}</strong>
                ${item.size ? `<br><span style="color: #64748b; font-size: 14px;">Size: ${item.size}</span>` : ''}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #475569;">
                ${item.quantity}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #1e293b; font-weight: bold;">
                $${item.price.toLocaleString()}
            </td>
        </tr>
    `).join('');

    const content = `
        <p style="margin: 0 0 20px 0; color: #475569;">
            A new order has been received and requires your attention.
        </p>
        
        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; color: #92400e; font-weight: bold; font-size: 18px;">
                Order #${orderData.orderNumber}
            </p>
            <p style="margin: 0; color: #78350f; font-size: 14px;">
                Please review and process this order as soon as possible.
            </p>
        </div>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Customer Information</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Name:</strong> ${orderData.customerName}
            </p>
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Email:</strong> <a href="mailto:${orderData.customerEmail}" style="color: #f97316; text-decoration: none;">${orderData.customerEmail}</a>
            </p>
            <p style="margin: 0; color: #475569;">
                <strong style="color: #1e293b;">Phone:</strong> ${orderData.customerPhone}
            </p>
        </div>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Order Details</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
            <thead>
                <tr style="background-color: #f1f5f9;">
                    <th style="padding: 12px; text-align: left; color: #1e293b; font-weight: bold; border-bottom: 2px solid #e2e8f0;">Item</th>
                    <th style="padding: 12px; text-align: center; color: #1e293b; font-weight: bold; border-bottom: 2px solid #e2e8f0;">Quantity</th>
                    <th style="padding: 12px; text-align: right; color: #1e293b; font-weight: bold; border-bottom: 2px solid #e2e8f0;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
                <tr>
                    <td colspan="2" style="padding: 15px; text-align: right; font-weight: bold; color: #1e293b; border-top: 2px solid #e2e8f0;">
                        Estimated Total:
                    </td>
                    <td style="padding: 15px; text-align: right; font-weight: bold; color: #f97316; font-size: 18px; border-top: 2px solid #e2e8f0;">
                        $${orderData.subtotal.toLocaleString()}
                    </td>
                </tr>
            </tbody>
        </table>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Delivery Information</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Address:</strong> ${orderData.deliveryAddress}
            </p>
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">City:</strong> ${orderData.deliveryCity}
            </p>
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">State:</strong> ${orderData.deliveryState}
            </p>
            <p style="margin: 0; color: #475569;">
                <strong style="color: #1e293b;">ZIP:</strong> ${orderData.deliveryZip}
            </p>
        </div>

        ${orderData.timeline ? `
            <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #1e40af; font-weight: bold;">
                    Timeline: ${orderData.timeline}
                </p>
            </div>
        ` : ''}

        ${orderData.specialInstructions ? `
            <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Special Instructions</h3>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
                <p style="margin: 0; color: #475569; white-space: pre-wrap;">${orderData.specialInstructions}</p>
            </div>
        ` : ''}
    `;

    return getEmailTemplate({
        title: 'New Order Received',
        content,
        footerText: 'Please process this order promptly.',
    });
}

export function getContactFormTemplate(formData: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}) {
    const content = `
        <p style="margin: 0 0 20px 0; color: #475569;">
            You have received a new contact form submission.
        </p>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Contact Information</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Name:</strong> ${formData.firstName} ${formData.lastName}
            </p>
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Email:</strong> <a href="mailto:${formData.email}" style="color: #f97316; text-decoration: none;">${formData.email}</a>
            </p>
            <p style="margin: 0; color: #475569;">
                <strong style="color: #1e293b;">Subject:</strong> ${formData.subject}
            </p>
        </div>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Message</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0; color: #475569; white-space: pre-wrap;">${formData.message}</p>
        </div>
    `;

    return getEmailTemplate({
        title: 'New Contact Form Submission',
        content,
    });
}

export function getContactFormConfirmationTemplate(formData: {
    firstName: string;
    subject: string;
}) {
    const content = `
        <p style="margin: 0 0 20px 0; color: #475569;">
            Thank you for contacting Steel Container Store, ${formData.firstName}!
        </p>
        
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0; color: #065f46; font-weight: bold;">
                We've received your message regarding "${formData.subject}"
            </p>
            <p style="margin: 10px 0 0 0; color: #047857; font-size: 14px;">
                Our team will review your inquiry and get back to you within 24 hours.
            </p>
        </div>

        <p style="margin: 30px 0 0 0; color: #475569;">
            If you have any urgent questions, please don't hesitate to contact us at 
            <a href="mailto:${WEBSITE_EMAIL}" style="color: #f97316; text-decoration: none; font-weight: bold;">${WEBSITE_EMAIL}</a>
        </p>
    `;

    return getEmailTemplate({
        title: 'We Received Your Message',
        content,
        footerText: 'We appreciate your interest in Steel Container Store!',
    });
}

export function getRentInquiryTemplate(formData: {
    name: string;
    email: string;
    phone: string;
    size: string;
    condition?: string;
    containerType?: string;
    intendedUse?: string;
    doorConfiguration?: string;
    duration: string;
    location: string;
    modifications?: string;
    message?: string;
}) {
    const content = `
        <p style="margin: 0 0 20px 0; color: #475569;">
            You have received a new rental inquiry.
        </p>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Customer Information</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Name:</strong> ${formData.name}
            </p>
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Email:</strong> <a href="mailto:${formData.email}" style="color: #f97316; text-decoration: none;">${formData.email}</a>
            </p>
            <p style="margin: 0; color: #475569;">
                <strong style="color: #1e293b;">Phone:</strong> ${formData.phone}
            </p>
        </div>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Container Specifications</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Size Needed:</strong> ${formData.size}
            </p>
            ${formData.condition ? `<p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Condition Preference:</strong> ${formData.condition}
            </p>` : ''}
            ${formData.containerType ? `<p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Container Type:</strong> ${formData.containerType}
            </p>` : ''}
            ${formData.doorConfiguration ? `<p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Door Configuration:</strong> ${formData.doorConfiguration}
            </p>` : ''}
            ${formData.intendedUse ? `<p style="margin: 0; color: #475569;">
                <strong style="color: #1e293b;">Intended Use:</strong> ${formData.intendedUse}
            </p>` : ''}
        </div>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Rental Details</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Rental Duration:</strong> ${formData.duration}
            </p>
            <p style="margin: 0; color: #475569;">
                <strong style="color: #1e293b;">Delivery Zip Code:</strong> ${formData.location}
            </p>
        </div>

        ${formData.modifications ? `
            <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Modifications Needed</h3>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
                <p style="margin: 0; color: #475569; white-space: pre-wrap;">${formData.modifications}</p>
            </div>
        ` : ''}

        ${formData.message ? `
            <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Additional Notes</h3>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
                <p style="margin: 0; color: #475569; white-space: pre-wrap;">${formData.message}</p>
            </div>
        ` : ''}
    `;

    return getEmailTemplate({
        title: 'New Rental Inquiry',
        content,
    });
}

export function getRentInquiryConfirmationTemplate(formData: {
    name: string;
    size: string;
}) {
    const content = `
        <p style="margin: 0 0 20px 0; color: #475569;">
            Thank you for your rental inquiry, ${formData.name}!
        </p>
        
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0; color: #065f46; font-weight: bold;">
                We've received your request for a ${formData.size} container rental
            </p>
            <p style="margin: 10px 0 0 0; color: #047857; font-size: 14px;">
                Our rental team will check availability and send you a custom quote within 24 hours.
            </p>
        </div>

        <p style="margin: 30px 0 0 0; color: #475569;">
            If you have any questions, please contact us at 
            <a href="mailto:${WEBSITE_EMAIL}" style="color: #f97316; text-decoration: none; font-weight: bold;">${WEBSITE_EMAIL}</a>
        </p>
    `;

    return getEmailTemplate({
        title: 'Rental Inquiry Received',
        content,
        footerText: 'We appreciate your interest in Steel Container Store!',
    });
}

export function getCreditApplicationTemplate(formData: {
    companyName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    requestedLimit: string;
    [key: string]: string;
}) {
    const content = `
        <p style="margin: 0 0 20px 0; color: #475569;">
            You have received a new credit application.
        </p>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Company Information</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Company Name:</strong> ${formData.companyName}
            </p>
        </div>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Contact Information</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Name:</strong> ${formData.firstName} ${formData.lastName}
            </p>
            <p style="margin: 0 0 8px 0; color: #475569;">
                <strong style="color: #1e293b;">Email:</strong> <a href="mailto:${formData.email}" style="color: #f97316; text-decoration: none;">${formData.email}</a>
            </p>
            <p style="margin: 0; color: #475569;">
                <strong style="color: #1e293b;">Phone:</strong> ${formData.phone}
            </p>
        </div>

        <h3 style="margin: 30px 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Credit Request</h3>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0; color: #475569;">
                <strong style="color: #1e293b;">Requested Credit Limit:</strong> $${parseFloat(formData.requestedLimit).toLocaleString()}
            </p>
        </div>
    `;

    return getEmailTemplate({
        title: 'New Credit Application',
        content,
    });
}

