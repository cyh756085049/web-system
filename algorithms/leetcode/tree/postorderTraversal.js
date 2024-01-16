function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 145. 二叉树的后序遍历 https://leetcode.cn/problems/binary-tree-postorder-traversal/description/
 * 思路：递归、栈迭代
 * 复杂度：时间复杂度O(n) 空间复杂度O(n)
 * @param root
 * @return {*[]}
 */
const postorderTraversal = (root) => {
    const res = [];

    const postorderNode = (root) => {
        if (root === null) {
            return;
        }
        postorderNode(root.left);
        postorderNode(root.right);
        res.push(root.val);
    }

    postorderNode(root);
    return res;
}

const postorderTraversalByStack = (root) => {
    const res = [];
    if (root === null) {
        return res;
    }

    const stack = [];
    stack.push(root);

    while (stack.length) {
        const cur = stack.pop();
        res.unshift(cur.val);

        if (cur.left) {
            stack.push(cur.left);
        }

        if (cur.right) {
            stack.push(cur.right);
        }
    }

    return res;
}