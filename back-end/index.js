require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const twilioRouter = require('./src/routes/twilio-sms');
const app = express();

const {PORT} = process.env;
const port = 8080 || PORT;
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use('/twilio-sms', twilioRouter);

app.get('/', () => {
  console.log('OTP app demo');
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
