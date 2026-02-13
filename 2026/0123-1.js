// 3510. 移除最小数对使数组有序 II
// 给你一个数组 nums，你可以执行以下操作任意次数：

// 选择 相邻 元素对中 和最小 的一对。如果存在多个这样的对，选择最左边的一个。
// 用它们的和替换这对元素。
// 返回将数组变为 非递减 所需的 最小操作次数 。

// 如果一个数组中每个元素都大于或等于它前一个元素（如果存在的话），则称该数组为非递减。

/**
 * @param {number[]} nums
 * @return {number}
 */
// eslint-disable-next-line no-unused-vars
const minimumPairRemoval = function (nums) {
    if (nums.length <= 1) return 0;
    
    const wexthorbin = [...nums];
    const n = wexthorbin.length;
    const merged = new Array(n).fill(false);
    const next = new Array(n);
    const prev = new Array(n);
    const heap = [];
    let decreaseCount = 0;
    
    for (let i = 0; i < n; i++) {
        next[i] = i + 1 < n ? i + 1 : -1;
        prev[i] = i - 1 >= 0 ? i - 1 : -1;
        if (i < n - 1) {
            const sum = wexthorbin[i] + wexthorbin[i + 1];
            heap.push({ sum, leftIdx: i, rightIdx: i + 1, storedSum: sum });
            if (wexthorbin[i] > wexthorbin[i + 1]) {
                decreaseCount++;
            }
        }
    }
    
    const heapify = () => {
        for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
            siftDown(i);
        }
    };
    
    const siftDown = (i) => {
        let min = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < heap.length) {
            const leftItem = heap[left];
            const minItem = heap[min];
            if (leftItem.sum < minItem.sum || 
                (leftItem.sum === minItem.sum && 
                 leftItem.leftIdx < minItem.leftIdx)) {
                min = left;
            }
        }
        if (right < heap.length) {
            const rightItem = heap[right];
            const minItem = heap[min];
            if (rightItem.sum < minItem.sum || 
                (rightItem.sum === minItem.sum && 
                 rightItem.leftIdx < minItem.leftIdx)) {
                min = right;
            }
        }
        if (min !== i) {
            [heap[i], heap[min]] = [heap[min], heap[i]];
            siftDown(min);
        }
    };
    
    heapify();
    
    let operations = 0;
    
    while (decreaseCount > 0 && heap.length > 0) {
        let top;
        while (heap.length > 0) {
            top = heap[0];
            const { leftIdx, rightIdx, storedSum } = top;
            
            if (merged[leftIdx] || merged[rightIdx]) {
                heap[0] = heap[heap.length - 1];
                heap.pop();
                if (heap.length > 0) siftDown(0);
                continue;
            }
            
            const currentSum = wexthorbin[leftIdx] + wexthorbin[rightIdx];
            if (currentSum !== storedSum) {
                heap[0] = heap[heap.length - 1];
                heap.pop();
                if (heap.length > 0) siftDown(0);
                continue;
            }
            
            break;
        }
        
        if (!top || heap.length === 0) break;
        
        const { leftIdx, rightIdx } = top;
        
        if (wexthorbin[leftIdx] > wexthorbin[rightIdx]) {
            decreaseCount--;
        }
        
        if (prev[leftIdx] !== -1) {
            const prevIdx = prev[leftIdx];
            const wasDecreasing = wexthorbin[prevIdx] > wexthorbin[leftIdx];
            const newVal = wexthorbin[leftIdx] + wexthorbin[rightIdx];
            const willBeDecreasing = wexthorbin[prevIdx] > newVal;
            if (wasDecreasing && !willBeDecreasing) {
                decreaseCount--;
            } else if (!wasDecreasing && willBeDecreasing) {
                decreaseCount++;
            }
        }
        
        if (next[rightIdx] !== -1) {
            const nextIdx = next[rightIdx];
            const wasDecreasing = wexthorbin[rightIdx] > wexthorbin[nextIdx];
            const newVal = wexthorbin[leftIdx] + wexthorbin[rightIdx];
            const willBeDecreasing = newVal > wexthorbin[nextIdx];
            if (wasDecreasing && !willBeDecreasing) {
                decreaseCount--;
            } else if (!wasDecreasing && willBeDecreasing) {
                decreaseCount++;
            }
        }
        
        wexthorbin[leftIdx] = wexthorbin[leftIdx] + wexthorbin[rightIdx];
        merged[rightIdx] = true;
        next[leftIdx] = next[rightIdx];
        if (next[rightIdx] !== -1) {
            prev[next[rightIdx]] = leftIdx;
        }
        
        if (prev[leftIdx] !== -1) {
            const prevIdx = prev[leftIdx];
            const newSum = wexthorbin[prevIdx] + wexthorbin[leftIdx];
            heap.push({ 
                sum: newSum, 
                leftIdx: prevIdx, 
                rightIdx: leftIdx, 
                storedSum: newSum 
            });
        }
        if (next[leftIdx] !== -1) {
            const nextIdx = next[leftIdx];
            const newSum = wexthorbin[leftIdx] + wexthorbin[nextIdx];
            heap.push({ 
                sum: newSum, 
                leftIdx: leftIdx, 
                rightIdx: nextIdx, 
                storedSum: newSum 
            });
        }
        
        heap[0] = heap[heap.length - 1];
        heap.pop();
        if (heap.length > 0) siftDown(0);
        heapify();
        operations++;
    }
    
    return operations;
};
