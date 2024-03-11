(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(require("vue")) : typeof define === "function" && define.amd ? define(["vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Vue));
})(this, function(vue) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  function toDate(argument) {
    const argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
      return new argument.constructor(+argument);
    } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
      return new Date(argument);
    } else {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  function constructFrom(date, value) {
    if (date instanceof Date) {
      return new date.constructor(value);
    } else {
      return new Date(value);
    }
  }
  function addDays(date, amount) {
    const _date = toDate(date);
    if (isNaN(amount))
      return constructFrom(date, NaN);
    if (!amount) {
      return _date;
    }
    _date.setDate(_date.getDate() + amount);
    return _date;
  }
  const millisecondsInWeek = 6048e5;
  const millisecondsInDay = 864e5;
  const millisecondsInMinute = 6e4;
  const millisecondsInHour = 36e5;
  const millisecondsInSecond = 1e3;
  let defaultOptions = {};
  function getDefaultOptions$1() {
    return defaultOptions;
  }
  function startOfWeek(date, options) {
    var _a, _b, _c, _d;
    const defaultOptions2 = getDefaultOptions$1();
    const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
    const _date = toDate(date);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    _date.setDate(_date.getDate() - diff);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  function startOfISOWeek(date) {
    return startOfWeek(date, { weekStartsOn: 1 });
  }
  function getISOWeekYear(date) {
    const _date = toDate(date);
    const year = _date.getFullYear();
    const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
    const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
    fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
    if (_date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (_date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  function startOfDay(date) {
    const _date = toDate(date);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  function getTimezoneOffsetInMilliseconds(date) {
    const _date = toDate(date);
    const utcDate = new Date(
      Date.UTC(
        _date.getFullYear(),
        _date.getMonth(),
        _date.getDate(),
        _date.getHours(),
        _date.getMinutes(),
        _date.getSeconds(),
        _date.getMilliseconds()
      )
    );
    utcDate.setUTCFullYear(_date.getFullYear());
    return +date - +utcDate;
  }
  function differenceInCalendarDays(dateLeft, dateRight) {
    const startOfDayLeft = startOfDay(dateLeft);
    const startOfDayRight = startOfDay(dateRight);
    const timestampLeft = +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
    const timestampRight = +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);
    return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
  }
  function startOfISOWeekYear(date) {
    const year = getISOWeekYear(date);
    const fourthOfJanuary = constructFrom(date, 0);
    fourthOfJanuary.setFullYear(year, 0, 4);
    fourthOfJanuary.setHours(0, 0, 0, 0);
    return startOfISOWeek(fourthOfJanuary);
  }
  function isDate(value) {
    return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
  }
  function isValid(date) {
    if (!isDate(date) && typeof date !== "number") {
      return false;
    }
    const _date = toDate(date);
    return !isNaN(Number(_date));
  }
  function startOfYear(date) {
    const cleanDate = toDate(date);
    const _date = constructFrom(date, 0);
    _date.setFullYear(cleanDate.getFullYear(), 0, 1);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  const formatDistanceLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  const formatDistance = (token, count, options) => {
    let result;
    const tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options == null ? void 0 : options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  };
  function buildFormatLongFn(args) {
    return (options = {}) => {
      const width = options.width ? String(options.width) : args.defaultWidth;
      const format2 = args.formats[width] || args.formats[args.defaultWidth];
      return format2;
    };
  }
  const dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  const timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  const dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  const formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };
  const formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
  function buildLocalizeFn(args) {
    return (value, options) => {
      const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
      let valuesArray;
      if (context === "formatting" && args.formattingValues) {
        const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        const defaultWidth = args.defaultWidth;
        const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[width] || args.values[defaultWidth];
      }
      const index = args.argumentCallback ? args.argumentCallback(value) : value;
      return valuesArray[index];
    };
  }
  const eraValues = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  const quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  const monthValues = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  };
  const dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  };
  const dayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  const formattingDayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  const ordinalNumber = (dirtyNumber, _options) => {
    const number = Number(dirtyNumber);
    const rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    }
    return number + "th";
  };
  const localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };
  function buildMatchFn(args) {
    return (string, options = {}) => {
      const width = options.width;
      const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      const matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      const matchedString = matchResult[0];
      const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString))
      );
      let value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        options.valueCallback(value)
      ) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  function findKey(object, predicate) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (let key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }
  function buildMatchPatternFn(args) {
    return (string, options = {}) => {
      const matchResult = string.match(args.matchPattern);
      if (!matchResult)
        return null;
      const matchedString = matchResult[0];
      const parseResult = string.match(args.parsePattern);
      if (!parseResult)
        return null;
      let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  const parseOrdinalNumberPattern = /\d+/i;
  const matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  const parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  const matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  const parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  const matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  const parseMonthPatterns = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
  };
  const matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  const parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  const matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  const parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  const match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: (value) => parseInt(value, 10)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };
  const enUS = {
    code: "en-US",
    formatDistance,
    formatLong,
    formatRelative,
    localize,
    match,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  function getDayOfYear(date) {
    const _date = toDate(date);
    const diff = differenceInCalendarDays(_date, startOfYear(_date));
    const dayOfYear = diff + 1;
    return dayOfYear;
  }
  function getISOWeek(date) {
    const _date = toDate(date);
    const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
    return Math.round(diff / millisecondsInWeek) + 1;
  }
  function getWeekYear(date, options) {
    var _a, _b, _c, _d;
    const _date = toDate(date);
    const year = _date.getFullYear();
    const defaultOptions2 = getDefaultOptions$1();
    const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
    const firstWeekOfNextYear = constructFrom(date, 0);
    firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
    const firstWeekOfThisYear = constructFrom(date, 0);
    firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
    if (_date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (_date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  function startOfWeekYear(date, options) {
    var _a, _b, _c, _d;
    const defaultOptions2 = getDefaultOptions$1();
    const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
    const year = getWeekYear(date, options);
    const firstWeek = constructFrom(date, 0);
    firstWeek.setFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setHours(0, 0, 0, 0);
    const _date = startOfWeek(firstWeek, options);
    return _date;
  }
  function getWeek$1(date, options) {
    const _date = toDate(date);
    const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
    return Math.round(diff / millisecondsInWeek) + 1;
  }
  function addLeadingZeros(number, targetLength) {
    const sign = number < 0 ? "-" : "";
    const output = Math.abs(number).toString().padStart(targetLength, "0");
    return sign + output;
  }
  const lightFormatters = {
    // Year
    y(date, token) {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
    },
    // Month
    M(date, token) {
      const month = date.getMonth();
      return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
    },
    // Day of the month
    d(date, token) {
      return addLeadingZeros(date.getDate(), token.length);
    },
    // AM or PM
    a(date, token) {
      const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return dayPeriodEnumValue.toUpperCase();
        case "aaa":
          return dayPeriodEnumValue;
        case "aaaaa":
          return dayPeriodEnumValue[0];
        case "aaaa":
        default:
          return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
      }
    },
    // Hour [1-12]
    h(date, token) {
      return addLeadingZeros(date.getHours() % 12 || 12, token.length);
    },
    // Hour [0-23]
    H(date, token) {
      return addLeadingZeros(date.getHours(), token.length);
    },
    // Minute
    m(date, token) {
      return addLeadingZeros(date.getMinutes(), token.length);
    },
    // Second
    s(date, token) {
      return addLeadingZeros(date.getSeconds(), token.length);
    },
    // Fraction of second
    S(date, token) {
      const numberOfDigits = token.length;
      const milliseconds = date.getMilliseconds();
      const fractionalSeconds = Math.trunc(
        milliseconds * Math.pow(10, numberOfDigits - 3)
      );
      return addLeadingZeros(fractionalSeconds, token.length);
    }
  };
  const dayPeriodEnum = {
    am: "am",
    pm: "pm",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  };
  const formatters = {
    // Era
    G: function(date, token, localize2) {
      const era = date.getFullYear() > 0 ? 1 : 0;
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return localize2.era(era, { width: "abbreviated" });
        case "GGGGG":
          return localize2.era(era, { width: "narrow" });
        case "GGGG":
        default:
          return localize2.era(era, { width: "wide" });
      }
    },
    // Year
    y: function(date, token, localize2) {
      if (token === "yo") {
        const signedYear = date.getFullYear();
        const year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize2.ordinalNumber(year, { unit: "year" });
      }
      return lightFormatters.y(date, token);
    },
    // Local week-numbering year
    Y: function(date, token, localize2, options) {
      const signedWeekYear = getWeekYear(date, options);
      const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
      if (token === "YY") {
        const twoDigitYear = weekYear % 100;
        return addLeadingZeros(twoDigitYear, 2);
      }
      if (token === "Yo") {
        return localize2.ordinalNumber(weekYear, { unit: "year" });
      }
      return addLeadingZeros(weekYear, token.length);
    },
    // ISO week-numbering year
    R: function(date, token) {
      const isoWeekYear = getISOWeekYear(date);
      return addLeadingZeros(isoWeekYear, token.length);
    },
    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function(date, token) {
      const year = date.getFullYear();
      return addLeadingZeros(year, token.length);
    },
    // Quarter
    Q: function(date, token, localize2) {
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      switch (token) {
        case "Q":
          return String(quarter);
        case "QQ":
          return addLeadingZeros(quarter, 2);
        case "Qo":
          return localize2.ordinalNumber(quarter, { unit: "quarter" });
        case "QQQ":
          return localize2.quarter(quarter, {
            width: "abbreviated",
            context: "formatting"
          });
        case "QQQQQ":
          return localize2.quarter(quarter, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return localize2.quarter(quarter, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Stand-alone quarter
    q: function(date, token, localize2) {
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      switch (token) {
        case "q":
          return String(quarter);
        case "qq":
          return addLeadingZeros(quarter, 2);
        case "qo":
          return localize2.ordinalNumber(quarter, { unit: "quarter" });
        case "qqq":
          return localize2.quarter(quarter, {
            width: "abbreviated",
            context: "standalone"
          });
        case "qqqqq":
          return localize2.quarter(quarter, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return localize2.quarter(quarter, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    // Month
    M: function(date, token, localize2) {
      const month = date.getMonth();
      switch (token) {
        case "M":
        case "MM":
          return lightFormatters.M(date, token);
        case "Mo":
          return localize2.ordinalNumber(month + 1, { unit: "month" });
        case "MMM":
          return localize2.month(month, {
            width: "abbreviated",
            context: "formatting"
          });
        case "MMMMM":
          return localize2.month(month, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return localize2.month(month, { width: "wide", context: "formatting" });
      }
    },
    // Stand-alone month
    L: function(date, token, localize2) {
      const month = date.getMonth();
      switch (token) {
        case "L":
          return String(month + 1);
        case "LL":
          return addLeadingZeros(month + 1, 2);
        case "Lo":
          return localize2.ordinalNumber(month + 1, { unit: "month" });
        case "LLL":
          return localize2.month(month, {
            width: "abbreviated",
            context: "standalone"
          });
        case "LLLLL":
          return localize2.month(month, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return localize2.month(month, { width: "wide", context: "standalone" });
      }
    },
    // Local week of year
    w: function(date, token, localize2, options) {
      const week = getWeek$1(date, options);
      if (token === "wo") {
        return localize2.ordinalNumber(week, { unit: "week" });
      }
      return addLeadingZeros(week, token.length);
    },
    // ISO week of year
    I: function(date, token, localize2) {
      const isoWeek = getISOWeek(date);
      if (token === "Io") {
        return localize2.ordinalNumber(isoWeek, { unit: "week" });
      }
      return addLeadingZeros(isoWeek, token.length);
    },
    // Day of the month
    d: function(date, token, localize2) {
      if (token === "do") {
        return localize2.ordinalNumber(date.getDate(), { unit: "date" });
      }
      return lightFormatters.d(date, token);
    },
    // Day of year
    D: function(date, token, localize2) {
      const dayOfYear = getDayOfYear(date);
      if (token === "Do") {
        return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
      }
      return addLeadingZeros(dayOfYear, token.length);
    },
    // Day of week
    E: function(date, token, localize2) {
      const dayOfWeek = date.getDay();
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "EEEEE":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "EEEE":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Local day of week
    e: function(date, token, localize2, options) {
      const dayOfWeek = date.getDay();
      const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case "e":
          return String(localDayOfWeek);
        case "ee":
          return addLeadingZeros(localDayOfWeek, 2);
        case "eo":
          return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
        case "eee":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "eeeee":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "eeee":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Stand-alone local day of week
    c: function(date, token, localize2, options) {
      const dayOfWeek = date.getDay();
      const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case "c":
          return String(localDayOfWeek);
        case "cc":
          return addLeadingZeros(localDayOfWeek, token.length);
        case "co":
          return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
        case "ccc":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "standalone"
          });
        case "ccccc":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "standalone"
          });
        case "cccc":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    // ISO day of week
    i: function(date, token, localize2) {
      const dayOfWeek = date.getDay();
      const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        case "i":
          return String(isoDayOfWeek);
        case "ii":
          return addLeadingZeros(isoDayOfWeek, token.length);
        case "io":
          return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
        case "iii":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "iiiii":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "iiiiii":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "iiii":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // AM or PM
    a: function(date, token, localize2) {
      const hours = date.getHours();
      const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "aaa":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "aaaaa":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // AM, PM, midnight, noon
    b: function(date, token, localize2) {
      const hours = date.getHours();
      let dayPeriodEnumValue;
      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      }
      switch (token) {
        case "b":
        case "bb":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "bbb":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "bbbbb":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // in the morning, in the afternoon, in the evening, at night
    B: function(date, token, localize2) {
      const hours = date.getHours();
      let dayPeriodEnumValue;
      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum.night;
      }
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "BBBBB":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Hour [1-12]
    h: function(date, token, localize2) {
      if (token === "ho") {
        let hours = date.getHours() % 12;
        if (hours === 0)
          hours = 12;
        return localize2.ordinalNumber(hours, { unit: "hour" });
      }
      return lightFormatters.h(date, token);
    },
    // Hour [0-23]
    H: function(date, token, localize2) {
      if (token === "Ho") {
        return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
      }
      return lightFormatters.H(date, token);
    },
    // Hour [0-11]
    K: function(date, token, localize2) {
      const hours = date.getHours() % 12;
      if (token === "Ko") {
        return localize2.ordinalNumber(hours, { unit: "hour" });
      }
      return addLeadingZeros(hours, token.length);
    },
    // Hour [1-24]
    k: function(date, token, localize2) {
      let hours = date.getHours();
      if (hours === 0)
        hours = 24;
      if (token === "ko") {
        return localize2.ordinalNumber(hours, { unit: "hour" });
      }
      return addLeadingZeros(hours, token.length);
    },
    // Minute
    m: function(date, token, localize2) {
      if (token === "mo") {
        return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
      }
      return lightFormatters.m(date, token);
    },
    // Second
    s: function(date, token, localize2) {
      if (token === "so") {
        return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
      }
      return lightFormatters.s(date, token);
    },
    // Fraction of second
    S: function(date, token) {
      return lightFormatters.S(date, token);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function(date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();
      if (timezoneOffset === 0) {
        return "Z";
      }
      switch (token) {
        case "X":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        case "XXXX":
        case "XX":
          return formatTimezone(timezoneOffset);
        case "XXXXX":
        case "XXX":
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function(date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();
      switch (token) {
        case "x":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        case "xxxx":
        case "xx":
          return formatTimezone(timezoneOffset);
        case "xxxxx":
        case "xxx":
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    // Timezone (GMT)
    O: function(date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();
      switch (token) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        case "OOOO":
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    // Timezone (specific non-location)
    z: function(date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();
      switch (token) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        case "zzzz":
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    // Seconds timestamp
    t: function(date, token, _localize) {
      const timestamp = Math.trunc(date.getTime() / 1e3);
      return addLeadingZeros(timestamp, token.length);
    },
    // Milliseconds timestamp
    T: function(date, token, _localize) {
      const timestamp = date.getTime();
      return addLeadingZeros(timestamp, token.length);
    }
  };
  function formatTimezoneShort(offset, delimiter = "") {
    const sign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const hours = Math.trunc(absOffset / 60);
    const minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
  }
  function formatTimezoneWithOptionalMinutes(offset, delimiter) {
    if (offset % 60 === 0) {
      const sign = offset > 0 ? "-" : "+";
      return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
    }
    return formatTimezone(offset, delimiter);
  }
  function formatTimezone(offset, delimiter = "") {
    const sign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
    const minutes = addLeadingZeros(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }
  const dateLongFormatter = (pattern, formatLong2) => {
    switch (pattern) {
      case "P":
        return formatLong2.date({ width: "short" });
      case "PP":
        return formatLong2.date({ width: "medium" });
      case "PPP":
        return formatLong2.date({ width: "long" });
      case "PPPP":
      default:
        return formatLong2.date({ width: "full" });
    }
  };
  const timeLongFormatter = (pattern, formatLong2) => {
    switch (pattern) {
      case "p":
        return formatLong2.time({ width: "short" });
      case "pp":
        return formatLong2.time({ width: "medium" });
      case "ppp":
        return formatLong2.time({ width: "long" });
      case "pppp":
      default:
        return formatLong2.time({ width: "full" });
    }
  };
  const dateTimeLongFormatter = (pattern, formatLong2) => {
    const matchResult = pattern.match(/(P+)(p+)?/) || [];
    const datePattern = matchResult[1];
    const timePattern = matchResult[2];
    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong2);
    }
    let dateTimeFormat;
    switch (datePattern) {
      case "P":
        dateTimeFormat = formatLong2.dateTime({ width: "short" });
        break;
      case "PP":
        dateTimeFormat = formatLong2.dateTime({ width: "medium" });
        break;
      case "PPP":
        dateTimeFormat = formatLong2.dateTime({ width: "long" });
        break;
      case "PPPP":
      default:
        dateTimeFormat = formatLong2.dateTime({ width: "full" });
        break;
    }
    return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
  };
  const longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };
  const dayOfYearTokenRE = /^D+$/;
  const weekYearTokenRE = /^Y+$/;
  const throwTokens = ["D", "DD", "YY", "YYYY"];
  function isProtectedDayOfYearToken(token) {
    return dayOfYearTokenRE.test(token);
  }
  function isProtectedWeekYearToken(token) {
    return weekYearTokenRE.test(token);
  }
  function warnOrThrowProtectedError(token, format2, input) {
    const _message = message(token, format2, input);
    console.warn(_message);
    if (throwTokens.includes(token))
      throw new RangeError(_message);
  }
  function message(token, format2, input) {
    const subject = token[0] === "Y" ? "years" : "days of the month";
    return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
  }
  const formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
  const longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  const escapedStringRegExp$1 = /^'([^]*?)'?$/;
  const doubleQuoteRegExp$1 = /''/g;
  const unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;
  function format(date, formatStr, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const defaultOptions2 = getDefaultOptions$1();
    const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
    const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
    const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e = options == null ? void 0 : options.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
    const originalDate = toDate(date);
    if (!isValid(originalDate)) {
      throw new RangeError("Invalid time value");
    }
    let parts = formatStr.match(longFormattingTokensRegExp$1).map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    }).join("").match(formattingTokensRegExp$1).map((substring) => {
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }
      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString$1(substring) };
      }
      if (formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }
      if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      }
      return { isToken: false, value: substring };
    });
    if (locale.localize.preprocessor) {
      parts = locale.localize.preprocessor(originalDate, parts);
    }
    const formatterOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale
    };
    return parts.map((part) => {
      if (!part.isToken)
        return part.value;
      const token = part.value;
      if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token) || !(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
        warnOrThrowProtectedError(token, formatStr, String(date));
      }
      const formatter = formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    }).join("");
  }
  function cleanEscapedString$1(input) {
    const matched = input.match(escapedStringRegExp$1);
    if (!matched) {
      return input;
    }
    return matched[1].replace(doubleQuoteRegExp$1, "'");
  }
  function getDefaultOptions() {
    return Object.assign({}, getDefaultOptions$1());
  }
  function getISODay(date) {
    const _date = toDate(date);
    let day = _date.getDay();
    if (day === 0) {
      day = 7;
    }
    return day;
  }
  function transpose(fromDate, constructor) {
    const date = constructor instanceof Date ? constructFrom(constructor, 0) : new constructor(0);
    date.setFullYear(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate()
    );
    date.setHours(
      fromDate.getHours(),
      fromDate.getMinutes(),
      fromDate.getSeconds(),
      fromDate.getMilliseconds()
    );
    return date;
  }
  const TIMEZONE_UNIT_PRIORITY = 10;
  class Setter {
    constructor() {
      __publicField(this, "subPriority", 0);
    }
    validate(_utcDate, _options) {
      return true;
    }
  }
  class ValueSetter extends Setter {
    constructor(value, validateValue, setValue, priority, subPriority) {
      super();
      this.value = value;
      this.validateValue = validateValue;
      this.setValue = setValue;
      this.priority = priority;
      if (subPriority) {
        this.subPriority = subPriority;
      }
    }
    validate(date, options) {
      return this.validateValue(date, this.value, options);
    }
    set(date, flags, options) {
      return this.setValue(date, flags, this.value, options);
    }
  }
  class DateToSystemTimezoneSetter extends Setter {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", TIMEZONE_UNIT_PRIORITY);
      __publicField(this, "subPriority", -1);
    }
    set(date, flags) {
      if (flags.timestampIsSet)
        return date;
      return constructFrom(date, transpose(date, Date));
    }
  }
  class Parser {
    run(dateString, token, match2, options) {
      const result = this.parse(dateString, token, match2, options);
      if (!result) {
        return null;
      }
      return {
        setter: new ValueSetter(
          result.value,
          this.validate,
          this.set,
          this.priority,
          this.subPriority
        ),
        rest: result.rest
      };
    }
    validate(_utcDate, _value, _options) {
      return true;
    }
  }
  class EraParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 140);
      __publicField(this, "incompatibleTokens", ["R", "u", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
        case "GGGGG":
          return match2.era(dateString, { width: "narrow" });
        case "GGGG":
        default:
          return match2.era(dateString, { width: "wide" }) || match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
      }
    }
    set(date, flags, value) {
      flags.era = value;
      date.setFullYear(value, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  const numericPatterns = {
    month: /^(1[0-2]|0?\d)/,
    // 0 to 12
    date: /^(3[0-1]|[0-2]?\d)/,
    // 0 to 31
    dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
    // 0 to 366
    week: /^(5[0-3]|[0-4]?\d)/,
    // 0 to 53
    hour23h: /^(2[0-3]|[0-1]?\d)/,
    // 0 to 23
    hour24h: /^(2[0-4]|[0-1]?\d)/,
    // 0 to 24
    hour11h: /^(1[0-1]|0?\d)/,
    // 0 to 11
    hour12h: /^(1[0-2]|0?\d)/,
    // 0 to 12
    minute: /^[0-5]?\d/,
    // 0 to 59
    second: /^[0-5]?\d/,
    // 0 to 59
    singleDigit: /^\d/,
    // 0 to 9
    twoDigits: /^\d{1,2}/,
    // 0 to 99
    threeDigits: /^\d{1,3}/,
    // 0 to 999
    fourDigits: /^\d{1,4}/,
    // 0 to 9999
    anyDigitsSigned: /^-?\d+/,
    singleDigitSigned: /^-?\d/,
    // 0 to 9, -0 to -9
    twoDigitsSigned: /^-?\d{1,2}/,
    // 0 to 99, -0 to -99
    threeDigitsSigned: /^-?\d{1,3}/,
    // 0 to 999, -0 to -999
    fourDigitsSigned: /^-?\d{1,4}/
    // 0 to 9999, -0 to -9999
  };
  const timezonePatterns = {
    basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
    basic: /^([+-])(\d{2})(\d{2})|Z/,
    basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
    extended: /^([+-])(\d{2}):(\d{2})|Z/,
    extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
  };
  function mapValue(parseFnResult, mapFn) {
    if (!parseFnResult) {
      return parseFnResult;
    }
    return {
      value: mapFn(parseFnResult.value),
      rest: parseFnResult.rest
    };
  }
  function parseNumericPattern(pattern, dateString) {
    const matchResult = dateString.match(pattern);
    if (!matchResult) {
      return null;
    }
    return {
      value: parseInt(matchResult[0], 10),
      rest: dateString.slice(matchResult[0].length)
    };
  }
  function parseTimezonePattern(pattern, dateString) {
    const matchResult = dateString.match(pattern);
    if (!matchResult) {
      return null;
    }
    if (matchResult[0] === "Z") {
      return {
        value: 0,
        rest: dateString.slice(1)
      };
    }
    const sign = matchResult[1] === "+" ? 1 : -1;
    const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
    const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
    const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
    return {
      value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
      rest: dateString.slice(matchResult[0].length)
    };
  }
  function parseAnyDigitsSigned(dateString) {
    return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
  }
  function parseNDigits(n, dateString) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigit, dateString);
      case 2:
        return parseNumericPattern(numericPatterns.twoDigits, dateString);
      case 3:
        return parseNumericPattern(numericPatterns.threeDigits, dateString);
      case 4:
        return parseNumericPattern(numericPatterns.fourDigits, dateString);
      default:
        return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
    }
  }
  function parseNDigitsSigned(n, dateString) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
      case 2:
        return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
      case 3:
        return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
      case 4:
        return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
      default:
        return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
    }
  }
  function dayPeriodEnumToHours(dayPeriod) {
    switch (dayPeriod) {
      case "morning":
        return 4;
      case "evening":
        return 17;
      case "pm":
      case "noon":
      case "afternoon":
        return 12;
      case "am":
      case "midnight":
      case "night":
      default:
        return 0;
    }
  }
  function normalizeTwoDigitYear(twoDigitYear, currentYear) {
    const isCommonEra = currentYear > 0;
    const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
    let result;
    if (absCurrentYear <= 50) {
      result = twoDigitYear || 100;
    } else {
      const rangeEnd = absCurrentYear + 50;
      const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
      const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
      result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
    }
    return isCommonEra ? result : 1 - result;
  }
  function isLeapYearIndex(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  }
  class YearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 130);
      __publicField(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
    }
    parse(dateString, token, match2) {
      const valueCallback = (year) => ({
        year,
        isTwoDigitYear: token === "yy"
      });
      switch (token) {
        case "y":
          return mapValue(parseNDigits(4, dateString), valueCallback);
        case "yo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "year"
            }),
            valueCallback
          );
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback);
      }
    }
    validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
    set(date, flags, value) {
      const currentYear = date.getFullYear();
      if (value.isTwoDigitYear) {
        const normalizedTwoDigitYear = normalizeTwoDigitYear(
          value.year,
          currentYear
        );
        date.setFullYear(normalizedTwoDigitYear, 0, 1);
        date.setHours(0, 0, 0, 0);
        return date;
      }
      const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setFullYear(year, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class LocalWeekYearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 130);
      __publicField(this, "incompatibleTokens", [
        "y",
        "R",
        "u",
        "Q",
        "q",
        "M",
        "L",
        "I",
        "d",
        "D",
        "i",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      const valueCallback = (year) => ({
        year,
        isTwoDigitYear: token === "YY"
      });
      switch (token) {
        case "Y":
          return mapValue(parseNDigits(4, dateString), valueCallback);
        case "Yo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "year"
            }),
            valueCallback
          );
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback);
      }
    }
    validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
    set(date, flags, value, options) {
      const currentYear = getWeekYear(date, options);
      if (value.isTwoDigitYear) {
        const normalizedTwoDigitYear = normalizeTwoDigitYear(
          value.year,
          currentYear
        );
        date.setFullYear(
          normalizedTwoDigitYear,
          0,
          options.firstWeekContainsDate
        );
        date.setHours(0, 0, 0, 0);
        return startOfWeek(date, options);
      }
      const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setFullYear(year, 0, options.firstWeekContainsDate);
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }
  }
  class ISOWeekYearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 130);
      __publicField(this, "incompatibleTokens", [
        "G",
        "y",
        "Y",
        "u",
        "Q",
        "q",
        "M",
        "L",
        "w",
        "d",
        "D",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token) {
      if (token === "R") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
    set(date, _flags, value) {
      const firstWeekOfYear = constructFrom(date, 0);
      firstWeekOfYear.setFullYear(value, 0, 4);
      firstWeekOfYear.setHours(0, 0, 0, 0);
      return startOfISOWeek(firstWeekOfYear);
    }
  }
  class ExtendedYearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 130);
      __publicField(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
    }
    parse(dateString, token) {
      if (token === "u") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
    set(date, _flags, value) {
      date.setFullYear(value, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class QuarterParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 120);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "M",
        "L",
        "w",
        "I",
        "d",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "Q":
        case "QQ":
          return parseNDigits(token.length, dateString);
        case "Qo":
          return match2.ordinalNumber(dateString, { unit: "quarter" });
        case "QQQ":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 4;
    }
    set(date, _flags, value) {
      date.setMonth((value - 1) * 3, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class StandAloneQuarterParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 120);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "Q",
        "M",
        "L",
        "w",
        "I",
        "d",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "q":
        case "qq":
          return parseNDigits(token.length, dateString);
        case "qo":
          return match2.ordinalNumber(dateString, { unit: "quarter" });
        case "qqq":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 4;
    }
    set(date, _flags, value) {
      date.setMonth((value - 1) * 3, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class MonthParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "Q",
        "L",
        "w",
        "I",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
      __publicField(this, "priority", 110);
    }
    parse(dateString, token, match2) {
      const valueCallback = (value) => value - 1;
      switch (token) {
        case "M":
          return mapValue(
            parseNumericPattern(numericPatterns.month, dateString),
            valueCallback
          );
        case "MM":
          return mapValue(parseNDigits(2, dateString), valueCallback);
        case "Mo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "month"
            }),
            valueCallback
          );
        case "MMM":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, { width: "narrow", context: "formatting" });
        case "MMMMM":
          return match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return match2.month(dateString, { width: "wide", context: "formatting" }) || match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, { width: "narrow", context: "formatting" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 11;
    }
    set(date, _flags, value) {
      date.setMonth(value, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class StandAloneMonthParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 110);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "Q",
        "M",
        "w",
        "I",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      const valueCallback = (value) => value - 1;
      switch (token) {
        case "L":
          return mapValue(
            parseNumericPattern(numericPatterns.month, dateString),
            valueCallback
          );
        case "LL":
          return mapValue(parseNDigits(2, dateString), valueCallback);
        case "Lo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "month"
            }),
            valueCallback
          );
        case "LLL":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, { width: "narrow", context: "standalone" });
        case "LLLLL":
          return match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return match2.month(dateString, { width: "wide", context: "standalone" }) || match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, { width: "narrow", context: "standalone" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 11;
    }
    set(date, _flags, value) {
      date.setMonth(value, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  function setWeek(date, week, options) {
    const _date = toDate(date);
    const diff = getWeek$1(_date, options) - week;
    _date.setDate(_date.getDate() - diff * 7);
    return _date;
  }
  class LocalWeekParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 100);
      __publicField(this, "incompatibleTokens", [
        "y",
        "R",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "I",
        "d",
        "D",
        "i",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "w":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "wo":
          return match2.ordinalNumber(dateString, { unit: "week" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 53;
    }
    set(date, _flags, value, options) {
      return startOfWeek(setWeek(date, value, options), options);
    }
  }
  function setISOWeek(date, week) {
    const _date = toDate(date);
    const diff = getISOWeek(_date) - week;
    _date.setDate(_date.getDate() - diff * 7);
    return _date;
  }
  class ISOWeekParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 100);
      __publicField(this, "incompatibleTokens", [
        "y",
        "Y",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "w",
        "d",
        "D",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "I":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "Io":
          return match2.ordinalNumber(dateString, { unit: "week" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 53;
    }
    set(date, _flags, value) {
      return startOfISOWeek(setISOWeek(date, value));
    }
  }
  const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_IN_MONTH_LEAP_YEAR = [
    31,
    29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];
  class DateParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "subPriority", 1);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "Q",
        "w",
        "I",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "d":
          return parseNumericPattern(numericPatterns.date, dateString);
        case "do":
          return match2.ordinalNumber(dateString, { unit: "date" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(date, value) {
      const year = date.getFullYear();
      const isLeapYear = isLeapYearIndex(year);
      const month = date.getMonth();
      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    }
    set(date, _flags, value) {
      date.setDate(value);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class DayOfYearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "subpriority", 1);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "Q",
        "M",
        "L",
        "w",
        "I",
        "d",
        "E",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "D":
        case "DD":
          return parseNumericPattern(numericPatterns.dayOfYear, dateString);
        case "Do":
          return match2.ordinalNumber(dateString, { unit: "date" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(date, value) {
      const year = date.getFullYear();
      const isLeapYear = isLeapYearIndex(year);
      if (isLeapYear) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    }
    set(date, _flags, value) {
      date.setMonth(0, value);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  function setDay(date, day, options) {
    var _a, _b, _c, _d;
    const defaultOptions2 = getDefaultOptions$1();
    const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
    const _date = toDate(date);
    const currentDay = _date.getDay();
    const remainder = day % 7;
    const dayIndex = (remainder + 7) % 7;
    const delta = 7 - weekStartsOn;
    const diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
    return addDays(_date, diff);
  }
  class DayParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
        case "EEEEE":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
        case "EEEE":
        default:
          return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 6;
    }
    set(date, _flags, value, options) {
      date = setDay(date, value, options);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class LocalDayParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "incompatibleTokens", [
        "y",
        "R",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "I",
        "d",
        "D",
        "E",
        "i",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2, options) {
      const valueCallback = (value) => {
        const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "e":
        case "ee":
          return mapValue(parseNDigits(token.length, dateString), valueCallback);
        case "eo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "day"
            }),
            valueCallback
          );
        case "eee":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
        case "eeeee":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
        case "eeee":
        default:
          return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 6;
    }
    set(date, _flags, value, options) {
      date = setDay(date, value, options);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class StandAloneLocalDayParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "incompatibleTokens", [
        "y",
        "R",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "I",
        "d",
        "D",
        "E",
        "i",
        "e",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2, options) {
      const valueCallback = (value) => {
        const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "c":
        case "cc":
          return mapValue(parseNDigits(token.length, dateString), valueCallback);
        case "co":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "day"
            }),
            valueCallback
          );
        case "ccc":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
        case "ccccc":
          return match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
        case "cccc":
        default:
          return match2.day(dateString, { width: "wide", context: "standalone" }) || match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 6;
    }
    set(date, _flags, value, options) {
      date = setDay(date, value, options);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  function setISODay(date, day) {
    const _date = toDate(date);
    const currentDay = getISODay(_date);
    const diff = day - currentDay;
    return addDays(_date, diff);
  }
  class ISODayParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "incompatibleTokens", [
        "y",
        "Y",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "w",
        "d",
        "D",
        "E",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      const valueCallback = (value) => {
        if (value === 0) {
          return 7;
        }
        return value;
      };
      switch (token) {
        case "i":
        case "ii":
          return parseNDigits(token.length, dateString);
        case "io":
          return match2.ordinalNumber(dateString, { unit: "day" });
        case "iii":
          return mapValue(
            match2.day(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            }),
            valueCallback
          );
        case "iiiii":
          return mapValue(
            match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            }),
            valueCallback
          );
        case "iiiiii":
          return mapValue(
            match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            }),
            valueCallback
          );
        case "iiii":
        default:
          return mapValue(
            match2.day(dateString, {
              width: "wide",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            }),
            valueCallback
          );
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 7;
    }
    set(date, _flags, value) {
      date = setISODay(date, value);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class AMPMParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 80);
      __publicField(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "a":
        case "aa":
        case "aaa":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
    set(date, _flags, value) {
      date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }
  class AMPMMidnightParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 80);
      __publicField(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "b":
        case "bb":
        case "bbb":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
    set(date, _flags, value) {
      date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }
  class DayPeriodParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 80);
      __publicField(this, "incompatibleTokens", ["a", "b", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
    set(date, _flags, value) {
      date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }
  class Hour1to12Parser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 70);
      __publicField(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "h":
          return parseNumericPattern(numericPatterns.hour12h, dateString);
        case "ho":
          return match2.ordinalNumber(dateString, { unit: "hour" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 12;
    }
    set(date, _flags, value) {
      const isPM = date.getHours() >= 12;
      if (isPM && value < 12) {
        date.setHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setHours(0, 0, 0, 0);
      } else {
        date.setHours(value, 0, 0, 0);
      }
      return date;
    }
  }
  class Hour0to23Parser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 70);
      __publicField(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "H":
          return parseNumericPattern(numericPatterns.hour23h, dateString);
        case "Ho":
          return match2.ordinalNumber(dateString, { unit: "hour" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 23;
    }
    set(date, _flags, value) {
      date.setHours(value, 0, 0, 0);
      return date;
    }
  }
  class Hour0To11Parser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 70);
      __publicField(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "K":
          return parseNumericPattern(numericPatterns.hour11h, dateString);
        case "Ko":
          return match2.ordinalNumber(dateString, { unit: "hour" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 11;
    }
    set(date, _flags, value) {
      const isPM = date.getHours() >= 12;
      if (isPM && value < 12) {
        date.setHours(value + 12, 0, 0, 0);
      } else {
        date.setHours(value, 0, 0, 0);
      }
      return date;
    }
  }
  class Hour1To24Parser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 70);
      __publicField(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "k":
          return parseNumericPattern(numericPatterns.hour24h, dateString);
        case "ko":
          return match2.ordinalNumber(dateString, { unit: "hour" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 24;
    }
    set(date, _flags, value) {
      const hours = value <= 24 ? value % 24 : value;
      date.setHours(hours, 0, 0, 0);
      return date;
    }
  }
  class MinuteParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 60);
      __publicField(this, "incompatibleTokens", ["t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "m":
          return parseNumericPattern(numericPatterns.minute, dateString);
        case "mo":
          return match2.ordinalNumber(dateString, { unit: "minute" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 59;
    }
    set(date, _flags, value) {
      date.setMinutes(value, 0, 0);
      return date;
    }
  }
  class SecondParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 50);
      __publicField(this, "incompatibleTokens", ["t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "s":
          return parseNumericPattern(numericPatterns.second, dateString);
        case "so":
          return match2.ordinalNumber(dateString, { unit: "second" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 59;
    }
    set(date, _flags, value) {
      date.setSeconds(value, 0);
      return date;
    }
  }
  class FractionOfSecondParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 30);
      __publicField(this, "incompatibleTokens", ["t", "T"]);
    }
    parse(dateString, token) {
      const valueCallback = (value) => Math.trunc(value * Math.pow(10, -token.length + 3));
      return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
    set(date, _flags, value) {
      date.setMilliseconds(value);
      return date;
    }
  }
  class ISOTimezoneWithZParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 10);
      __publicField(this, "incompatibleTokens", ["t", "T", "x"]);
    }
    parse(dateString, token) {
      switch (token) {
        case "X":
          return parseTimezonePattern(
            timezonePatterns.basicOptionalMinutes,
            dateString
          );
        case "XX":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "XXXX":
          return parseTimezonePattern(
            timezonePatterns.basicOptionalSeconds,
            dateString
          );
        case "XXXXX":
          return parseTimezonePattern(
            timezonePatterns.extendedOptionalSeconds,
            dateString
          );
        case "XXX":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
    set(date, flags, value) {
      if (flags.timestampIsSet)
        return date;
      return constructFrom(
        date,
        date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
      );
    }
  }
  class ISOTimezoneParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 10);
      __publicField(this, "incompatibleTokens", ["t", "T", "X"]);
    }
    parse(dateString, token) {
      switch (token) {
        case "x":
          return parseTimezonePattern(
            timezonePatterns.basicOptionalMinutes,
            dateString
          );
        case "xx":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "xxxx":
          return parseTimezonePattern(
            timezonePatterns.basicOptionalSeconds,
            dateString
          );
        case "xxxxx":
          return parseTimezonePattern(
            timezonePatterns.extendedOptionalSeconds,
            dateString
          );
        case "xxx":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
    set(date, flags, value) {
      if (flags.timestampIsSet)
        return date;
      return constructFrom(
        date,
        date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
      );
    }
  }
  class TimestampSecondsParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 40);
      __publicField(this, "incompatibleTokens", "*");
    }
    parse(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
    set(date, _flags, value) {
      return [constructFrom(date, value * 1e3), { timestampIsSet: true }];
    }
  }
  class TimestampMillisecondsParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 20);
      __publicField(this, "incompatibleTokens", "*");
    }
    parse(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
    set(date, _flags, value) {
      return [constructFrom(date, value), { timestampIsSet: true }];
    }
  }
  const parsers = {
    G: new EraParser(),
    y: new YearParser(),
    Y: new LocalWeekYearParser(),
    R: new ISOWeekYearParser(),
    u: new ExtendedYearParser(),
    Q: new QuarterParser(),
    q: new StandAloneQuarterParser(),
    M: new MonthParser(),
    L: new StandAloneMonthParser(),
    w: new LocalWeekParser(),
    I: new ISOWeekParser(),
    d: new DateParser(),
    D: new DayOfYearParser(),
    E: new DayParser(),
    e: new LocalDayParser(),
    c: new StandAloneLocalDayParser(),
    i: new ISODayParser(),
    a: new AMPMParser(),
    b: new AMPMMidnightParser(),
    B: new DayPeriodParser(),
    h: new Hour1to12Parser(),
    H: new Hour0to23Parser(),
    K: new Hour0To11Parser(),
    k: new Hour1To24Parser(),
    m: new MinuteParser(),
    s: new SecondParser(),
    S: new FractionOfSecondParser(),
    X: new ISOTimezoneWithZParser(),
    x: new ISOTimezoneParser(),
    t: new TimestampSecondsParser(),
    T: new TimestampMillisecondsParser()
  };
  const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
  const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  const escapedStringRegExp = /^'([^]*?)'?$/;
  const doubleQuoteRegExp = /''/g;
  const notWhitespaceRegExp = /\S/;
  const unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  function parse(dateStr, formatStr, referenceDate, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const defaultOptions2 = getDefaultOptions();
    const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
    const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
    const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e = options == null ? void 0 : options.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
    if (formatStr === "") {
      if (dateStr === "") {
        return toDate(referenceDate);
      } else {
        return constructFrom(referenceDate, NaN);
      }
    }
    const subFnOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale
    };
    const setters = [new DateToSystemTimezoneSetter()];
    const tokens = formatStr.match(longFormattingTokensRegExp).map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter in longFormatters) {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    }).join("").match(formattingTokensRegExp);
    const usedTokens = [];
    for (let token of tokens) {
      if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
        warnOrThrowProtectedError(token, formatStr, dateStr);
      }
      if (!(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
        warnOrThrowProtectedError(token, formatStr, dateStr);
      }
      const firstCharacter = token[0];
      const parser = parsers[firstCharacter];
      if (parser) {
        const { incompatibleTokens } = parser;
        if (Array.isArray(incompatibleTokens)) {
          const incompatibleToken = usedTokens.find(
            (usedToken) => incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter
          );
          if (incompatibleToken) {
            throw new RangeError(
              `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`
            );
          }
        } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
          throw new RangeError(
            `The format string mustn't contain \`${token}\` and any other token at the same time`
          );
        }
        usedTokens.push({ token: firstCharacter, fullToken: token });
        const parseResult = parser.run(
          dateStr,
          token,
          locale.match,
          subFnOptions
        );
        if (!parseResult) {
          return constructFrom(referenceDate, NaN);
        }
        setters.push(parseResult.setter);
        dateStr = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError(
            "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
          );
        }
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString(token);
        }
        if (dateStr.indexOf(token) === 0) {
          dateStr = dateStr.slice(token.length);
        } else {
          return constructFrom(referenceDate, NaN);
        }
      }
    }
    if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
      return constructFrom(referenceDate, NaN);
    }
    const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index, array) => array.indexOf(priority) === index).map(
      (priority) => setters.filter((setter) => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority)
    ).map((setterArray) => setterArray[0]);
    let date = toDate(referenceDate);
    if (isNaN(date.getTime())) {
      return constructFrom(referenceDate, NaN);
    }
    const flags = {};
    for (const setter of uniquePrioritySetters) {
      if (!setter.validate(date, subFnOptions)) {
        return constructFrom(referenceDate, NaN);
      }
      const result = setter.set(date, flags, subFnOptions);
      if (Array.isArray(result)) {
        date = result[0];
        Object.assign(flags, result[1]);
      } else {
        date = result;
      }
    }
    return constructFrom(referenceDate, date);
  }
  function cleanEscapedString(input) {
    return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
  }
  const IN_BROWSER = typeof window !== "undefined";
  const SUPPORTS_INTERSECTION = IN_BROWSER && "IntersectionObserver" in window;
  function deepEqual(a, b) {
    if (a === b)
      return true;
    if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
      return false;
    }
    if (a !== Object(a) || b !== Object(b)) {
      return false;
    }
    const props = Object.keys(a);
    if (props.length !== Object.keys(b).length) {
      return false;
    }
    return props.every((p) => deepEqual(a[p], b[p]));
  }
  function createRange(length) {
    let start = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return Array.from({
      length
    }, (v, k) => start + k);
  }
  function convertToUnit(str) {
    let unit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
    if (str == null || str === "") {
      return void 0;
    } else if (isNaN(+str)) {
      return String(str);
    } else if (!isFinite(+str)) {
      return void 0;
    } else {
      return `${Number(str)}${unit}`;
    }
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
  }
  function refElement(obj) {
    if (obj && "$el" in obj) {
      const el = obj.$el;
      if ((el == null ? void 0 : el.nodeType) === Node.TEXT_NODE) {
        return el.nextElementSibling;
      }
      return el;
    }
    return obj;
  }
  const keyCodes = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34,
    shift: 16
  });
  function has(obj, key) {
    return key.every((k) => obj.hasOwnProperty(k));
  }
  function pick(obj, paths) {
    const found = {};
    const keys = new Set(Object.keys(obj));
    for (const path of paths) {
      if (keys.has(path)) {
        found[path] = obj[path];
      }
    }
    return found;
  }
  function pickWithRest(obj, paths, exclude) {
    const found = /* @__PURE__ */ Object.create(null);
    const rest = /* @__PURE__ */ Object.create(null);
    for (const key in obj) {
      if (paths.some((path) => path instanceof RegExp ? path.test(key) : path === key) && !(exclude == null ? void 0 : exclude.some((path) => path === key))) {
        found[key] = obj[key];
      } else {
        rest[key] = obj[key];
      }
    }
    return [found, rest];
  }
  function omit(obj, exclude) {
    const clone = {
      ...obj
    };
    exclude.forEach((prop) => delete clone[prop]);
    return clone;
  }
  const onRE = /^on[^a-z]/;
  const isOn = (key) => onRE.test(key);
  const bubblingEvents = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
  function filterInputAttrs(attrs) {
    const [events, props] = pickWithRest(attrs, [onRE]);
    const inputEvents = omit(events, bubblingEvents);
    const [rootAttrs, inputAttrs] = pickWithRest(props, ["class", "style", "id", /^data-/]);
    Object.assign(rootAttrs, events);
    Object.assign(inputAttrs, inputEvents);
    return [rootAttrs, inputAttrs];
  }
  function wrapInArray(v) {
    return v == null ? [] : Array.isArray(v) ? v : [v];
  }
  function clamp(value) {
    let min = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    let max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    return Math.max(min, Math.min(max, value));
  }
  function padEnd(str, length) {
    let char = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
    return str + char.repeat(Math.max(0, length - str.length));
  }
  function chunk(str) {
    let size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    const chunked = [];
    let index = 0;
    while (index < str.length) {
      chunked.push(str.substr(index, size));
      index += size;
    }
    return chunked;
  }
  function mergeDeep() {
    let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let arrayFn = arguments.length > 2 ? arguments[2] : void 0;
    const out = {};
    for (const key in source) {
      out[key] = source[key];
    }
    for (const key in target) {
      const sourceProperty = source[key];
      const targetProperty = target[key];
      if (isObject(sourceProperty) && isObject(targetProperty)) {
        out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
        continue;
      }
      if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
        out[key] = arrayFn(sourceProperty, targetProperty);
        continue;
      }
      out[key] = targetProperty;
    }
    return out;
  }
  function flattenFragments(nodes) {
    return nodes.map((node) => {
      if (node.type === vue.Fragment) {
        return flattenFragments(node.children);
      } else {
        return node;
      }
    }).flat();
  }
  function toKebabCase() {
    let str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    if (toKebabCase.cache.has(str))
      return toKebabCase.cache.get(str);
    const kebab = str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
    toKebabCase.cache.set(str, kebab);
    return kebab;
  }
  toKebabCase.cache = /* @__PURE__ */ new Map();
  function findChildrenWithProvide(key, vnode) {
    if (!vnode || typeof vnode !== "object")
      return [];
    if (Array.isArray(vnode)) {
      return vnode.map((child) => findChildrenWithProvide(key, child)).flat(1);
    } else if (Array.isArray(vnode.children)) {
      return vnode.children.map((child) => findChildrenWithProvide(key, child)).flat(1);
    } else if (vnode.component) {
      if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key)) {
        return [vnode.component];
      } else if (vnode.component.subTree) {
        return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
      }
    }
    return [];
  }
  function destructComputed(getter) {
    const refs = vue.reactive({});
    const base = vue.computed(getter);
    vue.watchEffect(() => {
      for (const key in base.value) {
        refs[key] = base.value[key];
      }
    }, {
      flush: "sync"
    });
    return vue.toRefs(refs);
  }
  function includes(arr, val) {
    return arr.includes(val);
  }
  function eventName(propName) {
    return propName[2].toLowerCase() + propName.slice(3);
  }
  const EventProp = () => [Function, Array];
  function hasEvent(props, name) {
    name = "on" + vue.capitalize(name);
    return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
  }
  function callEvent(handler) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    if (Array.isArray(handler)) {
      for (const h of handler) {
        h(...args);
      }
    } else if (typeof handler === "function") {
      handler(...args);
    }
  }
  function focusableChildren(el) {
    let filterByTabIndex = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const targets = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((s) => `${s}${filterByTabIndex ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
    return [...el.querySelectorAll(targets)];
  }
  function matchesSelector(el, selector) {
    const supportsSelector = IN_BROWSER && typeof CSS !== "undefined" && typeof CSS.supports !== "undefined" && CSS.supports(`selector(${selector})`);
    if (!supportsSelector)
      return null;
    try {
      return !!el && el.matches(selector);
    } catch (err) {
      return null;
    }
  }
  function defer(timeout, cb) {
    if (!IN_BROWSER || timeout === 0) {
      cb();
      return () => {
      };
    }
    const timeoutId = window.setTimeout(cb, timeout);
    return () => window.clearTimeout(timeoutId);
  }
  const block = ["top", "bottom"];
  const inline = ["start", "end", "left", "right"];
  function parseAnchor(anchor, isRtl) {
    let [side, align] = anchor.split(" ");
    if (!align) {
      align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
    }
    return {
      side: toPhysical(side, isRtl),
      align: toPhysical(align, isRtl)
    };
  }
  function toPhysical(str, isRtl) {
    if (str === "start")
      return isRtl ? "right" : "left";
    if (str === "end")
      return isRtl ? "left" : "right";
    return str;
  }
  function flipSide(anchor) {
    return {
      side: {
        center: "center",
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
      }[anchor.side],
      align: anchor.align
    };
  }
  function flipAlign(anchor) {
    return {
      side: anchor.side,
      align: {
        center: "center",
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
      }[anchor.align]
    };
  }
  function flipCorner(anchor) {
    return {
      side: anchor.align,
      align: anchor.side
    };
  }
  function getAxis(anchor) {
    return includes(block, anchor.side) ? "y" : "x";
  }
  class Box {
    constructor(_ref) {
      let {
        x,
        y,
        width,
        height
      } = _ref;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    get top() {
      return this.y;
    }
    get bottom() {
      return this.y + this.height;
    }
    get left() {
      return this.x;
    }
    get right() {
      return this.x + this.width;
    }
  }
  function getOverflow(a, b) {
    return {
      x: {
        before: Math.max(0, b.left - a.left),
        after: Math.max(0, a.right - b.right)
      },
      y: {
        before: Math.max(0, b.top - a.top),
        after: Math.max(0, a.bottom - b.bottom)
      }
    };
  }
  function getTargetBox(target) {
    if (Array.isArray(target)) {
      return new Box({
        x: target[0],
        y: target[1],
        width: 0,
        height: 0
      });
    } else {
      return target.getBoundingClientRect();
    }
  }
  function nullifyTransforms(el) {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const tx = style.transform;
    if (tx) {
      let ta, sx, sy, dx, dy;
      if (tx.startsWith("matrix3d(")) {
        ta = tx.slice(9, -1).split(/, /);
        sx = +ta[0];
        sy = +ta[5];
        dx = +ta[12];
        dy = +ta[13];
      } else if (tx.startsWith("matrix(")) {
        ta = tx.slice(7, -1).split(/, /);
        sx = +ta[0];
        sy = +ta[3];
        dx = +ta[4];
        dy = +ta[5];
      } else {
        return new Box(rect);
      }
      const to = style.transformOrigin;
      const x = rect.x - dx - (1 - sx) * parseFloat(to);
      const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
      const w = sx ? rect.width / sx : el.offsetWidth + 1;
      const h = sy ? rect.height / sy : el.offsetHeight + 1;
      return new Box({
        x,
        y,
        width: w,
        height: h
      });
    } else {
      return new Box(rect);
    }
  }
  function animate(el, keyframes, options) {
    if (typeof el.animate === "undefined")
      return {
        finished: Promise.resolve()
      };
    let animation;
    try {
      animation = el.animate(keyframes, options);
    } catch (err) {
      return {
        finished: Promise.resolve()
      };
    }
    if (typeof animation.finished === "undefined") {
      animation.finished = new Promise((resolve) => {
        animation.onfinish = () => {
          resolve(animation);
        };
      });
    }
    return animation;
  }
  const handlers = /* @__PURE__ */ new WeakMap();
  function bindProps(el, props) {
    Object.keys(props).forEach((k) => {
      var _a;
      if (isOn(k)) {
        const name = eventName(k);
        const handler = handlers.get(el);
        if (props[k] == null) {
          handler == null ? void 0 : handler.forEach((v) => {
            const [n, fn] = v;
            if (n === name) {
              el.removeEventListener(name, fn);
              handler.delete(v);
            }
          });
        } else if (!handler || !((_a = [...handler]) == null ? void 0 : _a.some((v) => v[0] === name && v[1] === props[k]))) {
          el.addEventListener(name, props[k]);
          const _handler = handler || /* @__PURE__ */ new Set();
          _handler.add([name, props[k]]);
          if (!handlers.has(el))
            handlers.set(el, _handler);
        }
      } else {
        if (props[k] == null) {
          el.removeAttribute(k);
        } else {
          el.setAttribute(k, props[k]);
        }
      }
    });
  }
  function unbindProps(el, props) {
    Object.keys(props).forEach((k) => {
      if (isOn(k)) {
        const name = eventName(k);
        const handler = handlers.get(el);
        handler == null ? void 0 : handler.forEach((v) => {
          const [n, fn] = v;
          if (n === name) {
            el.removeEventListener(name, fn);
            handler.delete(v);
          }
        });
      } else {
        el.removeAttribute(k);
      }
    });
  }
  const mainTRC = 2.4;
  const Rco = 0.2126729;
  const Gco = 0.7151522;
  const Bco = 0.072175;
  const normBG = 0.55;
  const normTXT = 0.58;
  const revTXT = 0.57;
  const revBG = 0.62;
  const blkThrs = 0.03;
  const blkClmp = 1.45;
  const deltaYmin = 5e-4;
  const scaleBoW = 1.25;
  const scaleWoB = 1.25;
  const loConThresh = 0.078;
  const loConFactor = 12.82051282051282;
  const loConOffset = 0.06;
  const loClip = 1e-3;
  function APCAcontrast(text, background) {
    const Rtxt = (text.r / 255) ** mainTRC;
    const Gtxt = (text.g / 255) ** mainTRC;
    const Btxt = (text.b / 255) ** mainTRC;
    const Rbg = (background.r / 255) ** mainTRC;
    const Gbg = (background.g / 255) ** mainTRC;
    const Bbg = (background.b / 255) ** mainTRC;
    let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
    let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;
    if (Ytxt <= blkThrs)
      Ytxt += (blkThrs - Ytxt) ** blkClmp;
    if (Ybg <= blkThrs)
      Ybg += (blkThrs - Ybg) ** blkClmp;
    if (Math.abs(Ybg - Ytxt) < deltaYmin)
      return 0;
    let outputContrast;
    if (Ybg > Ytxt) {
      const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;
      outputContrast = SAPC < loClip ? 0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
    } else {
      const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
      outputContrast = SAPC > -loClip ? 0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
    }
    return outputContrast * 100;
  }
  function consoleWarn(message2) {
    vue.warn(`Vuetify: ${message2}`);
  }
  function consoleError(message2) {
    vue.warn(`Vuetify error: ${message2}`);
  }
  function isCssColor(color) {
    return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
  }
  function isParsableColor(color) {
    return isCssColor(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color);
  }
  const cssColorRe = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/;
  const mappers = {
    rgb: (r, g, b, a) => ({
      r,
      g,
      b,
      a
    }),
    rgba: (r, g, b, a) => ({
      r,
      g,
      b,
      a
    }),
    hsl: (h, s, l, a) => HSLtoRGB({
      h,
      s,
      l,
      a
    }),
    hsla: (h, s, l, a) => HSLtoRGB({
      h,
      s,
      l,
      a
    }),
    hsv: (h, s, v, a) => HSVtoRGB({
      h,
      s,
      v,
      a
    }),
    hsva: (h, s, v, a) => HSVtoRGB({
      h,
      s,
      v,
      a
    })
  };
  function parseColor(color) {
    if (typeof color === "number") {
      if (isNaN(color) || color < 0 || color > 16777215) {
        consoleWarn(`'${color}' is not a valid hex color`);
      }
      return {
        r: (color & 16711680) >> 16,
        g: (color & 65280) >> 8,
        b: color & 255
      };
    } else if (typeof color === "string" && cssColorRe.test(color)) {
      const {
        groups
      } = color.match(cssColorRe);
      const {
        fn,
        values
      } = groups;
      const realValues = values.split(/,\s*/).map((v) => {
        if (v.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(fn)) {
          return parseFloat(v) / 100;
        } else {
          return parseFloat(v);
        }
      });
      return mappers[fn](...realValues);
    } else if (typeof color === "string") {
      let hex = color.startsWith("#") ? color.slice(1) : color;
      if ([3, 4].includes(hex.length)) {
        hex = hex.split("").map((char) => char + char).join("");
      } else if (![6, 8].includes(hex.length)) {
        consoleWarn(`'${color}' is not a valid hex(a) color`);
      }
      const int = parseInt(hex, 16);
      if (isNaN(int) || int < 0 || int > 4294967295) {
        consoleWarn(`'${color}' is not a valid hex(a) color`);
      }
      return HexToRGB(hex);
    } else if (typeof color === "object") {
      if (has(color, ["r", "g", "b"])) {
        return color;
      } else if (has(color, ["h", "s", "l"])) {
        return HSVtoRGB(HSLtoHSV(color));
      } else if (has(color, ["h", "s", "v"])) {
        return HSVtoRGB(color);
      }
    }
    throw new TypeError(`Invalid color: ${color == null ? color : String(color) || color.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
  }
  function HSVtoRGB(hsva) {
    const {
      h,
      s,
      v,
      a
    } = hsva;
    const f = (n) => {
      const k = (n + h / 60) % 6;
      return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    };
    const rgb = [f(5), f(3), f(1)].map((v2) => Math.round(v2 * 255));
    return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
      a
    };
  }
  function HSLtoRGB(hsla) {
    return HSVtoRGB(HSLtoHSV(hsla));
  }
  function HSLtoHSV(hsl) {
    const {
      h,
      s,
      l,
      a
    } = hsl;
    const v = l + s * Math.min(l, 1 - l);
    const sprime = v === 0 ? 0 : 2 - 2 * l / v;
    return {
      h,
      s: sprime,
      v,
      a
    };
  }
  function HexToRGB(hex) {
    hex = parseHex(hex);
    let [r, g, b, a] = chunk(hex, 2).map((c) => parseInt(c, 16));
    a = a === void 0 ? a : a / 255;
    return {
      r,
      g,
      b,
      a
    };
  }
  function parseHex(hex) {
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }
    hex = hex.replace(/([^0-9a-f])/gi, "F");
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split("").map((x) => x + x).join("");
    }
    if (hex.length !== 6) {
      hex = padEnd(padEnd(hex, 6), 8, "F");
    }
    return hex;
  }
  function getForeground(color) {
    const blackContrast = Math.abs(APCAcontrast(parseColor(0), parseColor(color)));
    const whiteContrast = Math.abs(APCAcontrast(parseColor(16777215), parseColor(color)));
    return whiteContrast > Math.min(blackContrast, 50) ? "#fff" : "#000";
  }
  function propsFactory(props, source) {
    return (defaults) => {
      return Object.keys(props).reduce((obj, prop) => {
        const isObjectDefinition = typeof props[prop] === "object" && props[prop] != null && !Array.isArray(props[prop]);
        const definition = isObjectDefinition ? props[prop] : {
          type: props[prop]
        };
        if (defaults && prop in defaults) {
          obj[prop] = {
            ...definition,
            default: defaults[prop]
          };
        } else {
          obj[prop] = definition;
        }
        if (source && !obj[prop].source) {
          obj[prop].source = source;
        }
        return obj;
      }, {});
    };
  }
  const makeComponentProps = propsFactory({
    class: [String, Array],
    style: {
      type: [String, Array, Object],
      default: null
    }
  }, "component");
  const DefaultsSymbol = Symbol.for("vuetify:defaults");
  function injectDefaults() {
    const defaults = vue.inject(DefaultsSymbol);
    if (!defaults)
      throw new Error("[Vuetify] Could not find defaults instance");
    return defaults;
  }
  function provideDefaults(defaults, options) {
    const injectedDefaults = injectDefaults();
    const providedDefaults = vue.ref(defaults);
    const newDefaults = vue.computed(() => {
      const disabled = vue.unref(options == null ? void 0 : options.disabled);
      if (disabled)
        return injectedDefaults.value;
      const scoped = vue.unref(options == null ? void 0 : options.scoped);
      const reset = vue.unref(options == null ? void 0 : options.reset);
      const root = vue.unref(options == null ? void 0 : options.root);
      if (providedDefaults.value == null && !(scoped || reset || root))
        return injectedDefaults.value;
      let properties = mergeDeep(providedDefaults.value, {
        prev: injectedDefaults.value
      });
      if (scoped)
        return properties;
      if (reset || root) {
        const len = Number(reset || Infinity);
        for (let i = 0; i <= len; i++) {
          if (!properties || !("prev" in properties)) {
            break;
          }
          properties = properties.prev;
        }
        if (properties && typeof root === "string" && root in properties) {
          properties = mergeDeep(mergeDeep(properties, {
            prev: properties
          }), properties[root]);
        }
        return properties;
      }
      return properties.prev ? mergeDeep(properties.prev, properties) : properties;
    });
    vue.provide(DefaultsSymbol, newDefaults);
    return newDefaults;
  }
  function propIsDefined(vnode, prop) {
    var _a, _b;
    return typeof ((_a = vnode.props) == null ? void 0 : _a[prop]) !== "undefined" || typeof ((_b = vnode.props) == null ? void 0 : _b[toKebabCase(prop)]) !== "undefined";
  }
  function internalUseDefaults() {
    let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let name = arguments.length > 1 ? arguments[1] : void 0;
    let defaults = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : injectDefaults();
    const vm = getCurrentInstance("useDefaults");
    name = name ?? vm.type.name ?? vm.type.__name;
    if (!name) {
      throw new Error("[Vuetify] Could not determine component name");
    }
    const componentDefaults = vue.computed(() => {
      var _a;
      return (_a = defaults.value) == null ? void 0 : _a[props._as ?? name];
    });
    const _props = new Proxy(props, {
      get(target, prop) {
        var _a, _b, _c, _d;
        const propValue = Reflect.get(target, prop);
        if (prop === "class" || prop === "style") {
          return [(_a = componentDefaults.value) == null ? void 0 : _a[prop], propValue].filter((v) => v != null);
        } else if (typeof prop === "string" && !propIsDefined(vm.vnode, prop)) {
          return ((_b = componentDefaults.value) == null ? void 0 : _b[prop]) ?? ((_d = (_c = defaults.value) == null ? void 0 : _c.global) == null ? void 0 : _d[prop]) ?? propValue;
        }
        return propValue;
      }
    });
    const _subcomponentDefaults = vue.shallowRef();
    vue.watchEffect(() => {
      if (componentDefaults.value) {
        const subComponents = Object.entries(componentDefaults.value).filter((_ref) => {
          let [key] = _ref;
          return key.startsWith(key[0].toUpperCase());
        });
        _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : void 0;
      } else {
        _subcomponentDefaults.value = void 0;
      }
    });
    function provideSubDefaults() {
      const injected = injectSelf(DefaultsSymbol, vm);
      vue.provide(DefaultsSymbol, vue.computed(() => {
        return _subcomponentDefaults.value ? mergeDeep((injected == null ? void 0 : injected.value) ?? {}, _subcomponentDefaults.value) : injected == null ? void 0 : injected.value;
      }));
    }
    return {
      props: _props,
      provideSubDefaults
    };
  }
  function defineComponent(options) {
    options._setup = options._setup ?? options.setup;
    if (!options.name) {
      consoleWarn("The component is missing an explicit name, unable to generate default prop value");
      return options;
    }
    if (options._setup) {
      options.props = propsFactory(options.props ?? {}, options.name)();
      const propKeys = Object.keys(options.props).filter((key) => key !== "class" && key !== "style");
      options.filterProps = function filterProps(props) {
        return pick(props, propKeys);
      };
      options.props._as = String;
      options.setup = function setup(props, ctx) {
        const defaults = injectDefaults();
        if (!defaults.value)
          return options._setup(props, ctx);
        const {
          props: _props,
          provideSubDefaults
        } = internalUseDefaults(props, props._as ?? options.name, defaults);
        const setupBindings = options._setup(_props, ctx);
        provideSubDefaults();
        return setupBindings;
      };
    }
    return options;
  }
  function genericComponent() {
    let exposeDefaults = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    return (options) => (exposeDefaults ? defineComponent : vue.defineComponent)(options);
  }
  function createSimpleFunctional(klass) {
    let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
    let name = arguments.length > 2 ? arguments[2] : void 0;
    return genericComponent()({
      name: name ?? vue.capitalize(vue.camelize(klass.replace(/__/g, "-"))),
      props: {
        tag: {
          type: String,
          default: tag
        },
        ...makeComponentProps()
      },
      setup(props, _ref) {
        let {
          slots
        } = _ref;
        return () => {
          var _a;
          return vue.h(props.tag, {
            class: [klass, props.class],
            style: props.style
          }, (_a = slots.default) == null ? void 0 : _a.call(slots));
        };
      }
    });
  }
  function attachedRoot(node) {
    if (typeof node.getRootNode !== "function") {
      while (node.parentNode)
        node = node.parentNode;
      if (node !== document)
        return null;
      return document;
    }
    const root = node.getRootNode();
    if (root !== document && root.getRootNode({
      composed: true
    }) !== document)
      return null;
    return root;
  }
  const standardEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
  const deceleratedEasing = "cubic-bezier(0.0, 0, 0.2, 1)";
  const acceleratedEasing = "cubic-bezier(0.4, 0, 1, 1)";
  function getCurrentInstance(name, message2) {
    const vm = vue.getCurrentInstance();
    if (!vm) {
      throw new Error(`[Vuetify] ${name} ${message2 || "must be called from inside a setup function"}`);
    }
    return vm;
  }
  function getCurrentInstanceName() {
    let name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
    const vm = getCurrentInstance(name).type;
    return toKebabCase((vm == null ? void 0 : vm.aliasName) || (vm == null ? void 0 : vm.name));
  }
  let _uid = 0;
  let _map = /* @__PURE__ */ new WeakMap();
  function getUid() {
    const vm = getCurrentInstance("getUid");
    if (_map.has(vm))
      return _map.get(vm);
    else {
      const uid = _uid++;
      _map.set(vm, uid);
      return uid;
    }
  }
  getUid.reset = () => {
    _uid = 0;
    _map = /* @__PURE__ */ new WeakMap();
  };
  function getScrollParent(el) {
    let includeHidden = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    while (el) {
      if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el))
        return el;
      el = el.parentElement;
    }
    return document.scrollingElement;
  }
  function getScrollParents(el, stopAt) {
    const elements = [];
    if (stopAt && el && !stopAt.contains(el))
      return elements;
    while (el) {
      if (hasScrollbar(el))
        elements.push(el);
      if (el === stopAt)
        break;
      el = el.parentElement;
    }
    return elements;
  }
  function hasScrollbar(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE)
      return false;
    const style = window.getComputedStyle(el);
    return style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
  }
  function isPotentiallyScrollable(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE)
      return false;
    const style = window.getComputedStyle(el);
    return ["scroll", "auto"].includes(style.overflowY);
  }
  function injectSelf(key) {
    let vm = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstance("injectSelf");
    const {
      provides
    } = vm;
    if (provides && key in provides) {
      return provides[key];
    }
    return void 0;
  }
  function isFixedPosition(el) {
    while (el) {
      if (window.getComputedStyle(el).position === "fixed") {
        return true;
      }
      el = el.offsetParent;
    }
    return false;
  }
  function useRender(render) {
    const vm = getCurrentInstance("useRender");
    vm.render = render;
  }
  const makeBorderProps = propsFactory({
    border: [Boolean, Number, String]
  }, "border");
  function useBorder(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const borderClasses = vue.computed(() => {
      const border = vue.isRef(props) ? props.value : props.border;
      const classes = [];
      if (border === true || border === "") {
        classes.push(`${name}--border`);
      } else if (typeof border === "string" || border === 0) {
        for (const value of String(border).split(" ")) {
          classes.push(`border-${value}`);
        }
      }
      return classes;
    });
    return {
      borderClasses
    };
  }
  const allowedDensities = [null, "default", "comfortable", "compact"];
  const makeDensityProps = propsFactory({
    density: {
      type: String,
      default: "default",
      validator: (v) => allowedDensities.includes(v)
    }
  }, "density");
  function useDensity(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const densityClasses = vue.computed(() => {
      return `${name}--density-${props.density}`;
    });
    return {
      densityClasses
    };
  }
  const makeElevationProps = propsFactory({
    elevation: {
      type: [Number, String],
      validator(v) {
        const value = parseInt(v);
        return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
        // https://material.io/design/environment/elevation.html#default-elevations
        value <= 24;
      }
    }
  }, "elevation");
  function useElevation(props) {
    const elevationClasses = vue.computed(() => {
      const elevation = vue.isRef(props) ? props.value : props.elevation;
      const classes = [];
      if (elevation == null)
        return classes;
      classes.push(`elevation-${elevation}`);
      return classes;
    });
    return {
      elevationClasses
    };
  }
  const makeRoundedProps = propsFactory({
    rounded: {
      type: [Boolean, Number, String],
      default: void 0
    },
    tile: Boolean
  }, "rounded");
  function useRounded(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const roundedClasses = vue.computed(() => {
      const rounded = vue.isRef(props) ? props.value : props.rounded;
      const tile = vue.isRef(props) ? props.value : props.tile;
      const classes = [];
      if (rounded === true || rounded === "") {
        classes.push(`${name}--rounded`);
      } else if (typeof rounded === "string" || rounded === 0) {
        for (const value of String(rounded).split(" ")) {
          classes.push(`rounded-${value}`);
        }
      } else if (tile) {
        classes.push("rounded-0");
      }
      return classes;
    });
    return {
      roundedClasses
    };
  }
  const makeTagProps = propsFactory({
    tag: {
      type: String,
      default: "div"
    }
  }, "tag");
  const ThemeSymbol = Symbol.for("vuetify:theme");
  const makeThemeProps = propsFactory({
    theme: String
  }, "theme");
  function provideTheme(props) {
    getCurrentInstance("provideTheme");
    const theme = vue.inject(ThemeSymbol, null);
    if (!theme)
      throw new Error("Could not find Vuetify theme injection");
    const name = vue.computed(() => {
      return props.theme ?? theme.name.value;
    });
    const current = vue.computed(() => theme.themes.value[name.value]);
    const themeClasses = vue.computed(() => theme.isDisabled ? void 0 : `v-theme--${name.value}`);
    const newTheme = {
      ...theme,
      name,
      current,
      themeClasses
    };
    vue.provide(ThemeSymbol, newTheme);
    return newTheme;
  }
  function useColor(colors) {
    return destructComputed(() => {
      const classes = [];
      const styles = {};
      if (colors.value.background) {
        if (isCssColor(colors.value.background)) {
          styles.backgroundColor = colors.value.background;
          if (!colors.value.text && isParsableColor(colors.value.background)) {
            const backgroundColor = parseColor(colors.value.background);
            if (backgroundColor.a == null || backgroundColor.a === 1) {
              const textColor = getForeground(backgroundColor);
              styles.color = textColor;
              styles.caretColor = textColor;
            }
          }
        } else {
          classes.push(`bg-${colors.value.background}`);
        }
      }
      if (colors.value.text) {
        if (isCssColor(colors.value.text)) {
          styles.color = colors.value.text;
          styles.caretColor = colors.value.text;
        } else {
          classes.push(`text-${colors.value.text}`);
        }
      }
      return {
        colorClasses: classes,
        colorStyles: styles
      };
    });
  }
  function useTextColor(props, name) {
    const colors = vue.computed(() => ({
      text: vue.isRef(props) ? props.value : name ? props[name] : null
    }));
    const {
      colorClasses: textColorClasses,
      colorStyles: textColorStyles
    } = useColor(colors);
    return {
      textColorClasses,
      textColorStyles
    };
  }
  function useBackgroundColor(props, name) {
    const colors = vue.computed(() => ({
      background: vue.isRef(props) ? props.value : name ? props[name] : null
    }));
    const {
      colorClasses: backgroundColorClasses,
      colorStyles: backgroundColorStyles
    } = useColor(colors);
    return {
      backgroundColorClasses,
      backgroundColorStyles
    };
  }
  const allowedVariants$1 = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
  function genOverlays(isClickable, name) {
    return vue.createVNode(vue.Fragment, null, [isClickable && vue.createVNode("span", {
      "key": "overlay",
      "class": `${name}__overlay`
    }, null), vue.createVNode("span", {
      "key": "underlay",
      "class": `${name}__underlay`
    }, null)]);
  }
  const makeVariantProps = propsFactory({
    color: String,
    variant: {
      type: String,
      default: "elevated",
      validator: (v) => allowedVariants$1.includes(v)
    }
  }, "variant");
  function useVariant(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const variantClasses = vue.computed(() => {
      const {
        variant
      } = vue.unref(props);
      return `${name}--variant-${variant}`;
    });
    const {
      colorClasses,
      colorStyles
    } = useColor(vue.computed(() => {
      const {
        variant,
        color
      } = vue.unref(props);
      return {
        [["elevated", "flat"].includes(variant) ? "background" : "text"]: color
      };
    }));
    return {
      colorClasses,
      colorStyles,
      variantClasses
    };
  }
  const makeVBtnGroupProps = propsFactory({
    divided: Boolean,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps()
  }, "VBtnGroup");
  const VBtnGroup = genericComponent()({
    name: "VBtnGroup",
    props: makeVBtnGroupProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      provideDefaults({
        VBtn: {
          height: "auto",
          color: vue.toRef(props, "color"),
          density: vue.toRef(props, "density"),
          flat: true,
          variant: vue.toRef(props, "variant")
        }
      });
      useRender(() => {
        return vue.createVNode(props.tag, {
          "class": ["v-btn-group", {
            "v-btn-group--divided": props.divided
          }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class],
          "style": props.style
        }, slots);
      });
    }
  });
  function useToggleScope(source, fn) {
    let scope;
    function start() {
      scope = vue.effectScope();
      scope.run(() => fn.length ? fn(() => {
        scope == null ? void 0 : scope.stop();
        start();
      }) : fn());
    }
    vue.watch(source, (active) => {
      if (active && !scope) {
        start();
      } else if (!active) {
        scope == null ? void 0 : scope.stop();
        scope = void 0;
      }
    }, {
      immediate: true
    });
    vue.onScopeDispose(() => {
      scope == null ? void 0 : scope.stop();
    });
  }
  function useProxiedModel(props, prop, defaultValue) {
    let transformIn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (v) => v;
    let transformOut = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (v) => v;
    const vm = getCurrentInstance("useProxiedModel");
    const internal = vue.ref(props[prop] !== void 0 ? props[prop] : defaultValue);
    const kebabProp = toKebabCase(prop);
    const checkKebab = kebabProp !== prop;
    const isControlled = checkKebab ? vue.computed(() => {
      var _a, _b, _c, _d;
      void props[prop];
      return !!((((_a = vm.vnode.props) == null ? void 0 : _a.hasOwnProperty(prop)) || ((_b = vm.vnode.props) == null ? void 0 : _b.hasOwnProperty(kebabProp))) && (((_c = vm.vnode.props) == null ? void 0 : _c.hasOwnProperty(`onUpdate:${prop}`)) || ((_d = vm.vnode.props) == null ? void 0 : _d.hasOwnProperty(`onUpdate:${kebabProp}`))));
    }) : vue.computed(() => {
      var _a, _b;
      void props[prop];
      return !!(((_a = vm.vnode.props) == null ? void 0 : _a.hasOwnProperty(prop)) && ((_b = vm.vnode.props) == null ? void 0 : _b.hasOwnProperty(`onUpdate:${prop}`)));
    });
    useToggleScope(() => !isControlled.value, () => {
      vue.watch(() => props[prop], (val) => {
        internal.value = val;
      });
    });
    const model = vue.computed({
      get() {
        const externalValue = props[prop];
        return transformIn(isControlled.value ? externalValue : internal.value);
      },
      set(internalValue) {
        const newValue = transformOut(internalValue);
        const value = vue.toRaw(isControlled.value ? props[prop] : internal.value);
        if (value === newValue || transformIn(value) === internalValue) {
          return;
        }
        internal.value = newValue;
        vm == null ? void 0 : vm.emit(`update:${prop}`, newValue);
      }
    });
    Object.defineProperty(model, "externalValue", {
      get: () => isControlled.value ? props[prop] : internal.value
    });
    return model;
  }
  const makeGroupProps = propsFactory({
    modelValue: {
      type: null,
      default: void 0
    },
    multiple: Boolean,
    mandatory: [Boolean, String],
    max: Number,
    selectedClass: String,
    disabled: Boolean
  }, "group");
  const makeGroupItemProps = propsFactory({
    value: null,
    disabled: Boolean,
    selectedClass: String
  }, "group-item");
  function useGroupItem(props, injectKey) {
    let required = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    const vm = getCurrentInstance("useGroupItem");
    if (!vm) {
      throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
    }
    const id = getUid();
    vue.provide(Symbol.for(`${injectKey.description}:id`), id);
    const group = vue.inject(injectKey, null);
    if (!group) {
      if (!required)
        return group;
      throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
    }
    const value = vue.toRef(props, "value");
    const disabled = vue.computed(() => !!(group.disabled.value || props.disabled));
    group.register({
      id,
      value,
      disabled
    }, vm);
    vue.onBeforeUnmount(() => {
      group.unregister(id);
    });
    const isSelected = vue.computed(() => {
      return group.isSelected(id);
    });
    const selectedClass = vue.computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
    vue.watch(isSelected, (value2) => {
      vm.emit("group:selected", {
        value: value2
      });
    }, {
      flush: "sync"
    });
    return {
      id,
      isSelected,
      toggle: () => group.select(id, !isSelected.value),
      select: (value2) => group.select(id, value2),
      selectedClass,
      value,
      disabled,
      group
    };
  }
  function useGroup(props, injectKey) {
    let isUnmounted = false;
    const items = vue.reactive([]);
    const selected = useProxiedModel(props, "modelValue", [], (v) => {
      if (v == null)
        return [];
      return getIds(items, wrapInArray(v));
    }, (v) => {
      const arr = getValues(items, v);
      return props.multiple ? arr : arr[0];
    });
    const groupVm = getCurrentInstance("useGroup");
    function register(item, vm) {
      const unwrapped = item;
      const key = Symbol.for(`${injectKey.description}:id`);
      const children = findChildrenWithProvide(key, groupVm == null ? void 0 : groupVm.vnode);
      const index = children.indexOf(vm);
      if (vue.unref(unwrapped.value) == null) {
        unwrapped.value = index;
      }
      if (index > -1) {
        items.splice(index, 0, unwrapped);
      } else {
        items.push(unwrapped);
      }
    }
    function unregister(id) {
      if (isUnmounted)
        return;
      forceMandatoryValue();
      const index = items.findIndex((item) => item.id === id);
      items.splice(index, 1);
    }
    function forceMandatoryValue() {
      const item = items.find((item2) => !item2.disabled);
      if (item && props.mandatory === "force" && !selected.value.length) {
        selected.value = [item.id];
      }
    }
    vue.onMounted(() => {
      forceMandatoryValue();
    });
    vue.onBeforeUnmount(() => {
      isUnmounted = true;
    });
    function select(id, value) {
      const item = items.find((item2) => item2.id === id);
      if (value && (item == null ? void 0 : item.disabled))
        return;
      if (props.multiple) {
        const internalValue = selected.value.slice();
        const index = internalValue.findIndex((v) => v === id);
        const isSelected = ~index;
        value = value ?? !isSelected;
        if (isSelected && props.mandatory && internalValue.length <= 1)
          return;
        if (!isSelected && props.max != null && internalValue.length + 1 > props.max)
          return;
        if (index < 0 && value)
          internalValue.push(id);
        else if (index >= 0 && !value)
          internalValue.splice(index, 1);
        selected.value = internalValue;
      } else {
        const isSelected = selected.value.includes(id);
        if (props.mandatory && isSelected)
          return;
        selected.value = value ?? !isSelected ? [id] : [];
      }
    }
    function step(offset) {
      if (props.multiple)
        consoleWarn('This method is not supported when using "multiple" prop');
      if (!selected.value.length) {
        const item = items.find((item2) => !item2.disabled);
        item && (selected.value = [item.id]);
      } else {
        const currentId = selected.value[0];
        const currentIndex = items.findIndex((i) => i.id === currentId);
        let newIndex = (currentIndex + offset) % items.length;
        let newItem = items[newIndex];
        while (newItem.disabled && newIndex !== currentIndex) {
          newIndex = (newIndex + offset) % items.length;
          newItem = items[newIndex];
        }
        if (newItem.disabled)
          return;
        selected.value = [items[newIndex].id];
      }
    }
    const state = {
      register,
      unregister,
      selected,
      select,
      disabled: vue.toRef(props, "disabled"),
      prev: () => step(items.length - 1),
      next: () => step(1),
      isSelected: (id) => selected.value.includes(id),
      selectedClass: vue.computed(() => props.selectedClass),
      items: vue.computed(() => items),
      getItemIndex: (value) => getItemIndex(items, value)
    };
    vue.provide(injectKey, state);
    return state;
  }
  function getItemIndex(items, value) {
    const ids = getIds(items, [value]);
    if (!ids.length)
      return -1;
    return items.findIndex((item) => item.id === ids[0]);
  }
  function getIds(items, modelValue) {
    const ids = [];
    modelValue.forEach((value) => {
      const item = items.find((item2) => deepEqual(value, item2.value));
      const itemByIndex = items[value];
      if ((item == null ? void 0 : item.value) != null) {
        ids.push(item.id);
      } else if (itemByIndex != null) {
        ids.push(itemByIndex.id);
      }
    });
    return ids;
  }
  function getValues(items, ids) {
    const values = [];
    ids.forEach((id) => {
      const itemIndex = items.findIndex((item) => item.id === id);
      if (~itemIndex) {
        const item = items[itemIndex];
        values.push(item.value != null ? item.value : itemIndex);
      }
    });
    return values;
  }
  const VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
  const makeVBtnToggleProps = propsFactory({
    ...makeVBtnGroupProps(),
    ...makeGroupProps()
  }, "VBtnToggle");
  genericComponent()({
    name: "VBtnToggle",
    props: makeVBtnToggleProps(),
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        isSelected,
        next,
        prev,
        select,
        selected
      } = useGroup(props, VBtnToggleSymbol);
      useRender(() => {
        const btnGroupProps = VBtnGroup.filterProps(props);
        return vue.createVNode(VBtnGroup, vue.mergeProps({
          "class": ["v-btn-toggle", props.class]
        }, btnGroupProps, {
          "style": props.style
        }), {
          default: () => {
            var _a;
            return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
              isSelected,
              next,
              prev,
              select,
              selected
            })];
          }
        });
      });
      return {
        next,
        prev,
        select
      };
    }
  });
  const makeVDefaultsProviderProps = propsFactory({
    defaults: Object,
    disabled: Boolean,
    reset: [Number, String],
    root: [Boolean, String],
    scoped: Boolean
  }, "VDefaultsProvider");
  const VDefaultsProvider = genericComponent(false)({
    name: "VDefaultsProvider",
    props: makeVDefaultsProviderProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        defaults,
        disabled,
        reset,
        root,
        scoped
      } = vue.toRefs(props);
      provideDefaults(defaults, {
        reset,
        root,
        scoped,
        disabled
      });
      return () => {
        var _a;
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      };
    }
  });
  const IconValue = [String, Function, Object, Array];
  const IconSymbol = Symbol.for("vuetify:icons");
  const makeIconProps = propsFactory({
    icon: {
      type: IconValue
    },
    // Could not remove this and use makeTagProps, types complained because it is not required
    tag: {
      type: String,
      required: true
    }
  }, "icon");
  const VComponentIcon = genericComponent()({
    name: "VComponentIcon",
    props: makeIconProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        const Icon = props.icon;
        return vue.createVNode(props.tag, null, {
          default: () => {
            var _a;
            return [props.icon ? vue.createVNode(Icon, null, null) : (_a = slots.default) == null ? void 0 : _a.call(slots)];
          }
        });
      };
    }
  });
  const VSvgIcon = defineComponent({
    name: "VSvgIcon",
    inheritAttrs: false,
    props: makeIconProps(),
    setup(props, _ref2) {
      let {
        attrs
      } = _ref2;
      return () => {
        return vue.createVNode(props.tag, vue.mergeProps(attrs, {
          "style": null
        }), {
          default: () => [vue.createVNode("svg", {
            "class": "v-icon__svg",
            "xmlns": "http://www.w3.org/2000/svg",
            "viewBox": "0 0 24 24",
            "role": "img",
            "aria-hidden": "true"
          }, [Array.isArray(props.icon) ? props.icon.map((path) => Array.isArray(path) ? vue.createVNode("path", {
            "d": path[0],
            "fill-opacity": path[1]
          }, null) : vue.createVNode("path", {
            "d": path
          }, null)) : vue.createVNode("path", {
            "d": props.icon
          }, null)])]
        });
      };
    }
  });
  defineComponent({
    name: "VLigatureIcon",
    props: makeIconProps(),
    setup(props) {
      return () => {
        return vue.createVNode(props.tag, null, {
          default: () => [props.icon]
        });
      };
    }
  });
  defineComponent({
    name: "VClassIcon",
    props: makeIconProps(),
    setup(props) {
      return () => {
        return vue.createVNode(props.tag, {
          "class": props.icon
        }, null);
      };
    }
  });
  const useIcon = (props) => {
    const icons = vue.inject(IconSymbol);
    if (!icons)
      throw new Error("Missing Vuetify Icons provide!");
    const iconData = vue.computed(() => {
      var _a;
      const iconAlias = vue.unref(props);
      if (!iconAlias)
        return {
          component: VComponentIcon
        };
      let icon = iconAlias;
      if (typeof icon === "string") {
        icon = icon.trim();
        if (icon.startsWith("$")) {
          icon = (_a = icons.aliases) == null ? void 0 : _a[icon.slice(1)];
        }
      }
      if (!icon)
        throw new Error(`Could not find aliased icon "${iconAlias}"`);
      if (Array.isArray(icon)) {
        return {
          component: VSvgIcon,
          icon
        };
      } else if (typeof icon !== "string") {
        return {
          component: VComponentIcon,
          icon
        };
      }
      const iconSetName = Object.keys(icons.sets).find((setName) => typeof icon === "string" && icon.startsWith(`${setName}:`));
      const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
      const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
      return {
        component: iconSet.component,
        icon: iconName
      };
    });
    return {
      iconData
    };
  };
  const predefinedSizes = ["x-small", "small", "default", "large", "x-large"];
  const makeSizeProps = propsFactory({
    size: {
      type: [String, Number],
      default: "default"
    }
  }, "size");
  function useSize(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    return destructComputed(() => {
      let sizeClasses;
      let sizeStyles;
      if (includes(predefinedSizes, props.size)) {
        sizeClasses = `${name}--size-${props.size}`;
      } else if (props.size) {
        sizeStyles = {
          width: convertToUnit(props.size),
          height: convertToUnit(props.size)
        };
      }
      return {
        sizeClasses,
        sizeStyles
      };
    });
  }
  const makeVIconProps = propsFactory({
    color: String,
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    ...makeComponentProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "i"
    }),
    ...makeThemeProps()
  }, "VIcon");
  const VIcon = genericComponent()({
    name: "VIcon",
    props: makeVIconProps(),
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const slotIcon = vue.ref();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        iconData
      } = useIcon(vue.computed(() => slotIcon.value || props.icon));
      const {
        sizeClasses
      } = useSize(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, "color"));
      useRender(() => {
        var _a, _b;
        const slotValue = (_a = slots.default) == null ? void 0 : _a.call(slots);
        if (slotValue) {
          slotIcon.value = (_b = flattenFragments(slotValue).filter((node) => node.type === vue.Text && node.children && typeof node.children === "string")[0]) == null ? void 0 : _b.children;
        }
        return vue.createVNode(iconData.value.component, {
          "tag": props.tag,
          "icon": iconData.value.icon,
          "class": ["v-icon", "notranslate", themeClasses.value, sizeClasses.value, textColorClasses.value, {
            "v-icon--clickable": !!attrs.onClick,
            "v-icon--start": props.start,
            "v-icon--end": props.end
          }, props.class],
          "style": [!sizeClasses.value ? {
            fontSize: convertToUnit(props.size),
            height: convertToUnit(props.size),
            width: convertToUnit(props.size)
          } : void 0, textColorStyles.value, props.style],
          "role": attrs.onClick ? "button" : void 0,
          "aria-hidden": !attrs.onClick
        }, {
          default: () => [slotValue]
        });
      });
      return {};
    }
  });
  function useIntersectionObserver(callback, options) {
    const intersectionRef = vue.ref();
    const isIntersecting = vue.shallowRef(false);
    if (SUPPORTS_INTERSECTION) {
      const observer = new IntersectionObserver((entries) => {
        callback == null ? void 0 : callback(entries, observer);
        isIntersecting.value = !!entries.find((entry) => entry.isIntersecting);
      }, options);
      vue.onBeforeUnmount(() => {
        observer.disconnect();
      });
      vue.watch(intersectionRef, (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(oldValue);
          isIntersecting.value = false;
        }
        if (newValue)
          observer.observe(newValue);
      }, {
        flush: "post"
      });
    }
    return {
      intersectionRef,
      isIntersecting
    };
  }
  function useResizeObserver(callback) {
    let box = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
    const resizeRef = vue.ref();
    const contentRect = vue.ref();
    if (IN_BROWSER) {
      const observer = new ResizeObserver((entries) => {
        callback == null ? void 0 : callback(entries, observer);
        if (!entries.length)
          return;
        if (box === "content") {
          contentRect.value = entries[0].contentRect;
        } else {
          contentRect.value = entries[0].target.getBoundingClientRect();
        }
      });
      vue.onBeforeUnmount(() => {
        observer.disconnect();
      });
      vue.watch(resizeRef, (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(refElement(oldValue));
          contentRect.value = void 0;
        }
        if (newValue)
          observer.observe(refElement(newValue));
      }, {
        flush: "post"
      });
    }
    return {
      resizeRef,
      contentRect: vue.readonly(contentRect)
    };
  }
  const makeVProgressCircularProps = propsFactory({
    bgColor: String,
    color: String,
    indeterminate: [Boolean, String],
    modelValue: {
      type: [Number, String],
      default: 0
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 4
    },
    ...makeComponentProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "div"
    }),
    ...makeThemeProps()
  }, "VProgressCircular");
  const VProgressCircular = genericComponent()({
    name: "VProgressCircular",
    props: makeVProgressCircularProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const MAGIC_RADIUS_CONSTANT = 20;
      const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
      const root = vue.ref();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, "color"));
      const {
        textColorClasses: underlayColorClasses,
        textColorStyles: underlayColorStyles
      } = useTextColor(vue.toRef(props, "bgColor"));
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const {
        resizeRef,
        contentRect
      } = useResizeObserver();
      const normalizedValue = vue.computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
      const width = vue.computed(() => Number(props.width));
      const size = vue.computed(() => {
        return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
      });
      const diameter = vue.computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
      const strokeWidth = vue.computed(() => width.value / size.value * diameter.value);
      const strokeDashOffset = vue.computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
      vue.watchEffect(() => {
        intersectionRef.value = root.value;
        resizeRef.value = root.value;
      });
      useRender(() => vue.createVNode(props.tag, {
        "ref": root,
        "class": ["v-progress-circular", {
          "v-progress-circular--indeterminate": !!props.indeterminate,
          "v-progress-circular--visible": isIntersecting.value,
          "v-progress-circular--disable-shrink": props.indeterminate === "disable-shrink"
        }, themeClasses.value, sizeClasses.value, textColorClasses.value, props.class],
        "style": [sizeStyles.value, textColorStyles.value, props.style],
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
      }, {
        default: () => [vue.createVNode("svg", {
          "style": {
            transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
          },
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": `0 0 ${diameter.value} ${diameter.value}`
        }, [vue.createVNode("circle", {
          "class": ["v-progress-circular__underlay", underlayColorClasses.value],
          "style": underlayColorStyles.value,
          "fill": "transparent",
          "cx": "50%",
          "cy": "50%",
          "r": MAGIC_RADIUS_CONSTANT,
          "stroke-width": strokeWidth.value,
          "stroke-dasharray": CIRCUMFERENCE,
          "stroke-dashoffset": 0
        }, null), vue.createVNode("circle", {
          "class": "v-progress-circular__overlay",
          "fill": "transparent",
          "cx": "50%",
          "cy": "50%",
          "r": MAGIC_RADIUS_CONSTANT,
          "stroke-width": strokeWidth.value,
          "stroke-dasharray": CIRCUMFERENCE,
          "stroke-dashoffset": strokeDashOffset.value
        }, null)]), slots.default && vue.createVNode("div", {
          "class": "v-progress-circular__content"
        }, [slots.default({
          value: normalizedValue.value
        })])]
      }));
      return {};
    }
  });
  const makeDimensionProps = propsFactory({
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String]
  }, "dimension");
  function useDimension(props) {
    const dimensionStyles = vue.computed(() => ({
      height: convertToUnit(props.height),
      maxHeight: convertToUnit(props.maxHeight),
      maxWidth: convertToUnit(props.maxWidth),
      minHeight: convertToUnit(props.minHeight),
      minWidth: convertToUnit(props.minWidth),
      width: convertToUnit(props.width)
    }));
    return {
      dimensionStyles
    };
  }
  const LocaleSymbol = Symbol.for("vuetify:locale");
  function useLocale() {
    const locale = vue.inject(LocaleSymbol);
    if (!locale)
      throw new Error("[Vuetify] Could not find injected locale instance");
    return locale;
  }
  function useRtl() {
    const locale = vue.inject(LocaleSymbol);
    if (!locale)
      throw new Error("[Vuetify] Could not find injected rtl instance");
    return {
      isRtl: locale.isRtl,
      rtlClasses: locale.rtlClasses
    };
  }
  const oppositeMap = {
    center: "center",
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  };
  const makeLocationProps = propsFactory({
    location: String
  }, "location");
  function useLocation(props) {
    let opposite = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let offset = arguments.length > 2 ? arguments[2] : void 0;
    const {
      isRtl
    } = useRtl();
    const locationStyles = vue.computed(() => {
      if (!props.location)
        return {};
      const {
        side,
        align
      } = parseAnchor(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
      function getOffset2(side2) {
        return offset ? offset(side2) : 0;
      }
      const styles = {};
      if (side !== "center") {
        if (opposite)
          styles[oppositeMap[side]] = `calc(100% - ${getOffset2(side)}px)`;
        else
          styles[side] = 0;
      }
      if (align !== "center") {
        if (opposite)
          styles[oppositeMap[align]] = `calc(100% - ${getOffset2(align)}px)`;
        else
          styles[align] = 0;
      } else {
        if (side === "center")
          styles.top = styles.left = "50%";
        else {
          styles[{
            top: "left",
            bottom: "left",
            left: "top",
            right: "top"
          }[side]] = "50%";
        }
        styles.transform = {
          top: "translateX(-50%)",
          bottom: "translateX(-50%)",
          left: "translateY(-50%)",
          right: "translateY(-50%)",
          center: "translate(-50%, -50%)"
        }[side];
      }
      return styles;
    });
    return {
      locationStyles
    };
  }
  const makeVProgressLinearProps = propsFactory({
    absolute: Boolean,
    active: {
      type: Boolean,
      default: true
    },
    bgColor: String,
    bgOpacity: [Number, String],
    bufferValue: {
      type: [Number, String],
      default: 0
    },
    clickable: Boolean,
    color: String,
    height: {
      type: [Number, String],
      default: 4
    },
    indeterminate: Boolean,
    max: {
      type: [Number, String],
      default: 100
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    reverse: Boolean,
    stream: Boolean,
    striped: Boolean,
    roundedBar: Boolean,
    ...makeComponentProps(),
    ...makeLocationProps({
      location: "top"
    }),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, "VProgressLinear");
  const VProgressLinear = genericComponent()({
    name: "VProgressLinear",
    props: makeVProgressLinearProps(),
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const progress = useProxiedModel(props, "modelValue");
      const {
        isRtl,
        rtlClasses
      } = useRtl();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(props, "color");
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.computed(() => props.bgColor || props.color));
      const {
        backgroundColorClasses: barColorClasses,
        backgroundColorStyles: barColorStyles
      } = useBackgroundColor(props, "color");
      const {
        roundedClasses
      } = useRounded(props);
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const max = vue.computed(() => parseInt(props.max, 10));
      const height = vue.computed(() => parseInt(props.height, 10));
      const normalizedBuffer = vue.computed(() => parseFloat(props.bufferValue) / max.value * 100);
      const normalizedValue = vue.computed(() => parseFloat(progress.value) / max.value * 100);
      const isReversed = vue.computed(() => isRtl.value !== props.reverse);
      const transition = vue.computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
      const opacity = vue.computed(() => {
        return props.bgOpacity == null ? props.bgOpacity : parseFloat(props.bgOpacity);
      });
      function handleClick(e) {
        if (!intersectionRef.value)
          return;
        const {
          left,
          right,
          width
        } = intersectionRef.value.getBoundingClientRect();
        const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
        progress.value = Math.round(value / width * max.value);
      }
      useRender(() => vue.createVNode(props.tag, {
        "ref": intersectionRef,
        "class": ["v-progress-linear", {
          "v-progress-linear--absolute": props.absolute,
          "v-progress-linear--active": props.active && isIntersecting.value,
          "v-progress-linear--reverse": isReversed.value,
          "v-progress-linear--rounded": props.rounded,
          "v-progress-linear--rounded-bar": props.roundedBar,
          "v-progress-linear--striped": props.striped
        }, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class],
        "style": [{
          bottom: props.location === "bottom" ? 0 : void 0,
          top: props.location === "top" ? 0 : void 0,
          height: props.active ? convertToUnit(height.value) : 0,
          "--v-progress-linear-height": convertToUnit(height.value),
          ...locationStyles.value
        }, props.style],
        "role": "progressbar",
        "aria-hidden": props.active ? "false" : "true",
        "aria-valuemin": "0",
        "aria-valuemax": props.max,
        "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value,
        "onClick": props.clickable && handleClick
      }, {
        default: () => [props.stream && vue.createVNode("div", {
          "key": "stream",
          "class": ["v-progress-linear__stream", textColorClasses.value],
          "style": {
            ...textColorStyles.value,
            [isReversed.value ? "left" : "right"]: convertToUnit(-height.value),
            borderTop: `${convertToUnit(height.value / 2)} dotted`,
            opacity: opacity.value,
            top: `calc(50% - ${convertToUnit(height.value / 4)})`,
            width: convertToUnit(100 - normalizedBuffer.value, "%"),
            "--v-progress-linear-stream-to": convertToUnit(height.value * (isReversed.value ? 1 : -1))
          }
        }, null), vue.createVNode("div", {
          "class": ["v-progress-linear__background", backgroundColorClasses.value],
          "style": [backgroundColorStyles.value, {
            opacity: opacity.value,
            width: convertToUnit(!props.stream ? 100 : normalizedBuffer.value, "%")
          }]
        }, null), vue.createVNode(vue.Transition, {
          "name": transition.value
        }, {
          default: () => [!props.indeterminate ? vue.createVNode("div", {
            "class": ["v-progress-linear__determinate", barColorClasses.value],
            "style": [barColorStyles.value, {
              width: convertToUnit(normalizedValue.value, "%")
            }]
          }, null) : vue.createVNode("div", {
            "class": "v-progress-linear__indeterminate"
          }, [["long", "short"].map((bar) => vue.createVNode("div", {
            "key": bar,
            "class": ["v-progress-linear__indeterminate", bar, barColorClasses.value],
            "style": barColorStyles.value
          }, null))])]
        }), slots.default && vue.createVNode("div", {
          "class": "v-progress-linear__content"
        }, [slots.default({
          value: normalizedValue.value,
          buffer: normalizedBuffer.value
        })])]
      }));
      return {};
    }
  });
  const makeLoaderProps = propsFactory({
    loading: [Boolean, String]
  }, "loader");
  function useLoader(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const loaderClasses = vue.computed(() => ({
      [`${name}--loading`]: props.loading
    }));
    return {
      loaderClasses
    };
  }
  function LoaderSlot(props, _ref) {
    var _a;
    let {
      slots
    } = _ref;
    return vue.createVNode("div", {
      "class": `${props.name}__loader`
    }, [((_a = slots.default) == null ? void 0 : _a.call(slots, {
      color: props.color,
      isActive: props.active
    })) || vue.createVNode(VProgressLinear, {
      "absolute": props.absolute,
      "active": props.active,
      "color": props.color,
      "height": "2",
      "indeterminate": true
    }, null)]);
  }
  const positionValues = ["static", "relative", "fixed", "absolute", "sticky"];
  const makePositionProps = propsFactory({
    position: {
      type: String,
      validator: (
        /* istanbul ignore next */
        (v) => positionValues.includes(v)
      )
    }
  }, "position");
  function usePosition(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const positionClasses = vue.computed(() => {
      return props.position ? `${name}--${props.position}` : void 0;
    });
    return {
      positionClasses
    };
  }
  function useRoute() {
    const vm = getCurrentInstance("useRoute");
    return vue.computed(() => {
      var _a;
      return (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$route;
    });
  }
  function useRouter() {
    var _a, _b;
    return (_b = (_a = getCurrentInstance("useRouter")) == null ? void 0 : _a.proxy) == null ? void 0 : _b.$router;
  }
  function useLink(props, attrs) {
    const RouterLink = vue.resolveDynamicComponent("RouterLink");
    const isLink = vue.computed(() => !!(props.href || props.to));
    const isClickable = vue.computed(() => {
      return (isLink == null ? void 0 : isLink.value) || hasEvent(attrs, "click") || hasEvent(props, "click");
    });
    if (typeof RouterLink === "string") {
      return {
        isLink,
        isClickable,
        href: vue.toRef(props, "href")
      };
    }
    const link = props.to ? RouterLink.useLink(props) : void 0;
    const route = useRoute();
    return {
      isLink,
      isClickable,
      route: link == null ? void 0 : link.route,
      navigate: link == null ? void 0 : link.navigate,
      isActive: link && vue.computed(() => {
        var _a, _b, _c;
        if (!props.exact)
          return (_a = link.isActive) == null ? void 0 : _a.value;
        if (!route.value)
          return (_b = link.isExactActive) == null ? void 0 : _b.value;
        return ((_c = link.isExactActive) == null ? void 0 : _c.value) && deepEqual(link.route.value.query, route.value.query);
      }),
      href: vue.computed(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
    };
  }
  const makeRouterProps = propsFactory({
    href: String,
    replace: Boolean,
    to: [String, Object],
    exact: Boolean
  }, "router");
  let inTransition = false;
  function useBackButton(router, cb) {
    let popped = false;
    let removeBefore;
    let removeAfter;
    if (IN_BROWSER) {
      vue.nextTick(() => {
        window.addEventListener("popstate", onPopstate);
        removeBefore = router == null ? void 0 : router.beforeEach((to, from, next) => {
          if (!inTransition) {
            setTimeout(() => popped ? cb(next) : next());
          } else {
            popped ? cb(next) : next();
          }
          inTransition = true;
        });
        removeAfter = router == null ? void 0 : router.afterEach(() => {
          inTransition = false;
        });
      });
      vue.onScopeDispose(() => {
        window.removeEventListener("popstate", onPopstate);
        removeBefore == null ? void 0 : removeBefore();
        removeAfter == null ? void 0 : removeAfter();
      });
    }
    function onPopstate(e) {
      var _a;
      if ((_a = e.state) == null ? void 0 : _a.replaced)
        return;
      popped = true;
      setTimeout(() => popped = false);
    }
  }
  function useSelectLink(link, select) {
    vue.watch(() => {
      var _a;
      return (_a = link.isActive) == null ? void 0 : _a.value;
    }, (isActive) => {
      if (link.isLink.value && isActive && select) {
        vue.nextTick(() => {
          select(true);
        });
      }
    }, {
      immediate: true
    });
  }
  const stopSymbol = Symbol("rippleStop");
  const DELAY_RIPPLE = 80;
  function transform(el, value) {
    el.style.transform = value;
    el.style.webkitTransform = value;
  }
  function isTouchEvent(e) {
    return e.constructor.name === "TouchEvent";
  }
  function isKeyboardEvent(e) {
    return e.constructor.name === "KeyboardEvent";
  }
  const calculate = function(e, el) {
    var _a;
    let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    let localX = 0;
    let localY = 0;
    if (!isKeyboardEvent(e)) {
      const offset = el.getBoundingClientRect();
      const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
      localX = target.clientX - offset.left;
      localY = target.clientY - offset.top;
    }
    let radius = 0;
    let scale = 0.3;
    if ((_a = el._ripple) == null ? void 0 : _a.circle) {
      scale = 0.15;
      radius = el.clientWidth / 2;
      radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
    } else {
      radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
    }
    const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
    const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
    const x = value.center ? centerX : `${localX - radius}px`;
    const y = value.center ? centerY : `${localY - radius}px`;
    return {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    };
  };
  const ripples = {
    /* eslint-disable max-statements */
    show(e, el) {
      var _a;
      let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (!((_a = el == null ? void 0 : el._ripple) == null ? void 0 : _a.enabled)) {
        return;
      }
      const container = document.createElement("span");
      const animation = document.createElement("span");
      container.appendChild(animation);
      container.className = "v-ripple__container";
      if (value.class) {
        container.className += ` ${value.class}`;
      }
      const {
        radius,
        scale,
        x,
        y,
        centerX,
        centerY
      } = calculate(e, el, value);
      const size = `${radius * 2}px`;
      animation.className = "v-ripple__animation";
      animation.style.width = size;
      animation.style.height = size;
      el.appendChild(container);
      const computed = window.getComputedStyle(el);
      if (computed && computed.position === "static") {
        el.style.position = "relative";
        el.dataset.previousPosition = "static";
      }
      animation.classList.add("v-ripple__animation--enter");
      animation.classList.add("v-ripple__animation--visible");
      transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
      animation.dataset.activated = String(performance.now());
      setTimeout(() => {
        animation.classList.remove("v-ripple__animation--enter");
        animation.classList.add("v-ripple__animation--in");
        transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      }, 0);
    },
    hide(el) {
      var _a;
      if (!((_a = el == null ? void 0 : el._ripple) == null ? void 0 : _a.enabled))
        return;
      const ripples2 = el.getElementsByClassName("v-ripple__animation");
      if (ripples2.length === 0)
        return;
      const animation = ripples2[ripples2.length - 1];
      if (animation.dataset.isHiding)
        return;
      else
        animation.dataset.isHiding = "true";
      const diff = performance.now() - Number(animation.dataset.activated);
      const delay = Math.max(250 - diff, 0);
      setTimeout(() => {
        animation.classList.remove("v-ripple__animation--in");
        animation.classList.add("v-ripple__animation--out");
        setTimeout(() => {
          var _a2;
          const ripples3 = el.getElementsByClassName("v-ripple__animation");
          if (ripples3.length === 1 && el.dataset.previousPosition) {
            el.style.position = el.dataset.previousPosition;
            delete el.dataset.previousPosition;
          }
          if (((_a2 = animation.parentNode) == null ? void 0 : _a2.parentNode) === el)
            el.removeChild(animation.parentNode);
        }, 300);
      }, delay);
    }
  };
  function isRippleEnabled(value) {
    return typeof value === "undefined" || !!value;
  }
  function rippleShow(e) {
    const value = {};
    const element = e.currentTarget;
    if (!(element == null ? void 0 : element._ripple) || element._ripple.touched || e[stopSymbol])
      return;
    e[stopSymbol] = true;
    if (isTouchEvent(e)) {
      element._ripple.touched = true;
      element._ripple.isTouch = true;
    } else {
      if (element._ripple.isTouch)
        return;
    }
    value.center = element._ripple.centered || isKeyboardEvent(e);
    if (element._ripple.class) {
      value.class = element._ripple.class;
    }
    if (isTouchEvent(e)) {
      if (element._ripple.showTimerCommit)
        return;
      element._ripple.showTimerCommit = () => {
        ripples.show(e, element, value);
      };
      element._ripple.showTimer = window.setTimeout(() => {
        var _a;
        if ((_a = element == null ? void 0 : element._ripple) == null ? void 0 : _a.showTimerCommit) {
          element._ripple.showTimerCommit();
          element._ripple.showTimerCommit = null;
        }
      }, DELAY_RIPPLE);
    } else {
      ripples.show(e, element, value);
    }
  }
  function rippleStop(e) {
    e[stopSymbol] = true;
  }
  function rippleHide(e) {
    const element = e.currentTarget;
    if (!(element == null ? void 0 : element._ripple))
      return;
    window.clearTimeout(element._ripple.showTimer);
    if (e.type === "touchend" && element._ripple.showTimerCommit) {
      element._ripple.showTimerCommit();
      element._ripple.showTimerCommit = null;
      element._ripple.showTimer = window.setTimeout(() => {
        rippleHide(e);
      });
      return;
    }
    window.setTimeout(() => {
      if (element._ripple) {
        element._ripple.touched = false;
      }
    });
    ripples.hide(element);
  }
  function rippleCancelShow(e) {
    const element = e.currentTarget;
    if (!(element == null ? void 0 : element._ripple))
      return;
    if (element._ripple.showTimerCommit) {
      element._ripple.showTimerCommit = null;
    }
    window.clearTimeout(element._ripple.showTimer);
  }
  let keyboardRipple = false;
  function keyboardRippleShow(e) {
    if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
      keyboardRipple = true;
      rippleShow(e);
    }
  }
  function keyboardRippleHide(e) {
    keyboardRipple = false;
    rippleHide(e);
  }
  function focusRippleHide(e) {
    if (keyboardRipple) {
      keyboardRipple = false;
      rippleHide(e);
    }
  }
  function updateRipple(el, binding, wasEnabled) {
    const {
      value,
      modifiers
    } = binding;
    const enabled = isRippleEnabled(value);
    if (!enabled) {
      ripples.hide(el);
    }
    el._ripple = el._ripple ?? {};
    el._ripple.enabled = enabled;
    el._ripple.centered = modifiers.center;
    el._ripple.circle = modifiers.circle;
    if (isObject(value) && value.class) {
      el._ripple.class = value.class;
    }
    if (enabled && !wasEnabled) {
      if (modifiers.stop) {
        el.addEventListener("touchstart", rippleStop, {
          passive: true
        });
        el.addEventListener("mousedown", rippleStop);
        return;
      }
      el.addEventListener("touchstart", rippleShow, {
        passive: true
      });
      el.addEventListener("touchend", rippleHide, {
        passive: true
      });
      el.addEventListener("touchmove", rippleCancelShow, {
        passive: true
      });
      el.addEventListener("touchcancel", rippleHide);
      el.addEventListener("mousedown", rippleShow);
      el.addEventListener("mouseup", rippleHide);
      el.addEventListener("mouseleave", rippleHide);
      el.addEventListener("keydown", keyboardRippleShow);
      el.addEventListener("keyup", keyboardRippleHide);
      el.addEventListener("blur", focusRippleHide);
      el.addEventListener("dragstart", rippleHide, {
        passive: true
      });
    } else if (!enabled && wasEnabled) {
      removeListeners(el);
    }
  }
  function removeListeners(el) {
    el.removeEventListener("mousedown", rippleShow);
    el.removeEventListener("touchstart", rippleShow);
    el.removeEventListener("touchend", rippleHide);
    el.removeEventListener("touchmove", rippleCancelShow);
    el.removeEventListener("touchcancel", rippleHide);
    el.removeEventListener("mouseup", rippleHide);
    el.removeEventListener("mouseleave", rippleHide);
    el.removeEventListener("keydown", keyboardRippleShow);
    el.removeEventListener("keyup", keyboardRippleHide);
    el.removeEventListener("dragstart", rippleHide);
    el.removeEventListener("blur", focusRippleHide);
  }
  function mounted$1(el, binding) {
    updateRipple(el, binding, false);
  }
  function unmounted$1(el) {
    delete el._ripple;
    removeListeners(el);
  }
  function updated(el, binding) {
    if (binding.value === binding.oldValue) {
      return;
    }
    const wasEnabled = isRippleEnabled(binding.oldValue);
    updateRipple(el, binding, wasEnabled);
  }
  const Ripple = {
    mounted: mounted$1,
    unmounted: unmounted$1,
    updated
  };
  const makeVBtnProps = propsFactory({
    active: {
      type: Boolean,
      default: void 0
    },
    symbol: {
      type: null,
      default: VBtnToggleSymbol
    },
    flat: Boolean,
    icon: [Boolean, String, Function, Object],
    prependIcon: IconValue,
    appendIcon: IconValue,
    block: Boolean,
    slim: Boolean,
    stacked: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    text: String,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "button"
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "elevated"
    })
  }, "VBtn");
  const VBtn = genericComponent()({
    name: "VBtn",
    directives: {
      Ripple
    },
    props: makeVBtnProps(),
    emits: {
      "group:selected": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        loaderClasses
      } = useLoader(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props);
      const group = useGroupItem(props, props.symbol, false);
      const link = useLink(props, attrs);
      const isActive = vue.computed(() => {
        var _a;
        if (props.active !== void 0) {
          return props.active;
        }
        if (link.isLink.value) {
          return (_a = link.isActive) == null ? void 0 : _a.value;
        }
        return group == null ? void 0 : group.isSelected.value;
      });
      const isDisabled = vue.computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
      const isElevated = vue.computed(() => {
        return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
      });
      const valueAttr = vue.computed(() => {
        if (props.value === void 0 || typeof props.value === "symbol")
          return void 0;
        return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
      });
      function onClick(e) {
        var _a;
        if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || attrs.target === "_blank"))
          return;
        (_a = link.navigate) == null ? void 0 : _a.call(link, e);
        group == null ? void 0 : group.toggle();
      }
      useSelectLink(link, group == null ? void 0 : group.select);
      useRender(() => {
        var _a, _b;
        const Tag = link.isLink.value ? "a" : props.tag;
        const hasPrepend = !!(props.prependIcon || slots.prepend);
        const hasAppend = !!(props.appendIcon || slots.append);
        const hasIcon = !!(props.icon && props.icon !== true);
        const hasColor = (group == null ? void 0 : group.isSelected.value) && (!link.isLink.value || ((_a = link.isActive) == null ? void 0 : _a.value)) || !group || ((_b = link.isActive) == null ? void 0 : _b.value);
        return vue.withDirectives(vue.createVNode(Tag, {
          "type": Tag === "a" ? void 0 : "button",
          "class": ["v-btn", group == null ? void 0 : group.selectedClass.value, {
            "v-btn--active": isActive.value,
            "v-btn--block": props.block,
            "v-btn--disabled": isDisabled.value,
            "v-btn--elevated": isElevated.value,
            "v-btn--flat": props.flat,
            "v-btn--icon": !!props.icon,
            "v-btn--loading": props.loading,
            "v-btn--slim": props.slim,
            "v-btn--stacked": props.stacked
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
          "style": [hasColor ? colorStyles.value : void 0, dimensionStyles.value, locationStyles.value, sizeStyles.value, props.style],
          "disabled": isDisabled.value || void 0,
          "href": link.href.value,
          "onClick": onClick,
          "value": valueAttr.value
        }, {
          default: () => {
            var _a2;
            return [genOverlays(true, "v-btn"), !props.icon && hasPrepend && vue.createVNode("span", {
              "key": "prepend",
              "class": "v-btn__prepend"
            }, [!slots.prepend ? vue.createVNode(VIcon, {
              "key": "prepend-icon",
              "icon": props.prependIcon
            }, null) : vue.createVNode(VDefaultsProvider, {
              "key": "prepend-defaults",
              "disabled": !props.prependIcon,
              "defaults": {
                VIcon: {
                  icon: props.prependIcon
                }
              }
            }, slots.prepend)]), vue.createVNode("span", {
              "class": "v-btn__content",
              "data-no-activator": ""
            }, [!slots.default && hasIcon ? vue.createVNode(VIcon, {
              "key": "content-icon",
              "icon": props.icon
            }, null) : vue.createVNode(VDefaultsProvider, {
              "key": "content-defaults",
              "disabled": !hasIcon,
              "defaults": {
                VIcon: {
                  icon: props.icon
                }
              }
            }, {
              default: () => {
                var _a3;
                return [((_a3 = slots.default) == null ? void 0 : _a3.call(slots)) ?? props.text];
              }
            })]), !props.icon && hasAppend && vue.createVNode("span", {
              "key": "append",
              "class": "v-btn__append"
            }, [!slots.append ? vue.createVNode(VIcon, {
              "key": "append-icon",
              "icon": props.appendIcon
            }, null) : vue.createVNode(VDefaultsProvider, {
              "key": "append-defaults",
              "disabled": !props.appendIcon,
              "defaults": {
                VIcon: {
                  icon: props.appendIcon
                }
              }
            }, slots.append)]), !!props.loading && vue.createVNode("span", {
              "key": "loader",
              "class": "v-btn__loader"
            }, [((_a2 = slots.loader) == null ? void 0 : _a2.call(slots)) ?? vue.createVNode(VProgressCircular, {
              "color": typeof props.loading === "boolean" ? void 0 : props.loading,
              "indeterminate": true,
              "size": "23",
              "width": "2"
            }, null)])];
          }
        }), [[vue.resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
      });
      return {
        group
      };
    }
  });
  const VCardActions = genericComponent()({
    name: "VCardActions",
    props: makeComponentProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      provideDefaults({
        VBtn: {
          slim: true,
          variant: "text"
        }
      });
      useRender(() => {
        var _a;
        return vue.createVNode("div", {
          "class": ["v-card-actions", props.class],
          "style": props.style
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      });
      return {};
    }
  });
  const VCardSubtitle = createSimpleFunctional("v-card-subtitle");
  const VCardTitle = createSimpleFunctional("v-card-title");
  function useAspectStyles(props) {
    return {
      aspectStyles: vue.computed(() => {
        const ratio = Number(props.aspectRatio);
        return ratio ? {
          paddingBottom: String(1 / ratio * 100) + "%"
        } : void 0;
      })
    };
  }
  const makeVResponsiveProps = propsFactory({
    aspectRatio: [String, Number],
    contentClass: String,
    inline: Boolean,
    ...makeComponentProps(),
    ...makeDimensionProps()
  }, "VResponsive");
  const VResponsive = genericComponent()({
    name: "VResponsive",
    props: makeVResponsiveProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        aspectStyles
      } = useAspectStyles(props);
      const {
        dimensionStyles
      } = useDimension(props);
      useRender(() => {
        var _a;
        return vue.createVNode("div", {
          "class": ["v-responsive", {
            "v-responsive--inline": props.inline
          }, props.class],
          "style": [dimensionStyles.value, props.style]
        }, [vue.createVNode("div", {
          "class": "v-responsive__sizer",
          "style": aspectStyles.value
        }, null), (_a = slots.additional) == null ? void 0 : _a.call(slots), slots.default && vue.createVNode("div", {
          "class": ["v-responsive__content", props.contentClass]
        }, [slots.default()])]);
      });
      return {};
    }
  });
  const makeTransitionProps$1 = propsFactory({
    transition: {
      type: [Boolean, String, Object],
      default: "fade-transition",
      validator: (val) => val !== true
    }
  }, "transition");
  const MaybeTransition = (props, _ref) => {
    let {
      slots
    } = _ref;
    const {
      transition,
      disabled,
      group,
      ...rest
    } = props;
    const {
      component = group ? vue.TransitionGroup : vue.Transition,
      ...customProps
    } = typeof transition === "object" ? transition : {};
    return vue.h(component, vue.mergeProps(typeof transition === "string" ? {
      name: disabled ? "" : transition
    } : customProps, typeof transition === "string" ? {} : {
      disabled,
      group
    }, rest), slots);
  };
  function mounted(el, binding) {
    if (!SUPPORTS_INTERSECTION)
      return;
    const modifiers = binding.modifiers || {};
    const value = binding.value;
    const {
      handler,
      options
    } = typeof value === "object" ? value : {
      handler: value,
      options: {}
    };
    const observer = new IntersectionObserver(function() {
      var _a;
      let entries = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      let observer2 = arguments.length > 1 ? arguments[1] : void 0;
      const _observe = (_a = el._observe) == null ? void 0 : _a[binding.instance.$.uid];
      if (!_observe)
        return;
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) {
        handler(isIntersecting, entries, observer2);
      }
      if (isIntersecting && modifiers.once)
        unmounted(el, binding);
      else
        _observe.init = true;
    }, options);
    el._observe = Object(el._observe);
    el._observe[binding.instance.$.uid] = {
      init: false,
      observer
    };
    observer.observe(el);
  }
  function unmounted(el, binding) {
    var _a;
    const observe = (_a = el._observe) == null ? void 0 : _a[binding.instance.$.uid];
    if (!observe)
      return;
    observe.observer.unobserve(el);
    delete el._observe[binding.instance.$.uid];
  }
  const Intersect = {
    mounted,
    unmounted
  };
  const Intersect$1 = Intersect;
  const makeVImgProps = propsFactory({
    alt: String,
    cover: Boolean,
    color: String,
    draggable: {
      type: [Boolean, String],
      default: void 0
    },
    eager: Boolean,
    gradient: String,
    lazySrc: String,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: void 0,
        rootMargin: void 0,
        threshold: void 0
      })
    },
    sizes: String,
    src: {
      type: [String, Object],
      default: ""
    },
    crossorigin: String,
    referrerpolicy: String,
    srcset: String,
    position: String,
    ...makeVResponsiveProps(),
    ...makeComponentProps(),
    ...makeRoundedProps(),
    ...makeTransitionProps$1()
  }, "VImg");
  const VImg = genericComponent()({
    name: "VImg",
    directives: {
      intersect: Intersect$1
    },
    props: makeVImgProps(),
    emits: {
      loadstart: (value) => true,
      load: (value) => true,
      error: (value) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, "color"));
      const {
        roundedClasses
      } = useRounded(props);
      const vm = getCurrentInstance("VImg");
      const currentSrc = vue.shallowRef("");
      const image = vue.ref();
      const state = vue.shallowRef(props.eager ? "loading" : "idle");
      const naturalWidth = vue.shallowRef();
      const naturalHeight = vue.shallowRef();
      const normalisedSrc = vue.computed(() => {
        return props.src && typeof props.src === "object" ? {
          src: props.src.src,
          srcset: props.srcset || props.src.srcset,
          lazySrc: props.lazySrc || props.src.lazySrc,
          aspect: Number(props.aspectRatio || props.src.aspect || 0)
        } : {
          src: props.src,
          srcset: props.srcset,
          lazySrc: props.lazySrc,
          aspect: Number(props.aspectRatio || 0)
        };
      });
      const aspectRatio = vue.computed(() => {
        return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
      });
      vue.watch(() => props.src, () => {
        init(state.value !== "idle");
      });
      vue.watch(aspectRatio, (val, oldVal) => {
        if (!val && oldVal && image.value) {
          pollForSize(image.value);
        }
      });
      vue.onBeforeMount(() => init());
      function init(isIntersecting) {
        if (props.eager && isIntersecting)
          return;
        if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager)
          return;
        state.value = "loading";
        if (normalisedSrc.value.lazySrc) {
          const lazyImg = new Image();
          lazyImg.src = normalisedSrc.value.lazySrc;
          pollForSize(lazyImg, null);
        }
        if (!normalisedSrc.value.src)
          return;
        vue.nextTick(() => {
          var _a;
          emit("loadstart", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
          setTimeout(() => {
            var _a2;
            if (vm.isUnmounted)
              return;
            if ((_a2 = image.value) == null ? void 0 : _a2.complete) {
              if (!image.value.naturalWidth) {
                onError();
              }
              if (state.value === "error")
                return;
              if (!aspectRatio.value)
                pollForSize(image.value, null);
              if (state.value === "loading")
                onLoad();
            } else {
              if (!aspectRatio.value)
                pollForSize(image.value);
              getSrc();
            }
          });
        });
      }
      function onLoad() {
        var _a;
        if (vm.isUnmounted)
          return;
        getSrc();
        pollForSize(image.value);
        state.value = "loaded";
        emit("load", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
      }
      function onError() {
        var _a;
        if (vm.isUnmounted)
          return;
        state.value = "error";
        emit("error", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
      }
      function getSrc() {
        const img = image.value;
        if (img)
          currentSrc.value = img.currentSrc || img.src;
      }
      let timer = -1;
      vue.onBeforeUnmount(() => {
        clearTimeout(timer);
      });
      function pollForSize(img) {
        let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
        const poll = () => {
          clearTimeout(timer);
          if (vm.isUnmounted)
            return;
          const {
            naturalHeight: imgHeight,
            naturalWidth: imgWidth
          } = img;
          if (imgHeight || imgWidth) {
            naturalWidth.value = imgWidth;
            naturalHeight.value = imgHeight;
          } else if (!img.complete && state.value === "loading" && timeout != null) {
            timer = window.setTimeout(poll, timeout);
          } else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
            naturalWidth.value = 1;
            naturalHeight.value = 1;
          }
        };
        poll();
      }
      const containClasses = vue.computed(() => ({
        "v-img__img--cover": props.cover,
        "v-img__img--contain": !props.cover
      }));
      const __image = () => {
        var _a;
        if (!normalisedSrc.value.src || state.value === "idle")
          return null;
        const img = vue.createVNode("img", {
          "class": ["v-img__img", containClasses.value],
          "style": {
            objectPosition: props.position
          },
          "src": normalisedSrc.value.src,
          "srcset": normalisedSrc.value.srcset,
          "alt": props.alt,
          "crossorigin": props.crossorigin,
          "referrerpolicy": props.referrerpolicy,
          "draggable": props.draggable,
          "sizes": props.sizes,
          "ref": image,
          "onLoad": onLoad,
          "onError": onError
        }, null);
        const sources = (_a = slots.sources) == null ? void 0 : _a.call(slots);
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [vue.withDirectives(sources ? vue.createVNode("picture", {
            "class": "v-img__picture"
          }, [sources, img]) : img, [[vue.vShow, state.value === "loaded"]])]
        });
      };
      const __preloadImage = () => vue.createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && vue.createVNode("img", {
          "class": ["v-img__img", "v-img__img--preload", containClasses.value],
          "style": {
            objectPosition: props.position
          },
          "src": normalisedSrc.value.lazySrc,
          "alt": props.alt,
          "crossorigin": props.crossorigin,
          "referrerpolicy": props.referrerpolicy,
          "draggable": props.draggable
        }, null)]
      });
      const __placeholder = () => {
        if (!slots.placeholder)
          return null;
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && vue.createVNode("div", {
            "class": "v-img__placeholder"
          }, [slots.placeholder()])]
        });
      };
      const __error = () => {
        if (!slots.error)
          return null;
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [state.value === "error" && vue.createVNode("div", {
            "class": "v-img__error"
          }, [slots.error()])]
        });
      };
      const __gradient = () => {
        if (!props.gradient)
          return null;
        return vue.createVNode("div", {
          "class": "v-img__gradient",
          "style": {
            backgroundImage: `linear-gradient(${props.gradient})`
          }
        }, null);
      };
      const isBooted = vue.shallowRef(false);
      {
        const stop = vue.watch(aspectRatio, (val) => {
          if (val) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                isBooted.value = true;
              });
            });
            stop();
          }
        });
      }
      useRender(() => {
        const responsiveProps = VResponsive.filterProps(props);
        return vue.withDirectives(vue.createVNode(VResponsive, vue.mergeProps({
          "class": ["v-img", {
            "v-img--booting": !isBooted.value
          }, backgroundColorClasses.value, roundedClasses.value, props.class],
          "style": [{
            width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width)
          }, backgroundColorStyles.value, props.style]
        }, responsiveProps, {
          "aspectRatio": aspectRatio.value,
          "aria-label": props.alt,
          "role": props.alt ? "img" : void 0
        }), {
          additional: () => vue.createVNode(vue.Fragment, null, [vue.createVNode(__image, null, null), vue.createVNode(__preloadImage, null, null), vue.createVNode(__gradient, null, null), vue.createVNode(__placeholder, null, null), vue.createVNode(__error, null, null)]),
          default: slots.default
        }), [[vue.resolveDirective("intersect"), {
          handler: init,
          options: props.options
        }, null, {
          once: true
        }]]);
      });
      return {
        currentSrc,
        image,
        state,
        naturalWidth,
        naturalHeight
      };
    }
  });
  const makeVAvatarProps = propsFactory({
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    image: String,
    text: String,
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "flat"
    })
  }, "VAvatar");
  const VAvatar = genericComponent()({
    name: "VAvatar",
    props: makeVAvatarProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props);
      useRender(() => vue.createVNode(props.tag, {
        "class": ["v-avatar", {
          "v-avatar--start": props.start,
          "v-avatar--end": props.end
        }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, sizeStyles.value, props.style]
      }, {
        default: () => [!slots.default ? props.image ? vue.createVNode(VImg, {
          "key": "image",
          "src": props.image,
          "alt": "",
          "cover": true
        }, null) : props.icon ? vue.createVNode(VIcon, {
          "key": "icon",
          "icon": props.icon
        }, null) : props.text : vue.createVNode(VDefaultsProvider, {
          "key": "content-defaults",
          "defaults": {
            VImg: {
              cover: true,
              image: props.image
            },
            VIcon: {
              icon: props.icon
            }
          }
        }, {
          default: () => [slots.default()]
        }), genOverlays(false, "v-avatar")]
      }));
      return {};
    }
  });
  const makeCardItemProps = propsFactory({
    appendAvatar: String,
    appendIcon: IconValue,
    prependAvatar: String,
    prependIcon: IconValue,
    subtitle: [String, Number],
    title: [String, Number],
    ...makeComponentProps(),
    ...makeDensityProps()
  }, "VCardItem");
  const VCardItem = genericComponent()({
    name: "VCardItem",
    props: makeCardItemProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        var _a;
        const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
        const hasPrepend = !!(hasPrependMedia || slots.prepend);
        const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
        const hasAppend = !!(hasAppendMedia || slots.append);
        const hasTitle = !!(props.title != null || slots.title);
        const hasSubtitle = !!(props.subtitle != null || slots.subtitle);
        return vue.createVNode("div", {
          "class": ["v-card-item", props.class],
          "style": props.style
        }, [hasPrepend && vue.createVNode("div", {
          "key": "prepend",
          "class": "v-card-item__prepend"
        }, [!slots.prepend ? vue.createVNode(vue.Fragment, null, [props.prependAvatar && vue.createVNode(VAvatar, {
          "key": "prepend-avatar",
          "density": props.density,
          "image": props.prependAvatar
        }, null), props.prependIcon && vue.createVNode(VIcon, {
          "key": "prepend-icon",
          "density": props.density,
          "icon": props.prependIcon
        }, null)]) : vue.createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !hasPrependMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.prependAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.prependIcon
            }
          }
        }, slots.prepend)]), vue.createVNode("div", {
          "class": "v-card-item__content"
        }, [hasTitle && vue.createVNode(VCardTitle, {
          "key": "title"
        }, {
          default: () => {
            var _a2;
            return [((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) ?? props.title];
          }
        }), hasSubtitle && vue.createVNode(VCardSubtitle, {
          "key": "subtitle"
        }, {
          default: () => {
            var _a2;
            return [((_a2 = slots.subtitle) == null ? void 0 : _a2.call(slots)) ?? props.subtitle];
          }
        }), (_a = slots.default) == null ? void 0 : _a.call(slots)]), hasAppend && vue.createVNode("div", {
          "key": "append",
          "class": "v-card-item__append"
        }, [!slots.append ? vue.createVNode(vue.Fragment, null, [props.appendIcon && vue.createVNode(VIcon, {
          "key": "append-icon",
          "density": props.density,
          "icon": props.appendIcon
        }, null), props.appendAvatar && vue.createVNode(VAvatar, {
          "key": "append-avatar",
          "density": props.density,
          "image": props.appendAvatar
        }, null)]) : vue.createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !hasAppendMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.appendAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.appendIcon
            }
          }
        }, slots.append)])]);
      });
      return {};
    }
  });
  const VCardText = createSimpleFunctional("v-card-text");
  const makeVCardProps = propsFactory({
    appendAvatar: String,
    appendIcon: IconValue,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: {
      type: Boolean,
      default: void 0
    },
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    subtitle: [String, Number],
    text: [String, Number],
    title: [String, Number],
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "elevated"
    })
  }, "VCard");
  const VCard = genericComponent()({
    name: "VCard",
    directives: {
      Ripple
    },
    props: makeVCardProps(),
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        loaderClasses
      } = useLoader(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      const link = useLink(props, attrs);
      const isLink = vue.computed(() => props.link !== false && link.isLink.value);
      const isClickable = vue.computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value));
      useRender(() => {
        const Tag = isLink.value ? "a" : props.tag;
        const hasTitle = !!(slots.title || props.title != null);
        const hasSubtitle = !!(slots.subtitle || props.subtitle != null);
        const hasHeader = hasTitle || hasSubtitle;
        const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
        const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
        const hasImage = !!(slots.image || props.image);
        const hasCardItem = hasHeader || hasPrepend || hasAppend;
        const hasText = !!(slots.text || props.text != null);
        return vue.withDirectives(vue.createVNode(Tag, {
          "class": ["v-card", {
            "v-card--disabled": props.disabled,
            "v-card--flat": props.flat,
            "v-card--hover": props.hover && !(props.disabled || props.flat),
            "v-card--link": isClickable.value
          }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class],
          "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, props.style],
          "href": link.href.value,
          "onClick": isClickable.value && link.navigate,
          "tabindex": props.disabled ? -1 : void 0
        }, {
          default: () => {
            var _a;
            return [hasImage && vue.createVNode("div", {
              "key": "image",
              "class": "v-card__image"
            }, [!slots.image ? vue.createVNode(VImg, {
              "key": "image-img",
              "cover": true,
              "src": props.image
            }, null) : vue.createVNode(VDefaultsProvider, {
              "key": "image-defaults",
              "disabled": !props.image,
              "defaults": {
                VImg: {
                  cover: true,
                  src: props.image
                }
              }
            }, slots.image)]), vue.createVNode(LoaderSlot, {
              "name": "v-card",
              "active": !!props.loading,
              "color": typeof props.loading === "boolean" ? void 0 : props.loading
            }, {
              default: slots.loader
            }), hasCardItem && vue.createVNode(VCardItem, {
              "key": "item",
              "prependAvatar": props.prependAvatar,
              "prependIcon": props.prependIcon,
              "title": props.title,
              "subtitle": props.subtitle,
              "appendAvatar": props.appendAvatar,
              "appendIcon": props.appendIcon
            }, {
              default: slots.item,
              prepend: slots.prepend,
              title: slots.title,
              subtitle: slots.subtitle,
              append: slots.append
            }), hasText && vue.createVNode(VCardText, {
              "key": "text"
            }, {
              default: () => {
                var _a2;
                return [((_a2 = slots.text) == null ? void 0 : _a2.call(slots)) ?? props.text];
              }
            }), (_a = slots.default) == null ? void 0 : _a.call(slots), slots.actions && vue.createVNode(VCardActions, null, {
              default: slots.actions
            }), genOverlays(isClickable.value, "v-card")];
          }
        }), [[vue.resolveDirective("ripple"), isClickable.value && props.ripple]]);
      });
      return {};
    }
  });
  const makeVContainerProps = propsFactory({
    fluid: {
      type: Boolean,
      default: false
    },
    ...makeComponentProps(),
    ...makeTagProps()
  }, "VContainer");
  const VContainer = genericComponent()({
    name: "VContainer",
    props: makeVContainerProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        rtlClasses
      } = useRtl();
      useRender(() => vue.createVNode(props.tag, {
        "class": ["v-container", {
          "v-container--fluid": props.fluid
        }, rtlClasses.value, props.class],
        "style": props.style
      }, slots));
      return {};
    }
  });
  const breakpoints = ["sm", "md", "lg", "xl", "xxl"];
  const DisplaySymbol = Symbol.for("vuetify:display");
  function useDisplay() {
    let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const display = vue.inject(DisplaySymbol);
    if (!display)
      throw new Error("Could not find Vuetify display injection");
    const mobile = vue.computed(() => {
      if (!props.mobileBreakpoint)
        return display.mobile.value;
      const breakpointValue = typeof props.mobileBreakpoint === "number" ? props.mobileBreakpoint : display.thresholds.value[props.mobileBreakpoint];
      return display.width.value < breakpointValue;
    });
    const displayClasses = vue.computed(() => {
      if (!name)
        return {};
      return {
        [`${name}--mobile`]: mobile.value
      };
    });
    return {
      ...display,
      displayClasses,
      mobile
    };
  }
  const breakpointProps = (() => {
    return breakpoints.reduce((props, val) => {
      props[val] = {
        type: [Boolean, String, Number],
        default: false
      };
      return props;
    }, {});
  })();
  const offsetProps = (() => {
    return breakpoints.reduce((props, val) => {
      const offsetKey = "offset" + vue.capitalize(val);
      props[offsetKey] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();
  const orderProps = (() => {
    return breakpoints.reduce((props, val) => {
      const orderKey = "order" + vue.capitalize(val);
      props[orderKey] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();
  const propMap$1 = {
    col: Object.keys(breakpointProps),
    offset: Object.keys(offsetProps),
    order: Object.keys(orderProps)
  };
  function breakpointClass$1(type, prop, val) {
    let className = type;
    if (val == null || val === false) {
      return void 0;
    }
    if (prop) {
      const breakpoint = prop.replace(type, "");
      className += `-${breakpoint}`;
    }
    if (type === "col") {
      className = "v-" + className;
    }
    if (type === "col" && (val === "" || val === true)) {
      return className.toLowerCase();
    }
    className += `-${val}`;
    return className.toLowerCase();
  }
  const ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
  const makeVColProps = propsFactory({
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: (str) => ALIGN_SELF_VALUES.includes(str)
    },
    ...makeComponentProps(),
    ...makeTagProps()
  }, "VCol");
  const VCol = genericComponent()({
    name: "VCol",
    props: makeVColProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const classes = vue.computed(() => {
        const classList = [];
        let type;
        for (type in propMap$1) {
          propMap$1[type].forEach((prop) => {
            const value = props[prop];
            const className = breakpointClass$1(type, prop, value);
            if (className)
              classList.push(className);
          });
        }
        const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
        classList.push({
          // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
          "v-col": !hasColClasses || !props.cols,
          [`v-col-${props.cols}`]: props.cols,
          [`offset-${props.offset}`]: props.offset,
          [`order-${props.order}`]: props.order,
          [`align-self-${props.alignSelf}`]: props.alignSelf
        });
        return classList;
      });
      return () => {
        var _a;
        return vue.h(props.tag, {
          class: [classes.value, props.class],
          style: props.style
        }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
  });
  const ALIGNMENT = ["start", "end", "center"];
  const SPACE = ["space-between", "space-around", "space-evenly"];
  function makeRowProps(prefix, def) {
    return breakpoints.reduce((props, val) => {
      const prefixKey = prefix + vue.capitalize(val);
      props[prefixKey] = def();
      return props;
    }, {});
  }
  const ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
  const alignValidator = (str) => ALIGN_VALUES.includes(str);
  const alignProps = makeRowProps("align", () => ({
    type: String,
    default: null,
    validator: alignValidator
  }));
  const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
  const justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
  const justifyProps = makeRowProps("justify", () => ({
    type: String,
    default: null,
    validator: justifyValidator
  }));
  const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
  const alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
  const alignContentProps = makeRowProps("alignContent", () => ({
    type: String,
    default: null,
    validator: alignContentValidator
  }));
  const propMap = {
    align: Object.keys(alignProps),
    justify: Object.keys(justifyProps),
    alignContent: Object.keys(alignContentProps)
  };
  const classMap = {
    align: "align",
    justify: "justify",
    alignContent: "align-content"
  };
  function breakpointClass(type, prop, val) {
    let className = classMap[type];
    if (val == null) {
      return void 0;
    }
    if (prop) {
      const breakpoint = prop.replace(type, "");
      className += `-${breakpoint}`;
    }
    className += `-${val}`;
    return className.toLowerCase();
  }
  const makeVRowProps = propsFactory({
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps,
    ...makeComponentProps(),
    ...makeTagProps()
  }, "VRow");
  const VRow = genericComponent()({
    name: "VRow",
    props: makeVRowProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const classes = vue.computed(() => {
        const classList = [];
        let type;
        for (type in propMap) {
          propMap[type].forEach((prop) => {
            const value = props[prop];
            const className = breakpointClass(type, prop, value);
            if (className)
              classList.push(className);
          });
        }
        classList.push({
          "v-row--no-gutters": props.noGutters,
          "v-row--dense": props.dense,
          [`align-${props.align}`]: props.align,
          [`justify-${props.justify}`]: props.justify,
          [`align-content-${props.alignContent}`]: props.alignContent
        });
        return classList;
      });
      return () => {
        var _a;
        return vue.h(props.tag, {
          class: ["v-row", classes.value, props.class],
          style: props.style
        }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
  });
  const VSpacer = createSimpleFunctional("v-spacer", "div", "VSpacer");
  const makeVDatePickerControlsProps = propsFactory({
    active: {
      type: [String, Array],
      default: void 0
    },
    disabled: {
      type: [Boolean, String, Array],
      default: false
    },
    nextIcon: {
      type: [String],
      default: "$next"
    },
    prevIcon: {
      type: [String],
      default: "$prev"
    },
    modeIcon: {
      type: [String],
      default: "$subgroup"
    },
    text: String,
    viewMode: {
      type: String,
      default: "month"
    }
  }, "VDatePickerControls");
  const VDatePickerControls = genericComponent()({
    name: "VDatePickerControls",
    props: makeVDatePickerControlsProps(),
    emits: {
      "click:year": () => true,
      "click:month": () => true,
      "click:prev": () => true,
      "click:next": () => true,
      "click:text": () => true
    },
    setup(props, _ref) {
      let {
        emit
      } = _ref;
      const disableMonth = vue.computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes("text") : !!props.disabled;
      });
      const disableYear = vue.computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes("mode") : !!props.disabled;
      });
      const disablePrev = vue.computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes("prev") : !!props.disabled;
      });
      const disableNext = vue.computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes("next") : !!props.disabled;
      });
      function onClickPrev() {
        emit("click:prev");
      }
      function onClickNext() {
        emit("click:next");
      }
      function onClickYear() {
        emit("click:year");
      }
      function onClickMonth() {
        emit("click:month");
      }
      useRender(() => {
        return vue.createVNode("div", {
          "class": ["v-date-picker-controls"]
        }, [vue.createVNode(VBtn, {
          "class": "v-date-picker-controls__month-btn",
          "disabled": disableMonth.value,
          "text": props.text,
          "variant": "text",
          "rounded": true,
          "onClick": onClickMonth
        }, null), vue.createVNode(VBtn, {
          "key": "mode-btn",
          "class": "v-date-picker-controls__mode-btn",
          "disabled": disableYear.value,
          "density": "comfortable",
          "icon": props.modeIcon,
          "variant": "text",
          "onClick": onClickYear
        }, null), vue.createVNode(VSpacer, {
          "key": "mode-spacer"
        }, null), vue.createVNode("div", {
          "key": "month-buttons",
          "class": "v-date-picker-controls__month"
        }, [vue.createVNode(VBtn, {
          "disabled": disablePrev.value,
          "icon": props.prevIcon,
          "variant": "text",
          "onClick": onClickPrev
        }, null), vue.createVNode(VBtn, {
          "disabled": disableNext.value,
          "icon": props.nextIcon,
          "variant": "text",
          "onClick": onClickNext
        }, null)])]);
      });
      return {};
    }
  });
  const makeVDatePickerHeaderProps = propsFactory({
    appendIcon: String,
    color: String,
    header: String,
    transition: String,
    onClick: EventProp()
  }, "VDatePickerHeader");
  const VDatePickerHeader = genericComponent()({
    name: "VDatePickerHeader",
    props: makeVDatePickerHeaderProps(),
    emits: {
      click: () => true,
      "click:append": () => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(props, "color");
      function onClick() {
        emit("click");
      }
      function onClickAppend() {
        emit("click:append");
      }
      useRender(() => {
        const hasContent = !!(slots.default || props.header);
        const hasAppend = !!(slots.append || props.appendIcon);
        return vue.createVNode("div", {
          "class": ["v-date-picker-header", {
            "v-date-picker-header--clickable": !!props.onClick
          }, backgroundColorClasses.value],
          "style": backgroundColorStyles.value,
          "onClick": onClick
        }, [slots.prepend && vue.createVNode("div", {
          "key": "prepend",
          "class": "v-date-picker-header__prepend"
        }, [slots.prepend()]), hasContent && vue.createVNode(MaybeTransition, {
          "key": "content",
          "name": props.transition
        }, {
          default: () => {
            var _a;
            return [vue.createVNode("div", {
              "key": props.header,
              "class": "v-date-picker-header__content"
            }, [((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? props.header])];
          }
        }), hasAppend && vue.createVNode("div", {
          "class": "v-date-picker-header__append"
        }, [!slots.append ? vue.createVNode(VBtn, {
          "key": "append-btn",
          "icon": props.appendIcon,
          "variant": "text",
          "onClick": onClickAppend
        }, null) : vue.createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !props.appendIcon,
          "defaults": {
            VBtn: {
              icon: props.appendIcon,
              variant: "text"
            }
          }
        }, {
          default: () => {
            var _a;
            return [(_a = slots.append) == null ? void 0 : _a.call(slots)];
          }
        })])]);
      });
      return {};
    }
  });
  const DateOptionsSymbol = Symbol.for("vuetify:date-options");
  function createInstance(options, locale) {
    const instance = vue.reactive(typeof options.adapter === "function" ? new options.adapter({
      locale: options.locale[locale.current.value] ?? locale.current.value,
      formats: options.formats
    }) : options.adapter);
    vue.watch(locale.current, (value) => {
      instance.locale = options.locale[value] ?? value ?? instance.locale;
    });
    return instance;
  }
  function useDate() {
    const options = vue.inject(DateOptionsSymbol);
    if (!options)
      throw new Error("[Vuetify] Could not find injected date options");
    const locale = useLocale();
    return createInstance(options, locale);
  }
  function getWeek(adapter, value) {
    const date = adapter.toJsDate(value);
    let year = date.getFullYear();
    let d1w1 = new Date(year, 0, 1);
    if (date < d1w1) {
      year = year - 1;
      d1w1 = new Date(year, 0, 1);
    } else {
      const tv = new Date(year + 1, 0, 1);
      if (date >= tv) {
        year = year + 1;
        d1w1 = tv;
      }
    }
    const diffTime = Math.abs(date.getTime() - d1w1.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    return Math.floor(diffDays / 7) + 1;
  }
  const makeCalendarProps = propsFactory({
    allowedDates: [Array, Function],
    disabled: Boolean,
    displayValue: null,
    modelValue: Array,
    month: [Number, String],
    max: null,
    min: null,
    showAdjacentMonths: Boolean,
    year: [Number, String],
    weekdays: {
      type: Array,
      default: () => [0, 1, 2, 3, 4, 5, 6]
    }
  }, "calendar");
  function useCalendar(props) {
    const adapter = useDate();
    const model = useProxiedModel(props, "modelValue", [], (v) => wrapInArray(v));
    const displayValue = vue.computed(() => {
      if (props.displayValue)
        return adapter.date(props.displayValue);
      if (model.value.length > 0)
        return adapter.date(model.value[0]);
      if (props.min)
        return adapter.date(props.min);
      if (Array.isArray(props.allowedDates))
        return adapter.date(props.allowedDates[0]);
      return adapter.date();
    });
    const year = useProxiedModel(props, "year", void 0, (v) => {
      const value = v != null ? Number(v) : adapter.getYear(displayValue.value);
      return adapter.startOfYear(adapter.setYear(adapter.date(), value));
    }, (v) => adapter.getYear(v));
    const month = useProxiedModel(props, "month", void 0, (v) => {
      const value = v != null ? Number(v) : adapter.getMonth(displayValue.value);
      const date = adapter.setYear(adapter.startOfMonth(adapter.date()), adapter.getYear(year.value));
      return adapter.setMonth(date, value);
    }, (v) => adapter.getMonth(v));
    const weeksInMonth = vue.computed(() => {
      const weeks = adapter.getWeekArray(month.value);
      const days = weeks.flat();
      const daysInMonth2 = 6 * 7;
      if (days.length < daysInMonth2) {
        const lastDay = days[days.length - 1];
        let week = [];
        for (let day = 1; day <= daysInMonth2 - days.length; day++) {
          week.push(adapter.addDays(lastDay, day));
          if (day % 7 === 0) {
            weeks.push(week);
            week = [];
          }
        }
      }
      return weeks;
    });
    function genDays(days, today) {
      return days.filter((date) => {
        return props.weekdays.includes(adapter.toJsDate(date).getDay());
      }).map((date, index) => {
        const isoDate = adapter.toISO(date);
        const isAdjacent = !adapter.isSameMonth(date, month.value);
        const isStart = adapter.isSameDay(date, adapter.startOfMonth(month.value));
        const isEnd = adapter.isSameDay(date, adapter.endOfMonth(month.value));
        const isSame = adapter.isSameDay(date, month.value);
        return {
          date,
          isoDate,
          formatted: adapter.format(date, "keyboardDate"),
          year: adapter.getYear(date),
          month: adapter.getMonth(date),
          isDisabled: isDisabled(date),
          isWeekStart: index % 7 === 0,
          isWeekEnd: index % 7 === 6,
          isToday: adapter.isSameDay(date, today),
          isAdjacent,
          isHidden: isAdjacent && !props.showAdjacentMonths,
          isStart,
          isSelected: model.value.some((value) => adapter.isSameDay(date, value)),
          isEnd,
          isSame,
          localized: adapter.format(date, "dayOfMonth")
        };
      });
    }
    const daysInWeek = vue.computed(() => {
      const lastDay = adapter.startOfWeek(model.value);
      const week = [];
      for (let day = 0; day <= 6; day++) {
        week.push(adapter.addDays(lastDay, day));
      }
      const days = week;
      const today = adapter.date();
      return genDays(days, today);
    });
    const daysInMonth = vue.computed(() => {
      const days = weeksInMonth.value.flat();
      const today = adapter.date();
      return genDays(days, today);
    });
    const weekNumbers = vue.computed(() => {
      return weeksInMonth.value.map((week) => {
        return week.length ? getWeek(adapter, week[0]) : null;
      });
    });
    function isDisabled(value) {
      if (props.disabled)
        return true;
      const date = adapter.date(value);
      if (props.min && adapter.isAfter(adapter.date(props.min), date))
        return true;
      if (props.max && adapter.isAfter(date, adapter.date(props.max)))
        return true;
      if (Array.isArray(props.allowedDates) && props.allowedDates.length > 0) {
        return !props.allowedDates.some((d) => adapter.isSameDay(adapter.date(d), date));
      }
      if (typeof props.allowedDates === "function") {
        return !props.allowedDates(date);
      }
      return false;
    }
    return {
      displayValue,
      daysInMonth,
      daysInWeek,
      genDays,
      model,
      weeksInMonth,
      weekNumbers
    };
  }
  const makeVDatePickerMonthProps = propsFactory({
    color: String,
    hideWeekdays: Boolean,
    multiple: [Boolean, Number, String],
    showWeek: Boolean,
    ...makeCalendarProps()
  }, "VDatePickerMonth");
  const VDatePickerMonth = genericComponent()({
    name: "VDatePickerMonth",
    props: makeVDatePickerMonthProps(),
    emits: {
      "update:modelValue": (date) => true,
      "update:month": (date) => true,
      "update:year": (date) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const daysRef = vue.ref();
      const {
        daysInMonth,
        model,
        weekNumbers
      } = useCalendar(props);
      const adapter = useDate();
      const rangeStart = vue.shallowRef();
      const rangeStop = vue.shallowRef();
      const atMax = vue.computed(() => {
        const max = ["number", "string"].includes(typeof props.multiple) ? Number(props.multiple) : Infinity;
        return model.value.length >= max;
      });
      function onRangeClick(value) {
        const _value = adapter.startOfDay(value);
        if (!rangeStart.value) {
          rangeStart.value = _value;
          model.value = [rangeStart.value];
        } else if (!rangeStop.value) {
          if (adapter.isSameDay(value, rangeStart.value)) {
            rangeStart.value = void 0;
            model.value = [];
            return;
          } else if (adapter.isBefore(value, rangeStart.value)) {
            rangeStop.value = rangeStart.value;
            rangeStart.value = _value;
          } else {
            rangeStop.value = _value;
          }
          const diff = adapter.getDiff(rangeStop.value, rangeStart.value, "days");
          const datesInRange = [rangeStart.value];
          for (let i = 1; i < diff; i++) {
            const nextDate = adapter.addDays(rangeStart.value, i);
            datesInRange.push(nextDate);
          }
          datesInRange.push(rangeStop.value);
          model.value = datesInRange;
        } else {
          rangeStart.value = value;
          rangeStop.value = void 0;
          model.value = [rangeStart.value];
        }
      }
      function onMultipleClick(value) {
        const index = model.value.findIndex((selection) => adapter.isSameDay(selection, value));
        if (index === -1) {
          model.value = [...model.value, value];
        } else {
          const value2 = [...model.value];
          value2.splice(index, 1);
          model.value = value2;
        }
      }
      function onClick(value) {
        if (props.multiple === "range") {
          onRangeClick(value);
        } else if (props.multiple) {
          onMultipleClick(value);
        } else {
          model.value = [value];
        }
      }
      return () => vue.createVNode("div", {
        "class": "v-date-picker-month"
      }, [props.showWeek && vue.createVNode("div", {
        "key": "weeks",
        "class": "v-date-picker-month__weeks"
      }, [!props.hideWeekdays && vue.createVNode("div", {
        "key": "hide-week-days",
        "class": "v-date-picker-month__day"
      }, [vue.createTextVNode(" ")]), weekNumbers.value.map((week) => vue.createVNode("div", {
        "class": ["v-date-picker-month__day", "v-date-picker-month__day--adjacent"]
      }, [week]))]), vue.createVNode("div", {
        "ref": daysRef,
        "class": "v-date-picker-month__days"
      }, [!props.hideWeekdays && adapter.getWeekdays().map((weekDay) => vue.createVNode("div", {
        "class": ["v-date-picker-month__day", "v-date-picker-month__weekday"]
      }, [weekDay])), daysInMonth.value.map((item, i) => {
        const slotProps = {
          props: {
            onClick: () => onClick(item.date)
          },
          item,
          i
        };
        if (atMax.value && !item.isSelected) {
          item.isDisabled = true;
        }
        return vue.createVNode("div", {
          "class": ["v-date-picker-month__day", {
            "v-date-picker-month__day--adjacent": item.isAdjacent,
            "v-date-picker-month__day--hide-adjacent": item.isHidden,
            "v-date-picker-month__day--selected": item.isSelected,
            "v-date-picker-month__day--week-end": item.isWeekEnd,
            "v-date-picker-month__day--week-start": item.isWeekStart
          }],
          "data-v-date": !item.isDisabled ? item.isoDate : void 0
        }, [(props.showAdjacentMonths || !item.isAdjacent) && vue.createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              class: "v-date-picker-month__day-btn",
              color: (item.isSelected || item.isToday) && !item.isDisabled ? props.color : void 0,
              disabled: item.isDisabled,
              icon: true,
              ripple: false,
              text: item.localized,
              variant: item.isDisabled ? item.isToday ? "outlined" : "text" : item.isToday && !item.isSelected ? "outlined" : "flat",
              onClick: () => onClick(item.date)
            }
          }
        }, {
          default: () => {
            var _a;
            return [((_a = slots.day) == null ? void 0 : _a.call(slots, slotProps)) ?? vue.createVNode(VBtn, slotProps.props, null)];
          }
        })]);
      })])]);
    }
  });
  const makeVDatePickerMonthsProps = propsFactory({
    color: String,
    height: [String, Number],
    modelValue: Number
  }, "VDatePickerMonths");
  const VDatePickerMonths = genericComponent()({
    name: "VDatePickerMonths",
    props: makeVDatePickerMonthsProps(),
    emits: {
      "update:modelValue": (date) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const adapter = useDate();
      const model = useProxiedModel(props, "modelValue");
      const months = vue.computed(() => {
        let date = adapter.startOfYear(adapter.date());
        return createRange(12).map((i) => {
          const text = adapter.format(date, "monthShort");
          date = adapter.getNextMonth(date);
          return {
            text,
            value: i
          };
        });
      });
      vue.watchEffect(() => {
        model.value = model.value ?? adapter.getMonth(adapter.date());
      });
      useRender(() => vue.createVNode("div", {
        "class": "v-date-picker-months",
        "style": {
          height: convertToUnit(props.height)
        }
      }, [vue.createVNode("div", {
        "class": "v-date-picker-months__content"
      }, [months.value.map((month, i) => {
        var _a;
        const btnProps = {
          active: model.value === i,
          color: model.value === i ? props.color : void 0,
          rounded: true,
          text: month.text,
          variant: model.value === month.value ? "flat" : "text",
          onClick: () => onClick(i)
        };
        function onClick(i2) {
          if (model.value === i2) {
            emit("update:modelValue", model.value);
            return;
          }
          model.value = i2;
        }
        return ((_a = slots.month) == null ? void 0 : _a.call(slots, {
          month,
          i,
          props: btnProps
        })) ?? vue.createVNode(VBtn, vue.mergeProps({
          "key": "month"
        }, btnProps), null);
      })])]));
      return {};
    }
  });
  const makeVDatePickerYearsProps = propsFactory({
    color: String,
    height: [String, Number],
    min: null,
    max: null,
    modelValue: Number
  }, "VDatePickerYears");
  const VDatePickerYears = genericComponent()({
    name: "VDatePickerYears",
    props: makeVDatePickerYearsProps(),
    emits: {
      "update:modelValue": (year) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const adapter = useDate();
      const model = useProxiedModel(props, "modelValue");
      const years = vue.computed(() => {
        const year = adapter.getYear(adapter.date());
        let min = year - 100;
        let max = year + 52;
        if (props.min) {
          min = adapter.getYear(adapter.date(props.min));
        }
        if (props.max) {
          max = adapter.getYear(adapter.date(props.max));
        }
        let date = adapter.startOfYear(adapter.date());
        date = adapter.setYear(date, min);
        return createRange(max - min + 1, min).map((i) => {
          const text = adapter.format(date, "year");
          date = adapter.setYear(date, adapter.getYear(date) + 1);
          return {
            text,
            value: i
          };
        });
      });
      vue.watchEffect(() => {
        model.value = model.value ?? adapter.getYear(adapter.date());
      });
      const yearRef = vue.ref();
      vue.onMounted(async () => {
        var _a;
        await vue.nextTick();
        (_a = yearRef.value) == null ? void 0 : _a.$el.scrollIntoView({
          block: "center"
        });
      });
      useRender(() => vue.createVNode("div", {
        "class": "v-date-picker-years",
        "style": {
          height: convertToUnit(props.height)
        }
      }, [vue.createVNode("div", {
        "class": "v-date-picker-years__content"
      }, [years.value.map((year, i) => {
        var _a;
        const btnProps = {
          ref: model.value === year.value ? yearRef : void 0,
          active: model.value === year.value,
          color: model.value === year.value ? props.color : void 0,
          rounded: true,
          text: year.text,
          variant: model.value === year.value ? "flat" : "text",
          onClick: () => {
            if (model.value === year.value) {
              emit("update:modelValue", model.value);
              return;
            }
            model.value = year.value;
          }
        };
        return ((_a = slots.year) == null ? void 0 : _a.call(slots, {
          year,
          i,
          props: btnProps
        })) ?? vue.createVNode(VBtn, vue.mergeProps({
          "key": "month"
        }, btnProps), null);
      })])]));
      return {};
    }
  });
  const makeTransitionProps = propsFactory({
    disabled: Boolean,
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }, "transition");
  function createCssTransition(name, origin, mode) {
    return genericComponent()({
      name,
      props: makeTransitionProps({
        mode,
        origin
      }),
      setup(props, _ref) {
        let {
          slots
        } = _ref;
        const functions = {
          onBeforeEnter(el) {
            if (props.origin) {
              el.style.transformOrigin = props.origin;
            }
          },
          onLeave(el) {
            if (props.leaveAbsolute) {
              const {
                offsetTop,
                offsetLeft,
                offsetWidth,
                offsetHeight
              } = el;
              el._transitionInitialStyles = {
                position: el.style.position,
                top: el.style.top,
                left: el.style.left,
                width: el.style.width,
                height: el.style.height
              };
              el.style.position = "absolute";
              el.style.top = `${offsetTop}px`;
              el.style.left = `${offsetLeft}px`;
              el.style.width = `${offsetWidth}px`;
              el.style.height = `${offsetHeight}px`;
            }
            if (props.hideOnLeave) {
              el.style.setProperty("display", "none", "important");
            }
          },
          onAfterLeave(el) {
            if (props.leaveAbsolute && (el == null ? void 0 : el._transitionInitialStyles)) {
              const {
                position,
                top,
                left,
                width,
                height
              } = el._transitionInitialStyles;
              delete el._transitionInitialStyles;
              el.style.position = position || "";
              el.style.top = top || "";
              el.style.left = left || "";
              el.style.width = width || "";
              el.style.height = height || "";
            }
          }
        };
        return () => {
          const tag = props.group ? vue.TransitionGroup : vue.Transition;
          return vue.h(tag, {
            name: props.disabled ? "" : name,
            css: !props.disabled,
            ...props.group ? void 0 : {
              mode: props.mode
            },
            ...props.disabled ? {} : functions
          }, slots.default);
        };
      }
    });
  }
  function createJavascriptTransition(name, functions) {
    let mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
    return genericComponent()({
      name,
      props: {
        mode: {
          type: String,
          default: mode
        },
        disabled: Boolean
      },
      setup(props, _ref2) {
        let {
          slots
        } = _ref2;
        return () => {
          return vue.h(vue.Transition, {
            name: props.disabled ? "" : name,
            css: !props.disabled,
            // mode: props.mode, // TODO: vuejs/vue-next#3104
            ...props.disabled ? {} : functions
          }, slots.default);
        };
      }
    });
  }
  function ExpandTransitionGenerator() {
    let expandedParentClass = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const sizeProperty = x ? "width" : "height";
    const offsetProperty = vue.camelize(`offset-${sizeProperty}`);
    return {
      onBeforeEnter(el) {
        el._parent = el.parentNode;
        el._initialStyle = {
          transition: el.style.transition,
          overflow: el.style.overflow,
          [sizeProperty]: el.style[sizeProperty]
        };
      },
      onEnter(el) {
        const initialStyle = el._initialStyle;
        el.style.setProperty("transition", "none", "important");
        el.style.overflow = "hidden";
        const offset = `${el[offsetProperty]}px`;
        el.style[sizeProperty] = "0";
        void el.offsetHeight;
        el.style.transition = initialStyle.transition;
        if (expandedParentClass && el._parent) {
          el._parent.classList.add(expandedParentClass);
        }
        requestAnimationFrame(() => {
          el.style[sizeProperty] = offset;
        });
      },
      onAfterEnter: resetStyles,
      onEnterCancelled: resetStyles,
      onLeave(el) {
        el._initialStyle = {
          transition: "",
          overflow: el.style.overflow,
          [sizeProperty]: el.style[sizeProperty]
        };
        el.style.overflow = "hidden";
        el.style[sizeProperty] = `${el[offsetProperty]}px`;
        void el.offsetHeight;
        requestAnimationFrame(() => el.style[sizeProperty] = "0");
      },
      onAfterLeave,
      onLeaveCancelled: onAfterLeave
    };
    function onAfterLeave(el) {
      if (expandedParentClass && el._parent) {
        el._parent.classList.remove(expandedParentClass);
      }
      resetStyles(el);
    }
    function resetStyles(el) {
      const size = el._initialStyle[sizeProperty];
      el.style.overflow = el._initialStyle.overflow;
      if (size != null)
        el.style[sizeProperty] = size;
      delete el._initialStyle;
    }
  }
  const makeVDialogTransitionProps = propsFactory({
    target: [Object, Array]
  }, "v-dialog-transition");
  const VDialogTransition = genericComponent()({
    name: "VDialogTransition",
    props: makeVDialogTransitionProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const functions = {
        onBeforeEnter(el) {
          el.style.pointerEvents = "none";
          el.style.visibility = "hidden";
        },
        async onEnter(el, done) {
          var _a;
          await new Promise((resolve) => requestAnimationFrame(resolve));
          await new Promise((resolve) => requestAnimationFrame(resolve));
          el.style.visibility = "";
          const {
            x,
            y,
            sx,
            sy,
            speed
          } = getDimensions(props.target, el);
          const animation = animate(el, [{
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }, {}], {
            duration: 225 * speed,
            easing: deceleratedEasing
          });
          (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
            animate(el2, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {}], {
              duration: 225 * 2 * speed,
              easing: standardEasing
            });
          });
          animation.finished.then(() => done());
        },
        onAfterEnter(el) {
          el.style.removeProperty("pointer-events");
        },
        onBeforeLeave(el) {
          el.style.pointerEvents = "none";
        },
        async onLeave(el, done) {
          var _a;
          await new Promise((resolve) => requestAnimationFrame(resolve));
          const {
            x,
            y,
            sx,
            sy,
            speed
          } = getDimensions(props.target, el);
          const animation = animate(el, [{}, {
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }], {
            duration: 125 * speed,
            easing: acceleratedEasing
          });
          animation.finished.then(() => done());
          (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
            animate(el2, [{}, {
              opacity: 0,
              offset: 0.2
            }, {
              opacity: 0
            }], {
              duration: 125 * 2 * speed,
              easing: standardEasing
            });
          });
        },
        onAfterLeave(el) {
          el.style.removeProperty("pointer-events");
        }
      };
      return () => {
        return props.target ? vue.createVNode(vue.Transition, vue.mergeProps({
          "name": "dialog-transition"
        }, functions, {
          "css": false
        }), slots) : vue.createVNode(vue.Transition, {
          "name": "dialog-transition"
        }, slots);
      };
    }
  });
  function getChildren(el) {
    var _a;
    const els = (_a = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : _a.children;
    return els && [...els];
  }
  function getDimensions(target, el) {
    const targetBox = getTargetBox(target);
    const elBox = nullifyTransforms(el);
    const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
    const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
    let offsetX = targetBox.left + targetBox.width / 2;
    if (anchorSide === "left" || anchorOffset === "left") {
      offsetX -= targetBox.width / 2;
    } else if (anchorSide === "right" || anchorOffset === "right") {
      offsetX += targetBox.width / 2;
    }
    let offsetY = targetBox.top + targetBox.height / 2;
    if (anchorSide === "top" || anchorOffset === "top") {
      offsetY -= targetBox.height / 2;
    } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
      offsetY += targetBox.height / 2;
    }
    const tsx = targetBox.width / elBox.width;
    const tsy = targetBox.height / elBox.height;
    const maxs = Math.max(1, tsx, tsy);
    const sx = tsx / maxs || 0;
    const sy = tsy / maxs || 0;
    const asa = elBox.width * elBox.height / (window.innerWidth * window.innerHeight);
    const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
    return {
      x: offsetX - (originX + elBox.left),
      y: offsetY - (originY + elBox.top),
      sx,
      sy,
      speed
    };
  }
  createCssTransition("fab-transition", "center center", "out-in");
  createCssTransition("dialog-bottom-transition");
  createCssTransition("dialog-top-transition");
  const VFadeTransition = createCssTransition("fade-transition");
  createCssTransition("scale-transition");
  createCssTransition("scroll-x-transition");
  createCssTransition("scroll-x-reverse-transition");
  createCssTransition("scroll-y-transition");
  createCssTransition("scroll-y-reverse-transition");
  createCssTransition("slide-x-transition");
  createCssTransition("slide-x-reverse-transition");
  const VSlideYTransition = createCssTransition("slide-y-transition");
  createCssTransition("slide-y-reverse-transition");
  createJavascriptTransition("expand-transition", ExpandTransitionGenerator());
  const VExpandXTransition = createJavascriptTransition("expand-x-transition", ExpandTransitionGenerator("", true));
  const VPickerTitle = createSimpleFunctional("v-picker-title");
  const makeVSheetProps = propsFactory({
    color: String,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, "VSheet");
  const VSheet = genericComponent()({
    name: "VSheet",
    props: makeVSheetProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, "color"));
      const {
        borderClasses
      } = useBorder(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      useRender(() => vue.createVNode(props.tag, {
        "class": ["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style]
      }, slots));
      return {};
    }
  });
  const makeVPickerProps = propsFactory({
    bgColor: String,
    landscape: Boolean,
    title: String,
    hideHeader: Boolean,
    ...makeVSheetProps()
  }, "VPicker");
  const VPicker = genericComponent()({
    name: "VPicker",
    props: makeVPickerProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, "color"));
      useRender(() => {
        const sheetProps = VSheet.filterProps(props);
        const hasTitle = !!(props.title || slots.title);
        return vue.createVNode(VSheet, vue.mergeProps(sheetProps, {
          "color": props.bgColor,
          "class": ["v-picker", {
            "v-picker--landscape": props.landscape,
            "v-picker--with-actions": !!slots.actions
          }, props.class],
          "style": props.style
        }), {
          default: () => {
            var _a;
            return [!props.hideHeader && vue.createVNode("div", {
              "key": "header",
              "class": [backgroundColorClasses.value],
              "style": [backgroundColorStyles.value]
            }, [hasTitle && vue.createVNode(VPickerTitle, {
              "key": "picker-title"
            }, {
              default: () => {
                var _a2;
                return [((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) ?? props.title];
              }
            }), slots.header && vue.createVNode("div", {
              "class": "v-picker__header"
            }, [slots.header()])]), vue.createVNode("div", {
              "class": "v-picker__body"
            }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), slots.actions && vue.createVNode(VDefaultsProvider, {
              "defaults": {
                VBtn: {
                  slim: true,
                  variant: "text"
                }
              }
            }, {
              default: () => [vue.createVNode("div", {
                "class": "v-picker__actions"
              }, [slots.actions()])]
            })];
          }
        });
      });
      return {};
    }
  });
  const makeVDatePickerProps = propsFactory({
    // TODO: implement in v3.5
    // calendarIcon: {
    //   type: String,
    //   default: '$calendar',
    // },
    // keyboardIcon: {
    //   type: String,
    //   default: '$edit',
    // },
    // inputMode: {
    //   type: String as PropType<'calendar' | 'keyboard'>,
    //   default: 'calendar',
    // },
    // inputText: {
    //   type: String,
    //   default: '$vuetify.datePicker.input.placeholder',
    // },
    // inputPlaceholder: {
    //   type: String,
    //   default: 'dd/mm/yyyy',
    // },
    header: {
      type: String,
      default: "$vuetify.datePicker.header"
    },
    ...makeVDatePickerControlsProps(),
    ...makeVDatePickerMonthProps(),
    ...omit(makeVDatePickerMonthsProps(), ["modelValue"]),
    ...omit(makeVDatePickerYearsProps(), ["modelValue"]),
    ...makeVPickerProps({
      title: "$vuetify.datePicker.title"
    }),
    modelValue: null
  }, "VDatePicker");
  const VDatePicker = genericComponent()({
    name: "VDatePicker",
    props: makeVDatePickerProps(),
    emits: {
      "update:modelValue": (date) => true,
      "update:month": (date) => true,
      "update:year": (date) => true,
      // 'update:inputMode': (date: any) => true,
      "update:viewMode": (date) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const adapter = useDate();
      const {
        t
      } = useLocale();
      const model = useProxiedModel(props, "modelValue", void 0, (v) => wrapInArray(v), (v) => props.multiple ? v : v[0]);
      const viewMode = useProxiedModel(props, "viewMode");
      const internal = vue.computed(() => {
        var _a;
        const value = adapter.date((_a = model.value) == null ? void 0 : _a[0]);
        return value && adapter.isValid(value) ? value : adapter.date();
      });
      const month = vue.ref(Number(props.month ?? adapter.getMonth(adapter.startOfMonth(internal.value))));
      const year = vue.ref(Number(props.year ?? adapter.getYear(adapter.startOfYear(adapter.setMonth(internal.value, month.value)))));
      const isReversing = vue.shallowRef(false);
      const header = vue.computed(() => {
        return props.multiple && model.value.length > 1 ? t("$vuetify.datePicker.itemsSelected", model.value.length) : model.value[0] && adapter.isValid(model.value[0]) ? adapter.format(model.value[0], "normalDateWithWeekday") : t(props.header);
      });
      const text = vue.computed(() => {
        return adapter.format(adapter.date(new Date(year.value, month.value, 1)), "monthAndYear");
      });
      const headerTransition = vue.computed(() => `date-picker-header${isReversing.value ? "-reverse" : ""}-transition`);
      const minDate = vue.computed(() => {
        const date = adapter.date(props.min);
        return props.min && adapter.isValid(date) ? date : null;
      });
      const maxDate = vue.computed(() => {
        const date = adapter.date(props.max);
        return props.max && adapter.isValid(date) ? date : null;
      });
      const disabled = vue.computed(() => {
        if (props.disabled)
          return true;
        const targets = [];
        if (viewMode.value !== "month") {
          targets.push(...["prev", "next"]);
        } else {
          let _date = adapter.date();
          _date = adapter.setYear(_date, year.value);
          _date = adapter.setMonth(_date, month.value);
          if (minDate.value) {
            const date = adapter.addDays(adapter.startOfMonth(_date), -1);
            adapter.isAfter(minDate.value, date) && targets.push("prev");
          }
          if (maxDate.value) {
            const date = adapter.addDays(adapter.endOfMonth(_date), 1);
            adapter.isAfter(date, maxDate.value) && targets.push("next");
          }
        }
        return targets;
      });
      function onClickNext() {
        if (month.value < 11) {
          month.value++;
        } else {
          year.value++;
          month.value = 0;
          onUpdateYear(year.value);
        }
        onUpdateMonth(month.value);
      }
      function onClickPrev() {
        if (month.value > 0) {
          month.value--;
        } else {
          year.value--;
          month.value = 11;
          onUpdateYear(year.value);
        }
        onUpdateMonth(month.value);
      }
      function onClickDate() {
        viewMode.value = "month";
      }
      function onClickMonth() {
        viewMode.value = viewMode.value === "months" ? "month" : "months";
      }
      function onClickYear() {
        viewMode.value = viewMode.value === "year" ? "month" : "year";
      }
      function onUpdateMonth(value) {
        if (viewMode.value === "months")
          onClickMonth();
        emit("update:month", value);
      }
      function onUpdateYear(value) {
        if (viewMode.value === "year")
          onClickYear();
        emit("update:year", value);
      }
      vue.watch(model, (val, oldVal) => {
        const before = adapter.date(wrapInArray(val)[0]);
        const after = adapter.date(wrapInArray(oldVal)[0]);
        isReversing.value = adapter.isBefore(before, after);
      });
      useRender(() => {
        const pickerProps = VPicker.filterProps(props);
        const datePickerControlsProps = VDatePickerControls.filterProps(props);
        const datePickerHeaderProps = VDatePickerHeader.filterProps(props);
        const datePickerMonthProps = VDatePickerMonth.filterProps(props);
        const datePickerMonthsProps = omit(VDatePickerMonths.filterProps(props), ["modelValue"]);
        const datePickerYearsProps = omit(VDatePickerYears.filterProps(props), ["modelValue"]);
        const headerProps = {
          header: header.value,
          transition: headerTransition.value
        };
        return vue.createVNode(VPicker, vue.mergeProps(pickerProps, {
          "class": ["v-date-picker", `v-date-picker--${viewMode.value}`, {
            "v-date-picker--show-week": props.showWeek
          }, props.class],
          "style": props.style
        }), {
          title: () => {
            var _a;
            return ((_a = slots.title) == null ? void 0 : _a.call(slots)) ?? vue.createVNode("div", {
              "class": "v-date-picker__title"
            }, [t(props.title)]);
          },
          header: () => slots.header ? vue.createVNode(VDefaultsProvider, {
            "defaults": {
              VDatePickerHeader: {
                ...headerProps
              }
            }
          }, {
            default: () => {
              var _a;
              return [(_a = slots.header) == null ? void 0 : _a.call(slots, headerProps)];
            }
          }) : vue.createVNode(VDatePickerHeader, vue.mergeProps({
            "key": "header"
          }, datePickerHeaderProps, headerProps, {
            "onClick": viewMode.value !== "month" ? onClickDate : void 0
          }), {
            ...slots,
            default: void 0
          }),
          default: () => vue.createVNode(vue.Fragment, null, [vue.createVNode(VDatePickerControls, vue.mergeProps(datePickerControlsProps, {
            "disabled": disabled.value,
            "text": text.value,
            "onClick:next": onClickNext,
            "onClick:prev": onClickPrev,
            "onClick:month": onClickMonth,
            "onClick:year": onClickYear
          }), null), vue.createVNode(VFadeTransition, {
            "hideOnLeave": true
          }, {
            default: () => [viewMode.value === "months" ? vue.createVNode(VDatePickerMonths, vue.mergeProps({
              "key": "date-picker-months"
            }, datePickerMonthsProps, {
              "modelValue": month.value,
              "onUpdate:modelValue": [($event) => month.value = $event, onUpdateMonth],
              "min": minDate.value,
              "max": maxDate.value
            }), null) : viewMode.value === "year" ? vue.createVNode(VDatePickerYears, vue.mergeProps({
              "key": "date-picker-years"
            }, datePickerYearsProps, {
              "modelValue": year.value,
              "onUpdate:modelValue": [($event) => year.value = $event, onUpdateYear],
              "min": minDate.value,
              "max": maxDate.value
            }), null) : vue.createVNode(VDatePickerMonth, vue.mergeProps({
              "key": "date-picker-month"
            }, datePickerMonthProps, {
              "modelValue": model.value,
              "onUpdate:modelValue": ($event) => model.value = $event,
              "month": month.value,
              "onUpdate:month": [($event) => month.value = $event, onUpdateMonth],
              "year": year.value,
              "onUpdate:year": [($event) => year.value = $event, onUpdateYear],
              "min": minDate.value,
              "max": maxDate.value
            }), null)]
          })]),
          actions: slots.actions
        });
      });
      return {};
    }
  });
  function elementToViewport(point, offset) {
    return {
      x: point.x + offset.x,
      y: point.y + offset.y
    };
  }
  function getOffset(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  }
  function anchorToPoint(anchor, box) {
    if (anchor.side === "top" || anchor.side === "bottom") {
      const {
        side,
        align
      } = anchor;
      const x = align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align;
      const y = side === "top" ? 0 : side === "bottom" ? box.height : side;
      return elementToViewport({
        x,
        y
      }, box);
    } else if (anchor.side === "left" || anchor.side === "right") {
      const {
        side,
        align
      } = anchor;
      const x = side === "left" ? 0 : side === "right" ? box.width : side;
      const y = align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align;
      return elementToViewport({
        x,
        y
      }, box);
    }
    return elementToViewport({
      x: box.width / 2,
      y: box.height / 2
    }, box);
  }
  const locationStrategies = {
    static: staticLocationStrategy,
    // specific viewport position, usually centered
    connected: connectedLocationStrategy
    // connected to a certain element
  };
  const makeLocationStrategyProps = propsFactory({
    locationStrategy: {
      type: [String, Function],
      default: "static",
      validator: (val) => typeof val === "function" || val in locationStrategies
    },
    location: {
      type: String,
      default: "bottom"
    },
    origin: {
      type: String,
      default: "auto"
    },
    offset: [Number, String, Array]
  }, "VOverlay-location-strategies");
  function useLocationStrategies(props, data) {
    const contentStyles = vue.ref({});
    const updateLocation = vue.ref();
    if (IN_BROWSER) {
      useToggleScope(() => !!(data.isActive.value && props.locationStrategy), (reset) => {
        var _a, _b;
        vue.watch(() => props.locationStrategy, reset);
        vue.onScopeDispose(() => {
          window.removeEventListener("resize", onResize);
          updateLocation.value = void 0;
        });
        window.addEventListener("resize", onResize, {
          passive: true
        });
        if (typeof props.locationStrategy === "function") {
          updateLocation.value = (_a = props.locationStrategy(data, props, contentStyles)) == null ? void 0 : _a.updateLocation;
        } else {
          updateLocation.value = (_b = locationStrategies[props.locationStrategy](data, props, contentStyles)) == null ? void 0 : _b.updateLocation;
        }
      });
    }
    function onResize(e) {
      var _a;
      (_a = updateLocation.value) == null ? void 0 : _a.call(updateLocation, e);
    }
    return {
      contentStyles,
      updateLocation
    };
  }
  function staticLocationStrategy() {
  }
  function getIntrinsicSize(el, isRtl) {
    if (isRtl) {
      el.style.removeProperty("left");
    } else {
      el.style.removeProperty("right");
    }
    const contentBox = nullifyTransforms(el);
    if (isRtl) {
      contentBox.x += parseFloat(el.style.right || 0);
    } else {
      contentBox.x -= parseFloat(el.style.left || 0);
    }
    contentBox.y -= parseFloat(el.style.top || 0);
    return contentBox;
  }
  function connectedLocationStrategy(data, props, contentStyles) {
    const activatorFixed = Array.isArray(data.target.value) || isFixedPosition(data.target.value);
    if (activatorFixed) {
      Object.assign(contentStyles.value, {
        position: "fixed",
        top: 0,
        [data.isRtl.value ? "right" : "left"]: 0
      });
    }
    const {
      preferredAnchor,
      preferredOrigin
    } = destructComputed(() => {
      const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
      const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);
      if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
        return {
          preferredAnchor: flipCorner(parsedAnchor),
          preferredOrigin: flipCorner(parsedOrigin)
        };
      } else {
        return {
          preferredAnchor: parsedAnchor,
          preferredOrigin: parsedOrigin
        };
      }
    });
    const [minWidth, minHeight, maxWidth, maxHeight] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((key) => {
      return vue.computed(() => {
        const val = parseFloat(props[key]);
        return isNaN(val) ? Infinity : val;
      });
    });
    const offset = vue.computed(() => {
      if (Array.isArray(props.offset)) {
        return props.offset;
      }
      if (typeof props.offset === "string") {
        const offset2 = props.offset.split(" ").map(parseFloat);
        if (offset2.length < 2)
          offset2.push(0);
        return offset2;
      }
      return typeof props.offset === "number" ? [props.offset, 0] : [0, 0];
    });
    let observe = false;
    const observer = new ResizeObserver(() => {
      if (observe)
        updateLocation();
    });
    vue.watch([data.target, data.contentEl], (_ref, _ref2) => {
      let [newTarget, newContentEl] = _ref;
      let [oldTarget, oldContentEl] = _ref2;
      if (oldTarget && !Array.isArray(oldTarget))
        observer.unobserve(oldTarget);
      if (newTarget && !Array.isArray(newTarget))
        observer.observe(newTarget);
      if (oldContentEl)
        observer.unobserve(oldContentEl);
      if (newContentEl)
        observer.observe(newContentEl);
    }, {
      immediate: true
    });
    vue.onScopeDispose(() => {
      observer.disconnect();
    });
    function updateLocation() {
      observe = false;
      requestAnimationFrame(() => observe = true);
      if (!data.target.value || !data.contentEl.value)
        return;
      const targetBox = getTargetBox(data.target.value);
      const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
      const scrollParents = getScrollParents(data.contentEl.value);
      const viewportMargin = 12;
      if (!scrollParents.length) {
        scrollParents.push(document.documentElement);
        if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
          contentBox.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
          contentBox.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
        }
      }
      const viewport = scrollParents.reduce((box, el) => {
        const rect = el.getBoundingClientRect();
        const scrollBox = new Box({
          x: el === document.documentElement ? 0 : rect.x,
          y: el === document.documentElement ? 0 : rect.y,
          width: el.clientWidth,
          height: el.clientHeight
        });
        if (box) {
          return new Box({
            x: Math.max(box.left, scrollBox.left),
            y: Math.max(box.top, scrollBox.top),
            width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
            height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
          });
        }
        return scrollBox;
      }, void 0);
      viewport.x += viewportMargin;
      viewport.y += viewportMargin;
      viewport.width -= viewportMargin * 2;
      viewport.height -= viewportMargin * 2;
      let placement = {
        anchor: preferredAnchor.value,
        origin: preferredOrigin.value
      };
      function checkOverflow(_placement) {
        const box = new Box(contentBox);
        const targetPoint = anchorToPoint(_placement.anchor, targetBox);
        const contentPoint = anchorToPoint(_placement.origin, box);
        let {
          x: x2,
          y: y2
        } = getOffset(targetPoint, contentPoint);
        switch (_placement.anchor.side) {
          case "top":
            y2 -= offset.value[0];
            break;
          case "bottom":
            y2 += offset.value[0];
            break;
          case "left":
            x2 -= offset.value[0];
            break;
          case "right":
            x2 += offset.value[0];
            break;
        }
        switch (_placement.anchor.align) {
          case "top":
            y2 -= offset.value[1];
            break;
          case "bottom":
            y2 += offset.value[1];
            break;
          case "left":
            x2 -= offset.value[1];
            break;
          case "right":
            x2 += offset.value[1];
            break;
        }
        box.x += x2;
        box.y += y2;
        box.width = Math.min(box.width, maxWidth.value);
        box.height = Math.min(box.height, maxHeight.value);
        const overflows = getOverflow(box, viewport);
        return {
          overflows,
          x: x2,
          y: y2
        };
      }
      let x = 0;
      let y = 0;
      const available = {
        x: 0,
        y: 0
      };
      const flipped = {
        x: false,
        y: false
      };
      let resets = -1;
      while (true) {
        if (resets++ > 10) {
          consoleError("Infinite loop detected in connectedLocationStrategy");
          break;
        }
        const {
          x: _x,
          y: _y,
          overflows
        } = checkOverflow(placement);
        x += _x;
        y += _y;
        contentBox.x += _x;
        contentBox.y += _y;
        {
          const axis2 = getAxis(placement.anchor);
          const hasOverflowX = overflows.x.before || overflows.x.after;
          const hasOverflowY = overflows.y.before || overflows.y.after;
          let reset = false;
          ["x", "y"].forEach((key) => {
            if (key === "x" && hasOverflowX && !flipped.x || key === "y" && hasOverflowY && !flipped.y) {
              const newPlacement = {
                anchor: {
                  ...placement.anchor
                },
                origin: {
                  ...placement.origin
                }
              };
              const flip = key === "x" ? axis2 === "y" ? flipAlign : flipSide : axis2 === "y" ? flipSide : flipAlign;
              newPlacement.anchor = flip(newPlacement.anchor);
              newPlacement.origin = flip(newPlacement.origin);
              const {
                overflows: newOverflows
              } = checkOverflow(newPlacement);
              if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
                placement = newPlacement;
                reset = flipped[key] = true;
              }
            }
          });
          if (reset)
            continue;
        }
        if (overflows.x.before) {
          x += overflows.x.before;
          contentBox.x += overflows.x.before;
        }
        if (overflows.x.after) {
          x -= overflows.x.after;
          contentBox.x -= overflows.x.after;
        }
        if (overflows.y.before) {
          y += overflows.y.before;
          contentBox.y += overflows.y.before;
        }
        if (overflows.y.after) {
          y -= overflows.y.after;
          contentBox.y -= overflows.y.after;
        }
        {
          const overflows2 = getOverflow(contentBox, viewport);
          available.x = viewport.width - overflows2.x.before - overflows2.x.after;
          available.y = viewport.height - overflows2.y.before - overflows2.y.after;
          x += overflows2.x.before;
          contentBox.x += overflows2.x.before;
          y += overflows2.y.before;
          contentBox.y += overflows2.y.before;
        }
        break;
      }
      const axis = getAxis(placement.anchor);
      Object.assign(contentStyles.value, {
        "--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
        transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
        // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
        top: convertToUnit(pixelRound(y)),
        left: data.isRtl.value ? void 0 : convertToUnit(pixelRound(x)),
        right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : void 0,
        minWidth: convertToUnit(axis === "y" ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
        maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
        maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
      });
      return {
        available,
        contentBox
      };
    }
    vue.watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
    vue.nextTick(() => {
      const result = updateLocation();
      if (!result)
        return;
      const {
        available,
        contentBox
      } = result;
      if (contentBox.height > available.y) {
        requestAnimationFrame(() => {
          updateLocation();
          requestAnimationFrame(() => {
            updateLocation();
          });
        });
      }
    });
    return {
      updateLocation
    };
  }
  function pixelRound(val) {
    return Math.round(val * devicePixelRatio) / devicePixelRatio;
  }
  function pixelCeil(val) {
    return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
  }
  let clean = true;
  const frames = [];
  function requestNewFrame(cb) {
    if (!clean || frames.length) {
      frames.push(cb);
      run();
    } else {
      clean = false;
      cb();
      run();
    }
  }
  let raf = -1;
  function run() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const frame = frames.shift();
      if (frame)
        frame();
      if (frames.length)
        run();
      else
        clean = true;
    });
  }
  const scrollStrategies = {
    none: null,
    close: closeScrollStrategy,
    block: blockScrollStrategy,
    reposition: repositionScrollStrategy
  };
  const makeScrollStrategyProps = propsFactory({
    scrollStrategy: {
      type: [String, Function],
      default: "block",
      validator: (val) => typeof val === "function" || val in scrollStrategies
    }
  }, "VOverlay-scroll-strategies");
  function useScrollStrategies(props, data) {
    if (!IN_BROWSER)
      return;
    let scope;
    vue.watchEffect(async () => {
      scope == null ? void 0 : scope.stop();
      if (!(data.isActive.value && props.scrollStrategy))
        return;
      scope = vue.effectScope();
      await vue.nextTick();
      scope.active && scope.run(() => {
        var _a;
        if (typeof props.scrollStrategy === "function") {
          props.scrollStrategy(data, props, scope);
        } else {
          (_a = scrollStrategies[props.scrollStrategy]) == null ? void 0 : _a.call(scrollStrategies, data, props, scope);
        }
      });
    });
    vue.onScopeDispose(() => {
      scope == null ? void 0 : scope.stop();
    });
  }
  function closeScrollStrategy(data) {
    function onScroll(e) {
      data.isActive.value = false;
    }
    bindScroll(data.targetEl.value ?? data.contentEl.value, onScroll);
  }
  function blockScrollStrategy(data, props) {
    var _a;
    const offsetParent = (_a = data.root.value) == null ? void 0 : _a.offsetParent;
    const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(data.targetEl.value, props.contained ? offsetParent : void 0), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
    const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
    const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || document.documentElement);
    if (scrollableParent) {
      data.root.value.classList.add("v-overlay--scroll-blocked");
    }
    scrollElements.forEach((el, i) => {
      el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
      el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
      if (el !== document.documentElement) {
        el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
      }
      el.classList.add("v-overlay-scroll-blocked");
    });
    vue.onScopeDispose(() => {
      scrollElements.forEach((el, i) => {
        const x = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
        const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
        const scrollBehavior = el.style.scrollBehavior;
        el.style.scrollBehavior = "auto";
        el.style.removeProperty("--v-body-scroll-x");
        el.style.removeProperty("--v-body-scroll-y");
        el.style.removeProperty("--v-scrollbar-offset");
        el.classList.remove("v-overlay-scroll-blocked");
        el.scrollLeft = -x;
        el.scrollTop = -y;
        el.style.scrollBehavior = scrollBehavior;
      });
      if (scrollableParent) {
        data.root.value.classList.remove("v-overlay--scroll-blocked");
      }
    });
  }
  function repositionScrollStrategy(data, props, scope) {
    let slow = false;
    let raf2 = -1;
    let ric = -1;
    function update(e) {
      requestNewFrame(() => {
        var _a, _b;
        const start = performance.now();
        (_b = (_a = data.updateLocation).value) == null ? void 0 : _b.call(_a, e);
        const time = performance.now() - start;
        slow = time / (1e3 / 60) > 2;
      });
    }
    ric = (typeof requestIdleCallback === "undefined" ? (cb) => cb() : requestIdleCallback)(() => {
      scope.run(() => {
        bindScroll(data.targetEl.value ?? data.contentEl.value, (e) => {
          if (slow) {
            cancelAnimationFrame(raf2);
            raf2 = requestAnimationFrame(() => {
              raf2 = requestAnimationFrame(() => {
                update(e);
              });
            });
          } else {
            update(e);
          }
        });
      });
    });
    vue.onScopeDispose(() => {
      typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(ric);
      cancelAnimationFrame(raf2);
    });
  }
  function bindScroll(el, onScroll) {
    const scrollElements = [document, ...getScrollParents(el)];
    scrollElements.forEach((el2) => {
      el2.addEventListener("scroll", onScroll, {
        passive: true
      });
    });
    vue.onScopeDispose(() => {
      scrollElements.forEach((el2) => {
        el2.removeEventListener("scroll", onScroll);
      });
    });
  }
  const VMenuSymbol = Symbol.for("vuetify:v-menu");
  const makeDelayProps = propsFactory({
    closeDelay: [Number, String],
    openDelay: [Number, String]
  }, "delay");
  function useDelay(props, cb) {
    let clearDelay = () => {
    };
    function runDelay(isOpening) {
      clearDelay == null ? void 0 : clearDelay();
      const delay = Number(isOpening ? props.openDelay : props.closeDelay);
      return new Promise((resolve) => {
        clearDelay = defer(delay, () => {
          cb == null ? void 0 : cb(isOpening);
          resolve(isOpening);
        });
      });
    }
    function runOpenDelay() {
      return runDelay(true);
    }
    function runCloseDelay() {
      return runDelay(false);
    }
    return {
      clearDelay,
      runOpenDelay,
      runCloseDelay
    };
  }
  const makeActivatorProps = propsFactory({
    target: [String, Object],
    activator: [String, Object],
    activatorProps: {
      type: Object,
      default: () => ({})
    },
    openOnClick: {
      type: Boolean,
      default: void 0
    },
    openOnHover: Boolean,
    openOnFocus: {
      type: Boolean,
      default: void 0
    },
    closeOnContentClick: Boolean,
    ...makeDelayProps()
  }, "VOverlay-activator");
  function useActivator(props, _ref) {
    let {
      isActive,
      isTop
    } = _ref;
    const vm = getCurrentInstance("useActivator");
    const activatorEl = vue.ref();
    let isHovered = false;
    let isFocused = false;
    let firstEnter = true;
    const openOnFocus = vue.computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
    const openOnClick = vue.computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, (value) => {
      if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
        if (isActive.value !== value) {
          firstEnter = true;
        }
        isActive.value = value;
      }
    });
    const cursorTarget = vue.ref();
    const availableEvents = {
      onClick: (e) => {
        e.stopPropagation();
        activatorEl.value = e.currentTarget || e.target;
        if (!isActive.value) {
          cursorTarget.value = [e.clientX, e.clientY];
        }
        isActive.value = !isActive.value;
      },
      onMouseenter: (e) => {
        var _a;
        if ((_a = e.sourceCapabilities) == null ? void 0 : _a.firesTouchEvents)
          return;
        isHovered = true;
        activatorEl.value = e.currentTarget || e.target;
        runOpenDelay();
      },
      onMouseleave: (e) => {
        isHovered = false;
        runCloseDelay();
      },
      onFocus: (e) => {
        if (matchesSelector(e.target, ":focus-visible") === false)
          return;
        isFocused = true;
        e.stopPropagation();
        activatorEl.value = e.currentTarget || e.target;
        runOpenDelay();
      },
      onBlur: (e) => {
        isFocused = false;
        e.stopPropagation();
        runCloseDelay();
      }
    };
    const activatorEvents = vue.computed(() => {
      const events = {};
      if (openOnClick.value) {
        events.onClick = availableEvents.onClick;
      }
      if (props.openOnHover) {
        events.onMouseenter = availableEvents.onMouseenter;
        events.onMouseleave = availableEvents.onMouseleave;
      }
      if (openOnFocus.value) {
        events.onFocus = availableEvents.onFocus;
        events.onBlur = availableEvents.onBlur;
      }
      return events;
    });
    const contentEvents = vue.computed(() => {
      const events = {};
      if (props.openOnHover) {
        events.onMouseenter = () => {
          isHovered = true;
          runOpenDelay();
        };
        events.onMouseleave = () => {
          isHovered = false;
          runCloseDelay();
        };
      }
      if (openOnFocus.value) {
        events.onFocusin = () => {
          isFocused = true;
          runOpenDelay();
        };
        events.onFocusout = () => {
          isFocused = false;
          runCloseDelay();
        };
      }
      if (props.closeOnContentClick) {
        const menu = vue.inject(VMenuSymbol, null);
        events.onClick = () => {
          isActive.value = false;
          menu == null ? void 0 : menu.closeParents();
        };
      }
      return events;
    });
    const scrimEvents = vue.computed(() => {
      const events = {};
      if (props.openOnHover) {
        events.onMouseenter = () => {
          if (firstEnter) {
            isHovered = true;
            firstEnter = false;
            runOpenDelay();
          }
        };
        events.onMouseleave = () => {
          isHovered = false;
          runCloseDelay();
        };
      }
      return events;
    });
    vue.watch(isTop, (val) => {
      if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))) {
        isActive.value = false;
      }
    });
    vue.watch(isActive, (val) => {
      if (!val) {
        setTimeout(() => {
          cursorTarget.value = void 0;
        });
      }
    }, {
      flush: "post"
    });
    const activatorRef = vue.ref();
    vue.watchEffect(() => {
      if (!activatorRef.value)
        return;
      vue.nextTick(() => {
        activatorEl.value = refElement(activatorRef.value);
      });
    });
    const targetRef = vue.ref();
    const target = vue.computed(() => {
      if (props.target === "cursor" && cursorTarget.value)
        return cursorTarget.value;
      if (targetRef.value)
        return refElement(targetRef.value);
      return getTarget(props.target, vm) || activatorEl.value;
    });
    const targetEl = vue.computed(() => {
      return Array.isArray(target.value) ? void 0 : target.value;
    });
    let scope;
    vue.watch(() => !!props.activator, (val) => {
      if (val && IN_BROWSER) {
        scope = vue.effectScope();
        scope.run(() => {
          _useActivator(props, vm, {
            activatorEl,
            activatorEvents
          });
        });
      } else if (scope) {
        scope.stop();
      }
    }, {
      flush: "post",
      immediate: true
    });
    vue.onScopeDispose(() => {
      scope == null ? void 0 : scope.stop();
    });
    return {
      activatorEl,
      activatorRef,
      target,
      targetEl,
      targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    };
  }
  function _useActivator(props, vm, _ref2) {
    let {
      activatorEl,
      activatorEvents
    } = _ref2;
    vue.watch(() => props.activator, (val, oldVal) => {
      if (oldVal && val !== oldVal) {
        const activator = getActivator(oldVal);
        activator && unbindActivatorProps(activator);
      }
      if (val) {
        vue.nextTick(() => bindActivatorProps());
      }
    }, {
      immediate: true
    });
    vue.watch(() => props.activatorProps, () => {
      bindActivatorProps();
    });
    vue.onScopeDispose(() => {
      unbindActivatorProps();
    });
    function bindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
      if (!el)
        return;
      bindProps(el, vue.mergeProps(activatorEvents.value, _props));
    }
    function unbindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
      if (!el)
        return;
      unbindProps(el, vue.mergeProps(activatorEvents.value, _props));
    }
    function getActivator() {
      let selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : props.activator;
      const activator = getTarget(selector, vm);
      activatorEl.value = (activator == null ? void 0 : activator.nodeType) === Node.ELEMENT_NODE ? activator : void 0;
      return activatorEl.value;
    }
  }
  function getTarget(selector, vm) {
    var _a, _b;
    if (!selector)
      return;
    let target;
    if (selector === "parent") {
      let el = (_b = (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$el) == null ? void 0 : _b.parentNode;
      while (el == null ? void 0 : el.hasAttribute("data-no-activator")) {
        el = el.parentNode;
      }
      target = el;
    } else if (typeof selector === "string") {
      target = document.querySelector(selector);
    } else if ("$el" in selector) {
      target = selector.$el;
    } else {
      target = selector;
    }
    return target;
  }
  function useHydration() {
    if (!IN_BROWSER)
      return vue.shallowRef(false);
    const {
      ssr
    } = useDisplay();
    if (ssr) {
      const isMounted = vue.shallowRef(false);
      vue.onMounted(() => {
        isMounted.value = true;
      });
      return isMounted;
    } else {
      return vue.shallowRef(true);
    }
  }
  const makeLazyProps = propsFactory({
    eager: Boolean
  }, "lazy");
  function useLazy(props, active) {
    const isBooted = vue.shallowRef(false);
    const hasContent = vue.computed(() => isBooted.value || props.eager || active.value);
    vue.watch(active, () => isBooted.value = true);
    function onAfterLeave() {
      if (!props.eager)
        isBooted.value = false;
    }
    return {
      isBooted,
      hasContent,
      onAfterLeave
    };
  }
  function useScopeId() {
    const vm = getCurrentInstance("useScopeId");
    const scopeId = vm.vnode.scopeId;
    return {
      scopeId: scopeId ? {
        [scopeId]: ""
      } : void 0
    };
  }
  const StackSymbol = Symbol.for("vuetify:stack");
  const globalStack = vue.reactive([]);
  function useStack(isActive, zIndex, disableGlobalStack) {
    const vm = getCurrentInstance("useStack");
    const createStackEntry = !disableGlobalStack;
    const parent = vue.inject(StackSymbol, void 0);
    const stack = vue.reactive({
      activeChildren: /* @__PURE__ */ new Set()
    });
    vue.provide(StackSymbol, stack);
    const _zIndex = vue.shallowRef(+zIndex.value);
    useToggleScope(isActive, () => {
      var _a;
      const lastZIndex = (_a = globalStack.at(-1)) == null ? void 0 : _a[1];
      _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
      if (createStackEntry) {
        globalStack.push([vm.uid, _zIndex.value]);
      }
      parent == null ? void 0 : parent.activeChildren.add(vm.uid);
      vue.onScopeDispose(() => {
        if (createStackEntry) {
          const idx = vue.toRaw(globalStack).findIndex((v) => v[0] === vm.uid);
          globalStack.splice(idx, 1);
        }
        parent == null ? void 0 : parent.activeChildren.delete(vm.uid);
      });
    });
    const globalTop = vue.shallowRef(true);
    if (createStackEntry) {
      vue.watchEffect(() => {
        var _a;
        const _isTop = ((_a = globalStack.at(-1)) == null ? void 0 : _a[0]) === vm.uid;
        setTimeout(() => globalTop.value = _isTop);
      });
    }
    const localTop = vue.computed(() => !stack.activeChildren.size);
    return {
      globalTop: vue.readonly(globalTop),
      localTop,
      stackStyles: vue.computed(() => ({
        zIndex: _zIndex.value
      }))
    };
  }
  function useTeleport(target) {
    const teleportTarget = vue.computed(() => {
      const _target = target.value;
      if (_target === true || !IN_BROWSER)
        return void 0;
      const targetElement = _target === false ? document.body : typeof _target === "string" ? document.querySelector(_target) : _target;
      if (targetElement == null) {
        vue.warn(`Unable to locate target ${_target}`);
        return void 0;
      }
      let container = targetElement.querySelector(":scope > .v-overlay-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "v-overlay-container";
        targetElement.appendChild(container);
      }
      return container;
    });
    return {
      teleportTarget
    };
  }
  function defaultConditional() {
    return true;
  }
  function checkEvent(e, el, binding) {
    if (!e || checkIsActive(e, binding) === false)
      return false;
    const root = attachedRoot(el);
    if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target)
      return false;
    const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
    elements.push(el);
    return !elements.some((el2) => el2 == null ? void 0 : el2.contains(e.target));
  }
  function checkIsActive(e, binding) {
    const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
    return isActive(e);
  }
  function directive(e, el, binding) {
    const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
    el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
      checkIsActive(e, binding) && handler && handler(e);
    }, 0);
  }
  function handleShadow(el, callback) {
    const root = attachedRoot(el);
    callback(document);
    if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) {
      callback(root);
    }
  }
  const ClickOutside = {
    // [data-app] may not be found
    // if using bind, inserted makes
    // sure that the root element is
    // available, iOS does not support
    // clicks on body
    mounted(el, binding) {
      const onClick = (e) => directive(e, el, binding);
      const onMousedown = (e) => {
        el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
      };
      handleShadow(el, (app) => {
        app.addEventListener("click", onClick, true);
        app.addEventListener("mousedown", onMousedown, true);
      });
      if (!el._clickOutside) {
        el._clickOutside = {
          lastMousedownWasOutside: false
        };
      }
      el._clickOutside[binding.instance.$.uid] = {
        onClick,
        onMousedown
      };
    },
    unmounted(el, binding) {
      if (!el._clickOutside)
        return;
      handleShadow(el, (app) => {
        var _a;
        if (!app || !((_a = el._clickOutside) == null ? void 0 : _a[binding.instance.$.uid]))
          return;
        const {
          onClick,
          onMousedown
        } = el._clickOutside[binding.instance.$.uid];
        app.removeEventListener("click", onClick, true);
        app.removeEventListener("mousedown", onMousedown, true);
      });
      delete el._clickOutside[binding.instance.$.uid];
    }
  };
  function Scrim(props) {
    const {
      modelValue,
      color,
      ...rest
    } = props;
    return vue.createVNode(vue.Transition, {
      "name": "fade-transition",
      "appear": true
    }, {
      default: () => [props.modelValue && vue.createVNode("div", vue.mergeProps({
        "class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
        "style": props.color.backgroundColorStyles.value
      }, rest), null)]
    });
  }
  const makeVOverlayProps = propsFactory({
    absolute: Boolean,
    attach: [Boolean, String, Object],
    closeOnBack: {
      type: Boolean,
      default: true
    },
    contained: Boolean,
    contentClass: null,
    contentProps: null,
    disabled: Boolean,
    opacity: [Number, String],
    noClickAnimation: Boolean,
    modelValue: Boolean,
    persistent: Boolean,
    scrim: {
      type: [Boolean, String],
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 2e3
    },
    ...makeActivatorProps(),
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeLazyProps(),
    ...makeLocationStrategyProps(),
    ...makeScrollStrategyProps(),
    ...makeThemeProps(),
    ...makeTransitionProps$1()
  }, "VOverlay");
  const VOverlay = genericComponent()({
    name: "VOverlay",
    directives: {
      ClickOutside
    },
    inheritAttrs: false,
    props: {
      _disableGlobalStack: Boolean,
      ...makeVOverlayProps()
    },
    emits: {
      "click:outside": (e) => true,
      "update:modelValue": (value) => true,
      afterLeave: () => true
    },
    setup(props, _ref) {
      let {
        slots,
        attrs,
        emit
      } = _ref;
      const model = useProxiedModel(props, "modelValue");
      const isActive = vue.computed({
        get: () => model.value,
        set: (v) => {
          if (!(v && props.disabled))
            model.value = v;
        }
      });
      const {
        teleportTarget
      } = useTeleport(vue.computed(() => props.attach || props.contained));
      const {
        themeClasses
      } = provideTheme(props);
      const {
        rtlClasses,
        isRtl
      } = useRtl();
      const {
        hasContent,
        onAfterLeave: _onAfterLeave
      } = useLazy(props, isActive);
      const scrimColor = useBackgroundColor(vue.computed(() => {
        return typeof props.scrim === "string" ? props.scrim : null;
      }));
      const {
        globalTop,
        localTop,
        stackStyles
      } = useStack(isActive, vue.toRef(props, "zIndex"), props._disableGlobalStack);
      const {
        activatorEl,
        activatorRef,
        target,
        targetEl,
        targetRef,
        activatorEvents,
        contentEvents,
        scrimEvents
      } = useActivator(props, {
        isActive,
        isTop: localTop
      });
      const {
        dimensionStyles
      } = useDimension(props);
      const isMounted = useHydration();
      const {
        scopeId
      } = useScopeId();
      vue.watch(() => props.disabled, (v) => {
        if (v)
          isActive.value = false;
      });
      const root = vue.ref();
      const contentEl = vue.ref();
      const {
        contentStyles,
        updateLocation
      } = useLocationStrategies(props, {
        isRtl,
        contentEl,
        target,
        isActive
      });
      useScrollStrategies(props, {
        root,
        contentEl,
        targetEl,
        isActive,
        updateLocation
      });
      function onClickOutside(e) {
        emit("click:outside", e);
        if (!props.persistent)
          isActive.value = false;
        else
          animateClick();
      }
      function closeConditional() {
        return isActive.value && globalTop.value;
      }
      IN_BROWSER && vue.watch(isActive, (val) => {
        if (val) {
          window.addEventListener("keydown", onKeydown);
        } else {
          window.removeEventListener("keydown", onKeydown);
        }
      }, {
        immediate: true
      });
      vue.onBeforeUnmount(() => {
        if (!IN_BROWSER)
          return;
        window.removeEventListener("keydown", onKeydown);
      });
      function onKeydown(e) {
        var _a, _b;
        if (e.key === "Escape" && globalTop.value) {
          if (!props.persistent) {
            isActive.value = false;
            if ((_a = contentEl.value) == null ? void 0 : _a.contains(document.activeElement)) {
              (_b = activatorEl.value) == null ? void 0 : _b.focus();
            }
          } else
            animateClick();
        }
      }
      const router = useRouter();
      useToggleScope(() => props.closeOnBack, () => {
        useBackButton(router, (next) => {
          if (globalTop.value && isActive.value) {
            next(false);
            if (!props.persistent)
              isActive.value = false;
            else
              animateClick();
          } else {
            next();
          }
        });
      });
      const top = vue.ref();
      vue.watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
        if (val) {
          const scrollParent = getScrollParent(root.value);
          if (scrollParent && scrollParent !== document.scrollingElement) {
            top.value = scrollParent.scrollTop;
          }
        }
      });
      function animateClick() {
        if (props.noClickAnimation)
          return;
        contentEl.value && animate(contentEl.value, [{
          transformOrigin: "center"
        }, {
          transform: "scale(1.03)"
        }, {
          transformOrigin: "center"
        }], {
          duration: 150,
          easing: standardEasing
        });
      }
      function onAfterLeave() {
        _onAfterLeave();
        emit("afterLeave");
      }
      useRender(() => {
        var _a;
        return vue.createVNode(vue.Fragment, null, [(_a = slots.activator) == null ? void 0 : _a.call(slots, {
          isActive: isActive.value,
          props: vue.mergeProps({
            ref: activatorRef,
            targetRef
          }, activatorEvents.value, props.activatorProps)
        }), isMounted.value && hasContent.value && vue.createVNode(vue.Teleport, {
          "disabled": !teleportTarget.value,
          "to": teleportTarget.value
        }, {
          default: () => [vue.createVNode("div", vue.mergeProps({
            "class": ["v-overlay", {
              "v-overlay--absolute": props.absolute || props.contained,
              "v-overlay--active": isActive.value,
              "v-overlay--contained": props.contained
            }, themeClasses.value, rtlClasses.value, props.class],
            "style": [stackStyles.value, {
              "--v-overlay-opacity": props.opacity,
              top: convertToUnit(top.value)
            }, props.style],
            "ref": root
          }, scopeId, attrs), [vue.createVNode(Scrim, vue.mergeProps({
            "color": scrimColor,
            "modelValue": isActive.value && !!props.scrim
          }, scrimEvents.value), null), vue.createVNode(MaybeTransition, {
            "appear": true,
            "persisted": true,
            "transition": props.transition,
            "target": target.value,
            "onAfterLeave": onAfterLeave
          }, {
            default: () => {
              var _a2;
              return [vue.withDirectives(vue.createVNode("div", vue.mergeProps({
                "ref": contentEl,
                "class": ["v-overlay__content", props.contentClass],
                "style": [dimensionStyles.value, contentStyles.value]
              }, contentEvents.value, props.contentProps), [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
                isActive
              })]), [[vue.vShow, isActive.value], [vue.resolveDirective("click-outside"), {
                handler: onClickOutside,
                closeConditional,
                include: () => [activatorEl.value]
              }]])];
            }
          })])]
        })]);
      });
      return {
        activatorEl,
        target,
        animateClick,
        contentEl,
        globalTop,
        localTop,
        updateLocation
      };
    }
  });
  const Refs = Symbol("Forwarded refs");
  function getDescriptor(obj, key) {
    let currentObj = obj;
    while (currentObj) {
      const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
      if (descriptor)
        return descriptor;
      currentObj = Object.getPrototypeOf(currentObj);
    }
    return void 0;
  }
  function forwardRefs(target) {
    for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      refs[_key - 1] = arguments[_key];
    }
    target[Refs] = refs;
    return new Proxy(target, {
      get(target2, key) {
        if (Reflect.has(target2, key)) {
          return Reflect.get(target2, key);
        }
        if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__"))
          return;
        for (const ref of refs) {
          if (ref.value && Reflect.has(ref.value, key)) {
            const val = Reflect.get(ref.value, key);
            return typeof val === "function" ? val.bind(ref.value) : val;
          }
        }
      },
      has(target2, key) {
        if (Reflect.has(target2, key)) {
          return true;
        }
        if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__"))
          return false;
        for (const ref of refs) {
          if (ref.value && Reflect.has(ref.value, key)) {
            return true;
          }
        }
        return false;
      },
      set(target2, key, value) {
        if (Reflect.has(target2, key)) {
          return Reflect.set(target2, key, value);
        }
        if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__"))
          return false;
        for (const ref of refs) {
          if (ref.value && Reflect.has(ref.value, key)) {
            return Reflect.set(ref.value, key, value);
          }
        }
        return false;
      },
      getOwnPropertyDescriptor(target2, key) {
        var _a;
        const descriptor = Reflect.getOwnPropertyDescriptor(target2, key);
        if (descriptor)
          return descriptor;
        if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__"))
          return;
        for (const ref of refs) {
          if (!ref.value)
            continue;
          const descriptor2 = getDescriptor(ref.value, key) ?? ("_" in ref.value ? getDescriptor((_a = ref.value._) == null ? void 0 : _a.setupState, key) : void 0);
          if (descriptor2)
            return descriptor2;
        }
        for (const ref of refs) {
          const childRefs = ref.value && ref.value[Refs];
          if (!childRefs)
            continue;
          const queue = childRefs.slice();
          while (queue.length) {
            const ref2 = queue.shift();
            const descriptor2 = getDescriptor(ref2.value, key);
            if (descriptor2)
              return descriptor2;
            const childRefs2 = ref2.value && ref2.value[Refs];
            if (childRefs2)
              queue.push(...childRefs2);
          }
        }
        return void 0;
      }
    });
  }
  const makeVDialogProps = propsFactory({
    fullscreen: Boolean,
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    ...makeVOverlayProps({
      origin: "center center",
      scrollStrategy: "block",
      transition: {
        component: VDialogTransition
      },
      zIndex: 2400
    })
  }, "VDialog");
  const VDialog = genericComponent()({
    name: "VDialog",
    props: makeVDialogProps(),
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const isActive = useProxiedModel(props, "modelValue");
      const {
        scopeId
      } = useScopeId();
      const overlay = vue.ref();
      function onFocusin(e) {
        var _a, _b;
        const before = e.relatedTarget;
        const after = e.target;
        if (before !== after && ((_a = overlay.value) == null ? void 0 : _a.contentEl) && // We're the topmost dialog
        ((_b = overlay.value) == null ? void 0 : _b.globalTop) && // It isn't the document or the dialog body
        ![document, overlay.value.contentEl].includes(after) && // It isn't inside the dialog body
        !overlay.value.contentEl.contains(after)) {
          const focusable = focusableChildren(overlay.value.contentEl);
          if (!focusable.length)
            return;
          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];
          if (before === firstElement) {
            lastElement.focus();
          } else {
            firstElement.focus();
          }
        }
      }
      if (IN_BROWSER) {
        vue.watch(() => isActive.value && props.retainFocus, (val) => {
          val ? document.addEventListener("focusin", onFocusin) : document.removeEventListener("focusin", onFocusin);
        }, {
          immediate: true
        });
      }
      vue.watch(isActive, async (val) => {
        var _a, _b;
        await vue.nextTick();
        if (val) {
          (_a = overlay.value.contentEl) == null ? void 0 : _a.focus({
            preventScroll: true
          });
        } else {
          (_b = overlay.value.activatorEl) == null ? void 0 : _b.focus({
            preventScroll: true
          });
        }
      });
      const activatorProps = vue.computed(() => vue.mergeProps({
        "aria-haspopup": "dialog",
        "aria-expanded": String(isActive.value)
      }, props.activatorProps));
      useRender(() => {
        const overlayProps = VOverlay.filterProps(props);
        return vue.createVNode(VOverlay, vue.mergeProps({
          "ref": overlay,
          "class": ["v-dialog", {
            "v-dialog--fullscreen": props.fullscreen,
            "v-dialog--scrollable": props.scrollable
          }, props.class],
          "style": props.style
        }, overlayProps, {
          "modelValue": isActive.value,
          "onUpdate:modelValue": ($event) => isActive.value = $event,
          "aria-modal": "true",
          "activatorProps": activatorProps.value,
          "role": "dialog"
        }, scopeId), {
          activator: slots.activator,
          default: function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return vue.createVNode(VDefaultsProvider, {
              "root": "VDialog"
            }, {
              default: () => {
                var _a;
                return [(_a = slots.default) == null ? void 0 : _a.call(slots, ...args)];
              }
            });
          }
        });
      });
      return forwardRefs({}, overlay);
    }
  });
  const makeVCounterProps = propsFactory({
    active: Boolean,
    max: [Number, String],
    value: {
      type: [Number, String],
      default: 0
    },
    ...makeComponentProps(),
    ...makeTransitionProps$1({
      transition: {
        component: VSlideYTransition
      }
    })
  }, "VCounter");
  const VCounter = genericComponent()({
    name: "VCounter",
    functional: true,
    props: makeVCounterProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const counter = vue.computed(() => {
        return props.max ? `${props.value} / ${props.max}` : String(props.value);
      });
      useRender(() => vue.createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [vue.withDirectives(vue.createVNode("div", {
          "class": ["v-counter", props.class],
          "style": props.style
        }, [slots.default ? slots.default({
          counter: counter.value,
          max: props.max,
          value: props.value
        }) : counter.value]), [[vue.vShow, props.active]])]
      }));
      return {};
    }
  });
  const makeVLabelProps = propsFactory({
    text: String,
    onClick: EventProp(),
    ...makeComponentProps(),
    ...makeThemeProps()
  }, "VLabel");
  const VLabel = genericComponent()({
    name: "VLabel",
    props: makeVLabelProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        var _a;
        return vue.createVNode("label", {
          "class": ["v-label", {
            "v-label--clickable": !!props.onClick
          }, props.class],
          "style": props.style,
          "onClick": props.onClick
        }, [props.text, (_a = slots.default) == null ? void 0 : _a.call(slots)]);
      });
      return {};
    }
  });
  const makeVFieldLabelProps = propsFactory({
    floating: Boolean,
    ...makeComponentProps()
  }, "VFieldLabel");
  const VFieldLabel = genericComponent()({
    name: "VFieldLabel",
    props: makeVFieldLabelProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode(VLabel, {
        "class": ["v-field-label", {
          "v-field-label--floating": props.floating
        }, props.class],
        "style": props.style,
        "aria-hidden": props.floating || void 0
      }, slots));
      return {};
    }
  });
  function useInputIcon(props) {
    const {
      t
    } = useLocale();
    function InputIcon(_ref) {
      let {
        name
      } = _ref;
      const localeKey = {
        prepend: "prependAction",
        prependInner: "prependAction",
        append: "appendAction",
        appendInner: "appendAction",
        clear: "clear"
      }[name];
      const listener = props[`onClick:${name}`];
      const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? "") : void 0;
      return vue.createVNode(VIcon, {
        "icon": props[`${name}Icon`],
        "aria-label": label,
        "onClick": listener
      }, null);
    }
    return {
      InputIcon
    };
  }
  const makeFocusProps = propsFactory({
    focused: Boolean,
    "onUpdate:focused": EventProp()
  }, "focus");
  function useFocus(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const isFocused = useProxiedModel(props, "focused");
    const focusClasses = vue.computed(() => {
      return {
        [`${name}--focused`]: isFocused.value
      };
    });
    function focus() {
      isFocused.value = true;
    }
    function blur() {
      isFocused.value = false;
    }
    return {
      focusClasses,
      isFocused,
      focus,
      blur
    };
  }
  const allowedVariants = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"];
  const makeVFieldProps = propsFactory({
    appendInnerIcon: IconValue,
    bgColor: String,
    clearable: Boolean,
    clearIcon: {
      type: IconValue,
      default: "$clear"
    },
    active: Boolean,
    centerAffix: {
      type: Boolean,
      default: void 0
    },
    color: String,
    baseColor: String,
    dirty: Boolean,
    disabled: {
      type: Boolean,
      default: null
    },
    error: Boolean,
    flat: Boolean,
    label: String,
    persistentClear: Boolean,
    prependInnerIcon: IconValue,
    reverse: Boolean,
    singleLine: Boolean,
    variant: {
      type: String,
      default: "filled",
      validator: (v) => allowedVariants.includes(v)
    },
    "onClick:clear": EventProp(),
    "onClick:appendInner": EventProp(),
    "onClick:prependInner": EventProp(),
    ...makeComponentProps(),
    ...makeLoaderProps(),
    ...makeRoundedProps(),
    ...makeThemeProps()
  }, "VField");
  const VField = genericComponent()({
    name: "VField",
    inheritAttrs: false,
    props: {
      id: String,
      ...makeFocusProps(),
      ...makeVFieldProps()
    },
    emits: {
      "update:focused": (focused) => true,
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit,
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        loaderClasses
      } = useLoader(props);
      const {
        focusClasses,
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const {
        InputIcon
      } = useInputIcon(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        rtlClasses
      } = useRtl();
      const isActive = vue.computed(() => props.dirty || props.active);
      const hasLabel = vue.computed(() => !props.singleLine && !!(props.label || slots.label));
      const uid = getUid();
      const id = vue.computed(() => props.id || `input-${uid}`);
      const messagesId = vue.computed(() => `${id.value}-messages`);
      const labelRef = vue.ref();
      const floatingLabelRef = vue.ref();
      const controlRef = vue.ref();
      const isPlainOrUnderlined = vue.computed(() => ["plain", "underlined"].includes(props.variant));
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, "bgColor"));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.computed(() => {
        return props.error || props.disabled ? void 0 : isActive.value && isFocused.value ? props.color : props.baseColor;
      }));
      vue.watch(isActive, (val) => {
        if (hasLabel.value) {
          const el = labelRef.value.$el;
          const targetEl = floatingLabelRef.value.$el;
          requestAnimationFrame(() => {
            const rect = nullifyTransforms(el);
            const targetRect = targetEl.getBoundingClientRect();
            const x = targetRect.x - rect.x;
            const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
            const targetWidth = targetRect.width / 0.75;
            const width = Math.abs(targetWidth - rect.width) > 1 ? {
              maxWidth: convertToUnit(targetWidth)
            } : void 0;
            const style = getComputedStyle(el);
            const targetStyle = getComputedStyle(targetEl);
            const duration = parseFloat(style.transitionDuration) * 1e3 || 150;
            const scale = parseFloat(targetStyle.getPropertyValue("--v-field-label-scale"));
            const color = targetStyle.getPropertyValue("color");
            el.style.visibility = "visible";
            targetEl.style.visibility = "hidden";
            animate(el, {
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              color,
              ...width
            }, {
              duration,
              easing: standardEasing,
              direction: val ? "normal" : "reverse"
            }).finished.then(() => {
              el.style.removeProperty("visibility");
              targetEl.style.removeProperty("visibility");
            });
          });
        }
      }, {
        flush: "post"
      });
      const slotProps = vue.computed(() => ({
        isActive,
        isFocused,
        controlRef,
        blur,
        focus
      }));
      function onClick(e) {
        if (e.target !== document.activeElement) {
          e.preventDefault();
        }
      }
      useRender(() => {
        var _a, _b, _c;
        const isOutlined = props.variant === "outlined";
        const hasPrepend = slots["prepend-inner"] || props.prependInnerIcon;
        const hasClear = !!(props.clearable || slots.clear);
        const hasAppend = !!(slots["append-inner"] || props.appendInnerIcon || hasClear);
        const label = () => slots.label ? slots.label({
          ...slotProps.value,
          label: props.label,
          props: {
            for: id.value
          }
        }) : props.label;
        return vue.createVNode("div", vue.mergeProps({
          "class": ["v-field", {
            "v-field--active": isActive.value,
            "v-field--appended": hasAppend,
            "v-field--center-affix": props.centerAffix ?? !isPlainOrUnderlined.value,
            "v-field--disabled": props.disabled,
            "v-field--dirty": props.dirty,
            "v-field--error": props.error,
            "v-field--flat": props.flat,
            "v-field--has-background": !!props.bgColor,
            "v-field--persistent-clear": props.persistentClear,
            "v-field--prepended": hasPrepend,
            "v-field--reverse": props.reverse,
            "v-field--single-line": props.singleLine,
            "v-field--no-label": !label(),
            [`v-field--variant-${props.variant}`]: true
          }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value, roundedClasses.value, rtlClasses.value, props.class],
          "style": [backgroundColorStyles.value, props.style],
          "onClick": onClick
        }, attrs), [vue.createVNode("div", {
          "class": "v-field__overlay"
        }, null), vue.createVNode(LoaderSlot, {
          "name": "v-field",
          "active": !!props.loading,
          "color": props.error ? "error" : typeof props.loading === "string" ? props.loading : props.color
        }, {
          default: slots.loader
        }), hasPrepend && vue.createVNode("div", {
          "key": "prepend",
          "class": "v-field__prepend-inner"
        }, [props.prependInnerIcon && vue.createVNode(InputIcon, {
          "key": "prepend-icon",
          "name": "prependInner"
        }, null), (_a = slots["prepend-inner"]) == null ? void 0 : _a.call(slots, slotProps.value)]), vue.createVNode("div", {
          "class": "v-field__field",
          "data-no-activator": ""
        }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(props.variant) && hasLabel.value && vue.createVNode(VFieldLabel, {
          "key": "floating-label",
          "ref": floatingLabelRef,
          "class": [textColorClasses.value],
          "floating": true,
          "for": id.value,
          "style": textColorStyles.value
        }, {
          default: () => [label()]
        }), vue.createVNode(VFieldLabel, {
          "ref": labelRef,
          "for": id.value
        }, {
          default: () => [label()]
        }), (_b = slots.default) == null ? void 0 : _b.call(slots, {
          ...slotProps.value,
          props: {
            id: id.value,
            class: "v-field__input",
            "aria-describedby": messagesId.value
          },
          focus,
          blur
        })]), hasClear && vue.createVNode(VExpandXTransition, {
          "key": "clear"
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "class": "v-field__clearable",
            "onMousedown": (e) => {
              e.preventDefault();
              e.stopPropagation();
            }
          }, [slots.clear ? slots.clear() : vue.createVNode(InputIcon, {
            "name": "clear"
          }, null)]), [[vue.vShow, props.dirty]])]
        }), hasAppend && vue.createVNode("div", {
          "key": "append",
          "class": "v-field__append-inner"
        }, [(_c = slots["append-inner"]) == null ? void 0 : _c.call(slots, slotProps.value), props.appendInnerIcon && vue.createVNode(InputIcon, {
          "key": "append-icon",
          "name": "appendInner"
        }, null)]), vue.createVNode("div", {
          "class": ["v-field__outline", textColorClasses.value],
          "style": textColorStyles.value
        }, [isOutlined && vue.createVNode(vue.Fragment, null, [vue.createVNode("div", {
          "class": "v-field__outline__start"
        }, null), hasLabel.value && vue.createVNode("div", {
          "class": "v-field__outline__notch"
        }, [vue.createVNode(VFieldLabel, {
          "ref": floatingLabelRef,
          "floating": true,
          "for": id.value
        }, {
          default: () => [label()]
        })]), vue.createVNode("div", {
          "class": "v-field__outline__end"
        }, null)]), isPlainOrUnderlined.value && hasLabel.value && vue.createVNode(VFieldLabel, {
          "ref": floatingLabelRef,
          "floating": true,
          "for": id.value
        }, {
          default: () => [label()]
        })])]);
      });
      return {
        controlRef
      };
    }
  });
  function filterFieldProps(attrs) {
    const keys = Object.keys(VField.props).filter((k) => !isOn(k) && k !== "class" && k !== "style");
    return pick(attrs, keys);
  }
  const makeVMessagesProps = propsFactory({
    active: Boolean,
    color: String,
    messages: {
      type: [Array, String],
      default: () => []
    },
    ...makeComponentProps(),
    ...makeTransitionProps$1({
      transition: {
        component: VSlideYTransition,
        leaveAbsolute: true,
        group: true
      }
    })
  }, "VMessages");
  const VMessages = genericComponent()({
    name: "VMessages",
    props: makeVMessagesProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const messages = vue.computed(() => wrapInArray(props.messages));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.computed(() => props.color));
      useRender(() => vue.createVNode(MaybeTransition, {
        "transition": props.transition,
        "tag": "div",
        "class": ["v-messages", textColorClasses.value, props.class],
        "style": [textColorStyles.value, props.style],
        "role": "alert",
        "aria-live": "polite"
      }, {
        default: () => [props.active && messages.value.map((message2, i) => vue.createVNode("div", {
          "class": "v-messages__message",
          "key": `${i}-${messages.value}`
        }, [slots.message ? slots.message({
          message: message2
        }) : message2]))]
      }));
      return {};
    }
  });
  const FormKey = Symbol.for("vuetify:form");
  function useForm() {
    return vue.inject(FormKey, null);
  }
  const makeValidationProps = propsFactory({
    disabled: {
      type: Boolean,
      default: null
    },
    error: Boolean,
    errorMessages: {
      type: [Array, String],
      default: () => []
    },
    maxErrors: {
      type: [Number, String],
      default: 1
    },
    name: String,
    label: String,
    readonly: {
      type: Boolean,
      default: null
    },
    rules: {
      type: Array,
      default: () => []
    },
    modelValue: null,
    validateOn: String,
    validationValue: null,
    ...makeFocusProps()
  }, "validation");
  function useValidation(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    let id = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : getUid();
    const model = useProxiedModel(props, "modelValue");
    const validationModel = vue.computed(() => props.validationValue === void 0 ? model.value : props.validationValue);
    const form = useForm();
    const internalErrorMessages = vue.ref([]);
    const isPristine = vue.shallowRef(true);
    const isDirty = vue.computed(() => !!(wrapInArray(model.value === "" ? null : model.value).length || wrapInArray(validationModel.value === "" ? null : validationModel.value).length));
    const isDisabled = vue.computed(() => !!(props.disabled ?? (form == null ? void 0 : form.isDisabled.value)));
    const isReadonly = vue.computed(() => !!(props.readonly ?? (form == null ? void 0 : form.isReadonly.value)));
    const errorMessages = vue.computed(() => {
      var _a;
      return ((_a = props.errorMessages) == null ? void 0 : _a.length) ? wrapInArray(props.errorMessages).concat(internalErrorMessages.value).slice(0, Math.max(0, +props.maxErrors)) : internalErrorMessages.value;
    });
    const validateOn = vue.computed(() => {
      let value = (props.validateOn ?? (form == null ? void 0 : form.validateOn.value)) || "input";
      if (value === "lazy")
        value = "input lazy";
      const set = new Set((value == null ? void 0 : value.split(" ")) ?? []);
      return {
        blur: set.has("blur") || set.has("input"),
        input: set.has("input"),
        submit: set.has("submit"),
        lazy: set.has("lazy")
      };
    });
    const isValid2 = vue.computed(() => {
      var _a;
      if (props.error || ((_a = props.errorMessages) == null ? void 0 : _a.length))
        return false;
      if (!props.rules.length)
        return true;
      if (isPristine.value) {
        return internalErrorMessages.value.length || validateOn.value.lazy ? null : true;
      } else {
        return !internalErrorMessages.value.length;
      }
    });
    const isValidating = vue.shallowRef(false);
    const validationClasses = vue.computed(() => {
      return {
        [`${name}--error`]: isValid2.value === false,
        [`${name}--dirty`]: isDirty.value,
        [`${name}--disabled`]: isDisabled.value,
        [`${name}--readonly`]: isReadonly.value
      };
    });
    const uid = vue.computed(() => props.name ?? vue.unref(id));
    vue.onBeforeMount(() => {
      form == null ? void 0 : form.register({
        id: uid.value,
        validate,
        reset,
        resetValidation
      });
    });
    vue.onBeforeUnmount(() => {
      form == null ? void 0 : form.unregister(uid.value);
    });
    vue.onMounted(async () => {
      if (!validateOn.value.lazy) {
        await validate(true);
      }
      form == null ? void 0 : form.update(uid.value, isValid2.value, errorMessages.value);
    });
    useToggleScope(() => validateOn.value.input, () => {
      vue.watch(validationModel, () => {
        if (validationModel.value != null) {
          validate();
        } else if (props.focused) {
          const unwatch = vue.watch(() => props.focused, (val) => {
            if (!val)
              validate();
            unwatch();
          });
        }
      });
    });
    useToggleScope(() => validateOn.value.blur, () => {
      vue.watch(() => props.focused, (val) => {
        if (!val)
          validate();
      });
    });
    vue.watch([isValid2, errorMessages], () => {
      form == null ? void 0 : form.update(uid.value, isValid2.value, errorMessages.value);
    });
    function reset() {
      model.value = null;
      vue.nextTick(resetValidation);
    }
    function resetValidation() {
      isPristine.value = true;
      if (!validateOn.value.lazy) {
        validate(true);
      } else {
        internalErrorMessages.value = [];
      }
    }
    async function validate() {
      let silent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      const results = [];
      isValidating.value = true;
      for (const rule of props.rules) {
        if (results.length >= +(props.maxErrors ?? 1)) {
          break;
        }
        const handler = typeof rule === "function" ? rule : () => rule;
        const result = await handler(validationModel.value);
        if (result === true)
          continue;
        if (result !== false && typeof result !== "string") {
          console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        results.push(result || "");
      }
      internalErrorMessages.value = results;
      isValidating.value = false;
      isPristine.value = silent;
      return internalErrorMessages.value;
    }
    return {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid: isValid2,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses
    };
  }
  const makeVInputProps = propsFactory({
    id: String,
    appendIcon: IconValue,
    centerAffix: {
      type: Boolean,
      default: true
    },
    prependIcon: IconValue,
    hideDetails: [Boolean, String],
    hideSpinButtons: Boolean,
    hint: String,
    persistentHint: Boolean,
    messages: {
      type: [Array, String],
      default: () => []
    },
    direction: {
      type: String,
      default: "horizontal",
      validator: (v) => ["horizontal", "vertical"].includes(v)
    },
    "onClick:prepend": EventProp(),
    "onClick:append": EventProp(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeValidationProps()
  }, "VInput");
  const VInput = genericComponent()({
    name: "VInput",
    props: {
      ...makeVInputProps()
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots,
        emit
      } = _ref;
      const {
        densityClasses
      } = useDensity(props);
      const {
        rtlClasses
      } = useRtl();
      const {
        InputIcon
      } = useInputIcon(props);
      const uid = getUid();
      const id = vue.computed(() => props.id || `input-${uid}`);
      const messagesId = vue.computed(() => `${id.value}-messages`);
      const {
        errorMessages,
        isDirty,
        isDisabled,
        isReadonly,
        isPristine,
        isValid: isValid2,
        isValidating,
        reset,
        resetValidation,
        validate,
        validationClasses
      } = useValidation(props, "v-input", id);
      const slotProps = vue.computed(() => ({
        id,
        messagesId,
        isDirty,
        isDisabled,
        isReadonly,
        isPristine,
        isValid: isValid2,
        isValidating,
        reset,
        resetValidation,
        validate
      }));
      const messages = vue.computed(() => {
        var _a;
        if (((_a = props.errorMessages) == null ? void 0 : _a.length) || !isPristine.value && errorMessages.value.length) {
          return errorMessages.value;
        } else if (props.hint && (props.persistentHint || props.focused)) {
          return props.hint;
        } else {
          return props.messages;
        }
      });
      useRender(() => {
        var _a, _b, _c, _d;
        const hasPrepend = !!(slots.prepend || props.prependIcon);
        const hasAppend = !!(slots.append || props.appendIcon);
        const hasMessages = messages.value.length > 0;
        const hasDetails = !props.hideDetails || props.hideDetails === "auto" && (hasMessages || !!slots.details);
        return vue.createVNode("div", {
          "class": ["v-input", `v-input--${props.direction}`, {
            "v-input--center-affix": props.centerAffix,
            "v-input--hide-spin-buttons": props.hideSpinButtons
          }, densityClasses.value, rtlClasses.value, validationClasses.value, props.class],
          "style": props.style
        }, [hasPrepend && vue.createVNode("div", {
          "key": "prepend",
          "class": "v-input__prepend"
        }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots, slotProps.value), props.prependIcon && vue.createVNode(InputIcon, {
          "key": "prepend-icon",
          "name": "prepend"
        }, null)]), slots.default && vue.createVNode("div", {
          "class": "v-input__control"
        }, [(_b = slots.default) == null ? void 0 : _b.call(slots, slotProps.value)]), hasAppend && vue.createVNode("div", {
          "key": "append",
          "class": "v-input__append"
        }, [props.appendIcon && vue.createVNode(InputIcon, {
          "key": "append-icon",
          "name": "append"
        }, null), (_c = slots.append) == null ? void 0 : _c.call(slots, slotProps.value)]), hasDetails && vue.createVNode("div", {
          "class": "v-input__details"
        }, [vue.createVNode(VMessages, {
          "id": messagesId.value,
          "active": hasMessages,
          "messages": messages.value
        }, {
          message: slots.message
        }), (_d = slots.details) == null ? void 0 : _d.call(slots, slotProps.value)])]);
      });
      return {
        reset,
        resetValidation,
        validate,
        isValid: isValid2,
        errorMessages
      };
    }
  });
  const activeTypes = ["color", "file", "time", "date", "datetime-local", "week", "month"];
  const makeVTextFieldProps = propsFactory({
    autofocus: Boolean,
    counter: [Boolean, Number, String],
    counterValue: [Number, Function],
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    suffix: String,
    role: String,
    type: {
      type: String,
      default: "text"
    },
    modelModifiers: Object,
    ...makeVInputProps(),
    ...makeVFieldProps()
  }, "VTextField");
  const VTextField = genericComponent()({
    name: "VTextField",
    directives: {
      Intersect: Intersect$1
    },
    inheritAttrs: false,
    props: makeVTextFieldProps(),
    emits: {
      "click:control": (e) => true,
      "mousedown:control": (e) => true,
      "update:focused": (focused) => true,
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit,
        slots
      } = _ref;
      const model = useProxiedModel(props, "modelValue");
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const counterValue = vue.computed(() => {
        return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : (model.value ?? "").toString().length;
      });
      const max = vue.computed(() => {
        if (attrs.maxlength)
          return attrs.maxlength;
        if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
          return void 0;
        return props.counter;
      });
      const isPlainOrUnderlined = vue.computed(() => ["plain", "underlined"].includes(props.variant));
      function onIntersect(isIntersecting, entries) {
        var _a, _b;
        if (!props.autofocus || !isIntersecting)
          return;
        (_b = (_a = entries[0].target) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
      }
      const vInputRef = vue.ref();
      const vFieldRef = vue.ref();
      const inputRef = vue.ref();
      const isActive = vue.computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
      function onFocus() {
        var _a;
        if (inputRef.value !== document.activeElement) {
          (_a = inputRef.value) == null ? void 0 : _a.focus();
        }
        if (!isFocused.value)
          focus();
      }
      function onControlMousedown(e) {
        emit("mousedown:control", e);
        if (e.target === inputRef.value)
          return;
        onFocus();
        e.preventDefault();
      }
      function onControlClick(e) {
        onFocus();
        emit("click:control", e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        vue.nextTick(() => {
          model.value = null;
          callEvent(props["onClick:clear"], e);
        });
      }
      function onInput(e) {
        var _a;
        const el = e.target;
        model.value = el.value;
        if (((_a = props.modelModifiers) == null ? void 0 : _a.trim) && ["text", "search", "password", "tel", "url"].includes(props.type)) {
          const caretPosition = [el.selectionStart, el.selectionEnd];
          vue.nextTick(() => {
            el.selectionStart = caretPosition[0];
            el.selectionEnd = caretPosition[1];
          });
        }
      }
      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter !== false && props.counter != null);
        const hasDetails = !!(hasCounter || slots.details);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const {
          modelValue: _,
          ...inputProps
        } = VInput.filterProps(props);
        const fieldProps = filterFieldProps(props);
        return vue.createVNode(VInput, vue.mergeProps({
          "ref": vInputRef,
          "modelValue": model.value,
          "onUpdate:modelValue": ($event) => model.value = $event,
          "class": ["v-text-field", {
            "v-text-field--prefixed": props.prefix,
            "v-text-field--suffixed": props.suffix,
            "v-input--plain-underlined": isPlainOrUnderlined.value
          }, props.class],
          "style": props.style
        }, rootAttrs, inputProps, {
          "centerAffix": !isPlainOrUnderlined.value,
          "focused": isFocused.value
        }), {
          ...slots,
          default: (_ref2) => {
            let {
              id,
              isDisabled,
              isDirty,
              isReadonly,
              isValid: isValid2
            } = _ref2;
            return vue.createVNode(VField, vue.mergeProps({
              "ref": vFieldRef,
              "onMousedown": onControlMousedown,
              "onClick": onControlClick,
              "onClick:clear": onClear,
              "onClick:prependInner": props["onClick:prependInner"],
              "onClick:appendInner": props["onClick:appendInner"],
              "role": props.role
            }, fieldProps, {
              "id": id.value,
              "active": isActive.value || isDirty.value,
              "dirty": isDirty.value || props.dirty,
              "disabled": isDisabled.value,
              "focused": isFocused.value,
              "error": isValid2.value === false
            }), {
              ...slots,
              default: (_ref3) => {
                let {
                  props: {
                    class: fieldClass,
                    ...slotProps
                  }
                } = _ref3;
                const inputNode = vue.withDirectives(vue.createVNode("input", vue.mergeProps({
                  "ref": inputRef,
                  "value": model.value,
                  "onInput": onInput,
                  "autofocus": props.autofocus,
                  "readonly": isReadonly.value,
                  "disabled": isDisabled.value,
                  "name": props.name,
                  "placeholder": props.placeholder,
                  "size": 1,
                  "type": props.type,
                  "onFocus": onFocus,
                  "onBlur": blur
                }, slotProps, inputAttrs), null), [[vue.resolveDirective("intersect"), {
                  handler: onIntersect
                }, null, {
                  once: true
                }]]);
                return vue.createVNode(vue.Fragment, null, [props.prefix && vue.createVNode("span", {
                  "class": "v-text-field__prefix"
                }, [vue.createVNode("span", {
                  "class": "v-text-field__prefix__text"
                }, [props.prefix])]), slots.default ? vue.createVNode("div", {
                  "class": fieldClass,
                  "data-no-activator": ""
                }, [slots.default(), inputNode]) : vue.cloneVNode(inputNode, {
                  class: fieldClass
                }), props.suffix && vue.createVNode("span", {
                  "class": "v-text-field__suffix"
                }, [vue.createVNode("span", {
                  "class": "v-text-field__suffix__text"
                }, [props.suffix])])]);
              }
            });
          },
          details: hasDetails ? (slotProps) => {
            var _a;
            return vue.createVNode(vue.Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && vue.createVNode(vue.Fragment, null, [vue.createVNode("span", null, null), vue.createVNode(VCounter, {
              "active": props.persistentCounter || isFocused.value,
              "value": counterValue.value,
              "max": max.value
            }, slots.counter)])]);
          } : void 0
        });
      });
      return forwardRefs({}, vInputRef, vFieldRef, inputRef);
    }
  });
  const __default__ = { name: "vx-datepicker" };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    ...__default__,
    props: /* @__PURE__ */ vue.mergeModels({
      value: {
        type: String,
        default: null
      },
      disabled: {
        type: Boolean
      },
      loading: {
        type: Boolean
      },
      label: {
        type: String,
        default: ""
      },
      dialogWidth: {
        type: Number,
        default: 580
      },
      dateFormat: {
        type: String,
        default: "yyyy-MM-dd"
      },
      timeFormat: {
        type: String,
        default: "HH:mm"
      },
      clearText: {
        type: String,
        default: "CLEAR"
      },
      okText: {
        type: String,
        default: "OK"
      },
      textFieldProps: {
        type: Object
      },
      datePickerProps: {
        type: Object
      },
      timePickerProps: {
        type: Object
      },
      hideDetails: {
        type: Boolean
      }
    }, {
      "modelValue": {},
      "modelModifiers": {}
    }),
    emits: /* @__PURE__ */ vue.mergeModels(["input"], ["update:modelValue"]),
    setup(__props, { emit: __emit }) {
      const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
      const props = __props;
      vue.ref(false);
      const date = vue.useModel(__props, "modelValue");
      const dateTimeFormat = vue.computed(() => {
        return props.dateFormat + " " + props.timeFormat;
      });
      const formattedDatetime = vue.computed(() => {
        return date.value ? format(date.value, dateTimeFormat.value) : "";
      });
      const init = () => {
        if (!props.value) {
          return;
        }
        const initDateTime = parse(props.value, dateTimeFormat.value, /* @__PURE__ */ new Date());
        date.value = format(initDateTime, DEFAULT_DATE_FORMAT);
      };
      const emit = __emit;
      const okHandler = (isActive) => {
        isActive.value = false;
        if (!date.value) {
          date.value = /* @__PURE__ */ new Date();
        }
        emit("input", formattedDatetime.value);
      };
      const clearHandler = (isActive) => {
        isActive.value = false;
        date.value = null;
        emit("input", null);
      };
      vue.onMounted(() => {
        init();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(VDialog, { width: __props.dialogWidth }, {
          activator: vue.withCtx(({ props: activatorProps }) => [
            vue.createVNode(VTextField, vue.mergeProps(activatorProps, {
              disabled: __props.disabled,
              loading: __props.loading,
              label: __props.label,
              modelValue: formattedDatetime.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formattedDatetime.value = $event),
              "hide-details": __props.hideDetails,
              "prepend-icon": "edit_calendar",
              readonly: ""
            }), {
              default: vue.withCtx(() => [
                vue.createVNode(VProgressLinear, {
                  color: "primary",
                  indeterminate: "",
                  absolute: "",
                  height: "2"
                })
              ]),
              _: 2
            }, 1040, ["disabled", "loading", "label", "modelValue", "hide-details"])
          ]),
          default: vue.withCtx(({ isActive }) => [
            vue.createVNode(VCard, null, {
              default: vue.withCtx(() => [
                vue.createVNode(VCardText, { class: "px-0 py-0" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(VContainer, null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(VRow, null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(VCol, {
                              cols: "6",
                              class: "pa-0"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(VDatePicker, {
                                  modelValue: date.value,
                                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => date.value = $event),
                                  "full-width": "",
                                  "no-title": ""
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                vue.createVNode(VCardActions, null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(VSpacer),
                    vue.createVNode(VBtn, {
                      color: "grey lighten-1",
                      variant: "text",
                      onClick: ($event) => clearHandler(isActive)
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(__props.clearText), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    vue.createVNode(VBtn, {
                      color: "green darken-1",
                      variant: "text",
                      onClick: ($event) => okHandler(isActive)
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(__props.okText), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 1
        }, 8, ["width"]);
      };
    }
  });
  const vuetifyx = {
    install: (app) => {
      app.component(_sfc_main.name, _sfc_main);
    }
  };
  window.__goplaidVueComponentRegisters = window.__goplaidVueComponentRegisters || [];
  window.__goplaidVueComponentRegisters.push((app, vueOptions) => {
    app.use(vuetifyx);
  });
});
