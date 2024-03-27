/**
 * 22. 括号生成 https://leetcode.cn/problems/generate-parentheses/description/?envType=study-plan-v2&envId=top-100-liked
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * @param n
 * @return {[]}
 */
const generateParenthesis = (n) => {
    const res = [];

    /**
     * 递归
     * @param leftRemain 左括号数量
     * @param rightRemain 右括号数据
     * @param str 构建的字符串
     */
    const dfs = (leftRemain, rightRemain, str) => {
        if (str.length === 2 * n) {
            res.push(str);
            return;
        }

        // 左括号剩余数大于0，选它
        if (leftRemain > 0) {
            dfs(leftRemain - 1, rightRemain, str + '(');
        }

        // 左括号剩余数小于右括号，选右括号
        if (leftRemain < rightRemain) {
            dfs(leftRemain, rightRemain - 1, str + ')');
        }
    }

    // 递归入口，剩余数量为n，初始字符串为空串
    dfs(n, n, '');
    return res;
}

/**
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 */

const n = 3;
console.log(generateParenthesis(n));