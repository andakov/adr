<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { messages } from '../i18n/messages'

const { t, locale } = useI18n({ useScope: 'global' })
const m = computed(() => messages[locale.value as keyof typeof messages])

type Project = {
  title: string
  subtitle?: string
  tags?: readonly string[]
  href: string
  bg?: string
}

const heroImg = '/44.jpg'
const projects = computed(() => (m.value.home.projects?.items ?? []) as ReadonlyArray<Project>)
</script>

<template>
  <!-- Big hero section right after header -->
  <div class="hero-stage">
    <section class="hero glass">
      <div class="hero-bg" />
      <div class="hero-overlay" />
      <div class="hero-right" aria-hidden="true">
        <img class="hero-right-img" :src="heroImg" alt="" />
        <div class="hero-right-fade" />
      </div>
      <div class="hero-inner">
        <div class="pill">Portfolio • Vue 3 • Vite</div>
        <div style="height: 12px" />
        <h1 class="hero-title">{{ t('home.title') }}</h1>
        <p class="hero-lead">
          <strong>{{ t('home.role') }}</strong>
          <span> — {{ t('home.lead') }}</span>
        </p>

        <div class="cta">
          <a class="btn btn-primary" href="/resume.pdf" target="_blank" rel="noopener">
            {{ t('common.downloadPdf') }}
          </a>
          <RouterLink class="btn" to="/contacts">{{ t('nav.contacts') }}</RouterLink>
        </div>
      </div>
    </section>

    <div class="scroll-hint" aria-hidden="true">
      <svg class="scroll-hint-svg" viewBox="0 0 48 72" fill="none">
        <rect x="13" y="6" width="22" height="38" rx="11" stroke="currentColor" stroke-width="2" />
        <rect class="scroll-hint-wheel" x="23" y="16" width="2" height="10" rx="1" fill="currentColor" />
        <path
          class="scroll-hint-arrow"
          d="M24 54 L24 60 M18 58 L24 64 L30 58"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>

  <div style="height: 18px" />

  <section class="glass projects">
    <div class="projects-head">
      <div>
        <p class="section-title" style="margin: 0">{{ t('home.projects.title') }}</p>
        <p class="lead" style="margin: 6px 0 0">{{ t('home.projects.lead') }}</p>
      </div>
      <div class="projects-quick">
        <div class="kv" style="margin: 0">
          <div class="kv-key">{{ t('home.quick.locationLabel') }}</div>
          <div class="kv-val">{{ m.home.quick.location }}</div>
        </div>
        <div class="kv" style="margin: 0">
          <div class="kv-key">{{ t('home.quick.statusLabel') }}</div>
          <div class="kv-val">{{ m.home.quick.ready }}</div>
        </div>
      </div>
    </div>

    <div class="cards">
      <a
        v-for="p in projects"
        :key="p.href"
        class="card"
        :href="p.href"
        target="_blank"
        rel="noopener"
        :style="p.bg ? { '--bg': `url(${p.bg})` } : undefined"
      >
        <div class="card-bg" aria-hidden="true" />
        <div class="card-overlay" aria-hidden="true" />
        <div class="card-body">
          <div class="card-top">
            <div class="card-title">{{ p.title }}</div>
            <div v-if="p.subtitle" class="card-sub">{{ p.subtitle }}</div>
          </div>
          <div v-if="p.tags?.length" class="card-tags">
            <span v-for="tag in p.tags" :key="tag" class="chip">{{ tag }}</span>
          </div>
          <div class="card-cta">
            <span class="btn btn-primary btn-sm">{{ t('common.openSite') }}</span>
          </div>
        </div>
      </a>
    </div>

    <div class="more">
      <RouterLink class="btn" to="/about">{{ t('nav.about') }}</RouterLink>
      <RouterLink class="btn" to="/experience">{{ t('nav.experience') }}</RouterLink>
      <RouterLink class="btn" to="/skills">{{ t('nav.skills') }}</RouterLink>
      <RouterLink class="btn" to="/contacts">{{ t('nav.contacts') }}</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero-stage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  min-height: 520px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(5, 8, 22, 0.90) 0%,
    rgba(5, 8, 22, 0.55) 40%,
    rgba(5, 8, 22, 0.15) 70%,
    rgba(5, 8, 22, 0.00) 100%
  );
}

html[data-theme='light'] .hero-overlay {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.92) 0%,
    rgba(255, 255, 255, 0.55) 42%,
    rgba(255, 255, 255, 0.18) 70%,
    rgba(255, 255, 255, 0.00) 100%
  );
}

.hero-inner {
  position: relative;
  padding: 28px;
  max-width: 720px;
}

.scroll-hint {
  margin-top: 40px;
  padding: 14px 0 8px;
  display: flex;
  justify-content: center;
  color: rgba(255, 255, 255, 0.78);
  opacity: 0.9;
  pointer-events: none;
  filter: drop-shadow(0 10px 18px rgba(2, 6, 23, 0.35));
}

html[data-theme='light'] .scroll-hint {
  color: rgba(15, 23, 42, 0.55);
  filter: drop-shadow(0 10px 18px rgba(2, 6, 23, 0.18));
}

.scroll-hint-svg {
  width: 30px;
  height: 46px;
  display: block;
}

@keyframes scroll-wheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  60% {
    transform: translateY(8px);
    opacity: 0.35;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scroll-arrow {
  0% {
    transform: translateY(0);
    opacity: 0.8;
  }
  50% {
    transform: translateY(4px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0.8;
  }
}

.scroll-hint-wheel {
  transform-origin: center;
  animation: scroll-wheel 1400ms ease-in-out infinite;
}

.scroll-hint-arrow {
  transform-origin: center;
  animation: scroll-arrow 1200ms ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-hint-wheel,
  .scroll-hint-arrow {
    animation: none;
  }
}

.hero-right {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  width: min(560px, 44%);
  pointer-events: none;
}

.hero-right-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.95) contrast(1.05);
}

.hero-right-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--bg) 0%,
    rgba(5, 8, 22, 0.0) 45%,
    rgba(5, 8, 22, 0.0) 100%
  );
  opacity: 0.75;
}

html[data-theme='dark'] .hero-right-fade {
  background: linear-gradient(
    90deg,
    rgba(5, 8, 22, 1) 0%,
    rgba(5, 8, 22, 0.0) 45%,
    rgba(5, 8, 22, 0.0) 100%
  );
  opacity: 0.9;
}

.hero-title {
  margin: 0;
  font-size: 54px;
  line-height: 0.98;
  letter-spacing: -0.04em;
}

.hero-lead {
  margin: 12px 0 0;
  color: var(--muted);
  line-height: 1.6;
}

.cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.projects {
  padding: 18px;
  border-radius: var(--radius);
}

.projects-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.projects-quick {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 14px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 14px;
  margin-top: 14px;
}

.card {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--border);
  min-height: 220px;
  grid-column: span 6;
  text-decoration: none;
  color: inherit;
}

.card:hover {
  transform: translateY(-1px);
  border-color: rgba(99, 91, 255, 0.35);
}

.card-bg {
  position: absolute;
  inset: 0;
  background-image: var(--bg);
  background-size: cover;
  background-position: center;
  filter: saturate(0.95) contrast(1.05);
  transform: scale(1.02);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.0) 0%,
    rgba(0, 0, 0, 0.35) 42%,
    rgba(0, 0, 0, 0.72) 100%
  );
}

html[data-theme='light'] .card-overlay {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.0) 0%,
    rgba(255, 255, 255, 0.45) 45%,
    rgba(255, 255, 255, 0.92) 100%
  );
}

.card-body {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
}

.card-title {
  font-weight: 950;
  letter-spacing: -0.02em;
  font-size: 18px;
}

.card-sub {
  margin-top: 4px;
  color: var(--muted);
  font-weight: 700;
  font-size: 13px;
}

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.chip {
  padding: 6px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.25);
  font-weight: 900;
  font-size: 11px;
  letter-spacing: 0.02em;
}

html[data-theme='light'] .chip {
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.55);
}

.card-cta {
  display: flex;
  justify-content: flex-start;
  margin-top: 14px;
}

.btn-sm {
  padding: 8px 10px;
  font-size: 12px;
}

.more {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

@media (max-width: 920px) {
  .hero {
    min-height: 420px;
  }
  .hero-title {
    font-size: 40px;
  }
  .hero-right {
    width: 55%;
    opacity: 0.9;
  }
  .scroll-hint {
    padding: 10px 0 6px;
  }
  .projects-quick {
    grid-template-columns: 1fr;
  }
  .card {
    grid-column: span 12;
  }
}
</style>

