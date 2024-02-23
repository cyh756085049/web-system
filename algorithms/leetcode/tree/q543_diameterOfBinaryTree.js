/**
 * 543.二叉树的直径 https://leetcode.cn/problems/diameter-of-binary-tree/?envType=study-plan-v2&envId=top-100-liked
 * 给你一棵二叉树的根节点，返回该树的 直径 。
 * 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。
 * 两节点之间路径的 长度 由它们之间边数表示。
 * @param root
 * @return {number}
 */
const diameterOfBinaryTree = (root) => {
    let res = 0;

    const maxDepth = (root) => {
        if (root === null) {
            return 0;
        }

        const left = maxDepth(root.left);
        const right = maxDepth(root.right);
        res = Math.max(res, left + right);
        return Math.max(left, right) + 1;
    }

    maxDepth(root);
    return res;
}
