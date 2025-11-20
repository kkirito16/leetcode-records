// 3234. 统计 1 显著的字符串的数量
// 给你一个二进制字符串 s。

// 请你统计并返回其中 1 显著 的 子字符串 的数量。

// 如果字符串中 1 的数量 大于或等于 0 的数量的 平方，则认为该字符串是一个 1 显著 的字符串 。
/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
  const n = s.length;
  let ans = 0;
  let run = 0;
  const zeros = [];

  for (let i = 0; i < n; i++) {
    if (s[i] === '1') {
      run += 1;
    } else {
      ans += (run * (run + 1)) / 2;
      run = 0;
      zeros.push(i);
    }
  }
  ans += (run * (run + 1)) / 2;

  const m = zeros.length;
  if (m === 0) return ans;

  const pos = [-1, ...zeros, n];
  const limit = Math.floor(Math.sqrt(n));

  for (let z = 1; z <= limit && z <= m; z++) {
    const needLen = z * z + z;
    for (let left = 1; left + z - 1 <= m; left++) {
      const right = left + z - 1;
      const startMin = pos[left - 1] + 1;
      const startMax = pos[left];
      const endMin = pos[right];
      const endMax = pos[right + 1] - 1;

      if (endMax - startMin + 1 < needLen) continue;

      const threshold = endMin - needLen + 1;

      const lowEnd = Math.min(startMax, threshold);
      if (lowEnd >= startMin) {
        const count = lowEnd - startMin + 1;
        ans += count * (endMax - endMin + 1);
      }

      const upperStart = Math.max(startMin, threshold + 1);
      const upperEnd = Math.min(startMax, endMax - needLen + 1);
      if (upperStart <= upperEnd) {
        const count = upperEnd - upperStart + 1;
        const constant = endMax - needLen + 2;
        const sumIndices = ((upperStart + upperEnd) * count) / 2;
        ans += count * constant - sumIndices;
      }
    }
  }

  return ans;
};
