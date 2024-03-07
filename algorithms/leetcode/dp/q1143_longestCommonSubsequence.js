/**
 * 1143. 最长公共子序列 https://leetcode.cn/problems/longest-common-subsequence/description/?envType=study-plan-v2&envId=top-100-liked
 * 题解：https://leetcode.cn/problems/longest-common-subsequence/solutions/696989/fu-xue-ming-zhu-er-wei-dong-tai-gui-hua-r5ez6/?envType=study-plan-v2&envId=top-100-liked
 * 思路：动态规划
 * @param text1
 * @param text2
 * @return {any}
 */
const longestCommonSubsequence = (text1, text2) => {
    const text1Length = text1.length;
    const text2Length = text2.length;

    // 子序列可以是不连续的；子字符串需要是连续的；
    // 状态定义：dp[i][j] 表示 text1[0...i],text2[0...j] 的最长公共子序列的长度
    // 状态初始化：当i = 0 或者 j = 0 时，dp[i][j] 初始化为0，所以直接从 1 开始遍历
    // dp[0][j] = 0,表示的是 text1 中取空字符串 跟 text2 的最长公共子序列，结果肯定为 0.
    // dp[i][0] = 0, 表示的是 text2 中取空字符串 跟 text1 的最长公共子序列，结果肯定为 0.
    const dp = new Array(text1Length + 1).fill(0).map(_ => new Array(text2Length + 1).fill(0));

    for (let i = 1; i <= text1Length; i++) {
        for (let j = 1; j <= text2Length; j++) {
            // 如果当前两个子字符串的最后一位相等，则公共子序列长度加1
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // 两个子字符串的最后一位不相等，那么此时的状态 dp[i][j] 应该是 dp[i - 1][j] 和 dp[i][j - 1] 的最大值。
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[text1Length][text2Length];
}

/**
 * 输入：text1 = "abcde", text2 = "ace"
 * 输出：3
 * 解释：最长公共子序列是 "ace" ，它的长度为 3 。
 */

const text1 = "abcde", text2 = "ace";
console.log('最长公共子序列长度：', longestCommonSubsequence(text1, text2));