import { dequal } from "dequal";
import { validArrayValue } from "../arrays";
import { eq, shallowEqual, shallowEqualArrays } from "../index";
import shallowEqualObjects, { validObjectValue } from "../objects";

const arr = [1, 2, 3];
const arrObj1 = { game: "chess" };
const arrObj2 = { company: "facebook" };
const arrObj3 = { technology: "react" };

const arrTests: {
  should: string;
  arrA: validArrayValue<any>;
  arrB: validArrayValue<any>;
  result: boolean;
}[] = [
  {
    should: "return false when A is falsy",
    arrA: null,
    arrB: [],
    result: false,
  },
  {
    should: "return false when B is falsy",
    arrA: [],
    arrB: undefined,
    result: false,
  },
  {
    should: "return true when arrays are ===",
    arrA: arr,
    arrB: arr,
    result: true,
  },
  {
    should: "return true when both arrays are empty",
    arrA: [],
    arrB: [],
    result: true,
  },
  {
    should: "return false when arrays do not have the same amount of elements",
    arrA: [1, 2, 3],
    arrB: [1, 2],
    result: false,
  },
  {
    should:
      "return false if there are corresponding elements which are not ===",
    arrA: [arrObj1, arrObj2, arrObj3],
    arrB: [arrObj1, arrObj2, { technology: "react" }],
    result: false,
  },
  {
    should: "return true if all corresponding elements are ===",
    arrA: [arrObj1, arrObj2, arrObj3],
    arrB: [arrObj1, arrObj2, arrObj3],
    result: true,
  },
];

const obj1 = { game: "chess", year: "1979" };
const obj2 = { language: "elm" };

const objTests: {
  should: string;
  objA: validObjectValue<any>;
  objB: validObjectValue<any>;
  result: boolean;
}[] = [
  {
    should: "return false when A is falsy",
    objA: null,
    objB: {},
    result: false,
  },
  {
    should: "return false when B is falsy",
    objA: {},
    objB: undefined,
    result: false,
  },
  {
    should: "return true when objects are ===",
    objA: obj1,
    objB: obj1,
    result: true,
  },
  {
    should: "return true when both objects are empty",
    objA: {},
    objB: {},
    result: true,
  },
  {
    should: "return false when objects do not have the same amount of keys",
    objA: { game: "chess", year: "1979", country: "Australia" },
    objB: { game: "chess", year: "1979" },
    result: false,
  },
  {
    should: "return false when there corresponding values which are not ===",
    objA: { first: obj1, second: obj2 },
    objB: { first: obj1, second: { language: "elm" } },
    result: false,
  },
  {
    should: "return true when all values are ===",
    objA: { first: obj1, second: obj2 },
    objB: { second: obj2, first: obj1 },
    result: true,
  },
  {
    should: "return false when objectA contains undefined",
    objA: { first: undefined },
    objB: { second: "green" },
    result: false,
  },
];

describe("shallow-equal", () => {
  describe("shallowEqual on arrays", () => {
    arrTests.forEach((test) => {
      it("should " + test.should, () => {
        expect(shallowEqual(test.arrA, test.arrB)).toEqual(test.result);
      });
    });
  });

  describe("shallowEqual on objects", () => {
    objTests.forEach((test) => {
      it("should " + test.should, () => {
        expect(shallowEqual(test.objA, test.objB)).toEqual(test.result);
      });
    });
  });

  describe("shallowEqualObjects", () => {
    objTests.forEach((test) => {
      it("should " + test.should, () => {
        expect(shallowEqualObjects(test.objA, test.objB)).toEqual(test.result);
      });
    });
  });

  describe("shallowEqualArrays", () => {
    arrTests.forEach((test) => {
      it("should " + test.should, () => {
        expect(shallowEqualArrays(test.arrA, test.arrB)).toEqual(test.result);
      });
    });
  });

  describe("custom comparators", () => {
    it("should use a custom comparator", () => {
      const comparator = jest.fn((a: any, b: any) => a === b);
      const arrA = [1, 2, 3];
      const arrB = [1, 2, 3];

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore: this'll go away when #33 lands
      expect(shallowEqual(arrA, arrB, comparator)).toEqual(true);
      expect(comparator).toHaveBeenCalledTimes(3);

      const badComparator = jest.fn((a: any, b: any) => a !== b);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore: this'll go away when #33 lands
      expect(shallowEqual(arrA, arrB, badComparator)).toEqual(false);
    });
  });

  it("should use deep-equal equivalents correctly on objects", () => {
    const objA = { first: obj1, second: obj2 };
    const objB = { second: { language: "elm" }, first: obj1 };
    const objC = { second: { hi: "there", what: { depth: 3 } }, first: obj1 };
    const objD = { second: { hi: "there", what: { depth: 3 } }, first: obj1 };

    expect(eq(objA, objB)).toEqual(false);
    expect(dequal(objA, objB)).toEqual(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore: this'll go away when #33 lands
    expect(shallowEqual(objA, objB, dequal)).toEqual(true);
    expect(shallowEqualObjects(objA, objB, dequal)).toEqual(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore: this'll go away when #33 lands
    expect(shallowEqualObjects(objA, objC, dequal)).toEqual(false);
    expect(shallowEqualObjects(objC, objD)).toEqual(false);
    expect(shallowEqualObjects(objC, objD, dequal)).toEqual(true);
  });

  it("should use deep-equal equivalents correctly on arrays", () => {
    const arrA = [{ first: obj1, second: obj2 }];
    const arrB = [{ second: { language: "elm" }, first: obj1 }];
    const arrC = [
      arrA,
      { second: { hi: "there", what: { depth: 3 } }, first: obj1 },
    ];
    const arrD = [
      arrB,
      { second: { hi: "there", what: { depth: 3 } }, first: obj1 },
    ];

    expect(eq(arrA, arrB)).toEqual(false);
    expect(dequal(arrA, arrB)).toEqual(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore: this'll go away when #33 lands
    expect(shallowEqual(arrA, arrB, dequal)).toEqual(true);
    expect(shallowEqualArrays(arrA, arrB, dequal)).toEqual(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore: this'll go away when #33 lands
    expect(shallowEqualArrays(arrA, arrC, dequal)).toEqual(false);
    expect(shallowEqualArrays(arrC, arrD)).toEqual(false);
    expect(shallowEqualArrays(arrC, arrD, dequal)).toEqual(true);
  });
});
