function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 234.回文链表 https://leetcode.cn/problems/palindrome-linked-list/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 *  @param head
 * @return {*|boolean}
 */
const isPalindrome = (head) => {
    if (head === null) {
        return head;
    }
    const frontHead = getFrontListNode(head);
    const endHead = reverseListNode(frontHead.next);

    let result = true;
    let list1 = head;
    let list2 = endHead;

    while (result && list2 !== null) {
        if (list1.val !== list2.val) {
            result = false;
        }
        list1 = list1.next;
        list2 = list2.next;
    }

    // 恢复原始链表结构
    frontHead.next = reverseListNode(endHead);

    return result;
}

// 使用快慢指针获取前半部分链表结点
const getFrontListNode = (head) => {
    let fast = head;
    let slow = head;

    while (fast.next !== null && fast.next.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
    }

    return slow;
}

// 反转链表，反转后半部分
const reverseListNode = (head) => {
    let pre = null;
    let cur = head;

    while (cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    return pre;
}

