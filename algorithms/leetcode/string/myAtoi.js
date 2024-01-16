/**
 * 8. 字符串转换整数 (atoi) https://leetcode.cn/problems/string-to-integer-atoi/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/132
 * @param s
 */
// parseInt
const myAtoi = (s) => {
    /**
    忽略开头空格，parseInt 满足
    忽略整数部分后的字符，parseInt 满足
    返回有符号整数，parseInt 满足
    范围在 32 位内，可通过32位数值判断
    函数不能进行有效的转换时，parseInt 返回的是 NaN
     */
    let number = parseInt(s);

    if (isNaN(number)) {
        return 0;
    } else if (number > Math.pow(2, 31) - 1) {
        number = Math.pow(2, 31) - 1;
    } else if ( number < Math.pow(-2, 31)) {
        number = Math.pow(-2, 31);
    }

    return number;
}

const myAtoiII = (s) => {
    let res = 0;
    s = s.trimStart();
    console.log('去除字符串前边的空格', s);
    let match = s.match(/[+|-]?\d*/)[0];
    console.log(match);
    if (match === '+' || match === '-' || match === '') {
        return 0;
    }
    res = +match;
    if (res > 2**31 - 1) {
        res = 2**31 - 1;
    }
    if (res < -(2**31)) {
        res = -(2**31);
    }

    return res;
}

const s = "   -42";
console.log('解法1：使用parseInt，将字符串转化为整数', myAtoi(s));
console.log('解法2：使用正则表达式，将字符串转化为整数', myAtoiII(s));

