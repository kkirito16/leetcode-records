// 1930. 长度为 3 的不同回文子序列
// 给你一个字符串 s ，返回 s 中 长度为 3 的不同回文子序列 的个数。

// 即便存在多种方法来构建相同的子序列，但相同的子序列只计数一次。

// 回文 是正着读和反着读一样的字符串。

// 子序列 是由原字符串删除其中部分字符（也可以不删除）且不改变剩余字符之间相对顺序形成的一个新字符串。

// 例如，"ace" 是 "abcde" 的一个子序列。
/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
    const first = new Array(26).fill(Infinity);
    const last = new Array(26).fill(-1);
    for (let i = 0; i < s.length; i++) {
        const idx = s.charCodeAt(i) - 97;
        if (first[idx] === Infinity) {
            first[idx] = i;
        }
        last[idx] = i;
    }
    let result = 0;
    for (let c = 0; c < 26; c++) {
        if (last[c] - first[c] < 2) continue;
        const seen = new Set();
        for (let i = first[c] + 1; i < last[c]; i++) {
            seen.add(s[i]);
        }
        result += seen.size;
    }
    return result;
};
