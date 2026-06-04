<script setup lang="ts">
import { computed } from 'vue'
import { parseExperienceBullet } from '../utils/parseExperienceBullet'

const props = defineProps<{ text: string }>()

const segments = computed(() => parseExperienceBullet(props.text))
</script>

<template>
  <span class="experience-bullet">
    <template v-for="(seg, i) in segments" :key="i">
      <a
        v-if="seg.type === 'link'"
        class="experience-bullet-link"
        :href="seg.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ seg.text }}
      </a>
      <template v-else>{{ seg.text }}</template>
    </template>
  </span>
</template>

<style scoped>
.experience-bullet-link {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 500;
}

.experience-bullet-link:hover {
  text-decoration-thickness: 2px;
}
</style>
