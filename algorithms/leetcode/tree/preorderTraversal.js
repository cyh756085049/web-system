function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 144. 二叉树的前序遍历： https://leetcode.cn/problems/binary-tree-preorder-traversal/description/
 * 思路：递归、栈迭代
 * 复杂度：时间复杂度O(n) 空间复杂度O(n)
 * @param root
 * @return {*[]}
 */
const preorderTraversal = (root) => {
    let res = [];

    const preOrderNode = (root) => {
        if (root === null) {
            return;
        }
        res.push(root.val);
        preOrderNode(root.left);
        preOrderNode(root.right);
    }

    preOrderNode(root);
    return res;
}

const preorderTraversalByStack = (root) => {
    const res = [];
    if (root === null) {
        return res;
    }

    const stack = [];
    stack.push(root);
    while (stack.length > 0) {
        const curNode = stack.pop();
        res.push(curNode.val);

        if (curNode.right) {
            stack.push(curNode.right);
        }

        if (curNode.left) {
            stack.push(curNode.left);
        }
    }

    return res;
}