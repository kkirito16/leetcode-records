// 103. 二叉树的锯齿形层序遍历
// 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
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
 * @return {number[][]}
 */
const zigzagLevelOrder = function(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    let level = 0;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const levelNodes = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            levelNodes.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        if (level % 2 === 1) {
            levelNodes.reverse();
        }
        
        result.push(levelNodes);
        level++;
    }
    
    return result;
};