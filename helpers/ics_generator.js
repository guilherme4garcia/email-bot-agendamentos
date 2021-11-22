const ics = require('ics')
const { writeFileSync } = require('fs')

const generate_ics = async function (data) {
  /* -Format data- */
  /* split */
  let data_split = data[2].split('')

  /* slice */
  let day_arr = data_split.slice(0, 2)
  let month_arr = data_split.slice(2, 4)
  let year_arr = data_split.slice(4, 8)
  let hour_arr = data_split.slice(9, 11)
  let minute_arr = data_split.slice(12, 14)

  /* parse */
  let day = parseInt(day_arr.join(''))
  let month = parseInt(month_arr.join(''))
  let year = parseInt(year_arr.join(''))
  let hour = parseInt(hour_arr.join(''))
  let minute = parseInt(minute_arr.join(''))

  /* result */
  let date = [year, month, day, hour, minute]
  let pet = data[6]
  let servico = data[7]
  let description = `Pet: ${pet} - Serviço: ${servico}`

  const event = {
    start: date,
    duration: { hours: 1, minutes: 0 },
    title: 'Pet Shop - Tudo de Bicho',
    description: description,
    location:
      'Tudo de Bicho - Loja Aquarius Open Mall, Av. Florestan Fernandes, 500 - Jardim Serimbura, São José dos Campos - SP, 12242-012, Brasil',
    url: 'http://www.tudodebicho.com.br/',
    geo: { lat: -23.21559747394141, lon: -45.901656338092174 },
    categories: [''],
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'Tudo de Bicho', email: 'frankbot@tudodebicho.com.br' },
    attendees: [
      {
        name: data[3],
        email: data[4],
        rsvp: true,
        partstat: 'ACCEPTED',
        role: 'REQ-PARTICIPANT'
      }
    ]
  }

  ics.createEvent(event, (error, value) => {
    if (error) {
      console.log(error)
      return
    }

    writeFileSync(`files/event.ics`, value)
  })
}

module.exports = { generate_ics }
