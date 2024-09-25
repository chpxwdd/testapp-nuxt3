<template>
  <div>
    <yandex-map
      :settings="{
        location: {
          center: [hotels[0].lng, hotels[0].lat],
          zoom: 9,
          duration: 0,
        },
      }"
      height="1000px"
      width="100%"
    >
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />

      <template v-for="(marker, markerIndex) in hotels" :key="markerIndex">
        <yandex-map-marker
          v-if="marker.lng || marker.lat"
          :settings="{
            onClick: handleClick,
            zIndex:-1000,
            coordinates: [marker.lng, marker.lat],
            title: `от ${marker.priceFrom} ${marker.currency}`,
            properties: {
              priceFrom: marker.priceFrom,
              currency: marker.currency,
            },
          }"
        >
          <div class="hotel">
            <!-- <div class="name">{{ marker.name }}</div> -->
            <div class="priceFrom">{{ formatNumberWithSpaces(marker.priceFrom) }}</div>
          </div>
        </yandex-map-marker>
      </template>
    </yandex-map>
  </div>
</template>

<script setup>
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapClusterer,
  YandexMapMarker,
  YandexMapDefaultSchemeLayer,
} from "vue-yandex-maps";

const props = defineProps({
  coords: {
    type: Array,
    default: () => [],
  },
  hotels: {
    type: Array,
    default: () => [],
  },
});

const handleClick = (event) => console.log(event);

const formatNumberWithSpaces = (number) => {
  return number?.toLocaleString("en-US").replace(/,/g, " ");
};

// console.log("props.hotels", props.hotels);

const activeHotel = shallowRef(1);
const hintVisible = shallowRef(false);
const isLoading = shallowRef(true);
const isLocationSelected = shallowRef(false);

const openHotelCard = (index, cords) => {
  activeHotel.value = index;
  isLocationSelected.value = true;
  lastHotelCords.value = cords;
};

const handleCluster = (cl) => {
  return cl.features.reduce((min, { properties }) => {
    return properties.priceFrom < min
      ? `${formatNumberWithSpaces(properties.priceFrom)} ${properties.currency}`
      : min;
  }, Infinity);
};
</script>

<style scoped lang="scss">
.hotel {
  position: relative;
  background: white;
  border: 2px solid #fff;
  text-align: left;
  color: #393939;
  font-size: 0.6rem;
  width: 60px;
  text-align: center;
  padding: 2px;
  border:1px solid #999;
  border-radius: 3px;

  .name {
  }
  .price {
  }
}
</style>
