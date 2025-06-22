/**
* name: p380_randomizedSet
* description: 哈希表
* author: Ramona Chen
* time: 2025-06-20 20:18:47
* {@link }
*/
/**
 * 380. O(1) 时间插入、删除和获取随机元素
 * https://leetcode.cn/problems/insert-delete-getrandom-o1/description/?envType=study-plan-v2&envId=top-interview-150
 * @constructor
 */
var RandomizedSet = function() {
  this.map = new Map();
  this.values = [];
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
  if (this.map.has(val)) {
    return false;
  }

  this.map.set(val, this.values.length);
  this.values.push(val);
  return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
  if (!this.map.has(val)) {
    return false;
  }

  const index = this.map.get(val);
  if (index === this.values.length - 1) {
    this.values.pop();
  } else {
    const value = this.values.pop();
    this.values[index] = value;
    this.map.set(value, index);
  }

  this.map.delete(val);

  return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
  const random = Math.floor(Math.random() * this.values.length);

  return this.values[random];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

const randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
randomizedSet.remove(2); // 返回 false ，表示集合中不存在 2 。
randomizedSet.insert(2); // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
randomizedSet.getRandom(); // getRandom 应随机返回 1 或 2 。
randomizedSet.remove(1); // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
randomizedSet.insert(2); // 2 已在集合中，所以返回 false 。
randomizedSet.getRandom(); // 由于 2 是集合中唯一的数字，getRandom 总是返回 2