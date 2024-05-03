/**
 * 51. N 皇后 https://leetcode.cn/problems/n-queens/description/?envType=study-plan-v2&envId=top-100-liked
 * 题解：https://leetcode.cn/problems/n-queens/solutions/399133/shou-hua-tu-jie-cong-jing-dian-de-nhuang-hou-wen-t/
 * @param n
 * @return {[]}
 */
const solveNQueens = (n) => {
    const board = new Array(n).fill('.').map(_ => new Array(n).fill('.'));
    const res = [];

    // 剪枝无效选择
    const isValid = (row, col) => {
        // 之前的行
        for (let i = 0; i < row; i++) {
            // 所有的列
            for (let j = 0; j < n; j++) {
                // 发现了皇后，并且和自己同列、对角线，则不是合法的选择
                if (board[i][j] === 'Q' && (j === col || i + j === row + col || i - j === row - col)) {
                    return false;
                }
            }
        }
        return true;
    }
    // 放置当前行的皇后
    const helper = (row) => {
        // 递归出口
        if (row === n) {
            console.log('board', board);
            const copyBoard = board.slice(); // 相当于利用slice拷贝一份新的数据
            for (let i = 0; i < n; i++) {
                // 将每一行拼成字符串
                copyBoard[i] = copyBoard[i].join('');
            }
            res.push(copyBoard);
            return;
        }

        // 枚举出所有的选择
        for (let col = 0; col < n; col++) {
            // 有效数据，继续递归
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                helper(row + 1);
                // 回溯，撤销当前选择
                board[row][col] = '.';
            }
        }
    }

    helper(0);
    return res;
}

const n = 4;
console.log('n皇后问题', solveNQueens(n));