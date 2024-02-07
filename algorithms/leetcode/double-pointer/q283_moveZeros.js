/**
 * 283. 移动零 https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 * @param {number[]} nums
 */
const moveZeros = (nums) => {
    if (!nums || nums.length <= 1) {
        return nums;
    }

    // 定义指针j指向不为0的数字
    let j = 0;
    // 指针i从下标0开始遍历，当当前值不为0时，和nums[j]进行交换，指针j自增，直到把所有的0移动到数组末尾
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            if (i > j) {
                nums[j] = nums[i];
                nums[i] = 0;
            }
            j++;
        }
    }
    return nums;
}

/**
 * 输入: nums = [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 */
const nums = [0,1,0,3,12];
console.log('移动零：', moveZeros(nums));