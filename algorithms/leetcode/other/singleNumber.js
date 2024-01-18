/**
 * 136. 只出现一次的数字：https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 *
 * 思路：异或运算。异或运算规律如下：
 * 1、一个值与自身运算，始终为 false。示例：x ^ x = 0
 * 2、一个值与0运算，值始终等于值本身。示例：x ^ 0 = x
 * 详细介绍可参看：https://www.ruanyifeng.com/blog/2021/01/_xor.html
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = (nums) => {
    let res = 0;
    for (let num of nums) {
        res ^= num;
    }

    return res;
}

/**
 * 输入：nums = [2,2,1]
 * 输出：1
 *
 * 输入：nums = [4,1,2,1,2]
 * 输出：4
 */

const nums = [4,1,2,1,2];
console.log(singleNumber(nums));