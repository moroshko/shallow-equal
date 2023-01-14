import shallowEqualArrays, { validArrayValue } from "./arrays";
import shallowEqualObjects, { validObjectValue } from "./objects";

type Comparable<T> = Record<string, T> | T[] | null | undefined;

function shallowEqual<T extends Comparable<T>>(a: T, b: T): boolean {
  if (Array.isArray(a) || Array.isArray(b)) {
    return shallowEqualArrays(a as validArrayValue<T>, b as validArrayValue<T>);
  }

  return shallowEqualObjects(
    a as validObjectValue<T>,
    b as validObjectValue<T>
  );
}

export { shallowEqual, shallowEqualObjects, shallowEqualArrays };
