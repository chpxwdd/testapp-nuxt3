import { buildEndpoint } from "~/helpers/sodis";

export default defineEventHandler(async (event) => {

    const { ds, df } = getQuery(event);
    const cookies = parseCookies(event)
    console.log("eventCookie", cookies)
    console.log("setrq.js parseCookies(event):", cookies['JSESSIONID']);
    
    const data = {
        s: "json_rq2",
        ds: ds,
        df: df,
        adults: 2,
        childs: "",
        class: 1,
        cityFromCode: 17089,
        calcVisa: 1,
        calcTransfer: 1,
        calcInsurance: 1,
    };
        

    const res = await $fetch(buildEndpoint(), {
        method: "GET",
        query: data,
        headers: {
            cookie: `JSESSIONID=${cookies['JSESSIONID']}`
        },
        onResponse({ response }) {
            const cookies = response.headers.getSetCookie();
            if (!cookies.length) return
            cookies.forEach((cookie) => {
                if (!event) return
                appendResponseHeader(event, 'set-cookie', cookie);
            });
        }
    });

    return res

})