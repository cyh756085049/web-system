/**
 * @param {number[][]} points
 * @return {number}
 */
/**
 * 题解：https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    if (points.length === 1) {
        return points.length;
    }

    // 如果按照左端排序，会存在前边包后边的情况
    points.sort((a, b) => a[1] - b[1]);

    let count = 0;
    let i = 0;
    while (i < points.length) {
        const right = points[i][1];
        i++;

        while (i < points.length && points[i][0] <= right) {
            i++;
        }
        count++;
    }

    return count;
};

// const points = [[10,16],[2,8],[1,6],[7,12]];
const points1 = [[1,2],[3,4],[5,6],[7,8]];

console.log('用最少数量的箭引爆气球', findMinArrowShots(points1));