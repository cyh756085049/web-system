function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 105. 从前序与中序遍历序列构造二叉树 https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * @param preorder
 * @param inorder
 * @return {TreeNode|null}
 */
const buildTree = (preorder, inorder) => {
    if (!preorder.length) {
        return null;
    }

    // 前序遍历第一个节点为根节点，构建新树的根节点
    const node = new TreeNode(preorder[0]);
    // 根据前序遍历的根节点获取中序遍历对应的根节点的索引，划分中序遍历的左右子树
    const index = inorder.indexOf(preorder[0]);
    // 中序遍历的左子树
    const inorderLeft = inorder.slice(0, index);
    // 中序遍历的右子树
    const inorderRight = inorder.slice(index + 1);
    // 前序遍历的左子树
    const preorderLeft = preorder.slice(1, index + 1);
    // 前序遍历的右子树
    const preorderRight = preorder.slice(index + 1);

    node.left = buildTree(preorderLeft, inorderLeft);
    node.right = buildTree(preorderRight, inorderRight);

    return node;
}

const preorder = [3,9,20,15,7], inorder = [9,3,15,20,7];
console.log(buildTree(preorder, inorder));