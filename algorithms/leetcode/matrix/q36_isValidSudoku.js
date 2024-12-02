/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const row = board.length;
    const col = board[0].length;

    const rowArr = new Array(row).fill(0).map(_ => new Array(10).fill(0));
    const colArr = new Array(col).fill(0).map(_ => new Array(10).fill(0));
    const boxArr = new Array(row).fill(0).map(_ => new Array(10).fill(0));

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (board[i][j] === '.') {
                continue;
            }

            // 题目给的char类型，-'0' 是为了转 数字
            let curNum = board[i][j] - '0';

            if (rowArr[i][curNum] === 1) {
                return false;
            }

            if (colArr[j][curNum] === 1) {
                return false;
            }

            if (boxArr[Math.floor(j/3) + Math.floor(i/3) * 3][curNum]) {
                return false;
            }

            rowArr[i][curNum] = 1;
            colArr[j][curNum] = 1;
            boxArr[Math.floor(j/3) + Math.floor(i/3) * 3][curNum] = 1;
        }
    }

    return true;
};

const board =
    [["5","3",".",".","7",".",".",".","."]
        ,["6",".",".","1","9","5",".",".","."]
        ,[".","9","8",".",".",".",".","6","."]
        ,["8",".",".",".","6",".",".",".","3"]
        ,["4",".",".","8",".","3",".",".","1"]
        ,["7",".",".",".","2",".",".",".","6"]
        ,[".","6",".",".",".",".","2","8","."]
        ,[".",".",".","4","1","9",".",".","5"]
        ,[".",".",".",".","8",".",".","7","9"]];

console.log('有效的数独', isValidSudoku(board));