/**
 * 560. 和为 K 的子数组 https://leetcode.cn/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数 。
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subArraySum = (nums, k) => {
    // 构建前缀和
    const prefixSum = [];
    prefixSum[0] = 0;
    for (let i = 0; i < nums.length; i++) {
        prefixSum[i + 1] = prefixSum[i] + nums[i];
    }

    // 和为k的连续子数组的数量
    let count = 0;
    for (let left = 0; left < nums.length; left++) {
        for (let right = left; right < nums.length; right++) {
            if (prefixSum[right + 1] - prefixSum[left] === k) {
                count++;
            }
        }
    }
    return count;
}

/**
 * 输入：nums = [1,1,1], k = 2
 * 输出：2
 * 输入：nums = [1,2,3], k = 3
 * 输出：2
 */

const nums = [1,2,3];
console.log('和为k的子数组：', subArraySum(nums, 3));