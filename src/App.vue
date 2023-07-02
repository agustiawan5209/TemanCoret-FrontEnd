<template>
  <!-- header -->
  <header class="py-2 shadow-sm bg-secondary flex justify-center">
    <div class="container flex items-center justify-between">
      <router-link to="/">
        <img :src="'/../img/logofeed.png'" alt="Logo" class=" w-32 ">
      </router-link>

      <!-- Model Search -->
      <div class=" hidden md:flex max-w-xl">
        <search-modal  />

      </div>

      <div class="flex items-center space-x-4">

        <router-link :to="{ name: 'account.wishlist' }" v-if="config.wishlist"
          class="text-center text-gray-700 hover:text-primary transition relative">
          <div class="text-2xl">
            <i class="fa-regular fa-heart"></i>
          </div>
          <div class="text-xs leading-3">Wishlist</div>
          <div v-if="WishlistLenght > 0"
            class="absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {{ WishlistLenght }}
          </div>
        </router-link>
        <router-link :to="{ name: 'cart' }" v-if="config.cart"
          class="text-center text-gray-700 hover:text-primary transition relative">
          <div class="text-2xl">
            <i class="fa-solid fa-bag-shopping"></i>
          </div>
          <div class="text-xs leading-3">Cart</div>
          <div v-if="CartLength > 0"
            class="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {{ CartLength }}
          </div>

        </router-link>

        <router-link :to="{ name: 'account.info' }" v-if="config.user"
          class="text-center text-gray-700 hover:text-primary transition relative">
          <div class="text-2xl">
            <i class="fa-regular fa-user"></i>
          </div>
          <div class="text-xs leading-3" v-if="loggedIn">{{ User.name }}</div>
          <div class="text-xs leading-3" v-else>Account</div>
        </router-link>
      </div>
    </div>

  </header>
  <section class="flex md:hidden w-full">
    <search-modal  />
  </section>

  <!-- ./header -->

  <!-- navbar -->
  <nav class="bg-gray-800">
    <div class="container flex">
      <div class="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
        <span class="text-white">
          <i class="fa-solid fa-bars"></i>
        </span>
        <span class="capitalize ml-2 text-white hidden">All Categories</span>

        <!-- dropdown -->
        <div
          class="absolute w-80 left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible z-50">
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
            <img src="assets/images/icons/sofa.svg" alt="sofa" class="w-5 h-5 object-contain">
            <span class="ml-6 text-gray-600 text-sm">Sofa</span>
          </a>
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
            <img src="assets/images/icons/terrace.svg" alt="terrace" class="w-5 h-5 object-contain">
            <span class="ml-6 text-gray-600 text-sm">Terarce</span>
          </a>
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
            <img src="assets/images/icons/bed.svg" alt="bed" class="w-5 h-5 object-contain">
            <span class="ml-6 text-gray-600 text-sm">Bed</span>
          </a>
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
            <img src="assets/images/icons/office.svg" alt="office" class="w-5 h-5 object-contain">
            <span class="ml-6 text-gray-600 text-sm">office</span>
          </a>
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
            <img src="assets/images/icons/outdoor-cafe.svg" alt="outdoor" class="w-5 h-5 object-contain">
            <span class="ml-6 text-gray-600 text-sm">Outdoor</span>
          </a>
          <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
            <img src="assets/images/icons/bed-2.svg" alt="Mattress" class="w-5 h-5 object-contain">
            <span class="ml-6 text-gray-600 text-sm">Mattress</span>
          </a>
        </div>
      </div>

      <div class="flex items-center justify-between flex-grow md:pl-12 py-5">
        <div class="flex items-center space-x-6 capitalize">
          <router-link to="/"
            class="text-white text-sm md:text-base font-semibold hover:text-secondary transition">Home</router-link>
          <router-link :to="{ name: 'shop' }"
            class="text-white text-sm md:text-base font-semibold hover:text-secondary transition">Belanja</router-link>
          <router-link :to="{ name: 'about' }"
            class="text-white text-sm md:text-base font-semibold hover:text-secondary transition">Tentang
            Kami</router-link>
        </div>
        <router-link :to="{ name: 'login' }" v-if="!loggedIn && config.user"
          class="text-white text-sm md:text-base font-semibold hover:text-secondary transition">Login</router-link>
      </div>
    </div>
  </nav>
  <!-- ./navbar -->

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>



  <!-- footer -->
  <!-- copyright -->
  <footer class="bg-gray-800 py-4">
    <div class="container flex items-center justify-between">
      <p class="text-white">&copy; TemanCoret Studio - All Right Reserved</p>
      <div>
        <img :src="'/../img/logofeed.png'" alt="methods" class="h-10">
      </div>
    </div>
  </footer>
  <!-- ./copyright -->
  <!-- ./footer -->
</template>

<script>
import axios from 'axios';
import SearchModal from './components/SearchModal.vue';
export default {
  components: {
    SearchModal
  },
  data() {
    return {
      User: [],
      access_token: localStorage.getItem('token'),
      loggedIn: localStorage.getItem('loggedIn'),
      CartLength: null,
      WishlistLenght: null,
      config: {
        cart: true,
        wishlist: true,
        user: true,
      },
      modalSearch: false,
    }
  },

  beforeCreate() {
    axios.get('http://temancoret.admin.oraclesip.my.id/api/config/product',)
      .then(res => {
        const configApp = res.data.data
        for (let i = 0; i < configApp.length; i++) {
          const element = configApp[i];
          if (element.name === "Cart") {
            this.config.cart = element.value;
          }
          if (element.name === "Wishlist") {
            this.config.wishlist = element.value;
          }
          if (element.name === "User") {
            this.config.user = element.value;
          }
        }

      }).catch(error => {
        console.log(error)
      })
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      if (this.loggedIn) {
        axios.get('http://temancoret.admin.oraclesip.my.id/api/user', {
          headers: { Authorization: 'Bearer ' + this.access_token }
        })
          .then(res => {
            this.User = res.data
            this.CartLength = res.data.cart.length;
            this.WishlistLenght = res.data.wishlist.length;
          }).catch(error => {
            const resError = error.response;
            if (resError.status === 401 && resError.statusText === "Unauthorized") {
              localStorage.removeItem('token')
              localStorage.removeItem('token_type')
              localStorage.removeItem('loggedIn');

            }
          }

          )
      }
    },
    showModalSearch(){
      this.modalSearch = true;
      console.log(this.modalSearch)
    }

  }
}
</script>
