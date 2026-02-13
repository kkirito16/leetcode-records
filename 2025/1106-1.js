// 3607. 电网维护
// 给你一个整数 c，表示 c 个电站，每个电站有一个唯一标识符 id，从 1 到 c 编号。

// 这些电站通过 n 条 双向 电缆互相连接，表示为一个二维数组 connections，其中每个元素 connections[i] = [ui, vi] 表示电站 ui 和电站 vi 之间的连接。直接或间接连接的电站组成了一个 电网 。

// 最初，所有 电站均处于在线（正常运行）状态。

// 另给你一个二维数组 queries，其中每个查询属于以下 两种类型之一 ：

// [1, x]：请求对电站 x 进行维护检查。如果电站 x 在线，则它自行解决检查。如果电站 x 已离线，则检查由与 x 同一 电网 中 编号最小 的在线电站解决。如果该电网中 不存在 任何 在线 电站，则返回 - 1。

// [2, x]：电站 x 离线（即变为非运行状态）。

// 返回一个整数数组，表示按照查询中出现的顺序，所有类型为[1, x] 的查询结果。

// 注意：电网的结构是固定的；离线（非运行）的节点仍然属于其所在的电网，且离线操作不会改变电网的连接性。
/**
 * @param {number} c
 * @param {number[][]} connections
 * @param {number[][]} queries
 * @return {number[]}
 */
var processQueries = function (c, connections, queries) {
  class DSU {
    constructor(n) {
      this.parent = new Array(n + 1);
      for (let i = 0; i <= n; i++) this.parent[i] = i;
    }
    find(x) {
      if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
      return this.parent[x];
    }
    union(a, b) {
      const pa = this.find(a);
      const pb = this.find(b);
      if (pa !== pb) this.parent[pa] = pb;
    }
  }

  const dsu = new DSU(c);
  for (const [u, v] of connections) dsu.union(u, v);

  const compMembers = new Map();
  for (let i = 1; i <= c; i++) {
    const root = dsu.find(i);
    if (!compMembers.has(root)) compMembers.set(root, []);
    compMembers.get(root).push(i);
  }
  const compPtr = new Map();
  for (const arr of compMembers.values()) arr.sort((a, b) => a - b);
  for (const key of compMembers.keys()) compPtr.set(key, 0);

  const online = new Array(c + 1).fill(true);
  const ans = [];

  const advancePtr = (root) => {
    const arr = compMembers.get(root);
    let ptr = compPtr.get(root) ?? 0;
    while (ptr < arr.length && !online[arr[ptr]]) ptr++;
    compPtr.set(root, ptr);
    return ptr < arr.length ? arr[ptr] : -1;
  };

  for (const [type, x] of queries) {
    if (type === 1) {
      if (online[x]) {
        ans.push(x);
      } else {
        const root = dsu.find(x);
        ans.push(advancePtr(root));
      }
    } else if (type === 2) {
      online[x] = false;
    }
  }

  return ans;
};
