<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { messages } from '../i18n/messages'

const { t, locale } = useI18n({ useScope: 'global' })
const m = computed(() => messages[locale.value as keyof typeof messages])

type EducationItem = {
  degree: string
  place: string
  program: string
}

const educationItems = computed(
  () => (m.value.education.items ?? []) as ReadonlyArray<EducationItem>,
)
</script>

<template>
  <section class="grid">
    <aside class="glass sidebar">
      <p class="section-title">{{ t('about.factsTitle') }}</p>
      <ul class="list">
        <li>{{ m.about.facts.age }}</li>
        <li>{{ m.about.facts.citizenship }}</li>
        <li>{{ m.about.facts.format }}</li>
      </ul>
    </aside>

    <div class="glass content">
      <h1 class="h1">{{ t('about.title') }}</h1>
      <p class="lead">{{ t('about.lead') }}</p>

      <div style="height: 18px" />
      <h2 class="h2">{{ t('education.title') }}</h2>
      <div style="height: 10px" />

      <article v-for="it in educationItems" :key="it.degree" class="edu">
        <div class="edu-degree">{{ it.degree }}</div>
        <div class="edu-place">{{ it.place }}</div>
        <div class="edu-program">{{ it.program }}</div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.edu {
  padding: 14px 0;
  border-top: 1px solid var(--border);
}
.edu:first-of-type {
  border-top: 0;
  padding-top: 0;
}
.edu-degree {
  font-weight: 900;
}
.edu-place {
  margin-top: 4px;
  color: var(--muted);
}
.edu-program {
  margin-top: 4px;
  font-weight: 700;
}
</style>

