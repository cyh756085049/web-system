/**
 * 287. 寻找重复数 https://leetcode.cn/problems/find-the-duplicate-number/description/?envType=study-plan-v2&envId=top-100-liked
 * 题解：https://leetcode.cn/problems/find-the-duplicate-number/solutions/58841/287xun-zhao-zhong-fu-shu-by-kirsche/?envType=study-plan-v2&envId=top-100-liked
 * @param nums
 */
const findDuplicate = (nums) => {
    // 思路：将数组下标和数组值进行对应，构建链表
    // 数组有一个重复的整数 -> 链表中存在环
    // 找到数组中的重复的整数 -> 找到链表的环入口
    let slow = 0;
    let fast = 0;
    slow = nums[slow];
    fast = nums[nums[fast]];

    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }

    let pre1 = 0;
    let pre2 = slow;

    while (pre1 !== pre2) {
        pre1 = nums[pre1];
        pre2 = nums[pre2];
    }

    return pre1;
}

// 0 -> 1
// 1 -> 3
// 2 -> 4
// 3 -> 2
// 4 -> 2
// 0 -> 1 -> 3 -> 2 -> 4 -> 2 -> 4 -> 2 -> ...
// 数组中如果有重复的数，那么就会产生多对一的映射，这样，形成的链表就一定会有环路了
const nums = [1,3,4,2,2];
console.log('寻找重复数', findDuplicate(nums));