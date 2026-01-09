// 865. 具有所有最深节点的最小子树
// 给定一个根为 root 的二叉树，每个节点的深度是 该节点到根的最短距离 。

// 返回包含原始树中所有 最深节点 的 最小子树 。

// 如果一个节点在 整个树 的任意节点之间具有最大的深度，则该节点是 最深的 。

// 一个节点的 子树 是该节点加上它的所有后代的集合。
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
var subtreeWithAllDeepest = function(root) {
    // Returns [subtreeRootContainingAllDeepest, depthFromNode]
    var dfs = function(node) {
        if (!node) return [null, 0];
        var left = dfs(node.left);
        var right = dfs(node.right);
        if (left[1] > right[1]) return [left[0], left[1] + 1];
        if (right[1] > left[1]) return [right[0], right[1] + 1];
        return [node, left[1] + 1];
    };
    return dfs(root)[0];
};
