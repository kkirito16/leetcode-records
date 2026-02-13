// 2300. 咒语和药水的成功对数
// 给你两个正整数数组 spells 和 potions ，长度分别为 n 和 m ，其中 spells[i] 表示第 i 个咒语的能量强度，potions[j] 表示第 j 瓶药水的能量强度。
// 同时给你一个整数 success 。一个咒语和药水的能量强度 相乘 如果 大于等于 success ，那么它们视为一对 成功 的组合。
// 请你返回一个长度为 n 的整数数组 pairs，其中 pairs[i] 是能跟第 i 个咒语成功组合的 药水 数目。
// 

/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function(spells, potions, success) {
  potions.sort((a, b) => a - b);
  const m = potions.length;

  function lowerBound(x) {
    let l = 0, r = m;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (potions[mid] >= x) r = mid;
      else l = mid + 1;
    }
    return l; 
  }

  const res = new Array(spells.length);
  for (let i = 0; i < spells.length; i++) {
    const s = spells[i];
    const need = Math.ceil(success / s);
    const idx = lowerBound(need);
    res[i] = m - idx;
  }
  return res;
};