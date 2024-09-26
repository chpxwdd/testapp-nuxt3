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
      <!-- <yandex-map-default-marker
        :settings="{
          coordinates: [hotels[0].lng, hotels[0].lat],
          title: 'Marker with static content',
          subtitle: 'Marker with static content description',
          color: 'green',
          popup: {
            position: 'top',
            content: 'Static content that hides marker',
            hidesMarker: true,
          },
        }"
      >
        <template #popup="{ close }">
          <div class="marker-popup" @click="close()">
            Click me to close popup
          </div>
        </template>
      </yandex-map-default-marker> -->

      <template v-for="(marker, markerIndex) in hotels" :key="markerIndex">
        <yandex-map-marker
          v-if="marker.lng || marker.lat"
          :settings="{
            onClick: () => (openMarker = markerIndex),
            zIndex: openMarker === markerIndex ? 1 : 0,
            coordinates: [marker.lng, marker.lat],
            title: `от ${marker.priceFrom} ${marker.currency}`,
            properties: {
              priceFrom: marker.priceFrom,
              currency: marker.currency,
            },
            popup: { position: 'top' },
          }"
        >
          <div class="hotel">
            от {{ formatNumberWithSpaces(marker.priceFrom) }}
            {{ marker.currency }}

            <div
              v-if="openMarker === markerIndex"
              class="popup"
              @click.stop="openMarker = null"
            >
              Click me to close popup
            </div>
          </div>

          <!-- <div class="hotel">
            <div class="priceFrom">
              {{ formatNumberWithSpaces(marker.priceFrom) }}
            </div>
          </div> -->
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

const openMarker = ref(null);

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
.marker-popup {
  background: #fff;
  border-radius: 3px;
  border: #393939;
  padding: 10px;
  color: black;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}
.popup {
  position: relative;
  top: calc(100% + 3px);
  width: 200px;
  border-radius: 3px;
  border: #393939;
  background: #ddd;
  border-radius: 3px;
  padding: 3px;
  font-size: 10px;
  color: black;
  text-align: left;
}
.marker {
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  padding: 10px 20px;
  white-space: nowrap;
}

.hotel:hover {
  background: #d3d3d3;
}
.hotel {
  position: relative;
  background: white;
  border: 1px solid #fff;
  white-space: nowrap;
  text-align: left;
  color: #393939;
  font-size: 0.6rem;
  // width: 100px;
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #999;
  border-radius: 3px;
  cursor: pointer;
}
</style>
