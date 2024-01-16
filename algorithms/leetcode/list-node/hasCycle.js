function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * leetcode141：判断一个链表是否有环
 * @param head
 * @returns {boolean}
 */
// 标志法
// 时间复杂度 O(n) 空间复杂度 O(n)
const hasCycle = (head) => {
    while (head) {
        if (head.flag) {
            return true;
        } else {
            head.flag = true;
            head = head.next;
        }
    }

    return false;
}

// 快慢指针：快指针走两步，慢指针走一步,如果单链表中存在环，则快慢指针终会指向同一个节点，否则直到快指针指向 null 时，快慢指针都不可能相遇
// 时间复杂度 O(n) 空间复杂度 O(1)
const hasCycleII = (head) => {
    if (head === null) {
        return false;
    }

    let slow = head, fast = head;
    while (fast !== null) {
        slow = slow.next;

        if (fast.next) {
            fast = fast.next.next;
        } else {
            return false;
        }

        if (slow === fast) {
            return true;
        }
    }

    return false;
}

// 利用 JSON.stringify() 不能序列化含有循环引用的结构
const hasCycleIII = (head) => {
    try {
        JSON.stringify(head);
        return false;
    } catch (err) {
        return true;
    }
}

const cycleList = new ListNode(1);
const list11 = cycleList.next = new ListNode(2);
const list12 = list11.next = new ListNode(4);
list12.next = new ListNode(2);
list12.next.next = null;
console.log('判断单链表是否有环', hasCycle(cycleList));
console.log('判断单链表是否有环', hasCycleII(cycleList));