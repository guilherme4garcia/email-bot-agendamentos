function getTime() {
  const sysdate = new Date()
  sysdate.setHours(sysdate.getHours() - 3)

  const dia = String(sysdate.getDate())
  const mes = String(sysdate.getMonth() + 1)
  const ano = String(sysdate.getFullYear())
  const today = dia + '/' + mes + '/' + ano

  /* Hora do sistema */

  const minuto =
    String(sysdate.getMinutes() < 10 ? '0' : '') + sysdate.getMinutes()
  const hour1 = String(sysdate.getUTCHours())
  const horario1 = hour1 + ':' + minuto

  /* Hora do sistema -1 */
  const hour2 = String(sysdate.getUTCHours() - 1)
  const horario2 = hour2 + ':' + minuto

  const sql = `
  SELECT TGFTEL.CODPARC, TGFTEL.DHCHAMADA, TGFTEL.DHPROXCHAM, TGFPAR.NOMEPARC, TGFPAR.EMAIL, TGFTEL.PENDENTE,AD_CADPETS.NOME, 
  (SELECT LISTAGG(DESCRPROD, '; ')  WITHIN GROUP (ORDER BY AD_TELSERV.NUREL) FROM AD_TELSERV INNER JOIN TGFPRO ON TGFPRO.CODPROD=AD_TELSERV.CODPROD WHERE AD_TELSERV.NUREL=TGFTEL.NUREL)
  FROM TGFTEL 
  LEFT JOIN TGFPAR ON TGFTEL.CODPARC = TGFPAR.CODPARC  
  LEFT JOIN AD_CADPETS ON AD_CADPETS.CODPARC=TGFPAR.CODPARC AND AD_CADPETS.CODPET=TGFTEL.AD_PET
  WHERE PENDENTE = 'S' AND DHCHAMADA BETWEEN TO_DATE('${today} ${horario2}', 'dd/mm/yyyy HH24:MI:SS') AND TO_DATE('${today} ${horario1}', 'dd/mm/yyyy HH24:MI:SS')
  ORDER BY DHCHAMADA
  `

  return sql
}

module.exports = { getTime }
