/**
 * 31. 下一个排列 https://leetcode.cn/problems/next-permutation/description/?envType=study-plan-v2&envId=top-100-liked
 * 题解：https://leetcode.cn/problems/next-permutation/solutions/80560/xia-yi-ge-pai-lie-suan-fa-xiang-jie-si-lu-tui-dao-/?envType=study-plan-v2&envId=top-100-liked
 * 思路：下一个排列总要比当前排列大，除非该排列已经是最大的排列，我们希望找到一个算法，实现能够找到
 * 一个大于当前序列的新序列，且变大的幅度尽可能小，具体方法：
 * 1、我们需要将一个左边的【较小数】和一个右边的【较大数】交换，以能够让当前排列变大，从而得到下一个排列。
 * 2、同时让【较小数】尽量靠右，而【较大数】尽可能小，当交换完成后，【较大数】右边的数需要按照升序重新排列，
 * 这样可以保证新排列大于原来排列的情况上，使变大的幅度尽可能小。
 * @param nums
 */
const nextPermutation = (nums) => {
    // 倒数第二个数字，从后往前查找，需要比较最后一个数值和前一个数值的大小
    let i = nums.length - 2;
    // 从后往前寻找第一个较小的数值
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    if (i >= 0) {
        // 从后往前寻找在【i, j】中第一个较大的数值
        let j = nums.length - 1;
        while (j >= 0 && nums[i] >= nums[j]) {
            j--;
        }
        swap(i, j, nums);
    }
    // 再将[i+1, nums.length - 1]区间数据进行升序，保证是下一个排列
    // 此时得到的一定是降序的数据
    sort(i + 1, nums);
    return nums;
}

const swap = (i, j, nums) => {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

// 降序排序 [5, 4, 2, 2] 置为升序 [2, 2, 4, 5]
const sort = (i, nums) => {
    let left = i;
    let right = nums.length - 1;
    while (left < right) {
        swap(left, right, nums);
        left++;
        right--;
    }
}

const nums = [2, 4, 1, 3, 2, 5, 4, 3, 2];
console.log('下一个排列: ', nextPermutation(nums));