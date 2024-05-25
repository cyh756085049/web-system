/**
 * 32.最长有效括号 https://leetcode.cn/problems/longest-valid-parentheses/description/?envType=study-plan-v2&envId=top-100-liked
 * @param s
 * @return {number}
 */
const longestValidParentheses = (s) => {
    // 保存字符串遍历到左括号保存的下标
    let stack = [];
    stack.push(-1);
    let maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === '(') {
            stack.push(i);
        } else {
            // 如果初始字符为 ）, 也需要出栈，所以开始使用了 stack.push(-1)
            stack.pop(); // 出栈
            // 这步是为了兼容遇到 ) 且栈空的情况，将当前的字符串下标加入到栈中，进行下次遍历，保证最大长度的更新
            if (stack.length === 0) {
                stack.push(i);
            } else {
                // 更新最大长度，当前遍历到的下标位置i - （当前栈顶的左括号下标）等于当前匹配成功的有效括号的长度
                maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
            }
        }
    }

    return maxLength;
}

/**
 * 思路：动态规划，参考题解
 * https://leetcode.cn/problems/longest-valid-parentheses/solutions/3833/zui-chang-you-xiao-gua-hao-by-powcai/?envType=study-plan-v2&envId=top-100-liked
 * 可看题解最下方的图例结合理解
 * 当 s[i] 为 (, dp[i] 必然等于 0，因为不可能组成有效的括号；
 * 当 s[i] 为 )
 * 2.1 当 s[i-1] 为 (，那么 dp[i] = dp[i-2] + 2；
 * 2.2 当 s[i-1] 为 ) 并且 s[i-dp[i-1] - 1] 为 (，那么 dp[i] = dp[i-1] + 2 + dp[i-dp[i-1]-2]；
 * @param s
 * @return {number}
 */
const longestValidParenthesesDP = (s) => {
    if (!s || s.length === 0) {
        return 0;
    }

    // dp[i] 表示以i为结尾的最长有效括号的长度
    const dp = new Array(s.length).fill(0);
    let maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        if (i > 0 && s.charAt(i) === ')') {
            if (s.charAt(i - 1) === '(') {
                dp[i] = i - 2 >= 0 ? dp[i - 2] + 2 : 2;
            } else if (s.charAt(i - 1) === ')' && i - dp[i - 1] - 1 >= 0 && s.charAt(i - dp[i - 1] - 1) === '(') {
                dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }

    return maxLength;
}


const s = ")()())";
console.log('有效的括号：', longestValidParentheses(s));
console.log('有效的括号-动态规划：', longestValidParenthesesDP(s));