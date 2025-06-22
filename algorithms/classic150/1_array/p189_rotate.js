/**
* name: p189_rotate
* description: 反转，先分段反转、再整体反转
* author: Ramona Chen
* time: 2025-06-08 11:04:01
* {@link }
*/

/** 189. 轮转数组 https://leetcode.cn/problems/rotate-array/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function(nums, k) {
    const n = nums.length - 1;
    // 避免越界
    k = k % nums.length;

    // 可以分为 [0, n - k] 和 [n - k, n] 两段数组，其中 [0, n - k] 反转，
    // [n - k, n] 数组反转，然后整体反转
    reverse(nums, 0, n - k);
    reverse(nums, n - k + 1, n);
    reverse(nums, 0, n);

    console.log(nums);
};

const reverse = (nums, left, right) => {
    while (left < right) {
        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;

        left++;
        right--;
    }
}

const nums = [1,2,3,4,5,6,7], k = 3;
rotate(nums, k);