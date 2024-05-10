function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 25. K 个一组翻转链表 https://leetcode.cn/problems/reverse-nodes-in-k-group/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：先找到k个一组的尾节点，然后将这组节点翻转，连接
 * 题解：https://leetcode.cn/problems/reverse-nodes-in-k-group/solutions/10416/tu-jie-kge-yi-zu-fan-zhuan-lian-biao-by-user7208t/?envType=study-plan-v2&envId=top-100-liked
 * @param head
 * @param k
 * @return {*}
 */
const reverseKGroup = (head, k) => {
    const dummpy = new ListNode(0, head);
    let pre = end = dummpy;

    while (end.next) {
        // 先找到K个一组的尾节点
        for (let i = 0; i < k && end !== null; i++) {
            end = end.next;
        }

        // 如果尾节点不存在，则直接跳出
        if (end === null) {
            break;
        }

        // 先记录下end.next,方便后面链接链表
        const next = end.next;
        // 然后断开链表
        end.next = null;

        // 记录下要翻转链表的头节点
        const start = pre.next;
        // 翻转链表
        pre.next = reverseListNode(start);
        // 翻转后头节点变到最后。通过.next把断开的链表重新链接
        start.next = next;

        pre = start;
        end = pre;
    }

    return dummpy.next;
}

const reverseListNode = (head) => {
    if (head === null) {
        return head;
    }

    let pre = null;
    let cur = head;

    while (cur) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    return pre;
}