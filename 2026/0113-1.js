// 3453. 分割正方形 I
// 给你一个二维整数数组 squares ，其中 squares[i] = [xi, yi, li] 表示一个与 x 轴平行的正方形的左下角坐标和正方形的边长。

// 找到一个最小的 y 坐标，它对应一条水平线，该线需要满足它以上正方形的总面积 等于 该线以下正方形的总面积。

// 答案如果与实际答案的误差在 10-5 以内，将视为正确答案。

// 注意：正方形 可能会 重叠。重叠区域应该被 多次计数 。
/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function(squares) {
    if (squares.length === 0) return 0;

    let minY = Infinity;
    let maxY = -Infinity;
    for (const [xi, yi, li] of squares) {
        minY = Math.min(minY, yi);
        maxY = Math.max(maxY, yi + li);
    }

    function getArea(y) {
        let above = 0;
        let below = 0;
        for (const [xi, yi, li] of squares) {
            const top = yi + li;
            if (y <= yi) {
                above += li * li;
            } else if (y >= top) {
                below += li * li;
            } else {
                const aboveHeight = top - y;
                const belowHeight = y - yi;
                above += aboveHeight * li;
                below += belowHeight * li;
            }
        }
        return { above, below };
    }

    let left = minY;
    let right = maxY;
    const eps = 1e-5;
    while (right - left > eps) {
        const mid = (left + right) / 2;
        const { above, below } = getArea(mid);
        if (above > below) {
            left = mid;
        } else {
            right = mid;
        }
    }

    return left;
};