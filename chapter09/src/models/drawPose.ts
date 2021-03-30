import { Keypoint } from "@tensorflow-models/posenet";
export class DrawPose {
  constructor(
    private canvas: HTMLCanvasElement,
    private context = canvas.getContext("2d")
  ) {
    // 清除画布
    this.context!.clearRect(
      0,
      0,
      this.canvas.offsetWidth,
      this.canvas.offsetHeight
    );
    // 填充颜色
    this.context!.fillStyle = "#ff0300";
  }

  /**
   * 绘制Keypoint 调用fillRect 来绘制点，矩形位置从 x y 坐标偏移2.5像素，所以绘制一个5像素的矩形，实际上是将绘制一个大致以该点为中心的矩形
   * @param keys
   */
  public Draw(keys: Keypoint[]): void {
    keys.forEach((kp: Keypoint) => {
      this.context!.fillRect(kp.position.x - 2.5, kp.position.y - 2.5, 5, 5);
    });
  }
}
