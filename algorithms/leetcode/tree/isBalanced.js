function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 110. 平衡二叉树 https://leetcode.cn/problems/balanced-binary-tree/description/
 *
 * 自顶向下（优化版）
 * 思路：利用后续遍历二叉树（左右根），从底至顶返回子树最大高度，判定每个子树是不是平衡树 ，
 * 如果平衡，则使用它们的高度判断父节点是否平衡，并计算父节点的高度，如果不平衡，返回 -1 。
 * 遍历比较二叉树每个节点 的左右子树深度：
 * 比较左右子树的深度，若差值大于 1 则返回一个标记 -1 ，表示当前子树不平衡
 * 左右子树有一个不是平衡的，或左右子树差值大于 1 ，则二叉树不平衡
 * 若左右子树平衡，返回当前树的深度（左右子树的深度最大值 +1 ）
 *
 * 复杂度：时间复杂度 O(n) 空间复杂度 O(n)
 * @param root
 */
const isBalanced = (root) => {
    return balanced(root) !== -1;
}

const balanced = (node) => {
    if (!node) {
        return 0;
    }

    // 后序遍历
    const left = balanced(node.left);
    const right = balanced(node.right);

    // -1 表示子树不平衡
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
        return -1;
    }

    // 左右子树平衡，返回当前树的深度
    return Math.max(left, right) + 1;
}

/**
 * 自顶向下的比较每个节点的左右子树的最大高度差，如果二叉树中每个节点的左右子树最大高度差小于等于 1 ，
 * 即每个子树都平衡时，此时二叉树才是平衡二叉树
 *
 * 复杂度：时间复杂度 O(nlogn) 空间复杂度 O(n)
 * @param root
 * @return {false|boolean|*}
 */
const isBalancedByCalculateDepth = (root) => {
    if (!root) {
        return true;
    }

    return Math.abs(depth(root.left) - depth(root.right)) <= 1
        && isBalancedByCalculateDepth(root.left)
        && isBalancedByCalculateDepth(root.right);
}

const depth = (node) => {
    if (!node) {
        return -1;
    }
    return Math.max(depth(node.left), depth(node.right)) + 1;
}

const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(4);

root.left.left = new TreeNode(5);
root.left.right = new TreeNode(6);
root.left.left.left = new TreeNode(2);

console.log('树1', root, '是否是二叉平衡树：', isBalanced(root));
console.log('树2', root, '是否是二叉平衡树：', isBalancedByCalculateDepth(root));

