// 3640. 三段式数组 II
// 给你一个长度为 n 的整数数组 nums。

// 三段式子数组 是一个连续子数组 nums[l...r]（满足 0 <= l < r < n），并且存在下标 l < p < q < r，使得：

// nums[l...p] 严格 递增，
// nums[p...q] 严格 递减，
// nums[q...r] 严格 递增。
// 请你从数组 nums 的所有三段式子数组中找出和最大的那个，并返回其 最大 和。
/**
 * @param {number[]} nums
 * @return {number}
 */
function buildSparseTable(arr, isMin) {
    const n = arr.length;
    const k = Math.floor(Math.log2(n)) + 1;
    const st = Array.from({ length: n }, () => new Array(k));
    for (let i = 0; i < n; i++) st[i][0] = arr[i];
    for (let j = 1; j < k; j++) {
        for (let i = 0; i + (1 << j) <= n; i++) {
            const a = st[i][j - 1];
            const b = st[i + (1 << (j - 1))][j - 1];
            st[i][j] = isMin ? Math.min(a, b) : Math.max(a, b);
        }
    }
    return (lo, hi) => {
        if (lo > hi) return isMin ? Infinity : -Infinity;
        const j = Math.floor(Math.log2(hi - lo + 1));
        const a = st[lo][j];
        const b = st[hi - (1 << j) + 1][j];
        return isMin ? Math.min(a, b) : Math.max(a, b);
    };
}

// eslint-disable-next-line no-unused-vars
const maxSumTrionic = function (nums) {
    const n = nums.length;
    if (n < 4) return Math.max(...nums, -Infinity);

    const prefixSum = new Array(n + 1);
    prefixSum[0] = 0;
    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + nums[i];
    }

    const rangeMinPrefix = buildSparseTable(prefixSum, true);
    const rangeMaxPrefix = buildSparseTable(prefixSum, false);

    const leftIncStart = new Array(n);
    leftIncStart[0] = 0;
    for (let i = 1; i < n; i++) {
        leftIncStart[i] = nums[i] > nums[i - 1] ? leftIncStart[i - 1] : i;
    }

    const rightIncEnd = new Array(n);
    rightIncEnd[n - 1] = n - 1;
    for (let i = n - 2; i >= 0; i--) {
        rightIncEnd[i] = nums[i] < nums[i + 1] ? rightIncEnd[i + 1] : i;
    }

    const getMinPrefixLeft = (p) => {
        const L = leftIncStart[p];
        if (L >= p) return Infinity;
        return rangeMinPrefix(L, p - 1);
    };

    const getMaxPrefixRight = (q) => {
        const R = rightIncEnd[q];
        if (q >= R) return -Infinity;
        return rangeMaxPrefix(q + 2, R + 1);
    };

    let best = -Infinity;
    let i = 1;
    while (i <= n - 2) {
        const a = i;
        while (i <= n - 2 && nums[i] > nums[i + 1]) {
            i++;
        }
        const b = Math.min(i, n - 2);
        if (a < b) {
            let minMinLeft = getMinPrefixLeft(a);
            for (let q = a + 1; q <= b; q++) {
                const minLeft = getMinPrefixLeft(q - 1);
                if (minLeft < minMinLeft) minMinLeft = minLeft;
                const maxRight = getMaxPrefixRight(q);
                if (maxRight === -Infinity) continue;
                const sum = maxRight - minMinLeft;
                if (sum > best) best = sum;
            }
        }
        i++;
    }

    return best === -Infinity ? Math.max(...nums) : best;
};