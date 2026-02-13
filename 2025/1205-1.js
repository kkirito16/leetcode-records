// 199. 二叉树的右视图
// 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
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
 * @return {number[]}
 */
var rightSideView = function (root) {
    if (!root) return [];

    const ans = [];
    const queue = [root];
    let idx = 0;

    while (idx < queue.length) {
        const levelSize = queue.length - idx;
        for (let i = 0; i < levelSize; i++) {
            const node = queue[idx++];
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            if (i === levelSize - 1) ans.push(node.val);
        }
    }

    return ans;

};
