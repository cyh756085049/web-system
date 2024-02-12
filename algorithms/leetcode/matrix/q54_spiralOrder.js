const spiralOrder = (matrix) => {
    const rowLength = matrix.length;
    const colLength = matrix[0].length;
    let top = 0, bottom = rowLength - 1, left = 0, right = colLength - 1;
    const res = [];

    while (top <= bottom && left <= right) {
        // 从左到右
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i]);
        }
        top++;

        // 从上到下
        for (let i = top; i <= bottom; i++) {
            res.push(matrix[i][right]);
        }
        right--;

        if (top > bottom || left > right) {
            break;
        }

        // 从右到左
        for (let i = right; i >= left; i--) {
            res.push(matrix[bottom][i]);
        }
        bottom--;

        // 从下到上
        for (let i = bottom; i >= top; i--) {
            res.push(matrix[i][left]);
        }
        left++;
    }

    return res;
}

/**
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 */

const matrix = [[1,2,3],[4,5,6],[7,8,9]];
console.log('螺旋矩阵：', spiralOrder(matrix));