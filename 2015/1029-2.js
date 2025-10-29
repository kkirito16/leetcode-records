// 61. 旋转链表
// 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head || !head.next || k === 0) {
    return head;
  }
  let length = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    length++;
  }
  const shift = k % length;
  if (shift === 0) {
    return head;
  }
  tail.next = head;
  let steps = length - shift;
  let newTail = head;
  while (--steps > 0) {
    newTail = newTail.next;
  }
  const newHead = newTail.next;
  newTail.next = null;
  return newHead;
};
