/**
 * 55. 跳跃游戏 https://leetcode.cn/problems/jump-game/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个非负整数数组 nums ，你最初位于数组的第一个下标。
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。
 * @param nums
 * @return {boolean}
 */
const canJump = (nums) => {
    /* 1、如果某一个作为 起跳点 的格子可以跳跃的距离是 3，那么表示后面 3 个格子都可以作为 起跳点
        2、可以对每一个能作为 起跳点 的格子都尝试跳一次，把 能跳到最远的距离 不断更新
        3、如果可以一直跳到最后，就成功了
        k 好比修路，只要前面一直有修好的路可以走，i（人）就能一直向前走
     */
    let k = 0; // 能跳到的最远距离
    for (let i = 0; i < nums.length; i++) {
        if (i > k) {
            return false;
        }
        // 当前已经跳到的位置 i 的长度加上当前元素能跳的最大长度 nums[i]
        k = Math.max(k, i + nums[i]);
    }

    return true;
}

const canJumpII = (nums) => {
    let maxPosition = 0;
    for (let currentPosition = 0; currentPosition < nums.length; currentPosition++) {
        // 如果当前位置不可达，则直接返回
        if (currentPosition > maxPosition) {
            return false;
        }
        // 当前位置可达情况
        // 当前位置能跳的最远距离
        const jumpDistance = nums[currentPosition];
        // 更新最远距离
        maxPosition = Math.max(maxPosition, currentPosition + jumpDistance);

        // 最远距离已经大于等于最后一个位置，则说明能跳出去，直接返回
        if (maxPosition >= nums.length - 1) {
            return true;
        }
    }

    return false;
}

/**
 * 输入：nums = [2,3,1,1,4]
 * 输出：true
 * 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 *
 * 输入：nums = [3,2,1,0,4]
 * 输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 */

const nums = [2,3,1,1,4];
console.log(canJump(nums));
console.log(canJumpII(nums));