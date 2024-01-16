/**
 * 88. 合并两个有序数组 https://leetcode.cn/problems/merge-sorted-array/description/
 * 思路：双指针 快慢指针
 * @param {number[]} nums1 数组1，递增有序数组
 * @param {number} m nums1的元素数量
 * @param {number[]} nums2 数组2，递增有序数组
 * @param {number} n num2的元素数量
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // 设置数组1和数组2的指针索引分别为元素数目值 - 1，定义一个合并数组的总长度
    // 然后比较两个数组对应指针索引的值，给 num1 赋值，因为是递增的数组，从后向前赋值，大的在最后
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums2[j] >= nums1[i]) {
            nums1[k] = nums2[j];
            j--;
            k--;
        } else {
            nums1[k] = nums1[i];
            i--;
            k--;
        }
    }

    // 当nums2数组还存在元素时，继续赋值
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }

    return nums1;
};

const nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3;
console.log(merge(nums1, m, nums2, n));