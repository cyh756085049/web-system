/**
 * 152. 乘积最大子数组
 * https://leetcode.cn/problems/maximum-product-subarray/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 * 动态规划
 * @param {number[]} nums
 * @return {number}
 */
// 最精简版：用变量来维护动态数组的最大和最小乘积，降低空间复杂度
const maxProduct = (nums) => {
    // 维护结果需要的最大乘积
    let maxProduct = nums[0];
    // 最大乘积变量：以元素i为结尾的当前所有元素最大乘积
    let maxProductDP = nums[0];
    // 最小乘积变量：以元素i为结尾的当前所有元素最小乘积
    let minProductDP = nums[0];
    for (let i = 1; i < nums.length; i++) {
        let tmp = maxProductDP;
        maxProductDP = Math.max(nums[i], maxProductDP * nums[i], minProductDP * nums[i]);
        minProductDP = Math.min(nums[i], tmp * nums[i], minProductDP * nums[i]);
        maxProduct = Math.max(maxProduct, maxProductDP);
    }

    return maxProduct;
}

// 使用动态数组
const maxProductII = (nums) => {
    let maxProduct = nums[0];
    // 状态定义
    // 维护最大乘积dp数组：maxProductDP[i]表示以元素i为结尾的当前所有元素的最大乘积
    let maxProductDP = [];
    // 最大乘积状态初始化
    maxProductDP[0] = nums[0];
    // 维护最小乘积dp数组：minProductDP[i]表示以元素i为结尾的当前所有元素的最小乘积
    let minProductDP = [];
    // 最小乘积状态初始化
    minProductDP[0] = nums[0];
    // 状态转移方程，考虑乘积最大值，可能存在两个负值想乘会得到正值，变成最大值，所以要考虑求最大值和最小值
    for (let i = 1; i < nums.length; i++) {
        const temp = maxProductDP[i - 1];
        maxProductDP[i] = Math.max(nums[i], maxProductDP[i - 1] * nums[i], minProductDP[i - 1] * nums[i]);
        minProductDP[i] = Math.min(nums[i], temp * nums[i], minProductDP[i - 1] * nums[i]);
        maxProduct = Math.max(maxProduct, maxProductDP[i]);
    }
    // 返回结果
    return maxProduct;
}

/**
 * 输入: nums = [2,3,-2,4]
 * 输出: 6
 * 解释: 子数组 [2,3] 有最大乘积 6。
 *
 * 输入: nums = [-2,0,-1]
 * 输出: 0
 * 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 */

const nums = [2,3,-2,4];
console.log(maxProduct(nums));
console.log(maxProductII(nums));