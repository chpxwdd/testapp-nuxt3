
import { buildEndpoint } from "~/helpers/sodis";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const res = await $fetch.raw(buildEndpoint(), {
    method: 'GET',
    query: {
      s: "json_country",
      id
    },
    credentials: 'same-origin',
    server: false
  });

  return res

})
