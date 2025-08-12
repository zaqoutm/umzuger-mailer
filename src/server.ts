import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { engine } from 'express-handlebars';
import juice from 'juice';
import path from 'path';
import { Resend } from 'resend';
import { FinalFormDataType } from './types';
var cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

// view engine
app.engine('handlebars', engine({ helpers: { yesNo: (value: boolean) => (value ? 'Ja' : '_') } }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json());
const port = 3001;

const resend = new Resend(process.env.RESEND_API_KEY as string);

// POST /api/request
app.post('/api/send', async (req: Request<{}, {}, FinalFormDataType>, res: Response) => {
  res.render(
    'email',
    {
      data: req.body,
    },
    async (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Template render error' });
      }
      const inlined = juice(html); // make inline css
      res.setHeader('Content-Type', 'text/html; charset=utf-8');

      // send email
      const result = await sendEmail(inlined);
      res.send(result);
    }
  );
});

async function sendEmail(html: string) {
  try {
    const response = await resend.emails.send({
      from: 'Umzuger <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL as string,
      subject: 'New Order',
      html: html,
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
