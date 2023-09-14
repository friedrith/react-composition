<script setup>
const props = defineProps({
  url: String,
})
</script>

<!-- default.vue -->
<template>
  <div class="grid grid-cols-2 w-full h-full">
    <div relative style="width: 100%; height: 100%">
      <iframe id="frame" class="w-full h-full" :src="props.url" />
    </div>
    <div class="slidev-layout">
      <slot />
    </div>
  </div>
</template>
