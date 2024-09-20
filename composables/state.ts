export const useCounter = () => {
  const counter = useState("counter", () => 0);
  const increment = () => {
    counter.value += 1;
  };
  const reset = () => {
    counter.value = 0;
  };
  return {
    counter,
    increment,
    reset,
  };
};
export const useJokeCache = () => {
  // Using reactive object inside useState
  const jokeCache = useState("jokeCache", () =>
    reactive({
      data: null,
      timeStamp: null,
    })
  );

  // Method to update cache
  const updateCache = (newData: any, newTimeStamp: any) => {
    if (!jokeCache.value.data && !jokeCache.value.timeStamp) {
      jokeCache.value.data = newData;
      jokeCache.value.timeStamp = newTimeStamp;
    }
  };
  const isCacheExpired = () => {
    if (!jokeCache.value.timeStamp) return true;
    const now = new Date().getTime();
    const cacheAge = now - new Date(jokeCache.value.timeStamp).getTime();
    return cacheAge > 10000;
  };
  const resetCacheIfExpired = () => {
    if (isCacheExpired()) {
      jokeCache.value.data = null;
      jokeCache.value.timeStamp = null;
    }
  };
  return { jokeCache, updateCache, resetCacheIfExpired };
};
