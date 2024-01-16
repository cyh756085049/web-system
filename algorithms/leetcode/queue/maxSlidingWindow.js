/**
 * 239. 滑动窗口最大值 https://leetcode.cn/problems/sliding-window-maximum/description/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/33
 * @param nums
 * @param k
 * @return {*[]}
 */
const maxSlidingWindow = (nums, k) => {
    // 使用一个双端队列存储窗口中值的索引，并且保证双端队列中第一个元素永远是最大值，只需遍历一次muns，就可取到每次移动的最大值
    const queue = [];
    // 保存结果集
    const res = [];
    for (let i = 0; i < nums.length; i++) {
        // 比较当前元素索引和双端队列第一个索引值元素相差大于等于k时，队首出列
        if (i - queue[0] >= k) {
            queue.shift();
        }
        // 依次比较双端队列队尾元素和当前元素的值，队尾元素值小时出列，知道不存在小于当前元素的值或者队列为空，
        // 保证了当队头出队时，新的队头依旧是最大值
        while (nums[queue[queue.length - 1]] <= nums[i]) {
            queue.pop();
        }
        // 当前元素入队
        queue.push(i);
        // 从第K次遍历开始，依次把最大值添加到结果集中
        if (i >= k - 1) {
            res.push(nums[queue[0]]);
        }
    }
    return res;
}

const maxSlidingWindowII = (nums, k) => {
    let helpQueue = new MonoQueue();
    let left = 0, right = 0;
    let res = [];

    // 先把首次的k个元素添加到单调递减队列
    while (right < k) {
        helpQueue.enqueue(nums[right]);
        right++;
    }
    res.push(helpQueue.front());
    while (right < nums.length) {
        helpQueue.enqueue(nums[right]);
        helpQueue.dequeue(nums[left]);
        res.push(helpQueue.front());
        left++;
        right++;
    }
    return res;
}

// 设计一个单调递减队列，保证队列里的元素是从大到小的
class MonoQueue {
    constructor() {
        this.queue = [];
    }

    /**
     * 入队
     * @param value
     */
    enqueue(value) {
        // 队尾元素存在且当前元素大于队尾元素，则队尾元素出队，直到队尾元素不小于当前元素
        while (this.queue[this.queue.length - 1] !== undefined && value > this.queue[this.queue.length - 1]) {
            this.queue.pop();
        }
        // 入队
        this.queue.push(value);
    }

    /**
     * 出队
     * @param value
     */
    dequeue(value) {
        // 如果当前窗口移除的元素和队列出队口元素相等，则将出队口元素出队
        if (this.front() === value) {
            this.queue.shift();
        }
    }

    /**
     * 返回队首元素
     * @return {*}
     */
    front() {
        return this.queue[0];
    }
}

const nums = [1,3,-1,-3,5,3,6,7], k = 3;
console.log('双端队列实现：滑动窗口的最大值', maxSlidingWindow(nums, k));
console.log('单调递减队列实现：滑动窗口的最大值', maxSlidingWindowII(nums, k));