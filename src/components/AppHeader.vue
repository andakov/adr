<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ThemeToggle from './ThemeToggle.vue'
import LanguageSwitch from './LanguageSwitch.vue'

const route = useRoute()
const { t, locale } = useI18n({ useScope: 'global' })
const photoUrl = '/logo.png'

const nav = computed(() => {
  // touch locale so labels update when language changes
  locale.value
  return [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/experience', label: t('nav.experience') },
    { to: '/skills', label: t('nav.skills') },
    { to: '/contacts', label: t('nav.contacts') },
  ]
})

const photoOk = ref(true)
const isActive = (to: string) => route.path === to
</script>

<template>
  <header class="header">
    <div class="container header-inner glass">
      <nav class="nav" aria-label="Primary">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item.to) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="center">
        <div class="avatar" aria-label="Profile photo">
          <img
            v-if="photoOk"
            class="avatar-img"
            :src="photoUrl"
            alt="Profile"
            @error="photoOk = false"
          />
          <div v-else class="avatar-fallback">AD</div>
        </div>
      </div>

      <div class="controls">
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 16px 0 0;
}

.header-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 12px 14px;
  gap: 12px;
  overflow: visible;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  color: var(--muted);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-decoration: none;
}

.nav-link:hover {
  border-color: rgba(99, 91, 255, 0.25);
  text-decoration: none;
}

.nav-link.active {
  color: var(--fg);
  background: rgba(99, 91, 255, 0.10);
  border-color: rgba(99, 91, 255, 0.28);
}

.center {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.avatar {
  height: calc(100% + 20px);
  width: auto;
  aspect-ratio: 1 / 1;
  position: relative;
  border: 1px solid rgba(99, 91, 255, 0.35);
  background: rgba(255, 255, 255, 0.55);
  overflow: hidden;
  display: grid;
  place-items: center;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  pointer-events: auto;
  box-shadow:
    0 16px 34px rgba(2, 6, 23, 0.18),
    0 0 0 1px rgba(255, 255, 255, 0.55) inset;
}

.avatar::after {
  content: '';
  position: absolute;
  inset: 0;
  clip-path: inherit;
  border: 1px solid rgba(255, 255, 255, 0.55);
  opacity: 0.9;
  pointer-events: none;
}

html[data-theme='dark'] .avatar {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(139, 135, 255, 0.40);
  box-shadow:
    0 20px 46px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(99, 91, 255, 0.22) inset;
}

html[data-theme='dark'] .avatar::after {
  border-color: rgba(226, 232, 240, 0.22);
  opacity: 1;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.avatar-fallback {
  font-weight: 900;
  letter-spacing: 0.06em;
  font-size: 12px;
  color: var(--fg);
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

@media (max-width: 920px) {
  .header-inner {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "center controls"
      "nav nav";
  }

  .center {
    grid-area: center;
    justify-content: flex-start;
  }

  .controls {
    grid-area: controls;
  }

  .nav {
    grid-area: nav;
  }
}
</style>

