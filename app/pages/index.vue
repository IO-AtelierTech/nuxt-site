<script setup lang="ts">
definePageMeta({
  title: 'Home',
})

const { data: health } = await useFetch('/api/health')
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <section class="text-center">
      <h1 class="mb-4 text-5xl font-bold tracking-tight">
        Welcome to <span class="text-emerald-600">Nuxt Site</span>
      </h1>

      <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
        A production-ready template with Tailwind CSS v4, Drizzle ORM, Zod validation, ESLint with
        auto-sort and unused detection, and GitHub Actions.
      </p>

      <div class="flex justify-center gap-4">
        <NuxtLink
          to="/about"
          class="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          Learn More
        </NuxtLink>
        <a
          href="https://nuxt.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-50"
        >
          Documentation
        </a>
      </div>
    </section>

    <section class="mt-16 grid gap-8 md:grid-cols-3">
      <FeatureCard
        title="Tailwind CSS v4"
        description="Modern utility-first CSS with the latest Tailwind features and PostCSS integration."
        icon="palette"
      />
      <FeatureCard
        title="Drizzle ORM"
        description="Type-safe database queries with PostgreSQL and automatic migrations."
        icon="database"
      />
      <FeatureCard
        title="Zod Validation"
        description="Runtime type validation for API endpoints and form data."
        icon="shield"
      />
    </section>

    <section class="mt-16 rounded-lg bg-gray-50 p-6">
      <h2 class="mb-4 text-xl font-semibold">API Health Check</h2>
      <pre class="overflow-auto rounded bg-gray-900 p-4 text-sm text-gray-100">{{
        JSON.stringify(health, null, 2)
      }}</pre>
    </section>
  </div>
</template>
