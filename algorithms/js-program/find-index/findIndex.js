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