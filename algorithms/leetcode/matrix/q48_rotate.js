/**
 * 48. 旋转图像 https://leetcode.cn/problems/rotate-image/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像
 * 思路： 使用水平翻转和主对角线翻转实现
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = (matrix) => {
    const length = matrix.length;
    // 水平翻转 只需要遍历行上半部分，和下半部分交换
    for (let i = 0; i < Math.floor(length / 2); i++) {
         for (let j = 0; j < length; j++) {
             [matrix[i][j], matrix[length - i - 1][j]] = [matrix[length - i - 1][j], matrix[i][j]];
         }
    }

    // 对角线翻转 只需要遍历对角线左侧元素，和对角线右侧元素交换
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    return matrix;
}

/**
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[[7,4,1],[8,5,2],[9,6,3]]
 *
 * 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 */

const matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
console.log('旋转图像：', rotate(matrix));