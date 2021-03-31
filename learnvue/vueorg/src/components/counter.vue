<template>
  <div id="couter" @click="counter++">
     {{counterRep}} Counter>:{{counter}}
  </div>
</template>

<script lang="ts">
import {computed, defineComponent,onMounted,ref,SetupContext,watch} from 'vue'
import useCounter from '../composables/counter'
export default defineComponent({
    name:'Counter',
    setup:(props:any,context:SetupContext)=>{
        console.log(props);
    console.log('attrs',context.attrs)
    console.log(context.slots)
    console.log(context.emit);
        const {counter,counterRep} = useCounter()
        return {counter,counterRep}
    }
})
</script>

<style>

</style>