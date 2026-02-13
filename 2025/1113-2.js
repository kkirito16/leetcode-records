// 117. 填充每个节点的下一个右侧节点指针 II
// 给定一个二叉树：

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL 。

// 初始状态下，所有 next 指针都被设置为 NULL 。
/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function (root) {
  let levelHead = root;
  while (levelHead) {
    const dummy = { next: null };
    let tail = dummy;
    let curr = levelHead;

    while (curr) {
      if (curr.left) {
        tail.next = curr.left;
        tail = tail.next;
      }
      if (curr.right) {
        tail.next = curr.right;
        tail = tail.next;
      }
      curr = curr.next;
    }

    levelHead = dummy.next;
  }

  return root;
};
