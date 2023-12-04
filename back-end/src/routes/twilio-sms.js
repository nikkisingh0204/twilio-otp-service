const {TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});
const express = require('express');


const router = express.Router();

router.post('/send-otp', async (req, res, next) => {
  const {countryCode, phoneNumber} = req.body;
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: 'sms',
      });
    res
      .status(200)
      .send(`OTP send successfully!: ${JSON.stringify(otpResponse)}`);
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || 'Somthing went wrong');
  }
});
router.post('/verify-otp', async (req, res, next) => {
  const {countryCode, phoneNumber, otp} = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
      });
    res
      .status(200)
      .send(`OTP verified successfully!: ${JSON.stringify(verifiedResponse)}`);
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || 'Somthing went wrong');
  }
});

module.exports = router;
