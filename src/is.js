const hasElement = typeof Element !== 'undefined'

module.exports = function is(a, b) {
  /* istanbul ignore next */
  if (hasElement && a instanceof Element && b instanceof Element) {
    return a.isSameNode(b);
  }

  return a === b;
}
