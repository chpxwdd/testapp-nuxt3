<template>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

<script setup>
const links = [
    [
        {
            label: "Sodis",
            icon: "i-heroicons-briefcase",
            to: "/sodis",
        }
    ], [
        {
            label: "Cookie",
            icon: "i-heroicons-book-open",
            to: "/sodis/cookie",
        },
        {
            label: "Maps markers",
            icon: "i-heroicons-map-pin",
            to: "/sodis/maps",
        }
    ],
]
</script>

<style lang="scss" scoped></style>