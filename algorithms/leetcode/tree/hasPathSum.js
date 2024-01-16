function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 112. 路径总和 https://leetcode.cn/problems/path-sum/description/
 * 解题思路：
 * 遍历整颗树，当前节点不是叶子节点，则递归遍历它的所有子节点，传递的参数就是 sum 减去当前的节点值
 * 如果当前节点是叶子节点，判断参数 sum 是否等于当前节点值，相等则返回 true,否则返回 false
 * @param root
 * @param targetSum
 */
const hasPathSum = (root, targetSum) => {
    if (root === null) {
        return false;
    }

    if (root.left === null && root.right === null) {
        return root.val === targetSum;
    }

    targetSum = targetSum - root.val;
    return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
}