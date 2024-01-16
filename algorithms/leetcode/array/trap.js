/**
 * 42. 接雨水 https://leetcode.cn/problems/trapping-rain-water/
 * 思路：总面积（使用双指针计算总面经） - 陆地面积（所有柱子的面积和）
 * @param heights
 */
const trap = (heights) => {
    const length = heights.length;
    // 剪枝，数组长度小于3时，不可能接到雨水
    if (length < 3) {
        return 0;
    }

    // 定义左右指针
    let left = 0, right = length - 1;
    // 定义一个前一层的高度，初始化为0，之后根据层数高度更新
    let preHeight = 0;

    // 求陆地面积
    const landArea = heights.reduce((preValue, curValue) => preValue + curValue, 0);

    // 定义总面积
    let totalArea = 0;
    while (left < right) {
        // 左指针右移，右指针左移，跳过所有高度小于等于前一层高度的点
        while (left < right && heights[left] <= preHeight) {
            left++;
        }
        while (left < right && heights[right] <= preHeight) {
            right--;
        }
        const curMinHeight = Math.min(heights[left], heights[right]);
        totalArea = totalArea + (curMinHeight - preHeight) * (right - left + 1);
        // 更新前一层的高度
        preHeight = curMinHeight;
    }

    return totalArea - landArea;
}

const heights = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log('接雨水问题：', trap(heights));