### [实现 `createFlow 异步串行函数`](https://github.com/sisterAn/JavaScript-Algorithms/issues/106)

#### 题目：

```js
const delay = (ms) => (
    new Promise((resolve) => setTimeout(resolve, ms))
);

const subFlow = createFlow([() =>
    delay(1000).then(() => console.log('c'))]
);

createFlow([
    () => console.log('a'),
    () => console.log('b'),
    subFlow,
    [() => delay(1000).then(() =>
        console.log('d')), () => console.log('e')],
]).run(() => {
    console.log('done');
});
```

按照上面的测试用例，实现 `createFlow` ：
* `createFlow` 是指一系列 `effects` 组成的逻辑片段。
* `createFlow` 支持嵌套。
* `effects` 的执行只需要支持串行。
* 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

#### 解决方案：

1、`createFlow` 以一个数组作为参数，数组参数包括普通函数、异步函数、嵌套 `createFlow`、数组，需要先将数组参数扁平化

2、`createFlow` 并不是直接执行，而是 `.run()` 之后才会开始执行

3、参数中有异步函数，所以要使用 `async/await` 执行

4、使用 `isFlow` 来判断当前函数是否是嵌套执行

```js
const createFlow = (effects = []) => {
    const queue = [...effects.flat()];

    const run = async (cb) => {
        for (let task of queue) {
            if (task.isFlow) {
                await task.run();
            } else {
                await task();
            }
        }

        if (cb) cb();
    }

    return {
        run,
        isFlow: true,
    }
}
```
