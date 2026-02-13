// 2536. 子矩阵元素加 1
// 给你一个正整数 n ，表示最初有一个 n x n 、下标从 0 开始的整数矩阵 mat ，矩阵中填满了 0 。

// 另给你一个二维整数数组 query 。针对每个查询 query[i] = [row1i, col1i, row2i, col2i] ，请你执行下述操作：

// 找出 左上角 为(row1i, col1i) 且 右下角 为(row2i, col2i) 的子矩阵，将子矩阵中的 每个元素 加 1 。也就是给所有满足 row1i <= x <= row2i 和 col1i <= y <= col2i 的 mat[x][y] 加 1 。
// 返回执行完所有操作后得到的矩阵 mat 。
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function (n, queries) {
    const diff = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (const [r1, c1, r2, c2] of queries) {
        diff[r1][c1] += 1;
        diff[r1][c2 + 1] -= 1;
        diff[r2 + 1][c1] -= 1;
        diff[r2 + 1][c2 + 1] += 1;
    }

    const res = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        let rowSum = 0;
        for (let j = 0; j < n; j++) {
            rowSum += diff[i][j];
            diff[i][j] = (i > 0 ? diff[i - 1][j] : 0) + rowSum;
            res[i][j] = diff[i][j];
        }
    }

    return res;
};
