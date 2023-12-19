const findLengthOfLCIS = (nums) => {
    // 特殊处理判断
    if (nums.length <= 1) {
        return nums.length;
    }

    // 记录最终结果最大值
    let max = 1;
    // 记录每一轮连续递增序列的长度
    let count = 1;

    // 遍历数组，后一个值大于前一个值，则计数加1，否则计数默认值为1
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            count += 1;
        } else {
            count = 1;
        }

        max = Math.max(max, count);
    }

    return max;
}

const nums = [1,3,5,4,7];
console.log('最长连续递增序列（连续最大升序的数量）:', findLengthOfLCIS(nums));
