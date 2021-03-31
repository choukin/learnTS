<template>
  <div ref="root"> this is a root element</div>
</template>

<script lang="ts">
import {ref, watchEffect, defineComponent, watch} from 'vue' 
export default defineComponent({
    setup(){
        const root = ref(null)
        watchEffect(()=>{
            console.log('watchEffect',root.value);
        },{
            flush: 'post'
        })
        watch(root,()=>{
            console.log('watch',root.value);
            
        })
        

        return {root}
    }
})
</script>

<style>

</style>