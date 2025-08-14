import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { engine } from 'express-handlebars';
import juice from 'juice';
import path from 'path';
import { Resend } from 'resend';
import { FinalFormDataType } from './types';
var cors = require('cors');

dotenv.config(); // to read .env
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.UI_CLIENT_URI }));
const port = 3001;

// view engine
app.engine('handlebars', engine({ helpers: { yesNo: (value: boolean) => (value ? 'Ja' : '_') } }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/request
app.post('/api/send', async (req: Request<{}, {}, FinalFormDataType>, res: Response) => {
  const data = req.body;

  res.render('email', data, async (err, html) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'Ops, something went wrong!' });
    }
    const inlined = juice(html); // make inline css
    const result = await sendEmail(inlined);

    if (result.error) {
      res.status(500).send({ error: 'Ops, something went wrong' });
      console.log('-------error-------');
      console.log('Client: ' + data.customer?.phoneOrEmail + ' is trying to submit an order.');
      console.error(result.error.message);
    }
    res.send();
  });
});

async function sendEmail(html: string) {
  return await resend.emails.send({
    from: 'Umzuger <onboarding@resend.dev>',
    to: process.env.RECIPIENT_EMAIL as string,
    subject: 'Client Order',
    html: html,
  });
}

app.listen(port, () => {
  console.log(`## server started ## port:${port}`);
});
