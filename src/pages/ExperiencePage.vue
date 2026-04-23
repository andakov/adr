<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { messages } from '../i18n/messages'

type ExperienceItem = {
  company: string
  period: string
  role: string
  bullets: readonly string[]
}

const { t, locale } = useI18n({ useScope: 'global' })
const m = computed(() => messages[locale.value as keyof typeof messages])
const items = computed(() => (m.value.experience.items ?? []) as ReadonlyArray<ExperienceItem>)
</script>

<template>
  <section class="grid">
    <aside class="glass sidebar">
      <p class="section-title">{{ t('experience.title') }}</p>
      <p class="lead" style="margin: 0">
        {{ items.length }} items
      </p>
    </aside>

    <div class="glass content">
      <h1 class="h1">{{ t('experience.title') }}</h1>
      <div style="height: 14px" />

      <article v-for="it in items" :key="it.company" class="job">
        <div class="job-head">
          <div>
            <div class="job-company">{{ it.company }}</div>
            <div class="job-meta">{{ it.role }} • {{ it.period }}</div>
          </div>
        </div>
        <ul class="list">
          <li v-for="b in it.bullets" :key="b">{{ b }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.job {
  padding: 14px 0;
  border-top: 1px solid var(--border);
}

.job:first-of-type {
  border-top: 0;
  padding-top: 0;
}

.job-company {
  font-weight: 900;
  letter-spacing: -0.01em;
}

.job-meta {
  color: var(--muted);
  margin-top: 4px;
  font-size: 13px;
}
</style>

