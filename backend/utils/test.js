const nodemailer = require('nodemailer');
require('dotenv').config();

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

const mailOptions = {
    from: 'brownloon3@gmail.com'
    ,
    to: 'brownloon3@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email to verify Nodemailer configuration.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error:', error);
      

    } else {
        console.log('Email sent:', info.response);
    }
});
