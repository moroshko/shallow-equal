import shallowEqualArrays from "./arrays";
import shallowEqualObjects from "./objects";

type Comparable = Record<string, any> | any[] | null | undefined;

function shallowEqual<T extends Comparable>(a: T, b: T): boolean {
  const aIsArr = Array.isArray(a);
  const bIsArr = Array.isArray(b);

  if (aIsArr !== bIsArr) {
    return false;
  }

  if (aIsArr) {
    return shallowEqualArrays(a as any[], b as any[]);
  }

  return shallowEqualObjects(a, b);
}

export { shallowEqual, shallowEqualObjects, shallowEqualArrays };
