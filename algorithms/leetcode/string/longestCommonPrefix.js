/**
 * 14. 最长公共前缀 https://leetcode.cn/problems/longest-common-prefix/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/19
 * @param strs
 */
// 解法1：从前往后依次比较字符串，获取公共前缀
// 复杂度：时间复杂度O(s)【s表示所有字符串中字符数量的和】 空间复杂度O(1)
const longestCommonPrefix = (strs) => {
    if (strs === null || strs.length === 0) {
        return '';
    }

    let prevs = strs[0];
    for (let i = 1; i < strs.length; i++) {
        let j;
        for (j = 0; j < prevs.length && j < strs[i].length; j++) {
            if (prevs.charAt(j) !== strs[i].charAt(j)) {
                break;
            }
        }
        // substring 截取字符串中的子串，截取的子串包含开始索引，不包含结束索引
        prevs = prevs.substring(0, j);
        if (prevs === '') {
            return '';
        }
    }
    return prevs;
}

// 获取数组中的数量最大值和最小值字符串，最大值和最小值的字符串的最长公共前缀也是其他字符的最长公共前缀，也是字符串数组的最长公共前缀
// 复杂度：时间复杂度O(strs.length + strs[min].length) 空间复杂度O(1)
const longestCommonPrefixII = (strs) => {
    if (strs === null || strs.length === 0) {
        return '';
    }

    if (strs.length === 1) {
        return strs[0];
    }

    let min = 0, max = 0;
    // 获取最长和最短字符串再数组中的索引
    for (let i = 1; i < strs.length; i++) {
        if (strs[min] > strs[i]) {
            min = i;
        }
        if (strs[max] < strs[i]) {
            max = i;
        }
    }

    // 按照最短字符串遍历，寻找最长字符串和最短字符串中的公共前缀
    for (let j = 0; j < strs[min].length; j++) {
        if (strs[min].charAt(j) !== strs[max].charAt(j)) {
            return strs[min].substring(0, j);
        }
    }

    return strs[min];
}

// 解法3：使用分治策略，归并思想
// 时间复杂度：O(s)，s 是所有字符串中字符数量的总和
// 空间复杂度：O(m*logn)，n是数组的长度，m为字符串数组中最长字符的长度
const longestCommonPrefixIII = (strs) => {
    if (strs === null || strs.length === 0) {
        return '';
    }
    return LCPRec(strs);
}

// 分治
const LCPRec = (arr) => {
    const length = arr.length;
    if (length === 1) {
        return arr[0];
    }

    let mid = Math.floor(length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid, length);

    return LCPRecTwo(LCPRec(left), LCPRec(right));
}

// 归并，求两个字符串的最长公共前缀
const LCPRecTwo = (arr1, arr2) => {
    let j;
    for (j = 0; j < arr1.length && j < arr2.length; j++) {
        if (arr1.charAt(j) !== arr2.charAt(j)) {
            break;
        }
    }

    return arr1.substring(0, j);
}


const strs = ["flower","flow","flight"];
console.log('解法1：逐个比较字符串获取最长公共前缀：', longestCommonPrefix(strs));
console.log('解法2：从最长和最短字符串中获取最长公共前缀：', longestCommonPrefixII(strs));
console.log('解法3：通过分治和归并思想获取最长公共前缀：', longestCommonPrefixIII(strs));