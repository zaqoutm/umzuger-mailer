const express = require('express');
const { Resend } = require('resend');
require('dotenv').config(); // to read .env

const app = express();
app.use(express.json());
const port = 3001;
const resend = new Resend(process.env.RESEND_API_KEY);

// post new request
app.post('/api/request', async (req, res) => {
  const result = await sendEmail(req.body);
  console.log(result);
  res.json(result);
});

async function sendEmail(data) {
  try {
    const response = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL,
      subject: data.subject || 'No subject',
      html: data.html || '<p>No content</p>',
    });
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: error.message };
  }
}

// start server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

/*
Params
  get() path ('/:id', (req, res)) => { req.params.id}
  get() query () => { req.query.id } ?id=...
  post() body req.body.username
**/
