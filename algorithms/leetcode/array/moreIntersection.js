/**
 * 编写一个函数计算多个数组的交集
 * @param args 多个数组
 * @returns {*|*[]}
 */
const moreIntersection = (...args) => {
    console.log(args);
    if (args.length === 0) {
        return [];
    }
    if (args.length === 1) {
        return args[0];
    }

    const arrays = args.reduce((preArray, currentArray) => {
        console.log('preArray', preArray, 'currentArray', currentArray);
        const filterArrays = preArray.filter(item => currentArray.includes(item));
        return filterArrays;
    });

    const resArray = [...new Set(arrays)];
    return resArray;
}

console.log('计算多个数组的交集', moreIntersection([2, 1], [2, 3], [2, 4, 3]));