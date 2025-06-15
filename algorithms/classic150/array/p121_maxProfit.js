/**
* name: p121_maxProfit
* description: 动态规划
* author: Ramona Chen
* time: 2025-06-08 11:32:11
* {@link }
*/

/** 121. 买卖股票的最佳时机 https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function(prices) {
    // 记录最低的价格
    let minPrice = Number.MAX_VALUE;
    // 记录最大的差值
    let cost = 0;

    for (let i = 0; i < prices.length; i++) {
        // 遍历数组过程中，先记录最低的价格，
        minPrice = Math.min(prices[i], minPrice);
        // 更新获取的最大利润
        cost = Math.max(cost, prices[i] - minPrice);
    }

    return cost;
};

const price = [7,1,5,3,6,4];
console.log(maxProfit(price));