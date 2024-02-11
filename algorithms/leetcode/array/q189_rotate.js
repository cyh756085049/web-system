/**
 * 189. 轮转数组 https://leetcode.cn/problems/rotate-array/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = (nums, k) => {
    // 防止k大于nums数组的长度，数组越界，也可以减少翻转次数
    k = k % nums.length;
    // 翻转数组
    const reverse = (start, end = nums.length - 1) => {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }

    // 整个数组翻转
    reverse(0);
    // 前k个元素翻转
    reverse(0, k - 1);
    // k之后的元素翻转
    reverse(k);
    return nums;
}

const nums = [1,2,3,4,5,6,7], k = 3;
console.log('轮转数组', rotate(nums, k));