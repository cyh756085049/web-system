/**
 * 15、三数之和 https://leetcode.cn/problems/3sum/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，
 * 同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

 思路：双指针
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = (nums) => {
    if (nums.length < 3) {
        return [];
    }
    // 首先对数组进行排序，便于后面去重三元组
    nums.sort((a, b) => a - b);

    // 定义一个结果数组
    let res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        // 按照升序排序后的数组，如果当前值大于0，则不会存在三个整数和为0的情况，直接返回结果数组
        if (nums[i] > 0) {
            return res;
        }
        // 如果当前值等于前一个值，则表明会存在重复的三元组，则直接继续到下一个数值
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        // 通过以上剪枝完成后，定一个两个指针，分别指向 当前值的下一个位置和末尾位置
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            // 计算三数之和
            const sum = nums[i] + nums[left] + nums[right];

            if (sum > 0) {
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                res.push([nums[i], nums[left], nums[right]]);

                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }

                left++;
                right--;
            }
        }
    }

    return res;
}

/**
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 */

const nums = [-1,0,1,2,-1,-4];
console.log(threeSum(nums));