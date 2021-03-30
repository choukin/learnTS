import { DrawPose } from "./drawPose";
import { Keypoint, PoseNet, Pose } from "@tensorflow-models/posenet";
import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";
/**
 * 姿势检测
 * 姿势估计 指的是 一种计算机视觉操作，它可以从图像或者视频中检测出人，当检测到人以后，模型能够大致判断出关键关节和身体部分的位置
 * PoseNet 能够检测到的关键点
 * 鼻子
 * 左眼
 * 右眼
 * 左右耳
 * 左右肩
 * 左右肘
 * 左右手腕
 * 左右臀
 * 左右膝
 * 左右脚踝
 */
export class PoseClassifier {
  private model: PoseNet | null = null;
  private drawPose: DrawPose | null = null;
  constructor() {
    // If running on Windows, there can be issues loading WebGL textures properly
    // Running the following command solves this.
    tf.ENV.set("WEBGL_PACK", false);
  }

  public async Pose(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement
  ): Promise<Keypoint[] | null> {
    if (!this.model) {
      this.model = await posenet.load();
      this.drawPose = new DrawPose(canvas);
    }

    if(this.model){
      // 获取图像的单个姿势
      const result: Pose = await this.model.estimateSinglePose(image);
      if (result) {
        // 获取pose 预测
        this.drawPose!.Draw(result.keypoints);
        return result.keypoints;
      }
    }
    return null;
  }
}
