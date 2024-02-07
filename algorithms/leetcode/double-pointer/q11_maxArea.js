/**
 * 11. 盛最多水的容器 https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。
 * @param {number[]} height
 * @return {number}
 */
const maxArea = (height) => {
    // 定义左指针和右指针，左指针指向左侧，右指针指向右侧
    let left = 0, right = height.length - 1;

    // 定义盛最多水的容器
    let maxArea = Number.MIN_VALUE;
    for (let i = 0; i < height.length; i++) {
        // 盛水的容器计算公式
        let area = (right - left) * Math.min(height[left], height[right]);
        maxArea = Math.max(area, maxArea);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
}

/**
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 */

const heights = [1,8,6,2,5,4,8,3,7];
console.log('盛最多水的容器：', maxArea(heights));