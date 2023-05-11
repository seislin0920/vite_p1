import { GDialog } from 'gitart-vue-dialog'
import 'gitart-vue-dialog/dist/style.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.mount('#app')
// createApp(App).mount('#app')
app.use(pinia)
app.component('GDialog', GDialog)
