import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    })
  }

  async sendActivationMail(to, link) {
    const info = await this.transporter.sendMail({
      from: 'kozura.sergj33@gmail.com',
      to: 'kozura.sergj33@gmail.com',
      secure: true,
      subject: `Account activation on the site ${process.env.API_URL}`,
      text: '',
      html: `
  <div> 
    <h1>To activate, follow the link</h1>
    <a href="${link}">${link}</a>
  </div>
  `,
    })
    console.log(`Message ${to} sent: `, info.messageId)
  }
}

export default new MailService()
