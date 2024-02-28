function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}


/**
 * 437. 路径总和 III https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
 * 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
const pathSum = (root, targetSum) => {
    // 定义结点的前缀和：从根结点到当前结点的路径上的所有结点的和
    // 前缀和用哈希表保存，key是前缀和, value是大小为key的前缀和出现的次数
    const map = new Map();
    // 这样做是为了考虑从根结点开始的合法路径。比如1 -> 2，target = 3，那么需要从map找前缀和为cursum - target = 0的路径数目，这样的路径数目和1 -> 2组合起来也是合法的解，所以初始化为1。可以认为有一个虚拟的根结点的父结点，其前缀和为0
    map.set(0, 1);

    return dfs(root, map, 0, targetSum);
}

const dfs = (root, map, cur, targetSum) => {
    // 递归终止条件
    if (!root) {
        return 0;
    }

    // 本层要做的事情
    let res = 0;
    // 当前节点到根节点的前缀和更新
    cur += root.val;

    // 在已保存的路径前缀和中查找是否存在前缀和刚好等于当前节点到根节点的前缀和 cur 减去 targetSum
    res = map.get(cur - targetSum) || 0;
    // 更新哈希表，当前前缀和已经存在的话，就在此基础上加1，否则，默认值为0
    map.set(cur, (map.get(cur) || 0) + 1);
    // 对左节点和右节点进行递归遍历
    res += dfs(root.left, map, cur, targetSum);
    res += dfs(root.right, map, cur, targetSum);
    // 回到本层，恢复状态，去除当前节点的前缀和数量。左右子树遍历完成之后，回到当前层，需要把当前节点添加的前缀和去除。
    // 避免回溯之后影响上一层。因为思想是前缀和，不属于前缀的，我们就要去掉它
    map.set(cur, (map.get(cur) || 0) - 1);

    return res;
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
console.log(pathSum(root, 3));