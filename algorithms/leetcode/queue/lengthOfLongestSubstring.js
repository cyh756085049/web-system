/**
 * 3. 无重复字符的最长子串 https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/
 * @param s
 */
const lengthOfLongestSubstring = (s) => {
    // 使用哈希表保存数组中不重复的字符，key：字符，value：字符索引
    const map = new Map();
    // 滑动窗口的左指针
    let leftIndex = 0;
    // 保存滑动窗口最长无重复字符的长度
    let maxLength = Number.MIN_VALUE;
    for (let rightIndex = 0; rightIndex < s.length; rightIndex++) {
        if (map.has(s[rightIndex])) {
            leftIndex = Math.max(leftIndex, map.get(s[rightIndex]) + 1);
        }
        maxLength = Math.max(maxLength, rightIndex - leftIndex + 1);
        map.set(s[rightIndex], rightIndex);
    }
    return maxLength;
}

const s = "abcabcbb";
console.log('滑动窗口双指针哈希表实现无重复字符的最大长度', lengthOfLongestSubstring(s));