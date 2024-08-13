const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service : 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'brownloon3@gmail.com',
    pass: 'iecpmqvovhfqgbkr',
  },
});


const sendEmail = async (options) => {
    const mailOptions = {
        from: 'brownloon@gmail.com',
        to: options.to,
        subject: options.subject,
        text: options.text
    };

  try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Ensure the error is propagated
    }
};

module.exports = sendEmail;

