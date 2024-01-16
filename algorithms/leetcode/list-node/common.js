export function ListNode(val, next) {
    this.cal = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

export const list1 = new ListNode(1);
const list11 = list1.next = new ListNode(2);
list11.next = new ListNode(4);

export const list2 = new ListNode(1);
const list21 = list2.next = new ListNode(3);
list21.next = new ListNode(4);

export const cycleList = new ListNode(1);
const list11 = cycleList.next = new ListNode(2);
const list12 = list11.next = new ListNode(4);
list12.next = new ListNode(2);