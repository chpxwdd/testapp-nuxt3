<template>
  <div class="page-title">
    <h3 class="title">
      {{ title }}<span class="lead">{{ lead }}</span>
    </h3>
  </div>
</template>

<script setup lang="ts">
const { title, lead } = defineProps({
  title: {
    type: String,
    require: true,
  },
  lead: {
    type: String,
    require: false,
  },
});
</script>

<style scoped lang="css">
.page-title {
  @apply mb-4 border-b;
  text-transform: uppercase;
}

.page-title > h3 {
  @apply text-3xl pb-2;
  font-weight: 300;
}

.page-title > h3 > span {
  @apply ms-1 text-gray-600;
  font-weight: 100;
  text-transform: lowercase;
}
</style>
