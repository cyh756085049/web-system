/**
 * 763. 划分字母区间 https://leetcode.cn/problems/partition-labels/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。
 * 注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。
 * 返回一个表示每个字符串片段的长度的列表。
 * @param s
 * @return {[]}
 */
const partitionLabels = (s) => {
    // 首先记录字符串中每个字符最后出现的位置索引
    const strLastIndexArray = {};
    for (let i = 0; i < s.length; i++) {
        strLastIndexArray[s[i]] = i;
    }

    // 记录搜索区间字符串待切割的开始位置
    let firstIndex = 0;
    // 记录搜索区间字符串待切割的结尾位置
    let lastIndex = 0;
    // 记录每个字符片段的长度列表
    const partitions = [];

    for (let currentPosition = 0; currentPosition < s.length; currentPosition++) {
        // 当前位置字符在字符串中最后出现的位置索引
        const lastPosition = strLastIndexArray[s[currentPosition]];
        // 更新待切割结尾位置索引，获取最大值
        lastIndex = Math.max(lastIndex, lastPosition);

        // 当前字符位置索引正好等于更新的字符的最远距离，进行一次分割
        if (currentPosition === lastIndex) {
            partitions.push(lastIndex - firstIndex + 1);
            // 更新下一次分割的开始位置
            firstIndex = lastIndex + 1;
        }
    }

    return partitions;
}

/**
 * 输入：s = "ababcbacadefegdehijhklij"
 * 输出：[9,7,8]
 * 解释：
 * 划分结果为 "ababcbaca"、"defegde"、"hijhklij" 。
 * 每个字母最多出现在一个片段中。
 * 像 "ababcbacadefegde", "hijhklij" 这样的划分是错误的，因为划分的片段数较少。
 */

const s = "ababcbacadefegdehijhklij";
console.log(partitionLabels(s));