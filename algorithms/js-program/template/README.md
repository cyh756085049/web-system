### [模拟实现模板渲染 【百度】](https://github.com/sisterAn/JavaScript-Algorithms/issues/36)
实现一个 `render(template, context)` 方法，将 `template` 中的占位符用 `context` 填充。

示例：
```js
const template = "{{name}}很厉害，才{{age}}岁"
const context = {name:"bottle",age:"15"}
// 输出：bottle很厉害，才15岁
```

要求：
* 级联的变量也可以展开
* 分隔符与变量之间允许有空白字符

#### 解决方案
* 正则匹配到所有的 `{{name}}`，`{{age}}`
* 利用 `str.replace(regexp|substr, newSubStr|function)` ，第一个参数是正则式，第二个参数可以是 `fucntion (replacement)` ，该函数的返回值将替换掉第一个参数匹配到的结果，将所有匹配到的字符替换成指定的字符
* 利用 `trim()` 方法去除分割符与变量之间的空白字符

实现代码如下：
```js
const render = (template, context) => {
    return template.replace(/{{(.*?)}}/g, (match, key) => {
        console.log('match:', match, 'key:', key);
        return context[key.trim()];
    })
}

const template = '{{name}}很牛逼，才{{age}}岁';
const context = {name: 'ramona chen', age: 18};
const res = render(template, context);
console.log(res);
```