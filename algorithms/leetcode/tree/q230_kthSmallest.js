function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 230.二叉搜索树中第K小的元素 https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：二叉搜索树中序遍历是有序的，第k小元素就是第K个元素
 * @param root
 * @param k
 * @return {*|null}
 */
const kthSmallest = (root, k) => {
    if (!root) {
        return root.val;
    }

    const stack = [];
    let node = root;

    while ((node || stack.length > 0) && k > 0) {
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

// 递归，使用中序遍历
const kthSmallestDfs = function(root, k) {
    // 二叉搜索树的中序遍历结果即树节点值的从小到大排序
    let res = null;
    const inorderTraversal = (node) => {
        if (node !== null && k > 0) {
            inorderTraversal(node.left);
            k--;
            if (k === 0) {
                res = node.val;
            }
            inorderTraversal(node.right);
        }
    }
    inorderTraversal(root);
    return res;
};

