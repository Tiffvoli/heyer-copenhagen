// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"cart/cart.scss":[function(require,module,exports) {

},{}],"../node_modules/@shopify/theme-currency/currency.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMoney = formatMoney;

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */
const moneyFormat = '${{amount}}';
/**
 * Format money values based on your shop currency settings
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
 * or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
 */

function formatMoney(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }

  let value = '';
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || moneyFormat;

  function formatWithDelimiters(number, precision = 2, thousands = ',', decimal = '.') {
    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);
    const parts = number.split('.');
    const dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
    const centsAmount = parts[1] ? decimal + parts[1] : '';
    return dollarsAmount + centsAmount;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;

    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;

    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;

    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
}
},{}],"../node_modules/whatwg-fetch/fetch.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.fetch = fetch;
exports.DOMException = void 0;
var global = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global;
var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob: 'FileReader' in global && 'Blob' in global && function () {
    try {
      new Blob();
      return true;
    } catch (e) {
      return false;
    }
  }(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
};

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj);
}

if (support.arrayBuffer) {
  var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

  var isArrayBufferView = ArrayBuffer.isView || function (obj) {
    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
  };
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }

  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name');
  }

  return name.toLowerCase();
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }

  return value;
} // Build a destructive iterator for the value list


function iteratorFor(items) {
  var iterator = {
    next: function () {
      var value = items.shift();
      return {
        done: value === undefined,
        value: value
      };
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}

function Headers(headers) {
  this.map = {};

  if (headers instanceof Headers) {
    headers.forEach(function (value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function (header) {
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function (name) {
      this.append(name, headers[name]);
    }, this);
  }
}

Headers.prototype.append = function (name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};

Headers.prototype['delete'] = function (name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function (name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null;
};

Headers.prototype.has = function (name) {
  return this.map.hasOwnProperty(normalizeName(name));
};

Headers.prototype.set = function (name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};

Headers.prototype.forEach = function (callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};

Headers.prototype.keys = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push(name);
  });
  return iteratorFor(items);
};

Headers.prototype.values = function () {
  var items = [];
  this.forEach(function (value) {
    items.push(value);
  });
  return iteratorFor(items);
};

Headers.prototype.entries = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items);
};

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'));
  }

  body.bodyUsed = true;
}

function fileReaderReady(reader) {
  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise;
}

function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsText(blob);
  return promise;
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars = new Array(view.length);

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }

  return chars.join('');
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0);
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer;
  }
}

function Body() {
  this.bodyUsed = false;

  this._initBody = function (body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed;
    this._bodyInit = body;

    if (!body) {
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  };

  if (support.blob) {
    this.blob = function () {
      var rejected = consumed(this);

      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob');
      } else {
        return Promise.resolve(new Blob([this._bodyText]));
      }
    };

    this.arrayBuffer = function () {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this);

        if (isConsumed) {
          return isConsumed;
        }

        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength));
        } else {
          return Promise.resolve(this._bodyArrayBuffer);
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer);
      }
    };
  }

  this.text = function () {
    var rejected = consumed(this);

    if (rejected) {
      return rejected;
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob);
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text');
    } else {
      return Promise.resolve(this._bodyText);
    }
  };

  if (support.formData) {
    this.formData = function () {
      return this.text().then(decode);
    };
  }

  this.json = function () {
    return this.text().then(JSON.parse);
  };

  return this;
} // HTTP methods whose capitalization should be normalized


var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method;
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  }

  options = options || {};
  var body = options.body;

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read');
    }

    this.url = input.url;
    this.credentials = input.credentials;

    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }

    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;

    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }

  this.credentials = options.credentials || this.credentials || 'same-origin';

  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }

  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal;
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests');
  }

  this._initBody(body);

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/;

      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/;
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
      }
    }
  }
}

Request.prototype.clone = function () {
  return new Request(this, {
    body: this._bodyInit
  });
};

function decode(body) {
  var form = new FormData();
  body.trim().split('&').forEach(function (bytes) {
    if (bytes) {
      var split = bytes.split('=');
      var name = split.shift().replace(/\+/g, ' ');
      var value = split.join('=').replace(/\+/g, ' ');
      form.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });
  return form;
}

function parseHeaders(rawHeaders) {
  var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2

  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
    var parts = line.split(':');
    var key = parts.shift().trim();

    if (key) {
      var value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
}

Body.call(Request.prototype);

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  }

  if (!options) {
    options = {};
  }

  this.type = 'default';
  this.status = options.status === undefined ? 200 : options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = 'statusText' in options ? options.statusText : '';
  this.headers = new Headers(options.headers);
  this.url = options.url || '';

  this._initBody(bodyInit);
}

Body.call(Response.prototype);

Response.prototype.clone = function () {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  });
};

Response.error = function () {
  var response = new Response(null, {
    status: 0,
    statusText: ''
  });
  response.type = 'error';
  return response;
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function (url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code');
  }

  return new Response(null, {
    status: status,
    headers: {
      location: url
    }
  });
};

var DOMException = global.DOMException;
exports.DOMException = DOMException;

try {
  new DOMException();
} catch (err) {
  exports.DOMException = DOMException = function (message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };

  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}

function fetch(input, init) {
  return new Promise(function (resolve, reject) {
    var request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    var xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function () {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      setTimeout(function () {
        resolve(new Response(body, options));
      }, 0);
    };

    xhr.onerror = function () {
      setTimeout(function () {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.ontimeout = function () {
      setTimeout(function () {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.onabort = function () {
      setTimeout(function () {
        reject(new DOMException('Aborted', 'AbortError'));
      }, 0);
    };

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url;
      } catch (e) {
        return url;
      }
    }

    xhr.open(request.method, fixUrl(request.url), true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob';
      } else if (support.arrayBuffer && request.headers.get('Content-Type') && request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1) {
        xhr.responseType = 'arraybuffer';
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function (name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
      });
    } else {
      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function () {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  });
}

fetch.polyfill = true;

if (!global.fetch) {
  global.fetch = fetch;
  global.Headers = Headers;
  global.Request = Request;
  global.Response = Response;
}
},{}],"../node_modules/form-serialize/index.js":[function(require,module,exports) {
// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;

// node names which could be successful controls
var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// Matches bracket notation.
var brackets = /(\[[^\[\]]*\])/g;

// serializes form fields
// @param form MUST be an HTMLForm element
// @param options is an optional argument to configure the serialization. Default output
// with no options specified is a url encoded string
//    - hash: [true | false] Configure the output type. If true, the output will
//    be a js object.
//    - serializer: [function] Optional serializer function to override the default one.
//    The function takes 3 arguments (result, key, value) and should return new result
//    hash and url encoded str serializers are provided with this module
//    - disabled: [true | false]. If true serialize disabled fields.
//    - empty: [true | false]. If true serialize empty fields
function serialize(form, options) {
    if (typeof options != 'object') {
        options = { hash: !!options };
    }
    else if (options.hash === undefined) {
        options.hash = true;
    }

    var result = (options.hash) ? {} : '';
    var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);

    var elements = form && form.elements ? form.elements : [];

    //Object store each radio and set if it's empty or not
    var radio_store = Object.create(null);

    for (var i=0 ; i<elements.length ; ++i) {
        var element = elements[i];

        // ingore disabled fields
        if ((!options.disabled && element.disabled) || !element.name) {
            continue;
        }
        // ignore anyhting that is not considered a success field
        if (!k_r_success_contrls.test(element.nodeName) ||
            k_r_submitter.test(element.type)) {
            continue;
        }

        var key = element.name;
        var val = element.value;

        // we can't just use element.value for checkboxes cause some browsers lie to us
        // they say "on" for value when the box isn't checked
        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
            val = undefined;
        }

        // If we want empty elements
        if (options.empty) {
            // for checkbox
            if (element.type === 'checkbox' && !element.checked) {
                val = '';
            }

            // for radio
            if (element.type === 'radio') {
                if (!radio_store[element.name] && !element.checked) {
                    radio_store[element.name] = false;
                }
                else if (element.checked) {
                    radio_store[element.name] = true;
                }
            }

            // if options empty is true, continue only if its radio
            if (val == undefined && element.type == 'radio') {
                continue;
            }
        }
        else {
            // value-less fields are ignored unless options.empty is true
            if (!val) {
                continue;
            }
        }

        // multi select boxes
        if (element.type === 'select-multiple') {
            val = [];

            var selectOptions = element.options;
            var isSelectedOptions = false;
            for (var j=0 ; j<selectOptions.length ; ++j) {
                var option = selectOptions[j];
                var allowedEmpty = options.empty && !option.value;
                var hasValue = (option.value || allowedEmpty);
                if (option.selected && hasValue) {
                    isSelectedOptions = true;

                    // If using a hash serializer be sure to add the
                    // correct notation for an array in the multi-select
                    // context. Here the name attribute on the select element
                    // might be missing the trailing bracket pair. Both names
                    // "foo" and "foo[]" should be arrays.
                    if (options.hash && key.slice(key.length - 2) !== '[]') {
                        result = serializer(result, key + '[]', option.value);
                    }
                    else {
                        result = serializer(result, key, option.value);
                    }
                }
            }

            // Serialize if no selected options and options.empty is true
            if (!isSelectedOptions && options.empty) {
                result = serializer(result, key, '');
            }

            continue;
        }

        result = serializer(result, key, val);
    }

    // Check for all empty radio buttons and serialize them with key=""
    if (options.empty) {
        for (var key in radio_store) {
            if (!radio_store[key]) {
                result = serializer(result, key, '');
            }
        }
    }

    return result;
}

function parse_keys(string) {
    var keys = [];
    var prefix = /^([^\[\]]*)/;
    var children = new RegExp(brackets);
    var match = prefix.exec(string);

    if (match[1]) {
        keys.push(match[1]);
    }

    while ((match = children.exec(string)) !== null) {
        keys.push(match[1]);
    }

    return keys;
}

function hash_assign(result, keys, value) {
    if (keys.length === 0) {
        result = value;
        return result;
    }

    var key = keys.shift();
    var between = key.match(/^\[(.+?)\]$/);

    if (key === '[]') {
        result = result || [];

        if (Array.isArray(result)) {
            result.push(hash_assign(null, keys, value));
        }
        else {
            // This might be the result of bad name attributes like "[][foo]",
            // in this case the original `result` object will already be
            // assigned to an object literal. Rather than coerce the object to
            // an array, or cause an exception the attribute "_values" is
            // assigned as an array.
            result._values = result._values || [];
            result._values.push(hash_assign(null, keys, value));
        }

        return result;
    }

    // Key is an attribute name and can be assigned directly.
    if (!between) {
        result[key] = hash_assign(result[key], keys, value);
    }
    else {
        var string = between[1];
        // +var converts the variable into a number
        // better than parseInt because it doesn't truncate away trailing
        // letters and actually fails if whole thing is not a number
        var index = +string;

        // If the characters between the brackets is not a number it is an
        // attribute name and can be assigned directly.
        if (isNaN(index)) {
            result = result || {};
            result[string] = hash_assign(result[string], keys, value);
        }
        else {
            result = result || [];
            result[index] = hash_assign(result[index], keys, value);
        }
    }

    return result;
}

// Object/hash encoding serializer.
function hash_serializer(result, key, value) {
    var matches = key.match(brackets);

    // Has brackets? Use the recursive assignment function to walk the keys,
    // construct any missing objects in the result tree and make the assignment
    // at the end of the chain.
    if (matches) {
        var keys = parse_keys(key);
        hash_assign(result, keys, value);
    }
    else {
        // Non bracket notation can make assignments directly.
        var existing = result[key];

        // If the value has been assigned already (for instance when a radio and
        // a checkbox have the same name attribute) convert the previous value
        // into an array before pushing into it.
        //
        // NOTE: If this requirement were removed all hash creation and
        // assignment could go through `hash_assign`.
        if (existing) {
            if (!Array.isArray(existing)) {
                result[key] = [ existing ];
            }

            result[key].push(value);
        }
        else {
            result[key] = value;
        }
    }

    return result;
}

// urlform encoding serializer
function str_serialize(result, key, value) {
    // encode newlines as \r\n cause the html spec says so
    value = value.replace(/(\r)?\n/g, '\r\n');
    value = encodeURIComponent(value);

    // spaces should be '+' rather than '%20'.
    value = value.replace(/%20/g, '+');
    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
}

module.exports = serialize;

},{}],"cart/cart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./cart.scss");

var _currency = require("@shopify/theme-currency/currency");

require("whatwg-fetch");

var _formSerialize = _interopRequireDefault(require("form-serialize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Translations
var translations = {
  remove: theme.strings.removeItem,
  quantity: theme.strings.quantity,
  emptyCart: theme.strings.emptyCart
};

var GoCart = /*#__PURE__*/function () {
  function GoCart(options) {
    _classCallCheck(this, GoCart);

    var defaults = {
      cartModalFail: '.js-cart-modal-fail',
      cartModalFailClose: '.js-cart-modal-fail-close',
      cartModal: '.js-cart-modal',
      cartModalClose: '.js-cart-modal-close',
      cartModalContent: '.js-cart-modal-content',
      cartDrawer: '.js-cart-drawer',
      cartDrawerContent: '.js-cart-drawer-content',
      cartDrawerSubTotal: '.js-cart-drawer-subtotal',
      cartDrawerFooter: '.js-cart-drawer-footer',
      cartDrawerClose: '.js-cart-drawer-close',
      cartMiniCart: '.js-cart-mini-cart',
      cartMiniCartContent: '.js-cart-mini-cart-content',
      cartMiniCartSubTotal: '.js-cart-mini-cart-subtotal',
      cartMiniCartFooter: '.js-cart-mini-cart-footer',
      cartTrigger: '.js-cart-trigger',
      cartOverlay: '.js-cart-overlay',
      cartCount: '.js-cart-counter',
      cartDrawerCount: '.js-cart-drawer-count',
      addToCart: '.js-cart-add-to-cart',
      removeFromCart: '.js-cart-remove-from-cart',
      removeFromCartNoDot: 'js-cart-remove-from-cart',
      itemQuantity: '.js-cart-quantity',
      itemQuantityPlus: '.js-cart-quantity-plus',
      itemQuantityMinus: '.js-cart-quantity-minus',
      cartMode: 'drawer',
      drawerDirection: 'right',
      displayModal: false,
      // eslint-disable-next-line no-template-curly-in-string
      moneyFormat: '${{amount}}'
    };
    this.defaults = Object.assign({}, defaults, options);
    this.cartModalFail = document.querySelector(this.defaults.cartModalFail);
    this.cartModalFailClose = document.querySelector(this.defaults.cartModalFailClose);
    this.cartModal = document.querySelector(this.defaults.cartModal);
    this.cartModalClose = document.querySelectorAll(this.defaults.cartModalClose);
    this.cartModalContent = document.querySelector(this.defaults.cartModalContent);
    this.cartDrawer = document.querySelector(this.defaults.cartDrawer);
    this.cartDrawerContent = document.querySelector(this.defaults.cartDrawerContent);
    this.cartDrawerSubTotal = document.querySelector(this.defaults.cartDrawerSubTotal);
    this.cartDrawerFooter = document.querySelector(this.defaults.cartDrawerFooter);
    this.cartDrawerClose = document.querySelector(this.defaults.cartDrawerClose);
    this.cartMiniCart = document.querySelector(this.defaults.cartMiniCart);
    this.cartMiniCartContent = document.querySelector(this.defaults.cartMiniCartContent);
    this.cartMiniCartSubTotal = document.querySelector(this.defaults.cartMiniCartSubTotal);
    this.cartMiniCartFooter = document.querySelector(this.defaults.cartMiniCartFooter);
    this.cartTrigger = document.querySelector(this.defaults.cartTrigger);
    this.cartOverlay = document.querySelector(this.defaults.cartOverlay);
    this.cartCount = document.querySelector(this.defaults.cartCount);
    this.cartDrawerCount = document.querySelector(this.defaults.cartDrawerCount);
    this.addToCart = document.querySelectorAll(this.defaults.addToCart);
    this.removeFromCart = this.defaults.removeFromCart;
    this.removeFromCartNoDot = this.defaults.removeFromCartNoDot;
    this.itemQuantity = this.defaults.itemQuantity;
    this.itemQuantityPlus = this.defaults.itemQuantityPlus;
    this.itemQuantityMinus = this.defaults.itemQuantityMinus;
    this.cartMode = this.defaults.cartMode;
    this.drawerDirection = this.defaults.drawerDirection;
    this.displayModal = this.defaults.displayModal;
    this.moneyFormat = this.defaults.moneyFormat;
    this.init();
  }

  _createClass(GoCart, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.fetchCart();

      if (this.isDrawerMode) {
        this.setDrawerDirection();
      }

      this.addToCart.forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          var formID = item.parentNode.getAttribute('id');

          _this.addItemToCart(formID);
        });
      });
      this.cartTrigger.addEventListener('click', function () {
        if (_this.isDrawerMode) {
          _this.openCartDrawer();
        } else {
          _this.openMiniCart();
        }

        _this.openCartOverlay();
      });
      this.cartOverlay.addEventListener('click', function () {
        _this.closeFailModal();

        _this.closeCartModal();

        if (_this.isDrawerMode) {
          _this.closeCartDrawer();
        } else {
          _this.closeMiniCart();
        }

        _this.closeCartOverlay();
      });

      if (this.isDrawerMode) {
        this.cartDrawerClose.addEventListener('click', function () {
          _this.closeCartDrawer();

          _this.closeCartOverlay();
        });
      }

      if (this.displayModal) {
        this.cartModalClose.forEach(function (item) {
          item.addEventListener('click', function () {
            _this.closeFailModal();

            _this.closeCartModal();

            if (_this.isDrawerMode) {
              _this.closeCartDrawer();
            } else {
              _this.closeMiniCart();
            }

            _this.closeCartOverlay();
          });
        });
      }

      this.cartModalFailClose.addEventListener('click', function () {
        _this.closeFailModal();

        _this.closeCartModal();

        if (_this.isDrawerMode) {
          _this.closeCartDrawer();
        } else {
          _this.closeMiniCart();
        }

        _this.closeCartOverlay();
      });
    }
  }, {
    key: "fetchCart",
    value: function fetchCart(callback) {
      var _this2 = this;

      window.fetch('/cart.js', {
        credentials: 'same-origin',
        method: 'GET'
      }).then(function (response) {
        return response.json();
      }).then(function (cart) {
        return _this2.fetchHandler(cart, callback);
      }).catch(function (error) {
        _this2.ajaxRequestFail();

        throw new Error(error);
      });
    }
  }, {
    key: "addItemToCart",
    value: function addItemToCart(formID) {
      var _this3 = this;

      var form = document.querySelector("#".concat(formID));
      var formData = (0, _formSerialize.default)(form, {
        hash: true
      });
      window.fetch('/cart/add.js', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(function (response) {
        return response.json();
      }).then(function (product) {
        return _this3.addItemToCartHandler(product);
      }).catch(function (error) {
        _this3.ajaxRequestFail();

        throw new Error(error);
      });
    }
  }, {
    key: "removeItem",
    value: function removeItem(line) {
      var _this4 = this;

      var quantity = 0;
      window.fetch('/cart/change.js', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          quantity: quantity,
          line: line
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function () {
        return _this4.fetchCart();
      }).catch(function (error) {
        _this4.ajaxRequestFail();

        throw new Error(error);
      });
    }
  }, {
    key: "changeItemQuantity",
    value: function changeItemQuantity(line, quantity) {
      var _this5 = this;

      window.fetch('/cart/change.js', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          quantity: quantity,
          line: line
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function () {
        return _this5.fetchCart();
      }).catch(function (error) {
        _this5.ajaxRequestFail();

        throw new Error(error);
      });
    }
  }, {
    key: "cartItemCount",
    value: function cartItemCount(cart) {
      this.cartCount.innerHTML = cart.item_count;
    }
  }, {
    key: "cartDrawerItemCount",
    value: function cartDrawerItemCount(cart) {
      this.cartDrawerCount.innerHTML = cart.item_count;
    }
  }, {
    key: "fetchAndOpenCart",
    value: function fetchAndOpenCart() {
      var _this6 = this;

      this.fetchCart(function () {
        if (_this6.isDrawerMode) {
          _this6.openCartDrawer();
        } else {
          _this6.openMiniCart();
        }

        _this6.openCartOverlay();
      });
    }
  }, {
    key: "fetchAndOpenModal",
    value: function fetchAndOpenModal(product) {
      var _this7 = this;

      this.fetchCart(function () {
        _this7.renderCartModal(product);

        _this7.openCartModal();

        _this7.openCartOverlay();
      });
    }
  }, {
    key: "fetchHandler",
    value: function fetchHandler(cart, callback) {
      this.cartItemCount(cart);
      this.cartDrawerItemCount(cart);

      if (this.isDrawerMode) {
        if (cart.item_count === 0) {
          this.renderBlankCartDrawer();
          this.cartDrawerFooter.classList.add('is-invisible');
        } else {
          this.renderDrawerCart(cart);
          this.cartDrawerFooter.classList.remove('is-invisible');

          if (typeof callback === 'function') {
            callback(cart);
          }
        }
      } else if (cart.item_count === 0) {
        this.renderBlankMiniCart();
        this.cartMiniCartFooter.classList.add('is-invisible');
      } else {
        this.renderMiniCart(cart);
        this.cartMiniCartFooter.classList.remove('is-invisible');

        if (typeof callback === 'function') {
          callback(cart);
        }
      }
    }
  }, {
    key: "addItemToCartHandler",
    value: function addItemToCartHandler(product) {
      return this.displayModal ? this.fetchAndOpenModal(product) : this.fetchAndOpenCart();
    }
  }, {
    key: "ajaxRequestFail",
    value: function ajaxRequestFail() {
      this.openFailModal();
      this.openCartOverlay();
    }
  }, {
    key: "renderCartModal",
    value: function renderCartModal(product) {
      this.clearCartModal();
      var productVariant = product.variant_title;

      if (productVariant === null) {
        productVariant = '';
      } else {
        productVariant = "(".concat(productVariant, ")");
      }

      var cartSingleProduct = "\n        <div class=\"cartModalItem\">\n            <div class=\"cartModalItem_image\" style=\"background-image: url(".concat(product.image, ");\"></div>\n            <div class=\"cartModalItem_info\">\n                <a href=\"").concat(product.url, "\" class=\"cartModalItem_title\">").concat(product.product_title, " ").concat(productVariant, "</a> was added to your cart.\n            </div>\n        </div>\n      ");
      this.cartModalContent.innerHTML += cartSingleProduct;
    }
  }, {
    key: "renderDrawerCart",
    value: function renderDrawerCart(cart) {
      var _this8 = this;

      this.clearCartDrawer();
      cart.items.forEach(function (item, index) {
        var itemVariant = item.variant_title;

        if (itemVariant === null) {
          itemVariant = '';
        }

        var cartSingleProduct = "\n        <div class=\"cartDrawerItem_single\" data-line=\"".concat(Number(index + 1), "\">\n            <div class=\"cartDrawerItem_info-wrapper\">\n                <div class=\"cartDrawerItem_image\" style=\"background-image: url(").concat(item.image, ");\"></div>\n                <div class=\"cartDrawerItem_info\">\n                    <a href=\"").concat(item.url, "\" class=\"cartDrawerItem_title\">").concat(item.product_title, "</a>\n                    <div class=\"cartDrawerItem_variant\">").concat(itemVariant, "</div>\n                </div>\n            </div>\n            <a class=\"cartDrawerItem_remove ").concat(_this8.removeFromCartNoDot, "\">").concat(translations.remove, "</a>\n            <div class=\"cartDrawerItem_price\">").concat((0, _currency.formatMoney)(item.line_price, _this8.moneyFormat), "</div>\n        </div>\n      ");
        _this8.cartDrawerContent.innerHTML += cartSingleProduct;
      });
      this.cartDrawerSubTotal.innerHTML = (0, _currency.formatMoney)(cart.total_price, this.moneyFormat);
      this.cartDrawerSubTotal.parentNode.classList.remove('is-invisible');
      var removeFromCart = document.querySelectorAll(this.removeFromCart);
      removeFromCart.forEach(function (item) {
        item.addEventListener('click', function () {
          GoCart.removeItemAnimation(item.parentNode);
          var line = item.parentNode.getAttribute('data-line');

          _this8.removeItem(line);
        });
      });
      var itemQuantityPlus = document.querySelectorAll(this.itemQuantityPlus);
      itemQuantityPlus.forEach(function (item) {
        item.addEventListener('click', function () {
          var line = item.parentNode.parentNode.parentNode.parentNode.getAttribute('data-line');
          var quantity = Number(item.parentNode.querySelector(_this8.itemQuantity).value) + 1;

          _this8.changeItemQuantity(line, quantity);
        });
      });
      var itemQuantityMinus = document.querySelectorAll(this.itemQuantityMinus);
      itemQuantityMinus.forEach(function (item) {
        item.addEventListener('click', function () {
          var line = item.parentNode.parentNode.parentNode.parentNode.getAttribute('data-line');
          var quantity = Number(item.parentNode.querySelector(_this8.itemQuantity).value) - 1;

          _this8.changeItemQuantity(line, quantity);

          if (Number(item.parentNode.querySelector(_this8.itemQuantity).value - 1) === 0) {
            GoCart.removeItemAnimation(item.parentNode.parentNode.parentNode.parentNode);
          }
        });
      });
    }
  }, {
    key: "renderMiniCart",
    value: function renderMiniCart(cart) {
      var _this9 = this;

      this.clearMiniCart();
      cart.items.forEach(function (item, index) {
        var itemVariant = item.variant_title;

        if (itemVariant === null) {
          itemVariant = '';
        }

        var cartSingleProduct = "\n        <div class=\"go-cart-item__single\" data-line=\"".concat(Number(index + 1), "\">\n            <div class=\"go-cart-item__info-wrapper\">\n                <div class=\"go-cart-item__image\" style=\"background-image: url(").concat(item.image, ");\"></div>\n                <div class=\"go-cart-item__info\">\n                    <a href=\"").concat(item.url, "\" class=\"go-cart-item__title\">").concat(item.product_title, "</a>\n                    <div class=\"go-cart-item__variant\">").concat(itemVariant, "</div>\n                    <div class=\"go-cart-item__quantity\">\n                        <span class=\"go-cart-item__quantity-label\">").concat(translations.quantity, " </span>\n                        <span class=\"go-cart-item__quantity-button js-go-cart-quantity-minus\">-</span>\n                        <input class=\"go-cart-item__quantity-number js-go-cart-quantity\" type=\"number\" value=\"").concat(item.quantity, "\" disabled>\n                        <span class=\"go-cart-item__quantity-button js-go-cart-quantity-plus\">+</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"go-cart-item__price\">").concat((0, _currency.formatMoney)(item.line_price, _this9.moneyFormat), "</div>\n            <a class=\"go-cart-item__remove ").concat(_this9.removeFromCartNoDot, "\">").concat(translations.remove, "</a>\n        </div>\n      ");
        _this9.cartMiniCartContent.innerHTML += cartSingleProduct;
      });
      this.cartMiniCartSubTotal.innerHTML = (0, _currency.formatMoney)(cart.total_price, this.moneyFormat);
      this.cartMiniCartSubTotal.parentNode.classList.remove('is-invisible');
      var removeFromCart = document.querySelectorAll(this.removeFromCart);
      removeFromCart.forEach(function (item) {
        item.addEventListener('click', function () {
          GoCart.removeItemAnimation(item.parentNode);
          var line = item.parentNode.getAttribute('data-line');

          _this9.removeItem(line);
        });
      });
      var itemQuantityPlus = document.querySelectorAll(this.itemQuantityPlus);
      itemQuantityPlus.forEach(function (item) {
        item.addEventListener('click', function () {
          var line = item.parentNode.parentNode.parentNode.parentNode.getAttribute('data-line');
          var quantity = Number(item.parentNode.querySelector(_this9.itemQuantity).value) + 1;

          _this9.changeItemQuantity(line, quantity);
        });
      });
      var itemQuantityMinus = document.querySelectorAll(this.itemQuantityMinus);
      itemQuantityMinus.forEach(function (item) {
        item.addEventListener('click', function () {
          var line = item.parentNode.parentNode.parentNode.parentNode.getAttribute('data-line');
          var quantity = Number(item.parentNode.querySelector(_this9.itemQuantity).value) - 1;

          _this9.changeItemQuantity(line, quantity);

          if (Number(item.parentNode.querySelector(_this9.itemQuantity).value - 1) === 0) {
            GoCart.removeItemAnimation(item.parentNode.parentNode.parentNode.parentNode);
          }
        });
      });
    }
  }, {
    key: "renderBlankCartDrawer",
    value: function renderBlankCartDrawer() {
      this.cartDrawerSubTotal.parentNode.classList.add('is-invisible');
      this.clearCartDrawer();
      this.cartDrawerContent.innerHTML = '<div class="cart_empty">Your cart is currently empty!</div>';
    }
  }, {
    key: "renderBlankMiniCart",
    value: function renderBlankMiniCart() {
      this.cartMiniCartSubTotal.parentNode.classList.add('is-invisible');
      this.clearMiniCart();
      this.cartMiniCartContent.innerHTML = '<div class="cart_empty">Your cart is currently empty!</div>';
    }
  }, {
    key: "clearCartDrawer",
    value: function clearCartDrawer() {
      this.cartDrawerContent.innerHTML = '';
    }
  }, {
    key: "clearMiniCart",
    value: function clearMiniCart() {
      this.cartMiniCartContent.innerHTML = '';
    }
  }, {
    key: "clearCartModal",
    value: function clearCartModal() {
      this.cartModalContent.innerHTML = '';
    }
  }, {
    key: "openCartDrawer",
    value: function openCartDrawer() {
      this.cartDrawer.classList.add('is-open');
    }
  }, {
    key: "closeCartDrawer",
    value: function closeCartDrawer() {
      this.cartDrawer.classList.remove('is-open');
    }
  }, {
    key: "openMiniCart",
    value: function openMiniCart() {
      this.cartMiniCart.classList.add('is-open');
    }
  }, {
    key: "closeMiniCart",
    value: function closeMiniCart() {
      this.cartMiniCart.classList.remove('is-open');
    }
  }, {
    key: "openFailModal",
    value: function openFailModal() {
      this.cartModalFail.classList.add('is-open');
    }
  }, {
    key: "closeFailModal",
    value: function closeFailModal() {
      this.cartModalFail.classList.remove('is-open');
    }
  }, {
    key: "openCartModal",
    value: function openCartModal() {
      this.cartModal.classList.add('is-open');
    }
  }, {
    key: "closeCartModal",
    value: function closeCartModal() {
      this.cartModal.classList.remove('is-open');
    }
  }, {
    key: "openCartOverlay",
    value: function openCartOverlay() {
      this.cartOverlay.classList.add('is-open');
    }
  }, {
    key: "closeCartOverlay",
    value: function closeCartOverlay() {
      this.cartOverlay.classList.remove('is-open');
    }
  }, {
    key: "setDrawerDirection",
    value: function setDrawerDirection() {
      this.cartDrawer.classList.add("cart-drawer-".concat(this.drawerDirection));
    }
  }, {
    key: "isDrawerMode",
    get: function get() {
      return this.cartMode === 'drawer';
    }
  }], [{
    key: "removeItemAnimation",
    value: function removeItemAnimation(item) {
      item.classList.add('is-invisible');
    }
  }]);

  return GoCart;
}();

var _default = GoCart;
exports.default = _default;
},{"./cart.scss":"cart/cart.scss","@shopify/theme-currency/currency":"../node_modules/@shopify/theme-currency/currency.js","whatwg-fetch":"../node_modules/whatwg-fetch/fetch.js","form-serialize":"../node_modules/form-serialize/index.js"}],"components.js":[function(require,module,exports) {
"use strict";

var _cart = _interopRequireDefault(require("./cart/cart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cart;
window.addEventListener('DOMContentLoaded', function (event) {
  cart = new _cart.default({
    cartMode: 'drawer',
    cartTrigger: '.js-cart-trigger',
    cartCount: '.js-cart-counter',
    addToCart: '.js-cart-add-to-cart',
    moneyFormat: Shopify.currencyFormat
  });
});
},{"./cart/cart":"cart/cart.js"}]},{},["components.js"], "components")
//# sourceMappingURL=assets/components.js.map