function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 104. 二叉树的最大深度 https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/
 * 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数
 *
 * 递归实现
 * @param root
 */
const maxDepth = (root) => {
    if (!root) {
        return 0;
    }

    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return Math.max(leftDepth, rightDepth) + 1;
}

/**
 * 层序遍历
 * @param root
 */
const maxDepthBFS = (root) => {
    if (!root) {
        return 0;
    }

    const queue = [];
    queue.push(root);
    let maxDepth = 0;
    while (queue.length > 0) {
        let res = [];
        let size = queue.length;
        while (size > 0) {
            const node = queue.shift();
            res.push(node.val);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }

            size--;
        }
        maxDepth++;
    }

    return maxDepth;
}

