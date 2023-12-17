const moreChars = (str) => {
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

const maxRepeatLetter = str => {
    // 匹配子串如 ['a', 'b', 'c', 'aa', 'k', 'j', 'bb']
    const arr = str.match(/(\w)\1*/g);
    // 获取子串长度最大值
    const maxLength = Math.max(...arr.map(s => s.length));
    const result = arr.reduce((pre, cur) => {
        // 子串长度等于最长子串长度，则返回当前值， cur[0] 为连续相同字符子串的字符
        if (cur.length === maxLength) {
            pre[cur[0]] = cur.length;
        }
        return pre;
    }, {});

    return result;
}

const str1 = 'abcaakjbb';
const str2 = 'abbkejsbcccwqaa';
console.log('方法1: map');
console.log('abcaakjbb', moreChars(str1));
console.log('abbkejsbcccwqaa', moreChars(str2));
console.log('方法2: 正则 + reduce');
console.log('abcaakjbb', maxRepeatLetter(str1));
console.log('abbkejsbcccwqaa', maxRepeatLetter(str2));