<script setup lang="ts">
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const { data, status, error, execute } = await useAsyncData(
  "randomJokes",
  async () => {
    return $fetch("/api/joke")
  },
  { lazy: true }
)
const revalidate = () => {
  execute()
}

definePageMeta({
  layout: "custom",
})
</script>

<template>
  <check />
  <div>
    <div v-if="status === 'pending'">Loading...</div>
    <div v-else-if="status === 'error'">Error: {{ error?.message }}</div>
    <div v-else-if="data">
      <div>{{ data }}</div>
    </div>
    <button @click="revalidate">Revalidate Joke</button>
    <NuxtLink to="welcome">Welcome</NuxtLink>
  </div>
</template>
