/**
 * 模板渲染
 * @param template 模板内容
 * @param context 模板中的变量内容
 * @return {*}
 */
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