/*global require describe it beforeEach */
require('should');
var BigInt = require('../js/BigInt');

describe('BigInt defaults', function() {
	var num = null;
	var result = null;

	it ('should default to a value of 0', function() {
		num = new BigInt();

		result = num.toString();
		result.should.equal('0');
	});

	it ('should take an int', function() {
		num = new BigInt(700);

		result = num.toString();
		result.should.equal('700');
	});

	it ('should take a BigInt', function() {
		num = new BigInt(700);
		num = new BigInt(num);

		result = num.toString();
		result.should.equal('700');
	});
});

describe('BigInt basic Math', function() {
	var num = null;
	var result = null;


	describe('normal INTs', function() {
		beforeEach(function() {
			num = new BigInt(746)
			result = null;
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

		it ('should add without carry', function() {
			num.add(3);

			result = num.toString();
			result.should.equal('749');
		});

		it ('should add with carry', function() {
			num.add(100);

			result = num.toString();
			result.should.equal('846');
		});

		it ('should subtractOne', function() {
			num.subtractOne();

			result = num.toString();
			result.should.equal('745');
		});

		it ('should roll backwars', function() {
			num.subtractOne(); // 745
			num.subtractOne(); // 744
			num.subtractOne(); // 743
			num.subtractOne(); // 742
			num.subtractOne(); // 741
			num.subtractOne(); // 740
			num.subtractOne(); // 739

			result = num.toString();
			result.should.equal('739');
		});

		it ('should handle 10 - 1', function() {
			num = new BigInt(10);
			num.subtractOne();

			result = num.toString();
			result.should.equal('9');
		});

		it ('should handle 30 - 1', function() {
			num = new BigInt(30);
			num.subtractOne();

			result = num.toString();
			result.should.equal('29');
		});

		it ('should subtract without carry', function() {
			num.subtract(3);

			result = num.toString();
			result.should.equal('743');
		});

		it ('should subtract with carry', function() {
			num.subtract(100);

			result = num.toString();
			result.should.equal('646');
		});

	});

	describe('Big INTs', function() {
		beforeEach(function() {
			num = new BigInt(9007199254740992);
		});

		it ('should addOne', function() {
			num.addOne();

			result = num.toString();
			result.should.equal('9007199254740993');
		});

		it ('should add', function() {
			num.add( new BigInt(100) );

			result = num.toString();
			result.should.equal('9007199254741092');
		});

		it ('should subtractOne', function() {
			num.subtractOne();

			result = num.toString();
			result.should.equal('9007199254740991');
		});

		it ('should subtract', function() {
			num.subtract( new BigInt(100) );

			result = num.toString();
			result.should.equal('9007199254740892');
		});
	});
});