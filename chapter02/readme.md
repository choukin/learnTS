## 需求列表

- 创建一个应用程序来解析 markdown
- 用户将在一个文本区域输入内容
- 每当文本区域发生变化时就再次解析整个文档
- 在用户按下 Enter 键的地方换行
- 起始符决定该行是否是markdown
- #后跟一个空格将被替换为H1标题
- ##后跟一个空格将被替换为H2标题
- ###后跟一个空格将被替换为H3标题
- --- 将被替换为一个水平分隔线
- 如果一行没有以markdown开头，则将该行视为一个段落
- ✅ 生成的HTML 将在一个标签内显示
- ✅ 如果 markdown 文本区域的内容为空，则标签将包含空段落
- ✅ 使用Bootstrap 进行布局，内容将拉伸到 100% 的高度


SOLID 设计的原则 一组互相补充的开发技术，可以用来创建更加健壮的代码 一个类只做一件事
- Signgle responsibility principle 单一职责原则
- Open/Closed principle 开闭原则
- Liskov substitution principle 里氏替换原则
- Interface segregation principle 接口分离原则
- Dependency inversion principle 依赖倒置原则

### 软件开发中的模式指的是特定问题的一般性解决方案。

1. 访问者模式
    - 访问者模式是行为模式，关注类和对象的通信方式的一组模式，访问者模式使我们能够将算法与算法操作的对象分离开；
