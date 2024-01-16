/**
 * 剑指 Offer 50. 第一个只出现一次的字符：https://leetcode.cn/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/description/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/50
 * 思路：哈希表，第一次遍历保存每个字符出现的次数，第二次遍历，获取第一个出现1次的字符返回
 * 复杂度：时间复杂度O(n) 空间复杂度O(n)
 * @param s
 */
const firstUniqChar = (s) => {
    if (!s || !s.length) {
        return ' ';
    }
    // 使用哈希表保存每一个字符出现的次数,key：字符 value: 出现的次数
    const map = new Map();
    for (let item of s) {
        const value = map.get(item) ? map.get(item) + 1 : 1;
        map.set(item, value);
    }

    for (let item of s) {
        if (map.get(item) === 1) {
            return item;
        }
    }

    return ' ';
}

const s = "abaccdeff";
console.log('使用哈希表实现：第一个只出现一次的字符', firstUniqChar(s));