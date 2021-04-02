<template>
  <div>{{readersNumber}} {{book.title}}</div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
export default defineComponent({
    name:'Book',
 setup:()=>{
     const readersNumber = ref(0)
     const book = reactive({title:'Vue 3 Guide'})
    return {
        readersNumber,
        book
    }
 }
})
</script>

<style>

</style>