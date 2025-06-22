/**
* name: p238_productExceptSelf
* description: 左右各遍历一遍
* author: Ramona Chen
* time: 2025-06-10 09:34:28
* {@link }
*/

/**
 238. 除自身以外数组的乘积 https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function(nums) {
    const answer = new Array(nums.length).fill(1);
    let leftProduct = 1;

    for (let i = 0; i < nums.length; i++) {
        answer[i] *= leftProduct;
        leftProduct *= nums[i];
    }

    let rightProduct = 1;
    for (let j = nums.length - 1; j >= 0; j--) {
        answer[j] *= rightProduct;
        rightProduct *= nums[j];
    }

    return answer;
};

const nums = [1,2,3,4];
console.log(productExceptSelf(nums));