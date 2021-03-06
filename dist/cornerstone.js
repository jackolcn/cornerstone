/*! cornerstone - 0.10.8 - 2017-41-02 | (c) 2016 Chris Hafey | https://github.com/chafey/cornerstone */
var cornerstone =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnabledElement = getEnabledElement;
exports.addEnabledElement = addEnabledElement;
exports.getEnabledElementsByImageId = getEnabledElementsByImageId;
exports.getEnabledElements = getEnabledElements;
var enabledElements = [];

function getEnabledElement(element) {
  if (element === undefined) {
    throw 'getEnabledElement: parameter element must not be undefined';
  }
  for (var i = 0; i < enabledElements.length; i++) {
    if (enabledElements[i].element === element) {
      return enabledElements[i];
    }
  }

  throw 'element not enabled';
}

function addEnabledElement(enabledElement) {
  if (enabledElement === undefined) {
    throw 'getEnabledElement: enabledElement element must not be undefined';
  }

  enabledElements.push(enabledElement);
}

function getEnabledElementsByImageId(imageId) {
  var ees = [];

  enabledElements.forEach(function (enabledElement) {
    if (enabledElement.image && enabledElement.image.imageId === imageId) {
      ees.push(enabledElement);
    }
  });

  return ees;
}

function getEnabledElements() {
  return enabledElements;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, invalidated) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  if (enabledElement.image === undefined) {
    throw 'updateImage: image has not been loaded yet';
  }

  (0, _drawImage2.default)(enabledElement, invalidated);
};

var _enabledElements = __webpack_require__(0);

var _drawImage = __webpack_require__(2);

var _drawImage2 = _interopRequireDefault(_drawImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (enabledElement, invalidated) {
  enabledElement.needsRedraw = true;
  if (invalidated) {
    enabledElement.invalid = true;
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (canvas, image) {
  if (canvas === undefined) {
    throw 'getDefaultViewport: parameter canvas must not be undefined';
  }

  if (image === undefined) {
    throw 'getDefaultViewport: parameter image must not be undefined';
  }

  var viewport = {
    scale: 1.0,
    translation: {
      x: 0,
      y: 0
    },
    voi: {
      windowWidth: image.windowWidth,
      windowCenter: image.windowCenter
    },
    invert: image.invert,
    pixelReplication: false,
    rotation: 0,
    hflip: false,
    vflip: false,
    modalityLUT: image.modalityLUT,
    voiLUT: image.voiLUT
  };

  // Fit image to window
  var verticalScale = canvas.height / image.rows;
  var horizontalScale = canvas.width / image.columns;

  if (horizontalScale < verticalScale) {
    viewport.scale = horizontalScale;
  } else {
    viewport.scale = verticalScale;
  }

  return viewport;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (image, windowWidth, windowCenter, invert, modalityLUT, voiLUT) {
  if (modalityLUT || voiLUT) {
    return (0, _generateLutNew2.default)(image, windowWidth, windowCenter, invert, modalityLUT, voiLUT);
  }

  if (image.cachedLut === undefined) {
    var length = image.maxPixelValue - Math.min(image.minPixelValue, 0) + 1;

    image.cachedLut = {};
    image.cachedLut.lutArray = new Uint8ClampedArray(length);
  }
  var lut = image.cachedLut.lutArray;
  var maxPixelValue = image.maxPixelValue;
  var minPixelValue = image.minPixelValue;
  var slope = image.slope;
  var intercept = image.intercept;
  var modalityLutValue = void 0;
  var voiLutValue = void 0;

  // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
  // We improve performance by offsetting the pixel values for signed data to avoid negative indexes
  // When generating the lut and then undo it in storedPixelDataToCanvasImagedata.  Thanks to @jpambrun
  // For this contribution!

  var offset = 0;

  if (minPixelValue < 0) {
    offset = minPixelValue;
  }

  if (invert === true) {
    for (var storedValue = image.minPixelValue; storedValue <= maxPixelValue; storedValue++) {
      modalityLutValue = storedValue * slope + intercept;
      voiLutValue = ((modalityLutValue - windowCenter) / windowWidth + 0.5) * 255.0;
      lut[storedValue + -offset] = 255 - voiLutValue;
    }
  } else {
    for (var _storedValue = image.minPixelValue; _storedValue <= maxPixelValue; _storedValue++) {
      modalityLutValue = _storedValue * slope + intercept;
      voiLutValue = ((modalityLutValue - windowCenter) / windowWidth + 0.5) * 255.0;
      lut[_storedValue + -offset] = voiLutValue;
    }
  }

  return lut;
};

var _generateLutNew = __webpack_require__(8);

var _generateLutNew2 = _interopRequireDefault(_generateLutNew);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderColorImage = renderColorImage;

var _generateLut = __webpack_require__(4);

var _generateLut2 = _interopRequireDefault(_generateLut);

var _storedColorPixelDataToCanvasImageData = __webpack_require__(10);

var _storedColorPixelDataToCanvasImageData2 = _interopRequireDefault(_storedColorPixelDataToCanvasImageData);

var _setToPixelCoordinateSystem = __webpack_require__(6);

var _setToPixelCoordinateSystem2 = _interopRequireDefault(_setToPixelCoordinateSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initializeColorRenderCanvas(enabledElement, image) {
  var colorRenderCanvas = enabledElement.renderingTools.colorRenderCanvas;
  // Resize the canvas

  colorRenderCanvas.width = image.width;
  colorRenderCanvas.height = image.height;

  // Get the canvas data so we can write to it directly
  var colorRenderCanvasContext = colorRenderCanvas.getContext('2d');

  colorRenderCanvasContext.fillStyle = 'white';
  colorRenderCanvasContext.fillRect(0, 0, colorRenderCanvas.width, colorRenderCanvas.height);
  var colorRenderCanvasData = colorRenderCanvasContext.getImageData(0, 0, image.width, image.height);

  enabledElement.renderingTools.colorRenderCanvasContext = colorRenderCanvasContext;
  enabledElement.renderingTools.colorRenderCanvasData = colorRenderCanvasData;
} /**
   * This module is responsible for drawing an image to an enabled elements canvas element
   */


function getLut(image, viewport) {
  // If we have a cached lut and it has the right values, return it immediately
  if (image.cachedLut !== undefined && image.cachedLut.windowCenter === viewport.voi.windowCenter && image.cachedLut.windowWidth === viewport.voi.windowWidth && image.cachedLut.invert === viewport.invert) {
    return image.cachedLut.lutArray;
  }

  // Lut is invalid or not present, regenerate it and cache it
  (0, _generateLut2.default)(image, viewport.voi.windowWidth, viewport.voi.windowCenter, viewport.invert);
  image.cachedLut.windowWidth = viewport.voi.windowWidth;
  image.cachedLut.windowCenter = viewport.voi.windowCenter;
  image.cachedLut.invert = viewport.invert;

  return image.cachedLut.lutArray;
}

function doesImageNeedToBeRendered(enabledElement, image) {
  var lastRenderedImageId = enabledElement.renderingTools.lastRenderedImageId;
  var lastRenderedViewport = enabledElement.renderingTools.lastRenderedViewport;

  if (image.imageId !== lastRenderedImageId || lastRenderedViewport.windowCenter !== enabledElement.viewport.voi.windowCenter || lastRenderedViewport.windowWidth !== enabledElement.viewport.voi.windowWidth || lastRenderedViewport.invert !== enabledElement.viewport.invert || lastRenderedViewport.rotation !== enabledElement.viewport.rotation || lastRenderedViewport.hflip !== enabledElement.viewport.hflip || lastRenderedViewport.vflip !== enabledElement.viewport.vflip) {
    return true;
  }

  return false;
}

function getRenderCanvas(enabledElement, image, invalidated) {
  if (!enabledElement.renderingTools.colorRenderCanvas) {
    enabledElement.renderingTools.colorRenderCanvas = document.createElement('canvas');
  }

  var colorRenderCanvas = enabledElement.renderingTools.colorRenderCanvas;

  // The ww/wc is identity and not inverted - get a canvas with the image rendered into it for
  // Fast drawing
  if (enabledElement.viewport.voi.windowWidth === 255 && enabledElement.viewport.voi.windowCenter === 128 && enabledElement.viewport.invert === false && image.getCanvas && image.getCanvas()) {
    return image.getCanvas();
  }

  // Apply the lut to the stored pixel data onto the render canvas
  if (doesImageNeedToBeRendered(enabledElement, image) === false && invalidated !== true) {
    return colorRenderCanvas;
  }

  // If our render canvas does not match the size of this image reset it
  // NOTE: This might be inefficient if we are updating multiple images of different
  // Sizes frequently.
  if (colorRenderCanvas.width !== image.width || colorRenderCanvas.height !== image.height) {
    initializeColorRenderCanvas(enabledElement, image);
  }

  // Get the lut to use
  var start = window.performance ? performance.now() : Date.now();
  var colorLut = getLut(image, enabledElement.viewport);

  image.stats.lastLutGenerateTime = (window.performance ? performance.now() : Date.now()) - start;

  var colorRenderCanvasData = enabledElement.renderingTools.colorRenderCanvasData;
  var colorRenderCanvasContext = enabledElement.renderingTools.colorRenderCanvasContext;

  // The color image voi/invert has been modified - apply the lut to the underlying
  // Pixel data and put it into the renderCanvas
  (0, _storedColorPixelDataToCanvasImageData2.default)(image, colorLut, colorRenderCanvasData.data);

  start = window.performance ? performance.now() : Date.now();
  colorRenderCanvasContext.putImageData(colorRenderCanvasData, 0, 0);
  image.stats.lastPutImageDataTime = (window.performance ? performance.now() : Date.now()) - start;

  return colorRenderCanvas;
}

/**
 * API function to render a color image to an enabled element
 * @param enabledElement
 * @param invalidated - true if pixel data has been invaldiated and cached rendering should not be used
 */
function renderColorImage(enabledElement, invalidated) {

  if (enabledElement === undefined) {
    throw 'drawImage: enabledElement parameter must not be undefined';
  }
  var image = enabledElement.image;

  if (image === undefined) {
    throw 'drawImage: image must be loaded before it can be drawn';
  }

  // Get the canvas context and reset the transform
  var context = enabledElement.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Clear the canvas
  context.fillStyle = 'black';
  context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);

  // Turn off image smooth/interpolation if pixelReplication is set in the viewport
  if (enabledElement.viewport.pixelReplication === true) {
    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false; // Firefox doesn't support imageSmoothingEnabled yet
  } else {
    context.imageSmoothingEnabled = true;
    context.mozImageSmoothingEnabled = true;
  }

  // Save the canvas context state and apply the viewport properties
  context.save();
  (0, _setToPixelCoordinateSystem2.default)(enabledElement, context);

  if (!enabledElement.renderingTools) {
    enabledElement.renderingTools = {};
  }

  var renderCanvas = void 0;

  if (enabledElement.options && enabledElement.options.renderer && enabledElement.options.renderer.toLowerCase() === 'webgl') {
    // If this enabled element has the option set for WebGL, we should
    // User it as our renderer.
    renderCanvas = cornerstone.webGL.renderer.render(enabledElement);
  } else {
    // If no options are set we will retrieve the renderCanvas through the
    // Normal Canvas rendering path
    renderCanvas = getRenderCanvas(enabledElement, image, invalidated);
  }

  context.drawImage(renderCanvas, 0, 0, image.width, image.height, 0, 0, image.width, image.height);

  context.restore();

  enabledElement.renderingTools.lastRenderedImageId = image.imageId;
  var lastRenderedViewport = {};

  lastRenderedViewport.windowCenter = enabledElement.viewport.voi.windowCenter;
  lastRenderedViewport.windowWidth = enabledElement.viewport.voi.windowWidth;
  lastRenderedViewport.invert = enabledElement.viewport.invert;
  lastRenderedViewport.rotation = enabledElement.viewport.rotation;
  lastRenderedViewport.hflip = enabledElement.viewport.hflip;
  lastRenderedViewport.vflip = enabledElement.viewport.vflip;
  enabledElement.renderingTools.lastRenderedViewport = lastRenderedViewport;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (enabledElement, context, scale) {
  if (enabledElement === undefined) {
    throw 'setToPixelCoordinateSystem: parameter enabledElement must not be undefined';
  }
  if (context === undefined) {
    throw 'setToPixelCoordinateSystem: parameter context must not be undefined';
  }

  var transform = (0, _calculateTransform2.default)(enabledElement, scale);

  context.setTransform(transform.m[0], transform.m[1], transform.m[2], transform.m[3], transform.m[4], transform.m[5]);
};

var _calculateTransform = __webpack_require__(13);

var _calculateTransform2 = _interopRequireDefault(_calculateTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (enabledElement) {
    // For now we will calculate it every time it is requested.  In the future, we may want to cache
    // It in the enabled element to speed things up
    return (0, _calculateTransform2.default)(enabledElement);
};

var _calculateTransform = __webpack_require__(13);

var _calculateTransform2 = _interopRequireDefault(_calculateTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (image, windowWidth, windowCenter, invert, modalityLUT, voiLUT) {
  if (image.cachedLut === undefined) {
    var length = image.maxPixelValue - Math.min(image.minPixelValue, 0) + 1;

    image.cachedLut = {};
    image.cachedLut.lutArray = new Uint8ClampedArray(length);
  }
  var lut = image.cachedLut.lutArray;
  var maxPixelValue = image.maxPixelValue;
  var minPixelValue = image.minPixelValue;

  var mlutfn = (0, _getModalityLUT2.default)(image.slope, image.intercept, modalityLUT);
  var vlutfn = (0, _getVOILut2.default)(windowWidth, windowCenter, voiLUT);

  var offset = 0;

  if (minPixelValue < 0) {
    offset = minPixelValue;
  }

  if (invert === true) {
    for (var storedValue = image.minPixelValue; storedValue <= maxPixelValue; storedValue++) {
      lut[storedValue + -offset] = 255 - vlutfn(mlutfn(storedValue));
    }
  } else {
    for (var _storedValue = image.minPixelValue; _storedValue <= maxPixelValue; _storedValue++) {
      lut[_storedValue + -offset] = vlutfn(mlutfn(_storedValue));
    }
  }

  return lut;
};

var _getModalityLUT = __webpack_require__(21);

var _getModalityLUT2 = _interopRequireDefault(_getModalityLUT);

var _getVOILut = __webpack_require__(51);

var _getVOILut2 = _interopRequireDefault(_getVOILut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (callback) {
  return window.requestAnimationFrame(callback) || window.webkitRequestAnimationFrame(callback) || window.mozRequestAnimationFrame(callback) || window.oRequestAnimationFrame(callback) || window.msRequestAnimationFrame(callback) || requestFrame(callback);
};

/**
 * This module polyfills requestAnimationFrame for older browsers.
 */

function requestFrame(callback) {
  window.setTimeout(callback, 1000 / 60);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (image, lut, canvasImageDataData) {

  var start = (0, _now2.default)();
  var pixelData = image.getPixelData();

  image.stats.lastGetPixelDataTime = (0, _now2.default)() - start;

  start = (0, _now2.default)();
  var minPixelValue = image.minPixelValue;
  var canvasImageDataIndex = 0;
  var storedPixelDataIndex = 0;
  var numPixels = pixelData.length;

  // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
  // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement
  if (minPixelValue < 0) {
    while (storedPixelDataIndex < numPixels) {
      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex++] + -minPixelValue]; // Red
      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex++] + -minPixelValue]; // Green
      canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex] + -minPixelValue]; // Blue
      storedPixelDataIndex += 2;
      canvasImageDataIndex += 2;
    }
  } else {
    while (storedPixelDataIndex < numPixels) {
      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex++]]; // Red
      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex++]]; // Green
      canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex]]; // Blue
      storedPixelDataIndex += 2;
      canvasImageDataIndex += 2;
    }
  }
  image.stats.laststoredPixelDataToCanvasImageDataTime = (0, _now2.default)() - start;
};

var _now = __webpack_require__(22);

var _now2 = _interopRequireDefault(_now);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (image, lut, canvasImageDataData) {
  var pixelData = image.getPixelData();
  var minPixelValue = image.minPixelValue;
  var canvasImageDataIndex = 3;
  var storedPixelDataIndex = 0;
  var numPixels = pixelData.length;

  var start = (0, _now2.default)();

  image.stats.lastGetPixelDataTime = (0, _now2.default)() - start;

  start = (0, _now2.default)();
  // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
  // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement

  // Added two paths (Int16Array, Uint16Array) to avoid polymorphic deoptimization in chrome.
  if (pixelData instanceof Int16Array) {
    if (minPixelValue < 0) {
      while (storedPixelDataIndex < numPixels) {
        canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++] + -minPixelValue]; // Alpha
        canvasImageDataIndex += 4;
      }
    } else {
      while (storedPixelDataIndex < numPixels) {
        canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++]]; // Alpha
        canvasImageDataIndex += 4;
      }
    }
  } else if (pixelData instanceof Uint16Array) {
    while (storedPixelDataIndex < numPixels) {
      canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++]]; // Alpha
      canvasImageDataIndex += 4;
    }
  } else if (minPixelValue < 0) {
    while (storedPixelDataIndex < numPixels) {
      canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++] + -minPixelValue]; // Alpha
      canvasImageDataIndex += 4;
    }
  } else {
    while (storedPixelDataIndex < numPixels) {
      canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++]]; // Alpha
      canvasImageDataIndex += 4;
    }
  }

  image.stats.laststoredPixelDataToCanvasImageDataTime = (0, _now2.default)() - start;
};

var _now = __webpack_require__(22);

var _now2 = _interopRequireDefault(_now);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderGrayscaleImage = renderGrayscaleImage;

var _generateLut = __webpack_require__(4);

var _generateLut2 = _interopRequireDefault(_generateLut);

var _storedPixelDataToCanvasImageData = __webpack_require__(11);

var _storedPixelDataToCanvasImageData2 = _interopRequireDefault(_storedPixelDataToCanvasImageData);

var _setToPixelCoordinateSystem = __webpack_require__(6);

var _setToPixelCoordinateSystem2 = _interopRequireDefault(_setToPixelCoordinateSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initializeGrayscaleRenderCanvas(enabledElement, image) {
  var grayscaleRenderCanvas = enabledElement.renderingTools.grayscaleRenderCanvas;
  // Resize the canvas

  grayscaleRenderCanvas.width = image.width;
  grayscaleRenderCanvas.height = image.height;

  // NOTE - we need to fill the render canvas with white pixels since we control the luminance
  // Using the alpha channel to improve rendering performance.
  var grayscaleRenderCanvasContext = grayscaleRenderCanvas.getContext('2d');

  grayscaleRenderCanvasContext.fillStyle = 'white';
  grayscaleRenderCanvasContext.fillRect(0, 0, grayscaleRenderCanvas.width, grayscaleRenderCanvas.height);
  var grayscaleRenderCanvasData = grayscaleRenderCanvasContext.getImageData(0, 0, image.width, image.height);

  enabledElement.renderingTools.grayscaleRenderCanvasContext = grayscaleRenderCanvasContext;
  enabledElement.renderingTools.grayscaleRenderCanvasData = grayscaleRenderCanvasData;
} /**
   * This module is responsible for drawing a grayscale image
   */


function lutMatches(a, b) {
  // If undefined, they are equal
  if (!a && !b) {
    return true;
  }
  // If one is undefined, not equal
  if (!a || !b) {
    return false;
  }

  // Check the unique ids
  return a.id === b.id;
}

function getLut(image, viewport, invalidated) {
  // If we have a cached lut and it has the right values, return it immediately
  if (image.cachedLut !== undefined && image.cachedLut.windowCenter === viewport.voi.windowCenter && image.cachedLut.windowWidth === viewport.voi.windowWidth && lutMatches(image.cachedLut.modalityLUT, viewport.modalityLUT) && lutMatches(image.cachedLut.voiLUT, viewport.voiLUT) && image.cachedLut.invert === viewport.invert && invalidated !== true) {
    return image.cachedLut.lutArray;
  }

  // Lut is invalid or not present, regenerate it and cache it
  (0, _generateLut2.default)(image, viewport.voi.windowWidth, viewport.voi.windowCenter, viewport.invert, viewport.modalityLUT, viewport.voiLUT);
  image.cachedLut.windowWidth = viewport.voi.windowWidth;
  image.cachedLut.windowCenter = viewport.voi.windowCenter;
  image.cachedLut.invert = viewport.invert;
  image.cachedLut.voiLUT = viewport.voiLUT;
  image.cachedLut.modalityLUT = viewport.modalityLUT;

  return image.cachedLut.lutArray;
}

function doesImageNeedToBeRendered(enabledElement, image) {
  var lastRenderedImageId = enabledElement.renderingTools.lastRenderedImageId;
  var lastRenderedViewport = enabledElement.renderingTools.lastRenderedViewport;

  if (image.imageId !== lastRenderedImageId || lastRenderedViewport.windowCenter !== enabledElement.viewport.voi.windowCenter || lastRenderedViewport.windowWidth !== enabledElement.viewport.voi.windowWidth || lastRenderedViewport.invert !== enabledElement.viewport.invert || lastRenderedViewport.rotation !== enabledElement.viewport.rotation || lastRenderedViewport.hflip !== enabledElement.viewport.hflip || lastRenderedViewport.vflip !== enabledElement.viewport.vflip || lastRenderedViewport.modalityLUT !== enabledElement.viewport.modalityLUT || lastRenderedViewport.voiLUT !== enabledElement.viewport.voiLUT) {
    return true;
  }

  return false;
}

function getRenderCanvas(enabledElement, image, invalidated) {
  if (!enabledElement.renderingTools.grayscaleRenderCanvas) {
    enabledElement.renderingTools.grayscaleRenderCanvas = document.createElement('canvas');
  }

  var grayscaleRenderCanvas = enabledElement.renderingTools.grayscaleRenderCanvas;

  // Apply the lut to the stored pixel data onto the render canvas

  if (doesImageNeedToBeRendered(enabledElement, image) === false && invalidated !== true) {
    return grayscaleRenderCanvas;
  }

  // If our render canvas does not match the size of this image reset it
  // NOTE: This might be inefficient if we are updating multiple images of different
  // Sizes frequently.
  if (grayscaleRenderCanvas.width !== image.width || grayscaleRenderCanvas.height !== image.height) {
    initializeGrayscaleRenderCanvas(enabledElement, image);
  }

  // Get the lut to use
  var start = window.performance ? performance.now() : Date.now();
  var lut = getLut(image, enabledElement.viewport, invalidated);

  image.stats.lastLutGenerateTime = (window.performance ? performance.now() : Date.now()) - start;

  var grayscaleRenderCanvasData = enabledElement.renderingTools.grayscaleRenderCanvasData;
  var grayscaleRenderCanvasContext = enabledElement.renderingTools.grayscaleRenderCanvasContext;
  // Gray scale image - apply the lut and put the resulting image onto the render canvas

  (0, _storedPixelDataToCanvasImageData2.default)(image, lut, grayscaleRenderCanvasData.data);

  start = window.performance ? performance.now() : Date.now();
  grayscaleRenderCanvasContext.putImageData(grayscaleRenderCanvasData, 0, 0);
  image.stats.lastPutImageDataTime = (window.performance ? performance.now() : Date.now()) - start;

  return grayscaleRenderCanvas;
}

/**
 * API function to draw a grayscale image to a given enabledElement
 * @param enabledElement
 * @param invalidated - true if pixel data has been invaldiated and cached rendering should not be used
 */
function renderGrayscaleImage(enabledElement, invalidated) {
  if (enabledElement === undefined) {
    throw 'drawImage: enabledElement parameter must not be undefined';
  }

  var image = enabledElement.image;

  if (image === undefined) {
    throw 'drawImage: image must be loaded before it can be drawn';
  }

  // Get the canvas context and reset the transform
  var context = enabledElement.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Clear the canvas
  context.fillStyle = 'black';
  context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);

  // Turn off image smooth/interpolation if pixelReplication is set in the viewport
  if (enabledElement.viewport.pixelReplication === true) {
    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false; // Firefox doesn't support imageSmoothingEnabled yet
  } else {
    context.imageSmoothingEnabled = true;
    context.mozImageSmoothingEnabled = true;
  }

  // Save the canvas context state and apply the viewport properties
  (0, _setToPixelCoordinateSystem2.default)(enabledElement, context);

  if (!enabledElement.renderingTools) {
    enabledElement.renderingTools = {};
  }

  var renderCanvas = void 0;

  if (enabledElement.options && enabledElement.options.renderer && enabledElement.options.renderer.toLowerCase() === 'webgl') {
    // If this enabled element has the option set for WebGL, we should
    // User it as our renderer.
    renderCanvas = cornerstone.webGL.renderer.render(enabledElement);
  } else {
    // If no options are set we will retrieve the renderCanvas through the
    // Normal Canvas rendering path
    renderCanvas = getRenderCanvas(enabledElement, image, invalidated);
  }

  // Draw the render canvas half the image size (because we set origin to the middle of the canvas above)
  context.drawImage(renderCanvas, 0, 0, image.width, image.height, 0, 0, image.width, image.height);

  enabledElement.renderingTools.lastRenderedImageId = image.imageId;
  var lastRenderedViewport = {};

  lastRenderedViewport.windowCenter = enabledElement.viewport.voi.windowCenter;
  lastRenderedViewport.windowWidth = enabledElement.viewport.voi.windowWidth;
  lastRenderedViewport.invert = enabledElement.viewport.invert;
  lastRenderedViewport.rotation = enabledElement.viewport.rotation;
  lastRenderedViewport.hflip = enabledElement.viewport.hflip;
  lastRenderedViewport.vflip = enabledElement.viewport.vflip;
  lastRenderedViewport.modalityLUT = enabledElement.viewport.modalityLUT;
  lastRenderedViewport.voiLUT = enabledElement.viewport.voiLUT;
  enabledElement.renderingTools.lastRenderedViewport = lastRenderedViewport;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (enabledElement, scale) {

  var transform = new _transform.Transform();

  transform.translate(enabledElement.canvas.width / 2, enabledElement.canvas.height / 2);

  // Apply the rotation before scaling for non square pixels
  var angle = enabledElement.viewport.rotation;

  if (angle !== 0) {
    transform.rotate(angle * Math.PI / 180);
  }

  // Apply the scale
  var widthScale = enabledElement.viewport.scale;
  var heightScale = enabledElement.viewport.scale;

  if (enabledElement.image.rowPixelSpacing < enabledElement.image.columnPixelSpacing) {
    widthScale *= enabledElement.image.columnPixelSpacing / enabledElement.image.rowPixelSpacing;
  } else if (enabledElement.image.columnPixelSpacing < enabledElement.image.rowPixelSpacing) {
    heightScale *= enabledElement.image.rowPixelSpacing / enabledElement.image.columnPixelSpacing;
  }
  transform.scale(widthScale, heightScale);

  // Unrotate to so we can translate unrotated
  if (angle !== 0) {
    transform.rotate(-angle * Math.PI / 180);
  }

  // Apply the pan offset
  transform.translate(enabledElement.viewport.translation.x, enabledElement.viewport.translation.y);

  // Rotate again so we can apply general scale
  if (angle !== 0) {
    transform.rotate(angle * Math.PI / 180);
  }

  if (scale !== undefined) {
    // Apply the font scale
    transform.scale(scale, scale);
  }

  // Apply Flip if required
  if (enabledElement.viewport.hflip) {
    transform.scale(-1, 1);
  }

  if (enabledElement.viewport.vflip) {
    transform.scale(1, -1);
  }

  // Translate the origin back to the corner of the image so the event handlers can draw in image coordinate system
  transform.translate(-enabledElement.image.width / 2, -enabledElement.image.height / 2);

  return transform;
};

var _transform = __webpack_require__(52);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colormap = __webpack_require__(48);

var _lookupTable = __webpack_require__(49);

exports.default = {
  getColormap: _colormap.getColormap,
  getColormapsList: _colormap.getColormapsList,
  LookupTable: _lookupTable.LookupTable
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);
  var imageSize = getImageSize(enabledElement);

  var verticalScale = enabledElement.canvas.height / imageSize.height;
  var horizontalScale = enabledElement.canvas.width / imageSize.width;

  if (horizontalScale < verticalScale) {
    enabledElement.viewport.scale = horizontalScale;
  } else {
    enabledElement.viewport.scale = verticalScale;
  }
  enabledElement.viewport.translation.x = 0;
  enabledElement.viewport.translation.y = 0;
  (0, _updateImage2.default)(element);
};

var _enabledElements = __webpack_require__(0);

var _updateImage = __webpack_require__(1);

var _updateImage2 = _interopRequireDefault(_updateImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module will fit an image to fit inside the canvas displaying it such that all pixels
 * in the image are viewable
 */

function getImageSize(enabledElement) {
  if (enabledElement.viewport.rotation === 0 || enabledElement.viewport.rotation === 180) {
    return {
      width: enabledElement.image.width,
      height: enabledElement.image.height
    };
  }

  return {
    width: enabledElement.image.height,
    height: enabledElement.image.width
  };
}

/**
 * Adjusts an images scale and center so the image is centered and completely visible
 * @param element
 */

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, x, y, width, height) {
  if (element === undefined) {
    throw 'getStoredPixels: parameter element must not be undefined';
  }

  x = Math.round(x);
  y = Math.round(y);
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);
  var storedPixels = [];
  var index = 0;
  var pixelData = enabledElement.image.getPixelData();

  for (var row = 0; row < height; row++) {
    for (var column = 0; column < width; column++) {
      var spIndex = (row + y) * enabledElement.image.columns + (column + x);

      storedPixels[index++] = pixelData[spIndex];
    }
  }

  return storedPixels;
};

var _enabledElements = __webpack_require__(0);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMaximumSizeBytes = setMaximumSizeBytes;
exports.putImagePromise = putImagePromise;
exports.getImagePromise = getImagePromise;
exports.removeImagePromise = removeImagePromise;
exports.getCacheInfo = getCacheInfo;
exports.purgeCache = purgeCache;
exports.changeImageIdCacheSize = changeImageIdCacheSize;
/**
 * This module deals with caching images
 */
var maximumSizeInBytes = 1024 * 1024 * 1024; // 1 GB
var cacheSizeInBytes = 0;

// Dictionary of imageId to cachedImage objects
var imageCacheDict = {};

// Array of cachedImage objects
var cachedImages = exports.cachedImages = [];

function setMaximumSizeBytes(numBytes) {
  if (numBytes === undefined) {
    throw 'setMaximumSizeBytes: parameter numBytes must not be undefined';
  }
  if (numBytes.toFixed === undefined) {
    throw 'setMaximumSizeBytes: parameter numBytes must be a number';
  }

  maximumSizeInBytes = numBytes;
  purgeCacheIfNecessary();
}

function purgeCacheIfNecessary() {
  // If max cache size has not been exceeded, do nothing
  if (cacheSizeInBytes <= maximumSizeInBytes) {
    return;
  }

  // Cache size has been exceeded, create list of images sorted by timeStamp
  // So we can purge the least recently used image
  function compare(a, b) {
    if (a.timeStamp > b.timeStamp) {
      return -1;
    }
    if (a.timeStamp < b.timeStamp) {
      return 1;
    }

    return 0;
  }
  cachedImages.sort(compare);

  // Remove images as necessary
  while (cacheSizeInBytes > maximumSizeInBytes) {
    var lastCachedImage = cachedImages[cachedImages.length - 1];
    var imageId = lastCachedImage.imageId;

    removeImagePromise(imageId);

    $(cornerstone).trigger('CornerstoneImageCachePromiseRemoved', { imageId: imageId });
  }

  var cacheInfo = getCacheInfo();

  $(cornerstone).trigger('CornerstoneImageCacheFull', cacheInfo);
}

function putImagePromise(imageId, imagePromise) {
  if (imageId === undefined) {
    throw 'getImagePromise: imageId must not be undefined';
  }
  if (imagePromise === undefined) {
    throw 'getImagePromise: imagePromise must not be undefined';
  }

  if (imageCacheDict.hasOwnProperty(imageId) === true) {
    throw 'putImagePromise: imageId already in cache';
  }

  var cachedImage = {
    loaded: false,
    imageId: imageId,
    sharedCacheKey: undefined, // The sharedCacheKey for this imageId.  undefined by default
    imagePromise: imagePromise,
    timeStamp: new Date(),
    sizeInBytes: 0
  };

  imageCacheDict[imageId] = cachedImage;
  cachedImages.push(cachedImage);

  imagePromise.then(function (image) {
    cachedImage.loaded = true;
    cachedImage.image = image;

    if (image.sizeInBytes === undefined) {
      throw 'putImagePromise: image does not have sizeInBytes property or';
    }
    if (image.sizeInBytes.toFixed === undefined) {
      throw 'putImagePromise: image.sizeInBytes is not a number';
    }

    cachedImage.sizeInBytes = image.sizeInBytes;
    cacheSizeInBytes += cachedImage.sizeInBytes;
    cachedImage.sharedCacheKey = image.sharedCacheKey;

    purgeCacheIfNecessary();
  });
}

function getImagePromise(imageId) {
  if (imageId === undefined) {
    throw 'getImagePromise: imageId must not be undefined';
  }
  var cachedImage = imageCacheDict[imageId];

  if (cachedImage === undefined) {
    return;
  }

  // Bump time stamp for cached image
  cachedImage.timeStamp = new Date();

  return cachedImage.imagePromise;
}

function removeImagePromise(imageId) {
  if (imageId === undefined) {
    throw 'removeImagePromise: imageId must not be undefined';
  }
  var cachedImage = imageCacheDict[imageId];

  if (cachedImage === undefined) {
    throw 'removeImagePromise: imageId must not be undefined';
  }

  cachedImage.imagePromise.reject();
  cachedImages.splice(cachedImages.indexOf(cachedImage), 1);
  cacheSizeInBytes -= cachedImage.sizeInBytes;
  decache(cachedImage.imagePromise, cachedImage.imageId);

  delete imageCacheDict[imageId];

  return cachedImage.imagePromise;
}

function getCacheInfo() {
  return {
    maximumSizeInBytes: maximumSizeInBytes,
    cacheSizeInBytes: cacheSizeInBytes,
    numberOfImagesCached: cachedImages.length
  };
}

// This method should only be called by `removeImagePromise` because it's
// The one that knows how to deal with shared cache keys and cache size.
function decache(imagePromise, imageId) {
  imagePromise.then(function (image) {
    if (image.decache) {
      image.decache();
    }
  }).always(function () {
    delete imageCacheDict[imageId];
  });
}

function purgeCache() {
  while (cachedImages.length > 0) {
    var removedCachedImage = cachedImages[0];

    removeImagePromise(removedCachedImage.imageId);
  }
}

function changeImageIdCacheSize(imageId, newCacheSize) {
  var cacheEntry = imageCacheDict[imageId];

  if (cacheEntry) {
    cacheEntry.imagePromise.then(function (image) {
      var cacheSizeDifference = newCacheSize - image.sizeInBytes;

      image.sizeInBytes = newCacheSize;
      cacheSizeInBytes += cacheSizeDifference;
    });
  }
}

exports.default = {
  imageCache: imageCacheDict,
  cachedImages: cachedImages,
  setMaximumSizeBytes: setMaximumSizeBytes,
  putImagePromise: putImagePromise,
  getImagePromise: getImagePromise,
  removeImagePromise: removeImagePromise,
  getCacheInfo: getCacheInfo,
  purgeCache: purgeCache,
  changeImageIdCacheSize: changeImageIdCacheSize
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderWebImage = renderWebImage;

var _setToPixelCoordinateSystem = __webpack_require__(6);

var _setToPixelCoordinateSystem2 = _interopRequireDefault(_setToPixelCoordinateSystem);

var _renderColorImage = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * API function to draw a standard web image (PNG, JPG) to an enabledImage
 *
 * @param enabledElement
 * @param invalidated - true if pixel data has been invaldiated and cached rendering should not be used
 */
/**
 * This module is responsible for drawing an image to an enabled elements canvas element
 */
function renderWebImage(enabledElement, invalidated) {

  if (enabledElement === undefined) {
    throw 'drawImage: enabledElement parameter must not be undefined';
  }
  var image = enabledElement.image;

  if (image === undefined) {
    throw 'drawImage: image must be loaded before it can be drawn';
  }

  // Get the canvas context and reset the transform
  var context = enabledElement.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Clear the canvas
  context.fillStyle = 'black';
  context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);

  // Turn off image smooth/interpolation if pixelReplication is set in the viewport
  if (enabledElement.viewport.pixelReplication === true) {
    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false; // Firefox doesn't support imageSmoothingEnabled yet
  } else {
    context.imageSmoothingEnabled = true;
    context.mozImageSmoothingEnabled = true;
  }

  // Save the canvas context state and apply the viewport properties
  (0, _setToPixelCoordinateSystem2.default)(enabledElement, context);

  // If the viewport ww/wc and invert all match the initial state of the image, we can draw the image
  // Directly.  If any of those are changed, we call renderColorImage() to apply the lut
  if (enabledElement.viewport.voi.windowWidth === enabledElement.image.windowWidth && enabledElement.viewport.voi.windowCenter === enabledElement.image.windowCenter && enabledElement.viewport.invert === false) {
    context.drawImage(image.getImage(), 0, 0, image.width, image.height, 0, 0, image.width, image.height);
  } else {
    (0, _renderColorImage.renderColorImage)(enabledElement, invalidated);
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, fitViewportToWindow) {

  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  setCanvasSize(element, enabledElement.canvas);

  var eventData = {
    element: element
  };

  $(element).trigger('CornerstoneElementResized', eventData);

  if (enabledElement.image === undefined) {
    return;
  }

  if (fitViewportToWindow === true) {
    (0, _fitToWindow2.default)(element);
  } else {
    (0, _updateImage2.default)(element);
  }
};

var _enabledElements = __webpack_require__(0);

var _fitToWindow = __webpack_require__(15);

var _fitToWindow2 = _interopRequireDefault(_fitToWindow);

var _updateImage = __webpack_require__(1);

var _updateImage2 = _interopRequireDefault(_updateImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module is responsible for enabling an element to display images with cornerstone
 */
function setCanvasSize(element, canvas) {
  // The device pixel ratio is 1.0 for normal displays and > 1.0
  // For high DPI displays like Retina
  /*
   This functionality is disabled due to buggy behavior on systems with mixed DPI's.  If the canvas
  is created on a display with high DPI (e.g. 2.0) and then the browser window is dragged to
  a different display with a different DPI (e.g. 1.0), the canvas is not recreated so the pageToPixel
  produces incorrect results.  I couldn't find any way to determine when the DPI changed other than
  by polling which is not very clean.  If anyone has any ideas here, please let me know, but for now
  we will disable this functionality.  We may want
  to add a mechanism to optionally enable this functionality if we can determine it is safe to do
  so (e.g. iPad or iPhone or perhaps enumerate the displays on the system.  I am choosing
  to be cautious here since I would rather not have bug reports or safety issues related to this
  scenario.
   var devicePixelRatio = window.devicePixelRatio;
  if(devicePixelRatio === undefined) {
      devicePixelRatio = 1.0;
  }
  */

  canvas.width = element.clientWidth;
  canvas.height = element.clientHeight;
  canvas.style.width = element.clientWidth + 'px';
  canvas.style.height = element.clientHeight + 'px';
}

/**
 * Resizes an enabled element and optionally fits the image to window
 * @param element
 * @param fitViewportToWindow true to refit, false to leave viewport parameters as they are
 */

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _renderer = __webpack_require__(53);

var _createProgramFromString = __webpack_require__(23);

var _createProgramFromString2 = _interopRequireDefault(_createProgramFromString);

var _textureCache = __webpack_require__(24);

var _textureCache2 = _interopRequireDefault(_textureCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createProgramFromString: _createProgramFromString2.default,
  renderer: {
    render: _renderer.render,
    initRenderer: _renderer.initRenderer,
    getRenderCanvas: _renderer.getRenderCanvas,
    isWebGLAvailable: _renderer.isWebGLAvailable
  },
  textureCache: _textureCache2.default,
  isWebGLInitialized: _renderer.isWebGLInitialized
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (slope, intercept, modalityLUT) {
  if (modalityLUT) {
    return generateNonLinearModalityLUT(modalityLUT);
  }

  return generateLinearModalityLUT(slope, intercept);
};

/**
 * This module generates a Modality LUT
 */

function generateLinearModalityLUT(slope, intercept) {
  var localSlope = slope;
  var localIntercept = intercept;

  return function (sp) {
    return sp * localSlope + localIntercept;
  };
}

function generateNonLinearModalityLUT(modalityLUT) {
  var minValue = modalityLUT.lut[0];
  var maxValue = modalityLUT.lut[modalityLUT.lut.length - 1];
  var maxValueMapped = modalityLUT.firstValueMapped + modalityLUT.lut.length;

  return function (sp) {
    if (sp < modalityLUT.firstValueMapped) {
      return minValue;
    } else if (sp >= maxValueMapped) {
      return maxValue;
    }

    return modalityLUT.lut[sp];
  };
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (window.performance) {
    return performance.now();
  }

  return Date.now();
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (gl, vertexShaderSrc, fragShaderSrc) {
  var vertexShader = compileShader(gl, vertexShaderSrc, gl.VERTEX_SHADER);
  var fragShader = compileShader(gl, fragShaderSrc, gl.FRAGMENT_SHADER);

  return createProgram(gl, vertexShader, fragShader);
};

/**
 * Creates and compiles a shader.
 *
 * @param {!WebGLRenderingContext} gl The WebGL Context.
 * @param {string} shaderSource The GLSL source code for the shader.
 * @param {number} shaderType The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
 *
 * @return {!WebGLShader} The shader.
 */
function compileShader(gl, shaderSource, shaderType) {

  // Create the shader object
  var shader = gl.createShader(shaderType);

  // Set the shader source code.
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check if it compiled
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!success && !gl.isContextLost()) {
    // Something went wrong during compilation; get the error
    var infoLog = gl.getShaderInfoLog(shader);

    console.error("Could not compile shader:\n" + infoLog);
  }

  return shader;
}

/**
 * Creates a program from 2 shaders.
 *
 * @param {!WebGLRenderingContext} gl The WebGL context.
 * @param {!WebGLShader} vertexShader A vertex shader.
 * @param {!WebGLShader} fragmentShader A fragment shader.
 * @return {!WebGLProgram} A program.
 */
function createProgram(gl, vertexShader, fragmentShader) {

  // Create a program.
  var program = gl.createProgram();

  // Attach the shaders.
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program.
  gl.linkProgram(program);

  // Check if it linked.
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!success && !gl.isContextLost()) {
    // Something went wrong with the link
    var infoLog = gl.getProgramInfoLog(program);

    console.error("WebGL program filed to link:\n" + infoLog);
  }

  return program;
}

/**
 * Creates a program from 2 shaders source (Strings)
 * @param  {!WebGLRenderingContext} gl              The WebGL context.
 * @param  {!WebGLShader} vertexShaderSrc   Vertex shader string
 * @param  {!WebGLShader} fragShaderSrc Fragment shader string
 * @return {!WebGLProgram}                 A program
 */

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module deals with caching image textures in VRAM for WebGL
 */

var imageCache = {};

var cachedImages = [];

var maximumSizeInBytes = 1024 * 1024 * 256; // 256 MB
var cacheSizeInBytes = 0;

function getCacheInfo() {
  return {
    maximumSizeInBytes: maximumSizeInBytes,
    cacheSizeInBytes: cacheSizeInBytes,
    numberOfImagesCached: cachedImages.length
  };
}

function purgeCacheIfNecessary() {
  // If max cache size has not been exceeded, do nothing
  if (cacheSizeInBytes <= maximumSizeInBytes) {
    return;
  }

  // Cache size has been exceeded, create list of images sorted by timeStamp
  // So we can purge the least recently used image
  function compare(a, b) {
    if (a.timeStamp > b.timeStamp) {
      return -1;
    }
    if (a.timeStamp < b.timeStamp) {
      return 1;
    }

    return 0;
  }
  cachedImages.sort(compare);

  // Remove images as necessary
  while (cacheSizeInBytes > maximumSizeInBytes) {
    var lastCachedImage = cachedImages[cachedImages.length - 1];

    cacheSizeInBytes -= lastCachedImage.sizeInBytes;
    delete imageCache[lastCachedImage.imageId];
    cachedImages.pop();

    $(cornerstone).trigger('CornerstoneWebGLTextureRemoved', { imageId: lastCachedImage.imageId });
  }

  var cacheInfo = getCacheInfo();

  $(cornerstone).trigger('CornerstoneWebGLTextureCacheFull', cacheInfo);
}

function setMaximumSizeBytes(numBytes) {
  if (numBytes === undefined) {
    throw 'setMaximumSizeBytes: parameter numBytes must not be undefined';
  }
  if (numBytes.toFixed === undefined) {
    throw 'setMaximumSizeBytes: parameter numBytes must be a number';
  }

  maximumSizeInBytes = numBytes;
  purgeCacheIfNecessary();
}

function putImageTexture(image, imageTexture) {
  var imageId = image.imageId;

  if (image === undefined) {
    throw 'putImageTexture: image must not be undefined';
  }

  if (imageId === undefined) {
    throw 'putImageTexture: imageId must not be undefined';
  }

  if (imageTexture === undefined) {
    throw 'putImageTexture: imageTexture must not be undefined';
  }

  if (Object.prototype.hasOwnProperty.call(imageCache, imageId) === true) {
    throw 'putImageTexture: imageId already in cache';
  }

  var cachedImage = {
    imageId: imageId,
    imageTexture: imageTexture,
    timeStamp: new Date(),
    sizeInBytes: imageTexture.sizeInBytes
  };

  imageCache[imageId] = cachedImage;
  cachedImages.push(cachedImage);

  if (imageTexture.sizeInBytes === undefined) {
    throw 'putImageTexture: imageTexture does not have sizeInBytes property or';
  }
  if (imageTexture.sizeInBytes.toFixed === undefined) {
    throw 'putImageTexture: imageTexture.sizeInBytes is not a number';
  }
  cacheSizeInBytes += cachedImage.sizeInBytes;
  purgeCacheIfNecessary();
}

function getImageTexture(imageId) {
  if (imageId === undefined) {
    throw 'getImageTexture: imageId must not be undefined';
  }
  var cachedImage = imageCache[imageId];

  if (cachedImage === undefined) {
    return undefined;
  }

  // Bump time stamp for cached image
  cachedImage.timeStamp = new Date();

  return cachedImage.imageTexture;
}

function removeImageTexture(imageId) {
  if (imageId === undefined) {
    throw 'removeImageTexture: imageId must not be undefined';
  }
  var cachedImage = imageCache[imageId];

  if (cachedImage === undefined) {
    throw 'removeImageTexture: imageId must not be undefined';
  }
  cachedImages.splice(cachedImages.indexOf(cachedImage), 1);
  cacheSizeInBytes -= cachedImage.sizeInBytes;
  delete imageCache[imageId];

  return cachedImage.imageTexture;
}

function purgeCache() {
  while (cachedImages.length > 0) {
    var removedCachedImage = cachedImages.pop();

    delete imageCache[removedCachedImage.imageId];
  }
  cacheSizeInBytes = 0;
}

exports.default = {
  purgeCache: purgeCache,
  getImageTexture: getImageTexture,
  putImageTexture: putImageTexture,
  removeImageTexture: removeImageTexture,
  setMaximumSizeBytes: setMaximumSizeBytes
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, pt) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);
  var transform = (0, _getTransform2.default)(enabledElement);

  transform.invert();

  return transform.transformPoint(pt.x, pt.y);
};

var _enabledElements = __webpack_require__(0);

var _getTransform = __webpack_require__(7);

var _getTransform2 = _interopRequireDefault(_getTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element) {
  if (element === undefined) {
    throw 'disable: element element must not be undefined';
  }

  // Search for this element in this list of enabled elements
  var enabledElements = (0, _enabledElements.getEnabledElements)();

  for (var i = 0; i < enabledElements.length; i++) {
    if (enabledElements[i].element === element) {
      // We found it!

      // Fire an event so dependencies can cleanup
      var eventData = {
        element: element
      };

      $(element).trigger('CornerstoneElementDisabled', eventData);

      // Remove the child dom elements that we created (e.g.canvas)
      enabledElements[i].element.removeChild(enabledElements[i].canvas);
      enabledElements[i].canvas = undefined;

      // Remove this element from the list of enabled elements
      enabledElements.splice(i, 1);

      break;
    }
  }
};

var _enabledElements = __webpack_require__(0);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, image, viewport) {
  if (element === undefined) {
    throw 'displayImage: parameter element cannot be undefined';
  }
  if (image === undefined) {
    throw 'displayImage: parameter image cannot be undefined';
  }

  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  enabledElement.image = image;

  if (enabledElement.viewport === undefined) {
    enabledElement.viewport = (0, _getDefaultViewport2.default)(enabledElement.canvas, image);
  }

  // Merge viewport
  if (viewport) {
    for (var attrname in viewport) {
      if (viewport[attrname] !== null) {
        enabledElement.viewport[attrname] = viewport[attrname];
      }
    }
  }

  var now = new Date();
  var frameRate = void 0;

  if (enabledElement.lastImageTimeStamp !== undefined) {
    var timeSinceLastImage = now.getTime() - enabledElement.lastImageTimeStamp;

    frameRate = (1000 / timeSinceLastImage).toFixed();
  }

  enabledElement.lastImageTimeStamp = now.getTime();

  var newImageEventData = {
    viewport: enabledElement.viewport,
    element: enabledElement.element,
    image: enabledElement.image,
    enabledElement: enabledElement,
    frameRate: frameRate
  };

  $(enabledElement.element).trigger('CornerstoneNewImage', newImageEventData);

  (0, _updateImage2.default)(element);
};

var _enabledElements = __webpack_require__(0);

var _getDefaultViewport = __webpack_require__(3);

var _getDefaultViewport2 = _interopRequireDefault(_getDefaultViewport);

var _updateImage = __webpack_require__(1);

var _updateImage2 = _interopRequireDefault(_updateImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  if (enabledElement.image === undefined) {
    throw 'draw: image has not been loaded yet';
  }

  (0, _drawImage2.default)(enabledElement);
};

var _enabledElements = __webpack_require__(0);

var _drawImage = __webpack_require__(2);

var _drawImage2 = _interopRequireDefault(_drawImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var enabledElements = (0, _enabledElements.getEnabledElements)();

  for (var i = 0; i < enabledElements.length; i++) {
    var ee = enabledElements[i];

    if (ee.invalid === true) {
      (0, _drawImage2.default)(ee, true);
    }
  }
};

var _enabledElements = __webpack_require__(0);

var _drawImage = __webpack_require__(2);

var _drawImage2 = _interopRequireDefault(_drawImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, options) {
  if (element === undefined) {
    throw 'enable: parameter element cannot be undefined';
  }

  // If this enabled element has the option set for WebGL, we should
  // Check if this device actually supports it
  if (options && options.renderer && options.renderer.toLowerCase() === 'webgl') {
    if (_index2.default.renderer.isWebGLAvailable()) {
      // If WebGL is available on the device, initialize the renderer
      // And return the renderCanvas from the WebGL rendering path
      console.log('Using WebGL rendering path');

      _index2.default.renderer.initRenderer();
      options.renderer = 'webgl';
    } else {
      // If WebGL is not available on this device, we will fall back
      // To using the Canvas renderer
      console.error('WebGL not available, falling back to Canvas renderer');
      delete options.renderer;
    }
  }

  var canvas = document.createElement('canvas');

  element.appendChild(canvas);

  var el = {
    element: element,
    canvas: canvas,
    image: undefined, // Will be set once image is loaded
    invalid: false, // True if image needs to be drawn, false if not
    needsRedraw: true,
    options: options,
    data: {}
  };

  (0, _enabledElements.addEnabledElement)(el);

  (0, _resize2.default)(element, true);

  function draw() {
    if (el.canvas === undefined) {
      return;
    }
    if (el.needsRedraw && el.image !== undefined) {
      var start = new Date();
      var render = el.image.render;

      el.image.stats = {
        lastGetPixelDataTime: -1.0,
        laststoredPixelDataToCanvasImageDataTime: -1.0,
        lastPutImageDataTime: -1.0,
        lastRenderTime: -1.0,
        lastLutGenerateTime: -1.0
      };

      if (!render) {
        render = el.image.color ? _renderColorImage.renderColorImage : _renderGrayscaleImage.renderGrayscaleImage;
      }

      render(el, el.invalid);

      var context = el.canvas.getContext('2d');

      var end = new Date();
      var diff = end - start;

      var eventData = {
        viewport: el.viewport,
        element: el.element,
        image: el.image,
        enabledElement: el,
        canvasContext: context,
        renderTimeInMs: diff
      };

      el.image.stats.lastRenderTime = diff;

      el.invalid = false;
      el.needsRedraw = false;

      $(el.element).trigger('CornerstoneImageRendered', eventData);
    }

    (0, _requestAnimationFrame2.default)(draw);
  }

  draw();

  return element;
};

var _enabledElements = __webpack_require__(0);

var _resize = __webpack_require__(19);

var _resize2 = _interopRequireDefault(_resize);

var _requestAnimationFrame = __webpack_require__(9);

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _renderColorImage = __webpack_require__(5);

var _renderGrayscaleImage = __webpack_require__(12);

var _index = __webpack_require__(20);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementData = getElementData;
exports.removeElementData = removeElementData;

var _enabledElements = __webpack_require__(0);

function getElementData(el, dataType) {
  var ee = (0, _enabledElements.getEnabledElement)(el);

  if (ee.data.hasOwnProperty(dataType) === false) {
    ee.data[dataType] = {};
  }

  return ee.data[dataType];
}

function removeElementData(el, dataType) {
  var ee = (0, _enabledElements.getEnabledElement)(el);

  delete ee.data[dataType];
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restoreImage = exports.convertToFalseColorImage = exports.convertImageToFalseColorImage = undefined;

var _enabledElements = __webpack_require__(0);

var _updateImage = __webpack_require__(1);

var _updateImage2 = _interopRequireDefault(_updateImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPixelValues(pixelData) {
  var minPixelValue = Number.MAX_VALUE;
  var maxPixelValue = Number.MIN_VALUE;
  var len = pixelData.length;
  var pixel = void 0;

  for (var i = 0; i < len; i++) {
    pixel = pixelData[i];
    minPixelValue = minPixelValue < pixel ? minPixelValue : pixel;
    maxPixelValue = maxPixelValue > pixel ? maxPixelValue : pixel;
  }

  return {
    minPixelValue: minPixelValue,
    maxPixelValue: maxPixelValue
  };
}

function getRestoreImageMethod(image) {
  if (image.restore) {
    return image.restore;
  }

  var color = image.color;
  var rgba = image.rgba;
  var lut = image.lut;
  var slope = image.slope;
  var windowWidth = image.windowWidth;
  var windowCenter = image.windowCenter;
  var minPixelValue = image.minPixelValue;
  var maxPixelValue = image.maxPixelValue;

  return function () {
    image.color = color;
    image.rgba = rgba;
    image.lut = lut;
    image.slope = slope;
    image.windowWidth = windowWidth;
    image.windowCenter = windowCenter;
    image.minPixelValue = minPixelValue;
    image.maxPixelValue = maxPixelValue;

    if (image.origPixelData) {
      var pixelData = image.origPixelData;

      image.getPixelData = function () {
        return pixelData;
      };
    }

    // Remove some attributes added by false color mapping
    delete image.origPixelData;
    delete image.colormapId;
    delete image.falseColor;
  };
}

// User can pass a colormap or its id as string to some of these public functions.
// Then we need to make sure it will be converted into a colormap object if it's as string.
function ensuresColormap(colormap) {
  if (colormap && typeof colormap === 'string') {
    colormap = cornerstone.colors.getColormap(colormap);
  }

  return colormap;
}

/**
 * Restores a false color image to its original version
 * @param image
 */
function restoreImage(image) {
  if (image.restore && typeof image.restore === 'function') {
    image.restore();

    return true;
  }

  return false;
}

/**
 * Convert an image to a false color image
 * @param image
 * @param colormap - it can be a colormap object or a colormap id (string)
 */
function convertImageToFalseColorImage(image, colormap) {
  if (image.color && !image.falseColor) {
    throw 'Color transforms are not implemented yet';
  }

  // User can pass a colormap id or a colormap object
  colormap = ensuresColormap(colormap);

  var colormapId = colormap.getId();

  // Doesn't do anything if colormapId hasn't changed
  if (image.colormapId === colormapId) {
    // It has already being converted into a false color image
    // Using the colormapId passed as parameter
    return false;
  }

  // Restore the image attributes updated when converting to a false color image
  restoreImage(image);

  // Convert the image to a false color image
  if (colormapId) {
    var minPixelValue = image.minPixelValue || 0;
    var maxPixelValue = image.maxPixelValue || 255;

    image.restore = getRestoreImageMethod(image);

    var lookupTable = colormap.createLookupTable();

    lookupTable.setTableRange(minPixelValue, maxPixelValue);

    // Update the pixel data and render the new image
    cornerstone.pixelDataToFalseColorData(image, lookupTable);

    // Update min and max pixel values
    var pixelValues = getPixelValues(image.getPixelData());

    image.minPixelValue = pixelValues.minPixelValue;
    image.maxPixelValue = pixelValues.maxPixelValue;

    // Cache the last colormapId used for performance
    // Then it doesn't need to be re-rendered on next
    // Time if the user hasn't updated it
    image.colormapId = colormapId;
  }

  // Return `true` to tell the caller that the image has got updated
  return true;
}

/**
 * Convert the image of a element to a false color image
 * @param element
 * @param colormap - it can be a colormap object or a colormap id (string)
 */
function convertToFalseColorImage(element, colormap) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);
  var falseColorImageUpdated = convertImageToFalseColorImage(enabledElement.image, colormap);

  if (falseColorImageUpdated) {
    (0, _updateImage2.default)(element, true);
  }
}

exports.convertImageToFalseColorImage = convertImageToFalseColorImage;
exports.convertToFalseColorImage = convertToFalseColorImage;
exports.restoreImage = restoreImage;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, image) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  return (0, _getDefaultViewport2.default)(enabledElement.canvas, image);
};

var _enabledElements = __webpack_require__(0);

var _getDefaultViewport = __webpack_require__(3);

var _getDefaultViewport2 = _interopRequireDefault(_getDefaultViewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  return enabledElement.image;
};

var _enabledElements = __webpack_require__(0);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, x, y, width, height) {

  var storedPixels = (0, _getStoredPixels2.default)(element, x, y, width, height);
  var ee = (0, _enabledElements.getEnabledElement)(element);

  var mlutfn = (0, _getModalityLUT2.default)(ee.image.slope, ee.image.intercept, ee.viewport.modalityLUT);

  return storedPixels.map(mlutfn);
};

var _enabledElements = __webpack_require__(0);

var _getStoredPixels = __webpack_require__(16);

var _getStoredPixels2 = _interopRequireDefault(_getStoredPixels);

var _getModalityLUT = __webpack_require__(21);

var _getModalityLUT2 = _interopRequireDefault(_getModalityLUT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  var viewport = enabledElement.viewport;

  if (viewport === undefined) {
    return;
  }

  return {
    scale: viewport.scale,
    translation: {
      x: viewport.translation.x,
      y: viewport.translation.y
    },
    voi: {
      windowWidth: viewport.voi.windowWidth,
      windowCenter: viewport.voi.windowCenter
    },
    invert: viewport.invert,
    pixelReplication: viewport.pixelReplication,
    rotation: viewport.rotation,
    hflip: viewport.hflip,
    vflip: viewport.vflip,
    modalityLUT: viewport.modalityLUT,
    voiLUT: viewport.voiLUT
  };
};

var _enabledElements = __webpack_require__(0);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImage = loadImage;
exports.loadAndCacheImage = loadAndCacheImage;
exports.registerImageLoader = registerImageLoader;
exports.registerUnknownImageLoader = registerUnknownImageLoader;

var _imageCache = __webpack_require__(17);

var imageLoaders = {}; /**
                        * This module deals with ImageLoaders, loading images and caching images
                        */


var unknownImageLoader = void 0;

function loadImageFromImageLoader(imageId, options) {
  var colonIndex = imageId.indexOf(':');
  var scheme = imageId.substring(0, colonIndex);
  var loader = imageLoaders[scheme];
  var imagePromise = void 0;

  if (loader === undefined || loader === null) {
    if (unknownImageLoader !== undefined) {
      imagePromise = unknownImageLoader(imageId);

      return imagePromise;
    }

    return;
  }
  imagePromise = loader(imageId, options);

  // Broadcast an image loaded event once the image is loaded
  imagePromise.then(function (image) {
    $(cornerstone).trigger('CornerstoneImageLoaded', { image: image });
  });

  return imagePromise;
}

// Loads an image given an imageId and optional priority and returns a promise which will resolve
// To the loaded image object or fail if an error occurred.  The loaded image
// Is not stored in the cache
function loadImage(imageId, options) {
  if (imageId === undefined) {
    throw 'loadImage: parameter imageId must not be undefined';
  }

  var imagePromise = (0, _imageCache.getImagePromise)(imageId);

  if (imagePromise !== undefined) {
    return imagePromise;
  }

  imagePromise = loadImageFromImageLoader(imageId, options);
  if (imagePromise === undefined) {
    throw 'loadImage: no image loader for imageId';
  }

  return imagePromise;
}

// Loads an image given an imageId and optional priority and returns a promise which will resolve
// To the loaded image object or fail if an error occurred.  The image is
// Stored in the cache
function loadAndCacheImage(imageId, options) {
  if (imageId === undefined) {
    throw 'loadAndCacheImage: parameter imageId must not be undefined';
  }

  var imagePromise = (0, _imageCache.getImagePromise)(imageId);

  if (imagePromise !== undefined) {
    return imagePromise;
  }

  imagePromise = loadImageFromImageLoader(imageId, options);
  if (imagePromise === undefined) {
    throw 'loadAndCacheImage: no image loader for imageId';
  }

  (0, _imageCache.putImagePromise)(imageId, imagePromise);

  return imagePromise;
}

// Registers an imageLoader plugin with cornerstone for the specified scheme
function registerImageLoader(scheme, imageLoader) {
  imageLoaders[scheme] = imageLoader;
}

// Registers a new unknownImageLoader and returns the previous one (if it exists)
function registerUnknownImageLoader(imageLoader) {
  var oldImageLoader = unknownImageLoader;

  unknownImageLoader = imageLoader;

  return oldImageLoader;
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _drawImage = __webpack_require__(2);

var _drawImage2 = _interopRequireDefault(_drawImage);

var _generateLut = __webpack_require__(4);

var _generateLut2 = _interopRequireDefault(_generateLut);

var _generateLutNew = __webpack_require__(8);

var _generateLutNew2 = _interopRequireDefault(_generateLutNew);

var _getDefaultViewport = __webpack_require__(3);

var _getDefaultViewport2 = _interopRequireDefault(_getDefaultViewport);

var _requestAnimationFrame = __webpack_require__(9);

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _storedPixelDataToCanvasImageData = __webpack_require__(11);

var _storedPixelDataToCanvasImageData2 = _interopRequireDefault(_storedPixelDataToCanvasImageData);

var _storedColorPixelDataToCanvasImageData = __webpack_require__(10);

var _storedColorPixelDataToCanvasImageData2 = _interopRequireDefault(_storedColorPixelDataToCanvasImageData);

var _getTransform = __webpack_require__(7);

var _getTransform2 = _interopRequireDefault(_getTransform);

var _calculateTransform = __webpack_require__(13);

var _calculateTransform2 = _interopRequireDefault(_calculateTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  drawImage: _drawImage2.default,
  generateLut: _generateLut2.default,
  generateLutNew: _generateLutNew2.default,
  getDefaultViewport: _getDefaultViewport2.default,
  requestAnimationFrame: _requestAnimationFrame2.default,
  storedPixelDataToCanvasImageData: _storedPixelDataToCanvasImageData2.default,
  storedColorPixelDataToCanvasImageData: _storedColorPixelDataToCanvasImageData2.default,
  getTransform: _getTransform2.default,
  calculateTransform: _calculateTransform2.default
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  enabledElement.invalid = true;
  enabledElement.needsRedraw = true;
  var eventData = {
    element: element
  };

  $(element).trigger('CornerstoneInvalidated', eventData);
};

var _enabledElements = __webpack_require__(0);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (imageId) {

  var enabledElements = (0, _enabledElements.getEnabledElementsByImageId)(imageId);

  enabledElements.forEach(function (enabledElement) {
    (0, _drawImage2.default)(enabledElement, true);
  });
};

var _enabledElements = __webpack_require__(0);

var _drawImage = __webpack_require__(2);

var _drawImage2 = _interopRequireDefault(_drawImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProvider = addProvider;
exports.removeProvider = removeProvider;
// This module defines a way to access various metadata about an imageId.  This layer of abstraction exists
// So metadata can be provided in different ways (e.g. by parsing DICOM P10 or by a WADO-RS document)

var providers = [];

/**
 * Adds a metadata provider with the specified priority
 * @param provider
 * @param priority - 0 is default/normal, > 0 is high, < 0 is low
 */
function addProvider(provider, priority) {
  priority = priority || 0; // Default priority

  var i = void 0;

  // Find the right spot to insert this provider based on priority
  for (i = 0; i < providers.length; i++) {
    if (providers[i].priority <= priority) {
      break;
    }
  }

  // Insert the decode task at position i
  providers.splice(i, 0, {
    priority: priority,
    provider: provider
  });
}

/**
 * Removes the specified provider
 * @param provider
 */
function removeProvider(provider) {
  for (var i = 0; i < providers.length; i++) {
    if (providers[i].provider === provider) {
      providers.splice(i, 1);

      return;
    }
  }
}

/**
 * Gets metadata from the registered metadata providers.  Will call each one from highest priority to lowest
 * until one responds
 *
 * @param type
 * @param imageId
 */
function getMetaData(type, imageId) {
  // Invoke each provider in priority order until one returns something
  for (var i = 0; i < providers.length; i++) {
    var result = providers[i].provider(type, imageId);

    if (result !== undefined) {
      return result;
    }
  }
}

exports.default = {
  addProvider: addProvider,
  removeProvider: removeProvider,
  get: getMetaData
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, pageX, pageY) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  if (enabledElement.image === undefined) {
    throw 'image has not been loaded yet';
  }

  // Convert the pageX and pageY to the canvas client coordinates
  var rect = element.getBoundingClientRect();
  var clientX = pageX - rect.left - window.pageXOffset;
  var clientY = pageY - rect.top - window.pageYOffset;

  var pt = { x: clientX,
    y: clientY };
  var transform = (0, _getTransform2.default)(enabledElement);

  transform.invert();

  return transform.transformPoint(pt.x, pt.y);
};

var _enabledElements = __webpack_require__(0);

var _getTransform = __webpack_require__(7);

var _getTransform2 = _interopRequireDefault(_getTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (image, lookupTable) {
  if (image.color && !image.falseColor) {
    throw 'Color transforms are not implemented yet';
  }

  var minPixelValue = image.minPixelValue;
  var canvasImageDataIndex = 0;
  var storedPixelDataIndex = 0;
  var numPixels = image.width * image.height;
  var origPixelData = image.origPixelData || image.getPixelData();
  var storedColorPixelData = new Uint8Array(numPixels * 4);
  var localLookupTable = lookupTable;
  var sp = void 0,
      mapped = void 0;

  image.color = true;
  image.falseColor = true;
  image.origPixelData = origPixelData;

  if (lookupTable instanceof _index2.default.LookupTable) {
    lookupTable.build();

    while (storedPixelDataIndex < numPixels) {
      sp = origPixelData[storedPixelDataIndex++];
      mapped = lookupTable.mapValue(sp);
      storedColorPixelData[canvasImageDataIndex++] = mapped[0];
      storedColorPixelData[canvasImageDataIndex++] = mapped[1];
      storedColorPixelData[canvasImageDataIndex++] = mapped[2];
      storedColorPixelData[canvasImageDataIndex++] = mapped[3];
    }
  } else if (minPixelValue < 0) {
    while (storedPixelDataIndex < numPixels) {
      sp = origPixelData[storedPixelDataIndex++];
      storedColorPixelData[canvasImageDataIndex++] = localLookupTable[sp + -minPixelValue][0]; // Red
      storedColorPixelData[canvasImageDataIndex++] = localLookupTable[sp + -minPixelValue][1]; // Green
      storedColorPixelData[canvasImageDataIndex++] = localLookupTable[sp + -minPixelValue][2]; // Blue
      storedColorPixelData[canvasImageDataIndex++] = localLookupTable[sp + -minPixelValue][3]; // Alpha
    }
  } else {
    while (storedPixelDataIndex < numPixels) {
      sp = origPixelData[storedPixelDataIndex++];
      storedColorPixelData[canvasImageDataIndex++] = localLookupTable[sp][0]; // Red
      storedColorPixelData[canvasImageDataIndex++] = localLookupTable[sp][1]; // Green
      storedColorPixelData[canvasImageDataIndex++] = localLookupTable[sp][2]; // Blue
      storedColorPixelData[canvasImageDataIndex++] = localLookupTable[sp][3]; // Alpha
    }
  }

  image.rgba = true;
  image.lut = undefined;
  image.slope = 1;
  image.minPixelValue = 0;
  image.maxPixelValue = 255;
  image.windowWidth = 255;
  image.windowCenter = 128;
  image.getPixelData = function () {
    return storedColorPixelData;
  };
};

var _index = __webpack_require__(14);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, pt) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);
  var transform = (0, _getTransform2.default)(enabledElement);

  return transform.transformPoint(pt.x, pt.y);
};

var _enabledElements = __webpack_require__(0);

var _getTransform = __webpack_require__(7);

var _getTransform2 = _interopRequireDefault(_getTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _renderColorImage = __webpack_require__(5);

var _renderGrayscaleImage = __webpack_require__(12);

var _renderWebImage = __webpack_require__(18);

exports.default = {
  colorImage: _renderColorImage.renderColorImage,
  grayscaleImage: _renderGrayscaleImage.renderGrayscaleImage,
  webImage: _renderWebImage.renderWebImage
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element) {
  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  enabledElement.viewport = (0, _getDefaultViewport2.default)(enabledElement.canvas, enabledElement.image);
  (0, _updateImage2.default)(element);
};

var _enabledElements = __webpack_require__(0);

var _getDefaultViewport = __webpack_require__(3);

var _getDefaultViewport2 = _interopRequireDefault(_getDefaultViewport);

var _updateImage = __webpack_require__(1);

var _updateImage2 = _interopRequireDefault(_updateImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, viewport) {

  var enabledElement = (0, _enabledElements.getEnabledElement)(element);

  enabledElement.viewport.scale = viewport.scale;
  enabledElement.viewport.translation.x = viewport.translation.x;
  enabledElement.viewport.translation.y = viewport.translation.y;
  enabledElement.viewport.voi.windowWidth = viewport.voi.windowWidth;
  enabledElement.viewport.voi.windowCenter = viewport.voi.windowCenter;
  enabledElement.viewport.invert = viewport.invert;
  enabledElement.viewport.pixelReplication = viewport.pixelReplication;
  enabledElement.viewport.rotation = viewport.rotation;
  enabledElement.viewport.hflip = viewport.hflip;
  enabledElement.viewport.vflip = viewport.vflip;
  enabledElement.viewport.modalityLUT = viewport.modalityLUT;
  enabledElement.viewport.voiLUT = viewport.voiLUT;

  // Prevent window width from being too small (note that values close to zero are valid and can occur with
  // PET images in particular)
  if (enabledElement.viewport.voi.windowWidth < 0.000001) {
    enabledElement.viewport.voi.windowWidth = 0.000001;
  }
  // Prevent scale from getting too small
  if (enabledElement.viewport.scale < 0.0001) {
    enabledElement.viewport.scale = 0.25;
  }

  if (enabledElement.viewport.rotation === 360 || enabledElement.viewport.rotation === -360) {
    enabledElement.viewport.rotation = 0;
  }

  // Force the image to be updated since the viewport has been modified
  (0, _updateImage2.default)(element);
};

var _enabledElements = __webpack_require__(0);

var _updateImage = __webpack_require__(1);

var _updateImage2 = _interopRequireDefault(_updateImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColormapsList = getColormapsList;
exports.getColormap = getColormap;
var COLOR_BLACK = [0, 0, 0, 255];

// Colormaps
//
// Hot Iron, PET, Hot Metal Blue and PET 20 Step are color palattes
// Defined by the DICOM standard
// http://dicom.nema.org/dicom/2013/output/chtml/part06/chapter_B.html
//
// All Linear Segmented Colormaps were copied from matplotlib
// https://github.com/stefanv/matplotlib/blob/master/lib/matplotlib/_cm.py

var colormapsData = {
  hotIron: {
    name: 'Hot Iron',
    numOfColors: 256,
    colors: [[0, 0, 0, 255], [2, 0, 0, 255], [4, 0, 0, 255], [6, 0, 0, 255], [8, 0, 0, 255], [10, 0, 0, 255], [12, 0, 0, 255], [14, 0, 0, 255], [16, 0, 0, 255], [18, 0, 0, 255], [20, 0, 0, 255], [22, 0, 0, 255], [24, 0, 0, 255], [26, 0, 0, 255], [28, 0, 0, 255], [30, 0, 0, 255], [32, 0, 0, 255], [34, 0, 0, 255], [36, 0, 0, 255], [38, 0, 0, 255], [40, 0, 0, 255], [42, 0, 0, 255], [44, 0, 0, 255], [46, 0, 0, 255], [48, 0, 0, 255], [50, 0, 0, 255], [52, 0, 0, 255], [54, 0, 0, 255], [56, 0, 0, 255], [58, 0, 0, 255], [60, 0, 0, 255], [62, 0, 0, 255], [64, 0, 0, 255], [66, 0, 0, 255], [68, 0, 0, 255], [70, 0, 0, 255], [72, 0, 0, 255], [74, 0, 0, 255], [76, 0, 0, 255], [78, 0, 0, 255], [80, 0, 0, 255], [82, 0, 0, 255], [84, 0, 0, 255], [86, 0, 0, 255], [88, 0, 0, 255], [90, 0, 0, 255], [92, 0, 0, 255], [94, 0, 0, 255], [96, 0, 0, 255], [98, 0, 0, 255], [100, 0, 0, 255], [102, 0, 0, 255], [104, 0, 0, 255], [106, 0, 0, 255], [108, 0, 0, 255], [110, 0, 0, 255], [112, 0, 0, 255], [114, 0, 0, 255], [116, 0, 0, 255], [118, 0, 0, 255], [120, 0, 0, 255], [122, 0, 0, 255], [124, 0, 0, 255], [126, 0, 0, 255], [128, 0, 0, 255], [130, 0, 0, 255], [132, 0, 0, 255], [134, 0, 0, 255], [136, 0, 0, 255], [138, 0, 0, 255], [140, 0, 0, 255], [142, 0, 0, 255], [144, 0, 0, 255], [146, 0, 0, 255], [148, 0, 0, 255], [150, 0, 0, 255], [152, 0, 0, 255], [154, 0, 0, 255], [156, 0, 0, 255], [158, 0, 0, 255], [160, 0, 0, 255], [162, 0, 0, 255], [164, 0, 0, 255], [166, 0, 0, 255], [168, 0, 0, 255], [170, 0, 0, 255], [172, 0, 0, 255], [174, 0, 0, 255], [176, 0, 0, 255], [178, 0, 0, 255], [180, 0, 0, 255], [182, 0, 0, 255], [184, 0, 0, 255], [186, 0, 0, 255], [188, 0, 0, 255], [190, 0, 0, 255], [192, 0, 0, 255], [194, 0, 0, 255], [196, 0, 0, 255], [198, 0, 0, 255], [200, 0, 0, 255], [202, 0, 0, 255], [204, 0, 0, 255], [206, 0, 0, 255], [208, 0, 0, 255], [210, 0, 0, 255], [212, 0, 0, 255], [214, 0, 0, 255], [216, 0, 0, 255], [218, 0, 0, 255], [220, 0, 0, 255], [222, 0, 0, 255], [224, 0, 0, 255], [226, 0, 0, 255], [228, 0, 0, 255], [230, 0, 0, 255], [232, 0, 0, 255], [234, 0, 0, 255], [236, 0, 0, 255], [238, 0, 0, 255], [240, 0, 0, 255], [242, 0, 0, 255], [244, 0, 0, 255], [246, 0, 0, 255], [248, 0, 0, 255], [250, 0, 0, 255], [252, 0, 0, 255], [254, 0, 0, 255], [255, 0, 0, 255], [255, 2, 0, 255], [255, 4, 0, 255], [255, 6, 0, 255], [255, 8, 0, 255], [255, 10, 0, 255], [255, 12, 0, 255], [255, 14, 0, 255], [255, 16, 0, 255], [255, 18, 0, 255], [255, 20, 0, 255], [255, 22, 0, 255], [255, 24, 0, 255], [255, 26, 0, 255], [255, 28, 0, 255], [255, 30, 0, 255], [255, 32, 0, 255], [255, 34, 0, 255], [255, 36, 0, 255], [255, 38, 0, 255], [255, 40, 0, 255], [255, 42, 0, 255], [255, 44, 0, 255], [255, 46, 0, 255], [255, 48, 0, 255], [255, 50, 0, 255], [255, 52, 0, 255], [255, 54, 0, 255], [255, 56, 0, 255], [255, 58, 0, 255], [255, 60, 0, 255], [255, 62, 0, 255], [255, 64, 0, 255], [255, 66, 0, 255], [255, 68, 0, 255], [255, 70, 0, 255], [255, 72, 0, 255], [255, 74, 0, 255], [255, 76, 0, 255], [255, 78, 0, 255], [255, 80, 0, 255], [255, 82, 0, 255], [255, 84, 0, 255], [255, 86, 0, 255], [255, 88, 0, 255], [255, 90, 0, 255], [255, 92, 0, 255], [255, 94, 0, 255], [255, 96, 0, 255], [255, 98, 0, 255], [255, 100, 0, 255], [255, 102, 0, 255], [255, 104, 0, 255], [255, 106, 0, 255], [255, 108, 0, 255], [255, 110, 0, 255], [255, 112, 0, 255], [255, 114, 0, 255], [255, 116, 0, 255], [255, 118, 0, 255], [255, 120, 0, 255], [255, 122, 0, 255], [255, 124, 0, 255], [255, 126, 0, 255], [255, 128, 4, 255], [255, 130, 8, 255], [255, 132, 12, 255], [255, 134, 16, 255], [255, 136, 20, 255], [255, 138, 24, 255], [255, 140, 28, 255], [255, 142, 32, 255], [255, 144, 36, 255], [255, 146, 40, 255], [255, 148, 44, 255], [255, 150, 48, 255], [255, 152, 52, 255], [255, 154, 56, 255], [255, 156, 60, 255], [255, 158, 64, 255], [255, 160, 68, 255], [255, 162, 72, 255], [255, 164, 76, 255], [255, 166, 80, 255], [255, 168, 84, 255], [255, 170, 88, 255], [255, 172, 92, 255], [255, 174, 96, 255], [255, 176, 100, 255], [255, 178, 104, 255], [255, 180, 108, 255], [255, 182, 112, 255], [255, 184, 116, 255], [255, 186, 120, 255], [255, 188, 124, 255], [255, 190, 128, 255], [255, 192, 132, 255], [255, 194, 136, 255], [255, 196, 140, 255], [255, 198, 144, 255], [255, 200, 148, 255], [255, 202, 152, 255], [255, 204, 156, 255], [255, 206, 160, 255], [255, 208, 164, 255], [255, 210, 168, 255], [255, 212, 172, 255], [255, 214, 176, 255], [255, 216, 180, 255], [255, 218, 184, 255], [255, 220, 188, 255], [255, 222, 192, 255], [255, 224, 196, 255], [255, 226, 200, 255], [255, 228, 204, 255], [255, 230, 208, 255], [255, 232, 212, 255], [255, 234, 216, 255], [255, 236, 220, 255], [255, 238, 224, 255], [255, 240, 228, 255], [255, 242, 232, 255], [255, 244, 236, 255], [255, 246, 240, 255], [255, 248, 244, 255], [255, 250, 248, 255], [255, 252, 252, 255], [255, 255, 255, 255]]
  },
  pet: {
    name: 'PET',
    numColors: 256,
    colors: [[0, 0, 0, 255], [0, 2, 1, 255], [0, 4, 3, 255], [0, 6, 5, 255], [0, 8, 7, 255], [0, 10, 9, 255], [0, 12, 11, 255], [0, 14, 13, 255], [0, 16, 15, 255], [0, 18, 17, 255], [0, 20, 19, 255], [0, 22, 21, 255], [0, 24, 23, 255], [0, 26, 25, 255], [0, 28, 27, 255], [0, 30, 29, 255], [0, 32, 31, 255], [0, 34, 33, 255], [0, 36, 35, 255], [0, 38, 37, 255], [0, 40, 39, 255], [0, 42, 41, 255], [0, 44, 43, 255], [0, 46, 45, 255], [0, 48, 47, 255], [0, 50, 49, 255], [0, 52, 51, 255], [0, 54, 53, 255], [0, 56, 55, 255], [0, 58, 57, 255], [0, 60, 59, 255], [0, 62, 61, 255], [0, 65, 63, 255], [0, 67, 65, 255], [0, 69, 67, 255], [0, 71, 69, 255], [0, 73, 71, 255], [0, 75, 73, 255], [0, 77, 75, 255], [0, 79, 77, 255], [0, 81, 79, 255], [0, 83, 81, 255], [0, 85, 83, 255], [0, 87, 85, 255], [0, 89, 87, 255], [0, 91, 89, 255], [0, 93, 91, 255], [0, 95, 93, 255], [0, 97, 95, 255], [0, 99, 97, 255], [0, 101, 99, 255], [0, 103, 101, 255], [0, 105, 103, 255], [0, 107, 105, 255], [0, 109, 107, 255], [0, 111, 109, 255], [0, 113, 111, 255], [0, 115, 113, 255], [0, 117, 115, 255], [0, 119, 117, 255], [0, 121, 119, 255], [0, 123, 121, 255], [0, 125, 123, 255], [0, 128, 125, 255], [1, 126, 127, 255], [3, 124, 129, 255], [5, 122, 131, 255], [7, 120, 133, 255], [9, 118, 135, 255], [11, 116, 137, 255], [13, 114, 139, 255], [15, 112, 141, 255], [17, 110, 143, 255], [19, 108, 145, 255], [21, 106, 147, 255], [23, 104, 149, 255], [25, 102, 151, 255], [27, 100, 153, 255], [29, 98, 155, 255], [31, 96, 157, 255], [33, 94, 159, 255], [35, 92, 161, 255], [37, 90, 163, 255], [39, 88, 165, 255], [41, 86, 167, 255], [43, 84, 169, 255], [45, 82, 171, 255], [47, 80, 173, 255], [49, 78, 175, 255], [51, 76, 177, 255], [53, 74, 179, 255], [55, 72, 181, 255], [57, 70, 183, 255], [59, 68, 185, 255], [61, 66, 187, 255], [63, 64, 189, 255], [65, 63, 191, 255], [67, 61, 193, 255], [69, 59, 195, 255], [71, 57, 197, 255], [73, 55, 199, 255], [75, 53, 201, 255], [77, 51, 203, 255], [79, 49, 205, 255], [81, 47, 207, 255], [83, 45, 209, 255], [85, 43, 211, 255], [86, 41, 213, 255], [88, 39, 215, 255], [90, 37, 217, 255], [92, 35, 219, 255], [94, 33, 221, 255], [96, 31, 223, 255], [98, 29, 225, 255], [100, 27, 227, 255], [102, 25, 229, 255], [104, 23, 231, 255], [106, 21, 233, 255], [108, 19, 235, 255], [110, 17, 237, 255], [112, 15, 239, 255], [114, 13, 241, 255], [116, 11, 243, 255], [118, 9, 245, 255], [120, 7, 247, 255], [122, 5, 249, 255], [124, 3, 251, 255], [126, 1, 253, 255], [128, 0, 255, 255], [130, 2, 252, 255], [132, 4, 248, 255], [134, 6, 244, 255], [136, 8, 240, 255], [138, 10, 236, 255], [140, 12, 232, 255], [142, 14, 228, 255], [144, 16, 224, 255], [146, 18, 220, 255], [148, 20, 216, 255], [150, 22, 212, 255], [152, 24, 208, 255], [154, 26, 204, 255], [156, 28, 200, 255], [158, 30, 196, 255], [160, 32, 192, 255], [162, 34, 188, 255], [164, 36, 184, 255], [166, 38, 180, 255], [168, 40, 176, 255], [170, 42, 172, 255], [171, 44, 168, 255], [173, 46, 164, 255], [175, 48, 160, 255], [177, 50, 156, 255], [179, 52, 152, 255], [181, 54, 148, 255], [183, 56, 144, 255], [185, 58, 140, 255], [187, 60, 136, 255], [189, 62, 132, 255], [191, 64, 128, 255], [193, 66, 124, 255], [195, 68, 120, 255], [197, 70, 116, 255], [199, 72, 112, 255], [201, 74, 108, 255], [203, 76, 104, 255], [205, 78, 100, 255], [207, 80, 96, 255], [209, 82, 92, 255], [211, 84, 88, 255], [213, 86, 84, 255], [215, 88, 80, 255], [217, 90, 76, 255], [219, 92, 72, 255], [221, 94, 68, 255], [223, 96, 64, 255], [225, 98, 60, 255], [227, 100, 56, 255], [229, 102, 52, 255], [231, 104, 48, 255], [233, 106, 44, 255], [235, 108, 40, 255], [237, 110, 36, 255], [239, 112, 32, 255], [241, 114, 28, 255], [243, 116, 24, 255], [245, 118, 20, 255], [247, 120, 16, 255], [249, 122, 12, 255], [251, 124, 8, 255], [253, 126, 4, 255], [255, 128, 0, 255], [255, 130, 4, 255], [255, 132, 8, 255], [255, 134, 12, 255], [255, 136, 16, 255], [255, 138, 20, 255], [255, 140, 24, 255], [255, 142, 28, 255], [255, 144, 32, 255], [255, 146, 36, 255], [255, 148, 40, 255], [255, 150, 44, 255], [255, 152, 48, 255], [255, 154, 52, 255], [255, 156, 56, 255], [255, 158, 60, 255], [255, 160, 64, 255], [255, 162, 68, 255], [255, 164, 72, 255], [255, 166, 76, 255], [255, 168, 80, 255], [255, 170, 85, 255], [255, 172, 89, 255], [255, 174, 93, 255], [255, 176, 97, 255], [255, 178, 101, 255], [255, 180, 105, 255], [255, 182, 109, 255], [255, 184, 113, 255], [255, 186, 117, 255], [255, 188, 121, 255], [255, 190, 125, 255], [255, 192, 129, 255], [255, 194, 133, 255], [255, 196, 137, 255], [255, 198, 141, 255], [255, 200, 145, 255], [255, 202, 149, 255], [255, 204, 153, 255], [255, 206, 157, 255], [255, 208, 161, 255], [255, 210, 165, 255], [255, 212, 170, 255], [255, 214, 174, 255], [255, 216, 178, 255], [255, 218, 182, 255], [255, 220, 186, 255], [255, 222, 190, 255], [255, 224, 194, 255], [255, 226, 198, 255], [255, 228, 202, 255], [255, 230, 206, 255], [255, 232, 210, 255], [255, 234, 214, 255], [255, 236, 218, 255], [255, 238, 222, 255], [255, 240, 226, 255], [255, 242, 230, 255], [255, 244, 234, 255], [255, 246, 238, 255], [255, 248, 242, 255], [255, 250, 246, 255], [255, 252, 250, 255], [255, 255, 255, 255]]
  },
  hotMetalBlue: {
    name: 'Hot Metal Blue',
    numColors: 256,
    colors: [[0, 0, 0, 255], [0, 0, 2, 255], [0, 0, 4, 255], [0, 0, 6, 255], [0, 0, 8, 255], [0, 0, 10, 255], [0, 0, 12, 255], [0, 0, 14, 255], [0, 0, 16, 255], [0, 0, 17, 255], [0, 0, 19, 255], [0, 0, 21, 255], [0, 0, 23, 255], [0, 0, 25, 255], [0, 0, 27, 255], [0, 0, 29, 255], [0, 0, 31, 255], [0, 0, 33, 255], [0, 0, 35, 255], [0, 0, 37, 255], [0, 0, 39, 255], [0, 0, 41, 255], [0, 0, 43, 255], [0, 0, 45, 255], [0, 0, 47, 255], [0, 0, 49, 255], [0, 0, 51, 255], [0, 0, 53, 255], [0, 0, 55, 255], [0, 0, 57, 255], [0, 0, 59, 255], [0, 0, 61, 255], [0, 0, 63, 255], [0, 0, 65, 255], [0, 0, 67, 255], [0, 0, 69, 255], [0, 0, 71, 255], [0, 0, 73, 255], [0, 0, 75, 255], [0, 0, 77, 255], [0, 0, 79, 255], [0, 0, 81, 255], [0, 0, 83, 255], [0, 0, 84, 255], [0, 0, 86, 255], [0, 0, 88, 255], [0, 0, 90, 255], [0, 0, 92, 255], [0, 0, 94, 255], [0, 0, 96, 255], [0, 0, 98, 255], [0, 0, 100, 255], [0, 0, 102, 255], [0, 0, 104, 255], [0, 0, 106, 255], [0, 0, 108, 255], [0, 0, 110, 255], [0, 0, 112, 255], [0, 0, 114, 255], [0, 0, 116, 255], [0, 0, 117, 255], [0, 0, 119, 255], [0, 0, 121, 255], [0, 0, 123, 255], [0, 0, 125, 255], [0, 0, 127, 255], [0, 0, 129, 255], [0, 0, 131, 255], [0, 0, 133, 255], [0, 0, 135, 255], [0, 0, 137, 255], [0, 0, 139, 255], [0, 0, 141, 255], [0, 0, 143, 255], [0, 0, 145, 255], [0, 0, 147, 255], [0, 0, 149, 255], [0, 0, 151, 255], [0, 0, 153, 255], [0, 0, 155, 255], [0, 0, 157, 255], [0, 0, 159, 255], [0, 0, 161, 255], [0, 0, 163, 255], [0, 0, 165, 255], [0, 0, 167, 255], [3, 0, 169, 255], [6, 0, 171, 255], [9, 0, 173, 255], [12, 0, 175, 255], [15, 0, 177, 255], [18, 0, 179, 255], [21, 0, 181, 255], [24, 0, 183, 255], [26, 0, 184, 255], [29, 0, 186, 255], [32, 0, 188, 255], [35, 0, 190, 255], [38, 0, 192, 255], [41, 0, 194, 255], [44, 0, 196, 255], [47, 0, 198, 255], [50, 0, 200, 255], [52, 0, 197, 255], [55, 0, 194, 255], [57, 0, 191, 255], [59, 0, 188, 255], [62, 0, 185, 255], [64, 0, 182, 255], [66, 0, 179, 255], [69, 0, 176, 255], [71, 0, 174, 255], [74, 0, 171, 255], [76, 0, 168, 255], [78, 0, 165, 255], [81, 0, 162, 255], [83, 0, 159, 255], [85, 0, 156, 255], [88, 0, 153, 255], [90, 0, 150, 255], [93, 2, 144, 255], [96, 4, 138, 255], [99, 6, 132, 255], [102, 8, 126, 255], [105, 9, 121, 255], [108, 11, 115, 255], [111, 13, 109, 255], [114, 15, 103, 255], [116, 17, 97, 255], [119, 19, 91, 255], [122, 21, 85, 255], [125, 23, 79, 255], [128, 24, 74, 255], [131, 26, 68, 255], [134, 28, 62, 255], [137, 30, 56, 255], [140, 32, 50, 255], [143, 34, 47, 255], [146, 36, 44, 255], [149, 38, 41, 255], [152, 40, 38, 255], [155, 41, 35, 255], [158, 43, 32, 255], [161, 45, 29, 255], [164, 47, 26, 255], [166, 49, 24, 255], [169, 51, 21, 255], [172, 53, 18, 255], [175, 55, 15, 255], [178, 56, 12, 255], [181, 58, 9, 255], [184, 60, 6, 255], [187, 62, 3, 255], [190, 64, 0, 255], [194, 66, 0, 255], [198, 68, 0, 255], [201, 70, 0, 255], [205, 72, 0, 255], [209, 73, 0, 255], [213, 75, 0, 255], [217, 77, 0, 255], [221, 79, 0, 255], [224, 81, 0, 255], [228, 83, 0, 255], [232, 85, 0, 255], [236, 87, 0, 255], [240, 88, 0, 255], [244, 90, 0, 255], [247, 92, 0, 255], [251, 94, 0, 255], [255, 96, 0, 255], [255, 98, 3, 255], [255, 100, 6, 255], [255, 102, 9, 255], [255, 104, 12, 255], [255, 105, 15, 255], [255, 107, 18, 255], [255, 109, 21, 255], [255, 111, 24, 255], [255, 113, 26, 255], [255, 115, 29, 255], [255, 117, 32, 255], [255, 119, 35, 255], [255, 120, 38, 255], [255, 122, 41, 255], [255, 124, 44, 255], [255, 126, 47, 255], [255, 128, 50, 255], [255, 130, 53, 255], [255, 132, 56, 255], [255, 134, 59, 255], [255, 136, 62, 255], [255, 137, 65, 255], [255, 139, 68, 255], [255, 141, 71, 255], [255, 143, 74, 255], [255, 145, 76, 255], [255, 147, 79, 255], [255, 149, 82, 255], [255, 151, 85, 255], [255, 152, 88, 255], [255, 154, 91, 255], [255, 156, 94, 255], [255, 158, 97, 255], [255, 160, 100, 255], [255, 162, 103, 255], [255, 164, 106, 255], [255, 166, 109, 255], [255, 168, 112, 255], [255, 169, 115, 255], [255, 171, 118, 255], [255, 173, 121, 255], [255, 175, 124, 255], [255, 177, 126, 255], [255, 179, 129, 255], [255, 181, 132, 255], [255, 183, 135, 255], [255, 184, 138, 255], [255, 186, 141, 255], [255, 188, 144, 255], [255, 190, 147, 255], [255, 192, 150, 255], [255, 194, 153, 255], [255, 196, 156, 255], [255, 198, 159, 255], [255, 200, 162, 255], [255, 201, 165, 255], [255, 203, 168, 255], [255, 205, 171, 255], [255, 207, 174, 255], [255, 209, 176, 255], [255, 211, 179, 255], [255, 213, 182, 255], [255, 215, 185, 255], [255, 216, 188, 255], [255, 218, 191, 255], [255, 220, 194, 255], [255, 222, 197, 255], [255, 224, 200, 255], [255, 226, 203, 255], [255, 228, 206, 255], [255, 229, 210, 255], [255, 231, 213, 255], [255, 233, 216, 255], [255, 235, 219, 255], [255, 237, 223, 255], [255, 239, 226, 255], [255, 240, 229, 255], [255, 242, 232, 255], [255, 244, 236, 255], [255, 246, 239, 255], [255, 248, 242, 255], [255, 250, 245, 255], [255, 251, 249, 255], [255, 253, 252, 255], [255, 255, 255, 255]]
  },
  pet20Step: {
    name: 'PET 20 Step',
    numColors: 256,
    colors: [[0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255]]
  },
  gray: {
    name: 'Gray',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [1, 1, 1]],
      green: [[0, 0, 0], [1, 1, 1]],
      blue: [[0, 0, 0], [1, 1, 1]]
    }
  },
  jet: {
    name: 'Jet',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [0.35, 0, 0], [0.66, 1, 1], [0.89, 1, 1], [1, 0.5, 0.5]],
      green: [[0, 0, 0], [0.125, 0, 0], [0.375, 1, 1], [0.64, 1, 1], [0.91, 0, 0], [1, 0, 0]],
      blue: [[0, 0.5, 0.5], [0.11, 1, 1], [0.34, 1, 1], [0.65, 0, 0], [1, 0, 0]]
    }
  },
  hsv: {
    name: 'HSV',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 1, 1], [0.158730, 1, 1], [0.174603, 0.968750, 0.968750], [0.333333, 0.031250, 0.031250], [0.349206, 0, 0], [0.666667, 0, 0], [0.682540, 0.031250, 0.031250], [0.841270, 0.968750, 0.968750], [0.857143, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [0.158730, 0.937500, 0.937500], [0.174603, 1, 1], [0.507937, 1, 1], [0.666667, 0.062500, 0.062500], [0.682540, 0, 0], [1, 0, 0]],
      blue: [[0, 0, 0], [0.333333, 0, 0], [0.349206, 0.062500, 0.062500], [0.507937, 1, 1], [0.841270, 1, 1], [0.857143, 0.937500, 0.937500], [1, 0.09375, 0.09375]]
    }
  },
  hot: {
    name: 'Hot',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0.0416, 0.0416], [0.365079, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [0.365079, 0, 0], [0.746032, 1, 1], [1, 1, 1]],
      blue: [[0, 0, 0], [0.746032, 0, 0], [1, 1, 1]]
    }
  },
  cool: {
    name: 'Cool',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [1, 1, 1]],
      green: [[0, 1, 1], [1, 0, 0]],
      blue: [[0, 1, 1], [1, 1, 1]]
    }
  },
  spring: {
    name: 'Spring',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [1, 1, 1]],
      blue: [[0, 1, 1], [1, 0, 0]]
    }
  },
  summer: {
    name: 'Summer',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [1, 1, 1]],
      green: [[0, 0.5, 0.5], [1, 1, 1]],
      blue: [[0, 0.4, 0.4], [1, 0.4, 0.4]]
    }
  },
  autumn: {
    name: 'Autumn',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [1, 1, 1]],
      blue: [[0, 0, 0], [1, 0, 0]]
    }
  },
  winter: {
    name: 'Winter',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [1, 0, 0]],
      green: [[0, 0, 0], [1, 1, 1]],
      blue: [[0, 1, 1], [1, 0.5, 0.5]]
    }
  },
  bone: {
    name: 'Bone',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [0.746032, 0.652778, 0.652778], [1, 1, 1]],
      green: [[0, 0, 0], [0.365079, 0.319444, 0.319444], [0.746032, 0.777778, 0.777778], [1, 1, 1]],
      blue: [[0, 0, 0], [0.365079, 0.444444, 0.444444], [1, 1, 1]]
    }
  },
  copper: {
    name: 'Copper',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [0.809524, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [1, 0.7812, 0.7812]],
      blue: [[0, 0, 0], [1, 0.4975, 0.4975]]
    }
  },
  spectral: {
    name: 'Spectral',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [0.05, 0.4667, 0.4667], [0.10, 0.5333, 0.5333], [0.15, 0, 0], [0.20, 0, 0], [0.25, 0, 0], [0.30, 0, 0], [0.35, 0, 0], [0.40, 0, 0], [0.45, 0, 0], [0.50, 0, 0], [0.55, 0, 0], [0.60, 0, 0], [0.65, 0.7333, 0.7333], [0.70, 0.9333, 0.9333], [0.75, 1, 1], [0.80, 1, 1], [0.85, 1, 1], [0.90, 0.8667, 0.8667], [0.95, 0.80, 0.80], [1, 0.80, 0.80]],
      green: [[0, 0, 0], [0.05, 0, 0], [0.10, 0, 0], [0.15, 0, 0], [0.20, 0, 0], [0.25, 0.4667, 0.4667], [0.30, 0.6000, 0.6000], [0.35, 0.6667, 0.6667], [0.40, 0.6667, 0.6667], [0.45, 0.6000, 0.6000], [0.50, 0.7333, 0.7333], [0.55, 0.8667, 0.8667], [0.60, 1, 1], [0.65, 1, 1], [0.70, 0.9333, 0.9333], [0.75, 0.8000, 0.8000], [0.80, 0.6000, 0.6000], [0.85, 0, 0], [0.90, 0, 0], [0.95, 0, 0], [1, 0.80, 0.80]],
      blue: [[0, 0, 0], [0.05, 0.5333, 0.5333], [0.10, 0.6000, 0.6000], [0.15, 0.6667, 0.6667], [0.20, 0.8667, 0.8667], [0.25, 0.8667, 0.8667], [0.30, 0.8667, 0.8667], [0.35, 0.6667, 0.6667], [0.40, 0.5333, 0.5333], [0.45, 0, 0], [0.5, 0, 0], [0.55, 0, 0], [0.60, 0, 0], [0.65, 0, 0], [0.70, 0, 0], [0.75, 0, 0], [0.80, 0, 0], [0.85, 0, 0], [0.90, 0, 0], [0.95, 0, 0], [1, 0.80, 0.80]]
    }
  },
  coolwarm: {
    name: 'CoolWarm',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0.2298057, 0.2298057], [0.03125, 0.26623388, 0.26623388], [0.0625, 0.30386891, 0.30386891], [0.09375, 0.342804478, 0.342804478], [0.125, 0.38301334, 0.38301334], [0.15625, 0.424369608, 0.424369608], [0.1875, 0.46666708, 0.46666708], [0.21875, 0.509635204, 0.509635204], [0.25, 0.552953156, 0.552953156], [0.28125, 0.596262162, 0.596262162], [0.3125, 0.639176211, 0.639176211], [0.34375, 0.681291281, 0.681291281], [0.375, 0.722193294, 0.722193294], [0.40625, 0.761464949, 0.761464949], [0.4375, 0.798691636, 0.798691636], [0.46875, 0.833466556, 0.833466556], [0.5, 0.865395197, 0.865395197], [0.53125, 0.897787179, 0.897787179], [0.5625, 0.924127593, 0.924127593], [0.59375, 0.944468518, 0.944468518], [0.625, 0.958852946, 0.958852946], [0.65625, 0.96732803, 0.96732803], [0.6875, 0.969954137, 0.969954137], [0.71875, 0.966811177, 0.966811177], [0.75, 0.958003065, 0.958003065], [0.78125, 0.943660866, 0.943660866], [0.8125, 0.923944917, 0.923944917], [0.84375, 0.89904617, 0.89904617], [0.875, 0.869186849, 0.869186849], [0.90625, 0.834620542, 0.834620542], [0.9375, 0.795631745, 0.795631745], [0.96875, 0.752534934, 0.752534934], [1, 0.705673158, 0.705673158]],
      green: [[0, 0.298717966, 0.298717966], [0.03125, 0.353094838, 0.353094838], [0.0625, 0.406535296, 0.406535296], [0.09375, 0.458757618, 0.458757618], [0.125, 0.50941904, 0.50941904], [0.15625, 0.558148092, 0.558148092], [0.1875, 0.604562568, 0.604562568], [0.21875, 0.648280772, 0.648280772], [0.25, 0.688929332, 0.688929332], [0.28125, 0.726149107, 0.726149107], [0.3125, 0.759599947, 0.759599947], [0.34375, 0.788964712, 0.788964712], [0.375, 0.813952739, 0.813952739], [0.40625, 0.834302879, 0.834302879], [0.4375, 0.849786142, 0.849786142], [0.46875, 0.860207984, 0.860207984], [0.5, 0.86541021, 0.86541021], [0.53125, 0.848937047, 0.848937047], [0.5625, 0.827384882, 0.827384882], [0.59375, 0.800927443, 0.800927443], [0.625, 0.769767752, 0.769767752], [0.65625, 0.734132809, 0.734132809], [0.6875, 0.694266682, 0.694266682], [0.71875, 0.650421156, 0.650421156], [0.75, 0.602842431, 0.602842431], [0.78125, 0.551750968, 0.551750968], [0.8125, 0.49730856, 0.49730856], [0.84375, 0.439559467, 0.439559467], [0.875, 0.378313092, 0.378313092], [0.90625, 0.312874446, 0.312874446], [0.9375, 0.24128379, 0.24128379], [0.96875, 0.157246067, 0.157246067], [1, 0.01555616, 0.01555616]],
      blue: [[0, 0.753683153, 0.753683153], [0.03125, 0.801466763, 0.801466763], [0.0625, 0.84495867, 0.84495867], [0.09375, 0.883725899, 0.883725899], [0.125, 0.917387822, 0.917387822], [0.15625, 0.945619588, 0.945619588], [0.1875, 0.968154911, 0.968154911], [0.21875, 0.98478814, 0.98478814], [0.25, 0.995375608, 0.995375608], [0.28125, 0.999836203, 0.999836203], [0.3125, 0.998151185, 0.998151185], [0.34375, 0.990363227, 0.990363227], [0.375, 0.976574709, 0.976574709], [0.40625, 0.956945269, 0.956945269], [0.4375, 0.931688648, 0.931688648], [0.46875, 0.901068838, 0.901068838], [0.5, 0.865395561, 0.865395561], [0.53125, 0.820880546, 0.820880546], [0.5625, 0.774508472, 0.774508472], [0.59375, 0.726736146, 0.726736146], [0.625, 0.678007945, 0.678007945], [0.65625, 0.628751763, 0.628751763], [0.6875, 0.579375448, 0.579375448], [0.71875, 0.530263762, 0.530263762], [0.75, 0.481775914, 0.481775914], [0.78125, 0.434243684, 0.434243684], [0.8125, 0.387970225, 0.387970225], [0.84375, 0.343229596, 0.343229596], [0.875, 0.300267182, 0.300267182], [0.90625, 0.259301199, 0.259301199], [0.9375, 0.220525627, 0.220525627], [0.96875, 0.184115123, 0.184115123], [1, 0.150232812, 0.150232812]]
    }
  },
  blues: {
    name: 'Blues',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0.9686274528503418, 0.9686274528503418], [0.125, 0.87058824300765991, 0.87058824300765991], [0.25, 0.7764706015586853, 0.7764706015586853], [0.375, 0.61960786581039429, 0.61960786581039429], [0.5, 0.41960784792900085, 0.41960784792900085], [0.625, 0.25882354378700256, 0.25882354378700256], [0.75, 0.12941177189350128, 0.12941177189350128], [0.875, 0.031372550874948502, 0.031372550874948502], [1, 0.031372550874948502, 0.031372550874948502]],
      green: [[0, 0.9843137264251709, 0.9843137264251709], [0.125, 0.92156863212585449, 0.92156863212585449], [0.25, 0.85882353782653809, 0.85882353782653809], [0.375, 0.7921568751335144, 0.7921568751335144], [0.5, 0.68235296010971069, 0.68235296010971069], [0.625, 0.57254904508590698, 0.57254904508590698], [0.75, 0.44313725829124451, 0.44313725829124451], [0.875, 0.31764706969261169, 0.31764706969261169], [1, 0.18823529779911041, 0.18823529779911041]],
      blue: [[0, 1, 1], [0.125, 0.9686274528503418, 0.9686274528503418], [0.25, 0.93725490570068359, 0.93725490570068359], [0.375, 0.88235294818878174, 0.88235294818878174], [0.5, 0.83921569585800171, 0.83921569585800171], [0.625, 0.7764706015586853, 0.7764706015586853], [0.75, 0.70980393886566162, 0.70980393886566162], [0.875, 0.61176472902297974, 0.61176472902297974], [1, 0.41960784792900085, 0.41960784792900085]]
    }
  }
};

// Generate linearly spaced vectors
// http://cens.ioc.ee/local/man/matlab/techdoc/ref/linspace.html
function linspace(a, b, n) {
  n = n === null ? 100 : n;

  var increment = (b - a) / (n - 1);
  var vector = [];

  while (n-- > 0) {
    vector.push(a);
    a += increment;
  }

  // Make sure the last item will always be "b" because most of the
  // Time we'll get numbers like 1.0000000000000002 instead of 1.
  vector[vector.length - 1] = b;

  return vector;
}

// Return the number of elements smaller than "elem" (binary search)
function getRank(array, elem) {
  var left = 0;
  var right = array.length - 1;

  while (left <= right) {
    var mid = left + Math.floor((right - left) / 2);
    var midElem = array[mid];

    if (midElem === elem) {
      return mid;
    } else if (elem < midElem) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// Find the indices into a sorted array a such that, if the corresponding elements
// In v were inserted before the indices, the order of a would be preserved.
// http://lagrange.univ-lyon1.fr/docs/numpy/1.11.0/reference/generated/numpy.searchsorted.html
function searchSorted(inputArray, values) {
  var i = void 0;
  var indexes = [];
  var len = values.length;

  inputArray.sort(function (a, b) {
    return a - b;
  });

  for (i = 0; i < len; i++) {
    indexes[i] = getRank(inputArray, values[i]);
  }

  return indexes;
}

// Create an *N* -element 1-d lookup table
//
// *Data* represented by a list of x,y0,y1 mapping correspondences. Each element in this
// List represents how a value between 0 and 1 (inclusive) represented by x is mapped to
// A corresponding value between 0 and 1 (inclusive). The two values of y are to allow for
// Discontinuous mapping functions (say as might be found in a sawtooth) where y0 represents
// The value of y for values of x <= to that given, and y1 is the value to be used for x >
// Than that given). The list must start with x=0, end with x=1, and all values of x must be
// In increasing order. Values between the given mapping points are determined by simple linear
// Interpolation.
//
// The function returns an array "result" where result[x*(N-1)] gives the closest value for
// Values of x between 0 and 1.
function makeMappingArray(N, data, gamma) {
  var i = void 0;
  var x = [];
  var y0 = [];
  var y1 = [];
  var lut = [];

  gamma = gamma === null ? 1 : gamma;

  for (i = 0; i < data.length; i++) {
    var element = data[i];

    x.push((N - 1) * element[0]);
    y0.push(element[1]);
    y1.push(element[1]);
  }

  var xLinSpace = linspace(0, 1, N);

  for (i = 0; i < N; i++) {
    xLinSpace[i] = (N - 1) * Math.pow(xLinSpace[i], gamma);
  }

  var xLinSpaceIndexes = searchSorted(x, xLinSpace);

  for (i = 1; i < N - 1; i++) {
    var index = xLinSpaceIndexes[i];
    var colorPercent = (xLinSpace[i] - x[index - 1]) / (x[index] - x[index - 1]);
    var colorDelta = y0[index] - y1[index - 1];

    lut[i] = colorPercent * colorDelta + y1[index - 1];
  }

  lut[0] = y1[0];
  lut[N - 1] = y0[data.length - 1];

  return lut;
}

// Colormap based on lookup tables using linear segments.
//
// The lookup table is generated using linear interpolation for each
// Primary color, with the 0-1 domain divided into any number of
// Segments.
//
// https://github.com/stefanv/matplotlib/blob/3f1a23755e86fef97d51e30e106195f34425c9e3/lib/matplotlib/colors.py#L663
function createLinearSegmentedColormap(segmentedData, N, gamma) {
  var i = void 0;
  var lut = [];

  N = N === null ? 256 : N;
  gamma = gamma === null ? 1 : gamma;

  var redLut = makeMappingArray(N, segmentedData.red, gamma);
  var greenLut = makeMappingArray(N, segmentedData.green, gamma);
  var blueLut = makeMappingArray(N, segmentedData.blue, gamma);

  for (i = 0; i < N; i++) {
    var red = Math.round(redLut[i] * 255);
    var green = Math.round(greenLut[i] * 255);
    var blue = Math.round(blueLut[i] * 255);
    var rgba = [red, green, blue, 255];

    lut.push(rgba);
  }

  return lut;
}

/*
* Return all colormaps (id and name) available
*/
function getColormapsList() {
  var colormaps = [];
  var keys = Object.keys(colormapsData);

  keys.forEach(function (key) {
    if (colormapsData.hasOwnProperty(key)) {
      var colormap = colormapsData[key];

      colormaps.push({
        id: key,
        name: colormap.name
      });
    }
  });

  colormaps.sort(function (a, b) {
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase();

    if (aName === bName) {
      return 0;
    }

    return aName < bName ? -1 : 1;
  });

  return colormaps;
}

/**
* Convert the image of a element to a false color image
* @param id
* @param colormapData - An object that can contain a name, numColors, gama, segmentedData and/or colors
*/
function getColormap(id, colormapData) {
  var colormap = colormapsData[id];

  if (!colormap) {
    colormap = colormapsData[id] = colormapData || {
      name: '',
      colors: []
    };
  }

  if (!colormap.colors && colormap.segmentedData) {
    colormap.colors = createLinearSegmentedColormap(colormap.segmentedData, colormap.numColors, colormap.gamma);
  }

  return {
    getId: function getId() {
      return id;
    },
    getColorSchemeName: function getColorSchemeName() {
      return colormap.name;
    },
    setColorSchemeName: function setColorSchemeName(name) {
      colormap.name = name;
    },
    getNumberOfColors: function getNumberOfColors() {
      return colormap.colors.length;
    },
    setNumberOfColors: function setNumberOfColors(numColors) {
      while (colormap.colors.length < numColors) {
        colormap.colors.push(COLOR_BLACK);
      }

      colormap.colors.length = numColors;
    },
    getColor: function getColor(index) {
      if (this.isValidIndex(index)) {
        return colormap.colors[index];
      }

      return COLOR_BLACK;
    },
    getColorRepeating: function getColorRepeating(index) {
      var numColors = colormap.colors.length;

      index = numColors ? index % numColors : 0;

      return this.getColor(index);
    },
    setColor: function setColor(index, rgba) {
      if (this.isValidIndex(index)) {
        colormap.colors[index] = rgba;
      }
    },
    addColor: function addColor(rgba) {
      colormap.colors.push(rgba);
    },
    insertColor: function insertColor(index, rgba) {
      if (this.isValidIndex(index)) {
        colormap.colors.splice(index, 1, rgba);
      }
    },
    removeColor: function removeColor(index) {
      if (this.isValidIndex(index)) {
        colormap.colors.splice(index, 1);
      }
    },
    clearColors: function clearColors() {
      colormap.colors = [];
    },
    buildLookupTable: function buildLookupTable(lut) {
      if (!lut) {
        return;
      }

      var i = void 0;
      var numColors = colormap.colors.length;

      lut.setNumberOfTableValues(numColors);

      for (i = 0; i < numColors; i++) {
        lut.setTableValue(i, colormap.colors[i]);
      }
    },
    createLookupTable: function createLookupTable() {
      var lut = new cornerstone.colors.LookupTable();

      this.buildLookupTable(lut);

      return lut;
    },
    isValidIndex: function isValidIndex(index) {
      return index >= 0 && index < colormap.colors.length;
    }
  };
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LookupTable = LookupTable;

// This code was created based on vtkLookupTable
// http://www.vtk.org/doc/release/5.0/html/a01697.html
// https://github.com/Kitware/VTK/blob/master/Common/Core/vtkLookupTable.cxx
var BELOW_RANGE_COLOR_INDEX = 0;
var ABOVE_RANGE_COLOR_INDEX = 1;
var NAN_COLOR_INDEX = 2;

function LookupTable() {
  this.NumberOfColors = 256;
  this.Ramp = 'linear';
  this.TableRange = [0, 255];
  this.HueRange = [0, 0.66667];
  this.SaturationRange = [1, 1];
  this.ValueRange = [1, 1];
  this.AlphaRange = [1, 1];
  this.NaNColor = [128, 0, 0, 255];
  this.BelowRangeColor = [0, 0, 0, 255];
  this.UseBelowRangeColor = true;
  this.AboveRangeColor = [255, 255, 255, 255];
  this.UseAboveRangeColor = true;
  this.InputRange = [0, 255];
  this.Table = [];

  this.setNumberOfTableValues = function (number) {
    this.NumberOfColors = number;
  };

  this.setRamp = function (ramp) {
    this.Ramp = ramp;
  };

  this.setTableRange = function (start, end) {
    // Set/Get the minimum/maximum scalar values for scalar mapping.
    // Scalar values less than minimum range value are clamped to minimum range value.
    // Scalar values greater than maximum range value are clamped to maximum range value.
    this.TableRange[0] = start;
    this.TableRange[1] = end;
  };

  this.setHueRange = function (start, end) {
    // Set the range in hue (using automatic generation). Hue ranges between [0,1].
    this.HueRange[0] = start;
    this.HueRange[1] = end;
  };

  this.setSaturationRange = function (start, end) {
    // Set the range in saturation (using automatic generation). Saturation ranges between [0,1].
    this.SaturationRange[0] = start;
    this.SaturationRange[1] = end;
  };

  this.setValueRange = function (start, end) {
    // Set the range in value (using automatic generation). Value ranges between [0,1].
    this.ValueRange[0] = start;
    this.ValueRange[1] = end;
  };

  this.setRange = function (start, end) {
    this.InputRange[0] = start;
    this.InputRange[1] = end;
  };

  this.setAlphaRange = function (start, end) {
    // Set the range in alpha (using automatic generation). Alpha ranges from [0,1].
    this.AlphaRange[0] = start;
    this.AlphaRange[1] = end;
  };

  this.getColor = function (scalar) {
    // Map one value through the lookup table and return the color as an
    // RGB array of doubles between 0 and 1.

    return this.mapValue(scalar);
  };

  this.HSVToRGB = function (hue, sat, val) {
    if (hue > 1) {
      throw 'HSVToRGB expects hue < 1';
    }

    var rgb = [];

    if (sat === 0) {
      rgb[0] = val;
      rgb[1] = val;
      rgb[2] = val;

      return rgb;
    }

    var hueCase = Math.floor(hue * 6);
    var frac = 6 * hue - hueCase;
    var lx = val * (1 - sat);
    var ly = val * (1 - sat * frac);
    var lz = val * (1 - sat * (1 - frac));

    switch (hueCase) {

      /* 0<hue<1/6 */
      case 0:
      case 6:
        rgb[0] = val;
        rgb[1] = lz;
        rgb[2] = lx;
        break;

      /* 1/6<hue<2/6 */
      case 1:
        rgb[0] = ly;
        rgb[1] = val;
        rgb[2] = lx;
        break;

      /* 2/6<hue<3/6 */
      case 2:
        rgb[0] = lx;
        rgb[1] = val;
        rgb[2] = lz;
        break;

      /* 3/6<hue/4/6 */
      case 3:
        rgb[0] = lx;
        rgb[1] = ly;
        rgb[2] = val;
        break;

      /* 4/6<hue<5/6 */
      case 4:
        rgb[0] = lz;
        rgb[1] = lx;
        rgb[2] = val;
        break;

      /* 5/6<hue<1 */
      case 5:
        rgb[0] = val;
        rgb[1] = lx;
        rgb[2] = ly;
        break;
    }

    return rgb;
  };

  this.build = function (force) {
    if (this.Table.length > 1 && !force) {
      return;
    }

    // Clear the table
    this.Table = [];

    var maxIndex = this.NumberOfColors - 1;

    var hinc = void 0,
        sinc = void 0,
        vinc = void 0,
        ainc = void 0;

    if (maxIndex) {
      hinc = (this.HueRange[1] - this.HueRange[0]) / maxIndex;
      sinc = (this.SaturationRange[1] - this.SaturationRange[0]) / maxIndex;
      vinc = (this.ValueRange[1] - this.ValueRange[0]) / maxIndex;
      ainc = (this.AlphaRange[1] - this.AlphaRange[0]) / maxIndex;
    } else {
      hinc = sinc = vinc = ainc = 0.0;
    }

    for (var i = 0; i <= maxIndex; i++) {
      var hue = this.HueRange[0] + i * hinc;
      var sat = this.SaturationRange[0] + i * sinc;
      var val = this.ValueRange[0] + i * vinc;
      var alpha = this.AlphaRange[0] + i * ainc;

      var rgb = this.HSVToRGB(hue, sat, val);
      var c_rgba = [];

      switch (this.Ramp) {
        case 'scurve':
          c_rgba[0] = Math.floor(127.5 * (1.0 + Math.cos((1.0 - rgb[0]) * Math.PI)));
          c_rgba[1] = Math.floor(127.5 * (1.0 + Math.cos((1.0 - rgb[1]) * Math.PI)));
          c_rgba[2] = Math.floor(127.5 * (1.0 + Math.cos((1.0 - rgb[2]) * Math.PI)));
          c_rgba[3] = Math.floor(alpha * 255);
          break;
        case 'linear':
          c_rgba[0] = Math.floor(rgb[0] * 255 + 0.5);
          c_rgba[1] = Math.floor(rgb[1] * 255 + 0.5);
          c_rgba[2] = Math.floor(rgb[2] * 255 + 0.5);
          c_rgba[3] = Math.floor(alpha * 255 + 0.5);
          break;
        case 'sqrt':
          c_rgba[0] = Math.floor(Math.sqrt(rgb[0]) * 255 + 0.5);
          c_rgba[1] = Math.floor(Math.sqrt(rgb[1]) * 255 + 0.5);
          c_rgba[2] = Math.floor(Math.sqrt(rgb[2]) * 255 + 0.5);
          c_rgba[3] = Math.floor(Math.sqrt(alpha) * 255 + 0.5);
          break;
        default:
          throw new Error('Invalid Ramp value (' + this.Ramp + ')');
      }

      this.Table.push(c_rgba);
    }

    this.buildSpecialColors();
  };

  this.buildSpecialColors = function () {
    var numberOfColors = this.NumberOfColors;
    var belowRangeColorIndex = numberOfColors + BELOW_RANGE_COLOR_INDEX;
    var aboveRangeColorIndex = numberOfColors + ABOVE_RANGE_COLOR_INDEX;
    var nanColorIndex = numberOfColors + NAN_COLOR_INDEX;

    // Below range color
    if (this.UseBelowRangeColor || numberOfColors === 0) {
      this.Table[belowRangeColorIndex] = this.BelowRangeColor;
    } else {
      // Duplicate the first color in the table.
      this.Table[belowRangeColorIndex] = this.Table[0];
    }

    // Above range color
    if (this.UseAboveRangeColor || numberOfColors === 0) {
      this.Table[aboveRangeColorIndex] = this.AboveRangeColor;
    } else {
      // Duplicate the last color in the table.
      this.Table[aboveRangeColorIndex] = this.Table[numberOfColors - 1];
    }

    // Always use NanColor
    this.Table[nanColorIndex] = this.NaNColor;
  };

  // Given a scalar value v, return an rgba color value from lookup table.
  this.mapValue = function (v) {
    var index = this.getIndex(v);

    if (index < 0) {
      return this.NaNColor;
    } else if (index === 0) {
      if (this.UseBelowRangeColor && v < this.TableRange[0]) {
        return this.BelowRangeColor;
      }
    } else if (index === this.NumberOfColors - 1) {
      if (this.UseAboveRangeColor && v > this.TableRange[1]) {
        return this.AboveRangeColor;
      }
    }

    return this.Table[index];
  };

  this.linearIndexLookupMain = function (v, p) {
    var dIndex = void 0;

    // NOTE: Added Math.floor since values were not integers? Check VTK source
    if (v < p.Range[0]) {
      dIndex = p.MaxIndex + BELOW_RANGE_COLOR_INDEX + 1.5;
    } else if (v > p.Range[1]) {
      dIndex = p.MaxIndex + ABOVE_RANGE_COLOR_INDEX + 1.5;
    } else {
      dIndex = (v + p.Shift) * p.Scale;
    }

    return Math.round(dIndex);
  };

  this.getIndex = function (v) {
    var p = {};

    p.Range = [];
    p.MaxIndex = this.NumberOfColors - 1;

    // This was LookupShiftAndScale
    p.Shift = -this.TableRange[0];
    if (this.TableRange[1] <= this.TableRange[0]) {
      p.Scale = Number.MAX_VALUE;
    } else {
      p.Scale = p.MaxIndex / (this.TableRange[1] - this.TableRange[0]);
    }

    p.Range[0] = this.TableRange[0];
    p.Range[1] = this.TableRange[1];

    // First, check whether we have a number...
    if (isNaN(v)) {
      // For backwards compatibility
      return -1;
    }

    // Map to an index:
    var index = this.linearIndexLookupMain(v, p);

    // For backwards compatibility, if the index indicates an
    // Out-of-range value, truncate to index range for in-range colors.
    if (index === this.NumberOfColors + BELOW_RANGE_COLOR_INDEX) {
      index = 0;
    } else if (index === this.NumberOfColors + ABOVE_RANGE_COLOR_INDEX) {
      index = this.NumberOfColors - 1;
    }

    return index;
  };

  this.setTableValue = function (index, rgba) {
    // Check if it index, red, green, blue and alpha were passed as parameter
    if (arguments.length === 5) {
      rgba = Array.prototype.slice.call(arguments, 1);
    }

    // Check the index to make sure it is valid
    if (index < 0) {
      throw new Error('Can\'t set the table value for negative index (' + index + ')');
    }

    if (index >= this.NumberOfColors) {
      new Error('Index ' + index + ' is greater than the number of colors ' + this.NumberOfColors);
    }

    this.Table[index] = rgba;

    if (index === 0 || index === this.NumberOfColors - 1) {
      // This is needed due to the way the special colors are stored in
      // The internal table. If Above/BelowRangeColors are not used and
      // The min/max colors are changed in the table with this member
      // Function, then the colors used for values outside the range may
      // Be incorrect. Calling this here ensures the out-of-range colors
      // Are set correctly.
      this.buildSpecialColors();
    }
  };
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _drawImage = __webpack_require__(2);

Object.defineProperty(exports, 'drawImage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawImage).default;
  }
});

var _generateLut = __webpack_require__(4);

Object.defineProperty(exports, 'generateLut', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_generateLut).default;
  }
});

var _generateLutNew = __webpack_require__(8);

Object.defineProperty(exports, 'generateLutNew', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_generateLutNew).default;
  }
});

var _getDefaultViewport = __webpack_require__(3);

Object.defineProperty(exports, 'getDefaultViewport', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getDefaultViewport).default;
  }
});

var _requestAnimationFrame = __webpack_require__(9);

Object.defineProperty(exports, 'requestAnimationFrame', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_requestAnimationFrame).default;
  }
});

var _storedPixelDataToCanvasImageData = __webpack_require__(11);

Object.defineProperty(exports, 'storedPixelDataToCanvasImageData', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_storedPixelDataToCanvasImageData).default;
  }
});

var _storedColorPixelDataToCanvasImageData = __webpack_require__(10);

Object.defineProperty(exports, 'storedColorPixelDataToCanvasImageData', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_storedColorPixelDataToCanvasImageData).default;
  }
});

var _index = __webpack_require__(38);

Object.defineProperty(exports, 'internal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _renderColorImage = __webpack_require__(5);

Object.defineProperty(exports, 'renderColorImage', {
  enumerable: true,
  get: function get() {
    return _renderColorImage.renderColorImage;
  }
});

var _renderGrayscaleImage = __webpack_require__(12);

Object.defineProperty(exports, 'renderGrayscaleImage', {
  enumerable: true,
  get: function get() {
    return _renderGrayscaleImage.renderGrayscaleImage;
  }
});

var _renderWebImage = __webpack_require__(18);

Object.defineProperty(exports, 'renderWebImage', {
  enumerable: true,
  get: function get() {
    return _renderWebImage.renderWebImage;
  }
});

var _canvasToPixel = __webpack_require__(25);

Object.defineProperty(exports, 'canvasToPixel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_canvasToPixel).default;
  }
});

var _disable = __webpack_require__(26);

Object.defineProperty(exports, 'disable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_disable).default;
  }
});

var _displayImage = __webpack_require__(27);

Object.defineProperty(exports, 'displayImage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_displayImage).default;
  }
});

var _draw = __webpack_require__(28);

Object.defineProperty(exports, 'draw', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_draw).default;
  }
});

var _drawInvalidated = __webpack_require__(29);

Object.defineProperty(exports, 'drawInvalidated', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawInvalidated).default;
  }
});

var _enable = __webpack_require__(30);

Object.defineProperty(exports, 'enable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_enable).default;
  }
});

var _enabledElementData = __webpack_require__(31);

Object.defineProperty(exports, 'getElementData', {
  enumerable: true,
  get: function get() {
    return _enabledElementData.getElementData;
  }
});
Object.defineProperty(exports, 'removeElementData', {
  enumerable: true,
  get: function get() {
    return _enabledElementData.removeElementData;
  }
});

var _enabledElements = __webpack_require__(0);

Object.defineProperty(exports, 'getEnabledElement', {
  enumerable: true,
  get: function get() {
    return _enabledElements.getEnabledElement;
  }
});
Object.defineProperty(exports, 'addEnabledElement', {
  enumerable: true,
  get: function get() {
    return _enabledElements.addEnabledElement;
  }
});
Object.defineProperty(exports, 'getEnabledElementsByImageId', {
  enumerable: true,
  get: function get() {
    return _enabledElements.getEnabledElementsByImageId;
  }
});
Object.defineProperty(exports, 'getEnabledElements', {
  enumerable: true,
  get: function get() {
    return _enabledElements.getEnabledElements;
  }
});

var _fitToWindow = __webpack_require__(15);

Object.defineProperty(exports, 'fitToWindow', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fitToWindow).default;
  }
});

var _getDefaultViewportForImage = __webpack_require__(33);

Object.defineProperty(exports, 'getDefaultViewportForImage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getDefaultViewportForImage).default;
  }
});

var _getImage = __webpack_require__(34);

Object.defineProperty(exports, 'getImage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getImage).default;
  }
});

var _getPixels = __webpack_require__(35);

Object.defineProperty(exports, 'getPixels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getPixels).default;
  }
});

var _getStoredPixels = __webpack_require__(16);

Object.defineProperty(exports, 'getStoredPixels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getStoredPixels).default;
  }
});

var _getViewport = __webpack_require__(36);

Object.defineProperty(exports, 'getViewport', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getViewport).default;
  }
});

var _imageLoader = __webpack_require__(37);

Object.defineProperty(exports, 'loadImage', {
  enumerable: true,
  get: function get() {
    return _imageLoader.loadImage;
  }
});
Object.defineProperty(exports, 'loadAndCacheImage', {
  enumerable: true,
  get: function get() {
    return _imageLoader.loadAndCacheImage;
  }
});
Object.defineProperty(exports, 'registerImageLoader', {
  enumerable: true,
  get: function get() {
    return _imageLoader.registerImageLoader;
  }
});
Object.defineProperty(exports, 'registerUnknownImageLoader', {
  enumerable: true,
  get: function get() {
    return _imageLoader.registerUnknownImageLoader;
  }
});

var _invalidate = __webpack_require__(39);

Object.defineProperty(exports, 'invalidate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_invalidate).default;
  }
});

var _invalidateImageId = __webpack_require__(40);

Object.defineProperty(exports, 'invalidateImageId', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_invalidateImageId).default;
  }
});

var _pageToPixel = __webpack_require__(42);

Object.defineProperty(exports, 'pageToPixel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pageToPixel).default;
  }
});

var _pixelToCanvas = __webpack_require__(44);

Object.defineProperty(exports, 'pixelToCanvas', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pixelToCanvas).default;
  }
});

var _reset = __webpack_require__(46);

Object.defineProperty(exports, 'reset', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reset).default;
  }
});

var _resize = __webpack_require__(19);

Object.defineProperty(exports, 'resize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_resize).default;
  }
});

var _setToPixelCoordinateSystem = __webpack_require__(6);

Object.defineProperty(exports, 'setToPixelCoordinateSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_setToPixelCoordinateSystem).default;
  }
});

var _setViewport = __webpack_require__(47);

Object.defineProperty(exports, 'setViewport', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_setViewport).default;
  }
});

var _updateImage = __webpack_require__(1);

Object.defineProperty(exports, 'updateImage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_updateImage).default;
  }
});

var _pixelDataToFalseColorData = __webpack_require__(43);

Object.defineProperty(exports, 'pixelDataToFalseColorData', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pixelDataToFalseColorData).default;
  }
});

var _index2 = __webpack_require__(45);

Object.defineProperty(exports, 'rendering', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index2).default;
  }
});

var _imageCache = __webpack_require__(17);

Object.defineProperty(exports, 'imageCache', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_imageCache).default;
  }
});

var _metaData = __webpack_require__(41);

Object.defineProperty(exports, 'metaData', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_metaData).default;
  }
});

var _index3 = __webpack_require__(20);

Object.defineProperty(exports, 'webGL', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index3).default;
  }
});

var _index4 = __webpack_require__(14);

Object.defineProperty(exports, 'colors', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index4).default;
  }
});

var _falseColorMapping = __webpack_require__(32);

Object.defineProperty(exports, 'convertImageToFalseColorImage', {
  enumerable: true,
  get: function get() {
    return _falseColorMapping.convertImageToFalseColorImage;
  }
});
Object.defineProperty(exports, 'convertToFalseColorImage', {
  enumerable: true,
  get: function get() {
    return _falseColorMapping.convertToFalseColorImage;
  }
});
Object.defineProperty(exports, 'restoreImage', {
  enumerable: true,
  get: function get() {
    return _falseColorMapping.restoreImage;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (windowWidth, windowCenter, voiLUT) {
  if (voiLUT) {
    return generateNonLinearVOILUT(voiLUT);
  }

  return generateLinearVOILUT(windowWidth, windowCenter);
};

/* eslint no-bitwise: 0 */

/**
 * This module generates a VOI LUT
 */

function generateLinearVOILUT(windowWidth, windowCenter) {
  return function (modalityLutValue) {
    return ((modalityLutValue - windowCenter) / windowWidth + 0.5) * 255.0;
  };
}

function generateNonLinearVOILUT(voiLUT) {
  var shift = voiLUT.numBitsPerEntry - 8;
  var minValue = voiLUT.lut[0] >> shift;
  var maxValue = voiLUT.lut[voiLUT.lut.length - 1] >> shift;
  var maxValueMapped = voiLUT.firstValueMapped + voiLUT.lut.length - 1;

  return function (modalityLutValue) {
    if (modalityLutValue < voiLUT.firstValueMapped) {
      return minValue;
    } else if (modalityLutValue >= maxValueMapped) {
      return maxValue;
    }

    return voiLUT.lut[modalityLutValue - voiLUT.firstValueMapped] >> shift;
  };
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transform = Transform;
// Last updated November 2011
// By Simon Sarris
// Www.simonsarris.com
// Sarris@acm.org
//
// Free to use and distribute at will
// So long as you are nice to people, etc

// Simple class for keeping track of the current transformation matrix

// For instance:
//    Var t = new Transform();
//    T.rotate(5);
//    Var m = t.m;
//    Ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);

// Is equivalent to:
//    Ctx.rotate(5);

// But now you can retrieve it :)


// Remember that this does not account for any CSS transforms applied to the canvas
function Transform() {
  this.reset();
}

Transform.prototype.reset = function () {
  this.m = [1, 0, 0, 1, 0, 0];
};

Transform.prototype.clone = function () {
  var transform = new Transform();

  transform.m[0] = this.m[0];
  transform.m[1] = this.m[1];
  transform.m[2] = this.m[2];
  transform.m[3] = this.m[3];
  transform.m[4] = this.m[4];
  transform.m[5] = this.m[5];

  return transform;
};

Transform.prototype.multiply = function (matrix) {
  var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
  var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

  var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
  var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

  var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
  var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

  this.m[0] = m11;
  this.m[1] = m12;
  this.m[2] = m21;
  this.m[3] = m22;
  this.m[4] = dx;
  this.m[5] = dy;
};

Transform.prototype.invert = function () {
  var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
  var m0 = this.m[3] * d;
  var m1 = -this.m[1] * d;
  var m2 = -this.m[2] * d;
  var m3 = this.m[0] * d;
  var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
  var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);

  this.m[0] = m0;
  this.m[1] = m1;
  this.m[2] = m2;
  this.m[3] = m3;
  this.m[4] = m4;
  this.m[5] = m5;
};

Transform.prototype.rotate = function (rad) {
  var c = Math.cos(rad);
  var s = Math.sin(rad);
  var m11 = this.m[0] * c + this.m[2] * s;
  var m12 = this.m[1] * c + this.m[3] * s;
  var m21 = this.m[0] * -s + this.m[2] * c;
  var m22 = this.m[1] * -s + this.m[3] * c;

  this.m[0] = m11;
  this.m[1] = m12;
  this.m[2] = m21;
  this.m[3] = m22;
};

Transform.prototype.translate = function (x, y) {
  this.m[4] += this.m[0] * x + this.m[2] * y;
  this.m[5] += this.m[1] * x + this.m[3] * y;
};

Transform.prototype.scale = function (sx, sy) {
  this.m[0] *= sx;
  this.m[1] *= sx;
  this.m[2] *= sy;
  this.m[3] *= sy;
};

Transform.prototype.transformPoint = function (px, py) {
  var x = px;
  var y = py;

  px = x * this.m[0] + y * this.m[2] + this.m[4];
  py = x * this.m[1] + y * this.m[3] + this.m[5];

  return { x: px,
    y: py };
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWebGLInitialized = undefined;
exports.getRenderCanvas = getRenderCanvas;
exports.initRenderer = initRenderer;
exports.render = render;
exports.isWebGLAvailable = isWebGLAvailable;

var _index = __webpack_require__(54);

var _vertexShader = __webpack_require__(60);

var _textureCache = __webpack_require__(24);

var _textureCache2 = _interopRequireDefault(_textureCache);

var _createProgramFromString = __webpack_require__(23);

var _createProgramFromString2 = _interopRequireDefault(_createProgramFromString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-bitwise: 0 */

var renderCanvas = document.createElement('canvas');
var gl = void 0;
var texCoordBuffer = void 0;
var positionBuffer = void 0;
var isWebGLInitialized = false;

exports.isWebGLInitialized = isWebGLInitialized;
function getRenderCanvas() {
  return renderCanvas;
}

function initShaders() {
  for (var id in _index.shaders) {
    // Console.log("WEBGL: Loading shader", id);
    var shader = _index.shaders[id];

    shader.attributes = {};
    shader.uniforms = {};
    shader.vert = _vertexShader.vertexShader;

    shader.program = (0, _createProgramFromString2.default)(gl, shader.vert, shader.frag);

    shader.attributes.texCoordLocation = gl.getAttribLocation(shader.program, 'a_texCoord');
    gl.enableVertexAttribArray(shader.attributes.texCoordLocation);

    shader.attributes.positionLocation = gl.getAttribLocation(shader.program, 'a_position');
    gl.enableVertexAttribArray(shader.attributes.positionLocation);

    shader.uniforms.resolutionLocation = gl.getUniformLocation(shader.program, 'u_resolution');
  }
}

function initRenderer() {
  if (isWebGLInitialized === true) {
    // Console.log("WEBGL Renderer already initialized");
    return;
  }

  if (initWebGL(renderCanvas)) {
    initBuffers();
    initShaders();
    // Console.log("WEBGL Renderer initialized!");
    exports.isWebGLInitialized = isWebGLInitialized = true;
  }
}

function updateRectangle(gl, width, height) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([width, height, 0, height, width, 0, 0, 0]), gl.STATIC_DRAW);
}

function handleLostContext(event) {
  event.preventDefault();
  console.warn('WebGL Context Lost!');
}

function handleRestoredContext(event) {
  event.preventDefault();
  exports.isWebGLInitialized = isWebGLInitialized = false;
  _textureCache2.default.purgeCache();
  initRenderer();
  // Console.log('WebGL Context Restored.');
}

function initWebGL(canvas) {

  gl = null;
  try {
    // Try to grab the standard context. If it fails, fallback to experimental.
    var options = {
      preserveDrawingBuffer: true // Preserve buffer so we can copy to display canvas element
    };

    // ---------------- Testing purposes -------------
    // If (debug === true && WebGLDebugUtils) {
    //    RenderCanvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(renderCanvas);
    // }
    // ---------------- Testing purposes -------------

    gl = canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options);

    // Set up event listeners for context lost / context restored
    canvas.removeEventListener('webglcontextlost', handleLostContext, false);
    canvas.addEventListener('webglcontextlost', handleLostContext, false);

    canvas.removeEventListener('webglcontextrestored', handleRestoredContext, false);
    canvas.addEventListener('webglcontextrestored', handleRestoredContext, false);
  } catch (error) {
    throw 'Error creating WebGL context';
  }

  // If we don't have a GL context, give up now
  if (!gl) {
    console.error('Unable to initialize WebGL. Your browser may not support it.');
    gl = null;
  }

  return gl;
}

function getImageDataType(image) {
  if (image.color) {
    return 'rgb';
  }

  var datatype = 'int';

  if (image.minPixelValue >= 0) {
    datatype = 'u' + datatype;
  }

  if (image.maxPixelValue > 255) {
    datatype += '16';
  } else {
    datatype += '8';
  }

  return datatype;
}

function getShaderProgram(image) {

  var datatype = getImageDataType(image);
  // We need a mechanism for
  // Choosing the shader based on the image datatype
  // Console.log("Datatype: " + datatype);

  if (_index.shaders.hasOwnProperty(datatype)) {
    return _index.shaders[datatype];
  }

  return _index.shaders.rgb;
}

function generateTexture(image) {
  var TEXTURE_FORMAT = {
    uint8: gl.LUMINANCE,
    int8: gl.LUMINANCE_ALPHA,
    uint16: gl.LUMINANCE_ALPHA,
    int16: gl.RGB,
    rgb: gl.RGB
  };

  var TEXTURE_BYTES = {
    int8: 1, // Luminance
    uint16: 2, // Luminance + Alpha
    int16: 3, // RGB
    rgb: 3 // RGB
  };

  var imageDataType = getImageDataType(image);
  var format = TEXTURE_FORMAT[imageDataType];

  // GL texture configuration
  var texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

  var imageData = _index.dataUtilities[imageDataType].storedPixelDataToImageData(image, image.width, image.height);

  gl.texImage2D(gl.TEXTURE_2D, 0, format, image.width, image.height, 0, format, gl.UNSIGNED_BYTE, imageData);

  // Calculate the size in bytes of this image in memory
  var sizeInBytes = image.width * image.height * TEXTURE_BYTES[imageDataType];
  var imageTexture = {
    texture: texture,
    sizeInBytes: sizeInBytes
  };

  return imageTexture;
}

function getImageTexture(image) {
  var imageTexture = _textureCache2.default.getImageTexture(image.imageId);

  if (!imageTexture) {
    // Console.log("Generating texture for imageid: ", image.imageId);
    imageTexture = generateTexture(image);
    _textureCache2.default.putImageTexture(image, imageTexture);
  }

  return imageTexture.texture;
}

function initBuffers() {
  positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, 0, 1, 1, 0, 0, 0]), gl.STATIC_DRAW);

  texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0]), gl.STATIC_DRAW);
}

function renderQuad(shader, parameters, texture, width, height) {
  gl.clearColor(1.0, 0.0, 0.0, 1.0);
  gl.viewport(0, 0, width, height);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(shader.program);

  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.vertexAttribPointer(shader.attributes.texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(shader.attributes.positionLocation, 2, gl.FLOAT, false, 0, 0);

  for (var key in parameters) {
    var uniformLocation = gl.getUniformLocation(shader.program, key);

    if (!uniformLocation) {
      continue;

      // Disabling this error for now since RGB requires minPixelValue
      // but the other shaders do not.
      // throw `Could not access location for uniform: ${key}`;
    }

    var uniform = parameters[key];

    var type = uniform.type;
    var value = uniform.value;

    if (type === 'i') {
      gl.uniform1i(uniformLocation, value);
    } else if (type === 'f') {
      gl.uniform1f(uniformLocation, value);
    } else if (type === '2f') {
      gl.uniform2f(uniformLocation, value[0], value[1]);
    }
  }

  updateRectangle(gl, width, height);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function render(enabledElement) {
  // Resize the canvas
  var image = enabledElement.image;

  renderCanvas.width = image.width;
  renderCanvas.height = image.height;

  var viewport = enabledElement.viewport;

  // Render the current image
  var shader = getShaderProgram(image);
  var texture = getImageTexture(image);
  var parameters = {
    u_resolution: { type: '2f',
      value: [image.width, image.height] },
    wc: { type: 'f',
      value: viewport.voi.windowCenter },
    ww: { type: 'f',
      value: viewport.voi.windowWidth },
    slope: { type: 'f',
      value: image.slope },
    intercept: { type: 'f',
      value: image.intercept },
    minPixelValue: { type: 'f',
      value: image.minPixelValue },
    invert: { type: 'i',
      value: viewport.invert ? 1 : 0 }
  };

  renderQuad(shader, parameters, texture, image.width, image.height);

  return renderCanvas;
}

function isWebGLAvailable() {
  // Adapted from
  // http://stackoverflow.com/questions/9899807/three-js-detect-webgl-support-and-fallback-to-regular-canvas

  var options = {
    failIfMajorPerformanceCaveat: true
  };

  try {
    var canvas = document.createElement('canvas');

    return Boolean(window.WebGLRenderingContext) && (canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options));
  } catch (e) {
    return false;
  }
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataUtilities = exports.shaders = undefined;

var _int = __webpack_require__(55);

var _int2 = __webpack_require__(56);

var _rgb = __webpack_require__(57);

var _uint = __webpack_require__(58);

var _uint2 = __webpack_require__(59);

var shaders = {
  int16: _int.int16Shader,
  int8: _int2.int8Shader,
  rgb: _rgb.rgbShader,
  uint16: _uint.uint16Shader,
  uint8: _uint2.uint8Shader
};

var dataUtilities = {
  int16: _int.int16DataUtilities,
  int8: _int2.int8DataUtilities,
  rgb: _rgb.rgbDataUtilities,
  uint16: _uint.uint16DataUtilities,
  uint8: _uint2.uint8DataUtilities
};

exports.shaders = shaders;
exports.dataUtilities = dataUtilities;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint no-bitwise: 0 */

// Pack int16 into three uint8 channels (r, g, b)
var int16Shader = {};

function storedPixelDataToImageData(image) {

    // Transfer image data to alpha and luminance channels of WebGL texture
    // Credit to @jpambrun and @fernandojsg

    // Pack int16 into three uint8 channels (r, g, b)
    var pixelData = image.getPixelData();
    var numberOfChannels = 3;
    var data = new Uint8Array(image.width * image.height * numberOfChannels);
    var offset = 0;

    for (var i = 0; i < pixelData.length; i++) {
        var val = Math.abs(pixelData[i]);

        data[offset++] = parseInt(val & 0xFF, 10);
        data[offset++] = parseInt(val >> 8, 10);
        data[offset++] = pixelData[i] < 0 ? 0 : 1; // 0 For negative, 1 for positive
    }

    return data;
}

var int16DataUtilities = exports.int16DataUtilities = {
    storedPixelDataToImageData: storedPixelDataToImageData
};

int16Shader.frag = 'precision mediump float;' + 'uniform sampler2D u_image;' + 'uniform float ww;' + 'uniform float wc;' + 'uniform float slope;' + 'uniform float intercept;' + 'uniform int invert;' + 'varying vec2 v_texCoord;' + 'void main() {' +
// Get texture
'vec4 color = texture2D(u_image, v_texCoord);' +

// Calculate luminance from packed texture
'float intensity = color.r*256.0 + color.g*65536.0;' + 'if (color.b == 0.0)' + 'intensity = -intensity;' +

// Rescale based on slope and window settings
'intensity = intensity * slope + intercept;' + 'float center0 = wc - 0.5;' + 'float width0 = max(ww, 1.0);' + 'intensity = (intensity - center0) / width0 + 0.5;' +

// Clamp intensity
'intensity = clamp(intensity, 0.0, 1.0);' +

// RGBA output
'gl_FragColor = vec4(intensity, intensity, intensity, 1.0);' +

// Apply any inversion necessary
'if (invert == 1)' + 'gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;' + '}';

exports.int16Shader = int16Shader;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var int8Shader = {};

function storedPixelDataToImageData(image) {
    // Transfer image data to alpha channel of WebGL texture
    // Store data in Uint8Array
    var pixelData = image.getPixelData();
    var numberOfChannels = 2;
    var data = new Uint8Array(image.width * image.height * numberOfChannels);
    var offset = 0;

    for (var i = 0; i < pixelData.length; i++) {
        data[offset++] = parseInt(pixelData[i], 10);
        data[offset++] = pixelData[i] < 0 ? 0 : 1; // 0 For negative, 1 for positive
    }

    return data;
}

var int8DataUtilities = exports.int8DataUtilities = {
    storedPixelDataToImageData: storedPixelDataToImageData
};

int8Shader.frag = 'precision mediump float;' + 'uniform sampler2D u_image;' + 'uniform float ww;' + 'uniform float wc;' + 'uniform float slope;' + 'uniform float intercept;' + 'uniform int invert;' + 'varying vec2 v_texCoord;' + 'void main() {' +
// Get texture
'vec4 color = texture2D(u_image, v_texCoord);' +

// Calculate luminance from packed texture
'float intensity = color.r*256.;' + 'if (color.a == 0.0)' + 'intensity = -intensity;' +

// Rescale based on slope and window settings
'intensity = intensity * slope + intercept;' + 'float center0 = wc - 0.5;' + 'float width0 = max(ww, 1.0);' + 'intensity = (intensity - center0) / width0 + 0.5;' +

// Clamp intensity
'intensity = clamp(intensity, 0.0, 1.0);' +

// RGBA output
'gl_FragColor = vec4(intensity, intensity, intensity, 1.0);' +

// Apply any inversion necessary
'if (invert == 1)' + 'gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;' + '}';

exports.int8Shader = int8Shader;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Pack RGB images into a 3-channel RGB texture
var rgbShader = {};

function storedPixelDataToImageData(image) {
  var minPixelValue = image.minPixelValue;
  var canvasImageDataIndex = 0;
  var storedPixelDataIndex = 0;
  // Only 3 channels, since we use WebGL's RGB texture format
  var numStoredPixels = image.width * image.height * 4;
  var numOutputPixels = image.width * image.height * 3;
  var storedPixelData = image.getPixelData();
  var data = new Uint8Array(numOutputPixels);

  // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
  // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement
  if (minPixelValue < 0) {
    while (storedPixelDataIndex < numStoredPixels) {
      data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++] + -minPixelValue; // Red
      data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++] + -minPixelValue; // Green
      data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++] + -minPixelValue; // Blue
      storedPixelDataIndex += 1; // The stored pixel data has 4 channels
    }
  } else {
    while (storedPixelDataIndex < numStoredPixels) {
      data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++]; // Red
      data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++]; // Green
      data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++]; // Blue
      storedPixelDataIndex += 1; // The stored pixel data has 4 channels
    }
  }

  return data;
}

var rgbDataUtilities = exports.rgbDataUtilities = {
  storedPixelDataToImageData: storedPixelDataToImageData
};

rgbShader.frag = 'precision mediump float;' + 'uniform sampler2D u_image;' + 'uniform float ww;' + 'uniform float wc;' + 'uniform float slope;' + 'uniform float intercept;' + 'uniform float minPixelValue;' + 'uniform int invert;' + 'varying vec2 v_texCoord;' + 'void main() {' +

// Get texture
'vec3 color = texture2D(u_image, v_texCoord).xyz;' +

// Rescale based on slope and intercept
'color = color * 256.0 * slope + intercept;' +

// Apply window settings
'float center0 = wc - 0.5 - minPixelValue;' + 'float width0 = max(ww, 1.0);' + 'color = (color - center0) / width0 + 0.5;' +

// RGBA output
'gl_FragColor = vec4(color, 1);' +

// Apply any inversion necessary
'if (invert == 1)' + 'gl_FragColor.rgb = 1. - gl_FragColor.rgb;' + '}';

exports.rgbShader = rgbShader;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint no-bitwise: 0 */

// For uint16 pack uint16 into two uint8 channels (r and a)
var uint16Shader = {};

function storedPixelDataToImageData(image) {

    // Transfer image data to alpha and luminance channels of WebGL texture
    // Credit to @jpambrun and @fernandojsg

    // Pack uint16 into two uint8 channels (r and a)
    var pixelData = image.getPixelData();
    var numberOfChannels = 2;
    var data = new Uint8Array(image.width * image.height * numberOfChannels);
    var offset = 0;

    for (var i = 0; i < pixelData.length; i++) {
        var val = pixelData[i];

        data[offset++] = parseInt(val & 0xFF, 10);
        data[offset++] = parseInt(val >> 8, 10);
    }

    return data;
}

var uint16DataUtilities = exports.uint16DataUtilities = {
    storedPixelDataToImageData: storedPixelDataToImageData
};

uint16Shader.frag = 'precision mediump float;' + 'uniform sampler2D u_image;' + 'uniform float ww;' + 'uniform float wc;' + 'uniform float slope;' + 'uniform float intercept;' + 'uniform int invert;' + 'varying vec2 v_texCoord;' + 'void main() {' +
// Get texture
'vec4 color = texture2D(u_image, v_texCoord);' +

// Calculate luminance from packed texture
'float intensity = color.r*256.0 + color.a*65536.0;' +

// Rescale based on slope and window settings
'intensity = intensity * slope + intercept;' + 'float center0 = wc - 0.5;' + 'float width0 = max(ww, 1.0);' + 'intensity = (intensity - center0) / width0 + 0.5;' +

// Clamp intensity
'intensity = clamp(intensity, 0.0, 1.0);' +

// RGBA output
'gl_FragColor = vec4(intensity, intensity, intensity, 1.0);' +

// Apply any inversion necessary
'if (invert == 1)' + 'gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;' + '}';

exports.uint16Shader = uint16Shader;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var uint8Shader = {};

function storedPixelDataToImageData(image) {
    // Transfer image data to alpha channel of WebGL texture
    // Store data in Uuint8Array
    var pixelData = image.getPixelData();
    var data = new Uint8Array(pixelData.length);

    for (var i = 0; i < pixelData.length; i++) {
        data[i] = parseInt(pixelData[i], 10);
    }

    return data;
}

var uint8DataUtilities = exports.uint8DataUtilities = {
    storedPixelDataToImageData: storedPixelDataToImageData
};

uint8Shader.frag = 'precision mediump float;' + 'uniform sampler2D u_image;' + 'uniform float ww;' + 'uniform float wc;' + 'uniform float slope;' + 'uniform float intercept;' + 'uniform int invert;' + 'varying vec2 v_texCoord;' + 'void main() {' +
// Get texture
'vec4 color = texture2D(u_image, v_texCoord);' +

// Calculate luminance from packed texture
'float intensity = color.r*256.0;' +

// Rescale based on slope and window settings
'intensity = intensity * slope + intercept;' + 'float center0 = wc - 0.5;' + 'float width0 = max(ww, 1.0);' + 'intensity = (intensity - center0) / width0 + 0.5;' +

// Clamp intensity
'intensity = clamp(intensity, 0.0, 1.0);' +

// RGBA output
'gl_FragColor = vec4(intensity, intensity, intensity, 1.0);' +

// Apply any inversion necessary
'if (invert == 1)' + 'gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;' + '}';

exports.uint8Shader = uint8Shader;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var vertexShader = exports.vertexShader = 'attribute vec2 a_position;' + 'attribute vec2 a_texCoord;' + 'uniform vec2 u_resolution;' + 'varying vec2 v_texCoord;' + 'void main() {' + 'vec2 zeroToOne = a_position / u_resolution;' + 'vec2 zeroToTwo = zeroToOne * 2.0;' + 'vec2 clipSpace = zeroToTwo - 1.0;' + 'gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);' + 'v_texCoord = a_texCoord;' + '}';

/***/ })
/******/ ]);
//# sourceMappingURL=cornerstone.js.map