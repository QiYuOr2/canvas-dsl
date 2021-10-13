import { CanvasStyle } from '../types';

export const ELEMENT_TYPE = {
  NOOP: 'noop',
  CANVAS: 'canvas',
  BUTTON: 'button',
  ROUND_RECT: 'round',
  TEXT: 'text',
  STYLE: 'style',
  DIV: 'div',
  IMG: 'img',
  FLEX: 'flex',
};

export const noop: CanvasStyle = {
  type: ELEMENT_TYPE.NOOP,
};
