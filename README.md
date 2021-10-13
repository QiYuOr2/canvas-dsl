# MiniApp Canvas DSL

基于小程序 api 封装的 canvas dsl，可以让绘制 canvas 更简单

## 快速开始

该示例文件位于`example`目录中

### 原生小程序

```html
<!-- index.wxml -->
<view class="container">
  <canvas class="canvas" canvas-id="{{canvasId}}" />
  <button type="primary" bind:tap="draw">绘制</button>
</view>
```

```js
// index.js
const { canvas, downloadImage, img, box, text, style, button } = require('../../utils/canvas-dsl/index');

const app = getApp();

Page({
  data: {
    canvasId: 'canvasId',
  },
  async draw() {
    const src = 'https://si.geilicdn.com/img-44100000017bb8f51fdc0a21134b-unadjust_384_384.png';
    const src2 = 'https://si.geilicdn.com/img-2cf00000017aeb05e37d0a211500-unadjust_200_200.png';

    const imgInfo = await downloadImage(src);
    const img2Info = await downloadImage(src2);

    const thumb = () => {
      const textStyle = style({ color: '#fff', fontSize: 24 });
      const wrapperStyle = style({ width: 420, height: 210, x: 22, y: 10 });
      const innerImgStyle = style({ x: 10, y: 100 });

      return box(
        [
          img(imgInfo),
          text('测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下', textStyle),
          box(img(img2Info), innerImgStyle),
        ],
        wrapperStyle
      );
    };

    const buttonStyle = style({ width: 420, height: 80, x: 22, y: 230, fontSize: 28 });

    canvas(this.data.canvasId, [thumb(), button('进店逛逛', buttonStyle)]);
  },
});
```

### UniApp

```vue
<template>
  <view class="example">
    <canvas
      :canvas-id="canvasId"
      :style="{
        width: '500rpx',
        height: '400rpx',
        margin: '20rpx',
      }"
    />
    <button @click="draw" type="primary">绘制</button>
  </view>
</template>

<script>
import { canvas, box, text, img, button, downloadImage, style } from '../../common/canvas-dsl';

export default {
  data() {
    return {
      msg: '123',
      canvasId: 'canvasId',
    };
  },
  methods: {
    async draw() {
      const src = 'https://si.geilicdn.com/img-44100000017bb8f51fdc0a21134b-unadjust_384_384.png';
      const src2 = 'https://si.geilicdn.com/img-2cf00000017aeb05e37d0a211500-unadjust_200_200.png';

      const imgInfo = await downloadImage(src);
      const img2Info = await downloadImage(src2);

      const thumb = () => {
        const textStyle = style({ color: '#fff', fontSize: 24 });
        const wrapperStyle = style({ width: 420, height: 210, x: 22, y: 10 });
        const innerImgStyle = style({ x: 10, y: 100 });

        return box(
          [
            img(imgInfo),
            text('测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下', textStyle),
            box(img(img2Info), innerImgStyle),
          ],
          wrapperStyle
        );
      };

      canvas(this.canvasId, [thumb(), button('进店逛逛', style({ height: 80, x: 22, y: 230, fontSize: 28 }))]);
    },
  },
};
</script>

<style lang="less">
.example {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  canvas {
    border: 1px solid #cecece;
  }
}
</style>
```

## 文档

- `function canvas(canvasId: string, element?: CanvasStyle | CanvasStyle[]): void`
- `function style(rawStyle: StyleWithoutType): StyleWithoutType` 此函数会自动计算 width、x 等样式的单位以适配小程序的单位
- `function downloadImage(src: string): Promise<ImageInfo>` 下载图片到本地
- `function text(text: string, style?: StyleWithoutType): CanvasStyle` 文本，会根据 width 或是外层包裹的 box 的 width 自动换行
- `function img(img: ImageInfo): CanvasStyle` 图片，需要传入`{ path: string, width: number, height: number }`对象，可以使用`downloadImage`获取
- `function box(childrenOrStyle?: Partial<CanvasStyle> | Partial<CanvasStyle>[], style?: StyleWithoutType): CanvasStyle` 容器，类似 div 标签的作用
- `function button(content: string, btnStyle?: StyleWithoutType): CanvasStyle` 按钮，文本会自动水平垂直居中

## 开发

安装依赖后，运行`npm run dev`，编译完成后在小程序开发者工具中导入`example/`即可查看示例

### dev 模式示例引入方式

webpack 构建并监听文件变化 -> node 脚本监听 dist 目录文件变化 -> 文件改变则将 dist 目录下所有文件复制到`example/utils/canvas-dsl`下
