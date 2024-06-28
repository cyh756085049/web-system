/**
 * 322. 零钱兑换 https://leetcode.cn/problems/coin-change/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * 你可以认为每种硬币的数量是无限的。
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const q322_coinChange = (coins, amount) => {
    // dp[i] 表示可以总金额为 i 所需的最少硬币个数
    const dp = new Array(amount + 1).fill(amount + 1);
    // 状态初始化
    dp[0] = 0;
    // 状态转移方程 先遍历硬币，再遍历总金额
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
        }
    }
    // 返回结果 如果凑成amount总金额的最少硬币个数 仍然等于初始值，则说明这个值一直没更新，说明没有符合组成最小的硬币个数
    return dp[amount] === amount + 1 ? -1 : dp[amount];
}

// 方式2：先遍历总金额，再遍历硬币数组
const coinChangeII = function(coins, amount) {
    let dp = new Array(amount + 1);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        dp[i] = amount + 1;
        for (let coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === amount + 1 ? -1 : dp[amount];
};


/**
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3
 * 解释：11 = 5 + 5 + 1
 *
 * 输入：coins = [2], amount = 3
 * 输出：-1
 */

const coins = [1, 2, 5], amount = 11;
// const coins = [2], amount = 3;
console.log(q322_coinChange(coins, amount));
console.log(coinChangeII(coins, amount));
