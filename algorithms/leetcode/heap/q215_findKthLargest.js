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

/** 通过维护一个大小为k的最小堆实现堆的初始化过程可以通过遍历并插入数组的前 k 个元素来实现。
 * 当堆被填满后，再尝试用数组的第 k+1 到末尾的这部分元素来更新这个小顶堆，维护规则是：
 *   若遍历到的数字比小顶堆的堆顶元素值大，则用该数字替换掉小顶堆的堆顶元素值
 *   若遍历到的数字比小顶堆的堆顶元素值小，则忽略这个数字
 * 维护大小为 k 的小顶堆的目的，是为了确保堆中除了堆顶元素之外的 k-1 个元素值都大于堆顶元素
 * 当我们用数组的[0, k-1]区间里的 数字初始化完成这个堆时，堆顶元素值就对应着前 k 个数字里的最小值
 * 紧接着我们尝试用索引区间为 [k, n-1]的数字来更新堆，在这个过程中，只允许比堆顶元素大的值进入堆。这一波操作过后，
 * 堆里的 k 个数字就是整个数组中最大的 k 个数字，而堆顶的数字正是这 k 个数中最小的那个
 */
const findKthLargestWithSmallHeap = (nums, k) => {
    // 初始化一个堆数组
    const heap = [];
    // n 表示堆数组中当前最后一个元素的索引
    let n = 0;

    // 初始化大小为k的堆
    const createHeap = () => {
        for (let i = 0; i < k; i++) {
            insert(nums[i]);
        }
    }

    // 堆中插入元素 = 将元素添加到堆尾部 + 向上调整元素的位置
    const insert = (value) => {
        heap[n] = value;
        // 向上调整，重复比较+交换进行调整
        upHeap(n);
        n++;
    }

    // 入参是堆元素在数组中的索引范围,high 表示上界,当前堆底元素
    const upHeap = (high) => {
        // 初始化 i 为上界
        let i = high;
        // 初始化 j 为 i 的父节点
        let j = Math.floor((i - 1) / 2);
        // 在 j 不越界的情况下，0为当前堆顶元素索引, 重复向上比较+交换
        while (j >= 0) {
            // 向上比较，堆底元素小于其父元素，交换其父子元素
            if (heap[i] < heap[j]) {
                swap(heap, i, j);
                // 更新结点位置
                i = j;
                j = Math.floor((i - 1) / 2);
            } else {
                break;
            }
        }
    }

    // 向下对比函数
    const downHeap = (high) => {
        // 堆顶索引
        let i = 0;
        // 左子树
        let j = i * 2 + 1;
        // 不越界的情况下，重复向下对比+交换操作
        while (j <= high) {
            // 右孩子比左孩子更小，则用右孩子和根结点比较
            if (j + 1 <= high && heap[j + 1] < heap[j]) {
                j = j + 1;
            }

            // 孩子结点小于当前父节点，交换
            if (heap[j] < heap[i]) {
                swap(heap, i, j);
                i = j;
                j = i * 2 + 1;
            } else {
                break;
            }
        }
    }

    // 用数组下标区间 [k, n - 1]的元素更新最小堆
    const updateHeap = () => {
        for (let i = k; i < nums.length; i++) {
            // 只有比堆顶元素大的才有资格进堆
            if (nums[i] > heap[0]) {
                // 用较大值替换堆顶元素
                heap[0] = nums[i];
                downHeap(k);
            }
        }
    }
    createHeap();
    updateHeap();
    return heap[0];
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
const k = 2;
// console.log(findKthLargest(nums, k));
// console.log(findKthLargestByHeap(nums, k));
console.log(findKthLargestWithSmallHeap(nums, k));