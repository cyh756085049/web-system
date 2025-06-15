/**
* name: p55_canJump
* description: 动态规划
* author: Ramona Chen
* time: 2025-06-08 16:27:17
* {@link }
*/

/** 55. 跳跃游戏 https://leetcode.cn/problems/jump-game/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = function(nums) {
    // 最大跳跃的长度
    let maxJumpIndex = 0;

    // 遍历当前索引
    for (let curIndex = 0; curIndex < nums.length; curIndex++) {
        // 当前索引位置大于最大跳跃长度，则必不可达
        if (curIndex > maxJumpIndex) {
            return false;
        }

        // 获取当前索引可以跳跃的长度
        const jumpDistance = nums[curIndex];
        // 更新最大跳跃的长度：当前索引 + 可跳跃长度
        maxJumpIndex = Math.max(maxJumpIndex, curIndex + jumpDistance);

        if (maxJumpIndex >= nums.length - 1) {
            return true;
        }
    }

    return false;
};

const nums = [2,3,1,1,4];
console.log(canJump(nums));