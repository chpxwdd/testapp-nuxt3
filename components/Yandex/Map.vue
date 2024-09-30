<template>
  <div class="map-wrapper">

    <YandexMapCard v-if="openMarker" :hotel="hotels[openMarker]" />
    <yandex-map height="600px" width="100%" :settings="{
      location: {
        center: hotels[0].coordinates,
        zoom: 9,
        duration: 0,
      },
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
          }">
            <div class="hotel-marker">
              от {{ formatNumberWithSpaces(marker.priceFrom) }}
              {{ marker.currency }}
              <YandexMapPopup :marker="marker" :markerIndex="markerIndex" :openMarker="openMarker" />
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
  YandexMapClusterer,
  YandexMapMarker,
  YandexMapDefaultSchemeLayer,
} from "vue-yandex-maps";
import { formatNumberWithSpaces } from "~/helpers/utils";

const props = defineProps({
  hotels: {
    type: Array,
    default: () => [],
  },
});


const openMarker = shallowRef(null);


const handleCluster = (cl) => {
  return cl.features.reduce((min, { properties }) => {
    return properties.priceFrom < min
      ? `${formatNumberWithSpaces(properties.priceFrom)} ${properties.currency}`
      : min;
  }, Infinity);
};
</script>

<style scoped lang="scss">
.map-wrapper {
  position: relative;

}

.cluster {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  white-space: nowrap;
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
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

.hotel-marker {
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

  &:hover {
    background: #e3e3d3;
  }
}
</style>
