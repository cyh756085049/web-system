/**
* name: q13_romanToInt
* description:
* author: Ramona Chen
* time: 2025-06-17 09:23:14
* {@link }
*/

/**
 * 13. 罗马数字转整数  https://leetcode.cn/problems/roman-to-integer/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    // 先将所有的罗马数字字符对应的数字都列举出了
    const map = {
        'I': 1,
        'IV': 4,
        'V': 5,
        'IX': 9,
        'X': 10,
        'XL': 40,
        'L': 50,
        'XC': 90,
        'C': 100,
        'CD': 400,
        'D': 500,
        'CM': 900,
        'M': 1000,
    };

    let index = 0;
    let sum = 0;

    while (index < s.length) {
        // 优先判断2个字符组合是否存在哈希表中，存在则加到结果中，并向后移2个字符
        if (index + 1 < s.length && map[s.slice(index, index + 2)]) {
            sum += map[s.slice(index, index + 2)];
            index += 2;
        } else {
            // 再判断1个字符组合是否存在哈希表，存在则加到结果中，并向后移1个字符
            sum += map[s.slice(index, index + 1)];
            index += 1;
        }
    }

    return sum;
};

const s = "MCMXCIV";
console.log(romanToInt(s));