// 85. 最大矩形
// 给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return 0;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = Array(cols).fill(0);
    let maxArea = 0;

    const largestRectangleArea = function (arr) {
        const stack = [];
        let best = 0;
        for (let i = 0; i <= arr.length; i++) {
            const cur = i === arr.length ? 0 : arr[i];
            while (stack.length > 0 && cur < arr[stack[stack.length - 1]]) {
                const h = arr[stack.pop()];
                const left = stack.length === 0 ? -1 : stack[stack.length - 1];
                const width = i - left - 1;
                best = Math.max(best, h * width);
            }
            stack.push(i);
        }
        return best;
    };

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === '1' || matrix[r][c] === 1) {
                heights[c] += 1;
            } else {
                heights[c] = 0;
            }
        }
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
};
