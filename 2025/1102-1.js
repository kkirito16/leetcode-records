// 2257. 统计网格图中没有被保卫的格子数
// 给你两个整数 m 和 n 表示一个下标从 0 开始的 m x n 网格图。同时给你两个二维整数数组 guards 和 walls ，其中 guards[i] = [rowi, coli] 且 walls[j] = [rowj, colj] ，分别表示第 i 个警卫和第 j 座墙所在的位置。

// 一个警卫能看到 4 个坐标轴方向（即东、南、西、北）的 所有 格子，除非他们被一座墙或者另外一个警卫 挡住 了视线。如果一个格子能被 至少 一个警卫看到，那么我们说这个格子被 保卫 了。

// 请你返回空格子中，有多少个格子是 没被保卫 的。
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function (m, n, guards, walls) {
  const grid = Array.from({ length: m }, () => Array(n).fill(0));
  for (const [r, c] of guards) {
    grid[r][c] = 1;
  }
  for (const [r, c] of walls) {
    grid[r][c] = 2;
  }
  const guarded = Array.from({ length: m }, () => Array(n).fill(false));
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (const [r, c] of guards) {
    for (const [dr, dc] of dirs) {
      let nr = r + dr;
      let nc = c + dc;
      while (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        if (grid[nr][nc] === 1 || grid[nr][nc] === 2) {
          break;
        }
        guarded[nr][nc] = true;
        nr += dr;
        nc += dc;
      }
    }
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0 && !guarded[i][j]) {
        count++;
      }
    }
  }
  return count;
};
