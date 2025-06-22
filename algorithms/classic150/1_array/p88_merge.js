/**
* name: p88_merge
* description: 3个指针从后往前遍历交换，更新指针
* author: Ramona Chen
* time: 2025-06-04 21:55:12
* {@link firstUniqChar.js}
*/

/**
 * 88. 合并两个有序数组: https://leetcode.cn/problems/merge-sorted-array/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function(nums1, m, nums2, n) {
    let num1Index = m - 1;
    let num2Index = n - 1;
    let resultIndex = m + n - 1;

    while (num1Index >= 0 && num2Index >= 0) {
        if (nums1[num1Index] > nums2[num2Index]) {
            nums1[resultIndex] = nums1[num1Index];
            nums1[num1Index] = nums2[num2Index];
            resultIndex--;
            num1Index--;
        } else {
            nums1[resultIndex] = nums2[num2Index];
            resultIndex--;
            num2Index--;
        }
    }

    while (num2Index >= 0) {
        nums1[resultIndex] = nums2[num2Index];
        resultIndex--;
        num2Index--;
    }

};

const nums1 = [1,2,3], m = 3, nums2 = [2,5,6], n = 3;

console.log(merge(nums1, m, nums2, n));