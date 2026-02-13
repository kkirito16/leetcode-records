// 2654. 使数组所有元素变成 1 的最少操作次数
// 给你一个下标从 0 开始的 正 整数数组 nums 。你可以对数组执行以下操作 任意 次：

// 选择一个满足 0 <= i < n - 1 的下标 i ，将 nums[i] 或者 nums[i + 1] 两者之一替换成它们的最大公约数。
// 请你返回使数组 nums 中所有元素都等于 1 的 最少 操作次数。如果无法让数组全部变成 1 ，请你返回 - 1 。

// 两个正整数的最大公约数指的是能整除这两个数的最大正整数。
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  const n = nums.length;
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  let ones = 0;
  for (const num of nums) if (num === 1) ones++;
  if (ones > 0) return n - ones;

  let minLen = Infinity;
  for (let i = 0; i < n; i++) {
    let g = nums[i];
    for (let j = i; j < n; j++) {
      g = gcd(g, nums[j]);
      if (g === 1) {
        minLen = Math.min(minLen, j - i + 1);
        break;
      }
    }
  }

  if (!isFinite(minLen)) return -1;
  return minLen + n - 2;
};
