import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API || "",
  domain: process.env.MAILGUN_DOMAIN || ""
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "jinchul112@gmail.com",
    to: "jinchul112@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const url = "http://localhost:3000";
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `<div>Click<b><a href="${url}/emailVerify/${key}">here</a></b> to verify your email</div>`;
  return sendEmail(emailSubject, emailBody);
};
