// 方式一：统计每个元素出现的次数
function count(arr) {
    if (!arr || arr.length === 0) {
        return 0;
    }
    let obj = {};
    arr.forEach(item => {
        if (obj[item]) {
            obj[item] += 1;
        } else {
            obj[item] = 1;
        }
    });
    return obj;
}
let arr = ['a', 'b', 'd', 'h', 'd', 's', 'a', 'a', 'c', 'e'];
console.log(count(arr));

// 方式二：统计指定元素在数组中出现的次数
function repeatCount(arr, element) {
    if (!arr || arr.length === 0) {
        return 0;
    }
    let count = 0;
    arr.forEach(item => {
        if (item === element) {
            count += 1;
        }
    });
    return count;
}
let arr1 = [1, 2, 6, 5, 6, 1, 6];
console.log(repeatCount(arr1, 6));

// 方式三：统计指定元素在数组中出现的次数，用reduce实现
function repeatCount1(arr, element) {
    if (!arr || arr.length === 0) {
        return 0;
    }
    return arr.reduce((totalCount, item) => {
        totalCount += item === element ? 1 : 0;
        return totalCount;
    }, 0);
}
let arr2 = [1, 2, 6, 5, 6, 1, 6];
console.log(repeatCount1(arr2,6)); // 3