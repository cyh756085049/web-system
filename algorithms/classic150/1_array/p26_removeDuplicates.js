/**
* name: p26_removeDuplicates
* description:
* author: Ramona Chen
* time: 2025-06-05 21:56:00
* {@link }
*/

/** 26. 删除有序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let slowIndex = 0; // 慢指针
    let fastIndex = 0; // 快指针

    while (fastIndex < nums.length && slowIndex < nums.length) {
        // 快指针的值等于慢指针的值，快指针继续向前
        if (nums[fastIndex] === nums[slowIndex]) {
            fastIndex++;
        } else {
            // 快指针和慢指针对应的值不一致，慢指针先加1，然后将快指针的值赋值给慢指针
            slowIndex++;
            nums[slowIndex] = nums[fastIndex];
        }
    }

    // 最终返回数组唯一元素的个数即为慢指针的索引加1
    return slowIndex + 1;
};

const nums = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(nums));