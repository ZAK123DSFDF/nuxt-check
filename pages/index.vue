<script setup lang="ts">
// const { jokeCache, updateCache, resetCacheIfExpired } = useJokeCache()
const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms))

const { data, status, error, execute } = await useAsyncData(
  "randomJokes",
  async () => {
    return $fetch("/api/joke")
  },
  { immediate: false }
)

onBeforeMount(() => {
  execute()
})
// watch(data, (newData: any) => {
//   if (newData) {
//     updateCache(newData?.value, new Date().toISOString())
//   }
// })
</script>

<template>
  <div v-if="status === 'pending'">Loading...</div>
  <div v-else-if="status === 'error'">Error: {{ error?.message }}</div>
  <div v-else-if="data">
    <div>{{ data }}</div>
  </div>
  <div v-else>
    <div>Loading...</div>
  </div>

  <NuxtLink to="welcome">welcome</NuxtLink>
  <div>{{ data }}</div>
</template>
