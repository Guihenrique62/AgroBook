import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import VueTheMask from 'vue-the-mask'
import VueSweetalert2 from "vue-sweetalert2";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/dist/sweetalert2.min.css";

//configuração do Toast
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false
});

//salva a configuração global na palavra "Toast"
window.Toast = Toast;

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueTheMask)
  .use(VueSweetalert2)
  .mount('#app')
