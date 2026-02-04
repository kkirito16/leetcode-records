// 3637. 三段式数组 I
// 给你一个长度为 n 的整数数组 nums。

// 如果存在索引 0 < p < q < n − 1，使得数组满足以下条件，则称其为 三段式数组（trionic）：

// nums[0...p] 严格 递增，
// nums[p...q] 严格 递减，
// nums[q...n − 1] 严格 递增。
// 如果 nums 是三段式数组，返回 true；否则，返回 false。

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// eslint-disable-next-line no-unused-vars
const isTrionic = function (nums) {
    const n = nums.length;
    if (n < 4) return false;

    const leftInc = new Array(n);
    leftInc[0] = true;
    for (let i = 1; i < n; i++) {
        leftInc[i] = leftInc[i - 1] && nums[i] > nums[i - 1];
    }

    const rightInc = new Array(n);
    rightInc[n - 1] = true;
    for (let i = n - 2; i >= 0; i--) {
        rightInc[i] = rightInc[i + 1] && nums[i] < nums[i + 1];
    }

    let i = 1;
    while (i <= n - 2) {
        const a = i;
        while (i <= n - 2 && nums[i] > nums[i + 1]) {
            i++;
        }
        const b = Math.min(i, n - 2);
        if (a < b) {
            let bestP = -1;
            for (let p = a; p < b; p++) {
                if (leftInc[p]) bestP = p;
            }
            if (bestP >= 0) {
                for (let q = bestP + 1; q <= b; q++) {
                    if (rightInc[q]) return true;
                }
            }
        }
        i++;
    }

    return false;
};