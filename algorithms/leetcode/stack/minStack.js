/**
 * 155. 最小栈 https://leetcode.cn/problems/min-stack/description/
 * 初始化堆栈对象
 * @constructor
 */
const MinStack = function () {
    this.mainStack = [];
    this.minStack = [];
}

/**
 * 将元素val推入堆栈
 * @param val
 */
MinStack.prototype.push = function (val) {
    if (this.minStack.length === 0 || this.minStack[this.minStack.length - 1] >= val) {
        this.minStack.push(val);
    }
    this.mainStack.push(val);
}

/**
 * 删除堆栈顶部的元素
 */
MinStack.prototype.pop = function () {
    const topValue = this.mainStack.pop();
    if (this.minStack.length > 0 && this.minStack[this.minStack.length - 1] === topValue) {
        this.minStack.pop();
    }
}

/**
 * 获取堆栈顶部的元素
 */
MinStack.prototype.top = function () {
    if (!this.mainStack || !this.mainStack.length) {
        return;
    }
    return this.mainStack[this.mainStack.length - 1];
}

/**
 * 获取堆栈中的最小元素
 * @return {*}
 */
MinStack.prototype.getMin = function () {
    if (!this.minStack || !this.minStack.length) {
        return;
    }
    return this.minStack[this.minStack.length - 1];
}

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin());   // 返回 -3.
minStack.pop();
console.log(minStack.top());      // 返回 0.
console.log(minStack.getMin());   // 返回 -2.