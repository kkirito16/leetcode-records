// 756. 金字塔转换矩阵
// 你正在把积木堆成金字塔。每个块都有一个颜色，用一个字母表示。每一行的块比它下面的行 少一个块 ，并且居中。

// 为了使金字塔美观，只有特定的 三角形图案 是允许的。一个三角形的图案由 两个块 和叠在上面的 单个块 组成。模式是以三个字母字符串的列表形式 allowed 给出的，其中模式的前两个字符分别表示左右底部块，第三个字符表示顶部块。

// 例如，"ABC" 表示一个三角形图案，其中一个 “C” 块堆叠在一个 'A' 块(左)和一个 'B' 块(右)之上。请注意，这与 "BAC" 不同，"B" 在左下角，"A" 在右下角。
// 你从作为单个字符串给出的底部的一排积木 bottom 开始，必须 将其作为金字塔的底部。

// 在给定 bottom 和 allowed 的情况下，如果你能一直构建到金字塔顶部，使金字塔中的 每个三角形图案 都是在 allowed 中的，则返回 true ，否则返回 false 。
/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function (bottom, allowed) {
    const trans = new Map();
    for (const s of allowed) {
        const key = s.slice(0, 2);
        const top = s[2];
        if (!trans.has(key)) trans.set(key, []);
        trans.get(key).push(top);
    }

    const fail = new Set();

    const dfs = (row) => {
        if (row.length === 1) return true;
        if (fail.has(row)) return false;

        const options = [];
        for (let i = 0; i < row.length - 1; i++) {
            const key = row.slice(i, i + 2);
            if (!trans.has(key)) {
                fail.add(row);
                return false;
            }
            options.push(trans.get(key));
        }

        const buildNext = (idx, path) => {
            if (idx === options.length) {
                return dfs(path);
            }
            for (const c of options[idx]) {
                if (buildNext(idx + 1, path + c)) return true;
            }
            return false;
        };

        const ok = buildNext(0, "");
        if (!ok) fail.add(row);
        return ok;
    };

    return dfs(bottom);
};
