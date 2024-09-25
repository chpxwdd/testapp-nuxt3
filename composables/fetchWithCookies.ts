import { appendResponseHeader, H3Event, parseCookies } from "h3";
import { buildEndpoint } from "~/helpers/sodis";

export const fetchWithCookie = async (event: H3Event,  data: Object) => {
  // Get the response from the server endpoint
  const res = await $fetch.raw(buildEndpoint(), {
    query: {
      s:"json_rq2",
      ...data
    },
  });

  // const coookies = parseCookies(event);
  // console.log("coookies", coookies)
  console.log("res.headers.get('set-cookie')", res.headers);

  // Get the cookies from the response
  const cookies = (res.headers.get("cookie") || "").split(",");

  // Attach each cookie to our incoming Request
  for (const cookie of cookies) {
    appendResponseHeader(event, "set-сookie", cookie);
  }
  // Return the data of the response
  return res._data;
};
