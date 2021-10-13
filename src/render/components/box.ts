import { setFillStyle, setStrokeStyle } from '../../common/utils';
import { Context, RoundRectIncome } from '../../types';

/**
 * 圆角矩形
 */
export function roundRect(props: RoundRectIncome) {
  return (ctx: Context) => {
    let { x, y, r, w, h, color, border } = props;

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arc(x + r, y + r, r, 1.5 * Math.PI, 1 * Math.PI, true);
    ctx.lineTo(x, y + h - r);
    ctx.arc(x + r, y + h - r, r, 1 * Math.PI, 0.5 * Math.PI, true);
    ctx.lineTo(x + w - r, y + h);
    ctx.arc(x + w - r, y + h - r, r, 0.5 * Math.PI, 0 * Math.PI, true);
    ctx.lineTo(x + w, y + r);
    ctx.arc(x + w - r, y + r, r, 0 * Math.PI, 1.5 * Math.PI, true);
    ctx.closePath();

    if (color) {
      setFillStyle(ctx, color);
      ctx.fill();
    }

    if (border) {
      setStrokeStyle(ctx, border);
      ctx.stroke();
    }
  };
}
