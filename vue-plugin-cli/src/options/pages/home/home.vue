<template>
  <div class="component-home">
    this is home
  </div>
  <div class="flex-layout frow align-center">
    <div class="flex-mean"><leftCopm /></div>
    <div class="flex-mean"><rightComp /></div>
  </div>
</template>

<script>
export default {
  name: 'home-page'
}
</script>
<script setup>
/* message */
import { defineProps, defineEmits, useSlots, useAttrs } from "vue";
import leftCopm from "./componte/leftCopm.vue"
import rightComp from "./componte/rightComp.vue"

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line
</script>

<style lang="scss" scoped>
.component-home {
  //
}
</style>