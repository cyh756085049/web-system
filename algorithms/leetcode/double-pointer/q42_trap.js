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

// ----------------------暴力法----------------------

/**
 * 暴力法，时间复杂度 O(n*n) 空间复杂度 O(1)
 * @param heights
 * @return {number}
 */
const trapBase = (heights) => {
    if (!heights || heights.length === 0) {
        return 0;
    }

    let maxArea = 0;
    const n = heights.length;

    for (let i = 0; i < n; i++) {
        let leftMax = heights[i];
        // 寻找当前值左侧最高的柱子
        for (let j = i - 1; j >= 0; j--) {
            leftMax = Math.max(leftMax, heights[j]);
        }

        // 寻找当前值右侧最高的柱子
        let rightMax = heights[i];
        for (let j = i + 1; j < n; j++) {
            rightMax = Math.max(rightMax, heights[j]);
        }

        // 筛选左右两侧最高柱子中较低的柱子
        const lowerHeight = Math.min(leftMax, rightMax);

        // 计算较低柱子和当前柱子高度水位差
        const diff = lowerHeight - heights[i];

        // 水位差大于0,则说明能接住雨水，将其加入到接到的雨水面积中
        if (diff > 0) {
            maxArea += diff;
        }
    }

    return maxArea;
}

// 优化1： 每次遍历左右最大高度计算重复，通过动态规划保存上一次已经遍历过的数据，降低时间复杂度
// 时间复杂度 O(n) 空间复杂度 O(n)
const trapBaseII = (heights) => {
    if (!heights || heights.length === 0) {
        return 0;
    }

    let maxArea = 0;
    const n = heights.length;

    let rightMaxArr = new Array(n);

    rightMaxArr[n - 1] = heights[n - 1];
    for (let j = n - 2; j >= 0; j--) {
        rightMaxArr[j] = Math.max(rightMaxArr[j + 1], heights[j]);
    }

    let leftMax = heights[0];
    for (let i = 0; i < n; i++) {
        leftMax = Math.max(leftMax, heights[i]);

        // 寻找当前值右侧最高的柱子
        let rightMax = rightMaxArr[i];

        // 筛选左右两侧最高柱子中较低的柱子
        const lowerHeight = Math.min(leftMax, rightMax);

        // 计算较低柱子和当前柱子高度水位差
        const diff = lowerHeight - heights[i];

        // 水位差大于0,则说明能接住雨水，将其加入到接到的雨水面积中
        if (diff > 0) {
            maxArea += diff;
        }
    }

    return maxArea;
}

// 优化2：优化空间
const trapBaseI = (heights) => {
    if (!heights || heights.length === 0) {
        return 0;
    }

    let maxArea = 0;
    const n = heights.length;

    let left = 0;
    let right = n - 1;

    let leftMax = heights[0];
    let rightMax = heights[n - 1];

    while (left <= right) {
        leftMax = Math.max(leftMax, heights[left]);
        rightMax = Math.max(rightMax, heights[right]);
        const lowerHeight = Math.min(leftMax, rightMax);

        let curHeight;
        if (lowerHeight === leftMax) {
            curHeight = heights[left];
            left++;
        } else {
            curHeight = heights[right];
            right--;
        }

        const diff = lowerHeight - curHeight;

        if (diff > 0) {
            maxArea += diff;
        }
    }
    return maxArea;
}

/**
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * @type {number[]}
 */
const heights = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log(trap(heights));
console.log('暴力法', trapBase(heights));
console.log('暴力法-优化1，动态规划，空间换时间', trapBaseI(heights));
