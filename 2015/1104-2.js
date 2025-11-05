// 146. LRU 缓存
// 请你设计并实现一个满足  LRU(最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 - 1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key - value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = { prev: null, next: null };
    this.tail = { prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (!this.cache.has(key)) {
        return -1;
    }
    const node = this.cache.get(key);
    this._moveToHead(node);
    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (this.cache.has(key)) {
        const node = this.cache.get(key);
        node.value = value;
        this._moveToHead(node);
        return;
    }

    const newNode = { key, value, prev: null, next: null };
    this.cache.set(key, newNode);
    this._addNode(newNode);

    if (this.cache.size > this.capacity) {
        const tail = this._popTail();
        this.cache.delete(tail.key);
    }
};

LRUCache.prototype._addNode = function (node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
};

LRUCache.prototype._removeNode = function (node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
};

LRUCache.prototype._moveToHead = function (node) {
    this._removeNode(node);
    this._addNode(node);
};

LRUCache.prototype._popTail = function () {
    const node = this.tail.prev;
    this._removeNode(node);
    return node;
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
