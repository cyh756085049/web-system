const q139_wordBreak = (s, wordDict) => {
    // dp[i] 表示字符 s 前 i 位可以拆分成字典中出现的单词
    const dp = new Array(s.length + 1).fill(false);

    dp[0] = true;

    // 将字典保存在set中去重，因为可以重复使用
    const wordDictSet = new Set(wordDict);
    for (let end = 1; end <= s.length; end++) {
        for (let start = end - 1; start >= 0; start--) {
            // 分割当前遍历的首尾指针字符串，判断当前子串是否在字典中，并且开始子串之前[0,...start]是否为true
            const str = s.slice(start, end);
            if (wordDictSet.has(str) && dp[start]) {
                // 如果条件存在，则从[0,...end]的子串可以拆分成单词，无需继续划分
                dp[end] = true;
                break;
            }
        }
    }

    return dp[s.length];
}

/**
 * 输入: s = "leetcode", wordDict = ["leet", "code"]
 * 输出: true
 * 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成
 *
 * 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 * 输出: true
 * 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
 * 注意，你可以重复使用字典中的单词。
 *
 * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * 输出: false
 */

const s1 = "leetcode", wordDict1 = ["leet", "code"];
const s2 = "applepenapple", wordDict2 = ["apple", "pen"];
const s3 = "catsandog", wordDict3 = ["cats", "dog", "sand", "and", "cat"];
console.log(q139_wordBreak(s1, wordDict1), q139_wordBreak(s2, wordDict2), q139_wordBreak(s3, wordDict3),);
