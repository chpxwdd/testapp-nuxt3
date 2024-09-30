<template>
    <div class="popup-marker" v-if="openMarker === markerIndex" @click.stop="openMarker = null">
        <SodisHotelRatingStars :size="10" :stars="marker.stars" :color="`goldenrod`" />
        <div class="hotel-name">{{ marker.name }}</div>
    </div>
</template>

<script setup>

const props = defineProps({
    marker: {
        type: Object,
        required: true,
        default: null
    },
    markerIndex: {
        type: Number,
        required: true,
        default: null
    },
    openMarker: {
        type: Number,
        required: true,
        default: null
    }
})

</script>

<style lang="scss" scoped>
.popup-marker {
    position: absolute;
    top: calc(100% - 3px);
    border: 1px solid #aba4a4;
    border-radius: 3px;
    background: #eee;
    padding: 0.25rem;
    font-size: 0.75rem;
    text-align: left;
    font-weight: 600;
    min-width: 200px;

    .hotel-name {
        color: brown
    }

}
</style>