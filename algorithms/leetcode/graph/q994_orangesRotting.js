/**
 * 994. 腐烂的橘子 https://leetcode.cn/problems/rotting-oranges/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：返回直到单元格中没有新鲜橘子为止所必须经过的最小分钟数 可转化为 求腐烂橘子到所有新鲜橘子的最短路径
 * 值 0 代表空单元格；值 1 代表新鲜橘子；值 2 代表腐烂的橘子
 * @param grid
 * @return {number}
 */
const orangesRotting = (grid) => {
    const row = grid.length;
    const col = grid[0].length;

    // 用队列保存腐烂的橘子，进行广度优先遍历 BFS
    const queue = [];
    // 新鲜的橘子的数量
    let count = 0;

    // 找出所有腐烂的橘子，将其放入队列中，做为BFS的第0层结点，同时记录所有的新鲜橘子数量
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === 1) {
                count++;
            } else if (grid[i][j] === 2) {
                queue.push([i, j]);
            }
        }
    }

    let minutes = 0;
    while (count > 0 && queue.length > 0) {
        minutes++;
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const curOrange = queue.shift();
            const [curRow, curCol] = curOrange;

            // 上一行
            if (curRow - 1 >= 0 && grid[curRow - 1][curCol] === 1) {
                grid[curRow - 1][curCol] = 2;
                count--;
                queue.push([curRow - 1, curCol]);
            }

            // 下一行
            if (curRow + 1 < row && grid[curRow + 1][curCol] === 1) {
                grid[curRow + 1][curCol] = 2;
                count--;
                queue.push([curRow + 1, curCol]);
            }
            // 左一列
            if (curCol - 1 >= 0 && grid[curRow][curCol - 1] === 1) {
                grid[curRow][curCol - 1] = 2;
                count--;
                queue.push([curRow, curCol - 1]);
            }
            // 右一列
            if (curCol + 1 < col && grid[curRow][curCol + 1] === 1) {
                grid[curRow][curCol + 1] = 2;
                count--;
                queue.push([curRow, curCol + 1]);
            }
        }
    }

    // 如果还存在新鲜的橘子，则直接返回-1
    if (count > 0) {
        return -1;
    } else {
        return minutes;
    }
}

const grid = [[2,1,1],[1,1,0],[0,1,1]];
console.log('腐烂的橘子', orangesRotting(grid));