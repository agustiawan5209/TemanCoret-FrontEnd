// assets
import '../node_modules/nprogress/nprogress.css' 
import "./css/style.css";
import "./css/shape.css";
import "./css/animation.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab);
library.add(faHatWizard);
library.add(far);
library.add(fas);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app
  .use(router, FontAwesomeIcon, VueSweetalert2)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
