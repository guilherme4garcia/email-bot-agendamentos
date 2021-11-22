/* Not in use, just a template */

require('dotenv').config()
;('use strict')
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASS // generated ethereal password
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"TUDO DE BICHO" <agendamentos@tudodebicho.com.br>', // sender address
    to: 'guilherme.garcia@tudodebicho.com.br', // list of receivers
    subject: 'Agendamento - Pet Shop', // Subject line
    text: '', // plain text body
    html: '', // html body
    icalEvent: {
      method: 'PUBLISH',
      path: 'files/event.ics'
    }
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error)
