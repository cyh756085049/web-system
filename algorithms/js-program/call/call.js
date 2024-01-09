Function.prototype.myCall = function (context) {
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

const obj = {
    name: 'ramona',
    age: 18,
};

function handle(content) {
    console.log(`${content}, ${this.name}的年龄是${this.age}`);
}

handle('你好');
handle.myCall(obj, '你好');

