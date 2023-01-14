import shallowEqualArrays, { validArrayValue } from "./arrays";
import shallowEqualObjects, { validObjectValue } from "./objects";

type Comparable<T> = Record<string, T> | T[] | null | undefined;

export type Comparator = (a: any, b: any) => boolean;
export function eq<T>(a: T, b: T): boolean {
  return a === b;
}

function shallowEqual<T extends Comparable<T>>(
  a: T,
  b: T,
  comparator: Comparator = eq
): boolean {
  if (Array.isArray(a) || Array.isArray(b)) {
    return shallowEqualArrays(
      a as validArrayValue<T>,
      b as validArrayValue<T>,
      comparator
    );
  }

  return shallowEqualObjects(
    a as validObjectValue<T>,
    b as validObjectValue<T>,
    comparator
  );
}

export { shallowEqual, shallowEqualObjects, shallowEqualArrays };
