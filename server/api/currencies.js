export default defineEventHandler(async (event) => {
    const API_KEY = "cur_live_yLomBvFczQQL7viuHkrk341FDDcx9VlrtS8sE6S6"
    const { data } = await $fetch(`https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`)

    return data
});