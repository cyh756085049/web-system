// 字符串indexOf: 正则匹配
const stringIndexOf = (str, searchValue, fromIndex = 0) => {
    const regex = new RegExp(`${searchValue}`, 'ig');
    // 该索引表示从哪里开始下一个匹配
    regex.lastIndex = fromIndex;
    // 在该字符串中执行匹配项的搜索, 返回一个结果数组或 null
    const result = regex.exec(str);
    return result ? result.index : -1;
}

const str = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';
const searchValue = 'dog';
console.log('字符串匹配：', stringIndexOf(str, searchValue), 'api方法：', str.indexOf(searchValue));
console.log('字符串匹配：', stringIndexOf(str, searchValue, 41), 'api方法：', str.indexOf(searchValue, 41));


// 数组indexOf: 遍历匹配
const arrayIndexOf = (array, searchElement, fromIndex = 0) => {
    if (!searchElement) {
        return -1;
    }
    for (let i = fromIndex; i < array.length; i++) {
        if (array[i] === searchElement) {
            return i;
        }
    }
    return -1;
}

const array = ['ant', 'bison', 'camel', 'duck', 'bison'];
const searchElement = 'bison';
console.log('数组匹配：', arrayIndexOf(array, searchElement), 'api方法：', array.indexOf(searchElement));
console.log('数组匹配：', arrayIndexOf(array, searchElement, 2), 'api方法：', array.indexOf(searchElement, 2));

const indexOf = (items, item, fromIndex = 0) => {
    const isArray = Array.isArray(items);
    const isString = Object.prototype.toString.call(items) === '[object String]';
    if (!isString && !isArray) {
        throw new SyntaxError()
    }
    if (isArray) {
        return arrayIndexOf(items, item, fromIndex);
    }
    if (isString) {
        return stringIndexOf(items, item, fromIndex);
    }
}

console.log('字符串匹配：', indexOf(str, searchValue));
console.log('数组匹配：', indexOf(array, searchElement));