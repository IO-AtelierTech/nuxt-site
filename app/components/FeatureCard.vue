<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: 'palette' | 'database' | 'shield'
}>()

const iconPaths = {
  palette:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  database:
    'M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c-1.29 1.03-3.67 2-8 2S5.29 10.03 4 9zm0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c-1.29 1.03-3.67 2-8 2s-6.71-.97-8-2z',
  shield:
    'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
}
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
    <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
      <svg
        class="h-6 w-6 text-emerald-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path :d="iconPaths[icon]" />
      </svg>
    </div>
    <h3 class="mb-2 text-lg font-semibold">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>
