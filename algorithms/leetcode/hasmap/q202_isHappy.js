/**
 * 思路：快慢指针
 * 题解：https://leetcode.cn/problems/happy-number/?envType=study-plan-v2&envId=top-interview-150
 * @param {number} n
 * @return {boolean}
 */
const isHappy = function(n) {
    let slow = n;
    let fast = getSum(n);

    while (fast !== 1 && fast !== slow) {
        slow = getSum(slow);
        fast = getSum(getSum(fast));
    }

    return fast === 1;
};

const getSum = (n) => {
    return n.toString().split('').map(i => i ** 2).reduce((pre, cur) => pre + cur);
}

const n = 2;
console.log('快乐数', isHappy(n));