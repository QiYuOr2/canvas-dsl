const { canvas, downloadImage, img, box, text, style, button } = require('../../utils/canvas-dsl/index');
// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    canvasId: 'canvasId',
    imageUrl: '',
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

    wx.showLoading({ title: '转为图片中' });
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: this.data.canvasId,
        success: (res) => {
          this.setData({ imageUrl: res.tempFilePath });
          wx.hideLoading();
        },
      });
    }, 1000);
  },
  onShareAppMessage() {
    return {
      imageUrl: this.data.imageUrl,
    };
  },
});
