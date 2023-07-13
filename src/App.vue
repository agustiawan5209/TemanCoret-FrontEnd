<template>
  <!-- header -->
  <header class="py-2 shadow-sm bg-secondary flex justify-center">
    <div class="container flex items-center justify-between">
      <router-link to="/">
        <img :src="'/../img/logofeed.png'" alt="Logo" class=" w-32 ">
      </router-link>

      <!-- Model Search -->
      <div class=" hidden md:flex max-w-xl">
        <search-modal />

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
    <search-modal />
  </section>

  <!-- ./header -->

  <!-- navbar -->
  <nav class="bg-gray-800">
    <div class="container flex">
      <div class="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
        <span class="text-white">
          <i class="fa-solid fa-bars"></i>
        </span>

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

  <main>
    <ProgressBar :show="loadingPage" />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>



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
import ProgressBar from './components/ProgressBar.vue';
export default {
  components: {
    SearchModal,
    ProgressBar,
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
      loadingPage:false,
    }
  },

  beforeCreate() {
    axios.get('http://127.0.0.1:8000/api/config/product',)
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

      })
  },
  created() {
    axios.interceptors.request.use((config) => {
      // trigger 'loading=true' event here
      this.loadingPage = true;
      return config;
    }, (error) => {
      // trigger 'loading=false' event here
      this.loadingPage = true;

      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      // trigger 'loading=false' event here
      this.loadingPage = false;

      return response;
    }, (error) => {
      // trigger 'loading=false' event here
      this.loadingPage = false;

      return Promise.reject(error);
    });
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      if (this.loggedIn) {
        axios.get('http://127.0.0.1:8000/api/user', {
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
    showModalSearch() {
      this.modalSearch = true;
    }

  }
}
</script>
