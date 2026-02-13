// 2054. 两个最好的不重叠活动
// 给你一个下标从 0 开始的二维整数数组 events ，其中 events[i] = [startTimei, endTimei, valuei] 。第 i 个活动开始于 startTimei ，结束于 endTimei ，如果你参加这个活动，那么你可以得到价值 valuei 。你 最多 可以参加 两个时间不重叠 活动，使得它们的价值之和 最大 。

// 请你返回价值之和的 最大值 。

// 注意，活动的开始时间和结束时间是 包括 在活动时间内的，也就是说，你不能参加两个活动且它们之一的开始时间等于另一个活动的结束时间。更具体的，如果你参加一个活动，且结束时间为 t ，那么下一个活动必须在 t + 1 或之后的时间开始。
/**
 * @param {number[][]} events
 * @return {number}
 */
var maxTwoEvents = function (events) {
    if (events.length === 0) return 0;
    const byEnd = [...events].sort((a, b) => a[1] - b[1]);
    const ends = new Array(byEnd.length);
    const pref = new Array(byEnd.length);
    let best = 0;
    for (let i = 0; i < byEnd.length; i++) {
        ends[i] = byEnd[i][1];
        best = Math.max(best, byEnd[i][2]);
        pref[i] = best;
    }

    let ans = 0;
    for (const [s, , v] of events) {
        ans = Math.max(ans, v);
        let l = 0, r = ends.length - 1, idx = -1;
        while (l <= r) {
            const m = (l + r) >> 1;
            if (ends[m] < s) {
                idx = m;
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        if (idx >= 0) {
            ans = Math.max(ans, v + pref[idx]);
        }
    }

    return ans;
};
