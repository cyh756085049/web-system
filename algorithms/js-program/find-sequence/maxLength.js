const maxLength = (nums) => {
    if (nums.length <= 1) {
        return nums.length;
    }

    // 默认值为1，最差情况就是数组是逆序的, 那么存在的连续最大升序的数量就为1
    let max = 1;
    //  每一轮的不连续最大升序数量的临时值计算
    let count = 1;
    //  每一轮的数值
    let lastValue = 0;

    // 双层遍历，统计每一轮的不连续升序数量最大值，获取最终最大值
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] > lastValue) {
                count++;
                lastValue = nums[j];
            }
        }
        max = Math.max(max, count);
        count = 1;
        lastValue = nums[i];
    }

    return max;
}

const arr = [101, 119, 12, 51, 32, 7, 103, 128];
console.log('找出不连续最大升序的数量', maxLength(arr));