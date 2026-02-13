// 3512. 使数组和能被 K 整除的最少操作次数
// 给你一个整数数组 nums 和一个整数 k。你可以执行以下操作任意次：

// 选择一个下标 i，并将 nums[i] 替换为 nums[i] - 1。
// 返回使数组元素之和能被 k 整除所需的最小操作次数。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
    let sum = 0;
    for (const num of nums) sum += num;
    return sum % k;
};
