function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * 23. 合并 K 个升序链表 https://leetcode.cn/problems/merge-k-sorted-lists/description/?envType=study-plan-v2&envId=top-100-liked
 * 给你一个链表数组，每个链表都已经按升序排列。
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    // 思想：分治思想，先归并再合并
    if (!lists.length) {
        return null;
    }
    return mergeLists(lists, 0, lists.length - 1);
};

// 合并链表
const mergeLists = (lists, start, end) => {
    if (start === end) {
        return lists[start];
    }
    // 归并排序进行不断的分割，然后再进行合并排序
    let mid = (start + end) >>> 1;
    let head1 = mergeLists(lists, start, mid);
    let head2 = mergeLists(lists, mid + 1, end);
    return mergeSortList(head1, head2);
}

// 合并两个有序链表
const mergeSortList = (head1, head2) => {
    let dummy = new ListNode(0);
    let cur = dummy;
    while (head1 && head2) {
        if (head1.val < head2.val) {
            cur.next = head1;
            head1 = head1.next;
        } else {
            cur.next = head2;
            head2 = head2.next;
        }

        cur = cur.next;
    }

    cur.next = head1 === null ? head2 : head1;
    return dummy.next;
}

/**
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
 * 输出：[1,1,2,3,4,4,5,6]
 */
