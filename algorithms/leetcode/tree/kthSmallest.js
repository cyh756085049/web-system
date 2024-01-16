function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 230. 二叉搜索树中第K小的元素 https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/
 * 思路：二叉搜索树的中序遍历结果即树节点值的从小到大排序，则输出第k个元素即可
 * 复杂度：时间复杂度 O(k) 空间复杂度 O(k)
 * @param root
 * @param k
 * @return {null}
 */
const kthSmallest = (root, k) => {
    let res = null;
    const inorderTraversal = (node) => {
        if (node !== null && k > 0) {
            // 先遍历左子树
            inorderTraversal(node.left);
            k--;
            // 根节点
            if (k === 0) {
                res = node.val;
            }
            // 遍历右子树
            inorderTraversal(node.right);
        }
    }
    inorderTraversal(root);
    return res;
}

// 迭代实现
const kthSmallestByStack = (root, k) => {
    if (root === null) {
        return root.val;
    }
    let node = root;
    let stack = [];
    while (node || stack.length) {
        // 遍历左子树
        while (node) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        k--;
        if (k === 0) {
            return node.val;
        }
        node = node.right;
    }
    return null;
}