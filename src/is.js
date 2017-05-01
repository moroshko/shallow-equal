const hasElement = typeof Element !== 'undefined'

module.exports = function is(a, b) {
  if (hasElement && a instanceof Element && b instanceof Element) {
    return a.isSameNode(b);
  } else {
    return a === b;
  }
}
