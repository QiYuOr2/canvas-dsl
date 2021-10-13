/// <reference types="miniprogram-api-typings" />
import { CanvasStyle, Context, ImageInfo } from '../types';
export declare function init(type: string): CanvasStyle;
/**
 * 图片下载
 * @param src 图片链接
 */
export declare function downloadImage(src: string): Promise<ImageInfo>;
/**
 * 单位计算
 * @param raw 原始数据
 */
export declare function unit(raw: number): number;
/**
 * 设置字体大小
 * @param ctx canvas context
 * @param fontSize 字体大小
 */
export declare function setFontSize(ctx: Context, fontSize: number): void;
/**
 * 设置填充颜色
 * @param ctx canvas context
 * @param color 颜色
 */
export declare function setFillStyle(ctx: Context, color: string | WechatMiniprogram.CanvasGradient): void;
/**
 * 设置边框颜色
 * @param ctx canvas context
 * @param color 颜色
 */
export declare function setStrokeStyle(ctx: Context, color: string | WechatMiniprogram.CanvasGradient): void;
