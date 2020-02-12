export function objectIs(a, b) {
  if (a === 0 && b === 0) {
    return 1 / a === 1 / b;
  }
  if (a === b) {
    return true;
  }
  if (a !== a && b !== b) {
    return true;
  }
  return false;
}
