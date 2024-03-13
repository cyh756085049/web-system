/**
 * 739. 每日温度 https://leetcode.cn/problems/daily-temperatures/description/?envType=study-plan-v2&envId=top-100-liked
 * 题解：https://leetcode.cn/problems/daily-temperatures/solutions/71433/leetcode-tu-jie-739mei-ri-wen-du-by-misterbooo/?envType=study-plan-v2&envId=top-100-liked
 * @param temperatures
 * @return {any[]}
 */
const dailyTemperatures = (temperatures) => {
    const length = temperatures.length;
    // 保存结果数据，answer[i] 是指对于第 i 天，下一个更高温度出现在几天后
    const answer = new Array(length).fill(0);

    // 维护一个单调递减栈，维护温度对应的下标，保证栈顶元素下标对应的温度小于当前的温度
    let stack = [];

    for (let i = 0; i < length; i++) {
        // 保存当前的温度
        const curTemperature = temperatures[i];
        // 栈不为空，且栈顶的元素对应的温度小于当前温度，将栈顶出栈
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < curTemperature) {
            // 最低温度
            const lowerTemperature = stack.pop();
            // answer下标是刚出栈的栈顶元素
            answer[lowerTemperature] = i - lowerTemperature;
        }
        // 栈保存温度对应的下标
        stack.push(i);
    }

    return answer;
}

/**
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 */

const temperatures = [73,74,75,71,69,72,76,73];
console.log(dailyTemperatures(temperatures));