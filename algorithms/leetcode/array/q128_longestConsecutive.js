/**
 * 128. 最长连续序列 https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked
 * @param nums
 * @return {number}
 */
const longestConsecutive = (nums) => {
    const set = new Set();
    for (let num of nums) {
        set.add(num);
    }

    let longestLength = Number.MIN_VALUE;
    for (let num of set) {
        if (!set.has(num - 1)) {
            let curNum = num;
            let curLongestLength = 1;

            while(set.has(curNum + 1)) {
                curNum++;
                curLongestLength++;
            }
            longestLength = Math.max(longestLength, curLongestLength);
        }
    }

    return longestLength;
}

const nums = [100,4,200,1,3,2];
// const nums = [0,3,7,2,5,8,4,6,0,1];
console.log('最长连续子序列', longestConsecutive(nums));