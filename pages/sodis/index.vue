<template>
  <PageTitle title="Sodis" lead="test features" />
  <div class="p-2">
    <h6>Опрашиваемый сервер:</h6>
    <div>
      <code class="text-xl text-indigo-500">{{
        buildEndpoint()
      }}</code
      ><br />
      <small>(можно изменить в <code>./constants/sodis.js</code>)</small>
    </div>
  </div>
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
import { buildEndpoint } from '~/helpers/sodis';



const ds = ref("28.01.2025");
const df = ref("03.02.2025");
const rq = ref({});

const handleGetRq = async () => {
  const res = await $fetch("api/sodis/getrq");
  rq.value = res;
};

const handleSetRq = async () => {
  const res = await $fetch(`api/sodis/setrq?ds=${ds.value}&df=${df.value}`);
  rq.value = res;
};

onMounted(async () => {
  handleGetRq();
});
</script>
