/**
 * 200. 岛屿数量 https://leetcode.cn/problems/number-of-islands/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * 此外，你可以假设该网格的四条边均被水包围。
 * @param grid
 * @return {number}
 */
const numIsLands = (grid) => {
    let res = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === '1') {
                dfs(grid, row, col);
                res++;
            }
        }
    }
    return res;
}

const dfs = (grid, row, col) => {
    // 判断是否越界
    if (!isArea(grid, row, col)) {
        return;
    }

    if (grid[row][col] !== '1') {
        return;
    }

    // 标记已经遍历过的
    grid[row][col] = false;

    // 深度优先搜索，访问上下左右四个相邻的结点
    dfs(grid, row + 1, col);
    dfs(grid, row - 1, col);
    dfs(grid, row, col + 1);
    dfs(grid, row, col - 1);
}

const isArea = (grid, row, col) => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

/**
 * 输入：grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * 输出：3
 */

const grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
];
console.log(numIsLands(grid));