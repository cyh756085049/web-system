Function.prototype.myBind = function (context, ...params) {
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

for (var i = 1; i <= 5; i++) {
    setTimeout(function test(i) {
        console.log('bind:', i);
    }.myBind(null, i), i * 1000);
}

for (var i = 1; i <= 5; i++) {
    (function (i){
        setTimeout(function test() {
            console.log('闭包:', i);
        }, i * 1000)
    }(i));
}