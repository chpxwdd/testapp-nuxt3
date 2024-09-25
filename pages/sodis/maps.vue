<template>
  <div>
    <PageTitle title="Yandex" lead="maps" />
    <YandexMap :cords="[0, 0]" :hotels="hotels" />
  </div>
</template>

<script setup>
const hotels = await $fetch("/api/sodis/hotels");
console.log("markers", hotels);
</script>

<style lang="scss" scoped></style>
