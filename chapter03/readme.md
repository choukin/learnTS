# React Bootstrap 联系人管理器

## 需求
 -  创建一个模拟布局来检查布局
 - 创建React 应用程序
 - 使用tslint 分析代码和设置代码风格
 - 添加Bootstrap支持
 - 使用React tsx 组件
 - React 的 APP 组件
 - 显示个人信息 UI
 - 使用绑定简化更新
 - 创建验证器及应用验证器进行验证
 - React 组件内应用验证
 - 创建并发送数据给IndexedDB 数据库

 ### IndexedDB 数据库存储 Chrome 11以上，FireFox 4以上


 ### npx 是npm的增强版本，npx 可以省略安装应用包，加快开发流程

// 创建支持ts的react 应用
```shell
  npx create-react-app persons --scripts-version=react-scripts-ts // 过期了
  npx create-react-app persons  --template typescript
```

### 虚拟文档对象 Document Object Model 

 > 虚拟dom是标准DOM的轻量级版本，之所以轻量，是因为它丢弃了标准DOM的主要功能，即虚拟DOM不需要渲染到屏幕。当React运行render方法时，会遍历每一个.tsx文件，并执行之中的渲染代码。然后，将渲染后的代码与上次渲染的代码比较，确定那些地方发生了变化。只有发生变化的元素才在屏幕上更新。这个比较截断是我们必须使用虚拟DOM的原因。使用这种方法时，能够更快地判断需要那些元素，即只有发生变化的元素才需要更新。


 - react 中允许在render中混合代码和标记语言，所以用 htmlFor 替代 for ,className 替代 class
- 熟悉由父组件传入类中，而状态来自局部组件。将属性与状态分隔开很重要，因为这提供了一种方法来让父组件与子组件通信，也让子组件能够将信息传递回父组件。同时，我们仍然能够管理组件想要用做状态的那些数据和行为。


### IndexedDB

- onupgradeneeded 监听代码需要升级



