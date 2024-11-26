/**
 * 383. 赎金信 https://leetcode.cn/problems/ransom-note/description/?envType=study-plan-v2&envId=top-interview-150
 * 暴力法
 * @param ransomNote
 * @param magazine
 * @return {boolean}
 */
const canConstruct = function(ransomNote, magazine) {
    // 暴力法，双层遍历，外层遍历magazine，内层遍历ransomNote寻找和magazine中相同的字符，找到将其移除掉，避免重复使用
    if (!magazine || magazine.length === 0) {
        return false;
    }

    let ransomNoteArr = ransomNote.split('');

    for (let i = 0; i < magazine.length; i++) {
        for (let j = 0; j < ransomNoteArr.length; j++) {
            if (magazine[i] === ransomNoteArr[j]) {
                ransomNoteArr.splice(j, 1);

                break;
            }
        }
    }

    if (ransomNoteArr.length === 0) {
        return true;
    }

    return false;
};


const canConstructII = (ransomNote, magazine) => {
    // 优化：使用26个字母的长度数组代替哈希表保存，数组存储的是字符出现的次数，数组下标对于的就是字符的code码的差值
    if (!magazine || magazine.length === 0) {
        return false;
    }

    const arr = new Array(26).fill(0);
    const base = 'a'.charCodeAt();

    for (let str of magazine) {
        arr[str.charCodeAt() - base]++;
    }

    for (let str of ransomNote) {
        if (!arr[str.charCodeAt() - base]) {
            return false;
        }

        arr[str.charCodeAt() - base]--;
    }

    return true;
}

const ransomNote = "aa";
const magazine = "aab";
console.log('暴力法', canConstruct(ransomNote, magazine));
console.log('哈希法优化', canConstructII(ransomNote, magazine));