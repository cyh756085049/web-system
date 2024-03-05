/**
 * 5. 最长回文子串 https://leetcode.cn/problems/longest-palindromic-substring/description/
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = (s) => {
    const length = s.length;

    // 如果字符串长度小于2，直接返回当前字符串
    if (length < 2) {
        return s;
    }

    // 回文子串的开始索引
    let start = 0;
    // 回文串的最大长度
    let maxLength = 1;

    // 状态定义：dp[i][j] 表示字符串 s[i...j] 是否是回文串
    const dp = new Array(length).fill(false).map(_ => new Array(length));

    // 单个字符是回文子串
    for (let i = 0; i < length; i++) {
        dp[i][i] = true;
    }

    // 遍历二维数组对角线上方的所有元素，因为 s[i...j] 表示s的一个子串，
    // 因此 i <= j，只需要填写表格对角线以上的部分
    for (let j = 1; j < length; j++) {
        for (i = 0; i < j; i++) {
            // i和j两个字符不相等，说明不是回文子串
            if (s[i] !== s[j]) {
                dp[i][j] = false;
            } else {
                // s[i]=s[j]，i和j中间最多只有1个数的情况下，必定是回文串
                if (j - 1 - (i + 1) <= 0) {
                    dp[i][j] = true;
                } else {
                    // s[i]=s[j]，再向中心扩散
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }
            // 当前子串是回文串并且当前子串的长度大于之前的最大值，则更新最大长度和回文子串的开始位置索引
            if (dp[i][j] === true && (j - i + 1) > maxLength) {
                maxLength = j - i + 1;
                start = i;
            }
        }
    }

    return s.slice(start, start + maxLength);
}

// 双指针，中心扩散法
const longestPalindromeII = (s) => {
    let res = '';
    for (let i = 0; i < s.length; i++) {
        // 寻找长度为奇数的回文子串，以当前元素向两边扩散
        const s1 = palindrome(s, i, i);
        // 寻找长度为偶数的回文串
        const s2 = palindrome(s, i, i + 1);
        res = res.length > s1.length ? res : s1;
        res = res.length > s2.length ? res : s2;
    }

    return res;
}

// 左右指针，寻找回文子串
const palindrome = (s, left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return s.slice(left + 1, right);
}

/**
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 * 输入：s = "aacabdkacaa"
 * 输出："aaca" (j - 1 - (i + 1)) <= 1
 * 输出："aca"  (j - 1 - (i + 1)) < 1
 */

const s = 'aacabdkacaa';
console.log(longestPalindrome(s));
console.log(longestPalindromeII(s));
