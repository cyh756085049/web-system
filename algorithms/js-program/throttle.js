/**
 * 节流函数
 * 限制目标函数调用的频率
 * @param fn
 * @param time
 */
function throttle(fn, time) {
    // 上一次执行fn的时间
    let previous = 0;
    // 将throttle处理结果当做函数返回
    return function(...args) {
        // 获取当前时间，转换成时间戳，单位毫秒
        let now = +new Date();
        // 将当前时间和上一次执行函数的时间进行对比，大于time就把previous设置为当前时间并执行fn函数
        if (now - previous > time) {
            previous = now;
            fn.apply(this, args);
        }
    }
}

const betterFn = throttle(() => console.log('fn 节流函数执行了'), 1000);
setInterval(betterFn, 10);