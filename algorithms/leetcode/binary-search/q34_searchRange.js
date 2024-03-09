/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置 https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = (nums, target) => {
    if (!nums || nums.length === 0) {
        return [-1, -1];
    }

    const start = search(nums, target, true);
    if (start === nums.length || nums[start] !== target) {
        return [-1, -1];
    }

    const end = search(nums, target);

    return [start, end];
}

const search = (nums, target, isLeft = false) => {
    let left = 0;
    let right = nums.length;

    while (left <= right) {
        let middle = Math.floor((right - left) / 2) + left;

        if (nums[middle] > target) {
            right = middle - 1;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            if (isLeft) { // 寻找左边界
                right = middle - 1;
            } else { // 寻找右边界
                left = middle + 1;
            }
        }
    }

    return isLeft ? left : right;
}

/**
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 */

const nums = [5,7,7,8,8,10], target = 8;
console.log(searchRange(nums, target));