// 1292. 元素和小于等于阈值的正方形的最大边长
// 给你一个大小为 m x n 的矩阵 mat 和一个整数阈值 threshold。

// 请你返回元素总和小于或等于阈值的正方形区域的最大边长；如果没有这样的正方形区域，则返回 0 。
/**
 * @param {number[][]} mat
 * @param {number} threshold
 * @return {number}
 */
const maxSideLength = function (mat, threshold) {
    const m = mat.length;
    const n = mat[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1] +
                mat[i - 1][j - 1];
        }
    }
    let maxSide = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            let left = 1;
            let right = Math.min(m - i + 1, n - j + 1);
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                const sum = dp[i + mid - 1][j + mid - 1] -
                    dp[i - 1][j + mid - 1] - dp[i + mid - 1][j - 1] +
                    dp[i - 1][j - 1];
                if (sum <= threshold) {
                    maxSide = Math.max(maxSide, mid);
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
    }
    return maxSide;
};