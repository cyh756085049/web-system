function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 226. 翻转二叉树 https://leetcode.cn/problems/invert-binary-tree/description/
 * @param root
 * @return {*}
 */
const invertTree = (root) => {
    if (root === null) {
        return root;
    }

    // 先翻转当前节点的左右子树
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
    // 遍历左子树
    invertTree(root.left);
    // 遍历右子树
    invertTree(root.right);
    return root;
}