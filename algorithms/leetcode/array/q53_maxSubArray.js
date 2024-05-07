/**
 * 53. 最大子数组和 https://leetcode.cn/problems/maximum-subarray/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：动态规划+前缀和
 * @param nums
 * @return {*}
 */
const maxSubArray = (nums) => {
    let maxValue = nums[0], curMaxValue = nums[0];

    // 动态规划，状态转移方程 = 前缀和和当前值比较，哪个大选哪个
    for (let i = 0; i < nums.length; i++) {
        curMaxValue = Math.max(curMaxValue + nums[i], nums[i]);
        maxValue = Math.max(maxValue, curMaxValue);
    }

    return maxValue;
}

const nums = [-2,1,-3,4,-1,2,1,-5,4];
console.log('53. 最大子数组和', maxSubArray(nums));