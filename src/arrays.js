import { objectIs } from './util';

export default function shallowEqualArrays(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (objectIs(arrA[i], arrB[i]) === false) {
      return false;
    }
  }

  return true;
}
