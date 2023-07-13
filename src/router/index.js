import { createRouter, createWebHistory } from "vue-router";
import AccountInfo from "../views/account/UserAccount.vue";
import DashboardAccountView from "../views/account/DashboardAccountView.vue";
import WishlistView from "../views/account/WishlistView.vue";
import OrderStory from "../views/account/OrderStoryView.vue";
import NProgress from 'nprogress';
// import ProgressBar from '../components/ProgressBar.vue';

// Component
const CartPage = () =>
  import(/* webpackChunkName: "group-user" */ "../views/CartView.vue");

const ShopPage = () =>
  import(/* webpackChunkName: "group-user" */ "../views/ShopView.vue");

const HomeView = () =>
  import(/* webpackChunkName: "group-user" */ "../views/HomeView.vue");

// Auth Guard Vue Router
function GuardRouter() {
  var isAuthenticated = false;
  if (localStorage.getItem("loggedIn")) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    return true;
  } else {
    return {name : 'login'}
  }
}

const routes = [
  // Auth Router
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/LoginView.vue"),
    meta: {
      title: "Login"
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Auth/RegisterView.vue"),
    meta: {
      title: "Register"
    }
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Platform Inspirasi dan Informasi Kreatif"
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
    meta: {
      title: "About"
    }
  },
  {
    path: "/shop/:slug?",
    name: "shop",
    props: false,
    component: ShopPage,
    meta: {
      title: "SHOP"
    }
  },
  // Router For User Account
  {
    path: "/account",
    name: "account",
    beforeEnter: GuardRouter,
    component: DashboardAccountView,
    children: [
      {
        path: "",
        name: "account.info",
        component: AccountInfo
      },

      {
        path: "/wishlist",
        name: "account.wishlist",
        beforeEnter: GuardRouter,
        component: WishlistView,
        meta: {
          title: "Wishlist Product"
        }
      },
      // Order History Transaction
      {
        path: "/OrderStory",
        name: "account.order",
        beforeEnter: GuardRouter,
        component: OrderStory,
        meta: {
          title: "Order Story"
        }
      }
    ],
    meta: {
      title: "Account"
    }
  },

  // Route For Cart
  {
    path: "/cart",
    name: "cart",
    beforeEnter: GuardRouter,
    component: CartPage,
    meta: {
      title: "Cart Product",
      reload: true
    }
  },
  {
    path: "/checkout",
    name: "checkout",
    beforeEnter: GuardRouter,
    component: () => import("../views/CheckoutView.vue"),
    meta: {
      title: "CheckOut"
    }
  },

  {
    path: "/success",
    name: "success",
    beforeEnter: GuardRouter,
    component: () => import("../views/SuccessView.vue"),
    meta: {
      title: "Success",
      reload: true
    }
  },

  // Route Detail Product
  {
    path: "/View/:name/:id",
    name: "detailproduct",
    component: () => import("../views/DetailView.vue"),
    meta: {
      title: "Detail Product"
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return {
      top: 0
    };
  }
});
NProgress.configure({
  showSpinner:false
})
router.beforeEach((to, from, next) => {
  NProgress.start()

  document.title = "TemanCoret-" + to.meta.title || "TemanCoret";
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router;
