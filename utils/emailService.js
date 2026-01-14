// utils/emailService.js
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send admin notification email
const sendAdminNotification = async (userData) => {
  try {
    console.log('📤 FROM:', process.env.EMAIL_FROM);
    console.log('📥 TO (Admin):', process.env.ADMIN_EMAIL);
    console.log('📧 Sending admin notification via SendGrid...');

    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: {
        email: process.env.EMAIL_FROM,
        name: process.env.EMAIL_FROM_NAME || 'ASR Tech'
      },
      subject: '🔔 New User Registration - ASR Tech',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; }
            .header { background: linear-gradient(135deg, #7A6854 0%, #6B5945 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #C9A86A; border-radius: 5px; }
            .label { font-weight: bold; color: #7A6854; display: block; margin-bottom: 5px; }
            .value { color: #333; font-size: 16px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🏠 New User Registration</h1>
              <p style="margin: 10px 0 0 0;">A new user has registered on ASR Tech Platform</p>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">👤 Full Name:</span>
                <span class="value">${userData.name}</span>
              </div>
              <div class="info-row">
                <span class="label">📧 Email:</span>
                <span class="value">${userData.email}</span>
              </div>
              <div class="info-row">
                <span class="label">📱 Phone:</span>
                <span class="value">${userData.phone}</span>
              </div>
              <div class="info-row">
                <span class="label">📅 Registration Date:</span>
                <span class="value">${new Date(userData.registrationDate).toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}</span>
              </div>
              <div class="footer">
                <p>This is an automated notification from ASR Tech Real Estate Platform</p>
                <p style="margin-top: 10px; color: #999;">Powered by ASR Tech</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text version as fallback
      text: `
        New User Registration - ASR Tech
        
        Full Name: ${userData.name}
        Email: ${userData.email}
        Phone: ${userData.phone}
        Registration Date: ${new Date(userData.registrationDate).toLocaleString()}
        
        This is an automated notification from ASR Tech Real Estate Platform.
      `
    };

    const response = await sgMail.send(msg);
    console.log('✅ Admin notification email sent successfully!');
    console.log('📬 Response:', response[0].statusCode);
    
    return { 
      success: true, 
      statusCode: response[0].statusCode,
      messageId: response[0].headers['x-message-id']
    };
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    
    if (error.response) {
      console.error('SendGrid Error Body:', error.response.body);
    }
    
    throw error;
  }
};

// Send welcome email to user
const sendWelcomeEmail = async (userData) => {
  try {
    console.log('📤 FROM:', process.env.EMAIL_FROM);
    console.log('📥 TO (User):', userData.email);
    console.log('📧 Sending welcome email via SendGrid...');

    const msg = {
      to: userData.email,
      from: {
        email: process.env.EMAIL_FROM,
        name: process.env.EMAIL_FROM_NAME || 'ASR Tech'
      },
      subject: '🎉 Welcome to ASR Tech Real Estate!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; }
            .header { background: linear-gradient(135deg, #7A6854 0%, #6B5945 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); font-size: 15px; }
            .button { display: inline-block; background: #7A6854; color: white !important; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
            .greeting { font-size: 24px; font-weight: bold; color: #333; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">🏠 Welcome to ASR Tech!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Your journey to finding your dream home starts here</p>
            </div>
            <div class="content">
              <p class="greeting">Hello ${userData.name}! 👋</p>
              <p>Thank you for joining ASR Tech Real Estate Solutions. We're excited to help you find your perfect property.</p>
              
              <h3 style="color: #7A6854; margin-top: 30px;">What You Get:</h3>
              <div class="feature">✅ Access to 5000+ Premium Properties</div>
              <div class="feature">✅ Expert Real Estate Consultants</div>
              <div class="feature">✅ Secure & Trusted Platform</div>
              <div class="feature">✅ Exclusive Property Deals</div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL}/home" class="button">Explore Properties</a>
              </div>
              
              <p style="margin-top: 30px;">If you have any questions, feel free to reach out to our support team.</p>
              
              <p style="margin-top: 20px;">Best regards,<br><strong>The ASR Tech Team</strong></p>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
                <p>© ${new Date().getFullYear()} ASR Tech Real Estate Solutions. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text version as fallback
      text: `
        Welcome to ASR Tech Real Estate!
        
        Hello ${userData.name}!
        
        Thank you for joining ASR Tech Real Estate Solutions. We're excited to help you find your perfect property.
        
        What You Get:
        ✅ Access to 5000+ Premium Properties
        ✅ Expert Real Estate Consultants
        ✅ Secure & Trusted Platform
        ✅ Exclusive Property Deals
        
        Explore properties at: ${process.env.FRONTEND_URL}/home
        
        If you have any questions, feel free to reach out to our support team.
        
        Best regards,
        The ASR Tech Team
      `
    };

    const response = await sgMail.send(msg);
    console.log('✅ Welcome email sent successfully!');
    console.log('📬 Response:', response[0].statusCode);
    
    return { 
      success: true, 
      statusCode: response[0].statusCode,
      messageId: response[0].headers['x-message-id']
    };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    
    if (error.response) {
      console.error('SendGrid Error Body:', error.response.body);
    }
    
    throw error;
  }
};

module.exports = {
  sendAdminNotification,
  sendWelcomeEmail
};