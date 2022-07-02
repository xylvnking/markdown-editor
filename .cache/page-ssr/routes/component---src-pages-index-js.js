exports.id = "component---src-pages-index-js";
exports.ids = ["component---src-pages-index-js"];
exports.modules = {

/***/ "./node_modules/extend/index.js":
/*!**************************************!*\
  !*** ./node_modules/extend/index.js ***!
  \**************************************/
/***/ ((module) => {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-markdown */ "./node_modules/react-markdown/lib/react-markdown.js");


const markdown = "a random string to **test the markdown**"; // markup

const IndexPage = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_markdown__WEBPACK_IMPORTED_MODULE_1__.ReactMarkdown, {
    children: markdown
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexPage);

/***/ }),

/***/ "./node_modules/has-flag/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-flag/index.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ "./node_modules/inline-style-parser/index.js":
/*!***************************************************!*\
  !*** ./node_modules/inline-style-parser/index.js ***!
  \***************************************************/
/***/ ((module) => {

// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;

// declaration
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;

// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
var TRIM_REGEX = /^\s+|\s+$/g;

// strings
var NEWLINE = '\n';
var FORWARD_SLASH = '/';
var ASTERISK = '*';
var EMPTY_STRING = '';

// types
var TYPE_COMMENT = 'comment';
var TYPE_DECLARATION = 'declaration';

/**
 * @param {String} style
 * @param {Object} [options]
 * @return {Object[]}
 * @throws {TypeError}
 * @throws {Error}
 */
module.exports = function(style, options) {
  if (typeof style !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (!style) return [];

  options = options || {};

  /**
   * Positional.
   */
  var lineno = 1;
  var column = 1;

  /**
   * Update lineno and column based on `str`.
   *
   * @param {String} str
   */
  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf(NEWLINE);
    column = ~i ? str.length - i : column + str.length;
  }

  /**
   * Mark position and patch `node.position`.
   *
   * @return {Function}
   */
  function position() {
    var start = { line: lineno, column: column };
    return function(node) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }

  /**
   * Store position information for a node.
   *
   * @constructor
   * @property {Object} start
   * @property {Object} end
   * @property {undefined|String} source
   */
  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column: column };
    this.source = options.source;
  }

  /**
   * Non-enumerable source string.
   */
  Position.prototype.content = style;

  var errorsList = [];

  /**
   * Error `msg`.
   *
   * @param {String} msg
   * @throws {Error}
   */
  function error(msg) {
    var err = new Error(
      options.source + ':' + lineno + ':' + column + ': ' + msg
    );
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = style;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }

  /**
   * Match `re` and return captures.
   *
   * @param {RegExp} re
   * @return {undefined|Array}
   */
  function match(re) {
    var m = re.exec(style);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m;
  }

  /**
   * Parse whitespace.
   */
  function whitespace() {
    match(WHITESPACE_REGEX);
  }

  /**
   * Parse comments.
   *
   * @param {Object[]} [rules]
   * @return {Object[]}
   */
  function comments(rules) {
    var c;
    rules = rules || [];
    while ((c = comment())) {
      if (c !== false) {
        rules.push(c);
      }
    }
    return rules;
  }

  /**
   * Parse comment.
   *
   * @return {Object}
   * @throws {Error}
   */
  function comment() {
    var pos = position();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;

    var i = 2;
    while (
      EMPTY_STRING != style.charAt(i) &&
      (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))
    ) {
      ++i;
    }
    i += 2;

    if (EMPTY_STRING === style.charAt(i - 1)) {
      return error('End of comment missing');
    }

    var str = style.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    style = style.slice(i);
    column += 2;

    return pos({
      type: TYPE_COMMENT,
      comment: str
    });
  }

  /**
   * Parse declaration.
   *
   * @return {Object}
   * @throws {Error}
   */
  function declaration() {
    var pos = position();

    // prop
    var prop = match(PROPERTY_REGEX);
    if (!prop) return;
    comment();

    // :
    if (!match(COLON_REGEX)) return error("property missing ':'");

    // val
    var val = match(VALUE_REGEX);

    var ret = pos({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val
        ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING))
        : EMPTY_STRING
    });

    // ;
    match(SEMICOLON_REGEX);

    return ret;
  }

  /**
   * Parse declarations.
   *
   * @return {Object[]}
   */
  function declarations() {
    var decls = [];

    comments(decls);

    // declarations
    var decl;
    while ((decl = declaration())) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    return decls;
  }

  whitespace();
  return declarations();
};

/**
 * Trim `str`.
 *
 * @param {String} str
 * @return {String}
 */
function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/***/ ((module) => {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "./node_modules/mdurl/encode.js":
/*!**************************************!*\
  !*** ./node_modules/mdurl/encode.js ***!
  \**************************************/
/***/ ((module) => {

"use strict";




var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";


module.exports = encode;


/***/ }),

/***/ "./node_modules/micromark/node_modules/debug/src/browser.js":
/*!******************************************************************!*\
  !*** ./node_modules/micromark/node_modules/debug/src/browser.js ***!
  \******************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = ({}).DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/micromark/node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/micromark/node_modules/debug/src/common.js":
/*!*****************************************************************!*\
  !*** ./node_modules/micromark/node_modules/debug/src/common.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/micromark/node_modules/debug/src/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/micromark/node_modules/debug/src/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(/*! ./browser.js */ "./node_modules/micromark/node_modules/debug/src/browser.js");
} else {
	module.exports = __webpack_require__(/*! ./node.js */ "./node_modules/micromark/node_modules/debug/src/node.js");
}


/***/ }),

/***/ "./node_modules/micromark/node_modules/debug/src/node.js":
/*!***************************************************************!*\
  !*** ./node_modules/micromark/node_modules/debug/src/node.js ***!
  \***************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(/*! tty */ "tty");
const util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(/*! supports-color */ "./node_modules/supports-color/index.js");

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(({})).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = ({})[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		({}).DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete ({}).DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return ({}).DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/micromark/node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/react-markdown/node_modules/react-is/cjs/react-is.development.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/react-markdown/node_modules/react-is/cjs/react-is.development.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_SERVER_CONTEXT_TYPE:
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false;
var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
    }
  }

  return false;
}
function isConcurrentMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
      hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
    }
  }

  return false;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}
function isSuspenseList(object) {
  return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
}

exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.SuspenseList = SuspenseList;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isSuspenseList = isSuspenseList;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-markdown/node_modules/react-is/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-markdown/node_modules/react-is/index.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-markdown/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/style-to-object/index.js":
/*!***********************************************!*\
  !*** ./node_modules/style-to-object/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parse = __webpack_require__(/*! inline-style-parser */ "./node_modules/inline-style-parser/index.js");

/**
 * Parses inline style to object.
 *
 * @example
 * // returns { 'line-height': '42' }
 * StyleToObject('line-height: 42;');
 *
 * @param  {String}      style      - The inline style.
 * @param  {Function}    [iterator] - The iterator function.
 * @return {null|Object}
 */
function StyleToObject(style, iterator) {
  var output = null;
  if (!style || typeof style !== 'string') {
    return output;
  }

  var declaration;
  var declarations = parse(style);
  var hasIterator = typeof iterator === 'function';
  var property;
  var value;

  for (var i = 0, len = declarations.length; i < len; i++) {
    declaration = declarations[i];
    property = declaration.property;
    value = declaration.value;

    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      output || (output = {});
      output[property] = value;
    }
  }

  return output;
}

module.exports = StyleToObject;


/***/ }),

/***/ "./node_modules/supports-color/index.js":
/*!**********************************************!*\
  !*** ./node_modules/supports-color/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const hasFlag = __webpack_require__(/*! has-flag */ "./node_modules/has-flag/index.js");

const env = ({});

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ "./node_modules/bail/index.js":
/*!************************************!*\
  !*** ./node_modules/bail/index.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bail": () => (/* binding */ bail)
/* harmony export */ });
/**
 * Throw a given error.
 *
 * @param {Error|null|undefined} [error]
 *   Maybe error.
 * @returns {asserts error is null|undefined}
 */
function bail(error) {
  if (error) {
    throw error
  }
}


/***/ }),

/***/ "./node_modules/character-entities/index.js":
/*!**************************************************!*\
  !*** ./node_modules/character-entities/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "characterEntities": () => (/* binding */ characterEntities)
/* harmony export */ });
/**
 * Map of named character references.
 *
 * @type {Record<string, string>}
 */
const characterEntities = {
  AElig: 'Æ',
  AMP: '&',
  Aacute: 'Á',
  Abreve: 'Ă',
  Acirc: 'Â',
  Acy: 'А',
  Afr: '𝔄',
  Agrave: 'À',
  Alpha: 'Α',
  Amacr: 'Ā',
  And: '⩓',
  Aogon: 'Ą',
  Aopf: '𝔸',
  ApplyFunction: '⁡',
  Aring: 'Å',
  Ascr: '𝒜',
  Assign: '≔',
  Atilde: 'Ã',
  Auml: 'Ä',
  Backslash: '∖',
  Barv: '⫧',
  Barwed: '⌆',
  Bcy: 'Б',
  Because: '∵',
  Bernoullis: 'ℬ',
  Beta: 'Β',
  Bfr: '𝔅',
  Bopf: '𝔹',
  Breve: '˘',
  Bscr: 'ℬ',
  Bumpeq: '≎',
  CHcy: 'Ч',
  COPY: '©',
  Cacute: 'Ć',
  Cap: '⋒',
  CapitalDifferentialD: 'ⅅ',
  Cayleys: 'ℭ',
  Ccaron: 'Č',
  Ccedil: 'Ç',
  Ccirc: 'Ĉ',
  Cconint: '∰',
  Cdot: 'Ċ',
  Cedilla: '¸',
  CenterDot: '·',
  Cfr: 'ℭ',
  Chi: 'Χ',
  CircleDot: '⊙',
  CircleMinus: '⊖',
  CirclePlus: '⊕',
  CircleTimes: '⊗',
  ClockwiseContourIntegral: '∲',
  CloseCurlyDoubleQuote: '”',
  CloseCurlyQuote: '’',
  Colon: '∷',
  Colone: '⩴',
  Congruent: '≡',
  Conint: '∯',
  ContourIntegral: '∮',
  Copf: 'ℂ',
  Coproduct: '∐',
  CounterClockwiseContourIntegral: '∳',
  Cross: '⨯',
  Cscr: '𝒞',
  Cup: '⋓',
  CupCap: '≍',
  DD: 'ⅅ',
  DDotrahd: '⤑',
  DJcy: 'Ђ',
  DScy: 'Ѕ',
  DZcy: 'Џ',
  Dagger: '‡',
  Darr: '↡',
  Dashv: '⫤',
  Dcaron: 'Ď',
  Dcy: 'Д',
  Del: '∇',
  Delta: 'Δ',
  Dfr: '𝔇',
  DiacriticalAcute: '´',
  DiacriticalDot: '˙',
  DiacriticalDoubleAcute: '˝',
  DiacriticalGrave: '`',
  DiacriticalTilde: '˜',
  Diamond: '⋄',
  DifferentialD: 'ⅆ',
  Dopf: '𝔻',
  Dot: '¨',
  DotDot: '⃜',
  DotEqual: '≐',
  DoubleContourIntegral: '∯',
  DoubleDot: '¨',
  DoubleDownArrow: '⇓',
  DoubleLeftArrow: '⇐',
  DoubleLeftRightArrow: '⇔',
  DoubleLeftTee: '⫤',
  DoubleLongLeftArrow: '⟸',
  DoubleLongLeftRightArrow: '⟺',
  DoubleLongRightArrow: '⟹',
  DoubleRightArrow: '⇒',
  DoubleRightTee: '⊨',
  DoubleUpArrow: '⇑',
  DoubleUpDownArrow: '⇕',
  DoubleVerticalBar: '∥',
  DownArrow: '↓',
  DownArrowBar: '⤓',
  DownArrowUpArrow: '⇵',
  DownBreve: '̑',
  DownLeftRightVector: '⥐',
  DownLeftTeeVector: '⥞',
  DownLeftVector: '↽',
  DownLeftVectorBar: '⥖',
  DownRightTeeVector: '⥟',
  DownRightVector: '⇁',
  DownRightVectorBar: '⥗',
  DownTee: '⊤',
  DownTeeArrow: '↧',
  Downarrow: '⇓',
  Dscr: '𝒟',
  Dstrok: 'Đ',
  ENG: 'Ŋ',
  ETH: 'Ð',
  Eacute: 'É',
  Ecaron: 'Ě',
  Ecirc: 'Ê',
  Ecy: 'Э',
  Edot: 'Ė',
  Efr: '𝔈',
  Egrave: 'È',
  Element: '∈',
  Emacr: 'Ē',
  EmptySmallSquare: '◻',
  EmptyVerySmallSquare: '▫',
  Eogon: 'Ę',
  Eopf: '𝔼',
  Epsilon: 'Ε',
  Equal: '⩵',
  EqualTilde: '≂',
  Equilibrium: '⇌',
  Escr: 'ℰ',
  Esim: '⩳',
  Eta: 'Η',
  Euml: 'Ë',
  Exists: '∃',
  ExponentialE: 'ⅇ',
  Fcy: 'Ф',
  Ffr: '𝔉',
  FilledSmallSquare: '◼',
  FilledVerySmallSquare: '▪',
  Fopf: '𝔽',
  ForAll: '∀',
  Fouriertrf: 'ℱ',
  Fscr: 'ℱ',
  GJcy: 'Ѓ',
  GT: '>',
  Gamma: 'Γ',
  Gammad: 'Ϝ',
  Gbreve: 'Ğ',
  Gcedil: 'Ģ',
  Gcirc: 'Ĝ',
  Gcy: 'Г',
  Gdot: 'Ġ',
  Gfr: '𝔊',
  Gg: '⋙',
  Gopf: '𝔾',
  GreaterEqual: '≥',
  GreaterEqualLess: '⋛',
  GreaterFullEqual: '≧',
  GreaterGreater: '⪢',
  GreaterLess: '≷',
  GreaterSlantEqual: '⩾',
  GreaterTilde: '≳',
  Gscr: '𝒢',
  Gt: '≫',
  HARDcy: 'Ъ',
  Hacek: 'ˇ',
  Hat: '^',
  Hcirc: 'Ĥ',
  Hfr: 'ℌ',
  HilbertSpace: 'ℋ',
  Hopf: 'ℍ',
  HorizontalLine: '─',
  Hscr: 'ℋ',
  Hstrok: 'Ħ',
  HumpDownHump: '≎',
  HumpEqual: '≏',
  IEcy: 'Е',
  IJlig: 'Ĳ',
  IOcy: 'Ё',
  Iacute: 'Í',
  Icirc: 'Î',
  Icy: 'И',
  Idot: 'İ',
  Ifr: 'ℑ',
  Igrave: 'Ì',
  Im: 'ℑ',
  Imacr: 'Ī',
  ImaginaryI: 'ⅈ',
  Implies: '⇒',
  Int: '∬',
  Integral: '∫',
  Intersection: '⋂',
  InvisibleComma: '⁣',
  InvisibleTimes: '⁢',
  Iogon: 'Į',
  Iopf: '𝕀',
  Iota: 'Ι',
  Iscr: 'ℐ',
  Itilde: 'Ĩ',
  Iukcy: 'І',
  Iuml: 'Ï',
  Jcirc: 'Ĵ',
  Jcy: 'Й',
  Jfr: '𝔍',
  Jopf: '𝕁',
  Jscr: '𝒥',
  Jsercy: 'Ј',
  Jukcy: 'Є',
  KHcy: 'Х',
  KJcy: 'Ќ',
  Kappa: 'Κ',
  Kcedil: 'Ķ',
  Kcy: 'К',
  Kfr: '𝔎',
  Kopf: '𝕂',
  Kscr: '𝒦',
  LJcy: 'Љ',
  LT: '<',
  Lacute: 'Ĺ',
  Lambda: 'Λ',
  Lang: '⟪',
  Laplacetrf: 'ℒ',
  Larr: '↞',
  Lcaron: 'Ľ',
  Lcedil: 'Ļ',
  Lcy: 'Л',
  LeftAngleBracket: '⟨',
  LeftArrow: '←',
  LeftArrowBar: '⇤',
  LeftArrowRightArrow: '⇆',
  LeftCeiling: '⌈',
  LeftDoubleBracket: '⟦',
  LeftDownTeeVector: '⥡',
  LeftDownVector: '⇃',
  LeftDownVectorBar: '⥙',
  LeftFloor: '⌊',
  LeftRightArrow: '↔',
  LeftRightVector: '⥎',
  LeftTee: '⊣',
  LeftTeeArrow: '↤',
  LeftTeeVector: '⥚',
  LeftTriangle: '⊲',
  LeftTriangleBar: '⧏',
  LeftTriangleEqual: '⊴',
  LeftUpDownVector: '⥑',
  LeftUpTeeVector: '⥠',
  LeftUpVector: '↿',
  LeftUpVectorBar: '⥘',
  LeftVector: '↼',
  LeftVectorBar: '⥒',
  Leftarrow: '⇐',
  Leftrightarrow: '⇔',
  LessEqualGreater: '⋚',
  LessFullEqual: '≦',
  LessGreater: '≶',
  LessLess: '⪡',
  LessSlantEqual: '⩽',
  LessTilde: '≲',
  Lfr: '𝔏',
  Ll: '⋘',
  Lleftarrow: '⇚',
  Lmidot: 'Ŀ',
  LongLeftArrow: '⟵',
  LongLeftRightArrow: '⟷',
  LongRightArrow: '⟶',
  Longleftarrow: '⟸',
  Longleftrightarrow: '⟺',
  Longrightarrow: '⟹',
  Lopf: '𝕃',
  LowerLeftArrow: '↙',
  LowerRightArrow: '↘',
  Lscr: 'ℒ',
  Lsh: '↰',
  Lstrok: 'Ł',
  Lt: '≪',
  Map: '⤅',
  Mcy: 'М',
  MediumSpace: ' ',
  Mellintrf: 'ℳ',
  Mfr: '𝔐',
  MinusPlus: '∓',
  Mopf: '𝕄',
  Mscr: 'ℳ',
  Mu: 'Μ',
  NJcy: 'Њ',
  Nacute: 'Ń',
  Ncaron: 'Ň',
  Ncedil: 'Ņ',
  Ncy: 'Н',
  NegativeMediumSpace: '​',
  NegativeThickSpace: '​',
  NegativeThinSpace: '​',
  NegativeVeryThinSpace: '​',
  NestedGreaterGreater: '≫',
  NestedLessLess: '≪',
  NewLine: '\n',
  Nfr: '𝔑',
  NoBreak: '⁠',
  NonBreakingSpace: ' ',
  Nopf: 'ℕ',
  Not: '⫬',
  NotCongruent: '≢',
  NotCupCap: '≭',
  NotDoubleVerticalBar: '∦',
  NotElement: '∉',
  NotEqual: '≠',
  NotEqualTilde: '≂̸',
  NotExists: '∄',
  NotGreater: '≯',
  NotGreaterEqual: '≱',
  NotGreaterFullEqual: '≧̸',
  NotGreaterGreater: '≫̸',
  NotGreaterLess: '≹',
  NotGreaterSlantEqual: '⩾̸',
  NotGreaterTilde: '≵',
  NotHumpDownHump: '≎̸',
  NotHumpEqual: '≏̸',
  NotLeftTriangle: '⋪',
  NotLeftTriangleBar: '⧏̸',
  NotLeftTriangleEqual: '⋬',
  NotLess: '≮',
  NotLessEqual: '≰',
  NotLessGreater: '≸',
  NotLessLess: '≪̸',
  NotLessSlantEqual: '⩽̸',
  NotLessTilde: '≴',
  NotNestedGreaterGreater: '⪢̸',
  NotNestedLessLess: '⪡̸',
  NotPrecedes: '⊀',
  NotPrecedesEqual: '⪯̸',
  NotPrecedesSlantEqual: '⋠',
  NotReverseElement: '∌',
  NotRightTriangle: '⋫',
  NotRightTriangleBar: '⧐̸',
  NotRightTriangleEqual: '⋭',
  NotSquareSubset: '⊏̸',
  NotSquareSubsetEqual: '⋢',
  NotSquareSuperset: '⊐̸',
  NotSquareSupersetEqual: '⋣',
  NotSubset: '⊂⃒',
  NotSubsetEqual: '⊈',
  NotSucceeds: '⊁',
  NotSucceedsEqual: '⪰̸',
  NotSucceedsSlantEqual: '⋡',
  NotSucceedsTilde: '≿̸',
  NotSuperset: '⊃⃒',
  NotSupersetEqual: '⊉',
  NotTilde: '≁',
  NotTildeEqual: '≄',
  NotTildeFullEqual: '≇',
  NotTildeTilde: '≉',
  NotVerticalBar: '∤',
  Nscr: '𝒩',
  Ntilde: 'Ñ',
  Nu: 'Ν',
  OElig: 'Œ',
  Oacute: 'Ó',
  Ocirc: 'Ô',
  Ocy: 'О',
  Odblac: 'Ő',
  Ofr: '𝔒',
  Ograve: 'Ò',
  Omacr: 'Ō',
  Omega: 'Ω',
  Omicron: 'Ο',
  Oopf: '𝕆',
  OpenCurlyDoubleQuote: '“',
  OpenCurlyQuote: '‘',
  Or: '⩔',
  Oscr: '𝒪',
  Oslash: 'Ø',
  Otilde: 'Õ',
  Otimes: '⨷',
  Ouml: 'Ö',
  OverBar: '‾',
  OverBrace: '⏞',
  OverBracket: '⎴',
  OverParenthesis: '⏜',
  PartialD: '∂',
  Pcy: 'П',
  Pfr: '𝔓',
  Phi: 'Φ',
  Pi: 'Π',
  PlusMinus: '±',
  Poincareplane: 'ℌ',
  Popf: 'ℙ',
  Pr: '⪻',
  Precedes: '≺',
  PrecedesEqual: '⪯',
  PrecedesSlantEqual: '≼',
  PrecedesTilde: '≾',
  Prime: '″',
  Product: '∏',
  Proportion: '∷',
  Proportional: '∝',
  Pscr: '𝒫',
  Psi: 'Ψ',
  QUOT: '"',
  Qfr: '𝔔',
  Qopf: 'ℚ',
  Qscr: '𝒬',
  RBarr: '⤐',
  REG: '®',
  Racute: 'Ŕ',
  Rang: '⟫',
  Rarr: '↠',
  Rarrtl: '⤖',
  Rcaron: 'Ř',
  Rcedil: 'Ŗ',
  Rcy: 'Р',
  Re: 'ℜ',
  ReverseElement: '∋',
  ReverseEquilibrium: '⇋',
  ReverseUpEquilibrium: '⥯',
  Rfr: 'ℜ',
  Rho: 'Ρ',
  RightAngleBracket: '⟩',
  RightArrow: '→',
  RightArrowBar: '⇥',
  RightArrowLeftArrow: '⇄',
  RightCeiling: '⌉',
  RightDoubleBracket: '⟧',
  RightDownTeeVector: '⥝',
  RightDownVector: '⇂',
  RightDownVectorBar: '⥕',
  RightFloor: '⌋',
  RightTee: '⊢',
  RightTeeArrow: '↦',
  RightTeeVector: '⥛',
  RightTriangle: '⊳',
  RightTriangleBar: '⧐',
  RightTriangleEqual: '⊵',
  RightUpDownVector: '⥏',
  RightUpTeeVector: '⥜',
  RightUpVector: '↾',
  RightUpVectorBar: '⥔',
  RightVector: '⇀',
  RightVectorBar: '⥓',
  Rightarrow: '⇒',
  Ropf: 'ℝ',
  RoundImplies: '⥰',
  Rrightarrow: '⇛',
  Rscr: 'ℛ',
  Rsh: '↱',
  RuleDelayed: '⧴',
  SHCHcy: 'Щ',
  SHcy: 'Ш',
  SOFTcy: 'Ь',
  Sacute: 'Ś',
  Sc: '⪼',
  Scaron: 'Š',
  Scedil: 'Ş',
  Scirc: 'Ŝ',
  Scy: 'С',
  Sfr: '𝔖',
  ShortDownArrow: '↓',
  ShortLeftArrow: '←',
  ShortRightArrow: '→',
  ShortUpArrow: '↑',
  Sigma: 'Σ',
  SmallCircle: '∘',
  Sopf: '𝕊',
  Sqrt: '√',
  Square: '□',
  SquareIntersection: '⊓',
  SquareSubset: '⊏',
  SquareSubsetEqual: '⊑',
  SquareSuperset: '⊐',
  SquareSupersetEqual: '⊒',
  SquareUnion: '⊔',
  Sscr: '𝒮',
  Star: '⋆',
  Sub: '⋐',
  Subset: '⋐',
  SubsetEqual: '⊆',
  Succeeds: '≻',
  SucceedsEqual: '⪰',
  SucceedsSlantEqual: '≽',
  SucceedsTilde: '≿',
  SuchThat: '∋',
  Sum: '∑',
  Sup: '⋑',
  Superset: '⊃',
  SupersetEqual: '⊇',
  Supset: '⋑',
  THORN: 'Þ',
  TRADE: '™',
  TSHcy: 'Ћ',
  TScy: 'Ц',
  Tab: '\t',
  Tau: 'Τ',
  Tcaron: 'Ť',
  Tcedil: 'Ţ',
  Tcy: 'Т',
  Tfr: '𝔗',
  Therefore: '∴',
  Theta: 'Θ',
  ThickSpace: '  ',
  ThinSpace: ' ',
  Tilde: '∼',
  TildeEqual: '≃',
  TildeFullEqual: '≅',
  TildeTilde: '≈',
  Topf: '𝕋',
  TripleDot: '⃛',
  Tscr: '𝒯',
  Tstrok: 'Ŧ',
  Uacute: 'Ú',
  Uarr: '↟',
  Uarrocir: '⥉',
  Ubrcy: 'Ў',
  Ubreve: 'Ŭ',
  Ucirc: 'Û',
  Ucy: 'У',
  Udblac: 'Ű',
  Ufr: '𝔘',
  Ugrave: 'Ù',
  Umacr: 'Ū',
  UnderBar: '_',
  UnderBrace: '⏟',
  UnderBracket: '⎵',
  UnderParenthesis: '⏝',
  Union: '⋃',
  UnionPlus: '⊎',
  Uogon: 'Ų',
  Uopf: '𝕌',
  UpArrow: '↑',
  UpArrowBar: '⤒',
  UpArrowDownArrow: '⇅',
  UpDownArrow: '↕',
  UpEquilibrium: '⥮',
  UpTee: '⊥',
  UpTeeArrow: '↥',
  Uparrow: '⇑',
  Updownarrow: '⇕',
  UpperLeftArrow: '↖',
  UpperRightArrow: '↗',
  Upsi: 'ϒ',
  Upsilon: 'Υ',
  Uring: 'Ů',
  Uscr: '𝒰',
  Utilde: 'Ũ',
  Uuml: 'Ü',
  VDash: '⊫',
  Vbar: '⫫',
  Vcy: 'В',
  Vdash: '⊩',
  Vdashl: '⫦',
  Vee: '⋁',
  Verbar: '‖',
  Vert: '‖',
  VerticalBar: '∣',
  VerticalLine: '|',
  VerticalSeparator: '❘',
  VerticalTilde: '≀',
  VeryThinSpace: ' ',
  Vfr: '𝔙',
  Vopf: '𝕍',
  Vscr: '𝒱',
  Vvdash: '⊪',
  Wcirc: 'Ŵ',
  Wedge: '⋀',
  Wfr: '𝔚',
  Wopf: '𝕎',
  Wscr: '𝒲',
  Xfr: '𝔛',
  Xi: 'Ξ',
  Xopf: '𝕏',
  Xscr: '𝒳',
  YAcy: 'Я',
  YIcy: 'Ї',
  YUcy: 'Ю',
  Yacute: 'Ý',
  Ycirc: 'Ŷ',
  Ycy: 'Ы',
  Yfr: '𝔜',
  Yopf: '𝕐',
  Yscr: '𝒴',
  Yuml: 'Ÿ',
  ZHcy: 'Ж',
  Zacute: 'Ź',
  Zcaron: 'Ž',
  Zcy: 'З',
  Zdot: 'Ż',
  ZeroWidthSpace: '​',
  Zeta: 'Ζ',
  Zfr: 'ℨ',
  Zopf: 'ℤ',
  Zscr: '𝒵',
  aacute: 'á',
  abreve: 'ă',
  ac: '∾',
  acE: '∾̳',
  acd: '∿',
  acirc: 'â',
  acute: '´',
  acy: 'а',
  aelig: 'æ',
  af: '⁡',
  afr: '𝔞',
  agrave: 'à',
  alefsym: 'ℵ',
  aleph: 'ℵ',
  alpha: 'α',
  amacr: 'ā',
  amalg: '⨿',
  amp: '&',
  and: '∧',
  andand: '⩕',
  andd: '⩜',
  andslope: '⩘',
  andv: '⩚',
  ang: '∠',
  ange: '⦤',
  angle: '∠',
  angmsd: '∡',
  angmsdaa: '⦨',
  angmsdab: '⦩',
  angmsdac: '⦪',
  angmsdad: '⦫',
  angmsdae: '⦬',
  angmsdaf: '⦭',
  angmsdag: '⦮',
  angmsdah: '⦯',
  angrt: '∟',
  angrtvb: '⊾',
  angrtvbd: '⦝',
  angsph: '∢',
  angst: 'Å',
  angzarr: '⍼',
  aogon: 'ą',
  aopf: '𝕒',
  ap: '≈',
  apE: '⩰',
  apacir: '⩯',
  ape: '≊',
  apid: '≋',
  apos: "'",
  approx: '≈',
  approxeq: '≊',
  aring: 'å',
  ascr: '𝒶',
  ast: '*',
  asymp: '≈',
  asympeq: '≍',
  atilde: 'ã',
  auml: 'ä',
  awconint: '∳',
  awint: '⨑',
  bNot: '⫭',
  backcong: '≌',
  backepsilon: '϶',
  backprime: '‵',
  backsim: '∽',
  backsimeq: '⋍',
  barvee: '⊽',
  barwed: '⌅',
  barwedge: '⌅',
  bbrk: '⎵',
  bbrktbrk: '⎶',
  bcong: '≌',
  bcy: 'б',
  bdquo: '„',
  becaus: '∵',
  because: '∵',
  bemptyv: '⦰',
  bepsi: '϶',
  bernou: 'ℬ',
  beta: 'β',
  beth: 'ℶ',
  between: '≬',
  bfr: '𝔟',
  bigcap: '⋂',
  bigcirc: '◯',
  bigcup: '⋃',
  bigodot: '⨀',
  bigoplus: '⨁',
  bigotimes: '⨂',
  bigsqcup: '⨆',
  bigstar: '★',
  bigtriangledown: '▽',
  bigtriangleup: '△',
  biguplus: '⨄',
  bigvee: '⋁',
  bigwedge: '⋀',
  bkarow: '⤍',
  blacklozenge: '⧫',
  blacksquare: '▪',
  blacktriangle: '▴',
  blacktriangledown: '▾',
  blacktriangleleft: '◂',
  blacktriangleright: '▸',
  blank: '␣',
  blk12: '▒',
  blk14: '░',
  blk34: '▓',
  block: '█',
  bne: '=⃥',
  bnequiv: '≡⃥',
  bnot: '⌐',
  bopf: '𝕓',
  bot: '⊥',
  bottom: '⊥',
  bowtie: '⋈',
  boxDL: '╗',
  boxDR: '╔',
  boxDl: '╖',
  boxDr: '╓',
  boxH: '═',
  boxHD: '╦',
  boxHU: '╩',
  boxHd: '╤',
  boxHu: '╧',
  boxUL: '╝',
  boxUR: '╚',
  boxUl: '╜',
  boxUr: '╙',
  boxV: '║',
  boxVH: '╬',
  boxVL: '╣',
  boxVR: '╠',
  boxVh: '╫',
  boxVl: '╢',
  boxVr: '╟',
  boxbox: '⧉',
  boxdL: '╕',
  boxdR: '╒',
  boxdl: '┐',
  boxdr: '┌',
  boxh: '─',
  boxhD: '╥',
  boxhU: '╨',
  boxhd: '┬',
  boxhu: '┴',
  boxminus: '⊟',
  boxplus: '⊞',
  boxtimes: '⊠',
  boxuL: '╛',
  boxuR: '╘',
  boxul: '┘',
  boxur: '└',
  boxv: '│',
  boxvH: '╪',
  boxvL: '╡',
  boxvR: '╞',
  boxvh: '┼',
  boxvl: '┤',
  boxvr: '├',
  bprime: '‵',
  breve: '˘',
  brvbar: '¦',
  bscr: '𝒷',
  bsemi: '⁏',
  bsim: '∽',
  bsime: '⋍',
  bsol: '\\',
  bsolb: '⧅',
  bsolhsub: '⟈',
  bull: '•',
  bullet: '•',
  bump: '≎',
  bumpE: '⪮',
  bumpe: '≏',
  bumpeq: '≏',
  cacute: 'ć',
  cap: '∩',
  capand: '⩄',
  capbrcup: '⩉',
  capcap: '⩋',
  capcup: '⩇',
  capdot: '⩀',
  caps: '∩︀',
  caret: '⁁',
  caron: 'ˇ',
  ccaps: '⩍',
  ccaron: 'č',
  ccedil: 'ç',
  ccirc: 'ĉ',
  ccups: '⩌',
  ccupssm: '⩐',
  cdot: 'ċ',
  cedil: '¸',
  cemptyv: '⦲',
  cent: '¢',
  centerdot: '·',
  cfr: '𝔠',
  chcy: 'ч',
  check: '✓',
  checkmark: '✓',
  chi: 'χ',
  cir: '○',
  cirE: '⧃',
  circ: 'ˆ',
  circeq: '≗',
  circlearrowleft: '↺',
  circlearrowright: '↻',
  circledR: '®',
  circledS: 'Ⓢ',
  circledast: '⊛',
  circledcirc: '⊚',
  circleddash: '⊝',
  cire: '≗',
  cirfnint: '⨐',
  cirmid: '⫯',
  cirscir: '⧂',
  clubs: '♣',
  clubsuit: '♣',
  colon: ':',
  colone: '≔',
  coloneq: '≔',
  comma: ',',
  commat: '@',
  comp: '∁',
  compfn: '∘',
  complement: '∁',
  complexes: 'ℂ',
  cong: '≅',
  congdot: '⩭',
  conint: '∮',
  copf: '𝕔',
  coprod: '∐',
  copy: '©',
  copysr: '℗',
  crarr: '↵',
  cross: '✗',
  cscr: '𝒸',
  csub: '⫏',
  csube: '⫑',
  csup: '⫐',
  csupe: '⫒',
  ctdot: '⋯',
  cudarrl: '⤸',
  cudarrr: '⤵',
  cuepr: '⋞',
  cuesc: '⋟',
  cularr: '↶',
  cularrp: '⤽',
  cup: '∪',
  cupbrcap: '⩈',
  cupcap: '⩆',
  cupcup: '⩊',
  cupdot: '⊍',
  cupor: '⩅',
  cups: '∪︀',
  curarr: '↷',
  curarrm: '⤼',
  curlyeqprec: '⋞',
  curlyeqsucc: '⋟',
  curlyvee: '⋎',
  curlywedge: '⋏',
  curren: '¤',
  curvearrowleft: '↶',
  curvearrowright: '↷',
  cuvee: '⋎',
  cuwed: '⋏',
  cwconint: '∲',
  cwint: '∱',
  cylcty: '⌭',
  dArr: '⇓',
  dHar: '⥥',
  dagger: '†',
  daleth: 'ℸ',
  darr: '↓',
  dash: '‐',
  dashv: '⊣',
  dbkarow: '⤏',
  dblac: '˝',
  dcaron: 'ď',
  dcy: 'д',
  dd: 'ⅆ',
  ddagger: '‡',
  ddarr: '⇊',
  ddotseq: '⩷',
  deg: '°',
  delta: 'δ',
  demptyv: '⦱',
  dfisht: '⥿',
  dfr: '𝔡',
  dharl: '⇃',
  dharr: '⇂',
  diam: '⋄',
  diamond: '⋄',
  diamondsuit: '♦',
  diams: '♦',
  die: '¨',
  digamma: 'ϝ',
  disin: '⋲',
  div: '÷',
  divide: '÷',
  divideontimes: '⋇',
  divonx: '⋇',
  djcy: 'ђ',
  dlcorn: '⌞',
  dlcrop: '⌍',
  dollar: '$',
  dopf: '𝕕',
  dot: '˙',
  doteq: '≐',
  doteqdot: '≑',
  dotminus: '∸',
  dotplus: '∔',
  dotsquare: '⊡',
  doublebarwedge: '⌆',
  downarrow: '↓',
  downdownarrows: '⇊',
  downharpoonleft: '⇃',
  downharpoonright: '⇂',
  drbkarow: '⤐',
  drcorn: '⌟',
  drcrop: '⌌',
  dscr: '𝒹',
  dscy: 'ѕ',
  dsol: '⧶',
  dstrok: 'đ',
  dtdot: '⋱',
  dtri: '▿',
  dtrif: '▾',
  duarr: '⇵',
  duhar: '⥯',
  dwangle: '⦦',
  dzcy: 'џ',
  dzigrarr: '⟿',
  eDDot: '⩷',
  eDot: '≑',
  eacute: 'é',
  easter: '⩮',
  ecaron: 'ě',
  ecir: '≖',
  ecirc: 'ê',
  ecolon: '≕',
  ecy: 'э',
  edot: 'ė',
  ee: 'ⅇ',
  efDot: '≒',
  efr: '𝔢',
  eg: '⪚',
  egrave: 'è',
  egs: '⪖',
  egsdot: '⪘',
  el: '⪙',
  elinters: '⏧',
  ell: 'ℓ',
  els: '⪕',
  elsdot: '⪗',
  emacr: 'ē',
  empty: '∅',
  emptyset: '∅',
  emptyv: '∅',
  emsp13: ' ',
  emsp14: ' ',
  emsp: ' ',
  eng: 'ŋ',
  ensp: ' ',
  eogon: 'ę',
  eopf: '𝕖',
  epar: '⋕',
  eparsl: '⧣',
  eplus: '⩱',
  epsi: 'ε',
  epsilon: 'ε',
  epsiv: 'ϵ',
  eqcirc: '≖',
  eqcolon: '≕',
  eqsim: '≂',
  eqslantgtr: '⪖',
  eqslantless: '⪕',
  equals: '=',
  equest: '≟',
  equiv: '≡',
  equivDD: '⩸',
  eqvparsl: '⧥',
  erDot: '≓',
  erarr: '⥱',
  escr: 'ℯ',
  esdot: '≐',
  esim: '≂',
  eta: 'η',
  eth: 'ð',
  euml: 'ë',
  euro: '€',
  excl: '!',
  exist: '∃',
  expectation: 'ℰ',
  exponentiale: 'ⅇ',
  fallingdotseq: '≒',
  fcy: 'ф',
  female: '♀',
  ffilig: 'ﬃ',
  fflig: 'ﬀ',
  ffllig: 'ﬄ',
  ffr: '𝔣',
  filig: 'ﬁ',
  fjlig: 'fj',
  flat: '♭',
  fllig: 'ﬂ',
  fltns: '▱',
  fnof: 'ƒ',
  fopf: '𝕗',
  forall: '∀',
  fork: '⋔',
  forkv: '⫙',
  fpartint: '⨍',
  frac12: '½',
  frac13: '⅓',
  frac14: '¼',
  frac15: '⅕',
  frac16: '⅙',
  frac18: '⅛',
  frac23: '⅔',
  frac25: '⅖',
  frac34: '¾',
  frac35: '⅗',
  frac38: '⅜',
  frac45: '⅘',
  frac56: '⅚',
  frac58: '⅝',
  frac78: '⅞',
  frasl: '⁄',
  frown: '⌢',
  fscr: '𝒻',
  gE: '≧',
  gEl: '⪌',
  gacute: 'ǵ',
  gamma: 'γ',
  gammad: 'ϝ',
  gap: '⪆',
  gbreve: 'ğ',
  gcirc: 'ĝ',
  gcy: 'г',
  gdot: 'ġ',
  ge: '≥',
  gel: '⋛',
  geq: '≥',
  geqq: '≧',
  geqslant: '⩾',
  ges: '⩾',
  gescc: '⪩',
  gesdot: '⪀',
  gesdoto: '⪂',
  gesdotol: '⪄',
  gesl: '⋛︀',
  gesles: '⪔',
  gfr: '𝔤',
  gg: '≫',
  ggg: '⋙',
  gimel: 'ℷ',
  gjcy: 'ѓ',
  gl: '≷',
  glE: '⪒',
  gla: '⪥',
  glj: '⪤',
  gnE: '≩',
  gnap: '⪊',
  gnapprox: '⪊',
  gne: '⪈',
  gneq: '⪈',
  gneqq: '≩',
  gnsim: '⋧',
  gopf: '𝕘',
  grave: '`',
  gscr: 'ℊ',
  gsim: '≳',
  gsime: '⪎',
  gsiml: '⪐',
  gt: '>',
  gtcc: '⪧',
  gtcir: '⩺',
  gtdot: '⋗',
  gtlPar: '⦕',
  gtquest: '⩼',
  gtrapprox: '⪆',
  gtrarr: '⥸',
  gtrdot: '⋗',
  gtreqless: '⋛',
  gtreqqless: '⪌',
  gtrless: '≷',
  gtrsim: '≳',
  gvertneqq: '≩︀',
  gvnE: '≩︀',
  hArr: '⇔',
  hairsp: ' ',
  half: '½',
  hamilt: 'ℋ',
  hardcy: 'ъ',
  harr: '↔',
  harrcir: '⥈',
  harrw: '↭',
  hbar: 'ℏ',
  hcirc: 'ĥ',
  hearts: '♥',
  heartsuit: '♥',
  hellip: '…',
  hercon: '⊹',
  hfr: '𝔥',
  hksearow: '⤥',
  hkswarow: '⤦',
  hoarr: '⇿',
  homtht: '∻',
  hookleftarrow: '↩',
  hookrightarrow: '↪',
  hopf: '𝕙',
  horbar: '―',
  hscr: '𝒽',
  hslash: 'ℏ',
  hstrok: 'ħ',
  hybull: '⁃',
  hyphen: '‐',
  iacute: 'í',
  ic: '⁣',
  icirc: 'î',
  icy: 'и',
  iecy: 'е',
  iexcl: '¡',
  iff: '⇔',
  ifr: '𝔦',
  igrave: 'ì',
  ii: 'ⅈ',
  iiiint: '⨌',
  iiint: '∭',
  iinfin: '⧜',
  iiota: '℩',
  ijlig: 'ĳ',
  imacr: 'ī',
  image: 'ℑ',
  imagline: 'ℐ',
  imagpart: 'ℑ',
  imath: 'ı',
  imof: '⊷',
  imped: 'Ƶ',
  in: '∈',
  incare: '℅',
  infin: '∞',
  infintie: '⧝',
  inodot: 'ı',
  int: '∫',
  intcal: '⊺',
  integers: 'ℤ',
  intercal: '⊺',
  intlarhk: '⨗',
  intprod: '⨼',
  iocy: 'ё',
  iogon: 'į',
  iopf: '𝕚',
  iota: 'ι',
  iprod: '⨼',
  iquest: '¿',
  iscr: '𝒾',
  isin: '∈',
  isinE: '⋹',
  isindot: '⋵',
  isins: '⋴',
  isinsv: '⋳',
  isinv: '∈',
  it: '⁢',
  itilde: 'ĩ',
  iukcy: 'і',
  iuml: 'ï',
  jcirc: 'ĵ',
  jcy: 'й',
  jfr: '𝔧',
  jmath: 'ȷ',
  jopf: '𝕛',
  jscr: '𝒿',
  jsercy: 'ј',
  jukcy: 'є',
  kappa: 'κ',
  kappav: 'ϰ',
  kcedil: 'ķ',
  kcy: 'к',
  kfr: '𝔨',
  kgreen: 'ĸ',
  khcy: 'х',
  kjcy: 'ќ',
  kopf: '𝕜',
  kscr: '𝓀',
  lAarr: '⇚',
  lArr: '⇐',
  lAtail: '⤛',
  lBarr: '⤎',
  lE: '≦',
  lEg: '⪋',
  lHar: '⥢',
  lacute: 'ĺ',
  laemptyv: '⦴',
  lagran: 'ℒ',
  lambda: 'λ',
  lang: '⟨',
  langd: '⦑',
  langle: '⟨',
  lap: '⪅',
  laquo: '«',
  larr: '←',
  larrb: '⇤',
  larrbfs: '⤟',
  larrfs: '⤝',
  larrhk: '↩',
  larrlp: '↫',
  larrpl: '⤹',
  larrsim: '⥳',
  larrtl: '↢',
  lat: '⪫',
  latail: '⤙',
  late: '⪭',
  lates: '⪭︀',
  lbarr: '⤌',
  lbbrk: '❲',
  lbrace: '{',
  lbrack: '[',
  lbrke: '⦋',
  lbrksld: '⦏',
  lbrkslu: '⦍',
  lcaron: 'ľ',
  lcedil: 'ļ',
  lceil: '⌈',
  lcub: '{',
  lcy: 'л',
  ldca: '⤶',
  ldquo: '“',
  ldquor: '„',
  ldrdhar: '⥧',
  ldrushar: '⥋',
  ldsh: '↲',
  le: '≤',
  leftarrow: '←',
  leftarrowtail: '↢',
  leftharpoondown: '↽',
  leftharpoonup: '↼',
  leftleftarrows: '⇇',
  leftrightarrow: '↔',
  leftrightarrows: '⇆',
  leftrightharpoons: '⇋',
  leftrightsquigarrow: '↭',
  leftthreetimes: '⋋',
  leg: '⋚',
  leq: '≤',
  leqq: '≦',
  leqslant: '⩽',
  les: '⩽',
  lescc: '⪨',
  lesdot: '⩿',
  lesdoto: '⪁',
  lesdotor: '⪃',
  lesg: '⋚︀',
  lesges: '⪓',
  lessapprox: '⪅',
  lessdot: '⋖',
  lesseqgtr: '⋚',
  lesseqqgtr: '⪋',
  lessgtr: '≶',
  lesssim: '≲',
  lfisht: '⥼',
  lfloor: '⌊',
  lfr: '𝔩',
  lg: '≶',
  lgE: '⪑',
  lhard: '↽',
  lharu: '↼',
  lharul: '⥪',
  lhblk: '▄',
  ljcy: 'љ',
  ll: '≪',
  llarr: '⇇',
  llcorner: '⌞',
  llhard: '⥫',
  lltri: '◺',
  lmidot: 'ŀ',
  lmoust: '⎰',
  lmoustache: '⎰',
  lnE: '≨',
  lnap: '⪉',
  lnapprox: '⪉',
  lne: '⪇',
  lneq: '⪇',
  lneqq: '≨',
  lnsim: '⋦',
  loang: '⟬',
  loarr: '⇽',
  lobrk: '⟦',
  longleftarrow: '⟵',
  longleftrightarrow: '⟷',
  longmapsto: '⟼',
  longrightarrow: '⟶',
  looparrowleft: '↫',
  looparrowright: '↬',
  lopar: '⦅',
  lopf: '𝕝',
  loplus: '⨭',
  lotimes: '⨴',
  lowast: '∗',
  lowbar: '_',
  loz: '◊',
  lozenge: '◊',
  lozf: '⧫',
  lpar: '(',
  lparlt: '⦓',
  lrarr: '⇆',
  lrcorner: '⌟',
  lrhar: '⇋',
  lrhard: '⥭',
  lrm: '‎',
  lrtri: '⊿',
  lsaquo: '‹',
  lscr: '𝓁',
  lsh: '↰',
  lsim: '≲',
  lsime: '⪍',
  lsimg: '⪏',
  lsqb: '[',
  lsquo: '‘',
  lsquor: '‚',
  lstrok: 'ł',
  lt: '<',
  ltcc: '⪦',
  ltcir: '⩹',
  ltdot: '⋖',
  lthree: '⋋',
  ltimes: '⋉',
  ltlarr: '⥶',
  ltquest: '⩻',
  ltrPar: '⦖',
  ltri: '◃',
  ltrie: '⊴',
  ltrif: '◂',
  lurdshar: '⥊',
  luruhar: '⥦',
  lvertneqq: '≨︀',
  lvnE: '≨︀',
  mDDot: '∺',
  macr: '¯',
  male: '♂',
  malt: '✠',
  maltese: '✠',
  map: '↦',
  mapsto: '↦',
  mapstodown: '↧',
  mapstoleft: '↤',
  mapstoup: '↥',
  marker: '▮',
  mcomma: '⨩',
  mcy: 'м',
  mdash: '—',
  measuredangle: '∡',
  mfr: '𝔪',
  mho: '℧',
  micro: 'µ',
  mid: '∣',
  midast: '*',
  midcir: '⫰',
  middot: '·',
  minus: '−',
  minusb: '⊟',
  minusd: '∸',
  minusdu: '⨪',
  mlcp: '⫛',
  mldr: '…',
  mnplus: '∓',
  models: '⊧',
  mopf: '𝕞',
  mp: '∓',
  mscr: '𝓂',
  mstpos: '∾',
  mu: 'μ',
  multimap: '⊸',
  mumap: '⊸',
  nGg: '⋙̸',
  nGt: '≫⃒',
  nGtv: '≫̸',
  nLeftarrow: '⇍',
  nLeftrightarrow: '⇎',
  nLl: '⋘̸',
  nLt: '≪⃒',
  nLtv: '≪̸',
  nRightarrow: '⇏',
  nVDash: '⊯',
  nVdash: '⊮',
  nabla: '∇',
  nacute: 'ń',
  nang: '∠⃒',
  nap: '≉',
  napE: '⩰̸',
  napid: '≋̸',
  napos: 'ŉ',
  napprox: '≉',
  natur: '♮',
  natural: '♮',
  naturals: 'ℕ',
  nbsp: ' ',
  nbump: '≎̸',
  nbumpe: '≏̸',
  ncap: '⩃',
  ncaron: 'ň',
  ncedil: 'ņ',
  ncong: '≇',
  ncongdot: '⩭̸',
  ncup: '⩂',
  ncy: 'н',
  ndash: '–',
  ne: '≠',
  neArr: '⇗',
  nearhk: '⤤',
  nearr: '↗',
  nearrow: '↗',
  nedot: '≐̸',
  nequiv: '≢',
  nesear: '⤨',
  nesim: '≂̸',
  nexist: '∄',
  nexists: '∄',
  nfr: '𝔫',
  ngE: '≧̸',
  nge: '≱',
  ngeq: '≱',
  ngeqq: '≧̸',
  ngeqslant: '⩾̸',
  nges: '⩾̸',
  ngsim: '≵',
  ngt: '≯',
  ngtr: '≯',
  nhArr: '⇎',
  nharr: '↮',
  nhpar: '⫲',
  ni: '∋',
  nis: '⋼',
  nisd: '⋺',
  niv: '∋',
  njcy: 'њ',
  nlArr: '⇍',
  nlE: '≦̸',
  nlarr: '↚',
  nldr: '‥',
  nle: '≰',
  nleftarrow: '↚',
  nleftrightarrow: '↮',
  nleq: '≰',
  nleqq: '≦̸',
  nleqslant: '⩽̸',
  nles: '⩽̸',
  nless: '≮',
  nlsim: '≴',
  nlt: '≮',
  nltri: '⋪',
  nltrie: '⋬',
  nmid: '∤',
  nopf: '𝕟',
  not: '¬',
  notin: '∉',
  notinE: '⋹̸',
  notindot: '⋵̸',
  notinva: '∉',
  notinvb: '⋷',
  notinvc: '⋶',
  notni: '∌',
  notniva: '∌',
  notnivb: '⋾',
  notnivc: '⋽',
  npar: '∦',
  nparallel: '∦',
  nparsl: '⫽⃥',
  npart: '∂̸',
  npolint: '⨔',
  npr: '⊀',
  nprcue: '⋠',
  npre: '⪯̸',
  nprec: '⊀',
  npreceq: '⪯̸',
  nrArr: '⇏',
  nrarr: '↛',
  nrarrc: '⤳̸',
  nrarrw: '↝̸',
  nrightarrow: '↛',
  nrtri: '⋫',
  nrtrie: '⋭',
  nsc: '⊁',
  nsccue: '⋡',
  nsce: '⪰̸',
  nscr: '𝓃',
  nshortmid: '∤',
  nshortparallel: '∦',
  nsim: '≁',
  nsime: '≄',
  nsimeq: '≄',
  nsmid: '∤',
  nspar: '∦',
  nsqsube: '⋢',
  nsqsupe: '⋣',
  nsub: '⊄',
  nsubE: '⫅̸',
  nsube: '⊈',
  nsubset: '⊂⃒',
  nsubseteq: '⊈',
  nsubseteqq: '⫅̸',
  nsucc: '⊁',
  nsucceq: '⪰̸',
  nsup: '⊅',
  nsupE: '⫆̸',
  nsupe: '⊉',
  nsupset: '⊃⃒',
  nsupseteq: '⊉',
  nsupseteqq: '⫆̸',
  ntgl: '≹',
  ntilde: 'ñ',
  ntlg: '≸',
  ntriangleleft: '⋪',
  ntrianglelefteq: '⋬',
  ntriangleright: '⋫',
  ntrianglerighteq: '⋭',
  nu: 'ν',
  num: '#',
  numero: '№',
  numsp: ' ',
  nvDash: '⊭',
  nvHarr: '⤄',
  nvap: '≍⃒',
  nvdash: '⊬',
  nvge: '≥⃒',
  nvgt: '>⃒',
  nvinfin: '⧞',
  nvlArr: '⤂',
  nvle: '≤⃒',
  nvlt: '<⃒',
  nvltrie: '⊴⃒',
  nvrArr: '⤃',
  nvrtrie: '⊵⃒',
  nvsim: '∼⃒',
  nwArr: '⇖',
  nwarhk: '⤣',
  nwarr: '↖',
  nwarrow: '↖',
  nwnear: '⤧',
  oS: 'Ⓢ',
  oacute: 'ó',
  oast: '⊛',
  ocir: '⊚',
  ocirc: 'ô',
  ocy: 'о',
  odash: '⊝',
  odblac: 'ő',
  odiv: '⨸',
  odot: '⊙',
  odsold: '⦼',
  oelig: 'œ',
  ofcir: '⦿',
  ofr: '𝔬',
  ogon: '˛',
  ograve: 'ò',
  ogt: '⧁',
  ohbar: '⦵',
  ohm: 'Ω',
  oint: '∮',
  olarr: '↺',
  olcir: '⦾',
  olcross: '⦻',
  oline: '‾',
  olt: '⧀',
  omacr: 'ō',
  omega: 'ω',
  omicron: 'ο',
  omid: '⦶',
  ominus: '⊖',
  oopf: '𝕠',
  opar: '⦷',
  operp: '⦹',
  oplus: '⊕',
  or: '∨',
  orarr: '↻',
  ord: '⩝',
  order: 'ℴ',
  orderof: 'ℴ',
  ordf: 'ª',
  ordm: 'º',
  origof: '⊶',
  oror: '⩖',
  orslope: '⩗',
  orv: '⩛',
  oscr: 'ℴ',
  oslash: 'ø',
  osol: '⊘',
  otilde: 'õ',
  otimes: '⊗',
  otimesas: '⨶',
  ouml: 'ö',
  ovbar: '⌽',
  par: '∥',
  para: '¶',
  parallel: '∥',
  parsim: '⫳',
  parsl: '⫽',
  part: '∂',
  pcy: 'п',
  percnt: '%',
  period: '.',
  permil: '‰',
  perp: '⊥',
  pertenk: '‱',
  pfr: '𝔭',
  phi: 'φ',
  phiv: 'ϕ',
  phmmat: 'ℳ',
  phone: '☎',
  pi: 'π',
  pitchfork: '⋔',
  piv: 'ϖ',
  planck: 'ℏ',
  planckh: 'ℎ',
  plankv: 'ℏ',
  plus: '+',
  plusacir: '⨣',
  plusb: '⊞',
  pluscir: '⨢',
  plusdo: '∔',
  plusdu: '⨥',
  pluse: '⩲',
  plusmn: '±',
  plussim: '⨦',
  plustwo: '⨧',
  pm: '±',
  pointint: '⨕',
  popf: '𝕡',
  pound: '£',
  pr: '≺',
  prE: '⪳',
  prap: '⪷',
  prcue: '≼',
  pre: '⪯',
  prec: '≺',
  precapprox: '⪷',
  preccurlyeq: '≼',
  preceq: '⪯',
  precnapprox: '⪹',
  precneqq: '⪵',
  precnsim: '⋨',
  precsim: '≾',
  prime: '′',
  primes: 'ℙ',
  prnE: '⪵',
  prnap: '⪹',
  prnsim: '⋨',
  prod: '∏',
  profalar: '⌮',
  profline: '⌒',
  profsurf: '⌓',
  prop: '∝',
  propto: '∝',
  prsim: '≾',
  prurel: '⊰',
  pscr: '𝓅',
  psi: 'ψ',
  puncsp: ' ',
  qfr: '𝔮',
  qint: '⨌',
  qopf: '𝕢',
  qprime: '⁗',
  qscr: '𝓆',
  quaternions: 'ℍ',
  quatint: '⨖',
  quest: '?',
  questeq: '≟',
  quot: '"',
  rAarr: '⇛',
  rArr: '⇒',
  rAtail: '⤜',
  rBarr: '⤏',
  rHar: '⥤',
  race: '∽̱',
  racute: 'ŕ',
  radic: '√',
  raemptyv: '⦳',
  rang: '⟩',
  rangd: '⦒',
  range: '⦥',
  rangle: '⟩',
  raquo: '»',
  rarr: '→',
  rarrap: '⥵',
  rarrb: '⇥',
  rarrbfs: '⤠',
  rarrc: '⤳',
  rarrfs: '⤞',
  rarrhk: '↪',
  rarrlp: '↬',
  rarrpl: '⥅',
  rarrsim: '⥴',
  rarrtl: '↣',
  rarrw: '↝',
  ratail: '⤚',
  ratio: '∶',
  rationals: 'ℚ',
  rbarr: '⤍',
  rbbrk: '❳',
  rbrace: '}',
  rbrack: ']',
  rbrke: '⦌',
  rbrksld: '⦎',
  rbrkslu: '⦐',
  rcaron: 'ř',
  rcedil: 'ŗ',
  rceil: '⌉',
  rcub: '}',
  rcy: 'р',
  rdca: '⤷',
  rdldhar: '⥩',
  rdquo: '”',
  rdquor: '”',
  rdsh: '↳',
  real: 'ℜ',
  realine: 'ℛ',
  realpart: 'ℜ',
  reals: 'ℝ',
  rect: '▭',
  reg: '®',
  rfisht: '⥽',
  rfloor: '⌋',
  rfr: '𝔯',
  rhard: '⇁',
  rharu: '⇀',
  rharul: '⥬',
  rho: 'ρ',
  rhov: 'ϱ',
  rightarrow: '→',
  rightarrowtail: '↣',
  rightharpoondown: '⇁',
  rightharpoonup: '⇀',
  rightleftarrows: '⇄',
  rightleftharpoons: '⇌',
  rightrightarrows: '⇉',
  rightsquigarrow: '↝',
  rightthreetimes: '⋌',
  ring: '˚',
  risingdotseq: '≓',
  rlarr: '⇄',
  rlhar: '⇌',
  rlm: '‏',
  rmoust: '⎱',
  rmoustache: '⎱',
  rnmid: '⫮',
  roang: '⟭',
  roarr: '⇾',
  robrk: '⟧',
  ropar: '⦆',
  ropf: '𝕣',
  roplus: '⨮',
  rotimes: '⨵',
  rpar: ')',
  rpargt: '⦔',
  rppolint: '⨒',
  rrarr: '⇉',
  rsaquo: '›',
  rscr: '𝓇',
  rsh: '↱',
  rsqb: ']',
  rsquo: '’',
  rsquor: '’',
  rthree: '⋌',
  rtimes: '⋊',
  rtri: '▹',
  rtrie: '⊵',
  rtrif: '▸',
  rtriltri: '⧎',
  ruluhar: '⥨',
  rx: '℞',
  sacute: 'ś',
  sbquo: '‚',
  sc: '≻',
  scE: '⪴',
  scap: '⪸',
  scaron: 'š',
  sccue: '≽',
  sce: '⪰',
  scedil: 'ş',
  scirc: 'ŝ',
  scnE: '⪶',
  scnap: '⪺',
  scnsim: '⋩',
  scpolint: '⨓',
  scsim: '≿',
  scy: 'с',
  sdot: '⋅',
  sdotb: '⊡',
  sdote: '⩦',
  seArr: '⇘',
  searhk: '⤥',
  searr: '↘',
  searrow: '↘',
  sect: '§',
  semi: ';',
  seswar: '⤩',
  setminus: '∖',
  setmn: '∖',
  sext: '✶',
  sfr: '𝔰',
  sfrown: '⌢',
  sharp: '♯',
  shchcy: 'щ',
  shcy: 'ш',
  shortmid: '∣',
  shortparallel: '∥',
  shy: '­',
  sigma: 'σ',
  sigmaf: 'ς',
  sigmav: 'ς',
  sim: '∼',
  simdot: '⩪',
  sime: '≃',
  simeq: '≃',
  simg: '⪞',
  simgE: '⪠',
  siml: '⪝',
  simlE: '⪟',
  simne: '≆',
  simplus: '⨤',
  simrarr: '⥲',
  slarr: '←',
  smallsetminus: '∖',
  smashp: '⨳',
  smeparsl: '⧤',
  smid: '∣',
  smile: '⌣',
  smt: '⪪',
  smte: '⪬',
  smtes: '⪬︀',
  softcy: 'ь',
  sol: '/',
  solb: '⧄',
  solbar: '⌿',
  sopf: '𝕤',
  spades: '♠',
  spadesuit: '♠',
  spar: '∥',
  sqcap: '⊓',
  sqcaps: '⊓︀',
  sqcup: '⊔',
  sqcups: '⊔︀',
  sqsub: '⊏',
  sqsube: '⊑',
  sqsubset: '⊏',
  sqsubseteq: '⊑',
  sqsup: '⊐',
  sqsupe: '⊒',
  sqsupset: '⊐',
  sqsupseteq: '⊒',
  squ: '□',
  square: '□',
  squarf: '▪',
  squf: '▪',
  srarr: '→',
  sscr: '𝓈',
  ssetmn: '∖',
  ssmile: '⌣',
  sstarf: '⋆',
  star: '☆',
  starf: '★',
  straightepsilon: 'ϵ',
  straightphi: 'ϕ',
  strns: '¯',
  sub: '⊂',
  subE: '⫅',
  subdot: '⪽',
  sube: '⊆',
  subedot: '⫃',
  submult: '⫁',
  subnE: '⫋',
  subne: '⊊',
  subplus: '⪿',
  subrarr: '⥹',
  subset: '⊂',
  subseteq: '⊆',
  subseteqq: '⫅',
  subsetneq: '⊊',
  subsetneqq: '⫋',
  subsim: '⫇',
  subsub: '⫕',
  subsup: '⫓',
  succ: '≻',
  succapprox: '⪸',
  succcurlyeq: '≽',
  succeq: '⪰',
  succnapprox: '⪺',
  succneqq: '⪶',
  succnsim: '⋩',
  succsim: '≿',
  sum: '∑',
  sung: '♪',
  sup1: '¹',
  sup2: '²',
  sup3: '³',
  sup: '⊃',
  supE: '⫆',
  supdot: '⪾',
  supdsub: '⫘',
  supe: '⊇',
  supedot: '⫄',
  suphsol: '⟉',
  suphsub: '⫗',
  suplarr: '⥻',
  supmult: '⫂',
  supnE: '⫌',
  supne: '⊋',
  supplus: '⫀',
  supset: '⊃',
  supseteq: '⊇',
  supseteqq: '⫆',
  supsetneq: '⊋',
  supsetneqq: '⫌',
  supsim: '⫈',
  supsub: '⫔',
  supsup: '⫖',
  swArr: '⇙',
  swarhk: '⤦',
  swarr: '↙',
  swarrow: '↙',
  swnwar: '⤪',
  szlig: 'ß',
  target: '⌖',
  tau: 'τ',
  tbrk: '⎴',
  tcaron: 'ť',
  tcedil: 'ţ',
  tcy: 'т',
  tdot: '⃛',
  telrec: '⌕',
  tfr: '𝔱',
  there4: '∴',
  therefore: '∴',
  theta: 'θ',
  thetasym: 'ϑ',
  thetav: 'ϑ',
  thickapprox: '≈',
  thicksim: '∼',
  thinsp: ' ',
  thkap: '≈',
  thksim: '∼',
  thorn: 'þ',
  tilde: '˜',
  times: '×',
  timesb: '⊠',
  timesbar: '⨱',
  timesd: '⨰',
  tint: '∭',
  toea: '⤨',
  top: '⊤',
  topbot: '⌶',
  topcir: '⫱',
  topf: '𝕥',
  topfork: '⫚',
  tosa: '⤩',
  tprime: '‴',
  trade: '™',
  triangle: '▵',
  triangledown: '▿',
  triangleleft: '◃',
  trianglelefteq: '⊴',
  triangleq: '≜',
  triangleright: '▹',
  trianglerighteq: '⊵',
  tridot: '◬',
  trie: '≜',
  triminus: '⨺',
  triplus: '⨹',
  trisb: '⧍',
  tritime: '⨻',
  trpezium: '⏢',
  tscr: '𝓉',
  tscy: 'ц',
  tshcy: 'ћ',
  tstrok: 'ŧ',
  twixt: '≬',
  twoheadleftarrow: '↞',
  twoheadrightarrow: '↠',
  uArr: '⇑',
  uHar: '⥣',
  uacute: 'ú',
  uarr: '↑',
  ubrcy: 'ў',
  ubreve: 'ŭ',
  ucirc: 'û',
  ucy: 'у',
  udarr: '⇅',
  udblac: 'ű',
  udhar: '⥮',
  ufisht: '⥾',
  ufr: '𝔲',
  ugrave: 'ù',
  uharl: '↿',
  uharr: '↾',
  uhblk: '▀',
  ulcorn: '⌜',
  ulcorner: '⌜',
  ulcrop: '⌏',
  ultri: '◸',
  umacr: 'ū',
  uml: '¨',
  uogon: 'ų',
  uopf: '𝕦',
  uparrow: '↑',
  updownarrow: '↕',
  upharpoonleft: '↿',
  upharpoonright: '↾',
  uplus: '⊎',
  upsi: 'υ',
  upsih: 'ϒ',
  upsilon: 'υ',
  upuparrows: '⇈',
  urcorn: '⌝',
  urcorner: '⌝',
  urcrop: '⌎',
  uring: 'ů',
  urtri: '◹',
  uscr: '𝓊',
  utdot: '⋰',
  utilde: 'ũ',
  utri: '▵',
  utrif: '▴',
  uuarr: '⇈',
  uuml: 'ü',
  uwangle: '⦧',
  vArr: '⇕',
  vBar: '⫨',
  vBarv: '⫩',
  vDash: '⊨',
  vangrt: '⦜',
  varepsilon: 'ϵ',
  varkappa: 'ϰ',
  varnothing: '∅',
  varphi: 'ϕ',
  varpi: 'ϖ',
  varpropto: '∝',
  varr: '↕',
  varrho: 'ϱ',
  varsigma: 'ς',
  varsubsetneq: '⊊︀',
  varsubsetneqq: '⫋︀',
  varsupsetneq: '⊋︀',
  varsupsetneqq: '⫌︀',
  vartheta: 'ϑ',
  vartriangleleft: '⊲',
  vartriangleright: '⊳',
  vcy: 'в',
  vdash: '⊢',
  vee: '∨',
  veebar: '⊻',
  veeeq: '≚',
  vellip: '⋮',
  verbar: '|',
  vert: '|',
  vfr: '𝔳',
  vltri: '⊲',
  vnsub: '⊂⃒',
  vnsup: '⊃⃒',
  vopf: '𝕧',
  vprop: '∝',
  vrtri: '⊳',
  vscr: '𝓋',
  vsubnE: '⫋︀',
  vsubne: '⊊︀',
  vsupnE: '⫌︀',
  vsupne: '⊋︀',
  vzigzag: '⦚',
  wcirc: 'ŵ',
  wedbar: '⩟',
  wedge: '∧',
  wedgeq: '≙',
  weierp: '℘',
  wfr: '𝔴',
  wopf: '𝕨',
  wp: '℘',
  wr: '≀',
  wreath: '≀',
  wscr: '𝓌',
  xcap: '⋂',
  xcirc: '◯',
  xcup: '⋃',
  xdtri: '▽',
  xfr: '𝔵',
  xhArr: '⟺',
  xharr: '⟷',
  xi: 'ξ',
  xlArr: '⟸',
  xlarr: '⟵',
  xmap: '⟼',
  xnis: '⋻',
  xodot: '⨀',
  xopf: '𝕩',
  xoplus: '⨁',
  xotime: '⨂',
  xrArr: '⟹',
  xrarr: '⟶',
  xscr: '𝓍',
  xsqcup: '⨆',
  xuplus: '⨄',
  xutri: '△',
  xvee: '⋁',
  xwedge: '⋀',
  yacute: 'ý',
  yacy: 'я',
  ycirc: 'ŷ',
  ycy: 'ы',
  yen: '¥',
  yfr: '𝔶',
  yicy: 'ї',
  yopf: '𝕪',
  yscr: '𝓎',
  yucy: 'ю',
  yuml: 'ÿ',
  zacute: 'ź',
  zcaron: 'ž',
  zcy: 'з',
  zdot: 'ż',
  zeetrf: 'ℨ',
  zeta: 'ζ',
  zfr: '𝔷',
  zhcy: 'ж',
  zigrarr: '⇝',
  zopf: '𝕫',
  zscr: '𝓏',
  zwj: '‍',
  zwnj: '‌'
}


/***/ }),

/***/ "./node_modules/comma-separated-tokens/index.js":
/*!******************************************************!*\
  !*** ./node_modules/comma-separated-tokens/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "stringify": () => (/* binding */ stringify)
/* harmony export */ });
/**
 * @typedef {Object} StringifyOptions
 * @property {boolean} [padLeft=true] Whether to pad a space before a token (`boolean`, default: `true`).
 * @property {boolean} [padRight=false] Whether to pad a space after a token (`boolean`, default: `false`).
 */

/**
 * Parse comma separated tokens to an array.
 *
 * @param {string} value
 * @returns {Array.<string>}
 */
function parse(value) {
  /** @type {Array.<string>} */
  var tokens = []
  var input = String(value || '')
  var index = input.indexOf(',')
  var start = 0
  /** @type {boolean} */
  var end
  /** @type {string} */
  var token

  while (!end) {
    if (index === -1) {
      index = input.length
      end = true
    }

    token = input.slice(start, index).trim()

    if (token || !end) {
      tokens.push(token)
    }

    start = index + 1
    index = input.indexOf(',', start)
  }

  return tokens
}

/**
 * Serialize an array of strings to comma separated tokens.
 *
 * @param {Array.<string|number>} values
 * @param {StringifyOptions} [options]
 * @returns {string}
 */
function stringify(values, options) {
  var settings = options || {}

  // Ensure the last empty entry is seen.
  if (values[values.length - 1] === '') {
    values = values.concat('')
  }

  return values
    .join(
      (settings.padRight ? ' ' : '') +
        ',' +
        (settings.padLeft === false ? '' : ' ')
    )
    .trim()
}


/***/ }),

/***/ "./node_modules/decode-named-character-reference/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/decode-named-character-reference/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeNamedCharacterReference": () => (/* binding */ decodeNamedCharacterReference)
/* harmony export */ });
/* harmony import */ var character_entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! character-entities */ "./node_modules/character-entities/index.js");


const own = {}.hasOwnProperty

/**
 * Decode a single character reference (without the `&` or `;`).
 * You probably only need this when you’re building parsers yourself that follow
 * different rules compared to HTML.
 * This is optimized to be tiny in browsers.
 *
 * @param {string} value
 *   `notin` (named), `#123` (deci), `#x123` (hexa).
 * @returns {string|false}
 *   Decoded reference.
 */
function decodeNamedCharacterReference(value) {
  return own.call(character_entities__WEBPACK_IMPORTED_MODULE_0__.characterEntities, value) ? character_entities__WEBPACK_IMPORTED_MODULE_0__.characterEntities[value] : false
}


/***/ }),

/***/ "./node_modules/dequal/dist/index.mjs":
/*!********************************************!*\
  !*** ./node_modules/dequal/dist/index.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dequal": () => (/* binding */ dequal)
/* harmony export */ });
var has = Object.prototype.hasOwnProperty;

function find(iter, tar, key) {
	for (key of iter.keys()) {
		if (dequal(key, tar)) return key;
	}
}

function dequal(foo, bar) {
	var ctor, len, tmp;
	if (foo === bar) return true;

	if (foo && bar && (ctor=foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();

		if (ctor === Array) {
			if ((len=foo.length) === bar.length) {
				while (len-- && dequal(foo[len], bar[len]));
			}
			return len === -1;
		}

		if (ctor === Set) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len;
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!bar.has(tmp)) return false;
			}
			return true;
		}

		if (ctor === Map) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len[0];
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!dequal(len[1], bar.get(tmp))) {
					return false;
				}
			}
			return true;
		}

		if (ctor === ArrayBuffer) {
			foo = new Uint8Array(foo);
			bar = new Uint8Array(bar);
		} else if (ctor === DataView) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo.getInt8(len) === bar.getInt8(len));
			}
			return len === -1;
		}

		if (ArrayBuffer.isView(foo)) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo[len] === bar[len]);
			}
			return len === -1;
		}

		if (!ctor || typeof foo === 'object') {
			len = 0;
			for (ctor in foo) {
				if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
			}
			return Object.keys(bar).length === len;
		}
	}

	return foo !== foo && bar !== bar;
}


/***/ }),

/***/ "./node_modules/hast-util-whitespace/index.js":
/*!****************************************************!*\
  !*** ./node_modules/hast-util-whitespace/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "whitespace": () => (/* binding */ whitespace)
/* harmony export */ });
/**
 * @param {unknown} thing
 * @returns {boolean}
 */
function whitespace(thing) {
  /** @type {string} */
  var value =
    // @ts-ignore looks like a node.
    thing && typeof thing === 'object' && thing.type === 'text'
      ? // @ts-ignore looks like a text.
        thing.value || ''
      : thing

  // HTML whitespace expression.
  // See <https://html.spec.whatwg.org/#space-character>.
  return typeof value === 'string' && value.replace(/[ \t\n\f\r]/g, '') === ''
}


/***/ }),

/***/ "./node_modules/is-plain-obj/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isPlainObject)
/* harmony export */ });
function isPlainObject(value) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}


/***/ }),

/***/ "./node_modules/mdast-util-definitions/index.js":
/*!******************************************************!*\
  !*** ./node_modules/mdast-util-definitions/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "definitions": () => (/* binding */ definitions)
/* harmony export */ });
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");
/**
 * @typedef {import('mdast').Root|import('mdast').Content} Node
 * @typedef {import('mdast').Definition} Definition
 */



const own = {}.hasOwnProperty

/**
 * Find definitions in `node`.
 * Uses CommonMark precedence, which means that earlier definitions are
 * preferred over duplicate later definitions.
 *
 * @param {Node} node
 */
function definitions(node) {
  /** @type {Record<string, Definition>} */
  const cache = Object.create(null)

  if (!node || !node.type) {
    throw new Error('mdast-util-definitions expected node')
  }

  (0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__.visit)(node, 'definition', (definition) => {
    const id = clean(definition.identifier)
    if (id && !own.call(cache, id)) {
      cache[id] = definition
    }
  })

  return definition

  /**
   * Get a node from the bound definition cache.
   *
   * @param {string} identifier
   * @returns {Definition|null}
   */
  function definition(identifier) {
    const id = clean(identifier)
    return id && own.call(cache, id) ? cache[id] : null
  }
}

/**
 * @param {string} [value]
 * @returns {string}
 */
function clean(value) {
  return String(value || '').toUpperCase()
}


/***/ }),

/***/ "./node_modules/mdast-util-from-markdown/dev/lib/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/mdast-util-from-markdown/dev/lib/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromMarkdown": () => (/* binding */ fromMarkdown)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var mdast_util_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mdast-util-to-string */ "./node_modules/mdast-util-to-string/index.js");
/* harmony import */ var micromark_lib_parse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark/lib/parse.js */ "./node_modules/micromark/dev/lib/parse.js");
/* harmony import */ var micromark_lib_preprocess_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark/lib/preprocess.js */ "./node_modules/micromark/dev/lib/preprocess.js");
/* harmony import */ var micromark_lib_postprocess_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark/lib/postprocess.js */ "./node_modules/micromark/dev/lib/postprocess.js");
/* harmony import */ var micromark_util_decode_numeric_character_reference__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! micromark-util-decode-numeric-character-reference */ "./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js");
/* harmony import */ var micromark_util_decode_string__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! micromark-util-decode-string */ "./node_modules/micromark-util-decode-string/dev/index.js");
/* harmony import */ var micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! micromark-util-normalize-identifier */ "./node_modules/micromark-util-normalize-identifier/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/* harmony import */ var decode_named_character_reference__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! decode-named-character-reference */ "./node_modules/decode-named-character-reference/index.js");
/* harmony import */ var unist_util_stringify_position__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! unist-util-stringify-position */ "./node_modules/unist-util-stringify-position/index.js");
/**
 * @typedef {import('micromark-util-types').Encoding} Encoding
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').ParseOptions} ParseOptions
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Value} Value
 * @typedef {import('unist').Parent} UnistParent
 * @typedef {import('unist').Point} Point
 * @typedef {import('mdast').PhrasingContent} PhrasingContent
 * @typedef {import('mdast').Content} Content
 * @typedef {Root|Content} Node
 * @typedef {Extract<Node, UnistParent>} Parent
 * @typedef {import('mdast').Break} Break
 * @typedef {import('mdast').Blockquote} Blockquote
 * @typedef {import('mdast').Code} Code
 * @typedef {import('mdast').Definition} Definition
 * @typedef {import('mdast').Emphasis} Emphasis
 * @typedef {import('mdast').Heading} Heading
 * @typedef {import('mdast').HTML} HTML
 * @typedef {import('mdast').Image} Image
 * @typedef {import('mdast').ImageReference} ImageReference
 * @typedef {import('mdast').InlineCode} InlineCode
 * @typedef {import('mdast').Link} Link
 * @typedef {import('mdast').LinkReference} LinkReference
 * @typedef {import('mdast').List} List
 * @typedef {import('mdast').ListItem} ListItem
 * @typedef {import('mdast').Paragraph} Paragraph
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Strong} Strong
 * @typedef {import('mdast').Text} Text
 * @typedef {import('mdast').ThematicBreak} ThematicBreak
 *
 * @typedef {UnistParent & {type: 'fragment', children: Array<PhrasingContent>}} Fragment
 */

/**
 * @typedef _CompileDataFields
 * @property {boolean|undefined} expectingFirstListItemValue
 * @property {boolean|undefined} flowCodeInside
 * @property {boolean|undefined} setextHeadingSlurpLineEnding
 * @property {boolean|undefined} atHardBreak
 * @property {'collapsed'|'full'} referenceType
 * @property {boolean|undefined} inReference
 * @property {'characterReferenceMarkerHexadecimal'|'characterReferenceMarkerNumeric'} characterReferenceType
 *
 * @typedef {Record<string, unknown> & Partial<_CompileDataFields>} CompileData
 *
 * @typedef {(tree: Root) => Root|void} Transform
 * @typedef {(this: CompileContext, token: Token) => void} Handle
 * @typedef {Record<string, Handle>} Handles
 *   Token types mapping to handles
 * @typedef {Record<string, Record<string, unknown>|Array<unknown>> & {canContainEols: Array<string>, transforms: Array<Transform>, enter: Handles, exit: Handles}} NormalizedExtension
 * @typedef {Partial<NormalizedExtension>} Extension
 *   An mdast extension changes how markdown tokens are turned into mdast.
 *
 * @typedef {(this: Omit<CompileContext, 'sliceSerialize'>, left: Token|undefined, right: Token) => void} OnEnterError
 * @typedef {(this: Omit<CompileContext, 'sliceSerialize'>, left: Token, right: Token) => void} OnExitError
 *
 * @typedef CompileContext
 *   mdast compiler context
 * @property {Array<Node | Fragment>} stack
 * @property {Array<[Token, OnEnterError|undefined]>} tokenStack
 * @property {(key: string, value?: unknown) => void} setData
 *   Set data into the key-value store.
 * @property {<K extends string>(key: K) => CompileData[K]} getData
 *   Get data from the key-value store.
 * @property {(this: CompileContext) => void} buffer
 *   Capture some of the output data.
 * @property {(this: CompileContext) => string} resume
 *   Stop capturing and access the output data.
 * @property {<N extends Node>(this: CompileContext, node: N, token: Token, onError?: OnEnterError) => N} enter
 *   Enter a token.
 * @property {(this: CompileContext, token: Token, onError?: OnExitError) => Node} exit
 *   Exit a token.
 * @property {TokenizeContext['sliceSerialize']} sliceSerialize
 *   Get the string value of a token.
 * @property {NormalizedExtension} config
 *   Configuration.
 *
 * @typedef {{mdastExtensions?: Array<Extension|Array<Extension>>}} FromMarkdownOptions
 * @typedef {ParseOptions & FromMarkdownOptions} Options
 */















const own = {}.hasOwnProperty

/**
 * @param value Markdown to parse (`string` or `Buffer`).
 * @param [encoding] Character encoding to understand `value` as when it’s a `Buffer` (`string`, default: `'utf8'`).
 * @param [options] Configuration
 */
const fromMarkdown =
  /**
   * @type {(
   *   ((value: Value, encoding: Encoding, options?: Options) => Root) &
   *   ((value: Value, options?: Options) => Root)
   * )}
   */
  (
    /**
     * @param {Value} value
     * @param {Encoding} [encoding]
     * @param {Options} [options]
     * @returns {Root}
     */
    function (value, encoding, options) {
      if (typeof encoding !== 'string') {
        options = encoding
        encoding = undefined
      }

      return compiler(options)(
        (0,micromark_lib_postprocess_js__WEBPACK_IMPORTED_MODULE_1__.postprocess)(
          (0,micromark_lib_parse_js__WEBPACK_IMPORTED_MODULE_2__.parse)(options).document().write((0,micromark_lib_preprocess_js__WEBPACK_IMPORTED_MODULE_3__.preprocess)()(value, encoding, true))
        )
      )
    }
  )

/**
 * Note this compiler only understand complete buffering, not streaming.
 *
 * @param {Options} [options]
 */
function compiler(options = {}) {
  /** @type {NormalizedExtension} */
  // @ts-expect-error: our base has all required fields, so the result will too.
  const config = configure(
    {
      transforms: [],
      canContainEols: [
        'emphasis',
        'fragment',
        'heading',
        'paragraph',
        'strong'
      ],
      enter: {
        autolink: opener(link),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading),
        blockQuote: opener(blockQuote),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis),
        hardBreakEscape: opener(hardBreak),
        hardBreakTrailing: opener(hardBreak),
        htmlFlow: opener(html, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html, buffer),
        htmlTextData: onenterdata,
        image: opener(image),
        label: buffer,
        link: opener(link),
        listItem: opener(listItem),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list, onenterlistordered),
        listUnordered: opener(list),
        paragraph: opener(paragraph),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading),
        strong: opener(strong),
        thematicBreak: opener(thematicBreak)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    },
    options.mdastExtensions || []
  )

  /** @type {CompileData} */
  const data = {}

  return compile

  /**
   * @param {Array<Event>} events
   * @returns {Root}
   */
  function compile(events) {
    /** @type {Root} */
    let tree = {type: 'root', children: []}
    /** @type {CompileContext['stack']} */
    const stack = [tree]
    /** @type {CompileContext['tokenStack']} */
    const tokenStack = []
    /** @type {Array<number>} */
    const listStack = []
    /** @type {Omit<CompileContext, 'sliceSerialize'>} */
    const context = {
      stack,
      tokenStack,
      config,
      enter,
      exit,
      buffer,
      resume,
      setData,
      getData
    }
    let index = -1

    while (++index < events.length) {
      // We preprocess lists to add `listItem` tokens, and to infer whether
      // items the list itself are spread out.
      if (
        events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listOrdered ||
        events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listUnordered
      ) {
        if (events[index][0] === 'enter') {
          listStack.push(index)
        } else {
          const tail = listStack.pop()
          ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(typeof tail === 'number', 'expected list ot be open')
          index = prepareList(events, tail, index)
        }
      }
    }

    index = -1

    while (++index < events.length) {
      const handler = config[events[index][0]]

      if (own.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(
          Object.assign(
            {sliceSerialize: events[index][2].sliceSerialize},
            context
          ),
          events[index][1]
        )
      }
    }

    if (tokenStack.length > 0) {
      const tail = tokenStack[tokenStack.length - 1]
      const handler = tail[1] || defaultOnError
      handler.call(context, undefined, tail[0])
    }

    // Figure out `root` position.
    tree.position = {
      start: point(
        events.length > 0 ? events[0][1].start : {line: 1, column: 1, offset: 0}
      ),
      end: point(
        events.length > 0
          ? events[events.length - 2][1].end
          : {line: 1, column: 1, offset: 0}
      )
    }

    index = -1
    while (++index < config.transforms.length) {
      tree = config.transforms[index](tree) || tree
    }

    return tree
  }

  /**
   * @param {Array<Event>} events
   * @param {number} start
   * @param {number} length
   * @returns {number}
   */
  function prepareList(events, start, length) {
    let index = start - 1
    let containerBalance = -1
    let listSpread = false
    /** @type {Token|undefined} */
    let listItem
    /** @type {number|undefined} */
    let lineIndex
    /** @type {number|undefined} */
    let firstBlankLineIndex
    /** @type {boolean|undefined} */
    let atMarker

    while (++index <= length) {
      const event = events[index]

      if (
        event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listUnordered ||
        event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listOrdered ||
        event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.blockQuote
      ) {
        if (event[0] === 'enter') {
          containerBalance++
        } else {
          containerBalance--
        }

        atMarker = undefined
      } else if (event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEndingBlank) {
        if (event[0] === 'enter') {
          if (
            listItem &&
            !atMarker &&
            !containerBalance &&
            !firstBlankLineIndex
          ) {
            firstBlankLineIndex = index
          }

          atMarker = undefined
        }
      } else if (
        event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.linePrefix ||
        event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listItemValue ||
        event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listItemMarker ||
        event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listItemPrefix ||
        event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listItemPrefixWhitespace
      ) {
        // Empty.
      } else {
        atMarker = undefined
      }

      if (
        (!containerBalance &&
          event[0] === 'enter' &&
          event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listItemPrefix) ||
        (containerBalance === -1 &&
          event[0] === 'exit' &&
          (event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listUnordered ||
            event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listOrdered))
      ) {
        if (listItem) {
          let tailIndex = index
          lineIndex = undefined

          while (tailIndex--) {
            const tailEvent = events[tailIndex]

            if (
              tailEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding ||
              tailEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEndingBlank
            ) {
              if (tailEvent[0] === 'exit') continue

              if (lineIndex) {
                events[lineIndex][1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEndingBlank
                listSpread = true
              }

              tailEvent[1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding
              lineIndex = tailIndex
            } else if (
              tailEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.linePrefix ||
              tailEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.blockQuotePrefix ||
              tailEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.blockQuotePrefixWhitespace ||
              tailEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.blockQuoteMarker ||
              tailEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listItemIndent
            ) {
              // Empty
            } else {
              break
            }
          }

          if (
            firstBlankLineIndex &&
            (!lineIndex || firstBlankLineIndex < lineIndex)
          ) {
            // @ts-expect-error Patched.
            listItem._spread = true
          }

          // Fix position.
          listItem.end = Object.assign(
            {},
            lineIndex ? events[lineIndex][1].start : event[1].end
          )

          events.splice(lineIndex || index, 0, ['exit', listItem, event[2]])
          index++
          length++
        }

        // Create a new list item.
        if (event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.listItemPrefix) {
          listItem = {
            type: 'listItem',
            // @ts-expect-error Patched
            _spread: false,
            start: Object.assign({}, event[1].start)
          }
          // @ts-expect-error: `listItem` is most definitely defined, TS...
          events.splice(index, 0, ['enter', listItem, event[2]])
          index++
          length++
          firstBlankLineIndex = undefined
          atMarker = true
        }
      }
    }

    // @ts-expect-error Patched.
    events[start][1]._spread = listSpread
    return length
  }

  /**
   * @type {CompileContext['setData']}
   * @param [value]
   */
  function setData(key, value) {
    data[key] = value
  }

  /**
   * @type {CompileContext['getData']}
   * @template {string} K
   * @param {K} key
   * @returns {CompileData[K]}
   */
  function getData(key) {
    return data[key]
  }

  /**
   * @param {Point} d
   * @returns {Point}
   */
  function point(d) {
    return {line: d.line, column: d.column, offset: d.offset}
  }

  /**
   * @param {(token: Token) => Node} create
   * @param {Handle} [and]
   * @returns {Handle}
   */
  function opener(create, and) {
    return open

    /**
     * @this {CompileContext}
     * @param {Token} token
     * @returns {void}
     */
    function open(token) {
      enter.call(this, create(token), token)
      if (and) and.call(this, token)
    }
  }

  /** @type {CompileContext['buffer']} */
  function buffer() {
    this.stack.push({type: 'fragment', children: []})
  }

  /**
   * @type {CompileContext['enter']}
   * @template {Node} N
   * @this {CompileContext}
   * @param {N} node
   * @param {Token} token
   * @param {OnEnterError} [errorHandler]
   * @returns {N}
   */
  function enter(node, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1]
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(parent, 'expected `parent`')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)('children' in parent, 'expected `parent`')
    // @ts-expect-error: Assume `Node` can exist as a child of `parent`.
    parent.children.push(node)
    this.stack.push(node)
    this.tokenStack.push([token, errorHandler])
    // @ts-expect-error: `end` will be patched later.
    node.position = {start: point(token.start)}
    return node
  }

  /**
   * @param {Handle} [and]
   * @returns {Handle}
   */
  function closer(and) {
    return close

    /**
     * @this {CompileContext}
     * @param {Token} token
     * @returns {void}
     */
    function close(token) {
      if (and) and.call(this, token)
      exit.call(this, token)
    }
  }

  /**
   * @type {CompileContext['exit']}
   * @this {CompileContext}
   * @param {Token} token
   * @param {OnExitError} [onExitError]
   * @returns {Node}
   */
  function exit(token, onExitError) {
    const node = this.stack.pop()
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(node, 'expected `node`')
    const open = this.tokenStack.pop()

    if (!open) {
      throw new Error(
        'Cannot close `' +
          token.type +
          '` (' +
          (0,unist_util_stringify_position__WEBPACK_IMPORTED_MODULE_5__.stringifyPosition)({start: token.start, end: token.end}) +
          '): it’s not open'
      )
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0])
      } else {
        const handler = open[1] || defaultOnError
        handler.call(this, token, open[0])
      }
    }

    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type !== 'fragment', 'unexpected fragment `exit`ed')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(node.position, 'expected `position` to be defined')
    node.position.end = point(token.end)
    return node
  }

  /**
   * @this {CompileContext}
   * @returns {string}
   */
  function resume() {
    return (0,mdast_util_to_string__WEBPACK_IMPORTED_MODULE_6__.toString)(this.stack.pop())
  }

  //
  // Handlers.
  //

  /** @type {Handle} */
  function onenterlistordered() {
    setData('expectingFirstListItemValue', true)
  }

  /** @type {Handle} */
  function onenterlistitemvalue(token) {
    if (getData('expectingFirstListItemValue')) {
      const ancestor = /** @type {List} */ (this.stack[this.stack.length - 2])
      ancestor.start = Number.parseInt(
        this.sliceSerialize(token),
        micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_7__.constants.numericBaseDecimal
      )
      setData('expectingFirstListItemValue')
    }
  }

  /** @type {Handle} */
  function onexitcodefencedfenceinfo() {
    const data = this.resume()
    const node = /** @type {Code} */ (this.stack[this.stack.length - 1])
    node.lang = data
  }

  /** @type {Handle} */
  function onexitcodefencedfencemeta() {
    const data = this.resume()
    const node = /** @type {Code} */ (this.stack[this.stack.length - 1])
    node.meta = data
  }

  /** @type {Handle} */
  function onexitcodefencedfence() {
    // Exit if this is the closing fence.
    if (getData('flowCodeInside')) return
    this.buffer()
    setData('flowCodeInside', true)
  }

  /** @type {Handle} */
  function onexitcodefenced() {
    const data = this.resume()
    const node = /** @type {Code} */ (this.stack[this.stack.length - 1])

    node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')

    setData('flowCodeInside')
  }

  /** @type {Handle} */
  function onexitcodeindented() {
    const data = this.resume()
    const node = /** @type {Code} */ (this.stack[this.stack.length - 1])

    node.value = data.replace(/(\r?\n|\r)$/g, '')
  }

  /** @type {Handle} */
  function onexitdefinitionlabelstring(token) {
    // Discard label, use the source content instead.
    const label = this.resume()
    const node = /** @type {Definition} */ (this.stack[this.stack.length - 1])
    node.label = label
    node.identifier = (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_8__.normalizeIdentifier)(
      this.sliceSerialize(token)
    ).toLowerCase()
  }

  /** @type {Handle} */
  function onexitdefinitiontitlestring() {
    const data = this.resume()
    const node = /** @type {Definition} */ (this.stack[this.stack.length - 1])
    node.title = data
  }

  /** @type {Handle} */
  function onexitdefinitiondestinationstring() {
    const data = this.resume()
    const node = /** @type {Definition} */ (this.stack[this.stack.length - 1])
    node.url = data
  }

  /** @type {Handle} */
  function onexitatxheadingsequence(token) {
    const node = /** @type {Heading} */ (this.stack[this.stack.length - 1])
    if (!node.depth) {
      const depth = this.sliceSerialize(token).length

      ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
        depth === 1 ||
          depth === 2 ||
          depth === 3 ||
          depth === 4 ||
          depth === 5 ||
          depth === 6,
        'expected `depth` between `1` and `6`'
      )

      node.depth = depth
    }
  }

  /** @type {Handle} */
  function onexitsetextheadingtext() {
    setData('setextHeadingSlurpLineEnding', true)
  }

  /** @type {Handle} */
  function onexitsetextheadinglinesequence(token) {
    const node = /** @type {Heading} */ (this.stack[this.stack.length - 1])

    node.depth =
      this.sliceSerialize(token).charCodeAt(0) === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_9__.codes.equalsTo ? 1 : 2
  }

  /** @type {Handle} */
  function onexitsetextheading() {
    setData('setextHeadingSlurpLineEnding')
  }

  /** @type {Handle} */
  function onenterdata(token) {
    const parent = /** @type {Parent} */ (this.stack[this.stack.length - 1])
    /** @type {Node} */
    let tail = parent.children[parent.children.length - 1]

    if (!tail || tail.type !== 'text') {
      // Add a new text node.
      tail = text()
      // @ts-expect-error: we’ll add `end` later.
      tail.position = {start: point(token.start)}
      // @ts-expect-error: Assume `parent` accepts `text`.
      parent.children.push(tail)
    }

    this.stack.push(tail)
  }

  /** @type {Handle} */
  function onexitdata(token) {
    const tail = this.stack.pop()
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(tail, 'expected a `node` to be on the stack')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)('value' in tail, 'expected a `literal` to be on the stack')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(tail.position, 'expected `node` to have an open position')
    tail.value += this.sliceSerialize(token)
    tail.position.end = point(token.end)
  }

  /** @type {Handle} */
  function onexitlineending(token) {
    const context = this.stack[this.stack.length - 1]
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(context, 'expected `node`')

    // If we’re at a hard break, include the line ending in there.
    if (getData('atHardBreak')) {
      (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)('children' in context, 'expected `parent`')
      const tail = context.children[context.children.length - 1]
      ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(tail.position, 'expected tail to have a starting position')
      tail.position.end = point(token.end)
      setData('atHardBreak')
      return
    }

    if (
      !getData('setextHeadingSlurpLineEnding') &&
      config.canContainEols.includes(context.type)
    ) {
      onenterdata.call(this, token)
      onexitdata.call(this, token)
    }
  }

  /** @type {Handle} */
  function onexithardbreak() {
    setData('atHardBreak', true)
  }

  /** @type {Handle} */
  function onexithtmlflow() {
    const data = this.resume()
    const node = /** @type {HTML} */ (this.stack[this.stack.length - 1])
    node.value = data
  }

  /** @type {Handle} */
  function onexithtmltext() {
    const data = this.resume()
    const node = /** @type {HTML} */ (this.stack[this.stack.length - 1])
    node.value = data
  }

  /** @type {Handle} */
  function onexitcodetext() {
    const data = this.resume()
    const node = /** @type {InlineCode} */ (this.stack[this.stack.length - 1])
    node.value = data
  }

  /** @type {Handle} */
  function onexitlink() {
    const context = /** @type {Link & {identifier: string, label: string}} */ (
      this.stack[this.stack.length - 1]
    )

    // To do: clean.
    if (getData('inReference')) {
      context.type += 'Reference'
      // @ts-expect-error: mutate.
      context.referenceType = getData('referenceType') || 'shortcut'
      // @ts-expect-error: mutate.
      delete context.url
      delete context.title
    } else {
      // @ts-expect-error: mutate.
      delete context.identifier
      // @ts-expect-error: mutate.
      delete context.label
    }

    setData('referenceType')
  }

  /** @type {Handle} */
  function onexitimage() {
    const context = /** @type {Image & {identifier: string, label: string}} */ (
      this.stack[this.stack.length - 1]
    )

    // To do: clean.
    if (getData('inReference')) {
      context.type += 'Reference'
      // @ts-expect-error: mutate.
      context.referenceType = getData('referenceType') || 'shortcut'
      // @ts-expect-error: mutate.
      delete context.url
      delete context.title
    } else {
      // @ts-expect-error: mutate.
      delete context.identifier
      // @ts-expect-error: mutate.
      delete context.label
    }

    setData('referenceType')
  }

  /** @type {Handle} */
  function onexitlabeltext(token) {
    const ancestor =
      /** @type {(Link|Image) & {identifier: string, label: string}} */ (
        this.stack[this.stack.length - 2]
      )
    const string = this.sliceSerialize(token)

    ancestor.label = (0,micromark_util_decode_string__WEBPACK_IMPORTED_MODULE_10__.decodeString)(string)
    ancestor.identifier = (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_8__.normalizeIdentifier)(string).toLowerCase()
  }

  /** @type {Handle} */
  function onexitlabel() {
    const fragment = /** @type {Fragment} */ (this.stack[this.stack.length - 1])
    const value = this.resume()
    const node =
      /** @type {(Link|Image) & {identifier: string, label: string}} */ (
        this.stack[this.stack.length - 1]
      )

    // Assume a reference.
    setData('inReference', true)

    if (node.type === 'link') {
      // @ts-expect-error: Assume static phrasing content.
      node.children = fragment.children
    } else {
      node.alt = value
    }
  }

  /** @type {Handle} */
  function onexitresourcedestinationstring() {
    const data = this.resume()
    const node = /** @type {Link|Image} */ (this.stack[this.stack.length - 1])
    node.url = data
  }

  /** @type {Handle} */
  function onexitresourcetitlestring() {
    const data = this.resume()
    const node = /** @type {Link|Image} */ (this.stack[this.stack.length - 1])
    node.title = data
  }

  /** @type {Handle} */
  function onexitresource() {
    setData('inReference')
  }

  /** @type {Handle} */
  function onenterreference() {
    setData('referenceType', 'collapsed')
  }

  /** @type {Handle} */
  function onexitreferencestring(token) {
    const label = this.resume()
    const node = /** @type {LinkReference|ImageReference} */ (
      this.stack[this.stack.length - 1]
    )
    node.label = label
    node.identifier = (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_8__.normalizeIdentifier)(
      this.sliceSerialize(token)
    ).toLowerCase()
    setData('referenceType', 'full')
  }

  /** @type {Handle} */
  function onexitcharacterreferencemarker(token) {
    setData('characterReferenceType', token.type)
  }

  /** @type {Handle} */
  function onexitcharacterreferencevalue(token) {
    const data = this.sliceSerialize(token)
    const type = getData('characterReferenceType')
    /** @type {string} */
    let value

    if (type) {
      value = (0,micromark_util_decode_numeric_character_reference__WEBPACK_IMPORTED_MODULE_11__.decodeNumericCharacterReference)(
        data,
        type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.characterReferenceMarkerNumeric
          ? micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_7__.constants.numericBaseDecimal
          : micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_7__.constants.numericBaseHexadecimal
      )
      setData('characterReferenceType')
    } else {
      // @ts-expect-error `decodeNamedCharacterReference` can return false for
      // invalid named character references, but everything we’ve tokenized is
      // valid.
      value = (0,decode_named_character_reference__WEBPACK_IMPORTED_MODULE_12__.decodeNamedCharacterReference)(data)
    }

    const tail = this.stack.pop()
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(tail, 'expected `node`')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(tail.position, 'expected `node.position`')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)('value' in tail, 'expected `node.value`')
    tail.value += value
    tail.position.end = point(token.end)
  }

  /** @type {Handle} */
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token)
    const node = /** @type {Link} */ (this.stack[this.stack.length - 1])
    node.url = this.sliceSerialize(token)
  }

  /** @type {Handle} */
  function onexitautolinkemail(token) {
    onexitdata.call(this, token)
    const node = /** @type {Link} */ (this.stack[this.stack.length - 1])
    node.url = 'mailto:' + this.sliceSerialize(token)
  }

  //
  // Creaters.
  //

  /** @returns {Blockquote} */
  function blockQuote() {
    return {type: 'blockquote', children: []}
  }

  /** @returns {Code} */
  function codeFlow() {
    return {type: 'code', lang: null, meta: null, value: ''}
  }

  /** @returns {InlineCode} */
  function codeText() {
    return {type: 'inlineCode', value: ''}
  }

  /** @returns {Definition} */
  function definition() {
    return {
      type: 'definition',
      identifier: '',
      label: null,
      title: null,
      url: ''
    }
  }

  /** @returns {Emphasis} */
  function emphasis() {
    return {type: 'emphasis', children: []}
  }

  /** @returns {Heading} */
  function heading() {
    // @ts-expect-error `depth` will be set later.
    return {type: 'heading', depth: undefined, children: []}
  }

  /** @returns {Break} */
  function hardBreak() {
    return {type: 'break'}
  }

  /** @returns {HTML} */
  function html() {
    return {type: 'html', value: ''}
  }

  /** @returns {Image} */
  function image() {
    return {type: 'image', title: null, url: '', alt: null}
  }

  /** @returns {Link} */
  function link() {
    return {type: 'link', title: null, url: '', children: []}
  }

  /**
   * @param {Token} token
   * @returns {List}
   */
  function list(token) {
    return {
      type: 'list',
      ordered: token.type === 'listOrdered',
      start: null,
      // @ts-expect-error Patched.
      spread: token._spread,
      children: []
    }
  }

  /**
   * @param {Token} token
   * @returns {ListItem}
   */
  function listItem(token) {
    return {
      type: 'listItem',
      // @ts-expect-error Patched.
      spread: token._spread,
      checked: null,
      children: []
    }
  }

  /** @returns {Paragraph} */
  function paragraph() {
    return {type: 'paragraph', children: []}
  }

  /** @returns {Strong} */
  function strong() {
    return {type: 'strong', children: []}
  }

  /** @returns {Text} */
  function text() {
    return {type: 'text', value: ''}
  }

  /** @returns {ThematicBreak} */
  function thematicBreak() {
    return {type: 'thematicBreak'}
  }
}

/**
 * @param {Extension} combined
 * @param {Array<Extension|Array<Extension>>} extensions
 * @returns {Extension}
 */
function configure(combined, extensions) {
  let index = -1

  while (++index < extensions.length) {
    const value = extensions[index]

    if (Array.isArray(value)) {
      configure(combined, value)
    } else {
      extension(combined, value)
    }
  }

  return combined
}

/**
 * @param {Extension} combined
 * @param {Extension} extension
 * @returns {void}
 */
function extension(combined, extension) {
  /** @type {string} */
  let key

  for (key in extension) {
    if (own.call(extension, key)) {
      const list = key === 'canContainEols' || key === 'transforms'
      const maybe = own.call(combined, key) ? combined[key] : undefined
      /* c8 ignore next */
      const left = maybe || (combined[key] = list ? [] : {})
      const right = extension[key]

      if (right) {
        if (list) {
          // @ts-expect-error: `left` is an array.
          combined[key] = [...left, ...right]
        } else {
          Object.assign(left, right)
        }
      }
    }
  }
}

/** @type {OnEnterError} */
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      'Cannot close `' +
        left.type +
        '` (' +
        (0,unist_util_stringify_position__WEBPACK_IMPORTED_MODULE_5__.stringifyPosition)({start: left.start, end: left.end}) +
        '): a different token (`' +
        right.type +
        '`, ' +
        (0,unist_util_stringify_position__WEBPACK_IMPORTED_MODULE_5__.stringifyPosition)({start: right.start, end: right.end}) +
        ') is open'
    )
  } else {
    throw new Error(
      'Cannot close document, a token (`' +
        right.type +
        '`, ' +
        (0,unist_util_stringify_position__WEBPACK_IMPORTED_MODULE_5__.stringifyPosition)({start: right.start, end: right.end}) +
        ') is still open'
    )
  }
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/footer.js":
/*!*******************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/footer.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "footer": () => (/* binding */ footer)
/* harmony export */ });
/* harmony import */ var micromark_util_sanitize_uri__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-sanitize-uri */ "./node_modules/micromark-util-sanitize-uri/dev/index.js");
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/* harmony import */ var _wrap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wrap.js */ "./node_modules/mdast-util-to-hast/lib/wrap.js");
/**
 * @typedef {import('mdast').BlockContent} BlockContent
 * @typedef {import('mdast').FootnoteDefinition} FootnoteDefinition
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('./index.js').H} H
 */






/**
 * @param {H} h
 */
function footer(h) {
  let index = -1
  /** @type {Array<ElementContent>} */
  const listItems = []

  while (++index < h.footnoteOrder.length) {
    const def = h.footnoteById[h.footnoteOrder[index].toUpperCase()]

    if (!def) {
      continue
    }

    const content = (0,_traverse_js__WEBPACK_IMPORTED_MODULE_0__.all)(h, def)
    const id = String(def.identifier)
    const safeId = (0,micromark_util_sanitize_uri__WEBPACK_IMPORTED_MODULE_1__.sanitizeUri)(id.toLowerCase())
    let referenceIndex = 0
    /** @type {Array<ElementContent>} */
    const backReferences = []

    while (++referenceIndex <= h.footnoteCounts[id]) {
      /** @type {Element} */
      const backReference = {
        type: 'element',
        tagName: 'a',
        properties: {
          href:
            '#' +
            h.clobberPrefix +
            'fnref-' +
            safeId +
            (referenceIndex > 1 ? '-' + referenceIndex : ''),
          dataFootnoteBackref: true,
          className: ['data-footnote-backref'],
          ariaLabel: h.footnoteBackLabel
        },
        children: [{type: 'text', value: '↩'}]
      }

      if (referenceIndex > 1) {
        backReference.children.push({
          type: 'element',
          tagName: 'sup',
          children: [{type: 'text', value: String(referenceIndex)}]
        })
      }

      if (backReferences.length > 0) {
        backReferences.push({type: 'text', value: ' '})
      }

      backReferences.push(backReference)
    }

    const tail = content[content.length - 1]

    if (tail && tail.type === 'element' && tail.tagName === 'p') {
      const tailTail = tail.children[tail.children.length - 1]
      if (tailTail && tailTail.type === 'text') {
        tailTail.value += ' '
      } else {
        tail.children.push({type: 'text', value: ' '})
      }

      tail.children.push(...backReferences)
    } else {
      content.push(...backReferences)
    }

    /** @type {Element} */
    const listItem = {
      type: 'element',
      tagName: 'li',
      properties: {id: h.clobberPrefix + 'fn-' + safeId},
      children: (0,_wrap_js__WEBPACK_IMPORTED_MODULE_2__.wrap)(content, true)
    }

    if (def.position) {
      listItem.position = def.position
    }

    listItems.push(listItem)
  }

  if (listItems.length === 0) {
    return null
  }

  return {
    type: 'element',
    tagName: 'section',
    properties: {dataFootnotes: true, className: ['footnotes']},
    children: [
      {
        type: 'element',
        tagName: 'h2',
        properties: {id: 'footnote-label', className: ['sr-only']},
        children: [(0,unist_builder__WEBPACK_IMPORTED_MODULE_3__.u)('text', h.footnoteLabel)]
      },
      {type: 'text', value: '\n'},
      {
        type: 'element',
        tagName: 'ol',
        properties: {},
        children: (0,_wrap_js__WEBPACK_IMPORTED_MODULE_2__.wrap)(listItems, true)
      },
      {type: 'text', value: '\n'}
    ]
  }
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/blockquote.js":
/*!********************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/blockquote.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blockquote": () => (/* binding */ blockquote)
/* harmony export */ });
/* harmony import */ var _wrap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wrap.js */ "./node_modules/mdast-util-to-hast/lib/wrap.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').Blockquote} Blockquote
 * @typedef {import('../index.js').Handler} Handler
 */




/**
 * @type {Handler}
 * @param {Blockquote} node
 */
function blockquote(h, node) {
  return h(node, 'blockquote', (0,_wrap_js__WEBPACK_IMPORTED_MODULE_0__.wrap)((0,_traverse_js__WEBPACK_IMPORTED_MODULE_1__.all)(h, node), true))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/break.js":
/*!***************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/break.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hardBreak": () => (/* binding */ hardBreak)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Text} Text
 * @typedef {import('mdast').Break} Break
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {Break} node
 * @returns {Array<Element|Text>}
 */
function hardBreak(h, node) {
  return [h(node, 'br'), (0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', '\n')]
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/code.js":
/*!**************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/code.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "code": () => (/* binding */ code)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/**
 * @typedef {import('mdast').Code} Code
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {Code} node
 */
function code(h, node) {
  const value = node.value ? node.value + '\n' : ''
  // To do: next major, use `node.lang` w/o regex, the splitting’s been going
  // on for years in remark now.
  const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/)
  /** @type {Properties} */
  const props = {}

  if (lang) {
    props.className = ['language-' + lang]
  }

  const code = h(node, 'code', props, [(0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', value)])

  if (node.meta) {
    code.data = {meta: node.meta}
  }

  return h(node.position, 'pre', [code])
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/delete.js":
/*!****************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/delete.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "strikethrough": () => (/* binding */ strikethrough)
/* harmony export */ });
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').Delete} Delete
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {Delete} node
 */
function strikethrough(h, node) {
  return h(node, 'del', (0,_traverse_js__WEBPACK_IMPORTED_MODULE_0__.all)(h, node))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/emphasis.js":
/*!******************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/emphasis.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emphasis": () => (/* binding */ emphasis)
/* harmony export */ });
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').Emphasis} Emphasis
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {Emphasis} node
 */
function emphasis(h, node) {
  return h(node, 'em', (0,_traverse_js__WEBPACK_IMPORTED_MODULE_0__.all)(h, node))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js":
/*!****************************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "footnoteReference": () => (/* binding */ footnoteReference)
/* harmony export */ });
/* harmony import */ var micromark_util_sanitize_uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-sanitize-uri */ "./node_modules/micromark-util-sanitize-uri/dev/index.js");
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/**
 * @typedef {import('mdast').FootnoteReference} FootnoteReference
 * @typedef {import('../index.js').Handler} Handler
 */




/**
 * @type {Handler}
 * @param {FootnoteReference} node
 */
function footnoteReference(h, node) {
  const id = String(node.identifier)
  const safeId = (0,micromark_util_sanitize_uri__WEBPACK_IMPORTED_MODULE_0__.sanitizeUri)(id.toLowerCase())
  const index = h.footnoteOrder.indexOf(id)
  /** @type {number} */
  let counter

  if (index === -1) {
    h.footnoteOrder.push(id)
    h.footnoteCounts[id] = 1
    counter = h.footnoteOrder.length
  } else {
    h.footnoteCounts[id]++
    counter = index + 1
  }

  const reuseCounter = h.footnoteCounts[id]

  return h(node, 'sup', [
    h(
      node.position,
      'a',
      {
        href: '#' + h.clobberPrefix + 'fn-' + safeId,
        id:
          h.clobberPrefix +
          'fnref-' +
          safeId +
          (reuseCounter > 1 ? '-' + reuseCounter : ''),
        dataFootnoteRef: true,
        ariaDescribedBy: 'footnote-label'
      },
      [(0,unist_builder__WEBPACK_IMPORTED_MODULE_1__.u)('text', String(counter))]
    )
  ])
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/footnote.js":
/*!******************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/footnote.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "footnote": () => (/* binding */ footnote)
/* harmony export */ });
/* harmony import */ var _footnote_reference_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footnote-reference.js */ "./node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js");
/**
 * @typedef {import('mdast').Footnote} Footnote
 * @typedef {import('../index.js').Handler} Handler
 *
 * @todo
 *   `footnote` (or “inline note”) are a pandoc footnotes feature (`^[a note]`)
 *   that does not exist in GFM.
 *   We still have support for it, so that things remain working with
 *   `micromark-extension-footnote` and `mdast-util-footnote`, but in the future
 *   we might be able to remove it?
 */



/**
 * @type {Handler}
 * @param {Footnote} node
 */
function footnote(h, node) {
  const footnoteById = h.footnoteById
  let no = 1

  while (no in footnoteById) no++

  const identifier = String(no)

  footnoteById[identifier] = {
    type: 'footnoteDefinition',
    identifier,
    children: [{type: 'paragraph', children: node.children}],
    position: node.position
  }

  return (0,_footnote_reference_js__WEBPACK_IMPORTED_MODULE_0__.footnoteReference)(h, {
    type: 'footnoteReference',
    identifier,
    position: node.position
  })
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/heading.js":
/*!*****************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/heading.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "heading": () => (/* binding */ heading)
/* harmony export */ });
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').Heading} Heading
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {Heading} node
 */
function heading(h, node) {
  return h(node, 'h' + node.depth, (0,_traverse_js__WEBPACK_IMPORTED_MODULE_0__.all)(h, node))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/html.js":
/*!**************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/html.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "html": () => (/* binding */ html)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/**
 * @typedef {import('mdast').HTML} HTML
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * Return either a `raw` node in dangerous mode, otherwise nothing.
 *
 * @type {Handler}
 * @param {HTML} node
 */
function html(h, node) {
  return h.dangerous ? h.augment(node, (0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('raw', node.value)) : null
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/image-reference.js":
/*!*************************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/image-reference.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "imageReference": () => (/* binding */ imageReference)
/* harmony export */ });
/* harmony import */ var mdurl_encode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdurl/encode.js */ "./node_modules/mdurl/encode.js");
/* harmony import */ var _revert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../revert.js */ "./node_modules/mdast-util-to-hast/lib/revert.js");
/**
 * @typedef {import('mdast').ImageReference} ImageReference
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('../index.js').Handler} Handler
 */




/**
 * @type {Handler}
 * @param {ImageReference} node
 */
function imageReference(h, node) {
  const def = h.definition(node.identifier)

  if (!def) {
    return (0,_revert_js__WEBPACK_IMPORTED_MODULE_1__.revert)(h, node)
  }

  /** @type {Properties} */
  const props = {src: mdurl_encode_js__WEBPACK_IMPORTED_MODULE_0__(def.url || ''), alt: node.alt}

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title
  }

  return h(node, 'img', props)
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/image.js":
/*!***************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/image.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "image": () => (/* binding */ image)
/* harmony export */ });
/* harmony import */ var mdurl_encode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdurl/encode.js */ "./node_modules/mdurl/encode.js");
/**
 * @typedef {import('mdast').Image} Image
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {Image} node
 */
function image(h, node) {
  /** @type {Properties} */
  const props = {src: mdurl_encode_js__WEBPACK_IMPORTED_MODULE_0__(node.url), alt: node.alt}

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title
  }

  return h(node, 'img', props)
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handlers": () => (/* binding */ handlers)
/* harmony export */ });
/* harmony import */ var _blockquote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blockquote.js */ "./node_modules/mdast-util-to-hast/lib/handlers/blockquote.js");
/* harmony import */ var _break_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./break.js */ "./node_modules/mdast-util-to-hast/lib/handlers/break.js");
/* harmony import */ var _code_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code.js */ "./node_modules/mdast-util-to-hast/lib/handlers/code.js");
/* harmony import */ var _delete_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delete.js */ "./node_modules/mdast-util-to-hast/lib/handlers/delete.js");
/* harmony import */ var _emphasis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./emphasis.js */ "./node_modules/mdast-util-to-hast/lib/handlers/emphasis.js");
/* harmony import */ var _footnote_reference_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./footnote-reference.js */ "./node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js");
/* harmony import */ var _footnote_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./footnote.js */ "./node_modules/mdast-util-to-hast/lib/handlers/footnote.js");
/* harmony import */ var _heading_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./heading.js */ "./node_modules/mdast-util-to-hast/lib/handlers/heading.js");
/* harmony import */ var _html_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./html.js */ "./node_modules/mdast-util-to-hast/lib/handlers/html.js");
/* harmony import */ var _image_reference_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./image-reference.js */ "./node_modules/mdast-util-to-hast/lib/handlers/image-reference.js");
/* harmony import */ var _image_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./image.js */ "./node_modules/mdast-util-to-hast/lib/handlers/image.js");
/* harmony import */ var _inline_code_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./inline-code.js */ "./node_modules/mdast-util-to-hast/lib/handlers/inline-code.js");
/* harmony import */ var _link_reference_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./link-reference.js */ "./node_modules/mdast-util-to-hast/lib/handlers/link-reference.js");
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./link.js */ "./node_modules/mdast-util-to-hast/lib/handlers/link.js");
/* harmony import */ var _list_item_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./list-item.js */ "./node_modules/mdast-util-to-hast/lib/handlers/list-item.js");
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./list.js */ "./node_modules/mdast-util-to-hast/lib/handlers/list.js");
/* harmony import */ var _paragraph_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./paragraph.js */ "./node_modules/mdast-util-to-hast/lib/handlers/paragraph.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./root.js */ "./node_modules/mdast-util-to-hast/lib/handlers/root.js");
/* harmony import */ var _strong_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./strong.js */ "./node_modules/mdast-util-to-hast/lib/handlers/strong.js");
/* harmony import */ var _table_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./table.js */ "./node_modules/mdast-util-to-hast/lib/handlers/table.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./text.js */ "./node_modules/mdast-util-to-hast/lib/handlers/text.js");
/* harmony import */ var _thematic_break_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./thematic-break.js */ "./node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js");























const handlers = {
  blockquote: _blockquote_js__WEBPACK_IMPORTED_MODULE_0__.blockquote,
  break: _break_js__WEBPACK_IMPORTED_MODULE_1__.hardBreak,
  code: _code_js__WEBPACK_IMPORTED_MODULE_2__.code,
  delete: _delete_js__WEBPACK_IMPORTED_MODULE_3__.strikethrough,
  emphasis: _emphasis_js__WEBPACK_IMPORTED_MODULE_4__.emphasis,
  footnoteReference: _footnote_reference_js__WEBPACK_IMPORTED_MODULE_5__.footnoteReference,
  footnote: _footnote_js__WEBPACK_IMPORTED_MODULE_6__.footnote,
  heading: _heading_js__WEBPACK_IMPORTED_MODULE_7__.heading,
  html: _html_js__WEBPACK_IMPORTED_MODULE_8__.html,
  imageReference: _image_reference_js__WEBPACK_IMPORTED_MODULE_9__.imageReference,
  image: _image_js__WEBPACK_IMPORTED_MODULE_10__.image,
  inlineCode: _inline_code_js__WEBPACK_IMPORTED_MODULE_11__.inlineCode,
  linkReference: _link_reference_js__WEBPACK_IMPORTED_MODULE_12__.linkReference,
  link: _link_js__WEBPACK_IMPORTED_MODULE_13__.link,
  listItem: _list_item_js__WEBPACK_IMPORTED_MODULE_14__.listItem,
  list: _list_js__WEBPACK_IMPORTED_MODULE_15__.list,
  paragraph: _paragraph_js__WEBPACK_IMPORTED_MODULE_16__.paragraph,
  root: _root_js__WEBPACK_IMPORTED_MODULE_17__.root,
  strong: _strong_js__WEBPACK_IMPORTED_MODULE_18__.strong,
  table: _table_js__WEBPACK_IMPORTED_MODULE_19__.table,
  text: _text_js__WEBPACK_IMPORTED_MODULE_20__.text,
  thematicBreak: _thematic_break_js__WEBPACK_IMPORTED_MODULE_21__.thematicBreak,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
}

// Return nothing for nodes that are ignored.
function ignore() {
  return null
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/inline-code.js":
/*!*********************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/inline-code.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inlineCode": () => (/* binding */ inlineCode)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/**
 * @typedef {import('mdast').InlineCode} InlineCode
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {InlineCode} node
 */
function inlineCode(h, node) {
  return h(node, 'code', [(0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', node.value.replace(/\r?\n|\r/g, ' '))])
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/link-reference.js":
/*!************************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/link-reference.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "linkReference": () => (/* binding */ linkReference)
/* harmony export */ });
/* harmony import */ var mdurl_encode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdurl/encode.js */ "./node_modules/mdurl/encode.js");
/* harmony import */ var _revert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../revert.js */ "./node_modules/mdast-util-to-hast/lib/revert.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').LinkReference} LinkReference
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('../index.js').Handler} Handler
 */





/**
 * @type {Handler}
 * @param {LinkReference} node
 */
function linkReference(h, node) {
  const def = h.definition(node.identifier)

  if (!def) {
    return (0,_revert_js__WEBPACK_IMPORTED_MODULE_1__.revert)(h, node)
  }

  /** @type {Properties} */
  const props = {href: mdurl_encode_js__WEBPACK_IMPORTED_MODULE_0__(def.url || '')}

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title
  }

  return h(node, 'a', props, (0,_traverse_js__WEBPACK_IMPORTED_MODULE_2__.all)(h, node))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/link.js":
/*!**************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/link.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "link": () => (/* binding */ link)
/* harmony export */ });
/* harmony import */ var mdurl_encode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdurl/encode.js */ "./node_modules/mdurl/encode.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').Link} Link
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('../index.js').Handler} Handler
 */




/**
 * @type {Handler}
 * @param {Link} node
 */
function link(h, node) {
  /** @type {Properties} */
  const props = {href: mdurl_encode_js__WEBPACK_IMPORTED_MODULE_0__(node.url)}

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title
  }

  return h(node, 'a', props, (0,_traverse_js__WEBPACK_IMPORTED_MODULE_1__.all)(h, node))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/list-item.js":
/*!*******************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/list-item.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "listItem": () => (/* binding */ listItem)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').ListItem} ListItem
 * @typedef {import('mdast').List} List
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('hast').Element} Element
 * @typedef {import('../index.js').Handler} Handler
 * @typedef {import('../index.js').Content} Content
 */




/**
 * @type {Handler}
 * @param {ListItem} node
 * @param {List} parent
 */
function listItem(h, node, parent) {
  const result = (0,_traverse_js__WEBPACK_IMPORTED_MODULE_0__.all)(h, node)
  const loose = parent ? listLoose(parent) : listItemLoose(node)
  /** @type {Properties} */
  const props = {}
  /** @type {Array<Content>} */
  const wrapped = []

  if (typeof node.checked === 'boolean') {
    /** @type {Element} */
    let paragraph

    if (
      result[0] &&
      result[0].type === 'element' &&
      result[0].tagName === 'p'
    ) {
      paragraph = result[0]
    } else {
      paragraph = h(null, 'p', [])
      result.unshift(paragraph)
    }

    if (paragraph.children.length > 0) {
      paragraph.children.unshift((0,unist_builder__WEBPACK_IMPORTED_MODULE_1__.u)('text', ' '))
    }

    paragraph.children.unshift(
      h(null, 'input', {
        type: 'checkbox',
        checked: node.checked,
        disabled: true
      })
    )

    // According to github-markdown-css, this class hides bullet.
    // See: <https://github.com/sindresorhus/github-markdown-css>.
    props.className = ['task-list-item']
  }

  let index = -1

  while (++index < result.length) {
    const child = result[index]

    // Add eols before nodes, except if this is a loose, first paragraph.
    if (
      loose ||
      index !== 0 ||
      child.type !== 'element' ||
      child.tagName !== 'p'
    ) {
      wrapped.push((0,unist_builder__WEBPACK_IMPORTED_MODULE_1__.u)('text', '\n'))
    }

    if (child.type === 'element' && child.tagName === 'p' && !loose) {
      wrapped.push(...child.children)
    } else {
      wrapped.push(child)
    }
  }

  const tail = result[result.length - 1]

  // Add a final eol.
  if (tail && (loose || !('tagName' in tail) || tail.tagName !== 'p')) {
    wrapped.push((0,unist_builder__WEBPACK_IMPORTED_MODULE_1__.u)('text', '\n'))
  }

  return h(node, 'li', props, wrapped)
}

/**
 * @param {List} node
 * @return {Boolean}
 */
function listLoose(node) {
  let loose = node.spread
  const children = node.children
  let index = -1

  while (!loose && ++index < children.length) {
    loose = listItemLoose(children[index])
  }

  return Boolean(loose)
}

/**
 * @param {ListItem} node
 * @return {Boolean}
 */
function listItemLoose(node) {
  const spread = node.spread

  return spread === undefined || spread === null
    ? node.children.length > 1
    : spread
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/list.js":
/*!**************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/list.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "list": () => (/* binding */ list)
/* harmony export */ });
/* harmony import */ var _wrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wrap.js */ "./node_modules/mdast-util-to-hast/lib/wrap.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').List} List
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('../index.js').Handler} Handler
 */




/**
 * @type {Handler}
 * @param {List} node
 * @returns {Element}
 */
function list(h, node) {
  /** @type {Properties} */
  const props = {}
  const name = node.ordered ? 'ol' : 'ul'
  const items = (0,_traverse_js__WEBPACK_IMPORTED_MODULE_0__.all)(h, node)
  let index = -1

  if (typeof node.start === 'number' && node.start !== 1) {
    props.start = node.start
  }

  // Like GitHub, add a class for custom styling.
  while (++index < items.length) {
    const item = items[index]

    if (
      item.type === 'element' &&
      item.tagName === 'li' &&
      item.properties &&
      Array.isArray(item.properties.className) &&
      item.properties.className.includes('task-list-item')
    ) {
      props.className = ['contains-task-list']
      break
    }
  }

  return h(node, name, props, (0,_wrap_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(items, true))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/paragraph.js":
/*!*******************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/paragraph.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "paragraph": () => (/* binding */ paragraph)
/* harmony export */ });
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').Paragraph} Paragraph
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {Paragraph} node
 */
function paragraph(h, node) {
  return h(node, 'p', (0,_traverse_js__WEBPACK_IMPORTED_MODULE_0__.all)(h, node))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/root.js":
/*!**************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/root.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "root": () => (/* binding */ root)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/* harmony import */ var _wrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wrap.js */ "./node_modules/mdast-util-to-hast/lib/wrap.js");
/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('../index.js').Handler} Handler
 */





/**
 * @type {Handler}
 * @param {Root} node
 */
function root(h, node) {
  // @ts-expect-error `root`s are also fine.
  return h.augment(node, (0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('root', (0,_wrap_js__WEBPACK_IMPORTED_MODULE_1__.wrap)((0,_traverse_js__WEBPACK_IMPORTED_MODULE_2__.all)(h, node))))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/strong.js":
/*!****************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/strong.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "strong": () => (/* binding */ strong)
/* harmony export */ });
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').Strong} Strong
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {Strong} node
 */
function strong(h, node) {
  return h(node, 'strong', (0,_traverse_js__WEBPACK_IMPORTED_MODULE_0__.all)(h, node))
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/table.js":
/*!***************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/table.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "table": () => (/* binding */ table)
/* harmony export */ });
/* harmony import */ var unist_util_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unist-util-position */ "./node_modules/unist-util-position/index.js");
/* harmony import */ var _wrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wrap.js */ "./node_modules/mdast-util-to-hast/lib/wrap.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').Table} Table
 * @typedef {import('mdast').TableCell} TableCell
 * @typedef {import('hast').Element} Element
 * @typedef {import('../index.js').Handler} Handler
 * @typedef {import('../index.js').Content} Content
 */





/**
 * @type {Handler}
 * @param {Table} node
 */
function table(h, node) {
  const rows = node.children
  let index = -1
  const align = node.align || []
  /** @type {Array<Element>} */
  const result = []

  while (++index < rows.length) {
    const row = rows[index].children
    const name = index === 0 ? 'th' : 'td'
    /** @type {Array<Content>} */
    const out = []
    let cellIndex = -1
    const length = node.align ? align.length : row.length

    while (++cellIndex < length) {
      const cell = row[cellIndex]
      out.push(
        h(cell, name, {align: align[cellIndex]}, cell ? (0,_traverse_js__WEBPACK_IMPORTED_MODULE_0__.all)(h, cell) : [])
      )
    }

    result[index] = h(rows[index], 'tr', (0,_wrap_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(out, true))
  }

  return h(
    node,
    'table',
    (0,_wrap_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(
      [h(result[0].position, 'thead', (0,_wrap_js__WEBPACK_IMPORTED_MODULE_1__.wrap)([result[0]], true))].concat(
        result[1]
          ? h(
              {
                start: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_2__.pointStart)(result[1]),
                end: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_2__.pointEnd)(result[result.length - 1])
              },
              'tbody',
              (0,_wrap_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(result.slice(1), true)
            )
          : []
      ),
      true
    )
  )
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/text.js":
/*!**************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/text.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/**
 * @typedef {import('mdast').Text} Text
 * @typedef {import('../index.js').Handler} Handler
 */



/**
 * @type {Handler}
 * @param {Text} node
 */
function text(h, node) {
  return h.augment(
    node,
    (0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', String(node.value).replace(/[ \t]*(\r?\n|\r)[ \t]*/g, '$1'))
  )
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js":
/*!************************************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "thematicBreak": () => (/* binding */ thematicBreak)
/* harmony export */ });
/**
 * @typedef {import('mdast').ThematicBreak} ThematicBreak
 * @typedef {import('hast').Element} Element
 * @typedef {import('../index.js').Handler} Handler
 */

/**
 * @type {Handler}
 * @param {ThematicBreak} [node]
 * @returns {Element}
 */
function thematicBreak(h, node) {
  return h(node, 'hr')
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultHandlers": () => (/* reexport safe */ _handlers_index_js__WEBPACK_IMPORTED_MODULE_1__.handlers),
/* harmony export */   "toHast": () => (/* binding */ toHast)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");
/* harmony import */ var unist_util_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! unist-util-position */ "./node_modules/unist-util-position/index.js");
/* harmony import */ var unist_util_generated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! unist-util-generated */ "./node_modules/unist-util-generated/index.js");
/* harmony import */ var mdast_util_definitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-definitions */ "./node_modules/mdast-util-definitions/index.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/* harmony import */ var _footer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./footer.js */ "./node_modules/mdast-util-to-hast/lib/footer.js");
/* harmony import */ var _handlers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers/index.js */ "./node_modules/mdast-util-to-hast/lib/handlers/index.js");
/**
 * @typedef {import('mdast').Root|import('mdast').Parent['children'][number]} MdastNode
 * @typedef {import('hast').Root|import('hast').Parent['children'][number]} HastNode
 * @typedef {import('mdast').Parent} Parent
 * @typedef {import('mdast').Definition} Definition
 * @typedef {import('mdast').FootnoteDefinition} FootnoteDefinition
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('hast').Text} Text
 * @typedef {import('hast').Comment} Comment
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').ElementContent} Content
 * @typedef {import('unist-util-position').PositionLike} PositionLike
 *
 * @typedef EmbeddedHastFields
 * @property {string} [hName] Defines the tag name of an element
 * @property {Properties} [hProperties] Defines the properties of an element
 * @property {Array<Content>} [hChildren] Defines the (hast) children of an element
 *
 * @typedef {Record<string, unknown> & EmbeddedHastFields} Data unist data with embedded hast fields
 *
 * @typedef {MdastNode & {data?: Data}} NodeWithData unist node with embedded hast data
 *
 * @callback Handler
 * @param {H} h Handle context
 * @param {any} node mdast node to handle
 * @param {Parent|null} parent Parent of `node`
 * @returns {Content|Array<Content>|null|undefined} hast node
 *
 * @callback HFunctionProps
 * @param {MdastNode|PositionLike|null|undefined} node mdast node or unist position
 * @param {string} tagName HTML tag name
 * @param {Properties} props Properties
 * @param {Array<Content>?} [children] hast content
 * @returns {Element}
 *
 * @callback HFunctionNoProps
 * @param {MdastNode|PositionLike|null|undefined} node mdast node or unist position
 * @param {string} tagName HTML tag name
 * @param {Array<Content>?} [children] hast content
 * @returns {Element}
 *
 * @typedef HFields
 * @property {boolean} dangerous Whether HTML is allowed
 * @property {string} clobberPrefix Prefix to use to prevent DOM clobbering
 * @property {string} footnoteLabel Label to use to introduce the footnote section
 * @property {string} footnoteBackLabel Label to use to go back to a footnote call from the footnote section
 * @property {(identifier: string) => Definition|null} definition Definition cache
 * @property {Record<string, FootnoteDefinition>} footnoteById Footnote cache
 * @property {Array<string>} footnoteOrder Order in which footnotes occur
 * @property {Record<string, number>} footnoteCounts Counts the same footnote was used
 * @property {Handlers} handlers Applied handlers
 * @property {Handler} unknownHandler Handler for any none not in `passThrough` or otherwise handled
 * @property {(left: NodeWithData|PositionLike|null|undefined, right: Content) => Content} augment Like `h` but lower-level and usable on non-elements.
 * @property {Array<string>} passThrough List of node types to pass through untouched (except for their children).
 *
 * @typedef Options
 * @property {boolean} [allowDangerousHtml=false]
 *   Whether to allow `html` nodes and inject them as `raw` HTML
 * @property {string} [clobberPrefix='user-content-']
 *   Prefix to use before the `id` attribute to prevent it from *clobbering*.
 *   attributes.
 *   DOM clobbering is this:
 *
 *   ```html
 *   <p id=x></p>
 *   <script>alert(x)</script>
 *   ```
 *
 *   Elements by their ID are made available in browsers on the `window` object.
 *   Using a prefix prevents this from being a problem.
 * @property {string} [footnoteLabel='Footnotes']
 *   Label to use for the footnotes section.
 *   Affects screen reader users.
 *   Change it if you’re authoring in a different language.
 * @property {string} [footnoteBackLabel='Back to content']
 *   Label to use from backreferences back to their footnote call.
 *   Affects screen reader users.
 *   Change it if you’re authoring in a different language.
 * @property {Handlers} [handlers]
 *   Object mapping mdast nodes to functions handling them
 * @property {Array<string>} [passThrough]
 *   List of custom mdast node types to pass through (keep) in hast
 * @property {Handler} [unknownHandler]
 *   Handler for all unknown nodes.
 *
 * @typedef {Record<string, Handler>} Handlers
 *   Map of node types to handlers
 * @typedef {HFunctionProps & HFunctionNoProps & HFields} H
 *   Handle context
 */










const own = {}.hasOwnProperty

/**
 * Factory to transform.
 * @param {MdastNode} tree mdast node
 * @param {Options} [options] Configuration
 * @returns {H} `h` function
 */
function factory(tree, options) {
  const settings = options || {}
  const dangerous = settings.allowDangerousHtml || false
  /** @type {Record<string, FootnoteDefinition>} */
  const footnoteById = {}

  h.dangerous = dangerous
  h.clobberPrefix =
    settings.clobberPrefix === undefined || settings.clobberPrefix === null
      ? 'user-content-'
      : settings.clobberPrefix
  h.footnoteLabel = settings.footnoteLabel || 'Footnotes'
  h.footnoteBackLabel = settings.footnoteBackLabel || 'Back to content'
  h.definition = (0,mdast_util_definitions__WEBPACK_IMPORTED_MODULE_0__.definitions)(tree)
  h.footnoteById = footnoteById
  /** @type {Array<string>} */
  h.footnoteOrder = []
  /** @type {Record<string, number>} */
  h.footnoteCounts = {}
  h.augment = augment
  h.handlers = {..._handlers_index_js__WEBPACK_IMPORTED_MODULE_1__.handlers, ...settings.handlers}
  h.unknownHandler = settings.unknownHandler
  h.passThrough = settings.passThrough

  ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_2__.visit)(tree, 'footnoteDefinition', (definition) => {
    const id = String(definition.identifier).toUpperCase()

    // Mimick CM behavior of link definitions.
    // See: <https://github.com/syntax-tree/mdast-util-definitions/blob/8290999/index.js#L26>.
    if (!own.call(footnoteById, id)) {
      footnoteById[id] = definition
    }
  })

  // @ts-expect-error Hush, it’s fine!
  return h

  /**
   * Finalise the created `right`, a hast node, from `left`, an mdast node.
   * @param {(NodeWithData|PositionLike)?} left
   * @param {Content} right
   * @returns {Content}
   */
  function augment(left, right) {
    // Handle `data.hName`, `data.hProperties, `data.hChildren`.
    if (left && 'data' in left && left.data) {
      /** @type {Data} */
      const data = left.data

      if (data.hName) {
        if (right.type !== 'element') {
          right = {
            type: 'element',
            tagName: '',
            properties: {},
            children: []
          }
        }

        right.tagName = data.hName
      }

      if (right.type === 'element' && data.hProperties) {
        right.properties = {...right.properties, ...data.hProperties}
      }

      if ('children' in right && right.children && data.hChildren) {
        right.children = data.hChildren
      }
    }

    if (left) {
      const ctx = 'type' in left ? left : {position: left}

      if (!(0,unist_util_generated__WEBPACK_IMPORTED_MODULE_3__.generated)(ctx)) {
        right.position = {start: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_4__.pointStart)(ctx), end: (0,unist_util_position__WEBPACK_IMPORTED_MODULE_4__.pointEnd)(ctx)}
      }
    }

    return right
  }

  /**
   * Create an element for `node`.
   *
   * @type {HFunctionProps}
   */
  function h(node, tagName, props, children) {
    if (Array.isArray(props)) {
      children = props
      props = {}
    }

    // @ts-expect-error augmenting an element yields an element.
    return augment(node, {
      type: 'element',
      tagName,
      properties: props || {},
      children: children || []
    })
  }
}

/**
 * Transform `tree` (an mdast node) to a hast node.
 *
 * @param {MdastNode} tree mdast node
 * @param {Options} [options] Configuration
 * @returns {HastNode|null|undefined} hast node
 */
function toHast(tree, options) {
  const h = factory(tree, options)
  const node = (0,_traverse_js__WEBPACK_IMPORTED_MODULE_5__.one)(h, tree, null)
  const foot = (0,_footer_js__WEBPACK_IMPORTED_MODULE_6__.footer)(h)

  if (foot) {
    // @ts-expect-error If there’s a footer, there were definitions, meaning block
    // content.
    // So assume `node` is a parent node.
    node.children.push((0,unist_builder__WEBPACK_IMPORTED_MODULE_7__.u)('text', '\n'), foot)
  }

  return Array.isArray(node) ? {type: 'root', children: node} : node
}




/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/revert.js":
/*!*******************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/revert.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "revert": () => (/* binding */ revert)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./traverse.js */ "./node_modules/mdast-util-to-hast/lib/traverse.js");
/**
 * @typedef {import('mdast').LinkReference} LinkReference
 * @typedef {import('mdast').ImageReference} ImageReference
 * @typedef {import('./index.js').Handler} Handler
 * @typedef {import('./index.js').Content} Content
 */




/**
 * Return the content of a reference without definition as plain text.
 *
 * @type {Handler}
 * @param {ImageReference|LinkReference} node
 * @returns {Content|Array<Content>}
 */
function revert(h, node) {
  const subtype = node.referenceType
  let suffix = ']'

  if (subtype === 'collapsed') {
    suffix += '[]'
  } else if (subtype === 'full') {
    suffix += '[' + (node.label || node.identifier) + ']'
  }

  if (node.type === 'imageReference') {
    return (0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', '![' + node.alt + suffix)
  }

  const contents = (0,_traverse_js__WEBPACK_IMPORTED_MODULE_1__.all)(h, node)
  const head = contents[0]

  if (head && head.type === 'text') {
    head.value = '[' + head.value
  } else {
    contents.unshift((0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', '['))
  }

  const tail = contents[contents.length - 1]

  if (tail && tail.type === 'text') {
    tail.value += suffix
  } else {
    contents.push((0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', suffix))
  }

  return contents
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/traverse.js":
/*!*********************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/traverse.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "all": () => (/* binding */ all),
/* harmony export */   "one": () => (/* binding */ one)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/**
 * @typedef {import('mdast').Root|import('mdast').Parent['children'][number]} MdastNode
 * @typedef {import('./index.js').H} H
 * @typedef {import('./index.js').Handler} Handler
 * @typedef {import('./index.js').Content} Content
 */



const own = {}.hasOwnProperty

/**
 * Transform an unknown node.
 * @type {Handler}
 * @param {MdastNode} node
 */
function unknown(h, node) {
  const data = node.data || {}

  if (
    'value' in node &&
    !(
      own.call(data, 'hName') ||
      own.call(data, 'hProperties') ||
      own.call(data, 'hChildren')
    )
  ) {
    return h.augment(node, (0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', node.value))
  }

  return h(node, 'div', all(h, node))
}

/**
 * @type {Handler}
 * @param {MdastNode} node
 */
function one(h, node, parent) {
  const type = node && node.type
  /** @type {Handler} */
  let fn

  // Fail on non-nodes.
  if (!type) {
    throw new Error('Expected node, got `' + node + '`')
  }

  if (own.call(h.handlers, type)) {
    fn = h.handlers[type]
  } else if (h.passThrough && h.passThrough.includes(type)) {
    fn = returnNode
  } else {
    fn = h.unknownHandler
  }

  return (typeof fn === 'function' ? fn : unknown)(h, node, parent)
}

/**
 * @type {Handler}
 * @param {MdastNode} node
 */
function returnNode(h, node) {
  // @ts-expect-error: Pass through custom node.
  return 'children' in node ? {...node, children: all(h, node)} : node
}

/**
 * @param {H} h
 * @param {MdastNode} parent
 */
function all(h, parent) {
  /** @type {Array<Content>} */
  const values = []

  if ('children' in parent) {
    const nodes = parent.children
    let index = -1

    while (++index < nodes.length) {
      const result = one(h, nodes[index], parent)

      if (result) {
        if (index && nodes[index - 1].type === 'break') {
          if (!Array.isArray(result) && result.type === 'text') {
            result.value = result.value.replace(/^\s+/, '')
          }

          if (!Array.isArray(result) && result.type === 'element') {
            const head = result.children[0]

            if (head && head.type === 'text') {
              head.value = head.value.replace(/^\s+/, '')
            }
          }
        }

        if (Array.isArray(result)) {
          values.push(...result)
        } else {
          values.push(result)
        }
      }
    }
  }

  return values
}


/***/ }),

/***/ "./node_modules/mdast-util-to-hast/lib/wrap.js":
/*!*****************************************************!*\
  !*** ./node_modules/mdast-util-to-hast/lib/wrap.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrap": () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var unist_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-builder */ "./node_modules/unist-builder/index.js");
/**
 * @typedef {import('./index.js').Content} Content
 */



/**
 * Wrap `nodes` with line feeds between each entry.
 * Optionally adds line feeds at the start and end.
 *
 * @param {Array<Content>} nodes
 * @param {boolean} [loose=false]
 * @returns {Array<Content>}
 */
function wrap(nodes, loose) {
  /** @type {Array<Content>} */
  const result = []
  let index = -1

  if (loose) {
    result.push((0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', '\n'))
  }

  while (++index < nodes.length) {
    if (index) result.push((0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', '\n'))
    result.push(nodes[index])
  }

  if (loose && nodes.length > 0) {
    result.push((0,unist_builder__WEBPACK_IMPORTED_MODULE_0__.u)('text', '\n'))
  }

  return result
}


/***/ }),

/***/ "./node_modules/mdast-util-to-string/index.js":
/*!****************************************************!*\
  !*** ./node_modules/mdast-util-to-string/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toString": () => (/* binding */ toString)
/* harmony export */ });
/**
 * @typedef Options
 * @property {boolean} [includeImageAlt=true]
 */

/**
 * Get the text content of a node.
 * Prefer the node’s plain-text fields, otherwise serialize its children,
 * and if the given value is an array, serialize the nodes in it.
 *
 * @param {unknown} node
 * @param {Options} [options]
 * @returns {string}
 */
function toString(node, options) {
  var {includeImageAlt = true} = options || {}
  return one(node, includeImageAlt)
}

/**
 * @param {unknown} node
 * @param {boolean} includeImageAlt
 * @returns {string}
 */
function one(node, includeImageAlt) {
  return (
    (node &&
      typeof node === 'object' &&
      // @ts-ignore looks like a literal.
      (node.value ||
        // @ts-ignore looks like an image.
        (includeImageAlt ? node.alt : '') ||
        // @ts-ignore looks like a parent.
        ('children' in node && all(node.children, includeImageAlt)) ||
        (Array.isArray(node) && all(node, includeImageAlt)))) ||
    ''
  )
}

/**
 * @param {Array.<unknown>} values
 * @param {boolean} includeImageAlt
 * @returns {string}
 */
function all(values, includeImageAlt) {
  /** @type {Array.<string>} */
  var result = []
  var index = -1

  while (++index < values.length) {
    result[index] = one(values[index], includeImageAlt)
  }

  return result.join('')
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/attention.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/attention.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attention": () => (/* binding */ attention)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-chunked */ "./node_modules/micromark-util-chunked/dev/index.js");
/* harmony import */ var micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-classify-character */ "./node_modules/micromark-util-classify-character/dev/index.js");
/* harmony import */ var micromark_util_resolve_all__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-resolve-all */ "./node_modules/micromark-util-resolve-all/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Code} Code
 * @typedef {import('micromark-util-types').Point} Point
 */









/** @type {Construct} */
const attention = {
  name: 'attention',
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
}

/**
 * Take all events and resolve attention to emphasis or strong.
 *
 * @type {Resolver}
 */
function resolveAllAttention(events, context) {
  let index = -1
  /** @type {number} */
  let open
  /** @type {Token} */
  let group
  /** @type {Token} */
  let text
  /** @type {Token} */
  let openingSequence
  /** @type {Token} */
  let closingSequence
  /** @type {number} */
  let use
  /** @type {Event[]} */
  let nextEvents
  /** @type {number} */
  let offset

  // Walk through all events.
  //
  // Note: performance of this is fine on an mb of normal markdown, but it’s
  // a bottleneck for malicious stuff.
  while (++index < events.length) {
    // Find a token that can close.
    if (
      events[index][0] === 'enter' &&
      events[index][1].type === 'attentionSequence' &&
      events[index][1]._close
    ) {
      open = index

      // Now walk back to find an opener.
      while (open--) {
        // Find a token that can open the closer.
        if (
          events[open][0] === 'exit' &&
          events[open][1].type === 'attentionSequence' &&
          events[open][1]._open &&
          // If the markers are the same:
          context.sliceSerialize(events[open][1]).charCodeAt(0) ===
            context.sliceSerialize(events[index][1]).charCodeAt(0)
        ) {
          // If the opening can close or the closing can open,
          // and the close size *is not* a multiple of three,
          // but the sum of the opening and closing size *is* multiple of three,
          // then don’t match.
          if (
            (events[open][1]._close || events[index][1]._open) &&
            (events[index][1].end.offset - events[index][1].start.offset) % 3 &&
            !(
              (events[open][1].end.offset -
                events[open][1].start.offset +
                events[index][1].end.offset -
                events[index][1].start.offset) %
              3
            )
          ) {
            continue
          }

          // Number of markers to use from the sequence.
          use =
            events[open][1].end.offset - events[open][1].start.offset > 1 &&
            events[index][1].end.offset - events[index][1].start.offset > 1
              ? 2
              : 1

          const start = Object.assign({}, events[open][1].end)
          const end = Object.assign({}, events[index][1].start)
          movePoint(start, -use)
          movePoint(end, use)

          openingSequence = {
            type: use > 1 ? micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.strongSequence : micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.emphasisSequence,
            start,
            end: Object.assign({}, events[open][1].end)
          }
          closingSequence = {
            type: use > 1 ? micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.strongSequence : micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.emphasisSequence,
            start: Object.assign({}, events[index][1].start),
            end
          }
          text = {
            type: use > 1 ? micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.strongText : micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.emphasisText,
            start: Object.assign({}, events[open][1].end),
            end: Object.assign({}, events[index][1].start)
          }
          group = {
            type: use > 1 ? micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.strong : micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.emphasis,
            start: Object.assign({}, openingSequence.start),
            end: Object.assign({}, closingSequence.end)
          }

          events[open][1].end = Object.assign({}, openingSequence.start)
          events[index][1].start = Object.assign({}, closingSequence.end)

          nextEvents = []

          // If there are more markers in the opening, add them before.
          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(nextEvents, [
              ['enter', events[open][1], context],
              ['exit', events[open][1], context]
            ])
          }

          // Opening.
          nextEvents = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(nextEvents, [
            ['enter', group, context],
            ['enter', openingSequence, context],
            ['exit', openingSequence, context],
            ['enter', text, context]
          ])

          // Between.
          nextEvents = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(
            nextEvents,
            (0,micromark_util_resolve_all__WEBPACK_IMPORTED_MODULE_3__.resolveAll)(
              context.parser.constructs.insideSpan.null,
              events.slice(open + 1, index),
              context
            )
          )

          // Closing.
          nextEvents = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(nextEvents, [
            ['exit', text, context],
            ['enter', closingSequence, context],
            ['exit', closingSequence, context],
            ['exit', group, context]
          ])

          // If there are more markers in the closing, add them after.
          if (events[index][1].end.offset - events[index][1].start.offset) {
            offset = 2
            nextEvents = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(nextEvents, [
              ['enter', events[index][1], context],
              ['exit', events[index][1], context]
            ])
          } else {
            offset = 0
          }

          (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.splice)(events, open - 1, index - open + 3, nextEvents)

          index = open + nextEvents.length - offset - 2
          break
        }
      }
    }
  }

  // Remove remaining sequences.
  index = -1

  while (++index < events.length) {
    if (events[index][1].type === 'attentionSequence') {
      events[index][1].type = 'data'
    }
  }

  return events
}

/** @type {Tokenizer} */
function tokenizeAttention(effects, ok) {
  const attentionMarkers = this.parser.constructs.attentionMarkers.null
  const previous = this.previous
  const before = (0,micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_4__.classifyCharacter)(previous)

  /** @type {NonNullable<Code>} */
  let marker

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__.codes.asterisk || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__.codes.underscore,
      'expected asterisk or underscore'
    )
    effects.enter('attentionSequence')
    marker = code
    return sequence(code)
  }

  /** @type {State} */
  function sequence(code) {
    if (code === marker) {
      effects.consume(code)
      return sequence
    }

    const token = effects.exit('attentionSequence')
    const after = (0,micromark_util_classify_character__WEBPACK_IMPORTED_MODULE_4__.classifyCharacter)(code)

    const open =
      !after ||
      (after === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_6__.constants.characterGroupPunctuation && before) ||
      attentionMarkers.includes(code)
    const close =
      !before ||
      (before === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_6__.constants.characterGroupPunctuation && after) ||
      attentionMarkers.includes(previous)

    token._open = Boolean(
      marker === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__.codes.asterisk ? open : open && (before || !close)
    )
    token._close = Boolean(
      marker === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__.codes.asterisk ? close : close && (after || !open)
    )
    return ok(code)
  }
}

/**
 * Move a point a bit.
 *
 * Note: `move` only works inside lines! It’s not possible to move past other
 * chunks (replacement characters, tabs, or line endings).
 *
 * @param {Point} point
 * @param {number} offset
 * @returns {void}
 */
function movePoint(point, offset) {
  point.column += offset
  point.offset += offset
  point._bufferIndex += offset
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/autolink.js":
/*!********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/autolink.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autolink": () => (/* binding */ autolink)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 */







/** @type {Construct} */
const autolink = {name: 'autolink', tokenize: tokenizeAutolink}

/** @type {Tokenizer} */
function tokenizeAutolink(effects, ok, nok) {
  let size = 1

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.lessThan, 'expected `<`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolink)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolinkMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolinkMarker)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolinkProtocol)
    return open
  }

  /** @type {State} */
  function open(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlpha)(code)) {
      effects.consume(code)
      return schemeOrEmailAtext
    }

    return (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAtext)(code) ? emailAtext(code) : nok(code)
  }

  /** @type {State} */
  function schemeOrEmailAtext(code) {
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.plusSign ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dot ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlphanumeric)(code)
      ? schemeInsideOrEmailAtext(code)
      : emailAtext(code)
  }

  /** @type {State} */
  function schemeInsideOrEmailAtext(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.colon) {
      effects.consume(code)
      return urlInside
    }

    if (
      (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.plusSign ||
        code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash ||
        code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dot ||
        (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlphanumeric)(code)) &&
      size++ < micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_4__.constants.autolinkSchemeSizeMax
    ) {
      effects.consume(code)
      return schemeInsideOrEmailAtext
    }

    return emailAtext(code)
  }

  /** @type {State} */
  function urlInside(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolinkProtocol)
      return end(code)
    }

    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.space ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.lessThan ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiControl)(code)
    ) {
      return nok(code)
    }

    effects.consume(code)
    return urlInside
  }

  /** @type {State} */
  function emailAtext(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.atSign) {
      effects.consume(code)
      size = 0
      return emailAtSignOrDot
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAtext)(code)) {
      effects.consume(code)
      return emailAtext
    }

    return nok(code)
  }

  /** @type {State} */
  function emailAtSignOrDot(code) {
    return (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlphanumeric)(code) ? emailLabel(code) : nok(code)
  }

  /** @type {State} */
  function emailLabel(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dot) {
      effects.consume(code)
      size = 0
      return emailAtSignOrDot
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan) {
      // Exit, then change the type.
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolinkProtocol).type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolinkEmail
      return end(code)
    }

    return emailValue(code)
  }

  /** @type {State} */
  function emailValue(code) {
    if (
      (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlphanumeric)(code)) &&
      size++ < micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_4__.constants.autolinkDomainSizeMax
    ) {
      effects.consume(code)
      return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash ? emailValue : emailLabel
    }

    return nok(code)
  }

  /** @type {State} */
  function end(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan, 'expected `>`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolinkMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolinkMarker)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.autolink)
    return ok
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/blank-line.js":
/*!**********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/blank-line.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blankLine": () => (/* binding */ blankLine)
/* harmony export */ });
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 */






/** @type {Construct} */
const blankLine = {tokenize: tokenizeBlankLine, partial: true}

/** @type {Tokenizer} */
function tokenizeBlankLine(effects, ok, nok) {
  return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_0__.factorySpace)(effects, afterWhitespace, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix)

  /** @type {State} */
  function afterWhitespace(code) {
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code) ? ok(code) : nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/block-quote.js":
/*!***********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/block-quote.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blockQuote": () => (/* binding */ blockQuote)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Exiter} Exiter
 * @typedef {import('micromark-util-types').State} State
 */








/** @type {Construct} */
const blockQuote = {
  name: 'blockQuote',
  tokenize: tokenizeBlockQuoteStart,
  continuation: {tokenize: tokenizeBlockQuoteContinuation},
  exit
}

/** @type {Tokenizer} */
function tokenizeBlockQuoteStart(effects, ok, nok) {
  const self = this

  return start

  /** @type {State} */
  function start(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan) {
      const state = self.containerState

      ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(state, 'expected `containerState` to be defined in container')

      if (!state.open) {
        effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.blockQuote, {_container: true})
        state.open = true
      }

      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.blockQuotePrefix)
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.blockQuoteMarker)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.blockQuoteMarker)
      return after
    }

    return nok(code)
  }

  /** @type {State} */
  function after(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.blockQuotePrefixWhitespace)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.blockQuotePrefixWhitespace)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.blockQuotePrefix)
      return ok
    }

    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.blockQuotePrefix)
    return ok(code)
  }
}

/** @type {Tokenizer} */
function tokenizeBlockQuoteContinuation(effects, ok, nok) {
  return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__.factorySpace)(
    effects,
    effects.attempt(blockQuote, ok, nok),
    micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.linePrefix,
    this.parser.constructs.disable.null.includes('codeIndented')
      ? undefined
      : micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.tabSize
  )
}

/** @type {Exiter} */
function exit(effects) {
  effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.blockQuote)
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/character-escape.js":
/*!****************************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/character-escape.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "characterEscape": () => (/* binding */ characterEscape)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 */






/** @type {Construct} */
const characterEscape = {
  name: 'characterEscape',
  tokenize: tokenizeCharacterEscape
}

/** @type {Tokenizer} */
function tokenizeCharacterEscape(effects, ok, nok) {
  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.backslash, 'expected `\\`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterEscape)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.escapeMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.escapeMarker)
    return open
  }

  /** @type {State} */
  function open(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiPunctuation)(code)) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterEscapeValue)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterEscapeValue)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterEscape)
      return ok
    }

    return nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/character-reference.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/character-reference.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "characterReference": () => (/* binding */ characterReference)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var decode_named_character_reference__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! decode-named-character-reference */ "./node_modules/decode-named-character-reference/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */








/** @type {Construct} */
const characterReference = {
  name: 'characterReference',
  tokenize: tokenizeCharacterReference
}

/** @type {Tokenizer} */
function tokenizeCharacterReference(effects, ok, nok) {
  const self = this
  let size = 0
  /** @type {number} */
  let max
  /** @type {(code: Code) => code is number} */
  let test

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.ampersand, 'expected `&`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReference)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceMarker)
    return open
  }

  /** @type {State} */
  function open(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.numberSign) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceMarkerNumeric)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceMarkerNumeric)
      return numeric
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceValue)
    max = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.characterReferenceNamedSizeMax
    test = micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiAlphanumeric
    return value(code)
  }

  /** @type {State} */
  function numeric(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.uppercaseX || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.lowercaseX) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceMarkerHexadecimal)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceMarkerHexadecimal)
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceValue)
      max = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.characterReferenceHexadecimalSizeMax
      test = micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiHexDigit
      return value
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceValue)
    max = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.characterReferenceDecimalSizeMax
    test = micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiDigit
    return value(code)
  }

  /** @type {State} */
  function value(code) {
    /** @type {Token} */
    let token

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.semicolon && size) {
      token = effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceValue)

      if (
        test === micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiAlphanumeric &&
        !(0,decode_named_character_reference__WEBPACK_IMPORTED_MODULE_5__.decodeNamedCharacterReference)(self.sliceSerialize(token))
      ) {
        return nok(code)
      }

      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceMarker)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReferenceMarker)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.characterReference)
      return ok
    }

    if (test(code) && size++ < max) {
      effects.consume(code)
      return value
    }

    return nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/code-fenced.js":
/*!***********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/code-fenced.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "codeFenced": () => (/* binding */ codeFenced)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */








/** @type {Construct} */
const codeFenced = {
  name: 'codeFenced',
  tokenize: tokenizeCodeFenced,
  concrete: true
}

/** @type {Tokenizer} */
function tokenizeCodeFenced(effects, ok, nok) {
  const self = this
  /** @type {Construct} */
  const closingFenceConstruct = {tokenize: tokenizeClosingFence, partial: true}
  /** @type {Construct} */
  const nonLazyLine = {tokenize: tokenizeNonLazyLine, partial: true}
  const tail = this.events[this.events.length - 1]
  const initialPrefix =
    tail && tail[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix
      ? tail[2].sliceSerialize(tail[1], true).length
      : 0
  let sizeOpen = 0
  /** @type {NonNullable<Code>} */
  let marker

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.tilde,
      'expected `` ` `` or `~`'
    )
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFenced)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFence)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFenceSequence)
    marker = code
    return sequenceOpen(code)
  }

  /** @type {State} */
  function sequenceOpen(code) {
    if (code === marker) {
      effects.consume(code)
      sizeOpen++
      return sequenceOpen
    }

    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFenceSequence)
    return sizeOpen < micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.codeFencedSequenceSizeMin
      ? nok(code)
      : (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__.factorySpace)(effects, infoOpen, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.whitespace)(code)
  }

  /** @type {State} */
  function infoOpen(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code)) {
      return openAfter(code)
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFenceInfo)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkString, {contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.contentTypeString})
    return info(code)
  }

  /** @type {State} */
  function info(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEndingOrSpace)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkString)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFenceInfo)
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__.factorySpace)(effects, infoAfter, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.whitespace)(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent && code === marker) return nok(code)
    effects.consume(code)
    return info
  }

  /** @type {State} */
  function infoAfter(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code)) {
      return openAfter(code)
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFenceMeta)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkString, {contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.contentTypeString})
    return meta(code)
  }

  /** @type {State} */
  function meta(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkString)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFenceMeta)
      return openAfter(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent && code === marker) return nok(code)
    effects.consume(code)
    return meta
  }

  /** @type {State} */
  function openAfter(code) {
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFence)
    return self.interrupt ? ok(code) : contentStart(code)
  }

  /** @type {State} */
  function contentStart(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof) {
      return after(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code)) {
      return effects.attempt(
        nonLazyLine,
        effects.attempt(
          closingFenceConstruct,
          after,
          initialPrefix
            ? (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__.factorySpace)(
                effects,
                contentStart,
                micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix,
                initialPrefix + 1
              )
            : contentStart
        ),
        after
      )(code)
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFlowValue)
    return contentContinue(code)
  }

  /** @type {State} */
  function contentContinue(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFlowValue)
      return contentStart(code)
    }

    effects.consume(code)
    return contentContinue
  }

  /** @type {State} */
  function after(code) {
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFenced)
    return ok(code)
  }

  /** @type {Tokenizer} */
  function tokenizeNonLazyLine(effects, ok, nok) {
    const self = this

    return start

    /** @type {State} */
    function start(code) {
      ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code), 'expected eol')
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)
      return lineStart
    }

    /** @type {State} */
    function lineStart(code) {
      return self.parser.lazy[self.now().line] ? nok(code) : ok(code)
    }
  }

  /** @type {Tokenizer} */
  function tokenizeClosingFence(effects, ok, nok) {
    let size = 0

    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__.factorySpace)(
      effects,
      closingSequenceStart,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix,
      this.parser.constructs.disable.null.includes('codeIndented')
        ? undefined
        : micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.tabSize
    )

    /** @type {State} */
    function closingSequenceStart(code) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFence)
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFenceSequence)
      return closingSequence(code)
    }

    /** @type {State} */
    function closingSequence(code) {
      if (code === marker) {
        effects.consume(code)
        size++
        return closingSequence
      }

      if (size < sizeOpen) return nok(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFenceSequence)
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__.factorySpace)(effects, closingSequenceEnd, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.whitespace)(code)
    }

    /** @type {State} */
    function closingSequenceEnd(code) {
      if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code)) {
        effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeFencedFence)
        return ok(code)
      }

      return nok(code)
    }
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/code-indented.js":
/*!*************************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/code-indented.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "codeIndented": () => (/* binding */ codeIndented)
/* harmony export */ });
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').State} State
 */







/** @type {Construct} */
const codeIndented = {
  name: 'codeIndented',
  tokenize: tokenizeCodeIndented
}

/** @type {Construct} */
const indentedContent = {tokenize: tokenizeIndentedContent, partial: true}

/** @type {Tokenizer} */
function tokenizeCodeIndented(effects, ok, nok) {
  const self = this
  return start

  /** @type {State} */
  function start(code) {
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.codeIndented)
    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__.factorySpace)(
      effects,
      afterStartPrefix,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.linePrefix,
      micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.tabSize + 1
    )(code)
  }

  /** @type {State} */
  function afterStartPrefix(code) {
    const tail = self.events[self.events.length - 1]
    return tail &&
      tail[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.linePrefix &&
      tail[2].sliceSerialize(tail[1], true).length >= micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.tabSize
      ? afterPrefix(code)
      : nok(code)
  }

  /** @type {State} */
  function afterPrefix(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__.codes.eof) {
      return after(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)) {
      return effects.attempt(indentedContent, afterPrefix, after)(code)
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.codeFlowValue)
    return content(code)
  }

  /** @type {State} */
  function content(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.codeFlowValue)
      return afterPrefix(code)
    }

    effects.consume(code)
    return content
  }

  /** @type {State} */
  function after(code) {
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.codeIndented)
    return ok(code)
  }
}

/** @type {Tokenizer} */
function tokenizeIndentedContent(effects, ok, nok) {
  const self = this

  return start

  /** @type {State} */
  function start(code) {
    // If this is a lazy line, it can’t be code.
    if (self.parser.lazy[self.now().line]) {
      return nok(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.lineEnding)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.lineEnding)
      return start
    }

    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_1__.factorySpace)(
      effects,
      afterPrefix,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.linePrefix,
      micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.tabSize + 1
    )(code)
  }

  /** @type {State} */
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1]
    return tail &&
      tail[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_0__.types.linePrefix &&
      tail[2].sliceSerialize(tail[1], true).length >= micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.tabSize
      ? ok(code)
      : (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)
      ? start(code)
      : nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/code-text.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/code-text.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "codeText": () => (/* binding */ codeText)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Previous} Previous
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').State} State
 */






/** @type {Construct} */
const codeText = {
  name: 'codeText',
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous
}

/** @type {Resolver} */
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4
  let headEnterIndex = 3
  /** @type {number} */
  let index
  /** @type {number|undefined} */
  let enter

  // If we start and end with an EOL or a space.
  if (
    (events[headEnterIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding ||
      events[headEnterIndex][1].type === 'space') &&
    (events[tailExitIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding ||
      events[tailExitIndex][1].type === 'space')
  ) {
    index = headEnterIndex

    // And we have data.
    while (++index < tailExitIndex) {
      if (events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextData) {
        // Then we have padding.
        events[headEnterIndex][1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextPadding
        events[tailExitIndex][1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextPadding
        headEnterIndex += 2
        tailExitIndex -= 2
        break
      }
    }
  }

  // Merge adjacent spaces and data.
  index = headEnterIndex - 1
  tailExitIndex++

  while (++index <= tailExitIndex) {
    if (enter === undefined) {
      if (
        index !== tailExitIndex &&
        events[index][1].type !== micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding
      ) {
        enter = index
      }
    } else if (
      index === tailExitIndex ||
      events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding
    ) {
      events[enter][1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextData

      if (index !== enter + 2) {
        events[enter][1].end = events[index - 1][1].end
        events.splice(enter + 2, index - enter - 2)
        tailExitIndex -= index - enter - 2
        index = enter + 2
      }

      enter = undefined
    }
  }

  return events
}

/** @type {Previous} */
function previous(code) {
  // If there is a previous code, there will always be a tail.
  return (
    code !== micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent ||
    this.events[this.events.length - 1][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.characterEscape
  )
}

/** @type {Tokenizer} */
function tokenizeCodeText(effects, ok, nok) {
  const self = this
  let sizeOpen = 0
  /** @type {number} */
  let size
  /** @type {Token} */
  let token

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent, 'expected `` ` ``')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(previous.call(self, self.previous), 'expected correct previous')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeText)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextSequence)
    return openingSequence(code)
  }

  /** @type {State} */
  function openingSequence(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent) {
      effects.consume(code)
      sizeOpen++
      return openingSequence
    }

    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextSequence)
    return gap(code)
  }

  /** @type {State} */
  function gap(code) {
    // EOF.
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof) {
      return nok(code)
    }

    // Closing fence?
    // Could also be data.
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent) {
      token = effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextSequence)
      size = 0
      return closingSequence(code)
    }

    // Tabs don’t work, and virtual spaces don’t make sense.
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.space) {
      effects.enter('space')
      effects.consume(code)
      effects.exit('space')
      return gap
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)
      return gap
    }

    // Data.
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextData)
    return data(code)
  }

  // In code.
  /** @type {State} */
  function data(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.space ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)
    ) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextData)
      return gap(code)
    }

    effects.consume(code)
    return data
  }

  // Closing fence.
  /** @type {State} */
  function closingSequence(code) {
    // More.
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent) {
      effects.consume(code)
      size++
      return closingSequence
    }

    // Done!
    if (size === sizeOpen) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextSequence)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeText)
      return ok(code)
    }

    // More or less accents: mark as data.
    token.type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.codeTextData
    return data(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/content.js":
/*!*******************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/content.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "content": () => (/* binding */ content)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_subtokenize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-subtokenize */ "./node_modules/micromark-util-subtokenize/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').State} State
 */









/**
 * No name because it must not be turned off.
 * @type {Construct}
 */
const content = {tokenize: tokenizeContent, resolve: resolveContent}

/** @type {Construct} */
const continuationConstruct = {tokenize: tokenizeContinuation, partial: true}

/**
 * Content is transparent: it’s parsed right now. That way, definitions are also
 * parsed right now: before text in paragraphs (specifically, media) are parsed.
 *
 * @type {Resolver}
 */
function resolveContent(events) {
  ;(0,micromark_util_subtokenize__WEBPACK_IMPORTED_MODULE_1__.subtokenize)(events)
  return events
}

/** @type {Tokenizer} */
function tokenizeContent(effects, ok) {
  /** @type {Token} */
  let previous

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code !== micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof && !(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code),
      'expected no eof or eol'
    )

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.content)
    previous = effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.chunkContent, {
      contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.contentTypeContent
    })
    return data(code)
  }

  /** @type {State} */
  function data(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof) {
      return contentEnd(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      return effects.check(
        continuationConstruct,
        contentContinue,
        contentEnd
      )(code)
    }

    // Data.
    effects.consume(code)
    return data
  }

  /** @type {State} */
  function contentEnd(code) {
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.chunkContent)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.content)
    return ok(code)
  }

  /** @type {State} */
  function contentContinue(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code), 'expected eol')
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.chunkContent)
    previous.next = effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.chunkContent, {
      contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.contentTypeContent,
      previous
    })
    previous = previous.next
    return data
  }
}

/** @type {Tokenizer} */
function tokenizeContinuation(effects, ok, nok) {
  const self = this

  return startLookahead

  /** @type {State} */
  function startLookahead(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code), 'expected a line ending')
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.chunkContent)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)
    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_6__.factorySpace)(effects, prefixed, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.linePrefix)
  }

  /** @type {State} */
  function prefixed(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      return nok(code)
    }

    const tail = self.events[self.events.length - 1]

    if (
      !self.parser.constructs.disable.null.includes('codeIndented') &&
      tail &&
      tail[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.linePrefix &&
      tail[2].sliceSerialize(tail[1], true).length >= micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.tabSize
    ) {
      return ok(code)
    }

    return effects.interrupt(self.parser.constructs.flow, nok, ok)(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/definition.js":
/*!**********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/definition.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "definition": () => (/* binding */ definition)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_destination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! micromark-factory-destination */ "./node_modules/micromark-factory-destination/dev/index.js");
/* harmony import */ var micromark_factory_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-factory-label */ "./node_modules/micromark-factory-label/dev/index.js");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_factory_title__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! micromark-factory-title */ "./node_modules/micromark-factory-title/dev/index.js");
/* harmony import */ var micromark_factory_whitespace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-factory-whitespace */ "./node_modules/micromark-factory-whitespace/dev/index.js");
/* harmony import */ var micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-normalize-identifier */ "./node_modules/micromark-util-normalize-identifier/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 */












/** @type {Construct} */
const definition = {name: 'definition', tokenize: tokenizeDefinition}

/** @type {Construct} */
const titleConstruct = {tokenize: tokenizeTitle, partial: true}

/** @type {Tokenizer} */
function tokenizeDefinition(effects, ok, nok) {
  const self = this
  /** @type {string} */
  let identifier

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket, 'expected `[`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definition)
    return micromark_factory_label__WEBPACK_IMPORTED_MODULE_3__.factoryLabel.call(
      self,
      effects,
      labelAfter,
      nok,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionLabel,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionLabelMarker,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionLabelString
    )(code)
  }

  /** @type {State} */
  function labelAfter(code) {
    identifier = (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_4__.normalizeIdentifier)(
      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
    )

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.colon) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionMarker)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionMarker)

      // Note: blank lines can’t exist in content.
      return (0,micromark_factory_whitespace__WEBPACK_IMPORTED_MODULE_5__.factoryWhitespace)(
        effects,
        (0,micromark_factory_destination__WEBPACK_IMPORTED_MODULE_6__.factoryDestination)(
          effects,
          effects.attempt(
            titleConstruct,
            (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_7__.factorySpace)(effects, after, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.whitespace),
            (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_7__.factorySpace)(effects, after, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.whitespace)
          ),
          nok,
          micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionDestination,
          micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionDestinationLiteral,
          micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionDestinationLiteralMarker,
          micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionDestinationRaw,
          micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionDestinationString
        )
      )
    }

    return nok(code)
  }

  /** @type {State} */
  function after(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_8__.markdownLineEnding)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definition)

      if (!self.parser.defined.includes(identifier)) {
        self.parser.defined.push(identifier)
      }

      return ok(code)
    }

    return nok(code)
  }
}

/** @type {Tokenizer} */
function tokenizeTitle(effects, ok, nok) {
  return start

  /** @type {State} */
  function start(code) {
    return (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_8__.markdownLineEndingOrSpace)(code)
      ? (0,micromark_factory_whitespace__WEBPACK_IMPORTED_MODULE_5__.factoryWhitespace)(effects, before)(code)
      : nok(code)
  }

  /** @type {State} */
  function before(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.quotationMark ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.apostrophe ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftParenthesis
    ) {
      return (0,micromark_factory_title__WEBPACK_IMPORTED_MODULE_9__.factoryTitle)(
        effects,
        (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_7__.factorySpace)(effects, after, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.whitespace),
        nok,
        micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionTitle,
        micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionTitleMarker,
        micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.definitionTitleString
      )(code)
    }

    return nok(code)
  }

  /** @type {State} */
  function after(code) {
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_8__.markdownLineEnding)(code) ? ok(code) : nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/hard-break-escape.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/hard-break-escape.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hardBreakEscape": () => (/* binding */ hardBreakEscape)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 */






/** @type {Construct} */
const hardBreakEscape = {
  name: 'hardBreakEscape',
  tokenize: tokenizeHardBreakEscape
}

/** @type {Tokenizer} */
function tokenizeHardBreakEscape(effects, ok, nok) {
  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.backslash, 'expected `\\`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.hardBreakEscape)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.escapeMarker)
    effects.consume(code)
    return open
  }

  /** @type {State} */
  function open(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.escapeMarker)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.hardBreakEscape)
      return ok(code)
    }

    return nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/heading-atx.js":
/*!***********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/heading-atx.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "headingAtx": () => (/* binding */ headingAtx)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-chunked */ "./node_modules/micromark-util-chunked/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').State} State
 */









/** @type {Construct} */
const headingAtx = {
  name: 'headingAtx',
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
}

/** @type {Resolver} */
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2
  let contentStart = 3
  /** @type {Token} */
  let content
  /** @type {Token} */
  let text

  // Prefix whitespace, part of the opening.
  if (events[contentStart][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.whitespace) {
    contentStart += 2
  }

  // Suffix whitespace, part of the closing.
  if (
    contentEnd - 2 > contentStart &&
    events[contentEnd][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.whitespace
  ) {
    contentEnd -= 2
  }

  if (
    events[contentEnd][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeadingSequence &&
    (contentStart === contentEnd - 1 ||
      (contentEnd - 4 > contentStart &&
        events[contentEnd - 2][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.whitespace))
  ) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4
  }

  if (contentEnd > contentStart) {
    content = {
      type: micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeadingText,
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    }
    text = {
      type: micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkText,
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      // @ts-expect-error Constants are fine to assign.
      contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.contentTypeText
    }

    ;(0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_3__.splice)(events, contentStart, contentEnd - contentStart + 1, [
      ['enter', content, context],
      ['enter', text, context],
      ['exit', text, context],
      ['exit', content, context]
    ])
  }

  return events
}

/** @type {Tokenizer} */
function tokenizeHeadingAtx(effects, ok, nok) {
  const self = this
  let size = 0

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.numberSign, 'expected `#`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeading)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeadingSequence)
    return fenceOpenInside(code)
  }

  /** @type {State} */
  function fenceOpenInside(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.numberSign &&
      size++ < micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.atxHeadingOpeningFenceSizeMax
    ) {
      effects.consume(code)
      return fenceOpenInside
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEndingOrSpace)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeadingSequence)
      return self.interrupt ? ok(code) : headingBreak(code)
    }

    return nok(code)
  }

  /** @type {State} */
  function headingBreak(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.numberSign) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeadingSequence)
      return sequence(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeading)
      return ok(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownSpace)(code)) {
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_6__.factorySpace)(effects, headingBreak, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.whitespace)(code)
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeadingText)
    return data(code)
  }

  /** @type {State} */
  function sequence(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.numberSign) {
      effects.consume(code)
      return sequence
    }

    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeadingSequence)
    return headingBreak(code)
  }

  /** @type {State} */
  function data(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.numberSign ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEndingOrSpace)(code)
    ) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.atxHeadingText)
      return headingBreak(code)
    }

    effects.consume(code)
    return data
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/html-flow.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/html-flow.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlFlow": () => (/* binding */ htmlFlow)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_html_tag_name__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-html-tag-name */ "./node_modules/micromark-util-html-tag-name/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/* harmony import */ var _blank_line_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blank-line.js */ "./node_modules/micromark-core-commonmark/dev/lib/blank-line.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */









/** @type {Construct} */
const htmlFlow = {
  name: 'htmlFlow',
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
}

/** @type {Construct} */
const nextBlankConstruct = {tokenize: tokenizeNextBlank, partial: true}

/** @type {Resolver} */
function resolveToHtmlFlow(events) {
  let index = events.length

  while (index--) {
    if (
      events[index][0] === 'enter' &&
      events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.htmlFlow
    ) {
      break
    }
  }

  if (index > 1 && events[index - 2][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix) {
    // Add the prefix start to the HTML token.
    events[index][1].start = events[index - 2][1].start
    // Add the prefix start to the HTML line token.
    events[index + 1][1].start = events[index - 2][1].start
    // Remove the line prefix.
    events.splice(index - 2, 2)
  }

  return events
}

/** @type {Tokenizer} */
function tokenizeHtmlFlow(effects, ok, nok) {
  const self = this
  /** @type {number} */
  let kind
  /** @type {boolean} */
  let startTag
  /** @type {string} */
  let buffer
  /** @type {number} */
  let index
  /** @type {Code} */
  let marker

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.lessThan, 'expected `<`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.htmlFlow)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.htmlFlowData)
    effects.consume(code)
    return open
  }

  /** @type {State} */
  function open(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.exclamationMark) {
      effects.consume(code)
      return declarationStart
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.slash) {
      effects.consume(code)
      return tagCloseStart
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.questionMark) {
      effects.consume(code)
      kind = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlInstruction
      // While we’re in an instruction instead of a declaration, we’re on a `?`
      // right now, so we do need to search for `>`, similar to declarations.
      return self.interrupt ? ok : continuationDeclarationInside
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiAlpha)(code)) {
      effects.consume(code)
      buffer = String.fromCharCode(code)
      startTag = true
      return tagName
    }

    return nok(code)
  }

  /** @type {State} */
  function declarationStart(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash) {
      effects.consume(code)
      kind = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlComment
      return commentOpenInside
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.leftSquareBracket) {
      effects.consume(code)
      kind = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlCdata
      buffer = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.cdataOpeningString
      index = 0
      return cdataOpenInside
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiAlpha)(code)) {
      effects.consume(code)
      kind = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlDeclaration
      return self.interrupt ? ok : continuationDeclarationInside
    }

    return nok(code)
  }

  /** @type {State} */
  function commentOpenInside(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash) {
      effects.consume(code)
      return self.interrupt ? ok : continuationDeclarationInside
    }

    return nok(code)
  }

  /** @type {State} */
  function cdataOpenInside(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code)
      return index === buffer.length
        ? self.interrupt
          ? ok
          : continuation
        : cdataOpenInside
    }

    return nok(code)
  }

  /** @type {State} */
  function tagCloseStart(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiAlpha)(code)) {
      effects.consume(code)
      buffer = String.fromCharCode(code)
      return tagName
    }

    return nok(code)
  }

  /** @type {State} */
  function tagName(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.slash ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.greaterThan ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEndingOrSpace)(code)
    ) {
      if (
        code !== micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.slash &&
        startTag &&
        micromark_util_html_tag_name__WEBPACK_IMPORTED_MODULE_5__.htmlRawNames.includes(buffer.toLowerCase())
      ) {
        kind = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlRaw
        return self.interrupt ? ok(code) : continuation(code)
      }

      if (micromark_util_html_tag_name__WEBPACK_IMPORTED_MODULE_5__.htmlBlockNames.includes(buffer.toLowerCase())) {
        kind = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlBasic

        if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.slash) {
          effects.consume(code)
          return basicSelfClosing
        }

        return self.interrupt ? ok(code) : continuation(code)
      }

      kind = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlComplete
      // Do not support complete HTML when interrupting
      return self.interrupt && !self.parser.lazy[self.now().line]
        ? nok(code)
        : startTag
        ? completeAttributeNameBefore(code)
        : completeClosingTagAfter(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiAlphanumeric)(code)) {
      effects.consume(code)
      buffer += String.fromCharCode(code)
      return tagName
    }

    return nok(code)
  }

  /** @type {State} */
  function basicSelfClosing(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.greaterThan) {
      effects.consume(code)
      return self.interrupt ? ok : continuation
    }

    return nok(code)
  }

  /** @type {State} */
  function completeClosingTagAfter(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownSpace)(code)) {
      effects.consume(code)
      return completeClosingTagAfter
    }

    return completeEnd(code)
  }

  /** @type {State} */
  function completeAttributeNameBefore(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.slash) {
      effects.consume(code)
      return completeEnd
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.colon || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.underscore || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiAlpha)(code)) {
      effects.consume(code)
      return completeAttributeName
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownSpace)(code)) {
      effects.consume(code)
      return completeAttributeNameBefore
    }

    return completeEnd(code)
  }

  /** @type {State} */
  function completeAttributeName(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dot ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.colon ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.underscore ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiAlphanumeric)(code)
    ) {
      effects.consume(code)
      return completeAttributeName
    }

    return completeAttributeNameAfter(code)
  }

  /** @type {State} */
  function completeAttributeNameAfter(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.equalsTo) {
      effects.consume(code)
      return completeAttributeValueBefore
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownSpace)(code)) {
      effects.consume(code)
      return completeAttributeNameAfter
    }

    return completeAttributeNameBefore(code)
  }

  /** @type {State} */
  function completeAttributeValueBefore(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.lessThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.equalsTo ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.greaterThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent
    ) {
      return nok(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.quotationMark || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.apostrophe) {
      effects.consume(code)
      marker = code
      return completeAttributeValueQuoted
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownSpace)(code)) {
      effects.consume(code)
      return completeAttributeValueBefore
    }

    marker = null
    return completeAttributeValueUnquoted(code)
  }

  /** @type {State} */
  function completeAttributeValueQuoted(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)) {
      return nok(code)
    }

    if (code === marker) {
      effects.consume(code)
      return completeAttributeValueQuotedAfter
    }

    effects.consume(code)
    return completeAttributeValueQuoted
  }

  /** @type {State} */
  function completeAttributeValueUnquoted(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.quotationMark ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.apostrophe ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.lessThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.equalsTo ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.greaterThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.graveAccent ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEndingOrSpace)(code)
    ) {
      return completeAttributeNameAfter(code)
    }

    effects.consume(code)
    return completeAttributeValueUnquoted
  }

  /** @type {State} */
  function completeAttributeValueQuotedAfter(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.slash ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.greaterThan ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownSpace)(code)
    ) {
      return completeAttributeNameBefore(code)
    }

    return nok(code)
  }

  /** @type {State} */
  function completeEnd(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.greaterThan) {
      effects.consume(code)
      return completeAfter
    }

    return nok(code)
  }

  /** @type {State} */
  function completeAfter(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownSpace)(code)) {
      effects.consume(code)
      return completeAfter
    }

    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)
      ? continuation(code)
      : nok(code)
  }

  /** @type {State} */
  function continuation(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash && kind === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlComment) {
      effects.consume(code)
      return continuationCommentInside
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.lessThan && kind === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlRaw) {
      effects.consume(code)
      return continuationRawTagOpen
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.greaterThan && kind === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlDeclaration) {
      effects.consume(code)
      return continuationClose
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.questionMark && kind === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlInstruction) {
      effects.consume(code)
      return continuationDeclarationInside
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.rightSquareBracket && kind === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlCdata) {
      effects.consume(code)
      return continuationCharacterDataInside
    }

    if (
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code) &&
      (kind === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlBasic || kind === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlComplete)
    ) {
      return effects.check(
        nextBlankConstruct,
        continuationClose,
        continuationAtLineEnding
      )(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)) {
      return continuationAtLineEnding(code)
    }

    effects.consume(code)
    return continuation
  }

  /** @type {State} */
  function continuationAtLineEnding(code) {
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.htmlFlowData)
    return htmlContinueStart(code)
  }

  /** @type {State} */
  function htmlContinueStart(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof) {
      return done(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)) {
      return effects.attempt(
        {tokenize: htmlLineEnd, partial: true},
        htmlContinueStart,
        done
      )(code)
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.htmlFlowData)
    return continuation(code)
  }

  /** @type {Tokenizer} */
  function htmlLineEnd(effects, ok, nok) {
    return start

    /** @type {State} */
    function start(code) {
      ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code), 'expected eol')
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)
      return lineStart
    }

    /** @type {State} */
    function lineStart(code) {
      return self.parser.lazy[self.now().line] ? nok(code) : ok(code)
    }
  }

  /** @type {State} */
  function continuationCommentInside(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash) {
      effects.consume(code)
      return continuationDeclarationInside
    }

    return continuation(code)
  }

  /** @type {State} */
  function continuationRawTagOpen(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.slash) {
      effects.consume(code)
      buffer = ''
      return continuationRawEndTag
    }

    return continuation(code)
  }

  /** @type {State} */
  function continuationRawEndTag(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.greaterThan &&
      micromark_util_html_tag_name__WEBPACK_IMPORTED_MODULE_5__.htmlRawNames.includes(buffer.toLowerCase())
    ) {
      effects.consume(code)
      return continuationClose
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.asciiAlpha)(code) && buffer.length < micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlRawSizeMax) {
      effects.consume(code)
      buffer += String.fromCharCode(code)
      return continuationRawEndTag
    }

    return continuation(code)
  }

  /** @type {State} */
  function continuationCharacterDataInside(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.rightSquareBracket) {
      effects.consume(code)
      return continuationDeclarationInside
    }

    return continuation(code)
  }

  /** @type {State} */
  function continuationDeclarationInside(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.greaterThan) {
      effects.consume(code)
      return continuationClose
    }

    // More dashes.
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash && kind === micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.htmlComment) {
      effects.consume(code)
      return continuationDeclarationInside
    }

    return continuation(code)
  }

  /** @type {State} */
  function continuationClose(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.htmlFlowData)
      return done(code)
    }

    effects.consume(code)
    return continuationClose
  }

  /** @type {State} */
  function done(code) {
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.htmlFlow)
    return ok(code)
  }
}

/** @type {Tokenizer} */
function tokenizeNextBlank(effects, ok, nok) {
  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code), 'expected a line ending')
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.htmlFlowData)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEndingBlank)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEndingBlank)
    return effects.attempt(_blank_line_js__WEBPACK_IMPORTED_MODULE_6__.blankLine, ok, nok)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/html-text.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/html-text.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlText": () => (/* binding */ htmlText)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */








/** @type {Construct} */
const htmlText = {name: 'htmlText', tokenize: tokenizeHtmlText}

/** @type {Tokenizer} */
function tokenizeHtmlText(effects, ok, nok) {
  const self = this
  /** @type {NonNullable<Code>|undefined} */
  let marker
  /** @type {string} */
  let buffer
  /** @type {number} */
  let index
  /** @type {State} */
  let returnState

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.lessThan, 'expected `<`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.htmlText)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.htmlTextData)
    effects.consume(code)
    return open
  }

  /** @type {State} */
  function open(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.exclamationMark) {
      effects.consume(code)
      return declarationOpen
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.slash) {
      effects.consume(code)
      return tagCloseStart
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.questionMark) {
      effects.consume(code)
      return instruction
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlpha)(code)) {
      effects.consume(code)
      return tagOpen
    }

    return nok(code)
  }

  /** @type {State} */
  function declarationOpen(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash) {
      effects.consume(code)
      return commentOpen
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket) {
      effects.consume(code)
      buffer = micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_4__.constants.cdataOpeningString
      index = 0
      return cdataOpen
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlpha)(code)) {
      effects.consume(code)
      return declaration
    }

    return nok(code)
  }

  /** @type {State} */
  function commentOpen(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash) {
      effects.consume(code)
      return commentStart
    }

    return nok(code)
  }

  /** @type {State} */
  function commentStart(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan) {
      return nok(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash) {
      effects.consume(code)
      return commentStartDash
    }

    return comment(code)
  }

  /** @type {State} */
  function commentStartDash(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan) {
      return nok(code)
    }

    return comment(code)
  }

  /** @type {State} */
  function comment(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof) {
      return nok(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash) {
      effects.consume(code)
      return commentClose
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      returnState = comment
      return atLineEnding(code)
    }

    effects.consume(code)
    return comment
  }

  /** @type {State} */
  function commentClose(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash) {
      effects.consume(code)
      return end
    }

    return comment(code)
  }

  /** @type {State} */
  function cdataOpen(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code)
      return index === buffer.length ? cdata : cdataOpen
    }

    return nok(code)
  }

  /** @type {State} */
  function cdata(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof) {
      return nok(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket) {
      effects.consume(code)
      return cdataClose
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      returnState = cdata
      return atLineEnding(code)
    }

    effects.consume(code)
    return cdata
  }

  /** @type {State} */
  function cdataClose(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket) {
      effects.consume(code)
      return cdataEnd
    }

    return cdata(code)
  }

  /** @type {State} */
  function cdataEnd(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan) {
      return end(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket) {
      effects.consume(code)
      return cdataEnd
    }

    return cdata(code)
  }

  /** @type {State} */
  function declaration(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan) {
      return end(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      returnState = declaration
      return atLineEnding(code)
    }

    effects.consume(code)
    return declaration
  }

  /** @type {State} */
  function instruction(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof) {
      return nok(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.questionMark) {
      effects.consume(code)
      return instructionClose
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      returnState = instruction
      return atLineEnding(code)
    }

    effects.consume(code)
    return instruction
  }

  /** @type {State} */
  function instructionClose(code) {
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan ? end(code) : instruction(code)
  }

  /** @type {State} */
  function tagCloseStart(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlpha)(code)) {
      effects.consume(code)
      return tagClose
    }

    return nok(code)
  }

  /** @type {State} */
  function tagClose(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlphanumeric)(code)) {
      effects.consume(code)
      return tagClose
    }

    return tagCloseBetween(code)
  }

  /** @type {State} */
  function tagCloseBetween(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      returnState = tagCloseBetween
      return atLineEnding(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)) {
      effects.consume(code)
      return tagCloseBetween
    }

    return end(code)
  }

  /** @type {State} */
  function tagOpen(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlphanumeric)(code)) {
      effects.consume(code)
      return tagOpen
    }

    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.slash ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEndingOrSpace)(code)
    ) {
      return tagOpenBetween(code)
    }

    return nok(code)
  }

  /** @type {State} */
  function tagOpenBetween(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.slash) {
      effects.consume(code)
      return end
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.colon || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.underscore || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlpha)(code)) {
      effects.consume(code)
      return tagOpenAttributeName
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      returnState = tagOpenBetween
      return atLineEnding(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)) {
      effects.consume(code)
      return tagOpenBetween
    }

    return end(code)
  }

  /** @type {State} */
  function tagOpenAttributeName(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dot ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.colon ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.underscore ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiAlphanumeric)(code)
    ) {
      effects.consume(code)
      return tagOpenAttributeName
    }

    return tagOpenAttributeNameAfter(code)
  }

  /** @type {State} */
  function tagOpenAttributeNameAfter(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.equalsTo) {
      effects.consume(code)
      return tagOpenAttributeValueBefore
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      returnState = tagOpenAttributeNameAfter
      return atLineEnding(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)) {
      effects.consume(code)
      return tagOpenAttributeNameAfter
    }

    return tagOpenBetween(code)
  }

  /** @type {State} */
  function tagOpenAttributeValueBefore(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.lessThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.equalsTo ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.graveAccent
    ) {
      return nok(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.quotationMark || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.apostrophe) {
      effects.consume(code)
      marker = code
      return tagOpenAttributeValueQuoted
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      returnState = tagOpenAttributeValueBefore
      return atLineEnding(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)) {
      effects.consume(code)
      return tagOpenAttributeValueBefore
    }

    effects.consume(code)
    marker = undefined
    return tagOpenAttributeValueUnquoted
  }

  /** @type {State} */
  function tagOpenAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code)
      return tagOpenAttributeValueQuotedAfter
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof) {
      return nok(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      returnState = tagOpenAttributeValueQuoted
      return atLineEnding(code)
    }

    effects.consume(code)
    return tagOpenAttributeValueQuoted
  }

  /** @type {State} */
  function tagOpenAttributeValueQuotedAfter(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.slash ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEndingOrSpace)(code)
    ) {
      return tagOpenBetween(code)
    }

    return nok(code)
  }

  /** @type {State} */
  function tagOpenAttributeValueUnquoted(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.quotationMark ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.apostrophe ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.lessThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.equalsTo ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.graveAccent
    ) {
      return nok(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEndingOrSpace)(code)) {
      return tagOpenBetween(code)
    }

    effects.consume(code)
    return tagOpenAttributeValueUnquoted
  }

  // We can’t have blank lines in content, so no need to worry about empty
  // tokens.
  /** @type {State} */
  function atLineEnding(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(returnState, 'expected return state')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code), 'expected eol')
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.htmlTextData)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.lineEnding)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.lineEnding)
    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_5__.factorySpace)(
      effects,
      afterPrefix,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.linePrefix,
      self.parser.constructs.disable.null.includes('codeIndented')
        ? undefined
        : micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_4__.constants.tabSize
    )
  }

  /** @type {State} */
  function afterPrefix(code) {
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.htmlTextData)
    return returnState(code)
  }

  /** @type {State} */
  function end(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.greaterThan) {
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.htmlTextData)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.htmlText)
      return ok
    }

    return nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/label-end.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/label-end.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "labelEnd": () => (/* binding */ labelEnd)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_destination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! micromark-factory-destination */ "./node_modules/micromark-factory-destination/dev/index.js");
/* harmony import */ var micromark_factory_label__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! micromark-factory-label */ "./node_modules/micromark-factory-label/dev/index.js");
/* harmony import */ var micromark_factory_title__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! micromark-factory-title */ "./node_modules/micromark-factory-title/dev/index.js");
/* harmony import */ var micromark_factory_whitespace__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! micromark-factory-whitespace */ "./node_modules/micromark-factory-whitespace/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-chunked */ "./node_modules/micromark-util-chunked/dev/index.js");
/* harmony import */ var micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-normalize-identifier */ "./node_modules/micromark-util-normalize-identifier/dev/index.js");
/* harmony import */ var micromark_util_resolve_all__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-resolve-all */ "./node_modules/micromark-util-resolve-all/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */














/** @type {Construct} */
const labelEnd = {
  name: 'labelEnd',
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
}

/** @type {Construct} */
const resourceConstruct = {tokenize: tokenizeResource}
/** @type {Construct} */
const fullReferenceConstruct = {tokenize: tokenizeFullReference}
/** @type {Construct} */
const collapsedReferenceConstruct = {tokenize: tokenizeCollapsedReference}

/** @type {Resolver} */
function resolveAllLabelEnd(events) {
  let index = -1
  /** @type {Token} */
  let token

  while (++index < events.length) {
    token = events[index][1]

    if (
      token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelImage ||
      token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelLink ||
      token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelEnd
    ) {
      // Remove the marker.
      events.splice(index + 1, token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelImage ? 4 : 2)
      token.type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.data
      index++
    }
  }

  return events
}

/** @type {Resolver} */
function resolveToLabelEnd(events, context) {
  let index = events.length
  let offset = 0
  /** @type {Token} */
  let token
  /** @type {number|undefined} */
  let open
  /** @type {number|undefined} */
  let close
  /** @type {Event[]} */
  let media

  // Find an opening.
  while (index--) {
    token = events[index][1]

    if (open) {
      // If we see another link, or inactive link label, we’ve been here before.
      if (
        token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.link ||
        (token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelLink && token._inactive)
      ) {
        break
      }

      // Mark other link openings as inactive, as we can’t have links in
      // links.
      if (events[index][0] === 'enter' && token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelLink) {
        token._inactive = true
      }
    } else if (close) {
      if (
        events[index][0] === 'enter' &&
        (token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelImage || token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelLink) &&
        !token._balanced
      ) {
        open = index

        if (token.type !== micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelLink) {
          offset = 2
          break
        }
      }
    } else if (token.type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelEnd) {
      close = index
    }
  }

  (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(open !== undefined, '`open` is supposed to be found')
  ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(close !== undefined, '`close` is supposed to be found')

  const group = {
    type: events[open][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelLink ? micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.link : micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.image,
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  }

  const label = {
    type: micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.label,
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[close][1].end)
  }

  const text = {
    type: micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelText,
    start: Object.assign({}, events[open + offset + 2][1].end),
    end: Object.assign({}, events[close - 2][1].start)
  }

  media = [
    ['enter', group, context],
    ['enter', label, context]
  ]

  // Opening marker.
  media = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(media, events.slice(open + 1, open + offset + 3))

  // Text open.
  media = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(media, [['enter', text, context]])

  // Between.
  media = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(
    media,
    (0,micromark_util_resolve_all__WEBPACK_IMPORTED_MODULE_3__.resolveAll)(
      context.parser.constructs.insideSpan.null,
      events.slice(open + offset + 4, close - 3),
      context
    )
  )

  // Text close, marker close, label close.
  media = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(media, [
    ['exit', text, context],
    events[close - 2],
    events[close - 1],
    ['exit', label, context]
  ])

  // Reference, resource, or so.
  media = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(media, events.slice(close + 1))

  // Media close.
  media = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.push)(media, [['exit', group, context]])

  ;(0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.splice)(events, open, events.length, media)

  return events
}

/** @type {Tokenizer} */
function tokenizeLabelEnd(effects, ok, nok) {
  const self = this
  let index = self.events.length
  /** @type {Token} */
  let labelStart
  /** @type {boolean} */
  let defined

  // Find an opening.
  while (index--) {
    if (
      (self.events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelImage ||
        self.events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelLink) &&
      !self.events[index][1]._balanced
    ) {
      labelStart = self.events[index][1]
      break
    }
  }

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.rightSquareBracket, 'expected `]`')

    if (!labelStart) {
      return nok(code)
    }

    // It’s a balanced bracket, but contains a link.
    if (labelStart._inactive) return balanced(code)
    defined = self.parser.defined.includes(
      (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_5__.normalizeIdentifier)(
        self.sliceSerialize({start: labelStart.end, end: self.now()})
      )
    )
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelEnd)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelMarker)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.labelEnd)
    return afterLabelEnd
  }

  /** @type {State} */
  function afterLabelEnd(code) {
    // Resource: `[asd](fgh)`.
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.leftParenthesis) {
      return effects.attempt(
        resourceConstruct,
        ok,
        defined ? ok : balanced
      )(code)
    }

    // Collapsed (`[asd][]`) or full (`[asd][fgh]`) reference?
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.leftSquareBracket) {
      return effects.attempt(
        fullReferenceConstruct,
        ok,
        defined
          ? effects.attempt(collapsedReferenceConstruct, ok, balanced)
          : balanced
      )(code)
    }

    // Shortcut reference: `[asd]`?
    return defined ? ok(code) : balanced(code)
  }

  /** @type {State} */
  function balanced(code) {
    labelStart._balanced = true
    return nok(code)
  }
}

/** @type {Tokenizer} */
function tokenizeResource(effects, ok, nok) {
  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.leftParenthesis, 'expected left paren')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resource)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceMarker)
    return (0,micromark_factory_whitespace__WEBPACK_IMPORTED_MODULE_6__.factoryWhitespace)(effects, open)
  }

  /** @type {State} */
  function open(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.rightParenthesis) {
      return end(code)
    }

    return (0,micromark_factory_destination__WEBPACK_IMPORTED_MODULE_7__.factoryDestination)(
      effects,
      destinationAfter,
      nok,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceDestination,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceDestinationLiteral,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceDestinationLiteralMarker,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceDestinationRaw,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceDestinationString,
      micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_8__.constants.linkResourceDestinationBalanceMax
    )(code)
  }

  /** @type {State} */
  function destinationAfter(code) {
    return (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_9__.markdownLineEndingOrSpace)(code)
      ? (0,micromark_factory_whitespace__WEBPACK_IMPORTED_MODULE_6__.factoryWhitespace)(effects, between)(code)
      : end(code)
  }

  /** @type {State} */
  function between(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.quotationMark ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.apostrophe ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.leftParenthesis
    ) {
      return (0,micromark_factory_title__WEBPACK_IMPORTED_MODULE_10__.factoryTitle)(
        effects,
        (0,micromark_factory_whitespace__WEBPACK_IMPORTED_MODULE_6__.factoryWhitespace)(effects, end),
        nok,
        micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceTitle,
        micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceTitleMarker,
        micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceTitleString
      )(code)
    }

    return end(code)
  }

  /** @type {State} */
  function end(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.rightParenthesis) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceMarker)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resourceMarker)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.resource)
      return ok
    }

    return nok(code)
  }
}

/** @type {Tokenizer} */
function tokenizeFullReference(effects, ok, nok) {
  const self = this

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.leftSquareBracket, 'expected left bracket')
    return micromark_factory_label__WEBPACK_IMPORTED_MODULE_11__.factoryLabel.call(
      self,
      effects,
      afterLabel,
      nok,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.reference,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.referenceMarker,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.referenceString
    )(code)
  }

  /** @type {State} */
  function afterLabel(code) {
    return self.parser.defined.includes(
      (0,micromark_util_normalize_identifier__WEBPACK_IMPORTED_MODULE_5__.normalizeIdentifier)(
        self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
      )
    )
      ? ok(code)
      : nok(code)
  }
}

/** @type {Tokenizer} */
function tokenizeCollapsedReference(effects, ok, nok) {
  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.leftSquareBracket, 'expected left bracket')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.reference)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.referenceMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.referenceMarker)
    return open
  }

  /** @type {State} */
  function open(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_4__.codes.rightSquareBracket) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.referenceMarker)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.referenceMarker)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.reference)
      return ok
    }

    return nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/label-start-image.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/label-start-image.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "labelStartImage": () => (/* binding */ labelStartImage)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/* harmony import */ var _label_end_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./label-end.js */ "./node_modules/micromark-core-commonmark/dev/lib/label-end.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 */






/** @type {Construct} */
const labelStartImage = {
  name: 'labelStartImage',
  tokenize: tokenizeLabelStartImage,
  resolveAll: _label_end_js__WEBPACK_IMPORTED_MODULE_1__.labelEnd.resolveAll
}

/** @type {Tokenizer} */
function tokenizeLabelStartImage(effects, ok, nok) {
  const self = this

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.exclamationMark, 'expected `!`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelImage)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelImageMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelImageMarker)
    return open
  }

  /** @type {State} */
  function open(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.leftSquareBracket) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelMarker)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelMarker)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelImage)
      return after
    }

    return nok(code)
  }

  /** @type {State} */
  function after(code) {
    /* To do: remove in the future once we’ve switched from
     * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
     * which doesn’t need this */
    /* Hidden footnotes hook */
    /* c8 ignore next 3 */
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.caret &&
      '_hiddenFootnoteSupport' in self.parser.constructs
      ? nok(code)
      : ok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/label-start-link.js":
/*!****************************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/label-start-link.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "labelStartLink": () => (/* binding */ labelStartLink)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/* harmony import */ var _label_end_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./label-end.js */ "./node_modules/micromark-core-commonmark/dev/lib/label-end.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 */






/** @type {Construct} */
const labelStartLink = {
  name: 'labelStartLink',
  tokenize: tokenizeLabelStartLink,
  resolveAll: _label_end_js__WEBPACK_IMPORTED_MODULE_1__.labelEnd.resolveAll
}

/** @type {Tokenizer} */
function tokenizeLabelStartLink(effects, ok, nok) {
  const self = this

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.leftSquareBracket, 'expected `[`')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelLink)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelMarker)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.labelLink)
    return after
  }

  /** @type {State} */
  function after(code) {
    /* To do: remove in the future once we’ve switched from
     * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
     * which doesn’t need this */
    /* Hidden footnotes hook. */
    /* c8 ignore next 3 */
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.caret &&
      '_hiddenFootnoteSupport' in self.parser.constructs
      ? nok(code)
      : ok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/line-ending.js":
/*!***********************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/line-ending.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lineEnding": () => (/* binding */ lineEnding)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 */






/** @type {Construct} */
const lineEnding = {name: 'lineEnding', tokenize: tokenizeLineEnding}

/** @type {Tokenizer} */
function tokenizeLineEnding(effects, ok) {
  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.markdownLineEnding)(code), 'expected eol')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.lineEnding)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.lineEnding)
    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_3__.factorySpace)(effects, ok, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.linePrefix)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/list.js":
/*!****************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/list.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "list": () => (/* binding */ list)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/* harmony import */ var _blank_line_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blank-line.js */ "./node_modules/micromark-core-commonmark/dev/lib/blank-line.js");
/* harmony import */ var _thematic_break_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./thematic-break.js */ "./node_modules/micromark-core-commonmark/dev/lib/thematic-break.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Exiter} Exiter
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */

/**
 * @typedef {Record<string, unknown> & {marker: Code, type: string, size: number}} ListContainerState
 * @typedef {TokenizeContext & {containerState: ListContainerState}} TokenizeContextWithState
 */










/** @type {Construct} */
const list = {
  name: 'list',
  tokenize: tokenizeListStart,
  continuation: {tokenize: tokenizeListContinuation},
  exit: tokenizeListEnd
}

/** @type {Construct} */
const listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
}

/** @type {Construct} */
const indentConstruct = {tokenize: tokenizeIndent, partial: true}

/**
 * @type {Tokenizer}
 * @this {TokenizeContextWithState}
 */
function tokenizeListStart(effects, ok, nok) {
  const self = this
  const tail = self.events[self.events.length - 1]
  let initialSize =
    tail && tail[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix
      ? tail[2].sliceSerialize(tail[1], true).length
      : 0
  let size = 0

  return start

  /** @type {State} */
  function start(code) {
    const kind =
      self.containerState.type ||
      (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.asterisk || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.plusSign || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash
        ? micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listUnordered
        : micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listOrdered)

    if (
      kind === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listUnordered
        ? !self.containerState.marker || code === self.containerState.marker
        : (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiDigit)(code)
    ) {
      if (!self.containerState.type) {
        self.containerState.type = kind
        effects.enter(kind, {_container: true})
      }

      if (kind === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listUnordered) {
        effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemPrefix)
        return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.asterisk || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash
          ? effects.check(_thematic_break_js__WEBPACK_IMPORTED_MODULE_4__.thematicBreak, nok, atMarker)(code)
          : atMarker(code)
      }

      if (!self.interrupt || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.digit1) {
        effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemPrefix)
        effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemValue)
        return inside(code)
      }
    }

    return nok(code)
  }

  /** @type {State} */
  function inside(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.asciiDigit)(code) && ++size < micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.listItemValueSizeMax) {
      effects.consume(code)
      return inside
    }

    if (
      (!self.interrupt || size < 2) &&
      (self.containerState.marker
        ? code === self.containerState.marker
        : code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.rightParenthesis || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dot)
    ) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemValue)
      return atMarker(code)
    }

    return nok(code)
  }

  /**
   * @type {State}
   **/
  function atMarker(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code !== micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof, 'eof (`null`) is not a marker')
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemMarker)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemMarker)
    self.containerState.marker = self.containerState.marker || code
    return effects.check(
      _blank_line_js__WEBPACK_IMPORTED_MODULE_6__.blankLine,
      // Can’t be empty when interrupting.
      self.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix
      )
    )
  }

  /** @type {State} */
  function onBlank(code) {
    self.containerState.initialBlankLine = true
    initialSize++
    return endOfPrefix(code)
  }

  /** @type {State} */
  function otherPrefix(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemPrefixWhitespace)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemPrefixWhitespace)
      return endOfPrefix
    }

    return nok(code)
  }

  /** @type {State} */
  function endOfPrefix(code) {
    self.containerState.size =
      initialSize +
      self.sliceSerialize(effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemPrefix), true).length
    return ok(code)
  }
}

/**
 * @type {Tokenizer}
 * @this {TokenizeContextWithState}
 */
function tokenizeListContinuation(effects, ok, nok) {
  const self = this

  self.containerState._closeFlow = undefined

  return effects.check(_blank_line_js__WEBPACK_IMPORTED_MODULE_6__.blankLine, onBlank, notBlank)

  /** @type {State} */
  function onBlank(code) {
    self.containerState.furtherBlankLines =
      self.containerState.furtherBlankLines ||
      self.containerState.initialBlankLine

    // We have a blank line.
    // Still, try to consume at most the items size.
    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_7__.factorySpace)(
      effects,
      ok,
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemIndent,
      self.containerState.size + 1
    )(code)
  }

  /** @type {State} */
  function notBlank(code) {
    if (self.containerState.furtherBlankLines || !(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)) {
      self.containerState.furtherBlankLines = undefined
      self.containerState.initialBlankLine = undefined
      return notInCurrentItem(code)
    }

    self.containerState.furtherBlankLines = undefined
    self.containerState.initialBlankLine = undefined
    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code)
  }

  /** @type {State} */
  function notInCurrentItem(code) {
    // While we do continue, we signal that the flow should be closed.
    self.containerState._closeFlow = true
    // As we’re closing flow, we’re no longer interrupting.
    self.interrupt = undefined
    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_7__.factorySpace)(
      effects,
      effects.attempt(list, ok, nok),
      micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix,
      self.parser.constructs.disable.null.includes('codeIndented')
        ? undefined
        : micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.tabSize
    )(code)
  }
}

/**
 * @type {Tokenizer}
 * @this {TokenizeContextWithState}
 */
function tokenizeIndent(effects, ok, nok) {
  const self = this

  return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_7__.factorySpace)(
    effects,
    afterPrefix,
    micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemIndent,
    self.containerState.size + 1
  )

  /** @type {State} */
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1]
    return tail &&
      tail[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemIndent &&
      tail[2].sliceSerialize(tail[1], true).length === self.containerState.size
      ? ok(code)
      : nok(code)
  }
}

/**
 * @type {Exiter}
 * @this {TokenizeContextWithState}
 */
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type)
}

/**
 * @type {Tokenizer}
 * @this {TokenizeContextWithState}
 */
function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
  const self = this

  return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_7__.factorySpace)(
    effects,
    afterPrefix,
    micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemPrefixWhitespace,
    self.parser.constructs.disable.null.includes('codeIndented')
      ? undefined
      : micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.tabSize + 1
  )

  /** @type {State} */
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1]

    return !(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code) &&
      tail &&
      tail[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemPrefixWhitespace
      ? ok(code)
      : nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/setext-underline.js":
/*!****************************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/setext-underline.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setextUnderline": () => (/* binding */ setextUnderline)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */







/** @type {Construct} */
const setextUnderline = {
  name: 'setextUnderline',
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
}

/** @type {Resolver} */
function resolveToSetextUnderline(events, context) {
  let index = events.length
  /** @type {number|undefined} */
  let content
  /** @type {number|undefined} */
  let text
  /** @type {number|undefined} */
  let definition

  // Find the opening of the content.
  // It’ll always exist: we don’t tokenize if it isn’t there.
  while (index--) {
    if (events[index][0] === 'enter') {
      if (events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.content) {
        content = index
        break
      }

      if (events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.paragraph) {
        text = index
      }
    }
    // Exit
    else {
      if (events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.content) {
        // Remove the content end (if needed we’ll add it later)
        events.splice(index, 1)
      }

      if (!definition && events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.definition) {
        definition = index
      }
    }
  }

  (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(text !== undefined, 'expected a `text` index to be found')
  ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(content !== undefined, 'expected a `text` index to be found')

  const heading = {
    type: micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.setextHeading,
    start: Object.assign({}, events[text][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  }

  // Change the paragraph to setext heading text.
  events[text][1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.setextHeadingText

  // If we have definitions in the content, we’ll keep on having content,
  // but we need move it.
  if (definition) {
    events.splice(text, 0, ['enter', heading, context])
    events.splice(definition + 1, 0, ['exit', events[content][1], context])
    events[content][1].end = Object.assign({}, events[definition][1].end)
  } else {
    events[content][1] = heading
  }

  // Add the heading exit at the end.
  events.push(['exit', heading, context])

  return events
}

/** @type {Tokenizer} */
function tokenizeSetextUnderline(effects, ok, nok) {
  const self = this
  let index = self.events.length
  /** @type {NonNullable<Code>} */
  let marker
  /** @type {boolean} */
  let paragraph

  // Find an opening.
  while (index--) {
    // Skip enter/exit of line ending, line prefix, and content.
    // We can now either have a definition or a paragraph.
    if (
      self.events[index][1].type !== micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding &&
      self.events[index][1].type !== micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix &&
      self.events[index][1].type !== micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.content
    ) {
      paragraph = self.events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.paragraph
      break
    }
  }

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.dash || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.equalsTo,
      'expected `=` or `-`'
    )

    if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.setextHeadingLine)
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.setextHeadingLineSequence)
      marker = code
      return closingSequence(code)
    }

    return nok(code)
  }

  /** @type {State} */
  function closingSequence(code) {
    if (code === marker) {
      effects.consume(code)
      return closingSequence
    }

    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.setextHeadingLineSequence)
    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_3__.factorySpace)(effects, closingSequenceEnd, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineSuffix)(code)
  }

  /** @type {State} */
  function closingSequenceEnd(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_4__.markdownLineEnding)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.setextHeadingLine)
      return ok(code)
    }

    return nok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-core-commonmark/dev/lib/thematic-break.js":
/*!**************************************************************************!*\
  !*** ./node_modules/micromark-core-commonmark/dev/lib/thematic-break.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "thematicBreak": () => (/* binding */ thematicBreak)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */








/** @type {Construct} */
const thematicBreak = {
  name: 'thematicBreak',
  tokenize: tokenizeThematicBreak
}

/** @type {Tokenizer} */
function tokenizeThematicBreak(effects, ok, nok) {
  let size = 0
  /** @type {NonNullable<Code>} */
  let marker

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.asterisk ||
        code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.dash ||
        code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.underscore,
      'expected `*`, `-`, or `_`'
    )

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.thematicBreak)
    marker = code
    return atBreak(code)
  }

  /** @type {State} */
  function atBreak(code) {
    if (code === marker) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.thematicBreakSequence)
      return sequence(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)) {
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__.factorySpace)(effects, atBreak, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.whitespace)(code)
    }

    if (
      size < micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.thematicBreakMarkerCountMin ||
      (code !== micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof && !(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code))
    ) {
      return nok(code)
    }

    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.thematicBreak)
    return ok(code)
  }

  /** @type {State} */
  function sequence(code) {
    if (code === marker) {
      effects.consume(code)
      size++
      return sequence
    }

    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.thematicBreakSequence)
    return atBreak(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-factory-destination/dev/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/micromark-factory-destination/dev/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "factoryDestination": () => (/* binding */ factoryDestination)
/* harmony export */ });
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').State} State
 */






/**
 * @param {Effects} effects
 * @param {State} ok
 * @param {State} nok
 * @param {string} type
 * @param {string} literalType
 * @param {string} literalMarkerType
 * @param {string} rawType
 * @param {string} stringType
 * @param {number} [max=Infinity]
 * @returns {State}
 */
// eslint-disable-next-line max-params
function factoryDestination(
  effects,
  ok,
  nok,
  type,
  literalType,
  literalMarkerType,
  rawType,
  stringType,
  max
) {
  const limit = max || Number.POSITIVE_INFINITY
  let balance = 0

  return start

  /** @type {State} */
  function start(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lessThan) {
      effects.enter(type)
      effects.enter(literalType)
      effects.enter(literalMarkerType)
      effects.consume(code)
      effects.exit(literalMarkerType)
      return destinationEnclosedBefore
    }

    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.rightParenthesis ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.asciiControl)(code)
    ) {
      return nok(code)
    }

    effects.enter(type)
    effects.enter(rawType)
    effects.enter(stringType)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.chunkString, {contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.contentTypeString})
    return destinationRaw(code)
  }

  /** @type {State} */
  function destinationEnclosedBefore(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.greaterThan) {
      effects.enter(literalMarkerType)
      effects.consume(code)
      effects.exit(literalMarkerType)
      effects.exit(literalType)
      effects.exit(type)
      return ok
    }

    effects.enter(stringType)
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.chunkString, {contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_3__.constants.contentTypeString})
    return destinationEnclosed(code)
  }

  /** @type {State} */
  function destinationEnclosed(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.greaterThan) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.chunkString)
      effects.exit(stringType)
      return destinationEnclosedBefore(code)
    }

    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lessThan ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.markdownLineEnding)(code)
    ) {
      return nok(code)
    }

    effects.consume(code)
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.backslash
      ? destinationEnclosedEscape
      : destinationEnclosed
  }

  /** @type {State} */
  function destinationEnclosedEscape(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lessThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.greaterThan ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.backslash
    ) {
      effects.consume(code)
      return destinationEnclosed
    }

    return destinationEnclosed(code)
  }

  /** @type {State} */
  function destinationRaw(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.leftParenthesis) {
      if (++balance > limit) return nok(code)
      effects.consume(code)
      return destinationRaw
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.rightParenthesis) {
      if (!balance--) {
        effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.chunkString)
        effects.exit(stringType)
        effects.exit(rawType)
        effects.exit(type)
        return ok(code)
      }

      effects.consume(code)
      return destinationRaw
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.markdownLineEndingOrSpace)(code)) {
      if (balance) return nok(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_2__.types.chunkString)
      effects.exit(stringType)
      effects.exit(rawType)
      effects.exit(type)
      return ok(code)
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.asciiControl)(code)) return nok(code)
    effects.consume(code)
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.backslash ? destinationRawEscape : destinationRaw
  }

  /** @type {State} */
  function destinationRawEscape(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.leftParenthesis ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.rightParenthesis ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.backslash
    ) {
      effects.consume(code)
      return destinationRaw
    }

    return destinationRaw(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-factory-label/dev/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/micromark-factory-label/dev/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "factoryLabel": () => (/* binding */ factoryLabel)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').State} State
 */







/**
 * @this {TokenizeContext}
 * @param {Effects} effects
 * @param {State} ok
 * @param {State} nok
 * @param {string} type
 * @param {string} markerType
 * @param {string} stringType
 * @returns {State}
 */
// eslint-disable-next-line max-params
function factoryLabel(effects, ok, nok, type, markerType, stringType) {
  const self = this
  let size = 0
  /** @type {boolean} */
  let data

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket, 'expected `[`')
    effects.enter(type)
    effects.enter(markerType)
    effects.consume(code)
    effects.exit(markerType)
    effects.enter(stringType)
    return atBreak
  }

  /** @type {State} */
  function atBreak(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket ||
      (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket && !data) ||
      /* To do: remove in the future once we’ve switched from
       * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
       * which doesn’t need this */
      /* Hidden footnotes hook */
      /* c8 ignore next 3 */
      (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.caret &&
        !size &&
        '_hiddenFootnoteSupport' in self.parser.constructs) ||
      size > micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.linkReferenceSizeMax
    ) {
      return nok(code)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket) {
      effects.exit(stringType)
      effects.enter(markerType)
      effects.consume(code)
      effects.exit(markerType)
      effects.exit(type)
      return ok
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)
      return atBreak
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.chunkString, {contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.contentTypeString})
    return label(code)
  }

  /** @type {State} */
  function label(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket ||
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code) ||
      size++ > micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.linkReferenceSizeMax
    ) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.chunkString)
      return atBreak(code)
    }

    effects.consume(code)
    data = data || !(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.backslash ? labelEscape : label
  }

  /** @type {State} */
  function labelEscape(code) {
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.backslash ||
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket
    ) {
      effects.consume(code)
      size++
      return label
    }

    return label(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-factory-space/dev/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/micromark-factory-space/dev/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "factorySpace": () => (/* binding */ factorySpace)
/* harmony export */ });
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/**
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').State} State
 */



/**
 * @param {Effects} effects
 * @param {State} ok
 * @param {string} type
 * @param {number} [max=Infinity]
 * @returns {State}
 */
function factorySpace(effects, ok, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY
  let size = 0

  return start

  /** @type {State} */
  function start(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__.markdownSpace)(code)) {
      effects.enter(type)
      return prefix(code)
    }

    return ok(code)
  }

  /** @type {State} */
  function prefix(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__.markdownSpace)(code) && size++ < limit) {
      effects.consume(code)
      return prefix
    }

    effects.exit(type)
    return ok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-factory-title/dev/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/micromark-factory-title/dev/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "factoryTitle": () => (/* binding */ factoryTitle)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */








/**
 * @param {Effects} effects
 * @param {State} ok
 * @param {State} nok
 * @param {string} type
 * @param {string} markerType
 * @param {string} stringType
 * @returns {State}
 */
// eslint-disable-next-line max-params
function factoryTitle(effects, ok, nok, type, markerType, stringType) {
  /** @type {NonNullable<Code>} */
  let marker

  return start

  /** @type {State} */
  function start(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.quotationMark ||
        code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.apostrophe ||
        code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftParenthesis,
      'expected `"`, `\'`, or `(`'
    )
    effects.enter(type)
    effects.enter(markerType)
    effects.consume(code)
    effects.exit(markerType)
    marker = code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftParenthesis ? micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightParenthesis : code
    return atFirstTitleBreak
  }

  /** @type {State} */
  function atFirstTitleBreak(code) {
    if (code === marker) {
      effects.enter(markerType)
      effects.consume(code)
      effects.exit(markerType)
      effects.exit(type)
      return ok
    }

    effects.enter(stringType)
    return atTitleBreak(code)
  }

  /** @type {State} */
  function atTitleBreak(code) {
    if (code === marker) {
      effects.exit(stringType)
      return atFirstTitleBreak(marker)
    }

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof) {
      return nok(code)
    }

    // Note: blank lines can’t exist in content.
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_2__.markdownLineEnding)(code)) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.lineEnding)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.lineEnding)
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__.factorySpace)(effects, atTitleBreak, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.linePrefix)
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.chunkString, {contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.contentTypeString})
    return title(code)
  }

  /** @type {State} */
  function title(code) {
    if (code === marker || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_2__.markdownLineEnding)(code)) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.chunkString)
      return atTitleBreak(code)
    }

    effects.consume(code)
    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.backslash ? titleEscape : title
  }

  /** @type {State} */
  function titleEscape(code) {
    if (code === marker || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.backslash) {
      effects.consume(code)
      return title
    }

    return title(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-factory-whitespace/dev/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/micromark-factory-whitespace/dev/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "factoryWhitespace": () => (/* binding */ factoryWhitespace)
/* harmony export */ });
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').State} State
 */





/**
 * @param {Effects} effects
 * @param {State} ok
 */
function factoryWhitespace(effects, ok) {
  /** @type {boolean} */
  let seen

  return start

  /** @type {State} */
  function start(code) {
    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__.markdownLineEnding)(code)) {
      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding)
      seen = true
      return start
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__.markdownSpace)(code)) {
      return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_2__.factorySpace)(
        effects,
        start,
        seen ? micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix : micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineSuffix
      )(code)
    }

    return ok(code)
  }
}


/***/ }),

/***/ "./node_modules/micromark-util-character/dev/index.js":
/*!************************************************************!*\
  !*** ./node_modules/micromark-util-character/dev/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "asciiAlpha": () => (/* binding */ asciiAlpha),
/* harmony export */   "asciiAlphanumeric": () => (/* binding */ asciiAlphanumeric),
/* harmony export */   "asciiAtext": () => (/* binding */ asciiAtext),
/* harmony export */   "asciiControl": () => (/* binding */ asciiControl),
/* harmony export */   "asciiDigit": () => (/* binding */ asciiDigit),
/* harmony export */   "asciiHexDigit": () => (/* binding */ asciiHexDigit),
/* harmony export */   "asciiPunctuation": () => (/* binding */ asciiPunctuation),
/* harmony export */   "markdownLineEnding": () => (/* binding */ markdownLineEnding),
/* harmony export */   "markdownLineEndingOrSpace": () => (/* binding */ markdownLineEndingOrSpace),
/* harmony export */   "markdownSpace": () => (/* binding */ markdownSpace),
/* harmony export */   "unicodePunctuation": () => (/* binding */ unicodePunctuation),
/* harmony export */   "unicodeWhitespace": () => (/* binding */ unicodeWhitespace)
/* harmony export */ });
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var _lib_unicode_punctuation_regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/unicode-punctuation-regex.js */ "./node_modules/micromark-util-character/dev/lib/unicode-punctuation-regex.js");
/**
 * @typedef {import('micromark-util-types').Code} Code
 */




/**
 * Check whether the character code represents an ASCII alpha (`a` through `z`,
 * case insensitive).
 *
 * An **ASCII alpha** is an ASCII upper alpha or ASCII lower alpha.
 *
 * An **ASCII upper alpha** is a character in the inclusive range U+0041 (`A`)
 * to U+005A (`Z`).
 *
 * An **ASCII lower alpha** is a character in the inclusive range U+0061 (`a`)
 * to U+007A (`z`).
 */
const asciiAlpha = regexCheck(/[A-Za-z]/)

/**
 * Check whether the character code represents an ASCII digit (`0` through `9`).
 *
 * An **ASCII digit** is a character in the inclusive range U+0030 (`0`) to
 * U+0039 (`9`).
 */
const asciiDigit = regexCheck(/\d/)

/**
 * Check whether the character code represents an ASCII hex digit (`a` through
 * `f`, case insensitive, or `0` through `9`).
 *
 * An **ASCII hex digit** is an ASCII digit (see `asciiDigit`), ASCII upper hex
 * digit, or an ASCII lower hex digit.
 *
 * An **ASCII upper hex digit** is a character in the inclusive range U+0041
 * (`A`) to U+0046 (`F`).
 *
 * An **ASCII lower hex digit** is a character in the inclusive range U+0061
 * (`a`) to U+0066 (`f`).
 */
const asciiHexDigit = regexCheck(/[\dA-Fa-f]/)

/**
 * Check whether the character code represents an ASCII alphanumeric (`a`
 * through `z`, case insensitive, or `0` through `9`).
 *
 * An **ASCII alphanumeric** is an ASCII digit (see `asciiDigit`) or ASCII alpha
 * (see `asciiAlpha`).
 */
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/)

/**
 * Check whether the character code represents ASCII punctuation.
 *
 * An **ASCII punctuation** is a character in the inclusive ranges U+0021
 * EXCLAMATION MARK (`!`) to U+002F SLASH (`/`), U+003A COLON (`:`) to U+0040 AT
 * SIGN (`@`), U+005B LEFT SQUARE BRACKET (`[`) to U+0060 GRAVE ACCENT
 * (`` ` ``), or U+007B LEFT CURLY BRACE (`{`) to U+007E TILDE (`~`).
 */
const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/)

/**
 * Check whether the character code represents an ASCII atext.
 *
 * atext is an ASCII alphanumeric (see `asciiAlphanumeric`), or a character in
 * the inclusive ranges U+0023 NUMBER SIGN (`#`) to U+0027 APOSTROPHE (`'`),
 * U+002A ASTERISK (`*`), U+002B PLUS SIGN (`+`), U+002D DASH (`-`), U+002F
 * SLASH (`/`), U+003D EQUALS TO (`=`), U+003F QUESTION MARK (`?`), U+005E
 * CARET (`^`) to U+0060 GRAVE ACCENT (`` ` ``), or U+007B LEFT CURLY BRACE
 * (`{`) to U+007E TILDE (`~`).
 *
 * See:
 * **\[RFC5322]**:
 * [Internet Message Format](https://tools.ietf.org/html/rfc5322).
 * P. Resnick.
 * IETF.
 */
const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/)

/**
 * Check whether a character code is an ASCII control character.
 *
 * An **ASCII control** is a character in the inclusive range U+0000 NULL (NUL)
 * to U+001F (US), or U+007F (DEL).
 *
 * @param {Code} code
 * @returns {code is number}
 */
function asciiControl(code) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code !== null && (code < micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.space || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.del)
  )
}

/**
 * Check whether a character code is a markdown line ending (see
 * `markdownLineEnding`) or markdown space (see `markdownSpace`).
 *
 * @param {Code} code
 * @returns {code is number}
 */
function markdownLineEndingOrSpace(code) {
  return code !== null && (code < micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.nul || code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.space)
}

/**
 * Check whether a character code is a markdown line ending.
 *
 * A **markdown line ending** is the virtual characters M-0003 CARRIAGE RETURN
 * LINE FEED (CRLF), M-0004 LINE FEED (LF) and M-0005 CARRIAGE RETURN (CR).
 *
 * In micromark, the actual character U+000A LINE FEED (LF) and U+000D CARRIAGE
 * RETURN (CR) are replaced by these virtual characters depending on whether
 * they occurred together.
 *
 * @param {Code} code
 * @returns {code is number}
 */
function markdownLineEnding(code) {
  return code !== null && code < micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.horizontalTab
}

/**
 * Check whether a character code is a markdown space.
 *
 * A **markdown space** is the concrete character U+0020 SPACE (SP) and the
 * virtual characters M-0001 VIRTUAL SPACE (VS) and M-0002 HORIZONTAL TAB (HT).
 *
 * In micromark, the actual character U+0009 CHARACTER TABULATION (HT) is
 * replaced by one M-0002 HORIZONTAL TAB (HT) and between 0 and 3 M-0001 VIRTUAL
 * SPACE (VS) characters, depending on the column at which the tab occurred.
 *
 * @param {Code} code
 * @returns {code is number}
 */
function markdownSpace(code) {
  return (
    code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.horizontalTab ||
    code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.virtualSpace ||
    code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.space
  )
}

/**
 * Check whether the character code represents Unicode whitespace.
 *
 * Note that this does handle micromark specific markdown whitespace characters.
 * See `markdownLineEndingOrSpace` to check that.
 *
 * A **Unicode whitespace** is a character in the Unicode `Zs` (Separator,
 * Space) category, or U+0009 CHARACTER TABULATION (HT), U+000A LINE FEED (LF),
 * U+000C (FF), or U+000D CARRIAGE RETURN (CR) (**\[UNICODE]**).
 *
 * See:
 * **\[UNICODE]**:
 * [The Unicode Standard](https://www.unicode.org/versions/).
 * Unicode Consortium.
 */
const unicodeWhitespace = regexCheck(/\s/)

/**
 * Check whether the character code represents Unicode punctuation.
 *
 * A **Unicode punctuation** is a character in the Unicode `Pc` (Punctuation,
 * Connector), `Pd` (Punctuation, Dash), `Pe` (Punctuation, Close), `Pf`
 * (Punctuation, Final quote), `Pi` (Punctuation, Initial quote), `Po`
 * (Punctuation, Other), or `Ps` (Punctuation, Open) categories, or an ASCII
 * punctuation (see `asciiPunctuation`).
 *
 * See:
 * **\[UNICODE]**:
 * [The Unicode Standard](https://www.unicode.org/versions/).
 * Unicode Consortium.
 */
// Size note: removing ASCII from the regex and using `asciiPunctuation` here
// In fact adds to the bundle size.
const unicodePunctuation = regexCheck(_lib_unicode_punctuation_regex_js__WEBPACK_IMPORTED_MODULE_1__.unicodePunctuationRegex)

/**
 * Create a code check from a regex.
 *
 * @param {RegExp} regex
 * @returns {(code: Code) => code is number}
 */
function regexCheck(regex) {
  return check

  /**
   * Check whether a code matches the bound regex.
   *
   * @param {Code} code Character code
   * @returns {code is number} Whether the character code matches the bound regex
   */
  function check(code) {
    return code !== null && regex.test(String.fromCharCode(code))
  }
}


/***/ }),

/***/ "./node_modules/micromark-util-character/dev/lib/unicode-punctuation-regex.js":
/*!************************************************************************************!*\
  !*** ./node_modules/micromark-util-character/dev/lib/unicode-punctuation-regex.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unicodePunctuationRegex": () => (/* binding */ unicodePunctuationRegex)
/* harmony export */ });
// This module is generated by `script/`.
//
// CommonMark handles attention (emphasis, strong) markers based on what comes
// before or after them.
// One such difference is if those characters are Unicode punctuation.
// This script is generated from the Unicode data.
const unicodePunctuationRegex =
  /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/


/***/ }),

/***/ "./node_modules/micromark-util-chunked/dev/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/micromark-util-chunked/dev/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "push": () => (/* binding */ push),
/* harmony export */   "splice": () => (/* binding */ splice)
/* harmony export */ });
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");


/**
 * Like `Array#splice`, but smarter for giant arrays.
 *
 * `Array#splice` takes all items to be inserted as individual argument which
 * causes a stack overflow in V8 when trying to insert 100k items for instance.
 *
 * Otherwise, this does not return the removed items, and takes `items` as an
 * array instead of rest parameters.
 *
 * @template {unknown} T
 * @param {T[]} list
 * @param {number} start
 * @param {number} remove
 * @param {T[]} items
 * @returns {void}
 */
function splice(list, start, remove, items) {
  const end = list.length
  let chunkStart = 0
  /** @type {unknown[]} */
  let parameters

  // Make start between zero and `end` (included).
  if (start < 0) {
    start = -start > end ? 0 : end + start
  } else {
    start = start > end ? end : start
  }

  remove = remove > 0 ? remove : 0

  // No need to chunk the items if there’s only a couple (10k) items.
  if (items.length < micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize) {
    parameters = Array.from(items)
    parameters.unshift(start, remove)
    // @ts-expect-error Hush, it’s fine.
    ;[].splice.apply(list, parameters)
  } else {
    // Delete `remove` items starting from `start`
    if (remove) [].splice.apply(list, [start, remove])

    // Insert the items in chunks to not cause stack overflows.
    while (chunkStart < items.length) {
      parameters = items.slice(
        chunkStart,
        chunkStart + micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize
      )
      parameters.unshift(start, 0)
      // @ts-expect-error Hush, it’s fine.
      ;[].splice.apply(list, parameters)

      chunkStart += micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize
      start += micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize
    }
  }
}

/**
 * Append `items` (an array) at the end of `list` (another array).
 * When `list` was empty, returns `items` instead.
 *
 * This prevents a potentially expensive operation when `list` is empty,
 * and adds items in batches to prevent V8 from hanging.
 *
 * @template {unknown} T
 * @param {T[]} list
 * @param {T[]} items
 * @returns {T[]}
 */
function push(list, items) {
  if (list.length > 0) {
    splice(list, list.length, 0, items)
    return list
  }

  return items
}


/***/ }),

/***/ "./node_modules/micromark-util-classify-character/dev/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micromark-util-classify-character/dev/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "classifyCharacter": () => (/* binding */ classifyCharacter)
/* harmony export */ });
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/**
 * @typedef {import('micromark-util-types').Code} Code
 */





/**
 * Classify whether a character code represents whitespace, punctuation, or
 * something else.
 *
 * Used for attention (emphasis, strong), whose sequences can open or close
 * based on the class of surrounding characters.
 *
 * Note that eof (`null`) is seen as whitespace.
 *
 * @param {Code} code
 * @returns {number|undefined}
 */
function classifyCharacter(code) {
  if (
    code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.eof ||
    (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.markdownLineEndingOrSpace)(code) ||
    (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.unicodeWhitespace)(code)
  ) {
    return micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.characterGroupWhitespace
  }

  if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.unicodePunctuation)(code)) {
    return micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.characterGroupPunctuation
  }
}


/***/ }),

/***/ "./node_modules/micromark-util-combine-extensions/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/micromark-util-combine-extensions/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "combineExtensions": () => (/* binding */ combineExtensions),
/* harmony export */   "combineHtmlExtensions": () => (/* binding */ combineHtmlExtensions)
/* harmony export */ });
/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-chunked */ "./node_modules/micromark-util-chunked/dev/index.js");
/**
 * @typedef {import('micromark-util-types').NormalizedExtension} NormalizedExtension
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 */



const hasOwnProperty = {}.hasOwnProperty

/**
 * Combine several syntax extensions into one.
 *
 * @param {Extension[]} extensions List of syntax extensions.
 * @returns {NormalizedExtension} A single combined extension.
 */
function combineExtensions(extensions) {
  /** @type {NormalizedExtension} */
  const all = {}
  let index = -1

  while (++index < extensions.length) {
    syntaxExtension(all, extensions[index])
  }

  return all
}

/**
 * Merge `extension` into `all`.
 *
 * @param {NormalizedExtension} all Extension to merge into.
 * @param {Extension} extension Extension to merge.
 * @returns {void}
 */
function syntaxExtension(all, extension) {
  /** @type {string} */
  let hook

  for (hook in extension) {
    const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined
    const left = maybe || (all[hook] = {})
    const right = extension[hook]
    /** @type {string} */
    let code

    for (code in right) {
      if (!hasOwnProperty.call(left, code)) left[code] = []
      const value = right[code]
      constructs(
        // @ts-expect-error Looks like a list.
        left[code],
        Array.isArray(value) ? value : value ? [value] : []
      )
    }
  }
}

/**
 * Merge `list` into `existing` (both lists of constructs).
 * Mutates `existing`.
 *
 * @param {unknown[]} existing
 * @param {unknown[]} list
 * @returns {void}
 */
function constructs(existing, list) {
  let index = -1
  /** @type {unknown[]} */
  const before = []

  while (++index < list.length) {
    // @ts-expect-error Looks like an object.
    ;(list[index].add === 'after' ? existing : before).push(list[index])
  }

  (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_0__.splice)(existing, 0, 0, before)
}

/**
 * Combine several HTML extensions into one.
 *
 * @param {HtmlExtension[]} htmlExtensions List of HTML extensions.
 * @returns {HtmlExtension} A single combined extension.
 */
function combineHtmlExtensions(htmlExtensions) {
  /** @type {HtmlExtension} */
  const handlers = {}
  let index = -1

  while (++index < htmlExtensions.length) {
    htmlExtension(handlers, htmlExtensions[index])
  }

  return handlers
}

/**
 * Merge `extension` into `all`.
 *
 * @param {HtmlExtension} all Extension to merge into.
 * @param {HtmlExtension} extension Extension to merge.
 * @returns {void}
 */
function htmlExtension(all, extension) {
  /** @type {string} */
  let hook

  for (hook in extension) {
    const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined
    const left = maybe || (all[hook] = {})
    const right = extension[hook]
    /** @type {string} */
    let type

    if (right) {
      for (type in right) {
        left[type] = right[type]
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeNumericCharacterReference": () => (/* binding */ decodeNumericCharacterReference)
/* harmony export */ });
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/values.js */ "./node_modules/micromark-util-symbol/values.js");



/**
 * Turn the number (in string form as either hexa- or plain decimal) coming from
 * a numeric character reference into a character.
 *
 * @param {string} value
 *   Value to decode.
 * @param {number} base
 *   Numeric base.
 * @returns {string}
 */
function decodeNumericCharacterReference(value, base) {
  const code = Number.parseInt(value, base)

  if (
    // C0 except for HT, LF, FF, CR, space
    code < micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.ht ||
    code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.vt ||
    (code > micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.cr && code < micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.space) ||
    // Control character (DEL) of the basic block and C1 controls.
    (code > micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.tilde && code < 160) ||
    // Lone high surrogates and low surrogates.
    (code > 55295 && code < 57344) ||
    // Noncharacters.
    (code > 64975 && code < 65008) ||
    (code & 65535) === 65535 ||
    (code & 65535) === 65534 ||
    // Out of range
    code > 1114111
  ) {
    return micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_1__.values.replacementCharacter
  }

  return String.fromCharCode(code)
}


/***/ }),

/***/ "./node_modules/micromark-util-decode-string/dev/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/micromark-util-decode-string/dev/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeString": () => (/* binding */ decodeString)
/* harmony export */ });
/* harmony import */ var decode_named_character_reference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! decode-named-character-reference */ "./node_modules/decode-named-character-reference/index.js");
/* harmony import */ var micromark_util_decode_numeric_character_reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-decode-numeric-character-reference */ "./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");





const characterEscapeOrReference =
  /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi

/**
 * Utility to decode markdown strings (which occur in places such as fenced
 * code info strings, destinations, labels, and titles).
 * The “string” content type allows character escapes and -references.
 * This decodes those.
 *
 * @param {string} value
 * @returns {string}
 */
function decodeString(value) {
  return value.replace(characterEscapeOrReference, decode)
}

/**
 * @param {string} $0
 * @param {string} $1
 * @param {string} $2
 * @returns {string}
 */
function decode($0, $1, $2) {
  if ($1) {
    // Escape.
    return $1
  }

  // Reference.
  const head = $2.charCodeAt(0)

  if (head === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.numberSign) {
    const head = $2.charCodeAt(1)
    const hex = head === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lowercaseX || head === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.uppercaseX
    return (0,micromark_util_decode_numeric_character_reference__WEBPACK_IMPORTED_MODULE_1__.decodeNumericCharacterReference)(
      $2.slice(hex ? 2 : 1),
      hex ? micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.numericBaseHexadecimal : micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.numericBaseDecimal
    )
  }

  return (0,decode_named_character_reference__WEBPACK_IMPORTED_MODULE_3__.decodeNamedCharacterReference)($2) || $0
}


/***/ }),

/***/ "./node_modules/micromark-util-encode/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/micromark-util-encode/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
const characterReferences = {'"': 'quot', '&': 'amp', '<': 'lt', '>': 'gt'}

/**
 * Encode only the dangerous HTML characters.
 *
 * This ensures that certain characters which have special meaning in HTML are
 * dealt with.
 * Technically, we can skip `>` and `"` in many cases, but CM includes them.
 *
 * @param {string} value
 * @returns {string}
 */
function encode(value) {
  return value.replace(/["&<>]/g, replace)

  /**
   * @param {string} value
   * @returns {string}
   */
  function replace(value) {
    // @ts-expect-error Hush, it’s fine.
    return '&' + characterReferences[value] + ';'
  }
}


/***/ }),

/***/ "./node_modules/micromark-util-html-tag-name/index.js":
/*!************************************************************!*\
  !*** ./node_modules/micromark-util-html-tag-name/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlBlockNames": () => (/* binding */ htmlBlockNames),
/* harmony export */   "htmlRawNames": () => (/* binding */ htmlRawNames)
/* harmony export */ });
/**
 * List of lowercase HTML tag names which when parsing HTML (flow), result
 * in more relaxed rules (condition 6): because they are known blocks, the
 * HTML-like syntax doesn’t have to be strictly parsed.
 * For tag names not in this list, a more strict algorithm (condition 7) is used
 * to detect whether the HTML-like syntax is seen as HTML (flow) or not.
 *
 * This is copied from:
 * <https://spec.commonmark.org/0.30/#html-blocks>.
 */
const htmlBlockNames = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
]

/**
 * List of lowercase HTML tag names which when parsing HTML (flow), result in
 * HTML that can include lines w/o exiting, until a closing tag also in this
 * list is found (condition 1).
 *
 * This module is copied from:
 * <https://spec.commonmark.org/0.30/#html-blocks>.
 *
 * Note that `textarea` was added in `CommonMark@0.30`.
 */
const htmlRawNames = ['pre', 'script', 'style', 'textarea']


/***/ }),

/***/ "./node_modules/micromark-util-normalize-identifier/dev/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/micromark-util-normalize-identifier/dev/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeIdentifier": () => (/* binding */ normalizeIdentifier)
/* harmony export */ });
/* harmony import */ var micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/values.js */ "./node_modules/micromark-util-symbol/values.js");


/**
 * Normalize an identifier (such as used in definitions).
 *
 * @param {string} value
 * @returns {string}
 */
function normalizeIdentifier(value) {
  return (
    value
      // Collapse Markdown whitespace.
      .replace(/[\t\n\r ]+/g, micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_0__.values.space)
      // Trim.
      .replace(/^ | $/g, '')
      // Some characters are considered “uppercase”, but if their lowercase
      // counterpart is uppercased will result in a different uppercase
      // character.
      // Hence, to get that form, we perform both lower- and uppercase.
      // Upper case makes sure keys will not interact with default prototypal
      // methods: no method is uppercase.
      .toLowerCase()
      .toUpperCase()
  )
}


/***/ }),

/***/ "./node_modules/micromark-util-resolve-all/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/micromark-util-resolve-all/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveAll": () => (/* binding */ resolveAll)
/* harmony export */ });
/**
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Resolver} Resolver
 */

/**
 * Call all `resolveAll`s.
 *
 * @param {{resolveAll?: Resolver}[]} constructs
 * @param {Event[]} events
 * @param {TokenizeContext} context
 * @returns {Event[]}
 */
function resolveAll(constructs, events, context) {
  /** @type {Resolver[]} */
  const called = []
  let index = -1

  while (++index < constructs.length) {
    const resolve = constructs[index].resolveAll

    if (resolve && !called.includes(resolve)) {
      events = resolve(events, context)
      called.push(resolve)
    }
  }

  return events
}


/***/ }),

/***/ "./node_modules/micromark-util-sanitize-uri/dev/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/micromark-util-sanitize-uri/dev/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sanitizeUri": () => (/* binding */ sanitizeUri)
/* harmony export */ });
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_encode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-encode */ "./node_modules/micromark-util-encode/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/values.js */ "./node_modules/micromark-util-symbol/values.js");





/**
 * Make a value safe for injection as a URL.
 *
 * This encodes unsafe characters with percent-encoding and skips already
 * encoded sequences (see `normalizeUri` below).
 * Further unsafe characters are encoded as character references (see
 * `micromark-util-encode`).
 *
 * Then, a regex of allowed protocols can be given, in which case the URL is
 * sanitized.
 * For example, `/^(https?|ircs?|mailto|xmpp)$/i` can be used for `a[href]`,
 * or `/^https?$/i` for `img[src]`.
 * If the URL includes an unknown protocol (one not matched by `protocol`, such
 * as a dangerous example, `javascript:`), the value is ignored.
 *
 * @param {string|undefined} url
 * @param {RegExp} [protocol]
 * @returns {string}
 */
function sanitizeUri(url, protocol) {
  const value = (0,micromark_util_encode__WEBPACK_IMPORTED_MODULE_0__.encode)(normalizeUri(url || ''))

  if (!protocol) {
    return value
  }

  const colon = value.indexOf(':')
  const questionMark = value.indexOf('?')
  const numberSign = value.indexOf('#')
  const slash = value.indexOf('/')

  if (
    // If there is no protocol, it’s relative.
    colon < 0 ||
    // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    (slash > -1 && colon > slash) ||
    (questionMark > -1 && colon > questionMark) ||
    (numberSign > -1 && colon > numberSign) ||
    // It is a protocol, it should be allowed.
    protocol.test(value.slice(0, colon))
  ) {
    return value
  }

  return ''
}

/**
 * Normalize a URL (such as used in definitions).
 *
 * Encode unsafe characters with percent-encoding, skipping already encoded
 * sequences.
 *
 * @param {string} value
 * @returns {string}
 */
function normalizeUri(value) {
  /** @type {string[]} */
  const result = []
  let index = -1
  let start = 0
  let skip = 0

  while (++index < value.length) {
    const code = value.charCodeAt(index)
    /** @type {string} */
    let replace = ''

    // A correct percent encoded value.
    if (
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.percentSign &&
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_2__.asciiAlphanumeric)(value.charCodeAt(index + 1)) &&
      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_2__.asciiAlphanumeric)(value.charCodeAt(index + 2))
    ) {
      skip = 2
    }
    // ASCII.
    else if (code < 128) {
      if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code))) {
        replace = String.fromCharCode(code)
      }
    }
    // Astral.
    else if (code > 55295 && code < 57344) {
      const next = value.charCodeAt(index + 1)

      // A correct surrogate pair.
      if (code < 56320 && next > 56319 && next < 57344) {
        replace = String.fromCharCode(code, next)
        skip = 1
      }
      // Lone surrogate.
      else {
        replace = micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_3__.values.replacementCharacter
      }
    }
    // Unicode.
    else {
      replace = String.fromCharCode(code)
    }

    if (replace) {
      result.push(value.slice(start, index), encodeURIComponent(replace))
      start = index + skip + 1
      replace = ''
    }

    if (skip) {
      index += skip
      skip = 0
    }
  }

  return result.join('') + value.slice(start)
}


/***/ }),

/***/ "./node_modules/micromark-util-subtokenize/dev/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/micromark-util-subtokenize/dev/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "subtokenize": () => (/* binding */ subtokenize)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-chunked */ "./node_modules/micromark-util-chunked/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').Chunk} Chunk
 * @typedef {import('micromark-util-types').Event} Event
 */






/**
 * Tokenize subcontent.
 *
 * @param {Event[]} events
 * @returns {boolean}
 */
function subtokenize(events) {
  /** @type {Record<string, number>} */
  const jumps = {}
  let index = -1
  /** @type {Event} */
  let event
  /** @type {number|undefined} */
  let lineIndex
  /** @type {number} */
  let otherIndex
  /** @type {Event} */
  let otherEvent
  /** @type {Event[]} */
  let parameters
  /** @type {Event[]} */
  let subevents
  /** @type {boolean|undefined} */
  let more

  while (++index < events.length) {
    while (index in jumps) {
      index = jumps[index]
    }

    event = events[index]

    // Add a hook for the GFM tasklist extension, which needs to know if text
    // is in the first content of a list item.
    if (
      index &&
      event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkFlow &&
      events[index - 1][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemPrefix
    ) {
      (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(event[1]._tokenizer, 'expected `_tokenizer` on subtokens')
      subevents = event[1]._tokenizer.events
      otherIndex = 0

      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEndingBlank
      ) {
        otherIndex += 2
      }

      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.content
      ) {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.content) {
            break
          }

          if (subevents[otherIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkText) {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true
            otherIndex++
          }
        }
      }
    }

    // Enter.
    if (event[0] === 'enter') {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index))
        index = jumps[index]
        more = true
      }
    }
    // Exit.
    else if (event[1]._container) {
      otherIndex = index
      lineIndex = undefined

      while (otherIndex--) {
        otherEvent = events[otherIndex]

        if (
          otherEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding ||
          otherEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEndingBlank
        ) {
          if (otherEvent[0] === 'enter') {
            if (lineIndex) {
              events[lineIndex][1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEndingBlank
            }

            otherEvent[1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding
            lineIndex = otherIndex
          }
        } else {
          break
        }
      }

      if (lineIndex) {
        // Fix position.
        event[1].end = Object.assign({}, events[lineIndex][1].start)

        // Switch container exit w/ line endings.
        parameters = events.slice(lineIndex, index)
        parameters.unshift(event)
        ;(0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.splice)(events, lineIndex, index - lineIndex + 1, parameters)
      }
    }
  }

  return !more
}

/**
 * Tokenize embedded tokens.
 *
 * @param {Event[]} events
 * @param {number} eventIndex
 * @returns {Record<string, number>}
 */
function subcontent(events, eventIndex) {
  const token = events[eventIndex][1]
  const context = events[eventIndex][2]
  let startPosition = eventIndex - 1
  /** @type {number[]} */
  const startPositions = []
  ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(token.contentType, 'expected `contentType` on subtokens')
  const tokenizer =
    token._tokenizer || context.parser[token.contentType](token.start)
  const childEvents = tokenizer.events
  /** @type {[number, number][]} */
  const jumps = []
  /** @type {Record<string, number>} */
  const gaps = {}
  /** @type {Chunk[]} */
  let stream
  /** @type {Token|undefined} */
  let previous
  let index = -1
  /** @type {Token|undefined} */
  let current = token
  let adjust = 0
  let start = 0
  const breaks = [start]

  // Loop forward through the linked tokens to pass them in order to the
  // subtokenizer.
  while (current) {
    // Find the position of the event for this token.
    while (events[++startPosition][1] !== current) {
      // Empty.
    }

    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      !previous || current.previous === previous,
      'expected previous to match'
    )
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(!previous || previous.next === current, 'expected next to match')

    startPositions.push(startPosition)

    if (!current._tokenizer) {
      stream = context.sliceStream(current)

      if (!current.next) {
        stream.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__.codes.eof)
      }

      if (previous) {
        tokenizer.defineSkip(current.start)
      }

      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true
      }

      tokenizer.write(stream)

      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = undefined
      }
    }

    // Unravel the next token.
    previous = current
    current = current.next
  }

  // Now, loop back through all events (and linked tokens), to figure out which
  // parts belong where.
  current = token

  while (++index < childEvents.length) {
    if (
      // Find a void token that includes a break.
      childEvents[index][0] === 'exit' &&
      childEvents[index - 1][0] === 'enter' &&
      childEvents[index][1].type === childEvents[index - 1][1].type &&
      childEvents[index][1].start.line !== childEvents[index][1].end.line
    ) {
      (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(current, 'expected a current token')
      start = index + 1
      breaks.push(start)
      // Help GC.
      current._tokenizer = undefined
      current.previous = undefined
      current = current.next
    }
  }

  // Help GC.
  tokenizer.events = []

  // If there’s one more token (which is the cases for lines that end in an
  // EOF), that’s perfect: the last point we found starts it.
  // If there isn’t then make sure any remaining content is added to it.
  if (current) {
    // Help GC.
    current._tokenizer = undefined
    current.previous = undefined
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(!current.next, 'expected no next token')
  } else {
    breaks.pop()
  }

  // Now splice the events from the subtokenizer into the current events,
  // moving back to front so that splice indices aren’t affected.
  index = breaks.length

  while (index--) {
    const slice = childEvents.slice(breaks[index], breaks[index + 1])
    const start = startPositions.pop()
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(start !== undefined, 'expected a start position when splicing')
    jumps.unshift([start, start + slice.length - 1])
    ;(0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.splice)(events, start, 2, slice)
  }

  index = -1

  while (++index < jumps.length) {
    gaps[adjust + jumps[index][0]] = adjust + jumps[index][1]
    adjust += jumps[index][1] - jumps[index][0] - 1
  }

  return gaps
}


/***/ }),

/***/ "./node_modules/micromark-util-symbol/codes.js":
/*!*****************************************************!*\
  !*** ./node_modules/micromark-util-symbol/codes.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "codes": () => (/* binding */ codes)
/* harmony export */ });
/**
 * Character codes.
 *
 * This module is compiled away!
 *
 * micromark works based on character codes.
 * This module contains constants for the ASCII block and the replacement
 * character.
 * A couple of them are handled in a special way, such as the line endings
 * (CR, LF, and CR+LF, commonly known as end-of-line: EOLs), the tab (horizontal
 * tab) and its expansion based on what column it’s at (virtual space),
 * and the end-of-file (eof) character.
 * As values are preprocessed before handling them, the actual characters LF,
 * CR, HT, and NUL (which is present as the replacement character), are
 * guaranteed to not exist.
 *
 * Unicode basic latin block.
 */
const codes = {
  carriageReturn: -5,
  lineFeed: -4,
  carriageReturnLineFeed: -3,
  horizontalTab: -2,
  virtualSpace: -1,
  eof: null,
  nul: 0,
  soh: 1,
  stx: 2,
  etx: 3,
  eot: 4,
  enq: 5,
  ack: 6,
  bel: 7,
  bs: 8,
  ht: 9, // `\t`
  lf: 10, // `\n`
  vt: 11, // `\v`
  ff: 12, // `\f`
  cr: 13, // `\r`
  so: 14,
  si: 15,
  dle: 16,
  dc1: 17,
  dc2: 18,
  dc3: 19,
  dc4: 20,
  nak: 21,
  syn: 22,
  etb: 23,
  can: 24,
  em: 25,
  sub: 26,
  esc: 27,
  fs: 28,
  gs: 29,
  rs: 30,
  us: 31,
  space: 32,
  exclamationMark: 33, // `!`
  quotationMark: 34, // `"`
  numberSign: 35, // `#`
  dollarSign: 36, // `$`
  percentSign: 37, // `%`
  ampersand: 38, // `&`
  apostrophe: 39, // `'`
  leftParenthesis: 40, // `(`
  rightParenthesis: 41, // `)`
  asterisk: 42, // `*`
  plusSign: 43, // `+`
  comma: 44, // `,`
  dash: 45, // `-`
  dot: 46, // `.`
  slash: 47, // `/`
  digit0: 48, // `0`
  digit1: 49, // `1`
  digit2: 50, // `2`
  digit3: 51, // `3`
  digit4: 52, // `4`
  digit5: 53, // `5`
  digit6: 54, // `6`
  digit7: 55, // `7`
  digit8: 56, // `8`
  digit9: 57, // `9`
  colon: 58, // `:`
  semicolon: 59, // `;`
  lessThan: 60, // `<`
  equalsTo: 61, // `=`
  greaterThan: 62, // `>`
  questionMark: 63, // `?`
  atSign: 64, // `@`
  uppercaseA: 65, // `A`
  uppercaseB: 66, // `B`
  uppercaseC: 67, // `C`
  uppercaseD: 68, // `D`
  uppercaseE: 69, // `E`
  uppercaseF: 70, // `F`
  uppercaseG: 71, // `G`
  uppercaseH: 72, // `H`
  uppercaseI: 73, // `I`
  uppercaseJ: 74, // `J`
  uppercaseK: 75, // `K`
  uppercaseL: 76, // `L`
  uppercaseM: 77, // `M`
  uppercaseN: 78, // `N`
  uppercaseO: 79, // `O`
  uppercaseP: 80, // `P`
  uppercaseQ: 81, // `Q`
  uppercaseR: 82, // `R`
  uppercaseS: 83, // `S`
  uppercaseT: 84, // `T`
  uppercaseU: 85, // `U`
  uppercaseV: 86, // `V`
  uppercaseW: 87, // `W`
  uppercaseX: 88, // `X`
  uppercaseY: 89, // `Y`
  uppercaseZ: 90, // `Z`
  leftSquareBracket: 91, // `[`
  backslash: 92, // `\`
  rightSquareBracket: 93, // `]`
  caret: 94, // `^`
  underscore: 95, // `_`
  graveAccent: 96, // `` ` ``
  lowercaseA: 97, // `a`
  lowercaseB: 98, // `b`
  lowercaseC: 99, // `c`
  lowercaseD: 100, // `d`
  lowercaseE: 101, // `e`
  lowercaseF: 102, // `f`
  lowercaseG: 103, // `g`
  lowercaseH: 104, // `h`
  lowercaseI: 105, // `i`
  lowercaseJ: 106, // `j`
  lowercaseK: 107, // `k`
  lowercaseL: 108, // `l`
  lowercaseM: 109, // `m`
  lowercaseN: 110, // `n`
  lowercaseO: 111, // `o`
  lowercaseP: 112, // `p`
  lowercaseQ: 113, // `q`
  lowercaseR: 114, // `r`
  lowercaseS: 115, // `s`
  lowercaseT: 116, // `t`
  lowercaseU: 117, // `u`
  lowercaseV: 118, // `v`
  lowercaseW: 119, // `w`
  lowercaseX: 120, // `x`
  lowercaseY: 121, // `y`
  lowercaseZ: 122, // `z`
  leftCurlyBrace: 123, // `{`
  verticalBar: 124, // `|`
  rightCurlyBrace: 125, // `}`
  tilde: 126, // `~`
  del: 127,
  // Unicode Specials block.
  byteOrderMarker: 65279,
  // Unicode Specials block.
  replacementCharacter: 65533 // `�`
}


/***/ }),

/***/ "./node_modules/micromark-util-symbol/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/micromark-util-symbol/constants.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constants": () => (/* binding */ constants)
/* harmony export */ });
/**
 * This module is compiled away!
 *
 * Parsing markdown comes with a couple of constants, such as minimum or maximum
 * sizes of certain sequences.
 * Additionally, there are a couple symbols used inside micromark.
 * These are all defined here, but compiled away by scripts.
 */
const constants = {
  attentionSideBefore: 1, // Symbol to mark an attention sequence as before content: `*a`
  attentionSideAfter: 2, // Symbol to mark an attention sequence as after content: `a*`
  atxHeadingOpeningFenceSizeMax: 6, // 6 number signs is fine, 7 isn’t.
  autolinkDomainSizeMax: 63, // 63 characters is fine, 64 is too many.
  autolinkSchemeSizeMax: 32, // 32 characters is fine, 33 is too many.
  cdataOpeningString: 'CDATA[', // And preceded by `<![`.
  characterGroupWhitespace: 1, // Symbol used to indicate a character is whitespace
  characterGroupPunctuation: 2, // Symbol used to indicate a character is punctuation
  characterReferenceDecimalSizeMax: 7, // `&#9999999;`.
  characterReferenceHexadecimalSizeMax: 6, // `&#xff9999;`.
  characterReferenceNamedSizeMax: 31, // `&CounterClockwiseContourIntegral;`.
  codeFencedSequenceSizeMin: 3, // At least 3 ticks or tildes are needed.
  contentTypeDocument: 'document',
  contentTypeFlow: 'flow',
  contentTypeContent: 'content',
  contentTypeString: 'string',
  contentTypeText: 'text',
  hardBreakPrefixSizeMin: 2, // At least 2 trailing spaces are needed.
  htmlRaw: 1, // Symbol for `<script>`
  htmlComment: 2, // Symbol for `<!---->`
  htmlInstruction: 3, // Symbol for `<?php?>`
  htmlDeclaration: 4, // Symbol for `<!doctype>`
  htmlCdata: 5, // Symbol for `<![CDATA[]]>`
  htmlBasic: 6, // Symbol for `<div`
  htmlComplete: 7, // Symbol for `<x>`
  htmlRawSizeMax: 8, // Length of `textarea`.
  linkResourceDestinationBalanceMax: 32, // See: <https://spec.commonmark.org/0.30/#link-destination>, <https://github.com/remarkjs/react-markdown/issues/658#issuecomment-984345577>
  linkReferenceSizeMax: 999, // See: <https://spec.commonmark.org/0.30/#link-label>
  listItemValueSizeMax: 10, // See: <https://spec.commonmark.org/0.30/#ordered-list-marker>
  numericBaseDecimal: 10,
  numericBaseHexadecimal: 0x10,
  tabSize: 4, // Tabs have a hard-coded size of 4, per CommonMark.
  thematicBreakMarkerCountMin: 3, // At least 3 asterisks, dashes, or underscores are needed.
  v8MaxSafeChunkSize: 10000 // V8 (and potentially others) have problems injecting giant arrays into other arrays, hence we operate in chunks.
}


/***/ }),

/***/ "./node_modules/micromark-util-symbol/types.js":
/*!*****************************************************!*\
  !*** ./node_modules/micromark-util-symbol/types.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "types": () => (/* binding */ types)
/* harmony export */ });
/**
 * This module is compiled away!
 *
 * Here is the list of all types of tokens exposed by micromark, with a short
 * explanation of what they include and where they are found.
 * In picking names, generally, the rule is to be as explicit as possible
 * instead of reusing names.
 * For example, there is a `definitionDestination` and a `resourceDestination`,
 * instead of one shared name.
 */

const types = {
  // Generic type for data, such as in a title, a destination, etc.
  data: 'data',

  // Generic type for syntactic whitespace (tabs, virtual spaces, spaces).
  // Such as, between a fenced code fence and an info string.
  whitespace: 'whitespace',

  // Generic type for line endings (line feed, carriage return, carriage return +
  // line feed).
  lineEnding: 'lineEnding',

  // A line ending, but ending a blank line.
  lineEndingBlank: 'lineEndingBlank',

  // Generic type for whitespace (tabs, virtual spaces, spaces) at the start of a
  // line.
  linePrefix: 'linePrefix',

  // Generic type for whitespace (tabs, virtual spaces, spaces) at the end of a
  // line.
  lineSuffix: 'lineSuffix',

  // Whole ATX heading:
  //
  // ```markdown
  // #
  // ## Alpha
  // ### Bravo ###
  // ```
  //
  // Includes `atxHeadingSequence`, `whitespace`, `atxHeadingText`.
  atxHeading: 'atxHeading',

  // Sequence of number signs in an ATX heading (`###`).
  atxHeadingSequence: 'atxHeadingSequence',

  // Content in an ATX heading (`alpha`).
  // Includes text.
  atxHeadingText: 'atxHeadingText',

  // Whole autolink (`<https://example.com>` or `<admin@example.com>`)
  // Includes `autolinkMarker` and `autolinkProtocol` or `autolinkEmail`.
  autolink: 'autolink',

  // Email autolink w/o markers (`admin@example.com`)
  autolinkEmail: 'autolinkEmail',

  // Marker around an `autolinkProtocol` or `autolinkEmail` (`<` or `>`).
  autolinkMarker: 'autolinkMarker',

  // Protocol autolink w/o markers (`https://example.com`)
  autolinkProtocol: 'autolinkProtocol',

  // A whole character escape (`\-`).
  // Includes `escapeMarker` and `characterEscapeValue`.
  characterEscape: 'characterEscape',

  // The escaped character (`-`).
  characterEscapeValue: 'characterEscapeValue',

  // A whole character reference (`&amp;`, `&#8800;`, or `&#x1D306;`).
  // Includes `characterReferenceMarker`, an optional
  // `characterReferenceMarkerNumeric`, in which case an optional
  // `characterReferenceMarkerHexadecimal`, and a `characterReferenceValue`.
  characterReference: 'characterReference',

  // The start or end marker (`&` or `;`).
  characterReferenceMarker: 'characterReferenceMarker',

  // Mark reference as numeric (`#`).
  characterReferenceMarkerNumeric: 'characterReferenceMarkerNumeric',

  // Mark reference as numeric (`x` or `X`).
  characterReferenceMarkerHexadecimal: 'characterReferenceMarkerHexadecimal',

  // Value of character reference w/o markers (`amp`, `8800`, or `1D306`).
  characterReferenceValue: 'characterReferenceValue',

  // Whole fenced code:
  //
  // ````markdown
  // ```js
  // alert(1)
  // ```
  // ````
  codeFenced: 'codeFenced',

  // A fenced code fence, including whitespace, sequence, info, and meta
  // (` ```js `).
  codeFencedFence: 'codeFencedFence',

  // Sequence of grave accent or tilde characters (` ``` `) in a fence.
  codeFencedFenceSequence: 'codeFencedFenceSequence',

  // Info word (`js`) in a fence.
  // Includes string.
  codeFencedFenceInfo: 'codeFencedFenceInfo',

  // Meta words (`highlight="1"`) in a fence.
  // Includes string.
  codeFencedFenceMeta: 'codeFencedFenceMeta',

  // A line of code.
  codeFlowValue: 'codeFlowValue',

  // Whole indented code:
  //
  // ```markdown
  //     alert(1)
  // ```
  //
  // Includes `lineEnding`, `linePrefix`, and `codeFlowValue`.
  codeIndented: 'codeIndented',

  // A text code (``` `alpha` ```).
  // Includes `codeTextSequence`, `codeTextData`, `lineEnding`, and can include
  // `codeTextPadding`.
  codeText: 'codeText',

  codeTextData: 'codeTextData',

  // A space or line ending right after or before a tick.
  codeTextPadding: 'codeTextPadding',

  // A text code fence (` `` `).
  codeTextSequence: 'codeTextSequence',

  // Whole content:
  //
  // ```markdown
  // [a]: b
  // c
  // =
  // d
  // ```
  //
  // Includes `paragraph` and `definition`.
  content: 'content',
  // Whole definition:
  //
  // ```markdown
  // [micromark]: https://github.com/micromark/micromark
  // ```
  //
  // Includes `definitionLabel`, `definitionMarker`, `whitespace`,
  // `definitionDestination`, and optionally `lineEnding` and `definitionTitle`.
  definition: 'definition',

  // Destination of a definition (`https://github.com/micromark/micromark` or
  // `<https://github.com/micromark/micromark>`).
  // Includes `definitionDestinationLiteral` or `definitionDestinationRaw`.
  definitionDestination: 'definitionDestination',

  // Enclosed destination of a definition
  // (`<https://github.com/micromark/micromark>`).
  // Includes `definitionDestinationLiteralMarker` and optionally
  // `definitionDestinationString`.
  definitionDestinationLiteral: 'definitionDestinationLiteral',

  // Markers of an enclosed definition destination (`<` or `>`).
  definitionDestinationLiteralMarker: 'definitionDestinationLiteralMarker',

  // Unenclosed destination of a definition
  // (`https://github.com/micromark/micromark`).
  // Includes `definitionDestinationString`.
  definitionDestinationRaw: 'definitionDestinationRaw',

  // Text in an destination (`https://github.com/micromark/micromark`).
  // Includes string.
  definitionDestinationString: 'definitionDestinationString',

  // Label of a definition (`[micromark]`).
  // Includes `definitionLabelMarker` and `definitionLabelString`.
  definitionLabel: 'definitionLabel',

  // Markers of a definition label (`[` or `]`).
  definitionLabelMarker: 'definitionLabelMarker',

  // Value of a definition label (`micromark`).
  // Includes string.
  definitionLabelString: 'definitionLabelString',

  // Marker between a label and a destination (`:`).
  definitionMarker: 'definitionMarker',

  // Title of a definition (`"x"`, `'y'`, or `(z)`).
  // Includes `definitionTitleMarker` and optionally `definitionTitleString`.
  definitionTitle: 'definitionTitle',

  // Marker around a title of a definition (`"`, `'`, `(`, or `)`).
  definitionTitleMarker: 'definitionTitleMarker',

  // Data without markers in a title (`z`).
  // Includes string.
  definitionTitleString: 'definitionTitleString',

  // Emphasis (`*alpha*`).
  // Includes `emphasisSequence` and `emphasisText`.
  emphasis: 'emphasis',

  // Sequence of emphasis markers (`*` or `_`).
  emphasisSequence: 'emphasisSequence',

  // Emphasis text (`alpha`).
  // Includes text.
  emphasisText: 'emphasisText',

  // The character escape marker (`\`).
  escapeMarker: 'escapeMarker',

  // A hard break created with a backslash (`\\n`).
  // Includes `escapeMarker` (does not include the line ending)
  hardBreakEscape: 'hardBreakEscape',

  // A hard break created with trailing spaces (`  \n`).
  // Does not include the line ending.
  hardBreakTrailing: 'hardBreakTrailing',

  // Flow HTML:
  //
  // ```markdown
  // <div
  // ```
  //
  // Inlcudes `lineEnding`, `htmlFlowData`.
  htmlFlow: 'htmlFlow',

  htmlFlowData: 'htmlFlowData',

  // HTML in text (the tag in `a <i> b`).
  // Includes `lineEnding`, `htmlTextData`.
  htmlText: 'htmlText',

  htmlTextData: 'htmlTextData',

  // Whole image (`![alpha](bravo)`, `![alpha][bravo]`, `![alpha][]`, or
  // `![alpha]`).
  // Includes `label` and an optional `resource` or `reference`.
  image: 'image',

  // Whole link label (`[*alpha*]`).
  // Includes `labelLink` or `labelImage`, `labelText`, and `labelEnd`.
  label: 'label',

  // Text in an label (`*alpha*`).
  // Includes text.
  labelText: 'labelText',

  // Start a link label (`[`).
  // Includes a `labelMarker`.
  labelLink: 'labelLink',

  // Start an image label (`![`).
  // Includes `labelImageMarker` and `labelMarker`.
  labelImage: 'labelImage',

  // Marker of a label (`[` or `]`).
  labelMarker: 'labelMarker',

  // Marker to start an image (`!`).
  labelImageMarker: 'labelImageMarker',

  // End a label (`]`).
  // Includes `labelMarker`.
  labelEnd: 'labelEnd',

  // Whole link (`[alpha](bravo)`, `[alpha][bravo]`, `[alpha][]`, or `[alpha]`).
  // Includes `label` and an optional `resource` or `reference`.
  link: 'link',

  // Whole paragraph:
  //
  // ```markdown
  // alpha
  // bravo.
  // ```
  //
  // Includes text.
  paragraph: 'paragraph',

  // A reference (`[alpha]` or `[]`).
  // Includes `referenceMarker` and an optional `referenceString`.
  reference: 'reference',

  // A reference marker (`[` or `]`).
  referenceMarker: 'referenceMarker',

  // Reference text (`alpha`).
  // Includes string.
  referenceString: 'referenceString',

  // A resource (`(https://example.com "alpha")`).
  // Includes `resourceMarker`, an optional `resourceDestination` with an optional
  // `whitespace` and `resourceTitle`.
  resource: 'resource',

  // A resource destination (`https://example.com`).
  // Includes `resourceDestinationLiteral` or `resourceDestinationRaw`.
  resourceDestination: 'resourceDestination',

  // A literal resource destination (`<https://example.com>`).
  // Includes `resourceDestinationLiteralMarker` and optionally
  // `resourceDestinationString`.
  resourceDestinationLiteral: 'resourceDestinationLiteral',

  // A resource destination marker (`<` or `>`).
  resourceDestinationLiteralMarker: 'resourceDestinationLiteralMarker',

  // A raw resource destination (`https://example.com`).
  // Includes `resourceDestinationString`.
  resourceDestinationRaw: 'resourceDestinationRaw',

  // Resource destination text (`https://example.com`).
  // Includes string.
  resourceDestinationString: 'resourceDestinationString',

  // A resource marker (`(` or `)`).
  resourceMarker: 'resourceMarker',

  // A resource title (`"alpha"`, `'alpha'`, or `(alpha)`).
  // Includes `resourceTitleMarker` and optionally `resourceTitleString`.
  resourceTitle: 'resourceTitle',

  // A resource title marker (`"`, `'`, `(`, or `)`).
  resourceTitleMarker: 'resourceTitleMarker',

  // Resource destination title (`alpha`).
  // Includes string.
  resourceTitleString: 'resourceTitleString',

  // Whole setext heading:
  //
  // ```markdown
  // alpha
  // bravo
  // =====
  // ```
  //
  // Includes `setextHeadingText`, `lineEnding`, `linePrefix`, and
  // `setextHeadingLine`.
  setextHeading: 'setextHeading',

  // Content in a setext heading (`alpha\nbravo`).
  // Includes text.
  setextHeadingText: 'setextHeadingText',

  // Underline in a setext heading, including whitespace suffix (`==`).
  // Includes `setextHeadingLineSequence`.
  setextHeadingLine: 'setextHeadingLine',

  // Sequence of equals or dash characters in underline in a setext heading (`-`).
  setextHeadingLineSequence: 'setextHeadingLineSequence',

  // Strong (`**alpha**`).
  // Includes `strongSequence` and `strongText`.
  strong: 'strong',

  // Sequence of strong markers (`**` or `__`).
  strongSequence: 'strongSequence',

  // Strong text (`alpha`).
  // Includes text.
  strongText: 'strongText',

  // Whole thematic break:
  //
  // ```markdown
  // * * *
  // ```
  //
  // Includes `thematicBreakSequence` and `whitespace`.
  thematicBreak: 'thematicBreak',

  // A sequence of one or more thematic break markers (`***`).
  thematicBreakSequence: 'thematicBreakSequence',

  // Whole block quote:
  //
  // ```markdown
  // > a
  // >
  // > b
  // ```
  //
  // Includes `blockQuotePrefix` and flow.
  blockQuote: 'blockQuote',
  // The `>` or `> ` of a block quote.
  blockQuotePrefix: 'blockQuotePrefix',
  // The `>` of a block quote prefix.
  blockQuoteMarker: 'blockQuoteMarker',
  // The optional ` ` of a block quote prefix.
  blockQuotePrefixWhitespace: 'blockQuotePrefixWhitespace',

  // Whole unordered list:
  //
  // ```markdown
  // - a
  //   b
  // ```
  //
  // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
  // lines.
  listOrdered: 'listOrdered',

  // Whole ordered list:
  //
  // ```markdown
  // 1. a
  //    b
  // ```
  //
  // Includes `listItemPrefix`, flow, and optionally  `listItemIndent` on further
  // lines.
  listUnordered: 'listUnordered',

  // The indent of further list item lines.
  listItemIndent: 'listItemIndent',

  // A marker, as in, `*`, `+`, `-`, `.`, or `)`.
  listItemMarker: 'listItemMarker',

  // The thing that starts a list item, such as `1. `.
  // Includes `listItemValue` if ordered, `listItemMarker`, and
  // `listItemPrefixWhitespace` (unless followed by a line ending).
  listItemPrefix: 'listItemPrefix',

  // The whitespace after a marker.
  listItemPrefixWhitespace: 'listItemPrefixWhitespace',

  // The numerical value of an ordered item.
  listItemValue: 'listItemValue',

  // Internal types used for subtokenizers, compiled away
  chunkDocument: 'chunkDocument',
  chunkContent: 'chunkContent',
  chunkFlow: 'chunkFlow',
  chunkText: 'chunkText',
  chunkString: 'chunkString'
}


/***/ }),

/***/ "./node_modules/micromark-util-symbol/values.js":
/*!******************************************************!*\
  !*** ./node_modules/micromark-util-symbol/values.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "values": () => (/* binding */ values)
/* harmony export */ });
// This module is compiled away!
//
// While micromark works based on character codes, this module includes the
// string versions of ’em.
// The C0 block, except for LF, CR, HT, and w/ the replacement character added,
// are available here.
const values = {
  ht: '\t',
  lf: '\n',
  cr: '\r',
  space: ' ',
  exclamationMark: '!',
  quotationMark: '"',
  numberSign: '#',
  dollarSign: '$',
  percentSign: '%',
  ampersand: '&',
  apostrophe: "'",
  leftParenthesis: '(',
  rightParenthesis: ')',
  asterisk: '*',
  plusSign: '+',
  comma: ',',
  dash: '-',
  dot: '.',
  slash: '/',
  digit0: '0',
  digit1: '1',
  digit2: '2',
  digit3: '3',
  digit4: '4',
  digit5: '5',
  digit6: '6',
  digit7: '7',
  digit8: '8',
  digit9: '9',
  colon: ':',
  semicolon: ';',
  lessThan: '<',
  equalsTo: '=',
  greaterThan: '>',
  questionMark: '?',
  atSign: '@',
  uppercaseA: 'A',
  uppercaseB: 'B',
  uppercaseC: 'C',
  uppercaseD: 'D',
  uppercaseE: 'E',
  uppercaseF: 'F',
  uppercaseG: 'G',
  uppercaseH: 'H',
  uppercaseI: 'I',
  uppercaseJ: 'J',
  uppercaseK: 'K',
  uppercaseL: 'L',
  uppercaseM: 'M',
  uppercaseN: 'N',
  uppercaseO: 'O',
  uppercaseP: 'P',
  uppercaseQ: 'Q',
  uppercaseR: 'R',
  uppercaseS: 'S',
  uppercaseT: 'T',
  uppercaseU: 'U',
  uppercaseV: 'V',
  uppercaseW: 'W',
  uppercaseX: 'X',
  uppercaseY: 'Y',
  uppercaseZ: 'Z',
  leftSquareBracket: '[',
  backslash: '\\',
  rightSquareBracket: ']',
  caret: '^',
  underscore: '_',
  graveAccent: '`',
  lowercaseA: 'a',
  lowercaseB: 'b',
  lowercaseC: 'c',
  lowercaseD: 'd',
  lowercaseE: 'e',
  lowercaseF: 'f',
  lowercaseG: 'g',
  lowercaseH: 'h',
  lowercaseI: 'i',
  lowercaseJ: 'j',
  lowercaseK: 'k',
  lowercaseL: 'l',
  lowercaseM: 'm',
  lowercaseN: 'n',
  lowercaseO: 'o',
  lowercaseP: 'p',
  lowercaseQ: 'q',
  lowercaseR: 'r',
  lowercaseS: 's',
  lowercaseT: 't',
  lowercaseU: 'u',
  lowercaseV: 'v',
  lowercaseW: 'w',
  lowercaseX: 'x',
  lowercaseY: 'y',
  lowercaseZ: 'z',
  leftCurlyBrace: '{',
  verticalBar: '|',
  rightCurlyBrace: '}',
  tilde: '~',
  replacementCharacter: '�'
}


/***/ }),

/***/ "./node_modules/micromark/dev/lib/constructs.js":
/*!******************************************************!*\
  !*** ./node_modules/micromark/dev/lib/constructs.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attentionMarkers": () => (/* binding */ attentionMarkers),
/* harmony export */   "contentInitial": () => (/* binding */ contentInitial),
/* harmony export */   "disable": () => (/* binding */ disable),
/* harmony export */   "document": () => (/* binding */ document),
/* harmony export */   "flow": () => (/* binding */ flow),
/* harmony export */   "flowInitial": () => (/* binding */ flowInitial),
/* harmony export */   "insideSpan": () => (/* binding */ insideSpan),
/* harmony export */   "string": () => (/* binding */ string),
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/list.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/block-quote.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/definition.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/code-indented.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/heading-atx.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/thematic-break.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/setext-underline.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/html-flow.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/code-fenced.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/character-reference.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/character-escape.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/line-ending.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/label-start-image.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/attention.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/autolink.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/html-text.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/label-start-link.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/hard-break-escape.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/label-end.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/code-text.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var _initialize_text_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./initialize/text.js */ "./node_modules/micromark/dev/lib/initialize/text.js");
/**
 * @typedef {import('micromark-util-types').Extension} Extension
 */





/** @type {Extension['document']} */
const document = {
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.asterisk]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.plusSign]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.dash]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit0]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit1]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit2]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit3]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit4]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit5]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit6]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit7]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit8]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.digit9]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.list,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.greaterThan]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_2__.blockQuote
}

/** @type {Extension['contentInitial']} */
const contentInitial = {
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.leftSquareBracket]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_3__.definition
}

/** @type {Extension['flowInitial']} */
const flowInitial = {
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.horizontalTab]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_4__.codeIndented,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.virtualSpace]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_4__.codeIndented,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.space]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_4__.codeIndented
}

/** @type {Extension['flow']} */
const flow = {
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.numberSign]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_5__.headingAtx,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.asterisk]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_6__.thematicBreak,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.dash]: [micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_7__.setextUnderline, micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_6__.thematicBreak],
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lessThan]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_8__.htmlFlow,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.equalsTo]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_7__.setextUnderline,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.underscore]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_6__.thematicBreak,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.graveAccent]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_9__.codeFenced,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.tilde]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_9__.codeFenced
}

/** @type {Extension['string']} */
const string = {
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.ampersand]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_10__.characterReference,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.backslash]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_11__.characterEscape
}

/** @type {Extension['text']} */
const text = {
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.carriageReturn]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_12__.lineEnding,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lineFeed]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_12__.lineEnding,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.carriageReturnLineFeed]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_12__.lineEnding,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.exclamationMark]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_13__.labelStartImage,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.ampersand]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_10__.characterReference,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.asterisk]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_14__.attention,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lessThan]: [micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_15__.autolink, micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_16__.htmlText],
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.leftSquareBracket]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_17__.labelStartLink,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.backslash]: [micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_18__.hardBreakEscape, micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_11__.characterEscape],
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.rightSquareBracket]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_19__.labelEnd,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.underscore]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_14__.attention,
  [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.graveAccent]: micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_20__.codeText
}

/** @type {Extension['insideSpan']} */
const insideSpan = {null: [micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_14__.attention, _initialize_text_js__WEBPACK_IMPORTED_MODULE_21__.resolver]}

/** @type {Extension['attentionMarkers']} */
const attentionMarkers = {null: [micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.asterisk, micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.underscore]}

/** @type {Extension['disable']} */
const disable = {null: []}


/***/ }),

/***/ "./node_modules/micromark/dev/lib/create-tokenizer.js":
/*!************************************************************!*\
  !*** ./node_modules/micromark/dev/lib/create-tokenizer.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTokenizer": () => (/* binding */ createTokenizer)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/micromark/node_modules/debug/src/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-chunked */ "./node_modules/micromark-util-chunked/dev/index.js");
/* harmony import */ var micromark_util_resolve_all__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-resolve-all */ "./node_modules/micromark-util-resolve-all/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! micromark-util-symbol/values.js */ "./node_modules/micromark-util-symbol/values.js");
/**
 * @typedef {import('micromark-util-types').Code} Code
 * @typedef {import('micromark-util-types').Chunk} Chunk
 * @typedef {import('micromark-util-types').Point} Point
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').Effects} Effects
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
 * @typedef {import('micromark-util-types').ConstructRecord} ConstructRecord
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').ParseContext} ParseContext
 */

/**
 * @typedef Info
 * @property {() => void} restore
 * @property {number} from
 *
 * @callback ReturnHandle
 *   Handle a successful run.
 * @param {Construct} construct
 * @param {Info} info
 * @returns {void}
 */









const debug = debug__WEBPACK_IMPORTED_MODULE_1__('micromark')

/**
 * Create a tokenizer.
 * Tokenizers deal with one type of data (e.g., containers, flow, text).
 * The parser is the object dealing with it all.
 * `initialize` works like other constructs, except that only its `tokenize`
 * function is used, in which case it doesn’t receive an `ok` or `nok`.
 * `from` can be given to set the point before the first character, although
 * when further lines are indented, they must be set with `defineSkip`.
 *
 * @param {ParseContext} parser
 * @param {InitialConstruct} initialize
 * @param {Omit<Point, '_index'|'_bufferIndex'>} [from]
 * @returns {TokenizeContext}
 */
function createTokenizer(parser, initialize, from) {
  /** @type {Point} */
  let point = Object.assign(
    from ? Object.assign({}, from) : {line: 1, column: 1, offset: 0},
    {_index: 0, _bufferIndex: -1}
  )
  /** @type {Record<string, number>} */
  const columnStart = {}
  /** @type {Construct[]} */
  const resolveAllConstructs = []
  /** @type {Chunk[]} */
  let chunks = []
  /** @type {Token[]} */
  let stack = []
  /** @type {boolean|undefined} */
  let consumed = true

  /**
   * Tools used for tokenizing.
   *
   * @type {Effects}
   */
  const effects = {
    consume,
    enter,
    exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {interrupt: true})
  }

  /**
   * State and tools for resolving and serializing.
   *
   * @type {TokenizeContext}
   */
  const context = {
    previous: micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof,
    code: micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  }

  /**
   * The state function.
   *
   * @type {State|void}
   */
  let state = initialize.tokenize.call(context, effects)

  /**
   * Track which character we expect to be consumed, to catch bugs.
   *
   * @type {Code}
   */
  let expectedCode

  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize)
  }

  return context

  /** @type {TokenizeContext['write']} */
  function write(slice) {
    chunks = (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_3__.push)(chunks, slice)

    main()

    // Exit if we’re not done, resolve might change stuff.
    if (chunks[chunks.length - 1] !== micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.eof) {
      return []
    }

    addResult(initialize, 0)

    // Otherwise, resolve, and exit.
    context.events = (0,micromark_util_resolve_all__WEBPACK_IMPORTED_MODULE_4__.resolveAll)(resolveAllConstructs, context.events, context)

    return context.events
  }

  //
  // Tools.
  //

  /** @type {TokenizeContext['sliceSerialize']} */
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs)
  }

  /** @type {TokenizeContext['sliceStream']} */
  function sliceStream(token) {
    return sliceChunks(chunks, token)
  }

  /** @type {TokenizeContext['now']} */
  function now() {
    return Object.assign({}, point)
  }

  /** @type {TokenizeContext['defineSkip']} */
  function defineSkip(value) {
    columnStart[value.line] = value.column
    accountForPotentialSkip()
    debug('position: define skip: `%j`', point)
  }

  //
  // State management.
  //

  /**
   * Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
   * `consume`).
   * Here is where we walk through the chunks, which either include strings of
   * several characters, or numerical character codes.
   * The reason to do this in a loop instead of a call is so the stack can
   * drain.
   *
   * @returns {void}
   */
  function main() {
    /** @type {number} */
    let chunkIndex

    while (point._index < chunks.length) {
      const chunk = chunks[point._index]

      // If we’re in a buffer chunk, loop through it.
      if (typeof chunk === 'string') {
        chunkIndex = point._index

        if (point._bufferIndex < 0) {
          point._bufferIndex = 0
        }

        while (
          point._index === chunkIndex &&
          point._bufferIndex < chunk.length
        ) {
          go(chunk.charCodeAt(point._bufferIndex))
        }
      } else {
        go(chunk)
      }
    }
  }

  /**
   * Deal with one code.
   *
   * @param {Code} code
   * @returns {void}
   */
  function go(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(consumed === true, 'expected character to be consumed')
    consumed = undefined
    debug('main: passing `%s` to %s', code, state && state.name)
    expectedCode = code
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(typeof state === 'function', 'expected state')
    state = state(code)
  }

  /** @type {Effects['consume']} */
  function consume(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === expectedCode, 'expected given code to equal expected code')

    debug('consume: `%s`', code)

    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      consumed === undefined,
      'expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used'
    )
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code === null
        ? context.events.length === 0 ||
            context.events[context.events.length - 1][0] === 'exit'
        : context.events[context.events.length - 1][0] === 'enter',
      'expected last token to be open'
    )

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code)) {
      point.line++
      point.column = 1
      point.offset += code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.carriageReturnLineFeed ? 2 : 1
      accountForPotentialSkip()
      debug('position: after eol: `%j`', point)
    } else if (code !== micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.virtualSpace) {
      point.column++
      point.offset++
    }

    // Not in a string chunk.
    if (point._bufferIndex < 0) {
      point._index++
    } else {
      point._bufferIndex++

      // At end of string chunk.
      // @ts-expect-error Points w/ non-negative `_bufferIndex` reference
      // strings.
      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1
        point._index++
      }
    }

    // Expose the previous character.
    context.previous = code

    // Mark as consumed.
    consumed = true
  }

  /** @type {Effects['enter']} */
  function enter(type, fields) {
    /** @type {Token} */
    // @ts-expect-error Patch instead of assign required fields to help GC.
    const token = fields || {}
    token.type = type
    token.start = now()

    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(typeof type === 'string', 'expected string type')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(type.length > 0, 'expected non-empty string')
    debug('enter: `%s`', type)

    context.events.push(['enter', token, context])

    stack.push(token)

    return token
  }

  /** @type {Effects['exit']} */
  function exit(type) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(typeof type === 'string', 'expected string type')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(type.length > 0, 'expected non-empty string')

    const token = stack.pop()
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(token, 'cannot close w/o open tokens')
    token.end = now()

    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(type === token.type, 'expected exit token to match current token')

    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      !(
        token.start._index === token.end._index &&
        token.start._bufferIndex === token.end._bufferIndex
      ),
      'expected non-empty token (`' + type + '`)'
    )

    debug('exit: `%s`', token.type)
    context.events.push(['exit', token, context])

    return token
  }

  /**
   * Use results.
   *
   * @type {ReturnHandle}
   */
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from)
  }

  /**
   * Discard results.
   *
   * @type {ReturnHandle}
   */
  function onsuccessfulcheck(_, info) {
    info.restore()
  }

  /**
   * Factory to attempt/check/interrupt.
   *
   * @param {ReturnHandle} onreturn
   * @param {Record<string, unknown>} [fields]
   */
  function constructFactory(onreturn, fields) {
    return hook

    /**
     * Handle either an object mapping codes to constructs, a list of
     * constructs, or a single construct.
     *
     * @param {Construct|Construct[]|ConstructRecord} constructs
     * @param {State} returnState
     * @param {State} [bogusState]
     * @returns {State}
     */
    function hook(constructs, returnState, bogusState) {
      /** @type {Construct[]} */
      let listOfConstructs
      /** @type {number} */
      let constructIndex
      /** @type {Construct} */
      let currentConstruct
      /** @type {Info} */
      let info

      return Array.isArray(constructs)
        ? /* c8 ignore next 1 */
          handleListOfConstructs(constructs)
        : 'tokenize' in constructs
        ? // @ts-expect-error Looks like a construct.
          handleListOfConstructs([constructs])
        : handleMapOfConstructs(constructs)

      /**
       * Handle a list of construct.
       *
       * @param {ConstructRecord} map
       * @returns {State}
       */
      function handleMapOfConstructs(map) {
        return start

        /** @type {State} */
        function start(code) {
          const def = code !== null && map[code]
          const all = code !== null && map.null
          const list = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...(Array.isArray(def) ? def : def ? [def] : []),
            ...(Array.isArray(all) ? all : all ? [all] : [])
          ]

          return handleListOfConstructs(list)(code)
        }
      }

      /**
       * Handle a list of construct.
       *
       * @param {Construct[]} list
       * @returns {State}
       */
      function handleListOfConstructs(list) {
        listOfConstructs = list
        constructIndex = 0

        if (list.length === 0) {
          (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(bogusState, 'expected `bogusState` to be given')
          return bogusState
        }

        return handleConstruct(list[constructIndex])
      }

      /**
       * Handle a single construct.
       *
       * @param {Construct} construct
       * @returns {State}
       */
      function handleConstruct(construct) {
        return start

        /** @type {State} */
        function start(code) {
          // To do: not needed to store if there is no bogus state, probably?
          // Currently doesn’t work because `inspect` in document does a check
          // w/o a bogus, which doesn’t make sense. But it does seem to help perf
          // by not storing.
          info = store()
          currentConstruct = construct

          if (!construct.partial) {
            context.currentConstruct = construct
          }

          if (
            construct.name &&
            context.parser.constructs.disable.null.includes(construct.name)
          ) {
            return nok(code)
          }

          return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok,
            nok
          )(code)
        }
      }

      /** @type {State} */
      function ok(code) {
        (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === expectedCode, 'expected code')
        consumed = true
        onreturn(currentConstruct, info)
        return returnState
      }

      /** @type {State} */
      function nok(code) {
        (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === expectedCode, 'expected code')
        consumed = true
        info.restore()

        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex])
        }

        return bogusState
      }
    }
  }

  /**
   * @param {Construct} construct
   * @param {number} from
   * @returns {void}
   */
  function addResult(construct, from) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct)
    }

    if (construct.resolve) {
      (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_3__.splice)(
        context.events,
        from,
        context.events.length - from,
        construct.resolve(context.events.slice(from), context)
      )
    }

    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context)
    }

    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      construct.partial ||
        context.events.length === 0 ||
        context.events[context.events.length - 1][0] === 'exit',
      'expected last token to end'
    )
  }

  /**
   * Store state.
   *
   * @returns {Info}
   */
  function store() {
    const startPoint = now()
    const startPrevious = context.previous
    const startCurrentConstruct = context.currentConstruct
    const startEventsIndex = context.events.length
    const startStack = Array.from(stack)

    return {restore, from: startEventsIndex}

    /**
     * Restore state.
     *
     * @returns {void}
     */
    function restore() {
      point = startPoint
      context.previous = startPrevious
      context.currentConstruct = startCurrentConstruct
      context.events.length = startEventsIndex
      stack = startStack
      accountForPotentialSkip()
      debug('position: restore: `%j`', point)
    }
  }

  /**
   * Move the current point a bit forward in the line when it’s on a column
   * skip.
   *
   * @returns {void}
   */
  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line]
      point.offset += columnStart[point.line] - 1
    }
  }
}

/**
 * Get the chunks from a slice of chunks in the range of a token.
 *
 * @param {Chunk[]} chunks
 * @param {Pick<Token, 'start'|'end'>} token
 * @returns {Chunk[]}
 */
function sliceChunks(chunks, token) {
  const startIndex = token.start._index
  const startBufferIndex = token.start._bufferIndex
  const endIndex = token.end._index
  const endBufferIndex = token.end._bufferIndex
  /** @type {Chunk[]} */
  let view

  if (startIndex === endIndex) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(endBufferIndex > -1, 'expected non-negative end buffer index')
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(startBufferIndex > -1, 'expected non-negative start buffer index')
    // @ts-expect-error `_bufferIndex` is used on string chunks.
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)]
  } else {
    view = chunks.slice(startIndex, endIndex)

    if (startBufferIndex > -1) {
      // @ts-expect-error `_bufferIndex` is used on string chunks.
      view[0] = view[0].slice(startBufferIndex)
    }

    if (endBufferIndex > 0) {
      // @ts-expect-error `_bufferIndex` is used on string chunks.
      view.push(chunks[endIndex].slice(0, endBufferIndex))
    }
  }

  return view
}

/**
 * Get the string value of a slice of chunks.
 *
 * @param {Chunk[]} chunks
 * @param {boolean} [expandTabs=false]
 * @returns {string}
 */
function serializeChunks(chunks, expandTabs) {
  let index = -1
  /** @type {string[]} */
  const result = []
  /** @type {boolean|undefined} */
  let atTab

  while (++index < chunks.length) {
    const chunk = chunks[index]
    /** @type {string} */
    let value

    if (typeof chunk === 'string') {
      value = chunk
    } else
      switch (chunk) {
        case micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.carriageReturn: {
          value = micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_6__.values.cr

          break
        }

        case micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.lineFeed: {
          value = micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_6__.values.lf

          break
        }

        case micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.carriageReturnLineFeed: {
          value = micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_6__.values.cr + micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_6__.values.lf

          break
        }

        case micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.horizontalTab: {
          value = expandTabs ? micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_6__.values.space : micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_6__.values.ht

          break
        }

        case micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.virtualSpace: {
          if (!expandTabs && atTab) continue
          value = micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_6__.values.space

          break
        }

        default: {
          (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(typeof chunk === 'number', 'expected number')
          // Currently only replacement character.
          value = String.fromCharCode(chunk)
        }
      }

    atTab = chunk === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_2__.codes.horizontalTab
    result.push(value)
  }

  return result.join('')
}


/***/ }),

/***/ "./node_modules/micromark/dev/lib/initialize/content.js":
/*!**************************************************************!*\
  !*** ./node_modules/micromark/dev/lib/initialize/content.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "content": () => (/* binding */ content)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
 * @typedef {import('micromark-util-types').Initializer} Initializer
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').State} State
 */








/** @type {InitialConstruct} */
const content = {tokenize: initializeContent}

/** @type {Initializer} */
function initializeContent(effects) {
  const contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  )
  /** @type {Token} */
  let previous

  return contentStart

  /** @type {State} */
  function afterContentStartConstruct(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_2__.markdownLineEnding)(code),
      'expected eol or eof'
    )

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof) {
      effects.consume(code)
      return
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.lineEnding)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.lineEnding)
    return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_4__.factorySpace)(effects, contentStart, micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.linePrefix)
  }

  /** @type {State} */
  function paragraphInitial(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code !== micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof && !(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_2__.markdownLineEnding)(code),
      'expected anything other than a line ending or EOF'
    )
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.paragraph)
    return lineStart(code)
  }

  /** @type {State} */
  function lineStart(code) {
    const token = effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.chunkText, {
      contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_5__.constants.contentTypeText,
      previous
    })

    if (previous) {
      previous.next = token
    }

    previous = token

    return data(code)
  }

  /** @type {State} */
  function data(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof) {
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.chunkText)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.paragraph)
      effects.consume(code)
      return
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_2__.markdownLineEnding)(code)) {
      effects.consume(code)
      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_3__.types.chunkText)
      return lineStart
    }

    // Data.
    effects.consume(code)
    return data
  }
}


/***/ }),

/***/ "./node_modules/micromark/dev/lib/initialize/document.js":
/*!***************************************************************!*\
  !*** ./node_modules/micromark/dev/lib/initialize/document.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "document": () => (/* binding */ document)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-chunked */ "./node_modules/micromark-util-chunked/dev/index.js");
/**
 * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
 * @typedef {import('micromark-util-types').Initializer} Initializer
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Point} Point
 */

/**
 * @typedef {Record<string, unknown>} StackState
 * @typedef {[Construct, StackState]} StackItem
 */









/** @type {InitialConstruct} */
const document = {tokenize: initializeDocument}

/** @type {Construct} */
const containerConstruct = {tokenize: tokenizeContainer}

/** @type {Initializer} */
function initializeDocument(effects) {
  const self = this
  /** @type {StackItem[]} */
  const stack = []
  let continued = 0
  /** @type {TokenizeContext|undefined} */
  let childFlow
  /** @type {Token|undefined} */
  let childToken
  /** @type {number} */
  let lineStartOffset

  return start

  /** @type {State} */
  function start(code) {
    // First we iterate through the open blocks, starting with the root
    // document, and descending through last children down to the last open
    // block.
    // Each block imposes a condition that the line must satisfy if the block is
    // to remain open.
    // For example, a block quote requires a `>` character.
    // A paragraph requires a non-blank line.
    // In this phase we may match all or just some of the open blocks.
    // But we cannot close unmatched blocks yet, because we may have a lazy
    // continuation line.
    if (continued < stack.length) {
      const item = stack[continued]
      self.containerState = item[1]
      ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
        item[0].continuation,
        'expected `continuation` to be defined on container construct'
      )
      return effects.attempt(
        item[0].continuation,
        documentContinue,
        checkNewContainers
      )(code)
    }

    // Done.
    return checkNewContainers(code)
  }

  /** @type {State} */
  function documentContinue(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      self.containerState,
      'expected `containerState` to be defined after continuation'
    )

    continued++

    // Note: this field is called `_closeFlow` but it also closes containers.
    // Perhaps a good idea to rename it but it’s already used in the wild by
    // extensions.
    if (self.containerState._closeFlow) {
      self.containerState._closeFlow = undefined

      if (childFlow) {
        closeFlow()
      }

      // Note: this algorithm for moving events around is similar to the
      // algorithm when dealing with lazy lines in `writeToChild`.
      const indexBeforeExits = self.events.length
      let indexBeforeFlow = indexBeforeExits
      /** @type {Point|undefined} */
      let point

      // Find the flow chunk.
      while (indexBeforeFlow--) {
        if (
          self.events[indexBeforeFlow][0] === 'exit' &&
          self.events[indexBeforeFlow][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkFlow
        ) {
          point = self.events[indexBeforeFlow][1].end
          break
        }
      }

      (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(point, 'could not find previous flow chunk')

      exitContainers(continued)

      // Fix positions.
      let index = indexBeforeExits

      while (index < self.events.length) {
        self.events[index][1].end = Object.assign({}, point)
        index++
      }

      // Inject the exits earlier (they’re still also at the end).
      (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.splice)(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      )

      // Discard the duplicate exits.
      self.events.length = index

      return checkNewContainers(code)
    }

    return start(code)
  }

  /** @type {State} */
  function checkNewContainers(code) {
    // Next, after consuming the continuation markers for existing blocks, we
    // look for new block starts (e.g. `>` for a block quote).
    // If we encounter a new block start, we close any blocks unmatched in
    // step 1 before creating the new block as a child of the last matched
    // block.
    if (continued === stack.length) {
      // No need to `check` whether there’s a container, of `exitContainers`
      // would be moot.
      // We can instead immediately `attempt` to parse one.
      if (!childFlow) {
        return documentContinued(code)
      }

      // If we have concrete content, such as block HTML or fenced code,
      // we can’t have containers “pierce” into them, so we can immediately
      // start.
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code)
      }

      // If we do have flow, it could still be a blank line,
      // but we’d be interrupting it w/ a new container if there’s a current
      // construct.
      self.interrupt = Boolean(
        childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack
      )
    }

    // Check if there is a new container.
    self.containerState = {}
    return effects.check(
      containerConstruct,
      thereIsANewContainer,
      thereIsNoNewContainer
    )(code)
  }

  /** @type {State} */
  function thereIsANewContainer(code) {
    if (childFlow) closeFlow()
    exitContainers(continued)
    return documentContinued(code)
  }

  /** @type {State} */
  function thereIsNoNewContainer(code) {
    self.parser.lazy[self.now().line] = continued !== stack.length
    lineStartOffset = self.now().offset
    return flowStart(code)
  }

  /** @type {State} */
  function documentContinued(code) {
    // Try new containers.
    self.containerState = {}
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code)
  }

  /** @type {State} */
  function containerContinue(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      self.currentConstruct,
      'expected `currentConstruct` to be defined on tokenizer'
    )
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      self.containerState,
      'expected `containerState` to be defined on tokenizer'
    )
    continued++
    stack.push([self.currentConstruct, self.containerState])
    // Try another.
    return documentContinued(code)
  }

  /** @type {State} */
  function flowStart(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__.codes.eof) {
      if (childFlow) closeFlow()
      exitContainers(0)
      effects.consume(code)
      return
    }

    childFlow = childFlow || self.parser.flow(self.now())
    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkFlow, {
      contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_4__.constants.contentTypeFlow,
      previous: childToken,
      _tokenizer: childFlow
    })

    return flowContinue(code)
  }

  /** @type {State} */
  function flowContinue(code) {
    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__.codes.eof) {
      writeToChild(effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkFlow), true)
      exitContainers(0)
      effects.consume(code)
      return
    }

    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_5__.markdownLineEnding)(code)) {
      effects.consume(code)
      writeToChild(effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkFlow))
      // Get ready for the next line.
      continued = 0
      self.interrupt = undefined
      return start
    }

    effects.consume(code)
    return flowContinue
  }

  /**
   * @param {Token} token
   * @param {boolean} [eof]
   * @returns {void}
   */
  function writeToChild(token, eof) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(childFlow, 'expected `childFlow` to be defined when continuing')
    const stream = self.sliceStream(token)
    if (eof) stream.push(null)
    token.previous = childToken
    if (childToken) childToken.next = token
    childToken = token
    childFlow.defineSkip(token.start)
    childFlow.write(stream)

    // Alright, so we just added a lazy line:
    //
    // ```markdown
    // > a
    // b.
    //
    // Or:
    //
    // > ~~~c
    // d
    //
    // Or:
    //
    // > | e |
    // f
    // ```
    //
    // The construct in the second example (fenced code) does not accept lazy
    // lines, so it marked itself as done at the end of its first line, and
    // then the content construct parses `d`.
    // Most constructs in markdown match on the first line: if the first line
    // forms a construct, a non-lazy line can’t “unmake” it.
    //
    // The construct in the third example is potentially a GFM table, and
    // those are *weird*.
    // It *could* be a table, from the first line, if the following line
    // matches a condition.
    // In this case, that second line is lazy, which “unmakes” the first line
    // and turns the whole into one content block.
    //
    // We’ve now parsed the non-lazy and the lazy line, and can figure out
    // whether the lazy line started a new flow block.
    // If it did, we exit the current containers between the two flow blocks.
    if (self.parser.lazy[token.start.line]) {
      let index = childFlow.events.length

      while (index--) {
        if (
          // The token starts before the line ending…
          childFlow.events[index][1].start.offset < lineStartOffset &&
          // …and either is not ended yet…
          (!childFlow.events[index][1].end ||
            // …or ends after it.
            childFlow.events[index][1].end.offset > lineStartOffset)
        ) {
          // Exit: there’s still something open, which means it’s a lazy line
          // part of something.
          return
        }
      }

      // Note: this algorithm for moving events around is similar to the
      // algorithm when closing flow in `documentContinue`.
      const indexBeforeExits = self.events.length
      let indexBeforeFlow = indexBeforeExits
      /** @type {boolean|undefined} */
      let seen
      /** @type {Point|undefined} */
      let point

      // Find the previous chunk (the one before the lazy line).
      while (indexBeforeFlow--) {
        if (
          self.events[indexBeforeFlow][0] === 'exit' &&
          self.events[indexBeforeFlow][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkFlow
        ) {
          if (seen) {
            point = self.events[indexBeforeFlow][1].end
            break
          }

          seen = true
        }
      }

      (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(point, 'could not find previous flow chunk')

      exitContainers(continued)

      // Fix positions.
      index = indexBeforeExits

      while (index < self.events.length) {
        self.events[index][1].end = Object.assign({}, point)
        index++
      }

      // Inject the exits earlier (they’re still also at the end).
      (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.splice)(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      )

      // Discard the duplicate exits.
      self.events.length = index
    }
  }

  /**
   * @param {number} size
   * @returns {void}
   */
  function exitContainers(size) {
    let index = stack.length

    // Exit open containers.
    while (index-- > size) {
      const entry = stack[index]
      self.containerState = entry[1]
      ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
        entry[0].exit,
        'expected `exit` to be defined on container construct'
      )
      entry[0].exit.call(self, effects)
    }

    stack.length = size
  }

  function closeFlow() {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      self.containerState,
      'expected `containerState` to be defined when closing flow'
    )
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(childFlow, 'expected `childFlow` to be defined when closing it')
    childFlow.write([micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__.codes.eof])
    childToken = undefined
    childFlow = undefined
    self.containerState._closeFlow = undefined
  }
}

/** @type {Tokenizer} */
function tokenizeContainer(effects, ok, nok) {
  return (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_6__.factorySpace)(
    effects,
    effects.attempt(this.parser.constructs.document, ok, nok),
    micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.linePrefix,
    this.parser.constructs.disable.null.includes('codeIndented')
      ? undefined
      : micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_4__.constants.tabSize
  )
}


/***/ }),

/***/ "./node_modules/micromark/dev/lib/initialize/flow.js":
/*!***********************************************************!*\
  !*** ./node_modules/micromark/dev/lib/initialize/flow.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "flow": () => (/* binding */ flow)
/* harmony export */ });
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ "./node_modules/uvu/assert/index.mjs");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/blank-line.js");
/* harmony import */ var micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-core-commonmark */ "./node_modules/micromark-core-commonmark/dev/lib/content.js");
/* harmony import */ var micromark_factory_space__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-factory-space */ "./node_modules/micromark-factory-space/dev/index.js");
/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! micromark-util-character */ "./node_modules/micromark-util-character/dev/index.js");
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
 * @typedef {import('micromark-util-types').Initializer} Initializer
 * @typedef {import('micromark-util-types').State} State
 */








/** @type {InitialConstruct} */
const flow = {tokenize: initializeFlow}

/** @type {Initializer} */
function initializeFlow(effects) {
  const self = this
  const initial = effects.attempt(
    // Try to parse a blank line.
    micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_1__.blankLine,
    atBlankEnding,
    // Try to parse initial flow (essentially, only code).
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      (0,micromark_factory_space__WEBPACK_IMPORTED_MODULE_2__.factorySpace)(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(micromark_core_commonmark__WEBPACK_IMPORTED_MODULE_3__.content, afterConstruct)
        ),
        micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.linePrefix
      )
    )
  )

  return initial

  /** @type {State} */
  function atBlankEnding(code) {
    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_6__.markdownLineEnding)(code),
      'expected eol or eof'
    )

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__.codes.eof) {
      effects.consume(code)
      return
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEndingBlank)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEndingBlank)
    self.currentConstruct = undefined
    return initial
  }

  /** @type {State} */
  function afterConstruct(code) {
    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(
      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_6__.markdownLineEnding)(code),
      'expected eol or eof'
    )

    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_5__.codes.eof) {
      effects.consume(code)
      return
    }

    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)
    effects.consume(code)
    effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)
    self.currentConstruct = undefined
    return initial
  }
}


/***/ }),

/***/ "./node_modules/micromark/dev/lib/initialize/text.js":
/*!***********************************************************!*\
  !*** ./node_modules/micromark/dev/lib/initialize/text.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolver": () => (/* binding */ resolver),
/* harmony export */   "string": () => (/* binding */ string),
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ "./node_modules/micromark-util-symbol/types.js");
/**
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').Initializer} Initializer
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Code} Code
 */





const resolver = {resolveAll: createResolver()}
const string = initializeFactory('string')
const text = initializeFactory('text')

/**
 * @param {'string'|'text'} field
 * @returns {InitialConstruct}
 */
function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === 'text' ? resolveAllLineSuffixes : undefined
    )
  }

  /** @type {Initializer} */
  function initializeText(effects) {
    const self = this
    const constructs = this.parser.constructs[field]
    const text = effects.attempt(constructs, start, notText)

    return start

    /** @type {State} */
    function start(code) {
      return atBreak(code) ? text(code) : notText(code)
    }

    /** @type {State} */
    function notText(code) {
      if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.eof) {
        effects.consume(code)
        return
      }

      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.data)
      effects.consume(code)
      return data
    }

    /** @type {State} */
    function data(code) {
      if (atBreak(code)) {
        effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.data)
        return text(code)
      }

      // Data.
      effects.consume(code)
      return data
    }

    /**
     * @param {Code} code
     * @returns {boolean}
     */
    function atBreak(code) {
      if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.eof) {
        return true
      }

      const list = constructs[code]
      let index = -1

      if (list) {
        while (++index < list.length) {
          const item = list[index]
          if (!item.previous || item.previous.call(self, self.previous)) {
            return true
          }
        }
      }

      return false
    }
  }
}

/**
 * @param {Resolver} [extraResolver]
 * @returns {Resolver}
 */
function createResolver(extraResolver) {
  return resolveAllText

  /** @type {Resolver} */
  function resolveAllText(events, context) {
    let index = -1
    /** @type {number|undefined} */
    let enter

    // A rather boring computation (to merge adjacent `data` events) which
    // improves mm performance by 29%.
    while (++index <= events.length) {
      if (enter === undefined) {
        if (events[index] && events[index][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.data) {
          enter = index
          index++
        }
      } else if (!events[index] || events[index][1].type !== micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.data) {
        // Don’t do anything if there is one data token.
        if (index !== enter + 2) {
          events[enter][1].end = events[index - 1][1].end
          events.splice(enter + 2, index - enter - 2)
          index = enter + 2
        }

        enter = undefined
      }
    }

    return extraResolver ? extraResolver(events, context) : events
  }
}

/**
 * A rather ugly set of instructions which again looks at chunks in the input
 * stream.
 * The reason to do this here is that it is *much* faster to parse in reverse.
 * And that we can’t hook into `null` to split the line suffix before an EOF.
 * To do: figure out if we can make this into a clean utility, or even in core.
 * As it will be useful for GFMs literal autolink extension (and maybe even
 * tables?)
 *
 * @type {Resolver}
 */
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0 // Skip first.

  while (++eventIndex <= events.length) {
    if (
      (eventIndex === events.length ||
        events[eventIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding) &&
      events[eventIndex - 1][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.data
    ) {
      const data = events[eventIndex - 1][1]
      const chunks = context.sliceStream(data)
      let index = chunks.length
      let bufferIndex = -1
      let size = 0
      /** @type {boolean|undefined} */
      let tabs

      while (index--) {
        const chunk = chunks[index]

        if (typeof chunk === 'string') {
          bufferIndex = chunk.length

          while (chunk.charCodeAt(bufferIndex - 1) === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.space) {
            size++
            bufferIndex--
          }

          if (bufferIndex) break
          bufferIndex = -1
        }
        // Number
        else if (chunk === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.horizontalTab) {
          tabs = true
          size++
        } else if (chunk === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.virtualSpace) {
          // Empty
        } else {
          // Replacement character, exit.
          index++
          break
        }
      }

      if (size) {
        const token = {
          type:
            eventIndex === events.length ||
            tabs ||
            size < micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.hardBreakPrefixSizeMin
              ? micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineSuffix
              : micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.hardBreakTrailing,
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index,
            _bufferIndex: index
              ? bufferIndex
              : data.start._bufferIndex + bufferIndex
          },
          end: Object.assign({}, data.end)
        }

        data.end = Object.assign({}, token.start)

        if (data.start.offset === data.end.offset) {
          Object.assign(data, token)
        } else {
          events.splice(
            eventIndex,
            0,
            ['enter', token, context],
            ['exit', token, context]
          )
          eventIndex += 2
        }
      }

      eventIndex++
    }
  }

  return events
}


/***/ }),

/***/ "./node_modules/micromark/dev/lib/parse.js":
/*!*************************************************!*\
  !*** ./node_modules/micromark/dev/lib/parse.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var micromark_util_combine_extensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-combine-extensions */ "./node_modules/micromark-util-combine-extensions/index.js");
/* harmony import */ var _initialize_content_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initialize/content.js */ "./node_modules/micromark/dev/lib/initialize/content.js");
/* harmony import */ var _initialize_document_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initialize/document.js */ "./node_modules/micromark/dev/lib/initialize/document.js");
/* harmony import */ var _initialize_flow_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./initialize/flow.js */ "./node_modules/micromark/dev/lib/initialize/flow.js");
/* harmony import */ var _initialize_text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./initialize/text.js */ "./node_modules/micromark/dev/lib/initialize/text.js");
/* harmony import */ var _create_tokenizer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-tokenizer.js */ "./node_modules/micromark/dev/lib/create-tokenizer.js");
/* harmony import */ var _constructs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructs.js */ "./node_modules/micromark/dev/lib/constructs.js");
/**
 * @typedef {import('micromark-util-types').InitialConstruct} InitialConstruct
 * @typedef {import('micromark-util-types').FullNormalizedExtension} FullNormalizedExtension
 * @typedef {import('micromark-util-types').ParseOptions} ParseOptions
 * @typedef {import('micromark-util-types').ParseContext} ParseContext
 * @typedef {import('micromark-util-types').Create} Create
 */









/**
 * @param {ParseOptions} [options]
 * @returns {ParseContext}
 */
function parse(options = {}) {
  /** @type {FullNormalizedExtension} */
  // @ts-expect-error `defaultConstructs` is full, so the result will be too.
  const constructs = (0,micromark_util_combine_extensions__WEBPACK_IMPORTED_MODULE_0__.combineExtensions)(
    // @ts-expect-error Same as above.
    [_constructs_js__WEBPACK_IMPORTED_MODULE_1__].concat(options.extensions || [])
  )
  /** @type {ParseContext} */
  const parser = {
    defined: [],
    lazy: {},
    constructs,
    content: create(_initialize_content_js__WEBPACK_IMPORTED_MODULE_2__.content),
    document: create(_initialize_document_js__WEBPACK_IMPORTED_MODULE_3__.document),
    flow: create(_initialize_flow_js__WEBPACK_IMPORTED_MODULE_4__.flow),
    string: create(_initialize_text_js__WEBPACK_IMPORTED_MODULE_5__.string),
    text: create(_initialize_text_js__WEBPACK_IMPORTED_MODULE_5__.text)
  }

  return parser

  /**
   * @param {InitialConstruct} initial
   */
  function create(initial) {
    return creator
    /** @type {Create} */
    function creator(from) {
      return (0,_create_tokenizer_js__WEBPACK_IMPORTED_MODULE_6__.createTokenizer)(parser, initial, from)
    }
  }
}


/***/ }),

/***/ "./node_modules/micromark/dev/lib/postprocess.js":
/*!*******************************************************!*\
  !*** ./node_modules/micromark/dev/lib/postprocess.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postprocess": () => (/* binding */ postprocess)
/* harmony export */ });
/* harmony import */ var micromark_util_subtokenize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-subtokenize */ "./node_modules/micromark-util-subtokenize/dev/index.js");
/**
 * @typedef {import('micromark-util-types').Event} Event
 */



/**
 * @param {Event[]} events
 * @returns {Event[]}
 */
function postprocess(events) {
  while (!(0,micromark_util_subtokenize__WEBPACK_IMPORTED_MODULE_0__.subtokenize)(events)) {
    // Empty
  }

  return events
}


/***/ }),

/***/ "./node_modules/micromark/dev/lib/preprocess.js":
/*!******************************************************!*\
  !*** ./node_modules/micromark/dev/lib/preprocess.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "preprocess": () => (/* binding */ preprocess)
/* harmony export */ });
/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ "./node_modules/micromark-util-symbol/codes.js");
/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ "./node_modules/micromark-util-symbol/constants.js");
/**
 * @typedef {import('micromark-util-types').Encoding} Encoding
 * @typedef {import('micromark-util-types').Value} Value
 * @typedef {import('micromark-util-types').Chunk} Chunk
 * @typedef {import('micromark-util-types').Code} Code
 */

/**
 * @callback Preprocessor
 * @param {Value} value
 * @param {Encoding} [encoding]
 * @param {boolean} [end=false]
 * @returns {Chunk[]}
 */




const search = /[\0\t\n\r]/g

/**
 * @returns {Preprocessor}
 */
function preprocess() {
  let column = 1
  let buffer = ''
  /** @type {boolean|undefined} */
  let start = true
  /** @type {boolean|undefined} */
  let atCarriageReturn

  return preprocessor

  /** @type {Preprocessor} */
  function preprocessor(value, encoding, end) {
    /** @type {Chunk[]} */
    const chunks = []
    /** @type {RegExpMatchArray|null} */
    let match
    /** @type {number} */
    let next
    /** @type {number} */
    let startPosition
    /** @type {number} */
    let endPosition
    /** @type {Code} */
    let code

    // @ts-expect-error `Buffer` does allow an encoding.
    value = buffer + value.toString(encoding)
    startPosition = 0
    buffer = ''

    if (start) {
      if (value.charCodeAt(0) === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.byteOrderMarker) {
        startPosition++
      }

      start = undefined
    }

    while (startPosition < value.length) {
      search.lastIndex = startPosition
      match = search.exec(value)
      endPosition =
        match && match.index !== undefined ? match.index : value.length
      code = value.charCodeAt(endPosition)

      if (!match) {
        buffer = value.slice(startPosition)
        break
      }

      if (
        code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lf &&
        startPosition === endPosition &&
        atCarriageReturn
      ) {
        chunks.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.carriageReturnLineFeed)
        atCarriageReturn = undefined
      } else {
        if (atCarriageReturn) {
          chunks.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.carriageReturn)
          atCarriageReturn = undefined
        }

        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition))
          column += endPosition - startPosition
        }

        switch (code) {
          case micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.nul: {
            chunks.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.replacementCharacter)
            column++

            break
          }

          case micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.ht: {
            next = Math.ceil(column / micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_1__.constants.tabSize) * micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_1__.constants.tabSize
            chunks.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.horizontalTab)
            while (column++ < next) chunks.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.virtualSpace)

            break
          }

          case micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lf: {
            chunks.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.lineFeed)
            column = 1

            break
          }

          default: {
            atCarriageReturn = true
            column = 1
          }
        }
      }

      startPosition = endPosition + 1
    }

    if (end) {
      if (atCarriageReturn) chunks.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.carriageReturn)
      if (buffer) chunks.push(buffer)
      chunks.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.eof)
    }

    return chunks
  }
}


/***/ }),

/***/ "./node_modules/property-information/index.js":
/*!****************************************************!*\
  !*** ./node_modules/property-information/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "find": () => (/* reexport safe */ _lib_find_js__WEBPACK_IMPORTED_MODULE_0__.find),
/* harmony export */   "hastToReact": () => (/* reexport safe */ _lib_hast_to_react_js__WEBPACK_IMPORTED_MODULE_1__.hastToReact),
/* harmony export */   "html": () => (/* binding */ html),
/* harmony export */   "normalize": () => (/* reexport safe */ _lib_normalize_js__WEBPACK_IMPORTED_MODULE_2__.normalize),
/* harmony export */   "svg": () => (/* binding */ svg)
/* harmony export */ });
/* harmony import */ var _lib_util_merge_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/util/merge.js */ "./node_modules/property-information/lib/util/merge.js");
/* harmony import */ var _lib_xlink_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/xlink.js */ "./node_modules/property-information/lib/xlink.js");
/* harmony import */ var _lib_xml_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/xml.js */ "./node_modules/property-information/lib/xml.js");
/* harmony import */ var _lib_xmlns_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/xmlns.js */ "./node_modules/property-information/lib/xmlns.js");
/* harmony import */ var _lib_aria_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/aria.js */ "./node_modules/property-information/lib/aria.js");
/* harmony import */ var _lib_html_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/html.js */ "./node_modules/property-information/lib/html.js");
/* harmony import */ var _lib_svg_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/svg.js */ "./node_modules/property-information/lib/svg.js");
/* harmony import */ var _lib_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/find.js */ "./node_modules/property-information/lib/find.js");
/* harmony import */ var _lib_hast_to_react_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/hast-to-react.js */ "./node_modules/property-information/lib/hast-to-react.js");
/* harmony import */ var _lib_normalize_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/normalize.js */ "./node_modules/property-information/lib/normalize.js");
/**
 * @typedef {import('./lib/util/info.js').Info} Info
 * @typedef {import('./lib/util/schema.js').Schema} Schema
 */












const html = (0,_lib_util_merge_js__WEBPACK_IMPORTED_MODULE_3__.merge)([_lib_xml_js__WEBPACK_IMPORTED_MODULE_4__.xml, _lib_xlink_js__WEBPACK_IMPORTED_MODULE_5__.xlink, _lib_xmlns_js__WEBPACK_IMPORTED_MODULE_6__.xmlns, _lib_aria_js__WEBPACK_IMPORTED_MODULE_7__.aria, _lib_html_js__WEBPACK_IMPORTED_MODULE_8__.html], 'html')
const svg = (0,_lib_util_merge_js__WEBPACK_IMPORTED_MODULE_3__.merge)([_lib_xml_js__WEBPACK_IMPORTED_MODULE_4__.xml, _lib_xlink_js__WEBPACK_IMPORTED_MODULE_5__.xlink, _lib_xmlns_js__WEBPACK_IMPORTED_MODULE_6__.xmlns, _lib_aria_js__WEBPACK_IMPORTED_MODULE_7__.aria, _lib_svg_js__WEBPACK_IMPORTED_MODULE_9__.svg], 'svg')


/***/ }),

/***/ "./node_modules/property-information/lib/aria.js":
/*!*******************************************************!*\
  !*** ./node_modules/property-information/lib/aria.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aria": () => (/* binding */ aria)
/* harmony export */ });
/* harmony import */ var _util_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/types.js */ "./node_modules/property-information/lib/util/types.js");
/* harmony import */ var _util_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/create.js */ "./node_modules/property-information/lib/util/create.js");



const aria = (0,_util_create_js__WEBPACK_IMPORTED_MODULE_0__.create)({
  transform(_, prop) {
    return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase()
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaAutoComplete: null,
    ariaBusy: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaChecked: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaColCount: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaColIndex: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaColSpan: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaControls: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.spaceSeparated,
    ariaDetails: null,
    ariaDisabled: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaDropEffect: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaFlowTo: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.spaceSeparated,
    ariaGrabbed: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaHasPopup: null,
    ariaHidden: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.spaceSeparated,
    ariaLevel: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaLive: null,
    ariaModal: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaMultiLine: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaMultiSelectable: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaOrientation: null,
    ariaOwns: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaPressed: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaReadOnly: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaRelevant: null,
    ariaRequired: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaRoleDescription: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.spaceSeparated,
    ariaRowCount: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaRowIndex: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaRowSpan: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaSelected: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.booleanish,
    ariaSetSize: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaSort: null,
    ariaValueMax: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaValueMin: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaValueNow: _util_types_js__WEBPACK_IMPORTED_MODULE_1__.number,
    ariaValueText: null,
    role: null
  }
})


/***/ }),

/***/ "./node_modules/property-information/lib/find.js":
/*!*******************************************************!*\
  !*** ./node_modules/property-information/lib/find.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "find": () => (/* binding */ find)
/* harmony export */ });
/* harmony import */ var _normalize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalize.js */ "./node_modules/property-information/lib/normalize.js");
/* harmony import */ var _util_defined_info_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/defined-info.js */ "./node_modules/property-information/lib/util/defined-info.js");
/* harmony import */ var _util_info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/info.js */ "./node_modules/property-information/lib/util/info.js");
/**
 * @typedef {import('./util/schema.js').Schema} Schema
 */





const valid = /^data[-\w.:]+$/i
const dash = /-[a-z]/g
const cap = /[A-Z]/g

/**
 * @param {Schema} schema
 * @param {string} value
 * @returns {Info}
 */
function find(schema, value) {
  const normal = (0,_normalize_js__WEBPACK_IMPORTED_MODULE_0__.normalize)(value)
  let prop = value
  let Type = _util_info_js__WEBPACK_IMPORTED_MODULE_1__.Info

  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]]
  }

  if (normal.length > 4 && normal.slice(0, 4) === 'data' && valid.test(value)) {
    // Attribute or property.
    if (value.charAt(4) === '-') {
      // Turn it into a property.
      const rest = value.slice(5).replace(dash, camelcase)
      prop = 'data' + rest.charAt(0).toUpperCase() + rest.slice(1)
    } else {
      // Turn it into an attribute.
      const rest = value.slice(4)

      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab)

        if (dashes.charAt(0) !== '-') {
          dashes = '-' + dashes
        }

        value = 'data' + dashes
      }
    }

    Type = _util_defined_info_js__WEBPACK_IMPORTED_MODULE_2__.DefinedInfo
  }

  return new Type(prop, value)
}

/**
 * @param {string} $0
 * @returns {string}
 */
function kebab($0) {
  return '-' + $0.toLowerCase()
}

/**
 * @param {string} $0
 * @returns {string}
 */
function camelcase($0) {
  return $0.charAt(1).toUpperCase()
}


/***/ }),

/***/ "./node_modules/property-information/lib/hast-to-react.js":
/*!****************************************************************!*\
  !*** ./node_modules/property-information/lib/hast-to-react.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hastToReact": () => (/* binding */ hastToReact)
/* harmony export */ });
const hastToReact = {
  classId: 'classID',
  dataType: 'datatype',
  itemId: 'itemID',
  strokeDashArray: 'strokeDasharray',
  strokeDashOffset: 'strokeDashoffset',
  strokeLineCap: 'strokeLinecap',
  strokeLineJoin: 'strokeLinejoin',
  strokeMiterLimit: 'strokeMiterlimit',
  typeOf: 'typeof',
  xLinkActuate: 'xlinkActuate',
  xLinkArcRole: 'xlinkArcrole',
  xLinkHref: 'xlinkHref',
  xLinkRole: 'xlinkRole',
  xLinkShow: 'xlinkShow',
  xLinkTitle: 'xlinkTitle',
  xLinkType: 'xlinkType',
  xmlnsXLink: 'xmlnsXlink'
}


/***/ }),

/***/ "./node_modules/property-information/lib/html.js":
/*!*******************************************************!*\
  !*** ./node_modules/property-information/lib/html.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "html": () => (/* binding */ html)
/* harmony export */ });
/* harmony import */ var _util_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/types.js */ "./node_modules/property-information/lib/util/types.js");
/* harmony import */ var _util_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/create.js */ "./node_modules/property-information/lib/util/create.js");
/* harmony import */ var _util_case_insensitive_transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/case-insensitive-transform.js */ "./node_modules/property-information/lib/util/case-insensitive-transform.js");




const html = (0,_util_create_js__WEBPACK_IMPORTED_MODULE_0__.create)({
  space: 'html',
  attributes: {
    acceptcharset: 'accept-charset',
    classname: 'class',
    htmlfor: 'for',
    httpequiv: 'http-equiv'
  },
  transform: _util_case_insensitive_transform_js__WEBPACK_IMPORTED_MODULE_1__.caseInsensitiveTransform,
  mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaSeparated,
    acceptCharset: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    accessKey: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    allowPaymentRequest: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    allowUserMedia: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    alt: null,
    as: null,
    async: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    autoCapitalize: null,
    autoComplete: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    autoFocus: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    autoPlay: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    capture: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    charSet: null,
    checked: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    cite: null,
    className: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    cols: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    colSpan: null,
    content: null,
    contentEditable: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.booleanish,
    controls: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    controlsList: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    coords: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number | _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    defer: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    dir: null,
    dirName: null,
    disabled: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    download: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.overloadedBoolean,
    draggable: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    formTarget: null,
    headers: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    height: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    hidden: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    high: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    href: null,
    hrefLang: null,
    htmlFor: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    httpEquiv: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    itemId: null,
    itemProp: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    itemRef: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    itemScope: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    itemType: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    low: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    manifest: null,
    max: null,
    maxLength: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    media: null,
    method: null,
    min: null,
    minLength: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    multiple: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    muted: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    name: null,
    nonce: null,
    noModule: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    noValidate: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    optimum: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    pattern: null,
    ping: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    placeholder: null,
    playsInline: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    poster: null,
    preload: null,
    readOnly: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    referrerPolicy: null,
    rel: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    required: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    reversed: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    rows: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    rowSpan: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    sandbox: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    scope: null,
    scoped: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    seamless: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    selected: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    shape: null,
    size: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    sizes: null,
    slot: null,
    span: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    spellCheck: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    step: null,
    style: null,
    tabIndex: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    useMap: null,
    value: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.booleanish,
    width: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    wrap: null,

    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null, // Several. Use CSS `text-align` instead,
    aLink: null, // `<body>`. Use CSS `a:active {color}` instead
    archive: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated, // `<object>`. List of URIs to archives
    axis: null, // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null, // `<body>`. Use CSS `background-image` instead
    bgColor: null, // `<body>` and table elements. Use CSS `background-color` instead
    border: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number, // `<table>`. Use CSS `border-width` instead,
    borderColor: null, // `<table>`. Use CSS `border-color` instead,
    bottomMargin: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number, // `<body>`
    cellPadding: null, // `<table>`
    cellSpacing: null, // `<table>`
    char: null, // Several table elements. When `align=char`, sets the character to align on
    charOff: null, // Several table elements. When `char`, offsets the alignment
    classId: null, // `<object>`
    clear: null, // `<br>`. Use CSS `clear` instead
    code: null, // `<object>`
    codeBase: null, // `<object>`
    codeType: null, // `<object>`
    color: null, // `<font>` and `<hr>`. Use CSS instead
    compact: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean, // Lists. Use CSS to reduce space between items instead
    declare: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean, // `<object>`
    event: null, // `<script>`
    face: null, // `<font>`. Use CSS instead
    frame: null, // `<table>`
    frameBorder: null, // `<iframe>`. Use CSS `border` instead
    hSpace: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number, // `<img>` and `<object>`
    leftMargin: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number, // `<body>`
    link: null, // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null, // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null, // `<img>`. Use a `<picture>`
    marginHeight: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number, // `<body>`
    marginWidth: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number, // `<body>`
    noResize: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean, // `<frame>`
    noHref: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean, // `<area>`. Use no href instead of an explicit `nohref`
    noShade: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean, // `<hr>`. Use background-color and height instead of borders
    noWrap: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean, // `<td>` and `<th>`
    object: null, // `<applet>`
    profile: null, // `<head>`
    prompt: null, // `<isindex>`
    rev: null, // `<link>`
    rightMargin: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number, // `<body>`
    rules: null, // `<table>`
    scheme: null, // `<meta>`
    scrolling: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.booleanish, // `<frame>`. Use overflow in the child context
    standby: null, // `<object>`
    summary: null, // `<table>`
    text: null, // `<body>`. Use CSS `color` instead
    topMargin: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number, // `<body>`
    valueType: null, // `<param>`
    version: null, // `<html>`. Use a doctype.
    vAlign: null, // Several. Use CSS `vertical-align` instead
    vLink: null, // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number, // `<img>` and `<object>`

    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    disableRemotePlayback: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    prefix: null,
    property: null,
    results: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    security: null,
    unselectable: null
  }
})


/***/ }),

/***/ "./node_modules/property-information/lib/normalize.js":
/*!************************************************************!*\
  !*** ./node_modules/property-information/lib/normalize.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalize": () => (/* binding */ normalize)
/* harmony export */ });
/**
 * @param {string} value
 * @returns {string}
 */
function normalize(value) {
  return value.toLowerCase()
}


/***/ }),

/***/ "./node_modules/property-information/lib/svg.js":
/*!******************************************************!*\
  !*** ./node_modules/property-information/lib/svg.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "svg": () => (/* binding */ svg)
/* harmony export */ });
/* harmony import */ var _util_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/types.js */ "./node_modules/property-information/lib/util/types.js");
/* harmony import */ var _util_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/create.js */ "./node_modules/property-information/lib/util/create.js");
/* harmony import */ var _util_case_sensitive_transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/case-sensitive-transform.js */ "./node_modules/property-information/lib/util/case-sensitive-transform.js");




const svg = (0,_util_create_js__WEBPACK_IMPORTED_MODULE_0__.create)({
  space: 'svg',
  attributes: {
    accentHeight: 'accent-height',
    alignmentBaseline: 'alignment-baseline',
    arabicForm: 'arabic-form',
    baselineShift: 'baseline-shift',
    capHeight: 'cap-height',
    className: 'class',
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    crossOrigin: 'crossorigin',
    dataType: 'datatype',
    dominantBaseline: 'dominant-baseline',
    enableBackground: 'enable-background',
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    hrefLang: 'hreflang',
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    horizOriginY: 'horiz-origin-y',
    imageRendering: 'image-rendering',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    navDown: 'nav-down',
    navDownLeft: 'nav-down-left',
    navDownRight: 'nav-down-right',
    navLeft: 'nav-left',
    navNext: 'nav-next',
    navPrev: 'nav-prev',
    navRight: 'nav-right',
    navUp: 'nav-up',
    navUpLeft: 'nav-up-left',
    navUpRight: 'nav-up-right',
    onAbort: 'onabort',
    onActivate: 'onactivate',
    onAfterPrint: 'onafterprint',
    onBeforePrint: 'onbeforeprint',
    onBegin: 'onbegin',
    onCancel: 'oncancel',
    onCanPlay: 'oncanplay',
    onCanPlayThrough: 'oncanplaythrough',
    onChange: 'onchange',
    onClick: 'onclick',
    onClose: 'onclose',
    onCopy: 'oncopy',
    onCueChange: 'oncuechange',
    onCut: 'oncut',
    onDblClick: 'ondblclick',
    onDrag: 'ondrag',
    onDragEnd: 'ondragend',
    onDragEnter: 'ondragenter',
    onDragExit: 'ondragexit',
    onDragLeave: 'ondragleave',
    onDragOver: 'ondragover',
    onDragStart: 'ondragstart',
    onDrop: 'ondrop',
    onDurationChange: 'ondurationchange',
    onEmptied: 'onemptied',
    onEnd: 'onend',
    onEnded: 'onended',
    onError: 'onerror',
    onFocus: 'onfocus',
    onFocusIn: 'onfocusin',
    onFocusOut: 'onfocusout',
    onHashChange: 'onhashchange',
    onInput: 'oninput',
    onInvalid: 'oninvalid',
    onKeyDown: 'onkeydown',
    onKeyPress: 'onkeypress',
    onKeyUp: 'onkeyup',
    onLoad: 'onload',
    onLoadedData: 'onloadeddata',
    onLoadedMetadata: 'onloadedmetadata',
    onLoadStart: 'onloadstart',
    onMessage: 'onmessage',
    onMouseDown: 'onmousedown',
    onMouseEnter: 'onmouseenter',
    onMouseLeave: 'onmouseleave',
    onMouseMove: 'onmousemove',
    onMouseOut: 'onmouseout',
    onMouseOver: 'onmouseover',
    onMouseUp: 'onmouseup',
    onMouseWheel: 'onmousewheel',
    onOffline: 'onoffline',
    onOnline: 'ononline',
    onPageHide: 'onpagehide',
    onPageShow: 'onpageshow',
    onPaste: 'onpaste',
    onPause: 'onpause',
    onPlay: 'onplay',
    onPlaying: 'onplaying',
    onPopState: 'onpopstate',
    onProgress: 'onprogress',
    onRateChange: 'onratechange',
    onRepeat: 'onrepeat',
    onReset: 'onreset',
    onResize: 'onresize',
    onScroll: 'onscroll',
    onSeeked: 'onseeked',
    onSeeking: 'onseeking',
    onSelect: 'onselect',
    onShow: 'onshow',
    onStalled: 'onstalled',
    onStorage: 'onstorage',
    onSubmit: 'onsubmit',
    onSuspend: 'onsuspend',
    onTimeUpdate: 'ontimeupdate',
    onToggle: 'ontoggle',
    onUnload: 'onunload',
    onVolumeChange: 'onvolumechange',
    onWaiting: 'onwaiting',
    onZoom: 'onzoom',
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pointerEvents: 'pointer-events',
    referrerPolicy: 'referrerpolicy',
    renderingIntent: 'rendering-intent',
    shapeRendering: 'shape-rendering',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    strokeDashArray: 'stroke-dasharray',
    strokeDashOffset: 'stroke-dashoffset',
    strokeLineCap: 'stroke-linecap',
    strokeLineJoin: 'stroke-linejoin',
    strokeMiterLimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    tabIndex: 'tabindex',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    typeOf: 'typeof',
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    vectorEffect: 'vector-effect',
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    xHeight: 'x-height',
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: 'playbackorder',
    timelineBegin: 'timelinebegin'
  },
  transform: _util_case_sensitive_transform_js__WEBPACK_IMPORTED_MODULE_1__.caseSensitiveTransform,
  properties: {
    about: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    accentHeight: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    amplitude: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    arabicForm: null,
    ascent: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    attributeName: null,
    attributeType: null,
    azimuth: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    by: null,
    calcMode: null,
    capHeight: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    className: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    diffuseConstant: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    direction: null,
    display: null,
    dur: null,
    divisor: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    dominantBaseline: null,
    download: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaSeparated,
    g2: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaSeparated,
    glyphName: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    horizOriginX: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    horizOriginY: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    id: null,
    ideographic: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    k: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    k1: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    k2: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    k3: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    k4: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    kernelMatrix: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null, // SEMI_COLON_SEPARATED
    keySplines: null, // SEMI_COLON_SEPARATED
    keyTimes: null, // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    overlineThickness: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    pointsAtY: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    pointsAtZ: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    rev: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    requiredFeatures: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    requiredFonts: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    requiredFormats: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    specularExponent: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    strikethroughThickness: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    string: null,
    stroke: null,
    strokeDashArray: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    strokeOpacity: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    strokeWidth: null,
    style: null,
    surfaceScale: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    tabIndex: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    tableValues: null,
    target: null,
    targetX: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    targetY: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    underlineThickness: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    values: null,
    vAlphabetic: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    vMathematical: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    vectorEffect: null,
    vHanging: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    vIdeographic: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    version: null,
    vertAdvY: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    vertOriginX: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    vertOriginY: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: _util_types_js__WEBPACK_IMPORTED_MODULE_2__.number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
})


/***/ }),

/***/ "./node_modules/property-information/lib/util/case-insensitive-transform.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/property-information/lib/util/case-insensitive-transform.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "caseInsensitiveTransform": () => (/* binding */ caseInsensitiveTransform)
/* harmony export */ });
/* harmony import */ var _case_sensitive_transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./case-sensitive-transform.js */ "./node_modules/property-information/lib/util/case-sensitive-transform.js");


/**
 * @param {Record<string, string>} attributes
 * @param {string} property
 * @returns {string}
 */
function caseInsensitiveTransform(attributes, property) {
  return (0,_case_sensitive_transform_js__WEBPACK_IMPORTED_MODULE_0__.caseSensitiveTransform)(attributes, property.toLowerCase())
}


/***/ }),

/***/ "./node_modules/property-information/lib/util/case-sensitive-transform.js":
/*!********************************************************************************!*\
  !*** ./node_modules/property-information/lib/util/case-sensitive-transform.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "caseSensitiveTransform": () => (/* binding */ caseSensitiveTransform)
/* harmony export */ });
/**
 * @param {Record<string, string>} attributes
 * @param {string} attribute
 * @returns {string}
 */
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute
}


/***/ }),

/***/ "./node_modules/property-information/lib/util/create.js":
/*!**************************************************************!*\
  !*** ./node_modules/property-information/lib/util/create.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create)
/* harmony export */ });
/* harmony import */ var _normalize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../normalize.js */ "./node_modules/property-information/lib/normalize.js");
/* harmony import */ var _schema_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema.js */ "./node_modules/property-information/lib/util/schema.js");
/* harmony import */ var _defined_info_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defined-info.js */ "./node_modules/property-information/lib/util/defined-info.js");
/**
 * @typedef {import('./schema.js').Properties} Properties
 * @typedef {import('./schema.js').Normal} Normal
 *
 * @typedef {Record<string, string>} Attributes
 *
 * @typedef {Object} Definition
 * @property {Record<string, number|null>} properties
 * @property {(attributes: Attributes, property: string) => string} transform
 * @property {string} [space]
 * @property {Attributes} [attributes]
 * @property {Array<string>} [mustUseProperty]
 */





const own = {}.hasOwnProperty

/**
 * @param {Definition} definition
 * @returns {Schema}
 */
function create(definition) {
  /** @type {Properties} */
  const property = {}
  /** @type {Normal} */
  const normal = {}
  /** @type {string} */
  let prop

  for (prop in definition.properties) {
    if (own.call(definition.properties, prop)) {
      const value = definition.properties[prop]
      const info = new _defined_info_js__WEBPACK_IMPORTED_MODULE_0__.DefinedInfo(
        prop,
        definition.transform(definition.attributes || {}, prop),
        value,
        definition.space
      )

      if (
        definition.mustUseProperty &&
        definition.mustUseProperty.includes(prop)
      ) {
        info.mustUseProperty = true
      }

      property[prop] = info

      normal[(0,_normalize_js__WEBPACK_IMPORTED_MODULE_1__.normalize)(prop)] = prop
      normal[(0,_normalize_js__WEBPACK_IMPORTED_MODULE_1__.normalize)(info.attribute)] = prop
    }
  }

  return new _schema_js__WEBPACK_IMPORTED_MODULE_2__.Schema(property, normal, definition.space)
}


/***/ }),

/***/ "./node_modules/property-information/lib/util/defined-info.js":
/*!********************************************************************!*\
  !*** ./node_modules/property-information/lib/util/defined-info.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefinedInfo": () => (/* binding */ DefinedInfo)
/* harmony export */ });
/* harmony import */ var _info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info.js */ "./node_modules/property-information/lib/util/info.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./node_modules/property-information/lib/util/types.js");



/** @type {Array<keyof types>} */
// @ts-expect-error: hush.
const checks = Object.keys(_types_js__WEBPACK_IMPORTED_MODULE_0__)

class DefinedInfo extends _info_js__WEBPACK_IMPORTED_MODULE_1__.Info {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(property, attribute, mask, space) {
    let index = -1

    super(property, attribute)

    mark(this, 'space', space)

    if (typeof mask === 'number') {
      while (++index < checks.length) {
        const check = checks[index]
        mark(this, checks[index], (mask & _types_js__WEBPACK_IMPORTED_MODULE_0__[check]) === _types_js__WEBPACK_IMPORTED_MODULE_0__[check])
      }
    }
  }
}

DefinedInfo.prototype.defined = true

/**
 * @param {DefinedInfo} values
 * @param {string} key
 * @param {unknown} value
 */
function mark(values, key, value) {
  if (value) {
    // @ts-expect-error: assume `value` matches the expected value of `key`.
    values[key] = value
  }
}


/***/ }),

/***/ "./node_modules/property-information/lib/util/info.js":
/*!************************************************************!*\
  !*** ./node_modules/property-information/lib/util/info.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Info": () => (/* binding */ Info)
/* harmony export */ });
class Info {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(property, attribute) {
    /** @type {string} */
    this.property = property
    /** @type {string} */
    this.attribute = attribute
  }
}

/** @type {string|null} */
Info.prototype.space = null
Info.prototype.boolean = false
Info.prototype.booleanish = false
Info.prototype.overloadedBoolean = false
Info.prototype.number = false
Info.prototype.commaSeparated = false
Info.prototype.spaceSeparated = false
Info.prototype.commaOrSpaceSeparated = false
Info.prototype.mustUseProperty = false
Info.prototype.defined = false


/***/ }),

/***/ "./node_modules/property-information/lib/util/merge.js":
/*!*************************************************************!*\
  !*** ./node_modules/property-information/lib/util/merge.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "merge": () => (/* binding */ merge)
/* harmony export */ });
/* harmony import */ var _schema_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schema.js */ "./node_modules/property-information/lib/util/schema.js");
/**
 * @typedef {import('./schema.js').Properties} Properties
 * @typedef {import('./schema.js').Normal} Normal
 */



/**
 * @param {Schema[]} definitions
 * @param {string} [space]
 * @returns {Schema}
 */
function merge(definitions, space) {
  /** @type {Properties} */
  const property = {}
  /** @type {Normal} */
  const normal = {}
  let index = -1

  while (++index < definitions.length) {
    Object.assign(property, definitions[index].property)
    Object.assign(normal, definitions[index].normal)
  }

  return new _schema_js__WEBPACK_IMPORTED_MODULE_0__.Schema(property, normal, space)
}


/***/ }),

/***/ "./node_modules/property-information/lib/util/schema.js":
/*!**************************************************************!*\
  !*** ./node_modules/property-information/lib/util/schema.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Schema": () => (/* binding */ Schema)
/* harmony export */ });
/**
 * @typedef {import('./info.js').Info} Info
 * @typedef {Record<string, Info>} Properties
 * @typedef {Record<string, string>} Normal
 */

class Schema {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(property, normal, space) {
    this.property = property
    this.normal = normal
    if (space) {
      this.space = space
    }
  }
}

/** @type {Properties} */
Schema.prototype.property = {}
/** @type {Normal} */
Schema.prototype.normal = {}
/** @type {string|null} */
Schema.prototype.space = null


/***/ }),

/***/ "./node_modules/property-information/lib/util/types.js":
/*!*************************************************************!*\
  !*** ./node_modules/property-information/lib/util/types.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boolean": () => (/* binding */ boolean),
/* harmony export */   "booleanish": () => (/* binding */ booleanish),
/* harmony export */   "commaOrSpaceSeparated": () => (/* binding */ commaOrSpaceSeparated),
/* harmony export */   "commaSeparated": () => (/* binding */ commaSeparated),
/* harmony export */   "number": () => (/* binding */ number),
/* harmony export */   "overloadedBoolean": () => (/* binding */ overloadedBoolean),
/* harmony export */   "spaceSeparated": () => (/* binding */ spaceSeparated)
/* harmony export */ });
let powers = 0

const boolean = increment()
const booleanish = increment()
const overloadedBoolean = increment()
const number = increment()
const spaceSeparated = increment()
const commaSeparated = increment()
const commaOrSpaceSeparated = increment()

function increment() {
  return 2 ** ++powers
}


/***/ }),

/***/ "./node_modules/property-information/lib/xlink.js":
/*!********************************************************!*\
  !*** ./node_modules/property-information/lib/xlink.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xlink": () => (/* binding */ xlink)
/* harmony export */ });
/* harmony import */ var _util_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/create.js */ "./node_modules/property-information/lib/util/create.js");


const xlink = (0,_util_create_js__WEBPACK_IMPORTED_MODULE_0__.create)({
  space: 'xlink',
  transform(_, prop) {
    return 'xlink:' + prop.slice(5).toLowerCase()
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
})


/***/ }),

/***/ "./node_modules/property-information/lib/xml.js":
/*!******************************************************!*\
  !*** ./node_modules/property-information/lib/xml.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xml": () => (/* binding */ xml)
/* harmony export */ });
/* harmony import */ var _util_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/create.js */ "./node_modules/property-information/lib/util/create.js");


const xml = (0,_util_create_js__WEBPACK_IMPORTED_MODULE_0__.create)({
  space: 'xml',
  transform(_, prop) {
    return 'xml:' + prop.slice(3).toLowerCase()
  },
  properties: {xmlLang: null, xmlBase: null, xmlSpace: null}
})


/***/ }),

/***/ "./node_modules/property-information/lib/xmlns.js":
/*!********************************************************!*\
  !*** ./node_modules/property-information/lib/xmlns.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xmlns": () => (/* binding */ xmlns)
/* harmony export */ });
/* harmony import */ var _util_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/create.js */ "./node_modules/property-information/lib/util/create.js");
/* harmony import */ var _util_case_insensitive_transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/case-insensitive-transform.js */ "./node_modules/property-information/lib/util/case-insensitive-transform.js");



const xmlns = (0,_util_create_js__WEBPACK_IMPORTED_MODULE_0__.create)({
  space: 'xmlns',
  attributes: {xmlnsxlink: 'xmlns:xlink'},
  transform: _util_case_insensitive_transform_js__WEBPACK_IMPORTED_MODULE_1__.caseInsensitiveTransform,
  properties: {xmlns: null, xmlnsXLink: null}
})


/***/ }),

/***/ "./node_modules/react-markdown/lib/ast-to-react.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-markdown/lib/ast-to-react.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "childrenToReact": () => (/* binding */ childrenToReact)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-is */ "./node_modules/react-markdown/node_modules/react-is/index.js");
/* harmony import */ var hast_util_whitespace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hast-util-whitespace */ "./node_modules/hast-util-whitespace/index.js");
/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! property-information */ "./node_modules/property-information/index.js");
/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! property-information */ "./node_modules/property-information/lib/find.js");
/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! property-information */ "./node_modules/property-information/lib/hast-to-react.js");
/* harmony import */ var space_separated_tokens__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! space-separated-tokens */ "./node_modules/space-separated-tokens/index.js");
/* harmony import */ var comma_separated_tokens__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! comma-separated-tokens */ "./node_modules/comma-separated-tokens/index.js");
/* harmony import */ var style_to_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! style-to-object */ "./node_modules/style-to-object/index.js");
/**
 * @template T
 * @typedef {import('react').ComponentType<T>} ComponentType<T>
 */

/**
 * @template T
 * @typedef {import('react').ComponentPropsWithoutRef<T>} ComponentPropsWithoutRef<T>
 */

/**
 * @typedef {import('react').ReactNode} ReactNode
 * @typedef {import('unist').Position} Position
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Text} Text
 * @typedef {import('hast').Comment} Comment
 * @typedef {import('hast').DocType} Doctype
 * @typedef {import('property-information').Info} Info
 * @typedef {import('property-information').Schema} Schema
 * @typedef {import('./complex-types').ReactMarkdownProps} ReactMarkdownProps
 *
 * @typedef Raw
 * @property {'raw'} type
 * @property {string} value
 *
 * @typedef Context
 * @property {Options} options
 * @property {Schema} schema
 * @property {number} listDepth
 *
 * @callback TransformLink
 * @param {string} href
 * @param {Array<ElementContent>} children
 * @param {string?} title
 * @returns {string}
 *
 * @callback TransformImage
 * @param {string} src
 * @param {string} alt
 * @param {string?} title
 * @returns {string}
 *
 * @typedef {import('react').HTMLAttributeAnchorTarget} TransformLinkTargetType
 *
 * @callback TransformLinkTarget
 * @param {string} href
 * @param {Array<ElementContent>} children
 * @param {string?} title
 * @returns {TransformLinkTargetType|undefined}
 *
 * @typedef {keyof JSX.IntrinsicElements} ReactMarkdownNames
 *
 * To do: is `data-sourcepos` typeable?
 *
 * @typedef {ComponentPropsWithoutRef<'code'> & ReactMarkdownProps & {inline?: boolean}} CodeProps
 * @typedef {ComponentPropsWithoutRef<'h1'> & ReactMarkdownProps & {level: number}} HeadingProps
 * @typedef {ComponentPropsWithoutRef<'li'> & ReactMarkdownProps & {checked: boolean|null, index: number, ordered: boolean}} LiProps
 * @typedef {ComponentPropsWithoutRef<'ol'> & ReactMarkdownProps & {depth: number, ordered: true}} OrderedListProps
 * @typedef {ComponentPropsWithoutRef<'table'> & ReactMarkdownProps & {style?: Record<string, unknown>, isHeader: boolean}} TableCellProps
 * @typedef {ComponentPropsWithoutRef<'tr'> & ReactMarkdownProps & {isHeader: boolean}} TableRowProps
 * @typedef {ComponentPropsWithoutRef<'ul'> & ReactMarkdownProps & {depth: number, ordered: false}} UnorderedListProps
 *
 * @typedef {ComponentType<CodeProps>} CodeComponent
 * @typedef {ComponentType<HeadingProps>} HeadingComponent
 * @typedef {ComponentType<LiProps>} LiComponent
 * @typedef {ComponentType<OrderedListProps>} OrderedListComponent
 * @typedef {ComponentType<TableCellProps>} TableCellComponent
 * @typedef {ComponentType<TableRowProps>} TableRowComponent
 * @typedef {ComponentType<UnorderedListProps>} UnorderedListComponent
 *
 * @typedef SpecialComponents
 * @property {CodeComponent|ReactMarkdownNames} code
 * @property {HeadingComponent|ReactMarkdownNames} h1
 * @property {HeadingComponent|ReactMarkdownNames} h2
 * @property {HeadingComponent|ReactMarkdownNames} h3
 * @property {HeadingComponent|ReactMarkdownNames} h4
 * @property {HeadingComponent|ReactMarkdownNames} h5
 * @property {HeadingComponent|ReactMarkdownNames} h6
 * @property {LiComponent|ReactMarkdownNames} li
 * @property {OrderedListComponent|ReactMarkdownNames} ol
 * @property {TableCellComponent|ReactMarkdownNames} td
 * @property {TableCellComponent|ReactMarkdownNames} th
 * @property {TableRowComponent|ReactMarkdownNames} tr
 * @property {UnorderedListComponent|ReactMarkdownNames} ul
 *
 * @typedef {Partial<Omit<import('./complex-types').NormalComponents, keyof SpecialComponents> & SpecialComponents>} Components
 *
 * @typedef Options
 * @property {boolean} [sourcePos=false]
 * @property {boolean} [rawSourcePos=false]
 * @property {boolean} [skipHtml=false]
 * @property {boolean} [includeElementIndex=false]
 * @property {null|false|TransformLink} [transformLinkUri]
 * @property {TransformImage} [transformImageUri]
 * @property {TransformLinkTargetType|TransformLinkTarget} [linkTarget]
 * @property {Components} [components]
 */









const own = {}.hasOwnProperty

// The table-related elements that must not contain whitespace text according
// to React.
const tableElements = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr'])

/**
 * @param {Context} context
 * @param {Element|Root} node
 */
function childrenToReact(context, node) {
  /** @type {Array<ReactNode>} */
  const children = []
  let childIndex = -1
  /** @type {Comment|Doctype|Element|Raw|Text} */
  let child

  while (++childIndex < node.children.length) {
    child = node.children[childIndex]

    if (child.type === 'element') {
      children.push(toReact(context, child, childIndex, node))
    } else if (child.type === 'text') {
      // Currently, a warning is triggered by react for *any* white space in
      // tables.
      // So we drop it.
      // See: <https://github.com/facebook/react/pull/7081>.
      // See: <https://github.com/facebook/react/pull/7515>.
      // See: <https://github.com/remarkjs/remark-react/issues/64>.
      // See: <https://github.com/remarkjs/react-markdown/issues/576>.
      if (
        node.type !== 'element' ||
        !tableElements.has(node.tagName) ||
        !(0,hast_util_whitespace__WEBPACK_IMPORTED_MODULE_3__.whitespace)(child)
      ) {
        children.push(child.value)
      }
    } else if (child.type === 'raw' && !context.options.skipHtml) {
      // Default behavior is to show (encoded) HTML.
      children.push(child.value)
    }
  }

  return children
}

/**
 * @param {Context} context
 * @param {Element} node
 * @param {number} index
 * @param {Element|Root} parent
 */
function toReact(context, node, index, parent) {
  const options = context.options
  const parentSchema = context.schema
  /** @type {ReactMarkdownNames} */
  // @ts-expect-error assume a known HTML/SVG element.
  const name = node.tagName
  /** @type {Record<string, unknown>} */
  const properties = {}
  let schema = parentSchema
  /** @type {string} */
  let property

  if (parentSchema.space === 'html' && name === 'svg') {
    schema = property_information__WEBPACK_IMPORTED_MODULE_4__.svg
    context.schema = schema
  }

  if (node.properties) {
    for (property in node.properties) {
      if (own.call(node.properties, property)) {
        addProperty(properties, property, node.properties[property], context)
      }
    }
  }

  if (name === 'ol' || name === 'ul') {
    context.listDepth++
  }

  const children = childrenToReact(context, node)

  if (name === 'ol' || name === 'ul') {
    context.listDepth--
  }

  // Restore parent schema.
  context.schema = parentSchema

  // Nodes created by plugins do not have positional info, in which case we use
  // an object that matches the position interface.
  const position = node.position || {
    start: {line: null, column: null, offset: null},
    end: {line: null, column: null, offset: null}
  }
  const component =
    options.components && own.call(options.components, name)
      ? options.components[name]
      : name
  const basic = typeof component === 'string' || component === react__WEBPACK_IMPORTED_MODULE_0__.Fragment

  if (!react_is__WEBPACK_IMPORTED_MODULE_1__.isValidElementType(component)) {
    throw new TypeError(
      `Component for name \`${name}\` not defined or is not renderable`
    )
  }

  properties.key = [
    name,
    position.start.line,
    position.start.column,
    index
  ].join('-')

  if (name === 'a' && options.linkTarget) {
    properties.target =
      typeof options.linkTarget === 'function'
        ? options.linkTarget(
            String(properties.href || ''),
            node.children,
            typeof properties.title === 'string' ? properties.title : null
          )
        : options.linkTarget
  }

  if (name === 'a' && options.transformLinkUri) {
    properties.href = options.transformLinkUri(
      String(properties.href || ''),
      node.children,
      typeof properties.title === 'string' ? properties.title : null
    )
  }

  if (
    !basic &&
    name === 'code' &&
    parent.type === 'element' &&
    parent.tagName !== 'pre'
  ) {
    properties.inline = true
  }

  if (
    !basic &&
    (name === 'h1' ||
      name === 'h2' ||
      name === 'h3' ||
      name === 'h4' ||
      name === 'h5' ||
      name === 'h6')
  ) {
    properties.level = Number.parseInt(name.charAt(1), 10)
  }

  if (name === 'img' && options.transformImageUri) {
    properties.src = options.transformImageUri(
      String(properties.src || ''),
      String(properties.alt || ''),
      typeof properties.title === 'string' ? properties.title : null
    )
  }

  if (!basic && name === 'li' && parent.type === 'element') {
    const input = getInputElement(node)
    properties.checked =
      input && input.properties ? Boolean(input.properties.checked) : null
    properties.index = getElementsBeforeCount(parent, node)
    properties.ordered = parent.tagName === 'ol'
  }

  if (!basic && (name === 'ol' || name === 'ul')) {
    properties.ordered = name === 'ol'
    properties.depth = context.listDepth
  }

  if (name === 'td' || name === 'th') {
    if (properties.align) {
      if (!properties.style) properties.style = {}
      // @ts-expect-error assume `style` is an object
      properties.style.textAlign = properties.align
      delete properties.align
    }

    if (!basic) {
      properties.isHeader = name === 'th'
    }
  }

  if (!basic && name === 'tr' && parent.type === 'element') {
    properties.isHeader = Boolean(parent.tagName === 'thead')
  }

  // If `sourcePos` is given, pass source information (line/column info from markdown source).
  if (options.sourcePos) {
    properties['data-sourcepos'] = flattenPosition(position)
  }

  if (!basic && options.rawSourcePos) {
    properties.sourcePosition = node.position
  }

  // If `includeElementIndex` is given, pass node index info to components.
  if (!basic && options.includeElementIndex) {
    properties.index = getElementsBeforeCount(parent, node)
    properties.siblingCount = getElementsBeforeCount(parent)
  }

  if (!basic) {
    properties.node = node
  }

  // Ensure no React warnings are emitted for void elements w/ children.
  return children.length > 0
    ? react__WEBPACK_IMPORTED_MODULE_0__.createElement(component, properties, children)
    : react__WEBPACK_IMPORTED_MODULE_0__.createElement(component, properties)
}

/**
 * @param {Element|Root} node
 * @returns {Element?}
 */
function getInputElement(node) {
  let index = -1

  while (++index < node.children.length) {
    const child = node.children[index]

    if (child.type === 'element' && child.tagName === 'input') {
      return child
    }
  }

  return null
}

/**
 * @param {Element|Root} parent
 * @param {Element} [node]
 * @returns {number}
 */
function getElementsBeforeCount(parent, node) {
  let index = -1
  let count = 0

  while (++index < parent.children.length) {
    if (parent.children[index] === node) break
    if (parent.children[index].type === 'element') count++
  }

  return count
}

/**
 * @param {Record<string, unknown>} props
 * @param {string} prop
 * @param {unknown} value
 * @param {Context} ctx
 */
function addProperty(props, prop, value, ctx) {
  const info = (0,property_information__WEBPACK_IMPORTED_MODULE_5__.find)(ctx.schema, prop)
  let result = value

  // Ignore nullish and `NaN` values.
  // eslint-disable-next-line no-self-compare
  if (result === null || result === undefined || result !== result) {
    return
  }

  // Accept `array`.
  // Most props are space-separated.
  if (Array.isArray(result)) {
    result = info.commaSeparated ? (0,comma_separated_tokens__WEBPACK_IMPORTED_MODULE_6__.stringify)(result) : (0,space_separated_tokens__WEBPACK_IMPORTED_MODULE_7__.stringify)(result)
  }

  if (info.property === 'style' && typeof result === 'string') {
    result = parseStyle(result)
  }

  if (info.space && info.property) {
    props[
      own.call(property_information__WEBPACK_IMPORTED_MODULE_8__.hastToReact, info.property)
        ? property_information__WEBPACK_IMPORTED_MODULE_8__.hastToReact[info.property]
        : info.property
    ] = result
  } else if (info.attribute) {
    props[info.attribute] = result
  }
}

/**
 * @param {string} value
 * @returns {Record<string, string>}
 */
function parseStyle(value) {
  /** @type {Record<string, string>} */
  const result = {}

  try {
    style_to_object__WEBPACK_IMPORTED_MODULE_2__(value, iterator)
  } catch {
    // Silent.
  }

  return result

  /**
   * @param {string} name
   * @param {string} v
   */
  function iterator(name, v) {
    const k = name.slice(0, 4) === '-ms-' ? `ms-${name.slice(4)}` : name
    result[k.replace(/-([a-z])/g, styleReplacer)] = v
  }
}

/**
 * @param {unknown} _
 * @param {string} $1
 */
function styleReplacer(_, $1) {
  return $1.toUpperCase()
}

/**
 * @param {Position|{start: {line: null, column: null, offset: null}, end: {line: null, column: null, offset: null}}} pos
 * @returns {string}
 */
function flattenPosition(pos) {
  return [
    pos.start.line,
    ':',
    pos.start.column,
    '-',
    pos.end.line,
    ':',
    pos.end.column
  ]
    .map((d) => String(d))
    .join('')
}


/***/ }),

/***/ "./node_modules/react-markdown/lib/react-markdown.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-markdown/lib/react-markdown.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactMarkdown": () => (/* binding */ ReactMarkdown)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var vfile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vfile */ "./node_modules/vfile/lib/index.js");
/* harmony import */ var unified__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unified */ "./node_modules/unified/lib/index.js");
/* harmony import */ var remark_parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! remark-parse */ "./node_modules/remark-parse/index.js");
/* harmony import */ var remark_rehype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! remark-rehype */ "./node_modules/remark-rehype/lib/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! property-information */ "./node_modules/property-information/index.js");
/* harmony import */ var _rehype_filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rehype-filter.js */ "./node_modules/react-markdown/lib/rehype-filter.js");
/* harmony import */ var _uri_transformer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./uri-transformer.js */ "./node_modules/react-markdown/lib/uri-transformer.js");
/* harmony import */ var _ast_to_react_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ast-to-react.js */ "./node_modules/react-markdown/lib/ast-to-react.js");
/**
 * @typedef {import('react').ReactNode} ReactNode
 * @typedef {import('react').ReactElement<{}>} ReactElement
 * @typedef {import('unified').PluggableList} PluggableList
 * @typedef {import('hast').Root} Root
 * @typedef {import('./rehype-filter.js').Options} FilterOptions
 * @typedef {import('./ast-to-react.js').Options} TransformOptions
 *
 * @typedef CoreOptions
 * @property {string} children
 *
 * @typedef PluginOptions
 * @property {PluggableList} [remarkPlugins=[]]
 * @property {PluggableList} [rehypePlugins=[]]
 * @property {import('remark-rehype').Options | undefined} [remarkRehypeOptions={}]
 *
 * @typedef LayoutOptions
 * @property {string} [className]
 *
 * @typedef {CoreOptions & PluginOptions & LayoutOptions & FilterOptions & TransformOptions} ReactMarkdownOptions
 *
 * @typedef Deprecation
 * @property {string} id
 * @property {string} [to]
 */












const own = {}.hasOwnProperty
const changelog =
  'https://github.com/remarkjs/react-markdown/blob/main/changelog.md'

/** @type {Record<string, Deprecation>} */
const deprecated = {
  plugins: {to: 'plugins', id: 'change-plugins-to-remarkplugins'},
  renderers: {to: 'components', id: 'change-renderers-to-components'},
  astPlugins: {id: 'remove-buggy-html-in-markdown-parser'},
  allowDangerousHtml: {id: 'remove-buggy-html-in-markdown-parser'},
  escapeHtml: {id: 'remove-buggy-html-in-markdown-parser'},
  source: {to: 'children', id: 'change-source-to-children'},
  allowNode: {
    to: 'allowElement',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes'
  },
  allowedTypes: {
    to: 'allowedElements',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes'
  },
  disallowedTypes: {
    to: 'disallowedElements',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes'
  },
  includeNodeIndex: {
    to: 'includeElementIndex',
    id: 'change-includenodeindex-to-includeelementindex'
  }
}

/**
 * React component to render markdown.
 *
 * @param {ReactMarkdownOptions} options
 * @returns {ReactElement}
 */
function ReactMarkdown(options) {
  for (const key in deprecated) {
    if (own.call(deprecated, key) && own.call(options, key)) {
      const deprecation = deprecated[key]
      console.warn(
        `[react-markdown] Warning: please ${
          deprecation.to ? `use \`${deprecation.to}\` instead of` : 'remove'
        } \`${key}\` (see <${changelog}#${deprecation.id}> for more info)`
      )
      delete deprecated[key]
    }
  }

  const processor = (0,unified__WEBPACK_IMPORTED_MODULE_1__.unified)()
    .use(remark_parse__WEBPACK_IMPORTED_MODULE_2__["default"])
    .use(options.remarkPlugins || [])
    .use(remark_rehype__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ...options.remarkRehypeOptions,
      allowDangerousHtml: true
    })
    .use(options.rehypePlugins || [])
    .use(_rehype_filter_js__WEBPACK_IMPORTED_MODULE_4__["default"], options)

  const file = new vfile__WEBPACK_IMPORTED_MODULE_5__.VFile()

  if (typeof options.children === 'string') {
    file.value = options.children
  } else if (options.children !== undefined && options.children !== null) {
    console.warn(
      `[react-markdown] Warning: please pass a string as \`children\` (not: \`${options.children}\`)`
    )
  }

  const hastNode = processor.runSync(processor.parse(file), file)

  if (hastNode.type !== 'root') {
    throw new TypeError('Expected a `root` node')
  }

  /** @type {ReactElement} */
  let result = react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
    {},
    (0,_ast_to_react_js__WEBPACK_IMPORTED_MODULE_6__.childrenToReact)({options, schema: property_information__WEBPACK_IMPORTED_MODULE_7__.html, listDepth: 0}, hastNode)
  )

  if (options.className) {
    result = react__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {className: options.className}, result)
  }

  return result
}

ReactMarkdown.defaultProps = {transformLinkUri: _uri_transformer_js__WEBPACK_IMPORTED_MODULE_8__.uriTransformer}

ReactMarkdown.propTypes = {
  // Core options:
  children: prop_types__WEBPACK_IMPORTED_MODULE_9__.string,
  // Layout options:
  className: prop_types__WEBPACK_IMPORTED_MODULE_9__.string,
  // Filter options:
  allowElement: prop_types__WEBPACK_IMPORTED_MODULE_9__.func,
  allowedElements: prop_types__WEBPACK_IMPORTED_MODULE_9__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_9__.string),
  disallowedElements: prop_types__WEBPACK_IMPORTED_MODULE_9__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_9__.string),
  unwrapDisallowed: prop_types__WEBPACK_IMPORTED_MODULE_9__.bool,
  // Plugin options:
  remarkPlugins: prop_types__WEBPACK_IMPORTED_MODULE_9__.arrayOf(
    prop_types__WEBPACK_IMPORTED_MODULE_9__.oneOfType([
      prop_types__WEBPACK_IMPORTED_MODULE_9__.object,
      prop_types__WEBPACK_IMPORTED_MODULE_9__.func,
      prop_types__WEBPACK_IMPORTED_MODULE_9__.arrayOf(
        prop_types__WEBPACK_IMPORTED_MODULE_9__.oneOfType([
          prop_types__WEBPACK_IMPORTED_MODULE_9__.bool,
          prop_types__WEBPACK_IMPORTED_MODULE_9__.string,
          prop_types__WEBPACK_IMPORTED_MODULE_9__.object,
          prop_types__WEBPACK_IMPORTED_MODULE_9__.func,
          prop_types__WEBPACK_IMPORTED_MODULE_9__.arrayOf(
            // prettier-ignore
            // type-coverage:ignore-next-line
            prop_types__WEBPACK_IMPORTED_MODULE_9__.any
          )
        ])
      )
    ])
  ),
  rehypePlugins: prop_types__WEBPACK_IMPORTED_MODULE_9__.arrayOf(
    prop_types__WEBPACK_IMPORTED_MODULE_9__.oneOfType([
      prop_types__WEBPACK_IMPORTED_MODULE_9__.object,
      prop_types__WEBPACK_IMPORTED_MODULE_9__.func,
      prop_types__WEBPACK_IMPORTED_MODULE_9__.arrayOf(
        prop_types__WEBPACK_IMPORTED_MODULE_9__.oneOfType([
          prop_types__WEBPACK_IMPORTED_MODULE_9__.bool,
          prop_types__WEBPACK_IMPORTED_MODULE_9__.string,
          prop_types__WEBPACK_IMPORTED_MODULE_9__.object,
          prop_types__WEBPACK_IMPORTED_MODULE_9__.func,
          prop_types__WEBPACK_IMPORTED_MODULE_9__.arrayOf(
            // prettier-ignore
            // type-coverage:ignore-next-line
            prop_types__WEBPACK_IMPORTED_MODULE_9__.any
          )
        ])
      )
    ])
  ),
  // Transform options:
  sourcePos: prop_types__WEBPACK_IMPORTED_MODULE_9__.bool,
  rawSourcePos: prop_types__WEBPACK_IMPORTED_MODULE_9__.bool,
  skipHtml: prop_types__WEBPACK_IMPORTED_MODULE_9__.bool,
  includeElementIndex: prop_types__WEBPACK_IMPORTED_MODULE_9__.bool,
  transformLinkUri: prop_types__WEBPACK_IMPORTED_MODULE_9__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_9__.func, prop_types__WEBPACK_IMPORTED_MODULE_9__.bool]),
  linkTarget: prop_types__WEBPACK_IMPORTED_MODULE_9__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_9__.func, prop_types__WEBPACK_IMPORTED_MODULE_9__.string]),
  transformImageUri: prop_types__WEBPACK_IMPORTED_MODULE_9__.func,
  components: prop_types__WEBPACK_IMPORTED_MODULE_9__.object
}


/***/ }),

/***/ "./node_modules/react-markdown/lib/rehype-filter.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-markdown/lib/rehype-filter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rehypeFilter)
/* harmony export */ });
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit */ "./node_modules/unist-util-visit/index.js");


/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 *
 * @callback AllowElement
 * @param {Element} element
 * @param {number} index
 * @param {Element|Root} parent
 * @returns {boolean|undefined}
 *
 * @typedef Options
 * @property {Array<string>} [allowedElements]
 * @property {Array<string>} [disallowedElements=[]]
 * @property {AllowElement} [allowElement]
 * @property {boolean} [unwrapDisallowed=false]
 */

/**
 * @type {import('unified').Plugin<[Options], Root>}
 */
function rehypeFilter(options) {
  if (options.allowedElements && options.disallowedElements) {
    throw new TypeError(
      'Only one of `allowedElements` and `disallowedElements` should be defined'
    )
  }

  if (
    options.allowedElements ||
    options.disallowedElements ||
    options.allowElement
  ) {
    return (tree) => {
      (0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__.visit)(tree, 'element', (node, index, parent_) => {
        const parent = /** @type {Element|Root} */ (parent_)
        /** @type {boolean|undefined} */
        let remove

        if (options.allowedElements) {
          remove = !options.allowedElements.includes(node.tagName)
        } else if (options.disallowedElements) {
          remove = options.disallowedElements.includes(node.tagName)
        }

        if (!remove && options.allowElement && typeof index === 'number') {
          remove = !options.allowElement(node, index, parent)
        }

        if (remove && typeof index === 'number') {
          if (options.unwrapDisallowed && node.children) {
            parent.children.splice(index, 1, ...node.children)
          } else {
            parent.children.splice(index, 1)
          }

          return index
        }

        return undefined
      })
    }
  }
}


/***/ }),

/***/ "./node_modules/react-markdown/lib/uri-transformer.js":
/*!************************************************************!*\
  !*** ./node_modules/react-markdown/lib/uri-transformer.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uriTransformer": () => (/* binding */ uriTransformer)
/* harmony export */ });
const protocols = ['http', 'https', 'mailto', 'tel']

/**
 * @param {string} uri
 * @returns {string}
 */
function uriTransformer(uri) {
  const url = (uri || '').trim()
  const first = url.charAt(0)

  if (first === '#' || first === '/') {
    return url
  }

  const colon = url.indexOf(':')
  if (colon === -1) {
    return url
  }

  let index = -1

  while (++index < protocols.length) {
    const protocol = protocols[index]

    if (
      colon === protocol.length &&
      url.slice(0, protocol.length).toLowerCase() === protocol
    ) {
      return url
    }
  }

  index = url.indexOf('?')
  if (index !== -1 && colon > index) {
    return url
  }

  index = url.indexOf('#')
  if (index !== -1 && colon > index) {
    return url
  }

  // eslint-disable-next-line no-script-url
  return 'javascript:void(0)'
}


/***/ }),

/***/ "./node_modules/remark-parse/index.js":
/*!********************************************!*\
  !*** ./node_modules/remark-parse/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/index.js */ "./node_modules/remark-parse/lib/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/remark-parse/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/remark-parse/lib/index.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ remarkParse)
/* harmony export */ });
/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-from-markdown */ "./node_modules/mdast-util-from-markdown/dev/lib/index.js");
/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-from-markdown').Options} Options
 */



/** @type {import('unified').Plugin<[Options?] | void[], string, Root>} */
function remarkParse(options) {
  /** @type {import('unified').ParserFunction<Root>} */
  const parser = (doc) => {
    // Assume options.
    const settings = /** @type {Options} */ (this.data('settings'))

    return (0,mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_0__.fromMarkdown)(
      doc,
      Object.assign({}, settings, options, {
        // Note: these options are not in the readme.
        // The goal is for them to be set by plugins on `data` instead of being
        // passed by users.
        extensions: this.data('micromarkExtensions') || [],
        mdastExtensions: this.data('fromMarkdownExtensions') || []
      })
    )
  }

  Object.assign(this, {Parser: parser})
}


/***/ }),

/***/ "./node_modules/remark-rehype/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/remark-rehype/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mdast_util_to_hast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-to-hast */ "./node_modules/mdast-util-to-hast/lib/index.js");
/**
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('mdast-util-to-hast').Options} Options
 * @typedef {import('unified').Processor<any, any, any, any>} Processor
 *
 * @typedef {import('mdast-util-to-hast')} DoNotTouchAsThisImportIncludesRawInTree
 */



// Note: the `<MdastRoot, HastRoot>` overload doesn’t seem to work :'(

/**
 * Plugin that turns markdown into HTML to support rehype.
 *
 * *   If a destination processor is given, that processor runs with a new HTML
 *     (hast) tree (bridge-mode).
 *     As the given processor runs with a hast tree, and rehype plugins support
 *     hast, that means rehype plugins can be used with the given processor.
 *     The hast tree is discarded in the end.
 *     It’s highly unlikely that you want to do this.
 * *   The common case is to not pass a destination processor, in which case the
 *     current processor continues running with a new HTML (hast) tree
 *     (mutate-mode).
 *     As the current processor continues with a hast tree, and rehype plugins
 *     support hast, that means rehype plugins can be used after
 *     `remark-rehype`.
 *     It’s likely that this is what you want to do.
 *
 * @param destination
 *   Optional unified processor.
 * @param options
 *   Options passed to `mdast-util-to-hast`.
 */
const remarkRehype =
  /** @type {(import('unified').Plugin<[Processor, Options?]|[null|undefined, Options?]|[Options]|[], MdastRoot>)} */
  (
    function (destination, options) {
      return destination && 'run' in destination
        ? bridge(destination, options)
        : mutate(destination || options)
    }
  )

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (remarkRehype);

/**
 * Bridge-mode.
 * Runs the destination with the new hast tree.
 *
 * @type {import('unified').Plugin<[Processor, Options?], MdastRoot>}
 */
function bridge(destination, options) {
  return (node, file, next) => {
    destination.run((0,mdast_util_to_hast__WEBPACK_IMPORTED_MODULE_0__.toHast)(node, options), file, (error) => {
      next(error)
    })
  }
}

/**
 * Mutate-mode.
 * Further plugins run on the hast tree.
 *
 * @type {import('unified').Plugin<[Options?]|void[], MdastRoot, HastRoot>}
 */
function mutate(options) {
  // @ts-expect-error: assume a corresponding node is returned by `toHast`.
  return (node) => (0,mdast_util_to_hast__WEBPACK_IMPORTED_MODULE_0__.toHast)(node, options)
}


/***/ }),

/***/ "./node_modules/space-separated-tokens/index.js":
/*!******************************************************!*\
  !*** ./node_modules/space-separated-tokens/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "stringify": () => (/* binding */ stringify)
/* harmony export */ });
/**
 * Parse space separated tokens to an array of strings.
 *
 * @param {string} value Space separated tokens
 * @returns {Array.<string>} Tokens
 */
function parse(value) {
  const input = String(value || '').trim()
  return input ? input.split(/[ \t\n\r\f]+/g) : []
}

/**
 * Serialize an array of strings as space separated tokens.
 *
 * @param {Array.<string|number>} values Tokens
 * @returns {string} Space separated tokens
 */
function stringify(values) {
  return values.join(' ').trim()
}


/***/ }),

/***/ "./node_modules/trough/index.js":
/*!**************************************!*\
  !*** ./node_modules/trough/index.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trough": () => (/* binding */ trough),
/* harmony export */   "wrap": () => (/* binding */ wrap)
/* harmony export */ });
/**
 * @typedef {(error?: Error|null|undefined, ...output: Array<any>) => void} Callback
 * @typedef {(...input: Array<any>) => any} Middleware
 *
 * @typedef {(...input: Array<any>) => void} Run
 *   Call all middleware.
 * @typedef {(fn: Middleware) => Pipeline} Use
 *   Add `fn` (middleware) to the list.
 * @typedef {{run: Run, use: Use}} Pipeline
 *   Middleware.
 */

/**
 * Create new middleware.
 *
 * @returns {Pipeline}
 */
function trough() {
  /** @type {Array<Middleware>} */
  const fns = []
  /** @type {Pipeline} */
  const pipeline = {run, use}

  return pipeline

  /** @type {Run} */
  function run(...values) {
    let middlewareIndex = -1
    /** @type {Callback} */
    const callback = values.pop()

    if (typeof callback !== 'function') {
      throw new TypeError('Expected function as last argument, not ' + callback)
    }

    next(null, ...values)

    /**
     * Run the next `fn`, or we’re done.
     *
     * @param {Error|null|undefined} error
     * @param {Array<any>} output
     */
    function next(error, ...output) {
      const fn = fns[++middlewareIndex]
      let index = -1

      if (error) {
        callback(error)
        return
      }

      // Copy non-nullish input into values.
      while (++index < values.length) {
        if (output[index] === null || output[index] === undefined) {
          output[index] = values[index]
        }
      }

      // Save the newly created `output` for the next call.
      values = output

      // Next or done.
      if (fn) {
        wrap(fn, next)(...output)
      } else {
        callback(null, ...output)
      }
    }
  }

  /** @type {Use} */
  function use(middelware) {
    if (typeof middelware !== 'function') {
      throw new TypeError(
        'Expected `middelware` to be a function, not ' + middelware
      )
    }

    fns.push(middelware)
    return pipeline
  }
}

/**
 * Wrap `middleware`.
 * Can be sync or async; return a promise, receive a callback, or return new
 * values and errors.
 *
 * @param {Middleware} middleware
 * @param {Callback} callback
 */
function wrap(middleware, callback) {
  /** @type {boolean} */
  let called

  return wrapped

  /**
   * Call `middleware`.
   * @this {any}
   * @param {Array<any>} parameters
   * @returns {void}
   */
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length
    /** @type {any} */
    let result

    if (fnExpectsCallback) {
      parameters.push(done)
    }

    try {
      result = middleware.apply(this, parameters)
    } catch (error) {
      const exception = /** @type {Error} */ (error)

      // Well, this is quite the pickle.
      // `middleware` received a callback and called it synchronously, but that
      // threw an error.
      // The only thing left to do is to throw the thing instead.
      if (fnExpectsCallback && called) {
        throw exception
      }

      return done(exception)
    }

    if (!fnExpectsCallback) {
      if (result instanceof Promise) {
        result.then(then, done)
      } else if (result instanceof Error) {
        done(result)
      } else {
        then(result)
      }
    }
  }

  /**
   * Call `callback`, only once.
   * @type {Callback}
   */
  function done(error, ...output) {
    if (!called) {
      called = true
      callback(error, ...output)
    }
  }

  /**
   * Call `done` with one value.
   *
   * @param {any} [value]
   */
  function then(value) {
    done(null, value)
  }
}


/***/ }),

/***/ "./node_modules/unified/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/unified/lib/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unified": () => (/* binding */ unified)
/* harmony export */ });
/* harmony import */ var bail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bail */ "./node_modules/bail/index.js");
/* harmony import */ var is_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");
/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! extend */ "./node_modules/extend/index.js");
/* harmony import */ var is_plain_obj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is-plain-obj */ "./node_modules/is-plain-obj/index.js");
/* harmony import */ var trough__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! trough */ "./node_modules/trough/index.js");
/* harmony import */ var vfile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vfile */ "./node_modules/vfile/lib/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('vfile').VFileCompatible} VFileCompatible
 * @typedef {import('vfile').VFileValue} VFileValue
 * @typedef {import('..').Processor} Processor
 * @typedef {import('..').Plugin} Plugin
 * @typedef {import('..').Preset} Preset
 * @typedef {import('..').Pluggable} Pluggable
 * @typedef {import('..').PluggableList} PluggableList
 * @typedef {import('..').Transformer} Transformer
 * @typedef {import('..').Parser} Parser
 * @typedef {import('..').Compiler} Compiler
 * @typedef {import('..').RunCallback} RunCallback
 * @typedef {import('..').ProcessCallback} ProcessCallback
 *
 * @typedef Context
 * @property {Node} tree
 * @property {VFile} file
 */








// Expose a frozen processor.
const unified = base().freeze()

const own = {}.hasOwnProperty

// Function to create the first processor.
/**
 * @returns {Processor}
 */
function base() {
  const transformers = (0,trough__WEBPACK_IMPORTED_MODULE_3__.trough)()
  /** @type {Processor['attachers']} */
  const attachers = []
  /** @type {Record<string, unknown>} */
  let namespace = {}
  /** @type {boolean|undefined} */
  let frozen
  let freezeIndex = -1

  // Data management.
  // @ts-expect-error: overloads are handled.
  processor.data = data
  processor.Parser = undefined
  processor.Compiler = undefined

  // Lock.
  processor.freeze = freeze

  // Plugins.
  processor.attachers = attachers
  // @ts-expect-error: overloads are handled.
  processor.use = use

  // API.
  processor.parse = parse
  processor.stringify = stringify
  // @ts-expect-error: overloads are handled.
  processor.run = run
  processor.runSync = runSync
  // @ts-expect-error: overloads are handled.
  processor.process = process
  processor.processSync = processSync

  // Expose.
  return processor

  // Create a new processor based on the processor in the current scope.
  /** @type {Processor} */
  function processor() {
    const destination = base()
    let index = -1

    while (++index < attachers.length) {
      destination.use(...attachers[index])
    }

    destination.data(extend__WEBPACK_IMPORTED_MODULE_1__(true, {}, namespace))

    return destination
  }

  /**
   * @param {string|Record<string, unknown>} [key]
   * @param {unknown} [value]
   * @returns {unknown}
   */
  function data(key, value) {
    if (typeof key === 'string') {
      // Set `key`.
      if (arguments.length === 2) {
        assertUnfrozen('data', frozen)
        namespace[key] = value
        return processor
      }

      // Get `key`.
      return (own.call(namespace, key) && namespace[key]) || null
    }

    // Set space.
    if (key) {
      assertUnfrozen('data', frozen)
      namespace = key
      return processor
    }

    // Get space.
    return namespace
  }

  /** @type {Processor['freeze']} */
  function freeze() {
    if (frozen) {
      return processor
    }

    while (++freezeIndex < attachers.length) {
      const [attacher, ...options] = attachers[freezeIndex]

      if (options[0] === false) {
        continue
      }

      if (options[0] === true) {
        options[0] = undefined
      }

      /** @type {Transformer|void} */
      const transformer = attacher.call(processor, ...options)

      if (typeof transformer === 'function') {
        transformers.use(transformer)
      }
    }

    frozen = true
    freezeIndex = Number.POSITIVE_INFINITY

    return processor
  }

  /**
   * @param {Pluggable|null|undefined} [value]
   * @param {...unknown} options
   * @returns {Processor}
   */
  function use(value, ...options) {
    /** @type {Record<string, unknown>|undefined} */
    let settings

    assertUnfrozen('use', frozen)

    if (value === null || value === undefined) {
      // Empty.
    } else if (typeof value === 'function') {
      addPlugin(value, ...options)
    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        addList(value)
      } else {
        addPreset(value)
      }
    } else {
      throw new TypeError('Expected usable value, not `' + value + '`')
    }

    if (settings) {
      namespace.settings = Object.assign(namespace.settings || {}, settings)
    }

    return processor

    /**
     * @param {import('..').Pluggable<unknown[]>} value
     * @returns {void}
     */
    function add(value) {
      if (typeof value === 'function') {
        addPlugin(value)
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          const [plugin, ...options] = value
          addPlugin(plugin, ...options)
        } else {
          addPreset(value)
        }
      } else {
        throw new TypeError('Expected usable value, not `' + value + '`')
      }
    }

    /**
     * @param {Preset} result
     * @returns {void}
     */
    function addPreset(result) {
      addList(result.plugins)

      if (result.settings) {
        settings = Object.assign(settings || {}, result.settings)
      }
    }

    /**
     * @param {PluggableList|null|undefined} [plugins]
     * @returns {void}
     */
    function addList(plugins) {
      let index = -1

      if (plugins === null || plugins === undefined) {
        // Empty.
      } else if (Array.isArray(plugins)) {
        while (++index < plugins.length) {
          const thing = plugins[index]
          add(thing)
        }
      } else {
        throw new TypeError('Expected a list of plugins, not `' + plugins + '`')
      }
    }

    /**
     * @param {Plugin} plugin
     * @param {...unknown} [value]
     * @returns {void}
     */
    function addPlugin(plugin, value) {
      let index = -1
      /** @type {Processor['attachers'][number]|undefined} */
      let entry

      while (++index < attachers.length) {
        if (attachers[index][0] === plugin) {
          entry = attachers[index]
          break
        }
      }

      if (entry) {
        if ((0,is_plain_obj__WEBPACK_IMPORTED_MODULE_2__["default"])(entry[1]) && (0,is_plain_obj__WEBPACK_IMPORTED_MODULE_2__["default"])(value)) {
          value = extend__WEBPACK_IMPORTED_MODULE_1__(true, entry[1], value)
        }

        entry[1] = value
      } else {
        // @ts-expect-error: fine.
        attachers.push([...arguments])
      }
    }
  }

  /** @type {Processor['parse']} */
  function parse(doc) {
    processor.freeze()
    const file = vfile(doc)
    const Parser = processor.Parser
    assertParser('parse', Parser)

    if (newable(Parser, 'parse')) {
      // @ts-expect-error: `newable` checks this.
      return new Parser(String(file), file).parse()
    }

    // @ts-expect-error: `newable` checks this.
    return Parser(String(file), file) // eslint-disable-line new-cap
  }

  /** @type {Processor['stringify']} */
  function stringify(node, doc) {
    processor.freeze()
    const file = vfile(doc)
    const Compiler = processor.Compiler
    assertCompiler('stringify', Compiler)
    assertNode(node)

    if (newable(Compiler, 'compile')) {
      // @ts-expect-error: `newable` checks this.
      return new Compiler(node, file).compile()
    }

    // @ts-expect-error: `newable` checks this.
    return Compiler(node, file) // eslint-disable-line new-cap
  }

  /**
   * @param {Node} node
   * @param {VFileCompatible|RunCallback} [doc]
   * @param {RunCallback} [callback]
   * @returns {Promise<Node>|void}
   */
  function run(node, doc, callback) {
    assertNode(node)
    processor.freeze()

    if (!callback && typeof doc === 'function') {
      callback = doc
      doc = undefined
    }

    if (!callback) {
      return new Promise(executor)
    }

    executor(null, callback)

    /**
     * @param {null|((node: Node) => void)} resolve
     * @param {(error: Error) => void} reject
     * @returns {void}
     */
    function executor(resolve, reject) {
      // @ts-expect-error: `doc` can’t be a callback anymore, we checked.
      transformers.run(node, vfile(doc), done)

      /**
       * @param {Error|null} error
       * @param {Node} tree
       * @param {VFile} file
       * @returns {void}
       */
      function done(error, tree, file) {
        tree = tree || node
        if (error) {
          reject(error)
        } else if (resolve) {
          resolve(tree)
        } else {
          // @ts-expect-error: `callback` is defined if `resolve` is not.
          callback(null, tree, file)
        }
      }
    }
  }

  /** @type {Processor['runSync']} */
  function runSync(node, file) {
    /** @type {Node|undefined} */
    let result
    /** @type {boolean|undefined} */
    let complete

    processor.run(node, file, done)

    assertDone('runSync', 'run', complete)

    // @ts-expect-error: we either bailed on an error or have a tree.
    return result

    /**
     * @param {Error|null} [error]
     * @param {Node} [tree]
     * @returns {void}
     */
    function done(error, tree) {
      ;(0,bail__WEBPACK_IMPORTED_MODULE_4__.bail)(error)
      result = tree
      complete = true
    }
  }

  /**
   * @param {VFileCompatible} doc
   * @param {ProcessCallback} [callback]
   * @returns {Promise<VFile>|undefined}
   */
  function process(doc, callback) {
    processor.freeze()
    assertParser('process', processor.Parser)
    assertCompiler('process', processor.Compiler)

    if (!callback) {
      return new Promise(executor)
    }

    executor(null, callback)

    /**
     * @param {null|((file: VFile) => void)} resolve
     * @param {(error?: Error|null|undefined) => void} reject
     * @returns {void}
     */
    function executor(resolve, reject) {
      const file = vfile(doc)

      processor.run(processor.parse(file), file, (error, tree, file) => {
        if (error || !tree || !file) {
          done(error)
        } else {
          /** @type {unknown} */
          const result = processor.stringify(tree, file)

          if (result === undefined || result === null) {
            // Empty.
          } else if (looksLikeAVFileValue(result)) {
            file.value = result
          } else {
            file.result = result
          }

          done(error, file)
        }
      })

      /**
       * @param {Error|null|undefined} [error]
       * @param {VFile|undefined} [file]
       * @returns {void}
       */
      function done(error, file) {
        if (error || !file) {
          reject(error)
        } else if (resolve) {
          resolve(file)
        } else {
          // @ts-expect-error: `callback` is defined if `resolve` is not.
          callback(null, file)
        }
      }
    }
  }

  /** @type {Processor['processSync']} */
  function processSync(doc) {
    /** @type {boolean|undefined} */
    let complete

    processor.freeze()
    assertParser('processSync', processor.Parser)
    assertCompiler('processSync', processor.Compiler)

    const file = vfile(doc)

    processor.process(file, done)

    assertDone('processSync', 'process', complete)

    return file

    /**
     * @param {Error|null|undefined} [error]
     * @returns {void}
     */
    function done(error) {
      complete = true
      ;(0,bail__WEBPACK_IMPORTED_MODULE_4__.bail)(error)
    }
  }
}

/**
 * Check if `value` is a constructor.
 *
 * @param {unknown} value
 * @param {string} name
 * @returns {boolean}
 */
function newable(value, name) {
  return (
    typeof value === 'function' &&
    // Prototypes do exist.
    // type-coverage:ignore-next-line
    value.prototype &&
    // A function with keys in its prototype is probably a constructor.
    // Classes’ prototype methods are not enumerable, so we check if some value
    // exists in the prototype.
    // type-coverage:ignore-next-line
    (keys(value.prototype) || name in value.prototype)
  )
}

/**
 * Check if `value` is an object with keys.
 *
 * @param {Record<string, unknown>} value
 * @returns {boolean}
 */
function keys(value) {
  /** @type {string} */
  let key

  for (key in value) {
    if (own.call(value, key)) {
      return true
    }
  }

  return false
}

/**
 * Assert a parser is available.
 *
 * @param {string} name
 * @param {unknown} value
 * @returns {asserts value is Parser}
 */
function assertParser(name, value) {
  if (typeof value !== 'function') {
    throw new TypeError('Cannot `' + name + '` without `Parser`')
  }
}

/**
 * Assert a compiler is available.
 *
 * @param {string} name
 * @param {unknown} value
 * @returns {asserts value is Compiler}
 */
function assertCompiler(name, value) {
  if (typeof value !== 'function') {
    throw new TypeError('Cannot `' + name + '` without `Compiler`')
  }
}

/**
 * Assert the processor is not frozen.
 *
 * @param {string} name
 * @param {unknown} frozen
 * @returns {asserts frozen is false}
 */
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      'Cannot call `' +
        name +
        '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
    )
  }
}

/**
 * Assert `node` is a unist node.
 *
 * @param {unknown} node
 * @returns {asserts node is Node}
 */
function assertNode(node) {
  // `isPlainObj` unfortunately uses `any` instead of `unknown`.
  // type-coverage:ignore-next-line
  if (!(0,is_plain_obj__WEBPACK_IMPORTED_MODULE_2__["default"])(node) || typeof node.type !== 'string') {
    throw new TypeError('Expected node, got `' + node + '`')
    // Fine.
  }
}

/**
 * Assert that `complete` is `true`.
 *
 * @param {string} name
 * @param {string} asyncName
 * @param {unknown} complete
 * @returns {asserts complete is true}
 */
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      '`' + name + '` finished async. Use `' + asyncName + '` instead'
    )
  }
}

/**
 * @param {VFileCompatible} [value]
 * @returns {VFile}
 */
function vfile(value) {
  return looksLikeAVFile(value) ? value : new vfile__WEBPACK_IMPORTED_MODULE_5__.VFile(value)
}

/**
 * @param {VFileCompatible} [value]
 * @returns {value is VFile}
 */
function looksLikeAVFile(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'message' in value &&
      'messages' in value
  )
}

/**
 * @param {unknown} [value]
 * @returns {value is VFileValue}
 */
function looksLikeAVFileValue(value) {
  return typeof value === 'string' || is_buffer__WEBPACK_IMPORTED_MODULE_0__(value)
}


/***/ }),

/***/ "./node_modules/unist-builder/index.js":
/*!*********************************************!*\
  !*** ./node_modules/unist-builder/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ u)
/* harmony export */ });
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist').Literal} Literal
 * @typedef {Object.<string, unknown>} Props
 * @typedef {Array.<Node>|string} ChildrenOrValue
 *
 * @typedef {(<T extends string, P extends Record<string, unknown>, C extends Node[]>(type: T, props: P, children: C) => {type: T, children: C} & P)} BuildParentWithProps
 * @typedef {(<T extends string, P extends Record<string, unknown>>(type: T, props: P, value: string) => {type: T, value: string} & P)} BuildLiteralWithProps
 * @typedef {(<T extends string, P extends Record<string, unknown>>(type: T, props: P) => {type: T} & P)} BuildVoidWithProps
 * @typedef {(<T extends string, C extends Node[]>(type: T, children: C) => {type: T, children: C})} BuildParent
 * @typedef {(<T extends string>(type: T, value: string) => {type: T, value: string})} BuildLiteral
 * @typedef {(<T extends string>(type: T) => {type: T})} BuildVoid
 */

var u = /**
 * @type {BuildVoid & BuildVoidWithProps & BuildLiteral & BuildLiteralWithProps & BuildParent & BuildParentWithProps}
 */ (
  /**
   * @param {string} type Type of node
   * @param {Props|ChildrenOrValue} [props] Additional properties for node (or `children` or `value`)
   * @param {ChildrenOrValue} [value] `children` or `value` of node
   * @returns {Node}
   */
  function (type, props, value) {
    /** @type {Node} */
    var node = {type: String(type)}

    if (
      (value === undefined || value === null) &&
      (typeof props === 'string' || Array.isArray(props))
    ) {
      value = props
    } else {
      Object.assign(node, props)
    }

    if (Array.isArray(value)) {
      node.children = value
    } else if (value !== undefined && value !== null) {
      node.value = String(value)
    }

    return node
  }
)


/***/ }),

/***/ "./node_modules/unist-util-generated/index.js":
/*!****************************************************!*\
  !*** ./node_modules/unist-util-generated/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generated": () => (/* binding */ generated)
/* harmony export */ });
/**
 * @typedef {Object} PointLike
 * @property {number} [line]
 * @property {number} [column]
 * @property {number} [offset]
 *
 * @typedef {Object} PositionLike
 * @property {PointLike} [start]
 * @property {PointLike} [end]
 *
 * @typedef {Object} NodeLike
 * @property {PositionLike} [position]
 */

/**
 * Check if `node` is *generated*.
 *
 * @param {NodeLike} [node]
 * @returns {boolean}
 */
function generated(node) {
  return (
    !node ||
    !node.position ||
    !node.position.start ||
    !node.position.start.line ||
    !node.position.start.column ||
    !node.position.end ||
    !node.position.end.line ||
    !node.position.end.column
  )
}


/***/ }),

/***/ "./node_modules/unist-util-is/index.js":
/*!*********************************************!*\
  !*** ./node_modules/unist-util-is/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convert": () => (/* binding */ convert),
/* harmony export */   "is": () => (/* binding */ is)
/* harmony export */ });
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {string} Type
 * @typedef {Object<string, unknown>} Props
 *
 * @typedef {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} Test
 */

/**
 * Check if a node passes a test
 *
 * @callback TestFunctionAnything
 * @param {Node} node
 * @param {number|null|undefined} [index]
 * @param {Parent|null|undefined} [parent]
 * @returns {boolean|void}
 */

/**
 * Check if a node passes a certain node test
 *
 * @template {Node} X
 * @callback TestFunctionPredicate
 * @param {Node} node
 * @param {number|null|undefined} [index]
 * @param {Parent|null|undefined} [parent]
 * @returns {node is X}
 */

/**
 * @callback AssertAnything
 * @param {unknown} [node]
 * @param {number|null|undefined} [index]
 * @param {Parent|null|undefined} [parent]
 * @returns {boolean}
 */

/**
 * Check if a node passes a certain node test
 *
 * @template {Node} Y
 * @callback AssertPredicate
 * @param {unknown} [node]
 * @param {number|null|undefined} [index]
 * @param {Parent|null|undefined} [parent]
 * @returns {node is Y}
 */

const is =
  /**
   * Check if a node passes a test.
   * When a `parent` node is known the `index` of node should also be given.
   *
   * @type {(
   *   (<T extends Node>(node: unknown, test: T['type']|Partial<T>|TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|TestFunctionPredicate<T>>, index?: number|null|undefined, parent?: Parent|null|undefined, context?: unknown) => node is T) &
   *   ((node?: unknown, test?: Test, index?: number|null|undefined, parent?: Parent|null|undefined, context?: unknown) => boolean)
   * )}
   */
  (
    /**
     * Check if a node passes a test.
     * When a `parent` node is known the `index` of node should also be given.
     *
     * @param {unknown} [node] Node to check
     * @param {Test} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @param {number|null|undefined} [index] Position of `node` in `parent`
     * @param {Parent|null|undefined} [parent] Parent of `node`
     * @param {unknown} [context] Context object to invoke `test` with
     * @returns {boolean} Whether test passed and `node` is a `Node` (object with `type` set to non-empty `string`).
     */
    // eslint-disable-next-line max-params
    function is(node, test, index, parent, context) {
      const check = convert(test)

      if (
        index !== undefined &&
        index !== null &&
        (typeof index !== 'number' ||
          index < 0 ||
          index === Number.POSITIVE_INFINITY)
      ) {
        throw new Error('Expected positive finite index')
      }

      if (
        parent !== undefined &&
        parent !== null &&
        (!is(parent) || !parent.children)
      ) {
        throw new Error('Expected parent node')
      }

      if (
        (parent === undefined || parent === null) !==
        (index === undefined || index === null)
      ) {
        throw new Error('Expected both parent and index')
      }

      // @ts-expect-error Looks like a node.
      return node && node.type && typeof node.type === 'string'
        ? Boolean(check.call(context, node, index, parent))
        : false
    }
  )

const convert =
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  (
    /**
     * Generate an assertion from a check.
     * @param {Test} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @returns {AssertAnything}
     */
    function (test) {
      if (test === undefined || test === null) {
        return ok
      }

      if (typeof test === 'string') {
        return typeFactory(test)
      }

      if (typeof test === 'object') {
        return Array.isArray(test) ? anyFactory(test) : propsFactory(test)
      }

      if (typeof test === 'function') {
        return castFactory(test)
      }

      throw new Error('Expected function, string, or object as test')
    }
  )
/**
 * @param {Array.<Type|Props|TestFunctionAnything>} tests
 * @returns {AssertAnything}
 */
function anyFactory(tests) {
  /** @type {Array.<AssertAnything>} */
  const checks = []
  let index = -1

  while (++index < tests.length) {
    checks[index] = convert(tests[index])
  }

  return castFactory(any)

  /**
   * @this {unknown}
   * @param {unknown[]} parameters
   * @returns {boolean}
   */
  function any(...parameters) {
    let index = -1

    while (++index < checks.length) {
      if (checks[index].call(this, ...parameters)) return true
    }

    return false
  }
}

/**
 * Utility to assert each property in `test` is represented in `node`, and each
 * values are strictly equal.
 *
 * @param {Props} check
 * @returns {AssertAnything}
 */
function propsFactory(check) {
  return castFactory(all)

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function all(node) {
    /** @type {string} */
    let key

    for (key in check) {
      // @ts-expect-error: hush, it sure works as an index.
      if (node[key] !== check[key]) return false
    }

    return true
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 *
 * @param {Type} check
 * @returns {AssertAnything}
 */
function typeFactory(check) {
  return castFactory(type)

  /**
   * @param {Node} node
   */
  function type(node) {
    return node && node.type === check
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 * @param {TestFunctionAnything} check
 * @returns {AssertAnything}
 */
function castFactory(check) {
  return assertion

  /**
   * @this {unknown}
   * @param {Array.<unknown>} parameters
   * @returns {boolean}
   */
  function assertion(...parameters) {
    // @ts-expect-error: spreading is fine.
    return Boolean(check.call(this, ...parameters))
  }
}

// Utility to return true.
function ok() {
  return true
}


/***/ }),

/***/ "./node_modules/unist-util-position/index.js":
/*!***************************************************!*\
  !*** ./node_modules/unist-util-position/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pointEnd": () => (/* binding */ pointEnd),
/* harmony export */   "pointStart": () => (/* binding */ pointStart),
/* harmony export */   "position": () => (/* binding */ position)
/* harmony export */ });
/**
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Node} Node
 * @typedef {Record<string, unknown> & {type: string, position?: PositionLike|undefined}} NodeLike
 * @typedef {import('unist').Point} Point
 *
 * @typedef {Partial<Point>} PointLike
 *
 * @typedef PositionLike
 * @property {PointLike} [start]
 * @property {PointLike} [end]
 */

const pointStart = point('start')
const pointEnd = point('end')

/**
 * Get the positional info of `node`.
 *
 * @param {NodeLike|Node} [node]
 * @returns {Position}
 */
function position(node) {
  return {start: pointStart(node), end: pointEnd(node)}
}

/**
 * Get the positional info of `node`.
 *
 * @param {'start'|'end'} type
 */
function point(type) {
  return point

  /**
   * Get the positional info of `node`.
   *
   * @param {NodeLike|Node} [node]
   * @returns {Point}
   */
  function point(node) {
    const point = (node && node.position && node.position[type]) || {}

    return {
      line: point.line || null,
      column: point.column || null,
      offset: point.offset > -1 ? point.offset : null
    }
  }
}


/***/ }),

/***/ "./node_modules/unist-util-stringify-position/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/unist-util-stringify-position/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stringifyPosition": () => (/* binding */ stringifyPosition)
/* harmony export */ });
/**
 * @typedef {import('unist').Point} Point
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Position} Position
 * @typedef {object & {type: string, position?: Position|undefined}} NodeLike
 */

/**
 * Stringify one point, a position (start and end points), or a node’s
 * positional information.
 *
 * @param {Node|NodeLike|Position|Point|null} [value]
 * @returns {string}
 */
function stringifyPosition(value) {
  // Nothing.
  if (!value || typeof value !== 'object') {
    return ''
  }

  // Node.
  if ('position' in value || 'type' in value) {
    return position(value.position)
  }

  // Position.
  if ('start' in value || 'end' in value) {
    return position(value)
  }

  // Point.
  if ('line' in value || 'column' in value) {
    return point(value)
  }

  // ?
  return ''
}

/**
 * @param {Point|undefined} point
 * @returns {string}
 */
function point(point) {
  return index(point && point.line) + ':' + index(point && point.column)
}

/**
 * @param {Position|undefined} pos
 * @returns {string}
 */
function position(pos) {
  return point(pos && pos.start) + '-' + point(pos && pos.end)
}

/**
 * @param {number|undefined} value
 * @returns {number}
 */
function index(value) {
  return value && typeof value === 'number' ? value : 1
}


/***/ }),

/***/ "./node_modules/unist-util-visit-parents/color.js":
/*!********************************************************!*\
  !*** ./node_modules/unist-util-visit-parents/color.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "color": () => (/* binding */ color)
/* harmony export */ });
/**
 * @param {string} d
 * @returns {string}
 */
function color(d) {
  return '\u001B[33m' + d + '\u001B[39m'
}


/***/ }),

/***/ "./node_modules/unist-util-visit-parents/index.js":
/*!********************************************************!*\
  !*** ./node_modules/unist-util-visit-parents/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTINUE": () => (/* binding */ CONTINUE),
/* harmony export */   "EXIT": () => (/* binding */ EXIT),
/* harmony export */   "SKIP": () => (/* binding */ SKIP),
/* harmony export */   "visitParents": () => (/* binding */ visitParents)
/* harmony export */ });
/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ "./node_modules/unist-util-is/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "./node_modules/unist-util-visit-parents/color.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('./complex-types').Action} Action
 * @typedef {import('./complex-types').Index} Index
 * @typedef {import('./complex-types').ActionTuple} ActionTuple
 * @typedef {import('./complex-types').VisitorResult} VisitorResult
 * @typedef {import('./complex-types').Visitor} Visitor
 */




/**
 * Continue traversing as normal
 */
const CONTINUE = true
/**
 * Do not traverse this node’s children
 */
const SKIP = 'skip'
/**
 * Stop traversing immediately
 */
const EXIT = false

/**
 * Visit children of tree which pass a test
 *
 * @param tree Abstract syntax tree to walk
 * @param test Test node, optional
 * @param visitor Function to run for each node
 * @param reverse Visit the tree in reverse order, defaults to false
 */
const visitParents =
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {import('./complex-types').Visitor<Node>} visitor
     * @param {boolean} [reverse]
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor
        // @ts-expect-error no visitor given, so `visitor` is test.
        visitor = test
        test = null
      }

      const is = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)(test)
      const step = reverse ? -1 : 1

      factory(tree, null, [])()

      /**
       * @param {Node} node
       * @param {number?} index
       * @param {Array.<Parent>} parents
       */
      function factory(node, index, parents) {
        /** @type {Object.<string, unknown>} */
        // @ts-expect-error: hush
        const value = typeof node === 'object' && node !== null ? node : {}
        /** @type {string|undefined} */
        let name

        if (typeof value.type === 'string') {
          name =
            typeof value.tagName === 'string'
              ? value.tagName
              : typeof value.name === 'string'
              ? value.name
              : undefined

          Object.defineProperty(visit, 'name', {
            value:
              'node (' +
              (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.color)(value.type + (name ? '<' + name + '>' : '')) +
              ')'
          })
        }

        return visit

        function visit() {
          /** @type {ActionTuple} */
          let result = []
          /** @type {ActionTuple} */
          let subresult
          /** @type {number} */
          let offset
          /** @type {Array.<Parent>} */
          let grandparents

          if (!test || is(node, index, parents[parents.length - 1] || null)) {
            result = toResult(visitor(node, parents))

            if (result[0] === EXIT) {
              return result
            }
          }

          // @ts-expect-error looks like a parent.
          if (node.children && result[0] !== SKIP) {
            // @ts-expect-error looks like a parent.
            offset = (reverse ? node.children.length : -1) + step
            // @ts-expect-error looks like a parent.
            grandparents = parents.concat(node)

            // @ts-expect-error looks like a parent.
            while (offset > -1 && offset < node.children.length) {
              // @ts-expect-error looks like a parent.
              subresult = factory(node.children[offset], offset, grandparents)()

              if (subresult[0] === EXIT) {
                return subresult
              }

              offset =
                typeof subresult[1] === 'number' ? subresult[1] : offset + step
            }
          }

          return result
        }
      }
    }
  )

/**
 * @param {VisitorResult} value
 * @returns {ActionTuple}
 */
function toResult(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'number') {
    return [CONTINUE, value]
  }

  return [value]
}


/***/ }),

/***/ "./node_modules/unist-util-visit/index.js":
/*!************************************************!*\
  !*** ./node_modules/unist-util-visit/index.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTINUE": () => (/* reexport safe */ unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.CONTINUE),
/* harmony export */   "EXIT": () => (/* reexport safe */ unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.EXIT),
/* harmony export */   "SKIP": () => (/* reexport safe */ unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.SKIP),
/* harmony export */   "visit": () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit-parents */ "./node_modules/unist-util-visit-parents/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
 * @typedef {import('./complex-types').Visitor} Visitor
 */





/**
 * Visit children of tree which pass a test
 *
 * @param tree Abstract syntax tree to walk
 * @param test Test, optional
 * @param visitor Function to run for each node
 * @param reverse Fisit the tree in reverse, defaults to false
 */
const visit =
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {import('./complex-types').Visitor} visitor
     * @param {boolean} [reverse]
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor
        visitor = test
        test = null
      }

      (0,unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_0__.visitParents)(tree, test, overload, reverse)

      /**
       * @param {Node} node
       * @param {Array.<Parent>} parents
       */
      function overload(node, parents) {
        const parent = parents[parents.length - 1]
        return visitor(
          node,
          parent ? parent.children.indexOf(node) : null,
          parent
        )
      }
    }
  )


/***/ }),

/***/ "./node_modules/uvu/assert/index.mjs":
/*!*******************************************!*\
  !*** ./node_modules/uvu/assert/index.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Assertion": () => (/* binding */ Assertion),
/* harmony export */   "equal": () => (/* binding */ equal),
/* harmony export */   "fixture": () => (/* binding */ fixture),
/* harmony export */   "instance": () => (/* binding */ instance),
/* harmony export */   "is": () => (/* binding */ is),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "not": () => (/* binding */ not),
/* harmony export */   "ok": () => (/* binding */ ok),
/* harmony export */   "snapshot": () => (/* binding */ snapshot),
/* harmony export */   "throws": () => (/* binding */ throws),
/* harmony export */   "type": () => (/* binding */ type),
/* harmony export */   "unreachable": () => (/* binding */ unreachable)
/* harmony export */ });
/* harmony import */ var dequal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dequal */ "./node_modules/dequal/dist/index.mjs");
/* harmony import */ var uvu_diff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uvu/diff */ "./node_modules/uvu/diff/index.mjs");



function dedent(str) {
	str = str.replace(/\r?\n/g, '\n');
  let arr = str.match(/^[ \t]*(?=\S)/gm);
  let i = 0, min = 1/0, len = (arr||[]).length;
  for (; i < len; i++) min = Math.min(min, arr[i].length);
  return len && min ? str.replace(new RegExp(`^[ \\t]{${min}}`, 'gm'), '') : str;
}

class Assertion extends Error {
	constructor(opts={}) {
		super(opts.message);
		this.name = 'Assertion';
		this.code = 'ERR_ASSERTION';
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
		this.details = opts.details || false;
		this.generated = !!opts.generated;
		this.operator = opts.operator;
		this.expects = opts.expects;
		this.actual = opts.actual;
	}
}

function assert(bool, actual, expects, operator, detailer, backup, msg) {
	if (bool) return;
	let message = msg || backup;
	if (msg instanceof Error) throw msg;
	let details = detailer && detailer(actual, expects);
	throw new Assertion({ actual, expects, operator, message, details, generated: !msg });
}

function ok(val, msg) {
	assert(!!val, false, true, 'ok', false, 'Expected value to be truthy', msg);
}

function is(val, exp, msg) {
	assert(val === exp, val, exp, 'is', uvu_diff__WEBPACK_IMPORTED_MODULE_1__.compare, 'Expected values to be strictly equal:', msg);
}

function equal(val, exp, msg) {
	assert((0,dequal__WEBPACK_IMPORTED_MODULE_0__.dequal)(val, exp), val, exp, 'equal', uvu_diff__WEBPACK_IMPORTED_MODULE_1__.compare, 'Expected values to be deeply equal:', msg);
}

function unreachable(msg) {
	assert(false, true, false, 'unreachable', false, 'Expected not to be reached!', msg);
}

function type(val, exp, msg) {
	let tmp = typeof val;
	assert(tmp === exp, tmp, exp, 'type', false, `Expected "${tmp}" to be "${exp}"`, msg);
}

function instance(val, exp, msg) {
	let name = '`' + (exp.name || exp.constructor.name) + '`';
	assert(val instanceof exp, val, exp, 'instance', false, `Expected value to be an instance of ${name}`, msg);
}

function match(val, exp, msg) {
	if (typeof exp === 'string') {
		assert(val.includes(exp), val, exp, 'match', false, `Expected value to include "${exp}" substring`, msg);
	} else {
		assert(exp.test(val), val, exp, 'match', false, `Expected value to match \`${String(exp)}\` pattern`, msg);
	}
}

function snapshot(val, exp, msg) {
	val=dedent(val); exp=dedent(exp);
	assert(val === exp, val, exp, 'snapshot', uvu_diff__WEBPACK_IMPORTED_MODULE_1__.lines, 'Expected value to match snapshot:', msg);
}

const lineNums = (x, y) => (0,uvu_diff__WEBPACK_IMPORTED_MODULE_1__.lines)(x, y, 1);
function fixture(val, exp, msg) {
	val=dedent(val); exp=dedent(exp);
	assert(val === exp, val, exp, 'fixture', lineNums, 'Expected value to match fixture:', msg);
}

function throws(blk, exp, msg) {
	if (!msg && typeof exp === 'string') {
		msg = exp; exp = null;
	}

	try {
		blk();
		assert(false, false, true, 'throws', false, 'Expected function to throw', msg);
	} catch (err) {
		if (err instanceof Assertion) throw err;

		if (typeof exp === 'function') {
			assert(exp(err), false, true, 'throws', false, 'Expected function to throw matching exception', msg);
		} else if (exp instanceof RegExp) {
			assert(exp.test(err.message), false, true, 'throws', false, `Expected function to throw exception matching \`${String(exp)}\` pattern`, msg);
		}
	}
}

// ---

function not(val, msg) {
	assert(!val, true, false, 'not', false, 'Expected value to be falsey', msg);
}

not.ok = not;

is.not = function (val, exp, msg) {
	assert(val !== exp, val, exp, 'is.not', false, 'Expected values not to be strictly equal', msg);
}

not.equal = function (val, exp, msg) {
	assert(!(0,dequal__WEBPACK_IMPORTED_MODULE_0__.dequal)(val, exp), val, exp, 'not.equal', false, 'Expected values not to be deeply equal', msg);
}

not.type = function (val, exp, msg) {
	let tmp = typeof val;
	assert(tmp !== exp, tmp, exp, 'not.type', false, `Expected "${tmp}" not to be "${exp}"`, msg);
}

not.instance = function (val, exp, msg) {
	let name = '`' + (exp.name || exp.constructor.name) + '`';
	assert(!(val instanceof exp), val, exp, 'not.instance', false, `Expected value not to be an instance of ${name}`, msg);
}

not.snapshot = function (val, exp, msg) {
	val=dedent(val); exp=dedent(exp);
	assert(val !== exp, val, exp, 'not.snapshot', false, 'Expected value not to match snapshot', msg);
}

not.fixture = function (val, exp, msg) {
	val=dedent(val); exp=dedent(exp);
	assert(val !== exp, val, exp, 'not.fixture', false, 'Expected value not to match fixture', msg);
}

not.match = function (val, exp, msg) {
	if (typeof exp === 'string') {
		assert(!val.includes(exp), val, exp, 'not.match', false, `Expected value not to include "${exp}" substring`, msg);
	} else {
		assert(!exp.test(val), val, exp, 'not.match', false, `Expected value not to match \`${String(exp)}\` pattern`, msg);
	}
}

not.throws = function (blk, exp, msg) {
	if (!msg && typeof exp === 'string') {
		msg = exp; exp = null;
	}

	try {
		blk();
	} catch (err) {
		if (typeof exp === 'function') {
			assert(!exp(err), true, false, 'not.throws', false, 'Expected function not to throw matching exception', msg);
		} else if (exp instanceof RegExp) {
			assert(!exp.test(err.message), true, false, 'not.throws', false, `Expected function not to throw exception matching \`${String(exp)}\` pattern`, msg);
		} else if (!exp) {
			assert(false, true, false, 'not.throws', false, 'Expected function not to throw', msg);
		}
	}
}


/***/ }),

/***/ "./node_modules/uvu/diff/index.mjs":
/*!*****************************************!*\
  !*** ./node_modules/uvu/diff/index.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrays": () => (/* binding */ arrays),
/* harmony export */   "chars": () => (/* binding */ chars),
/* harmony export */   "circular": () => (/* binding */ circular),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "direct": () => (/* binding */ direct),
/* harmony export */   "lines": () => (/* binding */ lines),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "stringify": () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var kleur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kleur */ "./node_modules/uvu/node_modules/kleur/index.mjs");
/* harmony import */ var diff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diff */ "./node_modules/uvu/node_modules/diff/lib/index.mjs");



const colors = {
	'--': kleur__WEBPACK_IMPORTED_MODULE_0__["default"].red,
	'··': kleur__WEBPACK_IMPORTED_MODULE_0__["default"].grey,
	'++': kleur__WEBPACK_IMPORTED_MODULE_0__["default"].green,
};

const TITLE = kleur__WEBPACK_IMPORTED_MODULE_0__["default"].dim().italic;
const TAB=kleur__WEBPACK_IMPORTED_MODULE_0__["default"].dim('→'), SPACE=kleur__WEBPACK_IMPORTED_MODULE_0__["default"].dim('·'), NL=kleur__WEBPACK_IMPORTED_MODULE_0__["default"].dim('↵');
const LOG = (sym, str) => colors[sym](sym + PRETTY(str)) + '\n';
const LINE = (num, x) => kleur__WEBPACK_IMPORTED_MODULE_0__["default"].dim('L' + String(num).padStart(x, '0') + ' ');
const PRETTY = str => str.replace(/[ ]/g, SPACE).replace(/\t/g, TAB).replace(/(\r?\n)/g, NL);

function line(obj, prev, pad) {
	let char = obj.removed ? '--' : obj.added ? '++' : '··';
	let arr = obj.value.replace(/\r?\n$/, '').split('\n');
	let i=0, tmp, out='';

	if (obj.added) out += colors[char]().underline(TITLE('Expected:')) + '\n';
	else if (obj.removed) out += colors[char]().underline(TITLE('Actual:')) + '\n';

	for (; i < arr.length; i++) {
		tmp = arr[i];
		if (tmp != null) {
			if (prev) out += LINE(prev + i, pad);
			out += LOG(char, tmp || '\n');
		}
	}

	return out;
}

// TODO: want better diffing
//~> complex items bail outright
function arrays(input, expect) {
	let arr = diff__WEBPACK_IMPORTED_MODULE_1__.diffArrays(input, expect);
	let i=0, j=0, k=0, tmp, val, char, isObj, str;
	let out = LOG('··', '[');

	for (; i < arr.length; i++) {
		char = (tmp = arr[i]).removed ? '--' : tmp.added ? '++' : '··';

		if (tmp.added) {
			out += colors[char]().underline(TITLE('Expected:')) + '\n';
		} else if (tmp.removed) {
			out += colors[char]().underline(TITLE('Actual:')) + '\n';
		}

		for (j=0; j < tmp.value.length; j++) {
			isObj = (tmp.value[j] && typeof tmp.value[j] === 'object');
			val = stringify(tmp.value[j]).split(/\r?\n/g);
			for (k=0; k < val.length;) {
				str = '  ' + val[k++] + (isObj ? '' : ',');
				if (isObj && k === val.length && (j + 1) < tmp.value.length) str += ',';
				out += LOG(char, str);
			}
		}
	}

	return out + LOG('··', ']');
}

function lines(input, expect, linenum = 0) {
	let i=0, tmp, output='';
	let arr = diff__WEBPACK_IMPORTED_MODULE_1__.diffLines(input, expect);
	let pad = String(expect.split(/\r?\n/g).length - linenum).length;

	for (; i < arr.length; i++) {
		output += line(tmp = arr[i], linenum, pad);
		if (linenum && !tmp.removed) linenum += tmp.count;
	}

	return output;
}

function chars(input, expect) {
	let arr = diff__WEBPACK_IMPORTED_MODULE_1__.diffChars(input, expect);
	let i=0, output='', tmp;

	let l1 = input.length;
	let l2 = expect.length;

	let p1 = PRETTY(input);
	let p2 = PRETTY(expect);

	tmp = arr[i];

	if (l1 === l2) {
		// no length offsets
	} else if (tmp.removed && arr[i + 1]) {
		let del = tmp.count - arr[i + 1].count;
		if (del == 0) {
			// wash~
		} else if (del > 0) {
			expect = ' '.repeat(del) + expect;
			p2 = ' '.repeat(del) + p2;
			l2 += del;
		} else if (del < 0) {
			input = ' '.repeat(-del) + input;
			p1 = ' '.repeat(-del) + p1;
			l1 += -del;
		}
	}

	output += direct(p1, p2, l1, l2);

	if (l1 === l2) {
		for (tmp='  '; i < l1; i++) {
			tmp += input[i] === expect[i] ? ' ' : '^';
		}
	} else {
		for (tmp='  '; i < arr.length; i++) {
			tmp += ((arr[i].added || arr[i].removed) ? '^' : ' ').repeat(Math.max(arr[i].count, 0));
			if (i + 1 < arr.length && ((arr[i].added && arr[i+1].removed) || (arr[i].removed && arr[i+1].added))) {
				arr[i + 1].count -= arr[i].count;
			}
		}
	}

	return output + kleur__WEBPACK_IMPORTED_MODULE_0__["default"].red(tmp);
}

function direct(input, expect, lenA = String(input).length, lenB = String(expect).length) {
	let gutter = 4;
	let lenC = Math.max(lenA, lenB);
	let typeA=typeof input, typeB=typeof expect;

	if (typeA !== typeB) {
		gutter = 2;

		let delA = gutter + lenC - lenA;
		let delB = gutter + lenC - lenB;

		input += ' '.repeat(delA) + kleur__WEBPACK_IMPORTED_MODULE_0__["default"].dim(`[${typeA}]`);
		expect += ' '.repeat(delB) + kleur__WEBPACK_IMPORTED_MODULE_0__["default"].dim(`[${typeB}]`);

		lenA += delA + typeA.length + 2;
		lenB += delB + typeB.length + 2;
		lenC = Math.max(lenA, lenB);
	}

	let output = colors['++']('++' + expect + ' '.repeat(gutter + lenC - lenB) + TITLE('(Expected)')) + '\n';
	return output + colors['--']('--' + input + ' '.repeat(gutter + lenC - lenA) + TITLE('(Actual)')) + '\n';
}

function sort(input, expect) {
	var k, i=0, tmp, isArr = Array.isArray(input);
	var keys=[], out=isArr ? Array(input.length) : {};

	if (isArr) {
		for (i=0; i < out.length; i++) {
			tmp = input[i];
			if (!tmp || typeof tmp !== 'object') out[i] = tmp;
			else out[i] = sort(tmp, expect[i]); // might not be right
		}
	} else {
		for (k in expect)
			keys.push(k);

		for (; i < keys.length; i++) {
			if (Object.prototype.hasOwnProperty.call(input, k = keys[i])) {
				if (!(tmp = input[k]) || typeof tmp !== 'object') out[k] = tmp;
				else out[k] = sort(tmp, expect[k]);
			}
		}

		for (k in input) {
			if (!out.hasOwnProperty(k)) {
				out[k] = input[k]; // expect didnt have
			}
		}
	}

	return out;
}

function circular() {
	var cache = new Set;
	return function print(key, val) {
		if (val === void 0) return '[__VOID__]';
		if (typeof val === 'number' && val !== val) return '[__NAN__]';
		if (!val || typeof val !== 'object') return val;
		if (cache.has(val)) return '[Circular]';
		cache.add(val); return val;
	}
}

function stringify(input) {
	return JSON.stringify(input, circular(), 2).replace(/"\[__NAN__\]"/g, 'NaN').replace(/"\[__VOID__\]"/g, 'undefined');
}

function compare(input, expect) {
	if (Array.isArray(expect) && Array.isArray(input)) return arrays(input, expect);
	if (expect instanceof RegExp) return chars(''+input, ''+expect);

	let isA = input && typeof input == 'object';
	let isB = expect && typeof expect == 'object';

	if (isA && isB) input = sort(input, expect);
	if (isB) expect = stringify(expect);
	if (isA) input = stringify(input);

	if (expect && typeof expect == 'object') {
		input = stringify(sort(input, expect));
		expect = stringify(expect);
	}

	isA = typeof input == 'string';
	isB = typeof expect == 'string';

	if (isA && /\r?\n/.test(input)) return lines(input, ''+expect);
	if (isB && /\r?\n/.test(expect)) return lines(''+input, expect);
	if (isA && isB) return chars(input, expect);

	return direct(input, expect);
}


/***/ }),

/***/ "./node_modules/uvu/node_modules/diff/lib/index.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/uvu/node_modules/diff/lib/index.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Diff": () => (/* binding */ Diff),
/* harmony export */   "applyPatch": () => (/* binding */ applyPatch),
/* harmony export */   "applyPatches": () => (/* binding */ applyPatches),
/* harmony export */   "canonicalize": () => (/* binding */ canonicalize),
/* harmony export */   "convertChangesToDMP": () => (/* binding */ convertChangesToDMP),
/* harmony export */   "convertChangesToXML": () => (/* binding */ convertChangesToXML),
/* harmony export */   "createPatch": () => (/* binding */ createPatch),
/* harmony export */   "createTwoFilesPatch": () => (/* binding */ createTwoFilesPatch),
/* harmony export */   "diffArrays": () => (/* binding */ diffArrays),
/* harmony export */   "diffChars": () => (/* binding */ diffChars),
/* harmony export */   "diffCss": () => (/* binding */ diffCss),
/* harmony export */   "diffJson": () => (/* binding */ diffJson),
/* harmony export */   "diffLines": () => (/* binding */ diffLines),
/* harmony export */   "diffSentences": () => (/* binding */ diffSentences),
/* harmony export */   "diffTrimmedLines": () => (/* binding */ diffTrimmedLines),
/* harmony export */   "diffWords": () => (/* binding */ diffWords),
/* harmony export */   "diffWordsWithSpace": () => (/* binding */ diffWordsWithSpace),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "parsePatch": () => (/* binding */ parsePatch),
/* harmony export */   "structuredPatch": () => (/* binding */ structuredPatch)
/* harmony export */ });
function Diff() {}
Diff.prototype = {
  diff: function diff(oldString, newString) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var callback = options.callback;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    this.options = options;
    var self = this;

    function done(value) {
      if (callback) {
        setTimeout(function () {
          callback(undefined, value);
        }, 0);
        return true;
      } else {
        return value;
      }
    } // Allow subclasses to massage the input prior to running


    oldString = this.castInput(oldString);
    newString = this.castInput(newString);
    oldString = this.removeEmpty(this.tokenize(oldString));
    newString = this.removeEmpty(this.tokenize(newString));
    var newLen = newString.length,
        oldLen = oldString.length;
    var editLength = 1;
    var maxEditLength = newLen + oldLen;

    if (options.maxEditLength) {
      maxEditLength = Math.min(maxEditLength, options.maxEditLength);
    }

    var bestPath = [{
      newPos: -1,
      components: []
    }]; // Seed editLength = 0, i.e. the content starts with the same values

    var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);

    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
      // Identity per the equality and tokenizer
      return done([{
        value: this.join(newString),
        count: newString.length
      }]);
    } // Main worker method. checks all permutations of a given edit length for acceptance.


    function execEditLength() {
      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
        var basePath = void 0;

        var addPath = bestPath[diagonalPath - 1],
            removePath = bestPath[diagonalPath + 1],
            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;

        if (addPath) {
          // No one else is going to attempt to use this value, clear it
          bestPath[diagonalPath - 1] = undefined;
        }

        var canAdd = addPath && addPath.newPos + 1 < newLen,
            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;

        if (!canAdd && !canRemove) {
          // If this path is a terminal then prune
          bestPath[diagonalPath] = undefined;
          continue;
        } // Select the diagonal that we want to branch from. We select the prior
        // path whose position in the new string is the farthest from the origin
        // and does not pass the bounds of the diff graph


        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
          basePath = clonePath(removePath);
          self.pushComponent(basePath.components, undefined, true);
        } else {
          basePath = addPath; // No need to clone, we've pulled it from the list

          basePath.newPos++;
          self.pushComponent(basePath.components, true, undefined);
        }

        _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath); // If we have hit the end of both strings, then we are done

        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
          return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
        } else {
          // Otherwise track this path as a potential candidate and continue.
          bestPath[diagonalPath] = basePath;
        }
      }

      editLength++;
    } // Performs the length of edit iteration. Is a bit fugly as this has to support the
    // sync and async mode which is never fun. Loops over execEditLength until a value
    // is produced, or until the edit length exceeds options.maxEditLength (if given),
    // in which case it will return undefined.


    if (callback) {
      (function exec() {
        setTimeout(function () {
          if (editLength > maxEditLength) {
            return callback();
          }

          if (!execEditLength()) {
            exec();
          }
        }, 0);
      })();
    } else {
      while (editLength <= maxEditLength) {
        var ret = execEditLength();

        if (ret) {
          return ret;
        }
      }
    }
  },
  pushComponent: function pushComponent(components, added, removed) {
    var last = components[components.length - 1];

    if (last && last.added === added && last.removed === removed) {
      // We need to clone here as the component clone operation is just
      // as shallow array clone
      components[components.length - 1] = {
        count: last.count + 1,
        added: added,
        removed: removed
      };
    } else {
      components.push({
        count: 1,
        added: added,
        removed: removed
      });
    }
  },
  extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
    var newLen = newString.length,
        oldLen = oldString.length,
        newPos = basePath.newPos,
        oldPos = newPos - diagonalPath,
        commonCount = 0;

    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
      newPos++;
      oldPos++;
      commonCount++;
    }

    if (commonCount) {
      basePath.components.push({
        count: commonCount
      });
    }

    basePath.newPos = newPos;
    return oldPos;
  },
  equals: function equals(left, right) {
    if (this.options.comparator) {
      return this.options.comparator(left, right);
    } else {
      return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
    }
  },
  removeEmpty: function removeEmpty(array) {
    var ret = [];

    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        ret.push(array[i]);
      }
    }

    return ret;
  },
  castInput: function castInput(value) {
    return value;
  },
  tokenize: function tokenize(value) {
    return value.split('');
  },
  join: function join(chars) {
    return chars.join('');
  }
};

function buildValues(diff, components, newString, oldString, useLongestToken) {
  var componentPos = 0,
      componentLen = components.length,
      newPos = 0,
      oldPos = 0;

  for (; componentPos < componentLen; componentPos++) {
    var component = components[componentPos];

    if (!component.removed) {
      if (!component.added && useLongestToken) {
        var value = newString.slice(newPos, newPos + component.count);
        value = value.map(function (value, i) {
          var oldValue = oldString[oldPos + i];
          return oldValue.length > value.length ? oldValue : value;
        });
        component.value = diff.join(value);
      } else {
        component.value = diff.join(newString.slice(newPos, newPos + component.count));
      }

      newPos += component.count; // Common case

      if (!component.added) {
        oldPos += component.count;
      }
    } else {
      component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
      oldPos += component.count; // Reverse add and remove so removes are output first to match common convention
      // The diffing algorithm is tied to add then remove output and this is the simplest
      // route to get the desired output with minimal overhead.

      if (componentPos && components[componentPos - 1].added) {
        var tmp = components[componentPos - 1];
        components[componentPos - 1] = components[componentPos];
        components[componentPos] = tmp;
      }
    }
  } // Special case handle for when one terminal is ignored (i.e. whitespace).
  // For this case we merge the terminal into the prior string and drop the change.
  // This is only available for string mode.


  var lastComponent = components[componentLen - 1];

  if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
    components[componentLen - 2].value += lastComponent.value;
    components.pop();
  }

  return components;
}

function clonePath(path) {
  return {
    newPos: path.newPos,
    components: path.components.slice(0)
  };
}

var characterDiff = new Diff();
function diffChars(oldStr, newStr, options) {
  return characterDiff.diff(oldStr, newStr, options);
}

function generateOptions(options, defaults) {
  if (typeof options === 'function') {
    defaults.callback = options;
  } else if (options) {
    for (var name in options) {
      /* istanbul ignore else */
      if (options.hasOwnProperty(name)) {
        defaults[name] = options[name];
      }
    }
  }

  return defaults;
}

//
// Ranges and exceptions:
// Latin-1 Supplement, 0080–00FF
//  - U+00D7  × Multiplication sign
//  - U+00F7  ÷ Division sign
// Latin Extended-A, 0100–017F
// Latin Extended-B, 0180–024F
// IPA Extensions, 0250–02AF
// Spacing Modifier Letters, 02B0–02FF
//  - U+02C7  ˇ &#711;  Caron
//  - U+02D8  ˘ &#728;  Breve
//  - U+02D9  ˙ &#729;  Dot Above
//  - U+02DA  ˚ &#730;  Ring Above
//  - U+02DB  ˛ &#731;  Ogonek
//  - U+02DC  ˜ &#732;  Small Tilde
//  - U+02DD  ˝ &#733;  Double Acute Accent
// Latin Extended Additional, 1E00–1EFF

var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
var reWhitespace = /\S/;
var wordDiff = new Diff();

wordDiff.equals = function (left, right) {
  if (this.options.ignoreCase) {
    left = left.toLowerCase();
    right = right.toLowerCase();
  }

  return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
};

wordDiff.tokenize = function (value) {
  // All whitespace symbols except newline group into one token, each newline - in separate token
  var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/); // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.

  for (var i = 0; i < tokens.length - 1; i++) {
    // If we have an empty string in the next field and we have only word chars before and after, merge
    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
      tokens[i] += tokens[i + 2];
      tokens.splice(i + 1, 2);
      i--;
    }
  }

  return tokens;
};

function diffWords(oldStr, newStr, options) {
  options = generateOptions(options, {
    ignoreWhitespace: true
  });
  return wordDiff.diff(oldStr, newStr, options);
}
function diffWordsWithSpace(oldStr, newStr, options) {
  return wordDiff.diff(oldStr, newStr, options);
}

var lineDiff = new Diff();

lineDiff.tokenize = function (value) {
  var retLines = [],
      linesAndNewlines = value.split(/(\n|\r\n)/); // Ignore the final empty token that occurs if the string ends with a new line

  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  } // Merge the content and line separators into single tokens


  for (var i = 0; i < linesAndNewlines.length; i++) {
    var line = linesAndNewlines[i];

    if (i % 2 && !this.options.newlineIsToken) {
      retLines[retLines.length - 1] += line;
    } else {
      if (this.options.ignoreWhitespace) {
        line = line.trim();
      }

      retLines.push(line);
    }
  }

  return retLines;
};

function diffLines(oldStr, newStr, callback) {
  return lineDiff.diff(oldStr, newStr, callback);
}
function diffTrimmedLines(oldStr, newStr, callback) {
  var options = generateOptions(callback, {
    ignoreWhitespace: true
  });
  return lineDiff.diff(oldStr, newStr, options);
}

var sentenceDiff = new Diff();

sentenceDiff.tokenize = function (value) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};

function diffSentences(oldStr, newStr, callback) {
  return sentenceDiff.diff(oldStr, newStr, callback);
}

var cssDiff = new Diff();

cssDiff.tokenize = function (value) {
  return value.split(/([{}:;,]|\s+)/);
};

function diffCss(oldStr, newStr, callback) {
  return cssDiff.diff(oldStr, newStr, callback);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var objectPrototypeToString = Object.prototype.toString;
var jsonDiff = new Diff(); // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
// dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:

jsonDiff.useLongestToken = true;
jsonDiff.tokenize = lineDiff.tokenize;

jsonDiff.castInput = function (value) {
  var _this$options = this.options,
      undefinedReplacement = _this$options.undefinedReplacement,
      _this$options$stringi = _this$options.stringifyReplacer,
      stringifyReplacer = _this$options$stringi === void 0 ? function (k, v) {
    return typeof v === 'undefined' ? undefinedReplacement : v;
  } : _this$options$stringi;
  return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
};

jsonDiff.equals = function (left, right) {
  return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
};

function diffJson(oldObj, newObj, options) {
  return jsonDiff.diff(oldObj, newObj, options);
} // This function handles the presence of circular references by bailing out when encountering an
// object that is already on the "stack" of items being processed. Accepts an optional replacer

function canonicalize(obj, stack, replacementStack, replacer, key) {
  stack = stack || [];
  replacementStack = replacementStack || [];

  if (replacer) {
    obj = replacer(key, obj);
  }

  var i;

  for (i = 0; i < stack.length; i += 1) {
    if (stack[i] === obj) {
      return replacementStack[i];
    }
  }

  var canonicalizedObj;

  if ('[object Array]' === objectPrototypeToString.call(obj)) {
    stack.push(obj);
    canonicalizedObj = new Array(obj.length);
    replacementStack.push(canonicalizedObj);

    for (i = 0; i < obj.length; i += 1) {
      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
    }

    stack.pop();
    replacementStack.pop();
    return canonicalizedObj;
  }

  if (obj && obj.toJSON) {
    obj = obj.toJSON();
  }

  if (_typeof(obj) === 'object' && obj !== null) {
    stack.push(obj);
    canonicalizedObj = {};
    replacementStack.push(canonicalizedObj);

    var sortedKeys = [],
        _key;

    for (_key in obj) {
      /* istanbul ignore else */
      if (obj.hasOwnProperty(_key)) {
        sortedKeys.push(_key);
      }
    }

    sortedKeys.sort();

    for (i = 0; i < sortedKeys.length; i += 1) {
      _key = sortedKeys[i];
      canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
    }

    stack.pop();
    replacementStack.pop();
  } else {
    canonicalizedObj = obj;
  }

  return canonicalizedObj;
}

var arrayDiff = new Diff();

arrayDiff.tokenize = function (value) {
  return value.slice();
};

arrayDiff.join = arrayDiff.removeEmpty = function (value) {
  return value;
};

function diffArrays(oldArr, newArr, callback) {
  return arrayDiff.diff(oldArr, newArr, callback);
}

function parsePatch(uniDiff) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
      delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      list = [],
      i = 0;

  function parseIndex() {
    var index = {};
    list.push(index); // Parse diff metadata

    while (i < diffstr.length) {
      var line = diffstr[i]; // File header found, end parsing diff metadata

      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
        break;
      } // Diff index


      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);

      if (header) {
        index.index = header[1];
      }

      i++;
    } // Parse file headers if they are defined. Unified diff requires them, but
    // there's no technical issues to have an isolated hunk without file header


    parseFileHeader(index);
    parseFileHeader(index); // Parse hunks

    index.hunks = [];

    while (i < diffstr.length) {
      var _line = diffstr[i];

      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
        break;
      } else if (/^@@/.test(_line)) {
        index.hunks.push(parseHunk());
      } else if (_line && options.strict) {
        // Ignore unexpected content unless in strict mode
        throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
      } else {
        i++;
      }
    }
  } // Parses the --- and +++ headers, if none are found, no lines
  // are consumed.


  function parseFileHeader(index) {
    var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);

    if (fileHeader) {
      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
      var data = fileHeader[2].split('\t', 2);
      var fileName = data[0].replace(/\\\\/g, '\\');

      if (/^".*"$/.test(fileName)) {
        fileName = fileName.substr(1, fileName.length - 2);
      }

      index[keyPrefix + 'FileName'] = fileName;
      index[keyPrefix + 'Header'] = (data[1] || '').trim();
      i++;
    }
  } // Parses a hunk
  // This assumes that we are at the start of a hunk.


  function parseHunk() {
    var chunkHeaderIndex = i,
        chunkHeaderLine = diffstr[i++],
        chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
    var hunk = {
      oldStart: +chunkHeader[1],
      oldLines: typeof chunkHeader[2] === 'undefined' ? 1 : +chunkHeader[2],
      newStart: +chunkHeader[3],
      newLines: typeof chunkHeader[4] === 'undefined' ? 1 : +chunkHeader[4],
      lines: [],
      linedelimiters: []
    }; // Unified Diff Format quirk: If the chunk size is 0,
    // the first number is one lower than one would expect.
    // https://www.artima.com/weblogs/viewpost.jsp?thread=164293

    if (hunk.oldLines === 0) {
      hunk.oldStart += 1;
    }

    if (hunk.newLines === 0) {
      hunk.newStart += 1;
    }

    var addCount = 0,
        removeCount = 0;

    for (; i < diffstr.length; i++) {
      // Lines starting with '---' could be mistaken for the "remove line" operation
      // But they could be the header for the next file. Therefore prune such cases out.
      if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
        break;
      }

      var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];

      if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
        hunk.lines.push(diffstr[i]);
        hunk.linedelimiters.push(delimiters[i] || '\n');

        if (operation === '+') {
          addCount++;
        } else if (operation === '-') {
          removeCount++;
        } else if (operation === ' ') {
          addCount++;
          removeCount++;
        }
      } else {
        break;
      }
    } // Handle the empty block count case


    if (!addCount && hunk.newLines === 1) {
      hunk.newLines = 0;
    }

    if (!removeCount && hunk.oldLines === 1) {
      hunk.oldLines = 0;
    } // Perform optional sanity checking


    if (options.strict) {
      if (addCount !== hunk.newLines) {
        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
      }

      if (removeCount !== hunk.oldLines) {
        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
      }
    }

    return hunk;
  }

  while (i < diffstr.length) {
    parseIndex();
  }

  return list;
}

// Iterator that traverses in the range of [min, max], stepping
// by distance from a given start position. I.e. for [0, 4], with
// start of 2, this will iterate 2, 3, 1, 4, 0.
function distanceIterator (start, minLine, maxLine) {
  var wantForward = true,
      backwardExhausted = false,
      forwardExhausted = false,
      localOffset = 1;
  return function iterator() {
    if (wantForward && !forwardExhausted) {
      if (backwardExhausted) {
        localOffset++;
      } else {
        wantForward = false;
      } // Check if trying to fit beyond text length, and if not, check it fits
      // after offset location (or desired location on first iteration)


      if (start + localOffset <= maxLine) {
        return localOffset;
      }

      forwardExhausted = true;
    }

    if (!backwardExhausted) {
      if (!forwardExhausted) {
        wantForward = true;
      } // Check if trying to fit before text beginning, and if not, check it fits
      // before offset location


      if (minLine <= start - localOffset) {
        return -localOffset++;
      }

      backwardExhausted = true;
      return iterator();
    } // We tried to fit hunk before text beginning and beyond text length, then
    // hunk can't fit on the text. Return undefined

  };
}

function applyPatch(source, uniDiff) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (typeof uniDiff === 'string') {
    uniDiff = parsePatch(uniDiff);
  }

  if (Array.isArray(uniDiff)) {
    if (uniDiff.length > 1) {
      throw new Error('applyPatch only works with a single input.');
    }

    uniDiff = uniDiff[0];
  } // Apply the diff to the input


  var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
      delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      hunks = uniDiff.hunks,
      compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) {
    return line === patchContent;
  },
      errorCount = 0,
      fuzzFactor = options.fuzzFactor || 0,
      minLine = 0,
      offset = 0,
      removeEOFNL,
      addEOFNL;
  /**
   * Checks if the hunk exactly fits on the provided location
   */


  function hunkFits(hunk, toPos) {
    for (var j = 0; j < hunk.lines.length; j++) {
      var line = hunk.lines[j],
          operation = line.length > 0 ? line[0] : ' ',
          content = line.length > 0 ? line.substr(1) : line;

      if (operation === ' ' || operation === '-') {
        // Context sanity check
        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
          errorCount++;

          if (errorCount > fuzzFactor) {
            return false;
          }
        }

        toPos++;
      }
    }

    return true;
  } // Search best fit offsets for each hunk based on the previous ones


  for (var i = 0; i < hunks.length; i++) {
    var hunk = hunks[i],
        maxLine = lines.length - hunk.oldLines,
        localOffset = 0,
        toPos = offset + hunk.oldStart - 1;
    var iterator = distanceIterator(toPos, minLine, maxLine);

    for (; localOffset !== undefined; localOffset = iterator()) {
      if (hunkFits(hunk, toPos + localOffset)) {
        hunk.offset = offset += localOffset;
        break;
      }
    }

    if (localOffset === undefined) {
      return false;
    } // Set lower text limit to end of the current hunk, so next ones don't try
    // to fit over already patched text


    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
  } // Apply patch hunks


  var diffOffset = 0;

  for (var _i = 0; _i < hunks.length; _i++) {
    var _hunk = hunks[_i],
        _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;

    diffOffset += _hunk.newLines - _hunk.oldLines;

    for (var j = 0; j < _hunk.lines.length; j++) {
      var line = _hunk.lines[j],
          operation = line.length > 0 ? line[0] : ' ',
          content = line.length > 0 ? line.substr(1) : line,
          delimiter = _hunk.linedelimiters[j];

      if (operation === ' ') {
        _toPos++;
      } else if (operation === '-') {
        lines.splice(_toPos, 1);
        delimiters.splice(_toPos, 1);
        /* istanbul ignore else */
      } else if (operation === '+') {
        lines.splice(_toPos, 0, content);
        delimiters.splice(_toPos, 0, delimiter);
        _toPos++;
      } else if (operation === '\\') {
        var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;

        if (previousOperation === '+') {
          removeEOFNL = true;
        } else if (previousOperation === '-') {
          addEOFNL = true;
        }
      }
    }
  } // Handle EOFNL insertion/removal


  if (removeEOFNL) {
    while (!lines[lines.length - 1]) {
      lines.pop();
      delimiters.pop();
    }
  } else if (addEOFNL) {
    lines.push('');
    delimiters.push('\n');
  }

  for (var _k = 0; _k < lines.length - 1; _k++) {
    lines[_k] = lines[_k] + delimiters[_k];
  }

  return lines.join('');
} // Wrapper that supports multiple file patches via callbacks.

function applyPatches(uniDiff, options) {
  if (typeof uniDiff === 'string') {
    uniDiff = parsePatch(uniDiff);
  }

  var currentIndex = 0;

  function processIndex() {
    var index = uniDiff[currentIndex++];

    if (!index) {
      return options.complete();
    }

    options.loadFile(index, function (err, data) {
      if (err) {
        return options.complete(err);
      }

      var updatedContent = applyPatch(data, index, options);
      options.patched(index, updatedContent, function (err) {
        if (err) {
          return options.complete(err);
        }

        processIndex();
      });
    });
  }

  processIndex();
}

function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  if (!options) {
    options = {};
  }

  if (typeof options.context === 'undefined') {
    options.context = 4;
  }

  var diff = diffLines(oldStr, newStr, options);

  if (!diff) {
    return;
  }

  diff.push({
    value: '',
    lines: []
  }); // Append an empty value to make cleanup easier

  function contextLines(lines) {
    return lines.map(function (entry) {
      return ' ' + entry;
    });
  }

  var hunks = [];
  var oldRangeStart = 0,
      newRangeStart = 0,
      curRange = [],
      oldLine = 1,
      newLine = 1;

  var _loop = function _loop(i) {
    var current = diff[i],
        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
    current.lines = lines;

    if (current.added || current.removed) {
      var _curRange;

      // If we have previous context, start with that
      if (!oldRangeStart) {
        var prev = diff[i - 1];
        oldRangeStart = oldLine;
        newRangeStart = newLine;

        if (prev) {
          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
          oldRangeStart -= curRange.length;
          newRangeStart -= curRange.length;
        }
      } // Output our changes


      (_curRange = curRange).push.apply(_curRange, _toConsumableArray(lines.map(function (entry) {
        return (current.added ? '+' : '-') + entry;
      }))); // Track the updated file position


      if (current.added) {
        newLine += lines.length;
      } else {
        oldLine += lines.length;
      }
    } else {
      // Identical context lines. Track line changes
      if (oldRangeStart) {
        // Close out any changes that have been output (or join overlapping)
        if (lines.length <= options.context * 2 && i < diff.length - 2) {
          var _curRange2;

          // Overlapping
          (_curRange2 = curRange).push.apply(_curRange2, _toConsumableArray(contextLines(lines)));
        } else {
          var _curRange3;

          // end the range and output
          var contextSize = Math.min(lines.length, options.context);

          (_curRange3 = curRange).push.apply(_curRange3, _toConsumableArray(contextLines(lines.slice(0, contextSize))));

          var hunk = {
            oldStart: oldRangeStart,
            oldLines: oldLine - oldRangeStart + contextSize,
            newStart: newRangeStart,
            newLines: newLine - newRangeStart + contextSize,
            lines: curRange
          };

          if (i >= diff.length - 2 && lines.length <= options.context) {
            // EOF is inside this hunk
            var oldEOFNewline = /\n$/.test(oldStr);
            var newEOFNewline = /\n$/.test(newStr);
            var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;

            if (!oldEOFNewline && noNlBeforeAdds && oldStr.length > 0) {
              // special case: old has no eol and no trailing context; no-nl can end up before adds
              // however, if the old file is empty, do not output the no-nl line
              curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
            }

            if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
              curRange.push('\\ No newline at end of file');
            }
          }

          hunks.push(hunk);
          oldRangeStart = 0;
          newRangeStart = 0;
          curRange = [];
        }
      }

      oldLine += lines.length;
      newLine += lines.length;
    }
  };

  for (var i = 0; i < diff.length; i++) {
    _loop(i);
  }

  return {
    oldFileName: oldFileName,
    newFileName: newFileName,
    oldHeader: oldHeader,
    newHeader: newHeader,
    hunks: hunks
  };
}
function formatPatch(diff) {
  var ret = [];

  if (diff.oldFileName == diff.newFileName) {
    ret.push('Index: ' + diff.oldFileName);
  }

  ret.push('===================================================================');
  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

  for (var i = 0; i < diff.hunks.length; i++) {
    var hunk = diff.hunks[i]; // Unified Diff Format quirk: If the chunk size is 0,
    // the first number is one lower than one would expect.
    // https://www.artima.com/weblogs/viewpost.jsp?thread=164293

    if (hunk.oldLines === 0) {
      hunk.oldStart -= 1;
    }

    if (hunk.newLines === 0) {
      hunk.newStart -= 1;
    }

    ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
    ret.push.apply(ret, hunk.lines);
  }

  return ret.join('\n') + '\n';
}
function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  return formatPatch(structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options));
}
function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
}

function arrayEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  return arrayStartsWith(a, b);
}
function arrayStartsWith(array, start) {
  if (start.length > array.length) {
    return false;
  }

  for (var i = 0; i < start.length; i++) {
    if (start[i] !== array[i]) {
      return false;
    }
  }

  return true;
}

function calcLineCount(hunk) {
  var _calcOldNewLineCount = calcOldNewLineCount(hunk.lines),
      oldLines = _calcOldNewLineCount.oldLines,
      newLines = _calcOldNewLineCount.newLines;

  if (oldLines !== undefined) {
    hunk.oldLines = oldLines;
  } else {
    delete hunk.oldLines;
  }

  if (newLines !== undefined) {
    hunk.newLines = newLines;
  } else {
    delete hunk.newLines;
  }
}
function merge(mine, theirs, base) {
  mine = loadPatch(mine, base);
  theirs = loadPatch(theirs, base);
  var ret = {}; // For index we just let it pass through as it doesn't have any necessary meaning.
  // Leaving sanity checks on this to the API consumer that may know more about the
  // meaning in their own context.

  if (mine.index || theirs.index) {
    ret.index = mine.index || theirs.index;
  }

  if (mine.newFileName || theirs.newFileName) {
    if (!fileNameChanged(mine)) {
      // No header or no change in ours, use theirs (and ours if theirs does not exist)
      ret.oldFileName = theirs.oldFileName || mine.oldFileName;
      ret.newFileName = theirs.newFileName || mine.newFileName;
      ret.oldHeader = theirs.oldHeader || mine.oldHeader;
      ret.newHeader = theirs.newHeader || mine.newHeader;
    } else if (!fileNameChanged(theirs)) {
      // No header or no change in theirs, use ours
      ret.oldFileName = mine.oldFileName;
      ret.newFileName = mine.newFileName;
      ret.oldHeader = mine.oldHeader;
      ret.newHeader = mine.newHeader;
    } else {
      // Both changed... figure it out
      ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
      ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
      ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
      ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
    }
  }

  ret.hunks = [];
  var mineIndex = 0,
      theirsIndex = 0,
      mineOffset = 0,
      theirsOffset = 0;

  while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
    var mineCurrent = mine.hunks[mineIndex] || {
      oldStart: Infinity
    },
        theirsCurrent = theirs.hunks[theirsIndex] || {
      oldStart: Infinity
    };

    if (hunkBefore(mineCurrent, theirsCurrent)) {
      // This patch does not overlap with any of the others, yay.
      ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
      mineIndex++;
      theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
    } else if (hunkBefore(theirsCurrent, mineCurrent)) {
      // This patch does not overlap with any of the others, yay.
      ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
      theirsIndex++;
      mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
    } else {
      // Overlap, merge as best we can
      var mergedHunk = {
        oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
        oldLines: 0,
        newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
        newLines: 0,
        lines: []
      };
      mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
      theirsIndex++;
      mineIndex++;
      ret.hunks.push(mergedHunk);
    }
  }

  return ret;
}

function loadPatch(param, base) {
  if (typeof param === 'string') {
    if (/^@@/m.test(param) || /^Index:/m.test(param)) {
      return parsePatch(param)[0];
    }

    if (!base) {
      throw new Error('Must provide a base reference or pass in a patch');
    }

    return structuredPatch(undefined, undefined, base, param);
  }

  return param;
}

function fileNameChanged(patch) {
  return patch.newFileName && patch.newFileName !== patch.oldFileName;
}

function selectField(index, mine, theirs) {
  if (mine === theirs) {
    return mine;
  } else {
    index.conflict = true;
    return {
      mine: mine,
      theirs: theirs
    };
  }
}

function hunkBefore(test, check) {
  return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
}

function cloneHunk(hunk, offset) {
  return {
    oldStart: hunk.oldStart,
    oldLines: hunk.oldLines,
    newStart: hunk.newStart + offset,
    newLines: hunk.newLines,
    lines: hunk.lines
  };
}

function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
  // This will generally result in a conflicted hunk, but there are cases where the context
  // is the only overlap where we can successfully merge the content here.
  var mine = {
    offset: mineOffset,
    lines: mineLines,
    index: 0
  },
      their = {
    offset: theirOffset,
    lines: theirLines,
    index: 0
  }; // Handle any leading content

  insertLeading(hunk, mine, their);
  insertLeading(hunk, their, mine); // Now in the overlap content. Scan through and select the best changes from each.

  while (mine.index < mine.lines.length && their.index < their.lines.length) {
    var mineCurrent = mine.lines[mine.index],
        theirCurrent = their.lines[their.index];

    if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
      // Both modified ...
      mutualChange(hunk, mine, their);
    } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
      var _hunk$lines;

      // Mine inserted
      (_hunk$lines = hunk.lines).push.apply(_hunk$lines, _toConsumableArray(collectChange(mine)));
    } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
      var _hunk$lines2;

      // Theirs inserted
      (_hunk$lines2 = hunk.lines).push.apply(_hunk$lines2, _toConsumableArray(collectChange(their)));
    } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
      // Mine removed or edited
      removal(hunk, mine, their);
    } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
      // Their removed or edited
      removal(hunk, their, mine, true);
    } else if (mineCurrent === theirCurrent) {
      // Context identity
      hunk.lines.push(mineCurrent);
      mine.index++;
      their.index++;
    } else {
      // Context mismatch
      conflict(hunk, collectChange(mine), collectChange(their));
    }
  } // Now push anything that may be remaining


  insertTrailing(hunk, mine);
  insertTrailing(hunk, their);
  calcLineCount(hunk);
}

function mutualChange(hunk, mine, their) {
  var myChanges = collectChange(mine),
      theirChanges = collectChange(their);

  if (allRemoves(myChanges) && allRemoves(theirChanges)) {
    // Special case for remove changes that are supersets of one another
    if (arrayStartsWith(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
      var _hunk$lines3;

      (_hunk$lines3 = hunk.lines).push.apply(_hunk$lines3, _toConsumableArray(myChanges));

      return;
    } else if (arrayStartsWith(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
      var _hunk$lines4;

      (_hunk$lines4 = hunk.lines).push.apply(_hunk$lines4, _toConsumableArray(theirChanges));

      return;
    }
  } else if (arrayEqual(myChanges, theirChanges)) {
    var _hunk$lines5;

    (_hunk$lines5 = hunk.lines).push.apply(_hunk$lines5, _toConsumableArray(myChanges));

    return;
  }

  conflict(hunk, myChanges, theirChanges);
}

function removal(hunk, mine, their, swap) {
  var myChanges = collectChange(mine),
      theirChanges = collectContext(their, myChanges);

  if (theirChanges.merged) {
    var _hunk$lines6;

    (_hunk$lines6 = hunk.lines).push.apply(_hunk$lines6, _toConsumableArray(theirChanges.merged));
  } else {
    conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
  }
}

function conflict(hunk, mine, their) {
  hunk.conflict = true;
  hunk.lines.push({
    conflict: true,
    mine: mine,
    theirs: their
  });
}

function insertLeading(hunk, insert, their) {
  while (insert.offset < their.offset && insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
    insert.offset++;
  }
}

function insertTrailing(hunk, insert) {
  while (insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
  }
}

function collectChange(state) {
  var ret = [],
      operation = state.lines[state.index][0];

  while (state.index < state.lines.length) {
    var line = state.lines[state.index]; // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.

    if (operation === '-' && line[0] === '+') {
      operation = '+';
    }

    if (operation === line[0]) {
      ret.push(line);
      state.index++;
    } else {
      break;
    }
  }

  return ret;
}

function collectContext(state, matchChanges) {
  var changes = [],
      merged = [],
      matchIndex = 0,
      contextChanges = false,
      conflicted = false;

  while (matchIndex < matchChanges.length && state.index < state.lines.length) {
    var change = state.lines[state.index],
        match = matchChanges[matchIndex]; // Once we've hit our add, then we are done

    if (match[0] === '+') {
      break;
    }

    contextChanges = contextChanges || change[0] !== ' ';
    merged.push(match);
    matchIndex++; // Consume any additions in the other block as a conflict to attempt
    // to pull in the remaining context after this

    if (change[0] === '+') {
      conflicted = true;

      while (change[0] === '+') {
        changes.push(change);
        change = state.lines[++state.index];
      }
    }

    if (match.substr(1) === change.substr(1)) {
      changes.push(change);
      state.index++;
    } else {
      conflicted = true;
    }
  }

  if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
    conflicted = true;
  }

  if (conflicted) {
    return changes;
  }

  while (matchIndex < matchChanges.length) {
    merged.push(matchChanges[matchIndex++]);
  }

  return {
    merged: merged,
    changes: changes
  };
}

function allRemoves(changes) {
  return changes.reduce(function (prev, change) {
    return prev && change[0] === '-';
  }, true);
}

function skipRemoveSuperset(state, removeChanges, delta) {
  for (var i = 0; i < delta; i++) {
    var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);

    if (state.lines[state.index + i] !== ' ' + changeContent) {
      return false;
    }
  }

  state.index += delta;
  return true;
}

function calcOldNewLineCount(lines) {
  var oldLines = 0;
  var newLines = 0;
  lines.forEach(function (line) {
    if (typeof line !== 'string') {
      var myCount = calcOldNewLineCount(line.mine);
      var theirCount = calcOldNewLineCount(line.theirs);

      if (oldLines !== undefined) {
        if (myCount.oldLines === theirCount.oldLines) {
          oldLines += myCount.oldLines;
        } else {
          oldLines = undefined;
        }
      }

      if (newLines !== undefined) {
        if (myCount.newLines === theirCount.newLines) {
          newLines += myCount.newLines;
        } else {
          newLines = undefined;
        }
      }
    } else {
      if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {
        newLines++;
      }

      if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {
        oldLines++;
      }
    }
  });
  return {
    oldLines: oldLines,
    newLines: newLines
  };
}

// See: http://code.google.com/p/google-diff-match-patch/wiki/API
function convertChangesToDMP(changes) {
  var ret = [],
      change,
      operation;

  for (var i = 0; i < changes.length; i++) {
    change = changes[i];

    if (change.added) {
      operation = 1;
    } else if (change.removed) {
      operation = -1;
    } else {
      operation = 0;
    }

    ret.push([operation, change.value]);
  }

  return ret;
}

function convertChangesToXML(changes) {
  var ret = [];

  for (var i = 0; i < changes.length; i++) {
    var change = changes[i];

    if (change.added) {
      ret.push('<ins>');
    } else if (change.removed) {
      ret.push('<del>');
    }

    ret.push(escapeHTML(change.value));

    if (change.added) {
      ret.push('</ins>');
    } else if (change.removed) {
      ret.push('</del>');
    }
  }

  return ret.join('');
}

function escapeHTML(s) {
  var n = s;
  n = n.replace(/&/g, '&amp;');
  n = n.replace(/</g, '&lt;');
  n = n.replace(/>/g, '&gt;');
  n = n.replace(/"/g, '&quot;');
  return n;
}




/***/ }),

/***/ "./node_modules/uvu/node_modules/kleur/index.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/uvu/node_modules/kleur/index.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


let FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY=true;
if (typeof process !== 'undefined') {
	({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = ({}) || {});
	isTTY = process.stdout && process.stdout.isTTY;
}

const $ = {
	enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (
		FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY
	),

	// modifiers
	reset: init(0, 0),
	bold: init(1, 22),
	dim: init(2, 22),
	italic: init(3, 23),
	underline: init(4, 24),
	inverse: init(7, 27),
	hidden: init(8, 28),
	strikethrough: init(9, 29),

	// colors
	black: init(30, 39),
	red: init(31, 39),
	green: init(32, 39),
	yellow: init(33, 39),
	blue: init(34, 39),
	magenta: init(35, 39),
	cyan: init(36, 39),
	white: init(37, 39),
	gray: init(90, 39),
	grey: init(90, 39),

	// background colors
	bgBlack: init(40, 49),
	bgRed: init(41, 49),
	bgGreen: init(42, 49),
	bgYellow: init(43, 49),
	bgBlue: init(44, 49),
	bgMagenta: init(45, 49),
	bgCyan: init(46, 49),
	bgWhite: init(47, 49)
};

function run(arr, str) {
	let i=0, tmp, beg='', end='';
	for (; i < arr.length; i++) {
		tmp = arr[i];
		beg += tmp.open;
		end += tmp.close;
		if (!!~str.indexOf(tmp.close)) {
			str = str.replace(tmp.rgx, tmp.close + tmp.open);
		}
	}
	return beg + str + end;
}

function chain(has, keys) {
	let ctx = { has, keys };

	ctx.reset = $.reset.bind(ctx);
	ctx.bold = $.bold.bind(ctx);
	ctx.dim = $.dim.bind(ctx);
	ctx.italic = $.italic.bind(ctx);
	ctx.underline = $.underline.bind(ctx);
	ctx.inverse = $.inverse.bind(ctx);
	ctx.hidden = $.hidden.bind(ctx);
	ctx.strikethrough = $.strikethrough.bind(ctx);

	ctx.black = $.black.bind(ctx);
	ctx.red = $.red.bind(ctx);
	ctx.green = $.green.bind(ctx);
	ctx.yellow = $.yellow.bind(ctx);
	ctx.blue = $.blue.bind(ctx);
	ctx.magenta = $.magenta.bind(ctx);
	ctx.cyan = $.cyan.bind(ctx);
	ctx.white = $.white.bind(ctx);
	ctx.gray = $.gray.bind(ctx);
	ctx.grey = $.grey.bind(ctx);

	ctx.bgBlack = $.bgBlack.bind(ctx);
	ctx.bgRed = $.bgRed.bind(ctx);
	ctx.bgGreen = $.bgGreen.bind(ctx);
	ctx.bgYellow = $.bgYellow.bind(ctx);
	ctx.bgBlue = $.bgBlue.bind(ctx);
	ctx.bgMagenta = $.bgMagenta.bind(ctx);
	ctx.bgCyan = $.bgCyan.bind(ctx);
	ctx.bgWhite = $.bgWhite.bind(ctx);

	return ctx;
}

function init(open, close) {
	let blk = {
		open: `\x1b[${open}m`,
		close: `\x1b[${close}m`,
		rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
	};
	return function (txt) {
		if (this !== void 0 && this.has !== void 0) {
			!!~this.has.indexOf(open) || (this.has.push(open),this.keys.push(blk));
			return txt === void 0 ? this : $.enabled ? run(this.keys, txt+'') : txt+'';
		}
		return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt+'') : txt+'';
	};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($);


/***/ }),

/***/ "./node_modules/vfile-message/index.js":
/*!*********************************************!*\
  !*** ./node_modules/vfile-message/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VFileMessage": () => (/* binding */ VFileMessage)
/* harmony export */ });
/* harmony import */ var unist_util_stringify_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-stringify-position */ "./node_modules/unist-util-stringify-position/index.js");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Point} Point
 * @typedef {object & {type: string, position?: Position|undefined}} NodeLike
 */



class VFileMessage extends Error {
  /**
   * Constructor of a message for `reason` at `place` from `origin`.
   * When an error is passed in as `reason`, copies the `stack`.
   *
   * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
   * @param {string} [origin] Place in code the message originates from (`string`, optional).
   */
  constructor(reason, place, origin) {
    /** @type {[string|null, string|null]} */
    const parts = [null, null]
    /** @type {Position} */
    let position = {
      // @ts-expect-error: we always follows the structure of `position`.
      start: {line: null, column: null},
      // @ts-expect-error: "
      end: {line: null, column: null}
    }

    super()

    if (typeof place === 'string') {
      origin = place
      place = undefined
    }

    if (typeof origin === 'string') {
      const index = origin.indexOf(':')

      if (index === -1) {
        parts[1] = origin
      } else {
        parts[0] = origin.slice(0, index)
        parts[1] = origin.slice(index + 1)
      }
    }

    if (place) {
      // Node.
      if ('type' in place || 'position' in place) {
        if (place.position) {
          position = place.position
        }
      }
      // Position.
      else if ('start' in place || 'end' in place) {
        position = place
      }
      // Point.
      else if ('line' in place || 'column' in place) {
        position.start = place
      }
    }

    // Fields from `Error`
    this.name = (0,unist_util_stringify_position__WEBPACK_IMPORTED_MODULE_0__.stringifyPosition)(place) || '1:1'
    this.message = typeof reason === 'object' ? reason.message : reason
    this.stack = typeof reason === 'object' ? reason.stack : ''

    /**
     * Reason for message.
     * @type {string}
     */
    this.reason = this.message
    /**
     * If true, marks associated file as no longer processable.
     * @type {boolean?}
     */
    // eslint-disable-next-line no-unused-expressions
    this.fatal
    /**
     * Starting line of error.
     * @type {number?}
     */
    this.line = position.start.line
    /**
     * Starting column of error.
     * @type {number?}
     */
    this.column = position.start.column
    /**
     * Namespace of warning.
     * @type {string?}
     */
    this.source = parts[0]
    /**
     * Category of message.
     * @type {string?}
     */
    this.ruleId = parts[1]
    /**
     * Full range information, when available.
     * Has start and end properties, both set to an object with line and column, set to number?.
     * @type {Position?}
     */
    this.position = position

    // The following fields are “well known”.
    // Not standard.
    // Feel free to add other non-standard fields to your messages.

    /* eslint-disable no-unused-expressions */
    /**
     * You can use this to specify the source value that’s being reported, which
     * is deemed incorrect.
     * @type {string?}
     */
    this.actual
    /**
     * You can use this to suggest values that should be used instead of
     * `actual`, one or more values that are deemed as acceptable.
     * @type {Array<string>?}
     */
    this.expected
    /**
     * You may add a file property with a path of a file (used throughout the VFile ecosystem).
     * @type {string?}
     */
    this.file
    /**
     * You may add a url property with a link to documentation for the message.
     * @type {string?}
     */
    this.url
    /**
     * You may add a note property with a long form description of the message (supported by vfile-reporter).
     * @type {string?}
     */
    this.note
    /* eslint-enable no-unused-expressions */
  }
}

VFileMessage.prototype.file = ''
VFileMessage.prototype.name = ''
VFileMessage.prototype.reason = ''
VFileMessage.prototype.message = ''
VFileMessage.prototype.stack = ''
VFileMessage.prototype.fatal = null
VFileMessage.prototype.column = null
VFileMessage.prototype.line = null
VFileMessage.prototype.source = null
VFileMessage.prototype.ruleId = null
VFileMessage.prototype.position = null


/***/ }),

/***/ "./node_modules/vfile/lib/index.js":
/*!*****************************************!*\
  !*** ./node_modules/vfile/lib/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VFile": () => (/* binding */ VFile)
/* harmony export */ });
/* harmony import */ var is_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");
/* harmony import */ var vfile_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vfile-message */ "./node_modules/vfile-message/index.js");
/* harmony import */ var _minpath_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./minpath.js */ "path");
/* harmony import */ var _minproc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minproc.js */ "process");
/* harmony import */ var _minurl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minurl.js */ "./node_modules/vfile/lib/minurl.shared.js");
/* harmony import */ var _minurl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./minurl.js */ "url");
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Point} Point
 * @typedef {Record<string, unknown> & {type: string, position?: Position|undefined}} NodeLike
 * @typedef {import('./minurl.shared.js').URL} URL
 * @typedef {import('../index.js').Data} Data
 * @typedef {import('../index.js').Value} Value
 *
 * @typedef {'ascii'|'utf8'|'utf-8'|'utf16le'|'ucs2'|'ucs-2'|'base64'|'base64url'|'latin1'|'binary'|'hex'} BufferEncoding
 *   Encodings supported by the buffer class.
 *   This is a copy of the typing from Node, copied to prevent Node globals from
 *   being needed.
 *   Copied from: <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/90a4ec8/types/node/buffer.d.ts#L170>
 *
 * @typedef {Value|Options|VFile|URL} Compatible
 *   Things that can be passed to the constructor.
 *
 * @typedef VFileCoreOptions
 * @property {Value} [value]
 * @property {string} [cwd]
 * @property {Array<string>} [history]
 * @property {string|URL} [path]
 * @property {string} [basename]
 * @property {string} [stem]
 * @property {string} [extname]
 * @property {string} [dirname]
 * @property {Data} [data]
 *
 * @typedef Map
 *   Raw source map, see:
 *   <https://github.com/mozilla/source-map/blob/58819f0/source-map.d.ts#L15-L23>.
 * @property {number} version
 * @property {Array<string>} sources
 * @property {Array<string>} names
 * @property {string|undefined} [sourceRoot]
 * @property {Array<string>|undefined} [sourcesContent]
 * @property {string} mappings
 * @property {string} file
 *
 * @typedef {{[key: string]: unknown} & VFileCoreOptions} Options
 *   Configuration: a bunch of keys that will be shallow copied over to the new
 *   file.
 *
 * @typedef {Record<string, unknown>} ReporterSettings
 * @typedef {<T = ReporterSettings>(files: Array<VFile>, options: T) => string} Reporter
 */







// Order of setting (least specific to most), we need this because otherwise
// `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
// stem can be set.
const order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname']

class VFile {
  /**
   * Create a new virtual file.
   *
   * If `options` is `string` or `Buffer`, it’s treated as `{value: options}`.
   * If `options` is a `URL`, it’s treated as `{path: options}`.
   * If `options` is a `VFile`, shallow copies its data over to the new file.
   * All fields in `options` are set on the newly created `VFile`.
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * It’s not possible to set either `dirname` or `extname` without setting
   * either `history`, `path`, `basename`, or `stem` as well.
   *
   * @param {Compatible} [value]
   */
  constructor(value) {
    /** @type {Options} */
    let options

    if (!value) {
      options = {}
    } else if (typeof value === 'string' || is_buffer__WEBPACK_IMPORTED_MODULE_0__(value)) {
      // @ts-expect-error Looks like a buffer.
      options = {value}
    } else if ((0,_minurl_js__WEBPACK_IMPORTED_MODULE_1__.isUrl)(value)) {
      options = {path: value}
    } else {
      // @ts-expect-error Looks like file or options.
      options = value
    }

    /**
     * Place to store custom information (default: `{}`).
     * It’s OK to store custom data directly on the file but moving it to
     * `data` is recommended.
     * @type {Data}
     */
    this.data = {}

    /**
     * List of messages associated with the file.
     * @type {Array<VFileMessage>}
     */
    this.messages = []

    /**
     * List of filepaths the file moved between.
     * The first is the original path and the last is the current path.
     * @type {Array<string>}
     */
    this.history = []

    /**
     * Base of `path` (default: `process.cwd()` or `'/'` in browsers).
     * @type {string}
     */
    this.cwd = _minproc_js__WEBPACK_IMPORTED_MODULE_2__.cwd()

    /* eslint-disable no-unused-expressions */
    /**
     * Raw value.
     * @type {Value}
     */
    this.value

    // The below are non-standard, they are “well-known”.
    // As in, used in several tools.

    /**
     * Whether a file was saved to disk.
     * This is used by vfile reporters.
     * @type {boolean}
     */
    this.stored

    /**
     * Sometimes files have a non-string, compiled, representation.
     * This can be stored in the `result` field.
     * One example is when turning markdown into React nodes.
     * This is used by unified to store non-string results.
     * @type {unknown}
     */
    this.result

    /**
     * Sometimes files have a source map associated with them.
     * This can be stored in the `map` field.
     * This should be a `Map` type, which is equivalent to the `RawSourceMap`
     * type from the `source-map` module.
     * @type {Map|undefined}
     */
    this.map
    /* eslint-enable no-unused-expressions */

    // Set path related properties in the correct order.
    let index = -1

    while (++index < order.length) {
      const prop = order[index]

      // Note: we specifically use `in` instead of `hasOwnProperty` to accept
      // `vfile`s too.
      if (prop in options && options[prop] !== undefined) {
        // @ts-expect-error: TS is confused by the different types for `history`.
        this[prop] = prop === 'history' ? [...options[prop]] : options[prop]
      }
    }

    /** @type {string} */
    let prop

    // Set non-path related properties.
    for (prop in options) {
      // @ts-expect-error: fine to set other things.
      if (!order.includes(prop)) this[prop] = options[prop]
    }
  }

  /**
   * Get the full path (example: `'~/index.min.js'`).
   * @returns {string}
   */
  get path() {
    return this.history[this.history.length - 1]
  }

  /**
   * Set the full path (example: `'~/index.min.js'`).
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   * @param {string|URL} path
   */
  set path(path) {
    if ((0,_minurl_js__WEBPACK_IMPORTED_MODULE_1__.isUrl)(path)) {
      path = (0,_minurl_js__WEBPACK_IMPORTED_MODULE_3__.fileURLToPath)(path)
    }

    assertNonEmpty(path, 'path')

    if (this.path !== path) {
      this.history.push(path)
    }
  }

  /**
   * Get the parent path (example: `'~'`).
   */
  get dirname() {
    return typeof this.path === 'string' ? _minpath_js__WEBPACK_IMPORTED_MODULE_4__.dirname(this.path) : undefined
  }

  /**
   * Set the parent path (example: `'~'`).
   * Cannot be set if there’s no `path` yet.
   */
  set dirname(dirname) {
    assertPath(this.basename, 'dirname')
    this.path = _minpath_js__WEBPACK_IMPORTED_MODULE_4__.join(dirname || '', this.basename)
  }

  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   */
  get basename() {
    return typeof this.path === 'string' ? _minpath_js__WEBPACK_IMPORTED_MODULE_4__.basename(this.path) : undefined
  }

  /**
   * Set basename (including extname) (`'index.min.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set basename(basename) {
    assertNonEmpty(basename, 'basename')
    assertPart(basename, 'basename')
    this.path = _minpath_js__WEBPACK_IMPORTED_MODULE_4__.join(this.dirname || '', basename)
  }

  /**
   * Get the extname (including dot) (example: `'.js'`).
   */
  get extname() {
    return typeof this.path === 'string' ? _minpath_js__WEBPACK_IMPORTED_MODULE_4__.extname(this.path) : undefined
  }

  /**
   * Set the extname (including dot) (example: `'.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   */
  set extname(extname) {
    assertPart(extname, 'extname')
    assertPath(this.dirname, 'extname')

    if (extname) {
      if (extname.charCodeAt(0) !== 46 /* `.` */) {
        throw new Error('`extname` must start with `.`')
      }

      if (extname.includes('.', 1)) {
        throw new Error('`extname` cannot contain multiple dots')
      }
    }

    this.path = _minpath_js__WEBPACK_IMPORTED_MODULE_4__.join(this.dirname, this.stem + (extname || ''))
  }

  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   */
  get stem() {
    return typeof this.path === 'string'
      ? _minpath_js__WEBPACK_IMPORTED_MODULE_4__.basename(this.path, this.extname)
      : undefined
  }

  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set stem(stem) {
    assertNonEmpty(stem, 'stem')
    assertPart(stem, 'stem')
    this.path = _minpath_js__WEBPACK_IMPORTED_MODULE_4__.join(this.dirname || '', stem + (this.extname || ''))
  }

  /**
   * Serialize the file.
   *
   * @param {BufferEncoding} [encoding='utf8']
   *   When `value` is a `Buffer`, `encoding` is a character encoding to
   *   understand it as (default: `'utf8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(encoding) {
    return (this.value || '').toString(encoding)
  }

  /**
   * Constructs a new `VFileMessage`, where `fatal` is set to `false`, and
   * associates it with the file by adding it to `vfile.messages` and setting
   * `message.file` to the current filepath.
   *
   * @param {string|Error} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  message(reason, place, origin) {
    const message = new vfile_message__WEBPACK_IMPORTED_MODULE_5__.VFileMessage(reason, place, origin)

    if (this.path) {
      message.name = this.path + ':' + message.name
      message.file = this.path
    }

    message.fatal = false

    this.messages.push(message)

    return message
  }

  /**
   * Like `VFile#message()`, but associates an informational message where
   * `fatal` is set to `null`.
   *
   * @param {string|Error} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  info(reason, place, origin) {
    const message = this.message(reason, place, origin)

    message.fatal = null

    return message
  }

  /**
   * Like `VFile#message()`, but associates a fatal message where `fatal` is
   * set to `true`, and then immediately throws it.
   *
   * > 👉 **Note**: a fatal error means that a file is no longer processable.
   *
   * @param {string|Error} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {never}
   *   Message.
   */
  fail(reason, place, origin) {
    const message = this.message(reason, place, origin)

    message.fatal = true

    throw message
  }
}

/**
 * Assert that `part` is not a path (as in, does not contain `path.sep`).
 *
 * @param {string|undefined} part
 * @param {string} name
 * @returns {void}
 */
function assertPart(part, name) {
  if (part && part.includes(_minpath_js__WEBPACK_IMPORTED_MODULE_4__.sep)) {
    throw new Error(
      '`' + name + '` cannot be a path: did not expect `' + _minpath_js__WEBPACK_IMPORTED_MODULE_4__.sep + '`'
    )
  }
}

/**
 * Assert that `part` is not empty.
 *
 * @param {string|undefined} part
 * @param {string} name
 * @returns {asserts part is string}
 */
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error('`' + name + '` cannot be empty')
  }
}

/**
 * Assert `path` exists.
 *
 * @param {string|undefined} path
 * @param {string} name
 * @returns {asserts path is string}
 */
function assertPath(path, name) {
  if (!path) {
    throw new Error('Setting `' + name + '` requires `path` to be set too')
  }
}


/***/ }),

/***/ "./node_modules/vfile/lib/minurl.shared.js":
/*!*************************************************!*\
  !*** ./node_modules/vfile/lib/minurl.shared.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isUrl": () => (/* binding */ isUrl)
/* harmony export */ });
/**
 * @typedef URL
 * @property {string} hash
 * @property {string} host
 * @property {string} hostname
 * @property {string} href
 * @property {string} origin
 * @property {string} password
 * @property {string} pathname
 * @property {string} port
 * @property {string} protocol
 * @property {string} search
 * @property {any} searchParams
 * @property {string} username
 * @property {() => string} toString
 * @property {() => string} toJSON
 */

/**
 * @param {unknown} fileURLOrPath
 * @returns {fileURLOrPath is URL}
 */
// From: <https://github.com/nodejs/node/blob/fcf8ba4/lib/internal/url.js#L1501>
function isUrl(fileURLOrPath) {
  return (
    fileURLOrPath !== null &&
    typeof fileURLOrPath === 'object' &&
    // @ts-expect-error: indexable.
    fileURLOrPath.href &&
    // @ts-expect-error: indexable.
    fileURLOrPath.origin
  )
}


/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-js.js.map