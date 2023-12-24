## 找出字符串中连续出现最多的字符和个数【蘑菇街】
### 题目
```mk
'abcaakjbb' => {'a':2,'b':2}
'abbkejsbcccwqaa' => {'c':3}
```
注意点：**连续出现**最多的字符

### 解决方案
1、正则表达式 + reduce 实现，首先通过正则表达式将字符串相同连续的字符匹配为一个子串，返回匹配的数据，获取数组中的子串的最大长度即连续出现的最多的字符和个数，然后对数组根据最大子串长度进行筛选得到最终结果。
```js
const maxRepeatLetter = str => {
    const arr = str.match(/(\w)\1*/g);
    const maxLength = Math.max(...arr.map(s => s.length));
    const result = arr.reduce((pre, cur) => {
        console.log('cur', cur, 'pre', pre);
        if (cur.length === maxLength) {
            pre[cur[0]] = cur.length;
        }
        return pre;
    }, {});

    return result;
}

const str1 = 'abcaakjbb';
const str2 = 'abbkejsbcccwqaa';
console.log('abcaakjbb', maxRepeatLetter(str1)); // { a: 2, b: 2 }
console.log('abbkejsbcccwqaa', maxRepeatLetter(str2)); // { c: 3 }
```

2、使用 map + 临时变量最大值实现。
```js
const maxRepeatLetter = (str) => {
    const map = new Map();
    // 记录出现字符的最大值
    let max = 0;
    let curChar = '';
    let res = {};
    for (let char of str) {
        // 遇到相同的字符加1
        if (char === curChar) {
            map.set(char, (map.get(char) || 0) + 1);
        } else {
            // 不连续的字符，初始化当前字符出现次数为1
            map.set(char, 1);
            curChar = char;
        }
        // 当前字符的最大次数大于已记录的最大次数
        if (map.get(char) > max) {
            max = map.get(char);
            // 清空结果对象，只记录当前字符的最大次数
            res = {
                [char]: max,
            };
        } else if (map.get(char) === max) {
            // 若最大次数已经出现过，则追加记录当前字符的次数，可能就是同一字符，也可能不是
            res[char] = max;
        }
    }

    return res;
}
```