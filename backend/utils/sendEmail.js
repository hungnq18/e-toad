const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  // Sử dụng ethereal cho test, hoặc cấu hình SMTP thật nếu cần
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER || 'your_ethereal_user',
      pass: process.env.SMTP_PASS || 'your_ethereal_pass',
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || 'no-reply@etoaddemo.com',
    to,
    subject,
    html,
  });

  return info;
};

module.exports = sendEmail; 