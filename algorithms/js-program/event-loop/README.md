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