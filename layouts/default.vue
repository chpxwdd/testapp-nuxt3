<script setup>
import Topnav from '~/components/Page/Topnav.vue';
</script>
<template>
    <NuxtLoadingIndicator/>
  <div class="flex flex-col h-screen ">
    <Topnav/>    
    <main class="mb-auto">
      <div class="container mx-auto mt-4 ">
        <slot />
      </div>
    </main>
    
    <footer>
      <div class="container mx-auto py-2 text-end">
        <small class="text-slate-500 font-bold">Sodis Camp test dev</small>
      </div>
    </footer>
  </div>
</template>

<style scoped>
</style>
