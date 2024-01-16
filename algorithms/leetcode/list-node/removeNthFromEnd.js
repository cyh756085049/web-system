function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 19. 删除链表的倒数第 N 个结点 https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/16
 * @param head
 * @param n
 */
// 思路：快慢指针应用。定义一个虚拟头结点，快慢指针都指向虚拟头结点，然后快指针先走 n + 1 步，
// 然后快慢指针一起走，当快指针走到链接末尾的时候，慢指针正好走到待删除节点的上一个节点，执行删除操作。
const removeNthFromEnd = (head, n) => {
    // 定义一个虚拟头结点，指向head真正头结点
    const dummy = new ListNode(-1, head)
    // 定义一个快慢指针，初始都指向虚拟头结点
    let fast = dummy;
    let slow = dummy;

    while (n > 0 && fast) {
        fast = fast.next;
        n--;
    }

    // 快指针先走 n + 1 步
    fast = fast.next;

    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }

    if (slow.next) {
        slow.next = slow.next.next;
    }

    return dummy.next;
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
console.log('删除倒数第n个结点', removeNthFromEnd(node1, 2));