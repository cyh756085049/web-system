function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 148. 排序链表 https://leetcode.cn/problems/sort-list/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * 自上而下使用递归进行归并排序
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    if (head === null || head.next === null) {
        return head;
    }
    // 将列表从中点划分并进行递归，然后进行列表排序
    // 求当前链表的前半部分节点
    const middleNode = getMiddleNode(head);
    // 后半部分的链表节点
    const middleNext = middleNode.next;

    // 将链表断开为前后两半
    middleNode.next = null;

    // 递归继续切割左半部分链表
    let left = sortList(head);
    // 递归继续切割右半部分链表
    let right = sortList(middleNext);

    // 合并两个有序链表
    return mergeTwoList(left, right);
};

// 使用快慢指针获取链表的前半部分节点
const getMiddleNode = (head) => {
    if (head === null || head.next === null) {
        return head;
    }

    let slow = head;
    let fast = head;
    while (fast.next !== null && fast.next.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

// 合并两个有序链表
const mergeTwoList = (list1, list2) => {
    if (list1 === null) {
        return list2;
    }

    if (list2 === null) {
        return list1;
    }

    const dummyHead = new ListNode(-1);
    let curNode = dummyHead;

    while (list1 !== null && list2 !== null) {
        if (list1.val > list2.val) {
            curNode.next = list2;
            list2 = list2.next;
        } else {
            curNode.next = list1;
            list1 = list1.next;
        }
        curNode = curNode.next;
    }

    curNode.next = list1 !== null ? list1 : list2;

    return dummyHead.next;
}

/**
 * 输入：head = [4,2,1,3]
 * 输出：[1,2,3,4]
 */