import { createI18n } from 'vue-i18n'
import { messages } from './messages'

export const i18n = createI18n({
  legacy: false,
  locale: 'kk',
  fallbackLocale: 'en',
  messages,
})

