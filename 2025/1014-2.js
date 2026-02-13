// 224. 基本计算器
// 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

// 注意: 不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  const stack = [];
  let result = 0;
  let sign = 1;
  let num = 0;

  for (let i = 0; i < s.length; i += 1) {
    const ch = s[i];

    if (ch >= '0' && ch <= '9') {
      num = num * 10 + (ch.charCodeAt(0) - 48);
    } else if (ch === '+' || ch === '-') {
      result += sign * num;
      num = 0;
      sign = ch === '+' ? 1 : -1;
    } else if (ch === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (ch === ')') {
      result += sign * num;
      num = 0;
      result *= stack.pop();
      result += stack.pop();
    }
  }

  return result + sign * num;
};
