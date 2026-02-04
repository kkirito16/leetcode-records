// 1200. 最小绝对差
// 给你个整数数组 arr，其中每个元素都 不相同。

// 请你找到所有具有最小绝对差的元素对，并且按升序的顺序返回。

// 每对元素对 [a,b] 如下：

// a , b 均为数组 arr 中的元素
// a < b
// b - a 等于 arr 中任意两个元素的最小绝对差
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
const minimumAbsDifference = function (arr) {
    arr.sort((a, b) => a - b);
    
    let minDiff = Infinity;
    for (let i = 0; i < arr.length - 1; i++) {
        const diff = arr[i + 1] - arr[i];
        if (diff < minDiff) {
            minDiff = diff;
        }
    }
    
    const result = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] - arr[i] === minDiff) {
            result.push([arr[i], arr[i + 1]]);
        }
    }
    
    return result;
};