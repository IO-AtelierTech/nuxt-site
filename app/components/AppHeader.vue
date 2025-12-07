<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <nav class="container mx-auto flex items-center justify-between px-4 py-4">
      <NuxtLink
        to="/"
        class="text-xl font-bold text-gray-900"
      >
        {{ config.public.appName }}
      </NuxtLink>

      <div class="flex items-center gap-6">
        <NuxtLink
          to="/"
          class="text-gray-600 hover:text-gray-900"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="text-gray-600 hover:text-gray-900"
        >
          About
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
