/**
 * 73. 矩阵置零 https://leetcode.cn/problems/set-matrix-zeroes/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
 * 空间复杂度 O(1)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = (matrix) => {
    const rowLength = matrix.length;
    const colLength = matrix[0].length;

    // 首行为0标志
    let row0Flag = false;
    // 首列为0标志
    let col0Flag = false;

    // 遍历行，更新首列为0的标志位
    for (let i = 0; i < rowLength; i++) {
        if (matrix[i][0] === 0) {
            col0Flag = true;
            break;
        }
    }

    // 遍历列，更新首行为0的标志位
    for (let i = 0; i < colLength; i++) {
        if (matrix[0][i] === 0) {
            row0Flag = true;
            break;
        }
    }

    // 遍历非首行首列
    for (let i = 1; i < rowLength; i++) {
        for (let j = 1; j < colLength; j++) {
            if (matrix[i][j] === 0) {
               matrix[i][0] = 0;
               matrix[0][j] = 0;
            }
        }
    }
    console.log('非首行首列矩阵 matrix', matrix);

    // 非首行和首列置0
    for (let i = 1; i < rowLength; i++) {
        for (let j = 1; j < colLength; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    console.log('非首行首列置0', matrix);
    // 首行存在0，则首行置0
    if (row0Flag) {
        for (let i = 0; i < colLength; i++) {
            matrix[0][i] = 0;
        }
    }

    // 首列存在0，则首列置0
    if (col0Flag) {
        for (let i = 0; i < rowLength; i++) {
            matrix[i][0] = 0;
        }
    }

    return matrix;
}

/**
 * 输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
 * 输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 */

const matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]];
console.log('矩阵置零：', setZeroes(matrix));
