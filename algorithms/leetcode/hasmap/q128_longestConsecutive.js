/**
 * 128. 最长连续序列 https://leetcode.cn/problems/longest-consecutive-sequence/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = (nums) => {
    if (!nums.length) {
        return 0;
    }

    // 用来保存数组中的数字，保证以O(1)的复杂度去取值
    const set = new Set();
    for (let num of nums) {
        set.add(num);
    }
    let longestLength = Number.MIN_VALUE;

    // 如果当前遍历的数字 num - 1 存在于set中，则直接跳过，否则，表示存在以num为开始的子序列，设置长度为1，再把当前的值+1，判断
    // 是否存在于set中，如果存在，则继续加1
    for (let num of set) {
        if (!set.has(num - 1)) { // 不加这一条判断，leetcode提交会超出时间限制
            let curNum = num;
            let curLongestLength = 1;
            while (set.has(curNum + 1)) {
                curNum++;
                curLongestLength++;
            }
            longestLength = Math.max(longestLength, curLongestLength);
        }
    }

    return longestLength;
}

/**
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 */

const nums1 = [100, 4, 200, 1, 3, 2];
const nums2 = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
console.log('最长连续序列：', longestConsecutive(nums1), longestConsecutive(nums2));
