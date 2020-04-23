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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var env = process.env;\nmodule.exports = {\n  port: env.PORT || 3000,\n  host: env.HOST || 'localhost',\n  isDev: \"development\" !== 'production',\n  isBrowser: typeof window !== 'undefined'\n};\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/linear-equations.js":
/*!*********************************!*\
  !*** ./src/linear-equations.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar calculateLineCoefficents = (p1, p2) => {\n  // Using the formula for line equation to get Ax + Bx + C = 0\n  var a = p1[1] - p2[1];\n  var b = p2[0] - p1[0];\n  var c = (p1[0] - p2[0]) * p1[1] + (p2[1] - p1[1]) * p1[0];\n  return {\n    a,\n    b,\n    c\n  };\n};\n\nvar calculateSlope = (p1, p2) => {\n  // Using the slope formula m = (y2 - y1) / (x2 - x1);\n  return (p2[1] - p1[1]) / (p2[0] - p1[0]);\n};\n\nvar distanceFromPoint = function distanceFromPoint(a, b, c, p) {\n  // Using perpendicular distance formula \n  // d = ABS(a * x0 + b * y0 + c) / SQRT(a ^ (2 + b) ^ 2);\n  return Math.abs(a * p[0] + b * p[1] + c) / Math.sqrt((a ^ 2) + (b ^ 2));\n};\n\nvar calculateClosestStreets = (point, streets) => {\n  var streetsByDistance = {};\n\n  if (streets.length > 0) {\n    streets.forEach(street => {\n      // Get the straight line coefficients for this street\n      var {\n        a,\n        b,\n        c\n      } = calculateLineCoefficents(street.start, street.end); // Get the distance from point\n\n      var distance = distanceFromPoint(a, b, c, JSON.parse(point)); // Need to investigate isNaN numbers\n\n      if (!isNaN(distance) && isFinite(distance)) {\n        // Store in streetsByDistance object\n        streetsByDistance[street.name] = JSON.stringify(distance);\n      }\n    });\n\n    if (Object.keys(streetsByDistance).length > 0) {\n      // Sort streets based on their distance\n      // Some folks might want to use Lodash here!\n      return Object.entries(streetsByDistance).sort((s1, s2) => s1[1] <= s2[1] ? -1 : 1).reduce((sortedStreets, streetPair) => {\n        sortedStreets[streetPair[0]] = streetPair[1];\n        return sortedStreets;\n      }, {});\n    }\n  }\n\n  return null;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  calculateLineCoefficents,\n  calculateSlope,\n  distanceFromPoint,\n  calculateClosestStreets\n});\n\n//# sourceURL=webpack:///./src/linear-equations.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _linear_equations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./linear-equations */ \"./src/linear-equations.js\");\n\n\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(morgan__WEBPACK_IMPORTED_MODULE_1___default()('common'));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: false\n}));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\nvar store = {\n  streets: []\n};\napp.get('/', (req, res) => {\n  try {\n    res.status(200).send(\"Welcome to the Libera Nearest Street Finder\\n                            \\n Add streets in the form:\\n                            \\n {\\n                              \\nname: string\\n                              \\nstart: [x,y]\\n                              \\nend: [x,y]\\n                            \\n}.\\n                            \\n To find the closest street to a point:\\n                            \\n POST to /closest/[x,y]\");\n  } catch (err) {\n    console.error(err);\n    res.status(500).send('Server error');\n  }\n});\napp.post('/street', (req, res) => {\n  try {\n    var street = req.body; // Using simple validation (this can be moved to a middleware)\n\n    if (street && street.name && street.start && street.end) {\n      store.streets.push(street);\n      res.send(\"Street \".concat(JSON.stringify(street), \" has been added. \\n              \\nStreet List: \").concat(JSON.stringify(store.streets)));\n    } else {\n      res.status(401).send('Bad request, please ensure street is in the proper JSON format');\n    }\n  } catch (err) {\n    console.error(err);\n    res.status(500).send('Server error');\n  }\n});\napp.get('/closest/:point', (req, res) => {\n  try {\n    var {\n      point\n    } = req.params;\n    var closestStreets = _linear_equations__WEBPACK_IMPORTED_MODULE_4__[\"default\"].calculateClosestStreets(point, store.streets);\n\n    if (closestStreets) {\n      res.status(200).send(closestStreets);\n    } else {\n      res.status(200).send('Could not find any streets close to that point');\n    }\n  } catch (err) {\n    console.error(err);\n    res.status(500).send('Server error');\n  }\n});\napp.listen(_config__WEBPACK_IMPORTED_MODULE_3___default.a.port, _config__WEBPACK_IMPORTED_MODULE_3___default.a.host, () => {\n  console.info(\"Running on \".concat(_config__WEBPACK_IMPORTED_MODULE_3___default.a.host, \":\").concat(_config__WEBPACK_IMPORTED_MODULE_3___default.a.port, \"...\"));\n});\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ })

/******/ });