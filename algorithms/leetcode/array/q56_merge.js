/**
 * 56. 合并区间 https://leetcode.cn/problems/merge-intervals/?envType=study-plan-v2&envId=top-100-liked
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
 * 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = (intervals) => {
    if (intervals.length <= 1) {
        return intervals;
    }

    // 先将区间数组按照区间起始值进行正序排序
    intervals.sort((a, b) => a[0] - b[0]);

    // 结果数组
    const res = [];
    // preInterval 初始为第一个区间，curInterval 表示当前的区间
    let preInterval = intervals[0];
    // 遍历目标数组，比较初始区间的左元素和当前区间的右元素，如果重合，则更新当前区间的右边界为两个值中的最大值，
    // 遇到不重合的添加到结果集中，并更新区间
    for (let i = 1; i < intervals.length; i++) {
        const curInterval = intervals[i];
        if (preInterval[1] >= curInterval[0]) {
            preInterval[1] = Math.max(preInterval[1], curInterval[1]);
        } else {
            res.push(preInterval);
            preInterval = curInterval;
        }
    }

    res.push(preInterval);
    return res;
}

/**
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 */

const intervals = [[1,3], [2,6], [8,10], [15,18]];
console.log('合并区间', merge(intervals));