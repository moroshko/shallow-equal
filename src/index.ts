import shallowEqualArrays, { validArrayValue } from "./arrays";
import shallowEqualObjects, { validObjectValue } from "./objects";

type Comparable = Record<string, any> | any[] | null | undefined;

function shallowEqual<T extends Comparable>(a: T, b: T): boolean {
  // Deliberately OR, not AND, because of implementation details. Object compare
  // uses Object.keys on both things, which for mixed empty arrays/objects gives
  // the same array of keys (`[]`). So we use shallowEqualArrays to compare in
  // cases where _either_ object is an array. There's a test case for this.
  if (Array.isArray(a) || Array.isArray(b)) {
    return shallowEqualArrays(a as validArrayValue, b as validArrayValue);
  }

  return shallowEqualObjects(a as validObjectValue, b as validObjectValue);
}

export { shallowEqual, shallowEqualObjects, shallowEqualArrays };
