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
    ctx.font = fontSize + "px  sans-serif";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRCxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9ELEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVoQixJQUFJLEtBQUssRUFBRTtZQUNULHdC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QUFHLEVBQUUsYUFBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsMENBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF0REQsb0JBc0RDOzs7Ozs7O1VDbEVEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYW52YXMtZHNsL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9jYW52YXMtZHNsLy4vc3JjL2NvbW1vbi9jb25zdGFudC50cyIsIndlYnBhY2s6Ly9jYW52YXMtZHNsLy4vc3JjL2NvbW1vbi91dGlscy50cyIsIndlYnBhY2s6Ly9jYW52YXMtZHNsLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2NhbnZhcy1kc2wvLi9zcmMvcmVuZGVyL2NvbXBvbmVudHMvYm94LnRzIiwid2VicGFjazovL2NhbnZhcy1kc2wvLi9zcmMvcmVuZGVyL2NvbXBvbmVudHMvaW1nLnRzIiwid2VicGFjazovL2NhbnZhcy1kc2wvLi9zcmMvcmVuZGVyL2NvbXBvbmVudHMvdGV4dC50cyIsIndlYnBhY2s6Ly9jYW52YXMtZHNsLy4vc3JjL3JlbmRlci9pbmRleC50cyIsIndlYnBhY2s6Ly9jYW52YXMtZHNsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhbnZhcy1kc2wvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jYW52YXMtZHNsL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jYW52YXMtZHNsL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgQ2FudmFzU3R5bGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBFTEVNRU5UX1RZUEUgPSB7XG4gIE5PT1A6ICdub29wJyxcbiAgQ0FOVkFTOiAnY2FudmFzJyxcbiAgQlVUVE9OOiAnYnV0dG9uJyxcbiAgUk9VTkRfUkVDVDogJ3JvdW5kJyxcbiAgVEVYVDogJ3RleHQnLFxuICBTVFlMRTogJ3N0eWxlJyxcbiAgRElWOiAnZGl2JyxcbiAgSU1HOiAnaW1nJyxcbiAgRkxFWDogJ2ZsZXgnLFxufTtcblxuZXhwb3J0IGNvbnN0IG5vb3A6IENhbnZhc1N0eWxlID0ge1xuICB0eXBlOiBFTEVNRU5UX1RZUEUuTk9PUCxcbn07XG4iLCJpbXBvcnQgeyBDYW52YXNTdHlsZSwgQ29udGV4dCwgSW1hZ2VJbmZvIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRUxFTUVOVF9UWVBFIH0gZnJvbSAnLi9jb25zdGFudCc7XG5cbmNvbnN0IGRldmljZSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG5jb25zdCBkcHIgPSA3NTAgLyBkZXZpY2Uud2luZG93V2lkdGg7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KHR5cGU6IHN0cmluZykge1xuICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIENhbnZhc1N0eWxlPiA9IHtcbiAgICBbRUxFTUVOVF9UWVBFLkJVVFRPTl06IHtcbiAgICAgIHR5cGU6IEVMRU1FTlRfVFlQRS5CVVRUT04sXG4gICAgICB3aWR0aDogdW5pdCgyMDApLFxuICAgICAgaGVpZ2h0OiB1bml0KDEwMCksXG4gICAgICBiYWNrZ3JvdWRDb2xvcjogJyNEOTFCMUInLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfSxcbiAgICBbRUxFTUVOVF9UWVBFLkNBTlZBU106IHtcbiAgICAgIHR5cGU6IEVMRU1FTlRfVFlQRS5DQU5WQVMsXG4gICAgICB3aWR0aDogdW5pdCg1MDApLFxuICAgICAgaGVpZ2h0OiB1bml0KDQwMCksXG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9LFxuICAgIFtFTEVNRU5UX1RZUEUuVEVYVF06IHtcbiAgICAgIHR5cGU6IEVMRU1FTlRfVFlQRS5URVhULFxuICAgICAgZm9udFNpemU6IHVuaXQoMjQpLFxuICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgICBjb2xvcjogJyMwMDAnLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfSxcbiAgICBbRUxFTUVOVF9UWVBFLkRJVl06IHtcbiAgICAgIHR5cGU6IEVMRU1FTlRfVFlQRS5ESVYsXG4gICAgICB3aWR0aDogdW5pdCgxMDApLFxuICAgICAgaGVpZ2h0OiB1bml0KDEwMCksXG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9LFxuICB9O1xuICByZXR1cm4gbWFwW3R5cGVdO1xufVxuXG4vKipcbiAqIOWbvueJh+S4i+i9vVxuICogQHBhcmFtIHNyYyDlm77niYfpk77mjqVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkSW1hZ2Uoc3JjOiBzdHJpbmcpOiBQcm9taXNlPEltYWdlSW5mbz4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHd4LmdldEltYWdlSW5mbyh7XG4gICAgICBzcmMsXG4gICAgICBzdWNjZXNzOiAoeyB3aWR0aCwgaGVpZ2h0LCBwYXRoIH0pID0+IHJlc29sdmUoeyB3aWR0aCwgaGVpZ2h0LCBwYXRoIH0pLFxuICAgICAgZmFpbDogKGVycm9yKSA9PiByZWplY3QoZXJyb3IpLFxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiDljZXkvY3orqHnrpdcbiAqIEBwYXJhbSByYXcg5Y6f5aeL5pWw5o2uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bml0KHJhdzogbnVtYmVyKSB7XG4gIHJldHVybiByYXcgLyBkcHI7XG59XG5cbi8qKlxuICog6K6+572u5a2X5L2T5aSn5bCPXG4gKiBAcGFyYW0gY3R4IGNhbnZhcyBjb250ZXh0XG4gKiBAcGFyYW0gZm9udFNpemUg5a2X5L2T5aSn5bCPXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRGb250U2l6ZShjdHg6IENvbnRleHQsIGZvbnRTaXplOiBudW1iZXIpIHtcbiAgY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCAgc2Fucy1zZXJpZmA7XG4gIGN0eC5zZXRGb250U2l6ZShmb250U2l6ZSk7XG59XG5cbi8qKlxuICog6K6+572u5aGr5YWF6aKc6ImyXG4gKiBAcGFyYW0gY3R4IGNhbnZhcyBjb250ZXh0XG4gKiBAcGFyYW0gY29sb3Ig6aKc6ImyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRGaWxsU3R5bGUoY3R4OiBDb250ZXh0LCBjb2xvcjogc3RyaW5nIHwgV2VjaGF0TWluaXByb2dyYW0uQ2FudmFzR3JhZGllbnQpIHtcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICBjdHguc2V0RmlsbFN0eWxlKGNvbG9yKTtcbn1cblxuLyoqXG4gKiDorr7nva7ovrnmoYbpopzoibJcbiAqIEBwYXJhbSBjdHggY2FudmFzIGNvbnRleHRcbiAqIEBwYXJhbSBjb2xvciDpopzoibJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0cm9rZVN0eWxlKGN0eDogQ29udGV4dCwgY29sb3I6IHN0cmluZyB8IFdlY2hhdE1pbmlwcm9ncmFtLkNhbnZhc0dyYWRpZW50KSB7XG4gIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICBjdHguc2V0U3Ryb2tlU3R5bGUoY29sb3IpO1xufVxuIiwiaW1wb3J0IHsgQ2FudmFzU3R5bGUsIEltYWdlSW5mbywgU3R5bGVXaXRob3V0VHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgRUxFTUVOVF9UWVBFIH0gZnJvbSAnLi9jb21tb24vY29uc3RhbnQnO1xuaW1wb3J0IHsgaW5pdCwgdW5pdCB9IGZyb20gJy4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IGRyYXcgfSBmcm9tICcuL3JlbmRlcic7XG5cbmxldCBjb250ZXh0OiBXZWNoYXRNaW5pcHJvZ3JhbS5DYW52YXNDb250ZXh0O1xuXG4vKipcbiAqIOaWh+acrFxuICogQHBhcmFtIHRleHQg5YaF5a65XG4gKiBAcGFyYW0gc3R5bGUg5qC35byPXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0KHRleHQ6IHN0cmluZywgc3R5bGU/OiBTdHlsZVdpdGhvdXRUeXBlKTogQ2FudmFzU3R5bGUge1xuICByZXR1cm4ge1xuICAgIC4uLmluaXQoRUxFTUVOVF9UWVBFLlRFWFQpLFxuICAgIC4uLnN0eWxlLFxuICAgIHRleHQsXG4gIH07XG59XG5cbi8qKlxuICog5qC35byP6L6F5Yqp77yM5Lya5bCGY2FudmFz55qE5Y2V5L2N6K6h566X5Li656ym5ZCI5bCP56iL5bqPcnB455qE5Y2V5L2NXG4gKiBAcGFyYW0gcmF3U3R5bGUg5qC35byPXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZShyYXdTdHlsZTogU3R5bGVXaXRob3V0VHlwZSk6IFN0eWxlV2l0aG91dFR5cGUge1xuICBjb25zdCBmb3JtYXRTdHlsZTogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyIHwgSW1hZ2VJbmZvIHwgU3R5bGVXaXRob3V0VHlwZVtdIHwgdW5kZWZpbmVkPiA9IHt9O1xuXG4gIGZvciAoY29uc3Qga2V5IGluIHJhd1N0eWxlKSB7XG4gICAgaWYgKHR5cGVvZiByYXdTdHlsZVtrZXkgYXMga2V5b2YgU3R5bGVXaXRob3V0VHlwZV0gPT09ICdudW1iZXInKSB7XG4gICAgICBmb3JtYXRTdHlsZVtrZXldID0gdW5pdChyYXdTdHlsZVtrZXkgYXMga2V5b2YgU3R5bGVXaXRob3V0VHlwZV0gYXMgbnVtYmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybWF0U3R5bGVba2V5XSA9IHJhd1N0eWxlW2tleSBhcyBrZXlvZiBTdHlsZVdpdGhvdXRUeXBlXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm1hdFN0eWxlO1xufVxuXG4vKipcbiAqIOWbvueJh1xuICogQHBhcmFtIGltZyDlm77niYfkv6Hmga9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGltZyhpbWc6IEltYWdlSW5mbyk6IENhbnZhc1N0eWxlIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5pbml0KEVMRU1FTlRfVFlQRS5ESVYpLFxuICAgIHR5cGU6IEVMRU1FTlRfVFlQRS5JTUcsXG4gICAgaW1nLFxuICB9O1xufVxuXG4vKipcbiAqIOWfuuehgOebkuWtkFxuICogQHBhcmFtIGNoaWxkcmVuT3JTdHlsZSDlrZDlhYPntKDmiJboh6rouqvmoLflvI9cbiAqIEBwYXJhbSBzdHlsZSDoh6rouqvmoLflvI9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJveChjaGlsZHJlbk9yU3R5bGU/OiBQYXJ0aWFsPENhbnZhc1N0eWxlPiB8IFBhcnRpYWw8Q2FudmFzU3R5bGU+W10sIHN0eWxlPzogU3R5bGVXaXRob3V0VHlwZSk6IENhbnZhc1N0eWxlIHtcbiAgaWYgKGNoaWxkcmVuT3JTdHlsZSAmJiAhQXJyYXkuaXNBcnJheShjaGlsZHJlbk9yU3R5bGUpKSB7XG4gICAgaWYgKCFjaGlsZHJlbk9yU3R5bGUudHlwZSkge1xuICAgICAgLy8g5peg5a2Q5YWD57Sg55qEZGl2XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5pbml0KEVMRU1FTlRfVFlQRS5ESVYpLFxuICAgICAgICAuLi5jaGlsZHJlbk9yU3R5bGUsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDljZXkuKrlrZDlhYPntKDnmoRkaXZcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmluaXQoRUxFTUVOVF9UWVBFLkRJViksXG4gICAgICAgIC4uLnN0eWxlLFxuICAgICAgICBjaGlsZHJlbjogW2NoaWxkcmVuT3JTdHlsZSBhcyBDYW52YXNTdHlsZV0sXG4gICAgICB9O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyDlpJrkuKrlrZDlhYPntKDnmoRkaXZcbiAgICByZXR1cm4ge1xuICAgICAgLi4uaW5pdChFTEVNRU5UX1RZUEUuRElWKSxcbiAgICAgIC4uLnN0eWxlLFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuT3JTdHlsZSBhcyBDYW52YXNTdHlsZVtdLFxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiDln7rnoYDmjInpkq7nu5jliLZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1dHRvbihjb250ZW50OiBzdHJpbmcsIGJ0blN0eWxlPzogU3R5bGVXaXRob3V0VHlwZSkge1xuICBjb25zdCBidXR0b25TdHlsZSA9IHtcbiAgICBiYWNrZ3JvdWRDb2xvcjogYnRuU3R5bGU/LmJhY2tncm91ZENvbG9yID8/ICcjRDkxQjFCJyxcbiAgICB4OiBidG5TdHlsZT8ueCxcbiAgICB5OiBidG5TdHlsZT8ueSxcbiAgICB3aWR0aDogYnRuU3R5bGU/LndpZHRoID8/IDIxMCxcbiAgICBoZWlnaHQ6IGJ0blN0eWxlPy5oZWlnaHQgPz8gMzYsXG4gICAgYm9yZGVyQ29sb3I6IGJ0blN0eWxlPy5ib3JkZXJDb2xvcixcbiAgICByYWRpdXM6IGJ0blN0eWxlPy5yYWRpdXMsXG4gIH07XG5cbiAgY29uc3QgZm9udFNpemUgPSBidG5TdHlsZT8uZm9udFNpemUgPz8gMjg7XG4gIGNvbnN0IHRleHRTdHlsZSA9IHtcbiAgICBjb2xvcjogYnRuU3R5bGU/LmNvbG9yID8/ICcjZmZmJyxcbiAgICB0ZXh0QWxpZ246IGJ0blN0eWxlPy50ZXh0QWxpZ24gPz8gJ2NlbnRlcicsXG4gICAgZm9udFNpemUsXG4gICAgdGV4dFZlcnRpY2FsQWxpZ246ICdjZW50ZXInLFxuICAgIHg6IGJ1dHRvblN0eWxlLndpZHRoIC8gMixcbiAgICB5OiBidXR0b25TdHlsZS5oZWlnaHQgLyAyIC0gZm9udFNpemUsXG4gIH0gYXMgU3R5bGVXaXRob3V0VHlwZTtcbiAgY29uc29sZS5sb2coJ2J1dHRvbi50ZXh0LnN0eWxlJywgdGV4dFN0eWxlKTtcblxuICByZXR1cm4gYm94KHRleHQoY29udGVudCwgdGV4dFN0eWxlKSwgYnV0dG9uU3R5bGUpO1xufVxuXG4vKipcbiAqIOWIm+W7uueUu+W4g1xuICogQHBhcmFtIGNhbnZhc0lkIOeUu+W4g0lEXG4gKiBAcGFyYW0gZWxlbWVudCDljIXlkKvnmoTlhYPntKBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbnZhcyhjYW52YXNJZDogc3RyaW5nLCBlbGVtZW50PzogQ2FudmFzU3R5bGUgfCBDYW52YXNTdHlsZVtdKSB7XG4gIGlmICghY29udGV4dCkge1xuICAgIGNvbnRleHQgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhc0lkKTtcbiAgfSBlbHNlIHtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCA5OTk5OSwgOTk5OTkpO1xuICB9XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmIGVsZW1lbnQpIHtcbiAgICBlbGVtZW50ID0gW2VsZW1lbnRdO1xuICB9XG5cbiAgKGVsZW1lbnQgYXMgQ2FudmFzU3R5bGVbXSB8IHVuZGVmaW5lZCk/LmZvckVhY2goKGVsKSA9PiBkcmF3KGNvbnRleHQsIGVsKSk7XG5cbiAgY29udGV4dC5zY2FsZSgyLCAyKTtcblxuICBjb250ZXh0LmRyYXcoKTtcbn1cblxuZXhwb3J0IHsgZG93bmxvYWRJbWFnZSB9IGZyb20gJy4vY29tbW9uL3V0aWxzJztcbiIsImltcG9ydCB7IHNldEZpbGxTdHlsZSwgc2V0U3Ryb2tlU3R5bGUgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgQ29udGV4dCwgUm91bmRSZWN0SW5jb21lIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG4vKipcbiAqIOWchuinkuefqeW9olxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmRSZWN0KHByb3BzOiBSb3VuZFJlY3RJbmNvbWUpIHtcbiAgcmV0dXJuIChjdHg6IENvbnRleHQpID0+IHtcbiAgICBsZXQgeyB4LCB5LCByLCB3LCBoLCBjb2xvciwgYm9yZGVyIH0gPSBwcm9wcztcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHggKyByLCB5KTtcbiAgICBjdHguYXJjKHggKyByLCB5ICsgciwgciwgMS41ICogTWF0aC5QSSwgMSAqIE1hdGguUEksIHRydWUpO1xuICAgIGN0eC5saW5lVG8oeCwgeSArIGggLSByKTtcbiAgICBjdHguYXJjKHggKyByLCB5ICsgaCAtIHIsIHIsIDEgKiBNYXRoLlBJLCAwLjUgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICBjdHgubGluZVRvKHggKyB3IC0gciwgeSArIGgpO1xuICAgIGN0eC5hcmMoeCArIHcgLSByLCB5ICsgaCAtIHIsIHIsIDAuNSAqIE1hdGguUEksIDAgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICBjdHgubGluZVRvKHggKyB3LCB5ICsgcik7XG4gICAgY3R4LmFyYyh4ICsgdyAtIHIsIHkgKyByLCByLCAwICogTWF0aC5QSSwgMS41ICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICBzZXRGaWxsU3R5bGUoY3R4LCBjb2xvcik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIGlmIChib3JkZXIpIHtcbiAgICAgIHNldFN0cm9rZVN0eWxlKGN0eCwgYm9yZGVyKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgeyBDb250ZXh0LCBJbWFnZUluZm8sIFJvdW5kUmVjdEluY29tZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuLyoqXG4gKiDliaroo4Hlm77niYdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsaXBJbWFnZShzb3VyY2VJbWc6IEltYWdlSW5mbywgcHJvcHM6IFJvdW5kUmVjdEluY29tZSkge1xuICByZXR1cm4gKGN0eDogQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IGltZyA9IHsgLi4uc291cmNlSW1nIH07XG4gICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBwcm9wcztcbiAgICBjdHguc2F2ZSgpO1xuXG4gICAgY3R4LmNsaXAoKTtcblxuICAgIC8vIOe8qeaUvu+8jOmYsuatouWHuueOsOepuueZvVxuICAgIGlmIChpbWcuaGVpZ2h0IDwgaCkge1xuICAgICAgY29uc3QgZGlmZiA9IGggLyBpbWcuaGVpZ2h0O1xuICAgICAgaW1nLmhlaWdodCA9IGRpZmYgKiBpbWcuaGVpZ2h0O1xuICAgICAgaW1nLndpZHRoID0gZGlmZiAqIGltZy53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAoaW1nLndpZHRoIDwgdykge1xuICAgICAgY29uc3QgZGlmZiA9IHcgLyBpbWcud2lkdGg7XG4gICAgICBpbWcuaGVpZ2h0ID0gZGlmZiAqIGltZy5oZWlnaHQ7XG4gICAgICBpbWcud2lkdGggPSBkaWZmICogaW1nLndpZHRoO1xuICAgIH1cblxuICAgIGxldCB3aWR0aFJhdGlvbiA9IDEsXG4gICAgICBoZWlnaHRSYXRpb24gPSAxO1xuICAgIGlmIChpbWcud2lkdGggPiB3KSB7XG4gICAgICB3aWR0aFJhdGlvbiA9IHcgLyBpbWcud2lkdGg7XG4gICAgfVxuICAgIGlmIChpbWcuaGVpZ2h0ID4gaCkge1xuICAgICAgaGVpZ2h0UmF0aW9uID0gaCAvIGltZy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKGhlaWdodFJhdGlvbiA+IHdpZHRoUmF0aW9uKSB7XG4gICAgICBpbWcuaGVpZ2h0ID0gaGVpZ2h0UmF0aW9uICogaW1nLmhlaWdodDtcbiAgICAgIGltZy53aWR0aCA9IGhlaWdodFJhdGlvbiAqIGltZy53aWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgaW1nLmhlaWdodCA9IHdpZHRoUmF0aW9uICogaW1nLmhlaWdodDtcbiAgICAgIGltZy53aWR0aCA9IHdpZHRoUmF0aW9uICogaW1nLndpZHRoO1xuICAgIH1cblxuICAgIC8vIOWBj+enu++8jOS9v+WbvueJh+enu+WKqOWIsOS4reW/g+S9jee9rlxuICAgIGxldCBvZmZzZXRYID0gMCxcbiAgICAgIG9mZnNldFkgPSAwO1xuICAgIGlmIChpbWcud2lkdGggPiB3KSB7XG4gICAgICBvZmZzZXRYID0gLShpbWcud2lkdGggLSB3KSAvIDI7XG4gICAgfVxuXG4gICAgaWYgKGltZy5oZWlnaHQgPiBoKSB7XG4gICAgICBvZmZzZXRZID0gLShpbWcuaGVpZ2h0IC0gaCkgLyAyO1xuICAgIH1cblxuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLnBhdGgsICh4ID8/IDApICsgb2Zmc2V0WCwgKHkgPz8gMCkgKyBvZmZzZXRZLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IHNldEZpbGxTdHlsZSwgc2V0Rm9udFNpemUgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgQ29udGV4dCwgVGV4dEluY29tZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuLyoqXG4gKiDmuLLmn5PmlofmnKxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclRleHQocHJvcHM6IFRleHRJbmNvbWUpIHtcbiAgcmV0dXJuIChjdHg6IENvbnRleHQpID0+IHtcbiAgICBzZXRGb250U2l6ZShjdHgsIHByb3BzLmZvbnRTaXplKTtcblxuICAgIC8vIOWwj+eoi+W6j0J1ZyBodHRwczovL3d3dy5jeHl6amQuY29tL2FydGljbGUvcXFfMzM5MDA2MTAvMTA0MjU1MTY0XG4gICAgbGV0IGZvbnRXaWR0aCA9IGN0eC5tZWFzdXJlVGV4dChwcm9wcy50ZXh0LnNsaWNlKDAsIDEpKS53aWR0aDtcblxuICAgIGNvbnN0IGFsbFdpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KHByb3BzLnRleHQpLndpZHRoO1xuICAgIGZvbnRXaWR0aCA8IHByb3BzLmZvbnRTaXplICYmIChmb250V2lkdGggPSBwcm9wcy5mb250U2l6ZSk7XG5cbiAgICBpZiAocHJvcHMudyAhPT0gMCkge1xuICAgICAgaWYgKGFsbFdpZHRoID4gcHJvcHMudykge1xuICAgICAgICBjb25zdCBzbGljZUluZGV4ID0gTWF0aC5mbG9vcihwcm9wcy53IC8gZm9udFdpZHRoKTtcbiAgICAgICAgcmVuZGVyVGV4dCh7XG4gICAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgICAgdGV4dDogcHJvcHMudGV4dC5zbGljZShzbGljZUluZGV4KSxcbiAgICAgICAgICB5OiBwcm9wcy55ICsgZm9udFdpZHRoLFxuICAgICAgICB9KShjdHgpO1xuICAgICAgICBwcm9wcy50ZXh0ID0gcHJvcHMudGV4dC5zbGljZSgwLCBzbGljZUluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgeCA9IHByb3BzLngsXG4gICAgICB5ID0gcHJvcHMueSArIGZvbnRXaWR0aDtcblxuICAgIHNldEZpbGxTdHlsZShjdHgsIHByb3BzLmNvbG9yKTtcbiAgICBjdHguc2V0VGV4dEFsaWduKHByb3BzLnRleHRBbGlnbik7XG4gICAgaWYgKHByb3BzLnRleHRWZXJ0aWNhbEFsaWduID09PSAnY2VudGVyJykge1xuICAgICAgY3R4LnNldFRleHRCYXNlbGluZSgnbWlkZGxlJyk7XG4gICAgfVxuICAgIGN0eC5maWxsVGV4dChwcm9wcy50ZXh0LCB4LCB5KTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IEVMRU1FTlRfVFlQRSB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudCc7XG5pbXBvcnQgeyBDYW52YXNTdHlsZSwgQ29udGV4dCwgSW1hZ2VJbmZvIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgcm91bmRSZWN0IH0gZnJvbSAnLi9jb21wb25lbnRzL2JveCc7XG5pbXBvcnQgeyBjbGlwSW1hZ2UgfSBmcm9tICcuL2NvbXBvbmVudHMvaW1nJztcbmltcG9ydCB7IHJlbmRlclRleHQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dCc7XG5cbi8qKlxuICog57uY5Yi26IqC54K5XG4gKiBAcGFyYW0gY3R4IGNhbnZhcyBjb250ZXh0XG4gKiBAcGFyYW0gZWxlbWVudCDlhYPntKDmoLflvI9cbiAqIEBwYXJhbSB3cmFwcGVyIOWuueWZqOagt+W8j1xuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhdyhjdHg6IENvbnRleHQsIGVsZW1lbnQ6IENhbnZhc1N0eWxlLCB3cmFwcGVyPzogQ2FudmFzU3R5bGUpIHtcbiAgY29uc3Qgd3JhcHBlclggPSB3cmFwcGVyPy54ID8/IDA7XG4gIGNvbnN0IHdyYXBwZXJZID0gd3JhcHBlcj8ueSA/PyAwO1xuXG4gIGNvbnN0IHdyYXBwZXJXID0gd3JhcHBlcj8ud2lkdGggPz8gMDtcbiAgY29uc3Qgd3JhcHBlckggPSB3cmFwcGVyPy5oZWlnaHQgPz8gMDtcbiAgY29uc3Qgd3JhcHBlclIgPSB3cmFwcGVyPy5yYWRpdXMgPz8gMDtcblxuICBpZiAoZWxlbWVudD8udHlwZSA9PT0gRUxFTUVOVF9UWVBFLklNRykge1xuICAgIGlmICghZWxlbWVudC5pbWc/LnBhdGgpIHtcbiAgICAgIHRocm93IEVycm9yKCfor7fkvKDlhaXlm77niYfkv6Hmga8nKTtcbiAgICB9XG4gIH1cblxuICBlbGVtZW50IS54ID0gKGVsZW1lbnQ/LnggPz8gMCkgKyB3cmFwcGVyWDtcbiAgZWxlbWVudCEueSA9IChlbGVtZW50Py55ID8/IDApICsgd3JhcHBlclk7XG5cbiAgY29uc3QgbWFwID0ge1xuICAgIFtFTEVNRU5UX1RZUEUuVEVYVF06IHJlbmRlclRleHQoe1xuICAgICAgdGV4dDogZWxlbWVudD8udGV4dCA/PyAnJyxcbiAgICAgIGZvbnRTaXplOiBlbGVtZW50Py5mb250U2l6ZSBhcyBudW1iZXIsXG4gICAgICB0ZXh0QWxpZ246IGVsZW1lbnQ/LnRleHRBbGlnbiBhcyAnY2VudGVyJyB8ICdsZWZ0JyB8ICdyaWdodCcsXG4gICAgICB0ZXh0VmVydGljYWxBbGlnbjogZWxlbWVudD8udGV4dFZlcnRpY2FsQWxpZ24sXG4gICAgICBjb2xvcjogZWxlbWVudD8uY29sb3IgYXMgc3RyaW5nLFxuICAgICAgeDogZWxlbWVudC54LFxuICAgICAgeTogZWxlbWVudC55LFxuICAgICAgdzogKHdyYXBwZXJXIHx8IGVsZW1lbnQ/LndpZHRoKSA/PyAwLFxuICAgIH0pLFxuICAgIFtFTEVNRU5UX1RZUEUuRElWXTogcm91bmRSZWN0KHtcbiAgICAgIHg6IGVsZW1lbnQueCxcbiAgICAgIHk6IGVsZW1lbnQueSxcbiAgICAgIHc6IGVsZW1lbnQ/LndpZHRoID8/IDAsXG4gICAgICBoOiBlbGVtZW50Py5oZWlnaHQgPz8gMCxcbiAgICAgIHI6IGVsZW1lbnQ/LnJhZGl1cyA/PyAwLFxuICAgICAgY29sb3I6IGVsZW1lbnQ/LmJhY2tncm91ZENvbG9yLFxuICAgICAgYm9yZGVyOiBlbGVtZW50LmJvcmRlckNvbG9yLFxuICAgIH0pLFxuICAgIFtFTEVNRU5UX1RZUEUuSU1HXTogY2xpcEltYWdlKGVsZW1lbnQuaW1nIGFzIEltYWdlSW5mbywge1xuICAgICAgeDogZWxlbWVudC54LFxuICAgICAgeTogZWxlbWVudC55LFxuICAgICAgdzogd3JhcHBlclcsXG4gICAgICBoOiB3cmFwcGVySCxcbiAgICAgIHI6IHdyYXBwZXJSLFxuICAgIH0pLFxuICB9O1xuXG4gIG1hcFtlbGVtZW50Py50eXBlID8/ICdub29wJ10oY3R4KTtcblxuICAvLyDlrZDoioLngrnpgJLlvZLnu5jliLZcbiAgZWxlbWVudD8uY2hpbGRyZW4/LmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICBpZiAoaXRlbS50eXBlICE9PSBFTEVNRU5UX1RZUEUuTk9PUCkge1xuICAgICAgZHJhdyhjdHgsIGVsZW1lbnQ/LmNoaWxkcmVuPy5baV0sIGVsZW1lbnQpO1xuICAgIH1cbiAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=