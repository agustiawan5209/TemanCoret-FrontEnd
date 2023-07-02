<template>
  <div class="home">

    <div class="appheader relative top-0 flex w-full h-[400px] sm:h-[500px] md:h-[560px] bg-gradient-to-tr from-primary-black to-gray-800">
      <!-- <img :src="pathImg + 'banner.jpg'" alt="Banner TemanCoret" class="object-cover w-full h-full"> -->

      <div class="absolute top-32 md:left-20 max-w-xl md:max-w-md">
        <img :src="pathImg + 'logofeed.png'" alt="Banner TemanCoret" class="object-cover w-full h-full">
        <div class="container">
          <h1 class="text-2xl text-white text-center drop-shadow-sm font-medium mb-4 capitalize">
            Tempat Terbaik Untuk Design Pakaian
          </h1>
        </div>
      </div>
      <div class="absolute bg-white hidden lg:block w-20 right-64 h-full" ></div>
      <div class="absolute top-0 sm:top-0 md:top-0 lg:-top-10 right-6 sm:right-0  lg:right-20  max-w-sm sm:max-w-md mx-auto md:max-w-md bg-transparent px-5 py-5 h-full flex justify-center">
       <CarouselView class=" w-[80%] lg:w-full"/>
      </div>
      <div class="custom-shape-divider-bottom-1688083698 h-10 md:h-max rotate-180">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 0L0 0 598.97 114.72 1200 0z" class="shape-fill"></path>
        </svg>
      </div>
    </div>
    <!-- ./banner -->

    <!-- Katalog -->
    <KatalogView />
    <!-- ./Katalog -->
    <!-- categories -->
    <CategoriesView />
    <!-- ./categories -->

    <!-- new arrival -->
    <div class="container">
      <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
      <NewProductView />
    </div>
    <!-- ./new arrival -->

    <!-- ads -->
    <div class="container pb-16">
      <a href="#">
        <img :src="'/../assets/images/offer.jpg'" alt="ads" class="w-full">
      </a>
    </div>
    <!-- ./ads -->

    <!-- product -->
    <div class="container pb-16 w-full">
      <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">recomended for you</h2>
    
      <ProductView :product="product" :listOrBarItemShop="'BAR'" :grid="' grid-cols-2 sm:grid-cols-3 md:grid-cols-4'" />
    </div>
    <!-- ./product -->

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import CategoriesView from '../components/Categories.vue';
import ProductView from '../components/ProductView.vue';
import KatalogView from '@/components/KatalogView.vue';
import NewProductView from '../components/NewProductView.vue';
import CarouselView from '@/components/CarouselView.vue';
export default {
  name: 'HomeView',
  components: {
    CategoriesView,
    ProductView,
    NewProductView,
    KatalogView,
    CarouselView
  },
  data() {
    return {
      User: [],
      access_token: localStorage.getItem('token'),
      loggedIn: localStorage.getItem('loggedIn'),
      product: [],
      pathImg: '/img/'
    }
  },
  mounted() {
    if (this.loggedIn) {
      axios.get('http://temancoret.admin.oraclesip.my.id/api/user', {
        headers: { Authorization: 'Bearer ' + this.access_token }
      })
        .then(res => {
          this.User = res.data;
        }).catch(error => console.log(error))
    }
    axios.get('http://temancoret.admin.oraclesip.my.id/api/products')
        .then((res) => {
          this.product = res.data.data.data;
        }).catch(err=>console.log(err))
  }
}
</script>
