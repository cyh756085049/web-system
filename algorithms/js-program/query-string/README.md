### 实现一个方法，拆解 `URL` 参数中 `queryString`
输入输出信息：
```js
// 输入
const url = 'http://sample.com/?a=1&b=2&c=xx&d=#hash';
// 输出
const result = { a: '1', b: '2', c: 'xx', d: '' };
```
实现代码如下：
* 正则表达式实现
```markdown
^：匹配输入的开始,例如，/^A/ 并不会匹配 "an A" 中的 'A'，但是会匹配 "An E" 中的 'A'。
?：匹配前面一个表达式 0 次或者 1 次。等价于 {0,1}。
*：匹配前一个表达式 0 次或多次。等价于 {0,}。
+：匹配前面一个表达式 1 次或者多次。等价于 {1,}
[xyz]：一个字符集合。匹配方括号中的任意字符，可以使用破折号（-）来指定一个字符范围
[^xyz]：一个反向字符集。也就是说， 它匹配任何没有包含在方括号中的字符， 可以使用破折号（-）来指定一个字符范围
```
```js
const queryString = (url) => {
    const result = {};
    url.replace(/([^?&]+)=([^&#]*)/g, (_, key, value) => {
        result[key] = value;
    })
    return result;
}

const url = 'http://sample.com/?a=1&b=2&c=xx&d=#hash';
console.log('正则表达式实现:', queryString(url));
```
* `url api` 实现
```js
const getParams = (url) => {
    console.log('url.search', url.search);
    const params = new URLSearchParams(url.search);
    const result = {};
    params.forEach((value, key) => {
        result[key] = value;
    })
    return result;
}

const url = 'http://sample.com/?a=1&b=2&c=xx&d=#hash';
console.log('url api 实现：', getParams(new URL(url)));
```