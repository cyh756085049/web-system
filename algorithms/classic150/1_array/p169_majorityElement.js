/**
* name: p169_majorityElement
* description: 记录一个当前的数字，默认值为数组索引为0的元素，记录一个当前数字出现的次数，默认为1，然后从索引1开始遍历数组，
 * 当当前遍历数字等于记录的数字时，数字次数加1，当不等于时，且数字次数为0时，将遍历当前数字赋值给记录的数字，将数字次数重新更
 * 新为1，类似数字相消法，最后数字次数减1
* author: Ramona Chen
* time: 2025-06-08 10:41:20
* {@link }
*/

/** 169. 多数元素 https://leetcode.cn/problems/majority-element/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let curNum = nums[0];
    let count = 1;

    for (let i = 1; i < nums.length; i++) {
        if (curNum === nums[i]) {
            count++;
        } else {
            if (count === 0) {
                curNum = nums[i];
                count = 1;
            }

            count--;
        }
    }

    return curNum;
};