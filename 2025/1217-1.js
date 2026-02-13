// 3573. 买卖股票的最佳时机 V
// 给你一个整数数组 prices，其中 prices[i] 是第 i 天股票的价格（美元），以及一个整数 k。

// 你最多可以进行 k 笔交易，每笔交易可以是以下任一类型：

// 普通交易：在第 i 天买入，然后在之后的第 j 天卖出，其中 i < j。你的利润是 prices[j] - prices[i]。

// 做空交易：在第 i 天卖出，然后在之后的第 j 天买回，其中 i < j。你的利润是 prices[i] - prices[j]。

// 注意：你必须在开始下一笔交易之前完成当前交易。此外，你不能在已经进行买入或卖出操作的同一天再次进行买入或卖出操作。

// 通过进行 最多 k 笔交易，返回你可以获得的最大总利润。
/**
 * @param {number[]} prices
 * @param {number} k
 * @return {number}
 */
var maximumProfit = function (prices, k) {
    const n = prices.length;
    if (n === 0 || k === 0) return 0;
    const NEG = -1e18;

    let flat = new Array(k + 1).fill(NEG);
    let holdL = new Array(k + 1).fill(NEG);
    let holdS = new Array(k + 1).fill(NEG);
    flat[0] = 0;

    for (const p of prices) {
        const nFlat = flat.slice();
        const nHoldL = new Array(k + 1).fill(NEG);
        const nHoldS = new Array(k + 1).fill(NEG);

        for (let t = 0; t <= k; t++) {
            nHoldL[t] = Math.max(nHoldL[t], holdL[t]);
            nHoldS[t] = Math.max(nHoldS[t], holdS[t]);

            if (t + 1 <= k) {
                if (holdL[t] !== NEG) {
                    const val = holdL[t] + p;
                    if (val > nFlat[t + 1]) nFlat[t + 1] = val;
                }
                if (holdS[t] !== NEG) {
                    const val = holdS[t] - p;
                    if (val > nFlat[t + 1]) nFlat[t + 1] = val;
                }
            }

            if (flat[t] !== NEG) {
                const openLong = flat[t] - p;
                if (openLong > nHoldL[t]) nHoldL[t] = openLong;

                const openShort = flat[t] + p;
                if (openShort > nHoldS[t]) nHoldS[t] = openShort;
            }
        }

        flat = nFlat;
        holdL = nHoldL;
        holdS = nHoldS;
    }

    let ans = 0;
    for (let t = 0; t <= k; t++) {
        if (flat[t] > ans) ans = flat[t];
    }
    return ans;
};
