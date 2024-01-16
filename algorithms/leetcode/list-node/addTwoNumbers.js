function ListNode(val) {
    this.val = val;
    this.next = null;
}
/**
 * 链表求和 https://leetcode.cn/problems/sum-lists-lcci/
 * 题解：https://github.com/sisterAn/JavaScript-Algorithms/issues/114
 * 时间复杂度O(max(list1.length, list2.length)) 空间复杂度：O(1)
 * @param list1
 * @param list2
 */
const addTwoNumbers = (list1, list2) => {
    if (list1 === null) {
        return list2;
    }
    if (list2 === null) {
        return list1;
    }

    // 存储每次的进位
    let carry = 0;
    // 结果链表
    let resList = new ListNode(0);
    let cur = resList;

    // 遍历链表，计算链表的和
    while (list1 || list2) {
        let sum = 0;
        if (list1) {
            sum += list1.val;
            list1 = list1.next;
        }

        if (list2) {
            sum += list2.val;
            list2 = list2.next;
        }

        // 当前的链表之和，记得加上一次保存的进位值
        sum += carry;
        // 记录本次的进位值
        carry = Math.floor(sum / 10);
        // 保存当前的结果链表节点
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
    }

    // 当两链表遍历完成，都为空后，需要再判断一次进位值是否大于0，如果大于0，则需要再加上进位值的链表节点
    if (carry > 0) {
        cur.next = new ListNode(carry);
    }

    // 返回结果
    return resList.next;
}