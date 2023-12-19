###  [找出连续最大升序的数量](https://leetcode.cn/problems/longest-continuous-increasing-subsequence/description/)

#### 题目
给定示例如下：
```mk
输入：nums = [1,3,5,4,7]
输出：3
解释：最长连续递增序列是 [1,3,5], 长度为3。
尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。 
```

#### 解决方案
```js
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
```
### 找出不连续最大升序的数量
```js
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
```