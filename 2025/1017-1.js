// 3003. 执行操作后的最大分割数量
// 给你一个下标从 0 开始的字符串 s 和一个整数 k。

// 你需要执行以下分割操作，直到字符串 s 变为 空：

// 选择 s 的最长 前缀，该前缀最多包含 k 个 不同 字符。
// 删除 这个前缀，并将分割数量加一。如果有剩余字符，它们在 s 中保持原来的顺序。
// 执行操作之 前 ，你可以将 s 中 至多一处 下标的对应字符更改为另一个小写英文字母。

// 在最优选择情形下改变至多一处下标对应字符后，用整数表示并返回操作结束时得到的 最大 分割数量。
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPartitionsAfterOperations = function (s, k) {
    const n = s.length;
    if (n === 0) return 0;
    if (k === 0) return 0;
    if (k >= 26) return 1;

    const code = (ch) => ch.charCodeAt(0) - 97;

    // firstEnd[i]: the index where the greedy segment starting at i (with empty set)
    // stops (exclusive). Used to build suffix DP.
    const firstEnd = new Int32Array(n);
    const freq = new Int32Array(26);
    let distinct = 0;
    let r = 0;
    for (let l = 0; l < n; l++) {
        while (r < n) {
            const idx = code(s[r]);
            if (freq[idx] === 0 && distinct === k) break;
            if (freq[idx] === 0) distinct++;
            freq[idx]++;
            r++;
        }
        firstEnd[l] = r;
        const leftIdx = code(s[l]);
        freq[leftIdx]--;
        if (freq[leftIdx] === 0) distinct--;
    }

    const segFrom = new Int32Array(n + 1);
    for (let i = n - 1; i >= 0; i--) {
        segFrom[i] = 1 + segFrom[firstEnd[i]];
    }

    // Prefix state before processing position i.
    const segBefore = new Int32Array(n);
    const maskBefore = new Int32Array(n);
    const distinctBefore = new Int8Array(n);
    let mask = 0;
    let currDistinct = 0;
    let completed = 0;
    for (let i = 0; i < n; i++) {
        segBefore[i] = completed;
        maskBefore[i] = mask;
        distinctBefore[i] = currDistinct;
        const bit = 1 << code(s[i]);
        if ((mask & bit) !== 0) continue;
        if (currDistinct === k) {
            completed++;
            mask = 0;
            currDistinct = 0;
        }
        mask |= bit;
        currDistinct++;
    }

    const nextPos = Array.from({ length: n + 1 }, () => new Int32Array(26));
    const order = Array.from({ length: n + 1 }, () => new Int8Array(26));
    const position = new Int8Array(26);
    const INF = n;

    for (let ch = 0; ch < 26; ch++) {
        nextPos[n][ch] = INF;
        order[n][ch] = ch;
        position[ch] = ch;
    }

    for (let i = n - 1; i >= 0; i--) {
        const row = nextPos[i];
        const nextRow = nextPos[i + 1];
        row.set(nextRow);

        const currOrder = order[i];
        const prevOrder = order[i + 1];
        currOrder.set(prevOrder);

        const ch = code(s[i]);
        row[ch] = i;

        // bubble the updated character to keep order sorted by next occurrence
        let idxPos = position[ch];
        while (idxPos > 0) {
            const prevCh = currOrder[idxPos - 1];
            if (row[prevCh] <= row[ch]) break;
            currOrder[idxPos] = prevCh;
            position[prevCh] = idxPos;
            idxPos--;
        }
        currOrder[idxPos] = ch;
        position[ch] = idxPos;
    }

    let ans = segFrom[0];
    for (let i = 0; i < n; i++) {
        const baseMask = maskBefore[i];
        const baseDistinct = distinctBefore[i];
        const beforeSegments = segBefore[i];
        const originalIdx = code(s[i]);

        for (let c = 0; c < 26; c++) {
            if (c === originalIdx) continue;
            const bitC = 1 << c;
            if ((baseMask & bitC) !== 0) continue;

            let segmentsSoFar = beforeSegments;
            let maskAfter;
            let sizeAfter;
            if (baseDistinct === k) {
                segmentsSoFar += 1;
                maskAfter = bitC;
                sizeAfter = 1;
            } else {
                maskAfter = baseMask | bitC;
                sizeAfter = baseDistinct + 1;
            }

            const available = k - sizeAfter;
            let cutPos = INF;

            if (i + 1 < n) {
                const row = nextPos[i + 1];
                const orderList = order[i + 1];
                let included = 0;
                let maskTmp = maskAfter;
                for (let idx = 0; idx < 26; idx++) {
                    const chIdx = orderList[idx];
                    const pos = row[chIdx];
                    if (pos >= INF) break;
                    if ((maskTmp & (1 << chIdx)) !== 0) continue;
                    if (included < available) {
                        maskTmp |= 1 << chIdx;
                        included++;
                    } else {
                        cutPos = pos;
                        break;
                    }
                }
                if (included < available) {
                    cutPos = INF;
                }
            }

            const total = segmentsSoFar + 1 + segFrom[cutPos];
            if (total > ans) ans = total;
        }
    }

    return ans;
};
