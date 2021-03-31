import {computed, defineComponent,onMounted,ref,watch} from 'vue'
export default function useCounter(){
    
    
    
    
    const counter = ref(0)
        watch(counter,console.log);
        onMounted(()=>{
            console.log(counter);
            
        })
        const counterRep = computed(()=>{
            return counter.value+1
        })
        return {counter,counterRep}
}