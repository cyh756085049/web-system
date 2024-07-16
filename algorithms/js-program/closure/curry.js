/**
 * 实现柯里化
 * @param fn
 * @returns {any}
 */
function curry(fn) {
    return function judgeCurry(...args) {
        return fn.length > args.length ? (...args1) => judgeCurry(...args, ...args1) : fn(...args);
    }
}

function sort(arr) {
    for (let i = 1; i < arr.length; i++) {
        //
        let tmp = arr[i];
        let num = arr[i] % 10;
        let j = i - 1;
        while (j >= 0 && arr[j] % 10 > num) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = tmp;
    }
    return arr;
}

console.log(sort([123, 234, 570]));