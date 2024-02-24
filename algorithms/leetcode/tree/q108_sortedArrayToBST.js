function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 108. 将有序数组转换为二叉搜索树
 * 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
 * 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。
 *
 * 思路：BST 的中序遍历是升序的，因此本题等同于根据中序遍历的序列恢复二叉搜索树。
 * 因此我们可以以升序序列中的任一个元素作为根节点，以该元素左边的升序序列构建左子树，
 * 以该元素右边的升序序列构建右子树，这样得到的树就是一棵二叉搜索树
 * 又因为本题要求高度平衡，因此我们需要选择升序序列的中间元素作为根节点
 */
const sortedArrayToBST = (nums) => {
    return dfs(nums, 0, nums.length - 1);
}

const dfs = (nums, left, right) => {
    if (left > right) {
        return null;
    }

    // 平衡二叉树，左右子树高度差不能大于1，求数组中间值，当做根节点
    const mid = Math.floor((right - left) / 2) + left;
    const root = new TreeNode(nums[mid]);
    root.left = dfs(nums, left, mid - 1);
    root.right = dfs(nums, mid + 1, right);

    return root;
}

/**
 * 输入：nums = [-10,-3,0,5,9]
 * 输出：[0,-3,9,-10,null,5]
 */

const nums = [-10,-3,0,5,9];
console.log(sortedArrayToBST(nums));
