/**
 * 394. 字符串解码 https://leetcode.cn/problems/decode-string/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 * @param {string} s
 * @return {string}
 */
const decodeString = (s) => {
    // 存数字倍数的栈
    const numsStack = [];
    // 存待拼接的字符串的栈
    const strStack = [];
    // 每一层嵌套数字倍数的临时变量
    let num = 0;
    // 每一层嵌套字符串的临时变量
    let result = '';
    for (let char of s) {
        // 判断出现数字的情况
        // isNaN() 函数用于检查其参数是否是非数字值。如果参数值为 NaN 或字符串、对象、undefined等非数字值则返回 true, 否则返回 false。
        if (!isNaN(char)) {
            // 会存在多位数字的情况，所以要乘以10去计算
            num = num * 10 + Number(char);
        } else if (char === '[') { // 判断出现[的情况
            // 字符串入栈
            strStack.push(result);
            result = '';
            // 倍数数字入栈
            numsStack.push(num);
            // 入栈后清零
            num = 0;
        } else if (char === ']') {
            // 获取待复制的次数
            const repeatTimes = numsStack.pop();
            // 构建子串
            result = strStack.pop() + result.repeat(repeatTimes);
        } else {
            // 遇到字母，追加到结果字符串中
            result += char;
        }
    }

    return result;
}

/**
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 */

const s = "3[a]2[bc]";
console.log(decodeString(s));