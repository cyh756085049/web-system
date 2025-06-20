/**
* name: p42_trap
* description: 双指针
* author: Ramona Chen
* time: 2025-06-17 09:07:24
* {@link }
*/

/** 42.接雨水 https://leetcode.cn/problems/trapping-rain-water/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    if (!height || height.length < 3) {
        return 0;
    }

    const landArea = height.reduce((pre, cur) => cur + pre, 0);

    let left = 0;
    let right = height.length - 1;
    let curArea = 0;
    let preHeight = 0;

    while (left < right) {
        while (left < right && height[left] <= preHeight) {
            left++;
        }

        while (left < right && height[right] <= preHeight) {
            right--;
        }

        curArea += (Math.min(height[left], height[right]) - preHeight) * (right - left + 1);
        preHeight = Math.min(height[left], height[right]);
    }

    return curArea - landArea;
};


// 暴力解法
// 思路是：寻找每一个柱子的左侧和右侧是否存在比当前柱子的较大元素，如果存在，则比较左侧和右侧的较小值，然后和当前柱子比较，如果小于当前柱子，说明能接到雨水
const trapBase = (height) => {
    if (!height || !height.length) {
        return 0;
    }

    const n = height.length;
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        // 寻找当前元素左侧较大的元素
        let leftMax = height[i];
        for (let j = i - 1; j >= 0; j--) {
            leftMax = Math.max(leftMax, height[j]);
        }

        // 找当前元素右侧较大的元素
        let rightMax = height[i];
        for (let j = i + 1; j < n; j++) {
            rightMax = Math.max(rightMax, height[j]);
        }

        // 寻找左右两侧的较小值，然后和当前柱子作差，判断是否存在凹槽
        const lowerHeight = Math.min(leftMax, rightMax);
        const diff = lowerHeight - height[i];

        if (diff > 0) {
            maxArea += diff;
        }
    }

    return maxArea;
}

// 动态规划
const trapDp = (height) => {
    if (!height || !height.length) {
        return 0;
    }

    const n = height.length;
    let leftDp = new Array(n).fill(0)
    leftDp[0] = height[0];

    let rightDp = new Array(n).fill(0);
    rightDp[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightDp[i] = Math.max(height[i], rightDp[i + 1]);
    }

    let maxArea = 0;
    for (let i = 1; i < n; i++) {
        leftDp[i] = Math.max(height[i], leftDp[i - 1]);

        const lowerHeight = Math.min(leftDp[i], rightDp[i]);
        const diff = lowerHeight - height[i];

        if (diff > 0) {
            maxArea += diff;
        }
    }

    return maxArea;
}

const height = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log('双指针', trap(height));
console.log('暴力', trapBase(height));
console.log('动态规划', trapDp(height));
