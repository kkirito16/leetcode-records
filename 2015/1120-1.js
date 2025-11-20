// 757. 设置交集大小至少为2
// 给你一个二维整数数组 intervals ，其中 intervals[i] = [starti, endi] 表示从 starti 到 endi 的所有整数，包括 starti 和 endi 。

// 包含集合 是一个名为 nums 的数组，并满足 intervals 中的每个区间都 至少 有 两个 整数在 nums 中。

// 例如，如果 intervals = [[1,3], [3,7], [8,9]] ，那么 [1,2,4,7,8,9] 和 [2,3,4,8,9] 都符合 包含集合 的定义。
// 返回包含集合可能的最小大小。
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function (intervals) {
    intervals.sort((a, b) => (a[1] === b[1] ? b[0] - a[0] : a[1] - b[1]));
    const selected = [];
    for (const [start, end] of intervals) {
        let count = 0;
        for (let i = selected.length - 1; i >= 0 && selected[i] >= start && count < 2; i--) {
            count++;
        }
        if (count === 2) continue;
        let next = Math.max(start, end - (2 - count) + 1);
        while (count < 2) {
            selected.push(next);
            next++;
            count++;
        }
    }
    return selected.length;
};
