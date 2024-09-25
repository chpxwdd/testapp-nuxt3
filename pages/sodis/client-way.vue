<template>
  <PageTitle title="Прямой путь" lead="json_rq2" />
  <div class="p-2">
    <h6>Опрашиваемый сервер:</h6>
    <div>
      <code class="text-xl text-indigo-500">{{ buildEndpoint() }}</code
      ><br />
      <small>(можно изменить в <code>./constants/sodis.js</code>)</small><br />
    </div>
  </div>
  <div class="grid grid-cols-2 mt-5">
    <div class="px-3">
      <UInput class="mt-2" type="text" name="ds" v-model="ds" />
      <UInput class="mt-2" type="text" name="df" v-model="df" />
      <UButton class="mt-2" @click="handleSetRq">Установить данные</UButton>
    </div>

    <div class="px-3">
      <div class="flex gap-3">
        <UButton class="mt-2" @click="handleGetRq">Получить данные</UButton>
      </div>
      <div class="mt-2">
        <h3>jsessionid.value</h3>
        <pre
          class="mt-2 bg-gray-100 dark:bg-gray-800 border dark:border-gray-900 rounded p-3"
          >{{ jsessionid || "empty" }}</pre
        >
      </div>
      <div class="mt-2">
        <h3>rq</h3>
        <pre
          class="mt-2 bg-gray-100 dark:bg-gray-800 border dark:border-gray-900 rounded p-3"
          >{{ rq || "empty" }}</pre
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { buildEndpoint } from "~/helpers/sodis";
import { appendResponseHeader, H3Event, parseCookies } from "h3";

const rq = ref({});

// const ds = ref("29.01.25");
// const df = ref("05.02.25");
const ds = ref("");
const df = ref("");

const event = useRequestEvent();
const headers = useRequestHeaders(["cookie"]);
let jsessionid = useCookie("JSESSIONID");
// const url = "https://www.sodis.ru/disp?s=json_rq2";

const res = await useAsyncData(async () => {
   // Get the response from the server endpoint
   const res = await $fetch.raw(buildEndpoint(), {
    query: {
      s:"json_rq2",
      // ...data
    },
  });

  // // const coookies = parseCookies(event);
  // // console.log("coookies", coookies)
  // console.log("res.headers.get('set-cookie')", res.headers);

  // // Get the cookies from the response
  // const cookies = res.headers.getSetCookie();
  // // const cookies = (res.headers.get("cookie") || "").split(";");

  // // Attach each cookie to our incoming Request
  // for (const cookie of cookies) {
  //   appendResponseHeader(event, "set-сookie", cookie);
  // }
  // Return the data of the response
  return res._data;
});

console.log("res from fetchWithCookie:", res);
rq.value = res.data;
ds.value = res.data.date_start
df.value = res.data.date_finish

const handleGetRq = async () => {
  console.log("handle GET rq jsessionid.value", jsessionid.value);
  const res = await useFetch(buildEndpoint(), {
    credentials: "include",
    headers: headers,
    query: {
      s: "json_rq2",
    },
    onResponse({ response, request, options }) {
      console.log(jsessionid);
      const cookies = response.headers.getSetCookie();

      if (!cookies.length) {
        console.log("not cookies on response");
        return;
      }
      cookies.forEach((cookie) => {
        if (!event) return;
        appendResponseHeader(event, "set-cookie", cookie);
      });
    },
  });

  jsessionid = useCookie("JSESSIONID");
  console.log("handleGetRq res:", res);

  rq.value = res.data;
  ds.value = res.data.date_start;
  df.value = res.data.date_finish;

  // const res = await useAsyncData(async () => {
  //   const res = await fetchWithCookie(event, {});
  //   console.log("res from fetchWithCookie:", res);
  // });
};
const handleSetRq = async () => {
  console.log("handle SET rq jsessionid.value", jsessionid.value);

  const res = await useFetch(buildEndpoint(), {
    credentials: "same-origin",
    headers: {
      cookie: `JSESSIONID=${jsessionid.value}; Path=/`,
    },
    query: {
      s: "json_rq2",
      ds: ds.value,
      df: df.value,
    },
    onResponse({ response, request, options }) {
      console.log(jsessionid);
      const cookies = response.headers.getSetCookie();
      if (!cookies.length) {
        console.log("not cookies on response");
        return;
      }
      cookies.forEach((cookie) => {
        if (!event) return;
        appendResponseHeader(event, "set-cookie", cookie);
      });
    },
  });
  rq.value = res.data.value;
  ds.value = res.data.date_start;
  df.value = res.data.date_finish;

  console.log("", res.data.value);
};
</script>

<style lang="scss" scoped></style>
