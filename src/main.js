import { GDialog } from 'gitart-vue-dialog'
import 'gitart-vue-dialog/dist/style.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app
    // createApp(App).mount('#app')
    .use(pinia)
    .component('GDialog', GDialog)
    .use(BootstrapVue3)
    .mount('#app')
