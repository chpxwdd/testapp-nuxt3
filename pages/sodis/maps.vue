<template>
  <div>
    <PageTitle title="Yandex maps markers" lead="sodis" />
    <YandexMap :cords="[0, 0]" :hotels="hotels" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'sodis'
})
const hotels = await $fetch("/api/sodis/hotels");
console.log("markers", hotels);
</script>

<style lang="scss" scoped></style>
