(function() {
'use strict';

function numberToArray(num) {
	return ('' + num).split(/(\d)/).filter(function(item) {
			return item !== '';
		}).map(function(item) {
			return parseInt(item, 10);
		});
}

function BigInt(num) {
	this.vals = [];
	this.isNegative = false;

	if (typeof num === 'string') {
		num = parseInt(num, 10);
	}

	this.vals = numberToArray(num);
}

BigInt.prototype.toString = function() {
	return this.vals.join('');
}

BigInt.prototype.addOne = function() {
	var vals = this.vals
		, i = vals.length -1
		, lastNum = vals[i]
		;

	if (lastNum < 9) {
		vals[i] += 1;
	}

	this.vals = vals;
	return this.toString();
}


window.BigInt = BigInt;
return BigInt;

})();