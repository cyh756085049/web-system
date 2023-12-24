const getUnmatchJson = (str) => {
    // 字符串中所有可能的括号的 map 映射
    let map = {
        '{': '}',
        '[': ']',
        '(': ')',
    };

    // 用栈来保存匹配的括号
    const stack = [];
    // 包含所有括号的字符串，用于判断元素否是括号
    const brackets = '{[()]}';
    // 保存不匹配括号的信息
    const result = {};

    for (let i = 0; i < str.length; i++) {
        // 当前元素是否为括号，不是则继续遍历下一个符号
        if (brackets.indexOf(str[i]) === -1) {
            continue;
        }

        // 如果是左括号，则进栈
        if (map[str[i]]) {
            stack.push({
                char: str[i],
                index: i,
            });
        } else {
            // 如果栈为空，则表示没有匹配的左括号，将其保存在结果数组中
            if (stack.length <= 0) {
                result[i] = str[i];
                continue;
            }
            // 如果是右括号，则出栈
            let temp = stack.pop();
            // 括号不匹配
            if (str[i] !== map[temp?.char]) {
                // 不匹配左括号进结果数组
                result[temp?.index] = temp?.char;
                i--;
            }
        }
    }
    // 如果匹配结束，依然有剩余的左括号，则直接加入到结果数组
    while (stack.length) {
        let temp = stack.pop();
        result[temp?.index] = temp?.char;
    }

    return result;
}

const s1 = '${{(3+5)*2+(5/(24)}';
const s2 = '[a+b]/${x}';
const s3 = '${(3+5)*2+(5/(24)}(}';
console.log(getUnmatchJson(s1)) // {1: "{", 11: "("}
console.log(getUnmatchJson(s2)) // {}
console.log(getUnmatchJson(s3)) // {10: "(", 18: "(", 19: "}"}