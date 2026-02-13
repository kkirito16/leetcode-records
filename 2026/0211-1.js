// 3721. 最长平衡子数组 II
// 给你一个整数数组 nums。
// 如果子数组中 不同偶数 的数量等于 不同奇数 的数量，则称该 子数组 是 平衡的 。
// 返回 最长 平衡子数组的长度。
// 子数组 是数组中连续且 非空 的一段元素序列。
/**
 * @param {number[]} nums
 * @return {number}
 */
const longestBalanced = function (nums) {
    const n = nums.length;
    if (n === 0) return 0;

    const sign = (x) => (x % 2 === 0 ? 1 : -1);

    // nextSame[i] = nums[i] 下一次出现的位置，不存在则为 n
    const nextSame = new Array(n).fill(n);
    const lastPos = new Map();
    for (let i = n - 1; i >= 0; i--) {
        const x = nums[i];
        if (lastPos.has(x)) nextSame[i] = lastPos.get(x);
        lastPos.set(x, i);
    }

    // 初始左端点 l = 0 时，S[r] = [0..r] 的(不同偶数数 - 不同奇数数)
    const pref = new Array(n);
    const seen = new Set();
    let cur = 0;
    for (let i = 0; i < n; i++) {
        const x = nums[i];
        if (!seen.has(x)) {
            seen.add(x);
            cur += sign(x);
        }
        pref[i] = cur;
    }

    class SegTree {
        constructor(arr) {
            this.n = arr.length;
            const m = this.n * 4 + 5;
            this.min = new Array(m).fill(0);
            this.max = new Array(m).fill(0);
            this.lazy = new Array(m).fill(0);
            this.build(1, 0, this.n - 1, arr);
        }

        build(idx, l, r, arr) {
            if (l === r) {
                this.min[idx] = this.max[idx] = arr[l];
                return;
            }
            const mid = (l + r) >> 1;
            this.build(idx << 1, l, mid, arr);
            this.build((idx << 1) | 1, mid + 1, r, arr);
            this.pull(idx);
        }

        pull(idx) {
            const lc = idx << 1;
            const rc = lc | 1;
            this.min[idx] = Math.min(this.min[lc], this.min[rc]);
            this.max[idx] = Math.max(this.max[lc], this.max[rc]);
        }

        apply(idx, delta) {
            this.min[idx] += delta;
            this.max[idx] += delta;
            this.lazy[idx] += delta;
        }

        push(idx) {
            const z = this.lazy[idx];
            if (z !== 0) {
                this.apply(idx << 1, z);
                this.apply((idx << 1) | 1, z);
                this.lazy[idx] = 0;
            }
        }

        rangeAdd(L, R, delta) {
            if (L > R) return;
            this._rangeAdd(1, 0, this.n - 1, L, R, delta);
        }

        _rangeAdd(idx, l, r, L, R, delta) {
            if (L <= l && r <= R) {
                this.apply(idx, delta);
                return;
            }
            this.push(idx);
            const mid = (l + r) >> 1;
            if (L <= mid) this._rangeAdd(idx << 1, l, mid, L, R, delta);
            if (R > mid) this._rangeAdd((idx << 1) | 1, mid + 1, r, L, R, delta);
            this.pull(idx);
        }

        // 在 [from..n-1] 中找最右侧值为 0 的下标
        findRightmostZero(from) {
            if (from >= this.n) return -1;
            return this._find(1, 0, this.n - 1, from);
        }

        _find(idx, l, r, from) {
            if (r < from) return -1;
            if (this.min[idx] > 0 || this.max[idx] < 0) return -1; // 不可能包含 0
            if (l === r) return this.min[idx] === 0 ? l : -1;

            this.push(idx);
            const mid = (l + r) >> 1;

            // 先搜右子树，保证“最右”
            const ans = this._find((idx << 1) | 1, mid + 1, r, from);
            if (ans !== -1) return ans;
            return this._find(idx << 1, l, mid, from);
        }
    }

    const st = new SegTree(pref);
    let ans = 0;

    for (let l = 0; l < n; l++) {
    // 小优化：长度必须 > ans，故 r >= l + ans
        const start = l + ans;
        const r = st.findRightmostZero(start);
        if (r !== -1) ans = Math.max(ans, r - l + 1);

        // 左端点从 l -> l+1，撤销 nums[l] 在对应区间的贡献
        const delta = -sign(nums[l]);
        st.rangeAdd(l, nextSame[l] - 1, delta);
    }

    return ans;
};
