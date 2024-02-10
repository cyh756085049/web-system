/**
 * 239. 滑动窗口最大值 https://leetcode.cn/problems/sliding-window-maximum/description/?envType=study-plan-v2&envId=top-100-liked
 维护一个单调递减队列，保证队列里的元素是从大到小的
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = (nums, k) => {
    // 设置双端队列存储窗口中的值的索引，保证双端队列中第一个元素永远是最大值
    const queue = [];
    // 保存结果集
    const res = [];
    for (let i = 0; i < nums.length; i++) {
        // 比较当前元素索引和双端队列队首元素相差大于等于 k,队首出列
        if (i - queue[0] >= k) {
            queue.shift();
        }
        // 队尾元素对应的数组值小于等于当前元素，队尾出列
        while (nums[queue[queue.length - 1]] <= nums[i]) {
            queue.pop();
        }
        // 元素索引入队
        queue.push(i);
        // 从第k - 1次遍历开始，依次把最大值添加到结果集中
        if (i >= k - 1) {
            res.push(nums[queue[0]]);
        }
    }
    return res;
}

const nums = [1,3,-1,-3,5,3,6,7];
const k = 3;
console.log('滑动窗口最大值：', maxSlidingWindow(nums, k));