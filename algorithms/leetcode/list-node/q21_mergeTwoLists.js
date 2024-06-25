function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 21. 合并两个有序链表 https://leetcode.cn/problems/merge-two-sorted-lists/description/
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 * @param list1
 * @param list2
 * @returns {*|null}
 */
const q21_mergeTwoLists = (list1, list2) => {
    if (list1 === null) {
        return list2;
    }

    if (list2 === null) {
        return list1;
    }

    let node = new ListNode(0);
    let resList = node;
    while (list1 !== null && list2 !== null) {
        if (list1.val >= list2.val) {
            resList.next = list2;
            list2 = list2.next;
        } else {
            resList.next = list1;
            list1 = list1.next;
        }
        resList = resList.next;
    }

    resList.next = list1 === null ? list2 : list1;
    return node.next;
}

const list1 = new ListNode(1);
const list11 = list1.next = new ListNode(2);
list11.next = new ListNode(4);

const list2 = new ListNode(1);
const list21 = list2.next = new ListNode(3);
list21.next = new ListNode(4);

console.log(list1, list2);
console.log('合并两个有序链表', q21_mergeTwoLists(list1, list2));