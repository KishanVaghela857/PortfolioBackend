const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  const { email, phone, discribe } = req.body;
  if (!email || !phone || !discribe) {
    return res.status(400).send('All fields are required.');
  }
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `Phone: ${phone}\nEmail: ${email}\nMessage: ${discribe}`
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.send('Email sent successfully!');
  });
});

app.listen(2525, () => {
  console.log('Server started on port 2525...');
});
