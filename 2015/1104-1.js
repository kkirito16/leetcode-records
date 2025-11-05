// 3318. 计算子数组的 x-sum I
// 给你一个由 `n` 个整数组成的数组 `nums`，以及两个整数 `k` 和 `x`。

// 数组的 ** x - sum ** 计算按照以下步骤进行：

// - 统计数组中所有元素的出现次数。
// - 仅保留出现次数最多的前`x` 个元素的每次出现。如果两个元素的出现次数相同，则数值 ** 较大 ** 的元素被认为出现次数更多。
// - 计算结果数组的和。

// ** 注意 **，如果数组中的不同元素少于 `x` 个，则其 ** x - sum ** 是数组的元素总和。

// 返回一个长度为 `n - k + 1` 的整数数组 `answer`，其中 `answer[i]` 是 子数组 `nums[i..i + k - 1]` 的 ** x - sum **。

// ** 子数组 ** 是数组内的一个连续 ** 非空 ** 的元素序列。
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function (nums, k, x) {
    let n = nums.length - k - 1;
    let answer = [];
    for (let i = 0; i <= n + 1; i++) {
        const sum = topX(nums.slice(i, i + k), x);
        answer.push(sum);
    }
    return answer;

};
function topX(arr, x) {
    const map = new Map();

    for (const num of arr) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    const sorted = Array.from(map.entries()).sort((a, b) => {
        if (b[1] === a[1]) {
            return b[0] - a[0];
        }
        return b[1] - a[1];
    });

    return sorted.slice(0, x).reduce((acc, [num, count]) => acc + num * count, 0);
}
let nums = [1, 2, 3, 4, 5, 6], k = 6, x = 1;


console.log(findXSum(nums, k, x)); 