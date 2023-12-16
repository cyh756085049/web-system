### `promise`、`setTimeout`、`forEach` 共用情况分析
#### 题目1：

给定以下代码示例，输出代码运行结果
```js
const list = [1, 2, 3, 4];
const square = num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000);
    })
}

const test = () => {
    list.forEach(async num => {
        const res = await square(num);
        console.log(res);
    })
}

test();
```
**输出结果：**

**1s 后同时打印1、4、9、16 （虽然 `square` 函数会按顺序完成计算，但它们的输出可能不会按顺序出现在控制台上。输出的顺序可能是随机的）**

**原因：**

使用 `promise` 或 `async` 函数作为 `forEach` 方法的 `callback` 参数并不会等待异步的执行，因为在 `forEach` 里面写的 `callback` 函数会直接在 `while` 循环里面调用。

>  ChatGPT 解答： 
> * JavaScript 中的 forEach 方法是同步的，它会遍历数组中的每个元素并对其执行给定的回调函数。然而，在 forEach 中使用的 async/await 只能在 Promise 中产生作用，而 forEach 本身并不等待异步操作完成。
> * 当 forEach 执行时，它会按顺序遍历数组并调用传入的函数。但是，当遇到一个异步操作（使用 await 关键字的函数）时，它不会等待这个异步操作完成再继续进行，而是立即执行下一次循环。这意味着，在遇到异步操作时，forEach 并不会阻塞或等待这个异步操作的完成，而是会继续进行下一次循环。
>* 因此，当在 forEach 中使用 async/await 时，虽然看起来代码似乎会按顺序执行，但实际上并不会等待每个异步操作完成后再进行下一个循环。这就导致了异步操作完成的顺序与它们被调用的顺序可能不一致。

`forEach` 源码如下：
```js
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;

    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}
```

#### 题目2：
如果希望上边代码每隔1s输出一个结果，应该如何改造？

解决方案：
* 一个简单的 `for` 循环
```js
const test = async () => {
    for (let i = 0; i < list.length; i++) {
        const res = await square(list[i]);
        console.log(res);
    }
}
```
* `for...of` 循环([`for...of` 和 `for...in`区别](https://ramona-chen.top/web-book/#/JavaScript/jsBase?id=for-of%e5%92%8cfor-in%e7%9a%84%e5%8c%ba%e5%88%ab))
```js
const test = async () => {
    for (let num of list) {
        const res = await square(num);
        console.log(res);
    }
}
```
> 原因：
> * for...of 循环与 async/await 一起使用时会等待每个异步操作完成，是因为 for...of 循环在每次迭代时会等待 await 后的 Promise 解决。这种行为是 JavaScript 中事件循环机制的一部分。
> * 当你使用 await 关键字时，它会暂停当前函数的执行，等待 Promise 解决，并且只有在这个 Promise 解决后，才会继续往下执行函数中 await 之后的代码。在 for...of 循环中，每次循环都会等待 await 后的异步操作完成，然后再进入下一次循环。这保证了异步操作按顺序进行，因为每次循环都会等待前一个异步操作完成后才会进行下一个循环。
> * 所以，当 await 用于 for...of 循环时，循环会按顺序等待每个异步操作完成后再进行下一次循环。

* 利用 `promise` 的链式调用
```js
const test = () => {
    let promise = Promise.resolve();
    list.forEach(num => {
        promise = promise.then(() => square(num)).then(res => {
            console.log(res);
        })
    })
}
```
