/**
 * 438. 找到字符串中所有字母异位词 https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
 * 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
 *
 * 思路：
 * 1. 先剪枝或者判断边界情况
 * 2. 使用哈希表存储字符串 p 对应出现的字符和频次
 * 3. 设置滑动窗口左右指针从0开始，使用哈希表存储字符串 s 对应窗口的字符及出现频次，设置滑动窗口的长度
 * 4. 在右指针小于字符串 s 长度情况下进行遍历，如果当前元素存在于p哈希表中，给s哈希表设置字符及对应频次，
 * 如果p哈希表和s哈希表中的字符及频次相等，则滑动窗口长度加1，之后右指针加1
 * 5、判断右指针与左指针的长度间隔及滑动窗口长度大于等于p字符串长度，则判断p长度和滑动窗口长度，
 * 相等则将左指针索引加入到结果数组中，否则，再判断左指针相应情况。
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagrams = (s, p) => {
    // 结果数组
    const res = [];

    // 剪枝，如果字符串s长度大于p,则表明不可能在s中找到p的异位词
    if (s.length < p.length) {
        return res;
    }

    // 使用哈希表存储 p 包含的字符及对应的出现频次
    let pMap = new Map();
    for (let i = 0; i < p.length; i++) {
        pMap.set(p[i], (pMap.get(p[i]) || 0) + 1);
    }

    // 滑动窗口左指针、右指针
    let left = 0, right = 0;
    // 计算滑动窗口的长度,用于判断是否和p的长度相同
    let count = 0;
    // 存储s字符哈希表，用于和p字符串存储的哈希表对比
    let sMap = new Map();

    while (right < s.length) {
        const curRightStr = s[right];
        if (pMap.has(curRightStr)) {
            sMap.set(curRightStr, (sMap.get(curRightStr) || 0) + 1);

            if (pMap.get(curRightStr) === sMap.get(curRightStr)) {
                count++;
            }
        }
        right++;

        while (right - left >= p.length) {
            if (pMap.size === count) {
                res.push(left);
            }

            const curLeftStr = s[left];
            if (pMap.has(curLeftStr)) {
                if (pMap.get(curLeftStr) === sMap.get(curLeftStr)) {
                    count--;
                }
                sMap.set(curLeftStr, sMap.get(curLeftStr) - 1);
            }
            left++;
        }
    }
    return res;
}

/**
 * 输入: s = "cbaebabacd", p = "abc"
 * 输出: [0,6]
 */

const s = "cbaebabacd", p = "abc";
console.log('找到字符串中所字母有异位词子串的起始索引：', findAnagrams(s, p));