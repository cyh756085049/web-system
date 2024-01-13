// 判断是否是类数组对象
function isArrayLike(object) {
    if (object                                      // object 不是 null、undefined等
        && typeof object === 'object'               // object 是对象
        && isFinite(object.length)                  // object.length 是有限数值
        && object.length >= 0                       // object.length 是非负数
        && object.length < Math.pow(2, 32)    // object.length < 2^32
    ) {
        return true;
    } else {
        return false;
    }
}

Function.prototype.myApply = function (context) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    if (context === null || context === undefined) {
        context = window;
    } else {
        // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
        context = Object(context);
    }

    // 用于临时储存函数
    const specialPrototype = Symbol();
    // 隐式绑定this指向到context上
    context[specialPrototype] = this;
    // 获取参数数组
    let args = arguments[1];
    let result;
    if (Array.isArray(args) && !isArrayLike(args)) {
        throw new TypeError('myApply 第二个参数不为数组并且不为类数组对象抛出错误');
    } else {
        // 转为数组
        args = Array.from(args);
        // 执行函数，传递参数
        result = context[specialPrototype](...args);
    }
    delete context[specialPrototype];
    return result;
}

const max = Math.max.myApply(Math, [1, 5, 2, 4, 3]);
const min = Math.min.myApply(Math, [4, 3, 2, 6, 8, 2]);
console.log('max', max, 'min', min);