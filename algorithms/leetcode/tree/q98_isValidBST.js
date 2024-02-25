function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 98.验证二叉搜索树 https://leetcode.cn/problems/validate-binary-search-tree/?envType=study-plan-v2&envId=top-100-liked
 * 思路：递归，中序遍历二叉搜索树为有序的，如果当前节点值小于等于前一个节点的值，则说明不是有效二叉搜索树
 * @param root
 * @return {boolean}
 */
const isValidBST = (root) => {
    let pre = -Infinity;
    let flag = true;

    const inorder = (root) => {
        if (!root) {
            return;
        }

        if (!flag) {
            return;
        }

        inorder(root.left);

        if (root.val <= pre) {
            flag = false;
            return;
        }

        pre = root.val;
        inorder(root.right);
    }

    inorder(root);

    return flag;
}
// 栈实现
const isValidBSTII = (root) => {
    const stack = [];
    let preVal = -Infinity;
    while (root || stack.length > 0) {
        while (root) {
            stack.push(root);
            root = root.left;
        }

        root = stack.pop();
        if (root.val <= preVal) {
            return false;
        }

        preVal = root.val;
        root = root.right;
    }

    return true;
}