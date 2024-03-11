/**
 * 4. 寻找两个正序数组的中位数 https://leetcode.cn/problems/median-of-two-sorted-arrays/description/
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 * 算法的时间复杂度应该为 O(log (m+n)) 。
 * @param nums1
 * @param nums2
 */
const findMedianSortedArrays = (nums1, nums2) => {
    // 将两数组合并排序，然后二分求中位数 时间复杂度 O((m+n)log(m+n))
    const mergeNums = nums1.concat(nums2);
    mergeNums.sort((a, b) => a - b);

    if (mergeNums.length === 0) {
        return 0;
    }

    // 数组长度为奇数
    if (mergeNums.length % 2 === 1) {
        return mergeNums[Math.floor(mergeNums.length / 2)];
    }
    const index = mergeNums.length / 2;

    return (mergeNums[index] + mergeNums[index - 1]) / 2;
}

// 方式2：二分长度较小的数组，找到这个数组二分的位置，在根据这个二分的位置和两个数组的总长度找到另一个数组二分的位置，
// 比较这两个位置的四个数是否满足交叉小于等于，不满足继续二分，满足就找到了解
// 题解：https://leetcode.cn/problems/median-of-two-sorted-arrays/solutions/1143611/er-fen-tu-jie-dai-ma-jian-ji-by-chen-wei-c3u4/
var findMedianSortedArraysII = function(nums1, nums2) {
    let len1 = nums1.length;
    let len2 = nums2.length;

    // 对两个数组中长度较小的二分
    if (len1 > len2) {
        return findMedianSortedArraysII(nums2, nums1);
    }

    let totalLen = len1 + len2;
    // 进行二分的开始和结束为止
    let start = 0;
    let end = len1;

    let partLen1, partLen2;

    while (start <= end) {
        // nums1 二分的位置
        partLen1 = (start + end) >>> 1;
        // nums2 二分的位置
        partLen2 = ((totalLen + 1) >>> 1) - partLen1;
        // nums1 二分之后左边的
        let L1 = partLen1 === 0 ? -Infinity : nums1[partLen1 - 1];
        // num2 二分之后左边的
        let L2 = partLen2 === 0 ? -Infinity : nums2[partLen2 - 1];
        // nums1 二分之后右边的
        let R1 = partLen1 === len1 ? Infinity : nums1[partLen1];
        // nums2 二分之后右边的
        let R2 = partLen2 === len2 ? Infinity : nums2[partLen2];

        //不符合交叉小于等于 继续二分
        if (L1 > R2) {
            end = partLen1 - 1;
        } else if (L2 > R1) { //不符合交叉小于等于 继续二分
            start = partLen1 + 1;
        } else {
            // L1 <= R2 && L2 <= R1 符合交叉小于等于
            return totalLen % 2 === 0 ? (Math.max(L1, L2) + Math.min(R1, R2)) / 2 : Math.max(L1, L2);
        }
    }
}


/**
 * 输入：nums1 = [1,2], nums2 = [3,4]
 * 输出：2.50000
 * 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
 */

const nums1 = [1,2], nums2 = [3,4];
console.log(findMedianSortedArrays(nums1, nums2));
console.log(findMedianSortedArraysII(nums1, nums2));