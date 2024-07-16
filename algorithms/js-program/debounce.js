/**
 * 防抖函数
 * 多次触发，只在最后一次触发时，执行目标函数
 * @param fn
 * @param time
 * @returns {function(): void}
 */
function debounce(fn, time) {
    // 初次触发定时器为null，后面产生一份定时器并记下定时器id
    let timer = null;
    // 闭包使定时器id逃逸
    return () => {
        // 如果已有定时器id, 则需要清除，重新开始延迟执行
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, time);
    }
}

const demo = debounce(() => console.log('fn 防抖函数执行了'), 200);
setInterval(demo, 100);