<template>
  <button @click="modalOpen = true">
      打开全屏模态框
      </button>
      <teleport to="body">
    <div v-if="modalOpen" class="modal">
        <div>
            I'm a modal!
            <button @click="modalOpen = false">
                close
            </button>
        </div>
    </div>  
      </teleport>
</template>

<script lang="ts">
// teleport 
import {defineComponent} from 'vue'
export default defineComponent({
    name:'modalButton',
    data(){
        return {
            modalOpen:false
        }
    }
})
</script>

<style>
.modal{
    position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.modal div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 300px;
    height: 300px;
    padding: 5px;
}
</style>