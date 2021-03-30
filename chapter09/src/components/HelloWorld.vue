<template>
  <div class="container">
    <img
      crossorigin="anonymous"
      id="img"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ucPLLnB4Pu1kMEs2uRZISegG5W7Icsb7tq27blyry0gnYhVOfg"
      alt="Dog"
      ref="dogId"
    />
    <div class="row">
      <div class="col">
        <b-list-group>
          <b-list-group-item
            v-for="tensor in tensors"
            v-bind:key="tensor.className"
          >
            {{ tensor.className }}-{{ tensor.probability }}
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ImageClassifier } from "../models/imageClassifier";
import { tensorInformation } from "../models/tensorInformation";
@Component
export default class HelloWorld extends Vue {
  private readonly classifier: ImageClassifier = new ImageClassifier();
  private tensors: tensorInformation[] | null = null;

  constructor() {
    super();
    this.classify();
  }
  public classify(): void {
    this.$nextTick().then(async () => {
      const dog = this.$refs["dogId"];
      if (dog && !this.tensors) {
        const image = dog as HTMLImageElement;
        /*eslint-disable-next-line*/
        debugger
        this.tensors = await this.classifier.Classify(image);
      }
    }).catch(e=>{
      console.error(e);
      
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
