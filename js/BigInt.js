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

// Adds 1 to the value in a number array at index
// index is optional. Default to the right-most value
// Example: [7, 4, 9] becomes [7, 5, 0]
function addOne(nums, index) {
	var lastNum;

	if (typeof index === 'undefined') {
		index = nums.length-1;
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
	this.vals = addOne(this.vals);
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