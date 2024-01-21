/**
 * 70. 爬楼梯 https://leetcode.cn/problems/climbing-stairs/description/?envType=study-plan-v2&envId=top-100-liked
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 思路：动态规划，斐波那契数列
 * @param n
 */
const climbStairs = (n) => {
    if (n > 0 && n <= 3) {
        return n;
    }

    const dp = [];
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

/**
 * 输入：n = 3
 * 输出：3
 */

const n = 5;
console.log(climbStairs(n));