const uniqueBySet = (arr) => {
    const setArr = new Set(arr);
    // return [...setArr];
    return Array.from(setArr);
}

const duplicateArray = [1, 2, 3, 3, 5, 4];
console.log('通过set实现数组去重：', uniqueBySet(duplicateArray)); // [1, 2, 3, 5, 4]

const uniqueByReduce = (arr) => {
    // 先对数组进行排序
    arr.sort((a, b) => a - b);
    return arr.reduce((previous, current) => {
        if (previous.length === 0 || previous[previous.length - 1] !== current) {
            previous.push(current);
        }
        return previous;
    }, []);
}

console.log('通过reduce实现数组去重：', uniqueByReduce(duplicateArray));

const uniqueByFilter = (arr) => {
    return arr.filter((value, index, array) => {
        return array.indexOf(value) === index;
    })
}
console.log('通过filter方法实现数字去重:', uniqueByFilter(duplicateArray));

const removeDuplicatesBySort = (arr) => {
    arr.sort();
    let index = 1;
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] !== arr[j - 1]) {
            arr[index] = arr[j];
            index++;
        }
    }
    // 把最后一个重复项删除
    arr.splice(index);
    return arr;
}

const arr = [1,2,3,1,3];
console.log('不产生新数组的情况下，通过排序及遍历实现删除重复数字：', removeDuplicatesBySort(arr));

const removeDuplicatesByIndexOf = (arr) => {
    let len = arr.length - 1;
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr.indexOf(arr[i]) !== i) {
            arr[i] = arr[len];
            len--;
        }
    }
    arr.splice(len + 1);
    return arr;
}

console.log('不产生新数组的情况下，通过indexOf及遍历实现删除重复数字：', removeDuplicatesByIndexOf(arr));
