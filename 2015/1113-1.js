// 3228. 将 1 移动到末尾的最大操作次数
// 给你一个 二进制字符串 s。

// 你可以对这个字符串执行 任意次 下述操作：

// 选择字符串中的任一下标 i（ i + 1 < s.length ），该下标满足 s[i] == '1' 且 s[i + 1] == '0'。
// 将字符 s[i] 向 右移 直到它到达字符串的末端或另一个 '1'。例如，对于 s = "010010"，如果我们选择 i = 1，结果字符串将会是 s = "000110"。
// 返回你能执行的 最大 操作次数。
/**
 * @param {string} s
 * @return {number}
 */
var maxOperations = function (s) {
  let ones = 0;
  let zeros = 0;
  let ans = 0;

  for (const ch of s) {
    if (ch === '1') {
      if (zeros > 0) {
        ans += ones; // zero block between ones crosses earlier ones once
      }
      zeros = 0;
      ones += 1;
    } else {
      zeros += 1;
    }
  }

  if (zeros > 0) {
    ans += ones; // trailing zeros cross all ones
  }

  return ans;
};
