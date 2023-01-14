import { validArrayValue } from "../arrays";
import { shallowEqual, shallowEqualArrays } from "../index";
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
