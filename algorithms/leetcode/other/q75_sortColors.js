/**
 * 75. 颜色分类 https://leetcode.cn/problems/sort-colors/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 * 必须在不使用库内置的 sort 函数的情况下解决这个问题。
 * @param nums
 */
const sortColors = (nums) => {
    let leftIndex = 0; // 红色球指针
    let rightIndex = nums.length - 1; // 蓝色球指针

    //  0、 1 和 2 分别表示红色、白色和蓝色。
    // 我们可以设置 3 个指针，一个指向头部，一个指向尾部，还有一个指向当前遍历的元素。
    // 我们从头部开始遍历数组，如果遇到 0（红色）就把它放到头部指针的位置，
    // 如果遇到 2（蓝色）就把它放到尾部指针的位置。
    // 如果遇到 1（白色），就跳过它，继续遍历。
    for (let i = 0; i <= rightIndex; i++) {
        // 红色球
        if (nums[i] === 0) {
            swap(i, leftIndex, nums);
            leftIndex++;
        } else if (nums[i] === 2) {
            swap(i, rightIndex, nums);
            rightIndex--;
            // ？？现在处于位置i的数字其实还是没有进行比较的，所以要i--，把位置i的数字重新再比较一遍
            i--;
        }
    }

    return nums;
}

const swap = (i, j, nums) => {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

const nums = [2,0,2,1,1,0];
console.log('75. 颜色分类', sortColors(nums));