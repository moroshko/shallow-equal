## Description

If you know you have two arrays or two objects in hand, and you want to know if they are shallowly equal or not, this library is for you.

## Features

- Super light
- No dependencies
- Thoroughly tested

## Installation

```shell
npm install shallow-equal --save
```
or
```shell
yarn add shallow-equal
```

## Usage

```js
import { shallowEqualArrays } from "shallow-equal";

shallowEqualArrays([1, 2, 3], [1, 2, 3]); // => true
shallowEqualArrays([{ a: 5 }], [{ a: 5 }]); // => false
```

```js
import { shallowEqualObjects } from "shallow-equal";

shallowEqualObjects({ a: 5, b: "abc" }, { a: 5, b: "abc" }); // => true
shallowEqualObjects({ a: 5, b: {} }, { a: 5, b: {} }); // => false
```

You can also use the generic form, `shallowEqual`. But note that it does runtime type checking in order to decide whether it's comparing arrays or objects, so the convenience comes with a runtime penalty.
```js
import { shallowEqual } from "shallow-equal";

shallowEqual([1, 2, 3], [1, 2, 3]); // => true
shallowEqual({ a: 5, b: {} }, { a: 5, b: {} }); // => false
```
