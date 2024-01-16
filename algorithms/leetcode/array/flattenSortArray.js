/**
 * 扁平化数组 https://github.com/sisterAn/JavaScript-Algorithms/issues/5
 * 题目：给定一个多层嵌套的数组，实现将该数组扁平化并去除掉其中重复的数据，返回一个升序且不重复的数组
 * @param arr
 */
// 函数组合
const compose = (...fns) => initValues => fns.reduceRight((y, fn) => fn(y), initValues);

// 数组扁平化
const flattenDeep = (array) => {
    return array.flat(Infinity);
}

const flattenDeepII = (array) => {
    return array.reduce((acc, cur) => {
        const curItem = Array.isArray(cur) ? flattenDeepII(cur) : cur;
        acc = acc.concat(curItem);
        return acc;
    }, []);
}

// 数组去重
const unique = (array) => {
    const uniqueArray = new Set(array);
    console.log('通过set去重', uniqueArray);
    // 将其转化为真正的数组
    // return Array.from(uniqueArray);
    // 或者使用扩展运算符
    return [...uniqueArray];
}

// 数组排序
const sort = (array) => {
    return array.sort((a, b) => a - b);
}

const flattenSortArray = compose(sort, unique, flattenDeep);

const flattenSortArrayII = (array) => {
    // const flattenArray = flattenDeep(array);
    const flattenArray = flattenDeepII(array);
    console.log('扁平化数组', flattenArray);

    const uniqueArray = unique(flattenArray);
    console.log('去重数组', uniqueArray);

    const sortArray = sort(uniqueArray);
    console.log('排序数组', sortArray);

    return sortArray;
}
const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
console.log(flattenSortArray(arr));
console.log(flattenSortArrayII(arr));