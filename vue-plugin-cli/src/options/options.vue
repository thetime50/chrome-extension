<template>
  <div class="main_app">
    <h1>Hello {{msg}}</h1>
    <div>this is entry test</div>
    <div>
      <input type="text" v-model="num" />
    </div>
    <div>
      str is: {{str}}
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name:"optionsView"
  }
</script>
<script setup >
import { ref, /* defineProps,defineEmits,defineExpose */ } from 'vue'

const msg = 'options'
const str = ref(0)

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
