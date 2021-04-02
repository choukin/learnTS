<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <counter a="2"/>
  <MyBook/>
  <tem/>
  <modalButton/>
  <anchoredHeading :level="1">H1 afdfasf</anchoredHeading>
  <anchoredHeading :level="2">H2 dfasf</anchoredHeading>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import counter from './components/counter.vue'
import MyBook from './components/MyBook2.vue'
import tem from './components/tem.vue'
import modalButton from './components/teleport.vue'
import anchoredHeading from './components/rendersall'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    MyBook,
    counter,
    modalButton,
    tem,
    anchoredHeading
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