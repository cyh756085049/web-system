/**
 * 295. 数据流的中位数 https://leetcode.cn/problems/find-median-from-data-stream/description/?envType=study-plan-v2&envId=top-100-liked
 * @constructor
 */
const MedianFinder = function() {
    this.min_heap = new MinHeap();
    this.max_heap = new BigHeap();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    if (this.min_heap.heap.length === this.max_heap.heap.length) {
        if (num > this.max_heap.heap[0]) {
            this.min_heap.insert(num);
        } else {
            this.max_heap.insert(num);
        }
    } else if (this.min_heap.heap.length > this.max_heap.heap.length) {
        if (num < this.min_heap.heap[0]) {
            this.max_heap.insert(num);
        } else {
            this.max_heap.insert(this.min_heap.heap[0]);
            this.min_heap.heap[0] = num;
            this.min_heap.shiftDown(0);
        }
    } else if (this.min_heap.heap.length < this.max_heap.heap.length) {
        if (num > this.max_heap.heap[0]) {
            this.min_heap.insert(num);
        } else {
            this.min_heap.insert(this.max_heap.heap[0]);
            this.max_heap.heap[0] = num;
            this.max_heap.shiftDowm(0);
        }
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if (this.min_heap.heap.length === this.max_heap.heap.length) {
        return (this.min_heap.heap[0] + this.max_heap.heap[0]) / 2;
    } else if (this.min_heap.heap.length > this.max_heap.heap.length) {
        return this.min_heap.heap[0];
    } else {
        return this.max_heap.heap[0];
    }
};

// 小根堆
class MinHeap {
    heap = [];

    swap(index1, index2) {
        let temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    // 插入一个元素
    insert(value) {
        this.heap.push(value);
        this.shiftUp(this.heap.length - 1);
    }

    shiftUp(index) {
        let parentNodeIndex = (index - 1) >>> 1;
        if (index !== 0 && this.heap[index] < this.heap[parentNodeIndex]) {
            this.swap(parentNodeIndex, index);
            this.shiftUp(parentNodeIndex);
        }
    }

    shiftDown(index) {
        let leftNodeIndex = (index + 1) * 2 - 1;
        let rightNodeIndex = (index + 1) * 2;

        if (leftNodeIndex < this.heap.length && this.heap[leftNodeIndex] < this.heap[index]) {
            this.swap(index, leftNodeIndex);
            this.shiftDown(leftNodeIndex);
        }
        if (rightNodeIndex < this.heap.length && this.heap[rightNodeIndex] < this.heap[index]) {
            this.swap(index, rightNodeIndex);
            this.shiftDown(rightNodeIndex);
        }
    }
}

// 大根堆
class BigHeap {
    heap = [];

    swap(index1, index2) {
        let temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    insert(value) {
        this.heap.push(value);
        this.shiftUp(this.heap.length - 1);
    }

    shiftUp(index) {
        let parentNodeIndex = (index - 1) >>> 1;
        if (index !== 0 && this.heap[index] > this.heap[parentNodeIndex]) {
            this.swap(index, parentNodeIndex);
            this.shiftUp(parentNodeIndex);
        }
    }

    shiftDowm(index) {
        let leftNodeIndex = (index + 1) * 2 - 1;
        let rightNodeIndex = (index + 1) * 2;

        // 左子树节点值 > 根节点值
        if (leftNodeIndex < this.heap.length && this.heap[leftNodeIndex] > this.heap[index]) {
            this.swap(leftNodeIndex, index);
            this.shiftDowm(leftNodeIndex);
        }
        if (rightNodeIndex < this.heap.length && this.heap[rightNodeIndex] > this.heap[index]) {
            this.swap(rightNodeIndex, index);
            this.shiftDowm(rightNodeIndex);
        }
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

const heap = new MedianFinder();
heap.addNum(1);
heap.addNum(2);
console.log(heap.findMedian());
heap.addNum(3);
console.log(heap.findMedian());