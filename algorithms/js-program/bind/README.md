### 手写 `bind` 方法
> `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
— MDN

#### 实现思路
* 拷贝源函数:通过变量储存源函数，使用Object.create复制源函数的prototype给fToBind
* 返回拷贝的函数
* 调用拷贝的函数：
  * new调用判断：通过instanceof判断函数是否通过new调用，来决定绑定的context
  * 绑定this+传递参数
  * 返回源函数的执行结果

#### 实现代码
```js
const myBind = function (context, ...params) {
    // 存储源函数
    const self = this;
    // 返回拷贝的函数
    const bindFn = function (...secondPrams) {
        // 判断 this 是否是 bindFn 的实例
        const isNew = this instanceof bindFn;
        const resContext = isNew ? this : Object(context);
        return self.call(resContext, ...params, ...secondPrams);
    }

    // 如果函数没有prototype， 复制源函数的 prototype 给结果函数， 比如箭头函数
    if (self.prototype) {
        bindFn.prototype = Object.create(self.prototype);
    }

    // 返回拷贝的函数
    return bindFn;
}
```

#### 应用场景
##### 保存函数参数
看一道经典的面试题：
```js
for (var i = 1; i <= 5; i++) {
   setTimeout(function test() {
        console.log(i) // 依次输出：6 6 6 6 6
    }, i * 1000);
}
```
造成这个现象的原因是等到setTimeout异步执行时,i已经变成6了。

那么如何使他输出: 1,2,3,4,5呢？

* 方法1：使用 let 声明
```js
for (let i = 1; i <= 5; i++) {
   setTimeout(function test() {
        console.log(i) // 依次输出：6 6 6 6 6
    }, i * 1000);
}
```
let是块级作用域,所以每次都会创建一个新的变量,所以setTimeout每次读的值都是不同的
* `bind` 方法
```js
for (var i = 1; i <= 5; i++) {
   setTimeout(function test(i) {
        console.log('bind:', i) // 依次输出：1 2 3 4 5
    }.bind(null, i), i * 1000);
}
```
bind会返回一个函数，这个函数是个闭包，每次循环都会把i的最新值传进去，然后被闭包保存起来。
* 闭包
```js
for (var i = 1; i <= 5; i++) {
    (function (i) {
        setTimeout(function () {
            console.log('闭包:', i); // 依次输出：1 2 3 4 5
        }, i * 1000);
    }(i));
}
```