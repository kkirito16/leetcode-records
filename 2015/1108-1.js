// 1611. 使整数变为 0 的最少操作次数
// 给你一个整数 n，你需要重复执行多次下述操作将其转换为 0 ：

// 翻转 n 的二进制表示中最右侧位（第 0 位）。
// 如果第(i - 1) 位为 1 且从第(i - 2) 位到第 0 位都为 0，则翻转 n 的二进制表示中的第 i 位。
// 返回将 n 转换为 0 的最小操作次数。
/**
 * @param {number} n
 * @return {number}
 */
var minimumOneBitOperations = function (n) {
  const memo = new Map([[0, 0]]);

  const dfs = (x) => {
    if (memo.has(x)) return memo.get(x);
    const msb = 31 - Math.clz32(x);
    const full = Math.pow(2, msb + 1) - 1;
    const next = x ^ (1 << msb);
    const val = full - dfs(next);
    memo.set(x, val);
    return val;
  };

  return dfs(n);
};
