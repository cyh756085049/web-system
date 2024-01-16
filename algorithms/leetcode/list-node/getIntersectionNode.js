function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 160. 相交链表 https://leetcode.cn/problems/intersection-of-two-linked-lists/description/
 * 双指针: 时间复杂度O(n) 空间复杂度O{1}
 * @param headA
 * @param headB
 * @returns {*|null}
 */
const getIntersectionNode = (headA, headB) => {
    if (headA === null || headB === null) {
        return null;
    }

    let listNodeA = headA;
    let listNodeB = headB;

    while (listNodeA !== listNodeB) {
        listNodeA = listNodeA !== null ? listNodeA.next : headB;
        listNodeB = listNodeB !== null ? listNodeB.next : headA;
    }

    return listNodeA;
}
