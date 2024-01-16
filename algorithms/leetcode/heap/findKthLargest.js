/**
 * 215. 数组中的第K个最大元素: 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * https://leetcode.cn/problems/kth-largest-element-in-an-array/description/
 *
 * @param nums
 * @param k
 */
const findKthLargest = (nums, k) => {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}

// 构建大顶堆实现
const findKthLargestByHeap = (nums, k) => {
    let headSize = nums.length;
    buildMaxHeap(nums, headSize);
    for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
        swap(nums, 0, i);
        --headSize;
        maxHeapify(nums, 0, headSize);
    }

    return nums[0];
}

// 自下而上构建大顶堆
const buildMaxHeap = (nums, headSize) => {
    for (let i = Math.floor(headSize / 2) - 1; i >= 0; i--) {
        maxHeapify(nums, i, headSize);
    }
}

// 从左到右，自上而下的调整节点
const maxHeapify = (nums, i, headSize) => {
    let left = i * 2 + 1;
    let right = i * 2 + 2;
    let largest = i;
    if (left < headSize && nums[left] > nums[largest]) {
        largest = left;
    }

    if (right < headSize && nums[right] > nums[largest]) {
        largest = right;
    }
    if (largest !== i) {
        // 节点调整
        swap(nums, i, largest);
        // 继续调整下面的非叶子节点
        maxHeapify(nums, largest, headSize);
    }
}

const swap = (nums, i, j) => {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}


const nums = [3,2,1,5,6,4];
const k = 4;
console.log(findKthLargest(nums, k));
console.log(findKthLargestByHeap(nums, k));