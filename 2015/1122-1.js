// 3190. 使所有元素都可以被 3 整除的最少操作数
// 给你一个整数数组 nums 。一次操作中，你可以将 nums 中的 任意 一个元素增加或者减少 1 。

// 请你返回将 nums 中所有元素都可以被 3 整除的 最少 操作次数。
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
    let operations = 0;
    for (const num of nums) {
        const remainder = num % 3;
        if (remainder === 0) continue;
        operations += Math.min(remainder, 3 - remainder);
    }
    return operations;
};
