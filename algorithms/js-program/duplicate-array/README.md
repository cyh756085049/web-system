### 数组去重

* **产生新数组去重方式**

##### <1> `Set` 方法

```js
const uniqueBySet = (arr) => {
    const setArr = new Set(arr);
    // return [...setArr];
    return Array.from(setArr);
  }

const duplicateArray = [1, 2, 3, 3, 5, 4];
console.log('通过set实现数组去重：', uniqueBySet(duplicateArray)); // [1, 2, 3, 5, 4]
```

##### <2> `reduce`  方法

```js
const uniqueByReduce = (arr) => {
    // 先对数组进行排序
    arr.sort((a, b) => a - b);
    return arr.reduce((previous, current) => {
      if (previous.length === 0 || previous[previous.length - 1] !== current) {
        previous.push(current);
      }
      return previous;
    }, []);
  }

  const duplicateArray = [1, 2, 3, 3, 5, 4];
  console.log('通过reduce实现数组去重：', uniqueByReduce(duplicateArray));
```

##### <3> `filter` 方法

```js
const uniqueByFilter = (arr) => {
    return arr.filter((value, index, array) => {
      return array.indexOf(value) === index;
    })
  }
  const duplicateArray = [1, 2, 3, 3, 5, 4];
  console.log('通过filter方法实现数字去重:', uniqueByFilter(duplicateArray));
```

* **不产生新数组的去重方式**

##### <1> 排序去重

```js
const removeDuplicatesBySort = (arr) => {
    arr.sort();
    let index = 1;
    for (let j = 1; j < arr.length; j++) {
      if (arr[j] !== arr[j - 1]) {
        arr[index] = arr[j];
        index++;
      }
    }
    console.log('index', index, arr);
    // 把最后一个重复项删除
    arr.splice(index);
    return arr;
  }

const arr = [1,2,3,1,3];
console.log('不产生新数组的情况下，通过排序及遍历实现删除重复数字：', removeDuplicatesBySort(arr));
```

##### <2> `indexOf` 去重

```js
const removeDuplicatesByIndexOf = (arr) => {
    let len = arr.length - 1;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr.indexOf(arr[i]) !== i) {
        arr[i] = arr[len];
        len--;
      }
    }
    arr.splice(len + 1);
    return arr;
  }

  const arr = [1,2,3,1,3];
  console.log('不产生新数组的情况下，通过indexOf及遍历实现删除重复数字：', removeDuplicatesByIndexOf(arr));
```

* **[（包含对象等类型元素）数组去重函数【蘑菇街】](https://github.com/sisterAn/JavaScript-Algorithms/issues/136)**

题目：

1. 如传入的数组元素为 `[123, "meili", "123", "mogu", 123]` ，则输出： `[123, "meili", "123", "mogu"]`
2. 如传入的数组元素为 `[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]` ，则输出： `[123, [1, 2, 3], [1, "2", 3], "meili"]`
3. 如传入的数组元素为 `[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]` ，则输出： `[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]`

#### 使用 `JSON.Stringify` 去重

```js
const removeDuplicatesByJsonStringify = (arr) => {
    let map = new Map();
    arr.forEach(item => {
      map.set(JSON.stringify(item), item);
    });
    return [...map.values()];
  }

  console.log('通过JSON.stringify去重数组:', removeDuplicatesByJsonStringify([123, "meili", "123", "mogu", 123]));
  console.log('通过JSON.stringify去重数组:', removeDuplicatesByJsonStringify([123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]));
  console.log('通过JSON.stringify去重数组:', removeDuplicatesByJsonStringify([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]));
```

使用 `JSON.stringify` ，如果数组元素是 `object` 类型且里面键的顺序不同则会认为是两个不同放入数组元素：

```js
let o1 = {a:1, b:2}
let o2 = {b:2, a:1}
JSON.stringify(o1) // "{"a":1,"b":2}"
JSON.stringify(o2) // "{"b":2,"a":1}"
JSON.stringify(o1) === JSON.stringify(o2) // false
```

那么怎么解决呢，可以使用以下的解决方案思路：

#### 类型判断、遍历、比较、去重

一个数组（包含对象等类型元素）去重函数，需要在基础类型判断相等条件下满足以下条件：

- 如果元素是数组类型，则需要数组中的每一项相等
- 如果元素是对象类型，则需要对象中的每个键值对相等

去重本身就是遍历数组，然后比较数组中的每一项是否相等而已，所以关键步骤有两步：**比较、去重**

**比较：**

- 首先判断类型是否一致，类型不一致则返回认为两个数组元素是不同的，否则继续
- 如果是数组类型，则递归比较数组中的每个元素是否相等
- 如果是对象类型，则递归比较对象中的每个键值对是否相等
- 否则，直接 `===` 比较

**去重：**

- 采用 `reduce` 去重，初始 `accumulator` 为 `[]`
- 采用 `findIndex` 找到 `accumulator` 是否包含相同元素，如果不包含则加入，否则不加入
- 返回最终的 `accumulator` ，则为去重后的数组

```js
const getType = (obj) => {
    const classType = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regexp',
      '[object Object]': 'object',
      '[object Error]': 'error',
      '[object Symbol]': 'symbol',
    };

    if (obj === null) {
      return obj + '';
    }
    const type = Object.prototype.toString.call(obj);
    return classType[type];
  }

  const isEqual = (element1, element2) => {
    const type1 = getType(element1);
    const type2 = getType(element2);

    if (type1 !== type2) {
      return false;
    }

    if (type1 == 'array') {
      // 判断数组包含的元素个数是否相等
      if (element1.length !== element2.length) {
        return false;
      }
      // 比较两个数组中的每个元素
      return element1.every((item, index) => {
        return isEqual(item, element2[index]);
      })
    }

    if (type1 == 'object') {
      // 获取对象的键值
      const keys1 = Object.keys(element1);
      const keys2 = Object.keys(element2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      return keys1.every(item => {
        return isEqual(element1[item], element2[item]);
      })
    }

    return element1 === element2;
  }

  const removeDuplicates = (arr) => {
    return arr.reduce((accumulator, current) => {
      const hasIndex = accumulator.findIndex(item => isEqual(current, item));
      if (hasIndex === -1) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
  }

  const newArr = [123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili", {a:1, b:2}, {b:2, a:1}];
  console.log('含有对象类型的数组去重：', removeDuplicates(newArr)); // [123, {a: 1}, a: {b: 1}, {a: "1"}, "meili", {a: 1, b: 2}]
```