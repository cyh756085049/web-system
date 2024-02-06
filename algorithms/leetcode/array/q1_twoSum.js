/**
 * 1. 两数之和 https://leetcode.cn/problems/two-sum/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：哈希
 */
const twoSum = (nums, target) => {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const resNum = target - nums[i];
        if (map.has(resNum)) {
            return [i, map.get(resNum)];
        } else {
            map.set(nums[i], i);
        }
    }
    return [-1, -1];
}

/**
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
 */

const nums = [2,7,11,15], target = 9;
console.log('两数之和：', twoSum(nums, target));