/**
 * 17. 电话号码的字母组合 https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * @param digits
 * @return {[]|*[]}
 */
const letterCombinations = (digits) => {
    if (digits.length === 0) {
        return [];
    }
    // 建立电话号码和字母的映射关系
    const phoneMap = {
        0: '',
        1: '',
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    };
    // 结果数据集
    const res = [];

    // 递归回溯：流程为 ad、ae、af、bd、be、bf、cd、ce、cf
    const dfs = (curStr, index) => {
        if (index === digits.length) {
            res.push(curStr);
            return;
        }

        const letters = phoneMap[digits[index]];
        for (let letter of letters) {
            dfs(curStr + letter, index + 1);
        }
    }

    dfs('', 0);

    return res;
}

/**
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 */

const digits = "23";
console.log(letterCombinations(digits));