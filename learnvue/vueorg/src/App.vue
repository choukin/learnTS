<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <counter a="2"/>
  <MyBook/>
  <tem/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import counter from './components/counter.vue'
import MyBook from './components/MyBook2.vue'
import tem from './components/tem.vue'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    MyBook,
    counter,
    tem
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>