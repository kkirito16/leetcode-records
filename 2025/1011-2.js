// 155. 最小栈
// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// 实现 MinStack 类:

// MinStack() 初始化堆栈对象。
// void push(int val) 将元素val推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。

var MinStack = function () {
    this.st = [];
    this.minSt = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    this.st.push(val);
    const curMin = this.minSt.length
        ? Math.min(val, this.minSt[this.minSt.length - 1])
        : val;
    this.minSt.push(curMin);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.st.pop();
    this.minSt.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.st[this.st.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.minSt[this.minSt.length - 1];
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */