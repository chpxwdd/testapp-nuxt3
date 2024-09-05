<template>
  <h4>Currencies</h4>
  <pre>
    {{ data }}
  </pre>
</template>

<script setup>
const { data } = await useFetch("/api/currencies");

</script>

<style lang="scss" scoped></style>
