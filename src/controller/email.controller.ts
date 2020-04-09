import nodemailer from 'nodemailer';
require('dotenv').config();

export default class EmailHandler {
  static async sendEmail(client: any): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user:'ajluna@miuandes.cl',
          pass: 'Aa74079335'
        }
      });
      const status: boolean = await new Promise((rsv, rjt) => {
        transporter.sendMail(
          {
            from: process.env.EMAIL_ACC,
            to: process.env.EMAIL_RECIPIENT,
            subject: `Enquiry from: ${client.firstName} ${client.lastName}`,
            text: `Client Name: ${client.firstName} ${client.lastName} \nMobile: ${client.mob} \nEmail: ${client.email} \nEnquiry: ${client.comment} \n
              `
          },
          (err, _) => {
            if (err) {
              return rjt(false);
            }
            return rsv(true);
          }
        );
      });

      return {status};
    } catch (err) {
      return {
        error: true,
        message: err.message
      };
    }
  }
}