/**
 * 剑指 Offer 09. 用两个栈实现队列 https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/description/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/34
 * @constructor
 */
const CQueue = function () {
    this.mainStack = []; // 主栈,用于在队尾插入整数
    this.subStack = []; // 辅助栈，用于再队列头部删除整数
}

/**
 * 在队列尾部插入整数
 * @param value
 */
CQueue.prototype.appendTail = function (value) {
    this.mainStack.push(value);
}

/**
 * 在队列头部删除整数
 */
CQueue.prototype.deleteHead = function () {
    if (this.subStack.length === 0) {
        if (this.mainStack.length === 0) {
            return -1;
        }
        while (this.mainStack.length > 0) {
            this.subStack.push(this.mainStack.pop());
        }
    }
    return this.subStack.pop();
}

const queue = new CQueue();
console.log(queue.deleteHead());
queue.appendTail(5);
queue.appendTail(2);
console.log(queue.deleteHead());
console.log(queue.deleteHead());
