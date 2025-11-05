// 3289. 数字小镇中的捣蛋鬼
// 数字小镇 Digitville 中，存在一个数字列表 nums，其中包含从 0 到 n - 1 的整数。每个数字本应 只出现一次，然而，有 两个 顽皮的数字额外多出现了一次，使得列表变得比正常情况下更长。

// 为了恢复 Digitville 的和平，作为小镇中的名侦探，请你找出这两个顽皮的数字。

// 返回一个长度为 2 的数组，包含这两个数字（顺序任意）。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  const seen = new Set();
  const result = [];
  for (const num of nums) {
    if (seen.has(num)) {
      result.push(num);
      if (result.length === 2) {
        break;
      }
    } else {
      seen.add(num);
    }
  }
  return result;
};
