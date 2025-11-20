// 717. 1 比特与 2 比特字符
// 有两种特殊字符：

// 第一种字符可以用一比特 0 表示
// 第二种字符可以用两比特（10 或 11）表示
// 给你一个以 0 结尾的二进制数组 bits ，如果最后一个字符必须是一个一比特字符，则返回 true 。
/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function (bits) {
    let i = 0;
    while (i < bits.length - 1) {
        i += bits[i] + 1;
    }
    return i === bits.length - 1;
};