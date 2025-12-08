// 2435. 矩阵中和能被 K 整除的路径
// 给你一个下标从 0 开始的 m x n 整数矩阵 grid 和一个整数 k 。你从起点(0, 0) 出发，每一步只能往 下 或者往 右 ，你想要到达终点(m - 1, n - 1) 。

// 请你返回路径和能被 k 整除的路径数目，由于答案可能很大，返回答案对 109 + 7 取余 的结果。
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var numberOfPaths = function (grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const MOD = 1000000007;

    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Array(k).fill(0))
    );

    dp[0][0][grid[0][0] % k] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const val = grid[i][j] % k;
            for (let r = 0; r < k; r++) {
                if (i > 0) {
                    dp[i][j][(r + val) % k] =
                        (dp[i][j][(r + val) % k] + dp[i - 1][j][r]) % MOD;
                }
                if (j > 0) {
                    dp[i][j][(r + val) % k] =
                        (dp[i][j][(r + val) % k] + dp[i][j - 1][r]) % MOD;
                }
            }
        }
    }

    return dp[m - 1][n - 1][0];

};
