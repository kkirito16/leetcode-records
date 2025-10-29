// 82. 删除排序链表中的重复元素 II
// 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    if (!head) return null;
    const dummy = new ListNode(0, head);
    let prev = dummy;
    let curr = head;

    while (curr && curr.next) {
        if (curr.val === curr.next.val) {
            const duplicateVal = curr.val;
            while (curr && curr.val === duplicateVal) {
                curr = curr.next;
            }
            prev.next = curr;
        } else {
            prev = curr;
            curr = curr.next;
        }
    }

    return dummy.next;
};