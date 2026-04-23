<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '../i18n'
import { setLocale, type Locale } from '../locale'

const { locale, t } = useI18n({ useScope: 'global' })

const current = computed(() => locale.value as Locale)

const options = [
  { id: 'kk', label: 'KZ' },
  { id: 'en', label: 'EN' },
  { id: 'ru', label: 'RU' },
] as const

function pick(next: Locale) {
  setLocale(i18n, next)
}
</script>

<template>
  <div class="lang" :aria-label="t('common.language')">
    <button
      v-for="o in options"
      :key="o.id"
      type="button"
      class="seg"
      :class="{ active: current === o.id }"
      @click="pick(o.id)"
    >
      {{ o.label }}
    </button>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  border-radius: 999px;
  border: 1px solid var(--border);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.55);
}

html[data-theme='dark'] .lang {
  background: rgba(255, 255, 255, 0.06);
}

.seg {
  border: 0;
  background: transparent;
  color: var(--muted);
  padding: 9px 10px;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.04em;
  cursor: pointer;
}

.seg.active {
  color: var(--fg);
  background: rgba(99, 91, 255, 0.12);
}
</style>

