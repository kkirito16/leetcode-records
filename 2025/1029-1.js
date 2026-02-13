// 3370. 仅含置位位的最小整数
// 给你一个正整数 n。

// 返回 大于等于 n 且二进制表示仅包含 置位 位的 最小 整数 x 。

// 置位 位指的是二进制表示中值为 1 的位。
/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function (n) {
  let x = 1;
  while (x < n) {
    x = (x << 1) | 1;
  }
  return x;
};
