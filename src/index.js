const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

app.get('/', (req, res) => {
  res.send(200);
});

app.post('/api/data', (req, res) => {
  console.log(req.body);
  res.json({ message: 'تم الاستلام', data: req.body });
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

/*
Params
  get() path ('/:id', (req, res)) => { req.params.id}
  get() query () => { req.query.id } ?id=...
  post() body req.body.username
**/
