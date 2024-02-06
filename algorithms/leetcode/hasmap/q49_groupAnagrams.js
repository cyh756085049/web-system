/**
 * 49. 字母异位词分组 https://leetcode.cn/problems/group-anagrams/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
 *
 * 思路：
 * 使用哈希map存储排序后的同一字符串的数组，key 为 单一字符串排序后的字符串，value 为同一字符串保存的字母异位词数组
 * {key: 'abc', ['abc', bca, 'cab']}
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = (strs) => {
    const map = new Map();
    // 使用哈希map存储排序后的同一字符串的数组，key 为 单一字符串排序后的字符串，value 为同一字符串保存的字母异位词数组 {'abc': ['abc', 'bca', 'cab']}
    for (let str of strs) {
        // 将当前遍历的字符串转化为数组然后排序，再将排好序的数组转化为新字符串，保证之后遍历到的字母异位词可以为同一组
        const sortStr = str.split('').sort().join('');
        if (map.has(sortStr)) {
            map.set(sortStr, [str, ...map.get(sortStr)]);
        } else {
            map.set(sortStr, [str]);
        }
    }

    return Array.from(map.values());
}

/**
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log('字母异位词分组：', groupAnagrams(strs));