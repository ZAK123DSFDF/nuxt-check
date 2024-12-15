let jokeCache: { value: string; expiry: number } | null = null
interface response {
  value: string
}
export default defineEventHandler(async () => {
  const now = Date.now()
  if (jokeCache && jokeCache.expiry > now) {
    return jokeCache.value
  }
  const response: response = await $fetch(
    "https://api.chucknorris.io/jokes/random"
  )
  const joke = response.value
  jokeCache = {
    value: joke,
    expiry: now + 5 * 1000,
  }

  return joke
})
