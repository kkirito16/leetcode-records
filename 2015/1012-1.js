// 150. 逆波兰表达式求值
// 给你一个字符串数组 tokens ，表示一个根据 逆波兰表示法 表示的算术表达式。

// 请你计算该表达式。返回一个表示表达式值的整数。

// 注意：

// 有效的算符为 '+'、'-'、'*' 和 '/' 。
// 每个操作数（运算对象）都可以是一个整数或者另一个表达式。
// 两个整数之间的除法总是 向零截断 。
// 表达式中不含除零运算。
// 输入是一个根据逆波兰表示法表示的算术表达式。
// 答案及所有中间计算结果可以用 32 位 整数表示。

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    const stack = [];

    const operators = new Set(["+", "-", "*", "/"]);
    for (const token of tokens) {
        if (!operators.has(token)) {
            stack.push(Number(token));
            continue;
        }

        const b = stack.pop();
        const a = stack.pop();
        let result = 0;
        switch (token) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "*":
                result = a * b;
                break;
            case "/":
                result = Math.trunc(a / b);
                break;
        }
        stack.push(result);
    }

    return stack.pop();
};
