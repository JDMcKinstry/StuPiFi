/**	Array[extensions]()
 *	Array.smartSort()
 *	Array.unique()
 **/
;(function() {	//	Array.smartSort
	function smartSort() {
		var $this = this,
			dir = void 0;
		
		//	first determine if a specific string for a|asc|d|dsc|desc was passed in
		for (var x in arguments) {
			if (typeof arguments[x] == 'string' && /^a([sc]{2})?$|^d([e]?[sc]{2,3})?$/i.test(arguments[x])) {
				dir = /^a([sc]{2})?$/i.test(arguments[x]) ? true : false;
				delete arguments[x];
				break;
			}
			else if (typeof arguments[x] == 'boolean') {
				dir = arguments[x];
				delete arguments[x];
				break;
			}
		}
		
		//	if direction still not set, then set to true/asc
		if (void 0 == dir) dir = true;
		
		Object.defineProperty(this, "dir", {
			enumerable: false,
			value: dir,
			writable: true
		});
		
		//	numbers, strings, booleans, dates, elements, arrays, objects, null|undefined
		function ss(a, b, dir) {
			// var dir = $this.dir;
			//	immidiate return for emtpy values
			if ((null == a || void 0 == a) && b !== b) return 1;
			if ((null == b || void 0 == b) && a !== a) return -1;
			if (null == a || void 0 == a || a !== a) return 1;
			if (null == b || void 0 == b || b !== b) return -1;
			
			//	make string numbers into real numbers
			var regNum = new RegExp(/^-?\d+\.?\d*$|^\d*\.?\d+$/);
			if (regNum.test(a)) a = parseFloat(a);
			if (regNum.test(b)) b = parseFloat(b);
			
			var aType = typeof a,
				bType = typeof b,
				cType = aType + bType;
				
			var aInstance = Object.prototype.toString.call(a).slice(8, -1),
				bInstance = Object.prototype.toString.call(b).slice(8, -1),
				cInstance = aInstance + bInstance;
			
			// if (/Array/ig.test(cInstance)) console.log(dir);
			if (/Array/ig.test(aInstance)) a.sort(function(aa,bb){return ss(aa,bb,dir)});
			if (/Array/ig.test(bInstance)) b.sort(function(aa,bb){return ss(aa,bb,dir)});
			
			if (aType == bType) {
				switch (aType || bType) {
					case 'boolean': return a === b ? 0 : (dir ? (a ? 1 : -1) : (b ? 1 : -1));
					case 'number': return a === b ? 0 : (dir ? (a < b ? -1 : 1) : (a > b ? -1 : 1));
					case 'string':
						a = a.valueOf().toLowerCase();
						b = b.valueOf().toLowerCase();
						return a === b ? 0 : (dir ? (a < b ? -1 : 1) : (a > b ? -1 : 1));
					case 'object':
						if (aInstance == bInstance || /^((HTML)\w+(Element)){2}$/.test(cInstance)) {
							if (/(date){2}/ig.test(cInstance)) {
								var aValue = a.valueOf(),
									bValue = b.valueOf();
								return aValue === bValue ? 0 : (dir ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1));
							}
							else if (/^((HTML)\w+(Element)){2}$/.test(cInstance)) {
								if (a.id && b.id) return a.id === b.id ? 0 : (dir ? (a.id < b.id ? -1 : 1) : (a.id > b.id ? -1 : 1));
								else if (a.id || b.id) return (dir ? a.id && !b.id : !a.id && b.id) ? 1 : -1;
								if (a.name && b.name) return a.name === b.name ? 0 : (dir ? (a.name < b.name ? -1 : 1) : (a.name > b.name ? -1 : 1));
								else if (a.name || b.name) return (dir ? a.name && !b.name : !a.name && b.name) ? 1 : -1;
								return a.tagName === b.tagName ? 0 : (dir ? (a.tagName < b.tagName ? -1 : 1) : (a.tagName > b.tagName ? -1 : 1));
							}
							else if (window['jQuery'] && a instanceof jQuery && b instanceof jQuery) {
								var a0 = a.get(0), b0 = b.get(0);
								if (a0.id && b0.id) return a0.id === b0.id ? 0 : (dir ? (a0.id < b0.id ? -1 : 1) : (a0.id > b0.id ? -1 : 1));
								else if (a0.id || b0.id) return (dir ? a0.id && !b0.id : !a0.id && b0.id) ? 1 : -1;
								if (a0.name && b0.name) return a0.name === b0.name ? 0 : (dir ? (a0.name < b0.name ? -1 : 1) : (a0.name > b0.name ? -1 : 1));
								else if (a0.name || b0.name) return (dir ? a0.name && !b0.name : !a0.name && b0.name) ? 1 : -1;
								return a0.tagName === b0.tagName ? 0 : (dir ? (a0.tagName < b0.tagName ? -1 : 1) : (a0.tagName > b0.tagName ? -1 : 1));
							}
							else if (/(array){2}/ig.test(cInstance)) {
								var aFirst = Object.keys(a)[0],
									bFirst = Object.keys(b)[0];
								if (aFirst === bFirst) {
									aFirst = a[aFirst];
									bFirst = b[bFirst];
									if (aFirst === bFirst) return 0;
									var arrFirst = [aFirst, bFirst],
										firstSorted = arrFirst.smartSort(dir); // smartSortInit.apply(arrFirst, [dir]);
									return aFirst == firstSorted[0] ? -1 : 1;
								}
								return dir ? (aFirst < bFirst ? -1 : 1) : (aFirst > bFirst ? -1 : 1);
							}
							else if (/(object){2}/ig.test(cInstance)) {
								if (window['jQuery']) {
									if (a instanceof jQuery) return -1;
									if (b instanceof jQuery) return 1;
								}
								
								//	sort inner arrays if found
								for (var k in a) if (a[k] instanceof Array) a[k].smartSort(dir);
								for (var k in b) if (b[k] instanceof Array) b[k].smartSort(dir);
								
								//	sort object
								var objA = [], objB = [];
								
								for (var k in a) { if (a.hasOwnProperty(k)) objA[k] = a[k], delete a[k]; }
								for (var k in b) { if (b.hasOwnProperty(k)) objB[k] = b[k], delete b[k]; }
								if (dir == false) 
								
								objA.smartSort(dir);
								objB.smartSort(dir);
								
								for (var k in objA) a[k] = objA[k];
								for (var k in objB) b[k] = objB[k];
								
								var aKeys = JSON.stringify(Object.keys(a)).replace(/\[|"|\]|,/g, '').toLowerCase(),
									bKeys = JSON.stringify(Object.keys(b)).replace(/\[|"|\]|,/g, '').toLowerCase();
								
								if (aKeys !== bKeys) return dir ? (aKeys < bKeys ? -1 : 1) : (aKeys > bKeys ? -1 : 1);
								else {	//	evaluate based on values
									var aValues = '', bValues = '';
									
									//	try by number values
									for (var k in a) if (Object.prototype.hasOwnProperty.call(a, k) && /number/.test(typeof a[k])) aValues += a[k];
									for (var k in b) if (Object.prototype.hasOwnProperty.call(b, k) && /number/.test(typeof b[k])) aValues += b[k];
									if (aValues && bValues) {
										aValues = parseFloat(aValues);
										bValues = parseFloat(bValues);
										return aValues === bValues ? 0 : (dir ? (aValues < bValues ? -1 : 1) : (aValues > bValues ? -1 : 1));
									}
									
									//	try by string values
									for (var k in a) if (Object.prototype.hasOwnProperty.call(a, k) && /string/.test(typeof a[k])) aValues += a[k].toLowerCase();
									for (var k in b) if (Object.prototype.hasOwnProperty.call(b, k) && /string/.test(typeof b[k])) aValues += b[k].toLowerCase();
									if (aValues && bValues) return aValues === bValues ? 0 : (dir ? (aValues < bValues ? -1 : 1) : (aValues > bValues ? -1 : 1));
								}
								
								//	falback
								//	TODO: break this down to further above cause
								var aFirst = Object.keys(a)[0],
									bFirst = Object.keys(b)[0];
								
								if (void 0 != aFirst && aFirst === bFirst) {
									aFirst = a[aFirst];
									bFirst = b[bFirst];
									if (aFirst === bFirst) return 0;
									var firstSorted = [aFirst, bFirst].smartSort(dir);
									return aFirst == firstSorted[0] ? -1 : 1;
								}
								return dir ? (aFirst < bFirst ? -1 : 1) : (aFirst > bFirst ? -1 : 1);
							}
							
						}
						//	Organize as [DATE, ELEMENT, ARRAY, OBJECT, NAN|NULL|UNDEFINED]
						if (/Date/ig.test(cInstance)) return /Date/ig.test(aInstance) ? -1 : 1;
						if (/Element/ig.test(cInstance)) return /Element/ig.test(aInstance) ? -1 : 1;
						//	quick jQuery check to organize jQuery elements right behind standard elements
						if (window['jQuery'] && (a instanceof jQuery || b instanceof jQuery)) return a instanceof jQuery ? -1 : 1;
						if (/Array/ig.test(cInstance)) return /Array/ig.test(aInstance) ? -1 : 1;
						aInstance = aInstance.toLowerCase();
						bInstance = bInstance.toLowerCase();
						return aInstance === bInstance ? 0 : (dir ? (aInstance < bInstance ? -1 : 1) : (aInstance > bInstance ? -1 : 1));
						break;
				}
			}
			else {	//	Organize as [NUMBER, STRING, BOOLEAN, DATE, ELEMENT, ARRAY, OBJECT, NAN|NULL|UNDEFINED]
				if (/number/ig.test(cType)) return /number/ig.test(aType) ? -1 : 1;
				if (/string/ig.test(cType)) return /string/ig.test(aType) ? -1 : 1;
				if (/boolean/ig.test(cType)) return /boolean/ig.test(aType) ? -1 : 1;
				if (/object/ig.test(cType)) {
					//	TODO: think up every possible test to ensure this is never reached, as it shouldnt be
					if (window['console'] && console['log']) {
						console.log(new Array(50).join('-') + 'H I T' + new Array(50).join('-'));
						console.log(new Array(50).join('-') + 'H I T' + new Array(50).join('-'));
						console.log(new Array(50).join('-') + 'H I T' + new Array(50).join('-'));
					}
					if (a instanceof Date || b instanceof Date) return a instanceof Date ? -1 : 1;
					if (a instanceof Element || b instanceof Element) return a instanceof Element ? -1 : 1;
					if (a instanceof Array || b instanceof Array) return a instanceof Array ? -1 : 1;
					return /object/ig.test(aType) ? -1 : 1;
				}
				if (/function/ig.test(cType)) return /function/ig.test(aType) ? -1 : 1;
				else return -1;
			}
		}
		
		// ss.dir = dir;
		/* console.log(dir); */
		return this.sort(function(a,b){return ss(a,b,$this.dir)});
	}
	
	if (Object['defineProperty'] && !Array.prototype['smartSort']) {
		Object.defineProperty(Array.prototype, 'smartSort', { value: smartSort });
	}
	
	//	add to jQuery if available
	if (window['jQuery']) {
		jQuery.smartSort = function() {
			dir = void 0;
			var args = [], arr;
			jQuery.each(arguments, function(i,v) {
				if (!arr && typeof v == 'object' && v instanceof Array) arr = v;
				else args.push(v);
			});
			//	DOES NOT CHANGE ORIGINAL ARRAY	
			//	This is so the user can simply use jQuery to GET a sorted array without manipulating original,
			//	since the original will already have option of array.smartSort
			if (arr) return Array.prototype.smartSort.apply($.extend(true, [], arr), args);
			return void 0;
		}
	}
	
	return  Array.smartSort;
})();
;(function() {	//	Array.unique	//	removes duplicaates from an array. * modifies original array
	var name = "unique";
	function unique() {
		var x = [];
		for (var c = {}, d = [], a = 0; a < this.length; a++) {
			var b = this[a].constructor.name, b = b + (/num|str|regex|bool/i.test(b) ? this[a] : JSON.stringify(this[a]));
			if (b in c) x.push(a);
			b in c || d.push(this[a]);
			c[b] = 1;
		}
		if (x) for (var i = (x.length-1); i >= 0; i--) this.splice(x[i], 1);
		return this;
	}
	Object['defineProperty'] && !Array.prototype.hasOwnProperty(name)
		? Object.defineProperty(Array.prototype, name, { value: unique }) : Array.prototype[name] = unique;
})();

/**	Date[extensions]()
 *	Date.add[Years|Months|Weeks|Days|Hours|Minutes|Seconds]()
 **/
;(function() {	//	Date.add[Years|Months|Weeks|Days|Hours|Minutes|Seconds]; Date.get[Day|Month]Name; Date.getWeek
	var methods = {
			'addYears': function(v) { this.setFullYear(this.getFullYear() + parseFloat(v)); return this; },
			'addMonths': function(v) { this.setMonth(this.getMonth() + parseFloat(v)); return this; },
			'addWeeks': function(v) { this.addDays(7 * parseFloat(v)); return this; },
			'addDays': function(v) { this.setDate(this.getDate() + parseFloat(v)); return this; },
			'addHours': function(v) { this.setHours(this.getHours() + parseFloat(v)); return this; },
			'addMinutes': function(v) { this.setMinutes(this.getMinutes() + parseFloat(v)); return this; },
			'addSeconds': function(v) { this.setSeconds(this.getSeconds() + parseFloat(v)); return this; },
			'getDayName': function(shortForm) {
				var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
				return shortForm ? days[this.getDay()].substr(0,3) : days[this.getDay()];
			},
			'getMonthName': function(shortForm) {
				var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
				return shortForm ? months[this.getMonth()].substr(0,3) : months[this.getMonth()];
			},
			'getWeek': function() {
				var a = new Date(this.getFullYear(), 0, 1);
				return Math.ceil(((this - a) / 864E5 + a.getDay() + 1) / 7);
			},
			'stdTimezoneOffset': function() {
				var a = new Date(this.getFullYear(), 0, 1),
					b = new Date(this.getFullYear(), 6, 1);
				return Math.max(a.getTimezoneOffset(), b.getTimezoneOffset());
			},
			'dst': function() {
				return this.getTimezoneOffset() < this.stdTimezoneOffset();
			}
		};
	for (var k in methods) {
		var v = methods[k];
		Object['defineProperty'] && !Date.prototype.hasOwnProperty(k)
			? Object.defineProperty(Date.prototype, k, { value: v }) : Date.prototype[k] = v;
	}
})();
;(function() {	//	Date.format
	function addHours(d, v) { d.setHours(d.getHours() + parseFloat(v)); return d; }
	function getDayName(d, sf) { var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]; return sf ? days[d.getDay()].substr(0,3) : days[d.getDay()]; }
	function getWeek(d) { var a = new Date(d.getFullYear(), 0, 1); return Math.ceil(((d - a) / 864E5 + a.getDay() + 1) / 7); }
	function getMonthName(d, shortForm) {
		var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		return shortForm ? months[d.getMonth()].substr(0,3) : months[d.getMonth()];
	}
	var formats = {
			/*	DAY	*/
			'd': function() { var a = this.getDate(); return a > 9 ? a : '0' + a; },
			'D': function() { return getDayName(this, true); },
			'j': function() { return this.getDate(); },
			'l': function() { return getDayName(this); },
			'N': function() { return this.getDay() + 1; },
			'S': function() { var a = this.getDate(); if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" },
			'w': function() { return this.getDay(); },
			'z': function() { return Math.round(Math.abs((this.getTime() - new Date('1/1/' + this.getFullYear()).getTime())/(8.64e7))); },
			/*	WEEK	*/
			'W': function() { return getWeek(this); },
			/*	MONTH	*/
			'F': function() { return getMonthName(this); },
			'm': function() { var a = this.getMonth() + 1; return a > 9 ? a : '0' + a; },
			'M': function() { return getMonthName(this, true); },
			'n': function() { return this.getMonth() + 1; },
			't': function() { return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate() },
			/*	YEAR	*/
			'L': function() { var a = this.getFullYear(); return 0 == a % 4 && 0 != a % 100 || 0 == a % 400; },
			'o': function() { return parseInt(this.getFullYear()); },	//	todo: base on week's parent year
			'Y': function() { return parseInt(this.getFullYear()); },
			'y': function() { return parseInt((this.getFullYear()+'').substr(-2)); },
			/*	TIME	*/
			'a': function() { return this.getHours() >= 12 ? "pm" : "am"; },
			'A': function() { return this.getHours() >= 12 ? "PM" : "AM"; },
			'B': function() { return "@"+("00"+Math.floor((((this.getHours()+1)%24*60+this.getMinutes())*60+this.getSeconds()+(this.getMilliseconds()*0.001))/86.4)).slice(-3); },
			'g': function() { var a = this.getHours(); return a == 0 ? 12 : a <= 12 ? a : a - 12; },	//	12-hour format of an hour without leading zeros
			'G': function() { return this.getHours(); },	//	24-hour format of an hour without leading zeros
			'h': function() { var a = this.getHours(); a = a <= 12 ? a : a - 12; return a == 0 ? 12 : a > 9 ? a : '0' + a; },	//		12-hour format of an hour with leading zeros
			'H': function() { var a = this.getHours(); return a > 9 ? a : '0' + a; },	//		24-hour format of an hour with leading zeros
			'i': function() { var a = this.getMinutes(); return a > 9 ? a : '0' + a; },	//	Minutes with leading zeros
			's': function() { var a = this.getSeconds(); return a > 9 ? a : '0' + a; },	//	Seconds, with leading zeros
			'u': function() { return this.getMilliseconds(); },	//	this is NOT microseconds ... it's JS :P,
			/*	TIMEZONE	*/
			'e': function() { var a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/); return a.length > 1 ? a[1] : ''; },
			'I': function() {
				var a = new Date(this.getFullYear(), 0, 1),
					b = new Date(this.getFullYear(), 6, 1),
					c = Math.max(a.getTimezoneOffset(), b.getTimezoneOffset());
				return this.getTimezoneOffset() < c ? 1 : 0;
			},
			'O': function() { var a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/); return a.length > 2 ? a[2] : ''; },
			'P': function() { var a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/); return a.length > 2 ? a[2].substr(0,3) + ':' + a[2].substr(3,2) : ''; },
			'T': function() { return this.toLocaleString('en', {timeZoneName:'short'}).split(' ').pop(); },	//	may not be reliable on Apple Systems	//	NOTE: Apple Sux
			'Z': function() { return this.getTimezoneOffset() * 60; },
			/*	FULL DATE/TIME	*/
			'c': function() { return addHours(new Date(this), -(this.getTimezoneOffset() / 60)).toISOString(); },
			'r': function() { return addHours(new Date(this), -(this.getTimezoneOffset() / 60)).toISOString(); },
			'U': function() { return this.getTime() / 1000 | 0; }
		},
		compound = {
			'commonLogFormat': 'd/M/Y:G:i:s',
			'exif': 'Y:m:d G:i:s',
			'isoYearWeek': 'Y\\WW',
			'isoYearWeek2': 'Y-\\WW',
			'isoYearWeekDay': 'Y\\WWj',
			'isoYearWeekDay2': 'Y-\\WW-j',
			'mySQL': 'Y-m-d h:i:s',
			'postgreSQL': 'Y.z',
			'postgreSQL2': 'Yz',
			'soap': 'Y-m-d\\TH:i:s.u',
			'soap2': 'Y-m-d\\TH:i:s.uP',
			'unixTimestamp': '@U',
			'xmlrpc': 'Ymd\\TG:i:s',
			'xmlrpcCompact': 'Ymd\\tGis',
			'wddx': 'Y-n-j\\TG:i:s'
		},
		constants = {
			'AMERICAN': 'F j, Y',
			'AMERICANSHORT': 'm/d/Y',
			'AMERICANSHORTWTIME': 'm/d/Y h:i:sA',
			'ATOM': 'Y-m-d\\TH:i:sP',
			'COOKIE': 'l, d-M-Y H:i:s T',
			'EUROPEAN': 'j F Y',
			'EUROPEANSHORT': 'd.m.Y',
			'EUROPEANSHORTWTIME': 'd.m.Y H:i:s',
			'ISO8601': 'Y-m-d\\TH:i:sO',
			'LEGAL': 'j F Y',
			'RFC822': 'D, d M y H:i:s O',
			'RFC850': 'l, d-M-y H:i:s T',
			'RFC1036': 'D, d M y H:i:s O',
			'RFC1123': 'D, d M Y H:i:s O',
			'RFC2822': 'D, d M Y H:i:s O',
			'RFC3339': 'Y-m-d\\TH:i:sP',
			'RSS': 'D, d M Y H:i:s O',
			'W3C': 'Y-m-d\\TH:i:sP'
		},
		pretty = {
			'pretty-a': 'g:i.sA l jS \\o\\f F, Y',
			'pretty-b': 'g:iA l jS \\o\\f F, Y',
			'pretty-c': 'n/d/Y g:iA',
			'pretty-d': 'n/d/Y',
			'pretty-e': 'F jS - g:ia',
			'pretty-f': 'g:iA',
			'pretty-g': 'F jS, Y',
			'pretty-h': 'F jS, Y g:mA'
		}
	
	//	utc param currently does nothing except bool false to return list of constants as pure strings (no format)
	function dateFormat(str, utc) {	//	string, boolean TODO: use utc bool to determine in converter methods if to use UTC version
		if (str) {
			if (str == 'compound') {
				if (utc === false) return this.format.compound;
				var r = {};
				for (var x in Date.prototype.format.compound) r[x] = this.format(Date.prototype.format.compound[x]);
				return r;
			}
			else if (Date.prototype.format.compound[str]) return this.format(Date.prototype.format.compound[str], utc);
			
			if (str == 'constants') {
				if (utc === false) return this.format.constants;
				var r = {};
				for (var x in Date.prototype.format.constants) r[x] = this.format(Date.prototype.format.constants[x]);
				return r;
			}
			else if (Date.prototype.format.constants[str]) return this.format(Date.prototype.format.constants[str], utc);
			
			if (str == 'pretty') {
				if (utc === false) return this.format.pretty;
				var r = {};
				for (var x in Date.prototype.format.pretty) r[x] = this.format(Date.prototype.format.pretty[x]);
				return r;
			}
			else if (Date.prototype.format.pretty[str]) return this.format(Date.prototype.format.pretty[str], utc);
			
			var ret = str.split(''), lc = '';
			for (var x in ret) {
				var c = ret[x];
				if ((c && /[a-z]/i.test(c)) && !(/\\/.test(lc + c))) {
					var rx = new RegExp(c, 'g');
					ret[x] = formats[c] ? formats[c].apply(this) : c;
				}
				lc = ret[x];
			}
			return ret.join('').replace(/\\/g, '');
		}
		return str;
	}
	
	Object['defineProperty'] ? Object.defineProperty(dateFormat, 'compound', { value: compound }) : dateFormat['compound'] = compound;
	Object['defineProperty'] ? Object.defineProperty(dateFormat, 'constants', { value: constants }) : dateFormat['constants'] = constants;
	Object['defineProperty'] ? Object.defineProperty(dateFormat, 'pretty', { value: pretty }) : dateFormat['pretty'] = pretty;
	
	Object['defineProperty'] && !Date.prototype.hasOwnProperty('format') ? Object.defineProperty(Date.prototype, 'format', { value: dateFormat }) : Date.prototype['format'] = dateFormat;
})();

/**	Element[extensions]()
 *	Element.defaultPX()
 *	Element.hasScroll()
 **/
;(function() {	//	Element.defaultPX	//	jQuery.defaultPX	//	defaultPX Includes coverage for Element, HTMLCollection, && Array
	/**	defaultPX Includes coverage for Element, HTMLCollection, && Array
	 *	Element: because an element will have its own default px
	 *	HTMLCollection: for use with things like `document.getElementsByTagName('div')`
	 *	Array: Because jQuery HTML Collections are actually Arrays
	 *	*/
	//parseFloat(getComputedStyle(document.body, null).fontSize.replace(/[^\d\.]/g, ''))
	function defaultPX() {
		var args = Array.prototype.slice.call(arguments, 0),
			retObj = false, ele = [], multiplier;
		for (var x in args) {
			switch (typeof args[x]) {
				case 'boolean':
					if (!retObj) retObj = args[x];
					break;
				case 'number':
					if (void 0 == multiplier) multiplier = args[x];
					break;
				case 'object':
					if (args[x]['element'] || args[x]['multiplier'] || args[x]['asObject']) {
						if (args[x]['element']) ele.push(args[x]['element']);
						if (args[x]['multiplier']) multiplier = parseFloat(args[x]['multiplier']);
						if (args[x]['asObject']) retObj = args[x]['asObject'];
					}
					else {
						if (args[x] instanceof Array) ele = ele.concat(args[x]);
						else if (args[x] instanceof HTMLCollection) ele = ele.concat(Array.prototype.slice.call(args[x], 0));
						else if (args[x] instanceof Element) ele.push(args[x]);
					}
					break;
				case 'string':
					
					break;
			}
		}
		
		if (!ele.length) ele.push(document.body);
		
		if (ele.length == 1) {
			var s = getComputedFontSizePX(ele[0]);
			if (void 0 != multiplier && multiplier != 0) s *= multiplier;
			if (retObj) {
				retObj = {};
				retObj[getElementIDNameTag(ele[0])] = s;
				return retObj;
			}
			return s;
		}
		else {
			var ret = {};
			for (var i in ele) {
				var e = ele[i];
				var s = getComputedFontSizePX(e);
				if (void 0 != multiplier && multiplier != 0) s *= multiplier;
				var k = getElementIDNameTag(e) + '['+i+']';
				ret[k] = s;
			}
			return retObj ? ret : objectToArray(ret);
		}
		return void 0;
	}
	
	function getComputedFontSizeString(ele) { return getComputedStyle(ele, null).getPropertyValue('font-size'); }
	
	function getComputedFontSizePX(ele) {
		var fss = getComputedFontSizeString(ele);
		if (/^[-+]?[0-9]*\.?[0-9]+px$/.test(fss) || !fss.match(/[^\d.]{1,}/g)) return parseFloat(fss);
		var par = ele.parentNode;
		while (par) {
			var parFss = getComputedFontSizeString(par);
			if (/^[-+]?[0-9]*\.?[0-9]+px$/.test(parFss) || !parFss.match(/[^\d.]{1,}/g)) {
				if (/^\d+em$/.test(fss)) return parseFloat(parFss) * parseFloat(fss);
				if (/^\d+%$/.test(fss)) return parseFloat(parFss) * (parseFloat(fss)/100);
				return parseFloat(parFss);
			}
			par = ele.parentNode;
		}
		return parseFloat(getComputedFontSizeString(document.body));
	}
	
	function getElementIDNameTag(a) {
		var id = a.getAttribute('id'),
			name = a.getAttribute('name'),
			tag = a.tagName,
			classes = a.getAttribute('class'),
			ret = [ tag ];
		if (void 0 != id) ret.push('#' + id);
		if (void 0 != name) ret.push('[name=' + id + ']');
		if (void 0 != classes) {
			classes = classes.replace(/ {2,}/g, ' ').split(/ /g)
			if (classes.length) ret.push('.' + classes.join('.'));
		}
		return ret.join('');
	};
	
	function objectToArray(obj) { return Object.keys(obj).map(key => obj[key]); }
	
	//	add as window variable
	window.hasOwnProperty("defaultPX")||(window.defaultPX=defaultPX);
	
	//	add as method of a Element|HTMLCollection|Array ( exp: ele.defaultPX(); )
	var name = 'defaultPX';
	function method() {
		var args = Array.prototype.slice.call(arguments, 0);
		return defaultPX.apply(this, args.concat([this]))
	}
	Object['defineProperty'] && !Element.prototype.hasOwnProperty(name)
		? Object.defineProperty(Element.prototype, name, { value: method }) : Element.prototype[name] = method;
	Object['defineProperty'] && !HTMLCollection.prototype.hasOwnProperty(name)
		? Object.defineProperty(HTMLCollection.prototype, name, { value: method }) : HTMLCollection.prototype[name] = method;
	Object['defineProperty'] && !Array.prototype.hasOwnProperty(name)
		? Object.defineProperty(Array.prototype, name, { value: method }) : Array.prototype[name] = method;
	
	//	add as a jQuery extension
	try {
		if (window.hasOwnProperty('jQuery') && jQuery) {
			jQuery.defaultPX || (jQuery.extend({
				defaultPX: function() {
					var args = Array.prototype.slice.call(arguments, 0),
						nArgs = [];
					for (var x in args) {
						if (args[x] instanceof jQuery) args[x].each(function(i) { if (this instanceof Element) nArgs.push(this); });
						else if (args[x] instanceof Element) nArgs.push(args[x]);
						else if (args[x] instanceof HTMLCollection) nArgs = nArgs.concat(args[x]);
						else if (/boolean|number/.test(typeof args[x])) nArgs.push(args[x]);
					}
					return defaultPX.apply(window, nArgs);
				}
			}),
			jQuery.fn.extend({
				defaultPX: function() {
					var args = Array.prototype.slice.call(arguments, 0);
					return jQuery.defaultPX.apply(this, args.concat([jQuery(this)]))
				}
			}))
		}
	}
	catch (err) {}
})();
;(function() {	//	Element.hasScroll	//	jQuery.hasScroll	//	simple method for determining if an element has visible scroll bars
	//	x == horizontal
	function hasScroll() {
		var args = Array.prototype.slice.call(arguments, 0),
			ele = [], type;
		
		for (var x in args) {
			switch (typeof args[x]) {
				case 'boolean': type = args[x]; break;
				case 'string':
					if (void 0 === type) {
						if (/^horizontal|x$/i.test(args[x])) type = 'x';
						else if (/^veritcal|y$/i.test(args[x])) type = 'y';
						else if (/^all|both$/i.test(args[x])) type = true;
					}
					break;
				case 'object':
					if (args[x] instanceof Array) ele = ele.concat(args[x]);
					if (args[x] instanceof HTMLCollection) ele = ele.concat(Array.prototype.slice.call(args[x], 0));
					if (args[x] instanceof Element) ele.push(args[x]);
					break;
			}
		}
		
		if (ele) {
			if (ele.length == 1) {
				switch (type) {
					case 'x': return hasScrollX(ele[0]); break;
					case 'y': return hasScrollY(ele[0]); break;
					case true: return { horizontal: hasScrollX(ele[0]), vertical: hasScrollY(ele[0]) }; break;
					default: return hasScrollX(ele[0]) || hasScrollY(ele[0]);
				}
			}
			else {
				var ret = {};
				for (var x in ele) {
					var e = ele[x];
					if (e instanceof Element) {
						ret[x] = { ele: e };
						switch (type) {
							case 'x': ret[x]['hasScroll'] = hasScrollX(ele[0]); break;
							case 'y': ret[x]['hasScroll'] = hasScrollY(ele[0]); break;
							case true: ret[x]['hasScroll'] = { horizontal: hasScrollX(ele[0]), vertical: hasScrollY(ele[0]) }; break;
							default: ret[x]['hasScroll'] = hasScrollX(ele[0]) || hasScrollY(ele[0]);
						}
					}
				}
				return ret;
			}
		}
		return void 0;
	}
	
	function hasScrollX(ele) { return (ele.scrollWidth > ele.clientWidth) && (getComputedStyle(ele)['overflowX'] != 'hidden') }	//	horizontal
	function hasScrollY(ele) { return (ele.scrollHeight > ele.clientHeight) && (getComputedStyle(ele)['overflowY'] != 'hidden') }	//	vertical
	
	//	add as window variable
	window.hasOwnProperty("hasScroll")||(window.matchUrl=hasScroll);
	
	//	add as method of a Element|HTMLCollection|Array ( exp: ele.hasScroll(); )
	var name = 'hasScroll';
	function method() {
		var args = Array.prototype.slice.call(arguments, 0);
		return hasScroll.apply(this, args.concat([this]))
	}
	Object['defineProperty'] && !Element.prototype.hasOwnProperty(name)
		? Object.defineProperty(Element.prototype, name, { value: method }) : Element.prototype[name] = method;
	Object['defineProperty'] && !HTMLCollection.prototype.hasOwnProperty(name)
		? Object.defineProperty(HTMLCollection.prototype, name, { value: method }) : HTMLCollection.prototype[name] = method;
	Object['defineProperty'] && !Array.prototype.hasOwnProperty(name)
		? Object.defineProperty(Array.prototype, name, { value: method }) : Array.prototype[name] = method;
	
	//	add as a jQuery extension
	try {
		if (window.hasOwnProperty('jQuery') && jQuery) {
			jQuery.hasScroll || (jQuery.extend({
				hasScroll: function() {
					var args = Array.prototype.slice.call(arguments, 0),
						nArgs = [];
					for (var x in args) {
						if (args[x] instanceof jQuery) args[x].each(function(i) { if (this instanceof Element) nArgs.push(this); });
						else if (args[x] instanceof Element) nArgs.push(args[x]);
						else if (args[x] instanceof HTMLCollection) nArgs = nArgs.concat(args[x]);
						else if (/boolean|string/.test(typeof args[x])) nArgs.push(args[x]);
					}
					return hasScroll.apply(window, nArgs);
				}
			}),
			jQuery.fn.extend({
				hasScroll: function() {
					var args = Array.prototype.slice.call(arguments, 0);
					return jQuery.hasScroll.apply(this, args.concat([jQuery(this)]))
				}
			}))
		}
	}
	catch (err) {}
	
	/*	Examples:
	//	simple use on one element
	var ele = document.getElementById('bob');
	if (bob.hasScroll()) {  do work  }
	
	//	simple use on an element collection
	var col = ele.getElementsByTagName('div');
	for (var x in col) if (col[x].hasScroll()) {  do work  }
	
	//	simple use on a jQuery collection
	var col = jQuery('selector');
	col.each(function(i) { if ($(this).hasScroll()) {  do work  } });
	
	//	a couple diff params available for slightly altered return
	ele.hasScroll(true); // return an object { horizontal: [bool], veritical: [bool] }
	ele.hasScroll('x') || ele.hasScroll('horizontal'); // will return bool based on if horizontal bar visible
	ele.hasScroll('y') || ele.hasScroll('vertical'); // will return bool based on if vertical bar visible
	*/
})();
;(function() {	//	Element.textContent.selector
	function selectText() {
		if (document.body.createTextRange) {
			var r = document.body.createTextRange();
			r.moveToElement(this);
			r.select();
		}
		else if (window.getSelection) {
			var s = window.getSelection(),
				r = document.createRange();
				r.selectNodeContents(this);
				s.removeAllRanges();
				s.addRange(r);
		}
		return this.textContent;
	}
	Object['defineProperty'] && !Element.prototype.hasOwnProperty('selectText')
		? Object.defineProperty(Element.prototype, 'selectText', { value: selectText }) : Element.prototype['selectText'] = selectText;
})();

/**	Math[extensions]()
 *	Math.average()
 *	Math.difference()
 *	Math.max()
 *	Math.mean()
 *	Math.median()
 *	Math.medianMinMax()
 *	Math.min()
 *	Math.minMax()
 *	Math.mode()
 *	Math.product()
 *	Math.quotient()
 *	Math.range()
 *	Math.sum()
 *	Math.runExample()
 *	Math.rand()
 **/
;(function() {	//	Math[doMath]	//	Because for some reason JS doesn't include these many very basic math methods!
	/*	[ 'average', 'difference', 'max', 'mean', 'median', 'medianMinMax', 'min', 'minMax', 'maxMin', 'mode', 'product',
		'quotient', 'range', 'sum' ]	*/
	var args = Array.prototype.slice.call(arguments, 1),
		mathMax = Math.max,
		mathMin = Math.min;

	function doMath() {
		var args = arguments,
			araNum = new Array(),
			resType = '',
			compareMin, compareMax;

		for (x in args) {
			var argsX = args[x];
			switch (typeof argsX) {
				case 'number':
					araNum.push(args[x]);
					break;
				case 'string':
					isNaN(parseFloat(args[x].replace(/[^0-9|.]/g,""))) ? resType = args[x].toLowerCase() : araNum.push(parseFloat(args[x].replace(/[^0-9|.]/g,"")));
					break;
				case 'object':
					for (y in argsX) {
						var argsXY = argsX[y];
						if (y == 'compare') {
							switch (typeof argsXY) {
								case 'object':
									compareMin = argsXY.min;
									compareMax = argsXY.max;
									break;
								default:
									compareMin = compareMax = parseFloat((''+argsXY).replace(/[^0-9|.]/g,""));
							}
						}
						else {
							"number" == typeof argsXY && araNum.push(argsXY);
							if ("string" == typeof argsXY) {
								var argsXYZ = parseFloat(argsXY.replace(/[^0-9|.]/g, ""));
								"number" != typeof argsXYZ || isNaN(argsXYZ) || araNum.push(argsXYZ);
							}
						}
					}
					break;
			}
		}

		if (1 < araNum.length) {
			var min, max;
			if (void 0 !== compareMin) min = mathMin.apply(null, araNum.filter(function(v) { return v >= compareMin; }));
			else min = mathMin.apply(null, araNum);

			if (void 0 !== compareMax) max = mathMax.apply(null, araNum.filter(function(v) { return v <= compareMax; }));
			else max = mathMax.apply(null, araNum);

			switch (resType) {
				case "average":
					araNum.sort(function(a, b) { return a - b; });
					return function() { var a = 0; for (var i=0;i<araNum.length;i++) a += parseFloat(araNum[i]); return a / araNum.length; }();
				case "difference":
					araNum.sort(function(a, b) { return a - b; });
					return function() { var a = 0; for (var i=0;i<araNum.length;i++) a -= parseFloat(araNum[i]); return a; }();
				case "max":
					return max;
				case "mean":
					araNum.sort(function(a, b) { return a - b; });
					var sum = function() { var a = 0; for (var i=0;i<araNum.length;i++) a += araNum[i]; return a; }();
					return sum / araNum.length;
				case "median":
					araNum.sort(function(a, b) { return a - b; });
					var half = ~~(araNum.length/2);
					return araNum.length % 2 ? araNum[half] : (araNum[half - 1] + araNum[half]) / 2;
				case "medianminmax":
					araNum.sort(function(a, b) { return a - b; });
					var half = ~~(araNum.length/2);
					return araNum.length % 2 ? araNum[half] : [araNum[half - 1], araNum[half]];
				case "min":
					return min;
				case "mode":
					if (!(araNum instanceof Array) || araNum.length <= 1) return Infinity;
					araNum.sort(function(a, b) { return a - b; });

					var dups = [];
					for (var i = 0; i < araNum.length - 1; i++) if (araNum[i + 1] == araNum[i]) dups.push(araNum[i]);

					if (!dups.length) return -Infinity;

					var objDups = {};
					objDups[dups[0]] = [dups[0]];
					objDups[dups[0]].push(dups[0]);
					for (var i = 1; i < dups.length; i++) {
						if (!objDups[dups[i]]) {
							objDups[dups[i]] = [dups[i]];
							objDups[dups[i]].push(dups[i]);
						}
						else objDups[dups[i]].push(dups[i]);
					}

					var ret = [];

					for (var x in objDups) {
						if (!ret.length) ret.push(parseFloat(x));
						else {
							if (objDups[ret[0]].length == objDups[x].length) ret.push(parseFloat(x));
							else if (objDups[ret[0]].length < objDups[x].length) ret = [parseFloat(x)];
						}
					}

					return ret.length == 1 ? ret[0] : ret.length > 1 ? ret : -Infinity;
				case "obj":
					return { min: min, max: max };
				case "product":
					araNum.sort(function(a, b) { return a - b; });
					return function() { var a = parseFloat(araNum[0]); for (var i=1;i<araNum.length;i++) a *= parseFloat(araNum[i]); return a; }();
				case "quotient":
					araNum.sort(function(a, b) { return a - b; });
					return function() { var a = parseFloat(araNum[0]); for (var i=1;i<araNum.length;i++) a /= parseFloat(araNum[i]); return a; }();
				case "sum":
					araNum.sort(function(a, b) { return a - b; });
					return function() { var a = 0; for (var i=0;i<araNum.length;i++) a += parseFloat(araNum[i]); return a; }();
				default:
					return [ min, max ];
			};
		}

		if (araNum.length) return araNum[0];
		//throw Error("Please check arguments supplied", args.toString());
		return !resType ? [Infinity, -Infinity] : resType == 'min' ? Infinity : -Infinity;
	}
	
	var props = {
			'average': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("average");
				return doMath.apply(this, a);
			},
			'difference': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("difference");
				return doMath.apply(this, a);
			},
			'max': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("max");
				return doMath.apply(this, a);
			},
			'mean': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("mean");
				return doMath.apply(this, a);
			},
			'median': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("median");
				return doMath.apply(this, a);
			},
			'medianMinMax': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("medianminmax");
				return doMath.apply(this, a);
			},
			'min': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("min");
				return doMath.apply(this, a);
			},
			'minMax': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				return doMath.apply(this, a);
			},
			'maxMin': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				var ret = doMath.apply(this, a);
				return ret instanceof Array ? ret.sort(function(a,b) { return b - a; }) : ret;
			},
			'mode': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("mode");
				return doMath.apply(this, a);
			},
			'product': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("product");
				return doMath.apply(this, a);
			},
			'quotient': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("quotient");
				return doMath.apply(this, a);
			},
			'range': function() {
				var a = [];
				for (x in arguments) if ((''+arguments[x]).toLowerCase() != 'min' && (''+arguments[x]).toLowerCase() != 'max') a.push(arguments[x]);
				var minMax = doMath.apply(this, a);
				return minMax instanceof Array && minMax.length == 2 ? minMax[1] - minMax[0] : Infinity;
			},
			'sum': function() {
				var a = [];
				for (x in arguments) a.push(arguments[x]);
				a.push("sum");
				return doMath.apply(this, a);
			},
			'runExample': function() {
				if (!console || !console['log']) return void 0;
				var args = arguments.length ? arguments : [9,5,8,1,-3,-3,'09.230.236',6,6,6,-5.7,-2,1,3],
					exts = [ 'average', 'difference', 'max', 'mean', 'median', 'medianMinMax', 'min', 'minMax', 'maxMin', 'mode', 'product', 'quotient', 'range', 'sum' ];
				if (args[0] instanceof Array) args = args[0];
				for (x in exts) {
					var str = "Math." + exts[x] + "(" + args.toString().replace('09.230.236', "'09.230.236'") + "):";
					console.log(str + (str.length < 56 ? "\t\t\t" : (str.length < 60 ? "\t\t" : "\t")), Math[exts[x]].apply(Math, args));
				}
				return "Thank you for trying my Math extensions!";
			}
		}
	
	for (var name in props) {
		var method = props[name];
		Object['defineProperty'] && !Math.hasOwnProperty(name)
			? Object.defineProperty(Math, name, { value: method }) : Math[name] = method;
	}
})(Math);
;(function(){	//	Math.rand	//	Get random number between 2 numbers. 3rd var bool for if to include decimal
	if (!Math.hasOwnProperty('rand')) {
		Math.rand = function(min, max, dec) {
			var r = this.random() * (max - min + 1);
			if (dec !== true && typeof dec !== "number") return ~~r + ~~min;
			else if (typeof dec === "number") return r = (r + min).toFixed(dec), r = r <= this.max(max, min) ? r : (r/2).toFixed(dec), (parseFloat(r)+"").length == (r+"").length ? parseFloat(r) : r;
			return r = r + min, r <= this.max(max, min) ? r : r/2;
		}
	}
})(Math);

/**	navigator[extensions]()
 *	navigator[browser|mobile|version]
 **/
;(function() {
	if (navigator) {
		navigator.browser = void 0;
		navigator.version = void 0;
		navigator.mobile = !1;
		
		if (navigator['userAgent']) {
			navigator.webkit = /WebKit/i.test(navigator.userAgent);
			
			if (/Sony[^ ]*/i.test(navigator.userAgent)) navigator.mobile = 'Sony';
			else if (/RIM Tablet/i.test(navigator.userAgent)) navigator.mobile = 'RIM Tablet';
			else if (/BlackBerry/i.test(navigator.userAgent)) navigator.mobile = 'BlackBerry';
			else if (/iPhone/i.test(navigator.userAgent)) navigator.mobile = 'iPhone';
			else if (/iPad/i.test(navigator.userAgent)) navigator.mobile = 'iPad';
			else if (/iPod/i.test(navigator.userAgent)) navigator.mobile = 'iPod';
			else if (/Opera Mini/i.test(navigator.userAgent)) navigator.mobile = 'Opera Mini';
			else if (/IEMobile/i.test(navigator.userAgent)) navigator.mobile = 'IEMobile';
			else if (/BB[0-9]{1,}; Touch/i.test(navigator.userAgent)) navigator.mobile = 'BlackBerry';
			else if (/Nokia/i.test(navigator.userAgent)) navigator.mobile = 'Nokia';
			else if (/Android/i.test(navigator.userAgent)) navigator.mobile = 'Android';
			
			if (/MSIE|Trident/i.test(navigator.userAgent)) {
				navigator.browser = "MSIE";
				navigator.version = /MSIE/i.test(navigator.userAgent) && parseFloat(navigator.userAgent.split("MSIE")[1].replace(/[^0-9\.]/g, '')) > 0 ? parseFloat(navigator.userAgent.split("MSIE")[1].replace(/[^0-9\.]/g, '')) : "Edge";
				if (/Trident/i.test(navigator.userAgent) && /rv:([0-9]{1,}[\.0-9]{0,})/.test(navigator.userAgent))
					navigator.version = parseFloat(navigator.userAgent.match(/rv:([0-9]{1,}[\.0-9]{0,})/)[1].replace(/[^0-9\.]/g, ''));
			}
			else if (/Chrome/.test(navigator.userAgent)) {
				navigator.browser = "Chrome";
				navigator.version = parseFloat(navigator.userAgent.split("Chrome/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
			}
			else if (/Opera/.test(navigator.userAgent)) {
				navigator.browser = "Opera";
				navigator.version = parseFloat(navigator.userAgent.split("Version/")[1].replace(/[^0-9\.]/g, ''));
			}
			else if (/Kindle|Silk|KFTT|KFOT|KFJWA|KFJWI|KFSOWI|KFTHWA|KFTHWI|KFAPWA|KFAPWI/i.test(navigator.userAgent)) {
				navigator.mobile = 'Kindle';
				if (/Silk/i.test(navigator.userAgent)) {
					navigator.browser = "Silk";
					navigator.version = parseFloat(navigator.userAgent.split("Silk/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
				}
				else if (/Kindle/i.test(navigator.userAgent) && /Version/i.test(navigator.userAgent)) {
					navigator.browser = "Kindle";
					navigator.version = parseFloat(navigator.userAgent.split("Version/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
				}
			}
			else if (/BlackBerry/.test(navigator.userAgent)) {
				navigator.browser = "BlackBerry";
				navigator.version = parseFloat(navigator.userAgent.split("/")[1].replace(/[^0-9\.]/g, ''));
			}
			else if (/PlayBook/.test(navigator.userAgent)) {
				navigator.browser = "PlayBook";
				navigator.version = parseFloat(navigator.userAgent.split("Version/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
			}
			else if (/BB[0-9]{1,}; Touch/.test(navigator.userAgent)) {
				navigator.browser = "Blackberry";
				navigator.version = parseFloat(navigator.userAgent.split("Version/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
			}
			else if (/Android/.test(navigator.userAgent)) {
				navigator.browser = "Android";
				navigator.version = parseFloat(navigator.userAgent.split("Version/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
			}
			else if (/Safari/.test(navigator.userAgent)) {
				navigator.browser = "Safari";
				navigator.version = parseFloat(navigator.userAgent.split("Version/")[1].split("Safari")[0].replace(/[^0-9\.]/g, ''));
			}
			else if (/Firefox/.test(navigator.userAgent)) {
				navigator.browser = "Mozilla";
				navigator.version = parseFloat(navigator.userAgent.split("Firefox/")[1].replace(/[^0-9\.]/g, ''));
			}
			else if (/Nokia/.test(navigator.userAgent)) {
				navigator.browser = "Nokia";
				navigator.version = parseFloat(navigator.userAgent.split('Browser')[1].replace(/[^0-9\.]/g, ''));
			}
		}
	}
})();

/**	Object[extensions]()
 *	Object.join()
 **/
;(function() {	//	Object.join		//	jQuery.joinObj	//	adds join method to Objects
	function joinObj() {
		var obj = [], str = "", ret = [],
			args = Array.prototype.slice.call(arguments, 0);
		for (var x in args) switch (typeof args[x]) {
			case 'object':
				obj[x] = args[x];
				break;
			case 'string':
				str = args[x];
				break;
		}
		for (var y in obj) {
			var ob = obj[y]
			for (var z in obj[y]) if (obj[y].hasOwnProperty(z)) switch (typeof obj[y][z]) {
				case "string":
					ret.push(obj[y][z]);
					break;
				case "object":
					var a = joinObj(obj[y][z], str);
					if (a) ret.push(a);
					break;
				default:
					if (obj[y][z]['valueOf']) ret.push(obj[y][z].valueOf());
			}
		}
		
		console.log(ret, str, obj, args)
		
		return ret ? ret.join(str) : "";
	}
	
	//	add as window variable
	window.hasOwnProperty("joinObj")||(window.joinObj=joinObj);
	
	//	add as method of an object ( exp: obj.join("str"); )
	var name = 'join';
	function method(str) { return joinObj(this,str); }
	Object['defineProperty'] && !Object.prototype.hasOwnProperty(name)
		? Object.defineProperty(Object.prototype, name, { value: method }) : Object.prototype[name] = method;
	
	//	add as a jQuery extension
	if (window.hasOwnProperty('jQuery')) {
		jQuery.joinObj || (jQuery.extend({
			joinObj: function() {
				var args = Array.prototype.slice.call(arguments, 0);
				for (var x in args) if (typeof args[x] == 'string' && args[x] instanceof jQuery && args[x][0] && args[x][0] instanceof Element) args[x] = args[x].text();
				return joinObj.apply(this, args);
			}
		}),
		jQuery.fn.extend({
			joinObj: function() {
				var args = Array.prototype.slice.call(arguments, 0);
				return jQuery.joinObj.apply(this, args.concat([$(this)]))
			}
		}))
	}
})();
;(function() {	//	Object.realType
	function realType(toLower) {
		var r = typeof this;
		try {
			if (window.hasOwnProperty('jQuery') && this.constructor && this.constructor == jQuery) r = 'jQuery';
			else r = this.constructor && this.constructor.name ? this.constructor.name : Object.prototype.toString.call(this).slice(8, -1);
		}
		catch(e) { if (this['toString']) r = this.toString().slice(8, -1); }
		return !toLower ? r : r.toLowerCase();
	}
	Object['defineProperty'] && !Object.prototype.hasOwnProperty('realType')
		? Object.defineProperty(Object.prototype, 'realType', { value: realType }) : Object.prototype['realType'] = realType;
})();
;(function() {	//	Object.length
	function realType(obj, toLower) {
		var r = typeof obj;
		try {
			if (window.hasOwnProperty('jQuery') && obj.constructor && obj.constructor == jQuery) r = 'jQuery';
			else r = obj.constructor && obj.constructor.name ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1);
		}
		catch(e) { if (obj['toString']) r = obj.toString().slice(8, -1); }
		return !toLower ? r : r.toLowerCase();
	}
	function length() {
		if (/object/i.test(realType(this, true))) {
			var i = 0;
			for (var x in this) if (this.hasOwnProperty(x)) i++;
			return i;
		}
		if (/boolean/i.test(realType(this, true))) return this.valueOf() ? 1 : 0;
	}
	Object['defineProperty'] && !Object.prototype.hasOwnProperty('length')
		? Object.defineProperty(Object.prototype, 'length', { get: length }) : Object.prototype.__defineGetter__('length', length);
})();

/**	RegExp[extensions]()
 *	RegExp.escape()
 **/
;(function() {	//	RegExp.escape	//
	/**	RegExp.escape(STRING)
	*	Inspired by personal need and a polyfill found @
	*		https://github.com/benjamingr/RegExp.escape
	*	Only real difference is implementation and accounting for forward slashes.
	*
	*	@param {STRING|ARRAY} Can be multiple strings. If just one, then a string is returned.
	*			However, if multiple Strings, or an Array of Strings, are passed through, then an array is returned.
	**/
	function regExpEscape() {
		var a = Array.prototype.slice.call(arguments, 0);
		if (1 == a.length && "string" == typeof a[0]) return doEscape(a[0]);
		if (a.length) {
			var b = [], c;
			for (c in a)
				if ("string" == typeof a[c] && b.push(doEscape(a[c])), "object" == typeof a[c])
					for (var d in a[c]) "string" == typeof a[c][d] && b.push(doEscape(a[c][d]));
			return 1 == b.length ? b[0] : b;
		}
		return void 0;
	}
	function doEscape(a) { return a.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&"); }
	var name = "escape";
	function method() {
		var a = Array.prototype.slice.call(arguments, 0);
		return regExpEscape.apply(this, a)
	}
	Object.defineProperty && !RegExp.prototype.hasOwnProperty(name)
		? Object.defineProperty(RegExp.prototype, name, { value: method }) : RegExp.prototype[name] = method;
	/** Example Use:
	 *	var a  = ")(*",
	 *		r = new RegExp(RegExp.escape(a), 'g');
	 *	console.log({ 'string': a, 'regex': r, 'test': r.test(a), 'matach': a.match(r) });
	 **/
})();
;(function() {	//	RegExp.escape	//
	function regexURL() { return /^(([^\:\/\?\#]+)\:)?(\/\/([^\/\?\#]*))?([^\?\#]*)(\?([^\#]*))?(\#(.*))?/; }
	Object.defineProperty && !RegExp.hasOwnProperty('url')
		? Object.defineProperty(RegExp, 'url', { get: regexURL }) : RegExp.prototype__defineGetter__('url', regexURL);
})();

/**	String[extensions]()
 *	String.flip()
 *	String.matchUrl()
 *	String.reverse()
 *	String.similarTo()
 **/
;(function() {	//	String.flip	//	?Flips text in string upside down
	var flipTable = {
		a: "\u0250",
		b: "q",
		c: "\u0254",
		d: "p",
		e: "\u01dd",
		f: "\u025f",
		g: "\u0183",
		h: "\u0265",
		i: "\u0131",
		j: "\u027e",
		k: "\u029e",
		/*l : '\u0283',*/
		m: "\u026f",
		n: "u",
		r: "\u0279",
		t: "\u0287",
		v: "\u028c",
		w: "\u028d",
		y: "\u028e",
		".": "\u02d9",
		"[": "]",
		"(": ")",
		"{": "}",
		"?": "\u00bf",
		"!": "\u00a1",
		"'": ",",
		"<": ">",
		_: "\u203e",
		";": "\u061b",
		"\u203f": "\u2040",
		"\u2045": "\u2046",
		"\u2234": "\u2235",
		"\r": "\n"
	};
	for (i in flipTable) flipTable[flipTable[i]] = i;
	
	function flipString() {
		for (var b = [], a = 0; a < this.length; a++) {
			var c = flipTable[this.charAt(a)];
			b.push(void 0 != c ? c : this.charAt(a))
		}
		return b.join("")
	};
	
	Object.defineProperty && !String.prototype.hasOwnProperty("flip") &&
		Object.defineProperty(String.prototype, "flip", {
			value: flipString
		})
})();
;(function() {	//	String.matchUrl	//	quick and ez access to regex match on url string
	function matchUrl(url) {
		var	regMatch = void 0,
			araLabels = "url scheme authority path query fragment".split(" "),
			regUrl = /^(([^\:\/\?\#]+)\:)?(\/\/([^\/\?\#]*))?([^\?\#]*)(\?([^\#]*))?(\#(.*))?/,
			retVal = {
				url: null,
				scheme: null, authority: null,
				path: null, query: null,
				fragment: null, valid: null
			};
		"string" === typeof url && "" != url && (regMatch = url.match(regUrl));
		if ("object" === typeof regMatch) for (x in regMatch) araLabels[x] && (retVal[araLabels[x]] = regMatch[x]);
		retVal.scheme && retVal.authority && (retVal.valid = !0);
		return retVal
	};
	
	//	add as window variable
	window.hasOwnProperty("matchUrl")||(window.matchUrl=matchUrl);
	
	//	add as method of a String ( exp: "string".matchUrl(); )
	function method() { return matchUrl(this.valueOf()); }
	Object['defineProperty'] && !String.prototype.hasOwnProperty('matchUrl')
		? Object.defineProperty(String.prototype, 'matchUrl', { value: method }) : String.prototype['matchUrl'] = method;
	
	//	add as a jQuery extension
	if (window.hasOwnProperty('jQuery')) {
		jQuery.matchUrl || (jQuery.extend({
			matchUrl: function() {
				var args = Array.prototype.slice.call(arguments, 0);
				for (var x in args) if (args[x] instanceof jQuery && args[x][0] && args[x][0] instanceof Element) args[x] = args[x].text();
				return matchUrl.apply(this, args);
			}
		}),
		jQuery.fn.extend({
			matchUrl: function() {
				var args = Array.prototype.slice.call(arguments, 0);
				return jQuery.matchUrl.apply(this, args.concat([jQuery(this)]))
			}
		}))
	}
})();
;(function() {	//	String.reverse	//	Reverses a string
	var props = {
			'reverse': function() { for (var a = "", g = this.length - 1; 0 <= g; g--) a += this[g]; return a; },
			'reverseWords': function() { var a = this.split(/ /); for (var x in a) a[x] = a[x].reverse(); return a.join(' '); }
		}
	for (var name in props) {
		var method = props[name];
		Object['defineProperty'] && !String.prototype.hasOwnProperty(name)
			? Object.defineProperty(String.prototype, name, { value: method }) : String.prototype[name] = method;
	}
})();
;(function() {	//	String.similarTo	//	compare a string to given param to see if its similar
	//	pass 2nd param true to have it check in reverse as well
	function a(a, c) {
		if (0 == a.length) return c.length;
		if (0 == c.length) return a.length;
		for (var d = [], e = 0; e <= c.length; e++) d[e] = [e];
		for (var f = 0; f <= a.length; f++) d[0][f] = f;
		for (e = 1; e <= c.length; e++)
			for (f = 1; f <= a.length; f++) c.charAt(e - 1) == a.charAt(f - 1) ? d[e][f] = d[e - 1][f - 1] : d[e][f] = Math.min(d[e - 1][f - 1] + 1, Math.min(d[e][f - 1] + 1, d[e - 1][f] + 1));
		return d[c.length][a.length]
	}

	function g(b, c) {
		var d = this.toString(),
			e = a(d, b);
		if (!c) var f = b.reverse(),
			d = a(d, f),
			e = e < d ? e : d;
		return e;
	}
	
	Object.defineProperty && !String.prototype.hasOwnProperty("similarTo") &&
		Object.defineProperty(String.prototype, "similarTo", {
			value: g
		})
})();

/**	window[extensions]()
 *	window.position()
 **/
;(function() {	//	window.position	//
	var __PositionEventOnResizeTimer__;
	
	function PositionEventOnResize() {
		if (__PositionEventOnResizeTimer__) clearTimeout(__PositionEventOnResizeTimer__);
		__PositionEventOnResizeTimer__ = setTimeout(function() { if (this.position.onResizeLog) this.position.history.set(); }, 250);
	}
	
	function PositionHistorySet() {
		var a = { x: window.position.x, y: window.position.y },
			b = this[this.length-1];
		if (a.x != b.x || a.y != b.y) this.push(a);
	}
	
	function PositionLastGet() {
		if (this.history.length >= 2) return this.history[this.history.length-2];
		else if (this.history.length) return this.history[this.history.length-1];
		return this.origin;
	}
	
	function Position() {
		Object.defineProperties(this, {	//	{ x, y }
			x: { get: function() { return window.screenLeft ? window.screenLeft : window.screenX; }, enumerable: true },
			y: { get: function() { return window.screenTop ? window.screenTop : window.screenY; }, enumerable: true }
		});
		
		Object.defineProperty(this.__proto__, 'history', { enumerable: false, value: new Array({ x: this.x, y: this.y }) });
		Object.defineProperty(this.__proto__.history, 'set', { enumerable: false, value: PositionHistorySet });
		
		Object.defineProperty(this.__proto__, 'last', { get: PositionLastGet });
		
		Object.defineProperty(this.__proto__, 'onResizeLog', { enumerable: false, value: true, writable: true });
		
		Object.defineProperty(this.__proto__, 'origin', { enumerable: false, value: { x: this.x, y: this.y } });
		
		window.addEventListener('resize', PositionEventOnResize);
		//setInterval(function() { this.position.history.set(); }, 250);
	}
	
	if (!window.hasOwnProperty('position')) {
		window.position = new Position();
		
	}
})();

/***	*C*L*A*S*S*E*S*		***/

/**	localStorageHelper
 *	Simple class to build on localStorage Object and ease use of that object along with providing a custom controlled event system.
 *	*/
;(function() {
	var lsAvailable = function() { try { var a = window.localStorage; a.setItem("__storage_test__", "__storage_test__"); a.removeItem("__storage_test__"); return !0; } catch (b) { return !1; } }();
	
	/*------------------------------------------------------------------------*/
	
	function localStorageHelper(debuggingOnOff) {
		//	always return undefined if localStorage not available
		if (!this.available) return void 0;
		
		Object.defineProperties(this, {
			'instance': { get: function() { return this; } }
			
			/*	for debugging	*/
			, 'debugging': { enumerable: false, value: debuggingOnOff?true:false, writable: true }
			, 'info': { value: function() { if (this.debugging && console && console['info']) console.info.apply(window, arguments); } }
			, 'debug': { value: function() { if (this.debugging && console && console['debug']) console.debug.apply(window, arguments); } }
			, 'warn': { value: function() { if (this.debugging && console && console['warn']) console.warn.apply(window, arguments); } }
			, 'error': { value: function() { if (this.debugging && console && console['error']) console.error.apply(window, arguments); } }
			
		});
		
		for (var x in this.methods) definePropertyMethod.call(this, x);
		
		return this;
	}
	
	/*------------------------------------------------------------------------*/
	
	function definePropertyMethod(name) {
		if (!this[name])
			Object.defineProperty(this, name, { value: function() { return this.fire.apply(this, [name].concat(Array.prototype.slice.call(arguments, 0))); } });
		
		if (!this.events[name]) {
			Object.defineProperty(this.events, name, {
				value: {
					'begin': function() { return eventBegin.apply(this, [name].concat(Array.prototype.slice.call(arguments, 0))); }
					, 'end': function() { return eventEnd.apply(this, [name].concat(Array.prototype.slice.call(arguments, 0))); }
				}
			});
			Object.defineProperty(this.events[name].begin, 'callbacks', { value: [] })
			Object.defineProperty(this.events[name].end, 'callbacks', { value: [] })
		}
		return this;
	}
	
	function eventBegin(name) {
		if (this.instance) {
			var args = Array.prototype.slice.call(arguments, 1);
			if (this.events[name] && this.events[name].begin) {
				var cb = this.events[name].begin.callbacks;
				if (cb && cb.length) {
					this.info('Triggering ' + name + "Begin Callbacks:\n\t", cb);
					for (var x in cb) cb[x].apply(this, [new Event(name+'Begin'), arguments]);
				}
			}
		}
		return this;
	}
	
	function eventEnd(name) {
		if (this.instance) {
			var args = Array.prototype.slice.call(arguments, 1);
			if (this.events[name] && this.events[name].end) {
				var cb = this.events[name].end.callbacks;
				if (cb && cb.length) {
					this.info('Triggering ' + name + "End Callbacks:\n\t", cb);
					for (var x in cb) cb[x].apply(this, [new Event(name+'End'), arguments]);
				}
			}
		}
		return this;
	}
	
	/*------------------------------------------------------------------------*/
	
	function methodArrangeArgs() {
		var args = Array.prototype.slice.call(arguments, 0),
			prefix = this.prefix || this.prototype.prefix,
			ret = [];
		for (var i=0;i<args.length;i++) {
			var a = args[i];
			if (typeof a == 'string') {
				var b = prefix + a;
				if (ret.indexOf(b) == -1 && localStorageHelper.prototype.methods.keyExists(b)) ret.push(b);
				if (ret.indexOf(a) == -1 && localStorageHelper.prototype.methods.keyExists(a)) ret.push(a);
			}
			else if (typeof a == 'number') {
				var b = localStorageHelper.prototype.methods.key.call(localStorageHelper, a)
				if (b && ret.indexOf(b) == -1) ret.push(b);
			}
			else if (a instanceof Array) ret = ret.concat(this.arrangeArgs.apply(this, a));
		}
		return ret;
	}
	
	function methodClear() {
		localStorage.clear();
		return this;
	}
	
	function methodFire(name) {
		var ret = null;
		this.trigger(name+'Begin');
		if (this.instance) {
			if (this.methods[name]) {
				var args = Array.prototype.slice.call(arguments, 1);
				this.debug("Firing Method:\t[" + name + "]\tArguments:\t", args);
				var ret = this.methods[name].apply(this, args);
				ret = ret;
			}
		}
		this.trigger(name+'End');
		return ret;
	}
	
	function methodGetItem() {
		var args = localStorageHelper.prototype.arrangeArgs.apply(this, arguments),
			items = null,
			count = 0;
		if (!args.length) {
			if (this.length) {	//	gets localstorage length
				items = {}
				for (var x in localStorage) {
					var y = localStorage[x];
					try { items[x] = JSON.parse(y); } catch(e) { items[x] = y; }
					count++;
				}
			}
		}
		else if (args.length == 1) {
			if (typeof args[0] == 'string') {	//	everything should come back to this if statement!
				var name = args[0].replace(this.prefix, ''),
					item = null;
				if (localStorage[name]) item = function(n) { try { return JSON.parse(n); } catch(e) {} return n; }(localStorage[name]);
				if (item) {
					var isJQuery = item.hasOwnProperty('type') && item.type == 'jQuery';
					item = item.hasOwnProperty('value') ? item['value'] : item;
					
					if (isJQuery && item instanceof Array && window.hasOwnProperty('jQuery')) {
						var col  = jQuery('<div />');
						for (var x in item) col.append(jQuery(item[x]).get());
						item = col.children();
					}
					
					items = item;
				}
			}
		}
		else if (args.length > 1) {
			items = {};
			for (var x in args) {
				var ax = args[x],
				item = localStorageHelper.prototype.methods.getItem.call(localStorageHelper, args[x]);
				if (item != null) items[args[x]] = item;
			}
		}
		
		return items;
	}
	
	/**	localStorageHelper.key([mixed])
	 *	Retrieve key(s) names or index numbers.
	 *
	 *	@example localStorageHelper.key(); // Returns all current keys in localStorage (these are set items)
	 *	@example localStorageHelper.key(1); // Integer argument will attempt to return key name at that index. Else null.
	 *	@example localStorageHelper.key('name'); // String argument will attempt to return key index with that name. Else null.
	 *	@example localStorageHelper.key(0, 2, 3); // Multiple arguments will cause Object return, whereby prop name is your argument and prop value is return.
	 *	@example localStorageHelper.key([0, 'name']) // Passing an array will have the same effect as above.
	 *	*/
	function methodKey() {
		//	do work
		var args = Array.prototype.slice.call(arguments, 0), ret = null;
		if (!args.length) ret = Object.keys(localStorage);
		else if (1 == args.length) {
			var a = args[0];
			if ("number" == typeof a) ret = localStorage.key(a);
			else if ("string" == typeof a && Object.keys(localStorage).indexOf(a) > -1) ret = Object.keys(localStorage).indexOf(a);
			else if (a instanceof Array) ret = localStorageHelper.prototype.methods.key.apply(localStorageHelper, a);
		}
		else {
			for (var a = {}, c = 0; c < args.length; c++) {
				var b = args[c], d = localStorageHelper.prototype.methods.key(b);
				a[b] || (a[b] = d);
			};
			ret = a ? a : null;
		}
		
		//	return value
		return ret;
	}
	
	function methodKeyExists(name) {
		try { return localStorage[name] ? true : false; } catch(e) {}
		return false;
	}
	
	function methodOff(name, callback) {
		
		if (this.instance) {
			if ((name && 'string' == typeof name) && (callback && 'function' == typeof callback)) {
				var rx = new RegExp('^(([a-z]){3,}([A-Z]{1}[a-z]+){0,1})(Begin|End)$'),
					eventKey = name, eventType = 'end';
				if (rx.test(name)) {
					eventKey = name.match(rx)[1];	//	extract keyName
					eventType = name.match(rx)[4].toLowerCase();	//	extract keyType
				}
				if (this.events[eventKey] && this.events[eventKey][eventType].callbacks) {
					var cbs = this.events[eventKey][eventType].callbacks,
						a = callback.toString().replace(/ |\t|\r|\n/ig, "");
					for (var i=0;i<cbs.length;i++) {
						var b = cbs[i].toString().replace(/ |\t|\r|\n/ig, "");
						if (a == b) cbs.splice(i, 1);
					}
				}
			}
		}
		return this;
	}
	
	function methodOn(name, callback) {
		if (this.instance) {
			if ((name && 'string' == typeof name) && (callback && 'function' == typeof callback)) {
				var rx = new RegExp('^(([a-z]){3,}([A-Z]{1}[a-z]+){0,1})(Begin|End)$'),
					eventKey = name, eventType = 'end';
				if (rx.test(name)) {	//	trigger only begin or end event
					eventKey = name.match(rx)[1];	//	extract keyName
					eventType = name.match(rx)[4].toLowerCase();	//	extract keyType
				}
				if (this.events[eventKey]) {
					var cbs = this.events[eventKey][eventType].callbacks,
						a = callback.toString().replace(/ |\t|\r|\n/ig, "");
					if (cbs.indexOf(a) == -1) this.events[eventKey][eventType].callbacks.push(callback);
				}
				this.info(this.events[eventKey]?true:false, [this.events[eventKey], this.events[eventKey][eventType], this.events[eventKey][eventType].callbacks])
			}
		}
		return this;
	}
	
	function methodRealType(toLower) {
		var r = typeof this;
		try {
			if (window.hasOwnProperty('jQuery') && this.constructor && this.constructor == jQuery) r = 'jQuery';
			else r = this.constructor && this.constructor.name ? this.constructor.name : Object.prototype.toString.call(this).slice(8, -1);
		}
		catch(e) { if (this['toString']) r = this.toString().slice(8, -1); }
		return !toLower ? r : r.toLowerCase();
	}
	
	function methodRemoveItem() {
		var args = localStorageHelper.prototype.arrangeArgs.apply(this, arguments);
		if (args.length) for (var i=0;i<args.length;i++) localStorage.removeItem(args[i]);
		return this;
	}
	
	function methodSetItem() {
		var args = Array.prototype.slice.call(arguments, 0), ret = null;
		
		//	create items object to maintain control of passed params for use in storing
		var items = {};
		
		if (args.length > 1) {
			for (var i=0;i<args.length;i++) {
				var ai = args[i],
					t = localStorageHelper.prototype.realType.call(ai);
				console.log([i && localStorageHelper.prototype.realType.call(args[i-1]) == 'String'], t == 'jQuery', typeof ai == 'object')
				if (i && localStorageHelper.prototype.realType.call(args[i-1]) == 'String') {
					items[args[i-1]] = { type: t, value: ai };
				}
				else if (t == 'jQuery') {
					if (window['jQuery'] && ai['selector']) {
						var eles = [];
						for (var x in ai) {
							if (ai[x] && ai[x]['outerHTML'] && typeof ai[x]['outerHTML'] == 'string') eles.push(ai[x].outerHTML.replace(/>(\n|\r|\t)*</g, '><'));
						}
						if (eles.length) items[ai.selector] = { type: t, value: eles };
					}
				}
				else if (typeof ai == 'object') {
					for (var x in ai) {
						if (x && typeof x == 'string') {
							t = localStorageHelper.prototype.realType.call(ai[x]);
							items[x] = { type: t, value: ai[x] };
						}
					}
				}
			}
		}
		else if (localStorageHelper.prototype.realType.call(args[0]) == 'jQuery') {
			var ai = args[0],
				t = localStorageHelper.prototype.realType.call(ai);
			if (window['jQuery'] && ai['selector']) {
				var eles = [];
				for (var x in ai) {
					if (ai[x] && ai[x]['outerHTML'] && typeof ai[x]['outerHTML'] == 'string') eles.push(ai[x].outerHTML.replace(/>(\n|\r|\t)*</g, '><'));
				}
				if (eles.length) items[ai.selector] = { type: t, value: eles };
			}
		}
		//	items ready! let's do this!
		if (items) for (var x in items) localStorage.setItem(this.prefix+x, JSON.stringify(items[x]));
		return this;
	}
	
	function methodTrigger(name) {
		if (this.instance) {
			if (name && typeof name == 'string') {
				var args = Array.prototype.slice.call(arguments, 1),
					rx = new RegExp('^(([a-z]){3,}([A-Z]{1}[a-z]+){0,1})(Begin|End)$'),
					eventKey = name, eventType = 'end';
				if (rx.test(name)) {	//	trigger only begin or end event
					eventKey = name.match(rx)[1];	//	extract keyName
					eventType = name.match(rx)[4].toLowerCase();	//	extract keyType
					//if (this.events[eventKey]) return this.events[eventKey][eventType].apply(this, Array.prototype.slice.call(arguments, 1));
				}
				this.warn("Triggering Event:\t[" + name + "]\tArguments:\t", args);
				if (this.events[eventKey]) return this.events[eventKey][eventType].apply(this, args);
			}
		}
		return null;
	}
	
	/*------------------------------------------------------------------------*/
	
	Object.defineProperty(localStorageHelper, 'available', { enumerable: true, value: lsAvailable, writeable: false })
	
	Object.defineProperties(localStorageHelper.prototype, {
		'available': { enumerable: true, get: function() { return localStorageHelper.available; }, writeable: false }
		, 'arrangeArgs': { value: methodArrangeArgs }
		, 'callbacks': { value: {} }
		, 'events': { value: {} }
		, 'fire': { value: methodFire }
		, 'keys': { get: function() { return Object.keys(localStorage); } }
		, 'length': { get: function() { return this.available ? localStorage.length : null; } }
		, 'methods': { value: {	//	any method added to this list will be assigned events and a callbacks list for events
			'clear': methodClear
			, 'getItem': methodGetItem
			, 'key': methodKey
			, 'keyExists': methodKeyExists
			, 'removeItem': methodRemoveItem
			, 'setItem': methodSetItem
		} }
		, 'off': { value: methodOff }
		, 'on': { value: methodOn }
		, 'prefix': { value: '__lsh__' }
		, 'realType': { value: methodRealType }
		, 'trigger': { value: methodTrigger }
	});
	
	if (!window.hasOwnProperty('localStorageHelper')) window.localStorageHelper = localStorageHelper;
})();

/***	*M*E*T*H*O*D*S*		***/

/**	delay(ms)
 *	
 **/
;(function() {	//	delay(ms)
	function delay(secs, ASms) { if (ASms!==true) secs *= 1000; var st = Date.now(); while (Date.now() - st < secs){}; }
	window.hasOwnProperty("delay")||(window.delay=delay);
})();

/**	winFocus([MIXED])
 *	This helps to create a cross-browser way of creating callback methods
 *	on the window focus and blur events, without being affected by leaving
 *	view of the browser. In other words, you can rest assure that someone
 *	using blur event via this message will still be able to use Calculator
 *	without throwing blur event while looking ata something on the site,
 *	but will cast blur callback if another tab is opened into view.
 *
 *	@example
 *		winFocus(true, function(event) {  })
 *		//	true = will run callback as soon as set
 *		//	function = callback method
 *		//	event = window event with event.hidden normalized to bool of page visibility state
 *		winFocus(true, function(visibile) {  })
 **/
;(function() {	//	winFocus()
	var callBacks = { blur: [], focus: [], blurFocus: [] },
		hidden = "hidden";
	
	function winFocus() {
		var args = Array.prototype.slice.call(arguments, 0),
			init = true, initMethods = [], methods = []
		
		for (var x in args) {
			switch (typeof args[x]) {
				case 'boolean':
					init: args[x];
					break;
				case 'function':
					methods.push(args[x]);
					break;
				case 'object':
					if (args[x].hasOwnProperty('init')) init = args[x]["init"];
					if (args[x]["blur"]) {
						callBacks.blur.push(args[x]["blur"]);
						if (init) initMethods.push(args[x]["blur"]);
					}
					if (args[x]["focus"]) {
						callBacks.focus.push(args[x]["focus"]);
						if (init) initMethods.push(args[x]["focus"]);
					}
					if (args[x]["blurFocus"]) {
						callBacks.blurFocus.push(args[x]["blurFocus"]);
						if (init) initMethods.push(args[x]["blurFocus"]);
					}
					break;
			}
		}
		
		if (methods && methods.length) {
			if (init) initMethods = initMethods.concat(methods);
			
			switch (methods.length) {
				case 1:
					callBacks.blurFocus.push(methods[0]);
					break;
				case 2:
					callBacks.blur.push(methods[0]);
					callBacks.focus.push(methods[1]);
					break;
				default:
					for (var x in methods) {
						switch (x%3) {
							case 0:
								callBacks.blur.push(methods[x]);
								break;
							case 1:
								callBacks.focus.push(methods[x]);
								break;
							case 2:
								callBacks.blurFocus.push(methods[x]);
								break;
						}
					}
			}
		}
		
		if (init && initMethods.length) for (var x in initMethods) initMethods[x].apply(window, [{ hidden: document[hidden] }]);
	}
	
	function onChange(e) {
		var eMap = { focus: false, focusin: false, pageshow: false, blur: true, focusout: true, pagehide: true };
		e = e || window.event;
		
		if (e) {
			e.hidden = e.type in eMap ? eMap[e.type] : document[hidden];
			window.visible = !e.hidden;
			exeCB(e);
		}
		else {
			try { onChange.call(document, new Event('visibilitychange')); }
			catch(err) {  }
		}
	}
	
	function exeCB(e) {
		if (e.hidden && callBacks.blur.length) for (var x in callBacks.blur) callBacks.blur[x].apply(window, [e]);
		if (!e.hidden && callBacks.focus.length) for (var x in callBacks.focus) callBacks.focus[x].apply(window, [e]);
		if (callBacks.blurFocus.length) for (var x in callBacks.blurFocus) callBacks.blurFocus[x].apply(window, [e, !e.hidden]);
	}
	
	function initWinFocus() {
		//if (console && console['log']) console.log('Initializing winFocus()');
		//	Standard initialization
		if (hidden in document)	//	IE10 | FF20+
			document.addEventListener("visibilitychange", onChange);
		else if ((hidden = "mozHidden") in document)	//	Older FF Versions (?)
			document.addEventListener("mozvisibilitychange", onChange);
		else if ((hidden = "webkitHidden") in document)	//	Chrome
			document.addEventListener("webkitvisibilitychange", onChange);
		else if ((hidden = "msHidden") in document)	//	IE 4-6
			document.addEventListener("msvisibilitychange", onChange);
		else if ((hidden = "onfocusin") in document)	//	IE7-9
			document.onfocusin = document.onfocusout = onChange;
		else	//	All others:
			window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onChange;
		if (console && console['log']) console.log('winFocus() Initialized on document.' + hidden);
	}
	
	winFocus.clear = function(what) {
		if (what && callBacks[what]) callBacks[what] = [];
		else if (void 0 == what || what == 'all') for (var x in callBacks) callBacks[x] = [];
		return callBacks;
	}
	
	winFocus.getCallBacks = function(what) {
		if (what && callBacks[what]) return callBacks[what];
		return callBacks;
	}
	
	winFocus.off = function(what, index) {
		if (what && callBacks[what]) {
			if (void 0 != index) delete callBacks[what][index];
			else callBacks[what] = [];
		}
		else for (var x in callBacks) callBacks[x] = [];
		return this;
	}
	
	winFocus.on = function(what, func) {
		if (func && what && callBacks[what]) callBacks[what].push(func);
		return this;
	}
	
	if (document.readyState == "complete") initWinFocus();
	else window.onload = initWinFocus;
	
	//	add as window variable
	window.hasOwnProperty("winFocus")||(window.winFocus=winFocus);
	
	
	//	add as a jQuery extension
	try {
		if (window.hasOwnProperty('jQuery') && jQuery) {
			jQuery.winFocus || (jQuery.extend({
				winFocus: function() {
					var args = Array.prototype.slice.call(arguments, 0);
					
					if (args[0] && /^clear/i.test(args[0])) return winFocus.clear.apply(jQuery);
					if (args[0] && /^callbacks$/i.test(args[0])) {
						args = Array.prototype.slice.call(arguments, 1);
						return winFocus.getCallBacks.apply(window, args);
					}
					
					return winFocus.apply(window, args);
				}
			}))
		}
	}
	catch (err) {}
})();

/*	winOpen()	*/
;(function() {	//	 alternate way to call for new window as well as maintain a list (use to winOpen.getList())
	var defaultSpecs = {	// predefined specs filter
			channelmode: 	'channelmode=no',	//	yes|no|1|0	Whether or not to display the window in theater mode. Default is no. IE only
			directories: 	'directories=yes',	//	yes|no|1|0	Whether or not to add directory buttons. Default is yes. IE only
			fullscreen: 	'fullscreen=no',	//	yes|no|1|0	Whether or not to display the browser in full-screen mode. Default is no. A window in full-screen mode must also be in theater mode. IE only
			height: 		'height=100',	//	pixels	The height of the window. Min. value is 100
			left: 			'left=0',	//	pixels	The left position of the window
			location: 		'location=yes',	//	yes|no|1|0	Whether or not to display the address field. Default is yes
			menubar: 		'menubar=yes',	//	yes|no|1|0	Whether or not to display the menu bar. Default is yes
			resizable: 		'resizable=yes',	//	yes|no|1|0	Whether or not the window is resizable. Default is yes
			scrollbars: 	'scrollbars=yes',	//	yes|no|1|0	Whether or not to display scroll bars. Default is yes
			status: 		'status=yes',	//	yes|no|1|0	Whether or not to add a status bar. Default is yes
			titlebar: 		'titlebar=yes',	//	yes|no|1|0	Whether or not to display the title bar. Ignored unless the calling application is an HTML Application or a trusted dialog box. Default is yes
			toolbar: 		'toolbar=yes',	//	yes|no|1|0	Whether or not to display the browser toolbar. Default is yes
			top: 			'top=0',	//	pixels	The top position of the window. IE only
			width: 			'width=100'	//	pixels	The width of the window. Min. value is 100
		},
		list = [];
	
	function clone(a) { if (null == a || "object" != typeof a) return a; var c = a.constructor(), b; for (b in a) a.hasOwnProperty(b) && (c[b] = a[b]); return c; };
	
	function joinObj() {
		var obj = [], str = "", ret = [],
			args = Array.prototype.slice.call(arguments, 0);
		for (var x in args) switch (typeof args[x]) {
			case 'object':
				obj[x] = args[x];
				break;
			case 'string':
				str = args[x];
				break;
		}
		for (var y in obj) {
			var ob = obj[y]
			for (var z in obj[y]) if (obj[y].hasOwnProperty(z)) switch (typeof obj[y][z]) {
				case "string":
					ret.push(obj[y][z]);
					break;
				case "object":
					var a = joinObj(obj[y][z], str);
					if (a) ret.push(a);
					break;
				default:
					if (obj[y][z]['valueOf']) ret.push(obj[y][z].valueOf());
			}
		}
		return ret ? ret.join(str) : "";
	}
	
	function matchUrl(url) {
		var	regMatch = void 0,
			araLabels = "url scheme authority path query fragment".split(" "),
			regUrl = /^(([^\:\/\?\#]+)\:)?(\/\/([^\/\?\#]*))?([^\?\#]*)(\?([^\#]*))?(\#(.*))?/,
			retVal = {
				url: null,
				scheme: null, authority: null,
				path: null, query: null,
				fragment: null, valid: null
			};
		"string" === typeof url && "" != url && (regMatch = url.match(regUrl));
		if ("object" === typeof regMatch) for (x in regMatch) araLabels[x] && (retVal[araLabels[x]] = regMatch[x]);
		retVal.scheme && retVal.authority && (retVal.valid = !0);
		return retVal
	};
	
	function winOpen() {
		var args = Array.prototype.slice.call(arguments, 0),
			url, name, specs = {}, replace = void 0;
		
		//	first check if obj.includeDefaults was passed to include defaults (if true)
		for (var x in args) if (typeof args[x] == 'object' && args[x]['includeDefaults']) specs = clone(defaultSpecs);
		
		for (var x in args) {	//	get url and name if provided
			if (!url || !name) {	// window name could be passed as 2nd string or in object
				if (args[x] && typeof args[x] == 'string') {
					if (!url && matchUrl(args[x])['valid']) url = args[x];
					if ((!name && !matchUrl(args[x])['valid']) || url && args[x] != url) name = args[x];
				}
				else if (typeof args[x] == 'object') {
					var ax = args[x];
					if (!url && ax.hasOwnProperty('url') && matchUrl(ax['url'])['valid'])  url = ax['url'];
					if (!name && ax.hasOwnProperty('name') && ax['name']) name = ax['name'];
					for (var y in ax) if (/boolean|number|string/.test(typeof ax[y]) && defaultSpecs[y]) specs[y] = y + '=' + (typeof ax[y] == 'boolean' ? (ax[y]==true?'yes':'no') : ax[y]);
					
				}// finally check replace param
				else if (typeof args[x] == 'boolean' && void 0 == replace) replace = args[x];
			}
			else break;
		}
		
		specs = joinObj(specs, ",");
		
		var newWin, newWinArgs = [];
		
		if (url) newWinArgs.push(url);
		if (name) newWinArgs.push(name);
		if (typeof specs == 'string' && specs) newWinArgs.push(specs);
		if (replace) newWinArgs.push(replace);
		
		newWin = window.open.apply(window, newWinArgs);
		newWin.winOpen = {
			index: list.length,
			url: url,
			name: name,
			specs: specs,
			replace: replace
		}
		list.push(newWin);
		
		newWin.onbeforeunload = function() { list.splice(this.winOpen.index, 1); }
		
		return newWin;
	}
	
	winOpen.getList = function(index) {
		if (typeof index == 'number' && list[index]) return list[index];
		return list;
	}
	
	//	add as global variable
	window.hasOwnProperty("winOpen")||(window.winOpen=winOpen);
	
	//	add as a jQuery extension
	if (window.hasOwnProperty('jQuery') && jQuery && !jQuery['winOpen']) {
		jQuery.extend({
			winOpen: function() {
				var args = Array.prototype.slice.call(arguments, 0);
				return winOpen.apply(this, args);
			}
		});
		jQuery.winOpenList = function(index) {
			if (typeof index == 'number' && list[index]) return list[index];
			return list;
		}
	}
})();

/***	***	jQuery Extensions|Methods|Plugins	***	***/

if (window.hasOwnProperty('jQuery')) {
	(function($) {	//	$(ele).outerHTML();
		$.extend({
			outerHTML: function() {
				var $ele = arguments[0],
					args = Array.prototype.slice.call(arguments, 1)
				if ($ele && !($ele instanceof jQuery) && (typeof $ele == 'string' || $ele instanceof HTMLCollection || $ele instanceof Array)) $ele = $($ele);
				if ($ele && $ele.length) {
					if ($ele.length == 1) return $ele[0].outerHTML;
					else return $.map($("div"), function(ele,i) { return ele.outerHTML; });
				}
				throw new Error("Invalid Selector");
			}
		})
		$.fn.extend({
			outerHTML: function() {
				var args = [this];
				if (arguments.length) for (x in arguments) args.push(arguments[x]);
				return $.outerHTML.apply($, args);
			}
		});
	})(jQuery);
	
	(function($) {	//	$.date([num|str|date, [addYears, addMonths, addWeeks, addDays, addHours, addMinutes, addSeconds, getDayName, getMonthName, getWeek, stdTimezoneOffset, dst, format]])
		$.extend({
			date: function() {
				var args = Array.prototype.slice.call(arguments, 0);
				//	arg 0 is nothing
				if (!args.length) {
					return $.extend(true, new Date(), $.date.methods);
				}
				else if (args.length == 1) {
					if ( (typeof args[0] == 'number') || (typeof args[0] == 'string' && !isNaN(Date.parse(args[0]))) || (args[0] instanceof Date) ) return $.extend(true, new Date(args[0]), $.date.methods);
					if (typeof args[0] == 'string') {	//	arg 0 is string and may be direct call to method)
						var d = new Date();
						args.unshift(d);
						return $.date.apply(this, args);
					}
				}
				else if (args.length > 1) {
					
					// arg 0 is a numeric value (may be milliseconds or year[if is year, arg 1 must be month])
					if (typeof args[0] == 'number') {
						var d;
						if (typeof args[1] !== 'number') {	//	is milliseconds
							d = new Date(args[0]);
							args = Array.prototype.slice.call(arguments, 1);
						}
						else {
							var dv = [];	//	date values
							for (var i=0;i<args.length;i++) {
								if (typeof args[i] !== 'number') break;
								dv.push(args[i]);
							}
							d = new Date(dv);
							args = Array.prototype.slice.call(arguments, i);
						}
						args.unshift(d);
						return $.date.apply(this, args);
					}
					//	arg 0 is string (may be date value or call to method)
					if (typeof args[0] == 'string') {
						var d = new Date();
						if (!isNaN(Date.parse(args[0]))) {	//	arg 0 is date string
							d = new Date(args[0]);
							args = Array.prototype.slice.call(arguments, 1);
						}
						args.unshift(d);
						return $.date.apply(this, args);
					}
					// arg 0 is a date object
					if (args[0] instanceof Date) {
						var d = $.date(args[0]);
						if (typeof args[1] == 'string') {
							if (d[args[1]]) {	//	is method call
								var m = args[1];
								args = args.slice(2);
								return d[m].apply(d, args);
							}
							else if (/compound|constants|pretty/.test(args[1])) {
								
							}
							//console.log("\t\t\t", [d, 'format'].concat(args.slice(1)))
							return $.date.apply(this, [d, 'format'].concat(args.slice(1)));
						}
						
					}
				}
				throw new Error("Incorrect Parameters:\t" + JSON.stringify(args));
			}
		});
		$.date.methods = {
			'addYears': function(v) { this.setFullYear(this.getFullYear() + parseFloat(v)); return $.date(this); },
			'addMonths': function(v) { this.setMonth(this.getMonth() + parseFloat(v)); return $.date(this); },
			'addWeeks': function(v) { this.addDays(7 * parseFloat(v)); return $.date(this); },
			'addDays': function(v) { this.setDate(this.getDate() + parseFloat(v)); return $.date(this); },
			'addHours': function(v) { this.setHours(this.getHours() + parseFloat(v)); return $.date(this); },
			'addMinutes': function(v) { this.setMinutes(this.getMinutes() + parseFloat(v)); return $.date(this); },
			'addSeconds': function(v) { this.setSeconds(this.getSeconds() + parseFloat(v)); return $.date(this); },
			'getDayName': function(shortForm) {
				var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
				return shortForm ? days[this.getDay()].substr(0,3) : days[this.getDay()];
			},
			'getMonthName': function(shortForm) {
				var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
				return shortForm ? months[this.getMonth()].substr(0,3) : months[this.getMonth()];
			},
			'getWeek': function() {
				var a = new Date(this.getFullYear(), 0, 1);
				return Math.ceil(((this - a) / 864E5 + a.getDay() + 1) / 7);
			},
			'stdTimezoneOffset': function() {
				var a = new Date(this.getFullYear(), 0, 1),
					b = new Date(this.getFullYear(), 6, 1);
				return Math.max(a.getTimezoneOffset(), b.getTimezoneOffset());
			},
			'dst': function() {
				return this.getTimezoneOffset() < this.stdTimezoneOffset();
			}
		}
		$.date.formats = {
			/*	DAY	*/
			'd': function() { var a = this.getDate(); return a > 9 ? a : '0' + a; },
			'D': function() { return getDayName(this, true); },
			'j': function() { return this.getDate(); },
			'l': function() { return getDayName(this); },
			'N': function() { return this.getDay() + 1; },
			'S': function() { var a = this.getDate(); if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" },
			'w': function() { return this.getDay(); },
			'z': function() { return Math.round(Math.abs((this.getTime() - new Date('1/1/' + this.getFullYear()).getTime())/(8.64e7))); },
			/*	WEEK	*/
			'W': function() { return getWeek(this); },
			/*	MONTH	*/
			'F': function() { return getMonthName(this); },
			'm': function() { var a = this.getMonth() + 1; return a > 9 ? a : '0' + a; },
			'M': function() { return getMonthName(this, true); },
			'n': function() { return this.getMonth() + 1; },
			't': function() { return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate() },
			/*	YEAR	*/
			'L': function() { var a = this.getFullYear(); return 0 == a % 4 && 0 != a % 100 || 0 == a % 400; },
			'o': function() { return parseInt(this.getFullYear()); },	//	todo: base on week's parent year
			'Y': function() { return parseInt(this.getFullYear()); },
			'y': function() { return parseInt((this.getFullYear()+'').substr(-2)); },
			/*	TIME	*/
			'a': function() { return this.getHours() >= 12 ? "pm" : "am"; },
			'A': function() { return this.getHours() >= 12 ? "PM" : "AM"; },
			'B': function() { return "@"+("00"+Math.floor((((this.getHours()+1)%24*60+this.getMinutes())*60+this.getSeconds()+(this.getMilliseconds()*0.001))/86.4)).slice(-3); },
			'g': function() { var a = this.getHours(); return a == 0 ? 12 : a <= 12 ? a : a - 12; },	//	12-hour format of an hour without leading zeros
			'G': function() { return this.getHours(); },	//	24-hour format of an hour without leading zeros
			'h': function() { var a = this.getHours(); a = a <= 12 ? a : a - 12; return a == 0 ? 12 : a > 9 ? a : '0' + a; },	//		12-hour format of an hour with leading zeros
			'H': function() { var a = this.getHours(); return a > 9 ? a : '0' + a; },	//		24-hour format of an hour with leading zeros
			'i': function() { var a = this.getMinutes(); return a > 9 ? a : '0' + a; },	//	Minutes with leading zeros
			's': function() { var a = this.getSeconds(); return a > 9 ? a : '0' + a; },	//	Seconds, with leading zeros
			'u': function() { return this.getMilliseconds(); },	//	this is NOT microseconds ... it's JS :P,
			/*	TIMEZONE	*/
			'e': function() { var a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/); return a.length > 1 ? a[1] : ''; },
			'I': function() {
				var a = new Date(this.getFullYear(), 0, 1),
					b = new Date(this.getFullYear(), 6, 1),
					c = Math.max(a.getTimezoneOffset(), b.getTimezoneOffset());
				return this.getTimezoneOffset() < c ? 1 : 0;
			},
			'O': function() { var a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/); return a.length > 2 ? a[2] : ''; },
			'P': function() { var a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/); return a.length > 2 ? a[2].substr(0,3) + ':' + a[2].substr(3,2) : ''; },
			'T': function() { return this.toLocaleString('en', {timeZoneName:'short'}).split(' ').pop(); },	//	may not be reliable on Apple Systems	//	NOTE: Apple Sux
			'Z': function() { return this.getTimezoneOffset() * 60; },
			/*	FULL DATE/TIME	*/
			'c': function() { return addHours(new Date(this), -(this.getTimezoneOffset() / 60)).toISOString(); },
			'r': function() { return addHours(new Date(this), -(this.getTimezoneOffset() / 60)).toISOString(); },
			'U': function() { return this.getTime() / 1000 | 0; }
		};
		$.date.compound = {
			'commonLogFormat': 'd/M/Y:G:i:s',
			'exif': 'Y:m:d G:i:s',
			'isoYearWeek': 'Y\\WW',
			'isoYearWeek2': 'Y-\\WW',
			'isoYearWeekDay': 'Y\\WWj',
			'isoYearWeekDay2': 'Y-\\WW-j',
			'mySQL': 'Y-m-d h:i:s',
			'postgreSQL': 'Y.z',
			'postgreSQL2': 'Yz',
			'soap': 'Y-m-d\\TH:i:s.u',
			'soap2': 'Y-m-d\\TH:i:s.uP',
			'unixTimestamp': '@U',
			'xmlrpc': 'Ymd\\TG:i:s',
			'xmlrpcCompact': 'Ymd\\tGis',
			'wddx': 'Y-n-j\\TG:i:s'
		};
		$.date.constants = {
			'AMERICAN': 'F j, Y',
			'AMERICANSHORT': 'm/d/Y',
			'AMERICANSHORTWTIME': 'm/d/Y h:i:sA',
			'ATOM': 'Y-m-d\\TH:i:sP',
			'COOKIE': 'l, d-M-Y H:i:s T',
			'EUROPEAN': 'j F Y',
			'EUROPEANSHORT': 'd.m.Y',
			'EUROPEANSHORTWTIME': 'd.m.Y H:i:s',
			'ISO8601': 'Y-m-d\\TH:i:sO',
			'LEGAL': 'j F Y',
			'RFC822': 'D, d M y H:i:s O',
			'RFC850': 'l, d-M-y H:i:s T',
			'RFC1036': 'D, d M y H:i:s O',
			'RFC1123': 'D, d M Y H:i:s O',
			'RFC2822': 'D, d M Y H:i:s O',
			'RFC3339': 'Y-m-d\\TH:i:sP',
			'RSS': 'D, d M Y H:i:s O',
			'W3C': 'Y-m-d\\TH:i:sP'
		};
		$.date.pretty = {
			'pretty-a': 'g:i.sA l jS \\o\\f F, Y',
			'pretty-b': 'g:iA l jS \\o\\f F, Y',
			'pretty-c': 'n/d/Y g:iA',
			'pretty-d': 'n/d/Y',
			'pretty-e': 'F jS - g:ia',
			'pretty-f': 'g:iA',
			'pretty-g': 'F jS, Y',
			'pretty-h': 'F jS, Y g:mA'
		};
		$.date.methods.format = function(str, utc) {
			if (str) {
				if (str == 'compound') {
					if (utc === false) return this.format.compound;
					var r = {};
					for (var x in $.date.compound) r[x] = this.format($.date.compound[x]);
					return r;
				}
				else if ($.date.compound[str]) return this.format($.date.compound[str], utc);
				if (str == 'constants') {
					if (utc === false) return this.format.constants;
					var r = {};
					for (var x in $.date.constants) r[x] = this.format($.date.constants[x]);
					return r;
				}
				else if ($.date.constants[str]) return this.format($.date.constants[str], utc);
				if (str == 'pretty') {
					if (utc === false) return this.format.pretty;
					var r = {};
					for (var x in $.date.pretty) r[x] = this.format($.date.pretty[x]);
					return r;
				}
				else if ($.date.pretty[str]) return this.format($.date.pretty[str], utc);
				var ret = str.split(''), lc = '';
				for (var x in ret) {
					var c = ret[x];
					if ((c && /[a-z]/i.test(c)) && !(/\\/.test(lc + c))) {
						var rx = new RegExp(c, 'g');
						ret[x] = $.date.formats[c] ? $.date.formats[c].apply(this) : c;
					}
					lc = ret[x];
				}
				return ret.join('').replace(/\\/g, '');
			}
			return str;
		}
	})(jQuery);
	
	(function($) {	//	$.jQRSS()
		$.extend({  
			jQRSS: function(rss, options, func) {
				if (arguments.length <= 0) return false;
				
				var str, obj, fun;
				for (i=0;i<arguments.length;i++) {
					switch(typeof arguments[i]) {
						case "string":
							str = arguments[i];
							break;
						case "object":
							obj = arguments[i];
							break;
						case "function":
							fun = arguments[i];
							break;
					}
				}
				
				if (str == null || str == "") {
					if (!obj['rss']) return false;
					if (obj.rss == null || obj.rss == "") return false;
				}
				
				var o = $.extend(true, {}, $.jQRSS.defaults);
				
				if (typeof obj == "object") {
					if ($.jQRSS.methods.getObjLength(obj) > 0) {
						o = $.extend(true, o, obj);
					}
				}
				
				if (str != "" && !o.rss) o.rss = str;
				o.rss = escape(o.rss);
				
				var gURL = $.jQRSS.props.gURL 
					+ $.jQRSS.props.type 
					+ "?v=" + $.jQRSS.props.ver
					+ "&q=" + o.rss
					+ "&callback=" + $.jQRSS.props.callback;
				
				var ajaxData = {
						num: o.count,
						output: o.output
					};
				
				if (o.historical) ajaxData.scoring = $.jQRSS.props.scoring;
				if (o.userip != null) ajaxData.scoring = o.userip;
				
				$.ajax({
					url: gURL,
					beforeSend: function (jqXHR, settings) { 
						try {
							console.log(new Array(30).join('-'), "REQUESTING RSS XML", new Array(30).join('-')); 
							console.log({ ajaxData: ajaxData, ajaxRequest: settings.url, jqXHR: jqXHR, settings: settings, options: o }); 
							console.log(new Array(80).join('-')); 
						} catch(err) {  }
					},
					dataType: o.output != "xml" ? "json" : "xml",
					data: ajaxData,
					type: "GET",
					xhrFields: { withCredentials: true },
					error: function (jqXHR, textStatus, errorThrown) { return new Array("ERROR", { jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown } ); },
					success: function (data, textStatus, jqXHR) {  
						var f = data['responseData'] ? data.responseData['feed'] ? data.responseData.feed : null : null,
							e = data['responseData'] ? data.responseData['feed'] ? data.responseData.feed['entries'] ? data.responseData.feed.entries : null : null : null
						try {
							console.log(new Array(30).join('-'), "SUCCESS", new Array(30).join('-'));
							console.log({ data: data, textStatus: textStatus, jqXHR: jqXHR, feed: f, entries: e });
							console.log(new Array(68).join('-'));
						} catch(err) {  }
						
						if (fun) {
							return fun.call(this, data['responseData'] ? data.responseData['feed'] ? data.responseData.feed : data.responseData : null);
						}
						else {
							return { data: data, textStatus: textStatus, jqXHR: jqXHR, feed: f, entries: e };
						}
					}
				});
			}
		});
		$.jQRSS.props = {
			callback: "?",
			gURL: "http://ajax.googleapis.com/ajax/services/feed/",
			scoring: "h",
			type: "load",
			ver: "1.0"
		};
		$.jQRSS.methods = {
			getObjLength: function(obj) {
				if (typeof obj != "object") return -1;
				var objLength = 0;
				$.each(obj, function(k, v) { objLength++; })
				return objLength;
			}
		};
		$.jQRSS.defaults = {
			count: "10", // max 100, -1 defaults 100
			historical: false,
			output: "json", // json, json_xml, xml
			rss: null,
			userip: null
		};
	})(jQuery);
	
	/*	Require jQuery UI	*/
	if (jQuery.hasOwnProperty('ui')) {
		//	make jQuery modals close on clicking background
		jQuery(document).on('click', '.ui-widget-overlay', function(e) { jQuery('.ui-dialog-content:visible').dialog('close'); });
		
		/**	$.ui.stylizeInputs
		 *	If `$.stylizeInputs.init` is not set to `false` before loading plugin, then style script will be autoloaded to head tag upon load.
		 *	Otherwise, style tag will not be added to head tag to first call to method `stylizeInputs`.
		 *	Example setting global options before init:	`$.stylizeInputs = { init: false }`
		 *	*/
		(function($) {	//	$.ui.stylizeInputs	//	$(ele).stylizeInputs();	//	Global Options @ $.stylizeInputs
			var opts = {  }
			
			function _create() {
				if (!$.stylizeInputs.initialized) initStylizeInputs();
				$('input:not([type=checkbox]):not([type=radio]), textarea').addClass('ui-state-default ui-widget-input-text');
			}
			
			function initStylizeInputs() {
				if ($.stylizeInputs.styles && !$('style').filter(function(i) { return /\.ui-widget-input/.test($(this).text()); }).length) {
					var s = $('<style />', { type: 'text/css' }),
						ls = $('head link, head style').last();
					if (ls.length) s.insertAfter(ls);
					else $('head').append(s);
					$.each($.stylizeInputs.styles, function(k, v) {
						if (typeof k == 'string') {
							if (typeof v == 'string') s.append("\n\t\t\t" + k + " " + v);
							else if (typeof v == 'object') {
								s.append("\n\t\t\t" + k + " {");
								$.each(v, function(prop, val) { s.append("\n\t\t\t\t" + prop + ": " + val + ";"); });
								s.append("\n\t\t\t}");
							}
						}
					});
					s.append("\n\t\t");
				}
				$.stylizeInputs.initialized = true;
			}
			
			$.widget('ui.stylizeInputs', { options: opts, _create: _create });
			/*------------------------------------------*/
			/*------------INIT HEAD STYLE---------------*/
			/*------------------------------------------*/
			var styles = {
					'.ui-widget-input-text': {
						'border-radius': '.8em',
						'-webkit-border-radius': '.8em',
						'font-family': 'inherit',
						'font-size': '1em',
						'line-height': '1.1em',
						'margin': '.1em auto',
						'outline': '0',
						'padding': '.2em .4em .15em',
						'text-align': 'left',
						'text-shadow': '0 1px 0 #f3f3f3',
						'-webkit-appearance': 'none',
						'-webkit-box-shadow': 'inset 0 1px 3px rgba(0,0,0,.2)',
						'-moz-box-shadow': 'inset 0 1px 3px rgba(0,0,0,.2)',
						'box-shadow': 'inset 0 1px 3px rgba(0,0,0,.2)',
						'-webkit-box-sizing': 'border-box',
						'-moz-box-sizing': 'border-box',
						'box-sizing': 'border-box',
						'-webkit-background-clip': 'padding',
						'background-clip': 'padding-box'
					},
					'.ui-state-default.ui-widget-input-text': '{ font-weight: inherit; }',
					'.ui-widget-input-text:focus': '{ -webkit-box-shadow: 0 0 12px #38c; -moz-box-shadow: 0 0 12px #38c; box-shadow: 0 0 12px #38c; }'
				}
			
			if (!$.hasOwnProperty('stylizeInputs')) $.stylizeInputs = { init: true, initialized: false, styles: styles };
			else {
				if (!$.stylizeInputs.hasOwnProperty('init')) $.stylizeInputs.init = true;
				if (!$.stylizeInputs.hasOwnProperty('styles')) $.stylizeInputs.styles = styles;
				else $.stylizeInputs.styles = $.extend(true, {}, styles, $.stylizeInputs.styles);
				$.stylizeInputs.initialized = false;
			}
			
			if ($.stylizeInputs.init) initStylizeInputs();
		})(jQuery);
	}
}

