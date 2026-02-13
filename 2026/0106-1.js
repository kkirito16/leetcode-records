// 1161. 最大层内元素和
// 给你一个二叉树的根节点 root。设根节点位于二叉树的第 1 层，而根节点的子节点位于第 2 层，依此类推。

// 返回总和 最大 的那一层的层号 x。如果有多层的总和一样大，返回其中 最小 的层号 x。
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function (root) {
    if (!root) return 0;
    let queue = [root];
    let level = 1;
    let bestLevel = 1;
    let bestSum = root.val;

    while (queue.length) {
        const size = queue.length;
        let sum = 0;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            sum += node.val;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        if (sum > bestSum) {
            bestSum = sum;
            bestLevel = level;
        }
        level++;
    }

    return bestLevel;
};
