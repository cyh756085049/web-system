/**
 * 输入整数数组 arr ，找出其中最小的 k 个数。 https://github.com/sisterAn/JavaScript-Algorithms/issues/59
 * 例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
 * 思路：排序 + 分割
 * 复杂度：时间复杂度O(nlogn) 空间复杂度 O(logn)
 * @param arr
 * @param k
 * @return {*}
 */
const getLeastNumbers = (arr, k) => {
    arr.sort((a, b) => a - b);
    return arr.slice(0, k);
}

const getLeastNumbersByHeap = (arr, k) => {
    // 从 arr 中取出前 k 个数，构建一个大顶堆
    let heap = [,], i = 0;
    while (i < k) {
        heap.push(arr[i]);
        i++;
    }

    buildHeap(heap, k);

    // 从 k 位开始遍历数组
    for (let i = k; i < arr.length; i++) {
        if (heap[1] > arr[i]) {
            heap[1] = arr[i];
            heapify(heap, k, 1);
        }
    }

    // 删除 heap 中第一个元素 ？？
    heap.shift();
    return heap;
}

// 原地建堆，自上而下
const buildHeap = (arr, k) => {
    if (k === 1) return;
    // 从最后一个非叶子节点开始，自上而下式堆化
    for (let i = Math.floor(k/2); i >= 1; i--) {
        heapify(arr, k, i);
    }
}

const heapify = (arr, k, i) => {
    while (true) {
        let maxIndex = i;
        if (2*i <= k && arr[2*i] > arr[i]) {
            maxIndex = 2*i;
        }
        if (2*i + 1 <= k && arr[2*i + 1] > arr[maxIndex]) {
            maxIndex = 2*i + 1;
        }

        if (maxIndex !== i) {
            swap(arr, i, maxIndex);
        } else {
            break;
        }
    }
}

const swap = (arr, i ,j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

console.log(getLeastNumbers([2,5,7,4], 1));
console.log(getLeastNumbersByHeap([2,5,7,4], 1));