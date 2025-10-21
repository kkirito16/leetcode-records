// 92. 反转链表 II
// 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (!head || left === right) return head;

  const dummy = new ListNode(0, head);
  let pre = dummy;

  for (let i = 1; i < left; i += 1) {
    pre = pre.next;
  }

  const start = pre.next;
  let curr = start.next;

  for (let i = 0; i < right - left; i += 1) {
    start.next = curr.next;
    curr.next = pre.next;
    pre.next = curr;
    curr = start.next;
  }

  return dummy.next;
};
