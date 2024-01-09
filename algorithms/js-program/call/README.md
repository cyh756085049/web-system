### 实现 `call` 方法
#### 总结：
> **`call、apply、bind` 是挂在 `Function` 对象上的三个方法,只有函数才有这些方法。这些方法的作用就是改变函数执行时的this指向。**

#### `call、apply、bind` 语法
```js
fun.call(thisArg, param1, param2, ...)
fun.apply(thisArg, [param1,param2,...])
fun.bind(thisArg, param1, param2, ...)
```
参数：
* thisArg(可选):
  * fun的this指向thisArg对象
  * 非严格模式下：thisArg指定为null，undefined，fun中的this指向window对象.
  * 严格模式下：fun的this为undefined
  * 值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象，如 String、Number、Boolean
  
* param1,param2(可选): 传给fun的参数。
  * 如果param不传或为 null/undefined，则表示不需要传入任何参数. 
  * apply第二个参数为数组，数组内的值为传给fun的参数。

#### `call、apply、bind` 区别：
##### call与apply的唯一区别
传给fun的参数写法不同：
* apply第2个参数是一个数组：传给fun参数都写在数组中。
* call从第2~n的参数都是传给fun的。

call/apply与bind的区别

执行：

* call/apply改变了函数的this上下文后马上执行该函数
* bind则是返回改变了上下文后的函数,不执行该函数

返回值:

* call/apply 返回fun的执行结果
* bind返回fun的拷贝，并指定了fun的this指向，保存了fun的参数。

#### `call` 实现

##### 实现思路
* 根据 `call` 的规则设置上下文对象,也就是 `this` 的指向。
* 通过设置 `context` 的属性,将函数的 this 指向隐式绑定到 `context` 上。
* 通过隐式绑定执行函数并传递参数。
* 删除临时属性，返回函数执行结果。

##### 实现代码
```js
Function.prototype.call = function (context) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中就是 window 对象)
    if (context === null || context === undefined) {
        context = window;
    } else {
        // 值为原始值(数字，字符串，布尔值)的 this 会指向该原始值的自动包装对象(用 Object() 转换）
        context = Object(context);
    }
    // 用于临时存储函数
    const specialPrototype = Symbol('特殊属性Symbol');
    // 函数的 this 指向隐式绑定到 context 上
    context[specialPrototype] = this;
    // 传递的参数
    const args = [...arguments].slice(1);
    // 通过隐式绑定执行函数并传递参数
    let result = context[specialPrototype](...args);
    // 删除上下文对象的属性
    delete context[specialPrototype];
    // 返回函数执行结果
    return result;
}
```