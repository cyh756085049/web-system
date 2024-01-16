function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 给定一个二叉树, 找到该树中两个指定节点间的最短距离 https://github.com/sisterAn/JavaScript-Algorithms/issues/82
 * 思路：找到两个节点的公共祖先 -> 找到两个节点和公共祖先的路径长度 -> 计算两个路径的长度和即距离
 * @param root
 * @param p
 * @param q
 * @return {number}
 */
const shortestDistance = (root, p, q) => {
    // 先求出两个节点的最近公共祖先
    let commonAncestor = lowestCommonAncestor(root, p, q);

    // 再找出这两个节点相对于最近公共祖先的路径长度
    let pPaths = [], qPaths = [];
    getDepth(commonAncestor, p, pPaths);
    getDepth(commonAncestor, q, qPaths);

    console.log('pPaths', pPaths.length, 'qPaths', qPaths.length);
    // 最后计算两个节点的路径长度
    return pPaths.length + qPaths.length;
}

const lowestCommonAncestor = (root, p, q) => {
    if (root === null || p === root || q === root) {
        return root;
    }
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

const getDepth = (node, targetNode, paths) => {
    // 找到节点
    if (node === targetNode) {
        return true;
    }
    // 将当前节点加入到路径中
    paths.push(node);
    let hasFound = false;
    // 先找左子树
    if (node.left !== null) {
        hasFound = getDepth(node.left, targetNode, paths);
    }
    // 左子树没找到，再找右子树
    if (!hasFound && node.right !== null) {
        hasFound = getDepth(node.right, targetNode, paths);
    }

    // 没有找到，说明不在这个节点下面，则弹出
    if (!hasFound) {
        paths.pop();
    }

    return hasFound;
}

const root = new TreeNode(1);
const rootLeft = root.left = new TreeNode(2);
const rootRight = root.right = new TreeNode(3);

const secondLevelLeft = rootLeft.left = new TreeNode(4, null, null);
const secondLevelRight = rootRight.right = new TreeNode(5, null, null);

console.log(shortestDistance(root, rootRight, secondLevelLeft));
