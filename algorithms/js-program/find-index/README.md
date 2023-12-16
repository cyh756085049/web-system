### 4、[实现一个`findIndex` 函数【字节、腾讯、网易、美团】](https://github.com/sisterAn/JavaScript-Algorithms/issues/137)
找到有序数组 [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67]中第一次出现的位置，比如7第一次出现的位置是4.
```js
const findIndex = (nums, target) => {
    let result = search(nums, target);
    return result;
}

const search = (nums, target) => {
    if (nums.length === 0) {
        return -1;
    }
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let middle = Math.floor((right - left) / 2) + left;
        if (nums[middle] > target) {
            right = middle - 1;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    if (left === nums.length || nums[left] !== target) {
        return -1;
    }

    return left;
}

const nums = [5,7,7,8,8,10], target = 8;
const nums1 = [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67], target1 = 9;
console.log('在排序数组中查找目标元素的第一个位置：', findIndex(nums, target));
console.log('在排序数组中查找目标元素的第一个位置：', findIndex(nums1, target1));
```
如果是要查找目标值的区间呢？题目如下：[leetcode34-在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)
给定一个按照升序排列的整数数组 nums ，和一个目标值 target 。找出给定目标值在数组中的开始位置和结束位置。
你的算法时间复杂度必须是 O(logn) 级别。
如果数组中不存在目标值，返回 [-1, -1] 。

```js
const searchRange = (nums, target) => {
    const left = searchLeft(nums, target);
    if (left === -1) {
        return [-1, -1];
    }
    return [left, searchRight(nums, target)];
}

const searchLeft = (nums, target) => {
    if (nums.length === 0) {
        return - 1;
    }

    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const middle = Math.floor((right - left) / 2) + left;
        if (nums[middle] > target) {
            right = middle - 1;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    if (left === nums.length || nums[left] !== target) {
        return -1;
    }
    return left;
}

const searchRight = (nums, target) => {
    if (nums.length === 0) {
        return -1;
    }
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const middle = Math.floor((right - left) / 2) + left;
        if (nums[middle] > target) {
            right = middle - 1;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            left = middle + 1;
        }
    }

    if (right === -1 || nums[right] !== target) {
        return -1;
    }

    return right;
}

const nums = [5,7,7,8,8,10], target = 8;
const nums1 = [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67], target1 = 9;
console.log('在排序数组中查找目标元素的第一个位置：', searchRange(nums, target));
console.log('在排序数组中查找目标元素的第一个位置：', searchRange(nums1, target1));
```
