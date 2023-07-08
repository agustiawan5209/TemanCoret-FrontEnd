import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AccountInfo from "../views/account/UserAccount.vue";
import DashboardAccountView from "../views/account/DashboardAccountView.vue";
import WishlistView from "../views/account/WishlistView.vue";
import OrderStory from "../views/account/OrderStoryView.vue";
// Auth Guard Vue Router
function GuardRouter(next) {
  var isAuthenticated = false;
  if (localStorage.getItem("loggedIn")) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    next();
  } else {
    next("login");
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
    component: () => import("../views/ShopView.vue"),
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
    component: () => import("../views/CartView.vue"),
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
router.beforeEach((to, from, next) => {
  document.title = "TemanCoret-" + to.meta.title || "TemanCoret";
  next();
});

export default router;
