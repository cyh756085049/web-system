/**
 * 64. 最小路径和 https://leetcode.cn/problems/minimum-path-sum/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = (grid) => {
    // 自身修改，节省空间
    const m = grid.length;
    const n = grid[0].length;

    // 状态定义：grid[i][j] 表示从左上角到达坐标(i, j)的最小路径和
    // 状态初始化
    // 从左到右第一行元素的路径和
    for (let i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0];
    }

    // 从上到下第一列元素的路径和
    for (let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1];
    }

    // 状态转移方程
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            grid[i][j] += Math.min(grid[i][j - 1], grid[i - 1][j]);
        }
    }

    return grid[m - 1][n - 1];
}

const minPathSumsII = (grid) => {
    const m = grid.length;
    const n = grid[0].length;

    // 状态定义：dp[i][j] 表示从左上角到达坐标(i, j)的最小路径和
    const dp = new Array(m).fill(0).map(_ => new Array(n));

    // 状态初始化
    dp[0][0] = grid[0][0];
    // 从左到右第一行元素的路径和
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }

    // 从上到下第一列元素的路径和
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    // 状态转移方程
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
        }
    }

    return dp[m - 1][n - 1];
}

/**
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
 * 输出：7
 * 解释：因为路径 1→3→1→1→1 的总和最小。
 */
const grid = [[1,3,1],[1,5,1],[4,2,1]];
// console.log(minPathSum(grid));
console.log(minPathSumsII(grid));