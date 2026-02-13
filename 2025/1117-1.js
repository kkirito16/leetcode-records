// 1437. 是否所有 1 都至少相隔 k 个元素
// 给你一个由若干 0 和 1 组成的数组 nums 以及整数 k。如果所有 1 都至少相隔 k 个元素，则返回 true ；否则，返回 false 。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var kLengthApart = function (nums, k) {
    let prev = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            if (prev !== -1 && i - prev - 1 < k) {
                return false;
            }
            prev = i;
        }
    }
    return true;
}