function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * 114. 二叉树展开为链表
 * 给你二叉树的根结点 root ，请你将它展开为一个单链表：
 * 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
 * 展开后的单链表应该与二叉树 先序遍历 顺序相同。
 * @param root
 */
const flatten = (root) => {
    if (!root) {
        return;
    }

    flatten(root.left);
    flatten(root.right);

    // 1、左右子树已经被拉平成一条链表，先用两个变量把原先的左右子树保存起来
    let left = root.left;
    let right = root.right;

    // 将左子树作为右子树,左子树设置为空
    root.left = null;
    root.right = left;

    while (root.right) {
        root = root.right;
    }
    root.right = right;
}

const flattenByStack = (root) => {
    if (root === null) {
        return;
    }

    const stack = [];
    let pre = null;
    stack.push(root);

    while (stack.length > 0) {
        const cur = stack.pop();
        if (pre !== null) {
            pre.left = null;
            pre.right = cur;
        }

        pre = cur;
        if (cur.right) {
            stack.push(cur.right);
        }

        if (cur.left) {
            stack.push(cur.left);
        }
    }
}