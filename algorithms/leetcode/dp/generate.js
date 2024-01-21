/**
 * 118. 杨辉三角 https://leetcode.cn/problems/pascals-triangle/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
 * 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
 */
const generate = (numRows) => {
    if (numRows === 1) {
        return [[1]];
    }

    const dp = [];
    dp[0] = [1];
    dp[1] = [1, 1];
    for (let i = 2; i < numRows; i++) {
        // 先默认将每一层的值都填充为1，然后通过动态规划方式填充
        dp[i] = new Array(i + 1).fill(1);
        for (let j = 1; j < i; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];
        }
    }

    return dp;
}

const numRows = 5;
console.log(generate(numRows));