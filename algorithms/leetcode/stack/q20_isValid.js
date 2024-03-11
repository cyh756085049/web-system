/**
 * 20. 有效的括号 https://leetcode.cn/problems/valid-parentheses/description/
 * 思路：栈
 * 复杂度：时间复杂度o(n) 空间复杂度o(n)
 * @param s
 */
const isValid = (s) => {
    // 先将所有匹配的括号进行映射
    const map = {
        '{': '}',
        '[': ']',
        '(': ')',
    };

    // 定义一个栈，用来保存左括号
    const stack = [];
    // 遍历字符串
    for (let item of s) {
        // 如果当前字符在 map 映射中，则将其入栈，并跳出本次循环，进行下一轮循环判断
        if (item in map) {
            stack.push(item);
            continue; // 跳出本次循环
        }
        // 如果当前字符不在 map 映射中，则需要出栈，并判断出栈元素的 map 映射值 是否等于当前字符括号
        // 不等于则说明括号不匹配，直接返回 false 退出
        if (map[stack.pop()] !== item) {
            return false;
        }
    }

    // 最后如果栈里元素全部出队，则说明括号字符串有效
    return !stack.length;
}

const s = "()[]{}";
console.log('有效的括号：', isValid(s));