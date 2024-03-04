/**
 * 62. 不同路径 https://leetcode.cn/problems/unique-paths/?envType=study-plan-v2&envId=top-100-liked
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
 * 问总共有多少条不同的路径？
 * @param m
 * @param n
 */
const uniquePaths = (m, n) => {
    // 状态定义：dp[i][j] 表示机器人从左上角到坐标 [i, j] 的不同路径条数
    const dp = new Array(m).fill().map(item => new Array(n));

    // 状态初始化
    // 从上到下，初始化第一列
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }

    // 从左到右，初始化第一列
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // 机器人活动有两种方式，从上到下，从左到右
            dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
        }
    }

    // 机器人到达网格右下角
    return dp[m - 1][n - 1];
}

/**
 * 输入：m = 3, n = 2
 * 输出：3
 * 解释：
 * 从左上角开始，总共有 3 条路径可以到达右下角。
 * 1. 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右
 * 3. 向下 -> 向右 -> 向下
 *
 * 输入：m = 7, n = 3
 * 输出：28
 */

const m = 7, n = 3;
console.log(uniquePaths(m, n)); // 28
