import shallowEqualArrays from "./arrays";
import shallowEqualObjects from "./objects";

type Comparable = Record<string, any> | any[] | null | undefined;

function shallowEqual<T extends Comparable>(a: T, b: T): boolean {
  const aIsArr = Array.isArray(a);
  const bIsArr = Array.isArray(b);

  if (aIsArr !== bIsArr) {
    return false;
  }

  if (aIsArr && bIsArr) {
    return shallowEqualArrays(a, b);
  }

  return shallowEqualObjects(a, b);
}

export { shallowEqual, shallowEqualObjects, shallowEqualArrays };
