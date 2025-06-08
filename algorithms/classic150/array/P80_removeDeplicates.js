/**
* name: P80_removeDeplicates
* description: 快慢双指针
* author: Ramona Chen
* time: 2025-06-07 17:30:37
* {@link }
*/

/** 80. 删除有序数组中的重复项 II https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (!nums.length || nums.length <= 2) {
        return nums.length;
    }

    let slowIndex = 2; //慢指针，表示处理后数组的有效长度
    // 快指针，遍历数组，寻找符合条件的元素
    for (let fastIndex = 2; fastIndex < nums.length; fastIndex++) {
        // 保证每个元素最多出现2次，
        if (nums[fastIndex] !== nums[slowIndex - 2]) {
            // 复制元素，以慢指针为结果数组
            nums[slowIndex] = nums[fastIndex];
            // 更新慢指针
            slowIndex++;
        }
    }

    // 最后返回有效数组的长度，即慢指针的索引，因为一开始初始化为slowIndex = 2
    return slowIndex;
};

const nums = [1,1,1,2,2,3];
console.log(removeDuplicates(nums));