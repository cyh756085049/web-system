/**
 * 给定两个二进制字符串a和b,以二进制字符串的形式返回它们的和
 * @param {*} a 11
 * @param {*} b 1
 * @return 100
 */
const sum = (a, b) => {
    let sum = '';
    const aLength = a.length;
    const bLength = b.length;

    let resLength;

    if (aLength > bLength) {
        resLength = aLength;
    } else {
        resLength = bLength;
    }

    const reverseA = a.split('').reverse().join('');
    const reverseB = b.split('').reverse().join('');


    let carry = 0;
    let reverseSum = '';
    for (let i = 0; i < resLength; i++) {
        const curSum = carry + Number(reverseA[i] || 0) + Number(reverseB[i] || 0);
        carry = curSum >= 2 ? 1 : 0;

        if (curSum >= 2) {
            reverseSum += '0';
        } else {
            reverseSum += curSum;
        }
    }

    if (carry) {
        reverseSum += carry;
    }

    sum = reverseSum.split('').reverse().join('');

    return sum;
}

const a = '11';
const b = '1';

console.log(sum(a, b));