import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
    faCheck,
    faTrash,
    faPen,
    faXmark,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheck, faTrash, faPen, faRotateLeft, faXmark);

createApp(App)
    .use(createPinia())
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
