<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getInitialTheme, setTheme, type Theme } from '../theme'

const theme = ref<Theme>('dark')
const animating = ref(false)

onMounted(() => {
  theme.value = getInitialTheme()
})

const label = computed(() => (theme.value === 'dark' ? 'Dark' : 'Light'))
const isDark = computed(() => theme.value === 'dark')

function toggle(e: MouseEvent) {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  setTheme(theme.value, { x: e.clientX, y: e.clientY })
  animating.value = true
  window.setTimeout(() => {
    animating.value = false
  }, 1600)
}
</script>

<template>
  <button
    class="toggle"
    type="button"
    @click="toggle"
    :class="{ dark: isDark, anim: animating }"
    :aria-label="`Theme: ${label}`"
  >
    <span class="track" aria-hidden="true">
      <span class="icon sun" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <span class="icon moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="thumb" aria-hidden="true">
        <span class="thumb-icon" :class="{ dark: isDark }" aria-hidden="true">
          <svg v-if="!isDark" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none">
            <path
              d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </span>
    </span>
  </button>
</template>

<style scoped>
.toggle {
  --h: 34px;
  --w: 74px;
  --pad: 4px;
  --thumb: calc(var(--h) - (var(--pad) * 2));
  --x: var(--pad);
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.toggle.dark {
  --x: calc(var(--w) - var(--pad) - var(--thumb));
}

.track {
  position: relative;
  display: grid;
  align-items: center;
  width: var(--w);
  height: var(--h);
  border-radius: 999px;
  background:
    radial-gradient(120% 140% at 20% 10%, rgba(255, 214, 102, 0.35), transparent 55%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.22));
  box-shadow:
    0 0 0 1px rgba(99, 91, 255, 0.10) inset,
    0 10px 22px rgba(2, 6, 23, 0.08);
  overflow: hidden;
}

html[data-theme='dark'] .track {
  background:
    radial-gradient(120% 140% at 80% 10%, rgba(99, 91, 255, 0.28), transparent 60%),
    linear-gradient(180deg, rgba(17, 24, 39, 0.72), rgba(17, 24, 39, 0.35));
  box-shadow:
    0 0 0 1px rgba(99, 91, 255, 0.18) inset,
    0 14px 26px rgba(2, 6, 23, 0.28);
}

.track::after {
  content: '';
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.55), transparent 50%);
  opacity: 0;
  transform: translateX(-20%);
  pointer-events: none;
}

.toggle.anim .track::after {
  animation: pop 1600ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes pop {
  0% {
    opacity: 0;
    transform: translateX(-26%) scale(0.95);
  }
  30% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    transform: translateX(28%) scale(1.05);
  }
}

.icon {
  position: absolute;
  top: 50%;
  width: 18px;
  height: 18px;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.62);
  transition: opacity 240ms ease, transform 240ms ease, color 240ms ease;
}

html[data-theme='dark'] .icon {
  color: rgba(226, 232, 240, 0.70);
}

.icon svg {
  width: 100%;
  height: 100%;
}

.sun {
  left: 9px;
  opacity: 1;
}

.moon {
  right: 9px;
  opacity: 0.75;
}

.toggle.dark .sun {
  opacity: 0.55;
  transform: translateY(-50%) scale(0.92);
}

.toggle.dark .moon {
  opacity: 1;
  transform: translateY(-50%) scale(1.03);
}

.thumb {
  position: absolute;
  top: var(--pad);
  left: var(--x);
  width: var(--thumb);
  height: var(--thumb);
  border-radius: 999px;
  background:
    radial-gradient(120% 120% at 30% 25%, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.28)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.18));
  box-shadow:
    0 8px 18px rgba(2, 6, 23, 0.18),
    0 0 0 1px rgba(15, 23, 42, 0.08) inset;
  display: grid;
  place-items: center;
  transition:
    left 1250ms cubic-bezier(0.2, 0.9, 0.2, 1),
    transform 1600ms cubic-bezier(0.2, 0.9, 0.2, 1),
    box-shadow 320ms ease;
  will-change: left, transform;
}

.toggle.dark .thumb {
  box-shadow:
    0 10px 22px rgba(2, 6, 23, 0.28),
    0 0 0 1px rgba(99, 91, 255, 0.20) inset;
}

.thumb-icon {
  width: 16px;
  height: 16px;
  color: rgba(15, 23, 42, 0.70);
}

html[data-theme='dark'] .thumb-icon {
  color: rgba(226, 232, 240, 0.82);
}

.thumb-icon svg {
  width: 100%;
  height: 100%;
}

.toggle.anim .thumb {
  transform: rotate(18deg) scale(1.02);
}

.toggle.dark.toggle.anim .thumb {
  transform: rotate(-18deg) scale(1.02);
}

.toggle:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(99, 91, 255, 0.22);
}

@media (prefers-reduced-motion: reduce) {
  .thumb,
  .icon,
  .track::after {
    transition: none !important;
    animation: none !important;
  }
}
</style>

