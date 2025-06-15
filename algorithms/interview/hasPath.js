/**
* name: hasPath
* description: 在一个全是 0 和 1 的二维数组中，判断是否存在从左上角到右下角全为1的路径，每次移动方向只能从右或者向下
* author: Ramona Chen
* time: 2025-06-15 14:23:02
* {@link }
*/

const array = [
    [1, 0, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 1, 0, 1],
];
/**
 * 动态规划：状态定义，dp[i][j] 是否存在从 [0, 0] 到 [i, j] 全为1的路径
 * @param array
 * @return {any}
 */
const hasPath = (array) => {
    const m = array.length;
    const n = array[0].length;

    // 状态定义：dp[i][j] 表示是否存在从 [0, 0] 到 [i, j] 全为1的路径
    const dp = new Array(m).fill(false).map(() => new Array(n).fill(false));

    // 状态初始化，[0, 0] 坐标是否为1
    dp[0][0] = array[0][0] === 1;

    // 初始化第一列，是否存在第一列从[0, 0] 到 [i, 0] 全为1的路径，构建状态转化方程，需保证前一个状态为true，即dp[i - 1][0]
    for (let i = 1; i < m; i++) {
        dp[i][0] = array[i][0] === 1 && dp[i - 1][0];
    }

    // 初始化第一行，是否存在第一列从[0, 0] 到 [0, j] 全为1的路径，构建状态转化方程，需保证前一个状态为true，即dp[0][j - 1]
    for (let j = 1; j < n; j++) {
        dp[0][j] = array[0][j] === 1 && dp[0][j - 1];
    }

    // 初始化完成，开始正式遍历，从[1, 1] 到 [i, j] ，判断状态方程向左和向上是否为1，且当前元素也为1的路径
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = (dp[i - 1][j] || dp[i][j - 1]) && array[i][j] === 1;
        }
    }
    return dp[m - 1][n - 1];
}


/**
 * BFS 广度优先遍历，数据结构是队列，先进先出特征，队列保存节点坐标，进行广度遍历，判断是否从左上角到右下角全为1的路径是否存在
 */
const hasPathBFS = (array) => {
    const m = array.length;
    const n = array[0].length;

    const queue = [];
    // 左上角的坐标
    queue.push([0, 0]);
    // 节点坐标是否访问过
    const visited = new Array(m).fill(false).map(() => new Array(n).fill(false));
    // 初始化[0, 0] 被访问
    visited[0][0] = true;

    // 队列中存在数据时，进行遍历
    while (queue.length > 0) {
        // 先取出第一个坐标
        const cur = queue.shift();
        const [i, j] = cur;

        // 先判断当前坐标对应的值是否为1
        if (array[i][j] !== 1) {
            continue;
        }

        // 已经到了右下角坐标
        if (i === m - 1 && j === n - 1) {
            return true;
        }

        // 队列保存相邻的节点，即向下和向右
        // 向下
        if (i + 1 < m && !visited[i + 1][j]) {
            const bottom = [i + 1, j];
            queue.push(bottom);
            visited[i + 1][j] = true;
        }

        // 向右
        if (j + 1 < n && !visited[i][j + 1]) {
            const right = [i, j + 1];
            queue.push(right);
            visited[i][j + 1] = true;
        }
    }

    return false;
}

/**
 * DFS 深度优先遍历，递归调用
 * @param array
 * @return {boolean|*}
 */
const hasPathDFS = (array) => {
    // 行
    const m = array.length;
    // 列
    const n = array[0].length;

    // 记录坐标是否被访问过
    const visited = new Array(m).fill(false).map(() => new Array(n).fill(false));

    // 递归遍历
    const dfs = (array, i, j) => {
        // 坐标越界判断
        if (i >= m || i < 0 || j >= n || j < 0) {
            return false;
        }

        // 坐标被访问过
        if (visited[i][j]) {
            return false;
        }

        // 当前坐标值不为1
        if (array[i][j] !== 1) {
            return false;
        }

        // 到达右下角
        if (i === m - 1 && j === n - 1) {
            return true;
        }

        // 更新访问记录
        visited[i][j] = true;

        // 向下和向右递归
        return dfs(array, i + 1, j) || dfs(array, i, j + 1);
    }

    // 从[0, 0] 开始递归
    return dfs(array, 0, 0);
}

console.log(hasPath(array));
console.log(hasPathBFS(array));
console.log(hasPathDFS(array));
