import { CanvasStyle, ImageInfo, StyleWithoutType } from './types';
/**
 * 文本
 * @param text 内容
 * @param style 样式
 */
export declare function text(text: string, style?: StyleWithoutType): CanvasStyle;
/**
 * 样式辅助，会将canvas的单位计算为符合小程序rpx的单位
 * @param rawStyle 样式
 */
export declare function style(rawStyle: StyleWithoutType): StyleWithoutType;
/**
 * 图片
 * @param img 图片信息
 */
export declare function img(img: ImageInfo): CanvasStyle;
/**
 * 基础盒子
 * @param childrenOrStyle 子元素或自身样式
 * @param style 自身样式
 */
export declare function box(childrenOrStyle?: Partial<CanvasStyle> | Partial<CanvasStyle>[], style?: StyleWithoutType): CanvasStyle;
/**
 * 基础按钮绘制
 */
export declare function button(content: string, btnStyle?: StyleWithoutType): CanvasStyle;
/**
 * 创建画布
 * @param canvasId 画布ID
 * @param element 包含的元素
 */
export declare function canvas(canvasId: string, element?: CanvasStyle | CanvasStyle[]): void;
export { downloadImage } from './common/utils';
