/*global require describe it beforeEach */
require('should');
var BigInt = require('../js/BigInt');

describe('BigInt basic Math', function() {
	var num = null;
	var result = null;

	beforeEach(function() {
		num = new BigInt(746)
		result = null;
	});

	it ('should initalize with a number', function() {
		result = num.toString();

		result.should.equal('746');
	});

	it ('should addOne under 9', function() {
		num.addOne();
		result = num.toString();

		result.should.equal('747');
	});

	it ('should addOne at 9', function() {
		num.addOne(); 	// 7
		num.addOne(); 	// 8
		num.addOne(); 	// 9
		num.addOne(); 	// 10

		result = num.toString();
		result.should.equal('750');
	});

	it ('should handle 9 + 1', function() {
		num = new BigInt(9);
		num.addOne();

		result = num.toString();
		result.should.equal('10');
	});
});