
### [手写数组去重、扁平化函数【携程、蘑菇街、哔哩哔哩、腾讯】](https://github.com/sisterAn/JavaScript-Algorithms/issues/30#top)

#### 数组扁平化(数组降维)

##### <1>  `flat` 方法

> MDN：`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

```js
const arr = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
// 不传参数时，默认扁平化一层
arr.flat(); // ['a', 'b', 'c', 'd', ['e', ['f']], 'g'];

// 传入一个整数参数，整数即扁平化的层数
arr.flat(2); // ['a', 'b', 'c', 'd', 'e', ['f'], 'g'];

// Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组【Infinity 属性用于存放表示正无穷大的数值】
arr.flat(Infinity); // ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

// 传入 <=0 的整数将返回原数组，不扁平化
arr.flat(0); // ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
arr.flat(-1); // ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]

// 如果原数组有空位，flat()方法会跳过空位
['a', 'b', 'c', 'd', , , ].flat(); // ['a', 'b', 'c', 'd']
```

**`Array.prototype.flat()` 特性总结：**

- 将嵌套的数组扁平化，变成一维的数组。**该方法返回一个新数组，对原数据没有影响。**
- 不传参数时，默认扁平化一层，可以传入一个整数，表示想要扁平化的层数。
- 传入 `<=0` 的整数将返回原数组，不扁平化。
- `Infinity` 关键字作为参数时，无论多少层嵌套，都会转为一维数组。
- 如果原数组有空位，`Array.prototype.flat()` 会跳过空位。

**实现 `flat` 方法**

```js
const flat = (arr, depth = 1) => {
    if (depth > 0) {
      return arr.reduce((previousValue, currentValue) => {
        if (Array.isArray(currentValue)) {
          return [...previousValue, ...flat(currentValue, depth - 1)];
        } else {
          return [...previousValue, currentValue];
        }
      })
    } else {
      return arr;
    }
  }
// 测试方法
const arr = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]];
console.log('实现的flat方法',
  '\n默认扁平化一层：', flat(arr), 
  '\n扁平化两层：', flat(arr, 2), 
  '\nInfinity 关键字作为参数:', flat(arr, Infinity), 
  '\n传入 <=0 的整数:', flat(arr, 0), flat(arr, -1), 
  '\n原数组有空位:', flat(['a', 'b', 'c', 'd', , , ]),
  );
```

##### <2> `reduce` 方法

一次扁平化所有数组

```js
const flattenDeepByReduce = (arr) => {
    if (Array.isArray(arr)) {
      return arr.reduce((previousValue, currentValue) => {
        return [...previousValue, ...flattenDeepByReduce(currentValue)];
      }, []);
    } else {
      return [arr];
    }
  }
const arr = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]];
 console.log('一次扁平化所有数据', flattenDeepByReduce(arr)); // ["a", "b", "c", "d", "e", "f", "g"]
```

##### <3> 栈方法

一次扁平化所有数组

```js
// 通过栈方法实现
  const flattenDeepByStack = (arr) => {
    const result = [];
    const stack = [...arr];
    // 栈不为空，循环遍历
    while (stack.length > 0) {
      // 出栈
      const val = stack.pop();
      // 如果当前出栈元素仍然是数组，则继续展开该层数组入栈
      if (Array.isArray(val)) {
        stack.push(...val);
      } else {
        // 否则，用头插法插入到结果数组中
        result.unshift(val);
      }
    }
    return result;
  }

  const arr = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]];
  console.log('通过栈实现一次扁平化所有数据:', flattenDeepByStack(arr));
```