// 2872. 可以被 K 整除连通块的最大数目
// 给你一棵 n 个节点的无向树，节点编号为 0 到 n - 1 。给你整数 n 和一个长度为 n - 1 的二维整数数组 edges ，其中 edges[i] = [ai, bi] 表示树中节点 ai 和 bi 有一条边。

// 同时给你一个下标从 0 开始长度为 n 的整数数组 values ，其中 values[i] 是第 i 个节点的 值 。再给你一个整数 k 。

// 你可以从树中删除一些边，也可以一条边也不删，得到若干连通块。一个 连通块的值 定义为连通块中所有节点值之和。如果所有连通块的值都可以被 k 整除，那么我们说这是一个 合法分割 。

// 请你返回所有合法分割中，连通块数目的最大值 。
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} values
 * @param {number} k
 * @return {number}
 */
var maxKDivisibleComponents = function (n, edges, values, k) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const mod = (x) => ((x % k) + k) % k;
    let ans = 0;

    const dfs = (u, parent) => {
        let sum = mod(values[u]);
        for (const v of adj[u]) {
            if (v === parent) continue;
            sum = (sum + dfs(v, u)) % k;
        }
        if (sum === 0) {
            ans++;
            return 0;
        }
        return sum;
    };

    const total = dfs(0, -1);
    if (total !== 0) return 0;
    return ans;
};
