/**
 * 20. 有效的括号 https://leetcode.cn/problems/valid-parentheses/description/
 * 思路：栈
 * 复杂度：时间复杂度o(n) 空间复杂度o(n)
 * @param s
 */
const isValid = (s) => {
    const map = {
        '{': '}',
        '[': ']',
        '(': ')',
    };

    const stack = [];
    for (let item of s) {
        console.log('当前item', item);
        if (item in map) {
            stack.push(item);
            continue;
        }
        console.log('栈中元素', stack);
        if (map[stack.pop()] !== item) {
            return false;
        }
    }
    return !stack.length;
}

const s = "()[]{}";
console.log('有效的括号：', isValid(s));