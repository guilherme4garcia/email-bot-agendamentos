const axios = require('axios')

const sankhyaApi = axios.create({
  baseURL: 'https://tudodebicho.gcloudlabs.com/mge',
  headers: {
    'Content-Type': 'application/xml'
  }
})

module.exports = sankhyaApi
