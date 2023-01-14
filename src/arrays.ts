import { Comparator, eq } from "./index";

export type validArrayValue<T> = T[] | null | undefined;

export default function shallowEqualArrays<T>(
  arrA: validArrayValue<T>,
  arrB: validArrayValue<T>,
  comparator: Comparator = eq
): boolean {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  const len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    if (!comparator(arrA[i], arrB[i])) {
      return false;
    }
  }

  return true;
}
