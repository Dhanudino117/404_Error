import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            requestType,
            organizationName,
            contactPerson,
            email,
            phone,
            disasterLocation,
            disasterType,
            urgency,
            resourcesNeeded,
            resourcesProvided,
            description,
            affectedPeople,
        } = body;

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASSWORD, // Your email password or app password
            },
        });

        // Email to the organization (if requesting support)
        if (requestType === 'request_support' && email) {
            const orgMailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: `Support Request - ${disasterType} in ${disasterLocation}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background-color: #FF9B45; padding: 20px; text-align: center;">
                            <h1 style="color: white; margin: 0;">Support Request Received</h1>
                        </div>
                        
                        <div style="padding: 30px; background-color: #f9f9f9;">
                            <h2 style="color: #521C0D;">Dear ${organizationName},</h2>
                            
                            <p style="color: #333; line-height: 1.6;">
                                A support request has been submitted for a disaster situation requiring immediate attention.
                            </p>
                            
                            <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h3 style="color: #D5451B; border-bottom: 2px solid #FF9B45; padding-bottom: 10px;">
                                    Disaster Information
                                </h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 10px; font-weight: bold; color: #521C0D;">Location:</td>
                                        <td style="padding: 10px; color: #333;">${disasterLocation}</td>
                                    </tr>
                                    <tr style="background-color: #F4E7E1;">
                                        <td style="padding: 10px; font-weight: bold; color: #521C0D;">Disaster Type:</td>
                                        <td style="padding: 10px; color: #333;">${disasterType}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-weight: bold; color: #521C0D;">Urgency Level:</td>
                                        <td style="padding: 10px; color: #D5451B; font-weight: bold;">${urgency}</td>
                                    </tr>
                                    ${affectedPeople ? `
                                    <tr style="background-color: #F4E7E1;">
                                        <td style="padding: 10px; font-weight: bold; color: #521C0D;">People Affected:</td>
                                        <td style="padding: 10px; color: #333;">${affectedPeople}</td>
                                    </tr>
                                    ` : ''}
                                </table>
                            </div>
                            
                            <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h3 style="color: #D5451B; border-bottom: 2px solid #FF9B45; padding-bottom: 10px;">
                                    Resources Needed
                                </h3>
                                <p style="color: #333; line-height: 1.6;">${resourcesNeeded}</p>
                            </div>
                            
                            <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h3 style="color: #D5451B; border-bottom: 2px solid #FF9B45; padding-bottom: 10px;">
                                    Description
                                </h3>
                                <p style="color: #333; line-height: 1.6;">${description}</p>
                            </div>
                            
                            <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h3 style="color: #D5451B; border-bottom: 2px solid #FF9B45; padding-bottom: 10px;">
                                    Contact Information
                                </h3>
                                <p style="color: #333; margin: 5px 0;"><strong>Contact Person:</strong> ${contactPerson}</p>
                                <p style="color: #333; margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
                                <p style="color: #333; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                            </div>
                            
                            <div style="margin-top: 30px; padding: 20px; background-color: #FFF3E8; border-left: 4px solid #FF9B45; border-radius: 5px;">
                                <p style="color: #521C0D; margin: 0; font-weight: bold;">
                                    ⚠️ Please respond to this request as soon as possible based on the urgency level.
                                </p>
                            </div>
                        </div>
                        
                        <div style="background-color: #521C0D; padding: 20px; text-align: center;">
                            <p style="color: white; margin: 0; font-size: 12px;">
                                ReliefSync - Disaster Response Coordination System
                            </p>
                        </div>
                    </div>
                `,
            };

            await transporter.sendMail(orgMailOptions);
        }

        // Email to the submitter (confirmation)
        const submitterMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: requestType === 'request_support' 
                ? `Confirmation: Support Request Submitted for ${disasterLocation}`
                : `Confirmation: Assistance Report Submitted for ${disasterLocation}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #FF9B45; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">
                            ${requestType === 'request_support' ? 'Support Request Confirmed' : 'Assistance Report Confirmed'}
                        </h1>
                    </div>
                    
                    <div style="padding: 30px; background-color: #f9f9f9;">
                        <h2 style="color: #521C0D;">Dear ${contactPerson || organizationName},</h2>
                        
                        <p style="color: #333; line-height: 1.6;">
                            Thank you for submitting your ${requestType === 'request_support' ? 'support request' : 'assistance report'} 
                            through ReliefSync. We have received your submission and it is being processed.
                        </p>
                        
                        <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <h3 style="color: #D5451B; border-bottom: 2px solid #FF9B45; padding-bottom: 10px;">
                                Submission Summary
                            </h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px; font-weight: bold; color: #521C0D;">Organization:</td>
                                    <td style="padding: 10px; color: #333;">${organizationName}</td>
                                </tr>
                                <tr style="background-color: #F4E7E1;">
                                    <td style="padding: 10px; font-weight: bold; color: #521C0D;">Location:</td>
                                    <td style="padding: 10px; color: #333;">${disasterLocation}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-weight: bold; color: #521C0D;">Disaster Type:</td>
                                    <td style="padding: 10px; color: #333;">${disasterType}</td>
                                </tr>
                                <tr style="background-color: #F4E7E1;">
                                    <td style="padding: 10px; font-weight: bold; color: #521C0D;">
                                        ${requestType === 'request_support' ? 'Urgency:' : 'Status:'}
                                    </td>
                                    <td style="padding: 10px; color: #333;">${urgency}</td>
                                </tr>
                            </table>
                        </div>
                        
                        ${requestType === 'request_support' ? `
                        <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <h3 style="color: #D5451B; border-bottom: 2px solid #FF9B45; padding-bottom: 10px;">
                                Resources Requested
                            </h3>
                            <p style="color: #333; line-height: 1.6;">${resourcesNeeded}</p>
                        </div>
                        ` : `
                        <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <h3 style="color: #D5451B; border-bottom: 2px solid #FF9B45; padding-bottom: 10px;">
                                Resources Provided
                            </h3>
                            <p style="color: #333; line-height: 1.6;">${resourcesProvided}</p>
                        </div>
                        `}
                        
                        <div style="margin-top: 30px; padding: 20px; background-color: #E8F5E9; border-left: 4px solid #4CAF50; border-radius: 5px;">
                            <p style="color: #2E7D32; margin: 0; font-weight: bold;">
                                ✓ Your submission has been recorded and relevant parties have been notified.
                            </p>
                        </div>
                        
                        <p style="color: #666; margin-top: 30px; font-size: 14px;">
                            If you have any questions or need to update this submission, please contact us at 
                            <a href="mailto:${process.env.EMAIL_USER}" style="color: #FF9B45;">${process.env.EMAIL_USER}</a>
                        </p>
                    </div>
                    
                    <div style="background-color: #521C0D; padding: 20px; text-align: center;">
                        <p style="color: white; margin: 0; font-size: 12px;">
                            ReliefSync - Disaster Response Coordination System
                        </p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(submitterMailOptions);

        return NextResponse.json(
            { message: 'Emails sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending emails:', error);
        return NextResponse.json(
            { error: 'Failed to send emails', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
