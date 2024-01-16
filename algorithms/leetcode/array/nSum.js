/**
 * n数之和 https://github.com/sisterAn/JavaScript-Algorithms/issues/128
 * 公司：字节
 * 请用算法实现，从给定的无需、不重复的数组A中，取出N个数，使其相加和为M。并给出算法的时间、空间复杂度
 * @param nums 目标数组
 * @param count 选择元素数量
 * @param targetSum 目标和
 */
// 思路1：二进制
const nSum = (nums, count, targetSum) => {
    let len = nums.length;
    let bit = 1 << len;
    let res = [];

    // 使用位元素计算数字转化成二进制中的1的个数
    const getCount = num => {
        let count = 0;
        while (num) {
            num &= (num - 1);
            count++;
        }
        return count;
    }

    console.log('bit', bit);
    for (let i = 1; i < bit; i++) {
        if (getCount(i) === count) {
            let sum = 0, temp = [];
            for (let j = 0; j < len; j++) {
                if (i & 1 << (len - 1 - j)) {
                    sum += nums[j];
                    temp.push(nums[j]);
                }
            }
            if (sum === targetSum) {
                res.push(temp);
            }
        }
    }

    return res;
}

// 思路2：回溯
const nSumII = (nums, count, targetSum) => {
    nums.sort((a, b) => a- b);

    const result = [];
    let stack = [];

    const backTrace = (start) => {
        if (stack.length === count - 1) {
            let end = nums.length - 1;

            while (start <= end) {
                const sum = stack.reduce((cur, pre) => cur + pre);
                if (sum + nums[start] === m) {
                    result.push([...stack, nums[start]]);
                }
                if (start !== end && sum + nums[end] === m) {
                    result.push([...stack, nums[end]]);
                }
                start++;
                end--;
            }
            return;
        }
        for (let i = start; i < nums.length; i++) {
            stack.push(nums[i]);
            backTrace(i + 1);
            stack.pop();
        }
    }
    backTrace(0);
    return result;
}

/**
 * 用例：
 var arr = [1, 4, 7, 11, 9, 8, 10, 6];
 var N = 3;
 var M = 27;

 Result: [7, 11, 9], [11, 10, 6], [9, 8, 10]
 */

let nums = [1, 4, 7, 11, 9, 8, 10, 6], n = 3, m = 27;
console.log('n数之和-二进制位运算', nSum(nums, n, m));
console.log('n数之和-回溯', nSumII(nums, n, m));

// 前置条件----------------------------------------------------------------
// 从数组中取出 n 个数，如何判断每个元素对应的二进制中的 1 有几个
const num = 5;
// 方式1：将数字转化为二进制，通过正则表达式匹配，将0去除掉，就只剩下1，返回其结果长度
const getHasOneCounts = num => {
    // 转化数字为二进制数
    const bitNum = num.toString(2);
    // 使用正则表达式替换二进制数中所有的0
    const hasOneNum = bitNum.replace(/0/g, '');
    // 返回数字对应的二进制中1的个数
    return hasOneNum.length;
}
console.log('二进制统计次数', getHasOneCounts(num));
// 方式2：位运算 1&0=0、 1&1=1 ，1111&1110=1110，即 15&14=14 ，所以我们每次 & 比自身小 1 的数都会消除一个 1
const getHasOneCountsII = num => {
    let count = 0;
    // 迭代元素，统计消除的次数
    while (num) {
        num &= (num - 1);
        count++;
    }
    return count;
}
console.log('位运算统计次数', getHasOneCountsII(num));
