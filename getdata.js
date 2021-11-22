const sankhyaApiHelper = require('./helpers/sankhyaApi')
const sql_generator = require('./helpers/sql_generator')

async function getSession() {
  try {
    const login = process.env.LOGIN
    const senha = process.env.SANKHYA_PASS
    const bodyLogin = `<serviceRequest serviceName="MobileLoginSP.login"><requestBody><NOMUSU>${login}</NOMUSU><INTERNO>${senha}</INTERNO></requestBody></serviceRequest>`
    const { data } = await sankhyaApiHelper.get(
      '/service.sbr?serviceName=MobileLoginSP.login',
      { data: bodyLogin }
    )
    const jsession = data.split('<jsessionid>')[1].split('</jsessionid>')[0]
    sankhyaApiHelper.defaults.headers.common.Cookie = `JSESSIONID=${jsession}`
  } catch (err) {
    console.log('ERROR ----', err)
  }
}

async function getQuery(sql) {
  await getSession()

  const body = {
    serviceName: 'DbExplorerSP.executeQuery',
    requestBody: {
      sql
    }
  }

  const { data } = await sankhyaApiHelper.get(
    '/service.sbr?serviceName=DbExplorerSP.executeQuery',
    {
      data: body,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  )

  const items = data.responseBody.rows
  return items
}

module.exports = { getSession, getQuery }
