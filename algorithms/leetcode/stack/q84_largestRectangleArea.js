/**
 * 84.柱状图中最大的矩形 https://leetcode.cn/problems/largest-rectangle-in-histogram/description/
 * 题解：https://leetcode.cn/problems/largest-rectangle-in-histogram/solutions/267385/wo-yong-qiao-miao-de-bi-yu-jiang-dan-diao-zhan-jie/
 */
const largestRectangleArea = (heights) => {
    let maxArea = 0;
    // 维护一个单调递增栈，记录 heights 的 bar 的索引，高度为bar的高度，通过索引用于计算面经的宽度
    const stack = [];
    // 首部设立一个高为 0 的虚拟 bar，可以保证让第一条 bar 入栈，且该虚拟 bar 比任何 bar 都低，永不出栈
    // 尾部设立一个高为 0 的虚拟 bar, 可以保证最后一个 bar 出栈。
    heights = [0, ...heights, 0];
    for (let i = 0; i < heights.length; i++) {
        // 比较当前bar的高度和栈顶的高度，如果小于栈顶高度，则计算面积
        while (heights[i] < heights[stack[stack.length - 1]]) {
            // 栈顶元素出栈，并保存栈顶bar的索引
            const stackTopIndex = stack.pop();
            // 计算面积，并更新最大面积
            const curBarArea = heights[stackTopIndex] * (i - stack[stack.length - 1] - 1);
            maxArea = Math.max(maxArea, curBarArea);
        }
        // 大于栈顶高度，直接入栈，维护递增栈
        stack.push(i);
    }
    return maxArea;
}

const heights = [2,1,5,6,2,3];
console.log('柱状图中最大的矩形:', largestRectangleArea(heights));