import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { Resend } from 'resend';

dotenv.config();

const app = express();
app.use(express.json());
const port = 3001;

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface EmailRequestBody {
  subject?: string;
  html?: string;
}

app.get('/', (req: Request<{}, {}, EmailRequestBody>, res: Response) => {
  res.send('Server Works!');
});

// POST /api/request
app.post('/api/request', async (req: Request<{}, {}, EmailRequestBody>, res: Response) => {
  // parse body
  const messageBody = prepareEmail(req.body);
  // const result = await sendEmail(req.body);
  console.log(messageBody);
  res.json(messageBody);
});

function prepareEmail(request: EmailRequestBody) {
  // parse template
  // replace values -> return the results
  return '';
}

async function sendEmail(data: EmailRequestBody) {
  try {
    const response = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL as string,
      subject: data.subject || 'No subject',
      html: data.html || '<p>No content</p>',
    });
    return response;
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { error: error.message };
  }
}

app.listen(port, () => {
  console.log(`==== server started ====`);
});
