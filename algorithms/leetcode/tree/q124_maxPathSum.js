function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 124. 二叉树中的最大路径和 https://leetcode.cn/problems/binary-tree-maximum-path-sum/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：递归 题解：https://leetcode.cn/problems/binary-tree-maximum-path-sum/solutions/297276/shou-hui-tu-jie-hen-you-ya-de-yi-dao-dfsti-by-hyj8/?envType=study-plan-v2&envId=top-100-liked
 *
 * ol;.a g  v  t
 * @return {number}
 */
const maxPathSum = (root) => {
    // 设置max默认值时，因为存在负数，所以不能使用Number.MIN_VALUE, Number.MIN_VALUE 表示最小正有限数字
    let max = -Infinity;

    if (root === null) {
        return 0;
    }

    // 返回经过root的单边分支最大和
    const dfs = (root) => {
        // 遍历到null节点，收益0
        if (root === null) {
            return 0;
        }

        // // 计算左边分支的最大值，左边分支为负数则不计算
        const leftMax = Math.max(0, dfs(root.left));
        // 计算右边分支的最大值，右边分支为负数则不计算
        const rightMax = Math.max(0, dfs(root.right));
        // 更新最大值
        max = Math.max(max, root.val + leftMax + rightMax);
        // 返回经过root的单边最大分支给当前root的父节点使用
        return root.val + Math.max(leftMax, rightMax);
    }

    dfs(root);
    return max;
}

/**
 * 输入：root = [1,2,3]
 * 输出：6
 * 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
 *
 * 输入：root = [-10,9,20,null,null,15,7]
 * 输出：42
 * 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 */

const root = new TreeNode(-10);
root.left = new TreeNode(9, null, null);
root.right = new TreeNode(20, new TreeNode(15, null, null), new TreeNode(7, null, null));


// const root = new TreeNode(-3, null, null);
console.log(maxPathSum(root));