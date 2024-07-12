Array.prototype.myReduce = function(callback, initialValue) {
    const array = this;

    // 无效参数判定
    if (!Array.isArray(array) || !callback || typeof callback !== 'function') {
        throw new TypeError('Invalid arguments');
    }

    let accumulator = initialValue !== undefined ? initialValue : array[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < array.length; i++) {
        // 参数1：之前累加值
        // 参数2：当前值
        // 参数3：当前索引
        // 参数4：数组
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
}

const arr = [1, 2, 3, 4, 5];

const reduce = arr.myReduce((prev, current) => prev + current, 0)
// 输出15
console.log(reduce);

