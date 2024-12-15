<template>
  <div>
    <p>Some default component content shared across all pages</p>
  </div>
</template>
<script lang="ts" setup>
onBeforeMount(() => {
  console.log("This is the component - onBeforeMount")
})
</script>
