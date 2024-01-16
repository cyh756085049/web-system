/**
 * 151. 反转字符串中的单词 https://leetcode.cn/problems/reverse-words-in-a-string/description/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/18
 * @param s
 * @returns {string}
 */
//方式1：正则 + api
const reverseWords = (s) => {
    // 将所有的空格字符都去除掉
    const newString = s.trim().replace(/\s+/g, ' ');
    // 以空格分隔转化为数组，然后进行翻转，最后将翻转后的数组通过空格连接陈字符串
    return newString.split(' ').reverse().join(' ');
}

// 方法2：双端队列
const reverseWordsII = (s) => {
    let left = 0;
    let right = s.length - 1;
    let queue = [];
    let word = '';

    // 首先去除字符串左右两端的空格
    while (s.charAt(left) === ' ') {
        left++;
    }

    while (s.charAt(right) === ' ') {
        right--;
    }

    // 逐个读取字符串中的每个单词，依次放入双端队列的队头
    while (left <= right) {
        let char = s.charAt(left);
        // 最后一个单词走不到这
        if (char === ' ' && word) {
            queue.unshift(word);
            word = '';
        } else if (char !== ' ') {
            word += char;
        }
        left++;
    }

    queue.unshift(word);
    // 将队列转换成字符串输出
    return queue.join(' ');
}

const s = "a good   example";
console.log('翻转字符串里的单词:', reverseWords(s));
console.log('翻转字符串里的单词-双端队列', reverseWordsII(s));