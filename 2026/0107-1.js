// 1458. 两个子序列的最大点积
// 给你两个数组 nums1 和 nums2 。

// 请你返回 nums1 和 nums2 中两个长度相同的 非空 子序列的最大点积。

// 数组的非空子序列是通过删除原数组中某些元素（可能一个也不删除）后剩余数字组成的序列，但不能改变数字间相对顺序。比方说，[2,3,5] 是 [1,2,3,4,5] 的一个子序列而 [1,5,3] 不是。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function (nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-Infinity));

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const prod = nums1[i] * nums2[j];
            const withBoth = prod + Math.max(0, dp[i + 1][j + 1]);
            dp[i][j] = Math.max(prod, withBoth, dp[i + 1][j], dp[i][j + 1]);
        }
    }

    return dp[0][0];
};
