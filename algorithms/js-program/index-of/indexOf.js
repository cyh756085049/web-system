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


// ----------------------------------字符串 indexOf 简单实现 -----------------------------
/**
 * 2024.11.23 实现一个简单的字符串 indexOf 方法
 * 思路：
 * 遍历目标字符串，从头到尾查找是否存在指定子字符串。
 * 如果找到，返回其在目标字符串中的起始位置。
 * 如果遍历结束仍未找到，返回 -1。
 *
 * @param targetStr
 * @param substringStr
 */
const customIndexOf = (targetStr, substringStr) => {
    let targetStrLength = targetStr.length;
    let substringStrLength = substringStr.length;

    // 如果子字符串比目标字符串还长，或子字符串长度为0，直接返回 -1
    if (substringStrLength > targetStrLength || substringStrLength === 0) {
        return -1;
    }

    for (let i = 0; i <= targetStrLength - substringStrLength; i++) {
        // 检查当前索引的子字符串是否与子字符串匹配
        let match = true;

        for (let j = 0; j < substringStrLength; j++) {
            if (targetStr[i + j] !== substringStr[j]) {
                match = false;
                break;
            }
        }
        // 如果匹配，返回当前索引
        if (match) {
            return i;
        }
    }

    // 如果遍历结束仍未找到，返回 -1
    return -1;
}

console.log('字符串 indexOf 方法', customIndexOf('leetcode', 'code'));

/**
 * 优化点：
 * 提前终止： 如果剩余未匹配的长度小于子字符串长度，可以提前退出循环。
 * @param targetStr
 * @param substringStr
 */
const customIndexOfII = (targetStr, substringStr) => {
    let targetStrLength = targetStr.length;
    let substringStrLength = substringStr.length;

    // 如果子字符串比目标字符串还长，或子字符串长度为0，直接返回 -1
    if (substringStrLength > targetStrLength || substringStrLength === 0) {
        return -1;
    }

    for (let i = 0; i <= targetStrLength - substringStrLength; i++) {
        if (targetStr.slice(i, i + substringStrLength) === substringStr) {
            return i;
        }
    }

    return -1;
}

console.log('优化后的字符串 indexOf 方法', customIndexOf('leetcode', 'code'));