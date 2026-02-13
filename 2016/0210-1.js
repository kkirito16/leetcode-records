// 3719. 最长平衡子数组 I
// 给你一个整数数组 nums。
// 如果子数组中 不同偶数 的数量等于 不同奇数 的数量，则称该 子数组 是 平衡的 。

// 返回 最长 平衡子数组的长度。

// 子数组 是数组中连续且 非空 的一段元素序列。
/**
 * @param {number[]} nums
 * @return {number}
 */
const longestBalanced = function(nums) {
    const n = nums.length;
    let maxLen = 0;
    for (let i = 0; i < n; i++) {
        const evens = new Set();
        const odds = new Set();
        for (let j = i; j < n; j++) {
            if (nums[j] % 2 === 0) evens.add(nums[j]);
            else odds.add(nums[j]);
            if (evens.size === odds.size) maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
};