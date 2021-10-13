import { ELEMENT_TYPE } from '../common/constant';
import { CanvasStyle, Context, ImageInfo } from '../types';
import { roundRect } from './components/box';
import { clipImage } from './components/img';
import { renderText } from './components/text';

/**
 * 绘制节点
 * @param ctx canvas context
 * @param element 元素样式
 * @param wrapper 容器样式
 */
export function draw(ctx: Context, element: CanvasStyle, wrapper?: CanvasStyle) {
  const wrapperX = wrapper?.x ?? 0;
  const wrapperY = wrapper?.y ?? 0;

  const wrapperW = wrapper?.width ?? 0;
  const wrapperH = wrapper?.height ?? 0;
  const wrapperR = wrapper?.radius ?? 0;

  if (element?.type === ELEMENT_TYPE.IMG) {
    if (!element.img?.path) {
      throw Error('请传入图片信息');
    }
  }

  element!.x = (element?.x ?? 0) + wrapperX;
  element!.y = (element?.y ?? 0) + wrapperY;

  const map = {
    [ELEMENT_TYPE.TEXT]: renderText({
      text: element?.text ?? '',
      fontSize: element?.fontSize as number,
      textAlign: element?.textAlign as 'center' | 'left' | 'right',
      textVerticalAlign: element?.textVerticalAlign,
      color: element?.color as string,
      x: element.x,
      y: element.y,
      w: (wrapperW || element?.width) ?? 0,
    }),
    [ELEMENT_TYPE.DIV]: roundRect({
      x: element.x,
      y: element.y,
      w: element?.width ?? 0,
      h: element?.height ?? 0,
      r: element?.radius ?? 0,
      color: element?.backgroudColor,
      border: element.borderColor,
    }),
    [ELEMENT_TYPE.IMG]: clipImage(element.img as ImageInfo, {
      x: element.x,
      y: element.y,
      w: wrapperW,
      h: wrapperH,
      r: wrapperR,
    }),
  };

  map[element?.type ?? 'noop'](ctx);

  // 子节点递归绘制
  element?.children?.forEach((item, i) => {
    if (item.type !== ELEMENT_TYPE.NOOP) {
      draw(ctx, element?.children?.[i], element);
    }
  });
}
