### 根据代码理解闭包
```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000)
}
```
上述代码执行后，1s后输出5个5

如何修改上述代码，实现 1s后按数字顺序输出
```js
// 方式1：var -> let
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000)
}

// 输出：1s后输出0,1,2,3,4

// 方式2：闭包
for (var i = 0; i < 5; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index);
        }, 1000);
    })(i);
}
// 输出结果： 0,1,2,3,4 【1s后一起输出】


for (var i = 0; i < 5; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index);
        }, 1000 * index);
    })(i);
}
// 输出结果：0,1,2,3,4【每隔1s输出一次】
```