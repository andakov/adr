import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router'
import { i18n } from './i18n'
import './styles/main.css'
import { initTheme } from './theme'
import { initLocale } from './locale'
import { hideInitialSplash } from './utils/hideInitialSplash'
import { assetUrl } from './utils/assetUrl'

initTheme()
initLocale(i18n)

const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
if (favicon) favicon.href = assetUrl('/favicon.ico')

createApp(App).use(router).use(i18n).mount('#app')
void hideInitialSplash()
