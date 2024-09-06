import { BASEURL, PROTOCOL, PORT } from "~/constants/sodis";

export default defineEventHandler(async (event) => {

  // refreshCookie();
  const eventCookies = parseCookies(event);
  // console.log("event", event)
  // console.log("cookies", eventCookies)
    console.log("getrq.js parseCookies(event):", eventCookies['JSESSIONID'])
  
  const endpoint = `${PROTOCOL}://${BASEURL}${(PORT === 80 || PORT === null) ? "" : ":" + PORT}/disp`;
  const res = await $fetch(endpoint, {
    method: 'GET',
    query: {
      s: 'json_rq2'
    },
    headers: {
      cookie: `JSESSIONID=${eventCookies['JSESSIONID']}; Path=/; HttpOnly;`
      // cookie: `JSESSIONID=667e0b5f6efbed29f2600ccc1fd5; Path=/; HttpOnly;`
    }
  })
  // console.log("event", res)
  
  // console.log("getrq.js res:", res)
  
  return res
  
})