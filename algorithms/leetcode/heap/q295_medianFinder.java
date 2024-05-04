class MedianFinder {
    // 大顶堆存放前 k/2 个元素，堆顶元素是前半段数据的结束位置
    private PriorityQueue<Integer> maxHeap;
    // 小顶堆存放后 k/2 个元素，堆顶元素为后半段数据的开始位置
    private PriorityQueue<Integer> minHeap;

    public MedianFinder() {
        minHeap = new PriorityQueue<>();
        maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
    }

    public void addNum(int num) {
        if (maxHeap.size() == minHeap.size()) {
            maxHeap.offer(num);
            minHeap.offer(maxHeap.poll());
        } else {
            minHeap.offer(num);
            maxHeap.offer(minHeap.poll());
        }
    }

    // 当数据个数为奇数时，大顶堆的元素个数大于小顶堆元素个数取，大顶堆的堆顶元素作为中位数，否则反之
    // 当数据个数为偶数时，取大顶堆与小顶堆的堆顶之和的平均值作为中位数
    public double findMedian() {
        if (minHeap.size() == maxHeap.size()) {
            return (minHeap.element() + maxHeap.element()) / 2.0;
        }
        return minHeap.size() < maxHeap.size() ? maxHeap.element() : minHeap.element();
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder();
 * obj.addNum(num);
 * double param_2 = obj.findMedian();
 */