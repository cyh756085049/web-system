const longestValidParentheses = (s) => {
    const stack = [];
    stack.push(-1);
    let maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
            }
        }
    }
    return maxLength;
}

/**
 * 输入：s = ")()())"
 * 输出：4
 * 解释：最长有效括号子串是 "()()"
 */

const s = ")()())";
// const s = "(()";
console.log(longestValidParentheses(s));