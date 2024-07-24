import nodemailer from 'nodemailer';

export async function sendVerificationEmail(username: string, email: string, message: string, faculty: boolean) {
  try {
    console.log('MAILER_USER:', process.env.MAILER_USER);
    console.log('MAILER_PASS:', process.env.MAILER_PASS);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const link = `${process.env.DOMAIN}/verify/${username}`;
    const htmlContent = faculty
      ? `
        <h2>Respected Sir/Madam,</h2>
        <p>
          I am ${username}, I have a request for booking the board room. Kindly click on the link to either accept or reject the request:
        </p>
        ${message.length < 2 ? `<a href="${link}" style="color: #61dafb;">Verify here</a>` : message}
        <p>Thank you</p>
        <p>Regards,</p>
        <p>${username}</p>
      `
      : `
        <h2>Good Morning,</h2>
        <p>
          There is a request for booking the board room.
        </p>
        <p>PLEASE CHECK AND SEND A RESPONSE.</p>
        ${message.length < 2 ? `<a href="${link}" style="color: #61dafb;">Verify here</a>` : message}
        <p>Thank you</p>
        <p>Regards,</p>
        <p>${username}</p>
      `;

    const mailOptions = {
      from: 'devheinji@gmail.com',
      to: email,
      subject: 'Verification',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('info', info);
    return info;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
