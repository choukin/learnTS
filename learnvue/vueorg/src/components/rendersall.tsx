import {defineComponent,h, VNode} from 'vue'

function getChildrenTextContent(children:any){
 return children.map((node:any)=>{
     return typeof node.children ==='string'?node.children:Array.isArray(node.children)?getChildrenTextContent(node.children):''
     }).join('')
}
export default  defineComponent({
    name:'anchoredHeading',
    props:{
        level:{
        type:Number,
        required: true
        }
    },
    render(){
        const {$slots}  = this
        console.log($slots);
        console.log($slots.default());
        
        // const headingId = 123//getChildrenTextContent($slots.default).toLowerCase().replace(/\W+/g,'-').replace(/(^-|-$)/g,'')
        const headingId = getChildrenTextContent($slots.default()).toLowerCase().replace(/\W+/g,'-').replace(/(^-|-$)/g,'')

        return h(
            'h'+ this.level,
            [
                h(
                    'a',
                    {
                        name:headingId,
                        href:'#'+headingId
                    },
                    $slots.default()
                )
            ],
           
        )
    }
})