## TypeScript 项目开发实战

[对应源码](https://github.com/PacktPublishing/Advanced-TypeScript-3-Programming-Projects)

### 初始化项目

```shell
npm i typescript --save-dev
```
- 生成 tsconfig.json
```shell
npx tsc --init
```

## 高级特性

- 联合类型
- 交叉类型
- 装饰器进行 AOP
 - tsc --target ES5 --experimentalDecorators  chapter01/1.3.7Decorator.ts
```js
/**
 * 
 * @param target 装饰器应用到的元素
 * @param propertyKey 元素名称
 * @param descriptor 要应用装饰器的方法的描述符
 */
function Admin(target:any, propertyKey:string|symbol,descriptor:PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function(){
        // ...
    }
    return descriptor
}
```

- 范型
> 当我们为范型指定类型后，TypeScript 会限制其不改变。因此，在上面的代码中，如果我们试图在 queue 变量中添加一个字符串，TypeScript 将无法编译代码

    -   多个范型

     ```js
        function KeyValuePair<TKey,TValue>(key:Tkey,value:TValue)
     ```
    - 通过使用范型约束，可以告诉范型在这里使用特定的类型
    - 一般情况下把范型约束为接口

     ```Ts
        interface IStream{
            ReadStream():Int8Array;
        }
        class Date<T extends IStream>{
            ReadStream(stream:T) {
                let output = stream.ReadStream()
                console.log(output.byteLength)
            }
        }
     ``` 

- 使用映射来映射值     