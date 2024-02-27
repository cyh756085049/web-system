function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.rigth = right === undefined ? null : right;
}

/**
 * 199. 二叉树的右视图 https://leetcode.cn/problems/binary-tree-right-side-view/description/?envType=study-plan-v2&envId=top-100-liked
 * @param root
 * @return {[]}
 */
const rightSideView = (root) => {
    const result = [];
    if (!root) {
        return result;
    }

    const stack = [];
    stack.push(root);

    while (stack.length > 0) {
        let size = stack.length;
        while (size > 0) {
            const node = stack.shift();
            if (node.left) {
                stack.push(node.left);
            }

            if (node.right) {
                stack.push(node.right);
            }

            size--;
            if (size === 0) {
                result.push(node.val);
            }
        }
    }

    return result;
}