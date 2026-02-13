// 25. K 个一组翻转链表
// 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

// k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
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
var reverseKGroup = function (head, k) {
  if (!head || k <= 1) return head;

  const dummy = new ListNode(0, head);
  let groupPrev = dummy;

  while (true) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth; i += 1) {
      kth = kth.next;
    }
    if (!kth) break;

    const groupNext = kth.next;

    // Reverse current group
    let prev = groupNext;
    let curr = groupPrev.next;
    for (let i = 0; i < k; i += 1) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    const temp = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = temp;
  }

  return dummy.next;
};
