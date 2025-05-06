import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  port: 587,
  secure: false,
  host: 'smtp.gmail.com',
  tls: {rejectUnauthorized: false},
  auth: {user: process.env.NEXT_PUBLIC_EMAIL, pass: process.env.NEXT_PUBLIC_PASSWORD},
});

type sendMailProps = {
  html: string;
  mail: string;
  subject: string;
};

export const sendMail = ({mail, html, subject}: sendMailProps) => {
  return transporter.sendMail({
    html,
    subject,
    to: mail,
    from: process.env.NEXT_PUBLIC_EMAIL,
  });
};
