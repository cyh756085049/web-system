### 考查箭头函数的this指向【老虎国际】

```js
const name = 'jack';

var obj = {
    name: 'join',
    sayHello: function() {
        setTimeout(() => {
            console.log('this', this);
            console.log(`hello, ${this.name}`);
        }, 1000);
    }
}

obj.sayHello(); // hello, join
```
在这段代码中，`obj` 对象的 `sayHello` 方法使用了箭头函数，箭头函数没有自己的 `this` 绑定，它会继承外层作用域（即 `obj` 对象）的 `this`。因此，`setTimeout` 内部的箭头函数中的 `this` 将指向 `obj` 对象。

由于箭头函数继承了 `obj` 对象的 `this`，所以 `this.name` 将指向 `obj` 对象中的 `name` 属性，即 `'join'`。因此，`console.log` 语句输出的内容是 `"Hello, join"`。

所以，以上代码片段将在 1 秒后输出 `"Hello, join"`。