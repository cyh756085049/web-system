/**
 * 155. 最小栈 https://leetcode.cn/problems/min-stack/description/
 * 初始化堆栈对象
 * @constructor
 */
const MinStack = function () {
    this.mainStack = []; // 维护主栈
    this.minStack = []; // 维护最小栈，栈顶元素始终为最小值
}

/**
 * 将元素val推入堆栈
 * @param val
 */
MinStack.prototype.push = function (val) {
    // 最小栈为空 或者 最小栈顶元素大于当前元素
    if (this.minStack.length === 0 || this.minStack[this.minStack.length - 1] >= val) {
        this.minStack.push(val);
    }
    this.mainStack.push(val);
}

/**
 * 删除堆栈顶部的元素
 */
MinStack.prototype.pop = function () {
    // 先删除主栈栈顶元素，再更新最小栈
    const topValue = this.mainStack.pop();
    // 如果最小栈中有元素，且栈顶元素等于主栈栈顶元素，则删除最小栈栈顶元素
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