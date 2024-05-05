/**
 * 3. 无重复字符的最长子串 https://leetcode.cn/problems/longest-substring-without-repeating-characters/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * 思路：滑动窗口，左右指针计算最大长度，哈希表存储无重复字符子串
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = (s) => {
    if (s.length <= 1) {
        return s.length || 0;
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

function lengthOfLongestSubstringII(s) {
    // 字符串长度小于等于1且不为空字符时，最长子串长度为字符串长度，否则为0，用例 ' '
    if (s.length <= 1) {
        return s.length && s[0] ? s.length : 0;
    }
    // 最长无重复子串长度
    let maxLength = 0;
    // 左右指针，滑动窗口移动
    let left = 0, right = 0;
    // 滑动窗口的无重复字符的字符串
    let str = '';
    for (let i = 0; i < s.length; i++) {
        // 获取滑动窗口字符串中是否存在当前字符
        const index = str.indexOf(s[i]);
        // 如果存在，则需要更新子串最大长度，左右指针、滑动窗口子串
        if (index !== -1) {
            maxLength = Math.max(maxLength, right - left);
            // 左指针要更新到当前重复字符的下一个位置开始
            left = left + 1 + index;
            // 滑动窗口子串要根据当前存在的重复字符位置截取，并拼接新的字符更新
            str = str.slice(index + 1) + s[i];
            right++;
        } else {
            right++;
            str += s[i];
        }
    }

    // 循环结束后， 如果都没有重复的子串，仍然需要更新一次，保证得到无重复最长子串，如用例 'au'
    maxLength = Math.max(maxLength, right - left);
    return maxLength;
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
console.log(lengthOfLongestSubstringII('au'));