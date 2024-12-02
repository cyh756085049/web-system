/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    const targetNum = newInterval[0];
    const index = getAddIndex(intervals, targetNum);
    const newIntervals = intervals.splice(index, 0, newInterval);

    let preInterval = intervals[0];

    const res = [];

    for (let i = 1; i < intervals.length; i++) {
        const curInterval = intervals[i];

        if (curInterval[0] <= preInterval[1]) {
            preInterval = [preInterval[0], Math.max(preInterval[1], curInterval[1])];
        } else {
            res.push(preInterval);
            preInterval = curInterval;
        }
    }

    res.push(preInterval);

    return res;
};

const getAddIndex = (intervals, targetNum) => {
    let left = 0;
    let right = intervals.length - 1;

    while (left <= right) {
        const middle = Math.floor((right - left) / 2) + left;

        if (targetNum > intervals[middle][0]) {
            left = middle + 1;
        } else if (targetNum < intervals[middle][0]) {
            right = middle - 1;
        } else {
            return middle;
        }
    }

    return left;
}
const intervals = [[1,3],[6,9]], newInterval = [2,5];
console.log('插入区间', insert(intervals, newInterval));
