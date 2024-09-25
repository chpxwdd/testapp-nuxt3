import { buildEndpoint } from "~/helpers/sodis";

export default defineEventHandler(async (event) => {
    
    const eventCookie = parseCookies(event);
    console.log("eventCookie", eventCookie)

    const res = await $fetch.raw(buildEndpoint(), { query: {s:"json_rq2"}, credentials: 'same-origin', server:false});
    
      
        console.log("res.headers.get('set-cookie')", res.headers);
      
      // Get the cookies from the response
      const cookies = (res.headers.get("set-cookie") || "").split(";");
      console.log("coookies", cookies)

      return {cookies}

})