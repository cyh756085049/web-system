// 384.打乱一个没有重复元素的数组 https://leetcode.cn/problems/shuffle-an-array/
const Solution = function (nums) {
    this.nums = nums;
}

Solution.prototype.reset = () => {
    return this.nums;
}

Solution.prototype.shuffle = function () {
    const res = [...this.nums];
    for (let i = res.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        swap(res, randomIndex, i);
    }
    return res;
}

const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const nums = [1, 2, 3];
const solution = new Solution(nums);
console.log(solution.shuffle());
solution.reset();
console.log(solution.shuffle());