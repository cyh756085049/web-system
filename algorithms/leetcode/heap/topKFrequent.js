/**
 * 347. 前 K 个高频元素 https://leetcode.cn/problems/top-k-frequent-elements/description/
 * 思路1： 利用 map 记录每个元素出现的频率，利用数组来比较排序元素
 * 复杂度：时间复杂度 O(nlogn) 空间复杂度 O(n)
 * @param nums
 * @param k
 * @return {any[]}
 */
const topKFrequent = (nums, k) => {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], (map.get(nums[i]) || 0) + 1);
    }
    console.log(map.keys(), map.values(), Array.from(map.keys()));
    const newArray = Array.from(map.keys());
    return newArray.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
}

console.log(topKFrequent([1,1,1,2,2,3], 2));