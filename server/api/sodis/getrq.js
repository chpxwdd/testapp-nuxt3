import { buildEndpoint } from "~/helpers/sodis";

export default defineEventHandler(async (event) => {

  const eventCookies = parseCookies(event);
  console.log("getrq.js parseCookies(event):", eventCookies['JSESSIONID'])

  const res = await $fetch( buildEndpoint(), {
    method: 'GET',
    query: {
      s: 'json_rq2'
    },
    headers: {
      cookie: `JSESSIONID=${eventCookies['JSESSIONID']};`
    },
    onResponse({ response }) {
        const cookies = response.headers.getSetCookie();
        if (!cookies.length) return
        cookies.forEach((cookie) => {
            if (!event) return
            appendResponseHeader(event, 'set-cookie', cookie);
        });
    }
  })

  return res

})