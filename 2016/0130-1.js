// 2977. 转换字符串的最小成本 II
// 给你两个下标从 0 开始的字符串 source 和 target ，它们的长度均为 n 并且由 小写 英文字母组成。

// 另给你两个下标从 0 开始的字符串数组 original 和 changed ，以及整数数组 cost ，
// 其中 cost[i] 代表将字符串 original[i] 更改为字符串 changed[i] 的成本。

// 你从字符串 source 开始。在一次操作中，如果存在任意下标 j 满足 cost[j]==z、
// original[j]==x 以及 changed[j]==y，你就可以选择字符串中的子串 x 并以 z 的成本改为 y。
// 你可以执行任意数量的操作，但任两次操作必须满足以下之一：
// 两次操作选择的子串下标不相交；或两次操作选择的子串下标相同。
// 返回将字符串 source 转换为字符串 target 所需的 最小 成本。如果不可能完成转换，则返回 -1 。

// 注意，可能存在下标 i 、j 使得 original[j] == original[i] 且 changed[j] == changed[i] 。
/**
 * @param {string} source
 * @param {string} target
 * @param {string[]} original
 * @param {string[]} changed
 * @param {number[]} cost
 * @return {number}
 */
// eslint-disable-next-line no-unused-vars
const minimumCost = function (source, target, original, changed, cost) {
    const n = source.length;
    const INF = Number.MAX_SAFE_INTEGER;

    const rulesByLen = new Map();
    for (let i = 0; i < original.length; i++) {
        const a = original[i];
        const b = changed[i];
        if (a.length !== b.length) continue;
        const L = a.length;
        if (!rulesByLen.has(L)) {
            rulesByLen.set(L, []);
        }
        rulesByLen.get(L).push([a, b, cost[i]]);
    }

    const minCostByLen = new Map();
    for (const L of rulesByLen.keys()) {
        const rules = rulesByLen.get(L);
        const strToIdx = new Map();
        for (const [a, b] of rules) {
            if (!strToIdx.has(a)) strToIdx.set(a, strToIdx.size);
            if (!strToIdx.has(b)) strToIdx.set(b, strToIdx.size);
        }
        const N = strToIdx.size;
        const dist = Array.from({ length: N }, () => Array(N).fill(INF));
        for (let i = 0; i < N; i++) dist[i][i] = 0;

        for (const [a, b, c] of rules) {
            const i = strToIdx.get(a);
            const j = strToIdx.get(b);
            dist[i][j] = Math.min(dist[i][j], c);
        }

        for (let k = 0; k < N; k++) {
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    if (dist[i][k] !== INF && dist[k][j] !== INF) {
                        dist[i][j] = Math.min(
                            dist[i][j],
                            dist[i][k] + dist[k][j]
                        );
                    }
                }
            }
        }
        minCostByLen.set(L, { strToIdx, dist });
    }

    const dp = new Array(n + 1).fill(INF);
    dp[0] = 0;

    for (let i = 0; i < n; i++) {
        if (dp[i] === INF) continue;

        if (source[i] === target[i]) {
            dp[i + 1] = Math.min(dp[i + 1], dp[i]);
        }

        for (const L of rulesByLen.keys()) {
            if (i + L > n) continue;
            const s = source.slice(i, i + L);
            const t = target.slice(i, i + L);
            if (s === t) {
                dp[i + L] = Math.min(dp[i + L], dp[i]);
                continue;
            }
            const g = minCostByLen.get(L);
            if (!g) continue;
            const { strToIdx, dist } = g;
            if (!strToIdx.has(s) || !strToIdx.has(t)) continue;
            const costSt = dist[strToIdx.get(s)][strToIdx.get(t)];
            if (costSt !== INF) {
                dp[i + L] = Math.min(dp[i + L], dp[i] + costSt);
            }
        }
    }

    return dp[n] === INF ? -1 : dp[n];
};