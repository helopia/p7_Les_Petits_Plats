/******/ (() => { // webpackBootstrap
    /******/ 	var __webpack_modules__ = ({

        /***/ "./node_modules/@popperjs/core/lib/createPopper.js":
        /*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator),
                /* harmony export */   "createPopper": () => (/* binding */ createPopper),
                /* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__["default"])
                /* harmony export */ });
            /* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
            /* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
            /* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
            /* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
            /* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
            /* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
            /* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
            /* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
            /* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
            /* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
            /* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
            /* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
            /* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














            var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
            var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
            var DEFAULT_OPTIONS = {
                placement: 'bottom',
                modifiers: [],
                strategy: 'absolute'
            };

            function areValidElements() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return !args.some(function (element) {
                    return !(element && typeof element.getBoundingClientRect === 'function');
                });
            }

            function popperGenerator(generatorOptions) {
                if (generatorOptions === void 0) {
                    generatorOptions = {};
                }

                var _generatorOptions = generatorOptions,
                    _generatorOptions$def = _generatorOptions.defaultModifiers,
                    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
                    _generatorOptions$def2 = _generatorOptions.defaultOptions,
                    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
                return function createPopper(reference, popper, options) {
                    if (options === void 0) {
                        options = defaultOptions;
                    }

                    var state = {
                        placement: 'bottom',
                        orderedModifiers: [],
                        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
                        modifiersData: {},
                        elements: {
                            reference: reference,
                            popper: popper
                        },
                        attributes: {},
                        styles: {}
                    };
                    var effectCleanupFns = [];
                    var isDestroyed = false;
                    var instance = {
                        state: state,
                        setOptions: function setOptions(setOptionsAction) {
                            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
                            cleanupModifierEffects();
                            state.options = Object.assign({}, defaultOptions, state.options, options);
                            state.scrollParents = {
                                reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
                                popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
                            }; // Orders the modifiers based on their dependencies and `phase`
                            // properties

                            var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

                            state.orderedModifiers = orderedModifiers.filter(function (m) {
                                return m.enabled;
                            }); // Validate the provided modifiers so that the consumer will get warned
                            // if one of the modifiers is invalid for any reason

                            if (true) {
                                var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
                                    var name = _ref.name;
                                    return name;
                                });
                                (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modifiers);

                                if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
                                    var flipModifier = state.orderedModifiers.find(function (_ref2) {
                                        var name = _ref2.name;
                                        return name === 'flip';
                                    });

                                    if (!flipModifier) {
                                        console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
                                    }
                                }

                                var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(popper),
                                    marginTop = _getComputedStyle.marginTop,
                                    marginRight = _getComputedStyle.marginRight,
                                    marginBottom = _getComputedStyle.marginBottom,
                                    marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
                                // cause bugs with positioning, so we'll warn the consumer


                                if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
                                    return parseFloat(margin);
                                })) {
                                    console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
                                }
                            }

                            runModifierEffects();
                            return instance.update();
                        },
                        // Sync update – it will always be executed, even if not necessary. This
                        // is useful for low frequency updates where sync behavior simplifies the
                        // logic.
                        // For high frequency updates (e.g. `resize` and `scroll` events), always
                        // prefer the async Popper#update method
                        forceUpdate: function forceUpdate() {
                            if (isDestroyed) {
                                return;
                            }

                            var _state$elements = state.elements,
                                reference = _state$elements.reference,
                                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
                            // anymore

                            if (!areValidElements(reference, popper)) {
                                if (true) {
                                    console.error(INVALID_ELEMENT_ERROR);
                                }

                                return;
                            } // Store the reference and popper rects to be read by modifiers


                            state.rects = {
                                reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(popper), state.options.strategy === 'fixed'),
                                popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__["default"])(popper)
                            }; // Modifiers have the ability to reset the current update cycle. The
                            // most common use case for this is the `flip` modifier changing the
                            // placement, which then needs to re-run all the modifiers, because the
                            // logic was previously ran for the previous placement and is therefore
                            // stale/incorrect

                            state.reset = false;
                            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
                            // is filled with the initial data specified by the modifier. This means
                            // it doesn't persist and is fresh on each update.
                            // To ensure persistent data, use `${name}#persistent`

                            state.orderedModifiers.forEach(function (modifier) {
                                return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
                            });
                            var __debug_loops__ = 0;

                            for (var index = 0; index < state.orderedModifiers.length; index++) {
                                if (true) {
                                    __debug_loops__ += 1;

                                    if (__debug_loops__ > 100) {
                                        console.error(INFINITE_LOOP_ERROR);
                                        break;
                                    }
                                }

                                if (state.reset === true) {
                                    state.reset = false;
                                    index = -1;
                                    continue;
                                }

                                var _state$orderedModifie = state.orderedModifiers[index],
                                    fn = _state$orderedModifie.fn,
                                    _state$orderedModifie2 = _state$orderedModifie.options,
                                    _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                                    name = _state$orderedModifie.name;

                                if (typeof fn === 'function') {
                                    state = fn({
                                        state: state,
                                        options: _options,
                                        name: name,
                                        instance: instance
                                    }) || state;
                                }
                            }
                        },
                        // Async and optimistically optimized update – it will not be executed if
                        // not necessary (debounced to run at most once-per-tick)
                        update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
                            return new Promise(function (resolve) {
                                instance.forceUpdate();
                                resolve(state);
                            });
                        }),
                        destroy: function destroy() {
                            cleanupModifierEffects();
                            isDestroyed = true;
                        }
                    };

                    if (!areValidElements(reference, popper)) {
                        if (true) {
                            console.error(INVALID_ELEMENT_ERROR);
                        }

                        return instance;
                    }

                    instance.setOptions(options).then(function (state) {
                        if (!isDestroyed && options.onFirstUpdate) {
                            options.onFirstUpdate(state);
                        }
                    }); // Modifiers have the ability to execute arbitrary code before the first
                    // update cycle runs. They will be executed in the same order as the update
                    // cycle. This is useful when a modifier adds some persistent data that
                    // other modifiers need to use, but the modifier is run after the dependent
                    // one.

                    function runModifierEffects() {
                        state.orderedModifiers.forEach(function (_ref3) {
                            var name = _ref3.name,
                                _ref3$options = _ref3.options,
                                options = _ref3$options === void 0 ? {} : _ref3$options,
                                effect = _ref3.effect;

                            if (typeof effect === 'function') {
                                var cleanupFn = effect({
                                    state: state,
                                    name: name,
                                    instance: instance,
                                    options: options
                                });

                                var noopFn = function noopFn() {};

                                effectCleanupFns.push(cleanupFn || noopFn);
                            }
                        });
                    }

                    function cleanupModifierEffects() {
                        effectCleanupFns.forEach(function (fn) {
                            return fn();
                        });
                        effectCleanupFns = [];
                    }

                    return instance;
                };
            }
            var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
        /*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ contains)
                /* harmony export */ });
            /* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

            function contains(parent, child) {
                var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

                if (parent.contains(child)) {
                    return true;
                } // then fallback to custom implementation with Shadow DOM support
                else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
                    var next = child;

                    do {
                        if (next && parent.isSameNode(next)) {
                            return true;
                        } // $FlowFixMe[prop-missing]: need a better way to handle this...


                        next = next.parentNode || next.host;
                    } while (next);
                } // Give up, the result is false


                return false;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
        /*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
                /* harmony export */ });
            /* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

            var round = Math.round;
            function getBoundingClientRect(element, includeScale) {
                if (includeScale === void 0) {
                    includeScale = false;
                }

                var rect = element.getBoundingClientRect();
                var scaleX = 1;
                var scaleY = 1;

                if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) && includeScale) {
                    var offsetHeight = element.offsetHeight;
                    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
                    // Fallback to 1 in case both values are `0`

                    if (offsetWidth > 0) {
                        scaleX = rect.width / offsetWidth || 1;
                    }

                    if (offsetHeight > 0) {
                        scaleY = rect.height / offsetHeight || 1;
                    }
                }

                return {
                    width: round(rect.width / scaleX),
                    height: round(rect.height / scaleY),
                    top: round(rect.top / scaleY),
                    right: round(rect.right / scaleX),
                    bottom: round(rect.bottom / scaleY),
                    left: round(rect.left / scaleX),
                    x: round(rect.left / scaleX),
                    y: round(rect.top / scaleY)
                };
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getClippingRect)
                /* harmony export */ });
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            /* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
            /* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
            /* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
            /* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
            /* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
            /* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
            /* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
            /* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
            /* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
            /* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
            /* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
            /* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
            /* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















            function getInnerBoundingClientRect(element) {
                var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
                rect.top = rect.top + element.clientTop;
                rect.left = rect.left + element.clientLeft;
                rect.bottom = rect.top + element.clientHeight;
                rect.right = rect.left + element.clientWidth;
                rect.width = element.clientWidth;
                rect.height = element.clientHeight;
                rect.x = rect.left;
                rect.y = rect.top;
                return rect;
            }

            function getClientRectFromMixedType(element, clippingParent) {
                return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
            } // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


            function getClippingParents(element) {
                var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
                var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
                var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

                if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
                    return [];
                } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


                return clippingParents.filter(function (clippingParent) {
                    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
                });
            } // Gets the maximum area that the element is visible in due to any number of
// clipping parents


            function getClippingRect(element, boundary, rootBoundary) {
                var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
                var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
                var firstClippingParent = clippingParents[0];
                var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
                    var rect = getClientRectFromMixedType(element, clippingParent);
                    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
                    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
                    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
                    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
                    return accRect;
                }, getClientRectFromMixedType(element, firstClippingParent));
                clippingRect.width = clippingRect.right - clippingRect.left;
                clippingRect.height = clippingRect.bottom - clippingRect.top;
                clippingRect.x = clippingRect.left;
                clippingRect.y = clippingRect.top;
                return clippingRect;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
        /*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getCompositeRect)
                /* harmony export */ });
            /* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
            /* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
            /* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
            /* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
            /* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
            /* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
            /* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");








            function isElementScaled(element) {
                var rect = element.getBoundingClientRect();
                var scaleX = rect.width / element.offsetWidth || 1;
                var scaleY = rect.height / element.offsetHeight || 1;
                return scaleX !== 1 || scaleY !== 1;
            } // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


            function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
                if (isFixed === void 0) {
                    isFixed = false;
                }

                var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(offsetParent);
                var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
                var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent);
                var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(elementOrVirtualElement, offsetParentIsScaled);
                var scroll = {
                    scrollLeft: 0,
                    scrollTop: 0
                };
                var offsets = {
                    x: 0,
                    y: 0
                };

                if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
                    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
                        (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(documentElement)) {
                        scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent);
                    }

                    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(offsetParent)) {
                        offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent, true);
                        offsets.x += offsetParent.clientLeft;
                        offsets.y += offsetParent.clientTop;
                    } else if (documentElement) {
                        offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_6__["default"])(documentElement);
                    }
                }

                return {
                    x: rect.left + scroll.scrollLeft - offsets.x,
                    y: rect.top + scroll.scrollTop - offsets.y,
                    width: rect.width,
                    height: rect.height
                };
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
        /*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getComputedStyle)
                /* harmony export */ });
            /* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

            function getComputedStyle(element) {
                return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
        /*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getDocumentElement)
                /* harmony export */ });
            /* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

            function getDocumentElement(element) {
                // $FlowFixMe[incompatible-return]: assume body is always available
                return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
                    element.document) || window.document).documentElement;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getDocumentRect)
                /* harmony export */ });
            /* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
            /* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
            /* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
            /* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
            /* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




            // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

            function getDocumentRect(element) {
                var _element$ownerDocumen;

                var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
                var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
                var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
                var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
                var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
                var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
                var y = -winScroll.scrollTop;

                if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
                    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
                }

                return {
                    width: width,
                    height: height,
                    x: x,
                    y: y
                };
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
        /*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
                /* harmony export */ });
            function getHTMLElementScroll(element) {
                return {
                    scrollLeft: element.scrollLeft,
                    scrollTop: element.scrollTop
                };
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
        /*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getLayoutRect)
                /* harmony export */ });
            /* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
            // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

            function getLayoutRect(element) {
                var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
                // Fixes https://github.com/popperjs/popper-core/issues/1223

                var width = element.offsetWidth;
                var height = element.offsetHeight;

                if (Math.abs(clientRect.width - width) <= 1) {
                    width = clientRect.width;
                }

                if (Math.abs(clientRect.height - height) <= 1) {
                    height = clientRect.height;
                }

                return {
                    x: element.offsetLeft,
                    y: element.offsetTop,
                    width: width,
                    height: height
                };
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
        /*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getNodeName)
                /* harmony export */ });
            function getNodeName(element) {
                return element ? (element.nodeName || '').toLowerCase() : null;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
        /*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getNodeScroll)
                /* harmony export */ });
            /* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
            /* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
            /* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
            /* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




            function getNodeScroll(node) {
                if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
                    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
                } else {
                    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
                }
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getOffsetParent)
                /* harmony export */ });
            /* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
            /* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
            /* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
            /* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
            /* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
            /* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");







            function getTrueOffsetParent(element) {
                if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
                    (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
                    return null;
                }

                return element.offsetParent;
            } // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


            function getContainingBlock(element) {
                var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
                var isIE = navigator.userAgent.indexOf('Trident') !== -1;

                if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
                    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
                    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

                    if (elementCss.position === 'fixed') {
                        return null;
                    }
                }

                var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element);

                while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__["default"])(currentNode)) < 0) {
                    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
                    // create a containing block.
                    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

                    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
                        return currentNode;
                    } else {
                        currentNode = currentNode.parentNode;
                    }
                }

                return null;
            } // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


            function getOffsetParent(element) {
                var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_4__["default"])(element);
                var offsetParent = getTrueOffsetParent(element);

                while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
                    offsetParent = getTrueOffsetParent(offsetParent);
                }

                if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
                    return window;
                }

                return offsetParent || getContainingBlock(element) || window;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
        /*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getParentNode)
                /* harmony export */ });
            /* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
            /* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
            /* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



            function getParentNode(element) {
                if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
                    return element;
                }

                return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
                    // $FlowFixMe[incompatible-return]
                    // $FlowFixMe[prop-missing]
                    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
                    element.parentNode || ( // DOM Element detected
                        (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
                    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
                    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

                );
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getScrollParent)
                /* harmony export */ });
            /* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
            /* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
            /* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
            /* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




            function getScrollParent(node) {
                if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
                    // $FlowFixMe[incompatible-return]: assume body is always available
                    return node.ownerDocument.body;
                }

                if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
                    return node;
                }

                return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getViewportRect)
                /* harmony export */ });
            /* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
            /* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
            /* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");



            function getViewportRect(element) {
                var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
                var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
                var visualViewport = win.visualViewport;
                var width = html.clientWidth;
                var height = html.clientHeight;
                var x = 0;
                var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
                // can be obscured underneath it.
                // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
                // if it isn't open, so if this isn't available, the popper will be detected
                // to overflow the bottom of the screen too early.

                if (visualViewport) {
                    width = visualViewport.width;
                    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
                    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
                    // errors due to floating point numbers, so we need to check precision.
                    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
                    // Feature detection fails in mobile emulation mode in Chrome.
                    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
                    // 0.001
                    // Fallback here: "Not Safari" userAgent

                    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                        x = visualViewport.offsetLeft;
                        y = visualViewport.offsetTop;
                    }
                }

                return {
                    width: width,
                    height: height,
                    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element),
                    y: y
                };
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
        /*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getWindow)
                /* harmony export */ });
            function getWindow(node) {
                if (node == null) {
                    return window;
                }

                if (node.toString() !== '[object Window]') {
                    var ownerDocument = node.ownerDocument;
                    return ownerDocument ? ownerDocument.defaultView || window : window;
                }

                return node;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getWindowScroll)
                /* harmony export */ });
            /* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

            function getWindowScroll(node) {
                var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
                var scrollLeft = win.pageXOffset;
                var scrollTop = win.pageYOffset;
                return {
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop
                };
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
        /*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
                /* harmony export */ });
            /* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
            /* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
            /* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



            function getWindowScrollBarX(element) {
                // If <html> has a CSS width greater than the viewport, then this will be
                // incorrect for RTL.
                // Popper 1 is broken in this case and never had a bug report so let's assume
                // it's not an issue. I don't think anyone ever specifies width on <html>
                // anyway.
                // Browsers where the left scrollbar doesn't cause an issue report `0` for
                // this (e.g. Edge 2019, IE11, Safari)
                return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
        /*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "isElement": () => (/* binding */ isElement),
                /* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
                /* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
                /* harmony export */ });
            /* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


            function isElement(node) {
                var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
                return node instanceof OwnElement || node instanceof Element;
            }

            function isHTMLElement(node) {
                var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
                return node instanceof OwnElement || node instanceof HTMLElement;
            }

            function isShadowRoot(node) {
                // IE 11 has no ShadowRoot
                if (typeof ShadowRoot === 'undefined') {
                    return false;
                }

                var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
                return node instanceof OwnElement || node instanceof ShadowRoot;
            }



            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
        /*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ isScrollParent)
                /* harmony export */ });
            /* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

            function isScrollParent(element) {
                // Firefox wants us to check `-x` and `-y` variations as well
                var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
                    overflow = _getComputedStyle.overflow,
                    overflowX = _getComputedStyle.overflowX,
                    overflowY = _getComputedStyle.overflowY;

                return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
        /*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ isTableElement)
                /* harmony export */ });
            /* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

            function isTableElement(element) {
                return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
        /*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ listScrollParents)
                /* harmony export */ });
            /* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
            /* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
            /* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
            /* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




            /*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

            function listScrollParents(element, list) {
                var _element$ownerDocumen;

                if (list === void 0) {
                    list = [];
                }

                var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
                var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
                var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
                var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
                var updatedList = list.concat(target);
                return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
                    updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/enums.js":
        /*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "top": () => (/* binding */ top),
                /* harmony export */   "bottom": () => (/* binding */ bottom),
                /* harmony export */   "right": () => (/* binding */ right),
                /* harmony export */   "left": () => (/* binding */ left),
                /* harmony export */   "auto": () => (/* binding */ auto),
                /* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
                /* harmony export */   "start": () => (/* binding */ start),
                /* harmony export */   "end": () => (/* binding */ end),
                /* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
                /* harmony export */   "viewport": () => (/* binding */ viewport),
                /* harmony export */   "popper": () => (/* binding */ popper),
                /* harmony export */   "reference": () => (/* binding */ reference),
                /* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
                /* harmony export */   "placements": () => (/* binding */ placements),
                /* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
                /* harmony export */   "read": () => (/* binding */ read),
                /* harmony export */   "afterRead": () => (/* binding */ afterRead),
                /* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
                /* harmony export */   "main": () => (/* binding */ main),
                /* harmony export */   "afterMain": () => (/* binding */ afterMain),
                /* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
                /* harmony export */   "write": () => (/* binding */ write),
                /* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
                /* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases)
                /* harmony export */ });
            var top = 'top';
            var bottom = 'bottom';
            var right = 'right';
            var left = 'left';
            var auto = 'auto';
            var basePlacements = [top, bottom, right, left];
            var start = 'start';
            var end = 'end';
            var clippingParents = 'clippingParents';
            var viewport = 'viewport';
            var popper = 'popper';
            var reference = 'reference';
            var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
                return acc.concat([placement + "-" + start, placement + "-" + end]);
            }, []);
            var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
                return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
            }, []); // modifiers that need to read the DOM

            var beforeRead = 'beforeRead';
            var read = 'read';
            var afterRead = 'afterRead'; // pure-logic modifiers

            var beforeMain = 'beforeMain';
            var main = 'main';
            var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

            var beforeWrite = 'beforeWrite';
            var write = 'write';
            var afterWrite = 'afterWrite';
            var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/index.js":
        /*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "afterMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain),
                /* harmony export */   "afterRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead),
                /* harmony export */   "afterWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite),
                /* harmony export */   "auto": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto),
                /* harmony export */   "basePlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements),
                /* harmony export */   "beforeMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain),
                /* harmony export */   "beforeRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead),
                /* harmony export */   "beforeWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite),
                /* harmony export */   "bottom": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom),
                /* harmony export */   "clippingParents": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents),
                /* harmony export */   "end": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end),
                /* harmony export */   "left": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left),
                /* harmony export */   "main": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main),
                /* harmony export */   "modifierPhases": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases),
                /* harmony export */   "placements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements),
                /* harmony export */   "popper": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper),
                /* harmony export */   "read": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read),
                /* harmony export */   "reference": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference),
                /* harmony export */   "right": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right),
                /* harmony export */   "start": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start),
                /* harmony export */   "top": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top),
                /* harmony export */   "variationPlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements),
                /* harmony export */   "viewport": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport),
                /* harmony export */   "write": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write),
                /* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles),
                /* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow),
                /* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles),
                /* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners),
                /* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip),
                /* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide),
                /* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset),
                /* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets),
                /* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow),
                /* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator),
                /* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
                /* harmony export */   "createPopperBase": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper),
                /* harmony export */   "createPopper": () => (/* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper),
                /* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper)
                /* harmony export */ });
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            /* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
            /* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
            /* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
            /* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
            /* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");

            // eslint-disable-next-line import/no-unused-modules

            // eslint-disable-next-line import/no-unused-modules

            // eslint-disable-next-line import/no-unused-modules



            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
        /*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                /* harmony export */ });
            /* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
            /* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

            // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

            function applyStyles(_ref) {
                var state = _ref.state;
                Object.keys(state.elements).forEach(function (name) {
                    var style = state.styles[name] || {};
                    var attributes = state.attributes[name] || {};
                    var element = state.elements[name]; // arrow is optional + virtual elements

                    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
                        return;
                    } // Flow doesn't support to extend this property, but it's the most
                    // effective way to apply styles to an HTMLElement
                    // $FlowFixMe[cannot-write]


                    Object.assign(element.style, style);
                    Object.keys(attributes).forEach(function (name) {
                        var value = attributes[name];

                        if (value === false) {
                            element.removeAttribute(name);
                        } else {
                            element.setAttribute(name, value === true ? '' : value);
                        }
                    });
                });
            }

            function effect(_ref2) {
                var state = _ref2.state;
                var initialStyles = {
                    popper: {
                        position: state.options.strategy,
                        left: '0',
                        top: '0',
                        margin: '0'
                    },
                    arrow: {
                        position: 'absolute'
                    },
                    reference: {}
                };
                Object.assign(state.elements.popper.style, initialStyles.popper);
                state.styles = initialStyles;

                if (state.elements.arrow) {
                    Object.assign(state.elements.arrow.style, initialStyles.arrow);
                }

                return function () {
                    Object.keys(state.elements).forEach(function (name) {
                        var element = state.elements[name];
                        var attributes = state.attributes[name] || {};
                        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

                        var style = styleProperties.reduce(function (style, property) {
                            style[property] = '';
                            return style;
                        }, {}); // arrow is optional + virtual elements

                        if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
                            return;
                        }

                        Object.assign(element.style, style);
                        Object.keys(attributes).forEach(function (attribute) {
                            element.removeAttribute(attribute);
                        });
                    });
                };
            } // eslint-disable-next-line import/no-unused-modules


            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                name: 'applyStyles',
                enabled: true,
                phase: 'write',
                fn: applyStyles,
                effect: effect,
                requires: ['computeStyles']
            });

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
        /*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                /* harmony export */ });
            /* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
            /* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
            /* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
            /* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
            /* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
            /* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
            /* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
            /* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            /* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









            // eslint-disable-next-line import/no-unused-modules

            var toPaddingObject = function toPaddingObject(padding, state) {
                padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
                    placement: state.placement
                })) : padding;
                return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
            };

            function arrow(_ref) {
                var _state$modifiersData$;

                var state = _ref.state,
                    name = _ref.name,
                    options = _ref.options;
                var arrowElement = state.elements.arrow;
                var popperOffsets = state.modifiersData.popperOffsets;
                var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
                var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
                var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
                var len = isVertical ? 'height' : 'width';

                if (!arrowElement || !popperOffsets) {
                    return;
                }

                var paddingObject = toPaddingObject(options.padding, state);
                var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
                var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
                var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
                var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
                var startDiff = popperOffsets[axis] - state.rects.reference[axis];
                var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
                var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
                var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
                // outside of the popper bounds

                var min = paddingObject[minProp];
                var max = clientSize - arrowRect[len] - paddingObject[maxProp];
                var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
                var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__["default"])(min, center, max); // Prevents breaking syntax highlighting...

                var axisProp = axis;
                state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
            }

            function effect(_ref2) {
                var state = _ref2.state,
                    options = _ref2.options;
                var _options$element = options.element,
                    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

                if (arrowElement == null) {
                    return;
                } // CSS selector


                if (typeof arrowElement === 'string') {
                    arrowElement = state.elements.popper.querySelector(arrowElement);

                    if (!arrowElement) {
                        return;
                    }
                }

                if (true) {
                    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
                        console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
                    }
                }

                if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.popper, arrowElement)) {
                    if (true) {
                        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
                    }

                    return;
                }

                state.elements.arrow = arrowElement;
            } // eslint-disable-next-line import/no-unused-modules


            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                name: 'arrow',
                enabled: true,
                phase: 'main',
                fn: arrow,
                effect: effect,
                requires: ['popperOffsets'],
                requiresIfExists: ['preventOverflow']
            });

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
        /*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles),
                /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                /* harmony export */ });
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            /* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
            /* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
            /* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
            /* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
            /* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
            /* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
            /* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







            // eslint-disable-next-line import/no-unused-modules

            var unsetSides = {
                top: 'auto',
                right: 'auto',
                bottom: 'auto',
                left: 'auto'
            }; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

            function roundOffsetsByDPR(_ref) {
                var x = _ref.x,
                    y = _ref.y;
                var win = window;
                var dpr = win.devicePixelRatio || 1;
                return {
                    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr) || 0,
                    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr) || 0
                };
            }

            function mapToStyles(_ref2) {
                var _Object$assign2;

                var popper = _ref2.popper,
                    popperRect = _ref2.popperRect,
                    placement = _ref2.placement,
                    variation = _ref2.variation,
                    offsets = _ref2.offsets,
                    position = _ref2.position,
                    gpuAcceleration = _ref2.gpuAcceleration,
                    adaptive = _ref2.adaptive,
                    roundOffsets = _ref2.roundOffsets;

                var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
                    _ref3$x = _ref3.x,
                    x = _ref3$x === void 0 ? 0 : _ref3$x,
                    _ref3$y = _ref3.y,
                    y = _ref3$y === void 0 ? 0 : _ref3$y;

                var hasX = offsets.hasOwnProperty('x');
                var hasY = offsets.hasOwnProperty('y');
                var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
                var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
                var win = window;

                if (adaptive) {
                    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
                    var heightProp = 'clientHeight';
                    var widthProp = 'clientWidth';

                    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
                        offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

                        if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
                            heightProp = 'scrollHeight';
                            widthProp = 'scrollWidth';
                        }
                    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


                    offsetParent = offsetParent;

                    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
                        sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom; // $FlowFixMe[prop-missing]

                        y -= offsetParent[heightProp] - popperRect.height;
                        y *= gpuAcceleration ? 1 : -1;
                    }

                    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
                        sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right; // $FlowFixMe[prop-missing]

                        x -= offsetParent[widthProp] - popperRect.width;
                        x *= gpuAcceleration ? 1 : -1;
                    }
                }

                var commonStyles = Object.assign({
                    position: position
                }, adaptive && unsetSides);

                if (gpuAcceleration) {
                    var _Object$assign;

                    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
                }

                return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
            }

            function computeStyles(_ref4) {
                var state = _ref4.state,
                    options = _ref4.options;
                var _options$gpuAccelerat = options.gpuAcceleration,
                    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
                    _options$adaptive = options.adaptive,
                    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
                    _options$roundOffsets = options.roundOffsets,
                    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

                if (true) {
                    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper).transitionProperty || '';

                    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
                        return transitionProperty.indexOf(property) >= 0;
                    })) {
                        console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
                    }
                }

                var commonStyles = {
                    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
                    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
                    popper: state.elements.popper,
                    popperRect: state.rects.popper,
                    gpuAcceleration: gpuAcceleration
                };

                if (state.modifiersData.popperOffsets != null) {
                    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
                        offsets: state.modifiersData.popperOffsets,
                        position: state.options.strategy,
                        adaptive: adaptive,
                        roundOffsets: roundOffsets
                    })));
                }

                if (state.modifiersData.arrow != null) {
                    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
                        offsets: state.modifiersData.arrow,
                        position: 'absolute',
                        adaptive: false,
                        roundOffsets: roundOffsets
                    })));
                }

                state.attributes.popper = Object.assign({}, state.attributes.popper, {
                    'data-popper-placement': state.placement
                });
            } // eslint-disable-next-line import/no-unused-modules


            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                name: 'computeStyles',
                enabled: true,
                phase: 'beforeWrite',
                fn: computeStyles,
                data: {}
            });

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
        /*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                /* harmony export */ });
            /* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
            // eslint-disable-next-line import/no-unused-modules

            var passive = {
                passive: true
            };

            function effect(_ref) {
                var state = _ref.state,
                    instance = _ref.instance,
                    options = _ref.options;
                var _options$scroll = options.scroll,
                    scroll = _options$scroll === void 0 ? true : _options$scroll,
                    _options$resize = options.resize,
                    resize = _options$resize === void 0 ? true : _options$resize;
                var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
                var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

                if (scroll) {
                    scrollParents.forEach(function (scrollParent) {
                        scrollParent.addEventListener('scroll', instance.update, passive);
                    });
                }

                if (resize) {
                    window.addEventListener('resize', instance.update, passive);
                }

                return function () {
                    if (scroll) {
                        scrollParents.forEach(function (scrollParent) {
                            scrollParent.removeEventListener('scroll', instance.update, passive);
                        });
                    }

                    if (resize) {
                        window.removeEventListener('resize', instance.update, passive);
                    }
                };
            } // eslint-disable-next-line import/no-unused-modules


            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                name: 'eventListeners',
                enabled: true,
                phase: 'write',
                fn: function fn() {},
                effect: effect,
                data: {}
            });

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
        /*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                /* harmony export */ });
            /* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
            /* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
            /* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
            /* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
            /* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            /* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






            // eslint-disable-next-line import/no-unused-modules

            function getExpandedFallbackPlacements(placement) {
                if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
                    return [];
                }

                var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
                return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
            }

            function flip(_ref) {
                var state = _ref.state,
                    options = _ref.options,
                    name = _ref.name;

                if (state.modifiersData[name]._skip) {
                    return;
                }

                var _options$mainAxis = options.mainAxis,
                    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
                    _options$altAxis = options.altAxis,
                    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
                    specifiedFallbackPlacements = options.fallbackPlacements,
                    padding = options.padding,
                    boundary = options.boundary,
                    rootBoundary = options.rootBoundary,
                    altBoundary = options.altBoundary,
                    _options$flipVariatio = options.flipVariations,
                    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
                    allowedAutoPlacements = options.allowedAutoPlacements;
                var preferredPlacement = state.options.placement;
                var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
                var isBasePlacement = basePlacement === preferredPlacement;
                var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
                var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
                    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
                        placement: placement,
                        boundary: boundary,
                        rootBoundary: rootBoundary,
                        padding: padding,
                        flipVariations: flipVariations,
                        allowedAutoPlacements: allowedAutoPlacements
                    }) : placement);
                }, []);
                var referenceRect = state.rects.reference;
                var popperRect = state.rects.popper;
                var checksMap = new Map();
                var makeFallbackChecks = true;
                var firstFittingPlacement = placements[0];

                for (var i = 0; i < placements.length; i++) {
                    var placement = placements[i];

                    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

                    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
                    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
                    var len = isVertical ? 'width' : 'height';
                    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
                        placement: placement,
                        boundary: boundary,
                        rootBoundary: rootBoundary,
                        altBoundary: altBoundary,
                        padding: padding
                    });
                    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

                    if (referenceRect[len] > popperRect[len]) {
                        mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
                    }

                    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
                    var checks = [];

                    if (checkMainAxis) {
                        checks.push(overflow[_basePlacement] <= 0);
                    }

                    if (checkAltAxis) {
                        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
                    }

                    if (checks.every(function (check) {
                        return check;
                    })) {
                        firstFittingPlacement = placement;
                        makeFallbackChecks = false;
                        break;
                    }

                    checksMap.set(placement, checks);
                }

                if (makeFallbackChecks) {
                    // `2` may be desired in some cases – research later
                    var numberOfChecks = flipVariations ? 3 : 1;

                    var _loop = function _loop(_i) {
                        var fittingPlacement = placements.find(function (placement) {
                            var checks = checksMap.get(placement);

                            if (checks) {
                                return checks.slice(0, _i).every(function (check) {
                                    return check;
                                });
                            }
                        });

                        if (fittingPlacement) {
                            firstFittingPlacement = fittingPlacement;
                            return "break";
                        }
                    };

                    for (var _i = numberOfChecks; _i > 0; _i--) {
                        var _ret = _loop(_i);

                        if (_ret === "break") break;
                    }
                }

                if (state.placement !== firstFittingPlacement) {
                    state.modifiersData[name]._skip = true;
                    state.placement = firstFittingPlacement;
                    state.reset = true;
                }
            } // eslint-disable-next-line import/no-unused-modules


            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                name: 'flip',
                enabled: true,
                phase: 'main',
                fn: flip,
                requiresIfExists: ['offset'],
                data: {
                    _skip: false
                }
            });

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
        /*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                /* harmony export */ });
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            /* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



            function getSideOffsets(overflow, rect, preventedOffsets) {
                if (preventedOffsets === void 0) {
                    preventedOffsets = {
                        x: 0,
                        y: 0
                    };
                }

                return {
                    top: overflow.top - rect.height - preventedOffsets.y,
                    right: overflow.right - rect.width + preventedOffsets.x,
                    bottom: overflow.bottom - rect.height + preventedOffsets.y,
                    left: overflow.left - rect.width - preventedOffsets.x
                };
            }

            function isAnySideFullyClipped(overflow) {
                return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
                    return overflow[side] >= 0;
                });
            }

            function hide(_ref) {
                var state = _ref.state,
                    name = _ref.name;
                var referenceRect = state.rects.reference;
                var popperRect = state.rects.popper;
                var preventedOffsets = state.modifiersData.preventOverflow;
                var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
                    elementContext: 'reference'
                });
                var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
                    altBoundary: true
                });
                var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
                var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
                var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
                var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
                state.modifiersData[name] = {
                    referenceClippingOffsets: referenceClippingOffsets,
                    popperEscapeOffsets: popperEscapeOffsets,
                    isReferenceHidden: isReferenceHidden,
                    hasPopperEscaped: hasPopperEscaped
                };
                state.attributes.popper = Object.assign({}, state.attributes.popper, {
                    'data-popper-reference-hidden': isReferenceHidden,
                    'data-popper-escaped': hasPopperEscaped
                });
            } // eslint-disable-next-line import/no-unused-modules


            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                name: 'hide',
                enabled: true,
                phase: 'main',
                requiresIfExists: ['preventOverflow'],
                fn: hide
            });

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
        /*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
                /* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
                /* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
                /* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
                /* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
                /* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
                /* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
                /* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
                /* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"])
                /* harmony export */ });
            /* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
            /* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
            /* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
            /* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
            /* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
            /* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
            /* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
            /* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
            /* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
        /*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY),
                /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                /* harmony export */ });
            /* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


            function distanceAndSkiddingToXY(placement, rects, offset) {
                var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
                var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

                var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
                        placement: placement
                    })) : offset,
                    skidding = _ref[0],
                    distance = _ref[1];

                skidding = skidding || 0;
                distance = (distance || 0) * invertDistance;
                return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
                    x: distance,
                    y: skidding
                } : {
                    x: skidding,
                    y: distance
                };
            }

            function offset(_ref2) {
                var state = _ref2.state,
                    options = _ref2.options,
                    name = _ref2.name;
                var _options$offset = options.offset,
                    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
                var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
                    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
                    return acc;
                }, {});
                var _data$state$placement = data[state.placement],
                    x = _data$state$placement.x,
                    y = _data$state$placement.y;

                if (state.modifiersData.popperOffsets != null) {
                    state.modifiersData.popperOffsets.x += x;
                    state.modifiersData.popperOffsets.y += y;
                }

                state.modifiersData[name] = data;
            } // eslint-disable-next-line import/no-unused-modules


            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                name: 'offset',
                enabled: true,
                phase: 'main',
                requires: ['popperOffsets'],
                fn: offset
            });

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
        /*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                /* harmony export */ });
            /* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


            function popperOffsets(_ref) {
                var state = _ref.state,
                    name = _ref.name;
                // Offsets are the actual position the popper needs to have to be
                // properly positioned near its reference element
                // This is the most basic placement, and will be adjusted by
                // the modifiers in the next step
                state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
                    reference: state.rects.reference,
                    element: state.rects.popper,
                    strategy: 'absolute',
                    placement: state.placement
                });
            } // eslint-disable-next-line import/no-unused-modules


            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                name: 'popperOffsets',
                enabled: true,
                phase: 'read',
                fn: popperOffsets,
                data: {}
            });

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
        /*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                /* harmony export */ });
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            /* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
            /* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
            /* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
            /* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
            /* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
            /* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
            /* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
            /* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
            /* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
            /* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












            function preventOverflow(_ref) {
                var state = _ref.state,
                    options = _ref.options,
                    name = _ref.name;
                var _options$mainAxis = options.mainAxis,
                    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
                    _options$altAxis = options.altAxis,
                    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
                    boundary = options.boundary,
                    rootBoundary = options.rootBoundary,
                    altBoundary = options.altBoundary,
                    padding = options.padding,
                    _options$tether = options.tether,
                    tether = _options$tether === void 0 ? true : _options$tether,
                    _options$tetherOffset = options.tetherOffset,
                    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
                var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
                    boundary: boundary,
                    rootBoundary: rootBoundary,
                    padding: padding,
                    altBoundary: altBoundary
                });
                var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
                var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
                var isBasePlacement = !variation;
                var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
                var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
                var popperOffsets = state.modifiersData.popperOffsets;
                var referenceRect = state.rects.reference;
                var popperRect = state.rects.popper;
                var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
                    placement: state.placement
                })) : tetherOffset;
                var data = {
                    x: 0,
                    y: 0
                };

                if (!popperOffsets) {
                    return;
                }

                if (checkMainAxis || checkAltAxis) {
                    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
                    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
                    var len = mainAxis === 'y' ? 'height' : 'width';
                    var offset = popperOffsets[mainAxis];
                    var min = popperOffsets[mainAxis] + overflow[mainSide];
                    var max = popperOffsets[mainAxis] - overflow[altSide];
                    var additive = tether ? -popperRect[len] / 2 : 0;
                    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
                    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
                    // outside the reference bounds

                    var arrowElement = state.elements.arrow;
                    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
                        width: 0,
                        height: 0
                    };
                    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
                    var arrowPaddingMin = arrowPaddingObject[mainSide];
                    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
                    // to include its full size in the calculation. If the reference is small
                    // and near the edge of a boundary, the popper can overflow even if the
                    // reference is not overflowing as well (e.g. virtual elements with no
                    // width or height)

                    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__["default"])(0, referenceRect[len], arrowRect[len]);
                    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
                    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
                    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
                    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
                    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
                    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
                    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

                    if (checkMainAxis) {
                        var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__["default"])(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
                        popperOffsets[mainAxis] = preventedOffset;
                        data[mainAxis] = preventedOffset - offset;
                    }

                    if (checkAltAxis) {
                        var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

                        var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

                        var _offset = popperOffsets[altAxis];

                        var _min = _offset + overflow[_mainSide];

                        var _max = _offset - overflow[_altSide];

                        var _preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__["default"])(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(_min, tetherMin) : _min, _offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(_max, tetherMax) : _max);

                        popperOffsets[altAxis] = _preventedOffset;
                        data[altAxis] = _preventedOffset - _offset;
                    }
                }

                state.modifiersData[name] = data;
            } // eslint-disable-next-line import/no-unused-modules


            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                name: 'preventOverflow',
                enabled: true,
                phase: 'main',
                fn: preventOverflow,
                requiresIfExists: ['offset']
            });

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
        /*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "createPopper": () => (/* binding */ createPopper),
                /* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator),
                /* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
                /* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"])
                /* harmony export */ });
            /* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
            /* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
            /* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
            /* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
            /* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
            /* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





            var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
            var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
                defaultModifiers: defaultModifiers
            }); // eslint-disable-next-line import/no-unused-modules



            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/popper.js":
        /*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "createPopper": () => (/* binding */ createPopper),
                /* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
                /* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
                /* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
                /* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
                /* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
                /* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
                /* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
                /* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
                /* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
                /* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
                /* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
                /* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
                /* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
                /* harmony export */ });
            /* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
            /* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
            /* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
            /* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
            /* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
            /* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
            /* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
            /* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
            /* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
            /* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
            /* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
            /* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
            /* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










            var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
            var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
                defaultModifiers: defaultModifiers
            }); // eslint-disable-next-line import/no-unused-modules

            // eslint-disable-next-line import/no-unused-modules

            // eslint-disable-next-line import/no-unused-modules



            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
        /*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
                /* harmony export */ });
            /* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            /* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
            /* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




            function computeAutoPlacement(state, options) {
                if (options === void 0) {
                    options = {};
                }

                var _options = options,
                    placement = _options.placement,
                    boundary = _options.boundary,
                    rootBoundary = _options.rootBoundary,
                    padding = _options.padding,
                    flipVariations = _options.flipVariations,
                    _options$allowedAutoP = _options.allowedAutoPlacements,
                    allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
                var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
                var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
                    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
                }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
                var allowedPlacements = placements.filter(function (placement) {
                    return allowedAutoPlacements.indexOf(placement) >= 0;
                });

                if (allowedPlacements.length === 0) {
                    allowedPlacements = placements;

                    if (true) {
                        console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
                    }
                } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


                var overflows = allowedPlacements.reduce(function (acc, placement) {
                    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
                        placement: placement,
                        boundary: boundary,
                        rootBoundary: rootBoundary,
                        padding: padding
                    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
                    return acc;
                }, {});
                return Object.keys(overflows).sort(function (a, b) {
                    return overflows[a] - overflows[b];
                });
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
        /*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ computeOffsets)
                /* harmony export */ });
            /* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
            /* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
            /* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




            function computeOffsets(_ref) {
                var reference = _ref.reference,
                    element = _ref.element,
                    placement = _ref.placement;
                var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
                var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
                var commonX = reference.x + reference.width / 2 - element.width / 2;
                var commonY = reference.y + reference.height / 2 - element.height / 2;
                var offsets;

                switch (basePlacement) {
                    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
                        offsets = {
                            x: commonX,
                            y: reference.y - element.height
                        };
                        break;

                    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
                        offsets = {
                            x: commonX,
                            y: reference.y + reference.height
                        };
                        break;

                    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
                        offsets = {
                            x: reference.x + reference.width,
                            y: commonY
                        };
                        break;

                    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
                        offsets = {
                            x: reference.x - element.width,
                            y: commonY
                        };
                        break;

                    default:
                        offsets = {
                            x: reference.x,
                            y: reference.y
                        };
                }

                var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

                if (mainAxis != null) {
                    var len = mainAxis === 'y' ? 'height' : 'width';

                    switch (variation) {
                        case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
                            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
                            break;

                        case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
                            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
                            break;

                        default:
                    }
                }

                return offsets;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
        /*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ debounce)
                /* harmony export */ });
            function debounce(fn) {
                var pending;
                return function () {
                    if (!pending) {
                        pending = new Promise(function (resolve) {
                            Promise.resolve().then(function () {
                                pending = undefined;
                                resolve(fn());
                            });
                        });
                    }

                    return pending;
                };
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
        /*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ detectOverflow)
                /* harmony export */ });
            /* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
            /* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
            /* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
            /* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
            /* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            /* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
            /* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
            /* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








            // eslint-disable-next-line import/no-unused-modules

            function detectOverflow(state, options) {
                if (options === void 0) {
                    options = {};
                }

                var _options = options,
                    _options$placement = _options.placement,
                    placement = _options$placement === void 0 ? state.placement : _options$placement,
                    _options$boundary = _options.boundary,
                    boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
                    _options$rootBoundary = _options.rootBoundary,
                    rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
                    _options$elementConte = _options.elementContext,
                    elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
                    _options$altBoundary = _options.altBoundary,
                    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
                    _options$padding = _options.padding,
                    padding = _options$padding === void 0 ? 0 : _options$padding;
                var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
                var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
                var popperRect = state.rects.popper;
                var element = state.elements[altBoundary ? altContext : elementContext];
                var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary);
                var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
                var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
                    reference: referenceClientRect,
                    element: popperRect,
                    strategy: 'absolute',
                    placement: placement
                });
                var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
                var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
                // 0 or negative = within the clipping rect

                var overflowOffsets = {
                    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
                    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
                    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
                    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
                };
                var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

                if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
                    var offset = offsetData[placement];
                    Object.keys(overflowOffsets).forEach(function (key) {
                        var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
                        var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
                        overflowOffsets[key] += offset[axis] * multiply;
                    });
                }

                return overflowOffsets;
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
        /*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ expandToHashMap)
                /* harmony export */ });
            function expandToHashMap(value, keys) {
                return keys.reduce(function (hashMap, key) {
                    hashMap[key] = value;
                    return hashMap;
                }, {});
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/format.js":
        /*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ format)
                /* harmony export */ });
            function format(str) {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                return [].concat(args).reduce(function (p, c) {
                    return p.replace(/%s/, c);
                }, str);
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
        /*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getAltAxis)
                /* harmony export */ });
            function getAltAxis(axis) {
                return axis === 'x' ? 'y' : 'x';
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
        /*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getBasePlacement)
                /* harmony export */ });

            function getBasePlacement(placement) {
                return placement.split('-')[0];
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
        /*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getFreshSideObject)
                /* harmony export */ });
            function getFreshSideObject() {
                return {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                };
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
        /*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
                /* harmony export */ });
            function getMainAxisFromPlacement(placement) {
                return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
        /*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getOppositePlacement)
                /* harmony export */ });
            var hash = {
                left: 'right',
                right: 'left',
                bottom: 'top',
                top: 'bottom'
            };
            function getOppositePlacement(placement) {
                return placement.replace(/left|right|bottom|top/g, function (matched) {
                    return hash[matched];
                });
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
        /*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
                /* harmony export */ });
            var hash = {
                start: 'end',
                end: 'start'
            };
            function getOppositeVariationPlacement(placement) {
                return placement.replace(/start|end/g, function (matched) {
                    return hash[matched];
                });
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
        /*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ getVariation)
                /* harmony export */ });
            function getVariation(placement) {
                return placement.split('-')[1];
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/math.js":
        /*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "max": () => (/* binding */ max),
                /* harmony export */   "min": () => (/* binding */ min),
                /* harmony export */   "round": () => (/* binding */ round)
                /* harmony export */ });
            var max = Math.max;
            var min = Math.min;
            var round = Math.round;

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
        /*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ mergeByName)
                /* harmony export */ });
            function mergeByName(modifiers) {
                var merged = modifiers.reduce(function (merged, current) {
                    var existing = merged[current.name];
                    merged[current.name] = existing ? Object.assign({}, existing, current, {
                        options: Object.assign({}, existing.options, current.options),
                        data: Object.assign({}, existing.data, current.data)
                    }) : current;
                    return merged;
                }, {}); // IE11 does not support Object.values

                return Object.keys(merged).map(function (key) {
                    return merged[key];
                });
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
        /*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ mergePaddingObject)
                /* harmony export */ });
            /* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

            function mergePaddingObject(paddingObject) {
                return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
        /*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ orderModifiers)
                /* harmony export */ });
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
            // source: https://stackoverflow.com/questions/49875255

            function order(modifiers) {
                var map = new Map();
                var visited = new Set();
                var result = [];
                modifiers.forEach(function (modifier) {
                    map.set(modifier.name, modifier);
                }); // On visiting object, check for its dependencies and visit them recursively

                function sort(modifier) {
                    visited.add(modifier.name);
                    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
                    requires.forEach(function (dep) {
                        if (!visited.has(dep)) {
                            var depModifier = map.get(dep);

                            if (depModifier) {
                                sort(depModifier);
                            }
                        }
                    });
                    result.push(modifier);
                }

                modifiers.forEach(function (modifier) {
                    if (!visited.has(modifier.name)) {
                        // check for visited object
                        sort(modifier);
                    }
                });
                return result;
            }

            function orderModifiers(modifiers) {
                // order based on dependencies
                var orderedModifiers = order(modifiers); // order based on phase

                return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
                    return acc.concat(orderedModifiers.filter(function (modifier) {
                        return modifier.phase === phase;
                    }));
                }, []);
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
        /*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ rectToClientRect)
                /* harmony export */ });
            function rectToClientRect(rect) {
                return Object.assign({}, rect, {
                    left: rect.x,
                    top: rect.y,
                    right: rect.x + rect.width,
                    bottom: rect.y + rect.height
                });
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
        /*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ uniqueBy)
                /* harmony export */ });
            function uniqueBy(arr, fn) {
                var identifiers = new Set();
                return arr.filter(function (item) {
                    var identifier = fn(item);

                    if (!identifiers.has(identifier)) {
                        identifiers.add(identifier);
                        return true;
                    }
                });
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
        /*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ validateModifiers)
                /* harmony export */ });
            /* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
            /* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


            var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
            var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
            var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
            function validateModifiers(modifiers) {
                modifiers.forEach(function (modifier) {
                    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
                        .filter(function (value, index, self) {
                            return self.indexOf(value) === index;
                        }).forEach(function (key) {
                        switch (key) {
                            case 'name':
                                if (typeof modifier.name !== 'string') {
                                    console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
                                }

                                break;

                            case 'enabled':
                                if (typeof modifier.enabled !== 'boolean') {
                                    console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
                                }

                                break;

                            case 'phase':
                                if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
                                    console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
                                }

                                break;

                            case 'fn':
                                if (typeof modifier.fn !== 'function') {
                                    console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
                                }

                                break;

                            case 'effect':
                                if (modifier.effect != null && typeof modifier.effect !== 'function') {
                                    console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
                                }

                                break;

                            case 'requires':
                                if (modifier.requires != null && !Array.isArray(modifier.requires)) {
                                    console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
                                }

                                break;

                            case 'requiresIfExists':
                                if (!Array.isArray(modifier.requiresIfExists)) {
                                    console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
                                }

                                break;

                            case 'options':
                            case 'data':
                                break;

                            default:
                                console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
                                    return "\"" + s + "\"";
                                }).join(', ') + "; but \"" + key + "\" was provided.");
                        }

                        modifier.requires && modifier.requires.forEach(function (requirement) {
                            if (modifiers.find(function (mod) {
                                return mod.name === requirement;
                            }) == null) {
                                console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
                            }
                        });
                    });
                });
            }

            /***/ }),

        /***/ "./node_modules/@popperjs/core/lib/utils/within.js":
        /*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ within)
                /* harmony export */ });
            /* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

            function within(min, value, max) {
                return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
            }

            /***/ }),

        /***/ "./node_modules/bootstrap/js/dist/base-component.js":
        /*!**********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/base-component.js ***!
  \**********************************************************/
        /***/ (function(module, __unused_webpack_exports, __webpack_require__) {

            /*!
  * Bootstrap base-component.js v5.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
            (function (global, factory) {
                true ? module.exports = factory(__webpack_require__(/*! ./dom/data.js */ "./node_modules/bootstrap/js/dist/dom/data.js"), __webpack_require__(/*! ./dom/event-handler.js */ "./node_modules/bootstrap/js/dist/dom/event-handler.js")) :
                    0;
            }(this, (function (Data, EventHandler) { 'use strict';

                function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

                var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
                var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): util/index.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */
                const MILLISECONDS_MULTIPLIER = 1000;
                const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

                const getTransitionDurationFromElement = element => {
                    if (!element) {
                        return 0;
                    } // Get transition-duration of the element


                    let {
                        transitionDuration,
                        transitionDelay
                    } = window.getComputedStyle(element);
                    const floatTransitionDuration = Number.parseFloat(transitionDuration);
                    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

                    if (!floatTransitionDuration && !floatTransitionDelay) {
                        return 0;
                    } // If multiple durations are defined, take the first


                    transitionDuration = transitionDuration.split(',')[0];
                    transitionDelay = transitionDelay.split(',')[0];
                    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
                };

                const triggerTransitionEnd = element => {
                    element.dispatchEvent(new Event(TRANSITION_END));
                };

                const isElement = obj => {
                    if (!obj || typeof obj !== 'object') {
                        return false;
                    }

                    if (typeof obj.jquery !== 'undefined') {
                        obj = obj[0];
                    }

                    return typeof obj.nodeType !== 'undefined';
                };

                const getElement = obj => {
                    if (isElement(obj)) {
                        // it's a jQuery object or a node element
                        return obj.jquery ? obj[0] : obj;
                    }

                    if (typeof obj === 'string' && obj.length > 0) {
                        return document.querySelector(obj);
                    }

                    return null;
                };

                const execute = callback => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                };

                const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
                    if (!waitForTransition) {
                        execute(callback);
                        return;
                    }

                    const durationPadding = 5;
                    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
                    let called = false;

                    const handler = ({
                                         target
                                     }) => {
                        if (target !== transitionElement) {
                            return;
                        }

                        called = true;
                        transitionElement.removeEventListener(TRANSITION_END, handler);
                        execute(callback);
                    };

                    transitionElement.addEventListener(TRANSITION_END, handler);
                    setTimeout(() => {
                        if (!called) {
                            triggerTransitionEnd(transitionElement);
                        }
                    }, emulatedDuration);
                };

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): base-component.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */
                /**
                 * ------------------------------------------------------------------------
                 * Constants
                 * ------------------------------------------------------------------------
                 */

                const VERSION = '5.1.1';

                class BaseComponent {
                    constructor(element) {
                        element = getElement(element);

                        if (!element) {
                            return;
                        }

                        this._element = element;
                        Data__default['default'].set(this._element, this.constructor.DATA_KEY, this);
                    }

                    dispose() {
                        Data__default['default'].remove(this._element, this.constructor.DATA_KEY);
                        EventHandler__default['default'].off(this._element, this.constructor.EVENT_KEY);
                        Object.getOwnPropertyNames(this).forEach(propertyName => {
                            this[propertyName] = null;
                        });
                    }

                    _queueCallback(callback, element, isAnimated = true) {
                        executeAfterTransition(callback, element, isAnimated);
                    }
                    /** Static */


                    static getInstance(element) {
                        return Data__default['default'].get(getElement(element), this.DATA_KEY);
                    }

                    static getOrCreateInstance(element, config = {}) {
                        return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
                    }

                    static get VERSION() {
                        return VERSION;
                    }

                    static get NAME() {
                        throw new Error('You have to implement the static method "NAME", for each component!');
                    }

                    static get DATA_KEY() {
                        return `bs.${this.NAME}`;
                    }

                    static get EVENT_KEY() {
                        return `.${this.DATA_KEY}`;
                    }

                }

                return BaseComponent;

            })));
//# sourceMappingURL=base-component.js.map


            /***/ }),

        /***/ "./node_modules/bootstrap/js/dist/dom/data.js":
        /*!****************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/data.js ***!
  \****************************************************/
        /***/ (function(module) {

            /*!
  * Bootstrap data.js v5.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
            (function (global, factory) {
                true ? module.exports = factory() :
                    0;
            }(this, (function () { 'use strict';

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): dom/data.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */

                /**
                 * ------------------------------------------------------------------------
                 * Constants
                 * ------------------------------------------------------------------------
                 */
                const elementMap = new Map();
                var data = {
                    set(element, key, instance) {
                        if (!elementMap.has(element)) {
                            elementMap.set(element, new Map());
                        }

                        const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
                        // can be removed later when multiple key/instances are fine to be used

                        if (!instanceMap.has(key) && instanceMap.size !== 0) {
                            // eslint-disable-next-line no-console
                            console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
                            return;
                        }

                        instanceMap.set(key, instance);
                    },

                    get(element, key) {
                        if (elementMap.has(element)) {
                            return elementMap.get(element).get(key) || null;
                        }

                        return null;
                    },

                    remove(element, key) {
                        if (!elementMap.has(element)) {
                            return;
                        }

                        const instanceMap = elementMap.get(element);
                        instanceMap.delete(key); // free up element references if there are no instances left for an element

                        if (instanceMap.size === 0) {
                            elementMap.delete(element);
                        }
                    }

                };

                return data;

            })));
//# sourceMappingURL=data.js.map


            /***/ }),

        /***/ "./node_modules/bootstrap/js/dist/dom/event-handler.js":
        /*!*************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/event-handler.js ***!
  \*************************************************************/
        /***/ (function(module) {

            /*!
  * Bootstrap event-handler.js v5.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
            (function (global, factory) {
                true ? module.exports = factory() :
                    0;
            }(this, (function () { 'use strict';

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): util/index.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */

                const getjQuery = () => {
                    const {
                        jQuery
                    } = window;

                    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
                        return jQuery;
                    }

                    return null;
                };

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): dom/event-handler.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */
                /**
                 * ------------------------------------------------------------------------
                 * Constants
                 * ------------------------------------------------------------------------
                 */

                const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
                const stripNameRegex = /\..*/;
                const stripUidRegex = /::\d+$/;
                const eventRegistry = {}; // Events storage

                let uidEvent = 1;
                const customEvents = {
                    mouseenter: 'mouseover',
                    mouseleave: 'mouseout'
                };
                const customEventsRegex = /^(mouseenter|mouseleave)/i;
                const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
                /**
                 * ------------------------------------------------------------------------
                 * Private methods
                 * ------------------------------------------------------------------------
                 */

                function getUidEvent(element, uid) {
                    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
                }

                function getEvent(element) {
                    const uid = getUidEvent(element);
                    element.uidEvent = uid;
                    eventRegistry[uid] = eventRegistry[uid] || {};
                    return eventRegistry[uid];
                }

                function bootstrapHandler(element, fn) {
                    return function handler(event) {
                        event.delegateTarget = element;

                        if (handler.oneOff) {
                            EventHandler.off(element, event.type, fn);
                        }

                        return fn.apply(element, [event]);
                    };
                }

                function bootstrapDelegationHandler(element, selector, fn) {
                    return function handler(event) {
                        const domElements = element.querySelectorAll(selector);

                        for (let {
                            target
                        } = event; target && target !== this; target = target.parentNode) {
                            for (let i = domElements.length; i--;) {
                                if (domElements[i] === target) {
                                    event.delegateTarget = target;

                                    if (handler.oneOff) {
                                        EventHandler.off(element, event.type, selector, fn);
                                    }

                                    return fn.apply(target, [event]);
                                }
                            }
                        } // To please ESLint


                        return null;
                    };
                }

                function findHandler(events, handler, delegationSelector = null) {
                    const uidEventList = Object.keys(events);

                    for (let i = 0, len = uidEventList.length; i < len; i++) {
                        const event = events[uidEventList[i]];

                        if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
                            return event;
                        }
                    }

                    return null;
                }

                function normalizeParams(originalTypeEvent, handler, delegationFn) {
                    const delegation = typeof handler === 'string';
                    const originalHandler = delegation ? delegationFn : handler;
                    let typeEvent = getTypeEvent(originalTypeEvent);
                    const isNative = nativeEvents.has(typeEvent);

                    if (!isNative) {
                        typeEvent = originalTypeEvent;
                    }

                    return [delegation, originalHandler, typeEvent];
                }

                function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
                    if (typeof originalTypeEvent !== 'string' || !element) {
                        return;
                    }

                    if (!handler) {
                        handler = delegationFn;
                        delegationFn = null;
                    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
                    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


                    if (customEventsRegex.test(originalTypeEvent)) {
                        const wrapFn = fn => {
                            return function (event) {
                                if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                                    return fn.call(this, event);
                                }
                            };
                        };

                        if (delegationFn) {
                            delegationFn = wrapFn(delegationFn);
                        } else {
                            handler = wrapFn(handler);
                        }
                    }

                    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
                    const events = getEvent(element);
                    const handlers = events[typeEvent] || (events[typeEvent] = {});
                    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

                    if (previousFn) {
                        previousFn.oneOff = previousFn.oneOff && oneOff;
                        return;
                    }

                    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
                    const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
                    fn.delegationSelector = delegation ? handler : null;
                    fn.originalHandler = originalHandler;
                    fn.oneOff = oneOff;
                    fn.uidEvent = uid;
                    handlers[uid] = fn;
                    element.addEventListener(typeEvent, fn, delegation);
                }

                function removeHandler(element, events, typeEvent, handler, delegationSelector) {
                    const fn = findHandler(events[typeEvent], handler, delegationSelector);

                    if (!fn) {
                        return;
                    }

                    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
                    delete events[typeEvent][fn.uidEvent];
                }

                function removeNamespacedHandlers(element, events, typeEvent, namespace) {
                    const storeElementEvent = events[typeEvent] || {};
                    Object.keys(storeElementEvent).forEach(handlerKey => {
                        if (handlerKey.includes(namespace)) {
                            const event = storeElementEvent[handlerKey];
                            removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
                        }
                    });
                }

                function getTypeEvent(event) {
                    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
                    event = event.replace(stripNameRegex, '');
                    return customEvents[event] || event;
                }

                const EventHandler = {
                    on(element, event, handler, delegationFn) {
                        addHandler(element, event, handler, delegationFn, false);
                    },

                    one(element, event, handler, delegationFn) {
                        addHandler(element, event, handler, delegationFn, true);
                    },

                    off(element, originalTypeEvent, handler, delegationFn) {
                        if (typeof originalTypeEvent !== 'string' || !element) {
                            return;
                        }

                        const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
                        const inNamespace = typeEvent !== originalTypeEvent;
                        const events = getEvent(element);
                        const isNamespace = originalTypeEvent.startsWith('.');

                        if (typeof originalHandler !== 'undefined') {
                            // Simplest case: handler is passed, remove that listener ONLY.
                            if (!events || !events[typeEvent]) {
                                return;
                            }

                            removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
                            return;
                        }

                        if (isNamespace) {
                            Object.keys(events).forEach(elementEvent => {
                                removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
                            });
                        }

                        const storeElementEvent = events[typeEvent] || {};
                        Object.keys(storeElementEvent).forEach(keyHandlers => {
                            const handlerKey = keyHandlers.replace(stripUidRegex, '');

                            if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
                                const event = storeElementEvent[keyHandlers];
                                removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
                            }
                        });
                    },

                    trigger(element, event, args) {
                        if (typeof event !== 'string' || !element) {
                            return null;
                        }

                        const $ = getjQuery();
                        const typeEvent = getTypeEvent(event);
                        const inNamespace = event !== typeEvent;
                        const isNative = nativeEvents.has(typeEvent);
                        let jQueryEvent;
                        let bubbles = true;
                        let nativeDispatch = true;
                        let defaultPrevented = false;
                        let evt = null;

                        if (inNamespace && $) {
                            jQueryEvent = $.Event(event, args);
                            $(element).trigger(jQueryEvent);
                            bubbles = !jQueryEvent.isPropagationStopped();
                            nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
                            defaultPrevented = jQueryEvent.isDefaultPrevented();
                        }

                        if (isNative) {
                            evt = document.createEvent('HTMLEvents');
                            evt.initEvent(typeEvent, bubbles, true);
                        } else {
                            evt = new CustomEvent(event, {
                                bubbles,
                                cancelable: true
                            });
                        } // merge custom information in our event


                        if (typeof args !== 'undefined') {
                            Object.keys(args).forEach(key => {
                                Object.defineProperty(evt, key, {
                                    get() {
                                        return args[key];
                                    }

                                });
                            });
                        }

                        if (defaultPrevented) {
                            evt.preventDefault();
                        }

                        if (nativeDispatch) {
                            element.dispatchEvent(evt);
                        }

                        if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
                            jQueryEvent.preventDefault();
                        }

                        return evt;
                    }

                };

                return EventHandler;

            })));
//# sourceMappingURL=event-handler.js.map


            /***/ }),

        /***/ "./node_modules/bootstrap/js/dist/dom/manipulator.js":
        /*!***********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/manipulator.js ***!
  \***********************************************************/
        /***/ (function(module) {

            /*!
  * Bootstrap manipulator.js v5.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
            (function (global, factory) {
                true ? module.exports = factory() :
                    0;
            }(this, (function () { 'use strict';

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): dom/manipulator.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */
                function normalizeData(val) {
                    if (val === 'true') {
                        return true;
                    }

                    if (val === 'false') {
                        return false;
                    }

                    if (val === Number(val).toString()) {
                        return Number(val);
                    }

                    if (val === '' || val === 'null') {
                        return null;
                    }

                    return val;
                }

                function normalizeDataKey(key) {
                    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
                }

                const Manipulator = {
                    setDataAttribute(element, key, value) {
                        element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
                    },

                    removeDataAttribute(element, key) {
                        element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
                    },

                    getDataAttributes(element) {
                        if (!element) {
                            return {};
                        }

                        const attributes = {};
                        Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
                            let pureKey = key.replace(/^bs/, '');
                            pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
                            attributes[pureKey] = normalizeData(element.dataset[key]);
                        });
                        return attributes;
                    },

                    getDataAttribute(element, key) {
                        return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
                    },

                    offset(element) {
                        const rect = element.getBoundingClientRect();
                        return {
                            top: rect.top + window.pageYOffset,
                            left: rect.left + window.pageXOffset
                        };
                    },

                    position(element) {
                        return {
                            top: element.offsetTop,
                            left: element.offsetLeft
                        };
                    }

                };

                return Manipulator;

            })));
//# sourceMappingURL=manipulator.js.map


            /***/ }),

        /***/ "./node_modules/bootstrap/js/dist/dom/selector-engine.js":
        /*!***************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/selector-engine.js ***!
  \***************************************************************/
        /***/ (function(module) {

            /*!
  * Bootstrap selector-engine.js v5.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
            (function (global, factory) {
                true ? module.exports = factory() :
                    0;
            }(this, (function () { 'use strict';

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): util/index.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */

                const isElement = obj => {
                    if (!obj || typeof obj !== 'object') {
                        return false;
                    }

                    if (typeof obj.jquery !== 'undefined') {
                        obj = obj[0];
                    }

                    return typeof obj.nodeType !== 'undefined';
                };

                const isVisible = element => {
                    if (!isElement(element) || element.getClientRects().length === 0) {
                        return false;
                    }

                    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
                };

                const isDisabled = element => {
                    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
                        return true;
                    }

                    if (element.classList.contains('disabled')) {
                        return true;
                    }

                    if (typeof element.disabled !== 'undefined') {
                        return element.disabled;
                    }

                    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
                };

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): dom/selector-engine.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */
                const NODE_TEXT = 3;
                const SelectorEngine = {
                    find(selector, element = document.documentElement) {
                        return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
                    },

                    findOne(selector, element = document.documentElement) {
                        return Element.prototype.querySelector.call(element, selector);
                    },

                    children(element, selector) {
                        return [].concat(...element.children).filter(child => child.matches(selector));
                    },

                    parents(element, selector) {
                        const parents = [];
                        let ancestor = element.parentNode;

                        while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
                            if (ancestor.matches(selector)) {
                                parents.push(ancestor);
                            }

                            ancestor = ancestor.parentNode;
                        }

                        return parents;
                    },

                    prev(element, selector) {
                        let previous = element.previousElementSibling;

                        while (previous) {
                            if (previous.matches(selector)) {
                                return [previous];
                            }

                            previous = previous.previousElementSibling;
                        }

                        return [];
                    },

                    next(element, selector) {
                        let next = element.nextElementSibling;

                        while (next) {
                            if (next.matches(selector)) {
                                return [next];
                            }

                            next = next.nextElementSibling;
                        }

                        return [];
                    },

                    focusableChildren(element) {
                        const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
                        return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
                    }

                };

                return SelectorEngine;

            })));
//# sourceMappingURL=selector-engine.js.map


            /***/ }),

        /***/ "./node_modules/bootstrap/js/dist/dropdown.js":
        /*!****************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dropdown.js ***!
  \****************************************************/
        /***/ (function(module, __unused_webpack_exports, __webpack_require__) {

            /*!
  * Bootstrap dropdown.js v5.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
            (function (global, factory) {
                true ? module.exports = factory(__webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js"), __webpack_require__(/*! ./dom/event-handler.js */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./dom/manipulator.js */ "./node_modules/bootstrap/js/dist/dom/manipulator.js"), __webpack_require__(/*! ./dom/selector-engine.js */ "./node_modules/bootstrap/js/dist/dom/selector-engine.js"), __webpack_require__(/*! ./base-component.js */ "./node_modules/bootstrap/js/dist/base-component.js")) :
                    0;
            }(this, (function (Popper, EventHandler, Manipulator, SelectorEngine, BaseComponent) { 'use strict';

                function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

                function _interopNamespace(e) {
                    if (e && e.__esModule) return e;
                    var n = Object.create(null);
                    if (e) {
                        Object.keys(e).forEach(function (k) {
                            if (k !== 'default') {
                                var d = Object.getOwnPropertyDescriptor(e, k);
                                Object.defineProperty(n, k, d.get ? d : {
                                    enumerable: true,
                                    get: function () {
                                        return e[k];
                                    }
                                });
                            }
                        });
                    }
                    n['default'] = e;
                    return Object.freeze(n);
                }

                var Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
                var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
                var Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
                var SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
                var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): util/index.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */

                const toType = obj => {
                    if (obj === null || obj === undefined) {
                        return `${obj}`;
                    }

                    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
                };

                const getSelector = element => {
                    let selector = element.getAttribute('data-bs-target');

                    if (!selector || selector === '#') {
                        let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
                        // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
                        // `document.querySelector` will rightfully complain it is invalid.
                        // See https://github.com/twbs/bootstrap/issues/32273

                        if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
                            return null;
                        } // Just in case some CMS puts out a full URL with the anchor appended


                        if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
                            hrefAttr = `#${hrefAttr.split('#')[1]}`;
                        }

                        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
                    }

                    return selector;
                };

                const getElementFromSelector = element => {
                    const selector = getSelector(element);
                    return selector ? document.querySelector(selector) : null;
                };

                const isElement = obj => {
                    if (!obj || typeof obj !== 'object') {
                        return false;
                    }

                    if (typeof obj.jquery !== 'undefined') {
                        obj = obj[0];
                    }

                    return typeof obj.nodeType !== 'undefined';
                };

                const getElement = obj => {
                    if (isElement(obj)) {
                        // it's a jQuery object or a node element
                        return obj.jquery ? obj[0] : obj;
                    }

                    if (typeof obj === 'string' && obj.length > 0) {
                        return document.querySelector(obj);
                    }

                    return null;
                };

                const typeCheckConfig = (componentName, config, configTypes) => {
                    Object.keys(configTypes).forEach(property => {
                        const expectedTypes = configTypes[property];
                        const value = config[property];
                        const valueType = value && isElement(value) ? 'element' : toType(value);

                        if (!new RegExp(expectedTypes).test(valueType)) {
                            throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
                        }
                    });
                };

                const isVisible = element => {
                    if (!isElement(element) || element.getClientRects().length === 0) {
                        return false;
                    }

                    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
                };

                const isDisabled = element => {
                    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
                        return true;
                    }

                    if (element.classList.contains('disabled')) {
                        return true;
                    }

                    if (typeof element.disabled !== 'undefined') {
                        return element.disabled;
                    }

                    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
                };

                const noop = () => {};

                const getjQuery = () => {
                    const {
                        jQuery
                    } = window;

                    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
                        return jQuery;
                    }

                    return null;
                };

                const DOMContentLoadedCallbacks = [];

                const onDOMContentLoaded = callback => {
                    if (document.readyState === 'loading') {
                        // add listener on the first call when the document is in loading state
                        if (!DOMContentLoadedCallbacks.length) {
                            document.addEventListener('DOMContentLoaded', () => {
                                DOMContentLoadedCallbacks.forEach(callback => callback());
                            });
                        }

                        DOMContentLoadedCallbacks.push(callback);
                    } else {
                        callback();
                    }
                };

                const isRTL = () => document.documentElement.dir === 'rtl';

                const defineJQueryPlugin = plugin => {
                    onDOMContentLoaded(() => {
                        const $ = getjQuery();
                        /* istanbul ignore if */

                        if ($) {
                            const name = plugin.NAME;
                            const JQUERY_NO_CONFLICT = $.fn[name];
                            $.fn[name] = plugin.jQueryInterface;
                            $.fn[name].Constructor = plugin;

                            $.fn[name].noConflict = () => {
                                $.fn[name] = JQUERY_NO_CONFLICT;
                                return plugin.jQueryInterface;
                            };
                        }
                    });
                };
                /**
                 * Return the previous/next element of a list.
                 *
                 * @param {array} list    The list of elements
                 * @param activeElement   The active element
                 * @param shouldGetNext   Choose to get next or previous element
                 * @param isCycleAllowed
                 * @return {Element|elem} The proper element
                 */


                const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
                    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

                    if (index === -1) {
                        return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
                    }

                    const listLength = list.length;
                    index += shouldGetNext ? 1 : -1;

                    if (isCycleAllowed) {
                        index = (index + listLength) % listLength;
                    }

                    return list[Math.max(0, Math.min(index, listLength - 1))];
                };

                /**
                 * --------------------------------------------------------------------------
                 * Bootstrap (v5.1.1): dropdown.js
                 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
                 * --------------------------------------------------------------------------
                 */
                /**
                 * ------------------------------------------------------------------------
                 * Constants
                 * ------------------------------------------------------------------------
                 */

                const NAME = 'dropdown';
                const DATA_KEY = 'bs.dropdown';
                const EVENT_KEY = `.${DATA_KEY}`;
                const DATA_API_KEY = '.data-api';
                const ESCAPE_KEY = 'Escape';
                const SPACE_KEY = 'Space';
                const TAB_KEY = 'Tab';
                const ARROW_UP_KEY = 'ArrowUp';
                const ARROW_DOWN_KEY = 'ArrowDown';
                const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

                const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`);
                const EVENT_HIDE = `hide${EVENT_KEY}`;
                const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
                const EVENT_SHOW = `show${EVENT_KEY}`;
                const EVENT_SHOWN = `shown${EVENT_KEY}`;
                const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
                const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
                const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
                const CLASS_NAME_SHOW = 'show';
                const CLASS_NAME_DROPUP = 'dropup';
                const CLASS_NAME_DROPEND = 'dropend';
                const CLASS_NAME_DROPSTART = 'dropstart';
                const CLASS_NAME_NAVBAR = 'navbar';
                const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]';
                const SELECTOR_MENU = '.dropdown-menu';
                const SELECTOR_NAVBAR_NAV = '.navbar-nav';
                const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
                const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
                const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
                const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
                const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
                const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
                const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
                const Default = {
                    offset: [0, 2],
                    boundary: 'clippingParents',
                    reference: 'toggle',
                    display: 'dynamic',
                    popperConfig: null,
                    autoClose: true
                };
                const DefaultType = {
                    offset: '(array|string|function)',
                    boundary: '(string|element)',
                    reference: '(string|element|object)',
                    display: 'string',
                    popperConfig: '(null|object|function)',
                    autoClose: '(boolean|string)'
                };
                /**
                 * ------------------------------------------------------------------------
                 * Class Definition
                 * ------------------------------------------------------------------------
                 */

                class Dropdown extends BaseComponent__default['default'] {
                    constructor(element, config) {
                        super(element);
                        this._popper = null;
                        this._config = this._getConfig(config);
                        this._menu = this._getMenuElement();
                        this._inNavbar = this._detectNavbar();
                    } // Getters


                    static get Default() {
                        return Default;
                    }

                    static get DefaultType() {
                        return DefaultType;
                    }

                    static get NAME() {
                        return NAME;
                    } // Public


                    toggle() {
                        return this._isShown() ? this.hide() : this.show();
                    }

                    show() {
                        if (isDisabled(this._element) || this._isShown(this._menu)) {
                            return;
                        }

                        const relatedTarget = {
                            relatedTarget: this._element
                        };
                        const showEvent = EventHandler__default['default'].trigger(this._element, EVENT_SHOW, relatedTarget);

                        if (showEvent.defaultPrevented) {
                            return;
                        }

                        const parent = Dropdown.getParentFromElement(this._element); // Totally disable Popper for Dropdowns in Navbar

                        if (this._inNavbar) {
                            Manipulator__default['default'].setDataAttribute(this._menu, 'popper', 'none');
                        } else {
                            this._createPopper(parent);
                        } // If this is a touch-enabled device we add extra
                        // empty mouseover listeners to the body's immediate children;
                        // only needed because of broken event delegation on iOS
                        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


                        if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
                            [].concat(...document.body.children).forEach(elem => EventHandler__default['default'].on(elem, 'mouseover', noop));
                        }

                        this._element.focus();

                        this._element.setAttribute('aria-expanded', true);

                        this._menu.classList.add(CLASS_NAME_SHOW);

                        this._element.classList.add(CLASS_NAME_SHOW);

                        EventHandler__default['default'].trigger(this._element, EVENT_SHOWN, relatedTarget);
                    }

                    hide() {
                        if (isDisabled(this._element) || !this._isShown(this._menu)) {
                            return;
                        }

                        const relatedTarget = {
                            relatedTarget: this._element
                        };

                        this._completeHide(relatedTarget);
                    }

                    dispose() {
                        if (this._popper) {
                            this._popper.destroy();
                        }

                        super.dispose();
                    }

                    update() {
                        this._inNavbar = this._detectNavbar();

                        if (this._popper) {
                            this._popper.update();
                        }
                    } // Private


                    _completeHide(relatedTarget) {
                        const hideEvent = EventHandler__default['default'].trigger(this._element, EVENT_HIDE, relatedTarget);

                        if (hideEvent.defaultPrevented) {
                            return;
                        } // If this is a touch-enabled device we remove the extra
                        // empty mouseover listeners we added for iOS support


                        if ('ontouchstart' in document.documentElement) {
                            [].concat(...document.body.children).forEach(elem => EventHandler__default['default'].off(elem, 'mouseover', noop));
                        }

                        if (this._popper) {
                            this._popper.destroy();
                        }

                        this._menu.classList.remove(CLASS_NAME_SHOW);

                        this._element.classList.remove(CLASS_NAME_SHOW);

                        this._element.setAttribute('aria-expanded', 'false');

                        Manipulator__default['default'].removeDataAttribute(this._menu, 'popper');
                        EventHandler__default['default'].trigger(this._element, EVENT_HIDDEN, relatedTarget);
                    }

                    _getConfig(config) {
                        config = { ...this.constructor.Default,
                            ...Manipulator__default['default'].getDataAttributes(this._element),
                            ...config
                        };
                        typeCheckConfig(NAME, config, this.constructor.DefaultType);

                        if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
                            // Popper virtual elements require a getBoundingClientRect method
                            throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
                        }

                        return config;
                    }

                    _createPopper(parent) {
                        if (typeof Popper__namespace === 'undefined') {
                            throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
                        }

                        let referenceElement = this._element;

                        if (this._config.reference === 'parent') {
                            referenceElement = parent;
                        } else if (isElement(this._config.reference)) {
                            referenceElement = getElement(this._config.reference);
                        } else if (typeof this._config.reference === 'object') {
                            referenceElement = this._config.reference;
                        }

                        const popperConfig = this._getPopperConfig();

                        const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
                        this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);

                        if (isDisplayStatic) {
                            Manipulator__default['default'].setDataAttribute(this._menu, 'popper', 'static');
                        }
                    }

                    _isShown(element = this._element) {
                        return element.classList.contains(CLASS_NAME_SHOW);
                    }

                    _getMenuElement() {
                        return SelectorEngine__default['default'].next(this._element, SELECTOR_MENU)[0];
                    }

                    _getPlacement() {
                        const parentDropdown = this._element.parentNode;

                        if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
                            return PLACEMENT_RIGHT;
                        }

                        if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
                            return PLACEMENT_LEFT;
                        } // We need to trim the value because custom properties can also include spaces


                        const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

                        if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
                            return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
                        }

                        return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
                    }

                    _detectNavbar() {
                        return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
                    }

                    _getOffset() {
                        const {
                            offset
                        } = this._config;

                        if (typeof offset === 'string') {
                            return offset.split(',').map(val => Number.parseInt(val, 10));
                        }

                        if (typeof offset === 'function') {
                            return popperData => offset(popperData, this._element);
                        }

                        return offset;
                    }

                    _getPopperConfig() {
                        const defaultBsPopperConfig = {
                            placement: this._getPlacement(),
                            modifiers: [{
                                name: 'preventOverflow',
                                options: {
                                    boundary: this._config.boundary
                                }
                            }, {
                                name: 'offset',
                                options: {
                                    offset: this._getOffset()
                                }
                            }]
                        }; // Disable Popper if we have a static display

                        if (this._config.display === 'static') {
                            defaultBsPopperConfig.modifiers = [{
                                name: 'applyStyles',
                                enabled: false
                            }];
                        }

                        return { ...defaultBsPopperConfig,
                            ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
                        };
                    }

                    _selectMenuItem({
                                        key,
                                        target
                                    }) {
                        const items = SelectorEngine__default['default'].find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

                        if (!items.length) {
                            return;
                        } // if target isn't included in items (e.g. when expanding the dropdown)
                        // allow cycling to get the last item in case key equals ARROW_UP_KEY


                        getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
                    } // Static


                    static jQueryInterface(config) {
                        return this.each(function () {
                            const data = Dropdown.getOrCreateInstance(this, config);

                            if (typeof config !== 'string') {
                                return;
                            }

                            if (typeof data[config] === 'undefined') {
                                throw new TypeError(`No method named "${config}"`);
                            }

                            data[config]();
                        });
                    }

                    static clearMenus(event) {
                        if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
                            return;
                        }

                        const toggles = SelectorEngine__default['default'].find(SELECTOR_DATA_TOGGLE);

                        for (let i = 0, len = toggles.length; i < len; i++) {
                            const context = Dropdown.getInstance(toggles[i]);

                            if (!context || context._config.autoClose === false) {
                                continue;
                            }

                            if (!context._isShown()) {
                                continue;
                            }

                            const relatedTarget = {
                                relatedTarget: context._element
                            };

                            if (event) {
                                const composedPath = event.composedPath();
                                const isMenuTarget = composedPath.includes(context._menu);

                                if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
                                    continue;
                                } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


                                if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
                                    continue;
                                }

                                if (event.type === 'click') {
                                    relatedTarget.clickEvent = event;
                                }
                            }

                            context._completeHide(relatedTarget);
                        }
                    }

                    static getParentFromElement(element) {
                        return getElementFromSelector(element) || element.parentNode;
                    }

                    static dataApiKeydownHandler(event) {
                        // If not input/textarea:
                        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
                        // If input/textarea:
                        //  - If space key => not a dropdown command
                        //  - If key is other than escape
                        //    - If key is not up or down => not a dropdown command
                        //    - If trigger inside the menu => not a dropdown command
                        if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
                            return;
                        }

                        const isActive = this.classList.contains(CLASS_NAME_SHOW);

                        if (!isActive && event.key === ESCAPE_KEY) {
                            return;
                        }

                        event.preventDefault();
                        event.stopPropagation();

                        if (isDisabled(this)) {
                            return;
                        }

                        const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default['default'].prev(this, SELECTOR_DATA_TOGGLE)[0];
                        const instance = Dropdown.getOrCreateInstance(getToggleButton);

                        if (event.key === ESCAPE_KEY) {
                            instance.hide();
                            return;
                        }

                        if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
                            if (!isActive) {
                                instance.show();
                            }

                            instance._selectMenuItem(event);

                            return;
                        }

                        if (!isActive || event.key === SPACE_KEY) {
                            Dropdown.clearMenus();
                        }
                    }

                }
                /**
                 * ------------------------------------------------------------------------
                 * Data Api implementation
                 * ------------------------------------------------------------------------
                 */


                EventHandler__default['default'].on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
                EventHandler__default['default'].on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
                EventHandler__default['default'].on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
                EventHandler__default['default'].on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
                EventHandler__default['default'].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
                    event.preventDefault();
                    Dropdown.getOrCreateInstance(this).toggle();
                });
                /**
                 * ------------------------------------------------------------------------
                 * jQuery
                 * ------------------------------------------------------------------------
                 * add .Dropdown to jQuery only if jQuery is present
                 */

                defineJQueryPlugin(Dropdown);

                return Dropdown;

            })));
//# sourceMappingURL=dropdown.js.map


            /***/ }),

        /***/ "./src/sass/main.scss":
        /*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


            /***/ }),

        /***/ "./src/js/data/recipes.js":
        /*!********************************!*\
  !*** ./src/js/data/recipes.js ***!
  \********************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "recipes": () => (/* binding */ recipes)
                /* harmony export */ });
            const recipes = [
                {
                    "id": 1,
                    "name" : "Limonade de Coco",
                    "servings" : 1,
                    "ingredients": [
                        {
                            "ingredient" : "Lait de coco",
                            "quantity" : 400,
                            "unit" : "ml"
                        },
                        {
                            "ingredient" : "Jus de citron",
                            "quantity" : 2
                        },
                        {
                            "ingredient" : "Crème de coco",
                            "quantity" : 2,
                            "unit" : "cuillères à soupe"
                        },
                        {
                            "ingredient" : "Sucre",
                            "quantite" : 30,
                            "unit" : "grammes"
                        },
                        {
                            "ingredient": "Glaçons"
                        }
                    ],
                    "time": 10,
                    "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
                    "appliance": "Blender",
                    "ustensils": ["cuillère à Soupe", "verres", "presse citron" ],
                    "image": "limonade-de-coco.jpg"
                },
                {
                    "id": 2,
                    "name" : "Poisson Cru à la tahitienne",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient" : "Thon Rouge (ou blanc)",
                            "quantity" : 200,
                            "unit" : "grammes"
                        },
                        {
                            "ingredient" : "Concombre",
                            "quantity" : 1
                        },
                        {
                            "ingredient" : "Tomate",
                            "quantity" : 2
                        },
                        {
                            "ingredient" : "Carotte",
                            "quantite" : 1
                        },
                        {
                            "ingredient" : "Citron Vert",
                            "quantity" : 5
                        },
                        {
                            "ingredient" : "Lait de Coco",
                            "quantity" : 100,
                            "unit" : "ml"
                        }
                    ],
                    "time": 60,
                    "description": "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouver ajouter 1 à 2 cuillères à soupe de Crème de coco",
                    "appliance": "Saladier",
                    "ustensils": ["presse citron"],
                    "image": "poisson-cru-a-la-tahitienne.jpg"
                },{
                    "id": 3,
                    "name": "Poulet coco réunionnais",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Poulet",
                            "quantity" : 1
                        },
                        {
                            "ingredient": "Lait de coco",
                            "quantity" : 400,
                            "unit" : "ml"
                        },
                        {
                            "ingredient": "Coulis de tomate",
                            "quantity" : 25,
                            "unit" : "cl"
                        },
                        {
                            "ingredient": "Oignon",
                            "quantity" : 1
                        },
                        {
                            "ingredient": "Poivron rouge",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Huile d'olive"
                        }
                    ],
                    "time": 80,
                    "description": "Découper le poulet en morceaux, les faire dorer dans une cocotte avec de l'huile d'olive. Salez et poivrez. Une fois doré, laisser cuire en ajoutant de l'eau. Au bout de 30 minutes, ajouter le coulis de tomate, le lait de coco ainsi que le poivron et l'oignon découpés en morceaux. Laisser cuisiner 30 minutes de plus. Servir avec du riz",
                    "appliance": "Cocotte",
                    "ustensils": ["couteau"],
                    "image": "poulet-coco-reunionnais.jpg"
                },{
                    "id": 4,
                    "name": "Salade de riz",
                    "servings": 4,
                    "ingredients":[
                        {
                            "ingredient": "Riz blanc",
                            "quantity": 500,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Thon en miettes",
                            "quantity": 200,
                            "unit": "grammes"
                        },{
                            "ingredient": "Tomate",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Oeuf dur",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Maïs",
                            "quantity": 300,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Vinaigrette",
                            "quantity": 5,
                            "unit": "cl"
                        }
                    ],
                    "time": 50,
                    "description": "Faire cuire le riz. Une fois le riz cuit, le laisser refroidir. Couper les oeufs dur en quarts ou en lamelle au choix, coupez le tomates en dés, ajouter au riz les oeufs, les tomates, le poisson, le maïs et la vinaigrette. Ajouter au gout de chacun des corniches, olives etc..",
                    "appliance": "Cuiseur de riz",
                    "ustensils": ["saladier", "passoire"],
                    "image": "salade-de-riz.jpg"
                },
                {
                    "id": 5,
                    "name": "Tarte au thon",
                    "servings": 4,
                    "ingredients":[
                        {
                            "ingredient": "Pâte feuilletée",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Thon en miettes",
                            "quantity": 130,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Tomate",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Crème fraiche",
                            "quantity": 2,
                            "unit": "cuillères à soupe"
                        },
                        {
                            "ingredient": "gruyère râpé",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Moutarde de Dijon",
                            "quantity": 1,
                            "unite": "cuillères à soupe"
                        }
                    ],
                    "time": 45,
                    "description": "Etaler la pâte feuilleté aux dimensions du moule, étaler la moutarde sur la pâte feuilleté, ajouter le thon. Découper les tomates en rondelles et les poser sur le poisson, ajouter un peu de crème fraiche sur toute la tarte et recouvrez de gruyère râpé. Cuire au four 30 minutes",
                    "appliance":"Four",
                    "ustensils": ["moule à tarte", "râpe à fromage", "couteau"],
                    "image": "tarte-au-thon.jpg"
                },
                {
                    "id": 6,
                    "name": "Tarte aux pommes",
                    "servings": 6,
                    "ingredients":[
                        {
                            "ingredient": "Pâte brisée",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Pomme",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": "2"
                        },
                        {
                            "ingredient":"Crème fraiche",
                            "quantity":25,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Sucre en Poudre",
                            "quantity": 100,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Sucre vanillé",
                            "quantity": 1,
                            "unit": "sachets"

                        }
                    ],
                    "time": 50,
                    "description": "Commencez par mélanger les oeufs le sucre et le sucre vanillé dans un saladier, découper les pommes en tranches, ajouter la crème fraiche aux oeufs. Une fois que tout est pret, étalez la tarte dans le moule. N'oubliez pas de piquer le fond avec une fourchette avant depositionner les pommes sur la tarte. Finallement verser la préparation à base d'oeufs et de crême fraiche. Laisser cuire au four pendant 30 minutes",
                    "appliance": "Four",
                    "ustensils": ["moule à tarte", "saladier", "fourchette"],
                    "image": "tarte-aux-pommes.jpg"
                },{
                    "id": 7,
                    "name": "Tartelettes au chocolat et aux fraises",
                    "servings": 6,
                    "ingredients":[
                        {
                            "ingredient": "Pâte sablée",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Chocolat au lait",
                            "quantity": 300,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Crème liquide",
                            "quantity": 80,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": "30",
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Fraise",
                            "quantity": 6
                        }
                    ],
                    "time": 50,
                    "description": "Etaler la pate dans les moules à tartelette. Faire cuire la pate 30 minutes. Découper le chocolat en morceau et le faire chauffer, y ajouter la crême liquide, ajouter le beurre et remuer jusqu'à avoir une pâte homogène. Verser la pate sur les tartelettes. Couper les fraises en 2 et les positionner sur ",
                    "appliance":"Four",
                    "ustensils":["moule à tartelettes (6)", "casserolle"],
                    "image": "tartelettes-chocolat-fraise.jpg"
                }, {
                    "id": 8,
                    "name": "Brownie",
                    "servings": 10,
                    "ingredients":[
                        {
                            "ingredient": "Noix",
                            "quantity": "180",
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Chocolat noir",
                            "quantity": 150,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": 120,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Sucre en Poudre",
                            "quantity": "110",
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "farine",
                            "quantity": 90,
                            "unit": "grammes"
                        }

                    ],
                    "time": 60,
                    "description": "Hachez les noix grossièrement. Faire fondre le chocolat avec le beurre. Mélanger les oeuf et le sucre et mélanger au chocolat. Ajouter la farine. Mélanger afin d'avoir quelque chose d'homogène puis incorporer les noix. Verser la préparation dans un moule de préférence rectangulaire. Cuire 2O à 25 minutes à 180°. Sortez du four et attendez quelques minutes pour démouler. Servir avec une boule de glace pour plus de gourmandise.",
                    "appliance": "Four",
                    "ustensils": ["moule à gateaux", "casserolle"],
                    "image": "brownie.jpg"
                },
                {
                    "id": 9,
                    "name": "Salade Méditerannéene fraiche au chèvre",
                    "servings": 4,
                    "ingredients":[
                        {
                            "ingredient": "Concombre",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Olives"
                        },
                        {
                            "ingredient": "Fromage de chèvre",
                            "quantity": 150,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Vinaigre Balsamic"
                        },
                        {
                            "ingredient": "Huile d'olive"
                        },
                        {
                            "ingredient": "Basilic"
                        }
                    ],
                    "time": 15,
                    "description":"Peler le concombre le couper 2, retirer les pépins. Couper les olives en morceaux, ainsi que le fromage de chèvre. Ajouter le basilic ainsi que le vinaigre balsamic et l'huile d'olives à votre gout.",
                    "appliance":"Saladier",
                    "ustensils":["cuillère en bois", "couteau"],
                    "image": "salade-mediterraneenne-chevre.jpg"
                },
                {
                    "id": 10,
                    "name": "Tartiflette",
                    "servings": 4,
                    "ingredients":[
                        {
                            "ingredient": "Roblochon",
                            "quantity": "1"
                        },
                        {
                            "ingredient": "Pommes de terre",
                            "quantity": 4.5,
                            "unit": "kg"
                        },
                        {
                            "ingredient": "Jambon fumé",
                            "quantity": 2,
                            "unit": "tranches"
                        },
                        {
                            "ingredient": "Oignon",
                            "quantity": 300,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Vin blanc sec",
                            "quantity": 30,
                            "unit": "cl"
                        }
                    ],
                    "time": 60,
                    "description": "Commencer par cuire les pommes de terre dans l'eau bouillante. Puis epluchez les et coupez les en rondelles. Emincer les oignons puis les faire dorer dans du beurre. Ajouter le jambon fumé coupé en en morceaux ainsi que les pommes de terres. Salez, poivrez à votre gout ( et celui de vos convives ) Laissez cuisiner durant environ 10 minutes puis ajouter le vin blanc. Après 5 minutes, mettre le tout dans un plat à gratin. Coupez le rebelochon, soit en tranches, soit le couper en 2 dans le sens de l'épaisseur et recouvrir les pommes de terre. Cuire au four (environ 220°) durant 25 minutes. C'est prêt !",
                    "appliance":"Four",
                    "ustensils": ["plat à gratin", "couteau","Économe"],
                    "image": "tartiflette.jpg"
                },{
                    "id": 11,
                    "name": "Salade tomate, mozzarella et pommes",
                    "servings": 4,
                    "ingredients":[
                        {
                            "ingredient": "Tomates cerises",
                            "quantity": 250,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Mozzarella",
                            "quantity": 150,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Jambon de parme",
                            "quantity": 4,
                            "unit": "tranches"
                        },
                        {
                            "ingredient": "Pommes",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Salade Verte",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Vinaigrette",
                            "quantity": 5,
                            "unit": "cl"
                        }
                    ],
                    "time": 10,
                    "description": "Commencer par couper les feuilles de salade, ajouter les tomates cerises et le fromage découpé en cubes ou en boules avec la cuillère à melon. Découper le jambon de parme en fines lamelles. Ajouter la pomme elle aussi découpée en petit morceaux. Assaisonnez à votre gout. ",
                    "appliance": "Saladier",
                    "ustensils": ["couteau", "cuillère à melon" ],
                    "image": "salade-tomate-mozza.jpg"
                },{
                    "id": 12,
                    "name": "Compote pomme rhubarbe",
                    "servings": 4,
                    "ingredients":[
                        {
                            "ingredient": "Rhubarbe",
                            "quantity": 160,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Pommes",
                            "quantity": 8
                        },
                        {
                            "ingredient": "Sucre vanillé",
                            "quantity": 6,
                            "unit": "sachets"
                        },
                        {
                            "ingredient": "Eau",
                            "quantity" : "0.5",
                            "unit" : "tasses"
                        }
                    ],
                    "time": 40,
                    "description": "Éplucher les fruits et les couper en morceaux, les mettre dans une casserolle en ajoutant l'eau et le sucre vanillé. Laisser cuire 15 minutes en remuant régulièrement.",
                    "appliance": "Casserole",
                    "ustensils": ["couteau", "économe"],
                    "image" : "compote-pomme-rhubarbe.jpg"
                },
                {
                    "id": 13,
                    "name": "Salade mâchée de patates",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient": "Mâche",
                            "quantity": 60,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Pommes de terre",
                            "quantity": 200,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Échalote",
                            "quantity": 2

                        },
                        {
                            "ingredient": "Vinaigre de cidre",
                            "quantity": 1,
                            "unit":"cuillère à soupe"
                        },
                        {
                            "ingredient": "huile d'olive",
                            "quantity": 2,
                            "unit": "cuillère à soupe"
                        }
                    ],
                    "time":40,
                    "description":"Cuire les pommes de terre environ 30 minutes. Découper les échalottes finement. Durant la cuisson des pommes de terre. Préparez la vinaigrette avec l'huile d'olive et le vinaigre de cidre. Salez poivrez à discrétion. Dans un saladier, mettre le mâche. Ajouter",
                    "appliance": "Casserole",
                    "ustensils":["couteau","saladier","cuillère en bois"],
                    "image" : "salade-mache-patates.jpg"
                },
                {
                    "id": 14,
                    "name": "Galette Bretonne Saucisse et Fromage à raclette",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient": "Saucisse bretonne ou de toulouse",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Farine de blé noir",
                            "quantity": 130,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 1

                        },
                        {
                            "ingredient": "Fromage à raclette",
                            "quantity": 300,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Oignon",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": 75,
                            "unit": "grammes"
                        }

                    ],
                    "time": 100,
                    "description":"Mélanger la farine et les oeufs, faire fondre 25 grammes de beurre et ajouter à la pâte. Ajouter du sel. Laisser reposer 1 heure. Faire les galettes et laisser refroidire. Faire chauffer les saucisses avec du beurre et l'oignon. Enrouler les saucisses dans les crêpes avec une partie du fromage. Mettre le reste du fromage à raclette par dessus les crêpes. Passer four pendant 20 minutes",
                    "appliance": "Four",
                    "ustensils":["poelle à frire","couteau"],
                    "image" : "galette-bretonne-saucisse.jpg"
                },
                {
                    "id": 15,
                    "name": "Crêpes Chocolat Banane",
                    "servings": 10,
                    "ingredients": [
                        {
                            "ingredient": "Oeuf",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Farine",
                            "quantity": 250,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Lait",
                            "quantity": 600,
                            "unit": "ml"
                        },
                        {
                            "ingredient": "Beurre salé",
                            "quantity": 30,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Chocolat au lait",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Banane",
                            "quantity": 4
                        }
                    ],
                    "time": 60,
                    "description":"Mélangez dans un saladier, la farine, les oeufs, et le lait. Battez jusqu'à avoir une masse homogène. Pendant ce temps faites fondre le beurre et ajoutez en une partie à la pâte à crêpes. Faire fondre le chocolat ( avec le reste du beurre salé ). Lorsque vous chauffez les crêpes. Ajouter le chocolat fondu et les bananes coupées en rondelles. Ajoutez une touche de chantilly pour les gourmands",
                    "appliance": "Poële à crêpe",
                    "ustensils":["saladier", "louche", "cuillère en bois"],
                    "image" : "crepe-chocolat-banane.jpg"
                },
                {
                    "id": 16,
                    "name": "Gratin de pâtes à la tomate",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient": "Tomate",
                            "quantity": 500,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Mozzarella",
                            "quantity": 250,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Pennes",
                            "quantity": 500,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Basilic",
                            "quantity": 1,
                            "unit":"tiges"
                        },
                        {
                            "ingredient": "huile d'olives",
                            "quantity": 2,
                            "unit": "cuillère à soupe"
                        }
                    ],
                    "time": 45,
                    "description":"Faire cuire les pâtes si vous n'avez pas de pennes des coquillettes peuvent faire l'affaire. Découper les tomates en petits morceaux, soit en tranches soit en dés. Coupez le basilic en petites morceaux et mélangez le aux tomates.  Coupez la mozzarella en tranche. Préchauffez le four à 200°. Alternez entre couches de pattes et couches de tomates, terminez par une couche de pates et recouvrir du fromage. Laisser au four 30 minutes et régalez vous ! Une recette simple qui fera plaisir au petits comme aux grands.",
                    "appliance": "Four",
                    "ustensils":["plat à gratin", "couteau", "râpe à fromage"],
                    "image" : "gratin-pates-tomate-mozza.jpg"
                },
                {
                    "id": 17,
                    "name": "Smoothie à la fraise",
                    "servings": 6,
                    "ingredients": [
                        {
                            "ingredient": "Fraise",
                            "quantity": 500,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Pastèque",
                            "quantity": 0.5
                        },
                        {
                            "ingredient": "Jus de citron",
                            "quantity": 1,
                            "unit":"cuillères à soupe"
                        },
                        {
                            "ingredient": "Glaçons",
                            "quantity": 8
                        },
                        {
                            "ingredient": "Menthe"
                        }
                    ],
                    "time": 15,
                    "description":"Coupez les fraises en morceaux, découpez la chaire de la pastèque en retirant les pépins. Mettre le tout dans le blender. Ajouter un cuillière à soupe de juste de citron ainsi que les glaçons. Ajoutez quelques fueilles de menthe pour plus de fraicheur. Mixez le tout. Servir et déguster.",
                    "appliance": "Blender",
                    "ustensils":["verres", "couteau", "presse citron"],
                    "image" : "smoothie-fraises.jpg"
                },
                {
                    "id": 18,
                    "name": "Smoothie ananas et vanille",
                    "servings": 5,
                    "ingredients": [
                        {
                            "ingredient": "Ananas",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Glace à la vanille",
                            "quantity": 500,
                            "unit": "ml"
                        },
                        {
                            "ingredient": "Lait",
                            "quantity": 50,
                            "unit": "cl"
                        }
                    ],
                    "time": 10,
                    "description":"Séparez 1/5ème d'Ananas ( une belle tranche qui servira pour la décoration des verres ), mettre le reste coupé en cubes au blender, ajouter la glace à la vanille et le lait. Mixez. Servir et décorer avec l'ananas restant. C'est prêt",
                    "appliance": "Blender",
                    "ustensils":["verres", "couteau"],
                    "image" : "smoothie-ananas-vanille.jpg"
                },
                {
                    "id": 19,
                    "name": "Shake Banane Kiwi",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Kiwi",
                            "quantity": 4
                        },
                        {
                            "ingredient": "Citron",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Lait",
                            "quantity": 1,
                            "unit": "litres"
                        },
                        {
                            "ingredient": "Sucre glace",
                            "quantity": 30,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Banane",
                            "quantity": 1
                        }
                    ],
                    "time": 0,
                    "description":"Coupez les fruits en morceaux, ajouter le jus de citron et le lait ainsi que le sucre glace. Mixez. Ajoutez des glaçons si le lait n'a pas été mis au frais.",
                    "appliance": "Blender",
                    "ustensils":["couteau", "verres", "presse citron"],
                    "image" : "shake-banane-kiwi.jpg"
                },
                {
                    "id": 20,
                    "name": "Pates Carbonara",
                    "servings": 5,
                    "ingredients": [
                        {
                            "ingredient": "Tagliatelles",
                            "quantity": 500,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Lardons",
                            "quantity": 150,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Crème fraiche",
                            "quantity": 200,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Parmesan",
                            "quantity": 100,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "huile d'olive",
                            "quantity": 1,
                            "unit": "cuillères à soupe"
                        }
                    ],
                    "time": 30,
                    "description":"Faire cuire les pates comme indiqué sur le paquet. Dorer les lardons dans une sauteuse avec l'huile d'olive. Ajouter la crême fraiche et baisser le feu au minimum. Quand les Tagliatelles sont prêtes les mettre dans la sauteuse et bien mélanger le tout en ajoutant le jaune d'oeuf. Servir et ajouter le parmesan râpé.",
                    "appliance": "Sauteuse",
                    "ustensils":["râpe à fromage", "cuillère en bois"],
                    "image" : "pates-carbonara.jpg"
                },
                {
                    "id": 21,
                    "name": "Spaghettis à la bolognaise",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Spaghettis",
                            "quantity": 400,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Oignon",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Coulis de tomate",
                            "quantity": 300,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Viande hachée 1% de matière grasse",
                            "quantity": 400,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Vin rouge",
                            "quantity": 20,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Crème Fraiche",
                            "quantity" : 1,
                            "unit": "cuillères à soupe"
                        }
                    ],
                    "time": 30,
                    "description":"Cuisiner la viande hachée dans une poelle à frire. Dans une autre faire cuire les oignons découpés en fins dés avec un peu de beurre. Ajouter du vin rouge. Mélanger les oigons avec la viande hachée. Faire cuire les pates le temps indiqué sur le paquet. Ajouter le coulis de tomates à la viande hachée. Une fois que les pates sont cuites, ajouter la crème fraiche à la viande hachée. Serivir.",
                    "appliance": "Casserolle.",
                    "ustensils":["Cuillère en bois", "louche", "couteau"],
                    "image": "spaghettis-bolognaise.jpg"
                },
                {
                    "id": 22,
                    "name": "Fondant au chocolat",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Beurre",
                            "quantity": 160,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Chocolat noir",
                            "quantity": 200,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Farine",
                            "quantity": 50,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 4
                        },
                        {
                            "ingredient": "Sucre",
                            "quantity": 150,
                            "unit": "grammes"
                        }
                    ],
                    "time": 30,
                    "description":"Faire fondre le chocolat et le beurre au bain marie. Dans un saladier battre les oeufs avec le sucre jusqu'à obtenir une texture de type mousse. Ajouter la farine ainsi que le mélange de beurre et chocolat fondu. Beurrez le moule à gateaux. Mettre au four préchauffé à 200° puis faites chauffer pendant 15 minutes. C'est prêt. Servir avec une boule de glace ou une crême dessert.",
                    "appliance": "Four",
                    "ustensils":["moule à gateaux", "fouet", "casserolle"],
                    "image": "fondant-au-chocolat.jpg"
                },
                {
                    "id": 23,
                    "name": "Quiche lorraine",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Pâte brisée",
                            "quantity": 200,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Lardons",
                            "quantity": 200,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": 30,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Crème Fraîche",
                            "quantity": 20,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Lait",
                            "quantity": 20,
                            "unit": "cl"
                        }
                    ],
                    "time": 60,
                    "description":"Etaler la pate dans un moule et la piquer.Parsemer de beurre. Faire chauffer les lardon dans une poêle. Battre les oeufs en ajoutant la crème fraîche et le lait. Finalement ajouter les lardons, salez poivrez à votre gout. Verser l'ensemble sur la pâte. Cuire environ 50 minutes.",
                    "appliance": "Four",
                    "ustensils":["moule à gateaux", "rouleau à patisserie", "fouet"],
                    "image": "quiche-lorraine.jpg"
                },
                {
                    "id": 24,
                    "name": "Salade de pâtes",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Thon en miettes",
                            "quantity": 160,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Maïs",
                            "quantity": 60,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Tomate",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Concombre",
                            "quantity": 0.5
                        },
                        {
                            "ingredient": "Macaronis",
                            "quantity": 300,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Mayonnaise",
                            "quantity": 2,
                            "unit": "cuillères à soupe"
                        }
                    ],
                    "time": 40,
                    "description":"Découper le concombre et les tomates en dés, les mettre dans un saladier avec le mais et les miettes de poisson, ajouter les pates. Ajouter la mayonnaise. Mélanger le tout et servir frais.",
                    "appliance": "Saladier",
                    "ustensils":["couteau", "cuillère en bois"],
                    "image": "salade-de-pates.jpg"
                },
                {
                    "id": 25,
                    "name": "Cookies",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Sucre",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Farine",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Chocolat noir en pepites",
                            "quantity": 100,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 1
                        }
                    ],
                    "time": 30,
                    "description":"Faire fondre le beurre et le mélanger avec le sucre. Finalement ajouter l'oeuf. Ajouter la farine tout en mélangeant peu pa peu pour avoir une masse sans grumaux. Ajouter les pépites de chocolat. Faire, une plaque de cuisson de petites boules pour les cookies. Mettre au four à 180° pour 10 minutes.",
                    "appliance": "Four",
                    "ustensils":["fouet", "saladier", "plaque de cuisson"],
                    "image": "cookies.jpg"
                },
                {
                    "id": 26,
                    "name": "Soupe de tomates",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient": "Tomate",
                            "quantity": 6
                        },
                        {
                            "ingredient": "Pommes de terre",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Huile d'olives"
                        },
                        {
                            "ingredient": "Oignon",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Ail",
                            "quantity": 1,
                            "unit": "gousses"
                        }
                    ],
                    "time": 25,
                    "description":"Verser de l'huile dans une cocotte minute couper les légumes et les verser dans l'huile chaude. Laisser cuire et remuer pendant 10 minutes. Passer aux mixer. Servir.",
                    "appliance": "Mixer",
                    "ustensils":["cocotte minute", "couteau"],
                    "image": "soupe-de-tomates.jpg"
                },
                {
                    "id": 27,
                    "name": "Soupe à l'oseille",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Oseille",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Crème fraîche",
                            "quantity": 4,
                            "unit": "cuillère à soupe"
                        },
                        {
                            "ingredient": "Vermicelles",
                            "quantity": 1,
                            "unit":"verres"
                        },
                        {
                            "ingredient": "Beurre salé",
                            "quantity": 50,
                            "unit": "grammes"
                        }
                    ],
                    "time": 15,
                    "description":"Faire fondre l'oseille avec du beurre demi sel, ajouter un litre d'eau. Ajouter les vermicelles. Laisser cuire. une foit prêt, sortir du feu et après 5 minutes ajouter le jaune d'oeuf et la crême fraîche",
                    "appliance": "Casserolle",
                    "ustensils":["couteau","cuillère en bois"],
                    "image": "soupe-a-l-oseille.jpg"
                },
                {
                    "id": 28,
                    "name": "Soupe de poireaux",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Poireau",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Pommes de terre",
                            "quantity": 400,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Oseille",
                            "quantity": 75,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": 50,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Crême fraîche",
                            "quantity": 10,
                            "unit": "cl"
                        }
                    ],
                    "time": 80,
                    "description":"Emincer les blanc de poireaux et les faire chauffer dans 25 grammes de beurre. AJouter les pommes de terres coupées en morceaux. Ajouter l'eau et laisser mijoter pour 45 minutes. Chauffer l'oseille avec le beurre restant puis incorporer le tout. Mixez. Ajoutez la crème. Bon appetit.",
                    "appliance": "Mixer",
                    "ustensils":["casserolle","couteau"],
                    "image": "soupe-de-poireaux.jpg"
                },
                {
                    "id": 29,
                    "name": "Houmous Express",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient": "Pois chiches",
                            "quantity": 1,
                            "unit": "boites"
                        },
                        {
                            "ingredient": "Ail",
                            "quantity": 1,
                            "unit": "gousses"
                        },
                        {
                            "ingredient": "Citron",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Huile d'olive"
                        },
                        {
                            "ingredient": "Paprika"
                        }
                    ],
                    "time": 30,
                    "description":"Prendre les pois chiches, les mettre dans le mixer avec de l'huile d'olive, ajouter le jus des 2 citrons et du paprika selon le gout.",
                    "appliance": "Mixer",
                    "ustensils":["cuillère en bois", "presse citron"],
                    "image": "houmous.jpg"
                },
                {
                    "id": 30,
                    "name": "Purée de pois cassés",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Pois Cassé",
                            "quantity": 500,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Oignon",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Ail",
                            "quantity": 2,
                            "unit": "gousses"
                        }
                    ],
                    "time": 60,
                    "description":"Mettre tous les ingrédients dans une cocotte. ajouter de l'eau pour recouvrir l'ensemble et laisser cuirre à petit feur pour 1 heure. Passer au mixer. Salez, poivrez. C'est prêt",
                    "appliance": "Mixer",
                    "ustensils":["casserolle", "cuillère en bois"],
                    "image": "puree-de-pois-casses.jpg"
                },
                {
                    "id": 31,
                    "name": "Jardinière de légumes",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Carotte",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Pommes de terre",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Haricots verts",
                            "quantity": 150,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Petits poids",
                            "quantity": 100,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Lardons",
                            "quantity": 150,
                            "unit": "grammes"
                        }
                    ],
                    "time": 60,
                    "description":"Découper en cubes les carottes et pommes de terre. Faire revenir dans du beurre. Ajouter les lardons, une fois les lardons dorés, ajouter un grand verre d'eau. Ajouter les petit poids et les haricots verts ( tous deux pré cuits ). Ajouter Sel, poivre, thyms et laurier",
                    "appliance": "Poële",
                    "ustensils":["Couteau", "économe"],
                    "image": "jardiniere-de-legumes.jpg"
                },
                {
                    "id": 32,
                    "name": "Croque Monsieur à la dinde",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Pain de mie",
                            "quantity": 8,
                            "unit": "tranches"
                        },
                        {
                            "ingredient": "Blanc de dinde",
                            "quantity": 4,
                            "unit": "tranches"
                        },
                        {
                            "ingredient": "Emmental",
                            "quantity": 8,
                            "unit": "tranches"
                        },
                        {
                            "ingredient": "Gruyère",
                            "quantity": 100,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Lait",
                            "quantity": 5,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Noix de muscade",
                            "quantity": 1,
                            "unit": "pincées"
                        }
                    ],
                    "time": 20,
                    "description":"Beurrer les tranches de pain, ajouter entre 2 tranches de pain de mie 1 tranche d'émental, une de blanc de dinde, et une autre d'emmental. Dans un récipient, mélanger le gruyère rappé avec le lait et la noix de muscade. Mettre sur les croque monsieux. Placer au four durnat 10 minutes.",
                    "appliance": "Four",
                    "ustensils":["râpe à fromage", "cuillère à Soupe", "couteau"],
                    "image": "croque-monsieur-dinde.jpg"
                },
                {
                    "id": 33,
                    "name": "Sandwich au saumon fumé",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Pain de mie",
                            "quantity": 8,
                            "unit": "tranches"
                        },
                        {
                            "ingredient": "Saumon Fumé",
                            "quantity": 4,
                            "unit": "tranches"
                        },
                        {
                            "ingredient": "Feuilles de laitue",
                            "quantity": 4
                        },
                        {
                            "ingredient": "Fromage blanc",
                            "quantity": 4,
                            "unit":"cuillères à soupe"
                        },
                        {
                            "ingredient": "Jus de citron",
                            "quantity": 1,
                            "unit": "cuillères à soupe"
                        }
                    ],
                    "time": 5,
                    "description":"Mélanger le fromage blanc avec le citron. Ajouter un peu de sel et poivre à votre gout. Faire dorer le pain de mie. Puis étaler le mélange. Ajouter une feuille de salade puis le saumon fumé. C'est prêt.",
                    "appliance": "Four",
                    "ustensils":["couteau", "cuillère en bois"],
                    "image": "sandwich-au-saumon-fume.jpg"
                },
                {
                    "id": 34,
                    "name": "Purée de patate douce",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Patate douce",
                            "quantity": 800,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Crème fraîche",
                            "quantity": 20,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Huile d'olive"
                        },
                        {
                            "ingredient": "Orange",
                            "quantity": 1
                        }
                    ],
                    "time": 25,
                    "description":"Eplucher les patates douces et coupez les en morceaux. Les faire cuire durant 20 minute dans une casserolle d'eau bouillante. Passer au mixer en ajoutant la crème et l'huile d'olive à son gout. Salez, poivrez. Pressez l'orange et ajouter le jus à l'ensemble. Servir.",
                    "appliance": "Mixer",
                    "ustensils":["couteau", "économe", "cuillère en bois"],
                    "image": "puree-de-patate-douce.jpg"
                },
                {
                    "id": 35,
                    "name": "Purée de carottes",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient": "Carotte",
                            "quantity": 6
                        },
                        {
                            "ingredient": "Pommes de terre",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": 20,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Crème fraîche",
                            "quantity": 2,
                            "unit":"cuillères à soupe"
                        },
                        {
                            "ingredient": "Cumin",
                            "quantity": 1,
                            "unit": "cuillères à café"
                        },
                        {
                            "ingredient": "Noix de muscade",
                            "quantity": 1,
                            "unit": "pincées"
                        }
                    ],
                    "time": 25,
                    "description":"Éplucher les légumes, les couper en morceaux et les mettre à cuire dans une cocotte minute environ 15 minutes. Mixer en ajoutant le beurre, la crème. Ajouter le cumun et la noix de muscade.",
                    "appliance": "Mixer",
                    "ustensils":["cocotte minute", "couteau", "cuillère en bois"],
                    "image": "puree-de-carottes.jpg"
                },
                {
                    "id": 36,
                    "name": "Lasagne Courgettes et Chèvre",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient": "Courgette",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Fromage de chèvre",
                            "quantity": 4
                        },
                        {
                            "ingredient": "Lait",
                            "quantity": 25,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Lasagnes",
                            "quantity": 5,
                            "unit":"feuilles"
                        },
                        {
                            "ingredient": "Gruyère",
                            "quantity": 40,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Maïzena",
                            "quantity": 1,
                            "unit": "cuillères à soupe"
                        }
                    ],
                    "time": 35,
                    "description":"Raper les courgette et les faire revenir durant 15 minutes. Ajouter les fromages de chèvre frais. Préparer la béchamelle avec le lait et la maizena. Salez poivrez, ajouter de la noix de muscade selon les gouts. Dans un plat, mettre un peu de sauces au fond, puis des lasagnes, puis des courgettes etc... terminer par de la sauces et ajouter le gruiyère. Passer au four à 180° durant 20 à 25 minutes.",
                    "appliance": "Four",
                    "ustensils":["plat à gratin", "râpe à fromage", "fouet"],
                    "image": "lasagnes-courgette-chevre.jpg"
                },
                {
                    "id": 37,
                    "name": "Courgettes farcies au boeuf",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient": "Courgette",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Viande hachée",
                            "quantity": 600,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Huile d'olives",
                            "quantity": 25,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Oignon",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Coulis de tomates",
                            "quantity": 20,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Gruyère",
                            "quantity": 50,
                            "unit": "grammes"
                        }

                    ],
                    "time": 60,
                    "description":"Couper les courgettes dans le sens de la longueur. Vider les courgette dans un saladier. Réserver.Faire revenir la chair des courgettes dans 25cl d'huile d'olive. Ajouter l'oignon puis la viande hachée. Mettre la farce dans les courgettes. Ajouter le coulis de tomates. Mettre au four pendant 30 minutes. Avant la fin de la cuisson ajouter le fromage rapé",
                    "appliance": "Four",
                    "ustensils":["couteau", "cuillère en bois", "Poelle à frire"],
                    "image": "courgette-farcie-boeuf.jpg"
                },
                {
                    "id": 38,
                    "name": "Pain Perdu",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Pain",
                            "quantity": 6,
                            "unit":"tranches"
                        },
                        {
                            "ingredient": "Lait",
                            "quantity": 25,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Sucre roux",
                            "quantity": 75,
                            "unit": "grammes"
                        }
                    ],
                    "time": 20,
                    "description":"Fouettez les oeufs, le sucre et le lait. tremper les tranches de pain. Le cuire au four pendant environ 10 minutes à 180°. Servir",
                    "appliance": "Four",
                    "ustensils":["fouet", "bol","Cuillère à Soupe"],
                    "image": "pain-perdu.jpg"
                },
                {
                    "id": 39,
                    "name": "Crumble aux pommes",
                    "servings": 40,
                    "ingredients": [
                        {
                            "ingredient": "Pomme",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Farine",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": 50,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Sucre roux",
                            "quantity": 80,
                            "unit":"grammes"
                        }
                    ],
                    "time": 40,
                    "description":"Découper les pommes en dé. Mélanger dans un saladier la farine, le sucre et le beurre. Bien mélanger. Beurrer le moule et ajouter les pommes. Par dessus placez la pate que vous avez obtenu. Cuire 20 minutes au four",
                    "appliance": "Four",
                    "ustensils":["saladier", "couteau","fouet"],
                    "image": "crumble-aux-pommes.jpg"
                },
                {
                    "id": 40,
                    "name": "Limonade",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Eau",
                            "quantity": 1,
                            "unit": "Litres"
                        },
                        {
                            "ingredient": "Citron Vert",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Sucre en poudre",
                            "quantity": 4,
                            "unit":"cuillères à café"
                        },
                        {
                            "ingredient": "Bicarbonate",
                            "quantity": 1,
                            "unit": "cuillères à café"
                        }
                    ],
                    "time": 10,
                    "description":"Dans un saladier mettre l'eau, le jus des cirtons et le sucre. Bien mélanger. Ajouter le bicarbonate. Servir. Ajouter des glaçon et une feuille de menthe pour la déco.",
                    "appliance": "Saladier",
                    "ustensils":["cuillère en bois"],
                    "image": "limonade.jpg"
                },
                {
                    "id": 41,
                    "name": "Mousse au chocolat",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Oeuf",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Chocolat noir",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Sucre vanillé",
                            "quantity": 1,
                            "unit": "sachets"
                        }
                    ],
                    "time": 20,
                    "description":"Séparer les blancs d'oeufs. Faire fondre le chocolat au bain marie. Ajouter les jaunes et le sucre au chocolat hors du feu. Battre les blancs en neige. Ajouter les blancs au mélange de chocolat. Mélangez délicatement avec une spatule. Servir dans un plat ou dans des verres. Mettre au frais",
                    "appliance": "Casserolle",
                    "ustensils":["fouet", "spatule", "verres"],
                    "image": "mousse-au-chocolat.jpg"
                },
                {
                    "id": 42,
                    "name": "Charlotte au poires",
                    "servings": 3,
                    "ingredients": [
                        {
                            "ingredient": "Chocolat",
                            "quantity": 200,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Poires au jus",
                            "quantity": 0.5,
                            "unit" : "boites"
                        },
                        {
                            "ingredient": "Boudoirs",
                            "quantity": 15
                        }
                    ],
                    "time": 60,
                    "description":"Commencez par préparer la mousse au chocolat au moins 2 heures avant. Quand la mousse est prête et a reposée. Alors mouiller les boudoirs dans le jus des poires. Disposer. Alterner : mousse au chocolat, boudoirs et poires. Mettre au frais.",
                    "appliance": "Moule à charlotte",
                    "ustensils":["saladier", "couteau", "fouet"],
                    "image": "charlotte-aux-poires.jpg"
                },
                {
                    "id": 43,
                    "name": "Tarte au citron",
                    "servings": 6,
                    "ingredients": [
                        {
                            "ingredient": "Pâte brisée",
                            "quantity": 200,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Sucre",
                            "quantity": 150,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Beurre fondu",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Citron"
                        }
                    ],
                    "time": 50,
                    "description":"Préchauffez le fours à 200°. Etaler la pate. La mettre dans un moule. Battre les oeufs avec le sucre. Ajouter le jus de citron et le beurre. Verser le tout sur la pate. Au four 30 minutes. Bon appetit ",
                    "appliance": "Four",
                    "ustensils":["rouleau à patisserie", "moule à tarte", "presse citron"],
                    "image": "tarte-au-citron.jpg"
                },
                {
                    "id": 44,
                    "name": "Crème déssert au chocolat",
                    "servings": 6,
                    "ingredients": [
                        {
                            "ingredient": "Lait",
                            "quantity": 1,
                            "unit": "litres"
                        },
                        {
                            "ingredient": "Chocolat",
                            "quantity": 200,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Sucre",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": 50,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "farine",
                            "quantity": 40,
                            "unit": "grammes"
                        }
                    ],
                    "time": 15,
                    "description":"Mélanger la farine et le beurre fondu en ajoutant le lait peu à peu. Ajouter du sucre après la cuisson. Bien mélanger. Ajouter le chocolat en morceaux et laisser chauffer 8 minutes en mélangeant avec une cuillère en bois. Mettre dans des verres",
                    "appliance": "Casserolle",
                    "ustensils":["cuillère en bois"],
                    "image": "creme-dessert-au-chocolat.jpg"
                },
                {
                    "id": 45,
                    "name": "Crème patissière",
                    "servings": 8,
                    "ingredients": [
                        {
                            "ingredient": "Lait",
                            "quantity": 50,
                            "unit": "cl"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Farine",
                            "quantity": 30,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Sucre",
                            "quantity": 80,
                            "unit":"grammes"
                        }
                    ],
                    "time": 30,
                    "description":"Faire bouillir le lait ( on peut y ajouter de l'essence de vanille. Battre les oeufs et le sucre, ajouter la farine puis finalement ajouter le lait chaud. Remettre à feu doux pour faire épaissir en remuant pendant 5 à 10 minutes.",
                    "appliance": "Casserolle",
                    "ustensils":["fouet","saladier"],
                    "image": "creme-patissiere.jpg"
                },
                {
                    "id": 46,
                    "name": "Far breton",
                    "servings": 6,
                    "ingredients": [
                        {
                            "ingredient": "Farine",
                            "quantity": 250,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Sucre",
                            "quantity": 150,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Sucre vanillé",
                            "quantity": 1,
                            "unit": "sachets"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 4
                        },
                        {
                            "ingredient": "Lait",
                            "quantity": 1,
                            "unit": "litre"
                        },
                        {
                            "ingredient": "Pruneaux",
                            "quantity": 100,
                            "unit": "grammes"
                        }
                    ],
                    "time": 60,
                    "description":"Mélanger la farine avec le sucre et les oeufs en ajoutant du sucre vanillé. Ajouter le lait petit à petit. Ajouter un petit vers de rhum. Verser la masse dans un plat beurré y placer les pruneaux et faire cuire à 200° pendant 45 minutes",
                    "appliance": "Four",
                    "ustensils":["fouet", "moule", "verres"],
                    "image": "far-breton.jpg"
                },
                {
                    "id": 47,
                    "name": "Mousse au citron",
                    "servings": 6,
                    "ingredients": [
                        {
                            "ingredient": "Jus de citron",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Mascarpone",
                            "quantity": 250,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Sucre",
                            "quantity": 100,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Crème Fraîche",
                            "quantity": 20,
                            "unit":"cl"
                        }
                    ],
                    "time": 5,
                    "description":"Mélanger le jus de citron avec le sucre et la mascarpone. Ajouter la crème fraiche. Mélanger le tout et mettre au congélateur pendant 1 heure. Servir",
                    "appliance": "Saladier",
                    "ustensils":["fouet", "verres", "cuillère en bois"],
                    "image": "mousse-au-citron.jpg"
                },
                {
                    "id": 48,
                    "name": "Pizza",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Pâte à pizza",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Tomates pelées",
                            "quantity": 1,
                            "unit": "boites"
                        },
                        {
                            "ingredient": "Lardons",
                            "quantity": 1,
                            "unit": "barquettes"
                        },
                        {
                            "ingredient": "Champignons de paris",
                            "quantity": 1,
                            "unit":"boites"
                        },
                        {
                            "ingredient": "Gruyère",
                            "quantity": 200,
                            "unit": "grammes"
                        }
                    ],
                    "time": 40,
                    "description":"Étaler la pate a pizza. Ecraser les tomates pelées, les étaler sur la pâte, ajouter les lardons et les champignons. Ajouter le gruyère eet passer au four à 220° durant 20 minutes",
                    "appliance": "Four",
                    "ustensils":["rouleau à patisserie", "râpe à fromage","couteau"],
                    "image": "pizza.jpg"
                },
                {
                    "id": 49,
                    "name": "Smoothie tropical",
                    "servings": 4,
                    "ingredients": [
                        {
                            "ingredient": "Bananes",
                            "quantity": 2
                        },
                        {
                            "ingredient": "Kiwis",
                            "quantity": 3
                        },
                        {
                            "ingredient": "Mangue",
                            "quantity": 1
                        },
                        {
                            "ingredient": "Ananas",
                            "quantity": 4,
                            "unit":"tranches"
                        },
                        {
                            "ingredient": "Miel",
                            "quantity": 2,
                            "unit": "cuillères à soupe"
                        }
                    ],
                    "time": 0,
                    "description":"Découper les fruits. Le passer au blender jusqu'à obtenir une texture liquide. Mettre au frais. Servir",
                    "appliance": "Blender",
                    "ustensils":["couteau", "verres"],
                    "image": "smoothie-tropical.jpg"
                },
                {
                    "id": 50,
                    "name": "Frangipane",
                    "servings": 2,
                    "ingredients": [
                        {
                            "ingredient": "Pâte feuilletée",
                            "quantity": 400,
                            "unit":"grammes"
                        },
                        {
                            "ingredient": "Oeuf",
                            "quantity": 6
                        },
                        {
                            "ingredient": "Poudre d'amendes",
                            "quantity": 500,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Beurre",
                            "quantity": 500,
                            "unit": "grammes"
                        },
                        {
                            "ingredient": "Sucre glace",
                            "quantity": 500,
                            "unit":"grammes"
                        }
                    ],
                    "time": 60,
                    "description":"Préparer la frangipane : Mélanger le sucre la poudre d'amander, le beurre et les oeufs. Etaler la moitier de la pate feuilleté et mettre dans un moule à tarte. Garnir de frangipane et recouvrir du reste de pate feuilletée. Mettre au four 30 minutes",
                    "appliance": "Four",
                    "ustensils":["rouleau à patisserie","fouet"],
                    "image": "frangipane.jpg"
                }
            ]

            /***/ }),

        /***/ "./src/js/model/Arrays.js":
        /*!********************************!*\
  !*** ./src/js/model/Arrays.js ***!
  \********************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ Arrays)
                /* harmony export */ });
//classe créée dans le but de normaliser le tableau des datas pour accélérer les recherches une fois le site chargé la première fois
            class Arrays{
                constructor(recipes){
                    this.recipes= recipes;
                }

                navigationArrayGenerator(){
                    const navigationArray= [];
                    for(const recipe of this.recipes){

                        const ingredientsArray= [];
                        for(const ingredients of recipe.ingredients){

                            ingredientsArray.push(ingredients.ingredient.toLowerCase());
                        }

                        recipe.ustensils= recipe.ustensils.map(ustensile=> ustensile.toLowerCase());

                        navigationArray.push({
                            // "id" : recipe.id,
                            "name" : recipe.name.toLowerCase(),
                            "description" : recipe.description.toLowerCase(),
                            "ingredients" : ingredientsArray,
                            "appareils" : recipe.appliance.toLowerCase(),
                            "ustensiles" : recipe.ustensils,
                            "recipe" : recipe
                        });
                    }

                    //tri les recettes par ordre alphabétique sur leur nom, les recettes seront affichées par ordre alphabétique
                    navigationArray.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

                    return navigationArray;
                }
            }

            /***/ }),

        /***/ "./src/js/model/Display.js":
        /*!*********************************!*\
  !*** ./src/js/model/Display.js ***!
  \*********************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ Display)
                /* harmony export */ });
            /* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./src/js/model/globals.js");


// classe qui gère les affichages
            class Display{
                constructor(){
                    // this.recipes= recipes;
                    this.recipeCards= _globals__WEBPACK_IMPORTED_MODULE_0__.RECIPE_CARDS;
                }

                //méthode pour l'affichage du contenu des dropdowns
                displayDropdowns(ingredients, appareils, ustensiles){
                    _globals__WEBPACK_IMPORTED_MODULE_0__.INGREDIENTS_SUGGESTIONS.forEach(suggestion=> {
                        suggestion.innerHTML= ingredients.map(ingredient => `<li class="suggestion primary" target="ingredients" cliquable="true"><button class="dropdown-item" >${ingredient}</button></li>`).join("");
                    });

                    _globals__WEBPACK_IMPORTED_MODULE_0__.APPAREILS_SUGGESTIONS.forEach(suggestion=> {
                        suggestion.innerHTML= appareils.map(appareil => `<li class="suggestion success" target="appareils" cliquable="true"><button class="dropdown-item" >${appareil}</button></li>`).join("");
                    });

                    _globals__WEBPACK_IMPORTED_MODULE_0__.USTENSILES_SUGGESTIONS.forEach(suggestion=> {
                        suggestion.innerHTML= ustensiles.map(ustensile => `<li class="suggestion danger" target="ustensiles" cliquable="true"><button class="dropdown-item" >${ustensile}</button></li>`).join("");
                    });
                    const DROPDOWN_BUTTONS= document.querySelectorAll(".suggestion");
                    return DROPDOWN_BUTTONS;
                }

                //méthode pour l'affichage des recettes
                //template des recettes à afficher avec les données envoyées par search
                displayRecipes(recipe){

                    if(recipe){
                        _globals__WEBPACK_IMPORTED_MODULE_0__.RECIPE_CARDS.innerHTML+=
                            `<div class="col">
                    <div class="card h-100">
                        <img src="../assets/photos/${recipe.image}" class="card-img-top bg-secondary" alt="photo de ${recipe.name}" width="400" height="200" />
                        <div class="card-body row bg-light">
                            <div class="col-md">
                                <h2 class="card-title">${recipe.name}</h2>
                                <ul class="p-0">
                                    ${recipe.ingredients.map(ingredient => `<li> ${ingredient.ingredient} ${ingredient.quantity ? " : <span>" + ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</span></li>`).join("")}
                                </ul>
                            </div>

                            <div class="col-md">
                                <h3 class="text-end d-flex justify-content-end align-items-center"><i class="far fa-clock"></i>${recipe.time} min</h3>
                                <p class="card-text">${recipe.description}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
                    }else _globals__WEBPACK_IMPORTED_MODULE_0__.RECIPE_CARDS.innerHTML= "";
                }

                //méthode pour l'affichage des tags
                displayTags(world, type, target){
                    _globals__WEBPACK_IMPORTED_MODULE_0__.SEARCH_WORLDS.innerHTML += `<button class="btn btn-${type} me-2 tag" target="${target}"><span>${world}</span><i class="far fa-times-circle"></i></button>`;
                }

                displayErrorMessage(recipe1, recipe2){
                    //le message d'erreur affiche des suggestions dynamiques
                    _globals__WEBPACK_IMPORTED_MODULE_0__.RECIPE_CARDS.innerHTML= `<div class="error-message p-5">
            <h2>Aucune recette ne correspond à votre critère...</h2>
            <p>Vous pouvez chercher <a href="#">${recipe1.name}</a>, <a href="#">${recipe2.ingredients[0].ingredient}</a>, etc...</p>
            <svg class="img-fluid" type="image" alt="logo d'un personnage qui a faim" id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="m374.339 9.476h-236.677c-75.907 0-137.662 61.754-137.662 137.661v136.826c0 28.09 8.41 55.112 24.32 78.146 13.559 19.631 31.731 35.243 52.964 45.599v79.816c0 5.802 3.346 11.083 8.592 13.562 2.043.965 4.23 1.438 6.406 1.438 3.411 0 6.791-1.163 9.527-3.412l94.271-77.488h178.259c75.906 0 137.661-61.754 137.661-137.661v-136.826c0-75.907-61.755-137.661-137.661-137.661zm107.661 274.487c0 59.365-48.297 107.661-107.661 107.661h-183.633c-3.474 0-6.841 1.206-9.525 3.412l-73.897 60.742v-57.826c0-6.141-3.743-11.662-9.448-13.935-41.209-16.419-67.836-55.692-67.836-100.054v-136.826c0-59.365 48.297-107.661 107.662-107.661h236.677c59.364 0 107.661 48.296 107.661 107.661z"/>
                    <path d="m301.212 295.463h-90.424c-8.284 0-15 6.716-15 15s6.716 15 15 15h90.424c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/>
                    <path d="m353.202 99.476c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.644-75-75-75zm0 30c14.432 0 27.289 6.837 35.529 17.432l-80.512 28.235c-.003-.223-.017-.444-.017-.668 0-24.812 20.187-44.999 45-44.999zm0 90c-13.867 0-26.285-6.308-34.546-16.201l79.523-27.888c-.488 24.392-20.469 44.089-44.977 44.089z"/>
                    <path d="m235.788 174.476c0-41.355-33.645-75-75-75s-75 33.645-75 75 33.645 75 75 75 75-33.645 75-75zm-75-45c24.813 0 45 20.187 45 45 0 .176-.011.35-.013.526-.113-.043-.219-.096-.334-.137l-80.081-28.084c8.243-10.523 21.054-17.305 35.428-17.305zm0 90c-24.563 0-44.579-19.785-44.981-44.253l79.635 27.928c-8.261 9.965-20.728 16.325-34.654 16.325z"/>
                </g>
            </svg>`;

                    const ERROR_LINKS= _globals__WEBPACK_IMPORTED_MODULE_0__.RECIPE_CARDS.querySelectorAll("a");
                    return ERROR_LINKS;
                }
            }

            /***/ }),

        /***/ "./src/js/model/EventsManager.js":
        /*!***************************************!*\
  !*** ./src/js/model/EventsManager.js ***!
  \***************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ EventsManager)
                /* harmony export */ });
            /* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./src/js/model/globals.js");
            /* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Search */ "./src/js/model/Search.js");
            /* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Display */ "./src/js/model/Display.js");
            /* harmony import */ var _FilterByClick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FilterByClick */ "./src/js/model/FilterByClick.js");
            /* harmony import */ var _FilterByInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FilterByInput */ "./src/js/model/FilterByInput.js");






//initialise et gère les events sur l'application

            class EventsManager{
                constructor(array){
                    // la classe display gère tout ce qui concerne l'affichage
                    this.display= new _Display__WEBPACK_IMPORTED_MODULE_2__["default"]();
                    this.navigationInput= _globals__WEBPACK_IMPORTED_MODULE_0__.NAV_SEARCH;
                    this.dropdownInputs= _globals__WEBPACK_IMPORTED_MODULE_0__.DROPDOWN_INPUTS;
                    this.dropdownButtons= document.querySelectorAll(".btn-lg");
                    //le tableau de résultats envoyé à l'application à son instanciation
                    this.array= array;
                }

                init(){
                    //initialise la préparation des dropdowns pour la recherche sur les dropdowns
                    const search= new _Search__WEBPACK_IMPORTED_MODULE_1__["default"](this.array);

                    //initialise la recherche sur l'input de la barre principale
                    this.navigationInput.addEventListener('input', ()=>{
                        search.navigationResearch(this.navigationInput.value.trim().toLowerCase());
                        //on efface les éventuelles tags
                        _globals__WEBPACK_IMPORTED_MODULE_0__.SEARCH_WORLDS.innerHTML= "";
                        //et les entrées dans les inputs de dropdowns
                        this.dropdownInputs.forEach(input=> input.value= "");
                    });

                    //ajout d'eventListeners pour changer le placeholder des inputs dans les dropdowns
                    //ici pour changer le placeholder au click
                    this.dropdownButtons.forEach(button=> button.addEventListener("click", (e)=>{
                        //évite la propagation de l'event sur le document aux boutons
                        e.stopPropagation();
                        if(button.classList.contains("show")){
                            const input= button.querySelector("input");
                            if(input.attributes.name.value === "ingredients") input.setAttribute("placeholder", "Rechercher un ingrédient");
                            else if(input.attributes.name.value === "appareils") input.setAttribute("placeholder", "Rechercher un appareil");
                            else input.setAttribute("placeholder", "Rechercher un ustensile");
                        }else{
                            const input= button.querySelector("input");
                            if(input.attributes.name.value === "ingredients") input.setAttribute("placeholder", "Ingrédients");
                            else if(input.attributes.name.value === "appareils") input.setAttribute("placeholder", "Appareils");
                            else input.setAttribute("placeholder", "Ustensiles");
                        }
                    }));

                    //ici pour changer le placeholder au click à côté du bouton
                    document.addEventListener("click", ()=> {
                        this.dropdownInputs.forEach(input=> {
                            if(input.attributes.name.value === "ingredients") input.setAttribute("placeholder", "Ingrédients");
                            else if(input.attributes.name.value === "appareils") input.setAttribute("placeholder", "Appareil");
                            else input.setAttribute("placeholder", "Ustensiles");
                            input.textContent= "";
                        })
                    })

                }

                //methode pour les events sur les listes des dropdowns
                onClickSuggestion(suggestions, results){
                    //récupère tous les tags déjà cochés pour éviter les doublons
                    const SEARCH_WORLDS_BUTTONS= _globals__WEBPACK_IMPORTED_MODULE_0__.SEARCH_WORLDS.querySelectorAll("button");
                    //on place les noms des tags dans un tableau pour comparer
                    const buttonsName= [];
                    for(const button of SEARCH_WORLDS_BUTTONS){
                        buttonsName.push(button.textContent);
                    }

                    //boucle sur tous les "boutons" suggestions envoyés depuis la recherche
                    suggestions.forEach(suggestion => {
                        //création de l'event au click sur chacun de ces boutons
                        suggestion.addEventListener("click", ()=> {
                            //si des tags existent, on vérifie que le text de la suggestion n'est pas présent dans le tableau des tags et on arrête, sinon on continue
                            if(SEARCH_WORLDS_BUTTONS.length > 0){
                                if(buttonsName.includes(suggestion.textContent)) return;
                            }
                            // on affiche le tags dans la zone réservée aux tags en appelant la méthode display tags et en lui envoyant les arguments nécessaires
                            this.display.displayTags(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value);

                            // on instancie la classe filterByClick qui va trier les résultats en focntion du mot cliqué
                            const filter= new _FilterByClick__WEBPACK_IMPORTED_MODULE_3__["default"](results, suggestion.attributes.target.value, suggestion.textContent, this.array);

                            this.dropdownInputs.forEach(input=> input.value= "");
                            this.navigationInput.value= "";

                            //on déclenche la méthode qui va réagir au clic sur un tag créés plus haut
                            this.onClickTags();

                        });
                    });
                }

                // methode qui lance les evènements sur les inputs des dropdowns
                onInputDropdowns(results, ingredients, appareils, ustensiles, array){

                    for(const input of this.dropdownInputs){
                        input.addEventListener("input", ()=> {
                            //on instancie la classe qui va filtrer les suggestions des dropdowns en fonction des lettres entrées dans l'input
                            const filter= new _FilterByInput__WEBPACK_IMPORTED_MODULE_4__["default"](results, ingredients, appareils, ustensiles, input.attributes.name.value, input.value.trim().toLowerCase(), array);
                            // this.onClickTags();
                        })

                    }
                }

                //méthode qui crée les events sur les boutons tags pour les supprimer et relancer un filtre ou reset en fonction du nombre de tags restants
                onClickTags(){
                    //on récupère tous les boutons tags du DOM
                    let SEARCH_WORLDS_BUTTONS= _globals__WEBPACK_IMPORTED_MODULE_0__.SEARCH_WORLDS.querySelectorAll("button");

                    SEARCH_WORLDS_BUTTONS.forEach(button=> {
                        button.addEventListener("click", ()=> {
                            //à chaque clic, on commence par retirer le boutons du DOM
                            _globals__WEBPACK_IMPORTED_MODULE_0__.SEARCH_WORLDS.removeChild(button);
                            //on relance la recherche sur les tags
                            SEARCH_WORLDS_BUTTONS= _globals__WEBPACK_IMPORTED_MODULE_0__.SEARCH_WORLDS.querySelectorAll("button");
                            //s'il reste des tags, on lance une boucle qui filtre les résultats par tags restants
                            if(SEARCH_WORLDS_BUTTONS.length > 0){
                                let results= this.array;

                                for(let i=0; i < SEARCH_WORLDS_BUTTONS.length; i++){
                                    results= new _FilterByClick__WEBPACK_IMPORTED_MODULE_3__["default"](results, SEARCH_WORLDS_BUTTONS[i].attributes.target.value, SEARCH_WORLDS_BUTTONS[i].textContent, this.array);
                                    i++;
                                }

                            }else{
                                // sinon on réinitialise la recherche de base et on efface les recettes
                                const search= new _Search__WEBPACK_IMPORTED_MODULE_1__["default"](this.array);
                                this.display.displayRecipes();
                            }
                        });
                    });
                }

                // évènement sur les liens du message d'erreur pour relancer une recherche sur ces mots si l'utilisateur clique dessus
                onClickErrorLinks(links){
                    links.forEach(link=> link.addEventListener("click", (e)=> {
                        e.preventDefault();
                        //on affiche le mot choisi dans la nav principale
                        this.navigationInput.value= link.innerText;
                        //on lance la recherche sur ce mot comme si l'utilisateur l'avait entré lui-même
                        const search= new _Search__WEBPACK_IMPORTED_MODULE_1__["default"](this.array);
                        search.navigationResearch(this.navigationInput.value.trim().toLowerCase());
                    }))
                }
            }

            /***/ }),

        /***/ "./src/js/model/FilterByClick.js":
        /*!***************************************!*\
  !*** ./src/js/model/FilterByClick.js ***!
  \***************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ FilterByClick)
                /* harmony export */ });
            /* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Display */ "./src/js/model/Display.js");
            /* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Search */ "./src/js/model/Search.js");



//classe qui va filtrer les résultats en fonction du clic sur les suggestions des dropdowns
            class FilterByClick{
                constructor(results, target, suggestion, array){

                    //le tableau des résultats de recherche envoyé à l'instanciation de la classe
                    this.results= results;

                    //le tableau original
                    this.array= array;
                    //la classe d'affichage
                    this.display= new _Display__WEBPACK_IMPORTED_MODULE_0__["default"]();

                    //appelle automatiquement la méthode de tri
                    this.filter(target, suggestion);
                }

                filter(target, suggestion){

                    // vide les recettes de l'affichage
                    this.display.displayRecipes();

                    let filteredResults= [];

                    //en fonction de la target de la suggestion cliquée, on envoie vers la bonne méthode
                    switch(target){
                        case "ingredients" :
                            // filtre en fonction de la valeur envoyée et retourne un nouveau tableau qui ne contient que les recettes qui contiennent le mots clé
                            filteredResults= this.results.filter(result => result.ingredients.includes(suggestion));
                            break;
                        case "appareils" :
                            filteredResults= this.results.filter(result => result.appareils.includes(suggestion));
                            break;
                        case "ustensiles" :
                            filteredResults= this.results.filter(result => result.ustensiles.includes(suggestion));
                            break;
                        default :
                            console.log("no type of filter");
                    }

                    //lance la recherche pour l'afficahge des dropdowns filtrés
                    const search= new _Search__WEBPACK_IMPORTED_MODULE_1__["default"](this.array, filteredResults);

                    for(const result of filteredResults){
                        //affiche dès qu'une recette est trouvée dans les résultats filtrés
                        this.display.displayRecipes(result.recipe);
                    }

                    return filteredResults;
                }
            }

            /***/ }),

        /***/ "./src/js/model/FilterByInput.js":
        /*!***************************************!*\
  !*** ./src/js/model/FilterByInput.js ***!
  \***************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ FilterByInput)
                /* harmony export */ });
            /* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Display */ "./src/js/model/Display.js");
            /* harmony import */ var _EventsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventsManager */ "./src/js/model/EventsManager.js");



//méthode pour filtrer les suggestions en fonctions des entrées dans les inputs des dropdowns
            class FilterByInput{
                constructor(results, ingredients, appareils, ustensiles, target, value, array){
                    this.results= results;
                    this.ingredientsArray= ingredients;
                    this.appareilsArray= appareils;
                    this.ustensilesArray= ustensiles;
                    this.array= array;

                    //switch sur les target pour envoyer vers la bonne méthode, syntaxe différente de filterByClick mais le principe est le même
                    //on lance automatiquement ces méthodes qui font varier les tableaux en fonction...
                    switch(target){
                        case "ingredients" :
                            this.filterByIngredients(value);
                            break;
                        case "appareils" :
                            this.filterByAppareils(value);
                            break;
                        case "ustensiles" :
                            this.filterByUstensiles(value);
                            break;
                        default :
                            console.log("no type of filter");
                    }

                    //... avant de lancer ces classes avec les tableaux retournés en fonction du filtre
                    this.display= new _Display__WEBPACK_IMPORTED_MODULE_0__["default"]();
                    this.suggestions= this.display.displayDropdowns(this.ingredientsArray, this.appareilsArray, this.ustensilesArray);
                    this.events= new _EventsManager__WEBPACK_IMPORTED_MODULE_1__["default"](this.array);
                    this.events.onClickSuggestion(this.suggestions, this.results);

                }

                filterByIngredients(value){

                    this.ingredientsArray= this.ingredientsArray.filter(ingredient => ingredient.includes(value));
                }

                filterByAppareils(value){

                    this.appareilsArray= this.appareilsArray.filter(appareil => appareil.includes(value));
                }

                filterByUstensiles(value){

                    this.ustensilesArray= this.ustensilesArray.filter(ustensile => ustensile.includes(value));
                }
            }

            /***/ }),

        /***/ "./src/js/model/Search.js":
        /*!********************************!*\
  !*** ./src/js/model/Search.js ***!
  \********************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "default": () => (/* binding */ Search)
                /* harmony export */ });
            /* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Display */ "./src/js/model/Display.js");
            /* harmony import */ var _EventsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventsManager */ "./src/js/model/EventsManager.js");
// import { recipes } from "../data/recipes";



// Classe de recherche principale de l'application

            class Search{
                constructor(array, filteredArray){
                    // this.recipes= recipes;
                    //le tableau de base
                    this.array= array;
                    //le tableau retourné dès que l'on tape 3 lettres dans l'input principal pour accélérer les recherches sur les lettres tapées ensuite
                    this.first3LettersResults= [];
                    // la regex pour vérifier qu'au moins 3 lettres ont été tapées
                    this.checkMessage= /^[\s\S]{3,}/;
                    //la classe qui gère les affichages
                    this.display= new _Display__WEBPACK_IMPORTED_MODULE_0__["default"]();

                    //on envoie toujours le tableau de base à ce constructeur, mais on peut aussi lui envoyer un tableau filtré
                    //en fonction de l'envoi on lance la méthode qui cherche les suggestions des dropdowns à afficher avec l'un ou l'autre tableau
                    //cette méthode se lance automatiquement à l'instanciation de la classe parce qu'elle est appelé du constructeur
                    if(filteredArray) this.dropdownResearch(filteredArray);
                    else this.dropdownResearch(this.array);
                }

                //méthode de recherche sur la barre principale
                navigationResearch(value){
                    //vérifie si au moins 3 lettres ont été entrées dans l'input
                    if(this.checkMessage.test(value)){
                        // efface les recettes déjà présentes
                        this.display.displayRecipes();

                        //déclaration d'un tableau de résultats
                        const results= [];

                        //si l'input fait au moins 3 lettres on lance une première recherche sur tout le tableau de base pour retourner un tableau réduit avec les premiers résultats
                        //cela évitera de relancer une boucle sur toutes les recettes à chaque lettres ajoutées
                        if(value.length === 3){
                            //boucle sur tous les résultats du tableau de base
                            for(const recipe of this.array){
                                //mettre ce bloc dans une fonction où on trouvera le tableau en argument

                                //cascade de conditions qui permet d'ajouter une recette à notre tableau de résultats dès qu'il trouve un résultat qui correspond et de s'arrêter là pour passer à la recette suivante
                                //on cherche d'abord dans les noms
                                if(recipe.name.includes(value)){


                                    //on affiche tout de suite la recette correspondante
                                    this.display.displayRecipes(recipe.recipe);
                                    // on push le résultat dans le tableau des résultats
                                    results.push(recipe);

                                }else{
                                    //si on n'a pas trouvé dans les noms, on cherche dans les descriptions
                                    if(recipe.description.includes(value)){

                                        this.display.displayRecipes(recipe.recipe);
                                        results.push(recipe);

                                    }else{
                                        // et si on n'a toujours pas trouvé dans la description, on cherche dans les ingrédients
                                        for(const ingredient of recipe.ingredients){
                                            if(ingredient.includes(value)){

                                                this.display.displayRecipes(recipe.recipe);
                                                results.push(recipe);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }

                            //first3LettersResults devient le tableau de résultats;
                            this.first3LettersResults= results;

                        }else{
                            //au delà de 3 lettres, on trie sur le tableau créé aux 3 premières lettres
                            //on vérifie si un mot n'a pas été rentré d'un bloc (copier coller, suggestions...), dans ce cas, le tableau des premiers résultats sera vide
                            //s'il n'est pas vide
                            if(this.first3LettersResults.length !== 0){
                                for(const recipe of this.first3LettersResults){

                                    if(recipe.name.includes(value)){

                                        results.push(recipe);
                                        this.display.displayRecipes(recipe.recipe);

                                    }else{

                                        if(recipe.description.includes(value)){

                                            results.push(recipe);
                                            this.display.displayRecipes(recipe.recipe);

                                        }else{

                                            for(const ingredient of recipe.ingredients){
                                                if(ingredient.includes(value)){

                                                    results.push(recipe);
                                                    this.display.displayRecipes(recipe.recipe);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }else{
                                //s'il est vide on lance une recherche comme si c'était les 3 premières lettres
                                for(const recipe of this.array){

                                    if(recipe.name.includes(value)){

                                        results.push(recipe);

                                        this.display.displayRecipes(recipe.recipe);

                                    }else{

                                        if(recipe.description.includes(value)){

                                            results.push(recipe);
                                            this.display.displayRecipes(recipe.recipe);

                                        }else{

                                            for(const ingredient of recipe.ingredients){
                                                if(ingredient.includes(value)){

                                                    results.push(recipe);
                                                    this.display.displayRecipes(recipe.recipe);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }

                                this.first3LettersResults= results;

                            }

                        }

                        //s'il n'y a aucun résultats, on affiche un message
                        //pour proposer des suggestions aléatoires et dynamiques dans le message, on tire 2 nombres au hasard qui désigneront des résultats
                        // à mettre dans display...
                        if(results.length <= 0){
                            //ici, on va non seulement afficher un message d'erreur mais aussi initier une recherche si l'utilisateur clique sur l'une des propositions
                            const events= new _EventsManager__WEBPACK_IMPORTED_MODULE_1__["default"](this.array);
                            const randomNumbers= [];
                            for(let i= 0; i<2; i++) {
                                randomNumbers.push(Math.floor(Math.random()*this.array.length));
                            }
                            //on envoie les recettes avec les index aléatoires au display pour l'affichage
                            const links= this.display.displayErrorMessage(this.array[randomNumbers[0]].recipe, this.array[randomNumbers[1]].recipe);
                            events.onClickErrorLinks(links);
                        }else{
                            //sinon on lance la recherche qui crée les listes de suggestions dans les dropdowns avec ce tableau de résultats
                            this.dropdownResearch(results);

                        }

                        //et si moins de 3 lettres ont entrées dans l'input, on reset (le tableau de résultats, les suggestions du dropdown avec le tableau de base, et )
                    }else{
                        this.first3LettersResults= [];
                        this.dropdownResearch(this.array);
                        // n'affiche aucune recette
                        this.display.displayRecipes();
                    }
                }

                //méthode qui cherche toutes les suggestions à afficher dans les dropdowns en évitant les doublons
                dropdownResearch(results){

                    //crée un tableau d'ingrédients à partir des résultats envoyés
                    let ingredientsArray= [];
                    for(const result of results){
                        for(const ingredient of result.ingredients){
                            //ajoute tous les ingrédients dans un tableau
                            ingredientsArray.push(ingredient);

                        }

                    }
                    //retire tous les doublons du tableau et retourne le tableau "filtré"
                    ingredientsArray= Array.from(new Set(ingredientsArray));
                    //trie le tableau par ordre alphabétique, les listes seront affichées par ordre alphabétique
                    ingredientsArray.sort();

                    //même méthode pour les appareils
                    let appareilsArray= [];
                    for(const result of results){
                        appareilsArray.push(result.appareils);

                    }
                    appareilsArray= Array.from(new Set(appareilsArray));
                    appareilsArray.sort();

                    //et pour les ustensiles
                    let ustensilesArray= [];
                    for(const result of results){
                        for(const ustensile of result.ustensiles){
                            ustensilesArray.push(ustensile);

                        }
                    }
                    ustensilesArray= Array.from(new Set(ustensilesArray));
                    ustensilesArray.sort();

                    //on instancie eventsManager pour pouvoir appeler la méthode sur les clics des suggestions créées et les inputs des dropdowns
                    const events= new _EventsManager__WEBPACK_IMPORTED_MODULE_1__["default"](this.array);

                    //on appelle la méthode displayDropdowns qui crée l'affichage des dropdowns et retourne un tableau des suggestions
                    const suggestions= this.display.displayDropdowns(ingredientsArray, appareilsArray, ustensilesArray);

                    events.onClickSuggestion(suggestions, results);
                    events.onInputDropdowns(results, ingredientsArray, appareilsArray, ustensilesArray, this.array);
                }
            }

            /***/ }),

        /***/ "./src/js/model/globals.js":
        /*!*********************************!*\
  !*** ./src/js/model/globals.js ***!
  \*********************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "NAV_SEARCH": () => (/* binding */ NAV_SEARCH),
                /* harmony export */   "INGREDIENTS_SUGGESTIONS": () => (/* binding */ INGREDIENTS_SUGGESTIONS),
                /* harmony export */   "APPAREILS_SUGGESTIONS": () => (/* binding */ APPAREILS_SUGGESTIONS),
                /* harmony export */   "USTENSILES_SUGGESTIONS": () => (/* binding */ USTENSILES_SUGGESTIONS),
                /* harmony export */   "RECIPE_CARDS": () => (/* binding */ RECIPE_CARDS),
                /* harmony export */   "SEARCH_WORLDS": () => (/* binding */ SEARCH_WORLDS),
                /* harmony export */   "DROPDOWN_INPUTS": () => (/* binding */ DROPDOWN_INPUTS)
                /* harmony export */ });
//fichier contenant les variables globales au projet, notamment les éléments du DOM à récupérer pour leur utilisation commune dans les différentes classes

            const NAV_SEARCH= document.getElementById("nav-search");
            const INGREDIENTS_SUGGESTIONS= document.querySelectorAll(".ingredients-suggestions");
            const APPAREILS_SUGGESTIONS= document.querySelectorAll(".appareils-suggestions");
            const USTENSILES_SUGGESTIONS= document.querySelectorAll(".ustensiles-suggestions");
            const RECIPE_CARDS= document.querySelector("#cards .row");
            const SEARCH_WORLDS= document.getElementById("search-worlds");
            const DROPDOWN_INPUTS= document.querySelectorAll(".dropdown-input");


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
    /******/ 	/* webpack/runtime/compat get default export */
    /******/ 	(() => {
        /******/ 		// getDefaultExport function for compatibility with non-harmony modules
        /******/ 		__webpack_require__.n = (module) => {
            /******/ 			var getter = module && module.__esModule ?
                /******/ 				() => (module['default']) :
                /******/ 				() => (module);
            /******/ 			__webpack_require__.d(getter, { a: getter });
            /******/ 			return getter;
            /******/ 		};
        /******/ 	})();
    /******/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
        /******/ 		// define getter functions for harmony exports
        /******/ 		__webpack_require__.d = (exports, definition) => {
            /******/ 			for(var key in definition) {
                /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/ 				}
                /******/ 			}
            /******/ 		};
        /******/ 	})();
    /******/
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	(() => {
        /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
        /******/ 	})();
    /******/
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
        /******/ 		// define __esModule on exports
        /******/ 		__webpack_require__.r = (exports) => {
            /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/ 			}
            /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
            /******/ 		};
        /******/ 	})();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
    (() => {
        "use strict";
        /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/main.scss */ "./src/sass/main.scss");
        /* harmony import */ var _node_modules_bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/bootstrap/js/dist/dropdown */ "./node_modules/bootstrap/js/dist/dropdown.js");
        /* harmony import */ var _node_modules_bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_1__);
        /* harmony import */ var _js_data_recipes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/data/recipes */ "./src/js/data/recipes.js");
        /* harmony import */ var _js_model_Arrays__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/model/Arrays */ "./src/js/model/Arrays.js");
        /* harmony import */ var _js_model_EventsManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/model/EventsManager */ "./src/js/model/EventsManager.js");
//import du main.scss


// import des fonctions liées au dropdown de bootsrap 5







//on crée un tableau normalisé avec les datas pour faciliter les recherches sur le site à son ouverture
        const arrays= new _js_model_Arrays__WEBPACK_IMPORTED_MODULE_3__["default"](_js_data_recipes__WEBPACK_IMPORTED_MODULE_2__.recipes);

//on instancie la classe eventsManager qui va initialiser tous les events sur l'application et on lui passe le tableau de base en argument
        const events= new _js_model_EventsManager__WEBPACK_IMPORTED_MODULE_4__["default"](arrays.navigationArrayGenerator());
        events.init();
    })();

    /******/ })()
;
