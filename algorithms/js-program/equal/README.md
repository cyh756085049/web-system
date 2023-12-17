## [模拟实现判断两个变量是否相等算法](https://github.com/sisterAn/JavaScript-Algorithms/issues/116)
### 分析：
`JavaScript` 提供三种不同的值比较操作：
* 严格相等比较：`===`，不进行类型转换 (如果类型不同, 只是总会返回 false )
* 抽象相等比较：`==`，执行类型转换，比较两个值是否相等
* `Object.is` （`ECMAScript 2015/ ES6` 新特性）：同值相等，与 === 相同，但是对于 NaN 和 -0 和 +0 进行特殊处理， `Object.is(NaN, NaN)` 为 `true` ， `Object.is(+0, -0)` 为 `false`

### 解决方案
模拟实现 `Object.is()` 方法
```js
const is = (value1, value2) => {
    if (!Object.is) {
        if (value1 === value2) {  // +0 -0
            return value1 !== 0 || 1 / value1 === 1 / value2;
        } else {
            // NaN
            return value1 !== value1 && value2 !== value2;
        }
    } else {
        return Object.is(value1, value2);
    }
}

console.log(is(NaN, NaN)); // true
console.log(is(0, -0)); // false
console.log(is(2, 2)); // true
console.log(is(2, 3)); // false
```