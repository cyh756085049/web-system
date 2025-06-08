/**
* name: p27_removeElement
* description: 快慢双指针
* author: Ramona Chen
* time: 2025-06-05 09:23:32
* {@link }
*/

/** 27. 移除元素 https://leetcode.cn/problems/remove-element/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function(nums, val) {
    let slowIndex = 0;

    for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
        if (nums[fastIndex] !== val) {
            nums[slowIndex] = nums[fastIndex];
            slowIndex++;
        }
    }

    return slowIndex;
};

const nums = [3,2,2,3], val = 3;
console.log(removeElement(nums, val));