import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router'
import { i18n } from './i18n'
import './styles/main.css'
import { initTheme } from './theme'
import { initLocale } from './locale'

initTheme()
initLocale(i18n)

createApp(App).use(router).use(i18n).mount('#app')
