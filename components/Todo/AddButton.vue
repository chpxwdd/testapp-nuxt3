<template>
  <button>
    <slot >add</slot>

  </button>
</template>

<script setup></script>

<style scoped>
button {
  @apply px-2;
  background-color: #aaa;
  border: 1px solid gray;
  border-radius: 3px;
}
</style>
    