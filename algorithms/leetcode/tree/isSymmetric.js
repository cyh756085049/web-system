function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

const isSymmetric = (root) => {
    // 可以根据前序遍历「根左右」和对称前序遍历「根右左」递归比较是否相等
    return isMirror(root, root);
}

const isMirror = (node1, node2) => {
    if (node1 === null && node2 === null) {
        return true;
    }

    if (node1 === null || node2 === null) {
        return false;
    }

    if (node1.val !== node2.val) {
        return false;
    }

    return isMirror(node1.left, node2.right) && isMirror(node2.right, node1.left);
}