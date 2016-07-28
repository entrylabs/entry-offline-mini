/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./builds/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	window._ = __webpack_require__(11);
	window.jquery = window.$ = window.jQuery = __webpack_require__(12);
	__webpack_require__(15);
	__webpack_require__(32);
	
	function init() {
	    if (!localStorage.getItem('lang')) {
	        localStorage.setItem('lang', 'ko');
	    }
	    var userLang = localStorage.getItem('lang');
	
	    var _require = __webpack_require__(34)("./" + userLang + '.js');
	
	    var Lang = _require.Lang;
	
	    window.Lang = Lang;
	
	    var _require2 = __webpack_require__(39);
	
	    var EntryStatic = _require2.EntryStatic;
	
	    window.EntryStatic = EntryStatic;
	    window.Blockly = {
	        Blocks: {}
	    };
	}
	init();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
	!function (a, b) {
	  "object" == ( false ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = a.document ? b(a, !0) : function (a) {
	    if (!a.document) throw new Error("jQuery requires a window with a document");return b(a);
	  } : b(a);
	}("undefined" != typeof window ? window : undefined, function (a, b) {
	  var c = [],
	      d = c.slice,
	      e = c.concat,
	      f = c.push,
	      g = c.indexOf,
	      h = {},
	      i = h.toString,
	      j = h.hasOwnProperty,
	      k = {},
	      l = "1.11.3",
	      m = function m(a, b) {
	    return new m.fn.init(a, b);
	  },
	      n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	      o = /^-ms-/,
	      p = /-([\da-z])/gi,
	      q = function q(a, b) {
	    return b.toUpperCase();
	  };m.fn = m.prototype = { jquery: l, constructor: m, selector: "", length: 0, toArray: function toArray() {
	      return d.call(this);
	    }, get: function get(a) {
	      return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this);
	    }, pushStack: function pushStack(a) {
	      var b = m.merge(this.constructor(), a);return b.prevObject = this, b.context = this.context, b;
	    }, each: function each(a, b) {
	      return m.each(this, a, b);
	    }, map: function map(a) {
	      return this.pushStack(m.map(this, function (b, c) {
	        return a.call(b, c, b);
	      }));
	    }, slice: function slice() {
	      return this.pushStack(d.apply(this, arguments));
	    }, first: function first() {
	      return this.eq(0);
	    }, last: function last() {
	      return this.eq(-1);
	    }, eq: function eq(a) {
	      var b = this.length,
	          c = +a + (0 > a ? b : 0);return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
	    }, end: function end() {
	      return this.prevObject || this.constructor(null);
	    }, push: f, sort: c.sort, splice: c.splice }, m.extend = m.fn.extend = function () {
	    var a,
	        b,
	        c,
	        d,
	        e,
	        f,
	        g = arguments[0] || {},
	        h = 1,
	        i = arguments.length,
	        j = !1;for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) {
	      if (null != (e = arguments[h])) for (d in e) {
	        a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
	      }
	    }return g;
	  }, m.extend({ expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(a) {
	      throw new Error(a);
	    }, noop: function noop() {}, isFunction: function isFunction(a) {
	      return "function" === m.type(a);
	    }, isArray: Array.isArray || function (a) {
	      return "array" === m.type(a);
	    }, isWindow: function isWindow(a) {
	      return null != a && a == a.window;
	    }, isNumeric: function isNumeric(a) {
	      return !m.isArray(a) && a - parseFloat(a) + 1 >= 0;
	    }, isEmptyObject: function isEmptyObject(a) {
	      var b;for (b in a) {
	        return !1;
	      }return !0;
	    }, isPlainObject: function isPlainObject(a) {
	      var b;if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;try {
	        if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1;
	      } catch (c) {
	        return !1;
	      }if (k.ownLast) for (b in a) {
	        return j.call(a, b);
	      }for (b in a) {}return void 0 === b || j.call(a, b);
	    }, type: function type(a) {
	      return null == a ? a + "" : "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a ? h[i.call(a)] || "object" : typeof a === "undefined" ? "undefined" : _typeof(a);
	    }, globalEval: function globalEval(b) {
	      b && m.trim(b) && (a.execScript || function (b) {
	        a.eval.call(a, b);
	      })(b);
	    }, camelCase: function camelCase(a) {
	      return a.replace(o, "ms-").replace(p, q);
	    }, nodeName: function nodeName(a, b) {
	      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
	    }, each: function each(a, b, c) {
	      var d,
	          e = 0,
	          f = a.length,
	          g = r(a);if (c) {
	        if (g) {
	          for (; f > e; e++) {
	            if (d = b.apply(a[e], c), d === !1) break;
	          }
	        } else for (e in a) {
	          if (d = b.apply(a[e], c), d === !1) break;
	        }
	      } else if (g) {
	        for (; f > e; e++) {
	          if (d = b.call(a[e], e, a[e]), d === !1) break;
	        }
	      } else for (e in a) {
	        if (d = b.call(a[e], e, a[e]), d === !1) break;
	      }return a;
	    }, trim: function trim(a) {
	      return null == a ? "" : (a + "").replace(n, "");
	    }, makeArray: function makeArray(a, b) {
	      var c = b || [];return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c;
	    }, inArray: function inArray(a, b, c) {
	      var d;if (b) {
	        if (g) return g.call(b, a, c);for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) {
	          if (c in b && b[c] === a) return c;
	        }
	      }return -1;
	    }, merge: function merge(a, b) {
	      var c = +b.length,
	          d = 0,
	          e = a.length;while (c > d) {
	        a[e++] = b[d++];
	      }if (c !== c) while (void 0 !== b[d]) {
	        a[e++] = b[d++];
	      }return a.length = e, a;
	    }, grep: function grep(a, b, c) {
	      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) {
	        d = !b(a[f], f), d !== h && e.push(a[f]);
	      }return e;
	    }, map: function map(a, b, c) {
	      var d,
	          f = 0,
	          g = a.length,
	          h = r(a),
	          i = [];if (h) for (; g > f; f++) {
	        d = b(a[f], f, c), null != d && i.push(d);
	      } else for (f in a) {
	        d = b(a[f], f, c), null != d && i.push(d);
	      }return e.apply([], i);
	    }, guid: 1, proxy: function proxy(a, b) {
	      var c, e, f;return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function e() {
	        return a.apply(b || this, c.concat(d.call(arguments)));
	      }, e.guid = a.guid = a.guid || m.guid++, e) : void 0;
	    }, now: function now() {
	      return +new Date();
	    }, support: k }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
	    h["[object " + b + "]"] = b.toLowerCase();
	  });function r(a) {
	    var b = "length" in a && a.length,
	        c = m.type(a);return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
	  }var s = function (a) {
	    var b,
	        c,
	        d,
	        e,
	        f,
	        g,
	        h,
	        i,
	        j,
	        k,
	        l,
	        m,
	        n,
	        o,
	        p,
	        q,
	        r,
	        s,
	        t,
	        u = "sizzle" + 1 * new Date(),
	        v = a.document,
	        w = 0,
	        x = 0,
	        y = ha(),
	        z = ha(),
	        A = ha(),
	        B = function B(a, b) {
	      return a === b && (l = !0), 0;
	    },
	        C = 1 << 31,
	        D = {}.hasOwnProperty,
	        E = [],
	        F = E.pop,
	        G = E.push,
	        H = E.push,
	        I = E.slice,
	        J = function J(a, b) {
	      for (var c = 0, d = a.length; d > c; c++) {
	        if (a[c] === b) return c;
	      }return -1;
	    },
	        K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	        L = "[\\x20\\t\\r\\n\\f]",
	        M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	        N = M.replace("w", "w#"),
	        O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
	        P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
	        Q = new RegExp(L + "+", "g"),
	        R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
	        S = new RegExp("^" + L + "*," + L + "*"),
	        T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
	        U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
	        V = new RegExp(P),
	        W = new RegExp("^" + N + "$"),
	        X = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), TAG: new RegExp("^(" + M.replace("w", "w*") + ")"), ATTR: new RegExp("^" + O), PSEUDO: new RegExp("^" + P), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"), bool: new RegExp("^(?:" + K + ")$", "i"), needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i") },
	        Y = /^(?:input|select|textarea|button)$/i,
	        Z = /^h\d$/i,
	        $ = /^[^{]+\{\s*\[native \w/,
	        _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	        aa = /[+~]/,
	        ba = /'|\\/g,
	        ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
	        da = function da(a, b, c) {
	      var d = "0x" + b - 65536;return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
	    },
	        ea = function ea() {
	      m();
	    };try {
	      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;
	    } catch (fa) {
	      H = { apply: E.length ? function (a, b) {
	          G.apply(a, I.call(b));
	        } : function (a, b) {
	          var c = a.length,
	              d = 0;while (a[c++] = b[d++]) {}a.length = c - 1;
	        } };
	    }function ga(a, b, d, e) {
	      var f, h, j, k, l, o, r, s, w, x;if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;if (!e && p) {
	        if (11 !== k && (f = _.exec(a))) if (j = f[1]) {
	          if (9 === k) {
	            if (h = b.getElementById(j), !h || !h.parentNode) return d;if (h.id === j) return d.push(h), d;
	          } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d;
	        } else {
	          if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)), d;
	        }if (c.qsa && (!q || !q.test(a))) {
	          if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
	            o = g(a), (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;while (l--) {
	              o[l] = s + ra(o[l]);
	            }w = aa.test(a) && pa(b.parentNode) || b, x = o.join(",");
	          }if (x) try {
	            return H.apply(d, w.querySelectorAll(x)), d;
	          } catch (y) {} finally {
	            r || b.removeAttribute("id");
	          }
	        }
	      }return i(a.replace(R, "$1"), b, d, e);
	    }function ha() {
	      var a = [];function b(c, e) {
	        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
	      }return b;
	    }function ia(a) {
	      return a[u] = !0, a;
	    }function ja(a) {
	      var b = n.createElement("div");try {
	        return !!a(b);
	      } catch (c) {
	        return !1;
	      } finally {
	        b.parentNode && b.parentNode.removeChild(b), b = null;
	      }
	    }function ka(a, b) {
	      var c = a.split("|"),
	          e = a.length;while (e--) {
	        d.attrHandle[c[e]] = b;
	      }
	    }function la(a, b) {
	      var c = b && a,
	          d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);if (d) return d;if (c) while (c = c.nextSibling) {
	        if (c === b) return -1;
	      }return a ? 1 : -1;
	    }function ma(a) {
	      return function (b) {
	        var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
	      };
	    }function na(a) {
	      return function (b) {
	        var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
	      };
	    }function oa(a) {
	      return ia(function (b) {
	        return b = +b, ia(function (c, d) {
	          var e,
	              f = a([], c.length, b),
	              g = f.length;while (g--) {
	            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
	          }
	        });
	      });
	    }function pa(a) {
	      return a && "undefined" != typeof a.getElementsByTagName && a;
	    }c = ga.support = {}, f = ga.isXML = function (a) {
	      var b = a && (a.ownerDocument || a).documentElement;return b ? "HTML" !== b.nodeName : !1;
	    }, m = ga.setDocument = function (a) {
	      var b,
	          e,
	          g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e.attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function (a) {
	        return a.className = "i", !a.getAttribute("className");
	      }), c.getElementsByTagName = ja(function (a) {
	        return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length;
	      }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function (a) {
	        return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length;
	      }), c.getById ? (d.find.ID = function (a, b) {
	        if ("undefined" != typeof b.getElementById && p) {
	          var c = b.getElementById(a);return c && c.parentNode ? [c] : [];
	        }
	      }, d.filter.ID = function (a) {
	        var b = a.replace(ca, da);return function (a) {
	          return a.getAttribute("id") === b;
	        };
	      }) : (delete d.find.ID, d.filter.ID = function (a) {
	        var b = a.replace(ca, da);return function (a) {
	          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
	        };
	      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
	        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
	      } : function (a, b) {
	        var c,
	            d = [],
	            e = 0,
	            f = b.getElementsByTagName(a);if ("*" === a) {
	          while (c = f[e++]) {
	            1 === c.nodeType && d.push(c);
	          }return d;
	        }return f;
	      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
	        return p ? b.getElementsByClassName(a) : void 0;
	      }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function (a) {
	        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
	      }), ja(function (a) {
	        var b = g.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
	      })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
	        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P);
	      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function (a, b) {
	        var c = 9 === a.nodeType ? a.documentElement : a,
	            d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
	      } : function (a, b) {
	        if (b) while (b = b.parentNode) {
	          if (b === a) return !0;
	        }return !1;
	      }, B = b ? function (a, b) {
	        if (a === b) return l = !0, 0;var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);
	      } : function (a, b) {
	        if (a === b) return l = !0, 0;var c,
	            d = 0,
	            e = a.parentNode,
	            f = b.parentNode,
	            h = [a],
	            i = [b];if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;if (e === f) return la(a, b);c = a;while (c = c.parentNode) {
	          h.unshift(c);
	        }c = b;while (c = c.parentNode) {
	          i.unshift(c);
	        }while (h[d] === i[d]) {
	          d++;
	        }return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0;
	      }, g) : n;
	    }, ga.matches = function (a, b) {
	      return ga(a, null, null, b);
	    }, ga.matchesSelector = function (a, b) {
	      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
	        var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
	      } catch (e) {}return ga(b, n, null, [a]).length > 0;
	    }, ga.contains = function (a, b) {
	      return (a.ownerDocument || a) !== n && m(a), t(a, b);
	    }, ga.attr = function (a, b) {
	      (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
	          f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
	    }, ga.error = function (a) {
	      throw new Error("Syntax error, unrecognized expression: " + a);
	    }, ga.uniqueSort = function (a) {
	      var b,
	          d = [],
	          e = 0,
	          f = 0;if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
	        while (b = a[f++]) {
	          b === a[f] && (e = d.push(f));
	        }while (e--) {
	          a.splice(d[e], 1);
	        }
	      }return k = null, a;
	    }, e = ga.getText = function (a) {
	      var b,
	          c = "",
	          d = 0,
	          f = a.nodeType;if (f) {
	        if (1 === f || 9 === f || 11 === f) {
	          if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) {
	            c += e(a);
	          }
	        } else if (3 === f || 4 === f) return a.nodeValue;
	      } else while (b = a[d++]) {
	        c += e(b);
	      }return c;
	    }, d = ga.selectors = { cacheLength: 50, createPseudo: ia, match: X, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
	          return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
	        }, CHILD: function CHILD(a) {
	          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a;
	        }, PSEUDO: function PSEUDO(a) {
	          var b,
	              c = !a[6] && a[2];return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
	        } }, filter: { TAG: function TAG(a) {
	          var b = a.replace(ca, da).toLowerCase();return "*" === a ? function () {
	            return !0;
	          } : function (a) {
	            return a.nodeName && a.nodeName.toLowerCase() === b;
	          };
	        }, CLASS: function CLASS(a) {
	          var b = y[a + " "];return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
	            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
	          });
	        }, ATTR: function ATTR(a, b, c) {
	          return function (d) {
	            var e = ga.attr(d, a);return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0;
	          };
	        }, CHILD: function CHILD(a, b, c, d, e) {
	          var f = "nth" !== a.slice(0, 3),
	              g = "last" !== a.slice(-4),
	              h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
	            return !!a.parentNode;
	          } : function (b, c, i) {
	            var j,
	                k,
	                l,
	                m,
	                n,
	                o,
	                p = f !== g ? "nextSibling" : "previousSibling",
	                q = b.parentNode,
	                r = h && b.nodeName.toLowerCase(),
	                s = !i && !h;if (q) {
	              if (f) {
	                while (p) {
	                  l = b;while (l = l[p]) {
	                    if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
	                  }o = p = "only" === a && !o && "nextSibling";
	                }return !0;
	              }if (o = [g ? q.firstChild : q.lastChild], g && s) {
	                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) {
	                  if (1 === l.nodeType && ++m && l === b) {
	                    k[a] = [w, n, m];break;
	                  }
	                }
	              } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) {
	                if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break;
	              }return m -= e, m === d || m % d === 0 && m / d >= 0;
	            }
	          };
	        }, PSEUDO: function PSEUDO(a, b) {
	          var c,
	              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
	            var d,
	                f = e(a, b),
	                g = f.length;while (g--) {
	              d = J(a, f[g]), a[d] = !(c[d] = f[g]);
	            }
	          }) : function (a) {
	            return e(a, 0, c);
	          }) : e;
	        } }, pseudos: { not: ia(function (a) {
	          var b = [],
	              c = [],
	              d = h(a.replace(R, "$1"));return d[u] ? ia(function (a, b, c, e) {
	            var f,
	                g = d(a, null, e, []),
	                h = a.length;while (h--) {
	              (f = g[h]) && (a[h] = !(b[h] = f));
	            }
	          }) : function (a, e, f) {
	            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
	          };
	        }), has: ia(function (a) {
	          return function (b) {
	            return ga(a, b).length > 0;
	          };
	        }), contains: ia(function (a) {
	          return a = a.replace(ca, da), function (b) {
	            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
	          };
	        }), lang: ia(function (a) {
	          return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(), function (b) {
	            var c;do {
	              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
	            } while ((b = b.parentNode) && 1 === b.nodeType);return !1;
	          };
	        }), target: function target(b) {
	          var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
	        }, root: function root(a) {
	          return a === o;
	        }, focus: function focus(a) {
	          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
	        }, enabled: function enabled(a) {
	          return a.disabled === !1;
	        }, disabled: function disabled(a) {
	          return a.disabled === !0;
	        }, checked: function checked(a) {
	          var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
	        }, selected: function selected(a) {
	          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
	        }, empty: function empty(a) {
	          for (a = a.firstChild; a; a = a.nextSibling) {
	            if (a.nodeType < 6) return !1;
	          }return !0;
	        }, parent: function parent(a) {
	          return !d.pseudos.empty(a);
	        }, header: function header(a) {
	          return Z.test(a.nodeName);
	        }, input: function input(a) {
	          return Y.test(a.nodeName);
	        }, button: function button(a) {
	          var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
	        }, text: function text(a) {
	          var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
	        }, first: oa(function () {
	          return [0];
	        }), last: oa(function (a, b) {
	          return [b - 1];
	        }), eq: oa(function (a, b, c) {
	          return [0 > c ? c + b : c];
	        }), even: oa(function (a, b) {
	          for (var c = 0; b > c; c += 2) {
	            a.push(c);
	          }return a;
	        }), odd: oa(function (a, b) {
	          for (var c = 1; b > c; c += 2) {
	            a.push(c);
	          }return a;
	        }), lt: oa(function (a, b, c) {
	          for (var d = 0 > c ? c + b : c; --d >= 0;) {
	            a.push(d);
	          }return a;
	        }), gt: oa(function (a, b, c) {
	          for (var d = 0 > c ? c + b : c; ++d < b;) {
	            a.push(d);
	          }return a;
	        }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
	      d.pseudos[b] = ma(b);
	    }for (b in { submit: !0, reset: !0 }) {
	      d.pseudos[b] = na(b);
	    }function qa() {}qa.prototype = d.filters = d.pseudos, d.setFilters = new qa(), g = ga.tokenize = function (a, b) {
	      var c,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
	        (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(R, " ") }), h = h.slice(c.length));for (g in d.filter) {
	          !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));
	        }if (!c) break;
	      }return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
	    };function ra(a) {
	      for (var b = 0, c = a.length, d = ""; c > b; b++) {
	        d += a[b].value;
	      }return d;
	    }function sa(a, b, c) {
	      var d = b.dir,
	          e = c && "parentNode" === d,
	          f = x++;return b.first ? function (b, c, f) {
	        while (b = b[d]) {
	          if (1 === b.nodeType || e) return a(b, c, f);
	        }
	      } : function (b, c, g) {
	        var h,
	            i,
	            j = [w, f];if (g) {
	          while (b = b[d]) {
	            if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
	          }
	        } else while (b = b[d]) {
	          if (1 === b.nodeType || e) {
	            if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];if (i[d] = j, j[2] = a(b, c, g)) return !0;
	          }
	        }
	      };
	    }function ta(a) {
	      return a.length > 1 ? function (b, c, d) {
	        var e = a.length;while (e--) {
	          if (!a[e](b, c, d)) return !1;
	        }return !0;
	      } : a[0];
	    }function ua(a, b, c) {
	      for (var d = 0, e = b.length; e > d; d++) {
	        ga(a, b[d], c);
	      }return c;
	    }function va(a, b, c, d, e) {
	      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) {
	        (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
	      }return g;
	    }function wa(a, b, c, d, e, f) {
	      return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function (f, g, h, i) {
	        var j,
	            k,
	            l,
	            m = [],
	            n = [],
	            o = g.length,
	            p = f || ua(b || "*", h.nodeType ? [h] : h, []),
	            q = !a || !f && b ? p : va(p, m, a, h, i),
	            r = c ? e || (f ? a : o || d) ? [] : g : q;if (c && c(q, r, h, i), d) {
	          j = va(r, n), d(j, [], h, i), k = j.length;while (k--) {
	            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
	          }
	        }if (f) {
	          if (e || a) {
	            if (e) {
	              j = [], k = r.length;while (k--) {
	                (l = r[k]) && j.push(q[k] = l);
	              }e(null, r = [], j, i);
	            }k = r.length;while (k--) {
	              (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
	            }
	          }
	        } else r = va(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);
	      });
	    }function xa(a) {
	      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sa(function (a) {
	        return a === b;
	      }, h, !0), l = sa(function (a) {
	        return J(b, a) > -1;
	      }, h, !0), m = [function (a, c, d) {
	        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return b = null, e;
	      }]; f > i; i++) {
	        if (c = d.relative[a[i].type]) m = [sa(ta(m), c)];else {
	          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
	            for (e = ++i; f > e; e++) {
	              if (d.relative[a[e].type]) break;
	            }return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a));
	          }m.push(c);
	        }
	      }return ta(m);
	    }function ya(a, b) {
	      var c = b.length > 0,
	          e = a.length > 0,
	          f = function f(_f, g, h, i, k) {
	        var l,
	            m,
	            o,
	            p = 0,
	            q = "0",
	            r = _f && [],
	            s = [],
	            t = j,
	            u = _f || e && d.find.TAG("*", k),
	            v = w += null == t ? 1 : Math.random() || .1,
	            x = u.length;for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
	          if (e && l) {
	            m = 0;while (o = a[m++]) {
	              if (o(l, g, h)) {
	                i.push(l);break;
	              }
	            }k && (w = v);
	          }c && ((l = !o && l) && p--, _f && r.push(l));
	        }if (p += q, c && q !== p) {
	          m = 0;while (o = b[m++]) {
	            o(r, s, g, h);
	          }if (_f) {
	            if (p > 0) while (q--) {
	              r[q] || s[q] || (s[q] = F.call(i));
	            }s = va(s);
	          }H.apply(i, s), k && !_f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i);
	        }return k && (w = v, j = t), r;
	      };return c ? ia(f) : f;
	    }return h = ga.compile = function (a, b) {
	      var c,
	          d = [],
	          e = [],
	          f = A[a + " "];if (!f) {
	        b || (b = g(a)), c = b.length;while (c--) {
	          f = xa(b[c]), f[u] ? d.push(f) : e.push(f);
	        }f = A(a, ya(e, d)), f.selector = a;
	      }return f;
	    }, i = ga.select = function (a, b, e, f) {
	      var i,
	          j,
	          k,
	          l,
	          m,
	          n = "function" == typeof a && a,
	          o = !f && g(a = n.selector || a);if (e = e || [], 1 === o.length) {
	        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
	          if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b) return e;n && (b = b.parentNode), a = a.slice(j.shift().value.length);
	        }i = X.needsContext.test(a) ? 0 : j.length;while (i--) {
	          if (k = j[i], d.relative[l = k.type]) break;if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
	            if (j.splice(i, 1), a = f.length && ra(j), !a) return H.apply(e, f), e;break;
	          }
	        }
	      }return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e;
	    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
	      return 1 & a.compareDocumentPosition(n.createElement("div"));
	    }), ja(function (a) {
	      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
	    }) || ka("type|href|height|width", function (a, b, c) {
	      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
	    }), c.attributes && ja(function (a) {
	      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
	    }) || ka("value", function (a, b, c) {
	      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
	    }), ja(function (a) {
	      return null == a.getAttribute("disabled");
	    }) || ka(K, function (a, b, c) {
	      var d;return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
	    }), ga;
	  }(a);m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;var t = m.expr.match.needsContext,
	      u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	      v = /^.[^:#\[\.,]*$/;function w(a, b, c) {
	    if (m.isFunction(b)) return m.grep(a, function (a, d) {
	      return !!b.call(a, d, a) !== c;
	    });if (b.nodeType) return m.grep(a, function (a) {
	      return a === b !== c;
	    });if ("string" == typeof b) {
	      if (v.test(b)) return m.filter(b, a, c);b = m.filter(b, a);
	    }return m.grep(a, function (a) {
	      return m.inArray(a, b) >= 0 !== c;
	    });
	  }m.filter = function (a, b, c) {
	    var d = b[0];return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function (a) {
	      return 1 === a.nodeType;
	    }));
	  }, m.fn.extend({ find: function find(a) {
	      var b,
	          c = [],
	          d = this,
	          e = d.length;if ("string" != typeof a) return this.pushStack(m(a).filter(function () {
	        for (b = 0; e > b; b++) {
	          if (m.contains(d[b], this)) return !0;
	        }
	      }));for (b = 0; e > b; b++) {
	        m.find(a, d[b], c);
	      }return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c;
	    }, filter: function filter(a) {
	      return this.pushStack(w(this, a || [], !1));
	    }, not: function not(a) {
	      return this.pushStack(w(this, a || [], !0));
	    }, is: function is(a) {
	      return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length;
	    } });var x,
	      y = a.document,
	      z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	      A = m.fn.init = function (a, b) {
	    var c, d;if (!a) return this;if ("string" == typeof a) {
	      if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);if (c[1]) {
	        if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b)) for (c in b) {
	          m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
	        }return this;
	      }if (d = y.getElementById(c[2]), d && d.parentNode) {
	        if (d.id !== c[2]) return x.find(a);this.length = 1, this[0] = d;
	      }return this.context = y, this.selector = a, this;
	    }return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this));
	  };A.prototype = m.fn, x = m(y);var B = /^(?:parents|prev(?:Until|All))/,
	      C = { children: !0, contents: !0, next: !0, prev: !0 };m.extend({ dir: function dir(a, b, c) {
	      var d = [],
	          e = a[b];while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c))) {
	        1 === e.nodeType && d.push(e), e = e[b];
	      }return d;
	    }, sibling: function sibling(a, b) {
	      for (var c = []; a; a = a.nextSibling) {
	        1 === a.nodeType && a !== b && c.push(a);
	      }return c;
	    } }), m.fn.extend({ has: function has(a) {
	      var b,
	          c = m(a, this),
	          d = c.length;return this.filter(function () {
	        for (b = 0; d > b; b++) {
	          if (m.contains(this, c[b])) return !0;
	        }
	      });
	    }, closest: function closest(a, b) {
	      for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++) {
	        for (c = this[d]; c && c !== b; c = c.parentNode) {
	          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
	            f.push(c);break;
	          }
	        }
	      }return this.pushStack(f.length > 1 ? m.unique(f) : f);
	    }, index: function index(a) {
	      return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
	    }, add: function add(a, b) {
	      return this.pushStack(m.unique(m.merge(this.get(), m(a, b))));
	    }, addBack: function addBack(a) {
	      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
	    } });function D(a, b) {
	    do {
	      a = a[b];
	    } while (a && 1 !== a.nodeType);return a;
	  }m.each({ parent: function parent(a) {
	      var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;
	    }, parents: function parents(a) {
	      return m.dir(a, "parentNode");
	    }, parentsUntil: function parentsUntil(a, b, c) {
	      return m.dir(a, "parentNode", c);
	    }, next: function next(a) {
	      return D(a, "nextSibling");
	    }, prev: function prev(a) {
	      return D(a, "previousSibling");
	    }, nextAll: function nextAll(a) {
	      return m.dir(a, "nextSibling");
	    }, prevAll: function prevAll(a) {
	      return m.dir(a, "previousSibling");
	    }, nextUntil: function nextUntil(a, b, c) {
	      return m.dir(a, "nextSibling", c);
	    }, prevUntil: function prevUntil(a, b, c) {
	      return m.dir(a, "previousSibling", c);
	    }, siblings: function siblings(a) {
	      return m.sibling((a.parentNode || {}).firstChild, a);
	    }, children: function children(a) {
	      return m.sibling(a.firstChild);
	    }, contents: function contents(a) {
	      return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes);
	    } }, function (a, b) {
	    m.fn[a] = function (c, d) {
	      var e = m.map(this, b, c);return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e);
	    };
	  });var E = /\S+/g,
	      F = {};function G(a) {
	    var b = F[a] = {};return m.each(a.match(E) || [], function (a, c) {
	      b[c] = !0;
	    }), b;
	  }m.Callbacks = function (a) {
	    a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);var b,
	        c,
	        d,
	        e,
	        f,
	        g,
	        h = [],
	        i = !a.once && [],
	        j = function j(l) {
	      for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++) {
	        if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
	          c = !1;break;
	        }
	      }b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable());
	    },
	        k = { add: function add() {
	        if (h) {
	          var d = h.length;!function f(b) {
	            m.each(b, function (b, c) {
	              var d = m.type(c);"function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c);
	            });
	          }(arguments), b ? e = h.length : c && (g = d, j(c));
	        }return this;
	      }, remove: function remove() {
	        return h && m.each(arguments, function (a, c) {
	          var d;while ((d = m.inArray(c, h, d)) > -1) {
	            h.splice(d, 1), b && (e >= d && e--, f >= d && f--);
	          }
	        }), this;
	      }, has: function has(a) {
	        return a ? m.inArray(a, h) > -1 : !(!h || !h.length);
	      }, empty: function empty() {
	        return h = [], e = 0, this;
	      }, disable: function disable() {
	        return h = i = c = void 0, this;
	      }, disabled: function disabled() {
	        return !h;
	      }, lock: function lock() {
	        return i = void 0, c || k.disable(), this;
	      }, locked: function locked() {
	        return !i;
	      }, fireWith: function fireWith(a, c) {
	        return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this;
	      }, fire: function fire() {
	        return k.fireWith(this, arguments), this;
	      }, fired: function fired() {
	        return !!d;
	      } };return k;
	  }, m.extend({ Deferred: function Deferred(a) {
	      var b = [["resolve", "done", m.Callbacks("once memory"), "resolved"], ["reject", "fail", m.Callbacks("once memory"), "rejected"], ["notify", "progress", m.Callbacks("memory")]],
	          c = "pending",
	          d = { state: function state() {
	          return c;
	        }, always: function always() {
	          return e.done(arguments).fail(arguments), this;
	        }, then: function then() {
	          var a = arguments;return m.Deferred(function (c) {
	            m.each(b, function (b, f) {
	              var g = m.isFunction(a[b]) && a[b];e[f[1]](function () {
	                var a = g && g.apply(this, arguments);a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments);
	              });
	            }), a = null;
	          }).promise();
	        }, promise: function promise(a) {
	          return null != a ? m.extend(a, d) : d;
	        } },
	          e = {};return d.pipe = d.then, m.each(b, function (a, f) {
	        var g = f[2],
	            h = f[3];d[f[1]] = g.add, h && g.add(function () {
	          c = h;
	        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
	          return e[f[0] + "With"](this === e ? d : this, arguments), this;
	        }, e[f[0] + "With"] = g.fireWith;
	      }), d.promise(e), a && a.call(e, e), e;
	    }, when: function when(a) {
	      var b = 0,
	          c = d.call(arguments),
	          e = c.length,
	          f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
	          g = 1 === f ? a : m.Deferred(),
	          h = function h(a, b, c) {
	        return function (e) {
	          b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
	        };
	      },
	          i,
	          j,
	          k;if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) {
	        c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
	      }return f || g.resolveWith(k, c), g.promise();
	    } });var H;m.fn.ready = function (a) {
	    return m.ready.promise().done(a), this;
	  }, m.extend({ isReady: !1, readyWait: 1, holdReady: function holdReady(a) {
	      a ? m.readyWait++ : m.ready(!0);
	    }, ready: function ready(a) {
	      if (a === !0 ? ! --m.readyWait : !m.isReady) {
	        if (!y.body) return setTimeout(m.ready);m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")));
	      }
	    } });function I() {
	    y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J));
	  }function J() {
	    (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready());
	  }m.ready.promise = function (b) {
	    if (!H) if (H = m.Deferred(), "complete" === y.readyState) setTimeout(m.ready);else if (y.addEventListener) y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1);else {
	      y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);var c = !1;try {
	        c = null == a.frameElement && y.documentElement;
	      } catch (d) {}c && c.doScroll && !function e() {
	        if (!m.isReady) {
	          try {
	            c.doScroll("left");
	          } catch (a) {
	            return setTimeout(e, 50);
	          }I(), m.ready();
	        }
	      }();
	    }return H.promise(b);
	  };var K = "undefined",
	      L;for (L in m(k)) {
	    break;
	  }k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function () {
	    var a, b, c, d;c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), _typeof(b.style.zoom) !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d));
	  }), function () {
	    var a = y.createElement("div");if (null == k.deleteExpando) {
	      k.deleteExpando = !0;try {
	        delete a.test;
	      } catch (b) {
	        k.deleteExpando = !1;
	      }
	    }a = null;
	  }(), m.acceptData = function (a) {
	    var b = m.noData[(a.nodeName + " ").toLowerCase()],
	        c = +a.nodeType || 1;return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b;
	  };var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	      N = /([A-Z])/g;function O(a, b, c) {
	    if (void 0 === c && 1 === a.nodeType) {
	      var d = "data-" + b.replace(N, "-$1").toLowerCase();if (c = a.getAttribute(d), "string" == typeof c) {
	        try {
	          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c;
	        } catch (e) {}m.data(a, b, c);
	      } else c = void 0;
	    }return c;
	  }function P(a) {
	    var b;for (b in a) {
	      if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
	    }return !0;
	  }function Q(a, b, d, e) {
	    if (m.acceptData(a)) {
	      var f,
	          g,
	          h = m.expando,
	          i = a.nodeType,
	          j = i ? m.cache : a,
	          k = i ? a[h] : a[h] && h;if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : { toJSON: m.noop }), ("object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f;
	    }
	  }function R(a, b, c) {
	    if (m.acceptData(a)) {
	      var d,
	          e,
	          f = a.nodeType,
	          g = f ? m.cache : a,
	          h = f ? a[m.expando] : m.expando;if (g[h]) {
	        if (b && (d = c ? g[h] : g[h].data)) {
	          m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;while (e--) {
	            delete d[b[e]];
	          }if (c ? !P(d) : !m.isEmptyObject(d)) return;
	        }(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null);
	      }
	    }
	  }m.extend({ cache: {}, noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function hasData(a) {
	      return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a);
	    }, data: function data(a, b, c) {
	      return Q(a, b, c);
	    }, removeData: function removeData(a, b) {
	      return R(a, b);
	    }, _data: function _data(a, b, c) {
	      return Q(a, b, c, !0);
	    }, _removeData: function _removeData(a, b) {
	      return R(a, b, !0);
	    } }), m.fn.extend({ data: function data(a, b) {
	      var c,
	          d,
	          e,
	          f = this[0],
	          g = f && f.attributes;if (void 0 === a) {
	        if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
	          c = g.length;while (c--) {
	            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
	          }m._data(f, "parsedAttrs", !0);
	        }return e;
	      }return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? this.each(function () {
	        m.data(this, a);
	      }) : arguments.length > 1 ? this.each(function () {
	        m.data(this, a, b);
	      }) : f ? O(f, a, m.data(f, a)) : void 0;
	    }, removeData: function removeData(a) {
	      return this.each(function () {
	        m.removeData(this, a);
	      });
	    } }), m.extend({ queue: function queue(a, b, c) {
	      var d;return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0;
	    }, dequeue: function dequeue(a, b) {
	      b = b || "fx";var c = m.queue(a, b),
	          d = c.length,
	          e = c.shift(),
	          f = m._queueHooks(a, b),
	          g = function g() {
	        m.dequeue(a, b);
	      };"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
	    }, _queueHooks: function _queueHooks(a, b) {
	      var c = b + "queueHooks";return m._data(a, c) || m._data(a, c, { empty: m.Callbacks("once memory").add(function () {
	          m._removeData(a, b + "queue"), m._removeData(a, c);
	        }) });
	    } }), m.fn.extend({ queue: function queue(a, b) {
	      var c = 2;return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function () {
	        var c = m.queue(this, a, b);m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a);
	      });
	    }, dequeue: function dequeue(a) {
	      return this.each(function () {
	        m.dequeue(this, a);
	      });
	    }, clearQueue: function clearQueue(a) {
	      return this.queue(a || "fx", []);
	    }, promise: function promise(a, b) {
	      var c,
	          d = 1,
	          e = m.Deferred(),
	          f = this,
	          g = this.length,
	          h = function h() {
	        --d || e.resolveWith(f, [f]);
	      };"string" != typeof a && (b = a, a = void 0), a = a || "fx";while (g--) {
	        c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
	      }return h(), e.promise(b);
	    } });var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	      T = ["Top", "Right", "Bottom", "Left"],
	      U = function U(a, b) {
	    return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a);
	  },
	      V = m.access = function (a, b, c, d, e, f, g) {
	    var h = 0,
	        i = a.length,
	        j = null == c;if ("object" === m.type(c)) {
	      e = !0;for (h in c) {
	        m.access(a, b, h, c[h], !0, f, g);
	      }
	    } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function b(a, _b2, c) {
	      return j.call(m(a), c);
	    })), b)) for (; i > h; h++) {
	      b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
	    }return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
	  },
	      W = /^(?:checkbox|radio)$/i;!function () {
	    var a = y.createElement("input"),
	        b = y.createElement("div"),
	        c = y.createDocumentFragment();if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () {
	      k.noCloneEvent = !1;
	    }), b.cloneNode(!0).click()), null == k.deleteExpando) {
	      k.deleteExpando = !0;try {
	        delete b.test;
	      } catch (d) {
	        k.deleteExpando = !1;
	      }
	    }
	  }(), function () {
	    var b,
	        c,
	        d = y.createElement("div");for (b in { submit: !0, change: !0, focusin: !0 }) {
	      c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
	    }d = null;
	  }();var X = /^(?:input|select|textarea)$/i,
	      Y = /^key/,
	      Z = /^(?:mouse|pointer|contextmenu)|click/,
	      $ = /^(?:focusinfocus|focusoutblur)$/,
	      _ = /^([^.]*)(?:\.(.+)|)$/;function aa() {
	    return !0;
	  }function ba() {
	    return !1;
	  }function ca() {
	    try {
	      return y.activeElement;
	    } catch (a) {}
	  }m.event = { global: {}, add: function add(a, b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          j,
	          k,
	          l,
	          n,
	          o,
	          p,
	          q,
	          r = m._data(a);if (r) {
	        c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
	          return (typeof m === "undefined" ? "undefined" : _typeof(m)) === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments);
	        }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;while (h--) {
	          f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({ type: o, origType: q, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && m.expr.match.needsContext.test(e), namespace: p.join(".") }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
	        }a = null;
	      }
	    }, remove: function remove(a, b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          j,
	          k,
	          l,
	          n,
	          o,
	          p,
	          q,
	          r = m.hasData(a) && m._data(a);if (r && (k = r.events)) {
	        b = (b || "").match(E) || [""], j = b.length;while (j--) {
	          if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
	            l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;while (f--) {
	              g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
	            }i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o]);
	          } else for (o in k) {
	            m.event.remove(a, o + b[j], c, d, !0);
	          }
	        }m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"));
	      }
	    }, trigger: function trigger(b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          k,
	          l,
	          n,
	          o = [d || y],
	          p = j.call(b, "type") ? b.type : b,
	          q = j.call(b, "namespace") ? b.namespace.split(".") : [];if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
	        if (!e && !k.noBubble && !m.isWindow(d)) {
	          for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode) {
	            o.push(h), l = h;
	          }l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a);
	        }n = 0;while ((h = o[n++]) && !b.isPropagationStopped()) {
	          b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
	        }if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
	          l = d[g], l && (d[g] = null), m.event.triggered = p;try {
	            d[p]();
	          } catch (r) {}m.event.triggered = void 0, l && (d[g] = l);
	        }return b.result;
	      }
	    }, dispatch: function dispatch(a) {
	      a = m.event.fix(a);var b,
	          c,
	          e,
	          f,
	          g,
	          h = [],
	          i = d.call(arguments),
	          j = (m._data(this, "events") || {})[a.type] || [],
	          k = m.event.special[a.type] || {};if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
	        h = m.event.handlers.call(this, a, j), b = 0;while ((f = h[b++]) && !a.isPropagationStopped()) {
	          a.currentTarget = f.elem, g = 0;while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped()) {
	            (!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
	          }
	        }return k.postDispatch && k.postDispatch.call(this, a), a.result;
	      }
	    }, handlers: function handlers(a, b) {
	      var c,
	          d,
	          e,
	          f,
	          g = [],
	          h = b.delegateCount,
	          i = a.target;if (h && i.nodeType && (!a.button || "click" !== a.type)) for (; i != this; i = i.parentNode || this) {
	        if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
	          for (e = [], f = 0; h > f; f++) {
	            d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
	          }e.length && g.push({ elem: i, handlers: e });
	        }
	      }return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
	    }, fix: function fix(a) {
	      if (a[m.expando]) return a;var b,
	          c,
	          d,
	          e = a.type,
	          f = a,
	          g = this.fixHooks[e];g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;while (b--) {
	        c = d[b], a[c] = f[c];
	      }return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a;
	    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(a, b) {
	        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
	      } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(a, b) {
	        var c,
	            d,
	            e,
	            f = b.button,
	            g = b.fromElement;return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a;
	      } }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
	          if (this !== ca() && this.focus) try {
	            return this.focus(), !1;
	          } catch (a) {}
	        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
	          return this === ca() && this.blur ? (this.blur(), !1) : void 0;
	        }, delegateType: "focusout" }, click: { trigger: function trigger() {
	          return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0;
	        }, _default: function _default(a) {
	          return m.nodeName(a.target, "a");
	        } }, beforeunload: { postDispatch: function postDispatch(a) {
	          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
	        } } }, simulate: function simulate(a, b, c, d) {
	      var e = m.extend(new m.Event(), c, { type: a, isSimulated: !0, originalEvent: {} });d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
	    } }, m.removeEvent = y.removeEventListener ? function (a, b, c) {
	    a.removeEventListener && a.removeEventListener(b, c, !1);
	  } : function (a, b, c) {
	    var d = "on" + b;a.detachEvent && (_typeof(a[d]) === K && (a[d] = null), a.detachEvent(d, c));
	  }, m.Event = function (a, b) {
	    return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? aa : ba) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void (this[m.expando] = !0)) : new m.Event(a, b);
	  }, m.Event.prototype = { isDefaultPrevented: ba, isPropagationStopped: ba, isImmediatePropagationStopped: ba, preventDefault: function preventDefault() {
	      var a = this.originalEvent;this.isDefaultPrevented = aa, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
	    }, stopPropagation: function stopPropagation() {
	      var a = this.originalEvent;this.isPropagationStopped = aa, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
	    }, stopImmediatePropagation: function stopImmediatePropagation() {
	      var a = this.originalEvent;this.isImmediatePropagationStopped = aa, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();
	    } }, m.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
	    m.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {
	        var c,
	            d = this,
	            e = a.relatedTarget,
	            f = a.handleObj;return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
	      } };
	  }), k.submitBubbles || (m.event.special.submit = { setup: function setup() {
	      return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function (a) {
	        var b = a.target,
	            c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function (a) {
	          a._submit_bubble = !0;
	        }), m._data(c, "submitBubbles", !0));
	      });
	    }, postDispatch: function postDispatch(a) {
	      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0));
	    }, teardown: function teardown() {
	      return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit");
	    } }), k.changeBubbles || (m.event.special.change = { setup: function setup() {
	      return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function (a) {
	        "checked" === a.originalEvent.propertyName && (this._just_changed = !0);
	      }), m.event.add(this, "click._change", function (a) {
	        this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0);
	      })), !1) : void m.event.add(this, "beforeactivate._change", function (a) {
	        var b = a.target;X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function (a) {
	          !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0);
	        }), m._data(b, "changeBubbles", !0));
	      });
	    }, handle: function handle(a) {
	      var b = a.target;return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0;
	    }, teardown: function teardown() {
	      return m.event.remove(this, "._change"), !X.test(this.nodeName);
	    } }), k.focusinBubbles || m.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
	    var c = function c(a) {
	      m.event.simulate(b, a.target, m.event.fix(a), !0);
	    };m.event.special[b] = { setup: function setup() {
	        var d = this.ownerDocument || this,
	            e = m._data(d, b);e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1);
	      }, teardown: function teardown() {
	        var d = this.ownerDocument || this,
	            e = m._data(d, b) - 1;e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b));
	      } };
	  }), m.fn.extend({ on: function on(a, b, c, d, e) {
	      var f, g;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
	        "string" != typeof b && (c = c || b, b = void 0);for (f in a) {
	          this.on(f, b, c, a[f], e);
	        }return this;
	      }if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = ba;else if (!d) return this;return 1 === e && (g = d, d = function d(a) {
	        return m().off(a), g.apply(this, arguments);
	      }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function () {
	        m.event.add(this, a, d, c, b);
	      });
	    }, one: function one(a, b, c, d) {
	      return this.on(a, b, c, d, 1);
	    }, off: function off(a, b, c) {
	      var d, e;if (a && a.preventDefault && a.handleObj) return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
	        for (e in a) {
	          this.off(e, b, a[e]);
	        }return this;
	      }return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = ba), this.each(function () {
	        m.event.remove(this, a, c, b);
	      });
	    }, trigger: function trigger(a, b) {
	      return this.each(function () {
	        m.event.trigger(a, b, this);
	      });
	    }, triggerHandler: function triggerHandler(a, b) {
	      var c = this[0];return c ? m.event.trigger(a, b, c, !0) : void 0;
	    } });function da(a) {
	    var b = ea.split("|"),
	        c = a.createDocumentFragment();if (c.createElement) while (b.length) {
	      c.createElement(b.pop());
	    }return c;
	  }var ea = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	      fa = / jQuery\d+="(?:null|\d+)"/g,
	      ga = new RegExp("<(?:" + ea + ")[\\s/>]", "i"),
	      ha = /^\s+/,
	      ia = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	      ja = /<([\w:]+)/,
	      ka = /<tbody/i,
	      la = /<|&#?\w+;/,
	      ma = /<(?:script|style|link)/i,
	      na = /checked\s*(?:[^=]|=\s*.checked.)/i,
	      oa = /^$|\/(?:java|ecma)script/i,
	      pa = /^true\/(.*)/,
	      qa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	      ra = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] },
	      sa = da(y),
	      ta = sa.appendChild(y.createElement("div"));ra.optgroup = ra.option, ra.tbody = ra.tfoot = ra.colgroup = ra.caption = ra.thead, ra.th = ra.td;function ua(a, b) {
	    var c,
	        d,
	        e = 0,
	        f = _typeof(a.getElementsByTagName) !== K ? a.getElementsByTagName(b || "*") : _typeof(a.querySelectorAll) !== K ? a.querySelectorAll(b || "*") : void 0;if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) {
	      !b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ua(d, b));
	    }return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f;
	  }function va(a) {
	    W.test(a.type) && (a.defaultChecked = a.checked);
	  }function wa(a, b) {
	    return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
	  }function xa(a) {
	    return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a;
	  }function ya(a) {
	    var b = pa.exec(a.type);return b ? a.type = b[1] : a.removeAttribute("type"), a;
	  }function za(a, b) {
	    for (var c, d = 0; null != (c = a[d]); d++) {
	      m._data(c, "globalEval", !b || m._data(b[d], "globalEval"));
	    }
	  }function Aa(a, b) {
	    if (1 === b.nodeType && m.hasData(a)) {
	      var c,
	          d,
	          e,
	          f = m._data(a),
	          g = m._data(b, f),
	          h = f.events;if (h) {
	        delete g.handle, g.events = {};for (c in h) {
	          for (d = 0, e = h[c].length; e > d; d++) {
	            m.event.add(b, c, h[c][d]);
	          }
	        }
	      }g.data && (g.data = m.extend({}, g.data));
	    }
	  }function Ba(a, b) {
	    var c, d, e;if (1 === b.nodeType) {
	      if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
	        e = m._data(b);for (d in e.events) {
	          m.removeEvent(b, d, e.handle);
	        }b.removeAttribute(m.expando);
	      }"script" === c && b.text !== a.text ? (xa(b).text = a.text, ya(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
	    }
	  }m.extend({ clone: function clone(a, b, c) {
	      var d,
	          e,
	          f,
	          g,
	          h,
	          i = m.contains(a.ownerDocument, a);if (k.html5Clone || m.isXMLDoc(a) || !ga.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ta.innerHTML = a.outerHTML, ta.removeChild(f = ta.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a))) for (d = ua(f), h = ua(a), g = 0; null != (e = h[g]); ++g) {
	        d[g] && Ba(e, d[g]);
	      }if (b) if (c) for (h = h || ua(a), d = d || ua(f), g = 0; null != (e = h[g]); g++) {
	        Aa(e, d[g]);
	      } else Aa(a, f);return d = ua(f, "script"), d.length > 0 && za(d, !i && ua(a, "script")), d = h = e = null, f;
	    }, buildFragment: function buildFragment(a, b, c, d) {
	      for (var e, f, g, h, i, j, l, n = a.length, o = da(b), p = [], q = 0; n > q; q++) {
	        if (f = a[q], f || 0 === f) if ("object" === m.type(f)) m.merge(p, f.nodeType ? [f] : f);else if (la.test(f)) {
	          h = h || o.appendChild(b.createElement("div")), i = (ja.exec(f) || ["", ""])[1].toLowerCase(), l = ra[i] || ra._default, h.innerHTML = l[1] + f.replace(ia, "<$1></$2>") + l[2], e = l[0];while (e--) {
	            h = h.lastChild;
	          }if (!k.leadingWhitespace && ha.test(f) && p.push(b.createTextNode(ha.exec(f)[0])), !k.tbody) {
	            f = "table" !== i || ka.test(f) ? "<table>" !== l[1] || ka.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;while (e--) {
	              m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
	            }
	          }m.merge(p, h.childNodes), h.textContent = "";while (h.firstChild) {
	            h.removeChild(h.firstChild);
	          }h = o.lastChild;
	        } else p.push(b.createTextNode(f));
	      }h && o.removeChild(h), k.appendChecked || m.grep(ua(p, "input"), va), q = 0;while (f = p[q++]) {
	        if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ua(o.appendChild(f), "script"), g && za(h), c)) {
	          e = 0;while (f = h[e++]) {
	            oa.test(f.type || "") && c.push(f);
	          }
	        }
	      }return h = null, o;
	    }, cleanData: function cleanData(a, b) {
	      for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++) {
	        if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
	          if (g.events) for (e in g.events) {
	            n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
	          }j[f] && (delete j[f], l ? delete d[i] : _typeof(d.removeAttribute) !== K ? d.removeAttribute(i) : d[i] = null, c.push(f));
	        }
	      }
	    } }), m.fn.extend({ text: function text(a) {
	      return V(this, function (a) {
	        return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a));
	      }, null, a, arguments.length);
	    }, append: function append() {
	      return this.domManip(arguments, function (a) {
	        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
	          var b = wa(this, a);b.appendChild(a);
	        }
	      });
	    }, prepend: function prepend() {
	      return this.domManip(arguments, function (a) {
	        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
	          var b = wa(this, a);b.insertBefore(a, b.firstChild);
	        }
	      });
	    }, before: function before() {
	      return this.domManip(arguments, function (a) {
	        this.parentNode && this.parentNode.insertBefore(a, this);
	      });
	    }, after: function after() {
	      return this.domManip(arguments, function (a) {
	        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
	      });
	    }, remove: function remove(a, b) {
	      for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++) {
	        b || 1 !== c.nodeType || m.cleanData(ua(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && za(ua(c, "script")), c.parentNode.removeChild(c));
	      }return this;
	    }, empty: function empty() {
	      for (var a, b = 0; null != (a = this[b]); b++) {
	        1 === a.nodeType && m.cleanData(ua(a, !1));while (a.firstChild) {
	          a.removeChild(a.firstChild);
	        }a.options && m.nodeName(a, "select") && (a.options.length = 0);
	      }return this;
	    }, clone: function clone(a, b) {
	      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
	        return m.clone(this, a, b);
	      });
	    }, html: function html(a) {
	      return V(this, function (a) {
	        var b = this[0] || {},
	            c = 0,
	            d = this.length;if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fa, "") : void 0;if (!("string" != typeof a || ma.test(a) || !k.htmlSerialize && ga.test(a) || !k.leadingWhitespace && ha.test(a) || ra[(ja.exec(a) || ["", ""])[1].toLowerCase()])) {
	          a = a.replace(ia, "<$1></$2>");try {
	            for (; d > c; c++) {
	              b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ua(b, !1)), b.innerHTML = a);
	            }b = 0;
	          } catch (e) {}
	        }b && this.empty().append(a);
	      }, null, a, arguments.length);
	    }, replaceWith: function replaceWith() {
	      var a = arguments[0];return this.domManip(arguments, function (b) {
	        a = this.parentNode, m.cleanData(ua(this)), a && a.replaceChild(b, this);
	      }), a && (a.length || a.nodeType) ? this : this.remove();
	    }, detach: function detach(a) {
	      return this.remove(a, !0);
	    }, domManip: function domManip(a, b) {
	      a = e.apply([], a);var c,
	          d,
	          f,
	          g,
	          h,
	          i,
	          j = 0,
	          l = this.length,
	          n = this,
	          o = l - 1,
	          p = a[0],
	          q = m.isFunction(p);if (q || l > 1 && "string" == typeof p && !k.checkClone && na.test(p)) return this.each(function (c) {
	        var d = n.eq(c);q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);
	      });if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
	        for (g = m.map(ua(i, "script"), xa), f = g.length; l > j; j++) {
	          d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ua(d, "script"))), b.call(this[j], d, j);
	        }if (f) for (h = g[g.length - 1].ownerDocument, m.map(g, ya), j = 0; f > j; j++) {
	          d = g[j], oa.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qa, "")));
	        }i = c = null;
	      }return this;
	    } }), m.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
	    m.fn[a] = function (a) {
	      for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++) {
	        c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get());
	      }return this.pushStack(e);
	    };
	  });var Ca,
	      Da = {};function Ea(b, c) {
	    var d,
	        e = m(c.createElement(b)).appendTo(c.body),
	        f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");return e.detach(), f;
	  }function Fa(a) {
	    var b = y,
	        c = Da[a];return c || (c = Ea(a, b), "none" !== c && c || (Ca = (Ca || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Ca[0].contentWindow || Ca[0].contentDocument).document, b.write(), b.close(), c = Ea(a, b), Ca.detach()), Da[a] = c), c;
	  }!function () {
	    var a;k.shrinkWrapBlocks = function () {
	      if (null != a) return a;a = !1;var b, c, d;return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), _typeof(b.style.zoom) !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0;
	    };
	  }();var Ga = /^margin/,
	      Ha = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
	      Ia,
	      Ja,
	      Ka = /^(top|right|bottom|left)$/;a.getComputedStyle ? (Ia = function Ia(b) {
	    return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null);
	  }, Ja = function Ja(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h = a.style;return c = c || Ia(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Ha.test(g) && Ga.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + "";
	  }) : y.documentElement.currentStyle && (Ia = function Ia(a) {
	    return a.currentStyle;
	  }, Ja = function Ja(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h = a.style;return c = c || Ia(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Ha.test(g) && !Ka.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto";
	  });function La(a, b) {
	    return { get: function get() {
	        var c = a();if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments);
	      } };
	  }!function () {
	    var b, c, d, e, f, g, h;if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
	      (function () {
	        var i = function i() {
	          var b, c, d, i;c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || { width: "4px" }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight), b.removeChild(i)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d));
	        };
	
	        c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !!c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, { reliableHiddenOffsets: function reliableHiddenOffsets() {
	            return null == g && i(), g;
	          }, boxSizingReliable: function boxSizingReliable() {
	            return null == f && i(), f;
	          }, pixelPosition: function pixelPosition() {
	            return null == e && i(), e;
	          }, reliableMarginRight: function reliableMarginRight() {
	            return null == h && i(), h;
	          } });
	      })();
	    }
	  }(), m.swap = function (a, b, c, d) {
	    var e,
	        f,
	        g = {};for (f in b) {
	      g[f] = a.style[f], a.style[f] = b[f];
	    }e = c.apply(a, d || []);for (f in b) {
	      a.style[f] = g[f];
	    }return e;
	  };var Ma = /alpha\([^)]*\)/i,
	      Na = /opacity\s*=\s*([^)]*)/,
	      Oa = /^(none|table(?!-c[ea]).+)/,
	      Pa = new RegExp("^(" + S + ")(.*)$", "i"),
	      Qa = new RegExp("^([+-])=(" + S + ")", "i"),
	      Ra = { position: "absolute", visibility: "hidden", display: "block" },
	      Sa = { letterSpacing: "0", fontWeight: "400" },
	      Ta = ["Webkit", "O", "Moz", "ms"];function Ua(a, b) {
	    if (b in a) return b;var c = b.charAt(0).toUpperCase() + b.slice(1),
	        d = b,
	        e = Ta.length;while (e--) {
	      if (b = Ta[e] + c, b in a) return b;
	    }return d;
	  }function Va(a, b) {
	    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) {
	      d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fa(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
	    }for (g = 0; h > g; g++) {
	      d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
	    }return a;
	  }function Wa(a, b, c) {
	    var d = Pa.exec(b);return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
	  }function Xa(a, b, c, d, e) {
	    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) {
	      "margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
	    }return g;
	  }function Ya(a, b, c) {
	    var d = !0,
	        e = "width" === b ? a.offsetWidth : a.offsetHeight,
	        f = Ia(a),
	        g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);if (0 >= e || null == e) {
	      if (e = Ja(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ha.test(e)) return e;d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
	    }return e + Xa(a, b, c || (g ? "border" : "content"), d, f) + "px";
	  }m.extend({ cssHooks: { opacity: { get: function get(a, b) {
	          if (b) {
	            var c = Ja(a, "opacity");return "" === c ? "1" : c;
	          }
	        } } }, cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": k.cssFloat ? "cssFloat" : "styleFloat" }, style: function style(a, b, c, d) {
	      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
	        var e,
	            f,
	            g,
	            h = m.camelCase(b),
	            i = a.style;if (b = m.cssProps[h] || (m.cssProps[h] = Ua(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];if (f = typeof c === "undefined" ? "undefined" : _typeof(c), "string" === f && (e = Qa.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
	          i[b] = c;
	        } catch (j) {}
	      }
	    }, css: function css(a, b, c, d) {
	      var e,
	          f,
	          g,
	          h = m.camelCase(b);return b = m.cssProps[h] || (m.cssProps[h] = Ua(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Ja(a, b, d)), "normal" === f && b in Sa && (f = Sa[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f;
	    } }), m.each(["height", "width"], function (a, b) {
	    m.cssHooks[b] = { get: function get(a, c, d) {
	        return c ? Oa.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Ra, function () {
	          return Ya(a, b, d);
	        }) : Ya(a, b, d) : void 0;
	      }, set: function set(a, c, d) {
	        var e = d && Ia(a);return Wa(a, c, d ? Xa(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0);
	      } };
	  }), k.opacity || (m.cssHooks.opacity = { get: function get(a, b) {
	      return Na.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
	    }, set: function set(a, b) {
	      var c = a.style,
	          d = a.currentStyle,
	          e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
	          f = d && d.filter || c.filter || "";c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Ma, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Ma.test(f) ? f.replace(Ma, e) : f + " " + e);
	    } }), m.cssHooks.marginRight = La(k.reliableMarginRight, function (a, b) {
	    return b ? m.swap(a, { display: "inline-block" }, Ja, [a, "marginRight"]) : void 0;
	  }), m.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
	    m.cssHooks[a + b] = { expand: function expand(c) {
	        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) {
	          e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
	        }return e;
	      } }, Ga.test(a) || (m.cssHooks[a + b].set = Wa);
	  }), m.fn.extend({ css: function css(a, b) {
	      return V(this, function (a, b, c) {
	        var d,
	            e,
	            f = {},
	            g = 0;if (m.isArray(b)) {
	          for (d = Ia(a), e = b.length; e > g; g++) {
	            f[b[g]] = m.css(a, b[g], !1, d);
	          }return f;
	        }return void 0 !== c ? m.style(a, b, c) : m.css(a, b);
	      }, a, b, arguments.length > 1);
	    }, show: function show() {
	      return Va(this, !0);
	    }, hide: function hide() {
	      return Va(this);
	    }, toggle: function toggle(a) {
	      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
	        U(this) ? m(this).show() : m(this).hide();
	      });
	    } });function Za(a, b, c, d, e) {
	    return new Za.prototype.init(a, b, c, d, e);
	  }m.Tween = Za, Za.prototype = { constructor: Za, init: function init(a, b, c, d, e, f) {
	      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px");
	    }, cur: function cur() {
	      var a = Za.propHooks[this.prop];return a && a.get ? a.get(this) : Za.propHooks._default.get(this);
	    }, run: function run(a) {
	      var b,
	          c = Za.propHooks[this.prop];return this.options.duration ? this.pos = b = m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Za.propHooks._default.set(this), this;
	    } }, Za.prototype.init.prototype = Za.prototype, Za.propHooks = { _default: { get: function get(a) {
	        var b;return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop];
	      }, set: function set(a) {
	        m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
	      } } }, Za.propHooks.scrollTop = Za.propHooks.scrollLeft = { set: function set(a) {
	      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
	    } }, m.easing = { linear: function linear(a) {
	      return a;
	    }, swing: function swing(a) {
	      return .5 - Math.cos(a * Math.PI) / 2;
	    } }, m.fx = Za.prototype.init, m.fx.step = {};var $a,
	      _a,
	      ab = /^(?:toggle|show|hide)$/,
	      bb = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
	      cb = /queueHooks$/,
	      db = [ib],
	      eb = { "*": [function (a, b) {
	      var c = this.createTween(a, b),
	          d = c.cur(),
	          e = bb.exec(b),
	          f = e && e[3] || (m.cssNumber[a] ? "" : "px"),
	          g = (m.cssNumber[a] || "px" !== f && +d) && bb.exec(m.css(c.elem, a)),
	          h = 1,
	          i = 20;if (g && g[3] !== f) {
	        f = f || g[3], e = e || [], g = +d || 1;do {
	          h = h || ".5", g /= h, m.style(c.elem, a, g + f);
	        } while (h !== (h = c.cur() / d) && 1 !== h && --i);
	      }return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c;
	    }] };function fb() {
	    return setTimeout(function () {
	      $a = void 0;
	    }), $a = m.now();
	  }function gb(a, b) {
	    var c,
	        d = { height: a },
	        e = 0;for (b = b ? 1 : 0; 4 > e; e += 2 - b) {
	      c = T[e], d["margin" + c] = d["padding" + c] = a;
	    }return b && (d.opacity = d.width = a), d;
	  }function hb(a, b, c) {
	    for (var d, e = (eb[b] || []).concat(eb["*"]), f = 0, g = e.length; g > f; f++) {
	      if (d = e[f].call(c, b, a)) return d;
	    }
	  }function ib(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h,
	        i,
	        j,
	        l,
	        n = this,
	        o = {},
	        p = a.style,
	        q = a.nodeType && U(a),
	        r = m._data(a, "fxshow");c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
	      h.unqueued || i();
	    }), h.unqueued++, n.always(function () {
	      n.always(function () {
	        h.unqueued--, m.queue(a, "fx").length || h.empty.fire();
	      });
	    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fa(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fa(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function () {
	      p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2];
	    }));for (d in b) {
	      if (e = b[d], ab.exec(e)) {
	        if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
	          if ("show" !== e || !r || void 0 === r[d]) continue;q = !0;
	        }o[d] = r && r[d] || m.style(a, d);
	      } else j = void 0;
	    }if (m.isEmptyObject(o)) "inline" === ("none" === j ? Fa(a.nodeName) : j) && (p.display = j);else {
	      r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function () {
	        m(a).hide();
	      }), n.done(function () {
	        var b;m._removeData(a, "fxshow");for (b in o) {
	          m.style(a, b, o[b]);
	        }
	      });for (d in o) {
	        g = hb(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0));
	      }
	    }
	  }function jb(a, b) {
	    var c, d, e, f, g;for (c in a) {
	      if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
	        f = g.expand(f), delete a[d];for (c in f) {
	          c in a || (a[c] = f[c], b[c] = e);
	        }
	      } else b[d] = e;
	    }
	  }function kb(a, b, c) {
	    var d,
	        e,
	        f = 0,
	        g = db.length,
	        h = m.Deferred().always(function () {
	      delete i.elem;
	    }),
	        i = function i() {
	      if (e) return !1;for (var b = $a || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) {
	        j.tweens[g].run(f);
	      }return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
	    },
	        j = h.promise({ elem: a, props: m.extend({}, b), opts: m.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: $a || fb(), duration: c.duration, tweens: [], createTween: function createTween(b, c) {
	        var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return j.tweens.push(d), d;
	      }, stop: function stop(b) {
	        var c = 0,
	            d = b ? j.tweens.length : 0;if (e) return this;for (e = !0; d > c; c++) {
	          j.tweens[c].run(1);
	        }return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
	      } }),
	        k = j.props;for (jb(k, j.opts.specialEasing); g > f; f++) {
	      if (d = db[f].call(j, a, k, j.opts)) return d;
	    }return m.map(k, hb, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
	  }m.Animation = m.extend(kb, { tweener: function tweener(a, b) {
	      m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");for (var c, d = 0, e = a.length; e > d; d++) {
	        c = a[d], eb[c] = eb[c] || [], eb[c].unshift(b);
	      }
	    }, prefilter: function prefilter(a, b) {
	      b ? db.unshift(a) : db.push(a);
	    } }), m.speed = function (a, b, c) {
	    var d = a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? m.extend({}, a) : { complete: c || !c && b || m.isFunction(a) && a, duration: a, easing: c && b || b && !m.isFunction(b) && b };return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
	      m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue);
	    }, d;
	  }, m.fn.extend({ fadeTo: function fadeTo(a, b, c, d) {
	      return this.filter(U).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
	    }, animate: function animate(a, b, c, d) {
	      var e = m.isEmptyObject(a),
	          f = m.speed(b, c, d),
	          g = function g() {
	        var b = kb(this, m.extend({}, a), f);(e || m._data(this, "finish")) && b.stop(!0);
	      };return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
	    }, stop: function stop(a, b, c) {
	      var d = function d(a) {
	        var b = a.stop;delete a.stop, b(c);
	      };return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
	        var b = !0,
	            e = null != a && a + "queueHooks",
	            f = m.timers,
	            g = m._data(this);if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) {
	          g[e] && g[e].stop && cb.test(e) && d(g[e]);
	        }for (e = f.length; e--;) {
	          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
	        }(b || !c) && m.dequeue(this, a);
	      });
	    }, finish: function finish(a) {
	      return a !== !1 && (a = a || "fx"), this.each(function () {
	        var b,
	            c = m._data(this),
	            d = c[a + "queue"],
	            e = c[a + "queueHooks"],
	            f = m.timers,
	            g = d ? d.length : 0;for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) {
	          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
	        }for (b = 0; g > b; b++) {
	          d[b] && d[b].finish && d[b].finish.call(this);
	        }delete c.finish;
	      });
	    } }), m.each(["toggle", "show", "hide"], function (a, b) {
	    var c = m.fn[b];m.fn[b] = function (a, d, e) {
	      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e);
	    };
	  }), m.each({ slideDown: gb("show"), slideUp: gb("hide"), slideToggle: gb("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
	    m.fn[a] = function (a, c, d) {
	      return this.animate(b, a, c, d);
	    };
	  }), m.timers = [], m.fx.tick = function () {
	    var a,
	        b = m.timers,
	        c = 0;for ($a = m.now(); c < b.length; c++) {
	      a = b[c], a() || b[c] !== a || b.splice(c--, 1);
	    }b.length || m.fx.stop(), $a = void 0;
	  }, m.fx.timer = function (a) {
	    m.timers.push(a), a() ? m.fx.start() : m.timers.pop();
	  }, m.fx.interval = 13, m.fx.start = function () {
	    _a || (_a = setInterval(m.fx.tick, m.fx.interval));
	  }, m.fx.stop = function () {
	    clearInterval(_a), _a = null;
	  }, m.fx.speeds = { slow: 600, fast: 200, _default: 400 }, m.fn.delay = function (a, b) {
	    return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
	      var d = setTimeout(b, a);c.stop = function () {
	        clearTimeout(d);
	      };
	    });
	  }, function () {
	    var a, b, c, d, e;b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value;
	  }();var lb = /\r/g;m.fn.extend({ val: function val(a) {
	      var b,
	          c,
	          d,
	          e = this[0];{
	        if (arguments.length) return d = m.isFunction(a), this.each(function (c) {
	          var e;1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function (a) {
	            return null == a ? "" : a + "";
	          })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
	        });if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lb, "") : null == c ? "" : c);
	      }
	    } }), m.extend({ valHooks: { option: { get: function get(a) {
	          var b = m.find.attr(a, "value");return null != b ? b : m.trim(m.text(a));
	        } }, select: { get: function get(a) {
	          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) {
	            if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
	              if (b = m(c).val(), f) return b;g.push(b);
	            }
	          }return g;
	        }, set: function set(a, b) {
	          var c,
	              d,
	              e = a.options,
	              f = m.makeArray(b),
	              g = e.length;while (g--) {
	            if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try {
	              d.selected = c = !0;
	            } catch (h) {
	              d.scrollHeight;
	            } else d.selected = !1;
	          }return c || (a.selectedIndex = -1), e;
	        } } } }), m.each(["radio", "checkbox"], function () {
	    m.valHooks[this] = { set: function set(a, b) {
	        return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0;
	      } }, k.checkOn || (m.valHooks[this].get = function (a) {
	      return null === a.getAttribute("value") ? "on" : a.value;
	    });
	  });var mb,
	      nb,
	      ob = m.expr.attrHandle,
	      pb = /^(?:checked|selected)$/i,
	      qb = k.getSetAttribute,
	      rb = k.input;m.fn.extend({ attr: function attr(a, b) {
	      return V(this, m.attr, a, b, arguments.length > 1);
	    }, removeAttr: function removeAttr(a) {
	      return this.each(function () {
	        m.removeAttr(this, a);
	      });
	    } }), m.extend({ attr: function attr(a, b, c) {
	      var d,
	          e,
	          f = a.nodeType;if (a && 3 !== f && 8 !== f && 2 !== f) return _typeof(a.getAttribute) === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nb : mb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b));
	    }, removeAttr: function removeAttr(a, b) {
	      var c,
	          d,
	          e = 0,
	          f = b && b.match(E);if (f && 1 === a.nodeType) while (c = f[e++]) {
	        d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rb && qb || !pb.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qb ? c : d);
	      }
	    }, attrHooks: { type: { set: function set(a, b) {
	          if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
	            var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
	          }
	        } } } }), nb = { set: function set(a, b, c) {
	      return b === !1 ? m.removeAttr(a, c) : rb && qb || !pb.test(c) ? a.setAttribute(!qb && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c;
	    } }, m.each(m.expr.match.bool.source.match(/\w+/g), function (a, b) {
	    var c = ob[b] || m.find.attr;ob[b] = rb && qb || !pb.test(b) ? function (a, b, d) {
	      var e, f;return d || (f = ob[b], ob[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, ob[b] = f), e;
	    } : function (a, b, c) {
	      return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null;
	    };
	  }), rb && qb || (m.attrHooks.value = { set: function set(a, b, c) {
	      return m.nodeName(a, "input") ? void (a.defaultValue = b) : mb && mb.set(a, b, c);
	    } }), qb || (mb = { set: function set(a, b, c) {
	      var d = a.getAttributeNode(c);return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0;
	    } }, ob.id = ob.name = ob.coords = function (a, b, c) {
	    var d;return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null;
	  }, m.valHooks.button = { get: function get(a, b) {
	      var c = a.getAttributeNode(b);return c && c.specified ? c.value : void 0;
	    }, set: mb.set }, m.attrHooks.contenteditable = { set: function set(a, b, c) {
	      mb.set(a, "" === b ? !1 : b, c);
	    } }, m.each(["width", "height"], function (a, b) {
	    m.attrHooks[b] = { set: function set(a, c) {
	        return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
	      } };
	  })), k.style || (m.attrHooks.style = { get: function get(a) {
	      return a.style.cssText || void 0;
	    }, set: function set(a, b) {
	      return a.style.cssText = b + "";
	    } });var sb = /^(?:input|select|textarea|button|object)$/i,
	      tb = /^(?:a|area)$/i;m.fn.extend({ prop: function prop(a, b) {
	      return V(this, m.prop, a, b, arguments.length > 1);
	    }, removeProp: function removeProp(a) {
	      return a = m.propFix[a] || a, this.each(function () {
	        try {
	          this[a] = void 0, delete this[a];
	        } catch (b) {}
	      });
	    } }), m.extend({ propFix: { "for": "htmlFor", "class": "className" }, prop: function prop(a, b, c) {
	      var d,
	          e,
	          f,
	          g = a.nodeType;if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
	    }, propHooks: { tabIndex: { get: function get(a) {
	          var b = m.find.attr(a, "tabindex");return b ? parseInt(b, 10) : sb.test(a.nodeName) || tb.test(a.nodeName) && a.href ? 0 : -1;
	        } } } }), k.hrefNormalized || m.each(["href", "src"], function (a, b) {
	    m.propHooks[b] = { get: function get(a) {
	        return a.getAttribute(b, 4);
	      } };
	  }), k.optSelected || (m.propHooks.selected = { get: function get(a) {
	      var b = a.parentNode;return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
	    } }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
	    m.propFix[this.toLowerCase()] = this;
	  }), k.enctype || (m.propFix.enctype = "encoding");var ub = /[\t\r\n\f]/g;m.fn.extend({ addClass: function addClass(a) {
	      var b,
	          c,
	          d,
	          e,
	          f,
	          g,
	          h = 0,
	          i = this.length,
	          j = "string" == typeof a && a;if (m.isFunction(a)) return this.each(function (b) {
	        m(this).addClass(a.call(this, b, this.className));
	      });if (j) for (b = (a || "").match(E) || []; i > h; h++) {
	        if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : " ")) {
	          f = 0;while (e = b[f++]) {
	            d.indexOf(" " + e + " ") < 0 && (d += e + " ");
	          }g = m.trim(d), c.className !== g && (c.className = g);
	        }
	      }return this;
	    }, removeClass: function removeClass(a) {
	      var b,
	          c,
	          d,
	          e,
	          f,
	          g,
	          h = 0,
	          i = this.length,
	          j = 0 === arguments.length || "string" == typeof a && a;if (m.isFunction(a)) return this.each(function (b) {
	        m(this).removeClass(a.call(this, b, this.className));
	      });if (j) for (b = (a || "").match(E) || []; i > h; h++) {
	        if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : "")) {
	          f = 0;while (e = b[f++]) {
	            while (d.indexOf(" " + e + " ") >= 0) {
	              d = d.replace(" " + e + " ", " ");
	            }
	          }g = a ? m.trim(d) : "", c.className !== g && (c.className = g);
	        }
	      }return this;
	    }, toggleClass: function toggleClass(a, b) {
	      var c = typeof a === "undefined" ? "undefined" : _typeof(a);return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function (c) {
	        m(this).toggleClass(a.call(this, c, this.className, b), b);
	      } : function () {
	        if ("string" === c) {
	          var b,
	              d = 0,
	              e = m(this),
	              f = a.match(E) || [];while (b = f[d++]) {
	            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
	          }
	        } else (c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "");
	      });
	    }, hasClass: function hasClass(a) {
	      for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) {
	        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ub, " ").indexOf(b) >= 0) return !0;
	      }return !1;
	    } }), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
	    m.fn[b] = function (a, c) {
	      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
	    };
	  }), m.fn.extend({ hover: function hover(a, b) {
	      return this.mouseenter(a).mouseleave(b || a);
	    }, bind: function bind(a, b, c) {
	      return this.on(a, null, b, c);
	    }, unbind: function unbind(a, b) {
	      return this.off(a, null, b);
	    }, delegate: function delegate(a, b, c, d) {
	      return this.on(b, a, c, d);
	    }, undelegate: function undelegate(a, b, c) {
	      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
	    } });var vb = m.now(),
	      wb = /\?/,
	      xb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON = function (b) {
	    if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");var c,
	        d = null,
	        e = m.trim(b + "");return e && !m.trim(e.replace(xb, function (a, b, e, f) {
	      return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "");
	    })) ? Function("return " + e)() : m.error("Invalid JSON: " + b);
	  }, m.parseXML = function (b) {
	    var c, d;if (!b || "string" != typeof b) return null;try {
	      a.DOMParser ? (d = new DOMParser(), c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b));
	    } catch (e) {
	      c = void 0;
	    }return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c;
	  };var yb,
	      zb,
	      Ab = /#.*$/,
	      Bb = /([?&])_=[^&]*/,
	      Cb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
	      Db = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	      Eb = /^(?:GET|HEAD)$/,
	      Fb = /^\/\//,
	      Gb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	      Hb = {},
	      Ib = {},
	      Jb = "*/".concat("*");try {
	    zb = location.href;
	  } catch (Kb) {
	    zb = y.createElement("a"), zb.href = "", zb = zb.href;
	  }yb = Gb.exec(zb.toLowerCase()) || [];function Lb(a) {
	    return function (b, c) {
	      "string" != typeof b && (c = b, b = "*");var d,
	          e = 0,
	          f = b.toLowerCase().match(E) || [];if (m.isFunction(c)) while (d = f[e++]) {
	        "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
	      }
	    };
	  }function Mb(a, b, c, d) {
	    var e = {},
	        f = a === Ib;function g(h) {
	      var i;return e[h] = !0, m.each(a[h] || [], function (a, h) {
	        var j = h(b, c, d);return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
	      }), i;
	    }return g(b.dataTypes[0]) || !e["*"] && g("*");
	  }function Nb(a, b) {
	    var c,
	        d,
	        e = m.ajaxSettings.flatOptions || {};for (d in b) {
	      void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
	    }return c && m.extend(!0, a, c), a;
	  }function Ob(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h = a.contents,
	        i = a.dataTypes;while ("*" === i[0]) {
	      i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
	    }if (e) for (g in h) {
	      if (h[g] && h[g].test(e)) {
	        i.unshift(g);break;
	      }
	    }if (i[0] in c) f = i[0];else {
	      for (g in c) {
	        if (!i[0] || a.converters[g + " " + i[0]]) {
	          f = g;break;
	        }d || (d = g);
	      }f = f || d;
	    }return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
	  }function Pb(a, b, c, d) {
	    var e,
	        f,
	        g,
	        h,
	        i,
	        j = {},
	        k = a.dataTypes.slice();if (k[1]) for (g in a.converters) {
	      j[g.toLowerCase()] = a.converters[g];
	    }f = k.shift();while (f) {
	      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;else if ("*" !== i && i !== f) {
	        if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) {
	          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
	            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break;
	          }
	        }if (g !== !0) if (g && a["throws"]) b = g(b);else try {
	          b = g(b);
	        } catch (l) {
	          return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
	        }
	      }
	    }return { state: "success", data: b };
	  }m.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: zb, type: "GET", isLocal: Db.test(yb[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Jb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": m.parseJSON, "text xml": m.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(a, b) {
	      return b ? Nb(Nb(a, m.ajaxSettings), b) : Nb(m.ajaxSettings, a);
	    }, ajaxPrefilter: Lb(Hb), ajaxTransport: Lb(Ib), ajax: function ajax(a, b) {
	      "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) && (b = a, a = void 0), b = b || {};var c,
	          d,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = m.ajaxSetup({}, b),
	          l = k.context || k,
	          n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
	          o = m.Deferred(),
	          p = m.Callbacks("once memory"),
	          q = k.statusCode || {},
	          r = {},
	          s = {},
	          t = 0,
	          u = "canceled",
	          v = { readyState: 0, getResponseHeader: function getResponseHeader(a) {
	          var b;if (2 === t) {
	            if (!j) {
	              j = {};while (b = Cb.exec(f)) {
	                j[b[1].toLowerCase()] = b[2];
	              }
	            }b = j[a.toLowerCase()];
	          }return null == b ? null : b;
	        }, getAllResponseHeaders: function getAllResponseHeaders() {
	          return 2 === t ? f : null;
	        }, setRequestHeader: function setRequestHeader(a, b) {
	          var c = a.toLowerCase();return t || (a = s[c] = s[c] || a, r[a] = b), this;
	        }, overrideMimeType: function overrideMimeType(a) {
	          return t || (k.mimeType = a), this;
	        }, statusCode: function statusCode(a) {
	          var b;if (a) if (2 > t) for (b in a) {
	            q[b] = [q[b], a[b]];
	          } else v.always(a[v.status]);return this;
	        }, abort: function abort(a) {
	          var b = a || u;return i && i.abort(b), x(0, b), this;
	        } };if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zb) + "").replace(Ab, "").replace(Fb, yb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gb.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yb[1] && c[2] === yb[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yb[3] || ("http:" === yb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mb(Hb, k, b, v), 2 === t) return v;h = m.event && k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Eb.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wb.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bb.test(e) ? e.replace(Bb, "$1_=" + vb++) : e + (wb.test(e) ? "&" : "?") + "_=" + vb++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jb + "; q=0.01" : "") : k.accepts["*"]);for (d in k.headers) {
	        v.setRequestHeader(d, k.headers[d]);
	      }if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();u = "abort";for (d in { success: 1, error: 1, complete: 1 }) {
	        v[d](k[d]);
	      }if (i = Mb(Ib, k, b, v)) {
	        v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function () {
	          v.abort("timeout");
	        }, k.timeout));try {
	          t = 1, i.send(r, x);
	        } catch (w) {
	          if (!(2 > t)) throw w;x(-1, w);
	        }
	      } else x(-1, "No Transport");function x(a, b, c, d) {
	        var j,
	            r,
	            s,
	            u,
	            w,
	            x = b;2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Ob(k, v, c)), u = Pb(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")));
	      }return v;
	    }, getJSON: function getJSON(a, b, c) {
	      return m.get(a, b, c, "json");
	    }, getScript: function getScript(a, b) {
	      return m.get(a, void 0, b, "script");
	    } }), m.each(["get", "post"], function (a, b) {
	    m[b] = function (a, c, d, e) {
	      return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({ url: a, type: b, dataType: e, data: c, success: d });
	    };
	  }), m._evalUrl = function (a) {
	    return m.ajax({ url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 });
	  }, m.fn.extend({ wrapAll: function wrapAll(a) {
	      if (m.isFunction(a)) return this.each(function (b) {
	        m(this).wrapAll(a.call(this, b));
	      });if (this[0]) {
	        var b = m(a, this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
	          var a = this;while (a.firstChild && 1 === a.firstChild.nodeType) {
	            a = a.firstChild;
	          }return a;
	        }).append(this);
	      }return this;
	    }, wrapInner: function wrapInner(a) {
	      return this.each(m.isFunction(a) ? function (b) {
	        m(this).wrapInner(a.call(this, b));
	      } : function () {
	        var b = m(this),
	            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
	      });
	    }, wrap: function wrap(a) {
	      var b = m.isFunction(a);return this.each(function (c) {
	        m(this).wrapAll(b ? a.call(this, c) : a);
	      });
	    }, unwrap: function unwrap() {
	      return this.parent().each(function () {
	        m.nodeName(this, "body") || m(this).replaceWith(this.childNodes);
	      }).end();
	    } }), m.expr.filters.hidden = function (a) {
	    return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"));
	  }, m.expr.filters.visible = function (a) {
	    return !m.expr.filters.hidden(a);
	  };var Qb = /%20/g,
	      Rb = /\[\]$/,
	      Sb = /\r?\n/g,
	      Tb = /^(?:submit|button|image|reset|file)$/i,
	      Ub = /^(?:input|select|textarea|keygen)/i;function Vb(a, b, c, d) {
	    var e;if (m.isArray(b)) m.each(b, function (b, e) {
	      c || Rb.test(a) ? d(a, e) : Vb(a + "[" + ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? b : "") + "]", e, c, d);
	    });else if (c || "object" !== m.type(b)) d(a, b);else for (e in b) {
	      Vb(a + "[" + e + "]", b[e], c, d);
	    }
	  }m.param = function (a, b) {
	    var c,
	        d = [],
	        e = function e(a, b) {
	      b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
	    };if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a)) m.each(a, function () {
	      e(this.name, this.value);
	    });else for (c in a) {
	      Vb(c, a[c], b, e);
	    }return d.join("&").replace(Qb, "+");
	  }, m.fn.extend({ serialize: function serialize() {
	      return m.param(this.serializeArray());
	    }, serializeArray: function serializeArray() {
	      return this.map(function () {
	        var a = m.prop(this, "elements");return a ? m.makeArray(a) : this;
	      }).filter(function () {
	        var a = this.type;return this.name && !m(this).is(":disabled") && Ub.test(this.nodeName) && !Tb.test(a) && (this.checked || !W.test(a));
	      }).map(function (a, b) {
	        var c = m(this).val();return null == c ? null : m.isArray(c) ? m.map(c, function (a) {
	          return { name: b.name, value: a.replace(Sb, "\r\n") };
	        }) : { name: b.name, value: c.replace(Sb, "\r\n") };
	      }).get();
	    } }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
	    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zb() || $b();
	  } : Zb;var Wb = 0,
	      Xb = {},
	      Yb = m.ajaxSettings.xhr();a.attachEvent && a.attachEvent("onunload", function () {
	    for (var a in Xb) {
	      Xb[a](void 0, !0);
	    }
	  }), k.cors = !!Yb && "withCredentials" in Yb, Yb = k.ajax = !!Yb, Yb && m.ajaxTransport(function (a) {
	    if (!a.crossDomain || k.cors) {
	      var _b3;return { send: function send(c, d) {
	          var e,
	              f = a.xhr(),
	              g = ++Wb;if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) {
	            f[e] = a.xhrFields[e];
	          }a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");for (e in c) {
	            void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
	          }f.send(a.hasContent && a.data || null), _b3 = function b(c, e) {
	            var h, i, j;if (_b3 && (e || 4 === f.readyState)) if (delete Xb[g], _b3 = void 0, f.onreadystatechange = m.noop, e) 4 !== f.readyState && f.abort();else {
	              j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);try {
	                i = f.statusText;
	              } catch (k) {
	                i = "";
	              }h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404;
	            }j && d(h, i, j, f.getAllResponseHeaders());
	          }, a.async ? 4 === f.readyState ? setTimeout(_b3) : f.onreadystatechange = Xb[g] = _b3 : _b3();
	        }, abort: function abort() {
	          _b3 && _b3(void 0, !0);
	        } };
	    }
	  });function Zb() {
	    try {
	      return new a.XMLHttpRequest();
	    } catch (b) {}
	  }function $b() {
	    try {
	      return new a.ActiveXObject("Microsoft.XMLHTTP");
	    } catch (b) {}
	  }m.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function textScript(a) {
	        return m.globalEval(a), a;
	      } } }), m.ajaxPrefilter("script", function (a) {
	    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
	  }), m.ajaxTransport("script", function (a) {
	    if (a.crossDomain) {
	      var b,
	          c = y.head || m("head")[0] || y.documentElement;return { send: function send(d, e) {
	          b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
	            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"));
	          }, c.insertBefore(b, c.firstChild);
	        }, abort: function abort() {
	          b && b.onload(void 0, !0);
	        } };
	    }
	  });var _b = [],
	      ac = /(=)\?(?=&|$)|\?\?/;m.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
	      var a = _b.pop() || m.expando + "_" + vb++;return this[a] = !0, a;
	    } }), m.ajaxPrefilter("json jsonp", function (b, c, d) {
	    var e,
	        f,
	        g,
	        h = b.jsonp !== !1 && (ac.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ac.test(b.data) && "data");return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ac, "$1" + e) : b.jsonp !== !1 && (b.url += (wb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
	      return g || m.error(e + " was not called"), g[0];
	    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
	      g = arguments;
	    }, d.always(function () {
	      a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _b.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0;
	    }), "script") : void 0;
	  }), m.parseHTML = function (a, b, c) {
	    if (!a || "string" != typeof a) return null;"boolean" == typeof b && (c = b, b = !1), b = b || y;var d = u.exec(a),
	        e = !c && [];return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes));
	  };var bc = m.fn.load;m.fn.load = function (a, b, c) {
	    if ("string" != typeof a && bc) return bc.apply(this, arguments);var d,
	        e,
	        f,
	        g = this,
	        h = a.indexOf(" ");return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (f = "POST"), g.length > 0 && m.ajax({ url: a, type: f, dataType: "html", data: b }).done(function (a) {
	      e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a);
	    }).complete(c && function (a, b) {
	      g.each(c, e || [a.responseText, b, a]);
	    }), this;
	  }, m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
	    m.fn[b] = function (a) {
	      return this.on(b, a);
	    };
	  }), m.expr.filters.animated = function (a) {
	    return m.grep(m.timers, function (b) {
	      return a === b.elem;
	    }).length;
	  };var cc = a.document.documentElement;function dc(a) {
	    return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
	  }m.offset = { setOffset: function setOffset(a, b, c) {
	      var d,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = m.css(a, "position"),
	          l = m(a),
	          n = {};"static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using" in b ? b.using.call(a, n) : l.css(n);
	    } }, m.fn.extend({ offset: function offset(a) {
	      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
	        m.offset.setOffset(this, a, b);
	      });var b,
	          c,
	          d = { top: 0, left: 0 },
	          e = this[0],
	          f = e && e.ownerDocument;if (f) return b = f.documentElement, m.contains(b, e) ? (_typeof(e.getBoundingClientRect) !== K && (d = e.getBoundingClientRect()), c = dc(f), { top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0) }) : d;
	    }, position: function position() {
	      if (this[0]) {
	        var a,
	            b,
	            c = { top: 0, left: 0 },
	            d = this[0];return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), { top: b.top - c.top - m.css(d, "marginTop", !0), left: b.left - c.left - m.css(d, "marginLeft", !0) };
	      }
	    }, offsetParent: function offsetParent() {
	      return this.map(function () {
	        var a = this.offsetParent || cc;while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position")) {
	          a = a.offsetParent;
	        }return a || cc;
	      });
	    } }), m.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
	    var c = /Y/.test(b);m.fn[a] = function (d) {
	      return V(this, function (a, d, e) {
	        var f = dc(a);return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e);
	      }, a, d, arguments.length, null);
	    };
	  }), m.each(["top", "left"], function (a, b) {
	    m.cssHooks[b] = La(k.pixelPosition, function (a, c) {
	      return c ? (c = Ja(a, b), Ha.test(c) ? m(a).position()[b] + "px" : c) : void 0;
	    });
	  }), m.each({ Height: "height", Width: "width" }, function (a, b) {
	    m.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
	      m.fn[d] = function (d, e) {
	        var f = arguments.length && (c || "boolean" != typeof d),
	            g = c || (d === !0 || e === !0 ? "margin" : "border");return V(this, function (b, c, d) {
	          var e;return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g);
	        }, b, f ? d : void 0, f, null);
	      };
	    });
	  }), m.fn.size = function () {
	    return this.length;
	  }, m.fn.andSelf = m.fn.addBack, "function" == "function" && __webpack_require__(14) && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return m;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var ec = a.jQuery,
	      fc = a.$;return m.noConflict = function (b) {
	    return a.$ === m && (a.$ = fc), b && a.jQuery === m && (a.jQuery = ec), m;
	  }, (typeof b === "undefined" ? "undefined" : _typeof(b)) === K && (a.jQuery = a.$ = m), m;
	});
	//# sourceMappingURL=jquery.min.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(31)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./fonts.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./fonts.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, "@font-face {\n  font-family: 'Nanum Gothic';\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + __webpack_require__(18) + ") format('woff2');\n}\n@font-face {\n  font-family: 'Nanum Gothic';\n  font-style: normal;\n  font-weight: 700;\n  src: url(" + __webpack_require__(19) + ") format('woff2');\n}\n@font-face {\n  font-family: 'Nanum Gothic';\n  font-style: normal;\n  font-weight: 800;\n  src: url(" + __webpack_require__(20) + ") format('woff2');\n}\n@font-face {\n  font-family: 'Nanum Gothic Coding';\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + __webpack_require__(21) + ") format('woff2');\n}\n@font-face {\n  font-family: 'Nanum Gothic Coding';\n  font-style: normal;\n  font-weight: 700;\n  src: url(" + __webpack_require__(22) + ") format('woff2');\n}\n@font-face {\n  font-family: 'Nanum Myeongjo';\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + __webpack_require__(23) + ") format('woff2');\n}\n@font-face {\n  font-family: 'Nanum Myeongjo';\n  font-style: normal;\n  font-weight: 600;\n  src: url(" + __webpack_require__(24) + ") format('woff2');\n}\n@font-face {\n  font-family: 'Nanum Myeongjo';\n  font-style: normal;\n  font-weight: 700;\n  src: url(" + __webpack_require__(25) + ") format('woff2');\n}\n@font-face {\n  font-family: 'Nanum Pen Script';\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + __webpack_require__(26) + ") format('woff2');\n}\n@font-face {\n  font-family: nanumBarunLight;\n  font-style: normal;\n  font-weight: 300;\n  src: url(" + __webpack_require__(27) + ") format('woff2');\n}\n@font-face {\n  font-family: nanumBarunUltraLight;\n  font-style: normal;\n  font-weight: 200;\n  src: url(" + __webpack_require__(28) + ") format('woff2');\n}\n@font-face {\n  font-family: nanumBarunRegular;\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + __webpack_require__(29) + ") format('woff2');\n}\n@font-face {\n  font-family: nanumBarunBold;\n  font-style: normal;\n  font-weight: 700;\n  src: url(" + __webpack_require__(30) + ") format('woff2');\n}\n", ""]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "1d98d61bb3f3c62920b0edcdbade3070.woff2";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "60ccd866579bed370ea18836602a9330.woff2";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e8d3c62208f618bf2ca1e878c6bf9927.woff2";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "20ceacd97b149e278f098d2f62c3168a.woff2";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6f8957f56bce4e9320c8633b2e23cfde.woff2";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4d943809d88c7be6ae3f4e3857b2a99f.woff2";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "01844f679e9b8c2bfd7f5975be7a61dc.woff2";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "31ca60966758447206bdb9494b823cd4.woff2";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5559f596796afae6edfa01b371809890.woff2";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8e349777827d56ad0ab2e33037c26cb8.woff2";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "04f20ede49df3e836b48461d086af635.woff2";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ecf17559a7d726e924c87764d4e869d5.woff2";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5ecca925eabf53461c5aaefd7891b9fb.woff2";

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(33);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(31)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./develop.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./develop.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  font-family: nanumBarunRegular !important;\n}\nbody {\n  overflow: hidden;\n  font-family: 'Nanum Gothic';\n}\n.page-header {\n  margin: 0;\n  border: 0;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  top: 45px;\n  right: 0;\n  bottom: 0;\n}\n.hide_contents {\n  display: none !important;\n}\n.entryTextFontSelecter {\n  display: inline-block;\n  width: 96px;\n  height: 32px;\n  float: left;\n}\n.entryPauseButtonWorkspace_w {\n  display: none;\n}\n.entryUploaderWindow {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 86, 132, 0.9);\n  z-index: 250000;\n  text-align: center;\n  opacity: 0;\n  -webkit-transition: opacity 250ms;\n  transition: opacity 250ms;\n}\n.entryUploaderWindowContent {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  right: 10px;\n  bottom: 10px;\n  border: 1px dashed #fff;\n}\n.entryUploaderWindowContent h1 {\n  margin: -0.5em 0 0;\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  -webkit-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  transform: translateY(-50%);\n  font-size: 40px;\n  color: #fff;\n  padding: 0;\n}\n.entrySpinnerWindow {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 250000;\n  text-align: center;\n}\n.entrySpinner {\n  position: relative;\n  left: 0;\n  width: 70px;\n  height: 60px;\n  text-align: center;\n  font-size: 10px;\n  margin: auto;\n}\n.entrySpinner > div {\n  background-color: #fff;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\n  animation: sk-stretchdelay 1.2s infinite ease-in-out;\n}\n.entrySpinner .rect2 {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.entrySpinner .rect3 {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.entrySpinner .rect4 {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.entrySpinner .rect5 {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n@-webkit-keyframes sk-stretchdelay {\n  0%,\n  40%,\n  100% {\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    -webkit-transform: scaleY(1);\n  }\n}\n@keyframes sk-stretchdelay {\n  0%,\n  40%,\n  100% {\n    transform: scaleY(0.4);\n    -webkit-transform: scaleY(0.4);\n  }\n  20% {\n    transform: scaleY(1);\n    -webkit-transform: scaleY(1);\n  }\n}\n.tab-content .tab-pane .upload_wrap {\n  width: 713px;\n}\n", ""]);
	
	// exports


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./code.js": 35,
		"./en.js": 36,
		"./ko.js": 37,
		"./vn.js": 38
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 34;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var Lang={};Lang.category={"name":"ko"};Lang.type="ko";Lang.en="English";Lang.Blocks={"ARDUINO":"하드웨어","ARDUINO_download_connector":"Download Arduino Connector","ARDUINO_open_connector":"Open Arduino Connector","ARDUINO_download_source":"Entry Arduino code","ARDUINO_reconnect":"Connect Hardware","ARDUINO_connected":"Hardware connected","ARDUINO_arduino_get_number_1":"신호","ARDUINO_arduino_get_number_2":"의 숫자 결과값","ARDUINO_arduino_get_sensor_number_0":"0","ARDUINO_arduino_get_sensor_number_1":"1","ARDUINO_arduino_get_sensor_number_2":"2","ARDUINO_arduino_get_sensor_number_3":"3","ARDUINO_arduino_get_sensor_number_4":"4","ARDUINO_arduino_get_sensor_number_5":"5","BITBRICK_light":"light","BITBRICK_IR":"IR","BITBRICK_touch":"touch","BITBRICK_potentiometer":"potentiometer","BITBRICK_MIC":"MIC","BITBRICK_UserSensor":"UserSensor","BITBRICK_UserInput":"UserInput","BITBRICK_dc_direction_ccw":"CCW","BITBRICK_dc_direction_cw":"CW","CODEino_get_sensor_number_0":"0","CODEino_get_sensor_number_1":"1","CODEino_get_sensor_number_2":"2","CODEino_get_sensor_number_3":"3","CODEino_get_sensor_number_4":"4","CODEino_get_sensor_number_5":"5","CODEino_get_sensor_number_6":"6","CODEino_sensor_name_0":"Sound","CODEino_sensor_name_1":"Light","CODEino_sensor_name_2":"Slider","CODEino_sensor_name_3":"resistance-A","CODEino_sensor_name_4":"resistance-B","CODEino_sensor_name_5":"resistance-C","CODEino_sensor_name_6":"resistance-D","CODEino_string_1":" Sensor value ","CODEino_string_2":" Operation ","CODEino_string_3":"Push button","CODEino_string_4":"Connected A","CODEino_string_5":"Connected B","CODEino_string_6":"Connected C","CODEino_string_7":"Connected D","CODEino_string_8":" 3-AXIS Accelerometer ","CODEino_string_9":"-axis value ","CODEino_string_10":"Sound is ","CODEino_string_11":"Great","CODEino_string_12":"Small","CODEino_string_13":"Light is ","CODEino_string_14":"Bright","CODEino_string_15":"Dark","CODEino_string_16":"Left tilt","CODEino_string_17":"Right tilt","CODEino_string_18":"Front tilt","CODEino_string_19":"Rear tilt","CODEino_string_20":"Reverse","CODEino_accelerometer_X":"X","CODEino_accelerometer_Y":"Y","CODEino_accelerometer_Z":"Z","dplay_switch":"스위치 ","dplay_light":"빛센서가 ","dplay_tilt":"기울기센서 상태가","dplay_string_1":"켜짐","dplay_string_2":"꺼짐","dplay_string_3":"밝음","dplay_string_4":"어두움","dplay_string_5":"눌림","dplay_string_6":"열림","dplay_num_pin_1":"LED 상태를","dplay_num_pin_2":"번 스위치가","dplay_num_pin_3":"아날로그","dplay_num_pin_4":"번 ","dplay_num_pin_5":"센서값","dplay_analog_number_0":"A0","dplay_analog_number_1":"A1","dplay_analog_number_2":"A2","dplay_analog_number_3":"A3","dplay_analog_number_4":"A4","dplay_analog_number_5":"A5","ARDUINO_arduino_get_string_1":"신호","ARDUINO_arduino_get_string_2":"의 글자 결과값","ARDUINO_arduino_send_1":"신호","ARDUINO_arduino_send_2":"보내기","ARDUINO_num_sensor_value_1":"아날로그","ARDUINO_num_sensor_value_2":"번 센서값","ARDUINO_get_digital_value_1":"디지털","ARDUINO_num_pin_1":"Digital","ARDUINO_num_pin_2":"Pin","ARDUINO_toggle_pwm_1":"Digital","ARDUINO_toggle_pwm_2":"Pin","ARDUINO_toggle_pwm_3":"","ARDUINO_on":"On","ARDUINO_convert_scale_1":"Map Value","ARDUINO_convert_scale_2":"","ARDUINO_convert_scale_3":"~","ARDUINO_convert_scale_4":"to","ARDUINO_convert_scale_5":"~","ARDUINO_convert_scale_6":"","ARDUINO_off":"Off","brightness":"밝기","BRUSH":"붓","BRUSH_brush_erase_all":"this.brush.removeAll()","BRUSH_change_opacity_1":"this.brush.opacity +=","BRUSH_change_opacity_2":"","BRUSH_change_thickness_1":"this.brush.thickness +=","BRUSH_change_thickness_2":"","BRUSH_set_color_1":"this.brush.color =","BRUSH_set_color_2":"","BRUSH_set_opacity_1":"this.brush.opacity =","BRUSH_set_opacity_2":"","BRUSH_set_random_color":"this.brush.color = Entry.getRandomColor()","BRUSH_set_thickness_1":"this.brush.thickness =","BRUSH_set_thickness_2":"","BRUSH_stamp":"Stamp","BRUSH_start_drawing":"this.startDraw()","BRUSH_stop_drawing":"this.stopDraw()","CALC":"계산","CALC_calc_mod_1":"Entry.getMod(","CALC_calc_mod_2":",","CALC_calc_mod_3":")","CALC_calc_operation_of_1":"Entry.calculate(","CALC_calc_operation_of_2":",","CALC_calc_operation_root":"루트","CALC_calc_operation_square":"제곱","CALC_calc_rand_1":"Entry.getRandomNumber(","CALC_calc_rand_2":",","CALC_calc_rand_3":")","CALC_calc_share_1":"Entry.getShare(","CALC_calc_share_2":",","CALC_calc_share_3":")","CALC_coordinate_mouse_1":"Entry.getMousePosition(","CALC_coordinate_mouse_2":")","CALC_coordinate_object_1":"Entry.getPosition(","CALC_coordinate_object_2":",","CALC_coordinate_object_3":")","CALC_distance_something_1":"Entry.getDistance(this,","CALC_distance_something_2":")","CALC_get_angle":"각도값","CALC_get_date_1":"Entry.getDate(","CALC_get_date_2":")","CALC_get_date_day":"일","CALC_get_date_hour":"시각(시)","CALC_get_date_minute":"시각(분)","CALC_get_date_month":"월","CALC_get_date_second":"시각(초)","CALC_get_date_year":"연도","CALC_get_sound_duration_1":"Entry.getSoundDuration(","CALC_get_sound_duration_2":")","CALC_get_timer_value":"Entry.getTimerValue()","CALC_get_x_coordinate":"this.x","CALC_get_y_coordinate":"this.y","CALC_timer_reset":"Entry.resetTimer()","CALC_timer_visible_1":"Entry.timerVisible(","CALC_timer_visible_2":")","CALC_timer_visible_show":"Show","CALC_timer_visible_hide":"Hide","color":"색깔","FLOW":"흐름","FLOW__if_1":"if (","FLOW__if_2":")","FLOW_create_clone_1":"Entry.createClone(","FLOW_create_clone_2":")","FLOW_delete_clone":"Entry.removeClone(this)","FLOW_delete_clone_all":"Entry.removeAllClone()","FLOW_if_else_1":"if (","FLOW_if_else_2":")","FLOW_if_else_3":"else","FLOW_repeat_basic_1":"for ( i = 0","FLOW_repeat_basic_2":")","FLOW_repeat_basic_errorMsg":"","FLOW_repeat_inf":"while(true)","FLOW_restart":"Entry.restart()","FLOW_stop_object_1":"Entry.stop(","FLOW_stop_object_2":")","FLOW_stop_object_all":"모두","FLOW_stop_object_this_object":"this.","FLOW_stop_object_this_thread":"이","FLOW_stop_object_other_thread":"자신의 다른","FLOW_stop_repeat":"break","FLOW_stop_run":"프로그램 끝내기","FLOW_wait_second_1":"Entry.wait(","FLOW_wait_second_2":")","FLOW_wait_until_true_1":"while (","FLOW_wait_until_true_2":"!= true) { }","FLOW_when_clone_start":"Entry.addEventListener('clone_created')","FUNC":"함수","JUDGEMENT":"판단","JUDGEMENT_boolean_and":"&&","JUDGEMENT_boolean_not_1":"if (!","JUDGEMENT_boolean_not_2":")","JUDGEMENT_boolean_or":"||","JUDGEMENT_false":"false","JUDGEMENT_is_clicked":"Entry.addEventListener('mouse_clicked')","JUDGEMENT_is_press_some_key_1":"Entry.isKeyPressed(","JUDGEMENT_is_press_some_key_2":")","JUDGEMENT_reach_something_1":"Entry.isCollide(this,","JUDGEMENT_reach_something_2":")","JUDGEMENT_true":"true","LOOKS":"생김새","LOOKS_change_scale_percent_1":"this.scale +=","LOOKS_change_scale_percent_2":"","LOOKS_change_to_next_shape":"this.setToNextShape()","LOOKS_change_to_nth_shape_1":"this.setShape(","LOOKS_change_to_nth_shape_2":")","LOOKS_change_shape_prev":"Prev","LOOKS_change_shape_next":"Next","LOOKS_change_to_near_shape_1":"this.setTo","LOOKS_change_to_near_shape_2":"Shape()","LOOKS_dialog_1":"this.setDialog(","LOOKS_dialog_2":",","LOOKS_dialog_3":")","LOOKS_dialog_time_1":"this.setDialogByTime(","LOOKS_dialog_time_2":",","LOOKS_dialog_time_3":",","LOOKS_dialog_time_4":")","LOOKS_erase_all_effects":"this.removeAllEffects()","LOOKS_flip_x":"this.flip('vertical')","LOOKS_flip_y":"this.flip('horizontal')","LOOKS_hide":"this.hide()","LOOKS_remove_dialog":"this.removeDialog()","LOOKS_set_effect_1":"this.setEffect(","LOOKS_set_effect_2":",","LOOKS_set_effect_3":")","LOOKS_set_effect_volume_1":"this.addEffect(","LOOKS_set_effect_volume_2":",","LOOKS_set_effect_volume_3":")","LOOKS_set_object_order_1":"Entry.setLayerOrder(this,","LOOKS_set_object_order_2":")","LOOKS_set_scale_percent_1":"this.scale =","LOOKS_set_scale_percent_2":"","LOOKS_show":"this.show()","mouse_pointer":"마우스포인터","MOVING":"움직임","MOVING_bounce_wall":"Entry.bounceWall(this)","MOVING_bounce_when_1":"","MOVING_bounce_when_2":"에 닿으면 튕기기","MOVING_flip_arrow_horizontal":"화살표 방향 좌우 뒤집기","MOVING_flip_arrow_vertical":"화살표 방향 상하 뒤집기","MOVING_locate_1":"this.locateAt(","MOVING_locate_2":")","MOVING_locate_time_1":"","MOVING_locate_time_2":"초 동안","MOVING_locate_time_3":"위치로 이동하기","MOVING_locate_x_1":"this.x =","MOVING_locate_x_2":"","MOVING_locate_xy_1":"this.setXY(","MOVING_locate_xy_2":",","MOVING_locate_xy_3":")","MOVING_locate_xy_time_1":"this.setXYbyTime(","MOVING_locate_xy_time_2":",","MOVING_locate_xy_time_3":",","MOVING_locate_xy_time_4":")","MOVING_locate_y_1":"this.y =","MOVING_locate_y_2":"","MOVING_move_direction_1":"Entry.moveToDirection(","MOVING_move_direction_2":")","MOVING_move_direction_angle_1":"Entry.moveToDirection(","MOVING_move_direction_angle_2":",","MOVING_move_direction_angle_3":")","MOVING_move_x_1":"this.x +=","MOVING_move_x_2":"","MOVING_move_xy_time_1":"this.moveXYbyTime(","MOVING_move_xy_time_2":",","MOVING_move_xy_time_3":",","MOVING_move_xy_time_4":")","MOVING_move_y_1":"this.y +=","MOVING_move_y_2":"","MOVING_rotate_by_angle_1":"this.rotation +=","MOVING_rotate_by_angle_2":"","MOVING_rotate_by_angle_dropdown_1":"","MOVING_rotate_by_angle_dropdown_2":"만큼 회전하기","MOVING_rotate_by_angle_time_1":"this.rotateByTime(","MOVING_rotate_by_angle_time_2":",","MOVING_rotate_by_angle_time_3":")","MOVING_rotate_direction_1":"this.direction +=","MOVING_rotate_direction_2":"","MOVING_see_angle_1":"this.direction =","MOVING_see_angle_2":"","MOVING_see_angle_direction_1":"this.rotation =","MOVING_see_angle_direction_2":"","MOVING_see_angle_object_1":"this.setDirectionTo(","MOVING_see_angle_object_2":")","MOVING_see_direction_1":"","MOVING_see_direction_2":"쪽 보기","MOVING_set_direction_by_angle_1":"this.rotation =","MOVING_set_direction_by_angle_2":"","MOVING_add_direction_by_angle_1":"this.rotation =","MOVING_add_direction_by_angle_2":"","MOVING_add_direction_by_angle_time_1":"this.rotate(","MOVING_add_direction_by_angle_time_2":",","MOVING_add_direction_by_angle_time_3":")","no_target":"대상없음","oneself":"자신","opacity":"투명도","SCENE":"장면","SOUND":"소리","SOUND_sound_silent_all":"Entry.silentAll()","SOUND_sound_something_1":"Entry.playSound(","SOUND_sound_something_2":")","SOUND_sound_something_second_1":"Entry.playSoundByTime(","SOUND_sound_something_second_2":",","SOUND_sound_something_second_3":")","SOUND_sound_something_second_wait_1":"Entry.playSoundAndWaitByTime(","SOUND_sound_something_second_wait_2":",","SOUND_sound_something_second_wait_3":")","SOUND_sound_something_wait_1":"Entry.playSoundAndWait(","SOUND_sound_something_wait_2":")","SOUND_sound_volume_change_1":"Entry.volume +=","SOUND_sound_volume_change_2":"","SOUND_sound_volume_set_1":"Entry.volume =","SOUND_sound_volume_set_2":"","speak":"말하기","START":"시작","START_add_message":"신호 추가하기","START_delete_message":"신호 삭제하기","START_message_cast":"신호 보내기","START_message_cast_1":"Entry.dispatchEvent(","START_message_cast_2":")","START_message_cast_wait":")","START_message_send_wait_1":"Entry.dispatchEventAndWait(","START_message_send_wait_2":")","START_mouse_click_cancled":"Entry.addEventListener('mouseup')","START_mouse_clicked":"Entry.addEventListener('mousedown')","START_press_some_key_1":"Entry.addEventListener('keydown', key==","START_press_some_key_2":")","START_press_some_key_down":"아래쪽 화살표","START_press_some_key_enter":"엔터","START_press_some_key_left":"왼쪽 화살표","START_press_some_key_right":"오른쪽 화살표","START_press_some_key_space":"스페이스","START_press_some_key_up":"위쪽 화살표","START_when_message_cast":"신호를 받았을 때","START_when_message_cast_1":"Entry.addEventListener(","START_when_message_cast_2":")","START_when_object_click":"this.addEventListener('mousedown')","START_when_object_click_canceled":"this.addEventListener('mouseup')","START_when_run_button_click":"Entry.addEventListener('run')","START_when_scene_start":"장면이 시작했을때","START_when_some_key_click":"키를 눌렀을 때","TEXT":"글상자","TEXT_text":"Entry","TEXT_text_append_1":"Entry.appendText(","TEXT_text_append_2":")","TEXT_text_flush":"Entry.clearText()","TEXT_text_prepend_1":"Entry.insertText(","TEXT_text_prepend_2":")","TEXT_text_write_1":"Entry.writeText(","TEXT_text_write_2":")","VARIABLE":"자료","VARIABLE_add_value_to_list":"항목을 리스트에 추가하기","VARIABLE_add_value_to_list_1":"Entry.pushValueToList(","VARIABLE_add_value_to_list_2":",","VARIABLE_add_value_to_list_3":")","VARIABLE_ask_and_wait_1":"Entry.askAndWait(","VARIABLE_ask_and_wait_2":")","VARIABLE_change_value_list_index":"항목을 바꾸기","VARIABLE_change_value_list_index_1":"Entry.changeValueListAt(","VARIABLE_change_value_list_index_3":",","VARIABLE_change_value_list_index_2":",","VARIABLE_change_value_list_index_4":")","VARIABLE_change_variable":"변수 더하기","VARIABLE_change_variable_1":"Entry.addValueToVariable(","VARIABLE_change_variable_2":",","VARIABLE_change_variable_3":")","VARIABLE_change_variable_name":"변수 이름 바꾸기","VARIABLE_combine_something_1":"Entry.concat(","VARIABLE_combine_something_2":",","VARIABLE_combine_something_3":")","VARIABLE_get_canvas_input_value":"Entry.getAnswer()","VARIABLE_get_variable":"변수값","VARIABLE_get_variable_1":"Entry.getVariableValue(","VARIABLE_get_variable_2":")","VARIABLE_get_y":"Y 좌푯값","VARIABLE_hide_list":"리스트 숨기기","VARIABLE_hide_list_1":"Entry.hideList(","VARIABLE_hide_list_2":")","VARIABLE_hide_variable":"변수값 숨기기","VARIABLE_hide_variable_1":"Entry.hideVariable(","VARIABLE_hide_variable_2":")","VARIABLE_insert_value_to_list":"항목을 넣기","VARIABLE_insert_value_to_list_1":"Entry.pushValueToListAt(","VARIABLE_insert_value_to_list_2":",","VARIABLE_insert_value_to_list_3":",","VARIABLE_insert_value_to_list_4":")","VARIABLE_length_of_list":"리스트의 길이","VARIABLE_length_of_list_1":"Entry.getLength(","VARIABLE_length_of_list_2":")","VARIABLE_list":"리스트","VARIABLE_make_variable":"변수 만들기","VARIABLE_list_option_first":"FIRST","VARIABLE_list_option_last":"LAST","VARIABLE_list_option_random":"RANDOM","VARIABLE_remove_value_from_list":"항목을 삭제하기","VARIABLE_remove_value_from_list_1":"Entry.removeValueListAt(","VARIABLE_remove_value_from_list_2":",","VARIABLE_remove_value_from_list_3":")","VARIABLE_remove_variable":"변수 삭제","VARIABLE_set_variable":"변수 정하기","VARIABLE_set_variable_1":"Entry.setValueVariable(","VARIABLE_set_variable_2":",","VARIABLE_set_variable_3":")","VARIABLE_show_list":"리스트 보이기","VARIABLE_show_list_1":"Entry.showList(","VARIABLE_show_list_2":")","VARIABLE_show_variable":"변수값 보이기","VARIABLE_show_variable_1":"Entry.showVariable(","VARIABLE_show_variable_2":")","VARIABLE_value_of_index_from_list":"리스트 항목의 값","VARIABLE_value_of_index_from_list_1":"Entry.getListValueAt(","VARIABLE_value_of_index_from_list_2":",","VARIABLE_value_of_index_from_list_3":")","HAMSTER_hand_found":"Entry.Hamster.isHandFound()","HAMSTER_sensor_leftProximity":"Entry.Hamster.getLeftProximity()","HAMSTER_sensor_rightProximity":"Entry.Hamster.getRightProximity()","HAMSTER_sensor_leftFloor":"Entry.Hamster.getLeftFloor()","HAMSTER_sensor_rightFloor":"Entry.Hamster.getRightFloor()","HAMSTER_sensor_accelerationX":"Entry.Hamster.getAccelerationX()","HAMSTER_sensor_accelerationY":"Entry.Hamster.getAccelerationY()","HAMSTER_sensor_accelerationZ":"Entry.Hamster..getAccelerationZ()","HAMSTER_sensor_light":"Entry.Hamster.getLight()","HAMSTER_sensor_temperature":"Entry.Hamster.getTemperature()","HAMSTER_sensor_signalStrength":"Entry.Hamster.getSignalStrength()","HAMSTER_sensor_inputA":"Entry.Hamster.getInputA()","HAMSTER_sensor_inputB":"Entry.Hamster.getInputB()","HAMSTER_move_forward_once":"Entry.Hamster.moveForwardOnceOnBoard()","HAMSTER_turn_once_1":"Entry.Hamster.turnOnceOnBoard('","HAMSTER_turn_once_2":"')","HAMSTER_move_forward":"move forward","HAMSTER_move_backward":"move backward","HAMSTER_turn_around_1":"turn","HAMSTER_turn_around_2":"","HAMSTER_move_forward_for_secs_1":"move forward for","HAMSTER_move_forward_for_secs_2":"secs","HAMSTER_move_backward_for_secs_1":"move backward","HAMSTER_move_backward_for_secs_2":"secs","HAMSTER_turn_for_secs_1":"turn","HAMSTER_turn_for_secs_2":"for","HAMSTER_turn_for_secs_3":"secs","HAMSTER_change_both_wheels_by_1":"change wheel by left:","HAMSTER_change_both_wheels_by_2":"right:","HAMSTER_change_both_wheels_by_3":"","HAMSTER_set_both_wheels_to_1":"set wheel to left:","HAMSTER_set_both_wheels_to_2":"right:","HAMSTER_set_both_wheels_to_3":")","HAMSTER_change_wheel_by_1":"Entry.Hamster.changeWheelBy('","HAMSTER_change_wheel_by_2":"',","HAMSTER_change_wheel_by_3":")","HAMSTER_set_wheel_to_1":"Entry.Hamster.setWheelTo('","HAMSTER_set_wheel_to_2":"',","HAMSTER_set_wheel_to_3":")","HAMSTER_follow_line_using_1":"Entry.Hamster.followLineUsingFloorSensor('","HAMSTER_follow_line_using_2":"','","HAMSTER_follow_line_using_3":"')","HAMSTER_follow_line_until_1":"Entry.Hamster.followLineUntilIntersection('","HAMSTER_follow_line_until_2":"','","HAMSTER_follow_line_until_3":"')","HAMSTER_set_following_speed_to_1":"Entry.Hamster.setFollowingSpeedTo(","HAMSTER_set_following_speed_to_2":")","HAMSTER_front":"front","HAMSTER_rear":"rear","HAMSTER_stop":"stop","HAMSTER_set_led_to_1":"Entry.Hamster.setLedTo('","HAMSTER_set_led_to_2":"','","HAMSTER_set_led_to_3":"')","HAMSTER_clear_led_1":"Entry.Hamster.clearLed('","HAMSTER_clear_led_2":"')","HAMSTER_color_cyan":"cyan","HAMSTER_color_magenta":"magenta","HAMSTER_color_black":"black","HAMSTER_beep":"Entry.Hamster.beep()","HAMSTER_change_buzzer_by_1":"change buzzer by","HAMSTER_change_buzzer_by_2":"","HAMSTER_set_buzzer_to_1":"set buzzer to","HAMSTER_set_buzzer_to_2":"","HAMSTER_clear_buzzer":"clear buzzer","HAMSTER_play_note_for_1":"Entry.Hamster.playNoteForBeats('","HAMSTER_play_note_for_2":"',","HAMSTER_play_note_for_3":",","HAMSTER_play_note_for_4":")","HAMSTER_rest_for_1":"Entry.Hamster.restForBeats(","HAMSTER_rest_for_2":")","HAMSTER_change_tempo_by_1":"Entry.Hamster.changeTempoBy(","HAMSTER_change_tempo_by_2":")","HAMSTER_set_tempo_to_1":"Entry.Hamster.setTempoTo(","HAMSTER_set_tempo_to_2":")","HAMSTER_set_port_to_1":"Entry.Hamster.setPortTo('","HAMSTER_set_port_to_2":"','","HAMSTER_set_port_to_3":"')","HAMSTER_change_output_by_1":"Entry.Hamster.changeOutputBy('","HAMSTER_change_output_by_2":"',","HAMSTER_change_output_by_3":")","HAMSTER_set_output_to_1":"Entry.Hamster.setOutputTo('","HAMSTER_set_output_to_2":"',","HAMSTER_set_output_to_3":")","HAMSTER_port_a":"A","HAMSTER_port_b":"B","HAMSTER_port_ab":"AB","HAMSTER_analog_input":"AnalogInput","HAMSTER_digital_input":"DigitalInput","HAMSTER_servo_output":"ServoOutput","HAMSTER_pwm_output":"PwmOutput","HAMSTER_digital_output":"DigitalOutput","ALBERT_hand_found":"Entry.Albert.isHandFound()","ALBERT_sensor_leftProximity":"Entry.Albert.getLeftProximity()","ALBERT_sensor_rightProximity":"Entry.Albert.getRightProximity()","ALBERT_sensor_light":"Entry.Albert.getLight()","ALBERT_sensor_battery":"Entry.Albert.getBattery()","ALBERT_sensor_signalStrength":"Entry.Albert.getSignalStrength()","ALBERT_sensor_frontOid":"Entry.Albert.getFrontOid()","ALBERT_sensor_backOid":"Entry.Albert.getBackOid()","ALBERT_sensor_positionX":"Entry.Albert.getPositionX()","ALBERT_sensor_positionY":"Entry.Albert.getPositionY()","ALBERT_sensor_orientation":"Entry.Albert.getOrientation()","ALBERT_move_forward":"Entry.Albert.moveForward()","ALBERT_move_backward":"Entry.Albert.moveBackward()","ALBERT_turn_around_1":"Entry.Albert.turn('","ALBERT_turn_around_2":"')","ALBERT_move_forward_for_secs_1":"Entry.Albert.moveForwardForSecs(","ALBERT_move_forward_for_secs_2":")","ALBERT_move_backward_for_secs_1":"Entry.Albert.moveBackwardForSecs(","ALBERT_move_backward_for_secs_2":")","ALBERT_turn_for_secs_1":"Entry.Albert.turnForSecs('","ALBERT_turn_for_secs_2":"',","ALBERT_turn_for_secs_3":")","ALBERT_change_both_wheels_by_1":"Entry.Albert.changeWheelsBy(","ALBERT_change_both_wheels_by_2":",","ALBERT_change_both_wheels_by_3":")","ALBERT_set_both_wheels_to_1":"Entry.Albert.setWheelsTo(","ALBERT_set_both_wheels_to_2":",","ALBERT_set_both_wheels_to_3":")","ALBERT_change_wheel_by_1":"Entry.Albert.changeWheelBy('","ALBERT_change_wheel_by_2":"',","ALBERT_change_wheel_by_3":")","ALBERT_set_wheel_to_1":"Entry.Albert.setWheelTo('","ALBERT_set_wheel_to_2":"',","ALBERT_set_wheel_to_3":")","ALBERT_stop":"Entry.Albert.stop()","ALBERT_set_pad_size_to_1":"Entry.Albert.setPadSizeTo(","ALBERT_set_pad_size_to_2":",","ALBERT_set_pad_size_to_3":")","ALBERT_set_eye_to_1":"Entry.Albert.setEyeTo('","ALBERT_set_eye_to_2":"','","ALBERT_set_eye_to_3":"')","ALBERT_clear_eye_1":"Entry.Albert.clearEye('","ALBERT_clear_eye_2":"')","ALBERT_body_led_1":"","ALBERT_body_led_2":"body led","ALBERT_front_led_1":"","ALBERT_front_led_2":"front led","ALBERT_color_cyan":"cyan","ALBERT_color_magenta":"magenta","ALBERT_beep":"Entry.Albert.beep()","ALBERT_change_buzzer_by_1":"Entry.Albert.changeBuzzerBy(","ALBERT_change_buzzer_by_2":")","ALBERT_set_buzzer_to_1":"Entry.Albert.setBuzzerTo(","ALBERT_set_buzzer_to_2":")","ALBERT_clear_buzzer":"Entry.Albert.clearBuzzer()","ALBERT_play_note_for_1":"Entry.Albert.playNoteForBeats('","ALBERT_play_note_for_2":"',","ALBERT_play_note_for_3":",","ALBERT_play_note_for_4":")","ALBERT_rest_for_1":"Entry.Albert.restForBeats(","ALBERT_rest_for_2":")","ALBERT_change_tempo_by_1":"Entry.Albert.changeTempoBy(","ALBERT_change_tempo_by_2":")","ALBERT_set_tempo_to_1":"Entry.Albert.setTempoTo(","ALBERT_set_tempo_to_2":")","VARIABLE_variable":"변수","wall":"벽","robotis_common_case_01":"(을)를","robotis_common_set":"(으)로 정하기","robotis_common_value":"값","robotis_common_clockwhise":"시계방향","robotis_common_counter_clockwhise":"반시계방향","robotis_common_wheel_mode":"회전모드","robotis_common_joint_mode":"관절모드","robotis_common_red_color":"빨간색","robotis_common_green_color":"녹색","robotis_common_blue_color":"파란색","robotis_common_on":"켜기","robotis_common_off":"끄기","robotis_common_cm":"제어기","robotis_common_port_1":"포트 1","robotis_common_port_2":"포트 2","robotis_common_port_3":"포트 3","robotis_common_port_4":"포트 4","robotis_common_port_5":"포트 5","robotis_common_port_6":"포트 6","robotis_common_play_buzzer":"연주","robotis_common_play_motion":"실행","robotis_common_motion":"모션","robotis_common_index_number":"번","robotis_cm_custom":"직접입력 주소","robotis_cm_spring_left":"왼쪽 접촉 센서","robotis_cm_spring_right":"오른쪽 접촉 센서","robotis_cm_led_left":"왼쪽 LED","robotis_cm_led_right":"오른쪽 LED","robotis_cm_led_both":"양 쪽 LED","robotis_cm_switch":"선택 버튼 상태","robotis_cm_user_button":"사용자 버튼 상태","robotis_cm_sound_detected":"최종 소리 감지 횟수","robotis_cm_sound_detecting":"실시간 소리 감지 횟수","robotis_cm_ir_left":"왼쪽 적외선 센서","robotis_cm_ir_right":"오른쪽 적외선 센서","robotis_cm_calibration_left":"왼쪽 적외선 센서 캘리브레이션 값","robotis_cm_calibration_right":"오른쪽 적외선 센서 캘리브레이션 값","robotis_cm_clear_sound_detected":"최종소리감지횟수 초기화","robotis_cm_buzzer_index":"음계값","robotis_cm_buzzer_melody":"멜로디","robotis_cm_led_1":"1번 LED","robotis_cm_led_4":"4번 LED","robotis_aux_servo_position":"서보모터 위치","robotis_aux_ir":"적외선센서","robotis_aux_touch":"접촉센서","robotis_aux_brightness":"조도센서(CDS)","robotis_aux_hydro_themo_humidity":"온습도센서(습도)","robotis_aux_hydro_themo_temper":"온습도센서(온도)","robotis_aux_temperature":"온도센서","robotis_aux_ultrasonic":"초음파센서","robotis_aux_magnetic":"자석센서","robotis_aux_motion_detection":"동작감지센서","robotis_aux_color":"컬러센서","robotis_aux_custom":"사용자 장치","robotis_carCont_aux_motor_speed_1":"감속모터 속도를","robotis_carCont_aux_motor_speed_2":", 출력값을","robotis_carCont_calibration_1":"적외선 센서 캘리브레이션 값을","robotis_openCM70_aux_motor_speed_1":"감속모터 속도를","robotis_openCM70_aux_motor_speed_2":", 출력값을","robotis_openCM70_aux_servo_mode_1":"서보모터 모드를","robotis_openCM70_aux_servo_speed_1":"서보모터 속도를","robotis_openCM70_aux_servo_speed_2":", 출력값을","robotis_openCM70_aux_servo_position_1":"서보모터 위치를","robotis_openCM70_aux_led_module_1":"LED 모듈을","robotis_openCM70_aux_custom_1":"사용자 장치를","XBOT_digital":"디지털","XBOT_D2_digitalInput":"D2 디지털 입력","XBOT_D3_digitalInput":"D3 디지털 입력","XBOT_D11_digitalInput":"D11 디지털 입력","XBOT_analog":"아날로그","XBOT_CDS":"광 센서 값","XBOT_MIC":"마이크 센서 값","XBOT_analog0":"아날로그 0번 핀 값","XBOT_analog1":"아날로그 1번 핀 값","XBOT_analog2":"아날로그 2번 핀 값","XBOT_analog3":"아날로그 3번 핀 값","XBOT_Value":"출력 값","XBOT_pin_OutputValue":"핀, 출력 값","XBOT_High":"높음","XBOT_Low":"낮음","XBOT_Servo":"서보 모터","XBOT_Head":"머리(D8)","XBOT_ArmR":"오른 팔(D9)","XBOT_ArmL":"왼 팔(D10)","XBOT_angle":", 각도","XBOT_DC":"바퀴(DC) 모터","XBOT_rightWheel":"오른쪽","XBOT_leftWheel":"왼쪽","XBOT_bothWheel":"양쪽","XBOT_speed":", 속도","XBOT_rightSpeed":"바퀴(DC) 모터 오른쪽(2) 속도:","XBOT_leftSpeed":"왼쪽(1) 속도:","XBOT_RGBLED_R":"RGB LED 켜기 R 값","XBOT_RGBLED_G":"G 값","XBOT_RGBLED_B":"B 값","XBOT_RGBLED_color":"RGB LED 색","XBOT_set":"로 정하기","XBOT_c":"도","XBOT_d":"레","XBOT_e":"미","XBOT_f":"파","XBOT_g":"솔","XBOT_a":"라","XBOT_b":"시","XBOT_melody_ms":"초 연주하기","XBOT_Line":"번째 줄","XBOT_outputValue":"출력 값","CALC_rotation_value":"this.getRotation()","CALC_direction_value":"this.getDirection()","VARIABLE_is_included_in_list":"리스트에 포함되어 있는가?","VARIABLE_is_included_in_list_1":"Entry.isExistValueInList(","VARIABLE_is_included_in_list_2":",","VARIABLE_is_included_in_list_3":")","SCENE_when_scene_start":"this.addEventListener('sceneStart')","SCENE_start_scene_1":"Scene.changeScene(","SCENE_start_scene_2":")","SCENE_start_neighbor_scene_1":"Scene.changeScene(","SCENE_start_neighbor_scene_2":")","SCENE_start_scene_pre":"Scene.getPrevious()","SCENE_start_scene_next":"Scene.getNext()","FUNCTION_explanation_1":"이름","FUNCTION_character_variable":"문자/숫자값","FUNCTION_logical_variable":"판단값","FUNCTION_function":"함수","FUNCTION_define":"함수 정의하기","CALC_calc_operation_sin":"Math.sin(value)","CALC_calc_operation_cos":"Math.cos(value)","CALC_calc_operation_tan":"Math.tan(value)","CALC_calc_operation_floor":"Math.floor(value)","CALC_calc_operation_ceil":"Math.ceil(value)","CALC_calc_operation_round":"Math.round(value)","CALC_calc_operation_factorial":"펙토리얼값","CALC_calc_operation_asin":"Math.asin(value)","CALC_calc_operation_acos":"Math.acos(value)","CALC_calc_operation_atan":"Math.atan(value)","CALC_calc_operation_log":"로그값","CALC_calc_operation_ln":"자연로그값","CALC_calc_operation_natural":"integer value","CALC_calc_operation_unnatural":"소수점 부분","MOVING_locate_object_time_1":"","MOVING_locate_object_time_2":"초 동안","MOVING_locate_object_time_3":"위치로 이동하기","wall_up":"위쪽 벽","wall_down":"아래쪽 벽","wall_right":"오른쪽 벽","wall_left":"왼쪽 벽","CALC_coordinate_x_value":"x 좌푯값","CALC_coordinate_y_value":"y 좌푯값","CALC_coordinate_rotation_value":"방향","CALC_coordinate_direction_value":"이동방향","CALC_picture_index":"모양 번호","CALC_picture_name":"모양 이름","FLOW_repeat_while_true_1":"Repeat","FLOW_repeat_while_true_2":"","TUT_when_start":"Entry.addEventListener('run_button_clicked')","TUT_move_once":"Entry.moveOnce()","TUT_rotate_left":"Entry.rotateLeft()","TUT_rotate_right":"Entry.rotateRight()","TUT_jump_barrier":"Entry.jumpBarrier()","TUT_repeat_tutorial_1":"Entry.repeat(","TUT_repeat_tutorial_2":")","TUT_if_barrier_1":"if (","TUT_if_barrier_2":")","TUT_if_conical_1":"if (","TUT_if_conical_2":")","TUT_repeat_until":"while (Entry.reachToPart()) {}","TUT_repeat_until_gold":"while (Entry.reachToPart()) {}","TUT_declare_function":"new function()","TUT_call_function":"call function()","CALC_calc_operation_abs":"절댓값","CONTEXT_COPY_option":"코드 복사","Delete_Blocks":"코드 삭제","Duplication_option":"코드 복사 & 붙여넣기","Paste_blocks":"붙여넣기","Clear_all_blocks":"모든 코드 삭제하기","transparency":"투명도","BRUSH_change_brush_transparency_1":"this.brush.opacity -=","BRUSH_change_brush_transparency_2":"","BRUSH_set_brush_transparency_1":"this.brush.opacity -=","BRUSH_set_brush_transparency_2":"","CALC_char_at_1":"","CALC_char_at_2":".charAt(","CALC_char_at_3":")","CALC_length_of_string_1":"","CALC_length_of_string_2":".length()","CALC_substring_1":"","CALC_substring_2":".subString(","CALC_substring_3":",","length_of_string":"","CALC_substring_4":")","CALC_replace_string_1":"","CALC_replace_string_2":".replace(","CALC_replace_string_3":",","CALC_replace_string_4":")","CALC_change_string_case_1":"","CALC_change_string_case_2":"","CALC_change_string_case_3":" ","CALC_change_string_case_sub_1":".uppercase()","CALC_change_string_case_sub_2":".lowercase()","CALC_index_of_string_1":"","CALC_index_of_string_2":".indexOf(","CALC_index_of_string_3":")","MOVING_add_direction_by_angle_time_explain_1":"","MOVING_direction_relative_duration_1":"","MOVING_direction_relative_duration_2":"","MOVING_direction_relative_duration_3":"","CALC_get_sound_volume":"Volume","SOUND_sound_from_to_1":"","SOUND_sound_from_to_2":"","SOUND_sound_from_to_3":"","SOUND_sound_from_to_4":"","SOUND_sound_from_to_and_wait_1":"","SOUND_sound_from_to_and_wait_2":"","SOUND_sound_from_to_and_wait_3":"","SOUND_sound_from_to_and_wait_4":"","CALC_quotient_and_mod_1":"","CALC_quotient_and_mod_2":"/","CALC_quotient_and_mod_3":"","CALC_quotient_and_mod_4":" ","CALC_quotient_and_mod_sub_1":"몫","CALC_quotient_and_mod_sub_2":"나머지","self":"자신","CALC_coordinate_size_value":"크기","CALC_choose_project_timer_action_1":"Entry.setTimer(","CALC_choose_project_timer_action_2":")","CALC_choose_project_timer_action_sub_1":"시작하기","CALC_choose_project_timer_action_sub_2":"정지하기","CALC_choose_project_timer_action_sub_3":"초기화하기","LOOKS_change_object_index_1":"Entry.setLayerOrder(this,","LOOKS_change_object_index_2":")","LOOKS_change_object_index_sub_1":"맨 앞으로","LOOKS_change_object_index_sub_2":"앞으로","LOOKS_change_object_index_sub_3":"뒤로","LOOKS_change_object_index_sub_4":"맨 뒤로","FLOW_repeat_while_true_until":"until","FLOW_repeat_while_true_while":"while","copy_block":"블록 복사","delete_block":"블록 삭제","tidy_up_block":"코드 정리하기","block_hi":"안녕!","entry_bot_name":"","hi_entry":"안녕 엔트리!","hi_entry_en":"Hello Entry!","bark_dog":"강아지 짖는 소리","walking_entryBot":"","entry":"엔트리","hello":"안녕","nice":"반가워"};Lang.Buttons={"apply":"적용하기","cancel":"취소","save":"확인","start":"시작","confirm":"확인","delete":"삭제","create":"학급 만들기","done":"완료","accept":"수락","refuse":"거절","yes":"예","button_no":"아니오"};Lang.ko="한국어";Lang.Menus={"no_results_found":"검색 결과가 없습니다.","upload_pdf":"PDF 자료 업로드","select_basic_project":"작품 선택하기","try_it_out":"만들어 보기","go_boardgame":"엔트리봇 보드게임 바로가기","go_cardgame":"엔트리봇 카드게임 바로가기","go_solve":"미션으로 학습하기","go_ws":"엔트리 만들기 바로가기","go_arts":"엔트리 공유하기 바로가기","open_only_shared_lecture":"<b>오픈 강의</b> 페이지에 <b><공개></b> 한 강의만 불러올 수 있습니다. 불러오고자 하는 <b>강의</b>의 <b>공개여부</b>를 확인해 주세요.","already_exist_group":"이미 존재하는 학급 입니다.","cannot_invite_you":"자기 자신을 초대할 수 없습니다.","apply_original_image":"원본 이미지 그대로 적용하기","draw_new_ques":"새로 그리지 페이지로\n이동하시겠습니까?","draw_new_go":"이동하기","draw_new_stay":"이동하지 않기","file_upload_desc_1":"이런 그림은 \n 안돼요!","file_upload_desc_2":"피가 보이고 잔인한 그림","file_upload_desc_3":"선정적인 신체노출의 그림","file_upload_desc_4":"욕이나 저주 등의 불쾌감을 주거나 혐오감을 일으키는 그림","file_upload_desc_5":"* 위와 같은 내용은 이용약관 및 관련 법률에 의해 제재를 받으실 수 있습니다.","lesson_by_teacher":"선생님들이 직접 만드는 강의입니다.","delete_group_art":"학급 공유하기 목록에서 삭제 하시겠습니까?","elementary_short":"초등","middle_short":"중등","edit_share_set_course":"강의 모음 공개범위 수정","share_lesson":"강의 공유하기","share_course":"강의 모음 공유하기","from_list_ko":"을(를)","edit_share_set_lesson":"강의 공개범위 수정","comming_soon":"준비중입니다.","no_class_alert":"선택된 학급이 없습니다. 학급이 없는경우 '나의 학급' 메뉴에서 학급을 만들어 주세요.","students_cnt":"명","defult_class_alert_1":"","defult_class_alert_2":"을(를) \n 기본학급으로 설정하시겠습니까?","default_class":"기본학급입니다.","enter_hw_name":"과제의 제목을 입력해 주세요.","hw_limit_20":"과제는 20개 까지만 만들수 있습니다.","stu_example":"예)\n 홍길동\n 홍길동\n 홍길동","hw_description_limit_200":"생성 과제에 대한 안내 사항을 입력해 주세요. (200자 이내)","hw_title_limit_50":"과제명을 입력해 주세요. (50자 이내)","create_project_class_1":"'만들기 > 작품 만들기' 에서","create_project_class_2":"학급에 공유하고 싶은 작품을 만들어 주세요.","create_lesson_assignment_1":"'만들기> 오픈 강의 만들기'에서 ","create_lesson_assignment_2":"우리 반 과제에 추가하고 싶은 강의를 만들어 주세요.","i_make_lesson":"내가 만드는 강의","lesson_to_class_1":"'학습하기>오픈 강의'에서 우리반","lesson_to_class_2":"과제에 추가하고 싶은 강의를 관심강의로 등록해 주세요.","studying_students":"학습자","lessons_count":"강의수","group_out":"나가기","enter_group_code":"학급코드 입력하기","no_group_invite":"학급 초대가 없습니다.","done_create_group":"개설이 완료되었습니다.","set_default_group":"기본학급 설정","edit_group_info":"학급 정보 관리","edit_done":"수정 완료되었습니다.","alert_group_out":"학급을 정말 나가시겠습니까?","lesson_share_cancel":"강의 공유 취소","lesson_share_cancel_alert":"이(가) 공유된 모든 공간에서 공유를 취소하고 <나만보기>로 변경하시겠습니까? ","lesson_share_cancel_alert_en":"","course_share_cancel":"강의 모음 공유 취소","select_lesson_share":"강의 공유 선택","select_lesson_share_policy_1":"강의를 공유할 공간과","select_lesson_share_policy_2":"저작권 정책을 확인해 주세요.","select_lesson_share_area":"강의 공유 공간을 선택해 주세요","lesson_share_policy":"강의 공유에 따른 엔트리 저작권 정책 동의","alert_agree_share":"공개하려면 엔트리 저작물 정책에 동의하여야 합니다.","alert_agree_all":"모든 항목에 동의해 주세요.","select_course_share":"강의 모음 공유 선택","select_course_share_policy_1":"강의 모음을 공유할 공간과","select_course_share_policy_2":"저작권 정책을 확인해 주세요.","select_course_share_area":"강의 모음 공유 공간을 선택해 주세요","course_share_policy":"강의 모음 공유에 따른 엔트리 저작권 정책 동의","issued":"발급","code_expired":"코드가 만료되었습니다. '코드재발급' 버튼를 누르세요.","accept_class_invite":"학급초대 수락하기","welcome_class":"학급에 오신것을 환영합니다.","enter_info":"자신의 정보를 입력해주세요.","done_group_signup":"학급 가입이 완료되었습니다.","enter_group_code_stu":"선생님께 받은 코드를 입력해주세요.","text_limit_50":"50글자 이하로 작성해 주세요.","enter_class_name":"학급 이름을 입력해 주세요.","enter_grade":"학년을 입력해 주세요.","enter_class_info":"학급소개를 입력해 주세요.","student_dup":"은(는) 이미 학급에 존재합니다.","select_stu_print":"출력할 학생을 선택하세요.","class_id_not_exist":"학급 ID가 존재하지 않습니다.","error_try_again":"오류 발생. 다시 한 번 시도해 주세요.","code_not_available":"유효하지 않은 코드입니다.","gnb_create_lessons":"오픈 강의 만들기","study_lessons":"강의 학습하기","lecture_help_1":"학습을 시작할 때, 사용할 작품을 선택해 주세요.<br>선택한 작품으로 학습자가 학습을 시작하게 됩니다.","lecture_help_2":"이도움말을 다시 보시려면<br>위 버튼을 클릭해 주세요.","lecture_help_3":"오브젝트 추가하기가 없으면<br>새로운 오브젝트를 추가하거나 삭제 할 수 없습니다.","lecture_help_4":"학습도중에 PDF자료보기를 통해<br>학습에 도움을 받을 수 있습니다.","lecture_help_5":"학습에 필요한 블록들만 선택해주세요.<br>선택하지 않은 블록은 숨겨집니다.","only_pdf":".pdf형식의 파일만 입력 가능합니다.","enter_project_video":"적어도 하나의 작품이나 영상을 입력하세요.","enter_title":"제목을 입력하세요.","enter_recommanded_grade":"추천 학년을 입력하세요.","enter_level_diff":"난이도를 입력하세요.","enter_time_spent":"소요시간을 입력하세요.","enter_shared_area":"적어도 하나의 공유 공간을 선택하세요.","enter_goals":"학습목표를 입력하세요.","enter_lecture_description":"강의 설명을 입력하세요.","enter_curriculum_description":"강의 모음 설명을 입력하세요.","first_page":"처음 입니다.","last_page":"마지막 페이지 입니다.","alert_duplicate_lecture":"이미 등록된 강의는 다시 등록할 수 없습니다.","enter_lesson_alert":"하나 이상의 강의를 등록해주세요.","open_edit_lessons":"편집할 강의를 불러오세요.","saved_alert":"이(가) 저장되었습니다.","select_lesson_type":"어떤 학습과정을 만들지 선택해 주세요 ","create_lesson":"강의 만들기","create_lesson_desc_1":"원하는 학습 목표에 맞춰","create_lesson_desc_2":"단일 강의를 만들어","create_lesson_desc_3":"학습에 활용합니다.","create_courseware":"강의 모음 만들기","create_courseware_desc_1":"학습 과정에 맞춰 여러개의 강의를","create_courseware_desc_2":"하나의 코스로 만들어","create_courseware_desc_3":"학습에 활용합니다.","create_open_lesson":"오픈 강의 만들기 ","enter_lesson_info":"강의 정보 입력 ","select_lesson_feature":"학습 기능 선택 ","check_info_entered":"입력 정보 확인 ","enter_lefo_lesson_long":"강의를 구성하는 정보를 입력해 주세요.","lesson_info_desc":"학습자가 학습하기 화면에서 사용할 기능과 작품을 선택함으로써, 학습 목표와 내용에 최적화된 학습환경을 구성할 수 있습니다.","provide_only_used":"완성된 작품에서 사용된 기능만 불러오기","see_help":"도움말 보기","select_done_project_1":"학습자가 목표로 설정할","select_done_project_2":"완성 작품","select_done_project_3":"을 선택해 주세요.","select_project":"나의 작품 또는 관심 작품을 불러옵니다. ","youtube_desc":"유투브 공유 링크를 통해 원하는 영상을 넣을 수 있습니다.","lesson_video":"강의 영상","lesson_title":"강의 제목","recommended_grade":"추천학년","selection_ko":"선택","selection_en":"","level_of_diff":"난이도","select_level_of_diff":"난이도 선택","enter_lesson_title":"강의 제목을 입력해 주세요(30자 이내)","select_time_spent":"소요시간 선택 ","time_spent":"소요시간","lesson_overview":"강의설명","upload_materials":"학습 자료 업로드","open":"불러오기","cancel":"취소하기","upload_lesson_video":"강의 영상 업로드","youtube_upload_desc":"유투브 공유링크를 통해 보조영상을 삽입할 수 있습니다. ","cancel_select":"선택 취소하기","select_again":"다시 선택하기","goal_project":"완성작품","upload_study_data":"학습하기 화면에서 볼 수 있는 학습자료를 업로드해주세요. 학습자가 업로드된 학습자료의 내용을 확인하며 학습할 수 있습니다. ","upload_limit_20mb":"20MB 이하의 파일을 올려주세요.","expect_time":"예상 소요 시간","course_videos":"보조 영상","enter_courseware_info":"강의 모음 정보 입력 ","enter_course_info":"강의 모음을 소개하는 정보를 입력해 주세요 ","select_lessons_for_course":"강의 모음을 구성하는 강의를 선택해 주세요.","course_build_desc_1":"강의는","course_build_desc_2":"최대30개","course_build_desc_3":"등록할 수 있습니다.","lseeon_list":"강의 목록 보기","open_lessons":"강의 불러오기","course_title":"강의 모음 제목","title_limit_30":"강의 모음 제목을 입력해 주세요(30자 이내) ","course_overview":"강의 모음 설명","charactert_limit_200":"200자 이내로 작성할 수 있습니다.","edit_lesson":"강의 편집","courseware_by_teacher":"선생님들이 직접 만드는 강의 모음입니다.","select_lessons":"구성 강의 선택","check_course_info":"강의 모음을 구성하는 정보가 올바른지 확인해 주세요.","select_share_area":"공유 공간 선택","upload_sub_project":"보조 프로젝트 업로드","file_download":"첨부파일 다운로드","check_lesson_info":"강의를 구성하는 정보가 올바른지 확인해 주세요.","share_area":"공유 공간","enter_sub_project":"엔트리 보조 프로젝트를 등록해 주세요.","lms_hw_title":"과제 제목","lms_hw_ready":"준비","lms_hw_progress":"진행중","lms_hw_complete":"완료","lms_hw_not_submit":"미제출","lms_hw_closed":"제출마감","submission_condition":"진행중인 과제만 제출이 가능합니다.","submit_students_only":"학생만 과제를 제출할 수 있습니다.","want_submit_hw":"과제를 제출하시겠습니까?","enter_correct_id":"올바른 아이디를 입력해 주세요.","id_not_exist":"아이디가 존재하지 않습니다. ","agree_class_policy":"학급 서비스 이용약관에 동의해 주세요.","delete_class":"학급 삭제","type_stu_name":"학생 이름을 입력해주세요. ","invite_from_1":"에서","invite_from_2":"님을 초대하였습니다. ","lms_pw_alert_1":"학급에 소속되면, 선생님 권한으로","lms_pw_alert_2":"비밀번호 재발급이 가능합니다.","lms_pw_alert_3":"선생님의 초대가 맞는지 한번 더 확인해주세요.","invitation_accepted":"초대 수락이 완료되었습니다!","cannot_issue_pw":"초대를 수락하지 않았으므로 비밀번호를 발급할 수 없습니다.","start_me":"<월간 엔트리>와 함께 SW교육을 시작해보세요!","monthly_desc_1":"<월간 엔트리>는 소프트웨어 교육에 익숙하지 않은 선생님들도 쉽고 재미있게","monthly_desc_2":"소프트웨어 교육을 하실 수 있도록 만들어진 SW교육 잡지입니다.","monthly_desc_3":"매월 재미있는 학습만화와 함께 하는 SW 교육 컨텐츠를 만나보세요!","sw_lead_school":"SW 선도・연구학교라면?","me_subscribe":"구독 신청","pizza_event":"피자 이벤트 참여","event_confirm":"이벤트 당첨 확인","monthly_entry":"월간 엔트리","me_desc_1":"매월 발간되는 무료 소프트웨어 교육잡지","me_desc_2":"월간엔트리를 만나보세요!","solve_desc_1":"게임을 하듯 미션을 해결하며","solve_desc_2":"소프트웨어의 기본 원리를 배워보세요!","playSw_desc_1":"EBS 방송영상, 특별영상을 통해","playSw_desc_2":"소프트웨어를 배워보세요!","recommended_lessons":"추천 강의모음","recommended_lessons_1":"기초부터 고급까지 교재와 함께 제공되는","recommended_lessons_2":"추천 강의모음을 만나보세요!","offline_top_desc_1":"오프라인 버전의 저장 기능이 향상되고 보안이 강화되었습니다.","offline_top_desc_2":"지금 바로 다운받으세요","offline_main_desc":"엔트리 오프라인 에디터 업데이트!!","art_description":"엔트리로 만든 작품을 공유하는 공간입니다. 작품을 만들고 공유에 참여해 보세요.","study_index":"엔트리에서 제공하는 주제별, 학년별 학습과정을 통해 차근차근 소프트웨어를 배워보세요!","study_for_beginner":"처음 시작하는 사람들을 위한 엔트리 학습과정","entrybot_desc_3":"안내에 따라 블록 명령어를 조립하여","entrybot_desc_4":"엔트리봇을 학교에 데려다 주세요.","move_entrybot":"엔트리봇 움직이기","can_change_entrybot_1":"블록 명령어로 엔트리봇의 색을 바꾸거나","can_change_entrybot_2":"말을 하게 할 수도 있어요.","learning_process_by_topics":"주제별 학습과정","show_detail":"자세히 보기","solve_mission":"미션 해결하기","solve_mission_desc_1":"게임을 하듯 미션을 해결하며 프로그래밍의 원리를 익혀보세요!","solve_mission_desc_2":"미로 속의 엔트리봇을 목적지까지 움직이며 순차, 반복, 선택, 비교연산, 함수 등의 개념을 자연스럽게 익힐 수 있어요.","learning_process_by_grades":"학년별 추천 학습과정","e3_to_e4":"초등 3-4학년","e5_to_e6":"초등 5-6학년","m1_to_m3":"중등 이상","make_using_entry":"엔트리로 만들기","make_using_entry_desc_1":"블록을 쌓아 여러 가지 소프트웨어를 만들어보세요!","make_using_entry_desc_2":"제공되는 교재를 다운받아 차근차근 따라하다보면 애니메이션, 미디어아트, 게임 등 다양한 작품을 만들 수 있어요.","make_through_ebs_1":"EBS 방송영상으로 소프트웨어를 배워보세요.","make_through_ebs_2":"방송영상은 물론, 차근차근 따라 할 수 있는 특별영상과 함께 누구나 쉽게 다양한 소프트웨어를 만들 수 있어요.","support_block_js":"모든 미션에 대한 자바스크립트 언어는 8월 중 지원 예정입니다.","study_ebs_title_1":"순서대로! 차례대로!","study_ebs_desc_1":"[실습] 엔트리봇의 심부름","study_ebs_title_2":"쉽고 간단하게!","study_ebs_desc_2":"[실습] 꽃송이 만들기","study_ebs_title_3":"언제 시작할까?","study_ebs_desc_3":"[실습] 동물가족 소개","study_ebs_title_4":"다른 선택, 다른 결과!","study_ebs_desc_4":"[실습] 텔레파시 게임","study_ebs_title_5":"정보를 담는 그릇","study_ebs_desc_5":"[실습] 덧셈 로봇 만들기","study_ebs_title_6":"요모조모 따져 봐!","study_ebs_desc_6":"[실습] 복불복 룰렛","study_ebs_title_7":"번호로 부르면 편해요!","study_ebs_desc_7":"[실습] 나만의 버킷리스트","study_ebs_title_8":"무작위 프로그램을 만들어라!","study_ebs_desc_8":"[실습] 무작위 캐릭터 만들기","study_ebs_title_9":"어떻게 찾을까?","study_ebs_desc_9":"[실습] 도서관 책 검색","study_ebs_title_10":"줄을 서시오!","study_ebs_desc_10":"[실습] 키 정렬 프로그램","event":"이벤트","divide":"분기","condition":"조건","random_number":"무작위수","search":"탐색","sorting":"정렬","parallel":"병렬","signal":"신호","input_output":"입출력","sequential":"순차","repeat":"반복","choice":"선택","repeat_advanced":"반복(횟수+조건)","function":"함수","compare_operation":"비교연산","arithmetic":"산술연산","entrybot_school":"엔트리봇 학교 가는 길","entrybot_school_desc_1":"엔트리봇이 책가방을 챙겨 학교에","entrybot_school_desc_2":"도착할 수 있도록 도와주세요!","robot_factory":"로봇 공장","robot_factory_desc_1":"로봇공장에 갇힌 엔트리봇!","robot_factory_desc_2":"탈출하기 위해 부품을 모두 모아야해요.","electric_car":"전기 자동차","electric_car_desc_1":"엔트리봇 자동차가 계속 앞으로 나아갈 수","electric_car_desc_2":"있도록 연료를 충전해 주세요.","forest_adventure":"숲속 탐험","forest_adventure_desc_1":"엔트리봇 친구가 숲속에 갇혀있네요!","forest_adventure_desc_2":"친구를 도와주세요.","town_adventure":"마을 탐험","town_adventure_desc_1":"배고픈 엔트리봇을 위해 마을에 있는","town_adventure_desc_2":"연료를 찾아주세요.","space_trip":"우주 여행","space_trip_desc_1":"우주탐사를 마친 엔트리봇!","space_trip_desc_2":"지구로 돌아갈 수 있도록 도와주세요.","learn_programming_mission":"미션을 해결하며 배우는 프로그래밍","make_open_lecture":"오픈 강의 만들기","group_created":"만든 학급","group_signup":"가입한 학급","delete_from_list":"을(를) 목록에서 삭제하시겠습니까?","delete_from_list_en":"","lecture_collection":"강의 모음","edit_mypage_profile":"자기소개 정보 관리","main_image":"메인 이미지","edit_profile_success":"반영되었습니다.","no_project_1":"내가 만든 작품이 없습니다.","no_project_2":"지금 작품 만들기를 시작해보세요!","no_marked_project_1":"관심 작품이 없습니다.","no_marked_project_2":"'작품 공유하기'에서 다양한 작품을 만나보세요!","view_project_all":"작품 구경하기","no_lecture_1":"내가 만든 강의가 없습니다.","no_lecture_2":"'오픈 강의 만들기'에서 강의를 만들어보세요!","no_marked_lecture_1":"관심 강의가 없습니다.","no_marked_lecture_2":"'오픈 강의'에서 다양한 강의를 만나보세요!","view_lecture":"강의 살펴보기","no_studying_lecture_1":"학습 중인 강의가 없습니다.","no_studying_lecture_2":"'오픈 강의'에서 학습을 시작해보세요!","no_lecture_collect_1":"내가 만든 강의 모음이 없습니다.","no_lecture_collect_2":"'오픈 강의 모음 만들기'에서 강의 모음을 만들어보세요!","make_lecture_collection":"강의 모음 만들기","no_marked_lecture_collect_1":"관심 강의 모음이 없습니다.","no_marked_lecture_collect_2":"'오픈 강의'에서 다양한 강의를 만나보세요!","view_lecture_collection":"강의 모음 살펴보기","no_studying_lecture_collect_1":"학습 중인 강의 모음이 없습니다.","no_studying_lecture_collect_2":"'오픈 강의'에서 학습을 시작해보세요!","my_lecture":"나의 강의","marked_lecture":"관심 강의","marked_lecture_collection":"나의 관심 강의 모음","studying_lecture":"학습 중인 강의","completed_lecture":"학습 완료 강의","my_lecture_collection":"나의 강의 모음","studying_lecture_collection":"학습 중인 강의 모음","completed_lecture_collection":"학습 완료한 강의 모음","materialCC":"엔트리교육연구소에서 작성된 모든 교육자료는 CC-BY 2.0 라이선스에 따라 자유롭게 이용할 수 있습니다.","pdf":"PDF","helper":"도움말","youtube":"영상","tvcast":"영상","goal":"목표","basicproject":"시작단계","hw":"하드웨어","object":"오브젝트","download_info":"모든 교육자료는 각각의 제목을 클릭 하시면 다운받으실 수 있습니다.","entry_materials_all":"엔트리 교육자료 모음","recommand_grade":"추천학년","3_4_grades":"3-4 학년","5_6_grades":"5-6 학년","middle_grades":"중학생 이상","entry_go_go":"엔트리 고고!","entry_go_go_desc":"학년별, 난이도 별로 준비된 교재를 만나보세요. 각 과정별로 교육과정, 교재, 교사용 지도자료 3종 세트가 제공됩니다.","stage_beginner":"초급","stage_middle":"중급","stage_high":"고급","middle_school_short":"중등","learn_entry_programming":"따라하며 배우는 엔트리 프로그래밍","entry_programming_desc":"차근차근 따라 하다 보면 어느새 나도 엔트리 고수!","ebs":"EBS","ebs_material_desc":"방송 영상과 교사용 지도서를 활용하여 수업을 해보세요!","season_1_material":"시즌1 교사용 지도서","season_2_material":"시즌2 교사용 지도서","compute_think_textbook":"교과서로 배우는 컴퓨팅 사고력","computational_sw":"국어, 수학, 과학, 미술... 학교에서 배우는 다양한 교과와 연계하여 sw를 배워보세요!","entry_x_hardware":"엔트리 X 하드웨어 교육자료 모음","e_sensor":"E 센서보드","arduino":"아두이노","orange_board":"오렌지보드","joystick":"오렌지보드(조이스틱)","materials_etc_all":"기타 교육자료 모음","materials_teaching":"교원 연수 자료","materials_etc":"기타 참고 자료","materials_teaching_1":"SW교육의 필요성과 교육 방법론","materials_teaching_2":"엔트리와 함께하는 언플러그드 활동","materials_teaching_3":"게임으로 배우는 엔트리 학습모드 활동","materials_teaching_4":"실생활 문제해결을 위한 엔트리 프로그래밍","materials_teaching_5":"엔트리로 시작하는 교과연계sw교육1","materials_teaching_6":"엔트리로 시작하는 교과연계sw교육2","materials_teaching_7":"피지컬 컴퓨팅 실습1(E센서보드)","materials_teaching_8":"피지컬 컴퓨팅 실습2(햄스터)","materials_teaching_9":"수업에 필요한 학급/강의 기능 알아보기","materials_etc_1":"수업에 바로 활용할 수 있는 다양한 콘텐츠 모음집","materials_etc_2":"엔트리를 처음 사용하는 선생님들을 위한 가이드","materials_etc_3":"월간 엔트리","materials_etc_4":"엔트리 설명서","materials_etc_5":"엔트리 소개 자료","materials_etc_6":"엔트리 블록 책받침","jr_if_1":"만약","jr_if_2":"앞에 있다면","jr_fail_no_pencil":"이런 그곳에는 연필이 없어. 연필이 있는 곳에서 사용해보자~","jr_fail_forgot_pencil":"앗! 책가방에 넣을 연필을 깜빡했어. 연필을 모아서 가자~","jr_fail_much_blocks":"너무많은 블록을 사용했어, 다시 도전해볼래?","cparty_jr_success_1":"좋아! 책가방을 챙겼어!","go_right":"오른쪽","go_down":"  아래쪽","go_up":"  위쪽","go_left":"  왼쪽","go_forward":"앞으로 가기","jr_turn_left":"왼쪽으로 돌기","jr_turn_right":"오른쪽으로 돌기","go_slow":"천천히 가기","repeat_until_reach_1":"만날 때 까지 반복하기","repeat_until_reach_2":"","pick_up_pencil":"연필 줍기","repeat_0":"","repeat_1":"반복","when_start_clicked":"시작 버튼을 눌렀을 때","age_0":"작품체험","create_character":"캐릭터 만들기","age_7_9":"초등 저학년","going_school":"엔트리 학교가기","age_10_12_1":"초등 고학년1","collect_parts":"로봇공장 부품모으기","age_10_12_2":"초등 고학년2","driving_elec_car":"전기자동차 운전하기","age_13":"중등","travel_space":"우주여행하기","people":"사람","all":"전체","life":"일상생활","nature":"자연","animal_insect":"동물/곤충","environment":"자연환경","things":"사물","vehicles":"이동수단","others":"기타","fantasy":"판타지","instrument":"악기","piano":"피아노","marimba":"마림바","drum":"드럼","janggu":"장구","sound_effect":"효과음","others_instrument":"기타타악기","aboutEntryDesc_1":"엔트리는 누구나 무료로 소프트웨어 교육을 받을 수 있게 개발된 소프트웨어 교육 플랫폼입니다.","aboutEntryDesc_2":"학생들은 소프트웨어를 쉽고 재미있게 배울 수 있고,","aboutEntryDesc_3":"선생님은 효과적으로 학생들을 가르치고 관리할 수 있습니다.","aboutEntryDesc_4":"엔트리는 공공재와 같이","aboutEntryDesc_5":"비영리로 운영됩니다.","viewProjectTerms":"이용정책 보기","openSourceTitle":"오픈소스를 통한 생태계 조성","openSourceDesc_1":"엔트리의 소스코드 뿐 아니라","openSourceDesc_2":"모든 교육 자료는 CC라이센스를 ","openSourceDesc_3":"적용하여 공개합니다.","viewOpenSource":"오픈소스 보기","eduPlatformTitle":"국내교육 현장에 맞는 교육 플랫폼","eduPlatformDesc_1":"국내 교육 현장에 적합한 교육 도구가","eduPlatformDesc_2":"될 수 있도록 학교 선생님들과 함께","eduPlatformDesc_3":"개발하고 있습니다.","madeWith":"자문단","researchTitle":"다양한 연구를 통한 전문성 강화","researchDesc_1":"대학/학회 등과 함께 다양한 연구를","researchDesc_2":"진행하여 전문성을 강화해나가고","researchDesc_3":"있습니다.","viewResearch":"연구자료 보기","atEntry":"엔트리에서는","entryLearnDesc_1":"재미있게 배우는 학습공간","entryLearnDesc_2":"<학습하기>에서는 컴퓨터를 활용해 논리적으로 문제를 해결할 수 있는 다양한 학습","entryLearnDesc_3":"콘텐츠가 준비되어 있습니다. 게임을 하듯이 주어진 미션들을 컴퓨터 프로그래밍으로","entryLearnDesc_4":"해결하고, 동영상을 보면서 소프트웨어의 원리를 재미있게 배울 수 있습니다.","entryMakeDesc_1":"<만들기>에서는 미국 MIT에서 개발한 Scratch와 같은 블록형 프로그래밍 언어를","entryMakeDesc_2":"사용하여 처음 접하는 사람들도 쉽게 자신만의 창작물을 만들 수 있습니다.","entryShareDesc_1":"<공유하기>에서는 엔트리를 통해 제작한 작품을 다른 사람들과 공유할 수 있습니다.","entryShareDesc_2":"공유된 작품이 어떻게 구성되었는지 살펴볼 수 있고, 이를 발전시켜 또 다른 작품을 만들 수","entryShareDesc_3":"있습니다. 또한 친구들과 협업해 더 멋진 작품을 만들 수도 있습니다.","entryGroup":"학급기능","entryGroupTitle":"우리 반 학습 공간","entryGroupDesc_1":"<학급기능>은 선생님께서 학급별로 학생들을 관리할 수 있는 기능입니다.","entryGroupDesc_2":"학급만의 학습하기, 만들기, 공유하기를 만들 수 있으며, 과제를 만들고","entryGroupDesc_3":"학생들의 결과물을 확인할 수 있습니다.","unpluggedToPhysical":"언플러그드 활동부터 피지컬 컴퓨팅까지","algorithmActivity":"기초 알고리즘 활동","programmignLang":"교육용 프로그래밍 언어","unpluggedDesc_1":"엔트리봇 보드게임과 카드게임을 통해 컴퓨터 없이도","unpluggedDesc_2":"소프트웨어의 기본 개념과 원리(순차, 반복, 선택, 함수)를 익힐 수 있습니다.","entryMaze":"엔트리봇 미로탈출","entryAI":"엔트리봇 우주여행","algorithmDesc_1":"게임을 하듯이 미션을 해결하고 인증서를 받아보세요.","algorithmDesc_2":"소프트웨어의 기본적인 원리를 쉽고 재미있게 배울 수 있습니다.","programmingLangDesc_1":"엔트리에서는 블록을 쌓듯이 프로그래밍을 하기 때문에 누구나 쉽게","programmingLangDesc_2":"자신만의 게임, 애니메이션, 미디어아트와 같은 멋진 작품을 만들고 공유할 수 있어 교육용으로 적합합니다.","viewSupporHw":"연결되는 하드웨어 보기","supportHwDesc_1":"엔트리와 피지컬 컴퓨팅 도구를 연결하면 현실세계와 상호작용하는 멋진 작품들을 만들어낼 수 있습니다.","supportHwDesc_2":"국내, 외 다양한 하드웨어 연결을 지원하며, 계속적으로 추가될 예정입니다.","entryEduSupport":"엔트리 교육 지원","eduSupportDesc_1":"엔트리교육연구소에서는 소프트웨어 교육을 위한 다양한 교육 자료를 제작하여 무상으로 배포하고 있습니다.","eduSupportDesc_2":"모든 자료는 교육자료 페이지에서 다운받으실 수 있습니다.","materials_1_title":"수준별 교재","materials_1_desc_1":"학년별 수준에 맞는 교재를 통해 차근차근","materials_1_desc_2":"따라하며 쉽게 엔트리를 익혀보세요!","materials_2_title":"EBS 방송 연계 교안","materials_2_desc_1":"EBS 소프트웨어야 놀자 방송과 함께","materials_2_desc_2":"교사용 수업 지도안을 제공합니다.","materials_3_title":"초, 중등 교과 연계 수업자료","materials_3_title_2":"","materials_3_desc_1":"다양한 과목에서 만나는 실생활 문제를","materials_3_desc_2":"컴퓨팅 사고력으로 해결해 보세요.","moreMaterials":"더 많은 교육 자료 보러가기","moreInfoAboutEntry_1":"더 많은 엔트리의 소식들을 확인하고 싶다면 아래의 링크들로 접속해보세요.","moreInfoAboutEntry_2":"교육자료 외에도 다양한 SW 교육과 관련한 정보를 공유하고 있습니다.","blog":"블로그","post":"포스트","tvCast":"TV캐스트","albertSchool":"알버트 스쿨버전","arduinoBoard":"아두이노 정품보드","arduinoCompatible":"아두이노 호환보드","bitBlock":"비트블록","bitbrick":"비트브릭","codeino":"코드이노","e-sensor":"E-센서보드","e-sensorUsb":"E-센서보드(유선연결)","e-sensorBT":"E-센서보드(무선연결)","hamster":"햄스터","littlebits":"리틀비츠","orangeBoard":"오렌지 보드","robotis_carCont":"로보티즈 로봇자동차","robotis_IoT":"로보티즈 IoT","dplay":"디플레이","nemoino":"네모이노","Xbot":"엑스봇 엣지 USB","XbotBT":"엑스봇 에뽀/엣지 블투투스","Neobot":"네오봇","about":"알아보기","articles":"토론하기","gallery":"구경하기","learn":"학습하기","login":"로그인","logout":"로그아웃","make":"만들기","register":"가입하기","Join":"회원가입","Edit_info":"내 정보 수정","Discuss":"글 나누기","Explore":"구경하기","Load":"불러오기","My_lesson":"오픈 강의","Resources":"교육 자료","play_software":"소프트웨어야 놀자!","problem_solve":"엔트리 학습하기","Learn":"학습하기","teaching_tools":"엔트리 교구","about_entry":"엔트리 소개","what_entry":"엔트리는?","create":"만들기","create_new":"새로 만들기","start_programming":"소프트웨어 교육의 첫걸음","Entry":"엔트리","intro_learning":"누구나 쉽고 재밌게 소프트웨어를 배울 수 있어요. ","intro_learning_anyone":"지금 바로 시작해보세요! ","start_now":"For Free, Forever.","welcome_entry":"엔트리에 오신걸 환영합니다.","student":"학생","non_menber":"일반인","teacher":"선생님","terms_conditions":"이용약관","personal_information":"개인정보 수집 및 이용에 대한 안내","limitation_liability":"책임의 한계와 법적 고지","entry_agree":"엔트리의 이용약관에 동의 합니다.","info_agree":"개인정보 수집 및 이용에 동의합니다.","next":"다음","enter_id":"아이디 입력","enter_password":"비밀번호 입력","confirm_password":"비밀번호 확인","enter_password_again":"비밀번호를 한번 더 입력하세요.","validation_password":"5자 이상의 영문/숫자 등을 조합하세요.","validation_id":"4~20자의 영문/숫자를 조합하세요","prev":"이전","born_year":"태어난 연도","select_born":"태어난 연도를 선택 하세요","year":"년","gender":"성별","choose_gender":"성별을 선택 하세요","male":"남성","female":"여성","language":"언어","best_language":"주 언어를 선택 하세요","korean":"한국어","english":"영어","viet":"베트남","option_email":"이메일(선택)","insert_email":"이메일 주소를 입력 하세요","sign_up_complete":"회원 가입이 완료 되었습니다","agree_terms_conditions":"이용약관에 동의해 주세요.","agree_personal_information":"개인정보 수집 및 이용에 대한 안내에 동의해 주세요.","insert_studying_stage":"작품을 공유하고 싶은 그룹을 선택해 주세요.","insert_born_year":"태어난 연도를 입력해 주세요.","insert_gender":"성별을 입력해 주세요.","select_language":"언어를 선택해 주세요.","check_email":"이메일 형식을 확인해 주세요.","already_exist_id":"이미 존재하는 아이디 입니다.","id_validation_id":"아이디는 4~20자의 영문/숫자를 조합하세요","password_validate_pwd":"패스워드는 5자 이상의 영문/숫자 등을 조합하세요.","insert_same_pwd":"같은 패스워드를 입력해 주세요.","studying_stage_group":"작품 공유 그룹","studying_stage":"작품을 공유하고 싶은 그룹을 선택해 주세요.","password":"비밀번호 입력","save_id":"아이디 저장","auto_login":"자동 로그인","forgot_password":"아이디와 비밀번호가 기억나지 않으세요 ?","did_not_join":"아직 엔트리 회원이 아니세요?","go_join":"회원가입하기 ","first_step":"소프트웨어 교육의 첫걸음","entry_content_one":"상상했던 것들을 블록 놀이하듯 하나씩 쌓아보세요.","entry_content_two":"게임, 애니메이션, 미디어아트와 같은 멋진 작품이 완성된답니다!","entry_content_three":"재미있는 놀이로 배우고, 나만의 멋진 작품을 만들어 친구들과 공유할 수 있는 멋진 엔트리의 세상으로 여러분을 초대합니다!","funny_space":"재미있게 배우는 학습공간","in_learn_section":"< 학습하기 > 에서는","learn_problem_solving":"컴퓨터를 활용해 논리적으로 문제를 해결할 수 있는 다양한 학습 콘텐츠가 준비되어 있습니다. 게임을 하듯이 주어진 미션들을 컴퓨터 프로그래밍으로 해결해볼 수도 있고 재미있는 동영상으로 소프트웨어의 원리를 배울 수도 있습니다 .","joy_create":"창작의 즐거움","in_make":"< 만들기 > 는","make_contents":"미국 MIT에서 개발한 Scratch와 같은 비주얼 프로그래밍 언어를 사용하여 프로그래밍을 처음 접하는 사람들도 쉽게 나만의 창작물을 만들 수 있습니다. 또 엔트리를 통해 만들 수 있는 컨텐츠의 모습은 무궁무진합니다. 과학 시간에 배운 물리 법칙을 실험해 볼 수도 있고 좋아하는 캐릭터로 애니메이션을 만들거나 직접 게임을 만들어 볼 수 있습니다.","and_content":"또 엔트리를 통해 만들 수 있는 콘텐츠의 모습은 무궁무진합니다. 과학 시간에 배운 물리 법칙을 실험해 볼 수도 있고 좋아하는 캐릭터로 애니메이션을 만들거나 직접 게임을 만들어 볼 수 있습니다.","share_collaborate":"공유와 협업","explore_contents":"< 구경하기 > 에서는 엔트리를 통해 제작한 작품을 다른 사람들과 쉽게 공유할 수 있습니다. 또한 공유된 작품이 어떻게 구성되었는지 살펴볼 수 있고, 이를 발전시켜 자신만의 프로젝트를 만들 수 있습니다. 그리고 엔트리에서는 공동 창작도 가능합니다. 친구들과 협업하여 더 멋진 프로젝트를 만들어볼 수 있습니다.","why_software":"왜 소프트웨어 교육이 필요할까?","speak_obama_contents":"컴퓨터 과학을 배우는 것은 단지 여러분의 미래에만 중요한 일이 아닙니다. 이것은 우리 미국의 미래를 위해 중요한 일 입니다.","obama":"버락 오바마","us_president":"미국 대통령","billgates_contents":"컴퓨터 프로그래밍은 사고의 범위를 넓혀주고 더 나은 생각을 할 수 있게 만들며 분야에 상관없이 모든 문제에 대해 새로운 해결책을 생각할 수 있는 힘을 길러줍니다.","billgates":"빌게이츠","chairman_micro":"Microsoft 회장","eric_contents":"현재 디지털 혁명은 지구상 대부분의 사람들에게 아직 시작도 안된 수준입니다. 프로그래밍을 통해 향후 10년간 모든 것이 변화할 것 입니다.","eric":"에릭 슈미츠","sandbug_contents":"오늘날 컴퓨터 과학에 대한 이해는 필수가 되었습니다. 우리의 국가 경쟁력은 우리가 아이들에게 이것을 얼마나 잘 가르칠 수 있느냐에 달려있습니다.","sandbug":"쉐릴 샌드버그","view_entry_tools":"엔트리와 함께할 수 있는 교구들을 살펴볼 수 있습니다.","solve_problem":"미션 해결하기","solve_problem_content":"게임을 하듯 미션을 하나 하나 해결하며 소프트웨어의 기본 원리를 배워보세요!","find_extra_title":"엔트리봇 부품 찾기 대작전","all_ages":"전 연령","total":"총","step":"단계","find_extra_contents":"로봇 강아지를 생산하던 루츠 공장에 어느 날 갑자기 일어난 정전 사태로 태어난 특별한 강아지 엔트리 봇. 아직 조립이 덜 된 나머지 부품들을 찾아 공장을 탈출 하도록 도와주면서 소프트웨어의 동작 원리를 익혀보자!","software_play_contents":"EBS에서 방영한 '소프트웨어야 놀자' 프로그램을 실습해볼 수 있습니다.","resources_contents":"엔트리를 활용한 다양한 교육자료들을 무료로 제공합니다.","from":" 출처","sw_camp":"미래부 SW 창의캠프","elementary":"초등학교","middle":"중학교","grades":"학년","lesson":"차시","sw_contents_one":"5차시 분량으로 초등학생이 엔트리와 피지컬 컴퓨팅을 경험할  수 있는 교재입니다. 학생들은 엔트리 사용법을 학습하고, 그림판과 이야기 만들기를 합니다. 마지막에는 아두이노 교구를 활용하여 키보드를 만들어보는 활동을 합니다.","sw_camp_detail":"미래창조과학부 SW창의캠프","sw_contents_two":"5차시 분량으로 중학생이 엔트리와 피지컬 컴퓨팅을 경험할 수 있는 교재입니다. 학생들은 엔트리 사용법을 학습하고, 미로찾기 게임과, 퀴즈 프로그램을 만들어 봅니다. 마지막에는 아두이노 교구를 활용하여 키보드로 자동차를 조종하는 활동을 합니다.","sw_contents_three":"선생님들이 학교에서 시작할 수 있는 소프트웨어 수업 지도서입니다. 다양한 언플러그드 활동과, '소프트웨어야 놀자' 방송을 활용한 수업 지도안이 담겨 있습니다.","naver_sw":"NAVER 소프트웨어야 놀자","teacher_teaching":"교사용지도서 (초등학교 5~6학년 이상)","funny_sw":"즐거운 SW놀이 교실","sw_contents_four":"소프트웨어를 놀이하듯 재미있게 배울 수 있는 교재로 엔트리보드게임을 비롯한 다양한 언플러그드 활동과 엔트리 학습모드로 소프트웨어를 만드는 기본 원리를 배우게 됩니다. 기본 원리를 배웠다면 학생들은 이제 엔트리로 이야기, 게임, 예술작품, 응용프로그램을 만드는 방법을 배우고, 자신이 생각한 소프트웨어를 만들고 발표할 수 있도록 교재가 구성되어 있습니다.","ct_text_5":"교과서와 함께 키우는 컴퓨팅 사고력","teacher_grade_5":"교원 (초등학교 5학년)","ct_text_5_content":"실생활의 문제를 해결하자는 테마로 준비된 총 8개의 학습콘텐츠가 담긴 교사용 지도안입니다. 각 콘텐츠는 개정된 교육과정을 반영한 타교과와의 연계를 통해 다양한 문제를 만나고 해결해볼 수 있도록 설계되었습니다.  아이들이 컴퓨팅 사고력을 갖춘 융합형 인재가 될 수 있도록 지금 적용해보세요!","ct_text_6":"교과서와 함께 키우는 컴퓨팅 사고력","teacher_grade_6":"교원 (초등학교 6학년)","ct_text_6_content":"실생활의 문제를 해결하자는 테마로 준비된 총 8개의 학습콘텐츠가 담긴 교사용 지도안입니다. 각 콘텐츠는 개정된 교육과정을 반영한 타교과와의 연계를 통해 다양한 문제를 만나고 해결해볼 수 있도록 설계되었습니다.  아이들이 컴퓨팅 사고력을 갖춘 융합형 인재가 될 수 있도록 지금 적용해보세요!","sw_use":"모든 교재들은 비영리 목적에 한하여 저작자를 밝히고 자유롭게 이용할 수 있습니다.","title":"제목","writer":"작성자","view":"보기","date":"등록일","find_id_pwd":"아이디와 비밀번호 찾기","send_email":"이메일로 비밀번호 변경을 위한 링크를 발송해드립니다.","user_not_exist":"존재하지 않는 이메일 주소 입니다.","not_signup":"아직 회원이 아니세요?","send":"발송하기","sensorboard":"엔트리봇 센서보드","physical_computing":"피지컬 컴퓨팅","sensorboard_contents":"아두이노를 사용하기 위해서 더 이상 많은 케이블을 사용해 회로를 구성할 필요가 없습니다. 엔트리 보드는 아두이노 위에 끼우기만 하면 간단하게 LED, 온도센서, 소리센서, 빛, 슬라이더, 스위치를 활용할 수 있습니다. 이제 엔트리 보드를 활용해 누구라도 쉽게 자신만의 특별한 작품을 만들어보세요!","entrybot_boardgame":"엔트리봇 보드게임","unplugged":"언플러그드 활동","unplugged_contents":"재밌는 보드게임을 통해 컴퓨터의 작동 원리를 배워보세요. 로봇강아지인 엔트리봇이 정전된 공장에서 필요한 부품을 찾아 탈출하도록 돕다보면 컴퓨터 전문가처럼 문제를 바라 볼 수  있게됩니다.","entrybot_cardgame":"엔트리봇 카드게임 : 폭탄 대소동","entrybot_cardgame_contents":"갑자기 엔트리도시에 나타난 12종류의 폭탄들! 과연 폭탄들을 안전하게 해체할 수 있을까요? 폭탄들을 하나씩 해체하며 엔트리 블록과 함께 소프트웨어의 원리를 배워봐요!  순차, 반복, 조건을 통해 폭탄을 하나씩 해체하다 보면 엔트리도시를 구한 영웅이 될 수 있답니다!","basic_learn":"엔트리 기본 학습","basic_learn_contents":"엔트리를 활용한 다양한 교육 콘텐츠를 제공합니다.","troubleshooting":"문제해결 학습","playsoftware":"소프트웨어야 놀자","make_own_lesson":"나만의 수업을 만들어 다른 사람과 공유할 수 있습니다.","lecture":"강의","curriculum":"강의 모음","group_lecture":"우리 반 강의","group_curriculum":"우리 반 강의 모음","group_homework":"우리 반 과제","group_noproject":"전시된 작품이 없습니다.","group_nolecture":"생성된 강의가 없습니다.","group_nocurriculum":"생성된 강의 모음이 없습니다.","lecture_contents":"필요한 기능만 선택하여 나만의 수업을 만들어 볼 수 있습니다.","curriculum_contents":"여러개의 강의를 하나의 강의 모음으로 묶어 차근차근 따라할 수 있는 수업을 만들 수 있습니다.","grade_info":"학년 정보","difficulty":"난이도","usage":"사용요소","learning_concept":"학습개념","related_subject":"연개 교과","show_more":"더보기","close":"닫기","latest":"최신순","viewer":"조회순","like":"좋아요순","comment":"댓글순","entire_period":"전체기간","today":"오늘","latest_week":"최근 1주일","latest_month":"최근 1개월","latest_three_month":"최근 3개월","current_password":"현재 비밀번호","incorrect_password":"비밀번호가 일치하지 않습니다.","new_password":"새로운 비밀번호","password_option_1":"영문과 숫자의 조합으로 5자 이상이 필요합니다.","again_new_password":"새로운 비밀번호 재입력","enter_new_pwd":"새로운 비밀번호를 입력하세요.","enter_new_pwd_again":"새로운 비밀번호를 다시 입력하세요.","password_match":"비밀번호가 일치하지 않습니다.","incorrect_email":"유효한 이메일이 아닙니다","edit_button":"정보수정","edit_profile":"관리","my_project":"나의 작품","my_group":"나의 학급","mark":"관심 작품","prev_state":"이전","profile_image":"자기소개 이미지","insert_profile_image":"프로필 이미지를 등록해 주세요.","at_least_180":"180 x 180 픽셀의 이미지를 권장합니다.","upload_image":"이미지 업로드","about_me":"자기소개","save_change":"변경사항 저장","basic_image":"기본 이미지","profile_condition":"자기소개를 입력해 주세요. 50자 내외","profile_back":"돌아가기","make_project":"작품 만들기","exhibit_project":"작품 전시하기","art_list_shared":"개인","art_list_group_shared":"그룹","view_project":"코드 보기","comment_view":"댓글","upload_project":"올리기","edit":"수정","save_complete":"저장","just_like":"좋아요","share":"공유","who_likes_project":"작품을 좋아하는 사람","people_interest":"작품을 관심있어 하는 사람","none_person":"없음","inserted_date":"등록일","last_modified":"최종 수정일","original_project":"원본 작품","for_someone":"님의","original_project_deleted":"원본 작품이 삭제되었습니다.","delete_project":"삭제","delete_group_project":"목록에서 삭제","currnet_month_time":"월","current_day_time":"일","game":"게임","animation":"애니메이션","media_art":"미디어 아트","physical":"피지컬","etc":"기타","connected_contents":"연계되는 콘텐츠","connected_contents_content":"엔트리와 함께 할 수 있는 다양한 콘텐츠를 만나보세요. 처음 소프트웨어를 배우는 사람이라면 쉽게 즐기는 보드게임부터 아두이노와 같은 피지컬 컴퓨팅을 활용하여 자신만의 고급스러운 창작물을 만들어 볼 수 있습니다.","basic_mission":"기본 미션: 엔트리봇 미로찾기","basic_mission_content":"강아지 로봇을 만드는 공장에서 우연한 정전으로 혼자서 생각할 수 있게 된 엔트리봇! 공장을 탈출하고 자유를 찾을 수 있도록 엔트리봇을 도와주세요!","application_mission":"응용미션: 엔트리봇 우주여행","write_article":"글쓰기","view_all_articles":"모든 글 보기","view_own_articles":"내가 쓴 글 보기","learning_materials":"교육자료","ebs_software_first":"<소프트웨어야 놀자>는 네이버 와 EBS 그리고 엔트리가 함께 만든 교육 콘텐츠입니다. 여기에서는 엔트리를 활용하여 실제로 간단한 프로그램을 만들어보며 소프트웨어의 기초 원리를 배워나갈 수 있습니다. 또한 각 콘텐츠에서는 동영상을 통해 컴퓨터과학에 대한 선행지식이 없더라도 충분히 재미와 호기심을 느끼며 진행할 수 있도록 준비되어있습니다.","go_software":"소프트웨어야 놀자 가기","ebs_context":"EBS 가기","category":"카테고리","add_picture":"사진첨부","upload_article":"글 올리기","list":"목록","report":"신고하기","upload":"올리기","staff_picks":"스태프 선정","popular_picks":"인기 작품","lecture_header_more":"더 만들어 보기","lecture_header_reset":"초기화","lecture_header_reset_exec":"초기화 하기","lecture_header_save":"저장","lecture_header_save_content":"학습내용 저장하기","lecture_header_export_project":"내 작품으로 저장하기","lecture_header_undo":"취소","lecture_header_redo":"복원","lecture_header_bugs":"버그신고","lecture_container_tab_object":"오브젝트","lecture_container_tab_video":"강의 동영상","lecture_container_tab_project":"완성된 작품","lecture_container_tab_help":"블록 도움말","illigal":"불법적인 내용 또는 사회질서를 위반하는 활동","verbal":"언어 폭력 또는 개인 정보를 침해하는 활동","commertial":"상업적인 목적을 가지고 활동","explicit":"음란물","other":"기타","report_result":"결과 회신을 원하시면 메일을 입력해 주세요.","report_success":"신고하기가 정상적으로 처리 되었습니다.","etc_detail":"기타 항목 선택후 입력해주세요.","lecture_play":"강의 보기","list_view_link":"다른 강의 모음 보기","lecture_intro":"강의 소개 보기","study_goal":"학습목표","study_description":"설명","study_created":"등록일","study_last_updated":"최종 수정일","study_remove":"삭제","study_group_lecture_remove":"목록에서 삭제","study_group_curriculum_remove":"목록에서 삭제","study_edit":"강의 모음 수정","study_comments":"댓글","study_comment_post":"올리기","study_comment_remove":"삭제","study_comment_edit":"수정","study_comment_save":"저장","study_guide_video":"안내 영상","study_basic_project":"기본 작품","study_done_project":"완성 작품을 선택하세요.","study_usage_element":"사용요소","study_concept_element":"적용개념","study_subject_element":"연계교과","study_element_none":"없음","study_label_like":"좋아요","study_label_interest":"관심 강의","study_label_share":"공유","study_label_like_people":"강좌를 좋아하는 사람","study_label_interest_people":"강좌를 관심있어 하는 사람","study_related_lectures":"강의 목록","study_expand":"전체보기","study_collapse":"줄이기","aftercopy":"주소가 복사되었습니다.","study_remove_curriculum":"강의 모음을 삭제하시겠습니까?","content_required":"내용을 입력하세요","study_remove_lecture":"강의를 삭제하시겠습니까?","lecture_build":"강의 만들기","lecture_build_step1":"1. 강의를 소개하기 위한 정보를 입력해주세요","lecture_build_step2":"2. 학습에 사용되는 기능들만 선택해주세요","lecture_build_step3":"3. 모든 정보를 올바르게 입력했는지 확인해주세요","lecture_build_choice":"어떤 것을 올리시겠습니까?","lecture_build_project":"엔트리 작품","lecture_build_video":"강의 영상","lecture_build_grade":"추천학년","lecture_build_goals":"학습목표","lecture_build_add_goal":"이곳을 클릭하여 목표를 추가","lecture_build_attach":"파일 첨부","lecture_build_attach_text":"20MB 이내의 파일을 업로드해 주세요.","lecture_build_assist":"보조 영상","lecture_build_youtube_url":"Youtube 공유 링크를 넣어주세요.","lecture_build_project_done":"완성 작품을 선택하세요.","lecture_build_scene_text1":"장면기능을 끄면 새로운 장면을 추가하거나,","lecture_build_scene_text2":"삭제할 수 없습니다.","lecture_build_object_text":"오브젝트 추가하기를 끄면 새로운 오브젝트를 추가하거나 삭제할 수 없습니다.","lecture_build_blocks_text1":"학습에 필요한 블록들만 선택해주세요.","lecture_build_blocks_text2":"선택하지 않은 블록은 숨겨집니다.","lecture_build_basic1":"학습을 시작할때 사용할 작품을 선택해 주세요.","lecture_build_basic2":"학습자는 선택한 작품을 가지고 학습을 하게 됩니다.","lecture_build_help":"이 도움말을 다시 보시려면 눌러주세요.","lecture_build_help_never":"다시보지 않기","lecture_build_close":"닫기","lecture_build_scene":"장면 1","lecture_build_add_object":"오브젝트 추가하기","lecture_build_start":"시작하기","lecture_build_tab_code":"블록","lecture_build_tab_shape":"모양","lecture_build_tab_sound":"소리","lecture_build_tab_attribute":"속성","lecture_build_block_category":"블록 카테고리를 선택하세요.","lecture_build_attr_all":"전체","lecture_build_attr_var":"변수","lecture_build_attr_signal":"신호","lecture_build_attr_list":"리스트","lecture_build_attr_func":"함수","lecture_build_edit":"강의 수정","lecture_build_remove":"삭제","curriculum_build":"강의 모음 만들기","curriculum_step1":"1. 강의 모음을 소개하는 정보를 입력해주세요.","curriculum_step2":"2. 강의 모음을 구성하는 강의를 선택해주세요.","curriculum_step3":"3. 올바르게 강의 모음이 구성되었는지 확인해주세요.","curriculum_lecture_upload":"강의 올리기","curriculum_lecture_edit":"강의 편집","curriculum_lecture_open":"불러오기","group_lecture_add":"우리 반 강의 추가하기","group_curriculum_add":"우리 반 강의 모음 추가하기","group_lecture_delete":"삭제","group_curriculum_delete":"삭제","group_select":"","group_studentNo":"학번","group_username":"이름","group_userId":"아이디","group_tempPassword":"비밀번호 수정","group_gender":"성별","group_studentCode":"코드","group_viewWorks":"작품보기","added_group_lecture":"강의가 삭되었습니다.","added_group_curriculum":"강의 모음이 삭제되었습니다.","deleted_group_lecture":"강의가 삭제되었습니다.","deleted_group_curriculum":"강의 모음이 삭제되었습니다.","modal_my":"나의","modal_interest":"관심","modal_project":"작품","section":"단원","connect_hw":"하드웨어 연결","connect_message":"%1에 연결되었습니다.","connect_fail":"하드웨어 연결에 실패했습니다. 연결프로그램이 켜져 있는지 확인해 주세요.","interest_curriculum":"관심 강의 모음","searchword_required":"검색어를 입력하세요.","file_required":"파일은 필수 입력 항목입니다.","file_upload_max_count":"한번에 10개까지 업로드가 가능합니다.","image_file_only":"이미지 파일만 등록이 가능합니다.","file_upload_max_size":"10MB 이하만 업로드가 가능합니다.","curriculum_modal_lectures":"나의 강의","curriculum_modal_interest":"관심 강의","group_curriculum_modal_curriculums":"나의 강의모음","group_curriculum_modal_interest":"관심 강의모음","picture_import":"모양 가져오기","picture_select":"모양 선택","lecture_list_view":"다른 강의보기","play_software_2":"EBS 소프트웨어야 놀자2","play_software_2_content":"네이버와 EBS 그리고 엔트리가 함께 만든 두 번째 이야기, <소프트웨어야 놀자> 시즌2를 만나보세요! 재미있는 동영상 강의를 통해 소프트웨어의 기본 개념을 배워보고, 다양하고 흥미로운 주제로 실생활 문제를 해결해 볼 수 있습니다. 방송영상과 특별영상을 보며 재미있는 프로그램들을 직접 만들어보세요. 소프트웨어 교육을 처음 접하는 친구들도 쉽게 소프트웨어와 친구가 될 수 있답니다!","open_project_to_all":"공개","close_project":"비공개","category_media_art":"미디어 아트","go_further":"더 나아가기","marked_project":"관심 작품","marked_group_project":"그룹 관심 작품","basic":"기본","application":"응용","the_great_escape":"탈출 모험기","escape_guide_1":"강아지 로봇을 만드는 공장에서 우연한 정전으로 혼자서 생각할 수 있게 된 엔트리봇! ","escape_guide_1_2":" 공장을 탈출하고 자유를 찾을 수 있도록 엔트리봇을 도와주세요!","escape_guide_2":"엔트리봇이 먼 길을 가기엔 고쳐야 할 곳이 너무 많아 공장에서 탈출하면서 몸을 수리할 수 있는 부품들을 찾아보자! 아직 몸이 완전하지는 않지만 걷거나 뛰면서, 방향을 바꾸는 정도는 가능할 거야! ","escape_guide_2_2":"학습 목표: 순차적 실행","escape_guide_3":"드디어 공장을 탈출했어! 하지만 마을로 가기 위해서는 아직 가야 할 길이 멀어. 그래도 몸은 어느 정도 고쳐져서 똑같은 일을 많이 해도 무리는 없을 거야! 어? 근데 저 로봇은 뭐지? ","escape_guide_3_2":"학습 목표: 반복문과 조건문","escape_guide_4":"드디어 마을 근처까지 왔어! 아까부터 똑같은 일을 많이 했더니 이제 외울 지경이야! 차라리 쓰일 블록은 이제 기억해뒀다가 쓰면 좋을 것 같아. 여기서 배터리만 충전해 놓으면 이제 평생 자유롭게 살 수 있을 거야.","escape_guide_4_2":"학습 목표: 함수 정의와 호출","space_travel_log":"우주 여행기","space_guide_1":"머나먼 우주를 탐사하기 위해 떠난 엔트리봇. 드디어 탐사 임무를 마치고 고향별인 지구로 돌아오려 하는데 수많은 돌이 지구로 가는 길을 막고 있다!  엔트리봇이 안전하게 지구로 돌아올 수 있도록 도와주세요!","space_guide_2":"드디어 지구에 돌아갈 시간이야! 얼른 지구에 돌아가서 쉬고 싶어!앞에 돌들이 어떻게 되어 있는지 확인하고 언제 어디로 가야 하는지 알려줘! 그러면 내가 가르쳐준 방향으로 움직일게!","space_guide_2_2":"학습 목표: 조건문 중첩과 논리 연산","cfest_mission":"엔트리 체험 미션","maze_1_intro":"안녕 나는 엔트리봇이라고 해. 지금 나는 다친 친구들을 구하려고 하는데 너의 도움이 필요해. 나를 도와서 친구들을 구해줘! 먼저 앞으로 가기 블록을 조립하고 시작을 눌러봐","maze_1_title":"시작 방법","maze_1_content":"엔트리봇은 어떻게 움직이나요?","maze_1_detail":"1. 블록 꾸러미에서 원하는 블록을 꺼내어 “시작하기를 클릭했을 때” 블록과 연결해봐 <br> 2. 다 조립했으면, 시작을 눌러봐 <br> 3. 나는 네가 조립한 블록대로 위에서부터 순서대로 움직일게","maze_2_intro":"좋아! 덕분에 첫 번째 친구를 무사히 구할 수 있었어! 그럼 다음 친구를 구해볼까? 어! 그런데 앞에 벌집이 있어! 뛰어넘기 블록을 사용해서 벌집을 피하고 친구를 구해보자.","maze_2_title_1":"장애물 뛰어넘기","maze_2_content_1":"장애물이 있으면 어떻게 해야하나요?","maze_2_detail_1":"길을 가다보면 장애물을 만날 수 있어. <br> 장애물이 앞에 있을 때에는 뛰어넘기 블록을 사용해야 해.","maze_2_title_2":"시작 방법","maze_2_content_2":"엔트리봇은 어떻게 움직이나요?","maze_2_detail_2":"1. 블록 꾸러미에서 원하는 블록을 꺼내어 “시작하기를 클릭했을 때” 블록과 연결해봐 <br> 2. 다 조립했으면, 시작을 눌러봐 <br> 3. 나는 네가 조립한 블록대로 위에서부터 순서대로 움직일게","maze_3_intro":"멋졌어! 이제 또 다른 친구를 구하러 가자~ 이번에는 아까 구한 친구가 준 반복하기 블록을 이용해볼까? 반복하기를 이용하면 똑같은 동작을 쉽게 여러번 할 수 있어! 한 번 반복할 숫자를 바꿔볼래?","maze_3_title":"반복 블록(1)","maze_3_content":"(3)회 반복하기 블록은 어떻게 사용하나요?","maze_3_detail":"같은 행동을 여러번 반복하려면 ~번 반복하기 블록을 사용해야 해. <br> 반복하고 싶은 블록들을 ~번 반복하기 안에 넣고 반복 횟수를 입력하면 돼","maze_4_intro":"훌륭해! 이제 구해야 할 친구 로봇들도 별로 남지 않았어. 벌집에 닿지 않도록 뛰어넘기를 반복하면서 친구에게 갈 수 있게 해줘!","maze_4_title":"반복 블록(1)","maze_4_content":"(3)회 반복하기 블록은 어떻게 사용하나요?","maze_4_detail":"같은 행동을 여러번 반복하려면 ~번 반복하기 블록을 사용해야 해. <br> 반복하고 싶은 블록들을 ~번 반복하기 안에 넣고 반복 횟수를 입력하면 돼","maze_5_intro":"대단해! 이제 반복하기 블록과 만약 블록을 같이 사용해보자~ 만약 블록을 사용하면 앞에 벽이 있을 때 벽이 없는 쪽으로 회전할 수 있어. 그럼 친구를 구해주러 출발해볼까?","maze_5_title_1":"만약 블록","maze_5_content_1":"만약 ~라면 블록은 어떻게 동작하나요?","maze_5_detail_1":"만약 앞에 {이미지}가 있다면' 블록을 사용하면 앞에 {이미지}가 있을 때 어떤 행동을 할 지 정해줄 수 있어. <br> 앞에 {이미지}가 있을 때에만 블록 안의 블록들을 실행하고 <br> 그렇지 않으면 실행하지 않게 되는 거야.","maze_5_title_2":"반복 블록(2)","maze_5_content_2":"~를 만날 때 까지 반복하기 블록은 어떻게 사용하나요?","maze_5_detail_2":"~까지 반복하기'를 사용하면 같은 행동을 언제까지 반복할지를 정해줄 수 있어. <br> 반복하고 싶은 블록들을 ~까지 반복하기안에 넣으면 돼. <br> 그러면 {이미지}와 같은 타일 위에 있는 경우 반복이 멈추게 될 거야.","maze_6_intro":"이제 마지막 친구야! 아까 해본 것처럼만 하면 될거야! 그럼 마지막 친구를 구하러 가볼까?","maze_6_title_1":"만약 블록","maze_6_content_1":"만약 ~라면 블록은 어떻게 동작하나요?","maze_6_detail_1":"만약 앞에 {이미지}가 있다면' 블록을 사용하면 앞에 {이미지}가 있을 때 어떤 행동을 할 지 정해줄 수 있어. <br> 앞에 {이미지}가 있을 때에만 블록 안의 블록들을 실행하고 <br> 그렇지 않으면 실행하지 않게 되는 거야.","maze_6_title_2":"반복 블록(2)","maze_6_content_2":"~를 만날 때 까지 반복하기 블록은 어떻게 사용하나요?","maze_6_detail_2":"~까지 반복하기'를 사용하면 같은 행동을 언제까지 반복할지를 정해줄 수 있어. <br> 반복하고 싶은 블록들을 ~까지 반복하기안에 넣으면 돼. <br> 그러면 {이미지}와 같은 타일 위에 있는 경우 반복이 멈추게 될 거야.","maze_programing_mode_0":"블록 코딩","maze_programing_mode_1":"자바스크립트","maze_operation1_title":"1단계 – 자바스크립트모드 안내","maze_operation1_1_desc":"나는 로봇강아지 엔트리봇이야. 나에게 명령을 내려서 미션을 해결할 수 있게 도와줘! 미션은 시작할 때마다 <span class=\"textShadow\">\'목표\'</span>를 통해서 확인할 수 있어!","maze_operation1_2_desc":"미션을 확인했다면 <b>명령</b>을 내려야 해 <span class=\"textUnderline\">\'명령어 꾸러미\'</span>는 <b>명령어</b>가 있는 공간이야. <b>마우스</b>와 <b>키보드</b>로 <b>명령</b>을 내릴 수 있어. <span class=\"textShadow\">마우스</span>로는 명령어 꾸러미에 있는 <b>명령어</b>를 클릭하거나, <b>명령어</b>를 <span class=\"textUnderline\">\'명령어 조립소\'</span>로 끌고와서 나에게 <b>명령</b>을 내릴 수 있어!","maze_operation1_2_textset_1":"마우스로 명령어를 클릭하는 방법 ","maze_operation1_2_textset_2":"마우스로 명령어를 드래그앤드랍하는 방법 ","maze_operation1_3_desc":"<span class=\"textShadow\">키보드</span>로 명령을 내리려면 \'명령어 꾸러미\' 에 있는 <b>명령어를 키보드로 직접 입력하면 돼.</b></br> 명령어를 입력할 때 명령어 끝에 있는 <span class=\"textShadow\">()와 ;</span> 를 빼먹지 않도록 주의해야해!","maze_operation1_4_desc":"미션을 해결하기 위한 명령어를 다 입력했다면 <span class=\"textShadow\">[시작하기]</span>를 누르면 돼.</br> [시작하기]를 누르면 나는 명령을 내린대로 움직일 거야!</br> 각 명령어가 궁금하다면 <span class=\"textShadow\">[명령어 도움말]</span>을 확인해봐!","maze_operation7_title":"7단계 - 반복 명령 알아보기(횟수반복)","maze_operation7_1_desc":"<b>똑같은 일</b>을 반복해서 명령하는건 매우 귀찮은 일이야.</br>이럴땐 <span class=\"textShadow\">반복</span>과 관련된 명령어를 사용하면 훨씬 쉽게 명령을 내릴 수 있어.","maze_operation7_2_desc":"그렇다면 반복되는 명령을 쉽게 내리는 방법을 알아보자.</br>먼저 반복하기 명령어를 클릭한 다음, <span class=\"textShadow\">i<1</span> 의 숫자를 바꿔서 <span class=\"textShadow\">반복횟수</span>를 정하고</br><span class=\"textShadow\">괄호({ })</span> 사이에 반복할 명령어를 넣어주면 돼!","maze_operation7_3_desc":"예를 들어 이 명령어<span class=\"textBadge number1\"></span>은 move(); 를 10번 반복해서 실행해.</br><span class=\"textBadge number2\"></span>명령어와 동일한 명령어지.","maze_operation7_4_desc":"이 명령어를 사용할 때는 <span class=\"textShadow\">{ } 안에 반복할 명령어</span>를 잘 입력했는지,</br><span class=\"textShadow\">`;`</span>는 빠지지 않았는지 잘 살펴봐!</br>이 명령어에 대한 자세한 설명은 [명령어 도움말]에서 볼 수 있어.","maze_operation7_1_textset_1":"똑같은 명령어를 반복해서 사용하는 경우","maze_operation7_1_textset_2":"반복 명령어를 사용하는 경우","maze_operation7_2_textset_1":"반복 횟수","maze_operation7_2_textset_2":"반복할 명령","maze_operation7_4_textset_1":"괄호({})가 빠진 경우","maze_operation7_4_textset_2":"세미콜론(;)이 빠진 경우","maze_operation9_title":"9단계 - 반복 명령 알아보기(조건반복)","maze_operation9_1_desc":"앞에서는 몇 번을 반복하는 횟수반복 명령어에 대해 배웠어.</br>이번에는 <span class=\"textShadow\">계속해서 반복하는 명령어</span>를 살펴보자.</br>이 명령어를 사용하면 미션이 끝날 때까지 <b>동일한 행동</b>을 계속 반복하게 돼.</br>이 명령어 역시 괄호({ }) 사이에 반복할 명령어를 넣어 사용할 수 있어!","maze_operation9_2_desc":"예를 들어 이 명령어 <span class=\"textBadge number1\"></span>은 미션을 완료할때까지 반복해서 move(); right()를 실행해.</br><span class=\"textBadge number2\"></span>명령어와 동일한 명령어지.","maze_operation9_3_desc":"이 명령어를 사용할 때도 <span class=\"textShadow\">{ } 안에 반복할 명령어</span>를 잘 입력했는지,</br><span class=\"textShadow\">`true`</span>가 빠지지 않았는지 잘 살펴봐!</br>이 명령어에 대한 자세한 설명은 [명령어 도움말]에서 볼 수 있어.","maze_operation9_1_textset_1":"반복할 명령","maze_operation9_3_textset_1":"괄호({})가 빠진 경우","maze_operation9_3_textset_2":"세미콜론(;)이 빠진 경우","maze_operation10_title":"10단계 - 조건 명령 알아보기","maze_operation10_1_desc":"앞에서는 미션이 끝날 때까지 계속 반복하는 반복 명령어에 대해 배웠어.</br>이번에는 특정한 조건에서만 행동을 하는 <span class=\"textShadow\">조건 명령어</span>를 살펴보자.</br><span class=\"textBadge number2\"></span>에서 보는것처럼 조건 명령어를 사용하면 <b>명령을 보다 효율적으로 잘 내릴 수 있어.</b>","maze_operation10_2_desc":"조건 명령어는 크게 <span class=\"textShadow\">`조건`</span> 과 <span class=\"textShadow\">`조건이 발생했을때 실행되는 명령`</span>으로 나눌수 있어.</br>먼저 <span class=\"textUnderline\">조건</span> 부분을 살펴보자. If 다음에 나오는 <span class=\"textUnderline\">( ) 부분</span>이 조건을 입력하는 부분이야.</br><span class=\"textBadge number1\"></span>과 같은 명령어를 예로 살펴보자. <span class=\"textUnderline\">if(front == \“wall\”)</span> 는 만약 내 앞에(front) \"wall(벽)\"이 있다면을 뜻해","maze_operation10_3_desc":"이제 <span class=\"textUnderline\">`조건이 발생했을 때 실행되는 명령`</span>을 살펴보자.</br>이 부분은 <span class=\"textShadow\">괄호{}</span>로 묶여 있고, 조건이 발생했을때 괄호안의 명령을 실행하게 돼!</br>조건이 발생하지 않으면 이 부분은 무시하고 그냥 넘어가게 되지.</br><span class=\"textBadge number1\"></span>의 명령어를 예로 살펴보자. 조건은 만약에 `내 앞에 벽이 있을 때` 이고,</br><b>이 조건이 발생했을 때 나는 괄호안의 명령어 right(); 처럼 오른쪽으로 회전하게 돼!</b>","maze_operation10_4_desc":"<span class=\"textShadow\">조건 명령어</span>는 <span class=\"textShadow\">반복하기 명령어</span>와 함께 쓰이는 경우가 많아.</br>앞으로 쭉 가다가, 벽을 만났을때만 회전하게 하려면</br><span class=\"textUnderline pdb5\"><span class=\"textBadge number1\"></span><span class=\"textBadge number2\"></span><span class=\"textBadge number3\"></span>순서</span>와 같이 명령을 내릴 수 있지!","maze_operation10_1_textset_1":"<b>[일반명령]</b>","maze_operation10_1_textset_2":"<span class=\"textMultiline\">앞으로 2칸 가고</br>오른쪽으로 회전하고,</br>앞으로 3칸가고,</br>오른쪽으로 회전하고, 앞으로...</span>","maze_operation10_1_textset_3":"<b>[조건명령]</b>","maze_operation10_1_textset_4":"<span class=\"textMultiline\">앞으로 계속 가다가</br><span class=\"textEmphasis\">`만약에 벽을 만나면`</span></br>오른쪽으로 회전해~!</span>","maze_operation10_2_textset_1":"조건","maze_operation10_2_textset_2":"조건이 발생했을 때 실행되는 명령","maze_operation10_3_textset_1":"조건","maze_operation10_3_textset_2":"조건이 발생했을 때 실행되는 명령","maze_operation10_4_textset_1":"<span class=\"textMultiline\">미션이 끝날때 까지</br>계속 앞으로 간다.</span>","maze_operation10_4_textset_2":"<span class=\"textMultiline\">계속 앞으로 가다가,</br>만약에 벽을 만나면</span>","maze_operation10_4_textset_3":"<span class=\"textMultiline\">계속 앞으로 가다가,</br>만약에 벽을 만나면</br>오른쪽으로 회전한다.</span>","maze_operation15_title":"15단계 - 함수 명령 알아보기","maze_operation15_1_desc":"자주 사용하는 명령어들을 매번 입력하는건 매우 귀찮은 일이야.</br>자주 사용하는 <span class=\"textUnderline\">명령어들을 묶어서 이름</span>을 붙이고,</br><b>필요할 때마다 그 명령어 묶음을 불러온다면 훨씬 편리하게 명령을 내릴 수 있어!</b></br>이런 명령어 묶음을  <span class=\"textShadow\">`함수`</span>라고 해. 이제 함수 명령에 대해 자세히 알아보자.","maze_operation15_2_desc":"함수 명령어는 명령어를 묶는 <b>`함수만들기` 과정</b>과,</br>묶은 명령어를 필요할 때 사용하는 <b>`함수 불러오기` 과정</b>이 있어.</br>먼저 함수만들기 과정을 살펴보자.</br>함수를 만들려면 함수의 이름과, 그 함수에 들어갈 명령어를 입력해야 해.</br><span class=\"textShadow\">function</span>을 입력한 다음 <span class=\"textShadow\">함수의 이름</span>을 정할 수 있어. 여기서는 <span class=\"textShadow\">promise</span>로 만들거야.</br>함수 이름을 만들었으면 <span class=\"textUnderline\">()</span>를 붙여줘. 그 다음 <span class=\"textUnderline\">괄호({})</span>를 입력해.</br>그리고 <span class=\"textUnderline\">이 괄호 안에 함수에 들어갈 명령어들을 입력하면</span> 함수가 만들어져!","maze_operation15_3_desc":"이 명령어를 예로 살펴보자. 나는 <span class=\"textShadow\">promise</span> 라는 함수를 만들었어.</br>이 함수를 불러서 실행하면 <span class=\"textUnderline\">괄호({})</span>안에 있는</br>move();</br>move();</br>left(); 가 실행돼!","maze_operation15_4_desc":"함수를 불러와서 실행하려면 아까 만든 <b>함수의 이름을 입력하고 뒤에 `();`를 붙이면 돼.</b></br>promise 라는 이름으로 함수를 만들었으니 <span class=\"textShadow\">promise();</span> 를 입력하면 앞에서 묶어놓은</br>명령어들이 실행되는거지!</br><span class=\"number1 textBadge\"></span>과 같이 명령을 내리면 <span class=\"number2 textBadge\"></span>처럼 동작하게 돼!</br>함수 명령어를 사용하려면 <span class=\"number1 textBadge\"></span>과 같이 함수를 만들고 함수를 불러와야해!","maze_operation15_1_textset_1":"자주 사용하는 명령어 확인하기","maze_operation15_1_textset_2":"명령어들을 묶어서 이름 붙이기","maze_operation15_1_textset_3":"명령어 묶음 불러오기","maze_operation15_2_textset_1":"명령어 묶음의 이름(함수 이름)","maze_operation15_2_textset_2":"묶을 명령어들","maze_operation15_3_textset_1":"명령어 묶음의 이름(함수 이름)","maze_operation15_3_textset_2":"묶을 명령어들","maze_operation15_4_textset_1":"함수 만들기","maze_operation15_4_textset_2":"함수 불러오기","maze_operation15_4_textset_3":"실제 상황","maze_object_title":"오브젝트 정보","maze_object_parts_box":"부품 상자","maze_object_obstacle1":"장애물","maze_object_obstacle2":"bee","maze_object_obstacle3":"banana","maze_object_friend":"친구","maze_object_wall1":"wall","maze_object_wall2":"wall","maze_object_wall3":"wall","maze_object_battery":"베터리","maze_command_ex":"예시","maze_command_title":"명령어 도움말","maze_command_move_desc":"엔트리봇을 한 칸 앞으로 이동시킵니다.","maze_command_jump_desc":"아래 이미지와 같은 장애물 앞에서 장애물을 뛰어 넘습니다.</br><div class=\"obstacleSet\"></div>","maze_command_right_desc":"제자리에서 오른쪽으로 90도 회전합니다.","maze_command_left_desc":"제자리에서 왼쪽으로 90도 회전합니다.","maze_command_for_desc":"괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 <span class=\"textShadow\">입력한 횟수</span> 만큼 반복해서 실행합니다.","maze_command_while_desc":"미션이 끝날 때가지 괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 계속 반복해서 실행합니다.","maze_command_if1_desc":"조건 <span class=\"textShadow\">`바로 앞에 벽이 있을때`</span>이 발생했을 때,</br>괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 실행합니다.","maze_command_if2_desc":"조건 <span class=\"textShadow\">`바로 앞에 벌집이 있을때`</span>이 발생했을 때,</br>괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 실행합니다.","maze_command_if3_desc":"조건 <span class=\"textShadow\">`바로 앞에 바나나가 있을때`</span>이 발생했을 때,</br>괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 실행합니다.","maze_command_promise_desc":"promise 라는 <span class=\"textShadow\">함수</span>를 만들고 실행하면 괄호<span class=\"textShadow\">{}</span> 안에</br>있던 명령어가 실행합니다.","perfect":"아주 완벽해!  ","succeeded_using_blocks":" 개의 블록을 사용해서 성공했어!","awesome":"대단한 걸!","succeeded_go_to_next":"개의 블록만으로 성공했어! <br> 다음 단계로 넘어가자.","good":"좋아! ","but":"<br> 하지만, ","try_again":" 개의 블록만으로 성공하는 방법도 있어. <br> 다시 도전해 보는건 어때?","cfest_success":"대단한걸! 덕분에 친구들을 구할 수 있었어! <br> 아마도 너는 타고난 프로그래머 인가봐! <br> 나중에 또 만나자~!","succeeded_and_cert":"개의 블록만으로 성공했어! <br>인증서를 받으러 가자.","cause_msgs_1":"에구, 앞으로 갈 수 없는 곳이였어. 다시 해보자.","cause_msgs_2":"히잉. 그냥 길에서는 뛰어 넘을 곳이 없어. 다시 해보자.","cause_msgs_3":"에고고, 아파라. 뛰어 넘었어야 했던 곳이였어. 다시 해보자.","cause_msgs_4":"아쉽지만, 이번 단계에서는 꼭 아래 블록을 써야만 해. <br> 다시 해볼래?","cause_msgs_5":"이런, 실행할 블록들이 다 떨어졌어. 다시 해보자.","close_experience":"체험<br>종료","replay":"다시하기","go_to_next_level":"다음단계 가기","move_forward":"앞으로 한 칸 이동","turn_left":"왼쪽","turn_right":"오른쪽","turn_en":"","turn_ko":"으로 회전","jump_over":"뛰어넘기","when_start_is_pressed":"시작하기를 클릭했을 때","repeat_until_ko":"만날 때 까지 반복","repeat_until_en":"","repeat_until":"만날 때 까지 반복","if_there_is_1":"만약 앞에 ","if_there_is_2":"있다면","used_blocks":"사용 블록","maximum":"목표 블록","used_command":"사용 명령어 갯수","maximum_command":"목표 명령어 갯수","block_box":"블록 꾸러미","block_assembly":"블록 조립소","command_box":"명령어 꾸러미","command_assembly":"명령어 조립소","start":"시작하기","engine_running":"실행중","engine_replay":"돌아가기","goto_show":"보러가기","make_together":"함께 만드는 엔트리","make_together_content":"엔트리는 학교에 계신 선생님들과 학생 친구들이 함께 고민하며 만들어갑니다.","project_nobody_like":"이 작품이 마음에 든다면 '좋아요'를 눌러 주세요.","project_nobody_interest":"'관심 작품'을 누르면 마이 페이지에서 볼 수 있어요.","lecture_nobody_like":"이 강의가 마음에 든다면 '좋아요'를 눌러 주세요.","lecture_nobody_interest":"'관심 강의'을 누르면 마이 페이지에서 볼 수 있어요.","course_nobody_like":"이 강의 모음이 마음에 든다면 '좋아요'를 눌러 주세요.","course_nobody_interest":"'관심 강의 모음'을 누르면 마이 페이지에서 볼 수 있어요.","before_changed":"변경전","after_changed":"변경후","from_changed":"( 2016년 04월 17일 부터 ) ","essential":"필수","access_term_title":"안녕하세요. 엔트리 교육연구소 입니다. <br>  엔트리를 사랑해주시는 여러분께 감사드리며,  <br>  엔트리 교육연구소 웹사이트 이용약관이<br>  2016년 4월 17일 부로 다음과 같이 개정됨을 알려드립니다. ","member_info":"회원 안내","personal_info":"개인정보 수집 및 이용에 동의 합니다.","option":"선택","latest_news":"최근소식","edu_data":"교육자료","training_program":"연수지원","footer_phrase":"엔트리는 누구나 무료로 소프트웨어 교육을 받을 수 있게 개발된 비영리 교육 플랫폼입니다.","footer_use_free":"모든 엔트리교육연구소의 저작물은 교육적 목적에 한하여 출처를 밝히고 자유롭게 이용할 수 있습니다.","nonprofit_platform":"비영리 교육 플랫폼","this_is":"입니다.","privacy":"개인정보 처리방침","entry_addr":"주소 : 서울특별시 강남구 강남대로 382 메리츠타워 7층 엔트리 교육연구소","phone":"전화번호","alert_agree_term":"이용약관에 동의하여 주세요.","alert_private_policy":"개인정보 수집 약관에 동의하여 주세요.","agree":"동의","optional":"선택","start_software":"소프트웨어 교육의 첫걸음","analyze_procedure":"절차","analyze_repeat":"반복","analyze_condition":"분기","analyze_interaction":"상호작용","analyze_dataRepresentation":"데이터 표현","analyze_abstraction":"추상화","analyze_sync":"병렬 및 동기화","jr_intro_1":"안녕! 난 쥬니라고 해! 내 친구 엔트리봇이 오른쪽에 있어! 날 친구에게 데려다 줘!","jr_intro_2":"엔트리봇이 내 왼쪽에 있어! 왼쪽으로 가보자.","jr_intro_3":"엔트리봇이 위쪽에 있어! 친구를 만날 수 있도록 도와줘!","jr_intro_4":"어서 엔트리봇을 만나러 가자! 아래쪽으로 가보는거야~ ","jr_intro_5":"우왓! 내 친구가 멀리 떨어져있어. 엔트리봇이 있는 곳까지 안내해줄래? ","jr_intro_6":"저기 엔트리봇이 있어~ 얼른 만나러 가보자.","jr_intro_7":"예쁜 꽃이 있네. 꽃들을 모아 엔트리봇에게 가보자!","jr_intro_8":"가는 길에 꽃이 있어! 꽃을 모아 엔트리봇에게 가보자!","jr_intro_9":"엔트리봇이 멀리 떨어져 있네? 가장 빠른 길로 엔트리봇에게 가 보자.","jr_intro_10":"엔트리봇을 만나러 가는 길에 꽃을 모두 모아서 가보자.","jr_intro_11":"엔트리봇에게 가려면 오른쪽으로 다섯번이나 가야 하잖아? 반복하기 블록을 사용해서 좀 더 쉽게 가 보자.","jr_intro_12":"반복하기를 사용해서 엔트리봇을 만나러 가자.","jr_intro_13":"지금 블록으로는 친구에게 갈 수가 없어. 반복 횟수를 바꿔 엔트리봇에게 갈 수 있게 해줘.","jr_intro_14":"반복 블록을 사용하여 엔트리봇에게 데려다 줘.","jr_intro_15":"엔트리봇이 정~말 멀리 있잖아? 그래도 반복 블록을 사용하면 쉽게 엔트리봇에게 갈 수 있을 거야.","jr_whats_ur_name":"내가 받을 인증서에 적힐 이름은?","jr_down_cert":"인증서 받기","jr_popup_prefix_1":"좋아! 엔트리봇을 만났어!","jr_popup_prefix_2":"우왓! 엔트리봇을 만났어! <br> 하지만 엔트리봇을 만나기에는 더 적은 블록을 사용해서도 <br> 만날 수 있는데 다시 해볼래? ","jr_popup_suffix":"고마워~ 덕분에 엔트리봇이랑 재밌게 놀 수 있었어~ <br>다음에 또 엔트리봇이랑 놀자~","jr_fail_dont_go":"에궁, 그 곳으로는 갈 수 없어. 가야하는 길을 다시 알려줘~","jr_fail_dont_know":"어? 이제 어디로 가지? 어디로 가야하는 지 더 알려줘~","jr_fail_no_flower":"이런 그곳에는 꽃이 없어. 꽃이 있는 곳에서 사용해보자~","jr_fail_forgot_flower":"앗! 엔트리봇한테 줄 꽃을 깜빡했어. 꽃을 모아서 가자~","jr_fail_need_repeat":"반복 블록이 없잖아! 반복 블록을 사용해서 해보자~","jr_hint_1":"안녕! 난 쥬니라고 해! 내 친구 엔트리봇이 오른쪽에 있어! 날 친구에게 데려다 줘!","jr_hint_2":"엔트리봇이 내 왼쪽에 있어! 왼쪽으로 가보자.","jr_hint_3":"엔트리봇이 위쪽에 있어! 친구를 만날 수 있도록 도와줘!","jr_hint_4":"어서 엔트리봇을 만나러 가자! 아래쪽으로 가보는거야~","jr_hint_5":"우왓! 내 친구가 멀리 떨어져있어. 엔트리봇이 있는 곳까지 안내해줄래?","jr_hint_6":"잘못된 블록들 때문에 친구에게 가지 못하고 있어, 잘못된 블록을 지우고 엔트리봇에게 갈 수 있도록 해줘!","jr_hint_7":"예쁜 꽃이 있네. 꽃들을 모아 엔트리봇에게 가보자!","jr_hint_8":"가는 길에 꽃이 있어! 꽃을 모아 엔트리봇에게 가보자!","jr_hint_9":"엔트리봇이 멀리 떨어져 있네? 가장 빠른 길로 엔트리봇에게 가 보자.","jr_hint_10":"앗, 블록을 잘못 조립해서 제대로 갈 수가 없어. 가는 길에 꽃을 모두 모아 엔트리봇에게 가져다 줄 수 있도록 고쳐 보자.","jr_hint_11":"엔트리봇에게 가려면 오른쪽으로 다섯번이나 가야 하잖아? 반복하기 블록을 사용해서 좀 더 쉽게 가 보자.","jr_hint_12":"반복하기를 사용해서 엔트리봇을 만나러 가자.","jr_hint_13":"지금 블록으로는 친구에게 갈 수가 없어. 반복 횟수를 바꿔 엔트리봇에게 갈 수 있게 해줘.","jr_hint_14":"반복 블록을 사용하여 엔트리봇에게 데려다 줘.","jr_hint_15":"엔트리봇이 정~말 멀리 있잖아? 그래도 반복 블록을 사용하면 쉽게 엔트리봇에게 갈 수 있을 거야.","jr_certification":"인증서","jr_congrat":"축하드립니다!","jr_congrat_msg":"문제해결 과정을 성공적으로 마쳤습니다.","jr_share":"공유","go_see_friends":"친구들 만나러 가요~!","junior_naver":"쥬니어 네이버","junior_naver_contents_1":"의 멋진 곰 '쥬니'가 엔트리를 찾아 왔어요! ","junior_naver_contents_2":"그런데 쥬니는 길을 찾는 것이 아직 어렵나봐요.","junior_naver_contents_3":"쥬니가 엔트리봇을 만날 수 있도록 가야하는 방향을 알려주세요~","basic_content":"기초","jr_help":"도움말","help":"도움말","cparty_robot_intro_1":"안녕 나는 엔트리봇이야. 난 부품을 얻어서 내몸을 고쳐야해. 앞으로 가기 블록으로 부품을 얻게 도와줘!","cparty_robot_intro_2":"좋아! 앞에도 부품이 있는데 이번에는 잘못 가다간 감전되기 쉬울 것 같아. 뛰어넘기 블록을 써서 부품까지 데려다 줘.","cparty_robot_intro_3":"멋진걸! 저기에도 부품이 있어! 길이 조금 꼬여있지만 회전하기 블록을 쓰면 충분히 갈 수 있을 것 같아! ","cparty_robot_intro_4":"좋아 이제 움직이는 건 많이 편해졌어! 이번에는 회전과 뛰어넘기를 같이 써서 저 부품을 얻어보자! ","cparty_robot_intro_5":"덕분에 몸이 아주 좋아졌어! 이번에도 회전과 뛰어넘기를 같이 써야 할 거야! 어서 가보자!","cparty_robot_intro_6":"멋져! 이제 몸이 많이 좋아져서, 똑같은 일은 여러 번 해도 괜찮을 거야! 한 번 반복하기를 사용해서 가보자!","cparty_robot_intro_7":"어? 중간중간에 뛰어넘어야 할 곳이 있어! 그래도 반복하기로 충분히 갈 수 있을 거야!","cparty_robot_intro_8":"이런! 이번에는 부품이 저기 멀리 떨어져 있어. 그래도 반복하기를 사용하면 쉽게 갈수 있지! 얼른 도와줘!","cparty_robot_intro_9":"우와~ 이제 내 몸이 거의 다 고쳐진 것 같아! 이번에도 반복하기를 이용해서 부품 구하러 가보자!","cparty_robot_intro_10":"대단해! 이제 마지막 부품만 있으면 내 몸을 완벽하게 고칠 수 있을 거야! 빨리 반복하기로 도와줘!","cparty_car_intro_1":"안녕! 나는 엔트리봇이라고 해, 자동차를 타고 계속 이동하려면 연료가 필요해! 앞에 있는 연료를 얻을 수 있게 도와줄래?","cparty_car_intro_2":"좋아! 그런데 이번에는 길이 직선이 아니네! 왼쪽/오른쪽 돌기 블록으로 잘 운전해서 함께 연료를 얻으러 가볼까?","cparty_car_intro_3":"잘했어! 이번 길 앞에는 과속방지턱이 있어. 빠르게 운전하면 사고가 날 수도 있을 것 같아, 천천히 가기 블록을 써서 연료를 얻으러 가보자!","cparty_car_intro_4":"야호, 이제 운전이 한결 편해졌어! 이 도로에서는 반복하기 블록을 사용해서 연료를 채우러 가볼까?","cparty_car_intro_5":"와 이번 도로는 조금 복잡해 보이지만, 앞으로 가기와 왼쪽/오른쪽 돌기 블록을 반복하면서 가보면 돼! 차분하게 연료까지 가보자","cparty_car_intro_6":"이번에는 도로에 장애물이 있어서 잘 돌아가야 될 것 같아, 만약에 장애물이 앞에 있다면 어떻게 해야 하는지 알려줘!","cparty_car_intro_7":"좋아 잘했어! 한번 더 만약에 블록을 사용해서 장애물을 피해 연료를 얻으러 가보자!","cparty_car_intro_8":"앗 아까 만났던 과속 방지턱이 두 개나 있네, 천천히 가기 블록을 이용해서 안전하게 연료를 채우러 가보자!","cparty_car_intro_9":"복잡해 보이는 길이지만, 앞에서 사용한 반복 블록과 만약에 블록을 잘 이용하면 충분히 운전할 수 있어, 연료를 채울 수 있도록 도와줘!","cparty_car_intro_10":"정말 멋져! 블록의 순서를 잘 나열해서 이제 마지막 남은 연료를 향해 힘을 내어 가보자!","cparty_car_popup_prefix_1":"좋아! 연료를 얻었어!","cparty_car_popup_prefix_2":"우왓! 연료를 얻었어! <br> 하지만 연료를 얻기에는 더 적은 블록을 사용해서도 <br> 얻을 수 있는데 다시 해볼래? ","cparty_car_popup_suffix":"고마워~ 덕분에 모든 배터리를 얻을 수 있었어~ <br>다음에 또 나랑 놀자~","all_grade":"모든 학년","grade_e3_e4":"초등 3 ~ 4 학년 이상","grade_e5_e6":"초등 5 ~ 6 학년 이상","grade_m1_m3":"중등 1 ~ 3 학년 이상","entry_first_step":"엔트리 첫걸음","entry_monthly":"월간 엔트리","play_sw_2":"EBS 소프트웨어야 놀자2","entry_programming":"실전, 프로그래밍!","entry_recommanded_course":"엔트리 추천 코스","introduce_course":"누구나 쉽게 보고 따라하면서 재미있고 다양한 소프트웨어를 만들 수 있는 강의 코스를 소개합니다.","all_free":"*강의 동영상, 만들기, 교재 등이 모두 무료로 제공됩니다.","cparty_result_fail_1":"에궁, 그 곳으로는 갈 수 없어. 가야하는 길을 다시 알려줘~","cparty_result_fail_2":"에고고, 아파라. 뛰어 넘었어야 했던 곳이였어. 다시 해보자.","cparty_result_fail_3":"아이고 힘들다. 아래 블록들을 안 썼더니 너무 힘들어! 아래 블록들로 다시 만들어줘.","cparty_result_fail_4":"어? 이제 어디로 가지? 어디로 가야하는 지 더 알려줘~","cparty_result_fail_5":"앗! 과속방지턱에서는 속도를 줄여야해. 천천히 가기 블록을 사용해보자~","cparty_result_success_1":"좋아! 부품을 얻었어!","cparty_result_success_2":"우왓! 부품을 얻었어! <br>하지만 부품을 얻기에는 더 적은 블록을 사용해서도 얻을 수 있는데 다시 해볼래?","cparty_result_success_3":"고마워~ 덕분에 내몸이 다 고쳐졌어~ 다음에 또 나랑 놀자~","cparty_insert_name":"이름을 입력하세요.","offline_file":"파일","offline_edit":"편집","offline_undo":"되돌리기","offline_redo":"다시실행","offline_quit":"종료","select_one":"선택해 주세요.","evaluate_challenge":"도전해본 미션의 난이도를 평가해 주세요.","very_easy":"매우쉬움","easy":"쉬움","normal":"보통","difficult":"어려움","very_difficult":"매우 어려움","save_dismiss":"바꾼 내용을 저장하지 않았습니다. 계속 하시겠습니까?","entry_info":"엔트리 정보","actual_size":"실제크기","zoom_in":"확대","zoom_out":"축소","cparty_jr_intro_1":"안녕! 난 엔트리봇 이라고 해! 학교가는 길에 책가방을 챙길 수 있도록 도와줘! ","cparty_jr_intro_2":"책가방이 내 왼쪽에 있어! 왼쪽으로 가보자.","cparty_jr_intro_3":"책가방이 위쪽에 있어! 책가방을 챙길 수 있도록 도와줘!","cparty_jr_intro_4":"어서 책가방을 챙기러 가자! 아래쪽으로 가보는 거야~","cparty_jr_intro_5":"우왓! 내 책가방이 멀리 떨어져 있어. 책가방이 있는 곳까지 안내해줄래?","cparty_jr_intro_6":"책가방이 있어! 얼른 가지러 가자~","cparty_jr_intro_7":"길 위에 내 연필이 있네. 연필들을 모아 책가방을 챙기러 가보자!","cparty_jr_intro_8":"학교 가는 길에 연필이 있어! 연필을 모아 책가방을 챙기러 가보자!","cparty_jr_intro_9":"내 책가방이 멀리 떨어져 있네? 가장 빠른 길로 책가방을 챙기러 가 보자.","cparty_jr_intro_10":"가는 길에 연필을 모두 모으고 책가방을 챙기자!","cparty_jr_intro_11":"책가방을 챙기러 가려면 오른쪽으로 다섯 번이나 가야 하잖아? 반복하기 블록을 사용해서 좀 더 쉽게 가 보자.","cparty_jr_intro_12":"반복하기를 사용해서 책가방을 챙기러 가자.","cparty_jr_intro_13":"지금 블록으로는 책가방이 있는 쪽으로 갈 수가 없어. 반복 횟수를 바꿔 책가방을 챙기러 갈 수 있게 해줘.","cparty_jr_intro_14":"반복 블록을 사용하여 책가방을 챙기러 가줘.","cparty_jr_intro_15":"학교가 정~말 멀리 있잖아? 그래도 반복 블록을 사용하면 쉽게 학교에 도착 할수 있을 거야.","make_new_project":"새로운 작품 만들기","open_old_project":"저장된 작품 불러오기","offline_download":"엔트리 다운로드","offline_release":"엔트리 오프라인 에디터 출시!","offline_description_1":"엔트리 오프라인 버전은","offline_description_2":"인터넷이 연결되어 있지 않아도 사용할 수 있습니다. ","offline_description_3":"지금 다운받아서 시작해보세요!","sw_week_2015":"2015 소프트웨어교육 체험 주간","cparty_desc":"두근두근 소프트웨어와의 첫만남","entry_offline_download":"엔트리 오프라인 \n다운로드","offline_desc_1":"엔트리 오프라인 버전은 인터넷이 연결되어 있지 않아도 사용할 수 있습니다.","offline_desc_2":"지금 다운받아서 시작해보세요!","download":"다운로드","version":"버전","file_size":"크기","update":"업데이트","use_range":"사용범위","offline_desc_free":"엔트리 오프라인은 기업과 개인 모두 제한 없이 무료로 사용하실 수 있습니다.","offline_required":"최소 요구사항","offline_required_detail":"디스크 여유 공간 500MB 이상, windows7 혹은 MAC OS 10.8 이상","offline_notice":"설치 전 참고사항","offline_notice_1":"1. 버전 1.3.2 에서는 하드웨어 연결 프로그램이 내장되어 있습니다.","offline_notice_2":"2. 별도의 웹브라우져가 필요하지 않습니다.","offline_notice_3":"버전 별 변경 사항 안내","cparty_jr_result_2":"고마워~ 덕분에 책가방을 챙겨서 학교에 올 수 있었어~ <br>다음 학교 가는 길도 함께 가자~ ","cparty_jr_result_3":"우왓! 학교까지 왔어! <br>하지만 더 적은 블록을 사용해도 학교에 갈 수 있는데<br> 다시 해볼래?","cparty_jr_result_4":"우왓! 책가방을 얻었어!<br> 하지만 더 적은 블록을 사용해도 책가방을 얻을 수 있는데 <br>다시 해볼래? ","lms_no_class":"아직 만든 학급이 없습니다.","lms_create_class":"학급을 만들어 주세요.","lms_add_class":"학급 만들기","lms_base_class":"기본","lms_delete_class":"삭제","lms_my_class":"나의 학급","lms_grade_1":"초등 1","lms_grade_2":"초등 2","lms_grade_3":"초등 3","lms_grade_4":"초등 4","lms_grade_5":"초등 5","lms_grade_6":"초등 6","lms_grade_7":"중등 1","lms_grade_8":"중등 2","lms_grade_9":"중등 3","lms_grade_10":"일반","lms_add_groupId_personal":"선생님께 받은 학급 아이디를 입력하여, 회원 정보에 추가하세요.","lms_add_groupId":"학급 아이디 추가하기","lms_add_group_account":"학급 계정 추가","lms_enter_group_info":"발급받은 학급 아이디와 비밀번호를 입력하세요.","lms_group_id":"학급 아이디","lms_group_pw":"비밀번호","lms_group_name":"소속 학급명","personal_pwd_alert":"올바른 비밀번호 양식을 입력해 주세요","personal_form_alert":"양식을 바르게 입력해 주세요","personal_form_alert_2":"모든 양식을 완성해 주세요","personal_no_pwd_alert":"비밀번호를 입력해 주세요","select_gender":"성별을 선택해 주세요","enter_group_id":"학급 아이디를 입력해 주세요","enter_group_pwd":"비밀번호를 입력해 주세요","info_added":"추가되었습니다","no_group_id":"학급 아이디가 존재하지 않습니다","no_group_pwd":"비밀번호가 일치하지 않습니다","lms_please_choice":"선택해 주세요.","group_lesson":"나의 학급 강의","lms_banner_add_group":"학급 기능 도입","lms_banner_entry_group":"엔트리 학급 만들기","lms_banner_desc_1":"우리 반 학생들을 엔트리에 등록하세요!","lms_banner_desc_2":"이제 보다 편리하고 쉽게 우리 반 학생들의 작품을 찾고,","lms_banner_desc_3":"성장하는 모습을 확인할 수 있습니다. ","lms_banner_download_manual":"메뉴얼 다운로드","lms_banner_detail":"자세히 보기","already_exist_email":"이미 존재하는 이메일 입니다.","remove_project":"작품을 삭제하시겠습니까?","study_lesson":"우리 반 학습하기","open_project":"작품 불러오기","make_group":"학급 만들기","project_share":"작품 공유하기","group_project_share":"학급 공유하기","group_discuss":"학급 글 나누기","my_profile":"마이 페이지","search_updated":"최신 작품","search_recent":"최근 조회수 높은 작품","search_complexity":"최근 제작에 공들인 작품","search_staffPicked":"스태프선정 작품 저장소","search_childCnt":"사본이 많은 작품","search_likeCnt":"최근 좋아요가 많은 작품","gnb_share":"공유하기","gnb_community":"커뮤니티","lms_add_lectures":"강의 올리기","lms_add_course":"강의 모음 올리기","lms_add_homework":"과제 올리기","remove_lecture_confirm":"강의를 정말 삭제하시겠습니까?","popup_delete":"삭제하기","remove_course_confirm":"강의모음을 정말 삭제하시겠습니까?","lms_no_lecture_teacher_1":"추가된 강의가 없습니다.","lms_no_lecture_teacher_2":"우리 반 강의를 추가해 주세요.","gnb_download":"다운로드","lms_no_lecture_student_1":"아직 올라온 강의가 없습니다.","lms_no_lecture_student_2":"선생님이 강의를 올려주시면,","lms_no_lecture_student_3":"학습 내용을 확인할 수 있습니다.","lms_no_class_teacher":"아직 만든 학급이 없습니다.","lms_no_course_teacher_1":"추가된 강의 모음이 없습니다.","lms_no_course_teacher_2":"우리 반 강의모음을 추가해 주세요.","lms_no_course_student_1":"아직 올라온 강의 모음이 없습니다.","lms_no_course_student_2":"선생님이 강의 모음을  올려주시면,","lms_no_course_student_3":"학습 내용을 확인할 수 있습니다.","lms_no_hw_teacher_1":"추가된 과제가 없습니다.","lms_no_hw_teacher_2":"우리 반 과제를 추가해 주세요.","lms_no_hw_student_1":"아직 올라온 과제가 없습니다.","lms_no_hw_student_2":"선생님이 과제를 올려주시면,","lms_no_hw_student_3":"학습 내용을 확인할 수 있습니다.","modal_edit":"수정하기","modal_deadline":"마감일 설정","modal_hw_desc":"상세설명 (선택)","desc_optional":"","modal_create_hw":"과제 만들기","vol":"회차","hw_title":"과제명","hw_description":"내용","deadline":"마감일","do_homework":"과제하기","hw_progress":"진행 상태","hw_submit":"제출","view_list":"명단보기","view_desc":"내용보기","do_submit":"제출하기","popup_notice":"알림","no_selected_hw":"선택된 과제가 없습니다.","hw_delete_confirm":"선택한 과제를 정말 삭제하시겠습니까?","hw_submitter":"과제 제출자 명단","hw_student_desc_1":"* '제출하기'를 눌러 제출을 완료하기 전까지 얼마든지 수정이 가능합니다","hw_student_desc_2":"* 제출 기한이 지나면 과제를 제출할 수 없습니다.","popup_create_class":"학급 만들기","class_name":"학급 이름","image":"이미지","select_class_image":"학급 이미지를 선택해 주세요.","type_class_description":"학급 소개 입력","set_as_primary_group":"기본학급으로 지정","set_primary_group":"지정","not_primary_group":"지정안함","type_class_name":"학급 이름을 입력해주세요. ","type_class_description_long":"학급 소개를 입력해 주세요. 80자 내외","add_students":"학생 추가하기","invite_students":"학급에 학생 초대하기","invite_with_class":"1. 학급 코드로 초대하기","invite_code_expiration":"코드 만료시간","generate_code_button":"코드재발급","generate_code_desc":"학생의 학급 코드 입력 방법","generate_code_desc1":"엔트리 홈페이지에서 로그인을 해주세요.","generate_code_desc2":"메뉴바에서<나의 학급>을 선택해주세요.","generate_code_desc3":"<학급코드 입력하기>를 눌러 학급코드를 입력해주세요.","invite_with_url":"2. 학급 URL로 초대하기","copy_invite_url":"복사하기","download_as_pdf":"학급계정 PDF로 내려받기","download_as_excel":"학급계정 엑셀로 내려받기","temp_password":"임시 비밀번호 발급","step_name":"이름 입력","step_info":"정보 추가/수정","preview":"미리보기","type_name_enter":"학급에 추가할 학생의 이름을 입력하고 엔터를 치세요.","multiple_name_possible":"여러명의 이름 입력이 가능합니다.","id_auto_create":"학번은 별도로 수정하지 않으면 자동으로 생성됩니다.","student_id_desc_1":"학급 아이디는 별도의 입력없이 자동으로 생성됩니다.","student_id_desc_2":"단, 엔트리에 이미 가입된 학생을 학급에 추가한다면 학생의 엔트리 아이디를","student_id_desc_3":"입력해주세요. 해당 학생은 로그인 후, 학급 초대를 수락하면 됩니다.","student_number":"학번","temp_password_desc_1":"임시 비밀번호로 로그인 후,","temp_password_desc_2":"신규 비밀번호를 다시 설정할 수 있도록 안내해주세요.","temp_password_desc_3":"*한번 발급된 임시 비밀번호는 다시 볼 수 없습니다.","student_delete_confirm":"학생을 정말 삭제하시겠습니까?","no_student_selected":"선택된 학생이 없습니다.","class_assignment":"학급 과제","class_list":"학급 목록","select_grade":"학년을 선택 하세요.","add_project":"작품 공유하기","no_project_display":"아직 학생들이 전시한 작품이 없습니다.","plz_display_project":"나의 작품을 전시해 주세요.","refuse_confirm":"학급 초대를 정말 거절하시겠습니까?","select_class":"학급 선택","mon":"월","tue":"화","wed":"수","thu":"목","fri":"금","sat":"토","sun":"일","jan":"1월","feb":"2월","mar":"3월","apr":"4월","may":"5월","jun":"6월","jul":"7월","aug":"8월","sep":"9월","oct":"10월","nov":"11월","dec":"12월","plz_select_lecture":"강의를 선택해 주세요.","plz_set_deadline":"마감일을 설정해 주세요.","hide_entry":"엔트리 가리기","hide_others":"기타 가리기","show_all":"모두 보기","lecture_description":"선생님들이 직접 만드는 엔트리 학습 공간입니다. 강의에서 예시작품을 보고 작품을 만들며 배워 보세요.","curriculum_description":"학습 순서와 주제에 따라 여러 강의가 모아진 학습 공간입니다. 강의 모음의 순서에 맞춰 차근차근 배워보세요.","linebreak_off_desc_1":"글상자의 크기가 글자의 크기를 결정합니다.","linebreak_off_desc_2":"내용을 한 줄로만 작성할 수 있습니다.","linebreak_off_desc_3":"새로운 글자가 추가되면 글상자의 좌우 길이가 길어집니다.","linebreak_on_desc_1":"글상자의 크기가 글자가 쓰일 수 있는 영역을 결정합니다.","linebreak_on_desc_2":"내용 작성시 엔터키로 줄바꿈을 할 수 있습니다.","linebreak_on_desc_3":"내용을 작성하시거나 새로운 글자를 추가시 길이가 글상자의 가로 영역을 넘어서면 자동으로 줄이 바뀝니다.","entry_with":"함께 만드는 엔트리","ebs_season_1":"시즌 1 보러가기","ebs_season_2":"시즌 2 보러가기","partner":"파트너","project_term_popup_title":"작품 공개에 따른 엔트리 저작권 정책 동의","project_term_popup_description_1":"작품 공개를 위해","project_term_popup_description_2":"아래 정책을 확인해주세요.","project_term_popup_description_3":"","project_term_popup_description_4":"","project_term_agree_1_1":"내가 만든 작품과 그 소스코드의 공개를 동의합니다.","project_term_agree_2_1":"다른 사람이 나의 작품을 이용하는 것을 허락합니다.","project_term_agree_2_2":"( 복제 , 배포 , 공중송신 포함 )","project_term_agree_3_1":"다른 사람이 나의 작품을 수정하는 것을 허락합니다.","project_term_agree_3_2":"( 리믹스, 변형, 2차 제작물 작성 포함)","agree_all":"전체 동의","select_login":"로그인 선택","select":"선택하세요","with_login":"로그인 하고","without_login":"로그인 안하고","start_challenge":"미션 도전하기","start_challenge_2":"미션 도전하기","if_not_save_not_login":"* 로그인을 안하고 미션에 참여하시면 진행 상황이 저장되지 않습니다.","if_not_member_yet":"엔트리 회원이 아니라면?","join_entry":"엔트리 회원 가입하기","learned_computing":"기존에 소프트웨어 교육을 받아보셨나요?","cparty_index_description_1":"두근두근 소프트웨어와 첫 만남.","cparty_index_description_2":"소프트웨어랑 재미있게 놀다 보면 소프트웨어의 원리도 배우고,  생각하는 힘도 쑥쑥!","cparty_index_description_3":"엔트리를 통해 코딩 미션에 도전하고 인증서 받으세요.","cparty_index_description_4":"2015 Online Coding Party는","cparty_index_description_5":"SW교육 체험 주간","cparty_index_description_6":"의 일환으로써,","cparty_index_description_7":"초등컴퓨팅교사협회","cparty_index_description_8":"와 함께 만들어졌습니다.","cparty_index_description_9":"2016 Online Coding Party는","congratulation":"축하 드립니다!","warm_up":"체험","beginner":"입문","intermediate":"기본","advanced":"발전","applied":"응용","cert_msg_tail":"과정을 성공적으로 마쳤습니다.","cert_msg_head":"","maze_text_content_1":"안녕? 나는 엔트리봇이야. 지금 나는 공장에서 탈출을 해야 해! 탈출하기 위해서 먼저 몸을 고쳐야 할 것 같아. 앞에 있는 부품을 얻을 수 있게 도와줄래? move()","maze_text_content_2":"좋아 아주 잘했어! 덕분에 몸이 한결 가벼워졌어! 이번에도 부품상자까지 나를 이동시켜줘. 그런데 가는길에 장애물이 있어. 장애물 앞에서는 jump()","maze_text_content_3":"멋진걸! 저기에도 부품이 있어! 길이 조금 꼬여있지만 오른쪽, 왼쪽으로 회전할 수 있는 right(); left() 명령어를 쓰면 충분히 갈 수 있을것 같아!","maze_text_content_4":"좋아 이제 움직이는 건 많이 편해졌어! 이번에는 지금까지 배운 명령어를 같이 써서 저 부품상자까지 가보자!","maze_text_content_5":"우와 부품이 두 개나 있잖아! 두 개 다 챙겨서 가자! 그러면 몸을 빨리 고칠 수 있을 것 같아!","maze_text_content_6":"이번이 마지막 부품들이야! 저것들만 있으면 내 몸을 다 고칠 수 있을 거야! 이번에도 도와줄 거지?","maze_text_content_7":"덕분에 몸이 아주 좋아졌어! 이제 똑같은 일을 여러 번 반복해도 무리는 없을 거야. 어? 그런데 앞에 있는 저 로봇은 뭐지? 뭔가 도움이 필요한 것 같아! 도와주자! for 명령어를 사용해서 저 친구한테 나를 데려다줘!","maze_text_content_8":"좋아! 덕분에 친구 로봇을 살릴 수 있었어! 하지만 앞에도 도움이 필요한 친구가 있네, 하지만 이번에는 벌집이 있으니까 조심해서 벌집에 안 닿게 뛰어넘어가자! 할 수 있겠지? 이번에도 for 명령어를 사용해서 친구가 있는곳까지 나를 이동시켜줘!","maze_text_content_9":"이번에는 for 명령어 대신 미션이 끝날때까지 같은 일을 반복하도록 하는 while 명령어를 사용해봐! 나를 친구에게 데려다주면 미션이 끝나!","maze_text_content_10":"이번에는 if 명령어가 나왔어! if와 while 명령어를 사용해서 내가 언제 어느 쪽으로 회전해야 하는지 알려줘!","maze_text_content_11":"좋아 아까 했던 것처럼 해볼까? 언제 왼쪽으로 돌아야 하는지 알려줄 수 있겠어?","maze_text_content_12":"이번에는 중간중간 벌집(bee)이 있네? 언제 뛰어넘어가야 할지 알려줄래?","maze_text_content_13":"여기저기 도움이 필요한 친구들이 많이 있네! 모두 가서 도와주자!","maze_text_content_14":"우와 이번에도 도와줘야 할 친구들이 많네. 먼저 조그마한 사각형을 돌도록 명령어를 만들고 만든 걸 반복해서 모든 친구를 구해보자.","maze_text_content_15":"오래 움직이다 보니 벌써 지쳐버렸어. 자주 쓰는 명령어를 function 명령어를 사용해서 함수로 만들어 놓았어! 함수를 사용하여 나를 배터리 까지 이동시켜줘!","maze_text_content_16":"좋아 멋진걸! 그럼 이번에는 함수에 들어갈 명령어들을 넣어서 나를 배터리까지 이동시켜줘!","maze_text_content_17":"좋아 이번에는 함수를 만들고, 함수를 사용해서 배터리를 얻을 수 있도록 도와줘! 함수를 만들때 jump();를 잘 섞어봐!","maze_text_content_18":"이번에는 길이 좀 복잡한걸? 그래도 언제 left();를 쓰고, 언제 right();를 쓰면 되는지 알려만 주면 배터리 까지 갈 수 있겠어!.","maze_text_content_19":"이번에는 함수가 미리 정해져 있어! 그런데 함수만 써서 배터리까지 가기 힘들것 같아. 함수와 다른 명령어들을 섞어 써서 배터리 까지 이동시켜줘!","maze_text_content_20":"좋아! 지금까지 정말 멋지게 잘 해줬어. 덕분에 이제 마지막 배터리만 채우면 앞으로는 충전이 필요 없을 거야. 함수를 이용해서 저 배터리를 얻고 내가 자유롭게 살 수 있도록 도와줘!","maze_content_1":"안녕 나는 엔트리봇이라고 해. 지금 나는 공장에서 탈출하려는데 먼저 몸을 고쳐야 할 것 같아. 앞에 있는 부품을 얻을 수 있게 도와줄래? 앞으로 가기 블록을 조립하고 시작을 눌러봐.","maze_content_2":"좋아 아주 잘했어! 덕분에 몸이 한결 가벼워졌어! 앞에도 부품이 있는데 이번에는 잘못 가다간 감전되기 쉬울 것 같아. 한 번 장애물 뛰어넘기 블록을 써서 부품까지 가볼까?","maze_content_3":"멋진걸! 저기에도 부품이 있어! 길이 조금 꼬여있지만 회전하기 블록을 쓰면 충분히 갈 수 있을 것 같아! 이번에도 도와줄 거지?","maze_content_4":"좋아 이제 움직이는 건 많이 편해졌어! 이번에는 회전과 뛰어넘기를 같이 써서 저 부품을 얻어보자!","maze_content_5":"우와 부품이 두 개나 있잖아! 두 개 다 챙겨서 가자! 그러면 몸을 빨리 고칠 수 있을 것 같아!","maze_content_6":"이번이 마지막 부품들이야! 저것들만 있으면 내 몸을 다 고칠 수 있을 거야! 이번에도 도와줄 거지?","maze_content_7":"덕분에 몸이 아주 좋아졌어! 이제 똑같은 일을 여러 번 반복해도 무리는 없을 거야. 어? 그런데 앞에 있는 저 로봇은 뭐지? 뭔가 도움이 필요한 것 같아! 도와주자! 얼른 반복하기의 숫자를 바꿔서 저 친구한테 나를 데려다줘!","maze_content_8":"좋아! 덕분에 친구 로봇을 살릴 수 있었어! 하지만 앞에도 도움이 필요한 친구가 있는 것 같아, 하지만 이번에는 벌집이 있으니까 조심해서 벌집에 안 닿게 뛰어넘어가자! 할 수 있겠지? 그럼 아까 했던 것처럼 반복을 써서 친구한테 갈 수 있게 해줄래?","maze_content_9":"이번에는 숫자만큼 반복하는 게 아니라 친구 로봇한테 갈 때까지 똑같은 일을 반복할 수 있어! 이번에도 친구를 구할 수 있도록 도와줘!","maze_content_10":"이번에는 만약 블록이란 게 있어! 만약 블록을 써서 언제 어느 쪽으로 돌아야 하는지 알려줘!","maze_content_11":"좋아 아까 했던 것처럼 해볼까? 언제 왼쪽으로 돌아야 하는지 알려줄 수 있겠어?","maze_content_12":"이번에는 중간중간 벌집이 있네? 언제 뛰어넘어가야 할지 알려줄래?","maze_content_13":"여기저기 도움이 필요한 친구들이 많이 있네! 모두 도와주자!","maze_content_14":"우와 이번에도 도와줘야 할 친구들이 많네. 먼저 조그마한 사각형을 돌도록 블록을 만들고 만든 걸 반복해서 모든 친구를 구해보자.","maze_content_15":"반복을 하도 많이 했더니 자주 쓰는 블록은 외울 수 있을 것 같아! 약속 블록은 지금 내가 외운 블록들이야! 일단은 오래 움직여서 지쳤으니까 배터리를 좀 채울 수 있게 약속 호출 블록을 써서 배터리를 채울 수 있게 해줘!","maze_content_16":"좋아 멋진걸! 그럼 이번에는 네가 자주 쓰일 블록을 나한테 가르쳐줘! 약속 정의 블록 안에 자주 쓰일 블록을 넣어보면 돼!","maze_content_17":"좋아 이번에도 그러면 약속을 이용해서 배터리를 얻을 수 있도록 도와줄 거지? 약속에 뛰어넘기를 잘 섞어봐!","maze_content_18":"이번에는 길이 좀 복잡한걸? 그래도 언제 왼쪽으로 돌고, 언제 오른쪽으로 돌면 되는지 알려만 주면 충전할 수 있을 것 같아.","maze_content_19":"이번에는 약속이 미리 정해져 있어! 그런데 바로 약속을 쓰기에는 안될 것 같아. 내가 갈 길을 보고 약속을 쓰면 배터리를 채울 수 있을 것 같은데 도와줄 거지?","maze_content_20":"좋아! 지금까지 정말 멋지게 잘 해줬어. 덕분에 이제 마지막 배터리만 채우면 앞으로는 충전이 필요 없을 거야. 그러니까 약속을 이용해서 저 배터리를 얻고 내가 자유롭게 살 수 있도록 도와줄래?","ai_content_1":"안녕? 나는 엔트리봇이라고 해. 우주 탐사를 마치고 지구로 돌아가려는데 우주를 떠다니는 돌들 때문에 쉽지 않네. 내가 안전하게 집에 갈 수 있도록 도와줄래? 나의 우주선에는 나의 앞과 위, 아래에 무엇이 어느 정도의 거리에 있는지 알려주는 레이더가 있어 너의 판단을 도와줄 거야!","ai_content_2":"고마워! 덕분에 돌을 쉽게 피할 수 있었어. 그런데 이번엔 더 많은 돌이 있잖아? 블록들을 조립하여 돌들을 이리저리 잘 피해 보자!","ai_content_3":"좋았어! 안전하게 돌을 피했어. 그런데 앞을 봐! 아까보다 더 많은 돌이 있어. 하지만 걱정하지 마. 나에게 반복하기 블록이 있거든. 반복하기 블록 안에 움직이는 블록을 넣으면 목적지에 도착할 때까지 계속 움직일게!","ai_content_4":"대단해! 반복하기 블록을 쓰니 많은 돌을 피하기가 훨씬 수월한걸! 하지만 이렇게 일일이 조종하기는 피곤하다. 나에겐 레이더가 있으니 앞으로 무엇이 나올지 알 수 있어. 앞으로 계속 가다가 앞에 돌이 있으면 피할 수 있도록 해줄래?","ai_content_5":"잘했어! 여기까지 와서 아주 기뻐. 이번에는 레이더가 앞에 있는 물체까지의 거리를 말해줄 거야. 이 기능을 사용하여 돌을 피해 보자! 돌까지의 거리가 멀 때는 앞으로 계속 가다가, 거리가 가까워지면 피할 수 있도록 해줄래?","ai_content_6":"와~ 멋진걸? 레이더를 활용하여 돌을 잘 피해 나가고 있어! 이번에는 여러 개의 레이더를 사용하여 이리저리 돌들을 피해 나갈 수 있게 만들어줄래?","ai_content_7":"휴~ 지구에 점점 가까워지고 있어! 돌을 피할 때 기왕이면 더 안전한 길로 가고 싶어! 아마도 돌이 더 멀리 있는 쪽이 더 안전한 길이겠지? 위쪽 레이더와 아래쪽 레이더를 비교하여 더 안전한 쪽으로 움직이도록 해줄래?","ai_content_8":"좋아! 덕분에 무사히 비행하고 있어. 어? 그런데 저게 뭐지? 저건 내가 아주 위급한 상황에서 사용할 수 있는 특별한 에너지야! 이번에는 저 아이템들을 모두 모으며 움직이자!","ai_content_9":"훌륭해! 이제 지구까지 얼마 안 남았어. 그런데 앞을 보니 돌들로 길이 꽉 막혀서 지나갈 수가 없잖아? 하지만 걱정하지 마. 아이템을 획득해서 사용하면 앞에 있는 꽉 막힌 돌들을 없앨 수 있다고!","ai_content_10":"좋아! 드디어 저기 지구가 보여! 이럴 수가! 이제는 날아오는 돌들을 미리 볼 수가 없잖아? 돌들이 어떻게 날아올지 알지 못해도 지금까지처럼만 움직이면 잘 피할 수 있을 것 같아! 지구까지 가보는 거야!","maze_hints_title_1":"시작 방법","maze_hints_content_1":"엔트리봇은 어떻게 움직이나요?","maze_hints_detail_1":"1. 블록 꾸러미에서 원하는 블록을 꺼내어 “시작하기를 클릭했을 때” 블록과 연결해봐<br>2. 다 조립했으면, 시작을 눌러봐<br>3. 나는 네가 조립한 블록대로 위에서부터 순서대로 움직일게","maze_hints_title_2":"장애물 뛰어넘기","maze_hints_content_2":"장애물이 있으면 어떻게 해야하나요?","maze_hints_detail_2":"길을 가다보면 장애물을 만날 수 있어.<br>장애물이 앞에 있을 때에는 뛰어넘기 블록을 사용해야 해.","maze_hints_title_3":"반복 블록(1)","maze_hints_content_3":"(3)회 반복하기 블록은 어떻게 사용하나요?","maze_hints_detail_3":"같은 행동을 여러번 반복하려면 ~번 반복하기 블록을 사용해야 해.<br>반복하고 싶은 블록들을 ~번 반복하기 안에 넣고 반복 횟수를 입력하면 돼.","maze_hints_title_4":"반복 블록(2)","maze_hints_content_4":"~를 만날 때 까지 반복하기 블록은 어떻게 사용하나요?","maze_hints_detail_4":"~까지 반복하기'를 사용하면 같은 행동을 언제까지 반복할지를 정해줄 수 있어.<br>반복하고 싶은 블록들을 ~까지 반복하기안에 넣으면 돼.<br>그러면 {이미지}와 같은 타일 위에 있는 경우 반복이 멈추게 될 거야.","maze_hints_title_5":"만약 블록","maze_hints_content_5":"만약 ~라면 블록은 어떻게 동작하나요?","maze_hints_detail_5":"만약 앞에 {이미지}가 있다면' 블록을 사용하면 앞에 {이미지}가 있을 때 어떤 행동을 할 지 정해줄 수 있어.<br>앞에 {이미지}가 있을 때에만 블록 안의 블록들을 실행하고<br> 그렇지 않으면 실행하지 않게 되는 거야.","maze_hints_title_6":"반복 블록(3)","maze_hints_content_6":"모든 ~를 만날 때 까지 블록은 어떻게 동작하나요?","maze_hints_detail_6":"모든 {타일}에 한 번씩 도착할 때까지 그 안에 있는 블록을 반복해서 실행해.<br>모든 {타일}에 한 번씩 도착하면 반복이 멈추게 될 거야.","maze_hints_title_7":"특별 힌트","maze_hints_content_7":"너무 어려워요. 도와주세요.","maze_hints_detail_7":"내가 가야하는 길을 자세히 봐. 작은 사각형 4개가 보여?<br>작은 사각형을 도는 블록을 만들고, 반복하기를 사용해 보는것은 어때?","maze_hints_title_8":"약속","maze_hints_content_8":"약속하기/약속 불러오기 무엇인가요? 어떻게 사용하나요?","maze_hints_detail_8":"나를 움직이기 위해 자주 쓰는 블록들의 묶음을 '약속하기' 블록 아래에 조립하여 약속으로 만들 수 있어.<br>한번 만들어 놓은 약속은 '약속 불러오기' 블록을 사용하여 여러 번 꺼내 쓸 수 있다구.","ai_hints_title_1_1":"게임의 목표","ai_hints_content_1_1":"돌을 피해 오른쪽 행성까지 안전하게 이동할 수 있도록 도와주세요.","ai_hints_detail_1_1":"돌을 피해 오른쪽 행성까지 안전하게 이동할 수 있도록 도와주세요.","ai_hints_title_1_2":"시작 방법","ai_hints_content_1_2":"어떻게 시작할 수 있나요?","ai_hints_detail_1_2":"1. 블록 꾸러미에서 원하는 블록을 꺼내어 “시작하기를 클릭했을 때” 블록과 연결해봐<br>2. 다 조립했으면, 시작을 눌러봐<br>3. 나는 네가 조립한 블록대로 위에서부터 순서대로 움직일게","ai_hints_title_1_3":"움직이게 하기","ai_hints_content_1_3":"엔트리봇은 어떻게 움직이나요?","ai_hints_detail_1_3":"나는 위쪽으로 가거나 앞으로 가거나 아래쪽으로 갈 수 있어.<br>방향을 정할 때에는 돌이 없는 방향으로 안전하게 갈 수 있도록 해줘.<br>나를 화면 밖으로 내보내면 우주미아가 되어버리니 조심해!","ai_hints_title_2_1":"게임의 목표","ai_hints_content_2_1":"반복하기 블록으로 돌들을 피할 수 있도록 도와주세요.","ai_hints_detail_2_1":"반복하기 블록으로 돌들을 피할 수 있도록 도와주세요.","ai_hints_title_2_2":"반복 블록","ai_hints_content_2_2":"반복 블록은 무슨 블록인가요?","ai_hints_detail_2_2":"휴~ 이번에 가야 할 길은 너무 멀어서 하나씩 조립하기는 힘들겠는걸? 반복하기블록을 사용해봐.<br>똑같이 반복되는 블록들을 반복하기 블록으로 묶어주면 아주 긴 블록을 짧게 줄여줄 수 있어!","ai_hints_content_3_1":"만약 블록으로 돌을 피할 수 있도록 도와주세요.","ai_hints_title_3_2":"만약 블록(1)","ai_hints_content_3_2":"만약 ~라면 블록은 어떻게 동작하나요?","ai_hints_detail_3_2":"만약 앞에 ~가 있다면 / 아니면 블록을 사용하면 내 바로 앞에 돌이 있는지 없는지 확인해서 다르게 움직일 수 있어~<br>만약 내 바로 앞에 돌이 있다면 '만약' 아래에 있는 블록들을 실행하고 돌이 없으면 '아니면' 안에 있는 블록들을 실행할 거야.<br>내 바로 앞에 돌이 있을 때와 없을 때, 어떻게 움직일지 잘 결정해줘~","ai_hints_content_4_1":"레이더의 사용 방법을 익히고 돌을 피해보세요.","ai_hints_detail_4_1":"레이더의 사용 방법을 익히고 돌을 피해보세요.","ai_hints_title_4_2":"레이더(1)","ai_hints_content_4_2":"레이더란 무엇인가요? 어떻게 활용할 수 있나요?","ai_hints_detail_4_2":"레이더는 지금 내가 물체와 얼마나 떨어져 있는지 알려주는 기계야.<br>만약 바로 내 앞에 무엇인가 있다면 앞쪽 레이더는 '1'을 보여줘.<br>또, 레이더는 혼자 있을 때 보다 만약 &lt;사실&gt;이라면 / 아니면 블록과<br> 같이 쓰이면 아주 강력하게 쓸 수 있어.<br>예를 들어 내 앞에 물체와의 거리가 1보다 크다면 나는 안전하게 앞으로 갈 수 있겠지만, 아니라면 위나 아래쪽으로 피하도록 할 수 있지.","ai_hints_title_4_3":"만약 블록(2)","ai_hints_content_4_3":"만약 <사실>이라면 블록은 어떻게 사용하나요?","ai_hints_detail_4_3":"만약 &lt;사실&gt;이라면 / 아니면 블록은 &lt;사실&gt; 안에 있는 내용이 맞으면 '만약' 아래에 있는 블록을 실행하고, 아니면 '아니면' 아래에 있는 블록을 실행해.<br>어떤 상황에서 다르게 움직이고 싶은 지를 잘 생각해서 &lt;사실&gt; 안에 적절한 판단 조건을 만들어 넣어봐.<br>판단 조건을 만족해서 '만약' 아래에 있는 블록을 실행하고 나면 '아니면' 아래에 있는 블록들은 실행되지 않는다는 걸 기억해!","ai_hints_content_5_1":"레이더를 활용해 돌을 쉽게 피할 수 있도록 도와주세요.","ai_hints_detail_5_1":"레이더를 활용해 돌을 쉽게 피할 수 있도록 도와주세요.","ai_hints_title_5_2":"만약 블록(3)","ai_hints_content_5_2":"만약 블록이 겹쳐져 있으면 어떻게 동작하나요?","ai_hints_detail_5_2":"만약 ~ / 아니면 블록안에도 만약 ~ / 아니면 블록을 넣을 수 있어! 이렇게 되면 다양한 상황에서 내가 어떻게 행동해야 할지 정할 수 있어.<br>예를 들어 앞에 돌이 길을 막고 있을때와 없을때의 행동을 정한다음, 돌이 있을때의 상황에서도 상황에 따라 위쪽으로 갈지 아래쪽으로 갈지 선택 할 수 있어","ai_hints_title_6_1":"레이더(2)","ai_hints_content_6_1":"위쪽 레이더와 아래쪽 레이더의 값을 비교하고 싶을 땐 어떻게 하나요?","ai_hints_detail_6_1":"([위쪽]레이더) 블록은 위쪽 물체까지의 거리를 뜻하는 블록이야.<br>아래쪽과 위쪽 중에서 어느 쪽에 돌이 더 멀리 있는지 확인하기 위해서 쓸 수 있는 블록이지.<br>돌을 피해가는 길을 선택할 때에는 돌이 멀리 떨어져 있는 쪽으로 피하는게 앞으로 멀리 가는데 유리할거야~","ai_hints_content_7_1":"아이템을 향해 이동하여 돌을 피해보세요.","ai_hints_detail_7_1":"아이템을 향해 이동하여 돌을 피해보세요.","ai_hints_title_7_2":"물체 이름 확인","ai_hints_content_7_2":"앞으로 만날 물체의 이름을 확인해서 무엇을 할 수 있나요?","ai_hints_detail_7_2":"아이템을 얻기위해서는 아이템이 어디에 있는지 확인할 필요가 있어. <br>그럴 때 사용할 수 있는 블록이 [위쪽] 물체는 [아이템]인가? 블록이야.<br>이 블록을 활용하면 아이템이 어느 위치에 있는지 알 수 있고 아이템이 있는 방향으로 움직이도록 블록을 조립할 수 있어.","ai_hints_content_8_1":"아이템을 적절하게 사용해서 돌을 피해보세요.","ai_hints_detail_8_1":"아이템을 적절하게 사용해서 돌을 피해보세요.","ai_hints_title_8_2":"아이템","ai_hints_content_8_2":"아이템은 어떻게 얻고 사용하나요?","ai_hints_detail_8_2":"돌들을 이리저리 잘 피해 나가더라도 앞이 모두 돌들로 꽉 막혀있을 땐 빠져나갈 방법이 없겠지? 그럴 때에는 아이템사용 블럭을 사용해봐. <br>이 블록은 내 앞의 돌들을 모두 없애는 블록이야.<br>단, 아이템이 있어야지만 블록을 사용할 수 있고, 아이템은 이미지를 지나면 얻을 수 있어.","ai_hints_content_9_1":"지금까지 배운 것들을 모두 활용해서 최대한 멀리 가보세요.","ai_hints_detail_9_1":"지금까지 배운 것들을 모두 활용해서 최대한 멀리 가보세요.","ai_hints_title_9_2":"그리고","ai_hints_content_9_2":"그리고 블록은 어떻게 사용하나요?","ai_hints_detail_9_2":"그리고 블록에는 여러개의 조건을 넣을 수 있어, 넣은 모든 조건이 사실일때만 사실이 되어 만약 블록 안에 있는 블록이 실행되고, 하나라도 거짓이 있으면 거짓으로 인식해서 그 안에 있는 블록을 실행하지 않아","maze_text_goal_1":"move(); 명령어를 사용하여 부품 상자까지 나를 이동시켜줘!","maze_text_goal_2":"jump(); 명령어로 장애물을 피해 부품 상자까지 나를 이동시켜줘!","maze_text_goal_3":"left(); right();  명령어로 부품상자까지 나를 이동시켜줘!","maze_text_goal_4":"여러가지 명령어를 사용하여 부품상자까지 나를 이동시켜줘!","maze_text_goal_5":"두 부품상자에 다 갈 수 있도록 나를 이동시켜줘!","maze_text_goal_6":"두 부품상자에 다 갈 수 있도록 나를 이동시켜줘!","maze_text_goal_7":"for 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_8":"for 명령어를 사용하고, 장애물을 피해 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_9":"while 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_10":"if와 while 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_11":"if와 while 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_12":"if와 while 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_13":"while과 for 명령어를 사용하여 모든 친구들을 만날 수 있도록 나를 이동시켜줘!","maze_text_goal_14":"while과 for 명령어를 사용하여 모든 친구들을 만날 수 있도록 나를 이동시켜줘!","maze_text_goal_15":"함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_16":"함수에 명령어를 넣고 함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_17":"함수에 명령어를 넣고 함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_18":"함수에 명령어를 넣고 함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_19":"함수에 명령어를 넣고 함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_20":"함수와 다른명령어들을 섞어 사용하여 배터리까지 나를 이동시켜줘!","above_radar":"위쪽 레이더","bottom_radar":"아래쪽 레이더","front_radar":"앞쪽 레이더","above_object":"위쪽 물체","front_object":"앞쪽 물체","object_below":"아래쪽 물체","destination":"목적지","asteroids":"돌","item":"아이템","wall":"벽","buy_now":"구매바로가기","goals":"목표","instructions":"이용 안내","object_info":"오브젝트 정보","entry_basic_mission":"엔트리 기본 미션","entry_application_mission":"엔트리 응용 미션","maze_move_forward":"앞으로 한 칸 이동","maze_when_run":"시작하기를 클릭했을때","maze_turn_left":"왼쪽으로 회전","maze_turn_right":"오른쪽으로 회전","maze_repeat_times_1":"","maze_repeat_times_2":"번 반복하기","maze_repeat_until_1":"","maze_repeat_until_2":"을 만날때까지 반복","maze_call_function":"약속 불러오기","maze_function":"약속하기","maze_repeat_until_all_1":"모든","maze_repeat_until_all_2":"만날 때 까지 반복","command_guide":"명령어 도움말","ai_success_msg_1":"덕분에 무사히 지구에 도착할 수 있었어! 고마워!","ai_success_msg_2":"다행이야! 덕분에","ai_success_msg_3":"번 만큼 앞쪽으로 갈 수 있어서 지구에 구조 신호를 보냈어! 이제 지구에서 구조대가 올거야! 고마워!","ai_success_msg_4":"좋았어!","ai_cause_msg_1":"이런, 어떻게 움직여야 할 지 더 말해줄래?","ai_cause_msg_2":"아이쿠! 정말로 위험했어! 다시 도전해보자","ai_cause_msg_3":"우와왓! 가야할 길에서 벗어나버리면 우주 미아가 되버릴꺼야. 다시 도전해보자","ai_cause_msg_4":"너무 복잡해, 이 블록을 써서 움직여볼래?","ai_move_forward":"앞으로 가기","ai_move_above":"위쪽으로 가기","ai_move_under":"아래쪽으로 가기","ai_repeat_until_dest":"목적지에 도달 할 때까지 반복하기","ai_if_front_1":"만약 앞에","ai_if_front_2":"가 있다면","ai_else":"아니면","ai_if_1":"만약","ai_if_2":"이라면","ai_use_item":"아이템 사용","ai_radar":"레이더","ai_above":"위쪽","ai_front":"앞쪽","ai_under":"아래쪽","ai_object_is_1":"","ai_object_is_2":"물체는","challengeMission":"다른 미션 도전하기","withTeacher":"함께 만든 선생님들","host":"주최","support":"후원","subjectivity":"주관","learnMore":" 더 배우고 싶어요","ai_object_is_3":"인가?","stage_is_not_available":"아직 진행할 수 없는 스테이지입니다. 순서대로 스테이지를 진행해 주세요.","progress_not_saved":"진행상황이 저장되지 않습니다.","want_refresh":"이 페이지를 새로고침 하시겠습니까?","monthly_entry_grade":"초등학교 3학년 ~ 중학교 3학년","monthly_entry_contents":"매월 발간되는 월간엔트리와 함께 소프트웨어 교육을 시작해 보세요!  차근차근 따라하며 쉽게 익힐 수 있도록 가볍게 구성되어있습니다. 기본, 응용 콘텐츠와 더 나아가기까지! 매월 업데이트되는 8개의 콘텐츠와 교재를 만나보세요~","monthly_entry_etc1":"*메인 페이지의 월간 엔트리 추천코스를 활용하면 더욱 쉽게 수업을 할 수 있습니다.","monthly_entry_etc2":"*월간엔트리는 학기 중에만 발간됩니다.","group_make_lecture_1":"내가 만든 강의가 없습니다.","group_make_lecture_2":"'만들기>오픈 강의 만들기'에서","group_make_lecture_3":"우리반 학습내용에 추가하고 싶은 강의를 만들어 주세요.","group_make_lecture_4":"강의 만들기","group_add_lecture_1":"관심 강의가 없습니다.","group_add_lecture_2":"'학습하기>오픈 강의> 강의'에서 우리반 학습내용에","group_add_lecture_3":"추가하고 싶은 강의를 관심강의로 등록해 주세요.","group_add_lecture_4":"강의 보기","group_make_course_1":"내가 만든 강의 모음이 없습니다.","group_make_course_2":"'만들기 > 오픈 강의 만들기> 강의 모음 만들기'에서","group_make_course_3":"학습내용에 추가하고 싶은 강의 모음을 만들어 주세요.","group_make_course_4":"강의 모음 만들기","group_add_course_1":"관심 강의 모음이 없습니다.","group_add_course_2":"'학습하기 > 오픈 강의 > 강의 모음'에서 우리반 학습내용에","group_add_course_3":"추가하고 싶은 강의 모음을 관심 강의모음으로 등록해 주세요.","group_add_course_4":"강의 모음 보기","hw_main_title":"프로그램 다운로드","hw_desc_wrapper_1":"엔트리 하드웨어 연결 프로그램과 오프라인 버전이","hw_desc_wrapper_2":"서비스를 한층 더 강화해 업그레이드 되었습니다.","hw_desc_wrapper_3":"업데이트 된 프로그램을 설치해주세요!","hw_downolad_link":"하드웨어 연결 \n프로그램 다운로드"};Lang.Msgs={"invalid_url":"영상 주소를 다시 확인해 주세요.","auth_only":"인증된 사용자만 이용이 가능합니다.","runtime_error":"실행 오류","to_be_continue":"준비 중입니다.","warn":"경고","error_occured":"다시 한번 시도해 주세요. 만약 같은 문제가 다시 발생 하면 '제안 및 건의' 게시판에 문의 바랍니다. ","list_can_not_space":"리스트의 이름은 빈 칸이 될 수 없습니다.","sign_can_not_space":"신호의 이름은 빈 칸이 될 수 없습니다.","variable_can_not_space":"변수의 이름은 빈 칸이 될 수 없습니다.","training_top_title":"연수 프로그램","training_top_desc":"엔트리 연수 지원 프로그램을 안내해 드립니다.","training_main_title01":"선생님을 위한 강사 연결 프로그램","training_target01":"교육 대상 l 선생님","training_sub_title01":"“우리 교실에 SW날개를 달자”","training_desc01":"소프트웨어(SW) 교원 연수가 필요한 학교인가요?\nSW 교원 연수가 필요한 학교에 SW교육 전문 선생님(고투티처) 또는 전문 강사를 연결해드립니다.","training_etc_ment01":"* 강의비 등 연수 비용은 학교에서 지원해주셔야합니다.","training_main_title02":"소프트웨어(SW) 선도학교로 찾아가는 교원연수","training_target02":"교육 대상 l SW 선도, 연구학교","training_sub_title02":"“찾아가, 나누고, 이어가다”","training_desc02":"SW 교원 연수를 신청한 선도학교를 무작위로 추첨하여 상반기(4,5,6월)와\n하반기(7,8,9월)에 각 지역의 SW교육 전문 선생님(고투티처)께서 알차고\n재미있는 SW 기초 연수 진행 및 풍부한 교육사례를 공유하기 위해 찾아갑니다.","training_etc_ment02":"* 하반기 연수 모집 예정","training_main_title03":"학부모와 학생을 위한 연결 프로그램","training_target03":"교육 대상 l 학부모, 학생","training_sub_title03":"“SW를 더 가까이 만나는 시간”","training_desc03":"학부모와 학생들을 대상으로 소프트웨어(SW) 연수가 필요한 학교에 각 지역의 SW교육 전문 선생님(고투티처) 또는 전문 강사를 연결해드립니다.","training_etc_ment03":"* 강의비 등 연수 비용은 학교에서 지원해주셔야합니다.","training_apply":"신청하기","training_ready":"준비중입니다."};Lang.Users={"auth_failed":"인증에 실패하였습니다","birth_year":"태어난 해","birth_year_before_1990":"1990년 이전","edit_personal":"정보수정","email":"이메일","email_desc":"새 소식이나 정보를 받을 수 있 이메일 주소","email_inuse":"이미 등록된 메일주소 입니다","email_match":"이메일 주소를 올바르게 입력해 주세요","forgot_password":"암호를 잊으셨습니까?","job":"직업","language":"언어","name":"이름","name_desc":"사이트내에서 표현될 이름 또는 별명","name_not_empty":"이름을 반드시 입력하세요","password":"암호","password_desc":"최소 4자이상 영문자와 숫자, 특수문자","password_invalid":"암호가 틀렸습니다","password_long":"암호는 4~20자 사이의 영문자와 숫자, 특수문자로 입력해 주세요","password_required":"암호는 필수입력 항목입니다","project_list":"작품 조회","regist":"가입 완료","rememberme":"자동 로그인","repeat_password":"암호 확인","repeat_password_desc":"암호를 한번더 입력해 주세요","repeat_password_not_match":"암호가 일치하지 않습니다","sex":"성별","signup_required_for_save":"저장을 하려면 로그인이 필요합니다.","username":"아이디","username_desc":"로그인시 사용할 아이디","username_inuse":"이미 사용중인 아이디 입니다","username_long":"아이디는 4~20자 사이의 영문자로 입력해 주세요","username_unknown":"존재하지 않는 사용자 입니다"};Lang.Workspace={"new_project":"새 프로젝트","add_object":"오브젝트 추가하기","all":"전체","animal":"동물","arduino_entry":"아두이노 연결 프로그램","arduino_program":"아두이노 프로그램","arduino_sample":"엔트리 연결블록","arduino_driver":"아두이노 드라이버","cannot_add_object":"실행중에는 오브젝트를 추가할 수 없습니다.","cannot_add_picture":"실행중에는 모양을 추가할 수 없습니다.","cannot_add_sound":"실행중에는 소리를 추가할 수 없습니다.","cannot_edit_click_to_stop":"실행중에는 수정할 수 없습니다.\n클릭하여 정지하기.","cannot_open_private_project":"비공개 작품은 불러올 수 없습니다. 홈으로 이동합니다.","cannot_save_running_project":"실행 중에는 저장할 수 없습니다.","character_gen":"캐릭터 만들기","check_runtime_error":"빨간색으로 표시된 블록을 확인해 주세요.","context_download":"PC에 저장","context_duplicate":"복제","context_remove":"삭제","context_rename":"이름 수정","coordinate":"좌표","create_function":"함수 만들기","direction":"이동 방향","drawing":"직접 그리기","enter_list_name":"새로운 리스트의 이름을 입력하세요(10글자 이하)","enter_name":"새로운 이름을 입력하세요","enter_new_message":"새로운 신호의 이름을 입력하세요.","enter_variable_name":"새로운 변수의 이름을 입력하세요(10글자 이하)","family":"엔트리봇 가족","fantasy":"판타지/기타","file_new":"새로 만들기","file_open":"온라인 작품 불러오기","file_upload":"오프라인 작품 불러오기","file_upload_login_check_msg":"오프라인 작품을 불러오기 위해서는 로그인을 해야 합니다.","file_save":"저장하기","file_save_as":"복사본으로 저장하기","file_save_download":"내 컴퓨터에 저장하기","func":"함수","function_create":"함수 만들기","function_add":"함수 추가","interface":"인터페이스","landscape":"배경","list":"리스트","list_add_calcel":"리스트 추가 취소","list_add_calcel_msg":"리스트 추가를 취소하였습니다.","list_add_fail":"리스트 추가 실패","list_add_fail_msg1":"같은 이름의 리스트가 이미 존재합니다.","list_add_fail_msg2":"리스트의 이름이 적절하지 않습니다.","list_add_ok":"리스트 추가 완료","list_add_ok_msg":"을(를) 추가하였습니다.","list_create":"리스트 추가","list_dup":"같은 이름의 리스트가 이미 존재합니다.","list_newname":"새로운 이름","list_remove":"리스트 삭제","list_rename":"리스트 이름 변경","list_rename_failed":"리스트 이름 변경 실패","list_rename_ok":"리스트의 이름이 성공적으로 변경 되었습니다.","list_too_long":"리스트의 이름이 너무 깁니다.","message":"신호","message_add_cancel":"신호 추가 취소","message_add_cancel_msg":"신호 추가를 취소하였습니다.","message_add_fail":"신호 추가 실패","message_add_fail_msg":"같은 이름의 신호가 이미 존재합니다.","message_add_ok":"신호 추가 완료","message_add_ok_msg":"을(를) 추가하였습니다.","message_create":"신호 추가","message_dup":"같은 이름의 신호가 이미 존재합니다.","message_remove":"신호 삭제","message_remove_canceled":"신호 삭제를 취소하였습니다.","message_rename":"신호 이름을 변경하였습니다.","message_rename_failed":"신호 이름 변경에 실패하였습니다. ","message_rename_ok":"신호의 이름이 성공적으로 변경 되었습니다.","message_too_long":"신호의 이름이 너무 깁니다.","no_message_to_remove":"삭제할 신호가 없습니다","no_use":"사용되지 않음","no_variable_to_remove":"삭제할 변수가 없습니다.","no_variable_to_rename":"변경할 변수가 없습니다.","object_not_found":"블록에서 지정한 오브젝트가 존재하지 않습니다.","object_not_found_for_paste":"붙여넣기 할 오브젝트가 없습니다.","people":"일반 사람들","picture_add":"모양 추가","plant":"식물","project":"작품","project_copied":"의 사본","PROJECTDEFAULTNAME":['멋진','재밌는','착한','큰','대단한','잘생긴','행운의'],"remove_object":"오브젝트 삭제","remove_object_msg":"(이)가 삭제되었습니다.","removed_msg":"(이)가 성공적으로 삭제 되었습니다.","rotate_method":"회전방식","rotation":"방향","run":"시작하기","saved":"저장완료","saved_msg":"(이)가 저장되었습니다.","save_failed":"저장시 문제가 발생하였습니다. 다시 시도해 주세요.","select_library":"라이브러리 선택","select_sprite":"적용할 스프라이트를 하나 이상 선택하세요.","shape_remove_fail":"모양 삭제 실패","shape_remove_fail_msg":"적어도 하나 이상의 모양이 존재하여야 합니다.","shape_remove_ok":"모양이 삭제 되었습니다. ","shape_remove_ok_msg":"이(가) 삭제 되었습니다.","sound_add":"소리 추가","sound_remove_fail":"소리 삭제 실패","sound_remove_ok":"소리 삭제 완료","sound_remove_ok_msg":"이(가) 삭제 되었습니다.","stop":"정지하기","pause":"일시정지","restart":"다시시작","speed":"속도 조절하기","tab_attribute":"속성","tab_code":"블록","tab_picture":"모양","tab_sound":"소리","tab_text":"글상자","textbox":"글상자","textbox_edit":"글상자 편집","textbox_input":"글상자의 내용을 입력해주세요.","things":"물건","upload":"파일 업로드","upload_addfile":"파일추가","variable":"변수","variable_add_calcel":"변수 추가 취소","variable_add_calcel_msg":"변수 추가를 취소하였습니다.","variable_add_fail":"변수 추가 실패","variable_add_fail_msg1":"같은 이름의 변수가 이미 존재합니다.","variable_add_fail_msg2":"변수의 이름이 적절하지 않습니다.","variable_add_ok":"변수 추가 완료","variable_add_ok_msg":"을(를) 추가하였습니다.","variable_create":"변수 만들기","variable_add":"변수 추가","variable_dup":"같은 이름의 변수가 이미 존재합니다.","variable_newname":"새로운 이름","variable_remove":"변수 삭제","variable_remove_canceled":"변수 삭제를 취소하였습니다.","variable_rename":"변수 이름을 변경합니다. ","variable_rename_failed":"변수 이름 변경에 실패하였습니다. ","variable_rename_msg":"'변수의 이름이 성공적으로 변경 되었습니다.'","variable_rename_ok":"변수의 이름이 성공적으로 변경 되었습니다.","variable_select":"변수를 선택하세요","variable_too_long":"변수의 이름이 너무 깁니다.","vehicle":"탈것","add_object_alert_msg":"오브젝트를 추가해주세요","add_object_alert":"경고","create_variable_block":"변수 만들기","create_list_block":"리스트 만들기","Variable_Timer":"초시계","Variable_placeholder_name":"변수 이름","Variable_use_all_objects":"모든 오브젝트에서 사용","Variable_use_this_object":"이 오브젝트에서 사용","Variable_used_at_all_objects":"모든 오브젝트에서 사용되는 변수","Variable_create_cloud":"공유 변수로 사용 <br>(서버에 저장됩니다)","Variable_used_at_special_object":"특정 오브젝트에서만 사용되는 변수 입니다. ","draw_new":"새로 그리기","painter_file":"파일 ▼","painter_file_save":"저장하기","painter_file_saveas":"새 모양으로 저장","painter_edit":"편집 ▼","get_file":"가져오기","copy_file":"복사하기","cut_picture":"자르기","paste_picture":"붙이기","remove_all":"모두 지우기","new_picture":"새그림","picture_size":"크기","picture_rotation":"회전","thickness":"굵기","textStyle":"글자","add_picture":"모양 추가","select_picture":"모양 선택","select_sound":"소리 선택","Size":"크기","show_variable":"변수 보이기","default_value":"기본값 ","slide":"슬라이드","min_value":"최솟값","max_value":"최댓값","number_of_list":"리스트 항목 수","use_all_objects":"모든 오브젝트에 사용","list_name":"리스트 이름","list_used_specific_objects":"특정 오브젝트에서만 사용되는 리스트 입니다. ","List_used_all_objects":"모든 오브젝트에서 사용되는 리스트","Scene_delete_error":"장면은 최소 하나 이상 존재해야 합니다.","Scene_add_error":"장면은 최대 10개까지 추가 가능합니다.","replica_of_object":"의 복제본","will_you_delete_scene":"장면은 한번 삭제하면 취소가 불가능 합니다. \n정말 삭제 하시겠습니까?","duplicate_scene":"복제하기","block_explain":"블록 설명 ","block_intro":"블록을 클릭하면 블록에 대한 설명이 나타납니다.","blocks_reference":"블록 설명","hardware_guide":"하드웨어 연결 안내","show_list_workspace":"리스트 보이기","List_create_cloud":"공유 리스트로 사용 <br>(서버에 저장됩니다)","confirm_quit":"바꾼 내용을 저장하지 않았습니다.","confirm_load_temporary":"저장되지 않은 작품이 있습니다. 여시겠습니까?","login_to_save":"로그인후에 저장 바랍니다.","cannot_save_in_edit_func":"함수 편집중에는 저장할 수 없습니다.","new_object":"새 오브젝트","arduino_connect":"하드웨어 연결","arduino_connect_success":"하드웨어가 연결되었습니다.","confirm_load_header":"작품 복구","uploading_msg":"업로드 중입니다","upload_fail_msg":"업로드에 실패하였습니다.</br>다시 한번 시도해주세요.","file_converting_msg":"파일 변환 중입니다.","file_converting_fail_msg":"파일 변환에 실패하였습니다.","fail_contact_msg":"문제가 계속된다면</br>contact_entry@entrylabs.org로 문의해주세요.","saving_msg":"저장 중입니다","saving_fail_msg":"저장에 실패하였습니다.</br>다시 한번 시도해주세요.","loading_msg":"불러오는 중입니다","loading_fail_msg":"불러오기에 실패하였습니다.</br>다시 한번 시도해주세요.","restore_project_msg":"정상적으로 저장되지 않은 작품이 있습니다. 해당 작품을 복구하시겠습니까?","quit_stop_msg":"저장 중에는 종료하실 수 없습니다.","ent_drag_and_drop":"업로드 하려면 파일을 놓으세요","not_supported_file_msg":"지원하지 않은 형식의 파일입니다.","broken_file_msg":"파일이 깨졌거나 잘못된 파일을 불러왔습니다.","check_audio_msg":"MP3, WAV 파일만 업로드가 가능합니다.","check_entry_file_msg":"ENT 파일만 불러오기가 가능합니다.","hardware_version_alert_text":"5월 30일 부터 구버전의 연결프로그램의 사용이 중단 됩니다.\n하드웨어 연결 프로그램을 최신 버전으로 업데이트 해주시기 바랍니다.","variable_name_auto_edited_title":"변수 이름 자동 변경","variable_name_auto_edited_content":"변수의 이름은 10글자를 넘을 수 없습니다.","list_name_auto_edited_title":"리스트 이름 자동 변경","list_name_auto_edited_content":"리스트의 이름은 10글자를 넘을 수 없습니다."};Lang.code="코드보기";Lang.EntryStatic={"group":"학급 학습하기","private":"나만보기","public":"오픈 강의","lecture_is_open_true":"공개","lecture_is_open_false":"비공개","category_all":"모든 작품","category_game":"게임","category_animation":"애니메이션","category_media_art":"미디어 아트","category_physical":"피지컬","category_etc":"기타","category_category_game":"게임","category_category_animation":"애니메이션","category_category_media_art":"미디어 아트","category_category_physical":"피지컬","category_category_etc":"기타","sort_created":"최신순","sort_viewer":"조회순","sort_like":"좋아요순","sort_comment":"댓글순","period_all":"전체기간","period_1":"오늘","period_7":"최근 1주일","period_30":"최근 1개월","period_90":"최근 3개월","lecture_required_time_1":" ~ 15분","lecture_required_time_2":"15분 ~ 30분","lecture_required_time_3":"30분 ~ 45분","lecture_required_time_4":"45 분 ~ 60분","lecture_required_time_5":"1시간 이상","usage_event":"이벤트","usage_signal":"신호보내기","usage_scene":"장면","usage_repeat":"반복","usage_condition_repeat":"조건반복","usage_condition":"조건","usage_clone":"복제본","usage_rotation":"회전","usage_coordinate":"좌표이동","usage_arrow_move":"화살표이동","usage_shape":"모양","usage_speak":"말하기","usage_picture_effect":"그림효과","usage_textBox":"글상자","usage_draw":"그리기","usage_sound":"소리","usage_confirm":"확인","usage_comp_operation":"비교연산","usage_logical_operation":"논리연산","usage_math_operation":"수리연산","usage_random":"무작위수","usage_timer":"초시계","usage_variable":"변수","usage_list":"리스트","usage_ask_answer":"묻고답하기","usage_function":"함수","usage_arduino":"아두이노","concept_resource_analytics":"자료수집/분석/표현","concept_procedual":"알고리즘과 절차","concept_abstractive":"추상화","concept_individual":"문제분해","concept_automation":"자동화","concept_simulation":"시뮬레이션","concept_parallel":"병렬화","subject_korean":"국어","subject_english":"영어","subject_mathmatics":"수학","subject_social":"사회","subject_science":"과학","subject_music":"음악","subject_paint":"미술","subject_athletic":"체육","subject_courtesy":"도덕","subject_progmatic":"실과","lecture_grade_1":"초1","lecture_grade_2":"초2","lecture_grade_3":"초3","lecture_grade_4":"초4","lecture_grade_5":"초5","lecture_grade_6":"초6","lecture_grade_7":"중1","lecture_grade_8":"중2","lecture_grade_9":"중3","lecture_grade_10":"일반","lecture_level_1":"쉬움","lecture_level_2":"중간","lecture_level_3":"어려움","listEnable":"리스트","functionEnable":"함수","messageEnable":"신호","objectEditable":"오브젝트","pictureeditable":"모양","sceneEditable":"장면","soundeditable":"소리","variableEnable":"변수","e_1":"초등 1학년","e_2":"초등 2학년","e_3":"초등 3학년","e_4":"초등 4학년","e_5":"초등 5학년","e_6":"초등 6학년","m_1":"중등 1학년","m_2":"중등 2학년","m_3":"중등 3학년","general":"일반","curriculum_is_open_true":"공개","curriculum_open_false":"비공개","notice":"공지사항","qna":"묻고답하기","tips":"노하우&팁","free":"자유 게시판","report":"제안 및 건의","art_category_all":"모든 작품","art_category_game":"게임","art_category_animation":"애니메이션","art_category_physical":"피지컬","art_category_etc":"기타","art_category_media":"미디어 아트","art_sort_updated":"최신순","art_sort_visit":"조회순","art_sort_likeCnt":"좋아요순","art_sort_comment":"댓글순","art_period_all":"전체기간","art_period_day":"오늘","art_period_week":"최근 1주일","art_period_month":"최근 1개월","art_period_three_month":"최근 3개월","level_high":"상","level_mid":"중","level_row":"하","discuss_sort_created":"최신순","discuss_sort_visit":"조회순","discuss_sort_likesLength":"좋아요순","discuss_sort_commentsLength":"댓글순","discuss_period_all":"전체기간","discuss_period_day":"오늘","discuss_period_week":"최근 1주일","discuss_period_month":"최근 1개월","discuss_period_three_month":"최근 3개월"};Lang.Helper={"when_run_button_click":"시작하기 버튼을 클릭하면 아래에 연결된 블록들을 실행합니다.","when_some_key_pressed":"지정된 키를 누르면 아래에 연결된 블록들을 실행 합니다","mouse_clicked":"마우스를 클릭 했을 때 아래에 연결된 블록들을 실행 합니다.","mouse_click_cancled":"마우스 클릭을 해제 했을 때 아래에 연결된 블록들을 실행합니다.","when_object_click":"해당 오브젝트를 클릭했을 때 아래에 연결된 블록들을 실행합니다.","when_object_click_canceled":"해당 오브젝트 클릭을 해제 했을때 아래에 연결된 블록들을 실행 합니다.","when_message_cast":"해당 신호를 받으면 연결된 블록들을 실행합니다.","message_cast":"목록에 선택된 신호를 보냅니다.","message_cast_wait":"목록에 선택된 신호를 보내고, 해당 신호를 받는 블록들의 실행이 끝날때 까지 기다립니다.","when_scene_start":"장면이 시작되면 아래에 연결된 블록들을 실행 합니다. ","start_scene":"선택한 장면을 시작 합니다.","start_neighbor_scene":"이전 장면 또는 다음 장면을 시작합니다.","wait_second":"설정한 시간만큼 기다린 후 다음 블록을 실행 합니다.","repeat_basic":"설정한 횟수만큼 감싸고 있는 블록들을 반복 실행합니다.","repeat_inf":"감싸고 있는 블록들을 계속해서 반복 실행합니다.","repeat_while_true":"판단이 참인 동안 감싸고 있는 블록들을 반복 실행합니다.","stop_repeat":"이 블록을 감싸는 가장 가까운 반복 블록의 반복을 중단 합니다.","_if":"만일 판단이 참이면, 감싸고 있는 블록들을 실행합니다.","if_else":"만일 판단이 참이면, 첫 번째 감싸고 있는 블록들을 실행하고, 거짓이면 두 번째 감싸고 있는 블록들을 실행합니다.","restart_project":"모든 오브젝트를 처음부터 다시 실행합니다.","stop_object":"모두 : 모든 오브젝트들이 즉시 실행을 멈춥니다. <br> 자신 : 해당 오브젝트의 모든 블록들을 멈춥니다. <br> 이 코드 : 이 블록이 포함된 코드가 즉시 실행을 멈춥니다.  <br> 자신의 다른 코드 :  해당 오브젝트 중 이 블록이 포함된 코드를 제외한 모든 코드가 즉시 실행을 멈춥니다.","wait_until_true":"판단이 참이 될 때까지 실행을 멈추고 기다립니다.","when_clone_start":"해당 오브젝트의 복제본이 새로 생성되었을 때 아래에 연결된 블록들을 실행합니다.","create_clone":"선택한 오브젝트의 복제본을 생성합니다.","delete_clone":"‘복제본이 처음 생성되었을 때’ 블록과 함께 사용하여 생성된 복제본을 삭제합니다.","remove_all_clones":"해당 오브젝트의 모든 복제본을 삭제합니다.","move_direction":"설정한 값만큼 오브젝트의 이동방향 화살표가 가리키는 방향으로 움직입니다.","move_x":"오브젝트의 X좌표를 설정한 값만큼 바꿉니다. ","move_y":"오브젝트의 Y좌표를 설정한 값만큼 바꿉니다.","move_xy_time":"오브젝트가 입력한 시간에 걸쳐 x와 y좌표를 설정한 값만큼 바꿉니다","locate_object_time":"오브젝트가 입력한 시간에 걸쳐 선택한 오브젝트 또는 마우스 포인터의 위치로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate_x":"오브젝트가 입력한 x좌표로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate_y":"오브젝트가 입력한 y좌표로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate_xy":"오브젝트가 입력한 x와 y좌표로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate_xy_time":"오브젝트가 입력한 시간에 걸쳐 지정한 x, y좌표로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate":"오브젝트가 선택한 오브젝트 또는 마우스 포인터의 위치로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","rotate_absolute":"해당 오브젝트의 방향을 입력한 각도로 정합니다.","rotate_by_time":"오브젝트의 방향을 입력한 시간에 걸쳐 입력한 각도만큼 시계방향으로 회전합니다. (오브젝트의 중심점을 기준으로 회전합니다.)","rotate_relative":"오브젝트의 방향을 입력한 각도만큼 시계방향으로 회전합니다. (오브젝트의 중심점을 기준으로 회전합니다.)","direction_absolute":"해당 오브젝트의 이동 방향을 입력한 각도로 정합니다.","direction_relative":"오브젝트의 이동 방향을 입력한 각도만큼 회전합니다.","move_to_angle":"설정한 각도 방향으로 입력한 값만큼 움직입니다. (실행화면 위쪽이 0도, 시계방향으로 갈수록 각도 증가)","see_angle_object":"해당 오브젝트가 다른 오브젝트 또는 마우스 포인터 쪽을 바라봅니다. 오브젝트의 이동방향이 선택된 항목을 향하도록 오브젝트의 방향을 회전해줍니다.","bounce_wall":"해당 오브젝트가 화면 끝에 닿으면 튕겨져 나옵니다. ","show":"해당 오브젝트를 화면에 나타냅니다.","hide":"해당 오브젝트를 화면에서 보이지 않게 합니다.","dialog_time":"오브젝트가 입력한 내용을 입력한 시간 동안 말풍선으로 말한 후 다음 블록이 실행됩니다.","dialog":"오브젝트가 입력한 내용을 말풍선으로 말하는 동시에 다음 블록이 실행됩니다.","remove_dialog":"오브젝트가 말하고 있는 말풍선을 지웁니다.","change_to_some_shape":"오브젝트를 선택한 모양으로 바꿉니다. (내부 블록을 분리하면 모양의 번호를 사용하여 모양 선택 가능)","change_to_next_shape":"오브젝트의 모양을 다음 모양으로 바꿉니다.","set_effect_volume":"해당 오브젝트에 선택한 효과를 입력한 값만큼 줍니다.","set_effect_amount":"색깔 : 오브젝트에 색깔 효과를 입력한 값만큼 줍니다. (0~100을 주기로 반복됨)<br>밝기 : 오브젝트에 밝기 효과를 입력한 값만큼 줍니다. (-100~100 사이의 범위, -100 이하는 -100으로 100 이상은 100으로 처리 됨) <br> 투명도 : 오브젝트에 투명도 효과를 입력한 값만큼 줍니다. (0~100 사이의 범위, 0이하는 0으로, 100 이상은 100으로 처리됨)","set_effect":"해당 오브젝트에 선택한 효과를 입력한 값으로 정합니다.","set_entity_effect":"해당 오브젝트에 선택한 효과를 입력한 값으로 정합니다.","add_effect_amount":"해당 오브젝트에 선택한 효과를 입력한 값만큼 줍니다.","change_effect_amount":"색깔 : 오브젝트의 색깔 효과를 입력한 값으로 정합니다. (0~100을 주기로 반복됨) <br> 밝기 : 오브젝트의 밝기 효과를 입력한 값으로 정합니다. (-100~100 사이의 범위, -100 이하는 -100으로 100 이상은 100으로 처리 됨) <br> 투명도 : 오브젝트의 투명도 효과를 입력한 값으로 정합니다. (0~100 사이의 범위, 0이하는 0으로, 100 이상은 100으로 처리됨)","change_scale_percent":"해당 오브젝트의 크기를 입력한 값만큼 바꿉니다.","set_scale_percent":"해당 오브젝트의 크기를 입력한 값으로 정합니다.","change_scale_size":"해당 오브젝트의 크기를 입력한 값만큼 바꿉니다.","set_scale_size":"해당 오브젝트의 크기를 입력한 값으로 정합니다.","flip_x":"해당 오브젝트의 상하 모양을 뒤집습니다.","flip_y":"해당 오브젝트의 좌우 모양을 뒤집습니다.","change_object_index":"맨 앞으로 : 해당 오브젝트를 화면의 가장 앞쪽으로 가져옵니다. <br> 앞으로 : 해당 오브젝트를 한 층 앞쪽으로 가져옵니다. <br> 뒤로 : 해당 오브젝트를 한 층 뒤쪽으로 보냅니다. <br> 맨 뒤로 : 해당 오브젝트를 화면의 가장 뒤쪽으로 보냅니다.","set_object_order":"해당 오브젝트가 설정한 순서로 올라옵니다.","brush_stamp":"오브젝트의 모양을 도장처럼 실행화면 위에 찍습니다.","start_drawing":"오브젝트가 이동하는 경로를 따라 선이 그려지기 시작합니다. (오브젝트의 중심점이 기준)","stop_drawing":"오브젝트가 선을 그리는 것을 멈춥니다.","set_color":"오브젝트가 그리는 선의 색을 선택한 색으로 정합니다.","set_random_color":"오브젝트가 그리는 선의 색을 무작위로 정합니다. ","change_thickness":"오브젝트가 그리는 선의 굵기를 입력한 값만큼 바꿉니다. (1~무한의 범위, 1 이하는 1로 처리)","set_thickness":"오브젝트가 그리는 선의 굵기를 입력한 값으로 정합니다. (1~무한의 범위, 1 이하는 1로 처리)","change_opacity":"해당 오브젝트가 그리는 붓의 투명도를 입력한 값만큼 바꿉니다.","change_brush_transparency":"해당 오브젝트가 그리는 붓의 투명도를 입력한 값만큼 바꿉니다. (0~100의 범위, 0이하는 0, 100 이상은 100으로 처리)","set_opacity":"해당 오브젝트가 그리는 붓의 투명도를 입력한 값으로 정합니다.","set_brush_tranparency":"해당 오브젝트가 그리는 붓의 투명도를 입력한 값으로 정합니다. (0~100의 범위, 0이하는 0, 100 이상은 100으로 처리)","brush_erase_all":"해당 오브젝트가 그린 선과 도장을 모두 지웁니다.","sound_something_with_block":"해당 오브젝트가 선택한 소리를 재생하는 동시에 다음 블록을 실행합니다.","sound_something_second_with_block":"해당 오브젝트가 선택한 소리를 입력한 시간 만큼만 재생하는 동시에 다음 블록을 실행합니다.","sound_something_wait_with_block":"해당 오브젝트가 선택한 소리를 재생하고, 소리 재생이 끝나면 다음 블록을 실행합니다.","sound_something_second_wait_with_block":"해당 오브젝트가 선택한 소리를 입력한 시간 만큼만 재생하고, 소리 재생이 끝나면 다음 블록을 실행합니다.","sound_volume_change":"작품에서 재생되는 모든 소리의 크기를 입력한 퍼센트만큼 바꿉니다.","sound_volume_set":"작품에서 재생되는 모든 소리의 크기를 입력한 퍼센트로 정합니다.","sound_silent_all":"현재 재생중인 모든 소리를 멈춥니다.","is_clicked":"마우스를 클릭한 경우 ‘참’으로 판단합니다.","is_press_some_key":"선택한 키가 눌려져 있는 경우 ‘참’으로 판단합니다.","reach_something":"해당 오브젝트가 선택한 항목과 닿은 경우 ‘참’으로 판단합니다.","is_included_in_list":"선택한 리스트에 입력한 값을 가진 항목이 포함되어 있는지 확인합니다.","boolean_basic_operator":"= : 왼쪽에 위치한 값과 오른쪽에 위치한 값이  같으면 '참'으로 판단합니다.<br>> : 왼쪽에 위치한 값이 오른쪽에 위치한 값보다 크면 '참'으로 판단합니다.<br>< : 왼쪽에 위치한 값이 오른쪽에 위치한 값보다 작으면 '참'으로 판단합니다.<br>≥ : 왼쪽에 위치한 값이 오른쪽에 위치한 값보다 크거나 같으면 '참'으로 판단합니다.<br>≤ : 왼쪽에 위치한 값이 오른쪽에 위치한 값보다 작거나 같으면 '참'으로 판단합니다.","function_create":"자주 쓰는 코드를 이 블록 아래에 조립하여 함수로 만듭니다. [함수 정의하기]의 오른쪽 빈칸에 [이름]을 조립하여 함수의 이름을 정할 수 있습니다. 함수를 실행하는 데 입력값이 필요한 경우 빈칸에 [문자/숫자값], [판단값]을 조립하여 매개변수로 사용합니다.","function_field_label":"'함수 정의하기'의 빈칸 안에 조립하고, 이름을 입력하여 함수의 이름을 정해줍니다. ","function_field_string":"해당 함수를 실행하는데 문자/숫자 값이 필요한 경우 빈칸 안에 조립하여 매개변수로 사용합니다. 이 블록 내부의[문자/숫자값]을 분리하여 함수의 코드 중 필요한 부분에 넣어 사용합니다.","function_field_boolean":"해당 함수를 실행하는 데 참 또는 거짓의 판단이 필요한 경우 빈칸 안에 조립하여 매개변수로 사용합니다. 이 블록 내부의 [판단값]을 분리하여 함수의 코드 중 필요한 부분에 넣어 사용합니다.","function_general":"현재 만들고 있는 함수 블록 또는 지금까지 만들어 둔 함수 블록입니다.","boolean_and":"두 판단이 모두 참인 경우 ‘참’으로 판단합니다.","boolean_or":"두 판단 중 하나라도 참이 있는 경우 ‘참’으로 판단합니다.","boolean_not":"해당 판단이 참이면 거짓, 거짓이면 참으로 만듭니다.","calc_basic":"+ : 입력한 두 수를 더한 값입니다.<br>- : 입력한 두 수를 뺀 값입니다.<br>X : 입력한 두 수를 곱한 값입니다.<br>/ : 입력한 두 수를 나눈 값입니다.","calc_rand":"입력한 두 수 사이에서 선택된 무작위 수의 값입니다. (두 수 모두 정수를 입력한 경우 정수로, 두 수 중 하나라도 소수를 입력한 경우 소수로 무작위 수가 선택됩니다.)","get_x_coordinate":"해당 오브젝트의 x 좌푯값을 의미합니다.","get_y_coordinate":"해당 오브젝트의 y 좌푯값을 의미합니다.","coordinate_mouse":"마우스 포인터의 x 또는 y의 좌표 값을 의미합니다.","coordinate_object":"선택한 오브젝트 또는 자신의 각종 정보값(x좌표, y좌표, 방향, 이동방향, 크기, 모양번호, 모양이름)입니다.","quotient_and_mod":"몫 : 앞의 수에서 뒤의 수를 나누어 생긴 몫의 값입니다. <br> 나머지 : 앞의 수에서 뒤의 수를 나누어 생긴 나머지 값입니다.","get_rotation_direction":"해당 오브젝트의 방향값, 이동 방향값을 의미합니다.","calc_share":"앞 수에서 뒤 수를 나누어 생긴 몫을 의미합니다.","calc_mod":"앞 수에서 뒤 수를 나누어 생긴 나머지를 의미합니다.","calc_operation":"입력한 수에 대한 다양한 수학식의 계산값입니다.","get_date":"현재 연도, 월, 일, 시각과 같이 시간에 대한 값입니다.","distance_something":"자신과 선택한 오브젝트 또는 마우스 포인터 간의 거리 값입니다.","get_sound_duration":"선택한 소리의 길이(초) 값입니다.","get_project_timer_value":"이 블록이 실행되는 순간 초시계에 저장된 값입니다.","choose_project_timer_action":"시작하기: 초시계를 시작합니다. <br> 정지하기: 초시계를 정지합니다. <br> 초기화하기: 초시계의 값을 0으로 초기화합니다. <br> (이 블록을 블록조립소로 가져오면 실행화면에 ‘초시계 창’이 생성됩니다.)","reset_project_timer":"실행되고 있던 타이머를 0으로 초기화합니다.","set_visible_project_timer":"초시계 창을 화면에서 숨기거나 보이게 합니다.","ask_and_wait":"해당 오브젝트가 입력한 문자를 말풍선으로 묻고, 대답을 입력받습니다. (이 블록을 블록조립소로 가져오면 실행화면에 ‘대답 창’이 생성됩니다.)","get_canvas_input_value":"묻고 기다리기에 의해 입력된 값입니다.","set_visible_answer":"실행화면에 있는 ‘대답 창’을 보이게 하거나 숨길 수 있습니다.","combine_something":"입력한 두 자료를 결합한 값입니다.","get_variable":"선택된 변수에 저장된 값입니다.","change_variable":"선택한 변수에 입력한 값을 더합니다.","set_variable":"선택한 변수의 값을 입력한 값으로 정합니다.","robotis_carCont_sensor_value":"왼쪽 접속 센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>오른쪽 접촉 센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>선택 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.<br/>최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>왼쪽 적외선 센서 : 물체와 가까울 수록 큰 값 입니다.<br/>오른쪽 적외선 센서 : 물체와 가까울 수록 큰 값 값 입니다.<br/>왼쪽 적외선 센서 캘리브레이션 값 : 적외선 센서의 캘리브레이션 값 입니다.<br/>오른쪽 적외선 센서 캘리브레이션 값 : 적외선 센서의 캘리브레이션 값 입니다.<br/>(*캘리브레이션 값 - 적외선센서 조정 값)","robotis_carCont_cm_led":"4개의 LED 중 1번 또는 4번 LED 를 켜거나 끕니다.<br/>LED 2번과 3번은 동작 지원하지 않습니다.","robotis_carCont_cm_sound_detected_clear":"최종 소리 감지횟 수를 0 으로 초기화 합니다.","robotis_carCont_aux_motor_speed":"감속모터 속도를 0 ~ 1023 의 값(으)로 정합니다.","robotis_carCont_cm_calibration":"적외선센서 조정 값(http://support.robotis.com/ko/: 자동차로봇> 2. B. 적외선 값 조정)을 직접 정합니다.","robotis_openCM70_sensor_value":"최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>사용자 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>사용자 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.","robotis_openCM70_aux_sensor_value":"서보모터 위치 : 0 ~ 1023, 중간 위치의 값은 512 입니다.<br/>적외선센서 :  물체와 가까울 수록 큰 값 입니다.<br/>접촉센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>조도센서(CDS) : 0 ~ 1023, 밝을 수록 큰 값 입니다.<br/>온습도센서(습도) : 0 ~ 100, 습할 수록 큰 값 입니다.<br/>온습도센서(온도) : -20 ~ 100, 온도가 높을 수록 큰 값 입니다.<br/>온도센서 :  -20 ~ 100, 온도가 높을 수록 큰 값 입니다.<br/>초음파센서 : -<br/>자석센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>동작감지센서 : 동작 감지(1), 동작 미감지(0) 값 입니다.<br/>컬러센서 : 알수없음(0), 흰색(1), 검은색(2), 빨간색(3), 녹색(4), 파란색(5), 노란색(6) 값 입니다.<br/>사용자 장치 : 사용자 센서 제작에 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","robotis_openCM70_cm_buzzer_index":"음계를 0.1 ~ 5 초 동안 연주 합니다.","robotis_openCM70_cm_buzzer_melody":"멜로디를 연주 합니다.<br/>멜로디를 연속으로 재생하는 경우, 다음 소리가 재생되지 않으면 '흐름 > X 초 기다리기' 블록을 사용하여 기다린 후 실행합니다.","robotis_openCM70_cm_sound_detected_clear":"최종 소리 감지횟 수를 0 으로 초기화 합니다.","robotis_openCM70_cm_led":"제어기의 빨간색, 녹색, 파란색 LED 를 켜거나 끕니다.","robotis_openCM70_cm_motion":"제어기에 다운로드 되어있는 모션을 실행합니다.","robotis_openCM70_aux_motor_speed":"감속모터 속도를 0 ~ 1023 의 값(으)로 정합니다.","robotis_openCM70_aux_servo_mode":"서보모터를 회전모드 또는 관절모드로 정합니다.<br/>한번 설정된 모드는 계속 적용됩니다.<br/>회전모드는 서보모터 속도를 지정하여 서보모터를 회전 시킵니다.<br/>관절모드는 지정한 서보모터 속도로 서보모터 위치를 이동 시킵니다.","robotis_openCM70_aux_servo_speed":"서보모터 속도를 0 ~ 1023 의 값(으)로 정합니다.","robotis_openCM70_aux_servo_position":"서보모터 위치를 0 ~ 1023 의 값(으)로 정합니다.<br/>서보모터 속도와 같이 사용해야 합니다.","robotis_openCM70_aux_led_module":"LED 모듈의 LED 를 켜거나 끕니다.","robotis_openCM70_aux_custom":"사용자 센서 제작에 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","robotis_openCM70_cm_custom_value":"컨트롤 테이블 주소를 직접 입력하여 값을 확인 합니다.<br/>컨트롤 테이블 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","robotis_openCM70_cm_custom":"컨트롤 테이블 주소를 직접 입력하여 값을 정합니다.<br/>컨트롤 테이블 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","show_variable":"선택한 변수 창을 실행화면에 보이게 합니다.","hide_variable":"선택한 변수 창을 실행화면에서 숨깁니다.","value_of_index_from_list":"선택한 리스트에서 선택한 값의 순서에 있는 항목 값을 의미합니다. (내부 블록을 분리하면 순서를 숫자로 입력 가능)","add_value_to_list":"입력한 값이 선택한 리스트의 마지막 항목으로 추가됩니다.","remove_value_from_list":"선택한 리스트의 입력한 순서에 있는 항목을 삭제합니다.","insert_value_to_list":"선택한 리스트의 입력한 순서의 위치에 입력한 항목을 넣습니다. (입력한 항목의 뒤에 있는 항목들은 순서가 하나씩 밀려납니다.)","change_value_list_index":"선택한 리스트에서 입력한 순서에 있는 항목의 값을 입력한 값으로 바꿉니다.","length_of_list":"선택한 리스트가 보유한 항목 개수 값입니다.","show_list":"선택한 리스트를 실행화면에 보이게 합니다.","hide_list":"선택한 리스트를 실행화면에서 숨깁니다.","text":"해당 글상자가 표시하고 있는 문자값을 의미합니다.","text_write":"글상자의 내용을 입력한 값으로 고쳐씁니다.","text_append":"글상자의 내용 뒤에 입력한 값을 추가합니다.","text_prepend":"글상자의 내용 앞에 입력한 값을 추가합니다.","text_flush":"글상자에 저장된 값을 모두 지웁니다.","erase_all_effects":"해당 오브젝트에 적용된 효과를 모두 지웁니다.","char_at":"입력한 문자/숫자값 중 입력한 숫자 번째의 글자 값입니다.","length_of_string":"입력한 문자값의 공백을 포함한 글자 수입니다.","substring":"입력한 문자/숫자 값에서 입력한 범위 내의 문자/숫자 값입니다.","replace_string":"입력한 문자/숫자 값에서 지정한 문자/숫자 값을 찾아 추가로 입력한 문자/숫자값으로 모두 바꾼 값입니다. (영문 입력시 대소문자를 구분합니다.)","index_of_string":"입력한 문자/숫자 값에서 지정한 문자/숫자 값이 처음으로 등장하는 위치의 값입니다. (안녕, 엔트리!에서 엔트리의 시작 위치는 5)","change_string_case":"입력한 영문의 모든 알파벳을 대문자 또는 소문자로 바꾼 문자값을 의미합니다.","direction_relative_duration":"해당 오브젝트의 이동방향을 입력한 시간에 걸쳐 입력한 각도만큼 시계방향으로 회전합니다. ","get_sound_volume":"현재 작품에 설정된 소리의 크기값을 의미합니다.","sound_from_to":"해당 오브젝트가 선택한 소리를 입력한 시간 부분만을 재생하는 동시에 다음 블록을 실행합니다.","sound_from_to_and_wait":"해당 오브젝트가 선택한 소리를 입력한 시간 부분만을 재생하고, 소리 재생이 끝나면 다음 블록을 실행합니다.","Block_info":"블록 설명","Block_click_msg":"블록을 클릭하면 블록에 대한 설명이 나타납니다.","neobot_sensor_value":"IN1 ~ IN3 포트 및 리모컨에서 입력되는 값 그리고 배터리 정보를 0부터 255의 숫자로 표시합니다.","neobot_sensor_convert_scale":"선택한 포트 입력값의 변화를 특정범위의 값으로 표현범위를 조절할 수 있습니다.","neobot_left_motor":"L모터 포트에 연결한 모터의 회전방향 및 속도를 설정합니다.","neobot_stop_left_motor":"L모터 포트에 연결한 모터를 정지합니다.","neobot_right_motor":"R모터 포트에 연결한 모터의 회전방향 및 속도를 설정합니다.","neobot_stop_right_motor":"R모터 포트에 연결한 모터를 정지합니다.","neobot_all_motor":"L모터 및 R모터 포트에 2개 모터를 연결하여 바퀴로 활용할 때 전, 후, 좌, 우 이동 방향 및 속도, 시간을 설정할 수 있습니다.","neobot_stop_all_motor":"L모터 및 R모터에 연결한 모터를 모두 정지합니다.","neobot_set_servo":"OUT1 ~ OUT3에 서보모터를 연결했을 때 0도 ~ 180도 범위 내에서 각도를 조절할 수 있습니다.","neobot_set_output":"OUT1 ~ OUT3에 라이팅블록 및 전자회로를 연결했을 때 출력 전압을 설정할 수 있습니다.</br>0은 0V, 1 ~ 255는 2.4 ~ 4.96V의 전압을 나타냅니다.","neobot_set_fnd":"FND로 0~99 까지의 숫자를 표시할 수 있습니다.","neobot_play_note_for":"주파수 발진 방법을 이용해 멜로디에 반음 단위의 멜로디 음을 발생시킬 수 있습니다."};Lang.Category={"entrybot_friends":"엔트리봇 친구들","people":"사람","animal":"동물","animal_flying":"하늘","animal_land":"땅","animal_water":"물","animal_others":"기타","plant":"식물","plant_flower":"꽃","plant_grass":"풀","plant_tree":"나무","plant_others":"기타","vehicles":"탈것","vehicles_flying":"하늘","vehicles_land":"땅","vehicles_water":"물","vehicles_others":"기타","architect":"건물","architect_building":"건축물","architect_monument":"기념물","architect_others":"기타","food":"음식","food_vegetables":"과일/채소","food_meat":"고기","food_drink":"음료","food_others":"기타","environment":"환경","environment_nature":"자연","environment_space":"우주","environment_others":"기타","stuff":"물건","stuff_living":"생활","stuff_hobby":"취미","stuff_others":"기타","fantasy":"판타지","interface":"인터페이스","background":"배경","background_outdoor":"실외","background_indoor":"실내","background_nature":"자연","background_others":"기타"};Lang.Device={"arduino":"아두이노","hamster":"햄스터","albert":"알버트","robotis_carCont":"로보티즈 자동차 로봇","robotis_openCM70":"로보티즈 IoT","sensorBoard":"엔트리 센서보드","CODEino":"코드이노","bitbrick":"비트브릭","bitBlock":"비트블록","xbot_epor_edge":"엑스봇","dplay":"디플레이","nemoino":"네모이노","ev3":"EV3"};Lang.General={"turn_on":"켜기","turn_off":"끄기","left":"왼쪽","right":"오른쪽","both":"양쪽","transparent":"투명","black":"검은색","brown":"갈색","red":"빨간색","yellow":"노란색","green":"초록색","skyblue":"하늘색","blue":"파란색","purple":"보라색","white":"하얀색","note_c":"도","note_d":"레","note_e":"미","note_f":"파","note_g":"솔","note_a":"라","note_b":"시"};Lang.Fonts={"batang":"바탕체","myeongjo":"명조체","gothic":"고딕체","pen_script":"필기체","jeju_hallasan":"한라산체","gothic_coding":"코딩고딕체"};Lang.Hw={"note":"노트","leftWheel":"왼쪽 바퀴","rightWheel":"오른쪽 바퀴","leftEye":"왼쪽 눈","rightEye":"오른쪽 눈","led":"불빛","body":"몸통","front":"앞쪽","port_en":"","port_ko":"번 포트","sensor":"센서","light":"빛","temp":"온도","switch_":"스위치","right_ko":"오른쪽","right_en":"","left_ko":"왼쪽","left_en":"","up_ko":"위쪽","up_en":"","down_ko":"아래쪽","down_en":"","output":"출력","left":"왼쪽","right":"오른쪽","sub":"서보","motor":"모터","":"","buzzer":"부저"};Lang.template={"albert_hand_found":"Entry.Albert.isHandFound()","albert_value":"%1","albert_move_forward_for_secs":"Entry.Albert.moveForwardForSecs( %1 ) %2","albert_move_backward_for_secs":"Entry.Albert.moveBackwardForSecs( %1 ) %2","albert_turn_for_secs":"Entry.Albert.turnForSecs(' %1 ', %2 ) %3","albert_change_both_wheels_by":"Entry.Albert.changeWheelsBy( %1 , %2 ) %3","albert_set_both_wheels_to":"Entry.Albert.setWheelsTo( %1 , %2 ) %3","albert_change_wheel_by":"Entry.Albert.changeWheelBy(' %1 ', %2 ) %3","albert_set_wheel_to":"Entry.Albert.setWheelTo(' %1 ', %2 ) %3","albert_stop":"Entry.Albert.stop() %1","albert_set_pad_size_to":"Entry.Albert.setPadSizeTo( %1 , %2 ) %3","albert_set_eye_to":"Entry.Albert.setEyeTo(' %1 ',' %2 ') %3","albert_clear_eye":"Entry.Albert.clearEye(' %1 ') %2","albert_body_led":"%1 body led %2","albert_front_led":"%1 front led %2","albert_beep":"Entry.Albert.beep() %1","albert_change_buzzer_by":"Entry.Albert.changeBuzzerBy( %1 ) %2","albert_set_buzzer_to":"Entry.Albert.setBuzzerTo( %1 ) %2","albert_clear_buzzer":"Entry.Albert.clearBuzzer() %1","albert_play_note_for":"Entry.Albert.playNoteForBeats(' %1 ', %2 , %3 ) %4","albert_rest_for":"Entry.Albert.restForBeats( %1 ) %2","albert_change_tempo_by":"Entry.Albert.changeTempoBy( %1 ) %2","albert_set_tempo_to":"Entry.Albert.setTempoTo( %1 ) %2","albert_move_forward":"move forward %1","albert_move_backward":"move backward %1","albert_turn_around":"turn %1 %2","albert_set_led_to":"Entry.Hamster.setLedTo(' %1 %2 ') %3","albert_clear_led":"Entry.Hamster.clearLed(' %1 %2","albert_change_wheels_by":"%1 %2 %3","albert_set_wheels_to":"%1 %2 %3","arduino_text":"%1","arduino_send":"신호 %1 보내기","arduino_get_number":"신호 %1 의 숫자 결과값","arduino_get_string":"신호 %1 의 글자 결과값","arduino_get_sensor_number":"%1  ","arduino_get_port_number":"%1  ","arduino_get_pwm_port_number":"%1  ","arduino_get_number_sensor_value":"아날로그 %1 번 센서값  ","dplay_get_number_sensor_value":"아날로그 %1 번 센서값  ","nemoino_get_number_sensor_value":"아날로그 %1 번 센서값  ","sensorBoard_get_number_sensor_value":"아날로그 %1 번 센서값  ","CODEino_get_number_sensor_value":"아날로그 %1 번 센서값  ","ardublock_get_number_sensor_value":"아날로그 %1 번 센서값  ","arduino_get_digital_value":"디지털 %1 번 센서값  ","dplay_get_digital_value":"디지털 %1 번 센서값  ","nemoino_get_digital_value":"디지털 %1 번 센서값  ","sensorBoard_get_digital_value":"디지털 %1 번 센서값  ","CODEino_get_digital_value":"디지털 %1 번 센서값  ","ardublock_get_digital_value":"디지털 %1 번 센서값  ","arduino_toggle_led":"Digital %1 Pin %2 %3","dplay_toggle_led":"Digital %1 Pin %2 %3","nemoino_toggle_led":"Digital %1 Pin %2 %3","sensorBoard_toggle_led":"Digital %1 Pin %2 %3","CODEino_toggle_led":"Digital %1 Pin %2 %3","ardublock_toggle_led":"디지털 %1 번 핀 %2 %3","arduino_toggle_pwm":"Digital %1 Pin %2 %3","dplay_toggle_pwm":"Digital %1 Pin %2 %3","nemoino_toggle_pwm":"Digital %1 Pin %2 %3","sensorBoard_toggle_pwm":"Digital %1 Pin %2 %3","CODEino_toggle_pwm":"Digital %1 Pin %2 %3","ardublock_toggle_pwm":"디지털 %1 번 핀을 %2 (으)로 정하기 %3","arduino_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","dplay_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","nemoino_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","sensorBoard_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","CODEino_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","ardublock_convert_scale":"%1 값의 범위를 %2 ~ %3 에서 %4 ~ %5 (으)로 바꾼값  ","joystick_get_number_sensor_value":"아날로그 %1 번 센서값  ","joystick_get_digital_value":"디지털 %1 번 센서값  ","joystick_toggle_led":"Digital %1 Pin %2 %3","joystick_toggle_pwm":"Digital %1 Pin %2 %3","joystick_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","sensorBoard_get_named_sensor_value":"%1  센서값","sensorBoard_is_button_pressed":"%1  버튼을 눌렀는가?","sensorBoard_led":"%1  LED %2   %3","arduino_download_connector":"%1","arduino_download_source":"%1","arduino_connected":"%1","arduino_reconnect":"%1","CODEino_get_sensor_number":"%1  ","CODEino_get_named_sensor_value":"  %1  Sensor value ","CODEino_get_sound_status":"Sound is  %1  ","CODEino_get_light_status":"Light is  %1  ","CODEino_is_button_pressed":" Operation  %1  ","CODEino_get_accelerometer_direction":" 3-AXIS Accelerometer  %1  ","CODEino_get_accelerometer_value":" 3-AXIS Accelerometer  %1 -axis value ","bitbrick_sensor_value":"%1  값","bitbrick_is_touch_pressed":"touch %1 이(가) 눌렸는가?","bitbrick_turn_off_color_led":"컬러 LED 끄기 %1","bitbrick_turn_on_color_led_by_rgb":"컬러 LED 켜기 R %1 G %2 B %3 %4","bitbrick_turn_on_color_led_by_picker":"컬러 LED 색  %1 로 정하기 %2","bitbrick_turn_on_color_led_by_value":"컬러 LED 켜기 색 %1 로 정하기 %2","bitbrick_buzzer":"버저음  %1 내기 %2","bitbrick_turn_off_all_motors":"모든 모터 끄기 %1","bitbrick_dc_speed":"DC 모터 %1  속도 %2 %3","bitbrick_dc_direction_speed":"DC 모터 %1   %2  방향  속력 %3 %4","bitbrick_servomotor_angle":"서보 모터 %1  각도 %2 %3","bitbrick_convert_scale":"변환 %1 값 %2 ~ %3 에서 %4 ~ %5","start_drawing":"this.startDraw() %1","stop_drawing":"this.stopDraw() %1","set_color":"this.brush.color = %1 %2","set_random_color":"this.brush.color = Entry.getRandomColor() %1","change_thickness":"this.brush.thickness += %1 %2","set_thickness":"this.brush.thickness = %1 %2","change_opacity":"this.brush.opacity += %1 %2","set_opacity":"this.brush.opacity = %1 %2","brush_erase_all":"this.brush.removeAll() %1","brush_stamp":"Stamp %1","change_brush_transparency":"this.brush.opacity -= %1 %2","set_brush_tranparency":"this.brush.opacity -= %1 %2","number":"%1","angle":"%1","get_x_coordinate":"%1","get_y_coordinate":"%1","get_angle":"%1","get_rotation_direction":"%1  ","distance_something":"%1 %2 %3","coordinate_mouse":"%1 %2 %3","coordinate_object":"%1 %2 %3 %4","calc_basic":"%1 %2 %3","calc_plus":"%1 %2 %3","calc_minus":"%1 %2 %3","calc_times":"%1 %2 %3","calc_divide":"%1 %2 %3","calc_mod":"%1 %2 %3 %4 %5","calc_share":"%1 %2 %3 %4 %5","calc_operation":"%1 %2 %3 %4  ","calc_rand":"%1 %2 %3 %4 %5","get_date":"%1 %2   %3","get_sound_duration":"%1 %2 %3","reset_project_timer":"%1","set_visible_project_timer":"%1 %2 %3 %4","timer_variable":"%1 %2","get_project_timer_value":"%1 %2","char_at":"%1 %2 %3 %4 %5","length_of_string":"%1 %2 %3","substring":"%1 %2 %3 %4 %5 %6 %7","replace_string":"%1 %2 %3 %4 %5 %6 %7","change_string_case":"%1 %2 %3 %4 %5","index_of_string":"%1 %2 %3 %4 %5","combine_something":"%1 %2 %3 %4 %5","get_sound_volume":"%1 %2","quotient_and_mod":"%1 %2 %3 %4 %5 %6","choose_project_timer_action":"%1 %2 %3 %4","wait_second":"Entry.wait( %1 ) %2","repeat_basic":"for ( i = 0 %1 ) %2","repeat_inf":"while(true) %1","stop_repeat":"break %1","wait_until_true":"while ( %1 != true) { } %2","_if":"if ( %1 ) %2","if_else":"if ( %1 ) %2 %3 else","create_clone":"Entry.createClone( %1 ) %2","delete_clone":"Entry.removeClone(this) %1","when_clone_start":"%1 Entry.addEventListener('clone_created')","stop_run":"프로그램 끝내기 %1","repeat_while_true":"Repeat %1 %2 %3","stop_object":"Entry.stop( %1 ) %2","restart_project":"Entry.restart() %1","remove_all_clones":"Entry.removeAllClone() %1","functionAddButton":"%1","function_field_label":"%1%2","function_field_string":"%1%2","function_field_boolean":"%1%2","function_param_string":"문자/숫자값","function_param_boolean":"판단값","function_create":"함수 정의하기 %1 %2","function_general":"function %1","hamster_hand_found":"Entry.Hamster.isHandFound()","hamster_value":"%1","hamster_move_forward_once":"Entry.Hamster.moveForwardOnceOnBoard() %1","hamster_turn_once":"Entry.Hamster.turnOnceOnBoard(' %1 ') %2","hamster_move_forward_for_secs":"move forward for %1 secs %2","hamster_move_backward_for_secs":"move backward %1 secs %2","hamster_turn_for_secs":"turn %1 for %2 secs %3","hamster_change_both_wheels_by":"change wheel by left: %1 right: %2 %3","hamster_set_both_wheels_to":"set wheel to left: %1 right: %2 ) %3","hamster_change_wheel_by":"Entry.Hamster.changeWheelBy(' %1 ', %2 ) %3","hamster_set_wheel_to":"Entry.Hamster.setWheelTo(' %1 ', %2 ) %3","hamster_follow_line_using":"Entry.Hamster.followLineUsingFloorSensor(' %1 ',' %2 ') %3","hamster_follow_line_until":"Entry.Hamster.followLineUntilIntersection(' %1 ',' %2 ') %3","hamster_set_following_speed_to":"Entry.Hamster.setFollowingSpeedTo( %1 ) %2","hamster_stop":"stop %1","hamster_set_led_to":"Entry.Hamster.setLedTo(' %1 ',' %2 ') %3","hamster_clear_led":"Entry.Hamster.clearLed(' %1 ') %2","hamster_beep":"Entry.Hamster.beep() %1","hamster_change_buzzer_by":"change buzzer by %1 %2","hamster_set_buzzer_to":"set buzzer to %1 %2","hamster_clear_buzzer":"clear buzzer %1","hamster_play_note_for":"Entry.Hamster.playNoteForBeats(' %1 ', %2 , %3 ) %4","hamster_rest_for":"Entry.Hamster.restForBeats( %1 ) %2","hamster_change_tempo_by":"Entry.Hamster.changeTempoBy( %1 ) %2","hamster_set_tempo_to":"Entry.Hamster.setTempoTo( %1 ) %2","hamster_set_port_to":"Entry.Hamster.setPortTo(' %1 ',' %2 ') %3","hamster_change_output_by":"Entry.Hamster.changeOutputBy(' %1 ', %2 ) %3","hamster_set_output_to":"Entry.Hamster.setOutputTo(' %1 ', %2 ) %3","is_clicked":"%1","is_press_some_key":"%1 %2","reach_something":"%1 %2 %3","boolean_comparison":"%1 %2 %3","boolean_equal":"%1 %2 %3","boolean_bigger":"%1 %2 %3","boolean_smaller":"%1 %2 %3","boolean_and_or":"%1 %2 %3","boolean_and":"%1 %2 %3","boolean_or":"%1 %2 %3","boolean_not":"%1 %2 %3","true_or_false":"%1","True":"%1  ","False":"%1  ","boolean_basic_operator":"%1 %2 %3","show":"this.show() %1","hide":"this.hide() %1","dialog_time":"this.setDialogByTime( %1 , %2 , %3 ) %4","dialog":"this.setDialog( %1 , %2 ) %3","remove_dialog":"this.removeDialog() %1","change_to_nth_shape":"this.setShape( %1 ) %2","change_to_next_shape":"this.setTo %1 Shape() %2","set_effect_volume":"this.addEffect( %1 , %2 ) %3","set_effect":"this.setEffect( %1 , %2 ) %3","erase_all_effects":"this.removeAllEffects() %1","change_scale_percent":"this.scale += %1 %2","set_scale_percent":"this.scale = %1 %2","change_scale_size":"this.scale += %1 %2","set_scale_size":"this.scale = %1 %2","flip_y":"this.flip('horizontal') %1","flip_x":"this.flip('vertical') %1","set_object_order":"Entry.setLayerOrder(this, %1 ) %2","get_pictures":"%1  ","change_to_some_shape":"this.setShape( %1 ) %2","add_effect_amount":"this.addEffect( %1 , %2 ) %3","change_effect_amount":"this.setEffect( %1 , %2 ) %3","set_effect_amount":"this.addEffect( %1 , %2 ) %3","set_entity_effect":"this.setEffect( %1 , %2 ) %3","change_object_index":"Entry.setLayerOrder(this, %1 ) %2","move_direction":"Entry.moveToDirection( %1 ) %2","move_x":"this.x += %1 %2","move_y":"this.y += %1 %2","locate_xy_time":"this.setXYbyTime( %1 , %2 , %3 ) %4","rotate_by_angle":"this.rotation += %1 %2","rotate_by_angle_dropdown":"%1 만큼 회전하기 %2","see_angle":"this.direction = %1 %2","see_direction":"%1 쪽 보기 %2","locate_xy":"this.setXY( %1 , %2 ) %3","locate_x":"this.x = %1 %2","locate_y":"this.y = %1 %2","locate":"this.locateAt( %1 ) %2","move_xy_time":"this.moveXYbyTime( %1 , %2 , %3 ) %4","rotate_by_angle_time":"this.rotateByTime( %1 , %2 ) %3","bounce_wall":"Entry.bounceWall(this) %1","flip_arrow_horizontal":"화살표 방향 좌우 뒤집기 %1","flip_arrow_vertical":"화살표 방향 상하 뒤집기 %1","see_angle_object":"this.setDirectionTo( %1 ) %2","see_angle_direction":"this.rotation = %1 %2","rotate_direction":"this.direction += %1 %2","locate_object_time":"%1 초 동안 %2 위치로 이동하기 %3","rotate_absolute":"this.rotation = %1 %2","rotate_relative":"this.rotation = %1 %2","direction_absolute":"this.direction = %1 %2","direction_relative":"this.direction += %1 %2","move_to_angle":"Entry.moveToDirection( %1 , %2 ) %3","rotate_by_time":"%1 , this.rotate( %2 ) %3","direction_relative_duration":"%1 %2 %3","neobot_sensor_value":"%1  값","neobot_turn_left":"왼쪽모터를 %1 %2 회전 %3","neobot_stop_left":"왼쪽모터 정지 %1","neobot_turn_right":"오른쪽모터를 %1 %2 회전 %3","neobot_stop_right":"오른쪽모터 정지 %1","neobot_run_motor":"%1 모터를  %2 초간 %3 %4 %5","neobot_servo_1":"SERVO1에 연결된 서보모터를 %1 속도로 %2 로 이동 %3","neobot_servo_2":"SERVO2에 연결된 서보모터를 %1 속도로 %2 로 이동 %3","neobot_play_note_for":"멜로디 %1 을(를) %2 옥타브로 %3 길이만큼 소리내기 %4","neobot_set_sensor_value":"%1 번 포트의 값을 %2 %3","robotis_openCM70_cm_custom_value":"직접입력 주소 ( %1 ) %2 값","robotis_openCM70_sensor_value":"제어기 %1 값","robotis_openCM70_aux_sensor_value":"%1   %2 값","robotis_openCM70_cm_buzzer_index":"제어기 음계값 %1 , %2 , 연주 %3","robotis_openCM70_cm_buzzer_melody":"제어기 멜로디 %1 번 연주 %2","robotis_openCM70_cm_sound_detected_clear":"최종소리감지횟수 초기화 %1","robotis_openCM70_cm_led":"제어기 %1 LED %2 %3","robotis_openCM70_cm_motion":"모션 %1 번 실행 %2","robotis_openCM70_aux_motor_speed":"%1 감속모터 속도를 %2 , 출력값을 %3 (으)로 정하기 %4","robotis_openCM70_aux_servo_mode":"%1 서보모터 모드를 %2 (으)로 정하기 %3","robotis_openCM70_aux_servo_speed":"%1 서보모터 속도를 %2 , 출력값을 %3 (으)로 정하기 %4","robotis_openCM70_aux_servo_position":"%1 서보모터 위치를 %2 (으)로 정하기 %3","robotis_openCM70_aux_led_module":"%1 LED 모듈을 %2 (으)로 정하기 %3","robotis_openCM70_aux_custom":"%1 사용자 장치를 %2 (으)로 정하기 %3","robotis_openCM70_cm_custom":"직접입력 주소 ( %1 ) (을)를 %2 (으)로 정하기 %3","robotis_carCont_sensor_value":"%1   값","robotis_carCont_cm_led":"4번 LED %1 ,  1번 LED %2 %3","robotis_carCont_cm_sound_detected_clear":"최종소리감지횟수 초기화 %1","robotis_carCont_aux_motor_speed":"%1 감속모터 속도를 %2 , 출력값을 %3 (으)로 정하기 %4","robotis_carCont_cm_calibration":"%1 적외선 센서 캘리브레이션 값을 %2 (으)로 정하기 %3","when_scene_start":"%1 this.addEventListener('sceneStart')","start_scene":"Scene.changeScene( %1 ) %2","start_neighbor_scene":"Scene.changeScene( %1 ) %2","sound_something":"Entry.playSound( %1 ) %2","sound_something_second":"Entry.playSoundByTime( %1 , %2 ) %3","sound_something_wait":"Entry.playSoundAndWait( %1 ) %2","sound_something_second_wait":"Entry.playSoundAndWaitByTime( %1 , %2 ) %3","sound_volume_change":"Entry.volume += %1 %2","sound_volume_set":"Entry.volume = %1 %2","sound_silent_all":"Entry.silentAll() %1","get_sounds":"%1  ","sound_something_with_block":"Entry.playSound( %1 ) %2","sound_something_second_with_block":"Entry.playSoundByTime( %1   , %2 ) %3","sound_something_wait_with_block":"Entry.playSoundAndWait( %1 ) %2","sound_something_second_wait_with_block":"Entry.playSoundAndWaitByTime( %1 ,   %2 ) %3","sound_from_to":"%1 %2 %3 %4","sound_from_to_and_wait":"%1 %2 %3 %4","when_run_button_click":"%1 Entry.addEventListener('run')","press_some_key":"%1 Entry.addEventListener('keydown', key== %2 ) %3","when_some_key_pressed":"%1 Entry.addEventListener('keydown', key== %2 )","mouse_clicked":"%1 Entry.addEventListener('mousedown')","mouse_click_cancled":"%1 Entry.addEventListener('mouseup')","when_object_click":"%1 this.addEventListener('mousedown')","when_object_click_canceled":"%1 this.addEventListener('mouseup')","when_some_key_click":"%1 키를 눌렀을 때","when_message_cast":"%1 Entry.addEventListener( %2 )","message_cast":"Entry.dispatchEvent( %1 ) %2","message_cast_wait":"Entry.dispatchEventAndWait( %1 ) %2","text":"%1","text_write":"Entry.writeText( %1 )","text_append":"Entry.appendText( %1 )","text_prepend":"Entry.insertText( %1 )","text_flush":"Entry.clearText()","variableAddButton":"%1","listAddButton":"%1","change_variable":"Entry.addValueToVariable( %1 , %2 ) %3","set_variable":"Entry.setValueVariable( %1 , %2 ) %3","show_variable":"Entry.showVariable( %1 ) %2","hide_variable":"Entry.hideVariable( %1 ) %2","get_variable":"Entry.getVariableValue( %1 )","ask_and_wait":"Entry.askAndWait( %1 ) %2","get_canvas_input_value":"%1  ","add_value_to_list":"Entry.pushValueToList( %1 , %2 ) %3","remove_value_from_list":"Entry.removeValueListAt( %1 , %2 ) %3","insert_value_to_list":"Entry.pushValueToListAt( %1 , %2 , %3 ) %4","change_value_list_index":"Entry.changeValueListAt( %1 , %2 , %3 ) %4","value_of_index_from_list":"%1 %2 %3 %4 %5","length_of_list":"%1 %2 %3","show_list":"Entry.showList( %1 ) %2","hide_list":"Entry.hideList( %1 ) %2","options_for_list":"%1  ","set_visible_answer":"Entry.getAnswer() %1 %2","is_included_in_list":"%1 %2 %3 %4 %5","xbot_digitalInput":"%1","xbot_analogValue":"%1","xbot_digitalOutput":"디지털 %1 핀, 출력 값 %2 %3","xbot_analogOutput":"아날로그 %1 %2 %3","xbot_servo":"서보 모터 %1 , 각도 %2 %3","xbot_oneWheel":"바퀴(DC) 모터 %1 , 속도 %2 %3","xbot_twoWheel":"바퀴(DC) 모터 오른쪽(2) 속도: %1 왼쪽(1) 속도: %2 %3","xbot_rgb":"RGB LED 켜기 R 값 %1 G 값 %2 B 값 %3 %4","xbot_rgb_picker":"RGB LED 색 %1 로 정하기 %2","xbot_buzzer":"Entry.Hamster.playNoteForBeats(' %1   %2 , %3 초 연주하기 %4","xbot_lcd":"LCD %1 번째 줄 ,  출력 값 %2 %3","run":"","mutant":"test mutant block","jr_start":"%1","jr_repeat":"%1 %2 %3","jr_item":"꽃 모으기 %1","cparty_jr_item":"%1 %2","jr_north":"%1 %2","jr_east":"%1 %2","jr_south":"%1 %2","jr_west":"%1 %2","jr_start_basic":"%1 %2","jr_go_straight":"%1 %2","jr_turn_left":"%1 %2","jr_turn_right":"%1 %2","jr_go_slow":"%1 %2","jr_repeat_until_dest":"%1 %2 %3","jr_if_construction":"%1 %2 %3 %4","jr_if_speed":"만약 %1 앞에 있다면 %2","maze_step_start":"%1 시작하기를 클릭했을 때","maze_step_jump":"뛰어넘기%1","maze_step_for":"%1 번 반복하기%2","test":"%1 this is test block %2","maze_repeat_until_1":"%1 만날 때 까지 반복%2","maze_repeat_until_2":"모든 %1 만날 때 까지 반복%2","maze_step_if_1":"만약 앞에 %1 있다면%2","maze_step_if_2":"만약 앞에 %1 있다면%2","maze_call_function":"약속 불러오기%1","maze_define_function":"약속하기%1","maze_step_if_3":"만약 앞에 %1 있다면%2","maze_step_if_4":"만약 앞에 %1 있다면%2","maze_step_move_step":"앞으로 한 칸 이동%1","maze_step_rotate_left":"왼쪽으로 회전%1","maze_step_rotate_right":"오른쪽으로 회전%1","test_wrapper":"%1 this is test block %2","basic_button":"%1"};if(( false?"undefined":_typeof(exports))=="object")exports.Lang=Lang;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var Lang={};Lang.category={"name":"en"};Lang.type="en";Lang.en="English";Lang.Blocks={"ARDUINO":"Hardware","ARDUINO_download_connector":"Download Arduino Connector","ARDUINO_open_connector":"Open Arduino Connector","ARDUINO_download_source":"Entry Arduino code","ARDUINO_reconnect":"Connect Hardware","ARDUINO_connected":"Hardware connected","ARDUINO_arduino_get_number_1":"number result of signal","ARDUINO_arduino_get_number_2":"","ARDUINO_arduino_get_sensor_number_0":"0","ARDUINO_arduino_get_sensor_number_1":"1","ARDUINO_arduino_get_sensor_number_2":"2","ARDUINO_arduino_get_sensor_number_3":"3","ARDUINO_arduino_get_sensor_number_4":"4","ARDUINO_arduino_get_sensor_number_5":"5","BITBRICK_light":"light","BITBRICK_IR":"IR","BITBRICK_touch":"touch","BITBRICK_potentiometer":"potentiometer","BITBRICK_MIC":"MIC","BITBRICK_UserSensor":"UserSensor","BITBRICK_UserInput":"UserInput","BITBRICK_dc_direction_ccw":"CCW","BITBRICK_dc_direction_cw":"CW","CODEino_get_sensor_number_0":"0","CODEino_get_sensor_number_1":"1","CODEino_get_sensor_number_2":"2","CODEino_get_sensor_number_3":"3","CODEino_get_sensor_number_4":"4","CODEino_get_sensor_number_5":"5","CODEino_get_sensor_number_6":"6","CODEino_sensor_name_0":"Sound","CODEino_sensor_name_1":"Light","CODEino_sensor_name_2":"Slider","CODEino_sensor_name_3":"resistance-A","CODEino_sensor_name_4":"resistance-B","CODEino_sensor_name_5":"resistance-C","CODEino_sensor_name_6":"resistance-D","CODEino_string_1":" Sensor value ","CODEino_string_2":" Operation ","CODEino_string_3":"Push button","CODEino_string_4":"Connected A","CODEino_string_5":"Connected B","CODEino_string_6":"Connected C","CODEino_string_7":"Connected D","CODEino_string_8":" 3-AXIS Accelerometer ","CODEino_string_9":"-axis value ","CODEino_string_10":"Sound is ","CODEino_string_11":"Great","CODEino_string_12":"Small","CODEino_string_13":"Light is ","CODEino_string_14":"Bright","CODEino_string_15":"Dark","CODEino_string_16":"Left tilt","CODEino_string_17":"Right tilt","CODEino_string_18":"Front tilt","CODEino_string_19":"Rear tilt","CODEino_string_20":"Reverse","CODEino_accelerometer_X":"X","CODEino_accelerometer_Y":"Y","CODEino_accelerometer_Z":"Z","dplay_switch":"스위치 ","dplay_light":"빛센서가 ","dplay_tilt":"기울기센서 상태가","dplay_string_1":"켜짐","dplay_string_2":"꺼짐","dplay_string_3":"밝음","dplay_string_4":"어두움","dplay_string_5":"눌림","dplay_string_6":"열림","dplay_num_pin_1":"LED 상태를","dplay_num_pin_2":"번 스위치가","dplay_num_pin_3":"아날로그","dplay_num_pin_4":"번 ","dplay_num_pin_5":"센서값","dplay_analog_number_0":"A0","dplay_analog_number_1":"A1","dplay_analog_number_2":"A2","dplay_analog_number_3":"A3","dplay_analog_number_4":"A4","dplay_analog_number_5":"A5","ARDUINO_arduino_get_string_1":"string result of signal","ARDUINO_arduino_get_string_2":"","ARDUINO_arduino_send_1":"Send signal","ARDUINO_arduino_send_2":"","ARDUINO_num_sensor_value_1":"Analog","ARDUINO_num_sensor_value_2":"Sensor value","ARDUINO_get_digital_value_1":"Digital","ARDUINO_num_pin_1":"Digital","ARDUINO_num_pin_2":"Pin","ARDUINO_toggle_pwm_1":"Digital","ARDUINO_toggle_pwm_2":"Pin","ARDUINO_toggle_pwm_3":"","ARDUINO_on":"On","ARDUINO_convert_scale_1":"Map Value","ARDUINO_convert_scale_2":"","ARDUINO_convert_scale_3":"~","ARDUINO_convert_scale_4":"to","ARDUINO_convert_scale_5":"~","ARDUINO_convert_scale_6":"","ARDUINO_off":"Off","brightness":"Brightness","BRUSH":"Brush","BRUSH_brush_erase_all":"Erase all brush","BRUSH_change_opacity_1":"Change opacity by","BRUSH_change_opacity_2":"%","BRUSH_change_thickness_1":"Change thickness by","BRUSH_change_thickness_2":"","BRUSH_set_color_1":"Set brush color to","BRUSH_set_color_2":"","BRUSH_set_opacity_1":"Set opacity to","BRUSH_set_opacity_2":"%","BRUSH_set_random_color":"Set brush color to random","BRUSH_set_thickness_1":"Set thickness to","BRUSH_set_thickness_2":"","BRUSH_stamp":"Stamp","BRUSH_start_drawing":"Start drawing","BRUSH_stop_drawing":"Stop drawing","CALC":"Calculate","CALC_calc_mod_1":"Rest of","CALC_calc_mod_2":"","CALC_calc_mod_3":"","CALC_calc_operation_of_1":"","CALC_calc_operation_of_2":"'s","CALC_calc_operation_root":"Root","CALC_calc_operation_square":"Square","CALC_calc_rand_1":"Random number between","CALC_calc_rand_2":"and","CALC_calc_rand_3":"","CALC_calc_share_1":"Quotient of","CALC_calc_share_2":"","CALC_calc_share_3":"","CALC_coordinate_mouse_1":"Mouse","CALC_coordinate_mouse_2":"Coordinate","CALC_coordinate_object_1":"","CALC_coordinate_object_2":"'s","CALC_coordinate_object_3":"Coordinate","CALC_distance_something_1":"Distance to","CALC_distance_something_2":"","CALC_get_angle":"Angle value","CALC_get_date_1":"Date","CALC_get_date_2":"","CALC_get_date_day":"Day","CALC_get_date_hour":"Time(Hour)","CALC_get_date_minute":"Time(Minutes)","CALC_get_date_month":"Month","CALC_get_date_second":"Time(Seconds)","CALC_get_date_year":"Year","CALC_get_sound_duration_1":"Length of","CALC_get_sound_duration_2":"sound","CALC_get_timer_value":"Timer value","CALC_get_x_coordinate":"X Coordinate","CALC_get_y_coordinate":"Y Coordinate","CALC_timer_reset":"Start timer","CALC_timer_visible_1":"","CALC_timer_visible_2":"Timer","CALC_timer_visible_show":"Show","CALC_timer_visible_hide":"Hide","color":"Color","FLOW":"Flow","FLOW__if_1":"If","FLOW__if_2":"then","FLOW_create_clone_1":"Create","FLOW_create_clone_2":"'s clone","FLOW_delete_clone":"Remove this clone","FLOW_delete_clone_all":"Remove all clone","FLOW_if_else_1":"If","FLOW_if_else_2":"then","FLOW_if_else_3":"else","FLOW_repeat_basic_1":"Repeat  ","FLOW_repeat_basic_2":"times","FLOW_repeat_basic_errorMsg":"Repeat count must greater than 0 or equal.","FLOW_repeat_inf":"Repeat infinitely","FLOW_restart":"Restart Project","FLOW_stop_object_1":"Stop","FLOW_stop_object_2":"","FLOW_stop_object_all":"All objects","FLOW_stop_object_this_object":"This","FLOW_stop_object_this_thread":"This code","FLOW_stop_object_other_thread":"Other block of this object","FLOW_stop_repeat":"Stop repeat","FLOW_stop_run":"Exit program","FLOW_wait_second_1":"Wait","FLOW_wait_second_2":"seconds","FLOW_wait_until_true_1":"Wait until","FLOW_wait_until_true_2":"","FLOW_when_clone_start":"When clone is created","FUNC":"Function","JUDGEMENT":"Decision","JUDGEMENT_boolean_and":"AND","JUDGEMENT_boolean_not_1":"Is Not","JUDGEMENT_boolean_not_2":"","JUDGEMENT_boolean_or":"OR","JUDGEMENT_false":"False","JUDGEMENT_is_clicked":"Mouse down?","JUDGEMENT_is_press_some_key_1":"Key","JUDGEMENT_is_press_some_key_2":" pressed?","JUDGEMENT_reach_something_1":"touching","JUDGEMENT_reach_something_2":"?","JUDGEMENT_true":"True","LOOKS":"Looks","LOOKS_change_scale_percent_1":"Change scale by","LOOKS_change_scale_percent_2":"","LOOKS_change_to_next_shape":"Change to next","LOOKS_change_to_nth_shape_1":"Change shape to","LOOKS_change_to_nth_shape_2":"","LOOKS_change_shape_prev":"prev","LOOKS_change_shape_next":"next","LOOKS_change_to_near_shape_1":"Change to","LOOKS_change_to_near_shape_2":"shape","LOOKS_dialog_1":"Say","LOOKS_dialog_2":"","LOOKS_dialog_3":"","LOOKS_dialog_time_1":"Say","LOOKS_dialog_time_2":"for","LOOKS_dialog_time_3":"secs","LOOKS_dialog_time_4":"","LOOKS_erase_all_effects":"Erase all effects","LOOKS_flip_x":"Flip vertically","LOOKS_flip_y":"Flip horizontally","LOOKS_hide":"hide","LOOKS_remove_dialog":"Remove speech","LOOKS_set_effect_1":"Set","LOOKS_set_effect_2":"effect to","LOOKS_set_effect_3":"","LOOKS_set_effect_volume_1":"Change","LOOKS_set_effect_volume_2":"effect by","LOOKS_set_effect_volume_3":"","LOOKS_set_object_order_1":"go to","LOOKS_set_object_order_2":"th layer","LOOKS_set_scale_percent_1":"Set scale to","LOOKS_set_scale_percent_2":"","LOOKS_show":"show","mouse_pointer":"Mouse Pointer","MOVING":"Moving","MOVING_bounce_wall":"if on edge, bounce","MOVING_bounce_when_1":"Bounce if reach to the","MOVING_bounce_when_2":"","MOVING_flip_arrow_horizontal":"Flip horizontally by arrow direction","MOVING_flip_arrow_vertical":"Flip vertically by arrow direction","MOVING_locate_1":"Move to","MOVING_locate_2":"","MOVING_locate_time_1":"Moving while","MOVING_locate_time_2":"seconds to the","MOVING_locate_time_3":"","MOVING_locate_x_1":"Move to the X:","MOVING_locate_x_2":"","MOVING_locate_xy_1":"Move to the X:","MOVING_locate_xy_2":"Y:","MOVING_locate_xy_3":"","MOVING_locate_xy_time_1":"Moving while","MOVING_locate_xy_time_2":"seconds to x:","MOVING_locate_xy_time_3":"y:","MOVING_locate_xy_time_4":"","MOVING_locate_y_1":"Move to the Y:","MOVING_locate_y_2":"","MOVING_move_direction_1":"Move","MOVING_move_direction_2":"forward","MOVING_move_direction_angle_1":"Rotate","MOVING_move_direction_angle_2":"and move","MOVING_move_direction_angle_3":"","MOVING_move_x_1":"Change X by","MOVING_move_x_2":"","MOVING_move_xy_time_1":"For","MOVING_move_xy_time_2":"secs move to X:","MOVING_move_xy_time_3":"Y:","MOVING_move_xy_time_4":"","MOVING_move_y_1":"Change Y by","MOVING_move_y_2":"","MOVING_rotate_by_angle_1":"Rotate by","MOVING_rotate_by_angle_2":"degree","MOVING_rotate_by_angle_dropdown_1":"Rotate by","MOVING_rotate_by_angle_dropdown_2":"degree","MOVING_rotate_by_angle_time_1":"Rotate while","MOVING_rotate_by_angle_time_2":"seconds by","MOVING_rotate_by_angle_time_3":"degree","MOVING_rotate_direction_1":"Change direction by ","MOVING_rotate_direction_2":"","MOVING_see_angle_1":"Set direction to","MOVING_see_angle_2":"","MOVING_see_angle_direction_1":"See angle to","MOVING_see_angle_direction_2":"degree","MOVING_see_angle_object_1":"Turn towards","MOVING_see_angle_object_2":"","MOVING_see_direction_1":"Rotate to the","MOVING_see_direction_2":"","MOVING_set_direction_by_angle_1":"Set rotation to","MOVING_set_direction_by_angle_2":"","MOVING_add_direction_by_angle_1":"Rotate","MOVING_add_direction_by_angle_2":"","MOVING_add_direction_by_angle_time_1":"","MOVING_add_direction_by_angle_time_2":"secs rotate","MOVING_add_direction_by_angle_time_3":"","no_target":"No Target","oneself":"Self","opacity":"Opacity","SCENE":"Scene","SOUND":"Sound","SOUND_sound_silent_all":"Stop all sounds","SOUND_sound_something_1":"Play","SOUND_sound_something_2":"Sound","SOUND_sound_something_second_1":"Play","SOUND_sound_something_second_2":"sound for","SOUND_sound_something_second_3":"secs","SOUND_sound_something_second_wait_1":"Play","SOUND_sound_something_second_wait_2":"Sound for","SOUND_sound_something_second_wait_3":"secs and wait","SOUND_sound_something_wait_1":"Play","SOUND_sound_something_wait_2":"Sound and wait","SOUND_sound_volume_change_1":"Change volume by","SOUND_sound_volume_change_2":"%","SOUND_sound_volume_set_1":"Set volume to","SOUND_sound_volume_set_2":"%","speak":"Speak","START":"Start","START_add_message":"Add a message","START_delete_message":"Remove a message","START_message_cast":"Send message","START_message_cast_1":"Send","START_message_cast_2":"message","START_message_cast_wait":"message and wait","START_message_send_wait_1":"Send","START_message_send_wait_2":" message and wait","START_mouse_click_cancled":"When mouse click released","START_mouse_clicked":"When mouse clicked","START_press_some_key_1":"When key","START_press_some_key_2":"pressed","START_press_some_key_down":"Down","START_press_some_key_enter":"Enter","START_press_some_key_left":"Left","START_press_some_key_right":"Right","START_press_some_key_space":"Space","START_press_some_key_up":"Up","START_when_message_cast":"When message received","START_when_message_cast_1":"When","START_when_message_cast_2":"message received","START_when_object_click":"When object clicked","START_when_object_click_canceled":"When object click released","START_when_run_button_click":"When run","START_when_scene_start":"When scene was started","START_when_some_key_click":"When press some key","TEXT":"Text","TEXT_text":"Entry","TEXT_text_append_1":"After writing that","TEXT_text_append_2":"","TEXT_text_flush":"Remove all text","TEXT_text_prepend_1":"Add","TEXT_text_prepend_2":"in front of that","TEXT_text_write_1":"Writing that","TEXT_text_write_2":"","VARIABLE":"Variable","VARIABLE_add_value_to_list":"","VARIABLE_add_value_to_list_1":"add","VARIABLE_add_value_to_list_2":"to the list","VARIABLE_add_value_to_list_3":"","VARIABLE_ask_and_wait_1":"Ask","VARIABLE_ask_and_wait_2":"and wait","VARIABLE_change_value_list_index":"","VARIABLE_change_value_list_index_1":"change","VARIABLE_change_value_list_index_3":"th element to","VARIABLE_change_value_list_index_2":"","VARIABLE_change_value_list_index_4":"","VARIABLE_change_variable":"Adding variable","VARIABLE_change_variable_1":"Plus to","VARIABLE_change_variable_2":"by","VARIABLE_change_variable_3":"","VARIABLE_change_variable_name":"Rename variable","VARIABLE_combine_something_1":"join","VARIABLE_combine_something_2":"","VARIABLE_combine_something_3":"","VARIABLE_get_canvas_input_value":"response","VARIABLE_get_variable":"Value of variable","VARIABLE_get_variable_1":"Value of","VARIABLE_get_variable_2":"","VARIABLE_get_y":"Y Coordinate","VARIABLE_hide_list":"","VARIABLE_hide_list_1":"Hide list","VARIABLE_hide_list_2":"","VARIABLE_hide_variable":"Hide variable","VARIABLE_hide_variable_1":"Hide variable","VARIABLE_hide_variable_2":"value","VARIABLE_insert_value_to_list":"","VARIABLE_insert_value_to_list_1":"insert","VARIABLE_insert_value_to_list_2":"to","VARIABLE_insert_value_to_list_3":"","VARIABLE_insert_value_to_list_4":"th position","VARIABLE_length_of_list":"","VARIABLE_length_of_list_1":"length of","VARIABLE_length_of_list_2":"","VARIABLE_list":"","VARIABLE_make_variable":"Make variable","VARIABLE_list_option_first":"First","VARIABLE_list_option_last":"Last","VARIABLE_list_option_random":"Randomly","VARIABLE_remove_value_from_list":"","VARIABLE_remove_value_from_list_1":"remove","VARIABLE_remove_value_from_list_2":"th element from","VARIABLE_remove_value_from_list_3":"","VARIABLE_remove_variable":"Remove variable","VARIABLE_set_variable":"Set variable","VARIABLE_set_variable_1":"Set","VARIABLE_set_variable_2":"to","VARIABLE_set_variable_3":"","VARIABLE_show_list":"","VARIABLE_show_list_1":"Show list","VARIABLE_show_list_2":"","VARIABLE_show_variable":"Show variable","VARIABLE_show_variable_1":"Show variable","VARIABLE_show_variable_2":"value","VARIABLE_value_of_index_from_list":"","VARIABLE_value_of_index_from_list_1":"value of","VARIABLE_value_of_index_from_list_2":"","VARIABLE_value_of_index_from_list_3":"th element","HAMSTER_hand_found":"hand found?","HAMSTER_sensor_leftProximity":"left proximity","HAMSTER_sensor_rightProximity":"right proximity","HAMSTER_sensor_leftFloor":"left floor","HAMSTER_sensor_rightFloor":"right floor","HAMSTER_sensor_accelerationX":"x acceleration","HAMSTER_sensor_accelerationY":"y acceleration","HAMSTER_sensor_accelerationZ":"z acceleration","HAMSTER_sensor_light":"light","HAMSTER_sensor_temperature":"temperature","HAMSTER_sensor_signalStrength":"signal strength","HAMSTER_sensor_inputA":"input A","HAMSTER_sensor_inputB":"input B","HAMSTER_move_forward_once":"move forward once on board","HAMSTER_turn_once_1":"turn","HAMSTER_turn_once_2":"once on board","HAMSTER_move_forward":"move forward","HAMSTER_move_backward":"move backward","HAMSTER_turn_around_1":"turn","HAMSTER_turn_around_2":"","HAMSTER_move_forward_for_secs_1":"move forward for","HAMSTER_move_forward_for_secs_2":"secs","HAMSTER_move_backward_for_secs_1":"move backward","HAMSTER_move_backward_for_secs_2":"secs","HAMSTER_turn_for_secs_1":"turn","HAMSTER_turn_for_secs_2":"for","HAMSTER_turn_for_secs_3":"secs","HAMSTER_change_both_wheels_by_1":"change wheel by left:","HAMSTER_change_both_wheels_by_2":"right:","HAMSTER_change_both_wheels_by_3":"","HAMSTER_set_both_wheels_to_1":"set wheel to left:","HAMSTER_set_both_wheels_to_2":"right:","HAMSTER_set_both_wheels_to_3":"","HAMSTER_change_wheel_by_1":"change","HAMSTER_change_wheel_by_2":"wheel by","HAMSTER_change_wheel_by_3":"","HAMSTER_set_wheel_to_1":"set","HAMSTER_set_wheel_to_2":"wheel to","HAMSTER_set_wheel_to_3":"","HAMSTER_follow_line_using_1":"follow","HAMSTER_follow_line_using_2":"line using","HAMSTER_follow_line_using_3":"floor sensor","HAMSTER_follow_line_until_1":"follow","HAMSTER_follow_line_until_2":"line until","HAMSTER_follow_line_until_3":"intersection","HAMSTER_set_following_speed_to_1":"set following speed to","HAMSTER_set_following_speed_to_2":"","HAMSTER_front":"front","HAMSTER_rear":"rear","HAMSTER_stop":"stop","HAMSTER_set_led_to_1":"set","HAMSTER_set_led_to_2":"led to","HAMSTER_set_led_to_3":"","HAMSTER_clear_led_1":"clear","HAMSTER_clear_led_2":"led","HAMSTER_color_cyan":"cyan","HAMSTER_color_magenta":"magenta","HAMSTER_color_black":"black","HAMSTER_beep":"beep","HAMSTER_change_buzzer_by_1":"change buzzer by","HAMSTER_change_buzzer_by_2":"","HAMSTER_set_buzzer_to_1":"set buzzer to","HAMSTER_set_buzzer_to_2":"","HAMSTER_clear_buzzer":"clear buzzer","HAMSTER_play_note_for_1":"play note","HAMSTER_play_note_for_2":"","HAMSTER_play_note_for_3":"for","HAMSTER_play_note_for_4":"beats","HAMSTER_rest_for_1":"rest for","HAMSTER_rest_for_2":"beats","HAMSTER_change_tempo_by_1":"change tempo by","HAMSTER_change_tempo_by_2":"","HAMSTER_set_tempo_to_1":"set tempo to","HAMSTER_set_tempo_to_2":"bpm","HAMSTER_set_port_to_1":"set port","HAMSTER_set_port_to_2":"to","HAMSTER_set_port_to_3":"","HAMSTER_change_output_by_1":"change output","HAMSTER_change_output_by_2":"by","HAMSTER_change_output_by_3":"","HAMSTER_set_output_to_1":"set output","HAMSTER_set_output_to_2":"to","HAMSTER_set_output_to_3":"","HAMSTER_port_a":"A","HAMSTER_port_b":"B","HAMSTER_port_ab":"A and B","HAMSTER_analog_input":"analog input","HAMSTER_digital_input":"digital input","HAMSTER_servo_output":"servo output","HAMSTER_pwm_output":"pwm output","HAMSTER_digital_output":"digital output","ALBERT_hand_found":"hand found?","ALBERT_sensor_leftProximity":"left proximity","ALBERT_sensor_rightProximity":"right proximity","ALBERT_sensor_light":"light","ALBERT_sensor_battery":"battery","ALBERT_sensor_signalStrength":"signal strength","ALBERT_sensor_frontOid":"front oid","ALBERT_sensor_backOid":"back oid","ALBERT_sensor_positionX":"x position","ALBERT_sensor_positionY":"y position","ALBERT_sensor_orientation":"orientation","ALBERT_move_forward":"move forward","ALBERT_move_backward":"move backward","ALBERT_turn_around_1":"turn","ALBERT_turn_around_2":"","ALBERT_move_forward_for_secs_1":"move forward for","ALBERT_move_forward_for_secs_2":"secs","ALBERT_move_backward_for_secs_1":"move backward for","ALBERT_move_backward_for_secs_2":"secs","ALBERT_turn_for_secs_1":"turn","ALBERT_turn_for_secs_2":"for","ALBERT_turn_for_secs_3":"secs","ALBERT_change_both_wheels_by_1":"change wheels by left:","ALBERT_change_both_wheels_by_2":"right:","ALBERT_change_both_wheels_by_3":"","ALBERT_set_both_wheels_to_1":"set wheels to left:","ALBERT_set_both_wheels_to_2":"right:","ALBERT_set_both_wheels_to_3":"","ALBERT_change_wheel_by_1":"change","ALBERT_change_wheel_by_2":"wheel by","ALBERT_change_wheel_by_3":"","ALBERT_set_wheel_to_1":"set","ALBERT_set_wheel_to_2":"wheel to","ALBERT_set_wheel_to_3":"","ALBERT_stop":"stop","ALBERT_set_pad_size_to_1":"set pad size to width:","ALBERT_set_pad_size_to_2":"height:","ALBERT_set_pad_size_to_3":"","ALBERT_set_eye_to_1":"set","ALBERT_set_eye_to_2":"eye to","ALBERT_set_eye_to_3":"","ALBERT_clear_eye_1":"clear","ALBERT_clear_eye_2":"eye","ALBERT_body_led_1":"","ALBERT_body_led_2":"body led","ALBERT_front_led_1":"","ALBERT_front_led_2":"front led","ALBERT_color_cyan":"cyan","ALBERT_color_magenta":"magenta","ALBERT_beep":"beep","ALBERT_change_buzzer_by_1":"change buzzer by","ALBERT_change_buzzer_by_2":")","ALBERT_set_buzzer_to_1":"set buzzer to","ALBERT_set_buzzer_to_2":")","ALBERT_clear_buzzer":"clear buzzer","ALBERT_play_note_for_1":"play note","ALBERT_play_note_for_2":"',","ALBERT_play_note_for_3":"for","ALBERT_play_note_for_4":"beats","ALBERT_rest_for_1":"rest for","ALBERT_rest_for_2":"beats","ALBERT_change_tempo_by_1":"change tempo by","ALBERT_change_tempo_by_2":")","ALBERT_set_tempo_to_1":"set tempo to","ALBERT_set_tempo_to_2":"bpm","VARIABLE_variable":"variable","wall":"Wall","robotis_common_case_01":"(을)를","robotis_common_set":"(으)로 정하기","robotis_common_value":"값","robotis_common_clockwhise":"시계방향","robotis_common_counter_clockwhise":"반시계방향","robotis_common_wheel_mode":"회전모드","robotis_common_joint_mode":"관절모드","robotis_common_red_color":"빨간색","robotis_common_green_color":"녹색","robotis_common_blue_color":"파란색","robotis_common_on":"켜기","robotis_common_off":"끄기","robotis_common_cm":"제어기","robotis_common_port_1":"포트 1","robotis_common_port_2":"포트 2","robotis_common_port_3":"포트 3","robotis_common_port_4":"포트 4","robotis_common_port_5":"포트 5","robotis_common_port_6":"포트 6","robotis_common_play_buzzer":"연주","robotis_common_play_motion":"실행","robotis_common_motion":"모션","robotis_common_index_number":"번","robotis_cm_custom":"직접입력 주소","robotis_cm_spring_left":"왼쪽 접촉 센서","robotis_cm_spring_right":"오른쪽 접촉 센서","robotis_cm_led_left":"왼쪽 LED","robotis_cm_led_right":"오른쪽 LED","robotis_cm_led_both":"양 쪽 LED","robotis_cm_switch":"선택 버튼 상태","robotis_cm_user_button":"사용자 버튼 상태","robotis_cm_sound_detected":"최종 소리 감지 횟수","robotis_cm_sound_detecting":"실시간 소리 감지 횟수","robotis_cm_ir_left":"왼쪽 적외선 센서","robotis_cm_ir_right":"오른쪽 적외선 센서","robotis_cm_calibration_left":"왼쪽 적외선 센서 캘리브레이션 값","robotis_cm_calibration_right":"오른쪽 적외선 센서 캘리브레이션 값","robotis_cm_clear_sound_detected":"최종소리감지횟수 초기화","robotis_cm_buzzer_index":"음계값","robotis_cm_buzzer_melody":"멜로디","robotis_cm_led_1":"1번 LED","robotis_cm_led_4":"4번 LED","robotis_aux_servo_position":"서보모터 위치","robotis_aux_ir":"적외선센서","robotis_aux_touch":"접촉센서","robotis_aux_brightness":"조도센서(CDS)","robotis_aux_hydro_themo_humidity":"온습도센서(습도)","robotis_aux_hydro_themo_temper":"온습도센서(온도)","robotis_aux_temperature":"온도센서","robotis_aux_ultrasonic":"초음파센서","robotis_aux_magnetic":"자석센서","robotis_aux_motion_detection":"동작감지센서","robotis_aux_color":"컬러센서","robotis_aux_custom":"사용자 장치","robotis_carCont_aux_motor_speed_1":"감속모터 속도를","robotis_carCont_aux_motor_speed_2":", 출력값을","robotis_carCont_calibration_1":"적외선 센서 캘리브레이션 값을","robotis_openCM70_aux_motor_speed_1":"감속모터 속도를","robotis_openCM70_aux_motor_speed_2":", 출력값을","robotis_openCM70_aux_servo_mode_1":"서보모터 모드를","robotis_openCM70_aux_servo_speed_1":"서보모터 속도를","robotis_openCM70_aux_servo_speed_2":", 출력값을","robotis_openCM70_aux_servo_position_1":"서보모터 위치를","robotis_openCM70_aux_led_module_1":"LED 모듈을","robotis_openCM70_aux_custom_1":"사용자 장치를","XBOT_digital":"Digital","XBOT_D2_digitalInput":"D2 Digital Input","XBOT_D3_digitalInput":"D3 Digital Input","XBOT_D11_digitalInput":"D11 Digital Input","XBOT_analog":"Analog","XBOT_CDS":"Light Sensor Value","XBOT_MIC":"Mic Sensor Value","XBOT_analog0":"Analog PIN0 Value","XBOT_analog1":"Analog PIN1 Value","XBOT_analog2":"Analog PIN2 Value","XBOT_analog3":"Analog PIN3 Value","XBOT_Value":"Ouput Value","XBOT_pin_OutputValue":"PIN, Ouput Value","XBOT_High":"HI","XBOT_Low":"LO","XBOT_Servo":"Servo Motor","XBOT_Head":"Head(D8)","XBOT_ArmR":"Right Arm(D9)","XBOT_ArmL":"Left Arm(D10)","XBOT_angle":", Angle","XBOT_DC":"Wheel(DC) Motor","XBOT_rightWheel":"Right","XBOT_leftWheel":"Left","XBOT_bothWheel":"Both","XBOT_speed":", Speed","XBOT_rightSpeed":"Wheel(DC) Motor Right(2) Speed:","XBOT_leftSpeed":"Left(1) Speed:","XBOT_RGBLED_R":"RGB LED Color from Red","XBOT_RGBLED_G":"Green","XBOT_RGBLED_B":"Blue","XBOT_RGBLED_color":"RGB LED Color from","XBOT_set":" ","XBOT_c":"C","XBOT_d":"D","XBOT_e":"E","XBOT_f":"F","XBOT_g":"G","XBOT_a":"A","XBOT_b":"B","XBOT_melody_ms":"sec of Melody Playing","XBOT_Line":"th Line","XBOT_outputValue":"Text","CALC_rotation_value":"rotation value","CALC_direction_value":"direction value","VARIABLE_is_included_in_list":"","VARIABLE_is_included_in_list_1":"is included in","VARIABLE_is_included_in_list_2":"value","VARIABLE_is_included_in_list_3":"","SCENE_when_scene_start":"When scene started","SCENE_start_scene_1":"Start","SCENE_start_scene_2":"scene","SCENE_start_neighbor_scene_1":"Start","SCENE_start_neighbor_scene_2":"scene","SCENE_start_scene_pre":"pre","SCENE_start_scene_next":"next","FUNCTION_explanation_1":"name","FUNCTION_character_variable":"string/number","FUNCTION_logical_variable":"logical variable","FUNCTION_function":"function","FUNCTION_define":"Define function","CALC_calc_operation_sin":"sin value","CALC_calc_operation_cos":"cos value","CALC_calc_operation_tan":"tan value","CALC_calc_operation_floor":"floor value","CALC_calc_operation_ceil":"ceil value","CALC_calc_operation_round":"round value","CALC_calc_operation_factorial":"factorial value","CALC_calc_operation_asin":"asin value","CALC_calc_operation_acos":"acos value","CALC_calc_operation_atan":"atan value","CALC_calc_operation_log":"log value","CALC_calc_operation_ln":"natural log value","CALC_calc_operation_natural":"integer value","CALC_calc_operation_unnatural":"decimal value","MOVING_locate_object_time_1":"factorial value","MOVING_locate_object_time_2":"seconds to the","MOVING_locate_object_time_3":"","wall_up":"upper wall","wall_down":"down wall","wall_right":"right wall","wall_left":"left wall","CALC_coordinate_x_value":"coordinate x","CALC_coordinate_y_value":"coordinate y","CALC_coordinate_rotation_value":"rotation","CALC_coordinate_direction_value":"direction","CALC_picture_index":"index of picture","CALC_picture_name":"name of picture","FLOW_repeat_while_true_1":"Repeat","FLOW_repeat_while_true_2":" ","TUT_when_start":"","TUT_move_once":"","TUT_rotate_left":"","TUT_rotate_right":"","TUT_jump_barrier":"","TUT_repeat_tutorial_1":"","TUT_repeat_tutorial_2":"","TUT_if_barrier_1":"","TUT_if_barrier_2":"","TUT_if_conical_1":"","TUT_if_conical_2":"","TUT_repeat_until":"","TUT_repeat_until_gold":"","TUT_declare_function":"","TUT_call_function":"","CALC_calc_operation_abs":"absolute value","CONTEXT_COPY_option":"copy code(s)","Delete_Blocks":"delete code(s)","Duplication_option":"copy & paste","Paste_blocks":"paste code(s)","Clear_all_blocks":"remove all codes","transparency":"Transparency","BRUSH_change_brush_transparency_1":"Change transparency by","BRUSH_change_brush_transparency_2":"%","BRUSH_set_brush_transparency_1":"Set transparency to","BRUSH_set_brush_transparency_2":"%","CALC_char_at_1":"letter","CALC_char_at_2":"of","CALC_char_at_3":"","CALC_length_of_string_1":"length of","CALC_length_of_string_2":"","CALC_substring_1":"substring of","CALC_substring_2":"from","CALC_substring_3":"to","length_of_string":"to","CALC_substring_4":"","CALC_replace_string_1":"replace","CALC_replace_string_2":"in","CALC_replace_string_3":"with","CALC_replace_string_4":"","CALC_change_string_case_1":"","CALC_change_string_case_2":"of","CALC_change_string_case_3":" ","CALC_change_string_case_sub_1":"uppercase","CALC_change_string_case_sub_2":"lowercase","CALC_index_of_string_1":"index of","CALC_index_of_string_2":"in","CALC_index_of_string_3":"","MOVING_add_direction_by_angle_time_explain_1":"For","MOVING_direction_relative_duration_1":"For","MOVING_direction_relative_duration_2":"secs set direction to","MOVING_direction_relative_duration_3":"","CALC_get_sound_volume":"Volume","SOUND_sound_from_to_1":"Play","SOUND_sound_from_to_2":"sound from","SOUND_sound_from_to_3":"to","SOUND_sound_from_to_4":"secs","SOUND_sound_from_to_and_wait_1":"Play","SOUND_sound_from_to_and_wait_2":"sound from","SOUND_sound_from_to_and_wait_3":"to","SOUND_sound_from_to_and_wait_4":"secs and wait","CALC_quotient_and_mod_1":"","CALC_quotient_and_mod_2":"of","CALC_quotient_and_mod_3":"/","CALC_quotient_and_mod_4":" ","CALC_quotient_and_mod_sub_1":"Quotient","CALC_quotient_and_mod_sub_2":"Rest","self":"Self","CALC_coordinate_size_value":"Scale","CALC_choose_project_timer_action_1":"","CALC_choose_project_timer_action_2":"timer","CALC_choose_project_timer_action_sub_1":"Start","CALC_choose_project_timer_action_sub_2":"Stop","CALC_choose_project_timer_action_sub_3":"Reset","LOOKS_change_object_index_1":"bring to","LOOKS_change_object_index_2":"","LOOKS_change_object_index_sub_1":"front","LOOKS_change_object_index_sub_2":"forward","LOOKS_change_object_index_sub_3":"backward","LOOKS_change_object_index_sub_4":"back","FLOW_repeat_while_true_until":"until","FLOW_repeat_while_true_while":"while","copy_block":"copy block(s)","delete_block":"delete block(s)","tidy_up_block":"tidy up the blocks","block_hi":"Hi","entry_bot_name":"Entrybot","hi_entry":"Hello Entry!","hi_entry_en":"Hello Entry!","bark_dog":"dog barking","walking_entryBot":"Walking Entrybot","entry":"Entry","hello":"Hello","nice":"nice to meet you"};Lang.Buttons={"apply":"Apply","cancel":"Cancel","save":"OK","start":"Start","confirm":"OK","delete":"Delete","create":"Create Class","done":"Done","accept":"Accept","refuse":"Refuse","yes":"Yes","button_no":"No"};Lang.ko="한국어";Lang.Menus={"no_results_found":"No results found","upload_pdf":"Upload PDF materials","select_basic_project":"Select Project","try_it_out":"TRY IT OUT","go_boardgame":"ENTRY-Bot Board Game","go_cardgame":"ENTRY Bot Card game","go_solve":"Learn programming","go_ws":"Entry Create","go_arts":"Entry Share","open_only_shared_lecture":"<b>오픈 강의</b> 페이지에 <b><공개></b> 한 강의만 불러올 수 있습니다. 불러오고자 하는 <b>강의</b>의 <b>공개여부</b>를 확인해 주세요.","already_exist_group":"group already exists","cannot_invite_you":"Can't invite by yourself","apply_original_image":"Save original image","draw_new_ques":"Are you sure you want to go to \n'Draw new object' page?","draw_new_go":"Yes, Go","draw_new_stay":"No, Stay","file_upload_desc_1":"Make sure you don't upload","file_upload_desc_2":"cruel and bloody images","file_upload_desc_3":"overly sexual images","file_upload_desc_4":"images with curse words, images that incite disgust in viewers","file_upload_desc_5":"* Uploading of above contents may be restricted under user policy and related laws.","lesson_by_teacher":"Teacher created lesson","delete_group_art":"from the list?","elementary_short":"elementary","middle_short":"middle school","edit_share_set_course":"Edit share settings","share_lesson":"sharing lesson","share_course":"sharing courseware","from_list_ko":"","edit_share_set_lesson":"Edit share settings","comming_soon":"Coming soon","no_class_alert":"Class selected does not exist. To create a class, go to 'My Class' to create a class.","students_cnt":"students","defult_class_alert_1":"Do you want to set ","defult_class_alert_2":"\n as default class?","default_class":"Default classroom","enter_hw_name":"Enter Assignment name.","hw_limit_20":"You can created up to 20 assignments","stu_example":"Example)\n John Doe\n John Doe\n John Doe","hw_description_limit_200":"Add assignment description. (within 200 characters)","hw_title_limit_50":"Enter Assignment name. (within 50 characters)","create_project_class_1":"Create projects you want to share ","create_project_class_2":"with the class from 'Create> Create Project'","create_lesson_assignment_1":"Create lessons you want to add as","create_lesson_assignment_2":"course assignment from 'Create > Create lessons'","i_make_lesson":"Create lessons","lesson_to_class_1":"'Favorite lessons you want to add as","lesson_to_class_2":"course assignment from 'Learn > Open lessons'","studying_students":"Student","lessons_count":"Number of Lessons","group_out":"Leave","enter_group_code":"Enter class code","no_group_invite":"There is no class invitation","done_create_group":"Class is created","set_default_group":"Set as default classroom","edit_group_info":"Modify class information","edit_done":"Edit complete","alert_group_out":"Do you want to leave the class?","lesson_share_cancel":"Cancel Sharing Lesson","lesson_share_cancel_alert":"and change share settings to Private view?","lesson_share_cancel_alert_en":"Do you want to stop sharing ","course_share_cancel":"Cancel Sharing Courseware","select_lesson_share":"Select lesson to share","select_lesson_share_policy_1":"Please check share settings","select_lesson_share_policy_2":"and copyright policies","select_lesson_share_area":"Select share settings","lesson_share_policy":"I agree to Entry's Copyright Policies.","alert_agree_share":"To share publicly, you must agree to Entry's copyright policies","alert_agree_all":"Agree to all items","select_course_share":"Select courseware to share","select_course_share_policy_1":"Please check share settings","select_course_share_policy_2":"and copyright policies","select_course_share_area":"Select share settings","course_share_policy":"I agree to Entry's Copyright Policies.","issued":"Issued","code_expired":"Code has expired. Press 'Reissue Code' button","accept_class_invite":"Accept class invitation","welcome_class":"Welcome to the class.","enter_info":"Please enter your information.","done_group_signup":"You have successfully enrolled to this class","enter_group_code_stu":"Enter the class code sent from your teacher","text_limit_50":"Enter 50 characters or less.","enter_class_name":"Please enter your class name","enter_grade":"Please enter your  grade","enter_class_info":"Please enter your class introduction","student_dup":"exits in this class already.","select_stu_print":"Select student to print","class_id_not_exist":"The class ID does not exist","error_try_again":"Error occured. Please try again","code_not_available":"The code is not valid","gnb_create_lessons":"Create lessons","study_lessons":"Learn Lesson","lecture_help_1":"Select the base project that the learner will start building his/her project on.","lecture_help_2":"To see this help message again, click the button above.","lecture_help_3":"If 'add object' is not shown,<br>adding or deleting object is not possible.","lecture_help_4":"See PDF attachment to get help","lecture_help_5":"Select blocks needed to create project.<br>Unselected blocks will be hidden.","only_pdf":"Only pdf file is uploadable","enter_project_video":"Enter at least one project or video","enter_title":"Enter title.","enter_recommanded_grade":"Enter recommanded grade.","enter_level_diff":"Enter level of difficulty.","enter_time_spent":"Enter time spent.","enter_shared_area":"Select at least one sharing space","enter_goals":"Enter goals","enter_lecture_description":"Enter lecture information","enter_curriculum_description":"Enter courseware information","first_page":"처음 입니다.","last_page":"마지막 페이지 입니다.","alert_duplicate_lecture":"The lesson is already registered","enter_lesson_alert":"Register one or more lessons","open_edit_lessons":"Open lesson to be edited","saved_alert":"was successfully saved.","select_lesson_type":"Select type of lesson you want to create.","create_lesson":"create lesson","create_lesson_desc_1":"create a lesson","create_lesson_desc_2":"according to learning objectives","create_lesson_desc_3":"for your course.","create_courseware":"Create courseware","create_courseware_desc_1":"put multiple lessons together","create_courseware_desc_2":"to create a courseware","create_courseware_desc_3":"","create_open_lesson":"Create open lesson","enter_lesson_info":"Enter lesson information","select_lesson_feature":"Select lesson feature","check_info_entered":"Check information entered","enter_lefo_lesson_long":"Enter information about the lesson.","lesson_info_desc":"Select features and projects that learners will use to create optimal learning environment.","provide_only_used":"Only provide features used in the goal project","see_help":"See help","select_done_project_1":"Select","select_done_project_2":"the goal project","select_done_project_3":"that the learner is to create","select_project":"Select my project or my favorite project","youtube_desc":"Enter Youtube links","lesson_video":"Lesson video","lesson_title":"Lesson title","recommended_grade":"grade level","selection_ko":"","selection_en":"Select","level_of_diff":"difficulty","select_level_of_diff":"Select difficulty","enter_lesson_title":"enter lesson title (in 30 characters or less)","select_time_spent":"Select time","time_spent":"time","lesson_overview":"Lesson Overview","upload_materials":"Upload course materials","open":"Open","cancel":"Cancel","upload_lesson_video":"Upload lesson video","youtube_upload_desc":"Insert Youtube link for course videos","cancel_select":"Undo select","select_again":"Select again","goal_project":"Goal project","upload_study_data":"Upload learning materials that learners can view while building the project.","upload_limit_20mb":"Upload up to 20MB","expect_time":"Time spent","course_videos":"course videos","enter_courseware_info":"Enter courseware information","enter_course_info":"Enter courseware information","select_lessons_for_course":"Select lessons to create a courseware.","course_build_desc_1":"","course_build_desc_2":"Up to 30 lessons","course_build_desc_3":"allowed.","lseeon_list":"show lesson List","open_lessons":"Open lessons","course_title":"Courseware title","title_limit_30":"Enter courseware title(within 30 characters)","course_overview":"Courseware Overview","charactert_limit_200":"Enter within 200 characters","edit_lesson":"Edit lesson","courseware_by_teacher":"Teacher created lesson collections","select_lessons":"Select lessons","check_course_info":"Check if the lesson collection information is correct","select_share_area":"Select sharing space","upload_sub_project":"Side project upload","file_download":"Download file","check_lesson_info":"Check if the lesson information is correct","share_area":"Sharing space","enter_sub_project":"Register side project","lms_hw_title":"Title","lms_hw_ready":"ready","lms_hw_progress":"In progress","lms_hw_complete":"Complete","lms_hw_not_submit":"Not submitted","lms_hw_closed":"Submission closed","submission_condition":"Submission is allowed only for assignments in progress","submit_students_only":"Only students are allowed to submit assignments","want_submit_hw":"Are you sure you want to submit your assignment?","enter_correct_id":"Enter correct ID","id_not_exist":"The ID does not exist.","agree_class_policy":"Agree to class service usage policy.","delete_class":"Delete classs","type_stu_name":"Please enter the student name.","invite_from_1":"is invited to","invite_from_2":"","lms_pw_alert_1":"Once you enter class,","lms_pw_alert_2":"teacher is allowed to reissue your login password.","lms_pw_alert_3":"Make sure that the invitation is from your teacher.","invitation_accepted":"Invitation Accepted!","cannot_issue_pw":"Password cannot be issued because invitation has not been accepted","start_me":"Start coding education with <Monthly Entry>!","monthly_desc_1":"Monthly Entry is a monthly distributed magazine created ","monthly_desc_2":"to help teachers learn to teach programming in fun and easy way.","monthly_desc_3":"Check out the fun cartoons and programming contents every month!","sw_lead_school":"For research and lead schools","me_subscribe":"Subscribe","pizza_event":"Participate in the Pizza Raffle","event_confirm":"Did I win the raffle?","monthly_entry":"Monthly Entry","me_desc_1":"Meet Monthly Entry magazine distributed monthly!","me_desc_2":"","solve_desc_1":"Learn the basics of","solve_desc_2":"software programming by solving","playSw_desc_1":"Learn to code by watching EBS TV Series and special tutorial videos!","playSw_desc_2":"","recommended_lessons":"Recommendations","recommended_lessons_1":"Basic to advanced level.","recommended_lessons_2":"","offline_top_desc_1":"Offline Editor's Save Feature has improved as well as security.","offline_top_desc_2":"Download now","offline_main_desc":"Update Entry Offline Editor","art_description":"This is a project sharing space. Create your own project and share.","study_index":"Learn to code with Entry's coursewares by topic and grade levels","study_for_beginner":"Entry Courseware for Starters","entrybot_desc_3":"Take Entrybot to school","entrybot_desc_4":"by assembling command blocks","move_entrybot":"Control Entrybot","can_change_entrybot_1":"Change Entrybot's color, make it talk","can_change_entrybot_2":"using block commands","learning_process_by_topics":"Courseware by topic","show_detail":"See Details","solve_mission":"Solve Mission","solve_mission_desc_1":"Learn to code while playing games and solving missions!","solve_mission_desc_2":"Control Entrybot move through the maze so it can reach its destination while learning the concepts of sequence, repeat, select, comparison and function.","learning_process_by_grades":"Courseware by grade levels","e3_to_e4":"Elementary 3-4th grade","e5_to_e6":"Elementary 5-6th grade","m1_to_m3":"7th+ and above","make_using_entry":"Create projects with Entry","make_using_entry_desc_1":"Assemble block to create your own program!","make_using_entry_desc_2":"Download and follow along the learning materials to create animation, media art, game and other fun programs.","make_through_ebs_1":"Learn to code by watching EBS TV Series.","make_through_ebs_2":"The fun TV Series are accompanied by step-by-step tutorial videos so anyone can easily create programs.","support_block_js":"Javascript mode will be supported for all Missions starting August.","study_ebs_title_1":"순서대로! 차례대로!","study_ebs_desc_1":"[실습] 엔트리봇의 심부름","study_ebs_title_2":"쉽고 간단하게!","study_ebs_desc_2":"[실습] 꽃송이 만들기","study_ebs_title_3":"언제 시작할까?","study_ebs_desc_3":"[실습] 동물가족 소개","study_ebs_title_4":"다른 선택, 다른 결과!","study_ebs_desc_4":"[실습] 텔레파시 게임","study_ebs_title_5":"정보를 담는 그릇","study_ebs_desc_5":"[실습] 덧셈 로봇 만들기","study_ebs_title_6":"요모조 따져 봐!","study_ebs_desc_6":"[실습] 복불복 룰렛","study_ebs_title_7":"번호로 부르면 편해요!","study_ebs_desc_7":"[실습] 나만의 버킷리스트","study_ebs_title_8":"무작위 프로그램을 만들어라!","study_ebs_desc_8":"[실습] 무작위 캐릭터 만들기","study_ebs_title_9":"어떻게 찾을까?","study_ebs_desc_9":"[실습] 도서관 책 검색","study_ebs_title_10":"줄을 서시오!","study_ebs_desc_10":"[실습] 키 정렬 프로그램","event":"이벤트","divide":"분기","condition":"conditionals","random_number":"무작위수","search":"탐색","sorting":"정렬","parallel":"병렬","signal":"신호","input_output":"입출력","sequential":"sequence","repeat":"repeat","choice":"selection","repeat_advanced":"repeat(sequence+condition)","function":"function","compare_operation":"comparison","arithmetic":"산술연산","entrybot_school":"Entrybot goes to school","entrybot_school_desc_1":"Entrybot's friends are trapped in the forest!","entrybot_school_desc_2":"Help Entrybot's friends escape.","robot_factory":"Robot Factory","robot_factory_desc_1":"Entrybot is trapped in a robot factory!","robot_factory_desc_2":"Collect all parts to escape the factory.","electric_car":"Electric Car","electric_car_desc_1":"Help Entrybot's car move forward ","electric_car_desc_2":"by making sure it has enough fuel.","forest_adventure":"Forest Adventures","forest_adventure_desc_1":"Entrybot's friends are trapped in the forest!","forest_adventure_desc_2":"Help Entrybot's friends escape.","town_adventure":"Village Adventures","town_adventure_desc_1":"Help Entrybot find fuel","town_adventure_desc_2":"in the village.","space_trip":"Space Travels","space_trip_desc_1":"Entrybot just completed its space exploration.","space_trip_desc_2":"Help Entrybot return to Earth.","learn_programming_mission":"Learn programming by playing challenges","make_open_lecture":"create open lessons","group_created":"Class created","group_signup":"Class enrolled","delete_from_list":"from the list?","delete_from_list_en":"Do you want to delete","lecture_collection":"Courseware","edit_mypage_profile":"Managae my info","main_image":"Main image","edit_profile_success":"Applied.","no_project_1":"There are no projects to show.","no_project_2":"How about creating your project now?","no_marked_project_1":"There is no favorite project at this moment.","no_marked_project_2":"'Browse through 'Share' section to find interesting projects! ","view_project_all":"Browse project","no_lecture_1":"There are no lessons to show.","no_lecture_2":"Create lessons from 'open lessons'","no_marked_lecture_1":"There is no favorite lesson to show.","no_marked_lecture_2":"Browse through 'Open lessons' to see various lessons!","view_lecture":"Browse lessons","no_studying_lecture_1":"There are no lessons to show.","no_studying_lecture_2":"Start learning from 'Open lessons' section!","no_lecture_collect_1":"There are no courseware to show.","no_lecture_collect_2":"Create courseware from 'Create open courseware'","make_lecture_collection":"Create courseware","no_marked_lecture_collect_1":"There is no favorite courseware to show.","no_marked_lecture_collect_2":"Browse through 'Open lessons' to see various lessons!","view_lecture_collection":"Browse courseware","no_studying_lecture_collect_1":"There are no courseware to show.","no_studying_lecture_collect_2":"Start learning from 'Open lessons' section!","my_lecture":"My lessons","marked_lecture":"Favorite lessons","marked_lecture_collection":"My courseware","studying_lecture":"Lessons in progress","completed_lecture":"Lessons completed","my_lecture_collection":"My courseware","studying_lecture_collection":"Courseware in progress","completed_lecture_collection":"Courseware completed","materialCC":"All contents provided are released under Creative Commons CC-BY 2.0 License.","pdf":"PDF","helper":"helper","youtube":"vedio","tvcast":"vedio","goal":"goal","basicproject":"basic","hw":"hardware","object":"object","download_info":"Click on the title to download resource","entry_materials_all":"Entry Educational Materials","recommand_grade":"Grade levels","3_4_grades":"3-4th","5_6_grades":"5-6th","middle_grades":"7th+","entry_go_go":"Entry Go Go!","entry_go_go_desc":"Explore educational materials prepared by grade levels. A set of courseware, student activity book, teacher's guide is provided.","stage_beginner":"Basic","stage_middle":"Advanced","stage_high":"Expert","middle_school_short":"7th+","learn_entry_programming":"Follow along step by step.","entry_programming_desc":"Entry Programming: Become an Entry expert!","ebs":"","ebs_material_desc":"Teach using the EBS TV Series and Teacher's Guide!","season_1_material":"Season 1 Teacher's Guide","season_2_material":"Season 2 Teacher's Guide","compute_think_textbook":"Improve computational thinking skills","computational_sw":"Learn to code for subjects such as language arts, math, science, fine arts and other courses!","entry_x_hardware":"Entry Hardware Educational Materials","e_sensor":"E Sensorboard","arduino":"Arduino","orange_board":"orangeBoard","joystick":"orangeBoard(joystick)","materials_etc_all":"Other Educational Materials","materials_teaching":"For Teacher Education","materials_etc":"Other Resources","materials_teaching_1":"Why Code?","materials_teaching_2":"Unplugged Acitivies with Entry","materials_teaching_3":"Learn by playing in Entry Challenge Mode","materials_teaching_4":"Entry for Real World Problem Solving","materials_teaching_5":"Begin Interdisciplinary Coding with Entry1","materials_teaching_6":"Begin Interdisciplinary Coding with Entry2","materials_teaching_7":"Physical Computing 1 (E-Sensorboard)","materials_teaching_8":"Physical Computing 2 (Hamster Robot)","materials_teaching_9":"Learn to use Entry LMS effectively ","materials_etc_1":"Contents for Classroom Use","materials_etc_2":"Guide for Entry First-Timer Teachers","materials_etc_3":"Monthly Entry","materials_etc_4":"About Entry","materials_etc_5":"Introducing Entry","materials_etc_6":"Entry Block Catalogue","jr_if_1":"if","jr_if_2":"in front","jr_fail_no_pencil":"There is no pencil. Use 'pencil block' at the pencil!","jr_fail_forgot_pencil":"Oh no! I forgot my pencil. Let's pick up the pencil.","jr_fail_much_blocks":"너무많은 블록을 사용했어, 다시 도전해볼래?","cparty_jr_success_1":"Hooray! I got my backpack!","go_right":"go right","go_down":"go down","go_up":"go up","go_left":"go left","go_forward":"Go forward","jr_turn_left":"Turn left","jr_turn_right":"Turn right","go_slow":"Go slow","repeat_until_reach_1":"","repeat_until_reach_2":"Repeat until reach","pick_up_pencil":"Pick up","repeat_0":"Repeat","repeat_1":"","when_start_clicked":"When start button clicked","age_0":"Age 0+","create_character":"Creating Character","age_7_9":"Age 7~9","going_school":"Going to School","age_10_12_1":"Age 10~12","collect_parts":"Collecting Parts","age_10_12_2":"Age 10~12","driving_elec_car":"Driving Electric Car","age_13":"Age 13+","travel_space":"Traveling Space","people":"People","all":"All","life":"Life","nature":"Nature","animal_insect":"Animal/Insect","environment":"Environment","things":"Things","vehicles":"Vehicles","others":"Others","fantasy":"Fantasy","instrument":"Instrument","piano":"Piano","marimba":"Marimba","drum":"Drum","janggu":"Janggu","sound_effect":"Sound","others_instrument":"Others","aboutEntryDesc_1":"Entry is an education platform created to help anyone learn to code.","aboutEntryDesc_2":"Students are able to learn to code while playing.","aboutEntryDesc_3":"Teachers are able to teach and manage students effectively","aboutEntryDesc_4":"Entry is a non-profit service.","aboutEntryDesc_5":"","viewProjectTerms":"See usage policy","openSourceTitle":"Promoting open source culture","openSourceDesc_1":"Entry's source code and ","openSourceDesc_2":"all educational materials","openSourceDesc_3":"are open to public","viewOpenSource":"See open source code","eduPlatformTitle":"Entry for Classroom Use","eduPlatformDesc_1":"Entry is developed with teachers ","eduPlatformDesc_2":"to promote learning","eduPlatformDesc_3":"in classroom settings.","madeWith":"Advisory group","researchTitle":"Continuous improvement through research","researchDesc_1":"Entry collaborates with researchers to strengthen learning effectiveness","researchDesc_2":"","researchDesc_3":"","viewResearch":"See research materials","atEntry":"Entry provides","entryLearnDesc_1":"learn while playing","entryLearnDesc_2":"<Learn> section provides various coursewares and learning materials","entryLearnDesc_3":"to improve problem solving skills through coding.","entryLearnDesc_4":"Watch videos, solve problems and learn while playing.","entryMakeDesc_1":"<Create> section provides block-based coding tool which enables","entryMakeDesc_2":"even first time learners to easily create programs.","entryShareDesc_1":"<Share> section allows users to share his or her project with others.","entryShareDesc_2":"Explore how the shared projects are created, make improvements,","entryShareDesc_3":"collaborate with friends to make even cooler projects.","entryGroup":"Learning Management Tool","entryGroupTitle":"My Class","entryGroupDesc_1":"<Learning Management Tool> is created to help teachers easily manage students.","entryGroupDesc_2":"Create your own class, assign homework,","entryGroupDesc_3":"share project within the class, and check student progress.","unpluggedToPhysical":"From Unplugged Activity to Physical Computing","algorithmActivity":"Basic Algorithm Activity","programmignLang":"Block-based Coding","unpluggedDesc_1":"Learn the basics of programming such as sequence, repetition,","unpluggedDesc_2":"selection and function by playing Entry Boardgame and Cardgame.","entryMaze":"Entrybot Maze Escape","entryAI":"Space Travels","algorithmDesc_1":"Earn a certificate by completing the coding missions.","algorithmDesc_2":"Learn to code while playing.","programmingLangDesc_1":"Coding is made easy with Entry.","programmingLangDesc_2":"Create your own games, animation, media art and much more.","viewSupporHw":"see which hardware connects","supportHwDesc_1":"Entry connects to many physical computing devices to create awesome projects","supportHwDesc_2":"that interacts with the physical world. More devices are continuously added!","entryEduSupport":"Entry Education Support","eduSupportDesc_1":"Entry Labs provides educational materials for free.","eduSupportDesc_2":"Download educational materials from the Educational Materials page.","materials_1_title":"Textbook by grade levels","materials_1_desc_1":"Improve coding skills step by step","materials_1_desc_2":"","materials_2_title":"EBS TV program and teacher's guide","materials_2_desc_1":"EBS TV series are accompanied","materials_2_desc_2":"by teacher's guide","materials_3_title":"Educational materials","materials_3_title_2":"for elementary and mid to high school","materials_3_desc_1":"Improve computational thinking skills.","materials_3_desc_2":"","moreMaterials":"See more educational materials","moreInfoAboutEntry_1":"Click on the links below to get Entry's latest updates.","moreInfoAboutEntry_2":"Educational materials as well as exciting news are shared.","blog":"Blog","post":"Post","tvCast":"TVCast","albertSchool":"Albert","arduinoBoard":"Arduino certified","arduinoCompatible":"non-certified","bitBlock":"BitBlock","bitbrick":"Bitbrick","codeino":"CODEino","e-sensor":"E-Sensorboard","e-sensorUsb":"E-Sensor board","e-sensorBT":"E-Sensor board(Bluetooth)","hamster":"Hamster","littlebits":"Littlebits","orangeBoard":"OrangeBoard","robotis_carCont":"Robotis Robot car","robotis_IoT":"Robotis IoT","dplay":"DPLAY","nemoino":"NEMOino","Xbot":"XBOT EDGE USB","XbotBT":"XBOT EPOR and EDGE Bluetooth","Neobot":"Neo Bot","about":"About","articles":"Articles","gallery":"Gallery","learn":"Learn","login":"Sign In","logout":"Sign Out","make":"Create","register":"Sign Up","Join":"Join","Edit_info":"Edit Info","Discuss":"Discuss","Explore":"Explore","Load":"Load","My_lesson":"Open Lessons","Resources":"Resources","play_software":"EBS Let’s play, SW!","problem_solve":"Entry Learn","Learn":"Learn","teaching_tools":"Teaching Tools","about_entry":"About ENTRY","what_entry":"What is Entry?","create":"Create","create_new":"Create new","start_programming":"First Step for Software Education","Entry":"Entry","intro_learning":"Learn to code in fun and easy way.","intro_learning_anyone":"Start now with Entry!","start_now":"For Free, Forever.","welcome_entry":"Welcome to ENTRY","student":"Student","non_menber":"General","teacher":"Teacher","terms_conditions":"Terms and Conditions","personal_information":"Information about the collection and use of personal information ","limitation_liability":"Limitation of Liability","entry_agree":"Agree to ENTRY’s Terms of Use","info_agree":"","next":"Next","enter_id":"Enter ID","enter_password":"Enter Password","confirm_password":"Confirm Password","enter_password_again":"Enter  your password again","validation_password":"Please use at least 5 letters and/or numbers","validation_id":"Please use 4-20 letters and/or numbers.","prev":"Back","born_year":"Year born ","select_born":"Select the year you were born.","year":"years","gender":"Gender","choose_gender":"Choose gender","male":"Male","female":"Female","language":"Language","best_language":"Select your best language","korean":"Korean","english":"English","viet":"Vietnamese","option_email":"Email (optional)","insert_email":"Enter your email address","sign_up_complete":"Sign up complete!","agree_terms_conditions":"Please agree Terms and Conditions","agree_personal_information":"Please agree to the collection and use of personal information.","insert_studying_stage":"Please select the group you want to share your project .","insert_born_year":"Insert the year you were born","insert_gender":"Insert gender","select_language":"select language","check_email":"Check email's format","already_exist_id":"ID already exists","id_validation_id":"ID use 4-20 letters and/or numbers.","password_validate_pwd":"Password use at least 5 letters and/or numbers","insert_same_pwd":"Insert same password","studying_stage_group":"","studying_stage":"Please select the group you want to share.","password":"Password","save_id":"Save ID","auto_login":"Keep me sign in","forgot_password":"Forgot your ID or password?","did_not_join":"Haven’t signed up yet?","go_join":"Go to join","first_step":"First Step for Software Education","entry_content_one":"Bring your imagination to life with ENTRY.","entry_content_two":"Create games, animations, media art, and other cool projects!","entry_content_three":"Create projects and share with your friends. Enter the exciting world of ENTRY!","funny_space":"A Fun Learning Space","in_learn_section":"In < Learn > section,","learn_problem_solving":"Various learning contents and mini challenges are available for you in the < Learn > section. Solve mini challenges by coding. Watch fun videos and learn to program.","joy_create":"A Creative Space","in_make":"In < Create > section","make_contents":"In the <Create> section, create your own program with block-based programming language. Create simulation programs to test laws of Physics. Create animation program with your favorite characters. Bring your imagination to life with Entry. ","and_content":"There is no limit to what you can create. You can experiment physical laws you’ve learned in science class, create animations featuring your favorite characters, and even make your own games. ","share_collaborate":"A Sharing Space","explore_contents":"The <Explore> section, showcases thousands of projects created and shared by the Entry community. Try out the fun and creative projects, see how they are coded, and improve them. You can also cooperate with your peers to create exciting projects.","why_software":"Why is learning to code important?","speak_obama_contents":"Learning these skills isn’t just important for your future. It’s important for our country’s future.","obama":"Barack Obama","us_president":"U.S President","billgates_contents":"Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains.","billgates":"Bill Gates","chairman_micro":"Chairman, Microsoft","eric_contents":"For most people on Earth, the digital revolution hasn't even started yet. Within the next 10 years, all that will change. Let's get the whole world coding!","eric":"Eric Schmidt","sandbug_contents":"An understanding of computer science is becoming increasingly essential in today’s world. Our national competitiveness depends upon our ability to educate our children—and that includes our girls—in this critical field.","sandbug":"sheryl Sandberg","view_entry_tools":"Introducing Entry’s unplugged games for teaching programming.","solve_problem":"Solve Mission","solve_problem_content":"Mini challenges will help you learn the basics of programming.","find_extra_title":"ENTRY Bot part finding extravaganza","all_ages":"For all ages","total":"Total","step":"steps","find_extra_contents":"Entry bot is special robot created one day at the Rutz Robot Toy Factory during a blackout. Help him find his missing parts and escape the factory while learning to code.","software_play_contents":"Watch ‘Let’s Play Software’ , follow along the tutorials and learn to create fun programs.","resources_contents":"Get various Entry educational materials for free","from":"From","sw_camp":"Software Creativity Camp, Ministry of Science, ICT and Future Planning","elementary":"Elementary","middle":"Middle school","grades":"Grades","lesson":"Lessons","sw_contents_one":"This guidebook is for elementary students learn physical computing over a 5-lesson course. Students learn to use Entry and create images and stoires. In the final section, students use Arduino to create a musical keyboard","sw_camp_detail":"Ministry of Science, ICT and Future Planning Software Creation Camp","sw_contents_two":"This textbook allows middle school students to experience ENTRY and physical computing over a 5-lesson course. Students learn how to use ENTRY, and create a maze game and quiz program. In the final section, students use Arduino and keyboard to steer a car.","sw_contents_three":"This is a teacher’s guide for starting computing classes in schools.  It contains a variety of unplugged activities and lesson plans using clips from ‘Let’s play, Software!’broadcasts. ","naver_sw":"NAVER Let’s play, Software!","teacher_teaching":"Teacher’s Guide (for elementary grades 5-6 and above)","funny_sw":"Have Fun with Software","sw_contents_four":"This textbook allows students to learn about computing in a fun and playful way through a variety of unplugged activities such as ENTRY Board, and teaches students the basic principles of programming via ENTRY Course Mode. Once they have got down the basics, students learn how to create stories, games, artistic works, and applications using ENTRY. The textbook allows students to create and present their own software. ","ct_text_5":"Grow computational thinking with skills.","teacher_grade_5":"교원 (초등학교 5학년)","ct_text_5_content":"This teacher's guide contains 8 problem solving tasks. Each task is designed to reflect the revised National Curriculum and contains interdisciplinary themes. Cultivate computational thinking skills.","ct_text_6":"교과서와 함께 키우는 컴퓨팅 사고력","teacher_grade_6":"교원 (초등학교 6학년)","ct_text_6_content":"실생활의 문제를 해결하자는 테마로 준비된 총 8개의 학습콘텐츠가 담긴 교사용 지도안입니다. 각 콘텐츠는 개정된 교육과정을 반영한 타교과와의 연계를 통해 다양한 문제를 만나고 해결해볼 수 있도록 설계되었습니다.  아이들이 컴퓨팅 사고력을 갖춘 융합형 인재가 될 수 있도록 지금 적용해보세요!","sw_use":"All textbooks are for non-commercial use only, and can be used freely so long as the author is credited. ","title":"Title","writer":"By","view":"View","date":"Date","find_id_pwd":"Find ID or Password","send_email":"A link to change your password has been sent to you by email.","user_not_exist":"This email does not exist.","not_signup":"Haven't signed up yet?","send":"Send","sensorboard":"ENTRY Sensor Board","physical_computing":"Physical Computing","sensorboard_contents":"Using Arduino no longer requires building a circuit using lots of wires. With ENTRY Board, you can use LED lights, temperature, sound, light sensors, a slider, and switches by simply mounting it onto an Arduino board. Now anyone can easily create their own unique projects using ENTRY Board!","entrybot_boardgame":"ENTRY-Bot Board Game","unplugged":"Unplugged Activities","unplugged_contents":"Learn the principles of programming through Entry-bot Board Game. By helping Entrybot escape the factory, you can learn to think like a computer scientist.","entrybot_cardgame":"ENTRY Bot Cardgame : Bomb Tempest","entrybot_cardgame_contents":"12 different types of bombs appear at the city of Entry! Dismantle the bombs one at a time and learn the basics of programming. By using the concepts of sequence, repetition and conditionals, save the City and become a hero!","basic_learn":"Entry Basics","basic_learn_contents":"Learn to program with Entry’s coursewares","troubleshooting":"Problem Solving","playsoftware":"Let's play, Software!","make_own_lesson":"Create your own lessons and share them with everyone.","lecture":"Lessons","curriculum":"Courseware","group_lecture":"Lessons","group_curriculum":"Courseware","group_homework":"Assignment","group_noproject":"No Project","group_nolecture":"No Lessons","group_nocurriculum":"No Courseware","lecture_contents":"Create customized lessons with limited blocks.","curriculum_contents":"Create a course by putting together series of lessons.","grade_info":"Grades information","difficulty":"Difficulty","usage":"Usages","learning_concept":"Learning concepts","related_subject":"Related subjects","show_more":"Show more","close":"Close","latest":"By Latest","viewer":"By Viewers","like":"By Likes","comment":"By Comments","entire_period":"Entire period","today":"Today","latest_week":"Latest 1 week","latest_month":"Latest 1 month","latest_three_month":"Latest 3 months","current_password":"Current password","incorrect_password":"Incorrect! Try again.","new_password":"New password","password_option_1":"Please use at least 5 letters and/or numbers.","again_new_password":"Confirm new password","enter_new_pwd":"Enter new password.","enter_new_pwd_again":"Enter new password again.","password_match":"Passwords do not match.","incorrect_email":"Incorrect email. Try again.","edit_button":"Edit info","edit_profile":"Edit","my_project":"My projects","my_group":"My Class","mark":"Marking","prev_state":"Back","profile_image":"Profile image","insert_profile_image":"Please upload a profile image.","at_least_180":"At least 180x180 pixels is recommended.","upload_image":"Upload image","about_me":"About me","save_change":"Save changes","basic_image":"Basic Image","profile_condition":"Enter something about yourself. (in 50 characters)","profile_back":"Go back","make_project":"Create Project","exhibit_project":"Exhibit Project","art_list_shared":"Shared","art_list_group_shared":"Group","view_project":"View Project","comment_view":"Comment","upload_project":"Upload","edit":"Edit","save_complete":"Save","just_like":"Like","share":"Share","who_likes_project":"Who likes the projects","people_interest":"People interested projects","none_person":"Nobody","inserted_date":"Date","last_modified":"Last Modified","original_project":"Original project","for_someone":"'s","original_project_deleted":"The original project was deleted","delete_project":"Delete","delete_group_project":"Delete From List","currnet_month_time":"months","current_day_time":"days","game":"Game","animation":"Animation","media_art":"Media Arts","physical":"Physical","etc":"ETC","connected_contents":"Linking content","connected_contents_content":"Discover the variety of content that can be done with the entry . If you're new software to learn easily from person to enjoy board games , you can take advantage of the Arduino and physical computing , such as creating a luxurious view of your own creation .","basic_mission":"Basic mission : Entry bot Maze","basic_mission_content":"A power outage at a toy robot factory magically enabled Entrybot to come to life. Help Entrybot escape the factory and find freedom!","application_mission":"Application mission: Entry bot's Space Odyssey","write_article":"Write","view_all_articles":"View all posts","view_own_articles":"View my posts","learning_materials":"Learning materials","ebs_software_first":"<Let's Play Software> is a TV series created by Naver, EBS and Entry Labs. Learn the basic principles of programming. Watch the show, follow along the video tutorials, and learn to code!","go_software":"Visit Let's play software!","ebs_context":"Visit EBS","category":"Category","add_picture":"Add Picture","upload_article":"Upload article","list":"List","report":"Report","upload":"Upload","staff_picks":"Staff Picks","popular_picks":"Popular Projects","lecture_header_more":"More Projects","lecture_header_reset":"Reset","lecture_header_reset_exec":"Reset to basic project","lecture_header_save":"Save","lecture_header_save_content":"Save current lecture","lecture_header_export_project":"Export to my project","lecture_header_undo":"Undo","lecture_header_redo":"Redo","lecture_header_bugs":"Feedback","lecture_container_tab_object":"Objects","lecture_container_tab_video":"Video","lecture_container_tab_project":"Final project","lecture_container_tab_help":"Help","illigal":"Illegal or inappropriate behavior","verbal":"Verbal abuse or posting personal information","commertial":"Posting for commercial purposes","explicit":"Explicit content","other":"Other","report_result":"Please enter email address to be informed of report results. ","report_success":"Your report was submitted successfully.","etc_detail":"Please give details","lecture_play":"Play","list_view_link":"List","lecture_intro":"Introduction Lessons","study_goal":"Goals","study_description":"Description","study_created":"Created","study_last_updated":"Updated","study_remove":"Remove","study_group_lecture_remove":"Remove From List","study_group_curriculum_remove":"Remove From List","study_edit":"Edit","study_comments":"Comments","study_comment_post":"Post","study_comment_remove":"Remove","study_comment_edit":"Edit","study_comment_save":"Save","study_guide_video":"Guide Video","study_basic_project":"Initial Project","study_done_project":"Complete Project","study_usage_element":"Usage","study_concept_element":"Concept","study_subject_element":"Related","study_element_none":"None","study_label_like":"Like","study_label_interest":"Interest","study_label_share":"Share","study_label_like_people":"People who liked this lecture","study_label_interest_people":"People who interested this lecture","study_related_lectures":"Related lectures","study_expand":"Show all","study_collapse":"Collapse","aftercopy":"Copied to clipboard","study_remove_curriculum":"Are you sure to remove this course?","content_required":"Content required","study_remove_lecture":"Are you sure to remove this lesson?","lecture_build":"Make a lesson","lecture_build_step1":"1. Enter basic lesson information","lecture_build_step2":"2. Selecte required functions","lecture_build_step3":"3. Confirm all of information correctly.","lecture_build_choice":"What is main content?","lecture_build_project":"Entry Project","lecture_build_video":"Lessons Video","lecture_build_grade":"Grades","lecture_build_goals":"Goals","lecture_build_add_goal":"Add a goal","lecture_build_attach":"Attachment","lecture_build_attach_text":"Less than 20MB","lecture_build_assist":"Additional","lecture_build_youtube_url":"Paste a Youtube share link","lecture_build_project_done":"Select a completed project.","lecture_build_scene_text1":"Using scene function or not","lecture_build_scene_text2":"","lecture_build_object_text":"Using Object add function or not","lecture_build_blocks_text1":"Select required blocks only.","lecture_build_blocks_text2":"","lecture_build_basic1":"Select a project.","lecture_build_basic2":"User start with this project.","lecture_build_help":"","lecture_build_help_never":"Close permanently","lecture_build_close":"Close","lecture_build_scene":"Scene 1","lecture_build_add_object":"Add Object","lecture_build_start":"Start","lecture_build_tab_code":"Block","lecture_build_tab_shape":"Shape","lecture_build_tab_sound":"Sound","lecture_build_tab_attribute":"Attribute","lecture_build_block_category":"Select block category.","lecture_build_attr_all":"All","lecture_build_attr_var":"Variable","lecture_build_attr_signal":"Signal","lecture_build_attr_list":"List","lecture_build_attr_func":"Function","lecture_build_edit":"Edit","lecture_build_remove":"Remove","curriculum_build":"Create a courseware","curriculum_step1":"Fill information about this course.","curriculum_step2":"Select lessons for this course.","curriculum_step3":"Confirm information.","curriculum_lecture_upload":"Upload","curriculum_lecture_edit":"Edit","curriculum_lecture_open":"Open","group_lecture_add":"Add my group lessons","group_curriculum_add":"Add my group curriculum","group_lecture_delete":"Delete","group_curriculum_delete":"Delete","group_select":"","group_studentNo":"Student No","group_username":"Name","group_userId":"ID","group_tempPassword":"Modify PW","group_gender":"Gender","group_studentCode":"Code","group_viewWorks":"View Works","added_group_lecture":"lessons deleted","added_group_curriculum":"Course deleted","deleted_group_lecture":"lessons deleted","deleted_group_curriculum":"Course deleted","modal_my":"My","modal_interest":"Marked","modal_project":"Project","section":"Sections","connect_hw":"connect hardware","connect_message":"Connected to %1","connect_fail":"Connect fail","interest_curriculum":"Interest","searchword_required":"Search word required.","file_required":"File is required.","file_upload_max_count":"Upload file size up to 10MB.","image_file_only":"Only image files are uploaded.","file_upload_max_size":"Upload file size up to 10MB.","curriculum_modal_lectures":"My Lessons","curriculum_modal_interest":"Interest","group_curriculum_modal_curriculums":"My Courses","group_curriculum_modal_interest":"Interest","picture_import":"Import a picture","picture_select":"Select a picture","lecture_list_view":"list","play_software_2":"Let’s play, Software2!","play_software_2_content":"<Let's Play Software> is a TV series created by Naver, EBS and Entry Labs. Learn the basic principles of programming. Watch the show, follow along the video tutorials, and learn to code!","open_project_to_all":"Open","close_project":"Close","category_media_art":"Media Art","go_further":"Go further","marked_project":"Favorite Project","marked_group_project":"Favorite group project","basic":"Basic","application":"Application","the_great_escape":"The Great Escape","escape_guide_1":"ENTRY Bot suddenly began to think for himself during a power failure at the robot dog factory! ","escape_guide_1_2":" Help ENTRY Bot escape the factory and find his freedom!","escape_guide_2":"ENTRY Bot is missing too many parts to make it far. Help him find his parts as he makes his way out the factory!","escape_guide_2_2":"Objectives: Sequential Execution","escape_guide_3":"I’ve finally escaped the factory! But it’s still a long way to the village. I think I’m fixed up enough to make it there without too much difficulty. Hey, what’s that robot?","escape_guide_3_2":"Objectives: Repetitive and Conditional Statements","escape_guide_4":"We’re finally getting close to the village! I’m starting to really get the hang of this! I think it might be better to just use the blocks from memory. If I just recharge my battery here, I’ll be able to live free forever.","escape_guide_4_2":"Objectives: Definitions of Function and Function Call","space_travel_log":"Space Travel Log","space_guide_1":"ENTRY Bot has finally completed his exploration of distant space. He’s trying to make his way back home to Earth, but his path is being blocked by a bunch of space rocks! Help ENTRY Bot make it back to Earth safely!","space_guide_2":"It’s finally time to return to Earth! I can’t wait to get back and rest! Tell me the positions of the rocks ahead so I can navigate through them! I’ll go the way you tell me to!","space_guide_2_2":"Objective: Reiterating IF Statements and Logical Operation","cfest_mission":"ENTRY Experiential Mission","maze_1_intro":"Hi. I’m ENTRY Bot. I’m about to save my injured friends and I need your help. Help me save my friends! First, set up the ‘Move forward one space’ block and press ‘Start’.","maze_1_title":"How to Start","maze_1_content":"How do I move ENTRY Bot?","maze_1_detail":"1. Take a block from the Block Box and connect it with the ‘When Start is pressed’ block. <br> 2. Press Start once you have finished assembling. <br> 3. I will move in the order of your assembled blocks from top to bottom. ","maze_2_intro":"Alright! You’ve saved the first of my friends! Now let’s save my next friend. Oh! There’s a beehive in the way! Use the Jump Over block to avoid the beehive and save my friend!","maze_2_title_1":"Jump Over","maze_2_content_1":"How do I get around obstacles?","maze_2_detail_1":"Sometimes your path may be blocked by an obstacle. <br> When there’s an obstacle in your path, you need to use the ‘Jump Over’ block.","maze_2_title_2":"How to Start","maze_2_content_2":"How do I move ENTRY Bot?","maze_2_detail_2":"1. Take a block from the Block Box and connect it with the ‘When Start is pressed’ block. <br> 2. Press Start once you have finished assembling. <br> 3. I will move in the order of your assembled blocks from top to bottom. ","maze_3_intro":"Awesome! Now let’s go save another friend! How about we use the ‘Repeat’ block that my other friend gave use? You can easily repeat the same movements over again using the ‘Repeat’ block! Try changing the number of times to repeat. ","maze_3_title":"Repeat Block (1)","maze_3_content":"How do I use the ‘Repeat (3)’ block?","maze_3_detail":"To perform the same action/s more than once, you need to use the ‘Repeat’ block. <br> Put the blocks that you want to repeat inside the Repeat box and select the number of times you want to repeat.","maze_4_intro":"Super! Not too many robot friends left to save now. Take us to my friend by using the ‘Jump Over’ block on repeat while also evading the beehive!","maze_4_title":"Repeat Block (1)","maze_4_content":"How do I use the ‘Repeat (3)’ block?","maze_4_detail":"To perform the same action/s more than once, you need to use the ‘Repeat’ block. <br> Put the blocks that you want to repeat inside the Repeat box and select the number of times you want to repeat.","maze_5_intro":"Cool! Now let’s try using the ‘Repeat’ block and ‘IF’ block together! Using the ‘IF’ block, you can turn in a direction where there are no walls when you come across a wall. Well then, shall we set off to save my friend?","maze_5_title_1":"IF block","maze_5_content_1":"How does the ‘IF’ block work?","maze_5_detail_1":"You can determine what action to take when you come across a {IMAGE}. <br> The blocks are used only when you come across a {IMAGE}. <br> If there is none, the block is not used.","maze_5_title_2":"Repeat Block (2)","maze_5_content_2":"How do I use the ‘Repeat until’block?","maze_5_detail_2":"Using the ‘Repeat until’block, you can determine until when a specified action is repeated. <br> Just put the blocks you want to repeat inside the ‘Repeat until’ block. <br> Then, the repetition will stop when you reach the space where the {IMAGE} is located. ","maze_6_intro":"Only one friend left! Just do as we’ve practiced and you’ll succeed! Now, let’s go save him!","maze_6_title_1":"IF block","maze_6_content_1":"How does the ‘IF’ block work?","maze_6_detail_1":"You can determine what action to take when you come across a {IMAGE}. <br> The blocks are used only when you come across a {IMAGE}. <br> If there is none, the block is not used.","maze_6_title_2":"Repeat Block (2)","maze_6_content_2":"How do I use the ‘Repeat until’block?","maze_6_detail_2":"Using the ‘Repeat until’block, you can determine until when a specified action is repeated. <br> Just put the blocks you want to repeat inside the ‘Repeat until’ block. <br> Then, the repetition will stop when you reach the space where the {IMAGE} is located. ","maze_programing_mode_0":"Block Coding","maze_programing_mode_1":"Javascript","maze_operation1_title":"STEP 1 – Javascript mode guide","maze_operation1_1_desc":"Hi, I'm Entrybot, the robot dog. Give me commands to reach the mission goals. You can learn about the mission when you begin under <span class=\"textShadow\">\'Goals.\'</span>","maze_operation1_2_desc":"Once you learn your goal, you need to give me <b>commands</b>. <span class=\"textUnderline\">\’Command Box\’</span> is where the <b>commands</b> reside. You can create <b>commands</b> using <b>mouse</b> and <b>keyboard.</b> With the <span class=\"textShadow\">mouse</span>, you can click or drag the <b>commands</b> to create instructions.","maze_operation1_2_textset_1":"How to click on the commands","maze_operation1_2_textset_2":"How to drag and drop commands","maze_operation1_3_desc":"If you want to use the <span class=\"textShadow\">keyboard</span> to give commands, <b>type in the commands</b> in the \’Command Box.\’<br>When you type in the commands, be careful not to ommit <span class=\"textShadow\">() and ;</span>","maze_operation1_4_desc":"Once you have finished inputting the commands, click <span class=\"textShadow\">[Run.]</span></br>I will move according to your code once you click [Run.]</br>If you want to know more about each command, check out the <span class=\"textShadow\">[Command guide.]</span>","maze_operation7_title":"STEP 7 - How repeat works (repeat number of times)","maze_operation7_1_desc":"Repeating the <b>same command</b> over and over is a cumbersome task.<br>Simplify the command using the <span class=\"textShadow\">repeat</span> commands.","maze_operation7_2_desc":"Then let's look at how we can simplify commands that repeat.</br>First, click the repeat command. Then change the <span class=\"textShadow\">number</span> in<span class=\"textShadow\">i<1</span></br>Then insert the commands to repeat within  <span class=\"textShadow\"> { }</span>","maze_operation7_3_desc":"For example, this command executes <span class=\"textBadge number1\"></span>move(); 10 times.<br>It is the same as command <span class=\"textBadge number2\"></span>","maze_operation7_4_desc":"When using commands, make sure to spell the  <span class=\"textShadow\">commands correctly within { } </span></br>and that you don't forget <span class=\"textShadow\">’;'</span>.</br>Learn more about the commands in the 'command guide'","maze_operation7_1_textset_1":"When using commands repeatedly","maze_operation7_1_textset_2":"When using repeat command","maze_operation7_2_textset_1":"Number of times to repeat","maze_operation7_2_textset_2":"Commands to repeat","maze_operation7_4_textset_1":"When ({}) is missing","maze_operation7_4_textset_2":"When semicolon(;) is missing","maze_operation9_title":"STEP 9 - How repeat works(Conditional loop)","maze_operation9_1_desc":"We learned about repeating for set number of times.</br>This time, let's explore <span class=\"textShadow\">commands for repeating continuously.</span></br>When you use this command, the action will be executed until end of the mission.</br>Insert commands to be repeated within ({ }).","maze_operation9_2_desc":"<span class=\"textBadge number1\"></span> move(); right(); until end of mission.<br>It is the same as command <span class=\"textBadge number2\"></span>","maze_operation9_3_desc":"Make sure to spell the <span class=\"textShadow\">commands correctly within { }</span><br>and make sure <span class=\"textShadow\">‘true'</span> isn't missing!<br>You can learn more about this command in the 'command guide'","maze_operation9_1_textset_1":"Commands to repeat","maze_operation9_3_textset_1":"When ({}) is missing","maze_operation9_3_textset_2":"When semicolon(;) is missing","maze_operation10_title":"STEP 10 – How condition works","maze_operation10_1_desc":"We learned about repeating commands until end of the mission.</br>This time, let's explore the <span class=\"textShadow\">commands that are only executed under certain conditions.</span></br>As you can see in <span class=\"textBadge number2\"></span>, using conditional statement can make commands <b>more efficient.</b>","maze_operation10_2_desc":"conditional statement can be split into  <span class=\"textShadow\">condition</span> and commands to be <span class=\"textShadow\">executed when met with the condition.</span></br>First, let's look at the <span class=\"textUnderline\">conditions.</span> Insert the condition within <span class=\"textUnderline\">( )</span> that follows ‘if'.</br>For example <span class=\"textBadge number1\"></span> <span class=\"textUnderline\">if(front == ‘wall')</span> means, \’if there is a wall in front of me.\’","maze_operation10_3_desc":"Now let's explore  <span class=\"textUnderline\">commands to execute when met with the condition.</span> These commands are tied within curly <span class=\"textShadow\">braces {}</span> and are executed when met with the given condition.When condition is not met, the commands are ignored.Let's look at an example <span class=\"textBadge number1\"></span>. If the condition is 'when a wall is in front of me', and the condition is met, then <b>I execute the commands within the braces and turn right following the command right();</b>","maze_operation10_4_desc":"The <span class=\"textShadow\">conditional statements</span> are often used with <span class=\"textShadow\">repeat commands.</span></br>Go straight and turn only when met with a wall. </br>I can create commands in the <span class=\"textUnderline pdb5\">order of <span class=\"textBadge number1\"></span><span class=\"textBadge number2\"></span><span class=\"textBadge number3\"></span></span>","maze_operation10_1_textset_1":"<b>[commands]</b>","maze_operation10_1_textset_2":"<span class=\"textMultiline\">move 2 forward</br>turn right,</br>move 3 forward</br>turn right, move forward…</span>","maze_operation10_1_textset_3":"<b>[conditional statements]</b>","maze_operation10_1_textset_4":"<span class=\"textMultiline\">Go forward </br><span class=\"textEmphasis\">'when met with a wall’</span></br>turn right!</span>","maze_operation10_2_textset_1":"condition","maze_operation10_2_textset_2":"commands to execute when condition is met","maze_operation10_3_textset_1":"condition","maze_operation10_3_textset_2":"commands to execute when condition is met","maze_operation10_4_textset_1":"<span class=\"textMultiline\">Go forward </br>until end of mission</span>","maze_operation10_4_textset_2":"<span class=\"textMultiline\">Go forward </br>until met with a wall</span>","maze_operation10_4_textset_3":"<span class=\"textMultiline\">Go forward </br>until met with a wall </br>then turn right</span>","maze_operation15_title":"STEP 15 – How function works","maze_operation15_1_desc":"It is a cumbersome task to type out the commands that are used often.</br><span class=\"textUnderline\">Give a name to the set of commands</span> that are used often.</br><b>Then call the set of commands by its name to create commands conveniently.</b></br>These sets commands are called <span class=\"textShadow\">'functions'.</span> Now let's explore what functions are.","maze_operation15_2_desc":"Using a function involves <b>process of creating a function</b> by grouping a set of functions, and calling the set of commands by <b>'call function’.</b></br>Let's take a look at the process of defining a function.To define a function, give a function name and set of commands to execute.</br>First input <span class=\"textShadow\">‘function'</span> and then give the <span class=\"textShadow\">function name.</span> This time, I'll call it <span class=\"textShadow\">promise.</span></br>Once you've given it a name, insert <span class=\"textUnderline\">().</span> Then type in <span class=\"textUnderline\">({ })</span>.<span class=\"textUnderline\">Once you insert the commands within these brackets,</span> you have finished defining a function!","maze_operation15_3_desc":"Take a look at this command. I created a function called  <span class=\"textShadow\">promise</span></br>When I call this function, then the commands within the <span class=\"textUnderline\">brackets({})</span> will execute</br>move();</br>move();</br>left();</br>","maze_operation15_4_desc":"To call and execute functions, <b>input the name of the functions, then add '();' behind it.</b></br>So to call a function called 'promise', I need to type <span class=\”textShadow\">promise();</span> </br>to execute the function.</br>When I make commands like <span class=\"number1 textBadge\"></span>, the program will execute as that of <span class=\"number2 textBadge\"></span></br>To use the function, define function as <span class=\"number1 textBadge\"></span> and call it.","maze_operation15_1_textset_1":"Checking the commands that are used often","maze_operation15_1_textset_2":"Giving a name for set of commands","maze_operation15_1_textset_3":"Calling a set of commands","maze_operation15_2_textset_1":"Name of the command set (function name)","maze_operation15_2_textset_2":"commads to group as a set","maze_operation15_3_textset_1":"Name of the command set (function name)","maze_operation15_3_textset_2":"commads to group as a set","maze_operation15_4_textset_1":"Defining function","maze_operation15_4_textset_2":"Calling function","maze_operation15_4_textset_3":"Real situation","maze_object_title":"Object info","maze_object_parts_box":"Tool box","maze_object_obstacle1":"obstacle","maze_object_obstacle2":"bee","maze_object_obstacle3":"banana","maze_object_friend":"friend","maze_object_wall1":"wall","maze_object_wall2":"wall","maze_object_wall3":"wall","maze_object_battery":"battery","maze_command_ex":"example","maze_command_title":"command guide","maze_command_move_desc":"moves entrybot one forward","maze_command_jump_desc":"jumps over obstacles like the image below.</br><div class=\"obstacleSet\"></div>","maze_command_right_desc":"turn 90 degrees right in place.","maze_command_left_desc":"turn 90 degrees left in place.","maze_command_for_desc":"repeat commands within curly braces <span class=\"textShadow\">{}</span> for <span class=\"textShadow\">given number</span> of times.","maze_command_while_desc":"repeat commands within curly braces <span class=\"textShadow\">{}</span> until end of mission","maze_command_if1_desc":"When condition <span class=\"textShadow\">'when met with a wall’</span> is fulfilled, </br>execute commands within curly braces <span class=\"textShadow\">{}</span>","maze_command_if2_desc":"When condition <span class=\"textShadow\">'when met with a beehive’</span> is fulfilled,</br>execute commands within curly braces <span class=\"textShadow\">{}</span>","maze_command_if3_desc":"When condition <span class=\"textShadow\">'when met with a banana’</span> is fulfilled,</br>execute commands within curly braces <span class=\"textShadow\">{}</span>","maze_command_promise_desc":"when a <span class=\"textShadow\">function</span> called 'promise' is defined and executed, </br>then the functions within the curly braces <span class=\"textShadow\">{}</span> will execute. ","perfect":"Perfect! You succeeded using ","succeeded_using_blocks":"  blocks!","awesome":"Awesome! You succeeded using just","succeeded_go_to_next":"  blocks!","good":"Good!","but":"<br> But, there is a way to succeed using just ","try_again":"  blocks. <br>Why don’t you try again?","cfest_success":"Awesome! You helped save my friends! <br> Looks like you’re a natural born programmer! <br> See you again soon!","succeeded_and_cert":"blocks!<br> My certificate of completion is ready!","cause_msgs_1":"Oh dear, it’s a dead end. Try again.","cause_msgs_2":"Oops. There’s nothing to jump over. Try again.","cause_msgs_3":"Ouch! That hurt. You should have jumped over this. Try again.","cause_msgs_4":"Sorry, but you need to use the below blocks in this level. <br> Do you want to try again?","cause_msgs_5":"Uh oh… You’ve run out of blocks. Try again.","close_experience":"The<br>End","replay":"Replay","go_to_next_level":"Next","move_forward":"Move forward","turn_left":"Left","turn_right":"Right","turn_en":"Turn ","turn_ko":"","jump_over":"Jump Over","when_start_is_pressed":"When Start is pressed","repeat_until_ko":"","repeat_until_en":"Repeat until","repeat_until":"Repeat until","if_there_is_1":"If there is a ","if_there_is_2":"","used_blocks":"Blocks used","maximum":"Maximum","used_command":"Command used","maximum_command":"Maximum command","block_box":"Block Box","block_assembly":"Block Assembly","command_box":"Command Box","command_assembly":"Command Assembly","start":"Start","engine_running":"Play","engine_replay":"Replay","goto_show":"Learn more","make_together":"Let's build  together!","make_together_content":"Entry is created with teachers and students","project_nobody_like":"Click 'Like', if you like it!","project_nobody_interest":"Click 'Mark' to keep it on your blog.","lecture_nobody_like":"Click 'Like', if you like it!","lecture_nobody_interest":"Click 'Mark' to keep it on your blog.","course_nobody_like":"Click 'Like', if you like it!","course_nobody_interest":"Click 'Mark' to keep it on your blog.","before_changed":"before changed","after_changed":"after changed","from_changed":"( From 17 Apr 2016 ) ","essential":"essential","access_term_title":"Hello we are an educational institute Entry . <br> Thank you for loving your entry <br>From April 17, 2016 Entry Training Institute Website Terms and Conditions <br>  is amended to read as follows:","member_info":"Member information","personal_info":"Agree to the collection and use of personal information.","option":"select one","latest_news":"Latest news","edu_data":"Educational","training_program":"Training","footer_phrase":"Entry is a nonprofit education platform powered by Naver and CONNECT Foundation","footer_use_free":"All materials created by Entry Labs may be used freely for educational purposes as long as the original source is credited.","nonprofit_platform":"nonprofit educational platform","this_is":"powered by Naver and CONNECT Foundation","privacy":"Privacy policy","entry_addr":"Address : Meritz Tower 7th Floor 382 Entry education institute in Gangnam-gu, gangnamdaero Seoul ","phone":"phone","alert_agree_term":"Please agree to ENTRY’s Terms of Use","alert_private_policy":"Please agree to the collection and use of personal information.","agree":"Agree","optional":"option","start_software":"first step of software education","analyze_procedure":"절차","analyze_repeat":"반복","analyze_condition":"분기","analyze_interaction":"상호작용","analyze_dataRepresentation":"데이터 표현","analyze_abstraction":"추상화","analyze_sync":"병렬 및 동기화","jr_intro_1":"Hi! My name is Juny! My friend Entry-Bot is by my right side. Please take me to him! ","jr_intro_2":"Entry-Bot is by my left! Let's go the left side. ","jr_intro_3":"Entry-Bot is by my top side. Please help me meet my friend. ","jr_intro_4":"Come on! Let's meet Entry-Bot! He is by my bottom side. ","jr_intro_5":"Wow! My friend is far away from me. Can you guide me so I can meet Entry-Bot ","jr_intro_6":"Entry-Bot is really far away from here! But It's okay. If we use repeat block, we could reach the Entry-Bot easily.","jr_intro_7":"There are beautiful flowers here! Let's give it to my friend!","jr_intro_8":"On a way to my friend, you can see the flower. Let's give it to my friend.","jr_intro_9":"Oh, my friend is far away from me. Let's find a fastest way to him!","jr_intro_10":"There are flowers! Let's pick it up! ","jr_intro_11":"We should go right side exactly 5 times! Let's use repeat block so we can reach there more easily","jr_intro_12":"Let's meet my friend Entry-Bot using repeat block.","jr_intro_13":"With this misplaced block, I can't reach my friend. Please change the input number of repeat block.","jr_intro_14":"Please take me to my friend Entry-Bot using repeat block.","jr_intro_15":"Entry-Bot is really far away from here! But It's okay. If we use repeat block, we could reach the Entry-Bot easily.","jr_whats_ur_name":"What is your name to be showned on certification.","jr_down_cert":"Certification","jr_popup_prefix_1":"Hooray! I met Entry-Bot!","jr_popup_prefix_2":"Nice! I met Entry-Bot! But we can make it with fewer blocks. How about try again?","jr_popup_suffix":"Thanks to you! I had fun time with Entry-Bot. See you around~","jr_fail_dont_go":"Oops, I can't go there. Please guide me again~","jr_fail_dont_know":"Hmm. Where should I go? Please guide me more~","jr_fail_no_flower":"There is no flower. Use 'flower block' at the flower!","jr_fail_forgot_flower":"I need more flowers for Entry-Bot. Let's try again.","jr_fail_need_repeat":"Uh? I should use 'repeat block' ! Let's try again with the block~","jr_hint_1":"Hi! My name is Juny! My friend Entry-Bot is by my right side. Please take me to him!","jr_hint_2":"Entry-Bot is by my left! Let's go the left side.","jr_hint_3":"Entry-Bot is by my top side. Please help me meet my friend.","jr_hint_4":"Come on! Let's meet Entry-Bot! He is by my bottom side.","jr_hint_5":"Wow! My friend is far away from me. Can you guide me so I can meet Entry-Bot?","jr_hint_6":"Because of the blocks that put together by mistake, I can't reach my friend. Please fix it for me so I can reach my friend Entry-Bot!","jr_hint_7":"There are beautiful flowers here! Let's give it to my friend!","jr_hint_8":"On a way to my friend, you can see the flower. Let's give it to my friend.","jr_hint_9":"Oh, my friend is far away from me. Let's find a fastest way to him!","jr_hint_10":"Oops, I can't reach to my friend because of misplaced blocks. Please fix it so I can give all of flowers to my friend.","jr_hint_11":"We should go right side exactly 5 times! Let's use repeat block so we can reach there more easily.","jr_hint_12":"Let's meet my friend Entry-Bot using repeat block.","jr_hint_13":"With this misplaced block, I can't reach my friend. Please change the input number of repeat block.","jr_hint_14":"Please take me to my friend Entry-Bot using repeat block.","jr_hint_15":"Entry-Bot is really far away from here! But It's okay. If we use repeat block, we could reach the Entry-Bot easily.","jr_certification":"Certification","jr_congrat":"Congratulation!","jr_congrat_msg":"Successfully completed for problem solving courses.","jr_share":"Share","go_see_friends":"Let us see your friends~!","junior_naver":"Junior Naver","junior_naver_contents_1":"'s  cool bear ,  Juni  came looking for entries! ","junior_naver_contents_2":"But Juni' is difficult to find a way yet. ","junior_naver_contents_3":"Please tell Juni to go , so he can meet entrybot.","basic_content":"Basic","jr_help":"Help","help":"Help","cparty_robot_intro_1":"Hi, My name is Entry-bot. I need to to fix myself. Please help me get my parts with 'move forward' block.","cparty_robot_intro_2":"Great! My part is right in front of me but I need to be careful not to get electrocuted. Use 'jump over' block to get to the part.","cparty_robot_intro_3":"Great! There's my part! The path is challenging but using the 'turn' block I can get there easily! Will you help?","cparty_robot_intro_4":"Nice! I feel a lot better! Try using the 'turn' block and 'jump over' block to get the parts!","cparty_robot_intro_5":"Thanks to you, I'm feeling great! Make sure to use 'turn' and 'jump over' to get the part!","cparty_robot_intro_6":"Great! I feel like I can repeat! Use repeat to get to the part!","cparty_robot_intro_7":"Watch out! There are dangerous holes to jump over but no worries! Let's use repeat to get to the part.","cparty_robot_intro_8":"Oh no! The part is far from here. Using repeat can get me there easily. Help me! ","cparty_robot_intro_9":"Wow~ I'm almost complete! Let's use 'repeat' to get to the part!","cparty_robot_intro_10":"Cool! The last part will make me complete! Let's use 'repeat' to get to my last part! ","cparty_car_intro_1":"Hi, My name is Entry-bot. I need battery pack to travel! Can you me get to the battery pack?","cparty_car_intro_2":"Good! We can't go straight this time! Let's use the 'turn left/right' block to get to the battery pack.","cparty_car_intro_3":"Great! There's a speed bump on our way. It'll be dangerous to drive fast. Let's use the 'go slow' block to get to the battery pack.","cparty_car_intro_4":"Yeah! The drive doesn't look easy but using the move forward, 'turn left/ right' block","cparty_car_intro_5":"The road looks challenging but we can safely get to the battery pack by repeating 'turn left/ right' blocks","cparty_car_intro_6":"There are obstacles on our way so let me know how to get around one!","cparty_car_intro_7":"Great! Let's use the 'if' block to get around obastacles and get to the battery pack.","cparty_car_intro_8":"There are two speed bumps this time! Use 'go slow' block to safely travel to the battery pack.","cparty_car_intro_9":"The road looks challenging but using the 'repeat' block and 'if' block, we can make it! Help me get to the battery pack!","cparty_car_intro_10":"Awesome! We're almost there. Let's get that last battery pack!","cparty_car_popup_prefix_1":"Hooray! I got a battery!","cparty_car_popup_prefix_2":"Nice! I got a battery! But we can make it with fewer blocks. How about try again?","cparty_car_popup_suffix":"Thanks to you! I've got all the battery. See you around~","all_grade":"All grades","grade_e3_e4":"Elementary 3~4th grade & up","grade_e5_e6":"Elementary 5~6th grade & up","grade_m1_m3":"Middle School 1~3rd grade & up","entry_first_step":"First Steps Entry","entry_monthly":"Monthly Entry","play_sw_2":"Let's Play  Software 2","entry_programming":"Let's Program!","entry_recommanded_course":"Entry Recommended Courses","introduce_course":"Follow along and create various projects made easy and fun for everyone!","all_free":"*Course videos, customized projects, and resources are provided for free.  ","cparty_result_fail_1":"Oops, I can't go there. Please guide me again~","cparty_result_fail_2":"Ouch! That hurt. You should have jumped over this. Try again.","cparty_result_fail_3":"I'm worn out! Try using the blocks below and make the travel easier.","cparty_result_fail_4":"Hmm... Where should I go? Please give me further instructions.","cparty_result_fail_5":"Oh no! You need to slow down at the speed bump. Try using the 'go slow' block.","cparty_result_success_1":"Hooray! I got a parts","cparty_result_success_2":"Nice! I got a parts! But we can make it with fewer blocks. How about we try again?","cparty_result_success_3":"Thanks to you! I've fixed all~ See you around~","cparty_insert_name":"insert your name","offline_file":"File","offline_edit":"Edit","offline_undo":"Un-do","offline_redo":"Re-do","offline_quit":"Quit","select_one":"Please select one.","evaluate_challenge":"please evaluate the level of difficulty of the mission challenged.","very_easy":"very easy","easy":"easy","normal":"normal","difficult":"difficult","very_difficult":"very difficult","save_dismiss":"You didn't saved your changes. Are you sure want to continue?","entry_info":"About Entry","actual_size":"Actual Size","zoom_in":"Zoom In","zoom_out":"Zoom Out","cparty_jr_intro_1":"Hi! My name is Entry-Bot! Please help me get my backpack on my way to school.","cparty_jr_intro_2":"My backpack to my left! Let's go left.","cparty_jr_intro_3":"My backpack is located above. Please help me to get my backpack.","cparty_jr_intro_4":"Come on! Let's pick up the backpack by going downwards.","cparty_jr_intro_5":"Wow! My backpack is far away from me. Could you take me to my backpack?","cparty_jr_intro_6":"There is backpack! Let's pick it up!","cparty_jr_intro_7":"There are pencils along the way. Let's pick them up on our way to the backpack.","cparty_jr_intro_8":"A pencil on our way to school! Let's pick up the pencil on our way to the backpack.","cparty_jr_intro_9":"Oh, my backpack is far away. Let's find the fastest path to it!","cparty_jr_intro_10":"Let's pick up the pencils on my way to the backpack!","cparty_jr_intro_11":"We should go right exactly 5 times! Let's use the repeat block so we can get there more easily","cparty_jr_intro_12":"Let's pick up the backpack using the repeat block.","cparty_jr_intro_13":"I can't reach my backpack with this misplaced block. Please change the number of repeats.","cparty_jr_intro_14":"Please take me to my backpack using the repeat blocks.","cparty_jr_intro_15":"School is really far from here! But that's okay. If we use the repeat block, we can get to school easily.","make_new_project":"Create New Project","open_old_project":"Open Project","offline_download":"Entry Download","offline_release":"Download Entry Offline Editor!","offline_description_1":"Install and use Entry Offline Editor","offline_description_2":"without internet connection.","offline_description_3":"Download and try it out!","sw_week_2015":"2015 소프트웨어교육 체험 주간","cparty_desc":"두근두근 소프트웨어와의 첫만남","entry_offline_download":"엔트리 오프라인 \n다운로드","offline_desc_1":"Install and use Entry Offline Editor without internet connection.","offline_desc_2":"Download and try it out!","download":"download","version":"version","file_size":"size","update":"update","use_range":"Scope of use","offline_desc_free":"Entry Offline Editor is free for both individual and corporate use.","offline_required":"System Requirement","offline_required_detail":"Minimum 500mb disk space is required, Windows7 and above or, Mac OS 10.8 and above","offline_notice":"Side notes","offline_notice_1":"1. Version 1.3.2 does not support installation of all-in-one hardware connection program","offline_notice_2":"2. Web browser is not needed.","offline_notice_3":"Release note","cparty_jr_result_2":"Thank you! I had so much fun with you.<br> See you around!","cparty_jr_result_3":"Great! I've arrived school! But we can make it with fewer blocks.<br> How about we try again? ","cparty_jr_result_4":"","lms_no_class":"There is no class.","lms_create_class":"Please create a class.","lms_add_class":"Create class","lms_base_class":"Default","lms_delete_class":"Delete","lms_my_class":"My class","lms_grade_1":"elementary school 1","lms_grade_2":"elementary school 2","lms_grade_3":"elementary school 3","lms_grade_4":"elementary school 4","lms_grade_5":"elementary school 5","lms_grade_6":"elementary school 6","lms_grade_7":"middle school 1","lms_grade_8":"middle school 2","lms_grade_9":"middle school 3","lms_grade_10":"general","lms_add_groupId_personal":"Add classroom ID to your member profile.","lms_add_groupId":"Add Classroom ID","lms_add_group_account":"Add Classroom ID","lms_enter_group_info":"Enter classroom ID and password","lms_group_id":"Classroom ID","lms_group_pw":"Password","lms_group_name":"Class Name","personal_pwd_alert":"Enter correct password","personal_form_alert":"양식을 바르게 입력해 주세요","personal_form_alert_2":"모든 양식을 완성해 주세요","personal_no_pwd_alert":"Enter password","select_gender":"성별을 선택해 주세요","enter_group_id":"Enter classroom ID","enter_group_pwd":"Enter password","info_added":"추가되었습니다","no_group_id":"The Class ID does not exist","no_group_pwd":"비밀번호가 일치하지 않습니다","lms_please_choice":"선택해 주세요.","group_lesson":"나의 학급 강의","lms_banner_add_group":"Learning Management System is now available","lms_banner_entry_group":"Create Entry class ","lms_banner_desc_1":"Add your students","lms_banner_desc_2":"Manage your student's projects","lms_banner_desc_3":"and track their growth.","lms_banner_download_manual":"Manual Download","lms_banner_detail":"Try it out!","already_exist_email":"email already exists","remove_project":"Are you sure to remove this project?","study_lesson":"Class Lessons","open_project":"Open Project","make_group":"Create Class","project_share":"Project share","group_project_share":"Class Share","group_discuss":"Class Discuss","my_profile":"My page","search_updated":"Recent Project","search_recent":"Project with most views","search_complexity":"Project with most effort","search_staffPicked":"Staff pick project save area","search_childCnt":"Project with most copies","search_likeCnt":"Project with most likes","gnb_share":"Share","gnb_community":"Community","lms_add_lectures":"Add Lessons","lms_add_course":"Add Courseware","lms_add_homework":"Add Assignment","remove_lecture_confirm":"Are you sure you want to delete?","popup_delete":"Delete","remove_course_confirm":"Are you sure you want to delete?","lms_no_lecture_teacher_1":"There is no lessons.","lms_no_lecture_teacher_2":"Please create a lessons.","gnb_download":"Download","lms_no_lecture_student_1":"","lms_no_lecture_student_2":"There is no lessons.","lms_no_lecture_student_3":"","lms_no_class_teacher":"There is no class.","lms_no_course_teacher_1":"There is no courseware.","lms_no_course_teacher_2":"Please create a courseware.","lms_no_course_student_1":"","lms_no_course_student_2":"There is no courseware.","lms_no_course_student_3":"","lms_no_hw_teacher_1":"There is no assignment.","lms_no_hw_teacher_2":"Please create a assignment.","lms_no_hw_student_1":"","lms_no_hw_student_2":"There is no assignment.","lms_no_hw_student_3":"","modal_edit":"edit","modal_deadline":"Deadline","modal_hw_desc":"Description","desc_optional":"(optional)","modal_create_hw":"Create Assignment","vol":"Vol.","hw_title":"Title","hw_description":"Description","deadline":"Deadline","do_homework":"Do Assignment","hw_progress":"Progress","hw_submit":"submit","view_list":"Submitter","view_desc":"content","do_submit":"submit","popup_notice":"alert","no_selected_hw":"No Assignment is selected","hw_delete_confirm":"Are you sure you want to delete?","hw_submitter":"List of Assignment submissions","hw_student_desc_1":"* You may edit the project until 'Submit' button completes the submission process.","hw_student_desc_2":"* Once submission period is over, project cannot be submitted.","popup_create_class":"Create Class","class_name":"Class name","image":"Image","select_class_image":"Please select a class image.","type_class_description":"Class Introduction.","set_as_primary_group":"Set as default classroom","set_primary_group":"assign","not_primary_group":"not assigned","type_class_name":"Please enter the class name.","type_class_description_long":"Please enter the class introduction.","add_students":"Add students","invite_students":"Invite students","invite_with_class":"1. Invite with class code","invite_code_expiration":"Code expiration time","generate_code_button":"reissue code","generate_code_desc":"Student instructions for entering class code","generate_code_desc1":"Log in at play-entry.org","generate_code_desc2":"Select <my class> from the menu.","generate_code_desc3":"Click <Enter class code> then paste in the class code.","invite_with_url":"2. Invite using class URL","copy_invite_url":"Copy","download_as_pdf":"Download code as PDF file","download_as_excel":"Download code as Excel file","temp_password":"Temporary password","step_name":"Name","step_info":"Additional Information","preview":"Preview","type_name_enter":"To add student, type in the student name and hit enter. ","multiple_name_possible":"Adding multiple student names is possible.","id_auto_create":"Student number is automatically created if not edited","student_id_desc_1":"Class ID is created automatically without manual input","student_id_desc_2":"If student account already exists, add student information. When the student logs in,","student_id_desc_3":"class invitation is sent. No extra step for sharing account information is necessary.","student_number":"Student number","temp_password_desc_1":"After logging in with temporary password,","temp_password_desc_2":"guide the students to reset the password.","temp_password_desc_3":"*You cannot see temporary password once issued","student_delete_confirm":"Are you sure you want to delete?","no_student_selected":"No student is selected","class_assignment":"Class Assignments","class_list":"Class List","select_grade":"Please select the grade.","add_project":"sharing Project","no_project_display":"There is no project to display.","plz_display_project":"Please display a project.","refuse_confirm":"Are you sure you want to refuse?","select_class":"학급 선택","mon":"MON","tue":"TUE","wed":"WED","thu":"THU","fri":"FRI","sat":"SAT","sun":"SUN","jan":"Jan","feb":"Feb","mar":"Mar","apr":"Apr","may":"May","jun":"Jun","jul":"Jul","aug":"Aug","sep":"Sep","oct":"Oct","nov":"Nov","dec":"Dec","plz_select_lecture":"Please select a lessons.","plz_set_deadline":"Please set the deadline.","hide_entry":"Hide Entry","hide_others":"Hide Others","show_all":"Show All","lecture_description":"Lessons are listed by topics and levels. Follow along in step-by-step order.","curriculum_description":"Teacher created Entry learning space. See example projects and try creating them.","linebreak_off_desc_1":"글상자의 크기가 글자의 크기를 결정합니다.","linebreak_off_desc_2":"내용을 한 줄로만 작성할 수 있습니다.","linebreak_off_desc_3":"새로운 글자가 추가되면 글상자의 좌우 길이가 길어집니다.","linebreak_on_desc_1":"글상자의 크기가 글자가 쓰일 수 있는 영역을 결정합니다.","linebreak_on_desc_2":"내용 작성시 엔터키로 줄바꿈을 할 수 있습니다.","linebreak_on_desc_3":"내용을 작성하시거나 새로운 글자를 추가시 길이가 글상자의 가로 영역을 넘어서면 자동으로 줄이 바뀝니다.","entry_with":"Entry is Created With Teachers","ebs_season_1":"Visit Season 1","ebs_season_2":"Visit Season 2","partner":"Our Partners","project_term_popup_title":"Copyright policy","project_term_popup_description_1":"Please review the Entry ","project_term_popup_description_2":"copyright policy ","project_term_popup_description_3":"to allow public viewing ","project_term_popup_description_4":"of the project.","project_term_agree_1_1":"I agree to the release of my work itself and its source code.","project_term_agree_2_1":"I permit others to use it.","project_term_agree_2_2":"(includes copy, distribution, and transmission through airwaves)","project_term_agree_3_1":"I permit others to make modifications to it.","project_term_agree_3_2":"(includes remixes, modifications, and derivative works)","agree_all":"I agree to all conditions.","select_login":"Log in","select":"Please select","with_login":"Log in and","without_login":"Start Challenge","start_challenge":"Start Challenge","start_challenge_2":"without Logging in","if_not_save_not_login":"* Your progress will not be saved if not logged in.","if_not_member_yet":"If you aren't a member yet,","join_entry":"Join Entry","learned_computing":"Have you learned computing before?","cparty_index_description_1":"My first computing.","cparty_index_description_2":"Learn programming concepts and develop your thinking skills while playing Entry. ","cparty_index_description_3":"Challenge yourself to exciting mission stages and earn certificates.","cparty_index_description_4":"2015 Online Coding Party is part of","cparty_index_description_5":"Software Programming Experience Week","cparty_index_description_6":"prepared with","cparty_index_description_7":"Association of Teachers for Computing.","cparty_index_description_8":"","cparty_index_description_9":"2016 Online Coding Party is part of","congratulation":"Congratulation!","warm_up":"warm-up","beginner":"beginner","intermediate":"intermediate","advanced":"advanced","applied":"applied","cert_msg_tail":"track.","cert_msg_head":"You have successfully completed the","maze_text_content_1":" 명령어를 사용해서 나를 부품 상자까지 이동시켜줘!","maze_text_content_2":" 명령어를 사용해서 장애물을 뛰어넘어야해!","maze_text_content_3":"Nice! I see another part over there. The path is twisted but I can get there using the 'right();', 'left();' commands. ","maze_text_content_4":"I can move smoothly now. Take me to my parts using the commands we've learned so far.","maze_text_content_5":"Wow! Two parts! Let's collect them both so I can recover faster.","maze_text_content_6":"Last part! I'll recover fully with that last piece. You'll help me, right?","maze_text_content_7":"I'm feeling great! I can repeat tasks without stress now. Oh no! What is that robot in front of us? I think it needs help! Use 'for' command to get to the friend!","maze_text_content_8":"Excellent! I was able to rescue my robot friend thanks to you. I see another friend over there. Be careful. There are beehives to avoid. You can do it! Let's use the 'for' command to get to my friend.","maze_text_content_9":"Use 'while' instead of 'for' to repeat until we've accomplished our goal. Take me to my friend.","maze_text_content_10":"Now we have 'if' command. Use 'if' and 'while' to let me know which way to turn.","maze_text_content_11":"Great! Let's do this once more. Tell me when to turn left.","maze_text_content_12":"There are beehives scattered in the pathway. Tell me when to jump over.","maze_text_content_13":"So many friends need help! Let's go help them","maze_text_content_14":"More friends to rescue! Let's first try going around those square blocks and repeat to get to all of my friends.","maze_text_content_15":"I'm tired from moving so much. I've grouped the commands that are often used into 'functions'. Use functions to get me to my battery!","maze_text_content_16":"Excellent! Create functions and take me to my battery!","maze_text_content_17":"Great job! Let's create functions with 'jump()","maze_text_content_18":"The pathway is complex this time. But no worries! Just tell me when to use 'left()","maze_text_content_19":"The functions are already defined! However, it seems difficult to get to the battery using only the functions. Let's try mixing functions and commands to get to the battery.","maze_text_content_20":"You've done a fantastic job so far! After I retrieve that last battery, I will no longer need charging. Help me get to the battery using the functions so I can live free forever!","maze_content_1":"Hi, I'm Entrybot. I'm trying to escape from this factory but first, I have to fix myself. Will you help me fetch my parts? Assemble 'Move forward' block and press Start. ","maze_content_2":"Very good! I'm feeling much better! I see my part over there but I might get electrocuted if I don't be careful. Let's use 'jump over obstacle' block to get to the part.","maze_content_3":"Great! My part is right over there. The path is a bit twisted but I can get there using 'rotate' blocks. You'll help me, right?","maze_content_4":"Nice! I can almost move freely now. Let's get the part using 'rotate' and 'jump' blocks.","maze_content_5":"Wow! Two parts! Let's get them both so I can restore my health faster.","maze_content_6":"Thanks to you I'm feeling much better! I'm able to get better with those parts. You'll help me, right?","maze_content_7":"I'm feeling great! I can repeat the same task without trouble now. Oh! Do you see the robot over there? I think she might need help. Let's go help her out. Bring me to her by changing the number of 'repeat's","maze_content_8":"Excellent! I was able to rescue my pal! It looks like another one of my friends need help. Be careful there are beehives. Be sure to jump over the beehives! Can you do it? Help me reach her using the 'repeat' block. ","maze_content_9":"Instead of repeating a task for set number of times, I can repeat until I reach my robot pal instead! Help me save my friend!","maze_content_10":"Now we can use the 'if' block. Help me use the 'if' block to turn at right timing.","maze_content_11":"Let's try it again! Let me know when to turn left.","maze_content_12":"There are beehives all over the place. Tell me when to jump!","maze_content_13":"My friends need help! Let's go help them!","maze_content_14":"More friends need rescue! Let's first go around the small square and repeat it to rescue all my friends.","maze_content_15":"Now I can memorize blocks that are used repeatedly. Promise blocks are the ones that I was able to memorize. I'm a bit tired from moving so much. Help me refill my battery using the Promise feature!","maze_content_16":"Great! Tell me which blocks are used often and put them under the Promise block!","maze_content_17":"Nice! Use Promise blocks to help me get my battery. Make sure to insert 'Jump' blocks in the Promise block.","maze_content_18":"The path looks complex! We can get through this if we turn left and right at the right time.","maze_content_19":"The 'Promise' if already set for us! However, we can't use the Promise blocks as is. I'll need to use the Promise blocks at the right timing to get the battery.","maze_content_20":"Excellent! You've done great so far! After the final battery, I won't need to charge any more. So help me get the last battery using the Promise so I can live forever free!","ai_content_1":"Hi! I'm Entrybot. I just completed the space exploration mission and I need to return to Earth but it's not easy because of the asteroids. Could you help me return home? I have radars on top, front and back of the spaceship to detect how far an obstacle exists. It'll help you make smart decisions.","ai_content_2":"Thank you! I was able to avoid the asteroids without trouble. There are more asteroids this time. Let's try avoiding them!","ai_content_3":"Great! I was able to safely avoid the asteroids! There are more asteroids now! Don't worry though! I have the 'repeat' block. Place blocks in the 'repeat' block so we can get to the destination!","ai_content_4":"Excellent! It's so much more easier to avoid the asteroids using the repeat blocks! However, it's tiring driving the spaceship at all times! I can use the radar to sense what's coming. Help avoid the asteroids using the radar.","ai_content_5":"Nice! I'm so glad we've come this far. The radar will tell how far an object exists. Let's use the radar to avoid the asteroids! Move forward until we come close to an asteroid then avoid!","ai_content_6":"Great job! You're using radar to avoid tha asteroids. Use multiple radars to avoid the asteroids.","ai_content_7":"We're getting close to Earth! I want to go in a safer path if possible. It must be safer to move farther from the asteroids, right? Compare the distance to the obstacle using the radar on the top and bottom of the spaceship to move to a safer direction.","ai_content_8":"Excellent! We're safely cruising through space. Oh! What is that? That's looks like my special energy! Let's collect the special energy on our way!","ai_content_9":"Very good! We're almost there. The path is filled with asteroid. But don’t worry! We can get rid of the obstacles using the special item.","ai_content_10":"Good! I can see Earth! But now it's impossible to see the asteroids ahead! I'm not worried though. We can avoid the asteroids with more caution. Let's go home!","maze_hints_title_1":"How to start","maze_hints_content_1":"How do I move Entrybot?","maze_hints_detail_1":"1. Drag the block you want to use and place it under 'When Run'<br>2. Once finished, click 'Run'<br>3. I will follow the block instructions step by step, reading them from top to bottom","maze_hints_title_2":"Jumping over obstacles","maze_hints_content_2":"What do I do when I come across an obstacle?","maze_hints_detail_2":"On your pathway, you might come across obstacles.<br>Use 'jump over' block to jump over the obstacle. ","maze_hints_title_3":"Repeat block(1)","maze_hints_content_3":"How do I use repeat (3) times block?","maze_hints_detail_3":"If you want to repeat an action multiple times, use 'repeat ~times' block. <br>Place the blocks you want to repeat within the 'repeat ~times' block and input how many times to repeat.","maze_hints_title_4":"Repeat block(2)","maze_hints_content_4":"How do I use 'repeat until ~' block?","maze_hints_detail_4":"Use 'repeat until~do' block to set until when an action should be performed. <br>Place the blocks you want to repeat within 'repeat until~' block.<br>Then once met with {image}, repeat will stop.","maze_hints_title_5":"If block","maze_hints_content_5":"How do I use 'if~' block?","maze_hints_detail_5":"Using 'If {image}' block, you can designate what action should follow when met with {image}.<br>Blocks within the 'If {image}' will only execute when met with {image}.","maze_hints_title_6":"Repeat block(3)","maze_hints_content_6":"How does 'Until met with all ~' block work?","maze_hints_detail_6":"Repeat blocks within 'Until met with all ~' block until met with all {tile}.<br> Once met with all {tile} repeat will stop.","maze_hints_title_7":"Special Hint","maze_hints_content_7":"It's too difficult. Help!","maze_hints_detail_7":"Look at the path that I should travel. See the 4 small squares?<br>First create blocks that will take me around the square and repeat.","maze_hints_title_8":"Function","maze_hints_content_8":"What is 'Functions/ Call Functions'? How do I use them?","maze_hints_detail_8":"Put the most often used sets of blocks under 'Function'. <br>Once you create functions, use 'Call Function' to use it as often as needed.","ai_hints_title_1_1":"Goal of the game","ai_hints_content_1_1":"Avoid asteroids and help me get to Earth","ai_hints_detail_1_1":"Avoid asteroids and help me get to Earth","ai_hints_title_1_2":"Instructions","ai_hints_content_1_2":"How do I begin?","ai_hints_detail_1_2":"1. Drag out blocks from the block box and connect is with the 'when run' block<br>2. Once finished assembling blocks, click 'Run'<br>3. I'll move according to your block instructions.","ai_hints_title_1_3":"To move","ai_hints_content_1_3":"How do I move the entrybot?","ai_hints_detail_1_3":"I can move up, forward or below.<br>When creating instructions, make sure I avoid the asteroids.<br>If you send me out of the screen, I can be lost in space forever! So be careful.","ai_hints_title_2_1":"Goal of the game","ai_hints_content_2_1":"Use repeat blocks to avoid the asteroids.","ai_hints_detail_2_1":"Use repeat blocks to avoid the asteroids.","ai_hints_title_2_2":"Repeat block","ai_hints_content_2_2":"What is a repeat block?","ai_hints_detail_2_2":"Geez! It's a long way home so putting blocks together one by one is too tiresome. Let's try using the repeat block.<br>Once you group the blocks under the repeat block, you can shorten the length of the blocks!","ai_hints_content_3_1":"Help me avoid the asteroids using the 'if' block","ai_hints_title_3_2":"if block(1)","ai_hints_content_3_2":"How does 'if ~' block work? ","ai_hints_detail_3_2":"Using 'if~ in front/ else' block can help me check if there are asteroids in front of me and help me avoid them.<br>If there's an asteroid in front of me, then blocks under 'if' will execute or if there isn't an asteroid, the blocks under 'else' will execute.<br>Tell me which way to go depending on whether there's an asteroid to avoid or not.","ai_hints_content_4_1":"Learn to use the radar to avoid the asteroids.","ai_hints_detail_4_1":"Learn to use the radar to avoid the asteroids.","ai_hints_title_4_2":"radar(1)","ai_hints_content_4_2":"What is a radar and how can I use it?","ai_hints_detail_4_2":"Radar tells me how far an object exists from where I am located. <br>If there is an object in front of me, the front radar will show '1'.<br>Also, radar can become a powerful tool when used with 'if &lt;true&gt;/else' block.<br>For example, when the distance to an object in front of me shows value greater than 1, then I am able to move forward safely.<br> However, if not, then I can go above or under to avoid it.","ai_hints_title_4_3":"if block(2)","ai_hints_content_4_3":"How do I use 'if <true>' block?","ai_hints_detail_4_3":"if &lt;true&gt; block/ else' block executes blocks under 'if' when condition is met and executes blocks under 'else' when condition is not met.<br>Think about how you want to move at different situations and create a condition within &lt;true&gt; block.<br>Remember that when condition is met and blocks under 'if' are executed, then the blocks under 'else' will be ignored.","ai_hints_content_5_1":"Use the radar to help me avoid the asteroids.","ai_hints_detail_5_1":"Use the radar to help me avoid the asteroids.","ai_hints_title_5_2":"if block(3)","ai_hints_content_5_2":"How does nested if blocks work?","ai_hints_detail_5_2":"I can nest 'if ~/else' block within 'if ~/else' block. This will help me make smart decisions in various situations.<br>For example, I can act according to whether an asteroid is in my path or not, then when I'm met with and asteroid, I can decide whether to go under or above.","ai_hints_title_6_1":"Radar(2)","ai_hints_content_6_1":"How do I compare the values given by radar above and radar below?","ai_hints_detail_6_1":"([above]radar) block shows distance to an object above.<br>You can use this block to check which asteroid above or below exist further away.<br>When deciding which way to avoid the asteroid, it'll be a smarter move to go in the direction where the asteroid is further away.","ai_hints_content_7_1":"Use the item to avoid the asteroids.","ai_hints_detail_7_1":"Use the item to avoid the asteroids.","ai_hints_title_7_2":"Checking object name","ai_hints_content_7_2":"What can I do by checking the object name in front of me?","ai_hints_detail_7_2":"To gain a special item, you need to check where the item is located.<br>Use 'object [above] is [item]' block.<br>By using this block, you can figure out where the item is located and move towards it.","ai_hints_content_8_1":"Use the item to help me avoid the asteroids.","ai_hints_detail_8_1":"Use the item to help me avoid the asteroids.","ai_hints_title_8_2":"Item","ai_hints_content_8_2":"How do I gain special item and use it?","ai_hints_detail_8_2":"Even though you succeed in avoiding the asteroids, when the pathway is lined with asteroids, there is no way to avoid them. In this case, use the 'use item' block.<br>It will get rid of all blocks in front.<br>However, you can only use this block when you've gained the item by passing through the item.","ai_hints_content_9_1":"Use all your skills and knowledge to go as far as you can.","ai_hints_detail_9_1":"Use all your skills and knowledge to go as far as you can.","ai_hints_title_9_2":"and","ai_hints_content_9_2":"How do I use the 'and' block?","ai_hints_detail_9_2":"and' block can fit in many conditions. When all conditions in the 'and' block is met, then the blocks will be executed. If one of them is false, the whole 'and' statement will be false and the blocks will not be executed.","maze_text_goal_1":"Use move();  command to move me to the part box!","maze_text_goal_2":"Use jump();  command to avoid obstacles.","maze_text_goal_3":"Use left();right(); command to take me to my parts.","maze_text_goal_4":"Use various commands to take me to my parts.","maze_text_goal_5":"Move me so I can collect both of my part boxes.","maze_text_goal_6":"Move me so I can collect both of my part boxes.","maze_text_goal_7":"Use for command to take me to my friend!","maze_text_goal_8":"Use for command and avoid obstacles to take me to my friend!","maze_text_goal_9":"Use while command to take me to my friend.","maze_text_goal_10":"Use if and while commands to take me to all my friends.","maze_text_goal_11":"Use if and while commands to take me to all my friends.","maze_text_goal_12":"Use if and while commands to take me to all my friends.","maze_text_goal_13":"Call function to take me to my battery","maze_text_goal_14":"Call function to take me to my battery","maze_text_goal_15":"Insert commands within function. Then call the function to take me to my battery","maze_text_goal_16":"Insert commands under a function. Then call the function to move me to the battery!","maze_text_goal_17":"Insert commands under a function. Then call the function to move me to the battery!","maze_text_goal_18":"Insert commands under a function. Then call the function to move me to the battery!","maze_text_goal_19":"Insert commands under a function. Then call the function to move me to the battery!","maze_text_goal_20":"Call the function and mix it with other commands and take me to my battery.","above_radar":"above radar","bottom_radar":"bottom radar","front_radar":"front radar","above_object":"object above","front_object":"object in front","object_below":"object below","destination":"destination","asteroids":"asteroids","item":"item","wall":"wall","buy_now":"Buy now","goals":"Goal","instructions":"Instructions","object_info":"Object info","entry_basic_mission":"Entry basic mission","entry_application_mission":"Entry application mission","maze_move_forward":"move one forward","maze_when_run":"when Run","maze_turn_left":"turn left","maze_turn_right":"turn right","maze_repeat_times_1":"repeat","maze_repeat_times_2":"times","maze_repeat_until_1":"repeat until","maze_repeat_until_2":"","maze_call_function":"call function","maze_function":"function","maze_repeat_until_all_1":"repeat until all of","maze_repeat_until_all_2":"","command_guide":"Command guide","ai_success_msg_1":"Thanks to you I've safely arrived home!","ai_success_msg_2":"Phew! I was able to travel ","ai_success_msg_3":"distance  enough to send a rescue signal to Earth! The rescue crew is on its way! Thank you!","ai_success_msg_4":"Great! You succeeded using ","ai_cause_msg_1":"Oh no. Tell me which way to go.","ai_cause_msg_2":"Yikes! That was close! Let's try again.","ai_cause_msg_3":"Yikes! I might get lost in space if I go off the path. Let's try again.","ai_cause_msg_4":"It's too complicated. Try this block to move.","ai_move_forward":"move forward","ai_move_above":"go above","ai_move_under":"go under","ai_repeat_until_dest":"repeat until destination","ai_if_front_1":"if","ai_if_front_2":"in front","ai_else":"else","ai_if_1":"if","ai_if_2":"","ai_use_item":"use item","ai_radar":"radar","ai_above":"above","ai_front":"front","ai_under":"under","ai_object_is_1":"is","ai_object_is_2":"object","challengeMission":"back","withTeacher":"Advisory teachers","host":"Host","support":"Support","subjectivity":"Subjectivity","learnMore":"Learn more ","ai_object_is_3":"?","stage_is_not_available":"The stage isn't available yet. Please enter the stages in the given order.","progress_not_saved":"Your progress will not be saved.","want_refresh":"Do you still want to refresh the page?","monthly_entry_grade":"Elementary 3rd - Middle school 3rd grade","monthly_entry_contents":"Learn to program with Monthly Entry. This monthly digest provides project tutorials, tips and tricks and fun comics. ","monthly_entry_etc1":"*The Monthly Entry project templates are provided in the main page's recommended course","monthly_entry_etc2":"* Monthly Entry is published during school semesters only","group_make_lecture_1":"There are no lessons to show.","group_make_lecture_2":" Create lessons for your class from ","group_make_lecture_3":"'Create > Create lessons'","group_make_lecture_4":"Create a lessons","group_add_lecture_1":"Favorite Lesson does not exist.","group_add_lecture_2":"'학습하기>오픈 강의> 강의'에서 우리반 학습내용에","group_add_lecture_3":"추가하고 싶은 강의를 관심강의로 등록해 주세요.","group_add_lecture_4":"See Lesson","group_make_course_1":"My courseware is not exist.","group_make_course_2":"Create courseware for your class from","group_make_course_3":"'Create > Create lessons > Create Courseware'","group_make_course_4":"Create courseware","group_add_course_1":"Favorite Courseware does not exist.","group_add_course_2":"Favorite lessons you want to add as course assignment from","group_add_course_3":"'Learn > Open Lessons > Courseware","group_add_course_4":"Browse courseware","hw_main_title":"프로그램 다운로드","hw_desc_wrapper_1":"엔트리 하드웨어 연결 프로그램과 오프라인 버전이","hw_desc_wrapper_2":"서비스를 한층 더 강화해 업그레이드 되었습니다.","hw_desc_wrapper_3":"업데이트 된 프로그램을 설치해주세요!","hw_downolad_link":"하드웨어 연결 \n프로그램 다운로드"};Lang.Msgs={"invalid_url":"Video URL is invalid.","auth_only":"Authenticated users only","runtime_error":"Runtime Error","to_be_continue":"Still not working","warn":"Warning","error_occured":"Oops, something went wrong. Why don't you try again? If you see this more than once, please let us know by Proposal board!","list_can_not_space":"List's name can't be space","sign_can_not_space":"Sign's name can't be space","variable_can_not_space":"Variable's name can't be space","training_top_title":"Programs","training_top_desc":"Introducing Professional Development Programs","training_main_title01":"Instructors for your Professional Development Seminar","training_target01":"For l Teachers","training_sub_title01":"“Give a Boost to your Classroom”","training_desc01":"Are you looking for instructors to train your teachers?\nWe will match you with excellent instructors with knowledge and experience.","training_etc_ment01":"* Seminar are hosted and paid for by the requesting schools","training_main_title02":"Teacher Development Program for Lead Schools","training_target02":"For l Lead and Research Schools","training_sub_title02":"“Go, Share, and Connect”","training_desc02":"We randomly select schools from the Lead and Research schools and provide Development Seminars for free.\nSeminars are taught by Go-to-Teacher Program teachers.","training_etc_ment02":"* Coming Soon","training_main_title03":"Experienced Instructors for Parent and Student seminars","training_target03":"For l Parents, Students","training_sub_title03":"“Time to Explore Software Education”","training_desc03":"Need instructors to introduce coding to parents and students?\nWe will match you with our instructors with knowledge and experience. ","training_etc_ment03":"* Seminar are hosted and paid for by the requesting schools","training_apply":"Apply","training_ready":"Ready"};Lang.Users={"auth_failed":"Authentication failed","birth_year":"Birth Year","birth_year_before_1990":"Before 1990s","edit_personal":"Edit Personal","email":"Email","email_desc":"Enter your Email address to receive newsletters","email_inuse":"E-mail address is already in-use","email_match":"Please enter a valid email","forgot_password":"Forgot your password?","job":"Job","language":"Language","name":"Full Name","name_desc":"Enter your name","name_not_empty":"You must enter your name","password":"Password","password_desc":"","password_invalid":"Invalid Password","password_long":"Password must be between 4-20 characters long","password_required":"Password can not be blank","project_list":"Project List","regist":"Signup Complete","rememberme":"Remember me","repeat_password":"Repeat Password","repeat_password_desc":"Repeat Password","repeat_password_not_match":"Passwords do not match","sex":"Sex","signup_required_for_save":"Signin required for saving a project.","username":"Username","username_desc":"Enter your unique name for signin","username_inuse":"Username already taken","username_long":"Username must be between 4-20 characters long","username_unknown":"Unknown user"};Lang.Workspace={"new_project":"New Project","add_object":"Add objects","all":"All","animal":"Animal","arduino_entry":"Program for connect to Arduino","arduino_program":"Arduino program","arduino_sample":"Sample code for Arduino","arduino_driver":"Driver for arduino","cannot_add_object":"Cannot add objects while running a project.","cannot_add_picture":"Cannot add picture while running a project.","cannot_add_sound":"Cannot add sound while running a project.","cannot_edit_click_to_stop":"Can not modify a project.\nClick to stop","cannot_open_private_project":"Can not load private project. Move to home.","cannot_save_running_project":"Can not save while running a project.","character_gen":"Make an avarta","check_runtime_error":"Please check the block marked with red.","context_download":"Download to PC","context_duplicate":"Duplicate","context_remove":"Remove","context_rename":"Rename","coordinate":"Coord","create_function":"Create Function","direction":"Direction","drawing":"Paint","enter_list_name":"","enter_name":"Enter a new name","enter_new_message":"Enter new message name.","enter_variable_name":"Enter the new variable name (less than 10)","family":"Family","fantasy":"Fantasy/etc","file_new":"New Project","file_open":"Open project","file_upload":"Upload my project","file_upload_login_check_msg":"For the uploading your project you have to sign in","file_save":"Save","file_save_as":"Save as clone","file_save_download":"Download project","func":"function","function_create":"Add function","function_add":"Add function","interface":"Interface","landscape":"Landscape","list":"List","list_add_calcel":"","list_add_calcel_msg":"","list_add_fail":"","list_add_fail_msg1":"","list_add_fail_msg2":"","list_add_ok":"","list_add_ok_msg":"","list_create":"Add list","list_dup":"","list_newname":"New name","list_remove":"Remove list","list_rename":"Rename list","list_rename_failed":"","list_rename_ok":"","list_too_long":"","message":"Signal","message_add_cancel":"Canceled","message_add_cancel_msg":"Add a message was canceled.","message_add_fail":"Failed","message_add_fail_msg":"Message name conflicted.","message_add_ok":"Message added","message_add_ok_msg":"was successfully added.","message_create":"Add Signal","message_dup":"Message name conflicted.","message_remove":"Remove a message","message_remove_canceled":"Remove a message was canceled","message_rename":"Rename a message","message_rename_failed":"Rename message failed","message_rename_ok":"Successfully rename message.","message_too_long":"Message name too long.","no_message_to_remove":"There is no message to remove.","no_use":"No use","no_variable_to_remove":"","no_variable_to_rename":"There is no varibale to remove","object_not_found":"No object is specified in the block.","object_not_found_for_paste":"붙여넣기 할 오브젝트가 없습니다.","people":"People","picture_add":"Add Shape","plant":"Plant","project":"Project","project_copied":"Copy","PROJECTDEFAULTNAME":['Cool','Funny','Nice','Huge','Great','Handsome','Lucky'],"remove_object":"Remove Object","remove_object_msg":"remove was successfully completed.","removed_msg":"was successfully removed","rotate_method":"Rotate","rotation":"Rotation","run":"Run","saved":"Saved","saved_msg":"was successfully saved.","save_failed":"Problem occurred while saving a project. Please try again.","select_library":"Select Library","select_sprite":"Please select at least one sprite to apply.","shape_remove_fail":"Remove a shape was failed.","shape_remove_fail_msg":"At least one or more shapes required.","shape_remove_ok":"Shape Removed","shape_remove_ok_msg":"was removed.","sound_add":"Add Sound","sound_remove_fail":"Remove a sound was failed.","sound_remove_ok":"Sound Removed","sound_remove_ok_msg":"was removed.","stop":"Stop","pause":"Pause","restart":"Restart","speed":"Speed","tab_attribute":"Attribute","tab_code":"Block","tab_picture":"Shape","tab_sound":"Sound","tab_text":"TextBox","textbox":"Textbox","textbox_edit":"Edit Textbox","textbox_input":"Please input text for apply.","things":"Things","upload":"Upload files","upload_addfile":"Add a file","variable":"Variable","variable_add_calcel":"Canceled","variable_add_calcel_msg":"Add a variable was canceled.","variable_add_fail":"Failed","variable_add_fail_msg1":"Variable name conflicted.","variable_add_fail_msg2":"Variable name is not proper.","variable_add_ok":"Variable added","variable_add_ok_msg":"was successfully added.","variable_create":"Add variable","variable_add":"Add variable","variable_dup":"Variable name was already exists.","variable_newname":"New Name","variable_remove":"Remove variable","variable_remove_canceled":"Remove a variable was canceled","variable_rename":"Rename variable name","variable_rename_failed":"Failed","variable_rename_msg":"'Rename variable was successfully completed.'","variable_rename_ok":"Rename variabled was successfully completed.","variable_select":"Select a variable","variable_too_long":"Variable name too long.","vehicle":"Vehicles","add_object_alert_msg":"Add object firstly","add_object_alert":"Alert","create_variable_block":"Create variable","create_list_block":"Create list","Variable_Timer":"timer","Variable_placeholder_name":"variable name","Variable_use_all_objects":"Use for all objects","Variable_use_this_object":"Use for this object","Variable_used_at_all_objects":"variable used at all objects","Variable_create_cloud":"\n","Variable_used_at_special_object":"variable used at special object","draw_new":"Draw new","painter_file":"File ▼","painter_file_save":"Save","painter_file_saveas":"Save as a new picture","painter_edit":"Edit ▼","get_file":"get","copy_file":"copy","cut_picture":"cut","paste_picture":"paste","remove_all":"remove all","new_picture":"New Picture","picture_size":"size","picture_rotation":"rotation","thickness":"thickness","textStyle":"text","add_picture":"Add Shape","select_picture":"Select Library","select_sound":"Select sound","Size":"Size","show_variable":" show variable","default_value":"default value","slide":"slide","min_value":"min value","max_value":"max value","number_of_list":"number of list items","use_all_objects":"Use for all objects","list_name":"List name","list_used_specific_objects":"List used for specific object","List_used_all_objects":"List used for all objects","Scene_delete_error":"The scene is, there should be at least one.","Scene_add_error":"The scene is up to 10.","replica_of_object":"'s replicas","will_you_delete_scene":"Deleting scene can not be restored.\nAre you sure you want to delete scene?","duplicate_scene":"duplicate","block_explain":"Block description ","block_intro":"Clicking on the block comes the description of the block . ","blocks_reference":"Blocks Reference","hardware_guide":"Hardware Guide","show_list_workspace":"Show list","List_create_cloud":"Use for shared list <br>(Stored in Server)","confirm_quit":"You didn't saved your changes.","confirm_load_temporary":"You have unsaved project. Do you want to open it?","login_to_save":"Try to save after login.","cannot_save_in_edit_func":"Can not save while editing function.","new_object":"New Object","arduino_connect":"","arduino_connect_success":"","confirm_load_header":"Project Recovery","uploading_msg":"Uploading","upload_fail_msg":"Upload failed. Please try again.","file_converting_msg":"​File converting in process","file_converting_fail_msg":"​File conversion has failed","fail_contact_msg":"If the problem persists,</br>contact contact_entry@entrylabs.org","saving_msg":"Saving","saving_fail_msg":"Save failed. Please try again.","loading_msg":"Loading","loading_fail_msg":"Load failed. Please try again.","restore_project_msg":"Project is not saved properly. Would you like to restore this project?","quit_stop_msg":"Program cannot be closed during save.","ent_drag_and_drop":"Drag and drop the file to upload","not_supported_file_msg":"This file format is not supported","broken_file_msg":"File is corrupt or wrong file is loaded","check_audio_msg":"Only MP3 or WAV files are uploadable","check_entry_file_msg":"Only ENT files are loadable","hardware_version_alert_text":"Please update your hardware connector to the latest version.","variable_name_auto_edited_title":"variable name auto-edited","variable_name_auto_edited_content":"variable name cannot exceed 10 characters","list_name_auto_edited_title":"list name auto-edited","list_name_auto_edited_content":"list name cannot exceed 10 characters"};Lang.code="view code";Lang.EntryStatic={"group":"open group","private":"only owner","public":"open lessons","lecture_is_open_true":"open","lecture_is_open_false":"closed","category_all":"All Categories","category_game":"Game","category_animation":"Animation","category_media_art":"Media Art","category_physical":"Physical","category_etc":"etc","category_category_game":"Game","category_category_animation":"Animation","category_category_media_art":"Media Art","category_category_physical":"Physical","category_category_etc":"etc","sort_created":"By Latest","sort_viewer":"By Viewers","sort_like":"By Likes","sort_comment":"By Comments","period_all":"Entire period","period_1":"Today","period_7":"Latest 1 week","period_30":"Latest 1 month","period_90":"Latest 3 months","lecture_required_time_1":"Less than 15 min.","lecture_required_time_2":"15  to 30 min.","lecture_required_time_3":"30 to 45 min.","lecture_required_time_4":"45 to 60 min","lecture_required_time_5":"over 1 hour","usage_event":"Event","usage_signal":"Sign","usage_scene":"Scene","usage_repeat":"Repeat","usage_condition_repeat":"Condition repeat","usage_condition":"Repeat","usage_clone":"Cloned Object","usage_rotation":"Rotation","usage_coordinate":"Coordination move","usage_arrow_move":"Arrow move","usage_shape":"Shape","usage_speak":"Speak","usage_picture_effect":"Effect","usage_textBox":"Textbox","usage_draw":"Draw","usage_sound":"Sound","usage_confirm":"Confirm","usage_comp_operation":"Compare operation","usage_logical_operation":"Logical operation","usage_math_operation":"Math operation","usage_random":"Random","usage_timer":"Timer","usage_variable":"variable","usage_list":"List","usage_ask_answer":"Ask and answer","usage_function":"Function","usage_arduino":"Arduino","concept_resource_analytics":"Procedual Thinking","concept_procedual":"Abstractive Thinking","concept_abstractive":"Korean","concept_individual":"English","concept_automation":"Automation","concept_simulation":"Simulation","concept_parallel":"Parallel","subject_korean":"Korean","subject_english":"English","subject_mathmatics":"Mathmatics","subject_social":"Social","subject_science":"Science","subject_music":"Music","subject_paint":"Paint","subject_athletic":"Athletics","subject_courtesy":"Courtesy","subject_progmatic":"Progmatic","lecture_grade_1":"1 th","lecture_grade_2":"2 th","lecture_grade_3":"3 th","lecture_grade_4":"4 th","lecture_grade_5":"5 th","lecture_grade_6":"6 th","lecture_grade_7":"7 th","lecture_grade_8":"8 th","lecture_grade_9":"9 th","lecture_grade_10":"Graduated","lecture_level_1":"Low","lecture_level_2":"Middle","lecture_level_3":"High","listEnable":"list","functionEnable":"function","messageEnable":"message","objectEditable":"object","pictureeditable":"shape","sceneEditable":"scene","soundeditable":"sound","variableEnable":"variable","e_1":"elementary school 1","e_2":"elementary school 2","e_3":"elementary school 3","e_4":"elementary school 4","e_5":"elementary school 5","e_6":"elementary school 6","m_1":"middle school 1","m_2":"middle school 2","m_3":"middle school 3","general":"general","curriculum_is_open_true":"open","curriculum_open_false":"closed","notice":"Notice","qna":"Q&A","tips":"Tips & Tricks","free":"Discussions","report":"Suggestions","art_category_all":"All projects","art_category_game":"Game","art_category_animation":"Animation","art_category_physical":"Physical","art_category_etc":"etc","art_category_media":"media art","art_sort_updated":"Most Recent","art_sort_visit":"Views","art_sort_likeCnt":"Likes","art_sort_comment":"Comments","art_period_all":"All","art_period_day":"Today","art_period_week":"Recent week","art_period_month":"Recent month","art_period_three_month":"Recent three month","level_high":"Row","level_mid":"Middle","level_row":"High","discuss_sort_created":"Most Recent","discuss_sort_visit":"Views","discuss_sort_likesLength":"Likes","discuss_sort_commentsLength":"Comments","discuss_period_all":"All","discuss_period_day":"Today","discuss_period_week":"Recent week","discuss_period_month":"Recent month","discuss_period_three_month":"Recent three month"};Lang.Helper={"when_run_button_click":"When thew Start button is clicked, the connected block blow will run.","when_some_key_pressed":"When an assigned key is pressed, the connected blocks below will run.","mouse_clicked":"When mouse is clicked, the connected blocks below will run.","mouse_click_cancled":"When mouse is released, the connected blocks below will run.","when_object_click":"When a relevant object is clicked, the connected blocks below will run.","when_object_click_canceled":"When the object click is released, the connect blocks below will run.","when_message_cast":"When a relevant sign is received, the connected blocks below will run.","message_cast":"Sends signal selected from list.","message_cast_wait":"Send signal selected from list, and wait for the blocks the finish running.","when_scene_start":"When the scene starts, the connected blocks blow will run.","start_scene":"Starts selected scene.","start_neighbor_scene":"Starts the previous or following scene.","wait_second":"Runs the next block after waiting for the set a mount of time.","repeat_basic":"Repeats the blocks inside for set number of times.","repeat_inf":"Repeats thi blocks inside for an unlimited number of times.","repeat_while_true":"Repeats the blocks until the set condition is met.","stop_repeat":"Stops repeat of the closest wrapping block.","_if":"if condition is true, runs blocks inside.","if_else":"if condition is true, runs blocks in the 'if' portion. If not, runs the blocks inside 'else' portion.","restart_project":"Restart all objects","stop_object":"All objects : Stops all objects <br> This block : Stop all blocks in this object. <br> This object: Stops all blocks in this object. <br?> This Object's other blocs : Stops blocks not connected to this object's blocks.","wait_until_true":"Stops running and waits until the value of the condition is true.","when_clone_start":"When a new clone of the object is created, the connected blocks below will run.","create_clone":"Creates a clone of the object.","delete_clone":"Deletes the objects.","remove_all_clones":"Deletes all copies of the object.","move_direction":"Moves in the direction of the arrow by set value.","move_x":"Changes the x-position by the value regardless of the direction of the object.","move_y":"Changes the y-position by the value regardless of the direction of the object.","move_xy_time":"Changes the x- and y-position by the value regardless of the direction of the object.","locate_object_time":"Moves the object to the mouse pointer position or to the position of another object over the input amount of time. ","locate_x":"Moves the object to the input x-position value.","locate_y":"Moves the object to the input y-position value.","locate_xy":"Moves the object to the input x- and y-position values.","locate_xy_time":"Moves the object to the determined x- and y-position values over the input amount of time.","locate":"Moves the object to the position of the mouse pointer or to the position of another object.","rotate_absolute":"Sets the rotation of the object by the input number of degrees.","rotate_by_time":"Rotates the object by the input number of degrees over the input amount of time.","rotate_relative":"Rotates the object by the input number of degrees.","direction_absolute":"Sets the direction of the object by the input number of degrees.","direction_relative":"Changes the direction of the object by the input number of degrees.","move_to_angle":"Moves the object by the input value in the direction of the input number of degrees.","see_angle_object":"Makes the object face another object or the mouse pointer.","bounce_wall":"When object touches the edge of the screen, it bounces back.","show":"Makes the object show on the screen.","hide":"Hides the object from the screen.","dialog_time":"Runs the next block after the input content is spoken by the object for the input amount of time.","dialog":"Runs next block while the input contents is spoken by the object.","remove_dialog":"Deletes the dialog box created (using dialog block) by the object.","change_to_some_shape":"Changes the object into the selected shape.","change_to_next_shape":"Changes the object into the next shape.","set_effect_volume":"Applies the selected effect to the object by the input value.","set_effect_amount":"Applies the selected effect to the object by the input value.","set_effect":"Sets the selected effect to the object by the input value.","set_entity_effect":"Sets the selected effect to the object by the input value.","add_effect_amount":"Applies the selected effect to the object by the input value.","change_effect_amount":"Sets the selected effect to the object by the input value.","change_scale_percent":"Changes the size of the object by the input value.","set_scale_percent":"Sets the size of the object to the input value.","change_scale_size":"Changes the size of the object by the input value.","set_scale_size":"Sets the size of the object to the input value.","flip_x":"Flips the object vertically.","flip_y":"Flips the object horizontally.","change_object_index":"Bring to front : Bring object to front. <br> Bring one front : Bring object one layer front. <br> Send one back : Send object one layer back. <br> Send to back : Send object back.","set_object_order":"Shows the object in the set order.","brush_stamp":"Clones the object on stage like a stamp.","start_drawing":"Paints brush along the path of the object.","stop_drawing":"Stops object’s painting.","set_color":"Sets object’s color of the brush to the selected color.","set_random_color":"Sets object’s color of the brush to random.","change_thickness":"Changes object’s brush thickness to the input value.","set_thickness":"Sets object’s brush thickness to the input value.","change_opacity":"Changes object’s brush transparency to the input value.","change_brush_transparency":"Changes object’s brush transparency to the input value.","set_opacity":"Sets object’s brush transparency to the input value.","set_brush_tranparency":"Sets object’s brush transparency to the input value.","brush_erase_all":"Deletes object’s all brush paint and stamps.","sound_something_with_block":"Plays object’s select sound while next block runs.","sound_something_second_with_block":"Plays object’s select sound for input amount of time while next block runs.","sound_something_wait_with_block":"Plays object’s select sound then runs next blocks once sound has finished playing.","sound_something_second_wait_with_block":"Plays object’s select sound for input amount of time then runs next blocks.","sound_volume_change":"Changes the volume of all sounds played in the project by the input percentage.","sound_volume_set":"Sets the volume of all sounds played in the project to the input percentage.","sound_silent_all":"Stops all sounds currently playing.","is_clicked":"Checks whether mouse is clicked.","is_press_some_key":"Checks whether an assigned key is pressed.","reach_something":"Checks whether the object reaches the selected point.","is_included_in_list":"Checks whether select list contains the input value.","boolean_basic_operator":"=: Checks whether the value on the left is greater than the value on the right. <br>> : Checks whether the value on the left is greater than the value on the right.<br>< : Checks whether the value on the left is less than the value on the right.<br>≥ : Checks whether the value on the left is the same as or greater than the value on the right.<br>≤ : Checks whether the value on the left is the same as or less than the value on the right.","function_create":"Define a function by placing frequently used sets of blocks under this block. Place [name] next to [Define function] to give function a name. Pass on number of text values by placing [numeric/text value] block. Pass on boolean value of true or false by placing the [boolean value] block.","function_field_label":"Place next to [Define function] to give function a name.","function_field_string":"Pass on numeric/text value by placing this block next to [Define function] block.  Grab/copy the [numeric/text value] block in the [Define function] block and use its value in function.","function_field_boolean":"Use this block to pass on boolean value of true or false. Grab/copy the [boolean value] block in the [Define function] block and use its value in function.","function_general":"This is current function block or function blocks created so far.","boolean_and":"Checks whether both conditions are true.","boolean_or":"Checks whether at least one of the two conditions is true.","boolean_not":"Changes the input condition to its opposite.","calc_basic":"+ : Adds two numbers.<br>- : Subtracts two numbers.<br>X : Multiplies two numbers.<br>/ : Divides two numbers.","calc_rand":"Selects a random value between the two input numbers.","get_x_coordinate":"Reports the x-position value of the object.","get_y_coordinate":"Reports the y-position value of the object.","coordinate_mouse":"Reports either the x- or y-position value of the mouse.","coordinate_object":"Reports the x/y-position of the object and various information (direction, shape name, etc.).","quotient_and_mod":"quotient: The answer after you divide the first number by the second number. <br> remainder: The amount left over after division.","get_rotation_direction":"Reports the object’s value of direction and value of movement.","calc_share":"Reports the quotient occurring from first number divided by the second number. ","calc_mod":"Reports the remainder occurring from the first number divided by the second number.","calc_operation":"Reports calculated values of a variety of equations relating to input numbers.","get_date":"Reports values regarding the current year, month, day, and time.","distance_something":"Reports the distance between the object and the selected object.","get_sound_duration":"Reports the time length of the selected sound.","get_project_timer_value":"Reports how many seconds have passed since the project started.","choose_project_timer_action":"Start: Start timer. <br> Stop: Stop timer. <br> Reset: Reset timer to 0. (When this block is in workspace, the program will show timer window when run.)  ","reset_project_timer":"Resets the timer to 0.","set_visible_project_timer":"Shows or hides the timer.","ask_and_wait":"The object asks the inputted text, and then receives an answer as a response.","get_canvas_input_value":"Reports the contents inputted taken place after the object asked.","set_visible_answer":"Hide or show ‘response window’.","combine_something":"Combines two input texts.","get_variable":"Reports the value of the select variable.","change_variable":"Adds the input value to the selected variable.","set_variable":"Sets the value of the selected variable to the input value.","robotis_carCont_sensor_value":"왼쪽 접속 센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>오른쪽 접촉 센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>선택 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.<br/>최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>왼쪽 적외선 센서 : 물체와 가까울 수록 큰 값 입니다.<br/>오른쪽 적외선 센서 : 물체와 가까울 수록 큰 값 값 입니다.<br/>왼쪽 적외선 센서 캘리브레이션 값 : 적외선 센서의 캘리브레이션 값 입니다.<br/>오른쪽 적외선 센서 캘리브레이션 값 : 적외선 센서의 캘리브레이션 값 입니다.<br/>(*캘리브레이션 값 - 적외선센서 조정 값)","robotis_carCont_cm_led":"4개의 LED 중 1번 또는 4번 LED 를 켜거나 끕니다.<br/>LED 2번과 3번은 동작 지원하지 않습니다.","robotis_carCont_cm_sound_detected_clear":"최종 소리 감지횟 수를 0 으로 초기화 합니다.","robotis_carCont_aux_motor_speed":"감속모터 속도를 0 ~ 1023 의 값(으)로 정합니다.","robotis_carCont_cm_calibration":"적외선센서 조정 값(http://support.robotis.com/ko/: 자동차로봇> 2. B. 적외선 값 조정)을 직접 정합니다.","robotis_openCM70_sensor_value":"최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>사용자 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>사용자 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.","robotis_openCM70_aux_sensor_value":"서보모터 위치 : 0 ~ 1023, 중간 위치의 값은 512 입니다.<br/>적외선센서 :  물체와 가까울 수록 큰 값 입니다.<br/>접촉센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>조도센서(CDS) : 0 ~ 1023, 밝을 수록 큰 값 입니다.<br/>온습도센서(습도) : 0 ~ 100, 습할 수록 큰 값 입니다.<br/>온습도센서(온도) : -20 ~ 100, 온도가 높을 수록 큰 값 입니다.<br/>온도센서 :  -20 ~ 100, 온도가 높을 수록 큰 값 입니다.<br/>초음파센서 : -<br/>자석센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>동작감지센서 : 동작 감지(1), 동작 미감지(0) 값 입니다.<br/>컬러센서 : 알수없음(0), 흰색(1), 검은색(2), 빨간색(3), 녹색(4), 파란색(5), 노란색(6) 값 입니다.<br/>사용자 장치 : 사용자 센서 제작에 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","robotis_openCM70_cm_buzzer_index":"음계를 0.1 ~ 5 초 동안 연주 합니다.","robotis_openCM70_cm_buzzer_melody":"멜로디를 연주 합니다.<br/>멜로디를 연속으로 재생하는 경우, 다음 소리가 재생되지 않으면 '흐름 > X 초 기다리기' 블록을 사용하여 기다린 후 실행합니다.","robotis_openCM70_cm_sound_detected_clear":"최종 소리 감지횟 수를 0 으로 초기화 합니다.","robotis_openCM70_cm_led":"제어기의 빨간색, 녹색, 파란색 LED 를 켜거나 끕니다.","robotis_openCM70_cm_motion":"제어기에 다운로드 되어있는 모션을 실행합니다.","robotis_openCM70_aux_motor_speed":"감속모터 속도를 0 ~ 1023 의 값(으)로 정합니다.","robotis_openCM70_aux_servo_mode":"서보모터를 회전모드 또는 관절모드로 정합니다.<br/>한번 설정된 모드는 계속 적용됩니다.<br/>회전모드는 서보모터 속도를 지정하여 서보모터를 회전 시킵니다.<br/>관절모드는 지정한 서보모터 속도로 서보모터 위치를 이동 시킵니다.","robotis_openCM70_aux_servo_speed":"서보모터 속도를 0 ~ 1023 의 값(으)로 정합니다.","robotis_openCM70_aux_servo_position":"서보모터 위치를 0 ~ 1023 의 값(으)로 정합니다.<br/>서보모터 속도와 같이 사용해야 합니다.","robotis_openCM70_aux_led_module":"LED 모듈의 LED 를 켜거나 끕니다.","robotis_openCM70_aux_custom":"사용자 센서 제작에 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","robotis_openCM70_cm_custom_value":"컨트롤 테이블 주소를 직접 입력하여 값을 확인 합니다.<br/>컨트롤 테이블 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","robotis_openCM70_cm_custom":"컨트롤 테이블 주소를 직접 입력하여 값을 정합니다.<br/>컨트롤 테이블 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","show_variable":"Shows the value of the selected variable on the stage.","hide_variable":"Hides the value of the selected variable from the stage.","value_of_index_from_list":"Reports the item at the location of the input value on the selected list.","add_value_to_list":"Adds the input item to the end location of the selected list.","remove_value_from_list":"Deletes the item at the location of the input value from the selected list.","insert_value_to_list":"Inserts the input item at the location of the input value in the selected list. ","change_value_list_index":"Replaces the item at the location of the input value to the input text","length_of_list":"Reports the number of items contained in the selected list.","show_list":"Shows the selected list on the stage.","hide_list":"Hides the selected list from the stage.","text":"Reports the text in the text box. ","text_write":"Changes the content of the text box to the input text.","text_append":"Adds the input text behind the text box.","text_prepend":"Adds the input text in front of the text box.","text_flush":"Deletes all saved text in the text box.","erase_all_effects":"Delete all effects about this object.","char_at":"Reports the letter of the input text.","length_of_string":"Reports the length of input text include spacing","substring":"Reports the text extracted from the input text between two specified indices","replace_string":"Reports the text that replaced all the input text with another input text","index_of_string":"Reports the index of first input text in second input text","change_string_case":"Reports the text that converted to uppercase or lowercase","direction_relative_duration":"Rotates the direction of this object by the input number of degrees over the input amount of time.","get_sound_volume":"Reports the sound volume.","sound_from_to":"","sound_from_to_and_wait":"","Block_info":"Block Info ","Block_click_msg":"Clicking on the block comes the description of the block . ","neobot_sensor_value":"IN1 ~ IN3 포트 및 리모컨에서 입력되는 값 그리고 배터리 정보를 0부터 255의 숫자로 표시합니다.","neobot_sensor_convert_scale":"선택한 포트 입력값의 변화를 특정범위의 값으로 표현범위를 조절할 수 있습니다.","neobot_left_motor":"L모터 포트에 연결한 모터의 회전방향 및 속도를 설정합니다.","neobot_stop_left_motor":"L모터 포트에 연결한 모터를 정지합니다.","neobot_right_motor":"R모터 포트에 연결한 모터의 회전방향 및 속도를 설정합니다.","neobot_stop_right_motor":"R모터 포트에 연결한 모터를 정지합니다.","neobot_all_motor":"L모터 및 R모터 포트에 2개 모터를 연결하여 바퀴로 활용할 때 전, 후, 좌, 우 이동 방향 및 속도, 시간을 설정할 수 있습니다.","neobot_stop_all_motor":"L모터 및 R모터에 연결한 모터를 모두 정지합니다.","neobot_set_servo":"OUT1 ~ OUT3에 서보모터를 연결했을 때 0도 ~ 180도 범위 내에서 각도를 조절할 수 있습니다.","neobot_set_output":"OUT1 ~ OUT3에 라이팅블록 및 전자회로를 연결했을 때 출력 전압을 설정할 수 있습니다.</br>0은 0V, 1 ~ 255는 2.4 ~ 4.96V의 전압을 나타냅니다.","neobot_set_fnd":"FND로 0~99 까지의 숫자를 표시할 수 있습니다.","neobot_play_note_for":"주파수 발진 방법을 이용해 멜로디에 반음 단위의 멜로디 음을 발생시킬 수 있습니다."};Lang.Category={"entrybot_friends":"Entrybot friends","people":"People","animal":"Animal","animal_flying":"Flying","animal_land":"Land","animal_water":"Water","animal_others":"Others","plant":"Plant","plant_flower":"Flowers","plant_grass":"Grass","plant_tree":"Tree","plant_others":"Others","vehicles":"Vehicles","vehicles_flying":"Flying","vehicles_land":"Land","vehicles_water":"Water","vehicles_others":"Others","architect":"Building","architect_building":"Structure","architect_monument":"Monument","architect_others":"Others","food":"Food","food_vegetables":"Fruits/Vegetables","food_meat":"Meat","food_drink":"Drink","food_others":"Others","environment":"Environment","environment_nature":"Nature","environment_space":"Space","environment_others":"Others","stuff":"Things","stuff_living":"Living","stuff_hobby":"Hobby","stuff_others":"Others","fantasy":"Fantasy","interface":"Interface","background":"Background","background_outdoor":"Outdoor","background_indoor":"Indoor","background_nature":"Nature","background_others":"Others"};Lang.Device={"arduino":"arduino","hamster":"hamster","albert":"albert","robotis_carCont":"","robotis_openCM70":"","sensorBoard":"Entry Sensor Board","CODEino":"CODEino","bitbrick":"bitbrick","bitBlock":"bitBlock","xbot_epor_edge":"XBOT","dplay":"DPLAY","nemoino":"NEMOino","ev3":"EV3"};Lang.General={"turn_on":"turn on","turn_off":"turn off","left":"left","right":"right","both":"both","transparent":"transparent","black":"black","brown":"brown","red":"red","yellow":"yellow","green":"green","skyblue":"sykblue","blue":"blue","purple":"purple","white":"white","note_c":"C","note_d":"D","note_e":"E","note_f":"F","note_g":"G","note_a":"A","note_b":"B"};Lang.Fonts={"batang":"KoPub Batang","myeongjo":"Nanum Myeongjo","gothic":"Nanum Gothic","pen_script":"Nanum Pen Script","jeju_hallasan":"Jeju Hallasan","gothic_coding":"Nanum Gothic Coding"};Lang.Hw={"note":"note","leftWheel":"left wheel","rightWheel":"right wheel","leftEye":"left eye","rightEye":"right eye","led":"LED","body":"body","front":" front","port_en":"port","port_ko":"","sensor":"sensor","light":"light","temp":"temp","switch_":"sw_","right_ko":"","right_en":"R","left_ko":"","left_en":"L","up_ko":"","up_en":"U","down_ko":"","down_en":"D","output":"output","left":"left","right":"right","sub":"servo","motor":"motor","":"","buzzer":"buzzer"};Lang.template={"albert_hand_found":"hand found?","albert_value":"%1","albert_move_forward_for_secs":"move forward for %1 secs %2","albert_move_backward_for_secs":"move backward for %1 secs %2","albert_turn_for_secs":"turn %1 for %2 secs %3","albert_change_both_wheels_by":"change wheels by left: %1 right: %2 %3","albert_set_both_wheels_to":"set wheels to left: %1 right: %2 %3","albert_change_wheel_by":"change %1 wheel by %2 %3","albert_set_wheel_to":"set %1 wheel to %2 %3","albert_stop":"stop %1","albert_set_pad_size_to":"set pad size to width: %1 height: %2 %3","albert_set_eye_to":"set %1 eye to %2 %3","albert_clear_eye":"clear %1 eye %2","albert_body_led":"%1 body led %2","albert_front_led":"%1 front led %2","albert_beep":"beep %1","albert_change_buzzer_by":"change buzzer by %1 ) %2","albert_set_buzzer_to":"set buzzer to %1 ) %2","albert_clear_buzzer":"clear buzzer %1","albert_play_note_for":"play note %1 ', %2 for %3 beats %4","albert_rest_for":"rest for %1 beats %2","albert_change_tempo_by":"change tempo by %1 ) %2","albert_set_tempo_to":"set tempo to %1 bpm %2","albert_move_forward":"move forward %1","albert_move_backward":"move backward %1","albert_turn_around":"turn %1 %2","albert_set_led_to":"set %1 %2 %3","albert_clear_led":"clear %1 %2","albert_change_wheels_by":"%1 %2 %3","albert_set_wheels_to":"%1 %2 %3","arduino_text":"%1","arduino_send":"Send signal %1","arduino_get_number":"number result of signal %1","arduino_get_string":"string result of signal %1","arduino_get_sensor_number":"%1  ","arduino_get_port_number":"%1  ","arduino_get_pwm_port_number":"%1  ","arduino_get_number_sensor_value":"Analog %1 Sensor value  ","dplay_get_number_sensor_value":"Analog %1 Sensor value  ","nemoino_get_number_sensor_value":"Analog %1 Sensor value  ","sensorBoard_get_number_sensor_value":"Analog %1 Sensor value  ","CODEino_get_number_sensor_value":"Analog %1 Sensor value  ","ardublock_get_number_sensor_value":"Analog %1 Sensor value  ","arduino_get_digital_value":"Digital %1 Sensor value  ","dplay_get_digital_value":"Digital %1 Sensor value  ","nemoino_get_digital_value":"Digital %1 Sensor value  ","sensorBoard_get_digital_value":"Digital %1 Sensor value  ","CODEino_get_digital_value":"Digital %1 Sensor value  ","ardublock_get_digital_value":"Digital %1 Sensor value  ","arduino_toggle_led":"Digital %1 Pin %2 %3","dplay_toggle_led":"Digital %1 Pin %2 %3","nemoino_toggle_led":"Digital %1 Pin %2 %3","sensorBoard_toggle_led":"Digital %1 Pin %2 %3","CODEino_toggle_led":"Digital %1 Pin %2 %3","ardublock_toggle_led":"Digital %1 Pin %2 %3","arduino_toggle_pwm":"Digital %1 Pin %2 %3","dplay_toggle_pwm":"Digital %1 Pin %2 %3","nemoino_toggle_pwm":"Digital %1 Pin %2 %3","sensorBoard_toggle_pwm":"Digital %1 Pin %2 %3","CODEino_toggle_pwm":"Digital %1 Pin %2 %3","ardublock_toggle_pwm":"Digital %1 Pin %2 %3","arduino_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","dplay_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","nemoino_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","sensorBoard_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","CODEino_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","ardublock_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","joystick_get_number_sensor_value":"Analog %1 Sensor value  ","joystick_get_digital_value":"Digital %1 Sensor value  ","joystick_toggle_led":"Digital %1 Pin %2 %3","joystick_toggle_pwm":"Digital %1 Pin %2 %3","joystick_convert_scale":"Map Value %1 %2 ~ %3 to %4 ~ %5  ","sensorBoard_get_named_sensor_value":"%1  센서값","sensorBoard_is_button_pressed":"%1  버튼을 눌렀는가?","sensorBoard_led":"%1  LED %2   %3","arduino_download_connector":"%1","arduino_download_source":"%1","arduino_connected":"%1","arduino_reconnect":"%1","CODEino_get_sensor_number":"%1  ","CODEino_get_named_sensor_value":"  %1  Sensor value ","CODEino_get_sound_status":"Sound is  %1  ","CODEino_get_light_status":"Light is  %1  ","CODEino_is_button_pressed":" Operation  %1  ","CODEino_get_accelerometer_direction":" 3-AXIS Accelerometer  %1  ","CODEino_get_accelerometer_value":" 3-AXIS Accelerometer  %1 -axis value ","bitbrick_sensor_value":"%1  값","bitbrick_is_touch_pressed":"touch %1 이(가) 눌렸는가?","bitbrick_turn_off_color_led":"컬러 LED 끄기 %1","bitbrick_turn_on_color_led_by_rgb":"컬러 LED 켜기 R %1 G %2 B %3 %4","bitbrick_turn_on_color_led_by_picker":"컬러 LED 색  %1 로 정하기 %2","bitbrick_turn_on_color_led_by_value":"컬러 LED 켜기 색 %1 로 정하기 %2","bitbrick_buzzer":"버저음  %1 내기 %2","bitbrick_turn_off_all_motors":"모든 모터 끄기 %1","bitbrick_dc_speed":"DC 모터 %1  속도 %2 %3","bitbrick_dc_direction_speed":"DC 모터 %1   %2  방향  속력 %3 %4","bitbrick_servomotor_angle":"서보 모터 %1  각도 %2 %3","bitbrick_convert_scale":"변환 %1 값 %2 ~ %3 에서 %4 ~ %5","start_drawing":"Start drawing %1","stop_drawing":"Stop drawing %1","set_color":"Set brush color to %1 %2","set_random_color":"Set brush color to random %1","change_thickness":"Change thickness by %1 %2","set_thickness":"Set thickness to %1 %2","change_opacity":"Change opacity by %1 % %2","set_opacity":"Set opacity to %1 % %2","brush_erase_all":"Erase all brush %1","brush_stamp":"Stamp %1","change_brush_transparency":"Change transparency by %1 % %2","set_brush_tranparency":"Set transparency to %1 % %2","number":"%1","angle":"%1","get_x_coordinate":"%1","get_y_coordinate":"%1","get_angle":"%1","get_rotation_direction":"%1  ","distance_something":"%1 %2 %3","coordinate_mouse":"%1 %2 %3","coordinate_object":"%1 %2 %3 %4","calc_basic":"%1 %2 %3","calc_plus":"%1 %2 %3","calc_minus":"%1 %2 %3","calc_times":"%1 %2 %3","calc_divide":"%1 %2 %3","calc_mod":"%1 %2 %3","calc_share":"%1 %2 %3","calc_operation":"%1 %2 %3 %4","calc_rand":"%1 %2 %3 %4 %5","get_date":"%1 %2 %3","get_sound_duration":"%1 %2 %3","reset_project_timer":"%1","set_visible_project_timer":"%1 %2 %3 %4","timer_variable":"%1 %2","get_project_timer_value":"%1 %2","char_at":"%1 %2 %3 %4 %5","length_of_string":"%1 %2 %3","substring":"%1 %2 %3 %4 %5 %6 %7","replace_string":"%1 %2 %3 %4 %5 %6 %7","change_string_case":"%1 %2 %3 %4 %5","index_of_string":"%1 %2 %3 %4 %5","combine_something":"%1 %2 %3 %4 %5","get_sound_volume":"%1 %2","quotient_and_mod":" %1 %6 %3 %2 %5 %4","choose_project_timer_action":"%1 %2 %3 %4","wait_second":"Wait %1 seconds %2","repeat_basic":"Repeat   %1 times %2","repeat_inf":"Repeat infinitely %1","stop_repeat":"Stop repeat %1","wait_until_true":"Wait until %1 %2","_if":"If %1 then %2","if_else":"If %1 then %2 %3 else","create_clone":"Create %1 's clone %2","delete_clone":"Remove this clone %1","when_clone_start":"%1 When clone is created","stop_run":"Exit program %1","repeat_while_true":"Repeat %2 %1 %3","stop_object":"Stop %1 %2","restart_project":"Restart Project %1","remove_all_clones":"Remove all clone %1","functionAddButton":"%1","function_field_label":"%1%2","function_field_string":"%1%2","function_field_boolean":"%1%2","function_param_string":"문자/숫자값","function_param_boolean":"판단값","function_create":"함수 정의하기 %1 %2","function_general":"function %1","hamster_hand_found":"hand found?","hamster_value":"%1","hamster_move_forward_once":"move forward once on board %1","hamster_turn_once":"turn %1 once on board %2","hamster_move_forward_for_secs":"move forward for %1 secs %2","hamster_move_backward_for_secs":"move backward %1 secs %2","hamster_turn_for_secs":"turn %1 for %2 secs %3","hamster_change_both_wheels_by":"change wheel by left: %1 right: %2 %3","hamster_set_both_wheels_to":"set wheel to left: %1 right: %2 %3","hamster_change_wheel_by":"change %1 wheel by %2 %3","hamster_set_wheel_to":"set %1 wheel to %2 %3","hamster_follow_line_using":"follow %1 line using %2 floor sensor %3","hamster_follow_line_until":"follow %1 line until %2 intersection %3","hamster_set_following_speed_to":"set following speed to %1 %2","hamster_stop":"stop %1","hamster_set_led_to":"set %1 led to %2 %3","hamster_clear_led":"clear %1 led %2","hamster_beep":"beep %1","hamster_change_buzzer_by":"change buzzer by %1 %2","hamster_set_buzzer_to":"set buzzer to %1 %2","hamster_clear_buzzer":"clear buzzer %1","hamster_play_note_for":"play note %1 %2 for %3 beats %4","hamster_rest_for":"rest for %1 beats %2","hamster_change_tempo_by":"change tempo by %1 %2","hamster_set_tempo_to":"set tempo to %1 bpm %2","hamster_set_port_to":"set port %1 to %2 %3","hamster_change_output_by":"change output %1 by %2 %3","hamster_set_output_to":"set output %1 to %2 %3","is_clicked":"%1","is_press_some_key":"%1 %2","reach_something":"%1 %2 %3","boolean_comparison":"%1 %2 %3","boolean_equal":"%1 %2 %3","boolean_bigger":"%1 %2 %3","boolean_smaller":"%1 %2 %3","boolean_and_or":"%1 %2 %3","boolean_and":"%1 %2 %3","boolean_or":"%1 %2 %3","boolean_not":"%1 %2 %3","true_or_false":"%1","True":"%1  ","False":"%1  ","boolean_basic_operator":"%1 %2 %3","show":"show %1","hide":"hide %1","dialog_time":"Say %1 for %2 secs %3 %4","dialog":"Say %1 %2 %3","remove_dialog":"Remove speech %1","change_to_nth_shape":"Change shape to %1 %2","change_to_next_shape":"Change to %1 shape %2","set_effect_volume":"Change %1 effect by %2 %3","set_effect":"Set %1 effect to %2 %3","erase_all_effects":"Erase all effects %1","change_scale_percent":"Change scale by %1 %2","set_scale_percent":"Set scale to %1 %2","change_scale_size":"Change scale by %1 %2","set_scale_size":"Set scale to %1 %2","flip_y":"Flip horizontally %1","flip_x":"Flip vertically %1","set_object_order":"go to %1 th layer %2","get_pictures":"%1  ","change_to_some_shape":"Change shape to %1 %2","add_effect_amount":"Change %1 effect by %2 %3","change_effect_amount":"Set %1 effect to %2 %3","set_effect_amount":"Change %1 effect by %2 %3","set_entity_effect":"Set %1 effect to %2 %3","change_object_index":"bring to %1 %2","move_direction":"Move %1 forward %2","move_x":"Change X by %1 %2","move_y":"Change Y by %1 %2","locate_xy_time":"Moving while %1 seconds to x: %2 y: %3 %4","rotate_by_angle":"Rotate by %1 degree %2","rotate_by_angle_dropdown":"Rotate by %1 degree %2","see_angle":"Set direction to %1 %2","see_direction":"Rotate to the %1 %2","locate_xy":"Move to the X: %1 Y: %2 %3","locate_x":"Move to the X: %1 %2","locate_y":"Move to the Y: %1 %2","locate":"Move to %1 %2","move_xy_time":"For %1 secs move to X: %2 Y: %3 %4","rotate_by_angle_time":"Rotate while %1 seconds by %2 degree %3","bounce_wall":"if on edge, bounce %1","flip_arrow_horizontal":"Flip horizontally by arrow direction %1","flip_arrow_vertical":"Flip vertically by arrow direction %1","see_angle_object":"Turn towards %1 %2","see_angle_direction":"See angle to %1 degree %2","rotate_direction":"Change direction by  %1 %2","locate_object_time":"factorial value %1 seconds to the %2 %3","rotate_absolute":"Set rotation to %1 %2","rotate_relative":"Rotate %1 %2","direction_absolute":"Set direction to %1 %2","direction_relative":"Change direction by  %1 %2","move_to_angle":"Rotate %1 and move %2 %3","rotate_by_time":"For %1 secs rotate %2 %3","direction_relative_duration":"For %1 secs set direction to %2 %3","neobot_sensor_value":"%1  값","neobot_turn_left":"왼쪽모터를 %1 %2 회전 %3","neobot_stop_left":"왼쪽모터 정지 %1","neobot_turn_right":"오른쪽모터를 %1 %2 회전 %3","neobot_stop_right":"오른쪽모터 정지 %1","neobot_run_motor":"%1 모터를  %2 초간 %3 %4 %5","neobot_servo_1":"SERVO1에 연결된 서보모터를 %1 속도로 %2 로 이동 %3","neobot_servo_2":"SERVO2에 연결된 서보모터를 %1 속도로 %2 로 이동 %3","neobot_play_note_for":"멜로디 %1 을(를) %2 옥타브로 %3 길이만큼 소리내기 %4","neobot_set_sensor_value":"%1 번 포트의 값을 %2 %3","robotis_openCM70_cm_custom_value":"직접입력 주소 ( %1 ) %2 값","robotis_openCM70_sensor_value":"제어기 %1 값","robotis_openCM70_aux_sensor_value":"%1   %2 값","robotis_openCM70_cm_buzzer_index":"제어기 음계값 %1 for %2 secs 연주 %3","robotis_openCM70_cm_buzzer_melody":"제어기 멜로디 %1 번 연주 %2","robotis_openCM70_cm_sound_detected_clear":"최종소리감지횟수 초기화 %1","robotis_openCM70_cm_led":"제어기 %1 LED %2 %3","robotis_openCM70_cm_motion":"모션 %1 번 실행 %2","robotis_openCM70_aux_motor_speed":"%1 감속모터 속도를 %2 , 출력값을 %3 (으)로 정하기 %4","robotis_openCM70_aux_servo_mode":"%1 서보모터 모드를 %2 (으)로 정하기 %3","robotis_openCM70_aux_servo_speed":"%1 서보모터 속도를 %2 , 출력값을 %3 (으)로 정하기 %4","robotis_openCM70_aux_servo_position":"%1 서보모터 위치를 %2 (으)로 정하기 %3","robotis_openCM70_aux_led_module":"%1 LED 모듈을 %2 (으)로 정하기 %3","robotis_openCM70_aux_custom":"%1 사용자 장치를 %2 (으)로 정하기 %3","robotis_openCM70_cm_custom":"직접입력 주소 ( %1 ) (을)를 %2 (으)로 정하기 %3","robotis_carCont_sensor_value":"%1   값","robotis_carCont_cm_led":"4번 LED %1 ,  1번 LED %2 %3","robotis_carCont_cm_sound_detected_clear":"최종소리감지횟수 초기화 %1","robotis_carCont_aux_motor_speed":"%1 감속모터 속도를 %2 , 출력값을 %3 (으)로 정하기 %4","robotis_carCont_cm_calibration":"%1 적외선 센서 캘리브레이션 값을 %2 (으)로 정하기 %3","when_scene_start":"%1 When scene started","start_scene":"Start %1 scene %2","start_neighbor_scene":"Start %1 scene %2","sound_something":"Play %1 Sound %2","sound_something_second":"Play %1 sound for %2 secs %3","sound_something_wait":"Play %1 Sound and wait %2","sound_something_second_wait":"Play %1 Sound for %2 secs and wait %3","sound_volume_change":"Change volume by %1 % %2","sound_volume_set":"Set volume to %1 % %2","sound_silent_all":"Stop all sounds %1","get_sounds":"%1  ","sound_something_with_block":"Play %1 Sound %2","sound_something_second_with_block":"Play %1   sound for %2 secs %3","sound_something_wait_with_block":"Play %1 Sound and wait %2","sound_something_second_wait_with_block":"Play %1 Sound for   %2 secs and wait %3","sound_from_to":"Play %1 sound from %2 to %3 secs %4","sound_from_to_and_wait":"Play %1 sound from %2 to %3 secs and wait %4","when_run_button_click":"%1 When run","press_some_key":"%1 When key %2 pressed %3","when_some_key_pressed":"%1 When key %2 pressed","mouse_clicked":"%1 When mouse clicked","mouse_click_cancled":"%1 When mouse click released","when_object_click":"%1 When object clicked","when_object_click_canceled":"%1 When object click released","when_some_key_click":"%1 When press some key","when_message_cast":"%1 When %2 message received","message_cast":"Send %1 message %2","message_cast_wait":"Send %1  message and wait %2","text":"%1","text_write":"Writing that %1","text_append":"After writing that %1","text_prepend":"Add %1 in front of that","text_flush":"Remove all text","variableAddButton":"%1","listAddButton":"%1","change_variable":"Plus to %1 by %2 %3","set_variable":"Set %1 to %2 %3","show_variable":"Show variable %1 value %2","hide_variable":"Hide variable %1 value %2","get_variable":"%2 %1","ask_and_wait":"Ask %1 and wait %2","get_canvas_input_value":"%1  ","add_value_to_list":"add %1 to the list %2 %3","remove_value_from_list":"remove %1 th element from %2 %3","insert_value_to_list":"insert %1 to %2 %3 th position %4","change_value_list_index":"change %1 %2 th element to %3 %4","value_of_index_from_list":"%1 %2 %3 %4 %5","length_of_list":"%1 %2 %3","show_list":"Show list %1 %2","hide_list":"Hide list %1 %2","options_for_list":"%1  ","set_visible_answer":"response %1 %2","is_included_in_list":"%1 %2 %3 %4 %5","xbot_digitalInput":"%1","xbot_analogValue":"%1","xbot_digitalOutput":"Digital %1 PIN, Ouput Value %2 %3","xbot_analogOutput":"Analog %1 %2 %3","xbot_servo":"Servo Motor %1 , Angle %2 %3","xbot_oneWheel":"Wheel(DC) Motor %1 , Speed %2 %3","xbot_twoWheel":"Wheel(DC) Motor Right(2) Speed: %1 Left(1) Speed: %2 %3","xbot_rgb":"RGB LED Color from Red %1 Green %2 Blue %3 %4","xbot_rgb_picker":"RGB LED Color from %1   %2","xbot_buzzer":"play note %1   %2 for %3 sec of Melody Playing %4","xbot_lcd":"LCD %1 th Line ,  Text %2 %3","run":"","mutant":"test mutant block","jr_start":"%1","jr_repeat":"%1 %2 %3","jr_item":"꽃 모으기 %1","cparty_jr_item":"%1 %2","jr_north":"%1 %2","jr_east":"%1 %2","jr_south":"%1 %2","jr_west":"%1 %2","jr_start_basic":"%1 %2","jr_go_straight":"%1 %2","jr_turn_left":"%1 %2","jr_turn_right":"%1 %2","jr_go_slow":"%1 %2","jr_repeat_until_dest":"%1 %2 %3","jr_if_construction":"%1 %2 %3 %4","jr_if_speed":"if %1 in front %2","maze_step_start":"%1 시작하기를 클릭했을 때","maze_step_jump":"뛰어넘기%1","maze_step_for":"%1 번 반복하기%2","test":"%1 this is test block %2","maze_repeat_until_1":"%1 만날 때 까지 반복%2","maze_repeat_until_2":"모든 %1 만날 때 까지 반복%2","maze_step_if_1":"만약 앞에 %1 있다면%2","maze_step_if_2":"만약 앞에 %1 있다면%2","maze_call_function":"약속 불러오기%1","maze_define_function":"약속하기%1","maze_step_if_3":"만약 앞에 %1 있다면%2","maze_step_if_4":"만약 앞에 %1 있다면%2","maze_step_move_step":"앞으로 한 칸 이동%1","maze_step_rotate_left":"왼쪽으로 회전%1","maze_step_rotate_right":"오른쪽으로 회전%1","test_wrapper":"%1 this is test block %2","basic_button":"%1"};if(( false?"undefined":_typeof(exports))=="object")exports.Lang=Lang;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var Lang={};Lang.category={"name":"ko"};Lang.type="ko";Lang.en="English";Lang.Blocks={"ARDUINO":"하드웨어","ARDUINO_download_connector":"연결 프로그램 다운로드","ARDUINO_open_connector":"연결 프로그램 열기","ARDUINO_download_source":"엔트리 아두이노 소스","ARDUINO_reconnect":"하드웨어 연결하기","ARDUINO_connected":"하드웨어가 연결되었습니다. ","ARDUINO_arduino_get_number_1":"신호","ARDUINO_arduino_get_number_2":"의 숫자 결과값","ARDUINO_arduino_get_sensor_number_0":"0","ARDUINO_arduino_get_sensor_number_1":"1","ARDUINO_arduino_get_sensor_number_2":"2","ARDUINO_arduino_get_sensor_number_3":"3","ARDUINO_arduino_get_sensor_number_4":"4","ARDUINO_arduino_get_sensor_number_5":"5","BITBRICK_light":"밝기센서","BITBRICK_IR":"거리센서","BITBRICK_touch":"버튼","BITBRICK_potentiometer":"가변저항","BITBRICK_MIC":"소리감지센서","BITBRICK_UserSensor":"사용자입력","BITBRICK_UserInput":"사용자입력","BITBRICK_dc_direction_ccw":"반시계","BITBRICK_dc_direction_cw":"시계","CODEino_get_sensor_number_0":"0","CODEino_get_sensor_number_1":"1","CODEino_get_sensor_number_2":"2","CODEino_get_sensor_number_3":"3","CODEino_get_sensor_number_4":"4","CODEino_get_sensor_number_5":"5","CODEino_get_sensor_number_6":"6","CODEino_sensor_name_0":"소리","CODEino_sensor_name_1":"빛","CODEino_sensor_name_2":"슬라이더","CODEino_sensor_name_3":"저항-A","CODEino_sensor_name_4":"저항-B","CODEino_sensor_name_5":"저항-C","CODEino_sensor_name_6":"저항-D","CODEino_string_1":" 센서값 ","CODEino_string_2":" 보드의 ","CODEino_string_3":"버튼누름","CODEino_string_4":"A 연결됨","CODEino_string_5":"B 연결됨","CODEino_string_6":"C 연결됨","CODEino_string_7":"D 연결됨","CODEino_string_8":" 3축 가속도센서 ","CODEino_string_9":"축의 센서값 ","CODEino_string_10":"소리센서 ","CODEino_string_11":"소리큼","CODEino_string_12":"소리작음","CODEino_string_13":"빛센서 ","CODEino_string_14":"밝음","CODEino_string_15":"어두움","CODEino_string_16":"왼쪽 기울임","CODEino_string_17":"오른쪽 기울임","CODEino_string_18":"위쪽 기울임","CODEino_string_19":"아래쪽 기울임","CODEino_string_20":"뒤집힘","CODEino_accelerometer_X":"X","CODEino_accelerometer_Y":"Y","CODEino_accelerometer_Z":"Z","dplay_switch":"스위치 ","dplay_light":"빛센서가 ","dplay_tilt":"기울기센서 상태가","dplay_string_1":"켜짐","dplay_string_2":"꺼짐","dplay_string_3":"밝음","dplay_string_4":"어두움","dplay_string_5":"눌림","dplay_string_6":"열림","dplay_num_pin_1":"LED 상태를","dplay_num_pin_2":"번 스위치가","dplay_num_pin_3":"아날로그","dplay_num_pin_4":"번 ","dplay_num_pin_5":"센서값","dplay_analog_number_0":"A0","dplay_analog_number_1":"A1","dplay_analog_number_2":"A2","dplay_analog_number_3":"A3","dplay_analog_number_4":"A4","dplay_analog_number_5":"A5","ARDUINO_arduino_get_string_1":"신호","ARDUINO_arduino_get_string_2":"의 글자 결과값","ARDUINO_arduino_send_1":"신호","ARDUINO_arduino_send_2":"보내기","ARDUINO_num_sensor_value_1":"아날로그","ARDUINO_num_sensor_value_2":"번 센서값","ARDUINO_get_digital_value_1":"디지털","ARDUINO_num_pin_1":"디지털","ARDUINO_num_pin_2":"번 핀","ARDUINO_toggle_pwm_1":"디지털","ARDUINO_toggle_pwm_2":"번 핀을","ARDUINO_toggle_pwm_3":"(으)로 정하기","ARDUINO_on":"켜기","ARDUINO_convert_scale_1":"","ARDUINO_convert_scale_2":"값의 범위를","ARDUINO_convert_scale_3":"~","ARDUINO_convert_scale_4":"에서","ARDUINO_convert_scale_5":"~","ARDUINO_convert_scale_6":"(으)로 바꾼값","ARDUINO_off":"끄기","brightness":"밝기","BRUSH":"붓","BRUSH_brush_erase_all":"모든 붓 지우기","BRUSH_change_opacity_1":"붓의 불투명도를","BRUSH_change_opacity_2":"% 만큼 바꾸기","BRUSH_change_thickness_1":"붓의 굵기를","BRUSH_change_thickness_2":"만큼 바꾸기","BRUSH_set_color_1":"붓의 색을","BRUSH_set_color_2":"(으)로 정하기","BRUSH_set_opacity_1":"붓의 불투명도를","BRUSH_set_opacity_2":"% 로 정하기","BRUSH_set_random_color":"붓의 색을 무작위로 정하기","BRUSH_set_thickness_1":"붓의 굵기를","BRUSH_set_thickness_2":"(으)로 정하기","BRUSH_stamp":"도장찍기","BRUSH_start_drawing":"그리기 시작하기","BRUSH_stop_drawing":"그리기 멈추기","CALC":"계산","CALC_calc_mod_1":"","CALC_calc_mod_2":"/","CALC_calc_mod_3":"의 나머지","CALC_calc_operation_of_1":"","CALC_calc_operation_of_2":"의","CALC_calc_operation_root":"루트","CALC_calc_operation_square":"제곱","CALC_calc_rand_1":"","CALC_calc_rand_2":"부터","CALC_calc_rand_3":"사이의 무작위 수","CALC_calc_share_1":"","CALC_calc_share_2":"/","CALC_calc_share_3":"의 몫","CALC_coordinate_mouse_1":"마우스","CALC_coordinate_mouse_2":"좌표","CALC_coordinate_object_1":"","CALC_coordinate_object_2":"의","CALC_coordinate_object_3":"","CALC_distance_something_1":"","CALC_distance_something_2":"까지의 거리","CALC_get_angle":"각도값","CALC_get_date_1":" 현재","CALC_get_date_2":"","CALC_get_date_day":"일","CALC_get_date_hour":"시각(시)","CALC_get_date_minute":"시각(분)","CALC_get_date_month":"월","CALC_get_date_second":"시각(초)","CALC_get_date_year":"연도","CALC_get_sound_duration_1":"","CALC_get_sound_duration_2":"소리의 길이","CALC_get_timer_value":" 초시계 값","CALC_get_x_coordinate":"X 좌푯값","CALC_get_y_coordinate":"Y 좌푯값","CALC_timer_reset":"초시계 초기화","CALC_timer_visible_1":"초시계","CALC_timer_visible_2":"","CALC_timer_visible_show":"보이기","CALC_timer_visible_hide":"숨기기","color":"색깔","FLOW":"흐름","FLOW__if_1":"만일","FLOW__if_2":"이라면","FLOW_create_clone_1":"","FLOW_create_clone_2":"의 복제본 만들기","FLOW_delete_clone":"이 복제본 삭제하기","FLOW_delete_clone_all":"모든 복제본 삭제하기","FLOW_if_else_1":"만일","FLOW_if_else_2":"이라면","FLOW_if_else_3":"아니면","FLOW_repeat_basic_1":"","FLOW_repeat_basic_2":"번 반복하기","FLOW_repeat_basic_errorMsg":"반복 횟수는 0보다 같거나 커야 합니다.","FLOW_repeat_inf":"계속 반복하기","FLOW_restart":"처음부터 다시 실행하기","FLOW_stop_object_1":"","FLOW_stop_object_2":"멈추기","FLOW_stop_object_all":"모든","FLOW_stop_object_this_object":"자신의","FLOW_stop_object_this_thread":"이","FLOW_stop_object_other_thread":"자신의 다른","FLOW_stop_repeat":"반복 중단하기","FLOW_stop_run":"프로그램 끝내기","FLOW_wait_second_1":"","FLOW_wait_second_2":"초 기다리기","FLOW_wait_until_true_1":"","FLOW_wait_until_true_2":"이(가) 될 때까지 기다리기","FLOW_when_clone_start":"복제본이 처음 생성되었을때","FUNC":"함수","JUDGEMENT":"판단","JUDGEMENT_boolean_and":"그리고","JUDGEMENT_boolean_not_1":"","JUDGEMENT_boolean_not_2":"(이)가 아니다","JUDGEMENT_boolean_or":"또는","JUDGEMENT_false":" 거짓 ","JUDGEMENT_is_clicked":"마우스를 클릭했는가?","JUDGEMENT_is_press_some_key_1":"","JUDGEMENT_is_press_some_key_2":"키가 눌러져 있는가?","JUDGEMENT_reach_something_1":"","JUDGEMENT_reach_something_2":"에 닿았는가?","JUDGEMENT_true":" 참 ","LOOKS":"생김새","LOOKS_change_scale_percent_1":"크기를","LOOKS_change_scale_percent_2":"만큼 바꾸기","LOOKS_change_to_next_shape":"다음 모양으로 바꾸기","LOOKS_change_to_nth_shape_1":"","LOOKS_change_to_nth_shape_2":"모양으로 바꾸기","LOOKS_change_shape_prev":"이전","LOOKS_change_shape_next":"다음","LOOKS_change_to_near_shape_1":"","LOOKS_change_to_near_shape_2":"모양으로 바꾸기","LOOKS_dialog_1":"","LOOKS_dialog_2":"을(를)","LOOKS_dialog_3":"","LOOKS_dialog_time_1":"","LOOKS_dialog_time_2":"을(를)","LOOKS_dialog_time_3":"초 동안","LOOKS_dialog_time_4":"","LOOKS_erase_all_effects":"효과 모두 지우기","LOOKS_flip_x":"상하 모양 뒤집기","LOOKS_flip_y":"좌우 모양 뒤집기","LOOKS_hide":"모양 숨기기","LOOKS_remove_dialog":"말하기 지우기","LOOKS_set_effect_1":"","LOOKS_set_effect_2":"효과를","LOOKS_set_effect_3":"(으)로 정하기","LOOKS_set_effect_volume_1":"","LOOKS_set_effect_volume_2":"효과를","LOOKS_set_effect_volume_3":"만큼 주기","LOOKS_set_object_order_1":"","LOOKS_set_object_order_2":"번째로 올라오기","LOOKS_set_scale_percent_1":"크기를","LOOKS_set_scale_percent_2":" (으)로 정하기","LOOKS_show":"모양 보이기","mouse_pointer":"마우스포인터","MOVING":"움직임","MOVING_bounce_wall":"화면 끝에 닿으면 튕기기","MOVING_bounce_when_1":"","MOVING_bounce_when_2":"에 닿으면 튕기기","MOVING_flip_arrow_horizontal":"화살표 방향 좌우 뒤집기","MOVING_flip_arrow_vertical":"화살표 방향 상하 뒤집기","MOVING_locate_1":"","MOVING_locate_2":"위치로 이동하기","MOVING_locate_time_1":"","MOVING_locate_time_2":"초 동안","MOVING_locate_time_3":"위치로 이동하기","MOVING_locate_x_1":"x:","MOVING_locate_x_2":"위치로 이동하기","MOVING_locate_xy_1":"x:","MOVING_locate_xy_2":"y:","MOVING_locate_xy_3":"위치로 이동하기","MOVING_locate_xy_time_1":"","MOVING_locate_xy_time_2":"초 동안 x:","MOVING_locate_xy_time_3":"y:","MOVING_locate_xy_time_4":"위치로 이동하기","MOVING_locate_y_1":"y:","MOVING_locate_y_2":"위치로 이동하기","MOVING_move_direction_1":"이동 방향으로","MOVING_move_direction_2":"만큼 움직이기","MOVING_move_direction_angle_1":"","MOVING_move_direction_angle_2":"방향으로","MOVING_move_direction_angle_3":"만큼 움직이기","MOVING_move_x_1":"x 좌표를","MOVING_move_x_2":"만큼 바꾸기","MOVING_move_xy_time_1":"","MOVING_move_xy_time_2":"초 동안 x:","MOVING_move_xy_time_3":"y:","MOVING_move_xy_time_4":"만큼 움직이기","MOVING_move_y_1":"y 좌표를","MOVING_move_y_2":"만큼 바꾸기","MOVING_rotate_by_angle_1":"오브젝트를","MOVING_rotate_by_angle_2":"만큼 회전하기","MOVING_rotate_by_angle_dropdown_1":"","MOVING_rotate_by_angle_dropdown_2":"만큼 회전하기","MOVING_rotate_by_angle_time_1":"오브젝트를","MOVING_rotate_by_angle_time_2":"초 동안","MOVING_rotate_by_angle_time_3":"만큼 회전하기","MOVING_rotate_direction_1":"이동 방향을","MOVING_rotate_direction_2":"만큼 회전하기","MOVING_see_angle_1":"이동 방향을","MOVING_see_angle_2":"(으)로 정하기","MOVING_see_angle_direction_1":"오브젝트를","MOVING_see_angle_direction_2":"(으)로 정하기","MOVING_see_angle_object_1":"","MOVING_see_angle_object_2":"쪽 바라보기","MOVING_see_direction_1":"","MOVING_see_direction_2":"쪽 보기","MOVING_set_direction_by_angle_1":"방향을","MOVING_set_direction_by_angle_2":"(으)로 정하기","MOVING_add_direction_by_angle_1":"방향을","MOVING_add_direction_by_angle_2":"만큼 회전하기","MOVING_add_direction_by_angle_time_1":"방향을","MOVING_add_direction_by_angle_time_2":"초 동안","MOVING_add_direction_by_angle_time_3":"만큼 회전하기","no_target":"대상없음","oneself":"자신","opacity":"불투명도","SCENE":"장면","SOUND":"소리","SOUND_sound_silent_all":"모든 소리 멈추기","SOUND_sound_something_1":"소리","SOUND_sound_something_2":"재생하기","SOUND_sound_something_second_1":"소리","SOUND_sound_something_second_2":"","SOUND_sound_something_second_3":"초 재생하기","SOUND_sound_something_second_wait_1":"소리","SOUND_sound_something_second_wait_2":"","SOUND_sound_something_second_wait_3":"초 재생하고 기다리기","SOUND_sound_something_wait_1":"소리 ","SOUND_sound_something_wait_2":"재생하고 기다리기","SOUND_sound_volume_change_1":"소리 크기를","SOUND_sound_volume_change_2":"% 만큼 바꾸기","SOUND_sound_volume_set_1":"소리 크기를","SOUND_sound_volume_set_2":"% 로 정하기","speak":"말하기","START":"시작","START_add_message":"신호 추가하기","START_delete_message":"신호 삭제하기","START_message_cast":"신호 보내기","START_message_cast_1":"","START_message_cast_2":"신호 보내기","START_message_cast_wait":"신호 보내고 기다리기","START_message_send_wait_1":"","START_message_send_wait_2":"신호 보내고 기다리기","START_mouse_click_cancled":"마우스 클릭을 해제했을 때","START_mouse_clicked":"마우스를 클릭했을 때","START_press_some_key_1":"","START_press_some_key_2":"키를 눌렀을 때","START_press_some_key_down":"아래쪽 화살표","START_press_some_key_enter":"엔터","START_press_some_key_left":"왼쪽 화살표","START_press_some_key_right":"오른쪽 화살표","START_press_some_key_space":"스페이스","START_press_some_key_up":"위쪽 화살표","START_when_message_cast":"신호를 받았을 때","START_when_message_cast_1":"","START_when_message_cast_2":"신호를 받았을 때","START_when_object_click":"오브젝트를 클릭했을 때","START_when_object_click_canceled":"오브젝트 클릭을 해제했을 때","START_when_run_button_click":"시작하기 버튼을 클릭했을 때","START_when_scene_start":"장면이 시작했을때","START_when_some_key_click":"키를 눌렀을 때","TEXT":"글상자","TEXT_text":"엔트리","TEXT_text_append_1":"","TEXT_text_append_2":"라고 뒤에 이어쓰기","TEXT_text_flush":"텍스트 모두 지우기","TEXT_text_prepend_1":"","TEXT_text_prepend_2":"라고 앞에 추가하기","TEXT_text_write_1":"","TEXT_text_write_2":"라고 글쓰기","VARIABLE":"자료","VARIABLE_add_value_to_list":"항목을 리스트에 추가하기","VARIABLE_add_value_to_list_1":"","VARIABLE_add_value_to_list_2":"항목을","VARIABLE_add_value_to_list_3":"에 추가하기","VARIABLE_ask_and_wait_1":"","VARIABLE_ask_and_wait_2":"을(를) 묻고 대답 기다리기","VARIABLE_change_value_list_index":"항목을 바꾸기","VARIABLE_change_value_list_index_1":"","VARIABLE_change_value_list_index_3":"번째 항목을","VARIABLE_change_value_list_index_2":"  ","VARIABLE_change_value_list_index_4":"(으)로 바꾸기","VARIABLE_change_variable":"변수 더하기","VARIABLE_change_variable_1":"","VARIABLE_change_variable_2":"에","VARIABLE_change_variable_3":"만큼 더하기","VARIABLE_change_variable_name":"변수 이름 바꾸기","VARIABLE_combine_something_1":"","VARIABLE_combine_something_2":"과(와)","VARIABLE_combine_something_3":"를 합치기","VARIABLE_get_canvas_input_value":" 대답 ","VARIABLE_get_variable":"변수","VARIABLE_get_variable_1":"값","VARIABLE_get_variable_2":"값","VARIABLE_get_y":"Y 좌푯값","VARIABLE_hide_list":"리스트 숨기기","VARIABLE_hide_list_1":"리스트","VARIABLE_hide_list_2":"숨기기","VARIABLE_hide_variable":"변수값 숨기기","VARIABLE_hide_variable_1":"변수","VARIABLE_hide_variable_2":"숨기기","VARIABLE_insert_value_to_list":"항목을 넣기","VARIABLE_insert_value_to_list_1":"","VARIABLE_insert_value_to_list_2":"을(를)","VARIABLE_insert_value_to_list_3":"의","VARIABLE_insert_value_to_list_4":"번째에 넣기","VARIABLE_length_of_list":"리스트의 길이","VARIABLE_length_of_list_1":"","VARIABLE_length_of_list_2":" 항목 수","VARIABLE_list":"리스트","VARIABLE_make_variable":"변수 만들기","VARIABLE_list_option_first":"첫번째","VARIABLE_list_option_last":"마지막","VARIABLE_list_option_random":"무작위","VARIABLE_remove_value_from_list":"항목을 삭제하기","VARIABLE_remove_value_from_list_1":"","VARIABLE_remove_value_from_list_2":"번째 항목을","VARIABLE_remove_value_from_list_3":"에서 삭제하기","VARIABLE_remove_variable":"변수 삭제","VARIABLE_set_variable":"변수 정하기","VARIABLE_set_variable_1":"","VARIABLE_set_variable_2":"를","VARIABLE_set_variable_3":"로 정하기","VARIABLE_show_list":"리스트 보이기","VARIABLE_show_list_1":"리스트","VARIABLE_show_list_2":"보이기","VARIABLE_show_variable":"변수값 보이기","VARIABLE_show_variable_1":"변수","VARIABLE_show_variable_2":"보이기","VARIABLE_value_of_index_from_list":"리스트 항목의 값","VARIABLE_value_of_index_from_list_1":"","VARIABLE_value_of_index_from_list_2":"의","VARIABLE_value_of_index_from_list_3":"번째 항목","HAMSTER_hand_found":"손 찾음?","HAMSTER_sensor_leftProximity":"왼쪽 근접 센서","HAMSTER_sensor_rightProximity":"오른쪽 근접 센서","HAMSTER_sensor_leftFloor":"왼쪽 바닥 센서","HAMSTER_sensor_rightFloor":"오른쪽 바닥 센서","HAMSTER_sensor_accelerationX":"x축 가속도","HAMSTER_sensor_accelerationY":"y축 가속도","HAMSTER_sensor_accelerationZ":"z축 가속도","HAMSTER_sensor_light":"밝기","HAMSTER_sensor_temperature":"온도","HAMSTER_sensor_signalStrength":"신호 세기","HAMSTER_sensor_inputA":"입력 A","HAMSTER_sensor_inputB":"입력 B","HAMSTER_move_forward_once":"말판 앞으로 한 칸 이동하기","HAMSTER_turn_once_1":"말판","HAMSTER_turn_once_2":"으로 한 번 돌기","HAMSTER_move_forward":"앞으로 이동하기","HAMSTER_move_backward":"뒤로 이동하기","HAMSTER_turn_around_1":"","HAMSTER_turn_around_2":"으로 돌기","HAMSTER_move_forward_for_secs_1":"앞으로","HAMSTER_move_forward_for_secs_2":"초 이동하기","HAMSTER_move_backward_for_secs_1":"뒤로","HAMSTER_move_backward_for_secs_2":"초 이동하기","HAMSTER_turn_for_secs_1":"","HAMSTER_turn_for_secs_2":"으로","HAMSTER_turn_for_secs_3":"초 돌기","HAMSTER_change_both_wheels_by_1":"왼쪽 바퀴","HAMSTER_change_both_wheels_by_2":"오른쪽 바퀴","HAMSTER_change_both_wheels_by_3":"만큼 바꾸기","HAMSTER_set_both_wheels_to_1":"왼쪽 바퀴","HAMSTER_set_both_wheels_to_2":"오른쪽 바퀴","HAMSTER_set_both_wheels_to_3":"(으)로 정하기","HAMSTER_change_wheel_by_1":"","HAMSTER_change_wheel_by_2":"바퀴","HAMSTER_change_wheel_by_3":"만큼 바꾸기","HAMSTER_set_wheel_to_1":"","HAMSTER_set_wheel_to_2":"바퀴","HAMSTER_set_wheel_to_3":"(으)로 정하기","HAMSTER_follow_line_using_1":"","HAMSTER_follow_line_using_2":"선을","HAMSTER_follow_line_using_3":"바닥 센서로 따라가기","HAMSTER_follow_line_until_1":"","HAMSTER_follow_line_until_2":"선을 따라","HAMSTER_follow_line_until_3":"교차로까지 이동하기","HAMSTER_set_following_speed_to_1":"선 따라가기 속도를","HAMSTER_set_following_speed_to_2":"(으)로 정하기","HAMSTER_front":"앞쪽","HAMSTER_rear":"뒤쪽","HAMSTER_stop":"정지하기","HAMSTER_set_led_to_1":"","HAMSTER_set_led_to_2":"LED를","HAMSTER_set_led_to_3":"으로 정하기","HAMSTER_clear_led_1":"","HAMSTER_clear_led_2":"LED 끄기","HAMSTER_color_cyan":"하늘색","HAMSTER_color_magenta":"보라색","HAMSTER_color_black":"검은색","HAMSTER_beep":"삐 소리내기","HAMSTER_change_buzzer_by_1":"버저 음을","HAMSTER_change_buzzer_by_2":"만큼 바꾸기","HAMSTER_set_buzzer_to_1":"버저 음을","HAMSTER_set_buzzer_to_2":"(으)로 정하기","HAMSTER_clear_buzzer":"버저 끄기","HAMSTER_play_note_for_1":"","HAMSTER_play_note_for_2":"","HAMSTER_play_note_for_3":"음을","HAMSTER_play_note_for_4":"박자 연주하기","HAMSTER_rest_for_1":"","HAMSTER_rest_for_2":"박자 쉬기","HAMSTER_change_tempo_by_1":"연주 속도를","HAMSTER_change_tempo_by_2":"만큼 바꾸기","HAMSTER_set_tempo_to_1":"연주 속도를","HAMSTER_set_tempo_to_2":"BPM으로 정하기","HAMSTER_set_port_to_1":"포트","HAMSTER_set_port_to_2":"를","HAMSTER_set_port_to_3":"으로 정하기","HAMSTER_change_output_by_1":"출력","HAMSTER_change_output_by_2":"를","HAMSTER_change_output_by_3":"만큼 바꾸기","HAMSTER_set_output_to_1":"출력","HAMSTER_set_output_to_2":"를","HAMSTER_set_output_to_3":"(으)로 정하기","HAMSTER_port_a":"A","HAMSTER_port_b":"B","HAMSTER_port_ab":"A와 B","HAMSTER_analog_input":"아날로그 입력","HAMSTER_digital_input":"디지털 입력","HAMSTER_servo_output":"서보 출력","HAMSTER_pwm_output":"PWM 출력","HAMSTER_digital_output":"디지털 출력","ALBERT_hand_found":"손 찾음?","ALBERT_sensor_leftProximity":"왼쪽 근접 센서","ALBERT_sensor_rightProximity":"오른쪽 근접 센서","ALBERT_sensor_light":"밝기","ALBERT_sensor_battery":"배터리","ALBERT_sensor_signalStrength":"신호 세기","ALBERT_sensor_frontOid":"앞쪽 OID","ALBERT_sensor_backOid":"뒤쪽 OID","ALBERT_sensor_positionX":"x 위치","ALBERT_sensor_positionY":"y 위치","ALBERT_sensor_orientation":"방향","ALBERT_move_forward":"앞으로 이동하기","ALBERT_move_backward":"뒤로 이동하기","ALBERT_turn_around_1":"","ALBERT_turn_around_2":"으로 돌기","ALBERT_move_forward_for_secs_1":"앞으로","ALBERT_move_forward_for_secs_2":"초 이동하기","ALBERT_move_backward_for_secs_1":"뒤로","ALBERT_move_backward_for_secs_2":"초 이동하기","ALBERT_turn_for_secs_1":"","ALBERT_turn_for_secs_2":"으로","ALBERT_turn_for_secs_3":"초 돌기","ALBERT_change_both_wheels_by_1":"왼쪽 바퀴","ALBERT_change_both_wheels_by_2":"오른쪽 바퀴","ALBERT_change_both_wheels_by_3":"만큼 바꾸기","ALBERT_set_both_wheels_to_1":"왼쪽 바퀴","ALBERT_set_both_wheels_to_2":"오른쪽 바퀴","ALBERT_set_both_wheels_to_3":"(으)로 정하기","ALBERT_change_wheel_by_1":"","ALBERT_change_wheel_by_2":"바퀴","ALBERT_change_wheel_by_3":"만큼 바꾸기","ALBERT_set_wheel_to_1":"","ALBERT_set_wheel_to_2":"바퀴","ALBERT_set_wheel_to_3":"(으)로 정하기","ALBERT_stop":"정지하기","ALBERT_set_pad_size_to_1":"패드 크기를 폭","ALBERT_set_pad_size_to_2":"높이","ALBERT_set_pad_size_to_3":"(으)로 정하기","ALBERT_set_eye_to_1":"","ALBERT_set_eye_to_2":"눈을","ALBERT_set_eye_to_3":"으로 정하기","ALBERT_clear_eye_1":"","ALBERT_clear_eye_2":"눈 끄기","ALBERT_body_led_1":"몸통 LED","ALBERT_body_led_2":"","ALBERT_front_led_1":"앞쪽 LED","ALBERT_front_led_2":"","ALBERT_color_cyan":"하늘색","ALBERT_color_magenta":"보라색","ALBERT_beep":"삐 소리내기","ALBERT_change_buzzer_by_1":"버저 음을","ALBERT_change_buzzer_by_2":"만큼 바꾸기","ALBERT_set_buzzer_to_1":"버저 음을","ALBERT_set_buzzer_to_2":"(으)로 정하기","ALBERT_clear_buzzer":"버저 끄기","ALBERT_play_note_for_1":"","ALBERT_play_note_for_2":"","ALBERT_play_note_for_3":"음을","ALBERT_play_note_for_4":"박자 연주하기","ALBERT_rest_for_1":"","ALBERT_rest_for_2":"박자 쉬기","ALBERT_change_tempo_by_1":"연주 속도를","ALBERT_change_tempo_by_2":"만큼 바꾸기","ALBERT_set_tempo_to_1":"연주 속도를","ALBERT_set_tempo_to_2":"BPM으로 정하기","VARIABLE_variable":"변수","wall":"벽","robotis_common_case_01":"(을)를","robotis_common_set":"(으)로 정하기","robotis_common_value":"값","robotis_common_clockwhise":"시계방향","robotis_common_counter_clockwhise":"반시계방향","robotis_common_wheel_mode":"회전모드","robotis_common_joint_mode":"관절모드","robotis_common_red_color":"빨간색","robotis_common_green_color":"녹색","robotis_common_blue_color":"파란색","robotis_common_on":"켜기","robotis_common_off":"끄기","robotis_common_cm":"제어기","robotis_common_port_1":"포트 1","robotis_common_port_2":"포트 2","robotis_common_port_3":"포트 3","robotis_common_port_4":"포트 4","robotis_common_port_5":"포트 5","robotis_common_port_6":"포트 6","robotis_common_play_buzzer":"연주","robotis_common_play_motion":"실행","robotis_common_motion":"모션","robotis_common_index_number":"번","robotis_cm_custom":"직접입력 주소","robotis_cm_spring_left":"왼쪽 접촉 센서","robotis_cm_spring_right":"오른쪽 접촉 센서","robotis_cm_led_left":"왼쪽 LED","robotis_cm_led_right":"오른쪽 LED","robotis_cm_led_both":"양 쪽 LED","robotis_cm_switch":"선택 버튼 상태","robotis_cm_user_button":"사용자 버튼 상태","robotis_cm_sound_detected":"최종 소리 감지 횟수","robotis_cm_sound_detecting":"실시간 소리 감지 횟수","robotis_cm_ir_left":"왼쪽 적외선 센서","robotis_cm_ir_right":"오른쪽 적외선 센서","robotis_cm_calibration_left":"왼쪽 적외선 센서 캘리브레이션 값","robotis_cm_calibration_right":"오른쪽 적외선 센서 캘리브레이션 값","robotis_cm_clear_sound_detected":"최종소리감지횟수 초기화","robotis_cm_buzzer_index":"음계값","robotis_cm_buzzer_melody":"멜로디","robotis_cm_led_1":"1번 LED","robotis_cm_led_4":"4번 LED","robotis_aux_servo_position":"서보모터 위치","robotis_aux_ir":"적외선센서","robotis_aux_touch":"접촉센서","robotis_aux_brightness":"조도센서(CDS)","robotis_aux_hydro_themo_humidity":"온습도센서(습도)","robotis_aux_hydro_themo_temper":"온습도센서(온도)","robotis_aux_temperature":"온도센서","robotis_aux_ultrasonic":"초음파센서","robotis_aux_magnetic":"자석센서","robotis_aux_motion_detection":"동작감지센서","robotis_aux_color":"컬러센서","robotis_aux_custom":"사용자 장치","robotis_carCont_aux_motor_speed_1":"감속모터 속도를","robotis_carCont_aux_motor_speed_2":", 출력값을","robotis_carCont_calibration_1":"적외선 센서 캘리브레이션 값을","robotis_openCM70_aux_motor_speed_1":"감속모터 속도를","robotis_openCM70_aux_motor_speed_2":", 출력값을","robotis_openCM70_aux_servo_mode_1":"서보모터 모드를","robotis_openCM70_aux_servo_speed_1":"서보모터 속도를","robotis_openCM70_aux_servo_speed_2":", 출력값을","robotis_openCM70_aux_servo_position_1":"서보모터 위치를","robotis_openCM70_aux_led_module_1":"LED 모듈을","robotis_openCM70_aux_custom_1":"사용자 장치를","XBOT_digital":"디지털","XBOT_D2_digitalInput":"D2 디지털 입력","XBOT_D3_digitalInput":"D3 디지털 입력","XBOT_D11_digitalInput":"D11 디지털 입력","XBOT_analog":"아날로그","XBOT_CDS":"광 센서 값","XBOT_MIC":"마이크 센서 값","XBOT_analog0":"아날로그 0번 핀 값","XBOT_analog1":"아날로그 1번 핀 값","XBOT_analog2":"아날로그 2번 핀 값","XBOT_analog3":"아날로그 3번 핀 값","XBOT_Value":"출력 값","XBOT_pin_OutputValue":"핀, 출력 값","XBOT_High":"높음","XBOT_Low":"낮음","XBOT_Servo":"서보 모터","XBOT_Head":"머리(D8)","XBOT_ArmR":"오른 팔(D9)","XBOT_ArmL":"왼 팔(D10)","XBOT_angle":", 각도","XBOT_DC":"바퀴(DC) 모터","XBOT_rightWheel":"오른쪽","XBOT_leftWheel":"왼쪽","XBOT_bothWheel":"양쪽","XBOT_speed":", 속도","XBOT_rightSpeed":"바퀴(DC) 모터 오른쪽(2) 속도:","XBOT_leftSpeed":"왼쪽(1) 속도:","XBOT_RGBLED_R":"RGB LED 켜기 R 값","XBOT_RGBLED_G":"G 값","XBOT_RGBLED_B":"B 값","XBOT_RGBLED_color":"RGB LED 색","XBOT_set":"로 정하기","XBOT_c":"도","XBOT_d":"레","XBOT_e":"미","XBOT_f":"파","XBOT_g":"솔","XBOT_a":"라","XBOT_b":"시","XBOT_melody_ms":"초 연주하기","XBOT_Line":"번째 줄","XBOT_outputValue":"출력 값","CALC_rotation_value":"방향값","CALC_direction_value":"이동 방향값","VARIABLE_is_included_in_list":"리스트에 포함되어 있는가?","VARIABLE_is_included_in_list_1":"","VARIABLE_is_included_in_list_2":"에","VARIABLE_is_included_in_list_3":"이 포함되어 있는가?","SCENE_when_scene_start":"장면이 시작되었을때","SCENE_start_scene_1":"","SCENE_start_scene_2":"시작하기","SCENE_start_neighbor_scene_1":"","SCENE_start_neighbor_scene_2":"장면 시작하기","SCENE_start_scene_pre":"이전","SCENE_start_scene_next":"다음","FUNCTION_explanation_1":"이름","FUNCTION_character_variable":"문자/숫자값","FUNCTION_logical_variable":"판단값","FUNCTION_function":"함수","FUNCTION_define":"함수 정의하기","CALC_calc_operation_sin":"사인값","CALC_calc_operation_cos":"코사인값","CALC_calc_operation_tan":"탄젠트값","CALC_calc_operation_floor":"소수점 버림값","CALC_calc_operation_ceil":"소수점 올림값","CALC_calc_operation_round":"반올림값","CALC_calc_operation_factorial":"펙토리얼값","CALC_calc_operation_asin":"아크사인값","CALC_calc_operation_acos":"아크코사인값","CALC_calc_operation_atan":"아크탄젠트값","CALC_calc_operation_log":"로그값","CALC_calc_operation_ln":"자연로그값","CALC_calc_operation_natural":"정수 부분","CALC_calc_operation_unnatural":"소수점 부분","MOVING_locate_object_time_1":"","MOVING_locate_object_time_2":"초 동안","MOVING_locate_object_time_3":"위치로 이동하기","wall_up":"위쪽 벽","wall_down":"아래쪽 벽","wall_right":"오른쪽 벽","wall_left":"왼쪽 벽","CALC_coordinate_x_value":"x 좌푯값","CALC_coordinate_y_value":"y 좌푯값","CALC_coordinate_rotation_value":"방향","CALC_coordinate_direction_value":"이동방향","CALC_picture_index":"모양 번호","CALC_picture_name":"모양 이름","FLOW_repeat_while_true_1":"","FLOW_repeat_while_true_2":" 반복하기","TUT_when_start":"프로그램 실행을 클릭했을때","TUT_move_once":"앞으로 한 칸 이동","TUT_rotate_left":"왼쪽으로 회전","TUT_rotate_right":"오른쪽으로 회전","TUT_jump_barrier":"장애물 뛰어넘기","TUT_repeat_tutorial_1":"","TUT_repeat_tutorial_2":"번 반복","TUT_if_barrier_1":"만약 앞에","TUT_if_barrier_2":" 이 있다면","TUT_if_conical_1":"만약 앞에","TUT_if_conical_2":" 이 있다면","TUT_repeat_until":"부품에 도달할 때 까지 반복","TUT_repeat_until_gold":"부품에 도달할 때 까지 반복","TUT_declare_function":"함수 선언","TUT_call_function":"함수 호출","CALC_calc_operation_abs":"절댓값","CONTEXT_COPY_option":"코드 복사","Delete_Blocks":"코드 삭제","Duplication_option":"코드 복사 & 붙여넣기","Paste_blocks":"붙여넣기","Clear_all_blocks":"모든 코드 삭제하기","transparency":"투명도","BRUSH_change_brush_transparency_1":"붓의 투명도를","BRUSH_change_brush_transparency_2":"% 만큼 바꾸기","BRUSH_set_brush_transparency_1":"붓의 투명도를","BRUSH_set_brush_transparency_2":"% 로 정하기","CALC_char_at_1":"","CALC_char_at_2":"의","CALC_char_at_3":"번째 글자","CALC_length_of_string_1":"","CALC_length_of_string_2":"의 글자 수","CALC_substring_1":"","CALC_substring_2":"의","CALC_substring_3":"번째 글자부터","length_of_string":"번째 글자부터","CALC_substring_4":"번째 글자까지의 글자","CALC_replace_string_1":"","CALC_replace_string_2":"의","CALC_replace_string_3":"을(를)","CALC_replace_string_4":"로 바꾸기","CALC_change_string_case_1":"","CALC_change_string_case_2":"의","CALC_change_string_case_3":" ","CALC_change_string_case_sub_1":"대문자","CALC_change_string_case_sub_2":"소문자","CALC_index_of_string_1":"","CALC_index_of_string_2":"에서","CALC_index_of_string_3":"의 시작 위치","MOVING_add_direction_by_angle_time_explain_1":"","MOVING_direction_relative_duration_1":"","MOVING_direction_relative_duration_2":"초 동안 이동 방향","MOVING_direction_relative_duration_3":"만큼 회전하기","CALC_get_sound_volume":" 소릿값","SOUND_sound_from_to_1":"소리","SOUND_sound_from_to_2":"","SOUND_sound_from_to_3":"초 부터","SOUND_sound_from_to_4":"초까지 재생하기","SOUND_sound_from_to_and_wait_1":"소리","SOUND_sound_from_to_and_wait_2":"","SOUND_sound_from_to_and_wait_3":"초 부터","SOUND_sound_from_to_and_wait_4":"초까지 재생하고 기다리기","CALC_quotient_and_mod_1":"","CALC_quotient_and_mod_2":"/","CALC_quotient_and_mod_3":"의","CALC_quotient_and_mod_4":"","CALC_quotient_and_mod_sub_1":"몫","CALC_quotient_and_mod_sub_2":"나머지","self":"자신","CALC_coordinate_size_value":"크기","CALC_choose_project_timer_action_1":"초시계","CALC_choose_project_timer_action_2":"","CALC_choose_project_timer_action_sub_1":"시작하기","CALC_choose_project_timer_action_sub_2":"정지하기","CALC_choose_project_timer_action_sub_3":"초기화하기","LOOKS_change_object_index_1":"","LOOKS_change_object_index_2":"보내기","LOOKS_change_object_index_sub_1":"맨 앞으로","LOOKS_change_object_index_sub_2":"앞으로","LOOKS_change_object_index_sub_3":"뒤로","LOOKS_change_object_index_sub_4":"맨 뒤로","FLOW_repeat_while_true_until":"이 될 때까지","FLOW_repeat_while_true_while":"인 동안","copy_block":"블록 복사","delete_block":"블록 삭제","tidy_up_block":"코드 정리하기","block_hi":"안녕!","entry_bot_name":"엔트리봇","hi_entry":"안녕 엔트리!","hi_entry_en":"Hello Entry!","bark_dog":"강아지 짖는 소리","walking_entryBot":"엔트리봇_걷기","entry":"엔트리","hello":"안녕","nice":"반가워"};Lang.Buttons={"apply":"적용하기","cancel":"취소","save":"확인","start":"시작","confirm":"확인","delete":"삭제","create":"학급 만들기","done":"완료","accept":"수락","refuse":"거절","yes":"예","button_no":"아니오"};Lang.ko="한국어";Lang.Menus={"no_results_found":"검색 결과가 없습니다.","upload_pdf":"PDF 자료 업로드","select_basic_project":"작품 선택하기","try_it_out":"만들어 보기","go_boardgame":"엔트리봇 보드게임 바로가기","go_cardgame":"엔트리봇 카드게임 바로가기","go_solve":"미션으로 학습하기","go_ws":"엔트리 만들기 바로가기","go_arts":"엔트리 공유하기 바로가기","open_only_shared_lecture":"<b>오픈 강의</b> 페이지에 <b><공개></b> 한 강의만 불러올 수 있습니다. 불러오고자 하는 <b>강의</b>의 <b>공개여부</b>를 확인해 주세요.","already_exist_group":"이미 존재하는 학급 입니다.","cannot_invite_you":"자기 자신을 초대할 수 없습니다.","apply_original_image":"원본 이미지 그대로 적용하기","draw_new_ques":"새로 그리지 페이지로\n이동하시겠습니까?","draw_new_go":"이동하기","draw_new_stay":"이동하지 않기","file_upload_desc_1":"이런 그림은 \n 안돼요!","file_upload_desc_2":"피가 보이고 잔인한 그림","file_upload_desc_3":"선정적인 신체노출의 그림","file_upload_desc_4":"욕이나 저주 등의 불쾌감을 주거나 혐오감을 일으키는 그림","file_upload_desc_5":"* 위와 같은 내용은 이용약관 및 관련 법률에 의해 제재를 받으실 수 있습니다.","lesson_by_teacher":"선생님들이 직접 만드는 강의입니다.","delete_group_art":"학급 공유하기 목록에서 삭제 하시겠습니까?","elementary_short":"초등","middle_short":"중등","edit_share_set_course":"강의 모음 공개범위 수정","share_lesson":"강의 공유하기","share_course":"강의 모음 공유하기","from_list_ko":"을(를)","edit_share_set_lesson":"강의 공개범위 수정","comming_soon":"준비중입니다.","no_class_alert":"선택된 학급이 없습니다. 학급이 없는경우 '나의 학급' 메뉴에서 학급을 만들어 주세요.","students_cnt":"명","defult_class_alert_1":"","defult_class_alert_2":"을(를) \n 기본학급으로 설정하시겠습니까?","default_class":"기본학급입니다.","enter_hw_name":"과제의 제목을 입력해 주세요.","hw_limit_20":"과제는 20개 까지만 만들수 있습니다.","stu_example":"예)\n 홍길동\n 홍길동\n 홍길동","hw_description_limit_200":"생성 과제에 대한 안내 사항을 입력해 주세요. (200자 이내)","hw_title_limit_50":"과제명을 입력해 주세요. (50자 이내)","create_project_class_1":"'만들기 > 작품 만들기' 에서","create_project_class_2":"학급에 공유하고 싶은 작품을 만들어 주세요.","create_lesson_assignment_1":"'만들기> 오픈 강의 만들기'에서 ","create_lesson_assignment_2":"우리 반 과제에 추가하고 싶은 강의를 만들어 주세요.","i_make_lesson":"내가 만드는 강의","lesson_to_class_1":"'학습하기>오픈 강의'에서 우리반","lesson_to_class_2":"과제에 추가하고 싶은 강의를 관심강의로 등록해 주세요.","studying_students":"학습자","lessons_count":"강의수","group_out":"나가기","enter_group_code":"학급코드 입력하기","no_group_invite":"학급 초대가 없습니다.","done_create_group":"개설이 완료되었습니다.","set_default_group":"기본학급 설정","edit_group_info":"학급 정보 관리","edit_done":"수정 완료되었습니다.","alert_group_out":"학급을 정말 나가시겠습니까?","lesson_share_cancel":"강의 공유 취소","lesson_share_cancel_alert":"이(가) 공유된 모든 공간에서 공유를 취소하고 <나만보기>로 변경하시겠습니까? ","lesson_share_cancel_alert_en":"","course_share_cancel":"강의 모음 공유 취소","select_lesson_share":"강의 공유 선택","select_lesson_share_policy_1":"강의를 공유할 공간과","select_lesson_share_policy_2":"저작권 정책을 확인해 주세요.","select_lesson_share_area":"강의 공유 공간을 선택해 주세요","lesson_share_policy":"강의 공유에 따른 엔트리 저작권 정책 동의","alert_agree_share":"공개하려면 엔트리 저작물 정책에 동의하여야 합니다.","alert_agree_all":"모든 항목에 동의해 주세요.","select_course_share":"강의 모음 공유 선택","select_course_share_policy_1":"강의 모음을 공유할 공간과","select_course_share_policy_2":"저작권 정책을 확인해 주세요.","select_course_share_area":"강의 모음 공유 공간을 선택해 주세요","course_share_policy":"강의 모음 공유에 따른 엔트리 저작권 정책 동의","issued":"발급","code_expired":"코드가 만료되었습니다. '코드재발급' 버튼를 누르세요.","accept_class_invite":"학급초대 수락하기","welcome_class":"학급에 오신것을 환영합니다.","enter_info":"자신의 정보를 입력해주세요.","done_group_signup":"학급 가입이 완료되었습니다.","enter_group_code_stu":"선생님께 받은 코드를 입력해주세요.","text_limit_50":"50글자 이하로 작성해 주세요.","enter_class_name":"학급 이름을 입력해 주세요.","enter_grade":"학년을 입력해 주세요.","enter_class_info":"학급소개를 입력해 주세요.","student_dup":"은(는) 이미 학급에 존재합니다.","select_stu_print":"출력할 학생을 선택하세요.","class_id_not_exist":"학급 ID가 존재하지 않습니다.","error_try_again":"오류 발생. 다시 한 번 시도해 주세요.","code_not_available":"유효하지 않은 코드입니다.","gnb_create_lessons":"오픈 강의 만들기","study_lessons":"강의 학습하기","lecture_help_1":"학습을 시작할 때, 사용할 작품을 선택해 주세요.<br>선택한 작품으로 학습자가 학습을 시작하게 됩니다.","lecture_help_2":"이도움말을 다시 보시려면<br>위 버튼을 클릭해 주세요.","lecture_help_3":"오브젝트 추가하기가 없으면<br>새로운 오브젝트를 추가하거나 삭제 할 수 없습니다.","lecture_help_4":"학습도중에 PDF자료보기를 통해<br>학습에 도움을 받을 수 있습니다.","lecture_help_5":"학습에 필요한 블록들만 선택해주세요.<br>선택하지 않은 블록은 숨겨집니다.","only_pdf":".pdf형식의 파일만 입력 가능합니다.","enter_project_video":"적어도 하나의 작품이나 영상을 입력하세요.","enter_title":"제목을 입력하세요.","enter_recommanded_grade":"추천 학년을 입력하세요.","enter_level_diff":"난이도를 입력하세요.","enter_time_spent":"소요시간을 입력하세요.","enter_shared_area":"적어도 하나의 공유 공간을 선택하세요.","enter_goals":"학습목표를 입력하세요.","enter_lecture_description":"강의 설명을 입력하세요.","enter_curriculum_description":"강의 모음 설명을 입력하세요.","first_page":"처음 입니다.","last_page":"마지막 페이지 입니다.","alert_duplicate_lecture":"이미 등록된 강의는 다시 등록할 수 없습니다.","enter_lesson_alert":"하나 이상의 강의를 등록해주세요.","open_edit_lessons":"편집할 강의를 불러오세요.","saved_alert":"이(가) 저장되었습니다.","select_lesson_type":"어떤 학습과정을 만들지 선택해 주세요 ","create_lesson":"강의 만들기","create_lesson_desc_1":"원하는 학습 목표에 맞춰","create_lesson_desc_2":"단일 강의를 만들어","create_lesson_desc_3":"학습에 활용합니다.","create_courseware":"강의 모음 만들기","create_courseware_desc_1":"학습 과정에 맞춰 여러개의 강의를","create_courseware_desc_2":"하나의 코스로 만들어","create_courseware_desc_3":"학습에 활용합니다.","create_open_lesson":"오픈 강의 만들기 ","enter_lesson_info":"강의 정보 입력 ","select_lesson_feature":"학습 기능 선택 ","check_info_entered":"입력 정보 확인 ","enter_lefo_lesson_long":"강의를 구성하는 정보를 입력해 주세요.","lesson_info_desc":"학습자가 학습하기 화면에서 사용할 기능과 작품을 선택함으로써, 학습 목표와 내용에 최적화된 학습환경을 구성할 수 있습니다.","provide_only_used":"완성된 작품에서 사용된 기능만 불러오기","see_help":"도움말 보기","select_done_project_1":"학습자가 목표로 설정할","select_done_project_2":"완성 작품","select_done_project_3":"을 선택해 주세요.","select_project":"나의 작품 또는 관심 작품을 불러옵니다. ","youtube_desc":"유투브 공유 링크를 통해 원하는 영상을 넣을 수 있습니다.","lesson_video":"강의 영상","lesson_title":"강의 제목","recommended_grade":"추천학년","selection_ko":"선택","selection_en":"","level_of_diff":"난이도","select_level_of_diff":"난이도 선택","enter_lesson_title":"강의 제목을 입력해 주세요(30자 이내)","select_time_spent":"소요시간 선택 ","time_spent":"소요시간","lesson_overview":"강의설명","upload_materials":"학습 자료 업로드","open":"불러오기","cancel":"취소하기","upload_lesson_video":"강의 영상 업로드","youtube_upload_desc":"유투브 공유링크를 통해 보조영상을 삽입할 수 있습니다. ","cancel_select":"선택 취소하기","select_again":"다시 선택하기","goal_project":"완성작품","upload_study_data":"학습하기 화면에서 볼 수 있는 학습자료를 업로드해주세요. 학습자가 업로드된 학습자료의 내용을 확인하며 학습할 수 있습니다. ","upload_limit_20mb":"20MB 이하의 파일을 올려주세요.","expect_time":"예상 소요 시간","course_videos":"보조 영상","enter_courseware_info":"강의 모음 정보 입력 ","enter_course_info":"강의 모음을 소개하는 정보를 입력해 주세요 ","select_lessons_for_course":"강의 모음을 구성하는 강의를 선택해 주세요.","course_build_desc_1":"강의는","course_build_desc_2":"최대30개","course_build_desc_3":"등록할 수 있습니다.","lseeon_list":"강의 목록 보기","open_lessons":"강의 불러오기","course_title":"강의 모음 제목","title_limit_30":"강의 모음 제목을 입력해 주세요(30자 이내) ","course_overview":"강의 모음 설명","charactert_limit_200":"200자 이내로 작성할 수 있습니다.","edit_lesson":"강의 편집","courseware_by_teacher":"선생님들이 직접 만드는 강의 모음입니다.","select_lessons":"구성 강의 선택","check_course_info":"강의 모음을 구성하는 정보가 올바른지 확인해 주세요.","select_share_area":"공유 공간 선택","upload_sub_project":"보조 프로젝트 업로드","file_download":"첨부파일 다운로드","check_lesson_info":"강의를 구성하는 정보가 올바른지 확인해 주세요.","share_area":"공유 공간","enter_sub_project":"엔트리 보조 프로젝트를 등록해 주세요.","lms_hw_title":"과제 제목","lms_hw_ready":"준비","lms_hw_progress":"진행중","lms_hw_complete":"완료","lms_hw_not_submit":"미제출","lms_hw_closed":"제출마감","submission_condition":"진행중인 과제만 제출이 가능합니다.","submit_students_only":"학생만 과제를 제출할 수 있습니다.","want_submit_hw":"과제를 제출하시겠습니까?","enter_correct_id":"올바른 아이디를 입력해 주세요.","id_not_exist":"아이디가 존재하지 않습니다. ","agree_class_policy":"학급 서비스 이용약관에 동의해 주세요.","delete_class":"학급 삭제","type_stu_name":"학생 이름을 입력해주세요. ","invite_from_1":"에서","invite_from_2":"님을 초대하였습니다. ","lms_pw_alert_1":"학급에 소속되면, 선생님 권한으로","lms_pw_alert_2":"비밀번호 재발급이 가능합니다.","lms_pw_alert_3":"선생님의 초대가 맞는지 한번 더 확인해주세요.","invitation_accepted":"초대 수락이 완료되었습니다!","cannot_issue_pw":"초대를 수락하지 않았으므로 비밀번호를 발급할 수 없습니다.","start_me":"<월간 엔트리>와 함께 SW교육을 시작해보세요!","monthly_desc_1":"<월간 엔트리>는 소프트웨어 교육에 익숙하지 않은 선생님들도 쉽고 재미있게","monthly_desc_2":"소프트웨어 교육을 하실 수 있도록 만들어진 SW교육 잡지입니다.","monthly_desc_3":"매월 재미있는 학습만화와 함께 하는 SW 교육 컨텐츠를 만나보세요!","sw_lead_school":"SW 선도・연구학교라면?","me_subscribe":"구독 신청","pizza_event":"피자 이벤트 참여","event_confirm":"이벤트 당첨 확인","monthly_entry":"월간 엔트리","me_desc_1":"매월 발간되는 무료 소프트웨어 교육잡지","me_desc_2":"월간엔트리를 만나보세요!","solve_desc_1":"게임을 하듯 미션을 해결하며","solve_desc_2":"소프트웨어의 기본 원리를 배워보세요!","playSw_desc_1":"EBS 방송영상, 특별영상을 통해","playSw_desc_2":"소프트웨어를 배워보세요!","recommended_lessons":"추천 강의모음","recommended_lessons_1":"기초부터 고급까지 교재와 함께 제공되는","recommended_lessons_2":"추천 강의모음을 만나보세요!","offline_top_desc_1":"오프라인 버전의 저장 기능이 향상되고 보안이 강화되었습니다.","offline_top_desc_2":"지금 바로 다운받으세요","offline_main_desc":"엔트리 오프라인 에디터 업데이트!!","art_description":"엔트리로 만든 작품을 공유하는 공간입니다. 작품을 만들고 공유에 참여해 보세요.","study_index":"엔트리에서 제공하는 주제별, 학년별 학습과정을 통해 차근차근 소프트웨어를 배워보세요!","study_for_beginner":"처음 시작하는 사람들을 위한 엔트리 학습과정","entrybot_desc_3":"안내에 따라 블록 명령어를 조립하여","entrybot_desc_4":"엔트리봇을 학교에 데려다 주세요.","move_entrybot":"엔트리봇 움직이기","can_change_entrybot_1":"블록 명령어로 엔트리봇의 색을 바꾸거나","can_change_entrybot_2":"말을 하게 할 수도 있어요.","learning_process_by_topics":"주제별 학습과정","show_detail":"자세히 보기","solve_mission":"미션 해결하기","solve_mission_desc_1":"게임을 하듯 미션을 해결하며 프로그래밍의 원리를 익혀보세요!","solve_mission_desc_2":"미로 속의 엔트리봇을 목적지까지 움직이며 순차, 반복, 선택, 비교연산, 함수 등의 개념을 자연스럽게 익힐 수 있어요.","learning_process_by_grades":"학년별 추천 학습과정","e3_to_e4":"초등 3-4학년","e5_to_e6":"초등 5-6학년","m1_to_m3":"중등 이상","make_using_entry":"엔트리로 만들기","make_using_entry_desc_1":"블록을 쌓아 여러 가지 소프트웨어를 만들어보세요!","make_using_entry_desc_2":"제공되는 교재를 다운받아 차근차근 따라하다보면 애니메이션, 미디어아트, 게임 등 다양한 작품을 만들 수 있어요.","make_through_ebs_1":"EBS 방송영상으로 소프트웨어를 배워보세요.","make_through_ebs_2":"방송영상은 물론, 차근차근 따라 할 수 있는 특별영상과 함께 누구나 쉽게 다양한 소프트웨어를 만들 수 있어요.","support_block_js":"모든 미션에 대한 자바스크립트 언어는 8월 중 지원 예정입니다.","study_ebs_title_1":"순서대로! 차례대로!","study_ebs_desc_1":"[실습] 엔트리봇의 심부름","study_ebs_title_2":"쉽고 간단하게!","study_ebs_desc_2":"[실습] 꽃송이 만들기","study_ebs_title_3":"언제 시작할까?","study_ebs_desc_3":"[실습] 동물가족 소개","study_ebs_title_4":"다른 선택, 다른 결과!","study_ebs_desc_4":"[실습] 텔레파시 게임","study_ebs_title_5":"정보를 담는 그릇","study_ebs_desc_5":"[실습] 덧셈 로봇 만들기","study_ebs_title_6":"요모조모 따져 봐!","study_ebs_desc_6":"[실습] 복불복 룰렛","study_ebs_title_7":"번호로 부르면 편해요!","study_ebs_desc_7":"[실습] 나만의 버킷리스트","study_ebs_title_8":"무작위 프로그램을 만들어라!","study_ebs_desc_8":"[실습] 무작위 캐릭터 만들기","study_ebs_title_9":"어떻게 찾을까?","study_ebs_desc_9":"[실습] 도서관 책 검색","study_ebs_title_10":"줄을 서시오!","study_ebs_desc_10":"[실습] 키 정렬 프로그램","event":"이벤트","divide":"분기","condition":"조건","random_number":"무작위수","search":"탐색","sorting":"정렬","parallel":"병렬","signal":"신호","input_output":"입출력","sequential":"순차","repeat":"반복","choice":"선택","repeat_advanced":"반복(횟수+조건)","function":"함수","compare_operation":"비교연산","arithmetic":"산술연산","entrybot_school":"엔트리봇 학교 가는 길","entrybot_school_desc_1":"엔트리봇이 책가방을 챙겨 학교에","entrybot_school_desc_2":"도착할 수 있도록 도와주세요!","robot_factory":"로봇 공장","robot_factory_desc_1":"로봇공장에 갇힌 엔트리봇!","robot_factory_desc_2":"탈출하기 위해 부품을 모두 모아야해요.","electric_car":"전기 자동차","electric_car_desc_1":"엔트리봇 자동차가 계속 앞으로 나아갈 수","electric_car_desc_2":"있도록 연료를 충전해 주세요.","forest_adventure":"숲속 탐험","forest_adventure_desc_1":"엔트리봇 친구가 숲속에 갇혀있네요!","forest_adventure_desc_2":"친구를 도와주세요.","town_adventure":"마을 탐험","town_adventure_desc_1":"배고픈 엔트리봇을 위해 마을에 있는","town_adventure_desc_2":"연료를 찾아주세요.","space_trip":"우주 여행","space_trip_desc_1":"우주탐사를 마친 엔트리봇!","space_trip_desc_2":"지구로 돌아갈 수 있도록 도와주세요.","learn_programming_mission":"미션을 해결하며 배우는 프로그래밍","make_open_lecture":"오픈 강의 만들기","group_created":"만든 학급","group_signup":"가입한 학급","delete_from_list":"을(를) 목록에서 삭제하시겠습니까?","delete_from_list_en":"","lecture_collection":"강의 모음","edit_mypage_profile":"자기소개 정보 관리","main_image":"메인 이미지","edit_profile_success":"반영되었습니다.","no_project_1":"내가 만든 작품이 없습니다.","no_project_2":"지금 작품 만들기를 시작해보세요!","no_marked_project_1":"관심 작품이 없습니다.","no_marked_project_2":"'작품 공유하기'에서 다양한 작품을 만나보세요!","view_project_all":"작품 구경하기","no_lecture_1":"내가 만든 강의가 없습니다.","no_lecture_2":"'오픈 강의 만들기'에서 강의를 만들어보세요!","no_marked_lecture_1":"관심 강의가 없습니다.","no_marked_lecture_2":"'오픈 강의'에서 다양한 강의를 만나보세요!","view_lecture":"강의 살펴보기","no_studying_lecture_1":"학습 중인 강의가 없습니다.","no_studying_lecture_2":"'오픈 강의'에서 학습을 시작해보세요!","no_lecture_collect_1":"내가 만든 강의 모음이 없습니다.","no_lecture_collect_2":"'오픈 강의 모음 만들기'에서 강의 모음을 만들어보세요!","make_lecture_collection":"강의 모음 만들기","no_marked_lecture_collect_1":"관심 강의 모음이 없습니다.","no_marked_lecture_collect_2":"'오픈 강의'에서 다양한 강의를 만나보세요!","view_lecture_collection":"강의 모음 살펴보기","no_studying_lecture_collect_1":"학습 중인 강의 모음이 없습니다.","no_studying_lecture_collect_2":"'오픈 강의'에서 학습을 시작해보세요!","my_lecture":"나의 강의","marked_lecture":"관심 강의","marked_lecture_collection":"나의 관심 강의 모음","studying_lecture":"학습 중인 강의","completed_lecture":"학습 완료 강의","my_lecture_collection":"나의 강의 모음","studying_lecture_collection":"학습 중인 강의 모음","completed_lecture_collection":"학습 완료한 강의 모음","materialCC":"엔트리교육연구소에서 작성된 모든 교육자료는 CC-BY 2.0 라이선스에 따라 자유롭게 이용할 수 있습니다.","pdf":"PDF","helper":"도움말","youtube":"영상","tvcast":"영상","goal":"목표","basicproject":"시작단계","hw":"하드웨어","object":"오브젝트","download_info":"모든 교육자료는 각각의 제목을 클릭 하시면 다운받으실 수 있습니다.","entry_materials_all":"엔트리 교육자료 모음","recommand_grade":"추천학년","3_4_grades":"3-4 학년","5_6_grades":"5-6 학년","middle_grades":"중학생 이상","entry_go_go":"엔트리 고고!","entry_go_go_desc":"학년별, 난이도 별로 준비된 교재를 만나보세요. 각 과정별로 교육과정, 교재, 교사용 지도자료 3종 세트가 제공됩니다.","stage_beginner":"초급","stage_middle":"중급","stage_high":"고급","middle_school_short":"중등","learn_entry_programming":"따라하며 배우는 엔트리 프로그래밍","entry_programming_desc":"차근차근 따라 하다 보면 어느새 나도 엔트리 고수!","ebs":"EBS","ebs_material_desc":"방송 영상과 교사용 지도서를 활용하여 수업을 해보세요!","season_1_material":"시즌1 교사용 지도서","season_2_material":"시즌2 교사용 지도서","compute_think_textbook":"교과서로 배우는 컴퓨팅 사고력","computational_sw":"국어, 수학, 과학, 미술... 학교에서 배우는 다양한 교과와 연계하여 sw를 배워보세요!","entry_x_hardware":"엔트리 X 하드웨어 교육자료 모음","e_sensor":"E 센서보드","arduino":"아두이노","orange_board":"오렌지보드","joystick":"오렌지보드(조이스틱)","materials_etc_all":"기타 교육자료 모음","materials_teaching":"교원 연수 자료","materials_etc":"기타 참고 자료","materials_teaching_1":"SW교육의 필요성과 교육 방법론","materials_teaching_2":"엔트리와 함께하는 언플러그드 활동","materials_teaching_3":"게임으로 배우는 엔트리 학습모드 활동","materials_teaching_4":"실생활 문제해결을 위한 엔트리 프로그래밍","materials_teaching_5":"엔트리로 시작하는 교과연계sw교육1","materials_teaching_6":"엔트리로 시작하는 교과연계sw교육2","materials_teaching_7":"피지컬 컴퓨팅 실습1(E센서보드)","materials_teaching_8":"피지컬 컴퓨팅 실습2(햄스터)","materials_teaching_9":"수업에 필요한 학급/강의 기능 알아보기","materials_etc_1":"수업에 바로 활용할 수 있는 다양한 콘텐츠 모음집","materials_etc_2":"엔트리를 처음 사용하는 선생님들을 위한 가이드","materials_etc_3":"월간 엔트리","materials_etc_4":"엔트리 설명서","materials_etc_5":"엔트리 소개 자료","materials_etc_6":"엔트리 블록 책받침","jr_if_1":"만약","jr_if_2":"앞에 있다면","jr_fail_no_pencil":"이런 그곳에는 연필이 없어. 연필이 있는 곳에서 사용해보자~","jr_fail_forgot_pencil":"앗! 책가방에 넣을 연필을 깜빡했어. 연필을 모아서 가자~","jr_fail_much_blocks":"너무많은 블록을 사용했어, 다시 도전해볼래?","cparty_jr_success_1":"좋아! 책가방을 챙겼어!","go_right":"오른쪽","go_down":"  아래쪽","go_up":"  위쪽","go_left":"  왼쪽","go_forward":"앞으로 가기","jr_turn_left":"왼쪽으로 돌기","jr_turn_right":"오른쪽으로 돌기","go_slow":"천천히 가기","repeat_until_reach_1":"만날 때 까지 반복하기","repeat_until_reach_2":"","pick_up_pencil":"연필 줍기","repeat_0":"","repeat_1":"반복","when_start_clicked":"시작 버튼을 눌렀을 때","age_0":"작품체험","create_character":"캐릭터 만들기","age_7_9":"초등 저학년","going_school":"엔트리 학교가기","age_10_12_1":"초등 고학년1","collect_parts":"로봇공장 부품모으기","age_10_12_2":"초등 고학년2","driving_elec_car":"전기자동차 운전하기","age_13":"중등","travel_space":"우주여행하기","people":"사람","all":"전체","life":"일상생활","nature":"자연","animal_insect":"동물/곤충","environment":"자연환경","things":"사물","vehicles":"이동수단","others":"기타","fantasy":"판타지","instrument":"악기","piano":"피아노","marimba":"마림바","drum":"드럼","janggu":"장구","sound_effect":"효과음","others_instrument":"기타타악기","aboutEntryDesc_1":"엔트리는 누구나 무료로 소프트웨어 교육을 받을 수 있게 개발된 소프트웨어 교육 플랫폼입니다.","aboutEntryDesc_2":"학생들은 소프트웨어를 쉽고 재미있게 배울 수 있고,","aboutEntryDesc_3":"선생님은 효과적으로 학생들을 가르치고 관리할 수 있습니다.","aboutEntryDesc_4":"엔트리는 공공재와 같이","aboutEntryDesc_5":"비영리로 운영됩니다.","viewProjectTerms":"이용정책 보기","openSourceTitle":"오픈소스를 통한 생태계 조성","openSourceDesc_1":"엔트리의 소스코드 뿐 아니라","openSourceDesc_2":"모든 교육 자료는 CC라이센스를 ","openSourceDesc_3":"적용하여 공개합니다.","viewOpenSource":"오픈소스 보기","eduPlatformTitle":"국내교육 현장에 맞는 교육 플랫폼","eduPlatformDesc_1":"국내 교육 현장에 적합한 교육 도구가","eduPlatformDesc_2":"될 수 있도록 학교 선생님들과 함께","eduPlatformDesc_3":"개발하고 있습니다.","madeWith":"자문단","researchTitle":"다양한 연구를 통한 전문성 강화","researchDesc_1":"대학/학회 등과 함께 다양한 연구를","researchDesc_2":"진행하여 전문성을 강화해나가고","researchDesc_3":"있습니다.","viewResearch":"연구자료 보기","atEntry":"엔트리에서는","entryLearnDesc_1":"재미있게 배우는 학습공간","entryLearnDesc_2":"<학습하기>에서는 컴퓨터를 활용해 논리적으로 문제를 해결할 수 있는 다양한 학습","entryLearnDesc_3":"콘텐츠가 준비되어 있습니다. 게임을 하듯이 주어진 미션들을 컴퓨터 프로그래밍으로","entryLearnDesc_4":"해결하고, 동영상을 보면서 소프트웨어의 원리를 재미있게 배울 수 있습니다.","entryMakeDesc_1":"<만들기>에서는 미국 MIT에서 개발한 Scratch와 같은 블록형 프로그래밍 언어를","entryMakeDesc_2":"사용하여 처음 접하는 사람들도 쉽게 자신만의 창작물을 만들 수 있습니다.","entryShareDesc_1":"<공유하기>에서는 엔트리를 통해 제작한 작품을 다른 사람들과 공유할 수 있습니다.","entryShareDesc_2":"공유된 작품이 어떻게 구성되었는지 살펴볼 수 있고, 이를 발전시켜 또 다른 작품을 만들 수","entryShareDesc_3":"있습니다. 또한 친구들과 협업해 더 멋진 작품을 만들 수도 있습니다.","entryGroup":"학급기능","entryGroupTitle":"우리 반 학습 공간","entryGroupDesc_1":"<학급기능>은 선생님께서 학급별로 학생들을 관리할 수 있는 기능입니다.","entryGroupDesc_2":"학급만의 학습하기, 만들기, 공유하기를 만들 수 있으며, 과제를 만들고","entryGroupDesc_3":"학생들의 결과물을 확인할 수 있습니다.","unpluggedToPhysical":"언플러그드 활동부터 피지컬 컴퓨팅까지","algorithmActivity":"기초 알고리즘 활동","programmignLang":"교육용 프로그래밍 언어","unpluggedDesc_1":"엔트리봇 보드게임과 카드게임을 통해 컴퓨터 없이도","unpluggedDesc_2":"소프트웨어의 기본 개념과 원리(순차, 반복, 선택, 함수)를 익힐 수 있습니다.","entryMaze":"엔트리봇 미로탈출","entryAI":"엔트리봇 우주여행","algorithmDesc_1":"게임을 하듯이 미션을 해결하고 인증서를 받아보세요.","algorithmDesc_2":"소프트웨어의 기본적인 원리를 쉽고 재미있게 배울 수 있습니다.","programmingLangDesc_1":"엔트리에서는 블록을 쌓듯이 프로그래밍을 하기 때문에 누구나 쉽게","programmingLangDesc_2":"자신만의 게임, 애니메이션, 미디어아트와 같은 멋진 작품을 만들고 공유할 수 있어 교육용으로 적합합니다.","viewSupporHw":"연결되는 하드웨어 보기","supportHwDesc_1":"엔트리와 피지컬 컴퓨팅 도구를 연결하면 현실세계와 상호작용하는 멋진 작품들을 만들어낼 수 있습니다.","supportHwDesc_2":"국내, 외 다양한 하드웨어 연결을 지원하며, 계속적으로 추가될 예정입니다.","entryEduSupport":"엔트리 교육 지원","eduSupportDesc_1":"엔트리교육연구소에서는 소프트웨어 교육을 위한 다양한 교육 자료를 제작하여 무상으로 배포하고 있습니다.","eduSupportDesc_2":"모든 자료는 교육자료 페이지에서 다운받으실 수 있습니다.","materials_1_title":"수준별 교재","materials_1_desc_1":"학년별 수준에 맞는 교재를 통해 차근차근","materials_1_desc_2":"따라하며 쉽게 엔트리를 익혀보세요!","materials_2_title":"EBS 방송 연계 교안","materials_2_desc_1":"EBS 소프트웨어야 놀자 방송과 함께","materials_2_desc_2":"교사용 수업 지도안을 제공합니다.","materials_3_title":"초, 중등 교과 연계 수업자료","materials_3_title_2":"","materials_3_desc_1":"다양한 과목에서 만나는 실생활 문제를","materials_3_desc_2":"컴퓨팅 사고력으로 해결해 보세요.","moreMaterials":"더 많은 교육 자료 보러가기","moreInfoAboutEntry_1":"더 많은 엔트리의 소식들을 확인하고 싶다면 아래의 링크들로 접속해보세요.","moreInfoAboutEntry_2":"교육자료 외에도 다양한 SW 교육과 관련한 정보를 공유하고 있습니다.","blog":"블로그","post":"포스트","tvCast":"TV캐스트","albertSchool":"알버트 스쿨버전","arduinoBoard":"아두이노 정품보드","arduinoCompatible":"아두이노 호환보드","bitBlock":"비트블록","bitbrick":"비트브릭","codeino":"코드이노","e-sensor":"E-센서보드","e-sensorUsb":"E-센서보드(유선연결)","e-sensorBT":"E-센서보드(무선연결)","hamster":"햄스터","littlebits":"리틀비츠","orangeBoard":"오렌지 보드","robotis_carCont":"로보티즈 로봇자동차","robotis_IoT":"로보티즈 IoT","dplay":"디플레이","nemoino":"네모이노","Xbot":"엑스봇 엣지 USB","XbotBT":"엑스봇 에뽀/엣지 블투투스","Neobot":"네오봇","about":"알아보기","articles":"토론하기","gallery":"구경하기","learn":"학습하기","login":"로그인","logout":"로그아웃","make":"만들기","register":"가입하기","Join":"회원가입","Edit_info":"내 정보 수정","Discuss":"글 나누기","Explore":"구경하기","Load":"불러오기","My_lesson":"오픈 강의","Resources":"교육 자료","play_software":"소프트웨어야 놀자!","problem_solve":"엔트리 학습하기","Learn":"학습하기","teaching_tools":"엔트리 교구","about_entry":"엔트리 소개","what_entry":"엔트리는?","create":"만들기","create_new":"새로 만들기","start_programming":"소프트웨어 교육의 첫걸음","Entry":"엔트리","intro_learning":"누구나 쉽고 재밌게 소프트웨어를 배울 수 있어요. ","intro_learning_anyone":"지금 바로 시작해보세요! ","start_now":"For Free, Forever.","welcome_entry":"엔트리에 오신걸 환영합니다.","student":"학생","non_menber":"일반인","teacher":"선생님","terms_conditions":"이용약관","personal_information":"개인정보 수집 및 이용에 대한 안내","limitation_liability":"책임의 한계와 법적 고지","entry_agree":"엔트리의 이용약관에 동의 합니다.","info_agree":"개인정보 수집 및 이용에 동의합니다.","next":"다음","enter_id":"아이디 입력","enter_password":"비밀번호 입력","confirm_password":"비밀번호 확인","enter_password_again":"비밀번호를 한번 더 입력하세요.","validation_password":"5자 이상의 영문/숫자 등을 조합하세요.","validation_id":"4~20자의 영문/숫자를 조합하세요","prev":"이전","born_year":"태어난 연도","select_born":"태어난 연도를 선택 하세요","year":"년","gender":"성별","choose_gender":"성별을 선택 하세요","male":"남성","female":"여성","language":"언어","best_language":"주 언어를 선택 하세요","korean":"한국어","english":"영어","viet":"베트남","option_email":"이메일(선택)","insert_email":"이메일 주소를 입력 하세요","sign_up_complete":"회원 가입이 완료 되었습니다","agree_terms_conditions":"이용약관에 동의해 주세요.","agree_personal_information":"개인정보 수집 및 이용에 대한 안내에 동의해 주세요.","insert_studying_stage":"작품을 공유하고 싶은 그룹을 선택해 주세요.","insert_born_year":"태어난 연도를 입력해 주세요.","insert_gender":"성별을 입력해 주세요.","select_language":"언어를 선택해 주세요.","check_email":"이메일 형식을 확인해 주세요.","already_exist_id":"이미 존재하는 아이디 입니다.","id_validation_id":"아이디는 4~20자의 영문/숫자를 조합하세요","password_validate_pwd":"패스워드는 5자 이상의 영문/숫자 등을 조합하세요.","insert_same_pwd":"같은 패스워드를 입력해 주세요.","studying_stage_group":"작품 공유 그룹","studying_stage":"작품을 공유하고 싶은 그룹을 선택해 주세요.","password":"비밀번호 입력","save_id":"아이디 저장","auto_login":"자동 로그인","forgot_password":"아이디와 비밀번호가 기억나지 않으세요 ?","did_not_join":"아직 엔트리 회원이 아니세요?","go_join":"회원가입하기 ","first_step":"소프트웨어 교육의 첫걸음","entry_content_one":"상상했던 것들을 블록 놀이하듯 하나씩 쌓아보세요.","entry_content_two":"게임, 애니메이션, 미디어아트와 같은 멋진 작품이 완성된답니다!","entry_content_three":"재미있는 놀이로 배우고, 나만의 멋진 작품을 만들어 친구들과 공유할 수 있는 멋진 엔트리의 세상으로 여러분을 초대합니다!","funny_space":"재미있게 배우는 학습공간","in_learn_section":"< 학습하기 > 에서는","learn_problem_solving":"컴퓨터를 활용해 논리적으로 문제를 해결할 수 있는 다양한 학습 콘텐츠가 준비되어 있습니다. 게임을 하듯이 주어진 미션들을 컴퓨터 프로그래밍으로 해결해볼 수도 있고 재미있는 동영상으로 소프트웨어의 원리를 배울 수도 있습니다 .","joy_create":"창작의 즐거움","in_make":"< 만들기 > 는","make_contents":"미국 MIT에서 개발한 Scratch와 같은 비주얼 프로그래밍 언어를 사용하여 프로그래밍을 처음 접하는 사람들도 쉽게 나만의 창작물을 만들 수 있습니다. 또 엔트리를 통해 만들 수 있는 컨텐츠의 모습은 무궁무진합니다. 과학 시간에 배운 물리 법칙을 실험해 볼 수도 있고 좋아하는 캐릭터로 애니메이션을 만들거나 직접 게임을 만들어 볼 수 있습니다.","and_content":"또 엔트리를 통해 만들 수 있는 콘텐츠의 모습은 무궁무진합니다. 과학 시간에 배운 물리 법칙을 실험해 볼 수도 있고 좋아하는 캐릭터로 애니메이션을 만들거나 직접 게임을 만들어 볼 수 있습니다.","share_collaborate":"공유와 협업","explore_contents":"< 구경하기 > 에서는 엔트리를 통해 제작한 작품을 다른 사람들과 쉽게 공유할 수 있습니다. 또한 공유된 작품이 어떻게 구성되었는지 살펴볼 수 있고, 이를 발전시켜 자신만의 프로젝트를 만들 수 있습니다. 그리고 엔트리에서는 공동 창작도 가능합니다. 친구들과 협업하여 더 멋진 프로젝트를 만들어볼 수 있습니다.","why_software":"왜 소프트웨어 교육이 필요할까?","speak_obama_contents":"컴퓨터 과학을 배우는 것은 단지 여러분의 미래에만 중요한 일이 아닙니다. 이것은 우리 미국의 미래를 위해 중요한 일 입니다.","obama":"버락 오바마","us_president":"미국 대통령","billgates_contents":"컴퓨터 프로그래밍은 사고의 범위를 넓혀주고 더 나은 생각을 할 수 있게 만들며 분야에 상관없이 모든 문제에 대해 새로운 해결책을 생각할 수 있는 힘을 길러줍니다.","billgates":"빌게이츠","chairman_micro":"Microsoft 회장","eric_contents":"현재 디지털 혁명은 지구상 대부분의 사람들에게 아직 시작도 안된 수준입니다. 프로그래밍을 통해 향후 10년간 모든 것이 변화할 것 입니다.","eric":"에릭 슈미츠","sandbug_contents":"오늘날 컴퓨터 과학에 대한 이해는 필수가 되었습니다. 우리의 국가 경쟁력은 우리가 아이들에게 이것을 얼마나 잘 가르칠 수 있느냐에 달려있습니다.","sandbug":"쉐릴 샌드버그","view_entry_tools":"엔트리와 함께할 수 있는 교구들을 살펴볼 수 있습니다.","solve_problem":"미션 해결하기","solve_problem_content":"게임을 하듯 미션을 하나 하나 해결하며 소프트웨어의 기본 원리를 배워보세요!","find_extra_title":"엔트리봇 부품 찾기 대작전","all_ages":"전 연령","total":"총","step":"단계","find_extra_contents":"로봇 강아지를 생산하던 루츠 공장에 어느 날 갑자기 일어난 정전 사태로 태어난 특별한 강아지 엔트리 봇. 아직 조립이 덜 된 나머지 부품들을 찾아 공장을 탈출 하도록 도와주면서 소프트웨어의 동작 원리를 익혀보자!","software_play_contents":"EBS에서 방영한 '소프트웨어야 놀자' 프로그램을 실습해볼 수 있습니다.","resources_contents":"엔트리를 활용한 다양한 교육자료들을 무료로 제공합니다.","from":" 출처","sw_camp":"미래부 SW 창의캠프","elementary":"초등학교","middle":"중학교","grades":"학년","lesson":"차시","sw_contents_one":"5차시 분량으로 초등학생이 엔트리와 피지컬 컴퓨팅을 경험할  수 있는 교재입니다. 학생들은 엔트리 사용법을 학습하고, 그림판과 이야기 만들기를 합니다. 마지막에는 아두이노 교구를 활용하여 키보드를 만들어보는 활동을 합니다.","sw_camp_detail":"미래창조과학부 SW창의캠프","sw_contents_two":"5차시 분량으로 중학생이 엔트리와 피지컬 컴퓨팅을 경험할 수 있는 교재입니다. 학생들은 엔트리 사용법을 학습하고, 미로찾기 게임과, 퀴즈 프로그램을 만들어 봅니다. 마지막에는 아두이노 교구를 활용하여 키보드로 자동차를 조종하는 활동을 합니다.","sw_contents_three":"선생님들이 학교에서 시작할 수 있는 소프트웨어 수업 지도서입니다. 다양한 언플러그드 활동과, '소프트웨어야 놀자' 방송을 활용한 수업 지도안이 담겨 있습니다.","naver_sw":"NAVER 소프트웨어야 놀자","teacher_teaching":"교사용지도서 (초등학교 5~6학년 이상)","funny_sw":"즐거운 SW놀이 교실","sw_contents_four":"소프트웨어를 놀이하듯 재미있게 배울 수 있는 교재로 엔트리보드게임을 비롯한 다양한 언플러그드 활동과 엔트리 학습모드로 소프트웨어를 만드는 기본 원리를 배우게 됩니다. 기본 원리를 배웠다면 학생들은 이제 엔트리로 이야기, 게임, 예술작품, 응용프로그램을 만드는 방법을 배우고, 자신이 생각한 소프트웨어를 만들고 발표할 수 있도록 교재가 구성되어 있습니다.","ct_text_5":"교과서와 함께 키우는 컴퓨팅 사고력","teacher_grade_5":"교원 (초등학교 5학년)","ct_text_5_content":"실생활의 문제를 해결하자는 테마로 준비된 총 8개의 학습콘텐츠가 담긴 교사용 지도안입니다. 각 콘텐츠는 개정된 교육과정을 반영한 타교과와의 연계를 통해 다양한 문제를 만나고 해결해볼 수 있도록 설계되었습니다.  아이들이 컴퓨팅 사고력을 갖춘 융합형 인재가 될 수 있도록 지금 적용해보세요!","ct_text_6":"교과서와 함께 키우는 컴퓨팅 사고력","teacher_grade_6":"교원 (초등학교 6학년)","ct_text_6_content":"실생활의 문제를 해결하자는 테마로 준비된 총 8개의 학습콘텐츠가 담긴 교사용 지도안입니다. 각 콘텐츠는 개정된 교육과정을 반영한 타교과와의 연계를 통해 다양한 문제를 만나고 해결해볼 수 있도록 설계되었습니다.  아이들이 컴퓨팅 사고력을 갖춘 융합형 인재가 될 수 있도록 지금 적용해보세요!","sw_use":"모든 교재들은 비영리 목적에 한하여 저작자를 밝히고 자유롭게 이용할 수 있습니다.","title":"제목","writer":"작성자","view":"보기","date":"등록일","find_id_pwd":"아이디와 비밀번호 찾기","send_email":"이메일로 비밀번호 변경을 위한 링크를 발송해드립니다.","user_not_exist":"존재하지 않는 이메일 주소 입니다.","not_signup":"아직 회원이 아니세요?","send":"발송하기","sensorboard":"엔트리봇 센서보드","physical_computing":"피지컬 컴퓨팅","sensorboard_contents":"아두이노를 사용하기 위해서 더 이상 많은 케이블을 사용해 회로를 구성할 필요가 없습니다. 엔트리 보드는 아두이노 위에 끼우기만 하면 간단하게 LED, 온도센서, 소리센서, 빛, 슬라이더, 스위치를 활용할 수 있습니다. 이제 엔트리 보드를 활용해 누구라도 쉽게 자신만의 특별한 작품을 만들어보세요!","entrybot_boardgame":"엔트리봇 보드게임","unplugged":"언플러그드 활동","unplugged_contents":"재밌는 보드게임을 통해 컴퓨터의 작동 원리를 배워보세요. 로봇강아지인 엔트리봇이 정전된 공장에서 필요한 부품을 찾아 탈출하도록 돕다보면 컴퓨터 전문가처럼 문제를 바라 볼 수  있게됩니다.","entrybot_cardgame":"엔트리봇 카드게임 : 폭탄 대소동","entrybot_cardgame_contents":"갑자기 엔트리도시에 나타난 12종류의 폭탄들! 과연 폭탄들을 안전하게 해체할 수 있을까요? 폭탄들을 하나씩 해체하며 엔트리 블록과 함께 소프트웨어의 원리를 배워봐요!  순차, 반복, 조건을 통해 폭탄을 하나씩 해체하다 보면 엔트리도시를 구한 영웅이 될 수 있답니다!","basic_learn":"엔트리 기본 학습","basic_learn_contents":"엔트리를 활용한 다양한 교육 콘텐츠를 제공합니다.","troubleshooting":"문제해결 학습","playsoftware":"소프트웨어야 놀자","make_own_lesson":"나만의 수업을 만들어 다른 사람과 공유할 수 있습니다.","lecture":"강의","curriculum":"강의 모음","group_lecture":"우리 반 강의","group_curriculum":"우리 반 강의 모음","group_homework":"우리 반 과제","group_noproject":"전시된 작품이 없습니다.","group_nolecture":"생성된 강의가 없습니다.","group_nocurriculum":"생성된 강의 모음이 없습니다.","lecture_contents":"필요한 기능만 선택하여 나만의 수업을 만들어 볼 수 있습니다.","curriculum_contents":"여러개의 강의를 하나의 강의 모음으로 묶어 차근차근 따라할 수 있는 수업을 만들 수 있습니다.","grade_info":"학년 정보","difficulty":"난이도","usage":"사용요소","learning_concept":"학습개념","related_subject":"연개 교과","show_more":"더보기","close":"닫기","latest":"최신순","viewer":"조회순","like":"좋아요순","comment":"댓글순","entire_period":"전체기간","today":"오늘","latest_week":"최근 1주일","latest_month":"최근 1개월","latest_three_month":"최근 3개월","current_password":"현재 비밀번호","incorrect_password":"비밀번호가 일치하지 않습니다.","new_password":"새로운 비밀번호","password_option_1":"영문과 숫자의 조합으로 5자 이상이 필요합니다.","again_new_password":"새로운 비밀번호 재입력","enter_new_pwd":"새로운 비밀번호를 입력하세요.","enter_new_pwd_again":"새로운 비밀번호를 다시 입력하세요.","password_match":"비밀번호가 일치하지 않습니다.","incorrect_email":"유효한 이메일이 아닙니다","edit_button":"정보수정","edit_profile":"관리","my_project":"나의 작품","my_group":"나의 학급","mark":"관심 작품","prev_state":"이전","profile_image":"자기소개 이미지","insert_profile_image":"프로필 이미지를 등록해 주세요.","at_least_180":"180 x 180 픽셀의 이미지를 권장합니다.","upload_image":"이미지 업로드","about_me":"자기소개","save_change":"변경사항 저장","basic_image":"기본 이미지","profile_condition":"자기소개를 입력해 주세요. 50자 내외","profile_back":"돌아가기","make_project":"작품 만들기","exhibit_project":"작품 전시하기","art_list_shared":"개인","art_list_group_shared":"그룹","view_project":"코드 보기","comment_view":"댓글","upload_project":"올리기","edit":"수정","save_complete":"저장","just_like":"좋아요","share":"공유","who_likes_project":"작품을 좋아하는 사람","people_interest":"작품을 관심있어 하는 사람","none_person":"없음","inserted_date":"등록일","last_modified":"최종 수정일","original_project":"원본 작품","for_someone":"님의","original_project_deleted":"원본 작품이 삭제되었습니다.","delete_project":"삭제","delete_group_project":"목록에서 삭제","currnet_month_time":"월","current_day_time":"일","game":"게임","animation":"애니메이션","media_art":"미디어 아트","physical":"피지컬","etc":"기타","connected_contents":"연계되는 콘텐츠","connected_contents_content":"엔트리와 함께 할 수 있는 다양한 콘텐츠를 만나보세요. 처음 소프트웨어를 배우는 사람이라면 쉽게 즐기는 보드게임부터 아두이노와 같은 피지컬 컴퓨팅을 활용하여 자신만의 고급스러운 창작물을 만들어 볼 수 있습니다.","basic_mission":"기본 미션: 엔트리봇 미로찾기","basic_mission_content":"강아지 로봇을 만드는 공장에서 우연한 정전으로 혼자서 생각할 수 있게 된 엔트리봇! 공장을 탈출하고 자유를 찾을 수 있도록 엔트리봇을 도와주세요!","application_mission":"응용미션: 엔트리봇 우주여행","write_article":"글쓰기","view_all_articles":"모든 글 보기","view_own_articles":"내가 쓴 글 보기","learning_materials":"교육자료","ebs_software_first":"<소프트웨어야 놀자>는 네이버 와 EBS 그리고 엔트리가 함께 만든 교육 콘텐츠입니다. 여기에서는 엔트리를 활용하여 실제로 간단한 프로그램을 만들어보며 소프트웨어의 기초 원리를 배워나갈 수 있습니다. 또한 각 콘텐츠에서는 동영상을 통해 컴퓨터과학에 대한 선행지식이 없더라도 충분히 재미와 호기심을 느끼며 진행할 수 있도록 준비되어있습니다.","go_software":"소프트웨어야 놀자 가기","ebs_context":"EBS 가기","category":"카테고리","add_picture":"사진첨부","upload_article":"글 올리기","list":"목록","report":"신고하기","upload":"올리기","staff_picks":"스태프 선정","popular_picks":"인기 작품","lecture_header_more":"더 만들어 보기","lecture_header_reset":"초기화","lecture_header_reset_exec":"초기화 하기","lecture_header_save":"저장","lecture_header_save_content":"학습내용 저장하기","lecture_header_export_project":"내 작품으로 저장하기","lecture_header_undo":"취소","lecture_header_redo":"복원","lecture_header_bugs":"버그신고","lecture_container_tab_object":"오브젝트","lecture_container_tab_video":"강의 동영상","lecture_container_tab_project":"완성된 작품","lecture_container_tab_help":"블록 도움말","illigal":"불법적인 내용 또는 사회질서를 위반하는 활동","verbal":"언어 폭력 또는 개인 정보를 침해하는 활동","commertial":"상업적인 목적을 가지고 활동","explicit":"음란물","other":"기타","report_result":"결과 회신을 원하시면 메일을 입력해 주세요.","report_success":"신고하기가 정상적으로 처리 되었습니다.","etc_detail":"기타 항목 선택후 입력해주세요.","lecture_play":"강의 보기","list_view_link":"다른 강의 모음 보기","lecture_intro":"강의 소개 보기","study_goal":"학습목표","study_description":"설명","study_created":"등록일","study_last_updated":"최종 수정일","study_remove":"삭제","study_group_lecture_remove":"목록에서 삭제","study_group_curriculum_remove":"목록에서 삭제","study_edit":"강의 모음 수정","study_comments":"댓글","study_comment_post":"올리기","study_comment_remove":"삭제","study_comment_edit":"수정","study_comment_save":"저장","study_guide_video":"안내 영상","study_basic_project":"기본 작품","study_done_project":"완성 작품을 선택하세요.","study_usage_element":"사용요소","study_concept_element":"적용개념","study_subject_element":"연계교과","study_element_none":"없음","study_label_like":"좋아요","study_label_interest":"관심 강의","study_label_share":"공유","study_label_like_people":"강좌를 좋아하는 사람","study_label_interest_people":"강좌를 관심있어 하는 사람","study_related_lectures":"강의 목록","study_expand":"전체보기","study_collapse":"줄이기","aftercopy":"주소가 복사되었습니다.","study_remove_curriculum":"강의 모음을 삭제하시겠습니까?","content_required":"내용을 입력하세요","study_remove_lecture":"강의를 삭제하시겠습니까?","lecture_build":"강의 만들기","lecture_build_step1":"1. 강의를 소개하기 위한 정보를 입력해주세요","lecture_build_step2":"2. 학습에 사용되는 기능들만 선택해주세요","lecture_build_step3":"3. 모든 정보를 올바르게 입력했는지 확인해주세요","lecture_build_choice":"어떤 것을 올리시겠습니까?","lecture_build_project":"엔트리 작품","lecture_build_video":"강의 영상","lecture_build_grade":"추천학년","lecture_build_goals":"학습목표","lecture_build_add_goal":"이곳을 클릭하여 목표를 추가","lecture_build_attach":"파일 첨부","lecture_build_attach_text":"20MB 이내의 파일을 업로드해 주세요.","lecture_build_assist":"보조 영상","lecture_build_youtube_url":"Youtube 공유 링크를 넣어주세요.","lecture_build_project_done":"완성 작품을 선택하세요.","lecture_build_scene_text1":"장면기능을 끄면 새로운 장면을 추가하거나,","lecture_build_scene_text2":"삭제할 수 없습니다.","lecture_build_object_text":"오브젝트 추가하기를 끄면 새로운 오브젝트를 추가하거나 삭제할 수 없습니다.","lecture_build_blocks_text1":"학습에 필요한 블록들만 선택해주세요.","lecture_build_blocks_text2":"선택하지 않은 블록은 숨겨집니다.","lecture_build_basic1":"학습을 시작할때 사용할 작품을 선택해 주세요.","lecture_build_basic2":"학습자는 선택한 작품을 가지고 학습을 하게 됩니다.","lecture_build_help":"이 도움말을 다시 보시려면 눌러주세요.","lecture_build_help_never":"다시보지 않기","lecture_build_close":"닫기","lecture_build_scene":"장면 1","lecture_build_add_object":"오브젝트 추가하기","lecture_build_start":"시작하기","lecture_build_tab_code":"블록","lecture_build_tab_shape":"모양","lecture_build_tab_sound":"소리","lecture_build_tab_attribute":"속성","lecture_build_block_category":"블록 카테고리를 선택하세요.","lecture_build_attr_all":"전체","lecture_build_attr_var":"변수","lecture_build_attr_signal":"신호","lecture_build_attr_list":"리스트","lecture_build_attr_func":"함수","lecture_build_edit":"강의 수정","lecture_build_remove":"삭제","curriculum_build":"강의 모음 만들기","curriculum_step1":"1. 강의 모음을 소개하는 정보를 입력해주세요.","curriculum_step2":"2. 강의 모음을 구성하는 강의를 선택해주세요.","curriculum_step3":"3. 올바르게 강의 모음이 구성되었는지 확인해주세요.","curriculum_lecture_upload":"강의 올리기","curriculum_lecture_edit":"강의 편집","curriculum_lecture_open":"불러오기","group_lecture_add":"우리 반 강의 추가하기","group_curriculum_add":"우리 반 강의 모음 추가하기","group_lecture_delete":"삭제","group_curriculum_delete":"삭제","group_select":"","group_studentNo":"학번","group_username":"이름","group_userId":"아이디","group_tempPassword":"비밀번호 수정","group_gender":"성별","group_studentCode":"코드","group_viewWorks":"작품보기","added_group_lecture":"강의가 삭되었습니다.","added_group_curriculum":"강의 모음이 삭제되었습니다.","deleted_group_lecture":"강의가 삭제되었습니다.","deleted_group_curriculum":"강의 모음이 삭제되었습니다.","modal_my":"나의","modal_interest":"관심","modal_project":"작품","section":"단원","connect_hw":"하드웨어 연결","connect_message":"%1에 연결되었습니다.","connect_fail":"하드웨어 연결에 실패했습니다. 연결프로그램이 켜져 있는지 확인해 주세요.","interest_curriculum":"관심 강의 모음","searchword_required":"검색어를 입력하세요.","file_required":"파일은 필수 입력 항목입니다.","file_upload_max_count":"한번에 10개까지 업로드가 가능합니다.","image_file_only":"이미지 파일만 등록이 가능합니다.","file_upload_max_size":"10MB 이하만 업로드가 가능합니다.","curriculum_modal_lectures":"나의 강의","curriculum_modal_interest":"관심 강의","group_curriculum_modal_curriculums":"나의 강의모음","group_curriculum_modal_interest":"관심 강의모음","picture_import":"모양 가져오기","picture_select":"모양 선택","lecture_list_view":"다른 강의보기","play_software_2":"EBS 소프트웨어야 놀자2","play_software_2_content":"네이버와 EBS 그리고 엔트리가 함께 만든 두 번째 이야기, <소프트웨어야 놀자> 시즌2를 만나보세요! 재미있는 동영상 강의를 통해 소프트웨어의 기본 개념을 배워보고, 다양하고 흥미로운 주제로 실생활 문제를 해결해 볼 수 있습니다. 방송영상과 특별영상을 보며 재미있는 프로그램들을 직접 만들어보세요. 소프트웨어 교육을 처음 접하는 친구들도 쉽게 소프트웨어와 친구가 될 수 있답니다!","open_project_to_all":"공개","close_project":"비공개","category_media_art":"미디어 아트","go_further":"더 나아가기","marked_project":"관심 작품","marked_group_project":"그룹 관심 작품","basic":"기본","application":"응용","the_great_escape":"탈출 모험기","escape_guide_1":"강아지 로봇을 만드는 공장에서 우연한 정전으로 혼자서 생각할 수 있게 된 엔트리봇! ","escape_guide_1_2":" 공장을 탈출하고 자유를 찾을 수 있도록 엔트리봇을 도와주세요!","escape_guide_2":"엔트리봇이 먼 길을 가기엔 고쳐야 할 곳이 너무 많아 공장에서 탈출하면서 몸을 수리할 수 있는 부품들을 찾아보자! 아직 몸이 완전하지는 않지만 걷거나 뛰면서, 방향을 바꾸는 정도는 가능할 거야! ","escape_guide_2_2":"학습 목표: 순차적 실행","escape_guide_3":"드디어 공장을 탈출했어! 하지만 마을로 가기 위해서는 아직 가야 할 길이 멀어. 그래도 몸은 어느 정도 고쳐져서 똑같은 일을 많이 해도 무리는 없을 거야! 어? 근데 저 로봇은 뭐지? ","escape_guide_3_2":"학습 목표: 반복문과 조건문","escape_guide_4":"드디어 마을 근처까지 왔어! 아까부터 똑같은 일을 많이 했더니 이제 외울 지경이야! 차라리 쓰일 블록은 이제 기억해뒀다가 쓰면 좋을 것 같아. 여기서 배터리만 충전해 놓으면 이제 평생 자유롭게 살 수 있을 거야.","escape_guide_4_2":"학습 목표: 함수 정의와 호출","space_travel_log":"우주 여행기","space_guide_1":"머나먼 우주를 탐사하기 위해 떠난 엔트리봇. 드디어 탐사 임무를 마치고 고향별인 지구로 돌아오려 하는데 수많은 돌이 지구로 가는 길을 막고 있다!  엔트리봇이 안전하게 지구로 돌아올 수 있도록 도와주세요!","space_guide_2":"드디어 지구에 돌아갈 시간이야! 얼른 지구에 돌아가서 쉬고 싶어!앞에 돌들이 어떻게 되어 있는지 확인하고 언제 어디로 가야 하는지 알려줘! 그러면 내가 가르쳐준 방향으로 움직일게!","space_guide_2_2":"학습 목표: 조건문 중첩과 논리 연산","cfest_mission":"엔트리 체험 미션","maze_1_intro":"안녕 나는 엔트리봇이라고 해. 지금 나는 다친 친구들을 구하려고 하는데 너의 도움이 필요해. 나를 도와서 친구들을 구해줘! 먼저 앞으로 가기 블록을 조립하고 시작을 눌러봐","maze_1_title":"시작 방법","maze_1_content":"엔트리봇은 어떻게 움직이나요?","maze_1_detail":"1. 블록 꾸러미에서 원하는 블록을 꺼내어 “시작하기를 클릭했을 때” 블록과 연결해봐 <br> 2. 다 조립했으면, 시작을 눌러봐 <br> 3. 나는 네가 조립한 블록대로 위에서부터 순서대로 움직일게","maze_2_intro":"좋아! 덕분에 첫 번째 친구를 무사히 구할 수 있었어! 그럼 다음 친구를 구해볼까? 어! 그런데 앞에 벌집이 있어! 뛰어넘기 블록을 사용해서 벌집을 피하고 친구를 구해보자.","maze_2_title_1":"장애물 뛰어넘기","maze_2_content_1":"장애물이 있으면 어떻게 해야하나요?","maze_2_detail_1":"길을 가다보면 장애물을 만날 수 있어. <br> 장애물이 앞에 있을 때에는 뛰어넘기 블록을 사용해야 해.","maze_2_title_2":"시작 방법","maze_2_content_2":"엔트리봇은 어떻게 움직이나요?","maze_2_detail_2":"1. 블록 꾸러미에서 원하는 블록을 꺼내어 “시작하기를 클릭했을 때” 블록과 연결해봐 <br> 2. 다 조립했으면, 시작을 눌러봐 <br> 3. 나는 네가 조립한 블록대로 위에서부터 순서대로 움직일게","maze_3_intro":"멋졌어! 이제 또 다른 친구를 구하러 가자~ 이번에는 아까 구한 친구가 준 반복하기 블록을 이용해볼까? 반복하기를 이용하면 똑같은 동작을 쉽게 여러번 할 수 있어! 한 번 반복할 숫자를 바꿔볼래?","maze_3_title":"반복 블록(1)","maze_3_content":"(3)회 반복하기 블록은 어떻게 사용하나요?","maze_3_detail":"같은 행동을 여러번 반복하려면 ~번 반복하기 블록을 사용해야 해. <br> 반복하고 싶은 블록들을 ~번 반복하기 안에 넣고 반복 횟수를 입력하면 돼","maze_4_intro":"훌륭해! 이제 구해야 할 친구 로봇들도 별로 남지 않았어. 벌집에 닿지 않도록 뛰어넘기를 반복하면서 친구에게 갈 수 있게 해줘!","maze_4_title":"반복 블록(1)","maze_4_content":"(3)회 반복하기 블록은 어떻게 사용하나요?","maze_4_detail":"같은 행동을 여러번 반복하려면 ~번 반복하기 블록을 사용해야 해. <br> 반복하고 싶은 블록들을 ~번 반복하기 안에 넣고 반복 횟수를 입력하면 돼","maze_5_intro":"대단해! 이제 반복하기 블록과 만약 블록을 같이 사용해보자~ 만약 블록을 사용하면 앞에 벽이 있을 때 벽이 없는 쪽으로 회전할 수 있어. 그럼 친구를 구해주러 출발해볼까?","maze_5_title_1":"만약 블록","maze_5_content_1":"만약 ~라면 블록은 어떻게 동작하나요?","maze_5_detail_1":"만약 앞에 {이미지}가 있다면' 블록을 사용하면 앞에 {이미지}가 있을 때 어떤 행동을 할 지 정해줄 수 있어. <br> 앞에 {이미지}가 있을 때에만 블록 안의 블록들을 실행하고 <br> 그렇지 않으면 실행하지 않게 되는 거야.","maze_5_title_2":"반복 블록(2)","maze_5_content_2":"~를 만날 때 까지 반복하기 블록은 어떻게 사용하나요?","maze_5_detail_2":"~까지 반복하기'를 사용하면 같은 행동을 언제까지 반복할지를 정해줄 수 있어. <br> 반복하고 싶은 블록들을 ~까지 반복하기안에 넣으면 돼. <br> 그러면 {이미지}와 같은 타일 위에 있는 경우 반복이 멈추게 될 거야.","maze_6_intro":"이제 마지막 친구야! 아까 해본 것처럼만 하면 될거야! 그럼 마지막 친구를 구하러 가볼까?","maze_6_title_1":"만약 블록","maze_6_content_1":"만약 ~라면 블록은 어떻게 동작하나요?","maze_6_detail_1":"만약 앞에 {이미지}가 있다면' 블록을 사용하면 앞에 {이미지}가 있을 때 어떤 행동을 할 지 정해줄 수 있어. <br> 앞에 {이미지}가 있을 때에만 블록 안의 블록들을 실행하고 <br> 그렇지 않으면 실행하지 않게 되는 거야.","maze_6_title_2":"반복 블록(2)","maze_6_content_2":"~를 만날 때 까지 반복하기 블록은 어떻게 사용하나요?","maze_6_detail_2":"~까지 반복하기'를 사용하면 같은 행동을 언제까지 반복할지를 정해줄 수 있어. <br> 반복하고 싶은 블록들을 ~까지 반복하기안에 넣으면 돼. <br> 그러면 {이미지}와 같은 타일 위에 있는 경우 반복이 멈추게 될 거야.","maze_programing_mode_0":"블록 코딩","maze_programing_mode_1":"자바스크립트","maze_operation1_title":"1단계 – 자바스크립트모드 안내","maze_operation1_1_desc":"나는 로봇강아지 엔트리봇이야. 나에게 명령을 내려서 미션을 해결할 수 있게 도와줘! 미션은 시작할 때마다 <span class=\"textShadow\">\'목표\'</span>를 통해서 확인할 수 있어!","maze_operation1_2_desc":"미션을 확인했다면 <b>명령</b>을 내려야 해 <span class=\"textUnderline\">\'명령어 꾸러미\'</span>는 <b>명령어</b>가 있는 공간이야. <b>마우스</b>와 <b>키보드</b>로 <b>명령</b>을 내릴 수 있어. <span class=\"textShadow\">마우스</span>로는 명령어 꾸러미에 있는 <b>명령어</b>를 클릭하거나, <b>명령어</b>를 <span class=\"textUnderline\">\'명령어 조립소\'</span>로 끌고와서 나에게 <b>명령</b>을 내릴 수 있어!","maze_operation1_2_textset_1":"마우스로 명령어를 클릭하는 방법 ","maze_operation1_2_textset_2":"마우스로 명령어를 드래그앤드랍하는 방법 ","maze_operation1_3_desc":"<span class=\"textShadow\">키보드</span>로 명령을 내리려면 \'명령어 꾸러미\' 에 있는 <b>명령어를 키보드로 직접 입력하면 돼.</b></br> 명령어를 입력할 때 명령어 끝에 있는 <span class=\"textShadow\">()와 ;</span> 를 빼먹지 않도록 주의해야해!","maze_operation1_4_desc":"미션을 해결하기 위한 명령어를 다 입력했다면 <span class=\"textShadow\">[시작하기]</span>를 누르면 돼.</br> [시작하기]를 누르면 나는 명령을 내린대로 움직일 거야!</br> 각 명령어가 궁금하다면 <span class=\"textShadow\">[명령어 도움말]</span>을 확인해봐!","maze_operation7_title":"7단계 - 반복 명령 알아보기(횟수반복)","maze_operation7_1_desc":"<b>똑같은 일</b>을 반복해서 명령하는건 매우 귀찮은 일이야.</br>이럴땐 <span class=\"textShadow\">반복</span>과 관련된 명령어를 사용하면 훨씬 쉽게 명령을 내릴 수 있어.","maze_operation7_2_desc":"그렇다면 반복되는 명령을 쉽게 내리는 방법을 알아보자.</br>먼저 반복하기 명령어를 클릭한 다음, <span class=\"textShadow\">i<1</span> 의 숫자를 바꿔서 <span class=\"textShadow\">반복횟수</span>를 정하고</br><span class=\"textShadow\">괄호({ })</span> 사이에 반복할 명령어를 넣어주면 돼!","maze_operation7_3_desc":"예를 들어 이 명령어<span class=\"textBadge number1\"></span>은 move(); 를 10번 반복해서 실행해.</br><span class=\"textBadge number2\"></span>명령어와 동일한 명령어지.","maze_operation7_4_desc":"이 명령어를 사용할 때는 <span class=\"textShadow\">{ } 안에 반복할 명령어</span>를 잘 입력했는지,</br><span class=\"textShadow\">`;`</span>는 빠지지 않았는지 잘 살펴봐!</br>이 명령어에 대한 자세한 설명은 [명령어 도움말]에서 볼 수 있어.","maze_operation7_1_textset_1":"똑같은 명령어를 반복해서 사용하는 경우","maze_operation7_1_textset_2":"반복 명령어를 사용하는 경우","maze_operation7_2_textset_1":"반복 횟수","maze_operation7_2_textset_2":"반복할 명령","maze_operation7_4_textset_1":"괄호({})가 빠진 경우","maze_operation7_4_textset_2":"세미콜론(;)이 빠진 경우","maze_operation9_title":"9단계 - 반복 명령 알아보기(조건반복)","maze_operation9_1_desc":"앞에서는 몇 번을 반복하는 횟수반복 명령어에 대해 배웠어.</br>이번에는 <span class=\"textShadow\">계속해서 반복하는 명령어</span>를 살펴보자.</br>이 명령어를 사용하면 미션이 끝날 때까지 <b>동일한 행동</b>을 계속 반복하게 돼.</br>이 명령어 역시 괄호({ }) 사이에 반복할 명령어를 넣어 사용할 수 있어!","maze_operation9_2_desc":"예를 들어 이 명령어 <span class=\"textBadge number1\"></span>은 미션을 완료할때까지 반복해서 move(); right()를 실행해.</br><span class=\"textBadge number2\"></span>명령어와 동일한 명령어지.","maze_operation9_3_desc":"이 명령어를 사용할 때도 <span class=\"textShadow\">{ } 안에 반복할 명령어</span>를 잘 입력했는지,</br><span class=\"textShadow\">`true`</span>가 빠지지 않았는지 잘 살펴봐!</br>이 명령어에 대한 자세한 설명은 [명령어 도움말]에서 볼 수 있어.","maze_operation9_1_textset_1":"반복할 명령","maze_operation9_3_textset_1":"괄호({})가 빠진 경우","maze_operation9_3_textset_2":"세미콜론(;)이 빠진 경우","maze_operation10_title":"10단계 - 조건 명령 알아보기","maze_operation10_1_desc":"앞에서는 미션이 끝날 때까지 계속 반복하는 반복 명령어에 대해 배웠어.</br>이번에는 특정한 조건에서만 행동을 하는 <span class=\"textShadow\">조건 명령어</span>를 살펴보자.</br><span class=\"textBadge number2\"></span>에서 보는것처럼 조건 명령어를 사용하면 <b>명령을 보다 효율적으로 잘 내릴 수 있어.</b>","maze_operation10_2_desc":"조건 명령어는 크게 <span class=\"textShadow\">`조건`</span> 과 <span class=\"textShadow\">`조건이 발생했을때 실행되는 명령`</span>으로 나눌수 있어.</br>먼저 <span class=\"textUnderline\">조건</span> 부분을 살펴보자. If 다음에 나오는 <span class=\"textUnderline\">( ) 부분</span>이 조건을 입력하는 부분이야.</br><span class=\"textBadge number1\"></span>과 같은 명령어를 예로 살펴보자. <span class=\"textUnderline\">if(front == \“wall\”)</span> 는 만약 내 앞에(front) \"wall(벽)\"이 있다면을 뜻해","maze_operation10_3_desc":"이제 <span class=\"textUnderline\">`조건이 발생했을 때 실행되는 명령`</span>을 살펴보자.</br>이 부분은 <span class=\"textShadow\">괄호{}</span>로 묶여 있고, 조건이 발생했을때 괄호안의 명령을 실행하게 돼!</br>조건이 발생하지 않으면 이 부분은 무시하고 그냥 넘어가게 되지.</br><span class=\"textBadge number1\"></span>의 명령어를 예로 살펴보자. 조건은 만약에 `내 앞에 벽이 있을 때` 이고,</br><b>이 조건이 발생했을 때 나는 괄호안의 명령어 right(); 처럼 오른쪽으로 회전하게 돼!</b>","maze_operation10_4_desc":"<span class=\"textShadow\">조건 명령어</span>는 <span class=\"textShadow\">반복하기 명령어</span>와 함께 쓰이는 경우가 많아.</br>앞으로 쭉 가다가, 벽을 만났을때만 회전하게 하려면</br><span class=\"textUnderline pdb5\"><span class=\"textBadge number1\"></span><span class=\"textBadge number2\"></span><span class=\"textBadge number3\"></span>순서</span>와 같이 명령을 내릴 수 있지!","maze_operation10_1_textset_1":"<b>[일반명령]</b>","maze_operation10_1_textset_2":"<span class=\"textMultiline\">앞으로 2칸 가고</br>오른쪽으로 회전하고,</br>앞으로 3칸가고,</br>오른쪽으로 회전하고, 앞으로...</span>","maze_operation10_1_textset_3":"<b>[조건명령]</b>","maze_operation10_1_textset_4":"<span class=\"textMultiline\">앞으로 계속 가다가</br><span class=\"textEmphasis\">`만약에 벽을 만나면`</span></br>오른쪽으로 회전해~!</span>","maze_operation10_2_textset_1":"조건","maze_operation10_2_textset_2":"조건이 발생했을 때 실행되는 명령","maze_operation10_3_textset_1":"조건","maze_operation10_3_textset_2":"조건이 발생했을 때 실행되는 명령","maze_operation10_4_textset_1":"<span class=\"textMultiline\">미션이 끝날때 까지</br>계속 앞으로 간다.</span>","maze_operation10_4_textset_2":"<span class=\"textMultiline\">계속 앞으로 가다가,</br>만약에 벽을 만나면</span>","maze_operation10_4_textset_3":"<span class=\"textMultiline\">계속 앞으로 가다가,</br>만약에 벽을 만나면</br>오른쪽으로 회전한다.</span>","maze_operation15_title":"15단계 - 함수 명령 알아보기","maze_operation15_1_desc":"자주 사용하는 명령어들을 매번 입력하는건 매우 귀찮은 일이야.</br>자주 사용하는 <span class=\"textUnderline\">명령어들을 묶어서 이름</span>을 붙이고,</br><b>필요할 때마다 그 명령어 묶음을 불러온다면 훨씬 편리하게 명령을 내릴 수 있어!</b></br>이런 명령어 묶음을  <span class=\"textShadow\">`함수`</span>라고 해. 이제 함수 명령에 대해 자세히 알아보자.","maze_operation15_2_desc":"함수 명령어는 명령어를 묶는 <b>`함수만들기` 과정</b>과,</br>묶은 명령어를 필요할 때 사용하는 <b>`함수 불러오기` 과정</b>이 있어.</br>먼저 함수만들기 과정을 살펴보자.</br>함수를 만들려면 함수의 이름과, 그 함수에 들어갈 명령어를 입력해야 해.</br><span class=\"textShadow\">function</span>을 입력한 다음 <span class=\"textShadow\">함수의 이름</span>을 정할 수 있어. 여기서는 <span class=\"textShadow\">promise</span>로 만들거야.</br>함수 이름을 만들었으면 <span class=\"textUnderline\">()</span>를 붙여줘. 그 다음 <span class=\"textUnderline\">괄호({})</span>를 입력해.</br>그리고 <span class=\"textUnderline\">이 괄호 안에 함수에 들어갈 명령어들을 입력하면</span> 함수가 만들어져!","maze_operation15_3_desc":"이 명령어를 예로 살펴보자. 나는 <span class=\"textShadow\">promise</span> 라는 함수를 만들었어.</br>이 함수를 불러서 실행하면 <span class=\"textUnderline\">괄호({})</span>안에 있는</br>move();</br>move();</br>left(); 가 실행돼!","maze_operation15_4_desc":"함수를 불러와서 실행하려면 아까 만든 <b>함수의 이름을 입력하고 뒤에 `();`를 붙이면 돼.</b></br>promise 라는 이름으로 함수를 만들었으니 <span class=\"textShadow\">promise();</span> 를 입력하면 앞에서 묶어놓은</br>명령어들이 실행되는거지!</br><span class=\"number1 textBadge\"></span>과 같이 명령을 내리면 <span class=\"number2 textBadge\"></span>처럼 동작하게 돼!</br>함수 명령어를 사용하려면 <span class=\"number1 textBadge\"></span>과 같이 함수를 만들고 함수를 불러와야해!","maze_operation15_1_textset_1":"자주 사용하는 명령어 확인하기","maze_operation15_1_textset_2":"명령어들을 묶어서 이름 붙이기","maze_operation15_1_textset_3":"명령어 묶음 불러오기","maze_operation15_2_textset_1":"명령어 묶음의 이름(함수 이름)","maze_operation15_2_textset_2":"묶을 명령어들","maze_operation15_3_textset_1":"명령어 묶음의 이름(함수 이름)","maze_operation15_3_textset_2":"묶을 명령어들","maze_operation15_4_textset_1":"함수 만들기","maze_operation15_4_textset_2":"함수 불러오기","maze_operation15_4_textset_3":"실제 상황","maze_object_title":"오브젝트 정보","maze_object_parts_box":"부품 상자","maze_object_obstacle1":"장애물","maze_object_obstacle2":"bee","maze_object_obstacle3":"banana","maze_object_friend":"친구","maze_object_wall1":"wall","maze_object_wall2":"wall","maze_object_wall3":"wall","maze_object_battery":"베터리","maze_command_ex":"예시","maze_command_title":"명령어 도움말","maze_command_move_desc":"엔트리봇을 한 칸 앞으로 이동시킵니다.","maze_command_jump_desc":"아래 이미지와 같은 장애물 앞에서 장애물을 뛰어 넘습니다.</br><div class=\"obstacleSet\"></div>","maze_command_right_desc":"제자리에서 오른쪽으로 90도 회전합니다.","maze_command_left_desc":"제자리에서 왼쪽으로 90도 회전합니다.","maze_command_for_desc":"괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 <span class=\"textShadow\">입력한 횟수</span> 만큼 반복해서 실행합니다.","maze_command_while_desc":"미션이 끝날 때가지 괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 계속 반복해서 실행합니다.","maze_command_if1_desc":"조건 <span class=\"textShadow\">`바로 앞에 벽이 있을때`</span>이 발생했을 때,</br>괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 실행합니다.","maze_command_if2_desc":"조건 <span class=\"textShadow\">`바로 앞에 벌집이 있을때`</span>이 발생했을 때,</br>괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 실행합니다.","maze_command_if3_desc":"조건 <span class=\"textShadow\">`바로 앞에 바나나가 있을때`</span>이 발생했을 때,</br>괄호<span class=\"textShadow\">{}</span> 안에 있는 명령을 실행합니다.","maze_command_promise_desc":"promise 라는 <span class=\"textShadow\">함수</span>를 만들고 실행하면 괄호<span class=\"textShadow\">{}</span> 안에</br>있던 명령어가 실행합니다.","perfect":"아주 완벽해!  ","succeeded_using_blocks":" 개의 블록을 사용해서 성공했어!","awesome":"대단한 걸!","succeeded_go_to_next":"개의 블록만으로 성공했어! <br> 다음 단계로 넘어가자.","good":"좋아! ","but":"<br> 하지만, ","try_again":" 개의 블록만으로 성공하는 방법도 있어. <br> 다시 도전해 보는건 어때?","cfest_success":"대단한걸! 덕분에 친구들을 구할 수 있었어! <br> 아마도 너는 타고난 프로그래머 인가봐! <br> 나중에 또 만나자~!","succeeded_and_cert":"개의 블록만으로 성공했어! <br>인증서를 받으러 가자.","cause_msgs_1":"에구, 앞으로 갈 수 없는 곳이였어. 다시 해보자.","cause_msgs_2":"히잉. 그냥 길에서는 뛰어 넘을 곳이 없어. 다시 해보자.","cause_msgs_3":"에고고, 아파라. 뛰어 넘었어야 했던 곳이였어. 다시 해보자.","cause_msgs_4":"아쉽지만, 이번 단계에서는 꼭 아래 블록을 써야만 해. <br> 다시 해볼래?","cause_msgs_5":"이런, 실행할 블록들이 다 떨어졌어. 다시 해보자.","close_experience":"체험<br>종료","replay":"다시하기","go_to_next_level":"다음단계 가기","move_forward":"앞으로 한 칸 이동","turn_left":"왼쪽","turn_right":"오른쪽","turn_en":"","turn_ko":"으로 회전","jump_over":"뛰어넘기","when_start_is_pressed":"시작하기를 클릭했을 때","repeat_until_ko":"만날 때 까지 반복","repeat_until_en":"","repeat_until":"만날 때 까지 반복","if_there_is_1":"만약 앞에 ","if_there_is_2":"있다면","used_blocks":"사용 블록","maximum":"목표 블록","used_command":"사용 명령어 갯수","maximum_command":"목표 명령어 갯수","block_box":"블록 꾸러미","block_assembly":"블록 조립소","command_box":"명령어 꾸러미","command_assembly":"명령어 조립소","start":"시작하기","engine_running":"실행중","engine_replay":"돌아가기","goto_show":"보러가기","make_together":"함께 만드는 엔트리","make_together_content":"엔트리는 학교에 계신 선생님들과 학생 친구들이 함께 고민하며 만들어갑니다.","project_nobody_like":"이 작품이 마음에 든다면 '좋아요'를 눌러 주세요.","project_nobody_interest":"'관심 작품'을 누르면 마이 페이지에서 볼 수 있어요.","lecture_nobody_like":"이 강의가 마음에 든다면 '좋아요'를 눌러 주세요.","lecture_nobody_interest":"'관심 강의'을 누르면 마이 페이지에서 볼 수 있어요.","course_nobody_like":"이 강의 모음이 마음에 든다면 '좋아요'를 눌러 주세요.","course_nobody_interest":"'관심 강의 모음'을 누르면 마이 페이지에서 볼 수 있어요.","before_changed":"변경전","after_changed":"변경후","from_changed":"( 2016년 04월 17일 부터 ) ","essential":"필수","access_term_title":"안녕하세요. 엔트리 교육연구소 입니다. <br>  엔트리를 사랑해주시는 여러분께 감사드리며,  <br>  엔트리 교육연구소 웹사이트 이용약관이<br>  2016년 4월 17일 부로 다음과 같이 개정됨을 알려드립니다. ","member_info":"회원 안내","personal_info":"개인정보 수집 및 이용에 동의 합니다.","option":"선택","latest_news":"최근소식","edu_data":"교육자료","training_program":"연수지원","footer_phrase":"엔트리는 누구나 무료로 소프트웨어 교육을 받을 수 있게 개발된 비영리 교육 플랫폼입니다.","footer_use_free":"모든 엔트리교육연구소의 저작물은 교육적 목적에 한하여 출처를 밝히고 자유롭게 이용할 수 있습니다.","nonprofit_platform":"비영리 교육 플랫폼","this_is":"입니다.","privacy":"개인정보 처리방침","entry_addr":"주소 : 서울특별시 강남구 강남대로 382 메리츠타워 7층 엔트리 교육연구소","phone":"전화번호","alert_agree_term":"이용약관에 동의하여 주세요.","alert_private_policy":"개인정보 수집 약관에 동의하여 주세요.","agree":"동의","optional":"선택","start_software":"소프트웨어 교육의 첫걸음","analyze_procedure":"절차","analyze_repeat":"반복","analyze_condition":"분기","analyze_interaction":"상호작용","analyze_dataRepresentation":"데이터 표현","analyze_abstraction":"추상화","analyze_sync":"병렬 및 동기화","jr_intro_1":"안녕! 난 쥬니라고 해! 내 친구 엔트리봇이 오른쪽에 있어! 날 친구에게 데려다 줘!","jr_intro_2":"엔트리봇이 내 왼쪽에 있어! 왼쪽으로 가보자.","jr_intro_3":"엔트리봇이 위쪽에 있어! 친구를 만날 수 있도록 도와줘!","jr_intro_4":"어서 엔트리봇을 만나러 가자! 아래쪽으로 가보는거야~ ","jr_intro_5":"우왓! 내 친구가 멀리 떨어져있어. 엔트리봇이 있는 곳까지 안내해줄래? ","jr_intro_6":"저기 엔트리봇이 있어~ 얼른 만나러 가보자.","jr_intro_7":"예쁜 꽃이 있네. 꽃들을 모아 엔트리봇에게 가보자!","jr_intro_8":"가는 길에 꽃이 있어! 꽃을 모아 엔트리봇에게 가보자!","jr_intro_9":"엔트리봇이 멀리 떨어져 있네? 가장 빠른 길로 엔트리봇에게 가 보자.","jr_intro_10":"엔트리봇을 만나러 가는 길에 꽃을 모두 모아서 가보자.","jr_intro_11":"엔트리봇에게 가려면 오른쪽으로 다섯번이나 가야 하잖아? 반복하기 블록을 사용해서 좀 더 쉽게 가 보자.","jr_intro_12":"반복하기를 사용해서 엔트리봇을 만나러 가자.","jr_intro_13":"지금 블록으로는 친구에게 갈 수가 없어. 반복 횟수를 바꿔 엔트리봇에게 갈 수 있게 해줘.","jr_intro_14":"반복 블록을 사용하여 엔트리봇에게 데려다 줘.","jr_intro_15":"엔트리봇이 정~말 멀리 있잖아? 그래도 반복 블록을 사용하면 쉽게 엔트리봇에게 갈 수 있을 거야.","jr_whats_ur_name":"내가 받을 인증서에 적힐 이름은?","jr_down_cert":"인증서 받기","jr_popup_prefix_1":"좋아! 엔트리봇을 만났어!","jr_popup_prefix_2":"우왓! 엔트리봇을 만났어! <br> 하지만 엔트리봇을 만나기에는 더 적은 블록을 사용해서도 <br> 만날 수 있는데 다시 해볼래? ","jr_popup_suffix":"고마워~ 덕분에 엔트리봇이랑 재밌게 놀 수 있었어~ <br>다음에 또 엔트리봇이랑 놀자~","jr_fail_dont_go":"에궁, 그 곳으로는 갈 수 없어. 가야하는 길을 다시 알려줘~","jr_fail_dont_know":"어? 이제 어디로 가지? 어디로 가야하는 지 더 알려줘~","jr_fail_no_flower":"이런 그곳에는 꽃이 없어. 꽃이 있는 곳에서 사용해보자~","jr_fail_forgot_flower":"앗! 엔트리봇한테 줄 꽃을 깜빡했어. 꽃을 모아서 가자~","jr_fail_need_repeat":"반복 블록이 없잖아! 반복 블록을 사용해서 해보자~","jr_hint_1":"안녕! 난 쥬니라고 해! 내 친구 엔트리봇이 오른쪽에 있어! 날 친구에게 데려다 줘!","jr_hint_2":"엔트리봇이 내 왼쪽에 있어! 왼쪽으로 가보자.","jr_hint_3":"엔트리봇이 위쪽에 있어! 친구를 만날 수 있도록 도와줘!","jr_hint_4":"어서 엔트리봇을 만나러 가자! 아래쪽으로 가보는거야~","jr_hint_5":"우왓! 내 친구가 멀리 떨어져있어. 엔트리봇이 있는 곳까지 안내해줄래?","jr_hint_6":"잘못된 블록들 때문에 친구에게 가지 못하고 있어, 잘못된 블록을 지우고 엔트리봇에게 갈 수 있도록 해줘!","jr_hint_7":"예쁜 꽃이 있네. 꽃들을 모아 엔트리봇에게 가보자!","jr_hint_8":"가는 길에 꽃이 있어! 꽃을 모아 엔트리봇에게 가보자!","jr_hint_9":"엔트리봇이 멀리 떨어져 있네? 가장 빠른 길로 엔트리봇에게 가 보자.","jr_hint_10":"앗, 블록을 잘못 조립해서 제대로 갈 수가 없어. 가는 길에 꽃을 모두 모아 엔트리봇에게 가져다 줄 수 있도록 고쳐 보자.","jr_hint_11":"엔트리봇에게 가려면 오른쪽으로 다섯번이나 가야 하잖아? 반복하기 블록을 사용해서 좀 더 쉽게 가 보자.","jr_hint_12":"반복하기를 사용해서 엔트리봇을 만나러 가자.","jr_hint_13":"지금 블록으로는 친구에게 갈 수가 없어. 반복 횟수를 바꿔 엔트리봇에게 갈 수 있게 해줘.","jr_hint_14":"반복 블록을 사용하여 엔트리봇에게 데려다 줘.","jr_hint_15":"엔트리봇이 정~말 멀리 있잖아? 그래도 반복 블록을 사용하면 쉽게 엔트리봇에게 갈 수 있을 거야.","jr_certification":"인증서","jr_congrat":"축하드립니다!","jr_congrat_msg":"문제해결 과정을 성공적으로 마쳤습니다.","jr_share":"공유","go_see_friends":"친구들 만나러 가요~!","junior_naver":"쥬니어 네이버","junior_naver_contents_1":"의 멋진 곰 '쥬니'가 엔트리를 찾아 왔어요! ","junior_naver_contents_2":"그런데 쥬니는 길을 찾는 것이 아직 어렵나봐요.","junior_naver_contents_3":"쥬니가 엔트리봇을 만날 수 있도록 가야하는 방향을 알려주세요~","basic_content":"기초","jr_help":"도움말","help":"도움말","cparty_robot_intro_1":"안녕 나는 엔트리봇이야. 난 부품을 얻어서 내몸을 고쳐야해. 앞으로 가기 블록으로 부품을 얻게 도와줘!","cparty_robot_intro_2":"좋아! 앞에도 부품이 있는데 이번에는 잘못 가다간 감전되기 쉬울 것 같아. 뛰어넘기 블록을 써서 부품까지 데려다 줘.","cparty_robot_intro_3":"멋진걸! 저기에도 부품이 있어! 길이 조금 꼬여있지만 회전하기 블록을 쓰면 충분히 갈 수 있을 것 같아! ","cparty_robot_intro_4":"좋아 이제 움직이는 건 많이 편해졌어! 이번에는 회전과 뛰어넘기를 같이 써서 저 부품을 얻어보자! ","cparty_robot_intro_5":"덕분에 몸이 아주 좋아졌어! 이번에도 회전과 뛰어넘기를 같이 써야 할 거야! 어서 가보자!","cparty_robot_intro_6":"멋져! 이제 몸이 많이 좋아져서, 똑같은 일은 여러 번 해도 괜찮을 거야! 한 번 반복하기를 사용해서 가보자!","cparty_robot_intro_7":"어? 중간중간에 뛰어넘어야 할 곳이 있어! 그래도 반복하기로 충분히 갈 수 있을 거야!","cparty_robot_intro_8":"이런! 이번에는 부품이 저기 멀리 떨어져 있어. 그래도 반복하기를 사용하면 쉽게 갈수 있지! 얼른 도와줘!","cparty_robot_intro_9":"우와~ 이제 내 몸이 거의 다 고쳐진 것 같아! 이번에도 반복하기를 이용해서 부품 구하러 가보자!","cparty_robot_intro_10":"대단해! 이제 마지막 부품만 있으면 내 몸을 완벽하게 고칠 수 있을 거야! 빨리 반복하기로 도와줘!","cparty_car_intro_1":"안녕! 나는 엔트리봇이라고 해, 자동차를 타고 계속 이동하려면 연료가 필요해! 앞에 있는 연료를 얻을 수 있게 도와줄래?","cparty_car_intro_2":"좋아! 그런데 이번에는 길이 직선이 아니네! 왼쪽/오른쪽 돌기 블록으로 잘 운전해서 함께 연료를 얻으러 가볼까?","cparty_car_intro_3":"잘했어! 이번 길 앞에는 과속방지턱이 있어. 빠르게 운전하면 사고가 날 수도 있을 것 같아, 천천히 가기 블록을 써서 연료를 얻으러 가보자!","cparty_car_intro_4":"야호, 이제 운전이 한결 편해졌어! 이 도로에서는 반복하기 블록을 사용해서 연료를 채우러 가볼까?","cparty_car_intro_5":"와 이번 도로는 조금 복잡해 보이지만, 앞으로 가기와 왼쪽/오른쪽 돌기 블록을 반복하면서 가보면 돼! 차분하게 연료까지 가보자","cparty_car_intro_6":"이번에는 도로에 장애물이 있어서 잘 돌아가야 될 것 같아, 만약에 장애물이 앞에 있다면 어떻게 해야 하는지 알려줘!","cparty_car_intro_7":"좋아 잘했어! 한번 더 만약에 블록을 사용해서 장애물을 피해 연료를 얻으러 가보자!","cparty_car_intro_8":"앗 아까 만났던 과속 방지턱이 두 개나 있네, 천천히 가기 블록을 이용해서 안전하게 연료를 채우러 가보자!","cparty_car_intro_9":"복잡해 보이는 길이지만, 앞에서 사용한 반복 블록과 만약에 블록을 잘 이용하면 충분히 운전할 수 있어, 연료를 채울 수 있도록 도와줘!","cparty_car_intro_10":"정말 멋져! 블록의 순서를 잘 나열해서 이제 마지막 남은 연료를 향해 힘을 내어 가보자!","cparty_car_popup_prefix_1":"좋아! 연료를 얻었어!","cparty_car_popup_prefix_2":"우왓! 연료를 얻었어! <br> 하지만 연료를 얻기에는 더 적은 블록을 사용해서도 <br> 얻을 수 있는데 다시 해볼래? ","cparty_car_popup_suffix":"고마워~ 덕분에 모든 배터리를 얻을 수 있었어~ <br>다음에 또 나랑 놀자~","all_grade":"모든 학년","grade_e3_e4":"초등 3 ~ 4 학년 이상","grade_e5_e6":"초등 5 ~ 6 학년 이상","grade_m1_m3":"중등 1 ~ 3 학년 이상","entry_first_step":"엔트리 첫걸음","entry_monthly":"월간 엔트리","play_sw_2":"EBS 소프트웨어야 놀자2","entry_programming":"실전, 프로그래밍!","entry_recommanded_course":"엔트리 추천 코스","introduce_course":"누구나 쉽게 보고 따라하면서 재미있고 다양한 소프트웨어를 만들 수 있는 강의 코스를 소개합니다.","all_free":"*강의 동영상, 만들기, 교재 등이 모두 무료로 제공됩니다.","cparty_result_fail_1":"에궁, 그 곳으로는 갈 수 없어. 가야하는 길을 다시 알려줘~","cparty_result_fail_2":"에고고, 아파라. 뛰어 넘었어야 했던 곳이였어. 다시 해보자.","cparty_result_fail_3":"아이고 힘들다. 아래 블록들을 안 썼더니 너무 힘들어! 아래 블록들로 다시 만들어줘.","cparty_result_fail_4":"어? 이제 어디로 가지? 어디로 가야하는 지 더 알려줘~","cparty_result_fail_5":"앗! 과속방지턱에서는 속도를 줄여야해. 천천히 가기 블록을 사용해보자~","cparty_result_success_1":"좋아! 부품을 얻었어!","cparty_result_success_2":"우왓! 부품을 얻었어! <br>하지만 부품을 얻기에는 더 적은 블록을 사용해서도 얻을 수 있는데 다시 해볼래?","cparty_result_success_3":"고마워~ 덕분에 내몸이 다 고쳐졌어~ 다음에 또 나랑 놀자~","cparty_insert_name":"이름을 입력하세요.","offline_file":"파일","offline_edit":"편집","offline_undo":"되돌리기","offline_redo":"다시실행","offline_quit":"종료","select_one":"선택해 주세요.","evaluate_challenge":"도전해본 미션의 난이도를 평가해 주세요.","very_easy":"매우쉬움","easy":"쉬움","normal":"보통","difficult":"어려움","very_difficult":"매우 어려움","save_dismiss":"바꾼 내용을 저장하지 않았습니다. 계속 하시겠습니까?","entry_info":"엔트리 정보","actual_size":"실제크기","zoom_in":"확대","zoom_out":"축소","cparty_jr_intro_1":"안녕! 난 엔트리봇 이라고 해! 학교가는 길에 책가방을 챙길 수 있도록 도와줘! ","cparty_jr_intro_2":"책가방이 내 왼쪽에 있어! 왼쪽으로 가보자.","cparty_jr_intro_3":"책가방이 위쪽에 있어! 책가방을 챙길 수 있도록 도와줘!","cparty_jr_intro_4":"어서 책가방을 챙기러 가자! 아래쪽으로 가보는 거야~","cparty_jr_intro_5":"우왓! 내 책가방이 멀리 떨어져 있어. 책가방이 있는 곳까지 안내해줄래?","cparty_jr_intro_6":"책가방이 있어! 얼른 가지러 가자~","cparty_jr_intro_7":"길 위에 내 연필이 있네. 연필들을 모아 책가방을 챙기러 가보자!","cparty_jr_intro_8":"학교 가는 길에 연필이 있어! 연필을 모아 책가방을 챙기러 가보자!","cparty_jr_intro_9":"내 책가방이 멀리 떨어져 있네? 가장 빠른 길로 책가방을 챙기러 가 보자.","cparty_jr_intro_10":"가는 길에 연필을 모두 모으고 책가방을 챙기자!","cparty_jr_intro_11":"책가방을 챙기러 가려면 오른쪽으로 다섯 번이나 가야 하잖아? 반복하기 블록을 사용해서 좀 더 쉽게 가 보자.","cparty_jr_intro_12":"반복하기를 사용해서 책가방을 챙기러 가자.","cparty_jr_intro_13":"지금 블록으로는 책가방이 있는 쪽으로 갈 수가 없어. 반복 횟수를 바꿔 책가방을 챙기러 갈 수 있게 해줘.","cparty_jr_intro_14":"반복 블록을 사용하여 책가방을 챙기러 가줘.","cparty_jr_intro_15":"학교가 정~말 멀리 있잖아? 그래도 반복 블록을 사용하면 쉽게 학교에 도착 할수 있을 거야.","make_new_project":"새로운 작품 만들기","open_old_project":"저장된 작품 불러오기","offline_download":"엔트리 다운로드","offline_release":"엔트리 오프라인 에디터 출시!","offline_description_1":"엔트리 오프라인 버전은","offline_description_2":"인터넷이 연결되어 있지 않아도 사용할 수 있습니다. ","offline_description_3":"지금 다운받아서 시작해보세요!","sw_week_2015":"2015 소프트웨어교육 체험 주간","cparty_desc":"두근두근 소프트웨어와의 첫만남","entry_offline_download":"엔트리 오프라인 \n다운로드","offline_desc_1":"엔트리 오프라인 버전은 인터넷이 연결되어 있지 않아도 사용할 수 있습니다.","offline_desc_2":"지금 다운받아서 시작해보세요!","download":"다운로드","version":"버전","file_size":"크기","update":"업데이트","use_range":"사용범위","offline_desc_free":"엔트리 오프라인은 기업과 개인 모두 제한 없이 무료로 사용하실 수 있습니다.","offline_required":"최소 요구사항","offline_required_detail":"디스크 여유 공간 500MB 이상, windows7 혹은 MAC OS 10.8 이상","offline_notice":"설치 전 참고사항","offline_notice_1":"1. 버전 1.3.2 에서는 하드웨어 연결 프로그램이 내장되어 있습니다.","offline_notice_2":"2. 별도의 웹브라우져가 필요하지 않습니다.","offline_notice_3":"버전 별 변경 사항 안내","cparty_jr_result_2":"고마워~ 덕분에 책가방을 챙겨서 학교에 올 수 있었어~ <br>다음 학교 가는 길도 함께 가자~ ","cparty_jr_result_3":"우왓! 학교까지 왔어! <br>하지만 더 적은 블록을 사용해도 학교에 갈 수 있는데<br> 다시 해볼래?","cparty_jr_result_4":"우왓! 책가방을 얻었어!<br> 하지만 더 적은 블록을 사용해도 책가방을 얻을 수 있는데 <br>다시 해볼래? ","lms_no_class":"아직 만든 학급이 없습니다.","lms_create_class":"학급을 만들어 주세요.","lms_add_class":"학급 만들기","lms_base_class":"기본","lms_delete_class":"삭제","lms_my_class":"나의 학급","lms_grade_1":"초등 1","lms_grade_2":"초등 2","lms_grade_3":"초등 3","lms_grade_4":"초등 4","lms_grade_5":"초등 5","lms_grade_6":"초등 6","lms_grade_7":"중등 1","lms_grade_8":"중등 2","lms_grade_9":"중등 3","lms_grade_10":"일반","lms_add_groupId_personal":"선생님께 받은 학급 아이디를 입력하여, 회원 정보에 추가하세요.","lms_add_groupId":"학급 아이디 추가하기","lms_add_group_account":"학급 계정 추가","lms_enter_group_info":"발급받은 학급 아이디와 비밀번호를 입력하세요.","lms_group_id":"학급 아이디","lms_group_pw":"비밀번호","lms_group_name":"소속 학급명","personal_pwd_alert":"올바른 비밀번호 양식을 입력해 주세요","personal_form_alert":"양식을 바르게 입력해 주세요","personal_form_alert_2":"모든 양식을 완성해 주세요","personal_no_pwd_alert":"비밀번호를 입력해 주세요","select_gender":"성별을 선택해 주세요","enter_group_id":"학급 아이디를 입력해 주세요","enter_group_pwd":"비밀번호를 입력해 주세요","info_added":"추가되었습니다","no_group_id":"학급 아이디가 존재하지 않습니다","no_group_pwd":"비밀번호가 일치하지 않습니다","lms_please_choice":"선택해 주세요.","group_lesson":"나의 학급 강의","lms_banner_add_group":"학급 기능 도입","lms_banner_entry_group":"엔트리 학급 만들기","lms_banner_desc_1":"우리 반 학생들을 엔트리에 등록하세요!","lms_banner_desc_2":"이제 보다 편리하고 쉽게 우리 반 학생들의 작품을 찾고,","lms_banner_desc_3":"성장하는 모습을 확인할 수 있습니다. ","lms_banner_download_manual":"메뉴얼 다운로드","lms_banner_detail":"자세히 보기","already_exist_email":"이미 존재하는 이메일 입니다.","remove_project":"작품을 삭제하시겠습니까?","study_lesson":"우리 반 학습하기","open_project":"작품 불러오기","make_group":"학급 만들기","project_share":"작품 공유하기","group_project_share":"학급 공유하기","group_discuss":"학급 글 나누기","my_profile":"마이 페이지","search_updated":"최신 작품","search_recent":"최근 조회수 높은 작품","search_complexity":"최근 제작에 공들인 작품","search_staffPicked":"스태프선정 작품 저장소","search_childCnt":"사본이 많은 작품","search_likeCnt":"최근 좋아요가 많은 작품","gnb_share":"공유하기","gnb_community":"커뮤니티","lms_add_lectures":"강의 올리기","lms_add_course":"강의 모음 올리기","lms_add_homework":"과제 올리기","remove_lecture_confirm":"강의를 정말 삭제하시겠습니까?","popup_delete":"삭제하기","remove_course_confirm":"강의모음을 정말 삭제하시겠습니까?","lms_no_lecture_teacher_1":"추가된 강의가 없습니다.","lms_no_lecture_teacher_2":"우리 반 강의를 추가해 주세요.","gnb_download":"다운로드","lms_no_lecture_student_1":"아직 올라온 강의가 없습니다.","lms_no_lecture_student_2":"선생님이 강의를 올려주시면,","lms_no_lecture_student_3":"학습 내용을 확인할 수 있습니다.","lms_no_class_teacher":"아직 만든 학급이 없습니다.","lms_no_course_teacher_1":"추가된 강의 모음이 없습니다.","lms_no_course_teacher_2":"우리 반 강의모음을 추가해 주세요.","lms_no_course_student_1":"아직 올라온 강의 모음이 없습니다.","lms_no_course_student_2":"선생님이 강의 모음을  올려주시면,","lms_no_course_student_3":"학습 내용을 확인할 수 있습니다.","lms_no_hw_teacher_1":"추가된 과제가 없습니다.","lms_no_hw_teacher_2":"우리 반 과제를 추가해 주세요.","lms_no_hw_student_1":"아직 올라온 과제가 없습니다.","lms_no_hw_student_2":"선생님이 과제를 올려주시면,","lms_no_hw_student_3":"학습 내용을 확인할 수 있습니다.","modal_edit":"수정하기","modal_deadline":"마감일 설정","modal_hw_desc":"상세설명 (선택)","desc_optional":"","modal_create_hw":"과제 만들기","vol":"회차","hw_title":"과제명","hw_description":"내용","deadline":"마감일","do_homework":"과제하기","hw_progress":"진행 상태","hw_submit":"제출","view_list":"명단보기","view_desc":"내용보기","do_submit":"제출하기","popup_notice":"알림","no_selected_hw":"선택된 과제가 없습니다.","hw_delete_confirm":"선택한 과제를 정말 삭제하시겠습니까?","hw_submitter":"과제 제출자 명단","hw_student_desc_1":"* '제출하기'를 눌러 제출을 완료하기 전까지 얼마든지 수정이 가능합니다","hw_student_desc_2":"* 제출 기한이 지나면 과제를 제출할 수 없습니다.","popup_create_class":"학급 만들기","class_name":"학급 이름","image":"이미지","select_class_image":"학급 이미지를 선택해 주세요.","type_class_description":"학급 소개 입력","set_as_primary_group":"기본학급으로 지정","set_primary_group":"지정","not_primary_group":"지정안함","type_class_name":"학급 이름을 입력해주세요. ","type_class_description_long":"학급 소개를 입력해 주세요. 80자 내외","add_students":"학생 추가하기","invite_students":"학급에 학생 초대하기","invite_with_class":"1. 학급 코드로 초대하기","invite_code_expiration":"코드 만료시간","generate_code_button":"코드재발급","generate_code_desc":"학생의 학급 코드 입력 방법","generate_code_desc1":"엔트리 홈페이지에서 로그인을 해주세요.","generate_code_desc2":"메뉴바에서<나의 학급>을 선택해주세요.","generate_code_desc3":"<학급코드 입력하기>를 눌러 학급코드를 입력해주세요.","invite_with_url":"2. 학급 URL로 초대하기","copy_invite_url":"복사하기","download_as_pdf":"학급계정 PDF로 내려받기","download_as_excel":"학급계정 엑셀로 내려받기","temp_password":"임시 비밀번호 발급","step_name":"이름 입력","step_info":"정보 추가/수정","preview":"미리보기","type_name_enter":"학급에 추가할 학생의 이름을 입력하고 엔터를 치세요.","multiple_name_possible":"여러명의 이름 입력이 가능합니다.","id_auto_create":"학번은 별도로 수정하지 않으면 자동으로 생성됩니다.","student_id_desc_1":"학급 아이디는 별도의 입력없이 자동으로 생성됩니다.","student_id_desc_2":"단, 엔트리에 이미 가입된 학생을 학급에 추가한다면 학생의 엔트리 아이디를","student_id_desc_3":"입력해주세요. 해당 학생은 로그인 후, 학급 초대를 수락하면 됩니다.","student_number":"학번","temp_password_desc_1":"임시 비밀번호로 로그인 후,","temp_password_desc_2":"신규 비밀번호를 다시 설정할 수 있도록 안내해주세요.","temp_password_desc_3":"*한번 발급된 임시 비밀번호는 다시 볼 수 없습니다.","student_delete_confirm":"학생을 정말 삭제하시겠습니까?","no_student_selected":"선택된 학생이 없습니다.","class_assignment":"학급 과제","class_list":"학급 목록","select_grade":"학년을 선택 하세요.","add_project":"작품 공유하기","no_project_display":"아직 학생들이 전시한 작품이 없습니다.","plz_display_project":"나의 작품을 전시해 주세요.","refuse_confirm":"학급 초대를 정말 거절하시겠습니까?","select_class":"학급 선택","mon":"월","tue":"화","wed":"수","thu":"목","fri":"금","sat":"토","sun":"일","jan":"1월","feb":"2월","mar":"3월","apr":"4월","may":"5월","jun":"6월","jul":"7월","aug":"8월","sep":"9월","oct":"10월","nov":"11월","dec":"12월","plz_select_lecture":"강의를 선택해 주세요.","plz_set_deadline":"마감일을 설정해 주세요.","hide_entry":"엔트리 가리기","hide_others":"기타 가리기","show_all":"모두 보기","lecture_description":"선생님들이 직접 만드는 엔트리 학습 공간입니다. 강의에서 예시작품을 보고 작품을 만들며 배워 보세요.","curriculum_description":"학습 순서와 주제에 따라 여러 강의가 모아진 학습 공간입니다. 강의 모음의 순서에 맞춰 차근차근 배워보세요.","linebreak_off_desc_1":"글상자의 크기가 글자의 크기를 결정합니다.","linebreak_off_desc_2":"내용을 한 줄로만 작성할 수 있습니다.","linebreak_off_desc_3":"새로운 글자가 추가되면 글상자의 좌우 길이가 길어집니다.","linebreak_on_desc_1":"글상자의 크기가 글자가 쓰일 수 있는 영역을 결정합니다.","linebreak_on_desc_2":"내용 작성시 엔터키로 줄바꿈을 할 수 있습니다.","linebreak_on_desc_3":"내용을 작성하시거나 새로운 글자를 추가시 길이가 글상자의 가로 영역을 넘어서면 자동으로 줄이 바뀝니다.","entry_with":"함께 만드는 엔트리","ebs_season_1":"시즌 1 보러가기","ebs_season_2":"시즌 2 보러가기","partner":"파트너","project_term_popup_title":"작품 공개에 따른 엔트리 저작권 정책 동의","project_term_popup_description_1":"작품 공개를 위해","project_term_popup_description_2":"아래 정책을 확인해주세요.","project_term_popup_description_3":"","project_term_popup_description_4":"","project_term_agree_1_1":"내가 만든 작품과 그 소스코드의 공개를 동의합니다.","project_term_agree_2_1":"다른 사람이 나의 작품을 이용하는 것을 허락합니다.","project_term_agree_2_2":"( 복제 , 배포 , 공중송신 포함 )","project_term_agree_3_1":"다른 사람이 나의 작품을 수정하는 것을 허락합니다.","project_term_agree_3_2":"( 리믹스, 변형, 2차 제작물 작성 포함)","agree_all":"전체 동의","select_login":"로그인 선택","select":"선택하세요","with_login":"로그인 하고","without_login":"로그인 안하고","start_challenge":"미션 도전하기","start_challenge_2":"미션 도전하기","if_not_save_not_login":"* 로그인을 안하고 미션에 참여하시면 진행 상황이 저장되지 않습니다.","if_not_member_yet":"엔트리 회원이 아니라면?","join_entry":"엔트리 회원 가입하기","learned_computing":"기존에 소프트웨어 교육을 받아보셨나요?","cparty_index_description_1":"두근두근 소프트웨어와 첫 만남.","cparty_index_description_2":"소프트웨어랑 재미있게 놀다 보면 소프트웨어의 원리도 배우고,  생각하는 힘도 쑥쑥!","cparty_index_description_3":"엔트리를 통해 코딩 미션에 도전하고 인증서 받으세요.","cparty_index_description_4":"2015 Online Coding Party는","cparty_index_description_5":"SW교육 체험 주간","cparty_index_description_6":"의 일환으로써,","cparty_index_description_7":"초등컴퓨팅교사협회","cparty_index_description_8":"와 함께 만들어졌습니다.","cparty_index_description_9":"2016 Online Coding Party는","congratulation":"축하 드립니다!","warm_up":"체험","beginner":"입문","intermediate":"기본","advanced":"발전","applied":"응용","cert_msg_tail":"과정을 성공적으로 마쳤습니다.","cert_msg_head":"","maze_text_content_1":"안녕? 나는 엔트리봇이야. 지금 나는 공장에서 탈출을 해야 해! 탈출하기 위해서 먼저 몸을 고쳐야 할 것 같아. 앞에 있는 부품을 얻을 수 있게 도와줄래? move()","maze_text_content_2":"좋아 아주 잘했어! 덕분에 몸이 한결 가벼워졌어! 이번에도 부품상자까지 나를 이동시켜줘. 그런데 가는길에 장애물이 있어. 장애물 앞에서는 jump()","maze_text_content_3":"멋진걸! 저기에도 부품이 있어! 길이 조금 꼬여있지만 오른쪽, 왼쪽으로 회전할 수 있는 right(); left() 명령어를 쓰면 충분히 갈 수 있을것 같아!","maze_text_content_4":"좋아 이제 움직이는 건 많이 편해졌어! 이번에는 지금까지 배운 명령어를 같이 써서 저 부품상자까지 가보자!","maze_text_content_5":"우와 부품이 두 개나 있잖아! 두 개 다 챙겨서 가자! 그러면 몸을 빨리 고칠 수 있을 것 같아!","maze_text_content_6":"이번이 마지막 부품들이야! 저것들만 있으면 내 몸을 다 고칠 수 있을 거야! 이번에도 도와줄 거지?","maze_text_content_7":"덕분에 몸이 아주 좋아졌어! 이제 똑같은 일을 여러 번 반복해도 무리는 없을 거야. 어? 그런데 앞에 있는 저 로봇은 뭐지? 뭔가 도움이 필요한 것 같아! 도와주자! for 명령어를 사용해서 저 친구한테 나를 데려다줘!","maze_text_content_8":"좋아! 덕분에 친구 로봇을 살릴 수 있었어! 하지만 앞에도 도움이 필요한 친구가 있네, 하지만 이번에는 벌집이 있으니까 조심해서 벌집에 안 닿게 뛰어넘어가자! 할 수 있겠지? 이번에도 for 명령어를 사용해서 친구가 있는곳까지 나를 이동시켜줘!","maze_text_content_9":"이번에는 for 명령어 대신 미션이 끝날때까지 같은 일을 반복하도록 하는 while 명령어를 사용해봐! 나를 친구에게 데려다주면 미션이 끝나!","maze_text_content_10":"이번에는 if 명령어가 나왔어! if와 while 명령어를 사용해서 내가 언제 어느 쪽으로 회전해야 하는지 알려줘!","maze_text_content_11":"좋아 아까 했던 것처럼 해볼까? 언제 왼쪽으로 돌아야 하는지 알려줄 수 있겠어?","maze_text_content_12":"이번에는 중간중간 벌집(bee)이 있네? 언제 뛰어넘어가야 할지 알려줄래?","maze_text_content_13":"여기저기 도움이 필요한 친구들이 많이 있네! 모두 가서 도와주자!","maze_text_content_14":"우와 이번에도 도와줘야 할 친구들이 많네. 먼저 조그마한 사각형을 돌도록 명령어를 만들고 만든 걸 반복해서 모든 친구를 구해보자.","maze_text_content_15":"오래 움직이다 보니 벌써 지쳐버렸어. 자주 쓰는 명령어를 function 명령어를 사용해서 함수로 만들어 놓았어! 함수를 사용하여 나를 배터리 까지 이동시켜줘!","maze_text_content_16":"좋아 멋진걸! 그럼 이번에는 함수에 들어갈 명령어들을 넣어서 나를 배터리까지 이동시켜줘!","maze_text_content_17":"좋아 이번에는 함수를 만들고, 함수를 사용해서 배터리를 얻을 수 있도록 도와줘! 함수를 만들때 jump();를 잘 섞어봐!","maze_text_content_18":"이번에는 길이 좀 복잡한걸? 그래도 언제 left();를 쓰고, 언제 right();를 쓰면 되는지 알려만 주면 배터리 까지 갈 수 있겠어!.","maze_text_content_19":"이번에는 함수가 미리 정해져 있어! 그런데 함수만 써서 배터리까지 가기 힘들것 같아. 함수와 다른 명령어들을 섞어 써서 배터리 까지 이동시켜줘!","maze_text_content_20":"좋아! 지금까지 정말 멋지게 잘 해줬어. 덕분에 이제 마지막 배터리만 채우면 앞으로는 충전이 필요 없을 거야. 함수를 이용해서 저 배터리를 얻고 내가 자유롭게 살 수 있도록 도와줘!","maze_content_1":"안녕 나는 엔트리봇이라고 해. 지금 나는 공장에서 탈출하려는데 먼저 몸을 고쳐야 할 것 같아. 앞에 있는 부품을 얻을 수 있게 도와줄래? 앞으로 가기 블록을 조립하고 시작을 눌러봐.","maze_content_2":"좋아 아주 잘했어! 덕분에 몸이 한결 가벼워졌어! 앞에도 부품이 있는데 이번에는 잘못 가다간 감전되기 쉬울 것 같아. 한 번 장애물 뛰어넘기 블록을 써서 부품까지 가볼까?","maze_content_3":"멋진걸! 저기에도 부품이 있어! 길이 조금 꼬여있지만 회전하기 블록을 쓰면 충분히 갈 수 있을 것 같아! 이번에도 도와줄 거지?","maze_content_4":"좋아 이제 움직이는 건 많이 편해졌어! 이번에는 회전과 뛰어넘기를 같이 써서 저 부품을 얻어보자!","maze_content_5":"우와 부품이 두 개나 있잖아! 두 개 다 챙겨서 가자! 그러면 몸을 빨리 고칠 수 있을 것 같아!","maze_content_6":"이번이 마지막 부품들이야! 저것들만 있으면 내 몸을 다 고칠 수 있을 거야! 이번에도 도와줄 거지?","maze_content_7":"덕분에 몸이 아주 좋아졌어! 이제 똑같은 일을 여러 번 반복해도 무리는 없을 거야. 어? 그런데 앞에 있는 저 로봇은 뭐지? 뭔가 도움이 필요한 것 같아! 도와주자! 얼른 반복하기의 숫자를 바꿔서 저 친구한테 나를 데려다줘!","maze_content_8":"좋아! 덕분에 친구 로봇을 살릴 수 있었어! 하지만 앞에도 도움이 필요한 친구가 있는 것 같아, 하지만 이번에는 벌집이 있으니까 조심해서 벌집에 안 닿게 뛰어넘어가자! 할 수 있겠지? 그럼 아까 했던 것처럼 반복을 써서 친구한테 갈 수 있게 해줄래?","maze_content_9":"이번에는 숫자만큼 반복하는 게 아니라 친구 로봇한테 갈 때까지 똑같은 일을 반복할 수 있어! 이번에도 친구를 구할 수 있도록 도와줘!","maze_content_10":"이번에는 만약 블록이란 게 있어! 만약 블록을 써서 언제 어느 쪽으로 돌아야 하는지 알려줘!","maze_content_11":"좋아 아까 했던 것처럼 해볼까? 언제 왼쪽으로 돌아야 하는지 알려줄 수 있겠어?","maze_content_12":"이번에는 중간중간 벌집이 있네? 언제 뛰어넘어가야 할지 알려줄래?","maze_content_13":"여기저기 도움이 필요한 친구들이 많이 있네! 모두 도와주자!","maze_content_14":"우와 이번에도 도와줘야 할 친구들이 많네. 먼저 조그마한 사각형을 돌도록 블록을 만들고 만든 걸 반복해서 모든 친구를 구해보자.","maze_content_15":"반복을 하도 많이 했더니 자주 쓰는 블록은 외울 수 있을 것 같아! 약속 블록은 지금 내가 외운 블록들이야! 일단은 오래 움직여서 지쳤으니까 배터리를 좀 채울 수 있게 약속 호출 블록을 써서 배터리를 채울 수 있게 해줘!","maze_content_16":"좋아 멋진걸! 그럼 이번에는 네가 자주 쓰일 블록을 나한테 가르쳐줘! 약속 정의 블록 안에 자주 쓰일 블록을 넣어보면 돼!","maze_content_17":"좋아 이번에도 그러면 약속을 이용해서 배터리를 얻을 수 있도록 도와줄 거지? 약속에 뛰어넘기를 잘 섞어봐!","maze_content_18":"이번에는 길이 좀 복잡한걸? 그래도 언제 왼쪽으로 돌고, 언제 오른쪽으로 돌면 되는지 알려만 주면 충전할 수 있을 것 같아.","maze_content_19":"이번에는 약속이 미리 정해져 있어! 그런데 바로 약속을 쓰기에는 안될 것 같아. 내가 갈 길을 보고 약속을 쓰면 배터리를 채울 수 있을 것 같은데 도와줄 거지?","maze_content_20":"좋아! 지금까지 정말 멋지게 잘 해줬어. 덕분에 이제 마지막 배터리만 채우면 앞으로는 충전이 필요 없을 거야. 그러니까 약속을 이용해서 저 배터리를 얻고 내가 자유롭게 살 수 있도록 도와줄래?","ai_content_1":"안녕? 나는 엔트리봇이라고 해. 우주 탐사를 마치고 지구로 돌아가려는데 우주를 떠다니는 돌들 때문에 쉽지 않네. 내가 안전하게 집에 갈 수 있도록 도와줄래? 나의 우주선에는 나의 앞과 위, 아래에 무엇이 어느 정도의 거리에 있는지 알려주는 레이더가 있어 너의 판단을 도와줄 거야!","ai_content_2":"고마워! 덕분에 돌을 쉽게 피할 수 있었어. 그런데 이번엔 더 많은 돌이 있잖아? 블록들을 조립하여 돌들을 이리저리 잘 피해 보자!","ai_content_3":"좋았어! 안전하게 돌을 피했어. 그런데 앞을 봐! 아까보다 더 많은 돌이 있어. 하지만 걱정하지 마. 나에게 반복하기 블록이 있거든. 반복하기 블록 안에 움직이는 블록을 넣으면 목적지에 도착할 때까지 계속 움직일게!","ai_content_4":"대단해! 반복하기 블록을 쓰니 많은 돌을 피하기가 훨씬 수월한걸! 하지만 이렇게 일일이 조종하기는 피곤하다. 나에겐 레이더가 있으니 앞으로 무엇이 나올지 알 수 있어. 앞으로 계속 가다가 앞에 돌이 있으면 피할 수 있도록 해줄래?","ai_content_5":"잘했어! 여기까지 와서 아주 기뻐. 이번에는 레이더가 앞에 있는 물체까지의 거리를 말해줄 거야. 이 기능을 사용하여 돌을 피해 보자! 돌까지의 거리가 멀 때는 앞으로 계속 가다가, 거리가 가까워지면 피할 수 있도록 해줄래?","ai_content_6":"와~ 멋진걸? 레이더를 활용하여 돌을 잘 피해 나가고 있어! 이번에는 여러 개의 레이더를 사용하여 이리저리 돌들을 피해 나갈 수 있게 만들어줄래?","ai_content_7":"휴~ 지구에 점점 가까워지고 있어! 돌을 피할 때 기왕이면 더 안전한 길로 가고 싶어! 아마도 돌이 더 멀리 있는 쪽이 더 안전한 길이겠지? 위쪽 레이더와 아래쪽 레이더를 비교하여 더 안전한 쪽으로 움직이도록 해줄래?","ai_content_8":"좋아! 덕분에 무사히 비행하고 있어. 어? 그런데 저게 뭐지? 저건 내가 아주 위급한 상황에서 사용할 수 있는 특별한 에너지야! 이번에는 저 아이템들을 모두 모으며 움직이자!","ai_content_9":"훌륭해! 이제 지구까지 얼마 안 남았어. 그런데 앞을 보니 돌들로 길이 꽉 막혀서 지나갈 수가 없잖아? 하지만 걱정하지 마. 아이템을 획득해서 사용하면 앞에 있는 꽉 막힌 돌들을 없앨 수 있다고!","ai_content_10":"좋아! 드디어 저기 지구가 보여! 이럴 수가! 이제는 날아오는 돌들을 미리 볼 수가 없잖아? 돌들이 어떻게 날아올지 알지 못해도 지금까지처럼만 움직이면 잘 피할 수 있을 것 같아! 지구까지 가보는 거야!","maze_hints_title_1":"시작 방법","maze_hints_content_1":"엔트리봇은 어떻게 움직이나요?","maze_hints_detail_1":"1. 블록 꾸러미에서 원하는 블록을 꺼내어 “시작하기를 클릭했을 때” 블록과 연결해봐<br>2. 다 조립했으면, 시작을 눌러봐<br>3. 나는 네가 조립한 블록대로 위에서부터 순서대로 움직일게","maze_hints_title_2":"장애물 뛰어넘기","maze_hints_content_2":"장애물이 있으면 어떻게 해야하나요?","maze_hints_detail_2":"길을 가다보면 장애물을 만날 수 있어.<br>장애물이 앞에 있을 때에는 뛰어넘기 블록을 사용해야 해.","maze_hints_title_3":"반복 블록(1)","maze_hints_content_3":"(3)회 반복하기 블록은 어떻게 사용하나요?","maze_hints_detail_3":"같은 행동을 여러번 반복하려면 ~번 반복하기 블록을 사용해야 해.<br>반복하고 싶은 블록들을 ~번 반복하기 안에 넣고 반복 횟수를 입력하면 돼.","maze_hints_title_4":"반복 블록(2)","maze_hints_content_4":"~를 만날 때 까지 반복하기 블록은 어떻게 사용하나요?","maze_hints_detail_4":"~까지 반복하기'를 사용하면 같은 행동을 언제까지 반복할지를 정해줄 수 있어.<br>반복하고 싶은 블록들을 ~까지 반복하기안에 넣으면 돼.<br>그러면 {이미지}와 같은 타일 위에 있는 경우 반복이 멈추게 될 거야.","maze_hints_title_5":"만약 블록","maze_hints_content_5":"만약 ~라면 블록은 어떻게 동작하나요?","maze_hints_detail_5":"만약 앞에 {이미지}가 있다면' 블록을 사용하면 앞에 {이미지}가 있을 때 어떤 행동을 할 지 정해줄 수 있어.<br>앞에 {이미지}가 있을 때에만 블록 안의 블록들을 실행하고<br> 그렇지 않으면 실행하지 않게 되는 거야.","maze_hints_title_6":"반복 블록(3)","maze_hints_content_6":"모든 ~를 만날 때 까지 블록은 어떻게 동작하나요?","maze_hints_detail_6":"모든 {타일}에 한 번씩 도착할 때까지 그 안에 있는 블록을 반복해서 실행해.<br>모든 {타일}에 한 번씩 도착하면 반복이 멈추게 될 거야.","maze_hints_title_7":"특별 힌트","maze_hints_content_7":"너무 어려워요. 도와주세요.","maze_hints_detail_7":"내가 가야하는 길을 자세히 봐. 작은 사각형 4개가 보여?<br>작은 사각형을 도는 블록을 만들고, 반복하기를 사용해 보는것은 어때?","maze_hints_title_8":"약속","maze_hints_content_8":"약속하기/약속 불러오기 무엇인가요? 어떻게 사용하나요?","maze_hints_detail_8":"나를 움직이기 위해 자주 쓰는 블록들의 묶음을 '약속하기' 블록 아래에 조립하여 약속으로 만들 수 있어.<br>한번 만들어 놓은 약속은 '약속 불러오기' 블록을 사용하여 여러 번 꺼내 쓸 수 있다구.","ai_hints_title_1_1":"게임의 목표","ai_hints_content_1_1":"돌을 피해 오른쪽 행성까지 안전하게 이동할 수 있도록 도와주세요.","ai_hints_detail_1_1":"돌을 피해 오른쪽 행성까지 안전하게 이동할 수 있도록 도와주세요.","ai_hints_title_1_2":"시작 방법","ai_hints_content_1_2":"어떻게 시작할 수 있나요?","ai_hints_detail_1_2":"1. 블록 꾸러미에서 원하는 블록을 꺼내어 “시작하기를 클릭했을 때” 블록과 연결해봐<br>2. 다 조립했으면, 시작을 눌러봐<br>3. 나는 네가 조립한 블록대로 위에서부터 순서대로 움직일게","ai_hints_title_1_3":"움직이게 하기","ai_hints_content_1_3":"엔트리봇은 어떻게 움직이나요?","ai_hints_detail_1_3":"나는 위쪽으로 가거나 앞으로 가거나 아래쪽으로 갈 수 있어.<br>방향을 정할 때에는 돌이 없는 방향으로 안전하게 갈 수 있도록 해줘.<br>나를 화면 밖으로 내보내면 우주미아가 되어버리니 조심해!","ai_hints_title_2_1":"게임의 목표","ai_hints_content_2_1":"반복하기 블록으로 돌들을 피할 수 있도록 도와주세요.","ai_hints_detail_2_1":"반복하기 블록으로 돌들을 피할 수 있도록 도와주세요.","ai_hints_title_2_2":"반복 블록","ai_hints_content_2_2":"반복 블록은 무슨 블록인가요?","ai_hints_detail_2_2":"휴~ 이번에 가야 할 길은 너무 멀어서 하나씩 조립하기는 힘들겠는걸? 반복하기블록을 사용해봐.<br>똑같이 반복되는 블록들을 반복하기 블록으로 묶어주면 아주 긴 블록을 짧게 줄여줄 수 있어!","ai_hints_content_3_1":"만약 블록으로 돌을 피할 수 있도록 도와주세요.","ai_hints_title_3_2":"만약 블록(1)","ai_hints_content_3_2":"만약 ~라면 블록은 어떻게 동작하나요?","ai_hints_detail_3_2":"만약 앞에 ~가 있다면 / 아니면 블록을 사용하면 내 바로 앞에 돌이 있는지 없는지 확인해서 다르게 움직일 수 있어~<br>만약 내 바로 앞에 돌이 있다면 '만약' 아래에 있는 블록들을 실행하고 돌이 없으면 '아니면' 안에 있는 블록들을 실행할 거야.<br>내 바로 앞에 돌이 있을 때와 없을 때, 어떻게 움직일지 잘 결정해줘~","ai_hints_content_4_1":"레이더의 사용 방법을 익히고 돌을 피해보세요.","ai_hints_detail_4_1":"레이더의 사용 방법을 익히고 돌을 피해보세요.","ai_hints_title_4_2":"레이더(1)","ai_hints_content_4_2":"레이더란 무엇인가요? 어떻게 활용할 수 있나요?","ai_hints_detail_4_2":"레이더는 지금 내가 물체와 얼마나 떨어져 있는지 알려주는 기계야.<br>만약 바로 내 앞에 무엇인가 있다면 앞쪽 레이더는 '1'을 보여줘.<br>또, 레이더는 혼자 있을 때 보다 만약 &lt;사실&gt;이라면 / 아니면 블록과<br> 같이 쓰이면 아주 강력하게 쓸 수 있어.<br>예를 들어 내 앞에 물체와의 거리가 1보다 크다면 나는 안전하게 앞으로 갈 수 있겠지만, 아니라면 위나 아래쪽으로 피하도록 할 수 있지.","ai_hints_title_4_3":"만약 블록(2)","ai_hints_content_4_3":"만약 <사실>이라면 블록은 어떻게 사용하나요?","ai_hints_detail_4_3":"만약 &lt;사실&gt;이라면 / 아니면 블록은 &lt;사실&gt; 안에 있는 내용이 맞으면 '만약' 아래에 있는 블록을 실행하고, 아니면 '아니면' 아래에 있는 블록을 실행해.<br>어떤 상황에서 다르게 움직이고 싶은 지를 잘 생각해서 &lt;사실&gt; 안에 적절한 판단 조건을 만들어 넣어봐.<br>판단 조건을 만족해서 '만약' 아래에 있는 블록을 실행하고 나면 '아니면' 아래에 있는 블록들은 실행되지 않는다는 걸 기억해!","ai_hints_content_5_1":"레이더를 활용해 돌을 쉽게 피할 수 있도록 도와주세요.","ai_hints_detail_5_1":"레이더를 활용해 돌을 쉽게 피할 수 있도록 도와주세요.","ai_hints_title_5_2":"만약 블록(3)","ai_hints_content_5_2":"만약 블록이 겹쳐져 있으면 어떻게 동작하나요?","ai_hints_detail_5_2":"만약 ~ / 아니면 블록안에도 만약 ~ / 아니면 블록을 넣을 수 있어! 이렇게 되면 다양한 상황에서 내가 어떻게 행동해야 할지 정할 수 있어.<br>예를 들어 앞에 돌이 길을 막고 있을때와 없을때의 행동을 정한다음, 돌이 있을때의 상황에서도 상황에 따라 위쪽으로 갈지 아래쪽으로 갈지 선택 할 수 있어","ai_hints_title_6_1":"레이더(2)","ai_hints_content_6_1":"위쪽 레이더와 아래쪽 레이더의 값을 비교하고 싶을 땐 어떻게 하나요?","ai_hints_detail_6_1":"([위쪽]레이더) 블록은 위쪽 물체까지의 거리를 뜻하는 블록이야.<br>아래쪽과 위쪽 중에서 어느 쪽에 돌이 더 멀리 있는지 확인하기 위해서 쓸 수 있는 블록이지.<br>돌을 피해가는 길을 선택할 때에는 돌이 멀리 떨어져 있는 쪽으로 피하는게 앞으로 멀리 가는데 유리할거야~","ai_hints_content_7_1":"아이템을 향해 이동하여 돌을 피해보세요.","ai_hints_detail_7_1":"아이템을 향해 이동하여 돌을 피해보세요.","ai_hints_title_7_2":"물체 이름 확인","ai_hints_content_7_2":"앞으로 만날 물체의 이름을 확인해서 무엇을 할 수 있나요?","ai_hints_detail_7_2":"아이템을 얻기위해서는 아이템이 어디에 있는지 확인할 필요가 있어. <br>그럴 때 사용할 수 있는 블록이 [위쪽] 물체는 [아이템]인가? 블록이야.<br>이 블록을 활용하면 아이템이 어느 위치에 있는지 알 수 있고 아이템이 있는 방향으로 움직이도록 블록을 조립할 수 있어.","ai_hints_content_8_1":"아이템을 적절하게 사용해서 돌을 피해보세요.","ai_hints_detail_8_1":"아이템을 적절하게 사용해서 돌을 피해보세요.","ai_hints_title_8_2":"아이템","ai_hints_content_8_2":"아이템은 어떻게 얻고 사용하나요?","ai_hints_detail_8_2":"돌들을 이리저리 잘 피해 나가더라도 앞이 모두 돌들로 꽉 막혀있을 땐 빠져나갈 방법이 없겠지? 그럴 때에는 아이템사용 블럭을 사용해봐. <br>이 블록은 내 앞의 돌들을 모두 없애는 블록이야.<br>단, 아이템이 있어야지만 블록을 사용할 수 있고, 아이템은 이미지를 지나면 얻을 수 있어.","ai_hints_content_9_1":"지금까지 배운 것들을 모두 활용해서 최대한 멀리 가보세요.","ai_hints_detail_9_1":"지금까지 배운 것들을 모두 활용해서 최대한 멀리 가보세요.","ai_hints_title_9_2":"그리고","ai_hints_content_9_2":"그리고 블록은 어떻게 사용하나요?","ai_hints_detail_9_2":"그리고 블록에는 여러개의 조건을 넣을 수 있어, 넣은 모든 조건이 사실일때만 사실이 되어 만약 블록 안에 있는 블록이 실행되고, 하나라도 거짓이 있으면 거짓으로 인식해서 그 안에 있는 블록을 실행하지 않아","maze_text_goal_1":"move(); 명령어를 사용하여 부품 상자까지 나를 이동시켜줘!","maze_text_goal_2":"jump(); 명령어로 장애물을 피해 부품 상자까지 나를 이동시켜줘!","maze_text_goal_3":"left(); right();  명령어로 부품상자까지 나를 이동시켜줘!","maze_text_goal_4":"여러가지 명령어를 사용하여 부품상자까지 나를 이동시켜줘!","maze_text_goal_5":"두 부품상자에 다 갈 수 있도록 나를 이동시켜줘!","maze_text_goal_6":"두 부품상자에 다 갈 수 있도록 나를 이동시켜줘!","maze_text_goal_7":"for 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_8":"for 명령어를 사용하고, 장애물을 피해 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_9":"while 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_10":"if와 while 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_11":"if와 while 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_12":"if와 while 명령어를 사용하여 친구가 있는 곳 까지 나를 이동시켜줘!","maze_text_goal_13":"while과 for 명령어를 사용하여 모든 친구들을 만날 수 있도록 나를 이동시켜줘!","maze_text_goal_14":"while과 for 명령어를 사용하여 모든 친구들을 만날 수 있도록 나를 이동시켜줘!","maze_text_goal_15":"함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_16":"함수에 명령어를 넣고 함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_17":"함수에 명령어를 넣고 함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_18":"함수에 명령어를 넣고 함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_19":"함수에 명령어를 넣고 함수를 불러와서 배터리까지 나를 이동시켜줘!","maze_text_goal_20":"함수와 다른명령어들을 섞어 사용하여 배터리까지 나를 이동시켜줘!","above_radar":"위쪽 레이더","bottom_radar":"아래쪽 레이더","front_radar":"앞쪽 레이더","above_object":"위쪽 물체","front_object":"앞쪽 물체","object_below":"아래쪽 물체","destination":"목적지","asteroids":"돌","item":"아이템","wall":"벽","buy_now":"구매바로가기","goals":"목표","instructions":"이용 안내","object_info":"오브젝트 정보","entry_basic_mission":"엔트리 기본 미션","entry_application_mission":"엔트리 응용 미션","maze_move_forward":"앞으로 한 칸 이동","maze_when_run":"시작하기를 클릭했을때","maze_turn_left":"왼쪽으로 회전","maze_turn_right":"오른쪽으로 회전","maze_repeat_times_1":"","maze_repeat_times_2":"번 반복하기","maze_repeat_until_1":"","maze_repeat_until_2":"을 만날때까지 반복","maze_call_function":"약속 불러오기","maze_function":"약속하기","maze_repeat_until_all_1":"모든","maze_repeat_until_all_2":"만날 때 까지 반복","command_guide":"명령어 도움말","ai_success_msg_1":"덕분에 무사히 지구에 도착할 수 있었어! 고마워!","ai_success_msg_2":"다행이야! 덕분에","ai_success_msg_3":"번 만큼 앞쪽으로 갈 수 있어서 지구에 구조 신호를 보냈어! 이제 지구에서 구조대가 올거야! 고마워!","ai_success_msg_4":"좋았어!","ai_cause_msg_1":"이런, 어떻게 움직여야 할 지 더 말해줄래?","ai_cause_msg_2":"아이쿠! 정말로 위험했어! 다시 도전해보자","ai_cause_msg_3":"우와왓! 가야할 길에서 벗어나버리면 우주 미아가 되버릴꺼야. 다시 도전해보자","ai_cause_msg_4":"너무 복잡해, 이 블록을 써서 움직여볼래?","ai_move_forward":"앞으로 가기","ai_move_above":"위쪽으로 가기","ai_move_under":"아래쪽으로 가기","ai_repeat_until_dest":"목적지에 도달 할 때까지 반복하기","ai_if_front_1":"만약 앞에","ai_if_front_2":"가 있다면","ai_else":"아니면","ai_if_1":"만약","ai_if_2":"이라면","ai_use_item":"아이템 사용","ai_radar":"레이더","ai_above":"위쪽","ai_front":"앞쪽","ai_under":"아래쪽","ai_object_is_1":"","ai_object_is_2":"물체는","challengeMission":"다른 미션 도전하기","withTeacher":"함께 만든 선생님들","host":"주최","support":"후원","subjectivity":"주관","learnMore":" 더 배우고 싶어요","ai_object_is_3":"인가?","stage_is_not_available":"아직 진행할 수 없는 스테이지입니다. 순서대로 스테이지를 진행해 주세요.","progress_not_saved":"진행상황이 저장되지 않습니다.","want_refresh":"이 페이지를 새로고침 하시겠습니까?","monthly_entry_grade":"초등학교 3학년 ~ 중학교 3학년","monthly_entry_contents":"매월 발간되는 월간엔트리와 함께 소프트웨어 교육을 시작해 보세요!  차근차근 따라하며 쉽게 익힐 수 있도록 가볍게 구성되어있습니다. 기본, 응용 콘텐츠와 더 나아가기까지! 매월 업데이트되는 8개의 콘텐츠와 교재를 만나보세요~","monthly_entry_etc1":"*메인 페이지의 월간 엔트리 추천코스를 활용하면 더욱 쉽게 수업을 할 수 있습니다.","monthly_entry_etc2":"*월간엔트리는 학기 중에만 발간됩니다.","group_make_lecture_1":"내가 만든 강의가 없습니다.","group_make_lecture_2":"'만들기>오픈 강의 만들기'에서","group_make_lecture_3":"우리반 학습내용에 추가하고 싶은 강의를 만들어 주세요.","group_make_lecture_4":"강의 만들기","group_add_lecture_1":"관심 강의가 없습니다.","group_add_lecture_2":"'학습하기>오픈 강의> 강의'에서 우리반 학습내용에","group_add_lecture_3":"추가하고 싶은 강의를 관심강의로 등록해 주세요.","group_add_lecture_4":"강의 보기","group_make_course_1":"내가 만든 강의 모음이 없습니다.","group_make_course_2":"'만들기 > 오픈 강의 만들기> 강의 모음 만들기'에서","group_make_course_3":"학습내용에 추가하고 싶은 강의 모음을 만들어 주세요.","group_make_course_4":"강의 모음 만들기","group_add_course_1":"관심 강의 모음이 없습니다.","group_add_course_2":"'학습하기 > 오픈 강의 > 강의 모음'에서 우리반 학습내용에","group_add_course_3":"추가하고 싶은 강의 모음을 관심 강의모음으로 등록해 주세요.","group_add_course_4":"강의 모음 보기","hw_main_title":"프로그램 다운로드","hw_desc_wrapper_1":"엔트리 하드웨어 연결 프로그램과 오프라인 버전이","hw_desc_wrapper_2":"서비스를 한층 더 강화해 업그레이드 되었습니다.","hw_desc_wrapper_3":"업데이트 된 프로그램을 설치해주세요!","hw_downolad_link":"하드웨어 연결 \n프로그램 다운로드"};Lang.Msgs={"invalid_url":"영상 주소를 다시 확인해 주세요.","auth_only":"인증된 사용자만 이용이 가능합니다.","runtime_error":"실행 오류","to_be_continue":"준비 중입니다.","warn":"경고","error_occured":"다시 한번 시도해 주세요. 만약 같은 문제가 다시 발생 하면 '제안 및 건의' 게시판에 문의 바랍니다. ","list_can_not_space":"리스트의 이름은 빈 칸이 될 수 없습니다.","sign_can_not_space":"신호의 이름은 빈 칸이 될 수 없습니다.","variable_can_not_space":"변수의 이름은 빈 칸이 될 수 없습니다.","training_top_title":"연수 프로그램","training_top_desc":"엔트리 연수 지원 프로그램을 안내해 드립니다.","training_main_title01":"선생님을 위한 강사 연결 프로그램","training_target01":"교육 대상 l 선생님","training_sub_title01":"“우리 교실에 SW날개를 달자”","training_desc01":"소프트웨어(SW) 교원 연수가 필요한 학교인가요?\nSW 교원 연수가 필요한 학교에 SW교육 전문 선생님(고투티처) 또는 전문 강사를 연결해드립니다.","training_etc_ment01":"* 강의비 등 연수 비용은 학교에서 지원해주셔야합니다.","training_main_title02":"소프트웨어(SW) 선도학교로 찾아가는 교원연수","training_target02":"교육 대상 l SW 선도, 연구학교","training_sub_title02":"“찾아가, 나누고, 이어가다”","training_desc02":"SW 교원 연수를 신청한 선도학교를 무작위로 추첨하여 상반기(4,5,6월)와\n하반기(7,8,9월)에 각 지역의 SW교육 전문 선생님(고투티처)께서 알차고\n재미있는 SW 기초 연수 진행 및 풍부한 교육사례를 공유하기 위해 찾아갑니다.","training_etc_ment02":"* 하반기 연수 모집 예정","training_main_title03":"학부모와 학생을 위한 연결 프로그램","training_target03":"교육 대상 l 학부모, 학생","training_sub_title03":"“SW를 더 가까이 만나는 시간”","training_desc03":"학부모와 학생들을 대상으로 소프트웨어(SW) 연수가 필요한 학교에 각 지역의 SW교육 전문 선생님(고투티처) 또는 전문 강사를 연결해드립니다.","training_etc_ment03":"* 강의비 등 연수 비용은 학교에서 지원해주셔야합니다.","training_apply":"신청하기","training_ready":"준비중입니다."};Lang.Users={"auth_failed":"인증에 실패하였습니다","birth_year":"태어난 해","birth_year_before_1990":"1990년 이전","edit_personal":"정보수정","email":"이메일","email_desc":"새 소식이나 정보를 받을 수 있 이메일 주소","email_inuse":"이미 등록된 메일주소 입니다","email_match":"이메일 주소를 올바르게 입력해 주세요","forgot_password":"암호를 잊으셨습니까?","job":"직업","language":"언어","name":"이름","name_desc":"사이트내에서 표현될 이름 또는 별명","name_not_empty":"이름을 반드시 입력하세요","password":"암호","password_desc":"최소 4자이상 영문자와 숫자, 특수문자","password_invalid":"암호가 틀렸습니다","password_long":"암호는 4~20자 사이의 영문자와 숫자, 특수문자로 입력해 주세요","password_required":"암호는 필수입력 항목입니다","project_list":"작품 조회","regist":"가입 완료","rememberme":"자동 로그인","repeat_password":"암호 확인","repeat_password_desc":"암호를 한번더 입력해 주세요","repeat_password_not_match":"암호가 일치하지 않습니다","sex":"성별","signup_required_for_save":"저장을 하려면 로그인이 필요합니다.","username":"아이디","username_desc":"로그인시 사용할 아이디","username_inuse":"이미 사용중인 아이디 입니다","username_long":"아이디는 4~20자 사이의 영문자로 입력해 주세요","username_unknown":"존재하지 않는 사용자 입니다"};Lang.Workspace={"new_project":"새 프로젝트","add_object":"오브젝트 추가하기","all":"전체","animal":"동물","arduino_entry":"아두이노 연결 프로그램","arduino_program":"아두이노 프로그램","arduino_sample":"엔트리 연결블록","arduino_driver":"아두이노 드라이버","cannot_add_object":"실행중에는 오브젝트를 추가할 수 없습니다.","cannot_add_picture":"실행중에는 모양을 추가할 수 없습니다.","cannot_add_sound":"실행중에는 소리를 추가할 수 없습니다.","cannot_edit_click_to_stop":"실행중에는 수정할 수 없습니다.\n클릭하여 정지하기.","cannot_open_private_project":"비공개 작품은 불러올 수 없습니다. 홈으로 이동합니다.","cannot_save_running_project":"실행 중에는 저장할 수 없습니다.","character_gen":"캐릭터 만들기","check_runtime_error":"빨간색으로 표시된 블록을 확인해 주세요.","context_download":"PC에 저장","context_duplicate":"복제","context_remove":"삭제","context_rename":"이름 수정","coordinate":"좌표","create_function":"함수 만들기","direction":"이동 방향","drawing":"직접 그리기","enter_list_name":"새로운 리스트의 이름을 입력하세요(10글자 이하)","enter_name":"새로운 이름을 입력하세요","enter_new_message":"새로운 신호의 이름을 입력하세요.","enter_variable_name":"새로운 변수의 이름을 입력하세요(10글자 이하)","family":"엔트리봇 가족","fantasy":"판타지/기타","file_new":"새로 만들기","file_open":"온라인 작품 불러오기","file_upload":"오프라인 작품 불러오기","file_upload_login_check_msg":"오프라인 작품을 불러오기 위해서는 로그인을 해야 합니다.","file_save":"저장하기","file_save_as":"복사본으로 저장하기","file_save_download":"내 컴퓨터에 저장하기","func":"함수","function_create":"함수 만들기","function_add":"함수 추가","interface":"인터페이스","landscape":"배경","list":"리스트","list_add_calcel":"리스트 추가 취소","list_add_calcel_msg":"리스트 추가를 취소하였습니다.","list_add_fail":"리스트 추가 실패","list_add_fail_msg1":"같은 이름의 리스트가 이미 존재합니다.","list_add_fail_msg2":"리스트의 이름이 적절하지 않습니다.","list_add_ok":"리스트 추가 완료","list_add_ok_msg":"을(를) 추가하였습니다.","list_create":"리스트 추가","list_dup":"같은 이름의 리스트가 이미 존재합니다.","list_newname":"새로운 이름","list_remove":"리스트 삭제","list_rename":"리스트 이름 변경","list_rename_failed":"리스트 이름 변경 실패","list_rename_ok":"리스트의 이름이 성공적으로 변경 되었습니다.","list_too_long":"리스트의 이름이 너무 깁니다.","message":"신호","message_add_cancel":"신호 추가 취소","message_add_cancel_msg":"신호 추가를 취소하였습니다.","message_add_fail":"신호 추가 실패","message_add_fail_msg":"같은 이름의 신호가 이미 존재합니다.","message_add_ok":"신호 추가 완료","message_add_ok_msg":"을(를) 추가하였습니다.","message_create":"신호 추가","message_dup":"같은 이름의 신호가 이미 존재합니다.","message_remove":"신호 삭제","message_remove_canceled":"신호 삭제를 취소하였습니다.","message_rename":"신호 이름을 변경하였습니다.","message_rename_failed":"신호 이름 변경에 실패하였습니다. ","message_rename_ok":"신호의 이름이 성공적으로 변경 되었습니다.","message_too_long":"신호의 이름이 너무 깁니다.","no_message_to_remove":"삭제할 신호가 없습니다","no_use":"사용되지 않음","no_variable_to_remove":"삭제할 변수가 없습니다.","no_variable_to_rename":"변경할 변수가 없습니다.","object_not_found":"블록에서 지정한 오브젝트가 존재하지 않습니다.","object_not_found_for_paste":"붙여넣기 할 오브젝트가 없습니다.","people":"일반 사람들","picture_add":"모양 추가","plant":"식물","project":"작품","project_copied":"의 사본","PROJECTDEFAULTNAME":['멋진','재밌는','착한','큰','대단한','잘생긴','행운의'],"remove_object":"오브젝트 삭제","remove_object_msg":"(이)가 삭제되었습니다.","removed_msg":"(이)가 성공적으로 삭제 되었습니다.","rotate_method":"회전방식","rotation":"방향","run":"시작하기","saved":"저장완료","saved_msg":"(이)가 저장되었습니다.","save_failed":"저장시 문제가 발생하였습니다. 다시 시도해 주세요.","select_library":"라이브러리 선택","select_sprite":"적용할 스프라이트를 하나 이상 선택하세요.","shape_remove_fail":"모양 삭제 실패","shape_remove_fail_msg":"적어도 하나 이상의 모양이 존재하여야 합니다.","shape_remove_ok":"모양이 삭제 되었습니다. ","shape_remove_ok_msg":"이(가) 삭제 되었습니다.","sound_add":"소리 추가","sound_remove_fail":"소리 삭제 실패","sound_remove_ok":"소리 삭제 완료","sound_remove_ok_msg":"이(가) 삭제 되었습니다.","stop":"정지하기","pause":"일시정지","restart":"다시시작","speed":"속도 조절하기","tab_attribute":"속성","tab_code":"블록","tab_picture":"모양","tab_sound":"소리","tab_text":"글상자","textbox":"글상자","textbox_edit":"글상자 편집","textbox_input":"글상자의 내용을 입력해주세요.","things":"물건","upload":"파일 업로드","upload_addfile":"파일추가","variable":"변수","variable_add_calcel":"변수 추가 취소","variable_add_calcel_msg":"변수 추가를 취소하였습니다.","variable_add_fail":"변수 추가 실패","variable_add_fail_msg1":"같은 이름의 변수가 이미 존재합니다.","variable_add_fail_msg2":"변수의 이름이 적절하지 않습니다.","variable_add_ok":"변수 추가 완료","variable_add_ok_msg":"을(를) 추가하였습니다.","variable_create":"변수 만들기","variable_add":"변수 추가","variable_dup":"같은 이름의 변수가 이미 존재합니다.","variable_newname":"새로운 이름","variable_remove":"변수 삭제","variable_remove_canceled":"변수 삭제를 취소하였습니다.","variable_rename":"변수 이름을 변경합니다. ","variable_rename_failed":"변수 이름 변경에 실패하였습니다. ","variable_rename_msg":"'변수의 이름이 성공적으로 변경 되었습니다.'","variable_rename_ok":"변수의 이름이 성공적으로 변경 되었습니다.","variable_select":"변수를 선택하세요","variable_too_long":"변수의 이름이 너무 깁니다.","vehicle":"탈것","add_object_alert_msg":"오브젝트를 추가해주세요","add_object_alert":"경고","create_variable_block":"변수 만들기","create_list_block":"리스트 만들기","Variable_Timer":"초시계","Variable_placeholder_name":"변수 이름","Variable_use_all_objects":"모든 오브젝트에서 사용","Variable_use_this_object":"이 오브젝트에서 사용","Variable_used_at_all_objects":"모든 오브젝트에서 사용되는 변수","Variable_create_cloud":"공유 변수로 사용 <br>(서버에 저장됩니다)","Variable_used_at_special_object":"특정 오브젝트에서만 사용되는 변수 입니다. ","draw_new":"새로 그리기","painter_file":"파일 ▼","painter_file_save":"저장하기","painter_file_saveas":"새 모양으로 저장","painter_edit":"편집 ▼","get_file":"가져오기","copy_file":"복사하기","cut_picture":"자르기","paste_picture":"붙이기","remove_all":"모두 지우기","new_picture":"새그림","picture_size":"크기","picture_rotation":"회전","thickness":"굵기","textStyle":"글자","add_picture":"모양 추가","select_picture":"모양 선택","select_sound":"소리 선택","Size":"크기","show_variable":"변수 보이기","default_value":"기본값 ","slide":"슬라이드","min_value":"최솟값","max_value":"최댓값","number_of_list":"리스트 항목 수","use_all_objects":"모든 오브젝트에 사용","list_name":"리스트 이름","list_used_specific_objects":"특정 오브젝트에서만 사용되는 리스트 입니다. ","List_used_all_objects":"모든 오브젝트에서 사용되는 리스트","Scene_delete_error":"장면은 최소 하나 이상 존재해야 합니다.","Scene_add_error":"장면은 최대 10개까지 추가 가능합니다.","replica_of_object":"의 복제본","will_you_delete_scene":"장면은 한번 삭제하면 취소가 불가능 합니다. \n정말 삭제 하시겠습니까?","duplicate_scene":"복제하기","block_explain":"블록 설명 ","block_intro":"블록을 클릭하면 블록에 대한 설명이 나타납니다.","blocks_reference":"블록 설명","hardware_guide":"하드웨어 연결 안내","show_list_workspace":"리스트 보이기","List_create_cloud":"공유 리스트로 사용 <br>(서버에 저장됩니다)","confirm_quit":"바꾼 내용을 저장하지 않았습니다.","confirm_load_temporary":"저장되지 않은 작품이 있습니다. 여시겠습니까?","login_to_save":"로그인후에 저장 바랍니다.","cannot_save_in_edit_func":"함수 편집중에는 저장할 수 없습니다.","new_object":"새 오브젝트","arduino_connect":"하드웨어 연결","arduino_connect_success":"하드웨어가 연결되었습니다.","confirm_load_header":"작품 복구","uploading_msg":"업로드 중입니다","upload_fail_msg":"업로드에 실패하였습니다.</br>다시 한번 시도해주세요.","file_converting_msg":"파일 변환 중입니다.","file_converting_fail_msg":"파일 변환에 실패하였습니다.","fail_contact_msg":"문제가 계속된다면</br>contact_entry@entrylabs.org로 문의해주세요.","saving_msg":"저장 중입니다","saving_fail_msg":"저장에 실패하였습니다.</br>다시 한번 시도해주세요.","loading_msg":"불러오는 중입니다","loading_fail_msg":"불러오기에 실패하였습니다.</br>다시 한번 시도해주세요.","restore_project_msg":"정상적으로 저장되지 않은 작품이 있습니다. 해당 작품을 복구하시겠습니까?","quit_stop_msg":"저장 중에는 종료하실 수 없습니다.","ent_drag_and_drop":"업로드 하려면 파일을 놓으세요","not_supported_file_msg":"지원하지 않은 형식의 파일입니다.","broken_file_msg":"파일이 깨졌거나 잘못된 파일을 불러왔습니다.","check_audio_msg":"MP3, WAV 파일만 업로드가 가능합니다.","check_entry_file_msg":"ENT 파일만 불러오기가 가능합니다.","hardware_version_alert_text":"5월 30일 부터 구버전의 연결프로그램의 사용이 중단 됩니다.\n하드웨어 연결 프로그램을 최신 버전으로 업데이트 해주시기 바랍니다.","variable_name_auto_edited_title":"변수 이름 자동 변경","variable_name_auto_edited_content":"변수의 이름은 10글자를 넘을 수 없습니다.","list_name_auto_edited_title":"리스트 이름 자동 변경","list_name_auto_edited_content":"리스트의 이름은 10글자를 넘을 수 없습니다."};Lang.code="코드보기";Lang.EntryStatic={"group":"학급 학습하기","private":"나만보기","public":"오픈 강의","lecture_is_open_true":"공개","lecture_is_open_false":"비공개","category_all":"모든 작품","category_game":"게임","category_animation":"애니메이션","category_media_art":"미디어 아트","category_physical":"피지컬","category_etc":"기타","category_category_game":"게임","category_category_animation":"애니메이션","category_category_media_art":"미디어 아트","category_category_physical":"피지컬","category_category_etc":"기타","sort_created":"최신순","sort_viewer":"조회순","sort_like":"좋아요순","sort_comment":"댓글순","period_all":"전체기간","period_1":"오늘","period_7":"최근 1주일","period_30":"최근 1개월","period_90":"최근 3개월","lecture_required_time_1":" ~ 15분","lecture_required_time_2":"15분 ~ 30분","lecture_required_time_3":"30분 ~ 45분","lecture_required_time_4":"45 분 ~ 60분","lecture_required_time_5":"1시간 이상","usage_event":"이벤트","usage_signal":"신호보내기","usage_scene":"장면","usage_repeat":"반복","usage_condition_repeat":"조건반복","usage_condition":"조건","usage_clone":"복제본","usage_rotation":"회전","usage_coordinate":"좌표이동","usage_arrow_move":"화살표이동","usage_shape":"모양","usage_speak":"말하기","usage_picture_effect":"그림효과","usage_textBox":"글상자","usage_draw":"그리기","usage_sound":"소리","usage_confirm":"확인","usage_comp_operation":"비교연산","usage_logical_operation":"논리연산","usage_math_operation":"수리연산","usage_random":"무작위수","usage_timer":"초시계","usage_variable":"변수","usage_list":"리스트","usage_ask_answer":"묻고답하기","usage_function":"함수","usage_arduino":"아두이노","concept_resource_analytics":"자료수집/분석/표현","concept_procedual":"알고리즘과 절차","concept_abstractive":"추상화","concept_individual":"문제분해","concept_automation":"자동화","concept_simulation":"시뮬레이션","concept_parallel":"병렬화","subject_korean":"국어","subject_english":"영어","subject_mathmatics":"수학","subject_social":"사회","subject_science":"과학","subject_music":"음악","subject_paint":"미술","subject_athletic":"체육","subject_courtesy":"도덕","subject_progmatic":"실과","lecture_grade_1":"초1","lecture_grade_2":"초2","lecture_grade_3":"초3","lecture_grade_4":"초4","lecture_grade_5":"초5","lecture_grade_6":"초6","lecture_grade_7":"중1","lecture_grade_8":"중2","lecture_grade_9":"중3","lecture_grade_10":"일반","lecture_level_1":"쉬움","lecture_level_2":"중간","lecture_level_3":"어려움","listEnable":"리스트","functionEnable":"함수","messageEnable":"신호","objectEditable":"오브젝트","pictureeditable":"모양","sceneEditable":"장면","soundeditable":"소리","variableEnable":"변수","e_1":"초등 1학년","e_2":"초등 2학년","e_3":"초등 3학년","e_4":"초등 4학년","e_5":"초등 5학년","e_6":"초등 6학년","m_1":"중등 1학년","m_2":"중등 2학년","m_3":"중등 3학년","general":"일반","curriculum_is_open_true":"공개","curriculum_open_false":"비공개","notice":"공지사항","qna":"묻고답하기","tips":"노하우&팁","free":"자유 게시판","report":"제안 및 건의","art_category_all":"모든 작품","art_category_game":"게임","art_category_animation":"애니메이션","art_category_physical":"피지컬","art_category_etc":"기타","art_category_media":"미디어 아트","art_sort_updated":"최신순","art_sort_visit":"조회순","art_sort_likeCnt":"좋아요순","art_sort_comment":"댓글순","art_period_all":"전체기간","art_period_day":"오늘","art_period_week":"최근 1주일","art_period_month":"최근 1개월","art_period_three_month":"최근 3개월","level_high":"상","level_mid":"중","level_row":"하","discuss_sort_created":"최신순","discuss_sort_visit":"조회순","discuss_sort_likesLength":"좋아요순","discuss_sort_commentsLength":"댓글순","discuss_period_all":"전체기간","discuss_period_day":"오늘","discuss_period_week":"최근 1주일","discuss_period_month":"최근 1개월","discuss_period_three_month":"최근 3개월"};Lang.Helper={"when_run_button_click":"시작하기 버튼을 클릭하면 아래에 연결된 블록들을 실행합니다.","when_some_key_pressed":"지정된 키를 누르면 아래에 연결된 블록들을 실행 합니다","mouse_clicked":"마우스를 클릭 했을 때 아래에 연결된 블록들을 실행 합니다.","mouse_click_cancled":"마우스 클릭을 해제 했을 때 아래에 연결된 블록들을 실행합니다.","when_object_click":"해당 오브젝트를 클릭했을 때 아래에 연결된 블록들을 실행합니다.","when_object_click_canceled":"해당 오브젝트 클릭을 해제 했을때 아래에 연결된 블록들을 실행 합니다.","when_message_cast":"해당 신호를 받으면 연결된 블록들을 실행합니다.","message_cast":"목록에 선택된 신호를 보냅니다.","message_cast_wait":"목록에 선택된 신호를 보내고, 해당 신호를 받는 블록들의 실행이 끝날때 까지 기다립니다.","when_scene_start":"장면이 시작되면 아래에 연결된 블록들을 실행 합니다. ","start_scene":"선택한 장면을 시작 합니다.","start_neighbor_scene":"이전 장면 또는 다음 장면을 시작합니다.","wait_second":"설정한 시간만큼 기다린 후 다음 블록을 실행 합니다.","repeat_basic":"설정한 횟수만큼 감싸고 있는 블록들을 반복 실행합니다.","repeat_inf":"감싸고 있는 블록들을 계속해서 반복 실행합니다.","repeat_while_true":"판단이 참인 동안 감싸고 있는 블록들을 반복 실행합니다.","stop_repeat":"이 블록을 감싸는 가장 가까운 반복 블록의 반복을 중단 합니다.","_if":"만일 판단이 참이면, 감싸고 있는 블록들을 실행합니다.","if_else":"만일 판단이 참이면, 첫 번째 감싸고 있는 블록들을 실행하고, 거짓이면 두 번째 감싸고 있는 블록들을 실행합니다.","restart_project":"모든 오브젝트를 처음부터 다시 실행합니다.","stop_object":"모두 : 모든 오브젝트들이 즉시 실행을 멈춥니다. <br> 자신 : 해당 오브젝트의 모든 블록들을 멈춥니다. <br> 이 코드 : 이 블록이 포함된 코드가 즉시 실행을 멈춥니다.  <br> 자신의 다른 코드 :  해당 오브젝트 중 이 블록이 포함된 코드를 제외한 모든 코드가 즉시 실행을 멈춥니다.","wait_until_true":"판단이 참이 될 때까지 실행을 멈추고 기다립니다.","when_clone_start":"해당 오브젝트의 복제본이 새로 생성되었을 때 아래에 연결된 블록들을 실행합니다.","create_clone":"선택한 오브젝트의 복제본을 생성합니다.","delete_clone":"‘복제본이 처음 생성되었을 때’ 블록과 함께 사용하여 생성된 복제본을 삭제합니다.","remove_all_clones":"해당 오브젝트의 모든 복제본을 삭제합니다.","move_direction":"설정한 값만큼 오브젝트의 이동방향 화살표가 가리키는 방향으로 움직입니다.","move_x":"오브젝트의 X좌표를 설정한 값만큼 바꿉니다. ","move_y":"오브젝트의 Y좌표를 설정한 값만큼 바꿉니다.","move_xy_time":"오브젝트가 입력한 시간에 걸쳐 x와 y좌표를 설정한 값만큼 바꿉니다","locate_object_time":"오브젝트가 입력한 시간에 걸쳐 선택한 오브젝트 또는 마우스 포인터의 위치로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate_x":"오브젝트가 입력한 x좌표로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate_y":"오브젝트가 입력한 y좌표로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate_xy":"오브젝트가 입력한 x와 y좌표로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate_xy_time":"오브젝트가 입력한 시간에 걸쳐 지정한 x, y좌표로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","locate":"오브젝트가 선택한 오브젝트 또는 마우스 포인터의 위치로 이동합니다. (오브젝트의 중심점이 기준이 됩니다.)","rotate_absolute":"해당 오브젝트의 방향을 입력한 각도로 정합니다.","rotate_by_time":"오브젝트의 방향을 입력한 시간에 걸쳐 입력한 각도만큼 시계방향으로 회전합니다. (오브젝트의 중심점을 기준으로 회전합니다.)","rotate_relative":"오브젝트의 방향을 입력한 각도만큼 시계방향으로 회전합니다. (오브젝트의 중심점을 기준으로 회전합니다.)","direction_absolute":"해당 오브젝트의 이동 방향을 입력한 각도로 정합니다.","direction_relative":"오브젝트의 이동 방향을 입력한 각도만큼 회전합니다.","move_to_angle":"설정한 각도 방향으로 입력한 값만큼 움직입니다. (실행화면 위쪽이 0도, 시계방향으로 갈수록 각도 증가)","see_angle_object":"해당 오브젝트가 다른 오브젝트 또는 마우스 포인터 쪽을 바라봅니다. 오브젝트의 이동방향이 선택된 항목을 향하도록 오브젝트의 방향을 회전해줍니다.","bounce_wall":"해당 오브젝트가 화면 끝에 닿으면 튕겨져 나옵니다. ","show":"해당 오브젝트를 화면에 나타냅니다.","hide":"해당 오브젝트를 화면에서 보이지 않게 합니다.","dialog_time":"오브젝트가 입력한 내용을 입력한 시간 동안 말풍선으로 말한 후 다음 블록이 실행됩니다.","dialog":"오브젝트가 입력한 내용을 말풍선으로 말하는 동시에 다음 블록이 실행됩니다.","remove_dialog":"오브젝트가 말하고 있는 말풍선을 지웁니다.","change_to_some_shape":"오브젝트를 선택한 모양으로 바꿉니다. (내부 블록을 분리하면 모양의 번호를 사용하여 모양 선택 가능)","change_to_next_shape":"오브젝트의 모양을 다음 모양으로 바꿉니다.","set_effect_volume":"해당 오브젝트에 선택한 효과를 입력한 값만큼 줍니다.","set_effect_amount":"색깔 : 오브젝트에 색깔 효과를 입력한 값만큼 줍니다. (0~100을 주기로 반복됨)<br>밝기 : 오브젝트에 밝기 효과를 입력한 값만큼 줍니다. (-100~100 사이의 범위, -100 이하는 -100으로 100 이상은 100으로 처리 됨) <br> 투명도 : 오브젝트에 투명도 효과를 입력한 값만큼 줍니다. (0~100 사이의 범위, 0이하는 0으로, 100 이상은 100으로 처리됨)","set_effect":"해당 오브젝트에 선택한 효과를 입력한 값으로 정합니다.","set_entity_effect":"해당 오브젝트에 선택한 효과를 입력한 값으로 정합니다.","add_effect_amount":"해당 오브젝트에 선택한 효과를 입력한 값만큼 줍니다.","change_effect_amount":"색깔 : 오브젝트의 색깔 효과를 입력한 값으로 정합니다. (0~100을 주기로 반복됨) <br> 밝기 : 오브젝트의 밝기 효과를 입력한 값으로 정합니다. (-100~100 사이의 범위, -100 이하는 -100으로 100 이상은 100으로 처리 됨) <br> 투명도 : 오브젝트의 투명도 효과를 입력한 값으로 정합니다. (0~100 사이의 범위, 0이하는 0으로, 100 이상은 100으로 처리됨)","change_scale_percent":"해당 오브젝트의 크기를 입력한 값만큼 바꿉니다.","set_scale_percent":"해당 오브젝트의 크기를 입력한 값으로 정합니다.","change_scale_size":"해당 오브젝트의 크기를 입력한 값만큼 바꿉니다.","set_scale_size":"해당 오브젝트의 크기를 입력한 값으로 정합니다.","flip_x":"해당 오브젝트의 상하 모양을 뒤집습니다.","flip_y":"해당 오브젝트의 좌우 모양을 뒤집습니다.","change_object_index":"맨 앞으로 : 해당 오브젝트를 화면의 가장 앞쪽으로 가져옵니다. <br> 앞으로 : 해당 오브젝트를 한 층 앞쪽으로 가져옵니다. <br> 뒤로 : 해당 오브젝트를 한 층 뒤쪽으로 보냅니다. <br> 맨 뒤로 : 해당 오브젝트를 화면의 가장 뒤쪽으로 보냅니다.","set_object_order":"해당 오브젝트가 설정한 순서로 올라옵니다.","brush_stamp":"오브젝트의 모양을 도장처럼 실행화면 위에 찍습니다.","start_drawing":"오브젝트가 이동하는 경로를 따라 선이 그려지기 시작합니다. (오브젝트의 중심점이 기준)","stop_drawing":"오브젝트가 선을 그리는 것을 멈춥니다.","set_color":"오브젝트가 그리는 선의 색을 선택한 색으로 정합니다.","set_random_color":"오브젝트가 그리는 선의 색을 무작위로 정합니다. ","change_thickness":"오브젝트가 그리는 선의 굵기를 입력한 값만큼 바꿉니다. (1~무한의 범위, 1 이하는 1로 처리)","set_thickness":"오브젝트가 그리는 선의 굵기를 입력한 값으로 정합니다. (1~무한의 범위, 1 이하는 1로 처리)","change_opacity":"해당 오브젝트가 그리는 붓의 투명도를 입력한 값만큼 바꿉니다.","change_brush_transparency":"해당 오브젝트가 그리는 붓의 투명도를 입력한 값만큼 바꿉니다. (0~100의 범위, 0이하는 0, 100 이상은 100으로 처리)","set_opacity":"해당 오브젝트가 그리는 붓의 투명도를 입력한 값으로 정합니다.","set_brush_tranparency":"해당 오브젝트가 그리는 붓의 투명도를 입력한 값으로 정합니다. (0~100의 범위, 0이하는 0, 100 이상은 100으로 처리)","brush_erase_all":"해당 오브젝트가 그린 선과 도장을 모두 지웁니다.","sound_something_with_block":"해당 오브젝트가 선택한 소리를 재생하는 동시에 다음 블록을 실행합니다.","sound_something_second_with_block":"해당 오브젝트가 선택한 소리를 입력한 시간 만큼만 재생하는 동시에 다음 블록을 실행합니다.","sound_something_wait_with_block":"해당 오브젝트가 선택한 소리를 재생하고, 소리 재생이 끝나면 다음 블록을 실행합니다.","sound_something_second_wait_with_block":"해당 오브젝트가 선택한 소리를 입력한 시간 만큼만 재생하고, 소리 재생이 끝나면 다음 블록을 실행합니다.","sound_volume_change":"작품에서 재생되는 모든 소리의 크기를 입력한 퍼센트만큼 바꿉니다.","sound_volume_set":"작품에서 재생되는 모든 소리의 크기를 입력한 퍼센트로 정합니다.","sound_silent_all":"현재 재생중인 모든 소리를 멈춥니다.","is_clicked":"마우스를 클릭한 경우 ‘참’으로 판단합니다.","is_press_some_key":"선택한 키가 눌려져 있는 경우 ‘참’으로 판단합니다.","reach_something":"해당 오브젝트가 선택한 항목과 닿은 경우 ‘참’으로 판단합니다.","is_included_in_list":"선택한 리스트에 입력한 값을 가진 항목이 포함되어 있는지 확인합니다.","boolean_basic_operator":"= : 왼쪽에 위치한 값과 오른쪽에 위치한 값이  같으면 '참'으로 판단합니다.<br>> : 왼쪽에 위치한 값이 오른쪽에 위치한 값보다 크면 '참'으로 판단합니다.<br>< : 왼쪽에 위치한 값이 오른쪽에 위치한 값보다 작으면 '참'으로 판단합니다.<br>≥ : 왼쪽에 위치한 값이 오른쪽에 위치한 값보다 크거나 같으면 '참'으로 판단합니다.<br>≤ : 왼쪽에 위치한 값이 오른쪽에 위치한 값보다 작거나 같으면 '참'으로 판단합니다.","function_create":"자주 쓰는 코드를 이 블록 아래에 조립하여 함수로 만듭니다. [함수 정의하기]의 오른쪽 빈칸에 [이름]을 조립하여 함수의 이름을 정할 수 있습니다. 함수를 실행하는 데 입력값이 필요한 경우 빈칸에 [문자/숫자값], [판단값]을 조립하여 매개변수로 사용합니다.","function_field_label":"'함수 정의하기'의 빈칸 안에 조립하고, 이름을 입력하여 함수의 이름을 정해줍니다. ","function_field_string":"해당 함수를 실행하는데 문자/숫자 값이 필요한 경우 빈칸 안에 조립하여 매개변수로 사용합니다. 이 블록 내부의[문자/숫자값]을 분리하여 함수의 코드 중 필요한 부분에 넣어 사용합니다.","function_field_boolean":"해당 함수를 실행하는 데 참 또는 거짓의 판단이 필요한 경우 빈칸 안에 조립하여 매개변수로 사용합니다. 이 블록 내부의 [판단값]을 분리하여 함수의 코드 중 필요한 부분에 넣어 사용합니다.","function_general":"현재 만들고 있는 함수 블록 또는 지금까지 만들어 둔 함수 블록입니다.","boolean_and":"두 판단이 모두 참인 경우 ‘참’으로 판단합니다.","boolean_or":"두 판단 중 하나라도 참이 있는 경우 ‘참’으로 판단합니다.","boolean_not":"해당 판단이 참이면 거짓, 거짓이면 참으로 만듭니다.","calc_basic":"+ : 입력한 두 수를 더한 값입니다.<br>- : 입력한 두 수를 뺀 값입니다.<br>X : 입력한 두 수를 곱한 값입니다.<br>/ : 입력한 두 수를 나눈 값입니다.","calc_rand":"입력한 두 수 사이에서 선택된 무작위 수의 값입니다. (두 수 모두 정수를 입력한 경우 정수로, 두 수 중 하나라도 소수를 입력한 경우 소수로 무작위 수가 선택됩니다.)","get_x_coordinate":"해당 오브젝트의 x 좌푯값을 의미합니다.","get_y_coordinate":"해당 오브젝트의 y 좌푯값을 의미합니다.","coordinate_mouse":"마우스 포인터의 x 또는 y의 좌표 값을 의미합니다.","coordinate_object":"선택한 오브젝트 또는 자신의 각종 정보값(x좌표, y좌표, 방향, 이동방향, 크기, 모양번호, 모양이름)입니다.","quotient_and_mod":"몫 : 앞의 수에서 뒤의 수를 나누어 생긴 몫의 값입니다. <br> 나머지 : 앞의 수에서 뒤의 수를 나누어 생긴 나머지 값입니다.","get_rotation_direction":"해당 오브젝트의 방향값, 이동 방향값을 의미합니다.","calc_share":"앞 수에서 뒤 수를 나누어 생긴 몫을 의미합니다.","calc_mod":"앞 수에서 뒤 수를 나누어 생긴 나머지를 의미합니다.","calc_operation":"입력한 수에 대한 다양한 수학식의 계산값입니다.","get_date":"현재 연도, 월, 일, 시각과 같이 시간에 대한 값입니다.","distance_something":"자신과 선택한 오브젝트 또는 마우스 포인터 간의 거리 값입니다.","get_sound_duration":"선택한 소리의 길이(초) 값입니다.","get_project_timer_value":"이 블록이 실행되는 순간 초시계에 저장된 값입니다.","choose_project_timer_action":"시작하기: 초시계를 시작합니다. <br> 정지하기: 초시계를 정지합니다. <br> 초기화하기: 초시계의 값을 0으로 초기화합니다. <br> (이 블록을 블록조립소로 가져오면 실행화면에 ‘초시계 창’이 생성됩니다.)","reset_project_timer":"실행되고 있던 타이머를 0으로 초기화합니다.","set_visible_project_timer":"초시계 창을 화면에서 숨기거나 보이게 합니다.","ask_and_wait":"해당 오브젝트가 입력한 문자를 말풍선으로 묻고, 대답을 입력받습니다. (이 블록을 블록조립소로 가져오면 실행화면에 ‘대답 창’이 생성됩니다.)","get_canvas_input_value":"묻고 기다리기에 의해 입력된 값입니다.","set_visible_answer":"실행화면에 있는 ‘대답 창’을 보이게 하거나 숨길 수 있습니다.","combine_something":"입력한 두 자료를 결합한 값입니다.","get_variable":"선택된 변수에 저장된 값입니다.","change_variable":"선택한 변수에 입력한 값을 더합니다.","set_variable":"선택한 변수의 값을 입력한 값으로 정합니다.","robotis_carCont_sensor_value":"왼쪽 접속 센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>오른쪽 접촉 센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>선택 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.<br/>최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>왼쪽 적외선 센서 : 물체와 가까울 수록 큰 값 입니다.<br/>오른쪽 적외선 센서 : 물체와 가까울 수록 큰 값 값 입니다.<br/>왼쪽 적외선 센서 캘리브레이션 값 : 적외선 센서의 캘리브레이션 값 입니다.<br/>오른쪽 적외선 센서 캘리브레이션 값 : 적외선 센서의 캘리브레이션 값 입니다.<br/>(*캘리브레이션 값 - 적외선센서 조정 값)","robotis_carCont_cm_led":"4개의 LED 중 1번 또는 4번 LED 를 켜거나 끕니다.<br/>LED 2번과 3번은 동작 지원하지 않습니다.","robotis_carCont_cm_sound_detected_clear":"최종 소리 감지횟 수를 0 으로 초기화 합니다.","robotis_carCont_aux_motor_speed":"감속모터 속도를 0 ~ 1023 의 값(으)로 정합니다.","robotis_carCont_cm_calibration":"적외선센서 조정 값(http://support.robotis.com/ko/: 자동차로봇> 2. B. 적외선 값 조정)을 직접 정합니다.","robotis_openCM70_sensor_value":"최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>사용자 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>사용자 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.","robotis_openCM70_aux_sensor_value":"서보모터 위치 : 0 ~ 1023, 중간 위치의 값은 512 입니다.<br/>적외선센서 :  물체와 가까울 수록 큰 값 입니다.<br/>접촉센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>조도센서(CDS) : 0 ~ 1023, 밝을 수록 큰 값 입니다.<br/>온습도센서(습도) : 0 ~ 100, 습할 수록 큰 값 입니다.<br/>온습도센서(온도) : -20 ~ 100, 온도가 높을 수록 큰 값 입니다.<br/>온도센서 :  -20 ~ 100, 온도가 높을 수록 큰 값 입니다.<br/>초음파센서 : -<br/>자석센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>동작감지센서 : 동작 감지(1), 동작 미감지(0) 값 입니다.<br/>컬러센서 : 알수없음(0), 흰색(1), 검은색(2), 빨간색(3), 녹색(4), 파란색(5), 노란색(6) 값 입니다.<br/>사용자 장치 : 사용자 센서 제작에 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","robotis_openCM70_cm_buzzer_index":"음계를 0.1 ~ 5 초 동안 연주 합니다.","robotis_openCM70_cm_buzzer_melody":"멜로디를 연주 합니다.<br/>멜로디를 연속으로 재생하는 경우, 다음 소리가 재생되지 않으면 '흐름 > X 초 기다리기' 블록을 사용하여 기다린 후 실행합니다.","robotis_openCM70_cm_sound_detected_clear":"최종 소리 감지횟 수를 0 으로 초기화 합니다.","robotis_openCM70_cm_led":"제어기의 빨간색, 녹색, 파란색 LED 를 켜거나 끕니다.","robotis_openCM70_cm_motion":"제어기에 다운로드 되어있는 모션을 실행합니다.","robotis_openCM70_aux_motor_speed":"감속모터 속도를 0 ~ 1023 의 값(으)로 정합니다.","robotis_openCM70_aux_servo_mode":"서보모터를 회전모드 또는 관절모드로 정합니다.<br/>한번 설정된 모드는 계속 적용됩니다.<br/>회전모드는 서보모터 속도를 지정하여 서보모터를 회전 시킵니다.<br/>관절모드는 지정한 서보모터 속도로 서보모터 위치를 이동 시킵니다.","robotis_openCM70_aux_servo_speed":"서보모터 속도를 0 ~ 1023 의 값(으)로 정합니다.","robotis_openCM70_aux_servo_position":"서보모터 위치를 0 ~ 1023 의 값(으)로 정합니다.<br/>서보모터 속도와 같이 사용해야 합니다.","robotis_openCM70_aux_led_module":"LED 모듈의 LED 를 켜거나 끕니다.","robotis_openCM70_aux_custom":"사용자 센서 제작에 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","robotis_openCM70_cm_custom_value":"컨트롤 테이블 주소를 직접 입력하여 값을 확인 합니다.<br/>컨트롤 테이블 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","robotis_openCM70_cm_custom":"컨트롤 테이블 주소를 직접 입력하여 값을 정합니다.<br/>컨트롤 테이블 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.","show_variable":"선택한 변수 창을 실행화면에 보이게 합니다.","hide_variable":"선택한 변수 창을 실행화면에서 숨깁니다.","value_of_index_from_list":"선택한 리스트에서 선택한 값의 순서에 있는 항목 값을 의미합니다. (내부 블록을 분리하면 순서를 숫자로 입력 가능)","add_value_to_list":"입력한 값이 선택한 리스트의 마지막 항목으로 추가됩니다.","remove_value_from_list":"선택한 리스트의 입력한 순서에 있는 항목을 삭제합니다.","insert_value_to_list":"선택한 리스트의 입력한 순서의 위치에 입력한 항목을 넣습니다. (입력한 항목의 뒤에 있는 항목들은 순서가 하나씩 밀려납니다.)","change_value_list_index":"선택한 리스트에서 입력한 순서에 있는 항목의 값을 입력한 값으로 바꿉니다.","length_of_list":"선택한 리스트가 보유한 항목 개수 값입니다.","show_list":"선택한 리스트를 실행화면에 보이게 합니다.","hide_list":"선택한 리스트를 실행화면에서 숨깁니다.","text":"해당 글상자가 표시하고 있는 문자값을 의미합니다.","text_write":"글상자의 내용을 입력한 값으로 고쳐씁니다.","text_append":"글상자의 내용 뒤에 입력한 값을 추가합니다.","text_prepend":"글상자의 내용 앞에 입력한 값을 추가합니다.","text_flush":"글상자에 저장된 값을 모두 지웁니다.","erase_all_effects":"해당 오브젝트에 적용된 효과를 모두 지웁니다.","char_at":"입력한 문자/숫자값 중 입력한 숫자 번째의 글자 값입니다.","length_of_string":"입력한 문자값의 공백을 포함한 글자 수입니다.","substring":"입력한 문자/숫자 값에서 입력한 범위 내의 문자/숫자 값입니다.","replace_string":"입력한 문자/숫자 값에서 지정한 문자/숫자 값을 찾아 추가로 입력한 문자/숫자값으로 모두 바꾼 값입니다. (영문 입력시 대소문자를 구분합니다.)","index_of_string":"입력한 문자/숫자 값에서 지정한 문자/숫자 값이 처음으로 등장하는 위치의 값입니다. (안녕, 엔트리!에서 엔트리의 시작 위치는 5)","change_string_case":"입력한 영문의 모든 알파벳을 대문자 또는 소문자로 바꾼 문자값을 의미합니다.","direction_relative_duration":"해당 오브젝트의 이동방향을 입력한 시간에 걸쳐 입력한 각도만큼 시계방향으로 회전합니다. ","get_sound_volume":"현재 작품에 설정된 소리의 크기값을 의미합니다.","sound_from_to":"해당 오브젝트가 선택한 소리를 입력한 시간 부분만을 재생하는 동시에 다음 블록을 실행합니다.","sound_from_to_and_wait":"해당 오브젝트가 선택한 소리를 입력한 시간 부분만을 재생하고, 소리 재생이 끝나면 다음 블록을 실행합니다.","Block_info":"블록 설명","Block_click_msg":"블록을 클릭하면 블록에 대한 설명이 나타납니다.","neobot_sensor_value":"IN1 ~ IN3 포트 및 리모컨에서 입력되는 값 그리고 배터리 정보를 0부터 255의 숫자로 표시합니다.","neobot_sensor_convert_scale":"선택한 포트 입력값의 변화를 특정범위의 값으로 표현범위를 조절할 수 있습니다.","neobot_left_motor":"L모터 포트에 연결한 모터의 회전방향 및 속도를 설정합니다.","neobot_stop_left_motor":"L모터 포트에 연결한 모터를 정지합니다.","neobot_right_motor":"R모터 포트에 연결한 모터의 회전방향 및 속도를 설정합니다.","neobot_stop_right_motor":"R모터 포트에 연결한 모터를 정지합니다.","neobot_all_motor":"L모터 및 R모터 포트에 2개 모터를 연결하여 바퀴로 활용할 때 전, 후, 좌, 우 이동 방향 및 속도, 시간을 설정할 수 있습니다.","neobot_stop_all_motor":"L모터 및 R모터에 연결한 모터를 모두 정지합니다.","neobot_set_servo":"OUT1 ~ OUT3에 서보모터를 연결했을 때 0도 ~ 180도 범위 내에서 각도를 조절할 수 있습니다.","neobot_set_output":"OUT1 ~ OUT3에 라이팅블록 및 전자회로를 연결했을 때 출력 전압을 설정할 수 있습니다.</br>0은 0V, 1 ~ 255는 2.4 ~ 4.96V의 전압을 나타냅니다.","neobot_set_fnd":"FND로 0~99 까지의 숫자를 표시할 수 있습니다.","neobot_play_note_for":"주파수 발진 방법을 이용해 멜로디에 반음 단위의 멜로디 음을 발생시킬 수 있습니다."};Lang.Category={"entrybot_friends":"엔트리봇 친구들","people":"사람","animal":"동물","animal_flying":"하늘","animal_land":"땅","animal_water":"물","animal_others":"기타","plant":"식물","plant_flower":"꽃","plant_grass":"풀","plant_tree":"나무","plant_others":"기타","vehicles":"탈것","vehicles_flying":"하늘","vehicles_land":"땅","vehicles_water":"물","vehicles_others":"기타","architect":"건물","architect_building":"건축물","architect_monument":"기념물","architect_others":"기타","food":"음식","food_vegetables":"과일/채소","food_meat":"고기","food_drink":"음료","food_others":"기타","environment":"환경","environment_nature":"자연","environment_space":"우주","environment_others":"기타","stuff":"물건","stuff_living":"생활","stuff_hobby":"취미","stuff_others":"기타","fantasy":"판타지","interface":"인터페이스","background":"배경","background_outdoor":"실외","background_indoor":"실내","background_nature":"자연","background_others":"기타"};Lang.Device={"arduino":"아두이노","hamster":"햄스터","albert":"알버트","robotis_carCont":"로보티즈 자동차 로봇","robotis_openCM70":"로보티즈 IoT","sensorBoard":"엔트리 센서보드","CODEino":"코드이노","bitbrick":"비트브릭","bitBlock":"비트블록","xbot_epor_edge":"엑스봇","dplay":"디플레이","nemoino":"네모이노","ev3":"EV3"};Lang.General={"turn_on":"켜기","turn_off":"끄기","left":"왼쪽","right":"오른쪽","both":"양쪽","transparent":"투명","black":"검은색","brown":"갈색","red":"빨간색","yellow":"노란색","green":"초록색","skyblue":"하늘색","blue":"파란색","purple":"보라색","white":"하얀색","note_c":"도","note_d":"레","note_e":"미","note_f":"파","note_g":"솔","note_a":"라","note_b":"시"};Lang.Fonts={"batang":"바탕체","myeongjo":"명조체","gothic":"고딕체","pen_script":"필기체","jeju_hallasan":"한라산체","gothic_coding":"코딩고딕체"};Lang.Hw={"note":"노트","leftWheel":"왼쪽 바퀴","rightWheel":"오른쪽 바퀴","leftEye":"왼쪽 눈","rightEye":"오른쪽 눈","led":"불빛","body":"몸통","front":"앞쪽","port_en":"","port_ko":"번 포트","sensor":"센서","light":"빛","temp":"온도","switch_":"스위치","right_ko":"오른쪽","right_en":"","left_ko":"왼쪽","left_en":"","up_ko":"위쪽","up_en":"","down_ko":"아래쪽","down_en":"","output":"출력","left":"왼쪽","right":"오른쪽","sub":"서보","motor":"모터","":"","buzzer":"부저"};Lang.template={"albert_hand_found":"손 찾음?","albert_value":"%1","albert_move_forward_for_secs":"앞으로 %1 초 이동하기 %2","albert_move_backward_for_secs":"뒤로 %1 초 이동하기 %2","albert_turn_for_secs":"%1 으로 %2 초 돌기 %3","albert_change_both_wheels_by":"왼쪽 바퀴 %1 오른쪽 바퀴 %2 만큼 바꾸기 %3","albert_set_both_wheels_to":"왼쪽 바퀴 %1 오른쪽 바퀴 %2 (으)로 정하기 %3","albert_change_wheel_by":"%1 바퀴 %2 만큼 바꾸기 %3","albert_set_wheel_to":"%1 바퀴 %2 (으)로 정하기 %3","albert_stop":"정지하기 %1","albert_set_pad_size_to":"패드 크기를 폭 %1 높이 %2 (으)로 정하기 %3","albert_set_eye_to":"%1 눈을 %2 으로 정하기 %3","albert_clear_eye":"%1 눈 끄기 %2","albert_body_led":"몸통 LED %1 %2","albert_front_led":"앞쪽 LED %1 %2","albert_beep":"삐 소리내기 %1","albert_change_buzzer_by":"버저 음을 %1 만큼 바꾸기 %2","albert_set_buzzer_to":"버저 음을 %1 (으)로 정하기 %2","albert_clear_buzzer":"버저 끄기 %1","albert_play_note_for":"%1 %2 음을 %3 박자 연주하기 %4","albert_rest_for":"%1 박자 쉬기 %2","albert_change_tempo_by":"연주 속도를 %1 만큼 바꾸기 %2","albert_set_tempo_to":"연주 속도를 %1 BPM으로 정하기 %2","albert_move_forward":"앞으로 이동하기 %1","albert_move_backward":"뒤로 이동하기 %1","albert_turn_around":"%1 으로 돌기 %2","albert_set_led_to":"%1 %2 으로 정하기 %3","albert_clear_led":"%1 %2","albert_change_wheels_by":"%1 %2 %3","albert_set_wheels_to":"%1 %2 %3","arduino_text":"%1","arduino_send":"신호 %1 보내기","arduino_get_number":"신호 %1 의 숫자 결과값","arduino_get_string":"신호 %1 의 글자 결과값","arduino_get_sensor_number":"%1  ","arduino_get_port_number":"%1  ","arduino_get_pwm_port_number":"%1  ","arduino_get_number_sensor_value":"아날로그 %1 번 센서값  ","dplay_get_number_sensor_value":"아날로그 %1 번 센서값  ","nemoino_get_number_sensor_value":"아날로그 %1 번 센서값  ","sensorBoard_get_number_sensor_value":"아날로그 %1 번 센서값  ","CODEino_get_number_sensor_value":"아날로그 %1 번 센서값  ","ardublock_get_number_sensor_value":"아날로그 %1 번 센서값  ","arduino_get_digital_value":"디지털 %1 번 센서값  ","dplay_get_digital_value":"디지털 %1 번 센서값  ","nemoino_get_digital_value":"디지털 %1 번 센서값  ","sensorBoard_get_digital_value":"디지털 %1 번 센서값  ","CODEino_get_digital_value":"디지털 %1 번 센서값  ","ardublock_get_digital_value":"디지털 %1 번 센서값  ","arduino_toggle_led":"디지털 %1 번 핀 %2 %3","dplay_toggle_led":"디지털 %1 번 핀 %2 %3","nemoino_toggle_led":"디지털 %1 번 핀 %2 %3","sensorBoard_toggle_led":"디지털 %1 번 핀 %2 %3","CODEino_toggle_led":"디지털 %1 번 핀 %2 %3","ardublock_toggle_led":"디지털 %1 번 핀 %2 %3","arduino_toggle_pwm":"디지털 %1 번 핀을 %2 (으)로 정하기 %3","dplay_toggle_pwm":"디지털 %1 번 핀을 %2 (으)로 정하기 %3","nemoino_toggle_pwm":"디지털 %1 번 핀을 %2 (으)로 정하기 %3","sensorBoard_toggle_pwm":"디지털 %1 번 핀을 %2 (으)로 정하기 %3","CODEino_toggle_pwm":"디지털 %1 번 핀을 %2 (으)로 정하기 %3","ardublock_toggle_pwm":"디지털 %1 번 핀을 %2 (으)로 정하기 %3","arduino_convert_scale":"%1 값의 범위를 %2 ~ %3 에서 %4 ~ %5 (으)로 바꾼값  ","dplay_convert_scale":"%1 값의 범위를 %2 ~ %3 에서 %4 ~ %5 (으)로 바꾼값  ","nemoino_convert_scale":"%1 값의 범위를 %2 ~ %3 에서 %4 ~ %5 (으)로 바꾼값  ","sensorBoard_convert_scale":"%1 값의 범위를 %2 ~ %3 에서 %4 ~ %5 (으)로 바꾼값  ","CODEino_convert_scale":"%1 값의 범위를 %2 ~ %3 에서 %4 ~ %5 (으)로 바꾼값  ","ardublock_convert_scale":"%1 값의 범위를 %2 ~ %3 에서 %4 ~ %5 (으)로 바꾼값  ","joystick_get_number_sensor_value":"아날로그 %1 번 센서값  ","joystick_get_digital_value":"디지털 %1 번 센서값  ","joystick_toggle_led":"디지털 %1 번 핀 %2 %3","joystick_toggle_pwm":"디지털 %1 번 핀을 %2 (으)로 정하기 %3","joystick_convert_scale":"%1 값의 범위를 %2 ~ %3 에서 %4 ~ %5 (으)로 바꾼값  ","sensorBoard_get_named_sensor_value":"%1  센서값","sensorBoard_is_button_pressed":"%1  버튼을 눌렀는가?","sensorBoard_led":"%1  LED %2   %3","arduino_download_connector":"%1","arduino_download_source":"%1","arduino_connected":"%1","arduino_reconnect":"%1","CODEino_get_sensor_number":"%1  ","CODEino_get_named_sensor_value":"  %1  센서값 ","CODEino_get_sound_status":"소리센서  %1  ","CODEino_get_light_status":"빛센서  %1  ","CODEino_is_button_pressed":" 보드의  %1  ","CODEino_get_accelerometer_direction":" 3축 가속도센서  %1  ","CODEino_get_accelerometer_value":" 3축 가속도센서  %1 축의 센서값 ","bitbrick_sensor_value":"%1  값","bitbrick_is_touch_pressed":"버튼 %1 이(가) 눌렸는가?","bitbrick_turn_off_color_led":"컬러 LED 끄기 %1","bitbrick_turn_on_color_led_by_rgb":"컬러 LED 켜기 R %1 G %2 B %3 %4","bitbrick_turn_on_color_led_by_picker":"컬러 LED 색  %1 로 정하기 %2","bitbrick_turn_on_color_led_by_value":"컬러 LED 켜기 색 %1 로 정하기 %2","bitbrick_buzzer":"버저음  %1 내기 %2","bitbrick_turn_off_all_motors":"모든 모터 끄기 %1","bitbrick_dc_speed":"DC 모터 %1  속도 %2 %3","bitbrick_dc_direction_speed":"DC 모터 %1   %2  방향  속력 %3 %4","bitbrick_servomotor_angle":"서보 모터 %1  각도 %2 %3","bitbrick_convert_scale":"변환 %1 값 %2 ~ %3 에서 %4 ~ %5","start_drawing":"그리기 시작하기 %1","stop_drawing":"그리기 멈추기 %1","set_color":"붓의 색을 %1 (으)로 정하기 %2","set_random_color":"붓의 색을 무작위로 정하기 %1","change_thickness":"붓의 굵기를 %1 만큼 바꾸기 %2","set_thickness":"붓의 굵기를 %1 (으)로 정하기 %2","change_opacity":"붓의 불투명도를 %1 % 만큼 바꾸기 %2","set_opacity":"붓의 불투명도를 %1 % 로 정하기 %2","brush_erase_all":"모든 붓 지우기 %1","brush_stamp":"도장찍기 %1","change_brush_transparency":"붓의 투명도를 %1 % 만큼 바꾸기 %2","set_brush_tranparency":"붓의 투명도를 %1 % 로 정하기 %2","number":"%1","angle":"%1","get_x_coordinate":"%1","get_y_coordinate":"%1","get_angle":"%1","get_rotation_direction":"%1  ","distance_something":"%1 %2 %3","coordinate_mouse":"%1 %2 %3","coordinate_object":"%1 %2 %3 %4","calc_basic":"%1 %2 %3","calc_plus":"%1 %2 %3","calc_minus":"%1 %2 %3","calc_times":"%1 %2 %3","calc_divide":"%1 %2 %3","calc_mod":"%1 %2 %3 %4","calc_share":"%1 %2 %3 %4","calc_operation":"%1 %2 %3 %4","calc_rand":"%1 %2 %3 %4 %5","get_date":"%1 %2 %3","get_sound_duration":"%1 %2 %3","reset_project_timer":"%1","set_visible_project_timer":"%1 %2 %3 %4","timer_variable":"%1 %2","get_project_timer_value":"%1 %2","char_at":"%1 %2 %3 %4 %5","length_of_string":"%1 %2 %3","substring":"%1 %2 %3 %4 %5 %6 %7","replace_string":"%1 %2 %3 %4 %5 %6 %7","change_string_case":"%1 %2 %3 %4 %5","index_of_string":"%1 %2 %3 %4 %5","combine_something":"%1 %2 %3 %4 %5","get_sound_volume":"%1 %2","quotient_and_mod":"%1 %2 %3 %4 %5 %6","choose_project_timer_action":"%1 %2 %3 %4","wait_second":"%1 초 기다리기 %2","repeat_basic":"%1 번 반복하기 %2","repeat_inf":"계속 반복하기 %1","stop_repeat":"반복 중단하기 %1","wait_until_true":"%1 이(가) 될 때까지 기다리기 %2","_if":"만일 %1 이라면 %2","if_else":"만일 %1 이라면 %2 %3 아니면","create_clone":"%1 의 복제본 만들기 %2","delete_clone":"이 복제본 삭제하기 %1","when_clone_start":"%1 복제본이 처음 생성되었을때","stop_run":"프로그램 끝내기 %1","repeat_while_true":"%1 %2  반복하기 %3","stop_object":"%1 코드 멈추기 %2","restart_project":"처음부터 다시 실행하기 %1","remove_all_clones":"모든 복제본 삭제하기 %1","functionAddButton":"%1","function_field_label":"%1%2","function_field_string":"%1%2","function_field_boolean":"%1%2","function_param_string":"문자/숫자값","function_param_boolean":"판단값","function_create":"함수 정의하기 %1 %2","function_general":"함수 %1","hamster_hand_found":"손 찾음?","hamster_value":"%1","hamster_move_forward_once":"말판 앞으로 한 칸 이동하기 %1","hamster_turn_once":"말판 %1 으로 한 번 돌기 %2","hamster_move_forward_for_secs":"앞으로 %1 초 이동하기 %2","hamster_move_backward_for_secs":"뒤로 %1 초 이동하기 %2","hamster_turn_for_secs":"%1 으로 %2 초 돌기 %3","hamster_change_both_wheels_by":"왼쪽 바퀴 %1 오른쪽 바퀴 %2 만큼 바꾸기 %3","hamster_set_both_wheels_to":"왼쪽 바퀴 %1 오른쪽 바퀴 %2 (으)로 정하기 %3","hamster_change_wheel_by":"%1 바퀴 %2 만큼 바꾸기 %3","hamster_set_wheel_to":"%1 바퀴 %2 (으)로 정하기 %3","hamster_follow_line_using":"%1 선을 %2 바닥 센서로 따라가기 %3","hamster_follow_line_until":"%1 선을 따라 %2 교차로까지 이동하기 %3","hamster_set_following_speed_to":"선 따라가기 속도를 %1 (으)로 정하기 %2","hamster_stop":"정지하기 %1","hamster_set_led_to":"%1 LED를 %2 으로 정하기 %3","hamster_clear_led":"%1 LED 끄기 %2","hamster_beep":"삐 소리내기 %1","hamster_change_buzzer_by":"버저 음을 %1 만큼 바꾸기 %2","hamster_set_buzzer_to":"버저 음을 %1 (으)로 정하기 %2","hamster_clear_buzzer":"버저 끄기 %1","hamster_play_note_for":"%1 %2 음을 %3 박자 연주하기 %4","hamster_rest_for":"%1 박자 쉬기 %2","hamster_change_tempo_by":"연주 속도를 %1 만큼 바꾸기 %2","hamster_set_tempo_to":"연주 속도를 %1 BPM으로 정하기 %2","hamster_set_port_to":"포트 %1 를 %2 으로 정하기 %3","hamster_change_output_by":"출력 %1 를 %2 만큼 바꾸기 %3","hamster_set_output_to":"출력 %1 를 %2 (으)로 정하기 %3","is_clicked":"%1","is_press_some_key":"%1 %2","reach_something":"%1 %2 %3","boolean_comparison":"%1 %2 %3","boolean_equal":"%1 %2 %3","boolean_bigger":"%1 %2 %3","boolean_smaller":"%1 %2 %3","boolean_and_or":"%1 %2 %3","boolean_and":"%1 %2 %3","boolean_or":"%1 %2 %3","boolean_not":"%1 %2 %3","true_or_false":"%1","True":"%1  ","False":"%1  ","boolean_basic_operator":"%1 %2 %3","show":"모양 보이기 %1","hide":"모양 숨기기 %1","dialog_time":"%1 을(를) %2 초 동안 %3 %4","dialog":"%1 을(를) %2 %3","remove_dialog":"말하기 지우기 %1","change_to_nth_shape":"%1 모양으로 바꾸기 %2","change_to_next_shape":"%1 모양으로 바꾸기 %2","set_effect_volume":"%1 효과를 %2 만큼 주기 %3","set_effect":"%1 효과를 %2 (으)로 정하기 %3","erase_all_effects":"효과 모두 지우기 %1","change_scale_percent":"크기를 %1 만큼 바꾸기 %2","set_scale_percent":"크기를 %1  (으)로 정하기 %2","change_scale_size":"크기를 %1 만큼 바꾸기 %2","set_scale_size":"크기를 %1  (으)로 정하기 %2","flip_y":"좌우 모양 뒤집기 %1","flip_x":"상하 모양 뒤집기 %1","set_object_order":"%1 번째로 올라오기 %2","get_pictures":"%1  ","change_to_some_shape":"%1 모양으로 바꾸기 %2","add_effect_amount":"%1 효과를 %2 만큼 주기 %3","change_effect_amount":"%1 효과를 %2 (으)로 정하기 %3","set_effect_amount":"%1 효과를 %2 만큼 주기 %3","set_entity_effect":"%1 효과를 %2 (으)로 정하기 %3","change_object_index":"%1 보내기 %2","move_direction":"이동 방향으로 %1 만큼 움직이기 %2","move_x":"x 좌표를 %1 만큼 바꾸기 %2","move_y":"y 좌표를 %1 만큼 바꾸기 %2","locate_xy_time":"%1 초 동안 x: %2 y: %3 위치로 이동하기 %4","rotate_by_angle":"오브젝트를 %1 만큼 회전하기 %2","rotate_by_angle_dropdown":"%1 만큼 회전하기 %2","see_angle":"이동 방향을 %1 (으)로 정하기 %2","see_direction":"%1 쪽 보기 %2","locate_xy":"x: %1 y: %2 위치로 이동하기 %3","locate_x":"x: %1 위치로 이동하기 %2","locate_y":"y: %1 위치로 이동하기 %2","locate":"%1 위치로 이동하기 %2","move_xy_time":"%1 초 동안 x: %2 y: %3 만큼 움직이기 %4","rotate_by_angle_time":"오브젝트를 %1 초 동안 %2 만큼 회전하기 %3","bounce_wall":"화면 끝에 닿으면 튕기기 %1","flip_arrow_horizontal":"화살표 방향 좌우 뒤집기 %1","flip_arrow_vertical":"화살표 방향 상하 뒤집기 %1","see_angle_object":"%1 쪽 바라보기 %2","see_angle_direction":"오브젝트를 %1 (으)로 정하기 %2","rotate_direction":"이동 방향을 %1 만큼 회전하기 %2","locate_object_time":"%1 초 동안 %2 위치로 이동하기 %3","rotate_absolute":"방향을 %1 (으)로 정하기 %2","rotate_relative":"방향을 %1 만큼 회전하기 %2","direction_absolute":"이동 방향을 %1 (으)로 정하기 %2","direction_relative":"이동 방향을 %1 만큼 회전하기 %2","move_to_angle":"%1 방향으로 %2 만큼 움직이기 %3","rotate_by_time":"%1 초 동안 방향을 %2 만큼 회전하기 %3","direction_relative_duration":"%1 초 동안 이동 방향 %2 만큼 회전하기 %3","neobot_sensor_value":"%1  값","neobot_turn_left":"왼쪽모터를 %1 %2 회전 %3","neobot_stop_left":"왼쪽모터 정지 %1","neobot_turn_right":"오른쪽모터를 %1 %2 회전 %3","neobot_stop_right":"오른쪽모터 정지 %1","neobot_run_motor":"%1 모터를  %2 초간 %3 %4 %5","neobot_servo_1":"SERVO1에 연결된 서보모터를 %1 속도로 %2 로 이동 %3","neobot_servo_2":"SERVO2에 연결된 서보모터를 %1 속도로 %2 로 이동 %3","neobot_play_note_for":"멜로디 %1 을(를) %2 옥타브로 %3 길이만큼 소리내기 %4","neobot_set_sensor_value":"%1 번 포트의 값을 %2 %3","robotis_openCM70_cm_custom_value":"직접입력 주소 ( %1 ) %2 값","robotis_openCM70_sensor_value":"제어기 %1 값","robotis_openCM70_aux_sensor_value":"%1   %2 값","robotis_openCM70_cm_buzzer_index":"제어기 음계값 %1 을(를) %2 초 동안 연주 %3","robotis_openCM70_cm_buzzer_melody":"제어기 멜로디 %1 번 연주 %2","robotis_openCM70_cm_sound_detected_clear":"최종소리감지횟수 초기화 %1","robotis_openCM70_cm_led":"제어기 %1 LED %2 %3","robotis_openCM70_cm_motion":"모션 %1 번 실행 %2","robotis_openCM70_aux_motor_speed":"%1 감속모터 속도를 %2 , 출력값을 %3 (으)로 정하기 %4","robotis_openCM70_aux_servo_mode":"%1 서보모터 모드를 %2 (으)로 정하기 %3","robotis_openCM70_aux_servo_speed":"%1 서보모터 속도를 %2 , 출력값을 %3 (으)로 정하기 %4","robotis_openCM70_aux_servo_position":"%1 서보모터 위치를 %2 (으)로 정하기 %3","robotis_openCM70_aux_led_module":"%1 LED 모듈을 %2 (으)로 정하기 %3","robotis_openCM70_aux_custom":"%1 사용자 장치를 %2 (으)로 정하기 %3","robotis_openCM70_cm_custom":"직접입력 주소 ( %1 ) (을)를 %2 (으)로 정하기 %3","robotis_carCont_sensor_value":"%1   값","robotis_carCont_cm_led":"4번 LED %1 ,  1번 LED %2 %3","robotis_carCont_cm_sound_detected_clear":"최종소리감지횟수 초기화 %1","robotis_carCont_aux_motor_speed":"%1 감속모터 속도를 %2 , 출력값을 %3 (으)로 정하기 %4","robotis_carCont_cm_calibration":"%1 적외선 센서 캘리브레이션 값을 %2 (으)로 정하기 %3","when_scene_start":"%1 장면이 시작되었을때","start_scene":"%1 시작하기 %2","start_neighbor_scene":"%1 장면 시작하기 %2","sound_something":"소리 %1 재생하기 %2","sound_something_second":"소리 %1 %2 초 재생하기 %3","sound_something_wait":"소리  %1 재생하고 기다리기 %2","sound_something_second_wait":"소리 %1 %2 초 재생하고 기다리기 %3","sound_volume_change":"소리 크기를 %1 % 만큼 바꾸기 %2","sound_volume_set":"소리 크기를 %1 % 로 정하기 %2","sound_silent_all":"모든 소리 멈추기 %1","get_sounds":"%1  ","sound_something_with_block":"소리 %1 재생하기 %2","sound_something_second_with_block":"소리 %1   %2 초 재생하기 %3","sound_something_wait_with_block":"소리  %1 재생하고 기다리기 %2","sound_something_second_wait_with_block":"소리 %1   %2 초 재생하고 기다리기 %3","sound_from_to":"소리 %1 %2 초 부터 %3 초까지 재생하기 %4","sound_from_to_and_wait":"소리 %1 %2 초 부터 %3 초까지 재생하고 기다리기 %4","when_run_button_click":"%1 시작하기 버튼을 클릭했을 때","press_some_key":"%1 %2 키를 눌렀을 때 %3","when_some_key_pressed":"%1 %2 키를 눌렀을 때","mouse_clicked":"%1 마우스를 클릭했을 때","mouse_click_cancled":"%1 마우스 클릭을 해제했을 때","when_object_click":"%1 오브젝트를 클릭했을 때","when_object_click_canceled":"%1 오브젝트 클릭을 해제했을 때","when_some_key_click":"%1 키를 눌렀을 때","when_message_cast":"%1 %2 신호를 받았을 때","message_cast":"%1 신호 보내기 %2","message_cast_wait":"%1 신호 보내고 기다리기 %2","text":"%1","text_write":"%1 라고 글쓰기","text_append":"%1 라고 뒤에 이어쓰기","text_prepend":"%1 라고 앞에 추가하기","text_flush":"텍스트 모두 지우기","variableAddButton":"%1","listAddButton":"%1","change_variable":"%1 에 %2 만큼 더하기 %3","set_variable":"%1 를 %2 로 정하기 %3","show_variable":"변수 %1 보이기 %2","hide_variable":"변수 %1 숨기기 %2","get_variable":"%1 %2","ask_and_wait":"%1 을(를) 묻고 대답 기다리기 %2","get_canvas_input_value":"%1  ","add_value_to_list":"%1 항목을 %2 에 추가하기 %3","remove_value_from_list":"%1 번째 항목을 %2 에서 삭제하기 %3","insert_value_to_list":"%1 을(를) %2 의 %3 번째에 넣기 %4","change_value_list_index":"%1    %2 번째 항목을 %3 (으)로 바꾸기 %4","value_of_index_from_list":"%1 %2 %3 %4 %5","length_of_list":"%1 %2 %3","show_list":"리스트 %1 보이기 %2","hide_list":"리스트 %1 숨기기 %2","options_for_list":"%1  ","set_visible_answer":"대답 %1 %2","is_included_in_list":"%1 %2 %3 %4 %5","xbot_digitalInput":"%1","xbot_analogValue":"%1","xbot_digitalOutput":"디지털 %1 핀, 출력 값 %2 %3","xbot_analogOutput":"아날로그 %1 %2 %3","xbot_servo":"서보 모터 %1 , 각도 %2 %3","xbot_oneWheel":"바퀴(DC) 모터 %1 , 속도 %2 %3","xbot_twoWheel":"바퀴(DC) 모터 오른쪽(2) 속도: %1 왼쪽(1) 속도: %2 %3","xbot_rgb":"RGB LED 켜기 R 값 %1 G 값 %2 B 값 %3 %4","xbot_rgb_picker":"RGB LED 색 %1 로 정하기 %2","xbot_buzzer":"%1   %2 음을 %3 초 연주하기 %4","xbot_lcd":"LCD %1 번째 줄 ,  출력 값 %2 %3","run":"","mutant":"test mutant block","jr_start":"%1","jr_repeat":"%1 %2 %3","jr_item":"꽃 모으기 %1","cparty_jr_item":"%1 %2","jr_north":"%1 %2","jr_east":"%1 %2","jr_south":"%1 %2","jr_west":"%1 %2","jr_start_basic":"%1 %2","jr_go_straight":"%1 %2","jr_turn_left":"%1 %2","jr_turn_right":"%1 %2","jr_go_slow":"%1 %2","jr_repeat_until_dest":"%1 %2 %3","jr_if_construction":"%1 %2 %3 %4","jr_if_speed":"만약 %1 앞에 있다면 %2","maze_step_start":"%1 시작하기를 클릭했을 때","maze_step_jump":"뛰어넘기%1","maze_step_for":"%1 번 반복하기%2","test":"%1 this is test block %2","maze_repeat_until_1":"%1 만날 때 까지 반복%2","maze_repeat_until_2":"모든 %1 만날 때 까지 반복%2","maze_step_if_1":"만약 앞에 %1 있다면%2","maze_step_if_2":"만약 앞에 %1 있다면%2","maze_call_function":"약속 불러오기%1","maze_define_function":"약속하기%1","maze_step_if_3":"만약 앞에 %1 있다면%2","maze_step_if_4":"만약 앞에 %1 있다면%2","maze_step_move_step":"앞으로 한 칸 이동%1","maze_step_rotate_left":"왼쪽으로 회전%1","maze_step_rotate_right":"오른쪽으로 회전%1","test_wrapper":"%1 this is test block %2","basic_button":"%1"};if(( false?"undefined":_typeof(exports))=="object")exports.Lang=Lang;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";var Lang={};Lang.category={};Lang.category.name="vn";Lang.type="en";Lang.en="English";Lang.Blocks={};Lang.Blocks.ARDUINO="Hardware";Lang.Blocks.ARDUINO_download_connector="Download Arduino Connector";Lang.Blocks.ARDUINO_download_source="Entry Arduino code";Lang.Blocks.ARDUINO_reconnect="Connect Hardware";Lang.Blocks.ARDUINO_connected="Hardware connected";Lang.Blocks.ARDUINO_arduino_get_number_1="number result of signal";Lang.Blocks.ARDUINO_arduino_get_number_2="";Lang.Blocks.ARDUINO_arduino_get_sensor_number_0="0";Lang.Blocks.ARDUINO_arduino_get_sensor_number_1="1";Lang.Blocks.ARDUINO_arduino_get_sensor_number_2="2";Lang.Blocks.ARDUINO_arduino_get_sensor_number_3="3";Lang.Blocks.ARDUINO_arduino_get_sensor_number_4="4";Lang.Blocks.ARDUINO_arduino_get_sensor_number_5="5";Lang.Blocks.BITBRICK_light="light";Lang.Blocks.BITBRICK_IR="IR";Lang.Blocks.BITBRICK_touch="touch";Lang.Blocks.BITBRICK_potentiometer="potentiometer";Lang.Blocks.BITBRICK_MIC="MIC";Lang.Blocks.BITBRICK_UserSensor="UserSensor";Lang.Blocks.BITBRICK_dc_direction_ccw="CCW";Lang.Blocks.BITBRICK_dc_direction_cw="CW";Lang.Blocks.CODEino_get_sensor_number_0="0";Lang.Blocks.CODEino_get_sensor_number_1="1";Lang.Blocks.CODEino_get_sensor_number_2="2";Lang.Blocks.CODEino_get_sensor_number_3="3";Lang.Blocks.CODEino_get_sensor_number_4="4";Lang.Blocks.CODEino_get_sensor_number_5="5";Lang.Blocks.CODEino_get_sensor_number_6="6";Lang.Blocks.CODEino_sensor_name_0="Sound";Lang.Blocks.CODEino_sensor_name_1="Light";Lang.Blocks.CODEino_sensor_name_2="Slider";Lang.Blocks.CODEino_sensor_name_3="resistance-A";Lang.Blocks.CODEino_sensor_name_4="resistance-B";Lang.Blocks.CODEino_sensor_name_5="resistance-C";Lang.Blocks.CODEino_sensor_name_6="resistance-D";Lang.Blocks.CODEino_string_1=" Sensor value";Lang.Blocks.CODEino_string_2=" Operation";Lang.Blocks.CODEino_string_3="Push button";Lang.Blocks.CODEino_string_4="Connected A";Lang.Blocks.CODEino_string_5="Connected B";Lang.Blocks.CODEino_string_6="Connected C";Lang.Blocks.CODEino_string_7="Connected D";Lang.Blocks.CODEino_string_8=" 3-AXIS Accelerometer";Lang.Blocks.CODEino_string_9="-axis value";Lang.Blocks.CODEino_string_10="Sound is";Lang.Blocks.CODEino_string_11="Great";Lang.Blocks.CODEino_string_12="Small";Lang.Blocks.CODEino_string_13="Light is";Lang.Blocks.CODEino_string_14="Bright";Lang.Blocks.CODEino_string_15="Dark";Lang.Blocks.CODEino_string_16="Left tilt";Lang.Blocks.CODEino_string_17="Right tilt";Lang.Blocks.CODEino_string_18="Front tilt";Lang.Blocks.CODEino_string_19="Rear tilt";Lang.Blocks.CODEino_string_20="Reverse";Lang.Blocks.CODEino_accelerometer_X="X";Lang.Blocks.CODEino_accelerometer_Y="Y";Lang.Blocks.CODEino_accelerometer_Z="Z";Lang.Blocks.ARDUINO_arduino_get_string_1="string result of signal";Lang.Blocks.ARDUINO_arduino_get_string_2="";Lang.Blocks.ARDUINO_arduino_send_1="Send signal";Lang.Blocks.ARDUINO_arduino_send_2="";Lang.Blocks.ARDUINO_num_sensor_value_1="Analog";Lang.Blocks.ARDUINO_num_sensor_value_2="Sensor value";Lang.Blocks.ARDUINO_get_digital_value_1="Digital";Lang.Blocks.ARDUINO_num_pin_1="Digital";Lang.Blocks.ARDUINO_num_pin_2="Pin";Lang.Blocks.ARDUINO_toggle_pwm_1="Digital";Lang.Blocks.ARDUINO_toggle_pwm_2="Pin";Lang.Blocks.ARDUINO_toggle_pwm_3="";Lang.Blocks.ARDUINO_on="On";Lang.Blocks.ARDUINO_convert_scale_1="Map Value";Lang.Blocks.ARDUINO_convert_scale_2="";Lang.Blocks.ARDUINO_convert_scale_3="~";Lang.Blocks.ARDUINO_convert_scale_4="to";Lang.Blocks.ARDUINO_convert_scale_5="~";Lang.Blocks.ARDUINO_convert_scale_6="";Lang.Blocks.ARDUINO_off="Off";Lang.Blocks.brightness="Độ sáng";Lang.Blocks.BRUSH="Cây bút";Lang.Blocks.BRUSH_brush_erase_all="Xóa tất cả";Lang.Blocks.BRUSH_change_opacity_1="thay đổi";Lang.Blocks.BRUSH_change_opacity_2="% độ sáng";Lang.Blocks.BRUSH_change_thickness_1="Thay đổi";Lang.Blocks.BRUSH_change_thickness_2="độ đậm";Lang.Blocks.BRUSH_set_color_1="định màu sắc với màu";Lang.Blocks.BRUSH_set_color_2="";Lang.Blocks.BRUSH_set_opacity_1="xác định";Lang.Blocks.BRUSH_set_opacity_2="% độ sáng";Lang.Blocks.BRUSH_set_random_color="tự động định màu sắc";Lang.Blocks.BRUSH_set_thickness_1="định độ đậm";Lang.Blocks.BRUSH_set_thickness_2="";Lang.Blocks.BRUSH_stamp="Entry.stamp()";Lang.Blocks.BRUSH_start_drawing="bắt đầu vẽ";Lang.Blocks.BRUSH_stop_drawing="dừng vẽ";Lang.Blocks.CALC="Tính toán";Lang.Blocks.CALC_calc_mod_1="";Lang.Blocks.CALC_calc_mod_2="của phần còn lại";Lang.Blocks.CALC_calc_mod_3="của phần còn lại";Lang.Blocks.CALC_calc_operation_of_1="";Lang.Blocks.CALC_calc_operation_of_2="của";Lang.Blocks.CALC_calc_operation_root="Root";Lang.Blocks.CALC_calc_operation_square="x2";Lang.Blocks.CALC_calc_rand_1="Tự động con số từ";Lang.Blocks.CALC_calc_rand_2="đến";Lang.Blocks.CALC_calc_rand_3="";Lang.Blocks.CALC_calc_share_1="phần";Lang.Blocks.CALC_calc_share_2="/";Lang.Blocks.CALC_calc_share_3="của";Lang.Blocks.CALC_coordinate_mouse_1="con chuột đến tọa độ";Lang.Blocks.CALC_coordinate_mouse_2="";Lang.Blocks.CALC_coordinate_object_1="của Tọa độ";Lang.Blocks.CALC_coordinate_object_2="";Lang.Blocks.CALC_coordinate_object_3="";Lang.Blocks.CALC_distance_something_1="Khoảng cách từ đâu đến";Lang.Blocks.CALC_distance_something_2="";Lang.Blocks.CALC_get_angle="Giá các góc độ";Lang.Blocks.CALC_get_date_1="Date";Lang.Blocks.CALC_get_date_2="";Lang.Blocks.CALC_get_date_day="Day";Lang.Blocks.CALC_get_date_hour="Time(Hour)";Lang.Blocks.CALC_get_date_minute="Time(Minutes)";Lang.Blocks.CALC_get_date_month="Month";Lang.Blocks.CALC_get_date_second="Time(Seconds)";Lang.Blocks.CALC_get_date_year="Year";Lang.Blocks.CALC_get_sound_duration_1="Length of";Lang.Blocks.CALC_get_sound_duration_2="sound";Lang.Blocks.CALC_get_timer_value="Timer value";Lang.Blocks.CALC_get_x_coordinate="Giá tọa độ X";Lang.Blocks.CALC_get_y_coordinate="Giá các góc độ Y";Lang.Blocks.CALC_timer_reset="Reset timer";Lang.Blocks.CALC_timer_visible_1="";Lang.Blocks.CALC_timer_visible_2="Timer";Lang.Blocks.CALC_timer_visible_show="Show";Lang.Blocks.CALC_timer_visible_hide="Hide";Lang.Blocks.color="màu";Lang.Blocks.FLOW="Dòng";Lang.Blocks.FLOW__if_1="nếu";Lang.Blocks.FLOW__if_2="như";Lang.Blocks.FLOW_create_clone_1="Tạo bản sao của bản";Lang.Blocks.FLOW_create_clone_2="";Lang.Blocks.FLOW_delete_clone="Xóa bản sao này";Lang.Blocks.FLOW_delete_clone_all="Remove all clone";Lang.Blocks.FLOW_if_else_1="Nếu";Lang.Blocks.FLOW_if_else_2="hoặc nếu";Lang.Blocks.FLOW_if_else_3="không phải";Lang.Blocks.FLOW_repeat_basic_1=" i <";Lang.Blocks.FLOW_repeat_basic_2=" i++)";Lang.Blocks.FLOW_repeat_basic_errorMsg="Repeat count must greater than 0 or equal.";Lang.Blocks.FLOW_repeat_inf="lặp lại niều lần";Lang.Blocks.FLOW_restart="Restart Project";Lang.Blocks.FLOW_stop_object_1="Stop";Lang.Blocks.FLOW_stop_object_2="";Lang.Blocks.FLOW_stop_object_all="All objects";Lang.Blocks.FLOW_stop_object_this_object="This object";Lang.Blocks.FLOW_stop_object_this_thread="This block";Lang.Blocks.FLOW_stop_object_other_thread="Other block of this object";Lang.Blocks.FLOW_stop_repeat="Liên tục để ngăn chặn";Lang.Blocks.FLOW_stop_run="Exit program";Lang.Blocks.FLOW_wait_second_1="Chờ";Lang.Blocks.FLOW_wait_second_2="giây";Lang.Blocks.FLOW_wait_until_true_1="";Lang.Blocks.FLOW_wait_until_true_2="Chờ cho đến khi dược thực hiện";Lang.Blocks.FLOW_when_clone_start="Khi lần đầu tạo bản sao";Lang.Blocks.FUNC="Function";Lang.Blocks.JUDGEMENT="phán đoán";Lang.Blocks.JUDGEMENT_boolean_and="AND";Lang.Blocks.JUDGEMENT_boolean_not_1="Is Not";Lang.Blocks.JUDGEMENT_boolean_not_2="";Lang.Blocks.JUDGEMENT_boolean_or="OR";Lang.Blocks.JUDGEMENT_false="giả dối";Lang.Blocks.JUDGEMENT_is_clicked="Mouse clicked?";Lang.Blocks.JUDGEMENT_is_press_some_key_1="";Lang.Blocks.JUDGEMENT_is_press_some_key_2="Đã nhấn nút chìa khóa chưa?";Lang.Blocks.JUDGEMENT_reach_something_1="Đã chạm chưa";Lang.Blocks.JUDGEMENT_reach_something_2="?";Lang.Blocks.JUDGEMENT_true="thực tế";Lang.Blocks.LOOKS="hình dạng";Lang.Blocks.LOOKS_change_scale_percent_1="Thay đổi";Lang.Blocks.LOOKS_change_scale_percent_2="% kích thước";Lang.Blocks.LOOKS_change_to_next_shape="Thay thế bằng hình dạng khác";Lang.Blocks.LOOKS_change_to_nth_shape_1="Thay đổi";Lang.Blocks.LOOKS_change_to_nth_shape_2="theo hình dạng";Lang.Blocks.LOOKS_change_shape_prev="prev";Lang.Blocks.LOOKS_change_shape_next="next";Lang.Blocks.LOOKS_change_to_near_shape_1="Change to the";Lang.Blocks.LOOKS_change_to_near_shape_2="shape";Lang.Blocks.LOOKS_dialog_1="";Lang.Blocks.LOOKS_dialog_2="do";Lang.Blocks.LOOKS_dialog_3="";Lang.Blocks.LOOKS_dialog_time_1="";Lang.Blocks.LOOKS_dialog_time_2="Nói xin chào trong vong";Lang.Blocks.LOOKS_dialog_time_3="giây";Lang.Blocks.LOOKS_dialog_time_4="";Lang.Blocks.LOOKS_erase_all_effects="cài đặt tất cả các hiệu ứng";Lang.Blocks.LOOKS_flip_x="lật ngược mô hình";Lang.Blocks.LOOKS_flip_y="lật trái và phải mô hình";Lang.Blocks.LOOKS_hide="ẩn mô hinh";Lang.Blocks.LOOKS_remove_dialog="xóa giọng nói";Lang.Blocks.LOOKS_set_effect_1="";Lang.Blocks.LOOKS_set_effect_2="định các hiệu ứng màu";Lang.Blocks.LOOKS_set_effect_3="";Lang.Blocks.LOOKS_set_effect_volume_1="";Lang.Blocks.LOOKS_set_effect_volume_2="Tạo hiệu ứng màu sắc";Lang.Blocks.LOOKS_set_effect_volume_3="";Lang.Blocks.LOOKS_set_object_order_1="go to";Lang.Blocks.LOOKS_set_object_order_2="th layer";Lang.Blocks.LOOKS_set_scale_percent_1="định";Lang.Blocks.LOOKS_set_scale_percent_2="% kích thước";Lang.Blocks.LOOKS_show="Xem mô hình";Lang.Blocks.mouse_pointer="trỏ chuột";Lang.Blocks.MOVING="di chuyển";Lang.Blocks.MOVING_bounce_wall="Nếu chạm cuối màn hình cảm ứng sẽ bị nhảy";Lang.Blocks.MOVING_bounce_when_1="Bounce if reach to the";Lang.Blocks.MOVING_bounce_when_2="";Lang.Blocks.MOVING_flip_arrow_horizontal="Flip horizontally by arrow direction";Lang.Blocks.MOVING_flip_arrow_vertical="Flip vertically by arrow direction";Lang.Blocks.MOVING_locate_1="";Lang.Blocks.MOVING_locate_2="Tới địa điểm";Lang.Blocks.MOVING_locate_time_1="Di chuyển";Lang.Blocks.MOVING_locate_time_2="trong vòng";Lang.Blocks.MOVING_locate_time_3="";Lang.Blocks.MOVING_locate_x_1="X:";Lang.Blocks.MOVING_locate_x_2="Tới địa điểm";Lang.Blocks.MOVING_locate_xy_1="X:";Lang.Blocks.MOVING_locate_xy_2="Y:";Lang.Blocks.MOVING_locate_xy_3="Tới địa điểm";Lang.Blocks.MOVING_locate_xy_time_1="Di chuyển trong vòng";Lang.Blocks.MOVING_locate_xy_time_2="";Lang.Blocks.MOVING_locate_xy_time_3="";Lang.Blocks.MOVING_locate_xy_time_4="s";Lang.Blocks.MOVING_locate_y_1="Y:";Lang.Blocks.MOVING_locate_y_2="Tới địa điểm";Lang.Blocks.MOVING_move_direction_1="Di chuyển theo hướng mũi tên";Lang.Blocks.MOVING_move_direction_2="";Lang.Blocks.MOVING_move_direction_angle_1="Rotate";Lang.Blocks.MOVING_move_direction_angle_2="and move";Lang.Blocks.MOVING_move_direction_angle_3="times";Lang.Blocks.MOVING_move_x_1="di chuyển theo tọa độ x";Lang.Blocks.MOVING_move_x_2="";Lang.Blocks.MOVING_move_xy_time_1="Di chuyển trong vòng";Lang.Blocks.MOVING_move_xy_time_2="X:";Lang.Blocks.MOVING_move_xy_time_3="Y:";Lang.Blocks.MOVING_move_xy_time_4="";Lang.Blocks.MOVING_move_y_1="di chuyển như các tọa độ y";Lang.Blocks.MOVING_move_y_2="";Lang.Blocks.MOVING_rotate_by_angle_1="Xoay";Lang.Blocks.MOVING_rotate_by_angle_2="độ";Lang.Blocks.MOVING_rotate_by_angle_dropdown_1="Mũi tên để xoay";Lang.Blocks.MOVING_rotate_by_angle_dropdown_2="độ";Lang.Blocks.MOVING_rotate_by_angle_time_1="Xoay";Lang.Blocks.MOVING_rotate_by_angle_time_2="trong vòng";Lang.Blocks.MOVING_rotate_by_angle_time_3="";Lang.Blocks.MOVING_rotate_direction_1="Move direction by";Lang.Blocks.MOVING_rotate_direction_2="degree";Lang.Blocks.MOVING_see_angle_1="Xác định hướng";Lang.Blocks.MOVING_see_angle_2="độ";Lang.Blocks.MOVING_see_angle_direction_1="See angle to";Lang.Blocks.MOVING_see_angle_direction_2="degree";Lang.Blocks.MOVING_see_angle_object_1="See angle to the";Lang.Blocks.MOVING_see_angle_object_2="";Lang.Blocks.MOVING_see_direction_1="Rotate to the";Lang.Blocks.MOVING_see_direction_2="";Lang.Blocks.MOVING_set_direction_by_angle_1="Set rotation to";Lang.Blocks.MOVING_set_direction_by_angle_2="degree";Lang.Blocks.MOVING_add_direction_by_angle_1="Add rotation by";Lang.Blocks.MOVING_add_direction_by_angle_2="degree";Lang.Blocks.MOVING_add_direction_by_angle_time_1="Add rotation by";Lang.Blocks.MOVING_add_direction_by_angle_time_2="seconds, rotate";Lang.Blocks.MOVING_add_direction_by_angle_time_3="degree";Lang.Blocks.no_target="không đôi tượng";Lang.Blocks.oneself="bản thân";Lang.Blocks.opacity="minh bạch";Lang.Blocks.SCENE="cảnh";Lang.Blocks.SOUND="âm lượng";Lang.Blocks.SOUND_sound_silent_all="Dừng tất cả âm lượng";Lang.Blocks.SOUND_sound_something_1="";Lang.Blocks.SOUND_sound_something_2="Chạy âm lượng";Lang.Blocks.SOUND_sound_something_second_1="Play";Lang.Blocks.SOUND_sound_something_second_2="Sound";Lang.Blocks.SOUND_sound_something_second_3="seconds";Lang.Blocks.SOUND_sound_something_second_wait_1="Play";Lang.Blocks.SOUND_sound_something_second_wait_2="Sound for";Lang.Blocks.SOUND_sound_something_second_wait_3="seconds and wait";Lang.Blocks.SOUND_sound_something_wait_1="Play";Lang.Blocks.SOUND_sound_something_wait_2="Sound and wait";Lang.Blocks.SOUND_sound_volume_change_1="Thay đổi";Lang.Blocks.SOUND_sound_volume_change_2="% độ lớn âm lượng";Lang.Blocks.SOUND_sound_volume_set_1="Xác định";Lang.Blocks.SOUND_sound_volume_set_2="% độ lớn âm lượng";Lang.Blocks.speak="Phát biểu";Lang.Blocks.START="bắt đầu";Lang.Blocks.START_add_message="Thêm tín hiệu";Lang.Blocks.START_delete_message="xóa tín hiệu";Lang.Blocks.START_message_cast="Send message";Lang.Blocks.START_message_cast_1="";Lang.Blocks.START_message_cast_2="Khi gửi tín hiệu";Lang.Blocks.START_message_cast_wait=" message and wait";Lang.Blocks.START_message_send_wait_1="Send";Lang.Blocks.START_message_send_wait_2=" message and wait";Lang.Blocks.START_mouse_click_cancled="Khi bạn thả chuột";Lang.Blocks.START_mouse_clicked="Khi bạn nhấp chuột";Lang.Blocks.START_press_some_key_1="";Lang.Blocks.START_press_some_key_2="khi bạn nhấn vào nút chìa khóa";Lang.Blocks.START_press_some_key_down="Down";Lang.Blocks.START_press_some_key_enter="Enter";Lang.Blocks.START_press_some_key_left="Left";Lang.Blocks.START_press_some_key_right="Right";Lang.Blocks.START_press_some_key_space="Space";Lang.Blocks.START_press_some_key_up="Up";Lang.Blocks.START_when_message_cast="When message received";Lang.Blocks.START_when_message_cast_1="Khi nhận được tín hiệu";Lang.Blocks.START_when_message_cast_2="";Lang.Blocks.START_when_object_click="Khi bạn nhấp chuột vào đối tượng";Lang.Blocks.START_when_object_click_canceled="khi bạn nhả chuột vào đối tượng";Lang.Blocks.START_when_run_button_click="khi nhấn chuột vào nút bắt đầu";Lang.Blocks.START_when_scene_start="When scene was started";Lang.Blocks.START_when_some_key_click="When press some key";Lang.Blocks.TEXT="hộp định dạng chữ";Lang.Blocks.TEXT_text="Entry";Lang.Blocks.TEXT_text_append_1="After writing that";Lang.Blocks.TEXT_text_append_2="";Lang.Blocks.TEXT_text_flush="Remove all text";Lang.Blocks.TEXT_text_prepend_1="Add";Lang.Blocks.TEXT_text_prepend_2="in front of that";Lang.Blocks.TEXT_text_write_1="Writing that";Lang.Blocks.TEXT_text_write_2="";Lang.Blocks.VARIABLE="Biến";Lang.Blocks.VARIABLE_add_value_to_list="";Lang.Blocks.VARIABLE_add_value_to_list_1="add";Lang.Blocks.VARIABLE_add_value_to_list_2="to the list";Lang.Blocks.VARIABLE_add_value_to_list_3="";Lang.Blocks.VARIABLE_ask_and_wait_1="";Lang.Blocks.VARIABLE_ask_and_wait_2="and wait";Lang.Blocks.VARIABLE_change_value_list_index="";Lang.Blocks.VARIABLE_change_value_list_index_1="change";Lang.Blocks.VARIABLE_change_value_list_index_3="th element to";Lang.Blocks.VARIABLE_change_value_list_index_2="";Lang.Blocks.VARIABLE_change_value_list_index_4="";Lang.Blocks.VARIABLE_change_variable="Adding variable";Lang.Blocks.VARIABLE_change_variable_1="Thêm với";Lang.Blocks.VARIABLE_change_variable_2="";Lang.Blocks.VARIABLE_change_variable_3="không đối tượng";Lang.Blocks.VARIABLE_change_variable_name="Thay đổi tên biến";Lang.Blocks.VARIABLE_combine_something_1="join";Lang.Blocks.VARIABLE_combine_something_2="";Lang.Blocks.VARIABLE_combine_something_3="";Lang.Blocks.VARIABLE_get_canvas_input_value="Answer";Lang.Blocks.VARIABLE_get_variable="Value of variable";Lang.Blocks.VARIABLE_get_variable_1="";Lang.Blocks.VARIABLE_get_variable_2="giá số biến";Lang.Blocks.VARIABLE_get_y="Giá tọa độ Y";Lang.Blocks.VARIABLE_hide_list="";Lang.Blocks.VARIABLE_hide_list_1="hide";Lang.Blocks.VARIABLE_hide_list_2="";Lang.Blocks.VARIABLE_hide_variable="Hide variable";Lang.Blocks.VARIABLE_hide_variable_1="";Lang.Blocks.VARIABLE_hide_variable_2="ẩn giá";Lang.Blocks.VARIABLE_insert_value_to_list="";Lang.Blocks.VARIABLE_insert_value_to_list_1="insert";Lang.Blocks.VARIABLE_insert_value_to_list_2="to";Lang.Blocks.VARIABLE_insert_value_to_list_3="";Lang.Blocks.VARIABLE_insert_value_to_list_4="th position";Lang.Blocks.VARIABLE_length_of_list="";Lang.Blocks.VARIABLE_length_of_list_1="length of";Lang.Blocks.VARIABLE_length_of_list_2="";Lang.Blocks.VARIABLE_list="list";Lang.Blocks.VARIABLE_make_variable="Tạo một số biến";Lang.Blocks.VARIABLE_list_option_first="First";Lang.Blocks.VARIABLE_list_option_last="Last";Lang.Blocks.VARIABLE_list_option_random="Randomly";Lang.Blocks.VARIABLE_remove_value_from_list="";Lang.Blocks.VARIABLE_remove_value_from_list_1="";Lang.Blocks.VARIABLE_remove_value_from_list_2="th element from";Lang.Blocks.VARIABLE_remove_value_from_list_3="";Lang.Blocks.VARIABLE_remove_variable="xóa số biến";Lang.Blocks.VARIABLE_set_variable="Set variable";Lang.Blocks.VARIABLE_set_variable_1="Định với";Lang.Blocks.VARIABLE_set_variable_2="";Lang.Blocks.VARIABLE_set_variable_3="không đối tượng";Lang.Blocks.VARIABLE_show_list="";Lang.Blocks.VARIABLE_show_list_1="show";Lang.Blocks.VARIABLE_show_list_2="";Lang.Blocks.VARIABLE_show_variable="Show variable";Lang.Blocks.VARIABLE_show_variable_1="";Lang.Blocks.VARIABLE_show_variable_2="Xem giá";Lang.Blocks.VARIABLE_value_of_index_from_list="";Lang.Blocks.VARIABLE_value_of_index_from_list_1="value of";Lang.Blocks.VARIABLE_value_of_index_from_list_2="";Lang.Blocks.VARIABLE_value_of_index_from_list_3="th element";Lang.Blocks.HAMSTER_hand_found="hand found?";Lang.Blocks.HAMSTER_sensor_leftProximity="left proximity";Lang.Blocks.HAMSTER_sensor_rightProximity="right proximity";Lang.Blocks.HAMSTER_sensor_leftFloor="left floor";Lang.Blocks.HAMSTER_sensor_rightFloor="right floor";Lang.Blocks.HAMSTER_sensor_accelerationX="x acceleration";Lang.Blocks.HAMSTER_sensor_accelerationY="y acceleration";Lang.Blocks.HAMSTER_sensor_accelerationZ="z acceleration";Lang.Blocks.HAMSTER_sensor_light="light";Lang.Blocks.HAMSTER_sensor_temperature="temperature";Lang.Blocks.HAMSTER_sensor_signalStrength="signal strength";Lang.Blocks.HAMSTER_sensor_inputA="input A";Lang.Blocks.HAMSTER_sensor_inputB="input B";Lang.Blocks.HAMSTER_move_forward_once="move forward once on board";Lang.Blocks.HAMSTER_turn_once_1="turn";Lang.Blocks.HAMSTER_turn_once_2="once on board";Lang.Blocks.HAMSTER_move_forward="move forward";Lang.Blocks.HAMSTER_move_backward="move backward";Lang.Blocks.HAMSTER_turn_around_1="turn";Lang.Blocks.HAMSTER_turn_around_2="";Lang.Blocks.HAMSTER_move_forward_for_secs_1="move forward for";Lang.Blocks.HAMSTER_move_forward_for_secs_2="secs";Lang.Blocks.HAMSTER_move_backward_for_secs_1="move backward";Lang.Blocks.HAMSTER_move_backward_for_secs_2="secs";Lang.Blocks.HAMSTER_turn_for_secs_1="turn";Lang.Blocks.HAMSTER_turn_for_secs_2="for";Lang.Blocks.HAMSTER_turn_for_secs_3="secs";Lang.Blocks.HAMSTER_change_both_wheels_by_1="change wheel by left:";Lang.Blocks.HAMSTER_change_both_wheels_by_2="right:";Lang.Blocks.HAMSTER_change_both_wheels_by_3="";Lang.Blocks.HAMSTER_set_both_wheels_to_1="set wheel to left:";Lang.Blocks.HAMSTER_set_both_wheels_to_2="right:";Lang.Blocks.HAMSTER_set_both_wheels_to_3="";Lang.Blocks.HAMSTER_change_wheel_by_1="change";Lang.Blocks.HAMSTER_change_wheel_by_2="wheel by";Lang.Blocks.HAMSTER_change_wheel_by_3="";Lang.Blocks.HAMSTER_set_wheel_to_1="set";Lang.Blocks.HAMSTER_set_wheel_to_2="wheel to";Lang.Blocks.HAMSTER_set_wheel_to_3="";Lang.Blocks.HAMSTER_follow_line_using_1="follow";Lang.Blocks.HAMSTER_follow_line_using_2="line using";Lang.Blocks.HAMSTER_follow_line_using_3="floor sensor";Lang.Blocks.HAMSTER_follow_line_until_1="follow";Lang.Blocks.HAMSTER_follow_line_until_2="line until";Lang.Blocks.HAMSTER_follow_line_until_3="intersection";Lang.Blocks.HAMSTER_set_following_speed_to_1="set following speed to";Lang.Blocks.HAMSTER_set_following_speed_to_2="";Lang.Blocks.HAMSTER_front="front";Lang.Blocks.HAMSTER_rear="rear";Lang.Blocks.HAMSTER_stop="stop";Lang.Blocks.HAMSTER_set_led_to_1="set";Lang.Blocks.HAMSTER_set_led_to_2="led to";Lang.Blocks.HAMSTER_set_led_to_3="";Lang.Blocks.HAMSTER_clear_led_1="clear";Lang.Blocks.HAMSTER_clear_led_2="led";Lang.Blocks.HAMSTER_color_cyan="cyan";Lang.Blocks.HAMSTER_color_magenta="magenta";Lang.Blocks.HAMSTER_color_black="black";Lang.Blocks.HAMSTER_beep="beep";Lang.Blocks.HAMSTER_change_buzzer_by_1="change buzzer by";Lang.Blocks.HAMSTER_change_buzzer_by_2="";Lang.Blocks.HAMSTER_set_buzzer_to_1="set buzzer to";Lang.Blocks.HAMSTER_set_buzzer_to_2="";Lang.Blocks.HAMSTER_clear_buzzer="clear buzzer";Lang.Blocks.HAMSTER_play_note_for_1="play note";Lang.Blocks.HAMSTER_play_note_for_2="";Lang.Blocks.HAMSTER_play_note_for_3="for";Lang.Blocks.HAMSTER_play_note_for_4="beats";Lang.Blocks.HAMSTER_rest_for_1="rest for";Lang.Blocks.HAMSTER_rest_for_2="beats";Lang.Blocks.HAMSTER_change_tempo_by_1="change tempo by";Lang.Blocks.HAMSTER_change_tempo_by_2="";Lang.Blocks.HAMSTER_set_tempo_to_1="set tempo to";Lang.Blocks.HAMSTER_set_tempo_to_2="bpm";Lang.Blocks.HAMSTER_set_port_to_1="set port";Lang.Blocks.HAMSTER_set_port_to_2="to";Lang.Blocks.HAMSTER_set_port_to_3="";Lang.Blocks.HAMSTER_change_output_by_1="change output";Lang.Blocks.HAMSTER_change_output_by_2="by";Lang.Blocks.HAMSTER_change_output_by_3="";Lang.Blocks.HAMSTER_set_output_to_1="set output";Lang.Blocks.HAMSTER_set_output_to_2="to";Lang.Blocks.HAMSTER_set_output_to_3="";Lang.Blocks.HAMSTER_port_a="A";Lang.Blocks.HAMSTER_port_b="B";Lang.Blocks.HAMSTER_port_ab="A and B";Lang.Blocks.HAMSTER_analog_input="analog input";Lang.Blocks.HAMSTER_digital_input="digital input";Lang.Blocks.HAMSTER_servo_output="servo output";Lang.Blocks.HAMSTER_pwm_output="pwm output";Lang.Blocks.HAMSTER_digital_output="digital output";Lang.Blocks.ALBERT_hand_found="hand found?";Lang.Blocks.ALBERT_sensor_leftProximity="left proximity";Lang.Blocks.ALBERT_sensor_rightProximity="right proximity";Lang.Blocks.ALBERT_sensor_light="light";Lang.Blocks.ALBERT_sensor_battery="battery";Lang.Blocks.ALBERT_sensor_signalStrength="signal strength";Lang.Blocks.ALBERT_sensor_frontOid="front oid";Lang.Blocks.ALBERT_sensor_backOid="back oid";Lang.Blocks.ALBERT_sensor_positionX="x position";Lang.Blocks.ALBERT_sensor_positionY="y position";Lang.Blocks.ALBERT_sensor_orientation="orientation";Lang.Blocks.ALBERT_move_forward="move forward";Lang.Blocks.ALBERT_move_backward="move backward";Lang.Blocks.ALBERT_turn_around_1="turn";Lang.Blocks.ALBERT_turn_around_2="";Lang.Blocks.ALBERT_move_forward_for_secs_1="move forward for";Lang.Blocks.ALBERT_move_forward_for_secs_2="secs";Lang.Blocks.ALBERT_move_backward_for_secs_1="move backward for";Lang.Blocks.ALBERT_move_backward_for_secs_2="secs";Lang.Blocks.ALBERT_turn_for_secs_1="turn";Lang.Blocks.ALBERT_turn_for_secs_2="for";Lang.Blocks.ALBERT_turn_for_secs_3="secs";Lang.Blocks.ALBERT_change_both_wheels_by_1="change wheels by left:";Lang.Blocks.ALBERT_change_both_wheels_by_2="right:";Lang.Blocks.ALBERT_change_both_wheels_by_3="";Lang.Blocks.ALBERT_set_both_wheels_to_1="set wheels to left:";Lang.Blocks.ALBERT_set_both_wheels_to_2="right:";Lang.Blocks.ALBERT_set_both_wheels_to_3="";Lang.Blocks.ALBERT_change_wheel_by_1="change";Lang.Blocks.ALBERT_change_wheel_by_2="wheel by";Lang.Blocks.ALBERT_change_wheel_by_3="";Lang.Blocks.ALBERT_set_wheel_to_1="set";Lang.Blocks.ALBERT_set_wheel_to_2="wheel to";Lang.Blocks.ALBERT_set_wheel_to_3="";Lang.Blocks.ALBERT_stop="stop";Lang.Blocks.ALBERT_set_pad_size_to_1="set pad size to width:";Lang.Blocks.ALBERT_set_pad_size_to_2="height:";Lang.Blocks.ALBERT_set_pad_size_to_3="";Lang.Blocks.ALBERT_set_eye_to_1="set";Lang.Blocks.ALBERT_set_eye_to_2="eye to";Lang.Blocks.ALBERT_set_eye_to_3="";Lang.Blocks.ALBERT_clear_eye_1="clear";Lang.Blocks.ALBERT_clear_eye_2="eye";Lang.Blocks.ALBERT_body_led_1="";Lang.Blocks.ALBERT_body_led_2="body led";Lang.Blocks.ALBERT_front_led_1="";Lang.Blocks.ALBERT_front_led_2="front led";Lang.Blocks.ALBERT_color_cyan="cyan";Lang.Blocks.ALBERT_color_magenta="magenta";Lang.Blocks.ALBERT_beep="beep";Lang.Blocks.ALBERT_change_buzzer_by_1="change buzzer by";Lang.Blocks.ALBERT_change_buzzer_by_2="";Lang.Blocks.ALBERT_set_buzzer_to_1="set buzzer to";Lang.Blocks.ALBERT_set_buzzer_to_2="";Lang.Blocks.ALBERT_clear_buzzer="clear buzzer";Lang.Blocks.ALBERT_play_note_for_1="play note";Lang.Blocks.ALBERT_play_note_for_2="";Lang.Blocks.ALBERT_play_note_for_3="for";Lang.Blocks.ALBERT_play_note_for_4="beats";Lang.Blocks.ALBERT_rest_for_1="rest for";Lang.Blocks.ALBERT_rest_for_2="beats";Lang.Blocks.ALBERT_change_tempo_by_1="change tempo by";Lang.Blocks.ALBERT_change_tempo_by_2="";Lang.Blocks.ALBERT_set_tempo_to_1="set tempo to";Lang.Blocks.ALBERT_set_tempo_to_2="bpm";Lang.Blocks.VARIABLE_variable="variable";Lang.Blocks.wall="tường";Lang.Blocks.robotis_common_case_01="(을)를";Lang.Blocks.robotis_common_set="(으)로 정하기";Lang.Blocks.robotis_common_value="값";Lang.Blocks.robotis_common_clockwhise="시계방향";Lang.Blocks.robotis_common_counter_clockwhise="반시계방향";Lang.Blocks.robotis_common_wheel_mode="회전모드";Lang.Blocks.robotis_common_joint_mode="관절모드";Lang.Blocks.robotis_common_red_color="빨간색";Lang.Blocks.robotis_common_green_color="녹색";Lang.Blocks.robotis_common_blue_color="파란색";Lang.Blocks.robotis_common_on="켜기";Lang.Blocks.robotis_common_off="끄기";Lang.Blocks.robotis_common_cm="제어기";Lang.Blocks.robotis_common_port_1="포트 1";Lang.Blocks.robotis_common_port_2="포트 2";Lang.Blocks.robotis_common_port_3="포트 3";Lang.Blocks.robotis_common_port_4="포트 4";Lang.Blocks.robotis_common_port_5="포트 5";Lang.Blocks.robotis_common_port_6="포트 6";Lang.Blocks.robotis_common_play_buzzer="연주";Lang.Blocks.robotis_common_play_motion="실행";Lang.Blocks.robotis_common_motion="모션";Lang.Blocks.robotis_common_index_number="번";Lang.Blocks.robotis_cm_custom="직접입력 주소";Lang.Blocks.robotis_cm_spring_left="왼쪽 접촉 센서";Lang.Blocks.robotis_cm_spring_right="오른쪽 접촉 센서";Lang.Blocks.robotis_cm_led_left="왼쪽 LED";Lang.Blocks.robotis_cm_led_right="오른쪽 LED";Lang.Blocks.robotis_cm_led_both="양 쪽 LED";Lang.Blocks.robotis_cm_switch="선택 버튼 상태";Lang.Blocks.robotis_cm_user_button="사용자 버튼 상태";Lang.Blocks.robotis_cm_sound_detected="최종 소리 감지 횟수";Lang.Blocks.robotis_cm_sound_detecting="실시간 소리 감지 횟수";Lang.Blocks.robotis_cm_ir_left="왼쪽 적외선 센서";Lang.Blocks.robotis_cm_ir_right="오른쪽 적외선 센서";Lang.Blocks.robotis_cm_calibration_left="왼쪽 적외선 센서 캘리브레이션 값";Lang.Blocks.robotis_cm_calibration_right="오른쪽 적외선 센서 캘리브레이션 값";Lang.Blocks.robotis_cm_clear_sound_detected="최종소리감지횟수 초기화";Lang.Blocks.robotis_cm_buzzer_index="음계값";Lang.Blocks.robotis_cm_buzzer_melody="멜로디";Lang.Blocks.robotis_cm_led_1="1번 LED";Lang.Blocks.robotis_cm_led_4="4번 LED";Lang.Blocks.robotis_aux_servo_position="서보모터 위치";Lang.Blocks.robotis_aux_ir="적외선센서";Lang.Blocks.robotis_aux_touch="접촉센서";Lang.Blocks.robotis_aux_brightness="조도센서(CDS)";Lang.Blocks.robotis_aux_hydro_themo_humidity="온습도센서(습도)";Lang.Blocks.robotis_aux_hydro_themo_temper="온습도센서(온도)";Lang.Blocks.robotis_aux_temperature="온도센서";Lang.Blocks.robotis_aux_ultrasonic="초음파센서";Lang.Blocks.robotis_aux_magnetic="자석센서";Lang.Blocks.robotis_aux_motion_detection="동작감지센서";Lang.Blocks.robotis_aux_color="컬러센서";Lang.Blocks.robotis_aux_custom="사용자 장치";Lang.Blocks.robotis_carCont_aux_motor_speed_1="감속모터 속도를";Lang.Blocks.robotis_carCont_aux_motor_speed_2=", 출력값을";Lang.Blocks.robotis_carCont_calibration_1="적외선 센서 캘리브레이션 값을";Lang.Blocks.robotis_openCM70_aux_motor_speed_1="감속모터 속도를";Lang.Blocks.robotis_openCM70_aux_motor_speed_2=", 출력값을";Lang.Blocks.robotis_openCM70_aux_servo_mode_1="서보모터 모드를";Lang.Blocks.robotis_openCM70_aux_servo_speed_1="서보모터 속도를";Lang.Blocks.robotis_openCM70_aux_servo_speed_2=", 출력값을";Lang.Blocks.robotis_openCM70_aux_servo_position_1="서보모터 위치를";Lang.Blocks.robotis_openCM70_aux_led_module_1="LED 모듈을";Lang.Blocks.robotis_openCM70_aux_custom_1="사용자 장치를";Lang.Buttons={};Lang.Buttons.apply="Áp dụng";Lang.Buttons.cancel="Hủy bỏ";Lang.Buttons.save="Áp dụng";Lang.Buttons.start="bắt đầu";Lang.ko="한국어";Lang.Menus={};Lang.Menus.about="Tìm hiểu thêm";Lang.Menus.articles="Thảo luận";Lang.Menus.gallery="xem";Lang.Menus.learn="học tập";Lang.Menus.login="Sign In";Lang.Menus.logout="Sign Out";Lang.Menus.make="Tạo";Lang.Menus.register="Sign Up";Lang.Msgs={};Lang.Msgs.auth_only="Authenticated users only";Lang.Msgs.runtime_error="Runtime Error";Lang.Msgs.to_be_continue="Still not working";Lang.Msgs.warn="Warning";Lang.Msgs.error_occured="Oops, something went wrong. Why don't you try again? If you see this more than once, please let us know by Proposal board!";Lang.Users={};Lang.Users.auth_failed="Authentication failed";Lang.Users.birth_year="Birth Year";Lang.Users.birth_year_before_1990="Before 1990s";Lang.Users.edit_personal="Edit Personal";Lang.Users.email="Email";Lang.Users.email_desc="Enter your Email address to receive newsletters";Lang.Users.email_inuse="E-mail address is already in-use";Lang.Users.email_match="Please enter a valid email";Lang.Users.forgot_password="Forgot your password?";Lang.Users.job="Job";Lang.Users.language="Language";Lang.Users.name="Full Name";Lang.Users.name_desc="Enter your name";Lang.Users.name_not_empty="You must enter your name";Lang.Users.password="Password";Lang.Users.password_desc="";Lang.Users.password_invalid="Invalid Password";Lang.Users.password_long="Password must be between 4-20 characters long";Lang.Users.password_required="Password can not be blank";Lang.Users.project_list="thực hiện dự án";Lang.Users.regist="Signup Complete";Lang.Users.rememberme="Remember me";Lang.Users.repeat_password="Repeat Password";Lang.Users.repeat_password_desc="Repeat Password";Lang.Users.repeat_password_not_match="Passwords do not match";Lang.Users.sex="Sex";Lang.Users.signup_required_for_save="Signin required for saving a project.";Lang.Users.username="Username";Lang.Users.username_desc="Enter your unique name for signin";Lang.Users.username_inuse="Username already taken";Lang.Users.username_long="Username must be between 4-20 characters long";Lang.Users.username_unknown="Unknown user";Lang.vn="Việt";Lang.Workspace={};Lang.Workspace.new_project="New Project";Lang.Workspace.add_object="Add objects";Lang.Workspace.all="toàn bộ";Lang.Workspace.animal="Động vật";Lang.Workspace.arduino_entry="Program for connect to Arduino";Lang.Workspace.arduino_program="Arduino program";Lang.Workspace.arduino_sample="Sample code for Arduino";Lang.Workspace.arduino_driver="Driver for arduino";Lang.Workspace.cannot_add_object="Cannot add objects while running a project.";Lang.Workspace.cannot_add_picture="Cannot add picture while running a project.";Lang.Workspace.cannot_add_sound="Cannot add sound while running a project.";Lang.Workspace.cannot_edit_click_to_stop="Can not modify a project.\nClick to stop";Lang.Workspace.cannot_open_private_project="Can not load private project. Move to home.";Lang.Workspace.cannot_save_running_project="Can not save while running a project.";Lang.Workspace.character_gen="Make an avarta";Lang.Workspace.check_runtime_error="Please check the block marked with red.";Lang.Workspace.context_download="Download to PC";Lang.Workspace.context_duplicate="Duplicate";Lang.Workspace.context_remove="Remove";Lang.Workspace.context_rename="Rename";Lang.Workspace.coordinate="tọa độ";Lang.Workspace.create_function="Create Function";Lang.Workspace.direction="Direction";Lang.Workspace.drawing="vẽ trực tiếp";Lang.Workspace.enter_list_name="";Lang.Workspace.enter_name="Enter a new name";Lang.Workspace.enter_new_message="Enter new message name.";Lang.Workspace.enter_variable_name="Enter the new variable name (less than 10)";Lang.Workspace.family="Family";Lang.Workspace.fantasy="Ảo";Lang.Workspace.file_new="làm mới";Lang.Workspace.file_open="tải";Lang.Workspace.file_upload="Upload my project";Lang.Workspace.file_upload_login_check_msg="For the uploading your project you have to sign in";Lang.Workspace.file_save="lưu vào";Lang.Workspace.file_save_as="Save as clone";Lang.Workspace.file_save_download="Download project";Lang.Workspace.func="function";Lang.Workspace.function_create="Add function";Lang.Workspace.interface="Interface";Lang.Workspace.landscape="Bối cảnh";Lang.Workspace.list="List";Lang.Workspace.list_add_calcel="";Lang.Workspace.list_add_calcel_msg="";Lang.Workspace.list_add_fail="";Lang.Workspace.list_add_fail_msg1="";Lang.Workspace.list_add_fail_msg2="";Lang.Workspace.list_add_ok="";Lang.Workspace.list_add_ok_msg="";Lang.Workspace.list_create="Add list";Lang.Workspace.list_dup="";Lang.Workspace.list_newname="New name";Lang.Workspace.list_remove="Remove list";Lang.Workspace.list_rename="Rename list";Lang.Workspace.list_rename_failed="";Lang.Workspace.list_rename_ok="";Lang.Workspace.list_too_long="";Lang.Workspace.message="Signal";Lang.Workspace.message_add_cancel="Canceled";Lang.Workspace.message_add_cancel_msg="Add a message was canceled.";Lang.Workspace.message_add_fail="Failed";Lang.Workspace.message_add_fail_msg="Message name conflicted.";Lang.Workspace.message_add_ok="Message added";Lang.Workspace.message_add_ok_msg="was successfully added.";Lang.Workspace.message_create="Add Signal";Lang.Workspace.message_dup="Message name conflicted.";Lang.Workspace.message_remove="Remove a message";Lang.Workspace.message_remove_canceled="Remove a message was canceled";Lang.Workspace.message_rename="Rename a message";Lang.Workspace.message_rename_failed="Rename message failed";Lang.Workspace.message_rename_ok="Successfully rename message.";Lang.Workspace.message_too_long="Message name too long.";Lang.Workspace.no_message_to_remove="There is no message to remove.";Lang.Workspace.no_use="No use";Lang.Workspace.no_variable_to_remove="";Lang.Workspace.no_variable_to_rename="There is no varibale to remove";Lang.Workspace.object_not_found="No object is specified in the block.";Lang.Workspace.object_not_found_for_paste="";Lang.Workspace.people="chân dung";Lang.Workspace.picture_add="Add Shape";Lang.Workspace.plant="thực vật";Lang.Workspace.project="Project";Lang.Workspace.project_copied="Copy";Lang.Workspace.PROJECTDEFAULTNAME=['Cool','Funny','Nice','Huge','Great','Handsome','Lucky'];Lang.Workspace.remove_object="Remove Object";Lang.Workspace.remove_object_msg="remove was successfully completed.";Lang.Workspace.removed_msg="was successfully removed";Lang.Workspace.rotate_method="Rotate";Lang.Workspace.rotation="Rotation";Lang.Workspace.run="tiến hành";Lang.Workspace.saved="Saved";Lang.Workspace.saved_msg="was successfully saved.";Lang.Workspace.save_failed="Problem occurred while saving a project. Please try again.";Lang.Workspace.select_library="lựa chọn thư viện";Lang.Workspace.select_sprite="Please select at least one sprite to apply.";Lang.Workspace.shape_remove_fail="Remove a shape was failed.";Lang.Workspace.shape_remove_fail_msg="At least one or more shapes required.";Lang.Workspace.shape_remove_ok="Shape Removed";Lang.Workspace.shape_remove_ok_msg="was removed.";Lang.Workspace.sound_add="Add Sound";Lang.Workspace.sound_remove_fail="Remove a sound was failed.";Lang.Workspace.sound_remove_ok="Sound Removed";Lang.Workspace.sound_remove_ok_msg="was removed.";Lang.Workspace.stop="Stop";Lang.Workspace.pause="";Lang.Workspace.restart="";Lang.Workspace.speed="";Lang.Workspace.tab_attribute="Attribute";Lang.Workspace.tab_code="Block";Lang.Workspace.tab_picture="hình ảnh";Lang.Workspace.tab_sound="Sound";Lang.Workspace.tab_text="Textbox";Lang.Workspace.textbox="Textbox";Lang.Workspace.textbox_edit="Edit Textbox";Lang.Workspace.textbox_input="nhập nôi dung vào hộp định dạng chữ";Lang.Workspace.things="đồ vật";Lang.Workspace.upload="Upload files";Lang.Workspace.upload_addfile="Thêm một tập tin";Lang.Workspace.variable="Variable";Lang.Workspace.variable_add_calcel="Canceled";Lang.Workspace.variable_add_calcel_msg="Add a variable was canceled.";Lang.Workspace.variable_add_fail="Failed";Lang.Workspace.variable_add_fail_msg1="Variable name conflicted.";Lang.Workspace.variable_add_fail_msg2="Variable name is not proper.";Lang.Workspace.variable_add_ok="Variable added";Lang.Workspace.variable_add_ok_msg="was successfully added.";Lang.Workspace.variable_create="Add variable";Lang.Workspace.variable_dup="Variable name was already exists.";Lang.Workspace.variable_newname="New Name";Lang.Workspace.variable_remove="Remove variable";Lang.Workspace.variable_remove_canceled="Remove a variable was canceled";Lang.Workspace.variable_rename="Rename variable name";Lang.Workspace.variable_rename_failed="Failed";Lang.Workspace.variable_rename_msg="'Rename variable was successfully completed.'";Lang.Workspace.variable_rename_ok="Rename variabled was successfully completed.";Lang.Workspace.variable_select="Select a variable";Lang.Workspace.variable_too_long="Variable name too long.";Lang.Workspace.vehicle="Phương tiện đi lại";Lang.Blocks.CALC_rotation_value="rotation value";Lang.Blocks.CALC_direction_value="direction value";Lang.Blocks.VARIABLE_is_included_in_list_1="is included in";Lang.Blocks.VARIABLE_is_included_in_list_2="value";Lang.Blocks.VARIABLE_is_included_in_list_3="";Lang.code="view code";Lang.Blocks.SCENE_when_scene_start="When scene started";Lang.Blocks.SCENE_start_scene_1="";Lang.Blocks.SCENE_start_scene_2="";Lang.Blocks.SCENE_start_neighbor_scene_1="";Lang.Blocks.SCENE_start_neighbor_scene_2="";Lang.Blocks.SCENE_start_scene_pre="previous";Lang.Blocks.SCENE_start_scene_next="next";Lang.Blocks.FUNCTION_explanation_1="name";Lang.Blocks.FUNCTION_character_variable="character variable";Lang.Blocks.FUNCTION_logical_variable="logical variable";Lang.Blocks.FUNCTION_function="function";Lang.Blocks.FUNCTION_define="Define function";Lang.Workspace.add_object_alert_msg="Add object firstly";Lang.Workspace.add_object_alert="Alert";Lang.Workspace.create_variable_block="Create variable";Lang.Workspace.create_list_block="Create list";Lang.Blocks.CALC_calc_operation_sin="";Lang.Blocks.CALC_calc_operation_cos="";Lang.Blocks.CALC_calc_operation_tan="";Lang.Blocks.CALC_calc_operation_floor="";Lang.Blocks.CALC_calc_operation_ceil="";Lang.Blocks.CALC_calc_operation_round="";Lang.Blocks.CALC_calc_operation_factorial="factorial value";Lang.Blocks.CALC_calc_operation_asin="";Lang.Blocks.CALC_calc_operation_acos="";Lang.Blocks.CALC_calc_operation_atan="";Lang.Blocks.CALC_calc_operation_log="log value";Lang.Blocks.CALC_calc_operation_ln="natural log value";Lang.Blocks.CALC_calc_operation_natural="integer value";Lang.Blocks.CALC_calc_operation_unnatural="decimal value";Lang.Blocks.MOVING_locate_object_time_1="Di chuyển";Lang.Blocks.MOVING_locate_object_time_2="trong vòng";Lang.Blocks.MOVING_locate_object_time_3="";Lang.Blocks.wall_up="upper wall";Lang.Blocks.wall_down="down wall";Lang.Blocks.wall_right="right wall";Lang.Blocks.wall_left="left wall";Lang.Blocks.CALC_coordinate_x_value="coordinate x";Lang.Blocks.CALC_coordinate_y_value="coordinate y";Lang.Blocks.CALC_coordinate_rotation_value="rotation";Lang.Blocks.CALC_coordinate_direction_value="direction";Lang.Blocks.CALC_picture_index="index of picture";Lang.Blocks.CALC_picture_name="name of picture";Lang.Blocks.FLOW_repeat_while_true_1="Repeat";Lang.Blocks.FLOW_repeat_while_true_2="";Lang.Blocks.TUT_when_start="";Lang.Blocks.TUT_move_once="";Lang.Blocks.TUT_rotate_left="";Lang.Blocks.TUT_rotate_right="";Lang.Blocks.TUT_jump_barrier="";Lang.Blocks.TUT_repeat_tutorial_1="";Lang.Blocks.TUT_repeat_tutorial_2="";Lang.Blocks.TUT_if_barrier_1="";Lang.Blocks.TUT_if_barrier_2="";Lang.Blocks.TUT_if_conical_1="";Lang.Blocks.TUT_if_conical_2="";Lang.Blocks.TUT_repeat_until="";Lang.Blocks.TUT_repeat_until_gold="";Lang.Blocks.TUT_declare_function="";Lang.Blocks.TUT_call_function="";Lang.EntryStatic={};Lang.EntryStatic.lecture_is_open_true="open";Lang.EntryStatic.lecture_is_open_false="closed";Lang.EntryStatic.category_all="All Categories";Lang.EntryStatic.category_game="Game";Lang.EntryStatic.category_animation="Animation";Lang.EntryStatic.category_media_art="Media Art";Lang.EntryStatic.category_physical="Physical";Lang.EntryStatic.category_etc="etc";Lang.EntryStatic.lecture_required_time_1="Less than 15 min.";Lang.EntryStatic.lecture_required_time_2="15 to 30 min.";Lang.EntryStatic.lecture_required_time_3="30 to 40 min.";Lang.EntryStatic.lecture_required_time_4="45 to 60 min.";Lang.EntryStatic.lecture_required_time_5="over 1 hour";Lang.EntryStatic.usage_event="Event";Lang.EntryStatic.usage_signal="Sign";Lang.EntryStatic.usage_scene="Scene";Lang.EntryStatic.usage_repeat="Repeat";Lang.EntryStatic.usage_condition_repeat="Condition repeat";Lang.EntryStatic.usage_condition="Repeat";Lang.EntryStatic.usage_clone="Cloned Object";Lang.EntryStatic.usage_rotation="Rotation";Lang.EntryStatic.usage_coordinate="Coordination move";Lang.EntryStatic.usage_arrow_move="Arrow move";Lang.EntryStatic.usage_shape="Shape";Lang.EntryStatic.usage_speak="Speak";Lang.EntryStatic.usage_picture_effect="Effect";Lang.EntryStatic.usage_textBox="Textbox";Lang.EntryStatic.usage_draw="Draw";Lang.EntryStatic.usage_sound="Sound";Lang.EntryStatic.usage_confirm="Confirm";Lang.EntryStatic.usage_comp_operation="Compare operation";Lang.EntryStatic.usage_logical_operation="Logical operation";Lang.EntryStatic.usage_math_operation="Math operation";Lang.EntryStatic.usage_random="Random";Lang.EntryStatic.usage_timer="Timer";Lang.EntryStatic.usage_variable="variable";Lang.EntryStatic.usage_list="List";Lang.EntryStatic.usage_ask_answer="Ask and answer";Lang.EntryStatic.usage_function="Function";Lang.EntryStatic.usage_arduino="Arduino";Lang.EntryStatic.concept_resource_analytics="Procedual Thinking";Lang.EntryStatic.concept_procedual="Abstractive Thinking";Lang.EntryStatic.concept_abstractive="Korean";Lang.EntryStatic.concept_individual="English";Lang.EntryStatic.concept_automation="Automation";Lang.EntryStatic.concept_simulation="Simulation";Lang.EntryStatic.concept_parallel="Parallel";Lang.EntryStatic.subject_korean="Korean";Lang.EntryStatic.subject_english="English";Lang.EntryStatic.subject_mathmatics="Mathmatics";Lang.EntryStatic.subject_social="Social";Lang.EntryStatic.subject_science="Science";Lang.EntryStatic.subject_music="Music";Lang.EntryStatic.subject_paint="Paint";Lang.EntryStatic.subject_athletic="Athletics";Lang.EntryStatic.subject_courtesy="Courtesy";Lang.EntryStatic.subject_progmatic="Progmatic";Lang.EntryStatic.lecture_grade_1="1 th";Lang.EntryStatic.lecture_grade_2="2 th";Lang.EntryStatic.lecture_grade_3="3 th";Lang.EntryStatic.lecture_grade_4="4 th";Lang.EntryStatic.lecture_grade_5="5 th";Lang.EntryStatic.lecture_grade_6="6 th";Lang.EntryStatic.lecture_grade_7="7 th";Lang.EntryStatic.lecture_grade_8="8 th";Lang.EntryStatic.lecture_grade_9="9 th";Lang.EntryStatic.lecture_grade_10="Graduated";Lang.EntryStatic.lecture_level_1="Low";Lang.EntryStatic.lecture_level_2="Middle";Lang.EntryStatic.lecture_level_3="High";Lang.EntryStatic.listEnable="list";Lang.EntryStatic.functionEnable="function";Lang.EntryStatic.messageEnable="message";Lang.EntryStatic.objectEditable="object";Lang.EntryStatic.pictureeditable="shape";Lang.EntryStatic.sceneEditable="scene";Lang.EntryStatic.soundeditable="sound";Lang.EntryStatic.variableEnable="variable";Lang.EntryStatic.e_1="elementary school 1";Lang.EntryStatic.e_2="elementary school 2";Lang.EntryStatic.e_3="elementary school 3";Lang.EntryStatic.e_4="elementary school 4";Lang.EntryStatic.e_5="elementary school 5";Lang.EntryStatic.e_6="elementary school 6";Lang.EntryStatic.m_1="middle school 1";Lang.EntryStatic.m_2="middle school 2";Lang.EntryStatic.m_3="middle school 3";Lang.EntryStatic.general="general";Lang.EntryStatic.curriculum_is_open_true="open";Lang.EntryStatic.curriculum_open_false="closed";Lang.EntryStatic.notice="Notice";Lang.EntryStatic.qna="Q&A";Lang.EntryStatic.tips="Know How & Tips";Lang.EntryStatic.free="Free";Lang.EntryStatic.report="Proposal";Lang.Blocks.CALC_calc_operation_abs="absolute value";Lang.Workspace.Variable_Timer="timer";Lang.Workspace.Variable_placeholder_name="variable name";Lang.Workspace.Variable_use_all_objects="Use for all objects";Lang.Workspace.Variable_use_this_object="Use for this object";Lang.Workspace.Variable_used_at_all_objects="variable used at all objects";Lang.Workspace.Variable_create_cloud="Use for shared variable <br>(Stored in Server)";Lang.Workspace.Variable_used_at_special_object="variable used at special object";Lang.Workspace.draw_new="Draw new";Lang.Workspace.painter_file="edit▼";Lang.Workspace.painter_file_save="edit▼";Lang.Workspace.painter_file_saveas="edit▼";Lang.Workspace.painter_edit="edit▼";Lang.Workspace.get_file="get";Lang.Workspace.copy_file="copy";Lang.Workspace.cut_picture="cut";Lang.Workspace.paste_picture="paste";Lang.Workspace.remove_all="remove all";Lang.Workspace.new_picture="New";Lang.Workspace.picture_size="size";Lang.Workspace.picture_rotation="rotation";Lang.Workspace.thickness="thickness";Lang.Workspace.textStyle="text";Lang.Workspace.add_picture="Add Shape";Lang.Workspace.select_picture="Select Library";Lang.Workspace.select_sound="Select sound";Lang.Blocks.CONTEXT_COPY_option="copy codes";Lang.Blocks.Delete_Blocks="delete code(s)";Lang.Blocks.Duplication_option="copy & paste";Lang.Blocks.Paste_blocks="paste code(s)";Lang.Blocks.Clear_all_blocks="remove all codes";Lang.EntryStatic.art_category_all="All projects";Lang.EntryStatic.art_category_game="Game";Lang.EntryStatic.art_category_animation="Animation";Lang.EntryStatic.art_category_physical="Physical";Lang.EntryStatic.art_category_etc="etc";Lang.EntryStatic.art_category_media="art_category_media";Lang.EntryStatic.art_sort_updated="Updated";Lang.EntryStatic.art_sort_visit="Views";Lang.EntryStatic.art_sort_likeCnt="Likes";Lang.EntryStatic.art_sort_comment="Comments";Lang.EntryStatic.art_period_all="All";Lang.EntryStatic.art_period_day="Today";Lang.EntryStatic.art_period_week="Recent week";Lang.EntryStatic.art_period_month="Recent month";Lang.EntryStatic.art_period_three_month="Recent three month";Lang.EntryStatic.level_high="Row";Lang.EntryStatic.level_mid="Middle";Lang.EntryStatic.level_row="High";Lang.Blocks.transparency="Transparency";Lang.EntryStatic.discuss_sort_created="Updated";Lang.EntryStatic.discuss_sort_visit="Views";Lang.EntryStatic.discuss_sort_likesLength="Likes";Lang.EntryStatic.discuss_sort_commentsLength="Comments";Lang.EntryStatic.discuss_period_all="All";Lang.EntryStatic.discuss_period_day="Today";Lang.EntryStatic.discuss_period_week="Recent week";Lang.EntryStatic.discuss_period_month="Recent month";Lang.EntryStatic.discuss_period_three_month="Recent three month";Lang.Blocks.BRUSH_change_brush_transparency_1="thay đổi";Lang.Blocks.BRUSH_change_brush_transparency_2="% độ sáng";Lang.Blocks.BRUSH_set_brush_transparency_1="xác định";Lang.Blocks.BRUSH_set_brush_transparency_2="% độ sáng";Lang.Workspace.Size="Size";Lang.Workspace.show_variable="Show variable";Lang.Workspace.default_value="default value";Lang.Workspace.slide="slide";Lang.Workspace.min_value="min value";Lang.Workspace.max_value="max value";Lang.Workspace.number_of_list="number of list items";Lang.Workspace.use_all_objects="Use for all objects";Lang.Workspace.list_name="List name";Lang.Msgs.list_can_not_space="List's name can't be space";Lang.Msgs.sign_can_not_space="Sign's name can't be space";Lang.Workspace.list_used_specific_objects="List used for specific object";Lang.Msgs.variable_can_not_space="Variable's name can't be space";Lang.Workspace.List_used_all_objects="List used for all objects";Lang.Workspace.Scene_delete_error="The scene is, there should be at least one.";Lang.Workspace.Scene_add_error="The scene is up to 10.";Lang.Workspace.replica_of_object="'s replicas";Lang.Workspace.will_you_delete_scene="Deleting scene can not be restored.\nAre you sure you want to delete scene?";Lang.Workspace.duplicate_scene="duplicate";Lang.Workspace.block_explain="Block description";Lang.Workspace.block_intro="Clicking on the block comes the description of the block .";Lang.Helper={};Lang.Helper.when_run_button_click="When thew Start button is clicked, the connected block blow will run.";Lang.Helper.when_some_key_pressed="When an assigned key is pressed, the connected blocks below will run.";Lang.Helper.mouse_clicked="When mouse is clicked, the connected blocks below will run.";Lang.Helper.mouse_click_cancled="When mouse is released, the connected blocks below will run.";Lang.Helper.when_object_click="When a relevant object is clicked, the connected blocks below will run.";Lang.Helper.when_object_click_canceled="When the object click is released, the connect blocks below will run.";Lang.Helper.when_message_cast="When a relevant sign is received, the connected blocks below will run.";Lang.Helper.message_cast="Sends signal selected from list.";Lang.Helper.message_cast_wait="Send signal selected from list, and wait for the blocks the finish running.";Lang.Helper.when_scene_start=" When the scene starts, the connected blocks blow will run.";Lang.Helper.start_scene="Starts selected scene.";Lang.Helper.start_neighbor_scene="Starts the previous or following scene.";Lang.Helper.wait_second="Runs the next block after waiting for the set a mount of time.";Lang.Helper.repeat_basic="Repeats the blocks inside for set number of times.";Lang.Helper.repeat_inf="Repeats thi blocks inside for an unlimited number of times.";Lang.Helper.repeat_while_true="Repeats the blocks until the set condition is met.";Lang.Helper.stop_repeat="Stops repeat of the closest wrapping block.";Lang.Helper._if="if condition is true, runs blocks inside.";Lang.Helper.if_else="if condition is true, runs blocks in the 'if' portion. If not, runs the blocks inside 'else' portion.";Lang.Helper.restart_project="Restart all objects.";Lang.Helper.stop_object="All objects : Stops all objects <br> This block : Stop all blocks in this object. <br> This object: Stops all blocks in this object. <br?> This Object's other blocs : Stops blocks not connected to this object's blocks.";Lang.Helper.wait_until_true="Stops running and waits until the value of the condition is true.";Lang.Helper.when_clone_start="When a new clone of the object is created, the connected blocks below will run.";Lang.Helper.create_clone="Creates a clone of the object.";Lang.Helper.delete_clone="Deletes the objects.";Lang.Helper.remove_all_clones="Deletes all copies of the object.";Lang.Helper.move_direction="Moves in the direction of the arrow by set value.";Lang.Helper.move_x="Changes the x-position by the value regardless of the direction of the object.";Lang.Helper.move_y="Changes the y-position by the value regardless of the direction of the object.";Lang.Helper.move_xy_time="Changes the x- and y-position by the value regardless of the direction of the object.";Lang.Helper.locate_object_time="Moves the object to the mouse pointer position or to the position of another object over the input amount of time.";Lang.Helper.locate_x="Moves the object to the input x-position value.";Lang.Helper.locate_y="Moves the object to the input y-position value.";Lang.Helper.locate_xy="Moves the object to the input x- and y-position values.";Lang.Helper.locate_xy_time="Moves the object to the determined x- and y-position values over the input amount of time.";Lang.Helper.locate="Moves the object to the position of the mouse pointer or to the position of another object.";Lang.Helper.rotate_absolute="Rotates the object by the input number of degrees.";Lang.Helper.rotate_by_time="Rotates the object by the input number of degrees over the input amount of time.";Lang.Helper.rotate_relative="Rotates the object by the input number of degrees regardless of the direction of the object.";Lang.Helper.direction_absolute="Sets the direction of the object by the input number of degrees.";Lang.Helper.direction_relative="Sets the direction of movement of the object by the input number of degrees.";Lang.Helper.move_to_angle="Moves the object by the input value in the direction of the input number of degrees.";Lang.Helper.see_angle_object="Makes the object face another object or the mouse pointer.";Lang.Helper.bounce_wall="When object touches the edge of the screen, it bounces back.";Lang.Helper.show="Makes the object show on the screen.";Lang.Helper.hide="Hides the object from the screen.";Lang.Helper.dialog_time="Runs the next block after the input content is spoken by the object for the input amount of time.";Lang.Helper.dialog="Runs next block while the input contents is spoken by the object.";Lang.Helper.remove_dialog="Deletes the dialog box created (using dialog block) by the object.";Lang.Helper.change_to_some_shape="Changes the object into the selected shape.";Lang.Helper.change_to_next_shape="Changes the object into the next shape.";Lang.Helper.set_effect_volume="Applies the selected effect to the object by the input value.";Lang.Helper.set_effect_amount="Applies the selected effect to the object by the input value.";Lang.Helper.set_effect="Sets the selected effect to the object by the input value.";Lang.Helper.set_entity_effect="Deletes all effects applied to the object.";Lang.Helper.add_effect_amount="Applies the selected effect to the object by the input value.";Lang.Helper.change_effect_amount="Deletes all effects applied to the object.";Lang.Helper.change_scale_percent="Changes the size of the object by the input value.";Lang.Helper.set_scale_percent="Sets the size of the object to the input value.";Lang.Helper.change_scale_size="Changes the size of the object by the input value.";Lang.Helper.set_scale_size="Sets the size of the object to the input value.";Lang.Helper.flip_x="Flips the object vertically.";Lang.Helper.flip_y="Flips the object horizontally.";Lang.Helper.change_object_index="Bring to front : Bring object to front. <br> Bring one front : Bring object one layer front. <br> Send one back : Send object one layer back. <br> Send to back : Send object back.";Lang.Helper.set_object_order="Shows the object in the set order.";Lang.Helper.brush_stamp="Clones the object on stage like a stamp.";Lang.Helper.start_drawing="Paints brush along the path of the object.";Lang.Helper.stop_drawing="Stops object’s painting.";Lang.Helper.set_color="Sets object’s color of the brush to the selected color.";Lang.Helper.set_random_color="Sets object’s color of the brush to random.";Lang.Helper.change_thickness="Changes object’s brush thickness to the input value.";Lang.Helper.set_thickness="Sets object’s brush thickness to the input value.";Lang.Helper.change_opacity="Changes object’s brush transparency to the input value.";Lang.Helper.change_brush_transparency="Changes object’s brush transparency to the input value.";Lang.Helper.set_opacity="Sets object’s brush transparency to the input value.";Lang.Helper.set_brush_tranparency="Sets object’s brush transparency to the input value.";Lang.Helper.brush_erase_all="Deletes object’s all brush paint and stamps.";Lang.Helper.sound_something_with_block="Plays object’s select sound while next block runs.";Lang.Helper.sound_something_second_with_block="Plays object’s select sound for input amount of time while next block runs.";Lang.Helper.sound_something_wait_with_block="Plays object’s select sound then runs next blocks once sound has finished playing.";Lang.Helper.sound_something_second_wait_with_block="Plays object’s select sound for input amount of time then runs next blocks.";Lang.Helper.sound_volume_change="Changes the volume of all sounds played in the project by the input percentage.";Lang.Helper.sound_volume_set="Sets the volume of all sounds played in the project to the input percentage.";Lang.Helper.sound_silent_all="Stops all sounds currently playing.";Lang.Helper.is_clicked="Checks whether mouse is clicked.";Lang.Helper.is_press_some_key="Checks whether an assigned key is pressed.";Lang.Helper.reach_something="Checks whether the object reaches the selected point.";Lang.Helper.is_included_in_list="Checks whether select list contains the input value.";Lang.Helper.boolean_basic_operator="&equals: Checks whether the value on the left is greater than the value on the right. <br>&gt, : Checks whether the value on the left is greater than the value on the right.<br>&lt, : Checks whether the value on the left is less than the value on the right.<br>&gt&equals : Checks whether the value on the left is the same as or greater than the value on the right.<br>&lt&equals : Checks whether the value on the left is the same as or less than the value on the right.";Lang.Helper.function_create="Define a function by placing frequently used sets of blocks under this block. Place [name] next to [Define function] to give function a name. Pass on number of text values by placing [numeric/text value] block. Pass on boolean value of true or false by placing the [boolean value] block.";Lang.Helper.function_field_label="Place next to ‘Define function’ to give function a name.";Lang.Helper.function_field_string="Pass on numeric/text value by placing this block next to [Define function] block.  Grab/copy the [numeric/text value] block in the [Define function] block and use its value in function.";Lang.Helper.function_field_boolean="Use this block to pass on boolean value of true or false. Grab/copy the [boolean value] block in the [Define function] block and use its value in function.";Lang.Helper.function_general="This is current function block or function blocks created so far.";Lang.Menus.Join="Join";Lang.Menus.Edit_info="Edit info";Lang.Menus.Discuss="Discuss";Lang.Menus.Explore="Explore";Lang.Menus.Load="Load";Lang.Menus.My_lesson="Open Lessons";Lang.Menus.Resources="Resources";Lang.Menus.play_software="Let’s play, Software!";Lang.Menus.problem_solve="Problem Solving";Lang.Menus.Learn="Learn";Lang.Menus.teaching_tools="ENTRY Teaching tools";Lang.Menus.about_entry="About ENTRY";Lang.Menus.what_entry="What is ENTRY?";Lang.Menus.create="Create";Lang.Menus.create_new="Create new";Lang.Helper.boolean_and="Checks whether both conditions are true.";Lang.Helper.boolean_or="Checks whether at least one of the two conditions is true.";Lang.Helper.boolean_not="Changes the input condition to its opposite.";Lang.Helper.calc_basic="+ : Adds two numbers.<br>- : Subtracts two numbers.<br>X : Multiplies two numbers.<br>/ : Divides two numbers.";Lang.Helper.calc_rand="Selects a random value between the two input numbers.";Lang.Helper.get_x_coordinate="Reports the x-position value of the object.";Lang.Helper.get_y_coordinate="Reports the y-position value of the object.";Lang.Helper.coordinate_mouse="Reports either the x- or y-position value of the mouse.";Lang.Helper.coordinate_object="Reports the x/y-position of the object and various information (direction, shape name, etc.).";Lang.Helper.quotient_and_mod="quotient: The answer after you divide the first number by the second number. <br> remainder: The amount left over after division.";Lang.Helper.get_rotation_direction="Reports the object’s value of direction and value of movement.";Lang.Helper.calc_share="Reports the quotient occurring from first number divided by the second number.";Lang.Helper.calc_mod="Reports the remainder occurring from the first number divided by the second number.";Lang.Helper.calc_operation="Reports calculated values of a variety of equations relating to input numbers.";Lang.Helper.get_date="Reports values regarding the current year, month, day, and time.";Lang.Helper.distance_something="Reports the distance between the object and the selected object.";Lang.Helper.get_sound_duration="Reports the time length of the selected sound.";Lang.Helper.get_project_timer_value="Reports how many seconds have passed since the project started.";Lang.Helper.choose_project_timer_action="Start: Start timer. <br> Stop: Stop timer. <br> Reset: Reset timer to 0. (When this block is in workspace, the program will show timer window when run.)  ";Lang.Helper.reset_project_timer="Resets the timer to 0.";Lang.Helper.set_visible_project_timer="Shows or hides the timer.";Lang.Helper.ask_and_wait="The object asks the inputted text, and then receives an answer as a response.";Lang.Helper.get_canvas_input_value="Reports the contents inputted taken place after the object asked";Lang.Helper.set_visible_answer="Hide or show ‘response window’.";Lang.Helper.combine_something="Combines two input texts.";Lang.Helper.get_variable="Reports the value of the select variable.";Lang.Helper.change_variable="Adds the input value to the selected variable.";Lang.Helper.set_variable="Sets the value of the selected variable to the input value.";Lang.Helper.robotis_carCont_sensor_value="왼쪽 접속 센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>오른쪽 접촉 센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>선택 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.<br/>최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>왼쪽 적외선 센서 : 물체와 가까울 수록 큰 값 입니다.<br/>오른쪽 적외선 센서 : 물체와 가까울 수록 큰 값 값 입니다.<br/>왼쪽 적외선 센서 캘리브레이션 값 : 적외선 센서의 캘리브레이션 값 입니다.<br/>오른쪽 적외선 센서 캘리브레이션 값 : 적외선 센서의 캘리브레이션 값 입니다.<br/>(*캘리브레이션 값 - 적외선센서 조정 값)";Lang.Helper.robotis_carCont_cm_led="4개의 LED 중 1번 또는 4번 LED 를 켜거나 끕니다.<br/>LED 2번과 3번은 동작 지원하지 않습니다.";Lang.Helper.robotis_carCont_cm_sound_detected_clear="최종 소리 감지횟 수를 0 으로 초기화 합니다.";Lang.Helper.robotis_carCont_aux_motor_speed="감속모터 속도를 0 ~ 1023 의 값(으)로 정합니다.";Lang.Helper.robotis_carCont_cm_calibration="적외선센서 조정 값(http://support.robotis.com/ko/: 자동차로봇> 2. B. 적외선 값 조정)을 직접 정합니다.";Lang.Helper.robotis_openCM70_sensor_value="최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>사용자 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.최종 소리 감지 횟수 : 마지막 실시간 소리 감지 횟수 값 입니다.<br/>실시간 소리 감지 횟수 : 약 1초 안에 다음 소리가 감지되면 1씩 증가합니다.<br/>사용자 버튼 상태 : 접촉(1), 비접촉(0) 값 입니다.";Lang.Helper.robotis_openCM70_aux_sensor_value="서보모터 위치 : 0 ~ 1023, 중간 위치의 값은 512 입니다.<br/>적외선센서 :  물체와 가까울 수록 큰 값 입니다.<br/>접촉센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>조도센서(CDS) : 0 ~ 1023, 밝을 수록 큰 값 입니다.<br/>온습도센서(습도) : 0 ~ 100, 습할 수록 큰 값 입니다.<br/>온습도센서(온도) : -20 ~ 100, 온도가 높을 수록 큰 값 입니다.<br/>온도센서 :  -20 ~ 100, 온도가 높을 수록 큰 값 입니다.<br/>초음파센서 : -<br/>자석센서 : 접촉(1), 비접촉(0) 값 입니다.<br/>동작감지센서 : 동작 감지(1), 동작 미감지(0) 값 입니다.<br/>컬러센서 : 알수없음(0), 흰색(1), 검은색(2), 빨간색(3), 녹색(4), 파란색(5), 노란색(6) 값 입니다.<br/>사용자 장치 : 사용자 센서 제작에 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.";Lang.Helper.robotis_openCM70_cm_buzzer_index="음계를 0.1 ~ 5 초 동안 연주 합니다.";Lang.Helper.robotis_openCM70_cm_buzzer_melody="멜로디를 연주 합니다.<br/>멜로디를 연속으로 재생하는 경우, 다음 소리가 재생되지 않으면 '흐름 > X 초 기다리기' 블록을 사용하여 기다린 후 실행합니다.";Lang.Helper.robotis_openCM70_cm_sound_detected_clear="최종 소리 감지횟 수를 0 으로 초기화 합니다.";Lang.Helper.robotis_openCM70_cm_led="제어기의 빨간색, 녹색, 파란색 LED 를 켜거나 끕니다.";Lang.Helper.robotis_openCM70_cm_motion="제어기에 다운로드 되어있는 모션을 실행합니다.";Lang.Helper.robotis_openCM70_aux_motor_speed="감속모터 속도를 0 ~ 1023 의 값(으)로 정합니다.";Lang.Helper.robotis_openCM70_aux_servo_mode="서보모터를 회전모드 또는 관절모드로 정합니다.<br/>한번 설정된 모드는 계속 적용됩니다.<br/>회전모드는 서보모터 속도를 지정하여 서보모터를 회전 시킵니다.<br/>관절모드는 지정한 서보모터 속도로 서보모터 위치를 이동 시킵니다.";Lang.Helper.robotis_openCM70_aux_servo_speed="서보모터 속도를 0 ~ 1023 의 값(으)로 정합니다.";Lang.Helper.robotis_openCM70_aux_servo_position="서보모터 위치를 0 ~ 1023 의 값(으)로 정합니다.<br/>서보모터 속도와 같이 사용해야 합니다.";Lang.Helper.robotis_openCM70_aux_led_module="LED 모듈의 LED 를 켜거나 끕니다.";Lang.Helper.robotis_openCM70_aux_custom="사용자 센서 제작에 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.";Lang.Helper.robotis_openCM70_cm_custom_value="컨트롤 테이블 주소를 직접 입력하여 값을 확인 합니다.<br/>컨트롤 테이블 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.";Lang.Helper.robotis_openCM70_cm_custom="컨트롤 테이블 주소를 직접 입력하여 값을 정합니다.<br/>컨트롤 테이블 대한 설명은 ROBOTIS e-매뉴얼(http://support.robotis.com/ko/)을 참고하세요.";Lang.Menus.start_programming="First Step for Software Education";Lang.Menus.Entry="ENTRY";Lang.Menus.intro_learning="Learn to code in fun and easy way.";Lang.Menus.intro_learning_anyone="Start now with Entry!";Lang.Menus.start_now="For Free, Forever.";Lang.Helper.show_variable="Shows the value of the selected variable on the stage.";Lang.Helper.hide_variable="Hides the value of the selected variable from the stage.";Lang.Helper.value_of_index_from_list="Reports the item at the location of the input value on the selected list.";Lang.Helper.add_value_to_list="Adds the input item to the end location of the selected list.";Lang.Helper.remove_value_from_list="Deletes the item at the location of the input value from the selected list.";Lang.Helper.insert_value_to_list="Inserts the input item at the location of the input value in the selected list.";Lang.Helper.change_value_list_index="Replaces the item at the location of the input value to the input text";Lang.Helper.length_of_list="Reports the number of items contained in the selected list.";Lang.Helper.show_list="Shows the selected list on the stage.";Lang.Helper.hide_list="Hides the selected list from the stage.";Lang.Helper.text="Reports the text in the text box.";Lang.Helper.text_write="Changes the content of the text box to the input text.";Lang.Helper.text_append="Adds the input text behind the text box.";Lang.Helper.text_prepend="Adds the input text in front of the text box.";Lang.Helper.text_flush="Deletes all saved text in the text box.";Lang.Helper.erase_all_effects="Delete all effects about this object.";Lang.Menus.welcome_entry="Welcome to ENTRY";Lang.Menus.student="Student";Lang.Menus.non_menber="Non-member";Lang.Menus.teacher="Teacher";Lang.Menus.terms_conditions="Terms and Conditions";Lang.Menus.personal_information="";Lang.Menus.limitation_liability="Limitation of Liability and Duty of Announcement";Lang.Menus.entry_agree="Agree to ENTRY’s Terms of Use";Lang.Menus.info_agree="";Lang.Menus.next="Next";Lang.Menus.enter_id="";Lang.Menus.enter_password="Enter Password";Lang.Menus.confirm_password="Confirm Password";Lang.Menus.enter_password_again="Enter  your password again";Lang.Menus.validation_password="Please use at least 5 letters and/or numbers";Lang.Menus.validation_id="Please use 4-20 letters and/or numbers.";Lang.Menus.prev="Back";Lang.Menus.born_year="Year born";Lang.Menus.select_born="Select the year you were born.";Lang.Menus.year="years";Lang.Menus.gender="Gender";Lang.Menus.choose_gender="Choose gender";Lang.Menus.male="Male";Lang.Menus.female="Female";Lang.Menus.language="Language";Lang.Menus.best_language="Select your best language";Lang.Menus.korean="Korean";Lang.Menus.english="English";Lang.Menus.viet="Vietnamese";Lang.Menus.option_email="Email (optional)";Lang.Menus.insert_email="Enter your email address";Lang.Menus.sign_up_complete="Sign up complete!";Lang.Menus.agree_terms_conditions="Please agree Terms and Conditions";Lang.Menus.agree_personal_information="";Lang.Menus.insert_studying_stage="";Lang.Menus.insert_born_year="Insert the year you were born";Lang.Menus.insert_gender="Insert gender";Lang.Menus.select_language="select language";Lang.Menus.check_email="Check email's format";Lang.Menus.already_exist_id="email already exists";Lang.Menus.id_validation_id="ID use 4-20 letters and/or numbers.";Lang.Menus.password_validate_pwd="Password use at least 5 letters and/or numbers";Lang.Menus.insert_same_pwd="Insert same password";Lang.Menus.studying_stage_group="";Lang.Menus.studying_stage="";Lang.Menus.password="Password";Lang.Menus.save_id="Save ID";Lang.Menus.forgot_password="Forgot Password ?";Lang.Menus.did_not_join="Haven’t signed up yet?";Lang.Menus.go_join="Go to join";Lang.Menus.first_step="";Lang.Menus.entry_content_one="";Lang.Menus.entry_content_two="";Lang.Menus.entry_content_three="";Lang.Menus.funny_space="";Lang.Menus.in_learn_section="";Lang.Menus.learn_problem_solving="";Lang.Menus.joy_create="";Lang.Menus.in_make="";Lang.Menus.make_contents="";Lang.Menus.and_content="";Lang.Menus.share_collaborate="";Lang.Menus.explore_contents="";Lang.Menus.why_software="";Lang.Menus.speak_obama_contents="";Lang.Menus.obama="";Lang.Menus.us_president="";Lang.Menus.billgates_contents="";Lang.Menus.billgates="";Lang.Menus.chairman_micro="";Lang.Menus.eric_contents="";Lang.Menus.eric="";Lang.Menus.sandbug_contents="";Lang.Menus.sandbug="";Lang.Menus.view_entry_tools="";Lang.Menus.solve_problem="";Lang.Menus.solve_problem_content="";Lang.Menus.find_extra_title="";Lang.Menus.all_ages="";Lang.Menus.total="";Lang.Menus.step="";Lang.Menus.find_extra_contents="";Lang.Menus.software_play_contents="";Lang.Menus.resources_contents="";Lang.Menus.from="";Lang.Menus.sw_camp="";Lang.Menus.elementary="";Lang.Menus.middle="";Lang.Menus.grades="";Lang.Menus.lesson="";Lang.Menus.sw_contents_one="";Lang.Menus.sw_camp_detail="";Lang.Menus.sw_contents_two="";Lang.Menus.sw_contents_three="";Lang.Menus.naver_sw="";Lang.Menus.teacher_teaching="";Lang.Menus.funny_sw="";Lang.Menus.sw_contents_four="";Lang.Menus.ct_text_5="";Lang.Menus.teacher_grade_5="";Lang.Menus.ct_text_5_content="";Lang.Menus.ct_text_6="";Lang.Menus.teacher_grade_6="";Lang.Menus.ct_text_6_content="";Lang.Menus.sw_use="";Lang.Menus.title="";Lang.Menus.writer="";Lang.Menus.view="";Lang.Menus.date="";Lang.Menus.find_id_pwd="";Lang.Menus.forgot_password="";Lang.Menus.send_email="";Lang.Menus.user_not_exist="";Lang.Menus.not_signup="";Lang.Menus.send="";Lang.Menus.sensorboard="";Lang.Menus.physical_computing="";Lang.Menus.sensorboard_contents="";Lang.Menus.entrybot_boardgame="";Lang.Menus.unplugged="";Lang.Menus.unplugged_contents="";Lang.Menus.entrybot_cardgame="";Lang.Menus.entrybot_cardgame_contents="";Lang.Menus.basic_learn="";Lang.Menus.basic_learn_contents="";Lang.Menus.troubleshooting="";Lang.Menus.playsoftware="";Lang.Menus.make_own_lesson="";Lang.Menus.lecture="";Lang.Menus.curriculum="";Lang.Menus.group_lecture="";Lang.Menus.group_curriculum="";Lang.Menus.group_homework="";Lang.Menus.group_noproject="";Lang.Menus.group_nolecture="";Lang.Menus.group_nocurriculum="";Lang.Menus.lecture_contents="";Lang.Menus.curriculum_contents="";Lang.Menus.grade_info="";Lang.Menus.difficulty="";Lang.Menus.usage="";Lang.Menus.learning_concept="";Lang.Menus.related_subject="";Lang.Menus.show_more="";Lang.Menus.close="";Lang.Menus.latest="";Lang.Menus.viewer="";Lang.Menus.like="";Lang.Menus.comment="";Lang.Menus.entire_period="";Lang.Menus.today="";Lang.Menus.latest_week="";Lang.Menus.latest_month="";Lang.Menus.latest_three_month="";Lang.Menus.current_password="";Lang.Menus.incorrect_password="";Lang.Menus.new_password="";Lang.Menus.password_option_1="";Lang.Menus.again_new_password="";Lang.Menus.enter_new_pwd="";Lang.Menus.enter_new_pwd_again="";Lang.Menus.password_match="";Lang.Menus.incorrect_email="";Lang.Menus.edit_button="";Lang.Menus.edit_profile="";Lang.Menus.my_project="";Lang.Menus.my_group="";Lang.Menus.mark="";Lang.Menus.prev_state="";Lang.Menus.profile_image="";Lang.Menus.insert_profile_image="";Lang.Menus.at_least_180="";Lang.Menus.upload_image="";Lang.Menus.main_image="";Lang.Menus.about_me="";Lang.Menus.save_change="";Lang.Menus.basic_image="";Lang.Menus.profile_condition="";Lang.Menus.profile_back="";Lang.Menus.make_project="";Lang.Menus.exhibit_project="";Lang.Menus.art_list_shared="";Lang.Menus.art_list_group_shared="";Lang.Menus.view_project="";Lang.Menus.comment_view="";Lang.Menus.upload_project="";Lang.Menus.edit="";Lang.Menus.save_complete="";Lang.Menus.just_like="";Lang.Menus.share="";Lang.Menus.who_likes_project="";Lang.Menus.people_interest="";Lang.Menus.none_person="";Lang.Menus.inserted_date="";Lang.Menus.last_modified="";Lang.Menus.original_project="";Lang.Menus.for_someone="";Lang.Menus.original_project_deleted="";Lang.Menus.delete_project="";Lang.Menus.currnet_month_time="";Lang.Menus.current_day_time="";Lang.Menus.game="";Lang.Menus.animation="";Lang.Menus.media_art="";Lang.Menus.physical="";Lang.Menus.etc="";Lang.Menus.connected_contents="";Lang.Menus.connected_contents_content="";Lang.Menus.basic_mission="";Lang.Menus.basic_mission_content="";Lang.Menus.application_mission="";Lang.Menus.write_article="Write";Lang.Menus.view_all_articles="View all articles";Lang.Menus.view_own_articles="View own articles";Lang.Menus.learning_materials="";Lang.Menus.ebs_software_first="";Lang.Menus.go_software="";Lang.Menus.ebs_context="";Lang.Menus.category="Category";Lang.Menus.add_picture="Add Picture";Lang.Menus.upload_article="Upload article";Lang.Menus.list="List";Lang.Menus.report="Report";Lang.Menus.upload="Upload";Lang.Menus.staff_picks="Staff Picks";Lang.Menus.popular_picks="Popular Projects";Lang.Menus.lecture_header_more="";Lang.Menus.lecture_header_reset="";Lang.Menus.lecture_header_reset_exec="";Lang.Menus.lecture_header_save="";Lang.Menus.lecture_header_save_content="";Lang.Menus.lecture_header_export_project="";Lang.Menus.lecture_header_undo="";Lang.Menus.lecture_header_redo="";Lang.Menus.lecture_header_bugs="";Lang.Menus.lecture_container_tab_object="";Lang.Menus.lecture_container_tab_video="";Lang.Menus.lecture_container_tab_project="";Lang.Menus.lecture_container_tab_help="";Lang.Blocks.CALC_char_at_1="letter";Lang.Blocks.CALC_char_at_2="of";Lang.Blocks.CALC_char_at_3="";Lang.Blocks.CALC_length_of_string_1="length of";Lang.Blocks.CALC_length_of_string_2="";Lang.Blocks.CALC_substring_1="substring of";Lang.Blocks.CALC_substring_2="from";Lang.Blocks.CALC_substring_3="to";Lang.Blocks.length_of_string="to";Lang.Blocks.CALC_substring_4="";Lang.Blocks.CALC_replace_string_1="replace";Lang.Blocks.CALC_replace_string_2="in";Lang.Blocks.CALC_replace_string_3="with";Lang.Blocks.CALC_replace_string_4="";Lang.Blocks.CALC_change_string_case_1="";Lang.Blocks.CALC_change_string_case_2="of";Lang.Blocks.CALC_change_string_case_3="";Lang.Blocks.CALC_change_string_case_sub_1="uppercase";Lang.Blocks.CALC_change_string_case_sub_2="lowercase";Lang.Helper.char_at="Reports the letter of the input text.";Lang.Helper.length_of_string="Reports the length of input text include spacing";Lang.Helper.substring="Reports the text extracted from the input text between two specified indices";Lang.Helper.replace_string="Reports the text that replaced all the input text with another input text";Lang.Blocks.CALC_index_of_string_1="index of";Lang.Blocks.CALC_index_of_string_2="in";Lang.Blocks.CALC_index_of_string_3="";Lang.Helper.index_of_string="Reports the index of first input text in second input text";Lang.Helper.change_string_case="Reports the text that converted to uppercase or lowercase";Lang.Buttons.confirm="Áp dụng";Lang.Menus.illigal="";Lang.Menus.verbal="";Lang.Menus.commertial="";Lang.Menus.explicit="";Lang.Menus.other="";Lang.Menus.report_result="";Lang.Menus.report_success="";Lang.Menus.etc_detail="";Lang.Menus.lecture_play="";Lang.Menus.list_view_link="";Lang.Menus.lecture_intro="";Lang.Menus.study_goal="";Lang.Menus.study_description="";Lang.Menus.study_created="";Lang.Menus.study_last_updated="";Lang.Menus.study_remove="";Lang.Menus.study_edit="";Lang.Menus.study_comments="";Lang.Menus.study_comment_post="";Lang.Menus.study_comment_remove="";Lang.Menus.study_comment_edit="";Lang.Menus.study_comment_save="";Lang.Menus.study_guide_video="";Lang.Menus.study_basic_project="";Lang.Menus.study_done_project="";Lang.Menus.study_usage_element="";Lang.Menus.study_concept_element="";Lang.Menus.study_subject_element="";Lang.Menus.study_element_none="";Lang.Menus.study_label_like="";Lang.Menus.study_label_interest="";Lang.Menus.study_label_share="";Lang.Menus.study_label_like_people="";Lang.Menus.study_label_interest_people="";Lang.Menus.study_related_lectures="";Lang.Menus.study_expand="";Lang.Menus.study_collapse="";Lang.Menus.aftercopy="";Lang.Menus.study_remove_curriculum="";Lang.Menus.content_required="";Lang.Menus.study_remove_lecture="";Lang.Menus.lecture_build="";Lang.Menus.lecture_build_step1="";Lang.Menus.lecture_build_step2="";Lang.Menus.lecture_build_step3="";Lang.Menus.lecture_build_choice="";Lang.Menus.lecture_build_project="";Lang.Menus.lecture_build_video="";Lang.Menus.lecture_build_grade="";Lang.Menus.lecture_build_goals="";Lang.Menus.lecture_build_add_goal="";Lang.Menus.lecture_build_attach="";Lang.Menus.lecture_build_attach_text="";Lang.Menus.lecture_build_assist="";Lang.Menus.lecture_build_youtube_url="";Lang.Menus.lecture_build_project_done="";Lang.Menus.lecture_build_scene_text1="";Lang.Menus.lecture_build_scene_text2="";Lang.Menus.lecture_build_object_text="";Lang.Menus.lecture_build_blocks_text1="";Lang.Menus.lecture_build_blocks_text2="";Lang.Menus.lecture_build_basic1="";Lang.Menus.lecture_build_basic2="";Lang.Menus.lecture_build_help="";Lang.Menus.lecture_build_help_never="";Lang.Menus.lecture_build_close="";Lang.Menus.lecture_build_scene="";Lang.Menus.lecture_build_add_object="";Lang.Menus.lecture_build_start="";Lang.Menus.lecture_build_tab_code="";Lang.Menus.lecture_build_tab_shape="";Lang.Menus.lecture_build_tab_sound="";Lang.Menus.lecture_build_tab_attribute="";Lang.Menus.lecture_build_block_category="";Lang.Menus.lecture_build_attr_all="";Lang.Menus.lecture_build_attr_var="";Lang.Menus.lecture_build_attr_signal="";Lang.Menus.lecture_build_attr_list="";Lang.Menus.lecture_build_attr_func="";Lang.Menus.lecture_build_edit="";Lang.Menus.lecture_build_remove="";Lang.Menus.curriculum_build="";Lang.Menus.curriculum_step1="";Lang.Menus.curriculum_step2="";Lang.Menus.curriculum_step3="";Lang.Menus.curriculum_lecture_upload="";Lang.Menus.curriculum_lecture_edit="";Lang.Menus.curriculum_lecture_open="";Lang.Menus.group_lecture_add="";Lang.Menus.group_curriculum_add="";Lang.Menus.group_lecture_delete="";Lang.Menus.group_curriculum_delete="";Lang.Menus.group_select="";Lang.Menus.group_studentNo="";Lang.Menus.group_username="";Lang.Menus.group_userId="";Lang.Menus.group_tempPassword="";Lang.Menus.group_gender="";Lang.Menus.group_studentCode="";Lang.Menus.group_viewWorks="";Lang.Menus.added_group_lecture="";Lang.Menus.added_group_curriculum="";Lang.Menus.deleted_group_lecture="";Lang.Menus.deleted_group_curriculum="";Lang.Menus.modal_my="";Lang.Menus.modal_interest="";Lang.Menus.modal_project="";Lang.Menus.section="";Lang.Menus.modal_project="";Lang.Blocks.MOVING_add_direction_by_angle_time_explain_1="";Lang.Blocks.MOVING_direction_relative_duration_1="Adding direction while";Lang.Blocks.MOVING_direction_relative_duration_2="seconds by";Lang.Blocks.MOVING_direction_relative_duration_3="";Lang.Helper.direction_relative_duration="Rotates the direction of this object by the input number of degrees over the input amount of time.";Lang.Blocks.CALC_get_sound_volume="Volume";Lang.Helper.get_sound_volume="Reports the sound volume.";Lang.Blocks.SOUND_sound_from_to_1="Play";Lang.Blocks.SOUND_sound_from_to_2="Sound";Lang.Blocks.SOUND_sound_from_to_3="to";Lang.Blocks.SOUND_sound_from_to_4="seconds";Lang.Helper.sound_from_to="";Lang.Blocks.SOUND_sound_from_to_and_wait_1="Play";Lang.Blocks.SOUND_sound_from_to_and_wait_2="Sound";Lang.Blocks.SOUND_sound_from_to_and_wait_3="to";Lang.Blocks.SOUND_sound_from_to_and_wait_4="seconds and wait";Lang.Helper.sound_from_to_and_wait="";Lang.Blocks.CALC_quotient_and_mod_1="";Lang.Blocks.CALC_quotient_and_mod_2="of";Lang.Blocks.CALC_quotient_and_mod_3="/";Lang.Blocks.CALC_quotient_and_mod_4="";Lang.Blocks.CALC_quotient_and_mod_sub_1="Quotient";Lang.Blocks.CALC_quotient_and_mod_sub_2="Rest";Lang.Blocks.self="Self";Lang.Blocks.CALC_coordinate_size_value="Scale";Lang.Blocks.CALC_choose_project_timer_action_1="";Lang.Blocks.CALC_choose_project_timer_action_2="timer";Lang.Blocks.CALC_choose_project_timer_action_sub_1="Start";Lang.Blocks.CALC_choose_project_timer_action_sub_2="Stop";Lang.Blocks.CALC_choose_project_timer_action_sub_3="Reset";Lang.Blocks.LOOKS_change_object_index_1="bring to";Lang.Blocks.LOOKS_change_object_index_2="";Lang.Blocks.LOOKS_change_object_index_sub_1="front";Lang.Blocks.LOOKS_change_object_index_sub_2="forward";Lang.Blocks.LOOKS_change_object_index_sub_3="backward";Lang.Blocks.LOOKS_change_object_index_sub_4="back";Lang.Category={};Lang.Category.entrybot_friends="";Lang.Category.people="";Lang.Category.animal="";Lang.Category.animal_flying="";Lang.Category.animal_land="";Lang.Category.animal_water="";Lang.Category.animal_others="";Lang.Category.plant="";Lang.Category.plant_flower="";Lang.Category.plant_grass="";Lang.Category.plant_tree="";Lang.Category.plant_others="";Lang.Category.vehicles="";Lang.Category.vehicles_flying="";Lang.Category.vehicles_land="";Lang.Category.vehicles_water="";Lang.Category.vehicles_others="";Lang.Category.architect="";Lang.Category.architect_building="";Lang.Category.architect_monument="";Lang.Category.architect_others="";Lang.Category.food="";Lang.Category.food_vegetables="";Lang.Category.food_meat="";Lang.Category.food_drink="";Lang.Category.food_others="";Lang.Category.environment="";Lang.Category.environment_nature="";Lang.Category.environment_space="";Lang.Category.environment_others="";Lang.Category.stuff="";Lang.Category.stuff_living="";Lang.Category.stuff_hobby="";Lang.Category.stuff_others="";Lang.Category.fantasy="";Lang.Category.interface="";Lang.Category.background="";Lang.Category.background_outdoor="";Lang.Category.background_indoor="";Lang.Category.background_nature="";Lang.Category.background_others="";Lang.Device={};Lang.Device.arduino="arduino";Lang.Device.hamster="hamster";Lang.Device.albert="albert";Lang.Device.robotis_carCont="";Lang.Device.robotis_openCM70="";Lang.Menus.connect_hw="connect hardware";Lang.Device.sensorBoard="Entry Sensor Board";Lang.Device.CODEino="CODEino";Lang.Device.bitbrick="bitbrick";Lang.Menus.connect_message="Connected to %1";Lang.Menus.connect_fail="Connect fail";Lang.General={};Lang.General.turn_on="turn on";Lang.General.turn_off="turn off";Lang.General.left="left";Lang.General.right="right";Lang.General.both="both";Lang.General.red="red";Lang.General.yellow="yellow";Lang.General.green="green";Lang.General.skyblue="sykblue";Lang.General.blue="blue";Lang.General.purple="purple";Lang.General.white="white";Lang.General.note_c="C";Lang.General.note_d="D";Lang.General.note_e="E";Lang.General.note_f="F";Lang.General.note_g="G";Lang.General.note_a="A";Lang.General.note_b="B";Lang.Menus.interest_curriculum="Interest";Lang.Menus.searchword_required="Search word required.";Lang.Menus.file_required="File is required.";Lang.Menus.file_upload_max_count="Maximum 10 files are available at once.";Lang.Menus.image_file_only="Uploads permitted on image files only.";Lang.Menus.file_upload_max_size="Uploading limited under 10MB on each files.";Lang.Menus.curriculum_modal_lectures="My Lectures";Lang.Menus.curriculum_modal_interest="Interest";Lang.Menus.group_curriculum_modal_curriculums="My Courses";Lang.Menus.group_curriculum_modal_interest="Interest";Lang.Menus.picture_import="Import a picture";Lang.Menus.picture_select="Select a picture";Lang.Workspace.blocks_reference="Blocks Reference";Lang.Workspace.hardware_guide="Hardware Guide";Lang.Menus.lecture_list_view="";Lang.Workspace.show_list_workspace="";Lang.Helper.Block_info="";Lang.Helper.Block_click_msg="";Lang.Workspace.List_create_cloud="Use for shared list <br>(Stored in Server)";Lang.Menus.play_software_2="";Lang.Menus.play_software_2_content="";Lang.Menus.open_project_to_all="";Lang.Menus.close_project="";Lang.Menus.category_media_art="Media Art";Lang.Menus.go_further="";Lang.Menus.marked_project="";Lang.Menus.basic="";Lang.Menus.application="";Lang.Menus.the_great_escape="";Lang.Menus.escape_guide_1="";Lang.Menus.escape_guide_1_2="";Lang.Menus.escape_guide_2="";Lang.Menus.escape_guide_2_2="";Lang.Menus.escape_guide_3="";Lang.Menus.escape_guide_3_2="";Lang.Menus.escape_guide_4="";Lang.Menus.escape_guide_4_2="";Lang.Menus.space_travel_log="";Lang.Menus.space_guide_1="";Lang.Menus.space_guide_2="";Lang.Menus.space_guide_2_2="";Lang.Menus.cfest_mission="";Lang.Menus.maze_1_intro="";Lang.Menus.maze_1_title="";Lang.Menus.maze_1_content="";Lang.Menus.maze_1_detail="";Lang.Menus.maze_2_intro="";Lang.Menus.maze_2_title_1="";Lang.Menus.maze_2_content_1="";Lang.Menus.maze_2_detail_1="";Lang.Menus.maze_2_title_2="";Lang.Menus.maze_2_content_2="";Lang.Menus.maze_2_detail_2="";Lang.Menus.maze_3_intro="";Lang.Menus.maze_3_title="";Lang.Menus.maze_3_content="";Lang.Menus.maze_3_detail="";Lang.Menus.maze_4_intro="";Lang.Menus.maze_4_title="";Lang.Menus.maze_4_content="";Lang.Menus.maze_4_detail="";Lang.Menus.maze_5_intro="";Lang.Menus.maze_5_title_1="";Lang.Menus.maze_5_content_1="";Lang.Menus.maze_5_detail_1="";Lang.Menus.maze_5_title_2="";Lang.Menus.maze_5_content_2="";Lang.Menus.maze_5_detail_2="";Lang.Menus.maze_6_intro="";Lang.Menus.maze_6_title_1="";Lang.Menus.maze_6_content_1="";Lang.Menus.maze_6_detail_1="";Lang.Menus.maze_6_title_2="";Lang.Menus.maze_6_content_2="";Lang.Menus.maze_6_detail_2="";Lang.Menus.maze_programing_mode_0="";Lang.Menus.maze_programing_mode_1="";Lang.Menus.maze_operation1_title="";Lang.Menus.maze_operation1_1_desc="";Lang.Menus.maze_operation1_2_desc="";Lang.Menus.maze_operation1_2_textset_1="";Lang.Menus.maze_operation1_2_textset_2="";Lang.Menus.maze_operation1_3_desc="";Lang.Menus.maze_operation1_4_desc="";Lang.Menus.maze_operation7_title="";Lang.Menus.maze_operation7_1_desc="";Lang.Menus.maze_operation7_2_desc="";Lang.Menus.maze_operation7_3_desc="";Lang.Menus.maze_operation7_4_desc="";Lang.Menus.maze_operation7_1_textset_1="";Lang.Menus.maze_operation7_1_textset_2="";Lang.Menus.maze_operation7_2_textset_1="";Lang.Menus.maze_operation7_2_textset_2="";Lang.Menus.maze_operation7_4_textset_1="";Lang.Menus.maze_operation7_4_textset_2="";Lang.Menus.maze_operation9_title="";Lang.Menus.maze_operation9_1_desc="";Lang.Menus.maze_operation9_2_desc="";Lang.Menus.maze_operation9_3_desc="";Lang.Menus.maze_operation9_1_textset_1="";Lang.Menus.maze_operation9_3_textset_1="";Lang.Menus.maze_operation9_3_textset_2="";Lang.Menus.maze_operation10_title="";Lang.Menus.maze_operation10_1_desc="";Lang.Menus.maze_operation10_2_desc="";Lang.Menus.maze_operation10_3_desc="";Lang.Menus.maze_operation10_4_desc="";Lang.Menus.maze_operation10_1_textset_1="";Lang.Menus.maze_operation10_1_textset_2="";Lang.Menus.maze_operation10_1_textset_3="";Lang.Menus.maze_operation10_1_textset_4="";Lang.Menus.maze_operation10_2_textset_1="";Lang.Menus.maze_operation10_2_textset_2="";Lang.Menus.maze_operation10_3_textset_1="";Lang.Menus.maze_operation10_3_textset_2="";Lang.Menus.maze_operation10_4_textset_1="";Lang.Menus.maze_operation10_4_textset_2="";Lang.Menus.maze_operation10_4_textset_3="";Lang.Menus.maze_operation15_title="";Lang.Menus.maze_operation15_1_desc="";Lang.Menus.maze_operation15_2_desc="";Lang.Menus.maze_operation15_3_desc="";Lang.Menus.maze_operation15_4_desc="";Lang.Menus.maze_operation15_1_textset_1="";Lang.Menus.maze_operation15_1_textset_2="";Lang.Menus.maze_operation15_1_textset_3="";Lang.Menus.maze_operation15_2_textset_1="";Lang.Menus.maze_operation15_2_textset_2="";Lang.Menus.maze_operation15_3_textset_1="";Lang.Menus.maze_operation15_3_textset_2="";Lang.Menus.maze_operation15_4_textset_1="";Lang.Menus.maze_operation15_4_textset_2="";Lang.Menus.maze_operation15_4_textset_3="";Lang.Menus.maze_object_title="";Lang.Menus.maze_object_parts_box="";Lang.Menus.maze_object_obstacle1="";Lang.Menus.maze_object_obstacle2="";Lang.Menus.maze_object_obstacle3="";Lang.Menus.maze_object_friend="";Lang.Menus.maze_object_wall1="";Lang.Menus.maze_object_wall2="";Lang.Menus.maze_object_wall3="";Lang.Menus.maze_object_battery="";Lang.Menus.maze_command_ex="";Lang.Menus.maze_command_title="";Lang.Menus.maze_command_move_desc="";Lang.Menus.maze_command_jump_desc="";Lang.Menus.maze_command_right_desc="";Lang.Menus.maze_command_left_desc="";Lang.Menus.maze_command_for_desc="";Lang.Menus.maze_command_while_desc="";Lang.Menus.maze_command_if1_desc="";Lang.Menus.maze_command_if2_desc="";Lang.Menus.maze_command_if3_desc="";Lang.Menus.maze_command_promise_desc="";Lang.Menus.perfect="";Lang.Menus.succeeded_using_blocks="";Lang.Menus.awesome="";Lang.Menus.succeeded_go_to_next="";Lang.Menus.good="";Lang.Menus.but="";Lang.Menus.try_again="";Lang.Menus.cfest_success="";Lang.Menus.succeeded_and_cert="";Lang.Menus.cause_msgs_1="";Lang.Menus.cause_msgs_2="";Lang.Menus.cause_msgs_3="";Lang.Menus.cause_msgs_4="";Lang.Menus.cause_msgs_5="";Lang.Menus.close_experience="";Lang.Menus.replay="";Lang.Menus.go_to_next_level="";Lang.Menus.move_forward="";Lang.Menus.turn_left="";Lang.Menus.turn_right="";Lang.Menus.turn_en="";Lang.Menus.turn_ko="";Lang.Menus.jump_over="";Lang.Menus.when_start_is_pressed="";Lang.Menus.repeat_until_ko="";Lang.Menus.repeat_until_en="";Lang.Menus.repeat_until="";Lang.Menus.if_there_is_1="";Lang.Menus.if_there_is_2="";Lang.Menus.used_blocks="";Lang.Menus.maximum="";Lang.Menus.used_command="";Lang.Menus.maximum_command="";Lang.Menus.block_box="";Lang.Menus.block_assembly="";Lang.Menus.command_box="";Lang.Menus.command_assembly="";Lang.Menus.start="";Lang.Menus.engine_running="";Lang.Menus.engine_replay="";Lang.Menus.goto_show="";Lang.Menus.make_together="";Lang.Menus.make_together_content="";Lang.Menus.project_nobody_like="";Lang.Menus.project_nobody_interest="";Lang.Menus.lecture_nobody_like="";Lang.Menus.lecture_nobody_interest="";Lang.Menus.course_nobody_like="";Lang.Menus.course_nobody_interest="";Lang.Workspace.confirm_quit="";Lang.Workspace.confirm_load_temporary="";Lang.Workspace.login_to_save="";Lang.Workspace.cannot_save_in_edit_func="";Lang.Workspace.new_object="";Lang.Workspace.new_picture="";Lang.Workspace.arduino_connect="";Lang.Workspace.arduino_connect_success="";Lang.Menus.before_changed="";Lang.Menus.after_changed="";Lang.Menus.from_changed="";Lang.Menus.essential="";Lang.Menus.access_term_title="";Lang.Menus.member_info="";Lang.Menus.personal_info="";Lang.Menus.option="";Lang.Menus.latest_news="";Lang.Menus.edu_data="";Lang.Menus.footer_phrase="";Lang.Menus.footer_use_free="";Lang.Menus.nonprofit_platform="";Lang.Menus.this_is="";Lang.Menus.privacy="";Lang.Menus.entry_addr="";Lang.Menus.phone="";Lang.Menus.alert_agree_term="";Lang.Menus.alert_private_policy="";Lang.Menus.agree="";Lang.Menus.optional="";Lang.Menus.start_software="";Lang.Menus.analyze_procedure="";Lang.Menus.analyze_repeat="";Lang.Menus.analyze_condition="";Lang.Menus.analyze_interaction="";Lang.Menus.analyze_dataRepresentation="";Lang.Menus.analyze_abstraction="";Lang.Menus.analyze_sync="";Lang.Menus.jr_intro_1="";Lang.Menus.jr_intro_2="";Lang.Menus.jr_intro_3="";Lang.Menus.jr_intro_4="";Lang.Menus.jr_intro_5="";Lang.Menus.jr_intro_6="";Lang.Menus.jr_intro_7="";Lang.Menus.jr_intro_8="";Lang.Menus.jr_intro_9="";Lang.Menus.jr_intro_10="";Lang.Menus.jr_intro_11="";Lang.Menus.jr_intro_12="";Lang.Menus.jr_intro_13="";Lang.Menus.jr_intro_14="";Lang.Menus.jr_intro_15="";Lang.Menus.jr_whats_ur_name="";Lang.Menus.jr_down_cert="";Lang.Menus.jr_popup_prefix_1="";Lang.Menus.jr_popup_prefix_2="";Lang.Menus.jr_popup_suffix="";Lang.Menus.jr_fail_dont_go="";Lang.Menus.jr_fail_dont_know="";Lang.Menus.jr_fail_no_flower="";Lang.Menus.jr_fail_forgot_flower="";Lang.Menus.jr_fail_need_repeat="";Lang.Menus.jr_hint_1="";Lang.Menus.jr_hint_2="";Lang.Menus.jr_hint_3="";Lang.Menus.jr_hint_4="";Lang.Menus.jr_hint_5="";Lang.Menus.jr_hint_6="";Lang.Menus.jr_hint_7="";Lang.Menus.jr_hint_8="";Lang.Menus.jr_hint_9="";Lang.Menus.jr_hint_10="";Lang.Menus.jr_hint_11="";Lang.Menus.jr_hint_12="";Lang.Menus.jr_hint_13="";Lang.Menus.jr_hint_14="";Lang.Menus.jr_hint_15="";Lang.Menus.jr_certification="";Lang.Menus.jr_congrat="";Lang.Menus.jr_congrat_msg="";Lang.Menus.jr_share="";Lang.Menus.go_see_friends="";Lang.Menus.junior_naver="";Lang.Menus.junior_naver_contents_1="";Lang.Menus.junior_naver_contents_2="";Lang.Menus.junior_naver_contents_3="";Lang.Menus.basic_content="";Lang.Menus.jr_help="";Lang.Blocks.FLOW_repeat_while_true_until="until";Lang.Blocks.FLOW_repeat_while_true_while="while";Lang.Menus.help="";Lang.Menus.cparty_robot_intro_1="";Lang.Menus.cparty_robot_intro_2="";Lang.Menus.cparty_robot_intro_3="";Lang.Menus.cparty_robot_intro_4="";Lang.Menus.cparty_robot_intro_5="";Lang.Menus.cparty_robot_intro_6="";Lang.Menus.cparty_robot_intro_7="";Lang.Menus.cparty_robot_intro_8="";Lang.Menus.cparty_robot_intro_9="";Lang.Menus.cparty_robot_intro_10="";Lang.Menus.cparty_car_intro_1="";Lang.Menus.cparty_car_intro_2="";Lang.Menus.cparty_car_intro_3="";Lang.Menus.cparty_car_intro_4="";Lang.Menus.cparty_car_intro_5="";Lang.Menus.cparty_car_intro_6="";Lang.Menus.cparty_car_intro_7="";Lang.Menus.cparty_car_intro_8="";Lang.Menus.cparty_car_intro_9="";Lang.Menus.cparty_car_intro_10="";Lang.Menus.cparty_car_popup_prefix_1="";Lang.Menus.cparty_car_popup_prefix_2="";Lang.Menus.cparty_car_popup_suffix="";Lang.Menus.all_grade="";Lang.Menus.grade_e3_e4="";Lang.Menus.grade_e5_e6="";Lang.Menus.grade_m1_m3="";Lang.Menus.entry_first_step="";Lang.Menus.entry_monthly="";Lang.Menus.play_sw_2="";Lang.Menus.entry_programming="";Lang.Menus.entry_recommanded_course="";Lang.Menus.introduce_course="";Lang.Menus.all_free="";Lang.Menus.cparty_result_fail_1="";Lang.Menus.cparty_result_fail_2="";Lang.Menus.cparty_result_fail_3="";Lang.Menus.cparty_result_fail_4="";Lang.Menus.cparty_result_fail_5="";Lang.Menus.cparty_result_success_1="";Lang.Menus.cparty_result_success_2="";Lang.Menus.cparty_result_success_3="";Lang.Menus.cparty_insert_name="";Lang.Menus.offline_file="File";Lang.Menus.offline_edit="Edit";Lang.Menus.offline_undo="Un-do";Lang.Menus.offline_redo="Re-do";Lang.Menus.offline_quit="Quit";Lang.Menus.select_one="";Lang.Menus.evaluate_challenge="";Lang.Menus.very_easy="";Lang.Menus.easy="";Lang.Menus.normal="";Lang.Menus.difficult="";Lang.Menus.very_difficult="";Lang.Menus.save_dismiss="";Lang.Menus.help="";Lang.Menus.entry_info="";Lang.Menus.view="";Lang.Menus.actual_size="";Lang.Menus.zoom_in="";Lang.Menus.zoom_out="";Lang.Menus.cparty_jr_intro_1="";Lang.Menus.cparty_jr_intro_2="";Lang.Menus.cparty_jr_intro_3="";Lang.Menus.cparty_jr_intro_4="";Lang.Menus.cparty_jr_intro_5="";Lang.Menus.cparty_jr_intro_6="";Lang.Menus.cparty_jr_intro_7="";Lang.Menus.cparty_jr_intro_8="";Lang.Menus.cparty_jr_intro_9="";Lang.Menus.cparty_jr_intro_10="";Lang.Menus.cparty_jr_intro_11="";Lang.Menus.cparty_jr_intro_12="";Lang.Menus.cparty_jr_intro_13="";Lang.Menus.cparty_jr_intro_14="";Lang.Menus.cparty_jr_intro_15="";Lang.Menus.make_new_project="";Lang.Menus.open_old_project="";Lang.Menus.offline_download="";Lang.Menus.offline_release="";Lang.Menus.offline_description_1="";Lang.Menus.offline_description_2="";Lang.Menus.offline_description_3="";Lang.Menus.sw_week_2015="";Lang.Menus.cparty_desc="";Lang.Menus.entry_offline_download="";Lang.Menus.offline_desc_1="";Lang.Menus.offline_desc_2="";Lang.Menus.download="";Lang.Menus.version="";Lang.Menus.file_size="";Lang.Menus.update="";Lang.Menus.use_range="";Lang.Menus.offline_desc_free="";Lang.Menus.offline_required="";Lang.Menus.offline_required_detail="";Lang.Menus.offline_notice="";Lang.Menus.offline_notice_1="";Lang.Menus.offline_notice_2="";Lang.Menus.cparty_jr_result_2="";Lang.Menus.cparty_jr_result_3="";Lang.Menus.cparty_jr_result_4="";Lang.Menus.lms_no_class="";Lang.Menus.lms_create_class="";Lang.Menus.lms_add_class="";Lang.Menus.lms_base_class="";Lang.Menus.lms_delete_class="";Lang.Menus.lms_my_class="";Lang.Menus.lms_grade_1="";Lang.Menus.lms_grade_2="";Lang.Menus.lms_grade_3="";Lang.Menus.lms_grade_4="";Lang.Menus.lms_grade_5="";Lang.Menus.lms_grade_6="";Lang.Menus.lms_grade_7="";Lang.Menus.lms_grade_8="";Lang.Menus.lms_grade_9="";Lang.Menus.lms_grade_10="";Lang.Menus.lms_add_groupId_personal="";Lang.Menus.lms_add_groupId="";Lang.Menus.lms_add_group_account="";Lang.Menus.lms_enter_group_info="";Lang.Menus.lms_group_id="";Lang.Menus.lms_group_pw="";Lang.Menus.lms_group_name="";Lang.Menus.personal_pwd_alert="";Lang.Menus.personal_form_alert="";Lang.Menus.personal_form_alert_2="";Lang.Menus.personal_no_pwd_alert="";Lang.Menus.select_gender="";Lang.Menus.enter_group_id="";Lang.Menus.enter_group_pwd="";Lang.Menus.info_added="";Lang.Menus.no_group_id="";Lang.Menus.no_group_pwd="";Lang.Menus.lms_please_choice="";Lang.Menus.group_lesson="";Lang.Menus.lms_banner_add_group="";Lang.Menus.lms_banner_entry_group="";Lang.Menus.lms_banner_desc_1="";Lang.Menus.lms_banner_desc_2="";Lang.Menus.lms_banner_desc_3="";Lang.Menus.lms_banner_download_manual="";Lang.Menus.lms_banner_detail="";Lang.Menus.already_exist_email="";Lang.Menus.remove_project="";Lang.Menus.study_lesson="";Lang.Menus.open_project="";Lang.Menus.make_group="";Lang.Menus.project_share="";Lang.Menus.group_project_share="";Lang.Menus.group_discuss="";Lang.Menus.my_profile="";Lang.Menus.search_updated="";Lang.Menus.search_recent="";Lang.Menus.search_complexity="";Lang.Menus.search_staffPicked="";Lang.Menus.search_childCnt="";Lang.Menus.search_likeCnt="";Lang.Menus.gnb_share="";Lang.Menus.gnb_community="";Lang.Menus.lms_add_lectures="";Lang.Menus.lms_add_course="";Lang.Menus.lms_add_homework="";Lang.Menus.remove_lecture_confirm="";Lang.Menus.popup_delete="";Lang.Menus.remove_course_confirm="";Lang.Menus.lms_no_lecture_teacher_1="";Lang.Menus.lms_no_lecture_teacher_2="";Lang.Menus.gnb_download="";Lang.Menus.lms_no_lecture_student_1="";Lang.Menus.lms_no_lecture_student_2="";Lang.Menus.lms_no_lecture_student_3="";Lang.Menus.lms_no_class_teacher="";Lang.Menus.lms_no_course_teacher_1="";Lang.Menus.lms_no_course_teacher_2="";Lang.Menus.lms_no_course_student_1="";Lang.Menus.lms_no_course_student_2="";Lang.Menus.lms_no_course_student_3="";Lang.Menus.lms_no_hw_teacher_1="";Lang.Menus.lms_no_hw_teacher_2="";Lang.Menus.lms_no_hw_student_1="";Lang.Menus.lms_no_hw_student_2="";Lang.Menus.lms_no_hw_student_3="";Lang.Menus.modal_edit="";Lang.Menus.modal_deadline="";Lang.Menus.modal_hw_desc="";Lang.Menus.desc_optional="";Lang.Menus.modal_create_hw="";Lang.Menus.vol="";Lang.Menus.hw_title="";Lang.Menus.hw_description="";Lang.Menus.deadline="";Lang.Menus.do_homework="";Lang.Menus.hw_progress="";Lang.Menus.hw_submit="";Lang.Menus.view_list="";Lang.Menus.view_desc="";Lang.Menus.do_submit="";Lang.Buttons.delete="";Lang.Menus.popup_notice="";Lang.Menus.no_selected_hw="";Lang.Menus.hw_delete_confirm="";Lang.Menus.hw_submitter="";Lang.Menus.hw_student_desc_1="";Lang.Menus.hw_student_desc_2="";Lang.Menus.popup_create_class="";Lang.Menus.class_name="";Lang.Menus.image="";Lang.Menus.select_class_image="";Lang.Menus.type_class_description="";Lang.Menus.set_as_primary_group="";Lang.Menus.set_primary_group="";Lang.Menus.not_primary_group="";Lang.Buttons.create="";Lang.Menus.type_class_name="";Lang.Menus.type_class_description_long="";Lang.Menus.add_students="";Lang.Menus.download_as_pdf="";Lang.Menus.download_as_excel="";Lang.Menus.temp_password="";Lang.Buttons.done="";Lang.Menus.step_name="";Lang.Menus.step_info="";Lang.Menus.preview="";Lang.Menus.type_name_enter="";Lang.Menus.multiple_name_possible="";Lang.Menus.id_auto_create="";Lang.Menus.student_id_desc_1="";Lang.Menus.student_id_desc_2="";Lang.Menus.student_id_desc_3="";Lang.Menus.student_number="";Lang.Menus.temp_password_desc_1="";Lang.Menus.temp_password_desc_2="";Lang.Menus.temp_password_desc_3="";Lang.Menus.student_delete_confirm="";Lang.Menus.no_student_selected="";Lang.Menus.class_assignment="";Lang.Menus.class_list="";Lang.Menus.select_grade="";Lang.Menus.add_project="";Lang.Menus.no_project_display="";Lang.Menus.plz_display_project="";Lang.Buttons.accept="";Lang.Buttons.refuse="";Lang.Menus.refuse_confirm="";Lang.Menus.select_class="";Lang.Menus.mon="";Lang.Menus.tue="";Lang.Menus.wed="";Lang.Menus.thu="";Lang.Menus.fri="";Lang.Menus.sat="";Lang.Menus.sun="";Lang.Menus.jan="";Lang.Menus.feb="";Lang.Menus.mar="";Lang.Menus.apr="";Lang.Menus.may="";Lang.Menus.jun="";Lang.Menus.jul="";Lang.Menus.aug="";Lang.Menus.sep="";Lang.Menus.oct="";Lang.Menus.nov="";Lang.Menus.dec="";Lang.Menus.plz_select_lecture="";Lang.Menus.plz_set_deadline="";Lang.Menus.hide_entry="Hide Entry";Lang.Menus.hide_others="Hide Others";Lang.Menus.show_all="Show All";Lang.Workspace.confirm_load_header="";Lang.Fonts={};Lang.Fonts.batang="KoPub Batang";Lang.Fonts.myeongjo="Nanum Myeongjo";Lang.Fonts.gothic="Nanum Gothic";Lang.Fonts.pen_script="Nanum Pen Script";Lang.Fonts.jeju_hallasan="Jeju Hallasan";Lang.Fonts.gothic_coding="Nanum Gothic Coding";Lang.Menus.lecture_description="";Lang.Menus.curriculum_description="";Lang.Menus.linebreak_off_desc_1="";Lang.Menus.linebreak_off_desc_2="";Lang.Menus.linebreak_off_desc_3="";Lang.Menus.linebreak_on_desc_1="";Lang.Menus.linebreak_on_desc_2="";Lang.Menus.linebreak_on_desc_3="";Lang.Menus.entry_with="";Lang.Menus.ebs_season_1="";Lang.Menus.ebs_season_2="";Lang.Menus.partner="";Lang.Menus.project_term_popup_title="";Lang.Menus.project_term_popup_description_1="";Lang.Menus.project_term_popup_description_2="";Lang.Menus.project_term_popup_description_3="";Lang.Menus.project_term_popup_description_4="";Lang.Menus.project_term_agree_1_1="";Lang.Menus.project_term_agree_1_2="";Lang.Menus.project_term_agree_2_1="";Lang.Menus.project_term_agree_2_2="";Lang.Menus.project_term_agree_2_3="";Lang.Menus.project_term_agree_3_1="";Lang.Menus.project_term_agree_3_2="";Lang.Menus.agree_all="";Lang.Menus.select_login="";Lang.Menus.select="";Lang.Menus.with_login="";Lang.Menus.without_login="";Lang.Menus.start_challenge="";Lang.Menus.start_challenge_2="";Lang.Menus.if_not_save_not_login="";Lang.Menus.if_not_member_yet="";Lang.Menus.join_entry="";Lang.Menus.learned_computing="";Lang.Menus.cparty_index_description_1="";Lang.Menus.cparty_index_description_2="";Lang.Menus.cparty_index_description_3="";Lang.Buttons.yes="";Lang.Buttons.button_no="";Lang.Menus.cparty_index_description_4="";Lang.Menus.cparty_index_description_5="";Lang.Menus.cparty_index_description_6="";Lang.Menus.cparty_index_description_7="";Lang.Menus.cparty_index_description_8="";Lang.Menus.congratulation="";Lang.Menus.warm_up="";Lang.Menus.beginner="";Lang.Menus.intermediate="";Lang.Menus.advanced="";Lang.Menus.applied="";Lang.Menus.cert_msg_tail="";Lang.Menus.cert_msg_head="";Lang.Menus.maze_text_content_1="";Lang.Menus.maze_text_content_2="";Lang.Menus.maze_text_content_3="";Lang.Menus.maze_text_content_4="";Lang.Menus.maze_text_content_5="";Lang.Menus.maze_text_content_6="";Lang.Menus.maze_text_content_7="";Lang.Menus.maze_text_content_8="";Lang.Menus.maze_text_content_9="";Lang.Menus.maze_text_content_10="";Lang.Menus.maze_text_content_11="";Lang.Menus.maze_text_content_12="";Lang.Menus.maze_text_content_13="";Lang.Menus.maze_text_content_14="";Lang.Menus.maze_text_content_15="";Lang.Menus.maze_text_content_16="";Lang.Menus.maze_text_content_17="";Lang.Menus.maze_text_content_18="";Lang.Menus.maze_text_content_19="";Lang.Menus.maze_text_content_20="";Lang.Menus.maze_content_1="";Lang.Menus.maze_content_2="";Lang.Menus.maze_content_3="";Lang.Menus.maze_content_4="";Lang.Menus.maze_content_5="";Lang.Menus.maze_content_6="";Lang.Menus.maze_content_7="";Lang.Menus.maze_content_8="";Lang.Menus.maze_content_9="";Lang.Menus.maze_content_10="";Lang.Menus.maze_content_11="";Lang.Menus.maze_content_12="";Lang.Menus.maze_content_13="";Lang.Menus.maze_content_14="";Lang.Menus.maze_content_15="";Lang.Menus.maze_content_16="";Lang.Menus.maze_content_17="";Lang.Menus.maze_content_18="";Lang.Menus.maze_content_19="";Lang.Menus.maze_content_20="";Lang.Menus.ai_content_1="";Lang.Menus.ai_content_2="";Lang.Menus.ai_content_3="";Lang.Menus.ai_content_4="";Lang.Menus.ai_content_5="";Lang.Menus.ai_content_6="";Lang.Menus.ai_content_7="";Lang.Menus.ai_content_8="";Lang.Menus.ai_content_9="";Lang.Menus.ai_content_10="";Lang.Menus.maze_hints_title_1="";Lang.Menus.maze_hints_content_1="";Lang.Menus.maze_hints_detail_1="";Lang.Menus.maze_hints_title_2="";Lang.Menus.maze_hints_content_2="";Lang.Menus.maze_hints_detail_2="";Lang.Menus.maze_hints_title_3="";Lang.Menus.maze_hints_content_3="";Lang.Menus.maze_hints_detail_3="";Lang.Menus.maze_hints_title_4="";Lang.Menus.maze_hints_content_4="";Lang.Menus.maze_hints_detail_4="";Lang.Menus.maze_hints_title_5="";Lang.Menus.maze_hints_content_5="";Lang.Menus.maze_hints_detail_5="";Lang.Menus.maze_hints_title_6="";Lang.Menus.maze_hints_content_6="";Lang.Menus.maze_hints_detail_6="";Lang.Menus.maze_hints_title_7="";Lang.Menus.maze_hints_content_7="";Lang.Menus.maze_hints_detail_7="";Lang.Menus.maze_hints_title_8="";Lang.Menus.maze_hints_content_8="";Lang.Menus.maze_hints_detail_8="";Lang.Menus.ai_hints_title_1_1="";Lang.Menus.ai_hints_content_1_1="";Lang.Menus.ai_hints_detail_1_1="";Lang.Menus.ai_hints_title_1_2="";Lang.Menus.ai_hints_content_1_2="";Lang.Menus.ai_hints_detail_1_2="";Lang.Menus.ai_hints_title_1_3="";Lang.Menus.ai_hints_content_1_3="";Lang.Menus.ai_hints_detail_1_3="";Lang.Menus.ai_hints_title_2_1="";Lang.Menus.ai_hints_content_2_1="";Lang.Menus.ai_hints_detail_2_1="";Lang.Menus.ai_hints_title_2_2="";Lang.Menus.ai_hints_content_2_2="";Lang.Menus.ai_hints_detail_2_2="";Lang.Menus.ai_hints_content_3_1="";Lang.Menus.ai_hints_title_3_2="";Lang.Menus.ai_hints_content_3_2="";Lang.Menus.ai_hints_detail_3_2="";Lang.Menus.ai_hints_content_4_1="";Lang.Menus.ai_hints_detail_4_1="";Lang.Menus.ai_hints_title_4_2="";Lang.Menus.ai_hints_content_4_2="";Lang.Menus.ai_hints_detail_4_2="";Lang.Menus.ai_hints_title_4_3="";Lang.Menus.ai_hints_content_4_3="";Lang.Menus.ai_hints_detail_4_3="";Lang.Menus.ai_hints_content_5_1="";Lang.Menus.ai_hints_detail_5_1="";Lang.Menus.ai_hints_title_5_2="";Lang.Menus.ai_hints_content_5_2="";Lang.Menus.ai_hints_detail_5_2="";Lang.Menus.ai_hints_title_6_1="";Lang.Menus.ai_hints_content_6_1="";Lang.Menus.ai_hints_detail_6_1="";Lang.Menus.ai_hints_content_7_1="";Lang.Menus.ai_hints_detail_7_1="";Lang.Menus.ai_hints_title_7_2="";Lang.Menus.ai_hints_content_7_2="";Lang.Menus.ai_hints_detail_7_2="";Lang.Menus.ai_hints_content_8_1="";Lang.Menus.ai_hints_detail_8_1="";Lang.Menus.ai_hints_title_8_2="";Lang.Menus.ai_hints_content_8_2="";Lang.Menus.ai_hints_detail_8_2="";Lang.Menus.ai_hints_content_9_1="";Lang.Menus.ai_hints_detail_9_1="";Lang.Menus.ai_hints_title_9_2="";Lang.Menus.ai_hints_content_9_2="";Lang.Menus.ai_hints_detail_9_2="";Lang.Menus.maze_text_goal_1="";Lang.Menus.maze_text_goal_2="";Lang.Menus.maze_text_goal_3="";Lang.Menus.maze_text_goal_4="";Lang.Menus.maze_text_goal_5="";Lang.Menus.maze_text_goal_6="";Lang.Menus.maze_text_goal_7="";Lang.Menus.maze_text_goal_8="";Lang.Menus.maze_text_goal_9="";Lang.Menus.maze_text_goal_10="";Lang.Menus.maze_text_goal_11="";Lang.Menus.maze_text_goal_12="";Lang.Menus.maze_text_goal_13="";Lang.Menus.maze_text_goal_14="";Lang.Menus.maze_text_goal_15="";Lang.Menus.maze_text_goal_16="";Lang.Menus.maze_text_goal_17="";Lang.Menus.maze_text_goal_18="";Lang.Menus.maze_text_goal_19="";Lang.Menus.maze_text_goal_20="";Lang.Menus.above_radar="";Lang.Menus.bottom_radar="";Lang.Menus.front_radar="";Lang.Menus.above_object="";Lang.Menus.front_object="";Lang.Menus.object_below="";Lang.Menus.destination="";Lang.Menus.asteroids="";Lang.Menus.item="";Lang.Menus.wall="";Lang.Menus.buy_now="";Lang.Menus.goals="";Lang.Menus.instructions="";Lang.Menus.object_info="";Lang.Menus.entry_basic_mission="";Lang.Menus.entry_application_mission="";Lang.Menus.maze_move_forward="";Lang.Menus.maze_when_run="";Lang.Menus.maze_turn_left="";Lang.Menus.maze_turn_right="";Lang.Menus.maze_repeat_times_1="";Lang.Menus.maze_repeat_times_2="";Lang.Menus.maze_repeat_until_1="";Lang.Menus.maze_repeat_until_2="";Lang.Menus.maze_call_function="";Lang.Menus.maze_function="";Lang.Menus.maze_repeat_until_all_1="";Lang.Menus.maze_repeat_until_all_2="";Lang.Menus.command_guide="";Lang.Menus.ai_success_msg_1="";Lang.Menus.ai_success_msg_2="";Lang.Menus.ai_success_msg_3="";Lang.Menus.ai_success_msg_4="";Lang.Menus.ai_cause_msg_1="";Lang.Menus.ai_cause_msg_2="";Lang.Menus.ai_cause_msg_3="";Lang.Menus.ai_cause_msg_4="";Lang.Menus.ai_move_forward="";Lang.Menus.ai_move_above="";Lang.Menus.ai_move_under="";Lang.Menus.ai_repeat_until_dest="";Lang.Menus.ai_if_front_1="";Lang.Menus.ai_if_front_2="";Lang.Menus.ai_else="";Lang.Menus.ai_if_1="";Lang.Menus.ai_if_2="";Lang.Menus.ai_use_item="";Lang.Menus.ai_radar="";Lang.Menus.ai_above="";Lang.Menus.ai_front="";Lang.Menus.ai_under="";Lang.Menus.ai_object_is_1="";Lang.Menus.ai_object_is_2="";Lang.Menus.challengeMission="";Lang.Menus.withTeacher="";Lang.Menus.host="";Lang.Menus.support="";Lang.Menus.subjectivity="";Lang.Menus.learnMore="";Lang.Menus.ai_object_is_3="";Lang.Menus.stage_is_not_available="";Lang.Menus.progress_not_saved="";Lang.Menus.want_refresh="";Lang.Blocks.copy_block="";Lang.Blocks.delete_block="";Lang.Blocks.tidy_up_block="";Lang.Menus.monthly_entry_grade="";Lang.Menus.monthly_entry_contents="";Lang.Menus.monthly_entry_etc1="";Lang.Menus.monthly_entry_etc2="";Lang.Blocks.block_hi="";Lang.Blocks.entry_bot_name="";Lang.Blocks.hi_entry="";Lang.Blocks.bark_dog="";Lang.Blocks.walking_entryBot="";Lang.Blocks.entry="";Lang.Blocks.hello="";Lang.Blocks.nice="";Lang.Menus.group_make_lecture_1="";Lang.Menus.group_make_lecture_2="";Lang.Menus.group_make_lecture_3="";Lang.Menus.group_make_lecture_4="";Lang.Menus.group_add_lecture_1="";Lang.Menus.group_add_lecture_2="";Lang.Menus.group_add_lecture_3="";Lang.Menus.group_add_lecture_4="";Lang.Menus.group_make_course_1="";Lang.Menus.group_make_course_2="";Lang.Menus.group_make_course_3="";Lang.Menus.group_make_course_4="";Lang.Menus.group_add_course_1="";Lang.Menus.group_add_course_2="";Lang.Menus.group_add_course_3="";Lang.Menus.group_add_course_4="";Lang.Menus.people="";Lang.Menus.all="";Lang.Menus.life="";Lang.Menus.nature="";Lang.Menus.animal_insect="";Lang.Menus.environment="";Lang.Menus.things="";Lang.Menus.vehicles="";Lang.Menus.others="";Lang.Menus.fantasy="";Lang.Menus.instrument="";Lang.Menus.piano="";Lang.Menus.marimba="";Lang.Menus.drum="";Lang.Menus.janggu="";Lang.Menus.sound_effect="";Lang.Menus.others_instrument="";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var EntryStatic={};EntryStatic.objectTypes=["sprite","textBox"];EntryStatic.usageList=['usage_event','usage_signal','usage_scene','usage_repeat','usage_condition_repeat','usage_condition','usage_clone','usage_arrow_move','usage_rotation','usage_coordinate','usage_shape','usage_speak','usage_picture_effect','usage_textBox','usage_draw','usage_sound','usage_confirm','usage_comp_operation','usage_logical_operation','usage_math_operation','usage_random','usage_timer','usage_variable','usage_list','usage_ask_answer','usage_function','usage_arduino'];EntryStatic.conceptList=['concept_resource_analytics','concept_individual','concept_abstractive','concept_procedual','concept_automation','concept_simulation','concept_parallel'];EntryStatic.subjectList=['subject_korean','subject_mathmatics','subject_social','subject_science','subject_english','subject_courtesy','subject_music','subject_paint','subject_athletic','subject_progmatic'];EntryStatic.lectureLevels=[1,2,3];// EntryStatic.lectureLevels = ['level_high', 'level_mid','level_row'];
	EntryStatic.lectureGrades=['e_1','e_2','e_3','e_4','e_5','e_6','m_1','m_2','m_3','general'];EntryStatic.categoryList=['category_game','category_animation','category_media_art','category_physical','category_etc'];EntryStatic.requiredTimes=[1,2,3,4,5];EntryStatic.searchProjectOption=[{'key':'search_updated','lang':'search_updated','value':'updated'},{'key':'search_recent','lang':'search_recent','value':'recent'},{'key':'search_complexity','lang':'search_complexity','value':'complexity'},{'key':'search_staffPicked','lang':'search_staffPicked','value':'staffPicked'},{'key':'search_childCnt','lang':'search_childCnt','value':'childCnt'},{'key':'search_likeCnt','lang':'search_likeCnt','value':'likeCnt'}];EntryStatic.getAllBlocks=function(){return[{category:"start",blocks:["when_run_button_click","when_some_key_pressed","mouse_clicked","mouse_click_cancled","when_object_click","when_object_click_canceled","when_message_cast","message_cast","message_cast_wait","when_scene_start","start_scene","start_neighbor_scene"]},{category:"flow",blocks:["wait_second","repeat_basic","repeat_inf","repeat_while_true","stop_repeat","_if","if_else","wait_until_true","stop_object","restart_project","when_clone_start","create_clone","delete_clone","remove_all_clones"]},{category:"moving",blocks:["move_direction","bounce_wall","move_x","move_y","move_xy_time","locate_x","locate_y","locate_xy","locate_xy_time","locate","locate_object_time","rotate_relative","direction_relative","rotate_by_time","direction_relative_duration","rotate_absolute","direction_absolute","see_angle_object","move_to_angle"]},{category:"looks",blocks:["show","hide","dialog_time","dialog","remove_dialog","change_to_some_shape","change_to_next_shape","add_effect_amount","change_effect_amount","erase_all_effects","change_scale_size","set_scale_size","flip_x","flip_y","change_object_index"]},{category:"brush",blocks:["brush_stamp","start_drawing","stop_drawing","set_color","set_random_color","change_thickness","set_thickness","change_brush_transparency","set_brush_tranparency","brush_erase_all"]},{category:"text",blocks:["text_write","text_append","text_prepend","text_flush"]},{category:"sound",blocks:["sound_something_with_block","sound_something_second_with_block","sound_from_to","sound_something_wait_with_block","sound_something_second_wait_with_block","sound_from_to_and_wait","sound_volume_change","sound_volume_set","sound_silent_all"]},{category:"judgement",blocks:["is_clicked","is_press_some_key","reach_something","boolean_basic_operator","boolean_and","boolean_or","boolean_not"]},{category:"calc",blocks:["calc_basic","calc_rand","coordinate_mouse","coordinate_object","get_sound_volume","quotient_and_mod","calc_operation","get_project_timer_value","choose_project_timer_action","set_visible_project_timer","get_date","distance_something","get_sound_duration","length_of_string","combine_something","char_at","substring","index_of_string","replace_string","change_string_case"]},{category:"variable",blocks:["variableAddButton","listAddButton","ask_and_wait","get_canvas_input_value","set_visible_answer","get_variable","change_variable","set_variable","show_variable","hide_variable","value_of_index_from_list","add_value_to_list","remove_value_from_list","insert_value_to_list","change_value_list_index","length_of_list","is_included_in_list","show_list","hide_list"]},{category:"func",blocks:["functionAddButton"]},{category:"arduino",blocks:["arduino_download_connector","arduino_download_source","arduino_connected","arduino_reconnect","arduino_get_number_sensor_value","arduino_get_digital_value","arduino_toggle_led","arduino_toggle_pwm","arduino_convert_scale",//joystick
	"joystick_get_number_sensor_value","joystick_get_digital_value","joystick_toggle_led","joystick_toggle_pwm","joystick_convert_scale",//dplay
	"dplay_get_number_sensor_value","dplay_get_value","dplay_get_gas_sensor_value","dplay_get_dust_sensor_value","dplay_get_CO2_sensor_value","dplay_convert_scale","dplay_get_digital_value","dplay_get_switch_status","dplay_get_tilt","dplay_toggle_led","dplay_toggle_pwm","dplay_select_led","dplay_DCmotor","dplay_DCmotor_speed","dplay_buzzer","dplay_servo","dplay_Robot_run","dplay_Robot_run_sec","dplay_robot_speed_sel","dplay_robot_speed_set","dplay_robot_stop",//nemoino
	"nemoino_get_named_sensor_value","nemoino_get_sound_status","nemoino_is_button_pressed","nemoino_get_accelerometer_direction","nemoino_get_accelerometer_value","nemoino_get_number_sensor_value","nemoino_get_digital_value","nemoino_toggle_led","nemoino_toggle_pwm","nemoino_convert_scale",//neobot
	"neobot_sensor_value","neobot_sensor_convert_scale","neobot_left_motor","neobot_stop_left_motor","neobot_right_motor","neobot_stop_right_motor","neobot_all_motor","neobot_stop_all_motor","neobot_set_servo","neobot_set_output","neobot_set_fnd","neobot_set_fnd_off","neobot_play_note_for","bitbrick_sensor_value","bitbrick_convert_scale","bitbrick_is_touch_pressed","bitbrick_turn_off_color_led","bitbrick_turn_on_color_led_by_rgb","bitbrick_turn_on_color_led_by_picker","bitbrick_turn_on_color_led_by_value","bitbrick_buzzer","bitbrick_turn_off_all_motors","bitbrick_dc_speed","bitbrick_dc_direction_speed","bitbrick_servomotor_angle","hamster_hand_found","hamster_value","hamster_move_forward_once","hamster_turn_once","hamster_move_forward_for_secs","hamster_move_backward_for_secs","hamster_turn_for_secs","hamster_change_both_wheels_by","hamster_set_both_wheels_to","hamster_change_wheel_by","hamster_set_wheel_to","hamster_follow_line_using","hamster_follow_line_until","hamster_set_following_speed_to","hamster_stop","hamster_set_led_to","hamster_clear_led","hamster_beep","hamster_change_buzzer_by","hamster_set_buzzer_to","hamster_clear_buzzer","hamster_play_note_for","hamster_rest_for","hamster_change_tempo_by","hamster_set_tempo_to","hamster_set_port_to","hamster_change_output_by","hamster_set_output_to","albert_hand_found","albert_value","albert_move_forward_for_secs","albert_move_backward_for_secs","albert_turn_for_secs","albert_change_both_wheels_by","albert_set_both_wheels_to","albert_change_wheel_by","albert_set_wheel_to","albert_stop","albert_set_pad_size_to","albert_set_eye_to","albert_clear_eye","albert_body_led","albert_front_led","albert_beep","albert_change_buzzer_by","albert_set_buzzer_to","albert_clear_buzzer","albert_play_note_for","albert_rest_for","albert_change_tempo_by","albert_set_tempo_to",//sensorBoard
	"sensorBoard_get_named_sensor_value","sensorBoard_is_button_pressed","sensorBoard_led","sensorBoard_get_number_sensor_value","sensorBoard_get_digital_value","sensorBoard_toggle_led","sensorBoard_toggle_pwm","sensorBoard_convert_scale",//CODEino
	"CODEino_get_named_sensor_value","CODEino_get_sound_status","CODEino_get_light_status","CODEino_is_button_pressed","CODEino_get_accelerometer_direction","CODEino_get_accelerometer_value","CODEino_get_number_sensor_value","CODEino_get_digital_value","CODEino_toggle_led","CODEino_toggle_pwm","CODEino_convert_scale","robotis_openCM70_sensor_value","robotis_openCM70_aux_sensor_value","robotis_openCM70_cm_buzzer_index","robotis_openCM70_cm_buzzer_melody","robotis_openCM70_cm_sound_detected_clear","robotis_openCM70_cm_led","robotis_openCM70_cm_motion","robotis_openCM70_aux_motor_speed","robotis_openCM70_aux_servo_mode","robotis_openCM70_aux_servo_speed","robotis_openCM70_aux_servo_position","robotis_openCM70_aux_led_module","robotis_openCM70_aux_custom","robotis_openCM70_cm_custom_value","robotis_openCM70_cm_custom","robotis_carCont_sensor_value","robotis_carCont_cm_led","robotis_carCont_cm_sound_detected_clear","robotis_carCont_aux_motor_speed","robotis_carCont_cm_calibration",//XBOT Blocks added
	"xbot_analogValue","xbot_digitalInput","xbot_digitalOutput","xbot_analogOutput","xbot_rgb","xbot_rgb_picker","xbot_buzzer","xbot_servo","xbot_oneWheel","xbot_twoWheel","xbot_lcd",//end of XBOT Blocks added
	// ardublock Added 2016-06-01
	"ardublock_get_number_sensor_value","ardublock_get_digital_value","ardublock_toggle_led","ardublock_toggle_pwm","ardublock_convert_scale"// ardublock Added 2016-06-01
	]}];};EntryStatic.blockInfo={//XBOT Blocks added
	"xbot_servo":{"isNotFor":['xbot_epor_edge'],"xml":"<block type='xbot_servo'><value name='VALUE'><block type='text'><field name='NAME'>90</field></block></value></block>","class":"xbot_motor"},"xbot_rgb":{"isNotFor":['xbot_epor_edge'],"xml":"<block type='xbot_rgb'><value name='ledR'><block type='text'><field name='NAME'>255</field></block></value><value name='ledG'><block type='text'><field name='NAME'>255</field></block></value><value name='ledB'><block type='text'><field name='NAME'>255</field></block></value></block>","class":"xbot_rgb"},"xbot_rgb_picker":{"isNotFor":['xbot_epor_edge'],"xml":"<block type='xbot_rgb_picker'></block>","class":"xbot_rgb"},"xbot_lcd":{"isNotFor":["xbot_epor_edge"],"xml":"<block type='xbot_lcd'><value name='VALUE'><block type='text'><field name='NAME'>Hello</field></block></value></block>","class":"xbot_sensor"},"xbot_oneWheel":{"isNotFor":["xbot_epor_edge"],"xml":"<block type='xbot_oneWheel'><value name='VALUE'><block type='text'><field name='NAME'>0</field></block></value></block>","class":"xbot_motor"},"xbot_twoWheel":{"isNotFor":["xbot_epor_edge"],"xml":"<block type='xbot_twoWheel'><value name='rightWheel'><block type='text'><field name='NAME'>0</field></block></value><value name='leftWheel'><block type='text'><field name='NAME'>0</field></block></value></block>","class":"xbot_motor"},"xbot_buzzer":{"isNotFor":['xbot_epor_edge'],"xml":"<block type='xbot_buzzer'><field name='OCTAVE'>4</field><value name='VALUE'><block type='text'><field name='NAME'>0.5</field></block></value></block>","class":"xbot_sensor"},"xbot_digitalOutput":{"isNotFor":["xbot_epor_edge"],"xml":"<block type='xbot_digitalOutput'></block>","class":"xbot_sensor"},"xbot_digitalInput":{"isNotFor":["xbot_epor_edge"],"xml":"<block type='xbot_digitalInput'></block>","class":"xbot_sensor"},"xbot_analogValue":{"isNotFor":["xbot_epor_edge"],"xml":"<block type='xbot_analogValue'></block>","class":"xbot_sensor"},"xbot_analogOutput":{"isNotFor":["xbot_epor_edge"],"xml":"<block type='xbot_analogOutput'><value name='VALUE'><block type='text'><field name='NAME'>255</field></block></value></block>","class":"xbot_sensor"},//end of XBOT Blocks added
	"when_run_button_click":{"xml":"<block type='when_run_button_click'></block>","class":"event","isNotFor":[],"usage":["start"]},"when_some_key_pressed":{"xml":"<block type='when_some_key_pressed'><field name='VALUE'>67</field></block>","class":"event","isNotFor":[],"usage":["start"]},"mouse_clicked":{"xml":"<block type='mouse_clicked'></block>","class":"event","isNotFor":[],"usage":["start"]},"mouse_click_cancled":{"xml":"<block type='mouse_click_cancled'></block>","class":"event","isNotFor":[],"usage":["start"]},"when_object_click":{"xml":"<block type='when_object_click'></block>","class":"event","isNotFor":[],"usage":["start"]},"when_object_click_canceled":{"xml":"<block type='when_object_click_canceled'></block>","class":"event","isNotFor":[],"usage":["start"]},"when_message_cast":{"xml":"<block type='when_message_cast'></block>","class":"message","isNotFor":["message"],"usage":["start","message"]},"message_cast":{"xml":"<block type='message_cast'></block>","class":"message","isNotFor":["message"],"usage":["start","message"]},"message_cast_wait":{"xml":"<block type='message_cast_wait'></block>","class":"message","isNotFor":["message"],"usage":["start","message"]},"when_scene_start":{"xml":"<block type='when_scene_start'></block>","class":"scene","isNotFor":["scene"],"usage":["scene"]},"start_scene":{"xml":"<block type='start_scene'></block>","class":"scene","isNotFor":["scene"],"usage":["scene"]},"start_neighbor_scene":{"xml":"<block type='start_neighbor_scene'></block>","class":"scene","isNotFor":["scene"],"usage":["scene"]},"wait_second":{"xml":"<block type='wait_second'><value name='SECOND'><block type='number'><field name='NUM'>2</field></block></value></block>","class":"delay","isNotFor":[],"description":"설정한 시간만큼 기다린 후 다음 블록을 실행합니다."},"repeat_basic":{"xml":"<block type='repeat_basic'><value name='VALUE'><block type='number'><field name='NUM'>10</field></block></value></block>","class":"repeat","isNotFor":[],"usage":["repeat"]},"repeat_inf":{"xml":"<block type='repeat_inf'></block>","class":"repeat","isNotFor":[],"usage":["repeat"]},"repeat_while_true":{"xml":"<block type='repeat_while_true'><value name='BOOL'><block type='True'></block> </value> </block>","class":"repeat","isNotFor":[],"usage":["repeat","condition"]},"stop_repeat":{"xml":"<block type='stop_repeat'></block>","class":"repeat","isNotFor":[],"usage":["repeat"]},"_if":{"xml":"<block type='_if'> <value name='BOOL'> <block type='True'></block> </value> </block>","class":"condition","isNotFor":[],"usage":["condition"]},"if_else":{"xml":"<block type='if_else'> <value name='BOOL'> <block type='True'></block> </value> </block>","class":"condition","isNotFor":[],"usage":["condition"]},"restart_project":{"xml":"<block type='restart_project'></block>","class":"terminate","isNotFor":[],"description":"모든 오브젝트들을 처음부터 다시 실행합니다."},"stop_object":{"xml":"<block type='stop_object'></block>","class":"terminate","isNotFor":[],"description":"모든 오브젝트 : 모든 오브젝트들이 즉시 실행을 멈춥니다.<br>이 블록 : 이 블록과 연결된 모든 블록들이 즉시 실행을 멈춥니다.<br>이 오브젝트 : 해당 오브젝트의 모든 블록들을 멈춥니다.<br>이 오브젝트의 다른 블록 : 해당 오브젝트 중 이 블록과 연결된 블록은 멈추지 않고 다른 블록들은 멈추게 됩니다."},"wait_until_true":{"xml":"<block type='wait_until_true'> <value name='BOOL'> <block type='True'></block> </value> </block>","class":"wait","isNotFor":[],"usage":["condition"]},"when_clone_start":{"xml":"<block type='when_clone_start'></block>","class":"clone","isNotFor":[],"usage":["clone"]},"create_clone":{"xml":"<block type='create_clone'></block>","class":"clone","isNotFor":[],"usage":["clone"]},"delete_clone":{"xml":"<block type='delete_clone'></block>","class":"clone","isNotFor":[],"usage":["clone"]},"remove_all_clones":{"xml":"<block type='remove_all_clones'></block>","class":"clone","isNotFor":[],"usage":["clone"]},"move_direction":{"xml":"<block type='move_direction'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"walk","isNotFor":[],"usage":["moving_direction"]},"move_x":{"xml":"<block type='move_x'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"move_relative","isNotFor":[],"usage":["coordinate"]},"move_y":{"xml":"<block type='move_y'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"move_relative","isNotFor":[],"usage":["coordinate"]},"move_xy_time":{"xml":"<block type='move_xy_time'><value name='VALUE1'><block type='number'><field name='NUM'>2</field></block></value><value name='VALUE2'><block type='number'><field name='NUM'>10</field></block></value><value name='VALUE3'><block type='number'><field name='NUM'>10</field></block></value></block>","class":"move_relative","isNotFor":[],"usage":["coordinate"]},"locate_object_time":{"xml":"<block type='locate_object_time'><value name='VALUE'><block type='number'><field name='NUM'>2</field></block></value></block>","class":"move_absolute","isNotFor":[],"usage":["coordinate"]},"locate_x":{"xml":"<block type='locate_x'><value name='VALUE'><block type='number'><field name='NUM'>10</field></block></value></block>","class":"move_absolute","isNotFor":[],"usage":["coordinate"]},"locate_y":{"xml":"<block type='locate_y'><value name='VALUE'><block type='number'><field name='NUM'>10</field></block></value></block>","class":"move_absolute","isNotFor":[],"usage":["coordinate"]},"locate_xy":{"xml":"<block type='locate_xy'><value name='VALUE1'><block type='number'><field name='NUM'>0</field></block></value><value name='VALUE2'><block type='number'><field name='NUM'>0</field></block></value></block>","class":"move_absolute","isNotFor":[],"usage":["coordinate"]},"locate_xy_time":{"xml":"<block type='locate_xy_time'><value name='VALUE1'><block type='number'><field name='NUM'>2</field></block></value><value name='VALUE2'><block type='number'><field name='NUM'>10</field></block></value><value name='VALUE3'><block type='number'><field name='NUM'>10</field></block></value></block>","class":"move_absolute","isNotFor":[],"usage":["coordinate"]},"locate":{"xml":"<block type='locate'></block>","class":"move_absolute","isNotFor":[],"usage":["coordinate"]},"rotate_absolute":{"xml":"<block type='rotate_absolute'> <value name='VALUE'> <block type='angle'></block> </value> </block>","class":"rotate_absolute","isNotFor":[],"usage":["direction"]},"rotate_by_time":{"xml":"<block type='rotate_by_time'> <value name='VALUE'> <block type='number'><field name='NUM'>2</field></block> </value> <value name='ANGLE'> <block type='angle'></block> </value> </block>","class":"rotate","isNotFor":[],"usage":["direction"]},"rotate_relative":{"xml":"<block type='rotate_relative'> <value name='VALUE'> <block type='angle'></block> </value> </block>","class":"rotate","isNotFor":[],"usage":["direction"]},"direction_absolute":{"xml":"<block type='direction_absolute'> <value name='VALUE'> <block type='angle'></block> </value> </block>","class":"rotate_absolute","isNotFor":[],"usage":["direction"]},"direction_relative":{"xml":"<block type='direction_relative'> <value name='VALUE'> <block type='angle'></block> </value> </block>","class":"rotate","isNotFor":[],"usage":["direction"]},"move_to_angle":{"xml":"<block type='move_to_angle'> <value name='ANGLE'> <block type='angle'></block> </value> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"move_rotate","isNotFor":[],"usage":["direction"]},"see_angle_object":{"xml":"<block type='see_angle_object'></block>","class":"rotate_absolute","isNotFor":[],"usage":["direction"]},"bounce_wall":{"xml":"<block type='bounce_wall'></block>","class":"walk","isNotFor":[],"usage":["moving_direction"]},"show":{"xml":"<block type='show'></block>","class":"visibility","isNotFor":[],"usage":["shape"]},"hide":{"xml":"<block type='hide'></block>","class":"visibility","isNotFor":[],"usage":["shape"]},"dialog_time":{"xml":"<block type='dialog_time'> <value name='VALUE'> <block type='text'> <field name='NAME'>"+Lang.Blocks.block_hi+"</field> </block> </value> <value name='SECOND'> <block type='number'><field name='NUM'>4</field></block> </value> </block>","class":"say","isNotFor":["textBox"],"usage":["dialog"]},"dialog":{"xml":"<block type='dialog'> <value name='VALUE'> <block type='text'> <field name='NAME'>"+Lang.Blocks.block_hi+"</field> </block> </value> </block>","class":"say","isNotFor":["textBox"],"usage":["dialog"]},"remove_dialog":{"xml":"<block type='remove_dialog'> </block>","class":"say","isNotFor":["textBox"],"usage":["dialog"]},"change_to_some_shape":{"xml":"<block type='change_to_some_shape'> <value name='VALUE'> <block type='get_pictures'> </block> </value> </block>","class":"shape","isNotFor":["textBox"],"usage":["shape"]},"change_to_next_shape":{"xml":"<block type='change_to_next_shape'></block>","class":"shape","isNotFor":["textBox"],"usage":["shape"]},"set_effect_volume":{"xml":"<block type='set_effect_volume'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"effect","isNotFor":["textBox"],"usage":["graphic"]},"set_effect_amount":{"xml":"<block type='set_effect_amount'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"effect","isNotFor":["textBox"],"description":"해당 오브젝트에 선택한 효과를 입력한 값만큼 줍니다."},"set_effect":{"xml":"<block type='set_effect'> <value name='VALUE'> <block type='number'><field name='NUM'>100</field></block> </value> </block>","class":"effect","isNotFor":["textBox"],"usage":["graphic"]},"set_entity_effect":{"xml":"<block type='set_entity_effect'> <value name='VALUE'> <block type='number'><field name='NUM'>100</field></block> </value> </block>","class":"effect","isNotFor":["textBox"],"description":"해당 오브젝트에 선택한 효과를 입력한 값으로 정합니다."},"add_effect_amount":{"xml":"<block type='add_effect_amount'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"effect","isNotFor":["textBox"],"usage":["graphic"]},"change_effect_amount":{"xml":"<block type='change_effect_amount'> <value name='VALUE'> <block type='number'><field name='NUM'>100</field></block> </value> </block>","class":"effect","isNotFor":["textBox"],"usage":["graphic"]},"erase_all_effects":{"xml":"<block type='erase_all_effects'></block>","class":"effect","isNotFor":["textBox"],"usage":["graphic"]},"change_scale_percent":{"xml":"<block type='change_scale_percent'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"scale","isNotFor":[],"usage":["graphic"]},"set_scale_percent":{"xml":"<block type='set_scale_percent'> <value name='VALUE'> <block type='number'><field name='NUM'>100</field></block> </value> </block>","class":"scale","isNotFor":[],"usage":["graphic"]},"change_scale_size":{"xml":"<block type='change_scale_size'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"scale","isNotFor":[],"usage":["graphic"]},"set_scale_size":{"xml":"<block type='set_scale_size'> <value name='VALUE'> <block type='number'><field name='NUM'>100</field></block> </value> </block>","class":"scale","isNotFor":[],"usage":["graphic"]},"flip_x":{"xml":"<block type='flip_x'></block>","class":"flip","isNotFor":[],"usage":["graphic"]},"flip_y":{"xml":"<block type='flip_y'></block>","class":"flip","isNotFor":[],"usage":["graphic"]},"set_object_order":{"xml":"<block type='set_object_order'></block>","class":"z-index","isNotFor":[],"usage":["graphic"]},"change_object_index":{"xml":"<block type='change_object_index'></block>","class":"z-index","isNotFor":[],"usage":["graphic"]},"brush_stamp":{"xml":"<block type='brush_stamp'></block>","class":"stamp","isNotFor":["textBox"],"usage":["brush"]},"start_drawing":{"xml":"<block type='start_drawing'></block>","class":"brush_control","isNotFor":["textBox"],"usage":["brush"]},"stop_drawing":{"xml":"<block type='stop_drawing'></block>","class":"brush_control","isNotFor":["textBox"],"usage":["brush"]},"set_color":{"xml":"<block type='set_color'></block>","class":"brush_color","isNotFor":["textBox"],"usage":["brush"]},"set_random_color":{"xml":"<block type='set_random_color'></block>","class":"brush_color","isNotFor":["textBox"],"usage":["brush"]},"change_thickness":{"xml":"<block type='change_thickness'> <value name='VALUE'> <block type='number'><field name='NUM'>1</field></block> </value> </block>","class":"brush_thickness","isNotFor":["textBox"],"usage":["brush"]},"set_thickness":{"xml":"<block type='set_thickness'> <value name='VALUE'> <block type='number'><field name='NUM'>1</field></block> </value> </block>","class":"brush_thickness","isNotFor":["textBox"],"usage":["brush"]},"change_opacity":{"xml":"<block type='change_opacity'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"brush_opacity","isNotFor":["textBox"],"usage":["brush"]},"change_brush_transparency":{"xml":"<block type='change_brush_transparency'> <value name='VALUE'><block type='number'><field name='NUM'>10</field></block> </value></block>","class":"brush_opacity","isNotFor":["textBox"],"usage":["brush"]},"set_opacity":{"xml":"<block type='set_opacity'> <value name='VALUE'> <block type='number'><field name='NUM'>50</field></block> </value> </block>","class":"brush_opacity","isNotFor":["textBox"],"usage":["brush"]},"set_brush_tranparency":{"xml":"<block type='set_brush_tranparency'> <value name='VALUE'> <block type='number'><field name='NUM'>50</field></block> </value> </block>","class":"brush_opacity","isNotFor":["textBox"],"usage":["brush"]},"brush_erase_all":{"xml":"<block type='brush_erase_all'></block>","class":"brush_clear","isNotFor":["textBox"],"usage":["brush"]},"sound_something_with_block":{"xml":"<block type='sound_something_with_block'><value name='VALUE'><block type='get_sounds'></block></value></block>","class":"sound_play","isNotFor":[],"description":"해당 오브젝트가 선택한 소리를 재생하는 동시에 다음 블록을 실행합니다."},"sound_something_second_with_block":{"xml":"<block type='sound_something_second_with_block'><value name='VALUE'><block type='get_sounds'></block></value><value name='SECOND'><block type='number'><field name='NUM'>1</field></block></value></block>","class":"sound_play","isNotFor":[],"usage":["sound"]},"sound_something_wait_with_block":{"xml":"<block type='sound_something_wait_with_block'><value name='VALUE'><block type='get_sounds'></block></value></block>","class":"sound_wait","isNotFor":[],"usage":["sound"]},"sound_something_second_wait_with_block":{"xml":"<block type='sound_something_second_wait_with_block'><value name='VALUE'><block type='get_sounds'></block></value><value name='SECOND'><block type='number'><field name='NUM'>1</field></block></value></block>","class":"sound_wait","isNotFor":[],"usage":["sound"]},"sound_volume_change":{"xml":"<block type='sound_volume_change'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"sound_volume","isNotFor":[],"usage":["sound"]},"sound_volume_set":{"xml":"<block type='sound_volume_set'> <value name='VALUE'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"sound_volume","isNotFor":[],"usage":["sound"]},"sound_silent_all":{"xml":"<block type='sound_silent_all'></block>","class":"sound_stop","isNotFor":[],"usage":["sound"]},"is_clicked":{"xml":"<block type='is_clicked'></block>","class":"boolean_input","isNotFor":[],"usage":["judgement"]},"is_press_some_key":{"xml":"<block type='is_press_some_key'></block>","class":"boolean_input","isNotFor":[],"usage":["judgement"]},"reach_something":{"xml":"<block type='reach_something'></block>","class":"boolean_collision","isNotFor":[],"usage":["judgement"]},"is_included_in_list":{"xml":"<block type='is_included_in_list'> <value name='DATA'> <block type='text'> <field name='NAME'>10</field> </block> </value> </block>","class":"list","isNotFor":["list","listNotExist"],"usage":["list"]},"boolean_basic_operator":{"xml":"<block type='boolean_basic_operator'> <value name='LEFTHAND'> <block type='text'><field name='NAME'>10</field></block> </value><field name='OPERATOR'>EQUAL</field>  <value name='RIGHTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> </block>","xmls":["<block type='boolean_basic_operator'> <field name='OPERATOR'>EQUAL</field> <value name='LEFTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> <value name='RIGHTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> </block>","<block type='boolean_basic_operator'> <field name='OPERATOR'>GREATER</field> <value name='LEFTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> <value name='RIGHTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> </block>","<block type='boolean_basic_operator'> <field name='OPERATOR'>LESS</field> <value name='LEFTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> <value name='RIGHTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> </block>","<block type='boolean_basic_operator'> <field name='OPERATOR'>GREATER_OR_EQUAL</field> <value name='LEFTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> <value name='RIGHTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> </block>","<block type='boolean_basic_operator'> <field name='OPERATOR'>LESS_OR_EQUAL</field> <value name='LEFTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> <value name='RIGHTHAND'> <block type='text'><field name='NAME'>10</field></block> </value> </block>"],"class":"boolean_compare","isNotFor":[],"usage":["compute_compare"]},"boolean_and":{"xml":"<block type='boolean_and'> <value name='LEFTHAND'> <block type='True'></block> </value> <value name='RIGHTHAND'> <block type='True'></block> </value> </block>","class":"boolean","isNotFor":[],"usage":["compute_logical"]},"boolean_or":{"xml":"<block type='boolean_or'> <value name='LEFTHAND'> <block type='True'></block> </value> <value name='RIGHTHAND'> <block type='False'></block> </value> </block>","class":"boolean","isNotFor":[],"usage":["compute_logical"]},"boolean_not":{"xml":"<block type='boolean_not'> <value name='VALUE'> <block type='True'></block> </value> </block>","class":"boolean","isNotFor":[],"usage":["compute_logical"]},"calc_basic":{"xml":"<block type='calc_basic'> <field name='OPERATOR'>PLUS</field> <value name='LEFTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> <value name='RIGHTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","xmls":["<block type='calc_basic'> <field name='OPERATOR'>PLUS</field> <value name='LEFTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> <value name='RIGHTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","<block type='calc_basic'> <field name='OPERATOR'>MINUS</field> <value name='LEFTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> <value name='RIGHTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","<block type='calc_basic'> <field name='OPERATOR'>MULTI</field> <value name='LEFTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> <value name='RIGHTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","<block type='calc_basic'> <field name='OPERATOR'>DIVIDE</field> <value name='LEFTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> <value name='RIGHTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> </block>"],"class":"calc","isNotFor":[],"usage":["calculation"]},"calc_rand":{"xml":"<block type='calc_rand'> <value name='LEFTHAND'> <block type='number'><field name='NUM'>0</field></block> </value> <value name='RIGHTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"calc","isNotFor":[],"usage":["calc"]},"get_x_coordinate":{"xml":"<block type='get_x_coordinate'></block>","class":"calc","isNotFor":[],"description":"해당 오브젝트의 x 좌표값을 의미합니다."},"get_y_coordinate":{"xml":"<block type='get_y_coordinate'></block>","class":"calc","isNotFor":[],"description":"해당 오브젝트의 y 좌표값을 의미합니다."},"coordinate_mouse":{"xml":"<block type='coordinate_mouse'></block>","class":"calc","isNotFor":[],"description":"마우스의 x 또는 y의 좌표 값을 의미합니다."},"coordinate_object":{"xml":"<block type='coordinate_object'></block>","class":"calc","isNotFor":[],"description":"선택한 오브젝트의 x,y좌표 및 각종 정보(방향, 모양이름 등)를 의미합니다."},"get_rotation_direction":{"xml":"<block type='get_rotation_direction'></block>","class":"calc","isNotFor":[],"description":"해당 오브젝트의 방향값, 이동 방향값을 의미합니다."},"calc_share":{"xml":"<block type='calc_share'> <value name='LEFTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> <value name='RIGHTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"calc","isNotFor":[],"usage":["calculation"]},"calc_mod":{"xml":"<block type='calc_mod'> <value name='LEFTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> <value name='RIGHTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"calc","isNotFor":[],"usage":["calculation"]},"calc_operation":{"xml":"<block type='calc_operation'> <value name='LEFTHAND'> <block type='number'><field name='NUM'>10</field></block> </value> </block>","class":"calc","isNotFor":[],"usage":["calculation"]},"get_date":{"xml":"<block type='get_date'> <field name='VALUE'>YEAR</field> </block>","class":"calc_date","isNotFor":[],"description":"현재 연도, 월, 일, 시각과 같이 시간에 대한 값을 의미합니다."},"distance_something":{"xml":"<block type='distance_something'></block>","class":"calc_distance","isNotFor":[],"description":"해당 오브젝트와 선택한 오브젝트간의 거리를 의미합니다."},"get_sound_duration":{"xml":"<block type='get_sound_duration'></block>","class":"calc_duration","isNotFor":[],"description":"선택한 소리의 길이 값을 의미합니다."},"get_project_timer_value":{"xml":"<block type='get_project_timer_value'></block>","class":"calc_timer","isNotFor":[],"usage":["timer"]},"reset_project_timer":{"xml":"<block type='reset_project_timer'></block>","class":"calc_timer","isNotFor":[],"usage":["timer"]},"set_visible_project_timer":{"xml":"<block type='set_visible_project_timer'><field name='ACTION'>HIDE</field></block>","class":"calc_timer","isNotFor":[],"usage":["timer"]},"variableAddButton":{"xml":"<btn text=\"Lang.Workspace.create_variable_block\" onclick=\"Entry.variableContainer.openVariableAddPanel('variable')\"> </btn>","isNotFor":[],"class":"button"},"listAddButton":{"xml":"<btn text=\"Lang.Workspace.create_list_block\" onclick=\"Entry.variableContainer.openVariableAddPanel('list')\"></btn>","isNotFor":[],"class":"button"},"ask_and_wait":{"xml":"<block type='ask_and_wait'> <value name='VALUE'> <block type='text'> <field name='NAME'>"+Lang.Blocks.block_hi+"</field> </block> </value> </block>","class":"ask","isNotFor":[],"usage":["answer"]},"get_canvas_input_value":{"xml":"<block type='get_canvas_input_value'></block>","class":"ask","isNotFor":[],"usage":["answer"]},"combine_something":{"xml":"<block type='combine_something'> <value name='VALUE1'> <block type='text'> <field name='NAME'>"+Lang.Blocks.block_hi+"</field> </block> </value> <value name='VALUE2'> <block type='text'> <field name='NAME'>"+Lang.Blocks.entry+"</field> </block> </value> </block>","class":"calc_string","isNotFor":[],"description":"입력한 두 개의 문자를 결합합니다."},"get_variable":{"xml":"<block type='get_variable'></block>","class":"variable","isNotFor":["variable","variableNotExist"],"usage":["variable"]},"change_variable":{"xml":"<block type='change_variable'> <value name='VALUE'> <block type='text'> <field name='NAME'>10</field> </block> </value> </block>","class":"variable","isNotFor":["variable","variableNotExist"],"usage":["variable"]},"set_variable":{"xml":"<block type='set_variable'> <value name='VALUE'> <block type='text'> <field name='NAME'>10</field> </block> </value> </block>","class":"variable","isNotFor":["variable","variableNotExist"],"usage":["variable"]},"show_variable":{"xml":"<block type='show_variable'></block>","class":"variable_visibility","isNotFor":["variable","variableNotExist"],"usage":["variable"]},"hide_variable":{"xml":"<block type='hide_variable'></block>","class":"variable_visibility","isNotFor":["variable","variableNotExist"],"usage":["variable"]},"value_of_index_from_list":{"xml":"<block type='value_of_index_from_list'> <value name='INDEX'> <block type='number'><field name='NUM'>1</field></block> </value> </block>","class":"list_element","isNotFor":["list","listNotExist"],"usage":["list"]},"add_value_to_list":{"xml":"<block type='add_value_to_list'> <value name='VALUE'> <block type='text'> <field name='NAME'>10</field> </block> </value> </block>","class":"list","isNotFor":["list","listNotExist"],"usage":["list"]},"remove_value_from_list":{"xml":"<block type='remove_value_from_list'> <value name='VALUE'> <block type='number'><field name='NUM'>1</field></block> </value> </block>","class":"list","isNotFor":["list","listNotExist"],"usage":["list"]},"insert_value_to_list":{"xml":"<block type='insert_value_to_list'> <value name='DATA'> <block type='text'> <field name='NAME'>10</field> </block> </value> <value name='INDEX'> <block type='text'><field name='NAME'>1</field></block> </value> </block>","class":"list","isNotFor":["list","listNotExist"],"usage":["list"]},"change_value_list_index":{"xml":"<block type='change_value_list_index'> <value name='INDEX'> <block type='text'><field name='NAME'>1</field></block> </value> <value name='DATA'> <block type='text'> <field name='NAME'>10</field> </block> </value> </block>","class":"list","isNotFor":["list","listNotExist"],"usage":["list"]},"length_of_list":{"xml":"<block type='length_of_list'></block>","class":"list","isNotFor":["list","listNotExist"],"usage":["list"]},"show_list":{"xml":"<block type='show_list'></block>","class":"list_visibility","isNotFor":["list","listNotExist"],"usage":["list"]},"hide_list":{"xml":"<block type='hide_list'></block>","class":"list_visibility","isNotFor":["list","listNotExist"],"usage":["list"]},"text_write":{"xml":"<block type='text_write'><value name='VALUE'><block type='text'></block></value></block>","class":"text","isNotFor":["sprite"],"usage":["textbox"]},"text_append":{"xml":"<block type='text_append'><value name='VALUE'><block type='text'></block></value></block>","class":"text","isNotFor":["sprite"],"usage":["textbox"]},"text_prepend":{"xml":"<block type='text_prepend'><value name='VALUE'><block type='text'></block></value></block>","class":"text","isNotFor":["sprite"],"usage":["textbox"]},"text_flush":{"xml":"<block type='text_flush'></block>","class":"text","isNotFor":["sprite"],"usage":["textbox"]},"arduino_download_connector":{"xml":"<btn text=\"Lang.Blocks.ARDUINO_download_connector\" onclick=\"Entry.hw.downloadConnector()\"></btn>","isNotFor":["arduinoDisconnected"],"usage":["arduino"],"class":"button"},"arduino_download_source":{"xml":"<btn text=\"Lang.Blocks.ARDUINO_download_source\" onclick=\"Entry.hw.downloadSource()\"></btn>","isNotFor":["arduinoDisconnected"],"usage":["arduino"],"class":"button"},"arduino_reconnect":{"xml":"<btn text=\"Lang.Blocks.ARDUINO_reconnect\" onclick=\"Entry.hw.retryConnect()\"></btn>","isNotFor":["arduinoDisconnected"],"usage":["arduino"],"class":"button"},"arduino_connected":{"xml":"<btn text=\"Lang.Blocks.ARDUINO_connected\" onclick=\"\"></btn>","isNotFor":["arduinoConnected"],"usage":["arduino"],"class":"button"},"arduino_get_number_sensor_value":{"xml":"<block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='arduino_get_sensor_number'></block></value></block>","isNotFor":['arduino'],"usage":["arduino"],"class":"arduino_value"},"dplay_get_number_sensor_value":{"xml":"<block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='arduino_get_sensor_number'></block></value></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"arduino_value"},"nemoino_get_number_sensor_value":{"xml":"<block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='arduino_get_sensor_number'></block></value></block>","isNotFor":['nemoino'],"usage":["arduino"],"class":"arduino_value"},"sensorBoard_get_number_sensor_value":{"xml":"<block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='arduino_get_sensor_number'></block></value></block>","isNotFor":['sensorBoard'],"usage":["arduino"],"class":"arduino_value"},"CODEino_get_number_sensor_value":{"xml":"<block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='CODEino_get_sensor_number'></block></value></block>","isNotFor":['CODEino'],"usage":["arduino"],"class":"arduino_value"},"arduino_get_digital_value":{"xml":"<block type='arduino_get_digital_value'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['arduino'],"usage":["arduino"],"class":"arduino_value"},"dplay_get_digital_value":{"xml":"<block type='arduino_get_digital_value'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"arduino_value"},"nemoino_get_digital_value":{"xml":"<block type='arduino_get_digital_value'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['nemoino'],"usage":["arduino"],"class":"arduino_value"},"sensorBoard_get_digital_value":{"xml":"<block type='arduino_get_digital_value'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['sensorBoard'],"usage":["arduino"],"class":"arduino_value"},"CODEino_get_digital_value":{"xml":"<block type='arduino_get_digital_value'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['CODEino'],"usage":["arduino"],"class":"arduino_value"},"arduino_toggle_led":{"xml":"<block type='arduino_toggle_led'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['arduino'],"usage":["arduino"],"class":"arduino_set"},"dplay_toggle_led":{"xml":"<block type='arduino_toggle_led'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"arduino_set"},"nemoino_toggle_led":{"xml":"<block type='arduino_toggle_led'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['nemoino'],"usage":["arduino"],"class":"arduino_set"},"sensorBoard_toggle_led":{"xml":"<block type='arduino_toggle_led'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['sensorBoard'],"usage":["arduino"],"class":"arduino_set"},"CODEino_toggle_led":{"xml":"<block type='arduino_toggle_led'><value name='VALUE'><block type='arduino_get_port_number'></block></value></block>","isNotFor":['CODEino'],"usage":["arduino"],"class":"arduino_set"},"arduino_toggle_pwm":{"xml":"<block type='arduino_toggle_pwm'><value name='PORT'><block type='arduino_get_pwm_port_number'></block></value><value name='VALUE'><block type='arduino_text'><field name='NAME'>255</field></block></value></block>","isNotFor":['arduino'],"usage":["arduino"],"class":"arduino_set"},"dplay_toggle_pwm":{"xml":"<block type='arduino_toggle_pwm'><value name='PORT'><block type='arduino_get_pwm_port_number'></block></value><value name='VALUE'><block type='arduino_text'><field name='NAME'>255</field></block></value></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"arduino_set"},"nemoino_toggle_pwm":{"xml":"<block type='arduino_toggle_pwm'><value name='PORT'><block type='arduino_get_pwm_port_number'></block></value><value name='VALUE'><block type='arduino_text'><field name='NAME'>255</field></block></value></block>","isNotFor":['nemoino'],"usage":["arduino"],"class":"arduino_set"},"sensorBoard_toggle_pwm":{"xml":"<block type='arduino_toggle_pwm'><value name='PORT'><block type='arduino_get_pwm_port_number'></block></value><value name='VALUE'><block type='arduino_text'><field name='NAME'>255</field></block></value></block>","isNotFor":['sensorBoard'],"usage":["arduino"],"class":"arduino_set"},"CODEino_toggle_pwm":{"xml":"<block type='arduino_toggle_pwm'><value name='PORT'><block type='arduino_get_pwm_port_number'></block></value><value name='VALUE'><block type='arduino_text'><field name='NAME'>255</field></block></value></block>","isNotFor":['CODEino'],"usage":["arduino"],"class":"arduino_set"},"arduino_convert_scale":{"xml":"<block type='arduino_convert_scale'><value name='VALUE1'><block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='arduino_get_sensor_number'></block></value></block></value><value name='VALUE2'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE3'> <block type='number'><field name='NUM'>1023</field></block> </value><value name='VALUE4'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE5'> <block type='number'><field name='NUM'>100</field></block> </value></block>","isNotFor":['arduino'],"usage":["arduino"],"class":"arduino"},"dplay_convert_scale":{"xml":"<block type='arduino_convert_scale'><value name='VALUE1'><block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='arduino_get_sensor_number'></block></value></block></value><value name='VALUE2'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE3'> <block type='number'><field name='NUM'>1023</field></block> </value><value name='VALUE4'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE5'> <block type='number'><field name='NUM'>100</field></block> </value></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"arduino"},"nemoino_convert_scale":{"xml":"<block type='arduino_convert_scale'><value name='VALUE1'><block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='arduino_get_sensor_number'></block></value></block></value><value name='VALUE2'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE3'> <block type='number'><field name='NUM'>1023</field></block> </value><value name='VALUE4'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE5'> <block type='number'><field name='NUM'>100</field></block> </value></block>","isNotFor":['nemoino'],"usage":["arduino"],"class":"arduino"},"sensorBoard_convert_scale":{"xml":"<block type='arduino_convert_scale'><value name='VALUE1'><block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='arduino_get_sensor_number'></block></value></block></value><value name='VALUE2'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE3'> <block type='number'><field name='NUM'>1023</field></block> </value><value name='VALUE4'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE5'> <block type='number'><field name='NUM'>100</field></block> </value></block>","isNotFor":['sensorBoard'],"usage":["arduino"],"class":"arduino"},"CODEino_convert_scale":{"xml":"<block type='arduino_convert_scale'><value name='VALUE1'><block type='arduino_get_number_sensor_value'><value name='VALUE'><block type='CODEino_get_sensor_number'></block></value></block></value><value name='VALUE2'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE3'> <block type='number'><field name='NUM'>1023</field></block> </value><value name='VALUE4'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE5'> <block type='number'><field name='NUM'>100</field></block> </value></block>","isNotFor":['CODEino'],"usage":["arduino"],"class":"arduino"},"rotate_by_angle_dropdown":{"xml":"<block type='rotate_by_angle_dropdown'> <field name=\"VALUE\">45</field></block>","xmls":["<block type='rotate_by_angle_dropdown'> <field name=\"VALUE\">45</field></block>","<block type='rotate_by_angle_dropdown'> <field name=\"VALUE\">90</field></block>","<block type='rotate_by_angle_dropdown'> <field name=\"VALUE\">135</field></block>","<block type='rotate_by_angle_dropdown'> <field name=\"VALUE\">180</field></block>"],"isNotFor":[],"class":"ebs"},"rotate_by_angle":{"isNotFor":[],"xml":"<block type='rotate_by_angle'><value name=\"VALUE\"><block type=\"number\"><field name=\"NUM\">90</field></block></value></block>","class":"rotate"},"rotate_by_angle_time":{"isNotFor":[],"xml":"<block type='rotate_by_angle_time'><value name=\"VALUE\"><block type=\"number\"><field name=\"NUM\">2</field></block></value></block>","class":"rotate"},"rotate_direction":{"isNotFor":[],"xml":"<block type='rotate_direction'><value name=\"VALUE\"><block type=\"number\"><field name=\"NUM\">90</field></block></value></block>","class":"rotate"},"see_angle_direction":{"isNotFor":[],"xml":"<block type='see_angle_direction'><value name=\"VALUE\"><block type=\"number\"><field name=\"NUM\">90</field></block></value></block>","class":"rotate"},"see_angle":{"isNotFor":[],"xml":"<block type='see_angle'><value name=\"VALUE\"><block type=\"number\"><field name=\"NUM\">90</field></block></value></block>","class":"rotate"},"sound_something":{"isNotFor":[],"xml":'<block type="sound_something"></block>',"class":"sound"},"sound_something_wait":{"isNotFor":[],"xml":'<block type="sound_something_wait"></block>',"class":"sound"},"sound_something_second_wait":{"isNotFor":[],"xml":'<block type="sound_something_second_wait"><value name="SECOND"><block type="number"><field name="NUM">1</field></block></value></block>',"class":"sound"},"sound_something_second":{"isNotFor":[],"xml":'<block type="sound_something_second"><value name="SECOND"><block type="number"><field name="NUM">1</field></block></value></block>',"class":"sound"},"boolean_equal":{"isNotFor":[],"xml":'<block type="boolean_equal"><value name="LEFTHAND"><block type="number"><field name="NUM">10</field></block></value><value name="RIGHTHAND"><block type="number"><field name="NUM">10</field></block></value></block>',"class":"boolean_compare"},"boolean_bigger":{"isNotFor":[],"xml":'<block type="boolean_bigger"><value name="LEFTHAND"><block type="number"><field name="NUM">10</field></block></value><value name="RIGHTHAND"><block type="number"><field name="NUM">10</field></block></value></block>',"class":"boolean_compare"},"boolean_smaller":{"isNotFor":[],"xml":'<block type="boolean_smaller"><value name="LEFTHAND"><block type="number"><field name="NUM">10</field></block></value><value name="RIGHTHAND"><block type="number"><field name="NUM">10</field></block></value></block>',"class":"boolean_compare"},"change_to_nth_shape":{"isNotFor":[],"xml":"<block type=\"change_to_nth_shape\"></block>","class":"shape"},"ebs_if":{"isNotFor":[],"xml":"<block type='_if'><value name='BOOL'><block type='reach_something'><field name='VALUE'>wall</field></block></value></block>","class":"condition"},"ebs_if2":{"isNotFor":[],"xml":"<block type='_if'><value name='BOOL'><block type='reach_something'><field name='VALUE'>cwz5</field></block></value></block>","class":"condition"},"char_at":{"xml":"<block type='char_at'><value name='LEFTHAND'><block type='text'><field name='NAME'>"+Lang.Blocks.hi_entry+"</field></block></value><value name='RIGHTHAND'><block type='number'><field name='NUM'>1</field></block></value></block>","class":"calc_string","isNotFor":[],"usage":[]},"length_of_string":{"xml":"<block type='length_of_string'><value name='STRING'><block type='text'><field name='NAME'>"+Lang.Blocks.entry+"</field></block></value></block>","class":"calc_string","isNotFor":[],"usage":[]},"substring":{"xml":"<block type='substring'><value name='STRING'><block type='text'><field name='NAME'>"+Lang.Blocks.hi_entry+"</field></block></value><value name='START'><block type='number'><field name='NUM'>2</field></block></value><value name='END'><block type='number'><field name='NUM'>5</field></block></value></block>","class":"calc_string","isNotFor":[],"usage":[]},"replace_string":{"xml":"<block type='replace_string'><value name='STRING'><block type='text'><field name='NAME'>"+Lang.Blocks.hi_entry+"</field></block></value><value name='OLD_WORD'><block type='text'><field name='NAME'>"+Lang.Blocks.hello+"</field></block></value><value name='NEW_WORD'><block type='text'><field name='NAME'>"+Lang.Blocks.nice+"</field></block></value></block>","class":"calc_string","isNotFor":[],"usage":[]},"change_string_case":{"xml":"<block type='change_string_case'><value name='STRING'><block type='text'><field name='NAME'>"+Lang.Blocks.hi_entry_en+"</field></block></value></block>","class":"calc_string","isNotFor":[],"usage":[]},"index_of_string":{"xml":"<block type='index_of_string'><value name='LEFTHAND'><block type='text'><field name='NAME'>"+Lang.Blocks.hi_entry+"</field></block></value><value name='RIGHTHAND'><block type='text'><field name='NAME'>"+Lang.Blocks.entry+"</field></block></value></block>","class":"calc_string","isNotFor":[],"usage":[]},"neobot_sensor_value":{"isNotFor":['neobot'],"xml":"<block type='neobot_sensor_value'></block>","class":"neobot_value"},"neobot_left_motor":{"isNotFor":['neobot'],"xml":"<block type='neobot_left_motor'><field name='SPEED'>15</field></block>","class":"neobot_motor"},"neobot_stop_left_motor":{"isNotFor":['neobot'],"xml":"<block type='neobot_stop_left_motor'></block>","class":"neobot_motor"},"neobot_right_motor":{"isNotFor":['neobot'],"xml":"<block type='neobot_right_motor'><field name='SPEED'>15</field></block>","class":"neobot_motor"},"neobot_stop_right_motor":{"isNotFor":['neobot'],"xml":"<block type='neobot_stop_right_motor'></block>","class":"neobot_motor"},"neobot_all_motor":{"isNotFor":['neobot'],"xml":"<block type='neobot_all_motor'><field name='SPEED'>15</field></block>","class":"neobot_motor"},"neobot_set_servo":{"isNotFor":['neobot'],"xml":"<block type='neobot_set_servo'></block>","class":"neobot_output"},"neobot_set_output":{"isNotFor":['neobot'],"xml":"<block type='neobot_set_output'><value name='VALUE'><block type='number'><field name='NUM'>255</field></block></value></block>","class":"neobot_output"},"neobot_set_fnd":{"isNotFor":['neobot'],"xml":"<block type='neobot_set_fnd'><value name='VALUE'><block type='number'><field name='NUM'>0</field></block></value></block>","class":"neobot_output"},"neobot_play_note_for":{"isNotFor":['neobot'],"xml":"<block type='neobot_play_note_for'><field name='NOTE'>1</field><field name='OCTAVE'>2</field><field name='DURATION'>4</field></block>","class":"neobot_note"},"bitbrick_sensor_value":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_sensor_value'></block>","class":"condition"},"bitbrick_is_touch_pressed":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_is_touch_pressed'></block>","class":"condition"},"bitbrick_turn_off_color_led":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_turn_off_color_led'></block>","class":"condition"},"bitbrick_turn_on_color_led_by_rgb":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_turn_on_color_led_by_rgb'><value name='rValue'><block type='text'><field name='NAME'>255</field></block></value><value name='gValue'><block type='text'><field name='NAME'>255</field></block></value><value name='bValue'><block type='text'><field name='NAME'>255</field></block></value></block>","class":"condition"},"bitbrick_turn_on_color_led_by_picker":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_turn_on_color_led_by_picker'></block>","class":"condition"},"bitbrick_turn_on_color_led_by_value":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_turn_on_color_led_by_value'><value name='VALUE'><block type='text'><field name='NAME'>0</field></block></value></block>","class":"condition"},"bitbrick_buzzer":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_buzzer'><value name='VALUE'><block type='text'><field name='NAME'>60</field></block></value></block>","class":"condition"},"bitbrick_turn_off_all_motors":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_turn_off_all_motors'></block>","class":"condition"},"bitbrick_dc_speed":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_dc_speed'><value name='VALUE'><block type='text'><field name='NAME'>60</field></block></value></block>","class":"condition"},"bitbrick_dc_direction_speed":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_dc_direction_speed'><value name='VALUE'><block type='text'><field name='NAME'>100</field></block></value></block>","class":"condition"},"bitbrick_servomotor_angle":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_servomotor_angle'><value name='VALUE'><block type='text'><field name='NAME'>100</field></block></value></block>","class":"condition"},"bitbrick_convert_scale":{"isNotFor":['bitbrick'],"xml":"<block type='bitbrick_convert_scale'><value name='VALUE2'> <block type='number'><field name='NUM'>0</field></block> </value><value name='VALUE3'> <block type='number'><field name='NUM'>1023</field></block> </value><value name='VALUE4'> <block type='number'><field name='NUM'>-100</field></block> </value><value name='VALUE5'> <block type='number'><field name='NUM'>100</field></block> </value></block>","class":"condition"},"hamster_hand_found":{"isNotFor":["hamster"],"xml":"<block type='hamster_hand_found'></block>","class":"hamster_sensor"},"hamster_value":{"isNotFor":["hamster"],"xml":"<block type='hamster_value'></block>","class":"hamster_sensor"},"hamster_move_forward_once":{"isNotFor":["hamster"],"xml":"<block type='hamster_move_forward_once'></block>","class":"hamster_board"},"hamster_turn_once":{"isNotFor":["hamster"],"xml":"<block type='hamster_turn_once'></block>","class":"hamster_board"},"hamster_move_forward_for_secs":{"isNotFor":["hamster"],"xml":"<block type='hamster_move_forward_for_secs'><value name='VALUE'><block type='text'><field name='NAME'>1</field></block></value></block>","class":"hamster_wheel"},"hamster_move_backward_for_secs":{"isNotFor":["hamster"],"xml":"<block type='hamster_move_backward_for_secs'><value name='VALUE'><block type='text'><field name='NAME'>1</field></block></value></block>","class":"hamster_wheel"},"hamster_turn_for_secs":{"isNotFor":["hamster"],"xml":"<block type='hamster_turn_for_secs'><value name='VALUE'><block type='text'><field name='NAME'>1</field></block></value></block>","class":"hamster_wheel"},"hamster_change_both_wheels_by":{"isNotFor":["hamster"],"xml":"<block type='hamster_change_both_wheels_by'><value name='LEFT'><block type='text'><field name='NAME'>10</field></block></value><value name='RIGHT'><block type='text'><field name='NAME'>10</field></block></value></block>","class":"hamster_wheel"},"hamster_set_both_wheels_to":{"isNotFor":["hamster"],"xml":"<block type='hamster_set_both_wheels_to'><value name='LEFT'><block type='text'><field name='NAME'>30</field></block></value><value name='RIGHT'><block type='text'><field name='NAME'>30</field></block></value></block>","class":"hamster_wheel"},"hamster_change_wheel_by":{"isNotFor":["hamster"],"xml":"<block type='hamster_change_wheel_by'><value name='VALUE'><block type='text'><field name='NAME'>10</field></block></value></block>","class":"hamster_wheel"},"hamster_set_wheel_to":{"isNotFor":["hamster"],"xml":"<block type='hamster_set_wheel_to'><value name='VALUE'><block type='text'><field name='NAME'>30</field></block></value></block>","class":"hamster_wheel"},"hamster_follow_line_using":{"isNotFor":["hamster"],"xml":"<block type='hamster_follow_line_using'></block>","class":"hamster_wheel"},"hamster_follow_line_until":{"isNotFor":["hamster"],"xml":"<block type='hamster_follow_line_until'></block>","class":"hamster_wheel"},"hamster_set_following_speed_to":{"isNotFor":["hamster"],"xml":"<block type='hamster_set_following_speed_to'><field name='SPEED'>5</field></block>","class":"hamster_wheel"},"hamster_stop":{"isNotFor":["hamster"],"xml":"<block type='hamster_stop'></block>","class":"hamster_wheel"},"hamster_set_led_to":{"isNotFor":["hamster"],"xml":"<block type='hamster_set_led_to'></block>","class":"hamster_led"},"hamster_clear_led":{"isNotFor":["hamster"],"xml":"<block type='hamster_clear_led'></block>","class":"hamster_led"},"hamster_beep":{"isNotFor":["hamster"],"xml":"<block type='hamster_beep'></block>","class":"hamster_buzzer"},"hamster_change_buzzer_by":{"isNotFor":["hamster"],"xml":"<block type='hamster_change_buzzer_by'><value name='VALUE'><block type='text'><field name='NAME'>10</field></block></value></block>","class":"hamster_buzzer"},"hamster_set_buzzer_to":{"isNotFor":["hamster"],"xml":"<block type='hamster_set_buzzer_to'><value name='VALUE'><block type='text'><field name='NAME'>1000</field></block></value></block>","class":"hamster_buzzer"},"hamster_clear_buzzer":{"isNotFor":["hamster"],"xml":"<block type='hamster_clear_buzzer'></block>","class":"hamster_buzzer"},"hamster_play_note_for":{"isNotFor":["hamster"],"xml":"<block type='hamster_play_note_for'><field name='OCTAVE'>4</field><value name='VALUE'><block type='text'><field name='NAME'>0.5</field></block></value></block>","class":"hamster_buzzer"},"hamster_rest_for":{"isNotFor":["hamster"],"xml":"<block type='hamster_rest_for'><value name='VALUE'><block type='text'><field name='NAME'>0.25</field></block></value></block>","class":"hamster_buzzer"},"hamster_change_tempo_by":{"isNotFor":["hamster"],"xml":"<block type='hamster_change_tempo_by'><value name='VALUE'><block type='text'><field name='NAME'>20</field></block></value></block>","class":"hamster_buzzer"},"hamster_set_tempo_to":{"isNotFor":["hamster"],"xml":"<block type='hamster_set_tempo_to'><value name='VALUE'><block type='text'><field name='NAME'>60</field></block></value></block>","class":"hamster_buzzer"},"hamster_set_port_to":{"isNotFor":["hamster"],"xml":"<block type='hamster_set_port_to'></block>","class":"hamster_port"},"hamster_change_output_by":{"isNotFor":["hamster"],"xml":"<block type='hamster_change_output_by'><value name='VALUE'><block type='text'><field name='NAME'>10</field></block></value></block>","class":"hamster_port"},"hamster_set_output_to":{"isNotFor":["hamster"],"xml":"<block type='hamster_set_output_to'><value name='VALUE'><block type='text'><field name='NAME'>100</field></block></value></block>","class":"hamster_port"},"albert_hand_found":{"isNotFor":["albert"],"xml":"<block type='albert_hand_found'></block>","class":"albert_sensor"},"albert_value":{"isNotFor":["albert"],"xml":"<block type='albert_value'></block>","class":"albert_sensor"},"albert_move_forward_for_secs":{"isNotFor":["albert"],"xml":"<block type='albert_move_forward_for_secs'><value name='VALUE'><block type='text'><field name='NAME'>1</field></block></value></block>","class":"albert_wheel"},"albert_move_backward_for_secs":{"isNotFor":["albert"],"xml":"<block type='albert_move_backward_for_secs'><value name='VALUE'><block type='text'><field name='NAME'>1</field></block></value></block>","class":"albert_wheel"},"albert_turn_for_secs":{"isNotFor":["albert"],"xml":"<block type='albert_turn_for_secs'><value name='VALUE'><block type='text'><field name='NAME'>1</field></block></value></block>","class":"albert_wheel"},"albert_change_both_wheels_by":{"isNotFor":["albert"],"xml":"<block type='albert_change_both_wheels_by'><value name='LEFT'><block type='text'><field name='NAME'>10</field></block></value><value name='RIGHT'><block type='text'><field name='NAME'>10</field></block></value></block>","class":"albert_wheel"},"albert_set_both_wheels_to":{"isNotFor":["albert"],"xml":"<block type='albert_set_both_wheels_to'><value name='LEFT'><block type='text'><field name='NAME'>30</field></block></value><value name='RIGHT'><block type='text'><field name='NAME'>30</field></block></value></block>","class":"albert_wheel"},"albert_change_wheel_by":{"isNotFor":["albert"],"xml":"<block type='albert_change_wheel_by'><value name='VALUE'><block type='text'><field name='NAME'>10</field></block></value></block>","class":"albert_wheel"},"albert_set_wheel_to":{"isNotFor":["albert"],"xml":"<block type='albert_set_wheel_to'><value name='VALUE'><block type='text'><field name='NAME'>30</field></block></value></block>","class":"albert_wheel"},"albert_stop":{"isNotFor":["albert"],"xml":"<block type='albert_stop'></block>","class":"albert_wheel"},"albert_set_pad_size_to":{"isNotFor":["albert"],"xml":"<block type='albert_set_pad_size_to'><value name='WIDTH'><block type='text'><field name='NAME'>108</field></block></value><value name='HEIGHT'><block type='text'><field name='NAME'>76</field></block></value></block>","class":"albert_wheel"},"albert_set_eye_to":{"isNotFor":["albert"],"xml":"<block type='albert_set_eye_to'></block>","class":"albert_led"},"albert_clear_eye":{"isNotFor":["albert"],"xml":"<block type='albert_clear_eye'></block>","class":"albert_led"},"albert_body_led":{"isNotFor":["albert"],"xml":"<block type='albert_body_led'></block>","class":"albert_led"},"albert_front_led":{"isNotFor":["albert"],"xml":"<block type='albert_front_led'></block>","class":"albert_led"},"albert_beep":{"isNotFor":["albert"],"xml":"<block type='albert_beep'></block>","class":"albert_buzzer"},"albert_change_buzzer_by":{"isNotFor":["albert"],"xml":"<block type='albert_change_buzzer_by'><value name='VALUE'><block type='text'><field name='NAME'>10</field></block></value></block>","class":"albert_buzzer"},"albert_set_buzzer_to":{"isNotFor":["albert"],"xml":"<block type='albert_set_buzzer_to'><value name='VALUE'><block type='text'><field name='NAME'>1000</field></block></value></block>","class":"albert_buzzer"},"albert_clear_buzzer":{"isNotFor":["albert"],"xml":"<block type='albert_clear_buzzer'></block>","class":"albert_buzzer"},"albert_play_note_for":{"isNotFor":["albert"],"xml":"<block type='albert_play_note_for'><field name='OCTAVE'>4</field><value name='VALUE'><block type='text'><field name='NAME'>0.5</field></block></value></block>","class":"albert_buzzer"},"albert_rest_for":{"isNotFor":["albert"],"xml":"<block type='albert_rest_for'><value name='VALUE'><block type='text'><field name='NAME'>0.25</field></block></value></block>","class":"albert_buzzer"},"albert_change_tempo_by":{"isNotFor":["albert"],"xml":"<block type='albert_change_tempo_by'><value name='VALUE'><block type='text'><field name='NAME'>20</field></block></value></block>","class":"albert_buzzer"},"albert_set_tempo_to":{"isNotFor":["albert"],"xml":"<block type='albert_set_tempo_to'><value name='VALUE'><block type='text'><field name='NAME'>60</field></block></value></block>","class":"albert_buzzer"},"sensorBoard_get_named_sensor_value":{"xml":"<block type='sensorBoard_get_named_sensor_value'></block>","isNotFor":['sensorBoard'],"usage":["arduino"],"class":"sensorBoard"},"sensorBoard_is_button_pressed":{"isNotFor":["sensorBoard"],"xml":"<block type='sensorBoard_is_button_pressed'></block>","class":"sensorBoard"},"sensorBoard_led":{"isNotFor":["sensorBoard"],"xml":"<block type='sensorBoard_led'></block>","class":"sensorBoard"},"CODEino_get_named_sensor_value":{"xml":"<block type='CODEino_get_named_sensor_value'></block>","isNotFor":['CODEino'],"usage":["arduino"],"class":"CODEino"},"CODEino_get_sound_status":{"xml":"<block type='CODEino_get_sound_status'></block>","isNotFor":["CODEino"],"usage":["arduino"],"class":"CODEino"},"CODEino_get_light_status":{"xml":"<block type='CODEino_get_light_status'></block>","isNotFor":["CODEino"],"usage":["arduino"],"class":"CODEino"},"CODEino_is_button_pressed":{"xml":"<block type='CODEino_is_button_pressed'></block>","isNotFor":["CODEino"],"usage":["arduino"],"class":"CODEino"},"CODEino_get_accelerometer_direction":{"xml":"<block type='CODEino_get_accelerometer_direction'></block>","isNotFor":["CODEino"],"usage":["arduino"],"class":"CODEino"},"CODEino_get_accelerometer_value":{"xml":"<block type='CODEino_get_accelerometer_value'></block>","isNotFor":["CODEino"],"usage":["arduino"],"class":"CODEino"},"nemoino_get_named_sensor_value":{"xml":"<block type='nemoino_get_named_sensor_value'></block>","isNotFor":['nemoino'],"usage":["arduino"],"class":"nemoino"},"nemoino_get_sound_status":{"xml":"<block type='nemoino_get_sound_status'></block>","isNotFor":["nemoino"],"usage":["arduino"],"class":"nemoino"},"nemoino_is_button_pressed":{"xml":"<block type='nemoino_is_button_pressed'></block>","isNotFor":["nemoino"],"usage":["arduino"],"class":"nemoino"},"nemoino_get_accelerometer_direction":{"xml":"<block type='nemoino_get_accelerometer_direction'></block>","isNotFor":["nemoino"],"usage":["arduino"],"class":"nemoino"},"nemoino_get_accelerometer_value":{"xml":"<block type='nemoino_get_accelerometer_value'></block>","isNotFor":["nemoino"],"usage":["arduino"],"class":"nemoino"},"dplay_get_tilt":{"xml":"<block type='dplay_get_tilt'></block>","isNotFor":["dplay"],"usage":["arduino"],"class":"dplay_set"},"dplay_get_value":{"xml":"<block type='dplay_get_value'><value name='VALUE'><block type='arduino_get_sensor_number'></block></value></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"dplay_set"},"dplay_get_light_status":{"xml":"<block type='dplay_get_light_status'></block>","isNotFor":["dplay"],"usage":["arduino"],"class":"dplay_set"},"dplay_get_switch_status":{"xml":"<block type='dplay_get_switch_status'></block>","isNotFor":["dplay"],"usage":["arduino"],"class":"dplay_set"},"dplay_buzzer":{"xml":"<block type='dplay_buzzer'><value name='VALUE'><block type='arduino_text'><field name='NAME'>0</field></block></value></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"dplay"},"dplay_select_led":{"xml":"<block type='dplay_select_led'><block type='arduino_get_port_number'></block></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"dplay"},"dplay_DCmotor":{"xml":"<block type='dplay_DCmotor'></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"dplay"},"dplay_servo":{"xml":"<block type='dplay_servo'><value name='VALUE'><block type='arduino_text'><field name='NAME'>255</field></block></value></block>","isNotFor":['dplay'],"usage":["arduino"],"class":"dplay"},"direction_relative_duration":{"isNotFor":[""],"xml":"<block type='direction_relative_duration'><value name='DURATION'><block type='text'><field name='NAME'>2</field></block></value><value name='AMOUNT'><block type='angle'></block></value></block>","class":"rotate"},"get_sound_volume":{"isNotFor":[""],"xml":"<block type='get_sound_volume'></block>","class":"calc"},"sound_from_to":{"isNotFor":[""],"xml":"<block type='sound_from_to'><value name='VALUE'><block type='get_sounds'></block></value><value name='START'><block type='text'><field name='NAME'>1</field></block></value><value name='END'><block type='text'><field name='NAME'>10</field></block></value></block>","class":"sound_play"},"sound_from_to_and_wait":{"isNotFor":[""],"xml":"<block type='sound_from_to_and_wait'><value name='VALUE'><block type='get_sounds'></block></value><value name='START'><block type='text'><field name='NAME'>1</field></block></value><value name='END'><block type='text'><field name='NAME'>10</field></block></value></block>","class":"sound_wait"},"quotient_and_mod":{"isNotFor":[""],"xml":"<block type='quotient_and_mod'><value name='LEFTHAND'><block type='text'><field name='NAME'>10</field></block></value><value name='RIGHTHAND'><block type='text'><field name='NAME'>10</field></block></value></block>",//"xmls": [
	//"<block type='quotient_and_mod'><value name='LEFTHAND'><block type='text'><field name='NAME'>10</field></block></value><value name='RIGHTHAND'><block type='text'><field name='NAME'>10</field></block></value><field name='OPERATOR'>QUOTIENT</field></block>",
	//"<block type='quotient_and_mod'><value name='LEFTHAND'><block type='text'><field name='NAME'>10</field></block></value><value name='RIGHTHAND'><block type='text'><field name='NAME'>10</field></block></value><field name='OPERATOR'>MOD</field></block>"
	//],
	"class":"calc"},"set_visible_answer":{"isNotFor":[""],"xml":"<block type='set_visible_answer'><field name='BOOL'>HIDE</field></block>","class":"ask"},"choose_project_timer_action":{"isNotFor":[""],"xml":"<block type='choose_project_timer_action'><field name='ACTION'>START</field></block>","class":"calc_timer"},"robotis_openCM70_cm_buzzer_index":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_cm_buzzer_index'><value name='CM_BUZZER_TIME'><block type='number'><field name='NUM'>1</field></block></value></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_cm_buzzer_melody":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_cm_buzzer_melody'></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_cm_sound_detected_clear":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_cm_sound_detected_clear'></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_sensor_value":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_sensor_value'></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_aux_sensor_value":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_aux_sensor_value'></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_cm_led":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_cm_led'></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_cm_motion":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_cm_motion'><value name='VALUE'><block type='number'><field name='NUM'>1</field></block></value></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_aux_motor_speed":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_aux_motor_speed'><value name='VALUE'><block type='number'><field name='NUM'>500</field></block></value></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_aux_servo_mode":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_aux_servo_mode'></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_aux_servo_speed":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_aux_servo_speed'><value name='VALUE'><block type='number'><field name='NUM'>500</field></block></value></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_aux_servo_position":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_aux_servo_position'><value name='VALUE'><block type='number'><field name='NUM'>512</field></block></value></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_aux_led_module":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_aux_led_module'></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_aux_custom":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_aux_custom'><value name='VALUE'><block type='number'><field name='NUM'>0</field></block></value></block>","class":"robotis_openCM70_cm"},"robotis_openCM70_cm_custom_value":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_cm_custom_value'><value name='VALUE'><block type='number'><field name='NUM'>0</field></block></value></block>","class":"robotis_openCM70_custom"},"robotis_openCM70_cm_custom":{"isNotFor":['robotis_openCM70'],"xml":"<block type='robotis_openCM70_cm_custom'><value name='ADDRESS'><block type='number'><field name='NUM'>0</field></block></value><value name='VALUE'><block type='number'><field name='NUM'>0</field></block></value></block>","class":"robotis_openCM70_custom"},"robotis_carCont_sensor_value":{"isNotFor":['robotis_carCont'],"xml":"<block type='robotis_carCont_sensor_value'></block>","class":"robotis_carCont_cm"},"robotis_carCont_cm_led":{"isNotFor":['robotis_carCont'],"xml":"<block type='robotis_carCont_cm_led'></block>","class":"robotis_carCont_cm"},"robotis_carCont_cm_sound_detected_clear":{"isNotFor":['robotis_carCont'],"xml":"<block type='robotis_carCont_cm_sound_detected_clear'></block>","class":"robotis_carCont_cm"},"robotis_carCont_aux_motor_speed":{"isNotFor":['robotis_carCont'],"xml":"<block type='robotis_carCont_aux_motor_speed'><value name='VALUE'><block type='number'><field name='NUM'>500</field></block></value></block>","class":"robotis_carCont_cm"},"robotis_carCont_cm_calibration":{"isNotFor":['robotis_carCont'],"xml":"<block type='robotis_carCont_cm_calibration'><value name='VALUE'><block type='number'><field name='NUM'>0</field></block></value></block>","class":"robotis_carCont_cm"}};EntryStatic.discussCategories=[// 'notice',
	'qna','tips','free','report','notice'];EntryStatic.artCategories=[{'key':'art_category_','lang':'art_category_all','value':''},{'key':'art_category_게임','lang':'art_category_game','value':'게임'},{'key':'art_category_애니메이션','lang':'art_category_animation','value':'애니메이션'},{'key':'art_category_미디어아트','lang':'art_category_media','value':'미디어아트'},{'key':'art_category_피지컬','lang':'art_category_physical','value':'피지컬'},{'key':'art_category_기타','lang':'art_category_etc','value':'기타'}];EntryStatic.artSortOptions=[{'key':'art_sort_updated','lang':'art_sort_updated','value':'updated'},{'key':'art_sort_visit','lang':'art_sort_visit','value':'visit'},{'key':'art_sort_likeCnt','lang':'art_sort_likeCnt','value':'likeCnt'},{'key':'art_sort_comment','lang':'art_sort_comment','value':'comment'}];EntryStatic.discussSortOptions=[{'lang':'discuss_sort_created','value':'created'},{'lang':'discuss_sort_visit','value':'visit'},{'lang':'discuss_sort_likesLength','value':'likesLength'},{'lang':'discuss_sort_commentsLength','value':'commentsLength'}];EntryStatic.discussPeriodOptions=[{'key':'discuss_period_','lang':'discuss_period_all','value':''},{'key':'discuss_period_1','lang':'discuss_period_day','value':'1'},{'key':'discuss_period_7','lang':'discuss_period_week','value':'7'},{'key':'discuss_period_30','lang':'discuss_period_month','value':'30'},{'key':'discuss_period_90','lang':'discuss_period_three_month','value':'90'}];EntryStatic.artPeriodOptions=[{'key':'art_period_','lang':'art_period_all','value':''},{'key':'art_period_1','lang':'art_period_day','value':'1'},{'key':'art_period_7','lang':'art_period_week','value':'7'},{'key':'art_period_30','lang':'art_period_month','value':'30'},{'key':'art_period_90','lang':'art_period_three_month','value':'90'}];EntryStatic.getCategoryByBlock=function(blockName){if(!blockName)return false;var allBlocks=EntryStatic.getAllBlocks();for(var i=0,len=allBlocks.length;i<len;i++){var blocks=allBlocks[i].blocks;if(blocks.indexOf(blockName)>-1){return allBlocks[i].category;}}return false;};EntryStatic.objectMainCategories=['entrybot_friends','people','animal','plant','vehicles','architect','food','environment','stuff','fantasy','interface','background'];EntryStatic.objectSubCategories={'entrybot_friends':[],'people':[],'animal':['animal_flying','animal_land','animal_water','animal_others'],'plant':['plant_flower','plant_grass','plant_tree','plant_others'],'vehicles':['vehicles_flying','vehicles_land','vehicles_water','vehicles_others'],'architect':['architect_building','architect_monument','architect_others'],'food':['food_vegetables','food_meat','food_drink','food_others'],'environment':['environment_nature','environment_space','environment_others'],'stuff':['stuff_living','stuff_hobby','stuff_others'],'fantasy':[],'interface':[],'background':['background_outdoor','background_indoor','background_nature','background_others']};EntryStatic.fonts=[{name:'바탕체',family:'KoPub Batang',url:'/css/kopubbatang.css'},{name:'명조체',family:'Nanum Myeongjo',url:'/css/nanummyeongjo.css'},{name:'고딕체',family:'Nanum Gothic',url:'/css/nanumgothic.css'},{name:'필기체',family:'Nanum Pen Script',url:'/css/nanumpenscript.css'},{name:'한라산체',family:'Jeju Hallasan',url:'/css/jejuhallasan.css'},{name:'코딩고딕체',family:'Nanum Gothic Coding',url:'/css/nanumgothiccoding.css'}];EntryStatic.getName=function(str,type){var dict=SpriteNames;if(type=='picture')dict=PictureNames;else if(type=='sound')dict=SoundNames;var lang=navigator.language?navigator.language:'ko';if(window.lang)lang=window.lang;if(window.user&&window.user.language)lang=window.user.language;if(!dict||lang=='ko'||lang=='code'){return str;}else{return dict[str]?dict[str]:str;}};EntryStatic.ARROW_COLOR_START='#2f975a';EntryStatic.ARROW_COLOR_FLOW='#3a71bc';EntryStatic.ARROW_COLOR_MOVING='#8641b6';EntryStatic.ARROW_COLOR_LOOKS='#d8234e';EntryStatic.ARROW_COLOR_SOUNDS='#83a617';EntryStatic.ARROW_COLOR_JUDGE='#89a1f7';EntryStatic.ARROW_COLOR_CALC='#e8b349';EntryStatic.ARROW_COLOR_VARIABLE='#ce38ce';EntryStatic.ARROW_COLOR_HW='#097e84';EntryStatic.COMMAND_TYPES={addThread:101,destroyThread:102,destroyBlock:103,recoverBlock:104,insertBlock:105,separateBlock:106,moveBlock:107,cloneBlock:108,uncloneBlock:109,scrollBoard:110,setFieldValue:111,selectObject:201,'do':301,'undo':302,'redo':303};// for server node js code
	if(( false?"undefined":_typeof(exports))=="object"){exports.blockInfo=EntryStatic.blockInfo;exports.getAllBlocks=EntryStatic.getAllBlocks;exports.getCategoryByBlock=EntryStatic.getCategoryByBlock;exports.EntryStatic=EntryStatic;}

/***/ }
/******/ ]);
//# sourceMappingURL=init.js.map