import {defineComponent,h} from 'vue'
export default  defineComponent({
    name:'anchoredHeading',
    props:{
        level:{
        type:Number,
        required: true
        }
    },
    render(){
        return h(
            'h'+ this.level,
            {},
            this.$slots
        )
    }
})