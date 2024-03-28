/**
 * 79. 单词搜索 https://leetcode.cn/problems/word-search/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
 * 同一个单元格内的字母不允许被重复使用。
 * @param board
 * @param word
 * @return {boolean}
 */
const exist = (board, word) => {
    const m = board.length;
    const n = board[0].length;
    // 构建一个和board大小的二维矩阵，存放当前节点是否被访问
    const usedArr = new Array(m).fill(false).map(_ => new Array(n).fill(false));

    // 递归函数，判断当前点是否是目标路径上的点
    const canFind = (row, col, index) => {
        // 递归出口
        if (index === word.length) {
            return true;
        }

        // 矩阵坐标边界出界
        if (row < 0 || row >= m || col < 0 || col >= n) {
            return false;
        }

        // 已经遍历过或者当前点不等于目标字符
        if (usedArr[row][col] || board[row][col] !== word[index]) {
            return false;
        }

        // 遍历过的坐标标记为true
        usedArr[row][col] = true;
        // 寻找下一个点，递归
        const flag = canFind(row + 1, col, index + 1)
            || canFind(row - 1, col, index + 1)
            || canFind(row, col + 1, index + 1)
            || canFind(row, col - 1, index + 1);

        // 基于当前坐标，能为剩下的字符找到路径
        if (flag) {
            return true;
        }

        // 回溯
        usedArr[row][col] = false;
        return false;
    }

    // 遍历二维矩阵找目标单词起点和递归入口
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 找到字符串起点，且找到目标路径起点
            if (board[i][j] === word[0] && canFind(i, j, 0)) {
                return true;
            }
        }
    }

    // 如果都没找到，最终返回false
    return false;
}

/**
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
 * 输出：true
 */

const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED";
console.log(exist(board, word));