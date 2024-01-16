function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 广度优先遍历
 * 时间复杂度 O(n) 空间复杂度 O(n)
 * @param root
 * @return {*[]}
 */
const levelorderBottomBFS = (root) => {
    let results = [];
    if (!root) {
        return results;
    }

    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
        let size = queue.length;
        let levelResult = [];

        while (size > 0) {
            const node = queue.shift();
            levelResult.push(node.val);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
            size--;
        }
        results.push(levelResult);
    }
    return results.reverse();
}

const levelorderBottomDFS = (root) => {
    let result = [];
    const dps = (node, depth) => {
        if (!node) return;
        result[depth] = result[depth] || [];
        result[depth].push(node.val);
        dps(node.left, depth + 1);
        dps(node.right, depth + 1);
    }
    dps(root, 0);

    return result.reverse();
}