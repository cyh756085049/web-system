function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 142.环形链表II https://leetcode.cn/problems/linked-list-cycle-ii/description/?envType=study-plan-v2&envId=top-100-liked
 * 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *
 * 思路：快慢指针
 * @param head
 * @return {*|null}
 */
const detectCycle = (head) => {
    if (head === null) {
        return head;
    }

    let fast = head, slow = head;
    while (fast) {
        slow = slow.next;

        if (fast.next) {
            fast = fast.next.next;
        } else {
            return null;
        }

        if (fast === slow) {
            let cur = head;
            while (cur !== slow) {
                cur = cur.next;
                slow = slow.next;
            }

            return cur;
        }
    }

    return null;
}

const detectCycleFlag = (head) => {
    if (head === null) {
        return head;
    }

    while (head) {
        if (head.flag) {
            return head;
        } else {
            head.flag = true;
            head = head.next;
        }
    }

    return null;
}