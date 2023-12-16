// flat 方法的实现
const flat = (arr, depth = 1) => {
    if (depth > 0) {
        return arr.reduce((previousValue, currentValue) => {
            if (Array.isArray(currentValue)) {
                return [...previousValue, ...flat(currentValue, depth - 1)];
            } else {
                return [...previousValue, currentValue];
            }
        })
    } else {
        return arr;
    }
}
const arr = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]];
console.log('实现的flat方法',
    '\n默认扁平化一层：', flat(arr),
    '\n扁平化两层：', flat(arr, 2),
    '\nInfinity 关键字作为参数:', flat(arr, Infinity),
    '\n传入 <=0 的整数:', flat(arr, 0), flat(arr, -1),
    '\n原数组有空位:', flat(['a', 'b', 'c', 'd', , , ]),
);

// 通过reduce实现
const flattenDeepByReduce = (arr) => {
    if (Array.isArray(arr)) {
        return arr.reduce((previousValue, currentValue) => {
            return [...previousValue, ...flattenDeepByReduce(currentValue)];
        }, []);
    } else {
        return [arr];
    }
}
console.log('一次扁平化所有数据', flattenDeepByReduce(arr)); // ["a", "b", "c", "d", "e", "f", "g"]


// 通过栈方法实现
const flattenDeepByStack = (arr) => {
    const result = [];
    const stack = [...arr];
    // 栈不为空，循环遍历
    while (stack.length > 0) {
        // 出栈
        const val = stack.pop();
        // 如果当前出栈元素仍然是数组，则继续展开该层数组入栈
        if (Array.isArray(val)) {
            stack.push(...val);
        } else {
            // 否则，用头插法插入到结果数组中
            result.unshift(val);
        }
    }
    return result;
}

console.log('通过栈实现一次扁平化所有数据:', flattenDeepByStack(arr));
