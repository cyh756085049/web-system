### 修改 `print` 函数，使之输出 0 到 99，或者 99 到 0

示例代码如下：
```js
const print = (n) => {
    setTimeout(() => {
        console.log(n);
    }, Math.floor(Math.random()) * 1000);
}

const resPrint = () => {
    for (let i = 0; i < 100; i++) {
        print(i);
    }
}

resPrint();
```

要求： 
* 只能修改 setTimeout 到 Math.floor(Math.random() * 1000 的代码 
* 不能修改 Math.floor(Math.random() * 1000 
* 不能使用全局变量

#### 修改如下
* 利用 `setTimeout` 、 `setInterval` 的第三个参数,第三个以后的参数是作为第一个 `func()` 的参数传进去
```js
const print = (n) => {
    setTimeout(() => {
        console.log('测试', n);
    }, 1, Math.floor(Math.random()) * 1000);
}
```
* 修改 setTimeout 第一个函数
```js
const print3 = (n) => {
    setTimeout((() => {
        console.log('测试', n);
    }), Math.floor(Math.random()) * 1000);
}
```