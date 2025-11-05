// 1526. 形成目标数组的子数组最少增加次数
// 给你一个整数数组 target 和一个数组 initial ，initial 数组与 target 数组有同样的维度，且一开始全部为 0 。
//
// 请你返回从 initial 得到 target 的最少操作次数，每次操作需遵循以下规则：
//
// 在 initial 中选择 任意 子数组，并将子数组中每个元素增加 1 。
// 答案保证在 32 位有符号整数以内。
/**
 * @param {number[]} target
 * @return {number}
 */
var minNumberOperations = function (target) {
    if (target.length === 0) {
        return 0;
    }
    let ops = target[0];
    for (let i = 1; i < target.length; i++) {
        const diff = target[i] - target[i - 1];
        if (diff > 0) {
            ops += diff;
        }
    }
    return ops;
};
