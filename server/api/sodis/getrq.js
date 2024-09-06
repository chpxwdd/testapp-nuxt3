import { BASEURL, PROTOCOL, PORT } from "~/constants/sodis";

export default defineEventHandler(async (event) => {

  const eventCookies = parseCookies(event);
  console.log("getrq.js parseCookies(event):", eventCookies['JSESSIONID'])

  const endpoint = `${PROTOCOL}://${BASEURL}${(PORT === 80 || PORT === null) ? "" : ":" + PORT}/disp`;
  const res = await $fetch(endpoint, {
    method: 'GET',
    query: {
      s: 'json_rq2'
    },
    headers: {

      cookie: `JSESSIONID=${eventCookies['JSESSIONID']};`
    }
  })

  console.log("getrq.js res:", res)

  return res

})