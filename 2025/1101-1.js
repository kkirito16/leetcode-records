// 3217. 从链表中移除在数组中存在的节点
// 给你一个整数数组 nums 和一个链表的头节点 head。从链表中移除所有存在于 nums 中的节点后，返回修改后的链表的头节点
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  const remove = new Set(nums);
  const dummy = new ListNode(0, head);
  let prev = dummy;
  let node = head;
  while (node) {
    if (remove.has(node.val)) {
      prev.next = node.next;
    } else {
      prev = node;
    }
    node = node.next;
  }
  return dummy.next;
};
