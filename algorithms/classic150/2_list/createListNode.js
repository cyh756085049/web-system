import { printLinkedList } from '../utils';

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

function createListNode(arr) {
    if (!arr.length) return null;

    let dummy = new ListNode(0);

    let cur = dummy;
    for (let i = 0; i < arr.length; i++) {
        const nextNode = new ListNode(arr[i]);
        cur.next = nextNode;
        cur = cur.next;
    }

    return dummy.next;
}

const arr = [1, 2, 3, 4];
let head = createListNode(arr);

printLinkedList(head);

