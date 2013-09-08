(function() {
'use strict';

// Convert a Number to an array with each element representing a digit.
// Example: 749 becomes [7, 4, 9]
function numberToArray(num) {
	return ('' + num).split(/(\d)/).filter(function(item) {
			return item !== '';
		}).map(function(item) {
			return parseInt(item, 10);
		});
}

// Adds 1 to the digit in this array at index
// index is optional. Default to the right-most value
// Example: [7, 4, 9] becomes [7, 5, 0]
function addOne(nums, index) {
	var lastNum;

	// if no index, assume the right-most value
	if (typeof index === 'undefined') {
		index = nums.length-1;
	}

	// If index is < 0, add room for a new digit.
	if (index < 0) {
		nums.unshift(0);
		index = 0;
	}

	lastNum = nums[index];

	if (lastNum < 9) {
		nums[index] += 1;
	}

	if (lastNum === 9) {
		nums[index] = 0;
		nums = addOne(nums, index-1);
	}

	return nums;
}

// Subtracts 1 from the digit in the array at index
// index is optional. Default to the right-most value
// Example: [7, 4, 0] becomes [7, 3, 9]
function subtractOne(nums, index) {
	var lastNum;

	// if no index, assume the right-most value
	if (typeof index === 'undefined') {
		index = nums.length-1;
	}

	lastNum = nums[index];

	// if the left-most digit is 1, then we can remove it
	if (index === 0 && lastNum === 1) {
		nums.shift();
		return nums;
	}

	if (lastNum > 0) {
		nums[index] -= 1;
	}

	if (lastNum === 0) {
		nums[index] = 9;
		nums = subtractOne(nums, index-1);
	}

	return nums;
}

// BigInt constructor
// num is starting int
function BigInt(num) {
	this.digits = [];
	this.isNegative = false;

	if (typeof num === 'undefined') {
		num = 0;
	}
	if (typeof num === 'string') {
		num = parseInt(num, 10);
	}

	this.digits = numberToArray(num);
}

BigInt.prototype.toString = function() {
	return this.digits.join('');
}

BigInt.prototype.addOne = function() {
	this.digits = addOne(this.digits);
	return this.toString();
}

BigInt.prototype.add = function(num) {
	var isBigInt = num instanceof BigInt
		;

	while(isBigInt ? num.toString() :  num) {
		this.digits = addOne(this.digits);

		isBigInt ? num.subtractOne(): num--;
	}

	return this.toString();
}

BigInt.prototype.subtractOne = function() {
	this.digits = subtractOne(this.digits);

	return this.toString();
}

BigInt.prototype.subtract = function(num) {
	var isBigInt = num instanceof BigInt
		;

	while(isBigInt ? num.toString() :  num) {
		this.digits = subtractOne(this.digits);

		isBigInt ? num.subtractOne(): num--;
	}

	return this.toString();
}


if (typeof window !== 'undefined') {
	window.BigInt = BigInt;
}
if (typeof module !== 'undefined') {
	module.exports = BigInt;
}
return BigInt;

})();