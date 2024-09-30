<template>
    <div class="map-card">
        <div class="carg-galery">
            <!-- <WidgetSwiper :images="hotel[0].images"/> -->
            <WidgetSwiper />
            <!-- <NuxtImg :src="imageUrl(hotel.images[0])" class="card-image" /> -->
        </div>
        <SodisHotelRatingStars :size="20" :color="`brown`" />
        <h3>{{ hotel.name }}</h3>
    </div>
</template>

<script setup>

import { buildUrl } from '~/helpers/sodis';

const props = defineProps({
    hotel: {
        type: Object,
        required: true
    }
})

const imageUrl = (id) => `${buildUrl()}/imageservlet?id=${String(id)}`

</script>

<style lang="scss" scoped>
.map-card {
    position: absolute;
    z-index: 2;
    bottom: 2px;
    left: 2px;
    height: 400px;
    width: 300px;
    background-color: #eaeaea;
    color: #282828;
    border: 1px solid darkgray;
    border-radius: 3px;

    .carg-galery {
        position: relative;
        height: 200px;

        .card-image {}
    }
}
</style>