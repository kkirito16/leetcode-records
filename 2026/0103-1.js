// 1411. 给 N x 3 网格图涂色的方案数
// 你有一个 n x 3 的网格图 grid ，你需要用 红，黄，绿 三种颜色之一给每一个格子上色，且确保相邻格子颜色不同（也就是有相同水平边或者垂直边的格子颜色不同）。

// 给你网格图的行数 n 。

// 请你返回给 grid 涂色的方案数。由于答案可能会非常大，请你返回答案对 10^9 + 7 取余的结果。
/**
 * @param {number} n
 * @return {number}
 */
var numOfWays = function (n) {
    const MOD = 1000000007;
    let twoColor = 6; // rows using exactly two colors (e.g., ABA/BAB)
    let threeColor = 6; // rows using three distinct colors

    for (let i = 2; i <= n; i++) {
        const nextTwo = (threeColor * 2 + twoColor * 3) % MOD;
        const nextThree = (threeColor * 2 + twoColor * 2) % MOD;
        twoColor = nextTwo;
        threeColor = nextThree;
    }

    return (twoColor + threeColor) % MOD;
};
