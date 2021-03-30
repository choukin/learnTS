import * as mobilenet from "@tensorflow-models/mobilenet";
import { MobileNet } from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { tensorInformation } from "@/models/tensorInformation";
// CNN 卷积神经网络 分类器 接受一个输入图像，处理该图像，然后添加到预定义的分类中
// CNN将图像分解为小部分，并比较这些部分，它会在这些小部分之间寻找匹配，然后确定匹配的数量，匹配数越大，对两幅图像相匹配的信心度就越高，
// MobileNet 是一种专用CNN,提供了多种功能，包括图像分类，
export class ImageClassifier {
  private model: MobileNet | null = null;
  constructor() {
    tf.ENV.set("WEBGL_PACK", false);
  }
  public async Classify(
    image:
      | tf.Tensor3D
      | ImageData
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
  ): Promise<tensorInformation[] | null> {
       
    if (!this.model) {
           /*eslint-disable-next-line*/
    debugger
      this.model = await mobilenet.load();
    }
    /*eslint-disable-next-line*/
    debugger
    if (this.model) {
    /*eslint-disable-next-line*/
    debugger
      // await this.model.classify(image,5);// 检索前5个结果
      const result = await this.model.classify(image);
      return {
        ...result,
      };
    }

    return null;
  }
}
