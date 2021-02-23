// 范型是一种类型，通过站位符来代表要使用的类型，
// 具体使用什么类型由调用范型的代码决定，范型包含在<> 中，出现在类名方法名等后面
class QueueOfInt{
    private queue: number[]=[]
    public Push(value:number):void{
        this.queue.push(value)
    }
    public Pop():number|undefined{
        return this.queue.shift()
    }
}
const intQueue:QueueOfInt = new QueueOfInt()
intQueue.Push(10)
intQueue.Push(35)
console.log(intQueue.Pop());
console.log(intQueue.Pop());

class Queue<T>{
    private queue :T[] = []
    public Push(value:T):void{
        this.queue.push(value)
    }
    public Pop():T|undefined{
        return this.queue.shift()
    }
}

const queue:Queue<number> = new Queue<number>()
const stringQueue:Queue<string> = new Queue<string>()
queue.Push(10)
queue.Push(35)
console.log(queue.Pop());
console.log(queue.Pop());
stringQueue.Push('hello')
stringQueue.Push('Generics')
console.log(stringQueue.Pop());
console.log(stringQueue.Pop());

// 范型约束

interface IStream{
    ReadStream():Int8Array;
}
class Data<T extends IStream> {
    ReadStream(stream:T){
        let output = stream.ReadStream();
        console.log(output.byteLength);
        
    }
}
class WebStream implements IStream{
    ReadStream():Int8Array{
        let array: Int8Array = new Int8Array(8)
        for (let index = 0; index < array.length; index++) {
            array[index] = index+3
            
        }
        return array
    }
}

class DiskStream implements IStream {
    ReadStream():Int8Array{
        let array:Int8Array = new Int8Array(20)
        for (let index = 0; index < array.length; index++) {
             array[index] = index +3
        }
        return array
    }
}

// 在方法中应用特定的范型
class Data1{
    ReadStream<T extends IStream>(stream:T) {
        let output = stream.ReadStream()
        console.log(output.byteLength);
        
    }
}





