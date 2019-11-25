let _formatter = {
	YYYY: function(d) {
		return ('000' + d.getFullYear()).slice(-4);
	},
	YY: function(d) {
		return ('0' + d.getFullYear()).slice(-2);
	},
	MM: function(d) {
		return ('0' + (d.getMonth() + 1)).slice(-2);
	},
	M: function(d) {
		return '' + (d.getMonth() + 1);
	},
	DD: function(d) {
		return ('0' + d.getDate()).slice(-2);
	},
	D: function(d) {
		return '' + d.getDate();
	},
};
let _parser = {
	YYYY: function(str) {
		return this.exec(/^\d{4}/, str);
	},
	YY: function(str) {
		var result = this.exec(/^\d\d/, str);
		result.value += result.value < 50 ? 2000 : 1900;
		return result;
	},
	MM: function(str) {
		return this.exec(/^\d\d/, str);
	},
	M: function(str) {
		return this.exec(/^\d\d?/, str);
	},
	DD: function(str) {
		return this.exec(/^\d\d/, str);
	},
	D: function(str) {
		return this.exec(/^\d\d?/, str);
	},
	exec: function(re, str) {
		var result = (re.exec(str) || [''])[0];
		return { value: result | 0, length: result.length };
	},
};

function format(dateObj, formatString, utc) {
	if (isNaN(dateObj)) return '';
	let d = addMinutes(dateObj, utc ? dateObj.getTimezoneOffset() : 0),
		formatter = _formatter;

	d.utc = utc;
	// eslint-disable-next-line no-useless-escape
	return formatString.replace(/\[[^\[\]]*]|\[.*\][^\[]*\]|([A-Za-z])\1*|./g, function(token) {
		return formatter[token]
			? formatter[token](d, formatString)
			: token.replace(/\[(.*)]/, '$1');
	});
}

function preparse(dateString, formatString) {
	let parser = _parser;
	let re = /([A-Za-z])\1*|./g;
	let keys;
	let token;
	let result;
	let offset = 0;
	let dt = {
		Y: 0,
		M: 0,
		D: 0,
		H: 0,
		A: 0,
		h: 0,
		m: 0,
		s: 0,
		S: 0,
		_index: 0,
		_length: 0,
		_match: 0,
	};

	while ((keys = re.exec(formatString))) {
		token = keys[0];
		if (parser[token]) {
			result = parser[token](dateString.slice(offset), formatString);
			if (!result.length) {
				break;
			}
			offset += result.length;
			dt[token.charAt(0)] = result.value;
			dt._match++;
		} else if (token === dateString.charAt(offset) || token === ' ') {
			offset++;
		} else {
			break;
		}
	}
	dt._index = offset;
	dt._length = dateString.length;
	return dt;
}

function isValid(arg, formatString) {
	// arg - a date structure or a date string
	let dt = typeof arg === 'string' ? preparse(arg, formatString) : arg;
	let last = [31, 28 + (isLeapYear(dt.Y) | 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
		dt.M - 1
	];

	return !(
		dt._index < 1 ||
		dt._length < 1 ||
		dt._index - dt._length ||
		dt._match < 1 ||
		dt.Y < 1 ||
		dt.Y > 9999 ||
		dt.M < 1 ||
		dt.M > 12 ||
		dt.D < 1 ||
		dt.D > last
	);
}

function parse(dateString, formatString, utc) {
	let dt = preparse(dateString, formatString);
	let dateObj;

	if (isValid(dt)) {
		dt.M -= dt.Y < 100 ? 22801 : 1; // 22801 = 1900 * 12 + 1
		if (utc) {
			dateObj = new Date(Date.UTC(dt.Y, dt.M, dt.D, dt.H, dt.m, dt.s, dt.S));
		} else {
			dateObj = new Date(dt.Y, dt.M, dt.D, dt.H, dt.m, dt.s, dt.S);
		}
		return dateObj;
	}
	return new Date(NaN);
}

function addMinutes(dateObj, minutes) {
	return addMilliseconds(dateObj, minutes * 60000);
}

function addMilliseconds(dateObj, milliseconds) {
	return new Date(dateObj.getTime() + milliseconds);
}

function isLeapYear(y) {
	return (!(y % 4) && !!(y % 100)) || !(y % 400);
}

function isSameDay(date1, date2) {
	return format(date1, 'YYYYMMDD') === format(date2, 'YYYYMMDD');
}

function isDate(value) {
	return Object.prototype.toString.call(value) === '[object Date]';
}
export { format, parse, isSameDay, isDate };
