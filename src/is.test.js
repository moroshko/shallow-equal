var expect = require('chai').expect;
var is = require('./is');

var val1 = 'string';
var val2 = 0;

var tests = [
  {
    should: 'return true when values are ===',
    objA: val1,
    objB: val1,
    result: true
  },
  {
    should: 'return false when values are !==',
    objA: val1,
    objB: val2,
    result: false
  }
];

if (typeof Element !== 'undefined') {
  var el1 = document.createElement('div');
  var el2 = document.createElement('div');
  el2.isSameNode = function (el) { return el === el1 };
  var el3 = document.createElement('div');

  tests = tests.concat([
    {
      should: 'return true when elements are same node',
      objA: el1,
      objB: el2,
      result: true
    },
    {
      should: 'return false when elements are not same node',
      objA: el1,
      objB: el3,
      result: false
    }
  ])
}


describe('is', function() {
  tests.forEach(function(test) {
    it('should ' + test.should, function() {
      expect(is(test.objA, test.objB)).to.equal(test.result);
    });
  });
});
