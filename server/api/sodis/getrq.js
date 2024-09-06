export default defineEventHandler(async (event) => {

  const eventCookies = parseCookies(event);
  console.log("getrq.js parseCookies(event):", eventCookies['JSESSIONID'])

  const res = await $fetch('http://localhost:8080/disp', {
    method: 'GET',
    query: {
      s: 'json_rq2'
    },
    headers:{
    
      cookie: `JSESSIONID=${eventCookies['JSESSIONID']};`
    }
  })

  console.log("getrq.js res:", res)

  return res

})