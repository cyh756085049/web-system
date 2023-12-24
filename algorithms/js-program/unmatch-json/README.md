### 寻找字符串中不匹配括号的位置，并以json格式输出【阿里】

#### 题目

```js
const s1 = '${{(3+5)*2+(5/(24)}'; // {1: "{", 11: "("}
const s2 = '[a+b]/${x}'; // {}
const s3 = '${(3+5)*2+(5/(24)}(}'; // {10: "(", 18: "(", 19: "}"}
```
#### 解决方案
利用栈实现，类似 leetcode 的匹配括号的题目。

##### 解题思路：
* 遍历字符串，先判断遍历元素是否是括号，不是则继续遍历下一个字符
* 是左括号`{`、`（`、`[`，直接入栈，栈结构包括当前括号字符及其索引值
* 是右括号的情况
  * 如果栈为空，则说明当前括号无法匹配，直接加入到结果数组中，并继续遍历下一个字符
  * 栈顶出栈，如果当前括号和出栈的括号不匹配，则将出栈元素加入到结果数组中，并继续遍历
* 遍历完成后，如果栈中还有数据，说明字符串还有未匹配的括号字符，将其直接加入到结果数组中

```js
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
```