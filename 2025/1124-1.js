// 1018. 可被 5 整除的二进制前缀
// 给定一个二进制数组 nums ( 索引从0开始 )。

// 我们将xi 定义为其二进制表示形式为子数组 nums[0..i] (从最高有效位到最低有效位)。

// 例如，如果 nums =[1,0,1] ，那么 x0 = 1, x1 = 2, 和 x2 = 5。
// 返回布尔值列表 answer，只有当 xi 可以被 5 整除时，答案 answer[i] 为 true，否则为 false。
/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
var prefixesDivBy5 = function (nums) {
    let answer = [];
    let prefix = 0;
    for (let i = 0; i < nums.length; i++) {
        prefix = (prefix * 2 + nums[i]) % 5;
        answer.push(prefix === 0);
    }
    return answer;
};