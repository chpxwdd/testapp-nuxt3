<template>
  <div>
    <yandex-map height="600px" width="100%" :settings="{
      location: {
        center: [hotels[0].lng, hotels[0].lat],
        zoom: 9,
        duration: 0,
      }
    }">
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />

      <template v-for="(marker, markerIndex) in hotels" :key="markerIndex">
        <yandex-map-marker v-if="marker.lng || marker.lat" :settings="{
          onClick: () => (openMarker = markerIndex),
          zIndex: openMarker === markerIndex ? 1 : 0,
          coordinates: [marker.lng, marker.lat],
          title: `от ${marker.priceFrom} ${marker.currency}`,
          properties: {
            priceFrom: marker.priceFrom,
            currency: marker.currency,
          },
          popup: { position: 'top' },
        }">
          <div class="hotel">
            от {{ formatNumberWithSpaces(marker.priceFrom) }}
            {{ marker.currency }}

            <div v-if="openMarker === markerIndex" class="popup" @click.stop="openMarker = null">
              {{ marker.name }}
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
.hotel {
  position: relative;
  background: white;
  border: 1px solid #fff;
  white-space: nowrap;
  text-align: left;
  color: #393939;
  font-size: 0.6rem;
  font-weight: bold;
  // width: 100px;
  text-align: left;
  padding: 0.25rem;
  border: 1px solid #999;
  border-radius: 3px;
  cursor: pointer;
}

.hotel:hover {
  background: #e3e3d3;
}

.popup {
  position: relative;
  top: calc(100% + 3px);
  border-top: 1px solid #ccc;
  // background: #ddd;
  margin-top: 0.25rem;
  padding: 0.15rem 0.25rem;
  font-size: 10px;
  color: black;
  text-align: left;
  font-weight: normal;
  white-space: nowrap;
}
</style>
