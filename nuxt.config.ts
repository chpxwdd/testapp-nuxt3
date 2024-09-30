// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", 'nuxt-icon', 'vue-yandex-maps/nuxt', "@nuxt/image"],
  yandexMaps: {
    // apikey: '2be2e4ae-8c6d-4868-8b84-8e32d6f474c4',
    apikey: 'b252ff2d-8d8b-4a75-aee4-7427a43ffdbd',
  }


})