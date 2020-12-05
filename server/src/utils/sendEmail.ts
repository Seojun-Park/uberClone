import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API || "",
  domain: "sandboxb346050a4fb5447389d4132ac67ab44d.mailgun.org"
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
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/>here</a>`;
  return sendEmail(emailSubject, emailBody);
};
