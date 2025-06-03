<template>
  <div class="slider-wrapper">
    <swiper
      navigation
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      v-bind="swiperOptions"
    >
      <swiper-slide v-for="slide in data" :key="slide.name">
        <div class="swiper-item">
          <img loading="lazy" :alt="slide.name" :src="slide.image" />
        </div>
      </swiper-slide>
    </swiper>
    <div class="flex gap-2 mx-auto w-auto nav__container">
      <UButton
        icon="i-heroicons-chevron-left"
        variant="default"
        @click="slidePrev"
      />
      <UButton
        icon="i-heroicons-chevron-right"
        variant="default"
        @click="slideNext"
      />
    </div>
  </div>
</template>

<script setup>
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Navigation, Pagination, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const prev = shallowRef(null);
const next = shallowRef(null);

const swiperInstance = shallowRef(null);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  //   console.log("onSwiper", swiper);
};

const onSlideChange = (swiper) => {
  console.log("onSwiperSlideChange", swiper.activeIndex);
};

const slideNext = () => {
  if (!swiperInstance.value) return;
  swiperInstance.value.slideNext();
};

const slidePrev = () => {
  if (!swiperInstance.value) return;
  swiperInstance.value.slidePrev();
};

const swiperOptions = computed(() => {
  return {
    speed: 1200,
    spaceBetween: 200,
    slidesPerView: 1,
    watchSlidesProgress: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 1,
    },
    navigation: {
      nextEl: next.value,
      prevEl: prev.value,
    },
    modules: [Navigation, Grid],
    breakpoints: {
      0: {
        slidesPerGroup: 1,
        slidesPerView: 1,
        pagination: {
          type: "bullets",
          direction: "horizontal",
        },
      },
      768: {
        pagination: {
          type: "fraction",
          // renderFraction: getPaginationDOM,
        },
      },
    },
  };
});

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
});

// const generalSwiperOptions = computed(() => {
//     return { ...swiperOptions.value, ...props.customSwiperOptions }
// })

const data = [
  {
    image: "https://www.sodis.ru/imageservlet?id=513814879",
    name: "image_513814879",
  },
  {
    image: "https://www.sodis.ru/imageservlet?id=513814915",
    name: "image_513814915",
  },
  {
    image: "https://www.sodis.ru/imageservlet?id=513814918",
    name: "image_513814918",
  },
  {
    image: "https://www.sodis.ru/imageservlet?id=518116141",
    name: "image_518116141",
  },
];
</script>

<style lang="scss" scoped>
.slider-wrapper {
  width: 300px;
  @apply mx-auto;
  .swiper-item {
    img {
      width: 300px;
      height: 200px;
      object-fit: cover;
    }
  }
}
</style>
