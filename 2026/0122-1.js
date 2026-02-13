// 3507. 移除最小数对使数组有序 I
// 给你一个数组 nums，你可以执行以下操作任意次数：

// 选择 相邻 元素对中 和最小 的一对。如果存在多个这样的对，选择最左边的一个。
// 用它们的和替换这对元素。
// 返回将数组变为 非递减 所需的 最小操作次数 。

// 如果一个数组中每个元素都大于或等于它前一个元素（如果存在的话），则称该数组为非递减。

/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumPairRemoval = function(nums) {
    let operations = 0;
    const arr = [...nums];
    
    function isNonDecreasing(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return false;
            }
        }
        return true;
    }
    
    while (!isNonDecreasing(arr)) {
        let minSum = Infinity;
        let minIndex = -1;
        
        for (let i = 0; i < arr.length - 1; i++) {
            const sum = arr[i] + arr[i + 1];
            if (sum < minSum) {
                minSum = sum;
                minIndex = i;
            }
        }
        
        arr.splice(minIndex, 2, minSum);
        operations++;
    }
    
    return operations;
};