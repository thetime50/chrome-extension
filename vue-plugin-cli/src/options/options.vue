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
    <div class="">
      
      <a-radio-group v-model:value="currentTab">
        <template v-for="item in tabList" :key="item.name">
          <a-radio-button :value="item.name">{{item.label}}</a-radio-button>
        </template>
      </a-radio-group>
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
import { ref,computed, /* defineProps,defineEmits,defineExpose */ } from 'vue'
import { useRoute,useRouter } from 'vue-router'

const msg = 'options'
const str = ref(0)

const route = useRoute()
const router = useRouter()

const currentTab = computed({
  get:() => {
    return route.name
  },
  set:(val) => {
    console.log('val', val)
    router.push({name:val})
  }
})

const tabList=[
  {
    name:'home',
    label:'首页'
  },
  {
    name:'about',
    label:'关于'
  }
]

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
