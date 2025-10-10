// 20. 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
        const n = s.length;
        if (n === 0) return true;
        if (n % 2 === 1) return false;

        const stack = [];
        for (let i = 0; i < n; i++) {
            const c = s[i];
            if (c === '(' || c === '{' || c === '[') {
                stack.push(c);
            } else {
                if (stack.length === 0) return false;
                const top = stack.pop();
                if (top === '(' && c !== ')') return false;
                if (top === '{' && c !== '}') return false;
                if (top === '[' && c !== ']') return false;
            }
        }
        return stack.length === 0;
};