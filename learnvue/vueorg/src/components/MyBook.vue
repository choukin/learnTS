<template>
  <div>{{readersNumber}} {{book.title}}</div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
export default defineComponent({
    name:'Book',
 setup:()=>{
     const readersnumber = ref(0)
     const book = reactive({title:'Vue 3 Guide'})
    return {
        readersnumber,
        book
    }
 }
})
</script>

<style>

</style>