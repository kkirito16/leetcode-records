// 2975. 移除栅栏得到的正方形田地的最大面积
// 有一个大型的 (m - 1) x (n - 1) 矩形田地，其两个对角分别是 (1, 1) 和 (m, n) ，田地内部有一些水平栅栏和垂直栅栏，分别由数组 hFences 和 vFences 给出。

// 水平栅栏为坐标 (hFences[i], 1) 到 (hFences[i], n)，垂直栅栏为坐标 (1, vFences[i]) 到 (m, vFences[i]) 。

// 返回通过 移除 一些栅栏（可能不移除）所能形成的最大面积的 正方形 田地的面积，或者如果无法形成正方形田地则返回 -1。

// 由于答案可能很大，所以请返回结果对 109 + 7 取余 后的值。

// 注意：田地外围两个水平栅栏（坐标 (1, 1) 到 (1, n) 和坐标 (m, 1) 到 (m, n) ）以及两个垂直栅栏（坐标 (1, 1) 到 (m, 1) 和坐标 (1, n) 到 (m, n) ）所包围。这些栅栏 不能 被移除。
/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} hFences
 * @param {number[]} vFences
 * @return {number}
 */
var maximizeSquareArea = function(m, n, hFences, vFences) {
    var hs = hFences.slice();
    var vs = vFences.slice();
    hs.push(1, m);
    vs.push(1, n);
    hs.sort(function(a, b) { return a - b; });
    vs.sort(function(a, b) { return a - b; });

    var hSet = new Set();
    for (var i = 0; i < hs.length; i++) {
        for (var j = i + 1; j < hs.length; j++) {
            hSet.add(hs[j] - hs[i]);
        }
    }

    var maxSide = 0;
    for (var x = 0; x < vs.length; x++) {
        for (var y = x + 1; y < vs.length; y++) {
            var diff = vs[y] - vs[x];
            if (hSet.has(diff) && diff > maxSide) {
                maxSide = diff;
            }
        }
    }

    if (maxSide === 0) {
        return -1;
    }
    var mod = 1000000007n;
    var side = BigInt(maxSide);
    return Number((side * side) % mod);
};
