function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 206. 反转链表 https://leetcode.cn/problems/reverse-linked-list/description/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/14
 * @param head
 * @returns {null}
 */
// 迭代法 时间复杂度 o(n) 空间复杂度 o(1)
const reverseList = (head) => {
    let cur = head;
    let pre = null;

    while (cur !== null) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    return pre;
}

const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
const node5 = new ListNode(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

console.log('原始链表', node1);
console.log('反转链表', reverseList(node1));