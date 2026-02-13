// 1382. 将二叉搜索树变平衡
// 给你一棵二叉搜索树，请你返回一棵 平衡后 的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。如果有多种构造方法，请你返回任意一种。

// 如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是 平衡的 。
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
 * @return {TreeNode}
 */
const balanceBST = function(root) {
    const arr = [];
    function inOrder(node) {
        if (!node) return;
        inOrder(node.left);
        arr.push(node.val);
        inOrder(node.right);
    }
    inOrder(root);

    function build(l, r) {
        if (l > r) return null;
        const mid = (l + r) >> 1;
        return new TreeNode(arr[mid], build(l, mid - 1), build(mid + 1, r));
    }
    return build(0, arr.length - 1);
};