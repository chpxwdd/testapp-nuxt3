<template>
  <PageTitle title="Sodis" lead="test features" />

  <div class="grid grid-cols-2 mt-5">
    <div class="px-3">
      <UInput class="mt-2" type="text" name="ds" v-model="ds" />
      <UInput class="mt-2" type="text" name="df" v-model="df" />
      <UButton class="mt-2" @click="handleSetRq">Установить данные</UButton>
    </div>

    <div class="px-3">
      <UButton class="mt-2" @click="handleGetRq">Получить данные</UButton>
      <pre
        class="mt-2 bg-gray-100 dark:bg-gray-800 border dark:border-gray-900 rounded p-3"
        >{{ rq }}</pre
      >
    </div>
  </div>
</template>

<script setup>
// const jsessionid = useCookie("JSESSIONID");
// jsessionid.value = 'c6d281c3b06f9d3a1416b8cdcc56'

const ds = ref("28.01.2025");
const df = ref("03.02.2025");
const rq = ref({});
    // const data = {
    //   s: "json_rq2",
    //   ds: ds.value,
    //   df: df.value,
    //   adults: 2,
    //   childs: "",
    //   class: 1,
    //   cityFromCode: 17089,
    //   calcVisa: 1,
    //   calcTransfer: 1,
    //   calcInsurance: 1,
    // };

const handleGetRq = async () => {
  const res = await $fetch("api/sodis/getrq");
  rq.value = res;
  
  // const res = await $fetch("https://www.sodis.ru/disp", {
  //   method: "GET",
  //   server: false,
  //   query: {
  //     s: "json_rq2",
  //   },
  // });
  // rq.value = res;

  // const event = useRequestEvent()
  // const { data: res } = await useAsyncData(() => fetchWithCookie(event, "https://www.sodis.ru/disp?s=json_rq2"))
  



  // console.log("handleGetRq", rq.value);
};

const handleSetRq = async () => {
  
  

    // const res = await $fetch.raw("https://www.sodis.ru/disp", {
      //   method: "GET",
      //   server: false,
      //   query: data,
      // });
      // rq.value = res._data;


  const res = await $fetch(`api/sodis/setrq?ds=${ds.value}&df=${df.value}`);
  rq.value = res;


  // console.log(res);
  console.log("handleSetRq", rq.value);
};




// onMounted(() => console.log(document.cookie))




onMounted(async () => {
  handleGetRq();

  // const res = await fetch(`https://www.sodis.ru/disp?s=json_rq2`);
  // rq.value = await res.json();
});
</script>
