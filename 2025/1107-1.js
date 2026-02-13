// 2528. 最大化城市的最小电量
// 给你一个下标从 0 开始长度为 n 的整数数组 stations ，其中 stations[i] 表示第 i 座城市的供电站数目。

// 每个供电站可以在一定 范围 内给所有城市提供电力。换句话说，如果给定的范围是 r ，在城市 i 处的供电站可以给所有满足 | i - j | <= r 且 0 <= i, j <= n - 1 的城市 j 供电。

// | x | 表示 x 的 绝对值 。比方说，| 7 - 5 | = 2 ，| 3 - 10 | = 7 。
// 一座城市的 电量 是所有能给它供电的供电站数目。

// 政府批准了可以额外建造 k 座供电站，你需要决定这些供电站分别应该建在哪里，这些供电站与已经存在的供电站有相同的供电范围。

// 给你两个整数 r 和 k ，如果以最优策略建造额外的发电站，返回所有城市中，最小电量的最大值是多少。

// 这 k 座供电站可以建在多个城市。
/**
 * @param {number[]} stations
 * @param {number} r
 * @param {number} k
 * @return {number}
 */
var maxPower = function (stations, r, k) {
  const n = stations.length;
  const prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stations[i];

  const base = new Array(n);
  let baseMax = 0;
  for (let i = 0; i < n; i++) {
    const left = Math.max(0, i - r);
    const right = Math.min(n - 1, i + r);
    base[i] = prefix[right + 1] - prefix[left];
    if (base[i] > baseMax) baseMax = base[i];
  }

  const canReach = (target) => {
    const diff = new Array(n + 1).fill(0);
    let curr = 0;
    let used = 0;

    for (let i = 0; i < n; i++) {
      curr += diff[i];
      const total = base[i] + curr;
      if (total < target) {
        const need = target - total;
        used += need;
        if (used > k) return false;
        curr += need;
        const end = i + 2 * r + 1;
        if (end < diff.length) diff[end] -= need;
      }
    }
    return true;
  };

  let left = 0;
  let right = baseMax + k;
  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    if (canReach(mid)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return left;
};
