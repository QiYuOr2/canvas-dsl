import { CanvasStyle, Context, ImageInfo } from '../types';
import { ELEMENT_TYPE } from './constant';

const device = wx.getSystemInfoSync();
const dpr = 750 / device.windowWidth;

export function init(type: string) {
  const map: Record<string, CanvasStyle> = {
    [ELEMENT_TYPE.BUTTON]: {
      type: ELEMENT_TYPE.BUTTON,
      width: unit(200),
      height: unit(100),
      backgroudColor: '#D91B1B',
      x: 0,
      y: 0,
    },
    [ELEMENT_TYPE.CANVAS]: {
      type: ELEMENT_TYPE.CANVAS,
      width: unit(500),
      height: unit(400),
      x: 0,
      y: 0,
    },
    [ELEMENT_TYPE.TEXT]: {
      type: ELEMENT_TYPE.TEXT,
      fontSize: unit(24),
      textAlign: 'left',
      color: '#000',
      x: 0,
      y: 0,
    },
    [ELEMENT_TYPE.DIV]: {
      type: ELEMENT_TYPE.DIV,
      width: unit(100),
      height: unit(100),
      x: 0,
      y: 0,
    },
  };
  return map[type];
}

/**
 * 图片下载
 * @param src 图片链接
 */
export function downloadImage(src: string): Promise<ImageInfo> {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success: ({ width, height, path }) => resolve({ width, height, path }),
      fail: (error) => reject(error),
    });
  });
}

/**
 * 单位计算
 * @param raw 原始数据
 */
export function unit(raw: number) {
  return raw / dpr;
}

/**
 * 设置字体大小
 * @param ctx canvas context
 * @param fontSize 字体大小
 */
export function setFontSize(ctx: Context, fontSize: number) {
  fontSize = Math.round(fontSize);
  ctx.font = `${fontSize}px sans-serif`;
  ctx.setFontSize(fontSize);
}

/**
 * 设置填充颜色
 * @param ctx canvas context
 * @param color 颜色
 */
export function setFillStyle(ctx: Context, color: string | WechatMiniprogram.CanvasGradient) {
  ctx.fillStyle = color;
  ctx.setFillStyle(color);
}

/**
 * 设置边框颜色
 * @param ctx canvas context
 * @param color 颜色
 */
export function setStrokeStyle(ctx: Context, color: string | WechatMiniprogram.CanvasGradient) {
  ctx.strokeStyle = color;
  ctx.setStrokeStyle(color);
}
