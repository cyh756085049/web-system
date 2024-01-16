/**
 * 611. 有效三角形的个数 https://leetcode.cn/problems/valid-triangle-number/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/93
 * 思路：排序 + 双指针
 * 复杂度：时间复杂度O(n^2) 空间复杂度O(n)
 * @param nums
 */
const triangleNumber = (nums) => {
    // 三数之和任意两边之和大于第三边，任意两边之差小于第三边
    // 可以先将数组排序，排序后，固定最长的边，利用双指针法判断其余边，类似三数之和
    if (!nums || nums.length < 3) {
        return 0;
    }
    nums.sort((a, b) => a - b);

    let count = 0;
    for (let right = nums.length - 1; right > 1; right--) {
        let left = 0, change = right - 1;
        while (left < change) {
            // 固定了change，如果nums[left] + nums[change] > nums[right]，那么[left, change - 1]里任意一条边 + change > right
            if (nums[left] + nums[change] > nums[right]) {
                count += change - left;
                change--;
            } else {
                left++;
            }
        }
    }

    return count;
}

const nums = [2,2,3,4];
console.log('有效三角形的个数：', triangleNumber(nums));