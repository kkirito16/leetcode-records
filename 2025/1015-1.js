// 3350. 检测相邻递增子数组 II
// 给你一个由 n 个整数组成的数组 nums ，请你找出 k 的 最大值，使得存在 两个 相邻 且长度为 k 的 严格递增 子数组。具体来说，需要检查是否存在从下标 a 和 b(a < b) 开始的 两个 子数组，并满足下述全部条件：

// 这两个子数组 nums[a..a + k - 1] 和 nums[b..b + k - 1] 都是 严格递增 的。
// 这两个子数组必须是 相邻的，即 b = a + k。
// 返回 k 的 最大可能 值。

// 子数组 是数组中的一个连续 非空 的元素序列。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxIncreasingSubarrays = function (nums) {
    const n = nums.length;
    if (n < 2) return 0;

    const left = new Array(n).fill(1);
    for (let i = 1; i < n; i += 1) {
        left[i] = nums[i] > nums[i - 1] ? left[i - 1] + 1 : 1;
    }

    const right = new Array(n).fill(1);
    for (let i = n - 2; i >= 0; i -= 1) {
        right[i] = nums[i] < nums[i + 1] ? right[i + 1] + 1 : 1;
    }

    let ans = 0;
    for (let i = 1; i < n; i += 1) {
        ans = Math.max(ans, Math.min(left[i - 1], right[i]));
    }

    return ans;
};
