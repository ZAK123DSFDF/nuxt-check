<script setup lang="ts">
const { jokeCache, updateCache, resetCacheIfExpired } = useJokeCache()
const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms))

const { data, status, error, execute } = await useAsyncData(
  "randomJokes",
  async () => {
    resetCacheIfExpired()
    if (!jokeCache.value.data) {
      await delay(3000)
      return $fetch("https://api.chucknorris.io/jokes/random")
    } else {
      return jokeCache.value.data
    }
  },
  { immediate: false }
)

onBeforeMount(() => {
  resetCacheIfExpired()
  execute()
})
watch(data, (newData: any) => {
  if (newData) {
    updateCache(newData?.value, new Date().toISOString())
  }
})
</script>

<template>
  <div v-if="status === 'pending'">Loading...</div>
  <div v-else-if="status === 'error'">Error: {{ error?.message }}</div>
  <div v-else-if="data">
    <div>{{ jokeCache?.data }}</div>
  </div>
  <div v-else>
    <div>Loading...</div>
  </div>

  <NuxtLink to="welcome">welcome</NuxtLink>

  <div>{{ jokeCache?.data }}</div>
</template>
