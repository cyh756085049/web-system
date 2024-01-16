function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 876. 链表的中间结点 https://leetcode.cn/problems/middle-of-the-linked-list/description/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/15
 * @param head
 */
// 快慢指针，快指针综走两步，慢指针走一步
// 时间复杂度 o(n) 空间复杂度 o(1)
const middleNode = (head) => {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
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
console.log('链表中间节点', middleNode(node1));