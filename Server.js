const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: ["https://kishan-s-profile.netlify.app", "http://localhost:3000"], // Allow multiple origins
  methods: "POST",
  allowedHeaders: "Content-Type"
}));

// Middleware to parse JSON
app.use(bodyParser.json());

// POST endpoint to handle form submissions
app.post("/contact", (req, res) => {
  const { email, phone, text } = req.body;

  // Validate required fields
  if (!email || !phone || !text) {
    return res.status(400).send("All fields are required.");
  }

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "New Contact Form Submission",
    text: `Phone: ${phone}\nEmail: ${email}\nMessage: ${text}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully!");
  });
});

// Start the server
const PORT = process.env.PORT || 2525;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});