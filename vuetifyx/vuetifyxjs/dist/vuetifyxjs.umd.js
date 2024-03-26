(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(require("vue")) : typeof define === "function" && define.amd ? define(["vue"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Vue));
})(this, function(require$$0) {
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
      const index2 = args.argumentCallback ? args.argumentCallback(value) : value;
      return valuesArray[index2];
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
      valueCallback: (index2) => index2 + 1
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
    const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index2, array) => array.indexOf(priority) === index2).map(
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
  function getNestedValue(obj, path, fallback) {
    const last = path.length - 1;
    if (last < 0)
      return obj === void 0 ? fallback : obj;
    for (let i = 0; i < last; i++) {
      if (obj == null) {
        return fallback;
      }
      obj = obj[path[i]];
    }
    if (obj == null)
      return fallback;
    return obj[path[last]] === void 0 ? fallback : obj[path[last]];
  }
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
  function getObjectValueByPath(obj, path, fallback) {
    if (obj == null || !path || typeof path !== "string")
      return fallback;
    if (obj[path] !== void 0)
      return obj[path];
    path = path.replace(/\[(\w+)\]/g, ".$1");
    path = path.replace(/^\./, "");
    return getNestedValue(obj, path.split("."), fallback);
  }
  function getPropertyFromItem(item, property, fallback) {
    if (property === true)
      return item === void 0 ? fallback : item;
    if (property == null || typeof property === "boolean")
      return fallback;
    if (item !== Object(item)) {
      if (typeof property !== "function")
        return fallback;
      const value2 = property(item, fallback);
      return typeof value2 === "undefined" ? fallback : value2;
    }
    if (typeof property === "string")
      return getObjectValueByPath(item, property, fallback);
    if (Array.isArray(property))
      return getNestedValue(item, property, fallback);
    if (typeof property !== "function")
      return fallback;
    const value = property(item, fallback);
    return typeof value === "undefined" ? fallback : value;
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
  const keyValues = Object.freeze({
    enter: "Enter",
    tab: "Tab",
    delete: "Delete",
    esc: "Escape",
    space: "Space",
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    end: "End",
    home: "Home",
    del: "Delete",
    backspace: "Backspace",
    insert: "Insert",
    pageup: "PageUp",
    pagedown: "PageDown",
    shift: "Shift"
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
    const clone2 = {
      ...obj
    };
    exclude.forEach((prop) => delete clone2[prop]);
    return clone2;
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
  function debounce(fn, delay) {
    let timeoutId = 0;
    const wrap = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), require$$0.unref(delay));
    };
    wrap.clear = () => {
      clearTimeout(timeoutId);
    };
    wrap.immediate = fn;
    return wrap;
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
    let index2 = 0;
    while (index2 < str.length) {
      chunked.push(str.substr(index2, size));
      index2 += size;
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
      if (node.type === require$$0.Fragment) {
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
    const refs = require$$0.reactive({});
    const base = require$$0.computed(getter);
    require$$0.watchEffect(() => {
      for (const key in base.value) {
        refs[key] = base.value[key];
      }
    }, {
      flush: "sync"
    });
    return require$$0.toRefs(refs);
  }
  function includes(arr, val) {
    return arr.includes(val);
  }
  function eventName(propName) {
    return propName[2].toLowerCase() + propName.slice(3);
  }
  const EventProp = () => [Function, Array];
  function hasEvent(props, name) {
    name = "on" + require$$0.capitalize(name);
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
  function getNextElement(elements, location, condition) {
    let _el;
    let idx = elements.indexOf(document.activeElement);
    const inc = location === "next" ? 1 : -1;
    do {
      idx += inc;
      _el = elements[idx];
    } while ((!_el || _el.offsetParent == null || !((condition == null ? void 0 : condition(_el)) ?? true)) && idx < elements.length && idx >= 0);
    return _el;
  }
  function focusChild(el, location) {
    var _a, _b, _c, _d;
    const focusable = focusableChildren(el);
    if (!location) {
      if (el === document.activeElement || !el.contains(document.activeElement)) {
        (_a = focusable[0]) == null ? void 0 : _a.focus();
      }
    } else if (location === "first") {
      (_b = focusable[0]) == null ? void 0 : _b.focus();
    } else if (location === "last") {
      (_c = focusable.at(-1)) == null ? void 0 : _c.focus();
    } else if (typeof location === "number") {
      (_d = focusable[location]) == null ? void 0 : _d.focus();
    } else {
      const _el = getNextElement(focusable, location);
      if (_el)
        _el.focus();
      else
        focusChild(el, location === "next" ? "first" : "last");
    }
  }
  function noop() {
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
  function ensureValidVNode(vnodes) {
    return vnodes.some((child) => {
      if (!require$$0.isVNode(child))
        return true;
      if (child.type === require$$0.Comment)
        return false;
      return child.type !== require$$0.Fragment || ensureValidVNode(child.children);
    }) ? vnodes : null;
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
  function isClickInsideElement(event, targetDiv) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const divRect = targetDiv.getBoundingClientRect();
    const divLeft = divRect.left;
    const divTop = divRect.top;
    const divRight = divRect.right;
    const divBottom = divRect.bottom;
    return mouseX >= divLeft && mouseX <= divRight && mouseY >= divTop && mouseY <= divBottom;
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
    require$$0.warn(`Vuetify: ${message2}`);
  }
  function consoleError(message2) {
    require$$0.warn(`Vuetify error: ${message2}`);
  }
  function deprecate(original, replacement) {
    replacement = Array.isArray(replacement) ? replacement.slice(0, -1).map((s) => `'${s}'`).join(", ") + ` or '${replacement.at(-1)}'` : `'${replacement}'`;
    require$$0.warn(`[Vuetify UPGRADE] '${original}' is deprecated, use ${replacement} instead.`);
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
    return (defaults2) => {
      return Object.keys(props).reduce((obj, prop) => {
        const isObjectDefinition = typeof props[prop] === "object" && props[prop] != null && !Array.isArray(props[prop]);
        const definition = isObjectDefinition ? props[prop] : {
          type: props[prop]
        };
        if (defaults2 && prop in defaults2) {
          obj[prop] = {
            ...definition,
            default: defaults2[prop]
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
    const defaults2 = require$$0.inject(DefaultsSymbol);
    if (!defaults2)
      throw new Error("[Vuetify] Could not find defaults instance");
    return defaults2;
  }
  function provideDefaults(defaults2, options) {
    const injectedDefaults = injectDefaults();
    const providedDefaults = require$$0.ref(defaults2);
    const newDefaults = require$$0.computed(() => {
      const disabled = require$$0.unref(options == null ? void 0 : options.disabled);
      if (disabled)
        return injectedDefaults.value;
      const scoped = require$$0.unref(options == null ? void 0 : options.scoped);
      const reset = require$$0.unref(options == null ? void 0 : options.reset);
      const root = require$$0.unref(options == null ? void 0 : options.root);
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
    require$$0.provide(DefaultsSymbol, newDefaults);
    return newDefaults;
  }
  function propIsDefined(vnode, prop) {
    var _a, _b;
    return typeof ((_a = vnode.props) == null ? void 0 : _a[prop]) !== "undefined" || typeof ((_b = vnode.props) == null ? void 0 : _b[toKebabCase(prop)]) !== "undefined";
  }
  function internalUseDefaults() {
    let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let name = arguments.length > 1 ? arguments[1] : void 0;
    let defaults2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : injectDefaults();
    const vm = getCurrentInstance("useDefaults");
    name = name ?? vm.type.name ?? vm.type.__name;
    if (!name) {
      throw new Error("[Vuetify] Could not determine component name");
    }
    const componentDefaults = require$$0.computed(() => {
      var _a;
      return (_a = defaults2.value) == null ? void 0 : _a[props._as ?? name];
    });
    const _props = new Proxy(props, {
      get(target, prop) {
        var _a, _b, _c, _d;
        const propValue = Reflect.get(target, prop);
        if (prop === "class" || prop === "style") {
          return [(_a = componentDefaults.value) == null ? void 0 : _a[prop], propValue].filter((v) => v != null);
        } else if (typeof prop === "string" && !propIsDefined(vm.vnode, prop)) {
          return ((_b = componentDefaults.value) == null ? void 0 : _b[prop]) ?? ((_d = (_c = defaults2.value) == null ? void 0 : _c.global) == null ? void 0 : _d[prop]) ?? propValue;
        }
        return propValue;
      }
    });
    const _subcomponentDefaults = require$$0.shallowRef();
    require$$0.watchEffect(() => {
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
      require$$0.provide(DefaultsSymbol, require$$0.computed(() => {
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
        const defaults2 = injectDefaults();
        if (!defaults2.value)
          return options._setup(props, ctx);
        const {
          props: _props,
          provideSubDefaults
        } = internalUseDefaults(props, props._as ?? options.name, defaults2);
        const setupBindings = options._setup(_props, ctx);
        provideSubDefaults();
        return setupBindings;
      };
    }
    return options;
  }
  function genericComponent() {
    let exposeDefaults = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    return (options) => (exposeDefaults ? defineComponent : require$$0.defineComponent)(options);
  }
  function createSimpleFunctional(klass) {
    let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
    let name = arguments.length > 2 ? arguments[2] : void 0;
    return genericComponent()({
      name: name ?? require$$0.capitalize(require$$0.camelize(klass.replace(/__/g, "-"))),
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
          return require$$0.h(props.tag, {
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
    const vm = require$$0.getCurrentInstance();
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
    const borderClasses = require$$0.computed(() => {
      const border = require$$0.isRef(props) ? props.value : props.border;
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
    const densityClasses = require$$0.computed(() => {
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
    const elevationClasses = require$$0.computed(() => {
      const elevation = require$$0.isRef(props) ? props.value : props.elevation;
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
    const roundedClasses = require$$0.computed(() => {
      const rounded = require$$0.isRef(props) ? props.value : props.rounded;
      const tile = require$$0.isRef(props) ? props.value : props.tile;
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
    const theme = require$$0.inject(ThemeSymbol, null);
    if (!theme)
      throw new Error("Could not find Vuetify theme injection");
    const name = require$$0.computed(() => {
      return props.theme ?? theme.name.value;
    });
    const current = require$$0.computed(() => theme.themes.value[name.value]);
    const themeClasses = require$$0.computed(() => theme.isDisabled ? void 0 : `v-theme--${name.value}`);
    const newTheme = {
      ...theme,
      name,
      current,
      themeClasses
    };
    require$$0.provide(ThemeSymbol, newTheme);
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
    const colors = require$$0.computed(() => ({
      text: require$$0.isRef(props) ? props.value : name ? props[name] : null
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
    const colors = require$$0.computed(() => ({
      background: require$$0.isRef(props) ? props.value : name ? props[name] : null
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
    return require$$0.createVNode(require$$0.Fragment, null, [isClickable && require$$0.createVNode("span", {
      "key": "overlay",
      "class": `${name}__overlay`
    }, null), require$$0.createVNode("span", {
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
    const variantClasses = require$$0.computed(() => {
      const {
        variant
      } = require$$0.unref(props);
      return `${name}--variant-${variant}`;
    });
    const {
      colorClasses,
      colorStyles
    } = useColor(require$$0.computed(() => {
      const {
        variant,
        color
      } = require$$0.unref(props);
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
          color: require$$0.toRef(props, "color"),
          density: require$$0.toRef(props, "density"),
          flat: true,
          variant: require$$0.toRef(props, "variant")
        }
      });
      useRender(() => {
        return require$$0.createVNode(props.tag, {
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
      scope = require$$0.effectScope();
      scope.run(() => fn.length ? fn(() => {
        scope == null ? void 0 : scope.stop();
        start();
      }) : fn());
    }
    require$$0.watch(source, (active) => {
      if (active && !scope) {
        start();
      } else if (!active) {
        scope == null ? void 0 : scope.stop();
        scope = void 0;
      }
    }, {
      immediate: true
    });
    require$$0.onScopeDispose(() => {
      scope == null ? void 0 : scope.stop();
    });
  }
  function useProxiedModel(props, prop, defaultValue) {
    let transformIn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (v) => v;
    let transformOut = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (v) => v;
    const vm = getCurrentInstance("useProxiedModel");
    const internal = require$$0.ref(props[prop] !== void 0 ? props[prop] : defaultValue);
    const kebabProp = toKebabCase(prop);
    const checkKebab = kebabProp !== prop;
    const isControlled = checkKebab ? require$$0.computed(() => {
      var _a, _b, _c, _d;
      void props[prop];
      return !!((((_a = vm.vnode.props) == null ? void 0 : _a.hasOwnProperty(prop)) || ((_b = vm.vnode.props) == null ? void 0 : _b.hasOwnProperty(kebabProp))) && (((_c = vm.vnode.props) == null ? void 0 : _c.hasOwnProperty(`onUpdate:${prop}`)) || ((_d = vm.vnode.props) == null ? void 0 : _d.hasOwnProperty(`onUpdate:${kebabProp}`))));
    }) : require$$0.computed(() => {
      var _a, _b;
      void props[prop];
      return !!(((_a = vm.vnode.props) == null ? void 0 : _a.hasOwnProperty(prop)) && ((_b = vm.vnode.props) == null ? void 0 : _b.hasOwnProperty(`onUpdate:${prop}`)));
    });
    useToggleScope(() => !isControlled.value, () => {
      require$$0.watch(() => props[prop], (val) => {
        internal.value = val;
      });
    });
    const model = require$$0.computed({
      get() {
        const externalValue = props[prop];
        return transformIn(isControlled.value ? externalValue : internal.value);
      },
      set(internalValue) {
        const newValue = transformOut(internalValue);
        const value = require$$0.toRaw(isControlled.value ? props[prop] : internal.value);
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
    require$$0.provide(Symbol.for(`${injectKey.description}:id`), id);
    const group = require$$0.inject(injectKey, null);
    if (!group) {
      if (!required)
        return group;
      throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
    }
    const value = require$$0.toRef(props, "value");
    const disabled = require$$0.computed(() => !!(group.disabled.value || props.disabled));
    group.register({
      id,
      value,
      disabled
    }, vm);
    require$$0.onBeforeUnmount(() => {
      group.unregister(id);
    });
    const isSelected = require$$0.computed(() => {
      return group.isSelected(id);
    });
    const selectedClass = require$$0.computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
    require$$0.watch(isSelected, (value2) => {
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
    const items = require$$0.reactive([]);
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
      const index2 = children.indexOf(vm);
      if (require$$0.unref(unwrapped.value) == null) {
        unwrapped.value = index2;
      }
      if (index2 > -1) {
        items.splice(index2, 0, unwrapped);
      } else {
        items.push(unwrapped);
      }
    }
    function unregister(id) {
      if (isUnmounted)
        return;
      forceMandatoryValue();
      const index2 = items.findIndex((item) => item.id === id);
      items.splice(index2, 1);
    }
    function forceMandatoryValue() {
      const item = items.find((item2) => !item2.disabled);
      if (item && props.mandatory === "force" && !selected.value.length) {
        selected.value = [item.id];
      }
    }
    require$$0.onMounted(() => {
      forceMandatoryValue();
    });
    require$$0.onBeforeUnmount(() => {
      isUnmounted = true;
    });
    function select(id, value) {
      const item = items.find((item2) => item2.id === id);
      if (value && (item == null ? void 0 : item.disabled))
        return;
      if (props.multiple) {
        const internalValue = selected.value.slice();
        const index2 = internalValue.findIndex((v) => v === id);
        const isSelected = ~index2;
        value = value ?? !isSelected;
        if (isSelected && props.mandatory && internalValue.length <= 1)
          return;
        if (!isSelected && props.max != null && internalValue.length + 1 > props.max)
          return;
        if (index2 < 0 && value)
          internalValue.push(id);
        else if (index2 >= 0 && !value)
          internalValue.splice(index2, 1);
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
        let newIndex2 = (currentIndex + offset) % items.length;
        let newItem = items[newIndex2];
        while (newItem.disabled && newIndex2 !== currentIndex) {
          newIndex2 = (newIndex2 + offset) % items.length;
          newItem = items[newIndex2];
        }
        if (newItem.disabled)
          return;
        selected.value = [items[newIndex2].id];
      }
    }
    const state = {
      register,
      unregister,
      selected,
      select,
      disabled: require$$0.toRef(props, "disabled"),
      prev: () => step(items.length - 1),
      next: () => step(1),
      isSelected: (id) => selected.value.includes(id),
      selectedClass: require$$0.computed(() => props.selectedClass),
      items: require$$0.computed(() => items),
      getItemIndex: (value) => getItemIndex(items, value)
    };
    require$$0.provide(injectKey, state);
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
        return require$$0.createVNode(VBtnGroup, require$$0.mergeProps({
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
        defaults: defaults2,
        disabled,
        reset,
        root,
        scoped
      } = require$$0.toRefs(props);
      provideDefaults(defaults2, {
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
        return require$$0.createVNode(props.tag, null, {
          default: () => {
            var _a;
            return [props.icon ? require$$0.createVNode(Icon, null, null) : (_a = slots.default) == null ? void 0 : _a.call(slots)];
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
        return require$$0.createVNode(props.tag, require$$0.mergeProps(attrs, {
          "style": null
        }), {
          default: () => [require$$0.createVNode("svg", {
            "class": "v-icon__svg",
            "xmlns": "http://www.w3.org/2000/svg",
            "viewBox": "0 0 24 24",
            "role": "img",
            "aria-hidden": "true"
          }, [Array.isArray(props.icon) ? props.icon.map((path) => Array.isArray(path) ? require$$0.createVNode("path", {
            "d": path[0],
            "fill-opacity": path[1]
          }, null) : require$$0.createVNode("path", {
            "d": path
          }, null)) : require$$0.createVNode("path", {
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
        return require$$0.createVNode(props.tag, null, {
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
        return require$$0.createVNode(props.tag, {
          "class": props.icon
        }, null);
      };
    }
  });
  const useIcon = (props) => {
    const icons = require$$0.inject(IconSymbol);
    if (!icons)
      throw new Error("Missing Vuetify Icons provide!");
    const iconData = require$$0.computed(() => {
      var _a;
      const iconAlias = require$$0.unref(props);
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
      const slotIcon = require$$0.ref();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        iconData
      } = useIcon(require$$0.computed(() => slotIcon.value || props.icon));
      const {
        sizeClasses
      } = useSize(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(require$$0.toRef(props, "color"));
      useRender(() => {
        var _a, _b;
        const slotValue = (_a = slots.default) == null ? void 0 : _a.call(slots);
        if (slotValue) {
          slotIcon.value = (_b = flattenFragments(slotValue).filter((node) => node.type === require$$0.Text && node.children && typeof node.children === "string")[0]) == null ? void 0 : _b.children;
        }
        return require$$0.createVNode(iconData.value.component, {
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
    const intersectionRef = require$$0.ref();
    const isIntersecting = require$$0.shallowRef(false);
    if (SUPPORTS_INTERSECTION) {
      const observer = new IntersectionObserver((entries) => {
        callback == null ? void 0 : callback(entries, observer);
        isIntersecting.value = !!entries.find((entry) => entry.isIntersecting);
      }, options);
      require$$0.onBeforeUnmount(() => {
        observer.disconnect();
      });
      require$$0.watch(intersectionRef, (newValue, oldValue) => {
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
    const resizeRef = require$$0.ref();
    const contentRect = require$$0.ref();
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
      require$$0.onBeforeUnmount(() => {
        observer.disconnect();
      });
      require$$0.watch(resizeRef, (newValue, oldValue) => {
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
      contentRect: require$$0.readonly(contentRect)
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
      const root = require$$0.ref();
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
      } = useTextColor(require$$0.toRef(props, "color"));
      const {
        textColorClasses: underlayColorClasses,
        textColorStyles: underlayColorStyles
      } = useTextColor(require$$0.toRef(props, "bgColor"));
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const {
        resizeRef,
        contentRect
      } = useResizeObserver();
      const normalizedValue = require$$0.computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
      const width = require$$0.computed(() => Number(props.width));
      const size = require$$0.computed(() => {
        return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
      });
      const diameter = require$$0.computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
      const strokeWidth = require$$0.computed(() => width.value / size.value * diameter.value);
      const strokeDashOffset = require$$0.computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
      require$$0.watchEffect(() => {
        intersectionRef.value = root.value;
        resizeRef.value = root.value;
      });
      useRender(() => require$$0.createVNode(props.tag, {
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
        default: () => [require$$0.createVNode("svg", {
          "style": {
            transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
          },
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": `0 0 ${diameter.value} ${diameter.value}`
        }, [require$$0.createVNode("circle", {
          "class": ["v-progress-circular__underlay", underlayColorClasses.value],
          "style": underlayColorStyles.value,
          "fill": "transparent",
          "cx": "50%",
          "cy": "50%",
          "r": MAGIC_RADIUS_CONSTANT,
          "stroke-width": strokeWidth.value,
          "stroke-dasharray": CIRCUMFERENCE,
          "stroke-dashoffset": 0
        }, null), require$$0.createVNode("circle", {
          "class": "v-progress-circular__overlay",
          "fill": "transparent",
          "cx": "50%",
          "cy": "50%",
          "r": MAGIC_RADIUS_CONSTANT,
          "stroke-width": strokeWidth.value,
          "stroke-dasharray": CIRCUMFERENCE,
          "stroke-dashoffset": strokeDashOffset.value
        }, null)]), slots.default && require$$0.createVNode("div", {
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
    const dimensionStyles = require$$0.computed(() => ({
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
    const locale = require$$0.inject(LocaleSymbol);
    if (!locale)
      throw new Error("[Vuetify] Could not find injected locale instance");
    return locale;
  }
  function useRtl() {
    const locale = require$$0.inject(LocaleSymbol);
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
    const locationStyles = require$$0.computed(() => {
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
      } = useBackgroundColor(require$$0.computed(() => props.bgColor || props.color));
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
      const max = require$$0.computed(() => parseInt(props.max, 10));
      const height = require$$0.computed(() => parseInt(props.height, 10));
      const normalizedBuffer = require$$0.computed(() => parseFloat(props.bufferValue) / max.value * 100);
      const normalizedValue = require$$0.computed(() => parseFloat(progress.value) / max.value * 100);
      const isReversed = require$$0.computed(() => isRtl.value !== props.reverse);
      const transition = require$$0.computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
      const opacity = require$$0.computed(() => {
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
      useRender(() => require$$0.createVNode(props.tag, {
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
        default: () => [props.stream && require$$0.createVNode("div", {
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
        }, null), require$$0.createVNode("div", {
          "class": ["v-progress-linear__background", backgroundColorClasses.value],
          "style": [backgroundColorStyles.value, {
            opacity: opacity.value,
            width: convertToUnit(!props.stream ? 100 : normalizedBuffer.value, "%")
          }]
        }, null), require$$0.createVNode(require$$0.Transition, {
          "name": transition.value
        }, {
          default: () => [!props.indeterminate ? require$$0.createVNode("div", {
            "class": ["v-progress-linear__determinate", barColorClasses.value],
            "style": [barColorStyles.value, {
              width: convertToUnit(normalizedValue.value, "%")
            }]
          }, null) : require$$0.createVNode("div", {
            "class": "v-progress-linear__indeterminate"
          }, [["long", "short"].map((bar) => require$$0.createVNode("div", {
            "key": bar,
            "class": ["v-progress-linear__indeterminate", bar, barColorClasses.value],
            "style": barColorStyles.value
          }, null))])]
        }), slots.default && require$$0.createVNode("div", {
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
    const loaderClasses = require$$0.computed(() => ({
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
    return require$$0.createVNode("div", {
      "class": `${props.name}__loader`
    }, [((_a = slots.default) == null ? void 0 : _a.call(slots, {
      color: props.color,
      isActive: props.active
    })) || require$$0.createVNode(VProgressLinear, {
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
    const positionClasses = require$$0.computed(() => {
      return props.position ? `${name}--${props.position}` : void 0;
    });
    return {
      positionClasses
    };
  }
  function useRoute() {
    const vm = getCurrentInstance("useRoute");
    return require$$0.computed(() => {
      var _a;
      return (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$route;
    });
  }
  function useRouter() {
    var _a, _b;
    return (_b = (_a = getCurrentInstance("useRouter")) == null ? void 0 : _a.proxy) == null ? void 0 : _b.$router;
  }
  function useLink(props, attrs) {
    const RouterLink = require$$0.resolveDynamicComponent("RouterLink");
    const isLink = require$$0.computed(() => !!(props.href || props.to));
    const isClickable = require$$0.computed(() => {
      return (isLink == null ? void 0 : isLink.value) || hasEvent(attrs, "click") || hasEvent(props, "click");
    });
    if (typeof RouterLink === "string") {
      return {
        isLink,
        isClickable,
        href: require$$0.toRef(props, "href")
      };
    }
    const link = props.to ? RouterLink.useLink(props) : void 0;
    const route = useRoute();
    return {
      isLink,
      isClickable,
      route: link == null ? void 0 : link.route,
      navigate: link == null ? void 0 : link.navigate,
      isActive: link && require$$0.computed(() => {
        var _a, _b, _c;
        if (!props.exact)
          return (_a = link.isActive) == null ? void 0 : _a.value;
        if (!route.value)
          return (_b = link.isExactActive) == null ? void 0 : _b.value;
        return ((_c = link.isExactActive) == null ? void 0 : _c.value) && deepEqual(link.route.value.query, route.value.query);
      }),
      href: require$$0.computed(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
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
      require$$0.nextTick(() => {
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
      require$$0.onScopeDispose(() => {
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
    require$$0.watch(() => {
      var _a;
      return (_a = link.isActive) == null ? void 0 : _a.value;
    }, (isActive) => {
      if (link.isLink.value && isActive && select) {
        require$$0.nextTick(() => {
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
      const isActive = require$$0.computed(() => {
        var _a;
        if (props.active !== void 0) {
          return props.active;
        }
        if (link.isLink.value) {
          return (_a = link.isActive) == null ? void 0 : _a.value;
        }
        return group == null ? void 0 : group.isSelected.value;
      });
      const isDisabled = require$$0.computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
      const isElevated = require$$0.computed(() => {
        return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
      });
      const valueAttr = require$$0.computed(() => {
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
        return require$$0.withDirectives(require$$0.createVNode(Tag, {
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
            return [genOverlays(true, "v-btn"), !props.icon && hasPrepend && require$$0.createVNode("span", {
              "key": "prepend",
              "class": "v-btn__prepend"
            }, [!slots.prepend ? require$$0.createVNode(VIcon, {
              "key": "prepend-icon",
              "icon": props.prependIcon
            }, null) : require$$0.createVNode(VDefaultsProvider, {
              "key": "prepend-defaults",
              "disabled": !props.prependIcon,
              "defaults": {
                VIcon: {
                  icon: props.prependIcon
                }
              }
            }, slots.prepend)]), require$$0.createVNode("span", {
              "class": "v-btn__content",
              "data-no-activator": ""
            }, [!slots.default && hasIcon ? require$$0.createVNode(VIcon, {
              "key": "content-icon",
              "icon": props.icon
            }, null) : require$$0.createVNode(VDefaultsProvider, {
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
            })]), !props.icon && hasAppend && require$$0.createVNode("span", {
              "key": "append",
              "class": "v-btn__append"
            }, [!slots.append ? require$$0.createVNode(VIcon, {
              "key": "append-icon",
              "icon": props.appendIcon
            }, null) : require$$0.createVNode(VDefaultsProvider, {
              "key": "append-defaults",
              "disabled": !props.appendIcon,
              "defaults": {
                VIcon: {
                  icon: props.appendIcon
                }
              }
            }, slots.append)]), !!props.loading && require$$0.createVNode("span", {
              "key": "loader",
              "class": "v-btn__loader"
            }, [((_a2 = slots.loader) == null ? void 0 : _a2.call(slots)) ?? require$$0.createVNode(VProgressCircular, {
              "color": typeof props.loading === "boolean" ? void 0 : props.loading,
              "indeterminate": true,
              "size": "23",
              "width": "2"
            }, null)])];
          }
        }), [[require$$0.resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
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
        return require$$0.createVNode("div", {
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
      aspectStyles: require$$0.computed(() => {
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
        return require$$0.createVNode("div", {
          "class": ["v-responsive", {
            "v-responsive--inline": props.inline
          }, props.class],
          "style": [dimensionStyles.value, props.style]
        }, [require$$0.createVNode("div", {
          "class": "v-responsive__sizer",
          "style": aspectStyles.value
        }, null), (_a = slots.additional) == null ? void 0 : _a.call(slots), slots.default && require$$0.createVNode("div", {
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
      component = group ? require$$0.TransitionGroup : require$$0.Transition,
      ...customProps
    } = typeof transition === "object" ? transition : {};
    return require$$0.h(component, require$$0.mergeProps(typeof transition === "string" ? {
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
      intersect: Intersect
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
      } = useBackgroundColor(require$$0.toRef(props, "color"));
      const {
        roundedClasses
      } = useRounded(props);
      const vm = getCurrentInstance("VImg");
      const currentSrc = require$$0.shallowRef("");
      const image = require$$0.ref();
      const state = require$$0.shallowRef(props.eager ? "loading" : "idle");
      const naturalWidth = require$$0.shallowRef();
      const naturalHeight = require$$0.shallowRef();
      const normalisedSrc = require$$0.computed(() => {
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
      const aspectRatio = require$$0.computed(() => {
        return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
      });
      require$$0.watch(() => props.src, () => {
        init(state.value !== "idle");
      });
      require$$0.watch(aspectRatio, (val, oldVal) => {
        if (!val && oldVal && image.value) {
          pollForSize(image.value);
        }
      });
      require$$0.onBeforeMount(() => init());
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
        require$$0.nextTick(() => {
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
      require$$0.onBeforeUnmount(() => {
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
      const containClasses = require$$0.computed(() => ({
        "v-img__img--cover": props.cover,
        "v-img__img--contain": !props.cover
      }));
      const __image = () => {
        var _a;
        if (!normalisedSrc.value.src || state.value === "idle")
          return null;
        const img = require$$0.createVNode("img", {
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
        return require$$0.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [require$$0.withDirectives(sources ? require$$0.createVNode("picture", {
            "class": "v-img__picture"
          }, [sources, img]) : img, [[require$$0.vShow, state.value === "loaded"]])]
        });
      };
      const __preloadImage = () => require$$0.createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && require$$0.createVNode("img", {
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
        return require$$0.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && require$$0.createVNode("div", {
            "class": "v-img__placeholder"
          }, [slots.placeholder()])]
        });
      };
      const __error = () => {
        if (!slots.error)
          return null;
        return require$$0.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [state.value === "error" && require$$0.createVNode("div", {
            "class": "v-img__error"
          }, [slots.error()])]
        });
      };
      const __gradient = () => {
        if (!props.gradient)
          return null;
        return require$$0.createVNode("div", {
          "class": "v-img__gradient",
          "style": {
            backgroundImage: `linear-gradient(${props.gradient})`
          }
        }, null);
      };
      const isBooted = require$$0.shallowRef(false);
      {
        const stop = require$$0.watch(aspectRatio, (val) => {
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
        return require$$0.withDirectives(require$$0.createVNode(VResponsive, require$$0.mergeProps({
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
          additional: () => require$$0.createVNode(require$$0.Fragment, null, [require$$0.createVNode(__image, null, null), require$$0.createVNode(__preloadImage, null, null), require$$0.createVNode(__gradient, null, null), require$$0.createVNode(__placeholder, null, null), require$$0.createVNode(__error, null, null)]),
          default: slots.default
        }), [[require$$0.resolveDirective("intersect"), {
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
      useRender(() => require$$0.createVNode(props.tag, {
        "class": ["v-avatar", {
          "v-avatar--start": props.start,
          "v-avatar--end": props.end
        }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, sizeStyles.value, props.style]
      }, {
        default: () => [!slots.default ? props.image ? require$$0.createVNode(VImg, {
          "key": "image",
          "src": props.image,
          "alt": "",
          "cover": true
        }, null) : props.icon ? require$$0.createVNode(VIcon, {
          "key": "icon",
          "icon": props.icon
        }, null) : props.text : require$$0.createVNode(VDefaultsProvider, {
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
        return require$$0.createVNode("div", {
          "class": ["v-card-item", props.class],
          "style": props.style
        }, [hasPrepend && require$$0.createVNode("div", {
          "key": "prepend",
          "class": "v-card-item__prepend"
        }, [!slots.prepend ? require$$0.createVNode(require$$0.Fragment, null, [props.prependAvatar && require$$0.createVNode(VAvatar, {
          "key": "prepend-avatar",
          "density": props.density,
          "image": props.prependAvatar
        }, null), props.prependIcon && require$$0.createVNode(VIcon, {
          "key": "prepend-icon",
          "density": props.density,
          "icon": props.prependIcon
        }, null)]) : require$$0.createVNode(VDefaultsProvider, {
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
        }, slots.prepend)]), require$$0.createVNode("div", {
          "class": "v-card-item__content"
        }, [hasTitle && require$$0.createVNode(VCardTitle, {
          "key": "title"
        }, {
          default: () => {
            var _a2;
            return [((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) ?? props.title];
          }
        }), hasSubtitle && require$$0.createVNode(VCardSubtitle, {
          "key": "subtitle"
        }, {
          default: () => {
            var _a2;
            return [((_a2 = slots.subtitle) == null ? void 0 : _a2.call(slots)) ?? props.subtitle];
          }
        }), (_a = slots.default) == null ? void 0 : _a.call(slots)]), hasAppend && require$$0.createVNode("div", {
          "key": "append",
          "class": "v-card-item__append"
        }, [!slots.append ? require$$0.createVNode(require$$0.Fragment, null, [props.appendIcon && require$$0.createVNode(VIcon, {
          "key": "append-icon",
          "density": props.density,
          "icon": props.appendIcon
        }, null), props.appendAvatar && require$$0.createVNode(VAvatar, {
          "key": "append-avatar",
          "density": props.density,
          "image": props.appendAvatar
        }, null)]) : require$$0.createVNode(VDefaultsProvider, {
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
      const isLink = require$$0.computed(() => props.link !== false && link.isLink.value);
      const isClickable = require$$0.computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value));
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
        return require$$0.withDirectives(require$$0.createVNode(Tag, {
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
            return [hasImage && require$$0.createVNode("div", {
              "key": "image",
              "class": "v-card__image"
            }, [!slots.image ? require$$0.createVNode(VImg, {
              "key": "image-img",
              "cover": true,
              "src": props.image
            }, null) : require$$0.createVNode(VDefaultsProvider, {
              "key": "image-defaults",
              "disabled": !props.image,
              "defaults": {
                VImg: {
                  cover: true,
                  src: props.image
                }
              }
            }, slots.image)]), require$$0.createVNode(LoaderSlot, {
              "name": "v-card",
              "active": !!props.loading,
              "color": typeof props.loading === "boolean" ? void 0 : props.loading
            }, {
              default: slots.loader
            }), hasCardItem && require$$0.createVNode(VCardItem, {
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
            }), hasText && require$$0.createVNode(VCardText, {
              "key": "text"
            }, {
              default: () => {
                var _a2;
                return [((_a2 = slots.text) == null ? void 0 : _a2.call(slots)) ?? props.text];
              }
            }), (_a = slots.default) == null ? void 0 : _a.call(slots), slots.actions && require$$0.createVNode(VCardActions, null, {
              default: slots.actions
            }), genOverlays(isClickable.value, "v-card")];
          }
        }), [[require$$0.resolveDirective("ripple"), isClickable.value && props.ripple]]);
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
      useRender(() => require$$0.createVNode(props.tag, {
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
  const makeDisplayProps = propsFactory({
    mobileBreakpoint: [Number, String]
  }, "display");
  function useDisplay() {
    let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const display = require$$0.inject(DisplaySymbol);
    if (!display)
      throw new Error("Could not find Vuetify display injection");
    const mobile = require$$0.computed(() => {
      if (!props.mobileBreakpoint)
        return display.mobile.value;
      const breakpointValue = typeof props.mobileBreakpoint === "number" ? props.mobileBreakpoint : display.thresholds.value[props.mobileBreakpoint];
      return display.width.value < breakpointValue;
    });
    const displayClasses = require$$0.computed(() => {
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
      const offsetKey = "offset" + require$$0.capitalize(val);
      props[offsetKey] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();
  const orderProps = (() => {
    return breakpoints.reduce((props, val) => {
      const orderKey = "order" + require$$0.capitalize(val);
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
      const classes = require$$0.computed(() => {
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
        return require$$0.h(props.tag, {
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
      const prefixKey = prefix + require$$0.capitalize(val);
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
      const classes = require$$0.computed(() => {
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
        return require$$0.h(props.tag, {
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
      const disableMonth = require$$0.computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes("text") : !!props.disabled;
      });
      const disableYear = require$$0.computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes("mode") : !!props.disabled;
      });
      const disablePrev = require$$0.computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes("prev") : !!props.disabled;
      });
      const disableNext = require$$0.computed(() => {
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
        return require$$0.createVNode("div", {
          "class": ["v-date-picker-controls"]
        }, [require$$0.createVNode(VBtn, {
          "class": "v-date-picker-controls__month-btn",
          "disabled": disableMonth.value,
          "text": props.text,
          "variant": "text",
          "rounded": true,
          "onClick": onClickMonth
        }, null), require$$0.createVNode(VBtn, {
          "key": "mode-btn",
          "class": "v-date-picker-controls__mode-btn",
          "disabled": disableYear.value,
          "density": "comfortable",
          "icon": props.modeIcon,
          "variant": "text",
          "onClick": onClickYear
        }, null), require$$0.createVNode(VSpacer, {
          "key": "mode-spacer"
        }, null), require$$0.createVNode("div", {
          "key": "month-buttons",
          "class": "v-date-picker-controls__month"
        }, [require$$0.createVNode(VBtn, {
          "disabled": disablePrev.value,
          "icon": props.prevIcon,
          "variant": "text",
          "onClick": onClickPrev
        }, null), require$$0.createVNode(VBtn, {
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
        return require$$0.createVNode("div", {
          "class": ["v-date-picker-header", {
            "v-date-picker-header--clickable": !!props.onClick
          }, backgroundColorClasses.value],
          "style": backgroundColorStyles.value,
          "onClick": onClick
        }, [slots.prepend && require$$0.createVNode("div", {
          "key": "prepend",
          "class": "v-date-picker-header__prepend"
        }, [slots.prepend()]), hasContent && require$$0.createVNode(MaybeTransition, {
          "key": "content",
          "name": props.transition
        }, {
          default: () => {
            var _a;
            return [require$$0.createVNode("div", {
              "key": props.header,
              "class": "v-date-picker-header__content"
            }, [((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? props.header])];
          }
        }), hasAppend && require$$0.createVNode("div", {
          "class": "v-date-picker-header__append"
        }, [!slots.append ? require$$0.createVNode(VBtn, {
          "key": "append-btn",
          "icon": props.appendIcon,
          "variant": "text",
          "onClick": onClickAppend
        }, null) : require$$0.createVNode(VDefaultsProvider, {
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
    const instance = require$$0.reactive(typeof options.adapter === "function" ? new options.adapter({
      locale: options.locale[locale.current.value] ?? locale.current.value,
      formats: options.formats
    }) : options.adapter);
    require$$0.watch(locale.current, (value) => {
      instance.locale = options.locale[value] ?? value ?? instance.locale;
    });
    return instance;
  }
  function useDate() {
    const options = require$$0.inject(DateOptionsSymbol);
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
    const displayValue = require$$0.computed(() => {
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
    const weeksInMonth = require$$0.computed(() => {
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
      }).map((date, index2) => {
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
          isWeekStart: index2 % 7 === 0,
          isWeekEnd: index2 % 7 === 6,
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
    const daysInWeek = require$$0.computed(() => {
      const lastDay = adapter.startOfWeek(model.value);
      const week = [];
      for (let day = 0; day <= 6; day++) {
        week.push(adapter.addDays(lastDay, day));
      }
      const days = week;
      const today = adapter.date();
      return genDays(days, today);
    });
    const daysInMonth = require$$0.computed(() => {
      const days = weeksInMonth.value.flat();
      const today = adapter.date();
      return genDays(days, today);
    });
    const weekNumbers = require$$0.computed(() => {
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
      const daysRef = require$$0.ref();
      const {
        daysInMonth,
        model,
        weekNumbers
      } = useCalendar(props);
      const adapter = useDate();
      const rangeStart = require$$0.shallowRef();
      const rangeStop = require$$0.shallowRef();
      const atMax = require$$0.computed(() => {
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
        const index2 = model.value.findIndex((selection) => adapter.isSameDay(selection, value));
        if (index2 === -1) {
          model.value = [...model.value, value];
        } else {
          const value2 = [...model.value];
          value2.splice(index2, 1);
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
      return () => require$$0.createVNode("div", {
        "class": "v-date-picker-month"
      }, [props.showWeek && require$$0.createVNode("div", {
        "key": "weeks",
        "class": "v-date-picker-month__weeks"
      }, [!props.hideWeekdays && require$$0.createVNode("div", {
        "key": "hide-week-days",
        "class": "v-date-picker-month__day"
      }, [require$$0.createTextVNode(" ")]), weekNumbers.value.map((week) => require$$0.createVNode("div", {
        "class": ["v-date-picker-month__day", "v-date-picker-month__day--adjacent"]
      }, [week]))]), require$$0.createVNode("div", {
        "ref": daysRef,
        "class": "v-date-picker-month__days"
      }, [!props.hideWeekdays && adapter.getWeekdays().map((weekDay) => require$$0.createVNode("div", {
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
        return require$$0.createVNode("div", {
          "class": ["v-date-picker-month__day", {
            "v-date-picker-month__day--adjacent": item.isAdjacent,
            "v-date-picker-month__day--hide-adjacent": item.isHidden,
            "v-date-picker-month__day--selected": item.isSelected,
            "v-date-picker-month__day--week-end": item.isWeekEnd,
            "v-date-picker-month__day--week-start": item.isWeekStart
          }],
          "data-v-date": !item.isDisabled ? item.isoDate : void 0
        }, [(props.showAdjacentMonths || !item.isAdjacent) && require$$0.createVNode(VDefaultsProvider, {
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
            return [((_a = slots.day) == null ? void 0 : _a.call(slots, slotProps)) ?? require$$0.createVNode(VBtn, slotProps.props, null)];
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
      const months = require$$0.computed(() => {
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
      require$$0.watchEffect(() => {
        model.value = model.value ?? adapter.getMonth(adapter.date());
      });
      useRender(() => require$$0.createVNode("div", {
        "class": "v-date-picker-months",
        "style": {
          height: convertToUnit(props.height)
        }
      }, [require$$0.createVNode("div", {
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
        })) ?? require$$0.createVNode(VBtn, require$$0.mergeProps({
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
      const years = require$$0.computed(() => {
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
      require$$0.watchEffect(() => {
        model.value = model.value ?? adapter.getYear(adapter.date());
      });
      const yearRef = require$$0.ref();
      require$$0.onMounted(async () => {
        var _a;
        await require$$0.nextTick();
        (_a = yearRef.value) == null ? void 0 : _a.$el.scrollIntoView({
          block: "center"
        });
      });
      useRender(() => require$$0.createVNode("div", {
        "class": "v-date-picker-years",
        "style": {
          height: convertToUnit(props.height)
        }
      }, [require$$0.createVNode("div", {
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
        })) ?? require$$0.createVNode(VBtn, require$$0.mergeProps({
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
          const tag = props.group ? require$$0.TransitionGroup : require$$0.Transition;
          return require$$0.h(tag, {
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
          return require$$0.h(require$$0.Transition, {
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
    const offsetProperty = require$$0.camelize(`offset-${sizeProperty}`);
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
        return props.target ? require$$0.createVNode(require$$0.Transition, require$$0.mergeProps({
          "name": "dialog-transition"
        }, functions, {
          "css": false
        }), slots) : require$$0.createVNode(require$$0.Transition, {
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
  const VExpandTransition = createJavascriptTransition("expand-transition", ExpandTransitionGenerator());
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
      } = useBackgroundColor(require$$0.toRef(props, "color"));
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
      useRender(() => require$$0.createVNode(props.tag, {
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
      } = useBackgroundColor(require$$0.toRef(props, "color"));
      useRender(() => {
        const sheetProps = VSheet.filterProps(props);
        const hasTitle = !!(props.title || slots.title);
        return require$$0.createVNode(VSheet, require$$0.mergeProps(sheetProps, {
          "color": props.bgColor,
          "class": ["v-picker", {
            "v-picker--landscape": props.landscape,
            "v-picker--with-actions": !!slots.actions
          }, props.class],
          "style": props.style
        }), {
          default: () => {
            var _a;
            return [!props.hideHeader && require$$0.createVNode("div", {
              "key": "header",
              "class": [backgroundColorClasses.value],
              "style": [backgroundColorStyles.value]
            }, [hasTitle && require$$0.createVNode(VPickerTitle, {
              "key": "picker-title"
            }, {
              default: () => {
                var _a2;
                return [((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) ?? props.title];
              }
            }), slots.header && require$$0.createVNode("div", {
              "class": "v-picker__header"
            }, [slots.header()])]), require$$0.createVNode("div", {
              "class": "v-picker__body"
            }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), slots.actions && require$$0.createVNode(VDefaultsProvider, {
              "defaults": {
                VBtn: {
                  slim: true,
                  variant: "text"
                }
              }
            }, {
              default: () => [require$$0.createVNode("div", {
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
      const internal = require$$0.computed(() => {
        var _a;
        const value = adapter.date((_a = model.value) == null ? void 0 : _a[0]);
        return value && adapter.isValid(value) ? value : adapter.date();
      });
      const month = require$$0.ref(Number(props.month ?? adapter.getMonth(adapter.startOfMonth(internal.value))));
      const year = require$$0.ref(Number(props.year ?? adapter.getYear(adapter.startOfYear(adapter.setMonth(internal.value, month.value)))));
      const isReversing = require$$0.shallowRef(false);
      const header = require$$0.computed(() => {
        return props.multiple && model.value.length > 1 ? t("$vuetify.datePicker.itemsSelected", model.value.length) : model.value[0] && adapter.isValid(model.value[0]) ? adapter.format(model.value[0], "normalDateWithWeekday") : t(props.header);
      });
      const text = require$$0.computed(() => {
        return adapter.format(adapter.date(new Date(year.value, month.value, 1)), "monthAndYear");
      });
      const headerTransition = require$$0.computed(() => `date-picker-header${isReversing.value ? "-reverse" : ""}-transition`);
      const minDate = require$$0.computed(() => {
        const date = adapter.date(props.min);
        return props.min && adapter.isValid(date) ? date : null;
      });
      const maxDate = require$$0.computed(() => {
        const date = adapter.date(props.max);
        return props.max && adapter.isValid(date) ? date : null;
      });
      const disabled = require$$0.computed(() => {
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
      require$$0.watch(model, (val, oldVal) => {
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
        return require$$0.createVNode(VPicker, require$$0.mergeProps(pickerProps, {
          "class": ["v-date-picker", `v-date-picker--${viewMode.value}`, {
            "v-date-picker--show-week": props.showWeek
          }, props.class],
          "style": props.style
        }), {
          title: () => {
            var _a;
            return ((_a = slots.title) == null ? void 0 : _a.call(slots)) ?? require$$0.createVNode("div", {
              "class": "v-date-picker__title"
            }, [t(props.title)]);
          },
          header: () => slots.header ? require$$0.createVNode(VDefaultsProvider, {
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
          }) : require$$0.createVNode(VDatePickerHeader, require$$0.mergeProps({
            "key": "header"
          }, datePickerHeaderProps, headerProps, {
            "onClick": viewMode.value !== "month" ? onClickDate : void 0
          }), {
            ...slots,
            default: void 0
          }),
          default: () => require$$0.createVNode(require$$0.Fragment, null, [require$$0.createVNode(VDatePickerControls, require$$0.mergeProps(datePickerControlsProps, {
            "disabled": disabled.value,
            "text": text.value,
            "onClick:next": onClickNext,
            "onClick:prev": onClickPrev,
            "onClick:month": onClickMonth,
            "onClick:year": onClickYear
          }), null), require$$0.createVNode(VFadeTransition, {
            "hideOnLeave": true
          }, {
            default: () => [viewMode.value === "months" ? require$$0.createVNode(VDatePickerMonths, require$$0.mergeProps({
              "key": "date-picker-months"
            }, datePickerMonthsProps, {
              "modelValue": month.value,
              "onUpdate:modelValue": [($event) => month.value = $event, onUpdateMonth],
              "min": minDate.value,
              "max": maxDate.value
            }), null) : viewMode.value === "year" ? require$$0.createVNode(VDatePickerYears, require$$0.mergeProps({
              "key": "date-picker-years"
            }, datePickerYearsProps, {
              "modelValue": year.value,
              "onUpdate:modelValue": [($event) => year.value = $event, onUpdateYear],
              "min": minDate.value,
              "max": maxDate.value
            }), null) : require$$0.createVNode(VDatePickerMonth, require$$0.mergeProps({
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
    const contentStyles = require$$0.ref({});
    const updateLocation = require$$0.ref();
    if (IN_BROWSER) {
      useToggleScope(() => !!(data.isActive.value && props.locationStrategy), (reset) => {
        var _a, _b;
        require$$0.watch(() => props.locationStrategy, reset);
        require$$0.onScopeDispose(() => {
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
      return require$$0.computed(() => {
        const val = parseFloat(props[key]);
        return isNaN(val) ? Infinity : val;
      });
    });
    const offset = require$$0.computed(() => {
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
    require$$0.watch([data.target, data.contentEl], (_ref, _ref2) => {
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
    require$$0.onScopeDispose(() => {
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
    require$$0.watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
    require$$0.nextTick(() => {
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
    require$$0.watchEffect(async () => {
      scope == null ? void 0 : scope.stop();
      if (!(data.isActive.value && props.scrollStrategy))
        return;
      scope = require$$0.effectScope();
      await require$$0.nextTick();
      scope.active && scope.run(() => {
        var _a;
        if (typeof props.scrollStrategy === "function") {
          props.scrollStrategy(data, props, scope);
        } else {
          (_a = scrollStrategies[props.scrollStrategy]) == null ? void 0 : _a.call(scrollStrategies, data, props, scope);
        }
      });
    });
    require$$0.onScopeDispose(() => {
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
    require$$0.onScopeDispose(() => {
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
    require$$0.onScopeDispose(() => {
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
    require$$0.onScopeDispose(() => {
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
    const activatorEl = require$$0.ref();
    let isHovered = false;
    let isFocused = false;
    let firstEnter = true;
    const openOnFocus = require$$0.computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
    const openOnClick = require$$0.computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
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
    const cursorTarget = require$$0.ref();
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
    const activatorEvents = require$$0.computed(() => {
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
    const contentEvents = require$$0.computed(() => {
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
        const menu = require$$0.inject(VMenuSymbol, null);
        events.onClick = () => {
          isActive.value = false;
          menu == null ? void 0 : menu.closeParents();
        };
      }
      return events;
    });
    const scrimEvents = require$$0.computed(() => {
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
    require$$0.watch(isTop, (val) => {
      if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))) {
        isActive.value = false;
      }
    });
    require$$0.watch(isActive, (val) => {
      if (!val) {
        setTimeout(() => {
          cursorTarget.value = void 0;
        });
      }
    }, {
      flush: "post"
    });
    const activatorRef = require$$0.ref();
    require$$0.watchEffect(() => {
      if (!activatorRef.value)
        return;
      require$$0.nextTick(() => {
        activatorEl.value = refElement(activatorRef.value);
      });
    });
    const targetRef = require$$0.ref();
    const target = require$$0.computed(() => {
      if (props.target === "cursor" && cursorTarget.value)
        return cursorTarget.value;
      if (targetRef.value)
        return refElement(targetRef.value);
      return getTarget(props.target, vm) || activatorEl.value;
    });
    const targetEl = require$$0.computed(() => {
      return Array.isArray(target.value) ? void 0 : target.value;
    });
    let scope;
    require$$0.watch(() => !!props.activator, (val) => {
      if (val && IN_BROWSER) {
        scope = require$$0.effectScope();
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
    require$$0.onScopeDispose(() => {
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
    require$$0.watch(() => props.activator, (val, oldVal) => {
      if (oldVal && val !== oldVal) {
        const activator = getActivator(oldVal);
        activator && unbindActivatorProps(activator);
      }
      if (val) {
        require$$0.nextTick(() => bindActivatorProps());
      }
    }, {
      immediate: true
    });
    require$$0.watch(() => props.activatorProps, () => {
      bindActivatorProps();
    });
    require$$0.onScopeDispose(() => {
      unbindActivatorProps();
    });
    function bindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
      if (!el)
        return;
      bindProps(el, require$$0.mergeProps(activatorEvents.value, _props));
    }
    function unbindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
      if (!el)
        return;
      unbindProps(el, require$$0.mergeProps(activatorEvents.value, _props));
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
      return require$$0.shallowRef(false);
    const {
      ssr
    } = useDisplay();
    if (ssr) {
      const isMounted = require$$0.shallowRef(false);
      require$$0.onMounted(() => {
        isMounted.value = true;
      });
      return isMounted;
    } else {
      return require$$0.shallowRef(true);
    }
  }
  const makeLazyProps = propsFactory({
    eager: Boolean
  }, "lazy");
  function useLazy(props, active) {
    const isBooted = require$$0.shallowRef(false);
    const hasContent = require$$0.computed(() => isBooted.value || props.eager || active.value);
    require$$0.watch(active, () => isBooted.value = true);
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
  const globalStack = require$$0.reactive([]);
  function useStack(isActive, zIndex, disableGlobalStack) {
    const vm = getCurrentInstance("useStack");
    const createStackEntry = !disableGlobalStack;
    const parent = require$$0.inject(StackSymbol, void 0);
    const stack = require$$0.reactive({
      activeChildren: /* @__PURE__ */ new Set()
    });
    require$$0.provide(StackSymbol, stack);
    const _zIndex = require$$0.shallowRef(+zIndex.value);
    useToggleScope(isActive, () => {
      var _a;
      const lastZIndex = (_a = globalStack.at(-1)) == null ? void 0 : _a[1];
      _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
      if (createStackEntry) {
        globalStack.push([vm.uid, _zIndex.value]);
      }
      parent == null ? void 0 : parent.activeChildren.add(vm.uid);
      require$$0.onScopeDispose(() => {
        if (createStackEntry) {
          const idx = require$$0.toRaw(globalStack).findIndex((v) => v[0] === vm.uid);
          globalStack.splice(idx, 1);
        }
        parent == null ? void 0 : parent.activeChildren.delete(vm.uid);
      });
    });
    const globalTop = require$$0.shallowRef(true);
    if (createStackEntry) {
      require$$0.watchEffect(() => {
        var _a;
        const _isTop = ((_a = globalStack.at(-1)) == null ? void 0 : _a[0]) === vm.uid;
        setTimeout(() => globalTop.value = _isTop);
      });
    }
    const localTop = require$$0.computed(() => !stack.activeChildren.size);
    return {
      globalTop: require$$0.readonly(globalTop),
      localTop,
      stackStyles: require$$0.computed(() => ({
        zIndex: _zIndex.value
      }))
    };
  }
  function useTeleport(target) {
    const teleportTarget = require$$0.computed(() => {
      const _target = target.value;
      if (_target === true || !IN_BROWSER)
        return void 0;
      const targetElement = _target === false ? document.body : typeof _target === "string" ? document.querySelector(_target) : _target;
      if (targetElement == null) {
        require$$0.warn(`Unable to locate target ${_target}`);
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
    return require$$0.createVNode(require$$0.Transition, {
      "name": "fade-transition",
      "appear": true
    }, {
      default: () => [props.modelValue && require$$0.createVNode("div", require$$0.mergeProps({
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
      const isActive = require$$0.computed({
        get: () => model.value,
        set: (v) => {
          if (!(v && props.disabled))
            model.value = v;
        }
      });
      const {
        teleportTarget
      } = useTeleport(require$$0.computed(() => props.attach || props.contained));
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
      const scrimColor = useBackgroundColor(require$$0.computed(() => {
        return typeof props.scrim === "string" ? props.scrim : null;
      }));
      const {
        globalTop,
        localTop,
        stackStyles
      } = useStack(isActive, require$$0.toRef(props, "zIndex"), props._disableGlobalStack);
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
      require$$0.watch(() => props.disabled, (v) => {
        if (v)
          isActive.value = false;
      });
      const root = require$$0.ref();
      const contentEl = require$$0.ref();
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
      IN_BROWSER && require$$0.watch(isActive, (val) => {
        if (val) {
          window.addEventListener("keydown", onKeydown);
        } else {
          window.removeEventListener("keydown", onKeydown);
        }
      }, {
        immediate: true
      });
      require$$0.onBeforeUnmount(() => {
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
      const top = require$$0.ref();
      require$$0.watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
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
        return require$$0.createVNode(require$$0.Fragment, null, [(_a = slots.activator) == null ? void 0 : _a.call(slots, {
          isActive: isActive.value,
          props: require$$0.mergeProps({
            ref: activatorRef,
            targetRef
          }, activatorEvents.value, props.activatorProps)
        }), isMounted.value && hasContent.value && require$$0.createVNode(require$$0.Teleport, {
          "disabled": !teleportTarget.value,
          "to": teleportTarget.value
        }, {
          default: () => [require$$0.createVNode("div", require$$0.mergeProps({
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
          }, scopeId, attrs), [require$$0.createVNode(Scrim, require$$0.mergeProps({
            "color": scrimColor,
            "modelValue": isActive.value && !!props.scrim
          }, scrimEvents.value), null), require$$0.createVNode(MaybeTransition, {
            "appear": true,
            "persisted": true,
            "transition": props.transition,
            "target": target.value,
            "onAfterLeave": onAfterLeave
          }, {
            default: () => {
              var _a2;
              return [require$$0.withDirectives(require$$0.createVNode("div", require$$0.mergeProps({
                "ref": contentEl,
                "class": ["v-overlay__content", props.contentClass],
                "style": [dimensionStyles.value, contentStyles.value]
              }, contentEvents.value, props.contentProps), [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
                isActive
              })]), [[require$$0.vShow, isActive.value], [require$$0.resolveDirective("click-outside"), {
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
      const overlay = require$$0.ref();
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
        require$$0.watch(() => isActive.value && props.retainFocus, (val) => {
          val ? document.addEventListener("focusin", onFocusin) : document.removeEventListener("focusin", onFocusin);
        }, {
          immediate: true
        });
      }
      require$$0.watch(isActive, async (val) => {
        var _a, _b;
        await require$$0.nextTick();
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
      const activatorProps = require$$0.computed(() => require$$0.mergeProps({
        "aria-haspopup": "dialog",
        "aria-expanded": String(isActive.value)
      }, props.activatorProps));
      useRender(() => {
        const overlayProps = VOverlay.filterProps(props);
        return require$$0.createVNode(VOverlay, require$$0.mergeProps({
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
            return require$$0.createVNode(VDefaultsProvider, {
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
      const counter = require$$0.computed(() => {
        return props.max ? `${props.value} / ${props.max}` : String(props.value);
      });
      useRender(() => require$$0.createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [require$$0.withDirectives(require$$0.createVNode("div", {
          "class": ["v-counter", props.class],
          "style": props.style
        }, [slots.default ? slots.default({
          counter: counter.value,
          max: props.max,
          value: props.value
        }) : counter.value]), [[require$$0.vShow, props.active]])]
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
        return require$$0.createVNode("label", {
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
      useRender(() => require$$0.createVNode(VLabel, {
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
      return require$$0.createVNode(VIcon, {
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
    const focusClasses = require$$0.computed(() => {
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
      const isActive = require$$0.computed(() => props.dirty || props.active);
      const hasLabel = require$$0.computed(() => !props.singleLine && !!(props.label || slots.label));
      const uid = getUid();
      const id = require$$0.computed(() => props.id || `input-${uid}`);
      const messagesId = require$$0.computed(() => `${id.value}-messages`);
      const labelRef = require$$0.ref();
      const floatingLabelRef = require$$0.ref();
      const controlRef = require$$0.ref();
      const isPlainOrUnderlined = require$$0.computed(() => ["plain", "underlined"].includes(props.variant));
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(require$$0.toRef(props, "bgColor"));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(require$$0.computed(() => {
        return props.error || props.disabled ? void 0 : isActive.value && isFocused.value ? props.color : props.baseColor;
      }));
      require$$0.watch(isActive, (val) => {
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
      const slotProps = require$$0.computed(() => ({
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
        return require$$0.createVNode("div", require$$0.mergeProps({
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
        }, attrs), [require$$0.createVNode("div", {
          "class": "v-field__overlay"
        }, null), require$$0.createVNode(LoaderSlot, {
          "name": "v-field",
          "active": !!props.loading,
          "color": props.error ? "error" : typeof props.loading === "string" ? props.loading : props.color
        }, {
          default: slots.loader
        }), hasPrepend && require$$0.createVNode("div", {
          "key": "prepend",
          "class": "v-field__prepend-inner"
        }, [props.prependInnerIcon && require$$0.createVNode(InputIcon, {
          "key": "prepend-icon",
          "name": "prependInner"
        }, null), (_a = slots["prepend-inner"]) == null ? void 0 : _a.call(slots, slotProps.value)]), require$$0.createVNode("div", {
          "class": "v-field__field",
          "data-no-activator": ""
        }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(props.variant) && hasLabel.value && require$$0.createVNode(VFieldLabel, {
          "key": "floating-label",
          "ref": floatingLabelRef,
          "class": [textColorClasses.value],
          "floating": true,
          "for": id.value,
          "style": textColorStyles.value
        }, {
          default: () => [label()]
        }), require$$0.createVNode(VFieldLabel, {
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
        })]), hasClear && require$$0.createVNode(VExpandXTransition, {
          "key": "clear"
        }, {
          default: () => [require$$0.withDirectives(require$$0.createVNode("div", {
            "class": "v-field__clearable",
            "onMousedown": (e) => {
              e.preventDefault();
              e.stopPropagation();
            }
          }, [slots.clear ? slots.clear() : require$$0.createVNode(InputIcon, {
            "name": "clear"
          }, null)]), [[require$$0.vShow, props.dirty]])]
        }), hasAppend && require$$0.createVNode("div", {
          "key": "append",
          "class": "v-field__append-inner"
        }, [(_c = slots["append-inner"]) == null ? void 0 : _c.call(slots, slotProps.value), props.appendInnerIcon && require$$0.createVNode(InputIcon, {
          "key": "append-icon",
          "name": "appendInner"
        }, null)]), require$$0.createVNode("div", {
          "class": ["v-field__outline", textColorClasses.value],
          "style": textColorStyles.value
        }, [isOutlined && require$$0.createVNode(require$$0.Fragment, null, [require$$0.createVNode("div", {
          "class": "v-field__outline__start"
        }, null), hasLabel.value && require$$0.createVNode("div", {
          "class": "v-field__outline__notch"
        }, [require$$0.createVNode(VFieldLabel, {
          "ref": floatingLabelRef,
          "floating": true,
          "for": id.value
        }, {
          default: () => [label()]
        })]), require$$0.createVNode("div", {
          "class": "v-field__outline__end"
        }, null)]), isPlainOrUnderlined.value && hasLabel.value && require$$0.createVNode(VFieldLabel, {
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
      const messages = require$$0.computed(() => wrapInArray(props.messages));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(require$$0.computed(() => props.color));
      useRender(() => require$$0.createVNode(MaybeTransition, {
        "transition": props.transition,
        "tag": "div",
        "class": ["v-messages", textColorClasses.value, props.class],
        "style": [textColorStyles.value, props.style],
        "role": "alert",
        "aria-live": "polite"
      }, {
        default: () => [props.active && messages.value.map((message2, i) => require$$0.createVNode("div", {
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
    return require$$0.inject(FormKey, null);
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
    const validationModel = require$$0.computed(() => props.validationValue === void 0 ? model.value : props.validationValue);
    const form = useForm();
    const internalErrorMessages = require$$0.ref([]);
    const isPristine = require$$0.shallowRef(true);
    const isDirty = require$$0.computed(() => !!(wrapInArray(model.value === "" ? null : model.value).length || wrapInArray(validationModel.value === "" ? null : validationModel.value).length));
    const isDisabled = require$$0.computed(() => !!(props.disabled ?? (form == null ? void 0 : form.isDisabled.value)));
    const isReadonly = require$$0.computed(() => !!(props.readonly ?? (form == null ? void 0 : form.isReadonly.value)));
    const errorMessages = require$$0.computed(() => {
      var _a;
      return ((_a = props.errorMessages) == null ? void 0 : _a.length) ? wrapInArray(props.errorMessages).concat(internalErrorMessages.value).slice(0, Math.max(0, +props.maxErrors)) : internalErrorMessages.value;
    });
    const validateOn = require$$0.computed(() => {
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
    const isValid2 = require$$0.computed(() => {
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
    const isValidating = require$$0.shallowRef(false);
    const validationClasses = require$$0.computed(() => {
      return {
        [`${name}--error`]: isValid2.value === false,
        [`${name}--dirty`]: isDirty.value,
        [`${name}--disabled`]: isDisabled.value,
        [`${name}--readonly`]: isReadonly.value
      };
    });
    const uid = require$$0.computed(() => props.name ?? require$$0.unref(id));
    require$$0.onBeforeMount(() => {
      form == null ? void 0 : form.register({
        id: uid.value,
        validate,
        reset,
        resetValidation
      });
    });
    require$$0.onBeforeUnmount(() => {
      form == null ? void 0 : form.unregister(uid.value);
    });
    require$$0.onMounted(async () => {
      if (!validateOn.value.lazy) {
        await validate(true);
      }
      form == null ? void 0 : form.update(uid.value, isValid2.value, errorMessages.value);
    });
    useToggleScope(() => validateOn.value.input, () => {
      require$$0.watch(validationModel, () => {
        if (validationModel.value != null) {
          validate();
        } else if (props.focused) {
          const unwatch = require$$0.watch(() => props.focused, (val) => {
            if (!val)
              validate();
            unwatch();
          });
        }
      });
    });
    useToggleScope(() => validateOn.value.blur, () => {
      require$$0.watch(() => props.focused, (val) => {
        if (!val)
          validate();
      });
    });
    require$$0.watch([isValid2, errorMessages], () => {
      form == null ? void 0 : form.update(uid.value, isValid2.value, errorMessages.value);
    });
    function reset() {
      model.value = null;
      require$$0.nextTick(resetValidation);
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
      const id = require$$0.computed(() => props.id || `input-${uid}`);
      const messagesId = require$$0.computed(() => `${id.value}-messages`);
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
      const slotProps = require$$0.computed(() => ({
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
      const messages = require$$0.computed(() => {
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
        return require$$0.createVNode("div", {
          "class": ["v-input", `v-input--${props.direction}`, {
            "v-input--center-affix": props.centerAffix,
            "v-input--hide-spin-buttons": props.hideSpinButtons
          }, densityClasses.value, rtlClasses.value, validationClasses.value, props.class],
          "style": props.style
        }, [hasPrepend && require$$0.createVNode("div", {
          "key": "prepend",
          "class": "v-input__prepend"
        }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots, slotProps.value), props.prependIcon && require$$0.createVNode(InputIcon, {
          "key": "prepend-icon",
          "name": "prepend"
        }, null)]), slots.default && require$$0.createVNode("div", {
          "class": "v-input__control"
        }, [(_b = slots.default) == null ? void 0 : _b.call(slots, slotProps.value)]), hasAppend && require$$0.createVNode("div", {
          "key": "append",
          "class": "v-input__append"
        }, [props.appendIcon && require$$0.createVNode(InputIcon, {
          "key": "append-icon",
          "name": "append"
        }, null), (_c = slots.append) == null ? void 0 : _c.call(slots, slotProps.value)]), hasDetails && require$$0.createVNode("div", {
          "class": "v-input__details"
        }, [require$$0.createVNode(VMessages, {
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
      Intersect
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
      const counterValue = require$$0.computed(() => {
        return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : (model.value ?? "").toString().length;
      });
      const max = require$$0.computed(() => {
        if (attrs.maxlength)
          return attrs.maxlength;
        if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
          return void 0;
        return props.counter;
      });
      const isPlainOrUnderlined = require$$0.computed(() => ["plain", "underlined"].includes(props.variant));
      function onIntersect(isIntersecting, entries) {
        var _a, _b;
        if (!props.autofocus || !isIntersecting)
          return;
        (_b = (_a = entries[0].target) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
      }
      const vInputRef = require$$0.ref();
      const vFieldRef = require$$0.ref();
      const inputRef = require$$0.ref();
      const isActive = require$$0.computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
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
        require$$0.nextTick(() => {
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
          require$$0.nextTick(() => {
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
        return require$$0.createVNode(VInput, require$$0.mergeProps({
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
            return require$$0.createVNode(VField, require$$0.mergeProps({
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
                const inputNode = require$$0.withDirectives(require$$0.createVNode("input", require$$0.mergeProps({
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
                }, slotProps, inputAttrs), null), [[require$$0.resolveDirective("intersect"), {
                  handler: onIntersect
                }, null, {
                  once: true
                }]]);
                return require$$0.createVNode(require$$0.Fragment, null, [props.prefix && require$$0.createVNode("span", {
                  "class": "v-text-field__prefix"
                }, [require$$0.createVNode("span", {
                  "class": "v-text-field__prefix__text"
                }, [props.prefix])]), slots.default ? require$$0.createVNode("div", {
                  "class": fieldClass,
                  "data-no-activator": ""
                }, [slots.default(), inputNode]) : require$$0.cloneVNode(inputNode, {
                  class: fieldClass
                }), props.suffix && require$$0.createVNode("span", {
                  "class": "v-text-field__suffix"
                }, [require$$0.createVNode("span", {
                  "class": "v-text-field__suffix__text"
                }, [props.suffix])])]);
              }
            });
          },
          details: hasDetails ? (slotProps) => {
            var _a;
            return require$$0.createVNode(require$$0.Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && require$$0.createVNode(require$$0.Fragment, null, [require$$0.createVNode("span", null, null), require$$0.createVNode(VCounter, {
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
  const _sfc_main$h = /* @__PURE__ */ require$$0.defineComponent({
    __name: "Datepicker",
    props: {
      modelValue: {
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
        default: 380
      },
      dateFormat: {
        type: String,
        default: "yyyy-MM-dd"
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
      hideDetails: {
        type: Boolean
      }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      require$$0.ref(false);
      const date = require$$0.ref();
      const dateTimeFormat = require$$0.computed(() => {
        return props.dateFormat;
      });
      const formattedDatetime = require$$0.computed(() => {
        return date.value ? format(date.value, dateTimeFormat.value) : "";
      });
      const init = () => {
        if (!props.modelValue) {
          return;
        }
        date.value = parse(props.modelValue, dateTimeFormat.value, /* @__PURE__ */ new Date());
      };
      const emit = __emit;
      const okHandler = (isActive) => {
        isActive.value = false;
        if (!date.value) {
          date.value = /* @__PURE__ */ new Date();
        }
        emit("update:modelValue", formattedDatetime.value);
      };
      const clearHandler = (isActive) => {
        isActive.value = false;
        date.value = null;
        emit("update:modelValue", null);
      };
      require$$0.onMounted(() => {
        init();
      });
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createBlock(VDialog, { width: __props.dialogWidth }, {
          activator: require$$0.withCtx(({ isActive, props: activatorProps }) => [
            require$$0.createVNode(VTextField, require$$0.mergeProps(activatorProps, {
              disabled: __props.disabled,
              loading: __props.loading,
              label: __props.label,
              modelValue: formattedDatetime.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formattedDatetime.value = $event),
              "hide-details": __props.hideDetails,
              variant: "underlined",
              readonly: ""
            }), {
              prepend: require$$0.withCtx(() => [
                require$$0.createVNode(VIcon, {
                  icon: "mdi-calendar-edit",
                  color: isActive ? "primary" : "",
                  size: "x-large"
                }, null, 8, ["color"])
              ]),
              loader: require$$0.withCtx(() => [
                require$$0.createVNode(VProgressLinear, {
                  color: "primary",
                  indeterminate: "",
                  absolute: "",
                  height: "2"
                })
              ]),
              _: 2
            }, 1040, ["disabled", "loading", "label", "modelValue", "hide-details"])
          ]),
          default: require$$0.withCtx(({ isActive }) => [
            require$$0.createVNode(VCard, null, {
              default: require$$0.withCtx(() => [
                require$$0.createVNode(VCardText, { class: "px-0 py-0" }, {
                  default: require$$0.withCtx(() => [
                    require$$0.createVNode(VContainer, null, {
                      default: require$$0.withCtx(() => [
                        require$$0.createVNode(VRow, null, {
                          default: require$$0.withCtx(() => [
                            require$$0.createVNode(VCol, {
                              cols: "6",
                              class: "pa-0"
                            }, {
                              default: require$$0.withCtx(() => [
                                require$$0.createVNode(VDatePicker, {
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
                require$$0.createVNode(VCardActions, null, {
                  default: require$$0.withCtx(() => [
                    require$$0.createVNode(VSpacer),
                    require$$0.createVNode(VBtn, {
                      color: "grey lighten-1",
                      variant: "text",
                      onClick: ($event) => clearHandler(isActive)
                    }, {
                      default: require$$0.withCtx(() => [
                        require$$0.createTextVNode(require$$0.toDisplayString(__props.clearText), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    require$$0.createVNode(VBtn, {
                      color: "green darken-1",
                      variant: "text",
                      onClick: ($event) => okHandler(isActive)
                    }, {
                      default: require$$0.withCtx(() => [
                        require$$0.createTextVNode(require$$0.toDisplayString(__props.okText), 1)
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
  const DEFAULT_TIME = "00:00:00";
  const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
  const DEFAULT_TIME_FORMAT = "HH:mm:ss";
  const _sfc_main$g = /* @__PURE__ */ require$$0.defineComponent({
    __name: "Datetimepicker",
    props: {
      modelValue: {
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
    },
    emits: ["update:modelValue", "input"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const props = __props;
      const date = require$$0.ref();
      const time = require$$0.ref(DEFAULT_TIME);
      const timer = require$$0.ref();
      const dateTimeFormat = require$$0.computed(() => {
        return props.dateFormat + " " + props.timeFormat;
      });
      const defaultDateTimeFormat = require$$0.computed(() => {
        return DEFAULT_DATE_FORMAT + " " + DEFAULT_TIME_FORMAT;
      });
      const selectedDatetime = require$$0.computed(() => {
        if (date.value && time.value) {
          let datetimeString = format(date.value, DEFAULT_DATE_FORMAT) + " " + time.value;
          if (time.value.length === 5) {
            datetimeString += ":00";
          }
          return parse(datetimeString, defaultDateTimeFormat.value, /* @__PURE__ */ new Date());
        } else {
          return null;
        }
      });
      const formattedDatetime = require$$0.computed(() => {
        return selectedDatetime.value ? format(selectedDatetime.value, dateTimeFormat.value) : "";
      });
      const init = () => {
        if (!props.modelValue) {
          return;
        }
        let initDateTime = parse(props.modelValue, dateTimeFormat.value, /* @__PURE__ */ new Date());
        date.value = initDateTime;
        time.value = format(initDateTime, DEFAULT_TIME_FORMAT);
      };
      const okHandler = (isActive) => {
        resetPicker(isActive);
        if (!date.value) {
          date.value = /* @__PURE__ */ new Date();
        }
        emit("update:modelValue", formattedDatetime.value);
      };
      const clearHandler = (isActive) => {
        resetPicker(isActive);
        date.value = null;
        emit("update:modelValue", null);
      };
      const resetPicker = (isActive) => {
        isActive.value = false;
        if (timer.value) {
          timer.value.selectingHour = true;
        }
      };
      require$$0.onMounted(() => {
        init();
      });
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createBlock(VDialog, { width: __props.dialogWidth }, {
          activator: require$$0.withCtx(({ isActive, props: activatorProps }) => [
            require$$0.createVNode(VTextField, require$$0.mergeProps(activatorProps, {
              disabled: __props.disabled,
              loading: __props.loading,
              label: __props.label,
              modelValue: formattedDatetime.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formattedDatetime.value = $event),
              "hide-details": __props.hideDetails,
              color: "primary",
              variant: "underlined",
              readonly: ""
            }), {
              prepend: require$$0.withCtx(() => [
                require$$0.createVNode(VIcon, {
                  icon: "mdi-calendar-edit",
                  color: isActive ? "primary" : "",
                  size: "x-large"
                }, null, 8, ["color"])
              ]),
              loader: require$$0.withCtx(() => [
                require$$0.createVNode(VProgressLinear, {
                  color: "primary",
                  indeterminate: "",
                  absolute: "",
                  height: "2"
                })
              ]),
              _: 2
            }, 1040, ["disabled", "loading", "label", "modelValue", "hide-details"])
          ]),
          default: require$$0.withCtx(({ isActive }) => [
            require$$0.createVNode(VCard, null, {
              default: require$$0.withCtx(() => [
                require$$0.createVNode(VCardText, { class: "px-0 py-0" }, {
                  default: require$$0.withCtx(() => [
                    require$$0.createVNode(VContainer, { class: "flex-0-0" }, {
                      default: require$$0.withCtx(() => [
                        require$$0.createVNode(VRow, null, {
                          default: require$$0.withCtx(() => [
                            require$$0.createVNode(VCol, {
                              cols: "6",
                              class: "pa-0"
                            }, {
                              default: require$$0.withCtx(() => [
                                require$$0.createVNode(VDatePicker, {
                                  modelValue: date.value,
                                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => date.value = $event),
                                  "full-width": "",
                                  "no-title": ""
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }),
                            require$$0.createVNode(VCol, {
                              cols: "6",
                              class: "pa-8",
                              "align-self": "center",
                              ref_key: "timer",
                              ref: timer
                            }, {
                              default: require$$0.withCtx(() => [
                                require$$0.withDirectives(require$$0.createElementVNode("input", {
                                  type: "time",
                                  class: "text-h2 timer",
                                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => time.value = $event)
                                }, null, 512), [
                                  [require$$0.vModelText, time.value]
                                ])
                              ]),
                              _: 1
                            }, 512)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                require$$0.createVNode(VCardActions, null, {
                  default: require$$0.withCtx(() => [
                    require$$0.createVNode(VSpacer),
                    require$$0.createVNode(VBtn, {
                      color: "grey lighten-1",
                      variant: "text",
                      onClick: ($event) => clearHandler(isActive)
                    }, {
                      default: require$$0.withCtx(() => [
                        require$$0.createTextVNode(require$$0.toDisplayString(__props.clearText), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    require$$0.createVNode(VBtn, {
                      color: "green darken-1",
                      variant: "text",
                      onClick: ($event) => okHandler(isActive)
                    }, {
                      default: require$$0.withCtx(() => [
                        require$$0.createTextVNode(require$$0.toDisplayString(__props.okText), 1)
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
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    if (n.__esModule)
      return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        if (this instanceof a2) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else
      a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var vuedraggable_umd = { exports: {} };
  /**!
   * Sortable 1.14.0
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   */
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var version = "1.14.0";
  function userAgent(pattern) {
    if (typeof window !== "undefined" && window.navigator) {
      return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
    }
  }
  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
  var captureMode = {
    capture: false,
    passive: false
  };
  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function matches(el, selector) {
    if (!selector)
      return;
    selector[0] === ">" && (selector = selector.substring(1));
    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_) {
        return false;
      }
    }
    return false;
  }
  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }
  function closest(el, selector, ctx, includeCTX) {
    if (el) {
      ctx = ctx || document;
      do {
        if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
          return el;
        }
        if (el === ctx)
          break;
      } while (el = getParentOrHost(el));
    }
    return null;
  }
  var R_SPACE = /\s+/g;
  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? "add" : "remove"](name);
      } else {
        var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
        el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
      }
    }
  }
  function css(el, prop, val) {
    var style = el && el.style;
    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, "");
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }
        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style) && prop.indexOf("webkit") === -1) {
          prop = "-webkit-" + prop;
        }
        style[prop] = val + (typeof val === "string" ? "" : "px");
      }
    }
  }
  function matrix(el, selfOnly) {
    var appliedTransforms = "";
    if (typeof el === "string") {
      appliedTransforms = el;
    } else {
      do {
        var transform2 = css(el, "transform");
        if (transform2 && transform2 !== "none") {
          appliedTransforms = transform2 + " " + appliedTransforms;
        }
      } while (!selfOnly && (el = el.parentNode));
    }
    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    return matrixFn && new matrixFn(appliedTransforms);
  }
  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }
      return list;
    }
    return [];
  }
  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;
    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
    if (!el.getBoundingClientRect && el !== window)
      return;
    var elRect, top, left, bottom, right, height, width;
    if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }
    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
      container = container || el.parentNode;
      if (!IE11OrLess) {
        do {
          if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
            var containerRect = container.getBoundingClientRect();
            top -= containerRect.top + parseInt(css(container, "border-top-width"));
            left -= containerRect.left + parseInt(css(container, "border-left-width"));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          }
        } while (container = container.parentNode);
      }
    }
    if (undoScale && el !== window) {
      var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }
    return {
      top,
      left,
      bottom,
      right,
      width,
      height
    };
  }
  function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
    while (parent) {
      var parentSideVal = getRect(parent)[parentSide], visible = void 0;
      if (parentSide === "top" || parentSide === "left") {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }
      if (!visible)
        return parent;
      if (parent === getWindowScrollingElement())
        break;
      parent = getParentAutoScrollElement(parent, false);
    }
    return false;
  }
  function getChild(el, childNum, options, includeDragEl) {
    var currentChild = 0, i = 0, children = el.children;
    while (i < children.length) {
      if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
        if (currentChild === childNum) {
          return children[i];
        }
        currentChild++;
      }
      i++;
    }
    return null;
  }
  function lastChild(el, selector) {
    var last = el.lastElementChild;
    while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
      last = last.previousElementSibling;
    }
    return last || null;
  }
  function index(el, selector) {
    var index2 = 0;
    if (!el || !el.parentNode) {
      return -1;
    }
    while (el = el.previousElementSibling) {
      if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
        index2++;
      }
    }
    return index2;
  }
  function getRelativeScrollOffset(el) {
    var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
    if (el) {
      do {
        var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }
    return [offsetLeft, offsetTop];
  }
  function indexOfObject(arr, obj) {
    for (var i in arr) {
      if (!arr.hasOwnProperty(i))
        continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i][key])
          return Number(i);
      }
    }
    return -1;
  }
  function getParentAutoScrollElement(el, includeSelf) {
    if (!el || !el.getBoundingClientRect)
      return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;
    do {
      if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
        var elemCSS = css(elem);
        if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
          if (!elem.getBoundingClientRect || elem === document.body)
            return getWindowScrollingElement();
          if (gotSelf || includeSelf)
            return elem;
          gotSelf = true;
        }
      }
    } while (elem = elem.parentNode);
    return getWindowScrollingElement();
  }
  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }
    return dst;
  }
  function isRectEqual(rect1, rect2) {
    return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }
  var _throttleTimeout;
  function throttle(callback, ms) {
    return function() {
      if (!_throttleTimeout) {
        var args = arguments, _this = this;
        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }
        _throttleTimeout = setTimeout(function() {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }
  function cancelThrottle() {
    clearTimeout(_throttleTimeout);
    _throttleTimeout = void 0;
  }
  function scrollBy(el, x, y) {
    el.scrollLeft += x;
    el.scrollTop += y;
  }
  function clone(el) {
    var Polymer = window.Polymer;
    var $ = window.jQuery || window.Zepto;
    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($) {
      return $(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }
  function setRect(el, rect) {
    css(el, "position", "absolute");
    css(el, "top", rect.top);
    css(el, "left", rect.left);
    css(el, "width", rect.width);
    css(el, "height", rect.height);
  }
  function unsetRect(el) {
    css(el, "position", "");
    css(el, "top", "");
    css(el, "left", "");
    css(el, "width", "");
    css(el, "height", "");
  }
  var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
  function AnimationStateManager() {
    var animationStates = [], animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation)
          return;
        var children = [].slice.call(this.el.children);
        children.forEach(function(child) {
          if (css(child, "display") === "none" || child === Sortable.ghost)
            return;
          animationStates.push({
            target: child,
            rect: getRect(child)
          });
          var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);
            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }
          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(indexOfObject(animationStates, {
          target
        }), 1);
      },
      animateAll: function animateAll(callback) {
        var _this = this;
        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === "function")
            callback();
          return;
        }
        var animating = false, animationTime = 0;
        animationStates.forEach(function(state) {
          var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
          if (targetMatrix) {
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }
          target.toRect = toRect;
          if (target.thisAnimationDuration) {
            if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
            (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
              time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
            }
          }
          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;
            if (!time) {
              time = _this.options.animation;
            }
            _this.animate(target, animatingRect, toRect, time);
          }
          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function() {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);
        if (!animating) {
          if (typeof callback === "function")
            callback();
        } else {
          animationCallbackId = setTimeout(function() {
            if (typeof callback === "function")
              callback();
          }, animationTime);
        }
        animationStates = [];
      },
      animate: function animate2(target, currentRect, toRect, duration) {
        if (duration) {
          css(target, "transition", "");
          css(target, "transform", "");
          var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
          this.forRepaintDummy = repaint(target);
          css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
          css(target, "transform", "translate3d(0,0,0)");
          typeof target.animated === "number" && clearTimeout(target.animated);
          target.animated = setTimeout(function() {
            css(target, "transition", "");
            css(target, "transform", "");
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      }
    };
  }
  function repaint(target) {
    return target.offsetWidth;
  }
  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }
  var plugins = [];
  var defaults = {
    initializeByDefault: true
  };
  var PluginManager = {
    mount: function mount(plugin) {
      for (var option in defaults) {
        if (defaults.hasOwnProperty(option) && !(option in plugin)) {
          plugin[option] = defaults[option];
        }
      }
      plugins.forEach(function(p) {
        if (p.pluginName === plugin.pluginName) {
          throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
        }
      });
      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent2(eventName2, sortable, evt) {
      var _this = this;
      this.eventCanceled = false;
      evt.cancel = function() {
        _this.eventCanceled = true;
      };
      var eventNameGlobal = eventName2 + "Global";
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
            sortable
          }, evt));
        }
        if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName2]) {
          sortable[plugin.pluginName][eventName2](_objectSpread2({
            sortable
          }, evt));
        }
      });
    },
    initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
      plugins.forEach(function(plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault)
          return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized;
        _extends(defaults2, initialized.defaults);
      });
      for (var option in sortable.options) {
        if (!sortable.options.hasOwnProperty(option))
          continue;
        var modified = this.modifyOption(sortable, option, sortable.options[option]);
        if (typeof modified !== "undefined") {
          sortable.options[option] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function(plugin) {
        if (typeof plugin.eventProperties !== "function")
          return;
        _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
          modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
        }
      });
      return modifiedValue;
    }
  };
  function dispatchEvent(_ref) {
    var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || rootEl2 && rootEl2[expando];
    if (!sortable)
      return;
    var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent(name, true, true);
    }
    evt.to = toEl || rootEl2;
    evt.from = fromEl || rootEl2;
    evt.item = targetEl || rootEl2;
    evt.clone = cloneEl2;
    evt.oldIndex = oldIndex2;
    evt.newIndex = newIndex2;
    evt.oldDraggableIndex = oldDraggableIndex2;
    evt.newDraggableIndex = newDraggableIndex2;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
    var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
    for (var option in allEventProperties) {
      evt[option] = allEventProperties[option];
    }
    if (rootEl2) {
      rootEl2.dispatchEvent(evt);
    }
    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }
  var _excluded = ["evt"];
  var pluginEvent = function pluginEvent2(eventName2, sortable) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
    PluginManager.pluginEvent.bind(Sortable)(eventName2, sortable, _objectSpread2({
      dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      dragStarted: moved,
      putSortable,
      activeSortable: Sortable.active,
      originalEvent,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function cloneNowHidden() {
        cloneHidden = true;
      },
      cloneNowShown: function cloneNowShown() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function dispatchSortableEvent(name) {
        _dispatchEvent({
          sortable,
          name,
          originalEvent
        });
      }
    }, data));
  };
  function _dispatchEvent(info) {
    dispatchEvent(_objectSpread2({
      putSortable,
      cloneEl,
      targetEl: dragEl,
      rootEl,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex
    }, info));
  }
  var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [];
  var documentExists = typeof document !== "undefined", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
    if (!documentExists)
      return;
    if (IE11OrLess) {
      return false;
    }
    var el = document.createElement("x");
    el.style.cssText = "pointer-events:auto";
    return el.style.pointerEvents === "auto";
  }(), _detectDirection = function _detectDirection2(el, options) {
    var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
    if (elCSS.display === "flex") {
      return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
    }
    if (elCSS.display === "grid") {
      return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    }
    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
      var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
      return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
    }
    return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
  }, _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  }, _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
    var ret;
    sortables.some(function(sortable) {
      var threshold = sortable[expando].options.emptyInsertThreshold;
      if (!threshold || lastChild(sortable))
        return;
      var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
      if (insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  }, _prepareGroup = function _prepareGroup2(options) {
    function toFn(value, pull) {
      return function(to, from, dragEl2, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
        if (value == null && (pull || sameGroup)) {
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === "clone") {
          return value;
        } else if (typeof value === "function") {
          return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }
    var group = {};
    var originalGroup = options.group;
    if (!originalGroup || _typeof(originalGroup) != "object") {
      originalGroup = {
        name: originalGroup
      };
    }
    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  }, _hideGhostForTarget = function _hideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "none");
    }
  }, _unhideGhostForTarget = function _unhideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "");
    }
  };
  if (documentExists) {
    document.addEventListener("click", function(evt) {
      if (ignoreNextClick) {
        evt.preventDefault();
        evt.stopPropagation && evt.stopPropagation();
        evt.stopImmediatePropagation && evt.stopImmediatePropagation();
        ignoreNextClick = false;
        return false;
      }
    }, true);
  }
  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;
      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
      if (nearest) {
        var event = {};
        for (var i in evt) {
          if (evt.hasOwnProperty(i)) {
            event[i] = evt[i];
          }
        }
        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;
        nearest[expando]._onDragOver(event);
      }
    }
  };
  var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
    }
    this.el = el;
    this.options = options = _extends({}, options);
    el[expando] = this;
    var defaults2 = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
      swapThreshold: 1,
      // percentage; 0 <= x <= 1
      invertSwap: false,
      // invert always
      invertedSwapThreshold: null,
      // will be set to same as swapThreshold if default
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl2) {
        dataTransfer.setData("Text", dragEl2.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: "data-id",
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && !Safari,
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, el, defaults2);
    for (var name in defaults2) {
      !(name in options) && (options[name] = defaults2[name]);
    }
    _prepareGroup(options);
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
    this.nativeDraggable = options.forceFallback ? false : supportDraggable;
    if (this.nativeDraggable) {
      this.options.touchStartThreshold = 1;
    }
    if (options.supportPointer) {
      on(el, "pointerdown", this._onTapStart);
    } else {
      on(el, "mousedown", this._onTapStart);
      on(el, "touchstart", this._onTapStart);
    }
    if (this.nativeDraggable) {
      on(el, "dragover", this);
      on(el, "dragenter", this);
    }
    sortables.push(this.el);
    options.store && options.store.get && this.sort(options.store.get(this) || []);
    _extends(this, AnimationStateManager());
  }
  Sortable.prototype = /** @lends Sortable.prototype */
  {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
    },
    _onTapStart: function _onTapStart(evt) {
      if (!evt.cancelable)
        return;
      var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
      _saveInputCheckedState(el);
      if (dragEl) {
        return;
      }
      if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
        return;
      }
      if (originalTarget.isContentEditable) {
        return;
      }
      if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
        return;
      }
      target = closest(target, options.draggable, el, false);
      if (target && target.animated) {
        return;
      }
      if (lastDownEl === target) {
        return;
      }
      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable);
      if (typeof filter === "function") {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: "filter",
            targetEl: target,
            toEl: el,
            fromEl: el
          });
          pluginEvent("filter", _this, {
            evt
          });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      } else if (filter) {
        filter = filter.split(",").some(function(criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);
          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: "filter",
              targetEl: target,
              fromEl: el,
              toEl: el
            });
            pluginEvent("filter", _this, {
              evt
            });
            return true;
          }
        });
        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      }
      if (options.handle && !closest(originalTarget, options.handle, el, false)) {
        return;
      }
      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(evt, touch, target) {
      var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style["will-change"] = "all";
        dragStartFn = function dragStartFn2() {
          pluginEvent("delayEnded", _this, {
            evt
          });
          if (Sortable.eventCanceled) {
            _this._onDrop();
            return;
          }
          _this._disableDelayedDragEvents();
          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          }
          _this._triggerDragStart(evt, touch);
          _dispatchEvent({
            sortable: _this,
            name: "choose",
            originalEvent: evt
          });
          toggleClass(dragEl, options.chosenClass, true);
        };
        options.ignore.split(",").forEach(function(criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mouseup", _this._onDrop);
        on(ownerDocument, "touchend", _this._onDrop);
        on(ownerDocument, "touchcancel", _this._onDrop);
        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }
        pluginEvent("delayStart", this, {
          evt
        });
        if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();
            return;
          }
          on(ownerDocument, "mouseup", _this._disableDelayedDrag);
          on(ownerDocument, "touchend", _this._disableDelayedDrag);
          on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
          on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
          on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
          options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
      var touch = e.touches ? e.touches[0] : e;
      if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);
      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._disableDelayedDrag);
      off(ownerDocument, "touchend", this._disableDelayedDrag);
      off(ownerDocument, "touchcancel", this._disableDelayedDrag);
      off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(evt, touch) {
      touch = touch || evt.pointerType == "touch" && evt;
      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._onTouchMove);
        } else if (touch) {
          on(document, "touchmove", this._onTouchMove);
        } else {
          on(document, "mousemove", this._onTouchMove);
        }
      } else {
        on(dragEl, "dragend", this);
        on(rootEl, "dragstart", this._onDragStart);
      }
      try {
        if (document.selection) {
          _nextTick(function() {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {
      }
    },
    _dragStarted: function _dragStarted(fallback, evt) {
      awaitingDragStarted = false;
      if (rootEl && dragEl) {
        pluginEvent("dragStarted", this, {
          evt
        });
        if (this.nativeDraggable) {
          on(document, "dragover", _checkOutsideTargetEl);
        }
        var options = this.options;
        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost();
        _dispatchEvent({
          sortable: this,
          name: "start",
          originalEvent: evt
        });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;
        _hideGhostForTarget();
        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        var parent = target;
        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
          if (target === parent)
            break;
          parent = target;
        }
        dragEl.parentNode[expando]._isOutsideThisEl(target);
        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target,
                rootEl: parent
              });
              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }
            target = parent;
          } while (parent = parent.parentNode);
        }
        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(evt) {
      if (tapEvt) {
        var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
        if (!Sortable.active && !awaitingDragStarted) {
          if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }
          this._onDragStart(evt, true);
        }
        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: dx,
              f: dy
            };
          }
          var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
          css(ghostEl, "webkitTransform", cssMatrix);
          css(ghostEl, "mozTransform", cssMatrix);
          css(ghostEl, "msTransform", cssMatrix);
          css(ghostEl, "transform", cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }
        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
        if (PositionGhostAbsolutely) {
          ghostRelativeParent = container;
          while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }
          if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
            if (ghostRelativeParent === document)
              ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }
          ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }
        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css(ghostEl, "transition", "");
        css(ghostEl, "transform", "");
        css(ghostEl, "box-sizing", "border-box");
        css(ghostEl, "margin", 0);
        css(ghostEl, "top", rect.top);
        css(ghostEl, "left", rect.left);
        css(ghostEl, "width", rect.width);
        css(ghostEl, "height", rect.height);
        css(ghostEl, "opacity", "0.8");
        css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
        css(ghostEl, "zIndex", "100000");
        css(ghostEl, "pointerEvents", "none");
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl);
        css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
      }
    },
    _onDragStart: function _onDragStart(evt, fallback) {
      var _this = this;
      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent("dragStart", this, {
        evt
      });
      if (Sortable.eventCanceled) {
        this._onDrop();
        return;
      }
      pluginEvent("setupClone", this);
      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.draggable = false;
        cloneEl.style["will-change"] = "";
        this._hideClone();
        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      }
      _this.cloneId = _nextTick(function() {
        pluginEvent("clone", _this);
        if (Sortable.eventCanceled)
          return;
        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }
        _this._hideClone();
        _dispatchEvent({
          sortable: _this,
          name: "clone"
        });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true);
      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        off(document, "mouseup", _this._onDrop);
        off(document, "touchend", _this._onDrop);
        off(document, "touchcancel", _this._onDrop);
        if (dataTransfer) {
          dataTransfer.effectAllowed = "move";
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }
        on(document, "drop", _this);
        css(dragEl, "transform", "translateZ(0)");
      }
      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
      on(document, "selectstart", _this);
      moved = true;
      if (Safari) {
        css(document.body, "user-select", "none");
      }
    },
    // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function _onDragOver(evt) {
      var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
      if (_silent)
        return;
      function dragOverEvent(name, extra) {
        pluginEvent(name, _this, _objectSpread2({
          evt,
          isOwner,
          axis: vertical ? "vertical" : "horizontal",
          revert,
          dragRect,
          targetRect,
          canSort,
          fromSortable,
          target,
          completed,
          onMove: function onMove(target2, after2) {
            return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
          },
          changed
        }, extra));
      }
      function capture() {
        dragOverEvent("dragOverAnimationCapture");
        _this.captureAnimationState();
        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      }
      function completed(insertion) {
        dragOverEvent("dragOverCompleted", {
          insertion
        });
        if (insertion) {
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }
          if (_this !== fromSortable) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
            toggleClass(dragEl, options.ghostClass, true);
          }
          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          }
          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }
          _this.animateAll(function() {
            dragOverEvent("dragOverAnimationComplete");
            _this._ignoreWhileAnimating = null;
          });
          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        }
        if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
          lastTarget = null;
        }
        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
          !insertion && nearestEmptyInsertDetectEvent(evt);
        }
        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return completedFired = true;
      }
      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);
        _dispatchEvent({
          sortable: _this,
          name: "change",
          toEl: el,
          newIndex,
          newDraggableIndex,
          originalEvent: evt
        });
      }
      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }
      target = closest(target, options.draggable, el, true);
      dragOverEvent("dragOver");
      if (Sortable.eventCanceled)
        return completedFired;
      if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
        return completed(false);
      }
      ignoreNextClick = false;
      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
        vertical = this._getDirection(evt, target) === "vertical";
        dragRect = getRect(dragEl);
        dragOverEvent("dragOverValid");
        if (Sortable.eventCanceled)
          return completedFired;
        if (revert) {
          parentEl = rootEl;
          capture();
          this._hideClone();
          dragOverEvent("revert");
          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }
          return completed(true);
        }
        var elLastChild = lastChild(el, options.draggable);
        if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
          if (elLastChild === dragEl) {
            return completed(false);
          }
          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }
          if (target) {
            targetRect = getRect(target);
          }
          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
            capture();
            el.appendChild(dragEl);
            parentEl = el;
            changed();
            return completed(true);
          }
        } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
          var firstChild = getChild(el, 0, options, true);
          if (firstChild === dragEl) {
            return completed(false);
          }
          target = firstChild;
          targetRect = getRect(target);
          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
            capture();
            el.insertBefore(dragEl, firstChild);
            parentEl = el;
            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
          }
          direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
          var sibling;
          if (direction !== 0) {
            var dragIndex = index(dragEl);
            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
          }
          if (direction === 0 || sibling === target) {
            return completed(false);
          }
          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling, after = false;
          after = direction === 1;
          var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }
            _silent = true;
            setTimeout(_unsilent, 30);
            capture();
            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
            }
            if (scrolledPastTop) {
              scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
            }
            parentEl = dragEl.parentNode;
            if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
              targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
            }
            changed();
            return completed(true);
          }
        }
        if (el.contains(dragEl)) {
          return completed(false);
        }
      }
      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, "mousemove", this._onTouchMove);
      off(document, "touchmove", this._onTouchMove);
      off(document, "pointermove", this._onTouchMove);
      off(document, "dragover", nearestEmptyInsertDetectEvent);
      off(document, "mousemove", nearestEmptyInsertDetectEvent);
      off(document, "touchmove", nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._onDrop);
      off(ownerDocument, "touchend", this._onDrop);
      off(ownerDocument, "pointerup", this._onDrop);
      off(ownerDocument, "touchcancel", this._onDrop);
      off(document, "selectstart", this);
    },
    _onDrop: function _onDrop(evt) {
      var el = this.el, options = this.options;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent("drop", this, {
        evt
      });
      parentEl = dragEl && dragEl.parentNode;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      if (Sortable.eventCanceled) {
        this._nulling();
        return;
      }
      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);
      _cancelNextTick(this.cloneId);
      _cancelNextTick(this._dragStartId);
      if (this.nativeDraggable) {
        off(document, "drop", this);
        off(el, "dragstart", this._onDragStart);
      }
      this._offMoveEvents();
      this._offUpEvents();
      if (Safari) {
        css(document.body, "user-select", "");
      }
      css(dragEl, "transform", "");
      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }
        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }
        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, "dragend", this);
          }
          _disableDraggable(dragEl);
          dragEl.style["will-change"] = "";
          if (moved && !awaitingDragStarted) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
          }
          toggleClass(dragEl, this.options.chosenClass, false);
          _dispatchEvent({
            sortable: this,
            name: "unchoose",
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt
          });
          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              _dispatchEvent({
                rootEl: parentEl,
                name: "add",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "remove",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                rootEl: parentEl,
                name: "sort",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                _dispatchEvent({
                  sortable: this,
                  name: "update",
                  toEl: parentEl,
                  originalEvent: evt
                });
                _dispatchEvent({
                  sortable: this,
                  name: "sort",
                  toEl: parentEl,
                  originalEvent: evt
                });
              }
            }
          }
          if (Sortable.active) {
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }
            _dispatchEvent({
              sortable: this,
              name: "end",
              toEl: parentEl,
              originalEvent: evt
            });
            this.save();
          }
        }
      }
      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent("nulling", this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function(el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(evt) {
      switch (evt.type) {
        case "drop":
        case "dragend":
          this._onDrop(evt);
          break;
        case "dragenter":
        case "dragover":
          if (dragEl) {
            this._onDragOver(evt);
            _globalDragOver(evt);
          }
          break;
        case "selectstart":
          evt.preventDefault();
          break;
      }
    },
    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */
    toArray: function toArray() {
      var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
      for (; i < n; i++) {
        el = children[i];
        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }
      return order;
    },
    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */
    sort: function sort(order, useAnimation) {
      var items = {}, rootEl2 = this.el;
      this.toArray().forEach(function(id, i) {
        var el = rootEl2.children[i];
        if (closest(el, this.options.draggable, rootEl2, false)) {
          items[id] = el;
        }
      }, this);
      useAnimation && this.captureAnimationState();
      order.forEach(function(id) {
        if (items[id]) {
          rootEl2.removeChild(items[id]);
          rootEl2.appendChild(items[id]);
        }
      });
      useAnimation && this.animateAll();
    },
    /**
     * Save the current sorting
     */
    save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },
    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */
    closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },
    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */
    option: function option(name, value) {
      var options = this.options;
      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);
        if (typeof modifiedValue !== "undefined") {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }
        if (name === "group") {
          _prepareGroup(options);
        }
      }
    },
    /**
     * Destroy
     */
    destroy: function destroy() {
      pluginEvent("destroy", this);
      var el = this.el;
      el[expando] = null;
      off(el, "mousedown", this._onTapStart);
      off(el, "touchstart", this._onTapStart);
      off(el, "pointerdown", this._onTapStart);
      if (this.nativeDraggable) {
        off(el, "dragover", this);
        off(el, "dragenter", this);
      }
      Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
        el2.removeAttribute("draggable");
      });
      this._onDrop();
      this._disableDelayedDragEvents();
      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent("hideClone", this);
        if (Sortable.eventCanceled)
          return;
        css(cloneEl, "display", "none");
        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }
        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable2) {
      if (putSortable2.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (cloneHidden) {
        pluginEvent("showClone", this);
        if (Sortable.eventCanceled)
          return;
        if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }
        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }
        css(cloneEl, "display", "");
        cloneHidden = false;
      }
    }
  };
  function _globalDragOver(evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = "move";
    }
    evt.cancelable && evt.preventDefault();
  }
  function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
    var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent("move", {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent("move", true, true);
    }
    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl2;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);
    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }
    return retVal;
  }
  function _disableDraggable(el) {
    el.draggable = false;
  }
  function _unsilent() {
    _silent = false;
  }
  function _ghostIsFirst(evt, vertical, sortable) {
    var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
    var spacer = 10;
    return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
  }
  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }
  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
    if (!invertSwap) {
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
          pastFirstInvertThresh = true;
        }
        if (!pastFirstInvertThresh) {
          if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
          return _getInsertDirection(target);
        }
      }
    }
    invert = invert || invertSwap;
    if (invert) {
      if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }
    return 0;
  }
  function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
    while (i--) {
      sum += str.charCodeAt(i);
    }
    return sum.toString(36);
  }
  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName("input");
    var idx = inputs.length;
    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }
  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }
  function _cancelNextTick(id) {
    return clearTimeout(id);
  }
  if (documentExists) {
    on(document, "touchmove", function(evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  }
  Sortable.utils = {
    on,
    off,
    css,
    find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend,
    throttle,
    closest,
    toggleClass,
    clone,
    index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild
  };
  Sortable.get = function(element) {
    return element[expando];
  };
  Sortable.mount = function() {
    for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins2[_key] = arguments[_key];
    }
    if (plugins2[0].constructor === Array)
      plugins2 = plugins2[0];
    plugins2.forEach(function(plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
      }
      if (plugin.utils)
        Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  Sortable.create = function(el, options) {
    return new Sortable(el, options);
  };
  Sortable.version = version;
  var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
  function AutoScrollPlugin() {
    function AutoScroll() {
      this.defaults = {
        scroll: true,
        forceAutoScrollFallback: false,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      };
      for (var fn in this) {
        if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
          this[fn] = this[fn].bind(this);
        }
      }
    }
    AutoScroll.prototype = {
      dragStarted: function dragStarted2(_ref) {
        var originalEvent = _ref.originalEvent;
        if (this.sortable.nativeDraggable) {
          on(document, "dragover", this._handleAutoScroll);
        } else {
          if (this.options.supportPointer) {
            on(document, "pointermove", this._handleFallbackAutoScroll);
          } else if (originalEvent.touches) {
            on(document, "touchmove", this._handleFallbackAutoScroll);
          } else {
            on(document, "mousemove", this._handleFallbackAutoScroll);
          }
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref2) {
        var originalEvent = _ref2.originalEvent;
        if (!this.options.dragOverBubble && !originalEvent.rootEl) {
          this._handleAutoScroll(originalEvent);
        }
      },
      drop: function drop2() {
        if (this.sortable.nativeDraggable) {
          off(document, "dragover", this._handleAutoScroll);
        } else {
          off(document, "pointermove", this._handleFallbackAutoScroll);
          off(document, "touchmove", this._handleFallbackAutoScroll);
          off(document, "mousemove", this._handleFallbackAutoScroll);
        }
        clearPointerElemChangedInterval();
        clearAutoScrolls();
        cancelThrottle();
      },
      nulling: function nulling() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
        autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
        this._handleAutoScroll(evt, true);
      },
      _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
        var _this = this;
        var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
        touchEvt$1 = evt;
        if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
          autoScroll(evt, this.options, elem, fallback);
          var ogElemScroller = getParentAutoScrollElement(elem, true);
          if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
            pointerElemChangedInterval && clearPointerElemChangedInterval();
            pointerElemChangedInterval = setInterval(function() {
              var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
              if (newElem !== ogElemScroller) {
                ogElemScroller = newElem;
                clearAutoScrolls();
              }
              autoScroll(evt, _this.options, newElem, fallback);
            }, 10);
            lastAutoScrollX = x;
            lastAutoScrollY = y;
          }
        } else {
          if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }
          autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
        }
      }
    };
    return _extends(AutoScroll, {
      pluginName: "scroll",
      initializeByDefault: true
    });
  }
  function clearAutoScrolls() {
    autoScrolls.forEach(function(autoScroll2) {
      clearInterval(autoScroll2.pid);
    });
    autoScrolls = [];
  }
  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }
  var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
    if (!options.scroll)
      return;
    var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
    var scrollThisInstance = false, scrollCustomFn;
    if (scrollRootEl !== rootEl2) {
      scrollRootEl = rootEl2;
      clearAutoScrolls();
      scrollEl = options.scroll;
      scrollCustomFn = options.scrollFn;
      if (scrollEl === true) {
        scrollEl = getParentAutoScrollElement(rootEl2, true);
      }
    }
    var layersOut = 0;
    var currentParent = scrollEl;
    do {
      var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
      if (el === winScroller) {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
      } else {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
      }
      var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
      var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
      if (!autoScrolls[layersOut]) {
        for (var i = 0; i <= layersOut; i++) {
          if (!autoScrolls[i]) {
            autoScrolls[i] = {};
          }
        }
      }
      if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
        autoScrolls[layersOut].el = el;
        autoScrolls[layersOut].vx = vx;
        autoScrolls[layersOut].vy = vy;
        clearInterval(autoScrolls[layersOut].pid);
        if (vx != 0 || vy != 0) {
          scrollThisInstance = true;
          autoScrolls[layersOut].pid = setInterval((function() {
            if (isFallback && this.layer === 0) {
              Sortable.active._onTouchMove(touchEvt$1);
            }
            var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
            var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
            if (typeof scrollCustomFn === "function") {
              if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
                return;
              }
            }
            scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
          }).bind({
            layer: layersOut
          }), 24);
        }
      }
      layersOut++;
    } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
    scrolling = scrollThisInstance;
  }, 30);
  var drop = function drop2(_ref) {
    var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent)
      return;
    var toSortable = putSortable2 || activeSortable;
    hideGhostForTarget();
    var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();
    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent("spill");
      this.onSpill({
        dragEl: dragEl2,
        putSortable: putSortable2
      });
    }
  };
  function Revert() {
  }
  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex2 = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex2;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
      this.sortable.captureAnimationState();
      if (putSortable2) {
        putSortable2.captureAnimationState();
      }
      var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl2, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl2);
      }
      this.sortable.animateAll();
      if (putSortable2) {
        putSortable2.animateAll();
      }
    },
    drop
  };
  _extends(Revert, {
    pluginName: "revertOnSpill"
  });
  function Remove() {
  }
  Remove.prototype = {
    onSpill: function onSpill(_ref4) {
      var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
      var parentSortable = putSortable2 || this.sortable;
      parentSortable.captureAnimationState();
      dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
      parentSortable.animateAll();
    },
    drop
  };
  _extends(Remove, {
    pluginName: "removeOnSpill"
  });
  var lastSwapEl;
  function SwapPlugin() {
    function Swap() {
      this.defaults = {
        swapClass: "sortable-swap-highlight"
      };
    }
    Swap.prototype = {
      dragStart: function dragStart(_ref) {
        var dragEl2 = _ref.dragEl;
        lastSwapEl = dragEl2;
      },
      dragOverValid: function dragOverValid(_ref2) {
        var completed = _ref2.completed, target = _ref2.target, onMove = _ref2.onMove, activeSortable = _ref2.activeSortable, changed = _ref2.changed, cancel = _ref2.cancel;
        if (!activeSortable.options.swap)
          return;
        var el = this.sortable.el, options = this.options;
        if (target && target !== el) {
          var prevSwapEl = lastSwapEl;
          if (onMove(target) !== false) {
            toggleClass(target, options.swapClass, true);
            lastSwapEl = target;
          } else {
            lastSwapEl = null;
          }
          if (prevSwapEl && prevSwapEl !== lastSwapEl) {
            toggleClass(prevSwapEl, options.swapClass, false);
          }
        }
        changed();
        completed(true);
        cancel();
      },
      drop: function drop2(_ref3) {
        var activeSortable = _ref3.activeSortable, putSortable2 = _ref3.putSortable, dragEl2 = _ref3.dragEl;
        var toSortable = putSortable2 || this.sortable;
        var options = this.options;
        lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);
        if (lastSwapEl && (options.swap || putSortable2 && putSortable2.options.swap)) {
          if (dragEl2 !== lastSwapEl) {
            toSortable.captureAnimationState();
            if (toSortable !== activeSortable)
              activeSortable.captureAnimationState();
            swapNodes(dragEl2, lastSwapEl);
            toSortable.animateAll();
            if (toSortable !== activeSortable)
              activeSortable.animateAll();
          }
        }
      },
      nulling: function nulling() {
        lastSwapEl = null;
      }
    };
    return _extends(Swap, {
      pluginName: "swap",
      eventProperties: function eventProperties() {
        return {
          swapItem: lastSwapEl
        };
      }
    });
  }
  function swapNodes(n1, n2) {
    var p1 = n1.parentNode, p2 = n2.parentNode, i1, i2;
    if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1))
      return;
    i1 = index(n1);
    i2 = index(n2);
    if (p1.isEqualNode(p2) && i1 < i2) {
      i2++;
    }
    p1.insertBefore(n2, p1.children[i1]);
    p2.insertBefore(n1, p2.children[i2]);
  }
  var multiDragElements = [], multiDragClones = [], lastMultiDragSelect, multiDragSortable, initialFolding = false, folding = false, dragStarted = false, dragEl$1, clonesFromRect, clonesHidden;
  function MultiDragPlugin() {
    function MultiDrag(sortable) {
      for (var fn in this) {
        if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
          this[fn] = this[fn].bind(this);
        }
      }
      if (sortable.options.supportPointer) {
        on(document, "pointerup", this._deselectMultiDrag);
      } else {
        on(document, "mouseup", this._deselectMultiDrag);
        on(document, "touchend", this._deselectMultiDrag);
      }
      on(document, "keydown", this._checkKeyDown);
      on(document, "keyup", this._checkKeyUp);
      this.defaults = {
        selectedClass: "sortable-selected",
        multiDragKey: null,
        setData: function setData(dataTransfer, dragEl2) {
          var data = "";
          if (multiDragElements.length && multiDragSortable === sortable) {
            multiDragElements.forEach(function(multiDragElement, i) {
              data += (!i ? "" : ", ") + multiDragElement.textContent;
            });
          } else {
            data = dragEl2.textContent;
          }
          dataTransfer.setData("Text", data);
        }
      };
    }
    MultiDrag.prototype = {
      multiDragKeyDown: false,
      isMultiDrag: false,
      delayStartGlobal: function delayStartGlobal(_ref) {
        var dragged = _ref.dragEl;
        dragEl$1 = dragged;
      },
      delayEnded: function delayEnded() {
        this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
      },
      setupClone: function setupClone(_ref2) {
        var sortable = _ref2.sortable, cancel = _ref2.cancel;
        if (!this.isMultiDrag)
          return;
        for (var i = 0; i < multiDragElements.length; i++) {
          multiDragClones.push(clone(multiDragElements[i]));
          multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
          multiDragClones[i].draggable = false;
          multiDragClones[i].style["will-change"] = "";
          toggleClass(multiDragClones[i], this.options.selectedClass, false);
          multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
        }
        sortable._hideClone();
        cancel();
      },
      clone: function clone2(_ref3) {
        var sortable = _ref3.sortable, rootEl2 = _ref3.rootEl, dispatchSortableEvent = _ref3.dispatchSortableEvent, cancel = _ref3.cancel;
        if (!this.isMultiDrag)
          return;
        if (!this.options.removeCloneOnHide) {
          if (multiDragElements.length && multiDragSortable === sortable) {
            insertMultiDragClones(true, rootEl2);
            dispatchSortableEvent("clone");
            cancel();
          }
        }
      },
      showClone: function showClone(_ref4) {
        var cloneNowShown = _ref4.cloneNowShown, rootEl2 = _ref4.rootEl, cancel = _ref4.cancel;
        if (!this.isMultiDrag)
          return;
        insertMultiDragClones(false, rootEl2);
        multiDragClones.forEach(function(clone2) {
          css(clone2, "display", "");
        });
        cloneNowShown();
        clonesHidden = false;
        cancel();
      },
      hideClone: function hideClone(_ref5) {
        var _this = this;
        _ref5.sortable;
        var cloneNowHidden = _ref5.cloneNowHidden, cancel = _ref5.cancel;
        if (!this.isMultiDrag)
          return;
        multiDragClones.forEach(function(clone2) {
          css(clone2, "display", "none");
          if (_this.options.removeCloneOnHide && clone2.parentNode) {
            clone2.parentNode.removeChild(clone2);
          }
        });
        cloneNowHidden();
        clonesHidden = true;
        cancel();
      },
      dragStartGlobal: function dragStartGlobal(_ref6) {
        _ref6.sortable;
        if (!this.isMultiDrag && multiDragSortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
        }
        multiDragElements.forEach(function(multiDragElement) {
          multiDragElement.sortableIndex = index(multiDragElement);
        });
        multiDragElements = multiDragElements.sort(function(a, b) {
          return a.sortableIndex - b.sortableIndex;
        });
        dragStarted = true;
      },
      dragStarted: function dragStarted2(_ref7) {
        var _this2 = this;
        var sortable = _ref7.sortable;
        if (!this.isMultiDrag)
          return;
        if (this.options.sort) {
          sortable.captureAnimationState();
          if (this.options.animation) {
            multiDragElements.forEach(function(multiDragElement) {
              if (multiDragElement === dragEl$1)
                return;
              css(multiDragElement, "position", "absolute");
            });
            var dragRect = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function(multiDragElement) {
              if (multiDragElement === dragEl$1)
                return;
              setRect(multiDragElement, dragRect);
            });
            folding = true;
            initialFolding = true;
          }
        }
        sortable.animateAll(function() {
          folding = false;
          initialFolding = false;
          if (_this2.options.animation) {
            multiDragElements.forEach(function(multiDragElement) {
              unsetRect(multiDragElement);
            });
          }
          if (_this2.options.sort) {
            removeMultiDragElements();
          }
        });
      },
      dragOver: function dragOver(_ref8) {
        var target = _ref8.target, completed = _ref8.completed, cancel = _ref8.cancel;
        if (folding && ~multiDragElements.indexOf(target)) {
          completed(false);
          cancel();
        }
      },
      revert: function revert(_ref9) {
        var fromSortable = _ref9.fromSortable, rootEl2 = _ref9.rootEl, sortable = _ref9.sortable, dragRect = _ref9.dragRect;
        if (multiDragElements.length > 1) {
          multiDragElements.forEach(function(multiDragElement) {
            sortable.addAnimationState({
              target: multiDragElement,
              rect: folding ? getRect(multiDragElement) : dragRect
            });
            unsetRect(multiDragElement);
            multiDragElement.fromRect = dragRect;
            fromSortable.removeAnimationState(multiDragElement);
          });
          folding = false;
          insertMultiDragElements(!this.options.removeCloneOnHide, rootEl2);
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref10) {
        var sortable = _ref10.sortable, isOwner = _ref10.isOwner, insertion = _ref10.insertion, activeSortable = _ref10.activeSortable, parentEl2 = _ref10.parentEl, putSortable2 = _ref10.putSortable;
        var options = this.options;
        if (insertion) {
          if (isOwner) {
            activeSortable._hideClone();
          }
          initialFolding = false;
          if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable2)) {
            var dragRectAbsolute = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function(multiDragElement) {
              if (multiDragElement === dragEl$1)
                return;
              setRect(multiDragElement, dragRectAbsolute);
              parentEl2.appendChild(multiDragElement);
            });
            folding = true;
          }
          if (!isOwner) {
            if (!folding) {
              removeMultiDragElements();
            }
            if (multiDragElements.length > 1) {
              var clonesHiddenBefore = clonesHidden;
              activeSortable._showClone(sortable);
              if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
                multiDragClones.forEach(function(clone2) {
                  activeSortable.addAnimationState({
                    target: clone2,
                    rect: clonesFromRect
                  });
                  clone2.fromRect = clonesFromRect;
                  clone2.thisAnimationDuration = null;
                });
              }
            } else {
              activeSortable._showClone(sortable);
            }
          }
        }
      },
      dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
        var dragRect = _ref11.dragRect, isOwner = _ref11.isOwner, activeSortable = _ref11.activeSortable;
        multiDragElements.forEach(function(multiDragElement) {
          multiDragElement.thisAnimationDuration = null;
        });
        if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
          clonesFromRect = _extends({}, dragRect);
          var dragMatrix = matrix(dragEl$1, true);
          clonesFromRect.top -= dragMatrix.f;
          clonesFromRect.left -= dragMatrix.e;
        }
      },
      dragOverAnimationComplete: function dragOverAnimationComplete() {
        if (folding) {
          folding = false;
          removeMultiDragElements();
        }
      },
      drop: function drop2(_ref12) {
        var evt = _ref12.originalEvent, rootEl2 = _ref12.rootEl, parentEl2 = _ref12.parentEl, sortable = _ref12.sortable, dispatchSortableEvent = _ref12.dispatchSortableEvent, oldIndex2 = _ref12.oldIndex, putSortable2 = _ref12.putSortable;
        var toSortable = putSortable2 || this.sortable;
        if (!evt)
          return;
        var options = this.options, children = parentEl2.children;
        if (!dragStarted) {
          if (options.multiDragKey && !this.multiDragKeyDown) {
            this._deselectMultiDrag();
          }
          toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
          if (!~multiDragElements.indexOf(dragEl$1)) {
            multiDragElements.push(dragEl$1);
            dispatchEvent({
              sortable,
              rootEl: rootEl2,
              name: "select",
              targetEl: dragEl$1,
              originalEvt: evt
            });
            if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
              var lastIndex = index(lastMultiDragSelect), currentIndex = index(dragEl$1);
              if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
                var n, i;
                if (currentIndex > lastIndex) {
                  i = lastIndex;
                  n = currentIndex;
                } else {
                  i = currentIndex;
                  n = lastIndex + 1;
                }
                for (; i < n; i++) {
                  if (~multiDragElements.indexOf(children[i]))
                    continue;
                  toggleClass(children[i], options.selectedClass, true);
                  multiDragElements.push(children[i]);
                  dispatchEvent({
                    sortable,
                    rootEl: rootEl2,
                    name: "select",
                    targetEl: children[i],
                    originalEvt: evt
                  });
                }
              }
            } else {
              lastMultiDragSelect = dragEl$1;
            }
            multiDragSortable = toSortable;
          } else {
            multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
            lastMultiDragSelect = null;
            dispatchEvent({
              sortable,
              rootEl: rootEl2,
              name: "deselect",
              targetEl: dragEl$1,
              originalEvt: evt
            });
          }
        }
        if (dragStarted && this.isMultiDrag) {
          folding = false;
          if ((parentEl2[expando].options.sort || parentEl2 !== rootEl2) && multiDragElements.length > 1) {
            var dragRect = getRect(dragEl$1), multiDragIndex = index(dragEl$1, ":not(." + this.options.selectedClass + ")");
            if (!initialFolding && options.animation)
              dragEl$1.thisAnimationDuration = null;
            toSortable.captureAnimationState();
            if (!initialFolding) {
              if (options.animation) {
                dragEl$1.fromRect = dragRect;
                multiDragElements.forEach(function(multiDragElement) {
                  multiDragElement.thisAnimationDuration = null;
                  if (multiDragElement !== dragEl$1) {
                    var rect = folding ? getRect(multiDragElement) : dragRect;
                    multiDragElement.fromRect = rect;
                    toSortable.addAnimationState({
                      target: multiDragElement,
                      rect
                    });
                  }
                });
              }
              removeMultiDragElements();
              multiDragElements.forEach(function(multiDragElement) {
                if (children[multiDragIndex]) {
                  parentEl2.insertBefore(multiDragElement, children[multiDragIndex]);
                } else {
                  parentEl2.appendChild(multiDragElement);
                }
                multiDragIndex++;
              });
              if (oldIndex2 === index(dragEl$1)) {
                var update = false;
                multiDragElements.forEach(function(multiDragElement) {
                  if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                    update = true;
                    return;
                  }
                });
                if (update) {
                  dispatchSortableEvent("update");
                }
              }
            }
            multiDragElements.forEach(function(multiDragElement) {
              unsetRect(multiDragElement);
            });
            toSortable.animateAll();
          }
          multiDragSortable = toSortable;
        }
        if (rootEl2 === parentEl2 || putSortable2 && putSortable2.lastPutMode !== "clone") {
          multiDragClones.forEach(function(clone2) {
            clone2.parentNode && clone2.parentNode.removeChild(clone2);
          });
        }
      },
      nullingGlobal: function nullingGlobal() {
        this.isMultiDrag = dragStarted = false;
        multiDragClones.length = 0;
      },
      destroyGlobal: function destroyGlobal() {
        this._deselectMultiDrag();
        off(document, "pointerup", this._deselectMultiDrag);
        off(document, "mouseup", this._deselectMultiDrag);
        off(document, "touchend", this._deselectMultiDrag);
        off(document, "keydown", this._checkKeyDown);
        off(document, "keyup", this._checkKeyUp);
      },
      _deselectMultiDrag: function _deselectMultiDrag(evt) {
        if (typeof dragStarted !== "undefined" && dragStarted)
          return;
        if (multiDragSortable !== this.sortable)
          return;
        if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false))
          return;
        if (evt && evt.button !== 0)
          return;
        while (multiDragElements.length) {
          var el = multiDragElements[0];
          toggleClass(el, this.options.selectedClass, false);
          multiDragElements.shift();
          dispatchEvent({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: el,
            originalEvt: evt
          });
        }
      },
      _checkKeyDown: function _checkKeyDown(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = true;
        }
      },
      _checkKeyUp: function _checkKeyUp(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = false;
        }
      }
    };
    return _extends(MultiDrag, {
      // Static methods & properties
      pluginName: "multiDrag",
      utils: {
        /**
         * Selects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be selected
         */
        select: function select(el) {
          var sortable = el.parentNode[expando];
          if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el))
            return;
          if (multiDragSortable && multiDragSortable !== sortable) {
            multiDragSortable.multiDrag._deselectMultiDrag();
            multiDragSortable = sortable;
          }
          toggleClass(el, sortable.options.selectedClass, true);
          multiDragElements.push(el);
        },
        /**
         * Deselects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be deselected
         */
        deselect: function deselect(el) {
          var sortable = el.parentNode[expando], index2 = multiDragElements.indexOf(el);
          if (!sortable || !sortable.options.multiDrag || !~index2)
            return;
          toggleClass(el, sortable.options.selectedClass, false);
          multiDragElements.splice(index2, 1);
        }
      },
      eventProperties: function eventProperties() {
        var _this3 = this;
        var oldIndicies = [], newIndicies = [];
        multiDragElements.forEach(function(multiDragElement) {
          oldIndicies.push({
            multiDragElement,
            index: multiDragElement.sortableIndex
          });
          var newIndex2;
          if (folding && multiDragElement !== dragEl$1) {
            newIndex2 = -1;
          } else if (folding) {
            newIndex2 = index(multiDragElement, ":not(." + _this3.options.selectedClass + ")");
          } else {
            newIndex2 = index(multiDragElement);
          }
          newIndicies.push({
            multiDragElement,
            index: newIndex2
          });
        });
        return {
          items: _toConsumableArray(multiDragElements),
          clones: [].concat(multiDragClones),
          oldIndicies,
          newIndicies
        };
      },
      optionListeners: {
        multiDragKey: function multiDragKey(key) {
          key = key.toLowerCase();
          if (key === "ctrl") {
            key = "Control";
          } else if (key.length > 1) {
            key = key.charAt(0).toUpperCase() + key.substr(1);
          }
          return key;
        }
      }
    });
  }
  function insertMultiDragElements(clonesInserted, rootEl2) {
    multiDragElements.forEach(function(multiDragElement, i) {
      var target = rootEl2.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
      if (target) {
        rootEl2.insertBefore(multiDragElement, target);
      } else {
        rootEl2.appendChild(multiDragElement);
      }
    });
  }
  function insertMultiDragClones(elementsInserted, rootEl2) {
    multiDragClones.forEach(function(clone2, i) {
      var target = rootEl2.children[clone2.sortableIndex + (elementsInserted ? Number(i) : 0)];
      if (target) {
        rootEl2.insertBefore(clone2, target);
      } else {
        rootEl2.appendChild(clone2);
      }
    });
  }
  function removeMultiDragElements() {
    multiDragElements.forEach(function(multiDragElement) {
      if (multiDragElement === dragEl$1)
        return;
      multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
    });
  }
  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);
  const sortable_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    MultiDrag: MultiDragPlugin,
    Sortable,
    Swap: SwapPlugin,
    default: Sortable
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$1 = /* @__PURE__ */ getAugmentedNamespace(sortable_esm);
  (function(module2, exports2) {
    (function webpackUniversalModuleDefinition(root, factory) {
      module2.exports = factory(require$$0, require$$1);
    })(typeof self !== "undefined" ? self : commonjsGlobal, function(__WEBPACK_EXTERNAL_MODULE__8bbf__, __WEBPACK_EXTERNAL_MODULE_a352__) {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module3 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module3.exports, module3, module3.exports, __webpack_require__);
            module3.l = true;
            return module3.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports3, name, getter) {
            if (!__webpack_require__.o(exports3, name)) {
              Object.defineProperty(exports3, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports3) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports3, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports3, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1)
              value = __webpack_require__(value);
            if (mode & 8)
              return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule)
              return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string")
              for (var key in value)
                __webpack_require__.d(ns, key, (function(key2) {
                  return value[key2];
                }).bind(null, key));
            return ns;
          };
          __webpack_require__.n = function(module3) {
            var getter = module3 && module3.__esModule ? (
              /******/
              function getDefault() {
                return module3["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module3;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = "fb15");
        }({
          /***/
          "00ee": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              var test = {};
              test[TO_STRING_TAG] = "z";
              module3.exports = String(test) === "[object z]";
            }
          ),
          /***/
          "0366": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var aFunction = __webpack_require__("1c0b");
              module3.exports = function(fn, that, length) {
                aFunction(fn);
                if (that === void 0)
                  return fn;
                switch (length) {
                  case 0:
                    return function() {
                      return fn.call(that);
                    };
                  case 1:
                    return function(a) {
                      return fn.call(that, a);
                    };
                  case 2:
                    return function(a, b) {
                      return fn.call(that, a, b);
                    };
                  case 3:
                    return function(a, b, c) {
                      return fn.call(that, a, b, c);
                    };
                }
                return function() {
                  return fn.apply(that, arguments);
                };
              };
            }
          ),
          /***/
          "057f": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var toIndexedObject = __webpack_require__("fc6a");
              var nativeGetOwnPropertyNames = __webpack_require__("241c").f;
              var toString = {}.toString;
              var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
              var getWindowNames = function(it) {
                try {
                  return nativeGetOwnPropertyNames(it);
                } catch (error) {
                  return windowNames.slice();
                }
              };
              module3.exports.f = function getOwnPropertyNames(it) {
                return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
              };
            }
          ),
          /***/
          "06cf": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var propertyIsEnumerableModule = __webpack_require__("d1e7");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              var toIndexedObject = __webpack_require__("fc6a");
              var toPrimitive = __webpack_require__("c04e");
              var has2 = __webpack_require__("5135");
              var IE8_DOM_DEFINE = __webpack_require__("0cfb");
              var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
              exports3.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
                O = toIndexedObject(O);
                P = toPrimitive(P, true);
                if (IE8_DOM_DEFINE)
                  try {
                    return nativeGetOwnPropertyDescriptor(O, P);
                  } catch (error) {
                  }
                if (has2(O, P))
                  return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
              };
            }
          ),
          /***/
          "0cfb": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var fails = __webpack_require__("d039");
              var createElement = __webpack_require__("cc12");
              module3.exports = !DESCRIPTORS && !fails(function() {
                return Object.defineProperty(createElement("div"), "a", {
                  get: function() {
                    return 7;
                  }
                }).a != 7;
              });
            }
          ),
          /***/
          "13d5": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $reduce = __webpack_require__("d58f").left;
              var arrayMethodIsStrict = __webpack_require__("a640");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var STRICT_METHOD = arrayMethodIsStrict("reduce");
              var USES_TO_LENGTH = arrayMethodUsesToLength("reduce", { 1: 0 });
              $({ target: "Array", proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
                reduce: function reduce(callbackfn) {
                  return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            }
          ),
          /***/
          "14c3": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var classof = __webpack_require__("c6b6");
              var regexpExec = __webpack_require__("9263");
              module3.exports = function(R, S) {
                var exec = R.exec;
                if (typeof exec === "function") {
                  var result = exec.call(R, S);
                  if (typeof result !== "object") {
                    throw TypeError("RegExp exec method returned something other than an Object or null");
                  }
                  return result;
                }
                if (classof(R) !== "RegExp") {
                  throw TypeError("RegExp#exec called on incompatible receiver");
                }
                return regexpExec.call(R, S);
              };
            }
          ),
          /***/
          "159b": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var DOMIterables = __webpack_require__("fdbc");
              var forEach = __webpack_require__("17c2");
              var createNonEnumerableProperty = __webpack_require__("9112");
              for (var COLLECTION_NAME in DOMIterables) {
                var Collection = global2[COLLECTION_NAME];
                var CollectionPrototype = Collection && Collection.prototype;
                if (CollectionPrototype && CollectionPrototype.forEach !== forEach)
                  try {
                    createNonEnumerableProperty(CollectionPrototype, "forEach", forEach);
                  } catch (error) {
                    CollectionPrototype.forEach = forEach;
                  }
              }
            }
          ),
          /***/
          "17c2": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $forEach = __webpack_require__("b727").forEach;
              var arrayMethodIsStrict = __webpack_require__("a640");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var STRICT_METHOD = arrayMethodIsStrict("forEach");
              var USES_TO_LENGTH = arrayMethodUsesToLength("forEach");
              module3.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn) {
                return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
              } : [].forEach;
            }
          ),
          /***/
          "1be4": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var getBuiltIn = __webpack_require__("d066");
              module3.exports = getBuiltIn("document", "documentElement");
            }
          ),
          /***/
          "1c0b": (
            /***/
            function(module3, exports3) {
              module3.exports = function(it) {
                if (typeof it != "function") {
                  throw TypeError(String(it) + " is not a function");
                }
                return it;
              };
            }
          ),
          /***/
          "1c7e": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var ITERATOR = wellKnownSymbol("iterator");
              var SAFE_CLOSING = false;
              try {
                var called = 0;
                var iteratorWithReturn = {
                  next: function() {
                    return { done: !!called++ };
                  },
                  "return": function() {
                    SAFE_CLOSING = true;
                  }
                };
                iteratorWithReturn[ITERATOR] = function() {
                  return this;
                };
                Array.from(iteratorWithReturn, function() {
                  throw 2;
                });
              } catch (error) {
              }
              module3.exports = function(exec, SKIP_CLOSING) {
                if (!SKIP_CLOSING && !SAFE_CLOSING)
                  return false;
                var ITERATION_SUPPORT = false;
                try {
                  var object = {};
                  object[ITERATOR] = function() {
                    return {
                      next: function() {
                        return { done: ITERATION_SUPPORT = true };
                      }
                    };
                  };
                  exec(object);
                } catch (error) {
                }
                return ITERATION_SUPPORT;
              };
            }
          ),
          /***/
          "1d80": (
            /***/
            function(module3, exports3) {
              module3.exports = function(it) {
                if (it == void 0)
                  throw TypeError("Can't call method on " + it);
                return it;
              };
            }
          ),
          /***/
          "1dde": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var fails = __webpack_require__("d039");
              var wellKnownSymbol = __webpack_require__("b622");
              var V8_VERSION = __webpack_require__("2d00");
              var SPECIES = wellKnownSymbol("species");
              module3.exports = function(METHOD_NAME) {
                return V8_VERSION >= 51 || !fails(function() {
                  var array = [];
                  var constructor = array.constructor = {};
                  constructor[SPECIES] = function() {
                    return { foo: 1 };
                  };
                  return array[METHOD_NAME](Boolean).foo !== 1;
                });
              };
            }
          ),
          /***/
          "23cb": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var toInteger = __webpack_require__("a691");
              var max = Math.max;
              var min = Math.min;
              module3.exports = function(index2, length) {
                var integer = toInteger(index2);
                return integer < 0 ? max(integer + length, 0) : min(integer, length);
              };
            }
          ),
          /***/
          "23e7": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
              var createNonEnumerableProperty = __webpack_require__("9112");
              var redefine = __webpack_require__("6eeb");
              var setGlobal = __webpack_require__("ce4e");
              var copyConstructorProperties = __webpack_require__("e893");
              var isForced = __webpack_require__("94ca");
              module3.exports = function(options, source) {
                var TARGET = options.target;
                var GLOBAL = options.global;
                var STATIC = options.stat;
                var FORCED, target, key, targetProperty, sourceProperty, descriptor;
                if (GLOBAL) {
                  target = global2;
                } else if (STATIC) {
                  target = global2[TARGET] || setGlobal(TARGET, {});
                } else {
                  target = (global2[TARGET] || {}).prototype;
                }
                if (target)
                  for (key in source) {
                    sourceProperty = source[key];
                    if (options.noTargetGet) {
                      descriptor = getOwnPropertyDescriptor(target, key);
                      targetProperty = descriptor && descriptor.value;
                    } else
                      targetProperty = target[key];
                    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
                    if (!FORCED && targetProperty !== void 0) {
                      if (typeof sourceProperty === typeof targetProperty)
                        continue;
                      copyConstructorProperties(sourceProperty, targetProperty);
                    }
                    if (options.sham || targetProperty && targetProperty.sham) {
                      createNonEnumerableProperty(sourceProperty, "sham", true);
                    }
                    redefine(target, key, sourceProperty, options);
                  }
              };
            }
          ),
          /***/
          "241c": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var internalObjectKeys = __webpack_require__("ca84");
              var enumBugKeys = __webpack_require__("7839");
              var hiddenKeys = enumBugKeys.concat("length", "prototype");
              exports3.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
                return internalObjectKeys(O, hiddenKeys);
              };
            }
          ),
          /***/
          "25f0": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var redefine = __webpack_require__("6eeb");
              var anObject = __webpack_require__("825a");
              var fails = __webpack_require__("d039");
              var flags = __webpack_require__("ad6d");
              var TO_STRING = "toString";
              var RegExpPrototype = RegExp.prototype;
              var nativeToString = RegExpPrototype[TO_STRING];
              var NOT_GENERIC = fails(function() {
                return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
              });
              var INCORRECT_NAME = nativeToString.name != TO_STRING;
              if (NOT_GENERIC || INCORRECT_NAME) {
                redefine(RegExp.prototype, TO_STRING, function toString() {
                  var R = anObject(this);
                  var p = String(R.source);
                  var rf = R.flags;
                  var f = String(rf === void 0 && R instanceof RegExp && !("flags" in RegExpPrototype) ? flags.call(R) : rf);
                  return "/" + p + "/" + f;
                }, { unsafe: true });
              }
            }
          ),
          /***/
          "2ca0": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
              var toLength = __webpack_require__("50c4");
              var notARegExp = __webpack_require__("5a34");
              var requireObjectCoercible = __webpack_require__("1d80");
              var correctIsRegExpLogic = __webpack_require__("ab13");
              var IS_PURE = __webpack_require__("c430");
              var nativeStartsWith = "".startsWith;
              var min = Math.min;
              var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
              var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function() {
                var descriptor = getOwnPropertyDescriptor(String.prototype, "startsWith");
                return descriptor && !descriptor.writable;
              }();
              $({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
                startsWith: function startsWith(searchString) {
                  var that = String(requireObjectCoercible(this));
                  notARegExp(searchString);
                  var index2 = toLength(min(arguments.length > 1 ? arguments[1] : void 0, that.length));
                  var search = String(searchString);
                  return nativeStartsWith ? nativeStartsWith.call(that, search, index2) : that.slice(index2, index2 + search.length) === search;
                }
              });
            }
          ),
          /***/
          "2d00": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var userAgent2 = __webpack_require__("342f");
              var process = global2.process;
              var versions = process && process.versions;
              var v8 = versions && versions.v8;
              var match2, version2;
              if (v8) {
                match2 = v8.split(".");
                version2 = match2[0] + match2[1];
              } else if (userAgent2) {
                match2 = userAgent2.match(/Edge\/(\d+)/);
                if (!match2 || match2[1] >= 74) {
                  match2 = userAgent2.match(/Chrome\/(\d+)/);
                  if (match2)
                    version2 = match2[1];
                }
              }
              module3.exports = version2 && +version2;
            }
          ),
          /***/
          "342f": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var getBuiltIn = __webpack_require__("d066");
              module3.exports = getBuiltIn("navigator", "userAgent") || "";
            }
          ),
          /***/
          "35a1": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var classof = __webpack_require__("f5df");
              var Iterators = __webpack_require__("3f8c");
              var wellKnownSymbol = __webpack_require__("b622");
              var ITERATOR = wellKnownSymbol("iterator");
              module3.exports = function(it) {
                if (it != void 0)
                  return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
              };
            }
          ),
          /***/
          "37e8": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var definePropertyModule = __webpack_require__("9bf2");
              var anObject = __webpack_require__("825a");
              var objectKeys = __webpack_require__("df75");
              module3.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
                anObject(O);
                var keys = objectKeys(Properties);
                var length = keys.length;
                var index2 = 0;
                var key;
                while (length > index2)
                  definePropertyModule.f(O, key = keys[index2++], Properties[key]);
                return O;
              };
            }
          ),
          /***/
          "3bbe": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              module3.exports = function(it) {
                if (!isObject2(it) && it !== null) {
                  throw TypeError("Can't set " + String(it) + " as a prototype");
                }
                return it;
              };
            }
          ),
          /***/
          "3ca3": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var charAt = __webpack_require__("6547").charAt;
              var InternalStateModule = __webpack_require__("69f3");
              var defineIterator = __webpack_require__("7dd0");
              var STRING_ITERATOR = "String Iterator";
              var setInternalState = InternalStateModule.set;
              var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
              defineIterator(String, "String", function(iterated) {
                setInternalState(this, {
                  type: STRING_ITERATOR,
                  string: String(iterated),
                  index: 0
                });
              }, function next() {
                var state = getInternalState(this);
                var string = state.string;
                var index2 = state.index;
                var point;
                if (index2 >= string.length)
                  return { value: void 0, done: true };
                point = charAt(string, index2);
                state.index += point.length;
                return { value: point, done: false };
              });
            }
          ),
          /***/
          "3f8c": (
            /***/
            function(module3, exports3) {
              module3.exports = {};
            }
          ),
          /***/
          "4160": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var forEach = __webpack_require__("17c2");
              $({ target: "Array", proto: true, forced: [].forEach != forEach }, {
                forEach
              });
            }
          ),
          /***/
          "428f": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              module3.exports = global2;
            }
          ),
          /***/
          "44ad": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var fails = __webpack_require__("d039");
              var classof = __webpack_require__("c6b6");
              var split = "".split;
              module3.exports = fails(function() {
                return !Object("z").propertyIsEnumerable(0);
              }) ? function(it) {
                return classof(it) == "String" ? split.call(it, "") : Object(it);
              } : Object;
            }
          ),
          /***/
          "44d2": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var create = __webpack_require__("7c73");
              var definePropertyModule = __webpack_require__("9bf2");
              var UNSCOPABLES = wellKnownSymbol("unscopables");
              var ArrayPrototype = Array.prototype;
              if (ArrayPrototype[UNSCOPABLES] == void 0) {
                definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
                  configurable: true,
                  value: create(null)
                });
              }
              module3.exports = function(key) {
                ArrayPrototype[UNSCOPABLES][key] = true;
              };
            }
          ),
          /***/
          "44e7": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              var classof = __webpack_require__("c6b6");
              var wellKnownSymbol = __webpack_require__("b622");
              var MATCH = wellKnownSymbol("match");
              module3.exports = function(it) {
                var isRegExp;
                return isObject2(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == "RegExp");
              };
            }
          ),
          /***/
          "4930": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module3.exports = !!Object.getOwnPropertySymbols && !fails(function() {
                return !String(Symbol());
              });
            }
          ),
          /***/
          "4d64": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var toIndexedObject = __webpack_require__("fc6a");
              var toLength = __webpack_require__("50c4");
              var toAbsoluteIndex = __webpack_require__("23cb");
              var createMethod = function(IS_INCLUDES) {
                return function($this, el, fromIndex) {
                  var O = toIndexedObject($this);
                  var length = toLength(O.length);
                  var index2 = toAbsoluteIndex(fromIndex, length);
                  var value;
                  if (IS_INCLUDES && el != el)
                    while (length > index2) {
                      value = O[index2++];
                      if (value != value)
                        return true;
                    }
                  else
                    for (; length > index2; index2++) {
                      if ((IS_INCLUDES || index2 in O) && O[index2] === el)
                        return IS_INCLUDES || index2 || 0;
                    }
                  return !IS_INCLUDES && -1;
                };
              };
              module3.exports = {
                // `Array.prototype.includes` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.includes
                includes: createMethod(true),
                // `Array.prototype.indexOf` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
                indexOf: createMethod(false)
              };
            }
          ),
          /***/
          "4de4": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $filter = __webpack_require__("b727").filter;
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
              var USES_TO_LENGTH = arrayMethodUsesToLength("filter");
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                filter: function filter(callbackfn) {
                  return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            }
          ),
          /***/
          "4df4": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var bind = __webpack_require__("0366");
              var toObject = __webpack_require__("7b0b");
              var callWithSafeIterationClosing = __webpack_require__("9bdd");
              var isArrayIteratorMethod = __webpack_require__("e95a");
              var toLength = __webpack_require__("50c4");
              var createProperty = __webpack_require__("8418");
              var getIteratorMethod = __webpack_require__("35a1");
              module3.exports = function from(arrayLike) {
                var O = toObject(arrayLike);
                var C = typeof this == "function" ? this : Array;
                var argumentsLength = arguments.length;
                var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
                var mapping = mapfn !== void 0;
                var iteratorMethod = getIteratorMethod(O);
                var index2 = 0;
                var length, result, step, iterator, next, value;
                if (mapping)
                  mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
                if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
                  iterator = iteratorMethod.call(O);
                  next = iterator.next;
                  result = new C();
                  for (; !(step = next.call(iterator)).done; index2++) {
                    value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index2], true) : step.value;
                    createProperty(result, index2, value);
                  }
                } else {
                  length = toLength(O.length);
                  result = new C(length);
                  for (; length > index2; index2++) {
                    value = mapping ? mapfn(O[index2], index2) : O[index2];
                    createProperty(result, index2, value);
                  }
                }
                result.length = index2;
                return result;
              };
            }
          ),
          /***/
          "4fad": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $entries = __webpack_require__("6f53").entries;
              $({ target: "Object", stat: true }, {
                entries: function entries(O) {
                  return $entries(O);
                }
              });
            }
          ),
          /***/
          "50c4": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var toInteger = __webpack_require__("a691");
              var min = Math.min;
              module3.exports = function(argument) {
                return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0;
              };
            }
          ),
          /***/
          "5135": (
            /***/
            function(module3, exports3) {
              var hasOwnProperty = {}.hasOwnProperty;
              module3.exports = function(it, key) {
                return hasOwnProperty.call(it, key);
              };
            }
          ),
          /***/
          "5319": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
              var anObject = __webpack_require__("825a");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var toInteger = __webpack_require__("a691");
              var requireObjectCoercible = __webpack_require__("1d80");
              var advanceStringIndex = __webpack_require__("8aa5");
              var regExpExec = __webpack_require__("14c3");
              var max = Math.max;
              var min = Math.min;
              var floor = Math.floor;
              var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
              var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;
              var maybeToString = function(it) {
                return it === void 0 ? it : String(it);
              };
              fixRegExpWellKnownSymbolLogic("replace", 2, function(REPLACE, nativeReplace, maybeCallNative, reason) {
                var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
                var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
                var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
                return [
                  // `String.prototype.replace` method
                  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
                  function replace(searchValue, replaceValue) {
                    var O = requireObjectCoercible(this);
                    var replacer = searchValue == void 0 ? void 0 : searchValue[REPLACE];
                    return replacer !== void 0 ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
                  },
                  // `RegExp.prototype[@@replace]` method
                  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
                  function(regexp, replaceValue) {
                    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === "string" && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
                      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
                      if (res.done)
                        return res.value;
                    }
                    var rx = anObject(regexp);
                    var S = String(this);
                    var functionalReplace = typeof replaceValue === "function";
                    if (!functionalReplace)
                      replaceValue = String(replaceValue);
                    var global2 = rx.global;
                    if (global2) {
                      var fullUnicode = rx.unicode;
                      rx.lastIndex = 0;
                    }
                    var results = [];
                    while (true) {
                      var result = regExpExec(rx, S);
                      if (result === null)
                        break;
                      results.push(result);
                      if (!global2)
                        break;
                      var matchStr = String(result[0]);
                      if (matchStr === "")
                        rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
                    }
                    var accumulatedResult = "";
                    var nextSourcePosition = 0;
                    for (var i = 0; i < results.length; i++) {
                      result = results[i];
                      var matched = String(result[0]);
                      var position = max(min(toInteger(result.index), S.length), 0);
                      var captures = [];
                      for (var j = 1; j < result.length; j++)
                        captures.push(maybeToString(result[j]));
                      var namedCaptures = result.groups;
                      if (functionalReplace) {
                        var replacerArgs = [matched].concat(captures, position, S);
                        if (namedCaptures !== void 0)
                          replacerArgs.push(namedCaptures);
                        var replacement = String(replaceValue.apply(void 0, replacerArgs));
                      } else {
                        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                      }
                      if (position >= nextSourcePosition) {
                        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                        nextSourcePosition = position + matched.length;
                      }
                    }
                    return accumulatedResult + S.slice(nextSourcePosition);
                  }
                ];
                function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
                  var tailPos = position + matched.length;
                  var m = captures.length;
                  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
                  if (namedCaptures !== void 0) {
                    namedCaptures = toObject(namedCaptures);
                    symbols = SUBSTITUTION_SYMBOLS;
                  }
                  return nativeReplace.call(replacement, symbols, function(match2, ch) {
                    var capture;
                    switch (ch.charAt(0)) {
                      case "$":
                        return "$";
                      case "&":
                        return matched;
                      case "`":
                        return str.slice(0, position);
                      case "'":
                        return str.slice(tailPos);
                      case "<":
                        capture = namedCaptures[ch.slice(1, -1)];
                        break;
                      default:
                        var n = +ch;
                        if (n === 0)
                          return match2;
                        if (n > m) {
                          var f = floor(n / 10);
                          if (f === 0)
                            return match2;
                          if (f <= m)
                            return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                          return match2;
                        }
                        capture = captures[n - 1];
                    }
                    return capture === void 0 ? "" : capture;
                  });
                }
              });
            }
          ),
          /***/
          "5692": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var IS_PURE = __webpack_require__("c430");
              var store = __webpack_require__("c6cd");
              (module3.exports = function(key, value) {
                return store[key] || (store[key] = value !== void 0 ? value : {});
              })("versions", []).push({
                version: "3.6.5",
                mode: IS_PURE ? "pure" : "global",
                copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
              });
            }
          ),
          /***/
          "56ef": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var getBuiltIn = __webpack_require__("d066");
              var getOwnPropertyNamesModule = __webpack_require__("241c");
              var getOwnPropertySymbolsModule = __webpack_require__("7418");
              var anObject = __webpack_require__("825a");
              module3.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys2(it) {
                var keys = getOwnPropertyNamesModule.f(anObject(it));
                var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
                return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
              };
            }
          ),
          /***/
          "5a34": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var isRegExp = __webpack_require__("44e7");
              module3.exports = function(it) {
                if (isRegExp(it)) {
                  throw TypeError("The method doesn't accept regular expressions");
                }
                return it;
              };
            }
          ),
          /***/
          "5c6c": (
            /***/
            function(module3, exports3) {
              module3.exports = function(bitmap, value) {
                return {
                  enumerable: !(bitmap & 1),
                  configurable: !(bitmap & 2),
                  writable: !(bitmap & 4),
                  value
                };
              };
            }
          ),
          /***/
          "5db7": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var flattenIntoArray = __webpack_require__("a2bf");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var aFunction = __webpack_require__("1c0b");
              var arraySpeciesCreate = __webpack_require__("65f0");
              $({ target: "Array", proto: true }, {
                flatMap: function flatMap(callbackfn) {
                  var O = toObject(this);
                  var sourceLen = toLength(O.length);
                  var A;
                  aFunction(callbackfn);
                  A = arraySpeciesCreate(O, 0);
                  A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                  return A;
                }
              });
            }
          ),
          /***/
          "6547": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var toInteger = __webpack_require__("a691");
              var requireObjectCoercible = __webpack_require__("1d80");
              var createMethod = function(CONVERT_TO_STRING) {
                return function($this, pos) {
                  var S = String(requireObjectCoercible($this));
                  var position = toInteger(pos);
                  var size = S.length;
                  var first, second;
                  if (position < 0 || position >= size)
                    return CONVERT_TO_STRING ? "" : void 0;
                  first = S.charCodeAt(position);
                  return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
                };
              };
              module3.exports = {
                // `String.prototype.codePointAt` method
                // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
                codeAt: createMethod(false),
                // `String.prototype.at` method
                // https://github.com/mathiasbynens/String.prototype.at
                charAt: createMethod(true)
              };
            }
          ),
          /***/
          "65f0": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              var isArray = __webpack_require__("e8b5");
              var wellKnownSymbol = __webpack_require__("b622");
              var SPECIES = wellKnownSymbol("species");
              module3.exports = function(originalArray, length) {
                var C;
                if (isArray(originalArray)) {
                  C = originalArray.constructor;
                  if (typeof C == "function" && (C === Array || isArray(C.prototype)))
                    C = void 0;
                  else if (isObject2(C)) {
                    C = C[SPECIES];
                    if (C === null)
                      C = void 0;
                  }
                }
                return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
              };
            }
          ),
          /***/
          "69f3": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
              var global2 = __webpack_require__("da84");
              var isObject2 = __webpack_require__("861d");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var objectHas = __webpack_require__("5135");
              var sharedKey = __webpack_require__("f772");
              var hiddenKeys = __webpack_require__("d012");
              var WeakMap2 = global2.WeakMap;
              var set, get, has2;
              var enforce = function(it) {
                return has2(it) ? get(it) : set(it, {});
              };
              var getterFor = function(TYPE) {
                return function(it) {
                  var state;
                  if (!isObject2(it) || (state = get(it)).type !== TYPE) {
                    throw TypeError("Incompatible receiver, " + TYPE + " required");
                  }
                  return state;
                };
              };
              if (NATIVE_WEAK_MAP) {
                var store = new WeakMap2();
                var wmget = store.get;
                var wmhas = store.has;
                var wmset = store.set;
                set = function(it, metadata) {
                  wmset.call(store, it, metadata);
                  return metadata;
                };
                get = function(it) {
                  return wmget.call(store, it) || {};
                };
                has2 = function(it) {
                  return wmhas.call(store, it);
                };
              } else {
                var STATE = sharedKey("state");
                hiddenKeys[STATE] = true;
                set = function(it, metadata) {
                  createNonEnumerableProperty(it, STATE, metadata);
                  return metadata;
                };
                get = function(it) {
                  return objectHas(it, STATE) ? it[STATE] : {};
                };
                has2 = function(it) {
                  return objectHas(it, STATE);
                };
              }
              module3.exports = {
                set,
                get,
                has: has2,
                enforce,
                getterFor
              };
            }
          ),
          /***/
          "6eeb": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var has2 = __webpack_require__("5135");
              var setGlobal = __webpack_require__("ce4e");
              var inspectSource = __webpack_require__("8925");
              var InternalStateModule = __webpack_require__("69f3");
              var getInternalState = InternalStateModule.get;
              var enforceInternalState = InternalStateModule.enforce;
              var TEMPLATE = String(String).split("String");
              (module3.exports = function(O, key, value, options) {
                var unsafe = options ? !!options.unsafe : false;
                var simple = options ? !!options.enumerable : false;
                var noTargetGet = options ? !!options.noTargetGet : false;
                if (typeof value == "function") {
                  if (typeof key == "string" && !has2(value, "name"))
                    createNonEnumerableProperty(value, "name", key);
                  enforceInternalState(value).source = TEMPLATE.join(typeof key == "string" ? key : "");
                }
                if (O === global2) {
                  if (simple)
                    O[key] = value;
                  else
                    setGlobal(key, value);
                  return;
                } else if (!unsafe) {
                  delete O[key];
                } else if (!noTargetGet && O[key]) {
                  simple = true;
                }
                if (simple)
                  O[key] = value;
                else
                  createNonEnumerableProperty(O, key, value);
              })(Function.prototype, "toString", function toString() {
                return typeof this == "function" && getInternalState(this).source || inspectSource(this);
              });
            }
          ),
          /***/
          "6f53": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var objectKeys = __webpack_require__("df75");
              var toIndexedObject = __webpack_require__("fc6a");
              var propertyIsEnumerable = __webpack_require__("d1e7").f;
              var createMethod = function(TO_ENTRIES) {
                return function(it) {
                  var O = toIndexedObject(it);
                  var keys = objectKeys(O);
                  var length = keys.length;
                  var i = 0;
                  var result = [];
                  var key;
                  while (length > i) {
                    key = keys[i++];
                    if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
                      result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
                    }
                  }
                  return result;
                };
              };
              module3.exports = {
                // `Object.entries` method
                // https://tc39.github.io/ecma262/#sec-object.entries
                entries: createMethod(true),
                // `Object.values` method
                // https://tc39.github.io/ecma262/#sec-object.values
                values: createMethod(false)
              };
            }
          ),
          /***/
          "73d9": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var addToUnscopables = __webpack_require__("44d2");
              addToUnscopables("flatMap");
            }
          ),
          /***/
          "7418": (
            /***/
            function(module3, exports3) {
              exports3.f = Object.getOwnPropertySymbols;
            }
          ),
          /***/
          "746f": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var path = __webpack_require__("428f");
              var has2 = __webpack_require__("5135");
              var wrappedWellKnownSymbolModule = __webpack_require__("e538");
              var defineProperty = __webpack_require__("9bf2").f;
              module3.exports = function(NAME) {
                var Symbol2 = path.Symbol || (path.Symbol = {});
                if (!has2(Symbol2, NAME))
                  defineProperty(Symbol2, NAME, {
                    value: wrappedWellKnownSymbolModule.f(NAME)
                  });
              };
            }
          ),
          /***/
          "7839": (
            /***/
            function(module3, exports3) {
              module3.exports = [
                "constructor",
                "hasOwnProperty",
                "isPrototypeOf",
                "propertyIsEnumerable",
                "toLocaleString",
                "toString",
                "valueOf"
              ];
            }
          ),
          /***/
          "7b0b": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var requireObjectCoercible = __webpack_require__("1d80");
              module3.exports = function(argument) {
                return Object(requireObjectCoercible(argument));
              };
            }
          ),
          /***/
          "7c73": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              var defineProperties = __webpack_require__("37e8");
              var enumBugKeys = __webpack_require__("7839");
              var hiddenKeys = __webpack_require__("d012");
              var html = __webpack_require__("1be4");
              var documentCreateElement = __webpack_require__("cc12");
              var sharedKey = __webpack_require__("f772");
              var GT = ">";
              var LT = "<";
              var PROTOTYPE = "prototype";
              var SCRIPT = "script";
              var IE_PROTO = sharedKey("IE_PROTO");
              var EmptyConstructor = function() {
              };
              var scriptTag = function(content) {
                return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
              };
              var NullProtoObjectViaActiveX = function(activeXDocument2) {
                activeXDocument2.write(scriptTag(""));
                activeXDocument2.close();
                var temp = activeXDocument2.parentWindow.Object;
                activeXDocument2 = null;
                return temp;
              };
              var NullProtoObjectViaIFrame = function() {
                var iframe = documentCreateElement("iframe");
                var JS = "java" + SCRIPT + ":";
                var iframeDocument;
                iframe.style.display = "none";
                html.appendChild(iframe);
                iframe.src = String(JS);
                iframeDocument = iframe.contentWindow.document;
                iframeDocument.open();
                iframeDocument.write(scriptTag("document.F=Object"));
                iframeDocument.close();
                return iframeDocument.F;
              };
              var activeXDocument;
              var NullProtoObject = function() {
                try {
                  activeXDocument = document.domain && new ActiveXObject("htmlfile");
                } catch (error) {
                }
                NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
                var length = enumBugKeys.length;
                while (length--)
                  delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
                return NullProtoObject();
              };
              hiddenKeys[IE_PROTO] = true;
              module3.exports = Object.create || function create(O, Properties) {
                var result;
                if (O !== null) {
                  EmptyConstructor[PROTOTYPE] = anObject(O);
                  result = new EmptyConstructor();
                  EmptyConstructor[PROTOTYPE] = null;
                  result[IE_PROTO] = O;
                } else
                  result = NullProtoObject();
                return Properties === void 0 ? result : defineProperties(result, Properties);
              };
            }
          ),
          /***/
          "7dd0": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var createIteratorConstructor = __webpack_require__("9ed3");
              var getPrototypeOf = __webpack_require__("e163");
              var setPrototypeOf = __webpack_require__("d2bb");
              var setToStringTag = __webpack_require__("d44e");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var redefine = __webpack_require__("6eeb");
              var wellKnownSymbol = __webpack_require__("b622");
              var IS_PURE = __webpack_require__("c430");
              var Iterators = __webpack_require__("3f8c");
              var IteratorsCore = __webpack_require__("ae93");
              var IteratorPrototype = IteratorsCore.IteratorPrototype;
              var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
              var ITERATOR = wellKnownSymbol("iterator");
              var KEYS = "keys";
              var VALUES = "values";
              var ENTRIES = "entries";
              var returnThis = function() {
                return this;
              };
              module3.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
                createIteratorConstructor(IteratorConstructor, NAME, next);
                var getIterationMethod = function(KIND) {
                  if (KIND === DEFAULT && defaultIterator)
                    return defaultIterator;
                  if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
                    return IterablePrototype[KIND];
                  switch (KIND) {
                    case KEYS:
                      return function keys() {
                        return new IteratorConstructor(this, KIND);
                      };
                    case VALUES:
                      return function values() {
                        return new IteratorConstructor(this, KIND);
                      };
                    case ENTRIES:
                      return function entries() {
                        return new IteratorConstructor(this, KIND);
                      };
                  }
                  return function() {
                    return new IteratorConstructor(this);
                  };
                };
                var TO_STRING_TAG = NAME + " Iterator";
                var INCORRECT_VALUES_NAME = false;
                var IterablePrototype = Iterable.prototype;
                var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
                var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
                var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
                var CurrentIteratorPrototype, methods, KEY;
                if (anyNativeIterator) {
                  CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
                  if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
                    if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                      if (setPrototypeOf) {
                        setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                      } else if (typeof CurrentIteratorPrototype[ITERATOR] != "function") {
                        createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
                      }
                    }
                    setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
                    if (IS_PURE)
                      Iterators[TO_STRING_TAG] = returnThis;
                  }
                }
                if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
                  INCORRECT_VALUES_NAME = true;
                  defaultIterator = function values() {
                    return nativeIterator.call(this);
                  };
                }
                if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
                  createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
                }
                Iterators[NAME] = defaultIterator;
                if (DEFAULT) {
                  methods = {
                    values: getIterationMethod(VALUES),
                    keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                    entries: getIterationMethod(ENTRIES)
                  };
                  if (FORCED)
                    for (KEY in methods) {
                      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                        redefine(IterablePrototype, KEY, methods[KEY]);
                      }
                    }
                  else
                    $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
                }
                return methods;
              };
            }
          ),
          /***/
          "7f9a": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var inspectSource = __webpack_require__("8925");
              var WeakMap2 = global2.WeakMap;
              module3.exports = typeof WeakMap2 === "function" && /native code/.test(inspectSource(WeakMap2));
            }
          ),
          /***/
          "825a": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              module3.exports = function(it) {
                if (!isObject2(it)) {
                  throw TypeError(String(it) + " is not an object");
                }
                return it;
              };
            }
          ),
          /***/
          "83ab": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module3.exports = !fails(function() {
                return Object.defineProperty({}, 1, { get: function() {
                  return 7;
                } })[1] != 7;
              });
            }
          ),
          /***/
          "8418": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var toPrimitive = __webpack_require__("c04e");
              var definePropertyModule = __webpack_require__("9bf2");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              module3.exports = function(object, key, value) {
                var propertyKey = toPrimitive(key);
                if (propertyKey in object)
                  definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
                else
                  object[propertyKey] = value;
              };
            }
          ),
          /***/
          "861d": (
            /***/
            function(module3, exports3) {
              module3.exports = function(it) {
                return typeof it === "object" ? it !== null : typeof it === "function";
              };
            }
          ),
          /***/
          "8875": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
              (function(root, factory) {
                {
                  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports3, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module3.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                }
              })(typeof self !== "undefined" ? self : this, function() {
                function getCurrentScript() {
                  var descriptor = Object.getOwnPropertyDescriptor(document, "currentScript");
                  if (!descriptor && "currentScript" in document && document.currentScript) {
                    return document.currentScript;
                  }
                  if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
                    return document.currentScript;
                  }
                  try {
                    throw new Error();
                  } catch (err) {
                    var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig, ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig, stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack), scriptLocation = stackDetails && stackDetails[1] || false, line = stackDetails && stackDetails[2] || false, currentLocation = document.location.href.replace(document.location.hash, ""), pageSource, inlineScriptSourceRegExp, inlineScriptSource, scripts = document.getElementsByTagName("script");
                    if (scriptLocation === currentLocation) {
                      pageSource = document.documentElement.outerHTML;
                      inlineScriptSourceRegExp = new RegExp("(?:[^\\n]+?\\n){0," + (line - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i");
                      inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, "$1").trim();
                    }
                    for (var i = 0; i < scripts.length; i++) {
                      if (scripts[i].readyState === "interactive") {
                        return scripts[i];
                      }
                      if (scripts[i].src === scriptLocation) {
                        return scripts[i];
                      }
                      if (scriptLocation === currentLocation && scripts[i].innerHTML && scripts[i].innerHTML.trim() === inlineScriptSource) {
                        return scripts[i];
                      }
                    }
                    return null;
                  }
                }
                return getCurrentScript;
              });
            }
          ),
          /***/
          "8925": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var store = __webpack_require__("c6cd");
              var functionToString = Function.toString;
              if (typeof store.inspectSource != "function") {
                store.inspectSource = function(it) {
                  return functionToString.call(it);
                };
              }
              module3.exports = store.inspectSource;
            }
          ),
          /***/
          "8aa5": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var charAt = __webpack_require__("6547").charAt;
              module3.exports = function(S, index2, unicode) {
                return index2 + (unicode ? charAt(S, index2).length : 1);
              };
            }
          ),
          /***/
          "8bbf": (
            /***/
            function(module3, exports3) {
              module3.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;
            }
          ),
          /***/
          "90e3": (
            /***/
            function(module3, exports3) {
              var id = 0;
              var postfix = Math.random();
              module3.exports = function(key) {
                return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
              };
            }
          ),
          /***/
          "9112": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var definePropertyModule = __webpack_require__("9bf2");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              module3.exports = DESCRIPTORS ? function(object, key, value) {
                return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
              } : function(object, key, value) {
                object[key] = value;
                return object;
              };
            }
          ),
          /***/
          "9263": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var regexpFlags = __webpack_require__("ad6d");
              var stickyHelpers = __webpack_require__("9f7f");
              var nativeExec = RegExp.prototype.exec;
              var nativeReplace = String.prototype.replace;
              var patchedExec = nativeExec;
              var UPDATES_LAST_INDEX_WRONG = function() {
                var re1 = /a/;
                var re2 = /b*/g;
                nativeExec.call(re1, "a");
                nativeExec.call(re2, "a");
                return re1.lastIndex !== 0 || re2.lastIndex !== 0;
              }();
              var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;
              var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
              var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;
              if (PATCH) {
                patchedExec = function exec(str) {
                  var re = this;
                  var lastIndex, reCopy, match2, i;
                  var sticky = UNSUPPORTED_Y && re.sticky;
                  var flags = regexpFlags.call(re);
                  var source = re.source;
                  var charsAdded = 0;
                  var strCopy = str;
                  if (sticky) {
                    flags = flags.replace("y", "");
                    if (flags.indexOf("g") === -1) {
                      flags += "g";
                    }
                    strCopy = String(str).slice(re.lastIndex);
                    if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== "\n")) {
                      source = "(?: " + source + ")";
                      strCopy = " " + strCopy;
                      charsAdded++;
                    }
                    reCopy = new RegExp("^(?:" + source + ")", flags);
                  }
                  if (NPCG_INCLUDED) {
                    reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
                  }
                  if (UPDATES_LAST_INDEX_WRONG)
                    lastIndex = re.lastIndex;
                  match2 = nativeExec.call(sticky ? reCopy : re, strCopy);
                  if (sticky) {
                    if (match2) {
                      match2.input = match2.input.slice(charsAdded);
                      match2[0] = match2[0].slice(charsAdded);
                      match2.index = re.lastIndex;
                      re.lastIndex += match2[0].length;
                    } else
                      re.lastIndex = 0;
                  } else if (UPDATES_LAST_INDEX_WRONG && match2) {
                    re.lastIndex = re.global ? match2.index + match2[0].length : lastIndex;
                  }
                  if (NPCG_INCLUDED && match2 && match2.length > 1) {
                    nativeReplace.call(match2[0], reCopy, function() {
                      for (i = 1; i < arguments.length - 2; i++) {
                        if (arguments[i] === void 0)
                          match2[i] = void 0;
                      }
                    });
                  }
                  return match2;
                };
              }
              module3.exports = patchedExec;
            }
          ),
          /***/
          "94ca": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var fails = __webpack_require__("d039");
              var replacement = /#|\.prototype\./;
              var isForced = function(feature, detection) {
                var value = data[normalize(feature)];
                return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails(detection) : !!detection;
              };
              var normalize = isForced.normalize = function(string) {
                return String(string).replace(replacement, ".").toLowerCase();
              };
              var data = isForced.data = {};
              var NATIVE = isForced.NATIVE = "N";
              var POLYFILL = isForced.POLYFILL = "P";
              module3.exports = isForced;
            }
          ),
          /***/
          "99af": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var fails = __webpack_require__("d039");
              var isArray = __webpack_require__("e8b5");
              var isObject2 = __webpack_require__("861d");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var createProperty = __webpack_require__("8418");
              var arraySpeciesCreate = __webpack_require__("65f0");
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var wellKnownSymbol = __webpack_require__("b622");
              var V8_VERSION = __webpack_require__("2d00");
              var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
              var MAX_SAFE_INTEGER = 9007199254740991;
              var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
              var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
                var array = [];
                array[IS_CONCAT_SPREADABLE] = false;
                return array.concat()[0] !== array;
              });
              var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("concat");
              var isConcatSpreadable = function(O) {
                if (!isObject2(O))
                  return false;
                var spreadable = O[IS_CONCAT_SPREADABLE];
                return spreadable !== void 0 ? !!spreadable : isArray(O);
              };
              var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
              $({ target: "Array", proto: true, forced: FORCED }, {
                concat: function concat(arg) {
                  var O = toObject(this);
                  var A = arraySpeciesCreate(O, 0);
                  var n = 0;
                  var i, k, length, len, E;
                  for (i = -1, length = arguments.length; i < length; i++) {
                    E = i === -1 ? O : arguments[i];
                    if (isConcatSpreadable(E)) {
                      len = toLength(E.length);
                      if (n + len > MAX_SAFE_INTEGER)
                        throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                      for (k = 0; k < len; k++, n++)
                        if (k in E)
                          createProperty(A, n, E[k]);
                    } else {
                      if (n >= MAX_SAFE_INTEGER)
                        throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                      createProperty(A, n++, E);
                    }
                  }
                  A.length = n;
                  return A;
                }
              });
            }
          ),
          /***/
          "9bdd": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              module3.exports = function(iterator, fn, value, ENTRIES) {
                try {
                  return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
                } catch (error) {
                  var returnMethod = iterator["return"];
                  if (returnMethod !== void 0)
                    anObject(returnMethod.call(iterator));
                  throw error;
                }
              };
            }
          ),
          /***/
          "9bf2": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var IE8_DOM_DEFINE = __webpack_require__("0cfb");
              var anObject = __webpack_require__("825a");
              var toPrimitive = __webpack_require__("c04e");
              var nativeDefineProperty = Object.defineProperty;
              exports3.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
                anObject(O);
                P = toPrimitive(P, true);
                anObject(Attributes);
                if (IE8_DOM_DEFINE)
                  try {
                    return nativeDefineProperty(O, P, Attributes);
                  } catch (error) {
                  }
                if ("get" in Attributes || "set" in Attributes)
                  throw TypeError("Accessors not supported");
                if ("value" in Attributes)
                  O[P] = Attributes.value;
                return O;
              };
            }
          ),
          /***/
          "9ed3": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
              var create = __webpack_require__("7c73");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              var setToStringTag = __webpack_require__("d44e");
              var Iterators = __webpack_require__("3f8c");
              var returnThis = function() {
                return this;
              };
              module3.exports = function(IteratorConstructor, NAME, next) {
                var TO_STRING_TAG = NAME + " Iterator";
                IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
                setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
                Iterators[TO_STRING_TAG] = returnThis;
                return IteratorConstructor;
              };
            }
          ),
          /***/
          "9f7f": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var fails = __webpack_require__("d039");
              function RE(s, f) {
                return RegExp(s, f);
              }
              exports3.UNSUPPORTED_Y = fails(function() {
                var re = RE("a", "y");
                re.lastIndex = 2;
                return re.exec("abcd") != null;
              });
              exports3.BROKEN_CARET = fails(function() {
                var re = RE("^r", "gy");
                re.lastIndex = 2;
                return re.exec("str") != null;
              });
            }
          ),
          /***/
          "a2bf": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var isArray = __webpack_require__("e8b5");
              var toLength = __webpack_require__("50c4");
              var bind = __webpack_require__("0366");
              var flattenIntoArray = function(target, original, source, sourceLen, start, depth, mapper, thisArg) {
                var targetIndex = start;
                var sourceIndex = 0;
                var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
                var element;
                while (sourceIndex < sourceLen) {
                  if (sourceIndex in source) {
                    element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
                    if (depth > 0 && isArray(element)) {
                      targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
                    } else {
                      if (targetIndex >= 9007199254740991)
                        throw TypeError("Exceed the acceptable array length");
                      target[targetIndex] = element;
                    }
                    targetIndex++;
                  }
                  sourceIndex++;
                }
                return targetIndex;
              };
              module3.exports = flattenIntoArray;
            }
          ),
          /***/
          "a352": (
            /***/
            function(module3, exports3) {
              module3.exports = __WEBPACK_EXTERNAL_MODULE_a352__;
            }
          ),
          /***/
          "a434": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var toAbsoluteIndex = __webpack_require__("23cb");
              var toInteger = __webpack_require__("a691");
              var toLength = __webpack_require__("50c4");
              var toObject = __webpack_require__("7b0b");
              var arraySpeciesCreate = __webpack_require__("65f0");
              var createProperty = __webpack_require__("8418");
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");
              var USES_TO_LENGTH = arrayMethodUsesToLength("splice", { ACCESSORS: true, 0: 0, 1: 2 });
              var max = Math.max;
              var min = Math.min;
              var MAX_SAFE_INTEGER = 9007199254740991;
              var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                splice: function splice(start, deleteCount) {
                  var O = toObject(this);
                  var len = toLength(O.length);
                  var actualStart = toAbsoluteIndex(start, len);
                  var argumentsLength = arguments.length;
                  var insertCount, actualDeleteCount, A, k, from, to;
                  if (argumentsLength === 0) {
                    insertCount = actualDeleteCount = 0;
                  } else if (argumentsLength === 1) {
                    insertCount = 0;
                    actualDeleteCount = len - actualStart;
                  } else {
                    insertCount = argumentsLength - 2;
                    actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
                  }
                  if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
                    throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
                  }
                  A = arraySpeciesCreate(O, actualDeleteCount);
                  for (k = 0; k < actualDeleteCount; k++) {
                    from = actualStart + k;
                    if (from in O)
                      createProperty(A, k, O[from]);
                  }
                  A.length = actualDeleteCount;
                  if (insertCount < actualDeleteCount) {
                    for (k = actualStart; k < len - actualDeleteCount; k++) {
                      from = k + actualDeleteCount;
                      to = k + insertCount;
                      if (from in O)
                        O[to] = O[from];
                      else
                        delete O[to];
                    }
                    for (k = len; k > len - actualDeleteCount + insertCount; k--)
                      delete O[k - 1];
                  } else if (insertCount > actualDeleteCount) {
                    for (k = len - actualDeleteCount; k > actualStart; k--) {
                      from = k + actualDeleteCount - 1;
                      to = k + insertCount - 1;
                      if (from in O)
                        O[to] = O[from];
                      else
                        delete O[to];
                    }
                  }
                  for (k = 0; k < insertCount; k++) {
                    O[k + actualStart] = arguments[k + 2];
                  }
                  O.length = len - actualDeleteCount + insertCount;
                  return A;
                }
              });
            }
          ),
          /***/
          "a4d3": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var global2 = __webpack_require__("da84");
              var getBuiltIn = __webpack_require__("d066");
              var IS_PURE = __webpack_require__("c430");
              var DESCRIPTORS = __webpack_require__("83ab");
              var NATIVE_SYMBOL = __webpack_require__("4930");
              var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
              var fails = __webpack_require__("d039");
              var has2 = __webpack_require__("5135");
              var isArray = __webpack_require__("e8b5");
              var isObject2 = __webpack_require__("861d");
              var anObject = __webpack_require__("825a");
              var toObject = __webpack_require__("7b0b");
              var toIndexedObject = __webpack_require__("fc6a");
              var toPrimitive = __webpack_require__("c04e");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              var nativeObjectCreate = __webpack_require__("7c73");
              var objectKeys = __webpack_require__("df75");
              var getOwnPropertyNamesModule = __webpack_require__("241c");
              var getOwnPropertyNamesExternal = __webpack_require__("057f");
              var getOwnPropertySymbolsModule = __webpack_require__("7418");
              var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
              var definePropertyModule = __webpack_require__("9bf2");
              var propertyIsEnumerableModule = __webpack_require__("d1e7");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var redefine = __webpack_require__("6eeb");
              var shared = __webpack_require__("5692");
              var sharedKey = __webpack_require__("f772");
              var hiddenKeys = __webpack_require__("d012");
              var uid = __webpack_require__("90e3");
              var wellKnownSymbol = __webpack_require__("b622");
              var wrappedWellKnownSymbolModule = __webpack_require__("e538");
              var defineWellKnownSymbol = __webpack_require__("746f");
              var setToStringTag = __webpack_require__("d44e");
              var InternalStateModule = __webpack_require__("69f3");
              var $forEach = __webpack_require__("b727").forEach;
              var HIDDEN = sharedKey("hidden");
              var SYMBOL = "Symbol";
              var PROTOTYPE = "prototype";
              var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
              var setInternalState = InternalStateModule.set;
              var getInternalState = InternalStateModule.getterFor(SYMBOL);
              var ObjectPrototype = Object[PROTOTYPE];
              var $Symbol = global2.Symbol;
              var $stringify = getBuiltIn("JSON", "stringify");
              var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
              var nativeDefineProperty = definePropertyModule.f;
              var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
              var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
              var AllSymbols = shared("symbols");
              var ObjectPrototypeSymbols = shared("op-symbols");
              var StringToSymbolRegistry = shared("string-to-symbol-registry");
              var SymbolToStringRegistry = shared("symbol-to-string-registry");
              var WellKnownSymbolsStore = shared("wks");
              var QObject = global2.QObject;
              var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
              var setSymbolDescriptor = DESCRIPTORS && fails(function() {
                return nativeObjectCreate(nativeDefineProperty({}, "a", {
                  get: function() {
                    return nativeDefineProperty(this, "a", { value: 7 }).a;
                  }
                })).a != 7;
              }) ? function(O, P, Attributes) {
                var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
                if (ObjectPrototypeDescriptor)
                  delete ObjectPrototype[P];
                nativeDefineProperty(O, P, Attributes);
                if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
                  nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
                }
              } : nativeDefineProperty;
              var wrap = function(tag, description) {
                var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
                setInternalState(symbol, {
                  type: SYMBOL,
                  tag,
                  description
                });
                if (!DESCRIPTORS)
                  symbol.description = description;
                return symbol;
              };
              var isSymbol = USE_SYMBOL_AS_UID ? function(it) {
                return typeof it == "symbol";
              } : function(it) {
                return Object(it) instanceof $Symbol;
              };
              var $defineProperty = function defineProperty(O, P, Attributes) {
                if (O === ObjectPrototype)
                  $defineProperty(ObjectPrototypeSymbols, P, Attributes);
                anObject(O);
                var key = toPrimitive(P, true);
                anObject(Attributes);
                if (has2(AllSymbols, key)) {
                  if (!Attributes.enumerable) {
                    if (!has2(O, HIDDEN))
                      nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
                    O[HIDDEN][key] = true;
                  } else {
                    if (has2(O, HIDDEN) && O[HIDDEN][key])
                      O[HIDDEN][key] = false;
                    Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
                  }
                  return setSymbolDescriptor(O, key, Attributes);
                }
                return nativeDefineProperty(O, key, Attributes);
              };
              var $defineProperties = function defineProperties(O, Properties) {
                anObject(O);
                var properties = toIndexedObject(Properties);
                var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
                $forEach(keys, function(key) {
                  if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key))
                    $defineProperty(O, key, properties[key]);
                });
                return O;
              };
              var $create = function create(O, Properties) {
                return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
              };
              var $propertyIsEnumerable = function propertyIsEnumerable(V) {
                var P = toPrimitive(V, true);
                var enumerable = nativePropertyIsEnumerable.call(this, P);
                if (this === ObjectPrototype && has2(AllSymbols, P) && !has2(ObjectPrototypeSymbols, P))
                  return false;
                return enumerable || !has2(this, P) || !has2(AllSymbols, P) || has2(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
              };
              var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
                var it = toIndexedObject(O);
                var key = toPrimitive(P, true);
                if (it === ObjectPrototype && has2(AllSymbols, key) && !has2(ObjectPrototypeSymbols, key))
                  return;
                var descriptor = nativeGetOwnPropertyDescriptor(it, key);
                if (descriptor && has2(AllSymbols, key) && !(has2(it, HIDDEN) && it[HIDDEN][key])) {
                  descriptor.enumerable = true;
                }
                return descriptor;
              };
              var $getOwnPropertyNames = function getOwnPropertyNames(O) {
                var names = nativeGetOwnPropertyNames(toIndexedObject(O));
                var result = [];
                $forEach(names, function(key) {
                  if (!has2(AllSymbols, key) && !has2(hiddenKeys, key))
                    result.push(key);
                });
                return result;
              };
              var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
                var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
                var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
                var result = [];
                $forEach(names, function(key) {
                  if (has2(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has2(ObjectPrototype, key))) {
                    result.push(AllSymbols[key]);
                  }
                });
                return result;
              };
              if (!NATIVE_SYMBOL) {
                $Symbol = function Symbol2() {
                  if (this instanceof $Symbol)
                    throw TypeError("Symbol is not a constructor");
                  var description = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]);
                  var tag = uid(description);
                  var setter = function(value) {
                    if (this === ObjectPrototype)
                      setter.call(ObjectPrototypeSymbols, value);
                    if (has2(this, HIDDEN) && has2(this[HIDDEN], tag))
                      this[HIDDEN][tag] = false;
                    setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
                  };
                  if (DESCRIPTORS && USE_SETTER)
                    setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
                  return wrap(tag, description);
                };
                redefine($Symbol[PROTOTYPE], "toString", function toString() {
                  return getInternalState(this).tag;
                });
                redefine($Symbol, "withoutSetter", function(description) {
                  return wrap(uid(description), description);
                });
                propertyIsEnumerableModule.f = $propertyIsEnumerable;
                definePropertyModule.f = $defineProperty;
                getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
                getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
                getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
                wrappedWellKnownSymbolModule.f = function(name) {
                  return wrap(wellKnownSymbol(name), name);
                };
                if (DESCRIPTORS) {
                  nativeDefineProperty($Symbol[PROTOTYPE], "description", {
                    configurable: true,
                    get: function description() {
                      return getInternalState(this).description;
                    }
                  });
                  if (!IS_PURE) {
                    redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
                  }
                }
              }
              $({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
                Symbol: $Symbol
              });
              $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
                defineWellKnownSymbol(name);
              });
              $({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
                // `Symbol.for` method
                // https://tc39.github.io/ecma262/#sec-symbol.for
                "for": function(key) {
                  var string = String(key);
                  if (has2(StringToSymbolRegistry, string))
                    return StringToSymbolRegistry[string];
                  var symbol = $Symbol(string);
                  StringToSymbolRegistry[string] = symbol;
                  SymbolToStringRegistry[symbol] = string;
                  return symbol;
                },
                // `Symbol.keyFor` method
                // https://tc39.github.io/ecma262/#sec-symbol.keyfor
                keyFor: function keyFor(sym) {
                  if (!isSymbol(sym))
                    throw TypeError(sym + " is not a symbol");
                  if (has2(SymbolToStringRegistry, sym))
                    return SymbolToStringRegistry[sym];
                },
                useSetter: function() {
                  USE_SETTER = true;
                },
                useSimple: function() {
                  USE_SETTER = false;
                }
              });
              $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
                // `Object.create` method
                // https://tc39.github.io/ecma262/#sec-object.create
                create: $create,
                // `Object.defineProperty` method
                // https://tc39.github.io/ecma262/#sec-object.defineproperty
                defineProperty: $defineProperty,
                // `Object.defineProperties` method
                // https://tc39.github.io/ecma262/#sec-object.defineproperties
                defineProperties: $defineProperties,
                // `Object.getOwnPropertyDescriptor` method
                // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
                getOwnPropertyDescriptor: $getOwnPropertyDescriptor
              });
              $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
                // `Object.getOwnPropertyNames` method
                // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
                getOwnPropertyNames: $getOwnPropertyNames,
                // `Object.getOwnPropertySymbols` method
                // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
                getOwnPropertySymbols: $getOwnPropertySymbols
              });
              $({ target: "Object", stat: true, forced: fails(function() {
                getOwnPropertySymbolsModule.f(1);
              }) }, {
                getOwnPropertySymbols: function getOwnPropertySymbols(it) {
                  return getOwnPropertySymbolsModule.f(toObject(it));
                }
              });
              if ($stringify) {
                var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function() {
                  var symbol = $Symbol();
                  return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
                });
                $({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
                  // eslint-disable-next-line no-unused-vars
                  stringify: function stringify(it, replacer, space) {
                    var args = [it];
                    var index2 = 1;
                    var $replacer;
                    while (arguments.length > index2)
                      args.push(arguments[index2++]);
                    $replacer = replacer;
                    if (!isObject2(replacer) && it === void 0 || isSymbol(it))
                      return;
                    if (!isArray(replacer))
                      replacer = function(key, value) {
                        if (typeof $replacer == "function")
                          value = $replacer.call(this, key, value);
                        if (!isSymbol(value))
                          return value;
                      };
                    args[1] = replacer;
                    return $stringify.apply(null, args);
                  }
                });
              }
              if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
                createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
              }
              setToStringTag($Symbol, SYMBOL);
              hiddenKeys[HIDDEN] = true;
            }
          ),
          /***/
          "a630": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var from = __webpack_require__("4df4");
              var checkCorrectnessOfIteration = __webpack_require__("1c7e");
              var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
                Array.from(iterable);
              });
              $({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
                from
              });
            }
          ),
          /***/
          "a640": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module3.exports = function(METHOD_NAME, argument) {
                var method = [][METHOD_NAME];
                return !!method && fails(function() {
                  method.call(null, argument || function() {
                    throw 1;
                  }, 1);
                });
              };
            }
          ),
          /***/
          "a691": (
            /***/
            function(module3, exports3) {
              var ceil = Math.ceil;
              var floor = Math.floor;
              module3.exports = function(argument) {
                return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
              };
            }
          ),
          /***/
          "ab13": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var MATCH = wellKnownSymbol("match");
              module3.exports = function(METHOD_NAME) {
                var regexp = /./;
                try {
                  "/./"[METHOD_NAME](regexp);
                } catch (e) {
                  try {
                    regexp[MATCH] = false;
                    return "/./"[METHOD_NAME](regexp);
                  } catch (f) {
                  }
                }
                return false;
              };
            }
          ),
          /***/
          "ac1f": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var exec = __webpack_require__("9263");
              $({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
                exec
              });
            }
          ),
          /***/
          "ad6d": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              module3.exports = function() {
                var that = anObject(this);
                var result = "";
                if (that.global)
                  result += "g";
                if (that.ignoreCase)
                  result += "i";
                if (that.multiline)
                  result += "m";
                if (that.dotAll)
                  result += "s";
                if (that.unicode)
                  result += "u";
                if (that.sticky)
                  result += "y";
                return result;
              };
            }
          ),
          /***/
          "ae40": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var fails = __webpack_require__("d039");
              var has2 = __webpack_require__("5135");
              var defineProperty = Object.defineProperty;
              var cache = {};
              var thrower = function(it) {
                throw it;
              };
              module3.exports = function(METHOD_NAME, options) {
                if (has2(cache, METHOD_NAME))
                  return cache[METHOD_NAME];
                if (!options)
                  options = {};
                var method = [][METHOD_NAME];
                var ACCESSORS = has2(options, "ACCESSORS") ? options.ACCESSORS : false;
                var argument0 = has2(options, 0) ? options[0] : thrower;
                var argument1 = has2(options, 1) ? options[1] : void 0;
                return cache[METHOD_NAME] = !!method && !fails(function() {
                  if (ACCESSORS && !DESCRIPTORS)
                    return true;
                  var O = { length: -1 };
                  if (ACCESSORS)
                    defineProperty(O, 1, { enumerable: true, get: thrower });
                  else
                    O[1] = 1;
                  method.call(O, argument0, argument1);
                });
              };
            }
          ),
          /***/
          "ae93": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var getPrototypeOf = __webpack_require__("e163");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var has2 = __webpack_require__("5135");
              var wellKnownSymbol = __webpack_require__("b622");
              var IS_PURE = __webpack_require__("c430");
              var ITERATOR = wellKnownSymbol("iterator");
              var BUGGY_SAFARI_ITERATORS = false;
              var returnThis = function() {
                return this;
              };
              var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
              if ([].keys) {
                arrayIterator = [].keys();
                if (!("next" in arrayIterator))
                  BUGGY_SAFARI_ITERATORS = true;
                else {
                  PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
                  if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
                    IteratorPrototype = PrototypeOfArrayIteratorPrototype;
                }
              }
              if (IteratorPrototype == void 0)
                IteratorPrototype = {};
              if (!IS_PURE && !has2(IteratorPrototype, ITERATOR)) {
                createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
              }
              module3.exports = {
                IteratorPrototype,
                BUGGY_SAFARI_ITERATORS
              };
            }
          ),
          /***/
          "b041": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
              var classof = __webpack_require__("f5df");
              module3.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
                return "[object " + classof(this) + "]";
              };
            }
          ),
          /***/
          "b0c0": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var defineProperty = __webpack_require__("9bf2").f;
              var FunctionPrototype = Function.prototype;
              var FunctionPrototypeToString = FunctionPrototype.toString;
              var nameRE = /^\s*function ([^ (]*)/;
              var NAME = "name";
              if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
                defineProperty(FunctionPrototype, NAME, {
                  configurable: true,
                  get: function() {
                    try {
                      return FunctionPrototypeToString.call(this).match(nameRE)[1];
                    } catch (error) {
                      return "";
                    }
                  }
                });
              }
            }
          ),
          /***/
          "b622": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var shared = __webpack_require__("5692");
              var has2 = __webpack_require__("5135");
              var uid = __webpack_require__("90e3");
              var NATIVE_SYMBOL = __webpack_require__("4930");
              var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
              var WellKnownSymbolsStore = shared("wks");
              var Symbol2 = global2.Symbol;
              var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
              module3.exports = function(name) {
                if (!has2(WellKnownSymbolsStore, name)) {
                  if (NATIVE_SYMBOL && has2(Symbol2, name))
                    WellKnownSymbolsStore[name] = Symbol2[name];
                  else
                    WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
                }
                return WellKnownSymbolsStore[name];
              };
            }
          ),
          /***/
          "b64b": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var toObject = __webpack_require__("7b0b");
              var nativeKeys = __webpack_require__("df75");
              var fails = __webpack_require__("d039");
              var FAILS_ON_PRIMITIVES = fails(function() {
                nativeKeys(1);
              });
              $({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
                keys: function keys(it) {
                  return nativeKeys(toObject(it));
                }
              });
            }
          ),
          /***/
          "b727": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var bind = __webpack_require__("0366");
              var IndexedObject = __webpack_require__("44ad");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var arraySpeciesCreate = __webpack_require__("65f0");
              var push = [].push;
              var createMethod = function(TYPE) {
                var IS_MAP = TYPE == 1;
                var IS_FILTER = TYPE == 2;
                var IS_SOME = TYPE == 3;
                var IS_EVERY = TYPE == 4;
                var IS_FIND_INDEX = TYPE == 6;
                var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
                return function($this, callbackfn, that, specificCreate) {
                  var O = toObject($this);
                  var self2 = IndexedObject(O);
                  var boundFunction = bind(callbackfn, that, 3);
                  var length = toLength(self2.length);
                  var index2 = 0;
                  var create = specificCreate || arraySpeciesCreate;
                  var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : void 0;
                  var value, result;
                  for (; length > index2; index2++)
                    if (NO_HOLES || index2 in self2) {
                      value = self2[index2];
                      result = boundFunction(value, index2, O);
                      if (TYPE) {
                        if (IS_MAP)
                          target[index2] = result;
                        else if (result)
                          switch (TYPE) {
                            case 3:
                              return true;
                            case 5:
                              return value;
                            case 6:
                              return index2;
                            case 2:
                              push.call(target, value);
                          }
                        else if (IS_EVERY)
                          return false;
                      }
                    }
                  return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
                };
              };
              module3.exports = {
                // `Array.prototype.forEach` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
                forEach: createMethod(0),
                // `Array.prototype.map` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.map
                map: createMethod(1),
                // `Array.prototype.filter` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.filter
                filter: createMethod(2),
                // `Array.prototype.some` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.some
                some: createMethod(3),
                // `Array.prototype.every` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.every
                every: createMethod(4),
                // `Array.prototype.find` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.find
                find: createMethod(5),
                // `Array.prototype.findIndex` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
                findIndex: createMethod(6)
              };
            }
          ),
          /***/
          "c04e": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              module3.exports = function(input, PREFERRED_STRING) {
                if (!isObject2(input))
                  return input;
                var fn, val;
                if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input)))
                  return val;
                if (typeof (fn = input.valueOf) == "function" && !isObject2(val = fn.call(input)))
                  return val;
                if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input)))
                  return val;
                throw TypeError("Can't convert object to primitive value");
              };
            }
          ),
          /***/
          "c430": (
            /***/
            function(module3, exports3) {
              module3.exports = false;
            }
          ),
          /***/
          "c6b6": (
            /***/
            function(module3, exports3) {
              var toString = {}.toString;
              module3.exports = function(it) {
                return toString.call(it).slice(8, -1);
              };
            }
          ),
          /***/
          "c6cd": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var setGlobal = __webpack_require__("ce4e");
              var SHARED = "__core-js_shared__";
              var store = global2[SHARED] || setGlobal(SHARED, {});
              module3.exports = store;
            }
          ),
          /***/
          "c740": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $findIndex = __webpack_require__("b727").findIndex;
              var addToUnscopables = __webpack_require__("44d2");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var FIND_INDEX = "findIndex";
              var SKIPS_HOLES = true;
              var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);
              if (FIND_INDEX in [])
                Array(1)[FIND_INDEX](function() {
                  SKIPS_HOLES = false;
                });
              $({ target: "Array", proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
                findIndex: function findIndex2(callbackfn) {
                  return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
              addToUnscopables(FIND_INDEX);
            }
          ),
          /***/
          "c8ba": (
            /***/
            function(module3, exports3) {
              var g;
              g = /* @__PURE__ */ function() {
                return this;
              }();
              try {
                g = g || new Function("return this")();
              } catch (e) {
                if (typeof window === "object")
                  g = window;
              }
              module3.exports = g;
            }
          ),
          /***/
          "c975": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $indexOf = __webpack_require__("4d64").indexOf;
              var arrayMethodIsStrict = __webpack_require__("a640");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var nativeIndexOf = [].indexOf;
              var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
              var STRICT_METHOD = arrayMethodIsStrict("indexOf");
              var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
              $({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
                indexOf: function indexOf(searchElement) {
                  return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            }
          ),
          /***/
          "ca84": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var has2 = __webpack_require__("5135");
              var toIndexedObject = __webpack_require__("fc6a");
              var indexOf = __webpack_require__("4d64").indexOf;
              var hiddenKeys = __webpack_require__("d012");
              module3.exports = function(object, names) {
                var O = toIndexedObject(object);
                var i = 0;
                var result = [];
                var key;
                for (key in O)
                  !has2(hiddenKeys, key) && has2(O, key) && result.push(key);
                while (names.length > i)
                  if (has2(O, key = names[i++])) {
                    ~indexOf(result, key) || result.push(key);
                  }
                return result;
              };
            }
          ),
          /***/
          "caad": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $includes = __webpack_require__("4d64").includes;
              var addToUnscopables = __webpack_require__("44d2");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
              $({ target: "Array", proto: true, forced: !USES_TO_LENGTH }, {
                includes: function includes2(el) {
                  return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
              addToUnscopables("includes");
            }
          ),
          /***/
          "cc12": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var isObject2 = __webpack_require__("861d");
              var document2 = global2.document;
              var EXISTS = isObject2(document2) && isObject2(document2.createElement);
              module3.exports = function(it) {
                return EXISTS ? document2.createElement(it) : {};
              };
            }
          ),
          /***/
          "ce4e": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var createNonEnumerableProperty = __webpack_require__("9112");
              module3.exports = function(key, value) {
                try {
                  createNonEnumerableProperty(global2, key, value);
                } catch (error) {
                  global2[key] = value;
                }
                return value;
              };
            }
          ),
          /***/
          "d012": (
            /***/
            function(module3, exports3) {
              module3.exports = {};
            }
          ),
          /***/
          "d039": (
            /***/
            function(module3, exports3) {
              module3.exports = function(exec) {
                try {
                  return !!exec();
                } catch (error) {
                  return true;
                }
              };
            }
          ),
          /***/
          "d066": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var path = __webpack_require__("428f");
              var global2 = __webpack_require__("da84");
              var aFunction = function(variable) {
                return typeof variable == "function" ? variable : void 0;
              };
              module3.exports = function(namespace, method) {
                return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global2[namespace]) : path[namespace] && path[namespace][method] || global2[namespace] && global2[namespace][method];
              };
            }
          ),
          /***/
          "d1e7": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
              var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
              var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
              exports3.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
                var descriptor = getOwnPropertyDescriptor(this, V);
                return !!descriptor && descriptor.enumerable;
              } : nativePropertyIsEnumerable;
            }
          ),
          /***/
          "d28b": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var defineWellKnownSymbol = __webpack_require__("746f");
              defineWellKnownSymbol("iterator");
            }
          ),
          /***/
          "d2bb": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              var aPossiblePrototype = __webpack_require__("3bbe");
              module3.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
                var CORRECT_SETTER = false;
                var test = {};
                var setter;
                try {
                  setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
                  setter.call(test, []);
                  CORRECT_SETTER = test instanceof Array;
                } catch (error) {
                }
                return function setPrototypeOf(O, proto) {
                  anObject(O);
                  aPossiblePrototype(proto);
                  if (CORRECT_SETTER)
                    setter.call(O, proto);
                  else
                    O.__proto__ = proto;
                  return O;
                };
              }() : void 0);
            }
          ),
          /***/
          "d3b7": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
              var redefine = __webpack_require__("6eeb");
              var toString = __webpack_require__("b041");
              if (!TO_STRING_TAG_SUPPORT) {
                redefine(Object.prototype, "toString", toString, { unsafe: true });
              }
            }
          ),
          /***/
          "d44e": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var defineProperty = __webpack_require__("9bf2").f;
              var has2 = __webpack_require__("5135");
              var wellKnownSymbol = __webpack_require__("b622");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              module3.exports = function(it, TAG, STATIC) {
                if (it && !has2(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
                  defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
                }
              };
            }
          ),
          /***/
          "d58f": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var aFunction = __webpack_require__("1c0b");
              var toObject = __webpack_require__("7b0b");
              var IndexedObject = __webpack_require__("44ad");
              var toLength = __webpack_require__("50c4");
              var createMethod = function(IS_RIGHT) {
                return function(that, callbackfn, argumentsLength, memo) {
                  aFunction(callbackfn);
                  var O = toObject(that);
                  var self2 = IndexedObject(O);
                  var length = toLength(O.length);
                  var index2 = IS_RIGHT ? length - 1 : 0;
                  var i = IS_RIGHT ? -1 : 1;
                  if (argumentsLength < 2)
                    while (true) {
                      if (index2 in self2) {
                        memo = self2[index2];
                        index2 += i;
                        break;
                      }
                      index2 += i;
                      if (IS_RIGHT ? index2 < 0 : length <= index2) {
                        throw TypeError("Reduce of empty array with no initial value");
                      }
                    }
                  for (; IS_RIGHT ? index2 >= 0 : length > index2; index2 += i)
                    if (index2 in self2) {
                      memo = callbackfn(memo, self2[index2], index2, O);
                    }
                  return memo;
                };
              };
              module3.exports = {
                // `Array.prototype.reduce` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
                left: createMethod(false),
                // `Array.prototype.reduceRight` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
                right: createMethod(true)
              };
            }
          ),
          /***/
          "d784": (
            /***/
            function(module3, exports3, __webpack_require__) {
              __webpack_require__("ac1f");
              var redefine = __webpack_require__("6eeb");
              var fails = __webpack_require__("d039");
              var wellKnownSymbol = __webpack_require__("b622");
              var regexpExec = __webpack_require__("9263");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var SPECIES = wellKnownSymbol("species");
              var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
                var re = /./;
                re.exec = function() {
                  var result = [];
                  result.groups = { a: "7" };
                  return result;
                };
                return "".replace(re, "$<a>") !== "7";
              });
              var REPLACE_KEEPS_$0 = function() {
                return "a".replace(/./, "$0") === "$0";
              }();
              var REPLACE = wellKnownSymbol("replace");
              var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
                if (/./[REPLACE]) {
                  return /./[REPLACE]("a", "$0") === "";
                }
                return false;
              }();
              var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function() {
                var re = /(?:)/;
                var originalExec = re.exec;
                re.exec = function() {
                  return originalExec.apply(this, arguments);
                };
                var result = "ab".split(re);
                return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
              });
              module3.exports = function(KEY, length, exec, sham) {
                var SYMBOL = wellKnownSymbol(KEY);
                var DELEGATES_TO_SYMBOL = !fails(function() {
                  var O = {};
                  O[SYMBOL] = function() {
                    return 7;
                  };
                  return ""[KEY](O) != 7;
                });
                var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function() {
                  var execCalled = false;
                  var re = /a/;
                  if (KEY === "split") {
                    re = {};
                    re.constructor = {};
                    re.constructor[SPECIES] = function() {
                      return re;
                    };
                    re.flags = "";
                    re[SYMBOL] = /./[SYMBOL];
                  }
                  re.exec = function() {
                    execCalled = true;
                    return null;
                  };
                  re[SYMBOL]("");
                  return !execCalled;
                });
                if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === "replace" && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
                  var nativeRegExpMethod = /./[SYMBOL];
                  var methods = exec(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
                    if (regexp.exec === regexpExec) {
                      if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                        return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
                      }
                      return { done: true, value: nativeMethod.call(str, regexp, arg2) };
                    }
                    return { done: false };
                  }, {
                    REPLACE_KEEPS_$0,
                    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
                  });
                  var stringMethod = methods[0];
                  var regexMethod = methods[1];
                  redefine(String.prototype, KEY, stringMethod);
                  redefine(
                    RegExp.prototype,
                    SYMBOL,
                    length == 2 ? function(string, arg) {
                      return regexMethod.call(string, this, arg);
                    } : function(string) {
                      return regexMethod.call(string, this);
                    }
                  );
                }
                if (sham)
                  createNonEnumerableProperty(RegExp.prototype[SYMBOL], "sham", true);
              };
            }
          ),
          /***/
          "d81d": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $map = __webpack_require__("b727").map;
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");
              var USES_TO_LENGTH = arrayMethodUsesToLength("map");
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                map: function map(callbackfn) {
                  return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            }
          ),
          /***/
          "da84": (
            /***/
            function(module3, exports3, __webpack_require__) {
              (function(global2) {
                var check = function(it) {
                  return it && it.Math == Math && it;
                };
                module3.exports = // eslint-disable-next-line no-undef
                check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global2 == "object" && global2) || // eslint-disable-next-line no-new-func
                Function("return this")();
              }).call(this, __webpack_require__("c8ba"));
            }
          ),
          /***/
          "dbb4": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var DESCRIPTORS = __webpack_require__("83ab");
              var ownKeys2 = __webpack_require__("56ef");
              var toIndexedObject = __webpack_require__("fc6a");
              var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
              var createProperty = __webpack_require__("8418");
              $({ target: "Object", stat: true, sham: !DESCRIPTORS }, {
                getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
                  var O = toIndexedObject(object);
                  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
                  var keys = ownKeys2(O);
                  var result = {};
                  var index2 = 0;
                  var key, descriptor;
                  while (keys.length > index2) {
                    descriptor = getOwnPropertyDescriptor(O, key = keys[index2++]);
                    if (descriptor !== void 0)
                      createProperty(result, key, descriptor);
                  }
                  return result;
                }
              });
            }
          ),
          /***/
          "dbf1": (
            /***/
            function(module3, __webpack_exports__, __webpack_require__) {
              (function(global2) {
                __webpack_require__.d(__webpack_exports__, "a", function() {
                  return console2;
                });
                function getConsole() {
                  if (typeof window !== "undefined") {
                    return window.console;
                  }
                  return global2.console;
                }
                var console2 = getConsole();
              }).call(this, __webpack_require__("c8ba"));
            }
          ),
          /***/
          "ddb0": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var global2 = __webpack_require__("da84");
              var DOMIterables = __webpack_require__("fdbc");
              var ArrayIteratorMethods = __webpack_require__("e260");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var wellKnownSymbol = __webpack_require__("b622");
              var ITERATOR = wellKnownSymbol("iterator");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              var ArrayValues = ArrayIteratorMethods.values;
              for (var COLLECTION_NAME in DOMIterables) {
                var Collection = global2[COLLECTION_NAME];
                var CollectionPrototype = Collection && Collection.prototype;
                if (CollectionPrototype) {
                  if (CollectionPrototype[ITERATOR] !== ArrayValues)
                    try {
                      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
                    } catch (error) {
                      CollectionPrototype[ITERATOR] = ArrayValues;
                    }
                  if (!CollectionPrototype[TO_STRING_TAG]) {
                    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
                  }
                  if (DOMIterables[COLLECTION_NAME])
                    for (var METHOD_NAME in ArrayIteratorMethods) {
                      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
                        try {
                          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
                        } catch (error) {
                          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
                        }
                    }
                }
              }
            }
          ),
          /***/
          "df75": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var internalObjectKeys = __webpack_require__("ca84");
              var enumBugKeys = __webpack_require__("7839");
              module3.exports = Object.keys || function keys(O) {
                return internalObjectKeys(O, enumBugKeys);
              };
            }
          ),
          /***/
          "e01a": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var DESCRIPTORS = __webpack_require__("83ab");
              var global2 = __webpack_require__("da84");
              var has2 = __webpack_require__("5135");
              var isObject2 = __webpack_require__("861d");
              var defineProperty = __webpack_require__("9bf2").f;
              var copyConstructorProperties = __webpack_require__("e893");
              var NativeSymbol = global2.Symbol;
              if (DESCRIPTORS && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || // Safari 12 bug
              NativeSymbol().description !== void 0)) {
                var EmptyStringDescriptionStore = {};
                var SymbolWrapper = function Symbol2() {
                  var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]);
                  var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
                  if (description === "")
                    EmptyStringDescriptionStore[result] = true;
                  return result;
                };
                copyConstructorProperties(SymbolWrapper, NativeSymbol);
                var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
                symbolPrototype.constructor = SymbolWrapper;
                var symbolToString = symbolPrototype.toString;
                var native = String(NativeSymbol("test")) == "Symbol(test)";
                var regexp = /^Symbol\((.*)\)[^)]+$/;
                defineProperty(symbolPrototype, "description", {
                  configurable: true,
                  get: function description() {
                    var symbol = isObject2(this) ? this.valueOf() : this;
                    var string = symbolToString.call(symbol);
                    if (has2(EmptyStringDescriptionStore, symbol))
                      return "";
                    var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
                    return desc === "" ? void 0 : desc;
                  }
                });
                $({ global: true, forced: true }, {
                  Symbol: SymbolWrapper
                });
              }
            }
          ),
          /***/
          "e163": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var has2 = __webpack_require__("5135");
              var toObject = __webpack_require__("7b0b");
              var sharedKey = __webpack_require__("f772");
              var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");
              var IE_PROTO = sharedKey("IE_PROTO");
              var ObjectPrototype = Object.prototype;
              module3.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
                O = toObject(O);
                if (has2(O, IE_PROTO))
                  return O[IE_PROTO];
                if (typeof O.constructor == "function" && O instanceof O.constructor) {
                  return O.constructor.prototype;
                }
                return O instanceof Object ? ObjectPrototype : null;
              };
            }
          ),
          /***/
          "e177": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module3.exports = !fails(function() {
                function F() {
                }
                F.prototype.constructor = null;
                return Object.getPrototypeOf(new F()) !== F.prototype;
              });
            }
          ),
          /***/
          "e260": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var toIndexedObject = __webpack_require__("fc6a");
              var addToUnscopables = __webpack_require__("44d2");
              var Iterators = __webpack_require__("3f8c");
              var InternalStateModule = __webpack_require__("69f3");
              var defineIterator = __webpack_require__("7dd0");
              var ARRAY_ITERATOR = "Array Iterator";
              var setInternalState = InternalStateModule.set;
              var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
              module3.exports = defineIterator(Array, "Array", function(iterated, kind) {
                setInternalState(this, {
                  type: ARRAY_ITERATOR,
                  target: toIndexedObject(iterated),
                  // target
                  index: 0,
                  // next index
                  kind
                  // kind
                });
              }, function() {
                var state = getInternalState(this);
                var target = state.target;
                var kind = state.kind;
                var index2 = state.index++;
                if (!target || index2 >= target.length) {
                  state.target = void 0;
                  return { value: void 0, done: true };
                }
                if (kind == "keys")
                  return { value: index2, done: false };
                if (kind == "values")
                  return { value: target[index2], done: false };
                return { value: [index2, target[index2]], done: false };
              }, "values");
              Iterators.Arguments = Iterators.Array;
              addToUnscopables("keys");
              addToUnscopables("values");
              addToUnscopables("entries");
            }
          ),
          /***/
          "e439": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var fails = __webpack_require__("d039");
              var toIndexedObject = __webpack_require__("fc6a");
              var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
              var DESCRIPTORS = __webpack_require__("83ab");
              var FAILS_ON_PRIMITIVES = fails(function() {
                nativeGetOwnPropertyDescriptor(1);
              });
              var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;
              $({ target: "Object", stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
                getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
                  return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
                }
              });
            }
          ),
          /***/
          "e538": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              exports3.f = wellKnownSymbol;
            }
          ),
          /***/
          "e893": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var has2 = __webpack_require__("5135");
              var ownKeys2 = __webpack_require__("56ef");
              var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
              var definePropertyModule = __webpack_require__("9bf2");
              module3.exports = function(target, source) {
                var keys = ownKeys2(source);
                var defineProperty = definePropertyModule.f;
                var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
                for (var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  if (!has2(target, key))
                    defineProperty(target, key, getOwnPropertyDescriptor(source, key));
                }
              };
            }
          ),
          /***/
          "e8b5": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var classof = __webpack_require__("c6b6");
              module3.exports = Array.isArray || function isArray(arg) {
                return classof(arg) == "Array";
              };
            }
          ),
          /***/
          "e95a": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var Iterators = __webpack_require__("3f8c");
              var ITERATOR = wellKnownSymbol("iterator");
              var ArrayPrototype = Array.prototype;
              module3.exports = function(it) {
                return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
              };
            }
          ),
          /***/
          "f5df": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
              var classofRaw = __webpack_require__("c6b6");
              var wellKnownSymbol = __webpack_require__("b622");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              var CORRECT_ARGUMENTS = classofRaw(/* @__PURE__ */ function() {
                return arguments;
              }()) == "Arguments";
              var tryGet = function(it, key) {
                try {
                  return it[key];
                } catch (error) {
                }
              };
              module3.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
                var O, tag, result;
                return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
              };
            }
          ),
          /***/
          "f772": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var shared = __webpack_require__("5692");
              var uid = __webpack_require__("90e3");
              var keys = shared("keys");
              module3.exports = function(key) {
                return keys[key] || (keys[key] = uid(key));
              };
            }
          ),
          /***/
          "fb15": (
            /***/
            function(module3, __webpack_exports__, __webpack_require__) {
              __webpack_require__.r(__webpack_exports__);
              if (typeof window !== "undefined") {
                var currentScript = window.document.currentScript;
                {
                  var getCurrentScript = __webpack_require__("8875");
                  currentScript = getCurrentScript();
                  if (!("currentScript" in document)) {
                    Object.defineProperty(document, "currentScript", { get: getCurrentScript });
                  }
                }
                var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
                if (src) {
                  __webpack_require__.p = src[1];
                }
              }
              __webpack_require__("99af");
              __webpack_require__("4de4");
              __webpack_require__("4160");
              __webpack_require__("c975");
              __webpack_require__("d81d");
              __webpack_require__("a434");
              __webpack_require__("159b");
              __webpack_require__("a4d3");
              __webpack_require__("e439");
              __webpack_require__("dbb4");
              __webpack_require__("b64b");
              function _defineProperty2(obj, key, value) {
                if (key in obj) {
                  Object.defineProperty(obj, key, {
                    value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                  });
                } else {
                  obj[key] = value;
                }
                return obj;
              }
              function ownKeys2(object, enumerableOnly) {
                var keys = Object.keys(object);
                if (Object.getOwnPropertySymbols) {
                  var symbols = Object.getOwnPropertySymbols(object);
                  if (enumerableOnly)
                    symbols = symbols.filter(function(sym) {
                      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                    });
                  keys.push.apply(keys, symbols);
                }
                return keys;
              }
              function _objectSpread22(target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i] != null ? arguments[i] : {};
                  if (i % 2) {
                    ownKeys2(Object(source), true).forEach(function(key) {
                      _defineProperty2(target, key, source[key]);
                    });
                  } else if (Object.getOwnPropertyDescriptors) {
                    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
                  } else {
                    ownKeys2(Object(source)).forEach(function(key) {
                      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                    });
                  }
                }
                return target;
              }
              function _arrayWithHoles(arr) {
                if (Array.isArray(arr))
                  return arr;
              }
              __webpack_require__("e01a");
              __webpack_require__("d28b");
              __webpack_require__("e260");
              __webpack_require__("d3b7");
              __webpack_require__("3ca3");
              __webpack_require__("ddb0");
              function _iterableToArrayLimit(arr, i) {
                if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
                  return;
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = void 0;
                try {
                  for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i)
                      break;
                  }
                } catch (err) {
                  _d = true;
                  _e = err;
                } finally {
                  try {
                    if (!_n && _i["return"] != null)
                      _i["return"]();
                  } finally {
                    if (_d)
                      throw _e;
                  }
                }
                return _arr;
              }
              __webpack_require__("a630");
              __webpack_require__("fb6a");
              __webpack_require__("b0c0");
              __webpack_require__("25f0");
              function _arrayLikeToArray2(arr, len) {
                if (len == null || len > arr.length)
                  len = arr.length;
                for (var i = 0, arr2 = new Array(len); i < len; i++) {
                  arr2[i] = arr[i];
                }
                return arr2;
              }
              function _unsupportedIterableToArray2(o, minLen) {
                if (!o)
                  return;
                if (typeof o === "string")
                  return _arrayLikeToArray2(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                if (n === "Object" && o.constructor)
                  n = o.constructor.name;
                if (n === "Map" || n === "Set")
                  return Array.from(o);
                if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                  return _arrayLikeToArray2(o, minLen);
              }
              function _nonIterableRest() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
              }
              function _slicedToArray(arr, i) {
                return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest();
              }
              function _arrayWithoutHoles2(arr) {
                if (Array.isArray(arr))
                  return _arrayLikeToArray2(arr);
              }
              function _iterableToArray2(iter) {
                if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
                  return Array.from(iter);
              }
              function _nonIterableSpread2() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
              }
              function _toConsumableArray2(arr) {
                return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread2();
              }
              var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
              var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /* @__PURE__ */ __webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);
              function removeNode(node) {
                if (node.parentElement !== null) {
                  node.parentElement.removeChild(node);
                }
              }
              function insertNodeAt(fatherNode, node, position) {
                var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
                fatherNode.insertBefore(node, refNode);
              }
              var console2 = __webpack_require__("dbf1");
              __webpack_require__("13d5");
              __webpack_require__("4fad");
              __webpack_require__("ac1f");
              __webpack_require__("5319");
              function cached(fn) {
                var cache = /* @__PURE__ */ Object.create(null);
                return function cachedFn(str) {
                  var hit = cache[str];
                  return hit || (cache[str] = fn(str));
                };
              }
              var regex = /-(\w)/g;
              var camelize = cached(function(str) {
                return str.replace(regex, function(_, c) {
                  return c.toUpperCase();
                });
              });
              __webpack_require__("5db7");
              __webpack_require__("73d9");
              var manageAndEmit = ["Start", "Add", "Remove", "Update", "End"];
              var emit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
              var manage = ["Move"];
              var eventHandlerNames = [manage, manageAndEmit, emit].flatMap(function(events2) {
                return events2;
              }).map(function(evt) {
                return "on".concat(evt);
              });
              var events = {
                manage,
                manageAndEmit,
                emit
              };
              function isReadOnly(eventName2) {
                return eventHandlerNames.indexOf(eventName2) !== -1;
              }
              __webpack_require__("caad");
              __webpack_require__("2ca0");
              var tags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
              function isHtmlTag(name) {
                return tags.includes(name);
              }
              function isTransition(name) {
                return ["transition-group", "TransitionGroup"].includes(name);
              }
              function isHtmlAttribute(value) {
                return ["id", "class", "role", "style"].includes(value) || value.startsWith("data-") || value.startsWith("aria-") || value.startsWith("on");
              }
              function project(entries) {
                return entries.reduce(function(res, _ref) {
                  var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                  res[key] = value;
                  return res;
                }, {});
              }
              function getComponentAttributes(_ref3) {
                var $attrs = _ref3.$attrs, _ref3$componentData = _ref3.componentData, componentData = _ref3$componentData === void 0 ? {} : _ref3$componentData;
                var attributes = project(Object.entries($attrs).filter(function(_ref4) {
                  var _ref5 = _slicedToArray(_ref4, 2), key = _ref5[0];
                  _ref5[1];
                  return isHtmlAttribute(key);
                }));
                return _objectSpread22(_objectSpread22({}, attributes), componentData);
              }
              function createSortableOption(_ref6) {
                var $attrs = _ref6.$attrs, callBackBuilder = _ref6.callBackBuilder;
                var options = project(getValidSortableEntries($attrs));
                Object.entries(callBackBuilder).forEach(function(_ref7) {
                  var _ref8 = _slicedToArray(_ref7, 2), eventType = _ref8[0], eventBuilder = _ref8[1];
                  events[eventType].forEach(function(event) {
                    options["on".concat(event)] = eventBuilder(event);
                  });
                });
                var draggable2 = "[data-draggable]".concat(options.draggable || "");
                return _objectSpread22(_objectSpread22({}, options), {}, {
                  draggable: draggable2
                });
              }
              function getValidSortableEntries(value) {
                return Object.entries(value).filter(function(_ref9) {
                  var _ref10 = _slicedToArray(_ref9, 2), key = _ref10[0];
                  _ref10[1];
                  return !isHtmlAttribute(key);
                }).map(function(_ref11) {
                  var _ref12 = _slicedToArray(_ref11, 2), key = _ref12[0], value2 = _ref12[1];
                  return [camelize(key), value2];
                }).filter(function(_ref13) {
                  var _ref14 = _slicedToArray(_ref13, 2), key = _ref14[0];
                  _ref14[1];
                  return !isReadOnly(key);
                });
              }
              __webpack_require__("c740");
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              function _defineProperties(target, props2) {
                for (var i = 0; i < props2.length; i++) {
                  var descriptor = props2[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps)
                  _defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  _defineProperties(Constructor, staticProps);
                return Constructor;
              }
              var getHtmlElementFromNode = function getHtmlElementFromNode2(_ref) {
                var el = _ref.el;
                return el;
              };
              var addContext = function addContext2(domElement, context) {
                return domElement.__draggable_context = context;
              };
              var getContext = function getContext2(domElement) {
                return domElement.__draggable_context;
              };
              var componentStructure_ComponentStructure = /* @__PURE__ */ function() {
                function ComponentStructure(_ref2) {
                  var _ref2$nodes = _ref2.nodes, header = _ref2$nodes.header, defaultNodes = _ref2$nodes.default, footer = _ref2$nodes.footer, root = _ref2.root, realList = _ref2.realList;
                  _classCallCheck(this, ComponentStructure);
                  this.defaultNodes = defaultNodes;
                  this.children = [].concat(_toConsumableArray2(header), _toConsumableArray2(defaultNodes), _toConsumableArray2(footer));
                  this.externalComponent = root.externalComponent;
                  this.rootTransition = root.transition;
                  this.tag = root.tag;
                  this.realList = realList;
                }
                _createClass(ComponentStructure, [{
                  key: "render",
                  value: function render(h, attributes) {
                    var tag = this.tag, children = this.children, _isRootComponent = this._isRootComponent;
                    var option = !_isRootComponent ? children : {
                      default: function _default() {
                        return children;
                      }
                    };
                    return h(tag, attributes, option);
                  }
                }, {
                  key: "updated",
                  value: function updated2() {
                    var defaultNodes = this.defaultNodes, realList = this.realList;
                    defaultNodes.forEach(function(node, index2) {
                      addContext(getHtmlElementFromNode(node), {
                        element: realList[index2],
                        index: index2
                      });
                    });
                  }
                }, {
                  key: "getUnderlyingVm",
                  value: function getUnderlyingVm(domElement) {
                    return getContext(domElement);
                  }
                }, {
                  key: "getVmIndexFromDomIndex",
                  value: function getVmIndexFromDomIndex(domIndex, element) {
                    var defaultNodes = this.defaultNodes;
                    var length = defaultNodes.length;
                    var domChildren = element.children;
                    var domElement = domChildren.item(domIndex);
                    if (domElement === null) {
                      return length;
                    }
                    var context = getContext(domElement);
                    if (context) {
                      return context.index;
                    }
                    if (length === 0) {
                      return 0;
                    }
                    var firstDomListElement = getHtmlElementFromNode(defaultNodes[0]);
                    var indexFirstDomListElement = _toConsumableArray2(domChildren).findIndex(function(element2) {
                      return element2 === firstDomListElement;
                    });
                    return domIndex < indexFirstDomListElement ? 0 : length;
                  }
                }, {
                  key: "_isRootComponent",
                  get: function get() {
                    return this.externalComponent || this.rootTransition;
                  }
                }]);
                return ComponentStructure;
              }();
              var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
              function getSlot(slots, key) {
                var slotValue = slots[key];
                return slotValue ? slotValue() : [];
              }
              function computeNodes(_ref) {
                var $slots = _ref.$slots, realList = _ref.realList, getKey = _ref.getKey;
                var normalizedList = realList || [];
                var _map2 = ["header", "footer"].map(function(name) {
                  return getSlot($slots, name);
                }), _map22 = _slicedToArray(_map2, 2), header = _map22[0], footer = _map22[1];
                var item = $slots.item;
                if (!item) {
                  throw new Error("draggable element must have an item slot");
                }
                var defaultNodes = normalizedList.flatMap(function(element, index2) {
                  return item({
                    element,
                    index: index2
                  }).map(function(node) {
                    node.key = getKey(element);
                    node.props = _objectSpread22(_objectSpread22({}, node.props || {}), {}, {
                      "data-draggable": true
                    });
                    return node;
                  });
                });
                if (defaultNodes.length !== normalizedList.length) {
                  throw new Error("Item slot must have only one child");
                }
                return {
                  header,
                  footer,
                  default: defaultNodes
                };
              }
              function getRootInformation(tag) {
                var transition = isTransition(tag);
                var externalComponent = !isHtmlTag(tag) && !transition;
                return {
                  transition,
                  externalComponent,
                  tag: externalComponent ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])(tag) : transition ? external_commonjs_vue_commonjs2_vue_root_Vue_["TransitionGroup"] : tag
                };
              }
              function computeComponentStructure(_ref2) {
                var $slots = _ref2.$slots, tag = _ref2.tag, realList = _ref2.realList, getKey = _ref2.getKey;
                var nodes = computeNodes({
                  $slots,
                  realList,
                  getKey
                });
                var root = getRootInformation(tag);
                return new componentStructure_ComponentStructure({
                  nodes,
                  root,
                  realList
                });
              }
              function _emit(evtName, evtData) {
                var _this = this;
                Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function() {
                  return _this.$emit(evtName.toLowerCase(), evtData);
                });
              }
              function _manage(evtName) {
                var _this2 = this;
                return function(evtData, originalElement) {
                  if (_this2.realList !== null) {
                    return _this2["onDrag".concat(evtName)](evtData, originalElement);
                  }
                };
              }
              function _manageAndEmit(evtName) {
                var _this3 = this;
                var delegateCallBack = _manage.call(this, evtName);
                return function(evtData, originalElement) {
                  delegateCallBack.call(_this3, evtData, originalElement);
                  _emit.call(_this3, evtName, evtData);
                };
              }
              var draggingElement = null;
              var props = {
                list: {
                  type: Array,
                  required: false,
                  default: null
                },
                modelValue: {
                  type: Array,
                  required: false,
                  default: null
                },
                itemKey: {
                  type: [String, Function],
                  required: true
                },
                clone: {
                  type: Function,
                  default: function _default(original) {
                    return original;
                  }
                },
                tag: {
                  type: String,
                  default: "div"
                },
                move: {
                  type: Function,
                  default: null
                },
                componentData: {
                  type: Object,
                  required: false,
                  default: null
                }
              };
              var emits = ["update:modelValue", "change"].concat(_toConsumableArray2([].concat(_toConsumableArray2(events.manageAndEmit), _toConsumableArray2(events.emit)).map(function(evt) {
                return evt.toLowerCase();
              })));
              var draggableComponent = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
                name: "draggable",
                inheritAttrs: false,
                props,
                emits,
                data: function data() {
                  return {
                    error: false
                  };
                },
                render: function render() {
                  try {
                    this.error = false;
                    var $slots = this.$slots, $attrs = this.$attrs, tag = this.tag, componentData = this.componentData, realList = this.realList, getKey = this.getKey;
                    var componentStructure = computeComponentStructure({
                      $slots,
                      tag,
                      realList,
                      getKey
                    });
                    this.componentStructure = componentStructure;
                    var attributes = getComponentAttributes({
                      $attrs,
                      componentData
                    });
                    return componentStructure.render(external_commonjs_vue_commonjs2_vue_root_Vue_["h"], attributes);
                  } catch (err) {
                    this.error = true;
                    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["h"])("pre", {
                      style: {
                        color: "red"
                      }
                    }, err.stack);
                  }
                },
                created: function created() {
                  if (this.list !== null && this.modelValue !== null) {
                    console2[
                      "a"
                      /* console */
                    ].error("modelValue and list props are mutually exclusive! Please set one or another.");
                  }
                },
                mounted: function mounted2() {
                  var _this4 = this;
                  if (this.error) {
                    return;
                  }
                  var $attrs = this.$attrs, $el = this.$el, componentStructure = this.componentStructure;
                  componentStructure.updated();
                  var sortableOptions = createSortableOption({
                    $attrs,
                    callBackBuilder: {
                      manageAndEmit: function manageAndEmit2(event) {
                        return _manageAndEmit.call(_this4, event);
                      },
                      emit: function emit2(event) {
                        return _emit.bind(_this4, event);
                      },
                      manage: function manage2(event) {
                        return _manage.call(_this4, event);
                      }
                    }
                  });
                  var targetDomElement = $el.nodeType === 1 ? $el : $el.parentElement;
                  this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(targetDomElement, sortableOptions);
                  this.targetDomElement = targetDomElement;
                  targetDomElement.__draggable_component__ = this;
                },
                updated: function updated2() {
                  this.componentStructure.updated();
                },
                beforeUnmount: function beforeUnmount() {
                  if (this._sortable !== void 0)
                    this._sortable.destroy();
                },
                computed: {
                  realList: function realList() {
                    var list = this.list;
                    return list ? list : this.modelValue;
                  },
                  getKey: function getKey() {
                    var itemKey = this.itemKey;
                    if (typeof itemKey === "function") {
                      return itemKey;
                    }
                    return function(element) {
                      return element[itemKey];
                    };
                  }
                },
                watch: {
                  $attrs: {
                    handler: function handler(newOptionValue) {
                      var _sortable = this._sortable;
                      if (!_sortable)
                        return;
                      getValidSortableEntries(newOptionValue).forEach(function(_ref) {
                        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                        _sortable.option(key, value);
                      });
                    },
                    deep: true
                  }
                },
                methods: {
                  getUnderlyingVm: function getUnderlyingVm(domElement) {
                    return this.componentStructure.getUnderlyingVm(domElement) || null;
                  },
                  getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(htmElement) {
                    return htmElement.__draggable_component__;
                  },
                  emitChanges: function emitChanges(evt) {
                    var _this5 = this;
                    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function() {
                      return _this5.$emit("change", evt);
                    });
                  },
                  alterList: function alterList(onList) {
                    if (this.list) {
                      onList(this.list);
                      return;
                    }
                    var newList = _toConsumableArray2(this.modelValue);
                    onList(newList);
                    this.$emit("update:modelValue", newList);
                  },
                  spliceList: function spliceList() {
                    var _arguments = arguments;
                    var spliceList2 = function spliceList3(list) {
                      return list.splice.apply(list, _toConsumableArray2(_arguments));
                    };
                    this.alterList(spliceList2);
                  },
                  updatePosition: function updatePosition(oldIndex2, newIndex2) {
                    var updatePosition2 = function updatePosition3(list) {
                      return list.splice(newIndex2, 0, list.splice(oldIndex2, 1)[0]);
                    };
                    this.alterList(updatePosition2);
                  },
                  getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref3) {
                    var to = _ref3.to, related = _ref3.related;
                    var component = this.getUnderlyingPotencialDraggableComponent(to);
                    if (!component) {
                      return {
                        component
                      };
                    }
                    var list = component.realList;
                    var context = {
                      list,
                      component
                    };
                    if (to !== related && list) {
                      var destination = component.getUnderlyingVm(related) || {};
                      return _objectSpread22(_objectSpread22({}, destination), context);
                    }
                    return context;
                  },
                  getVmIndexFromDomIndex: function getVmIndexFromDomIndex(domIndex) {
                    return this.componentStructure.getVmIndexFromDomIndex(domIndex, this.targetDomElement);
                  },
                  onDragStart: function onDragStart(evt) {
                    this.context = this.getUnderlyingVm(evt.item);
                    evt.item._underlying_vm_ = this.clone(this.context.element);
                    draggingElement = evt.item;
                  },
                  onDragAdd: function onDragAdd(evt) {
                    var element = evt.item._underlying_vm_;
                    if (element === void 0) {
                      return;
                    }
                    removeNode(evt.item);
                    var newIndex2 = this.getVmIndexFromDomIndex(evt.newIndex);
                    this.spliceList(newIndex2, 0, element);
                    var added = {
                      element,
                      newIndex: newIndex2
                    };
                    this.emitChanges({
                      added
                    });
                  },
                  onDragRemove: function onDragRemove(evt) {
                    insertNodeAt(this.$el, evt.item, evt.oldIndex);
                    if (evt.pullMode === "clone") {
                      removeNode(evt.clone);
                      return;
                    }
                    var _this$context = this.context, oldIndex2 = _this$context.index, element = _this$context.element;
                    this.spliceList(oldIndex2, 1);
                    var removed = {
                      element,
                      oldIndex: oldIndex2
                    };
                    this.emitChanges({
                      removed
                    });
                  },
                  onDragUpdate: function onDragUpdate(evt) {
                    removeNode(evt.item);
                    insertNodeAt(evt.from, evt.item, evt.oldIndex);
                    var oldIndex2 = this.context.index;
                    var newIndex2 = this.getVmIndexFromDomIndex(evt.newIndex);
                    this.updatePosition(oldIndex2, newIndex2);
                    var moved2 = {
                      element: this.context.element,
                      oldIndex: oldIndex2,
                      newIndex: newIndex2
                    };
                    this.emitChanges({
                      moved: moved2
                    });
                  },
                  computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
                    if (!relatedContext.element) {
                      return 0;
                    }
                    var domChildren = _toConsumableArray2(evt.to.children).filter(function(el) {
                      return el.style["display"] !== "none";
                    });
                    var currentDomIndex = domChildren.indexOf(evt.related);
                    var currentIndex = relatedContext.component.getVmIndexFromDomIndex(currentDomIndex);
                    var draggedInList = domChildren.indexOf(draggingElement) !== -1;
                    return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
                  },
                  onDragMove: function onDragMove(evt, originalEvent) {
                    var move = this.move, realList = this.realList;
                    if (!move || !realList) {
                      return true;
                    }
                    var relatedContext = this.getRelatedContextFromMoveEvent(evt);
                    var futureIndex = this.computeFutureIndex(relatedContext, evt);
                    var draggedContext = _objectSpread22(_objectSpread22({}, this.context), {}, {
                      futureIndex
                    });
                    var sendEvent = _objectSpread22(_objectSpread22({}, evt), {}, {
                      relatedContext,
                      draggedContext
                    });
                    return move(sendEvent, originalEvent);
                  },
                  onDragEnd: function onDragEnd() {
                    draggingElement = null;
                  }
                }
              });
              var vuedraggable = draggableComponent;
              __webpack_exports__["default"] = vuedraggable;
            }
          ),
          /***/
          "fb6a": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var isObject2 = __webpack_require__("861d");
              var isArray = __webpack_require__("e8b5");
              var toAbsoluteIndex = __webpack_require__("23cb");
              var toLength = __webpack_require__("50c4");
              var toIndexedObject = __webpack_require__("fc6a");
              var createProperty = __webpack_require__("8418");
              var wellKnownSymbol = __webpack_require__("b622");
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
              var USES_TO_LENGTH = arrayMethodUsesToLength("slice", { ACCESSORS: true, 0: 0, 1: 2 });
              var SPECIES = wellKnownSymbol("species");
              var nativeSlice = [].slice;
              var max = Math.max;
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                slice: function slice(start, end) {
                  var O = toIndexedObject(this);
                  var length = toLength(O.length);
                  var k = toAbsoluteIndex(start, length);
                  var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
                  var Constructor, result, n;
                  if (isArray(O)) {
                    Constructor = O.constructor;
                    if (typeof Constructor == "function" && (Constructor === Array || isArray(Constructor.prototype))) {
                      Constructor = void 0;
                    } else if (isObject2(Constructor)) {
                      Constructor = Constructor[SPECIES];
                      if (Constructor === null)
                        Constructor = void 0;
                    }
                    if (Constructor === Array || Constructor === void 0) {
                      return nativeSlice.call(O, k, fin);
                    }
                  }
                  result = new (Constructor === void 0 ? Array : Constructor)(max(fin - k, 0));
                  for (n = 0; k < fin; k++, n++)
                    if (k in O)
                      createProperty(result, n, O[k]);
                  result.length = n;
                  return result;
                }
              });
            }
          ),
          /***/
          "fc6a": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var IndexedObject = __webpack_require__("44ad");
              var requireObjectCoercible = __webpack_require__("1d80");
              module3.exports = function(it) {
                return IndexedObject(requireObjectCoercible(it));
              };
            }
          ),
          /***/
          "fdbc": (
            /***/
            function(module3, exports3) {
              module3.exports = {
                CSSRuleList: 0,
                CSSStyleDeclaration: 0,
                CSSValueList: 0,
                ClientRectList: 0,
                DOMRectList: 0,
                DOMStringList: 0,
                DOMTokenList: 1,
                DataTransferItemList: 0,
                FileList: 0,
                HTMLAllCollection: 0,
                HTMLCollection: 0,
                HTMLFormElement: 0,
                HTMLSelectElement: 0,
                MediaList: 0,
                MimeTypeArray: 0,
                NamedNodeMap: 0,
                NodeList: 1,
                PaintRequestList: 0,
                Plugin: 0,
                PluginArray: 0,
                SVGLengthList: 0,
                SVGNumberList: 0,
                SVGPathSegList: 0,
                SVGPointList: 0,
                SVGStringList: 0,
                SVGTransformList: 0,
                SourceBufferList: 0,
                StyleSheetList: 0,
                TextTrackCueList: 0,
                TextTrackList: 0,
                TouchList: 0
              };
            }
          ),
          /***/
          "fdbf": (
            /***/
            function(module3, exports3, __webpack_require__) {
              var NATIVE_SYMBOL = __webpack_require__("4930");
              module3.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
            }
          )
          /******/
        })["default"]
      );
    });
  })(vuedraggable_umd);
  var vuedraggable_umdExports = vuedraggable_umd.exports;
  const draggable = /* @__PURE__ */ getDefaultExportFromCjs(vuedraggable_umdExports);
  const VSelectionControlGroupSymbol = Symbol.for("vuetify:selection-control-group");
  const makeSelectionControlGroupProps = propsFactory({
    color: String,
    disabled: {
      type: Boolean,
      default: null
    },
    defaultsTarget: String,
    error: Boolean,
    id: String,
    inline: Boolean,
    falseIcon: IconValue,
    trueIcon: IconValue,
    ripple: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: null
    },
    name: String,
    readonly: {
      type: Boolean,
      default: null
    },
    modelValue: null,
    type: String,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeThemeProps()
  }, "SelectionControlGroup");
  const makeVSelectionControlGroupProps = propsFactory({
    ...makeSelectionControlGroupProps({
      defaultsTarget: "VSelectionControl"
    })
  }, "VSelectionControlGroup");
  genericComponent()({
    name: "VSelectionControlGroup",
    props: makeVSelectionControlGroupProps(),
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const modelValue = useProxiedModel(props, "modelValue");
      const uid = getUid();
      const id = require$$0.computed(() => props.id || `v-selection-control-group-${uid}`);
      const name = require$$0.computed(() => props.name || id.value);
      const updateHandlers = /* @__PURE__ */ new Set();
      require$$0.provide(VSelectionControlGroupSymbol, {
        modelValue,
        forceUpdate: () => {
          updateHandlers.forEach((fn) => fn());
        },
        onForceUpdate: (cb) => {
          updateHandlers.add(cb);
          require$$0.onScopeDispose(() => {
            updateHandlers.delete(cb);
          });
        }
      });
      provideDefaults({
        [props.defaultsTarget]: {
          color: require$$0.toRef(props, "color"),
          disabled: require$$0.toRef(props, "disabled"),
          density: require$$0.toRef(props, "density"),
          error: require$$0.toRef(props, "error"),
          inline: require$$0.toRef(props, "inline"),
          modelValue,
          multiple: require$$0.computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
          name,
          falseIcon: require$$0.toRef(props, "falseIcon"),
          trueIcon: require$$0.toRef(props, "trueIcon"),
          readonly: require$$0.toRef(props, "readonly"),
          ripple: require$$0.toRef(props, "ripple"),
          type: require$$0.toRef(props, "type"),
          valueComparator: require$$0.toRef(props, "valueComparator")
        }
      });
      useRender(() => {
        var _a;
        return require$$0.createVNode("div", {
          "class": ["v-selection-control-group", {
            "v-selection-control-group--inline": props.inline
          }, props.class],
          "style": props.style,
          "role": props.type === "radio" ? "radiogroup" : void 0
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      });
      return {};
    }
  });
  const makeVSelectionControlProps = propsFactory({
    label: String,
    baseColor: String,
    trueValue: null,
    falseValue: null,
    value: null,
    ...makeComponentProps(),
    ...makeSelectionControlGroupProps()
  }, "VSelectionControl");
  function useSelectionControl(props) {
    const group = require$$0.inject(VSelectionControlGroupSymbol, void 0);
    const {
      densityClasses
    } = useDensity(props);
    const modelValue = useProxiedModel(props, "modelValue");
    const trueValue = require$$0.computed(() => props.trueValue !== void 0 ? props.trueValue : props.value !== void 0 ? props.value : true);
    const falseValue = require$$0.computed(() => props.falseValue !== void 0 ? props.falseValue : false);
    const isMultiple = require$$0.computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
    const model = require$$0.computed({
      get() {
        const val = group ? group.modelValue.value : modelValue.value;
        return isMultiple.value ? wrapInArray(val).some((v) => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
      },
      set(val) {
        if (props.readonly)
          return;
        const currentValue = val ? trueValue.value : falseValue.value;
        let newVal = currentValue;
        if (isMultiple.value) {
          newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter((item) => !props.valueComparator(item, trueValue.value));
        }
        if (group) {
          group.modelValue.value = newVal;
        } else {
          modelValue.value = newVal;
        }
      }
    });
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(require$$0.computed(() => {
      if (props.error || props.disabled)
        return void 0;
      return model.value ? props.color : props.baseColor;
    }));
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(require$$0.computed(() => {
      return model.value && !props.error && !props.disabled ? props.color : void 0;
    }));
    const icon = require$$0.computed(() => model.value ? props.trueIcon : props.falseIcon);
    return {
      group,
      densityClasses,
      trueValue,
      falseValue,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      icon
    };
  }
  const VSelectionControl = genericComponent()({
    name: "VSelectionControl",
    directives: {
      Ripple
    },
    inheritAttrs: false,
    props: makeVSelectionControlProps(),
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        group,
        densityClasses,
        icon,
        model,
        textColorClasses,
        textColorStyles,
        backgroundColorClasses,
        backgroundColorStyles,
        trueValue
      } = useSelectionControl(props);
      const uid = getUid();
      const isFocused = require$$0.shallowRef(false);
      const isFocusVisible = require$$0.shallowRef(false);
      const input = require$$0.ref();
      const id = require$$0.computed(() => props.id || `input-${uid}`);
      const isInteractive = require$$0.computed(() => !props.disabled && !props.readonly);
      group == null ? void 0 : group.onForceUpdate(() => {
        if (input.value) {
          input.value.checked = model.value;
        }
      });
      function onFocus(e) {
        if (!isInteractive.value)
          return;
        isFocused.value = true;
        if (matchesSelector(e.target, ":focus-visible") !== false) {
          isFocusVisible.value = true;
        }
      }
      function onBlur() {
        isFocused.value = false;
        isFocusVisible.value = false;
      }
      function onClickLabel(e) {
        e.stopPropagation();
      }
      function onInput(e) {
        if (!isInteractive.value)
          return;
        if (props.readonly && group) {
          require$$0.nextTick(() => group.forceUpdate());
        }
        model.value = e.target.checked;
      }
      useRender(() => {
        var _a, _b;
        const label = slots.label ? slots.label({
          label: props.label,
          props: {
            for: id.value
          }
        }) : props.label;
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const inputNode = require$$0.createVNode("input", require$$0.mergeProps({
          "ref": input,
          "checked": model.value,
          "disabled": !!props.disabled,
          "id": id.value,
          "onBlur": onBlur,
          "onFocus": onFocus,
          "onInput": onInput,
          "aria-disabled": !!props.disabled,
          "type": props.type,
          "value": trueValue.value,
          "name": props.name,
          "aria-checked": props.type === "checkbox" ? model.value : void 0
        }, inputAttrs), null);
        return require$$0.createVNode("div", require$$0.mergeProps({
          "class": ["v-selection-control", {
            "v-selection-control--dirty": model.value,
            "v-selection-control--disabled": props.disabled,
            "v-selection-control--error": props.error,
            "v-selection-control--focused": isFocused.value,
            "v-selection-control--focus-visible": isFocusVisible.value,
            "v-selection-control--inline": props.inline
          }, densityClasses.value, props.class]
        }, rootAttrs, {
          "style": props.style
        }), [require$$0.createVNode("div", {
          "class": ["v-selection-control__wrapper", textColorClasses.value],
          "style": textColorStyles.value
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          backgroundColorClasses,
          backgroundColorStyles
        }), require$$0.withDirectives(require$$0.createVNode("div", {
          "class": ["v-selection-control__input"]
        }, [((_b = slots.input) == null ? void 0 : _b.call(slots, {
          model,
          textColorClasses,
          textColorStyles,
          backgroundColorClasses,
          backgroundColorStyles,
          inputNode,
          icon: icon.value,
          props: {
            onFocus,
            onBlur,
            id: id.value
          }
        })) ?? require$$0.createVNode(require$$0.Fragment, null, [icon.value && require$$0.createVNode(VIcon, {
          "key": "icon",
          "icon": icon.value
        }, null), inputNode])]), [[require$$0.resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ["center", "circle"]]]])]), label && require$$0.createVNode(VLabel, {
          "for": id.value,
          "onClick": onClickLabel
        }, {
          default: () => [label]
        })]);
      });
      return {
        isFocused,
        input
      };
    }
  });
  const makeVCheckboxBtnProps = propsFactory({
    indeterminate: Boolean,
    indeterminateIcon: {
      type: IconValue,
      default: "$checkboxIndeterminate"
    },
    ...makeVSelectionControlProps({
      falseIcon: "$checkboxOff",
      trueIcon: "$checkboxOn"
    })
  }, "VCheckboxBtn");
  const VCheckboxBtn = genericComponent()({
    name: "VCheckboxBtn",
    props: makeVCheckboxBtnProps(),
    emits: {
      "update:modelValue": (value) => true,
      "update:indeterminate": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const indeterminate = useProxiedModel(props, "indeterminate");
      const model = useProxiedModel(props, "modelValue");
      function onChange(v) {
        if (indeterminate.value) {
          indeterminate.value = false;
        }
      }
      const falseIcon = require$$0.computed(() => {
        return indeterminate.value ? props.indeterminateIcon : props.falseIcon;
      });
      const trueIcon = require$$0.computed(() => {
        return indeterminate.value ? props.indeterminateIcon : props.trueIcon;
      });
      useRender(() => {
        const controlProps = omit(VSelectionControl.filterProps(props), ["modelValue"]);
        return require$$0.createVNode(VSelectionControl, require$$0.mergeProps(controlProps, {
          "modelValue": model.value,
          "onUpdate:modelValue": [($event) => model.value = $event, onChange],
          "class": ["v-checkbox-btn", props.class],
          "style": props.style,
          "type": "checkbox",
          "falseIcon": falseIcon.value,
          "trueIcon": trueIcon.value,
          "aria-checked": indeterminate.value ? "mixed" : void 0
        }), slots);
      });
      return {};
    }
  });
  const makeVCheckboxProps = propsFactory({
    ...makeVInputProps(),
    ...omit(makeVCheckboxBtnProps(), ["inline"])
  }, "VCheckbox");
  const VCheckbox = genericComponent()({
    name: "VCheckbox",
    inheritAttrs: false,
    props: makeVCheckboxProps(),
    emits: {
      "update:modelValue": (value) => true,
      "update:focused": (focused) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const model = useProxiedModel(props, "modelValue");
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const uid = getUid();
      const id = require$$0.computed(() => props.id || `checkbox-${uid}`);
      useRender(() => {
        const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
        const inputProps = VInput.filterProps(props);
        const checkboxProps = VCheckboxBtn.filterProps(props);
        return require$$0.createVNode(VInput, require$$0.mergeProps({
          "class": ["v-checkbox", props.class]
        }, rootAttrs, inputProps, {
          "modelValue": model.value,
          "onUpdate:modelValue": ($event) => model.value = $event,
          "id": id.value,
          "focused": isFocused.value,
          "style": props.style
        }), {
          ...slots,
          default: (_ref2) => {
            let {
              id: id2,
              messagesId,
              isDisabled,
              isReadonly,
              isValid: isValid2
            } = _ref2;
            return require$$0.createVNode(VCheckboxBtn, require$$0.mergeProps(checkboxProps, {
              "id": id2.value,
              "aria-describedby": messagesId.value,
              "disabled": isDisabled.value,
              "readonly": isReadonly.value
            }, controlAttrs, {
              "error": isValid2.value === false,
              "modelValue": model.value,
              "onUpdate:modelValue": ($event) => model.value = $event,
              "onFocus": focus,
              "onBlur": blur
            }), slots);
          }
        });
      });
      return {};
    }
  });
  function bias(val) {
    const c = 0.501;
    const x = Math.abs(val);
    return Math.sign(val) * (x / ((1 / c - 2) * (1 - x) + 1));
  }
  function calculateUpdatedOffset(_ref) {
    let {
      selectedElement,
      containerSize,
      contentSize,
      isRtl,
      currentScrollOffset,
      isHorizontal
    } = _ref;
    const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
    const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
    const adjustedOffsetStart = isRtl && isHorizontal ? contentSize - offsetStart - clientSize : offsetStart;
    const totalSize = containerSize + currentScrollOffset;
    const itemOffset = clientSize + adjustedOffsetStart;
    const additionalOffset = clientSize * 0.4;
    if (adjustedOffsetStart <= currentScrollOffset) {
      currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0);
    } else if (totalSize <= itemOffset) {
      currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize);
    }
    return currentScrollOffset;
  }
  function calculateCenteredOffset(_ref2) {
    let {
      selectedElement,
      containerSize,
      contentSize,
      isRtl,
      isHorizontal
    } = _ref2;
    const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
    const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
    const offsetCentered = isRtl && isHorizontal ? contentSize - offsetStart - clientSize / 2 - containerSize / 2 : offsetStart + clientSize / 2 - containerSize / 2;
    return Math.min(contentSize - containerSize, Math.max(0, offsetCentered));
  }
  const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
  const makeVSlideGroupProps = propsFactory({
    centerActive: Boolean,
    direction: {
      type: String,
      default: "horizontal"
    },
    symbol: {
      type: null,
      default: VSlideGroupSymbol
    },
    nextIcon: {
      type: IconValue,
      default: "$next"
    },
    prevIcon: {
      type: IconValue,
      default: "$prev"
    },
    showArrows: {
      type: [Boolean, String],
      validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
    },
    ...makeComponentProps(),
    ...makeDisplayProps(),
    ...makeTagProps(),
    ...makeGroupProps({
      selectedClass: "v-slide-group-item--active"
    })
  }, "VSlideGroup");
  const VSlideGroup = genericComponent()({
    name: "VSlideGroup",
    props: makeVSlideGroupProps(),
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        isRtl
      } = useRtl();
      const {
        displayClasses,
        mobile
      } = useDisplay(props);
      const group = useGroup(props, props.symbol);
      const isOverflowing = require$$0.shallowRef(false);
      const scrollOffset = require$$0.shallowRef(0);
      const containerSize = require$$0.shallowRef(0);
      const contentSize = require$$0.shallowRef(0);
      const isHorizontal = require$$0.computed(() => props.direction === "horizontal");
      const {
        resizeRef: containerRef,
        contentRect: containerRect
      } = useResizeObserver();
      const {
        resizeRef: contentRef,
        contentRect
      } = useResizeObserver();
      const firstSelectedIndex = require$$0.computed(() => {
        if (!group.selected.value.length)
          return -1;
        return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
      });
      const lastSelectedIndex = require$$0.computed(() => {
        if (!group.selected.value.length)
          return -1;
        return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
      });
      if (IN_BROWSER) {
        let frame = -1;
        require$$0.watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            if (containerRect.value && contentRect.value) {
              const sizeProperty = isHorizontal.value ? "width" : "height";
              containerSize.value = containerRect.value[sizeProperty];
              contentSize.value = contentRect.value[sizeProperty];
              isOverflowing.value = containerSize.value + 1 < contentSize.value;
            }
            if (firstSelectedIndex.value >= 0 && contentRef.value) {
              const selectedElement = contentRef.value.children[lastSelectedIndex.value];
              if (firstSelectedIndex.value === 0 || !isOverflowing.value) {
                scrollOffset.value = 0;
              } else if (props.centerActive) {
                scrollOffset.value = calculateCenteredOffset({
                  selectedElement,
                  containerSize: containerSize.value,
                  contentSize: contentSize.value,
                  isRtl: isRtl.value,
                  isHorizontal: isHorizontal.value
                });
              } else if (isOverflowing.value) {
                scrollOffset.value = calculateUpdatedOffset({
                  selectedElement,
                  containerSize: containerSize.value,
                  contentSize: contentSize.value,
                  isRtl: isRtl.value,
                  currentScrollOffset: scrollOffset.value,
                  isHorizontal: isHorizontal.value
                });
              }
            }
          });
        });
      }
      const disableTransition = require$$0.shallowRef(false);
      let startTouch = 0;
      let startOffset = 0;
      function onTouchstart(e) {
        const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
        const sign = isRtl.value && isHorizontal.value ? -1 : 1;
        startOffset = sign * scrollOffset.value;
        startTouch = e.touches[0][sizeProperty];
        disableTransition.value = true;
      }
      function onTouchmove(e) {
        if (!isOverflowing.value)
          return;
        const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
        const sign = isRtl.value && isHorizontal.value ? -1 : 1;
        scrollOffset.value = sign * (startOffset + startTouch - e.touches[0][sizeProperty]);
      }
      function onTouchend(e) {
        const maxScrollOffset = contentSize.value - containerSize.value;
        if (scrollOffset.value < 0 || !isOverflowing.value) {
          scrollOffset.value = 0;
        } else if (scrollOffset.value >= maxScrollOffset) {
          scrollOffset.value = maxScrollOffset;
        }
        disableTransition.value = false;
      }
      function onScroll() {
        if (!containerRef.value)
          return;
        containerRef.value[isHorizontal.value ? "scrollLeft" : "scrollTop"] = 0;
      }
      const isFocused = require$$0.shallowRef(false);
      function onFocusin(e) {
        isFocused.value = true;
        if (!isOverflowing.value || !contentRef.value)
          return;
        for (const el of e.composedPath()) {
          for (const item of contentRef.value.children) {
            if (item === el) {
              scrollOffset.value = calculateUpdatedOffset({
                selectedElement: item,
                containerSize: containerSize.value,
                contentSize: contentSize.value,
                isRtl: isRtl.value,
                currentScrollOffset: scrollOffset.value,
                isHorizontal: isHorizontal.value
              });
              return;
            }
          }
        }
      }
      function onFocusout(e) {
        isFocused.value = false;
      }
      function onFocus(e) {
        var _a;
        if (!isFocused.value && !(e.relatedTarget && ((_a = contentRef.value) == null ? void 0 : _a.contains(e.relatedTarget))))
          focus();
      }
      function onKeydown(e) {
        if (!contentRef.value)
          return;
        if (isHorizontal.value) {
          if (e.key === "ArrowRight") {
            focus(isRtl.value ? "prev" : "next");
          } else if (e.key === "ArrowLeft") {
            focus(isRtl.value ? "next" : "prev");
          }
        } else {
          if (e.key === "ArrowDown") {
            focus("next");
          } else if (e.key === "ArrowUp") {
            focus("prev");
          }
        }
        if (e.key === "Home") {
          focus("first");
        } else if (e.key === "End") {
          focus("last");
        }
      }
      function focus(location) {
        var _a, _b, _c, _d, _e;
        if (!contentRef.value)
          return;
        if (!location) {
          const focusable = focusableChildren(contentRef.value);
          (_a = focusable[0]) == null ? void 0 : _a.focus();
        } else if (location === "next") {
          const el = (_b = contentRef.value.querySelector(":focus")) == null ? void 0 : _b.nextElementSibling;
          if (el)
            el.focus();
          else
            focus("first");
        } else if (location === "prev") {
          const el = (_c = contentRef.value.querySelector(":focus")) == null ? void 0 : _c.previousElementSibling;
          if (el)
            el.focus();
          else
            focus("last");
        } else if (location === "first") {
          (_d = contentRef.value.firstElementChild) == null ? void 0 : _d.focus();
        } else if (location === "last") {
          (_e = contentRef.value.lastElementChild) == null ? void 0 : _e.focus();
        }
      }
      function scrollTo(location) {
        const newAbsoluteOffset = scrollOffset.value + (location === "prev" ? -1 : 1) * containerSize.value;
        scrollOffset.value = clamp(newAbsoluteOffset, 0, contentSize.value - containerSize.value);
      }
      const contentStyles = require$$0.computed(() => {
        let scrollAmount = scrollOffset.value > contentSize.value - containerSize.value ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value) : -scrollOffset.value;
        if (scrollOffset.value <= 0) {
          scrollAmount = bias(-scrollOffset.value);
        }
        const sign = isRtl.value && isHorizontal.value ? -1 : 1;
        return {
          transform: `translate${isHorizontal.value ? "X" : "Y"}(${sign * scrollAmount}px)`,
          transition: disableTransition.value ? "none" : "",
          willChange: disableTransition.value ? "transform" : ""
        };
      });
      const slotProps = require$$0.computed(() => ({
        next: group.next,
        prev: group.prev,
        select: group.select,
        isSelected: group.isSelected
      }));
      const hasAffixes = require$$0.computed(() => {
        switch (props.showArrows) {
          case "always":
            return true;
          case "desktop":
            return !mobile.value;
          case true:
            return isOverflowing.value || Math.abs(scrollOffset.value) > 0;
          case "mobile":
            return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;
          default:
            return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
        }
      });
      const hasPrev = require$$0.computed(() => {
        return Math.abs(scrollOffset.value) > 0;
      });
      const hasNext = require$$0.computed(() => {
        return contentSize.value > Math.abs(scrollOffset.value) + containerSize.value;
      });
      useRender(() => require$$0.createVNode(props.tag, {
        "class": ["v-slide-group", {
          "v-slide-group--vertical": !isHorizontal.value,
          "v-slide-group--has-affixes": hasAffixes.value,
          "v-slide-group--is-overflowing": isOverflowing.value
        }, displayClasses.value, props.class],
        "style": props.style,
        "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
        "onFocus": onFocus
      }, {
        default: () => {
          var _a, _b, _c;
          return [hasAffixes.value && require$$0.createVNode("div", {
            "key": "prev",
            "class": ["v-slide-group__prev", {
              "v-slide-group__prev--disabled": !hasPrev.value
            }],
            "onClick": () => hasPrev.value && scrollTo("prev")
          }, [((_a = slots.prev) == null ? void 0 : _a.call(slots, slotProps.value)) ?? require$$0.createVNode(VFadeTransition, null, {
            default: () => [require$$0.createVNode(VIcon, {
              "icon": isRtl.value ? props.nextIcon : props.prevIcon
            }, null)]
          })]), require$$0.createVNode("div", {
            "key": "container",
            "ref": containerRef,
            "class": "v-slide-group__container",
            "onScroll": onScroll
          }, [require$$0.createVNode("div", {
            "ref": contentRef,
            "class": "v-slide-group__content",
            "style": contentStyles.value,
            "onTouchstartPassive": onTouchstart,
            "onTouchmovePassive": onTouchmove,
            "onTouchendPassive": onTouchend,
            "onFocusin": onFocusin,
            "onFocusout": onFocusout,
            "onKeydown": onKeydown
          }, [(_b = slots.default) == null ? void 0 : _b.call(slots, slotProps.value)])]), hasAffixes.value && require$$0.createVNode("div", {
            "key": "next",
            "class": ["v-slide-group__next", {
              "v-slide-group__next--disabled": !hasNext.value
            }],
            "onClick": () => hasNext.value && scrollTo("next")
          }, [((_c = slots.next) == null ? void 0 : _c.call(slots, slotProps.value)) ?? require$$0.createVNode(VFadeTransition, null, {
            default: () => [require$$0.createVNode(VIcon, {
              "icon": isRtl.value ? props.prevIcon : props.nextIcon
            }, null)]
          })])];
        }
      }));
      return {
        selected: group.selected,
        scrollTo,
        scrollOffset,
        focus
      };
    }
  });
  const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
  const makeVChipGroupProps = propsFactory({
    column: Boolean,
    filter: Boolean,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeVSlideGroupProps(),
    ...makeComponentProps(),
    ...makeGroupProps({
      selectedClass: "v-chip--selected"
    }),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "tonal"
    })
  }, "VChipGroup");
  genericComponent()({
    name: "VChipGroup",
    props: makeVChipGroupProps(),
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        isSelected,
        select,
        next,
        prev,
        selected
      } = useGroup(props, VChipGroupSymbol);
      provideDefaults({
        VChip: {
          color: require$$0.toRef(props, "color"),
          disabled: require$$0.toRef(props, "disabled"),
          filter: require$$0.toRef(props, "filter"),
          variant: require$$0.toRef(props, "variant")
        }
      });
      useRender(() => {
        const slideGroupProps = VSlideGroup.filterProps(props);
        return require$$0.createVNode(VSlideGroup, require$$0.mergeProps(slideGroupProps, {
          "class": ["v-chip-group", {
            "v-chip-group--column": props.column
          }, themeClasses.value, props.class],
          "style": props.style
        }), {
          default: () => {
            var _a;
            return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
              isSelected,
              select,
              next,
              prev,
              selected: selected.value
            })];
          }
        });
      });
      return {};
    }
  });
  const makeVChipProps = propsFactory({
    activeClass: String,
    appendAvatar: String,
    appendIcon: IconValue,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: "$delete"
    },
    closeLabel: {
      type: String,
      default: "$vuetify.close"
    },
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: "$complete"
    },
    label: Boolean,
    link: {
      type: Boolean,
      default: void 0
    },
    pill: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    text: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    onClick: EventProp(),
    onClickOnce: EventProp(),
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "span"
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "tonal"
    })
  }, "VChip");
  const VChip = genericComponent()({
    name: "VChip",
    directives: {
      Ripple
    },
    props: makeVChipProps(),
    emits: {
      "click:close": (e) => true,
      "update:modelValue": (value) => true,
      "group:selected": (val) => true,
      click: (e) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit,
        slots
      } = _ref;
      const {
        t
      } = useLocale();
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
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        sizeClasses
      } = useSize(props);
      const {
        themeClasses
      } = provideTheme(props);
      const isActive = useProxiedModel(props, "modelValue");
      const group = useGroupItem(props, VChipGroupSymbol, false);
      const link = useLink(props, attrs);
      const isLink = require$$0.computed(() => props.link !== false && link.isLink.value);
      const isClickable = require$$0.computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
      const closeProps = require$$0.computed(() => ({
        "aria-label": t(props.closeLabel),
        onClick(e) {
          e.stopPropagation();
          isActive.value = false;
          emit("click:close", e);
        }
      }));
      function onClick(e) {
        var _a;
        emit("click", e);
        if (!isClickable.value)
          return;
        (_a = link.navigate) == null ? void 0 : _a.call(link, e);
        group == null ? void 0 : group.toggle();
      }
      function onKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(e);
        }
      }
      return () => {
        const Tag = link.isLink.value ? "a" : props.tag;
        const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
        const hasAppend = !!(hasAppendMedia || slots.append);
        const hasClose = !!(slots.close || props.closable);
        const hasFilter = !!(slots.filter || props.filter) && group;
        const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
        const hasPrepend = !!(hasPrependMedia || slots.prepend);
        const hasColor = !group || group.isSelected.value;
        return isActive.value && require$$0.withDirectives(require$$0.createVNode(Tag, {
          "class": ["v-chip", {
            "v-chip--disabled": props.disabled,
            "v-chip--label": props.label,
            "v-chip--link": isClickable.value,
            "v-chip--filter": hasFilter,
            "v-chip--pill": props.pill
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value, props.class],
          "style": [hasColor ? colorStyles.value : void 0, props.style],
          "disabled": props.disabled || void 0,
          "draggable": props.draggable,
          "href": link.href.value,
          "tabindex": isClickable.value ? 0 : void 0,
          "onClick": onClick,
          "onKeydown": isClickable.value && !isLink.value && onKeyDown
        }, {
          default: () => {
            var _a;
            return [genOverlays(isClickable.value, "v-chip"), hasFilter && require$$0.createVNode(VExpandXTransition, {
              "key": "filter"
            }, {
              default: () => [require$$0.withDirectives(require$$0.createVNode("div", {
                "class": "v-chip__filter"
              }, [!slots.filter ? require$$0.createVNode(VIcon, {
                "key": "filter-icon",
                "icon": props.filterIcon
              }, null) : require$$0.createVNode(VDefaultsProvider, {
                "key": "filter-defaults",
                "disabled": !props.filterIcon,
                "defaults": {
                  VIcon: {
                    icon: props.filterIcon
                  }
                }
              }, slots.filter)]), [[require$$0.vShow, group.isSelected.value]])]
            }), hasPrepend && require$$0.createVNode("div", {
              "key": "prepend",
              "class": "v-chip__prepend"
            }, [!slots.prepend ? require$$0.createVNode(require$$0.Fragment, null, [props.prependIcon && require$$0.createVNode(VIcon, {
              "key": "prepend-icon",
              "icon": props.prependIcon,
              "start": true
            }, null), props.prependAvatar && require$$0.createVNode(VAvatar, {
              "key": "prepend-avatar",
              "image": props.prependAvatar,
              "start": true
            }, null)]) : require$$0.createVNode(VDefaultsProvider, {
              "key": "prepend-defaults",
              "disabled": !hasPrependMedia,
              "defaults": {
                VAvatar: {
                  image: props.prependAvatar,
                  start: true
                },
                VIcon: {
                  icon: props.prependIcon,
                  start: true
                }
              }
            }, slots.prepend)]), require$$0.createVNode("div", {
              "class": "v-chip__content",
              "data-no-activator": ""
            }, [((_a = slots.default) == null ? void 0 : _a.call(slots, {
              isSelected: group == null ? void 0 : group.isSelected.value,
              selectedClass: group == null ? void 0 : group.selectedClass.value,
              select: group == null ? void 0 : group.select,
              toggle: group == null ? void 0 : group.toggle,
              value: group == null ? void 0 : group.value.value,
              disabled: props.disabled
            })) ?? props.text]), hasAppend && require$$0.createVNode("div", {
              "key": "append",
              "class": "v-chip__append"
            }, [!slots.append ? require$$0.createVNode(require$$0.Fragment, null, [props.appendIcon && require$$0.createVNode(VIcon, {
              "key": "append-icon",
              "end": true,
              "icon": props.appendIcon
            }, null), props.appendAvatar && require$$0.createVNode(VAvatar, {
              "key": "append-avatar",
              "end": true,
              "image": props.appendAvatar
            }, null)]) : require$$0.createVNode(VDefaultsProvider, {
              "key": "append-defaults",
              "disabled": !hasAppendMedia,
              "defaults": {
                VAvatar: {
                  end: true,
                  image: props.appendAvatar
                },
                VIcon: {
                  end: true,
                  icon: props.appendIcon
                }
              }
            }, slots.append)]), hasClose && require$$0.createVNode("button", require$$0.mergeProps({
              "key": "close",
              "class": "v-chip__close",
              "type": "button"
            }, closeProps.value), [!slots.close ? require$$0.createVNode(VIcon, {
              "key": "close-icon",
              "icon": props.closeIcon,
              "size": "x-small"
            }, null) : require$$0.createVNode(VDefaultsProvider, {
              "key": "close-defaults",
              "defaults": {
                VIcon: {
                  icon: props.closeIcon,
                  size: "x-small"
                }
              }
            }, slots.close)])];
          }
        }), [[require$$0.resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
      };
    }
  });
  const ListKey = Symbol.for("vuetify:list");
  function createList() {
    const parent = require$$0.inject(ListKey, {
      hasPrepend: require$$0.shallowRef(false),
      updateHasPrepend: () => null
    });
    const data = {
      hasPrepend: require$$0.shallowRef(false),
      updateHasPrepend: (value) => {
        if (value)
          data.hasPrepend.value = value;
      }
    };
    require$$0.provide(ListKey, data);
    return parent;
  }
  function useList() {
    return require$$0.inject(ListKey, null);
  }
  const singleOpenStrategy = {
    open: (_ref) => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref;
      if (value) {
        const newOpened = /* @__PURE__ */ new Set();
        newOpened.add(id);
        let parent = parents.get(id);
        while (parent != null) {
          newOpened.add(parent);
          parent = parents.get(parent);
        }
        return newOpened;
      } else {
        opened.delete(id);
        return opened;
      }
    },
    select: () => null
  };
  const multipleOpenStrategy = {
    open: (_ref2) => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref2;
      if (value) {
        let parent = parents.get(id);
        opened.add(id);
        while (parent != null && parent !== id) {
          opened.add(parent);
          parent = parents.get(parent);
        }
        return opened;
      } else {
        opened.delete(id);
      }
      return opened;
    },
    select: () => null
  };
  const listOpenStrategy = {
    open: multipleOpenStrategy.open,
    select: (_ref3) => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref3;
      if (!value)
        return opened;
      const path = [];
      let parent = parents.get(id);
      while (parent != null) {
        path.push(parent);
        parent = parents.get(parent);
      }
      return new Set(path);
    }
  };
  const independentSelectStrategy = (mandatory) => {
    const strategy = {
      select: (_ref) => {
        let {
          id,
          value,
          selected
        } = _ref;
        id = require$$0.toRaw(id);
        if (mandatory && !value) {
          const on2 = Array.from(selected.entries()).reduce((arr, _ref2) => {
            let [key, value2] = _ref2;
            return value2 === "on" ? [...arr, key] : arr;
          }, []);
          if (on2.length === 1 && on2[0] === id)
            return selected;
        }
        selected.set(id, value ? "on" : "off");
        return selected;
      },
      in: (v, children, parents) => {
        let map = /* @__PURE__ */ new Map();
        for (const id of v || []) {
          map = strategy.select({
            id,
            value: true,
            selected: new Map(map),
            children,
            parents
          });
        }
        return map;
      },
      out: (v) => {
        const arr = [];
        for (const [key, value] of v.entries()) {
          if (value === "on")
            arr.push(key);
        }
        return arr;
      }
    };
    return strategy;
  };
  const independentSingleSelectStrategy = (mandatory) => {
    const parentStrategy = independentSelectStrategy(mandatory);
    const strategy = {
      select: (_ref3) => {
        let {
          selected,
          id,
          ...rest
        } = _ref3;
        id = require$$0.toRaw(id);
        const singleSelected = selected.has(id) ? /* @__PURE__ */ new Map([[id, selected.get(id)]]) : /* @__PURE__ */ new Map();
        return parentStrategy.select({
          ...rest,
          id,
          selected: singleSelected
        });
      },
      in: (v, children, parents) => {
        let map = /* @__PURE__ */ new Map();
        if (v == null ? void 0 : v.length) {
          map = parentStrategy.in(v.slice(0, 1), children, parents);
        }
        return map;
      },
      out: (v, children, parents) => {
        return parentStrategy.out(v, children, parents);
      }
    };
    return strategy;
  };
  const leafSelectStrategy = (mandatory) => {
    const parentStrategy = independentSelectStrategy(mandatory);
    const strategy = {
      select: (_ref4) => {
        let {
          id,
          selected,
          children,
          ...rest
        } = _ref4;
        id = require$$0.toRaw(id);
        if (children.has(id))
          return selected;
        return parentStrategy.select({
          id,
          selected,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };
  const leafSingleSelectStrategy = (mandatory) => {
    const parentStrategy = independentSingleSelectStrategy(mandatory);
    const strategy = {
      select: (_ref5) => {
        let {
          id,
          selected,
          children,
          ...rest
        } = _ref5;
        id = require$$0.toRaw(id);
        if (children.has(id))
          return selected;
        return parentStrategy.select({
          id,
          selected,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };
  const classicSelectStrategy = (mandatory) => {
    const strategy = {
      select: (_ref6) => {
        let {
          id,
          value,
          selected,
          children,
          parents
        } = _ref6;
        id = require$$0.toRaw(id);
        const original = new Map(selected);
        const items = [id];
        while (items.length) {
          const item = items.shift();
          selected.set(item, value ? "on" : "off");
          if (children.has(item)) {
            items.push(...children.get(item));
          }
        }
        let parent = parents.get(id);
        while (parent) {
          const childrenIds = children.get(parent);
          const everySelected = childrenIds.every((cid) => selected.get(cid) === "on");
          const noneSelected = childrenIds.every((cid) => !selected.has(cid) || selected.get(cid) === "off");
          selected.set(parent, everySelected ? "on" : noneSelected ? "off" : "indeterminate");
          parent = parents.get(parent);
        }
        if (mandatory && !value) {
          const on2 = Array.from(selected.entries()).reduce((arr, _ref7) => {
            let [key, value2] = _ref7;
            return value2 === "on" ? [...arr, key] : arr;
          }, []);
          if (on2.length === 0)
            return original;
        }
        return selected;
      },
      in: (v, children, parents) => {
        let map = /* @__PURE__ */ new Map();
        for (const id of v || []) {
          map = strategy.select({
            id,
            value: true,
            selected: new Map(map),
            children,
            parents
          });
        }
        return map;
      },
      out: (v, children) => {
        const arr = [];
        for (const [key, value] of v.entries()) {
          if (value === "on" && !children.has(key))
            arr.push(key);
        }
        return arr;
      }
    };
    return strategy;
  };
  const VNestedSymbol = Symbol.for("vuetify:nested");
  const emptyNested = {
    id: require$$0.shallowRef(),
    root: {
      register: () => null,
      unregister: () => null,
      parents: require$$0.ref(/* @__PURE__ */ new Map()),
      children: require$$0.ref(/* @__PURE__ */ new Map()),
      open: () => null,
      openOnSelect: () => null,
      select: () => null,
      opened: require$$0.ref(/* @__PURE__ */ new Set()),
      selected: require$$0.ref(/* @__PURE__ */ new Map()),
      selectedValues: require$$0.ref([])
    }
  };
  const makeNestedProps = propsFactory({
    selectStrategy: [String, Function],
    openStrategy: [String, Object],
    opened: Array,
    selected: Array,
    mandatory: Boolean
  }, "nested");
  const useNested = (props) => {
    let isUnmounted = false;
    const children = require$$0.ref(/* @__PURE__ */ new Map());
    const parents = require$$0.ref(/* @__PURE__ */ new Map());
    const opened = useProxiedModel(props, "opened", props.opened, (v) => new Set(v), (v) => [...v.values()]);
    const selectStrategy = require$$0.computed(() => {
      if (typeof props.selectStrategy === "object")
        return props.selectStrategy;
      switch (props.selectStrategy) {
        case "single-leaf":
          return leafSingleSelectStrategy(props.mandatory);
        case "leaf":
          return leafSelectStrategy(props.mandatory);
        case "independent":
          return independentSelectStrategy(props.mandatory);
        case "single-independent":
          return independentSingleSelectStrategy(props.mandatory);
        case "classic":
        default:
          return classicSelectStrategy(props.mandatory);
      }
    });
    const openStrategy = require$$0.computed(() => {
      if (typeof props.openStrategy === "object")
        return props.openStrategy;
      switch (props.openStrategy) {
        case "list":
          return listOpenStrategy;
        case "single":
          return singleOpenStrategy;
        case "multiple":
        default:
          return multipleOpenStrategy;
      }
    });
    const selected = useProxiedModel(props, "selected", props.selected, (v) => selectStrategy.value.in(v, children.value, parents.value), (v) => selectStrategy.value.out(v, children.value, parents.value));
    require$$0.onBeforeUnmount(() => {
      isUnmounted = true;
    });
    function getPath(id) {
      const path = [];
      let parent = id;
      while (parent != null) {
        path.unshift(parent);
        parent = parents.value.get(parent);
      }
      return path;
    }
    const vm = getCurrentInstance("nested");
    const nested = {
      id: require$$0.shallowRef(),
      root: {
        opened,
        selected,
        selectedValues: require$$0.computed(() => {
          const arr = [];
          for (const [key, value] of selected.value.entries()) {
            if (value === "on")
              arr.push(key);
          }
          return arr;
        }),
        register: (id, parentId, isGroup) => {
          parentId && id !== parentId && parents.value.set(id, parentId);
          isGroup && children.value.set(id, []);
          if (parentId != null) {
            children.value.set(parentId, [...children.value.get(parentId) || [], id]);
          }
        },
        unregister: (id) => {
          if (isUnmounted)
            return;
          children.value.delete(id);
          const parent = parents.value.get(id);
          if (parent) {
            const list = children.value.get(parent) ?? [];
            children.value.set(parent, list.filter((child) => child !== id));
          }
          parents.value.delete(id);
          opened.value.delete(id);
        },
        open: (id, value, event) => {
          vm.emit("click:open", {
            id,
            value,
            path: getPath(id),
            event
          });
          const newOpened = openStrategy.value.open({
            id,
            value,
            opened: new Set(opened.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newOpened && (opened.value = newOpened);
        },
        openOnSelect: (id, value, event) => {
          const newOpened = openStrategy.value.select({
            id,
            value,
            selected: new Map(selected.value),
            opened: new Set(opened.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newOpened && (opened.value = newOpened);
        },
        select: (id, value, event) => {
          vm.emit("click:select", {
            id,
            value,
            path: getPath(id),
            event
          });
          const newSelected = selectStrategy.value.select({
            id,
            value,
            selected: new Map(selected.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newSelected && (selected.value = newSelected);
          nested.root.openOnSelect(id, value, event);
        },
        children,
        parents
      }
    };
    require$$0.provide(VNestedSymbol, nested);
    return nested.root;
  };
  const useNestedItem = (id, isGroup) => {
    const parent = require$$0.inject(VNestedSymbol, emptyNested);
    const uidSymbol = Symbol(getUid());
    const computedId = require$$0.computed(() => id.value !== void 0 ? id.value : uidSymbol);
    const item = {
      ...parent,
      id: computedId,
      open: (open, e) => parent.root.open(computedId.value, open, e),
      openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
      isOpen: require$$0.computed(() => parent.root.opened.value.has(computedId.value)),
      parent: require$$0.computed(() => parent.root.parents.value.get(computedId.value)),
      select: (selected, e) => parent.root.select(computedId.value, selected, e),
      isSelected: require$$0.computed(() => parent.root.selected.value.get(require$$0.toRaw(computedId.value)) === "on"),
      isIndeterminate: require$$0.computed(() => parent.root.selected.value.get(computedId.value) === "indeterminate"),
      isLeaf: require$$0.computed(() => !parent.root.children.value.get(computedId.value)),
      isGroupActivator: parent.isGroupActivator
    };
    !parent.isGroupActivator && parent.root.register(computedId.value, parent.id.value, isGroup);
    require$$0.onBeforeUnmount(() => {
      !parent.isGroupActivator && parent.root.unregister(computedId.value);
    });
    isGroup && require$$0.provide(VNestedSymbol, item);
    return item;
  };
  const useNestedGroupActivator = () => {
    const parent = require$$0.inject(VNestedSymbol, emptyNested);
    require$$0.provide(VNestedSymbol, {
      ...parent,
      isGroupActivator: true
    });
  };
  function useSsrBoot() {
    const isBooted = require$$0.shallowRef(false);
    require$$0.onMounted(() => {
      window.requestAnimationFrame(() => {
        isBooted.value = true;
      });
    });
    const ssrBootStyles = require$$0.computed(() => !isBooted.value ? {
      transition: "none !important"
    } : void 0);
    return {
      ssrBootStyles,
      isBooted: require$$0.readonly(isBooted)
    };
  }
  const VListGroupActivator = defineComponent({
    name: "VListGroupActivator",
    setup(_, _ref) {
      let {
        slots
      } = _ref;
      useNestedGroupActivator();
      return () => {
        var _a;
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      };
    }
  });
  const makeVListGroupProps = propsFactory({
    /* @deprecated */
    activeColor: String,
    baseColor: String,
    color: String,
    collapseIcon: {
      type: IconValue,
      default: "$collapse"
    },
    expandIcon: {
      type: IconValue,
      default: "$expand"
    },
    prependIcon: IconValue,
    appendIcon: IconValue,
    fluid: Boolean,
    subgroup: Boolean,
    title: String,
    value: null,
    ...makeComponentProps(),
    ...makeTagProps()
  }, "VListGroup");
  const VListGroup = genericComponent()({
    name: "VListGroup",
    props: makeVListGroupProps(),
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      const {
        isOpen,
        open,
        id: _id
      } = useNestedItem(require$$0.toRef(props, "value"), true);
      const id = require$$0.computed(() => `v-list-group--id-${String(_id.value)}`);
      const list = useList();
      const {
        isBooted
      } = useSsrBoot();
      function onClick(e) {
        open(!isOpen.value, e);
      }
      const activatorProps = require$$0.computed(() => ({
        onClick,
        class: "v-list-group__header",
        id: id.value
      }));
      const toggleIcon = require$$0.computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
      const activatorDefaults = require$$0.computed(() => ({
        VListItem: {
          active: isOpen.value,
          activeColor: props.activeColor,
          baseColor: props.baseColor,
          color: props.color,
          prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
          appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
          title: props.title,
          value: props.value
        }
      }));
      useRender(() => require$$0.createVNode(props.tag, {
        "class": ["v-list-group", {
          "v-list-group--prepend": list == null ? void 0 : list.hasPrepend.value,
          "v-list-group--fluid": props.fluid,
          "v-list-group--subgroup": props.subgroup,
          "v-list-group--open": isOpen.value
        }, props.class],
        "style": props.style
      }, {
        default: () => [slots.activator && require$$0.createVNode(VDefaultsProvider, {
          "defaults": activatorDefaults.value
        }, {
          default: () => [require$$0.createVNode(VListGroupActivator, null, {
            default: () => [slots.activator({
              props: activatorProps.value,
              isOpen: isOpen.value
            })]
          })]
        }), require$$0.createVNode(MaybeTransition, {
          "transition": {
            component: VExpandTransition
          },
          "disabled": !isBooted.value
        }, {
          default: () => {
            var _a;
            return [require$$0.withDirectives(require$$0.createVNode("div", {
              "class": "v-list-group__items",
              "role": "group",
              "aria-labelledby": id.value
            }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[require$$0.vShow, isOpen.value]])];
          }
        })]
      }));
      return {};
    }
  });
  const VListItemSubtitle = createSimpleFunctional("v-list-item-subtitle");
  const VListItemTitle = createSimpleFunctional("v-list-item-title");
  const makeVListItemProps = propsFactory({
    active: {
      type: Boolean,
      default: void 0
    },
    activeClass: String,
    /* @deprecated */
    activeColor: String,
    appendAvatar: String,
    appendIcon: IconValue,
    baseColor: String,
    disabled: Boolean,
    lines: String,
    link: {
      type: Boolean,
      default: void 0
    },
    nav: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    slim: Boolean,
    subtitle: [String, Number],
    title: [String, Number],
    value: null,
    onClick: EventProp(),
    onClickOnce: EventProp(),
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "text"
    })
  }, "VListItem");
  const VListItem = genericComponent()({
    name: "VListItem",
    directives: {
      Ripple
    },
    props: makeVListItemProps(),
    emits: {
      click: (e) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots,
        emit
      } = _ref;
      const link = useLink(props, attrs);
      const id = require$$0.computed(() => props.value === void 0 ? link.href.value : props.value);
      const {
        select,
        isSelected,
        isIndeterminate,
        isGroupActivator,
        root,
        parent,
        openOnSelect
      } = useNestedItem(id, false);
      const list = useList();
      const isActive = require$$0.computed(() => {
        var _a;
        return props.active !== false && (props.active || ((_a = link.isActive) == null ? void 0 : _a.value) || isSelected.value);
      });
      const isLink = require$$0.computed(() => props.link !== false && link.isLink.value);
      const isClickable = require$$0.computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || props.value != null && !!list));
      const roundedProps = require$$0.computed(() => props.rounded || props.nav);
      const color = require$$0.computed(() => props.color ?? props.activeColor);
      const variantProps = require$$0.computed(() => ({
        color: isActive.value ? color.value ?? props.baseColor : props.baseColor,
        variant: props.variant
      }));
      require$$0.watch(() => {
        var _a;
        return (_a = link.isActive) == null ? void 0 : _a.value;
      }, (val) => {
        if (val && parent.value != null) {
          root.open(parent.value, true);
        }
        if (val) {
          openOnSelect(val);
        }
      }, {
        immediate: true
      });
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
      } = useVariant(variantProps);
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
        roundedClasses
      } = useRounded(roundedProps);
      const lineClasses = require$$0.computed(() => props.lines ? `v-list-item--${props.lines}-line` : void 0);
      const slotProps = require$$0.computed(() => ({
        isActive: isActive.value,
        select,
        isSelected: isSelected.value,
        isIndeterminate: isIndeterminate.value
      }));
      function onClick(e) {
        var _a;
        emit("click", e);
        if (isGroupActivator || !isClickable.value)
          return;
        (_a = link.navigate) == null ? void 0 : _a.call(link, e);
        props.value != null && select(!isSelected.value, e);
      }
      function onKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(e);
        }
      }
      useRender(() => {
        const Tag = isLink.value ? "a" : props.tag;
        const hasTitle = slots.title || props.title != null;
        const hasSubtitle = slots.subtitle || props.subtitle != null;
        const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
        const hasAppend = !!(hasAppendMedia || slots.append);
        const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
        const hasPrepend = !!(hasPrependMedia || slots.prepend);
        list == null ? void 0 : list.updateHasPrepend(hasPrepend);
        if (props.activeColor) {
          deprecate("active-color", ["color", "base-color"]);
        }
        return require$$0.withDirectives(require$$0.createVNode(Tag, {
          "class": ["v-list-item", {
            "v-list-item--active": isActive.value,
            "v-list-item--disabled": props.disabled,
            "v-list-item--link": isClickable.value,
            "v-list-item--nav": props.nav,
            "v-list-item--prepend": !hasPrepend && (list == null ? void 0 : list.hasPrepend.value),
            "v-list-item--slim": props.slim,
            [`${props.activeClass}`]: props.activeClass && isActive.value
          }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value, props.class],
          "style": [colorStyles.value, dimensionStyles.value, props.style],
          "href": link.href.value,
          "tabindex": isClickable.value ? list ? -2 : 0 : void 0,
          "onClick": onClick,
          "onKeydown": isClickable.value && !isLink.value && onKeyDown
        }, {
          default: () => {
            var _a;
            return [genOverlays(isClickable.value || isActive.value, "v-list-item"), hasPrepend && require$$0.createVNode("div", {
              "key": "prepend",
              "class": "v-list-item__prepend"
            }, [!slots.prepend ? require$$0.createVNode(require$$0.Fragment, null, [props.prependAvatar && require$$0.createVNode(VAvatar, {
              "key": "prepend-avatar",
              "density": props.density,
              "image": props.prependAvatar
            }, null), props.prependIcon && require$$0.createVNode(VIcon, {
              "key": "prepend-icon",
              "density": props.density,
              "icon": props.prependIcon
            }, null)]) : require$$0.createVNode(VDefaultsProvider, {
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
                },
                VListItemAction: {
                  start: true
                }
              }
            }, {
              default: () => {
                var _a2;
                return [(_a2 = slots.prepend) == null ? void 0 : _a2.call(slots, slotProps.value)];
              }
            }), require$$0.createVNode("div", {
              "class": "v-list-item__spacer"
            }, null)]), require$$0.createVNode("div", {
              "class": "v-list-item__content",
              "data-no-activator": ""
            }, [hasTitle && require$$0.createVNode(VListItemTitle, {
              "key": "title"
            }, {
              default: () => {
                var _a2;
                return [((_a2 = slots.title) == null ? void 0 : _a2.call(slots, {
                  title: props.title
                })) ?? props.title];
              }
            }), hasSubtitle && require$$0.createVNode(VListItemSubtitle, {
              "key": "subtitle"
            }, {
              default: () => {
                var _a2;
                return [((_a2 = slots.subtitle) == null ? void 0 : _a2.call(slots, {
                  subtitle: props.subtitle
                })) ?? props.subtitle];
              }
            }), (_a = slots.default) == null ? void 0 : _a.call(slots, slotProps.value)]), hasAppend && require$$0.createVNode("div", {
              "key": "append",
              "class": "v-list-item__append"
            }, [!slots.append ? require$$0.createVNode(require$$0.Fragment, null, [props.appendIcon && require$$0.createVNode(VIcon, {
              "key": "append-icon",
              "density": props.density,
              "icon": props.appendIcon
            }, null), props.appendAvatar && require$$0.createVNode(VAvatar, {
              "key": "append-avatar",
              "density": props.density,
              "image": props.appendAvatar
            }, null)]) : require$$0.createVNode(VDefaultsProvider, {
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
                },
                VListItemAction: {
                  end: true
                }
              }
            }, {
              default: () => {
                var _a2;
                return [(_a2 = slots.append) == null ? void 0 : _a2.call(slots, slotProps.value)];
              }
            }), require$$0.createVNode("div", {
              "class": "v-list-item__spacer"
            }, null)])];
          }
        }), [[require$$0.resolveDirective("ripple"), isClickable.value && props.ripple]]);
      });
      return {};
    }
  });
  const makeVListSubheaderProps = propsFactory({
    color: String,
    inset: Boolean,
    sticky: Boolean,
    title: String,
    ...makeComponentProps(),
    ...makeTagProps()
  }, "VListSubheader");
  const VListSubheader = genericComponent()({
    name: "VListSubheader",
    props: makeVListSubheaderProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(require$$0.toRef(props, "color"));
      useRender(() => {
        const hasText = !!(slots.default || props.title);
        return require$$0.createVNode(props.tag, {
          "class": ["v-list-subheader", {
            "v-list-subheader--inset": props.inset,
            "v-list-subheader--sticky": props.sticky
          }, textColorClasses.value, props.class],
          "style": [{
            textColorStyles
          }, props.style]
        }, {
          default: () => {
            var _a;
            return [hasText && require$$0.createVNode("div", {
              "class": "v-list-subheader__text"
            }, [((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? props.title])];
          }
        });
      });
      return {};
    }
  });
  const makeVDividerProps = propsFactory({
    color: String,
    inset: Boolean,
    length: [Number, String],
    thickness: [Number, String],
    vertical: Boolean,
    ...makeComponentProps(),
    ...makeThemeProps()
  }, "VDivider");
  const VDivider = genericComponent()({
    name: "VDivider",
    props: makeVDividerProps(),
    setup(props, _ref) {
      let {
        attrs
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(require$$0.toRef(props, "color"));
      const dividerStyles = require$$0.computed(() => {
        const styles = {};
        if (props.length) {
          styles[props.vertical ? "maxHeight" : "maxWidth"] = convertToUnit(props.length);
        }
        if (props.thickness) {
          styles[props.vertical ? "borderRightWidth" : "borderTopWidth"] = convertToUnit(props.thickness);
        }
        return styles;
      });
      useRender(() => require$$0.createVNode("hr", {
        "class": [{
          "v-divider": true,
          "v-divider--inset": props.inset,
          "v-divider--vertical": props.vertical
        }, themeClasses.value, textColorClasses.value, props.class],
        "style": [dividerStyles.value, textColorStyles.value, props.style],
        "aria-orientation": !attrs.role || attrs.role === "separator" ? props.vertical ? "vertical" : "horizontal" : void 0,
        "role": `${attrs.role || "separator"}`
      }, null));
      return {};
    }
  });
  const makeVListChildrenProps = propsFactory({
    items: Array,
    returnObject: Boolean
  }, "VListChildren");
  const VListChildren = genericComponent()({
    name: "VListChildren",
    props: makeVListChildrenProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      createList();
      return () => {
        var _a, _b;
        return ((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? ((_b = props.items) == null ? void 0 : _b.map((_ref2) => {
          var _a2, _b2;
          let {
            children,
            props: itemProps,
            type,
            raw: item
          } = _ref2;
          if (type === "divider") {
            return ((_a2 = slots.divider) == null ? void 0 : _a2.call(slots, {
              props: itemProps
            })) ?? require$$0.createVNode(VDivider, itemProps, null);
          }
          if (type === "subheader") {
            return ((_b2 = slots.subheader) == null ? void 0 : _b2.call(slots, {
              props: itemProps
            })) ?? require$$0.createVNode(VListSubheader, itemProps, null);
          }
          const slotsWithItem = {
            subtitle: slots.subtitle ? (slotProps) => {
              var _a3;
              return (_a3 = slots.subtitle) == null ? void 0 : _a3.call(slots, {
                ...slotProps,
                item
              });
            } : void 0,
            prepend: slots.prepend ? (slotProps) => {
              var _a3;
              return (_a3 = slots.prepend) == null ? void 0 : _a3.call(slots, {
                ...slotProps,
                item
              });
            } : void 0,
            append: slots.append ? (slotProps) => {
              var _a3;
              return (_a3 = slots.append) == null ? void 0 : _a3.call(slots, {
                ...slotProps,
                item
              });
            } : void 0,
            title: slots.title ? (slotProps) => {
              var _a3;
              return (_a3 = slots.title) == null ? void 0 : _a3.call(slots, {
                ...slotProps,
                item
              });
            } : void 0
          };
          const listGroupProps = VListGroup.filterProps(itemProps);
          return children ? require$$0.createVNode(VListGroup, require$$0.mergeProps({
            "value": itemProps == null ? void 0 : itemProps.value
          }, listGroupProps), {
            activator: (_ref3) => {
              let {
                props: activatorProps
              } = _ref3;
              const listItemProps = {
                ...itemProps,
                ...activatorProps,
                value: props.returnObject ? item : itemProps.value
              };
              return slots.header ? slots.header({
                props: listItemProps
              }) : require$$0.createVNode(VListItem, listItemProps, slotsWithItem);
            },
            default: () => require$$0.createVNode(VListChildren, {
              "items": children
            }, slots)
          }) : slots.item ? slots.item({
            props: itemProps
          }) : require$$0.createVNode(VListItem, require$$0.mergeProps(itemProps, {
            "value": props.returnObject ? item : itemProps.value
          }), slotsWithItem);
        }));
      };
    }
  });
  const makeItemsProps = propsFactory({
    items: {
      type: Array,
      default: () => []
    },
    itemTitle: {
      type: [String, Array, Function],
      default: "title"
    },
    itemValue: {
      type: [String, Array, Function],
      default: "value"
    },
    itemChildren: {
      type: [Boolean, String, Array, Function],
      default: "children"
    },
    itemProps: {
      type: [Boolean, String, Array, Function],
      default: "props"
    },
    returnObject: Boolean,
    valueComparator: {
      type: Function,
      default: deepEqual
    }
  }, "list-items");
  function transformItem$1(props, item) {
    const title = getPropertyFromItem(item, props.itemTitle, item);
    const value = getPropertyFromItem(item, props.itemValue, title);
    const children = getPropertyFromItem(item, props.itemChildren);
    const itemProps = props.itemProps === true ? typeof item === "object" && item != null && !Array.isArray(item) ? "children" in item ? omit(item, ["children"]) : item : void 0 : getPropertyFromItem(item, props.itemProps);
    const _props = {
      title,
      value,
      ...itemProps
    };
    return {
      title: String(_props.title ?? ""),
      value: _props.value,
      props: _props,
      children: Array.isArray(children) ? transformItems$1(props, children) : void 0,
      raw: item
    };
  }
  function transformItems$1(props, items) {
    const array = [];
    for (const item of items) {
      array.push(transformItem$1(props, item));
    }
    return array;
  }
  function useItems(props) {
    const items = require$$0.computed(() => transformItems$1(props, props.items));
    const hasNullItem = require$$0.computed(() => items.value.some((item) => item.value === null));
    function transformIn(value) {
      if (!hasNullItem.value) {
        value = value.filter((v) => v !== null);
      }
      return value.map((v) => {
        if (props.returnObject && typeof v === "string") {
          return transformItem$1(props, v);
        }
        return items.value.find((item) => props.valueComparator(v, item.value)) || transformItem$1(props, v);
      });
    }
    function transformOut(value) {
      return props.returnObject ? value.map((_ref) => {
        let {
          raw
        } = _ref;
        return raw;
      }) : value.map((_ref2) => {
        let {
          value: value2
        } = _ref2;
        return value2;
      });
    }
    return {
      items,
      transformIn,
      transformOut
    };
  }
  function isPrimitive(value) {
    return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
  }
  function transformItem(props, item) {
    const type = getPropertyFromItem(item, props.itemType, "item");
    const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
    const value = getPropertyFromItem(item, props.itemValue, void 0);
    const children = getPropertyFromItem(item, props.itemChildren);
    const itemProps = props.itemProps === true ? omit(item, ["children"]) : getPropertyFromItem(item, props.itemProps);
    const _props = {
      title,
      value,
      ...itemProps
    };
    return {
      type,
      title: _props.title,
      value: _props.value,
      props: _props,
      children: type === "item" && children ? transformItems(props, children) : void 0,
      raw: item
    };
  }
  function transformItems(props, items) {
    const array = [];
    for (const item of items) {
      array.push(transformItem(props, item));
    }
    return array;
  }
  function useListItems(props) {
    const items = require$$0.computed(() => transformItems(props, props.items));
    return {
      items
    };
  }
  const makeVListProps = propsFactory({
    baseColor: String,
    /* @deprecated */
    activeColor: String,
    activeClass: String,
    bgColor: String,
    disabled: Boolean,
    expandIcon: String,
    collapseIcon: String,
    lines: {
      type: [Boolean, String],
      default: "one"
    },
    slim: Boolean,
    nav: Boolean,
    ...makeNestedProps({
      selectStrategy: "single-leaf",
      openStrategy: "list"
    }),
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    itemType: {
      type: String,
      default: "type"
    },
    ...makeItemsProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "text"
    })
  }, "VList");
  const VList = genericComponent()({
    name: "VList",
    props: makeVListProps(),
    emits: {
      "update:selected": (value) => true,
      "update:opened": (value) => true,
      "click:open": (value) => true,
      "click:select": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        items
      } = useListItems(props);
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(require$$0.toRef(props, "bgColor"));
      const {
        borderClasses
      } = useBorder(props);
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
        roundedClasses
      } = useRounded(props);
      const {
        open,
        select
      } = useNested(props);
      const lineClasses = require$$0.computed(() => props.lines ? `v-list--${props.lines}-line` : void 0);
      const activeColor = require$$0.toRef(props, "activeColor");
      const baseColor = require$$0.toRef(props, "baseColor");
      const color = require$$0.toRef(props, "color");
      createList();
      provideDefaults({
        VListGroup: {
          activeColor,
          baseColor,
          color,
          expandIcon: require$$0.toRef(props, "expandIcon"),
          collapseIcon: require$$0.toRef(props, "collapseIcon")
        },
        VListItem: {
          activeClass: require$$0.toRef(props, "activeClass"),
          activeColor,
          baseColor,
          color,
          density: require$$0.toRef(props, "density"),
          disabled: require$$0.toRef(props, "disabled"),
          lines: require$$0.toRef(props, "lines"),
          nav: require$$0.toRef(props, "nav"),
          slim: require$$0.toRef(props, "slim"),
          variant: require$$0.toRef(props, "variant")
        }
      });
      const isFocused = require$$0.shallowRef(false);
      const contentRef = require$$0.ref();
      function onFocusin(e) {
        isFocused.value = true;
      }
      function onFocusout(e) {
        isFocused.value = false;
      }
      function onFocus(e) {
        var _a;
        if (!isFocused.value && !(e.relatedTarget && ((_a = contentRef.value) == null ? void 0 : _a.contains(e.relatedTarget))))
          focus();
      }
      function onKeydown(e) {
        if (!contentRef.value)
          return;
        if (e.key === "ArrowDown") {
          focus("next");
        } else if (e.key === "ArrowUp") {
          focus("prev");
        } else if (e.key === "Home") {
          focus("first");
        } else if (e.key === "End") {
          focus("last");
        } else {
          return;
        }
        e.preventDefault();
      }
      function onMousedown(e) {
        isFocused.value = true;
      }
      function focus(location) {
        if (contentRef.value) {
          return focusChild(contentRef.value, location);
        }
      }
      useRender(() => {
        return require$$0.createVNode(props.tag, {
          "ref": contentRef,
          "class": ["v-list", {
            "v-list--disabled": props.disabled,
            "v-list--nav": props.nav,
            "v-list--slim": props.slim
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, props.class],
          "style": [backgroundColorStyles.value, dimensionStyles.value, props.style],
          "tabindex": props.disabled || isFocused.value ? -1 : 0,
          "role": "listbox",
          "aria-activedescendant": void 0,
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onFocus": onFocus,
          "onKeydown": onKeydown,
          "onMousedown": onMousedown
        }, {
          default: () => [require$$0.createVNode(VListChildren, {
            "items": items.value,
            "returnObject": props.returnObject
          }, slots)]
        });
      });
      return {
        open,
        select,
        focus
      };
    }
  });
  const makeVMenuProps = propsFactory({
    // TODO
    // disableKeys: Boolean,
    id: String,
    ...omit(makeVOverlayProps({
      closeDelay: 250,
      closeOnContentClick: true,
      locationStrategy: "connected",
      openDelay: 300,
      scrim: false,
      scrollStrategy: "reposition",
      transition: {
        component: VDialogTransition
      }
    }), ["absolute"])
  }, "VMenu");
  const VMenu = genericComponent()({
    name: "VMenu",
    props: makeVMenuProps(),
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
      const uid = getUid();
      const id = require$$0.computed(() => props.id || `v-menu-${uid}`);
      const overlay = require$$0.ref();
      const parent = require$$0.inject(VMenuSymbol, null);
      const openChildren = require$$0.shallowRef(0);
      require$$0.provide(VMenuSymbol, {
        register() {
          ++openChildren.value;
        },
        unregister() {
          --openChildren.value;
        },
        closeParents(e) {
          setTimeout(() => {
            if (!openChildren.value && (e == null || e && !isClickInsideElement(e, overlay.value.contentEl))) {
              isActive.value = false;
              parent == null ? void 0 : parent.closeParents();
            }
          }, 40);
        }
      });
      async function onFocusIn(e) {
        var _a, _b, _c;
        const before = e.relatedTarget;
        const after = e.target;
        await require$$0.nextTick();
        if (isActive.value && before !== after && ((_a = overlay.value) == null ? void 0 : _a.contentEl) && // We're the topmost menu
        ((_b = overlay.value) == null ? void 0 : _b.globalTop) && // It isn't the document or the menu body
        ![document, overlay.value.contentEl].includes(after) && // It isn't inside the menu body
        !overlay.value.contentEl.contains(after)) {
          const focusable = focusableChildren(overlay.value.contentEl);
          (_c = focusable[0]) == null ? void 0 : _c.focus();
        }
      }
      require$$0.watch(isActive, (val) => {
        if (val) {
          parent == null ? void 0 : parent.register();
          document.addEventListener("focusin", onFocusIn, {
            once: true
          });
        } else {
          parent == null ? void 0 : parent.unregister();
          document.removeEventListener("focusin", onFocusIn);
        }
      });
      function onClickOutside(e) {
        parent == null ? void 0 : parent.closeParents(e);
      }
      function onKeydown(e) {
        var _a, _b, _c;
        if (props.disabled)
          return;
        if (e.key === "Tab") {
          const nextElement = getNextElement(focusableChildren((_a = overlay.value) == null ? void 0 : _a.contentEl, false), e.shiftKey ? "prev" : "next", (el) => el.tabIndex >= 0);
          if (!nextElement) {
            isActive.value = false;
            (_c = (_b = overlay.value) == null ? void 0 : _b.activatorEl) == null ? void 0 : _c.focus();
          }
        }
      }
      function onActivatorKeydown(e) {
        var _a;
        if (props.disabled)
          return;
        const el = (_a = overlay.value) == null ? void 0 : _a.contentEl;
        if (el && isActive.value) {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            focusChild(el, "next");
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            focusChild(el, "prev");
          }
        } else if (["ArrowDown", "ArrowUp"].includes(e.key)) {
          isActive.value = true;
          e.preventDefault();
          setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
        }
      }
      const activatorProps = require$$0.computed(() => require$$0.mergeProps({
        "aria-haspopup": "menu",
        "aria-expanded": String(isActive.value),
        "aria-owns": id.value,
        onKeydown: onActivatorKeydown
      }, props.activatorProps));
      useRender(() => {
        const overlayProps = VOverlay.filterProps(props);
        return require$$0.createVNode(VOverlay, require$$0.mergeProps({
          "ref": overlay,
          "id": id.value,
          "class": ["v-menu", props.class],
          "style": props.style
        }, overlayProps, {
          "modelValue": isActive.value,
          "onUpdate:modelValue": ($event) => isActive.value = $event,
          "absolute": true,
          "activatorProps": activatorProps.value,
          "onClick:outside": onClickOutside,
          "onKeydown": onKeydown
        }, scopeId), {
          activator: slots.activator,
          default: function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return require$$0.createVNode(VDefaultsProvider, {
              "root": "VMenu"
            }, {
              default: () => {
                var _a;
                return [(_a = slots.default) == null ? void 0 : _a.call(slots, ...args)];
              }
            });
          }
        });
      });
      return forwardRefs({
        id,
        ΨopenChildren: openChildren
      }, overlay);
    }
  });
  const makeVVirtualScrollItemProps = propsFactory({
    renderless: Boolean,
    ...makeComponentProps()
  }, "VVirtualScrollItem");
  const VVirtualScrollItem = genericComponent()({
    name: "VVirtualScrollItem",
    inheritAttrs: false,
    props: makeVVirtualScrollItemProps(),
    emits: {
      "update:height": (height) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit,
        slots
      } = _ref;
      const {
        resizeRef,
        contentRect
      } = useResizeObserver(void 0, "border");
      require$$0.watch(() => {
        var _a;
        return (_a = contentRect.value) == null ? void 0 : _a.height;
      }, (height) => {
        if (height != null)
          emit("update:height", height);
      });
      useRender(() => {
        var _a, _b;
        return props.renderless ? require$$0.createVNode(require$$0.Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          itemRef: resizeRef
        })]) : require$$0.createVNode("div", require$$0.mergeProps({
          "ref": resizeRef,
          "class": ["v-virtual-scroll__item", props.class],
          "style": props.style
        }, attrs), [(_b = slots.default) == null ? void 0 : _b.call(slots)]);
      });
    }
  });
  const UP = -1;
  const DOWN = 1;
  const BUFFER_PX = 100;
  const makeVirtualProps = propsFactory({
    itemHeight: {
      type: [Number, String],
      default: null
    },
    height: [Number, String]
  }, "virtual");
  function useVirtual(props, items) {
    const display = useDisplay();
    const itemHeight = require$$0.shallowRef(0);
    require$$0.watchEffect(() => {
      itemHeight.value = parseFloat(props.itemHeight || 0);
    });
    const first = require$$0.shallowRef(0);
    const last = require$$0.shallowRef(Math.ceil(
      // Assume 16px items filling the entire screen height if
      // not provided. This is probably incorrect but it minimises
      // the chance of ending up with empty space at the bottom.
      // The default value is set here to avoid poisoning getSize()
      (parseInt(props.height) || display.height.value) / (itemHeight.value || 16)
    ) || 1);
    const paddingTop = require$$0.shallowRef(0);
    const paddingBottom = require$$0.shallowRef(0);
    const containerRef = require$$0.ref();
    const markerRef = require$$0.ref();
    let markerOffset = 0;
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    require$$0.watchEffect(() => {
      resizeRef.value = containerRef.value;
    });
    const viewportHeight = require$$0.computed(() => {
      var _a;
      return containerRef.value === document.documentElement ? display.height.value : ((_a = contentRect.value) == null ? void 0 : _a.height) || parseInt(props.height) || 0;
    });
    const hasInitialRender = require$$0.computed(() => {
      return !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value);
    });
    let sizes = Array.from({
      length: items.value.length
    });
    let offsets = Array.from({
      length: items.value.length
    });
    const updateTime = require$$0.shallowRef(0);
    let targetScrollIndex = -1;
    function getSize(index2) {
      return sizes[index2] || itemHeight.value;
    }
    const updateOffsets = debounce(() => {
      const start = performance.now();
      offsets[0] = 0;
      const length = items.value.length;
      for (let i = 1; i <= length - 1; i++) {
        offsets[i] = (offsets[i - 1] || 0) + getSize(i - 1);
      }
      updateTime.value = Math.max(updateTime.value, performance.now() - start);
    }, updateTime);
    const unwatch = require$$0.watch(hasInitialRender, (v) => {
      if (!v)
        return;
      unwatch();
      markerOffset = markerRef.value.offsetTop;
      updateOffsets.immediate();
      calculateVisibleItems();
      if (!~targetScrollIndex)
        return;
      require$$0.nextTick(() => {
        IN_BROWSER && window.requestAnimationFrame(() => {
          scrollToIndex(targetScrollIndex);
          targetScrollIndex = -1;
        });
      });
    });
    require$$0.onScopeDispose(() => {
      updateOffsets.clear();
    });
    function handleItemResize(index2, height) {
      const prevHeight = sizes[index2];
      const prevMinHeight = itemHeight.value;
      itemHeight.value = prevMinHeight ? Math.min(itemHeight.value, height) : height;
      if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
        sizes[index2] = height;
        updateOffsets();
      }
    }
    function calculateOffset(index2) {
      index2 = clamp(index2, 0, items.value.length - 1);
      return offsets[index2] || 0;
    }
    function calculateIndex(scrollTop) {
      return binaryClosest(offsets, scrollTop);
    }
    let lastScrollTop = 0;
    let scrollVelocity = 0;
    let lastScrollTime = 0;
    require$$0.watch(viewportHeight, (val, oldVal) => {
      if (oldVal) {
        calculateVisibleItems();
        if (val < oldVal) {
          requestAnimationFrame(() => {
            scrollVelocity = 0;
            calculateVisibleItems();
          });
        }
      }
    });
    function handleScroll() {
      if (!containerRef.value || !markerRef.value)
        return;
      const scrollTop = containerRef.value.scrollTop;
      const scrollTime = performance.now();
      const scrollDeltaT = scrollTime - lastScrollTime;
      if (scrollDeltaT > 500) {
        scrollVelocity = Math.sign(scrollTop - lastScrollTop);
        markerOffset = markerRef.value.offsetTop;
      } else {
        scrollVelocity = scrollTop - lastScrollTop;
      }
      lastScrollTop = scrollTop;
      lastScrollTime = scrollTime;
      calculateVisibleItems();
    }
    function handleScrollend() {
      if (!containerRef.value || !markerRef.value)
        return;
      scrollVelocity = 0;
      lastScrollTime = 0;
      calculateVisibleItems();
    }
    let raf2 = -1;
    function calculateVisibleItems() {
      cancelAnimationFrame(raf2);
      raf2 = requestAnimationFrame(_calculateVisibleItems);
    }
    function _calculateVisibleItems() {
      if (!containerRef.value || !viewportHeight.value)
        return;
      const scrollTop = lastScrollTop - markerOffset;
      const direction = Math.sign(scrollVelocity);
      const startPx = Math.max(0, scrollTop - BUFFER_PX);
      const start = clamp(calculateIndex(startPx), 0, items.value.length);
      const endPx = scrollTop + viewportHeight.value + BUFFER_PX;
      const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length);
      if (
        // Only update the side we're scrolling towards,
        // the other side will be updated incidentally
        (direction !== UP || start < first.value) && (direction !== DOWN || end > last.value)
      ) {
        const topOverflow = calculateOffset(first.value) - calculateOffset(start);
        const bottomOverflow = calculateOffset(end) - calculateOffset(last.value);
        const bufferOverflow = Math.max(topOverflow, bottomOverflow);
        if (bufferOverflow > BUFFER_PX) {
          first.value = start;
          last.value = end;
        } else {
          if (start <= 0)
            first.value = start;
          if (end >= items.value.length)
            last.value = end;
        }
      }
      paddingTop.value = calculateOffset(first.value);
      paddingBottom.value = calculateOffset(items.value.length) - calculateOffset(last.value);
    }
    function scrollToIndex(index2) {
      const offset = calculateOffset(index2);
      if (!containerRef.value || index2 && !offset) {
        targetScrollIndex = index2;
      } else {
        containerRef.value.scrollTop = offset;
      }
    }
    const computedItems = require$$0.computed(() => {
      return items.value.slice(first.value, last.value).map((item, index2) => ({
        raw: item,
        index: index2 + first.value
      }));
    });
    require$$0.watch(items, () => {
      sizes = Array.from({
        length: items.value.length
      });
      offsets = Array.from({
        length: items.value.length
      });
      updateOffsets.immediate();
      calculateVisibleItems();
    }, {
      deep: true
    });
    return {
      containerRef,
      markerRef,
      computedItems,
      paddingTop,
      paddingBottom,
      scrollToIndex,
      handleScroll,
      handleScrollend,
      handleItemResize
    };
  }
  function binaryClosest(arr, val) {
    let high = arr.length - 1;
    let low = 0;
    let mid = 0;
    let item = null;
    let target = -1;
    if (arr[high] < val) {
      return high;
    }
    while (low <= high) {
      mid = low + high >> 1;
      item = arr[mid];
      if (item > val) {
        high = mid - 1;
      } else if (item < val) {
        target = mid;
        low = mid + 1;
      } else if (item === val) {
        return mid;
      } else {
        return low;
      }
    }
    return target;
  }
  const makeVVirtualScrollProps = propsFactory({
    items: {
      type: Array,
      default: () => []
    },
    renderless: Boolean,
    ...makeVirtualProps(),
    ...makeComponentProps(),
    ...makeDimensionProps()
  }, "VVirtualScroll");
  const VVirtualScroll = genericComponent()({
    name: "VVirtualScroll",
    props: makeVVirtualScrollProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const vm = getCurrentInstance("VVirtualScroll");
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        containerRef,
        markerRef,
        handleScroll,
        handleScrollend,
        handleItemResize,
        scrollToIndex,
        paddingTop,
        paddingBottom,
        computedItems
      } = useVirtual(props, require$$0.toRef(props, "items"));
      useToggleScope(() => props.renderless, () => {
        function handleListeners() {
          var _a, _b;
          let add = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
          const method = add ? "addEventListener" : "removeEventListener";
          if (containerRef.value === document.documentElement) {
            document[method]("scroll", handleScroll, {
              passive: true
            });
            document[method]("scrollend", handleScrollend);
          } else {
            (_a = containerRef.value) == null ? void 0 : _a[method]("scroll", handleScroll, {
              passive: true
            });
            (_b = containerRef.value) == null ? void 0 : _b[method]("scrollend", handleScrollend);
          }
        }
        require$$0.onMounted(() => {
          containerRef.value = getScrollParent(vm.vnode.el, true);
          handleListeners(true);
        });
        require$$0.onScopeDispose(handleListeners);
      });
      useRender(() => {
        const children = computedItems.value.map((item) => require$$0.createVNode(VVirtualScrollItem, {
          "key": item.index,
          "renderless": props.renderless,
          "onUpdate:height": (height) => handleItemResize(item.index, height)
        }, {
          default: (slotProps) => {
            var _a;
            return (_a = slots.default) == null ? void 0 : _a.call(slots, {
              item: item.raw,
              index: item.index,
              ...slotProps
            });
          }
        }));
        return props.renderless ? require$$0.createVNode(require$$0.Fragment, null, [require$$0.createVNode("div", {
          "ref": markerRef,
          "class": "v-virtual-scroll__spacer",
          "style": {
            paddingTop: convertToUnit(paddingTop.value)
          }
        }, null), children, require$$0.createVNode("div", {
          "class": "v-virtual-scroll__spacer",
          "style": {
            paddingBottom: convertToUnit(paddingBottom.value)
          }
        }, null)]) : require$$0.createVNode("div", {
          "ref": containerRef,
          "class": ["v-virtual-scroll", props.class],
          "onScrollPassive": handleScroll,
          "onScrollend": handleScrollend,
          "style": [dimensionStyles.value, props.style]
        }, [require$$0.createVNode("div", {
          "ref": markerRef,
          "class": "v-virtual-scroll__container",
          "style": {
            paddingTop: convertToUnit(paddingTop.value),
            paddingBottom: convertToUnit(paddingBottom.value)
          }
        }, [children])]);
      });
      return {
        scrollToIndex
      };
    }
  });
  function useScrolling(listRef, textFieldRef) {
    const isScrolling = require$$0.shallowRef(false);
    let scrollTimeout;
    function onListScroll(e) {
      cancelAnimationFrame(scrollTimeout);
      isScrolling.value = true;
      scrollTimeout = requestAnimationFrame(() => {
        scrollTimeout = requestAnimationFrame(() => {
          isScrolling.value = false;
        });
      });
    }
    async function finishScrolling() {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => {
        if (isScrolling.value) {
          const stop = require$$0.watch(isScrolling, () => {
            stop();
            resolve();
          });
        } else
          resolve();
      });
    }
    async function onListKeydown(e) {
      var _a, _b;
      if (e.key === "Tab") {
        (_a = textFieldRef.value) == null ? void 0 : _a.focus();
      }
      if (!["PageDown", "PageUp", "Home", "End"].includes(e.key))
        return;
      const el = (_b = listRef.value) == null ? void 0 : _b.$el;
      if (!el)
        return;
      if (e.key === "Home" || e.key === "End") {
        el.scrollTo({
          top: e.key === "Home" ? 0 : el.scrollHeight,
          behavior: "smooth"
        });
      }
      await finishScrolling();
      const children = el.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
      if (e.key === "PageDown" || e.key === "Home") {
        const top = el.getBoundingClientRect().top;
        for (const child of children) {
          if (child.getBoundingClientRect().top >= top) {
            child.focus();
            break;
          }
        }
      } else {
        const bottom = el.getBoundingClientRect().bottom;
        for (const child of [...children].reverse()) {
          if (child.getBoundingClientRect().bottom <= bottom) {
            child.focus();
            break;
          }
        }
      }
    }
    return {
      onListScroll,
      onListKeydown
    };
  }
  const makeSelectProps = propsFactory({
    chips: Boolean,
    closableChips: Boolean,
    closeText: {
      type: String,
      default: "$vuetify.close"
    },
    openText: {
      type: String,
      default: "$vuetify.open"
    },
    eager: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    listProps: {
      type: Object
    },
    menu: Boolean,
    menuIcon: {
      type: IconValue,
      default: "$dropdown"
    },
    menuProps: {
      type: Object
    },
    multiple: Boolean,
    noDataText: {
      type: String,
      default: "$vuetify.noDataText"
    },
    openOnClear: Boolean,
    itemColor: String,
    ...makeItemsProps({
      itemChildren: false
    })
  }, "Select");
  const makeVSelectProps = propsFactory({
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null,
      role: "combobox"
    }), ["validationValue", "dirty", "appendInnerIcon"]),
    ...makeTransitionProps$1({
      transition: {
        component: VDialogTransition
      }
    })
  }, "VSelect");
  const VSelect = genericComponent()({
    name: "VSelect",
    props: makeVSelectProps(),
    emits: {
      "update:focused": (focused) => true,
      "update:modelValue": (value) => true,
      "update:menu": (ue) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const vTextFieldRef = require$$0.ref();
      const vMenuRef = require$$0.ref();
      const vVirtualScrollRef = require$$0.ref();
      const _menu = useProxiedModel(props, "menu");
      const menu = require$$0.computed({
        get: () => _menu.value,
        set: (v) => {
          var _a;
          if (_menu.value && !v && ((_a = vMenuRef.value) == null ? void 0 : _a.ΨopenChildren))
            return;
          _menu.value = v;
        }
      });
      const {
        items,
        transformIn,
        transformOut
      } = useItems(props);
      const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const counterValue = require$$0.computed(() => {
        return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
      });
      const form = useForm();
      const selectedValues = require$$0.computed(() => model.value.map((selection) => selection.value));
      const isFocused = require$$0.shallowRef(false);
      const label = require$$0.computed(() => menu.value ? props.closeText : props.openText);
      let keyboardLookupPrefix = "";
      let keyboardLookupLastTime;
      const displayItems = require$$0.computed(() => {
        if (props.hideSelected) {
          return items.value.filter((item) => !model.value.some((s) => s === item));
        }
        return items.value;
      });
      const menuDisabled = require$$0.computed(() => props.hideNoData && !displayItems.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value));
      const computedMenuProps = require$$0.computed(() => {
        var _a;
        return {
          ...props.menuProps,
          activatorProps: {
            ...((_a = props.menuProps) == null ? void 0 : _a.activatorProps) || {},
            "aria-haspopup": "listbox"
            // Set aria-haspopup to 'listbox'
          }
        };
      });
      const listRef = require$$0.ref();
      const {
        onListScroll,
        onListKeydown
      } = useScrolling(listRef, vTextFieldRef);
      function onClear(e) {
        if (props.openOnClear) {
          menu.value = true;
        }
      }
      function onMousedownControl() {
        if (menuDisabled.value)
          return;
        menu.value = !menu.value;
      }
      function onKeydown(e) {
        var _a, _b;
        if (!e.key || props.readonly || (form == null ? void 0 : form.isReadonly.value))
          return;
        if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
          e.preventDefault();
        }
        if (["Enter", "ArrowDown", " "].includes(e.key)) {
          menu.value = true;
        }
        if (["Escape", "Tab"].includes(e.key)) {
          menu.value = false;
        }
        if (e.key === "Home") {
          (_a = listRef.value) == null ? void 0 : _a.focus("first");
        } else if (e.key === "End") {
          (_b = listRef.value) == null ? void 0 : _b.focus("last");
        }
        const KEYBOARD_LOOKUP_THRESHOLD = 1e3;
        function checkPrintable(e2) {
          const isPrintableChar = e2.key.length === 1;
          const noModifier = !e2.ctrlKey && !e2.metaKey && !e2.altKey;
          return isPrintableChar && noModifier;
        }
        if (props.multiple || !checkPrintable(e))
          return;
        const now = performance.now();
        if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
          keyboardLookupPrefix = "";
        }
        keyboardLookupPrefix += e.key.toLowerCase();
        keyboardLookupLastTime = now;
        const item = items.value.find((item2) => item2.title.toLowerCase().startsWith(keyboardLookupPrefix));
        if (item !== void 0) {
          model.value = [item];
        }
      }
      function select(item) {
        let set = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        if (item.props.disabled)
          return;
        if (props.multiple) {
          const index2 = model.value.findIndex((selection) => props.valueComparator(selection.value, item.value));
          const add = set == null ? !~index2 : set;
          if (~index2) {
            const value = add ? [...model.value, item] : [...model.value];
            value.splice(index2, 1);
            model.value = value;
          } else if (add) {
            model.value = [...model.value, item];
          }
        } else {
          const add = set !== false;
          model.value = add ? [item] : [];
          require$$0.nextTick(() => {
            menu.value = false;
          });
        }
      }
      function onBlur(e) {
        var _a;
        if (!((_a = listRef.value) == null ? void 0 : _a.$el.contains(e.relatedTarget))) {
          menu.value = false;
        }
      }
      function onAfterLeave() {
        var _a;
        if (isFocused.value) {
          (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
        }
      }
      function onFocusin(e) {
        isFocused.value = true;
      }
      function onModelUpdate(v) {
        if (v == null)
          model.value = [];
        else if (matchesSelector(vTextFieldRef.value, ":autofill") || matchesSelector(vTextFieldRef.value, ":-webkit-autofill")) {
          const item = items.value.find((item2) => item2.title === v);
          if (item) {
            select(item);
          }
        } else if (vTextFieldRef.value) {
          vTextFieldRef.value.value = "";
        }
      }
      require$$0.watch(menu, () => {
        if (!props.hideSelected && menu.value && model.value.length) {
          const index2 = displayItems.value.findIndex((item) => model.value.some((s) => props.valueComparator(s.value, item.value)));
          IN_BROWSER && window.requestAnimationFrame(() => {
            var _a;
            index2 >= 0 && ((_a = vVirtualScrollRef.value) == null ? void 0 : _a.scrollToIndex(index2));
          });
        }
      });
      require$$0.watch(() => props.items, (val) => {
        if (!isFocused.value || !val.length || menu.value)
          return;
        menu.value = true;
      });
      useRender(() => {
        const hasChips = !!(props.chips || slots.chip);
        const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
        const isDirty = model.value.length > 0;
        const textFieldProps = VTextField.filterProps(props);
        const placeholder = isDirty || !isFocused.value && props.label && !props.persistentPlaceholder ? void 0 : props.placeholder;
        return require$$0.createVNode(VTextField, require$$0.mergeProps({
          "ref": vTextFieldRef
        }, textFieldProps, {
          "modelValue": model.value.map((v) => v.props.value).join(", "),
          "onUpdate:modelValue": onModelUpdate,
          "focused": isFocused.value,
          "onUpdate:focused": ($event) => isFocused.value = $event,
          "validationValue": model.externalValue,
          "counterValue": counterValue.value,
          "dirty": isDirty,
          "class": ["v-select", {
            "v-select--active-menu": menu.value,
            "v-select--chips": !!props.chips,
            [`v-select--${props.multiple ? "multiple" : "single"}`]: true,
            "v-select--selected": model.value.length,
            "v-select--selection-slot": !!slots.selection
          }, props.class],
          "style": props.style,
          "inputmode": "none",
          "placeholder": placeholder,
          "onClick:clear": onClear,
          "onMousedown:control": onMousedownControl,
          "onBlur": onBlur,
          "onKeydown": onKeydown,
          "aria-label": t(label.value),
          "title": t(label.value)
        }), {
          ...slots,
          default: () => require$$0.createVNode(require$$0.Fragment, null, [require$$0.createVNode(VMenu, require$$0.mergeProps({
            "ref": vMenuRef,
            "modelValue": menu.value,
            "onUpdate:modelValue": ($event) => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-select__content",
            "disabled": menuDisabled.value,
            "eager": props.eager,
            "maxHeight": 310,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition,
            "onAfterLeave": onAfterLeave
          }, computedMenuProps.value), {
            default: () => [hasList && require$$0.createVNode(VList, require$$0.mergeProps({
              "ref": listRef,
              "selected": selectedValues.value,
              "selectStrategy": props.multiple ? "independent" : "single-independent",
              "onMousedown": (e) => e.preventDefault(),
              "onKeydown": onListKeydown,
              "onFocusin": onFocusin,
              "onScrollPassive": onListScroll,
              "tabindex": "-1",
              "aria-live": "polite",
              "color": props.itemColor ?? props.color
            }, props.listProps), {
              default: () => {
                var _a, _b, _c;
                return [(_a = slots["prepend-item"]) == null ? void 0 : _a.call(slots), !displayItems.value.length && !props.hideNoData && (((_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) ?? require$$0.createVNode(VListItem, {
                  "title": t(props.noDataText)
                }, null)), require$$0.createVNode(VVirtualScroll, {
                  "ref": vVirtualScrollRef,
                  "renderless": true,
                  "items": displayItems.value
                }, {
                  default: (_ref2) => {
                    var _a2;
                    let {
                      item,
                      index: index2,
                      itemRef
                    } = _ref2;
                    const itemProps = require$$0.mergeProps(item.props, {
                      ref: itemRef,
                      key: index2,
                      onClick: () => select(item, null)
                    });
                    return ((_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
                      item,
                      index: index2,
                      props: itemProps
                    })) ?? require$$0.createVNode(VListItem, require$$0.mergeProps(itemProps, {
                      "role": "option"
                    }), {
                      prepend: (_ref3) => {
                        let {
                          isSelected
                        } = _ref3;
                        return require$$0.createVNode(require$$0.Fragment, null, [props.multiple && !props.hideSelected ? require$$0.createVNode(VCheckboxBtn, {
                          "key": item.value,
                          "modelValue": isSelected,
                          "ripple": false,
                          "tabindex": "-1"
                        }, null) : void 0, item.props.prependAvatar && require$$0.createVNode(VAvatar, {
                          "image": item.props.prependAvatar
                        }, null), item.props.prependIcon && require$$0.createVNode(VIcon, {
                          "icon": item.props.prependIcon
                        }, null)]);
                      }
                    });
                  }
                }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
              }
            })]
          }), model.value.map((item, index2) => {
            function onChipClose(e) {
              e.stopPropagation();
              e.preventDefault();
              select(item, false);
            }
            const slotProps = {
              "onClick:close": onChipClose,
              onMousedown(e) {
                e.preventDefault();
                e.stopPropagation();
              },
              modelValue: true,
              "onUpdate:modelValue": void 0
            };
            const hasSlot = hasChips ? !!slots.chip : !!slots.selection;
            const slotContent = hasSlot ? ensureValidVNode(hasChips ? slots.chip({
              item,
              index: index2,
              props: slotProps
            }) : slots.selection({
              item,
              index: index2
            })) : void 0;
            if (hasSlot && !slotContent)
              return void 0;
            return require$$0.createVNode("div", {
              "key": item.value,
              "class": "v-select__selection"
            }, [hasChips ? !slots.chip ? require$$0.createVNode(VChip, require$$0.mergeProps({
              "key": "chip",
              "closable": props.closableChips,
              "size": "small",
              "text": item.title,
              "disabled": item.props.disabled
            }, slotProps), null) : require$$0.createVNode(VDefaultsProvider, {
              "key": "chip-defaults",
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: "small",
                  text: item.title
                }
              }
            }, {
              default: () => [slotContent]
            }) : slotContent ?? require$$0.createVNode("span", {
              "class": "v-select__selection-text"
            }, [item.title, props.multiple && index2 < model.value.length - 1 && require$$0.createVNode("span", {
              "class": "v-select__selection-comma"
            }, [require$$0.createTextVNode(",")])])]);
          })]),
          "append-inner": function() {
            var _a;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return require$$0.createVNode(require$$0.Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), props.menuIcon ? require$$0.createVNode(VIcon, {
              "class": "v-select__menu-icon",
              "icon": props.menuIcon
            }, null) : void 0]);
          }
        });
      });
      return forwardRefs({
        isFocused,
        menu,
        select
      }, vTextFieldRef);
    }
  });
  const defaultFilter = (value, query, item) => {
    if (value == null || query == null)
      return -1;
    return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
  };
  const makeFilterProps = propsFactory({
    customFilter: Function,
    customKeyFilter: Object,
    filterKeys: [Array, String],
    filterMode: {
      type: String,
      default: "intersection"
    },
    noFilter: Boolean
  }, "filter");
  function filterItems(items, query, options) {
    var _a;
    const array = [];
    const filter = (options == null ? void 0 : options.default) ?? defaultFilter;
    const keys = (options == null ? void 0 : options.filterKeys) ? wrapInArray(options.filterKeys) : false;
    const customFiltersLength = Object.keys((options == null ? void 0 : options.customKeyFilter) ?? {}).length;
    if (!(items == null ? void 0 : items.length))
      return array;
    loop:
      for (let i = 0; i < items.length; i++) {
        const [item, transformed = item] = wrapInArray(items[i]);
        const customMatches = {};
        const defaultMatches = {};
        let match2 = -1;
        if (query && !(options == null ? void 0 : options.noFilter)) {
          if (typeof item === "object") {
            const filterKeys = keys || Object.keys(transformed);
            for (const key of filterKeys) {
              const value = getPropertyFromItem(transformed, key);
              const keyFilter = (_a = options == null ? void 0 : options.customKeyFilter) == null ? void 0 : _a[key];
              match2 = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
              if (match2 !== -1 && match2 !== false) {
                if (keyFilter)
                  customMatches[key] = match2;
                else
                  defaultMatches[key] = match2;
              } else if ((options == null ? void 0 : options.filterMode) === "every") {
                continue loop;
              }
            }
          } else {
            match2 = filter(item, query, item);
            if (match2 !== -1 && match2 !== false) {
              defaultMatches.title = match2;
            }
          }
          const defaultMatchesLength = Object.keys(defaultMatches).length;
          const customMatchesLength = Object.keys(customMatches).length;
          if (!defaultMatchesLength && !customMatchesLength)
            continue;
          if ((options == null ? void 0 : options.filterMode) === "union" && customMatchesLength !== customFiltersLength && !defaultMatchesLength)
            continue;
          if ((options == null ? void 0 : options.filterMode) === "intersection" && (customMatchesLength !== customFiltersLength || !defaultMatchesLength))
            continue;
        }
        array.push({
          index: i,
          matches: {
            ...defaultMatches,
            ...customMatches
          }
        });
      }
    return array;
  }
  function useFilter(props, items, query, options) {
    const filteredItems = require$$0.ref([]);
    const filteredMatches = require$$0.ref(/* @__PURE__ */ new Map());
    const transformedItems = require$$0.computed(() => (options == null ? void 0 : options.transform) ? require$$0.unref(items).map((item) => [item, options.transform(item)]) : require$$0.unref(items));
    require$$0.watchEffect(() => {
      const _query = typeof query === "function" ? query() : require$$0.unref(query);
      const strQuery = typeof _query !== "string" && typeof _query !== "number" ? "" : String(_query);
      const results = filterItems(transformedItems.value, strQuery, {
        customKeyFilter: {
          ...props.customKeyFilter,
          ...require$$0.unref(options == null ? void 0 : options.customKeyFilter)
        },
        default: props.customFilter,
        filterKeys: props.filterKeys,
        filterMode: props.filterMode,
        noFilter: props.noFilter
      });
      const originalItems = require$$0.unref(items);
      const _filteredItems = [];
      const _filteredMatches = /* @__PURE__ */ new Map();
      results.forEach((_ref) => {
        let {
          index: index2,
          matches: matches2
        } = _ref;
        const item = originalItems[index2];
        _filteredItems.push(item);
        _filteredMatches.set(item.value, matches2);
      });
      filteredItems.value = _filteredItems;
      filteredMatches.value = _filteredMatches;
    });
    function getMatches(item) {
      return filteredMatches.value.get(item.value);
    }
    return {
      filteredItems,
      filteredMatches,
      getMatches
    };
  }
  function highlightResult(text, matches2, length) {
    if (matches2 == null)
      return text;
    if (Array.isArray(matches2))
      throw new Error("Multiple matches is not implemented");
    return typeof matches2 === "number" && ~matches2 ? require$$0.createVNode(require$$0.Fragment, null, [require$$0.createVNode("span", {
      "class": "v-autocomplete__unmask"
    }, [text.substr(0, matches2)]), require$$0.createVNode("span", {
      "class": "v-autocomplete__mask"
    }, [text.substr(matches2, length)]), require$$0.createVNode("span", {
      "class": "v-autocomplete__unmask"
    }, [text.substr(matches2 + length)])]) : text;
  }
  const makeVAutocompleteProps = propsFactory({
    autoSelectFirst: {
      type: [Boolean, String]
    },
    clearOnSelect: Boolean,
    search: String,
    ...makeFilterProps({
      filterKeys: ["title"]
    }),
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null,
      role: "combobox"
    }), ["validationValue", "dirty", "appendInnerIcon"]),
    ...makeTransitionProps$1({
      transition: false
    })
  }, "VAutocomplete");
  const VAutocomplete = genericComponent()({
    name: "VAutocomplete",
    props: makeVAutocompleteProps(),
    emits: {
      "update:focused": (focused) => true,
      "update:search": (value) => true,
      "update:modelValue": (value) => true,
      "update:menu": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const vTextFieldRef = require$$0.ref();
      const isFocused = require$$0.shallowRef(false);
      const isPristine = require$$0.shallowRef(true);
      const listHasFocus = require$$0.shallowRef(false);
      const vMenuRef = require$$0.ref();
      const vVirtualScrollRef = require$$0.ref();
      const _menu = useProxiedModel(props, "menu");
      const menu = require$$0.computed({
        get: () => _menu.value,
        set: (v) => {
          var _a;
          if (_menu.value && !v && ((_a = vMenuRef.value) == null ? void 0 : _a.ΨopenChildren))
            return;
          _menu.value = v;
        }
      });
      const selectionIndex = require$$0.shallowRef(-1);
      const color = require$$0.computed(() => {
        var _a;
        return (_a = vTextFieldRef.value) == null ? void 0 : _a.color;
      });
      const label = require$$0.computed(() => menu.value ? props.closeText : props.openText);
      const {
        items,
        transformIn,
        transformOut
      } = useItems(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(color);
      const search = useProxiedModel(props, "search", "");
      const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const counterValue = require$$0.computed(() => {
        return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
      });
      const form = useForm();
      const {
        filteredItems,
        getMatches
      } = useFilter(props, items, () => isPristine.value ? "" : search.value);
      const displayItems = require$$0.computed(() => {
        if (props.hideSelected) {
          return filteredItems.value.filter((filteredItem) => !model.value.some((s) => s.value === filteredItem.value));
        }
        return filteredItems.value;
      });
      const hasChips = require$$0.computed(() => !!(props.chips || slots.chip));
      const hasSelectionSlot = require$$0.computed(() => hasChips.value || !!slots.selection);
      const selectedValues = require$$0.computed(() => model.value.map((selection) => selection.props.value));
      const highlightFirst = require$$0.computed(() => {
        var _a;
        const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === "exact" && search.value === ((_a = displayItems.value[0]) == null ? void 0 : _a.title);
        return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
      });
      const menuDisabled = require$$0.computed(() => props.hideNoData && !displayItems.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value));
      const listRef = require$$0.ref();
      const {
        onListScroll,
        onListKeydown
      } = useScrolling(listRef, vTextFieldRef);
      function onClear(e) {
        if (props.openOnClear) {
          menu.value = true;
        }
        search.value = "";
      }
      function onMousedownControl() {
        if (menuDisabled.value)
          return;
        menu.value = true;
      }
      function onMousedownMenuIcon(e) {
        if (menuDisabled.value)
          return;
        if (isFocused.value) {
          e.preventDefault();
          e.stopPropagation();
        }
        menu.value = !menu.value;
      }
      function onKeydown(e) {
        var _a, _b, _c;
        if (props.readonly || (form == null ? void 0 : form.isReadonly.value))
          return;
        const selectionStart = vTextFieldRef.value.selectionStart;
        const length = model.value.length;
        if (selectionIndex.value > -1 || ["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
          e.preventDefault();
        }
        if (["Enter", "ArrowDown"].includes(e.key)) {
          menu.value = true;
        }
        if (["Escape"].includes(e.key)) {
          menu.value = false;
        }
        if (highlightFirst.value && ["Enter", "Tab"].includes(e.key)) {
          select(displayItems.value[0]);
        }
        if (e.key === "ArrowDown" && highlightFirst.value) {
          (_a = listRef.value) == null ? void 0 : _a.focus("next");
        }
        if (!props.multiple)
          return;
        if (["Backspace", "Delete"].includes(e.key)) {
          if (selectionIndex.value < 0) {
            if (e.key === "Backspace" && !search.value) {
              selectionIndex.value = length - 1;
            }
            return;
          }
          const originalSelectionIndex = selectionIndex.value;
          const selectedItem = model.value[selectionIndex.value];
          if (selectedItem && !selectedItem.props.disabled)
            select(selectedItem, false);
          selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
        }
        if (e.key === "ArrowLeft") {
          if (selectionIndex.value < 0 && selectionStart > 0)
            return;
          const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
          if (model.value[prev]) {
            selectionIndex.value = prev;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange((_b = search.value) == null ? void 0 : _b.length, (_c = search.value) == null ? void 0 : _c.length);
          }
        }
        if (e.key === "ArrowRight") {
          if (selectionIndex.value < 0)
            return;
          const next = selectionIndex.value + 1;
          if (model.value[next]) {
            selectionIndex.value = next;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(0, 0);
          }
        }
      }
      function onChange(e) {
        if (matchesSelector(vTextFieldRef.value, ":autofill") || matchesSelector(vTextFieldRef.value, ":-webkit-autofill")) {
          const item = items.value.find((item2) => item2.title === e.target.value);
          if (item) {
            select(item);
          }
        }
      }
      function onAfterLeave() {
        var _a;
        if (isFocused.value) {
          isPristine.value = true;
          (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
        }
      }
      function onFocusin(e) {
        isFocused.value = true;
        setTimeout(() => {
          listHasFocus.value = true;
        });
      }
      function onFocusout(e) {
        listHasFocus.value = false;
      }
      function onUpdateModelValue(v) {
        if (v == null || v === "" && !props.multiple)
          model.value = [];
      }
      const isSelecting = require$$0.shallowRef(false);
      function select(item) {
        let set = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        if (item.props.disabled)
          return;
        if (props.multiple) {
          const index2 = model.value.findIndex((selection) => props.valueComparator(selection.value, item.value));
          const add = set == null ? !~index2 : set;
          if (~index2) {
            const value = add ? [...model.value, item] : [...model.value];
            value.splice(index2, 1);
            model.value = value;
          } else if (add) {
            model.value = [...model.value, item];
          }
          if (props.clearOnSelect) {
            search.value = "";
          }
        } else {
          const add = set !== false;
          model.value = add ? [item] : [];
          search.value = add && !hasSelectionSlot.value ? item.title : "";
          require$$0.nextTick(() => {
            menu.value = false;
            isPristine.value = true;
          });
        }
      }
      require$$0.watch(isFocused, (val, oldVal) => {
        var _a;
        if (val === oldVal)
          return;
        if (val) {
          isSelecting.value = true;
          search.value = props.multiple || hasSelectionSlot.value ? "" : String(((_a = model.value.at(-1)) == null ? void 0 : _a.props.title) ?? "");
          isPristine.value = true;
          require$$0.nextTick(() => isSelecting.value = false);
        } else {
          if (!props.multiple && search.value == null)
            model.value = [];
          else if (highlightFirst.value && !listHasFocus.value && !model.value.some((_ref2) => {
            let {
              value
            } = _ref2;
            return value === displayItems.value[0].value;
          })) {
            select(displayItems.value[0]);
          }
          menu.value = false;
          search.value = "";
          selectionIndex.value = -1;
        }
      });
      require$$0.watch(search, (val) => {
        if (!isFocused.value || isSelecting.value)
          return;
        if (val)
          menu.value = true;
        isPristine.value = !val;
      });
      require$$0.watch(menu, () => {
        if (!props.hideSelected && menu.value && model.value.length) {
          const index2 = displayItems.value.findIndex((item) => model.value.some((s) => item.value === s.value));
          IN_BROWSER && window.requestAnimationFrame(() => {
            var _a;
            index2 >= 0 && ((_a = vVirtualScrollRef.value) == null ? void 0 : _a.scrollToIndex(index2));
          });
        }
      });
      require$$0.watch(() => props.items, (val) => {
        if (!isFocused.value || !val.length || menu.value)
          return;
        menu.value = true;
      });
      useRender(() => {
        const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
        const isDirty = model.value.length > 0;
        const textFieldProps = VTextField.filterProps(props);
        return require$$0.createVNode(VTextField, require$$0.mergeProps({
          "ref": vTextFieldRef
        }, textFieldProps, {
          "modelValue": search.value,
          "onUpdate:modelValue": [($event) => search.value = $event, onUpdateModelValue],
          "focused": isFocused.value,
          "onUpdate:focused": ($event) => isFocused.value = $event,
          "validationValue": model.externalValue,
          "counterValue": counterValue.value,
          "dirty": isDirty,
          "onChange": onChange,
          "class": ["v-autocomplete", `v-autocomplete--${props.multiple ? "multiple" : "single"}`, {
            "v-autocomplete--active-menu": menu.value,
            "v-autocomplete--chips": !!props.chips,
            "v-autocomplete--selection-slot": !!hasSelectionSlot.value,
            "v-autocomplete--selecting-index": selectionIndex.value > -1
          }, props.class],
          "style": props.style,
          "readonly": props.readonly,
          "placeholder": isDirty ? void 0 : props.placeholder,
          "onClick:clear": onClear,
          "onMousedown:control": onMousedownControl,
          "onKeydown": onKeydown
        }), {
          ...slots,
          default: () => require$$0.createVNode(require$$0.Fragment, null, [require$$0.createVNode(VMenu, require$$0.mergeProps({
            "ref": vMenuRef,
            "modelValue": menu.value,
            "onUpdate:modelValue": ($event) => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-autocomplete__content",
            "disabled": menuDisabled.value,
            "eager": props.eager,
            "maxHeight": 310,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition,
            "onAfterLeave": onAfterLeave
          }, props.menuProps), {
            default: () => [hasList && require$$0.createVNode(VList, require$$0.mergeProps({
              "ref": listRef,
              "selected": selectedValues.value,
              "selectStrategy": props.multiple ? "independent" : "single-independent",
              "onMousedown": (e) => e.preventDefault(),
              "onKeydown": onListKeydown,
              "onFocusin": onFocusin,
              "onFocusout": onFocusout,
              "onScrollPassive": onListScroll,
              "tabindex": "-1",
              "aria-live": "polite",
              "color": props.itemColor ?? props.color
            }, props.listProps), {
              default: () => {
                var _a, _b, _c;
                return [(_a = slots["prepend-item"]) == null ? void 0 : _a.call(slots), !displayItems.value.length && !props.hideNoData && (((_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) ?? require$$0.createVNode(VListItem, {
                  "title": t(props.noDataText)
                }, null)), require$$0.createVNode(VVirtualScroll, {
                  "ref": vVirtualScrollRef,
                  "renderless": true,
                  "items": displayItems.value
                }, {
                  default: (_ref3) => {
                    var _a2;
                    let {
                      item,
                      index: index2,
                      itemRef
                    } = _ref3;
                    const itemProps = require$$0.mergeProps(item.props, {
                      ref: itemRef,
                      key: index2,
                      active: highlightFirst.value && index2 === 0 ? true : void 0,
                      onClick: () => select(item, null)
                    });
                    return ((_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
                      item,
                      index: index2,
                      props: itemProps
                    })) ?? require$$0.createVNode(VListItem, require$$0.mergeProps(itemProps, {
                      "role": "option"
                    }), {
                      prepend: (_ref4) => {
                        let {
                          isSelected
                        } = _ref4;
                        return require$$0.createVNode(require$$0.Fragment, null, [props.multiple && !props.hideSelected ? require$$0.createVNode(VCheckboxBtn, {
                          "key": item.value,
                          "modelValue": isSelected,
                          "ripple": false,
                          "tabindex": "-1"
                        }, null) : void 0, item.props.prependAvatar && require$$0.createVNode(VAvatar, {
                          "image": item.props.prependAvatar
                        }, null), item.props.prependIcon && require$$0.createVNode(VIcon, {
                          "icon": item.props.prependIcon
                        }, null)]);
                      },
                      title: () => {
                        var _a3, _b2;
                        return isPristine.value ? item.title : highlightResult(item.title, (_a3 = getMatches(item)) == null ? void 0 : _a3.title, ((_b2 = search.value) == null ? void 0 : _b2.length) ?? 0);
                      }
                    });
                  }
                }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
              }
            })]
          }), model.value.map((item, index2) => {
            function onChipClose(e) {
              e.stopPropagation();
              e.preventDefault();
              select(item, false);
            }
            const slotProps = {
              "onClick:close": onChipClose,
              onMousedown(e) {
                e.preventDefault();
                e.stopPropagation();
              },
              modelValue: true,
              "onUpdate:modelValue": void 0
            };
            const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection;
            const slotContent = hasSlot ? ensureValidVNode(hasChips.value ? slots.chip({
              item,
              index: index2,
              props: slotProps
            }) : slots.selection({
              item,
              index: index2
            })) : void 0;
            if (hasSlot && !slotContent)
              return void 0;
            return require$$0.createVNode("div", {
              "key": item.value,
              "class": ["v-autocomplete__selection", index2 === selectionIndex.value && ["v-autocomplete__selection--selected", textColorClasses.value]],
              "style": index2 === selectionIndex.value ? textColorStyles.value : {}
            }, [hasChips.value ? !slots.chip ? require$$0.createVNode(VChip, require$$0.mergeProps({
              "key": "chip",
              "closable": props.closableChips,
              "size": "small",
              "text": item.title,
              "disabled": item.props.disabled
            }, slotProps), null) : require$$0.createVNode(VDefaultsProvider, {
              "key": "chip-defaults",
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: "small",
                  text: item.title
                }
              }
            }, {
              default: () => [slotContent]
            }) : slotContent ?? require$$0.createVNode("span", {
              "class": "v-autocomplete__selection-text"
            }, [item.title, props.multiple && index2 < model.value.length - 1 && require$$0.createVNode("span", {
              "class": "v-autocomplete__selection-comma"
            }, [require$$0.createTextVNode(",")])])]);
          })]),
          "append-inner": function() {
            var _a;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return require$$0.createVNode(require$$0.Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), props.menuIcon ? require$$0.createVNode(VIcon, {
              "class": "v-autocomplete__menu-icon",
              "icon": props.menuIcon,
              "onMousedown": onMousedownMenuIcon,
              "onClick": noop,
              "aria-label": t(label.value),
              "title": t(label.value)
            }, null) : void 0]);
          }
        });
      });
      return forwardRefs({
        isFocused,
        isPristine,
        menu,
        search,
        filteredItems,
        select
      }, vTextFieldRef);
    }
  });
  const _hoisted_1$a = ["innerHTML"];
  const _sfc_main$f = /* @__PURE__ */ require$$0.defineComponent({
    __name: "SelectMany",
    props: {
      items: {
        type: Array,
        default: () => []
      },
      selectedItems: {
        type: Array,
        default: () => []
      },
      itemValue: {
        type: String,
        default: "id"
      },
      itemText: {
        type: String,
        default: "text"
      },
      itemImage: {
        type: String,
        default: "image"
      },
      label: {
        type: String,
        default: ""
      },
      addItemLabel: {
        type: String,
        default: ""
      },
      modelValue: {
        type: Array,
        default: []
      }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const internalSelectedItems = require$$0.ref([]);
      const internalItems = require$$0.ref([]);
      const autocompleteValue = require$$0.ref([]);
      const isLoading = require$$0.ref(false);
      const noFilter = require$$0.ref(false);
      const emit = __emit;
      require$$0.onMounted(() => {
        internalItems.value = props.items;
        internalSelectedItems.value = props.modelValue.map((id) => {
          return props.items.find((item) => item[props.itemValue] === id);
        });
      });
      const addItem = (event) => {
        autocompleteValue.value = [];
        if (internalSelectedItems.value.find(
          (element) => element[props.itemValue] == event[props.itemValue]
        )) {
          return;
        }
        internalSelectedItems.value.push(
          internalItems.value.find((element) => element[props.itemValue] == event[props.itemValue])
        );
        setValue();
      };
      const changeOrder = (event) => {
        setValue();
      };
      const removeItem = (id) => {
        internalSelectedItems.value = internalSelectedItems.value.filter(
          (element) => element[props.itemValue] != id
        );
        setValue();
      };
      const setValue = () => {
        emit(
          "update:modelValue",
          internalSelectedItems.value.map((i) => {
            return i[props.itemValue];
          })
        );
      };
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock(require$$0.Fragment, null, [
          require$$0.createElementVNode("label", {
            class: "v-label theme--light",
            innerHTML: __props.label
          }, null, 8, _hoisted_1$a),
          internalSelectedItems.value.length > 0 ? (require$$0.openBlock(), require$$0.createBlock(VCard, {
            key: 0,
            variant: "flat",
            class: "mb-2"
          }, {
            default: require$$0.withCtx(() => [
              require$$0.createVNode(VList, null, {
                default: require$$0.withCtx(() => [
                  require$$0.createVNode(require$$0.unref(draggable), {
                    modelValue: internalSelectedItems.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => internalSelectedItems.value = $event),
                    "item-key": __props.itemValue,
                    onChange: changeOrder,
                    handle: ".handle"
                  }, {
                    item: require$$0.withCtx(({ element }) => [
                      require$$0.createVNode(VListItem, {
                        "prepend-avatar": element[__props.itemImage],
                        title: element[__props.itemText],
                        animation: "300"
                      }, {
                        append: require$$0.withCtx(() => [
                          require$$0.createVNode(VIcon, {
                            icon: "mdi-drag",
                            class: "handle mx-2 cursor-grab"
                          }),
                          require$$0.createVNode(VBtn, {
                            onClick: ($event) => removeItem(element[__props.itemValue]),
                            variant: "text",
                            icon: "mdi-delete"
                          }, null, 8, ["onClick"])
                        ]),
                        _: 2
                      }, 1032, ["prepend-avatar", "title"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "item-key"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : require$$0.createCommentVNode("", true),
          require$$0.createVNode(VAutocomplete, {
            "item-value": __props.itemValue,
            "item-title": __props.itemText,
            items: internalItems.value,
            label: __props.addItemLabel,
            modelValue: autocompleteValue.value,
            "onUpdate:modelValue": [
              _cache[1] || (_cache[1] = ($event) => autocompleteValue.value = $event),
              addItem
            ],
            "auto-select-first": "",
            loading: isLoading.value,
            "no-filter": noFilter.value,
            "return-object": "",
            variant: "underlined"
          }, {
            item: require$$0.withCtx(({ props: props2, item }) => [
              require$$0.createVNode(VListItem, require$$0.mergeProps(props2, {
                "prepend-avatar": item.raw[__props.itemImage],
                title: item.raw[__props.itemText]
              }), null, 16, ["prepend-avatar", "title"])
            ]),
            _: 1
          }, 8, ["item-value", "item-title", "items", "label", "modelValue", "loading", "no-filter"])
        ], 64);
      };
    }
  });
  const _hoisted_1$9 = { key: 1 };
  const _sfc_main$e = /* @__PURE__ */ require$$0.defineComponent({
    __name: "LinkageSelect",
    props: {
      modelValue: {},
      items: {},
      labels: {},
      errorMessages: {},
      disabled: { type: Boolean },
      selectOutOfOrder: { type: Boolean },
      chips: { type: Boolean },
      row: { type: Boolean },
      hideDetails: { type: Boolean }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const linkageSelectItems = require$$0.ref([...props.items]);
      const levelItems = require$$0.ref([]);
      const selectedIDs = require$$0.computed(() => {
        let ids = [...props.modelValue ?? []];
        validateAndResetSelectedIDs(ids);
        return ids;
      });
      require$$0.onMounted(() => {
        for (let i = 0; i < props.labels.length; i++) {
          levelItems.value.push(getLevelItems(i));
        }
      });
      linkageSelectItems.value.forEach((v) => {
        v.forEach((item) => {
          if (!item.Name) {
            item.Name = item.ID;
          }
        });
      });
      const validateAndResetSelectedIDs = (ids) => {
        linkageSelectItems.value.forEach((v, i) => {
          if (!ids[i]) {
            ids[i] = "";
          }
        });
        ids.forEach((v, i) => {
          if (!v) {
            ids[i] = "";
            return;
          }
          var exists = false;
          for (var item of linkageSelectItems.value[i]) {
            if (item.ID === v) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            ids[i] = "";
            return;
          }
          if (i === 0) {
            return;
          }
          var pID = ids[i - 1];
          if (!pID) {
            if (!props.selectOutOfOrder) {
              ids[i] = "";
            }
            return;
          } else {
            for (const item2 of linkageSelectItems.value[i - 1]) {
              if (item2.ID === pID) {
                for (var id of item2.ChildrenIDs) {
                  if (id === v) {
                    return;
                  }
                }
              }
            }
          }
          ids[i] = "";
          return;
        });
      };
      const getLevelItems = (level) => {
        if (level === 0) {
          return linkageSelectItems.value[level];
        }
        let items = [];
        if (selectedIDs.value[level - 1]) {
          let idM = {};
          for (const item of linkageSelectItems.value[level - 1]) {
            if (item.ID === selectedIDs.value[level - 1]) {
              for (let id of item.ChildrenIDs) {
                idM[id] = true;
              }
              break;
            }
          }
          for (const item of linkageSelectItems.value[level]) {
            if (idM[item.ID]) {
              items.push(item);
            }
          }
          return items;
        }
        if (props.selectOutOfOrder) {
          for (let i = level - 2; i >= 0; i--) {
            if (selectedIDs.value[i]) {
              items = findNextItems(selectedIDs.value[i], i);
              for (let j = i + 1; j < level; j++) {
                let newItems = [];
                for (const item of items) {
                  newItems = newItems.concat(findNextItems(item.ID, j));
                }
                items = newItems;
              }
              return items;
            }
          }
          return items;
        }
        return [];
      };
      const selectItem = (v, level) => {
        const updateSelectIds = [...selectedIDs.value];
        if (v) {
          for (var i = level + 1; i < updateSelectIds.length; i++) {
            if (updateSelectIds[i]) {
              var items = getLevelItems(i);
              if (!items || items.length === 0) {
                updateSelectIds[i] = "";
                continue;
              }
              var found = false;
              for (var item of items) {
                if (item.ID === updateSelectIds[i]) {
                  found = true;
                  break;
                }
              }
              if (!found) {
                updateSelectIds[i] = "";
              }
            }
          }
        } else {
          updateSelectIds[level] = "";
          if (!props.selectOutOfOrder) {
            for (let i2 = level + 1; i2 < updateSelectIds.length; i2++) {
              updateSelectIds[i2] = "";
            }
          }
        }
        if (props.labels.length > level + 1) {
          levelItems.value[level + 1] = getLevelItems(level + 1);
        }
        emit("update:modelValue", updateSelectIds);
      };
      const findNextItems = (selectedID, level) => {
        if (level + 1 >= linkageSelectItems.value.length) {
          return [];
        }
        var childrenIDs = [];
        for (const item of linkageSelectItems.value[level]) {
          if (item.ID === selectedID) {
            childrenIDs = item.ChildrenIDs;
            break;
          }
        }
        if (childrenIDs.length == 0) {
          return [];
        }
        var items = [];
        for (const item of linkageSelectItems.value[level + 1]) {
          if (childrenIDs.includes(item.ID)) {
            items.push(item);
          }
        }
        return items;
      };
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", null, [
          _ctx.row ? (require$$0.openBlock(), require$$0.createBlock(VRow, { key: 0 }, {
            default: require$$0.withCtx(() => [
              (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(linkageSelectItems.value, (v, i) => {
                return require$$0.openBlock(), require$$0.createBlock(VCol, { key: i }, {
                  default: require$$0.withCtx(() => {
                    var _a;
                    return [
                      require$$0.createVNode(VAutocomplete, {
                        label: _ctx.labels[i],
                        items: levelItems.value[i],
                        "item-title": "Name",
                        "item-value": "ID",
                        modelValue: selectedIDs.value[i],
                        "onUpdate:modelValue": [($event) => selectedIDs.value[i] = $event, ($event) => selectItem($event, i)],
                        clearable: !_ctx.chips,
                        "error-messages": (_a = _ctx.errorMessages) == null ? void 0 : _a[i],
                        chips: _ctx.chips,
                        disabled: _ctx.disabled,
                        "hide-details": _ctx.hideDetails,
                        variant: "underlined"
                      }, null, 8, ["label", "items", "modelValue", "onUpdate:modelValue", "clearable", "error-messages", "chips", "disabled", "hide-details"])
                    ];
                  }),
                  _: 2
                }, 1024);
              }), 128))
            ]),
            _: 1
          })) : (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$9, [
            (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(linkageSelectItems.value, (v, i) => {
              var _a;
              return require$$0.openBlock(), require$$0.createBlock(VAutocomplete, {
                label: _ctx.labels[i],
                items: levelItems.value[i],
                "item-value": "ID",
                "item-title": "Name",
                modelValue: selectedIDs.value[i],
                "onUpdate:modelValue": [($event) => selectedIDs.value[i] = $event, ($event) => selectItem($event, i)],
                variant: "underlined",
                clearable: !_ctx.chips,
                "error-messages": (_a = _ctx.errorMessages) == null ? void 0 : _a[i],
                chips: _ctx.chips,
                disabled: _ctx.disabled,
                "hide-details": _ctx.hideDetails
              }, null, 8, ["label", "items", "modelValue", "onUpdate:modelValue", "clearable", "error-messages", "chips", "disabled", "hide-details"]);
            }), 256))
          ]))
        ]);
      };
    }
  });
  function useRefs() {
    const refs = require$$0.ref([]);
    require$$0.onBeforeUpdate(() => refs.value = []);
    function updateRef(e, i) {
      refs.value[i] = e;
    }
    return {
      refs,
      updateRef
    };
  }
  const makeVPaginationProps = propsFactory({
    activeColor: String,
    start: {
      type: [Number, String],
      default: 1
    },
    modelValue: {
      type: Number,
      default: (props) => props.start
    },
    disabled: Boolean,
    length: {
      type: [Number, String],
      default: 1,
      validator: (val) => val % 1 === 0
    },
    totalVisible: [Number, String],
    firstIcon: {
      type: IconValue,
      default: "$first"
    },
    prevIcon: {
      type: IconValue,
      default: "$prev"
    },
    nextIcon: {
      type: IconValue,
      default: "$next"
    },
    lastIcon: {
      type: IconValue,
      default: "$last"
    },
    ariaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.root"
    },
    pageAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.page"
    },
    currentPageAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.currentPage"
    },
    firstAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.first"
    },
    previousAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.previous"
    },
    nextAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.next"
    },
    lastAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.last"
    },
    ellipsis: {
      type: String,
      default: "..."
    },
    showFirstLastPage: Boolean,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "nav"
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "text"
    })
  }, "VPagination");
  const VPagination = genericComponent()({
    name: "VPagination",
    props: makeVPaginationProps(),
    emits: {
      "update:modelValue": (value) => true,
      first: (value) => true,
      prev: (value) => true,
      next: (value) => true,
      last: (value) => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit
      } = _ref;
      const page = useProxiedModel(props, "modelValue");
      const {
        t,
        n
      } = useLocale();
      const {
        isRtl
      } = useRtl();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        width
      } = useDisplay();
      const maxButtons = require$$0.shallowRef(-1);
      provideDefaults(void 0, {
        scoped: true
      });
      const {
        resizeRef
      } = useResizeObserver((entries) => {
        if (!entries.length)
          return;
        const {
          target,
          contentRect
        } = entries[0];
        const firstItem = target.querySelector(".v-pagination__list > *");
        if (!firstItem)
          return;
        const totalWidth = contentRect.width;
        const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight) * 2;
        maxButtons.value = getMax(totalWidth, itemWidth);
      });
      const length = require$$0.computed(() => parseInt(props.length, 10));
      const start = require$$0.computed(() => parseInt(props.start, 10));
      const totalVisible = require$$0.computed(() => {
        if (props.totalVisible != null)
          return parseInt(props.totalVisible, 10);
        else if (maxButtons.value >= 0)
          return maxButtons.value;
        return getMax(width.value, 58);
      });
      function getMax(totalWidth, itemWidth) {
        const minButtons = props.showFirstLastPage ? 5 : 3;
        return Math.max(0, Math.floor(
          // Round to two decimal places to avoid floating point errors
          +((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)
        ));
      }
      const range = require$$0.computed(() => {
        if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER)
          return [];
        if (totalVisible.value <= 0)
          return [];
        else if (totalVisible.value === 1)
          return [page.value];
        if (length.value <= totalVisible.value) {
          return createRange(length.value, start.value);
        }
        const even = totalVisible.value % 2 === 0;
        const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
        const left = even ? middle : middle + 1;
        const right = length.value - middle;
        if (left - page.value >= 0) {
          return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
        } else if (page.value - right >= (even ? 1 : 0)) {
          const rangeLength = totalVisible.value - 1;
          const rangeStart = length.value - rangeLength + start.value;
          return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
        } else {
          const rangeLength = Math.max(1, totalVisible.value - 3);
          const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
          return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
        }
      });
      function setValue(e, value, event) {
        e.preventDefault();
        page.value = value;
        event && emit(event, value);
      }
      const {
        refs,
        updateRef
      } = useRefs();
      provideDefaults({
        VPaginationBtn: {
          color: require$$0.toRef(props, "color"),
          border: require$$0.toRef(props, "border"),
          density: require$$0.toRef(props, "density"),
          size: require$$0.toRef(props, "size"),
          variant: require$$0.toRef(props, "variant"),
          rounded: require$$0.toRef(props, "rounded"),
          elevation: require$$0.toRef(props, "elevation")
        }
      });
      const items = require$$0.computed(() => {
        return range.value.map((item, index2) => {
          const ref = (e) => updateRef(e, index2);
          if (typeof item === "string") {
            return {
              isActive: false,
              key: `ellipsis-${index2}`,
              page: item,
              props: {
                ref,
                ellipsis: true,
                icon: true,
                disabled: true
              }
            };
          } else {
            const isActive = item === page.value;
            return {
              isActive,
              key: item,
              page: n(item),
              props: {
                ref,
                ellipsis: false,
                icon: true,
                disabled: !!props.disabled || +props.length < 2,
                color: isActive ? props.activeColor : props.color,
                "aria-current": isActive,
                "aria-label": t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
                onClick: (e) => setValue(e, item)
              }
            };
          }
        });
      });
      const controls = require$$0.computed(() => {
        const prevDisabled = !!props.disabled || page.value <= start.value;
        const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
        return {
          first: props.showFirstLastPage ? {
            icon: isRtl.value ? props.lastIcon : props.firstIcon,
            onClick: (e) => setValue(e, start.value, "first"),
            disabled: prevDisabled,
            "aria-label": t(props.firstAriaLabel),
            "aria-disabled": prevDisabled
          } : void 0,
          prev: {
            icon: isRtl.value ? props.nextIcon : props.prevIcon,
            onClick: (e) => setValue(e, page.value - 1, "prev"),
            disabled: prevDisabled,
            "aria-label": t(props.previousAriaLabel),
            "aria-disabled": prevDisabled
          },
          next: {
            icon: isRtl.value ? props.prevIcon : props.nextIcon,
            onClick: (e) => setValue(e, page.value + 1, "next"),
            disabled: nextDisabled,
            "aria-label": t(props.nextAriaLabel),
            "aria-disabled": nextDisabled
          },
          last: props.showFirstLastPage ? {
            icon: isRtl.value ? props.firstIcon : props.lastIcon,
            onClick: (e) => setValue(e, start.value + length.value - 1, "last"),
            disabled: nextDisabled,
            "aria-label": t(props.lastAriaLabel),
            "aria-disabled": nextDisabled
          } : void 0
        };
      });
      function updateFocus() {
        var _a;
        const currentIndex = page.value - start.value;
        (_a = refs.value[currentIndex]) == null ? void 0 : _a.$el.focus();
      }
      function onKeydown(e) {
        if (e.key === keyValues.left && !props.disabled && page.value > +props.start) {
          page.value = page.value - 1;
          require$$0.nextTick(updateFocus);
        } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
          page.value = page.value + 1;
          require$$0.nextTick(updateFocus);
        }
      }
      useRender(() => require$$0.createVNode(props.tag, {
        "ref": resizeRef,
        "class": ["v-pagination", themeClasses.value, props.class],
        "style": props.style,
        "role": "navigation",
        "aria-label": t(props.ariaLabel),
        "onKeydown": onKeydown,
        "data-test": "v-pagination-root"
      }, {
        default: () => [require$$0.createVNode("ul", {
          "class": "v-pagination__list"
        }, [props.showFirstLastPage && require$$0.createVNode("li", {
          "key": "first",
          "class": "v-pagination__first",
          "data-test": "v-pagination-first"
        }, [slots.first ? slots.first(controls.value.first) : require$$0.createVNode(VBtn, require$$0.mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.first), null)]), require$$0.createVNode("li", {
          "key": "prev",
          "class": "v-pagination__prev",
          "data-test": "v-pagination-prev"
        }, [slots.prev ? slots.prev(controls.value.prev) : require$$0.createVNode(VBtn, require$$0.mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.prev), null)]), items.value.map((item, index2) => require$$0.createVNode("li", {
          "key": item.key,
          "class": ["v-pagination__item", {
            "v-pagination__item--is-active": item.isActive
          }],
          "data-test": "v-pagination-item"
        }, [slots.item ? slots.item(item) : require$$0.createVNode(VBtn, require$$0.mergeProps({
          "_as": "VPaginationBtn"
        }, item.props), {
          default: () => [item.page]
        })])), require$$0.createVNode("li", {
          "key": "next",
          "class": "v-pagination__next",
          "data-test": "v-pagination-next"
        }, [slots.next ? slots.next(controls.value.next) : require$$0.createVNode(VBtn, require$$0.mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.next), null)]), props.showFirstLastPage && require$$0.createVNode("li", {
          "key": "last",
          "class": "v-pagination__last",
          "data-test": "v-pagination-last"
        }, [slots.last ? slots.last(controls.value.last) : require$$0.createVNode(VBtn, require$$0.mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.last), null)])])]
      }));
      return {};
    }
  });
  const _hoisted_1$8 = { class: "text-center" };
  const _hoisted_2$4 = { key: 1 };
  const _sfc_main$d = /* @__PURE__ */ require$$0.defineComponent({
    __name: "Autocomplete",
    props: {
      modelValue: { type: String },
      items: { type: Array, default: [] },
      cacheItems: { type: Array, default: [] },
      isPaging: Boolean,
      hasIcon: Boolean,
      hideSelected: Boolean,
      hideDetails: Boolean,
      clearable: Boolean,
      chips: Boolean,
      sorting: Boolean,
      itemTextKey: { type: String, default: "text" },
      itemValueKey: { type: String, default: "value" },
      itemIconKey: { type: String, default: "icon" },
      pageKey: { type: String, default: "page" },
      pagesKey: { type: String, default: "pages" },
      pageSizeKey: { type: String, default: "pageSize" },
      totalKey: { type: String, default: "total" },
      itemsKey: { type: String, default: "items" },
      currentKey: { type: String, default: "current" },
      searchKey: { type: String, default: "search" },
      chipColor: String,
      loadData: Function,
      remote: {
        type: Object,
        default: {
          page: 0,
          pageSize: 0,
          search: ""
        }
      }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const props = __props;
      const listItems = require$$0.ref([...props.items]);
      const value = require$$0.ref();
      const cachedSelectedItems = require$$0.ref([...props.cacheItems ?? []]);
      const isLoading = require$$0.ref(false);
      const disabled = require$$0.ref(false);
      const total = require$$0.ref(0);
      const pages = require$$0.ref(0);
      const current = require$$0.ref(0);
      const getObjMultiValue = (d, key) => {
        const keys = key.split(".");
        if (keys.length === 0) {
          return d;
        }
        if (keys[0] === "$") {
          keys.shift();
        } else {
          keys.unshift("data");
        }
        return getObjectValue(d, keys);
      };
      const getObjectValue = (d, keys) => {
        if (typeof d !== "object" || keys.length == 0) {
          return d;
        }
        const newKey = keys[0];
        keys.shift();
        return getObjectValue(d[newKey], keys);
      };
      const loadRemoteItems = () => {
        if (!props.loadData) {
          return;
        }
        isLoading.value = true;
        props.loadData().then((r) => {
          total.value = getObjMultiValue(r, props.totalKey);
          pages.value = getObjMultiValue(r, props.pagesKey);
          current.value = getObjMultiValue(r, props.currentKey);
          const items = getObjMultiValue(r, props.itemsKey);
          if (props.isPaging) {
            listItems.value = items;
          } else {
            disabled.value = current.value >= total.value;
            listItems.value = listItems.value.concat(items || []);
          }
        }).finally(() => {
          isLoading.value = false;
        });
      };
      const endIntersect = (isIntersecting) => {
        if (isIntersecting && !disabled.value) {
          props.remote[props.pageKey] += 1;
          loadRemoteItems();
        }
      };
      const changeStatus = (e) => {
        if (cachedSelectedItems.value.find((element) => element[props.itemValueKey] == e)) {
          return;
        }
        cachedSelectedItems.value.push(
          listItems.value.find((element) => element[props.itemValueKey] == e)
        );
        emit("update:modelValue", value.value);
      };
      const removeItem = (v) => {
        value.value = "";
        cachedSelectedItems.value = cachedSelectedItems.value.filter(
          (element) => element[props.itemValueKey] != v[props.itemValueKey]
        );
        emit("update:modelValue", value.value);
      };
      require$$0.onMounted(() => {
        loadRemoteItems();
      });
      const reloadSearch = (val) => {
        if (!props.loadData) {
          return;
        }
        if (val == props.remote[props.searchKey] || !val) {
          return;
        }
        if (val == value.value[props.itemTextKey]) {
          return;
        }
        props.remote[props.pageKey] = 1;
        props.remote[props.searchKey] = val;
        loadRemoteItems();
      };
      const chipsVisible = require$$0.computed(() => {
        return props.chips && props.hasIcon && !props.sorting;
      });
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", null, [
          __props.sorting && cachedSelectedItems.value.length > 0 ? (require$$0.openBlock(), require$$0.createBlock(VCard, { key: 0 }, {
            default: require$$0.withCtx(() => [
              require$$0.createVNode(VList, null, {
                default: require$$0.withCtx(() => [
                  require$$0.createVNode(require$$0.unref(draggable), {
                    animation: "300",
                    handle: ".handle",
                    modelValue: cachedSelectedItems.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => cachedSelectedItems.value = $event),
                    "item-key": __props.itemValueKey
                  }, {
                    item: require$$0.withCtx(({ element }) => [
                      __props.hasIcon ? (require$$0.openBlock(), require$$0.createBlock(VListItem, {
                        key: 0,
                        "prepend-avatar": element[__props.itemIconKey],
                        title: element[__props.itemTextKey],
                        animation: "300"
                      }, {
                        append: require$$0.withCtx(() => [
                          require$$0.createVNode(VIcon, {
                            icon: "mdi-drag",
                            class: "handle mx-2 cursor-grab"
                          }),
                          require$$0.createVNode(VBtn, {
                            onClick: ($event) => removeItem(element),
                            variant: "text",
                            icon: "mdi-delete"
                          }, null, 8, ["onClick"])
                        ]),
                        _: 2
                      }, 1032, ["prepend-avatar", "title"])) : (require$$0.openBlock(), require$$0.createBlock(VListItem, {
                        key: 1,
                        title: element[__props.itemTextKey],
                        animation: "300"
                      }, {
                        append: require$$0.withCtx(() => [
                          require$$0.createVNode(VIcon, {
                            icon: "mdi-drag",
                            class: "handle mx-2 cursor-grab"
                          }),
                          require$$0.createVNode(VBtn, {
                            onClick: ($event) => removeItem(element),
                            variant: "text",
                            icon: "mdi-delete"
                          }, null, 8, ["onClick"])
                        ]),
                        _: 2
                      }, 1032, ["title"]))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "item-key"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : require$$0.createCommentVNode("", true),
          require$$0.createVNode(VAutocomplete, {
            modelValue: value.value,
            "onUpdate:modelValue": [
              _cache[4] || (_cache[4] = ($event) => value.value = $event),
              changeStatus
            ],
            items: listItems.value,
            loading: isLoading.value,
            "item-value": __props.itemValueKey,
            "item-title": __props.itemTextKey,
            clearable: __props.sorting ? false : __props.clearable,
            "hide-details": __props.hideDetails,
            "hide-selected": __props.hideSelected,
            class: require$$0.normalizeClass(__props.sorting ? "v-autocomplete-sorting" : ""),
            variant: "underlined",
            "onUpdate:search": reloadSearch
          }, require$$0.createSlots({ _: 2 }, [
            __props.hasIcon ? {
              name: "item",
              fn: require$$0.withCtx(({ item, props: props2 }) => [
                require$$0.createVNode(VListItem, require$$0.mergeProps(props2, {
                  "prepend-avatar": item.raw[__props.itemIconKey],
                  title: item.raw[__props.itemTextKey]
                }), null, 16, ["prepend-avatar", "title"])
              ]),
              key: "0"
            } : void 0,
            chipsVisible.value ? {
              name: "chip",
              fn: require$$0.withCtx(({ props: props2, item }) => [
                require$$0.createVNode(VChip, require$$0.mergeProps(props2, {
                  color: __props.chipColor,
                  "prepend-avatar": __props.hasIcon ? item.raw[__props.itemIconKey] : void 0,
                  text: item.raw[__props.itemTextKey]
                }), null, 16, ["color", "prepend-avatar", "text"])
              ]),
              key: "1"
            } : void 0,
            __props.loadData ? {
              name: "append-item",
              fn: require$$0.withCtx(() => [
                require$$0.createElementVNode("div", _hoisted_1$8, [
                  props.isPaging ? (require$$0.openBlock(), require$$0.createBlock(VPagination, {
                    key: 0,
                    modelValue: __props.remote[__props.pageKey],
                    "onUpdate:modelValue": [
                      _cache[1] || (_cache[1] = ($event) => __props.remote[__props.pageKey] = $event),
                      _cache[2] || (_cache[2] = ($event) => loadRemoteItems())
                    ],
                    rounded: "circle",
                    length: pages.value,
                    "total-visible": "5"
                  }, null, 8, ["modelValue", "length"])) : (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_2$4, [
                    require$$0.withDirectives((require$$0.openBlock(), require$$0.createBlock(VBtn, {
                      class: "ma-2",
                      color: "primary",
                      disabled: disabled.value,
                      loading: isLoading.value,
                      onClick: _cache[3] || (_cache[3] = () => {
                        __props.remote[__props.pageKey] += 1;
                        loadRemoteItems();
                      })
                    }, {
                      default: require$$0.withCtx(() => [
                        require$$0.createTextVNode("Load more ")
                      ]),
                      _: 1
                    }, 8, ["disabled", "loading"])), [
                      [Intersect, endIntersect]
                    ]),
                    require$$0.createVNode(VDivider, { vertical: "" }),
                    require$$0.createElementVNode("span", null, require$$0.toDisplayString(current.value) + "/" + require$$0.toDisplayString(total.value), 1)
                  ]))
                ])
              ]),
              key: "2"
            } : void 0
          ]), 1032, ["modelValue", "items", "loading", "item-value", "item-title", "clearable", "hide-details", "hide-selected", "class"])
        ]);
      };
    }
  });
  const _sfc_main$c = /* @__PURE__ */ require$$0.defineComponent({
    __name: "TextDatepicker",
    props: {
      modelValue: { type: String },
      visible: { type: Boolean, default: false }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const props = __props;
      const value = require$$0.ref(props.modelValue);
      const internalVisible = require$$0.ref(props.visible);
      const toggle = () => {
        internalVisible.value = !internalVisible.value;
      };
      const change = () => {
        emit("update:modelValue", value.value);
        toggle();
      };
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createBlock(VMenu, {
          class: "d-inline-block",
          "min-width": "290px",
          eager: "",
          modelValue: internalVisible.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => internalVisible.value = $event),
          location: "end bottom",
          onInput: toggle
        }, {
          activator: require$$0.withCtx(({ props: props2 }) => [
            require$$0.createVNode(VTextField, require$$0.mergeProps({ class: "d-inline-block" }, props2, {
              style: { "width": "180px" },
              "hide-details": "",
              variant: "underlined",
              modelValue: value.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
              "prepend-inner-icon": "mdi-event"
            }), null, 16, ["modelValue"])
          ]),
          default: require$$0.withCtx(() => [
            require$$0.createVNode(_sfc_main$h, {
              modelValue: value.value,
              "onUpdate:modelValue": [
                _cache[1] || (_cache[1] = ($event) => value.value = $event),
                change
              ]
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["modelValue"]);
      };
    }
  });
  const ModifierBetween = "between";
  function pushKeyVal(segs, key, mod, val) {
    const modWithDot = mod ? `.${mod}` : "";
    segs.push([`${key}${modWithDot}`, val.toString()]);
  }
  function pushDatetimeRangeItem(segs, op) {
    const mod = op.modifier || ModifierBetween;
    if (mod === ModifierBetween) {
      if (op.valueFrom) {
        pushKeyVal(segs, op.key, "gte", op.valueFrom);
      }
      if (op.valueTo) {
        pushKeyVal(segs, op.key, "lt", op.valueTo);
      }
      return;
    }
  }
  function pushDateRangeItem(segs, op) {
    const mod = op.modifier || ModifierBetween;
    if (mod === ModifierBetween) {
      if (op.valueFrom) {
        pushKeyVal(segs, op.key, "gte", op.valueFrom);
      }
      if (op.valueTo) {
        pushKeyVal(segs, op.key, "lte", op.valueTo);
      }
      return;
    }
  }
  function pushDateItem(segs, op) {
    if (!op.valueIs) {
      return;
    }
    pushKeyVal(segs, op.key, "", op.valueIs);
  }
  function pushNumberItem(segs, op) {
    const mod = op.modifier || "equals";
    if (mod === "equals") {
      const floatValue = parseFloat(op.valueIs);
      if (!isNaN(floatValue)) {
        pushKeyVal(segs, op.key, "", floatValue);
      }
      return;
    }
    if (mod === "between") {
      const floatFrom = parseFloat(op.valueFrom);
      const floatTo = parseFloat(op.valueTo);
      if (!isNaN(floatFrom)) {
        pushKeyVal(segs, op.key, "gte", floatFrom);
      }
      if (!isNaN(floatTo)) {
        pushKeyVal(segs, op.key, "lte", floatTo);
      }
      return;
    }
    if (mod === "greaterThan") {
      const floatValue = parseFloat(op.valueIs);
      if (!isNaN(floatValue)) {
        pushKeyVal(segs, op.key, "gt", floatValue);
      }
      return;
    }
    if (mod === "lessThan") {
      const floatValue = parseFloat(op.valueIs);
      if (!isNaN(floatValue)) {
        pushKeyVal(segs, op.key, "lt", floatValue);
      }
      return;
    }
  }
  function pushStringItem(segs, op) {
    const mod = op.modifier || "equals";
    if (mod === "equals" && op.valueIs) {
      pushKeyVal(segs, op.key, "", op.valueIs);
      return;
    }
    if (mod === "contains" && op.valueIs) {
      pushKeyVal(segs, op.key, "ilike", op.valueIs);
      return;
    }
  }
  function pushSelectItem(segs, op) {
    const mod = op.modifier || "equals";
    if (mod === "equals" && op.valueIs) {
      pushKeyVal(segs, op.key, "", op.valueIs);
      return;
    }
  }
  function pushMultipleSelectItem(segs, op) {
    const mod = op.modifier || "in";
    if (mod === "in" && op.valuesAre && op.valuesAre.length > 0) {
      pushKeyVal(segs, op.key, "in", op.valuesAre);
      return;
    }
    if (mod === "notIn" && op.valuesAre && op.valuesAre.length > 0) {
      pushKeyVal(segs, op.key, "notIn", op.valuesAre);
      return;
    }
  }
  function pushLinkageSelectItem(segs, op) {
    const mod = op.modifier || "equals";
    if (mod === "equals" && op.valuesAre && op.valuesAre.length > 0) {
      pushKeyVal(segs, op.key, "", op.valuesAre);
      return;
    }
  }
  function filterData(data) {
    if (!data) {
      return [];
    }
    const r = [];
    data.filter((op) => op.selected).map((op) => {
      if (op.itemType === "DatetimeRangeItem") {
        pushDatetimeRangeItem(r, op);
      }
      if (op.itemType === "DateRangeItem") {
        pushDateRangeItem(r, op);
      }
      if (op.itemType === "DateItem") {
        pushDateItem(r, op);
      }
      if (op.itemType === "NumberItem") {
        pushNumberItem(r, op);
      }
      if (op.itemType === "StringItem") {
        pushStringItem(r, op);
      }
      if (op.itemType === "SelectItem") {
        pushSelectItem(r, op);
      }
      if (op.itemType === "MultipleSelectItem") {
        pushMultipleSelectItem(r, op);
      }
      if (op.itemType === "LinkageSelectItem") {
        pushLinkageSelectItem(r, op);
      }
      return op;
    });
    return r;
  }
  function encodeFilterData(data) {
    return filterData(data).map((e) => `${encodeURIComponent(e[0])}=${encodeURIComponent(e[1])}`).join("&");
  }
  const _hoisted_1$7 = { class: "cursor-pointer" };
  const _hoisted_2$3 = { key: 0 };
  const _hoisted_3$1 = { class: "text-primary" };
  const _sfc_main$b = /* @__PURE__ */ require$$0.defineComponent({
    __name: "FilterButtonBody",
    props: {
      op: {}
    },
    emits: ["clear"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const showValueComputed = require$$0.computed(() => {
        let showValue = "";
        if (props.op.selected) {
          switch (props.op.itemType) {
            case "DatetimeRangeItem":
            case "DateRangeItem": {
              const mod = props.op.modifier || ModifierBetween;
              if (mod === ModifierBetween) {
                if (props.op.valueFrom) {
                  if (props.op.valueTo) {
                    showValue = `${props.op.valueFrom} - ${props.op.valueTo}`;
                  } else {
                    showValue = ` >= ${props.op.valueFrom}`;
                  }
                } else {
                  if (props.op.valueTo) {
                    showValue = ` < ${props.op.valueTo}`;
                  }
                }
              }
              break;
            }
            case "DateItem": {
              showValue = props.op.valueIs;
              break;
            }
            case "NumberItem": {
              const mod = props.op.modifier || "equals";
              if (mod === "equals") {
                const floatValue = parseFloat(props.op.valueIs);
                if (!isNaN(floatValue)) {
                  showValue += floatValue;
                }
              }
              if (mod === "between") {
                const floatFrom = parseFloat(props.op.valueFrom || "");
                const floatTo = parseFloat(props.op.valueTo || "");
                const fromValid = !isNaN(floatFrom);
                const toValid = !isNaN(floatTo);
                if (fromValid) {
                  if (toValid) {
                    showValue = `${props.op.valueFrom} - ${props.op.valueTo}`;
                  } else {
                    showValue = ` >= ${props.op.valueFrom}`;
                  }
                } else {
                  if (toValid) {
                    showValue = ` <= ${props.op.valueTo}`;
                  }
                }
              }
              if (mod === "greaterThan") {
                const floatValue = parseFloat(props.op.valueIs);
                if (!isNaN(floatValue)) {
                  showValue += " > " + props.op.valueFrom;
                }
              }
              if (mod === "lessThan") {
                const floatValue = parseFloat(props.op.valueIs);
                if (!isNaN(floatValue)) {
                  showValue += " < " + props.op.valueTo;
                }
              }
              break;
            }
            case "StringItem": {
              const mod = props.op.modifier || "equals";
              if (mod === "equals" && props.op.valueIs) {
                showValue = props.op.valueIs;
              }
              if (mod === "contains" && props.op.valueIs) {
                showValue = " ~ " + props.op.valueIs;
              }
              break;
            }
            case "SelectItem": {
              const mod = props.op.modifier || "equals";
              if (mod === "equals" && props.op.valueIs) {
                showValue = props.op.options.find((o) => o.value === props.op.valueIs).text;
              }
              break;
            }
            case "MultipleSelectItem": {
              const mod = props.op.modifier || "in";
              const textsAre = props.op.options.filter((o) => props.op.valuesAre.includes(o.value)).map((o) => o.text);
              if (mod === "in" && props.op.valuesAre && props.op.valuesAre.length > 0) {
                showValue = " in [ " + textsAre.join(", ") + " ]";
              }
              if (mod === "notIn" && props.op.valuesAre && props.op.valuesAre.length > 0) {
                showValue = " not in [ " + textsAre.join(", ") + " ]";
              }
              break;
            }
            case "LinkageSelectItem": {
              const textsAre = props.op.valuesAre.map((o, i) => {
                var _a;
                const item = (_a = props.op.linkageSelectData) == null ? void 0 : _a.items[i].find((x) => {
                  return o === x.ID;
                });
                return item.Name ? item.Name : item.ID;
              });
              showValue = textsAre.join(",");
              break;
            }
            default:
              throw new Error(`itemType '${props.op.itemType}' not supported`);
          }
        }
        const showValueCopy = showValue;
        showValue = "";
        let showLen = 0;
        for (let i = 0; i < showValueCopy.length; i++) {
          showValue += showValueCopy.charAt(i);
          if (showValueCopy.charCodeAt(i) > 127) {
            showLen += 2;
          } else {
            showLen++;
          }
          if (showLen > 66) {
            showValue += "...";
            break;
          }
        }
        return showValue;
      });
      const clear = (e) => {
        emit("clear", e);
      };
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_1$7, [
          require$$0.createVNode(VIcon, {
            start: "",
            onClick: clear,
            icon: _ctx.op.selected ? "mdi-close-circle" : "mdi-plus-circle"
          }, null, 8, ["icon"]),
          require$$0.createTextVNode(" " + require$$0.toDisplayString(_ctx.op.label) + " ", 1),
          _ctx.op.selected ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_2$3, [
            require$$0.createTextVNode(" | "),
            require$$0.createElementVNode("span", _hoisted_3$1, require$$0.toDisplayString(showValueComputed.value), 1)
          ])) : require$$0.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _sfc_main$a = /* @__PURE__ */ require$$0.defineComponent({
    __name: "FilterButton",
    props: {
      op: {},
      isFoldedItem: { type: Boolean },
      slotProps: {}
    },
    emits: ["clear"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const clear = (e) => {
        emit("clear", e);
      };
      return (_ctx, _cache) => {
        return _ctx.isFoldedItem ? (require$$0.openBlock(), require$$0.createBlock(VListItem, require$$0.mergeProps({
          key: 0,
          variant: "outlined",
          class: "my-1 px-2"
        }, _ctx.slotProps), {
          default: require$$0.withCtx(() => [
            require$$0.createVNode(_sfc_main$b, {
              op: _ctx.op,
              onClear: clear
            }, null, 8, ["op"])
          ]),
          _: 1
        }, 16)) : (require$$0.openBlock(), require$$0.createBlock(VChip, require$$0.mergeProps({
          key: 1,
          variant: "outlined",
          class: ["mr-2 my-1", _ctx.op.selected ? "" : "text-grey-darken-1"],
          style: { borderStyle: _ctx.op.selected ? "solid" : "dashed" }
        }, _ctx.slotProps), {
          default: require$$0.withCtx(() => [
            require$$0.createVNode(_sfc_main$b, {
              op: _ctx.op,
              onClear: clear
            }, null, 8, ["op"])
          ]),
          _: 1
        }, 16, ["class", "style"]));
      };
    }
  });
  const _sfc_main$9 = /* @__PURE__ */ require$$0.defineComponent({
    __name: "ItemFilter",
    props: {
      modelValue: {},
      isFoldedItem: { type: Boolean },
      itemComp: {},
      translations: {},
      compTranslations: {},
      internalValue: {},
      index: {}
    },
    emits: ["update:modelValue", "change", "clear"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const value = require$$0.ref({ ...props.modelValue });
      const menu = require$$0.ref(false);
      const emit = __emit;
      const clickDone = () => {
        menu.value = false;
        if (!value.value.valueIs && (!value.value.valuesAre || value.value.valuesAre.length == 0) && !value.value.valueFrom && !value.value.valueTo) {
          return;
        }
        value.value.selected = true;
        Object.assign(props.modelValue, value.value);
        emit("update:modelValue", props.modelValue);
        emit("change", null);
      };
      const clear = (e) => {
        if (!value.value.selected) {
          return;
        }
        value.value.valueIs = "";
        value.value.valuesAre = [];
        value.value.valueFrom = "";
        value.value.valueTo = "";
        value.value.selected = false;
        Object.assign(props.modelValue, value.value);
        emit("update:modelValue", props.modelValue);
        emit("clear", e);
      };
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createBlock(VMenu, {
          "close-on-content-click": false,
          class: "rounded-lg",
          modelValue: menu.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => menu.value = $event)
        }, {
          activator: require$$0.withCtx(({ props: props2 }) => [
            require$$0.createVNode(_sfc_main$a, {
              op: value.value,
              "is-folded-item": _ctx.isFoldedItem,
              slotProps: props2,
              onClear: clear
            }, null, 8, ["op", "is-folded-item", "slotProps"])
          ]),
          default: require$$0.withCtx(() => [
            require$$0.createVNode(VCard, { class: "pa-3 bg-white" }, {
              default: require$$0.withCtx(() => {
                var _a;
                return [
                  require$$0.createElementVNode("div", null, require$$0.toDisplayString((_a = _ctx.modelValue.translations) == null ? void 0 : _a.filterBy), 1),
                  (require$$0.openBlock(), require$$0.createBlock(require$$0.resolveDynamicComponent(_ctx.itemComp), {
                    modelValue: value.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
                    translations: _ctx.compTranslations
                  }, null, 8, ["modelValue", "translations"])),
                  require$$0.createElementVNode("div", null, [
                    require$$0.createVNode(VBtn, {
                      class: "mt-5 float-right",
                      color: "primary",
                      rounded: "",
                      onClick: clickDone
                    }, {
                      default: require$$0.withCtx(() => [
                        require$$0.createTextVNode(require$$0.toDisplayString(_ctx.translations.apply), 1)
                      ]),
                      _: 1
                    })
                  ])
                ];
              }),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]);
      };
    }
  });
  const _hoisted_1$6 = { style: { "width": "200px" } };
  const _hoisted_2$2 = {
    style: { "height": "34px" },
    class: "pl-2 pt-4"
  };
  const _sfc_main$8 = /* @__PURE__ */ require$$0.defineComponent({
    __name: "DatetimeRangeItem",
    props: {
      modelValue: {},
      translations: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      props.modelValue.modifier = props.modelValue.modifier || ModifierBetween;
      const datePickerVisible = require$$0.ref(false);
      const modifier = props.modelValue.modifier;
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$6, [
          (require$$0.openBlock(), require$$0.createBlock(_sfc_main$g, {
            modelValue: _ctx.modelValue.valueFrom,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.modelValue.valueFrom = $event),
            key: require$$0.unref(modifier) + "form",
            visible: datePickerVisible.value,
            "hide-details": true
          }, null, 8, ["modelValue", "visible"])),
          require$$0.createElementVNode("div", _hoisted_2$2, [
            require$$0.createElementVNode("span", null, require$$0.toDisplayString(_ctx.translations["to"]), 1)
          ]),
          (require$$0.openBlock(), require$$0.createBlock(_sfc_main$g, {
            modelValue: _ctx.modelValue.valueTo,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.modelValue.valueTo = $event),
            key: require$$0.unref(modifier) + "to",
            "hide-details": true
          }, null, 8, ["modelValue"]))
        ]);
      };
    }
  });
  const _hoisted_1$5 = { style: { "width": "200px" } };
  const _hoisted_2$1 = {
    style: { "height": "34px" },
    class: "pl-2 pt-4"
  };
  const _sfc_main$7 = /* @__PURE__ */ require$$0.defineComponent({
    __name: "DateRangeItem",
    props: {
      modelValue: {},
      translations: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      props.modelValue.modifier = props.modelValue.modifier || ModifierBetween;
      const datePickerVisible = require$$0.ref(false);
      const modifier = props.modelValue.modifier;
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$5, [
          (require$$0.openBlock(), require$$0.createBlock(_sfc_main$h, {
            modelValue: _ctx.modelValue.valueFrom,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.modelValue.valueFrom = $event),
            key: require$$0.unref(modifier) + "form",
            visible: datePickerVisible.value,
            "hide-details": true
          }, null, 8, ["modelValue", "visible"])),
          require$$0.createElementVNode("div", _hoisted_2$1, [
            require$$0.createElementVNode("span", null, require$$0.toDisplayString(_ctx.translations["to"]), 1)
          ]),
          (require$$0.openBlock(), require$$0.createBlock(_sfc_main$h, {
            modelValue: _ctx.modelValue.valueTo,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.modelValue.valueTo = $event),
            key: require$$0.unref(modifier) + "to",
            "hide-details": true
          }, null, 8, ["modelValue"]))
        ]);
      };
    }
  });
  const _hoisted_1$4 = { style: { "width": "200px" } };
  const _sfc_main$6 = /* @__PURE__ */ require$$0.defineComponent({
    __name: "DateItem",
    props: {
      modelValue: {},
      translations: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const datePickerVisible = require$$0.ref(false);
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$4, [
          require$$0.createVNode(_sfc_main$h, {
            modelValue: _ctx.modelValue.valueIs,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.modelValue.valueIs = $event),
            visible: datePickerVisible.value,
            "hide-details": true
          }, null, 8, ["modelValue", "visible"])
        ]);
      };
    }
  });
  const _hoisted_1$3 = { style: { "width": "200px" } };
  const _hoisted_2 = { key: 0 };
  const _hoisted_3 = { class: "px-3" };
  const _hoisted_4 = { key: 1 };
  const _sfc_main$5 = /* @__PURE__ */ require$$0.defineComponent({
    __name: "NumberItem",
    props: {
      modelValue: {},
      translations: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      props.modelValue.modifier = props.modelValue.modifier || "equals";
      const modifier = props.modelValue.modifier;
      const t = props.translations;
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$3, [
          require$$0.unref(modifier) == "between" ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_2, [
            require$$0.createVNode(VIcon, {
              class: "py-8 mr-4 float-md-start",
              icon: "mdi-subdirectory-arrow-right",
              size: "large"
            }),
            require$$0.createVNode(VTextField, {
              class: "d-inline-block",
              style: { "width": "80px" },
              type: "number",
              variant: "underlined",
              modelValue: props.modelValue.valueFrom,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => props.modelValue.valueFrom = $event)
            }, null, 8, ["modelValue"]),
            require$$0.createElementVNode("span", _hoisted_3, require$$0.toDisplayString(require$$0.unref(t).and), 1),
            require$$0.createVNode(VTextField, {
              class: "d-inline-block",
              style: { "width": "80px" },
              type: "number",
              variant: "underlined",
              modelValue: props.modelValue.valueTo,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => props.modelValue.valueTo = $event)
            }, null, 8, ["modelValue"])
          ])) : (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_4, [
            require$$0.createVNode(VIcon, {
              class: "py-8 mr-4 float-md-start",
              icon: "mdi-subdirectory-arrow-right",
              size: "large"
            }),
            require$$0.createVNode(VTextField, {
              class: "d-inline-block",
              style: { "width": "120px" },
              type: "number",
              variant: "underlined",
              modelValue: props.modelValue.valueIs,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => props.modelValue.valueIs = $event)
            }, null, 8, ["modelValue"])
          ]))
        ]);
      };
    }
  });
  const _sfc_main$4 = /* @__PURE__ */ require$$0.defineComponent({
    __name: "StringItem",
    props: {
      modelValue: {},
      translations: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      props.modelValue.modifier = props.modelValue.modifier || "contains";
      const t = props.translations;
      const items = require$$0.ref([
        { text: t.equals, value: "equals" },
        { text: t.contains, value: "contains" }
      ]);
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", null, [
          require$$0.createElementVNode("div", null, [
            require$$0.createVNode(VSelect, {
              class: "d-inline-block",
              style: { "width": "200px" },
              modelValue: props.modelValue.modifier,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => props.modelValue.modifier = $event),
              items: items.value,
              "item-title": "text",
              "item-value": "value",
              variant: "underlined",
              "hide-details": ""
            }, null, 8, ["modelValue", "items"])
          ]),
          require$$0.createElementVNode("div", null, [
            require$$0.createVNode(VIcon, {
              class: "py-8 mr-4 float-md-start",
              icon: "mdi-subdirectory-arrow-right",
              size: "large"
            }),
            require$$0.createVNode(VTextField, {
              class: "d-inline-block",
              style: { "width": "120px" },
              variant: "underlined",
              type: "text",
              modelValue: props.modelValue.valueIs,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => props.modelValue.valueIs = $event),
              "hide-etails": ""
            }, null, 8, ["modelValue"])
          ])
        ]);
      };
    }
  });
  const _sfc_main$3 = /* @__PURE__ */ require$$0.defineComponent({
    __name: "LinkageSelectItem",
    props: {
      modelValue: {},
      translations: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createBlock(_sfc_main$e, {
          style: { "width": "500px" },
          modelValue: _ctx.modelValue.valuesAre,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.modelValue.valuesAre = $event),
          items: _ctx.modelValue.linkageSelectData.items,
          labels: _ctx.modelValue.linkageSelectData.labels,
          "select-out-of-order": _ctx.modelValue.linkageSelectData.selectOutOfOrder,
          row: "",
          "hide-details": ""
        }, null, 8, ["modelValue", "items", "labels", "select-out-of-order"]);
      };
    }
  });
  const _hoisted_1$2 = { style: { "max-height": "160px", "overflow-y": "scroll" } };
  const _sfc_main$2 = /* @__PURE__ */ require$$0.defineComponent({
    __name: "MultipleSelectItem",
    props: {
      modelValue: {},
      translations: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      props.modelValue.modifier = props.modelValue.modifier || "in";
      require$$0.ref(false);
      const t = props.translations;
      const items = require$$0.ref([
        { text: t.in, value: "in" },
        { text: t.notIn, value: "notIn" }
      ]);
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", null, [
          require$$0.createElementVNode("div", null, [
            require$$0.createVNode(VSelect, {
              class: "d-inline-block",
              style: { "width": "200px" },
              modelValue: props.modelValue.modifier,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => props.modelValue.modifier = $event),
              items: items.value,
              "item-title": "text",
              "item-value": "value",
              variant: "underlined",
              "hide-details": ""
            }, null, 8, ["modelValue", "items"])
          ]),
          require$$0.createElementVNode("div", _hoisted_1$2, [
            (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(_ctx.modelValue.options, (opt) => {
              return require$$0.openBlock(), require$$0.createBlock(VCheckbox, {
                modelValue: _ctx.modelValue.valuesAre,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.modelValue.valuesAre = $event),
                label: opt.text,
                value: opt.value,
                "hide-details": "",
                density: "comfortable"
              }, null, 8, ["modelValue", "label", "value"]);
            }), 256))
          ])
        ]);
      };
    }
  });
  const _hoisted_1$1 = { style: { "width": "200px" } };
  const _sfc_main$1 = /* @__PURE__ */ require$$0.defineComponent({
    __name: "SelectItem",
    props: {
      modelValue: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$1, [
          require$$0.createVNode(_sfc_main$d, {
            modelValue: _ctx.modelValue.valueIs,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.modelValue.valueIs = $event),
            items: _ctx.modelValue.options,
            style: { "width": "200px" },
            class: "d-inline-block",
            "hide-details": ""
          }, null, 8, ["modelValue", "items"])
        ]);
      };
    }
  });
  const _hoisted_1 = { class: "d-flex flex-grow-1" };
  const _sfc_main = /* @__PURE__ */ require$$0.defineComponent({
    __name: "index",
    props: {
      internalValue: { type: Array, required: true },
      modelValue: { type: Object },
      replaceWindowLocation: Boolean,
      translations: {
        type: Object,
        default: () => {
          return {
            date: {
              to: "to"
            },
            number: {
              equals: "is equal to",
              between: "between",
              greaterThan: "is greater than",
              lessThan: "is less than",
              and: "and"
            },
            string: {
              equals: "is equal to",
              contains: "contains"
            },
            multipleSelect: {
              in: "in",
              notIn: "not in"
            },
            clear: "Clear Filters",
            add: "Add Filters",
            apply: "Apply"
          };
        }
      }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const t = props.translations;
      const itemTypes = {
        DatetimeRangeItem: _sfc_main$8,
        DateRangeItem: _sfc_main$7,
        DateItem: _sfc_main$6,
        NumberItem: _sfc_main$5,
        StringItem: _sfc_main$4,
        LinkageSelectItem: _sfc_main$3,
        MultipleSelectItem: _sfc_main$2,
        SelectItem: _sfc_main$1
      };
      const trans = {
        DatetimeRangeItem: t.date,
        DateRangeItem: t.date,
        DateItem: t.date,
        NumberItem: t.number,
        StringItem: t.string,
        SelectItem: {},
        MultipleSelectItem: t.multipleSelect,
        LinkageSelectItem: {}
      };
      const getSelectedIndexes = (value) => {
        return value.map((op, i) => {
          if (op.selected) {
            return i;
          }
          return -1;
        }).filter((i) => i !== -1);
      };
      const visible = require$$0.ref(false);
      const selectedIndexs = require$$0.ref(getSelectedIndexes(props.internalValue));
      const emit = __emit;
      const clickDone = () => {
        const filterKeys = props.internalValue.map((op, i) => {
          return op.key;
        });
        const event = {
          filterKeys,
          filterData: filterData(props.internalValue),
          encodedFilterData: encodeFilterData(props.internalValue)
        };
        emit("update:modelValue", event);
        visible.value = false;
      };
      const clearAll = (e) => {
        props.internalValue.map((op) => {
          op.selected = false;
        });
        selectedIndexs.value = getSelectedIndexes(props.internalValue);
        clickDone();
      };
      const clear = (e) => {
        selectedIndexs.value = getSelectedIndexes(props.internalValue);
        clickDone();
        e.stopPropagation();
      };
      const filtersGetFunc = (f, isFoldedItem) => {
        return (itemTypes2, trans2) => {
          return props.internalValue.filter((op) => {
            if (!f(op)) {
              return false;
            }
            return itemTypes2[op.itemType];
          }).map((op, i) => {
            return {
              itemComp: itemTypes2[op.itemType],
              op,
              internalValue: props.internalValue,
              isFoldedItem,
              translations: props.translations,
              compTranslations: trans2[op.itemType],
              index: i
            };
          });
        };
      };
      const fixedFilters = require$$0.computed(() => {
        return filtersGetFunc((item) => !item.folded, false)(itemTypes, trans);
      });
      const otherSelectedFilters = require$$0.computed(() => {
        return filtersGetFunc((item) => item.folded && !!item.selected, false)(itemTypes, trans);
      });
      const foldedFilters = require$$0.computed(() => {
        return filtersGetFunc((item) => item.folded && !item.selected, true)(itemTypes, trans);
      });
      return (_ctx, _cache) => {
        return require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1, [
          require$$0.createElementVNode("div", null, [
            (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(fixedFilters.value, (item) => {
              return require$$0.openBlock(), require$$0.createBlock(_sfc_main$9, require$$0.mergeProps({
                modelValue: item.op,
                "onUpdate:modelValue": ($event) => item.op = $event
              }, item, {
                onChange: clickDone,
                onClear: clear
              }), null, 16, ["modelValue", "onUpdate:modelValue"]);
            }), 256)),
            (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(otherSelectedFilters.value, (item) => {
              return require$$0.openBlock(), require$$0.createBlock(_sfc_main$9, require$$0.mergeProps({
                modelValue: item.op,
                "onUpdate:modelValue": ($event) => item.op = $event
              }, item, {
                onChange: clickDone,
                onClear: clear
              }), null, 16, ["modelValue", "onUpdate:modelValue"]);
            }), 256))
          ]),
          require$$0.createVNode(VSpacer),
          require$$0.createVNode(VBtn, {
            onClick: clearAll,
            variant: "plain",
            size: "small",
            disabled: __props.internalValue.findIndex((item) => item.selected) < 0,
            class: "my-1"
          }, {
            default: require$$0.withCtx(() => [
              require$$0.createVNode(VIcon, {
                size: "small",
                icon: "mdi-close"
              }),
              require$$0.createTextVNode(" " + require$$0.toDisplayString(require$$0.unref(t).clear), 1)
            ]),
            _: 1
          }, 8, ["disabled"]),
          foldedFilters.value.length > 0 ? (require$$0.openBlock(), require$$0.createBlock(VMenu, {
            key: 0,
            "close-on-content-click": false,
            class: "rounded-lg"
          }, {
            activator: require$$0.withCtx(({ props: props2 }) => [
              require$$0.createVNode(VBtn, require$$0.mergeProps(props2, {
                variant: "plain",
                size: "small",
                color: "primary",
                class: "my-1"
              }), {
                default: require$$0.withCtx(() => [
                  require$$0.createVNode(VIcon, {
                    size: "small",
                    icon: "mdi-filter"
                  }),
                  require$$0.createTextVNode(" " + require$$0.toDisplayString(require$$0.unref(t).add), 1)
                ]),
                _: 2
              }, 1040)
            ]),
            default: require$$0.withCtx(() => [
              require$$0.createVNode(VList, {
                variant: "flat",
                class: "white pa-0"
              }, {
                default: require$$0.withCtx(() => [
                  (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(foldedFilters.value, (item) => {
                    return require$$0.openBlock(), require$$0.createBlock(_sfc_main$9, require$$0.mergeProps({
                      modelValue: item.op,
                      "onUpdate:modelValue": ($event) => item.op = $event
                    }, item, {
                      onChange: clickDone,
                      onClear: clear
                    }), null, 16, ["modelValue", "onUpdate:modelValue"]);
                  }), 256))
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : require$$0.createCommentVNode("", true)
        ]);
      };
    }
  });
  const vuetifyx = {
    install: (app) => {
      app.component("vx-datepicker", _sfc_main$h);
      app.component("vx-datetimepicker", _sfc_main$g);
      app.component("vx-selectmany", _sfc_main$f);
      app.component("vx-linkageselect", _sfc_main$e);
      app.component("vx-filter", _sfc_main);
      app.component("vx-autocomplete", _sfc_main$d);
      app.component("vx-textdatepicker", _sfc_main$c);
    }
  };
  window.__goplaidVueComponentRegisters = window.__goplaidVueComponentRegisters || [];
  window.__goplaidVueComponentRegisters.push((app, vueOptions) => {
    app.use(vuetifyx);
  });
});
