/**
* name: p45_jump
* description:
* author: Ramona Chen
* time: 2025-06-08 16:43:22
* {@link }
*/

/**
 * 45. 跳跃游戏 II https://leetcode.cn/problems/jump-game-ii/description/?envType=study-plan-v2&envId=top-interview-150
 * @param nums
 * @return {number}
 */
const jump = (nums) => {
    // 跳转最小次数
    let step = 0;
    // 跳跃的最大位置
    let maxPosition = 0;
    // 下一次到达的最远距离
    let nextPosition = 0;

    // 生成的测试用例可以到达 nums[n - 1]
    for (let curIndex = 0; curIndex < nums.length - 1; curIndex++) {
        maxPosition = Math.max(maxPosition, curIndex + nums[curIndex]);

        if (curIndex === nextPosition) {
            nextPosition = maxPosition;
            step++;
        }
    }

    return step;
}

const nums = [2,3,1,1,4];
console.log(jump(nums));