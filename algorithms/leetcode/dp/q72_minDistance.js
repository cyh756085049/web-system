/**
 * 72. 编辑距离 https://leetcode.cn/problems/edit-distance/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数。
 * 你可以对一个单词进行如下三种操作：
 * 插入一个字符
 * 删除一个字符
 * 替换一个字符
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = (word1, word2) => {
    const word1Length = word1.length;
    const word2Length = word2.length;

    // 状态定义：dp[i][j] 表示 将 word1[0...i] 的前i个字符转变成 word2[0...j] 的前 j 个字符所需要的最少操作次数
    const dp = new Array(word1Length + 1).fill(0).map(_ => new Array(word2Length + 1).fill(0));

    // 状态定义：
    // word1 为空字符串，则 操作为 word2 需要全增
    for (let j = 1; j <= word2Length; j++) {
        dp[0][j] = j;
    }

    // word2 为空字符串，则 word1 操作为 word2 需要全删
    for (let i = 1; i <= word1Length; i++) {
        dp[i][0] = i;
    }

    for (let i= 1; i <= word1Length; i++) {
        for (let j = 1; j <= word2Length; j++) {
            // 如果 word1的前i个字符和word2的前j个字符相等，则不需要增加操作数，还等于上一次的
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // 如果不相等，说明有操作，需要取增、删、替换操作的最小值，并且最终操作数加1
                const insert = dp[i][j - 1];
                const del = dp[i - 1][j];
                const replace = dp[i - 1][j - 1];
                dp[i][j] = Math.min(insert, del, replace) + 1;
            }
        }
    }

    return dp[word1Length][word2Length];
}

/**
 * 输入：word1 = "horse", word2 = "ros"
 * 输出：3
 * 解释：
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 */

const word1 = "horse", word2 = "ros";
console.log(minDistance(word1, word2));
