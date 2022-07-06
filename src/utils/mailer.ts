const key = "memes" + process.env.SENDGRID_KEY
const keyy = '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'
const sgMail = require('@sendgrid/mail')

export const mailer = async (mssg: any) => {
    sgMail.setApiKey(process.env.SENDGRID_KEY)
    const fullMssg = {
        ...mssg,
        from: process.env.SUPPORT_EMAIL
    }
    await sgMail.send(fullMssg);
}