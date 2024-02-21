/**
 * 19.删除链表的倒数第N个结点 https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：快慢指针应用。定义一个虚拟头结点，快慢指针都指向虚拟头结点，然后快指针先走 n + 1 步，
 * 然后快慢指针一起走，当快指针走到链接末尾的时候，慢指针正好走到待删除节点的上一个节点，执行删除操作。
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

const removeNthFromEnd = (head, n) => {
    // 定义一个虚拟头结点，指向head真正头结点
    const dummy = new ListNode(0, head);
    // 定义一个快慢指针，初始都指向虚拟头结点
    let fast = slow = dummy;

    while (fast && n >= 0) {
        fast = fast.next;
        n--;
    }

    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }

    if (slow.next) {
        slow.next = slow.next.next;
    }
    return dummy.next;
}