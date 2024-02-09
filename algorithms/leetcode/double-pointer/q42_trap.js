/**
 * 42. 接雨水 https://leetcode.cn/problems/trapping-rain-water/?envType=study-plan-v2&envId=top-100-liked
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 思路：双指针
 雨水的面积 = 总面积 - 陆地面积
 陆地面积 = 每层面积的和
 * @param {number[]} height
 * @return {number}
 */
const trap = (heights) => {
    const length = heights.length;
    // 剪枝 数组长度小于3时，不可能接到雨水
    if (length < 3) {
        return 0;
    }

    // 定义左右指针
    let left = 0, right = length - 1;

    // 定义一个前一层高度 preHeight, 初始化为 0, 之后跟随层数高度更新
    let preHeight = 0;

    // 求陆地面积
    const landArea = heights.reduce((total, item) => {
        return total + item;
    }, 0);

    // 定义总面积：雨水面积 + 陆地面积
    let totalArea = 0;

    while (left < right) {
        // 步骤1：左指针右移，右指针左移，跳过所有高度小于等于前一层高度的点
        while (left < right && heights[left] <= preHeight) {
            left++;
        }
        while (left < right && heights[right] <= preHeight) {
            right--;
        }

        totalArea = totalArea + (Math.min(heights[left], heights[right]) - preHeight) * (right - left + 1);
        // 更新前一层高度
        preHeight = Math.min(heights[left], heights[right]);
    }

    return totalArea - landArea;
}

/**
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * @type {number[]}
 */
const heights = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log(trap(heights));