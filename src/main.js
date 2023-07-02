import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/style.css'
import './assets/app.css'
import './assets/animation.css'
import VueSweetalert2 from 'vue-sweetalert2';
import VueAnimateOnScroll from 'vue-animate-onscroll'
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    faHatWizard
} from '@fortawesome/free-solid-svg-icons'
library.add(faHatWizard)
import {
    fab
} from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import {
    far
} from '@fortawesome/free-regular-svg-icons';
import {
    fas
} from '@fortawesome/free-solid-svg-icons';
library.add(far);
library.add(fas);
import {
    dom
} from "@fortawesome/fontawesome-svg-core";
dom.watch();
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.directive('animate-onscroll',VueAnimateOnScroll)

app.use(router, FontAwesomeIcon, VueSweetalert2, VueAnimateOnScroll).component("font-awesome-icon", FontAwesomeIcon).mount('#app')