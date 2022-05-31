<template>
  <div class="component-left-comp">
    <a-button type="primary" @click="increment">increment</a-button>
  </div>
</template>

<script setup>
/* message */
import { defineProps, defineEmits, useSlots, useAttrs } from "vue";
import { useStore } from '@/options/store/index.js'

const store = useStore()

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

const increment = store.increment

</script>

<style lang="scss" scoped>
.component-left-comp {
  //
}
</style>
