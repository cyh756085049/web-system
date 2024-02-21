function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 24. 两两交换链表中的节点 https://leetcode.cn/problems/swap-nodes-in-pairs/description/?envType=study-plan-v2&envId=top-100-liked
 * 递归交换两两节点
 * @param head
 * @return {*}
 */
const swapPairs = (head) => {
    if (head === null || head.next === null) {
        return head;
    }

    const next = head.next;
    head.next = swapPairs(next.next);
    next.next = head;

    return next;
}

const swapPairsII = (head) => {
    if (head === null) {
        return head;
    }

    const dummy = new ListNode(-1, head);
    let cur = dummy;

    while (cur.next && cur.next.next) {
        const pre = cur.next;
        const next = cur.next.next;

        pre.next = next.next;
        next.next = pre;

        cur.next = next;
        cur = pre;
    }

    return dummy.next;
}