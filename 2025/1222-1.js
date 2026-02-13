// 960. 删列造序 III
// 给定由 n 个小写字母字符串组成的数组 strs ，其中每个字符串长度相等。

// 选取一个删除索引序列，对于 strs 中的每个字符串，删除对应每个索引处的字符。

// 比如，有 strs = ["abcdef","uvwxyz"] ，删除索引序列 {0, 2, 3} ，删除后为 ["bef", "vyz"] 。

// 假设，我们选择了一组删除索引 answer ，那么在执行删除操作之后，最终得到的数组的行中的 每个元素 都是按字典序排列的（即 (strs[0][0] <= strs[0][1] <= ... <= strs[0][strs[0].length - 1]) 和 (strs[1][0] <= strs[1][1] <= ... <= strs[1][strs[1].length - 1]) ，依此类推）。

// 请返回 answer.length 的最小可能值 。
/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
    const n = strs.length;
    if (n === 0) return 0;
    const m = strs[0].length;
    const ok = (i, j) => {
        for (let r = 0; r < n; r++) {
            if (strs[r][i] > strs[r][j]) return false;
        }
        return true;
    };

    const dp = new Array(m).fill(1);
    let best = 1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < i; j++) {
            if (ok(j, i)) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        if (dp[i] > best) best = dp[i];
    }
    return m - best;
};
