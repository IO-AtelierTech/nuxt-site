<script setup lang="ts">
definePageMeta({
  title: 'About',
})

useHead({
  title: 'About',
})
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="mb-6 text-4xl font-bold">About</h1>

    <div class="prose prose-lg max-w-none">
      <p>This is a Nuxt site template designed for internal use on new projects.</p>

      <h2>Features</h2>
      <ul>
        <li><strong>Nuxt 4</strong> - Latest version with future compatibility mode</li>
        <li><strong>Tailwind CSS v4</strong> - Modern utility-first CSS framework</li>
        <li><strong>Drizzle ORM</strong> - Type-safe PostgreSQL database integration</li>
        <li><strong>Zod</strong> - Runtime validation for API and forms</li>
        <li><strong>ESLint</strong> - With auto-sort imports and unused detection</li>
        <li><strong>Prettier</strong> - Code formatting with Tailwind plugin</li>
        <li><strong>unplugin-fonts</strong> - Easy Google Fonts integration</li>
        <li><strong>GitHub Actions</strong> - CI/CD pipelines included</li>
      </ul>
    </div>

    <NuxtLink
      to="/"
      class="mt-8 inline-block text-emerald-600 hover:underline"
    >
      &larr; Back to Home
    </NuxtLink>
  </div>
</template>
