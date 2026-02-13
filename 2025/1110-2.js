// 101. 对称二叉树
// 给你一个二叉树的根节点 root ， 检查它是否轴对称。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const isMirror = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.val === b.val && isMirror(a.left, b.right) && isMirror(a.right, b.left);
  };

  return isMirror(root, root);
};
