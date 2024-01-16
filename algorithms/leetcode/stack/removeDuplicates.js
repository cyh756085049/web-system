/**
 * 1047. 删除字符串中的所有相邻重复项 https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/26
 * 复杂度：时间复杂度O(n) 空间复杂度O(n)
 * @param s
 */
const removeDuplicates = (s) => {
    const stack = [];
    for (let item of s) {
        const prev = stack.pop();
        if (prev !== item) {
            stack.push(prev);
            stack.push(item);
        }
    }
    return stack.join('');
}

const s = "abbaca";
console.log('栈实现：删除字符串中的所有相邻重复项:', '输入字符串：', s, '输出字符串：', removeDuplicates(s));