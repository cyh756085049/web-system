/**
 * 125. 验证回文串 https://leetcode.cn/problems/valid-palindrome/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/20
 * @param s
 * @return boolean
 */
const isPalindrome = (s) => {
    if (typeof s !== 'string') {
        return false;
    }
    // 先替换掉所有非字母数字，再替换到所有的空格 (\s 是匹配所有空白符，包括换行)
    s = s.replace(/[^a-zA-Z0-9]/g, '').replace(/\s/g, '').toLowerCase();

    console.log('处理后的字符串', s);
    return s.split('').reverse().join('') === s;
}

// 复杂度：时间复杂度 O(n) 空间复杂度O(1)
const isPalindromeII = (s) => {
    if (typeof s !== 'string') {
        return false;
    }

    s = s.replace(/[^a-zA-Z0-9]/g, '').replace(/\s/g, '').toLowerCase();
    let i = 0, j = s.length - 1;
    while (i < j) {
        if (s.charAt(i) !== s.charAt(j)) {
            return false;
        }
        console.log('当前char', s.charAt(i), s.charAt(j));
        i++;
        j--;
    }

    return true;
}

const s = "A man, a plan, a canal: Panama";
console.log('解法1：反转字符串和正向字符串比较，验证回文串:', isPalindrome(s));
console.log('解法2：设置左右指针，遍历左右指针的字符是否相等，验证回文串:', isPalindromeII(s));