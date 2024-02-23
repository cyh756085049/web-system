/**
 * 146. LRU 缓存 https://leetcode.cn/problems/lru-cache/description/?envType=study-plan-v2&envId=top-100-liked
 * @param capacity
 * @constructor
 */
const LRUCache = function (capacity) {
    this.capacity = capacity;
    this.cache = new Map();
}

LRUCache.prototype.get = function (key) {
    // 存在即更新
    if (this.cache.has(key)) {
        const value = this.cache.get(key);
        // 将存在的先删除再重新加入到最后
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    return -1;
}

LRUCache.prototype.put = function (key, value) {
    // 存在则更新值
    if (this.cache.has(key)) {
        this.cache.delete(key);
    // 当前缓存数量大于等于capacity，删除最久未使用的关键字
    } else if (this.cache.size >= this.capacity) {
        this.cache.delete(this.cache.keys().next().value);
    }

    this.cache.set(key, value);
}

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(lRUCache.get(1))    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lRUCache.get(2))    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lRUCache.get(1))    // 返回 -1 (未找到)
console.log(lRUCache.get(3))    // 返回 3
console.log(lRUCache.get(4))    // 返回 4