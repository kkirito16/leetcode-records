// 3634. 使数组平衡的最少移除数目
// 给你一个整数数组 nums 和一个整数 k。

// 如果一个数组的 最大 元素的值 至多 是其 最小 元素的 k 倍，则该数组被称为是 平衡 的。

// 你可以从 nums 中移除 任意 数量的元素，但不能使其变为 空 数组。

// 返回为了使剩余数组平衡，需要移除的元素的 最小 数量。

// 注意：大小为 1 的数组被认为是平衡的，因为其最大值和最小值相等，且条件总是成立。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minRemoval = function(nums, k) {
    const n = nums.length;
    if (n <= 1) return 0;
    const sorted = [...nums].sort((a, b) => a - b);
    let maxCount = 1;
    for (let i = 0; i < n; i++) {
        const maxAllowed = k * sorted[i];
        let lo = i;
        let hi = n - 1;
        while (lo < hi) {
            const mid = (lo + hi + 1) >> 1;
            if (sorted[mid] <= maxAllowed) lo = mid;
            else hi = mid - 1;
        }
        maxCount = Math.max(maxCount, lo - i + 1);
    }
    return n - maxCount;
};