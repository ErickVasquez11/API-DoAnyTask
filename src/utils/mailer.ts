const sgMail = require('@sendgrid/mail')

export const mailer = async (mssg: any) => {
    sgMail.setApiKey(process.env.SENDGRID_KEY)
    const fullMssg = {
        ...mssg,
        from: process.env.SUPPORT_EMAIL
    }
    //Por el momento desactivamos enviar correos: await sgMail.send(fullMssg);
}