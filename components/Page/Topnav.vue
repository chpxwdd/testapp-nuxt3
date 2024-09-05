<template>
  <div class="bg-gray-200 dark:bg-gray-900 p-0">
  <!-- <div class="border-b border-gray-200 dark:border-gray-800"> -->
    <UContainer>
      <div class="flex justify-between">
        <div class="flex justify-start gap-3">
          <UHorizontalNavigation :links="guestLinks" />
          <!-- <UHorizontalNavigation :links="guestLinks" v-if="!loggedIn" /> -->
          <!-- <UHorizontalNavigation :links="authLinks" v-if="loggedIn" /> -->
        </div>
        <div class="my-3 mx-5 flex gap-3" style="width: 200px">
          <PageColorModeSwitch/>
          <!-- <UButton v-if="!loggedIn" @click="navigateTo('/auth/login')">
            Sign In
          </UButton>
          <UButton v-if="loggedIn" @click="signOut()"> Sign out </UButton> -->
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
// const { signOut, status } = useAuth();

// const loggedIn = computed(() => status.value === "authenticated");

// const route = useRoute();
const guestLinks = [
  {
    label: "Homepage",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Sodis Feature",
    icon: "i-heroicons-pencil",
    to: "/sodis",
  },
];

const authLinks = guestLinks.concat([
  // {
  //   label: "Football",
  //   icon: "i-heroicons-football",
  //   to: "/football",
  // },
  // {
  //   label: "Hockey",
  //   icon: "i-hockey",
  //   to: "/hockey",
  // },
]);
</script>

<style scoped>
.navbar-brand a.router-link-exact-active {
  color: whitesmoke !important;
}
.router-link-exact-active {
  font-weight: 400;
  color: brown !important;
}
select > option {
  padding: 5px;
}
</style>
