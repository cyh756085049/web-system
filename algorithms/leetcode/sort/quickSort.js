// 思想：分而治之，将一个复杂的问题，分成两个或多个相似的子问题，再把子问题分成更小的子问题，
// 直到更小的子问题可以简单求解，求解子问题，则原问题的解则为子问题解的合并。
// 详细介绍可参考：https://github.com/sisterAn/JavaScript-Algorithms/issues/70
const quickSort = (arr) => {
    quick(arr, 0, arr.length - 1);
}

const quick = (arr, left, right) => {
    let index;
    if (left < right) {
        index = partition(arr, left, right);
        if (left < index - 1) {
            quick(arr, left, index - 1);
        }
        if (index < right) {
            quick(arr, index, right);
        }
    }
}

const partition = (arr, left, right) => {
    // 取随机数为基准
    const baseValue = arr[Math.floor(Math.random() * (right - left + 1)) + left];
    // 左指针小于等于右指针
    while (left <= right) {
        // 左指针右移
        while (arr[left] < baseValue) {
            left++;
        }

        while (arr[right] > baseValue) {
            right--;
        }

        if (left <= right) {
            swap(arr, left, right);
            left++;
            right--;
        }
    }
    return left;
}

const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// 测试
let arr = [1, 3, 2, 5, 4]
quickSort(arr);
console.log('快排：', arr);