/**
 * 416. 分割等和子集 https://leetcode.cn/problems/partition-equal-subset-sum/description/
 * 题解：https://leetcode.cn/problems/partition-equal-subset-sum/solutions/1843032/javascriptjs-by-confident-coldenbfp-64m2/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 * @param {number[]} nums
 * @return {boolean}
 */
const canPartition = (nums) => {
    // 数组长度
    const n = nums.length;
    // 数组长度为1，无法分割为两个子集
    if (n === 1) {
        return false;
    }
    // 求数组的和
    const sum = nums.reduce((pre, cur) => pre + cur, 0);
    // 判断数组和是否为奇数，则无法分割为2个整数子集
    if (sum % 2 !== 0) {
        return false;
    }

    // 数组分割的目标值，数组和的一半
    const target = sum / 2;
    // 求数组最大值
    const max = Math.max(...nums);
    // 数组最大值大于数组和的一半，也无法分割，题目规定数组只包含正整数，最大值分在哪个子集都会使子集和大于数组和一半
    if (max > target) {
        return false;
    }
    // dp[i][j] 表示从数组nums的[0, i]下标范围内选取的选取若干个正整数（可以是0个），是否存在选取的正整数的和等于 j
    const dp = new Array(n).fill(false).map(() => new Array(target + 1).fill(false));

    // 任何下标范围都可以满足和为 0 的情况
    for (let i = 1; i < n; i++) {
        dp[i][0] = true;
    }
    // 从[0, 0]下标选择，可以选到 nums[0]
    dp[0][nums[0]] = true;

    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= target; j++) {
            // 和大于当前数组元素
            if (j >= nums[i]) {
                // dp[i - 1][j] = true 表示当前从 [0, i - 1] 中已经找到和为 j 的子集
                // dp[i - 1][j - nums[i] = true, 表示当前从 [0, i - 1] 中国已经找到和为 j - nums[i] 的子集，那么 dp[i][j] 选择当前 nums[i]，则必为 true
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]];
            } else {
                // 和小于当前数组元素，那么要从[0, i - 1]中选择
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    return dp[n - 1][target];
}

/**
 * 输入：nums = [1,5,11,5]
 * 输出：true
 * 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
 *
 * 输入：nums = [1,2,3,5]
 * 输出：false
 * 解释：数组不能分割成两个元素和相等的子集。
 */

const nums = [1,5,11,5];
const nums1 = [1,2,3,5];
console.log(canPartition(nums), canPartition(nums1));