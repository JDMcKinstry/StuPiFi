/**	Array[extensions]()
 *	Array.unique()
 **/
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
;(function() {	//	Date.add[Years|Months|Weeks|Days|Hours|Minutes|Seconds]
	var methods = {
			'addYears': function(v) { this.setFullYear(this.getFullYear() + parseFloat(v)); return this; },
			'addMonths': function(v) { this.setMonth(this.getMonth() + parseFloat(v)); return this; },
			'addWeeks': function(v) { this.addDays(7 * parseFloat(v)); return this; },
			'addDays': function(v) { this.setDate(this.getDate() + parseFloat(v)); return this; },
			'addHours': function(v) { this.setHours(this.getHours() + parseFloat(v)); return this; },
			'addMinutes': function(v) { this.setMinutes(this.getMinutes() + parseFloat(v)); return this; },
			'addSeconds': function(v) { this.setSeconds(this.getSeconds() + parseFloat(v)); return this; },
		};
	for (var k in methods) {
		var v = methods[k];
		Object['defineProperty'] && !Date.prototype.hasOwnProperty(k)
			? Object.defineProperty(Date.prototype, k, { value: v }) : Date.prototype[k] = v;
	}
})();
;(function() {	//	Date.get[Day|Month]Name
	var methods = {
			'getDayName': function(shortForm) {
				var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday" ];
				return shortForm ? days[this.getDay()].substr(0,3) : days[this.getDay()];
			},
			'getMonthName': function(shortForm) {
				var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
				return shortForm ? months[this.getMonth()].substr(0,3) : months[this.getMonth()];
			}
		};
	for (var k in methods) {
		var v = methods[k];
		Object['defineProperty'] && !Date.prototype.hasOwnProperty(k)
			? Object.defineProperty(Date.prototype, k, { value: v }) : Date.prototype[k] = v;
	}
})();
;(function() {	//	Date.getWeek
	var methods = {
			'getWeek': function() {
				var a = new Date(this.getFullYear(), 0, 1);
				return Math.ceil(((this - a) / 864E5 + a.getDay() + 1) / 7)
			}
		};
	for (var k in methods) {
		var v = methods[k];
		Object['defineProperty'] && !Date.prototype.hasOwnProperty(k)
			? Object.defineProperty(Date.prototype, k, { value: v }) : Date.prototype[k] = v;
	}
})();
/*-mini-combo-*/
;(function() {	//	Date.add[Years|Months|Weeks|Days|Hours|Minutes|Seconds]
	var methods = {
			'addYears': function(v) { this.setFullYear(this.getFullYear() + parseFloat(v)); return this; },
			'addMonths': function(v) { this.setMonth(this.getMonth() + parseFloat(v)); return this; },
			'addWeeks': function(v) { this.addDays(7 * parseFloat(v)); return this; },
			'addDays': function(v) { this.setDate(this.getDate() + parseFloat(v)); return this; },
			'addHours': function(v) { this.setHours(this.getHours() + parseFloat(v)); return this; },
			'addMinutes': function(v) { this.setMinutes(this.getMinutes() + parseFloat(v)); return this; },
			'addSeconds': function(v) { this.setSeconds(this.getSeconds() + parseFloat(v)); return this; },
			'getDayName': function(shortForm) {
				var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday" ];
				return shortForm ? days[this.getDay()].substr(0,3) : days[this.getDay()];
			},
			'getMonthName': function(shortForm) {
				var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
				return shortForm ? months[this.getMonth()].substr(0,3) : months[this.getMonth()];
			},
			'getWeek': function() {
				var a = new Date(this.getFullYear(), 0, 1);
				return Math.ceil(((this - a) / 864E5 + a.getDay() + 1) / 7)
			}
		};
	for (var k in methods) {
		var v = methods[k];
		Object['defineProperty'] && !Date.prototype.hasOwnProperty(k)
			? Object.defineProperty(Date.prototype, k, { value: v }) : Date.prototype[k] = v;
	}
})();

/**	Element[extensions]()
 *	Element.defaultPX()
 *	Element.hasScroll()
 **/
;(function() {	//	Element.defaultPX	//	jQuery.defaultPX	//	
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
;(function() {
	/*	[ 'average', 'difference', 'max', 'mean', 'median', 'medianMinMax', 'min', 'minMax', 'maxMin', 'mode', 'product', 'quotient', 'range', 'sum' ]	*/
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
					var str = "Math." + exts[x] + "(" + args.toString() + "):";
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
	Object.defineProperty && !RegExp.__proto__.hasOwnProperty(name)
		? Object.defineProperty(RegExp.__proto__, name, { value: method }) : RegExp.__proto__[name] = method;
	/** Example Use:
	 *	var a  = ")(*",
	 *		r = new RegExp(RegExp.escape(a), 'g');
	 *	console.log({ 'string': a, 'regex': r, 'test': r.test(a), 'matach': a.match(r) });
	 **/
})();

/**	String[extensions]()
 *	String.matchUrl()
 *	String.reverse()
 *	String.similarTo()
 **/
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
	var name = 'matchUrl';
	function method() { return matchUrl(this.valueOf()); }
	Object['defineProperty'] && !String.prototype.hasOwnProperty(name)
		? Object.defineProperty(String.prototype, name, { value: method }) : String.prototype[name] = method;
	
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
	var name = "reverse";
	function reverse() { for (var a = "", g = this.length - 1; 0 <= g; g--) a += this[g]; return a; }
	Object['defineProperty'] && !String.prototype.hasOwnProperty(name)
		? Object.defineProperty(String.prototype, name, { value: reverse }) : String.prototype[name] = reverse;
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
	window['position'] || (window['position'] = function() {
		var position = function() {
				var a = 0 <= /MSIE|Trident/i.test(navigator.userAgent) ? { x: window.screenLeft, y: window.screenTop } : { x: window.screenX, y: window.screenY };
				void 0 == window.position && (window.position = {});
				void 0 == window.position.history && (window.position.history = []);
				if (void 0 == window.position.lastX || a.x != window.position.x) window.position.lastX = window.position.x;
				if (void 0 == window.position.lastY || a.y != window.position.y) window.position.lastY = window.position.y;
				window.position.x = a.x;
				window.position.y = a.y;
				window.position.history.push({ x: a.x, y: a.y, last: { x: window.position.lastX, y: window.position.lastY } });
				return a;
			},
			pos = position();
		position.originX = position.x = pos.x;
		position.originY = position.y = pos.y;
		position.history = [{ x: pos.x, y: pos.y, last: { x: pos.x, y: pos.y } }];
		return position;
	}());
})();

/***	*M*E*T*H*O*D*S*		***/

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
		var args = Array.prototype.slice.call(arguments, 0)
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

//	make jQuery modals close on clicking background
if (jQuery) jQuery(document).on('click', '.ui-widget-overlay', function(e) { jQuery('.ui-dialog-content:visible').dialog('close'); });
