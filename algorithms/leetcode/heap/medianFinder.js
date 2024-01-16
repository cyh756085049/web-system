/**
 * 295. 数据流的中位数
 * 这里需要维护两个堆：
 * 大顶堆：用来存取前 n/2 个小元素，如果 n 为奇数，则用来存取前 Math.floor(n/2) + 1 个元素，堆顶是最大的
 * 小顶堆：用来存取后 n/2 个小元素。堆顶是最小的
 * 那么，根据题目要求，中位数就为：
 * n 为奇数：中位数是大顶堆的堆顶元素
 * n 为偶数：中位数是大顶堆的堆顶元素与小顶堆的堆顶元素的平均值
 * 当数组为动态数组时，每当数组中插入一个元素时，都需要如何调整堆喃？
 * 如果插入元素比大顶堆的堆顶要大，则将该元素插入到小顶堆中；如果要小，则插入到大顶堆中。
 * 当插入完成后，如果大顶堆、小顶堆中元素的个数不满足我们已上的要求，我们就需要不断的将大顶堆的堆顶元素或小顶堆的堆顶元素移动到另一个堆中，直到满足要求
 * @constructor
 */
const MedianFinder = () => {
    // 小顶堆，保存后 n/2 的元素
    this.minHeap = new MinHeap();
    // 大顶堆，保存前 n/2 的元素
    this.maxHeap = new MaxHeap();
}

MedianFinder.prototype.addNum = (num) => {
    if (!this.maxHeap.getSize() || num < this.maxHeap.getHead()) {
        this.maxHeap.insert(num);
    } else {
        this.minHeap.insert(num);
    }

    if (this.maxHeap.getSize() - this.minHeap.getSize() > 1) {
        this.minHeap.insert(this.maxHeap.removeHead());
    }

    if (this.minHeap.getSize() > this.minHeap.getSize()) {
        this.maxHeap.insert(this.minHeap.removeHead());
    }
}

let MinHeap = () => {
    let heap = [];
    // 堆中元素数量
    this.getSize = () => heap.length - 1;

    // 插入
    this.insert = key => {
        heap.push(key);
        // 获取存储位置
        let i = heap.length - 1;
        while (Math.floor(i / 2) > 0 && heap[i] < heap[Math.floor(i / 2)]) {
            swap(heap, i, Math.floor(i / 2));
            i = Math.floor(i / 2);
        }
    }

    // 获取堆头
    this.getHead = () => {
        return heap.length > 1 ? heap[1] : null;
    }

    // 删除堆头并返回
    this.removeHead = () => {
        if (heap.length > 1) {
            if (heap.length === 2) {
                return heap.pop();
            }
            let num = heap[1];
            heap[1] = heap.pop();
            heapify(1);
            return num;
        }

        return null;
    }

    // 堆化
    let heapify = i => {
        let k = heap.length - 1;
        while (true) {
            let minIndex = i;
            if (2 * i <= k && heap[2 * i] < heap[i]) {
                minIndex = 2 * i;
            }

            if (2 * i + 1 <= k && heap[2 * i + 1] < heap[minIndex]) {
                minIndex = 2 * i + 1;
            }
            if (minIndex !== i) {
                swap(heap, i, minIndex);
                i = minIndex;
            } else {
                break;
            }
        }
    }
}

let MaxHeap = () => {
    let heap = [];
    // 堆中元素数量
    this.getSize = () => {
        return heap.length - 1;
    }
    // 插入大顶堆
    this.insert = key => {
        heap.push(key);
        // 获取存储位置
        let i = heap.length - 1;
        while (Math.floor(i / 2) > 0 && heap[i] > heap[Math.floor(i / 2)]) {
            swap(heap, i, Math.floor(i / 2));
            i = Math.floor(i / 2);
        }
    }

    // 获取堆头
    this.getHead = () => {
        return heap.length > 1 ? heap[1] : null;
    }

    this.removeHead = () => {
        if (heap.length > 1) {
            if (heap.length === 2) {
                return heap.pop();
            }
            let num = heap[1];
            heap[1] = heap.pop();
            heapify(1);
            return num;
        }
        return null;
    }

    let heapify = i => {
        let k = heap.length - 1;
        while (true) {
            let maxIndex = i;
            if (2 * i <= k && heap[2 * i] > heap[i]) {
                maxIndex = 2 * i;
            }
            if (2 * i + 1 <= k && heap[2 * i + 1] > heap[maxIndex]) {
                maxIndex = 2 * i + 1;
            }
            if (maxIndex !== i) {
                swap(heap, i, maxIndex);
                i = maxIndex;
            } else {
                break;
            }
        }
    }
}

let swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

