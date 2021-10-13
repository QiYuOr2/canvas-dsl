/// <reference types="miniprogram-api-typings" />
export declare type Context = WechatMiniprogram.CanvasContext;
/**
 * 样式
 */
export declare type CanvasStyle = {
    type: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    radius?: number;
    backgroudColor?: string;
    fontSize?: number;
    color?: string;
    text?: string;
    textAlign?: 'center' | 'left' | 'right';
    textVerticalAlign?: 'center';
    img?: ImageInfo;
    borderColor?: string;
    children?: CanvasStyle[];
};
/**
 * 渲染时创建方形的入参
 */
export declare type RoundRectIncome = {
    x: number;
    y: number;
    w: number;
    h: number;
    r: number;
    color?: string;
    border?: string;
};
/**
 * 渲染时创建文本的入参
 */
export declare type TextIncome = {
    text: string;
    color: string;
    fontSize: number;
    textAlign: 'center' | 'left' | 'right';
    textVerticalAlign?: 'center';
    x: number;
    y: number;
    w: number;
};
/**
 * 图片信息
 */
export declare type ImageInfo = {
    path: string;
    width: number;
    height: number;
};
export declare type StyleWithoutType = Omit<CanvasStyle, 'type'>;
