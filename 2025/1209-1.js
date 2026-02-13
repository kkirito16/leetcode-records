// 3583. 统计特殊三元组
// 给你一个整数数组 nums。

// 特殊三元组 定义为满足以下条件的下标三元组(i, j, k)：

/**
 * @param {number[]} nums
 * @return {number}
 */
var specialTriplets = function (nums) {
    const mod = 1_000_000_007;
    const maxVal = 200_000;
    const left = new Array(maxVal + 1).fill(0);
    const right = new Array(maxVal + 1).fill(0);

    for (const num of nums) {
        right[num]++;
    }

    let ans = 0;
    for (const num of nums) {
        right[num]--;
        const target = num * 2;
        const l = left[target];
        const r = right[target];
        ans = (ans + (l * r) % mod) % mod;
        left[num]++;
    }

    return ans;
};
