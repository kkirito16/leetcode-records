// 2110. 股票平滑下跌阶段的数目
// 给你一个整数数组 prices ，表示一支股票的历史每日股价，其中 prices[i] 是这支股票第 i 天的价格。

// 一个 平滑下降的阶段 定义为：对于 连续一天或者多天 ，每日股价都比 前一日股价恰好少 1 ，这个阶段第一天的股价没有限制。

// 请你返回 平滑下降阶段 的数目。
/**
 * @param {number[]} prices
 * @return {number}
 */
var getDescentPeriods = function (prices) {
    let ans = 0;
    let len = 0;
    for (let i = 0; i < prices.length; i++) {
        if (i === 0 || prices[i - 1] - 1 === prices[i]) {
            len += 1;
        } else {
            ans += (len * (len + 1)) / 2;
            len = 1;
        }
    }
    ans += (len * (len + 1)) / 2;
    return ans;
};
