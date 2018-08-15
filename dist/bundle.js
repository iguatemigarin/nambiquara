(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.nambiquara = {})));
}(this, (function (exports) { 'use strict';

	const empty = null;

	exports.empty = empty;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
