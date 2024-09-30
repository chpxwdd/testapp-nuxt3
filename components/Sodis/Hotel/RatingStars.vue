<template>
    <div class="rating">
        <Icon v-for="star in stars" :key="star" name="mdi:star" :size="size" :color="color" />
    </div>
</template>

<script setup>
const props = defineProps({
    stars: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        default: 10,
    },
    color: {
        type: String,
        default: "black"
    }
})
</script>

<style lang="scss" scoped>
.rating {
    display: flex;
}
</style>