function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 94. 二叉树的中序遍历: https://leetcode.cn/problems/binary-tree-inorder-traversal/description/
 * 思路：递归、栈迭代
 * 复杂度：时间复杂度O(n) 空间复杂度O(n)
 * @param root
 * @return {*[]}
 */
const inorderTraversal = (root) => {
    const res = [];

    const inorderNode = (root) => {
        if (root === null) {
            return;
        }
        inorderNode(root.left);
        res.push(root.val);
        inorderNode(root.right);
    }

    inorderNode(root);
    return res;
}

const inorderTraversalStack = (root) => {
    const res = [];
    if (root === null) {
        return res;
    }
    const stack= [];
    let cur = root;
    // 中序遍历:左根右
    while (cur !== null || stack.length > 0) {
        while (cur !== null) {
            stack.push(cur);
            cur = cur.left;
        }

        const node = stack.pop();
        res.push(node.val);
        cur = node.right;
    }

    return res;
}