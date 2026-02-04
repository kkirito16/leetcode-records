// 3315. 构造最小位运算数组 II
// 给你一个长度为 n 的质数数组 nums 。你的任务是返回一个长度为 n 的数组 ans ，对于每个下标 i ，以下 条件 均成立：

// ans[i] OR (ans[i] + 1) == nums[i]
// 除此以外，你需要 最小化 结果数组里每一个 ans[i] 。

// 如果没法找到符合 条件 的 ans[i] ，那么 ans[i] = -1 。

// 质数 指的是一个大于 1 的自然数，且它只有 1 和自己两个因数。


/**
 * @param {number[]} nums
 * @return {number[]}
 */
const minBitwiseArray = function(nums) {
    const ans = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
        const p = nums[i];
        if (p === 2) {
            ans[i] = -1;
            continue;
        }
        let m = p + 1;
        let t = 0;
        while (m % 2 === 0) {
            t++;
            m = m / 2;
        }
        const subtract = Math.pow(2, t - 1);
        ans[i] = p - subtract;
    }
    return ans;
};