/**
 * 53. 最大子数组和 https://leetcode.cn/problems/maximum-subarray/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组 是数组中的一个连续部分。
 * 思路：动态规划
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = (nums) => {
    // 状态定义：maxSubArrayDP[i] 表示以i为结尾的最大连续子数组和
    const maxSubArrayDP = [];
    // 状态初始化
    maxSubArrayDP[0] = nums[0];
    let maxValue = nums[0];

    // 状态转移方程
    for (let i = 1; i < nums.length; i++) {
        maxSubArrayDP[i] = Math.max(nums[i] + maxSubArrayDP[i - 1], nums[i]);
        maxValue = Math.max(maxValue, maxSubArrayDP[i]);
    }

    return maxValue;
}

// 动态规划，优化动态数组为变量
const maxSubArrayDP = (nums) => {
    let maxValue = nums[0], curMaxSum = nums[0];

    // 状态转移方程
    for (let i = 1; i < nums.length; i++) {
        curMaxSum = Math.max(nums[i] + curMaxSum, nums[i]);
        maxValue = Math.max(maxValue, curMaxSum);
    }

    return maxValue;
}

/**
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 */

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log('最大子数组和：', maxSubArray(nums), maxSubArrayDP(nums));
