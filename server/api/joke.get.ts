function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default defineEventHandler(async () => {
  // Introduce a delay of 3 seconds
  await delay(3000)

  // Fetch the joke from the API
  const response = await $fetch<{ value: string }>(
    "https://api.chucknorris.io/jokes/random"
  )

  return response.value + " (Date: " + new Date().toISOString() + ")"
})
