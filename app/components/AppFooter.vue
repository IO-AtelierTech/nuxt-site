<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-gray-200 bg-gray-50">
    <div class="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
      &copy; {{ year }} Nuxt Site. All rights reserved.
    </div>
  </footer>
</template>
