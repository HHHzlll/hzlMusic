import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// src/main.ts
import 'virtual:svg-icons-register';

// src/main.ts
import { createPinia } from "pinia";
import router from "@/router";

// ElementPlus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// pinia 持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
.use(pinia)
.mount("#app");