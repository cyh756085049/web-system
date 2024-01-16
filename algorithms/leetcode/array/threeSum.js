/**
 * 15. 三数之和 https://leetcode.cn/problems/3sum/
 *
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]]
 * 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
 * 你返回所有和为 0 且不重复的三元组。
 *
 * 思路：双指针
 * 时间复杂度：O(n*n) 分析：数组排序时间复杂度 O(nlogn),遍历数组O(n),双指针遍历O(n)
 * 空间复杂度：O(1) 只申请了常数变量
 * @param nums
 */
const threeSum = (nums) => {
    // 首先对数组排序，便于后面去重三元组
    nums.sort((a, b) => a - b);

    // 定义一个结果数组
    let resArray = [];

    // 因为是三元组，需要判断3个元素，后两个元素基于末尾元素和当前元素的下一个元素，所以右边界为 nums.length - 2
    for (let i = 0; i < nums.length - 2; i++) {
        // 特殊情况判定：如果排序后的数组，第一个元素已经大于0了，那么将不会存在三元组和为0,直接返回
        if (nums[0] > 0) {
            return resArray;
        }

        // 重复三元组判定：如果当前值等于前一个值，则说明会存在重复的三元组，则继续到下一个数值
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        // 以上剪枝完成，定义两个指针，分别指向当前元素的下一个元素和末尾的元素
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            // 计算三数之和
            const threeSum = nums[i] + nums[left] + nums[right];

            if (threeSum > 0) { // 三数之和大于0,右指针往左走
                right--;
            } else if (threeSum < 0) { // 三数之和小于0,左指针往左走
                left++;
            } else { // 三数之和等于0，找到三元组,将其加入到结果数组中，并且左右指针分别向左和向右一步
                resArray.push([nums[i], nums[left], nums[right]]);

                // 继续剪枝，判定当前左指针元素和下一个元素或者右指针元素和上一个元素是否相同，如果相同，说明存在三元组
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
    return resArray;
}

const nums = [-1,0,1,2,-1,-4];
console.log(threeSum(nums));