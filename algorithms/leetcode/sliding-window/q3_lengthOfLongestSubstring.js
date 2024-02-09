const lengthOfLongestSubstring = (s) => {
    if (s.length <= 1) {
        return s;
    }

    // 使用哈希表保存数组中不重复的字符
    const map = new Map();
    // 滑动窗口左指针
    let leftIndex = 0;
    // 最长无重复子串长度
    let longestLength = Number.MIN_VALUE;

    for (let rightIndex = 0; rightIndex < s.length; rightIndex++) {
        // 出现了重复字符，更新滑动窗口左指针
        if (map.has(s[rightIndex])) {
            leftIndex = Math.max(leftIndex, map.get(s[rightIndex]) + 1);
        }
        // 始终更新滑动窗口右指针
        map.set(s[rightIndex], rightIndex);
        // 更新无重复子串的最大长度
        longestLength = Math.max(longestLength, rightIndex - leftIndex + 1);
    }

    return longestLength;
}

/**
 * 输入: s = "abcabcbb"
 * 输出: 3
 *
 * 输入: s = "pwwkew"
 * 输出: 3
 */

const s1 = 'abcabcbb', s2 = "pwwkew";
console.log('无重复字符的最长子串', lengthOfLongestSubstring(s1), lengthOfLongestSubstring(s2));