/**
 * 3. 无重复字符的最长子串 https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/21
 * 思路：滑动窗口
 * @param s
 */
// 使用哈希表，维护下标，构建滑动窗口
// 时间复杂度O(n) 空间复杂度o(n)
const lengthOfLongestSubstring = (s) => {
    // 使用哈希表来保存数组中不重复的字符，key表示字符。value表示字符的索引
    let map = new Map();
    // 设置滑动窗口的左指针
    let leftIndex = 0;
    // 保存滑动窗口的最长无重复字符的长度
    let maxLength = Number.MIN_VALUE;
    for (let i = 0; i < s.length; i++) {
        // 哈希表中已经存在当前值，更新滑动窗口的左指针
        if (map.has(s[i])) {
            leftIndex = Math.max(leftIndex, map.get(s[i]) + 1);
        }
        // 更新最大值
        maxLength = Math.max(maxLength, i - leftIndex + 1);
        map.set(s[i], i);
    }
    return maxLength;
}

const s = "abcabcbb";
console.log('解法1：滑动窗口维护下标，求给定字符串中无重复字符的最长子串:', lengthOfLongestSubstring(s));