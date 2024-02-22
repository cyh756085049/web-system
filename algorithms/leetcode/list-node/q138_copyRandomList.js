function ListNode(val, next, random) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
}

/**
 * 138.随机链表的复制 https://leetcode.cn/problems/copy-list-with-random-pointer/description/?envType=study-plan-v2&envId=top-100-liked
 * 题解参考：https://leetcode.cn/problems/copy-list-with-random-pointer/?envType=study-plan-v2&envId=top-100-liked
 * @param head
 * @return {*}
 */
const copyRandomList = (head) => {
    if (!head) {
        return head;
    }

    // 使用map存储链表
    const map = new Map();
    let cur = head;
    while (cur) {
        map.set(cur, new ListNode(cur.val, cur.random));
        cur = cur.next;
    }

    cur = head;
    while (cur) {
        map.get(cur).next = map.get(cur.next) || null;
        map.get(cur).random = map.get(cur.random) || null;
        cur = cur.next;
    }

    return map.get(head);
}