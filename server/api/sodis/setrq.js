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

    const res = await $fetch("http://localhost:8080/disp", {
        method: "GET",
        query: data,
        headers: {
            cookie: `JSESSIONID=${cookies['JSESSIONID']}`
        }
    });

    // console.log(`res.headers.get("set-cookie")`, res.headers.getSetCookie())



    return res

})