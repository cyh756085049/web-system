/**
 * 153. 寻找旋转排序数组中的最小值 https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
 * @param {number[]} nums
 * @return {number}
 */
const findMin = (nums) => {
    if (!nums || nums.length === 0) {
        return -1;
    }

    let left = 0;
    let right = nums.length - 1;
    // 保存最小值
    let min = Infinity;

    while (left <= right) {
        let middle = Math.floor((right - left) / 2) + left;
        // 如果中间值大于数组右区间的值，则说明极小值必在右区间，极小值为 nums[right]
        if (nums[middle] > nums[right]) {
            left = middle + 1;
            min = Math.min(min, nums[right]);
        } else {
            // 中间值小于等于右区间的值，说明右区间是递增的，极小值为 nums[middle]
            right = middle - 1;
            min = Math.min(min, nums[middle]);
        }
    }

    return min;
}

/**
 * 输入：nums = [4,5,6,7,0,1,2]
 * 输出：0
 */

const nums = [4,5,6,7,0,1,2];
console.log(findMin(nums));