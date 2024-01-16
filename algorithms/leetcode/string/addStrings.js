/**
 * 415. 字符串相加 https://leetcode.cn/problems/add-strings/description/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/32
 * 复杂度：时间复杂度 O(max(nums1.length, nums2.length)) 空间复杂度：o(1)
 * @param nums1
 * @param nums2
 */
const addStrings = (nums1, nums2) => {
    let i = num1.length - 1,
        j = num2.length - 1,
        carry = 0,
        result = '';
    while (i >= 0 || j >= 0) {
        let n1 = i >= 0 ? +num1[i] : 0;
        let n2 = j >= 0 ? +num2[j] : 0;
        let tmp = n1 + n2 + carry;
        carry = tmp >= 10 ? 1 : 0;
        result = (tmp % 10) + result;
        i--;
        j--
    }
    return carry ? carry + result : result;
}

const num1 = "1", num2 = "9";
console.log('字符串相加', addStrings(num1, num2));