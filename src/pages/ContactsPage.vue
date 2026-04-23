<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const contacts = {
  phone: '+7 (702) 711 9216',
  email: 'andakovdima@gmail.com',
  telegram: '@andakovd',
  location: 'Astana',
} as const
</script>

<template>
  <section class="grid">
    <aside class="glass sidebar">
      <p class="section-title">{{ t('contacts.title') }}</p>
      <p class="lead" style="margin: 0">
        {{ contacts.location }}
      </p>
    </aside>

    <div class="glass content">
      <h1 class="h1">{{ t('contacts.title') }}</h1>
      <div style="height: 12px" />

      <div class="kv">
        <div class="kv-key">{{ t('contacts.phone') }}</div>
        <div class="kv-val">
          <a :href="`tel:${contacts.phone.replace(/\\s|\\(|\\)|-/g, '')}`">{{ contacts.phone }}</a>
        </div>
      </div>
      <div class="kv">
        <div class="kv-key">{{ t('contacts.email') }}</div>
        <div class="kv-val">
          <a :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
        </div>
      </div>
      <div class="kv">
        <div class="kv-key">{{ t('contacts.telegram') }}</div>
        <div class="kv-val">
          <a href="https://t.me/andakovd" target="_blank" rel="noopener">{{ contacts.telegram }}</a>
        </div>
      </div>
      <div class="kv">
        <div class="kv-key">{{ t('contacts.location') }}</div>
        <div class="kv-val">{{ contacts.location }}</div>
      </div>
    </div>
  </section>
</template>

