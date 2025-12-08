// 1925. 统计平方和三元组的数目
// 一个 平方和三元组(a, b, c) 指的是满足 a2 + b2 = c2 的 整数 三元组 a，b 和 c 。

// 给你一个整数 n ，请你返回满足 1 <= a, b, c <= n 的 平方和三元组 的数目。
/**
 * @param {number} n
 * @return {number}
 */
var countTriples = function (n) {
    let count = 0;
    for (let a = 1; a <= n; a++) {
        for (let b = a; b <= n; b++) {
            let c = Math.sqrt(a * a + b * b);
            if (c <= n && Number.isInteger(c)) {
                count += 2;
            }
        }
    }
    return count;
};