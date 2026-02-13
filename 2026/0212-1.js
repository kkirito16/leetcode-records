// 3713. 最长的平衡子串 I
// 给你一个由小写英文字母组成的字符串 s。
// 如果一个 子串 中所有 不同 字符出现的次数都 相同 ，则称该子串为 平衡 子串。
// 请返回 s 的 最长平衡子串 的 长度 。
// 子串 是字符串中连续的、非空 的字符序列。
/**
 * @param {string} s
 * @return {number}
 */
const longestBalanced = function(s) {
    let maxLen = 0;
    const n = s.length;
    for (let i = 0; i < n; i++) {
        const freq = new Map();
        for (let j = i; j < n; j++) {
            const c = s[j];
            freq.set(c, (freq.get(c) ?? 0) + 1);
            const counts = [...freq.values()];
            if (counts.every(v => v === counts[0])) {
                maxLen = Math.max(maxLen, j - i + 1);
            }
        }
    }
    return maxLen;
};