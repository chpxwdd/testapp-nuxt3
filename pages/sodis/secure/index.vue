<template>

  <PageTitle title="Secure" lead="pages" />

</template>

<script setup>
// json_forums

const forums = ref([]);
const id = ref(1);

const handleGetForums = async () => {

  const res = await $fetch("/api/sodis/forum");
  rq.value = res;
}

handleGetForums();


</script>

<style lang="scss" scoped>

</style>