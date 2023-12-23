// 暴力法：双层循环遍历得到最大值
const nextGreaterElements = (nums) => {
    let res = [];
    for (let i = 0; i < nums.length - 1; i++) {
        let max = nums[i];
        for (let j = i + 1; j <nums.length; j++) {
            // 找到后边比当前对比值大的第一个值，就跳出循环
            if (nums[j] > max) {
                max = nums[j];
                break;
            }
        }
        res.push(max === nums[i] ? -1 : max);
    }

    // 最后一个值没有比其大的数了，直接填充1
    res.push(-1);

    return res;
}

// 使用数组 api 组合实现
const nextGreaterElements1 = (nums) => {
    const result = nums.map((item, index) => {
        const curValue = nums.slice(index).find(next => next > item);
        return curValue === undefined ? -1 : curValue;
    })

    return result;
}

// 单调栈实现
const nextGreaterElementsByStack = (nums) => {
    let res = new Array(nums.length).fill(-1);
    // 维护一个单调栈，栈中存的是数组数值的索引
    let stack = [];
    stack.push(0);
    for (let i = 1; i < nums.length; i++) {
        // 当前元素大于栈顶元素
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            res[stack[stack.length - 1]] = nums[i];
            stack.pop();
        }
        stack.push(i);
    }
    return res;
}

const nums = [2, 1, 2, 4, 3];
console.log('寻找数组每个元素的下一个最大的元素', nextGreaterElements(nums));
console.log('使用数组 api 实现：', nextGreaterElements1(nums));
console.log('单调栈实现：', nextGreaterElementsByStack(nums));