// 1390. 四因数
// 给你一个整数数组 nums，请你返回该数组中恰有四个因数的这些整数的各因数之和。如果数组中不存在满足题意的整数，则返回 0 。
/**
 * @param {number[]} nums
 * @return {number}
 */
var sumFourDivisors = function (nums) {
    const MOD = 1000000007;
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        let sum = 0;
        for (let j = 1; j <= Math.sqrt(nums[i]); j++) {
            if (nums[i] % j === 0) {
                count++;
                sum += j;
                if (j !== nums[i] / j) {
                    count++;
                    sum += nums[i] / j;
                }
            }
        }
        if (count === 4) {
            ans = (ans + sum) % MOD;
        }
    }
    return ans;
};