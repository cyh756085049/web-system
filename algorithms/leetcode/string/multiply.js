/**
 * 43. 字符串相乘 https://leetcode.cn/problems/multiply-strings/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/105
 * 思路：竖式想乘
 * @param num1
 * @param num2
 */
const multiply = (num1, num2) => {
    if (num1 === '0' || num2 === '0') {
        return '0';
    }

    // 保存计算结果
    let res = [];
    for (let i = 0; i < num1.length; i++) {
        // nums1尾元素
        let num1Value = +num1[num1.length - 1 - i];
        for (let j = 0; j < num2.length; j++) {
            // num2尾元素
            let num2Value = +num2[num2.length - 1 - j];
            let resPosition = res[i + j] ? res[i + j] + num1Value * num2Value : num1Value * num2Value;
            // 尾数
            res[i + j] = resPosition % 10;
            // 进位
            if (resPosition >= 10) {
                res[i + j + 1] = res[i + j + 1] ? res[i + j + 1] + Math.floor(resPosition / 10) : Math.floor(resPosition / 10);
            }
        }
    }
    console.log('结果集', res);
    return res.reverse().join('');
}

const num1 = "123", num2 = "456";
console.log('字符串想乘', multiply(num1, num2));