### [输出以下题目打印结果(从一道面试题谈谈对 EventLoop 的理解)](https://mp.weixin.qq.com/s/3WLuVR4NWnDUOsVQuTSYJw)
#### 题目
```js
setTimeout(() => console.log(0))
new Promise((resolve) => {
  console.log(1)
  resolve(2)
  console.log(3)
}).then(o => console.log(o))

new Promise(resolve => {
  console.log(4)
  resolve(5)
}).then(o => console.log(o)).then(() => console.log(6))
console.log(8)
Promise.resolve(7).then(res=>console.log(res))
```

#### 分析
题目主要考查 `js` 的 `eventLoop` 运行机制，考查对同步/异步，宏任务、微任务的了解。

`javascript` 是单线程同步语言，但是却能实现异步效果，是因为其通过事件循环 `eventLoop`，把代码运行中的任务分为了宏任务和微任务。
在执行下一次事件循环之前会先把当前的微任务队列执行清空，再把宏任务队列执行清空。
其中 `setTimeout` 产生的是宏任务，`promise` 产生的是微任务。

输出结果：
```js
1 3 4 8 2 5 7 6 0
```
1. setTimeout 放到宏任务队列
2. 立即执行new Promise 1 3，then放到微任务队列
3. 立即执行new Promise 4，then放到微任务队列
4. 立即执行 8
5. Promise.resolve(7).then 放到微任务队列 
5. 循环微任务队列依次输出 2 5 7 6 
6. 循环宏任务队列依次输出 0

### 事件循环代码输出【白龙马】

```js
const p = new Promise ((resolve) => {
  setTimeout(()=> {
  resolve('resolve3')
  console.log('timer')
  },0)
  resolve('resolvel')
  resolve ('resolve2')
  }).then (res => {
  console.log(res)
  setTimeout(() => {
    console.log(p);
  }, 0)
  }).finally(res => {
  console.log('finally', res);
  })

  console.log('p', p);

/**
 * 输出结果
 * resolvel
 * finally
 * timer
 * Promise { undefined }
 */
```
### 事件循环代码输出【猿编程】

```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async1()
new Promise((resolve) => {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')

输出：
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

执行以上代码的结果如下所示：

```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

**解释：**

1. **首先，代码从顶部开始执行：**
    - 打印 `script start`。

2. **setTimeout的回调函数被放入宏任务队列：**
    - `setTimeout(function () { console.log('setTimeout') }, 0)` 将回调函数推入宏任务队列。

3. **async1函数开始执行：**
    - 打印 `async1 start`。
    - 调用 `async2()` 函数，此时 `async2()` 函数被执行，打印 `async2`。
    - `await async2()` 表达式会让出当前的执行线程，等待 `async2()` 函数的 Promise 完成。

4. **new Promise开始执行：**
    - 打印 `promise1`。
    - `resolve()` 立即执行，但因为是同步操作，不会立即执行 `.then()` 中的回调函数，而是等待当前微任务队列中的所有任务完成。

5. **async1函数的await完成：**
    - `async2()` 函数执行完成，继续执行 `async1()` 函数中的后续代码，打印 `async1 end`。

6. **new Promise的then回调函数执行：**
    - 打印 `promise2`，这是因为前面的 `resolve()` 使得 `.then()` 中的回调函数成为微任务，在主线程空闲时执行。

7. **setTimeout回调函数执行：**
    - 打印 `setTimeout`，因为 `setTimeout` 的回调函数是一个宏任务，会在当前所有的微任务执行完成后执行。

8. **最后打印 `script end`。**

**总结：**

- JavaScript 运行时将任务分为宏任务（例如 setTimeout）和微任务（例如 Promise 的 then 回调和 async 函数中的 await）。
- 执行顺序遵循同步任务优先、微任务优先于宏任务的规则。
- 所以，虽然 `setTimeout` 的延时为 0，但它仍然会在所有当前微任务执行完毕后才执行，因此它的执行顺序是在 `promise2` 之后，而在 `async1 end` 之后。
