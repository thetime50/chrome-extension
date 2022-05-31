<template>
  <div class="component-about-page">
    this is about page
  </div>
</template>

<script >
export default{
    name:"about-page",
}
</script>
<script setup>
/* message */
import { defineProps, defineEmits, useSlots, useAttrs } from "vue";

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line
</script>

<style lang="scss" scoped>
.component-about-page {
  //
}
</style>