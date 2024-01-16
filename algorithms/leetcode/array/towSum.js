/**
 * 1. 两数之和 https://leetcode.cn/problems/two-sum/
 * 在该数组nums 中找出 和为目标值 target 的那两个整数，并返回它们的数组下标。
 *
 * 思路：哈希表
 * 时间复杂度 O(n) 空间复杂度 O(n)
 * @param nums 数组
 * @param target 目标值
 */
const twoSum = (nums, target) => {
    // 要求返回数组下标，则循环遍历索引，将当前遍历到的值加入map中，用目标值减去当前值判断是否存在于哈希表中，存在则说明存在两个和为target的元素
    // 创建一个哈希表，key：保存当前元素 value：保存当前元素的索引
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const curNum = target - nums[i];
        if (map.has(curNum)) {
            return [i, map.get(curNum)];
        } else {
            map.set(nums[i], i);
        }
    }
    return [-1, -1];
}

// const nums = [2,7,11,15], target = 9;
const nums = [3,2,4], target = 6;
console.log(twoSum(nums, target));