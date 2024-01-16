function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * 236. 二叉树的最近公共祖先 https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/
 * 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，
 * 满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
 * 思路：递归实现
 * 复杂度： 时间复杂度 O(n) 空间复杂度 O(n)  其中 n 为二叉树节点数；最差情况下，需要递归遍历树的所有节点。
 * @param root
 * @param p
 * @param q
 * @return {*}
 */
const lowestCommonAncestor = (root, p, q) => {
    // 当根节点为空或p为根节点或q为根节点的时候，最近公共祖先是根节点。
    if (root === null || p === root || q === root) {
        return root;
    }

    // p 或 q 不为根节点的时候，遍历左右子树，寻找最近公共祖先
    // 如果 p、q在左子树的最近公共祖先为空，那么p、q应该是位于右子树，最终二叉树的最近公共祖先是位于右子树上的 p、q 最近公共组先，反之亦然。
    // 如果 p 、 q 节点在左右子树的最近公共祖先都为空，则返回 root
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left === null) {
        return right;
    }

    if (right === null) {
        return left;
    }

    return root;
}