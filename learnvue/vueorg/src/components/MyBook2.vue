
<template>
  <div></div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref,h} from 'vue'
export default defineComponent({
    name:'Book',
 setup:()=>{
     const readersnumber = ref(0)
     const book = reactive({title:'Vue 3 Guide'})
    return ()=>h('div',[readersnumber.value,book.title])
 }
})
</script>

