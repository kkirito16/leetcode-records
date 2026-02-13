// 3013. 将数组分成最小总代价的子数组 II
// 给你一个下标从 0 开始长度为 n 的整数数组 nums 和两个 正 整数 k 和 dist 。

// 一个数组的 代价 是数组中的 第一个 元素。比方说，[1,2,3] 的代价为 1 ，[3,4,1] 的代价为 3 。

// 你需要将 nums 分割成 k 个连续且互不相交的子数组，满足第二子数组与第 k 个子数组
// 中第一个元素的下标距离不超过 dist 。即分割点 i1,...,ik-1 满足 ik-1 - i1 <= dist 。

// 请你返回这些子数组的 最小 总代价。
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} dist
 * @return {number}
 */
// eslint-disable-next-line no-unused-vars
const minimumCost = function (nums, k, dist) {
    const n = nums.length;
    if (k === 1) return nums[0];
    if (k === 2) {
        let minRest = Infinity;
        for (let i = 1; i < n; i++) {
            minRest = Math.min(minRest, nums[i]);
        }
        return nums[0] + minRest;
    }

    const need = k - 2;
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const valToRank = new Map();
    sorted.forEach((v, i) => { valToRank.set(v, i + 1); });
    const rankToVal = (r) => sorted[r - 1];
    const maxRank = sorted.length;

    class Fenw {
        constructor(size) {
            this.n = size;
            this.tree = new Array(size + 1).fill(0);
        }
        update(i, delta) {
            for (; i <= this.n; i += i & -i) {
                this.tree[i] += delta;
            }
        }
        prefix(i) {
            let s = 0;
            for (; i > 0; i -= i & -i) {
                s += this.tree[i];
            }
            return s;
        }
    }

    const bitCount = new Fenw(maxRank);
    const bitSum = new Fenw(maxRank);

    const addVal = (val) => {
        const r = valToRank.get(val);
        bitCount.update(r, 1);
        bitSum.update(r, val);
    };

    const removeVal = (val) => {
        const r = valToRank.get(val);
        bitCount.update(r, -1);
        bitSum.update(r, -val);
    };

    const sumKSmallest = () => {
        if (bitCount.prefix(maxRank) < need) return Infinity;
        let lo = 1;
        let hi = maxRank;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (bitCount.prefix(mid) < need) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        const cntBefore = bitCount.prefix(lo - 1);
        const sumBefore = bitSum.prefix(lo - 1);
        const take = need - cntBefore;
        return sumBefore + take * rankToVal(lo);
    };

    const windowLeft = 2;
    const windowRight = Math.min(n - 1, 1 + dist);
    for (let i = windowLeft; i <= windowRight; i++) {
        addVal(nums[i]);
    }

    let best = Infinity;
    for (let i1 = 1; i1 <= n - k + 1; i1++) {
        const windowEnd = Math.min(n - 1, i1 + dist);
        const windowStart = i1 + 1;
        if (windowEnd - windowStart + 1 >= need) {
            const sum = sumKSmallest();
            if (sum !== Infinity) {
                best = Math.min(best, nums[0] + nums[i1] + sum);
            }
        }

        removeVal(nums[i1 + 1]);
        const addIdx = i1 + 1 + dist;
        if (addIdx <= n - 1) {
            addVal(nums[addIdx]);
        }
    }

    return best;
};