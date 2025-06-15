/**
* name: p122_maxProfitII
* description: 动态规划 + 贪心算法
* author: Ramona Chen
* time: 2025-06-08 11:56:41
* {@link }
*/

/** 122. 买卖股票的最佳时机 II https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let cost = 0;

    // 贪心算法，求局部最优解，如果明天卖出有赚，则在今天买入，赚钱收益 = 明天 - 今天利润，
    // 如果明天卖出亏钱，则不买入，不盈利为0，累加获得最大利润
    for (let i = 1; i < prices.length; i++) {
        cost += Math.max(0, prices[i] - prices[i - 1]);
    }

    return cost;
};

// 方案2：通过动态规划dp数组的方式实现
const maxProfitII = function(prices) {
    const length = prices.length;

    if (length < 2) {
        return 0;
    }

    // dp[i][j]表示第i天交易完成后手里持有股票数量j的情况下获取的最大利润
    // dp[i][0]表示第i天交易完成后手里无股票获取的利润
    // dp[i][1]表示第i天交易完成后手里持有1股股票获取的利润
    const dp = new Array(length).fill(0).map(() => new Array(2).fill(0));

    // 状态初始化
    dp[0][0] = 0;
    dp[0][1] = 0 - prices[0];

    for (let i = 1; i < prices.length; i++) {
        // 第i天没持有股票，前一天持有股票并卖出
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        // 第i天没持有1只股票，前一天没有股票并买入
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }

    return dp[length - 1][0];
};

const prices = [7,1,5,3,6,4];
console.log(maxProfit(prices), maxProfitII(prices));