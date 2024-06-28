/**
 * 279. 完全平方数
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。
 * 例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
 * @param {number} n
 * @return {number}
 */

// 完全背包问题：方式1：先遍历容器，1~n的整数数字，再遍历物品，即组成 小于等于 当前容器数字的 完全平方数
const q279_numSquares = (n) => {
    // 状态定义：dp[i]表示和为i的完全平方数的最少数量, 因为求dp[n],所以长度为 n + 1
    let dp = new Array(n + 1);
    // 状态初始化：dp[0] = 0, 和为0的完全平方数的最少数量为0个，即0
    dp[0] = 0;
    // 状态转移，编写状态递推公式
    // 完全背包问题，先遍历背包容器，即 1~n,
    for (let i = 1; i <= n; i++) {
        // 结果求最小数量，给每个容器即数字i都设置默认值为比n大的值
        dp[i] = Number.MAX_VALUE;
        // 再遍历物品，也就是小于等于当前容器的完全平方数，即 roo * root <= i
        for (let root = 1; i - root * root >= 0; root++) {
            // 定义状态转移方程，即为比较当前不选新的容器包含的物品的个数 dp[i] 和 选择了当前物品后的数量 + 1
            dp[i] = Math.min(dp[i], dp[i - root * root] + 1);
        }
    }

    // 返回结果
    return dp[n];
}

const numSquares2 = () => {
    const squares = [];
    for (let i = 1; i * i <= n; i++) {
        squares.push(i * i);
    }

    const dp = new Array(n + 1);
    dp[0] = 0;
    for (let i = 1; i <= n; i++) {
        dp[i] = Number.MAX_VALUE;
        for (let square of squares) {
            if (i >= square) {
                dp[i] = Math.min(dp[i], dp[i - square] + 1);
            }
        }
    }

    return dp[n];
}

const n = 12;
console.log(q279_numSquares(n), numSquares2(n));