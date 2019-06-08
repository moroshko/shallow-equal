var expect = require('chai').expect;
var shallowEqual = require('./objects').shallowEqual;

var obj1 = { game: 'chess', year: '1979' };
var obj2 = { language: 'elm' };

var tests = [
  {
    should: 'return false when A is falsy',
    objA: null,
    objB: {},
    result: false
  },
  {
    should: 'return false when B is falsy',
    objA: {},
    objB: undefined,
    result: false
  },
  {
    should: 'return true when objects are ===',
    objA: obj1,
    objB: obj1,
    result: true
  },
  {
    should: 'return true when both objects are empty',
    objA: {},
    objB: {},
    result: true
  },
  {
    should: 'return false when objects do not have the same amount of keys',
    objA: { game: 'chess', year: '1979', country: 'Australia' },
    objB: { game: 'chess', year: '1979' },
    result: false
  },
  {
    should: 'return false when there corresponding values which are not ===',
    objA: { first: obj1, second: obj2 },
    objB: { first: obj1, second: { language: 'elm' } },
    result: false
  },
  {
    should: 'return true when all values are ===',
    objA: { first: obj1, second: obj2 },
    objB: { second: obj2, first: obj1 },
    result: true
  }
];

describe('shallowEqual', function() {
  tests.forEach(function(test) {
    it('should ' + test.should, function() {
      expect(shallowEqual(test.objA, test.objB)).to.equal(test.result);
    });
  });
});
