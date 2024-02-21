function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

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

        const next = end.next;
        end.next = null;

        const start = pre.next;
        pre.next = reverseListNode(start);
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