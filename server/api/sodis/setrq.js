import { BASEURL, PROTOCOL, PORT} from "~/constants/sodis";

export default defineEventHandler(async (event) => {

    const { ds, df } = getQuery(event);
    const cookies = parseCookies(event)
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
    const endpoint = `${PROTOCOL}://${BASEURL}:${PORT}/disp`;
    const res = await $fetch(endpoint, {
        method: "GET",
        query: data,
        headers: {
            cookie: `JSESSIONID=${cookies['JSESSIONID']}`
        }
    });

    // console.log(`res.headers.get("set-cookie")`, res.headers.getSetCookie())



    return res

})