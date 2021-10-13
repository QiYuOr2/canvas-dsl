import { Context, ImageInfo, RoundRectIncome } from '../../types';

/**
 * 剪裁图片
 */
export function clipImage(sourceImg: ImageInfo, props: RoundRectIncome) {
  return (ctx: Context) => {
    const img = { ...sourceImg };
    const { x, y, w, h } = props;
    ctx.save();

    ctx.clip();

    // 缩放，防止出现空白
    if (img.height < h) {
      const diff = h / img.height;
      img.height = diff * img.height;
      img.width = diff * img.width;
    }

    if (img.width < w) {
      const diff = w / img.width;
      img.height = diff * img.height;
      img.width = diff * img.width;
    }

    let widthRation = 1,
      heightRation = 1;
    if (img.width > w) {
      widthRation = w / img.width;
    }
    if (img.height > h) {
      heightRation = h / img.height;
    }

    if (heightRation > widthRation) {
      img.height = heightRation * img.height;
      img.width = heightRation * img.width;
    } else {
      img.height = widthRation * img.height;
      img.width = widthRation * img.width;
    }

    // 偏移，使图片移动到中心位置
    let offsetX = 0,
      offsetY = 0;
    if (img.width > w) {
      offsetX = -(img.width - w) / 2;
    }

    if (img.height > h) {
      offsetY = -(img.height - h) / 2;
    }

    ctx.drawImage(img.path, (x ?? 0) + offsetX, (y ?? 0) + offsetY, img.width, img.height);

    ctx.restore();
  };
}
