// 3346. 执行操作后元素的最高频率 I
// 给你一个整数数组 nums 和两个整数 k 和 numOperations 。

// 你必须对 nums 执行 操作  numOperations 次。每次操作中，你可以：

// 选择一个下标 i ，它在之前的操作中 没有 被选择过。
// 将 nums[i] 增加范围 [-k, k] 中的一个整数。
// 在执行完所有操作以后，请你返回 nums 中出现 频率最高 元素的出现次数。

// 一个元素 x 的 频率 指的是它在数组中出现的次数。

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  if (nums.length === 0) return 0;
  if (numOperations === 0) {
    const freqOnly = new Map();
    let baseMax = 0;
    for (const num of nums) {
      const count = (freqOnly.get(num) || 0) + 1;
      freqOnly.set(num, count);
      if (count > baseMax) baseMax = count;
    }
    return baseMax;
  }

  const freq = new Map();
  const diff = new Map();

  for (const num of nums) {
    const count = (freq.get(num) || 0) + 1;
    freq.set(num, count);

    const start = num - k;
    const end = num + k + 1;

    diff.set(start, (diff.get(start) || 0) + 1);
    diff.set(end, (diff.get(end) || 0) - 1);
  }

  const pointsSet = new Set();
  for (const key of diff.keys()) pointsSet.add(key);
  for (const key of freq.keys()) pointsSet.add(key);

  const points = Array.from(pointsSet).sort((a, b) => a - b);

  let coverage = 0;
  let answer = 0;

  for (const point of points) {
    if (diff.has(point)) {
      coverage += diff.get(point);
    }

    const freqVal = freq.get(point) || 0;
    const convertible = Math.max(0, coverage - freqVal);
    const candidate = freqVal + Math.min(numOperations, convertible);

    if (candidate > answer) {
      answer = candidate;
    }
  }

  return answer;
};
