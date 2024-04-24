function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 257. 二叉树的所有路径 https://leetcode.cn/problems/binary-tree-paths/description/
 * 深度优先搜索
 * @param root
 */
const binaryTreePaths = (root) => {
    const resPaths = [];

    const construct_paths = (root, path) => {
        if (root === null) {
            return;
        }
        // 当前节点不是叶子节点，进行路径拼接
        path += root.val.toString();
        // 当前节点是叶子节点，则将路径加入到结果数组中
        if (root.left === null && root.right === null) {
            resPaths.push(path);
        } else { // 当前节点不是叶子节点，继续递归遍历
            path += '->';
            construct_paths(root.left, path);
            construct_paths(root.right, path);
        }
    }

    construct_paths(root, '');

    return resPaths;
}

const root = new TreeNode(1);
const left = root.left = new TreeNode(2);
root.right = new TreeNode(3);
left.right = new TreeNode(5);

console.log(binaryTreePaths(root));