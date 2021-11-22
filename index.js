const control = require('./helpers/ics_generator')
require('dotenv').config()
;('use strict')
const nodemailer = require('nodemailer')
const sql_generator = require('./helpers/sql_generator')
const getdata = require('./getdata')

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

async function send_email() {
  const data = await getdata.getQuery(sql_generator.getTime())

  for await (let element of data) {
    await control.generate_ics(element)

    let info = await transporter.sendMail({
      from: '"TUDO DE BICHO" <agendamentos@tudodebicho.com.br>', // sender address
      to: element[4], // list of receivers
      subject: 'Agendamento - Pet Shop', // Subject line
      text: '', // plain text body
      html: '', // html body
      icalEvent: {
        method: 'PUBLISH',
        path: 'files/event.ics'
      }
    })
  }
}

var CronJob = require('cron').CronJob
var job = new CronJob(
  '0 * * * *',
  function () {
    send_email()
  },
  null,
  true,
  'America/Sao_Paulo'
)
