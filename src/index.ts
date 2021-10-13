import { CanvasStyle, ImageInfo, StyleWithoutType } from './types';
import { ELEMENT_TYPE } from './common/constant';
import { init, unit } from './common/utils';
import { draw } from './render';

let context: WechatMiniprogram.CanvasContext;

/**
 * 文本
 * @param text 内容
 * @param style 样式
 */
export function text(text: string, style?: StyleWithoutType): CanvasStyle {
  return {
    ...init(ELEMENT_TYPE.TEXT),
    ...style,
    text,
  };
}

/**
 * 样式辅助，会将canvas的单位计算为符合小程序rpx的单位
 * @param rawStyle 样式
 */
export function style(rawStyle: StyleWithoutType): StyleWithoutType {
  const formatStyle: Record<string, string | number | ImageInfo | StyleWithoutType[] | undefined> = {};

  for (const key in rawStyle) {
    if (typeof rawStyle[key as keyof StyleWithoutType] === 'number') {
      formatStyle[key] = unit(rawStyle[key as keyof StyleWithoutType] as number);
    } else {
      formatStyle[key] = rawStyle[key as keyof StyleWithoutType];
    }
  }
  return formatStyle;
}

/**
 * 图片
 * @param img 图片信息
 */
export function img(img: ImageInfo): CanvasStyle {
  return {
    ...init(ELEMENT_TYPE.DIV),
    type: ELEMENT_TYPE.IMG,
    img,
  };
}

/**
 * 基础盒子
 * @param childrenOrStyle 子元素或自身样式
 * @param style 自身样式
 */
export function box(childrenOrStyle?: Partial<CanvasStyle> | Partial<CanvasStyle>[], style?: StyleWithoutType): CanvasStyle {
  if (childrenOrStyle && !Array.isArray(childrenOrStyle)) {
    if (!childrenOrStyle.type) {
      // 无子元素的div
      return {
        ...init(ELEMENT_TYPE.DIV),
        ...childrenOrStyle,
      };
    } else {
      // 单个子元素的div
      return {
        ...init(ELEMENT_TYPE.DIV),
        ...style,
        children: [childrenOrStyle as CanvasStyle],
      };
    }
  } else {
    // 多个子元素的div
    return {
      ...init(ELEMENT_TYPE.DIV),
      ...style,
      children: childrenOrStyle as CanvasStyle[],
    };
  }
}

/**
 * 基础按钮绘制
 */
export function button(content: string, btnStyle?: StyleWithoutType) {
  const buttonStyle = {
    backgroudColor: btnStyle?.backgroudColor ?? '#D91B1B',
    x: btnStyle?.x,
    y: btnStyle?.y,
    width: btnStyle?.width ?? 210,
    height: btnStyle?.height ?? 36,
    borderColor: btnStyle?.borderColor,
    radius: btnStyle?.radius,
  };

  const fontSize = btnStyle?.fontSize ?? 28;
  const textStyle = {
    color: btnStyle?.color ?? '#fff',
    textAlign: btnStyle?.textAlign ?? 'center',
    fontSize,
    textVerticalAlign: 'center',
    x: buttonStyle.width / 2,
    y: buttonStyle.height / 2 - fontSize,
  } as StyleWithoutType;
  console.log('button.text.style', textStyle);

  return box(text(content, textStyle), buttonStyle);
}

/**
 * 创建画布
 * @param canvasId 画布ID
 * @param element 包含的元素
 */
export function canvas(canvasId: string, element?: CanvasStyle | CanvasStyle[]) {
  if (!context) {
    context = wx.createCanvasContext(canvasId);
  } else {
    context.clearRect(0, 0, 99999, 99999);
  }

  if (!Array.isArray(element) && element) {
    element = [element];
  }

  (element as CanvasStyle[] | undefined)?.forEach((el) => draw(context, el));

  context.scale(2, 2);

  context.draw();
}

export { downloadImage } from './common/utils';
