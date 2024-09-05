<template>
  <ColorScheme>
    <USelect v-model="$colorMode.preference" :options="['light', 'dark']" />
  </ColorScheme>
  <!-- <UButton
    @click="toggleDarkMode($colorMode.preference === 'dark' ? 'light' : 'dark')"
  >
    <nuxt-icon v-if="$colorMode.preference === 'dark'" name="sun" />
    <nuxt-icon v-else name="moon" />
  </UButton> -->
</template>

<script setup></script>

<style lang="scss" scoped></style>
