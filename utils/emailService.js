const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      
    }
  });
};

// Send admin notification email
const sendAdminNotification = async (userData) => {
  try {
    console.log('📤 FROM:', process.env.EMAIL_USER);
console.log('📥 TO:', process.env.ADMIN_EMAIL);

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: '🔔 New User Registration - ASR Tech',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7A6854 0%, #6B5945 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #C9A86A; border-radius: 5px; }
            .label { font-weight: bold; color: #7A6854; }
            .value { color: #333; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏠 New User Registration</h1>
              <p>A new user has registered on ASR Tech Platform</p>
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
                <span class="value">${new Date(userData.registrationDate).toLocaleString()}</span>
              </div>
              <div class="footer">
                <p>This is an automated notification from ASR Tech Real Estate Platform</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    throw error;
  }
};

// Send welcome email to user
const sendWelcomeEmail = async (userData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userData.email,
      subject: '🎉 Welcome to ASR Tech Real Estate!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7A6854 0%, #6B5945 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .button { display: inline-block; background: #7A6854; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏠 Welcome to ASR Tech!</h1>
              <p>Your journey to finding your dream home starts here</p>
            </div>
            <div class="content">
              <h2>Hello ${userData.name}! 👋</h2>
              <p>Thank you for joining ASR Tech Real Estate Solutions. We're excited to help you find your perfect property.</p>
              
              <h3>What You Get:</h3>
              <div class="feature">✅ Access to 5000+ Premium Properties</div>
              <div class="feature">✅ Expert Real Estate Consultants</div>
              <div class="feature">✅ Secure & Trusted Platform</div>
              <div class="feature">✅ Exclusive Property Deals</div>
              
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/home" class="button">Explore Properties</a>
              </p>
              
              <p>If you have any questions, feel free to reach out to our support team.</p>
              
              <p>Best regards,<br>The ASR Tech Team</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    throw error;
  }
};

module.exports = {
  sendAdminNotification,
  sendWelcomeEmail
};
