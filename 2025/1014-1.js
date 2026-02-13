// 3349. 检测相邻递增子数组 I
// 给你一个由 n 个整数组成的数组 nums 和一个整数 k，请你确定是否存在 两个 相邻 且长度为 k 的 严格递增 子数组。具体来说，需要检查是否存在从下标 a 和 b (a < b) 开始的 两个 子数组，并满足下述全部条件：

// 这两个子数组 nums[a..a + k - 1] 和 nums[b..b + k - 1] 都是 严格递增 的。
// 这两个子数组必须是 相邻的，即 b = a + k。
// 如果可以找到这样的 两个 子数组，请返回 true；否则返回 false。

// 子数组 是数组中的一个连续 非空 的元素序列。


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var hasIncreasingSubarrays = function (nums, k) {
  const n = nums.length;
  if (n < 2 * k) return false;

  const inc = new Array(n).fill(1);
  for (let i = 1; i < n; i += 1) {
    inc[i] = nums[i] > nums[i - 1] ? inc[i - 1] + 1 : 1;
  }

  for (let start = k; start <= n - k; start += 1) {
    if (inc[start - 1] >= k && inc[start + k - 1] >= k) return true;
  }

  return false;
};
