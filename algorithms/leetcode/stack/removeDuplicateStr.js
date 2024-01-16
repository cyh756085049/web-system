/**
 * 面试真题：删除字符串中出现次数 >= 2 次的相邻字符
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/28
 * 复杂度：时间复杂度O(n) 空间复杂度O(n)
 * @param s
 */
const removeDuplicateStr = (s) => {
    const stack = [];
    let stackTop;
    let next;
    let i = 0;
    while (i < s.length) {
        stackTop = stack[stack.length - 1];
        next = s[i];
        // 字符串中出现相邻的字符
        if (next === stackTop) {
            // 移除栈顶字符
            stack.pop();
            // 移动指针，指向下一个不同的字符
            while (s[i] === stackTop) {
                i += 1;
            }
        } else {
            stack.push(next);
            i += 1;
        }
    }
    return stack.join('');
}

const s = "abbbaca";
console.log('栈实现：删除字符串中出现次数 >= 2 次的相邻字符', removeDuplicateStr(s));