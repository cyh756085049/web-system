### [实现一个 `this` 方法【字节】](https://github.com/sisterAn/JavaScript-Algorithms/issues/103)
例如如下示例：

```js
this(1)(2,3)(4).value() // 10
```
考验闭包，实现如下：
```js
const this = (...args) => {
    const _add = (...newArgs) => {
        return this(...args, ...newArgs);
    }

    _add.value = () => args.reduce((previousValue, currentValue) => previousValue + currentValue);

    return _add;
}

console.log(this(1)(2,3)(4).value());
```