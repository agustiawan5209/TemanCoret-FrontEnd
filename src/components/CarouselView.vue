<template>
    <carousel :items-to-show="1" :autoplay="3000" :wrap-around="true">
      <slide v-for="slide in carouselIMG" :key="slide">
        <img :src="slide" />
      </slide>
  
    </carousel>
  </template>
  
  <script>
  // If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide} from 'vue3-carousel'
  
  export default {
    name: 'App',
    components: {
      Carousel,
      Slide,
    },
    data(){
      return{
      pathImg: '/img/',
      carouselIMG: [
        'img/design/bugis1.png',
        'img/design/mechapakarena blakng.png',
        'img/design/MK 8.png',
      ]

      }
    }
  }
  </script>
  