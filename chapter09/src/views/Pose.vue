<template>
  <div class="container">
    <div class="outsideWrapper">
      <div class="insideWrapper">
        <img
          crossorigin="anonymous"
          class="coveredImage"
          id="img"
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4204831122,3873589034&fm=26&gp=0.jpg"
          alt="Pose"
          ref="poseId"
        />
        <canvas
          ref="posecanvas"
          id="canvas"
          class="coveringCanvas"
          width="1200"
          height="675"
        ></canvas>
      </div>
      <div class="row">
        <div class="col">
          <b-table striped hover :items="keypoints"></b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PoseClassifier } from "../models/poseClassifier";
import { Keypoint } from "@tensorflow-models/posenet";

@Component
export default class Pose extends Vue {
  private readonly classifier: PoseClassifier = new PoseClassifier();
  private keypoints: Keypoint[] | null | undefined = null;

  private fields = {
    score: {
      label: "Confidence",
      sortable: true,
    },
    part: {
      label: "Part",
      sortable: true,
    },
    "position.x": { label: "X" },
    "position.y": { label: "Y" },
  };
  constructor() {
    super();
    this.keypoints = null;
    this.Classify();
  }

  public Classify(): void {
    this.$nextTick().then(async () => {
      const pose = this.$refs["poseId"];
      const poseCanvas = this.$refs["posecanvas"];
      if (pose !== null) {
        const image: HTMLImageElement = pose as HTMLImageElement;
        const canvas: HTMLCanvasElement = poseCanvas as HTMLCanvasElement;

        this.keypoints = await this.classifier.Pose(image, canvas);
      }
    });
  }
}
</script>

<style scoped>
.outsideWrapper {
  width: 1200px;
  height: 675px;
}
.insideWrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.coveredImage{
    /* width:100%; */
    /* height:100%; */
    position: absolute;
    top:0px;
    left:0px;
}

.coveringCanvas {
  /* width: 100%; */
  /* height: 100%; */
  position: absolute;
  top: 0;
  left: 0;
}
</style>
