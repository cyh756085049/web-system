### 字符串里出现最多的字符及次数

#### 题目
```js
const str = 'gjxxanfaadfcff';
```
给定字符串，寻找字符串中出现最多的字符，已经最多字符出现的次数。

#### 解决方案
* map + 保存最大值实现
```js
const mostCharInstr = (str) => {
    const map = new Map();
    // 保存最大值
    let max = 1;
    // 保存出现最多的字符
    let res = str[0];
    for (let i = 0; i < str.length; i++)  {
        if (map.has(str[i])) {
            const count = map.get(str[i]) + 1;
            map.set(str[i], count);
            if (count > max) {
                max = count;
                res = str[i];
            }
        } else {
            map.set(str[i], 1);
        }
    }
    return { res, max };
}
```

* 正则表达式实现
```js
const mostCharInstrByRegxp = () => {
    // 对字符串数组进行排序
    const arr = str.split('').sort().join('');
    // 正则匹配，将相同的字符汇总到一起
    let regexp = /(\w)\1+/g;
    let s = '';
    let num = 0;
    arr.replace(regexp, (s1, s2) => {
        console.log(s1, s2);
        if (num < s1.length) {
            num = s1.length;
            s = s2;
        }
    })

    return {s, num };
}
```