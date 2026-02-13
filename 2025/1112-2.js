// 106. 从中序与后序遍历序列构造二叉树
// 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (!inorder.length || !postorder.length) return null;
  const idxMap = new Map();
  inorder.forEach((val, idx) => idxMap.set(val, idx));

  let postIdx = postorder.length - 1;

  const helper = (l, r) => {
    if (l > r) return null;
    const rootVal = postorder[postIdx--];
    const root = new TreeNode(rootVal);
    const idx = idxMap.get(rootVal);
    root.right = helper(idx + 1, r);
    root.left = helper(l, idx - 1);
    return root;
  };

  return helper(0, inorder.length - 1);
};
