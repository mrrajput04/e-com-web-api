import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL,
);

oAuth2Client.setCredentials({
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,
  expiry_date: 1680074616214,
});
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

export async function sendVerificationEmail(email: string, token: string) {
  const message = [
    '<ecommercereacttest@gmail.com>',
    `To: ${email}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    'Subject: Verify your email address',
    '',
    `Please click <a href="http://localhost:3000/api/user/verify:email?token=${token}">here</a> to verify your email address.`,
  ].join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });

  console.log(res.data, '===>>');
}
