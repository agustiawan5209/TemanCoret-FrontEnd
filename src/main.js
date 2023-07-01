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
import AOS from 'aos';
import 'aos/dist/aos.css'


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
app.AOS = new AOS.init({
    disable: "phone",
    easing: 'ease-in',
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
});

app.use(router, FontAwesomeIcon, VueSweetalert2, AOS).component("font-awesome-icon", FontAwesomeIcon).mount('#app')