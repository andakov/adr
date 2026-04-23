export type Locale = 'kk' | 'en' | 'ru'

const STORAGE_KEY = 'adr.locale'

export function getInitialLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'kk' || saved === 'en' || saved === 'ru') return saved

  const nav = (navigator.language || '').toLowerCase()
  if (nav.startsWith('kk') || nav.startsWith('kz')) return 'kk'
  if (nav.startsWith('ru')) return 'ru'
  return 'en'
}

export function setLocale(i18n: any, locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale)
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
}

export function initLocale(i18n: any) {
  setLocale(i18n, getInitialLocale())
}

