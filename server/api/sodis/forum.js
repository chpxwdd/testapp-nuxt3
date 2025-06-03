export default defineEventHandler(async (event) => {
    // const { countryId } = getQuery(event);
    console.log("hotels.js for countryId:");

    const res = await $fetch(`http://localhost:8080/disp2`, {
        method: "GET",
        headers:{
            Authorization: 'Basic ' + btoa('cherepanov:!0ykbYwnWA')
        },
        query: {
            s: "json_forums",
            id: 1,
        },
    });
    console.log(res)
    return res
});
