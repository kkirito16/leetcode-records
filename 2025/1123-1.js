// 1262. 可被三整除的最大和
// 给你一个整数数组 nums，请你找出并返回能被三整除的元素 最大和。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
    let total = 0;
    const rem1 = [];
    const rem2 = [];
    const addTo = (arr, value) => {
        arr.push(value);
        arr.sort((a, b) => a - b);
        if (arr.length > 2) arr.pop();
    };
    for (const num of nums) {
        total += num;
        const remainder = num % 3;
        if (remainder === 1) {
            addTo(rem1, num);
        } else if (remainder === 2) {
            addTo(rem2, num);
        }
    }
    if (total % 3 === 0) return total;
    let candidate = 0;
    if (total % 3 === 1) {
        const option1 = rem1.length >= 1 ? rem1[0] : Infinity;
        const option2 = rem2.length >= 2 ? rem2[0] + rem2[1] : Infinity;
        candidate = Math.min(option1, option2);
    } else {
        const option1 = rem2.length >= 1 ? rem2[0] : Infinity;
        const option2 = rem1.length >= 2 ? rem1[0] + rem1[1] : Infinity;
        candidate = Math.min(option1, option2);
    }
    return candidate === Infinity ? 0 : total - candidate;
};
