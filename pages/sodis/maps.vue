<template>
  <div>
    <PageTitle title="Yandex maps markers" lead="sodis" />
    <YandexMap :hotels="hotels" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'sodis'
})
const hotels = await $fetch("/api/sodis/hotels");


</script>

<style lang="scss" scoped></style>
