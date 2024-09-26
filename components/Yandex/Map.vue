<template>
  <div>
    <yandex-map height="600px" width="100%" :settings="{
      location: {
        center: hotels[0].coordinates,
        zoom: 9,
        duration: 0,
      }
    }">
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-clusterer zoom-on-cluster-click>
        <template v-for="(marker, markerIndex) in hotels" :key="markerIndex">
          <yandex-map-marker :settings="{
            onClick: () => (openMarker = markerIndex),
            zIndex: openMarker === markerIndex ? 1 : 0,
            coordinates: marker.coordinates,
            title: `от ${marker.priceFrom} ${marker.currency}`,
            properties: {
              rating: marker.rating,
              stars: marker.stars,
              priceFrom: marker.priceFrom,
              currency: marker.currency,
            },
            popup: { position: 'top' },
          }">
            <div class="hotel">
              от {{ formatNumberWithSpaces(marker.priceFrom) }}
              {{ marker.currency }}

              <div class="popup" v-if="openMarker === markerIndex" @click.stop="openMarker = null">
                <div class="rating">
                  <span class="star" v-for="star in marker.stars" :key="star">
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7">
                      <path class="_fillpath" fill="#C79234"
                        d="M3.5 0l1.2 2.2 2.3.5-1.6 1.8.3 2.5-2.2-1.1L1.3 7l.3-2.5L0 2.7l2.3-.5L3.5 0"></path>
                    </svg>
                  </span>
                </div>
                <div>{{ marker.name }}</div>
              </div>
            </div>
          </yandex-map-marker>
        </template>
        <template #cluster="{ length, clusterer }">
          <div class="cluster">
            <span>{{ length }} от {{ handleCluster(clusterer) }}</span>
          </div>
        </template>
      </yandex-map-clusterer>
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
.cluster {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  white-space: nowrap;
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  // height: 22px;
  border: 1px solid #5c4343;
  background: #a08e8e;
  color: #fff;
  text-align: center;

  &>span {
    font-size: 0.6rem;
    font-weight: 600;
    color: rgb(240, 226, 226);
  }
}

.hotel {
  position: relative;
  background: white;
  border: 1px solid #fff;
  white-space: nowrap;
  text-align: left;
  color: #282828;
  font-size: 0.6rem;
  font-weight: 400;
  text-align: left;
  padding: 0.15rem;
  border: 1px solid #595959;
  border-radius: 3px;
  cursor: pointer;

  .rating {
    display: flex;

    .star {
      height: 10px;
      width: 10px;
    }
  }

  &:hover {
    background: #e3e3d3;
  }
}

.popup {
  position: absolute;
  top: calc(100% - 3px);
  border: 1px solid #ead0d0;
  border-radius: 3px;
  background: #eee;
  padding: 0.25rem;
  font-size: 0.75rem;
  color: brown;
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
  min-width: 200px;
}
</style>
