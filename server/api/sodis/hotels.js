import { buildEndpoint } from "~/helpers/sodis";

export default defineEventHandler(async (event) => {

    // const { countryId } = getQuery(event);
    console.log("hotels.js for countryId:", 102)

    const res = await $fetch(buildEndpoint(), {
        method: 'GET',
        query: {
            s: 'json_hotels',
            countryId: 102
        }
    })

    return res.prices.map(item => {
        return {
            id: item.id,
            name: item.name,
            priceFrom: item.priceFrom,
            lng: item.lng, 
            lat: item.lat,
            currency: item.currency
        }
    })

    // return res.prices.map(item => {
    //     return {
    //         id: item.id,
    //         coordinates: [item.lng, item.lat],
    //         title: item.name,
    //         subtitle: String(item.priceFrom),
    //         rating: item.starrating,
    //         stars: item.starcode,
    //         price: item.priceFrom,
    //         bestBuy: item.bestBuy
    //     }
    // });
})