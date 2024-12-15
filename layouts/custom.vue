<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <slot />
  </div>
</template>
<script lang="ts" setup>
onMounted(() => {
  console.log("This is the layout - onBeforeMount")
})
</script>
