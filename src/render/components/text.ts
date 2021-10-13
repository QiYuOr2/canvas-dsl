import { setFillStyle, setFontSize } from '../../common/utils';
import { Context, TextIncome } from '../../types';

/**
 * 渲染文本
 */
export function renderText(props: TextIncome) {
  return (ctx: Context) => {
    setFontSize(ctx, props.fontSize);

    // 小程序Bug https://www.cxyzjd.com/article/qq_33900610/104255164
    let fontWidth = ctx.measureText(props.text.slice(0, 1)).width;

    const allWidth = ctx.measureText(props.text).width;
    fontWidth < props.fontSize && (fontWidth = props.fontSize);

    if (props.w !== 0) {
      if (allWidth > props.w) {
        const sliceIndex = Math.floor(props.w / fontWidth);
        renderText({
          ...props,
          text: props.text.slice(sliceIndex),
          y: props.y + fontWidth,
        })(ctx);
        props.text = props.text.slice(0, sliceIndex);
      }
    }

    let x = props.x,
      y = props.y + fontWidth;

    setFillStyle(ctx, props.color);
    ctx.setTextAlign(props.textAlign);
    if (props.textVerticalAlign === 'center') {
      ctx.setTextBaseline('middle');
    }
    ctx.fillText(props.text, x, y);
  };
}
