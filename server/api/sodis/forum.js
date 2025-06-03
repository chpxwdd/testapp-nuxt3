import { buildEndpoint } from "~/helpers/sodis.js";
import {BASEURL, PORT, PROTOCOL} from "~/constants/sodis.js";

export default defineEventHandler(async (event) => {
    // const { countryId } = getQuery(event);
    // console.log("hotels.js for countryId:", 102);

    const res = await $fetch(`http://localhost:8080/disp`, {
        method: "GET",
        headers:{
            'Authorization': 'Basic ' + btoa('cherepanov' + ':' + '!0ykbYwnWA')
        },
        query: {
            s: "json_forums",
            id: 1,
        },
    });
    console.log(res)
    return res;
});
