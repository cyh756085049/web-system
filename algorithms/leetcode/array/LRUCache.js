/**
 * 146. LRU 缓存 https://leetcode.cn/problems/lru-cache/description/
 * 设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构.
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/7
 *
 * 时间复杂度：O(1) 空间复杂度：O(capacity)
 * @param capacity
 * @constructor
 */
const LRUCache = function (capacity) {
    this.capacity = capacity;
    this.cache = new Map();
}

LRUCache.prototype.get = function(key) {
    // 存在即更新
    if (this.cache.has(key)) {
        let value = this.cache.get(key);
        // 将其删除并重新加入到最后
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    return -1;
}

LRUCache.prototype.put = function (key, value)  {
    // 存在就更新，将其删除后重新加入
    if (this.cache.has(key)) {
        this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
        // 缓存超过最大值，则移除最近没有使用的
        this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
}

const lRUCache= new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
console.log(lRUCache.cache);
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(lRUCache.cache);
console.log(lRUCache.get(1));    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lRUCache.cache);
console.log(lRUCache.get(2));    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lRUCache.get(1));    // 返回 -1 (未找到)
console.log(lRUCache.get(3));    // 返回 3
console.log(lRUCache.get(4));    // 返回 4