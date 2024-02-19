/**
 * 41. 缺失的第一个正数 https://leetcode.cn/problems/first-missing-positive/description/
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
 * 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 * @param {number[]} nums
 * @return {number}
 */
const firstMissingPositive = (nums) => {
    // 哈希表：将所有数字加入到哈希表中，然后从1开始枚举，检查哈希表中是否存在该数字，不存在则直接返回
    const set = new Set();
    for (let num of nums) {
        set.add(num);
    }
    let num = 1;
    while (true) {
        if (set.has(num)) {
            num++;
        } else {
            return num;
        }
    }
}

/**
 * 输入：nums = [1,2,0]
 * 输出：3
 */

const nums = [1,2,0];
console.log(firstMissingPositive(nums));
