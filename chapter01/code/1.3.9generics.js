// 范型是一种类型，通过站位符来代表要使用的类型，
// 具体使用什么类型由调用范型的代码决定，范型包含在<> 中，出现在类名方法名等后面
var QueueOfInt = /** @class */ (function () {
    function QueueOfInt() {
        this.queue = [];
    }
    QueueOfInt.prototype.Push = function (value) {
        this.queue.push(value);
    };
    QueueOfInt.prototype.Pop = function () {
        return this.queue.shift();
    };
    return QueueOfInt;
}());
var intQueue = new QueueOfInt();
intQueue.Push(10);
intQueue.Push(35);
console.log(intQueue.Pop());
console.log(intQueue.Pop());
var Queue = /** @class */ (function () {
    function Queue() {
        this.queue = [];
    }
    Queue.prototype.Push = function (value) {
        this.queue.push(value);
    };
    Queue.prototype.Pop = function () {
        return this.queue.shift();
    };
    return Queue;
}());
var queue = new Queue();
var stringQueue = new Queue();
queue.Push(10);
queue.Push(35);
console.log(queue.Pop());
console.log(queue.Pop());
stringQueue.Push('hello');
stringQueue.Push('Generics');
console.log(stringQueue.Pop());
console.log(stringQueue.Pop());
