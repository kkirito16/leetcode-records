// 3186. 施咒的最大总伤害
// 一个魔法师有许多不同的咒语。

// 给你一个数组 power ，其中每个元素表示一个咒语的伤害值，可能会有多个咒语有相同的伤害值。

// 已知魔法师使用伤害值为 power[i] 的咒语时，他们就 不能 使用伤害为 power[i] - 2 ，power[i] - 1 ，power[i] + 1 或者 power[i] + 2 的咒语。

// 每个咒语最多只能被使用 一次 。

// 请你返回这个魔法师可以达到的伤害值之和的 最大值 。
/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function (power) {
    if (power.length === 0) return 0;

    const cnt = new Map();
    for (const x of power) cnt.set(x, (cnt.get(x) || 0) + 1);

    const vals = Array.from(cnt.keys()).sort((a, b) => a - b);
    const gain = vals.map(v => v * cnt.get(v));
    const n = vals.length;

    const dp = new Array(n).fill(0);
    let j = -1;
    for (let i = 0; i < n; i++) {
        while (j + 1 < i && vals[j + 1] <= vals[i] - 3) j++;
        const take = gain[i] + (j >= 0 ? dp[j] : 0);
        const skip = i > 0 ? dp[i - 1] : 0;
        dp[i] = Math.max(skip, take);
    }
    return dp[n - 1];
};