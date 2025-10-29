// 1716. 计算力扣银行的钱
// Hercy 想要为购买第一辆车存钱。他 每天 都往力扣银行里存钱。

// 最开始，他在周一的时候存入 1 块钱。从周二到周日，他每天都比前一天多存入 1 块钱。在接下来每一个周一，他都会比 前一个周一 多存入 1 块钱。

// 给你 n ，请你返回在第 n 天结束的时候他在力扣银行总共存了多少块钱。
/**
 * @param {number} n
 * @return {number}
 */
var totalMoney = function (n) {
  const weeks = Math.floor(n / 7);
  const days = n % 7;

  // Sum of full weeks: each week increases its starting value by 1
  const fullWeeks =
    weeks * 28 + (weeks * (weeks - 1) * 7) / 2;

  // Remaining days form an arithmetic progression starting from weeks + 1
  const remainingDays =
    (days * (2 * (weeks + 1) + (days - 1))) / 2;

  return fullWeeks + remainingDays;
};
