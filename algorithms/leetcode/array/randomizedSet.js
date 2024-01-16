const RandomizedSet = function () {
    // map方式
    this.map = new Map();
    this.values = [];

    // set方式
    this.set = new Set();
}

RandomizedSet.prototype.mapInsert = function (val) {
    // 当前值存在
    if (this.map.has(val)) {
        return false;
    }
    // 当前值不存在，添加
    this.map.set(val, this.values.length);
    this.values.push(val);
    return true;
}

RandomizedSet.prototype.mapRemove = function (val) {
    // 当前值不存在
    if (!this.map.has(val)) {
        return false;
    }

    const index = this.map.get(val);
    // 当前待删除的元素是数组的最后一个
    if (index === this.values.length - 1) {
        this.values.pop();
        this.map.delete(val);
    } else {
        const lastValue = this.values.pop();
        this.values[index] = lastValue;
        this.map.set(lastValue, index);
        this.map.delete(val);
    }
    return true;
}

RandomizedSet.prototype.mapGetRandom = function (val) {
    const length = this.values.length;
    const random = Math.floor(Math.random() * length);
    return this.values[random];
}

RandomizedSet.prototype.setInsert = function (val) {
    // 当前值存在
    if (this.set.has(val)) {
        return false;
    }
    // 当前值不存在，添加
   this.set.add(val);
    return true;
}

RandomizedSet.prototype.setRemove = function (val) {
    // 当前值不存在
    if (!this.set.has(val)) {
        return false;
    }

    this.set.delete(val);
    return true;
}

RandomizedSet.prototype.setGetRandom = function (val) {
    const random = parseInt(Math.random() * this.set.size);
    return [...this.set][random];
}

const randomizedSet = new RandomizedSet();
console.log('----------map方式----------------');
console.log(randomizedSet.mapInsert(1)); // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
console.log(randomizedSet.mapRemove(2)); // 返回 false ，表示集合中不存在 2 。
console.log(randomizedSet.mapInsert(2)); // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
console.log(randomizedSet.mapGetRandom()); // getRandom 应随机返回 1 或 2 。
console.log(randomizedSet.mapRemove(1)); // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
console.log(randomizedSet.mapInsert(2)); // 2 已在集合中，所以返回 false 。
console.log(randomizedSet.mapGetRandom()); // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
console.log('----------set方式----------------');
console.log(randomizedSet.setInsert(1)); // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
console.log(randomizedSet.setRemove(2)); // 返回 false ，表示集合中不存在 2 。
console.log(randomizedSet.setInsert(2)); // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
console.log(randomizedSet.setGetRandom()); // getRandom 应随机返回 1 或 2 。
console.log(randomizedSet.setRemove(1)); // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
console.log(randomizedSet.setInsert(2)); // 2 已在集合中，所以返回 false 。
console.log(randomizedSet.setGetRandom()); // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。