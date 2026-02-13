// 2943. 最大化网格图中正方形空洞的面积
// 给你一个网格图，由 n + 2 条 横线段 和 m + 2 条 竖线段 组成，一开始所有区域均为 1 x 1 的单元格。

// 所有线段的编号从 1 开始。

// 给你两个整数 n 和 m 。

// 同时给你两个整数数组 hBars 和 vBars 。

// hBars 包含区间 [2, n + 1] 内 互不相同 的横线段编号。
// vBars 包含 [2, m + 1] 内 互不相同的 竖线段编号。
// 如果满足以下条件之一，你可以 移除 两个数组中的部分线段：

// 如果移除的是横线段，它必须是 hBars 中的值。
// 如果移除的是竖线段，它必须是 vBars 中的值。
// 请你返回移除一些线段后（可能不移除任何线段），剩余网格图中 最大正方形 空洞的面积，正方形空洞的意思是正方形 内部 不含有任何线段。
/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} hBars
 * @param {number[]} vBars
 * @return {number}
 */
var maximizeSquareHoleArea = function(n, m, hBars, vBars) {
    var maxConsecutive = function(bars) {
        if (!bars || bars.length === 0) {
            return 0;
        }
        bars.sort(function(a, b) { return a - b; });
        var best = 1;
        var cur = 1;
        for (var i = 1; i < bars.length; i++) {
            if (bars[i] === bars[i - 1] + 1) {
                cur++;
            } else {
                cur = 1;
            }
            if (cur > best) {
                best = cur;
            }
        }
        return best;
    };

    var maxH = maxConsecutive(hBars);
    var maxV = maxConsecutive(vBars);
    var side = Math.min(maxH, maxV) + 1;
    return side * side;
};
