import shallowEqualArrays, { validArrayValue } from "./arrays";
import shallowEqualObjects, { validObjectValue } from "./objects";

type Comparable = Record<string, any> | any[] | null | undefined;

function shallowEqual<T extends Comparable>(a: T, b: T): boolean {
  if (Array.isArray(a) || Array.isArray(b)) {
    return shallowEqualArrays(a as validArrayValue, b as validArrayValue);
  }

  return shallowEqualObjects(a as validObjectValue, b as validObjectValue);
}

export { shallowEqual, shallowEqualObjects, shallowEqualArrays };
