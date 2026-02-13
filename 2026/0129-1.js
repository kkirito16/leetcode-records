// 2976. 转换字符串的最小成本 I
// 给你两个下标从 0 开始的字符串 source 和 target ，它们的长度均为 n 并且由 小写 英文字母组成。

// 另给你两个下标从 0 开始的字符数组 original 和 changed ，以及一个整数数组 cost ，
// 其中 cost[i] 代表将字符 original[i] 更改为字符 changed[i] 的成本。

// 你从字符串 source 开始。在一次操作中，如果存在任意下标 j 满足 cost[j]==z、
// original[j]==x 以及 changed[j]==y，你就可以选择字符串中的一个字符 x 并以 z 的成本改为 y 。

// 返回将字符串 source 转换为字符串 target 所需的 最小 成本。如果不可能完成转换，则返回 -1 。

// 注意，可能存在下标 i 、j 使得 original[j] == original[i] 且 changed[j] == changed[i] 。

/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 */
// eslint-disable-next-line no-unused-vars
const minimumCost = function (source, target, original, changed, cost) {
    const INF = Number.MAX_SAFE_INTEGER;
    const dist = Array.from({ length: 26 }, () => Array(26).fill(INF));
    
    for (let i = 0; i < 26; i++) {
        dist[i][i] = 0;
    }
    
    for (let i = 0; i < original.length; i++) {
        const a = original[i].charCodeAt(0) - 97;
        const b = changed[i].charCodeAt(0) - 97;
        dist[a][b] = Math.min(dist[a][b], cost[i]);
    }
    
    for (let k = 0; k < 26; k++) {
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < 26; j++) {
                if (dist[i][k] !== INF && dist[k][j] !== INF) {
                    dist[i][j] = Math.min(
                        dist[i][j],
                        dist[i][k] + dist[k][j]
                    );
                }
            }
        }
    }
    
    let total = 0;
    for (let i = 0; i < source.length; i++) {
        const a = source[i].charCodeAt(0) - 97;
        const b = target[i].charCodeAt(0) - 97;
        if (a === b) continue;
        if (dist[a][b] === INF) return -1;
        total += dist[a][b];
    }
    
    return total;
};