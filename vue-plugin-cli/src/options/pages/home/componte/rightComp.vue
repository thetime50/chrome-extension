<template>
  <div class="component-right-comp">
    store.count:{{store.count}}
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
</script>

<style lang="scss" scoped>
.component-right-comp {
  //
}
</style>
