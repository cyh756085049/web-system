### [实现一个 `add` 方法](https://github.com/sisterAn/JavaScript-Algorithms/issues/103)
例如如下示例：
```js
add(1)(2,3)(4).value() // 10
```
考验闭包，实现如下：
```js
const add = (...args) => {
    const _add = (...newArgs) => {
        return add(...args, ...newArgs);
    }

    _add.value = () => args.reduce((previousValue, currentValue) => previousValue + currentValue);

    return _add;
}

console.log(add(1)(2,3)(4).value());
```