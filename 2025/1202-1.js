// 3623. 统计梯形的数目 I
// 给你一个二维整数数组 points，其中 points[i] = [xi, yi] 表示第 i 个点在笛卡尔平面上的坐标。

// 水平梯形 是一种凸四边形，具有 至少一对 水平边（即平行于 x 轴的边）。两条直线平行当且仅当它们的斜率相同。

// 返回可以从 points 中任意选择四个不同点组成的 水平梯形 数量。

// 由于答案可能非常大，请返回结果对 109 + 7 取余数后的值。
/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function (points) {
    const MOD = 1000000007n;
    const yCount = new Map();
    for (const [, y] of points) {
        yCount.set(y, (yCount.get(y) || 0) + 1);
    }
    let ans = 0n;
    let prefix = 0n;
    for (const cnt of yCount.values()) {
        if (cnt < 2) continue;
        const c = BigInt(cnt);
        const pairs = (c * (c - 1n) / 2n) % MOD;
        ans = (ans + prefix * pairs) % MOD;
        prefix = (prefix + pairs) % MOD;
    }
    return Number(ans);
};
