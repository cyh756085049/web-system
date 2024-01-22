
const rob = (nums) => {
    if (!nums || !nums.length) {
        return 0;
    }

    if (nums.length === 1) {
        return nums[0];
    }
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = nums[0] > nums[1] ? nums[1] : nums[0];
    for (let i = 2; i < nums.length; i++) {
        dp[i] = (nums[i] + dp[i - 2]) > dp[i - 1] ? nums[i] + dp[i - 2] : dp[i - 1];
    }
    return dp[nums.length - 1];
}

/**
 * 输入：[2,7,9,3,1]
 * 输出：12
 *
 * 输入：[1,2,3,1]
 * 输出：4
 */

const nums = [2,7,9,3,1];
const nums1 = [1,2,3,1];
console.log(rob(nums), rob(nums1));