// 3542. 将所有元素变为 0 的最少操作次数
// 给你一个大小为 n 的 非负 整数数组 nums 。你的任务是对该数组执行若干次（可能为 0 次）操作，使得 所有 元素都变为 0。

// 在一次操作中，你可以选择一个子数组[i, j]（其中 0 <= i <= j < n），将该子数组中所有 最小的非负整数 的设为 0。

// 返回使整个数组变为 0 所需的最少操作次数。

// 一个 子数组 是数组中的一段连续元素。
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  const stack = [];
  let ops = 0;

  const process = (val) => {
    while (stack.length && stack[stack.length - 1] > val) {
      stack.pop();
      ops++;
    }
    if (val > 0 && (stack.length === 0 || stack[stack.length - 1] < val)) {
      stack.push(val);
    }
  };

  for (const num of nums) process(num);
  process(0); // flush remaining heights

  return ops;
};
