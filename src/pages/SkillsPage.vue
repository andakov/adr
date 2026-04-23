<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { messages } from '../i18n/messages'

const { t, locale } = useI18n({ useScope: 'global' })
const m = computed(() => messages[locale.value as keyof typeof messages])

const tech = computed(() => m.value.skills.tech)
const langs = computed(() => m.value.skills.langs)
</script>

<template>
  <section class="grid">
    <aside class="glass sidebar">
      <p class="section-title">{{ t('skills.langsTitle') }}</p>
      <ul class="list">
        <li v-for="l in langs" :key="l">{{ l }}</li>
      </ul>
    </aside>

    <div class="glass content">
      <h1 class="h1">{{ t('skills.title') }}</h1>
      <p class="lead">{{ t('skills.techTitle') }}</p>

      <div class="tags">
        <span v-for="s in tech" :key="s" class="tag">{{ s }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 14px;
}

.tag {
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.55);
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.02em;
}

html[data-theme='dark'] .tag {
  background: rgba(255, 255, 255, 0.06);
}
</style>

