export default defineEventHandler(async (event) => {
  const eventCookies = parseCookies(event)
  const { id } = getQuery(event)
  const res = await $fetch('https://www.sodis.ru/disp', {
    method: 'GET',
    query: {
      s: 'json_hotel',
      id,
    },
    credentials: 'include',
    headers: {
      cookie: `JSESSIONID=${eventCookies.JSESSIONID};`,
    },
    onResponse ({ response }) {
      const cookies = response.headers.getSetCookie()
      if (!cookies.length) {
        return
      }
      cookies.forEach((cookie) => {
        if (!event) {
          return
        }
        appendResponseHeader(event, 'set-cookie', cookie)
      })
    },
  })

  return res
})
