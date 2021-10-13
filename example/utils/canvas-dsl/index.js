(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/constant.ts":
/*!********************************!*\
  !*** ./src/common/constant.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.noop = exports.ELEMENT_TYPE = void 0;
exports.ELEMENT_TYPE = {
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
exports.noop = {
    type: exports.ELEMENT_TYPE.NOOP,
};


/***/ }),

/***/ "./src/common/utils.ts":
/*!*****************************!*\
  !*** ./src/common/utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setStrokeStyle = exports.setFillStyle = exports.setFontSize = exports.unit = exports.downloadImage = exports.init = void 0;
var constant_1 = __webpack_require__(/*! ./constant */ "./src/common/constant.ts");
var device = wx.getSystemInfoSync();
var dpr = 750 / device.windowWidth;
function init(type) {
    var _a;
    var map = (_a = {},
        _a[constant_1.ELEMENT_TYPE.BUTTON] = {
            type: constant_1.ELEMENT_TYPE.BUTTON,
            width: unit(200),
            height: unit(100),
            backgroudColor: '#D91B1B',
            x: 0,
            y: 0,
        },
        _a[constant_1.ELEMENT_TYPE.CANVAS] = {
            type: constant_1.ELEMENT_TYPE.CANVAS,
            width: unit(500),
            height: unit(400),
            x: 0,
            y: 0,
        },
        _a[constant_1.ELEMENT_TYPE.TEXT] = {
            type: constant_1.ELEMENT_TYPE.TEXT,
            fontSize: unit(24),
            textAlign: 'left',
            color: '#000',
            x: 0,
            y: 0,
        },
        _a[constant_1.ELEMENT_TYPE.DIV] = {
            type: constant_1.ELEMENT_TYPE.DIV,
            width: unit(100),
            height: unit(100),
            x: 0,
            y: 0,
        },
        _a);
    return map[type];
}
exports.init = init;
/**
 * 图片下载
 * @param src 图片链接
 */
function downloadImage(src) {
    return new Promise(function (resolve, reject) {
        wx.getImageInfo({
            src: src,
            success: function (_a) {
                var width = _a.width, height = _a.height, path = _a.path;
                return resolve({ width: width, height: height, path: path });
            },
            fail: function (error) { return reject(error); },
        });
    });
}
exports.downloadImage = downloadImage;
/**
 * 单位计算
 * @param raw 原始数据
 */
function unit(raw) {
    return raw / dpr;
}
exports.unit = unit;
/**
 * 设置字体大小
 * @param ctx canvas context
 * @param fontSize 字体大小
 */
function setFontSize(ctx, fontSize) {
    fontSize = Math.round(fontSize);
    ctx.font = fontSize + "px sans-serif";
    ctx.setFontSize(fontSize);
}
exports.setFontSize = setFontSize;
/**
 * 设置填充颜色
 * @param ctx canvas context
 * @param color 颜色
 */
function setFillStyle(ctx, color) {
    ctx.fillStyle = color;
    ctx.setFillStyle(color);
}
exports.setFillStyle = setFillStyle;
/**
 * 设置边框颜色
 * @param ctx canvas context
 * @param color 颜色
 */
function setStrokeStyle(ctx, color) {
    ctx.strokeStyle = color;
    ctx.setStrokeStyle(color);
}
exports.setStrokeStyle = setStrokeStyle;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.downloadImage = exports.canvas = exports.button = exports.box = exports.img = exports.style = exports.text = void 0;
var constant_1 = __webpack_require__(/*! ./common/constant */ "./src/common/constant.ts");
var utils_1 = __webpack_require__(/*! ./common/utils */ "./src/common/utils.ts");
var render_1 = __webpack_require__(/*! ./render */ "./src/render/index.ts");
var context;
/**
 * 文本
 * @param text 内容
 * @param style 样式
 */
function text(text, style) {
    return __assign(__assign(__assign({}, (0, utils_1.init)(constant_1.ELEMENT_TYPE.TEXT)), style), { text: text });
}
exports.text = text;
/**
 * 样式辅助，会将canvas的单位计算为符合小程序rpx的单位
 * @param rawStyle 样式
 */
function style(rawStyle) {
    var formatStyle = {};
    for (var key in rawStyle) {
        if (typeof rawStyle[key] === 'number') {
            formatStyle[key] = (0, utils_1.unit)(rawStyle[key]);
        }
        else {
            formatStyle[key] = rawStyle[key];
        }
    }
    return formatStyle;
}
exports.style = style;
/**
 * 图片
 * @param img 图片信息
 */
function img(img) {
    return __assign(__assign({}, (0, utils_1.init)(constant_1.ELEMENT_TYPE.DIV)), { type: constant_1.ELEMENT_TYPE.IMG, img: img });
}
exports.img = img;
/**
 * 基础盒子
 * @param childrenOrStyle 子元素或自身样式
 * @param style 自身样式
 */
function box(childrenOrStyle, style) {
    if (childrenOrStyle && !Array.isArray(childrenOrStyle)) {
        if (!childrenOrStyle.type) {
            // 无子元素的div
            return __assign(__assign({}, (0, utils_1.init)(constant_1.ELEMENT_TYPE.DIV)), childrenOrStyle);
        }
        else {
            // 单个子元素的div
            return __assign(__assign(__assign({}, (0, utils_1.init)(constant_1.ELEMENT_TYPE.DIV)), style), { children: [childrenOrStyle] });
        }
    }
    else {
        // 多个子元素的div
        return __assign(__assign(__assign({}, (0, utils_1.init)(constant_1.ELEMENT_TYPE.DIV)), style), { children: childrenOrStyle });
    }
}
exports.box = box;
/**
 * 基础按钮绘制
 */
function button(content, btnStyle) {
    var _a, _b, _c, _d, _e, _f;
    var buttonStyle = {
        backgroudColor: (_a = btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.backgroudColor) !== null && _a !== void 0 ? _a : '#D91B1B',
        x: btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.x,
        y: btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.y,
        width: (_b = btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.width) !== null && _b !== void 0 ? _b : 210,
        height: (_c = btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.height) !== null && _c !== void 0 ? _c : 36,
        borderColor: btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.borderColor,
        radius: btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.radius,
    };
    var fontSize = (_d = btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.fontSize) !== null && _d !== void 0 ? _d : 28;
    var textStyle = {
        color: (_e = btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.color) !== null && _e !== void 0 ? _e : '#fff',
        textAlign: (_f = btnStyle === null || btnStyle === void 0 ? void 0 : btnStyle.textAlign) !== null && _f !== void 0 ? _f : 'center',
        fontSize: fontSize,
        textVerticalAlign: 'center',
        x: buttonStyle.width / 2,
        y: buttonStyle.height / 2 - fontSize,
    };
    console.log('button.text.style', textStyle);
    return box(text(content, textStyle), buttonStyle);
}
exports.button = button;
/**
 * 创建画布
 * @param canvasId 画布ID
 * @param element 包含的元素
 */
function canvas(canvasId, element) {
    var _a;
    if (!context) {
        context = wx.createCanvasContext(canvasId);
    }
    else {
        context.clearRect(0, 0, 99999, 99999);
    }
    if (!Array.isArray(element) && element) {
        element = [element];
    }
    (_a = element) === null || _a === void 0 ? void 0 : _a.forEach(function (el) { return (0, render_1.draw)(context, el); });
    context.scale(2, 2);
    context.draw();
}
exports.canvas = canvas;
var utils_2 = __webpack_require__(/*! ./common/utils */ "./src/common/utils.ts");
Object.defineProperty(exports, "downloadImage", ({ enumerable: true, get: function () { return utils_2.downloadImage; } }));


/***/ }),

/***/ "./src/render/components/box.ts":
/*!**************************************!*\
  !*** ./src/render/components/box.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.roundRect = void 0;
var utils_1 = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.ts");
/**
 * 圆角矩形
 */
function roundRect(props) {
    return function (ctx) {
        var x = props.x, y = props.y, r = props.r, w = props.w, h = props.h, color = props.color, border = props.border;
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
            (0, utils_1.setFillStyle)(ctx, color);
            ctx.fill();
        }
        if (border) {
            (0, utils_1.setStrokeStyle)(ctx, border);
            ctx.stroke();
        }
    };
}
exports.roundRect = roundRect;


/***/ }),

/***/ "./src/render/components/img.ts":
/*!**************************************!*\
  !*** ./src/render/components/img.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clipImage = void 0;
/**
 * 剪裁图片
 */
function clipImage(sourceImg, props) {
    return function (ctx) {
        var img = __assign({}, sourceImg);
        var x = props.x, y = props.y, w = props.w, h = props.h;
        ctx.save();
        ctx.clip();
        // 缩放，防止出现空白
        if (img.height < h) {
            var diff = h / img.height;
            img.height = diff * img.height;
            img.width = diff * img.width;
        }
        if (img.width < w) {
            var diff = w / img.width;
            img.height = diff * img.height;
            img.width = diff * img.width;
        }
        var widthRation = 1, heightRation = 1;
        if (img.width > w) {
            widthRation = w / img.width;
        }
        if (img.height > h) {
            heightRation = h / img.height;
        }
        if (heightRation > widthRation) {
            img.height = heightRation * img.height;
            img.width = heightRation * img.width;
        }
        else {
            img.height = widthRation * img.height;
            img.width = widthRation * img.width;
        }
        // 偏移，使图片移动到中心位置
        var offsetX = 0, offsetY = 0;
        if (img.width > w) {
            offsetX = -(img.width - w) / 2;
        }
        if (img.height > h) {
            offsetY = -(img.height - h) / 2;
        }
        ctx.drawImage(img.path, (x !== null && x !== void 0 ? x : 0) + offsetX, (y !== null && y !== void 0 ? y : 0) + offsetY, img.width, img.height);
        ctx.restore();
    };
}
exports.clipImage = clipImage;


/***/ }),

/***/ "./src/render/components/text.ts":
/*!***************************************!*\
  !*** ./src/render/components/text.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderText = void 0;
var utils_1 = __webpack_require__(/*! ../../common/utils */ "./src/common/utils.ts");
/**
 * 渲染文本
 */
function renderText(props) {
    return function (ctx) {
        (0, utils_1.setFontSize)(ctx, props.fontSize);
        // 小程序Bug https://www.cxyzjd.com/article/qq_33900610/104255164
        var fontWidth = ctx.measureText(props.text.slice(0, 1)).width;
        var allWidth = ctx.measureText(props.text).width;
        fontWidth < props.fontSize && (fontWidth = props.fontSize);
        if (props.w !== 0) {
            if (allWidth > props.w) {
                var sliceIndex = Math.floor(props.w / fontWidth);
                renderText(__assign(__assign({}, props), { text: props.text.slice(sliceIndex), y: props.y + fontWidth }))(ctx);
                props.text = props.text.slice(0, sliceIndex);
            }
        }
        var x = props.x, y = props.y + fontWidth;
        (0, utils_1.setFillStyle)(ctx, props.color);
        ctx.setTextAlign(props.textAlign);
        if (props.textVerticalAlign === 'center') {
            ctx.setTextBaseline('middle');
        }
        ctx.fillText(props.text, x, y);
    };
}
exports.renderText = renderText;


/***/ }),

/***/ "./src/render/index.ts":
/*!*****************************!*\
  !*** ./src/render/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.draw = void 0;
var constant_1 = __webpack_require__(/*! ../common/constant */ "./src/common/constant.ts");
var box_1 = __webpack_require__(/*! ./components/box */ "./src/render/components/box.ts");
var img_1 = __webpack_require__(/*! ./components/img */ "./src/render/components/img.ts");
var text_1 = __webpack_require__(/*! ./components/text */ "./src/render/components/text.ts");
/**
 * 绘制节点
 * @param ctx canvas context
 * @param element 元素样式
 * @param wrapper 容器样式
 */
function draw(ctx, element, wrapper) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    var wrapperX = (_b = wrapper === null || wrapper === void 0 ? void 0 : wrapper.x) !== null && _b !== void 0 ? _b : 0;
    var wrapperY = (_c = wrapper === null || wrapper === void 0 ? void 0 : wrapper.y) !== null && _c !== void 0 ? _c : 0;
    var wrapperW = (_d = wrapper === null || wrapper === void 0 ? void 0 : wrapper.width) !== null && _d !== void 0 ? _d : 0;
    var wrapperH = (_e = wrapper === null || wrapper === void 0 ? void 0 : wrapper.height) !== null && _e !== void 0 ? _e : 0;
    var wrapperR = (_f = wrapper === null || wrapper === void 0 ? void 0 : wrapper.radius) !== null && _f !== void 0 ? _f : 0;
    if ((element === null || element === void 0 ? void 0 : element.type) === constant_1.ELEMENT_TYPE.IMG) {
        if (!((_g = element.img) === null || _g === void 0 ? void 0 : _g.path)) {
            throw Error('请传入图片信息');
        }
    }
    element.x = ((_h = element === null || element === void 0 ? void 0 : element.x) !== null && _h !== void 0 ? _h : 0) + wrapperX;
    element.y = ((_j = element === null || element === void 0 ? void 0 : element.y) !== null && _j !== void 0 ? _j : 0) + wrapperY;
    var map = (_a = {},
        _a[constant_1.ELEMENT_TYPE.TEXT] = (0, text_1.renderText)({
            text: (_k = element === null || element === void 0 ? void 0 : element.text) !== null && _k !== void 0 ? _k : '',
            fontSize: element === null || element === void 0 ? void 0 : element.fontSize,
            textAlign: element === null || element === void 0 ? void 0 : element.textAlign,
            textVerticalAlign: element === null || element === void 0 ? void 0 : element.textVerticalAlign,
            color: element === null || element === void 0 ? void 0 : element.color,
            x: element.x,
            y: element.y,
            w: (_l = (wrapperW || (element === null || element === void 0 ? void 0 : element.width))) !== null && _l !== void 0 ? _l : 0,
        }),
        _a[constant_1.ELEMENT_TYPE.DIV] = (0, box_1.roundRect)({
            x: element.x,
            y: element.y,
            w: (_m = element === null || element === void 0 ? void 0 : element.width) !== null && _m !== void 0 ? _m : 0,
            h: (_o = element === null || element === void 0 ? void 0 : element.height) !== null && _o !== void 0 ? _o : 0,
            r: (_p = element === null || element === void 0 ? void 0 : element.radius) !== null && _p !== void 0 ? _p : 0,
            color: element === null || element === void 0 ? void 0 : element.backgroudColor,
            border: element.borderColor,
        }),
        _a[constant_1.ELEMENT_TYPE.IMG] = (0, img_1.clipImage)(element.img, {
            x: element.x,
            y: element.y,
            w: wrapperW,
            h: wrapperH,
            r: wrapperR,
        }),
        _a);
    map[(_q = element === null || element === void 0 ? void 0 : element.type) !== null && _q !== void 0 ? _q : 'noop'](ctx);
    // 子节点递归绘制
    (_r = element === null || element === void 0 ? void 0 : element.children) === null || _r === void 0 ? void 0 : _r.forEach(function (item, i) {
        var _a;
        if (item.type !== constant_1.ELEMENT_TYPE.NOOP) {
            draw(ctx, (_a = element === null || element === void 0 ? void 0 : element.children) === null || _a === void 0 ? void 0 : _a[i], element);
        }
    });
}
exports.draw = draw;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0QsR0FB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QyxJQUFJLEtBQUssdUJBQVksQ0FBQyxJQUFJLEVBQUU7WUFDbkMsSUFBSSxDQUFDLEdBQUcsRUFBRSxhQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSwwQ0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXRERCxvQkFzREM7Ozs7Ozs7VUNsRUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NhbnZhcy1kc2wvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2NhbnZhcy1kc2wvLi9zcmMvY29tbW9uL2NvbnN0YW50LnRzIiwid2VicGFjazovL2NhbnZhcy1kc2wvLi9zcmMvY29tbW9uL3V0aWxzLnRzIiwid2VicGFjazovL2NhbnZhcy1kc2wvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLWRzbC8uL3NyYy9yZW5kZXIvY29tcG9uZW50cy9ib3gudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLWRzbC8uL3NyYy9yZW5kZXIvY29tcG9uZW50cy9pbWcudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLWRzbC8uL3NyYy9yZW5kZXIvY29tcG9uZW50cy90ZXh0LnRzIiwid2VicGFjazovL2NhbnZhcy1kc2wvLi9zcmMvcmVuZGVyL2luZGV4LnRzIiwid2VicGFjazovL2NhbnZhcy1kc2wvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FudmFzLWRzbC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NhbnZhcy1kc2wvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NhbnZhcy1kc2wvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJpbXBvcnQgeyBDYW52YXNTdHlsZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IEVMRU1FTlRfVFlQRSA9IHtcbiAgTk9PUDogJ25vb3AnLFxuICBDQU5WQVM6ICdjYW52YXMnLFxuICBCVVRUT046ICdidXR0b24nLFxuICBST1VORF9SRUNUOiAncm91bmQnLFxuICBURVhUOiAndGV4dCcsXG4gIFNUWUxFOiAnc3R5bGUnLFxuICBESVY6ICdkaXYnLFxuICBJTUc6ICdpbWcnLFxuICBGTEVYOiAnZmxleCcsXG59O1xuXG5leHBvcnQgY29uc3Qgbm9vcDogQ2FudmFzU3R5bGUgPSB7XG4gIHR5cGU6IEVMRU1FTlRfVFlQRS5OT09QLFxufTtcbiIsImltcG9ydCB7IENhbnZhc1N0eWxlLCBDb250ZXh0LCBJbWFnZUluZm8gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBFTEVNRU5UX1RZUEUgfSBmcm9tICcuL2NvbnN0YW50JztcblxuY29uc3QgZGV2aWNlID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbmNvbnN0IGRwciA9IDc1MCAvIGRldmljZS53aW5kb3dXaWR0aDtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQodHlwZTogc3RyaW5nKSB7XG4gIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgQ2FudmFzU3R5bGU+ID0ge1xuICAgIFtFTEVNRU5UX1RZUEUuQlVUVE9OXToge1xuICAgICAgdHlwZTogRUxFTUVOVF9UWVBFLkJVVFRPTixcbiAgICAgIHdpZHRoOiB1bml0KDIwMCksXG4gICAgICBoZWlnaHQ6IHVuaXQoMTAwKSxcbiAgICAgIGJhY2tncm91ZENvbG9yOiAnI0Q5MUIxQicsXG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9LFxuICAgIFtFTEVNRU5UX1RZUEUuQ0FOVkFTXToge1xuICAgICAgdHlwZTogRUxFTUVOVF9UWVBFLkNBTlZBUyxcbiAgICAgIHdpZHRoOiB1bml0KDUwMCksXG4gICAgICBoZWlnaHQ6IHVuaXQoNDAwKSxcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgIH0sXG4gICAgW0VMRU1FTlRfVFlQRS5URVhUXToge1xuICAgICAgdHlwZTogRUxFTUVOVF9UWVBFLlRFWFQsXG4gICAgICBmb250U2l6ZTogdW5pdCgyNCksXG4gICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9LFxuICAgIFtFTEVNRU5UX1RZUEUuRElWXToge1xuICAgICAgdHlwZTogRUxFTUVOVF9UWVBFLkRJVixcbiAgICAgIHdpZHRoOiB1bml0KDEwMCksXG4gICAgICBoZWlnaHQ6IHVuaXQoMTAwKSxcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBtYXBbdHlwZV07XG59XG5cbi8qKlxuICog5Zu+54mH5LiL6L29XG4gKiBAcGFyYW0gc3JjIOWbvueJh+mTvuaOpVxuICovXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRJbWFnZShzcmM6IHN0cmluZyk6IFByb21pc2U8SW1hZ2VJbmZvPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd3guZ2V0SW1hZ2VJbmZvKHtcbiAgICAgIHNyYyxcbiAgICAgIHN1Y2Nlc3M6ICh7IHdpZHRoLCBoZWlnaHQsIHBhdGggfSkgPT4gcmVzb2x2ZSh7IHdpZHRoLCBoZWlnaHQsIHBhdGggfSksXG4gICAgICBmYWlsOiAoZXJyb3IpID0+IHJlamVjdChlcnJvciksXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIOWNleS9jeiuoeeul1xuICogQHBhcmFtIHJhdyDljp/lp4vmlbDmja5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuaXQocmF3OiBudW1iZXIpIHtcbiAgcmV0dXJuIHJhdyAvIGRwcjtcbn1cblxuLyoqXG4gKiDorr7nva7lrZfkvZPlpKflsI9cbiAqIEBwYXJhbSBjdHggY2FudmFzIGNvbnRleHRcbiAqIEBwYXJhbSBmb250U2l6ZSDlrZfkvZPlpKflsI9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZvbnRTaXplKGN0eDogQ29udGV4dCwgZm9udFNpemU6IG51bWJlcikge1xuICBmb250U2l6ZSA9IE1hdGgucm91bmQoZm9udFNpemUpO1xuICBjdHguZm9udCA9IGAke2ZvbnRTaXplfXB4IHNhbnMtc2VyaWZgO1xuICBjdHguc2V0Rm9udFNpemUoZm9udFNpemUpO1xufVxuXG4vKipcbiAqIOiuvue9ruWhq+WFheminOiJslxuICogQHBhcmFtIGN0eCBjYW52YXMgY29udGV4dFxuICogQHBhcmFtIGNvbG9yIOminOiJslxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmlsbFN0eWxlKGN0eDogQ29udGV4dCwgY29sb3I6IHN0cmluZyB8IFdlY2hhdE1pbmlwcm9ncmFtLkNhbnZhc0dyYWRpZW50KSB7XG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgY3R4LnNldEZpbGxTdHlsZShjb2xvcik7XG59XG5cbi8qKlxuICog6K6+572u6L655qGG6aKc6ImyXG4gKiBAcGFyYW0gY3R4IGNhbnZhcyBjb250ZXh0XG4gKiBAcGFyYW0gY29sb3Ig6aKc6ImyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdHJva2VTdHlsZShjdHg6IENvbnRleHQsIGNvbG9yOiBzdHJpbmcgfCBXZWNoYXRNaW5pcHJvZ3JhbS5DYW52YXNHcmFkaWVudCkge1xuICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgY3R4LnNldFN0cm9rZVN0eWxlKGNvbG9yKTtcbn1cbiIsImltcG9ydCB7IENhbnZhc1N0eWxlLCBJbWFnZUluZm8sIFN0eWxlV2l0aG91dFR5cGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEVMRU1FTlRfVFlQRSB9IGZyb20gJy4vY29tbW9uL2NvbnN0YW50JztcbmltcG9ydCB7IGluaXQsIHVuaXQgfSBmcm9tICcuL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBkcmF3IH0gZnJvbSAnLi9yZW5kZXInO1xuXG5sZXQgY29udGV4dDogV2VjaGF0TWluaXByb2dyYW0uQ2FudmFzQ29udGV4dDtcblxuLyoqXG4gKiDmlofmnKxcbiAqIEBwYXJhbSB0ZXh0IOWGheWuuVxuICogQHBhcmFtIHN0eWxlIOagt+W8j1xuICovXG5leHBvcnQgZnVuY3Rpb24gdGV4dCh0ZXh0OiBzdHJpbmcsIHN0eWxlPzogU3R5bGVXaXRob3V0VHlwZSk6IENhbnZhc1N0eWxlIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5pbml0KEVMRU1FTlRfVFlQRS5URVhUKSxcbiAgICAuLi5zdHlsZSxcbiAgICB0ZXh0LFxuICB9O1xufVxuXG4vKipcbiAqIOagt+W8j+i+heWKqe+8jOS8muWwhmNhbnZhc+eahOWNleS9jeiuoeeul+S4uuespuWQiOWwj+eoi+W6j3JweOeahOWNleS9jVxuICogQHBhcmFtIHJhd1N0eWxlIOagt+W8j1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3R5bGUocmF3U3R5bGU6IFN0eWxlV2l0aG91dFR5cGUpOiBTdHlsZVdpdGhvdXRUeXBlIHtcbiAgY29uc3QgZm9ybWF0U3R5bGU6IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IG51bWJlciB8IEltYWdlSW5mbyB8IFN0eWxlV2l0aG91dFR5cGVbXSB8IHVuZGVmaW5lZD4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGtleSBpbiByYXdTdHlsZSkge1xuICAgIGlmICh0eXBlb2YgcmF3U3R5bGVba2V5IGFzIGtleW9mIFN0eWxlV2l0aG91dFR5cGVdID09PSAnbnVtYmVyJykge1xuICAgICAgZm9ybWF0U3R5bGVba2V5XSA9IHVuaXQocmF3U3R5bGVba2V5IGFzIGtleW9mIFN0eWxlV2l0aG91dFR5cGVdIGFzIG51bWJlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1hdFN0eWxlW2tleV0gPSByYXdTdHlsZVtrZXkgYXMga2V5b2YgU3R5bGVXaXRob3V0VHlwZV07XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3JtYXRTdHlsZTtcbn1cblxuLyoqXG4gKiDlm77niYdcbiAqIEBwYXJhbSBpbWcg5Zu+54mH5L+h5oGvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbWcoaW1nOiBJbWFnZUluZm8pOiBDYW52YXNTdHlsZSB7XG4gIHJldHVybiB7XG4gICAgLi4uaW5pdChFTEVNRU5UX1RZUEUuRElWKSxcbiAgICB0eXBlOiBFTEVNRU5UX1RZUEUuSU1HLFxuICAgIGltZyxcbiAgfTtcbn1cblxuLyoqXG4gKiDln7rnoYDnm5LlrZBcbiAqIEBwYXJhbSBjaGlsZHJlbk9yU3R5bGUg5a2Q5YWD57Sg5oiW6Ieq6Lqr5qC35byPXG4gKiBAcGFyYW0gc3R5bGUg6Ieq6Lqr5qC35byPXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBib3goY2hpbGRyZW5PclN0eWxlPzogUGFydGlhbDxDYW52YXNTdHlsZT4gfCBQYXJ0aWFsPENhbnZhc1N0eWxlPltdLCBzdHlsZT86IFN0eWxlV2l0aG91dFR5cGUpOiBDYW52YXNTdHlsZSB7XG4gIGlmIChjaGlsZHJlbk9yU3R5bGUgJiYgIUFycmF5LmlzQXJyYXkoY2hpbGRyZW5PclN0eWxlKSkge1xuICAgIGlmICghY2hpbGRyZW5PclN0eWxlLnR5cGUpIHtcbiAgICAgIC8vIOaXoOWtkOWFg+e0oOeahGRpdlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uaW5pdChFTEVNRU5UX1RZUEUuRElWKSxcbiAgICAgICAgLi4uY2hpbGRyZW5PclN0eWxlLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5Y2V5Liq5a2Q5YWD57Sg55qEZGl2XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5pbml0KEVMRU1FTlRfVFlQRS5ESVYpLFxuICAgICAgICAuLi5zdHlsZSxcbiAgICAgICAgY2hpbGRyZW46IFtjaGlsZHJlbk9yU3R5bGUgYXMgQ2FudmFzU3R5bGVdLFxuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8g5aSa5Liq5a2Q5YWD57Sg55qEZGl2XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmluaXQoRUxFTUVOVF9UWVBFLkRJViksXG4gICAgICAuLi5zdHlsZSxcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbk9yU3R5bGUgYXMgQ2FudmFzU3R5bGVbXSxcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICog5Z+656GA5oyJ6ZKu57uY5Yi2XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidXR0b24oY29udGVudDogc3RyaW5nLCBidG5TdHlsZT86IFN0eWxlV2l0aG91dFR5cGUpIHtcbiAgY29uc3QgYnV0dG9uU3R5bGUgPSB7XG4gICAgYmFja2dyb3VkQ29sb3I6IGJ0blN0eWxlPy5iYWNrZ3JvdWRDb2xvciA/PyAnI0Q5MUIxQicsXG4gICAgeDogYnRuU3R5bGU/LngsXG4gICAgeTogYnRuU3R5bGU/LnksXG4gICAgd2lkdGg6IGJ0blN0eWxlPy53aWR0aCA/PyAyMTAsXG4gICAgaGVpZ2h0OiBidG5TdHlsZT8uaGVpZ2h0ID8/IDM2LFxuICAgIGJvcmRlckNvbG9yOiBidG5TdHlsZT8uYm9yZGVyQ29sb3IsXG4gICAgcmFkaXVzOiBidG5TdHlsZT8ucmFkaXVzLFxuICB9O1xuXG4gIGNvbnN0IGZvbnRTaXplID0gYnRuU3R5bGU/LmZvbnRTaXplID8/IDI4O1xuICBjb25zdCB0ZXh0U3R5bGUgPSB7XG4gICAgY29sb3I6IGJ0blN0eWxlPy5jb2xvciA/PyAnI2ZmZicsXG4gICAgdGV4dEFsaWduOiBidG5TdHlsZT8udGV4dEFsaWduID8/ICdjZW50ZXInLFxuICAgIGZvbnRTaXplLFxuICAgIHRleHRWZXJ0aWNhbEFsaWduOiAnY2VudGVyJyxcbiAgICB4OiBidXR0b25TdHlsZS53aWR0aCAvIDIsXG4gICAgeTogYnV0dG9uU3R5bGUuaGVpZ2h0IC8gMiAtIGZvbnRTaXplLFxuICB9IGFzIFN0eWxlV2l0aG91dFR5cGU7XG4gIGNvbnNvbGUubG9nKCdidXR0b24udGV4dC5zdHlsZScsIHRleHRTdHlsZSk7XG5cbiAgcmV0dXJuIGJveCh0ZXh0KGNvbnRlbnQsIHRleHRTdHlsZSksIGJ1dHRvblN0eWxlKTtcbn1cblxuLyoqXG4gKiDliJvlu7rnlLvluINcbiAqIEBwYXJhbSBjYW52YXNJZCDnlLvluINJRFxuICogQHBhcmFtIGVsZW1lbnQg5YyF5ZCr55qE5YWD57SgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW52YXMoY2FudmFzSWQ6IHN0cmluZywgZWxlbWVudD86IENhbnZhc1N0eWxlIHwgQ2FudmFzU3R5bGVbXSkge1xuICBpZiAoIWNvbnRleHQpIHtcbiAgICBjb250ZXh0ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXNJZCk7XG4gIH0gZWxzZSB7XG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgOTk5OTksIDk5OTk5KTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50KSAmJiBlbGVtZW50KSB7XG4gICAgZWxlbWVudCA9IFtlbGVtZW50XTtcbiAgfVxuXG4gIChlbGVtZW50IGFzIENhbnZhc1N0eWxlW10gfCB1bmRlZmluZWQpPy5mb3JFYWNoKChlbCkgPT4gZHJhdyhjb250ZXh0LCBlbCkpO1xuXG4gIGNvbnRleHQuc2NhbGUoMiwgMik7XG5cbiAgY29udGV4dC5kcmF3KCk7XG59XG5cbmV4cG9ydCB7IGRvd25sb2FkSW1hZ2UgfSBmcm9tICcuL2NvbW1vbi91dGlscyc7XG4iLCJpbXBvcnQgeyBzZXRGaWxsU3R5bGUsIHNldFN0cm9rZVN0eWxlIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IENvbnRleHQsIFJvdW5kUmVjdEluY29tZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuLyoqXG4gKiDlnIbop5Lnn6nlvaJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kUmVjdChwcm9wczogUm91bmRSZWN0SW5jb21lKSB7XG4gIHJldHVybiAoY3R4OiBDb250ZXh0KSA9PiB7XG4gICAgbGV0IHsgeCwgeSwgciwgdywgaCwgY29sb3IsIGJvcmRlciB9ID0gcHJvcHM7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyh4ICsgciwgeSk7XG4gICAgY3R4LmFyYyh4ICsgciwgeSArIHIsIHIsIDEuNSAqIE1hdGguUEksIDEgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICBjdHgubGluZVRvKHgsIHkgKyBoIC0gcik7XG4gICAgY3R4LmFyYyh4ICsgciwgeSArIGggLSByLCByLCAxICogTWF0aC5QSSwgMC41ICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgY3R4LmxpbmVUbyh4ICsgdyAtIHIsIHkgKyBoKTtcbiAgICBjdHguYXJjKHggKyB3IC0gciwgeSArIGggLSByLCByLCAwLjUgKiBNYXRoLlBJLCAwICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIHIpO1xuICAgIGN0eC5hcmMoeCArIHcgLSByLCB5ICsgciwgciwgMCAqIE1hdGguUEksIDEuNSAqIE1hdGguUEksIHRydWUpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgIGlmIChjb2xvcikge1xuICAgICAgc2V0RmlsbFN0eWxlKGN0eCwgY29sb3IpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICBpZiAoYm9yZGVyKSB7XG4gICAgICBzZXRTdHJva2VTdHlsZShjdHgsIGJvcmRlcik7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgQ29udGV4dCwgSW1hZ2VJbmZvLCBSb3VuZFJlY3RJbmNvbWUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbi8qKlxuICog5Ymq6KOB5Zu+54mHXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGlwSW1hZ2Uoc291cmNlSW1nOiBJbWFnZUluZm8sIHByb3BzOiBSb3VuZFJlY3RJbmNvbWUpIHtcbiAgcmV0dXJuIChjdHg6IENvbnRleHQpID0+IHtcbiAgICBjb25zdCBpbWcgPSB7IC4uLnNvdXJjZUltZyB9O1xuICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gcHJvcHM7XG4gICAgY3R4LnNhdmUoKTtcblxuICAgIGN0eC5jbGlwKCk7XG5cbiAgICAvLyDnvKnmlL7vvIzpmLLmraLlh7rnjrDnqbrnmb1cbiAgICBpZiAoaW1nLmhlaWdodCA8IGgpIHtcbiAgICAgIGNvbnN0IGRpZmYgPSBoIC8gaW1nLmhlaWdodDtcbiAgICAgIGltZy5oZWlnaHQgPSBkaWZmICogaW1nLmhlaWdodDtcbiAgICAgIGltZy53aWR0aCA9IGRpZmYgKiBpbWcud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKGltZy53aWR0aCA8IHcpIHtcbiAgICAgIGNvbnN0IGRpZmYgPSB3IC8gaW1nLndpZHRoO1xuICAgICAgaW1nLmhlaWdodCA9IGRpZmYgKiBpbWcuaGVpZ2h0O1xuICAgICAgaW1nLndpZHRoID0gZGlmZiAqIGltZy53aWR0aDtcbiAgICB9XG5cbiAgICBsZXQgd2lkdGhSYXRpb24gPSAxLFxuICAgICAgaGVpZ2h0UmF0aW9uID0gMTtcbiAgICBpZiAoaW1nLndpZHRoID4gdykge1xuICAgICAgd2lkdGhSYXRpb24gPSB3IC8gaW1nLndpZHRoO1xuICAgIH1cbiAgICBpZiAoaW1nLmhlaWdodCA+IGgpIHtcbiAgICAgIGhlaWdodFJhdGlvbiA9IGggLyBpbWcuaGVpZ2h0O1xuICAgIH1cblxuICAgIGlmIChoZWlnaHRSYXRpb24gPiB3aWR0aFJhdGlvbikge1xuICAgICAgaW1nLmhlaWdodCA9IGhlaWdodFJhdGlvbiAqIGltZy5oZWlnaHQ7XG4gICAgICBpbWcud2lkdGggPSBoZWlnaHRSYXRpb24gKiBpbWcud2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGltZy5oZWlnaHQgPSB3aWR0aFJhdGlvbiAqIGltZy5oZWlnaHQ7XG4gICAgICBpbWcud2lkdGggPSB3aWR0aFJhdGlvbiAqIGltZy53aWR0aDtcbiAgICB9XG5cbiAgICAvLyDlgY/np7vvvIzkvb/lm77niYfnp7vliqjliLDkuK3lv4PkvY3nva5cbiAgICBsZXQgb2Zmc2V0WCA9IDAsXG4gICAgICBvZmZzZXRZID0gMDtcbiAgICBpZiAoaW1nLndpZHRoID4gdykge1xuICAgICAgb2Zmc2V0WCA9IC0oaW1nLndpZHRoIC0gdykgLyAyO1xuICAgIH1cblxuICAgIGlmIChpbWcuaGVpZ2h0ID4gaCkge1xuICAgICAgb2Zmc2V0WSA9IC0oaW1nLmhlaWdodCAtIGgpIC8gMjtcbiAgICB9XG5cbiAgICBjdHguZHJhd0ltYWdlKGltZy5wYXRoLCAoeCA/PyAwKSArIG9mZnNldFgsICh5ID8/IDApICsgb2Zmc2V0WSwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBzZXRGaWxsU3R5bGUsIHNldEZvbnRTaXplIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IENvbnRleHQsIFRleHRJbmNvbWUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbi8qKlxuICog5riy5p+T5paH5pysXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUZXh0KHByb3BzOiBUZXh0SW5jb21lKSB7XG4gIHJldHVybiAoY3R4OiBDb250ZXh0KSA9PiB7XG4gICAgc2V0Rm9udFNpemUoY3R4LCBwcm9wcy5mb250U2l6ZSk7XG5cbiAgICAvLyDlsI/nqIvluo9CdWcgaHR0cHM6Ly93d3cuY3h5empkLmNvbS9hcnRpY2xlL3FxXzMzOTAwNjEwLzEwNDI1NTE2NFxuICAgIGxldCBmb250V2lkdGggPSBjdHgubWVhc3VyZVRleHQocHJvcHMudGV4dC5zbGljZSgwLCAxKSkud2lkdGg7XG5cbiAgICBjb25zdCBhbGxXaWR0aCA9IGN0eC5tZWFzdXJlVGV4dChwcm9wcy50ZXh0KS53aWR0aDtcbiAgICBmb250V2lkdGggPCBwcm9wcy5mb250U2l6ZSAmJiAoZm9udFdpZHRoID0gcHJvcHMuZm9udFNpemUpO1xuXG4gICAgaWYgKHByb3BzLncgIT09IDApIHtcbiAgICAgIGlmIChhbGxXaWR0aCA+IHByb3BzLncpIHtcbiAgICAgICAgY29uc3Qgc2xpY2VJbmRleCA9IE1hdGguZmxvb3IocHJvcHMudyAvIGZvbnRXaWR0aCk7XG4gICAgICAgIHJlbmRlclRleHQoe1xuICAgICAgICAgIC4uLnByb3BzLFxuICAgICAgICAgIHRleHQ6IHByb3BzLnRleHQuc2xpY2Uoc2xpY2VJbmRleCksXG4gICAgICAgICAgeTogcHJvcHMueSArIGZvbnRXaWR0aCxcbiAgICAgICAgfSkoY3R4KTtcbiAgICAgICAgcHJvcHMudGV4dCA9IHByb3BzLnRleHQuc2xpY2UoMCwgc2xpY2VJbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHggPSBwcm9wcy54LFxuICAgICAgeSA9IHByb3BzLnkgKyBmb250V2lkdGg7XG5cbiAgICBzZXRGaWxsU3R5bGUoY3R4LCBwcm9wcy5jb2xvcik7XG4gICAgY3R4LnNldFRleHRBbGlnbihwcm9wcy50ZXh0QWxpZ24pO1xuICAgIGlmIChwcm9wcy50ZXh0VmVydGljYWxBbGlnbiA9PT0gJ2NlbnRlcicpIHtcbiAgICAgIGN0eC5zZXRUZXh0QmFzZWxpbmUoJ21pZGRsZScpO1xuICAgIH1cbiAgICBjdHguZmlsbFRleHQocHJvcHMudGV4dCwgeCwgeSk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBFTEVNRU5UX1RZUEUgfSBmcm9tICcuLi9jb21tb24vY29uc3RhbnQnO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGUsIENvbnRleHQsIEltYWdlSW5mbyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHJvdW5kUmVjdCB9IGZyb20gJy4vY29tcG9uZW50cy9ib3gnO1xuaW1wb3J0IHsgY2xpcEltYWdlIH0gZnJvbSAnLi9jb21wb25lbnRzL2ltZyc7XG5pbXBvcnQgeyByZW5kZXJUZXh0IH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHQnO1xuXG4vKipcbiAqIOe7mOWItuiKgueCuVxuICogQHBhcmFtIGN0eCBjYW52YXMgY29udGV4dFxuICogQHBhcmFtIGVsZW1lbnQg5YWD57Sg5qC35byPXG4gKiBAcGFyYW0gd3JhcHBlciDlrrnlmajmoLflvI9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXcoY3R4OiBDb250ZXh0LCBlbGVtZW50OiBDYW52YXNTdHlsZSwgd3JhcHBlcj86IENhbnZhc1N0eWxlKSB7XG4gIGNvbnN0IHdyYXBwZXJYID0gd3JhcHBlcj8ueCA/PyAwO1xuICBjb25zdCB3cmFwcGVyWSA9IHdyYXBwZXI/LnkgPz8gMDtcblxuICBjb25zdCB3cmFwcGVyVyA9IHdyYXBwZXI/LndpZHRoID8/IDA7XG4gIGNvbnN0IHdyYXBwZXJIID0gd3JhcHBlcj8uaGVpZ2h0ID8/IDA7XG4gIGNvbnN0IHdyYXBwZXJSID0gd3JhcHBlcj8ucmFkaXVzID8/IDA7XG5cbiAgaWYgKGVsZW1lbnQ/LnR5cGUgPT09IEVMRU1FTlRfVFlQRS5JTUcpIHtcbiAgICBpZiAoIWVsZW1lbnQuaW1nPy5wYXRoKSB7XG4gICAgICB0aHJvdyBFcnJvcign6K+35Lyg5YWl5Zu+54mH5L+h5oGvJyk7XG4gICAgfVxuICB9XG5cbiAgZWxlbWVudCEueCA9IChlbGVtZW50Py54ID8/IDApICsgd3JhcHBlclg7XG4gIGVsZW1lbnQhLnkgPSAoZWxlbWVudD8ueSA/PyAwKSArIHdyYXBwZXJZO1xuXG4gIGNvbnN0IG1hcCA9IHtcbiAgICBbRUxFTUVOVF9UWVBFLlRFWFRdOiByZW5kZXJUZXh0KHtcbiAgICAgIHRleHQ6IGVsZW1lbnQ/LnRleHQgPz8gJycsXG4gICAgICBmb250U2l6ZTogZWxlbWVudD8uZm9udFNpemUgYXMgbnVtYmVyLFxuICAgICAgdGV4dEFsaWduOiBlbGVtZW50Py50ZXh0QWxpZ24gYXMgJ2NlbnRlcicgfCAnbGVmdCcgfCAncmlnaHQnLFxuICAgICAgdGV4dFZlcnRpY2FsQWxpZ246IGVsZW1lbnQ/LnRleHRWZXJ0aWNhbEFsaWduLFxuICAgICAgY29sb3I6IGVsZW1lbnQ/LmNvbG9yIGFzIHN0cmluZyxcbiAgICAgIHg6IGVsZW1lbnQueCxcbiAgICAgIHk6IGVsZW1lbnQueSxcbiAgICAgIHc6ICh3cmFwcGVyVyB8fCBlbGVtZW50Py53aWR0aCkgPz8gMCxcbiAgICB9KSxcbiAgICBbRUxFTUVOVF9UWVBFLkRJVl06IHJvdW5kUmVjdCh7XG4gICAgICB4OiBlbGVtZW50LngsXG4gICAgICB5OiBlbGVtZW50LnksXG4gICAgICB3OiBlbGVtZW50Py53aWR0aCA/PyAwLFxuICAgICAgaDogZWxlbWVudD8uaGVpZ2h0ID8/IDAsXG4gICAgICByOiBlbGVtZW50Py5yYWRpdXMgPz8gMCxcbiAgICAgIGNvbG9yOiBlbGVtZW50Py5iYWNrZ3JvdWRDb2xvcixcbiAgICAgIGJvcmRlcjogZWxlbWVudC5ib3JkZXJDb2xvcixcbiAgICB9KSxcbiAgICBbRUxFTUVOVF9UWVBFLklNR106IGNsaXBJbWFnZShlbGVtZW50LmltZyBhcyBJbWFnZUluZm8sIHtcbiAgICAgIHg6IGVsZW1lbnQueCxcbiAgICAgIHk6IGVsZW1lbnQueSxcbiAgICAgIHc6IHdyYXBwZXJXLFxuICAgICAgaDogd3JhcHBlckgsXG4gICAgICByOiB3cmFwcGVyUixcbiAgICB9KSxcbiAgfTtcblxuICBtYXBbZWxlbWVudD8udHlwZSA/PyAnbm9vcCddKGN0eCk7XG5cbiAgLy8g5a2Q6IqC54K56YCS5b2S57uY5Yi2XG4gIGVsZW1lbnQ/LmNoaWxkcmVuPy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgaWYgKGl0ZW0udHlwZSAhPT0gRUxFTUVOVF9UWVBFLk5PT1ApIHtcbiAgICAgIGRyYXcoY3R4LCBlbGVtZW50Py5jaGlsZHJlbj8uW2ldLCBlbGVtZW50KTtcbiAgICB9XG4gIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9