/**
 * 拆解 url 中的参数
 * 正则表达式实现
 * @param url
 * @return {{}}
 */
const queryString = (url) => {
    const result = {};
    // ^：匹配输入的开始,例如，/^A/ 并不会匹配 "an A" 中的 'A'，但是会匹配 "An E" 中的 'A'。
    // ?：匹配前面一个表达式 0 次或者 1 次。等价于 {0,1}。
    // *：匹配前一个表达式 0 次或多次。等价于 {0,}。
    // +：匹配前面一个表达式 1 次或者多次。等价于 {1,}
    // [xyz]：一个字符集合。匹配方括号中的任意字符，可以使用破折号（-）来指定一个字符范围
    // [^xyz]：一个反向字符集。也就是说， 它匹配任何没有包含在方括号中的字符， 可以使用破折号（-）来指定一个字符范围
    url.replace(/([^?&]+)=([^&#]*)/g, (_, key, value) => {
        result[key] = value;
    })
    return result;
}

const getParams = (url) => {
    const params = new URLSearchParams(url.search);
    const result = {};
    params.forEach((value, key) => {
        result[key] = value;
    })
    return result;
}

const getQuery = (url) => {
    const [, params] = url.split('?');
    if (params) {
        const arr = params?.split('&');
        return arr?.reduce((pre, cur) => {
            const [key, val] = cur.split('=');
            pre[key] = decodeURIComponent(val);

            return pre;
        }, {});
    }
    return {};
}

const url = 'http://sample.com/?a=1&b=2&c=xx&d=#hash';
console.log('正则表达式实现:', queryString(url));
console.log('url api 实现：', getParams(new URL(url)));
console.log('数组 api 实现：', getQuery(url));
