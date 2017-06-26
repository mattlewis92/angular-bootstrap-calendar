/**
 * angular-bootstrap-calendar - A pure AngularJS bootstrap themed responsive calendar that can display events and has views for year, month, week and day
 * @version v0.29.3
 * @link https://github.com/mattlewis92/angular-bootstrap-calendar
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("moment"), (function webpackLoadOptionalExternalModule() { try { return require("interactjs"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "moment", "interact"], factory);
	else if(typeof exports === 'object')
		exports["angularBootstrapCalendarModuleName"] = factory(require("angular"), require("moment"), (function webpackLoadOptionalExternalModule() { try { return require("interactjs"); } catch(e) {} }()));
	else
		root["angularBootstrapCalendarModuleName"] = factory(root["angular"], root["moment"], root["interact"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_61__, __WEBPACK_EXTERNAL_MODULE_62__) {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(23)

var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000
var DEFAULT_ADDITIONAL_DIGITS = 2

var parseTokenDateTimeDelimeter = /[T ]/
var parseTokenPlainTime = /:/

// year tokens
var parseTokenYY = /^(\d{2})$/
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
]

var parseTokenYYYY = /^(\d{4})/
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
]

// date tokens
var parseTokenMM = /^-(\d{2})$/
var parseTokenDDD = /^-?(\d{3})$/
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
var parseTokenWww = /^-?W(\d{2})$/
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/
var parseTokenTimezoneZ = /^(Z)$/
var parseTokenTimezoneHH = /^([+-])(\d{2})$/
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, dirtyOptions) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {}
  var additionalDigits = options.additionalDigits
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS
  } else {
    additionalDigits = Number(additionalDigits)
  }

  var dateStrings = splitDateString(argument)

  var parseYearResult = parseYear(dateStrings.date, additionalDigits)
  var year = parseYearResult.year
  var restDateString = parseYearResult.restDateString

  var date = parseDate(restDateString, year)

  if (date) {
    var timestamp = date.getTime()
    var time = 0
    var offset

    if (dateStrings.time) {
      time = parseTime(dateStrings.time)
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone)
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset()
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset()
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {}
  var array = dateString.split(parseTokenDateTimeDelimeter)
  var timeString

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null
    timeString = array[0]
  } else {
    dateStrings.date = array[0]
    timeString = array[1]
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString)
    if (token) {
      dateStrings.time = timeString.replace(token[1], '')
      dateStrings.timezone = token[1]
    } else {
      dateStrings.time = timeString
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits]
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

  var token

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
  if (token) {
    var yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
  if (token) {
    var centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token
  var date
  var month
  var week

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0)
    date.setUTCFullYear(year)
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    date.setUTCFullYear(year, month)
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString)
  if (token) {
    date = new Date(0)
    var dayOfYear = parseInt(token[1], 10)
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    var day = parseInt(token[2], 10)
    date.setUTCFullYear(year, month, day)
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    var dayOfWeek = parseInt(token[2], 10) - 1
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token
  var hours
  var minutes

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    var seconds = parseFloat(token[3].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token
  var absoluteOffset

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0
  day = day || 0
  var date = new Date(0)
  date.setUTCFullYear(isoYear, 0, 4)
  var fourthOfJanuaryDay = date.getUTCDay() || 7
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}

module.exports = parse


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added
 * @returns {Date} the new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds (dirtyDate, dirtyAmount) {
  var timestamp = parse(dirtyDate).getTime()
  var amount = Number(dirtyAmount)
  return new Date(timestamp + amount)
}

module.exports = addMilliseconds


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfDay


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_end_of_day__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_end_of_day___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_date_fns_end_of_day__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_days__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_days___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_days__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns_is_same_day__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns_is_same_day___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_date_fns_is_same_day__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_get_day__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_get_day___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_date_fns_get_day__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_date_fns_start_of_week__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_date_fns_start_of_week___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_date_fns_start_of_week__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns_add_days__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns_add_days___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_date_fns_add_days__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_date_fns_end_of_week__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_date_fns_end_of_week___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_date_fns_end_of_week__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_date_fns_difference_in_seconds__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_date_fns_difference_in_seconds___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_date_fns_difference_in_seconds__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_date_fns_start_of_month__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_date_fns_start_of_month___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_date_fns_start_of_month__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_date_fns_end_of_month__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_date_fns_end_of_month___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_date_fns_end_of_month__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_date_fns_is_same_month__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_date_fns_is_same_month___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_date_fns_is_same_month__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_date_fns_is_same_second__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_date_fns_is_same_second___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_date_fns_is_same_second__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_date_fns_set_hours__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_date_fns_set_hours___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_date_fns_set_hours__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_date_fns_set_minutes__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_date_fns_set_minutes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_date_fns_set_minutes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_date_fns_start_of_minute__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_date_fns_start_of_minute___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_date_fns_start_of_minute__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_date_fns_difference_in_minutes__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_date_fns_difference_in_minutes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_date_fns_difference_in_minutes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_date_fns_add_hours__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_date_fns_add_hours___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_date_fns_add_hours__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_date_fns_add_seconds__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_date_fns_add_seconds___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_date_fns_add_seconds__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_date_fns_min__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_date_fns_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_date_fns_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_date_fns_max__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_date_fns_max___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_date_fns_max__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SECONDS_IN_DAY", function() { return SECONDS_IN_DAY; });
/* harmony export (immutable) */ __webpack_exports__["getWeekViewEventOffset"] = getWeekViewEventOffset;
/* harmony export (immutable) */ __webpack_exports__["getWeekViewHeader"] = getWeekViewHeader;
/* harmony export (immutable) */ __webpack_exports__["getWeekView"] = getWeekView;
/* harmony export (immutable) */ __webpack_exports__["getMonthView"] = getMonthView;
/* harmony export (immutable) */ __webpack_exports__["getDayView"] = getDayView;
/* harmony export (immutable) */ __webpack_exports__["getDayViewHourGrid"] = getDayViewHourGrid;






















var WEEKEND_DAY_NUMBERS = [0, 6];
var DAYS_IN_WEEK = 7;
var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var SECONDS_IN_DAY = 60 * 60 * 24;
function getExcludedSeconds(_a) {
    var startDate = _a.startDate, seconds = _a.seconds, excluded = _a.excluded, _b = _a.precision, precision = _b === void 0 ? 'days' : _b;
    if (excluded.length < 1) {
        return 0;
    }
    var result = 0; // Calculated in seconds
    var endDate;
    var dayStart;
    var dayEnd;
    switch (precision) {
        case 'minutes':
            endDate = __WEBPACK_IMPORTED_MODULE_19_date_fns_add_seconds___default()(startDate, seconds - 1);
            dayStart = __WEBPACK_IMPORTED_MODULE_5_date_fns_get_day___default()(startDate);
            dayEnd = __WEBPACK_IMPORTED_MODULE_5_date_fns_get_day___default()(__WEBPACK_IMPORTED_MODULE_19_date_fns_add_seconds___default()(endDate, 0));
            excluded.forEach(function (excludedDay) {
                if (excludedDay === dayStart) {
                    result += __WEBPACK_IMPORTED_MODULE_9_date_fns_difference_in_seconds___default()(__WEBPACK_IMPORTED_MODULE_0_date_fns_end_of_day___default()(startDate), startDate) + 1;
                }
                else if (excludedDay === dayEnd) {
                    result += __WEBPACK_IMPORTED_MODULE_9_date_fns_difference_in_seconds___default()(endDate, __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(endDate)) + 1;
                }
                else if (excludedDay > dayStart && excludedDay < dayEnd) {
                    result += SECONDS_IN_DAY;
                }
            });
            break;
        case 'days':
            endDate = __WEBPACK_IMPORTED_MODULE_19_date_fns_add_seconds___default()(__WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(startDate), seconds - 1);
            dayStart = __WEBPACK_IMPORTED_MODULE_5_date_fns_get_day___default()(__WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(startDate));
            dayEnd = __WEBPACK_IMPORTED_MODULE_5_date_fns_get_day___default()(endDate);
            result += excluded.filter(function (excludedDay) { return excludedDay >= dayStart && excludedDay <= dayEnd; }).length * SECONDS_IN_DAY;
            break;
    }
    return result;
}
function getWeekViewEventSpan(_a) {
    var event = _a.event, offset = _a.offset, startOfWeekDate = _a.startOfWeekDate, excluded = _a.excluded, _b = _a.precision, precision = _b === void 0 ? 'days' : _b, weekStartsOn = _a.weekStartsOn;
    offset = Math.round(offset * SECONDS_IN_DAY);
    var span = SECONDS_IN_DAY;
    var begin = __WEBPACK_IMPORTED_MODULE_21_date_fns_max___default()(event.start, startOfWeekDate);
    var endOfWeekDate = __WEBPACK_IMPORTED_MODULE_8_date_fns_end_of_week___default()(startOfWeekDate, { weekStartsOn: weekStartsOn });
    if (event.end) {
        switch (precision) {
            case 'days':
                span = (__WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_days___default()(__WEBPACK_IMPORTED_MODULE_20_date_fns_min___default()(__WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(event.end), __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(endOfWeekDate)), __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(begin)) + 1) * SECONDS_IN_DAY;
                break;
            case 'minutes':
                span = __WEBPACK_IMPORTED_MODULE_9_date_fns_difference_in_seconds___default()(__WEBPACK_IMPORTED_MODULE_20_date_fns_min___default()(event.end, __WEBPACK_IMPORTED_MODULE_19_date_fns_add_seconds___default()(endOfWeekDate, 1)), begin);
                break;
        }
    }
    span -= getExcludedSeconds({ startDate: begin, seconds: span, excluded: excluded, precision: precision });
    return span / SECONDS_IN_DAY;
}
function getWeekViewEventOffset(_a) {
    var event = _a.event, startOfWeek = _a.startOfWeek, _b = _a.excluded, excluded = _b === void 0 ? [] : _b, _c = _a.precision, precision = _c === void 0 ? 'days' : _c;
    if (event.start < startOfWeek) {
        return 0;
    }
    var offset;
    switch (precision) {
        case 'days':
            offset = __WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_days___default()(__WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(event.start), startOfWeek) * SECONDS_IN_DAY;
            break;
        case 'minutes':
            offset = __WEBPACK_IMPORTED_MODULE_9_date_fns_difference_in_seconds___default()(event.start, startOfWeek);
            break;
    }
    offset -= getExcludedSeconds({ startDate: startOfWeek, seconds: offset, excluded: excluded, precision: precision });
    return offset / SECONDS_IN_DAY;
}
function isEventIsPeriod(_a) {
    var event = _a.event, periodStart = _a.periodStart, periodEnd = _a.periodEnd;
    var eventStart = event.start;
    var eventEnd = event.end || event.start;
    if (eventStart > periodStart && eventStart < periodEnd) {
        return true;
    }
    if (eventEnd > periodStart && eventEnd < periodEnd) {
        return true;
    }
    if (eventStart < periodStart && eventEnd > periodEnd) {
        return true;
    }
    if (__WEBPACK_IMPORTED_MODULE_13_date_fns_is_same_second___default()(eventStart, periodStart) || __WEBPACK_IMPORTED_MODULE_13_date_fns_is_same_second___default()(eventStart, periodEnd)) {
        return true;
    }
    if (__WEBPACK_IMPORTED_MODULE_13_date_fns_is_same_second___default()(eventEnd, periodStart) || __WEBPACK_IMPORTED_MODULE_13_date_fns_is_same_second___default()(eventEnd, periodEnd)) {
        return true;
    }
    return false;
}
function getEventsInPeriod(_a) {
    var events = _a.events, periodStart = _a.periodStart, periodEnd = _a.periodEnd;
    return events.filter(function (event) { return isEventIsPeriod({ event: event, periodStart: periodStart, periodEnd: periodEnd }); });
}
function getWeekDay(_a) {
    var date = _a.date;
    var today = __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(new Date());
    return {
        date: date,
        isPast: date < today,
        isToday: __WEBPACK_IMPORTED_MODULE_4_date_fns_is_same_day___default()(date, today),
        isFuture: date > today,
        isWeekend: WEEKEND_DAY_NUMBERS.indexOf(__WEBPACK_IMPORTED_MODULE_5_date_fns_get_day___default()(date)) > -1
    };
}
function getWeekViewHeader(_a) {
    var viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn, _b = _a.excluded, excluded = _b === void 0 ? [] : _b;
    var start = __WEBPACK_IMPORTED_MODULE_6_date_fns_start_of_week___default()(viewDate, { weekStartsOn: weekStartsOn });
    var days = [];
    var _loop_1 = function (i) {
        var date = __WEBPACK_IMPORTED_MODULE_7_date_fns_add_days___default()(start, i);
        if (!excluded.some(function (e) { return date.getDay() === e; })) {
            days.push(getWeekDay({ date: date }));
        }
    };
    for (var i = 0; i < DAYS_IN_WEEK; i++) {
        _loop_1(i);
    }
    return days;
}
function getWeekView(_a) {
    var _b = _a.events, events = _b === void 0 ? [] : _b, viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn, _c = _a.excluded, excluded = _c === void 0 ? [] : _c, _d = _a.precision, precision = _d === void 0 ? 'days' : _d, _e = _a.absolutePositionedEvents, absolutePositionedEvents = _e === void 0 ? false : _e;
    if (!events) {
        events = [];
    }
    var startOfViewWeek = __WEBPACK_IMPORTED_MODULE_6_date_fns_start_of_week___default()(viewDate, { weekStartsOn: weekStartsOn });
    var endOfViewWeek = __WEBPACK_IMPORTED_MODULE_8_date_fns_end_of_week___default()(viewDate, { weekStartsOn: weekStartsOn });
    var maxRange = DAYS_IN_WEEK - excluded.length;
    var eventsMapped = getEventsInPeriod({ events: events, periodStart: startOfViewWeek, periodEnd: endOfViewWeek }).map(function (event) {
        var offset = getWeekViewEventOffset({ event: event, startOfWeek: startOfViewWeek, excluded: excluded, precision: precision });
        var span = getWeekViewEventSpan({ event: event, offset: offset, startOfWeekDate: startOfViewWeek, excluded: excluded, precision: precision, weekStartsOn: weekStartsOn });
        return { event: event, offset: offset, span: span };
    }).filter(function (e) { return e.offset < maxRange; }).filter(function (e) { return e.span > 0; }).map(function (entry) { return ({
        event: entry.event,
        offset: entry.offset,
        span: entry.span,
        startsBeforeWeek: entry.event.start < startOfViewWeek,
        endsAfterWeek: (entry.event.end || entry.event.start) > endOfViewWeek
    }); }).sort(function (itemA, itemB) {
        var startSecondsDiff = __WEBPACK_IMPORTED_MODULE_9_date_fns_difference_in_seconds___default()(itemA.event.start, itemB.event.start);
        if (startSecondsDiff === 0) {
            return __WEBPACK_IMPORTED_MODULE_9_date_fns_difference_in_seconds___default()(itemB.event.end || itemB.event.start, itemA.event.end || itemA.event.start);
        }
        return startSecondsDiff;
    });
    var eventRows = [];
    var allocatedEvents = [];
    eventsMapped.forEach(function (event, index) {
        if (allocatedEvents.indexOf(event) === -1) {
            allocatedEvents.push(event);
            var rowSpan_1 = event.span + event.offset;
            var otherRowEvents = eventsMapped.slice(index + 1).filter(function (nextEvent) {
                if (nextEvent.offset >= rowSpan_1 &&
                    rowSpan_1 + nextEvent.span <= DAYS_IN_WEEK &&
                    allocatedEvents.indexOf(nextEvent) === -1) {
                    var nextEventOffset = nextEvent.offset - rowSpan_1;
                    if (!absolutePositionedEvents) {
                        nextEvent.offset = nextEventOffset;
                    }
                    rowSpan_1 += nextEvent.span + nextEventOffset;
                    allocatedEvents.push(nextEvent);
                    return true;
                }
            });
            eventRows.push({
                row: [
                    event
                ].concat(otherRowEvents)
            });
        }
    });
    return eventRows;
}
function getMonthView(_a) {
    var _b = _a.events, events = _b === void 0 ? [] : _b, viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn, _c = _a.excluded, excluded = _c === void 0 ? [] : _c, _d = _a.viewStart, viewStart = _d === void 0 ? __WEBPACK_IMPORTED_MODULE_10_date_fns_start_of_month___default()(viewDate) : _d, _e = _a.viewEnd, viewEnd = _e === void 0 ? __WEBPACK_IMPORTED_MODULE_11_date_fns_end_of_month___default()(viewDate) : _e;
    if (!events) {
        events = [];
    }
    var start = __WEBPACK_IMPORTED_MODULE_6_date_fns_start_of_week___default()(viewStart, { weekStartsOn: weekStartsOn });
    var end = __WEBPACK_IMPORTED_MODULE_8_date_fns_end_of_week___default()(viewEnd, { weekStartsOn: weekStartsOn });
    var eventsInMonth = getEventsInPeriod({
        events: events,
        periodStart: start,
        periodEnd: end
    });
    var days = [];
    var previousDate;
    var _loop_2 = function (i) {
        // hacky fix for https://github.com/mattlewis92/angular-calendar/issues/173
        var date;
        if (previousDate) {
            date = __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(__WEBPACK_IMPORTED_MODULE_18_date_fns_add_hours___default()(previousDate, HOURS_IN_DAY));
            if (previousDate.getTime() === date.getTime()) {
                date = __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(__WEBPACK_IMPORTED_MODULE_18_date_fns_add_hours___default()(previousDate, HOURS_IN_DAY + 1));
            }
            previousDate = date;
        }
        else {
            date = previousDate = start;
        }
        if (!excluded.some(function (e) { return date.getDay() === e; })) {
            var day = getWeekDay({ date: date });
            var events_1 = getEventsInPeriod({
                events: eventsInMonth,
                periodStart: __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(date),
                periodEnd: __WEBPACK_IMPORTED_MODULE_0_date_fns_end_of_day___default()(date)
            });
            day.inMonth = __WEBPACK_IMPORTED_MODULE_12_date_fns_is_same_month___default()(date, viewDate);
            day.events = events_1;
            day.badgeTotal = events_1.length;
            days.push(day);
        }
    };
    for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_2_date_fns_difference_in_days___default()(end, start) + 1; i++) {
        _loop_2(i);
    }
    var totalDaysVisibleInWeek = DAYS_IN_WEEK - excluded.length;
    var rows = Math.floor(days.length / totalDaysVisibleInWeek);
    var rowOffsets = [];
    for (var i = 0; i < rows; i++) {
        rowOffsets.push(i * totalDaysVisibleInWeek);
    }
    return {
        rowOffsets: rowOffsets,
        totalDaysVisibleInWeek: totalDaysVisibleInWeek,
        days: days
    };
}
function getDayView(_a) {
    var _b = _a.events, events = _b === void 0 ? [] : _b, viewDate = _a.viewDate, hourSegments = _a.hourSegments, dayStart = _a.dayStart, dayEnd = _a.dayEnd, eventWidth = _a.eventWidth, segmentHeight = _a.segmentHeight;
    if (!events) {
        events = [];
    }
    var startOfView = __WEBPACK_IMPORTED_MODULE_15_date_fns_set_minutes___default()(__WEBPACK_IMPORTED_MODULE_14_date_fns_set_hours___default()(__WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(viewDate), dayStart.hour), dayStart.minute);
    var endOfView = __WEBPACK_IMPORTED_MODULE_15_date_fns_set_minutes___default()(__WEBPACK_IMPORTED_MODULE_14_date_fns_set_hours___default()(__WEBPACK_IMPORTED_MODULE_16_date_fns_start_of_minute___default()(__WEBPACK_IMPORTED_MODULE_0_date_fns_end_of_day___default()(viewDate)), dayEnd.hour), dayEnd.minute);
    var previousDayEvents = [];
    var dayViewEvents = getEventsInPeriod({
        events: events.filter(function (event) { return !event.allDay; }),
        periodStart: startOfView,
        periodEnd: endOfView
    }).sort(function (eventA, eventB) {
        return eventA.start.valueOf() - eventB.start.valueOf();
    }).map(function (event) {
        var eventStart = event.start;
        var eventEnd = event.end || eventStart;
        var startsBeforeDay = eventStart < startOfView;
        var endsAfterDay = eventEnd > endOfView;
        var hourHeightModifier = (hourSegments * segmentHeight) / MINUTES_IN_HOUR;
        var top = 0;
        if (eventStart > startOfView) {
            top += __WEBPACK_IMPORTED_MODULE_17_date_fns_difference_in_minutes___default()(eventStart, startOfView);
        }
        top *= hourHeightModifier;
        var startDate = startsBeforeDay ? startOfView : eventStart;
        var endDate = endsAfterDay ? endOfView : eventEnd;
        var height = __WEBPACK_IMPORTED_MODULE_17_date_fns_difference_in_minutes___default()(endDate, startDate);
        if (!event.end) {
            height = segmentHeight;
        }
        else {
            height *= hourHeightModifier;
        }
        var bottom = top + height;
        var overlappingPreviousEvents = previousDayEvents.filter(function (previousEvent) {
            var previousEventTop = previousEvent.top;
            var previousEventBottom = previousEvent.top + previousEvent.height;
            if (top < previousEventBottom && previousEventBottom < bottom) {
                return true;
            }
            else if (previousEventTop <= top && bottom <= previousEventBottom) {
                return true;
            }
            return false;
        });
        var left = 0;
        while (overlappingPreviousEvents.some(function (previousEvent) { return previousEvent.left === left; })) {
            left += eventWidth;
        }
        var dayEvent = {
            event: event,
            height: height,
            width: eventWidth,
            top: top,
            left: left,
            startsBeforeDay: startsBeforeDay,
            endsAfterDay: endsAfterDay
        };
        if (height > 0) {
            previousDayEvents.push(dayEvent);
        }
        return dayEvent;
    }).filter(function (dayEvent) { return dayEvent.height > 0; });
    var width = Math.max.apply(Math, dayViewEvents.map(function (event) { return event.left + event.width; }));
    var allDayEvents = getEventsInPeriod({
        events: events.filter(function (event) { return event.allDay; }),
        periodStart: __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(startOfView),
        periodEnd: __WEBPACK_IMPORTED_MODULE_0_date_fns_end_of_day___default()(endOfView)
    });
    return {
        events: dayViewEvents,
        width: width,
        allDayEvents: allDayEvents
    };
}
function getDayViewHourGrid(_a) {
    var viewDate = _a.viewDate, hourSegments = _a.hourSegments, dayStart = _a.dayStart, dayEnd = _a.dayEnd;
    var hours = [];
    var startOfView = __WEBPACK_IMPORTED_MODULE_15_date_fns_set_minutes___default()(__WEBPACK_IMPORTED_MODULE_14_date_fns_set_hours___default()(__WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(viewDate), dayStart.hour), dayStart.minute);
    var endOfView = __WEBPACK_IMPORTED_MODULE_15_date_fns_set_minutes___default()(__WEBPACK_IMPORTED_MODULE_14_date_fns_set_hours___default()(__WEBPACK_IMPORTED_MODULE_16_date_fns_start_of_minute___default()(__WEBPACK_IMPORTED_MODULE_0_date_fns_end_of_day___default()(viewDate)), dayEnd.hour), dayEnd.minute);
    var segmentDuration = MINUTES_IN_HOUR / hourSegments;
    var startOfViewDay = __WEBPACK_IMPORTED_MODULE_3_date_fns_start_of_day___default()(viewDate);
    for (var i = 0; i < HOURS_IN_DAY; i++) {
        var segments = [];
        for (var j = 0; j < hourSegments; j++) {
            var date = __WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes___default()(__WEBPACK_IMPORTED_MODULE_18_date_fns_add_hours___default()(startOfViewDay, i), j * segmentDuration);
            if (date >= startOfView && date < endOfView) {
                segments.push({
                    date: date,
                    isStart: j === 0
                });
            }
        }
        if (segments.length > 0) {
            hours.push({ segments: segments });
        }
    }
    return hours;
}
//# sourceMappingURL=calendarUtils.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * var result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getTime() - dateRight.getTime()
}

module.exports = differenceInMilliseconds


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./mwlCalendar.js": 35,
	"./mwlCalendarDay.js": 36,
	"./mwlCalendarHourList.js": 37,
	"./mwlCalendarMonth.js": 38,
	"./mwlCalendarSlideBox.js": 39,
	"./mwlCalendarWeek.js": 40,
	"./mwlCalendarYear.js": 41,
	"./mwlCollapseFallback.js": 42,
	"./mwlDateModifier.js": 43,
	"./mwlDragSelect.js": 44,
	"./mwlDraggable.js": 45,
	"./mwlDroppable.js": 46,
	"./mwlDynamicDirectiveTemplate.js": 47,
	"./mwlElementDimensions.js": 48,
	"./mwlResizable.js": 49
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 7;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./calendarDate.js": 51,
	"./calendarLimitTo.js": 52,
	"./calendarTruncateEventTitle.js": 53,
	"./calendarTrustAsHtml.js": 54
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 8;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./calendarConfig.js": 55,
	"./calendarEventTitle.js": 56,
	"./calendarHelper.js": 57,
	"./calendarTitle.js": 58,
	"./interact.js": 59,
	"./moment.js": 60
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 9;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays (dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate)
  var amount = Number(dirtyAmount)
  date.setDate(date.getDate() + amount)
  return date
}

module.exports = addDays


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(2)

var MILLISECONDS_IN_HOUR = 3600000

/**
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be added
 * @returns {Date} the new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * var result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
function addHours (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR)
}

module.exports = addHours


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(2)

var MILLISECONDS_IN_MINUTE = 60000

/**
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added
 * @returns {Date} the new date with the minutes added
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE)
}

module.exports = addMinutes


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var addMilliseconds = __webpack_require__(2)

/**
 * @category Second Helpers
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be added
 * @returns {Date} the new date with the seconds added
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * var result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
function addSeconds (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMilliseconds(dirtyDate, amount * 1000)
}

module.exports = addSeconds


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * var result = compareAsc(
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * )
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * var result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var timeLeft = dateLeft.getTime()
  var dateRight = parse(dirtyDateRight)
  var timeRight = dateRight.getTime()

  if (timeLeft < timeRight) {
    return -1
  } else if (timeLeft > timeRight) {
    return 1
  } else {
    return 0
  }
}

module.exports = compareAsc


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(3)

var MILLISECONDS_IN_MINUTE = 60000
var MILLISECONDS_IN_DAY = 86400000

/**
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft)
  var startOfDayRight = startOfDay(dirtyDateRight)

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

module.exports = differenceInCalendarDays


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)
var differenceInCalendarDays = __webpack_require__(15)
var compareAsc = __webpack_require__(14)

/**
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full days
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 */
function differenceInDays (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var sign = compareAsc(dateLeft, dateRight)
  var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight))
  dateLeft.setDate(dateLeft.getDate() - sign * difference)

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastDayNotFull = compareAsc(dateLeft, dateRight) === -sign
  return sign * (difference - isLastDayNotFull)
}

module.exports = differenceInDays


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var differenceInMilliseconds = __webpack_require__(5)

var MILLISECONDS_IN_MINUTE = 60000

/**
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the number of minutes between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of minutes
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * var result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 */
function differenceInMinutes (dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

module.exports = differenceInMinutes


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var differenceInMilliseconds = __webpack_require__(5)

/**
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of seconds
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * var result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
function differenceInSeconds (dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / 1000
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

module.exports = differenceInSeconds


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * var result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfDay


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var month = date.getMonth()
  date.setFullYear(date.getFullYear(), month + 1, 0)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfMonth


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

  var date = parse(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn)

  date.setDate(date.getDate() + diff)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfWeek


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of week
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * var result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay (dirtyDate) {
  var date = parse(dirtyDate)
  var day = date.getDay()
  return day
}

module.exports = getDay


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

module.exports = isDate


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(3)

/**
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(
 *   new Date(2014, 8, 4, 6, 0),
 *   new Date(2014, 8, 4, 18, 0)
 * )
 * //=> true
 */
function isSameDay (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft)
  var dateRightStartOfDay = startOfDay(dirtyDateRight)

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}

module.exports = isSameDay


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameMonth (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
}

module.exports = isSameMonth


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var startOfSecond = __webpack_require__(33)

/**
 * @category Second Helpers
 * @summary Are the given dates in the same second?
 *
 * @description
 * Are the given dates in the same second?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same second
 *
 * @example
 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500
 * // in the same second?
 * var result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 30, 15),
 *   new Date(2014, 8, 4, 6, 30, 15, 500)
 * )
 * //=> true
 */
function isSameSecond (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfSecond = startOfSecond(dirtyDateLeft)
  var dateRightStartOfSecond = startOfSecond(dirtyDateRight)

  return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime()
}

module.exports = isSameSecond


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @param {...(Date|String|Number)} dates - the dates to compare
 * @returns {Date} the latest of the dates
 *
 * @example
 * // Which of these dates is the latest?
 * var result = max(
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * )
 * //=> Sun Jul 02 1995 00:00:00
 */
function max () {
  var dirtyDates = Array.prototype.slice.call(arguments)
  var dates = dirtyDates.map(function (dirtyDate) {
    return parse(dirtyDate)
  })
  var latestTimestamp = Math.max.apply(null, dates)
  return new Date(latestTimestamp)
}

module.exports = max


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Common Helpers
 * @summary Return the earliest of the given dates.
 *
 * @description
 * Return the earliest of the given dates.
 *
 * @param {...(Date|String|Number)} dates - the dates to compare
 * @returns {Date} the earliest of the dates
 *
 * @example
 * // Which of these dates is the earliest?
 * var result = min(
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * )
 * //=> Wed Feb 11 1987 00:00:00
 */
function min () {
  var dirtyDates = Array.prototype.slice.call(arguments)
  var dates = dirtyDates.map(function (dirtyDate) {
    return parse(dirtyDate)
  })
  var earliestTimestamp = Math.min.apply(null, dates)
  return new Date(earliestTimestamp)
}

module.exports = min


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} hours - the hours of the new date
 * @returns {Date} the new date with the hours setted
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
function setHours (dirtyDate, dirtyHours) {
  var date = parse(dirtyDate)
  var hours = Number(dirtyHours)
  date.setHours(hours)
  return date
}

module.exports = setHours


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} minutes - the minutes of the new date
 * @returns {Date} the new date with the minutes setted
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * var result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
function setMinutes (dirtyDate, dirtyMinutes) {
  var date = parse(dirtyDate)
  var minutes = Number(dirtyMinutes)
  date.setMinutes(minutes)
  return date
}

module.exports = setMinutes


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Minute Helpers
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a minute
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * var result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
function startOfMinute (dirtyDate) {
  var date = parse(dirtyDate)
  date.setSeconds(0, 0)
  return date
}

module.exports = startOfMinute


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfMonth


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Second Helpers
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * var result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
function startOfSecond (dirtyDate) {
  var date = parse(dirtyDate)
  date.setMilliseconds(0)
  return date
}

module.exports = startOfSecond


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

  var date = parse(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfWeek


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);
var LOG_PREFIX = 'Bootstrap calendar:';

angular
  .module('mwl.calendar')
  .controller('MwlCalendarCtrl', ["$scope", "$log", "$timeout", "$attrs", "$locale", "moment", "calendarTitle", "calendarHelper", function($scope, $log, $timeout, $attrs, $locale, moment, calendarTitle, calendarHelper) {

    var vm = this;

    vm.changeView = function(view, newDay) {
      vm.view = view;
      vm.viewDate = newDay;
    };

    vm.dateClicked = function(date) {

      var rawDate = moment(date).toDate();

      var nextView = {
        year: 'month',
        month: 'day',
        week: 'day'
      };

      if (vm.onViewChangeClick({calendarDate: rawDate, calendarNextView: nextView[vm.view]}) !== false) {
        vm.changeView(nextView[vm.view], rawDate);
      }

    };

    vm.$onInit = function() {

      if (vm.slideBoxDisabled) {
        $log.warn(LOG_PREFIX, 'The `slide-box-disabled` option is deprecated and will be removed in the next release. ' +
          'Instead set `cell-auto-open-disabled` to true');
      }

      vm.events = vm.events || [];

      var previousDate = moment(vm.viewDate);
      var previousView = vm.view;

      function checkEventIsValid(event) {
        if (!event.startsAt) {
          $log.warn(LOG_PREFIX, 'Event is missing the startsAt field', event);
        } else if (!angular.isDate(event.startsAt)) {
          $log.warn(LOG_PREFIX, 'Event startsAt should be a javascript date object. Do `new Date(event.startsAt)` to fix it.', event);
        }

        if (event.endsAt) {
          if (!angular.isDate(event.endsAt)) {
            $log.warn(LOG_PREFIX, 'Event endsAt should be a javascript date object. Do `new Date(event.endsAt)` to fix it.', event);
          }
          if (moment(event.startsAt).isAfter(moment(event.endsAt))) {
            $log.warn(LOG_PREFIX, 'Event cannot start after it finishes', event);
          }
        }
      }

      function refreshCalendar() {

        if (calendarTitle[vm.view] && angular.isDefined($attrs.viewTitle)) {
          vm.viewTitle = calendarTitle[vm.view](vm.viewDate);
        }

        vm.events.forEach(function(event, index) {
          checkEventIsValid(event);
          event.calendarEventId = index;
        });

        //if on-timespan-click="calendarDay = calendarDate" is set then don't update the view as nothing needs to change
        var currentDate = moment(vm.viewDate);
        var shouldUpdate = true;
        if (
          previousDate.clone().startOf(vm.view).isSame(currentDate.clone().startOf(vm.view)) &&
          !previousDate.isSame(currentDate) &&
          vm.view === previousView
        ) {
          shouldUpdate = false;
        }
        previousDate = currentDate;
        previousView = vm.view;

        if (shouldUpdate) {
          // a $timeout is required as $broadcast is synchronous so if a new events array is set the calendar won't update
          $timeout(function() {
            $scope.$broadcast('calendar.refreshView');
          });
        }
      }

      calendarHelper.loadTemplates().then(function() {
        vm.templatesLoaded = true;

        var eventsWatched = false;

        //Refresh the calendar when any of these variables change.
        $scope.$watchGroup([
          'vm.viewDate',
          'vm.view',
          'vm.cellIsOpen',
          function() {
            return moment.locale() + $locale.id; //Auto update the calendar when the locale changes
          }
        ], function() {
          if (!eventsWatched) {
            eventsWatched = true;
            //need to deep watch events hence why it isn't included in the watch group
            $scope.$watch('vm.events', refreshCalendar, true); //this will call refreshCalendar when the watcher starts (i.e. now)
          } else {
            refreshCalendar();
          }
        });

      }).catch(function(err) {
        $log.error('Could not load all calendar templates', err);
      });

    };

    if (angular.version.minor < 5) {
      vm.$onInit();
    }

  }])
  .directive('mwlCalendar', function() {

    return {
      template: '<div mwl-dynamic-directive-template name="calendar" overrides="vm.customTemplateUrls"></div>',
      restrict: 'E',
      scope: {
        events: '=',
        view: '=',
        viewTitle: '=?',
        viewDate: '=',
        cellIsOpen: '=?',
        cellAutoOpenDisabled: '=?',
        slideBoxDisabled: '=?',
        customTemplateUrls: '=?',
        draggableAutoScroll: '=?',
        onEventClick: '&',
        onEventTimesChanged: '&',
        onTimespanClick: '&',
        onDateRangeSelect: '&?',
        onViewChangeClick: '&',
        cellModifier: '&',
        dayViewStart: '@',
        dayViewEnd: '@',
        dayViewSplit: '@',
        dayViewEventChunkSize: '@',
        dayViewEventWidth: '@',
        templateScope: '=?',
        dayViewTimePosition: '@'
      },
      controller: 'MwlCalendarCtrl as vm',
      bindToController: true
    };

  });


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlCalendarDayCtrl', ["$scope", "moment", "calendarHelper", "calendarEventTitle", function($scope, moment, calendarHelper, calendarEventTitle) {

    var vm = this;

    vm.calendarEventTitle = calendarEventTitle;

    function refreshView() {

      vm.timeHidden = vm.dayViewTimePosition === 'hidden';
      vm.dayViewTimePositionOffset = vm.dayViewTimePosition !== 'default' ? 0 : 60;

      vm.dayViewSplit = vm.dayViewSplit || 30;
      vm.dayViewHeight = calendarHelper.getDayViewHeight(
        vm.dayViewStart,
        vm.dayViewEnd,
        vm.dayViewSplit
      );

      var view = calendarHelper.getDayView(
        vm.events,
        vm.viewDate,
        vm.dayViewStart,
        vm.dayViewEnd,
        vm.dayViewSplit,
        vm.dayViewEventWidth
      );

      vm.allDayEvents = view.allDayEvents;
      vm.nonAllDayEvents = view.events;
      vm.viewWidth = view.width + 62;

    }

    $scope.$on('calendar.refreshView', refreshView);

    $scope.$watchGroup([
      'vm.dayViewStart',
      'vm.dayViewEnd',
      'vm.dayViewSplit'
    ], refreshView);

    vm.eventDragComplete = function(event, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      var newStart = moment(event.startsAt).add(minutesDiff, 'minutes');
      var newEnd = moment(event.endsAt).add(minutesDiff, 'minutes');
      delete event.tempStartsAt;

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: event.endsAt ? newEnd.toDate() : null
      });
    };

    vm.eventDragged = function(event, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
    };

    vm.eventResizeComplete = function(event, edge, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      var start = moment(event.startsAt);
      var end = moment(event.endsAt);
      if (edge === 'start') {
        start.add(minutesDiff, 'minutes');
      } else {
        end.add(minutesDiff, 'minutes');
      }
      delete event.tempStartsAt;

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarNewEventStart: start.toDate(),
        calendarNewEventEnd: end.toDate()
      });
    };

    vm.eventResized = function(event, edge, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      if (edge === 'start') {
        event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
      }
    };

  }])
  .directive('mwlCalendarDay', function() {

    return {
      template: '<div mwl-dynamic-directive-template name="calendarDayView" overrides="vm.customTemplateUrls"></div>',
      restrict: 'E',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        viewDate: '=',
        onEventClick: '=',
        onEventTimesChanged: '=',
        onTimespanClick: '=',
        onDateRangeSelect: '=',
        dayViewStart: '=',
        dayViewEnd: '=',
        dayViewSplit: '=',
        dayViewEventChunkSize: '=',
        dayViewEventWidth: '=',
        customTemplateUrls: '=?',
        cellModifier: '=',
        templateScope: '=',
        dayViewTimePosition: '=',
        draggableAutoScroll: '='
      },
      controller: 'MwlCalendarDayCtrl as vm',
      bindToController: true
    };

  });


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);
var calendarUtils = __webpack_require__(4);

angular
  .module('mwl.calendar')
  .controller('MwlCalendarHourListCtrl', ["$scope", "$document", "moment", "calendarHelper", function($scope, $document, moment, calendarHelper) {
    var vm = this;

    // source: http://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
    function getScrollbarWidth() {
      var outer = $document[0].createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.width = '100px';
      outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

      $document[0].body.appendChild(outer);

      var widthNoScroll = outer.offsetWidth;
      // force scrollbars
      outer.style.overflow = 'scroll';

      // add innerdiv
      var inner = $document[0].createElement('div');
      inner.style.width = '100%';
      outer.appendChild(inner);

      var widthWithScroll = inner.offsetWidth;

      // remove divs
      outer.parentNode.removeChild(outer);

      return widthNoScroll - widthWithScroll;
    }

    vm.scrollBarWidth = getScrollbarWidth();

    function updateDays() {

      vm.dayViewSplit = parseInt(vm.dayViewSplit);
      var dayStart = (vm.dayViewStart || '00:00').split(':');
      var dayEnd = (vm.dayViewEnd || '23:59').split(':');
      vm.hourGrid = calendarUtils.getDayViewHourGrid({
        viewDate: vm.view === 'week' ? moment(vm.viewDate).startOf('week').toDate() : moment(vm.viewDate).toDate(),
        hourSegments: 60 / vm.dayViewSplit,
        dayStart: {
          hour: dayStart[0],
          minute: dayStart[1]
        },
        dayEnd: {
          hour: dayEnd[0],
          minute: dayEnd[1]
        }
      });

      vm.hourGrid.forEach(function(hour) {
        hour.segments.forEach(function(segment) {

          segment.date = moment(segment.date);
          segment.nextSegmentDate = segment.date.clone().add(vm.dayViewSplit, 'minutes');

          if (vm.view === 'week') {

            segment.days = [];

            for (var i = 0; i < 7; i++) {
              var day = {
                date: moment(segment.date).add(i, 'days')
              };
              day.nextSegmentDate = day.date.clone().add(vm.dayViewSplit, 'minutes');
              vm.cellModifier({calendarCell: day});
              segment.days.push(day);
            }

          } else {
            vm.cellModifier({calendarCell: segment});
          }

        });
      });

    }

    var originalLocale = moment.locale();

    $scope.$on('calendar.refreshView', function() {

      if (originalLocale !== moment.locale()) {
        originalLocale = moment.locale();
        updateDays();
      }

    });

    $scope.$watchGroup([
      'vm.dayViewStart',
      'vm.dayViewEnd',
      'vm.dayViewSplit',
      'vm.viewDate'
    ], function() {
      updateDays();
    });

    vm.eventDropped = function(event, date) {
      var newStart = moment(date);
      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarDate: date,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd ? newEnd.toDate() : null
      });
    };

    vm.onDragSelectStart = function(date, dayIndex) {
      if (!vm.dateRangeSelect) {
        vm.dateRangeSelect = {
          active: true,
          startDate: date,
          endDate: date,
          dayIndex: dayIndex
        };
      }
    };

    vm.onDragSelectMove = function(date) {
      if (vm.dateRangeSelect) {
        vm.dateRangeSelect.endDate = date;
      }
    };

    vm.onDragSelectEnd = function(date) {
      if (vm.dateRangeSelect) {
        vm.dateRangeSelect.endDate = date;
        if (vm.dateRangeSelect.endDate > vm.dateRangeSelect.startDate) {
          vm.onDateRangeSelect({
            calendarRangeStartDate: vm.dateRangeSelect.startDate.toDate(),
            calendarRangeEndDate: vm.dateRangeSelect.endDate.toDate()
          });
        }
        delete vm.dateRangeSelect;
      }
    };

  }])
  .directive('mwlCalendarHourList', function() {

    return {
      restrict: 'E',
      template: '<div mwl-dynamic-directive-template name="calendarHourList" overrides="vm.customTemplateUrls"></div>',
      controller: 'MwlCalendarHourListCtrl as vm',
      scope: {
        viewDate: '=',
        dayViewStart: '=',
        dayViewEnd: '=',
        dayViewSplit: '=',
        dayWidth: '=?',
        onTimespanClick: '=',
        onDateRangeSelect: '=',
        onEventTimesChanged: '=',
        customTemplateUrls: '=?',
        cellModifier: '=',
        templateScope: '=',
        view: '@'
      },
      bindToController: true
    };

  });


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlCalendarMonthCtrl', ["$scope", "moment", "calendarHelper", "calendarConfig", "calendarEventTitle", function($scope, moment, calendarHelper, calendarConfig, calendarEventTitle) {

    var vm = this;
    vm.calendarConfig = calendarConfig;
    vm.calendarEventTitle = calendarEventTitle;
    vm.openRowIndex = null;

    function toggleCell() {
      vm.openRowIndex = null;
      vm.openDayIndex = null;

      if (vm.cellIsOpen && vm.view) {
        vm.view.forEach(function(day, dayIndex) {
          if (moment(vm.viewDate).startOf('day').isSame(day.date)) {
            vm.openDayIndex = dayIndex;
            vm.openRowIndex = Math.floor(dayIndex / 7);
          }
        });
      }
    }

    $scope.$on('calendar.refreshView', function() {

      vm.weekDays = calendarHelper.getWeekDayNames();

      var monthView = calendarHelper.getMonthView(vm.events, vm.viewDate, vm.cellModifier);
      vm.view = monthView.days;
      vm.monthOffsets = monthView.rowOffsets;

      if (vm.cellAutoOpenDisabled) {
        toggleCell();
      } else if (!vm.cellAutoOpenDisabled && vm.cellIsOpen && vm.openRowIndex === null) {
        //Auto open the calendar to the current day if set
        vm.openDayIndex = null;
        vm.view.forEach(function(day) {
          if (day.inMonth && moment(vm.viewDate).startOf('day').isSame(day.date)) {
            vm.dayClicked(day, true);
          }
        });
      }

    });

    vm.dayClicked = function(day, dayClickedFirstRun, $event) {

      if (!dayClickedFirstRun) {
        vm.onTimespanClick({
          calendarDate: day.date.toDate(),
          calendarCell: day,
          $event: $event
        });
        if ($event && $event.defaultPrevented) {
          return;
        }
      }

      if (!vm.cellAutoOpenDisabled) {
        vm.openRowIndex = null;
        var dayIndex = vm.view.indexOf(day);
        if (dayIndex === vm.openDayIndex) { //the day has been clicked and is already open
          vm.openDayIndex = null; //close the open day
          vm.cellIsOpen = false;
        } else {
          vm.openDayIndex = dayIndex;
          vm.openRowIndex = Math.floor(dayIndex / 7);
          vm.cellIsOpen = true;
        }
      }

    };

    vm.highlightEvent = function(event, shouldAddClass) {

      vm.view.forEach(function(day) {
        delete day.highlightClass;
        delete day.backgroundColor;
        if (shouldAddClass) {
          var dayContainsEvent = day.events.indexOf(event) > -1;
          if (dayContainsEvent) {
            day.backgroundColor = event.color ? event.color.secondary : '';
          }
        }
      });

    };

    vm.handleEventDrop = function(event, newDayDate, draggedFromDate) {

      var newStart = moment(event.startsAt)
        .year(moment(newDayDate).year())
        .month(moment(newDayDate).month())
        .date(moment(newDayDate).date());

      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarDate: newDayDate,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd ? newEnd.toDate() : null,
        calendarDraggedFromDate: draggedFromDate
      });
    };

    vm.getWeekNumberLabel = function(day) {
      var weekNumber = day.date.clone().add(1, 'day').isoWeek();
      if (typeof calendarConfig.i18nStrings.weekNumber === 'function') {
        return calendarConfig.i18nStrings.weekNumber({weekNumber: weekNumber});
      } else {
        return calendarConfig.i18nStrings.weekNumber.replace('{week}', weekNumber);
      }
    };

    vm.onDragSelectStart = function(day) {
      if (!vm.dateRangeSelect) {
        vm.dateRangeSelect = {
          startDate: day.date,
          endDate: day.date
        };
      }
    };

    vm.onDragSelectMove = function(day) {
      if (vm.dateRangeSelect) {
        vm.dateRangeSelect.endDate = day.date;
      }
    };

    vm.onDragSelectEnd = function(day) {
      if (vm.dateRangeSelect) {
        vm.dateRangeSelect.endDate = day.date;
        if (vm.dateRangeSelect.endDate > vm.dateRangeSelect.startDate) {
          vm.onDateRangeSelect({
            calendarRangeStartDate: vm.dateRangeSelect.startDate.clone().startOf('day').toDate(),
            calendarRangeEndDate: vm.dateRangeSelect.endDate.clone().endOf('day').toDate()
          });
        }
        delete vm.dateRangeSelect;
      }
    };

    vm.$onInit = function() {

      if (vm.cellAutoOpenDisabled) {
        $scope.$watchGroup([
          'vm.cellIsOpen',
          'vm.viewDate'
        ], toggleCell);
      }

    };

    if (angular.version.minor < 5) {
      vm.$onInit();
    }

  }])
  .directive('mwlCalendarMonth', function() {

    return {
      template: '<div mwl-dynamic-directive-template name="calendarMonthView" overrides="vm.customTemplateUrls"></div>',
      restrict: 'E',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        viewDate: '=',
        onEventClick: '=',
        onEventTimesChanged: '=',
        onDateRangeSelect: '=',
        cellIsOpen: '=',
        cellAutoOpenDisabled: '=',
        onTimespanClick: '=',
        cellModifier: '=',
        slideBoxDisabled: '=',
        customTemplateUrls: '=?',
        templateScope: '=',
        draggableAutoScroll: '='
      },
      controller: 'MwlCalendarMonthCtrl as vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      },
      bindToController: true
    };

  });


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlCalendarSlideBoxCtrl', ["$scope", "$timeout", "calendarConfig", "calendarEventTitle", function($scope, $timeout, calendarConfig, calendarEventTitle) {

    var vm = this;
    vm.calendarConfig = calendarConfig;
    vm.calendarEventTitle = calendarEventTitle;

    vm.isCollapsed = true;
    $scope.$watch('vm.isOpen', function(isOpen) {
      //events must be populated first to set the element height before animation will work
      $timeout(function() {
        vm.isCollapsed = !isOpen;
      });
    });

  }])
  .directive('mwlCalendarSlideBox', function() {

    return {
      restrict: 'E',
      template: '<div mwl-dynamic-directive-template name="calendarSlideBox" overrides="vm.customTemplateUrls"></div>',
      replace: true,
      controller: 'MwlCalendarSlideBoxCtrl as vm',
      require: ['^?mwlCalendarMonth', '^?mwlCalendarYear'],
      link: function(scope, elm, attrs, ctrls) {
        scope.isMonthView = !!ctrls[0];
        scope.isYearView = !!ctrls[1];
      },
      scope: {
        isOpen: '=',
        events: '=',
        onEventClick: '=',
        cell: '=',
        customTemplateUrls: '=?',
        templateScope: '=',
        draggableAutoScroll: '='
      },
      bindToController: true
    };

  });


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlCalendarWeekCtrl', ["$scope", "moment", "calendarHelper", "calendarConfig", "calendarEventTitle", function($scope, moment, calendarHelper, calendarConfig, calendarEventTitle) {

    var vm = this;

    vm.showTimes = calendarConfig.showTimesOnWeekView;
    vm.calendarEventTitle = calendarEventTitle;

    $scope.$on('calendar.refreshView', function() {
      vm.dayViewSplit = vm.dayViewSplit || 30;
      vm.dayViewHeight = calendarHelper.getDayViewHeight(
        vm.dayViewStart,
        vm.dayViewEnd,
        vm.dayViewSplit
      );
      if (vm.showTimes) {
        vm.view = calendarHelper.getWeekViewWithTimes(
          vm.events,
          vm.viewDate,
          vm.dayViewStart,
          vm.dayViewEnd,
          vm.dayViewSplit
        );
      } else {
        vm.view = calendarHelper.getWeekView(vm.events, vm.viewDate);
      }
    });

    vm.weekDragged = function(event, daysDiff, minuteChunksMoved) {

      var newStart = moment(event.startsAt).add(daysDiff, 'days');
      var newEnd = moment(event.endsAt).add(daysDiff, 'days');

      if (minuteChunksMoved) {
        var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
        newStart = newStart.add(minutesDiff, 'minutes');
        newEnd = newEnd.add(minutesDiff, 'minutes');
      }

      delete event.tempStartsAt;

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: event.endsAt ? newEnd.toDate() : null
      });
    };

    vm.eventDropped = function(event, date) {
      var daysDiff = moment(date).diff(moment(event.startsAt), 'days');
      vm.weekDragged(event, daysDiff);
    };

    vm.weekResized = function(event, edge, daysDiff) {

      var start = moment(event.startsAt);
      var end = moment(event.endsAt);
      if (edge === 'start') {
        start.add(daysDiff, 'days');
      } else {
        end.add(daysDiff, 'days');
      }

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarNewEventStart: start.toDate(),
        calendarNewEventEnd: end.toDate()
      });

    };

    vm.tempTimeChanged = function(event, minuteChunksMoved) {
      var minutesDiff = minuteChunksMoved * vm.dayViewSplit;
      event.tempStartsAt = moment(event.startsAt).add(minutesDiff, 'minutes').toDate();
    };

  }])
  .directive('mwlCalendarWeek', function() {

    return {
      template: '<div mwl-dynamic-directive-template name="calendarWeekView" overrides="vm.customTemplateUrls"></div>',
      restrict: 'E',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        viewDate: '=',
        onEventClick: '=',
        onEventTimesChanged: '=',
        dayViewStart: '=',
        dayViewEnd: '=',
        dayViewSplit: '=',
        dayViewEventChunkSize: '=',
        onTimespanClick: '=',
        onDateRangeSelect: '=',
        customTemplateUrls: '=?',
        cellModifier: '=',
        templateScope: '=',
        draggableAutoScroll: '='
      },
      controller: 'MwlCalendarWeekCtrl as vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      },
      bindToController: true
    };

  });


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlCalendarYearCtrl', ["$scope", "moment", "calendarHelper", function($scope, moment, calendarHelper) {

    var vm = this;
    vm.openMonthIndex = null;

    function toggleCell() {
      vm.openRowIndex = null;
      vm.openMonthIndex = null;

      if (vm.cellIsOpen && vm.view) {
        vm.view.forEach(function(month, monthIndex) {
          if (moment(vm.viewDate).startOf('month').isSame(month.date)) {
            vm.openMonthIndex = monthIndex;
            vm.openRowIndex = Math.floor(monthIndex / 4);
          }
        });
      }
    }

    $scope.$on('calendar.refreshView', function() {
      vm.view = calendarHelper.getYearView(vm.events, vm.viewDate, vm.cellModifier);

      if (vm.cellAutoOpenDisabled) {
        toggleCell();
      } else if (!vm.cellAutoOpenDisabled && vm.cellIsOpen && vm.openMonthIndex === null) {
        //Auto open the calendar to the current day if set
        vm.openMonthIndex = null;
        vm.view.forEach(function(month) {
          if (moment(vm.viewDate).startOf('month').isSame(month.date)) {
            vm.monthClicked(month, true);
          }
        });
      }

    });

    vm.monthClicked = function(month, monthClickedFirstRun, $event) {

      if (!monthClickedFirstRun) {
        vm.onTimespanClick({
          calendarDate: month.date.toDate(),
          calendarCell: month,
          $event: $event
        });
        if ($event && $event.defaultPrevented) {
          return;
        }
      }

      if (!vm.cellAutoOpenDisabled) {
        vm.openRowIndex = null;
        var monthIndex = vm.view.indexOf(month);
        if (monthIndex === vm.openMonthIndex) { //the month has been clicked and is already open
          vm.openMonthIndex = null; //close the open month
          vm.cellIsOpen = false;
        } else {
          vm.openMonthIndex = monthIndex;
          vm.openRowIndex = Math.floor(monthIndex / 4);
          vm.cellIsOpen = true;
        }
      }

    };

    vm.handleEventDrop = function(event, newMonthDate) {
      var newStart = moment(event.startsAt)
        .year(moment(newMonthDate).year())
        .month(moment(newMonthDate).month());
      var newEnd = calendarHelper.adjustEndDateFromStartDiff(event.startsAt, newStart, event.endsAt);

      vm.onEventTimesChanged({
        calendarEvent: event,
        calendarDate: newMonthDate,
        calendarNewEventStart: newStart.toDate(),
        calendarNewEventEnd: newEnd ? newEnd.toDate() : null
      });
    };

    vm.$onInit = function() {

      if (vm.cellAutoOpenDisabled) {
        $scope.$watchGroup([
          'vm.cellIsOpen',
          'vm.viewDate'
        ], toggleCell);
      }

    };

    if (angular.version.minor < 5) {
      vm.$onInit();
    }

  }])
  .directive('mwlCalendarYear', function() {

    return {
      template: '<div mwl-dynamic-directive-template name="calendarYearView" overrides="vm.customTemplateUrls"></div>',
      restrict: 'E',
      require: '^mwlCalendar',
      scope: {
        events: '=',
        viewDate: '=',
        onEventClick: '=',
        onEventTimesChanged: '=',
        cellIsOpen: '=',
        cellAutoOpenDisabled: '=',
        onTimespanClick: '=',
        cellModifier: '=',
        slideBoxDisabled: '=',
        customTemplateUrls: '=?',
        templateScope: '='
      },
      controller: 'MwlCalendarYearCtrl as vm',
      link: function(scope, element, attrs, calendarCtrl) {
        scope.vm.calendarCtrl = calendarCtrl;
      },
      bindToController: true
    };

  });


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlCollapseFallbackCtrl', ["$scope", "$attrs", "$element", function($scope, $attrs, $element) {

    $scope.$watch($attrs.mwlCollapseFallback, function(shouldCollapse) {
      if (shouldCollapse) {
        $element.addClass('ng-hide');
      } else {
        $element.removeClass('ng-hide');
      }
    });

  }])
  .directive('mwlCollapseFallback', ["$injector", function($injector) {

    if ($injector.has('uibCollapseDirective')) {
      return {};
    }

    return {
      restrict: 'A',
      controller: 'MwlCollapseFallbackCtrl'
    };

  }]);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlDateModifierCtrl', ["$element", "$attrs", "$scope", "moment", function($element, $attrs, $scope, moment) {

    var vm = this;

    function onClick() {
      if (angular.isDefined($attrs.setToToday)) {
        vm.date = new Date();
      } else if (angular.isDefined($attrs.increment)) {
        vm.date = moment(vm.date).add(1, vm.increment).toDate();
      } else if (angular.isDefined($attrs.decrement)) {
        vm.date = moment(vm.date).subtract(1, vm.decrement).toDate();
      }
      $scope.$apply();
    }

    $element.bind('click', onClick);

    $scope.$on('$destroy', function() {
      $element.unbind('click', onClick);
    });

  }])
  .directive('mwlDateModifier', function() {

    return {
      restrict: 'A',
      controller: 'MwlDateModifierCtrl as vm',
      scope: {
        date: '=',
        increment: '=',
        decrement: '='
      },
      bindToController: true
    };

  });


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlDragSelectCtrl', ["$scope", "$element", "$parse", "$attrs", function($scope, $element, $parse, $attrs) {

    function handleMouseEvent(callbackName) {
      return function(event) {
        if (callbackName && event.button !== 2) {
          $parse(callbackName)($scope);
          $scope.$apply();
        }
        event.preventDefault();
      };
    }

    var onMouseDown = handleMouseEvent($attrs.onDragSelectStart);
    var onMouseMove = handleMouseEvent($attrs.onDragSelectMove);
    var onMouseUp = handleMouseEvent($attrs.onDragSelectEnd);

    function enableMouseListeners() {
      $element.on('mousedown', onMouseDown);
      $element.on('mousemove', onMouseMove);
      $element.on('mouseup', onMouseUp);
    }

    function disableMouseListeners() {
      $element.off('mousedown', onMouseDown);
      $element.off('mousemove', onMouseMove);
      $element.off('mouseup', onMouseUp);
    }

    $scope.$watch($attrs.mwlDragSelect, function(isEnabled) {
      if (isEnabled) {
        enableMouseListeners();
      } else {
        disableMouseListeners();
      }
    });

    $scope.$on('$destroy', function() {
      disableMouseListeners();
    });

  }])
  .directive('mwlDragSelect', function() {

    return {
      restrict: 'A',
      controller: 'MwlDragSelectCtrl'
    };

  });


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlDraggableCtrl', ["$element", "$scope", "$window", "$parse", "$attrs", "$timeout", "interact", function($element, $scope, $window, $parse, $attrs, $timeout, interact) {

    if (!interact) {
      return;
    }

    var snap, snapGridDimensions;
    if ($attrs.snapGrid) {
      snapGridDimensions = $parse($attrs.snapGrid)($scope);
      snap = {
        targets: [
          interact.createSnapGrid(snapGridDimensions)
        ]
      };
    }

    function translateElement(elm, transformValue) {
      return elm
        .css('-ms-transform', transformValue)
        .css('-webkit-transform', transformValue)
        .css('transform', transformValue);
    }

    var autoScroll = $parse($attrs.autoScroll)($scope);
    if (typeof autoScroll === 'undefined') {
      autoScroll = true;
    }

    interact($element[0]).draggable({
      autoScroll: autoScroll,
      snap: snap,
      onstart: function(event) {
        angular.element(event.target).addClass('dragging-active');
        event.target.dropData = $parse($attrs.dropData)($scope);
        event.target.style.pointerEvents = 'none';
        if ($attrs.onDragStart) {
          $parse($attrs.onDragStart)($scope);
          $scope.$apply();
        }
      },
      onmove: function(event) {

        var elm = angular.element(event.target);
        var x = (parseFloat(elm.attr('data-x')) || 0) + (event.dx || 0);
        var y = (parseFloat(elm.attr('data-y')) || 0) + (event.dy || 0);

        switch ($parse($attrs.axis)($scope)) {
          case 'x':
            y = 0;
            break;

          case 'y':
            x = 0;
            break;

          default:
        }

        if ($window.getComputedStyle(elm[0]).position === 'static') {
          elm.css('position', 'relative');
        }

        translateElement(elm, 'translate(' + x + 'px, ' + y + 'px)')
          .css('z-index', 50)
          .attr('data-x', x)
          .attr('data-y', y);

        if ($attrs.onDrag) {
          $parse($attrs.onDrag)($scope, {x: x, y: y});
          $scope.$apply();
        }

      },
      onend: function(event) {

        var elm = angular.element(event.target);
        var x = elm.attr('data-x');
        var y = elm.attr('data-y');

        event.target.style.pointerEvents = 'auto';
        if ($attrs.onDragEnd) {
          $parse($attrs.onDragEnd)($scope, {x: x, y: y});
          $scope.$apply();
        }

        $timeout(function() {
          translateElement(elm, '')
            .css('z-index', 'auto')
            .removeAttr('data-x')
            .removeAttr('data-y')
            .removeClass('dragging-active');
        });

      }
    });

    $scope.$watch($attrs.mwlDraggable, function(enabled) {
      interact($element[0]).draggable({
        enabled: enabled
      });
    });

    $scope.$on('$destroy', function() {
      interact($element[0]).unset();
    });

  }])
  .directive('mwlDraggable', function() {

    return {
      restrict: 'A',
      controller: 'MwlDraggableCtrl'
    };

  });


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlDroppableCtrl', ["$element", "$scope", "$parse", "$attrs", "interact", function($element, $scope, $parse, $attrs, interact) {

    if (!interact) {
      return;
    }

    var DROP_ACTIVE_CLASS = $attrs.dropActiveClass || 'drop-active';

    interact($element[0]).dropzone({
      ondragenter: function(event) {
        angular.element(event.target).addClass(DROP_ACTIVE_CLASS);
      },
      ondragleave: function(event) {
        angular.element(event.target).removeClass(DROP_ACTIVE_CLASS);
      },
      ondropdeactivate: function(event) {
        angular.element(event.target).removeClass(DROP_ACTIVE_CLASS);
      },
      ondrop: function(event) {
        if (event.relatedTarget.dropData) {
          $parse($attrs.onDrop)($scope, {dropData: event.relatedTarget.dropData});
          $scope.$apply();
        }
      }
    });

    $scope.$on('$destroy', function() {
      interact($element[0]).unset();
    });

  }])
  .directive('mwlDroppable', function() {

    return {
      restrict: 'A',
      controller: 'MwlDroppableCtrl'
    };

  });


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlDynamicDirectiveTemplateCtrl', ["$compile", "$scope", "$attrs", "$element", "$templateCache", "$log", "calendarConfig", function($compile, $scope, $attrs, $element, $templateCache, $log, calendarConfig) {

    $scope.$watch($attrs.overrides, function(overrides) {

      var templateName = calendarConfig.templates[$attrs.name];
      if (
        overrides &&
        angular.isObject(overrides) &&
        overrides[$attrs.name]
      ) {
        if ($templateCache.get(overrides[$attrs.name])) {
          templateName = overrides[$attrs.name];
        } else {
          $log.warn('Bootstrap Calendar', 'The custom template for ' + overrides[$attrs.name] +
            ' was not found in the template cache. Please ensure it is pre-loaded via a script tag ' +
            '<script type="text/ng-template" id="' + overrides[$attrs.name] + '">Custom template content</script> or ' +
            'via a tool such as https://www.npmjs.com/package/gulp-angular-templatecache');
        }
      }
      var template = $templateCache.get(templateName);
      $element.html(template);
      $compile($element.contents())($scope);

    });

  }])
  .directive('mwlDynamicDirectiveTemplate', function() {

    return {
      restrict: 'A',
      controller: 'MwlDynamicDirectiveTemplateCtrl'
    };

  });


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlElementDimensionsCtrl', ["$element", "$scope", "$parse", "$attrs", "$window", function($element, $scope, $parse, $attrs, $window) {

    function setDimensions() {
      $parse($attrs.mwlElementDimensions).assign($scope, {
        width: $element[0].offsetWidth - 1,
        height: $element[0].offsetHeight
      });
      $scope.$applyAsync();
    }

    var win = angular.element($window);

    win.bind('resize', setDimensions);

    setDimensions();

    $scope.$on('$destroy', function() {
      win.unbind('resize', setDimensions);
    });

  }])
  .directive('mwlElementDimensions', function() {

    return {
      restrict: 'A',
      controller: 'MwlElementDimensionsCtrl'
    };

  });


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .controller('MwlResizableCtrl', ["$element", "$scope", "$parse", "$attrs", "$timeout", "interact", function($element, $scope, $parse, $attrs, $timeout, interact) {

    if (!interact) {
      return;
    }

    var snap, snapGridDimensions;
    if ($attrs.snapGrid) {
      snapGridDimensions = $parse($attrs.snapGrid)($scope);
      snap = {
        targets: [
          interact.createSnapGrid(snapGridDimensions)
        ]
      };
    }

    var originalDimensions = {};
    var originalDimensionsStyle = {};
    var resizeEdge;

    function getUnitsResized(edge, elm) {
      var unitsResized = {};
      unitsResized.edge = edge;
      if (edge === 'start') {
        unitsResized.x = elm.data('x');
        unitsResized.y = elm.data('y');
      } else if (edge === 'end') {
        unitsResized.x = parseFloat(elm.css('width').replace('px', '')) - originalDimensions.width;
        unitsResized.y = parseFloat(elm.css('height').replace('px', '')) - originalDimensions.height;
      }
      return unitsResized;
    }

    interact($element[0]).resizable({
      edges: $parse($attrs.resizeEdges)($scope),
      snap: snap,
      onstart: function(event) {

        resizeEdge = 'end';
        var elm = angular.element(event.target);
        originalDimensions.height = elm[0].offsetHeight;
        originalDimensions.width = elm[0].offsetWidth;
        originalDimensionsStyle.height = elm.css('height');
        originalDimensionsStyle.width = elm.css('width');

      },
      onmove: function(event) {

        if (event.rect.width > 0 && event.rect.height > 0) {
          var elm = angular.element(event.target);
          var x = parseFloat(elm.data('x') || 0);
          var y = parseFloat(elm.data('y') || 0);

          elm.css({
            width: event.rect.width + 'px',
            height: event.rect.height + 'px'
          });

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          elm.css('transform', 'translate(' + x + 'px,' + y + 'px)');

          elm.data('x', x);
          elm.data('y', y);

          if (event.deltaRect.left !== 0 || event.deltaRect.top !== 0) {
            resizeEdge = 'start';
          }

          if ($attrs.onResize) {
            $parse($attrs.onResize)($scope, getUnitsResized(resizeEdge, elm));
            $scope.$apply();
          }

        }

      },
      onend: function(event) {

        var elm = angular.element(event.target);
        var unitsResized = getUnitsResized(resizeEdge, elm);

        $timeout(function() {
          elm
            .data('x', null)
            .data('y', null)
            .css({
              transform: '',
              width: originalDimensionsStyle.width,
              height: originalDimensionsStyle.height
            });
        });

        if ($attrs.onResizeEnd) {
          $parse($attrs.onResizeEnd)($scope, unitsResized);
          $scope.$apply();
        }

      }
    });

    $scope.$watch($attrs.mwlResizable, function(enabled) {
      interact($element[0]).resizable({
        enabled: enabled
      });
    });

    $scope.$on('$destroy', function() {
      interact($element[0]).unset();
    });

  }])
  .directive('mwlResizable', function() {

    return {
      restrict: 'A',
      controller: 'MwlResizableCtrl'
    };

  });


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);

var angular = __webpack_require__(0);

function requireAll(r) {
  r.keys().forEach(r);
}

var templates = {};

if (false) {

  var templatesContext = require.context('./templates', false, /\.html/);

  templatesContext.keys().forEach(function(templateName) {
    var templateNameWithoutPrefix = templateName.replace('./', '');
    var cacheTemplateName = 'mwl/' + templateNameWithoutPrefix;
    var configTemplateName = templateNameWithoutPrefix.replace('.html', '');
    templates[configTemplateName] = {
      cacheTemplateName: cacheTemplateName,
      template: templatesContext(templateName)
    };
  });

}

module.exports = angular
  .module('mwl.calendar', [])
  .config(["calendarConfig", function(calendarConfig) {
    angular.forEach(templates, function(template, templateName) {
      if (!calendarConfig.templates[templateName]) {
        calendarConfig.templates[templateName] = template.cacheTemplateName;
      }
    });
  }])
  .run(["$templateCache", "$interpolate", function($templateCache, $interpolate) {

    angular.forEach(templates, function(template) {
      if (!$templateCache.get(template.cacheTemplateName)) {
        var templateContents = template.template
          .replace('{{', $interpolate.startSymbol())
          .replace('}}', $interpolate.endSymbol());
        $templateCache.put(template.cacheTemplateName, templateContents);
      }
    });

  }]).name;

requireAll(__webpack_require__(7));
requireAll(__webpack_require__(8));
requireAll(__webpack_require__(9));


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .filter('calendarDate', ["calendarHelper", "calendarConfig", function(calendarHelper, calendarConfig) {

    function calendarDate(date, format, getFromConfig) {

      if (getFromConfig === true) {
        format = calendarConfig.dateFormats[format];
      }

      return calendarHelper.formatDate(date, format);

    }

    // This is stateful because the locale can change as well
    // as calendarConfig.dateFormats which would change the value outside of this filter
    calendarDate.$stateful = true;

    return calendarDate;

  }]);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .filter('calendarLimitTo', ["limitToFilter", function(limitToFilter) {

    if (angular.version.minor >= 4) { //1.4+ supports the begin attribute
      return limitToFilter;
    }

    //Copied from the angular source. Only 1.4 has the begin functionality.
    return function(input, limit, begin) {
      if (Math.abs(Number(limit)) === Infinity) {
        limit = Number(limit);
      } else {
        limit = parseInt(limit);
      }
      if (isNaN(limit)) {
        return input;
      }

      if (angular.isNumber(input)) {
        input = input.toString();
      }
      if (!angular.isArray(input) && !angular.isString(input)) {
        return input;
      }

      begin = (!begin || isNaN(begin)) ? 0 : parseInt(begin);
      begin = (begin < 0 && begin >= -input.length) ? input.length + begin : begin;

      if (limit >= 0) {
        return input.slice(begin, begin + limit);
      } else if (begin === 0) {
        return input.slice(limit, input.length);
      } else {
        return input.slice(Math.max(0, begin + limit), begin);
      }
    };

  }]);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .filter('calendarTruncateEventTitle', function() {

    return function(string, length, boxHeight) {
      if (!string) {
        return '';
      }

      //Only truncate if if actually needs truncating
      if (string.length >= length && string.length / 20 > boxHeight / 30) {
        return string.substr(0, length) + '...';
      } else {
        return string;
      }
    };

  });


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .filter('calendarTrustAsHtml', ["$sce", function($sce) {

    return function(text) {
      return $sce.trustAsHtml(text);
    };

  }]);


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .constant('calendarConfig', {
    allDateFormats: {
      angular: {
        date: {
          hour: 'ha',
          day: 'd MMM',
          month: 'MMMM',
          weekDay: 'EEEE',
          time: 'HH:mm',
          datetime: 'MMM d, h:mm a'
        },
        title: {
          day: 'EEEE d MMMM, yyyy',
          week: 'Week {week} of {year}',
          month: 'MMMM yyyy',
          year: 'yyyy'
        }
      },
      moment: {
        date: {
          hour: 'ha',
          day: 'D MMM',
          month: 'MMMM',
          weekDay: 'dddd',
          time: 'HH:mm',
          datetime: 'MMM D, h:mm a'
        },
        title: {
          day: 'dddd D MMMM, YYYY',
          week: 'Week {week} of {year}',
          month: 'MMMM YYYY',
          year: 'YYYY'
        }
      }
    },
    get dateFormats() {
      return this.allDateFormats[this.dateFormatter].date;
    },
    get titleFormats() {
      return this.allDateFormats[this.dateFormatter].title;
    },
    dateFormatter: 'angular',
    showTimesOnWeekView: false,
    displayAllMonthEvents: false,
    i18nStrings: {
      weekNumber: 'Week {week}'
    },
    templates: {},
    colorTypes: {
      info: {
        primary: '#1e90ff',
        secondary: '#d1e8ff'
      },
      important: {
        primary: '#ad2121',
        secondary: '#fae3e3'
      },
      warning: {
        primary: '#e3bc08',
        secondary: '#fdf1ba'
      },
      inverse: {
        primary: '#1b1b1b',
        secondary: '#c1c1c1'
      },
      special: {
        primary: '#800080',
        secondary: '#ffe6ff'
      },
      success: {
        primary: '#006400',
        secondary: '#caffca'
      }
    }
  });


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .factory('calendarEventTitle', ["calendarDateFilter", "calendarTruncateEventTitleFilter", function(calendarDateFilter, calendarTruncateEventTitleFilter) {

    function yearView(event) {
      return event.title + ' (' + calendarDateFilter(event.startsAt, 'datetime', true) + ')';
    }

    function monthView(event) {
      return event.title + ' (' + calendarDateFilter(event.startsAt, 'time', true) + ')';
    }

    function monthViewTooltip(event) {
      return calendarDateFilter(event.startsAt, 'time', true) + ' - ' + event.title;
    }

    function weekView(event) {
      return event.title;
    }

    function weekViewTooltip(event) {
      return event.title;
    }

    function dayView(event) {
      return event.allDay ? event.title : calendarTruncateEventTitleFilter(event.title, 20, event.height);
    }

    function dayViewTooltip(event) {
      return event.title;
    }

    return {
      yearView: yearView,
      monthView: monthView,
      monthViewTooltip: monthViewTooltip,
      weekView: weekView,
      weekViewTooltip: weekViewTooltip,
      dayView: dayView,
      dayViewTooltip: dayViewTooltip
    };

  }]);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);
var calendarUtils = __webpack_require__(4);

angular
  .module('mwl.calendar')
  .factory('calendarHelper', ["$q", "$templateRequest", "dateFilter", "moment", "calendarConfig", function($q, $templateRequest, dateFilter, moment, calendarConfig) {

    function formatDate(date, format) {
      if (calendarConfig.dateFormatter === 'angular') {
        return dateFilter(moment(date).toDate(), format);
      } else if (calendarConfig.dateFormatter === 'moment') {
        return moment(date).format(format);
      } else {
        throw new Error('Unknown date formatter: ' + calendarConfig.dateFormatter);
      }
    }

    function adjustEndDateFromStartDiff(oldStart, newStart, oldEnd) {
      if (!oldEnd) {
        return oldEnd;
      }
      var diffInSeconds = moment(newStart).diff(moment(oldStart));
      return moment(oldEnd).add(diffInSeconds);
    }

    function getRecurringEventPeriod(eventPeriod, recursOn, containerPeriodStart) {

      var eventStart = moment(eventPeriod.start);
      var eventEnd = moment(eventPeriod.end);
      var periodStart = moment(containerPeriodStart);

      if (recursOn) {

        switch (recursOn) {
          case 'year':
            eventStart.set({
              year: periodStart.year()
            });
            break;

          case 'month':
            eventStart.set({
              year: periodStart.year(),
              month: periodStart.month()
            });
            break;

          default:
            throw new Error('Invalid value (' + recursOn + ') given for recurs on. Can only be year or month.');
        }

        eventEnd = adjustEndDateFromStartDiff(eventPeriod.start, eventStart, eventEnd);

      }

      return {start: eventStart, end: eventEnd};

    }

    function eventIsInPeriod(event, periodStart, periodEnd) {

      periodStart = moment(periodStart);
      periodEnd = moment(periodEnd);

      var eventPeriod = getRecurringEventPeriod({start: event.startsAt, end: event.endsAt || event.startsAt}, event.recursOn, periodStart);
      var eventStart = eventPeriod.start;
      var eventEnd = eventPeriod.end;

      return (eventStart.isAfter(periodStart) && eventStart.isBefore(periodEnd)) ||
        (eventEnd.isAfter(periodStart) && eventEnd.isBefore(periodEnd)) ||
        (eventStart.isBefore(periodStart) && eventEnd.isAfter(periodEnd)) ||
        eventStart.isSame(periodStart) ||
        eventEnd.isSame(periodEnd);

    }

    function filterEventsInPeriod(events, startPeriod, endPeriod) {
      return events.filter(function(event) {
        return eventIsInPeriod(event, startPeriod, endPeriod);
      });
    }

    function getEventsInPeriod(calendarDate, period, allEvents) {
      var startPeriod = moment(calendarDate).startOf(period);
      var endPeriod = moment(calendarDate).endOf(period);
      return filterEventsInPeriod(allEvents, startPeriod, endPeriod);
    }

    function getBadgeTotal(events) {
      return events.filter(function(event) {
        return event.incrementsBadgeTotal !== false;
      }).length;
    }

    function getWeekDayNames() {
      var weekdays = [];
      var count = 0;
      while (count < 7) {
        weekdays.push(formatDate(moment().weekday(count++), calendarConfig.dateFormats.weekDay));
      }
      return weekdays;
    }

    function getYearView(events, viewDate, cellModifier) {

      var view = [];
      var eventsInPeriod = getEventsInPeriod(viewDate, 'year', events);
      var month = moment(viewDate).startOf('year');
      var count = 0;
      while (count < 12) {
        var startPeriod = month.clone();
        var endPeriod = startPeriod.clone().endOf('month');
        var periodEvents = filterEventsInPeriod(eventsInPeriod, startPeriod, endPeriod);
        var cell = {
          label: formatDate(startPeriod, calendarConfig.dateFormats.month),
          isToday: startPeriod.isSame(moment().startOf('month')),
          events: periodEvents,
          date: startPeriod,
          badgeTotal: getBadgeTotal(periodEvents)
        };

        cellModifier({calendarCell: cell});
        view.push(cell);
        month.add(1, 'month');
        count++;
      }

      return view;

    }

    function updateEventForCalendarUtils(event, eventPeriod) {
      event.start = eventPeriod.start.toDate();
      if (event.endsAt) {
        event.end = eventPeriod.end.toDate();
      }
      return event;
    }

    function getMonthView(events, viewDate, cellModifier) {

      // hack required to work with the calendar-utils api
      events.forEach(function(event) {
        var eventPeriod = getRecurringEventPeriod({
          start: moment(event.startsAt),
          end: moment(event.endsAt || event.startsAt)
        }, event.recursOn, moment(viewDate).startOf('month'));
        updateEventForCalendarUtils(event, eventPeriod);
      });

      var view = calendarUtils.getMonthView({
        events: events,
        viewDate: viewDate,
        weekStartsOn: moment().startOf('week').day()
      });

      view.days = view.days.map(function(day) {
        day.date = moment(day.date);
        day.label = day.date.date();
        day.badgeTotal = getBadgeTotal(day.events);
        if (!calendarConfig.displayAllMonthEvents && !day.inMonth) {
          day.events = [];
        }
        cellModifier({calendarCell: day});
        return day;
      });

      // remove hack
      events.forEach(function(event) {
        delete event.start;
        delete event.end;
      });

      return view;

    }

    function getWeekView(events, viewDate) {

      var days = calendarUtils.getWeekViewHeader({
        viewDate: viewDate,
        weekStartsOn: moment().startOf('week').day()
      }).map(function(day) {
        day.date = moment(day.date);
        day.weekDayLabel = formatDate(day.date, calendarConfig.dateFormats.weekDay);
        day.dayLabel = formatDate(day.date, calendarConfig.dateFormats.day);
        return day;
      });

      var startOfWeek = moment(viewDate).startOf('week');
      var endOfWeek = moment(viewDate).endOf('week');

      var eventRows = calendarUtils.getWeekView({
        viewDate: viewDate,
        weekStartsOn: moment().startOf('week').day(),
        events: filterEventsInPeriod(events, startOfWeek, endOfWeek).map(function(event) {

          var weekViewStart = moment(startOfWeek).startOf('day');

          var eventPeriod = getRecurringEventPeriod({
            start: moment(event.startsAt),
            end: moment(event.endsAt || event.startsAt)
          }, event.recursOn, weekViewStart);

          var calendarUtilsEvent = {
            originalEvent: event,
            start: eventPeriod.start.toDate()
          };

          if (event.endsAt) {
            calendarUtilsEvent.end = eventPeriod.end.toDate();
          }

          return calendarUtilsEvent;
        })
      }).map(function(eventRow) {

        eventRow.row = eventRow.row.map(function(rowEvent) {
          rowEvent.event = rowEvent.event.originalEvent;
          return rowEvent;
        });

        return eventRow;

      });

      return {days: days, eventRows: eventRows};

    }

    function getDayView(events, viewDate, dayViewStart, dayViewEnd, dayViewSplit, dayViewEventWidth) {

      var dayStart = (dayViewStart || '00:00').split(':');
      var dayEnd = (dayViewEnd || '23:59').split(':');

      var view = calendarUtils.getDayView({
        events: events.map(function(event) { // hack required to work with event API
          var eventPeriod = getRecurringEventPeriod({
            start: moment(event.startsAt),
            end: moment(event.endsAt || event.startsAt)
          }, event.recursOn, moment(viewDate).startOf('day'));
          return updateEventForCalendarUtils(event, eventPeriod);
        }),
        viewDate: viewDate,
        hourSegments: 60 / dayViewSplit,
        dayStart: {
          hour: dayStart[0],
          minute: dayStart[1]
        },
        dayEnd: {
          hour: dayEnd[0],
          minute: dayEnd[1]
        },
        eventWidth: dayViewEventWidth ? +dayViewEventWidth : 150,
        segmentHeight: 30
      });

      // remove hack to work with new event API
      events.forEach(function(event) {
        delete event.start;
        delete event.end;
      });

      return view;

    }

    function getWeekViewWithTimes(events, viewDate, dayViewStart, dayViewEnd, dayViewSplit) {
      var weekView = getWeekView(events, viewDate);
      var newEvents = [];
      var flattenedEvents = [];
      weekView.eventRows.forEach(function(row) {
        row.row.forEach(function(eventRow) {
          flattenedEvents.push(eventRow.event);
        });
      });
      weekView.days.forEach(function(day) {
        var dayEvents = flattenedEvents.filter(function(event) {
          return moment(event.startsAt).startOf('day').isSame(moment(day.date).startOf('day'));
        });
        var newDayEvents = getDayView(
          dayEvents,
          day.date,
          dayViewStart,
          dayViewEnd,
          dayViewSplit
        ).events;
        newEvents = newEvents.concat(newDayEvents);
      });
      weekView.eventRows = [{
        row: newEvents.map(function(dayEvent) {
          var event = dayEvent.event;
          return {
            event: event,
            top: dayEvent.top,
            offset: calendarUtils.getWeekViewEventOffset({
              event: {
                start: event.startsAt,
                end: event.endsAt
              },
              startOfWeek: moment(viewDate).startOf('week').toDate()
            })
          };
        })
      }];
      return weekView;
    }

    function getDayViewHeight(dayViewStart, dayViewEnd, dayViewSplit) {
      var dayViewStartM = moment(dayViewStart || '00:00', 'HH:mm');
      var dayViewEndM = moment(dayViewEnd || '23:59', 'HH:mm');
      var hourHeight = (60 / dayViewSplit) * 30;
      return ((dayViewEndM.diff(dayViewStartM, 'minutes') / 60) * hourHeight) + 3;
    }

    function loadTemplates() {

      var templatePromises = Object.keys(calendarConfig.templates).map(function(key) {
        var templateUrl = calendarConfig.templates[key];
        return $templateRequest(templateUrl);
      });

      return $q.all(templatePromises);

    }

    return {
      getWeekDayNames: getWeekDayNames,
      getYearView: getYearView,
      getMonthView: getMonthView,
      getWeekView: getWeekView,
      getDayView: getDayView,
      getWeekViewWithTimes: getWeekViewWithTimes,
      getDayViewHeight: getDayViewHeight,
      adjustEndDateFromStartDiff: adjustEndDateFromStartDiff,
      formatDate: formatDate,
      loadTemplates: loadTemplates,
      eventIsInPeriod: eventIsInPeriod //expose for testing only
    };

  }]);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular
  .module('mwl.calendar')
  .factory('calendarTitle', ["moment", "calendarConfig", "calendarHelper", function(moment, calendarConfig, calendarHelper) {

    function day(viewDate) {
      return calendarHelper.formatDate(viewDate, calendarConfig.titleFormats.day);
    }

    function week(viewDate) {
      return calendarConfig.titleFormats.week
        .replace('{week}', moment(viewDate).isoWeek())
        .replace('{year}', moment(viewDate).startOf('isoweek').format('YYYY'));
    }

    function month(viewDate) {
      return calendarHelper.formatDate(viewDate, calendarConfig.titleFormats.month);
    }

    function year(viewDate) {
      return calendarHelper.formatDate(viewDate, calendarConfig.titleFormats.year);
    }

    return {
      day: day,
      week: week,
      month: month,
      year: year
    };

  }]);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);
var interact;
try {
  interact = __webpack_require__(62);
} catch (e) {
  /* istanbul ignore next */
  interact = null;
}

angular
  .module('mwl.calendar')
  .constant('interact', interact);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);
var moment = __webpack_require__(61);

angular
  .module('mwl.calendar')
  .constant('moment', moment);


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_61__;

/***/ }),
/* 62 */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_62__ === 'undefined') {var e = new Error("Cannot find module \"undefined\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_62__;

/***/ })
/******/ ]);
});