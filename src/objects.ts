import { Comparator, eq } from "./index";

export type validObjectValue<T> = Record<string, T> | null | undefined;

export default function shallowEqualObjects<T>(
  objA: validObjectValue<T>,
  objB: validObjectValue<T>,
  comparator: Comparator = eq
): boolean {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (const key of aKeys) {
    if (
      !comparator(objA[key], objB[key]) ||
      !Object.prototype.hasOwnProperty.call(objB, key)
    ) {
      return false;
    }
  }

  return true;
}
